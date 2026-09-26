#!/usr/bin/env python3
"""
spec_math_stress.py - Empirical Mathematical & Balance Stress-Testing Harness
Author: Challenger 1 (Empirical Mathematical & Balance Stress-Tester)
Target Document: docs/MULTIPLAYER_ARCHITECTURE_SPEC.md
"""

import math
import sys
import json

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def test_mug_plunder():
    print("=" * 80)
    print("TEST 1: MUG PLUNDER FORMULA & ANTI-GRIEF CURVES")
    print("=" * 80)

    def p_base(w):
        if w < 0:
            w = 0
        ratio = max(1.0, w / 10000.0)
        val = 0.18 - 0.035 * math.log10(ratio)
        return max(0.04, min(0.18, val))

    def d_grief(n_mug, t_last):
        recency = 1.0 - math.exp(-t_last / 1800.0)
        frequency = 1.0 / (1.0 + 0.85 * n_mug)
        return frequency * recency

    def calc_loot(w, realm_tier=1, skill=1, n_mug=0, t_last=7200, rand_factor=1.0):
        m_cap = 500000 * realm_tier
        pb = p_base(w)
        f_skill = 1.0 + 0.05 * (skill - 1)
        dg = d_grief(n_mug, t_last)
        raw = w * pb * f_skill * dg * rand_factor
        return min(m_cap, math.floor(raw)), pb, dg, m_cap

    # 1. Wealth spectrum sweep
    wealth_spectrum = [0, 100, 1000, 10000, 50000, 100000, 500000, 1000000, 10000000, 100000000, 10**9, 10**12]
    print("\n--- 1.1 Wealth Spectrum & Base Plunder % ---")
    print(f"{'Wealth (W)':>15} | {'P_base(W)':>10} | {'Uncapped (Tier 1)':>18} | {'Capped (Tier 1)':>16} | {'Capped (Tier 5)':>16}")
    print("-" * 85)
    for w in wealth_spectrum:
        pb = p_base(w)
        uncapped = math.floor(w * pb)
        loot_t1, _, _, m_cap1 = calc_loot(w, realm_tier=1, skill=1, n_mug=0, t_last=7200)
        loot_t5, _, _, m_cap5 = calc_loot(w, realm_tier=5, skill=1, n_mug=0, t_last=7200)
        print(f"{w:>15,d} | {pb*100:>9.2f}% | {uncapped:>18,d} | {loot_t1:>16,d} | {loot_t5:>16,d}")

    # 1.2 Smoothness and Continuity test around key transition points
    print("\n--- 1.2 Continuity Probing at Thresholds ---")
    thresholds = [10000, 100000, 1000000, 10000000, 100000000]
    for th in thresholds:
        w_below = th - 1
        w_at = th
        w_above = th + 1
        pb_below = p_base(w_below)
        pb_at = p_base(w_at)
        pb_above = p_base(w_above)
        delta_below = abs(pb_at - pb_below)
        delta_above = abs(pb_above - pb_at)
        print(f"Threshold W={th:,d}: Below={pb_below*100:.4f}%, At={pb_at*100:.4f}%, Above={pb_above*100:.4f}% | MaxDelta={max(delta_below, delta_above):.2e}")

    # 1.3 Anti-Grief Recency & Frequency Decay Sweep
    print("\n--- 1.3 Anti-Grief Decay Probing ---")
    mugs_list = [0, 1, 3, 5, 10]
    intervals = [0, 30, 60, 120, 300, 600, 1800, 3600, 7200]
    print(f"{'Mugs (N)':>10} | {'t_last (s)':>10} | {'D_grief':>10} | {'Eff % (W=10k)':>14} | {'Eff % (W=100M)':>14} | {'< 1% Status':>12}")
    print("-" * 80)
    for n in mugs_list:
        for t in intervals:
            dg = d_grief(n, t)
            eff_10k = p_base(10000) * dg
            eff_100m = p_base(100000000) * dg
            status = "PASS (<1%)" if eff_10k < 0.01 else "EXCEEDS"
            if t in [60, 300] or (n in [1, 3, 5] and t in [60, 300, 1800]):
                print(f"{n:>10} | {t:>10} | {dg:>10.4f} | {eff_10k*100:>13.3f}% | {eff_100m*100:>13.3f}% | {status:>12}")

    # 1.4 Consecutive Mugging Simulation (Victim holds 1,000,000 Linh Thach)
    print("\n--- 1.4 Consecutive Mugging Simulation (W_0 = 1,000,000, Tier 3) ---")
    w = 1000000
    for attack_interval in [60, 300, 1800]:
        print(f"\nScenario: Attack every {attack_interval} seconds:")
        curr_w = w
        for hit in range(1, 6):
            loot, pb, dg, _ = calc_loot(curr_w, realm_tier=3, skill=5, n_mug=hit-1, t_last=attack_interval)
            pct = (loot / curr_w * 100) if curr_w > 0 else 0
            curr_w -= loot
            print(f"  Hit {hit}: Loot={loot:>8,d} ({pct:>5.2f}% of wallet) | Remaining={curr_w:>9,d} | D_grief={dg:.4f}")

    return True


def test_hospital_duration():
    print("\n" + "=" * 80)
    print("TEST 2: HOSPITAL DURATION FORMULA & TRAUMA SCALING")
    print("=" * 80)

    def m_delta(delta_l):
        if delta_l > 0:
            return max(0.5, 1.0 - 0.03 * delta_l)
        elif delta_l < 0:
            return min(1.75, 1.0 + 0.05 * abs(delta_l))
        else:
            return 1.0

    def m_realm(realm_tier):
        return 1.0 + 0.15 * (realm_tier - 1)

    def m_overkill(lethal_dmg, rem_hp, max_hp):
        excess = lethal_dmg - rem_hp
        ratio = excess / max_hp if max_hp > 0 else 0
        return max(1.0, min(1.5, 1.0 + ratio))

    def calc_hospital(t_base, realm_tier, lethal_dmg, rem_hp, max_hp, delta_l, t_min=600, t_max=3600):
        mr = m_realm(realm_tier)
        mo = m_overkill(lethal_dmg, rem_hp, max_hp)
        md = m_delta(delta_l)
        raw = t_base * mr * mo * md
        clamped = max(t_min, min(t_max, raw))
        return clamped, raw, mr, mo, md

    # 2.1 Level Delta Sweep
    print("\n--- 2.1 Level Delta Multiplier (M_delta) ---")
    deltas = [-50, -30, -20, -15, -10, -5, 0, 5, 10, 15, 17, 20, 30, 50]
    print(f"{'Delta L':>10} | {'M_delta':>10} | {'Explanation':>35}")
    print("-" * 65)
    for dl in deltas:
        md = m_delta(dl)
        expl = "Underdog max cap (1.75x)" if md == 1.75 else ("High-level bully floor (0.50x)" if md == 0.50 else "Linear scaling")
        print(f"{dl:>10} | {md:>10.2f}x | {expl:>35}")

    # 2.2 Realm Tier Multiplier Sweep
    print("\n--- 2.2 Realm Tier Multiplier (M_realm) ---")
    realms = [(1, "Luyện Khí"), (2, "Trúc Cơ"), (3, "Kim Đan"), (4, "Nguyên Anh"), (5, "Hóa Thần")]
    for r, name in realms:
        print(f"Tier {r} ({name}): M_realm = {m_realm(r):.2f}x")

    # 2.3 Overkill Multiplier Sweep
    print("\n--- 2.3 Overkill Trauma Multiplier (M_overkill) ---")
    overkills = [0.0, 0.1, 0.25, 0.5, 0.75, 1.0, 2.0]
    for ok in overkills:
        # let max_hp = 1000, rem_hp = 100, lethal = 100 + ok * 1000
        mo = m_overkill(100 + ok * 1000, 100, 1000)
        print(f"Excess Damage Ratio = {ok:>4.2f} MaxHP -> M_overkill = {mo:.2f}x")

    # 2.4 Comprehensive Matrix for Trọng Thương (T_base = 1800s)
    print("\n--- 2.4 Hospital Lockout Matrix for Trọng Thương (T_base = 1800s) ---")
    print(f"{'Realm':>8} | {'Delta L':>8} | {'Overkill':>10} | {'Raw Time (s)':>14} | {'Clamped Time (s)':>18} | {'Minutes':>10}")
    print("-" * 80)
    test_cases = [
        (1, 50, 0.0),    # Tier 1, bully (+50), no overkill
        (1, 0, 0.0),     # Tier 1, even (0), no overkill
        (1, -50, 0.5),   # Tier 1, underdog (-50), max overkill
        (3, 0, 0.0),     # Tier 3, even, no overkill
        (3, -20, 0.25),  # Tier 3, underdog, moderate overkill
        (5, 50, 0.0),    # Tier 5, bully, no overkill
        (5, 0, 0.0),     # Tier 5, even, no overkill
        (5, -50, 0.5),   # Tier 5, underdog, max overkill
    ]
    for r, dl, ok in test_cases:
        t_clamp, t_raw, mr, mo, md = calc_hospital(1800, r, 100 + ok * 1000, 100, 1000, dl, 600, 3600)
        print(f"Tier {r:>3} | {dl:>8} | {ok*100:>8.0f}% | {t_raw:>14.1f}s | {t_clamp:>18.1f}s | {t_clamp/60:>9.1f}m")

    # 2.5 Bounds Verification for Other Outcomes
    print("\n--- 2.5 Outcome Bounds Inspection (Trọng Thương vs Đoạt Bảo vs Chỉ Điểm) ---")
    outcomes = [
        ("Chỉ Điểm (Spar)", 45, 30, 60),
        ("Đoạt Bảo (Mug)", 180, 120, 300),
        ("Trọng Thương (Hospitalize)", 1800, 600, 3600),
        ("Attacker Loss", 300, 150, 600),
    ]
    for name, base, tmin, tmax in outcomes:
        min_raw = base * m_realm(1) * 1.0 * 0.5
        max_raw = base * m_realm(5) * 1.5 * 1.75
        print(f"{name:<25} | Base={base:>4}s | MinRaw={min_raw:>6.1f}s (ClampMin={tmin}s) | MaxRaw={max_raw:>7.1f}s (ClampMax={tmax}s)")

    return True


def test_chaining():
    print("\n" + "=" * 80)
    print("TEST 3: CHAINING COUNTDOWN DECAY & SCALING MULTIPLIERS")
    print("=" * 80)

    def get_chain_timeout(hit_count):
        if hit_count <= 0:
            return 300
        elif 1 <= hit_count <= 10:
            return 300
        elif 11 <= hit_count <= 50:
            return 240
        elif 51 <= hit_count <= 100:
            return 180
        elif 101 <= hit_count <= 250:
            return 150
        elif 251 <= hit_count <= 500:
            return 120
        elif 501 <= hit_count <= 1000:
            return 90
        else: # 1001+
            return 60

    hits = [1, 10, 11, 25, 50, 51, 100, 101, 250, 251, 500, 501, 1000, 1001, 2500, 5000, 10000]
    print(f"{'Hit Count (N)':>15} | {'Timeout (s)':>12} | {'Timeout (mm:ss)':>16} | {'Monotonic Check':>18}")
    print("-" * 70)
    prev_timeout = 999
    all_monotonic = True
    for h in hits:
        t = get_chain_timeout(h)
        monotonic = t <= prev_timeout
        if not monotonic:
            all_monotonic = False
        m, s = divmod(t, 60)
        print(f"{h:>15} | {t:>12} | {f'{m:02d}:{s:02d}':>16} | {'OK' if monotonic else 'VIOLATION':>18}")
        prev_timeout = t

    print(f"\nMonotonic decay verification: {'PASSED' if all_monotonic else 'FAILED'}")
    print(f"Minimum floor at N=10,000: {get_chain_timeout(10000)}s (>= 60s: {get_chain_timeout(10000) >= 60})")

    # Fair Fight Multiplier (FFM)
    print("\n--- 3.2 Fair Fight Multiplier (FFM) Probing ---")
    def ffm(att_stat, def_stat):
        if att_stat <= 0:
            return 0.1 # division by zero guard
        raw = 1.0 + (def_stat - att_stat) / att_stat
        return max(0.1, min(3.0, raw))

    stat_cases = [
        (1000, 10, "Dummy / Pushover target"),
        (1000, 100, "Weak target"),
        (1000, 500, "Half-stat target"),
        (1000, 1000, "Equal opponent"),
        (1000, 2000, "Strong opponent (2x)"),
        (1000, 3000, "Giant opponent (3x)"),
        (1000, 5000, "Apex boss (>3x)"),
        (0, 1000, "Zero-stat attacker (edge case)"),
    ]
    print(f"{'Attacker Stat':>15} | {'Defender Stat':>15} | {'FFM':>8} | {'Scenario':>30}")
    print("-" * 75)
    for a, d, sc in stat_cases:
        res = ffm(a, d)
        print(f"{a:>15} | {d:>15} | {res:>7.2f}x | {sc:>30}")

    return True


def test_tam_canh_and_toxicity():
    print("\n" + "=" * 80)
    print("TEST 4: DYNAMIC TÂM CẢNH & TOXICITY SATURATION")
    print("=" * 80)

    # 4.1 Gym stat gain multiplier
    def gym_multiplier(tam_canh):
        return 1.0 + tam_canh / 2500.0

    tc_values = [0, 500, 999, 1000, 2500, 4999, 5000, 7500, 9999, 10000, 15000]
    print("\n--- 4.1 Gym Training Multiplier vs Tâm Cảnh ---")
    print(f"{'Tâm Cảnh':>12} | {'Multiplier':>12} | {'Relative to Base (1000)':>25}")
    print("-" * 55)
    base_m = gym_multiplier(1000)
    for tc in tc_values:
        m = gym_multiplier(tc)
        rel = m / base_m
        print(f"{tc:>12} | {m:>11.2f}x | {rel:>24.2f}x")

    # 4.2 Natural regression decay over time
    print("\n--- 4.2 Natural Regression Decay (Base = 1000, Start = 10,000) ---")
    base_dw = 1000
    tc = 10000
    print(f"{'Tick (15m)':>12} | {'Elapsed Time':>15} | {'Tâm Cảnh':>12} | {'Multiplier':>12}")
    print("-" * 55)
    for tick in range(0, 17):
        m = gym_multiplier(tc)
        hours, mins = divmod(tick * 15, 60)
        print(f"{tick:>12} | {f'{hours}h {mins:02d}m':>15} | {tc:>12.1f} | {m:>11.2f}x")
        tc = base_dw + (tc - base_dw) * (1.0 - 0.07)

    # 4.3 Combat trauma shock
    print("\n--- 4.3 Combat Trauma Shock Trajectory ---")
    tc_start = 5000
    # 3 consecutive mugs
    tc_mug = tc_start
    print(f"Starting at Tâm Cảnh = {tc_start}:")
    for i in range(1, 4):
        tc_mug *= (1.0 - 0.15)
        print(f"  After Mug {i} (-15%): Tâm Cảnh = {tc_mug:.1f} (Multiplier: {gym_multiplier(tc_mug):.2f}x)")
    # 2 consecutive hospitalizations
    tc_hosp = tc_start
    for i in range(1, 3):
        tc_hosp *= (1.0 - 0.30)
        print(f"  After Hospitalize {i} (-30%): Tâm Cảnh = {tc_hosp:.1f} (Multiplier: {gym_multiplier(tc_hosp):.2f}x)")

    # 4.4 Toxicity points & Overdose
    print("\n--- 4.4 Toxicity Points & Qi Deviation (Tẩu Hỏa Nhập Ma) ---")
    def p_overdose(tp):
        if tp < 60:
            return 0.0
        elif tp >= 100:
            return 1.0
        else:
            return (tp - 50.0) / 50.0

    tp_vals = [0, 20, 24, 25, 49, 50, 59, 60, 70, 80, 90, 100, 120]
    print(f"{'TP':>8} | {'Status Tier':>25} | {'P(Tẩu Hỏa)':>15} | {'Stamina Regen Penalty':>25}")
    print("-" * 80)
    for tp in tp_vals:
        p = p_overdose(tp)
        if tp < 25:
            tier = "Thanh Khiết (Normal)"
            penalty = "0%"
        elif tp < 50:
            tier = "Vi Vi Độc"
            penalty = "-10% Stamina Regen"
        elif tp < 80:
            tier = "Nhiễm Độc"
            penalty = "-25% Stats, No Breakthrough"
        else:
            tier = "TẨU HỎA NHẬP MA"
            penalty = "Hospital 8h, Energy wiped"
        print(f"{tp:>8} | {tier:>25} | {p*100:>14.1f}% | {penalty:>25}")

    return True


def test_anti_alt_anomaly():
    print("\n" + "=" * 80)
    print("TEST 5: ANTI-ALT ANOMALY SCORING ($S_{anomaly}$) & THRESHOLD REACHABILITY")
    print("=" * 80)

    # Weights
    w_trade = 0.35
    w_pvp = 0.30
    w_network = 0.20
    w_velocity = 0.15

    def s_anomaly(s_tr, s_pv, s_net, s_vel):
        return w_trade * s_tr + w_pvp * s_pv + w_network * s_net + w_velocity * s_vel

    # Table of rules:
    # Trade: Asymmetric Wealth (+40), Zero-Price Dump (+50)
    # PvP: Pushover Farming (+45), Reciprocal Swap (+60)
    # Network: IP/Device Cluster (+30)
    # Velocity: Transaction Velocity Spike (+35)

    print("\n--- 5.1 Evaluating Anomaly Score Under Sub-vector Model ---")
    scenarios = [
        ("Normal Active Player", 0, 0, 0, 0),
        ("Suspicious Trade Only (Zero-Price Dump)", 50, 0, 0, 0),
        ("Suspicious PvP Only (Reciprocal Swap)", 0, 60, 0, 0),
        ("Device Clustered Only", 0, 0, 30, 0),
        ("Velocity Spike Only", 0, 0, 0, 35),
        ("Mule Vector A: Dump (50) + Cluster (30)", 50, 0, 30, 0),
        ("Mule Vector B: Dump (50) + Velocity (35)", 50, 0, 0, 35),
        ("Syndicate Bot: Dump(50) + Swap(60) + Cluster(30) + Spike(35)", 50, 60, 30, 35),
        ("Extreme All-Rule Trigger: Tr(90) + PvP(105) + Net(30) + Vel(35)", 90, 105, 30, 35),
    ]

    print(f"{'Scenario':<42} | {'S_tr':>5} {'S_pv':>5} {'S_net':>5} {'S_vel':>5} | {'S_anomaly':>10} | {'Warning (>=50)':>15} | {'Quarantine (>=75)':>18} | {'Shadowban (>=90)':>18}")
    print("-" * 125)
    for name, tr, pv, net, vel in scenarios:
        score = s_anomaly(tr, pv, net, vel)
        warn = "TRIGGERED" if score >= 50 else "NO"
        quar = "TRIGGERED" if score >= 75 else "NO"
        shd = "TRIGGERED" if score >= 90 else "NO"
        print(f"{name:<42} | {tr:>5} {pv:>5} {net:>5} {vel:>5} | {score:>10.2f} | {warn:>15} | {quar:>18} | {shd:>18}")

    print("\n--- 5.2 Mathematical Analysis of Anomaly Scoring Inconsistency ---")
    max_single_rule = s_anomaly(50, 60, 30, 35)
    max_all_rules = s_anomaly(90, 105, 30, 35)
    print(f"Max score with highest rule in each vector: {max_single_rule:.2f} (Threshold Warning=50, Quarantine=75, Shadowban=90)")
    print(f"Max score with ALL rules summed in each vector: {max_all_rules:.2f}")
    print(f"CRITICAL DEFECT DETECTED: Under weighted convex combination S_anomaly = SUM(w_i * S_i), a blatant mule account triggering all 4 categories reaches ONLY {max_single_rule:.2f} points, failing even the lowest Warning tier (50)!")

    # Propose calibrated models:
    print("\n--- 5.3 Calibrated Solutions ---")
    print("Alternative 1: Direct Cumulative Scoring (Unweighted Sum):")
    for name, tr, pv, net, vel in scenarios:
        unweighted_sum = tr + pv + net + vel
        print(f"  {name:<42}: Sum = {unweighted_sum:>5} | Warn(>=50): {unweighted_sum >= 50} | Quar(>=75): {unweighted_sum >= 75} | Shadow(>=90): {unweighted_sum >= 90}")

    print("\nAlternative 2: Calibrated Thresholds for Weighted Model:")
    print("If maintaining weights (0.35, 0.30, 0.20, 0.15), thresholds should be re-calibrated:")
    print("  - Warning Tier:     S_anomaly >= 20.0 (e.g. single severe violation)")
    print("  - Quarantine Tier:  S_anomaly >= 35.0 (e.g. multi-vector correlation)")
    print("  - Shadowban Tier:   S_anomaly >= 45.0 (e.g. coordinated bot farm)")

    return True

if __name__ == "__main__":
    test_mug_plunder()
    test_hospital_duration()
    test_chaining()
    test_tam_canh_and_toxicity()
    test_anti_alt_anomaly()
