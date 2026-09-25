(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const f of o)if(f.type==="childList")for(const r of f.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const f={};return o.integrity&&(f.integrity=o.integrity),o.referrerPolicy&&(f.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?f.credentials="include":o.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(o){if(o.ep)return;o.ep=!0;const f=e(o);fetch(o.href,f)}})();const Et="/api";class Ht{async request(t,e={}){try{const l=await fetch(`${Et}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),o=await l.json();if(!l.ok)throw new Error(o.error||`HTTP ${l.status}`);return o}catch(l){throw console.error(`API Error [${t}]:`,l),l}}register(t,e,l,o){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:l,gender:o})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,l=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:l})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,l=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:l})})}toggleAura(t,e){return this.request(`/player/${t}/skills/toggle-aura`,{method:"POST",body:JSON.stringify({auraId:e})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,l=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:l})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCraftingMastery(t){return this.request(`/player/${t}/crafting-mastery`)}getMonsterMastery(t){return this.request(`/player/${t}/monster-mastery`)}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,l,o=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:l,lockAffixIndex:o})})}enrollNode(t,e,l){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:l})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,l){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:l})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,l,o){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:l,amount:o})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,l=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${l}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,l,o){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:l,message:o})})}getMarketListings(t="",e="newest"){const l=new URLSearchParams;return t&&l.set("type",t),e&&l.set("sort",e),this.request(`/market?${l.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,l,o,f){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:l,quantity:o,price:f})})}buyFromMarket(t,e,l=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:l})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}getTribulationPreview(t){return this.request(`/player/${t}/tribulation-preview`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,l){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:l})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,l,o){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:l,description:o})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,l,o=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:l,lockAffixIndex:o})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,l,o=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:l,quantity:o})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,l,o=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:l,durationHours:o})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,l=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:l})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const A=new Ht;function Pt(n,t){var b,w;const{state:e,api:l,notify:o,renderGame:f,updateSidebar:r}=t,d=e.player,g=e.exploration?e.exploration[d.currentArea||"thanh_lam_tran"]:null,x=g?g.name:"Vùng Đất Vô Danh",T=g&&(g.staminaCost||g.stamina_cost)||10;n.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${x}</h1>
      <div class="text-dim text-sm">Nơi cất giấu nhiều cơ duyên và hiểm nguy.</div>
    </div>

    <!-- AUTO BATTLE 2D ARENA -->
    <div class="panel mt-md toggle-auto-combat" style="display:none; border-color:var(--gold);">
      <div class="panel-title flex justify-between items-center">
         <span>⚡ Tự Động Rà Soát & Quét Quái (Auto-Combat)</span>
         <button class="btn btn--red btn--sm" id="btnStopAuto">Dừng Quét</button>
      </div>
      <div class="panel-body text-center" id="autoCombatStatus" style="font-size:13px; color:var(--text-bright); padding:16px; background: rgba(0,0,0,0.3);">
        <div style="font-size:28px;margin-bottom:8px">🔍</div>
        <div>Đang rà soát dấu vết yêu thú xung quanh...</div>
      </div>
    </div>

    <!-- KHÁM PHÁ -->
    <div class="panel" id="panelKhamPha" style="border-color: rgba(208, 165, 48, 0.4); box-shadow: 0 4px 15px rgba(208, 165, 48, 0.1);">
      <div class="panel-body text-center" style="padding: 24px 16px;">
        <h2 class="text-lg text-gold mb-sm">Dò Thám Xung Quanh</h2>
        <p class="text-dim mb-md">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
        <div class="flex justify-center gap-2 flex-wrap">
          <button class="btn btn--gold btn--lg" id="btnExplore" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span>🔍 Tìm Kiếm</span>
            <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${T} Thể Lực</span>
          </button>
          <button class="btn btn--red btn--lg" id="btnAutoBattle" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span>⚡ Tự Động Quét Quái</span>
          </button>
        </div>
      </div>
    </div>

    <!-- KẾT QUẢ KHÁM PHÁ & CHIẾN ĐẤU (Ưu tiên hiển thị ngay trên đầu) -->
    <div id="exploreResult"></div>
    <div id="combatResult"></div>

    <!-- DẤU VẾT YÊU THÚ (tấn công) -->
    <div class="panel mt-md">
      <div class="panel-title">⚔️ Yêu Thú Đang Rình Rập <span class="subtitle">(Tối đa 5 con)</span></div>
      <div class="panel-body no-pad" id="trackedMonstersList" style="max-height: 400px; overflow-y: auto;">
        <div style="padding: 16px; text-align: center;" class="text-dim">Đang rà soát dấu vết...</div>
      </div>
    </div>

    <!-- QUẦN THỂ YÊU THÚ -->
    <div class="panel mt-md">
      <div class="panel-title">📋 Quần Thể Yêu Thú <span class="subtitle">(Có thể xuất hiện tại đây)</span></div>
      <div class="panel-body no-pad" id="areaMonstersList" style="max-height: 250px; overflow-y: auto;">
      </div>
    </div>`;const y=((b=d.insightLevels)==null?void 0:b.monster)??0,p=async()=>{try{const L=await l.getAreaMonsters(d.id);if(L.monsters){e.player.trackedMonsters=L.monsters;const $=document.getElementById("trackedMonstersList");if(!$)return;if(L.monsters.length===0){$.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}$.innerHTML=L.monsters.map(k=>{const S=k.currentHp/k.stats.hp*100,E=S>60?"var(--green)":S>30?"var(--orange)":"var(--red)";let M='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';y>=1&&(M=`<div class="item-desc text-sm text-dim mb-sm">${k.description||"Yêu thú vùng này."}</div>`);let _="";y>=1&&(_=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${S}%; background: ${E}; height: 100%;"></div>
            </div>`);let O=y>=2?`❤ ${k.currentHp}/${k.stats.hp}`:y>=1?"❤ ???":"";return`
            <div class="monster-card ${k.is_boss?"boss":""}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${k.icon||"👾"}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${k.is_boss?"var(--red)":"var(--text-bright)"}; font-size: 15px;">${k.name}</span>
                    <span class="badge ${k.is_boss?"bg-red":"bg-darker"}">Cấp ${k.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${E};">${O}</div>
                </div>
                ${_}
                ${M}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${k.instance_id}" data-monster-id="${k.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),$.querySelectorAll(".btnTrackedCombat").forEach(k=>{k.addEventListener("click",S=>{const E=S.currentTarget.dataset.monsterId,M=S.currentTarget.dataset.instanceId;ct(t,E,M)})})}}catch(L){console.error(L)}},h=async()=>{try{const L=await l.getAreaMonsterTemplates(d.currentArea||"thanh_lam_tran");if(L.monsters){const $=document.getElementById("areaMonstersList");if(!$)return;if(L.monsters.length===0){$.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}$.innerHTML=L.monsters.map(k=>`
            <div style="display: flex; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div style="font-size: 24px; width: 36px; text-align: center;">${k.icon||"👾"}</div>
              <div style="flex: 1;">
                <div class="flex items-center gap-2">
                  <span class="bold" style="color: ${k.isBoss?"var(--red)":"var(--text-bright)"}; font-size: 13px;">${k.name}</span>
                  <span class="badge ${k.isBoss?"bg-red":"bg-darker"} text-xs">Cấp ${k.level}</span>
                </div>
                <div class="text-xs text-dim">${k.description||"Yêu thú sinh sống tại khu vực này."}</div>
              </div>
            </div>
          `).join("")}}catch(L){console.error(L)}};p(),h(),(w=document.getElementById("btnExplore"))==null||w.addEventListener("click",()=>ot(t));let v=!1;const u=document.getElementById("btnAutoBattle"),c=document.getElementById("btnStopAuto"),s=document.getElementById("panelKhamPha"),i=document.querySelector(".toggle-auto-combat"),m=document.getElementById("autoCombatStatus");u&&u.addEventListener("click",()=>{v=!0,s.style.display="none",i.style.display="block",a()}),c&&c.addEventListener("click",()=>{v=!1,s.style.display="block",i.style.display="none"});async function a(){var S,E,M,_,O,C,q,P,B,R;let L=0,$=0,k=0;for(;v;){m.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${L} trận | +${$} XP | +${k} Linh Thạch</div>
        `;const G=e.player;if((G.currentStamina||0)<T){m.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",v=!1;break}if(G.currentHp/G.maxHp<.2){m.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",v=!1;break}try{const N=await l.explore(e.playerId);if(e.player=N.player,r(),N.event&&(N.event.type==="monster"||N.event.type==="worldBoss")){if(m.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${N.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(K=>setTimeout(K,600)),!v)break;const I=await l.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:N.event.monsterId})});if(e.player=I.player,r(),I.outcome==="win")L++,$+=((S=I.rewards)==null?void 0:S.xp)||0,k+=((E=I.rewards)==null?void 0:E.gold)||0,m.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(M=I.monster)==null?void 0:M.name}! (+${((_=I.rewards)==null?void 0:_.xp)||0} XP, +${((O=I.rewards)==null?void 0:O.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${L} | Tiếp tục sau 1s...</div>
                   `;else{m.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${I.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,v=!1;break}}else if(N.event&&N.event.type==="monster_ambush"&&N.event.combatResult){const I=N.event.combatResult;if(I.outcome==="win")L++,$+=((C=I.rewards)==null?void 0:C.xp)||0,k+=((q=I.rewards)==null?void 0:q.gold)||0,m.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(P=I.monster)==null?void 0:P.name}! (+${((B=I.rewards)==null?void 0:B.xp)||0} XP)</div>`;else{m.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",v=!1;break}}else m.innerHTML=`<div class='text-blue'>${((R=N.event)==null?void 0:R.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(N){m.innerHTML=`<div class='text-red'>Lỗi: ${N.message}. Dừng tự động.</div>`,v=!1;break}await new Promise(N=>setTimeout(N,1200))}}}async function ot(n){var d,g,x;const{state:t,api:e,notify:l,updateSidebar:o}=n,f=document.getElementById("exploreResult");if(!f)return;const r=document.getElementById("btnExplore");r&&(r.disabled=!0,r.style.opacity="0.6"),f.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const T=await e.explore(t.playerId);t.player=T.player,o();const y=T.event,p=T.cost||10,h=T.player.currentStamina??0,v=T.player.maxStamina??100,u=h>=p;let c=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
          <div style="margin-bottom: 10px;">
            <span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px;">
              🏃 -${p} Thể Lực (Hiện có: ${h}/${v})
            </span>
          </div>
    `;if(y.type==="monster")c+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${y.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${y.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${y.monsterId}">👣 Theo Dõi</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${u?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(y.type==="monster_ambush"&&y.combatResult){const s=y.combatResult,i=pt(s.log||[]),m=s.outcome==="win"?"🏆 Chiến thắng!":s.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",a=s.outcome==="win"?"var(--green)":s.outcome==="loss"?"var(--red)":"var(--orange)";c+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${y.message}</div>
        <div style="font-size:16px;font-weight:700;color:${a};margin-bottom:12px">${m}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${i}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${u?"":"disabled"}>🔍 Dò Thám Tiếp (-${p} TL)</button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(y.type==="worldBoss")c+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${y.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${y.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${y.monsterId}">👣 Ghi Dấu</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${u?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(y.type==="npc"&&y.npcId)c+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${y.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${y.message}</div>
        <div class="text-sm text-dim mb-md">${y.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnNpcInteract">💬 Bái Kiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreAgain" ${u?"":"disabled"}>🔍 Dò Tiếp</button>
          <button class="btn btn--dark" id="btnExploreContinue">Đóng</button>
        </div>
      `;else if(y.type==="player_encounter"&&y.targetPlayer){const s=y.targetPlayer;c+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${s.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${s.realmTierName||"Phàm nhân"} · Cấp ${s.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${s.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${s.id}">⚔️ Cướp Bóc</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${u?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `}else c+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${y.message}</div>
        ${y.gold?`<div class="text-gold bold">+${y.gold} 💎 Linh Thạch</div>`:""}
        ${y.item?`<div class="text-green bold">+1 ${y.item.name}</div>`:""}
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${u?"":"disabled"}>
            ${u?`🔍 Dò Thám Tiếp (-${p} TL)`:`❌ Hết Thể Lực (${h}/${p})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `;c+="</div></div>",f.innerHTML=c,(y.type==="monster"||y.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",s=>{f.innerHTML="",ct(n,s.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async s=>{try{const i=await e.trackMonster(t.playerId,s.target.dataset.mid);i.success?(l(i.message,"success"),f.innerHTML="",typeof n.renderGame=="function"&&n.renderGame()):i.error&&l(i.error,"error")}catch(i){l("Lỗi theo dõi: "+i.message,"error")}})),y.type==="npc"&&y.npcId&&((d=document.getElementById("btnNpcInteract"))==null||d.addEventListener("click",async()=>{await Mt(n,y.npcId,f)})),(g=document.getElementById("btnExploreAgain"))==null||g.addEventListener("click",()=>{ot(n)}),(x=document.getElementById("btnExploreContinue"))==null||x.addEventListener("click",()=>{f.innerHTML=""})}catch(T){f.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${T.message}</div></div>`}finally{r&&(r.disabled=!1,r.style.opacity="1")}}async function Mt(n,t,e){const{state:l,api:o,notify:f,renderGame:r}=n,d=document.getElementById("npcQuestModal")||e;try{const x=(await o.getNpc(t)).npc;if(!x)return;const T=(l.player.activeQuests||[]).map(p=>p.quest_id);let y=x.quests.map(p=>{const h=T.includes(p.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${p.name}</span>
            <span class="text-xs badge" style="background:${p.type==="kill"?"var(--red)":"var(--green)"}">${p.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${p.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${p.rewards.gold?p.rewards.gold+"💎 ":""}${p.rewards.xp?p.rewards.xp+"✨ ":""}${p.rewards.skillChance?"🎯 "+p.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${h?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${p.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");d.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${x.icon||"🧓"} ${x.name} <span class="subtitle">${x.profession}</span></div>
        <div class="panel-body">
          ${y||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,d.querySelectorAll(".btn-accept-quest").forEach(p=>{p.addEventListener("click",async()=>{p.disabled=!0,p.textContent="⏳...";try{const h=await o.acceptQuest(l.playerId,p.dataset.npc,p.dataset.qid);l.player=h.player,f(h.message,"success"),r()}catch(h){f(h.message||"Lỗi nhận quest","error"),p.disabled=!1,p.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(g){console.error("NPC load error:",g)}}async function ct(n,t,e=null){var x,T;const{state:l,api:o,notify:f,updateSidebar:r,renderGame:d}=n,g=document.getElementById("combatResult");if(g){if(!l.player.currentHp||l.player.currentHp<=0)return f("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(l.player.hospitalRemaining>0)return f(`Đang tịnh dưỡng! Còn ${l.player.hospitalRemaining}s`,"error");g.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,g.scrollIntoView({behavior:"smooth"});try{const y=await o.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:l.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(l.player=y.player,y.outcome==="no_energy"){g.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${y.log[0]}</div></div>`,r();return}const p=y.monster,h=Math.max(0,l.player.currentHp/l.player.maxHp*100),v=Math.max(0,p.currentHp/p.maxHp*100),u={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},c=u[y.outcome]||u.loss,s=(x=y.rewards)!=null&&x.gold?` · +${y.rewards.gold} 💎`:"",i=y.rewards?` · +${y.rewards.xp} XP${s}`:"",m={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[y.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};g.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${c.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${c.icon}</span> <span>${c.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${y.turns}/${y.maxTurns||25} Lượt ${i}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.9) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright); font-size: 15px; margin-bottom: 2px;">${l.player.name}</div>
              <div style="font-size: 11px; color: ${m.color}; font-weight: 600; margin-bottom: 8px;">
                ${m.icon} ${m.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${h}%; height: 100%; background: ${h>50?"var(--green)":h>20?"var(--orange)":"var(--red)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${l.player.currentHp}/${l.player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(251,191,36,0.5); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${(T=y.glitchEvents)!=null&&T.length?y.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${p.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${p.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${p.level||1} · ${p.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${v}%; height: 100%; background: ${v>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${p.currentHp}/${p.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${y.weakpoint?`
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${y.weakpoint}</strong> (x2.5 Dmg)
                </div>
              `:""}
            </div>

          </div>
        </div>

        <!-- Combat Log -->
        <div class="panel-body no-pad" style="border-top: 1px solid var(--border);">
          <div style="padding: 8px 16px; background: rgba(0,0,0,0.2); font-size: 11px; color: var(--text-dim); text-transform: uppercase; font-weight: 600;">
            📜 Nhật Ký Quyết Đấu Chi Tiết
          </div>
          <div class="combat-log" style="max-height: 250px; overflow-y: auto; padding: 12px 16px;">
            ${pt(y.log)}
          </div>
        </div>
      </div>`;const a=document.getElementById("cardMonster"),b=document.getElementById("cardPlayer");y.glitchEvents&&y.glitchEvents.length>0&&a?y.glitchEvents.forEach((w,L)=>{setTimeout(()=>{dt(a,`-${w.damage} 🌌 [VẾT NỨT]`,"glitch"),a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400)},L*400+200)}):a&&y.rewards&&dt(a,`-${Math.round(p.maxHp*.4)} 💥`,"crit"),r(),e&&typeof d=="function"&&setTimeout(()=>d(),1500)}catch(y){g.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${y.message}</div></div>`}}}function dt(n,t,e="normal"){if(!n)return;const l=document.createElement("div");l.className=`floating-damage damage-${e}`,l.textContent=t,n.appendChild(l),setTimeout(()=>l.remove(),1100)}function pt(n){return(n||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function rt(n,t){const{state:e,api:l,notify:o}=t,f=e.player,r=(f.skills||[]).find(y=>(typeof y=="string"?y:y.id)==="nhan_thuat"),d=r?r.level||1:0,g=[...e.skills].sort((y,p)=>(y.tier||1)-(p.tier||1)),x=(f.skills||[]).map(y=>typeof y=="string"?y:y.id),T={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};n.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${d}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${g.map(y=>{const p=x.includes(y.id),h=y.tier||1,v=h>d+1,u=h<=d;let c="";return y.requirements&&y.requirements.length>0?u||p?c=`<div class="mt-sm text-xs text-orange">Điều kiện: ${y.requirements.map(s=>`<br>• ${s}`).join("")}</div>`:v?c=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${h}.</div>`:c='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':c='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${p?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${y.name} ${p?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${p?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${T[h]||h}</span>
                    <span class="text-xs text-dim">${y.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${u||p?y.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${y.type!=="passive"&&y.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${y.cost} linh lực</div>`:""}
                
                ${c}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${p?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${v?"btn--dark":"btn--gold"} btn--sm btn-learn" ${v?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${y.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,n.querySelectorAll(".accordion-header").forEach(y=>{y.addEventListener("click",()=>{const p=y.nextElementSibling;p.style.display==="none"?(p.style.display="block",y.querySelector("div:last-child").textContent="▲"):(p.style.display="none",y.querySelector("div:last-child").textContent="▼")})}),n.querySelectorAll(".btn-learn").forEach(y=>{y.addEventListener("click",async p=>{p.stopPropagation();try{const h=await l.learnSkill(f.id,y.dataset.sid);h.error?o(h.error,"error"):(e.player=h.player,o(h.message,"success"),rt(n,t))}catch(h){o("Lỗi học kỹ năng: "+h.message,"error")}})})}async function gt(n){const{state:t,api:e,notify:l,updateSidebar:o,renderGame:f}=n,r=t.player;if(!r)return;let d=document.getElementById("tribulation-modal-overlay");d||(d=document.createElement("div"),d.id="tribulation-modal-overlay",d.style.cssText=`
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px); z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      padding: 16px; animation: fadeIn 0.25s ease;
    `,document.body.appendChild(d)),d.innerHTML=`
    <div style="background: #121420; border: 2px solid #eab308; border-radius: 14px; max-width: 580px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(234, 179, 8, 0.2); padding: 24px; text-align: center; color: #fff;">
      <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚡</div>
      <div style="font-size: 16px; font-weight: 700; color: #eab308; margin-top: 8px;">Đang dò xét Thiên Khí & Thăm Dò Thiên Kiếp...</div>
    </div>
  `;try{const g=await e.getTribulationPreview(r.id);It(d,g,n)}catch(g){d.remove(),l(g.message||"Không thể tra cứu thông tin Lôi Kiếp","error")}}function It(n,t,e){var y,p,h;const{state:l,api:o,notify:f,updateSidebar:r,renderGame:d}=e,g=t.tribulation||{},x=t.playerStats||{},T=g.color||"#eab308";n.innerHTML=`
    <div style="background: #111422; border: 2px solid ${T}; border-radius: 14px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 12px 50px rgba(0,0,0,0.95), 0 0 35px ${T}44; color: #fff; animation: scaleUp 0.25s ease;">
      <!-- HEADER -->
      <div style="padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: linear-gradient(135deg, ${T}22, rgba(0,0,0,0.6)); text-align: center; position: relative;">
        <span style="position: absolute; top: 16px; right: 20px; font-size: 20px; cursor: pointer; color: var(--text-dim);" id="btn-close-tribulation">✕</span>
        <div style="font-size: 28px; line-height: 1;">🌩️</div>
        <div style="font-size: 20px; font-weight: 800; color: ${T}; margin-top: 6px; letter-spacing: 0.5px;">
          ${g.name||"Thiên Lôi Giáng Trần"}
        </div>
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px; font-style: italic;">
          "${g.lore||"Thiên đạo khảo nghiệm, chín chết một sống, tắm mình trong lôi điện để tẩy thoát phàm thai."}"
        </div>
      </div>

      <div style="padding: 20px 24px;">
        <!-- TRIBULATION SPECS -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; text-align: center;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Số Đợt Sét</div>
            <div style="font-size: 18px; font-weight: 800; color: ${T}; margin-top: 2px;">${g.waves||3} Đợt</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Uy Lực Khởi Đầu</div>
            <div style="font-size: 18px; font-weight: 800; color: #ef4444; margin-top: 2px;">~${g.baseDamage||150} ST</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Gia Tăng Uy Lực</div>
            <div style="font-size: 18px; font-weight: 800; color: #f59e0b; margin-top: 2px;">+${Math.round(((g.scaling||1.3)-1)*100)}%/đợt</div>
          </div>
        </div>

        <!-- DEFENSIVE ASSESSMENT -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px; margin-bottom: 18px;">
          <div style="font-size: 13px; font-weight: 700; color: var(--gold); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>🛡️ Khả Năng Sinh Tồn & Phòng Hộ Bản Thân</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">❤️ Khí Huyết:</span>
              <span style="font-weight: 700; color: #10b981;">${x.currentHp}/${x.maxHp} HP</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🔵 Chân Khí Hộ Thể:</span>
              <span style="font-weight: 700; color: #38bdf8;">${x.usableEnergy} LL (1 LL = 2.5 HP)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🛡️ Giáp Giảm Thương:</span>
              <span style="font-weight: 700; color: #60a5fa;">-${x.defenseMitigationPct||0}% ST cơ thể</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">💨 Thân Pháp Chẻ Sét:</span>
              <span style="font-weight: 700; color: #a78bfa;">${x.dodgeChancePct||0}% né (-40% ST)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span class="text-dim">🌟 Hộ Thể Kim Chung:</span>
              <span style="font-weight: 700; color: ${x.hasGoldenBell?"#10b981":"var(--text-dim)"};">
                ${x.hasGoldenBell?"✅ Giảm thêm 20% Lôi Kiếp":"❌ Chưa kích hoạt"}
              </span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span class="text-dim">💊 Đan Dược Cứu Mạng:</span>
              <span style="font-weight: 700; color: #f59e0b;">Tự động dùng khi HP < 20%</span>
            </div>
          </div>
        </div>

        <div style="font-size: 11px; color: var(--text-dim); text-align: center; margin-bottom: 18px; line-height: 1.5;">
          ⚠️ <b>Cảnh báo:</b> Đột phá thất bại trước lôi kiếp sẽ tổn hại đan điền, rơi vào trạng thái trọng thương tịnh dưỡng 90 giây và tiêu hao một phần tài nguyên đột phá. Hãy đảm bảo đầy Máu & Linh Lực trước khi dẫn thiên lôi!
        </div>

        <!-- ACTIONS -->
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn--outline" id="btn-cancel-tribulation" style="min-width: 120px;">
            Tạm Hoãn
          </button>
          <button class="btn btn--gold btn--lg shadow-glow" id="btn-start-tribulation" style="min-width: 220px; font-weight: 800; font-size: 15px; animation: pulse 2s infinite;">
            ⚡ DẪN LÔI ĐỘ KIẾP!
          </button>
        </div>
      </div>
    </div>
  `,(y=n.querySelector("#btn-close-tribulation"))==null||y.addEventListener("click",()=>n.remove()),(p=n.querySelector("#btn-cancel-tribulation"))==null||p.addEventListener("click",()=>n.remove()),(h=n.querySelector("#btn-start-tribulation"))==null||h.addEventListener("click",async()=>{await Nt(n,e,g)})}async function Nt(n,t,e){var c,s,i;const{state:l,api:o,notify:f,updateSidebar:r,renderGame:d}=t,g=e.color||"#eab308";n.innerHTML=`
    <div style="background: #0d0f1a; border: 2px solid ${g}; border-radius: 14px; max-width: 620px; width: 100%; max-height: 92vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 15px 60px rgba(0,0,0,0.98), 0 0 45px ${g}66; color: #fff;">
      <!-- ARENA TOP -->
      <div style="padding: 16px 20px; background: linear-gradient(180deg, ${g}22, rgba(0,0,0,0.8)); border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center; position: relative;" id="tribulation-arena-header">
        <div style="font-size: 14px; font-weight: 700; color: ${g}; letter-spacing: 1px;">
          ⚡ ${e.name||"THIÊN LÔI GIÁNG TRẦN"}
        </div>
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 2px;" id="tribulation-wave-indicator">
          Đang ngưng tụ lôi vân...
        </div>

        <!-- DYNAMIC BARS -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span>❤️ Khí Huyết</span>
              <span id="tri-hp-val">...</span>
            </div>
            <div class="bar-track" style="height: 10px; background: rgba(0,0,0,0.6); border-radius: 5px; overflow: hidden;">
              <div class="bar-fill hp" id="tri-hp-bar" style="width: 100%; transition: width 0.5s ease;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span>🔵 Chân Khí</span>
              <span id="tri-energy-val">...</span>
            </div>
            <div class="bar-track" style="height: 10px; background: rgba(0,0,0,0.6); border-radius: 5px; overflow: hidden;">
              <div class="bar-fill energy" id="tri-energy-bar" style="width: 100%; transition: width 0.5s ease;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- LOG STREAM -->
      <div id="tribulation-log-stream" style="flex: 1; min-height: 260px; max-height: 380px; overflow-y: auto; padding: 16px 20px; font-family: monospace; font-size: 13px; line-height: 1.6; background: rgba(0,0,0,0.4); display: flex; flex-direction: column; gap: 8px;">
        <div style="color: #94a3b8; text-align: center; font-style: italic;">
          Vòm trời cuồn cuộn mây đen... Lôi đình chực chờ xé toạc hư không!
        </div>
      </div>

      <!-- FOOTER ACTION -->
      <div style="padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.6); text-align: center;" id="tribulation-footer">
        <span style="font-size: 12px; color: var(--text-dim); animation: pulse 1.5s infinite;">
          ⚡ Đang chống đỡ Thiên Kiếp giáng hạ...
        </span>
      </div>
    </div>
  `;const x=n.querySelector("#tribulation-log-stream"),T=n.querySelector("#tribulation-wave-indicator"),y=n.querySelector("#tri-hp-bar"),p=n.querySelector("#tri-energy-bar"),h=n.querySelector("#tri-hp-val"),v=n.querySelector("#tri-energy-val"),u=n.querySelector("#tribulation-footer");try{const m=await o.attemptBreakthrough(l.playerId),a=m.tribulation;if(!a||!a.logs){m.player&&(l.player=m.player),f(m.message,m.success?"success":"error"),typeof r=="function"&&r(),n.remove(),d();return}let b=((c=m.player)==null?void 0:c.maxHp)||a.startingHp,w=a.startingHp,L=a.startingEnergy,$=((s=m.player)==null?void 0:s.maxEnergy)||Math.max(50,a.startingEnergy);h.textContent=`${w}/${b}`,v.textContent=`${L}`;const k=a.logs||[];for(let S=0;S<k.length;S++){const E=k[S];await new Promise(C=>setTimeout(C,900)),T.textContent=`ĐỢT ${E.wave}/${a.totalWaves} ĐANG GIÁNG XUỐNG!`,T.style.color="#ef4444",n.style.backgroundColor="rgba(255, 255, 255, 0.2)",setTimeout(()=>{n.style.backgroundColor="rgba(0, 0, 0, 0.88)"},80);const M=document.createElement("div");M.style.cssText=`
        padding: 8px 12px; border-radius: 6px;
        background: ${E.defeated?"rgba(239, 68, 68, 0.2)":"rgba(255, 255, 255, 0.05)"};
        border-left: 3px solid ${E.defeated?"#ef4444":E.dodged?"#a78bfa":g};
        animation: fadeIn 0.3s ease;
      `,M.innerHTML=`
        <div style="font-weight: 700; color: ${g}; margin-bottom: 2px;">
          ⚡ Đợt ${E.wave}/${a.totalWaves}: Sét Uy Lực ${E.rawDamage} ST
        </div>
        <div style="color: #e2e8f0; font-size: 12px;">${E.text}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 11px;">
          ${E.dodged?'<span style="color: #a78bfa;">💨 Chẻ sét né tránh</span>':""}
          ${E.auraMitigated?'<span style="color: #10b981;">🛡️ Kim Chung hóa giải</span>':""}
          ${E.absorbedByQi>0?`<span style="color: #38bdf8;">🔵 Chân khí hấp thụ: ${E.absorbedByQi} ST</span>`:""}
          <span style="color: #f87171;">💥 Thương tổn: -${E.actualHpDamage} HP</span>
          ${E.medicineRescued?'<span style="color: #f59e0b; font-weight:700;">💊 Dùng đan dược cứu mệnh!</span>':""}
        </div>
      `,x.appendChild(M),x.scrollTop=x.scrollHeight,w=E.hpRemaining,L=E.energyRemaining;const _=Math.max(0,Math.min(100,Math.round(w/b*100))),O=Math.max(0,Math.min(100,Math.round(L/$*100)));if(y.style.width=`${_}%`,p.style.width=`${O}%`,h.textContent=`${w}/${b}`,v.textContent=`${L}`,E.defeated)break}if(await new Promise(S=>setTimeout(S,800)),m.player&&(l.player=m.player),typeof r=="function"&&r(),a.survived){T.textContent="🌟 LÔI VÂN TAN BIẾN • ĐỘ KIẾP VIÊN MÃN",T.style.color="#10b981";const S=document.createElement("div");S.style.cssText=`
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(16, 185, 129, 0.2));
        border: 2px solid #eab308; border-radius: 8px; padding: 14px; text-align: center;
        margin-top: 8px; animation: scaleUp 0.3s ease;
      `,S.innerHTML=`
        <div style="font-size: 24px;">👑</div>
        <div style="font-size: 16px; font-weight: 800; color: #eab308; margin-top: 4px;">
          ĐỘT PHÁ THÀNH CÔNG!
        </div>
        <div style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
          ${m.message}
        </div>
      `,x.appendChild(S),x.scrollTop=x.scrollHeight,u.innerHTML=`
        <button class="btn btn--gold btn--lg shadow-glow" id="btn-finish-tribulation" style="min-width: 200px; font-weight: 700;">
          🌟 ĐÓN NHẬN TIÊN PHÁP
        </button>
      `,f(m.message,"success")}else{T.textContent="☠️ TRỌNG THƯƠNG • ĐỘT PHÁ THẤT BẠI",T.style.color="#ef4444";const S=document.createElement("div");S.style.cssText=`
        background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; border-radius: 8px;
        padding: 14px; text-align: center; margin-top: 8px; animation: scaleUp 0.3s ease;
      `,S.innerHTML=`
        <div style="font-size: 24px;">☠️</div>
        <div style="font-size: 15px; font-weight: 800; color: #ef4444; margin-top: 4px;">
          ĐỘT PHÁ THẤT BẠI!
        </div>
        <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
          ${m.message}
        </div>
      `,x.appendChild(S),x.scrollTop=x.scrollHeight,u.innerHTML=`
        <button class="btn btn--dark" id="btn-finish-tribulation" style="min-width: 180px;">
          🏥 VỀ DƯỠNG THƯƠNG
        </button>
      `,f(m.message,"error")}(i=n.querySelector("#btn-finish-tribulation"))==null||i.addEventListener("click",()=>{n.remove(),d()})}catch(m){f(m.message||"Lỗi trong quá trình độ kiếp","error"),n.remove(),d()}}function qt(n,t){var h,v,u;const{state:e,api:l,notify:o,renderGame:f}=t,r=e.player,d=r.stats,g=r.allocatedStats||{},x=5,T=r.currentEnergy>=x&&!r.hospitalRemaining,y=r.talentDisplay||{},p=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];n.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${r.currentEnergy}/${r.maxEnergy} linh lực · Chi phí: ${x}/lần</span>
      </div>
    </div>

    ${r.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${r.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${((h=r.realmInfo)==null?void 0:h.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(v=r.realmInfo)!=null&&v.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${p.map(([c,s,i])=>{const m=y[c]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${m.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${s}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${i}</div>
                <div style="font-size:14px;font-weight:700;color:${m.color};margin-top:4px">${m.icon} ${m.name}</div>
                <div style="font-size:11px;color:${m.color};opacity:0.8">×${m.value} hệ số</div>
              </div>
            `}).join("")}
        </div>
        <div style="text-align:center;margin-top:8px;font-size:11px;opacity:0.4">
          Dùng 🧬 Tẩy Tủy Đan để tăng bậc ngẫu nhiên · 🔮 Hoán Cốt Đan để reroll toàn bộ
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">⚔️ Rèn Luyện Chỉ Số</div>
      <div class="panel-body no-pad">
        ${p.map(([c,s,i,m])=>{const a=y[c]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},b=Math.floor(r.currentEnergy/x)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${s}</span> ${i}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${m}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${d[c]??0}</span>
              ${g[c]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${g[c]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${a.color};min-width:50px" title="Căn Cốt: ${a.name} (×${a.value})">${a.icon}×${a.value}</span>
              <input type="number" class="train-count" data-stat="${c}" min="1" max="${b}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${T?"":"disabled"}>
              <button class="btn btn--sm ${T?"btn--blue":"btn--dark"} train-btn" data-train="${c}" ${T?"":"disabled"} title="Tốn ${x} Linh lực/lần · Căn cốt ×${a.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${x} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(r.currentEnergy/x)}</strong> lần hiện tại.
        </div>
        <div class="derived-row mt-3 border-t border-dim pt-3">
          <div class="d-item"><div class="d-val">${d.maxHp??100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${d.maxEnergy??50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${d.energyRegen??5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row pb-3">
          <div class="d-item"><div class="d-val">${d.critChance??5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${d.critMultiplier??1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Khí/đòn</div></div>
        </div>
      </div>
    </div>`,(u=n.querySelector(".btn-breakthrough"))==null||u.addEventListener("click",()=>{gt(t)}),n.querySelectorAll(".train-btn").forEach(c=>{c.addEventListener("click",async s=>{s.stopPropagation();const i=n.querySelector(`.train-count[data-stat="${c.dataset.train}"]`),m=parseInt(i==null?void 0:i.value)||1;try{const a=await l.trainStat(e.playerId,c.dataset.train,m);e.player=a.player,o(a.message,"success"),f()}catch(a){o(a.message||"Lỗi rèn luyện","error")}})})}async function ut(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.player;if(r){n.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const g=(await l.getGlitches(r.id)).status,x=n.querySelector("#glitchContentWrapper");if(!x)return;if(!g.featureUnlocked){zt(x,g.featureDetails,r);return}_t(x,g,r,t)}catch(d){n.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${d.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function zt(n,t,e){const l=(t==null?void 0:t.requirements)||[];n.innerHTML=`
    <div style="text-align: center; padding: 40px 20px; background: radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0.6) 80%); border-radius: 12px; border: 1px dashed rgba(168, 85, 247, 0.3);">
      <div style="font-size: 54px; filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6)); margin-bottom: 12px; animation: pulse 2s infinite;">
        🌫️
      </div>
      <h2 style="color: #c084fc; font-size: 1.5rem; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase;">
        Thiên Cơ Hỗn Loạn — Vụ Khí Mông Lung
      </h2>
      <div style="color: #a1a1aa; max-width: 580px; margin: 0 auto 24px; font-size: 0.9rem; line-height: 1.6; font-style: italic;">
        "Trời đất vận hành theo quy luật tuyệt đối. Nhục thân phàm nhân chưa đủ căn cơ để cảm ứng kẽ hở quy luật của càn khôn..."
      </div>

      <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; max-width: 480px; margin: 0 auto 24px; padding: 16px; text-align: left;">
        <div style="font-size: 0.8rem; color: #fbbf24; text-transform: uppercase; font-weight: bold; margin-bottom: 12px; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
          <span>📜</span> Điều Kiện Phá Bỏ Sương Mù (Đạt 1 trong các mục):
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${l.map(o=>`
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.02); border-radius: 6px; border-left: 3px solid ${o.met?"#22c55e":"#6b7280"};">
              <span style="color: ${o.met?"#86efac":"#d1d5db"}; display: flex; align-items: center; gap: 8px;">
                <span>${o.met?"✅":"🔒"}</span> ${o.label}
              </span>
              <span style="font-size: 0.8rem; color: ${o.met?"#22c55e":"#9ca3af"}; font-weight: bold;">
                ${o.current}
              </span>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="font-size: 0.8rem; color: #71717a; max-width: 460px; margin: 0 auto;">
        💡 Gợi ý: Hãy tiếp tục đột phá tu vi lên <strong>Trúc Cơ</strong> hoặc chiến đấu sinh tử để kích phát kẽ hở thời không.
      </div>
    </div>
  `}function _t(n,t,e,l){const{api:o,notify:f,updateSidebar:r}=l,d=t.imprints||[],g=t.stances||{},x=t.activeStance||"breaker";n.innerHTML=`
    <div>
      <!-- HEADER -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-panel, #333); padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <h2 style="margin: 0; color: #c084fc; display: flex; align-items: center; gap: 8px;">
            <span>🌌</span> Thiên Đạo Dị Biến
          </h2>
          <div style="font-size: 0.85rem; color: #9ca3af; margin-top: 4px;">
            Khai thác lỗ hổng quy luật của thế giới. Hành vi lặp lại tích lũy thành Dấu Ấn & Nội Tại Nghịch Thiên.
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.75rem; color: #aaa; text-transform: uppercase;">Điểm Thấu Triệt</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.4);" id="glitchInsightVal">
            ${t.glitchInsight||0}
          </div>
        </div>
      </div>

      <!-- OVERRIDE CARD -->
      <div style="background: rgba(192, 132, 252, 0.08); border: 1px solid rgba(192, 132, 252, 0.25); border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="font-weight: bold; color: #e9d5ff; font-size: 0.95rem;">⚡ Lách Luật Thiên Đạo (Glitch Override)</div>
          <div style="font-size: 0.8rem; color: #d8b4fe;">
            ${e.hospitalUntil>Math.floor(Date.now()/1e3)?"Xóa bỏ ghi chép tử thương, xuất viện ngay lập tức và hồi 50% HP.":"Đảo chiều quy luật, nạp đầy 100% Linh Lực và Thể Lực tức thì."}
          </div>
        </div>
        <button id="btnOverrideTribulation" class="btn btn--gold" style="white-space: nowrap; font-size: 0.85rem; padding: 6px 14px;">
          🔮 Thi Triển (-50 Thấu Triệt)
        </button>
      </div>

      <!-- STANCE SELECTOR (Kèm sương mù cảnh giới) -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; font-size: 1rem; color: #e5e7eb;">⚔️ Thế Chiến Đấu Cổ Điển (Combat Stances)</h3>
        <div id="stanceContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;"></div>
      </div>

      <!-- GLITCH IMPRINTS (Hệ thống sương mù 3 cấp độ) -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 1rem; color: #e5e7eb;">📜 Dấu Ấn Quy Luật & Sấm Truyền</h3>
          <span style="font-size: 0.85rem; color: #a855f7;">
            ${t.unlockedCount}/${t.totalCount} Dấu Ấn Đã Khai Phá
          </span>
        </div>
        <div id="imprintsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px;"></div>
      </div>
    </div>
  `;const T=n.querySelector("#btnOverrideTribulation");T&&(T.onclick=async()=>{T.disabled=!0,T.textContent="Đang lách luật...";try{const y=await o.overrideTribulation(e.id);f(y.message,"success"),state.player=y.player,r(),ut(n.parentElement,l)}catch(y){f(y.message||"Thao tác lách luật thất bại!","error"),T.disabled=!1,T.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),vt(n,g,x,e,o,f,r),ht(n,d,e,f,r)}function vt(n,t,e,l,o,f,r){const d=n.querySelector("#stanceContainer");d&&(d.innerHTML="",Object.values(t).forEach(g=>{const x=g.isUnlocked!==!1,T=g.id===e,y=document.createElement("div");y.style.cssText=`
      background: ${T?"rgba(168, 85, 247, 0.15)":x?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${T?"#c084fc":x?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${x?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${x?"1":"0.55"};
    `,y.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${x?g.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${x?g.icon:"🔒"}</span> ${g.name}
        </div>
        ${T?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${x?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${x?g.description:`<span style="color:#f59e0b;">${g.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,y.onclick=async()=>{if(!x)return f(g.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!T)try{const p=await o.setStance(l.id,g.id);f(p.message,"success"),state.player=p.player,r(),vt(n,t,g.id,l,o,f,r)}catch(p){f(p.message||"Chuyển thế thất bại","error")}},d.appendChild(y)}))}function ht(n,t,e,l,o){const f=n.querySelector("#imprintsContainer");f&&(f.innerHTML="",t.forEach(r=>{const d=document.createElement("div"),g=r.fogLevel||(r.isUnlocked?"revealed":"fog");let x="rgba(15, 23, 42, 0.5)",T="rgba(255,255,255,0.08)",y="none";g==="revealed"?(x="rgba(30, 41, 59, 0.75)",T=r.color,y=`0 0 12px ${r.color}33`):g==="partial"?(x="rgba(24, 24, 27, 0.6)",T="1px dashed rgba(168, 85, 247, 0.4)"):(x="rgba(10, 10, 15, 0.5)",T="1px dashed rgba(255, 255, 255, 0.08)"),d.style.cssText=`
      background: ${x};
      border: 1px solid ${T};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${y};
      position: relative;
      overflow: hidden;
    `,d.innerHTML=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${r.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${r.icon}</span> ${r.name}
          </div>
          <span style="font-size: 0.7rem; color: ${g==="revealed"?"#fbbf24":"#6b7280"}; border: 1px solid ${g==="revealed"?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.08)"}; padding: 1px 6px; border-radius: 4px;">
            ${g==="revealed"?r.title:g==="partial"?"Chớm Ngộ":"Sương Mù"}
          </span>
        </div>

        <div style="font-size: 0.78rem; color: ${g==="fog"?"#9ca3af":"#a1a1aa"}; font-style: italic; margin-bottom: 8px; line-height: 1.4;">
          "${r.lore}"
        </div>

        <div style="font-size: 0.82rem; color: ${g==="revealed"?"#e4e4e7":"#9ca3af"}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
          <strong style="color: ${g==="revealed"?"#67e8f9":"#888"};">
            ${g==="revealed"?"Hiệu ứng:":g==="partial"?"Manh mối:":"Sấm truyền:"}
          </strong> ${r.description}
        </div>
      </div>

      <div>
        ${g==="revealed"?`
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
            <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐẠI TRIỆT ĐẠI NGỘ</span>
            <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${r.title}">
              ${e.activeTitle===r.title?"Đang Đeo":"Đeo Danh Hiệu"}
            </button>
          </div>
        `:g==="partial"?`
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #a855f7; margin-bottom: 4px;">
              <span>Tiến độ cảm ứng:</span>
              <span>${r.progress.current} / ${r.progress.threshold}</span>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
              <div style="width: ${r.progress.percent}%; height: 100%; background: linear-gradient(90deg, #a855f7, #c084fc); transition: width 0.3s;"></div>
            </div>
          </div>
        `:`
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #6b7280; margin-bottom: 4px;">
              <span>Màn sương che giấu:</span>
              <span>??? / ???</span>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.04); border-radius: 3px; overflow: hidden;">
              <div style="width: 15%; height: 100%; background: #4b5563; opacity: 0.5;"></div>
            </div>
          </div>
        `}
      </div>
    `;const p=d.querySelector(".btnSetTitle");p&&(p.onclick=()=>{e.activeTitle=r.title,l(`Đã kích hoạt danh hiệu: [${r.title}]!`,"success"),o(),ht(n,t,e,l,o)}),f.appendChild(d)}))}function tt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.player;if(!r)return;const d=r.skills||[],g=e.skills||[],x=(r.realmTier??1)>=2||(r.glitchInsight??0)>=20||(r.unlockedImprints||[]).length>0,y=(C=>{switch(C){case 1:return 2;case 2:return 3;case 3:return 4;case 4:return 5;default:return 6}})(r.realmTier||1),p=d.map(C=>{const q=typeof C=="string"?C:C.id;return{...g.find(B=>B.id===q)||{name:q,id:q,category:"combat",type:"active"},level:C.level||1,xp:C.xp||C.currentXp||0,equipped:C.equipped||C.isEquipped||!1}}),h=p.filter(C=>C.type!=="passive"),v=p.filter(C=>C.type==="passive"),u=h.filter(C=>C.equipped),c={combat:{icon:"⚔️",name:"Chiêu Thức",sub:`${h.length} chiêu • ${u.length}/${y} ô xuất`,badge:`${u.length}/${y}`},auras:{icon:"🧘",name:"Tâm Pháp & Hào Quang",sub:`Khóa ${r.reservationPct||0}% LL • ${(r.activeAuras||[]).length} Hào quang`,badge:`${r.reservationPct||0}%`},monsters:{icon:"🐺",name:"Thông Thạo Quái Vật",sub:"Bách thú đồ giám • Sát quái 5★",badge:"★"},crafting:{icon:"⚒️",name:"Thông Thạo Chế Tạo",sub:`Lv.${r.craftingLevel||1} • Đan đạo & Đúc rèn`,badge:`Lv.${r.craftingLevel||1}`}};let s=localStorage.getItem("activeSkillPillar")||"combat";["combat","auras","monsters","crafting","library","glitch"].includes(s)||(s="combat");let i="all",m="all",a=null,b=null;const w=(C,q)=>{const P=(C.level||1)*100,B=Math.min(100,(C.xp||0)/P*100),R=C.type==="passive",G="★".repeat(Math.min(C.tier||1,7)),N=(C.tier||1)>=5?"var(--gold)":(C.tier||1)>=3?"var(--purple)":"var(--blue)";let I="";if(R)I='<span style="font-size:11px; font-weight:700; color:var(--green)">🧘 Tâm Pháp Thường Trực</span>';else if(C.equipped)I=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${C.id}">Tháo</button>`;else{const z=u.length<y;I=`<button class="btn btn--sm ${z?"btn--blue":"btn--outline"} equip-btn" data-eq="1" data-sid="${C.id}" ${z?"":'title="Đã đầy ô kỹ năng!"'}>Trang Bị</button>`}return`
      <div class="skill-card  ${C.equipped&&!R?"equipped":""}">
        <div class="skill-card-header">
          <div>
            <div class="skill-card-name" style="font-size: 14px;">${C.name}</div>
            <div class="skill-card-tier" style="color:${N}">${G} Tầng ${C.tier||1} • ${R?"Tâm Pháp":"Chiêu Thức"}</div>
          </div>
          <div class="skill-card-action">${I}</div>
        </div>
        <div class="skill-card-desc">${C.description||"Tuyệt kỹ thượng thừa tu chân giới."}</div>
        ${`
          <div class="skill-card-mastery">
            <div class="skill-mastery-label">
              <span>Thông thạo Lv.${C.level}</span>
              <span class="text-dim">${C.xp}/${P} XP</span>
            </div>
            <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${B}%"></div></div>
            ${C.masteryBonus?`<div class="skill-mastery-bonus">✨ ${C.masteryBonus}</div>`:""}
          </div>
        `}
        ${C.cost?`<div class="skill-card-cost">🔵 ${C.cost} Linh Lực / lần xuất chiêu</div>`:""}
      </div>
    `},L=()=>`
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
      <div>
        <h1 style="display: flex; align-items: center; gap: 10px;">
          <span>⚡ Tứ Đại Trụ Cột Kỹ Năng</span>
        </h1>
        <div class="text-dim text-sm">Hệ thống tu hành thực chiến: Chiêu thức tôi luyện, tâm pháp hào quang, bách thú đồ giám & đan đạo chế tác.</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn--sm ${s==="library"?"btn--gold":"btn--outline"}" id="btn-open-library">
          📚 Tàng Kinh Các
        </button>
        <button class="btn btn--sm ${s==="glitch"?"btn--purple":"btn--outline"}" id="btn-open-glitch">
          ${x?"🌌 Thiên Đạo Dị Biến":"🌫️ Kẽ Hở Quy Luật"}
        </button>
      </div>
    </div>

    <!-- 4 PILLARS SELECTOR -->
    <div class="pillar-tabs">
      ${Object.entries(c).map(([C,q])=>`
        <div class="pillar-tab ${s===C?"active":""}" data-pillar="${C}">
          <div class="pillar-icon">${q.icon}</div>
          <div class="pillar-info">
            <div class="pillar-name">${q.name}</div>
            <div class="pillar-sub">${q.sub}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `,$=()=>{var q;let C=h;return i==="equipped"&&(C=h.filter(P=>P.equipped)),i==="unequipped"&&(C=h.filter(P=>!P.equipped)),`
      <!-- LOADOUT SLOTS -->
      <div class="loadout-bar" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="font-weight: 700; color: var(--gold); font-size: 14px; display: flex; align-items: center; gap: 6px;">
            <span>⚔️ Ô Xuất Chiêu Thực Chiến:</span>
            <span style="color: #fff;">${u.length}/${y}</span>
          </div>
          <div class="text-dim text-xs" style="margin-top: 2px;">
            Cảnh giới hiện tại (${((q=r.realmInfo)==null?void 0:q.fullName)||"Phàm Cấp"}) cho phép trang bị tối đa <b>${y}</b> chiêu thức kích hoạt trong giao đấu.
          </div>
        </div>
        <div class="loadout-slots" style="display: flex; gap: 8px;">
          ${Array.from({length:y}).map((P,B)=>{const R=u[B];return R?`<div class="loadout-slot filled" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(59, 130, 246, 0.15); border: 1px solid var(--blue); border-radius: 6px; font-size: 18px; cursor: pointer;" title="${R.name} (Lv.${R.level})">⚔️</div>`:'<div class="loadout-slot" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; font-size: 14px; color: var(--text-dim);" title="Ô trống">➕</div>'}).join("")}
        </div>
      </div>

      <!-- FILTER TABS -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <button class="mastery-filter-btn ${i==="all"?"active":""}" data-sfilter="all">Tất Cả Chiêu Thức (${h.length})</button>
        <button class="mastery-filter-btn ${i==="equipped"?"active":""}" data-sfilter="equipped">Đã Trang Bị (${u.length})</button>
        <button class="mastery-filter-btn ${i==="unequipped"?"active":""}" data-sfilter="unequipped">Chưa Trang Bị (${h.length-u.length})</button>
      </div>

      <div class="skill-grid">
        ${C.length>0?C.map(P=>w(P)).join(""):'<div class="text-dim" style="padding: 20px;">Chưa có chiêu thức kích hoạt nào trong danh mục này. Hãy đến Tàng Kinh Các để thỉnh bí kíp!</div>'}
      </div>
    `},k=()=>{const C=r.auraConfigs||{ho_the_kim_chung:{id:"ho_the_kim_chung",name:"Hộ Thể Kim Chung",icon:"🛡️",reservationPct:20,desc:"Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp khi độ kiếp.",statBonuses:{defense:25,maxHp:100}},than_hanh_bo:{id:"than_hanh_bo",name:"Thần Hành Hào Quang",icon:"💨",reservationPct:15,desc:"Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.",statBonuses:{speed:20,dexterity:15}},hoa_diem_chan_khi:{id:"hoa_diem_chan_khi",name:"Hỏa Diễm Chân Khí",icon:"🔥",reservationPct:25,desc:"Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.",statBonuses:{strength:25,critChance:10}},toa_thien:{id:"toa_thien",name:"Toạ Thiền Tụ Khí",icon:"🧘",reservationPct:10,desc:"Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực (+5 HP & +2 TL / 10s).",statBonuses:{hpRegen:5,staminaRegen:2}}},q=r.activeAuras||[],P=r.reservedEnergy||0,B=r.usableEnergy??Math.max(0,r.maxEnergy-P),R=r.reservationPct||0,G=r.maxEnergy>0?Math.round(B/r.maxEnergy*100):100;return`
      <!-- MANA RESERVATION HERO BANNER -->
      <div class="card" style="margin-bottom: 16px; border: 1px solid rgba(234, 179, 8, 0.3); background: linear-gradient(135deg, rgba(234, 179, 8, 0.08), rgba(0, 0, 0, 0.4)); padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
          <div>
            <div style="font-weight: 700; font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px;">
              <span>🧘 Cơ Chế Khóa Linh Lực (Mana Reservation)</span>
            </div>
            <div class="text-dim text-xs" style="margin-top: 4px;">
              Tâm pháp hào quang duy trì liên tục trong và ngoài chiến đấu. Mỗi hào quang khóa một tỷ lệ Linh Lực tối đa để ban phước chỉ số vĩnh viễn (Tối đa khóa 85%).
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 13px; font-weight: 600;">
              Linh Lực Khả Dụng: <span style="color: #38bdf8; font-size: 16px; font-weight: 700;">${B}</span> / ${r.maxEnergy}
            </div>
            <div style="font-size: 12px; color: #f59e0b; margin-top: 2px;">
              Đã khóa: <b>${P}</b> LL (${R}% / 85% tối đa)
            </div>
          </div>
        </div>

        <!-- SPLIT RESERVATION BAR -->
        <div style="position: relative; height: 16px; background: rgba(0, 0, 0, 0.5); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; margin-bottom: 12px;">
          <div style="width: ${G}%; background: linear-gradient(90deg, #0284c7, #38bdf8); transition: width 0.4s ease;" title="Linh Lực Khả Dụng: ${B}"></div>
          <div style="width: ${R}%; background: linear-gradient(90deg, #d97706, #fbbf24); transition: width 0.4s ease;" title="Linh Lực Bị Khóa: ${P} (${R}%)"></div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim);">
          <span style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #38bdf8;"></span> Linh Lực Khả Dụng (Dùng cho Chiêu Thức)</span>
          <span style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #fbbf24;"></span> Linh Lực Bị Khóa (Duy Trì Hào Quang)</span>
        </div>
      </div>

      <!-- AURA GRID -->
      <div style="margin-bottom: 24px;">
        <div style="font-weight: 700; color: var(--gold); font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span>🌟 Danh Mục Tâm Pháp Hào Quang</span>
          <span class="text-dim text-xs font-normal">(${q.length}/${Object.keys(C).length} đang bật)</span>
        </div>

        <div class="skill-grid">
          ${Object.values(C).map(N=>{const I=q.includes(N.id),z=!I&&R+N.reservationPct>85;return`
              <div class="skill-card ${I?"equipped":""}" style="${I?"border-color: rgba(234, 179, 8, 0.6); box-shadow: 0 0 12px rgba(234, 179, 8, 0.15);":""}">
                <div class="skill-card-header">
                  <div>
                    <div class="skill-card-name" style="font-size: 14px; display: flex; align-items: center; gap: 6px;">
                      <span>${N.icon}</span>
                      <span>${N.name}</span>
                    </div>
                    <div class="skill-card-tier" style="color: #f59e0b;">Khóa ${N.reservationPct}% Linh Lực (${Math.floor(r.maxEnergy*(N.reservationPct/100))} LL)</div>
                  </div>
                  <div class="skill-card-action">
                    <button class="btn btn--sm ${I?"btn--gold":"btn--outline"} btn-toggle-aura" data-aura="${N.id}" ${z?'disabled title="Vượt quá 85% Linh Lực khóa tối đa!"':""}>
                      ${I?"✅ Đang Duy Trì":"🔘 Bật Hào Quang"}
                    </button>
                  </div>
                </div>
                <div class="skill-card-desc" style="margin-top: 6px;">${N.desc}</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                  ${Object.entries(N.statBonuses||{}).map(([K,J])=>`
                    <span class="req-tag" style="background: rgba(234, 179, 8, 0.12); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.2);">
                      +${J} ${K}
                    </span>
                  `).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- PERMANENT PASSIVE MIND TECHNIQUES -->
      <div>
        <div style="font-weight: 700; color: var(--gold); font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span>🧘 Tâm Pháp Thường Trực Đã Lĩnh Ngộ</span>
          <span class="text-dim text-xs font-normal">(${v.length} tâm pháp)</span>
        </div>

        ${v.length>0?`
          <div class="skill-grid">
            ${v.map(N=>w(N)).join("")}
          </div>
        `:`
          <div class="panel" style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 12px;">
            Chưa lĩnh ngộ tâm pháp bị động thường trực nào. Hãy đến Tàng Kinh Các để thỉnh giáo các bí kíp công pháp thượng thừa!
          </div>
        `}
      </div>
    `},S=()=>{if(!a)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `;const{totalKills:C,totalSpecies:q,tierCounts:P,monsters:B,tiers:R}=a,G=["all","Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh"],N=B.filter(I=>m==="all"?!0:(I.tierName||"").includes(m));return`
      <!-- BESTIARY HERO -->
      <div class="mastery-hero">
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${(C||0).toLocaleString()}</span>
          <span class="mastery-stat-label">Tổng Yêu Thú Đã Trảm</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${q||0}</span>
          <span class="mastery-stat-label">Loài Trong Giới Đồ</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #3b82f6;">${(P==null?void 0:P[1])||0}</span>
          <span class="mastery-stat-label">Chớm Ngộ (1★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #10b981;">${(P==null?void 0:P[2])||0}</span>
          <span class="mastery-stat-label">Thuần Thục (2★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #8b5cf6;">${(P==null?void 0:P[3])||0}</span>
          <span class="mastery-stat-label">Đại Thành (3★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #f59e0b;">${(P==null?void 0:P[4])||0}</span>
          <span class="mastery-stat-label">Khắc Chế (4★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #ef4444;">${(P==null?void 0:P[5])||0}</span>
          <span class="mastery-stat-label">Tuyệt Diệt (5★)</span>
        </div>
      </div>

      <!-- REALM FILTER -->
      <div class="mastery-filter-bar">
        <span class="text-dim text-xs" style="margin-right: 4px;">Cảnh Giới:</span>
        ${G.map(I=>`
          <button class="mastery-filter-btn ${m===I?"active":""}" data-mrealm="${I}">
            ${I==="all"?"Tất Cả":I}
          </button>
        `).join("")}
      </div>

      <!-- MONSTER CARDS GRID -->
      <div class="monster-grid">
        ${N.map(I=>{var Q,D,V,Z,W;const z=I.mastery||{},K=(z.tier||0)===0&&(z.kills||0)===0,J=z.isMaxTier,U=z.badgeColor||"#6b7280";return`
            <div class="monster-mastery-card ${K?"fog":""} ${z.tier===5?"apex":""}">
              <div>
                <div class="monster-card-top">
                  <div>
                    <div class="monster-card-name">
                      <span>${K?"🌫️":"🐺"}</span>
                      <span>${I.name}</span>
                    </div>
                    <div class="text-dim text-xs" style="margin-top: 2px;">
                      ${I.tierName||"Phàm Cấp"} • Ngũ Hành: <b>${I.element||"Vô"}</b>
                    </div>
                  </div>
                  <span class="monster-tier-tag" style="color: ${U}; border-color: ${U}">
                    ${z.tierName||"Vô Tri"}
                  </span>
                </div>

                <div class="monster-kills-row">
                  <span class="monster-stars-display" style="color: ${U}">${z.stars||"☆☆☆☆☆"}</span>
                  <span>Đã trảm: <b>${z.kills||0}</b> con</span>
                </div>

                <!-- PROGRESS BAR -->
                <div class="bar-track" style="height: 5px; margin-bottom: 8px;">
                  <div class="bar-fill" style="width: ${z.tierProgress||0}%; background: ${U}"></div>
                </div>
                ${J?`
                  <div class="text-xs" style="color: #ef4444; font-weight: 700; margin-bottom: 6px;">
                    👑 Đạt cảnh giới Tuyệt Diệt tối cao!
                  </div>
                `:`
                  <div class="text-dim text-xs" style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span>Tiến độ lên Tầng ${z.nextTier}</span>
                    <span>${z.kills}/${z.nextTierReq} kills</span>
                  </div>
                `}

                <!-- STATS PREVIEW (Revealed at Tier 1+) -->
                ${K?`
                  <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin: 8px 0;">
                    🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá thông tin sinh mệnh và thuộc tính!
                  </div>
                `:`
                  <div class="monster-stats-box">
                    <div class="monster-stat-cell">HP: <b>${((Q=I.stats)==null?void 0:Q.hp)??0}</b></div>
                    <div class="monster-stat-cell">Công: <b>${((D=I.stats)==null?void 0:D.strength)??0}</b></div>
                    <div class="monster-stat-cell">Thủ: <b>${((V=I.stats)==null?void 0:V.defense)??0}</b></div>
                    <div class="monster-stat-cell">Tốc: <b>${((Z=I.stats)==null?void 0:Z.speed)??0}</b></div>
                    <div class="monster-stat-cell">Thân: <b>${((W=I.stats)==null?void 0:W.dexterity)??0}</b></div>
                    <div class="monster-stat-cell">XP: <b>+${I.xpReward??0}</b></div>
                  </div>
                `}
              </div>

              <!-- ACTIVE BUFFS -->
              <div>
                ${z.tier>=2?`
                  <div class="monster-buff-active">
                    ✨ <b>Khắc chế đang kích hoạt:</b><br/>
                    ${z.desc}
                  </div>
                `:`
                  <div class="text-dim text-xs" style="margin-top: 6px; font-style: italic;">
                    🔒 Tầng 2 (20 kills) kích hoạt +10% Sát thương lên loài này.
                  </div>
                `}
              </div>
            </div>
          `}).join("")}
      </div>
    `},E=()=>{if(!b)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `;const{craftingLevel:C,craftingXp:q,xpToNext:P,progressPercent:B,title:R,badgeColor:G,perks:N,recipes:I}=b;return`
      <!-- HERO BANNER -->
      <div class="crafting-hero">
        <div class="crafting-hero-header">
          <div class="crafting-hero-title">
            <span>🔥</span>
            <span>Thông Thạo Đan Đạo & Chế Tác</span>
          </div>
          <span class="crafting-rank-badge" style="background: ${G};">
            ${R} (Lv.${C})
          </span>
        </div>

        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
          <span>Kinh Nghiệm Luyện Chế: <b>${q} / ${P} XP</b></span>
          <span style="color: var(--gold);">${B}%</span>
        </div>
        <div class="bar-track" style="height: 8px; margin-bottom: 12px;">
          <div class="bar-fill" style="width: ${B}%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
        </div>
        <div class="text-dim text-xs">Mỗi lần luyện chế thành công hoặc thất bại đều tích lũy đan đạo chi lực, tôi luyện trình độ đan sư.</div>

        <!-- CRAFTING PERKS -->
        <div class="crafting-perks-grid">
          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🎯</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Tỷ Lệ Thành Công</div>
              <div class="crafting-perk-val">+${(N==null?void 0:N.successBonusPct)??0}% tỷ lệ luyện thành</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">✨</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Xác Suất Đại Thành</div>
              <div class="crafting-perk-val">${(N==null?void 0:N.critQualityChance)??0}% (Tinh / Cực / Thiên Phẩm)</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🛡️</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Bảo Toàn Dược Liệu</div>
              <div class="crafting-perk-val">Thu hồi ${(N==null?void 0:N.materialReturnRate)??0}% khi nổ lò</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🌟</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Thiên Phẩm Đan</div>
              <div class="crafting-perk-val">${N!=null&&N.canCraftDivine?"✅ Đã kích hoạt (+50% chỉ số)":"🔒 Yêu cầu Lv.76+"}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- RECIPES & CRAFTING SHORTCUT -->
      <div class="panel">
        <div class="panel-title" style="display: flex; justify-content: space-between; align-items: center;">
          <span>📜 Đan Phương & Công Thức Chế Tác (${(I==null?void 0:I.length)||0})</span>
        </div>
        <div class="panel-body">
          <div class="shop-items-grid">
            ${(I||[]).map(z=>{const K=z.materials||[],J=K.every(D=>{var V;return(((V=r.materials)==null?void 0:V[D.id])||0)>=D.amount}),U=(r.gold||0)>=(z.cost||0),Q=J&&U;return`
                <div class="shop-item-card">
                  <div class="shop-item-header">
                    <div>
                      <div class="shop-item-name">${z.name}</div>
                      <div class="shop-item-rarity text-dim">Tầng ${z.tier||1} • Cơ bản ${z.successRate}%</div>
                    </div>
                    <span class="badge" style="background: rgba(208, 165, 48, 0.15); color: var(--gold);">
                      Tốn ${z.cost||0} 💰
                    </span>
                  </div>
                  <div class="shop-item-desc" style="margin-bottom: 8px;">
                    Dược liệu yêu cầu:<br/>
                    ${K.map(D=>{var W;const V=((W=r.materials)==null?void 0:W[D.id])||0;return`<span style="color: ${V>=D.amount?"var(--green)":"var(--red)"}; font-size: 11px;">• ${D.id} (${V}/${D.amount})</span>`}).join("<br/>")}
                  </div>
                  <div class="shop-item-footer">
                    <span class="text-xs text-dim">${z.craftTime?`Thời gian: ${z.craftTime}s`:"Lập tức"}</span>
                    <button class="btn btn--sm ${Q?"btn--gold":"btn--outline"} btn-craft-action" data-rid="${z.id}" ${Q?"":"disabled"}>
                      ${Q?"🔥 Luyện Chế":"Thiếu Liệu"}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `},M=async()=>{if(s==="library"){n.innerHTML=`
        ${L()}
        <div id="library-container"></div>
      `,_();const C=n.querySelector("#library-container");C&&rt(C,t);return}if(s==="glitch"){n.innerHTML=`
        ${L()}
        <div id="glitch-container"></div>
      `,_();const C=n.querySelector("#glitch-container");C&&ut(C,t);return}if(n.innerHTML=`
      ${L()}
      <div id="pillar-content">
        ${s==="combat"?$():""}
        ${s==="auras"?k():""}
        ${s==="monsters"?S():""}
        ${s==="crafting"?E():""}
      </div>
    `,_(),O(),s==="monsters"&&!a)try{a=await l.getMonsterMastery(r.id);const C=n.querySelector("#pillar-content");C&&s==="monsters"&&(C.innerHTML=S(),O())}catch(C){o("Không thể tải Bách Thú Đồ Giám: "+C.message,"error")}if(s==="crafting"&&!b)try{b=await l.getCraftingMastery(r.id);const C=n.querySelector("#pillar-content");C&&s==="crafting"&&(C.innerHTML=E(),O())}catch(C){o("Không thể tải Thông Thạo Chế Tạo: "+C.message,"error")}},_=()=>{n.querySelectorAll(".pillar-tab").forEach(P=>{P.addEventListener("click",()=>{s=P.dataset.pillar,localStorage.setItem("activeSkillPillar",s),M()})});const C=n.querySelector("#btn-open-library");C&&C.addEventListener("click",()=>{s="library",localStorage.setItem("activeSkillPillar","library"),M()});const q=n.querySelector("#btn-open-glitch");q&&q.addEventListener("click",()=>{s="glitch",localStorage.setItem("activeSkillPillar","glitch"),M()})},O=()=>{n.querySelectorAll("[data-sfilter]").forEach(C=>{C.addEventListener("click",()=>{i=C.dataset.sfilter;const q=n.querySelector("#pillar-content");q&&s==="combat"&&(q.innerHTML=$(),O())})}),n.querySelectorAll(".btn-toggle-aura").forEach(C=>{C.addEventListener("click",async()=>{const q=C.dataset.aura;C.disabled=!0;try{const P=await l.toggleAura(r.id,q);P.player&&(e.player=P.player),o(P.message,P.success?"success":"warning"),typeof f=="function"&&f(),M()}catch(P){o(P.message||"Lỗi chuyển trạng thái Hào Quang","error"),C.disabled=!1}})}),n.querySelectorAll("[data-mrealm]").forEach(C=>{C.addEventListener("click",()=>{m=C.dataset.mrealm;const q=n.querySelector("#pillar-content");q&&s==="monsters"&&(q.innerHTML=S(),O())})}),n.querySelectorAll(".equip-btn").forEach(C=>{C.addEventListener("click",async()=>{try{const q=C.dataset.sid,P=C.dataset.eq==="1",B=await l.equipSkill(r.id,q,P);e.player=B.player,o(B.message,"success"),typeof f=="function"&&f(),M()}catch(q){o(q.message||"Lỗi trang bị pháp quyết","error")}})}),n.querySelectorAll(".btn-craft-action").forEach(C=>{C.addEventListener("click",async()=>{const q=C.dataset.rid;C.disabled=!0,C.innerText="Đang luyện...";try{const P=await l.craftItem(r.id,q);P.player&&(e.player=P.player),o(P.message,P.success?"success":"warning"),typeof f=="function"&&f(),b=await l.getCraftingMastery(r.id),M()}catch(P){o(P.message||"Lỗi luyện chế","error"),C.disabled=!1,C.innerText="🔥 Luyện Chế"}})})};M()}function Bt(n,t){return t==="manual"?"📜":n==="weapon"?"⚔️":n==="body"?"🥋":n==="shield"?"🛡️":n==="feet"?"👢":n==="ring"?"💍":"📦"}function lt(n,t){let e="",l="";if(n.slot==="weapon"){let g=0,x=0;(n.affixes||[]).forEach(T=>{T.stat==="strength"&&T.type==="flat"&&(g+=T.value),T.stat==="dexterity"&&T.type==="flat"&&(x+=T.value)}),g===0&&(g=n.itemLevel*2+5),x===0&&(x=n.itemLevel+10),e=`⚔️ ${g}`,l=`🎯 ${x}`}else if(n.slot==="body"||n.slot==="shield"||n.slot==="feet"){let g=0;(n.affixes||[]).forEach(x=>{x.stat==="defense"&&x.type==="flat"&&(g+=x.value)}),g===0&&(g=n.itemLevel*3),e=`🛡️ ${g}`}else if(n.slot==="ring"){let g=0;(n.affixes||[]).forEach(x=>{x.stat==="capacity"&&(g+=x.value)}),e=g>0?`🎒 +${g}`:""}const o=(n.affixes||[]).map(g=>Rt(g)).map(g=>`<span class="badge badge-dim">${g}</span>`).join(" "),f=n.description||`Một vật phẩm loại ${n.slot} cấp ${n.itemLevel} thuộc phẩm chất ${n.rarity}. Khí tức tỏa ra không tồi.`,r=n.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${n.craftedBy}</strong></div>`:"",d=t?n.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${n.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${n.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${n.rarity}"></span>
          <span class="item-name rarity-${n.rarity}" style="font-size:14px">${n.name}</span>
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${e?`<span style="color:var(--text-light)">${e}</span>`:""}
          ${l?`<span style="color:var(--text-light)">${l}</span>`:""}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05)">
        <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
          ${Bt(n.slot,n.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${n.name}</strong> là loại ${n.baseType}. ${f}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${n.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${n.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${o||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${r}
          <div class="mt-2 flex justify-end">
            ${d}
          </div>
        </div>
      </div>
    </div>`}function Rt(n){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[n.stat]||n.stat,l=n.value>=0?"+":"";return n.type==="flat"?`${l}${n.value} ${e}`:n.type==="increase"?`${l}${n.value}% ${e}`:n.type==="more"?`×${l}${n.value}% ${e}`:`${l}${n.value} ${e}`}function at(n,t){var s,i,m,a,b,w,L;const{state:e,api:l,notify:o,renderGame:f}=t,r=Object.values(e.player.equipment||{}),d=e.player,g=e.medicines||[],x=d.medCooldownRemaining||0,T=e.inventoryTab||"equipped",y=d.skills&&d.skills.some($=>{const k=typeof $=="string"?$:$.id;return k==="duoc_ly"||k==="y_thuat"}),p=r.find($=>$.slot==="ring1"),h=r.find($=>$.slot==="ring2");let v=20;((p==null?void 0:p.id)==="tui_tru_vat"||(s=p==null?void 0:p.baseType)!=null&&s.includes("tru_vat"))&&(v+=((m=(i=p.affixes)==null?void 0:i[0])==null?void 0:m.value)||10),((h==null?void 0:h.id)==="tui_tru_vat"||(a=h==null?void 0:h.baseType)!=null&&a.includes("tru_vat"))&&(v+=((w=(b=h.affixes)==null?void 0:b[0])==null?void 0:w.value)||10),n.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(d.inventory||[]).length} / ${v})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${T==="equipped"?"btn--blue":"btn--dark"}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${T==="weapon"?"btn--blue":"btn--dark"}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${T==="armor"?"btn--blue":"btn--dark"}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${T==="accessory"?"btn--blue":"btn--dark"}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${T==="manual"?"btn--blue":"btn--dark"}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${T==="medicine"?"btn--blue":"btn--dark"}" data-tab="medicine">
          Đan Dược ${x>0?`<span style="color:var(--orange); font-size:11px">(${x}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const u=document.getElementById("invTabContent"),c=()=>{u.querySelectorAll("[data-eid]").forEach($=>{$.addEventListener("click",async k=>{k.stopPropagation();try{const S=await l.equipItem(e.playerId,$.dataset.eid);e.player=S.player,o(S.message,"success"),f()}catch(S){o(S.message||"Lỗi trang bị","error")}})}),u.querySelectorAll("[data-use]").forEach($=>{$.addEventListener("click",async k=>{k.stopPropagation();try{const S=await l.useItem(e.playerId,$.dataset.use);e.player=S.player,o(S.message,"success"),f()}catch(S){o(S.message||"Lỗi sử dụng","error")}})})};if(T==="equipped"){const $=d.equipment||{},k=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];u.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${k.map(S=>{const E=$[S.key],M=E&&E.id,_=M?`rarity-${E.rarity}`:"";return`
            <div style="background:${M?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${M?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${S.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${S.name}</div>
              ${M?`<div style="font-size:11px;font-weight:600" class="${_}">${E.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${E.rarity}] Lv${E.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${r.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${r.filter(S=>S&&S.id).map(S=>lt(S,!1)).join("")}
      `:""}
    `,c()}else if(T==="medicine")u.innerHTML=`
      <div style="padding:12px">
        ${x>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${x}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${x/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${g.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':g.map($=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${$.icon||"💊"} ${$.name}</div>
                <div class="item-meta">
                  ${$.description}
                  ${$.healPercent?` · Phục hồi ${$.healPercent}% HP`:""}
                  ${$.cooldownAdd?` · Sinh Đan độc ${$.cooldownAdd}s`:""}
                  ${$.duration?` · Hiệu lực ${$.duration} trận`:""}
                  ${$.toxicity&&y?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${$.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${$.penalty&&y?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${$.penalty.map(k=>`Giảm ${Math.abs(k.value)*100}% ${k.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${$.id}" 
                ${x+($.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,u.querySelectorAll("[data-med]").forEach($=>{$.addEventListener("click",async()=>{try{const k=await l.useMedicine(e.playerId,$.dataset.med);e.player=k.player,o(k.message,"success"),f()}catch(k){o(k.message||"Đan độc quá nồng!","error")}})});else{const $=d.inventory||[];let k=[];T==="weapon"?k=$.filter(S=>S.slot==="weapon"&&S.category!=="manual"):T==="armor"?k=$.filter(S=>["body","shield","feet"].includes(S.slot)):T==="accessory"?k=$.filter(S=>["ring","amulet","ring1","ring2"].includes(S.slot)):T==="manual"&&(k=$.filter(S=>S.category==="manual")),u.innerHTML=`
      ${k.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':k.map(S=>lt(S,!0)).join("")}
    `,c()}n.querySelectorAll("[data-tab]").forEach($=>{$.addEventListener("click",()=>{e.inventoryTab=$.dataset.tab,at(n,t)})}),(L=document.getElementById("btnGen"))==null||L.addEventListener("click",async()=>{const $=["common","rare","epic","legendary"];try{const k=await l.generateItem(e.playerId,$[Math.floor(Math.random()*$.length)]);e.player=k.player,e.items=k.items||[],o(k.message,"success"),at(n,t)}catch{o("Lỗi tạo ngẫu nhiên","error")}})}function mt(n,t){const{state:e,api:l,notify:o,updateSidebar:f,renderGame:r}=t,d=e.playerId;e._dungeon||(e._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const g=e._dungeon;async function x(){try{const[c,s]=await Promise.all([l.getMapItems(d),l.getDungeonHistory(d)]);g.mapItems=c.mapItems||[],g.activeRun=c.activeRun||null,g.history=s.history||[],g.loaded=!0,T()}catch(c){o(c.message||"Lỗi tải Bí Cảnh","error")}}function T(){n.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${g.activeRun?y():p()}

      ${g.lastResult?h():""}

      ${v()}
    `,u()}function y(){var m,a;const c=g.activeRun,s=c.currentWave===c.totalWaves,i=((c.currentWave-1)/c.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${c.dungeonName||c.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${i}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${c.currentWave}/${c.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((m=e.player)==null?void 0:m.hospitalRemaining)>0?"disabled":""}>
              ${s?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+c.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((a=e.player)==null?void 0:a.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function p(){return g.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${g.mapItems.map(c=>{const s=c.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${c.item.icon} ${c.item.name} <span style="opacity:0.5">x${c.quantity}</span></div>
                  ${s?`
                    <div class="item-meta">
                      ${s.name} · T${s.tier} · ${s.waves+1} tầng · Boss: ${s.bossName}
                    </div>
                  `:""}
                </div>
                ${s?`<button class="btn btn--sm btn--gold" data-enter="${c.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function h(){var m,a;const c=g.lastResult,s=c.result==="dungeon_complete"?"🏆":c.result==="wave_cleared"?"✅":"💀",i=c.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${i}">
        <div class="panel-title" style="color:${i}">${s} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${c.message}</div>
          ${(m=c.loot)!=null&&m.length?`
            <div style="margin-bottom:8px">
              ${c.loot.map(b=>`<div style="font-size:12px;color:var(--green)">🎁 ${b}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((a=c.combatLog)==null?void 0:a.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(c.combatLog||[]).map(b=>`<div>${b}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function v(){return g.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${g.history.map(c=>{const s=c.status==="completed"?"✅":c.status==="failed"?"❌":c.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${c.status==="completed"?"var(--green)":c.status==="failed"?"var(--red)":"var(--orange)"}">${s} ${c.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${c.wave}/${c.totalWaves} · ${new Date(c.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function u(){var c,s;document.querySelectorAll("[data-enter]").forEach(i=>{i.addEventListener("click",async()=>{const m=i.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){i.disabled=!0;try{const a=await l.enterDungeon(d,m);o(a.message,"success"),e.player=a.player,f(),g.activeRun=a.run,g.lastResult=null,await x()}catch(a){o(a.message,"error"),i.disabled=!1}}})}),(c=document.getElementById("btnFight"))==null||c.addEventListener("click",async()=>{const i=document.getElementById("btnFight");i.disabled=!0,i.textContent="⏳ Đang chiến đấu...";try{const m=await l.fightDungeonWave(d);e.player=m.player,f(),g.lastResult=m,m.result==="dungeon_complete"||m.result==="dungeon_failed"?g.activeRun=null:m.result==="wave_cleared"&&(g.activeRun.currentWave=m.nextWave),T()}catch(m){o(m.message,"error"),i.disabled=!1,i.textContent="⚔️ Chiến Đấu"}}),(s=document.getElementById("btnAbandon"))==null||s.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await l.abandonDungeon(d),o("Đã rời khỏi Bí Cảnh.","info"),g.activeRun=null,g.lastResult=null,await x()}catch(i){o(i.message,"error")}})}g.loaded?T():x()}function yt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const d=e._tc;async function g(){try{d.data=await l.request(`/player/${r}/atlas-maps`),d.loaded=!0,x()}catch(u){o(u.message,"error")}}function x(){const u=d.data,c=(u==null?void 0:u.atlas)||{},s=(u==null?void 0:u.maps)||[],i=u==null?void 0:u.activeRun,m=(u==null?void 0:u.allMaps)||[];u!=null&&u.modifiers,n.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Tiên Cảnh</h2>
        <p class="page-sub">Ngao du tiên cảnh — Endgame Atlas. Thu thập Tiên Đồ, chinh phục 8 tầng giới.</p>
      </div>

      <!-- ATLAS OVERVIEW -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid var(--gold)">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px">🗺️</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Atlas Progress</div>
            <div style="font-weight:800;font-size:18px">${c.completed||0}/${c.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${c.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${c.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${c.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${d.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${d.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${s.length})</button>
        ${i?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,n.querySelectorAll("[data-tab]").forEach(b=>{b.addEventListener("click",()=>{d.tab=b.dataset.tab,x()})});const a=document.getElementById("tcContent");a&&(i&&d.tab==="run"?h(a,i):d.tab==="inventory"?y(a,s):T(a,m,c))}function T(u,c,s){var m;const i=((m=d.data)==null?void 0:m.tiers)||[];u.innerHTML=i.map(a=>{const b=c.filter(w=>w.tier===a.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${a.tier} ${a.name} <span style="opacity:0.4;font-size:11px">(Realm ${a.requiredRealm}+, ${a.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${b.map(w=>{var k;const L=((k=s.progress)==null?void 0:k[w.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[w.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${L?700:400}">${w.name}</span>
                ${L?`<span style="color:var(--green);font-size:11px">✅ ×${L}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function y(u,c,s){if(c.length===0){u.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}u.innerHTML=c.map((i,m)=>{const a=i.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${v(i.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${i.mapName||i.mapId} <span style="color:${v(i.tier)};font-size:12px">T${i.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${a.length>0?a.map(b=>b.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${a.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${m}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${m}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),u.querySelectorAll(".btn-open-map").forEach(i=>{i.addEventListener("click",async()=>{try{const m=await l.request(`/player/${r}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(i.dataset.idx)})});o(m.message,"success"),e.player=m.player,f(),d.tab="run",await g()}catch(m){o(m.message,"error")}})}),u.querySelectorAll(".btn-add-mod").forEach(i=>{i.addEventListener("click",()=>p(parseInt(i.dataset.idx)))})}function p(u){var i;const c=((i=d.data)==null?void 0:i.modifiers)||[],s=document.createElement("div");s.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",s.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${c.map(m=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${m.id}">
          <span style="flex:1"><strong>${m.name}</strong><br><span style="font-size:11px;opacity:0.6">${m.desc} · IIQ +${m.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,s.addEventListener("click",async m=>{const a=m.target.closest("[data-modid]");if(a)try{const b=await l.request(`/player/${r}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:u,modifierId:a.dataset.modid})});o(b.message,"success"),e.player=b.player,f(),s.remove(),await g()}catch(b){o(b.message,"error")}else m.target===s&&s.remove()}),document.body.appendChild(s)}function h(u,c){var m,a;const s=c.currentWave/c.totalWaves*100,i=c.modifiers||[];u.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${c.mapName} <span style="color:${v(c.tier)}">T${c.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${c.currentWave}/${c.totalWaves}
            ${i.length>0?" · "+i.map(b=>b.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${s}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${d.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(m=document.getElementById("btnTCFight"))==null||m.addEventListener("click",async()=>{d.fighting=!0,x();try{const b=await l.request(`/player/${r}/atlas-maps/fight`,{method:"POST"});e.player=b.player,f();const w=b.result!=="map_failed";o(b.message,w?"success":"error"),d.fighting=!1,(b.result==="map_complete"||b.result==="map_failed")&&(d.tab="atlas"),await g()}catch(b){o(b.message,"error"),d.fighting=!1,x()}}),(a=document.getElementById("btnTCQuit"))==null||a.addEventListener("click",async()=>{try{await l.request(`/player/${r}/atlas-maps/abandon`,{method:"POST"}),o("Đã rời Tiên Cảnh","info"),d.tab="atlas",await g()}catch(b){o(b.message,"error")}})}function v(u){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[u]||"#666"}d.loaded?x():g()}function bt(n,t){const{state:e}=t,l=e._travelTab||"map";n.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Ngao Du Bát Hoang</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên, chinh phục bí cảnh và tầm bảo tiên cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${l==="map"?"active":""}" data-tab="map" style="flex:1;padding:10px;border:none;background:${l==="map"?"rgba(255,255,255,0.08)":"transparent"};color:${l==="map"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${l==="map"?"700":"400"};border-bottom:2px solid ${l==="map"?"var(--gold)":"transparent"};transition:all 0.2s">
        🗺️ Bản Đồ Bát Hoang
      </button>
      <button class="tab-btn ${l==="dungeon"?"active":""}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${l==="dungeon"?"rgba(255,255,255,0.08)":"transparent"};color:${l==="dungeon"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${l==="dungeon"?"700":"400"};border-bottom:2px solid ${l==="dungeon"?"var(--gold)":"transparent"};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
      <button class="tab-btn ${l==="tiencanh"?"active":""}" data-tab="tiencanh" style="flex:1;padding:10px;border:none;background:${l==="tiencanh"?"rgba(255,255,255,0.08)":"transparent"};color:${l==="tiencanh"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${l==="tiencanh"?"700":"400"};border-bottom:2px solid ${l==="tiencanh"?"var(--gold)":"transparent"};transition:all 0.2s">
        🌌 Tiên Cảnh (Atlas)
      </button>
    </div>
    <div id="travelTabContent"></div>
  `,n.querySelectorAll(".tab-btn").forEach(f=>{f.addEventListener("click",()=>{e._travelTab=f.dataset.tab,bt(n,t)})});const o=n.querySelector("#travelTabContent");l==="map"?X(o,t):l==="dungeon"?mt(o,t):yt(o,t)}async function X(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t;n.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[r,d]=await Promise.all([l.request("/data/areas"),l.request(`/player/${e.playerId}/area`)]),g=r.areas||[],x=d.area,T=d.player,y=d.traveling||!1,p=d.travelRemaining||0,h=d.travelDestination||"";d.message&&o(d.message,"success"),d.player&&(e.player=d.player,f());const v=e.exploration||{},u=v[(T==null?void 0:T.currentArea)||"thanh_lam_tran"],c=(x==null?void 0:x.name)||(u==null?void 0:u.name)||"Vùng Đất Vô Danh",s=(u==null?void 0:u.staminaCost)||10,i={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận",cuu_u_than_uyen:"👿 Cửu U ma khí: +35% ST, +20% Tốc Độ",thai_co_hong_hoang:"🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp",chu_thien_tinh_hai:"🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn",hon_don_tien_vuc:"🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số",hon_nguyen_dao_canh:"👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính"},m=i[T==null?void 0:T.currentArea]||"",a=[...g].sort((b,w)=>(b.sort_order||b.mapY||0)-(w.sort_order||w.mapY||0));if(n.innerHTML=`
      ${y?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${h}</span></strong>
            <div id="travelTimer" style="font-size:26px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 12px rgba(255,215,0,0.4)">⏳ ${p}s</div>
            <div class="bar-track" style="margin-top:12px; height:10px; background:rgba(0,0,0,0.5); border-radius:5px; overflow:hidden">
              <div class="bar-fill energy" id="travelBar" style="width:100%; height:100%; background:linear-gradient(90deg, #f59e0b, #fbbf24); transition: width 1s linear"></div>
            </div>
            <div class="text-xs text-dim" style="margin-top:8px">Đang vượt qua kết giới... Xin kiên nhẫn chờ đến nơi.</div>
          </div>
        </div>
      `:`
        <div class="panel" style="border-color:rgba(100,200,100,0.3); margin-bottom:16px">
          <div class="panel-body" style="padding: 14px 16px">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-dim mb-xs">📍 Cảnh Giới Hiện Tại</div>
                <div class="text-lg text-green bold" style="display:flex;align-items:center;gap:6px">
                  ${c}
                  <span class="badge" style="background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.4);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${s} TL/lần</div>
              </div>
            </div>
            ${x!=null&&x.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${x.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${(x==null?void 0:x.min_level)||1}+</span>
              ${m?`<span class="badge" style="background:rgba(255,215,0,0.1);color:var(--gold);border:1px solid rgba(255,215,0,0.25);font-size:11px">${m}</span>`:""}
            </div>
          </div>
        </div>
      `}

      <!-- 2D REALM MAP OVERVIEW -->
      <div class="panel">
        <div class="panel-title flex items-center justify-between">
          <span>🗺️ Thiên Địa Giới Đồ (2D Bát Hoang Tinh Đồ)</span>
          <span class="text-xs text-dim">${a.length} Khu vực</span>
        </div>
        <div class="panel-body" style="background:linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(10,15,28,0.95) 100%); padding:12px">
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px">
            ${a.map((b,w)=>{const L=v[b.id],$=b.id===T.currentArea&&!y,k=T.level<(b.min_level||1),S=parseInt(b.travel_time)||0,E=parseInt(b.stamina_cost)||(L==null?void 0:L.staminaCost)||10,M=i[b.id]||"",_=b.tier||"Bát Hoang",O=E>=100?"rgba(239,68,68,0.2)":E>=40?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)",C=E>=100?"var(--red)":E>=40?"var(--gold)":"var(--text-dim)";let q="rgba(255,255,255,0.08)",P="rgba(255,255,255,0.03)";return $?(q="rgba(34, 197, 94, 0.6)",P="rgba(34, 197, 94, 0.08)"):k&&(q="rgba(239, 68, 68, 0.2)",P="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${$?"current-realm":""} ${k?"locked-realm":""}" 
                     style="border:1px solid ${q}; background:${P}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${$?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${$?"var(--green)":k?"var(--text-dim)":"var(--text-bright)"}">
                        #${w+1} ${b.name}
                      </div>
                      ${k?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      🏛️ ${_}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${b.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${k?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${k?"var(--red)":"var(--text-dim)"}">
                        Lv.${b.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${S>0?`⏱ ${S}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${O}; color:${C}; border:1px solid ${O}">
                        🏃 -${E} TL (Dò thám)
                      </span>
                    </div>

                    ${M?`
                      <div style="font-size:10px; color:var(--gold); background:rgba(255,215,0,0.05); padding:3px 6px; border-radius:4px; margin-bottom:10px; border-left:2px solid var(--gold)">
                        ${M}
                      </div>
                    `:""}
                  </div>

                  <div style="margin-top:auto">
                    ${$?`
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(34,197,94,0.2); color:var(--green); border:1px solid rgba(34,197,94,0.4)">
                        📍 Đang tọa trấn
                      </button>
                    `:k?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${b.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${b.id}" ${y?"disabled":""}>
                        ${S>0?`🚶 Vi Hành (${S}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll("[data-travel]").forEach(b=>{b.addEventListener("click",async w=>{w.stopPropagation();const L=b.dataset.travel;n.querySelectorAll("[data-travel]").forEach($=>{$.tagName==="BUTTON"&&($.disabled=!0),$.style.pointerEvents="none"});try{const $=await l.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:L})});$.player&&(e.player=$.player,f()),o($.message,"success"),X(n,t)}catch($){o($.message||"Lỗi di chuyển!","error"),X(n,t)}})}),y&&p>0){let b=p;const w=p,L=setInterval(async()=>{b--;const $=document.getElementById("travelTimer"),k=document.getElementById("travelBar");if($&&($.textContent=`⏳ ${Math.max(0,b)}s`),k&&(k.style.width=`${Math.max(0,b/w*100)}%`),b<=0){clearInterval(L);try{const S=await l.request(`/player/${e.playerId}/travel-check`,{method:"POST"});S.player&&(e.player=S.player,f()),S.arrived&&o(S.message,"success"),X(n,t)}catch{X(n,t)}}},1e3)}}catch(r){n.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(r)}}function it(n,t){var i,m;const{state:e,renderGame:l,notify:o,updateSidebar:f}=t,r=e.player,d=e.recipes||[],g=e.medicines||[],x=e._alchemyTab||"recipes",T=a=>{const b=g.find(w=>w.id===a);return b?(b.icon||"💊")+" "+b.name:a};let y=0,p=0,h=0,v=0;(r.skills||[]).forEach(a=>{const b=typeof a=="string"?a:a.id,w=typeof a=="string"?1:a.level||1;b==="tinh_che"&&(y=w*2),b==="phu_an_thuat"&&(p=w*5),b==="linh_kiem_thuat"&&(h=w*10),b==="cuong_hoa_thuat"&&(v=w*15)});const u=a=>a.split("_").map(b=>b.charAt(0).toUpperCase()+b.slice(1)).join(" "),c=[];Object.values(r.equipment||{}).forEach(a=>{a&&c.push({...a,loc:"eq"})}),(r.inventory||[]).filter(a=>a.slot&&a.slot!=="consumable").forEach(a=>c.push({...a,loc:"inv"}));let s=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${x==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${x==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${y||p||h||v?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${y?`<span>🔥 Thành công +${y}%</span>`:""}
      ${p?`<span>💎 Giảm phí -${p}%</span>`:""}
      ${h?`<span>✨ Chất lượng +${h}%</span>`:""}
      ${v?`<span>⬆️ Nâng đôi ${v}%</span>`:""}
    </div>
    `:""}
  `;if(x==="recipes"){if(s+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!r.materials||Object.keys(r.materials).length===0)s+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[a,b]of Object.entries(r.materials))s+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${u(a)} <span style="color:var(--gold)">x${b}</span></div>`;s+="</div></div>",s+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',d.length===0?s+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':d.forEach(a=>{var S;const b=T(a.target),w=Math.min(100,(a.successRate||100)+y);let L="";(S=a.requirements)!=null&&S.skill&&(L=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${u(a.requirements.skill)} lv${a.requirements.level||1}</div>`);let $="";a.materials.forEach(E=>{var _;const M=((_=r.materials)==null?void 0:_[E.id])||0;$+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${M>=E.amount?"var(--green)":"var(--red)"};font-weight:bold">${M}/${E.amount}</span> ${u(E.id)}</span>`});const k=g.find(E=>E.id===a.target)||{};s+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${b}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${a.tier}</span>
                  <span>Tỉ lệ: <span style="color:${w>=80?"var(--green)":"var(--blue)"};font-weight:bold">${w}%</span></span>
                  <span>🔥 Phí: ${a.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${L}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${$}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${k.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${a.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),s+="</div></div>"}else s+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${c.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${c.map(a=>`<option value="${a.id}">${a.loc==="eq"?"🔸":"📦"} ${a.name||a.baseType} [${a.rarity||"?"}] ${(a.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(a=>{const b=Math.max(1,Math.round(a.cost*(1-p/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${a.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${a.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${a.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${a.id}" style="width:100%">
                💎 ${b} ${p>0?`<s style="opacity:0.4;font-size:10px">${a.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;n.innerHTML=s,n.querySelectorAll(".tab-btn").forEach(a=>{a.addEventListener("click",()=>{e._alchemyTab=a.dataset.tab,it(n,t)})}),n.querySelectorAll(".accordion-header").forEach(a=>{a.addEventListener("click",()=>{const b=a.nextElementSibling;b.style.display==="none"?(b.style.display="block",a.querySelector(".text-dim:last-child").textContent="▲"):(b.style.display="none",a.querySelector(".text-dim:last-child").textContent="▼")})}),n.querySelectorAll(".btn-craft").forEach(a=>{a.addEventListener("click",async b=>{b.stopPropagation();const w=d.find(L=>L.id===a.dataset.recipe);if(w&&r.gold<(w.cost||0))return o("Không đủ linh thạch!","error");try{const L=await A.craftItem(r.id,a.dataset.recipe);e.player=L.player,o(L.message,L.success?"success":"error"),l()}catch(L){o(L.message,"error")}})}),n.querySelectorAll(".btn-currency").forEach(a=>{a.addEventListener("click",async()=>{const b=document.getElementById("selItem");if(!(b!=null&&b.value))return o("Chọn trang bị trước!","error");const w=a.dataset.cid;let L=-1;if(w==="thien_menh_phu"){const $=c.find(E=>E.id===b.value),k=($==null?void 0:$.affixes)||[];if(k.length===0)return o("Item không có affix để khóa!","error");const S=prompt(`Chọn affix để khóa (0-${k.length-1}):
${k.map((E,M)=>`${M}: ${E.name||E.stat} +${E.value}`).join(`
`)}`);if(S===null)return;if(L=parseInt(S),isNaN(L)||L<0||L>=k.length)return o("Chỉ số không hợp lệ!","error")}a.disabled=!0,a.textContent="⏳...";try{const $=await A.applyCurrency(r.id,w,b.value,L);o($.message,"success"),e.player=$.player,f(),it(n,t)}catch($){o($.message,"error"),a.disabled=!1,a.textContent="💎 Dùng"}})}),(i=document.getElementById("selItem"))==null||i.addEventListener("change",()=>{const a=c.find(w=>w.id===document.getElementById("selItem").value),b=document.getElementById("itemPreview");a&&b&&(b.innerHTML=(a.affixes||[]).map(w=>`<span style="color:var(--blue)">• ${w.name||w.stat} +${w.value}</span>`).join(" | ")||"Không có affix")}),(m=document.getElementById("selItem"))==null||m.dispatchEvent(new Event("change"))}function xt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;async function d(){try{const x=await l.getDailyQuests(r);e._dailyQuests=x,g()}catch(x){o(x.message,"error")}}function g(){const x=e._dailyQuests||{},T=x.quests||[];x.allCompleted;const y=x.bonusReward;n.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${T.map(p=>{const h=p.quest_info||{},v=p.target>0?Math.min(100,Math.round(p.progress/p.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${p.claimed?"var(--text-dim)":p.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${h.name||p.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${h.difficulty==="Khó"?"var(--red)":h.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${h.difficulty||"?"}</span>
              </div>
              ${p.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':p.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${p.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${p.progress}/${p.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${h.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${v}%;background:${p.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${h.goldReward||0} · ✨ ${h.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${y?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${y.gold} 💎, +${y.xp} EXP</div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-claim").forEach(p=>p.addEventListener("click",async()=>{try{const h=await l.claimDailyQuest(r,parseInt(p.dataset.qid));o(h.message,"success"),e.player=h.player,f(),await d()}catch(h){o(h.message,"error")}}))}d()}function ft(n,t){const{state:e,api:l,notify:o,renderGame:f}=t,r=e._questTab||"npc";n.innerHTML=`
    <div class="page-header">
      <h2>📜 Thiên Cơ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ kỳ duyên NPC và nhiệm vụ nhật thường</p>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${r==="npc"?"active":""}" data-qtab="npc" style="flex:1;padding:10px;border:none;background:${r==="npc"?"rgba(255,255,255,0.08)":"transparent"};color:${r==="npc"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${r==="npc"?"700":"400"};border-bottom:2px solid ${r==="npc"?"var(--gold)":"transparent"};transition:all 0.2s">
        📜 Kỳ Duyên NPC
      </button>
      <button class="tab-btn ${r==="daily"?"active":""}" data-qtab="daily" style="flex:1;padding:10px;border:none;background:${r==="daily"?"rgba(255,255,255,0.08)":"transparent"};color:${r==="daily"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${r==="daily"?"700":"400"};border-bottom:2px solid ${r==="daily"?"var(--gold)":"transparent"};transition:all 0.2s">
        📋 Nhật Thường Hàng Ngày
      </button>
    </div>
    <div id="questTabContent">
      <div id="questList" class="quest-container">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,n.querySelectorAll("[data-qtab]").forEach(x=>{x.addEventListener("click",()=>{e._questTab=x.dataset.qtab,ft(n,t)})});const d=n.querySelector("#questTabContent");if(r==="daily"){xt(d,t);return}g();async function g(){try{const T=(await l.getQuests(e.playerId)).quests||[],y=document.getElementById("questList");if(!y)return;if(T.length===0){y.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}y.innerHTML=T.map(p=>{const h=p.questAmount>0?Math.min(100,p.progress/p.questAmount*100):0,v=p.progress>=p.questAmount,u=p.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${v?"quest-done":""}" data-quest-id="${p.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${p.npcIcon||"🧓"} ${p.npcName||"NPC"}</span>
              <span class="quest-type">${u} ${p.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${p.questName||p.quest_id}</div>
            <div class="quest-desc">${p.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${v?"hp":"energy"}" style="width:${h}%"></div>
              </div>
              <span class="quest-progress-text">${p.progress}/${p.questAmount}</span>
            </div>
            ${v?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${p.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),y.querySelectorAll(".quest-complete-btn").forEach(p=>{p.addEventListener("click",async()=>{const h=p.dataset.qid;p.disabled=!0,p.textContent="⏳...";try{const v=await l.completeQuest(e.playerId,h);e.player=v.player,o(v.message,"success"),v.skillGained&&o(`🎯 Lĩnh ngộ: ${v.skillGained}!`,"success"),f()}catch(v){o(v.message||"Lỗi trả quest","error"),p.disabled=!1,p.textContent="✅ Trả Nhiệm Vụ"}})})}catch(x){console.error("Error loading quests:",x);const T=document.getElementById("questList");T&&(T.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function At(n,t){const{state:e,api:l,notify:o,renderGame:f}=t;if(e.player.role!=="admin"){n.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const r=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let d="monsters";n.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${r.map(s=>`
          <button class="admin-tab ${s.id===d?"active":""}" data-tab="${s.id}">${s.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",s=>{const i=s.target.closest(".admin-tab");i&&(d=i.dataset.tab,document.querySelectorAll(".admin-tab").forEach(m=>m.classList.remove("active")),i.classList.add("active"),g(d))}),g(d);async function g(s){const i=document.getElementById("adminContent");if(i){i.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const m=await l.request(`/admin/${s}?adminId=${e.playerId}`);x(s,m,i)}catch(m){i.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${m.message}</div></div>`}}}function x(s,i,m){s==="monsters"?T(i,m):s==="npcs"?y(i,m):s==="areas"?p(i,m):h(s,i,m)}function T(s,i){const m=s.monsters||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${m.map(a=>{var b,w,L,$,k,S,E,M;return`
          <div class="admin-card" data-id="${a.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${a.name} ${a.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((w=(b=s.tierInfo)==null?void 0:b[a.tier])==null?void 0:w.color)||"#888"}">${(($=(L=s.tierInfo)==null?void 0:L[a.tier])==null?void 0:$.name)||"T"+a.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((k=a.stats)==null?void 0:k.hp)||"?"}</div>
              <div>💪 ${((S=a.stats)==null?void 0:S.strength)||"?"}</div>
              <div>🏃 ${((E=a.stats)==null?void 0:E.speed)||"?"}</div>
              <div>🛡 ${((M=a.stats)==null?void 0:M.defense)||"?"}</div>
            </div>
            <div class="admin-card-meta">
              <span>XP: ${a.xpReward||0}</span>
              <span>Gold: ${Array.isArray(a.goldReward)?a.goldReward.join("-"):a.goldReward}</span>
              ${a.areaId?`<span>📍 ${a.areaId}</span>`:""}
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${a.id}" data-type="monsters" data-key="monsters">✏️ Sửa</button>
          </div>
        `}).join("")}
      </div>
    `,u(i,s,"monsters","monsters")}function y(s,i){const m=s.npcs||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${m.map(a=>`
          <div class="admin-card" data-id="${a.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${a.icon||"🧓"} ${a.name}</span>
              <span class="badge" style="background:var(--purple)">${a.profession}</span>
            </div>
            <div class="admin-card-meta">
              <span>Quests: ${(a.quests||[]).length}</span>
              <span>Areas: ${(a.areaIds||[]).join(", ")}</span>
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${a.id}" data-type="npcs" data-key="npcs">✏️ Sửa</button>
          </div>
        `).join("")}
      </div>
    `,u(i,s,"npcs","npcs")}function p(s,i){const m=Object.keys(s);i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${m.map(a=>{const b=s[a];return`
            <div class="admin-card" data-id="${a}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${b.name||a}</span>
                <span class="badge" style="background:var(--orange)">⚡${b.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(b.events||[]).map(w=>`<span>${w.type}: ${w.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${a}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,i.querySelectorAll(".admin-edit-area").forEach(a=>{a.addEventListener("click",()=>{const b=a.dataset.id,w=s[b];v(b,w,`areas/${b}`)})})}function h(s,i,m){var w;const a=JSON.stringify(i,null,2),b=a.split(`
`).length;m.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${s} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(b+5,30)}">${c(a)}</textarea>
    `,(w=document.getElementById("btnSaveGeneric"))==null||w.addEventListener("click",async()=>{try{const L=document.getElementById("genericEditor").value,$=JSON.parse(L);o("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(L){o("JSON không hợp lệ: "+L.message,"error")}})}function v(s,i,m,a){const b=JSON.stringify(i,null,2),w=document.createElement("div");w.className="admin-modal-overlay",w.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${s}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${c(b)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(w),w.querySelectorAll(".admin-modal-close").forEach(L=>{L.addEventListener("click",()=>w.remove())}),w.addEventListener("click",L=>{L.target===w&&w.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const L=document.getElementById("modalEditor").value,$=JSON.parse(L);await l.request(`/admin/${m}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:$})}),o("✅ Đã lưu!","success"),w.remove(),g(d)}catch(L){o("Lỗi: "+L.message,"error")}})}function u(s,i,m,a){s.querySelectorAll(".admin-edit-btn").forEach(b=>{b.addEventListener("click",()=>{const w=b.dataset.id,$=(i[a]||[]).find(k=>k.id===w);$&&v(w,$,`${m}/${w}`)})})}function c(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function $t(n,t){const{state:e,api:l,notify:o,renderGame:f,updateSidebar:r}=t,d=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const g=e._social;async function x(){try{const u=await l.getRelationships(d);g.relationships=u,g.loaded=!0,T()}catch(u){o(u.message||"Lỗi tải dữ liệu Giao Tế","error")}}function T(){const{friends:u,enemies:c,pendingSent:s,pendingReceived:i}=g.relationships,m=i.length;n.innerHTML=`
      <div class="page-header">
        <h2>🤝 Đạo Hữu</h2>
        <p class="page-sub">Kết bạn bè, đánh dấu kẻ thù, giao lưu giang hồ</p>
      </div>

      <!-- Search -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="socialSearch" placeholder="Tìm người chơi theo tên..." 
                 value="${g.searchQuery}" 
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSearch">🔍 Tìm</button>
        </div>
        ${g.searchResults.length>0?`
          <div style="margin-top:12px">
            ${g.searchResults.map(a=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${a.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${a.level} · ${a.realm} · ${a.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${a.id!==d?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${a.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${a.id}">⚔️ Kẻ Thù</button>
                  `:'<span style="opacity:0.4;font-size:12px">Bạn</span>'}
                </div>
              </div>
            `).join("")}
          </div>
        `:g.searchQuery?'<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>':""}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${g.tab==="friends"?"btn--blue":"btn--dark"}" data-tab="friends">
          🤝 Đạo Hữu (${u.length})
        </button>
        <button class="btn btn--sm ${g.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${c.length})
        </button>
        <button class="btn btn--sm ${g.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${m>0?`<span class="badge">${m}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${g.tab==="friends"?y(u):""}
        ${g.tab==="enemies"?p(c):""}
        ${g.tab==="pending"?h(i,s):""}
      </div>
    `,v()}function y(u){return u.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':u.map(c=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${c.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${c.level} · ${c.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${c.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${c.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function p(u){return u.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':u.map(c=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${c.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${c.level} · ${c.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${c.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${c.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function h(u,c){let s="";return u.length>0&&(s+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',s+=u.map(i=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${i.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${i.level} · ${i.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${i.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${i.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join("")),c.length>0&&(s+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',s+=c.map(i=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${i.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${i.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),u.length===0&&c.length===0&&(s='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),s}function v(){var u,c;(u=document.getElementById("btnSearch"))==null||u.addEventListener("click",async()=>{var i;const s=(i=document.getElementById("socialSearch"))==null?void 0:i.value.trim();if(!s||s.length<2)return o("Cần ít nhất 2 ký tự","error");g.searchQuery=s;try{const m=await l.searchPlayers(s);g.searchResults=m.players||[],T()}catch(m){o(m.message,"error")}}),(c=document.getElementById("socialSearch"))==null||c.addEventListener("keydown",s=>{var i;s.key==="Enter"&&((i=document.getElementById("btnSearch"))==null||i.click())}),document.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{g.tab=s.dataset.tab,T()})}),document.querySelectorAll("[data-action]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.action,m=s.dataset.target;s.disabled=!0;try{let a;switch(i){case"add-friend":a=await l.addFriend(d,m);break;case"accept-friend":a=await l.acceptFriend(d,m);break;case"reject-friend":a=await l.rejectFriend(d,m);break;case"remove-friend":a=await l.removeFriend(d,m);break;case"add-enemy":a=await l.addEnemy(d,m);break;case"remove-enemy":a=await l.removeEnemy(d,m);break}o(a.message||"Thành công!","success"),await x()}catch(a){o(a.message||"Lỗi!","error"),s.disabled=!1}})})}g.loaded?T():x()}function Tt(n,t){const{state:e,api:l,notify:o}=t,f=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const r=e._chat;async function d(){try{const[c,s]=await Promise.all([l.getGlobalChat(),l.getChatFriends(f)]);r.globalMessages=c.messages||[],r.friends=s.friends||[],r.globalMessages.length>0&&(r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id),r.loaded=!0,T(),g()}catch(c){o(c.message||"Lỗi tải chat","error")}}function g(){x(),r.pollTimer=setInterval(async()=>{try{if(r.tab==="global"){const c=await l.getGlobalChat(r.lastGlobalId);c.messages&&c.messages.length>0&&(r.globalMessages.push(...c.messages),r.globalMessages.length>100&&(r.globalMessages=r.globalMessages.slice(-100)),r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id,p(),h())}else if(r.tab==="private"&&r.selectedFriend){const c=await l.getPrivateChat(f,r.selectedFriend.id,r.lastPrivateId);c.messages&&c.messages.length>0&&(r.privateMessages.push(...c.messages),r.privateMessages.length>100&&(r.privateMessages=r.privateMessages.slice(-100)),r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id,p(),h())}}catch{}},5e3)}function x(){r.pollTimer&&(clearInterval(r.pollTimer),r.pollTimer=null)}function T(){const c=r.tab==="global"?r.globalMessages:r.privateMessages;n.innerHTML=`
      <div class="page-header">
        <h2>💬 Giang Hồ Truyền Âm</h2>
        <p class="page-sub">Giao lưu với các đạo hữu trong giang hồ</p>
      </div>

      <div class="chat-tabs" style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn btn--sm ${r.tab==="global"?"btn--blue":"btn--dark"}" data-chat-tab="global">🌍 Toàn Cầu</button>
        <button class="btn btn--sm ${r.tab==="private"?"btn--blue":"btn--dark"}" data-chat-tab="private">📨 Riêng</button>
        ${r.tab==="private"?`
          <select id="friendSelect" style="flex:1;padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
            <option value="">-- Chọn Đạo Hữu --</option>
            ${r.friends.map(s=>{var i;return`<option value="${s.id}" ${((i=r.selectedFriend)==null?void 0:i.id)===s.id?"selected":""}>${s.name} (Lv.${s.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${y(c)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${r.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,u(),h()}function y(c){return c.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':c.map(s=>{const i=s.sender_id===f,m=new Date(s.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${i?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${m}</span>
          <span style="font-weight:600;color:${i?"var(--blue)":"var(--gold)"}"> ${s.sender_name}</span>
          <span style="opacity:0.8">: ${v(s.message)}</span>
        </div>
      `}).join("")}function p(){const c=document.getElementById("chatMessages");if(!c)return;const s=r.tab==="global"?r.globalMessages:r.privateMessages;c.innerHTML=y(s)}function h(){const c=document.getElementById("chatMessages");c&&(c.scrollTop=c.scrollHeight)}function v(c){const s=document.createElement("div");return s.textContent=c,s.innerHTML}function u(){var s,i,m;document.querySelectorAll("[data-chat-tab]").forEach(a=>{a.addEventListener("click",()=>{r.tab=a.dataset.chatTab,r.tab==="global"&&(r.lastGlobalId=r.globalMessages.length>0?r.globalMessages[r.globalMessages.length-1].id:0),T(),g()})}),(s=document.getElementById("friendSelect"))==null||s.addEventListener("change",async a=>{const b=a.target.value;if(!b){r.selectedFriend=null,r.privateMessages=[],T();return}r.selectedFriend=r.friends.find(w=>w.id===b)||null,r.lastPrivateId=0;try{const w=await l.getPrivateChat(f,b);r.privateMessages=w.messages||[],r.privateMessages.length>0&&(r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id),p(),h()}catch(w){o(w.message,"error")}});const c=async()=>{var w,L;const a=document.getElementById("chatInput"),b=a==null?void 0:a.value.trim();if(b){if(r.tab==="private"&&!r.selectedFriend)return o("Chọn Đạo Hữu trước!","error");try{if(await l.sendChat(f,r.tab,r.tab==="private"?r.selectedFriend.id:null,b),a.value="",r.tab==="global"){const $=await l.getGlobalChat(r.lastGlobalId);((w=$.messages)==null?void 0:w.length)>0&&(r.globalMessages.push(...$.messages),r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id)}else{const $=await l.getPrivateChat(f,r.selectedFriend.id,r.lastPrivateId);((L=$.messages)==null?void 0:L.length)>0&&(r.privateMessages.push(...$.messages),r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id)}p(),h()}catch($){o($.message||"Lỗi gửi tin nhắn","error")}}};(i=document.getElementById("btnSend"))==null||i.addEventListener("click",c),(m=document.getElementById("chatInput"))==null||m.addEventListener("keydown",a=>{a.key==="Enter"&&c()})}t.renderGame,r.loaded?(T(),g()):d()}function kt(n,t){const{state:e,api:l,notify:o,updateSidebar:f,renderGame:r}=t,d=e.playerId,g=e._auctionTab||"browse";async function x(){try{const[p,h]=await Promise.all([l.getAuctions(),l.getMyAuctions(d)]);e._auctionListings=p.listings||[],e._auctionMine=h.listings||[],T()}catch(p){o(p.message,"error")}}function T(){const p=e._auctionListings||[],h=e._auctionMine||[],v=(e.player.inventory||[]).filter(u=>u.slot&&u.slot!=="consumable");n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${g==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${g==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${g==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${h.length})</button>
      </div>

      ${g==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':p.map(u=>{const c=JSON.parse(u.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${c.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${c.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${u.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${u.id}">💎 ${u.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:g==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${v.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${v.map(u=>`<option value="${u.id}">${u.name} [${u.rarity}]</option>`).join("")}
              </select>
              <div style="display:flex;gap:8px;margin-bottom:8px">
                <input type="number" id="inpPrice" placeholder="Giá buyout" value="500" min="10" style="flex:1;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
                <select id="selDuration" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
                  <option value="12">12h</option><option value="24" selected>24h</option><option value="48">48h</option>
                </select>
              </div>
              <button class="btn btn--gold" id="btnListItem" style="width:100%">📤 Đăng Bán</button>
            `}
          </div>
        </div>
      `:`
        <div class="panel"><div class="panel-body no-pad">
          ${h.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':h.map(u=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(u.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${u.status==="active"?"var(--green)":u.status==="sold"?"var(--gold)":"var(--red)"}">${u.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${u.buyout_price}</div>
                </div>
                ${u.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${u.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,y()}function y(){var p;n.querySelectorAll(".tab-btn").forEach(h=>h.addEventListener("click",()=>{e._auctionTab=h.dataset.tab,x()})),n.querySelectorAll(".btn-buy").forEach(h=>h.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const v=await l.buyAuction(d,parseInt(h.dataset.lid));o(v.message,"success"),e.player=v.player,f(),await x()}catch(v){o(v.message,"error")}})),n.querySelectorAll(".btn-cancel").forEach(h=>h.addEventListener("click",async()=>{try{const v=await l.cancelAuction(d,parseInt(h.dataset.lid));o(v.message,"success"),e.player=v.player,f(),await x()}catch(v){o(v.message,"error")}})),(p=document.getElementById("btnListItem"))==null||p.addEventListener("click",async()=>{var c,s,i;const h=(c=document.getElementById("selSellItem"))==null?void 0:c.value,v=parseInt(((s=document.getElementById("inpPrice"))==null?void 0:s.value)||"500"),u=parseInt(((i=document.getElementById("selDuration"))==null?void 0:i.value)||"24");try{const m=await l.listAuction(d,h,v,u);o(m.message,"success"),e.player=m.player,f(),e._auctionTab="mine",await x()}catch(m){o(m.message,"error")}})}x()}function Ot(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const d=e._market;async function g(){try{const[c,s]=await Promise.all([l.getMarketListings(d.filter,d.sort),l.getMyListings(r)]);d.listings=c.listings||[],d.myListings=s.listings||[],d.loaded=!0,T()}catch(c){o(c.message||"Lỗi tải Giao Dịch Đài","error")}}async function x(){try{const[c,s]=await Promise.all([l.getMugTargets(r),l.getMugLog(r)]);d.mugTargets=c.targets||[],d.mugCooldown=c.mugCooldown||0,d.mugLog=s.logs||[],T()}catch(c){o(c.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function T(){const c=e.player;if(n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${d.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${d.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${d.myListings.length}/10)</button>
        <button class="btn btn--sm ${d.tab==="auction"?"btn--gold":"btn--dark"}" data-mtab="auction">⚖️ Sàn Đấu Giá</button>
        <button class="btn btn--sm ${d.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${d.showListForm?v(c):""}

      ${d.tab==="browse"?y():d.tab==="my"?p():d.tab==="auction"?'<div id="auctionSubContent"></div>':h()}
    `,u(),d.tab==="auction"){const s=n.querySelector("#auctionSubContent");s&&kt(s,t)}}function y(){let c=`
      <div class="panel">
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn--xs ${d.filter===""?"btn--blue":"btn--dark"}" data-filter="">Tất cả</button>
            <button class="btn btn--xs ${d.filter==="item"?"btn--blue":"btn--dark"}" data-filter="item">⚔️ Trang Bị</button>
            <button class="btn btn--xs ${d.filter==="material"?"btn--blue":"btn--dark"}" data-filter="material">🧱 Nguyên Liệu</button>
            <button class="btn btn--xs ${d.filter==="medicine"?"btn--blue":"btn--dark"}" data-filter="medicine">💊 Đan Dược</button>
            <select id="sortSelect" style="padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:12px;margin-left:auto">
              <option value="newest" ${d.sort==="newest"?"selected":""}>Mới nhất</option>
              <option value="price_asc" ${d.sort==="price_asc"?"selected":""}>Giá tăng</option>
              <option value="price_desc" ${d.sort==="price_desc"?"selected":""}>Giá giảm</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo tên vật phẩm hoặc affix..." value="${d.search}" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
          </div>
        </div>
      </div>
    `,s=d.listings;if(d.search.trim()){const i=d.search.toLowerCase().trim();s=s.filter(m=>{var a;return m.item_name.toLowerCase().includes(i)?!0:(a=m.item_data)!=null&&a.affixes?m.item_data.affixes.some(b=>(b.stat||"").toLowerCase().includes(i)||(b.type||"").toLowerCase().includes(i)):!1})}return s.length===0?c+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(c+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',c+=s.map(i=>{var L,$;const m=i.item_type==="item"?"⚔️":i.item_type==="material"?"🧱":"💊",a=((L=i.item_data)==null?void 0:L.rarity)||"",b=i.seller_id===r,w=($=i.item_data)!=null&&$.affixes?i.item_data.affixes.map(k=>`${k.stat} ${k.type==="flat"?"+":""}${k.value}${k.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${m}
                <span style="color:var(--gold)">${i.item_name}</span>
                ${i.quantity>1?`<span style="opacity:0.5"> x${i.quantity}</span>`:""}
                ${a?`<span class="rarity-${a}" style="font-size:11px;margin-left:4px">[${a}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${i.seller_name}</span>
                ${w?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${w}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${i.price}${i.quantity>1?"/cái":""}</span>
              ${b?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${i.id}" data-qty="${i.quantity}" data-price="${i.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),c+="</div></div>"),c}function p(){if(d.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let c='<div class="panel"><div class="panel-body no-pad">';return c+=d.myListings.map(s=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${s.item_type==="item"?"⚔️":s.item_type==="material"?"🧱":"💊"} ${s.item_name} ${s.quantity>1?`<span style="opacity:0.5">x${s.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${s.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${s.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),c+="</div></div>",c}function h(){let c=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${d.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${d.mugCooldown}s</div>`:""}
    `;return d.mugTargets.length===0?c+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':c+=d.mugTargets.map(s=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${s.gender==="female"?"♀":"♂"} ${s.name}</div>
            <div class="item-meta">Lv.${s.level} · ${s.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${s.id}" ${d.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),c+="</div></div>",d.mugLog.length>0&&(c+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${d.mugLog.map(s=>{const i=s.attacker_id===r,m=s.outcome==="success"?"✅":"❌",a=s.outcome==="success"?"var(--green)":"var(--red)",b=i?s.outcome==="success"?`Cướp ${s.victim_name}: +${s.gold_stolen} 💎`:`Phục kích ${s.victim_name} thất bại!`:s.outcome==="success"?`Bị ${s.attacker_name} cướp: -${s.gold_stolen} 💎`:`${s.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${a}">${m} ${b} <span style="opacity:0.4;margin-left:auto">${new Date(s.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),c}function v(c){const s=Object.entries(c.materials||{}).map(([b,w])=>({id:b,qty:w,type:"material",name:b})),i=Object.entries(c.medicines||{}).map(([b,w])=>({id:b,qty:w,type:"medicine",name:b})),m=(c.inventory||[]).map(b=>({id:b.id,qty:1,type:"item",name:b.name||b.id})),a=[...s,...i,...m];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${a.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${a.map(b=>`<option value="${b.type}|${b.id}">${b.type==="item"?"⚔️":b.type==="material"?"🧱":"💊"} ${b.name} ${b.qty>1?`(có: ${b.qty})`:""}</option>`).join("")}
                </select>
              </div>
              <div style="width:80px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Số lượng</label>
                <input type="number" id="listQty" value="1" min="1" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
              </div>
              <div style="width:100px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Giá 💎/cái</label>
                <input type="number" id="listPrice" value="10" min="1" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
              </div>
              <button class="btn btn--sm btn--gold" id="btnConfirmList">🏪 Đăng</button>
            </div>
          `}
        </div>
      </div>
    `}function u(){var c,s,i,m;document.querySelectorAll("[data-mtab]").forEach(a=>{a.addEventListener("click",()=>{if(d.tab=a.dataset.mtab,d.tab==="mug"&&d.mugTargets.length===0){x();return}T()})}),(c=document.getElementById("btnShowList"))==null||c.addEventListener("click",()=>{d.showListForm=!d.showListForm,T()}),document.querySelectorAll("[data-filter]").forEach(a=>{a.addEventListener("click",async()=>{d.filter=a.dataset.filter,await g()})}),(s=document.getElementById("sortSelect"))==null||s.addEventListener("change",async a=>{d.sort=a.target.value,await g()}),(i=document.getElementById("searchInput"))==null||i.addEventListener("input",a=>{d.search=a.target.value,T();const b=document.getElementById("searchInput");b&&(b.focus(),b.setSelectionRange(d.search.length,d.search.length))}),(m=document.getElementById("btnConfirmList"))==null||m.addEventListener("click",async()=>{var k,S,E;const a=(k=document.getElementById("listItem"))==null?void 0:k.value;if(!a)return;const[b,w]=a.split("|"),L=parseInt((S=document.getElementById("listQty"))==null?void 0:S.value)||1,$=parseInt((E=document.getElementById("listPrice"))==null?void 0:E.value)||0;if($<=0)return o("Giá phải lớn hơn 0!","error");try{const M=await l.listForSale(r,b,w,L,$);o(M.message,"success"),e.player=M.player,f(),d.showListForm=!1,await g()}catch(M){o(M.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(a=>{a.addEventListener("click",async()=>{const b=parseInt(a.dataset.buy),w=parseInt(a.dataset.qty),L=parseInt(a.dataset.price);let $=1;if(w>1){const k=prompt(`Mua bao nhiêu? (tối đa ${w}, giá ${L} 💎/cái)`,"1");if(!k)return;$=Math.min(parseInt(k)||1,w)}a.disabled=!0;try{const k=await l.buyFromMarket(r,b,$);o(k.message,"success"),e.player=k.player,f(),await g()}catch(k){o(k.message,"error"),a.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(a=>{a.addEventListener("click",async()=>{a.disabled=!0;try{const b=await l.cancelListing(r,parseInt(a.dataset.cancel));o(b.message,"success"),e.player=b.player,f(),await g()}catch(b){o(b.message,"error"),a.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(a=>{a.addEventListener("click",async()=>{const b=a.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){a.disabled=!0,a.textContent="⏳...";try{const w=await l.mugPlayer(r,b);o(w.message,w.success?"success":"error"),e.player=w.player,f(),await x()}catch(w){o(w.message,"error"),a.disabled=!1,a.textContent="💀 Phục Kích"}}})})}d.tab==="mug"?x():d.loaded?T():g()}function Gt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;let d=!1,g=null;async function x(){try{g=await l.getRealmInfo(r),d=!0,T()}catch(h){o(h.message||"Lỗi tải Cảnh Giới","error")}}function T(){if(!g)return;const h=g.current,v=g.allRealms||[],u=e.player,c=u.xpToNext>0?Math.floor(u.xp/u.xpToNext*100):0;n.innerHTML=`
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${h.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${h.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${h.color}">${h.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Cảnh Giới Bậc ${h.tier} · ${h.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${u.level} — ${u.xp}/${u.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${c}%;background:${h.color}"></div></div>
        </div>

        ${h.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(h.bonuses).filter(([,s])=>s>0).map(([s,i])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${i} ${s}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${h.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${h.unlocks.map(s=>`<span style="font-size:12px;opacity:0.7">✅ ${s}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${h.canBreakthrough?y(h):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${v.map(s=>{const i=s.tier===h.tier,m=s.tier<h.tier,b=s.tier>h.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${i?`2px solid ${s.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${b};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${s.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${s.color}">${s.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${s.levelMin}+</span>
                ${s.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${s.failChance}% thất bại</span>`:""}
                ${m?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${i?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,p()}function y(h){const v=h.nextRealm;if(!v)return"";const u=v.cost?`💎 ${v.cost.gold} + 🔮 ${v.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${v.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${v.name} ${v.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${u}</div>
          ${v.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${v.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(v.bonuses).filter(([,c])=>c>0).map(([c,s])=>`+${s} ${c}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${v.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function p(){var h;(h=document.getElementById("btnBreakthrough"))==null||h.addEventListener("click",()=>{gt(t)})}x()}function jt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t;Kt(n,t)}async function Kt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t;n.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const d=(await l.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,f()),d.length===0){n.innerHTML=`
        <div class="page-header"><h1>📜 Sự Kiện</h1></div>
        <div class="panel">
          <div class="panel-body text-dim" style="text-align:center; padding: 40px;">
            Gió yên biển lặng. Chưa có sự kiện nào xảy ra với bạn.
          </div>
        </div>
      `;return}n.innerHTML=`
      <div class="page-header"><h1>📜 Sự Kiện Gần Đây</h1></div>
      <div class="panel">
        <div class="panel-body no-pad">
          <ul class="event-timeline" style="list-style:none; padding:16px; margin:0;">
            ${d.map(g=>{const x=new Date(g.created_at*1e3),T=x.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),y=x.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let p="📌";return p={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[g.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${T}</div>
                    <div>${y}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${p}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${g.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${g.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(r){n.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${r.message}</div></div>`}}function Dt(n,t){const{state:e,api:l,notify:o,updateSidebar:f,renderGame:r}=t,d=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const g=e._housing;async function x(){try{const v=await l.getHousing(d);g.data=v,g.loaded=!0,T()}catch(v){o(v.message||"Lỗi tải Động Phủ","error")}}function T(){const v=g.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${v.owned?p(v):y(v)}
    `,h()}function y(v){const u=v.tiers[1];return`
      <div class="panel">
        <div class="panel-title">🏗️ Mua Động Phủ</div>
        <div class="panel-body" style="text-align:center;padding:24px">
          <div style="font-size:40px;margin-bottom:12px">🏠</div>
          <div style="font-weight:600;margin-bottom:6px">${u.name}</div>
          <div style="font-size:12px;opacity:0.6;margin-bottom:12px">${u.description}</div>
          <div style="margin-bottom:12px">
            <span style="color:var(--green)">❤️ +${u.hpRegen} HP/phút</span> ·
            <span style="color:var(--blue)">🌿 ${u.gardenSlots} ô vườn</span>
          </div>
          <button class="btn btn--gold btn--lg" id="btnBuyHouse">💎 ${u.cost} Linh thạch — Mua</button>
        </div>
      </div>
    `}function p(v){const u=v.gardenSlots||[],c=v.gardenHerbs||{};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏠</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${v.tierInfo.name} <span style="opacity:0.4">(T${v.tier})</span></div>
            <div style="font-size:12px;opacity:0.6">${v.tierInfo.description}</div>
            <div style="font-size:12px;margin-top:4px">
              <span style="color:var(--green)">❤️ +${v.tierInfo.hpRegen} HP/phút</span> ·
              <span style="color:var(--blue)">🌿 ${v.maxSlots} ô vườn</span>
            </div>
          </div>
          ${v.nextTier?`
            <button class="btn btn--gold btn--sm" id="btnUpgrade" title="Nâng lên ${v.nextTier.name}">
              ⬆ ${v.nextTier.cost} 💎
            </button>
          `:'<span style="font-size:10px;color:var(--gold)">Tối đa</span>'}
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>🌿 Dược Viên</span>
          <button class="btn btn--sm btn--green" id="btnHarvest">🌾 Thu hoạch tất cả</button>
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(${Math.min(v.maxSlots,5)},1fr);gap:8px">
            ${Array.from({length:v.maxSlots},(s,i)=>{const m=u[i]||{},a=!!m.herb,b=m.ready,w=m.remaining||0,L=Math.ceil(w/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${b?"var(--green)":a?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${a?`
                    <div style="font-size:20px">${b?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${m.herbName||m.herb}</div>
                    <div style="font-size:10px;color:${b?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${b?"✅ Sẵn sàng!":"⏳ "+L+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${i}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(c).map(([$,k])=>`<option value="${$}">${k.name}</option>`).join("")}
                    </select>
                  `}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>

      ${v.formations?`
      <div class="panel" style="margin-top:10px">
        <div class="panel-title flex justify-between">
          <span>🔮 Trận Pháp</span>
          ${v.dailyCost>0?`
            <span style="font-size:11px">
              Hao phí: <strong style="color:var(--orange)">${v.dailyCost} 💎/ngày</strong>
              ${v.maintenanceDue?'<button class="btn btn--sm btn--orange" id="btnMaintenance">💰 Nộp phí</button>':'<span style="color:var(--green);margin-left:6px">✅ Đã nộp</span>'}
            </span>
          `:""}
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
            ${Object.entries(v.formations).map(([s,i])=>{const m=i.currentLevel>=i.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${i.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${i.icon}</span>
                      <strong style="margin-left:4px">${i.name}</strong>
                      ${i.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${i.currentLevel}</span>`:""}
                    </div>
                    ${i.canBuild?m?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${s}">
                        ⬆ ${i.nextCost} 💎
                      </button>`:`<span style="font-size:10px;color:var(--red)">T${i.requiredTier}+</span>`}
                  </div>
                  <div style="font-size:11px;opacity:0.5;margin-top:4px">${i.description}</div>
                  ${i.currentLevel>0?`<div style="font-size:10px;color:var(--orange);margin-top:2px">Phí: ${i.nextDailyCost||(i.dailyCosts?i.dailyCosts[i.currentLevel-1]:"?")}/ngày</div>`:""}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `}function h(){var v,u,c,s;(v=document.getElementById("btnBuyHouse"))==null||v.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const i=await l.buyHousing(d);o(i.message,"success"),e.player=i.player,f(),await x()}catch(i){o(i.message,"error")}}),(u=document.getElementById("btnUpgrade"))==null||u.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const i=await l.buyHousing(d);o(i.message,"success"),e.player=i.player,f(),await x()}catch(i){o(i.message,"error")}}),document.querySelectorAll(".plant-select").forEach(i=>{i.addEventListener("change",async m=>{const a=m.target.value;if(!a)return;const b=parseInt(i.dataset.slot);try{const w=await l.plantHerb(d,a,b);o(w.message,"success"),await x()}catch(w){o(w.message,"error")}})}),(c=document.getElementById("btnHarvest"))==null||c.addEventListener("click",async()=>{try{const i=await l.harvestGarden(d);o(i.message,"success"),e.player=i.player,f(),await x()}catch(i){o(i.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(i=>{i.addEventListener("click",async()=>{const m=i.dataset.fid;i.disabled=!0,i.textContent="⏳...";try{const a=await l.upgradeFormation(d,m);o(a.message,"success"),e.player=a.player,f(),await x()}catch(a){o(a.message,"error"),i.disabled=!1,i.textContent="⬆ Nâng"}})}),(s=document.getElementById("btnMaintenance"))==null||s.addEventListener("click",async()=>{try{const i=await l.payMaintenance(d);o(i.message,"success"),e.player=i.player,f(),await x()}catch(i){o(i.message,"error")}})}g.loaded?T():x()}function Vt(n,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function l(){n.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","skills","explore","tower","dungeon","housing","talent","alchemy","market","tips"].map(f=>`
          <button class="btn btn--sm ${e._wikiTab===f?"btn--gold":"btn--dark"}" data-tab="${f}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",skills:"⚡ Kỹ Năng",explore:"🗺️ Khám Phá",tower:"🗼 Thiên Phần Tháp",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[f]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${o(e._wikiTab)}
        </div>
      </div>
    `,n.querySelectorAll("[data-tab]").forEach(f=>{f.addEventListener("click",()=>{e._wikiTab=f.dataset.tab,l()})})}function o(f){return{lore:`
        <h3 style="color:var(--gold);margin-bottom:12px">📖 Thế Giới Quan — Nghịch Thiên Ký</h3>
        <div style="opacity:0.7;font-style:italic;margin-bottom:16px">
          "Trời đất bất nhân, coi vạn vật như cỏ rác. Đại Đạo vô tình, chỉ mạnh giả mới tồn tại."
        </div>

        <h4 style="color:var(--blue)">⏳ Biên Niên Sử</h4>
        <div style="border-left:2px solid var(--gold);padding-left:14px;margin:10px 0">
          <div style="margin-bottom:10px"><strong style="color:var(--gold)">Thượng Cổ (Year 0)</strong> — Thiên Địa khai tịch. Hỗn Độn nguyên khí tràn ngập, vạn vật hình thành. Linh Khí tràn đầy.</div>
          <div style="margin-bottom:10px"><strong style="color:var(--gold)">Thần Ma Đại Chiến (Year 3,000)</strong> — Thần tộc và Ma tộc giao tranh. Chiến trường biến thành Huyết Ma Chiến Trường. Thiên Lao bị phát hiện.</div>
          <div style="margin-bottom:10px"><strong style="color:var(--gold)">Hồng Hoang Thời Đại (Year 10,000)</strong> — Yêu thú thống trị. Các World Boss xuất hiện: Huyết Bát Yêu Vương, Mộc Yêu Hoàng, Hỏa Diệm Vương...</div>
          <div style="margin-bottom:10px"><strong style="color:var(--gold)">Tu Chân Khai Nguyên (Year 50,000)</strong> — Con người bắt đầu tu luyện. Thanh Lam Trấn thành lập. Hệ thống cảnh giới ra đời.</div>
          <div style="margin-bottom:10px"><strong style="color:var(--gold)">Bách Gia Tranh Minh (Year 80,000)</strong> — Các tông phái nổi lên. Đan Đạo, Trận Đạo, Phù Đạo phát triển. Công pháp truyền thế.</div>
          <div style="margin-bottom:10px"><strong style="color:var(--gold)">Hiện Tại (Year 100,000)</strong> — Linh Khí suy giảm. Tu sĩ phải tranh giành tài nguyên. Bí Cảnh xuất hiện. Thử thách bắt đầu...</div>
        </div>

        <h4 style="color:var(--blue);margin-top:16px">🌍 Các Vùng Đất</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0">
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:6px">🌲 <strong>Thanh Lam Trấn</strong> — Thị trấn yên bình, nơi khởi đầu</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:6px">🌑 <strong>Hắc Phong Lâm</strong> — Rừng tối nguy hiểm</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:6px">👻 <strong>Vong Linh Cốc</strong> — Thung lũng vong linh</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:6px">🌋 <strong>Thiết Huyết Sơn</strong> — Núi lửa khắc nghiệt</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:6px">⚡ <strong>Thiên Kiếp Uyên</strong> — Vực thiên lôi</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:6px">☠️ <strong>Huyết Ma Chiến Trường</strong> — Chiến trường cổ đại</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:6px">❄️ <strong>Bắc Sương Cảnh</strong> — Miền băng giá</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:6px">🌸 <strong>Đào Nguyên Bí Cảnh</strong> — Tiên cảnh ẩn giấu</div>
        </div>
      `,realm:`
        <h3 style="color:var(--gold);margin-bottom:12px">🌟 Hệ Thống Cảnh Giới (Vô Hạn Cấp Độ)</h3>
        <p>Hệ thống cấp độ và cảnh giới <strong>không giới hạn trần (No Cap)</strong>. Càng lên cao, tu vi và chiến lực càng nghịch thiên.</p>

        <table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:12px">
          <tr style="background:rgba(255,255,255,0.05)">
            <th style="padding:6px;text-align:left">Cảnh Giới</th><th>Cấp Độ</th><th>Phân Tầng</th><th>Đặc Tính</th>
          </tr>
          <tr><td style="padding:6px">🌱 Luyện Khí</td><td>1-10</td><td>Sơ / Trung / Hậu</td><td>Khởi đầu nhập môn</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">⚡ Trúc Cơ</td><td>11-20</td><td>Sơ / Trung / Hậu</td><td>Luyện Đan & Thám Hiểm</td></tr>
          <tr><td style="padding:6px">💫 Kim Đan</td><td>21-30</td><td>Sơ / Trung / Hậu</td><td>Thiết Huyết Sơn</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">🔥 Nguyên Anh</td><td>31-40</td><td>Sơ / Trung / Hậu</td><td>Thiên Kiếp Uyên & Đấu Trường</td></tr>
          <tr><td style="padding:6px">✨ Hóa Thần</td><td>41-50</td><td>Sơ / Trung / Hậu</td><td>Thiên Kiếp Thử Luyện</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">🌪️ Luyện Hư</td><td>51-65</td><td>Sơ / Trung / Hậu</td><td>Phá Toái Hư Không</td></tr>
          <tr><td style="padding:6px">🌟 Hợp Thể</td><td>66-80</td><td>Sơ / Trung / Hậu</td><td>Tông Môn Trụ Cột</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">👑 Đại Thừa</td><td>81-100</td><td>Sơ / Trung / Hậu</td><td>Thiên Đạo Quy Nạp</td></tr>
          <tr><td style="padding:6px">⚡👑 Độ Kiếp</td><td>101-130</td><td>Sơ / Trung / Hậu</td><td>Thiên Lôi Thối Thể</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">🪐 Chân Tiên</td><td>131-180</td><td>Sơ / Trung / Hậu</td><td>Thoát Phàm Nhập Thánh</td></tr>
          <tr><td style="padding:6px">☀️ Kim Tiên</td><td>181-250</td><td>Sơ / Trung / Hậu</td><td>Bất Hủ Kim Thân</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">🌌 Thái Ất Kim Tiên</td><td>251-350</td><td>Sơ / Trung / Hậu</td><td>Thời Không Nhập Đạo</td></tr>
          <tr><td style="padding:6px">💠 Đại La Kim Tiên</td><td>351-500</td><td>Sơ / Trung / Hậu</td><td>Siêu Thoát Tam Giới</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">🔱 Tiên Tôn</td><td>501-700</td><td>Sơ / Trung / Hậu</td><td>Chưởng Quản Tinh Hà</td></tr>
          <tr><td style="padding:6px">💠👑 Tiên Đế</td><td>701-1000</td><td>Sơ / Trung / Hậu</td><td>Đế Uy Trấn Thế</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">☸️ Chuẩn Thánh</td><td>1001-1500</td><td>Sơ / Trung / Hậu</td><td>Trảm Tam Thi Nhập Đạo</td></tr>
          <tr><td style="padding:6px">⚜️ Hỗn Nguyên Thánh Nhân</td><td>1501-2200</td><td>Sơ / Trung / Hậu</td><td>Bất Tử Bất Diệt</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">☯️ Hỗn Độn Đạo Tổ</td><td>2201-3200</td><td>Sơ / Trung / Hậu</td><td>Khai Thiên Tích Địa</td></tr>
          <tr><td style="padding:6px">🌌✨ Hồng Mông Chí Tôn</td><td>3201-5000</td><td>Sơ / Trung / Hậu</td><td>Sáng Tạo Thế Giới</td></tr>
          <tr style="background:rgba(255,200,0,0.05);color:var(--gold)"><td style="padding:6px">🌌👑 Vô Thượng Thiên Đạo</td><td>5001+ Vô Hạn</td><td>Tầng 1, 2, 3...</td><td>Vô Cực Bất Diệt (Không giới hạn)</td></tr>
        </table>

        <div style="background:rgba(255,200,0,0.05);border:1px solid rgba(255,200,0,0.2);border-radius:6px;padding:10px;margin-top:8px">
          ⚡ <strong>Độ Kiếp:</strong> Ở tier 3, 5, 7 cần chiến thắng Boss Thiên Lôi + trả Linh thạch (1k/5k/20k). Thất bại = tịnh dưỡng 5 phút.
        </div>
      `,combat:`
        <h3 style="color:var(--gold);margin-bottom:12px">⚔️ Hệ Thống Chiến Đấu</h3>
        <p>Chiến đấu theo lượt (max 25 lượt). Lấy cảm hứng từ Torn City.</p>

        <h4 style="color:var(--blue)">📋 Cơ Chế</h4>
        <ul style="margin:8px 0">
          <li><strong>Hit/Miss/Dodge/Crit/Glancing</strong> — 5 kết quả mỗi lượt</li>
          <li><strong>Body Part Targeting</strong> — Đầu (3.5x), Ngực (2x), Tay/Chân (1x), Vai (0.7x)</li>
          <li><strong>10 Energy/đòn</strong> — Hết Energy → không tấn công được</li>
          <li><strong>Stalemate</strong> — Hết 25 lượt = hòa</li>
          <li><strong>Flee</strong> — Có thể bỏ chạy khi quái miss (DEX vs SPD)</li>
        </ul>

        <h4 style="color:var(--blue)">❤️ Hồi Khí Huyết (HP Regen)</h4>
        <ul style="margin:8px 0">
          <li>Mọi người chơi đều <strong>tự hồi HP cơ bản: +0.5%/10 giây</strong></li>
          <li>Học kỹ năng <strong>Tọa Thiền</strong> → tăng lên <strong>+1%/10 giây</strong></li>
          <li>Động Phủ → bonus hồi HP thêm theo Tier nhà</li>
        </ul>

        <h4 style="color:var(--blue)">📊 4 Chỉ Số</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0">
          <div style="padding:6px;background:rgba(255,255,255,0.03);border-radius:4px">💪 <strong>Strength</strong> — Sát thương</div>
          <div style="padding:6px;background:rgba(255,255,255,0.03);border-radius:4px">⚡ <strong>Speed</strong> — Lượt đi trước + né</div>
          <div style="padding:6px;background:rgba(255,255,255,0.03);border-radius:4px">🎯 <strong>Dexterity</strong> — Chính xác + chí mạng</div>
          <div style="padding:6px;background:rgba(255,255,255,0.03);border-radius:4px">🛡️ <strong>Defense</strong> — Giảm sát thương</div>
        </div>
      `,skills:`
        <h3 style="color:var(--gold);margin-bottom:12px">⚡ Kỹ Năng & Công Pháp</h3>
        <p>Hệ thống kỹ năng chia 4 tab chính:</p>

        <h4 style="color:var(--blue)">📑 4 Tab</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0">
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:4px">⚔️ <strong>Chiến Đấu</strong> — Kỹ năng chiến đấu (Kiếm, Quyền, Cước...)</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:4px">🛠️ <strong>Sinh Hoạt</strong> — Kỹ năng đời thường (Nấu ăn, Hái thuốc, Khai khoáng...)</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:4px">🧘 <strong>Nội Công</strong> — Kỹ năng nội tại (Tọa Thiền, Thiết Bị Đan Điền...)</div>
          <div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:4px">📖 <strong>Công Pháp</strong> — Cây tu luyện công pháp (Education Tree)</div>
        </div>

        <h4 style="color:var(--blue)">📈 Mastery</h4>
        <p>Mỗi kỹ năng có <strong>thanh Mastery</strong>. Dùng kỹ năng → tích XP → lên cấp Mastery → mở bonus thêm.</p>

        <h4 style="color:var(--blue)">📖 Công Pháp Đặc Biệt</h4>
        <p>Một số công pháp có <strong>kỹ năng đặc biệt kèm theo</strong>. Nếu đổi công pháp, kỹ năng đặc biệt sẽ mất.</p>
      `,explore:`
        <h3 style="color:var(--gold);margin-bottom:12px">🗺️ Hệ Thống Ngao Du & Khám Phá</h3>
        <p>Tiêu Thể Lực để khám phá vùng đất. Bao gồm: di chuyển, khám phá, bí cảnh, tiên cảnh.</p>

        <h4 style="color:var(--blue)">🎲 Tỷ Lệ Gặp</h4>
        <ul style="margin:8px 0">
          <li>👹 Quái vật: 40% — Chiến đấu để nhận XP + gold + drop</li>
          <li>🌿 Nguyên liệu: 25% — Thu thập cho luyện đan/chế tác</li>
          <li>📦 Vật phẩm: 10% — Vũ khí, bí tịch, đan dược</li>
          <li>🧓 NPC: 5% — Giao nhiệm vụ, hỗ trợ tu luyện</li>
          <li>🐉 World Boss: 1% — Boss mạnh, có thể solo hoặc phát động</li>
          <li>👤 Người chơi: ~1% — Gặp người khác, có thể cướp</li>
          <li>😴 Không gì: phần còn lại</li>
        </ul>

        <h4 style="color:var(--blue)">🐉 World Boss (Phát Hiện qua Khám Phá)</h4>
        <div style="background:rgba(255,100,0,0.05);border:1px solid rgba(255,100,0,0.2);border-radius:6px;padding:10px;margin:8px 0">
          Khi gặp World Boss, có 2 lựa chọn:<br>
          ⚔️ <strong>Tự Tấn Công</strong> — Đơn thân tử chiến<br>
          📢 <strong>Phát Động</strong> — Thông báo cho mọi người cùng đánh. Boss xuất hiện trong danh sách đang hoạt động.
        </div>

        <h4 style="color:var(--blue)">🧓 NPC & Nhiệm Vụ</h4>
        <p>Khi gặp NPC trong khám phá, NPC có thể <strong>giao nhiệm vụ</strong>. Nếu đã nhận nhiệm vụ rồi, NPC sẽ nhắc nhở hoàn thành. <strong>Không thể nhận trùng nhiệm vụ.</strong></p>

        <h4 style="color:var(--blue)">🏗️ Di Chuyển</h4>
        <p>Dùng bản đồ để di chuyển giữa các vùng. Mỗi vùng có pool quái và nguyên liệu riêng, độ khó tăng dần.</p>
      `,tower:`
        <h3 style="color:var(--gold);margin-bottom:12px">🗼 Thiên Phần Tháp</h3>
        <p>Tháp vô hạn — leo tầng, đánh quái, nhận thưởng. Reset mỗi mùa (hàng tháng).</p>

        <h4 style="color:var(--blue)">⚡ Thể Lực</h4>
        <p>Mỗi tầng tiêu tốn thể lực: <strong>10 + (tầng / 10)</strong>. Ví dụ: T1-9 = 10, T10-19 = 11, T50 = 15...</p>

        <h4 style="color:var(--blue)">🎯 Sự Kiện Tầng</h4>
        <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:12px">
          <tr style="background:rgba(255,255,255,0.05)"><th style="padding:5px;text-align:left">Tầng</th><th>Loại</th><th>Hiệu ứng</th></tr>
          <tr><td style="padding:5px">Mỗi 10</td><td>👑 Boss</td><td>Boss mạnh, drop thêm</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">Mỗi 15</td><td>💰 Bảo Tàng</td><td>Loot ×2.5</td></tr>
          <tr><td style="padding:5px">Mỗi 7</td><td>☠️ Bẫy Trận</td><td>-10% HP trước chiến đấu</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">Mỗi 13</td><td>💚 Linh Tuyền</td><td>+20% HP hồi phục</td></tr>
          <tr><td style="padding:5px">Mỗi 11</td><td>⚡ Tinh Anh</td><td>Quái +30% stats</td></tr>
        </table>

        <h4 style="color:var(--blue)">🏆 Mốc Thưởng</h4>
        <p>Đạt các mốc tầng (T10, T25, T50...) sẽ nhận danh hiệu + linh thạch. Bảng xếp hạng mùa ghi nhận tầng cao nhất.</p>
      `,dungeon:`
        <h3 style="color:var(--gold);margin-bottom:12px">🏰 Hệ Thống Bí Cảnh</h3>
        <p>Bí Cảnh là phiên bản dungeon instanced. Nhận <strong>Ngọc Giản</strong> từ đánh quái → kích hoạt → chiến đấu qua các tầng → Boss cuối!</p>

        <h4 style="color:var(--blue)">📜 Ngọc Giản (Map Items)</h4>
        <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:12px">
          <tr style="background:rgba(255,255,255,0.05)"><th style="padding:5px;text-align:left">Ngọc Giản</th><th>Drop %</th><th>Bí Cảnh</th><th>Tầng</th></tr>
          <tr><td style="padding:5px">🗺️ Hạ Phẩm</td><td>8%</td><td>Lâm Hải Mê Cung</td><td>3+Boss</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">🗺️ Trung Phẩm</td><td>5%</td><td>Cổ Mộ U Minh</td><td>4+Boss</td></tr>
          <tr><td style="padding:5px">🗺️ Thượng Phẩm</td><td>3%</td><td>Hỏa Ngục Thâm Uyên</td><td>5+Boss</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">🗺️ Cực Phẩm</td><td>1%</td><td>Thiên Lao Hư Vô</td><td>6+Boss</td></tr>
        </table>

        <div style="background:rgba(0,200,255,0.05);border:1px solid rgba(0,200,255,0.2);border-radius:6px;padding:10px;margin-top:8px">
          💡 <strong>Mẹo:</strong> Boss Bí Cảnh có thể drop Tẩy Tủy Đan và Hoán Cốt Đan! Tầng cao hơn = drop tốt hơn.
        </div>
      `,housing:`
        <h3 style="color:var(--gold);margin-bottom:12px">🏠 Hệ Thống Động Phủ</h3>
        <p>Mua và nâng cấp nơi ở. Tăng hồi HP tự động + mở Dược Viên trồng nguyên liệu.</p>

        <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:12px">
          <tr style="background:rgba(255,255,255,0.05)"><th style="padding:5px;text-align:left">Tier</th><th>Tên</th><th>Chi phí</th><th>HP/phút</th><th>Ô vườn</th></tr>
          <tr><td style="padding:5px">T1</td><td>Thảo Lư</td><td>500 💎</td><td>+1</td><td>1</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">T2</td><td>Mộc Ốc</td><td>2,000 💎</td><td>+2</td><td>2</td></tr>
          <tr><td style="padding:5px">T3</td><td>Thạch Các</td><td>8,000 💎</td><td>+3</td><td>3</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">T4</td><td>Linh Phủ</td><td>25,000 💎</td><td>+5</td><td>4</td></tr>
          <tr><td style="padding:5px">T5</td><td>Thiên Cung</td><td>80,000 💎</td><td>+8</td><td>5</td></tr>
        </table>

        <h4 style="color:var(--blue)">🌿 Dược Viên</h4>
        <p>Chọn loại thảo dược → trồng vào ô vườn → chờ thu hoạch (1-3h). Nguyên liệu thu được dùng cho Luyện Đan.</p>
      `,talent:`
        <h3 style="color:var(--gold);margin-bottom:12px">🧬 Hệ Thống Căn Cốt</h3>
        <p>Mỗi nhân vật sinh ra với Căn Cốt ngẫu nhiên cho 4 chỉ số. Căn Cốt ảnh hưởng hệ số rèn luyện.</p>

        <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:12px">
          <tr style="background:rgba(255,255,255,0.05)"><th style="padding:5px;text-align:left">Hạng</th><th>Hệ số</th><th>Tỷ lệ</th></tr>
          <tr><td style="padding:5px">❌ Phế Mạch</td><td>×0.5</td><td>20%</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">⚪ Phàm Cốt</td><td>×1.0</td><td>40%</td></tr>
          <tr><td style="padding:5px">🟢 Lương Cốt</td><td>×1.5</td><td>25%</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">🔵 Linh Cốt</td><td>×2.0</td><td>12%</td></tr>
          <tr><td style="padding:5px">🟡 Thiên Cốt</td><td>×3.0</td><td>3%</td></tr>
        </table>

        <div style="background:rgba(255,200,0,0.05);border:1px solid rgba(255,200,0,0.2);border-radius:6px;padding:10px;margin-top:8px">
          💊 <strong>Tẩy Tủy Đan</strong>: Nâng 1 stat lên 1 tier. <strong>Hoán Cốt Đan</strong>: Reroll toàn bộ Căn Cốt. Cả hai rất hiếm!
        </div>
      `,alchemy:`
        <h3 style="color:var(--gold);margin-bottom:12px">⚗️ Hệ Thống Luyện Đan & Chế Tác</h3>
        <p>Thu thập nguyên liệu → Luyện đan/rèn vũ khí. Tỷ lệ thành công phụ thuộc vào tier và kỹ năng.</p>

        <h4 style="color:var(--blue)">🔮 Tiền Tệ Chế Tác (PoE-style)</h4>
        <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:12px">
          <tr style="background:rgba(255,255,255,0.05)"><th style="padding:5px;text-align:left">Phù Văn</th><th>Chi phí</th><th>Hiệu ứng</th></tr>
          <tr><td style="padding:5px">🔄 Tẩy Tủy Phù</td><td>200 💎</td><td>Reroll toàn bộ affix</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">➕ Hỗn Chú Phù</td><td>500 💎</td><td>Thêm 1 affix (max 4)</td></tr>
          <tr><td style="padding:5px">🔒 Thiên Mệnh Phù</td><td>1,000 💎</td><td>Khóa 1 affix, reroll còn lại</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:5px">⬆️ Thăng Cấp Phù</td><td>1,500 💎</td><td>Item level +1 (max +5)</td></tr>
        </table>
      `,market:`
        <h3 style="color:var(--gold);margin-bottom:12px">🏪 Hệ Thống Thương Mại</h3>

        <h4 style="color:var(--blue)">🧓 NPC Thương Nhân</h4>
        <ul style="margin:8px 0">
          <li>Mỗi NPC bán <strong>giới hạn số lượng/ngày</strong> (stock reset 00:00)</li>
          <li>Người chơi bị giới hạn <strong>50 vật phẩm/ngày</strong> từ NPC</li>
          <li>NPC ở mỗi vùng bán đồ khác nhau, cần di chuyển đến đúng vùng</li>
        </ul>

        <h4 style="color:var(--blue)">👥 Giao Dịch P2P</h4>
        <ul style="margin:8px 0">
          <li>Không giới hạn số lượng giao dịch</li>
          <li>Chịu <strong>thuế biến động</strong> (thay đổi hàng ngày, mặc định 5%)</li>
          <li>Thuế = gold sink giúp cân bằng kinh tế</li>
        </ul>
      `,tips:`
        <h3 style="color:var(--gold);margin-bottom:12px">💡 Mẹo & Chiến Lược</h3>

        <h4 style="color:var(--blue)">🚀 Cho Người Mới</h4>
        <ol style="margin:8px 0">
          <li>Train stats đều → đừng full STR, DEF cũng quan trọng</li>
          <li>Khám phá Thanh Lam Trấn để farm nguyên liệu + XP ban đầu</li>
          <li>Mua Động Phủ sớm → passive HP regen giúp nhiều!</li>
          <li>Học kỹ năng <strong>Tọa Thiền</strong> → gấp đôi tốc độ hồi HP</li>
          <li>Gặp NPC khám phá → nhận nhiệm vụ để có phần thưởng lớn</li>
          <li>Quản lý thể lực: khám phá + tháp đều tiêu thể lực</li>
        </ol>

        <h4 style="color:var(--blue)">💰 Kiếm Tiền</h4>
        <ul style="margin:8px 0">
          <li>Farm quái + bán nguyên liệu cho Thương Nhân NPC</li>
          <li>Chạy Bí Cảnh → Boss drop đồ giá trị</li>
          <li>Trồng thảo dược ở Dược Viên → thu nhập thụ động</li>
          <li>Chế tác vật phẩm → bán trên sàn Giao Dịch</li>
        </ul>

        <h4 style="color:var(--blue)">⚔️ Endgame</h4>
        <ul style="margin:8px 0">
          <li>Leo Thiên Phần Tháp → tranh hạng mùa + mốc thưởng</li>
          <li>Phát hiện & phát động World Boss → thưởng lớn cho cả nhóm</li>
          <li>Chinh phục Bí Cảnh T4 → phần thưởng tốt nhất</li>
          <li>Farm Tẩy Tủy Đan để nâng Căn Cốt → tăng hiệu quả rèn luyện</li>
          <li>Vượt Độ Kiếp → cảnh giới cao hơn = bonus stats khổng lồ</li>
        </ul>
      `}[f]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}l()}function Ft(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const d=e._npcShop;let g=parseInt(localStorage.getItem("npcShopIdx")||"0");async function x(){try{n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const p=await l.getShops(r);d.shops=p.shops||[],d.tax=p.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},d.loaded=!0,g>=d.shops.length&&(g=0),T()}catch(p){o(p.message||"Lỗi tải shop","error")}}function T(){var s;if(d.shops.length===0){n.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const p=d.shops[g]||d.shops[0],h=d.shops.map((i,m)=>`
      <button class="skill-tab ${m===g?"active":""}" data-shop-idx="${m}">
        ${i.icon||"🧓"} ${i.name}
      </button>
    `).join(""),v={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},u={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},c=(p.items||[]).map(i=>{var L,$;const m=v[i.rarity||"common"]||"#888",a=u[i.rarity||"common"]||"Phàm",b=(i.remainingStock??1)<=0,w=(((L=e.player)==null?void 0:L.gold)??0)>=(i.currentPrice||0);return`
        <div class="shop-item-card ${b?"out-of-stock":""}" style="border-left:3px solid ${m}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${m}">${i.name}</div>
              <div class="shop-item-rarity" style="color:${m}">${a} · Tầng ${i.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${b?"var(--red)":"var(--green)"}">
                ${b?"❌ Hết hàng":`📦 ${i.remainingStock}/${i.dailyStock}`}
              </span>
            </div>
          </div>
          ${i.description?`<div class="shop-item-desc">${i.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${w?"":"too-expensive"}">
              💎 ${(($=i.currentPrice)==null?void 0:$.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${p.id}" data-item="${i.id}" 
                value="1" min="1" max="${i.remainingStock||1}" 
                ${b?"disabled":""}>
              <button class="btn btn--sm ${b?"":w?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${p.id}" data-item="${i.id}"
                ${b||!w?"disabled":""}>
                ${b?"❌":w?"🛒 Mua":"💸 Thiếu"}
              </button>
            </div>
          </div>
        </div>
      `}).join("");n.innerHTML=`
      <div class="page-header">
        <h1>🧓 Thương Nhân</h1>
        <div class="text-dim text-sm">Mỗi thương nhân có hàng giới hạn mỗi ngày. Mua sắm thông minh!</div>
      </div>

      <div class="shop-info-bar">
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${d.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(((s=e.player)==null?void 0:s.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${p.area||"Không rõ"}</div>
      </div>

      ${d.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${h}</div>`:""}

      <div class="shop-items-grid">
        ${c||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,y()}function y(){n.querySelectorAll(".skill-tab[data-shop-idx]").forEach(p=>{p.addEventListener("click",()=>{g=parseInt(p.dataset.shopIdx),localStorage.setItem("npcShopIdx",g),T()})}),n.querySelectorAll(".btn-buy").forEach(p=>{p.addEventListener("click",async()=>{const h=p.dataset.shop,v=p.dataset.item,u=n.querySelector(`.buy-qty[data-shop="${h}"][data-item="${v}"]`),c=parseInt((u==null?void 0:u.value)||1);p.disabled=!0,p.textContent="⏳...";try{const s=await l.buyFromShop(r,h,v,c);o(s.message,"success"),e.player=s.player,f(),await x()}catch(s){o(s.message,"error"),p.disabled=!1,p.textContent="🛒 Mua"}})})}d.loaded?T():x()}function Ut(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const d=e._guild;async function g(){try{d.data=await l.getMyGuild(r),d.loaded=!0,T()}catch(v){o(v.message||"Lỗi","error")}}async function x(){try{const v=await l.listGuilds();d.allGuilds=v.guilds||[],T()}catch(v){o(v.message,"error")}}function T(){const v=d.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${v!=null&&v.inGuild?p(v):y(v)}
    `,h()}function y(v){return`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🏗️ Lập Tông Môn Mới</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:grid;gap:8px;max-width:360px">
            <input type="text" id="guildName" placeholder="Tên Tông Môn (2-30 ký tự)" class="input" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <input type="text" id="guildTag" placeholder="Tag (2-5 ký tự, VD: TMQ)" class="input" maxlength="5" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <textarea id="guildDesc" placeholder="Mô tả..." rows="2" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;resize:none"></textarea>
            <button class="btn btn--gold" id="btnCreate">🏯 Lập Tông Môn (${(v==null?void 0:v.createCost)||1e4} 💎)</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>📋 Danh Sách Tông Môn</span>
          <button class="btn btn--sm btn--dark" id="btnLoadGuilds">🔄 Tải</button>
        </div>
        <div class="panel-body no-pad" id="guildList">
          ${d.allGuilds?d.allGuilds.map(u=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
              <div style="flex:1">
                <div style="font-weight:600">[${u.tag}] ${u.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${u.level} · ${u.member_count}/${u.max_members} · Quỹ: ${u.treasury} 💎 · Chưởng Môn: ${u.leader_name}</div>
              </div>
              <button class="btn btn--sm btn--green btn-join" data-gid="${u.id}" ${u.member_count>=u.max_members?"disabled":""}>
                ${u.member_count>=u.max_members?"Đầy":"Gia nhập"}
              </button>
            </div>
          `).join(""):'<div style="padding:20px;text-align:center;opacity:0.3">Nhấn "Tải" để xem danh sách</div>'}
        </div>
      </div>
    `}function p(v){var i;const u=v.guild,c=v.members||[],s=v.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${u.tag}] ${u.name} <span style="opacity:0.3">Lv${u.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((i=u.levelInfo)==null?void 0:i.name)||""} · ${u.memberCount}/${u.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${u.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${u.dailyUpkeep}/ngày</span>
              ${u.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(u.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(u.buffs).map(([m,a])=>`${m} +${a}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${v.myRole==="leader"&&u.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${u.nextLevel.name}">⬆ ${u.nextLevel.upgradeCost} 💎</button>`:""}
            ${v.myRole==="leader"&&u.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
        <div class="panel">
          <div class="panel-title">💰 Đóng Góp</div>
          <div class="panel-body" style="padding:12px;display:flex;gap:6px;align-items:center">
            <input type="number" id="contributeAmt" value="100" min="1" style="flex:1;padding:6px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px">
            <button class="btn btn--sm btn--gold" id="btnContribute">💎 Đóng góp</button>
          </div>
          <div style="padding:0 12px 10px;font-size:11px;opacity:0.4">
            Bạn đã đóng: ${v.myContributed} 💎 · Vai trò: ${v.myRole==="leader"?"👑 Chưởng Môn":v.myRole==="elder"?"⭐ Trưởng Lão":"🙋 Đệ Tử"}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">📜 Nhật Ký</div>
          <div class="panel-body" style="max-height:160px;overflow-y:auto;padding:8px 12px">
            ${s.slice(0,10).map(m=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(m.created_at).toLocaleString("vi")}</span>
                ${m.detail||m.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${c.length}/${u.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${c.map(m=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${m.role==="leader"?"👑":m.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${m.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${m.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${v.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function h(){var v,u,c,s,i,m;(v=document.getElementById("btnCreate"))==null||v.addEventListener("click",async()=>{var L,$,k,S,E,M;const a=($=(L=document.getElementById("guildName"))==null?void 0:L.value)==null?void 0:$.trim(),b=(S=(k=document.getElementById("guildTag"))==null?void 0:k.value)==null?void 0:S.trim(),w=(M=(E=document.getElementById("guildDesc"))==null?void 0:E.value)==null?void 0:M.trim();if(!a||!b)return o("Nhập tên và tag!","error");try{const _=await l.createGuild(r,a,b,w);o(_.message,"success"),e.player=_.player,f(),d.loaded=!1,await g()}catch(_){o(_.message,"error")}}),(u=document.getElementById("btnLoadGuilds"))==null||u.addEventListener("click",x),document.querySelectorAll(".btn-join").forEach(a=>{a.addEventListener("click",async()=>{try{const b=await l.joinGuild(r,parseInt(a.dataset.gid));o(b.message,"success"),d.loaded=!1,await g()}catch(b){o(b.message,"error")}})}),(c=document.getElementById("btnContribute"))==null||c.addEventListener("click",async()=>{var b;const a=parseInt(((b=document.getElementById("contributeAmt"))==null?void 0:b.value)||0);if(!(a<=0))try{const w=await l.contributeGuild(r,a);o(w.message,"success"),e.player=w.player,f(),await g()}catch(w){o(w.message,"error")}}),(s=document.getElementById("btnUpgradeGuild"))==null||s.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const a=await l.upgradeGuild(r);o(a.message,"success"),await g()}catch(a){o(a.message,"error")}}),(i=document.getElementById("btnPayUpkeep"))==null||i.addEventListener("click",async()=>{try{const a=await l.payGuildUpkeep(d.data.guild.id);o(a.message,"success"),await g()}catch(a){o(a.message,"error")}}),(m=document.getElementById("btnLeave"))==null||m.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const a=await l.leaveGuild(r);o(a.message,"success"),d.loaded=!1,await g()}catch(a){o(a.message,"error")}})}d.loaded?T():g()}function Qt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const d=e._profile;function g(){n.innerHTML=`
      <div class="page-header">
        <h2>🔍 Tìm Đạo Hữu</h2>
        <p class="page-sub">Tìm kiếm người chơi theo tên. Xem profile, tấn công hoặc kết bạn.</p>
      </div>

      <div class="panel" style="margin-bottom:12px">
        <div class="panel-body" style="padding:12px 16px;display:flex;gap:8px">
          <input type="text" id="searchInput" placeholder="Nhập tên người chơi..."
            value="${d.searchQuery}"
            style="flex:1;padding:8px 12px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
          <button class="btn btn--blue" id="btnSearch">🔍 Tìm</button>
        </div>
      </div>

      ${d.viewing?x(d.viewing):""}

      ${d.results.length>0&&!d.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${d.results.length})</div>
        <div class="panel-body no-pad">
          ${d.results.map(p=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" data-view="${p.id}">
              <div style="flex:1">
                <div style="font-weight:600">${p.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${p.level} · Realm T${p.realm_tier||"?"}</div>
              </div>
              <button class="btn btn--sm btn--dark btn-view" data-vid="${p.id}">👁 Xem</button>
            </div>
          `).join("")}
        </div>
      </div>
      `:!d.viewing&&d.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,T()}function x(p){var c,s,i;const h=p.id===r,v=p.maxHp>0?Math.round(p.currentHp/p.maxHp*100):100,u={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((c=p.name[0])==null?void 0:c.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${p.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${p.level} · ${((s=p.realmInfo)==null?void 0:s.fullName)||"Phàm Nhân"}
                ${p.guild?` · <span style="color:var(--blue)">[${p.guild.tag}] ${p.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${u[p.currentArea]||p.currentArea}
                ${p.housingTier>0?` · 🏠 T${p.housingTier}`:""}
                · 📜 ${p.skills} kỹ năng · ⚔ ${p.items} vật phẩm
              </div>
            </div>
          </div>

          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ Khí Huyết</span><span>${p.currentHp}/${p.maxHp}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${v}%;background:${v>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">💪 STR</div>
              <div style="font-weight:700;color:var(--red)">${p.stats.strength}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">⚡ SPD</div>
              <div style="font-weight:700;color:var(--blue)">${p.stats.speed}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🎯 DEX</div>
              <div style="font-weight:700;color:var(--orange)">${p.stats.dexterity}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🛡 DEF</div>
              <div style="font-weight:700;color:var(--green)">${p.stats.defense}</div>
            </div>
          </div>

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(i=p.gold)==null?void 0:i.toLocaleString()} 💎</strong></div>

          ${h?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${p.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${p.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function T(){var p,h,v,u,c;(p=document.getElementById("btnSearch"))==null||p.addEventListener("click",y),(h=document.getElementById("searchInput"))==null||h.addEventListener("keydown",s=>{s.key==="Enter"&&y()}),document.querySelectorAll(".btn-view, [data-view]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.vid||s.dataset.view;try{const m=await l.getPlayerProfile(i);d.viewing=m.profile,g()}catch(m){o(m.message,"error")}})}),(v=document.getElementById("btnAttack"))==null||v.addEventListener("click",async()=>{const s=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${d.viewing.name}?`))try{const i=await l.mugPlayer(r,s);o(i.message,i.won?"success":"error"),i.player&&(e.player=i.player,f())}catch(i){o(i.message,"error")}}),(u=document.getElementById("btnAddFriend"))==null||u.addEventListener("click",async()=>{const s=document.getElementById("btnAddFriend").dataset.tid;try{const i=await l.addFriend(r,s);o(i.message||"Đã gửi lời mời!","success")}catch(i){o(i.message,"error")}}),(c=document.getElementById("btnBackSearch"))==null||c.addEventListener("click",()=>{d.viewing=null,g()})}async function y(){var v;const p=document.getElementById("searchInput"),h=(v=p==null?void 0:p.value)==null?void 0:v.trim();if(!h||h.length<2)return o("Nhập ít nhất 2 ký tự!","error");d.searchQuery=h,d.viewing=null;try{const u=await l.searchPlayers(h);d.results=u.players||[],g()}catch(u){o(u.message,"error")}}g()}function Jt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const d=e._arena;async function g(){try{d.data=await l.getArena(r),d.loaded=!0,x()}catch(y){o(y.message,"error")}}function x(){var s,i,m,a,b,w,L,$;const y=d.data,p=(y==null?void 0:y.arena)||{},h=p.rank||{},v=parseInt(p.streak)||0,u=v>=5?`🔥x${v}`:v>=3?`⚡x${v}`:v>0?`${v}W`:v<0?`${Math.abs(v)}L`:"",c=v>=5?"var(--gold)":v>=3?"var(--orange)":v>0?"var(--green)":v<0?"var(--red)":"var(--text-dim)";n.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid ${h.color||"#666"}">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px;text-shadow:0 0 12px ${h.color||"#666"}">${h.icon||"🛡️"}</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Rank</div>
            <div style="font-weight:800;font-size:18px;color:${h.color||"#fff"}">${h.name||"Chưa xếp hạng"}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px">
              ELO: <strong>${p.rating||1e3}</strong> · ${p.wins||0}W/${p.losses||0}L
              ${u?` · <span style="color:${c};font-weight:700">${u}</span>`:""}
            </div>
            ${h.nextThreshold?`
              <div style="margin-top:6px">
                <div style="font-size:10px;opacity:0.4">Tiến trình → ${h.nextThreshold} ELO</div>
                <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:3px;overflow:hidden">
                  <div style="background:${h.color||"#666"};height:100%;width:${h.progress||0}%;border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            `:'<div style="font-size:10px;opacity:0.4;margin-top:4px">🏆 Đỉnh cao! Thiên Đạo Đệ Nhất!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${(s=d.lastResult)!=null&&s.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(i=d.lastResult.newRank)==null?void 0:i.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(m=d.lastResult.newRank)==null?void 0:m.name}!</div>
      </div>
      `:""}

      <!-- LAST RESULT -->
      ${d.lastResult?`
      <div class="panel" style="margin-bottom:12px;border-left:3px solid ${d.lastResult.won?"var(--green)":"var(--red)"}">
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:700;color:${d.lastResult.won?"var(--green)":"var(--red)"}">
            ${d.lastResult.won?"🏆 CHIẾN THẮNG!":"💀 THẤT BẠI!"}
          </div>
          <div style="font-size:12px;margin-top:4px">
            Đối thủ: <strong>${(a=d.lastResult.opponent)==null?void 0:a.name}</strong> 
            ${(b=d.lastResult.opponent)!=null&&b.rank?d.lastResult.opponent.rank.icon:""} 
            (ELO ${(w=d.lastResult.opponent)==null?void 0:w.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${d.lastResult.ratingChange>0?"+":""}${d.lastResult.ratingChange}
            ${d.lastResult.goldEarned>0?` · +${d.lastResult.goldEarned} 💎`:""}
          </div>
          ${(L=d.lastResult.combatLog)!=null&&L.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${d.lastResult.combatLog.map(k=>`<div>${k}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(y.opponents||[]).length>0?(y.opponents||[]).map(k=>{var S,E,M;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((S=k.rank)==null?void 0:S.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${k.name} <span style="opacity:0.4;font-size:11px">Lv.${k.level}</span></div>
                <div style="font-size:11px;color:${((E=k.rank)==null?void 0:E.color)||"#888"}">${((M=k.rank)==null?void 0:M.name)||"Đồng"} · ELO ${k.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${k.player_id}" ${d.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${d.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${y.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(y.top10||[]).map((k,S)=>{var E,M;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${S<3?"var(--gold)":"var(--text-dim)"}">#${S+1}</span>
                <span>${((E=k.rank)==null?void 0:E.icon)||""}</span>
                <span style="flex:1">${k.name}</span>
                <span style="color:${((M=k.rank)==null?void 0:M.color)||"var(--blue)"}; font-weight:600">${k.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(y.history||[]).map(k=>{const S=k.winner_id===r;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${S?"var(--green)":"var(--red)"}">
                  ${S?"✅":"❌"} vs ${k.attacker_id===r?k.defender_name:k.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${k.rating_change>0?"+":""}${k.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll(".btn-fight-opp").forEach(k=>{k.addEventListener("click",S=>T(S.target.dataset.oid))}),($=document.getElementById("btnRandomFight"))==null||$.addEventListener("click",()=>T(null))}async function T(y){d.fighting=!0,x();try{const p=await l.request(`/player/${r}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:y})});d.lastResult=p,e.player=p.player,f(),o(p.message,p.won?"success":"error"),d.fighting=!1,await g()}catch(p){o(p.message,"error"),d.fighting=!1,x()}}d.loaded?x():g()}function Wt(n,t){const{state:e,api:l,notify:o,updateSidebar:f}=t,r=e.playerId;async function d(){try{e._worldBoss=await l.getWorldBoss(),g()}catch(x){o(x.message,"error")}}function g(){var u;const x=e._worldBoss||{},T=x.boss||{},y=x.hpPercent||0,p=x.topContributors||[],h=x.rewards||{},v=T.status==="active"&&T.current_hp>0;n.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${v?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${T.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${T.level||"?"} · ${v?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(T.current_hp||0).toLocaleString()} / ${(T.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${y}%;background:${y>50?"var(--red)":y>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${v?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${h.gold||0} · ✨ ${h.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':p.map((c,s)=>{var i;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${s<3?"var(--gold)":"var(--text-dim)"}">#${s+1}</span>
                <span style="flex:1">${c.name}</span>
                <span style="color:var(--red)">${(i=c.total_damage)==null?void 0:i.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${c.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(u=document.getElementById("btnAttackBoss"))==null||u.addEventListener("click",async()=>{const c=document.getElementById("btnAttackBoss");c.disabled=!0,c.textContent="⏳ Đang giao chiến...";const s=document.getElementById("bossCombatResult");try{const i=await l.attackWorldBoss(r);if(e.player=i.player,f(),i.log&&i.log.length>0){const m=i.log.map(L=>L.startsWith("---")?`<div class="turn">${L}</div>`:L.includes("hụt")?`<div class="miss">${L}</div>`:L.includes("né được")?`<div class="dodge">${L}</div>`:L.includes("CHÍNH MẠNG")||L.includes("💥")?`<div class="crit">${L}</div>`:L.includes("🔥")?`<div class="heavy text-orange">${L}</div>`:L.includes("chặn hoàn toàn")||L.includes("🛡")?`<div class="dodge">${L}</div>`:L.includes("ngã xuống")||L.includes("💀")?`<div class="death">${L}</div>`:L.includes("Chiến thắng")||L.includes("🏆")?`<div class="victory">${L}</div>`:L.includes("bỏ chạy")||L.includes("🏃")?`<div class="flee">${L}</div>`:L.includes("Bất phân")||L.includes("🤝")?`<div class="stalemate">${L}</div>`:L.includes("🧪")?`<div class="status-effect text-purple">${L}</div>`:L.includes("💔")?`<div class="dot-damage text-purple bold">${L}</div>`:L.includes("✨")?`<div class="regen text-green">${L}</div>`:`<div class="hit">${L}</div>`).join(""),a={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},b=a[i.outcome]||a.loss,w=Math.max(0,e.player.currentHp/e.player.maxHp*100);s.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${b.icon} ${b.text}
                <span class="subtitle">${i.turns}/${i.maxTurns||25} lượt · ⚔️ ${i.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${b.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${w}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${T.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(i.bossHp/i.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${i.bossHp.toLocaleString()}/${i.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${m}</div>
            </div>`}i.defeated?o(i.message,"success"):o(`⚔️ ${i.damage} dmg!`,"info"),await d()}catch(i){o(i.message,"error"),c.disabled=!1,c.textContent="⚔️ Tấn Công"}})}d()}function Xt(n,t){const{state:e,api:l,notify:o,updateSidebar:f,renderGame:r}=t,d=e.playerId,g={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function x(){var y;try{const[p,h]=await Promise.all([l.getGachaPools(),l.getGachaPity(d)]);e._gacha={pools:p.pools||{},pity:h.pity||{},results:((y=e._gacha)==null?void 0:y.results)||[]},T()}catch(p){o(p.message,"error")}}function T(){const y=e._gacha||{},p=y.pools||{},h=y.pity||{},v=y.results||[];n.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(p).map(([u,c])=>{var i,m,a;const s=h[u]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${u==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${c.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${g.legendary}">★ ${(i=c.rates)==null?void 0:i.legendary}%</span> ·
                <span style="color:${g.rare}">◆ ${(m=c.rates)==null?void 0:m.rare}%</span> ·
                <span style="color:${g.uncommon}">● ${(a=c.rates)==null?void 0:a.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${s.pulls_since_rare||0}/${c.pityRare} · Legend: ${s.pulls_since_legendary||0}/${c.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${u}" data-pulls="1">💎 ${c.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${u}" data-pulls="10">💎 ${c.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${v.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${v.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${v.map(u=>{var c,s,i,m;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${g[u.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((c=u.item)==null?void 0:c.slot)==="weapon"?"⚔️":((s=u.item)==null?void 0:s.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${g[u.rarity]}">${((i=u.item)==null?void 0:i.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${u.rarity}] ${(((m=u.item)==null?void 0:m.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-pull").forEach(u=>u.addEventListener("click",async()=>{const c=u.dataset.pool,s=parseInt(u.dataset.pulls);u.disabled=!0,u.textContent="⏳...";try{const i=await l.gachaPull(e.playerId,c,s);o(i.message,"success"),e.player=i.player,f(),e._gacha.results=i.results||[],e._gacha.pity[c]=i.pity,T()}catch(i){o(i.message,"error"),u.disabled=!1}}))}x()}function Yt(n,t){const{state:e,api:l,notify:o}=t;e._lbTab||(e._lbTab="level");async function f(){const d=e._lbTab||"level";n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const g=await l.getLeaderboard(d);e._lbData=g,r()}catch(g){n.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${g.message}
      </div></div>`}}function r(){const d=e._lbTab||"level",x=(e._lbData||{}).rankings||[],y=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(h=>`
      <button class="skill-tab ${d===h.id?"active":""}" data-tab="${h.id}">
        ${h.icon} ${h.name}
      </button>
    `).join("");let p="";x.length===0?p='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':d==="guild"?p=x.map((h,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${h.tag}] ${h.name}</div>
            <div class="lb-sub">👤 ${h.members}/${h.max_members} · Leader: ${h.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(h.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${h.level}</div>
          </div>
        </div>
      `).join(""):d==="pvp"?p=x.map((h,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${h.name}</div>
            <div class="lb-sub">Lv.${h.level} · ${h.wins||0}W/${h.losses||0}L${h.streak>0?` · 🔥${h.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${h.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):p=x.map((h,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${h.name}</div>
            <div class="lb-sub">${h.realm_tier?`Cảnh giới ${h.realm_tier}`:""} ${d==="level"?`· Lv.${h.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${d==="gold"?`💎 ${parseInt(h.gold||0).toLocaleString()}`:`Lv.${h.level}`}
            </div>
          </div>
        </div>
      `).join(""),n.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${y}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${p}
        </div>
      </div>
    `,n.querySelectorAll(".skill-tab[data-tab]").forEach(h=>{h.addEventListener("click",()=>{e._lbTab=h.dataset.tab,f()})})}f()}const H={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},wt=document.getElementById("app"),st={get state(){return H},api:A,notify:F,renderGame:j,updateSidebar:ie};async function Zt(){const n=localStorage.getItem("playerId");if(n&&!H.playerId)try{const t=await A.getPlayer(n);H.playerId=n,H.player=t.player,await Y(),j();return}catch{localStorage.removeItem("playerId")}if(!H.playerId)try{const t=await A.login("admin","admin");H.playerId=t.id,H.player=t.player,localStorage.setItem("playerId",t.id),await Y(),j();return}catch(t){console.warn("Dev auto-login failed. Fallback to intro UI.",t)}H.playerId?j():Lt()}function Lt(){var t,e;const n=H.authTab||"login";wt.innerHTML=`
    <div class="intro-page">
      <div class="intro-box">
        <div class="title">NGHỊCH THIÊN KÝ</div>
        <div class="intro-text">Thế giới này vận hành theo quy luật tuyệt đối.
Không ai có thể vượt qua.

...Cho đến khi hệ thống xuất hiện lỗi.</div>

        <div class="auth-tabs">
          <button class="btn btn--sm ${n==="login"?"btn--blue":"btn--dark"}" data-auth="login">Đăng nhập</button>
          <button class="btn btn--sm ${n==="register"?"btn--blue":"btn--dark"}" data-auth="register">Đăng ký</button>
        </div>

        ${n==="login"?`
          <div class="input-group">
            <label>Tên đăng nhập</label>
            <input type="text" id="inpUsername" placeholder="Username..." />
          </div>
          <div class="input-group">
            <label>Mật khẩu</label>
            <input type="password" id="inpPassword" placeholder="Password..." />
          </div>
          <button class="btn btn--gold btn--lg" id="btnLogin">ĐĂNG NHẬP</button>
        `:`
          <div class="input-group">
            <label>Tên đăng nhập</label>
            <input type="text" id="inpUsername" placeholder="Chọn username (3+ ký tự)..." />
          </div>
          <div class="input-group">
            <label>Mật khẩu</label>
            <input type="password" id="inpPassword" placeholder="Chọn mật khẩu (4+ ký tự)..." />
          </div>
          <div class="input-group">
            <label>Đạo danh</label>
            <input type="text" id="inpName" placeholder="Tên nhân vật..." />
          </div>
          <div class="input-group">
            <label>Giới tính</label>
            <div class="gender-pick">
              <label class="g-opt"><input type="radio" name="gender" value="male" checked /> ♂ Nam</label>
              <label class="g-opt"><input type="radio" name="gender" value="female" /> ♀ Nữ</label>
            </div>
          </div>
          <button class="btn btn--gold btn--lg" id="btnRegister">BẮT ĐẦU TU LUYỆN</button>
        `}
      </div>
    </div>`,document.querySelectorAll("[data-auth]").forEach(l=>{l.addEventListener("click",()=>{H.authTab=l.dataset.auth,Lt()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const l=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value;if(!l||!o)return F("Vui lòng nhập đầy đủ","error");try{const f=await A.login(l,o);H.playerId=f.id,H.player=f.player,localStorage.setItem("playerId",f.id),F(f.message,"success"),await Y(),j()}catch(f){F(f.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var d,g;const l=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value,f=((d=document.getElementById("inpName"))==null?void 0:d.value.trim())||"Vô Danh",r=((g=document.querySelector('input[name="gender"]:checked'))==null?void 0:g.value)||"male";if(!l||!o)return F("Vui lòng nhập đầy đủ","error");try{const x=await A.register(l,o,f,r);H.playerId=x.id,H.player=x.player,localStorage.setItem("playerId",x.id),F(x.message,"success"),await Y(),j()}catch(x){F(x.message||"Đăng ký thất bại!","error")}})}function St(n){const t=Math.floor(Date.now()/1e3),e=[];return n.hospitalUntil&&n.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:n.hospitalUntil,color:"var(--red)"}),n.medCooldownUntil&&n.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:n.medCooldownUntil,color:"var(--orange)"}),n.travelArrivesAt&&n.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:n.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(l=>{const o=Math.max(0,l.endTime-t),f=Math.floor(o/60),r=o%60,d=f>0?`${f}p${String(r).padStart(2,"0")}s`:`${r}s`;return`<span class="status-icon" data-end="${l.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${l.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${l.color};white-space:nowrap;
      " title="${l.label}">${l.icon} <span class="cd-time">${d}</span></span>`}).join("")}
  </div>`}let et=null;function te(){et&&clearInterval(et),et=setInterval(()=>{const n=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),l=Math.max(0,e-n);if(l<=0){t.remove();return}const o=Math.floor(l/60),f=l%60,r=t.querySelector(".cd-time");r&&(r.textContent=o>0?`${o}p${String(f).padStart(2,"0")}s`:`${f}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function Ct(n){let t="";const l={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"},cuu_u_than_uyen:{icon:"👿",tooltip:"Cửu U Ma Khí: Tăng 35% Sát Thương, 20% Tốc Độ"},thai_co_hong_hoang:{icon:"🦕",tooltip:"Hồng Hoang Cổ Khí: Tăng 25% Máu, 20% Giáp"},chu_thien_tinh_hai:{icon:"🌌",tooltip:"Tinh Tú Luân Chuyển: Tăng 30% Tốc Độ, 25% Nhanh Nhẹn"},hon_don_tien_vuc:{icon:"🔮",tooltip:"Hỗn Độn Tiên Khí: Tăng 35% Toàn Bộ Thuộc Tính"},hon_nguyen_dao_canh:{icon:"👑",tooltip:"Hỗn Nguyên Đạo Vực: Tăng 60% Sát Thương, 50% Toàn Thuộc Tính"}}[n.currentArea];return l&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${l.tooltip}">${l.icon} Cảnh Vực</span>`),n.combatBuffs&&n.combatBuffs.length>0&&n.combatBuffs.forEach(o=>{let f="💊",r="Buff";o.type==="status"&&o.stat==="poison"?(f="☠️",r="Trúng Độc"):o.type==="status"&&o.stat==="confuse"?(f="👹",r="Ma Hóa"):o.stat==="allStats"||o.stat==="hp"||o.stat==="damage"?(f="🔥",r="Cuồng Nộ"):o.stat==="defense"||o.stat==="resist"?(f="🛡️",r="Kiên Cố"):o.stat==="speed"||o.stat==="dexterity"?(f="💨",r="Thân Pháp"):(f="✨",r="Cường Hóa");let d=o.duration?` (-${o.duration} Trận)`:"",g=`Hiệu ứng: ${o.stat} (${o.type} ${o.value})${o.duration?` - Còn lại: ${o.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${g}">${f} ${r}${d}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function j(){var c,s,i,m,a,b,w,L;const n=H.player;if(!n)return;const t=Math.max(0,n.currentHp/n.maxHp*100),e=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,l=n.usableEnergy??Math.max(0,n.maxEnergy-(n.reservedEnergy??0)),o=n.reservationPct??0,f=l>0?Math.min(100,Math.max(0,n.currentEnergy/l*100)):0,r=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0,d=H.exploration?H.exploration[n.currentArea||"thanh_lam_tran"]:null,g=d?d.name:"Khám Phá",x=H._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");H._collapsedNav=x;const y={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[H.currentPage];y&&(x[y]=!1),wt.innerHTML=`
    <div class="game-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="game-title">NGHỊCH THIÊN KÝ</div>
          <div class="game-sub">Tu Tiên RPG v2.0</div>
          <div style="position:relative;margin-top:8px">
            <input type="text" id="searchPlayerInput" placeholder="🔍 Tìm Người Chơi..." autocomplete="off" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;font-size:12px;outline:none">
            <div id="searchResults" style="position:absolute;top:100%;left:0;right:0;background:#1a1a2e;border:1px solid rgba(255,255,255,0.15);border-radius:0 0 6px 6px;max-height:200px;overflow-y:auto;z-index:100;display:none"></div>
          </div>
        </div>

        <div class="sidebar-player">
          <div class="player-name">${n.name}</div>
          ${n.activeTitle?`<div style="font-size:10px;color:var(--gold);font-weight:600;letter-spacing:0.5px;margin-top:1px">『${n.activeTitle}』</div>`:""}
          <div class="player-meta">Lv.${n.level} · ${((c=n.realmInfo)==null?void 0:c.fullName)||"?"}</div>
          ${St(n)}
          ${Ct(n)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${n.currentHp}/${n.maxHp}
                ${n.currentHp<n.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(s=n.skills)!=null&&s.some($=>$.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực (Thế Giới)</span>
              <span>
                ${n.currentStamina??100}/${n.maxStamina??100}
                ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((i=n.stats)==null?void 0:i.staminaRegen)??2}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${e}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔵 Linh Lực (Thực Chiến)</span>
              <span>
                ${n.currentEnergy}/${l}
                ${o>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${o}% bởi Tâm Pháp Hào Quang">(Khóa ${o}%)</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${f}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>✨ Tu Vi (Cấp ${n.level})</span>
              <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${r.toFixed(1)}%)</span></span>
            </div>
            <div class="bar-track"><div class="bar-fill xp" style="width:${r}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${n.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${H.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(n.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
            </button>
            <button class="btn btn--dark nav-item ${H.currentPage==="wiki"?"active":""}" data-page="wiki" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Bách Khoa">
              📖
            </button>
            <button class="btn btn--dark nav-item ${H.currentPage==="leaderboard"?"active":""}" data-page="leaderboard" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Xếp Hạng">
              🏆
            </button>
            <button class="btn btn--dark nav-item ${H.currentPage==="social"?"active":""}" data-page="social" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Xã Hội">
              💬
            </button>
          </div>
          <div style="font-size:10px;color:var(--text-dim);text-align:center;padding-bottom:6px;border-bottom:1px solid var(--border)">
            📍 ${g} ${n.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':n.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(n.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <!-- PHÂN HỆ 1: KHÁM PHÁ & HÀNH TRÌNH (Trọng Tâm Gameplay) -->
          <li class="nav-section ${x.hanhtrinh?"collapsed":""}" data-section="hanhtrinh">
            <span>⚔️ KHÁM PHÁ & HÀNH TRÌNH</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${x.hanhtrinh?"collapsed":""}" id="sec-hanhtrinh">
            <li class="nav-item nav-item--hero ${H.currentPage==="combat"?"active":""}" data-page="combat">
              <span class="icon">🔍</span> Khám Phá (${g})
              <span class="badge" style="background: linear-gradient(135deg, #e8a43a, #f0c030); color: #1a1a2e; font-weight: 800; font-size: 9px; padding: 2px 6px;">CHÍNH</span>
            </li>
            <li class="nav-item ${["travel","dungeon","tiencanh"].includes(H.currentPage)?"active":""}" data-page="travel">
              <span class="icon">🗺️</span> Ngao Du Bát Hoang
              ${(n.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(H.currentPage)?"active":""}" data-page="quests">
              <span class="icon">📜</span> Thiên Cơ Nhiệm Vụ
              ${(n.activeQuests||[]).filter($=>$.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(n.activeQuests||[]).filter($=>$.status==="active").length}</span>`:""}
            </li>
          </div>

          <!-- PHÂN HỆ 2: TU CHÂN (Tự Thân & Tu Luyện) -->
          <li class="nav-section ${x.tuchan?"collapsed":""}" data-section="tuchan">
            <span>TU CHÂN</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${x.tuchan?"collapsed":""}" id="sec-tuchan">
            <li class="nav-item ${H.currentPage==="stats"?"active":""}" data-page="stats">
              <span class="icon">🧘</span> Tu Luyện & Cảnh Giới
              ${(a=(m=H.player)==null?void 0:m.realmInfo)!=null&&a.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite" title="Có thể đột phá!">!</span>':""}
            </li>
            <li class="nav-item ${["skills","education","library","glitch"].includes(H.currentPage)?"active":""}" data-page="skills">
              <span class="icon">⚡</span> Kỹ Năng & Lĩnh Ngộ
              ${(n.glitchInsight||0)>0?`<span class="badge" style="background: #a855f7;" title="Điểm Thấu Triệt">${n.glitchInsight}</span>`:""}
            </li>
            <li class="nav-item ${H.currentPage==="inventory"?"active":""}" data-page="inventory">
              <span class="icon">🎒</span> Càn Khôn Túi
              ${(n.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)" title="Đan độc">⏳</span>':""}
            </li>
          </div>

          <!-- PHÂN HỆ 3: TRANH ĐẤU (Chiến Đấu & Thử Thách) -->
          <li class="nav-section ${x.tranhdau?"collapsed":""}" data-section="tranhdau">
            <span>TRANH ĐẤU</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${x.tranhdau?"collapsed":""}" id="sec-tranhdau">
            <li class="nav-item ${H.currentPage==="arena"?"active":""}" data-page="arena">
              <span class="icon">⚔️</span> Luận Đạo Đấu Trường
            </li>
            <li class="nav-item ${H.currentPage==="tower"?"active":""}" data-page="tower">
              <span class="icon">🗼</span> Thiên Phần Tháp
            </li>
            <li class="nav-item ${H.currentPage==="worldboss"?"active":""}" data-page="worldboss">
              <span class="icon">🐉</span> Ma Thú Xâm Lăng
              <span class="badge" style="background:var(--red); font-size:9px">Boss</span>
            </li>
          </div>

          <!-- PHÂN HỆ 4: TIÊN PHỦ (Phương Ngoại & Thế Giới) -->
          <li class="nav-section ${x.tienphu?"collapsed":""}" data-section="tienphu">
            <span>TIÊN PHỦ</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${x.tienphu?"collapsed":""}" id="sec-tienphu">
            <li class="nav-item ${H.currentPage==="housing"?"active":""}" data-page="housing">
              <span class="icon">🏠</span> Động Phủ Tu Tiên
            </li>
            <li class="nav-item ${H.currentPage==="guild"?"active":""}" data-page="guild">
              <span class="icon">🏯</span> Tông Môn Bang Hội
            </li>
            <li class="nav-item ${H.currentPage==="alchemy"?"active":""}" data-page="alchemy">
              <span class="icon">⚒️</span> Luyện Đan & Đúc Khí
            </li>
          </div>

          <!-- PHÂN HỆ 5: THƯƠNG HỘI (Kinh Tế & Vận May) -->
          <li class="nav-section ${x.thuonghoi?"collapsed":""}" data-section="thuonghoi">
            <span>THƯƠNG HỘI</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${x.thuonghoi?"collapsed":""}" id="sec-thuonghoi">
            <li class="nav-item ${["market","auction"].includes(H.currentPage)?"active":""}" data-page="market">
              <span class="icon">🏪</span> Phường Thị & Đấu Giá
            </li>
            <li class="nav-item ${H.currentPage==="npcshop"?"active":""}" data-page="npcshop">
              <span class="icon">🧓</span> Tiên Các Thương Nhân
            </li>
            <li class="nav-item ${H.currentPage==="gacha"?"active":""}" data-page="gacha">
              <span class="icon">🎰</span> Thiên Cơ Đài (Tầm Bảo)
            </li>
          </div>

          ${n.role==="admin"?`
          <!-- PHÂN HỆ 6: VÔ THƯỢNG (Admin) -->
          <li class="nav-section ${x.vothuong?"collapsed":""}" data-section="vothuong">
            <span>VÔ THƯỢNG</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${x.vothuong?"collapsed":""}" id="sec-vothuong">
            <li class="nav-item ${H.currentPage==="admin"?"active":""}" data-page="admin">
              <span class="icon">⚙️</span> Thiên Đạo Quản Trị
            </li>
          </div>`:""}
        </ul>
      </aside>

      <!-- CONTENT -->
      <main class="main-content">
        <div id="pageContent"></div>
      </main>
      
      <!-- POPUP WIDGET (Chat / Social) -->
      <div class="floating-popup-container" id="popupContainer" style="${H.popupOpen?"display:flex;":"display:none;"}">
        <div class="popup-header">
          <div class="popup-tabs">
            <button class="popup-tab ${H.popupPage==="chat"?"active":""}" data-popup="chat">💬 Truyền Âm</button>
            <button class="popup-tab ${H.popupPage==="social"?"active":""}" data-popup="social">🤝 Đạo Hữu</button>
          </div>
          <button class="popup-close" id="btnPopupClose">✖</button>
        </div>
        <div id="popupContent" class="popup-body"></div>
      </div>
      
      <!-- FLOATING BUTTONS -->
      <div class="floating-actions">
        <button class="btn-fab bg-blue" id="btnFabChat" title="Truyền Âm"><span class="icon">💬</span></button>
        <button class="btn-fab bg-green" id="btnFabSocial" title="Đạo Hữu"><span class="icon">🤝</span></button>
      </div>
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach($=>{$.addEventListener("click",()=>{H.currentPage=$.dataset.page,j()})}),document.querySelectorAll(".nav-section[data-section]").forEach($=>{$.addEventListener("click",()=>{const k=$.dataset.section;H._collapsedNav=H._collapsedNav||{},H._collapsedNav[k]=!H._collapsedNav[k],localStorage.setItem("collapsedNav",JSON.stringify(H._collapsedNav));const S=document.getElementById(`sec-${k}`);S&&(S.classList.toggle("collapsed",H._collapsedNav[k]),$.classList.toggle("collapsed",H._collapsedNav[k]))})}),(b=document.getElementById("btnFabChat"))==null||b.addEventListener("click",()=>nt("chat")),(w=document.getElementById("btnFabSocial"))==null||w.addEventListener("click",()=>nt("social"));const p=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');p&&p.addEventListener("click",$=>{$.stopPropagation(),H.currentPage="events",H.popupOpen=!1,j()}),(L=document.getElementById("btnPopupClose"))==null||L.addEventListener("click",()=>{H.popupOpen=!1,j()}),document.querySelectorAll(".popup-tab[data-popup]").forEach($=>{$.addEventListener("click",()=>nt($.dataset.popup))}),ae(),H.popupOpen&&ee();const h=document.getElementById("searchPlayerInput"),v=document.getElementById("searchResults");let u=null;h&&v&&(h.addEventListener("input",()=>{clearTimeout(u);const $=h.value.trim();if($.length<2){v.style.display="none";return}u=setTimeout(async()=>{try{const k=await A.searchPlayers($),S=k.players||k.results||[];S.length===0?v.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':v.innerHTML=S.map(E=>{var M;return`
              <div class="search-result" data-pid="${E.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${E.name} <span style="opacity:0.4">Lv.${E.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((M=E.realmInfo)==null?void 0:M.name)||""}</span>
              </div>
            `}).join(""),v.style.display="block",v.querySelectorAll(".search-result").forEach(E=>{E.addEventListener("click",()=>{H.currentPage="profile",H._viewProfileId=E.dataset.pid,v.style.display="none",h.value="",j()}),E.addEventListener("mouseenter",()=>E.style.background="rgba(255,255,255,0.08)"),E.addEventListener("mouseleave",()=>E.style.background="transparent")})}catch{v.style.display="none"}},300)}),h.addEventListener("blur",()=>{setTimeout(()=>{v.style.display="none"},200)}),h.addEventListener("keydown",$=>{$.key==="Escape"&&(v.style.display="none",h.blur())})),te()}function nt(n){H.popupOpen=!0,H.popupPage=n,j()}function ee(){const n=document.getElementById("popupContent");n&&(H.popupPage==="chat"?Tt(n,st):H.popupPage==="social"&&$t(n,st))}const ne={combat:Pt,education:tt,stats:qt,skills:tt,inventory:at,travel:bt,alchemy:it,quests:ft,admin:At,social:$t,chat:Tt,market:Ot,realm:Gt,events:jt,dungeon:mt,housing:Dt,wiki:Vt,npcshop:Ft,guild:Ut,library:rt,profile:Qt,arena:Jt,auction:kt,dailyquest:xt,worldboss:Wt,gacha:Xt,leaderboard:Yt,tiencanh:yt,glitch:(n,t)=>{localStorage.setItem("skillsTab","glitch"),tt(n,t)}};function ae(){const n=document.getElementById("pageContent");if(!n)return;const t=ne[H.currentPage];t&&t(n,st)}function ie(){var d,g,x,T;const n=H.player;if(!n)return;const t=Math.max(0,n.currentHp/n.maxHp*100),e=n.usableEnergy??Math.max(0,n.maxEnergy-(n.reservedEnergy??0)),l=n.reservationPct??0,o=e>0?Math.min(100,Math.max(0,n.currentEnergy/e*100)):0,f=document.querySelector(".sidebar-player");if(f){const y=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,p=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0;f.innerHTML=`
      <div class="player-name">${n.name}</div>
      <div class="player-meta">Lv.${n.level} · ${((d=n.realmInfo)==null?void 0:d.fullName)||"?"}</div>
      ${St(n)}
      ${Ct(n)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${n.currentHp}/${n.maxHp}
            ${n.currentHp<n.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(g=n.skills)!=null&&g.some(h=>h.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực (Thế Giới)</span>
          <span>
            ${n.currentStamina??100}/${n.maxStamina??100}
            ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((x=n.stats)==null?void 0:x.staminaRegen)??2}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${y}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔵 Linh Lực (Thực Chiến)</span>
          <span>
            ${n.currentEnergy}/${e}
            ${l>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${l}% bởi Tâm Pháp Hào Quang">(Khóa ${l}%)</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${o}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>✨ Tu Vi (Cấp ${n.level})</span>
          <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${p.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${p}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${n.gold??0} Linh Thạch</div>`}const r=document.querySelector('.nav-item[data-page="stats"]');if(r){let y="";n.statPoints>0&&(y+=`<span class="badge">${n.statPoints}</span>`),(T=n.realmInfo)!=null&&T.canBreakthrough&&(y+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),r.querySelectorAll(".badge").forEach(p=>p.remove()),r.insertAdjacentHTML("beforeend",y)}}async function Y(){try{const[n,t,e,l,o]=await Promise.all([A.getMonsters(),A.getSkills(),A.getItems(),A.getMedicines(),A.getEducation()]);H.monsters=n.monsters||[],H.skills=t.skills||[],H.items=e.items||[],H.medicines=l.medicines||[],H.educationTrees=o.trees||[],H.exploration=await A.getExploration(),H.recipes=(await A.getRecipes()).recipes,H.npcs=(await A.getNpcs()).npcs||[]}catch(n){console.error("Lỗi tải dữ liệu:",n)}}function F(n,t="info"){var l;(l=document.querySelector(".notification"))==null||l.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=n,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}Zt();
//# sourceMappingURL=index-z9iE3Zd0.js.map
