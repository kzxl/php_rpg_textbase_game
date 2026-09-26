#!/usr/bin/env python3
"""
spec_math_stress_r2.py - Round 2 Empirical Mathematical Stress-Testing Harness
Author: Challenger 1 (Round 2 Empirical Mathematical Stress-Tester)
Target Document: docs/MULTIPLAYER_ARCHITECTURE_SPEC.md
Remediation Verification: Anti-Alt Scoring (§5.2), Plunder D_grief (§2.5), Hospital Clamping (§2.6)
"""

import math
import sys
import random

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass


def test_anti_alt_scoring():
    print("=" * 80)
    print("TEST SUITE 1: ANTI-ALT ANOMALY SCORING (§5.2)")
    print("=" * 80)

    w1, w2, w3, w4 = 0.35, 0.30, 0.20, 0.15
    weight_sum = w1 + w2 + w3 + w4
    assert abs(weight_sum - 1.0) < 1e-9, f"Weights must sum to 1.0, got {weight_sum}"
    print(f"Weight validation: w1={w1}, w2={w2}, w3={w3}, w4={w4} (Sum = {weight_sum:.4f}) -> PASS")

    def calc_s_anomaly(s_trade, s_pvp, s_network, s_velocity):
        # Category scores clamped to [0, 100]
        s_trade = max(0, min(100, s_trade))
        s_pvp = max(0, min(100, s_pvp))
        s_network = max(0, min(100, s_network))
        s_velocity = max(0, min(100, s_velocity))
        return w1 * s_trade + w2 * s_pvp + w3 * s_network + w4 * s_velocity

    def get_tier(score):
        score = round(score, 6)
        if score >= 90.0:
            return "Shadowban (Segregated Pool)"
        elif score >= 75.0:
            return "Quarantine (Hard-Lock Pair)"
        elif score >= 50.0:
            return "Warning (2FA Required)"
        else:
            return "Normal (No Action)"

    # Mandatory test scenarios from mission:
    # (a) innocent player (0 points)
    # (b) moderate trader (50 points)
    # (c) high-risk collusion mule (85 points)
    # (d) full syndicate bot (100 points)
    scenarios = [
        ("(a) Innocent Player (Clean Record)", 0, 0, 0, 0, 0.0, "Normal (No Action)"),
        ("(b) Moderate Trader / Market Bot (Dump + Velocity Burst)", 100, 0, 0, 100, 50.0, "Warning (2FA Required)"),
        ("(c) High-Risk Collusion Mule (Dump + Swap + Cluster, No Burst)", 100, 100, 100, 0, 85.0, "Quarantine (Hard-Lock Pair)"),
        ("(d) Full Syndicate Bot (Full Infraction Across All 4 Vectors)", 100, 100, 100, 100, 100.0, "Shadowban (Segregated Pool)"),
        # Additional edge & boundary scenarios:
        ("(e) Soft Collusion Pair (Asym Trade 80 + Pushover 80 + Cluster 100)", 80, 80, 100, 0, 72.0, "Warning (2FA Required)"),
        ("(f) Severe Collusion + Medium PvP (Dump 100 + Pushover 80 + Cluster 100 + Burst 100)", 100, 80, 100, 100, 94.0, "Shadowban (Segregated Pool)"),
        ("(g) Single Vector Maximum (Dump 100 only)", 100, 0, 0, 0, 35.0, "Normal (No Action)"),
        ("(h) Single Vector Maximum (Swap 100 only)", 0, 100, 0, 0, 30.0, "Normal (No Action)"),
        ("(i) Exact Quarantine Boundary (Trade 100, PvP 100, Net 50, Vel 0)", 100, 100, 50, 0, 75.0, "Quarantine (Hard-Lock Pair)"),
        ("(j) Exact Shadowban Boundary (Trade 100, PvP 100, Net 100, Vel 33.33)", 100, 100, 100, 100.0 / 3.0, 90.0, "Shadowban (Segregated Pool)")
    ]

    print("\n--- 1.1 Anomaly Scoring Scenario Probing ---")
    print(f"{'Scenario Name':<45} | {'S_tr':>5} {'S_pv':>5} {'S_net':>5} {'S_vel':>5} | {'Expected':>8} | {'Computed':>8} | {'Tier Triggered':<28} | {'Status':>6}")
    print("-" * 125)

    all_scenarios_passed = True
    results_summary = []
    for name, tr, pv, net, vel, exp_score, exp_tier in scenarios:
        computed = calc_s_anomaly(tr, pv, net, vel)
        tier = get_tier(computed)
        score_diff = abs(computed - exp_score)
        passed = score_diff < 0.01 and tier == exp_tier
        if not passed:
            all_scenarios_passed = False
        status_str = "PASS" if passed else "FAIL"
        print(f"{name:<45} | {tr:>5.0f} {pv:>5.0f} {net:>5.0f} {vel:>5.0f} | {exp_score:>8.2f} | {computed:>8.2f} | {tier:<28} | {status_str:>6}")
        results_summary.append({
            "name": name,
            "inputs": (tr, pv, net, vel),
            "computed": computed,
            "expected": exp_score,
            "tier": tier,
            "passed": passed
        })

    # Reachability Verification
    print("\n--- 1.2 Mathematical Reachability of Escalation Tiers ---")
    can_reach_warning = any(r["computed"] >= 50.0 for r in results_summary)
    can_reach_quarantine = any(r["computed"] >= 75.0 for r in results_summary)
    can_reach_shadowban = any(r["computed"] >= 90.0 for r in results_summary)

    print(f"Warning Tier (>= 50.0) Reachable:    {can_reach_warning} (Min observed: {min(r['computed'] for r in results_summary if r['computed'] >= 50.0):.2f})")
    print(f"Quarantine Tier (>= 75.0) Reachable: {can_reach_quarantine} (Min observed: {min(r['computed'] for r in results_summary if r['computed'] >= 75.0):.2f})")
    print(f"Shadowban Tier (>= 90.0) Reachable:  {can_reach_shadowban} (Min observed: {min(r['computed'] for r in results_summary if r['computed'] >= 90.0):.2f})")

    assert all_scenarios_passed, "One or more scenario tests failed!"
    assert can_reach_quarantine and can_reach_shadowban, "Quarantine and Shadowban must be reachable!"
    print("\nAnti-Alt Scoring Test Suite: ALL CHECKS PASSED (100%)\n")
    return results_summary


def test_plunder_formula():
    print("=" * 80)
    print("TEST SUITE 2: PLUNDER FORMULA D_grief & CONTINUITY (§2.5)")
    print("=" * 80)

    def p_base(w):
        if w < 0:
            w = 0
        ratio = max(1.0, w / 10000.0)
        val = 0.18 - 0.035 * math.log10(ratio)
        return max(0.04, min(0.18, val))

    def d_grief(n_mug, t_last):
        if n_mug == 0:
            return 1.0
        frequency = 1.0 / (1.0 + 0.85 * n_mug)
        recency = 1.0 - math.exp(-t_last / 1800.0)
        return frequency * recency

    def calc_loot(w, realm_tier=1, skill=1, n_mug=0, t_last=0, rand_factor=1.0):
        m_cap = 500000 * realm_tier
        pb = p_base(w)
        f_skill = 1.0 + 0.05 * (skill - 1)
        dg = d_grief(n_mug, t_last)
        raw = w * pb * f_skill * dg * rand_factor
        return min(m_cap, math.floor(raw)), pb, f_skill, dg, m_cap

    # Test 2.1: Unattacked Target (N_mug = 0) with various t_last
    print("\n--- 2.1 Unattacked Target Probing (N_mug = 0) ---")
    t_test_zeros = [0, 1, 10, 60, 300, 1800, 3600, 7200, 86400]
    n0_passed = True
    print(f"{'N_mug':>8} | {'t_last (s)':>12} | {'D_grief':>12} | {'Expected':>12} | {'Status':>8}")
    print("-" * 60)
    for t in t_test_zeros:
        dg = d_grief(0, t)
        passed = (dg == 1.0)
        if not passed:
            n0_passed = False
        print(f"{0:>8} | {t:>12} | {dg:>12.6f} | {1.0:>12.6f} | {'PASS' if passed else 'FAIL':>8}")
    assert n0_passed, "N_mug == 0 failed to produce D_grief == 1.0 across all timestamps!"

    # Test 2.2: Mandatory combinations N_mug in [1, 3, 5] and t_last in [60s, 300s, 1800s]
    print("\n--- 2.2 Repeat Mug Decay Probing (N_mug in [1, 3, 5], t_last in [60, 300, 1800]) ---")
    print(f"{'N_mug':>8} | {'t_last (s)':>12} | {'Freq Factor':>12} | {'Recency Factor':>16} | {'D_grief':>12} | {'D_grief %':>12} | {'< 2% at 60s?':>14}")
    print("-" * 95)
    repeat_passed = True
    decay_table = []
    for n in [1, 3, 5]:
        freq = 1.0 / (1.0 + 0.85 * n)
        for t in [60, 300, 1800]:
            rec = 1.0 - math.exp(-t / 1800.0)
            dg = d_grief(n, t)
            pct = dg * 100
            is_under_2pct_at_60 = (t != 60) or (dg < 0.02)
            if not is_under_2pct_at_60:
                repeat_passed = False
            flag = "PASS (<2%)" if (t == 60 and dg < 0.02) else ("N/A" if t != 60 else "FAIL")
            print(f"{n:>8} | {t:>12} | {freq:>12.5f} | {rec:>16.6f} | {dg:>12.6f} | {pct:>11.3f}% | {flag:>14}")
            decay_table.append({
                "n_mug": n,
                "t_last": t,
                "freq": freq,
                "recency": rec,
                "d_grief": dg,
                "pct": pct
            })

    assert repeat_passed, "Rapid decay down to < 2% under repeat mugs at t=60s failed!"

    # Test 2.3: Wealth Spectrum and Absolute Yield with D_grief
    print("\n--- 2.3 Wallet Yield Under Repeat Attacks (Victim Wallet = 1,000,000 Linh Thach) ---")
    w_initial = 1000000
    print(f"{'Hit #':>6} | {'N_mug':>6} | {'t_last (s)':>12} | {'D_grief':>10} | {'Base Rate':>10} | {'Loot Taken':>12} | {'Remaining Wallet':>18} | {'Effective Yield %':>18}")
    print("-" * 105)
    curr_wallet = w_initial
    for hit_idx in range(1, 7):
        n = hit_idx - 1
        t = 0 if n == 0 else 60
        loot, pb, fs, dg, mc = calc_loot(curr_wallet, realm_tier=3, skill=1, n_mug=n, t_last=t)
        eff_yield = (loot / curr_wallet * 100) if curr_wallet > 0 else 0
        print(f"{hit_idx:>6} | {n:>6} | {t:>12} | {dg:>10.4f} | {pb*100:>9.1f}% | {loot:>12,d} | {curr_wallet - loot:>18,d} | {eff_yield:>17.3f}%")
        curr_wallet -= loot

    print("\nPlunder Formula Test Suite: ALL CHECKS PASSED (100%)\n")
    return decay_table


def test_hospital_duration_clamping():
    print("=" * 80)
    print("TEST SUITE 3: HOSPITAL DURATION CLAMPING PER OUTCOME (§2.6)")
    print("=" * 80)

    def m_realm(realm_tier):
        # Realm_Tier: 1 to 5
        return 1.0 + 0.15 * (realm_tier - 1)

    def m_overkill(lethal_damage, remaining_hp, max_hp):
        if max_hp <= 0:
            return 1.0
        excess = lethal_damage - remaining_hp
        ratio = excess / max_hp
        return max(1.0, min(1.5, 1.0 + ratio))

    def m_delta(delta_l):
        if delta_l > 0:
            return max(0.5, 1.0 - 0.03 * delta_l)
        elif delta_l < 0:
            return min(1.75, 1.0 + 0.05 * abs(delta_l))
        else:
            return 1.0

    def calc_t_hosp(t_base, t_min, t_max, realm_tier, lethal_damage, remaining_hp, max_hp, delta_l):
        mr = m_realm(realm_tier)
        mo = m_overkill(lethal_damage, remaining_hp, max_hp)
        md = m_delta(delta_l)
        raw = t_base * mr * mo * md
        clamped = max(t_min, min(t_max, raw))
        return clamped, raw, mr, mo, md

    outcomes = [
        ("Trọng Thương (Hospitalize)", 1800, 600, 3600),
        ("Đoạt Bảo (Mug / Plunder)", 180, 120, 300),
        ("Chỉ Điểm (Spar / Leave)", 45, 30, 60),
        ("Attacker Loss (Defeat)", 300, 150, 600)
    ]

    print("\n--- 3.1 Multiplier Bounds Verification ---")
    mr_min, mr_max = m_realm(1), m_realm(5)
    mo_min, mo_max = m_overkill(100, 100, 1000), m_overkill(1000, 0, 1000)
    md_min, md_max = m_delta(50), m_delta(-50)
    prod_min = mr_min * mo_min * md_min
    prod_max = mr_max * mo_max * md_max

    print(f"M_realm range:    [{mr_min:.2f}x, {mr_max:.2f}x]")
    print(f"M_overkill range: [{mo_min:.2f}x, {mo_max:.2f}x]")
    print(f"M_delta range:    [{md_min:.2f}x, {md_max:.2f}x]")
    print(f"Product range:    [{prod_min:.2f}x, {prod_max:.2f}x]")

    print("\n--- 3.2 Formal Bounds Clamping Matrix Across All 4 Outcomes ---")
    print(f"{'Outcome':<28} | {'T_base':>6} | {'T_min':>6} | {'T_max':>6} | {'Min Raw':>8} | {'Clamped Min':>12} | {'Max Raw':>8} | {'Clamped Max':>12} | {'In Bounds?':>10}")
    print("-" * 115)

    all_bounds_passed = True
    clamping_results = []
    for name, t_base, t_min, t_max in outcomes:
        # Min case: Tier 1, no overkill, high-level attacker (Delta L = +50)
        c_min, raw_min, _, _, _ = calc_t_hosp(t_base, t_min, t_max, 1, 100, 100, 1000, 50)
        # Max case: Tier 5, max overkill, underdog attacker (Delta L = -50)
        c_max, raw_max, _, _, _ = calc_t_hosp(t_base, t_min, t_max, 5, 2000, 0, 1000, -50)

        in_bounds_min = (t_min <= c_min <= t_max)
        in_bounds_max = (t_min <= c_max <= t_max)
        passed = in_bounds_min and in_bounds_max
        if not passed:
            all_bounds_passed = False

        print(f"{name:<28} | {t_base:>5}s | {t_min:>5}s | {t_max:>5}s | {raw_min:>7.1f}s | {c_min:>11.1f}s | {raw_max:>7.1f}s | {c_max:>11.1f}s | {'PASS' if passed else 'FAIL':>10}")
        clamping_results.append({
            "outcome": name,
            "t_base": t_base,
            "t_min": t_min,
            "t_max": t_max,
            "raw_min": raw_min,
            "clamped_min": c_min,
            "raw_max": raw_max,
            "clamped_max": c_max,
            "passed": passed
        })

    # Test 3.3: Monte Carlo Stress Test (10,000 iterations per outcome)
    print("\n--- 3.3 Monte Carlo Stress Test (10,000 Trials per Outcome) ---")
    random.seed(42)
    mc_passed = True
    for name, t_base, t_min, t_max in outcomes:
        min_observed = 999999.0
        max_observed = -1.0
        clamp_hits_floor = 0
        clamp_hits_ceiling = 0
        clamp_in_middle = 0

        for _ in range(10000):
            r_tier = random.randint(1, 5)
            rem_hp = random.uniform(0, 1000)
            max_hp = 1000.0
            lethal_dmg = rem_hp + random.uniform(0, 2000)
            delta_l = random.randint(-60, 60)

            c_val, raw_val, _, _, _ = calc_t_hosp(t_base, t_min, t_max, r_tier, lethal_dmg, rem_hp, max_hp, delta_l)
            if c_val < min_observed:
                min_observed = c_val
            if c_val > max_observed:
                max_observed = c_val

            if c_val < t_min - 1e-9 or c_val > t_max + 1e-9:
                mc_passed = False

            if abs(c_val - t_min) < 1e-6:
                clamp_hits_floor += 1
            elif abs(c_val - t_max) < 1e-6:
                clamp_hits_ceiling += 1
            else:
                clamp_in_middle += 1

        print(f"{name:<28} | Observed Range: [{min_observed:>6.1f}s, {max_observed:>6.1f}s] | Floor hits: {clamp_hits_floor:>5} | Ceiling hits: {clamp_hits_ceiling:>5} | Mid: {clamp_in_middle:>5} | {'PASS' if mc_passed else 'FAIL'}")

    assert all_bounds_passed and mc_passed, "Hospital clamping bounds violated!"
    print("\nHospital Duration Clamping Test Suite: ALL CHECKS PASSED (100%)\n")
    return clamping_results


def test_auxiliary_formulas():
    print("=" * 80)
    print("TEST SUITE 4: AUXILIARY FORMULAS VALIDATION (§4.1 FFM, §2.7 Đan Độc)")
    print("=" * 80)

    # 4.1 Fair Fight Multiplier with denominator protection
    def calc_ffm(att_stat, def_stat):
        denom = max(1, att_stat)
        raw = 1.0 + (def_stat - att_stat) / denom
        return max(0.1, min(3.0, raw))

    ffm_zero_att = calc_ffm(0, 1000)
    print(f"FFM Zero-Stat Attacker (Att=0, Def=1000): {ffm_zero_att:.2f}x (Guarded, no division by zero) -> PASS")
    assert ffm_zero_att == 3.0, f"Expected capped 3.0, got {ffm_zero_att}"

    ffm_equal = calc_ffm(1000, 1000)
    print(f"FFM Equal Combatants (Att=1000, Def=1000): {ffm_equal:.2f}x -> PASS")
    assert ffm_equal == 1.0, f"Expected 1.0, got {ffm_equal}"

    ffm_weak = calc_ffm(1000, 10)
    print(f"FFM Pushover Combatant (Att=1000, Def=10): {ffm_weak:.2f}x -> PASS")
    assert ffm_weak == 0.1, f"Expected floor 0.1, got {ffm_weak}"

    # 4.2 Chaining window reset formula
    def calc_chain_reset(t_window, t_remaining):
        return min(t_window, t_remaining + 5)

    assert calc_chain_reset(300, 298) == 300
    assert calc_chain_reset(300, 100) == 105
    print("Chain Countdown Increment min(T_window, T_rem + 5s): PASS")

    # 4.3 Dan Doc Stochastic Model
    def p_overdose(tp):
        if tp < 60:
            return 0.0
        elif tp >= 100:
            return 1.0
        else:
            return (tp - 50.0) / 50.0

    assert p_overdose(50) == 0.0
    assert abs(p_overdose(80) - 0.60) < 1e-9
    assert p_overdose(100) == 1.0
    assert p_overdose(120) == 1.0
    print(f"Đan Độc Risk: TP=50 -> {p_overdose(50)*100}%, TP=80 -> {p_overdose(80)*100}%, TP=100 -> {p_overdose(100)*100}% -> PASS")

    print("\nAuxiliary Formulas Test Suite: ALL CHECKS PASSED (100%)\n")
    return True


if __name__ == "__main__":
    test_anti_alt_scoring()
    test_plunder_formula()
    test_hospital_duration_clamping()
    test_auxiliary_formulas()
    print("=" * 80)
    print("FINAL SUMMARY: ALL 4 TEST SUITES PASSED EMPIRICALLY (100% VERIFIED)")
    print("=" * 80)
