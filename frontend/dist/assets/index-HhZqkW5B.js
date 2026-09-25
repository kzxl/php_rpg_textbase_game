(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))o(p);new MutationObserver(p=>{for(const f of p)if(f.type==="childList")for(const r of f.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(p){const f={};return p.integrity&&(f.integrity=p.integrity),p.referrerPolicy&&(f.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?f.credentials="include":p.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function o(p){if(p.ep)return;p.ep=!0;const f=e(p);fetch(p.href,f)}})();const Ht="/api";class Pt{async request(t,e={}){try{const o=await fetch(`${Ht}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),p=await o.json();if(!o.ok)throw new Error(p.error||`HTTP ${o.status}`);return p}catch(o){throw console.error(`API Error [${t}]:`,o),o}}register(t,e,o,p){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:o,gender:p})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,o=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:o})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,o=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:o})})}toggleAura(t,e){return this.request(`/player/${t}/skills/toggle-aura`,{method:"POST",body:JSON.stringify({auraId:e})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,o=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:o})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCraftingMastery(t){return this.request(`/player/${t}/crafting-mastery`)}getMonsterMastery(t){return this.request(`/player/${t}/monster-mastery`)}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,o,p=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:o,lockAffixIndex:p})})}enrollNode(t,e,o){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:o})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,o){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:o})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,o,p){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:o,amount:p})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,o=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${o}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,o,p){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:o,message:p})})}getMarketListings(t="",e="newest"){const o=new URLSearchParams;return t&&o.set("type",t),e&&o.set("sort",e),this.request(`/market?${o.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,o,p,f){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:o,quantity:p,price:f})})}buyFromMarket(t,e,o=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:o})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}getTribulationPreview(t){return this.request(`/player/${t}/tribulation-preview`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,o){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:o})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,o,p){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:o,description:p})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,o,p=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:o,lockAffixIndex:p})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,o,p=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:o,quantity:p})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,o,p=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:o,durationHours:p})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,o=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:o})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const K=new Pt;function It(n,t){var S,C,I,N,G;const{state:e,api:o,notify:p,renderGame:f,updateSidebar:r}=t,d=e.player,u=e.exploration?e.exploration[d.currentArea||"thanh_lam_tran"]:null,x=u?u.name:"Vùng Đất Vô Danh",$=u&&(u.staminaCost||u.stamina_cost)||10,h=(u==null?void 0:u.rates)||[],l=((S=h.find(M=>M.type==="herb"))==null?void 0:S.weight)||0,v=((C=h.find(M=>M.type==="mineral"))==null?void 0:C.weight)||0,m=((I=h.find(M=>M.type==="monster"))==null?void 0:I.weight)||0;n.innerHTML=`
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
        <p class="text-dim mb-xs">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
        <div class="flex gap-2 justify-center flex-wrap mb-md text-xs">
          <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">🌿 Thảo Dược: ~${l}%</span>
          <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.3);">⛏️ Mạch Khoáng: ~${v}%</span>
          <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);">👾 Yêu Thú: ~${m}%</span>
        </div>
        <div class="flex justify-center gap-2 flex-wrap">
          <button class="btn btn--gold btn--lg" id="btnExplore" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span>🔍 Tìm Kiếm</span>
            <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${$} Thể Lực</span>
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
    </div>`;const g=((N=d.insightLevels)==null?void 0:N.monster)??0,c=async()=>{try{const M=await o.getAreaMonsters(d.id);if(M.monsters){e.player.trackedMonsters=M.monsters;const L=document.getElementById("trackedMonstersList");if(!L)return;if(M.monsters.length===0){L.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}L.innerHTML=M.monsters.map(P=>{const E=P.currentHp/P.stats.hp*100,B=E>60?"var(--green)":E>30?"var(--orange)":"var(--red)";let O='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';g>=1&&(O=`<div class="item-desc text-sm text-dim mb-sm">${P.description||"Yêu thú vùng này."}</div>`);let D="";g>=1&&(D=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${E}%; background: ${B}; height: 100%;"></div>
            </div>`);let z=g>=2?`❤ ${P.currentHp}/${P.stats.hp}`:g>=1?"❤ ???":"";return`
            <div class="monster-card ${P.is_boss?"boss":""}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${P.icon||"👾"}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${P.is_boss?"var(--red)":"var(--text-bright)"}; font-size: 15px;">${P.name}</span>
                    <span class="badge ${P.is_boss?"bg-red":"bg-darker"}">Cấp ${P.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${B};">${z}</div>
                </div>
                ${D}
                ${O}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${P.instance_id}" data-monster-id="${P.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),L.querySelectorAll(".btnTrackedCombat").forEach(P=>{P.addEventListener("click",E=>{const B=E.currentTarget.dataset.monsterId,O=E.currentTarget.dataset.instanceId;pt(t,B,O)})})}}catch(M){console.error(M)}},a=async()=>{try{const M=await o.getAreaMonsterTemplates(d.currentArea||"thanh_lam_tran");if(M.monsters){const L=document.getElementById("areaMonstersList");if(!L)return;if(M.monsters.length===0){L.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}L.innerHTML=M.monsters.map(P=>`
            <div style="display: flex; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div style="font-size: 24px; width: 36px; text-align: center;">${P.icon||"👾"}</div>
              <div style="flex: 1;">
                <div class="flex items-center gap-2">
                  <span class="bold" style="color: ${P.isBoss?"var(--red)":"var(--text-bright)"}; font-size: 13px;">${P.name}</span>
                  <span class="badge ${P.isBoss?"bg-red":"bg-darker"} text-xs">Cấp ${P.level}</span>
                </div>
                <div class="text-xs text-dim">${P.description||"Yêu thú sinh sống tại khu vực này."}</div>
              </div>
            </div>
          `).join("")}}catch(M){console.error(M)}};c(),a(),(G=document.getElementById("btnExplore"))==null||G.addEventListener("click",()=>ct(t));let i=!1;const b=document.getElementById("btnAutoBattle"),s=document.getElementById("btnStopAuto"),y=document.getElementById("panelKhamPha"),T=document.querySelector(".toggle-auto-combat"),k=document.getElementById("autoCombatStatus");b&&b.addEventListener("click",()=>{i=!0,y.style.display="none",T.style.display="block",w()}),s&&s.addEventListener("click",()=>{i=!1,y.style.display="block",T.style.display="none"});async function w(){var E,B,O,D,z,q,_,j,F,U;let M=0,L=0,P=0;for(;i;){k.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${M} trận | +${L} XP | +${P} Linh Thạch</div>
        `;const V=e.player;if((V.currentStamina||0)<$){k.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",i=!1;break}if(V.currentHp/V.maxHp<.2){k.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",i=!1;break}try{const R=await o.explore(e.playerId);if(e.player=R.player,r(),R.event&&(R.event.type==="monster"||R.event.type==="worldBoss")){if(k.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${R.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(X=>setTimeout(X,600)),!i)break;const A=await o.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:R.event.monsterId})});if(e.player=A.player,r(),A.outcome==="win")M++,L+=((E=A.rewards)==null?void 0:E.xp)||0,P+=((B=A.rewards)==null?void 0:B.gold)||0,k.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(O=A.monster)==null?void 0:O.name}! (+${((D=A.rewards)==null?void 0:D.xp)||0} XP, +${((z=A.rewards)==null?void 0:z.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${M} | Tiếp tục sau 1s...</div>
                   `;else{k.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${A.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,i=!1;break}}else if(R.event&&R.event.type==="monster_ambush"&&R.event.combatResult){const A=R.event.combatResult;if(A.outcome==="win")M++,L+=((q=A.rewards)==null?void 0:q.xp)||0,P+=((_=A.rewards)==null?void 0:_.gold)||0,k.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(j=A.monster)==null?void 0:j.name}! (+${((F=A.rewards)==null?void 0:F.xp)||0} XP)</div>`;else{k.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",i=!1;break}}else k.innerHTML=`<div class='text-blue'>${((U=R.event)==null?void 0:U.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(R){k.innerHTML=`<div class='text-red'>Lỗi: ${R.message}. Dừng tự động.</div>`,i=!1;break}await new Promise(R=>setTimeout(R,1200))}}}async function ct(n){var d,u,x;const{state:t,api:e,notify:o,updateSidebar:p}=n,f=document.getElementById("exploreResult");if(!f)return;const r=document.getElementById("btnExplore");r&&(r.disabled=!0,r.style.opacity="0.6"),f.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const $=await e.explore(t.playerId);t.player=$.player,p();const h=$.event,l=$.cost||10,v=$.player.currentStamina??0,m=$.player.maxStamina??100,g=v>=l;let c=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
          <div style="margin-bottom: 10px;">
            <span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px;">
              🏃 -${l} Thể Lực (Hiện có: ${v}/${m})
            </span>
          </div>
    `;if(h.type==="monster")c+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${h.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${h.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${h.monsterId}">👣 Theo Dõi</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(h.type==="monster_ambush"&&h.combatResult){const a=h.combatResult,i=gt(a.log||[]),b=a.outcome==="win"?"🏆 Chiến thắng!":a.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",s=a.outcome==="win"?"var(--green)":a.outcome==="loss"?"var(--red)":"var(--orange)";c+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${h.message}</div>
        <div style="font-size:16px;font-weight:700;color:${s};margin-bottom:12px">${b}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${i}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Thám Tiếp (-${l} TL)</button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(h.type==="worldBoss")c+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${h.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${h.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${h.monsterId}">👣 Ghi Dấu</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(h.type==="npc"&&h.npcId)c+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${h.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${h.message}</div>
        <div class="text-sm text-dim mb-md">${h.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnNpcInteract">💬 Bái Kiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
          <button class="btn btn--dark" id="btnExploreContinue">Đóng</button>
        </div>
      `;else if(h.type==="player_encounter"&&h.targetPlayer){const a=h.targetPlayer;c+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${a.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${a.realmTierName||"Phàm nhân"} · Cấp ${a.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${a.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${a.id}">⚔️ Cướp Bóc</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `}else if(h.type==="herb"){const a=h.isCritical;c+=`
        <div style="font-size: 44px; margin-bottom: 6px;">🌿</div>
        <div class="badge ${a?"badge--gold":"badge--green"} mb-xs" style="font-size: 11px; padding: 3px 10px; text-transform: uppercase;">
          ${a?"🌟 BỘI THU DƯỢC LIỆU (BẠO KÍCH)":"🌿 DƯỢC THẢO THIÊN NHIÊN"}
        </div>
        <div class="text-lg ${a?"text-gold":"text-bright"} bold mb-sm">${h.message}</div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 400px;">
          <div class="text-md bold" style="color: #34d399;">+${h.quantity} ${h.itemName||"Linh Thảo"}</div>
          ${h.bonusGold?`<div class="text-sm text-gold mt-xs">+${h.bonusGold} 💎 Linh Thạch thô (Thưởng bạo kích)</div>`:""}
          <div class="text-xs text-dim mt-sm" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            🌿 Kỹ năng <strong>Hái Dược</strong>: Cấp ${h.skillLevel} <span style="color:#6ee7b7">(+${h.skillXpGained} XP)</span>
          </div>
          ${h.levelUp?`<div class="badge badge--gold mt-xs animate-bounce" style="font-size:11px;">🎉 Chúc mừng! Hái Dược thăng cấp ${h.levelUp.newLevel}!</div>`:""}
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${l} TL)`:`❌ Hết Thể Lực (${v}/${l})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(h.type==="mineral"){const a=h.isCritical;c+=`
        <div style="font-size: 44px; margin-bottom: 6px;">⛏️</div>
        <div class="badge ${a?"badge--gold":"badge--cyan"} mb-xs" style="font-size: 11px; padding: 3px 10px; background: ${a?"rgba(234, 179, 8, 0.2)":"rgba(6, 182, 212, 0.2)"}; color: ${a?"#facc15":"#22d3ee"}; border: 1px solid ${a?"rgba(234, 179, 8, 0.5)":"rgba(6, 182, 212, 0.4)"}; text-transform: uppercase;">
          ${a?"💎 MẠCH KHOÁNG ĐẠI PHÁT (BẠO KÍCH)":"⛏️ MẠCH KHOÁNG THIÊN ĐỊA"}
        </div>
        <div class="text-lg ${a?"text-gold":"text-bright"} bold mb-sm">${h.message}</div>
        <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 400px;">
          <div class="text-md bold" style="color: #38bdf8;">+${h.quantity} ${h.itemName||"Khoáng Thạch"}</div>
          ${h.bonusGold?`<div class="text-sm text-gold mt-xs">+${h.bonusGold} 💎 Tinh Thạch vụn (Thưởng bạo kích)</div>`:""}
          <div class="text-xs text-dim mt-sm" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            ⛏️ Kỹ năng <strong>Khai Khoáng</strong>: Cấp ${h.skillLevel} <span style="color:#7dd3fc">(+${h.skillXpGained} XP)</span>
          </div>
          ${h.levelUp?`<div class="badge badge--gold mt-xs animate-bounce" style="font-size:11px;">🎉 Chúc mừng! Khai Khoáng thăng cấp ${h.levelUp.newLevel}!</div>`:""}
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${l} TL)`:`❌ Hết Thể Lực (${v}/${l})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else h.type==="material"?c+=`
        <div style="font-size: 36px; margin-bottom: 6px;">📦</div>
        <div class="badge badge--dark mb-xs" style="font-size: 11px; padding: 3px 8px;">DÃ NGOẠI THU THẬP</div>
        <div class="text-lg text-bright bold mb-sm">${h.message}</div>
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; margin: 10px auto; max-width: 350px;">
          <div class="text-md bold text-green">+${h.quantity||1} ${h.itemName||h.itemId}</div>
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${l} TL)`:`❌ Hết Thể Lực (${v}/${l})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `:c+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${h.message}</div>
        ${h.gold?`<div class="text-gold bold">+${h.gold} 💎 Linh Thạch</div>`:""}
        ${h.item?`<div class="text-green bold">+1 ${h.item.name}</div>`:""}
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${l} TL)`:`❌ Hết Thể Lực (${v}/${l})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `;c+="</div></div>",f.innerHTML=c,(h.type==="monster"||h.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",a=>{f.innerHTML="",pt(n,a.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async a=>{try{const i=await e.trackMonster(t.playerId,a.target.dataset.mid);i.success?(o(i.message,"success"),f.innerHTML="",typeof n.renderGame=="function"&&n.renderGame()):i.error&&o(i.error,"error")}catch(i){o("Lỗi theo dõi: "+i.message,"error")}})),h.type==="npc"&&h.npcId&&((d=document.getElementById("btnNpcInteract"))==null||d.addEventListener("click",async()=>{await Mt(n,h.npcId,f)})),(u=document.getElementById("btnExploreAgain"))==null||u.addEventListener("click",()=>{ct(n)}),(x=document.getElementById("btnExploreContinue"))==null||x.addEventListener("click",()=>{f.innerHTML=""})}catch($){f.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${$.message}</div></div>`}finally{r&&(r.disabled=!1,r.style.opacity="1")}}async function Mt(n,t,e){const{state:o,api:p,notify:f,renderGame:r}=n,d=document.getElementById("npcQuestModal")||e;try{const x=(await p.getNpc(t)).npc;if(!x)return;const $=(o.player.activeQuests||[]).map(l=>l.quest_id);let h=x.quests.map(l=>{const v=$.includes(l.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${l.name}</span>
            <span class="text-xs badge" style="background:${l.type==="kill"?"var(--red)":"var(--green)"}">${l.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${l.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${l.rewards.gold?l.rewards.gold+"💎 ":""}${l.rewards.xp?l.rewards.xp+"✨ ":""}${l.rewards.skillChance?"🎯 "+l.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${v?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${l.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");d.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${x.icon||"🧓"} ${x.name} <span class="subtitle">${x.profession}</span></div>
        <div class="panel-body">
          ${h||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,d.querySelectorAll(".btn-accept-quest").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="⏳...";try{const v=await p.acceptQuest(o.playerId,l.dataset.npc,l.dataset.qid);o.player=v.player,f(v.message,"success"),r()}catch(v){f(v.message||"Lỗi nhận quest","error"),l.disabled=!1,l.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(u){console.error("NPC load error:",u)}}async function pt(n,t,e=null){var x,$;const{state:o,api:p,notify:f,updateSidebar:r,renderGame:d}=n,u=document.getElementById("combatResult");if(u){if(!o.player.currentHp||o.player.currentHp<=0)return f("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(o.player.hospitalRemaining>0)return f(`Đang tịnh dưỡng! Còn ${o.player.hospitalRemaining}s`,"error");u.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,u.scrollIntoView({behavior:"smooth"});try{const h=await p.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:o.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(o.player=h.player,h.outcome==="no_energy"){u.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${h.log[0]}</div></div>`,r();return}const l=h.monster,v=Math.max(0,o.player.currentHp/o.player.maxHp*100),m=Math.max(0,l.currentHp/l.maxHp*100),g={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},c=g[h.outcome]||g.loss,a=(x=h.rewards)!=null&&x.gold?` · +${h.rewards.gold} 💎`:"",i=h.rewards?` · +${h.rewards.xp} XP${a}`:"",b={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[h.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};u.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${c.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${c.icon}</span> <span>${c.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${h.turns}/${h.maxTurns||25} Lượt ${i}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.9) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright); font-size: 15px; margin-bottom: 2px;">${o.player.name}</div>
              <div style="font-size: 11px; color: ${b.color}; font-weight: 600; margin-bottom: 8px;">
                ${b.icon} ${b.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${v}%; height: 100%; background: ${v>50?"var(--green)":v>20?"var(--orange)":"var(--red)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${o.player.currentHp}/${o.player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(251,191,36,0.5); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${($=h.glitchEvents)!=null&&$.length?h.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${l.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${l.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${l.level||1} · ${l.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${m}%; height: 100%; background: ${m>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${l.currentHp}/${l.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${h.weakpoint?`
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${h.weakpoint}</strong> (x2.5 Dmg)
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
            ${gt(h.log)}
          </div>
        </div>
      </div>`;const s=document.getElementById("cardMonster"),y=document.getElementById("cardPlayer");h.glitchEvents&&h.glitchEvents.length>0&&s?h.glitchEvents.forEach((T,k)=>{setTimeout(()=>{ot(s,`-${T.damage} 🌌 [VẾT NỨT]`,"glitch"),s.classList.add("shake"),setTimeout(()=>s.classList.remove("shake"),400)},k*400+200)}):s&&h.rewards&&ot(s,`-${Math.round(l.maxHp*.4)} 💥`,"crit"),r(),e&&typeof d=="function"&&setTimeout(()=>d(),1500)}catch(h){u.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${h.message}</div></div>`}}}function ot(n,t,e="normal"){if(!n)return;const o=document.createElement("div");o.className=`floating-damage damage-${e}`,o.textContent=t,n.appendChild(o),setTimeout(()=>o.remove(),1100)}function gt(n){return(n||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("Kích Hoạt")||t.includes("Xuất chiêu")?`<div class="skill-proc" style="color:#38bdf8;font-weight:700;background:rgba(56,189,248,0.12);padding:3px 8px;border-radius:4px;margin:2px 0;border-left:3px solid #38bdf8;">${t}</div>`:t.includes("thường công")?`<div class="normal-attack" style="color:var(--text-dim);font-style:italic;margin:2px 0;">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function rt(n,t){const{state:e,api:o,notify:p}=t,f=e.player,r=(f.skills||[]).find(h=>(typeof h=="string"?h:h.id)==="nhan_thuat"),d=r?r.level||1:0,u=[...e.skills].sort((h,l)=>(h.tier||1)-(l.tier||1)),x=(f.skills||[]).map(h=>typeof h=="string"?h:h.id),$={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};n.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${d}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${u.map(h=>{const l=x.includes(h.id),v=h.tier||1,m=v>d+1,g=v<=d;let c="";return h.requirements&&h.requirements.length>0?g||l?c=`<div class="mt-sm text-xs text-orange">Điều kiện: ${h.requirements.map(a=>`<br>• ${a}`).join("")}</div>`:m?c=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${v}.</div>`:c='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':c='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${l?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${h.name} ${l?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${l?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${$[v]||v}</span>
                    <span class="text-xs text-dim">${h.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||l?h.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${h.type!=="passive"&&h.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${h.cost} linh lực</div>`:""}
                
                ${c}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${l?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${m?"btn--dark":"btn--gold"} btn--sm btn-learn" ${m?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${h.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,n.querySelectorAll(".accordion-header").forEach(h=>{h.addEventListener("click",()=>{const l=h.nextElementSibling;l.style.display==="none"?(l.style.display="block",h.querySelector("div:last-child").textContent="▲"):(l.style.display="none",h.querySelector("div:last-child").textContent="▼")})}),n.querySelectorAll(".btn-learn").forEach(h=>{h.addEventListener("click",async l=>{l.stopPropagation();try{const v=await o.learnSkill(f.id,h.dataset.sid);v.error?p(v.error,"error"):(e.player=v.player,p(v.message,"success"),rt(n,t))}catch(v){p("Lỗi học kỹ năng: "+v.message,"error")}})})}async function ut(n){const{state:t,api:e,notify:o,updateSidebar:p,renderGame:f}=n,r=t.player;if(!r)return;let d=document.getElementById("tribulation-modal-overlay");d||(d=document.createElement("div"),d.id="tribulation-modal-overlay",d.style.cssText=`
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px); z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      padding: 16px; animation: fadeIn 0.25s ease;
    `,document.body.appendChild(d)),d.innerHTML=`
    <div style="background: #121420; border: 2px solid #eab308; border-radius: 14px; max-width: 580px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(234, 179, 8, 0.2); padding: 24px; text-align: center; color: #fff;">
      <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚡</div>
      <div style="font-size: 16px; font-weight: 700; color: #eab308; margin-top: 8px;">Đang dò xét Thiên Khí & Thăm Dò Thiên Kiếp...</div>
    </div>
  `;try{const u=await e.getTribulationPreview(r.id);Nt(d,u,n)}catch(u){d.remove(),o(u.message||"Không thể tra cứu thông tin Lôi Kiếp","error")}}function Nt(n,t,e){var h,l,v;const{state:o,api:p,notify:f,updateSidebar:r,renderGame:d}=e,u=t.tribulation||{},x=t.playerStats||{},$=u.color||"#eab308";n.innerHTML=`
    <div style="background: #111422; border: 2px solid ${$}; border-radius: 14px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 12px 50px rgba(0,0,0,0.95), 0 0 35px ${$}44; color: #fff; animation: scaleUp 0.25s ease;">
      <!-- HEADER -->
      <div style="padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: linear-gradient(135deg, ${$}22, rgba(0,0,0,0.6)); text-align: center; position: relative;">
        <span style="position: absolute; top: 16px; right: 20px; font-size: 20px; cursor: pointer; color: var(--text-dim);" id="btn-close-tribulation">✕</span>
        <div style="font-size: 28px; line-height: 1;">🌩️</div>
        <div style="font-size: 20px; font-weight: 800; color: ${$}; margin-top: 6px; letter-spacing: 0.5px;">
          ${u.name||"Thiên Lôi Giáng Trần"}
        </div>
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px; font-style: italic;">
          "${u.lore||"Thiên đạo khảo nghiệm, chín chết một sống, tắm mình trong lôi điện để tẩy thoát phàm thai."}"
        </div>
      </div>

      <div style="padding: 20px 24px;">
        <!-- TRIBULATION SPECS -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; text-align: center;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Số Đợt Sét</div>
            <div style="font-size: 18px; font-weight: 800; color: ${$}; margin-top: 2px;">${u.waves||3} Đợt</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Uy Lực Khởi Đầu</div>
            <div style="font-size: 18px; font-weight: 800; color: #ef4444; margin-top: 2px;">~${u.baseDamage||150} ST</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Gia Tăng Uy Lực</div>
            <div style="font-size: 18px; font-weight: 800; color: #f59e0b; margin-top: 2px;">+${Math.round(((u.scaling||1.3)-1)*100)}%/đợt</div>
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
  `,(h=n.querySelector("#btn-close-tribulation"))==null||h.addEventListener("click",()=>n.remove()),(l=n.querySelector("#btn-cancel-tribulation"))==null||l.addEventListener("click",()=>n.remove()),(v=n.querySelector("#btn-start-tribulation"))==null||v.addEventListener("click",async()=>{await qt(n,e,u)})}async function qt(n,t,e){var c,a,i;const{state:o,api:p,notify:f,updateSidebar:r,renderGame:d}=t,u=e.color||"#eab308";n.innerHTML=`
    <div style="background: #0d0f1a; border: 2px solid ${u}; border-radius: 14px; max-width: 620px; width: 100%; max-height: 92vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 15px 60px rgba(0,0,0,0.98), 0 0 45px ${u}66; color: #fff;">
      <!-- ARENA TOP -->
      <div style="padding: 16px 20px; background: linear-gradient(180deg, ${u}22, rgba(0,0,0,0.8)); border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center; position: relative;" id="tribulation-arena-header">
        <div style="font-size: 14px; font-weight: 700; color: ${u}; letter-spacing: 1px;">
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
  `;const x=n.querySelector("#tribulation-log-stream"),$=n.querySelector("#tribulation-wave-indicator"),h=n.querySelector("#tri-hp-bar"),l=n.querySelector("#tri-energy-bar"),v=n.querySelector("#tri-hp-val"),m=n.querySelector("#tri-energy-val"),g=n.querySelector("#tribulation-footer");try{const b=await p.attemptBreakthrough(o.playerId),s=b.tribulation;if(!s||!s.logs){b.player&&(o.player=b.player),f(b.message,b.success?"success":"error"),typeof r=="function"&&r(),n.remove(),d();return}let y=((c=b.player)==null?void 0:c.maxHp)||s.startingHp,T=s.startingHp,k=s.startingEnergy,w=((a=b.player)==null?void 0:a.maxEnergy)||Math.max(50,s.startingEnergy);v.textContent=`${T}/${y}`,m.textContent=`${k}`;const S=s.logs||[];for(let C=0;C<S.length;C++){const I=S[C];await new Promise(L=>setTimeout(L,900)),$.textContent=`ĐỢT ${I.wave}/${s.totalWaves} ĐANG GIÁNG XUỐNG!`,$.style.color="#ef4444",n.style.backgroundColor="rgba(255, 255, 255, 0.2)",setTimeout(()=>{n.style.backgroundColor="rgba(0, 0, 0, 0.88)"},80);const N=document.createElement("div");N.style.cssText=`
        padding: 8px 12px; border-radius: 6px;
        background: ${I.defeated?"rgba(239, 68, 68, 0.2)":"rgba(255, 255, 255, 0.05)"};
        border-left: 3px solid ${I.defeated?"#ef4444":I.dodged?"#a78bfa":u};
        animation: fadeIn 0.3s ease;
      `,N.innerHTML=`
        <div style="font-weight: 700; color: ${u}; margin-bottom: 2px;">
          ⚡ Đợt ${I.wave}/${s.totalWaves}: Sét Uy Lực ${I.rawDamage} ST
        </div>
        <div style="color: #e2e8f0; font-size: 12px;">${I.text}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 11px;">
          ${I.dodged?'<span style="color: #a78bfa;">💨 Chẻ sét né tránh</span>':""}
          ${I.auraMitigated?'<span style="color: #10b981;">🛡️ Kim Chung hóa giải</span>':""}
          ${I.absorbedByQi>0?`<span style="color: #38bdf8;">🔵 Chân khí hấp thụ: ${I.absorbedByQi} ST</span>`:""}
          <span style="color: #f87171;">💥 Thương tổn: -${I.actualHpDamage} HP</span>
          ${I.medicineRescued?'<span style="color: #f59e0b; font-weight:700;">💊 Dùng đan dược cứu mệnh!</span>':""}
        </div>
      `,x.appendChild(N),x.scrollTop=x.scrollHeight,T=I.hpRemaining,k=I.energyRemaining;const G=Math.max(0,Math.min(100,Math.round(T/y*100))),M=Math.max(0,Math.min(100,Math.round(k/w*100)));if(h.style.width=`${G}%`,l.style.width=`${M}%`,v.textContent=`${T}/${y}`,m.textContent=`${k}`,I.defeated)break}if(await new Promise(C=>setTimeout(C,800)),b.player&&(o.player=b.player),typeof r=="function"&&r(),s.survived){$.textContent="🌟 LÔI VÂN TAN BIẾN • ĐỘ KIẾP VIÊN MÃN",$.style.color="#10b981";const C=document.createElement("div");C.style.cssText=`
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(16, 185, 129, 0.2));
        border: 2px solid #eab308; border-radius: 8px; padding: 14px; text-align: center;
        margin-top: 8px; animation: scaleUp 0.3s ease;
      `,C.innerHTML=`
        <div style="font-size: 24px;">👑</div>
        <div style="font-size: 16px; font-weight: 800; color: #eab308; margin-top: 4px;">
          ĐỘT PHÁ THÀNH CÔNG!
        </div>
        <div style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
          ${b.message}
        </div>
      `,x.appendChild(C),x.scrollTop=x.scrollHeight,g.innerHTML=`
        <button class="btn btn--gold btn--lg shadow-glow" id="btn-finish-tribulation" style="min-width: 200px; font-weight: 700;">
          🌟 ĐÓN NHẬN TIÊN PHÁP
        </button>
      `,f(b.message,"success")}else{$.textContent="☠️ TRỌNG THƯƠNG • ĐỘT PHÁ THẤT BẠI",$.style.color="#ef4444";const C=document.createElement("div");C.style.cssText=`
        background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; border-radius: 8px;
        padding: 14px; text-align: center; margin-top: 8px; animation: scaleUp 0.3s ease;
      `,C.innerHTML=`
        <div style="font-size: 24px;">☠️</div>
        <div style="font-size: 15px; font-weight: 800; color: #ef4444; margin-top: 4px;">
          ĐỘT PHÁ THẤT BẠI!
        </div>
        <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
          ${b.message}
        </div>
      `,x.appendChild(C),x.scrollTop=x.scrollHeight,g.innerHTML=`
        <button class="btn btn--dark" id="btn-finish-tribulation" style="min-width: 180px;">
          🏥 VỀ DƯỠNG THƯƠNG
        </button>
      `,f(b.message,"error")}(i=n.querySelector("#btn-finish-tribulation"))==null||i.addEventListener("click",()=>{n.remove(),d()})}catch(b){f(b.message||"Lỗi trong quá trình độ kiếp","error"),n.remove(),d()}}function zt(n,t){var v,m,g;const{state:e,api:o,notify:p,renderGame:f}=t,r=e.player,d=r.stats,u=r.allocatedStats||{},x=5,$=r.currentEnergy>=x&&!r.hospitalRemaining,h=r.talentDisplay||{},l=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];n.innerHTML=`
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
            🌟 ${((v=r.realmInfo)==null?void 0:v.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(m=r.realmInfo)!=null&&m.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${l.map(([c,a,i])=>{const b=h[c]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${b.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${a}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${i}</div>
                <div style="font-size:14px;font-weight:700;color:${b.color};margin-top:4px">${b.icon} ${b.name}</div>
                <div style="font-size:11px;color:${b.color};opacity:0.8">×${b.value} hệ số</div>
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
        ${l.map(([c,a,i,b])=>{const s=h[c]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},y=Math.floor(r.currentEnergy/x)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${a}</span> ${i}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${b}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${d[c]??0}</span>
              ${u[c]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${u[c]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${s.color};min-width:50px" title="Căn Cốt: ${s.name} (×${s.value})">${s.icon}×${s.value}</span>
              <input type="number" class="train-count" data-stat="${c}" min="1" max="${y}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${$?"":"disabled"}>
              <button class="btn btn--sm ${$?"btn--blue":"btn--dark"} train-btn" data-train="${c}" ${$?"":"disabled"} title="Tốn ${x} Linh lực/lần · Căn cốt ×${s.value}">Rèn Luyện</button>
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
    </div>`,(g=n.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",()=>{ut(t)}),n.querySelectorAll(".train-btn").forEach(c=>{c.addEventListener("click",async a=>{a.stopPropagation();const i=n.querySelector(`.train-count[data-stat="${c.dataset.train}"]`),b=parseInt(i==null?void 0:i.value)||1;try{const s=await o.trainStat(e.playerId,c.dataset.train,b);e.player=s.player,p(s.message,"success"),f()}catch(s){p(s.message||"Lỗi rèn luyện","error")}})})}async function ht(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.player;if(r){n.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const u=(await o.getGlitches(r.id)).status,x=n.querySelector("#glitchContentWrapper");if(!x)return;if(!u.featureUnlocked){_t(x,u.featureDetails,r);return}Bt(x,u,r,t)}catch(d){n.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${d.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function _t(n,t,e){const o=(t==null?void 0:t.requirements)||[];n.innerHTML=`
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
          ${o.map(p=>`
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.02); border-radius: 6px; border-left: 3px solid ${p.met?"#22c55e":"#6b7280"};">
              <span style="color: ${p.met?"#86efac":"#d1d5db"}; display: flex; align-items: center; gap: 8px;">
                <span>${p.met?"✅":"🔒"}</span> ${p.label}
              </span>
              <span style="font-size: 0.8rem; color: ${p.met?"#22c55e":"#9ca3af"}; font-weight: bold;">
                ${p.current}
              </span>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="font-size: 0.8rem; color: #71717a; max-width: 460px; margin: 0 auto;">
        💡 Gợi ý: Hãy tiếp tục đột phá tu vi lên <strong>Trúc Cơ</strong> hoặc chiến đấu sinh tử để kích phát kẽ hở thời không.
      </div>
    </div>
  `}function Bt(n,t,e,o){const{api:p,notify:f,updateSidebar:r}=o,d=t.imprints||[],u=t.stances||{},x=t.activeStance||"breaker";n.innerHTML=`
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
  `;const $=n.querySelector("#btnOverrideTribulation");$&&($.onclick=async()=>{$.disabled=!0,$.textContent="Đang lách luật...";try{const h=await p.overrideTribulation(e.id);f(h.message,"success"),state.player=h.player,r(),ht(n.parentElement,o)}catch(h){f(h.message||"Thao tác lách luật thất bại!","error"),$.disabled=!1,$.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),vt(n,u,x,e,p,f,r),mt(n,d,e,f,r)}function vt(n,t,e,o,p,f,r){const d=n.querySelector("#stanceContainer");d&&(d.innerHTML="",Object.values(t).forEach(u=>{const x=u.isUnlocked!==!1,$=u.id===e,h=document.createElement("div");h.style.cssText=`
      background: ${$?"rgba(168, 85, 247, 0.15)":x?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${$?"#c084fc":x?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${x?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${x?"1":"0.55"};
    `,h.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${x?u.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${x?u.icon:"🔒"}</span> ${u.name}
        </div>
        ${$?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${x?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${x?u.description:`<span style="color:#f59e0b;">${u.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,h.onclick=async()=>{if(!x)return f(u.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!$)try{const l=await p.setStance(o.id,u.id);f(l.message,"success"),state.player=l.player,r(),vt(n,t,u.id,o,p,f,r)}catch(l){f(l.message||"Chuyển thế thất bại","error")}},d.appendChild(h)}))}function mt(n,t,e,o,p){const f=n.querySelector("#imprintsContainer");f&&(f.innerHTML="",t.forEach(r=>{const d=document.createElement("div"),u=r.fogLevel||(r.isUnlocked?"revealed":"fog");let x="rgba(15, 23, 42, 0.5)",$="rgba(255,255,255,0.08)",h="none";u==="revealed"?(x="rgba(30, 41, 59, 0.75)",$=r.color,h=`0 0 12px ${r.color}33`):u==="partial"?(x="rgba(24, 24, 27, 0.6)",$="1px dashed rgba(168, 85, 247, 0.4)"):(x="rgba(10, 10, 15, 0.5)",$="1px dashed rgba(255, 255, 255, 0.08)"),d.style.cssText=`
      background: ${x};
      border: 1px solid ${$};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${h};
      position: relative;
      overflow: hidden;
    `,d.innerHTML=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${r.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${r.icon}</span> ${r.name}
          </div>
          <span style="font-size: 0.7rem; color: ${u==="revealed"?"#fbbf24":"#6b7280"}; border: 1px solid ${u==="revealed"?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.08)"}; padding: 1px 6px; border-radius: 4px;">
            ${u==="revealed"?r.title:u==="partial"?"Chớm Ngộ":"Sương Mù"}
          </span>
        </div>

        <div style="font-size: 0.78rem; color: ${u==="fog"?"#9ca3af":"#a1a1aa"}; font-style: italic; margin-bottom: 8px; line-height: 1.4;">
          "${r.lore}"
        </div>

        <div style="font-size: 0.82rem; color: ${u==="revealed"?"#e4e4e7":"#9ca3af"}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
          <strong style="color: ${u==="revealed"?"#67e8f9":"#888"};">
            ${u==="revealed"?"Hiệu ứng:":u==="partial"?"Manh mối:":"Sấm truyền:"}
          </strong> ${r.description}
        </div>
      </div>

      <div>
        ${u==="revealed"?`
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
            <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐẠI TRIỆT ĐẠI NGỘ</span>
            <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${r.title}">
              ${e.activeTitle===r.title?"Đang Đeo":"Đeo Danh Hiệu"}
            </button>
          </div>
        `:u==="partial"?`
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
    `;const l=d.querySelector(".btnSetTitle");l&&(l.onclick=()=>{e.activeTitle=r.title,o(`Đã kích hoạt danh hiệu: [${r.title}]!`,"success"),p(),mt(n,t,e,o,p)}),f.appendChild(d)}))}function et(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.player;if(!r)return;const d=r.skills||[],u=e.skills||[],x=(r.realmTier??1)>=2||(r.glitchInsight??0)>=20||(r.unlockedImprints||[]).length>0,h=(L=>{switch(L){case 1:return 2;case 2:return 3;case 3:return 4;case 4:return 5;default:return 6}})(r.realmTier||1),l=d.map(L=>{const P=typeof L=="string"?L:L.id;return{...u.find(B=>B.id===P)||{name:P,id:P,category:"combat",type:"active"},level:L.level||1,xp:L.xp||L.currentXp||0,equipped:L.equipped||L.isEquipped||!1}}),v=l.filter(L=>L.type!=="passive"),m=l.filter(L=>L.type==="passive"),g=v.filter(L=>L.equipped),c={combat:{icon:"⚔️",name:"Chiêu Thức",sub:`${v.length} chiêu • ${g.length}/${h} ô xuất`,badge:`${g.length}/${h}`},auras:{icon:"🧘",name:"Tâm Pháp & Hào Quang",sub:`Khóa ${r.reservationPct||0}% LL • ${(r.activeAuras||[]).length} Hào quang`,badge:`${r.reservationPct||0}%`},monsters:{icon:"🐺",name:"Thông Thạo Quái Vật",sub:"Bách thú đồ giám • Sát quái 5★",badge:"★"},crafting:{icon:"⚒️",name:"Thông Thạo Chế Tạo",sub:`Lv.${r.craftingLevel||1} • Đan đạo & Đúc rèn`,badge:`Lv.${r.craftingLevel||1}`}};let a=localStorage.getItem("activeSkillPillar")||"combat";["combat","auras","monsters","crafting","library","glitch"].includes(a)||(a="combat");let i="all",b="all",s=null,y=null;const T=(L,P)=>{var A;const E=(L.level||1)*100,B=Math.min(100,(L.xp||0)/E*100),O=L.type==="passive",D="★".repeat(Math.min(L.tier||1,7)),z=(L.tier||1)>=5?"var(--gold)":(L.tier||1)>=3?"var(--purple)":"var(--blue)";let q="";if(O)q='<span style="font-size:11px; font-weight:700; color:var(--green)">🧘 Tâm Pháp Thường Trực</span>';else if(L.equipped)q=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${L.id}">Tháo</button>`;else{const W=g.length<h;q=`<button class="btn btn--sm ${W?"btn--blue":"btn--outline"} equip-btn" data-eq="1" data-sid="${L.id}" ${W?"":'title="Đã đầy ô kỹ năng!"'}>Trang Bị</button>`}const _={1:55,2:45,3:40,4:35,5:30,6:25,7:20},j=L.triggerChance||_[L.tier||1]||40,F=Math.floor((((A=r.stats)==null?void 0:A.dexterity)||10)/10),U=Math.max(0,(L.level||1)-1),V=r.activeStance==="breaker"?5:0,R=Math.min(85,Math.max(15,j+U+F+V));return`
      <div class="skill-card  ${L.equipped&&!O?"equipped":""}">
        <div class="skill-card-header">
          <div>
            <div class="skill-card-name" style="font-size: 14px;">${L.name}</div>
            <div class="skill-card-tier" style="color:${z}">${D} Tầng ${L.tier||1} • ${O?"Tâm Pháp":"Chiêu Thức"}</div>
          </div>
          <div class="skill-card-action">${q}</div>
        </div>
        <div class="skill-card-desc">${L.description||"Tuyệt kỹ thượng thừa tu chân giới."}</div>
        ${`
          <div class="skill-card-mastery">
            <div class="skill-mastery-label">
              <span>Thông thạo Lv.${L.level}</span>
              <span class="text-dim">${L.xp}/${E} XP</span>
            </div>
            <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${B}%"></div></div>
            ${L.masteryBonus?`<div class="skill-mastery-bonus">✨ ${L.masteryBonus}</div>`:""}
          </div>
        `}
        ${O?"":`
          <div class="skill-card-cost" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-top:8px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.06);">
            <span>🔵 ${L.cost||0} Linh Lực</span>
            <span style="color:#f59e0b; font-weight:700;" title="Xác suất xuất chiêu: Cơ bản ${j}% + Cấp (+${U}%) + Mẫn tiệp (+${F}%)${V?" + Thế phá quy (+5%)":""}">
              🎯 Xác suất xuất chiêu: ${R}%
            </span>
          </div>
        `}
      </div>
    `},k=()=>`
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
      <div>
        <h1 style="display: flex; align-items: center; gap: 10px;">
          <span>⚡ Tứ Đại Trụ Cột Kỹ Năng</span>
        </h1>
        <div class="text-dim text-sm">Hệ thống tu hành thực chiến: Chiêu thức tôi luyện, tâm pháp hào quang, bách thú đồ giám & đan đạo chế tác.</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn--sm ${a==="library"?"btn--gold":"btn--outline"}" id="btn-open-library">
          📚 Tàng Kinh Các
        </button>
        <button class="btn btn--sm ${a==="glitch"?"btn--purple":"btn--outline"}" id="btn-open-glitch">
          ${x?"🌌 Thiên Đạo Dị Biến":"🌫️ Kẽ Hở Quy Luật"}
        </button>
      </div>
    </div>

    <!-- 4 PILLARS SELECTOR -->
    <div class="pillar-tabs">
      ${Object.entries(c).map(([L,P])=>`
        <div class="pillar-tab ${a===L?"active":""}" data-pillar="${L}">
          <div class="pillar-icon">${P.icon}</div>
          <div class="pillar-info">
            <div class="pillar-name">${P.name}</div>
            <div class="pillar-sub">${P.sub}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `,w=()=>{var P;let L=v;return i==="equipped"&&(L=v.filter(E=>E.equipped)),i==="unequipped"&&(L=v.filter(E=>!E.equipped)),`
      <!-- LOADOUT SLOTS -->
      <div class="loadout-bar" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="font-weight: 700; color: var(--gold); font-size: 14px; display: flex; align-items: center; gap: 6px;">
            <span>⚔️ Ô Xuất Chiêu Thực Chiến:</span>
            <span style="color: #fff;">${g.length}/${h}</span>
          </div>
          <div class="text-dim text-xs" style="margin-top: 2px;">
            Cảnh giới hiện tại (${((P=r.realmInfo)==null?void 0:P.fullName)||"Phàm Cấp"}) cho phép trang bị tối đa <b>${h}</b> chiêu thức. Mỗi hiệp đấu sẽ tung xúc xắc theo <b>xác suất kích hoạt</b> và tiêu hao Linh Lực thực chiến.
          </div>
        </div>
        <div class="loadout-slots" style="display: flex; gap: 8px;">
          ${Array.from({length:h}).map((E,B)=>{const O=g[B];return O?`<div class="loadout-slot filled" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(59, 130, 246, 0.15); border: 1px solid var(--blue); border-radius: 6px; font-size: 18px; cursor: pointer;" title="${O.name} (Lv.${O.level})">⚔️</div>`:'<div class="loadout-slot" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; font-size: 14px; color: var(--text-dim);" title="Ô trống">➕</div>'}).join("")}
        </div>
      </div>

      <!-- FILTER TABS -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <button class="mastery-filter-btn ${i==="all"?"active":""}" data-sfilter="all">Tất Cả Chiêu Thức (${v.length})</button>
        <button class="mastery-filter-btn ${i==="equipped"?"active":""}" data-sfilter="equipped">Đã Trang Bị (${g.length})</button>
        <button class="mastery-filter-btn ${i==="unequipped"?"active":""}" data-sfilter="unequipped">Chưa Trang Bị (${v.length-g.length})</button>
      </div>

      <div class="skill-grid">
        ${L.length>0?L.map(E=>T(E)).join(""):'<div class="text-dim" style="padding: 20px;">Chưa có chiêu thức kích hoạt nào trong danh mục này. Hãy đến Tàng Kinh Các để thỉnh bí kíp!</div>'}
      </div>
    `},S=()=>{const L=r.auraConfigs||{ho_the_kim_chung:{id:"ho_the_kim_chung",name:"Hộ Thể Kim Chung",icon:"🛡️",reservationPct:20,desc:"Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp khi độ kiếp.",statBonuses:{defense:25,maxHp:100}},than_hanh_bo:{id:"than_hanh_bo",name:"Thần Hành Hào Quang",icon:"💨",reservationPct:15,desc:"Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.",statBonuses:{speed:20,dexterity:15}},hoa_diem_chan_khi:{id:"hoa_diem_chan_khi",name:"Hỏa Diễm Chân Khí",icon:"🔥",reservationPct:25,desc:"Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.",statBonuses:{strength:25,critChance:10}},toa_thien:{id:"toa_thien",name:"Toạ Thiền Tụ Khí",icon:"🧘",reservationPct:10,desc:"Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực (+5 HP & +2 TL / 10s).",statBonuses:{hpRegen:5,staminaRegen:2}}},P=r.activeAuras||[],E=r.reservedEnergy||0,B=r.usableEnergy??Math.max(0,r.maxEnergy-E),O=r.reservationPct||0,D=r.maxEnergy>0?Math.round(B/r.maxEnergy*100):100;return`
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
              Đã khóa: <b>${E}</b> LL (${O}% / 85% tối đa)
            </div>
          </div>
        </div>

        <!-- SPLIT RESERVATION BAR -->
        <div style="position: relative; height: 16px; background: rgba(0, 0, 0, 0.5); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; margin-bottom: 12px;">
          <div style="width: ${D}%; background: linear-gradient(90deg, #0284c7, #38bdf8); transition: width 0.4s ease;" title="Linh Lực Khả Dụng: ${B}"></div>
          <div style="width: ${O}%; background: linear-gradient(90deg, #d97706, #fbbf24); transition: width 0.4s ease;" title="Linh Lực Bị Khóa: ${E} (${O}%)"></div>
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
          <span class="text-dim text-xs font-normal">(${P.length}/${Object.keys(L).length} đang bật)</span>
        </div>

        <div class="skill-grid">
          ${Object.values(L).map(z=>{const q=P.includes(z.id),_=!q&&O+z.reservationPct>85;return`
              <div class="skill-card ${q?"equipped":""}" style="${q?"border-color: rgba(234, 179, 8, 0.6); box-shadow: 0 0 12px rgba(234, 179, 8, 0.15);":""}">
                <div class="skill-card-header">
                  <div>
                    <div class="skill-card-name" style="font-size: 14px; display: flex; align-items: center; gap: 6px;">
                      <span>${z.icon}</span>
                      <span>${z.name}</span>
                    </div>
                    <div class="skill-card-tier" style="color: #f59e0b;">Khóa ${z.reservationPct}% Linh Lực (${Math.floor(r.maxEnergy*(z.reservationPct/100))} LL)</div>
                  </div>
                  <div class="skill-card-action">
                    <button class="btn btn--sm ${q?"btn--gold":"btn--outline"} btn-toggle-aura" data-aura="${z.id}" ${_?'disabled title="Vượt quá 85% Linh Lực khóa tối đa!"':""}>
                      ${q?"✅ Đang Duy Trì":"🔘 Bật Hào Quang"}
                    </button>
                  </div>
                </div>
                <div class="skill-card-desc" style="margin-top: 6px;">${z.desc}</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                  ${Object.entries(z.statBonuses||{}).map(([j,F])=>`
                    <span class="req-tag" style="background: rgba(234, 179, 8, 0.12); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.2);">
                      +${F} ${j}
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
          <span class="text-dim text-xs font-normal">(${m.length} tâm pháp)</span>
        </div>

        ${m.length>0?`
          <div class="skill-grid">
            ${m.map(z=>T(z)).join("")}
          </div>
        `:`
          <div class="panel" style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 12px;">
            Chưa lĩnh ngộ tâm pháp bị động thường trực nào. Hãy đến Tàng Kinh Các để thỉnh giáo các bí kíp công pháp thượng thừa!
          </div>
        `}
      </div>
    `},C=()=>{if(!s)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `;const{totalKills:L,totalSpecies:P,tierCounts:E,monsters:B,tiers:O}=s,D=["all","Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh"],z=B.filter(q=>b==="all"?!0:(q.tierName||"").includes(b));return`
      <!-- BESTIARY HERO -->
      <div class="mastery-hero">
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${(L||0).toLocaleString()}</span>
          <span class="mastery-stat-label">Tổng Yêu Thú Đã Trảm</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${P||0}</span>
          <span class="mastery-stat-label">Loài Trong Giới Đồ</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #3b82f6;">${(E==null?void 0:E[1])||0}</span>
          <span class="mastery-stat-label">Chớm Ngộ (1★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #10b981;">${(E==null?void 0:E[2])||0}</span>
          <span class="mastery-stat-label">Thuần Thục (2★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #8b5cf6;">${(E==null?void 0:E[3])||0}</span>
          <span class="mastery-stat-label">Đại Thành (3★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #f59e0b;">${(E==null?void 0:E[4])||0}</span>
          <span class="mastery-stat-label">Khắc Chế (4★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #ef4444;">${(E==null?void 0:E[5])||0}</span>
          <span class="mastery-stat-label">Tuyệt Diệt (5★)</span>
        </div>
      </div>

      <!-- REALM FILTER -->
      <div class="mastery-filter-bar">
        <span class="text-dim text-xs" style="margin-right: 4px;">Cảnh Giới:</span>
        ${D.map(q=>`
          <button class="mastery-filter-btn ${b===q?"active":""}" data-mrealm="${q}">
            ${q==="all"?"Tất Cả":q}
          </button>
        `).join("")}
      </div>

      <!-- MONSTER CARDS GRID -->
      <div class="monster-grid">
        ${z.map(q=>{var V,R,A,W,X;const _=q.mastery||{},j=(_.tier||0)===0&&(_.kills||0)===0,F=_.isMaxTier,U=_.badgeColor||"#6b7280";return`
            <div class="monster-mastery-card ${j?"fog":""} ${_.tier===5?"apex":""}">
              <div>
                <div class="monster-card-top">
                  <div>
                    <div class="monster-card-name">
                      <span>${j?"🌫️":"🐺"}</span>
                      <span>${q.name}</span>
                    </div>
                    <div class="text-dim text-xs" style="margin-top: 2px;">
                      ${q.tierName||"Phàm Cấp"} • Ngũ Hành: <b>${q.element||"Vô"}</b>
                    </div>
                  </div>
                  <span class="monster-tier-tag" style="color: ${U}; border-color: ${U}">
                    ${_.tierName||"Vô Tri"}
                  </span>
                </div>

                <div class="monster-kills-row">
                  <span class="monster-stars-display" style="color: ${U}">${_.stars||"☆☆☆☆☆"}</span>
                  <span>Đã trảm: <b>${_.kills||0}</b> con</span>
                </div>

                <!-- PROGRESS BAR -->
                <div class="bar-track" style="height: 5px; margin-bottom: 8px;">
                  <div class="bar-fill" style="width: ${_.tierProgress||0}%; background: ${U}"></div>
                </div>
                ${F?`
                  <div class="text-xs" style="color: #ef4444; font-weight: 700; margin-bottom: 6px;">
                    👑 Đạt cảnh giới Tuyệt Diệt tối cao!
                  </div>
                `:`
                  <div class="text-dim text-xs" style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span>Tiến độ lên Tầng ${_.nextTier}</span>
                    <span>${_.kills}/${_.nextTierReq} kills</span>
                  </div>
                `}

                <!-- STATS PREVIEW (Revealed at Tier 1+) -->
                ${j?`
                  <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin: 8px 0;">
                    🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá thông tin sinh mệnh và thuộc tính!
                  </div>
                `:`
                  <div class="monster-stats-box">
                    <div class="monster-stat-cell">HP: <b>${((V=q.stats)==null?void 0:V.hp)??0}</b></div>
                    <div class="monster-stat-cell">Công: <b>${((R=q.stats)==null?void 0:R.strength)??0}</b></div>
                    <div class="monster-stat-cell">Thủ: <b>${((A=q.stats)==null?void 0:A.defense)??0}</b></div>
                    <div class="monster-stat-cell">Tốc: <b>${((W=q.stats)==null?void 0:W.speed)??0}</b></div>
                    <div class="monster-stat-cell">Thân: <b>${((X=q.stats)==null?void 0:X.dexterity)??0}</b></div>
                    <div class="monster-stat-cell">XP: <b>+${q.xpReward??0}</b></div>
                  </div>
                `}
              </div>

              <!-- ACTIVE BUFFS -->
              <div>
                ${_.tier>=2?`
                  <div class="monster-buff-active">
                    ✨ <b>Khắc chế đang kích hoạt:</b><br/>
                    ${_.desc}
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
    `},I=()=>{if(!y)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `;const{craftingLevel:L,craftingXp:P,xpToNext:E,progressPercent:B,title:O,badgeColor:D,perks:z,recipes:q}=y;return`
      <!-- HERO BANNER -->
      <div class="crafting-hero">
        <div class="crafting-hero-header">
          <div class="crafting-hero-title">
            <span>🔥</span>
            <span>Thông Thạo Đan Đạo & Chế Tác</span>
          </div>
          <span class="crafting-rank-badge" style="background: ${D};">
            ${O} (Lv.${L})
          </span>
        </div>

        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
          <span>Kinh Nghiệm Luyện Chế: <b>${P} / ${E} XP</b></span>
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
              <div class="crafting-perk-val">+${(z==null?void 0:z.successBonusPct)??0}% tỷ lệ luyện thành</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">✨</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Xác Suất Đại Thành</div>
              <div class="crafting-perk-val">${(z==null?void 0:z.critQualityChance)??0}% (Tinh / Cực / Thiên Phẩm)</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🛡️</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Bảo Toàn Dược Liệu</div>
              <div class="crafting-perk-val">Thu hồi ${(z==null?void 0:z.materialReturnRate)??0}% khi nổ lò</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🌟</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Thiên Phẩm Đan</div>
              <div class="crafting-perk-val">${z!=null&&z.canCraftDivine?"✅ Đã kích hoạt (+50% chỉ số)":"🔒 Yêu cầu Lv.76+"}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- RECIPES & CRAFTING SHORTCUT -->
      <div class="panel">
        <div class="panel-title" style="display: flex; justify-content: space-between; align-items: center;">
          <span>📜 Đan Phương & Công Thức Chế Tác (${(q==null?void 0:q.length)||0})</span>
        </div>
        <div class="panel-body">
          <div class="shop-items-grid">
            ${(q||[]).map(_=>{const j=_.materials||[],F=j.every(R=>{var A;return(((A=r.materials)==null?void 0:A[R.id])||0)>=R.amount}),U=(r.gold||0)>=(_.cost||0),V=F&&U;return`
                <div class="shop-item-card">
                  <div class="shop-item-header">
                    <div>
                      <div class="shop-item-name">${_.name}</div>
                      <div class="shop-item-rarity text-dim">Tầng ${_.tier||1} • Cơ bản ${_.successRate}%</div>
                    </div>
                    <span class="badge" style="background: rgba(208, 165, 48, 0.15); color: var(--gold);">
                      Tốn ${_.cost||0} 💰
                    </span>
                  </div>
                  <div class="shop-item-desc" style="margin-bottom: 8px;">
                    Dược liệu yêu cầu:<br/>
                    ${j.map(R=>{var X;const A=((X=r.materials)==null?void 0:X[R.id])||0;return`<span style="color: ${A>=R.amount?"var(--green)":"var(--red)"}; font-size: 11px;">• ${R.id} (${A}/${R.amount})</span>`}).join("<br/>")}
                  </div>
                  <div class="shop-item-footer">
                    <span class="text-xs text-dim">${_.craftTime?`Thời gian: ${_.craftTime}s`:"Lập tức"}</span>
                    <button class="btn btn--sm ${V?"btn--gold":"btn--outline"} btn-craft-action" data-rid="${_.id}" ${V?"":"disabled"}>
                      ${V?"🔥 Luyện Chế":"Thiếu Liệu"}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `},N=async()=>{if(a==="library"){n.innerHTML=`
        ${k()}
        <div id="library-container"></div>
      `,G();const L=n.querySelector("#library-container");L&&rt(L,t);return}if(a==="glitch"){n.innerHTML=`
        ${k()}
        <div id="glitch-container"></div>
      `,G();const L=n.querySelector("#glitch-container");L&&ht(L,t);return}if(n.innerHTML=`
      ${k()}
      <div id="pillar-content">
        ${a==="combat"?w():""}
        ${a==="auras"?S():""}
        ${a==="monsters"?C():""}
        ${a==="crafting"?I():""}
      </div>
    `,G(),M(),a==="monsters"&&!s)try{s=await o.getMonsterMastery(r.id);const L=n.querySelector("#pillar-content");L&&a==="monsters"&&(L.innerHTML=C(),M())}catch(L){p("Không thể tải Bách Thú Đồ Giám: "+L.message,"error")}if(a==="crafting"&&!y)try{y=await o.getCraftingMastery(r.id);const L=n.querySelector("#pillar-content");L&&a==="crafting"&&(L.innerHTML=I(),M())}catch(L){p("Không thể tải Thông Thạo Chế Tạo: "+L.message,"error")}},G=()=>{n.querySelectorAll(".pillar-tab").forEach(E=>{E.addEventListener("click",()=>{a=E.dataset.pillar,localStorage.setItem("activeSkillPillar",a),N()})});const L=n.querySelector("#btn-open-library");L&&L.addEventListener("click",()=>{a="library",localStorage.setItem("activeSkillPillar","library"),N()});const P=n.querySelector("#btn-open-glitch");P&&P.addEventListener("click",()=>{a="glitch",localStorage.setItem("activeSkillPillar","glitch"),N()})},M=()=>{n.querySelectorAll("[data-sfilter]").forEach(L=>{L.addEventListener("click",()=>{i=L.dataset.sfilter;const P=n.querySelector("#pillar-content");P&&a==="combat"&&(P.innerHTML=w(),M())})}),n.querySelectorAll(".btn-toggle-aura").forEach(L=>{L.addEventListener("click",async()=>{const P=L.dataset.aura;L.disabled=!0;try{const E=await o.toggleAura(r.id,P);E.player&&(e.player=E.player),p(E.message,E.success?"success":"warning"),typeof f=="function"&&f(),N()}catch(E){p(E.message||"Lỗi chuyển trạng thái Hào Quang","error"),L.disabled=!1}})}),n.querySelectorAll("[data-mrealm]").forEach(L=>{L.addEventListener("click",()=>{b=L.dataset.mrealm;const P=n.querySelector("#pillar-content");P&&a==="monsters"&&(P.innerHTML=C(),M())})}),n.querySelectorAll(".equip-btn").forEach(L=>{L.addEventListener("click",async()=>{try{const P=L.dataset.sid,E=L.dataset.eq==="1",B=await o.equipSkill(r.id,P,E);e.player=B.player,p(B.message,"success"),typeof f=="function"&&f(),N()}catch(P){p(P.message||"Lỗi trang bị pháp quyết","error")}})}),n.querySelectorAll(".btn-craft-action").forEach(L=>{L.addEventListener("click",async()=>{const P=L.dataset.rid;L.disabled=!0,L.innerText="Đang luyện...";try{const E=await o.craftItem(r.id,P);E.player&&(e.player=E.player),p(E.message,E.success?"success":"warning"),typeof f=="function"&&f(),y=await o.getCraftingMastery(r.id),N()}catch(E){p(E.message||"Lỗi luyện chế","error"),L.disabled=!1,L.innerText="🔥 Luyện Chế"}})})};N()}function Rt(n,t){return t==="manual"?"📜":n==="weapon"?"⚔️":n==="body"?"🥋":n==="shield"?"🛡️":n==="feet"?"👢":n==="ring"?"💍":"📦"}function lt(n,t){let e="",o="";if(n.slot==="weapon"){let u=0,x=0;(n.affixes||[]).forEach($=>{$.stat==="strength"&&$.type==="flat"&&(u+=$.value),$.stat==="dexterity"&&$.type==="flat"&&(x+=$.value)}),u===0&&(u=n.itemLevel*2+5),x===0&&(x=n.itemLevel+10),e=`⚔️ ${u}`,o=`🎯 ${x}`}else if(n.slot==="body"||n.slot==="shield"||n.slot==="feet"){let u=0;(n.affixes||[]).forEach(x=>{x.stat==="defense"&&x.type==="flat"&&(u+=x.value)}),u===0&&(u=n.itemLevel*3),e=`🛡️ ${u}`}else if(n.slot==="ring"){let u=0;(n.affixes||[]).forEach(x=>{x.stat==="capacity"&&(u+=x.value)}),e=u>0?`🎒 +${u}`:""}const p=(n.affixes||[]).map(u=>At(u)).map(u=>`<span class="badge badge-dim">${u}</span>`).join(" "),f=n.description||`Một vật phẩm loại ${n.slot} cấp ${n.itemLevel} thuộc phẩm chất ${n.rarity}. Khí tức tỏa ra không tồi.`,r=n.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${n.craftedBy}</strong></div>`:"",d=t?n.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${n.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${n.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${n.rarity}"></span>
          <span class="item-name rarity-${n.rarity}" style="font-size:14px">${n.name}</span>
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${e?`<span style="color:var(--text-light)">${e}</span>`:""}
          ${o?`<span style="color:var(--text-light)">${o}</span>`:""}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05)">
        <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
          ${Rt(n.slot,n.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${n.name}</strong> là loại ${n.baseType}. ${f}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${n.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${n.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${p||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${r}
          <div class="mt-2 flex justify-end">
            ${d}
          </div>
        </div>
      </div>
    </div>`}function At(n){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[n.stat]||n.stat,o=n.value>=0?"+":"";return n.type==="flat"?`${o}${n.value} ${e}`:n.type==="increase"?`${o}${n.value}% ${e}`:n.type==="more"?`×${o}${n.value}% ${e}`:`${o}${n.value} ${e}`}function at(n,t){var a,i,b,s,y,T,k;const{state:e,api:o,notify:p,renderGame:f}=t,r=Object.values(e.player.equipment||{}),d=e.player,u=e.medicines||[],x=d.medCooldownRemaining||0,$=e.inventoryTab||"equipped",h=d.skills&&d.skills.some(w=>{const S=typeof w=="string"?w:w.id;return S==="duoc_ly"||S==="y_thuat"}),l=r.find(w=>w.slot==="ring1"),v=r.find(w=>w.slot==="ring2");let m=20;((l==null?void 0:l.id)==="tui_tru_vat"||(a=l==null?void 0:l.baseType)!=null&&a.includes("tru_vat"))&&(m+=((b=(i=l.affixes)==null?void 0:i[0])==null?void 0:b.value)||10),((v==null?void 0:v.id)==="tui_tru_vat"||(s=v==null?void 0:v.baseType)!=null&&s.includes("tru_vat"))&&(m+=((T=(y=v.affixes)==null?void 0:y[0])==null?void 0:T.value)||10),n.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(d.inventory||[]).length} / ${m})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${$==="equipped"?"btn--blue":"btn--dark"}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${$==="weapon"?"btn--blue":"btn--dark"}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${$==="armor"?"btn--blue":"btn--dark"}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${$==="accessory"?"btn--blue":"btn--dark"}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${$==="manual"?"btn--blue":"btn--dark"}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${$==="medicine"?"btn--blue":"btn--dark"}" data-tab="medicine">
          Đan Dược ${x>0?`<span style="color:var(--orange); font-size:11px">(${x}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),c=()=>{g.querySelectorAll("[data-eid]").forEach(w=>{w.addEventListener("click",async S=>{S.stopPropagation();try{const C=await o.equipItem(e.playerId,w.dataset.eid);e.player=C.player,p(C.message,"success"),f()}catch(C){p(C.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(w=>{w.addEventListener("click",async S=>{S.stopPropagation();try{const C=await o.useItem(e.playerId,w.dataset.use);e.player=C.player,p(C.message,"success"),f()}catch(C){p(C.message||"Lỗi sử dụng","error")}})})};if($==="equipped"){const w=d.equipment||{},S=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${S.map(C=>{const I=w[C.key],N=I&&I.id,G=N?`rarity-${I.rarity}`:"";return`
            <div style="background:${N?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${N?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${C.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${C.name}</div>
              ${N?`<div style="font-size:11px;font-weight:600" class="${G}">${I.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${I.rarity}] Lv${I.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${r.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${r.filter(C=>C&&C.id).map(C=>lt(C,!1)).join("")}
      `:""}
    `,c()}else if($==="medicine")g.innerHTML=`
      <div style="padding:12px">
        ${x>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${x}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${x/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${u.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':u.map(w=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${w.icon||"💊"} ${w.name}</div>
                <div class="item-meta">
                  ${w.description}
                  ${w.healPercent?` · Phục hồi ${w.healPercent}% HP`:""}
                  ${w.cooldownAdd?` · Sinh Đan độc ${w.cooldownAdd}s`:""}
                  ${w.duration?` · Hiệu lực ${w.duration} trận`:""}
                  ${w.toxicity&&h?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${w.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${w.penalty&&h?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${w.penalty.map(S=>`Giảm ${Math.abs(S.value)*100}% ${S.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${w.id}" 
                ${x+(w.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(w=>{w.addEventListener("click",async()=>{try{const S=await o.useMedicine(e.playerId,w.dataset.med);e.player=S.player,p(S.message,"success"),f()}catch(S){p(S.message||"Đan độc quá nồng!","error")}})});else{const w=d.inventory||[];let S=[];$==="weapon"?S=w.filter(C=>C.slot==="weapon"&&C.category!=="manual"):$==="armor"?S=w.filter(C=>["body","shield","feet"].includes(C.slot)):$==="accessory"?S=w.filter(C=>["ring","amulet","ring1","ring2"].includes(C.slot)):$==="manual"&&(S=w.filter(C=>C.category==="manual")),g.innerHTML=`
      ${S.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':S.map(C=>lt(C,!0)).join("")}
    `,c()}n.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{e.inventoryTab=w.dataset.tab,at(n,t)})}),(k=document.getElementById("btnGen"))==null||k.addEventListener("click",async()=>{const w=["common","rare","epic","legendary"];try{const S=await o.generateItem(e.playerId,w[Math.floor(Math.random()*w.length)]);e.player=S.player,e.items=S.items||[],p(S.message,"success"),at(n,t)}catch{p("Lỗi tạo ngẫu nhiên","error")}})}function bt(n,t){const{state:e,api:o,notify:p,updateSidebar:f,renderGame:r}=t,d=e.playerId;e._dungeon||(e._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const u=e._dungeon;async function x(){try{const[c,a]=await Promise.all([o.getMapItems(d),o.getDungeonHistory(d)]);u.mapItems=c.mapItems||[],u.activeRun=c.activeRun||null,u.history=a.history||[],u.loaded=!0,$()}catch(c){p(c.message||"Lỗi tải Bí Cảnh","error")}}function $(){n.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${u.activeRun?h():l()}

      ${u.lastResult?v():""}

      ${m()}
    `,g()}function h(){var b,s;const c=u.activeRun,a=c.currentWave===c.totalWaves,i=((c.currentWave-1)/c.totalWaves*100).toFixed(0);return`
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
            <button class="btn btn--gold" id="btnFight" ${((b=e.player)==null?void 0:b.hospitalRemaining)>0?"disabled":""}>
              ${a?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+c.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((s=e.player)==null?void 0:s.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function l(){return u.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${u.mapItems.map(c=>{const a=c.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${c.item.icon} ${c.item.name} <span style="opacity:0.5">x${c.quantity}</span></div>
                  ${a?`
                    <div class="item-meta">
                      ${a.name} · T${a.tier} · ${a.waves+1} tầng · Boss: ${a.bossName}
                    </div>
                  `:""}
                </div>
                ${a?`<button class="btn btn--sm btn--gold" data-enter="${c.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function v(){var b,s;const c=u.lastResult,a=c.result==="dungeon_complete"?"🏆":c.result==="wave_cleared"?"✅":"💀",i=c.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${i}">
        <div class="panel-title" style="color:${i}">${a} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${c.message}</div>
          ${(b=c.loot)!=null&&b.length?`
            <div style="margin-bottom:8px">
              ${c.loot.map(y=>`<div style="font-size:12px;color:var(--green)">🎁 ${y}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((s=c.combatLog)==null?void 0:s.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(c.combatLog||[]).map(y=>`<div>${y}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function m(){return u.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${u.history.map(c=>{const a=c.status==="completed"?"✅":c.status==="failed"?"❌":c.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${c.status==="completed"?"var(--green)":c.status==="failed"?"var(--red)":"var(--orange)"}">${a} ${c.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${c.wave}/${c.totalWaves} · ${new Date(c.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function g(){var c,a;document.querySelectorAll("[data-enter]").forEach(i=>{i.addEventListener("click",async()=>{const b=i.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){i.disabled=!0;try{const s=await o.enterDungeon(d,b);p(s.message,"success"),e.player=s.player,f(),u.activeRun=s.run,u.lastResult=null,await x()}catch(s){p(s.message,"error"),i.disabled=!1}}})}),(c=document.getElementById("btnFight"))==null||c.addEventListener("click",async()=>{const i=document.getElementById("btnFight");i.disabled=!0,i.textContent="⏳ Đang chiến đấu...";try{const b=await o.fightDungeonWave(d);e.player=b.player,f(),u.lastResult=b,b.result==="dungeon_complete"||b.result==="dungeon_failed"?u.activeRun=null:b.result==="wave_cleared"&&(u.activeRun.currentWave=b.nextWave),$()}catch(b){p(b.message,"error"),i.disabled=!1,i.textContent="⚔️ Chiến Đấu"}}),(a=document.getElementById("btnAbandon"))==null||a.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await o.abandonDungeon(d),p("Đã rời khỏi Bí Cảnh.","info"),u.activeRun=null,u.lastResult=null,await x()}catch(i){p(i.message,"error")}})}u.loaded?$():x()}function yt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const d=e._tc;async function u(){try{d.data=await o.request(`/player/${r}/atlas-maps`),d.loaded=!0,x()}catch(g){p(g.message,"error")}}function x(){const g=d.data,c=(g==null?void 0:g.atlas)||{},a=(g==null?void 0:g.maps)||[],i=g==null?void 0:g.activeRun,b=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,n.innerHTML=`
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
        <button class="btn ${d.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${a.length})</button>
        ${i?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,n.querySelectorAll("[data-tab]").forEach(y=>{y.addEventListener("click",()=>{d.tab=y.dataset.tab,x()})});const s=document.getElementById("tcContent");s&&(i&&d.tab==="run"?v(s,i):d.tab==="inventory"?h(s,a):$(s,b,c))}function $(g,c,a){var b;const i=((b=d.data)==null?void 0:b.tiers)||[];g.innerHTML=i.map(s=>{const y=c.filter(T=>T.tier===s.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${s.tier} ${s.name} <span style="opacity:0.4;font-size:11px">(Realm ${s.requiredRealm}+, ${s.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${y.map(T=>{var S;const k=((S=a.progress)==null?void 0:S[T.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[T.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${k?700:400}">${T.name}</span>
                ${k?`<span style="color:var(--green);font-size:11px">✅ ×${k}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function h(g,c,a){if(c.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=c.map((i,b)=>{const s=i.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${m(i.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${i.mapName||i.mapId} <span style="color:${m(i.tier)};font-size:12px">T${i.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${s.length>0?s.map(y=>y.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${s.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${b}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${b}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(i=>{i.addEventListener("click",async()=>{try{const b=await o.request(`/player/${r}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(i.dataset.idx)})});p(b.message,"success"),e.player=b.player,f(),d.tab="run",await u()}catch(b){p(b.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(i=>{i.addEventListener("click",()=>l(parseInt(i.dataset.idx)))})}function l(g){var i;const c=((i=d.data)==null?void 0:i.modifiers)||[],a=document.createElement("div");a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",a.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${c.map(b=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${b.id}">
          <span style="flex:1"><strong>${b.name}</strong><br><span style="font-size:11px;opacity:0.6">${b.desc} · IIQ +${b.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,a.addEventListener("click",async b=>{const s=b.target.closest("[data-modid]");if(s)try{const y=await o.request(`/player/${r}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:s.dataset.modid})});p(y.message,"success"),e.player=y.player,f(),a.remove(),await u()}catch(y){p(y.message,"error")}else b.target===a&&a.remove()}),document.body.appendChild(a)}function v(g,c){var b,s;const a=c.currentWave/c.totalWaves*100,i=c.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${c.mapName} <span style="color:${m(c.tier)}">T${c.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${c.currentWave}/${c.totalWaves}
            ${i.length>0?" · "+i.map(y=>y.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${a}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${d.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(b=document.getElementById("btnTCFight"))==null||b.addEventListener("click",async()=>{d.fighting=!0,x();try{const y=await o.request(`/player/${r}/atlas-maps/fight`,{method:"POST"});e.player=y.player,f();const T=y.result!=="map_failed";p(y.message,T?"success":"error"),d.fighting=!1,(y.result==="map_complete"||y.result==="map_failed")&&(d.tab="atlas"),await u()}catch(y){p(y.message,"error"),d.fighting=!1,x()}}),(s=document.getElementById("btnTCQuit"))==null||s.addEventListener("click",async()=>{try{await o.request(`/player/${r}/atlas-maps/abandon`,{method:"POST"}),p("Đã rời Tiên Cảnh","info"),d.tab="atlas",await u()}catch(y){p(y.message,"error")}})}function m(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}d.loaded?x():u()}function xt(n,t){const{state:e}=t,o=e._travelTab||"map";n.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Ngao Du Bát Hoang</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên, chinh phục bí cảnh và tầm bảo tiên cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${o==="map"?"active":""}" data-tab="map" style="flex:1;padding:10px;border:none;background:${o==="map"?"rgba(255,255,255,0.08)":"transparent"};color:${o==="map"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${o==="map"?"700":"400"};border-bottom:2px solid ${o==="map"?"var(--gold)":"transparent"};transition:all 0.2s">
        🗺️ Bản Đồ Bát Hoang
      </button>
      <button class="tab-btn ${o==="dungeon"?"active":""}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${o==="dungeon"?"rgba(255,255,255,0.08)":"transparent"};color:${o==="dungeon"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${o==="dungeon"?"700":"400"};border-bottom:2px solid ${o==="dungeon"?"var(--gold)":"transparent"};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
      <button class="tab-btn ${o==="tiencanh"?"active":""}" data-tab="tiencanh" style="flex:1;padding:10px;border:none;background:${o==="tiencanh"?"rgba(255,255,255,0.08)":"transparent"};color:${o==="tiencanh"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${o==="tiencanh"?"700":"400"};border-bottom:2px solid ${o==="tiencanh"?"var(--gold)":"transparent"};transition:all 0.2s">
        🌌 Tiên Cảnh (Atlas)
      </button>
    </div>
    <div id="travelTabContent"></div>
  `,n.querySelectorAll(".tab-btn").forEach(f=>{f.addEventListener("click",()=>{e._travelTab=f.dataset.tab,xt(n,t)})});const p=n.querySelector("#travelTabContent");o==="map"?Y(p,t):o==="dungeon"?bt(p,t):yt(p,t)}async function Y(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t;n.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[r,d]=await Promise.all([o.request("/data/areas"),o.request(`/player/${e.playerId}/area`)]),u=r.areas||[],x=d.area,$=d.player,h=d.traveling||!1,l=d.travelRemaining||0,v=d.travelDestination||"";d.message&&p(d.message,"success"),d.player&&(e.player=d.player,f());const m=e.exploration||{},g=m[($==null?void 0:$.currentArea)||"thanh_lam_tran"],c=(x==null?void 0:x.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",a=(g==null?void 0:g.staminaCost)||10,i={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận",cuu_u_than_uyen:"👿 Cửu U ma khí: +35% ST, +20% Tốc Độ",thai_co_hong_hoang:"🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp",chu_thien_tinh_hai:"🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn",hon_don_tien_vuc:"🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số",hon_nguyen_dao_canh:"👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính"},b=i[$==null?void 0:$.currentArea]||"",s=[...u].sort((y,T)=>(y.sort_order||y.mapY||0)-(T.sort_order||T.mapY||0));if(n.innerHTML=`
      ${h?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${v}</span></strong>
            <div id="travelTimer" style="font-size:26px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 12px rgba(255,215,0,0.4)">⏳ ${l}s</div>
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
                <div class="text-gold bold">-${a} TL/lần</div>
              </div>
            </div>
            ${x!=null&&x.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${x.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${(x==null?void 0:x.min_level)||1}+</span>
              ${b?`<span class="badge" style="background:rgba(255,215,0,0.1);color:var(--gold);border:1px solid rgba(255,215,0,0.25);font-size:11px">${b}</span>`:""}
            </div>
          </div>
        </div>
      `}

      <!-- 2D REALM MAP OVERVIEW -->
      <div class="panel">
        <div class="panel-title flex items-center justify-between">
          <span>🗺️ Thiên Địa Giới Đồ (2D Bát Hoang Tinh Đồ)</span>
          <span class="text-xs text-dim">${s.length} Khu vực</span>
        </div>
        <div class="panel-body" style="background:linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(10,15,28,0.95) 100%); padding:12px">
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px">
            ${s.map((y,T)=>{const k=m[y.id],w=y.id===$.currentArea&&!h,S=$.level<(y.min_level||1),C=parseInt(y.travel_time)||0,I=parseInt(y.stamina_cost)||(k==null?void 0:k.staminaCost)||10,N=i[y.id]||"",G=y.tier||"Bát Hoang",M=I>=100?"rgba(239,68,68,0.2)":I>=40?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)",L=I>=100?"var(--red)":I>=40?"var(--gold)":"var(--text-dim)";let P="rgba(255,255,255,0.08)",E="rgba(255,255,255,0.03)";return w?(P="rgba(34, 197, 94, 0.6)",E="rgba(34, 197, 94, 0.08)"):S&&(P="rgba(239, 68, 68, 0.2)",E="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${w?"current-realm":""} ${S?"locked-realm":""}" 
                     style="border:1px solid ${P}; background:${E}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${w?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${w?"var(--green)":S?"var(--text-dim)":"var(--text-bright)"}">
                        #${T+1} ${y.name}
                      </div>
                      ${S?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      🏛️ ${G}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${y.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${S?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${S?"var(--red)":"var(--text-dim)"}">
                        Lv.${y.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${C>0?`⏱ ${C}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${M}; color:${L}; border:1px solid ${M}">
                        🏃 -${I} TL (Dò thám)
                      </span>
                    </div>

                    ${N?`
                      <div style="font-size:10px; color:var(--gold); background:rgba(255,215,0,0.05); padding:3px 6px; border-radius:4px; margin-bottom:10px; border-left:2px solid var(--gold)">
                        ${N}
                      </div>
                    `:""}
                  </div>

                  <div style="margin-top:auto">
                    ${w?`
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(34,197,94,0.2); color:var(--green); border:1px solid rgba(34,197,94,0.4)">
                        📍 Đang tọa trấn
                      </button>
                    `:S?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${y.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${y.id}" ${h?"disabled":""}>
                        ${C>0?`🚶 Vi Hành (${C}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll("[data-travel]").forEach(y=>{y.addEventListener("click",async T=>{T.stopPropagation();const k=y.dataset.travel;n.querySelectorAll("[data-travel]").forEach(w=>{w.tagName==="BUTTON"&&(w.disabled=!0),w.style.pointerEvents="none"});try{const w=await o.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:k})});w.player&&(e.player=w.player,f()),p(w.message,"success"),Y(n,t)}catch(w){p(w.message||"Lỗi di chuyển!","error"),Y(n,t)}})}),h&&l>0){let y=l;const T=l,k=setInterval(async()=>{y--;const w=document.getElementById("travelTimer"),S=document.getElementById("travelBar");if(w&&(w.textContent=`⏳ ${Math.max(0,y)}s`),S&&(S.style.width=`${Math.max(0,y/T*100)}%`),y<=0){clearInterval(k);try{const C=await o.request(`/player/${e.playerId}/travel-check`,{method:"POST"});C.player&&(e.player=C.player,f()),C.arrived&&p(C.message,"success"),Y(n,t)}catch{Y(n,t)}}},1e3)}}catch(r){n.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(r)}}function it(n,t){var i,b;const{state:e,renderGame:o,notify:p,updateSidebar:f}=t,r=e.player,d=e.recipes||[],u=e.medicines||[],x=e._alchemyTab||"recipes",$=s=>{const y=u.find(T=>T.id===s);return y?(y.icon||"💊")+" "+y.name:s};let h=0,l=0,v=0,m=0;(r.skills||[]).forEach(s=>{const y=typeof s=="string"?s:s.id,T=typeof s=="string"?1:s.level||1;y==="tinh_che"&&(h=T*2),y==="phu_an_thuat"&&(l=T*5),y==="linh_kiem_thuat"&&(v=T*10),y==="cuong_hoa_thuat"&&(m=T*15)});const g=s=>s.split("_").map(y=>y.charAt(0).toUpperCase()+y.slice(1)).join(" "),c=[];Object.values(r.equipment||{}).forEach(s=>{s&&c.push({...s,loc:"eq"})}),(r.inventory||[]).filter(s=>s.slot&&s.slot!=="consumable").forEach(s=>c.push({...s,loc:"inv"}));let a=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${x==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${x==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${h||l||v||m?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${h?`<span>🔥 Thành công +${h}%</span>`:""}
      ${l?`<span>💎 Giảm phí -${l}%</span>`:""}
      ${v?`<span>✨ Chất lượng +${v}%</span>`:""}
      ${m?`<span>⬆️ Nâng đôi ${m}%</span>`:""}
    </div>
    `:""}
  `;if(x==="recipes"){if(a+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!r.materials||Object.keys(r.materials).length===0)a+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[s,y]of Object.entries(r.materials))a+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(s)} <span style="color:var(--gold)">x${y}</span></div>`;a+="</div></div>",a+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',d.length===0?a+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':d.forEach(s=>{var C;const y=$(s.target),T=Math.min(100,(s.successRate||100)+h);let k="";(C=s.requirements)!=null&&C.skill&&(k=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(s.requirements.skill)} lv${s.requirements.level||1}</div>`);let w="";s.materials.forEach(I=>{var G;const N=((G=r.materials)==null?void 0:G[I.id])||0;w+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${N>=I.amount?"var(--green)":"var(--red)"};font-weight:bold">${N}/${I.amount}</span> ${g(I.id)}</span>`});const S=u.find(I=>I.id===s.target)||{};a+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${y}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${s.tier}</span>
                  <span>Tỉ lệ: <span style="color:${T>=80?"var(--green)":"var(--blue)"};font-weight:bold">${T}%</span></span>
                  <span>🔥 Phí: ${s.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${k}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${w}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${S.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${s.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),a+="</div></div>"}else a+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${c.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${c.map(s=>`<option value="${s.id}">${s.loc==="eq"?"🔸":"📦"} ${s.name||s.baseType} [${s.rarity||"?"}] ${(s.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(s=>{const y=Math.max(1,Math.round(s.cost*(1-l/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${s.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${s.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${s.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${s.id}" style="width:100%">
                💎 ${y} ${l>0?`<s style="opacity:0.4;font-size:10px">${s.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;n.innerHTML=a,n.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{e._alchemyTab=s.dataset.tab,it(n,t)})}),n.querySelectorAll(".accordion-header").forEach(s=>{s.addEventListener("click",()=>{const y=s.nextElementSibling;y.style.display==="none"?(y.style.display="block",s.querySelector(".text-dim:last-child").textContent="▲"):(y.style.display="none",s.querySelector(".text-dim:last-child").textContent="▼")})}),n.querySelectorAll(".btn-craft").forEach(s=>{s.addEventListener("click",async y=>{y.stopPropagation();const T=d.find(k=>k.id===s.dataset.recipe);if(T&&r.gold<(T.cost||0))return p("Không đủ linh thạch!","error");try{const k=await K.craftItem(r.id,s.dataset.recipe);e.player=k.player,p(k.message,k.success?"success":"error"),o()}catch(k){p(k.message,"error")}})}),n.querySelectorAll(".btn-currency").forEach(s=>{s.addEventListener("click",async()=>{const y=document.getElementById("selItem");if(!(y!=null&&y.value))return p("Chọn trang bị trước!","error");const T=s.dataset.cid;let k=-1;if(T==="thien_menh_phu"){const w=c.find(I=>I.id===y.value),S=(w==null?void 0:w.affixes)||[];if(S.length===0)return p("Item không có affix để khóa!","error");const C=prompt(`Chọn affix để khóa (0-${S.length-1}):
${S.map((I,N)=>`${N}: ${I.name||I.stat} +${I.value}`).join(`
`)}`);if(C===null)return;if(k=parseInt(C),isNaN(k)||k<0||k>=S.length)return p("Chỉ số không hợp lệ!","error")}s.disabled=!0,s.textContent="⏳...";try{const w=await K.applyCurrency(r.id,T,y.value,k);p(w.message,"success"),e.player=w.player,f(),it(n,t)}catch(w){p(w.message,"error"),s.disabled=!1,s.textContent="💎 Dùng"}})}),(i=document.getElementById("selItem"))==null||i.addEventListener("change",()=>{const s=c.find(T=>T.id===document.getElementById("selItem").value),y=document.getElementById("itemPreview");s&&y&&(y.innerHTML=(s.affixes||[]).map(T=>`<span style="color:var(--blue)">• ${T.name||T.stat} +${T.value}</span>`).join(" | ")||"Không có affix")}),(b=document.getElementById("selItem"))==null||b.dispatchEvent(new Event("change"))}function ft(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;async function d(){try{const x=await o.getDailyQuests(r);e._dailyQuests=x,u()}catch(x){p(x.message,"error")}}function u(){const x=e._dailyQuests||{},$=x.quests||[];x.allCompleted;const h=x.bonusReward;n.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${$.map(l=>{const v=l.quest_info||{},m=l.target>0?Math.min(100,Math.round(l.progress/l.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${l.claimed?"var(--text-dim)":l.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${v.name||l.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${v.difficulty==="Khó"?"var(--red)":v.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${v.difficulty||"?"}</span>
              </div>
              ${l.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':l.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${l.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${l.progress}/${l.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${v.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${m}%;background:${l.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${v.goldReward||0} · ✨ ${v.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${h?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${h.gold} 💎, +${h.xp} EXP</div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-claim").forEach(l=>l.addEventListener("click",async()=>{try{const v=await o.claimDailyQuest(r,parseInt(l.dataset.qid));p(v.message,"success"),e.player=v.player,f(),await d()}catch(v){p(v.message,"error")}}))}d()}function $t(n,t){const{state:e,api:o,notify:p,renderGame:f}=t,r=e._questTab||"npc";n.innerHTML=`
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
  `,n.querySelectorAll("[data-qtab]").forEach(x=>{x.addEventListener("click",()=>{e._questTab=x.dataset.qtab,$t(n,t)})});const d=n.querySelector("#questTabContent");if(r==="daily"){ft(d,t);return}u();async function u(){try{const $=(await o.getQuests(e.playerId)).quests||[],h=document.getElementById("questList");if(!h)return;if($.length===0){h.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}h.innerHTML=$.map(l=>{const v=l.questAmount>0?Math.min(100,l.progress/l.questAmount*100):0,m=l.progress>=l.questAmount,g=l.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${m?"quest-done":""}" data-quest-id="${l.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${l.npcIcon||"🧓"} ${l.npcName||"NPC"}</span>
              <span class="quest-type">${g} ${l.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${l.questName||l.quest_id}</div>
            <div class="quest-desc">${l.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${m?"hp":"energy"}" style="width:${v}%"></div>
              </div>
              <span class="quest-progress-text">${l.progress}/${l.questAmount}</span>
            </div>
            ${m?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${l.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),h.querySelectorAll(".quest-complete-btn").forEach(l=>{l.addEventListener("click",async()=>{const v=l.dataset.qid;l.disabled=!0,l.textContent="⏳...";try{const m=await o.completeQuest(e.playerId,v);e.player=m.player,p(m.message,"success"),m.skillGained&&p(`🎯 Lĩnh ngộ: ${m.skillGained}!`,"success"),f()}catch(m){p(m.message||"Lỗi trả quest","error"),l.disabled=!1,l.textContent="✅ Trả Nhiệm Vụ"}})})}catch(x){console.error("Error loading quests:",x);const $=document.getElementById("questList");$&&($.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function Ot(n,t){const{state:e,api:o,notify:p,renderGame:f}=t;if(e.player.role!=="admin"){n.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const r=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let d="monsters";n.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${r.map(a=>`
          <button class="admin-tab ${a.id===d?"active":""}" data-tab="${a.id}">${a.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",a=>{const i=a.target.closest(".admin-tab");i&&(d=i.dataset.tab,document.querySelectorAll(".admin-tab").forEach(b=>b.classList.remove("active")),i.classList.add("active"),u(d))}),u(d);async function u(a){const i=document.getElementById("adminContent");if(i){i.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const b=await o.request(`/admin/${a}?adminId=${e.playerId}`);x(a,b,i)}catch(b){i.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${b.message}</div></div>`}}}function x(a,i,b){a==="monsters"?$(i,b):a==="npcs"?h(i,b):a==="areas"?l(i,b):v(a,i,b)}function $(a,i){const b=a.monsters||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${b.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${b.map(s=>{var y,T,k,w,S,C,I,N;return`
          <div class="admin-card" data-id="${s.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${s.name} ${s.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((T=(y=a.tierInfo)==null?void 0:y[s.tier])==null?void 0:T.color)||"#888"}">${((w=(k=a.tierInfo)==null?void 0:k[s.tier])==null?void 0:w.name)||"T"+s.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((S=s.stats)==null?void 0:S.hp)||"?"}</div>
              <div>💪 ${((C=s.stats)==null?void 0:C.strength)||"?"}</div>
              <div>🏃 ${((I=s.stats)==null?void 0:I.speed)||"?"}</div>
              <div>🛡 ${((N=s.stats)==null?void 0:N.defense)||"?"}</div>
            </div>
            <div class="admin-card-meta">
              <span>XP: ${s.xpReward||0}</span>
              <span>Gold: ${Array.isArray(s.goldReward)?s.goldReward.join("-"):s.goldReward}</span>
              ${s.areaId?`<span>📍 ${s.areaId}</span>`:""}
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${s.id}" data-type="monsters" data-key="monsters">✏️ Sửa</button>
          </div>
        `}).join("")}
      </div>
    `,g(i,a,"monsters","monsters")}function h(a,i){const b=a.npcs||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${b.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${b.map(s=>`
          <div class="admin-card" data-id="${s.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${s.icon||"🧓"} ${s.name}</span>
              <span class="badge" style="background:var(--purple)">${s.profession}</span>
            </div>
            <div class="admin-card-meta">
              <span>Quests: ${(s.quests||[]).length}</span>
              <span>Areas: ${(s.areaIds||[]).join(", ")}</span>
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${s.id}" data-type="npcs" data-key="npcs">✏️ Sửa</button>
          </div>
        `).join("")}
      </div>
    `,g(i,a,"npcs","npcs")}function l(a,i){const b=Object.keys(a);i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${b.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${b.map(s=>{const y=a[s];return`
            <div class="admin-card" data-id="${s}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${y.name||s}</span>
                <span class="badge" style="background:var(--orange)">⚡${y.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(y.events||[]).map(T=>`<span>${T.type}: ${T.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${s}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,i.querySelectorAll(".admin-edit-area").forEach(s=>{s.addEventListener("click",()=>{const y=s.dataset.id,T=a[y];m(y,T,`areas/${y}`)})})}function v(a,i,b){var T;const s=JSON.stringify(i,null,2),y=s.split(`
`).length;b.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${a} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(y+5,30)}">${c(s)}</textarea>
    `,(T=document.getElementById("btnSaveGeneric"))==null||T.addEventListener("click",async()=>{try{const k=document.getElementById("genericEditor").value,w=JSON.parse(k);p("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(k){p("JSON không hợp lệ: "+k.message,"error")}})}function m(a,i,b,s){const y=JSON.stringify(i,null,2),T=document.createElement("div");T.className="admin-modal-overlay",T.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${a}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${c(y)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(T),T.querySelectorAll(".admin-modal-close").forEach(k=>{k.addEventListener("click",()=>T.remove())}),T.addEventListener("click",k=>{k.target===T&&T.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const k=document.getElementById("modalEditor").value,w=JSON.parse(k);await o.request(`/admin/${b}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:w})}),p("✅ Đã lưu!","success"),T.remove(),u(d)}catch(k){p("Lỗi: "+k.message,"error")}})}function g(a,i,b,s){a.querySelectorAll(".admin-edit-btn").forEach(y=>{y.addEventListener("click",()=>{const T=y.dataset.id,w=(i[s]||[]).find(S=>S.id===T);w&&m(T,w,`${b}/${T}`)})})}function c(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function Tt(n,t){const{state:e,api:o,notify:p,renderGame:f,updateSidebar:r}=t,d=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const u=e._social;async function x(){try{const g=await o.getRelationships(d);u.relationships=g,u.loaded=!0,$()}catch(g){p(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function $(){const{friends:g,enemies:c,pendingSent:a,pendingReceived:i}=u.relationships,b=i.length;n.innerHTML=`
      <div class="page-header">
        <h2>🤝 Đạo Hữu</h2>
        <p class="page-sub">Kết bạn bè, đánh dấu kẻ thù, giao lưu giang hồ</p>
      </div>

      <!-- Search -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="socialSearch" placeholder="Tìm người chơi theo tên..." 
                 value="${u.searchQuery}" 
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSearch">🔍 Tìm</button>
        </div>
        ${u.searchResults.length>0?`
          <div style="margin-top:12px">
            ${u.searchResults.map(s=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${s.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${s.level} · ${s.realm} · ${s.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${s.id!==d?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${s.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${s.id}">⚔️ Kẻ Thù</button>
                  `:'<span style="opacity:0.4;font-size:12px">Bạn</span>'}
                </div>
              </div>
            `).join("")}
          </div>
        `:u.searchQuery?'<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>':""}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${u.tab==="friends"?"btn--blue":"btn--dark"}" data-tab="friends">
          🤝 Đạo Hữu (${g.length})
        </button>
        <button class="btn btn--sm ${u.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${c.length})
        </button>
        <button class="btn btn--sm ${u.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${b>0?`<span class="badge">${b}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${u.tab==="friends"?h(g):""}
        ${u.tab==="enemies"?l(c):""}
        ${u.tab==="pending"?v(i,a):""}
      </div>
    `,m()}function h(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(c=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${c.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${c.level} · ${c.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${c.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${c.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function l(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(c=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${c.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${c.level} · ${c.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${c.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${c.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function v(g,c){let a="";return g.length>0&&(a+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',a+=g.map(i=>`
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
      `).join("")),c.length>0&&(a+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',a+=c.map(i=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${i.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${i.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&c.length===0&&(a='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),a}function m(){var g,c;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var i;const a=(i=document.getElementById("socialSearch"))==null?void 0:i.value.trim();if(!a||a.length<2)return p("Cần ít nhất 2 ký tự","error");u.searchQuery=a;try{const b=await o.searchPlayers(a);u.searchResults=b.players||[],$()}catch(b){p(b.message,"error")}}),(c=document.getElementById("socialSearch"))==null||c.addEventListener("keydown",a=>{var i;a.key==="Enter"&&((i=document.getElementById("btnSearch"))==null||i.click())}),document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{u.tab=a.dataset.tab,$()})}),document.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.action,b=a.dataset.target;a.disabled=!0;try{let s;switch(i){case"add-friend":s=await o.addFriend(d,b);break;case"accept-friend":s=await o.acceptFriend(d,b);break;case"reject-friend":s=await o.rejectFriend(d,b);break;case"remove-friend":s=await o.removeFriend(d,b);break;case"add-enemy":s=await o.addEnemy(d,b);break;case"remove-enemy":s=await o.removeEnemy(d,b);break}p(s.message||"Thành công!","success"),await x()}catch(s){p(s.message||"Lỗi!","error"),a.disabled=!1}})})}u.loaded?$():x()}function kt(n,t){const{state:e,api:o,notify:p}=t,f=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const r=e._chat;async function d(){try{const[c,a]=await Promise.all([o.getGlobalChat(),o.getChatFriends(f)]);r.globalMessages=c.messages||[],r.friends=a.friends||[],r.globalMessages.length>0&&(r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id),r.loaded=!0,$(),u()}catch(c){p(c.message||"Lỗi tải chat","error")}}function u(){x(),r.pollTimer=setInterval(async()=>{try{if(r.tab==="global"){const c=await o.getGlobalChat(r.lastGlobalId);c.messages&&c.messages.length>0&&(r.globalMessages.push(...c.messages),r.globalMessages.length>100&&(r.globalMessages=r.globalMessages.slice(-100)),r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id,l(),v())}else if(r.tab==="private"&&r.selectedFriend){const c=await o.getPrivateChat(f,r.selectedFriend.id,r.lastPrivateId);c.messages&&c.messages.length>0&&(r.privateMessages.push(...c.messages),r.privateMessages.length>100&&(r.privateMessages=r.privateMessages.slice(-100)),r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id,l(),v())}}catch{}},5e3)}function x(){r.pollTimer&&(clearInterval(r.pollTimer),r.pollTimer=null)}function $(){const c=r.tab==="global"?r.globalMessages:r.privateMessages;n.innerHTML=`
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
            ${r.friends.map(a=>{var i;return`<option value="${a.id}" ${((i=r.selectedFriend)==null?void 0:i.id)===a.id?"selected":""}>${a.name} (Lv.${a.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${h(c)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${r.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),v()}function h(c){return c.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':c.map(a=>{const i=a.sender_id===f,b=new Date(a.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${i?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${b}</span>
          <span style="font-weight:600;color:${i?"var(--blue)":"var(--gold)"}"> ${a.sender_name}</span>
          <span style="opacity:0.8">: ${m(a.message)}</span>
        </div>
      `}).join("")}function l(){const c=document.getElementById("chatMessages");if(!c)return;const a=r.tab==="global"?r.globalMessages:r.privateMessages;c.innerHTML=h(a)}function v(){const c=document.getElementById("chatMessages");c&&(c.scrollTop=c.scrollHeight)}function m(c){const a=document.createElement("div");return a.textContent=c,a.innerHTML}function g(){var a,i,b;document.querySelectorAll("[data-chat-tab]").forEach(s=>{s.addEventListener("click",()=>{r.tab=s.dataset.chatTab,r.tab==="global"&&(r.lastGlobalId=r.globalMessages.length>0?r.globalMessages[r.globalMessages.length-1].id:0),$(),u()})}),(a=document.getElementById("friendSelect"))==null||a.addEventListener("change",async s=>{const y=s.target.value;if(!y){r.selectedFriend=null,r.privateMessages=[],$();return}r.selectedFriend=r.friends.find(T=>T.id===y)||null,r.lastPrivateId=0;try{const T=await o.getPrivateChat(f,y);r.privateMessages=T.messages||[],r.privateMessages.length>0&&(r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id),l(),v()}catch(T){p(T.message,"error")}});const c=async()=>{var T,k;const s=document.getElementById("chatInput"),y=s==null?void 0:s.value.trim();if(y){if(r.tab==="private"&&!r.selectedFriend)return p("Chọn Đạo Hữu trước!","error");try{if(await o.sendChat(f,r.tab,r.tab==="private"?r.selectedFriend.id:null,y),s.value="",r.tab==="global"){const w=await o.getGlobalChat(r.lastGlobalId);((T=w.messages)==null?void 0:T.length)>0&&(r.globalMessages.push(...w.messages),r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id)}else{const w=await o.getPrivateChat(f,r.selectedFriend.id,r.lastPrivateId);((k=w.messages)==null?void 0:k.length)>0&&(r.privateMessages.push(...w.messages),r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id)}l(),v()}catch(w){p(w.message||"Lỗi gửi tin nhắn","error")}}};(i=document.getElementById("btnSend"))==null||i.addEventListener("click",c),(b=document.getElementById("chatInput"))==null||b.addEventListener("keydown",s=>{s.key==="Enter"&&c()})}t.renderGame,r.loaded?($(),u()):d()}function wt(n,t){const{state:e,api:o,notify:p,updateSidebar:f,renderGame:r}=t,d=e.playerId,u=e._auctionTab||"browse";async function x(){try{const[l,v]=await Promise.all([o.getAuctions(),o.getMyAuctions(d)]);e._auctionListings=l.listings||[],e._auctionMine=v.listings||[],$()}catch(l){p(l.message,"error")}}function $(){const l=e._auctionListings||[],v=e._auctionMine||[],m=(e.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${u==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${u==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${u==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${v.length})</button>
      </div>

      ${u==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${l.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':l.map(g=>{const c=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${c.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${c.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${g.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${g.id}">💎 ${g.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:u==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${m.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${m.map(g=>`<option value="${g.id}">${g.name} [${g.rarity}]</option>`).join("")}
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
          ${v.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':v.map(g=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(g.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${g.status==="active"?"var(--green)":g.status==="sold"?"var(--gold)":"var(--red)"}">${g.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${g.buyout_price}</div>
                </div>
                ${g.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${g.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,h()}function h(){var l;n.querySelectorAll(".tab-btn").forEach(v=>v.addEventListener("click",()=>{e._auctionTab=v.dataset.tab,x()})),n.querySelectorAll(".btn-buy").forEach(v=>v.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const m=await o.buyAuction(d,parseInt(v.dataset.lid));p(m.message,"success"),e.player=m.player,f(),await x()}catch(m){p(m.message,"error")}})),n.querySelectorAll(".btn-cancel").forEach(v=>v.addEventListener("click",async()=>{try{const m=await o.cancelAuction(d,parseInt(v.dataset.lid));p(m.message,"success"),e.player=m.player,f(),await x()}catch(m){p(m.message,"error")}})),(l=document.getElementById("btnListItem"))==null||l.addEventListener("click",async()=>{var c,a,i;const v=(c=document.getElementById("selSellItem"))==null?void 0:c.value,m=parseInt(((a=document.getElementById("inpPrice"))==null?void 0:a.value)||"500"),g=parseInt(((i=document.getElementById("selDuration"))==null?void 0:i.value)||"24");try{const b=await o.listAuction(d,v,m,g);p(b.message,"success"),e.player=b.player,f(),e._auctionTab="mine",await x()}catch(b){p(b.message,"error")}})}x()}function Gt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const d=e._market;async function u(){try{const[c,a]=await Promise.all([o.getMarketListings(d.filter,d.sort),o.getMyListings(r)]);d.listings=c.listings||[],d.myListings=a.listings||[],d.loaded=!0,$()}catch(c){p(c.message||"Lỗi tải Giao Dịch Đài","error")}}async function x(){try{const[c,a]=await Promise.all([o.getMugTargets(r),o.getMugLog(r)]);d.mugTargets=c.targets||[],d.mugCooldown=c.mugCooldown||0,d.mugLog=a.logs||[],$()}catch(c){p(c.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function $(){const c=e.player;if(n.innerHTML=`
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

      ${d.showListForm?m(c):""}

      ${d.tab==="browse"?h():d.tab==="my"?l():d.tab==="auction"?'<div id="auctionSubContent"></div>':v()}
    `,g(),d.tab==="auction"){const a=n.querySelector("#auctionSubContent");a&&wt(a,t)}}function h(){let c=`
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
    `,a=d.listings;if(d.search.trim()){const i=d.search.toLowerCase().trim();a=a.filter(b=>{var s;return b.item_name.toLowerCase().includes(i)?!0:(s=b.item_data)!=null&&s.affixes?b.item_data.affixes.some(y=>(y.stat||"").toLowerCase().includes(i)||(y.type||"").toLowerCase().includes(i)):!1})}return a.length===0?c+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(c+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',c+=a.map(i=>{var k,w;const b=i.item_type==="item"?"⚔️":i.item_type==="material"?"🧱":"💊",s=((k=i.item_data)==null?void 0:k.rarity)||"",y=i.seller_id===r,T=(w=i.item_data)!=null&&w.affixes?i.item_data.affixes.map(S=>`${S.stat} ${S.type==="flat"?"+":""}${S.value}${S.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${b}
                <span style="color:var(--gold)">${i.item_name}</span>
                ${i.quantity>1?`<span style="opacity:0.5"> x${i.quantity}</span>`:""}
                ${s?`<span class="rarity-${s}" style="font-size:11px;margin-left:4px">[${s}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${i.seller_name}</span>
                ${T?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${T}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${i.price}${i.quantity>1?"/cái":""}</span>
              ${y?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${i.id}" data-qty="${i.quantity}" data-price="${i.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),c+="</div></div>"),c}function l(){if(d.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let c='<div class="panel"><div class="panel-body no-pad">';return c+=d.myListings.map(a=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${a.item_type==="item"?"⚔️":a.item_type==="material"?"🧱":"💊"} ${a.item_name} ${a.quantity>1?`<span style="opacity:0.5">x${a.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${a.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${a.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),c+="</div></div>",c}function v(){let c=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${d.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${d.mugCooldown}s</div>`:""}
    `;return d.mugTargets.length===0?c+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':c+=d.mugTargets.map(a=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${a.gender==="female"?"♀":"♂"} ${a.name}</div>
            <div class="item-meta">Lv.${a.level} · ${a.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${a.id}" ${d.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),c+="</div></div>",d.mugLog.length>0&&(c+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${d.mugLog.map(a=>{const i=a.attacker_id===r,b=a.outcome==="success"?"✅":"❌",s=a.outcome==="success"?"var(--green)":"var(--red)",y=i?a.outcome==="success"?`Cướp ${a.victim_name}: +${a.gold_stolen} 💎`:`Phục kích ${a.victim_name} thất bại!`:a.outcome==="success"?`Bị ${a.attacker_name} cướp: -${a.gold_stolen} 💎`:`${a.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${s}">${b} ${y} <span style="opacity:0.4;margin-left:auto">${new Date(a.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),c}function m(c){const a=Object.entries(c.materials||{}).map(([y,T])=>({id:y,qty:T,type:"material",name:y})),i=Object.entries(c.medicines||{}).map(([y,T])=>({id:y,qty:T,type:"medicine",name:y})),b=(c.inventory||[]).map(y=>({id:y.id,qty:1,type:"item",name:y.name||y.id})),s=[...a,...i,...b];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${s.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${s.map(y=>`<option value="${y.type}|${y.id}">${y.type==="item"?"⚔️":y.type==="material"?"🧱":"💊"} ${y.name} ${y.qty>1?`(có: ${y.qty})`:""}</option>`).join("")}
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
    `}function g(){var c,a,i,b;document.querySelectorAll("[data-mtab]").forEach(s=>{s.addEventListener("click",()=>{if(d.tab=s.dataset.mtab,d.tab==="mug"&&d.mugTargets.length===0){x();return}$()})}),(c=document.getElementById("btnShowList"))==null||c.addEventListener("click",()=>{d.showListForm=!d.showListForm,$()}),document.querySelectorAll("[data-filter]").forEach(s=>{s.addEventListener("click",async()=>{d.filter=s.dataset.filter,await u()})}),(a=document.getElementById("sortSelect"))==null||a.addEventListener("change",async s=>{d.sort=s.target.value,await u()}),(i=document.getElementById("searchInput"))==null||i.addEventListener("input",s=>{d.search=s.target.value,$();const y=document.getElementById("searchInput");y&&(y.focus(),y.setSelectionRange(d.search.length,d.search.length))}),(b=document.getElementById("btnConfirmList"))==null||b.addEventListener("click",async()=>{var S,C,I;const s=(S=document.getElementById("listItem"))==null?void 0:S.value;if(!s)return;const[y,T]=s.split("|"),k=parseInt((C=document.getElementById("listQty"))==null?void 0:C.value)||1,w=parseInt((I=document.getElementById("listPrice"))==null?void 0:I.value)||0;if(w<=0)return p("Giá phải lớn hơn 0!","error");try{const N=await o.listForSale(r,y,T,k,w);p(N.message,"success"),e.player=N.player,f(),d.showListForm=!1,await u()}catch(N){p(N.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(s=>{s.addEventListener("click",async()=>{const y=parseInt(s.dataset.buy),T=parseInt(s.dataset.qty),k=parseInt(s.dataset.price);let w=1;if(T>1){const S=prompt(`Mua bao nhiêu? (tối đa ${T}, giá ${k} 💎/cái)`,"1");if(!S)return;w=Math.min(parseInt(S)||1,T)}s.disabled=!0;try{const S=await o.buyFromMarket(r,y,w);p(S.message,"success"),e.player=S.player,f(),await u()}catch(S){p(S.message,"error"),s.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(s=>{s.addEventListener("click",async()=>{s.disabled=!0;try{const y=await o.cancelListing(r,parseInt(s.dataset.cancel));p(y.message,"success"),e.player=y.player,f(),await u()}catch(y){p(y.message,"error"),s.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(s=>{s.addEventListener("click",async()=>{const y=s.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){s.disabled=!0,s.textContent="⏳...";try{const T=await o.mugPlayer(r,y);p(T.message,T.success?"success":"error"),e.player=T.player,f(),await x()}catch(T){p(T.message,"error"),s.disabled=!1,s.textContent="💀 Phục Kích"}}})})}d.tab==="mug"?x():d.loaded?$():u()}function Kt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;let d=!1,u=null;async function x(){try{u=await o.getRealmInfo(r),d=!0,$()}catch(v){p(v.message||"Lỗi tải Cảnh Giới","error")}}function $(){if(!u)return;const v=u.current,m=u.allRealms||[],g=e.player,c=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;n.innerHTML=`
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${v.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${v.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${v.color}">${v.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Cảnh Giới Bậc ${v.tier} · ${v.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${g.level} — ${g.xp}/${g.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${c}%;background:${v.color}"></div></div>
        </div>

        ${v.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(v.bonuses).filter(([,a])=>a>0).map(([a,i])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${i} ${a}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${v.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${v.unlocks.map(a=>`<span style="font-size:12px;opacity:0.7">✅ ${a}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${v.canBreakthrough?h(v):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${m.map(a=>{const i=a.tier===v.tier,b=a.tier<v.tier,y=a.tier>v.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${i?`2px solid ${a.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${y};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${a.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${a.color}">${a.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${a.levelMin}+</span>
                ${a.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${a.failChance}% thất bại</span>`:""}
                ${b?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${i?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,l()}function h(v){const m=v.nextRealm;if(!m)return"";const g=m.cost?`💎 ${m.cost.gold} + 🔮 ${m.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${m.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${m.name} ${m.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${g}</div>
          ${m.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${m.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(m.bonuses).filter(([,c])=>c>0).map(([c,a])=>`+${a} ${c}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${m.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function l(){var v;(v=document.getElementById("btnBreakthrough"))==null||v.addEventListener("click",()=>{ut(t)})}x()}function jt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t;Dt(n,t)}async function Dt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t;n.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const d=(await o.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,f()),d.length===0){n.innerHTML=`
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
            ${d.map(u=>{const x=new Date(u.created_at*1e3),$=x.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),h=x.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let l="📌";return l={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[u.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${$}</div>
                    <div>${h}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${l}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${u.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${u.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(r){n.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${r.message}</div></div>`}}function Vt(n,t){const{state:e,api:o,notify:p,updateSidebar:f,renderGame:r}=t,d=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const u=e._housing;async function x(){try{const m=await o.getHousing(d);u.data=m,u.loaded=!0,$()}catch(m){p(m.message||"Lỗi tải Động Phủ","error")}}function $(){const m=u.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${m.owned?l(m):h(m)}
    `,v()}function h(m){const g=m.tiers[1];return`
      <div class="panel">
        <div class="panel-title">🏗️ Mua Động Phủ</div>
        <div class="panel-body" style="text-align:center;padding:24px">
          <div style="font-size:40px;margin-bottom:12px">🏠</div>
          <div style="font-weight:600;margin-bottom:6px">${g.name}</div>
          <div style="font-size:12px;opacity:0.6;margin-bottom:12px">${g.description}</div>
          <div style="margin-bottom:12px">
            <span style="color:var(--green)">❤️ +${g.hpRegen} HP/phút</span> ·
            <span style="color:var(--blue)">🌿 ${g.gardenSlots} ô vườn</span>
          </div>
          <button class="btn btn--gold btn--lg" id="btnBuyHouse">💎 ${g.cost} Linh thạch — Mua</button>
        </div>
      </div>
    `}function l(m){const g=m.gardenSlots||[],c=m.gardenHerbs||{};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏠</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${m.tierInfo.name} <span style="opacity:0.4">(T${m.tier})</span></div>
            <div style="font-size:12px;opacity:0.6">${m.tierInfo.description}</div>
            <div style="font-size:12px;margin-top:4px">
              <span style="color:var(--green)">❤️ +${m.tierInfo.hpRegen} HP/phút</span> ·
              <span style="color:var(--blue)">🌿 ${m.maxSlots} ô vườn</span>
            </div>
          </div>
          ${m.nextTier?`
            <button class="btn btn--gold btn--sm" id="btnUpgrade" title="Nâng lên ${m.nextTier.name}">
              ⬆ ${m.nextTier.cost} 💎
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
          <div style="display:grid;grid-template-columns:repeat(${Math.min(m.maxSlots,5)},1fr);gap:8px">
            ${Array.from({length:m.maxSlots},(a,i)=>{const b=g[i]||{},s=!!b.herb,y=b.ready,T=b.remaining||0,k=Math.ceil(T/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${y?"var(--green)":s?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${s?`
                    <div style="font-size:20px">${y?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${b.herbName||b.herb}</div>
                    <div style="font-size:10px;color:${y?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${y?"✅ Sẵn sàng!":"⏳ "+k+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${i}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(c).map(([w,S])=>`<option value="${w}">${S.name}</option>`).join("")}
                    </select>
                  `}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>

      ${m.formations?`
      <div class="panel" style="margin-top:10px">
        <div class="panel-title flex justify-between">
          <span>🔮 Trận Pháp</span>
          ${m.dailyCost>0?`
            <span style="font-size:11px">
              Hao phí: <strong style="color:var(--orange)">${m.dailyCost} 💎/ngày</strong>
              ${m.maintenanceDue?'<button class="btn btn--sm btn--orange" id="btnMaintenance">💰 Nộp phí</button>':'<span style="color:var(--green);margin-left:6px">✅ Đã nộp</span>'}
            </span>
          `:""}
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
            ${Object.entries(m.formations).map(([a,i])=>{const b=i.currentLevel>=i.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${i.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${i.icon}</span>
                      <strong style="margin-left:4px">${i.name}</strong>
                      ${i.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${i.currentLevel}</span>`:""}
                    </div>
                    ${i.canBuild?b?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${a}">
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
    `}function v(){var m,g,c,a;(m=document.getElementById("btnBuyHouse"))==null||m.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const i=await o.buyHousing(d);p(i.message,"success"),e.player=i.player,f(),await x()}catch(i){p(i.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const i=await o.buyHousing(d);p(i.message,"success"),e.player=i.player,f(),await x()}catch(i){p(i.message,"error")}}),document.querySelectorAll(".plant-select").forEach(i=>{i.addEventListener("change",async b=>{const s=b.target.value;if(!s)return;const y=parseInt(i.dataset.slot);try{const T=await o.plantHerb(d,s,y);p(T.message,"success"),await x()}catch(T){p(T.message,"error")}})}),(c=document.getElementById("btnHarvest"))==null||c.addEventListener("click",async()=>{try{const i=await o.harvestGarden(d);p(i.message,"success"),e.player=i.player,f(),await x()}catch(i){p(i.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(i=>{i.addEventListener("click",async()=>{const b=i.dataset.fid;i.disabled=!0,i.textContent="⏳...";try{const s=await o.upgradeFormation(d,b);p(s.message,"success"),e.player=s.player,f(),await x()}catch(s){p(s.message,"error"),i.disabled=!1,i.textContent="⬆ Nâng"}})}),(a=document.getElementById("btnMaintenance"))==null||a.addEventListener("click",async()=>{try{const i=await o.payMaintenance(d);p(i.message,"success"),e.player=i.player,f(),await x()}catch(i){p(i.message,"error")}})}u.loaded?$():x()}function Ut(n,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function o(){n.innerHTML=`
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
          ${p(e._wikiTab)}
        </div>
      </div>
    `,n.querySelectorAll("[data-tab]").forEach(f=>{f.addEventListener("click",()=>{e._wikiTab=f.dataset.tab,o()})})}function p(f){return{lore:`
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
        <h3 style="color:var(--gold);margin-bottom:12px">⚡ Mô Hình Kỹ Năng 4 Trụ Cột & Cơ Chế Xuất Chiêu</h3>
        <p>Quy hoạch kỹ năng chuẩn tu chân, phân định rành mạch giữa Thực Chiến, Hào Quang và Thông Thạo:</p>

        <h4 style="color:var(--blue)">🏛️ 4 Trụ Cột Kỹ Năng</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0">
          <div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
            ⚔️ <strong>Trụ Cột 1: Chiêu Thức</strong><br>
            <span class="text-dim text-xs">Kỹ năng chủ động thực chiến (Trọng Kích, Hấp Huyết Kiếm...). Trang bị vào các ô xuất chiêu theo cấp cảnh giới.</span>
          </div>
          <div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
            🧘 <strong>Trụ Cột 2: Tâm Pháp & Hào Quang</strong><br>
            <span class="text-dim text-xs">Cơ chế Khóa Linh Lực (Mana Reservation). Chiếm dụng % Linh lực tối đa để duy trì hộ thể, regen và tăng kháng thiên kiếp.</span>
          </div>
          <div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
            🐺 <strong>Trụ Cột 3: Thông Thạo Quái Vật</strong><br>
            <span class="text-dim text-xs">Bách Thú Đồ Giám 5 sao: Khắc chế tập tính (+Dmg), Kháng đòn quái (-Dmg), Bắt thấu sơ hở và Tuyệt diệt trảm sát.</span>
          </div>
          <div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
            ⚒️ <strong>Trụ Cột 4: Thông Thạo Chế Tạo</strong><br>
            <span class="text-dim text-xs">Nâng cao tay nghề Luyện Đan & Đúc Khí: Tăng phẩm chất trang bị, giảm nguyên liệu và tăng tỷ lệ bạo phát đan dược.</span>
          </div>
        </div>

        <h4 style="color:var(--gold)">🎯 Cơ Chế Xác Suất Kích Hoạt Chiêu Thức (Active Skill Trigger Chance)</h4>
        <div style="background:rgba(234,179,8,0.05);border:1px solid rgba(234,179,8,0.2);border-radius:6px;padding:12px;margin:8px 0;font-size:12px;">
          • Trong mỗi hiệp đấu, đạo hữu sẽ tung xúc xắc kiểm tra xác suất kích hoạt của các Chiêu Thức đã trang bị.<br>
          • <strong>Công thức xác suất:</strong> <code>Xác Suất = Tỷ Lệ Cơ Bản (Tier 1: 55% → Tier 6: 25%) + Cấp Thông Thạo (+1%/Lv) + Mẫn Tiệp (+1%/10 Điểm) + Thế Phá Quy (+5%)</code>.<br>
          • <strong>Tiêu hao:</strong> Khi xuất chiêu thành công, đạo hữu sẽ tiêu hao Linh Lực tương ứng. Nếu không đủ Linh Lực hoặc đổ xúc xắc không thành công, đạo hữu sẽ xuất đòn thường công.<br>
          • <strong>Tối đa/Tối thiểu:</strong> Xác suất được giới hạn trong khoảng 15% - 85% để luôn đảm bảo tính biến ảo của thực chiến.
        </div>
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
      `}[f]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}o()}function Ft(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const d=e._npcShop;let u=parseInt(localStorage.getItem("npcShopIdx")||"0");async function x(){try{n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const l=await o.getShops(r);d.shops=l.shops||[],d.tax=l.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},d.loaded=!0,u>=d.shops.length&&(u=0),$()}catch(l){p(l.message||"Lỗi tải shop","error")}}function $(){var a;if(d.shops.length===0){n.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const l=d.shops[u]||d.shops[0],v=d.shops.map((i,b)=>`
      <button class="skill-tab ${b===u?"active":""}" data-shop-idx="${b}">
        ${i.icon||"🧓"} ${i.name}
      </button>
    `).join(""),m={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},g={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},c=(l.items||[]).map(i=>{var k,w;const b=m[i.rarity||"common"]||"#888",s=g[i.rarity||"common"]||"Phàm",y=(i.remainingStock??1)<=0,T=(((k=e.player)==null?void 0:k.gold)??0)>=(i.currentPrice||0);return`
        <div class="shop-item-card ${y?"out-of-stock":""}" style="border-left:3px solid ${b}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${b}">${i.name}</div>
              <div class="shop-item-rarity" style="color:${b}">${s} · Tầng ${i.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${y?"var(--red)":"var(--green)"}">
                ${y?"❌ Hết hàng":`📦 ${i.remainingStock}/${i.dailyStock}`}
              </span>
            </div>
          </div>
          ${i.description?`<div class="shop-item-desc">${i.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${T?"":"too-expensive"}">
              💎 ${((w=i.currentPrice)==null?void 0:w.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${l.id}" data-item="${i.id}" 
                value="1" min="1" max="${i.remainingStock||1}" 
                ${y?"disabled":""}>
              <button class="btn btn--sm ${y?"":T?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${l.id}" data-item="${i.id}"
                ${y||!T?"disabled":""}>
                ${y?"❌":T?"🛒 Mua":"💸 Thiếu"}
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
        <div class="shop-info-tag">💎 ${(((a=e.player)==null?void 0:a.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${l.area||"Không rõ"}</div>
      </div>

      ${d.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${v}</div>`:""}

      <div class="shop-items-grid">
        ${c||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,h()}function h(){n.querySelectorAll(".skill-tab[data-shop-idx]").forEach(l=>{l.addEventListener("click",()=>{u=parseInt(l.dataset.shopIdx),localStorage.setItem("npcShopIdx",u),$()})}),n.querySelectorAll(".btn-buy").forEach(l=>{l.addEventListener("click",async()=>{const v=l.dataset.shop,m=l.dataset.item,g=n.querySelector(`.buy-qty[data-shop="${v}"][data-item="${m}"]`),c=parseInt((g==null?void 0:g.value)||1);l.disabled=!0,l.textContent="⏳...";try{const a=await o.buyFromShop(r,v,m,c);p(a.message,"success"),e.player=a.player,f(),await x()}catch(a){p(a.message,"error"),l.disabled=!1,l.textContent="🛒 Mua"}})})}d.loaded?$():x()}function Qt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const d=e._guild;async function u(){try{d.data=await o.getMyGuild(r),d.loaded=!0,$()}catch(m){p(m.message||"Lỗi","error")}}async function x(){try{const m=await o.listGuilds();d.allGuilds=m.guilds||[],$()}catch(m){p(m.message,"error")}}function $(){const m=d.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${m!=null&&m.inGuild?l(m):h(m)}
    `,v()}function h(m){return`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🏗️ Lập Tông Môn Mới</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:grid;gap:8px;max-width:360px">
            <input type="text" id="guildName" placeholder="Tên Tông Môn (2-30 ký tự)" class="input" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <input type="text" id="guildTag" placeholder="Tag (2-5 ký tự, VD: TMQ)" class="input" maxlength="5" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <textarea id="guildDesc" placeholder="Mô tả..." rows="2" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;resize:none"></textarea>
            <button class="btn btn--gold" id="btnCreate">🏯 Lập Tông Môn (${(m==null?void 0:m.createCost)||1e4} 💎)</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>📋 Danh Sách Tông Môn</span>
          <button class="btn btn--sm btn--dark" id="btnLoadGuilds">🔄 Tải</button>
        </div>
        <div class="panel-body no-pad" id="guildList">
          ${d.allGuilds?d.allGuilds.map(g=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
              <div style="flex:1">
                <div style="font-weight:600">[${g.tag}] ${g.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${g.level} · ${g.member_count}/${g.max_members} · Quỹ: ${g.treasury} 💎 · Chưởng Môn: ${g.leader_name}</div>
              </div>
              <button class="btn btn--sm btn--green btn-join" data-gid="${g.id}" ${g.member_count>=g.max_members?"disabled":""}>
                ${g.member_count>=g.max_members?"Đầy":"Gia nhập"}
              </button>
            </div>
          `).join(""):'<div style="padding:20px;text-align:center;opacity:0.3">Nhấn "Tải" để xem danh sách</div>'}
        </div>
      </div>
    `}function l(m){var i;const g=m.guild,c=m.members||[],a=m.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${g.tag}] ${g.name} <span style="opacity:0.3">Lv${g.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((i=g.levelInfo)==null?void 0:i.name)||""} · ${g.memberCount}/${g.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${g.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${g.dailyUpkeep}/ngày</span>
              ${g.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(g.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(g.buffs).map(([b,s])=>`${b} +${s}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${m.myRole==="leader"&&g.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${g.nextLevel.name}">⬆ ${g.nextLevel.upgradeCost} 💎</button>`:""}
            ${m.myRole==="leader"&&g.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            Bạn đã đóng: ${m.myContributed} 💎 · Vai trò: ${m.myRole==="leader"?"👑 Chưởng Môn":m.myRole==="elder"?"⭐ Trưởng Lão":"🙋 Đệ Tử"}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">📜 Nhật Ký</div>
          <div class="panel-body" style="max-height:160px;overflow-y:auto;padding:8px 12px">
            ${a.slice(0,10).map(b=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(b.created_at).toLocaleString("vi")}</span>
                ${b.detail||b.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${c.length}/${g.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${c.map(b=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${b.role==="leader"?"👑":b.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${b.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${b.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${m.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function v(){var m,g,c,a,i,b;(m=document.getElementById("btnCreate"))==null||m.addEventListener("click",async()=>{var k,w,S,C,I,N;const s=(w=(k=document.getElementById("guildName"))==null?void 0:k.value)==null?void 0:w.trim(),y=(C=(S=document.getElementById("guildTag"))==null?void 0:S.value)==null?void 0:C.trim(),T=(N=(I=document.getElementById("guildDesc"))==null?void 0:I.value)==null?void 0:N.trim();if(!s||!y)return p("Nhập tên và tag!","error");try{const G=await o.createGuild(r,s,y,T);p(G.message,"success"),e.player=G.player,f(),d.loaded=!1,await u()}catch(G){p(G.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",x),document.querySelectorAll(".btn-join").forEach(s=>{s.addEventListener("click",async()=>{try{const y=await o.joinGuild(r,parseInt(s.dataset.gid));p(y.message,"success"),d.loaded=!1,await u()}catch(y){p(y.message,"error")}})}),(c=document.getElementById("btnContribute"))==null||c.addEventListener("click",async()=>{var y;const s=parseInt(((y=document.getElementById("contributeAmt"))==null?void 0:y.value)||0);if(!(s<=0))try{const T=await o.contributeGuild(r,s);p(T.message,"success"),e.player=T.player,f(),await u()}catch(T){p(T.message,"error")}}),(a=document.getElementById("btnUpgradeGuild"))==null||a.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const s=await o.upgradeGuild(r);p(s.message,"success"),await u()}catch(s){p(s.message,"error")}}),(i=document.getElementById("btnPayUpkeep"))==null||i.addEventListener("click",async()=>{try{const s=await o.payGuildUpkeep(d.data.guild.id);p(s.message,"success"),await u()}catch(s){p(s.message,"error")}}),(b=document.getElementById("btnLeave"))==null||b.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const s=await o.leaveGuild(r);p(s.message,"success"),d.loaded=!1,await u()}catch(s){p(s.message,"error")}})}d.loaded?$():u()}function Jt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const d=e._profile;function u(){n.innerHTML=`
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
          ${d.results.map(l=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" data-view="${l.id}">
              <div style="flex:1">
                <div style="font-weight:600">${l.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${l.level} · Realm T${l.realm_tier||"?"}</div>
              </div>
              <button class="btn btn--sm btn--dark btn-view" data-vid="${l.id}">👁 Xem</button>
            </div>
          `).join("")}
        </div>
      </div>
      `:!d.viewing&&d.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,$()}function x(l){var c,a,i;const v=l.id===r,m=l.maxHp>0?Math.round(l.currentHp/l.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((c=l.name[0])==null?void 0:c.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${l.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${l.level} · ${((a=l.realmInfo)==null?void 0:a.fullName)||"Phàm Nhân"}
                ${l.guild?` · <span style="color:var(--blue)">[${l.guild.tag}] ${l.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${g[l.currentArea]||l.currentArea}
                ${l.housingTier>0?` · 🏠 T${l.housingTier}`:""}
                · 📜 ${l.skills} kỹ năng · ⚔ ${l.items} vật phẩm
              </div>
            </div>
          </div>

          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ Khí Huyết</span><span>${l.currentHp}/${l.maxHp}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${m}%;background:${m>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">💪 STR</div>
              <div style="font-weight:700;color:var(--red)">${l.stats.strength}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">⚡ SPD</div>
              <div style="font-weight:700;color:var(--blue)">${l.stats.speed}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🎯 DEX</div>
              <div style="font-weight:700;color:var(--orange)">${l.stats.dexterity}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🛡 DEF</div>
              <div style="font-weight:700;color:var(--green)">${l.stats.defense}</div>
            </div>
          </div>

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(i=l.gold)==null?void 0:i.toLocaleString()} 💎</strong></div>

          ${v?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${l.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${l.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function $(){var l,v,m,g,c;(l=document.getElementById("btnSearch"))==null||l.addEventListener("click",h),(v=document.getElementById("searchInput"))==null||v.addEventListener("keydown",a=>{a.key==="Enter"&&h()}),document.querySelectorAll(".btn-view, [data-view]").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.vid||a.dataset.view;try{const b=await o.getPlayerProfile(i);d.viewing=b.profile,u()}catch(b){p(b.message,"error")}})}),(m=document.getElementById("btnAttack"))==null||m.addEventListener("click",async()=>{const a=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${d.viewing.name}?`))try{const i=await o.mugPlayer(r,a);p(i.message,i.won?"success":"error"),i.player&&(e.player=i.player,f())}catch(i){p(i.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const a=document.getElementById("btnAddFriend").dataset.tid;try{const i=await o.addFriend(r,a);p(i.message||"Đã gửi lời mời!","success")}catch(i){p(i.message,"error")}}),(c=document.getElementById("btnBackSearch"))==null||c.addEventListener("click",()=>{d.viewing=null,u()})}async function h(){var m;const l=document.getElementById("searchInput"),v=(m=l==null?void 0:l.value)==null?void 0:m.trim();if(!v||v.length<2)return p("Nhập ít nhất 2 ký tự!","error");d.searchQuery=v,d.viewing=null;try{const g=await o.searchPlayers(v);d.results=g.players||[],u()}catch(g){p(g.message,"error")}}u()}function Wt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const d=e._arena;async function u(){try{d.data=await o.getArena(r),d.loaded=!0,x()}catch(h){p(h.message,"error")}}function x(){var a,i,b,s,y,T,k,w;const h=d.data,l=(h==null?void 0:h.arena)||{},v=l.rank||{},m=parseInt(l.streak)||0,g=m>=5?`🔥x${m}`:m>=3?`⚡x${m}`:m>0?`${m}W`:m<0?`${Math.abs(m)}L`:"",c=m>=5?"var(--gold)":m>=3?"var(--orange)":m>0?"var(--green)":m<0?"var(--red)":"var(--text-dim)";n.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid ${v.color||"#666"}">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px;text-shadow:0 0 12px ${v.color||"#666"}">${v.icon||"🛡️"}</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Rank</div>
            <div style="font-weight:800;font-size:18px;color:${v.color||"#fff"}">${v.name||"Chưa xếp hạng"}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px">
              ELO: <strong>${l.rating||1e3}</strong> · ${l.wins||0}W/${l.losses||0}L
              ${g?` · <span style="color:${c};font-weight:700">${g}</span>`:""}
            </div>
            ${v.nextThreshold?`
              <div style="margin-top:6px">
                <div style="font-size:10px;opacity:0.4">Tiến trình → ${v.nextThreshold} ELO</div>
                <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:3px;overflow:hidden">
                  <div style="background:${v.color||"#666"};height:100%;width:${v.progress||0}%;border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            `:'<div style="font-size:10px;opacity:0.4;margin-top:4px">🏆 Đỉnh cao! Thiên Đạo Đệ Nhất!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${(a=d.lastResult)!=null&&a.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(i=d.lastResult.newRank)==null?void 0:i.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(b=d.lastResult.newRank)==null?void 0:b.name}!</div>
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
            Đối thủ: <strong>${(s=d.lastResult.opponent)==null?void 0:s.name}</strong> 
            ${(y=d.lastResult.opponent)!=null&&y.rank?d.lastResult.opponent.rank.icon:""} 
            (ELO ${(T=d.lastResult.opponent)==null?void 0:T.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${d.lastResult.ratingChange>0?"+":""}${d.lastResult.ratingChange}
            ${d.lastResult.goldEarned>0?` · +${d.lastResult.goldEarned} 💎`:""}
          </div>
          ${(k=d.lastResult.combatLog)!=null&&k.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${d.lastResult.combatLog.map(S=>`<div>${S}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(h.opponents||[]).length>0?(h.opponents||[]).map(S=>{var C,I,N;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((C=S.rank)==null?void 0:C.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${S.name} <span style="opacity:0.4;font-size:11px">Lv.${S.level}</span></div>
                <div style="font-size:11px;color:${((I=S.rank)==null?void 0:I.color)||"#888"}">${((N=S.rank)==null?void 0:N.name)||"Đồng"} · ELO ${S.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${S.player_id}" ${d.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${d.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${h.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(h.top10||[]).map((S,C)=>{var I,N;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${C<3?"var(--gold)":"var(--text-dim)"}">#${C+1}</span>
                <span>${((I=S.rank)==null?void 0:I.icon)||""}</span>
                <span style="flex:1">${S.name}</span>
                <span style="color:${((N=S.rank)==null?void 0:N.color)||"var(--blue)"}; font-weight:600">${S.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(h.history||[]).map(S=>{const C=S.winner_id===r;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${C?"var(--green)":"var(--red)"}">
                  ${C?"✅":"❌"} vs ${S.attacker_id===r?S.defender_name:S.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${S.rating_change>0?"+":""}${S.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll(".btn-fight-opp").forEach(S=>{S.addEventListener("click",C=>$(C.target.dataset.oid))}),(w=document.getElementById("btnRandomFight"))==null||w.addEventListener("click",()=>$(null))}async function $(h){d.fighting=!0,x();try{const l=await o.request(`/player/${r}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:h})});d.lastResult=l,e.player=l.player,f(),p(l.message,l.won?"success":"error"),d.fighting=!1,await u()}catch(l){p(l.message,"error"),d.fighting=!1,x()}}d.loaded?x():u()}function Xt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;async function d(){try{e._worldBoss=await o.getWorldBoss(),u()}catch(x){p(x.message,"error")}}function u(){var g;const x=e._worldBoss||{},$=x.boss||{},h=x.hpPercent||0,l=x.topContributors||[],v=x.rewards||{},m=$.status==="active"&&$.current_hp>0;n.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${m?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${$.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${$.level||"?"} · ${m?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${($.current_hp||0).toLocaleString()} / ${($.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${h}%;background:${h>50?"var(--red)":h>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${m?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${v.gold||0} · ✨ ${v.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${l.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':l.map((c,a)=>{var i;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${a<3?"var(--gold)":"var(--text-dim)"}">#${a+1}</span>
                <span style="flex:1">${c.name}</span>
                <span style="color:var(--red)">${(i=c.total_damage)==null?void 0:i.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${c.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const c=document.getElementById("btnAttackBoss");c.disabled=!0,c.textContent="⏳ Đang giao chiến...";const a=document.getElementById("bossCombatResult");try{const i=await o.attackWorldBoss(r);if(e.player=i.player,f(),i.log&&i.log.length>0){const b=i.log.map(k=>k.startsWith("---")?`<div class="turn">${k}</div>`:k.includes("hụt")?`<div class="miss">${k}</div>`:k.includes("né được")?`<div class="dodge">${k}</div>`:k.includes("CHÍNH MẠNG")||k.includes("💥")?`<div class="crit">${k}</div>`:k.includes("🔥")?`<div class="heavy text-orange">${k}</div>`:k.includes("chặn hoàn toàn")||k.includes("🛡")?`<div class="dodge">${k}</div>`:k.includes("ngã xuống")||k.includes("💀")?`<div class="death">${k}</div>`:k.includes("Chiến thắng")||k.includes("🏆")?`<div class="victory">${k}</div>`:k.includes("bỏ chạy")||k.includes("🏃")?`<div class="flee">${k}</div>`:k.includes("Bất phân")||k.includes("🤝")?`<div class="stalemate">${k}</div>`:k.includes("🧪")?`<div class="status-effect text-purple">${k}</div>`:k.includes("💔")?`<div class="dot-damage text-purple bold">${k}</div>`:k.includes("✨")?`<div class="regen text-green">${k}</div>`:`<div class="hit">${k}</div>`).join(""),s={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},y=s[i.outcome]||s.loss,T=Math.max(0,e.player.currentHp/e.player.maxHp*100);a.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${y.icon} ${y.text}
                <span class="subtitle">${i.turns}/${i.maxTurns||25} lượt · ⚔️ ${i.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${y.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${T}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${$.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(i.bossHp/i.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${i.bossHp.toLocaleString()}/${i.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${b}</div>
            </div>`}i.defeated?p(i.message,"success"):p(`⚔️ ${i.damage} dmg!`,"info"),await d()}catch(i){p(i.message,"error"),c.disabled=!1,c.textContent="⚔️ Tấn Công"}})}d()}function Yt(n,t){const{state:e,api:o,notify:p,updateSidebar:f,renderGame:r}=t,d=e.playerId,u={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function x(){var h;try{const[l,v]=await Promise.all([o.getGachaPools(),o.getGachaPity(d)]);e._gacha={pools:l.pools||{},pity:v.pity||{},results:((h=e._gacha)==null?void 0:h.results)||[]},$()}catch(l){p(l.message,"error")}}function $(){const h=e._gacha||{},l=h.pools||{},v=h.pity||{},m=h.results||[];n.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(l).map(([g,c])=>{var i,b,s;const a=v[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${c.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${u.legendary}">★ ${(i=c.rates)==null?void 0:i.legendary}%</span> ·
                <span style="color:${u.rare}">◆ ${(b=c.rates)==null?void 0:b.rare}%</span> ·
                <span style="color:${u.uncommon}">● ${(s=c.rates)==null?void 0:s.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${a.pulls_since_rare||0}/${c.pityRare} · Legend: ${a.pulls_since_legendary||0}/${c.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="1">💎 ${c.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="10">💎 ${c.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${m.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${m.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${m.map(g=>{var c,a,i,b;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${u[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((c=g.item)==null?void 0:c.slot)==="weapon"?"⚔️":((a=g.item)==null?void 0:a.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${u[g.rarity]}">${((i=g.item)==null?void 0:i.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((b=g.item)==null?void 0:b.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const c=g.dataset.pool,a=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const i=await o.gachaPull(e.playerId,c,a);p(i.message,"success"),e.player=i.player,f(),e._gacha.results=i.results||[],e._gacha.pity[c]=i.pity,$()}catch(i){p(i.message,"error"),g.disabled=!1}}))}x()}function Zt(n,t){const{state:e,api:o,notify:p}=t;e._lbTab||(e._lbTab="level");async function f(){const d=e._lbTab||"level";n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const u=await o.getLeaderboard(d);e._lbData=u,r()}catch(u){n.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${u.message}
      </div></div>`}}function r(){const d=e._lbTab||"level",x=(e._lbData||{}).rankings||[],h=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(v=>`
      <button class="skill-tab ${d===v.id?"active":""}" data-tab="${v.id}">
        ${v.icon} ${v.name}
      </button>
    `).join("");let l="";x.length===0?l='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':d==="guild"?l=x.map((v,m)=>`
        <div class="lb-row ${m<3?"lb-top":""}">
          <div class="lb-rank ${m<3?"lb-rank-top":""}">${m<3?["🥇","🥈","🥉"][m]:"#"+(m+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${v.tag}] ${v.name}</div>
            <div class="lb-sub">👤 ${v.members}/${v.max_members} · Leader: ${v.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(v.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${v.level}</div>
          </div>
        </div>
      `).join(""):d==="pvp"?l=x.map((v,m)=>`
        <div class="lb-row ${m<3?"lb-top":""}">
          <div class="lb-rank ${m<3?"lb-rank-top":""}">${m<3?["🥇","🥈","🥉"][m]:"#"+(m+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${v.name}</div>
            <div class="lb-sub">Lv.${v.level} · ${v.wins||0}W/${v.losses||0}L${v.streak>0?` · 🔥${v.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${v.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):l=x.map((v,m)=>`
        <div class="lb-row ${m<3?"lb-top":""}">
          <div class="lb-rank ${m<3?"lb-rank-top":""}">${m<3?["🥇","🥈","🥉"][m]:"#"+(m+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${v.name}</div>
            <div class="lb-sub">${v.realm_tier?`Cảnh giới ${v.realm_tier}`:""} ${d==="level"?`· Lv.${v.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${d==="gold"?`💎 ${parseInt(v.gold||0).toLocaleString()}`:`Lv.${v.level}`}
            </div>
          </div>
        </div>
      `).join(""),n.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${h}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${l}
        </div>
      </div>
    `,n.querySelectorAll(".skill-tab[data-tab]").forEach(v=>{v.addEventListener("click",()=>{e._lbTab=v.dataset.tab,f()})})}f()}const H={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},Lt=document.getElementById("app"),st={get state(){return H},api:K,notify:J,renderGame:Q,updateSidebar:se};async function te(){const n=localStorage.getItem("isLoggedOut")==="true",t=localStorage.getItem("playerId");if(!n&&t&&!H.playerId)try{const e=await K.getPlayer(t);H.playerId=t,H.player=e.player,await tt(),Q();return}catch{localStorage.removeItem("playerId")}if(!n&&!H.playerId)try{const e=await K.login("admin","admin");H.playerId=e.id,H.player=e.player,localStorage.setItem("playerId",e.id),await tt(),Q();return}catch(e){console.warn("Dev auto-login failed. Fallback to intro UI.",e)}H.playerId?Q():dt()}function dt(){var t,e;const n=H.authTab||"login";Lt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(o=>{o.addEventListener("click",()=>{H.authTab=o.dataset.auth,dt()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const o=document.getElementById("inpUsername").value.trim(),p=document.getElementById("inpPassword").value;if(!o||!p)return J("Vui lòng nhập đầy đủ","error");try{const f=await K.login(o,p);H.playerId=f.id,H.player=f.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",f.id),J(f.message,"success"),await tt(),Q()}catch(f){J(f.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var d,u;const o=document.getElementById("inpUsername").value.trim(),p=document.getElementById("inpPassword").value,f=((d=document.getElementById("inpName"))==null?void 0:d.value.trim())||"Vô Danh",r=((u=document.querySelector('input[name="gender"]:checked'))==null?void 0:u.value)||"male";if(!o||!p)return J("Vui lòng nhập đầy đủ","error");try{const x=await K.register(o,p,f,r);H.playerId=x.id,H.player=x.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",x.id),J(x.message,"success"),await tt(),Q()}catch(x){J(x.message||"Đăng ký thất bại!","error")}})}function St(n){const t=Math.floor(Date.now()/1e3),e=[];return n.hospitalUntil&&n.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:n.hospitalUntil,color:"var(--red)"}),n.medCooldownUntil&&n.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:n.medCooldownUntil,color:"var(--orange)"}),n.travelArrivesAt&&n.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:n.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(o=>{const p=Math.max(0,o.endTime-t),f=Math.floor(p/60),r=p%60,d=f>0?`${f}p${String(r).padStart(2,"0")}s`:`${r}s`;return`<span class="status-icon" data-end="${o.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${o.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${o.color};white-space:nowrap;
      " title="${o.label}">${o.icon} <span class="cd-time">${d}</span></span>`}).join("")}
  </div>`}let Z=null;function ee(){Z&&clearInterval(Z),Z=setInterval(()=>{const n=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),o=Math.max(0,e-n);if(o<=0){t.remove();return}const p=Math.floor(o/60),f=o%60,r=t.querySelector(".cd-time");r&&(r.textContent=p>0?`${p}p${String(f).padStart(2,"0")}s`:`${f}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function Ct(n){let t="";const o={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"},cuu_u_than_uyen:{icon:"👿",tooltip:"Cửu U Ma Khí: Tăng 35% Sát Thương, 20% Tốc Độ"},thai_co_hong_hoang:{icon:"🦕",tooltip:"Hồng Hoang Cổ Khí: Tăng 25% Máu, 20% Giáp"},chu_thien_tinh_hai:{icon:"🌌",tooltip:"Tinh Tú Luân Chuyển: Tăng 30% Tốc Độ, 25% Nhanh Nhẹn"},hon_don_tien_vuc:{icon:"🔮",tooltip:"Hỗn Độn Tiên Khí: Tăng 35% Toàn Bộ Thuộc Tính"},hon_nguyen_dao_canh:{icon:"👑",tooltip:"Hỗn Nguyên Đạo Vực: Tăng 60% Sát Thương, 50% Toàn Thuộc Tính"}}[n.currentArea];return o&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${o.tooltip}">${o.icon} Cảnh Vực</span>`),n.combatBuffs&&n.combatBuffs.length>0&&n.combatBuffs.forEach(p=>{let f="💊",r="Buff";p.type==="status"&&p.stat==="poison"?(f="☠️",r="Trúng Độc"):p.type==="status"&&p.stat==="confuse"?(f="👹",r="Ma Hóa"):p.stat==="allStats"||p.stat==="hp"||p.stat==="damage"?(f="🔥",r="Cuồng Nộ"):p.stat==="defense"||p.stat==="resist"?(f="🛡️",r="Kiên Cố"):p.stat==="speed"||p.stat==="dexterity"?(f="💨",r="Thân Pháp"):(f="✨",r="Cường Hóa");let d=p.duration?` (-${p.duration} Trận)`:"",u=`Hiệu ứng: ${p.stat} (${p.type} ${p.value})${p.duration?` - Còn lại: ${p.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${u}">${f} ${r}${d}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function Q(){var b,s,y,T,k,w,S,C,I,N,G;const n=H.player,t=((b=n.stats)==null?void 0:b.maxHp)??n.maxHp??100,e=Math.min(t,n.currentHp),o=t>0?Math.min(100,Math.max(0,e/t*100)):0,p=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,f=((s=n.stats)==null?void 0:s.maxEnergy)??n.maxEnergy??50,r=n.usableEnergy??Math.max(0,f-(n.reservedEnergy??0)),d=n.reservationPct??0,u=r>0?Math.min(100,Math.max(0,n.currentEnergy/r*100)):0,x=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0,$=H.exploration?H.exploration[n.currentArea||"thanh_lam_tran"]:null,h=$?$.name:"Khám Phá",l=H._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");H._collapsedNav=l;const m={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[H.currentPage];m&&(l[m]=!1),Lt.innerHTML=`
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
          <div class="player-meta">Lv.${n.level} · ${((y=n.realmInfo)==null?void 0:y.fullName)||"?"}</div>
          ${St(n)}
          ${Ct(n)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${e}/${t}
                ${e<t?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(T=n.skills)!=null&&T.some(M=>M.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${o}%" data-low="${o<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực (Thế Giới)</span>
              <span>
                ${n.currentStamina??100}/${n.maxStamina??100}
                ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((k=n.stats)==null?void 0:k.staminaRegen)??2}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${p}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔵 Linh Lực (Thực Chiến)</span>
              <span>
                ${n.currentEnergy}/${r}
                ${d>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${d}% bởi Tâm Pháp Hào Quang">(Khóa ${d}%)</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${u}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>✨ Tu Vi (Cấp ${n.level})</span>
              <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${x.toFixed(1)}%)</span></span>
            </div>
            <div class="bar-track"><div class="bar-fill xp" style="width:${x}%"></div></div>
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
            <button class="btn btn--dark btn-open-settings" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Cài Đặt Hệ Thống">
              ⚙️
            </button>
          </div>
          <div style="font-size:10px;color:var(--text-dim);text-align:center;padding-bottom:6px;border-bottom:1px solid var(--border)">
            📍 ${h} ${n.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':n.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(n.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <!-- PHÂN HỆ 1: KHÁM PHÁ & HÀNH TRÌNH (Trọng Tâm Gameplay) -->
          <li class="nav-section ${l.hanhtrinh?"collapsed":""}" data-section="hanhtrinh">
            <span>⚔️ KHÁM PHÁ & HÀNH TRÌNH</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.hanhtrinh?"collapsed":""}" id="sec-hanhtrinh">
            <li class="nav-item nav-item--hero ${H.currentPage==="combat"?"active":""}" data-page="combat">
              <span class="icon">🔍</span> Khám Phá (${h})
              <span class="badge" style="background: linear-gradient(135deg, #e8a43a, #f0c030); color: #1a1a2e; font-weight: 800; font-size: 9px; padding: 2px 6px;">CHÍNH</span>
            </li>
            <li class="nav-item ${["travel","dungeon","tiencanh"].includes(H.currentPage)?"active":""}" data-page="travel">
              <span class="icon">🗺️</span> Ngao Du Bát Hoang
              ${(n.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(H.currentPage)?"active":""}" data-page="quests">
              <span class="icon">📜</span> Thiên Cơ Nhiệm Vụ
              ${(n.activeQuests||[]).filter(M=>M.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(n.activeQuests||[]).filter(M=>M.status==="active").length}</span>`:""}
            </li>
          </div>

          <!-- PHÂN HỆ 2: TU CHÂN (Tự Thân & Tu Luyện) -->
          <li class="nav-section ${l.tuchan?"collapsed":""}" data-section="tuchan">
            <span>TU CHÂN</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.tuchan?"collapsed":""}" id="sec-tuchan">
            <li class="nav-item ${H.currentPage==="stats"?"active":""}" data-page="stats">
              <span class="icon">🧘</span> Tu Luyện & Cảnh Giới
              ${(S=(w=H.player)==null?void 0:w.realmInfo)!=null&&S.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite" title="Có thể đột phá!">!</span>':""}
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
          <li class="nav-section ${l.tranhdau?"collapsed":""}" data-section="tranhdau">
            <span>TRANH ĐẤU</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.tranhdau?"collapsed":""}" id="sec-tranhdau">
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
          <li class="nav-section ${l.tienphu?"collapsed":""}" data-section="tienphu">
            <span>TIÊN PHỦ</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.tienphu?"collapsed":""}" id="sec-tienphu">
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
          <li class="nav-section ${l.thuonghoi?"collapsed":""}" data-section="thuonghoi">
            <span>THƯƠNG HỘI</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.thuonghoi?"collapsed":""}" id="sec-thuonghoi">
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
          <li class="nav-section ${l.vothuong?"collapsed":""}" data-section="vothuong">
            <span>VÔ THƯỢNG</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.vothuong?"collapsed":""}" id="sec-vothuong">
            <li class="nav-item ${H.currentPage==="admin"?"active":""}" data-page="admin">
              <span class="icon">⚙️</span> Thiên Đạo Quản Trị
            </li>
          </div>`:""}
        </ul>

        <div class="sidebar-footer">
          <button class="btn btn--sm btn--outline btn-open-settings" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px;" title="Cài Đặt Hệ Thống">
            ⚙️ Cài Đặt
          </button>
          <button class="btn btn--sm btn--red" id="btnSidebarLogout" style="display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 12px; padding: 6px 12px;" title="Đăng Xuất Tài Khoản">
            🚪 Thoát
          </button>
        </div>
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(M=>{M.addEventListener("click",()=>{H.currentPage=M.dataset.page,Q()})}),document.querySelectorAll(".nav-section[data-section]").forEach(M=>{M.addEventListener("click",()=>{const L=M.dataset.section;H._collapsedNav=H._collapsedNav||{},H._collapsedNav[L]=!H._collapsedNav[L],localStorage.setItem("collapsedNav",JSON.stringify(H._collapsedNav));const P=document.getElementById(`sec-${L}`);P&&(P.classList.toggle("collapsed",H._collapsedNav[L]),M.classList.toggle("collapsed",H._collapsedNav[L]))})}),(C=document.getElementById("btnFabChat"))==null||C.addEventListener("click",()=>nt("chat")),(I=document.getElementById("btnFabSocial"))==null||I.addEventListener("click",()=>nt("social"));const g=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');g&&g.addEventListener("click",M=>{M.stopPropagation(),H.currentPage="events",H.popupOpen=!1,Q()}),(N=document.getElementById("btnPopupClose"))==null||N.addEventListener("click",()=>{H.popupOpen=!1,Q()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(M=>{M.addEventListener("click",()=>nt(M.dataset.popup))}),document.querySelectorAll(".btn-open-settings").forEach(M=>{M.addEventListener("click",L=>{L.stopPropagation(),re(n)})}),(G=document.getElementById("btnSidebarLogout"))==null||G.addEventListener("click",M=>{M.stopPropagation(),Et()}),ie(),H.popupOpen&&ne();const c=document.getElementById("searchPlayerInput"),a=document.getElementById("searchResults");let i=null;c&&a&&(c.addEventListener("input",()=>{clearTimeout(i);const M=c.value.trim();if(M.length<2){a.style.display="none";return}i=setTimeout(async()=>{try{const L=await K.searchPlayers(M),P=L.players||L.results||[];P.length===0?a.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':a.innerHTML=P.map(E=>{var B;return`
              <div class="search-result" data-pid="${E.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${E.name} <span style="opacity:0.4">Lv.${E.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((B=E.realmInfo)==null?void 0:B.name)||""}</span>
              </div>
            `}).join(""),a.style.display="block",a.querySelectorAll(".search-result").forEach(E=>{E.addEventListener("click",()=>{H.currentPage="profile",H._viewProfileId=E.dataset.pid,a.style.display="none",c.value="",Q()}),E.addEventListener("mouseenter",()=>E.style.background="rgba(255,255,255,0.08)"),E.addEventListener("mouseleave",()=>E.style.background="transparent")})}catch{a.style.display="none"}},300)}),c.addEventListener("blur",()=>{setTimeout(()=>{a.style.display="none"},200)}),c.addEventListener("keydown",M=>{M.key==="Escape"&&(a.style.display="none",c.blur())})),ee()}function nt(n){H.popupOpen=!0,H.popupPage=n,Q()}function ne(){const n=document.getElementById("popupContent");n&&(H.popupPage==="chat"?kt(n,st):H.popupPage==="social"&&Tt(n,st))}const ae={combat:It,education:et,stats:zt,skills:et,inventory:at,travel:xt,alchemy:it,quests:$t,admin:Ot,social:Tt,chat:kt,market:Gt,realm:Kt,events:jt,dungeon:bt,housing:Vt,wiki:Ut,npcshop:Ft,guild:Qt,library:rt,profile:Jt,arena:Wt,auction:wt,dailyquest:ft,worldboss:Xt,gacha:Yt,leaderboard:Zt,tiencanh:yt,glitch:(n,t)=>{localStorage.setItem("skillsTab","glitch"),et(n,t)}};function ie(){const n=document.getElementById("pageContent");if(!n)return;const t=ae[H.currentPage];t&&t(n,st)}function se(){var $,h,l,v,m,g;const n=H.player;if(!n)return;const t=(($=n.stats)==null?void 0:$.maxHp)??n.maxHp??100,e=Math.min(t,n.currentHp),o=t>0?Math.min(100,Math.max(0,e/t*100)):0,p=((h=n.stats)==null?void 0:h.maxEnergy)??n.maxEnergy??50,f=n.usableEnergy??Math.max(0,p-(n.reservedEnergy??0)),r=n.reservationPct??0,d=f>0?Math.min(100,Math.max(0,n.currentEnergy/f*100)):0,u=document.querySelector(".sidebar-player");if(u){const c=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,a=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0;u.innerHTML=`
      <div class="player-name">${n.name}</div>
      <div class="player-meta">Lv.${n.level} · ${((l=n.realmInfo)==null?void 0:l.fullName)||"?"}</div>
      ${St(n)}
      ${Ct(n)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${e}/${t}
            ${e<t?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(v=n.skills)!=null&&v.some(i=>i.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${o}%" data-low="${o<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực (Thế Giới)</span>
          <span>
            ${n.currentStamina??100}/${n.maxStamina??100}
            ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((m=n.stats)==null?void 0:m.staminaRegen)??2}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${c}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔵 Linh Lực (Thực Chiến)</span>
          <span>
            ${n.currentEnergy}/${f}
            ${r>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${r}% bởi Tâm Pháp Hào Quang">(Khóa ${r}%)</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${d}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>✨ Tu Vi (Cấp ${n.level})</span>
          <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${a.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${a}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${n.gold??0} Linh Thạch</div>`}const x=document.querySelector('.nav-item[data-page="stats"]');if(x){let c="";n.statPoints>0&&(c+=`<span class="badge">${n.statPoints}</span>`),(g=n.realmInfo)!=null&&g.canBreakthrough&&(c+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),x.querySelectorAll(".badge").forEach(a=>a.remove()),x.insertAdjacentHTML("beforeend",c)}}async function tt(){try{const[n,t,e,o,p]=await Promise.all([K.getMonsters(),K.getSkills(),K.getItems(),K.getMedicines(),K.getEducation()]);H.monsters=n.monsters||[],H.skills=t.skills||[],H.items=e.items||[],H.medicines=o.medicines||[],H.educationTrees=p.trees||[],H.exploration=await K.getExploration(),H.recipes=(await K.getRecipes()).recipes,H.npcs=(await K.getNpcs()).npcs||[]}catch(n){console.error("Lỗi tải dữ liệu:",n)}}function J(n,t="info"){var o;(o=document.querySelector(".notification"))==null||o.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=n,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}function Et(){confirm("Đạo hữu có chắc chắn muốn đăng xuất tài khoản?")&&(Z&&clearInterval(Z),localStorage.removeItem("playerId"),localStorage.setItem("isLoggedOut","true"),H.playerId=null,H.player=null,H.popupOpen=!1,J("Đã đăng xuất tài khoản thành công.","info"),dt())}function re(n){var d,u,x,$,h,l;let t=document.getElementById("settings-modal-overlay");t&&t.remove(),t=document.createElement("div"),t.id="settings-modal-overlay",t.style.cssText=`
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    padding: 16px; animation: fadeIn 0.2s ease;
  `;const e=localStorage.getItem("rpg_sound_enabled")!=="false",o=localStorage.getItem("rpg_shake_enabled")!=="false",p=localStorage.getItem("rpg_toast_enabled")!=="false";t.innerHTML=`
    <div style="background: #111422; border: 1px solid rgba(255,215,0,0.3); border-radius: 12px; max-width: 480px; width: 100%; box-shadow: 0 16px 40px rgba(0,0,0,0.9), 0 0 25px rgba(255,215,0,0.1); color: #fff; overflow: hidden; animation: scaleUp 0.2s ease;">
      <!-- Header -->
      <div style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02);">
        <div style="font-weight: 700; font-size: 15px; color: var(--gold); display: flex; align-items: center; gap: 8px;">
          <span>⚙️</span> Cài Đặt Hệ Thống
        </div>
        <button id="btnCloseSettingsModal" style="background: none; border: none; color: var(--text-dim); font-size: 18px; cursor: pointer; padding: 2px 6px;">✕</button>
      </div>

      <!-- Body -->
      <div style="padding: 18px; display: flex; flex-direction: column; gap: 16px; font-size: 13px;">
        <!-- Account Info Box -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px 14px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">👤 Thông Tin Đạo Hữu</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
            <div><span style="color: var(--text-dim);">Đạo danh:</span> <strong>${n.name||"Vô Danh"}</strong></div>
            <div><span style="color: var(--text-dim);">Cấp độ:</span> <strong style="color: var(--blue);">Lv.${n.level||1}</strong></div>
            <div><span style="color: var(--text-dim);">Cảnh giới:</span> <strong style="color: var(--gold);">${((d=n.realmInfo)==null?void 0:d.fullName)||"Phàm Nhân"}</strong></div>
            <div><span style="color: var(--text-dim);">Vai trò:</span> <span>${n.role==="admin"?"👑 Thiên Đạo":"Tu Sĩ"}</span></div>
            <div><span style="color: var(--text-dim);">ID Tài khoản:</span> <span style="font-family: monospace; color: var(--text-dim);">#${n.id||1}</span></div>
            <div><span style="color: var(--text-dim);">Linh Thạch:</span> <span style="color: var(--gold);">💎 ${(n.gold||0).toLocaleString()}</span></div>
          </div>
        </div>

        <!-- System Preferences -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px 14px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">🎮 Tùy Chọn Trải Nghiệm</div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none;">
              <span>🔊 Hiệu ứng âm thanh & BGM</span>
              <input type="checkbox" id="chkSettingSound" ${e?"checked":""} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--gold);" />
            </label>
            <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none;">
              <span>⚡ Rung màn hình khi chấn động & Lôi Kiếp</span>
              <input type="checkbox" id="chkSettingShake" ${o?"checked":""} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--gold);" />
            </label>
            <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none;">
              <span>🔔 Bật thông báo nổi (Toasts)</span>
              <input type="checkbox" id="chkSettingToast" ${p?"checked":""} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--gold);" />
            </label>
          </div>
        </div>

        <!-- Danger Zone / Logout -->
        <div style="background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 12px 14px; display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--red); text-transform: uppercase; letter-spacing: 0.5px;">🚪 Phiên Đăng Nhập</div>
          <div style="font-size: 12px; color: var(--text-dim);">
            Đăng xuất sẽ kết thúc phiên tu luyện hiện tại trên trình duyệt này và quay về cổng kết giới đăng nhập.
          </div>
          <button class="btn btn--red" id="btnModalLogout" style="margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px; font-weight: 700;">
            🚪 Đăng Xuất Tài Khoản
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(t);const f=()=>t.remove();(u=t.querySelector("#btnCloseSettingsModal"))==null||u.addEventListener("click",f),t.addEventListener("click",v=>{v.target===t&&f()});const r=v=>{v.key==="Escape"&&(f(),window.removeEventListener("keydown",r))};window.addEventListener("keydown",r),(x=t.querySelector("#chkSettingSound"))==null||x.addEventListener("change",v=>{localStorage.setItem("rpg_sound_enabled",v.target.checked),J(v.target.checked?"Đã bật hiệu ứng âm thanh":"Đã tắt hiệu ứng âm thanh","info")}),($=t.querySelector("#chkSettingShake"))==null||$.addEventListener("change",v=>{localStorage.setItem("rpg_shake_enabled",v.target.checked),J(v.target.checked?"Đã bật rung màn hình":"Đã tắt rung màn hình","info")}),(h=t.querySelector("#chkSettingToast"))==null||h.addEventListener("change",v=>{localStorage.setItem("rpg_toast_enabled",v.target.checked)}),(l=t.querySelector("#btnModalLogout"))==null||l.addEventListener("click",()=>{f(),Et()})}te();
//# sourceMappingURL=index-HhZqkW5B.js.map
