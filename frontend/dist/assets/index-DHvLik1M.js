(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))o(p);new MutationObserver(p=>{for(const f of p)if(f.type==="childList")for(const r of f.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(p){const f={};return p.integrity&&(f.integrity=p.integrity),p.referrerPolicy&&(f.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?f.credentials="include":p.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function o(p){if(p.ep)return;p.ep=!0;const f=e(p);fetch(p.href,f)}})();const Pt="/api";class It{async request(t,e={}){try{const o=await fetch(`${Pt}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),p=await o.json();if(!o.ok)throw new Error(p.error||`HTTP ${o.status}`);return p}catch(o){throw console.error(`API Error [${t}]:`,o),o}}register(t,e,o,p){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:o,gender:p})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,o=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:o})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,o=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:o})})}toggleAura(t,e){return this.request(`/player/${t}/skills/toggle-aura`,{method:"POST",body:JSON.stringify({auraId:e})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,o=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:o})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCraftingMastery(t){return this.request(`/player/${t}/crafting-mastery`)}getMonsterMastery(t){return this.request(`/player/${t}/monster-mastery`)}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,o,p=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:o,lockAffixIndex:p})})}enrollNode(t,e,o){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:o})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,o){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:o})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,o,p){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:o,amount:p})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,o=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${o}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,o,p){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:o,message:p})})}getMarketListings(t="",e="newest"){const o=new URLSearchParams;return t&&o.set("type",t),e&&o.set("sort",e),this.request(`/market?${o.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,o,p,f){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:o,quantity:p,price:f})})}buyFromMarket(t,e,o=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:o})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}getTribulationPreview(t){return this.request(`/player/${t}/tribulation-preview`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,o){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:o})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,o,p){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:o,description:p})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,o,p=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:o,lockAffixIndex:p})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,o,p=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:o,quantity:p})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,o,p=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:o,durationHours:p})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,o=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:o})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const D=new It;function Mt(n,t){var E,P,M,O,q;const{state:e,api:o,notify:p,renderGame:f,updateSidebar:r}=t,l=e.player,g=e.exploration?e.exploration[l.currentArea||"thanh_lam_tran"]:null,y=g?g.name:"Vùng Đất Vô Danh",$=g&&(g.staminaCost||g.stamina_cost)||10,u=(g==null?void 0:g.rates)||[],c=((E=u.find(k=>k.type==="herb"))==null?void 0:E.weight)||0,v=((P=u.find(k=>k.type==="mineral"))==null?void 0:P.weight)||0,b=((M=u.find(k=>k.type==="monster"))==null?void 0:M.weight)||0,h=(g==null?void 0:g.specialtyNames)||[];n.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${y}</h1>
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
        <div class="flex gap-2 justify-center flex-wrap mb-sm text-xs">
          <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">🌿 Thảo Dược: ~${c}%</span>
          <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.3);">⛏️ Mạch Khoáng: ~${v}%</span>
          <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);">👾 Yêu Thú: ~${b}%</span>
        </div>
        ${h.length?`
          <div class="text-xs mb-md" style="color: #facc15; background: rgba(234, 179, 8, 0.08); border: 1px dashed rgba(234, 179, 8, 0.3); border-radius: 6px; padding: 5px 12px; display: inline-block;">
            💎 <strong>Đặc Thù Bản Đồ:</strong> ${h.join(" · ")}
          </div>
        `:""}
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
    </div>`;const d=((O=l.insightLevels)==null?void 0:O.monster)??0,a=async()=>{try{const k=await o.getAreaMonsters(l.id);if(k.monsters){e.player.trackedMonsters=k.monsters;const I=document.getElementById("trackedMonstersList");if(!I)return;if(k.monsters.length===0){I.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}I.innerHTML=k.monsters.map(C=>{const B=C.currentHp/C.stats.hp*100,R=B>60?"var(--green)":B>30?"var(--orange)":"var(--red)";let K='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';d>=1&&(K=`<div class="item-desc text-sm text-dim mb-sm">${C.description||"Yêu thú vùng này."}</div>`);let z="";d>=1&&(z=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${B}%; background: ${R}; height: 100%;"></div>
            </div>`);let N=d>=2?`❤ ${C.currentHp}/${C.stats.hp}`:d>=1?"❤ ???":"";return`
            <div class="monster-card ${C.is_boss?"boss":""}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${C.icon||"👾"}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${C.is_boss?"var(--red)":"var(--text-bright)"}; font-size: 15px;">${C.name}</span>
                    <span class="badge ${C.is_boss?"bg-red":"bg-darker"}">Cấp ${C.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${R};">${N}</div>
                </div>
                ${z}
                ${K}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${C.instance_id}" data-monster-id="${C.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),I.querySelectorAll(".btnTrackedCombat").forEach(C=>{C.addEventListener("click",B=>{const R=B.currentTarget.dataset.monsterId,K=B.currentTarget.dataset.instanceId;pt(t,R,K)})})}}catch(k){console.error(k)}},s=async()=>{try{const k=await o.getAreaMonsterTemplates(l.currentArea||"thanh_lam_tran");if(k.monsters){const I=document.getElementById("areaMonstersList");if(!I)return;if(k.monsters.length===0){I.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}I.innerHTML=k.monsters.map(C=>`
            <div style="display: flex; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div style="font-size: 24px; width: 36px; text-align: center;">${C.icon||"👾"}</div>
              <div style="flex: 1;">
                <div class="flex items-center gap-2">
                  <span class="bold" style="color: ${C.isBoss?"var(--red)":"var(--text-bright)"}; font-size: 13px;">${C.name}</span>
                  <span class="badge ${C.isBoss?"bg-red":"bg-darker"} text-xs">Cấp ${C.level}</span>
                </div>
                <div class="text-xs text-dim">${C.description||"Yêu thú sinh sống tại khu vực này."}</div>
              </div>
            </div>
          `).join("")}}catch(k){console.error(k)}};a(),s(),(q=document.getElementById("btnExplore"))==null||q.addEventListener("click",()=>ct(t));let m=!1;const i=document.getElementById("btnAutoBattle"),x=document.getElementById("btnStopAuto"),T=document.getElementById("panelKhamPha"),L=document.querySelector(".toggle-auto-combat"),w=document.getElementById("autoCombatStatus");i&&i.addEventListener("click",()=>{m=!0,T.style.display="none",L.style.display="block",S()}),x&&x.addEventListener("click",()=>{m=!1,T.style.display="block",L.style.display="none"});async function S(){var B,R,K,z,N,_,V,Q,U,F;let k=0,I=0,C=0;for(;m;){w.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${k} trận | +${I} XP | +${C} Linh Thạch</div>
        `;const j=e.player;if((j.currentStamina||0)<$){w.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",m=!1;break}if(j.currentHp/j.maxHp<.2){w.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",m=!1;break}try{const A=await o.explore(e.playerId);if(e.player=A.player,r(),A.event&&(A.event.type==="monster"||A.event.type==="worldBoss")){if(w.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${A.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(Ht=>setTimeout(Ht,600)),!m)break;const G=await o.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:A.event.monsterId})});if(e.player=G.player,r(),G.outcome==="win")k++,I+=((B=G.rewards)==null?void 0:B.xp)||0,C+=((R=G.rewards)==null?void 0:R.gold)||0,w.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(K=G.monster)==null?void 0:K.name}! (+${((z=G.rewards)==null?void 0:z.xp)||0} XP, +${((N=G.rewards)==null?void 0:N.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${k} | Tiếp tục sau 1s...</div>
                   `;else{w.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${G.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,m=!1;break}}else if(A.event&&A.event.type==="monster_ambush"&&A.event.combatResult){const G=A.event.combatResult;if(G.outcome==="win")k++,I+=((_=G.rewards)==null?void 0:_.xp)||0,C+=((V=G.rewards)==null?void 0:V.gold)||0,w.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(Q=G.monster)==null?void 0:Q.name}! (+${((U=G.rewards)==null?void 0:U.xp)||0} XP)</div>`;else{w.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",m=!1;break}}else w.innerHTML=`<div class='text-blue'>${((F=A.event)==null?void 0:F.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(A){w.innerHTML=`<div class='text-red'>Lỗi: ${A.message}. Dừng tự động.</div>`,m=!1;break}await new Promise(A=>setTimeout(A,1200))}}}async function ct(n){var l,g,y;const{state:t,api:e,notify:o,updateSidebar:p}=n,f=document.getElementById("exploreResult");if(!f)return;const r=document.getElementById("btnExplore");r&&(r.disabled=!0,r.style.opacity="0.6"),f.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const $=await e.explore(t.playerId);t.player=$.player,p();const u=$.event,c=$.cost||10,v=$.player.currentStamina??0,b=$.player.maxStamina??100,h=v>=c;let d=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
          <div style="margin-bottom: 10px;">
            <span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px;">
              🏃 -${c} Thể Lực (Hiện có: ${v}/${b})
            </span>
          </div>
    `;if(u.type==="monster")d+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${u.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${u.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${u.monsterId}">👣 Theo Dõi</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${h?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(u.type==="monster_ambush"&&u.combatResult){const a=u.combatResult,s=gt(a.log||[]),m=a.outcome==="win"?"🏆 Chiến thắng!":a.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",i=a.outcome==="win"?"var(--green)":a.outcome==="loss"?"var(--red)":"var(--orange)";d+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${u.message}</div>
        <div style="font-size:16px;font-weight:700;color:${i};margin-bottom:12px">${m}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${s}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${h?"":"disabled"}>🔍 Dò Thám Tiếp (-${c} TL)</button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(u.type==="worldBoss")d+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${u.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${u.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${u.monsterId}">👣 Ghi Dấu</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${h?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(u.type==="npc"&&u.npcId)d+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${u.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${u.message}</div>
        <div class="text-sm text-dim mb-md">${u.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnNpcInteract">💬 Bái Kiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreAgain" ${h?"":"disabled"}>🔍 Dò Tiếp</button>
          <button class="btn btn--dark" id="btnExploreContinue">Đóng</button>
        </div>
      `;else if(u.type==="player_encounter"&&u.targetPlayer){const a=u.targetPlayer;d+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${a.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${a.realmTierName||"Phàm nhân"} · Cấp ${a.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${a.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${a.id}">⚔️ Cướp Bóc</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${h?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `}else if(u.type==="herb"){const a=u.isCritical;d+=`
        <div style="font-size: 44px; margin-bottom: 6px;">🌿</div>
        <div class="badge ${a?"badge--gold":"badge--green"} mb-xs" style="font-size: 11px; padding: 3px 10px; text-transform: uppercase;">
          ${a?"🌟 BỘI THU DƯỢC LIỆU (BẠO KÍCH)":"🌿 DƯỢC THẢO THIÊN NHIÊN"}
        </div>
        <div class="text-lg ${a?"text-gold":"text-bright"} bold mb-sm">${u.message}</div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 400px;">
          <div class="text-md bold" style="color: #34d399;">+${u.quantity} ${u.itemName||"Linh Thảo"}</div>
          ${u.bonusGold?`<div class="text-sm text-gold mt-xs">+${u.bonusGold} 💎 Linh Thạch thô (Thưởng bạo kích)</div>`:""}
          <div class="text-xs text-dim mt-sm" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            🌿 Kỹ năng <strong>Hái Dược</strong>: Cấp ${u.skillLevel} <span style="color:#6ee7b7">(+${u.skillXpGained} XP)</span>
          </div>
          ${u.levelUp?`<div class="badge badge--gold mt-xs animate-bounce" style="font-size:11px;">🎉 Chúc mừng! Hái Dược thăng cấp ${u.levelUp.newLevel}!</div>`:""}
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${h?"":"disabled"}>
            ${h?`🔍 Dò Thám Tiếp (-${c} TL)`:`❌ Hết Thể Lực (${v}/${c})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(u.type==="mineral"){const a=u.isCritical;d+=`
        <div style="font-size: 44px; margin-bottom: 6px;">⛏️</div>
        <div class="badge ${a?"badge--gold":"badge--cyan"} mb-xs" style="font-size: 11px; padding: 3px 10px; background: ${a?"rgba(234, 179, 8, 0.2)":"rgba(6, 182, 212, 0.2)"}; color: ${a?"#facc15":"#22d3ee"}; border: 1px solid ${a?"rgba(234, 179, 8, 0.5)":"rgba(6, 182, 212, 0.4)"}; text-transform: uppercase;">
          ${a?"💎 MẠCH KHOÁNG ĐẠI PHÁT (BẠO KÍCH)":"⛏️ MẠCH KHOÁNG THIÊN ĐỊA"}
        </div>
        <div class="text-lg ${a?"text-gold":"text-bright"} bold mb-sm">${u.message}</div>
        <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 400px;">
          <div class="text-md bold" style="color: #38bdf8;">+${u.quantity} ${u.itemName||"Khoáng Thạch"}</div>
          ${u.bonusGold?`<div class="text-sm text-gold mt-xs">+${u.bonusGold} 💎 Tinh Thạch vụn (Thưởng bạo kích)</div>`:""}
          <div class="text-xs text-dim mt-sm" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            ⛏️ Kỹ năng <strong>Khai Khoáng</strong>: Cấp ${u.skillLevel} <span style="color:#7dd3fc">(+${u.skillXpGained} XP)</span>
          </div>
          ${u.levelUp?`<div class="badge badge--gold mt-xs animate-bounce" style="font-size:11px;">🎉 Chúc mừng! Khai Khoáng thăng cấp ${u.levelUp.newLevel}!</div>`:""}
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${h?"":"disabled"}>
            ${h?`🔍 Dò Thám Tiếp (-${c} TL)`:`❌ Hết Thể Lực (${v}/${c})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else u.type==="material"?d+=`
        <div style="font-size: 36px; margin-bottom: 6px;">📦</div>
        <div class="badge badge--dark mb-xs" style="font-size: 11px; padding: 3px 8px;">DÃ NGOẠI THU THẬP</div>
        <div class="text-lg text-bright bold mb-sm">${u.message}</div>
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; margin: 10px auto; max-width: 350px;">
          <div class="text-md bold text-green">+${u.quantity||1} ${u.itemName||u.itemId}</div>
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${h?"":"disabled"}>
            ${h?`🔍 Dò Thám Tiếp (-${c} TL)`:`❌ Hết Thể Lực (${v}/${c})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `:d+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${u.message}</div>
        ${u.gold?`<div class="text-gold bold">+${u.gold} 💎 Linh Thạch</div>`:""}
        ${u.item?`<div class="text-green bold">+1 ${u.item.name}</div>`:""}
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${h?"":"disabled"}>
            ${h?`🔍 Dò Thám Tiếp (-${c} TL)`:`❌ Hết Thể Lực (${v}/${c})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `;d+="</div></div>",f.innerHTML=d,(u.type==="monster"||u.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",a=>{f.innerHTML="",pt(n,a.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async a=>{try{const s=await e.trackMonster(t.playerId,a.target.dataset.mid);s.success?(o(s.message,"success"),f.innerHTML="",typeof n.renderGame=="function"&&n.renderGame()):s.error&&o(s.error,"error")}catch(s){o("Lỗi theo dõi: "+s.message,"error")}})),u.type==="npc"&&u.npcId&&((l=document.getElementById("btnNpcInteract"))==null||l.addEventListener("click",async()=>{await Nt(n,u.npcId,f)})),(g=document.getElementById("btnExploreAgain"))==null||g.addEventListener("click",()=>{ct(n)}),(y=document.getElementById("btnExploreContinue"))==null||y.addEventListener("click",()=>{f.innerHTML=""})}catch($){f.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${$.message}</div></div>`}finally{r&&(r.disabled=!1,r.style.opacity="1")}}async function Nt(n,t,e){const{state:o,api:p,notify:f,renderGame:r}=n,l=document.getElementById("npcQuestModal")||e;try{const y=(await p.getNpc(t)).npc;if(!y)return;const $=(o.player.activeQuests||[]).map(c=>c.quest_id);let u=y.quests.map(c=>{const v=$.includes(c.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${c.name}</span>
            <span class="text-xs badge" style="background:${c.type==="kill"?"var(--red)":"var(--green)"}">${c.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${c.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${c.rewards.gold?c.rewards.gold+"💎 ":""}${c.rewards.xp?c.rewards.xp+"✨ ":""}${c.rewards.skillChance?"🎯 "+c.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${v?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${c.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");l.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${y.icon||"🧓"} ${y.name} <span class="subtitle">${y.profession}</span></div>
        <div class="panel-body">
          ${u||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,l.querySelectorAll(".btn-accept-quest").forEach(c=>{c.addEventListener("click",async()=>{c.disabled=!0,c.textContent="⏳...";try{const v=await p.acceptQuest(o.playerId,c.dataset.npc,c.dataset.qid);o.player=v.player,f(v.message,"success"),r()}catch(v){f(v.message||"Lỗi nhận quest","error"),c.disabled=!1,c.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(g){console.error("NPC load error:",g)}}async function pt(n,t,e=null){var y,$;const{state:o,api:p,notify:f,updateSidebar:r,renderGame:l}=n,g=document.getElementById("combatResult");if(g){if(!o.player.currentHp||o.player.currentHp<=0)return f("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(o.player.hospitalRemaining>0)return f(`Đang tịnh dưỡng! Còn ${o.player.hospitalRemaining}s`,"error");g.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,g.scrollIntoView({behavior:"smooth"});try{const u=await p.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:o.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(o.player=u.player,u.outcome==="no_energy"){g.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${u.log[0]}</div></div>`,r();return}const c=u.monster,v=Math.max(0,o.player.currentHp/o.player.maxHp*100),b=Math.max(0,c.currentHp/c.maxHp*100),h={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},d=h[u.outcome]||h.loss,a=(y=u.rewards)!=null&&y.gold?` · +${u.rewards.gold} 💎`:"",s=u.rewards?` · +${u.rewards.xp} XP${a}`:"",m={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[u.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};g.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${d.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${d.icon}</span> <span>${d.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${u.turns}/${u.maxTurns||25} Lượt ${s}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.9) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright); font-size: 15px; margin-bottom: 2px;">${o.player.name}</div>
              <div style="font-size: 11px; color: ${m.color}; font-weight: 600; margin-bottom: 8px;">
                ${m.icon} ${m.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${v}%; height: 100%; background: ${v>50?"var(--green)":v>20?"var(--orange)":"var(--red)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${o.player.currentHp}/${o.player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(251,191,36,0.5); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${($=u.glitchEvents)!=null&&$.length?u.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${c.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${c.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${c.level||1} · ${c.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${b}%; height: 100%; background: ${b>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${c.currentHp}/${c.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${u.weakpoint?`
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${u.weakpoint}</strong> (x2.5 Dmg)
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
            ${gt(u.log)}
          </div>
        </div>
      </div>`;const i=document.getElementById("cardMonster"),x=document.getElementById("cardPlayer");u.glitchEvents&&u.glitchEvents.length>0&&i?u.glitchEvents.forEach((T,L)=>{setTimeout(()=>{ot(i,`-${T.damage} 🌌 [VẾT NỨT]`,"glitch"),i.classList.add("shake"),setTimeout(()=>i.classList.remove("shake"),400)},L*400+200)}):i&&u.rewards&&ot(i,`-${Math.round(c.maxHp*.4)} 💥`,"crit"),r(),e&&typeof l=="function"&&setTimeout(()=>l(),1500)}catch(u){g.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${u.message}</div></div>`}}}function ot(n,t,e="normal"){if(!n)return;const o=document.createElement("div");o.className=`floating-damage damage-${e}`,o.textContent=t,n.appendChild(o),setTimeout(()=>o.remove(),1100)}function gt(n){return(n||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("Kích Hoạt")||t.includes("Xuất chiêu")?`<div class="skill-proc" style="color:#38bdf8;font-weight:700;background:rgba(56,189,248,0.12);padding:3px 8px;border-radius:4px;margin:2px 0;border-left:3px solid #38bdf8;">${t}</div>`:t.includes("thường công")?`<div class="normal-attack" style="color:var(--text-dim);font-style:italic;margin:2px 0;">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function rt(n,t){const{state:e,api:o,notify:p}=t,f=e.player,r=(f.skills||[]).find(u=>(typeof u=="string"?u:u.id)==="nhan_thuat"),l=r?r.level||1:0,g=[...e.skills].sort((u,c)=>(u.tier||1)-(c.tier||1)),y=(f.skills||[]).map(u=>typeof u=="string"?u:u.id),$={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};n.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${l}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${g.map(u=>{const c=y.includes(u.id),v=u.tier||1,b=v>l+1,h=v<=l;let d="";return u.requirements&&u.requirements.length>0?h||c?d=`<div class="mt-sm text-xs text-orange">Điều kiện: ${u.requirements.map(a=>`<br>• ${a}`).join("")}</div>`:b?d=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${v}.</div>`:d='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':d='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${c?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${u.name} ${c?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${c?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${$[v]||v}</span>
                    <span class="text-xs text-dim">${u.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${h||c?u.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${u.type!=="passive"&&u.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${u.cost} linh lực</div>`:""}
                
                ${d}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${c?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${b?"btn--dark":"btn--gold"} btn--sm btn-learn" ${b?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${u.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,n.querySelectorAll(".accordion-header").forEach(u=>{u.addEventListener("click",()=>{const c=u.nextElementSibling;c.style.display==="none"?(c.style.display="block",u.querySelector("div:last-child").textContent="▲"):(c.style.display="none",u.querySelector("div:last-child").textContent="▼")})}),n.querySelectorAll(".btn-learn").forEach(u=>{u.addEventListener("click",async c=>{c.stopPropagation();try{const v=await o.learnSkill(f.id,u.dataset.sid);v.error?p(v.error,"error"):(e.player=v.player,p(v.message,"success"),rt(n,t))}catch(v){p("Lỗi học kỹ năng: "+v.message,"error")}})})}async function ut(n){const{state:t,api:e,notify:o,updateSidebar:p,renderGame:f}=n,r=t.player;if(!r)return;let l=document.getElementById("tribulation-modal-overlay");l||(l=document.createElement("div"),l.id="tribulation-modal-overlay",l.style.cssText=`
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px); z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      padding: 16px; animation: fadeIn 0.25s ease;
    `,document.body.appendChild(l)),l.innerHTML=`
    <div style="background: #121420; border: 2px solid #eab308; border-radius: 14px; max-width: 580px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(234, 179, 8, 0.2); padding: 24px; text-align: center; color: #fff;">
      <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚡</div>
      <div style="font-size: 16px; font-weight: 700; color: #eab308; margin-top: 8px;">Đang dò xét Thiên Khí & Thăm Dò Thiên Kiếp...</div>
    </div>
  `;try{const g=await e.getTribulationPreview(r.id);qt(l,g,n)}catch(g){l.remove(),o(g.message||"Không thể tra cứu thông tin Lôi Kiếp","error")}}function qt(n,t,e){var u,c,v;const{state:o,api:p,notify:f,updateSidebar:r,renderGame:l}=e,g=t.tribulation||{},y=t.playerStats||{},$=g.color||"#eab308";n.innerHTML=`
    <div style="background: #111422; border: 2px solid ${$}; border-radius: 14px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 12px 50px rgba(0,0,0,0.95), 0 0 35px ${$}44; color: #fff; animation: scaleUp 0.25s ease;">
      <!-- HEADER -->
      <div style="padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: linear-gradient(135deg, ${$}22, rgba(0,0,0,0.6)); text-align: center; position: relative;">
        <span style="position: absolute; top: 16px; right: 20px; font-size: 20px; cursor: pointer; color: var(--text-dim);" id="btn-close-tribulation">✕</span>
        <div style="font-size: 28px; line-height: 1;">🌩️</div>
        <div style="font-size: 20px; font-weight: 800; color: ${$}; margin-top: 6px; letter-spacing: 0.5px;">
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
            <div style="font-size: 18px; font-weight: 800; color: ${$}; margin-top: 2px;">${g.waves||3} Đợt</div>
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
              <span style="font-weight: 700; color: #10b981;">${y.currentHp}/${y.maxHp} HP</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🔵 Chân Khí Hộ Thể:</span>
              <span style="font-weight: 700; color: #38bdf8;">${y.usableEnergy} LL (1 LL = 2.5 HP)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🛡️ Giáp Giảm Thương:</span>
              <span style="font-weight: 700; color: #60a5fa;">-${y.defenseMitigationPct||0}% ST cơ thể</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">💨 Thân Pháp Chẻ Sét:</span>
              <span style="font-weight: 700; color: #a78bfa;">${y.dodgeChancePct||0}% né (-40% ST)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span class="text-dim">🌟 Hộ Thể Kim Chung:</span>
              <span style="font-weight: 700; color: ${y.hasGoldenBell?"#10b981":"var(--text-dim)"};">
                ${y.hasGoldenBell?"✅ Giảm thêm 20% Lôi Kiếp":"❌ Chưa kích hoạt"}
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
  `,(u=n.querySelector("#btn-close-tribulation"))==null||u.addEventListener("click",()=>n.remove()),(c=n.querySelector("#btn-cancel-tribulation"))==null||c.addEventListener("click",()=>n.remove()),(v=n.querySelector("#btn-start-tribulation"))==null||v.addEventListener("click",async()=>{await zt(n,e,g)})}async function zt(n,t,e){var d,a,s;const{state:o,api:p,notify:f,updateSidebar:r,renderGame:l}=t,g=e.color||"#eab308";n.innerHTML=`
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
  `;const y=n.querySelector("#tribulation-log-stream"),$=n.querySelector("#tribulation-wave-indicator"),u=n.querySelector("#tri-hp-bar"),c=n.querySelector("#tri-energy-bar"),v=n.querySelector("#tri-hp-val"),b=n.querySelector("#tri-energy-val"),h=n.querySelector("#tribulation-footer");try{const m=await p.attemptBreakthrough(o.playerId),i=m.tribulation;if(!i||!i.logs){m.player&&(o.player=m.player),f(m.message,m.success?"success":"error"),typeof r=="function"&&r(),n.remove(),l();return}let x=((d=m.player)==null?void 0:d.maxHp)||i.startingHp,T=i.startingHp,L=i.startingEnergy,w=((a=m.player)==null?void 0:a.maxEnergy)||Math.max(50,i.startingEnergy);v.textContent=`${T}/${x}`,b.textContent=`${L}`;const S=i.logs||[];for(let E=0;E<S.length;E++){const P=S[E];await new Promise(k=>setTimeout(k,900)),$.textContent=`ĐỢT ${P.wave}/${i.totalWaves} ĐANG GIÁNG XUỐNG!`,$.style.color="#ef4444",n.style.backgroundColor="rgba(255, 255, 255, 0.2)",setTimeout(()=>{n.style.backgroundColor="rgba(0, 0, 0, 0.88)"},80);const M=document.createElement("div");M.style.cssText=`
        padding: 8px 12px; border-radius: 6px;
        background: ${P.defeated?"rgba(239, 68, 68, 0.2)":"rgba(255, 255, 255, 0.05)"};
        border-left: 3px solid ${P.defeated?"#ef4444":P.dodged?"#a78bfa":g};
        animation: fadeIn 0.3s ease;
      `,M.innerHTML=`
        <div style="font-weight: 700; color: ${g}; margin-bottom: 2px;">
          ⚡ Đợt ${P.wave}/${i.totalWaves}: Sét Uy Lực ${P.rawDamage} ST
        </div>
        <div style="color: #e2e8f0; font-size: 12px;">${P.text}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 11px;">
          ${P.dodged?'<span style="color: #a78bfa;">💨 Chẻ sét né tránh</span>':""}
          ${P.auraMitigated?'<span style="color: #10b981;">🛡️ Kim Chung hóa giải</span>':""}
          ${P.absorbedByQi>0?`<span style="color: #38bdf8;">🔵 Chân khí hấp thụ: ${P.absorbedByQi} ST</span>`:""}
          <span style="color: #f87171;">💥 Thương tổn: -${P.actualHpDamage} HP</span>
          ${P.medicineRescued?'<span style="color: #f59e0b; font-weight:700;">💊 Dùng đan dược cứu mệnh!</span>':""}
        </div>
      `,y.appendChild(M),y.scrollTop=y.scrollHeight,T=P.hpRemaining,L=P.energyRemaining;const O=Math.max(0,Math.min(100,Math.round(T/x*100))),q=Math.max(0,Math.min(100,Math.round(L/w*100)));if(u.style.width=`${O}%`,c.style.width=`${q}%`,v.textContent=`${T}/${x}`,b.textContent=`${L}`,P.defeated)break}if(await new Promise(E=>setTimeout(E,800)),m.player&&(o.player=m.player),typeof r=="function"&&r(),i.survived){$.textContent="🌟 LÔI VÂN TAN BIẾN • ĐỘ KIẾP VIÊN MÃN",$.style.color="#10b981";const E=document.createElement("div");E.style.cssText=`
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(16, 185, 129, 0.2));
        border: 2px solid #eab308; border-radius: 8px; padding: 14px; text-align: center;
        margin-top: 8px; animation: scaleUp 0.3s ease;
      `,E.innerHTML=`
        <div style="font-size: 24px;">👑</div>
        <div style="font-size: 16px; font-weight: 800; color: #eab308; margin-top: 4px;">
          ĐỘT PHÁ THÀNH CÔNG!
        </div>
        <div style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
          ${m.message}
        </div>
      `,y.appendChild(E),y.scrollTop=y.scrollHeight,h.innerHTML=`
        <button class="btn btn--gold btn--lg shadow-glow" id="btn-finish-tribulation" style="min-width: 200px; font-weight: 700;">
          🌟 ĐÓN NHẬN TIÊN PHÁP
        </button>
      `,f(m.message,"success")}else{$.textContent="☠️ TRỌNG THƯƠNG • ĐỘT PHÁ THẤT BẠI",$.style.color="#ef4444";const E=document.createElement("div");E.style.cssText=`
        background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; border-radius: 8px;
        padding: 14px; text-align: center; margin-top: 8px; animation: scaleUp 0.3s ease;
      `,E.innerHTML=`
        <div style="font-size: 24px;">☠️</div>
        <div style="font-size: 15px; font-weight: 800; color: #ef4444; margin-top: 4px;">
          ĐỘT PHÁ THẤT BẠI!
        </div>
        <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
          ${m.message}
        </div>
      `,y.appendChild(E),y.scrollTop=y.scrollHeight,h.innerHTML=`
        <button class="btn btn--dark" id="btn-finish-tribulation" style="min-width: 180px;">
          🏥 VỀ DƯỠNG THƯƠNG
        </button>
      `,f(m.message,"error")}(s=n.querySelector("#btn-finish-tribulation"))==null||s.addEventListener("click",()=>{n.remove(),l()})}catch(m){f(m.message||"Lỗi trong quá trình độ kiếp","error"),n.remove(),l()}}function _t(n,t){var v,b,h;const{state:e,api:o,notify:p,renderGame:f}=t,r=e.player,l=r.stats,g=r.allocatedStats||{},y=5,$=r.currentEnergy>=y&&!r.hospitalRemaining,u=r.talentDisplay||{},c=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];n.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${r.currentEnergy}/${r.maxEnergy} linh lực · Chi phí: ${y}/lần</span>
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
          ${(b=r.realmInfo)!=null&&b.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${c.map(([d,a,s])=>{const m=u[d]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${m.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${a}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${s}</div>
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
        ${c.map(([d,a,s,m])=>{const i=u[d]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},x=Math.floor(r.currentEnergy/y)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${a}</span> ${s}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${m}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${l[d]??0}</span>
              ${g[d]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${g[d]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${i.color};min-width:50px" title="Căn Cốt: ${i.name} (×${i.value})">${i.icon}×${i.value}</span>
              <input type="number" class="train-count" data-stat="${d}" min="1" max="${x}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${$?"":"disabled"}>
              <button class="btn btn--sm ${$?"btn--blue":"btn--dark"} train-btn" data-train="${d}" ${$?"":"disabled"} title="Tốn ${y} Linh lực/lần · Căn cốt ×${i.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${y} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(r.currentEnergy/y)}</strong> lần hiện tại.
        </div>
        <div class="derived-row mt-3 border-t border-dim pt-3">
          <div class="d-item"><div class="d-val">${l.maxHp??100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${l.maxEnergy??50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${l.energyRegen??5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row pb-3">
          <div class="d-item"><div class="d-val">${l.critChance??5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${l.critMultiplier??1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Khí/đòn</div></div>
        </div>
      </div>
    </div>`,(h=n.querySelector(".btn-breakthrough"))==null||h.addEventListener("click",()=>{ut(t)}),n.querySelectorAll(".train-btn").forEach(d=>{d.addEventListener("click",async a=>{a.stopPropagation();const s=n.querySelector(`.train-count[data-stat="${d.dataset.train}"]`),m=parseInt(s==null?void 0:s.value)||1;try{const i=await o.trainStat(e.playerId,d.dataset.train,m);e.player=i.player,p(i.message,"success"),f()}catch(i){p(i.message||"Lỗi rèn luyện","error")}})})}async function ht(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.player;if(r){n.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const g=(await o.getGlitches(r.id)).status,y=n.querySelector("#glitchContentWrapper");if(!y)return;if(!g.featureUnlocked){Bt(y,g.featureDetails,r);return}Rt(y,g,r,t)}catch(l){n.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${l.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function Bt(n,t,e){const o=(t==null?void 0:t.requirements)||[];n.innerHTML=`
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
  `}function Rt(n,t,e,o){const{api:p,notify:f,updateSidebar:r}=o,l=t.imprints||[],g=t.stances||{},y=t.activeStance||"breaker";n.innerHTML=`
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
  `;const $=n.querySelector("#btnOverrideTribulation");$&&($.onclick=async()=>{$.disabled=!0,$.textContent="Đang lách luật...";try{const u=await p.overrideTribulation(e.id);f(u.message,"success"),state.player=u.player,r(),ht(n.parentElement,o)}catch(u){f(u.message||"Thao tác lách luật thất bại!","error"),$.disabled=!1,$.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),vt(n,g,y,e,p,f,r),mt(n,l,e,f,r)}function vt(n,t,e,o,p,f,r){const l=n.querySelector("#stanceContainer");l&&(l.innerHTML="",Object.values(t).forEach(g=>{const y=g.isUnlocked!==!1,$=g.id===e,u=document.createElement("div");u.style.cssText=`
      background: ${$?"rgba(168, 85, 247, 0.15)":y?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${$?"#c084fc":y?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${y?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${y?"1":"0.55"};
    `,u.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${y?g.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${y?g.icon:"🔒"}</span> ${g.name}
        </div>
        ${$?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${y?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${y?g.description:`<span style="color:#f59e0b;">${g.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,u.onclick=async()=>{if(!y)return f(g.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!$)try{const c=await p.setStance(o.id,g.id);f(c.message,"success"),state.player=c.player,r(),vt(n,t,g.id,o,p,f,r)}catch(c){f(c.message||"Chuyển thế thất bại","error")}},l.appendChild(u)}))}function mt(n,t,e,o,p){const f=n.querySelector("#imprintsContainer");f&&(f.innerHTML="",t.forEach(r=>{const l=document.createElement("div"),g=r.fogLevel||(r.isUnlocked?"revealed":"fog");let y="rgba(15, 23, 42, 0.5)",$="rgba(255,255,255,0.08)",u="none";g==="revealed"?(y="rgba(30, 41, 59, 0.75)",$=r.color,u=`0 0 12px ${r.color}33`):g==="partial"?(y="rgba(24, 24, 27, 0.6)",$="1px dashed rgba(168, 85, 247, 0.4)"):(y="rgba(10, 10, 15, 0.5)",$="1px dashed rgba(255, 255, 255, 0.08)"),l.style.cssText=`
      background: ${y};
      border: 1px solid ${$};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${u};
      position: relative;
      overflow: hidden;
    `,l.innerHTML=`
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
    `;const c=l.querySelector(".btnSetTitle");c&&(c.onclick=()=>{e.activeTitle=r.title,o(`Đã kích hoạt danh hiệu: [${r.title}]!`,"success"),p(),mt(n,t,e,o,p)}),f.appendChild(l)}))}function et(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.player;if(!r)return;const l=r.skills||[],g=e.skills||[],y=(r.realmTier??1)>=2||(r.glitchInsight??0)>=20||(r.unlockedImprints||[]).length>0,u=(k=>{switch(k){case 1:return 2;case 2:return 3;case 3:return 4;case 4:return 5;default:return 6}})(r.realmTier||1),c=l.map(k=>{const I=typeof k=="string"?k:k.id;return{...g.find(B=>B.id===I)||{name:I,id:I,category:"combat",type:"active"},level:k.level||1,xp:k.xp||k.currentXp||0,equipped:k.equipped||k.isEquipped||!1}}),v=c.filter(k=>k.type!=="passive"),b=c.filter(k=>k.type==="passive"),h=v.filter(k=>k.equipped),d={combat:{icon:"⚔️",name:"Chiêu Thức",sub:`${v.length} chiêu • ${h.length}/${u} ô xuất`,badge:`${h.length}/${u}`},auras:{icon:"🧘",name:"Tâm Pháp & Hào Quang",sub:`Khóa ${r.reservationPct||0}% LL • ${(r.activeAuras||[]).length} Hào quang`,badge:`${r.reservationPct||0}%`},monsters:{icon:"🐺",name:"Thông Thạo Quái Vật",sub:"Bách thú đồ giám • Sát quái 5★",badge:"★"},crafting:{icon:"⚒️",name:"Thông Thạo Chế Tạo",sub:`Lv.${r.craftingLevel||1} • Đan đạo & Đúc rèn`,badge:`Lv.${r.craftingLevel||1}`}};let a=localStorage.getItem("activeSkillPillar")||"combat";["combat","auras","monsters","crafting","library","glitch"].includes(a)||(a="combat");let s="all",m="all",i=null,x=null;const T=(k,I)=>{var A;const C=(k.level||1)*100,B=Math.min(100,(k.xp||0)/C*100),R=k.type==="passive",K="★".repeat(Math.min(k.tier||1,7)),z=(k.tier||1)>=5?"var(--gold)":(k.tier||1)>=3?"var(--purple)":"var(--blue)";let N="";if(R)N='<span style="font-size:11px; font-weight:700; color:var(--green)">🧘 Tâm Pháp Thường Trực</span>';else if(k.equipped)N=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${k.id}">Tháo</button>`;else{const G=h.length<u;N=`<button class="btn btn--sm ${G?"btn--blue":"btn--outline"} equip-btn" data-eq="1" data-sid="${k.id}" ${G?"":'title="Đã đầy ô kỹ năng!"'}>Trang Bị</button>`}const _={1:55,2:45,3:40,4:35,5:30,6:25,7:20},V=k.triggerChance||_[k.tier||1]||40,Q=Math.floor((((A=r.stats)==null?void 0:A.dexterity)||10)/10),U=Math.max(0,(k.level||1)-1),F=r.activeStance==="breaker"?5:0,j=Math.min(85,Math.max(15,V+U+Q+F));return`
      <div class="skill-card  ${k.equipped&&!R?"equipped":""}">
        <div class="skill-card-header">
          <div>
            <div class="skill-card-name" style="font-size: 14px;">${k.name}</div>
            <div class="skill-card-tier" style="color:${z}">${K} Tầng ${k.tier||1} • ${R?"Tâm Pháp":"Chiêu Thức"}</div>
          </div>
          <div class="skill-card-action">${N}</div>
        </div>
        <div class="skill-card-desc">${k.description||"Tuyệt kỹ thượng thừa tu chân giới."}</div>
        ${`
          <div class="skill-card-mastery">
            <div class="skill-mastery-label">
              <span>Thông thạo Lv.${k.level}</span>
              <span class="text-dim">${k.xp}/${C} XP</span>
            </div>
            <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${B}%"></div></div>
            ${k.masteryBonus?`<div class="skill-mastery-bonus">✨ ${k.masteryBonus}</div>`:""}
          </div>
        `}
        ${R?"":`
          <div class="skill-card-cost" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-top:8px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.06);">
            <span>🔵 ${k.cost||0} Linh Lực</span>
            <span style="color:#f59e0b; font-weight:700;" title="Xác suất xuất chiêu: Cơ bản ${V}% + Cấp (+${U}%) + Mẫn tiệp (+${Q}%)${F?" + Thế phá quy (+5%)":""}">
              🎯 Xác suất xuất chiêu: ${j}%
            </span>
          </div>
        `}
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
        <button class="btn btn--sm ${a==="library"?"btn--gold":"btn--outline"}" id="btn-open-library">
          📚 Tàng Kinh Các
        </button>
        <button class="btn btn--sm ${a==="glitch"?"btn--purple":"btn--outline"}" id="btn-open-glitch">
          ${y?"🌌 Thiên Đạo Dị Biến":"🌫️ Kẽ Hở Quy Luật"}
        </button>
      </div>
    </div>

    <!-- 4 PILLARS SELECTOR -->
    <div class="pillar-tabs">
      ${Object.entries(d).map(([k,I])=>`
        <div class="pillar-tab ${a===k?"active":""}" data-pillar="${k}">
          <div class="pillar-icon">${I.icon}</div>
          <div class="pillar-info">
            <div class="pillar-name">${I.name}</div>
            <div class="pillar-sub">${I.sub}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `,w=()=>{var I;let k=v;return s==="equipped"&&(k=v.filter(C=>C.equipped)),s==="unequipped"&&(k=v.filter(C=>!C.equipped)),`
      <!-- LOADOUT SLOTS -->
      <div class="loadout-bar" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="font-weight: 700; color: var(--gold); font-size: 14px; display: flex; align-items: center; gap: 6px;">
            <span>⚔️ Ô Xuất Chiêu Thực Chiến:</span>
            <span style="color: #fff;">${h.length}/${u}</span>
          </div>
          <div class="text-dim text-xs" style="margin-top: 2px;">
            Cảnh giới hiện tại (${((I=r.realmInfo)==null?void 0:I.fullName)||"Phàm Cấp"}) cho phép trang bị tối đa <b>${u}</b> chiêu thức. Mỗi hiệp đấu sẽ tung xúc xắc theo <b>xác suất kích hoạt</b> và tiêu hao Linh Lực thực chiến.
          </div>
        </div>
        <div class="loadout-slots" style="display: flex; gap: 8px;">
          ${Array.from({length:u}).map((C,B)=>{const R=h[B];return R?`<div class="loadout-slot filled" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(59, 130, 246, 0.15); border: 1px solid var(--blue); border-radius: 6px; font-size: 18px; cursor: pointer;" title="${R.name} (Lv.${R.level})">⚔️</div>`:'<div class="loadout-slot" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; font-size: 14px; color: var(--text-dim);" title="Ô trống">➕</div>'}).join("")}
        </div>
      </div>

      <!-- FILTER TABS -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <button class="mastery-filter-btn ${s==="all"?"active":""}" data-sfilter="all">Tất Cả Chiêu Thức (${v.length})</button>
        <button class="mastery-filter-btn ${s==="equipped"?"active":""}" data-sfilter="equipped">Đã Trang Bị (${h.length})</button>
        <button class="mastery-filter-btn ${s==="unequipped"?"active":""}" data-sfilter="unequipped">Chưa Trang Bị (${v.length-h.length})</button>
      </div>

      <div class="skill-grid">
        ${k.length>0?k.map(C=>T(C)).join(""):'<div class="text-dim" style="padding: 20px;">Chưa có chiêu thức kích hoạt nào trong danh mục này. Hãy đến Tàng Kinh Các để thỉnh bí kíp!</div>'}
      </div>
    `},S=()=>{const k=r.auraConfigs||{ho_the_kim_chung:{id:"ho_the_kim_chung",name:"Hộ Thể Kim Chung",icon:"🛡️",reservationPct:20,desc:"Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp khi độ kiếp.",statBonuses:{defense:25,maxHp:100}},than_hanh_bo:{id:"than_hanh_bo",name:"Thần Hành Hào Quang",icon:"💨",reservationPct:15,desc:"Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.",statBonuses:{speed:20,dexterity:15}},hoa_diem_chan_khi:{id:"hoa_diem_chan_khi",name:"Hỏa Diễm Chân Khí",icon:"🔥",reservationPct:25,desc:"Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.",statBonuses:{strength:25,critChance:10}},toa_thien:{id:"toa_thien",name:"Toạ Thiền Tụ Khí",icon:"🧘",reservationPct:10,desc:"Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực (+5 HP & +2 TL / 10s).",statBonuses:{hpRegen:5,staminaRegen:2}}},I=r.activeAuras||[],C=r.reservedEnergy||0,B=r.usableEnergy??Math.max(0,r.maxEnergy-C),R=r.reservationPct||0,K=r.maxEnergy>0?Math.round(B/r.maxEnergy*100):100;return`
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
              Đã khóa: <b>${C}</b> LL (${R}% / 85% tối đa)
            </div>
          </div>
        </div>

        <!-- SPLIT RESERVATION BAR -->
        <div style="position: relative; height: 16px; background: rgba(0, 0, 0, 0.5); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; margin-bottom: 12px;">
          <div style="width: ${K}%; background: linear-gradient(90deg, #0284c7, #38bdf8); transition: width 0.4s ease;" title="Linh Lực Khả Dụng: ${B}"></div>
          <div style="width: ${R}%; background: linear-gradient(90deg, #d97706, #fbbf24); transition: width 0.4s ease;" title="Linh Lực Bị Khóa: ${C} (${R}%)"></div>
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
          <span class="text-dim text-xs font-normal">(${I.length}/${Object.keys(k).length} đang bật)</span>
        </div>

        <div class="skill-grid">
          ${Object.values(k).map(z=>{const N=I.includes(z.id),_=!N&&R+z.reservationPct>85;return`
              <div class="skill-card ${N?"equipped":""}" style="${N?"border-color: rgba(234, 179, 8, 0.6); box-shadow: 0 0 12px rgba(234, 179, 8, 0.15);":""}">
                <div class="skill-card-header">
                  <div>
                    <div class="skill-card-name" style="font-size: 14px; display: flex; align-items: center; gap: 6px;">
                      <span>${z.icon}</span>
                      <span>${z.name}</span>
                    </div>
                    <div class="skill-card-tier" style="color: #f59e0b;">Khóa ${z.reservationPct}% Linh Lực (${Math.floor(r.maxEnergy*(z.reservationPct/100))} LL)</div>
                  </div>
                  <div class="skill-card-action">
                    <button class="btn btn--sm ${N?"btn--gold":"btn--outline"} btn-toggle-aura" data-aura="${z.id}" ${_?'disabled title="Vượt quá 85% Linh Lực khóa tối đa!"':""}>
                      ${N?"✅ Đang Duy Trì":"🔘 Bật Hào Quang"}
                    </button>
                  </div>
                </div>
                <div class="skill-card-desc" style="margin-top: 6px;">${z.desc}</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                  ${Object.entries(z.statBonuses||{}).map(([V,Q])=>`
                    <span class="req-tag" style="background: rgba(234, 179, 8, 0.12); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.2);">
                      +${Q} ${V}
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
          <span class="text-dim text-xs font-normal">(${b.length} tâm pháp)</span>
        </div>

        ${b.length>0?`
          <div class="skill-grid">
            ${b.map(z=>T(z)).join("")}
          </div>
        `:`
          <div class="panel" style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 12px;">
            Chưa lĩnh ngộ tâm pháp bị động thường trực nào. Hãy đến Tàng Kinh Các để thỉnh giáo các bí kíp công pháp thượng thừa!
          </div>
        `}
      </div>
    `},E=()=>{if(!i)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `;const{totalKills:k,totalSpecies:I,tierCounts:C,monsters:B,tiers:R}=i,K=["all","Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh"],z=B.filter(N=>m==="all"?!0:(N.tierName||"").includes(m));return`
      <!-- BESTIARY HERO -->
      <div class="mastery-hero">
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${(k||0).toLocaleString()}</span>
          <span class="mastery-stat-label">Tổng Yêu Thú Đã Trảm</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${I||0}</span>
          <span class="mastery-stat-label">Loài Trong Giới Đồ</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #3b82f6;">${(C==null?void 0:C[1])||0}</span>
          <span class="mastery-stat-label">Chớm Ngộ (1★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #10b981;">${(C==null?void 0:C[2])||0}</span>
          <span class="mastery-stat-label">Thuần Thục (2★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #8b5cf6;">${(C==null?void 0:C[3])||0}</span>
          <span class="mastery-stat-label">Đại Thành (3★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #f59e0b;">${(C==null?void 0:C[4])||0}</span>
          <span class="mastery-stat-label">Khắc Chế (4★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #ef4444;">${(C==null?void 0:C[5])||0}</span>
          <span class="mastery-stat-label">Tuyệt Diệt (5★)</span>
        </div>
      </div>

      <!-- REALM FILTER -->
      <div class="mastery-filter-bar">
        <span class="text-dim text-xs" style="margin-right: 4px;">Cảnh Giới:</span>
        ${K.map(N=>`
          <button class="mastery-filter-btn ${m===N?"active":""}" data-mrealm="${N}">
            ${N==="all"?"Tất Cả":N}
          </button>
        `).join("")}
      </div>

      <!-- MONSTER CARDS GRID -->
      <div class="monster-grid">
        ${z.map(N=>{var F,j,A,G,X;const _=N.mastery||{},V=(_.tier||0)===0&&(_.kills||0)===0,Q=_.isMaxTier,U=_.badgeColor||"#6b7280";return`
            <div class="monster-mastery-card ${V?"fog":""} ${_.tier===5?"apex":""}">
              <div>
                <div class="monster-card-top">
                  <div>
                    <div class="monster-card-name">
                      <span>${V?"🌫️":"🐺"}</span>
                      <span>${N.name}</span>
                    </div>
                    <div class="text-dim text-xs" style="margin-top: 2px;">
                      ${N.tierName||"Phàm Cấp"} • Ngũ Hành: <b>${N.element||"Vô"}</b>
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
                ${Q?`
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
                ${V?`
                  <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin: 8px 0;">
                    🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá thông tin sinh mệnh và thuộc tính!
                  </div>
                `:`
                  <div class="monster-stats-box">
                    <div class="monster-stat-cell">HP: <b>${((F=N.stats)==null?void 0:F.hp)??0}</b></div>
                    <div class="monster-stat-cell">Công: <b>${((j=N.stats)==null?void 0:j.strength)??0}</b></div>
                    <div class="monster-stat-cell">Thủ: <b>${((A=N.stats)==null?void 0:A.defense)??0}</b></div>
                    <div class="monster-stat-cell">Tốc: <b>${((G=N.stats)==null?void 0:G.speed)??0}</b></div>
                    <div class="monster-stat-cell">Thân: <b>${((X=N.stats)==null?void 0:X.dexterity)??0}</b></div>
                    <div class="monster-stat-cell">XP: <b>+${N.xpReward??0}</b></div>
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
    `},P=()=>{if(!x)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `;const{craftingLevel:k,craftingXp:I,xpToNext:C,progressPercent:B,title:R,badgeColor:K,perks:z,recipes:N}=x;return`
      <!-- HERO BANNER -->
      <div class="crafting-hero">
        <div class="crafting-hero-header">
          <div class="crafting-hero-title">
            <span>🔥</span>
            <span>Thông Thạo Đan Đạo & Chế Tác</span>
          </div>
          <span class="crafting-rank-badge" style="background: ${K};">
            ${R} (Lv.${k})
          </span>
        </div>

        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
          <span>Kinh Nghiệm Luyện Chế: <b>${I} / ${C} XP</b></span>
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
          <span>📜 Đan Phương & Công Thức Chế Tác (${(N==null?void 0:N.length)||0})</span>
        </div>
        <div class="panel-body">
          <div class="shop-items-grid">
            ${(N||[]).map(_=>{const V=_.materials||[],Q=V.every(j=>{var A;return(((A=r.materials)==null?void 0:A[j.id])||0)>=j.amount}),U=(r.gold||0)>=(_.cost||0),F=Q&&U;return`
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
                    ${V.map(j=>{var X;const A=((X=r.materials)==null?void 0:X[j.id])||0;return`<span style="color: ${A>=j.amount?"var(--green)":"var(--red)"}; font-size: 11px;">• ${j.id} (${A}/${j.amount})</span>`}).join("<br/>")}
                  </div>
                  <div class="shop-item-footer">
                    <span class="text-xs text-dim">${_.craftTime?`Thời gian: ${_.craftTime}s`:"Lập tức"}</span>
                    <button class="btn btn--sm ${F?"btn--gold":"btn--outline"} btn-craft-action" data-rid="${_.id}" ${F?"":"disabled"}>
                      ${F?"🔥 Luyện Chế":"Thiếu Liệu"}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `},M=async()=>{if(a==="library"){n.innerHTML=`
        ${L()}
        <div id="library-container"></div>
      `,O();const k=n.querySelector("#library-container");k&&rt(k,t);return}if(a==="glitch"){n.innerHTML=`
        ${L()}
        <div id="glitch-container"></div>
      `,O();const k=n.querySelector("#glitch-container");k&&ht(k,t);return}if(n.innerHTML=`
      ${L()}
      <div id="pillar-content">
        ${a==="combat"?w():""}
        ${a==="auras"?S():""}
        ${a==="monsters"?E():""}
        ${a==="crafting"?P():""}
      </div>
    `,O(),q(),a==="monsters"&&!i)try{i=await o.getMonsterMastery(r.id);const k=n.querySelector("#pillar-content");k&&a==="monsters"&&(k.innerHTML=E(),q())}catch(k){p("Không thể tải Bách Thú Đồ Giám: "+k.message,"error")}if(a==="crafting"&&!x)try{x=await o.getCraftingMastery(r.id);const k=n.querySelector("#pillar-content");k&&a==="crafting"&&(k.innerHTML=P(),q())}catch(k){p("Không thể tải Thông Thạo Chế Tạo: "+k.message,"error")}},O=()=>{n.querySelectorAll(".pillar-tab").forEach(C=>{C.addEventListener("click",()=>{a=C.dataset.pillar,localStorage.setItem("activeSkillPillar",a),M()})});const k=n.querySelector("#btn-open-library");k&&k.addEventListener("click",()=>{a="library",localStorage.setItem("activeSkillPillar","library"),M()});const I=n.querySelector("#btn-open-glitch");I&&I.addEventListener("click",()=>{a="glitch",localStorage.setItem("activeSkillPillar","glitch"),M()})},q=()=>{n.querySelectorAll("[data-sfilter]").forEach(k=>{k.addEventListener("click",()=>{s=k.dataset.sfilter;const I=n.querySelector("#pillar-content");I&&a==="combat"&&(I.innerHTML=w(),q())})}),n.querySelectorAll(".btn-toggle-aura").forEach(k=>{k.addEventListener("click",async()=>{const I=k.dataset.aura;k.disabled=!0;try{const C=await o.toggleAura(r.id,I);C.player&&(e.player=C.player),p(C.message,C.success?"success":"warning"),typeof f=="function"&&f(),M()}catch(C){p(C.message||"Lỗi chuyển trạng thái Hào Quang","error"),k.disabled=!1}})}),n.querySelectorAll("[data-mrealm]").forEach(k=>{k.addEventListener("click",()=>{m=k.dataset.mrealm;const I=n.querySelector("#pillar-content");I&&a==="monsters"&&(I.innerHTML=E(),q())})}),n.querySelectorAll(".equip-btn").forEach(k=>{k.addEventListener("click",async()=>{try{const I=k.dataset.sid,C=k.dataset.eq==="1",B=await o.equipSkill(r.id,I,C);e.player=B.player,p(B.message,"success"),typeof f=="function"&&f(),M()}catch(I){p(I.message||"Lỗi trang bị pháp quyết","error")}})}),n.querySelectorAll(".btn-craft-action").forEach(k=>{k.addEventListener("click",async()=>{const I=k.dataset.rid;k.disabled=!0,k.innerText="Đang luyện...";try{const C=await o.craftItem(r.id,I);C.player&&(e.player=C.player),p(C.message,C.success?"success":"warning"),typeof f=="function"&&f(),x=await o.getCraftingMastery(r.id),M()}catch(C){p(C.message||"Lỗi luyện chế","error"),k.disabled=!1,k.innerText="🔥 Luyện Chế"}})})};M()}function At(n,t){return t==="manual"?"📜":n==="weapon"?"⚔️":n==="body"?"🥋":n==="shield"?"🛡️":n==="feet"?"👢":n==="ring"?"💍":"📦"}function lt(n,t){let e="",o="";if(n.slot==="weapon"){let g=0,y=0;(n.affixes||[]).forEach($=>{$.stat==="strength"&&$.type==="flat"&&(g+=$.value),$.stat==="dexterity"&&$.type==="flat"&&(y+=$.value)}),g===0&&(g=n.itemLevel*2+5),y===0&&(y=n.itemLevel+10),e=`⚔️ ${g}`,o=`🎯 ${y}`}else if(n.slot==="body"||n.slot==="shield"||n.slot==="feet"){let g=0;(n.affixes||[]).forEach(y=>{y.stat==="defense"&&y.type==="flat"&&(g+=y.value)}),g===0&&(g=n.itemLevel*3),e=`🛡️ ${g}`}else if(n.slot==="ring"){let g=0;(n.affixes||[]).forEach(y=>{y.stat==="capacity"&&(g+=y.value)}),e=g>0?`🎒 +${g}`:""}const p=(n.affixes||[]).map(g=>Ot(g)).map(g=>`<span class="badge badge-dim">${g}</span>`).join(" "),f=n.description||`Một vật phẩm loại ${n.slot} cấp ${n.itemLevel} thuộc phẩm chất ${n.rarity}. Khí tức tỏa ra không tồi.`,r=n.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${n.craftedBy}</strong></div>`:"",l=t?n.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${n.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${n.id}">Trang Bị</button>`:"";return`
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
          ${At(n.slot,n.category)}
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
            ${l}
          </div>
        </div>
      </div>
    </div>`}function Ot(n){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[n.stat]||n.stat,o=n.value>=0?"+":"";return n.type==="flat"?`${o}${n.value} ${e}`:n.type==="increase"?`${o}${n.value}% ${e}`:n.type==="more"?`×${o}${n.value}% ${e}`:`${o}${n.value} ${e}`}function at(n,t){var a,s,m,i,x,T,L;const{state:e,api:o,notify:p,renderGame:f}=t,r=Object.values(e.player.equipment||{}),l=e.player,g=e.medicines||[],y=l.medCooldownRemaining||0,$=e.inventoryTab||"equipped",u=l.skills&&l.skills.some(w=>{const S=typeof w=="string"?w:w.id;return S==="duoc_ly"||S==="y_thuat"}),c=r.find(w=>w.slot==="ring1"),v=r.find(w=>w.slot==="ring2");let b=20;((c==null?void 0:c.id)==="tui_tru_vat"||(a=c==null?void 0:c.baseType)!=null&&a.includes("tru_vat"))&&(b+=((m=(s=c.affixes)==null?void 0:s[0])==null?void 0:m.value)||10),((v==null?void 0:v.id)==="tui_tru_vat"||(i=v==null?void 0:v.baseType)!=null&&i.includes("tru_vat"))&&(b+=((T=(x=v.affixes)==null?void 0:x[0])==null?void 0:T.value)||10),n.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(l.inventory||[]).length} / ${b})</span></h1>
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
          Đan Dược ${y>0?`<span style="color:var(--orange); font-size:11px">(${y}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const h=document.getElementById("invTabContent"),d=()=>{h.querySelectorAll("[data-eid]").forEach(w=>{w.addEventListener("click",async S=>{S.stopPropagation();try{const E=await o.equipItem(e.playerId,w.dataset.eid);e.player=E.player,p(E.message,"success"),f()}catch(E){p(E.message||"Lỗi trang bị","error")}})}),h.querySelectorAll("[data-use]").forEach(w=>{w.addEventListener("click",async S=>{S.stopPropagation();try{const E=await o.useItem(e.playerId,w.dataset.use);e.player=E.player,p(E.message,"success"),f()}catch(E){p(E.message||"Lỗi sử dụng","error")}})})};if($==="equipped"){const w=l.equipment||{},S=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];h.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${S.map(E=>{const P=w[E.key],M=P&&P.id,O=M?`rarity-${P.rarity}`:"";return`
            <div style="background:${M?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${M?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${E.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${E.name}</div>
              ${M?`<div style="font-size:11px;font-weight:600" class="${O}">${P.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${P.rarity}] Lv${P.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${r.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${r.filter(E=>E&&E.id).map(E=>lt(E,!1)).join("")}
      `:""}
    `,d()}else if($==="medicine")h.innerHTML=`
      <div style="padding:12px">
        ${y>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${y}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${y/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${g.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':g.map(w=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${w.icon||"💊"} ${w.name}</div>
                <div class="item-meta">
                  ${w.description}
                  ${w.healPercent?` · Phục hồi ${w.healPercent}% HP`:""}
                  ${w.cooldownAdd?` · Sinh Đan độc ${w.cooldownAdd}s`:""}
                  ${w.duration?` · Hiệu lực ${w.duration} trận`:""}
                  ${w.toxicity&&u?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${w.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${w.penalty&&u?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${w.penalty.map(S=>`Giảm ${Math.abs(S.value)*100}% ${S.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${w.id}" 
                ${y+(w.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,h.querySelectorAll("[data-med]").forEach(w=>{w.addEventListener("click",async()=>{try{const S=await o.useMedicine(e.playerId,w.dataset.med);e.player=S.player,p(S.message,"success"),f()}catch(S){p(S.message||"Đan độc quá nồng!","error")}})});else{const w=l.inventory||[];let S=[];$==="weapon"?S=w.filter(E=>E.slot==="weapon"&&E.category!=="manual"):$==="armor"?S=w.filter(E=>["body","shield","feet"].includes(E.slot)):$==="accessory"?S=w.filter(E=>["ring","amulet","ring1","ring2"].includes(E.slot)):$==="manual"&&(S=w.filter(E=>E.category==="manual")),h.innerHTML=`
      ${S.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':S.map(E=>lt(E,!0)).join("")}
    `,d()}n.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{e.inventoryTab=w.dataset.tab,at(n,t)})}),(L=document.getElementById("btnGen"))==null||L.addEventListener("click",async()=>{const w=["common","rare","epic","legendary"];try{const S=await o.generateItem(e.playerId,w[Math.floor(Math.random()*w.length)]);e.player=S.player,e.items=S.items||[],p(S.message,"success"),at(n,t)}catch{p("Lỗi tạo ngẫu nhiên","error")}})}function bt(n,t){const{state:e,api:o,notify:p,updateSidebar:f,renderGame:r}=t,l=e.playerId;e._dungeon||(e._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const g=e._dungeon;async function y(){try{const[d,a]=await Promise.all([o.getMapItems(l),o.getDungeonHistory(l)]);g.mapItems=d.mapItems||[],g.activeRun=d.activeRun||null,g.history=a.history||[],g.loaded=!0,$()}catch(d){p(d.message||"Lỗi tải Bí Cảnh","error")}}function $(){n.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${g.activeRun?u():c()}

      ${g.lastResult?v():""}

      ${b()}
    `,h()}function u(){var m,i;const d=g.activeRun,a=d.currentWave===d.totalWaves,s=((d.currentWave-1)/d.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${d.dungeonName||d.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${s}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${d.currentWave}/${d.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((m=e.player)==null?void 0:m.hospitalRemaining)>0?"disabled":""}>
              ${a?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+d.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((i=e.player)==null?void 0:i.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function c(){return g.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${g.mapItems.map(d=>{const a=d.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${d.item.icon} ${d.item.name} <span style="opacity:0.5">x${d.quantity}</span></div>
                  ${a?`
                    <div class="item-meta">
                      ${a.name} · T${a.tier} · ${a.waves+1} tầng · Boss: ${a.bossName}
                    </div>
                  `:""}
                </div>
                ${a?`<button class="btn btn--sm btn--gold" data-enter="${d.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function v(){var m,i;const d=g.lastResult,a=d.result==="dungeon_complete"?"🏆":d.result==="wave_cleared"?"✅":"💀",s=d.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${s}">
        <div class="panel-title" style="color:${s}">${a} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${d.message}</div>
          ${(m=d.loot)!=null&&m.length?`
            <div style="margin-bottom:8px">
              ${d.loot.map(x=>`<div style="font-size:12px;color:var(--green)">🎁 ${x}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((i=d.combatLog)==null?void 0:i.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(d.combatLog||[]).map(x=>`<div>${x}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function b(){return g.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${g.history.map(d=>{const a=d.status==="completed"?"✅":d.status==="failed"?"❌":d.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${d.status==="completed"?"var(--green)":d.status==="failed"?"var(--red)":"var(--orange)"}">${a} ${d.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${d.wave}/${d.totalWaves} · ${new Date(d.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function h(){var d,a;document.querySelectorAll("[data-enter]").forEach(s=>{s.addEventListener("click",async()=>{const m=s.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){s.disabled=!0;try{const i=await o.enterDungeon(l,m);p(i.message,"success"),e.player=i.player,f(),g.activeRun=i.run,g.lastResult=null,await y()}catch(i){p(i.message,"error"),s.disabled=!1}}})}),(d=document.getElementById("btnFight"))==null||d.addEventListener("click",async()=>{const s=document.getElementById("btnFight");s.disabled=!0,s.textContent="⏳ Đang chiến đấu...";try{const m=await o.fightDungeonWave(l);e.player=m.player,f(),g.lastResult=m,m.result==="dungeon_complete"||m.result==="dungeon_failed"?g.activeRun=null:m.result==="wave_cleared"&&(g.activeRun.currentWave=m.nextWave),$()}catch(m){p(m.message,"error"),s.disabled=!1,s.textContent="⚔️ Chiến Đấu"}}),(a=document.getElementById("btnAbandon"))==null||a.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await o.abandonDungeon(l),p("Đã rời khỏi Bí Cảnh.","info"),g.activeRun=null,g.lastResult=null,await y()}catch(s){p(s.message,"error")}})}g.loaded?$():y()}function yt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const l=e._tc;async function g(){try{l.data=await o.request(`/player/${r}/atlas-maps`),l.loaded=!0,y()}catch(h){p(h.message,"error")}}function y(){const h=l.data,d=(h==null?void 0:h.atlas)||{},a=(h==null?void 0:h.maps)||[],s=h==null?void 0:h.activeRun,m=(h==null?void 0:h.allMaps)||[];h!=null&&h.modifiers,n.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${d.completed||0}/${d.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${d.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${d.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${d.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${l.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${l.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${a.length})</button>
        ${s?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,n.querySelectorAll("[data-tab]").forEach(x=>{x.addEventListener("click",()=>{l.tab=x.dataset.tab,y()})});const i=document.getElementById("tcContent");i&&(s&&l.tab==="run"?v(i,s):l.tab==="inventory"?u(i,a):$(i,m,d))}function $(h,d,a){var m;const s=((m=l.data)==null?void 0:m.tiers)||[];h.innerHTML=s.map(i=>{const x=d.filter(T=>T.tier===i.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${i.tier} ${i.name} <span style="opacity:0.4;font-size:11px">(Realm ${i.requiredRealm}+, ${i.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${x.map(T=>{var S;const L=((S=a.progress)==null?void 0:S[T.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[T.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${L?700:400}">${T.name}</span>
                ${L?`<span style="color:var(--green);font-size:11px">✅ ×${L}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function u(h,d,a){if(d.length===0){h.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}h.innerHTML=d.map((s,m)=>{const i=s.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${b(s.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${s.mapName||s.mapId} <span style="color:${b(s.tier)};font-size:12px">T${s.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${i.length>0?i.map(x=>x.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${i.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${m}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${m}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),h.querySelectorAll(".btn-open-map").forEach(s=>{s.addEventListener("click",async()=>{try{const m=await o.request(`/player/${r}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(s.dataset.idx)})});p(m.message,"success"),e.player=m.player,f(),l.tab="run",await g()}catch(m){p(m.message,"error")}})}),h.querySelectorAll(".btn-add-mod").forEach(s=>{s.addEventListener("click",()=>c(parseInt(s.dataset.idx)))})}function c(h){var s;const d=((s=l.data)==null?void 0:s.modifiers)||[],a=document.createElement("div");a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",a.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${d.map(m=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${m.id}">
          <span style="flex:1"><strong>${m.name}</strong><br><span style="font-size:11px;opacity:0.6">${m.desc} · IIQ +${m.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,a.addEventListener("click",async m=>{const i=m.target.closest("[data-modid]");if(i)try{const x=await o.request(`/player/${r}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:h,modifierId:i.dataset.modid})});p(x.message,"success"),e.player=x.player,f(),a.remove(),await g()}catch(x){p(x.message,"error")}else m.target===a&&a.remove()}),document.body.appendChild(a)}function v(h,d){var m,i;const a=d.currentWave/d.totalWaves*100,s=d.modifiers||[];h.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${d.mapName} <span style="color:${b(d.tier)}">T${d.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${d.currentWave}/${d.totalWaves}
            ${s.length>0?" · "+s.map(x=>x.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${a}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${l.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(m=document.getElementById("btnTCFight"))==null||m.addEventListener("click",async()=>{l.fighting=!0,y();try{const x=await o.request(`/player/${r}/atlas-maps/fight`,{method:"POST"});e.player=x.player,f();const T=x.result!=="map_failed";p(x.message,T?"success":"error"),l.fighting=!1,(x.result==="map_complete"||x.result==="map_failed")&&(l.tab="atlas"),await g()}catch(x){p(x.message,"error"),l.fighting=!1,y()}}),(i=document.getElementById("btnTCQuit"))==null||i.addEventListener("click",async()=>{try{await o.request(`/player/${r}/atlas-maps/abandon`,{method:"POST"}),p("Đã rời Tiên Cảnh","info"),l.tab="atlas",await g()}catch(x){p(x.message,"error")}})}function b(h){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[h]||"#666"}l.loaded?y():g()}function xt(n,t){const{state:e}=t,o=e._travelTab||"map";n.innerHTML=`
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
  `,n.querySelectorAll(".tab-btn").forEach(f=>{f.addEventListener("click",()=>{e._travelTab=f.dataset.tab,xt(n,t)})});const p=n.querySelector("#travelTabContent");o==="map"?Y(p,t):o==="dungeon"?bt(p,t):yt(p,t)}async function Y(n,t){var r;const{state:e,api:o,notify:p,updateSidebar:f}=t;n.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[l,g]=await Promise.all([o.request("/data/areas"),o.request(`/player/${e.playerId}/area`)]),y=l.areas||[],$=g.area,u=g.player,c=g.traveling||!1,v=g.travelRemaining||0,b=g.travelDestination||"";g.message&&p(g.message,"success"),g.player&&(e.player=g.player,f());const h=e.exploration||{},d=h[(u==null?void 0:u.currentArea)||"thanh_lam_tran"],a=($==null?void 0:$.name)||(d==null?void 0:d.name)||"Vùng Đất Vô Danh",s=(d==null?void 0:d.staminaCost)||10,m={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận",cuu_u_than_uyen:"👿 Cửu U ma khí: +35% ST, +20% Tốc Độ",thai_co_hong_hoang:"🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp",chu_thien_tinh_hai:"🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn",hon_don_tien_vuc:"🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số",hon_nguyen_dao_canh:"👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính"},i=m[u==null?void 0:u.currentArea]||"",x=[...y].sort((T,L)=>(T.sort_order||T.mapY||0)-(L.sort_order||L.mapY||0));if(n.innerHTML=`
      ${c?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${b}</span></strong>
            <div id="travelTimer" style="font-size:26px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 12px rgba(255,215,0,0.4)">⏳ ${v}s</div>
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
                  ${a}
                  <span class="badge" style="background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.4);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${s} TL/lần</div>
              </div>
            </div>
            ${$!=null&&$.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${$.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${($==null?void 0:$.min_level)||1}+</span>
              ${i?`<span class="badge" style="background:rgba(255,215,0,0.1);color:var(--gold);border:1px solid rgba(255,215,0,0.25);font-size:11px">${i}</span>`:""}
              ${(r=d==null?void 0:d.specialtyNames)!=null&&r.length?`<span class="badge" style="background:rgba(234,179,8,0.12);color:#facc15;border:1px solid rgba(234,179,8,0.3);font-size:11px">💎 Đặc Sản: ${d.specialtyNames.join(" · ")}</span>`:""}
            </div>
          </div>
        </div>
      `}

      <!-- 2D REALM MAP OVERVIEW -->
      <div class="panel">
        <div class="panel-title flex items-center justify-between">
          <span>🗺️ Thiên Địa Giới Đồ (2D Bát Hoang Tinh Đồ)</span>
          <span class="text-xs text-dim">${x.length} Khu vực</span>
        </div>
        <div class="panel-body" style="background:linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(10,15,28,0.95) 100%); padding:12px">
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px">
            ${x.map((T,L)=>{var R,K,z,N;const w=h[T.id],S=T.id===u.currentArea&&!c,E=u.level<(T.min_level||1),P=parseInt(T.travel_time)||0,M=parseInt(T.stamina_cost)||(w==null?void 0:w.staminaCost)||10,O=m[T.id]||"",q=T.tier||"Bát Hoang",k=M>=100?"rgba(239,68,68,0.2)":M>=40?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)",I=M>=100?"var(--red)":M>=40?"var(--gold)":"var(--text-dim)";let C="rgba(255,255,255,0.08)",B="rgba(255,255,255,0.03)";return S?(C="rgba(34, 197, 94, 0.6)",B="rgba(34, 197, 94, 0.08)"):E&&(C="rgba(239, 68, 68, 0.2)",B="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${S?"current-realm":""} ${E?"locked-realm":""}" 
                     style="border:1px solid ${C}; background:${B}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${S?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${S?"var(--green)":E?"var(--text-dim)":"var(--text-bright)"}">
                        #${L+1} ${T.name}
                      </div>
                      ${E?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      🏛️ ${q}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${T.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${E?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${E?"var(--red)":"var(--text-dim)"}">
                        Lv.${T.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${P>0?`⏱ ${P}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${k}; color:${I}; border:1px solid ${k}">
                        🏃 -${M} TL (Dò thám)
                      </span>
                    </div>

                    ${(R=w==null?void 0:w.specialtyNames)!=null&&R.length?`
                      <div style="font-size:10px; color:#facc15; background:rgba(234,179,8,0.1); border:1px solid rgba(234,179,8,0.25); border-radius:4px; padding:3px 6px; margin-bottom:6px; line-height:1.3">
                        💎 <strong>Đặc sản:</strong> ${w.specialtyNames.join(" · ")}
                      </div>
                    `:""}

                    ${w!=null&&w.rates?`
                      <div style="display:flex; gap:6px; font-size:10px; margin-bottom:8px; opacity:0.85">
                        <span style="color:#34d399">🌿 ~${((K=w.rates.find(_=>_.type==="herb"))==null?void 0:K.weight)||0}%</span>
                        <span style="color:rgba(255,255,255,0.2)">·</span>
                        <span style="color:#38bdf8">⛏️ ~${((z=w.rates.find(_=>_.type==="mineral"))==null?void 0:z.weight)||0}%</span>
                        <span style="color:rgba(255,255,255,0.2)">·</span>
                        <span style="color:#f87171">👾 ~${((N=w.rates.find(_=>_.type==="monster"))==null?void 0:N.weight)||0}%</span>
                      </div>
                    `:""}

                    ${O?`
                      <div style="font-size:10px; color:var(--gold); background:rgba(255,215,0,0.05); padding:3px 6px; border-radius:4px; margin-bottom:10px; border-left:2px solid var(--gold)">
                        ${O}
                      </div>
                    `:""}
                  </div>

                  <div style="margin-top:auto">
                    ${S?`
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(34,197,94,0.2); color:var(--green); border:1px solid rgba(34,197,94,0.4)">
                        📍 Đang tọa trấn
                      </button>
                    `:E?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${T.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${T.id}" ${c?"disabled":""}>
                        ${P>0?`🚶 Vi Hành (${P}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll("[data-travel]").forEach(T=>{T.addEventListener("click",async L=>{L.stopPropagation();const w=T.dataset.travel;n.querySelectorAll("[data-travel]").forEach(S=>{S.tagName==="BUTTON"&&(S.disabled=!0),S.style.pointerEvents="none"});try{const S=await o.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:w})});S.player&&(e.player=S.player,f()),p(S.message,"success"),Y(n,t)}catch(S){p(S.message||"Lỗi di chuyển!","error"),Y(n,t)}})}),c&&v>0){let T=v;const L=v,w=setInterval(async()=>{T--;const S=document.getElementById("travelTimer"),E=document.getElementById("travelBar");if(S&&(S.textContent=`⏳ ${Math.max(0,T)}s`),E&&(E.style.width=`${Math.max(0,T/L*100)}%`),T<=0){clearInterval(w);try{const P=await o.request(`/player/${e.playerId}/travel-check`,{method:"POST"});P.player&&(e.player=P.player,f()),P.arrived&&p(P.message,"success"),Y(n,t)}catch{Y(n,t)}}},1e3)}}catch(l){n.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(l)}}function it(n,t){var s,m;const{state:e,renderGame:o,notify:p,updateSidebar:f}=t,r=e.player,l=e.recipes||[],g=e.medicines||[],y=e._alchemyTab||"recipes",$=i=>{const x=g.find(T=>T.id===i);return x?(x.icon||"💊")+" "+x.name:i};let u=0,c=0,v=0,b=0;(r.skills||[]).forEach(i=>{const x=typeof i=="string"?i:i.id,T=typeof i=="string"?1:i.level||1;x==="tinh_che"&&(u=T*2),x==="phu_an_thuat"&&(c=T*5),x==="linh_kiem_thuat"&&(v=T*10),x==="cuong_hoa_thuat"&&(b=T*15)});const h=i=>i.split("_").map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(" "),d=[];Object.values(r.equipment||{}).forEach(i=>{i&&d.push({...i,loc:"eq"})}),(r.inventory||[]).filter(i=>i.slot&&i.slot!=="consumable").forEach(i=>d.push({...i,loc:"inv"}));let a=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${y==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${y==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${u||c||v||b?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${u?`<span>🔥 Thành công +${u}%</span>`:""}
      ${c?`<span>💎 Giảm phí -${c}%</span>`:""}
      ${v?`<span>✨ Chất lượng +${v}%</span>`:""}
      ${b?`<span>⬆️ Nâng đôi ${b}%</span>`:""}
    </div>
    `:""}
  `;if(y==="recipes"){if(a+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!r.materials||Object.keys(r.materials).length===0)a+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[i,x]of Object.entries(r.materials))a+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${h(i)} <span style="color:var(--gold)">x${x}</span></div>`;a+="</div></div>",a+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',l.length===0?a+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':l.forEach(i=>{var E;const x=$(i.target),T=Math.min(100,(i.successRate||100)+u);let L="";(E=i.requirements)!=null&&E.skill&&(L=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${h(i.requirements.skill)} lv${i.requirements.level||1}</div>`);let w="";i.materials.forEach(P=>{var O;const M=((O=r.materials)==null?void 0:O[P.id])||0;w+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${M>=P.amount?"var(--green)":"var(--red)"};font-weight:bold">${M}/${P.amount}</span> ${h(P.id)}</span>`});const S=g.find(P=>P.id===i.target)||{};a+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${x}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${i.tier}</span>
                  <span>Tỉ lệ: <span style="color:${T>=80?"var(--green)":"var(--blue)"};font-weight:bold">${T}%</span></span>
                  <span>🔥 Phí: ${i.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${L}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${w}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${S.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${i.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),a+="</div></div>"}else a+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${d.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${d.map(i=>`<option value="${i.id}">${i.loc==="eq"?"🔸":"📦"} ${i.name||i.baseType} [${i.rarity||"?"}] ${(i.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(i=>{const x=Math.max(1,Math.round(i.cost*(1-c/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${i.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${i.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${i.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${i.id}" style="width:100%">
                💎 ${x} ${c>0?`<s style="opacity:0.4;font-size:10px">${i.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;n.innerHTML=a,n.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{e._alchemyTab=i.dataset.tab,it(n,t)})}),n.querySelectorAll(".accordion-header").forEach(i=>{i.addEventListener("click",()=>{const x=i.nextElementSibling;x.style.display==="none"?(x.style.display="block",i.querySelector(".text-dim:last-child").textContent="▲"):(x.style.display="none",i.querySelector(".text-dim:last-child").textContent="▼")})}),n.querySelectorAll(".btn-craft").forEach(i=>{i.addEventListener("click",async x=>{x.stopPropagation();const T=l.find(L=>L.id===i.dataset.recipe);if(T&&r.gold<(T.cost||0))return p("Không đủ linh thạch!","error");try{const L=await D.craftItem(r.id,i.dataset.recipe);e.player=L.player,p(L.message,L.success?"success":"error"),o()}catch(L){p(L.message,"error")}})}),n.querySelectorAll(".btn-currency").forEach(i=>{i.addEventListener("click",async()=>{const x=document.getElementById("selItem");if(!(x!=null&&x.value))return p("Chọn trang bị trước!","error");const T=i.dataset.cid;let L=-1;if(T==="thien_menh_phu"){const w=d.find(P=>P.id===x.value),S=(w==null?void 0:w.affixes)||[];if(S.length===0)return p("Item không có affix để khóa!","error");const E=prompt(`Chọn affix để khóa (0-${S.length-1}):
${S.map((P,M)=>`${M}: ${P.name||P.stat} +${P.value}`).join(`
`)}`);if(E===null)return;if(L=parseInt(E),isNaN(L)||L<0||L>=S.length)return p("Chỉ số không hợp lệ!","error")}i.disabled=!0,i.textContent="⏳...";try{const w=await D.applyCurrency(r.id,T,x.value,L);p(w.message,"success"),e.player=w.player,f(),it(n,t)}catch(w){p(w.message,"error"),i.disabled=!1,i.textContent="💎 Dùng"}})}),(s=document.getElementById("selItem"))==null||s.addEventListener("change",()=>{const i=d.find(T=>T.id===document.getElementById("selItem").value),x=document.getElementById("itemPreview");i&&x&&(x.innerHTML=(i.affixes||[]).map(T=>`<span style="color:var(--blue)">• ${T.name||T.stat} +${T.value}</span>`).join(" | ")||"Không có affix")}),(m=document.getElementById("selItem"))==null||m.dispatchEvent(new Event("change"))}function ft(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;async function l(){try{const y=await o.getDailyQuests(r);e._dailyQuests=y,g()}catch(y){p(y.message,"error")}}function g(){const y=e._dailyQuests||{},$=y.quests||[];y.allCompleted;const u=y.bonusReward;n.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${$.map(c=>{const v=c.quest_info||{},b=c.target>0?Math.min(100,Math.round(c.progress/c.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${c.claimed?"var(--text-dim)":c.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${v.name||c.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${v.difficulty==="Khó"?"var(--red)":v.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${v.difficulty||"?"}</span>
              </div>
              ${c.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':c.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${c.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${c.progress}/${c.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${v.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${b}%;background:${c.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${v.goldReward||0} · ✨ ${v.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${u?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${u.gold} 💎, +${u.xp} EXP</div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-claim").forEach(c=>c.addEventListener("click",async()=>{try{const v=await o.claimDailyQuest(r,parseInt(c.dataset.qid));p(v.message,"success"),e.player=v.player,f(),await l()}catch(v){p(v.message,"error")}}))}l()}function $t(n,t){const{state:e,api:o,notify:p,renderGame:f}=t,r=e._questTab||"npc";n.innerHTML=`
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
  `,n.querySelectorAll("[data-qtab]").forEach(y=>{y.addEventListener("click",()=>{e._questTab=y.dataset.qtab,$t(n,t)})});const l=n.querySelector("#questTabContent");if(r==="daily"){ft(l,t);return}g();async function g(){try{const $=(await o.getQuests(e.playerId)).quests||[],u=document.getElementById("questList");if(!u)return;if($.length===0){u.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}u.innerHTML=$.map(c=>{const v=c.questAmount>0?Math.min(100,c.progress/c.questAmount*100):0,b=c.progress>=c.questAmount,h=c.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${b?"quest-done":""}" data-quest-id="${c.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${c.npcIcon||"🧓"} ${c.npcName||"NPC"}</span>
              <span class="quest-type">${h} ${c.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${c.questName||c.quest_id}</div>
            <div class="quest-desc">${c.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${b?"hp":"energy"}" style="width:${v}%"></div>
              </div>
              <span class="quest-progress-text">${c.progress}/${c.questAmount}</span>
            </div>
            ${b?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${c.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),u.querySelectorAll(".quest-complete-btn").forEach(c=>{c.addEventListener("click",async()=>{const v=c.dataset.qid;c.disabled=!0,c.textContent="⏳...";try{const b=await o.completeQuest(e.playerId,v);e.player=b.player,p(b.message,"success"),b.skillGained&&p(`🎯 Lĩnh ngộ: ${b.skillGained}!`,"success"),f()}catch(b){p(b.message||"Lỗi trả quest","error"),c.disabled=!1,c.textContent="✅ Trả Nhiệm Vụ"}})})}catch(y){console.error("Error loading quests:",y);const $=document.getElementById("questList");$&&($.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function Gt(n,t){const{state:e,api:o,notify:p,renderGame:f}=t;if(e.player.role!=="admin"){n.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const r=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let l="monsters";n.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${r.map(a=>`
          <button class="admin-tab ${a.id===l?"active":""}" data-tab="${a.id}">${a.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",a=>{const s=a.target.closest(".admin-tab");s&&(l=s.dataset.tab,document.querySelectorAll(".admin-tab").forEach(m=>m.classList.remove("active")),s.classList.add("active"),g(l))}),g(l);async function g(a){const s=document.getElementById("adminContent");if(s){s.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const m=await o.request(`/admin/${a}?adminId=${e.playerId}`);y(a,m,s)}catch(m){s.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${m.message}</div></div>`}}}function y(a,s,m){a==="monsters"?$(s,m):a==="npcs"?u(s,m):a==="areas"?c(s,m):v(a,s,m)}function $(a,s){const m=a.monsters||[];s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${m.map(i=>{var x,T,L,w,S,E,P,M;return`
          <div class="admin-card" data-id="${i.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${i.name} ${i.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((T=(x=a.tierInfo)==null?void 0:x[i.tier])==null?void 0:T.color)||"#888"}">${((w=(L=a.tierInfo)==null?void 0:L[i.tier])==null?void 0:w.name)||"T"+i.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((S=i.stats)==null?void 0:S.hp)||"?"}</div>
              <div>💪 ${((E=i.stats)==null?void 0:E.strength)||"?"}</div>
              <div>🏃 ${((P=i.stats)==null?void 0:P.speed)||"?"}</div>
              <div>🛡 ${((M=i.stats)==null?void 0:M.defense)||"?"}</div>
            </div>
            <div class="admin-card-meta">
              <span>XP: ${i.xpReward||0}</span>
              <span>Gold: ${Array.isArray(i.goldReward)?i.goldReward.join("-"):i.goldReward}</span>
              ${i.areaId?`<span>📍 ${i.areaId}</span>`:""}
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${i.id}" data-type="monsters" data-key="monsters">✏️ Sửa</button>
          </div>
        `}).join("")}
      </div>
    `,h(s,a,"monsters","monsters")}function u(a,s){const m=a.npcs||[];s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${m.map(i=>`
          <div class="admin-card" data-id="${i.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${i.icon||"🧓"} ${i.name}</span>
              <span class="badge" style="background:var(--purple)">${i.profession}</span>
            </div>
            <div class="admin-card-meta">
              <span>Quests: ${(i.quests||[]).length}</span>
              <span>Areas: ${(i.areaIds||[]).join(", ")}</span>
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${i.id}" data-type="npcs" data-key="npcs">✏️ Sửa</button>
          </div>
        `).join("")}
      </div>
    `,h(s,a,"npcs","npcs")}function c(a,s){const m=Object.keys(a);s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${m.map(i=>{const x=a[i];return`
            <div class="admin-card" data-id="${i}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${x.name||i}</span>
                <span class="badge" style="background:var(--orange)">⚡${x.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(x.events||[]).map(T=>`<span>${T.type}: ${T.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${i}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,s.querySelectorAll(".admin-edit-area").forEach(i=>{i.addEventListener("click",()=>{const x=i.dataset.id,T=a[x];b(x,T,`areas/${x}`)})})}function v(a,s,m){var T;const i=JSON.stringify(s,null,2),x=i.split(`
`).length;m.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${a} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(x+5,30)}">${d(i)}</textarea>
    `,(T=document.getElementById("btnSaveGeneric"))==null||T.addEventListener("click",async()=>{try{const L=document.getElementById("genericEditor").value,w=JSON.parse(L);p("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(L){p("JSON không hợp lệ: "+L.message,"error")}})}function b(a,s,m,i){const x=JSON.stringify(s,null,2),T=document.createElement("div");T.className="admin-modal-overlay",T.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${a}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${d(x)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(T),T.querySelectorAll(".admin-modal-close").forEach(L=>{L.addEventListener("click",()=>T.remove())}),T.addEventListener("click",L=>{L.target===T&&T.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const L=document.getElementById("modalEditor").value,w=JSON.parse(L);await o.request(`/admin/${m}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:w})}),p("✅ Đã lưu!","success"),T.remove(),g(l)}catch(L){p("Lỗi: "+L.message,"error")}})}function h(a,s,m,i){a.querySelectorAll(".admin-edit-btn").forEach(x=>{x.addEventListener("click",()=>{const T=x.dataset.id,w=(s[i]||[]).find(S=>S.id===T);w&&b(T,w,`${m}/${T}`)})})}function d(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function Tt(n,t){const{state:e,api:o,notify:p,renderGame:f,updateSidebar:r}=t,l=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const g=e._social;async function y(){try{const h=await o.getRelationships(l);g.relationships=h,g.loaded=!0,$()}catch(h){p(h.message||"Lỗi tải dữ liệu Giao Tế","error")}}function $(){const{friends:h,enemies:d,pendingSent:a,pendingReceived:s}=g.relationships,m=s.length;n.innerHTML=`
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
            ${g.searchResults.map(i=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${i.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${i.level} · ${i.realm} · ${i.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${i.id!==l?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${i.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${i.id}">⚔️ Kẻ Thù</button>
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
          🤝 Đạo Hữu (${h.length})
        </button>
        <button class="btn btn--sm ${g.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${d.length})
        </button>
        <button class="btn btn--sm ${g.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${m>0?`<span class="badge">${m}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${g.tab==="friends"?u(h):""}
        ${g.tab==="enemies"?c(d):""}
        ${g.tab==="pending"?v(s,a):""}
      </div>
    `,b()}function u(h){return h.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':h.map(d=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${d.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${d.level} · ${d.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${d.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${d.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function c(h){return h.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':h.map(d=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${d.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${d.level} · ${d.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${d.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${d.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function v(h,d){let a="";return h.length>0&&(a+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',a+=h.map(s=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${s.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${s.level} · ${s.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${s.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${s.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join("")),d.length>0&&(a+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',a+=d.map(s=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${s.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${s.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),h.length===0&&d.length===0&&(a='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),a}function b(){var h,d;(h=document.getElementById("btnSearch"))==null||h.addEventListener("click",async()=>{var s;const a=(s=document.getElementById("socialSearch"))==null?void 0:s.value.trim();if(!a||a.length<2)return p("Cần ít nhất 2 ký tự","error");g.searchQuery=a;try{const m=await o.searchPlayers(a);g.searchResults=m.players||[],$()}catch(m){p(m.message,"error")}}),(d=document.getElementById("socialSearch"))==null||d.addEventListener("keydown",a=>{var s;a.key==="Enter"&&((s=document.getElementById("btnSearch"))==null||s.click())}),document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{g.tab=a.dataset.tab,$()})}),document.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",async()=>{const s=a.dataset.action,m=a.dataset.target;a.disabled=!0;try{let i;switch(s){case"add-friend":i=await o.addFriend(l,m);break;case"accept-friend":i=await o.acceptFriend(l,m);break;case"reject-friend":i=await o.rejectFriend(l,m);break;case"remove-friend":i=await o.removeFriend(l,m);break;case"add-enemy":i=await o.addEnemy(l,m);break;case"remove-enemy":i=await o.removeEnemy(l,m);break}p(i.message||"Thành công!","success"),await y()}catch(i){p(i.message||"Lỗi!","error"),a.disabled=!1}})})}g.loaded?$():y()}function kt(n,t){const{state:e,api:o,notify:p}=t,f=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const r=e._chat;async function l(){try{const[d,a]=await Promise.all([o.getGlobalChat(),o.getChatFriends(f)]);r.globalMessages=d.messages||[],r.friends=a.friends||[],r.globalMessages.length>0&&(r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id),r.loaded=!0,$(),g()}catch(d){p(d.message||"Lỗi tải chat","error")}}function g(){y(),r.pollTimer=setInterval(async()=>{try{if(r.tab==="global"){const d=await o.getGlobalChat(r.lastGlobalId);d.messages&&d.messages.length>0&&(r.globalMessages.push(...d.messages),r.globalMessages.length>100&&(r.globalMessages=r.globalMessages.slice(-100)),r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id,c(),v())}else if(r.tab==="private"&&r.selectedFriend){const d=await o.getPrivateChat(f,r.selectedFriend.id,r.lastPrivateId);d.messages&&d.messages.length>0&&(r.privateMessages.push(...d.messages),r.privateMessages.length>100&&(r.privateMessages=r.privateMessages.slice(-100)),r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id,c(),v())}}catch{}},5e3)}function y(){r.pollTimer&&(clearInterval(r.pollTimer),r.pollTimer=null)}function $(){const d=r.tab==="global"?r.globalMessages:r.privateMessages;n.innerHTML=`
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
            ${r.friends.map(a=>{var s;return`<option value="${a.id}" ${((s=r.selectedFriend)==null?void 0:s.id)===a.id?"selected":""}>${a.name} (Lv.${a.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${u(d)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${r.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,h(),v()}function u(d){return d.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':d.map(a=>{const s=a.sender_id===f,m=new Date(a.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${s?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${m}</span>
          <span style="font-weight:600;color:${s?"var(--blue)":"var(--gold)"}"> ${a.sender_name}</span>
          <span style="opacity:0.8">: ${b(a.message)}</span>
        </div>
      `}).join("")}function c(){const d=document.getElementById("chatMessages");if(!d)return;const a=r.tab==="global"?r.globalMessages:r.privateMessages;d.innerHTML=u(a)}function v(){const d=document.getElementById("chatMessages");d&&(d.scrollTop=d.scrollHeight)}function b(d){const a=document.createElement("div");return a.textContent=d,a.innerHTML}function h(){var a,s,m;document.querySelectorAll("[data-chat-tab]").forEach(i=>{i.addEventListener("click",()=>{r.tab=i.dataset.chatTab,r.tab==="global"&&(r.lastGlobalId=r.globalMessages.length>0?r.globalMessages[r.globalMessages.length-1].id:0),$(),g()})}),(a=document.getElementById("friendSelect"))==null||a.addEventListener("change",async i=>{const x=i.target.value;if(!x){r.selectedFriend=null,r.privateMessages=[],$();return}r.selectedFriend=r.friends.find(T=>T.id===x)||null,r.lastPrivateId=0;try{const T=await o.getPrivateChat(f,x);r.privateMessages=T.messages||[],r.privateMessages.length>0&&(r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id),c(),v()}catch(T){p(T.message,"error")}});const d=async()=>{var T,L;const i=document.getElementById("chatInput"),x=i==null?void 0:i.value.trim();if(x){if(r.tab==="private"&&!r.selectedFriend)return p("Chọn Đạo Hữu trước!","error");try{if(await o.sendChat(f,r.tab,r.tab==="private"?r.selectedFriend.id:null,x),i.value="",r.tab==="global"){const w=await o.getGlobalChat(r.lastGlobalId);((T=w.messages)==null?void 0:T.length)>0&&(r.globalMessages.push(...w.messages),r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id)}else{const w=await o.getPrivateChat(f,r.selectedFriend.id,r.lastPrivateId);((L=w.messages)==null?void 0:L.length)>0&&(r.privateMessages.push(...w.messages),r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id)}c(),v()}catch(w){p(w.message||"Lỗi gửi tin nhắn","error")}}};(s=document.getElementById("btnSend"))==null||s.addEventListener("click",d),(m=document.getElementById("chatInput"))==null||m.addEventListener("keydown",i=>{i.key==="Enter"&&d()})}t.renderGame,r.loaded?($(),g()):l()}function wt(n,t){const{state:e,api:o,notify:p,updateSidebar:f,renderGame:r}=t,l=e.playerId,g=e._auctionTab||"browse";async function y(){try{const[c,v]=await Promise.all([o.getAuctions(),o.getMyAuctions(l)]);e._auctionListings=c.listings||[],e._auctionMine=v.listings||[],$()}catch(c){p(c.message,"error")}}function $(){const c=e._auctionListings||[],v=e._auctionMine||[],b=(e.player.inventory||[]).filter(h=>h.slot&&h.slot!=="consumable");n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${g==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${g==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${g==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${v.length})</button>
      </div>

      ${g==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':c.map(h=>{const d=JSON.parse(h.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${d.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${d.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${h.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${h.id}">💎 ${h.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:g==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${b.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${b.map(h=>`<option value="${h.id}">${h.name} [${h.rarity}]</option>`).join("")}
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
          ${v.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':v.map(h=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(h.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${h.status==="active"?"var(--green)":h.status==="sold"?"var(--gold)":"var(--red)"}">${h.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${h.buyout_price}</div>
                </div>
                ${h.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${h.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,u()}function u(){var c;n.querySelectorAll(".tab-btn").forEach(v=>v.addEventListener("click",()=>{e._auctionTab=v.dataset.tab,y()})),n.querySelectorAll(".btn-buy").forEach(v=>v.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const b=await o.buyAuction(l,parseInt(v.dataset.lid));p(b.message,"success"),e.player=b.player,f(),await y()}catch(b){p(b.message,"error")}})),n.querySelectorAll(".btn-cancel").forEach(v=>v.addEventListener("click",async()=>{try{const b=await o.cancelAuction(l,parseInt(v.dataset.lid));p(b.message,"success"),e.player=b.player,f(),await y()}catch(b){p(b.message,"error")}})),(c=document.getElementById("btnListItem"))==null||c.addEventListener("click",async()=>{var d,a,s;const v=(d=document.getElementById("selSellItem"))==null?void 0:d.value,b=parseInt(((a=document.getElementById("inpPrice"))==null?void 0:a.value)||"500"),h=parseInt(((s=document.getElementById("selDuration"))==null?void 0:s.value)||"24");try{const m=await o.listAuction(l,v,b,h);p(m.message,"success"),e.player=m.player,f(),e._auctionTab="mine",await y()}catch(m){p(m.message,"error")}})}y()}function Kt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const l=e._market;async function g(){try{const[d,a]=await Promise.all([o.getMarketListings(l.filter,l.sort),o.getMyListings(r)]);l.listings=d.listings||[],l.myListings=a.listings||[],l.loaded=!0,$()}catch(d){p(d.message||"Lỗi tải Giao Dịch Đài","error")}}async function y(){try{const[d,a]=await Promise.all([o.getMugTargets(r),o.getMugLog(r)]);l.mugTargets=d.targets||[],l.mugCooldown=d.mugCooldown||0,l.mugLog=a.logs||[],$()}catch(d){p(d.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function $(){const d=e.player;if(n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${l.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${l.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${l.myListings.length}/10)</button>
        <button class="btn btn--sm ${l.tab==="auction"?"btn--gold":"btn--dark"}" data-mtab="auction">⚖️ Sàn Đấu Giá</button>
        <button class="btn btn--sm ${l.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${l.showListForm?b(d):""}

      ${l.tab==="browse"?u():l.tab==="my"?c():l.tab==="auction"?'<div id="auctionSubContent"></div>':v()}
    `,h(),l.tab==="auction"){const a=n.querySelector("#auctionSubContent");a&&wt(a,t)}}function u(){let d=`
      <div class="panel">
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn--xs ${l.filter===""?"btn--blue":"btn--dark"}" data-filter="">Tất cả</button>
            <button class="btn btn--xs ${l.filter==="item"?"btn--blue":"btn--dark"}" data-filter="item">⚔️ Trang Bị</button>
            <button class="btn btn--xs ${l.filter==="material"?"btn--blue":"btn--dark"}" data-filter="material">🧱 Nguyên Liệu</button>
            <button class="btn btn--xs ${l.filter==="medicine"?"btn--blue":"btn--dark"}" data-filter="medicine">💊 Đan Dược</button>
            <select id="sortSelect" style="padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:12px;margin-left:auto">
              <option value="newest" ${l.sort==="newest"?"selected":""}>Mới nhất</option>
              <option value="price_asc" ${l.sort==="price_asc"?"selected":""}>Giá tăng</option>
              <option value="price_desc" ${l.sort==="price_desc"?"selected":""}>Giá giảm</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo tên vật phẩm hoặc affix..." value="${l.search}" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
          </div>
        </div>
      </div>
    `,a=l.listings;if(l.search.trim()){const s=l.search.toLowerCase().trim();a=a.filter(m=>{var i;return m.item_name.toLowerCase().includes(s)?!0:(i=m.item_data)!=null&&i.affixes?m.item_data.affixes.some(x=>(x.stat||"").toLowerCase().includes(s)||(x.type||"").toLowerCase().includes(s)):!1})}return a.length===0?d+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(d+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',d+=a.map(s=>{var L,w;const m=s.item_type==="item"?"⚔️":s.item_type==="material"?"🧱":"💊",i=((L=s.item_data)==null?void 0:L.rarity)||"",x=s.seller_id===r,T=(w=s.item_data)!=null&&w.affixes?s.item_data.affixes.map(S=>`${S.stat} ${S.type==="flat"?"+":""}${S.value}${S.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${m}
                <span style="color:var(--gold)">${s.item_name}</span>
                ${s.quantity>1?`<span style="opacity:0.5"> x${s.quantity}</span>`:""}
                ${i?`<span class="rarity-${i}" style="font-size:11px;margin-left:4px">[${i}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${s.seller_name}</span>
                ${T?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${T}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${s.price}${s.quantity>1?"/cái":""}</span>
              ${x?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${s.id}" data-qty="${s.quantity}" data-price="${s.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),d+="</div></div>"),d}function c(){if(l.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let d='<div class="panel"><div class="panel-body no-pad">';return d+=l.myListings.map(a=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${a.item_type==="item"?"⚔️":a.item_type==="material"?"🧱":"💊"} ${a.item_name} ${a.quantity>1?`<span style="opacity:0.5">x${a.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${a.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${a.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),d+="</div></div>",d}function v(){let d=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${l.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${l.mugCooldown}s</div>`:""}
    `;return l.mugTargets.length===0?d+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':d+=l.mugTargets.map(a=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${a.gender==="female"?"♀":"♂"} ${a.name}</div>
            <div class="item-meta">Lv.${a.level} · ${a.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${a.id}" ${l.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),d+="</div></div>",l.mugLog.length>0&&(d+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${l.mugLog.map(a=>{const s=a.attacker_id===r,m=a.outcome==="success"?"✅":"❌",i=a.outcome==="success"?"var(--green)":"var(--red)",x=s?a.outcome==="success"?`Cướp ${a.victim_name}: +${a.gold_stolen} 💎`:`Phục kích ${a.victim_name} thất bại!`:a.outcome==="success"?`Bị ${a.attacker_name} cướp: -${a.gold_stolen} 💎`:`${a.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${i}">${m} ${x} <span style="opacity:0.4;margin-left:auto">${new Date(a.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),d}function b(d){const a=Object.entries(d.materials||{}).map(([x,T])=>({id:x,qty:T,type:"material",name:x})),s=Object.entries(d.medicines||{}).map(([x,T])=>({id:x,qty:T,type:"medicine",name:x})),m=(d.inventory||[]).map(x=>({id:x.id,qty:1,type:"item",name:x.name||x.id})),i=[...a,...s,...m];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${i.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${i.map(x=>`<option value="${x.type}|${x.id}">${x.type==="item"?"⚔️":x.type==="material"?"🧱":"💊"} ${x.name} ${x.qty>1?`(có: ${x.qty})`:""}</option>`).join("")}
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
    `}function h(){var d,a,s,m;document.querySelectorAll("[data-mtab]").forEach(i=>{i.addEventListener("click",()=>{if(l.tab=i.dataset.mtab,l.tab==="mug"&&l.mugTargets.length===0){y();return}$()})}),(d=document.getElementById("btnShowList"))==null||d.addEventListener("click",()=>{l.showListForm=!l.showListForm,$()}),document.querySelectorAll("[data-filter]").forEach(i=>{i.addEventListener("click",async()=>{l.filter=i.dataset.filter,await g()})}),(a=document.getElementById("sortSelect"))==null||a.addEventListener("change",async i=>{l.sort=i.target.value,await g()}),(s=document.getElementById("searchInput"))==null||s.addEventListener("input",i=>{l.search=i.target.value,$();const x=document.getElementById("searchInput");x&&(x.focus(),x.setSelectionRange(l.search.length,l.search.length))}),(m=document.getElementById("btnConfirmList"))==null||m.addEventListener("click",async()=>{var S,E,P;const i=(S=document.getElementById("listItem"))==null?void 0:S.value;if(!i)return;const[x,T]=i.split("|"),L=parseInt((E=document.getElementById("listQty"))==null?void 0:E.value)||1,w=parseInt((P=document.getElementById("listPrice"))==null?void 0:P.value)||0;if(w<=0)return p("Giá phải lớn hơn 0!","error");try{const M=await o.listForSale(r,x,T,L,w);p(M.message,"success"),e.player=M.player,f(),l.showListForm=!1,await g()}catch(M){p(M.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(i=>{i.addEventListener("click",async()=>{const x=parseInt(i.dataset.buy),T=parseInt(i.dataset.qty),L=parseInt(i.dataset.price);let w=1;if(T>1){const S=prompt(`Mua bao nhiêu? (tối đa ${T}, giá ${L} 💎/cái)`,"1");if(!S)return;w=Math.min(parseInt(S)||1,T)}i.disabled=!0;try{const S=await o.buyFromMarket(r,x,w);p(S.message,"success"),e.player=S.player,f(),await g()}catch(S){p(S.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(i=>{i.addEventListener("click",async()=>{i.disabled=!0;try{const x=await o.cancelListing(r,parseInt(i.dataset.cancel));p(x.message,"success"),e.player=x.player,f(),await g()}catch(x){p(x.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(i=>{i.addEventListener("click",async()=>{const x=i.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){i.disabled=!0,i.textContent="⏳...";try{const T=await o.mugPlayer(r,x);p(T.message,T.success?"success":"error"),e.player=T.player,f(),await y()}catch(T){p(T.message,"error"),i.disabled=!1,i.textContent="💀 Phục Kích"}}})})}l.tab==="mug"?y():l.loaded?$():g()}function jt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;let l=!1,g=null;async function y(){try{g=await o.getRealmInfo(r),l=!0,$()}catch(v){p(v.message||"Lỗi tải Cảnh Giới","error")}}function $(){if(!g)return;const v=g.current,b=g.allRealms||[],h=e.player,d=h.xpToNext>0?Math.floor(h.xp/h.xpToNext*100):0;n.innerHTML=`
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
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${h.level} — ${h.xp}/${h.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${d}%;background:${v.color}"></div></div>
        </div>

        ${v.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(v.bonuses).filter(([,a])=>a>0).map(([a,s])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${s} ${a}</span>
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
      ${v.canBreakthrough?u(v):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${b.map(a=>{const s=a.tier===v.tier,m=a.tier<v.tier,x=a.tier>v.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${s?`2px solid ${a.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${x};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${a.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${a.color}">${a.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${a.levelMin}+</span>
                ${a.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${a.failChance}% thất bại</span>`:""}
                ${m?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${s?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,c()}function u(v){const b=v.nextRealm;if(!b)return"";const h=b.cost?`💎 ${b.cost.gold} + 🔮 ${b.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${b.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${b.name} ${b.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${h}</div>
          ${b.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${b.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(b.bonuses).filter(([,d])=>d>0).map(([d,a])=>`+${a} ${d}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${b.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function c(){var v;(v=document.getElementById("btnBreakthrough"))==null||v.addEventListener("click",()=>{ut(t)})}y()}function Dt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t;Vt(n,t)}async function Vt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t;n.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const l=(await o.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,f()),l.length===0){n.innerHTML=`
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
            ${l.map(g=>{const y=new Date(g.created_at*1e3),$=y.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),u=y.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let c="📌";return c={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[g.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${$}</div>
                    <div>${u}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${c}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${g.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${g.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(r){n.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${r.message}</div></div>`}}function Ut(n,t){const{state:e,api:o,notify:p,updateSidebar:f,renderGame:r}=t,l=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const g=e._housing;async function y(){try{const b=await o.getHousing(l);g.data=b,g.loaded=!0,$()}catch(b){p(b.message||"Lỗi tải Động Phủ","error")}}function $(){const b=g.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${b.owned?c(b):u(b)}
    `,v()}function u(b){const h=b.tiers[1];return`
      <div class="panel">
        <div class="panel-title">🏗️ Mua Động Phủ</div>
        <div class="panel-body" style="text-align:center;padding:24px">
          <div style="font-size:40px;margin-bottom:12px">🏠</div>
          <div style="font-weight:600;margin-bottom:6px">${h.name}</div>
          <div style="font-size:12px;opacity:0.6;margin-bottom:12px">${h.description}</div>
          <div style="margin-bottom:12px">
            <span style="color:var(--green)">❤️ +${h.hpRegen} HP/phút</span> ·
            <span style="color:var(--blue)">🌿 ${h.gardenSlots} ô vườn</span>
          </div>
          <button class="btn btn--gold btn--lg" id="btnBuyHouse">💎 ${h.cost} Linh thạch — Mua</button>
        </div>
      </div>
    `}function c(b){const h=b.gardenSlots||[],d=b.gardenHerbs||{};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏠</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${b.tierInfo.name} <span style="opacity:0.4">(T${b.tier})</span></div>
            <div style="font-size:12px;opacity:0.6">${b.tierInfo.description}</div>
            <div style="font-size:12px;margin-top:4px">
              <span style="color:var(--green)">❤️ +${b.tierInfo.hpRegen} HP/phút</span> ·
              <span style="color:var(--blue)">🌿 ${b.maxSlots} ô vườn</span>
            </div>
          </div>
          ${b.nextTier?`
            <button class="btn btn--gold btn--sm" id="btnUpgrade" title="Nâng lên ${b.nextTier.name}">
              ⬆ ${b.nextTier.cost} 💎
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
          <div style="display:grid;grid-template-columns:repeat(${Math.min(b.maxSlots,5)},1fr);gap:8px">
            ${Array.from({length:b.maxSlots},(a,s)=>{const m=h[s]||{},i=!!m.herb,x=m.ready,T=m.remaining||0,L=Math.ceil(T/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${x?"var(--green)":i?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${i?`
                    <div style="font-size:20px">${x?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${m.herbName||m.herb}</div>
                    <div style="font-size:10px;color:${x?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${x?"✅ Sẵn sàng!":"⏳ "+L+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${s}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(d).map(([w,S])=>`<option value="${w}">${S.name}</option>`).join("")}
                    </select>
                  `}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>

      ${b.formations?`
      <div class="panel" style="margin-top:10px">
        <div class="panel-title flex justify-between">
          <span>🔮 Trận Pháp</span>
          ${b.dailyCost>0?`
            <span style="font-size:11px">
              Hao phí: <strong style="color:var(--orange)">${b.dailyCost} 💎/ngày</strong>
              ${b.maintenanceDue?'<button class="btn btn--sm btn--orange" id="btnMaintenance">💰 Nộp phí</button>':'<span style="color:var(--green);margin-left:6px">✅ Đã nộp</span>'}
            </span>
          `:""}
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
            ${Object.entries(b.formations).map(([a,s])=>{const m=s.currentLevel>=s.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${s.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${s.icon}</span>
                      <strong style="margin-left:4px">${s.name}</strong>
                      ${s.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${s.currentLevel}</span>`:""}
                    </div>
                    ${s.canBuild?m?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${a}">
                        ⬆ ${s.nextCost} 💎
                      </button>`:`<span style="font-size:10px;color:var(--red)">T${s.requiredTier}+</span>`}
                  </div>
                  <div style="font-size:11px;opacity:0.5;margin-top:4px">${s.description}</div>
                  ${s.currentLevel>0?`<div style="font-size:10px;color:var(--orange);margin-top:2px">Phí: ${s.nextDailyCost||(s.dailyCosts?s.dailyCosts[s.currentLevel-1]:"?")}/ngày</div>`:""}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `}function v(){var b,h,d,a;(b=document.getElementById("btnBuyHouse"))==null||b.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const s=await o.buyHousing(l);p(s.message,"success"),e.player=s.player,f(),await y()}catch(s){p(s.message,"error")}}),(h=document.getElementById("btnUpgrade"))==null||h.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const s=await o.buyHousing(l);p(s.message,"success"),e.player=s.player,f(),await y()}catch(s){p(s.message,"error")}}),document.querySelectorAll(".plant-select").forEach(s=>{s.addEventListener("change",async m=>{const i=m.target.value;if(!i)return;const x=parseInt(s.dataset.slot);try{const T=await o.plantHerb(l,i,x);p(T.message,"success"),await y()}catch(T){p(T.message,"error")}})}),(d=document.getElementById("btnHarvest"))==null||d.addEventListener("click",async()=>{try{const s=await o.harvestGarden(l);p(s.message,"success"),e.player=s.player,f(),await y()}catch(s){p(s.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(s=>{s.addEventListener("click",async()=>{const m=s.dataset.fid;s.disabled=!0,s.textContent="⏳...";try{const i=await o.upgradeFormation(l,m);p(i.message,"success"),e.player=i.player,f(),await y()}catch(i){p(i.message,"error"),s.disabled=!1,s.textContent="⬆ Nâng"}})}),(a=document.getElementById("btnMaintenance"))==null||a.addEventListener("click",async()=>{try{const s=await o.payMaintenance(l);p(s.message,"success"),e.player=s.player,f(),await y()}catch(s){p(s.message,"error")}})}g.loaded?$():y()}function Ft(n,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function o(){n.innerHTML=`
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
      `}[f]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}o()}function Qt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const l=e._npcShop;let g=parseInt(localStorage.getItem("npcShopIdx")||"0");async function y(){try{n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const c=await o.getShops(r);l.shops=c.shops||[],l.tax=c.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},l.loaded=!0,g>=l.shops.length&&(g=0),$()}catch(c){p(c.message||"Lỗi tải shop","error")}}function $(){var a;if(l.shops.length===0){n.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const c=l.shops[g]||l.shops[0],v=l.shops.map((s,m)=>`
      <button class="skill-tab ${m===g?"active":""}" data-shop-idx="${m}">
        ${s.icon||"🧓"} ${s.name}
      </button>
    `).join(""),b={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},h={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},d=(c.items||[]).map(s=>{var L,w;const m=b[s.rarity||"common"]||"#888",i=h[s.rarity||"common"]||"Phàm",x=(s.remainingStock??1)<=0,T=(((L=e.player)==null?void 0:L.gold)??0)>=(s.currentPrice||0);return`
        <div class="shop-item-card ${x?"out-of-stock":""}" style="border-left:3px solid ${m}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${m}">${s.name}</div>
              <div class="shop-item-rarity" style="color:${m}">${i} · Tầng ${s.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${x?"var(--red)":"var(--green)"}">
                ${x?"❌ Hết hàng":`📦 ${s.remainingStock}/${s.dailyStock}`}
              </span>
            </div>
          </div>
          ${s.description?`<div class="shop-item-desc">${s.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${T?"":"too-expensive"}">
              💎 ${((w=s.currentPrice)==null?void 0:w.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${c.id}" data-item="${s.id}" 
                value="1" min="1" max="${s.remainingStock||1}" 
                ${x?"disabled":""}>
              <button class="btn btn--sm ${x?"":T?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${c.id}" data-item="${s.id}"
                ${x||!T?"disabled":""}>
                ${x?"❌":T?"🛒 Mua":"💸 Thiếu"}
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
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${l.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(((a=e.player)==null?void 0:a.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${c.area||"Không rõ"}</div>
      </div>

      ${l.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${v}</div>`:""}

      <div class="shop-items-grid">
        ${d||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,u()}function u(){n.querySelectorAll(".skill-tab[data-shop-idx]").forEach(c=>{c.addEventListener("click",()=>{g=parseInt(c.dataset.shopIdx),localStorage.setItem("npcShopIdx",g),$()})}),n.querySelectorAll(".btn-buy").forEach(c=>{c.addEventListener("click",async()=>{const v=c.dataset.shop,b=c.dataset.item,h=n.querySelector(`.buy-qty[data-shop="${v}"][data-item="${b}"]`),d=parseInt((h==null?void 0:h.value)||1);c.disabled=!0,c.textContent="⏳...";try{const a=await o.buyFromShop(r,v,b,d);p(a.message,"success"),e.player=a.player,f(),await y()}catch(a){p(a.message,"error"),c.disabled=!1,c.textContent="🛒 Mua"}})})}l.loaded?$():y()}function Jt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const l=e._guild;async function g(){try{l.data=await o.getMyGuild(r),l.loaded=!0,$()}catch(b){p(b.message||"Lỗi","error")}}async function y(){try{const b=await o.listGuilds();l.allGuilds=b.guilds||[],$()}catch(b){p(b.message,"error")}}function $(){const b=l.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${b!=null&&b.inGuild?c(b):u(b)}
    `,v()}function u(b){return`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🏗️ Lập Tông Môn Mới</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:grid;gap:8px;max-width:360px">
            <input type="text" id="guildName" placeholder="Tên Tông Môn (2-30 ký tự)" class="input" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <input type="text" id="guildTag" placeholder="Tag (2-5 ký tự, VD: TMQ)" class="input" maxlength="5" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <textarea id="guildDesc" placeholder="Mô tả..." rows="2" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;resize:none"></textarea>
            <button class="btn btn--gold" id="btnCreate">🏯 Lập Tông Môn (${(b==null?void 0:b.createCost)||1e4} 💎)</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>📋 Danh Sách Tông Môn</span>
          <button class="btn btn--sm btn--dark" id="btnLoadGuilds">🔄 Tải</button>
        </div>
        <div class="panel-body no-pad" id="guildList">
          ${l.allGuilds?l.allGuilds.map(h=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
              <div style="flex:1">
                <div style="font-weight:600">[${h.tag}] ${h.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${h.level} · ${h.member_count}/${h.max_members} · Quỹ: ${h.treasury} 💎 · Chưởng Môn: ${h.leader_name}</div>
              </div>
              <button class="btn btn--sm btn--green btn-join" data-gid="${h.id}" ${h.member_count>=h.max_members?"disabled":""}>
                ${h.member_count>=h.max_members?"Đầy":"Gia nhập"}
              </button>
            </div>
          `).join(""):'<div style="padding:20px;text-align:center;opacity:0.3">Nhấn "Tải" để xem danh sách</div>'}
        </div>
      </div>
    `}function c(b){var s;const h=b.guild,d=b.members||[],a=b.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${h.tag}] ${h.name} <span style="opacity:0.3">Lv${h.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((s=h.levelInfo)==null?void 0:s.name)||""} · ${h.memberCount}/${h.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${h.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${h.dailyUpkeep}/ngày</span>
              ${h.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(h.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(h.buffs).map(([m,i])=>`${m} +${i}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${b.myRole==="leader"&&h.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${h.nextLevel.name}">⬆ ${h.nextLevel.upgradeCost} 💎</button>`:""}
            ${b.myRole==="leader"&&h.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            Bạn đã đóng: ${b.myContributed} 💎 · Vai trò: ${b.myRole==="leader"?"👑 Chưởng Môn":b.myRole==="elder"?"⭐ Trưởng Lão":"🙋 Đệ Tử"}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">📜 Nhật Ký</div>
          <div class="panel-body" style="max-height:160px;overflow-y:auto;padding:8px 12px">
            ${a.slice(0,10).map(m=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(m.created_at).toLocaleString("vi")}</span>
                ${m.detail||m.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${d.length}/${h.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${d.map(m=>`
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

      ${b.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function v(){var b,h,d,a,s,m;(b=document.getElementById("btnCreate"))==null||b.addEventListener("click",async()=>{var L,w,S,E,P,M;const i=(w=(L=document.getElementById("guildName"))==null?void 0:L.value)==null?void 0:w.trim(),x=(E=(S=document.getElementById("guildTag"))==null?void 0:S.value)==null?void 0:E.trim(),T=(M=(P=document.getElementById("guildDesc"))==null?void 0:P.value)==null?void 0:M.trim();if(!i||!x)return p("Nhập tên và tag!","error");try{const O=await o.createGuild(r,i,x,T);p(O.message,"success"),e.player=O.player,f(),l.loaded=!1,await g()}catch(O){p(O.message,"error")}}),(h=document.getElementById("btnLoadGuilds"))==null||h.addEventListener("click",y),document.querySelectorAll(".btn-join").forEach(i=>{i.addEventListener("click",async()=>{try{const x=await o.joinGuild(r,parseInt(i.dataset.gid));p(x.message,"success"),l.loaded=!1,await g()}catch(x){p(x.message,"error")}})}),(d=document.getElementById("btnContribute"))==null||d.addEventListener("click",async()=>{var x;const i=parseInt(((x=document.getElementById("contributeAmt"))==null?void 0:x.value)||0);if(!(i<=0))try{const T=await o.contributeGuild(r,i);p(T.message,"success"),e.player=T.player,f(),await g()}catch(T){p(T.message,"error")}}),(a=document.getElementById("btnUpgradeGuild"))==null||a.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const i=await o.upgradeGuild(r);p(i.message,"success"),await g()}catch(i){p(i.message,"error")}}),(s=document.getElementById("btnPayUpkeep"))==null||s.addEventListener("click",async()=>{try{const i=await o.payGuildUpkeep(l.data.guild.id);p(i.message,"success"),await g()}catch(i){p(i.message,"error")}}),(m=document.getElementById("btnLeave"))==null||m.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const i=await o.leaveGuild(r);p(i.message,"success"),l.loaded=!1,await g()}catch(i){p(i.message,"error")}})}l.loaded?$():g()}function Wt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const l=e._profile;function g(){n.innerHTML=`
      <div class="page-header">
        <h2>🔍 Tìm Đạo Hữu</h2>
        <p class="page-sub">Tìm kiếm người chơi theo tên. Xem profile, tấn công hoặc kết bạn.</p>
      </div>

      <div class="panel" style="margin-bottom:12px">
        <div class="panel-body" style="padding:12px 16px;display:flex;gap:8px">
          <input type="text" id="searchInput" placeholder="Nhập tên người chơi..."
            value="${l.searchQuery}"
            style="flex:1;padding:8px 12px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
          <button class="btn btn--blue" id="btnSearch">🔍 Tìm</button>
        </div>
      </div>

      ${l.viewing?y(l.viewing):""}

      ${l.results.length>0&&!l.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${l.results.length})</div>
        <div class="panel-body no-pad">
          ${l.results.map(c=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" data-view="${c.id}">
              <div style="flex:1">
                <div style="font-weight:600">${c.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${c.level} · Realm T${c.realm_tier||"?"}</div>
              </div>
              <button class="btn btn--sm btn--dark btn-view" data-vid="${c.id}">👁 Xem</button>
            </div>
          `).join("")}
        </div>
      </div>
      `:!l.viewing&&l.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,$()}function y(c){var d,a,s;const v=c.id===r,b=c.maxHp>0?Math.round(c.currentHp/c.maxHp*100):100,h={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((d=c.name[0])==null?void 0:d.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${c.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${c.level} · ${((a=c.realmInfo)==null?void 0:a.fullName)||"Phàm Nhân"}
                ${c.guild?` · <span style="color:var(--blue)">[${c.guild.tag}] ${c.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${h[c.currentArea]||c.currentArea}
                ${c.housingTier>0?` · 🏠 T${c.housingTier}`:""}
                · 📜 ${c.skills} kỹ năng · ⚔ ${c.items} vật phẩm
              </div>
            </div>
          </div>

          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ Khí Huyết</span><span>${c.currentHp}/${c.maxHp}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${b}%;background:${b>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">💪 STR</div>
              <div style="font-weight:700;color:var(--red)">${c.stats.strength}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">⚡ SPD</div>
              <div style="font-weight:700;color:var(--blue)">${c.stats.speed}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🎯 DEX</div>
              <div style="font-weight:700;color:var(--orange)">${c.stats.dexterity}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🛡 DEF</div>
              <div style="font-weight:700;color:var(--green)">${c.stats.defense}</div>
            </div>
          </div>

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(s=c.gold)==null?void 0:s.toLocaleString()} 💎</strong></div>

          ${v?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${c.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${c.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function $(){var c,v,b,h,d;(c=document.getElementById("btnSearch"))==null||c.addEventListener("click",u),(v=document.getElementById("searchInput"))==null||v.addEventListener("keydown",a=>{a.key==="Enter"&&u()}),document.querySelectorAll(".btn-view, [data-view]").forEach(a=>{a.addEventListener("click",async()=>{const s=a.dataset.vid||a.dataset.view;try{const m=await o.getPlayerProfile(s);l.viewing=m.profile,g()}catch(m){p(m.message,"error")}})}),(b=document.getElementById("btnAttack"))==null||b.addEventListener("click",async()=>{const a=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${l.viewing.name}?`))try{const s=await o.mugPlayer(r,a);p(s.message,s.won?"success":"error"),s.player&&(e.player=s.player,f())}catch(s){p(s.message,"error")}}),(h=document.getElementById("btnAddFriend"))==null||h.addEventListener("click",async()=>{const a=document.getElementById("btnAddFriend").dataset.tid;try{const s=await o.addFriend(r,a);p(s.message||"Đã gửi lời mời!","success")}catch(s){p(s.message,"error")}}),(d=document.getElementById("btnBackSearch"))==null||d.addEventListener("click",()=>{l.viewing=null,g()})}async function u(){var b;const c=document.getElementById("searchInput"),v=(b=c==null?void 0:c.value)==null?void 0:b.trim();if(!v||v.length<2)return p("Nhập ít nhất 2 ký tự!","error");l.searchQuery=v,l.viewing=null;try{const h=await o.searchPlayers(v);l.results=h.players||[],g()}catch(h){p(h.message,"error")}}g()}function Xt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const l=e._arena;async function g(){try{l.data=await o.getArena(r),l.loaded=!0,y()}catch(u){p(u.message,"error")}}function y(){var a,s,m,i,x,T,L,w;const u=l.data,c=(u==null?void 0:u.arena)||{},v=c.rank||{},b=parseInt(c.streak)||0,h=b>=5?`🔥x${b}`:b>=3?`⚡x${b}`:b>0?`${b}W`:b<0?`${Math.abs(b)}L`:"",d=b>=5?"var(--gold)":b>=3?"var(--orange)":b>0?"var(--green)":b<0?"var(--red)":"var(--text-dim)";n.innerHTML=`
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
              ELO: <strong>${c.rating||1e3}</strong> · ${c.wins||0}W/${c.losses||0}L
              ${h?` · <span style="color:${d};font-weight:700">${h}</span>`:""}
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
      ${(a=l.lastResult)!=null&&a.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(s=l.lastResult.newRank)==null?void 0:s.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(m=l.lastResult.newRank)==null?void 0:m.name}!</div>
      </div>
      `:""}

      <!-- LAST RESULT -->
      ${l.lastResult?`
      <div class="panel" style="margin-bottom:12px;border-left:3px solid ${l.lastResult.won?"var(--green)":"var(--red)"}">
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:700;color:${l.lastResult.won?"var(--green)":"var(--red)"}">
            ${l.lastResult.won?"🏆 CHIẾN THẮNG!":"💀 THẤT BẠI!"}
          </div>
          <div style="font-size:12px;margin-top:4px">
            Đối thủ: <strong>${(i=l.lastResult.opponent)==null?void 0:i.name}</strong> 
            ${(x=l.lastResult.opponent)!=null&&x.rank?l.lastResult.opponent.rank.icon:""} 
            (ELO ${(T=l.lastResult.opponent)==null?void 0:T.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${l.lastResult.ratingChange>0?"+":""}${l.lastResult.ratingChange}
            ${l.lastResult.goldEarned>0?` · +${l.lastResult.goldEarned} 💎`:""}
          </div>
          ${(L=l.lastResult.combatLog)!=null&&L.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${l.lastResult.combatLog.map(S=>`<div>${S}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(u.opponents||[]).length>0?(u.opponents||[]).map(S=>{var E,P,M;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((E=S.rank)==null?void 0:E.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${S.name} <span style="opacity:0.4;font-size:11px">Lv.${S.level}</span></div>
                <div style="font-size:11px;color:${((P=S.rank)==null?void 0:P.color)||"#888"}">${((M=S.rank)==null?void 0:M.name)||"Đồng"} · ELO ${S.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${S.player_id}" ${l.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${l.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${u.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(u.top10||[]).map((S,E)=>{var P,M;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${E<3?"var(--gold)":"var(--text-dim)"}">#${E+1}</span>
                <span>${((P=S.rank)==null?void 0:P.icon)||""}</span>
                <span style="flex:1">${S.name}</span>
                <span style="color:${((M=S.rank)==null?void 0:M.color)||"var(--blue)"}; font-weight:600">${S.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(u.history||[]).map(S=>{const E=S.winner_id===r;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${E?"var(--green)":"var(--red)"}">
                  ${E?"✅":"❌"} vs ${S.attacker_id===r?S.defender_name:S.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${S.rating_change>0?"+":""}${S.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll(".btn-fight-opp").forEach(S=>{S.addEventListener("click",E=>$(E.target.dataset.oid))}),(w=document.getElementById("btnRandomFight"))==null||w.addEventListener("click",()=>$(null))}async function $(u){l.fighting=!0,y();try{const c=await o.request(`/player/${r}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:u})});l.lastResult=c,e.player=c.player,f(),p(c.message,c.won?"success":"error"),l.fighting=!1,await g()}catch(c){p(c.message,"error"),l.fighting=!1,y()}}l.loaded?y():g()}function Yt(n,t){const{state:e,api:o,notify:p,updateSidebar:f}=t,r=e.playerId;async function l(){try{e._worldBoss=await o.getWorldBoss(),g()}catch(y){p(y.message,"error")}}function g(){var h;const y=e._worldBoss||{},$=y.boss||{},u=y.hpPercent||0,c=y.topContributors||[],v=y.rewards||{},b=$.status==="active"&&$.current_hp>0;n.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${b?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${$.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${$.level||"?"} · ${b?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${($.current_hp||0).toLocaleString()} / ${($.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${u}%;background:${u>50?"var(--red)":u>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${b?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${v.gold||0} · ✨ ${v.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':c.map((d,a)=>{var s;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${a<3?"var(--gold)":"var(--text-dim)"}">#${a+1}</span>
                <span style="flex:1">${d.name}</span>
                <span style="color:var(--red)">${(s=d.total_damage)==null?void 0:s.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${d.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(h=document.getElementById("btnAttackBoss"))==null||h.addEventListener("click",async()=>{const d=document.getElementById("btnAttackBoss");d.disabled=!0,d.textContent="⏳ Đang giao chiến...";const a=document.getElementById("bossCombatResult");try{const s=await o.attackWorldBoss(r);if(e.player=s.player,f(),s.log&&s.log.length>0){const m=s.log.map(L=>L.startsWith("---")?`<div class="turn">${L}</div>`:L.includes("hụt")?`<div class="miss">${L}</div>`:L.includes("né được")?`<div class="dodge">${L}</div>`:L.includes("CHÍNH MẠNG")||L.includes("💥")?`<div class="crit">${L}</div>`:L.includes("🔥")?`<div class="heavy text-orange">${L}</div>`:L.includes("chặn hoàn toàn")||L.includes("🛡")?`<div class="dodge">${L}</div>`:L.includes("ngã xuống")||L.includes("💀")?`<div class="death">${L}</div>`:L.includes("Chiến thắng")||L.includes("🏆")?`<div class="victory">${L}</div>`:L.includes("bỏ chạy")||L.includes("🏃")?`<div class="flee">${L}</div>`:L.includes("Bất phân")||L.includes("🤝")?`<div class="stalemate">${L}</div>`:L.includes("🧪")?`<div class="status-effect text-purple">${L}</div>`:L.includes("💔")?`<div class="dot-damage text-purple bold">${L}</div>`:L.includes("✨")?`<div class="regen text-green">${L}</div>`:`<div class="hit">${L}</div>`).join(""),i={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},x=i[s.outcome]||i.loss,T=Math.max(0,e.player.currentHp/e.player.maxHp*100);a.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${x.icon} ${x.text}
                <span class="subtitle">${s.turns}/${s.maxTurns||25} lượt · ⚔️ ${s.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${x.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${T}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${$.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(s.bossHp/s.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${s.bossHp.toLocaleString()}/${s.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${m}</div>
            </div>`}s.defeated?p(s.message,"success"):p(`⚔️ ${s.damage} dmg!`,"info"),await l()}catch(s){p(s.message,"error"),d.disabled=!1,d.textContent="⚔️ Tấn Công"}})}l()}function Zt(n,t){const{state:e,api:o,notify:p,updateSidebar:f,renderGame:r}=t,l=e.playerId,g={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function y(){var u;try{const[c,v]=await Promise.all([o.getGachaPools(),o.getGachaPity(l)]);e._gacha={pools:c.pools||{},pity:v.pity||{},results:((u=e._gacha)==null?void 0:u.results)||[]},$()}catch(c){p(c.message,"error")}}function $(){const u=e._gacha||{},c=u.pools||{},v=u.pity||{},b=u.results||[];n.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(c).map(([h,d])=>{var s,m,i;const a=v[h]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${h==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${d.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${g.legendary}">★ ${(s=d.rates)==null?void 0:s.legendary}%</span> ·
                <span style="color:${g.rare}">◆ ${(m=d.rates)==null?void 0:m.rare}%</span> ·
                <span style="color:${g.uncommon}">● ${(i=d.rates)==null?void 0:i.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${a.pulls_since_rare||0}/${d.pityRare} · Legend: ${a.pulls_since_legendary||0}/${d.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${h}" data-pulls="1">💎 ${d.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${h}" data-pulls="10">💎 ${d.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${b.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${b.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${b.map(h=>{var d,a,s,m;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${g[h.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((d=h.item)==null?void 0:d.slot)==="weapon"?"⚔️":((a=h.item)==null?void 0:a.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${g[h.rarity]}">${((s=h.item)==null?void 0:s.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${h.rarity}] ${(((m=h.item)==null?void 0:m.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-pull").forEach(h=>h.addEventListener("click",async()=>{const d=h.dataset.pool,a=parseInt(h.dataset.pulls);h.disabled=!0,h.textContent="⏳...";try{const s=await o.gachaPull(e.playerId,d,a);p(s.message,"success"),e.player=s.player,f(),e._gacha.results=s.results||[],e._gacha.pity[d]=s.pity,$()}catch(s){p(s.message,"error"),h.disabled=!1}}))}y()}function te(n,t){const{state:e,api:o,notify:p}=t;e._lbTab||(e._lbTab="level");async function f(){const l=e._lbTab||"level";n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const g=await o.getLeaderboard(l);e._lbData=g,r()}catch(g){n.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${g.message}
      </div></div>`}}function r(){const l=e._lbTab||"level",y=(e._lbData||{}).rankings||[],u=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(v=>`
      <button class="skill-tab ${l===v.id?"active":""}" data-tab="${v.id}">
        ${v.icon} ${v.name}
      </button>
    `).join("");let c="";y.length===0?c='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':l==="guild"?c=y.map((v,b)=>`
        <div class="lb-row ${b<3?"lb-top":""}">
          <div class="lb-rank ${b<3?"lb-rank-top":""}">${b<3?["🥇","🥈","🥉"][b]:"#"+(b+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${v.tag}] ${v.name}</div>
            <div class="lb-sub">👤 ${v.members}/${v.max_members} · Leader: ${v.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(v.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${v.level}</div>
          </div>
        </div>
      `).join(""):l==="pvp"?c=y.map((v,b)=>`
        <div class="lb-row ${b<3?"lb-top":""}">
          <div class="lb-rank ${b<3?"lb-rank-top":""}">${b<3?["🥇","🥈","🥉"][b]:"#"+(b+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${v.name}</div>
            <div class="lb-sub">Lv.${v.level} · ${v.wins||0}W/${v.losses||0}L${v.streak>0?` · 🔥${v.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${v.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):c=y.map((v,b)=>`
        <div class="lb-row ${b<3?"lb-top":""}">
          <div class="lb-rank ${b<3?"lb-rank-top":""}">${b<3?["🥇","🥈","🥉"][b]:"#"+(b+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${v.name}</div>
            <div class="lb-sub">${v.realm_tier?`Cảnh giới ${v.realm_tier}`:""} ${l==="level"?`· Lv.${v.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${l==="gold"?`💎 ${parseInt(v.gold||0).toLocaleString()}`:`Lv.${v.level}`}
            </div>
          </div>
        </div>
      `).join(""),n.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${u}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${c}
        </div>
      </div>
    `,n.querySelectorAll(".skill-tab[data-tab]").forEach(v=>{v.addEventListener("click",()=>{e._lbTab=v.dataset.tab,f()})})}f()}const H={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},Lt=document.getElementById("app"),st={get state(){return H},api:D,notify:W,renderGame:J,updateSidebar:re};async function ee(){const n=localStorage.getItem("isLoggedOut")==="true",t=localStorage.getItem("playerId");if(!n&&t&&!H.playerId)try{const e=await D.getPlayer(t);H.playerId=t,H.player=e.player,await tt(),J();return}catch{localStorage.removeItem("playerId")}if(!n&&!H.playerId)try{const e=await D.login("admin","admin");H.playerId=e.id,H.player=e.player,localStorage.setItem("playerId",e.id),await tt(),J();return}catch(e){console.warn("Dev auto-login failed. Fallback to intro UI.",e)}H.playerId?J():dt()}function dt(){var t,e;const n=H.authTab||"login";Lt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(o=>{o.addEventListener("click",()=>{H.authTab=o.dataset.auth,dt()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const o=document.getElementById("inpUsername").value.trim(),p=document.getElementById("inpPassword").value;if(!o||!p)return W("Vui lòng nhập đầy đủ","error");try{const f=await D.login(o,p);H.playerId=f.id,H.player=f.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",f.id),W(f.message,"success"),await tt(),J()}catch(f){W(f.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var l,g;const o=document.getElementById("inpUsername").value.trim(),p=document.getElementById("inpPassword").value,f=((l=document.getElementById("inpName"))==null?void 0:l.value.trim())||"Vô Danh",r=((g=document.querySelector('input[name="gender"]:checked'))==null?void 0:g.value)||"male";if(!o||!p)return W("Vui lòng nhập đầy đủ","error");try{const y=await D.register(o,p,f,r);H.playerId=y.id,H.player=y.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",y.id),W(y.message,"success"),await tt(),J()}catch(y){W(y.message||"Đăng ký thất bại!","error")}})}function St(n){const t=Math.floor(Date.now()/1e3),e=[];return n.hospitalUntil&&n.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:n.hospitalUntil,color:"var(--red)"}),n.medCooldownUntil&&n.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:n.medCooldownUntil,color:"var(--orange)"}),n.travelArrivesAt&&n.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:n.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(o=>{const p=Math.max(0,o.endTime-t),f=Math.floor(p/60),r=p%60,l=f>0?`${f}p${String(r).padStart(2,"0")}s`:`${r}s`;return`<span class="status-icon" data-end="${o.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${o.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${o.color};white-space:nowrap;
      " title="${o.label}">${o.icon} <span class="cd-time">${l}</span></span>`}).join("")}
  </div>`}let Z=null;function ne(){Z&&clearInterval(Z),Z=setInterval(()=>{const n=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),o=Math.max(0,e-n);if(o<=0){t.remove();return}const p=Math.floor(o/60),f=o%60,r=t.querySelector(".cd-time");r&&(r.textContent=p>0?`${p}p${String(f).padStart(2,"0")}s`:`${f}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function Ct(n){let t="";const o={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"},cuu_u_than_uyen:{icon:"👿",tooltip:"Cửu U Ma Khí: Tăng 35% Sát Thương, 20% Tốc Độ"},thai_co_hong_hoang:{icon:"🦕",tooltip:"Hồng Hoang Cổ Khí: Tăng 25% Máu, 20% Giáp"},chu_thien_tinh_hai:{icon:"🌌",tooltip:"Tinh Tú Luân Chuyển: Tăng 30% Tốc Độ, 25% Nhanh Nhẹn"},hon_don_tien_vuc:{icon:"🔮",tooltip:"Hỗn Độn Tiên Khí: Tăng 35% Toàn Bộ Thuộc Tính"},hon_nguyen_dao_canh:{icon:"👑",tooltip:"Hỗn Nguyên Đạo Vực: Tăng 60% Sát Thương, 50% Toàn Thuộc Tính"}}[n.currentArea];return o&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${o.tooltip}">${o.icon} Cảnh Vực</span>`),n.combatBuffs&&n.combatBuffs.length>0&&n.combatBuffs.forEach(p=>{let f="💊",r="Buff";p.type==="status"&&p.stat==="poison"?(f="☠️",r="Trúng Độc"):p.type==="status"&&p.stat==="confuse"?(f="👹",r="Ma Hóa"):p.stat==="allStats"||p.stat==="hp"||p.stat==="damage"?(f="🔥",r="Cuồng Nộ"):p.stat==="defense"||p.stat==="resist"?(f="🛡️",r="Kiên Cố"):p.stat==="speed"||p.stat==="dexterity"?(f="💨",r="Thân Pháp"):(f="✨",r="Cường Hóa");let l=p.duration?` (-${p.duration} Trận)`:"",g=`Hiệu ứng: ${p.stat} (${p.type} ${p.value})${p.duration?` - Còn lại: ${p.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${g}">${f} ${r}${l}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function J(){var m,i,x,T,L,w,S,E,P,M,O;const n=H.player,t=((m=n.stats)==null?void 0:m.maxHp)??n.maxHp??100,e=Math.min(t,n.currentHp),o=t>0?Math.min(100,Math.max(0,e/t*100)):0,p=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,f=((i=n.stats)==null?void 0:i.maxEnergy)??n.maxEnergy??50,r=n.usableEnergy??Math.max(0,f-(n.reservedEnergy??0)),l=n.reservationPct??0,g=r>0?Math.min(100,Math.max(0,n.currentEnergy/r*100)):0,y=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0,$=H.exploration?H.exploration[n.currentArea||"thanh_lam_tran"]:null,u=$?$.name:"Khám Phá",c=H._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");H._collapsedNav=c;const b={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[H.currentPage];b&&(c[b]=!1),Lt.innerHTML=`
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
          <div class="player-meta">Lv.${n.level} · ${((x=n.realmInfo)==null?void 0:x.fullName)||"?"}</div>
          ${St(n)}
          ${Ct(n)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${e}/${t}
                ${e<t?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(T=n.skills)!=null&&T.some(q=>q.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${o}%" data-low="${o<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực (Thế Giới)</span>
              <span>
                ${n.currentStamina??100}/${n.maxStamina??100}
                ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((L=n.stats)==null?void 0:L.staminaRegen)??2}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${p}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔵 Linh Lực (Thực Chiến)</span>
              <span>
                ${n.currentEnergy}/${r}
                ${l>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${l}% bởi Tâm Pháp Hào Quang">(Khóa ${l}%)</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${g}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>✨ Tu Vi (Cấp ${n.level})</span>
              <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${y.toFixed(1)}%)</span></span>
            </div>
            <div class="bar-track"><div class="bar-fill xp" style="width:${y}%"></div></div>
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
            📍 ${u} ${n.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':n.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(n.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <!-- PHÂN HỆ 1: KHÁM PHÁ & HÀNH TRÌNH (Trọng Tâm Gameplay) -->
          <li class="nav-section ${c.hanhtrinh?"collapsed":""}" data-section="hanhtrinh">
            <span>⚔️ KHÁM PHÁ & HÀNH TRÌNH</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${c.hanhtrinh?"collapsed":""}" id="sec-hanhtrinh">
            <li class="nav-item nav-item--hero ${H.currentPage==="combat"?"active":""}" data-page="combat">
              <span class="icon">🔍</span> Khám Phá (${u})
              <span class="badge" style="background: linear-gradient(135deg, #e8a43a, #f0c030); color: #1a1a2e; font-weight: 800; font-size: 9px; padding: 2px 6px;">CHÍNH</span>
            </li>
            <li class="nav-item ${["travel","dungeon","tiencanh"].includes(H.currentPage)?"active":""}" data-page="travel">
              <span class="icon">🗺️</span> Ngao Du Bát Hoang
              ${(n.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(H.currentPage)?"active":""}" data-page="quests">
              <span class="icon">📜</span> Thiên Cơ Nhiệm Vụ
              ${(n.activeQuests||[]).filter(q=>q.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(n.activeQuests||[]).filter(q=>q.status==="active").length}</span>`:""}
            </li>
          </div>

          <!-- PHÂN HỆ 2: TU CHÂN (Tự Thân & Tu Luyện) -->
          <li class="nav-section ${c.tuchan?"collapsed":""}" data-section="tuchan">
            <span>TU CHÂN</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${c.tuchan?"collapsed":""}" id="sec-tuchan">
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
          <li class="nav-section ${c.tranhdau?"collapsed":""}" data-section="tranhdau">
            <span>TRANH ĐẤU</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${c.tranhdau?"collapsed":""}" id="sec-tranhdau">
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
          <li class="nav-section ${c.tienphu?"collapsed":""}" data-section="tienphu">
            <span>TIÊN PHỦ</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${c.tienphu?"collapsed":""}" id="sec-tienphu">
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
          <li class="nav-section ${c.thuonghoi?"collapsed":""}" data-section="thuonghoi">
            <span>THƯƠNG HỘI</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${c.thuonghoi?"collapsed":""}" id="sec-thuonghoi">
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
          <li class="nav-section ${c.vothuong?"collapsed":""}" data-section="vothuong">
            <span>VÔ THƯỢNG</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${c.vothuong?"collapsed":""}" id="sec-vothuong">
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(q=>{q.addEventListener("click",()=>{H.currentPage=q.dataset.page,J()})}),document.querySelectorAll(".nav-section[data-section]").forEach(q=>{q.addEventListener("click",()=>{const k=q.dataset.section;H._collapsedNav=H._collapsedNav||{},H._collapsedNav[k]=!H._collapsedNav[k],localStorage.setItem("collapsedNav",JSON.stringify(H._collapsedNav));const I=document.getElementById(`sec-${k}`);I&&(I.classList.toggle("collapsed",H._collapsedNav[k]),q.classList.toggle("collapsed",H._collapsedNav[k]))})}),(E=document.getElementById("btnFabChat"))==null||E.addEventListener("click",()=>nt("chat")),(P=document.getElementById("btnFabSocial"))==null||P.addEventListener("click",()=>nt("social"));const h=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');h&&h.addEventListener("click",q=>{q.stopPropagation(),H.currentPage="events",H.popupOpen=!1,J()}),(M=document.getElementById("btnPopupClose"))==null||M.addEventListener("click",()=>{H.popupOpen=!1,J()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(q=>{q.addEventListener("click",()=>nt(q.dataset.popup))}),document.querySelectorAll(".btn-open-settings").forEach(q=>{q.addEventListener("click",k=>{k.stopPropagation(),de(n)})}),(O=document.getElementById("btnSidebarLogout"))==null||O.addEventListener("click",q=>{q.stopPropagation(),Et()}),se(),H.popupOpen&&ae();const d=document.getElementById("searchPlayerInput"),a=document.getElementById("searchResults");let s=null;d&&a&&(d.addEventListener("input",()=>{clearTimeout(s);const q=d.value.trim();if(q.length<2){a.style.display="none";return}s=setTimeout(async()=>{try{const k=await D.searchPlayers(q),I=k.players||k.results||[];I.length===0?a.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':a.innerHTML=I.map(C=>{var B;return`
              <div class="search-result" data-pid="${C.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${C.name} <span style="opacity:0.4">Lv.${C.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((B=C.realmInfo)==null?void 0:B.name)||""}</span>
              </div>
            `}).join(""),a.style.display="block",a.querySelectorAll(".search-result").forEach(C=>{C.addEventListener("click",()=>{H.currentPage="profile",H._viewProfileId=C.dataset.pid,a.style.display="none",d.value="",J()}),C.addEventListener("mouseenter",()=>C.style.background="rgba(255,255,255,0.08)"),C.addEventListener("mouseleave",()=>C.style.background="transparent")})}catch{a.style.display="none"}},300)}),d.addEventListener("blur",()=>{setTimeout(()=>{a.style.display="none"},200)}),d.addEventListener("keydown",q=>{q.key==="Escape"&&(a.style.display="none",d.blur())})),ne()}function nt(n){H.popupOpen=!0,H.popupPage=n,J()}function ae(){const n=document.getElementById("popupContent");n&&(H.popupPage==="chat"?kt(n,st):H.popupPage==="social"&&Tt(n,st))}const ie={combat:Mt,education:et,stats:_t,skills:et,inventory:at,travel:xt,alchemy:it,quests:$t,admin:Gt,social:Tt,chat:kt,market:Kt,realm:jt,events:Dt,dungeon:bt,housing:Ut,wiki:Ft,npcshop:Qt,guild:Jt,library:rt,profile:Wt,arena:Xt,auction:wt,dailyquest:ft,worldboss:Yt,gacha:Zt,leaderboard:te,tiencanh:yt,glitch:(n,t)=>{localStorage.setItem("skillsTab","glitch"),et(n,t)}};function se(){const n=document.getElementById("pageContent");if(!n)return;const t=ie[H.currentPage];t&&t(n,st)}function re(){var $,u,c,v,b,h;const n=H.player;if(!n)return;const t=(($=n.stats)==null?void 0:$.maxHp)??n.maxHp??100,e=Math.min(t,n.currentHp),o=t>0?Math.min(100,Math.max(0,e/t*100)):0,p=((u=n.stats)==null?void 0:u.maxEnergy)??n.maxEnergy??50,f=n.usableEnergy??Math.max(0,p-(n.reservedEnergy??0)),r=n.reservationPct??0,l=f>0?Math.min(100,Math.max(0,n.currentEnergy/f*100)):0,g=document.querySelector(".sidebar-player");if(g){const d=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,a=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0;g.innerHTML=`
      <div class="player-name">${n.name}</div>
      <div class="player-meta">Lv.${n.level} · ${((c=n.realmInfo)==null?void 0:c.fullName)||"?"}</div>
      ${St(n)}
      ${Ct(n)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${e}/${t}
            ${e<t?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(v=n.skills)!=null&&v.some(s=>s.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${o}%" data-low="${o<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực (Thế Giới)</span>
          <span>
            ${n.currentStamina??100}/${n.maxStamina??100}
            ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((b=n.stats)==null?void 0:b.staminaRegen)??2}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${d}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔵 Linh Lực (Thực Chiến)</span>
          <span>
            ${n.currentEnergy}/${f}
            ${r>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${r}% bởi Tâm Pháp Hào Quang">(Khóa ${r}%)</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${l}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>✨ Tu Vi (Cấp ${n.level})</span>
          <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${a.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${a}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${n.gold??0} Linh Thạch</div>`}const y=document.querySelector('.nav-item[data-page="stats"]');if(y){let d="";n.statPoints>0&&(d+=`<span class="badge">${n.statPoints}</span>`),(h=n.realmInfo)!=null&&h.canBreakthrough&&(d+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),y.querySelectorAll(".badge").forEach(a=>a.remove()),y.insertAdjacentHTML("beforeend",d)}}async function tt(){try{const[n,t,e,o,p]=await Promise.all([D.getMonsters(),D.getSkills(),D.getItems(),D.getMedicines(),D.getEducation()]);H.monsters=n.monsters||[],H.skills=t.skills||[],H.items=e.items||[],H.medicines=o.medicines||[],H.educationTrees=p.trees||[],H.exploration=await D.getExploration(),H.recipes=(await D.getRecipes()).recipes,H.npcs=(await D.getNpcs()).npcs||[]}catch(n){console.error("Lỗi tải dữ liệu:",n)}}function W(n,t="info"){var o;(o=document.querySelector(".notification"))==null||o.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=n,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}function Et(){confirm("Đạo hữu có chắc chắn muốn đăng xuất tài khoản?")&&(Z&&clearInterval(Z),localStorage.removeItem("playerId"),localStorage.setItem("isLoggedOut","true"),H.playerId=null,H.player=null,H.popupOpen=!1,W("Đã đăng xuất tài khoản thành công.","info"),dt())}function de(n){var l,g,y,$,u,c;let t=document.getElementById("settings-modal-overlay");t&&t.remove(),t=document.createElement("div"),t.id="settings-modal-overlay",t.style.cssText=`
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
            <div><span style="color: var(--text-dim);">Cảnh giới:</span> <strong style="color: var(--gold);">${((l=n.realmInfo)==null?void 0:l.fullName)||"Phàm Nhân"}</strong></div>
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
  `,document.body.appendChild(t);const f=()=>t.remove();(g=t.querySelector("#btnCloseSettingsModal"))==null||g.addEventListener("click",f),t.addEventListener("click",v=>{v.target===t&&f()});const r=v=>{v.key==="Escape"&&(f(),window.removeEventListener("keydown",r))};window.addEventListener("keydown",r),(y=t.querySelector("#chkSettingSound"))==null||y.addEventListener("change",v=>{localStorage.setItem("rpg_sound_enabled",v.target.checked),W(v.target.checked?"Đã bật hiệu ứng âm thanh":"Đã tắt hiệu ứng âm thanh","info")}),($=t.querySelector("#chkSettingShake"))==null||$.addEventListener("change",v=>{localStorage.setItem("rpg_shake_enabled",v.target.checked),W(v.target.checked?"Đã bật rung màn hình":"Đã tắt rung màn hình","info")}),(u=t.querySelector("#chkSettingToast"))==null||u.addEventListener("change",v=>{localStorage.setItem("rpg_toast_enabled",v.target.checked)}),(c=t.querySelector("#btnModalLogout"))==null||c.addEventListener("click",()=>{f(),Et()})}ee();
//# sourceMappingURL=index-DHvLik1M.js.map
