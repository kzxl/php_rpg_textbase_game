(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const r of f.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function e(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(c){if(c.ep)return;c.ep=!0;const f=e(c);fetch(c.href,f)}})();const Pt="/api";class Mt{async request(t,e={}){try{const l=await fetch(`${Pt}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),c=await l.json();if(!l.ok)throw new Error(c.error||`HTTP ${l.status}`);return c}catch(l){throw console.error(`API Error [${t}]:`,l),l}}register(t,e,l,c){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:l,gender:c})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,l=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:l})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,l=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:l})})}toggleAura(t,e){return this.request(`/player/${t}/skills/toggle-aura`,{method:"POST",body:JSON.stringify({auraId:e})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,l=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:l})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCraftingMastery(t){return this.request(`/player/${t}/crafting-mastery`)}getMonsterMastery(t){return this.request(`/player/${t}/monster-mastery`)}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,l,c=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:l,lockAffixIndex:c})})}getForgingRecipes(){return this.request("/forging/recipes")}forgeItem(t,e){return this.request(`/player/${t}/forge`,{method:"POST",body:JSON.stringify({recipeId:e})})}getEnhancePreview(t,e){return this.request(`/player/${t}/enhance-preview?itemId=${encodeURIComponent(e)}`)}enhanceItem(t,e){return this.request(`/player/${t}/enhance`,{method:"POST",body:JSON.stringify({itemId:e})})}enrollNode(t,e,l){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:l})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,l){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:l})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,l,c){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:l,amount:c})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,l=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${l}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,l,c){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:l,message:c})})}getMarketListings(t="",e="newest"){const l=new URLSearchParams;return t&&l.set("type",t),e&&l.set("sort",e),this.request(`/market?${l.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,l,c,f){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:l,quantity:c,price:f})})}buyFromMarket(t,e,l=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:l})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}getTribulationPreview(t){return this.request(`/player/${t}/tribulation-preview`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}enterDiscoveredDungeon(t,e){return this.request(`/player/${t}/dungeon/enter-discovered`,{method:"POST",body:JSON.stringify({discoveredId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,l){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:l})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,l,c){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:l,description:c})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,l,c=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:l,lockAffixIndex:c})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,l,c=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:l,quantity:c})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,l,c=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:l,durationHours:c})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,l=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:l})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const j=new Mt;function Nt(n,t){var I,q,L,P,H;const{state:e,api:l,notify:c,renderGame:f,updateSidebar:r}=t,s=e.player,u=e.exploration?e.exploration[s.currentArea||"thanh_lam_tran"]:null,y=u?u.name:"Vùng Đất Vô Danh",w=u&&(u.staminaCost||u.stamina_cost)||10,k=(u==null?void 0:u.rates)||[],a=((I=k.find($=>$.type==="herb"))==null?void 0:I.weight)||0,p=((q=k.find($=>$.type==="mineral"))==null?void 0:q.weight)||0,v=((L=k.find($=>$.type==="monster"))==null?void 0:L.weight)||0,h=(u==null?void 0:u.specialtyNames)||[];n.innerHTML=`
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
          <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">🌿 Thảo Dược: ~${a}%</span>
          <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.3);">⛏️ Mạch Khoáng: ~${p}%</span>
          <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);">👾 Yêu Thú: ~${v}%</span>
        </div>
        ${h.length?`
          <div class="text-xs mb-md" style="color: #facc15; background: rgba(234, 179, 8, 0.08); border: 1px dashed rgba(234, 179, 8, 0.3); border-radius: 6px; padding: 5px 12px; display: inline-block;">
            💎 <strong>Đặc Thù Bản Đồ:</strong> ${h.join(" · ")}
          </div>
        `:""}
        <div class="flex justify-center gap-2 flex-wrap">
          <button class="btn btn--gold btn--lg" id="btnExplore" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span>🔍 Tìm Kiếm</span>
            <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${w} Thể Lực</span>
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
    </div>`;const g=((P=s.insightLevels)==null?void 0:P.monster)??0,d=async()=>{try{const $=await l.getAreaMonsters(s.id);if($.monsters){e.player.trackedMonsters=$.monsters;const N=document.getElementById("trackedMonstersList");if(!N)return;if($.monsters.length===0){N.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}N.innerHTML=$.monsters.map(E=>{const z=E.currentHp/E.stats.hp*100,_=z>60?"var(--green)":z>30?"var(--orange)":"var(--red)";let O='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';g>=1&&(O=`<div class="item-desc text-sm text-dim mb-sm">${E.description||"Yêu thú vùng này."}</div>`);let R="";g>=1&&(R=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${z}%; background: ${_}; height: 100%;"></div>
            </div>`);let B=g>=2?`❤ ${E.currentHp}/${E.stats.hp}`:g>=1?"❤ ???":"";return`
            <div class="monster-card ${E.is_boss?"boss":""}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${E.icon||"👾"}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${E.is_boss?"var(--red)":"var(--text-bright)"}; font-size: 15px;">${E.name}</span>
                    <span class="badge ${E.is_boss?"bg-red":"bg-darker"}">Cấp ${E.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${_};">${B}</div>
                </div>
                ${R}
                ${O}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${E.instance_id}" data-monster-id="${E.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),N.querySelectorAll(".btnTrackedCombat").forEach(E=>{E.addEventListener("click",z=>{const _=z.currentTarget.dataset.monsterId,O=z.currentTarget.dataset.instanceId;gt(t,_,O)})})}}catch($){console.error($)}},i=async()=>{try{const $=await l.getAreaMonsterTemplates(s.currentArea||"thanh_lam_tran");if($.monsters){const N=document.getElementById("areaMonstersList");if(!N)return;if($.monsters.length===0){N.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}N.innerHTML=$.monsters.map(E=>`
            <div style="display: flex; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div style="font-size: 24px; width: 36px; text-align: center;">${E.icon||"👾"}</div>
              <div style="flex: 1;">
                <div class="flex items-center gap-2">
                  <span class="bold" style="color: ${E.isBoss?"var(--red)":"var(--text-bright)"}; font-size: 13px;">${E.name}</span>
                  <span class="badge ${E.isBoss?"bg-red":"bg-darker"} text-xs">Cấp ${E.level}</span>
                </div>
                <div class="text-xs text-dim">${E.description||"Yêu thú sinh sống tại khu vực này."}</div>
              </div>
            </div>
          `).join("")}}catch($){console.error($)}};d(),i(),(H=document.getElementById("btnExplore"))==null||H.addEventListener("click",()=>pt(t));let m=!1;const o=document.getElementById("btnAutoBattle"),b=document.getElementById("btnStopAuto"),x=document.getElementById("panelKhamPha"),C=document.querySelector(".toggle-auto-combat"),T=document.getElementById("autoCombatStatus");o&&o.addEventListener("click",()=>{m=!0,x.style.display="none",C.style.display="block",S()}),b&&b.addEventListener("click",()=>{m=!1,x.style.display="block",C.style.display="none"});async function S(){var z,_,O,R,B,A,D,F,U,Q;let $=0,N=0,E=0;for(;m;){T.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${$} trận | +${N} XP | +${E} Linh Thạch</div>
        `;const V=e.player;if((V.currentStamina||0)<w){T.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",m=!1;break}if(V.currentHp/V.maxHp<.2){T.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",m=!1;break}try{const G=await l.explore(e.playerId);if(e.player=G.player,r(),G.event&&(G.event.type==="monster"||G.event.type==="worldBoss")){if(T.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${G.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(It=>setTimeout(It,600)),!m)break;const K=await l.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:G.event.monsterId})});if(e.player=K.player,r(),K.outcome==="win")$++,N+=((z=K.rewards)==null?void 0:z.xp)||0,E+=((_=K.rewards)==null?void 0:_.gold)||0,T.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(O=K.monster)==null?void 0:O.name}! (+${((R=K.rewards)==null?void 0:R.xp)||0} XP, +${((B=K.rewards)==null?void 0:B.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${$} | Tiếp tục sau 1s...</div>
                   `;else{T.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${K.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,m=!1;break}}else if(G.event&&G.event.type==="monster_ambush"&&G.event.combatResult){const K=G.event.combatResult;if(K.outcome==="win")$++,N+=((A=K.rewards)==null?void 0:A.xp)||0,E+=((D=K.rewards)==null?void 0:D.gold)||0,T.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(F=K.monster)==null?void 0:F.name}! (+${((U=K.rewards)==null?void 0:U.xp)||0} XP)</div>`;else{T.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",m=!1;break}}else T.innerHTML=`<div class='text-blue'>${((Q=G.event)==null?void 0:Q.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(G){T.innerHTML=`<div class='text-red'>Lỗi: ${G.message}. Dừng tự động.</div>`,m=!1;break}await new Promise(G=>setTimeout(G,1200))}}}async function pt(n){var s,u,y,w;const{state:t,api:e,notify:l,updateSidebar:c}=n,f=document.getElementById("exploreResult");if(!f)return;const r=document.getElementById("btnExplore");r&&(r.disabled=!0,r.style.opacity="0.6"),f.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const k=await e.explore(t.playerId);t.player=k.player,c();const a=k.event,p=k.cost||10,v=k.player.currentStamina??0,h=k.player.maxStamina??100,g=v>=p;let d=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
          <div style="margin-bottom: 10px;">
            <span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px;">
              🏃 -${p} Thể Lực (Hiện có: ${v}/${h})
            </span>
          </div>
    `;if(a.type==="monster")d+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${a.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${a.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${a.monsterId}">👣 Theo Dõi</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(a.type==="monster_ambush"&&a.combatResult){const i=a.combatResult,m=ut(i.log||[]),o=i.outcome==="win"?"🏆 Chiến thắng!":i.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",b=i.outcome==="win"?"var(--green)":i.outcome==="loss"?"var(--red)":"var(--orange)";d+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${a.message}</div>
        <div style="font-size:16px;font-weight:700;color:${b};margin-bottom:12px">${o}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${m}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Thám Tiếp (-${p} TL)</button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(a.type==="worldBoss")d+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${a.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${a.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${a.monsterId}">👣 Ghi Dấu</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(a.type==="npc"&&a.npcId)d+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${a.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${a.message}</div>
        <div class="text-sm text-dim mb-md">${a.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnNpcInteract">💬 Bái Kiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
          <button class="btn btn--dark" id="btnExploreContinue">Đóng</button>
        </div>
      `;else if(a.type==="player_encounter"&&a.targetPlayer){const i=a.targetPlayer;d+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${i.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${i.realmTierName||"Phàm nhân"} · Cấp ${i.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${i.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${i.id}">⚔️ Cướp Bóc</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `}else if(a.type==="herb"){const i=a.isCritical;d+=`
        <div style="font-size: 44px; margin-bottom: 6px;">🌿</div>
        <div class="badge ${i?"badge--gold":"badge--green"} mb-xs" style="font-size: 11px; padding: 3px 10px; text-transform: uppercase;">
          ${i?"🌟 BỘI THU DƯỢC LIỆU (BẠO KÍCH)":"🌿 DƯỢC THẢO THIÊN NHIÊN"}
        </div>
        <div class="text-lg ${i?"text-gold":"text-bright"} bold mb-sm">${a.message}</div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 400px;">
          <div class="text-md bold" style="color: #34d399;">+${a.quantity} ${a.itemName||"Linh Thảo"}</div>
          ${a.bonusGold?`<div class="text-sm text-gold mt-xs">+${a.bonusGold} 💎 Linh Thạch thô (Thưởng bạo kích)</div>`:""}
          <div class="text-xs text-dim mt-sm" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            🌿 Kỹ năng <strong>Hái Dược</strong>: Cấp ${a.skillLevel} <span style="color:#6ee7b7">(+${a.skillXpGained} XP)</span>
          </div>
          ${a.levelUp?`<div class="badge badge--gold mt-xs animate-bounce" style="font-size:11px;">🎉 Chúc mừng! Hái Dược thăng cấp ${a.levelUp.newLevel}!</div>`:""}
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${p} TL)`:`❌ Hết Thể Lực (${v}/${p})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(a.type==="mineral"){const i=a.isCritical;d+=`
        <div style="font-size: 44px; margin-bottom: 6px;">⛏️</div>
        <div class="badge ${i?"badge--gold":"badge--cyan"} mb-xs" style="font-size: 11px; padding: 3px 10px; background: ${i?"rgba(234, 179, 8, 0.2)":"rgba(6, 182, 212, 0.2)"}; color: ${i?"#facc15":"#22d3ee"}; border: 1px solid ${i?"rgba(234, 179, 8, 0.5)":"rgba(6, 182, 212, 0.4)"}; text-transform: uppercase;">
          ${i?"💎 MẠCH KHOÁNG ĐẠI PHÁT (BẠO KÍCH)":"⛏️ MẠCH KHOÁNG THIÊN ĐỊA"}
        </div>
        <div class="text-lg ${i?"text-gold":"text-bright"} bold mb-sm">${a.message}</div>
        <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 400px;">
          <div class="text-md bold" style="color: #38bdf8;">+${a.quantity} ${a.itemName||"Khoáng Thạch"}</div>
          ${a.bonusGold?`<div class="text-sm text-gold mt-xs">+${a.bonusGold} 💎 Tinh Thạch vụn (Thưởng bạo kích)</div>`:""}
          <div class="text-xs text-dim mt-sm" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            ⛏️ Kỹ năng <strong>Khai Khoáng</strong>: Cấp ${a.skillLevel} <span style="color:#7dd3fc">(+${a.skillXpGained} XP)</span>
          </div>
          ${a.levelUp?`<div class="badge badge--gold mt-xs animate-bounce" style="font-size:11px;">🎉 Chúc mừng! Khai Khoáng thăng cấp ${a.levelUp.newLevel}!</div>`:""}
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${p} TL)`:`❌ Hết Thể Lực (${v}/${p})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(a.type==="material")d+=`
        <div style="font-size: 36px; margin-bottom: 6px;">📦</div>
        <div class="badge badge--dark mb-xs" style="font-size: 11px; padding: 3px 8px;">DÃ NGOẠI THU THẬP</div>
        <div class="text-lg text-bright bold mb-sm">${a.message}</div>
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; margin: 10px auto; max-width: 350px;">
          <div class="text-md bold text-green">+${a.quantity||1} ${a.itemName||a.itemId}</div>
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${p} TL)`:`❌ Hết Thể Lực (${v}/${p})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `;else if(a.type==="dungeon_discovery"){const i=a.realmType==="timed",m=i?"🌀":"🌋",o=i?`⏳ HUYỄN CẢNH CÓ HẠN (${a.remainingMinutes||60} PHÚT)`:`⚠️ CẤM ĐỊA THƯỢNG CỔ (QUÁI x${a.difficultyMult||2.5})`;d+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">${m}</div>
        <div class="badge mb-xs" style="font-size: 11px; padding: 4px 12px; font-weight: 700; ${i?"background:rgba(168,85,247,0.25);color:#d8b4fe;border:1px solid #c084fc;":"background:rgba(239,68,68,0.25);color:#fca5a5;border:1px solid #ef4444;"}">
          ${o}
        </div>
        <div class="text-lg ${i?"text-gold":"text-red"} bold mb-sm" style="font-size: 16px;">
          ${a.message}
        </div>
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 420px; text-align: left;">
          <div style="font-weight:700;font-size:14px;color:var(--text-bright);margin-bottom:4px">
            ${i?"✨":"🔱"} ${a.name}
          </div>
          <div style="font-size:12px;opacity:0.8;line-height:1.4;margin-bottom:6px">
            ${a.description||"Lối vào bí cảnh đã được phát hiện và mở ra trên bản đồ."}
          </div>
          <div style="font-size:11px;opacity:0.6">
            🏰 Thử thách: ${(a.waves||3)+1} Tầng · ${i?`⏳ Hạn dùng: ${a.remainingMinutes} phút`:"Vô hạn (Tồn tại vĩnh viễn)"}
          </div>
        </div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn ${i?"btn--gold":"btn--red"} flex-1" id="btnGoToDungeon">
            ${i?"⚡ Đến Bí Cảnh Ngay":"🔥 Khiêu Chiến Cấm Địa"}
          </button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${p} TL)`:"❌ Hết Thể Lực"}
          </button>
        </div>
      `}else d+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${a.message}</div>
        ${a.gold?`<div class="text-gold bold">+${a.gold} 💎 Linh Thạch</div>`:""}
        ${a.item?`<div class="text-green bold">+1 ${a.item.name}</div>`:""}
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${p} TL)`:`❌ Hết Thể Lực (${v}/${p})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `;d+="</div></div>",f.innerHTML=d,(a.type==="monster"||a.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",i=>{f.innerHTML="",gt(n,i.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async i=>{try{const m=await e.trackMonster(t.playerId,i.target.dataset.mid);m.success?(l(m.message,"success"),f.innerHTML="",typeof n.renderGame=="function"&&n.renderGame()):m.error&&l(m.error,"error")}catch(m){l("Lỗi theo dõi: "+m.message,"error")}})),a.type==="npc"&&a.npcId&&((s=document.getElementById("btnNpcInteract"))==null||s.addEventListener("click",async()=>{await qt(n,a.npcId,f)})),a.type==="dungeon_discovery"&&((u=document.getElementById("btnGoToDungeon"))==null||u.addEventListener("click",()=>{t._travelTab="dungeon";const i=document.querySelector('[data-page="travel"]');i?i.click():typeof n.renderGame=="function"&&(t.currentPage="travel",n.renderGame())})),(y=document.getElementById("btnExploreAgain"))==null||y.addEventListener("click",()=>{pt(n)}),(w=document.getElementById("btnExploreContinue"))==null||w.addEventListener("click",()=>{f.innerHTML=""})}catch(k){f.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${k.message}</div></div>`}finally{r&&(r.disabled=!1,r.style.opacity="1")}}async function qt(n,t,e){const{state:l,api:c,notify:f,renderGame:r}=n,s=document.getElementById("npcQuestModal")||e;try{const y=(await c.getNpc(t)).npc;if(!y)return;const w=(l.player.activeQuests||[]).map(a=>a.quest_id);let k=y.quests.map(a=>{const p=w.includes(a.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${a.name}</span>
            <span class="text-xs badge" style="background:${a.type==="kill"?"var(--red)":"var(--green)"}">${a.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${a.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${a.rewards.gold?a.rewards.gold+"💎 ":""}${a.rewards.xp?a.rewards.xp+"✨ ":""}${a.rewards.skillChance?"🎯 "+a.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${p?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${a.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");s.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${y.icon||"🧓"} ${y.name} <span class="subtitle">${y.profession}</span></div>
        <div class="panel-body">
          ${k||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,s.querySelectorAll(".btn-accept-quest").forEach(a=>{a.addEventListener("click",async()=>{a.disabled=!0,a.textContent="⏳...";try{const p=await c.acceptQuest(l.playerId,a.dataset.npc,a.dataset.qid);l.player=p.player,f(p.message,"success"),r()}catch(p){f(p.message||"Lỗi nhận quest","error"),a.disabled=!1,a.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(u){console.error("NPC load error:",u)}}async function gt(n,t,e=null){var y,w,k,a;const{state:l,api:c,notify:f,updateSidebar:r,renderGame:s}=n,u=document.getElementById("combatResult");if(u){if(!l.player.currentHp||l.player.currentHp<=0)return f("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(l.player.hospitalRemaining>0)return f(`Đang tịnh dưỡng! Còn ${l.player.hospitalRemaining}s`,"error");u.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,u.scrollIntoView({behavior:"smooth"});try{const p=await c.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:l.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(l.player=p.player,p.outcome==="no_energy"){u.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${p.log[0]}</div></div>`,r();return}const v=p.monster,h=Math.max(0,l.player.currentHp/l.player.maxHp*100),g=Math.max(0,v.currentHp/v.maxHp*100),d={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},i=d[p.outcome]||d.loss,m=(y=p.rewards)!=null&&y.gold?` · +${p.rewards.gold} 💎`:"",o=p.rewards?` · +${p.rewards.xp} XP${m}`:"",b={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[p.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};u.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${i.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${i.icon}</span> <span>${i.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${p.turns}/${p.maxTurns||25} Lượt ${o}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.9) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright); font-size: 15px; margin-bottom: 2px;">${l.player.name}</div>
              <div style="font-size: 11px; color: ${b.color}; font-weight: 600; margin-bottom: 8px;">
                ${b.icon} ${b.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${h}%; height: 100%; background: ${h>50?"var(--green)":h>20?"var(--orange)":"var(--red)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${l.player.currentHp}/${l.player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(251,191,36,0.5); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${(w=p.glitchEvents)!=null&&w.length?p.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${v.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${v.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${v.level||1} · ${v.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${g}%; height: 100%; background: ${g>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${v.currentHp}/${v.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${p.weakpoint?`
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${p.weakpoint}</strong> (x2.5 Dmg)
                </div>
              `:""}
            </div>

          </div>
        </div>

        <!-- MDG Standard: Categorized Loot Drop Panel -->
        ${(a=(k=p.rewards)==null?void 0:k.lootItems)!=null&&a.length?`
          <div class="panel-body" style="background: rgba(15, 23, 42, 0.95); border-top: 1px solid rgba(255,255,255,0.1); padding: 12px 16px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--gold); text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
              <span style="display:flex;align-items:center;gap:6px">🎁 CHIẾN LỢI PHẨM THU ĐƯỢC</span>
              <span class="badge" style="background:rgba(234,179,8,0.2);color:#facc15;font-size:10px">${p.rewards.lootItems.length} MÓN</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px;">
              ${p.rewards.lootItems.map(T=>`
                <div style="background: rgba(255,255,255,0.04); border: 1px solid ${T.color||"rgba(255,255,255,0.15)"}; border-radius: 6px; padding: 8px 10px; display: flex; align-items: center; gap: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.3)">
                  <div style="font-size: 22px;">${T.icon||"📦"}</div>
                  <div style="flex: 1; overflow: hidden;">
                    <div style="font-weight: 700; font-size: 13px; color: ${T.color||"var(--text-bright)"}; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
                      ${T.name} ${T.quantity>1?`<span style="opacity:0.8">x${T.quantity}</span>`:""}
                    </div>
                    <div style="font-size: 10px; opacity: 0.6; text-transform: uppercase;">
                      ${T.rarity||T.type}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:""}

        <!-- Combat Log -->
        <div class="panel-body no-pad" style="border-top: 1px solid var(--border);">
          <div style="padding: 8px 16px; background: rgba(0,0,0,0.2); font-size: 11px; color: var(--text-dim); text-transform: uppercase; font-weight: 600;">
            📜 Nhật Ký Quyết Đấu Chi Tiết
          </div>
          <div class="combat-log" style="max-height: 250px; overflow-y: auto; padding: 12px 16px;">
            ${ut(p.log)}
          </div>
        </div>
      </div>`;const x=document.getElementById("cardMonster"),C=document.getElementById("cardPlayer");p.glitchEvents&&p.glitchEvents.length>0&&x?p.glitchEvents.forEach((T,S)=>{setTimeout(()=>{lt(x,`-${T.damage} 🌌 [VẾT NỨT]`,"glitch"),x.classList.add("shake"),setTimeout(()=>x.classList.remove("shake"),400)},S*400+200)}):x&&p.rewards&&lt(x,`-${Math.round(v.maxHp*.4)} 💥`,"crit"),r(),e&&typeof s=="function"&&setTimeout(()=>s(),1500)}catch(p){u.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${p.message}</div></div>`}}}function lt(n,t,e="normal"){if(!n)return;const l=document.createElement("div");l.className=`floating-damage damage-${e}`,l.textContent=t,n.appendChild(l),setTimeout(()=>l.remove(),1100)}function ut(n){return(n||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("Kích Hoạt")||t.includes("Xuất chiêu")?`<div class="skill-proc" style="color:#38bdf8;font-weight:700;background:rgba(56,189,248,0.12);padding:3px 8px;border-radius:4px;margin:2px 0;border-left:3px solid #38bdf8;">${t}</div>`:t.includes("thường công")?`<div class="normal-attack" style="color:var(--text-dim);font-style:italic;margin:2px 0;">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function ot(n,t){const{state:e,api:l,notify:c}=t,f=e.player,r=(f.skills||[]).find(k=>(typeof k=="string"?k:k.id)==="nhan_thuat"),s=r?r.level||1:0,u=[...e.skills].sort((k,a)=>(k.tier||1)-(a.tier||1)),y=(f.skills||[]).map(k=>typeof k=="string"?k:k.id),w={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};n.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${s}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${u.map(k=>{const a=y.includes(k.id),p=k.tier||1,v=p>s+1,h=p<=s;let g="";return k.requirements&&k.requirements.length>0?h||a?g=`<div class="mt-sm text-xs text-orange">Điều kiện: ${k.requirements.map(d=>`<br>• ${d}`).join("")}</div>`:v?g=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${p}.</div>`:g='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':g='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${a?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${k.name} ${a?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${a?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${w[p]||p}</span>
                    <span class="text-xs text-dim">${k.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${h||a?k.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${k.type!=="passive"&&k.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${k.cost} linh lực</div>`:""}
                
                ${g}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${a?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${v?"btn--dark":"btn--gold"} btn--sm btn-learn" ${v?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${k.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,n.querySelectorAll(".accordion-header").forEach(k=>{k.addEventListener("click",()=>{const a=k.nextElementSibling;a.style.display==="none"?(a.style.display="block",k.querySelector("div:last-child").textContent="▲"):(a.style.display="none",k.querySelector("div:last-child").textContent="▼")})}),n.querySelectorAll(".btn-learn").forEach(k=>{k.addEventListener("click",async a=>{a.stopPropagation();try{const p=await l.learnSkill(f.id,k.dataset.sid);p.error?c(p.error,"error"):(e.player=p.player,c(p.message,"success"),ot(n,t))}catch(p){c("Lỗi học kỹ năng: "+p.message,"error")}})})}async function ht(n){const{state:t,api:e,notify:l,updateSidebar:c,renderGame:f}=n,r=t.player;if(!r)return;let s=document.getElementById("tribulation-modal-overlay");s||(s=document.createElement("div"),s.id="tribulation-modal-overlay",s.style.cssText=`
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px); z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      padding: 16px; animation: fadeIn 0.25s ease;
    `,document.body.appendChild(s)),s.innerHTML=`
    <div style="background: #121420; border: 2px solid #eab308; border-radius: 14px; max-width: 580px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(234, 179, 8, 0.2); padding: 24px; text-align: center; color: #fff;">
      <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚡</div>
      <div style="font-size: 16px; font-weight: 700; color: #eab308; margin-top: 8px;">Đang dò xét Thiên Khí & Thăm Dò Thiên Kiếp...</div>
    </div>
  `;try{const u=await e.getTribulationPreview(r.id);zt(s,u,n)}catch(u){s.remove(),l(u.message||"Không thể tra cứu thông tin Lôi Kiếp","error")}}function zt(n,t,e){var k,a,p;const{state:l,api:c,notify:f,updateSidebar:r,renderGame:s}=e,u=t.tribulation||{},y=t.playerStats||{},w=u.color||"#eab308";n.innerHTML=`
    <div style="background: #111422; border: 2px solid ${w}; border-radius: 14px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 12px 50px rgba(0,0,0,0.95), 0 0 35px ${w}44; color: #fff; animation: scaleUp 0.25s ease;">
      <!-- HEADER -->
      <div style="padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: linear-gradient(135deg, ${w}22, rgba(0,0,0,0.6)); text-align: center; position: relative;">
        <span style="position: absolute; top: 16px; right: 20px; font-size: 20px; cursor: pointer; color: var(--text-dim);" id="btn-close-tribulation">✕</span>
        <div style="font-size: 28px; line-height: 1;">🌩️</div>
        <div style="font-size: 20px; font-weight: 800; color: ${w}; margin-top: 6px; letter-spacing: 0.5px;">
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
            <div style="font-size: 18px; font-weight: 800; color: ${w}; margin-top: 2px;">${u.waves||3} Đợt</div>
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
  `,(k=n.querySelector("#btn-close-tribulation"))==null||k.addEventListener("click",()=>n.remove()),(a=n.querySelector("#btn-cancel-tribulation"))==null||a.addEventListener("click",()=>n.remove()),(p=n.querySelector("#btn-start-tribulation"))==null||p.addEventListener("click",async()=>{await _t(n,e,u)})}async function _t(n,t,e){var g,d,i;const{state:l,api:c,notify:f,updateSidebar:r,renderGame:s}=t,u=e.color||"#eab308";n.innerHTML=`
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
  `;const y=n.querySelector("#tribulation-log-stream"),w=n.querySelector("#tribulation-wave-indicator"),k=n.querySelector("#tri-hp-bar"),a=n.querySelector("#tri-energy-bar"),p=n.querySelector("#tri-hp-val"),v=n.querySelector("#tri-energy-val"),h=n.querySelector("#tribulation-footer");try{const m=await c.attemptBreakthrough(l.playerId),o=m.tribulation;if(!o||!o.logs){m.player&&(l.player=m.player),f(m.message,m.success?"success":"error"),typeof r=="function"&&r(),n.remove(),s();return}let b=((g=m.player)==null?void 0:g.maxHp)||o.startingHp,x=o.startingHp,C=o.startingEnergy,T=((d=m.player)==null?void 0:d.maxEnergy)||Math.max(50,o.startingEnergy);p.textContent=`${x}/${b}`,v.textContent=`${C}`;const S=o.logs||[];for(let I=0;I<S.length;I++){const q=S[I];await new Promise($=>setTimeout($,900)),w.textContent=`ĐỢT ${q.wave}/${o.totalWaves} ĐANG GIÁNG XUỐNG!`,w.style.color="#ef4444",n.style.backgroundColor="rgba(255, 255, 255, 0.2)",setTimeout(()=>{n.style.backgroundColor="rgba(0, 0, 0, 0.88)"},80);const L=document.createElement("div");L.style.cssText=`
        padding: 8px 12px; border-radius: 6px;
        background: ${q.defeated?"rgba(239, 68, 68, 0.2)":"rgba(255, 255, 255, 0.05)"};
        border-left: 3px solid ${q.defeated?"#ef4444":q.dodged?"#a78bfa":u};
        animation: fadeIn 0.3s ease;
      `,L.innerHTML=`
        <div style="font-weight: 700; color: ${u}; margin-bottom: 2px;">
          ⚡ Đợt ${q.wave}/${o.totalWaves}: Sét Uy Lực ${q.rawDamage} ST
        </div>
        <div style="color: #e2e8f0; font-size: 12px;">${q.text}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 11px;">
          ${q.dodged?'<span style="color: #a78bfa;">💨 Chẻ sét né tránh</span>':""}
          ${q.auraMitigated?'<span style="color: #10b981;">🛡️ Kim Chung hóa giải</span>':""}
          ${q.absorbedByQi>0?`<span style="color: #38bdf8;">🔵 Chân khí hấp thụ: ${q.absorbedByQi} ST</span>`:""}
          <span style="color: #f87171;">💥 Thương tổn: -${q.actualHpDamage} HP</span>
          ${q.medicineRescued?'<span style="color: #f59e0b; font-weight:700;">💊 Dùng đan dược cứu mệnh!</span>':""}
        </div>
      `,y.appendChild(L),y.scrollTop=y.scrollHeight,x=q.hpRemaining,C=q.energyRemaining;const P=Math.max(0,Math.min(100,Math.round(x/b*100))),H=Math.max(0,Math.min(100,Math.round(C/T*100)));if(k.style.width=`${P}%`,a.style.width=`${H}%`,p.textContent=`${x}/${b}`,v.textContent=`${C}`,q.defeated)break}if(await new Promise(I=>setTimeout(I,800)),m.player&&(l.player=m.player),typeof r=="function"&&r(),o.survived){w.textContent="🌟 LÔI VÂN TAN BIẾN • ĐỘ KIẾP VIÊN MÃN",w.style.color="#10b981";const I=document.createElement("div");I.style.cssText=`
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(16, 185, 129, 0.2));
        border: 2px solid #eab308; border-radius: 8px; padding: 14px; text-align: center;
        margin-top: 8px; animation: scaleUp 0.3s ease;
      `,I.innerHTML=`
        <div style="font-size: 24px;">👑</div>
        <div style="font-size: 16px; font-weight: 800; color: #eab308; margin-top: 4px;">
          ĐỘT PHÁ THÀNH CÔNG!
        </div>
        <div style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
          ${m.message}
        </div>
      `,y.appendChild(I),y.scrollTop=y.scrollHeight,h.innerHTML=`
        <button class="btn btn--gold btn--lg shadow-glow" id="btn-finish-tribulation" style="min-width: 200px; font-weight: 700;">
          🌟 ĐÓN NHẬN TIÊN PHÁP
        </button>
      `,f(m.message,"success")}else{w.textContent="☠️ TRỌNG THƯƠNG • ĐỘT PHÁ THẤT BẠI",w.style.color="#ef4444";const I=document.createElement("div");I.style.cssText=`
        background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; border-radius: 8px;
        padding: 14px; text-align: center; margin-top: 8px; animation: scaleUp 0.3s ease;
      `,I.innerHTML=`
        <div style="font-size: 24px;">☠️</div>
        <div style="font-size: 15px; font-weight: 800; color: #ef4444; margin-top: 4px;">
          ĐỘT PHÁ THẤT BẠI!
        </div>
        <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
          ${m.message}
        </div>
      `,y.appendChild(I),y.scrollTop=y.scrollHeight,h.innerHTML=`
        <button class="btn btn--dark" id="btn-finish-tribulation" style="min-width: 180px;">
          🏥 VỀ DƯỠNG THƯƠNG
        </button>
      `,f(m.message,"error")}(i=n.querySelector("#btn-finish-tribulation"))==null||i.addEventListener("click",()=>{n.remove(),s()})}catch(m){f(m.message||"Lỗi trong quá trình độ kiếp","error"),n.remove(),s()}}function Bt(n,t){var p,v,h;const{state:e,api:l,notify:c,renderGame:f}=t,r=e.player,s=r.stats,u=r.allocatedStats||{},y=5,w=r.currentEnergy>=y&&!r.hospitalRemaining,k=r.talentDisplay||{},a=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];n.innerHTML=`
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
            🌟 ${((p=r.realmInfo)==null?void 0:p.fullName)||"Phàm Nhân"}
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
          ${a.map(([g,d,i])=>{const m=k[g]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${m.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${d}</div>
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
        ${a.map(([g,d,i,m])=>{const o=k[g]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},b=Math.floor(r.currentEnergy/y)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${d}</span> ${i}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${m}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${s[g]??0}</span>
              ${u[g]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${u[g]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${o.color};min-width:50px" title="Căn Cốt: ${o.name} (×${o.value})">${o.icon}×${o.value}</span>
              <input type="number" class="train-count" data-stat="${g}" min="1" max="${b}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${w?"":"disabled"}>
              <button class="btn btn--sm ${w?"btn--blue":"btn--dark"} train-btn" data-train="${g}" ${w?"":"disabled"} title="Tốn ${y} Linh lực/lần · Căn cốt ×${o.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${y} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(r.currentEnergy/y)}</strong> lần hiện tại.
        </div>
        <div class="derived-row mt-3 border-t border-dim pt-3">
          <div class="d-item"><div class="d-val">${s.maxHp??100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${s.maxEnergy??50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${s.energyRegen??5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row pb-3">
          <div class="d-item"><div class="d-val">${s.critChance??5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${s.critMultiplier??1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Khí/đòn</div></div>
        </div>
      </div>
    </div>`,(h=n.querySelector(".btn-breakthrough"))==null||h.addEventListener("click",()=>{ht(t)}),n.querySelectorAll(".train-btn").forEach(g=>{g.addEventListener("click",async d=>{d.stopPropagation();const i=n.querySelector(`.train-count[data-stat="${g.dataset.train}"]`),m=parseInt(i==null?void 0:i.value)||1;try{const o=await l.trainStat(e.playerId,g.dataset.train,m);e.player=o.player,c(o.message,"success"),f()}catch(o){c(o.message||"Lỗi rèn luyện","error")}})})}async function vt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.player;if(r){n.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const u=(await l.getGlitches(r.id)).status,y=n.querySelector("#glitchContentWrapper");if(!y)return;if(!u.featureUnlocked){Rt(y,u.featureDetails,r);return}At(y,u,r,t)}catch(s){n.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${s.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function Rt(n,t,e){const l=(t==null?void 0:t.requirements)||[];n.innerHTML=`
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
          ${l.map(c=>`
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.02); border-radius: 6px; border-left: 3px solid ${c.met?"#22c55e":"#6b7280"};">
              <span style="color: ${c.met?"#86efac":"#d1d5db"}; display: flex; align-items: center; gap: 8px;">
                <span>${c.met?"✅":"🔒"}</span> ${c.label}
              </span>
              <span style="font-size: 0.8rem; color: ${c.met?"#22c55e":"#9ca3af"}; font-weight: bold;">
                ${c.current}
              </span>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="font-size: 0.8rem; color: #71717a; max-width: 460px; margin: 0 auto;">
        💡 Gợi ý: Hãy tiếp tục đột phá tu vi lên <strong>Trúc Cơ</strong> hoặc chiến đấu sinh tử để kích phát kẽ hở thời không.
      </div>
    </div>
  `}function At(n,t,e,l){const{api:c,notify:f,updateSidebar:r}=l,s=t.imprints||[],u=t.stances||{},y=t.activeStance||"breaker";n.innerHTML=`
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
  `;const w=n.querySelector("#btnOverrideTribulation");w&&(w.onclick=async()=>{w.disabled=!0,w.textContent="Đang lách luật...";try{const k=await c.overrideTribulation(e.id);f(k.message,"success"),state.player=k.player,r(),vt(n.parentElement,l)}catch(k){f(k.message||"Thao tác lách luật thất bại!","error"),w.disabled=!1,w.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),mt(n,u,y,e,c,f,r),bt(n,s,e,f,r)}function mt(n,t,e,l,c,f,r){const s=n.querySelector("#stanceContainer");s&&(s.innerHTML="",Object.values(t).forEach(u=>{const y=u.isUnlocked!==!1,w=u.id===e,k=document.createElement("div");k.style.cssText=`
      background: ${w?"rgba(168, 85, 247, 0.15)":y?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${w?"#c084fc":y?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${y?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${y?"1":"0.55"};
    `,k.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${y?u.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${y?u.icon:"🔒"}</span> ${u.name}
        </div>
        ${w?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${y?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${y?u.description:`<span style="color:#f59e0b;">${u.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,k.onclick=async()=>{if(!y)return f(u.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!w)try{const a=await c.setStance(l.id,u.id);f(a.message,"success"),state.player=a.player,r(),mt(n,t,u.id,l,c,f,r)}catch(a){f(a.message||"Chuyển thế thất bại","error")}},s.appendChild(k)}))}function bt(n,t,e,l,c){const f=n.querySelector("#imprintsContainer");f&&(f.innerHTML="",t.forEach(r=>{const s=document.createElement("div"),u=r.fogLevel||(r.isUnlocked?"revealed":"fog");let y="rgba(15, 23, 42, 0.5)",w="rgba(255,255,255,0.08)",k="none";u==="revealed"?(y="rgba(30, 41, 59, 0.75)",w=r.color,k=`0 0 12px ${r.color}33`):u==="partial"?(y="rgba(24, 24, 27, 0.6)",w="1px dashed rgba(168, 85, 247, 0.4)"):(y="rgba(10, 10, 15, 0.5)",w="1px dashed rgba(255, 255, 255, 0.08)"),s.style.cssText=`
      background: ${y};
      border: 1px solid ${w};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${k};
      position: relative;
      overflow: hidden;
    `,s.innerHTML=`
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
    `;const a=s.querySelector(".btnSetTitle");a&&(a.onclick=()=>{e.activeTitle=r.title,l(`Đã kích hoạt danh hiệu: [${r.title}]!`,"success"),c(),bt(n,t,e,l,c)}),f.appendChild(s)}))}function at(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.player;if(!r)return;const s=r.skills||[],u=e.skills||[],y=(r.realmTier??1)>=2||(r.glitchInsight??0)>=20||(r.unlockedImprints||[]).length>0,k=($=>{switch($){case 1:return 2;case 2:return 3;case 3:return 4;case 4:return 5;default:return 6}})(r.realmTier||1),a=s.map($=>{const N=typeof $=="string"?$:$.id;return{...u.find(z=>z.id===N)||{name:N,id:N,category:"combat",type:"active"},level:$.level||1,xp:$.xp||$.currentXp||0,equipped:$.equipped||$.isEquipped||!1}}),p=a.filter($=>$.type!=="passive"),v=a.filter($=>$.type==="passive"),h=p.filter($=>$.equipped),g={combat:{icon:"⚔️",name:"Chiêu Thức",sub:`${p.length} chiêu • ${h.length}/${k} ô xuất`,badge:`${h.length}/${k}`},auras:{icon:"🧘",name:"Tâm Pháp & Hào Quang",sub:`Khóa ${r.reservationPct||0}% LL • ${(r.activeAuras||[]).length} Hào quang`,badge:`${r.reservationPct||0}%`},monsters:{icon:"🐺",name:"Thông Thạo Quái Vật",sub:"Bách thú đồ giám • Sát quái 5★",badge:"★"},crafting:{icon:"⚒️",name:"Thông Thạo Chế Tạo",sub:`Lv.${r.craftingLevel||1} • Đan đạo & Đúc rèn`,badge:`Lv.${r.craftingLevel||1}`}};let d=localStorage.getItem("activeSkillPillar")||"combat";["combat","auras","monsters","crafting","library","glitch"].includes(d)||(d="combat");let i="all",m="all",o=null,b=null;const x=($,N)=>{var G;const E=($.level||1)*100,z=Math.min(100,($.xp||0)/E*100),_=$.type==="passive",O="★".repeat(Math.min($.tier||1,7)),R=($.tier||1)>=5?"var(--gold)":($.tier||1)>=3?"var(--purple)":"var(--blue)";let B="";if(_)B='<span style="font-size:11px; font-weight:700; color:var(--green)">🧘 Tâm Pháp Thường Trực</span>';else if($.equipped)B=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${$.id}">Tháo</button>`;else{const K=h.length<k;B=`<button class="btn btn--sm ${K?"btn--blue":"btn--outline"} equip-btn" data-eq="1" data-sid="${$.id}" ${K?"":'title="Đã đầy ô kỹ năng!"'}>Trang Bị</button>`}const A={1:55,2:45,3:40,4:35,5:30,6:25,7:20},D=$.triggerChance||A[$.tier||1]||40,F=Math.floor((((G=r.stats)==null?void 0:G.dexterity)||10)/10),U=Math.max(0,($.level||1)-1),Q=r.activeStance==="breaker"?5:0,V=Math.min(85,Math.max(15,D+U+F+Q));return`
      <div class="skill-card  ${$.equipped&&!_?"equipped":""}">
        <div class="skill-card-header">
          <div>
            <div class="skill-card-name" style="font-size: 14px;">${$.name}</div>
            <div class="skill-card-tier" style="color:${R}">${O} Tầng ${$.tier||1} • ${_?"Tâm Pháp":"Chiêu Thức"}</div>
          </div>
          <div class="skill-card-action">${B}</div>
        </div>
        <div class="skill-card-desc">${$.description||"Tuyệt kỹ thượng thừa tu chân giới."}</div>
        ${`
          <div class="skill-card-mastery">
            <div class="skill-mastery-label">
              <span>Thông thạo Lv.${$.level}</span>
              <span class="text-dim">${$.xp}/${E} XP</span>
            </div>
            <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${z}%"></div></div>
            ${$.masteryBonus?`<div class="skill-mastery-bonus">✨ ${$.masteryBonus}</div>`:""}
          </div>
        `}
        ${_?"":`
          <div class="skill-card-cost" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-top:8px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.06);">
            <span>🔵 ${$.cost||0} Linh Lực</span>
            <span style="color:#f59e0b; font-weight:700;" title="Xác suất xuất chiêu: Cơ bản ${D}% + Cấp (+${U}%) + Mẫn tiệp (+${F}%)${Q?" + Thế phá quy (+5%)":""}">
              🎯 Xác suất xuất chiêu: ${V}%
            </span>
          </div>
        `}
      </div>
    `},C=()=>`
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
      <div>
        <h1 style="display: flex; align-items: center; gap: 10px;">
          <span>⚡ Tứ Đại Trụ Cột Kỹ Năng</span>
        </h1>
        <div class="text-dim text-sm">Hệ thống tu hành thực chiến: Chiêu thức tôi luyện, tâm pháp hào quang, bách thú đồ giám & đan đạo chế tác.</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn--sm ${d==="library"?"btn--gold":"btn--outline"}" id="btn-open-library">
          📚 Tàng Kinh Các
        </button>
        <button class="btn btn--sm ${d==="glitch"?"btn--purple":"btn--outline"}" id="btn-open-glitch">
          ${y?"🌌 Thiên Đạo Dị Biến":"🌫️ Kẽ Hở Quy Luật"}
        </button>
      </div>
    </div>

    <!-- 4 PILLARS SELECTOR -->
    <div class="pillar-tabs">
      ${Object.entries(g).map(([$,N])=>`
        <div class="pillar-tab ${d===$?"active":""}" data-pillar="${$}">
          <div class="pillar-icon">${N.icon}</div>
          <div class="pillar-info">
            <div class="pillar-name">${N.name}</div>
            <div class="pillar-sub">${N.sub}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `,T=()=>{var N;let $=p;return i==="equipped"&&($=p.filter(E=>E.equipped)),i==="unequipped"&&($=p.filter(E=>!E.equipped)),`
      <!-- LOADOUT SLOTS -->
      <div class="loadout-bar" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="font-weight: 700; color: var(--gold); font-size: 14px; display: flex; align-items: center; gap: 6px;">
            <span>⚔️ Ô Xuất Chiêu Thực Chiến:</span>
            <span style="color: #fff;">${h.length}/${k}</span>
          </div>
          <div class="text-dim text-xs" style="margin-top: 2px;">
            Cảnh giới hiện tại (${((N=r.realmInfo)==null?void 0:N.fullName)||"Phàm Cấp"}) cho phép trang bị tối đa <b>${k}</b> chiêu thức. Mỗi hiệp đấu sẽ tung xúc xắc theo <b>xác suất kích hoạt</b> và tiêu hao Linh Lực thực chiến.
          </div>
        </div>
        <div class="loadout-slots" style="display: flex; gap: 8px;">
          ${Array.from({length:k}).map((E,z)=>{const _=h[z];return _?`<div class="loadout-slot filled" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(59, 130, 246, 0.15); border: 1px solid var(--blue); border-radius: 6px; font-size: 18px; cursor: pointer;" title="${_.name} (Lv.${_.level})">⚔️</div>`:'<div class="loadout-slot" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; font-size: 14px; color: var(--text-dim);" title="Ô trống">➕</div>'}).join("")}
        </div>
      </div>

      <!-- FILTER TABS -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <button class="mastery-filter-btn ${i==="all"?"active":""}" data-sfilter="all">Tất Cả Chiêu Thức (${p.length})</button>
        <button class="mastery-filter-btn ${i==="equipped"?"active":""}" data-sfilter="equipped">Đã Trang Bị (${h.length})</button>
        <button class="mastery-filter-btn ${i==="unequipped"?"active":""}" data-sfilter="unequipped">Chưa Trang Bị (${p.length-h.length})</button>
      </div>

      <div class="skill-grid">
        ${$.length>0?$.map(E=>x(E)).join(""):'<div class="text-dim" style="padding: 20px;">Chưa có chiêu thức kích hoạt nào trong danh mục này. Hãy đến Tàng Kinh Các để thỉnh bí kíp!</div>'}
      </div>
    `},S=()=>{const $=r.auraConfigs||{ho_the_kim_chung:{id:"ho_the_kim_chung",name:"Hộ Thể Kim Chung",icon:"🛡️",reservationPct:20,desc:"Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp khi độ kiếp.",statBonuses:{defense:25,maxHp:100}},than_hanh_bo:{id:"than_hanh_bo",name:"Thần Hành Hào Quang",icon:"💨",reservationPct:15,desc:"Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.",statBonuses:{speed:20,dexterity:15}},hoa_diem_chan_khi:{id:"hoa_diem_chan_khi",name:"Hỏa Diễm Chân Khí",icon:"🔥",reservationPct:25,desc:"Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.",statBonuses:{strength:25,critChance:10}},toa_thien:{id:"toa_thien",name:"Toạ Thiền Tụ Khí",icon:"🧘",reservationPct:10,desc:"Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực (+5 HP & +2 TL / 10s).",statBonuses:{hpRegen:5,staminaRegen:2}}},N=r.activeAuras||[],E=r.reservedEnergy||0,z=r.usableEnergy??Math.max(0,r.maxEnergy-E),_=r.reservationPct||0,O=r.maxEnergy>0?Math.round(z/r.maxEnergy*100):100;return`
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
              Linh Lực Khả Dụng: <span style="color: #38bdf8; font-size: 16px; font-weight: 700;">${z}</span> / ${r.maxEnergy}
            </div>
            <div style="font-size: 12px; color: #f59e0b; margin-top: 2px;">
              Đã khóa: <b>${E}</b> LL (${_}% / 85% tối đa)
            </div>
          </div>
        </div>

        <!-- SPLIT RESERVATION BAR -->
        <div style="position: relative; height: 16px; background: rgba(0, 0, 0, 0.5); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; margin-bottom: 12px;">
          <div style="width: ${O}%; background: linear-gradient(90deg, #0284c7, #38bdf8); transition: width 0.4s ease;" title="Linh Lực Khả Dụng: ${z}"></div>
          <div style="width: ${_}%; background: linear-gradient(90deg, #d97706, #fbbf24); transition: width 0.4s ease;" title="Linh Lực Bị Khóa: ${E} (${_}%)"></div>
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
          <span class="text-dim text-xs font-normal">(${N.length}/${Object.keys($).length} đang bật)</span>
        </div>

        <div class="skill-grid">
          ${Object.values($).map(R=>{const B=N.includes(R.id),A=!B&&_+R.reservationPct>85;return`
              <div class="skill-card ${B?"equipped":""}" style="${B?"border-color: rgba(234, 179, 8, 0.6); box-shadow: 0 0 12px rgba(234, 179, 8, 0.15);":""}">
                <div class="skill-card-header">
                  <div>
                    <div class="skill-card-name" style="font-size: 14px; display: flex; align-items: center; gap: 6px;">
                      <span>${R.icon}</span>
                      <span>${R.name}</span>
                    </div>
                    <div class="skill-card-tier" style="color: #f59e0b;">Khóa ${R.reservationPct}% Linh Lực (${Math.floor(r.maxEnergy*(R.reservationPct/100))} LL)</div>
                  </div>
                  <div class="skill-card-action">
                    <button class="btn btn--sm ${B?"btn--gold":"btn--outline"} btn-toggle-aura" data-aura="${R.id}" ${A?'disabled title="Vượt quá 85% Linh Lực khóa tối đa!"':""}>
                      ${B?"✅ Đang Duy Trì":"🔘 Bật Hào Quang"}
                    </button>
                  </div>
                </div>
                <div class="skill-card-desc" style="margin-top: 6px;">${R.desc}</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                  ${Object.entries(R.statBonuses||{}).map(([D,F])=>`
                    <span class="req-tag" style="background: rgba(234, 179, 8, 0.12); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.2);">
                      +${F} ${D}
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
            ${v.map(R=>x(R)).join("")}
          </div>
        `:`
          <div class="panel" style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 12px;">
            Chưa lĩnh ngộ tâm pháp bị động thường trực nào. Hãy đến Tàng Kinh Các để thỉnh giáo các bí kíp công pháp thượng thừa!
          </div>
        `}
      </div>
    `},I=()=>{if(!o)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `;const{totalKills:$,totalSpecies:N,tierCounts:E,monsters:z,tiers:_}=o,O=["all","Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh"],R=z.filter(B=>m==="all"?!0:(B.tierName||"").includes(m));return`
      <!-- BESTIARY HERO -->
      <div class="mastery-hero">
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${($||0).toLocaleString()}</span>
          <span class="mastery-stat-label">Tổng Yêu Thú Đã Trảm</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${N||0}</span>
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
        ${O.map(B=>`
          <button class="mastery-filter-btn ${m===B?"active":""}" data-mrealm="${B}">
            ${B==="all"?"Tất Cả":B}
          </button>
        `).join("")}
      </div>

      <!-- MONSTER CARDS GRID -->
      <div class="monster-grid">
        ${R.map(B=>{var Q,V,G,K,Y;const A=B.mastery||{},D=(A.tier||0)===0&&(A.kills||0)===0,F=A.isMaxTier,U=A.badgeColor||"#6b7280";return`
            <div class="monster-mastery-card ${D?"fog":""} ${A.tier===5?"apex":""}">
              <div>
                <div class="monster-card-top">
                  <div>
                    <div class="monster-card-name">
                      <span>${D?"🌫️":"🐺"}</span>
                      <span>${B.name}</span>
                    </div>
                    <div class="text-dim text-xs" style="margin-top: 2px;">
                      ${B.tierName||"Phàm Cấp"} • Ngũ Hành: <b>${B.element||"Vô"}</b>
                    </div>
                  </div>
                  <span class="monster-tier-tag" style="color: ${U}; border-color: ${U}">
                    ${A.tierName||"Vô Tri"}
                  </span>
                </div>

                <div class="monster-kills-row">
                  <span class="monster-stars-display" style="color: ${U}">${A.stars||"☆☆☆☆☆"}</span>
                  <span>Đã trảm: <b>${A.kills||0}</b> con</span>
                </div>

                <!-- PROGRESS BAR -->
                <div class="bar-track" style="height: 5px; margin-bottom: 8px;">
                  <div class="bar-fill" style="width: ${A.tierProgress||0}%; background: ${U}"></div>
                </div>
                ${F?`
                  <div class="text-xs" style="color: #ef4444; font-weight: 700; margin-bottom: 6px;">
                    👑 Đạt cảnh giới Tuyệt Diệt tối cao!
                  </div>
                `:`
                  <div class="text-dim text-xs" style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span>Tiến độ lên Tầng ${A.nextTier}</span>
                    <span>${A.kills}/${A.nextTierReq} kills</span>
                  </div>
                `}

                <!-- STATS PREVIEW (Revealed at Tier 1+) -->
                ${D?`
                  <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin: 8px 0;">
                    🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá thông tin sinh mệnh và thuộc tính!
                  </div>
                `:`
                  <div class="monster-stats-box">
                    <div class="monster-stat-cell">HP: <b>${((Q=B.stats)==null?void 0:Q.hp)??0}</b></div>
                    <div class="monster-stat-cell">Công: <b>${((V=B.stats)==null?void 0:V.strength)??0}</b></div>
                    <div class="monster-stat-cell">Thủ: <b>${((G=B.stats)==null?void 0:G.defense)??0}</b></div>
                    <div class="monster-stat-cell">Tốc: <b>${((K=B.stats)==null?void 0:K.speed)??0}</b></div>
                    <div class="monster-stat-cell">Thân: <b>${((Y=B.stats)==null?void 0:Y.dexterity)??0}</b></div>
                    <div class="monster-stat-cell">XP: <b>+${B.xpReward??0}</b></div>
                  </div>
                `}
              </div>

              <!-- ACTIVE BUFFS -->
              <div>
                ${A.tier>=2?`
                  <div class="monster-buff-active">
                    ✨ <b>Khắc chế đang kích hoạt:</b><br/>
                    ${A.desc}
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
    `},q=()=>{if(!b)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `;const{craftingLevel:$,craftingXp:N,xpToNext:E,progressPercent:z,title:_,badgeColor:O,perks:R,recipes:B}=b;return`
      <!-- HERO BANNER -->
      <div class="crafting-hero">
        <div class="crafting-hero-header">
          <div class="crafting-hero-title">
            <span>🔥</span>
            <span>Thông Thạo Đan Đạo & Chế Tác</span>
          </div>
          <span class="crafting-rank-badge" style="background: ${O};">
            ${_} (Lv.${$})
          </span>
        </div>

        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
          <span>Kinh Nghiệm Luyện Chế: <b>${N} / ${E} XP</b></span>
          <span style="color: var(--gold);">${z}%</span>
        </div>
        <div class="bar-track" style="height: 8px; margin-bottom: 12px;">
          <div class="bar-fill" style="width: ${z}%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
        </div>
        <div class="text-dim text-xs">Mỗi lần luyện chế thành công hoặc thất bại đều tích lũy đan đạo chi lực, tôi luyện trình độ đan sư.</div>

        <!-- CRAFTING PERKS -->
        <div class="crafting-perks-grid">
          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🎯</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Tỷ Lệ Thành Công</div>
              <div class="crafting-perk-val">+${(R==null?void 0:R.successBonusPct)??0}% tỷ lệ luyện thành</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">✨</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Xác Suất Đại Thành</div>
              <div class="crafting-perk-val">${(R==null?void 0:R.critQualityChance)??0}% (Tinh / Cực / Thiên Phẩm)</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🛡️</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Bảo Toàn Dược Liệu</div>
              <div class="crafting-perk-val">Thu hồi ${(R==null?void 0:R.materialReturnRate)??0}% khi nổ lò</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🌟</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Thiên Phẩm Đan</div>
              <div class="crafting-perk-val">${R!=null&&R.canCraftDivine?"✅ Đã kích hoạt (+50% chỉ số)":"🔒 Yêu cầu Lv.76+"}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- RECIPES & CRAFTING SHORTCUT -->
      <div class="panel">
        <div class="panel-title" style="display: flex; justify-content: space-between; align-items: center;">
          <span>📜 Đan Phương & Công Thức Chế Tác (${(B==null?void 0:B.length)||0})</span>
        </div>
        <div class="panel-body">
          <div class="shop-items-grid">
            ${(B||[]).map(A=>{const D=A.materials||[],F=D.every(V=>{var G;return(((G=r.materials)==null?void 0:G[V.id])||0)>=V.amount}),U=(r.gold||0)>=(A.cost||0),Q=F&&U;return`
                <div class="shop-item-card">
                  <div class="shop-item-header">
                    <div>
                      <div class="shop-item-name">${A.name}</div>
                      <div class="shop-item-rarity text-dim">Tầng ${A.tier||1} • Cơ bản ${A.successRate}%</div>
                    </div>
                    <span class="badge" style="background: rgba(208, 165, 48, 0.15); color: var(--gold);">
                      Tốn ${A.cost||0} 💰
                    </span>
                  </div>
                  <div class="shop-item-desc" style="margin-bottom: 8px;">
                    Dược liệu yêu cầu:<br/>
                    ${D.map(V=>{var Y;const G=((Y=r.materials)==null?void 0:Y[V.id])||0;return`<span style="color: ${G>=V.amount?"var(--green)":"var(--red)"}; font-size: 11px;">• ${V.id} (${G}/${V.amount})</span>`}).join("<br/>")}
                  </div>
                  <div class="shop-item-footer">
                    <span class="text-xs text-dim">${A.craftTime?`Thời gian: ${A.craftTime}s`:"Lập tức"}</span>
                    <button class="btn btn--sm ${Q?"btn--gold":"btn--outline"} btn-craft-action" data-rid="${A.id}" ${Q?"":"disabled"}>
                      ${Q?"🔥 Luyện Chế":"Thiếu Liệu"}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `},L=async()=>{if(d==="library"){n.innerHTML=`
        ${C()}
        <div id="library-container"></div>
      `,P();const $=n.querySelector("#library-container");$&&ot($,t);return}if(d==="glitch"){n.innerHTML=`
        ${C()}
        <div id="glitch-container"></div>
      `,P();const $=n.querySelector("#glitch-container");$&&vt($,t);return}if(n.innerHTML=`
      ${C()}
      <div id="pillar-content">
        ${d==="combat"?T():""}
        ${d==="auras"?S():""}
        ${d==="monsters"?I():""}
        ${d==="crafting"?q():""}
      </div>
    `,P(),H(),d==="monsters"&&!o)try{o=await l.getMonsterMastery(r.id);const $=n.querySelector("#pillar-content");$&&d==="monsters"&&($.innerHTML=I(),H())}catch($){c("Không thể tải Bách Thú Đồ Giám: "+$.message,"error")}if(d==="crafting"&&!b)try{b=await l.getCraftingMastery(r.id);const $=n.querySelector("#pillar-content");$&&d==="crafting"&&($.innerHTML=q(),H())}catch($){c("Không thể tải Thông Thạo Chế Tạo: "+$.message,"error")}},P=()=>{n.querySelectorAll(".pillar-tab").forEach(E=>{E.addEventListener("click",()=>{d=E.dataset.pillar,localStorage.setItem("activeSkillPillar",d),L()})});const $=n.querySelector("#btn-open-library");$&&$.addEventListener("click",()=>{d="library",localStorage.setItem("activeSkillPillar","library"),L()});const N=n.querySelector("#btn-open-glitch");N&&N.addEventListener("click",()=>{d="glitch",localStorage.setItem("activeSkillPillar","glitch"),L()})},H=()=>{n.querySelectorAll("[data-sfilter]").forEach($=>{$.addEventListener("click",()=>{i=$.dataset.sfilter;const N=n.querySelector("#pillar-content");N&&d==="combat"&&(N.innerHTML=T(),H())})}),n.querySelectorAll(".btn-toggle-aura").forEach($=>{$.addEventListener("click",async()=>{const N=$.dataset.aura;$.disabled=!0;try{const E=await l.toggleAura(r.id,N);E.player&&(e.player=E.player),c(E.message,E.success?"success":"warning"),typeof f=="function"&&f(),L()}catch(E){c(E.message||"Lỗi chuyển trạng thái Hào Quang","error"),$.disabled=!1}})}),n.querySelectorAll("[data-mrealm]").forEach($=>{$.addEventListener("click",()=>{m=$.dataset.mrealm;const N=n.querySelector("#pillar-content");N&&d==="monsters"&&(N.innerHTML=I(),H())})}),n.querySelectorAll(".equip-btn").forEach($=>{$.addEventListener("click",async()=>{try{const N=$.dataset.sid,E=$.dataset.eq==="1",z=await l.equipSkill(r.id,N,E);e.player=z.player,c(z.message,"success"),typeof f=="function"&&f(),L()}catch(N){c(N.message||"Lỗi trang bị pháp quyết","error")}})}),n.querySelectorAll(".btn-craft-action").forEach($=>{$.addEventListener("click",async()=>{const N=$.dataset.rid;$.disabled=!0,$.innerText="Đang luyện...";try{const E=await l.craftItem(r.id,N);E.player&&(e.player=E.player),c(E.message,E.success?"success":"warning"),typeof f=="function"&&f(),b=await l.getCraftingMastery(r.id),L()}catch(E){c(E.message||"Lỗi luyện chế","error"),$.disabled=!1,$.innerText="🔥 Luyện Chế"}})})};L()}function Ot(n,t){return t==="manual"?"📜":n==="weapon"?"⚔️":n==="body"?"🥋":n==="shield"?"🛡️":n==="feet"?"👢":n==="ring"?"💍":"📦"}function ct(n,t){let e="",l="";if(n.slot==="weapon"){let u=0,y=0;(n.affixes||[]).forEach(w=>{w.stat==="strength"&&w.type==="flat"&&(u+=w.value),w.stat==="dexterity"&&w.type==="flat"&&(y+=w.value)}),u===0&&(u=n.itemLevel*2+5),y===0&&(y=n.itemLevel+10),e=`⚔️ ${u}`,l=`🎯 ${y}`}else if(n.slot==="body"||n.slot==="shield"||n.slot==="feet"){let u=0;(n.affixes||[]).forEach(y=>{y.stat==="defense"&&y.type==="flat"&&(u+=y.value)}),u===0&&(u=n.itemLevel*3),e=`🛡️ ${u}`}else if(n.slot==="ring"){let u=0;(n.affixes||[]).forEach(y=>{y.stat==="capacity"&&(u+=y.value)}),e=u>0?`🎒 +${u}`:""}const c=(n.affixes||[]).map(u=>Gt(u)).map(u=>`<span class="badge badge-dim">${u}</span>`).join(" "),f=n.description||`Một vật phẩm loại ${n.slot} cấp ${n.itemLevel} thuộc phẩm chất ${n.rarity}. Khí tức tỏa ra không tồi.`,r=n.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${n.craftedBy}</strong></div>`:"",s=t?n.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${n.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${n.id}">Trang Bị</button>`:"";return`
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
          ${Ot(n.slot,n.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${n.name}</strong> là loại ${n.baseType}. ${f}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${n.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${n.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${c||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${r}
          <div class="mt-2 flex justify-end">
            ${s}
          </div>
        </div>
      </div>
    </div>`}function Gt(n){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[n.stat]||n.stat,l=n.value>=0?"+":"";return n.type==="flat"?`${l}${n.value} ${e}`:n.type==="increase"?`${l}${n.value}% ${e}`:n.type==="more"?`×${l}${n.value}% ${e}`:`${l}${n.value} ${e}`}function st(n,t){var d,i,m,o,b,x,C;const{state:e,api:l,notify:c,renderGame:f}=t,r=Object.values(e.player.equipment||{}),s=e.player,u=e.medicines||[],y=s.medCooldownRemaining||0,w=e.inventoryTab||"equipped",k=s.skills&&s.skills.some(T=>{const S=typeof T=="string"?T:T.id;return S==="duoc_ly"||S==="y_thuat"}),a=r.find(T=>T.slot==="ring1"),p=r.find(T=>T.slot==="ring2");let v=20;((a==null?void 0:a.id)==="tui_tru_vat"||(d=a==null?void 0:a.baseType)!=null&&d.includes("tru_vat"))&&(v+=((m=(i=a.affixes)==null?void 0:i[0])==null?void 0:m.value)||10),((p==null?void 0:p.id)==="tui_tru_vat"||(o=p==null?void 0:p.baseType)!=null&&o.includes("tru_vat"))&&(v+=((x=(b=p.affixes)==null?void 0:b[0])==null?void 0:x.value)||10),n.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(s.inventory||[]).length} / ${v})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${w==="equipped"?"btn--blue":"btn--dark"}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${w==="weapon"?"btn--blue":"btn--dark"}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${w==="armor"?"btn--blue":"btn--dark"}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${w==="accessory"?"btn--blue":"btn--dark"}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${w==="manual"?"btn--blue":"btn--dark"}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${w==="medicine"?"btn--blue":"btn--dark"}" data-tab="medicine">
          Đan Dược ${y>0?`<span style="color:var(--orange); font-size:11px">(${y}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const h=document.getElementById("invTabContent"),g=()=>{h.querySelectorAll("[data-eid]").forEach(T=>{T.addEventListener("click",async S=>{S.stopPropagation();try{const I=await l.equipItem(e.playerId,T.dataset.eid);e.player=I.player,c(I.message,"success"),f()}catch(I){c(I.message||"Lỗi trang bị","error")}})}),h.querySelectorAll("[data-use]").forEach(T=>{T.addEventListener("click",async S=>{S.stopPropagation();try{const I=await l.useItem(e.playerId,T.dataset.use);e.player=I.player,c(I.message,"success"),f()}catch(I){c(I.message||"Lỗi sử dụng","error")}})})};if(w==="equipped"){const T=s.equipment||{},S=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];h.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${S.map(I=>{const q=T[I.key],L=q&&q.id,P=L?`rarity-${q.rarity}`:"";return`
            <div style="background:${L?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${L?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${I.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${I.name}</div>
              ${L?`<div style="font-size:11px;font-weight:600" class="${P}">${q.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${q.rarity}] Lv${q.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${r.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${r.filter(I=>I&&I.id).map(I=>ct(I,!1)).join("")}
      `:""}
    `,g()}else if(w==="medicine")h.innerHTML=`
      <div style="padding:12px">
        ${y>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${y}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${y/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${u.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':u.map(T=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${T.icon||"💊"} ${T.name}</div>
                <div class="item-meta">
                  ${T.description}
                  ${T.healPercent?` · Phục hồi ${T.healPercent}% HP`:""}
                  ${T.cooldownAdd?` · Sinh Đan độc ${T.cooldownAdd}s`:""}
                  ${T.duration?` · Hiệu lực ${T.duration} trận`:""}
                  ${T.toxicity&&k?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${T.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${T.penalty&&k?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${T.penalty.map(S=>`Giảm ${Math.abs(S.value)*100}% ${S.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${T.id}" 
                ${y+(T.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,h.querySelectorAll("[data-med]").forEach(T=>{T.addEventListener("click",async()=>{try{const S=await l.useMedicine(e.playerId,T.dataset.med);e.player=S.player,c(S.message,"success"),f()}catch(S){c(S.message||"Đan độc quá nồng!","error")}})});else{const T=s.inventory||[];let S=[];w==="weapon"?S=T.filter(I=>I.slot==="weapon"&&I.category!=="manual"):w==="armor"?S=T.filter(I=>["body","shield","feet"].includes(I.slot)):w==="accessory"?S=T.filter(I=>["ring","amulet","ring1","ring2"].includes(I.slot)):w==="manual"&&(S=T.filter(I=>I.category==="manual")),h.innerHTML=`
      ${S.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':S.map(I=>ct(I,!0)).join("")}
    `,g()}n.querySelectorAll("[data-tab]").forEach(T=>{T.addEventListener("click",()=>{e.inventoryTab=T.dataset.tab,st(n,t)})}),(C=document.getElementById("btnGen"))==null||C.addEventListener("click",async()=>{const T=["common","rare","epic","legendary"];try{const S=await l.generateItem(e.playerId,T[Math.floor(Math.random()*T.length)]);e.player=S.player,e.items=S.items||[],c(S.message,"success"),st(n,t)}catch{c("Lỗi tạo ngẫu nhiên","error")}})}let Z=null;function yt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;e._dungeon||(e._dungeon={mapItems:[],timedDungeons:[],permanentDungeons:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const s=e._dungeon;Z&&(clearInterval(Z),Z=null);async function u(){try{const[o,b]=await Promise.all([l.getMapItems(r),l.getDungeonHistory(r)]);s.mapItems=o.mapItems||[],s.timedDungeons=o.timedDungeons||[],s.permanentDungeons=o.permanentDungeons||[],s.activeRun=o.activeRun||null,s.history=b.history||[],s.loaded=!0,k(),w()}catch(o){c(o.message||"Lỗi tải Bí Cảnh","error")}}function y(o){if(o<=0)return"Đã hết hạn";const b=Math.floor(o/3600),x=Math.floor(o%3600/60),C=Math.floor(o%60);return b>0?`${b}h ${x<10?"0":""}${x}m ${C<10?"0":""}${C}s`:`${x}m ${C<10?"0":""}${C}s`}function w(){s.timedDungeons.length!==0&&(Z=setInterval(()=>{let o=!1;s.timedDungeons.forEach(b=>{if(b.remainingSeconds>0){b.remainingSeconds-=1;const x=n.querySelector(`#countdown-${b.id}`);x&&(x.textContent=y(b.remainingSeconds))}else o=!0}),o&&(clearInterval(Z),Z=null,u())},1e3))}function k(){n.innerHTML=`
      <div class="page-header" style="margin-bottom:16px">
        <h2 style="display:flex;align-items:center;gap:8px">
          <span>⚡ Bí Cảnh Bát Hoang</span>
        </h2>
        <p class="page-sub" style="font-size:13px;line-height:1.5">
          Khám phá các di tích thần bí. Gồm <strong>Huyễn Cảnh Có Thời Hạn</strong> (xuất hiện chốc lát rồi biến mất) và <strong>Cấm Địa Thượng Cổ Vĩnh Cửu</strong> (quái vật cuồng bạo x2.0 ~ x3.5 sức mạnh).
        </p>
      </div>

      ${s.activeRun?a():p()}

      ${s.lastResult?d():""}

      ${i()}
    `,m()}function a(){var T,S;const o=s.activeRun,b=o.currentWave===o.totalWaves,x=((o.currentWave-1)/o.totalWaves*100).toFixed(0),C=(o.difficultyMult||1)>=2;return`
      <div class="panel" style="border-color:${C?"var(--red)":"var(--gold)"};margin-bottom:16px;box-shadow: 0 0 15px rgba(${C?"239, 68, 68":"234, 179, 8"}, 0.2)">
        <div class="panel-title" style="color:${C?"var(--red)":"var(--gold)"};display:flex;justify-content:space-between;align-items:center">
          <span>⚡ Đang Trong Bí Cảnh</span>
          ${C?`<span class="badge" style="background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid #ef4444;font-size:11px">⚠️ Quái Hung Hiểm x${o.difficultyMult}</span>`:""}
        </div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:16px;font-weight:700;margin-bottom:6px;color:var(--text-bright)">${o.dungeonName||o.dungeonId}</div>
          <div style="font-size:12px;opacity:0.7;margin-bottom:10px">
            ${b?"🔥 TẦNG CUỐI CÙNG — TRÙM BÍ CẢNH TRẤN THỦ!":`Đang vượt ải tầng ${o.currentWave} / ${o.totalWaves}`}
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:10px;overflow:hidden">
              <div style="width:${x}%;height:100%;background:linear-gradient(90deg,var(--blue),${C?"#ef4444":"var(--gold)"});border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;font-weight:600;opacity:0.8">Tầng ${o.currentWave}/${o.totalWaves}</span>
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn ${C?"btn--red":"btn--gold"}" id="btnFight" style="flex:1;font-weight:700" ${((T=e.player)==null?void 0:T.hospitalRemaining)>0?"disabled":""}>
              ${b?"🐉 Đại Chiến Trùm Cuối!":"⚔️ Chiến Đấu Tầng "+o.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Rút Lui</button>
          </div>
          ${((S=e.player)==null?void 0:S.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:10px">🏥 Đang trọng thương, chờ hồi phục khí huyết...</div>':""}
        </div>
      </div>
    `}function p(){return`
      <!-- SECTION 1: TIMED SECRET REALMS -->
      <div class="panel" style="margin-bottom:16px;border-color:rgba(168, 85, 247, 0.4)">
        <div class="panel-title" style="color:#c084fc;display:flex;align-items:center;justify-content:space-between">
          <span style="display:flex;align-items:center;gap:6px">⏳ Bí Cảnh Huyễn Cảnh (Có Thời Hạn)</span>
          <span class="badge" style="background:rgba(168,85,247,0.2);color:#d8b4fe;border:1px solid rgba(168,85,247,0.4);font-size:11px">
            ${s.timedDungeons.length} Khả Dụng
          </span>
        </div>
        <div class="panel-body no-pad">
          ${v()}
        </div>
      </div>

      <!-- SECTION 2: PERMANENT SECRET REALMS -->
      <div class="panel" style="margin-bottom:16px;border-color:rgba(239, 68, 68, 0.4)">
        <div class="panel-title" style="color:#f87171;display:flex;align-items:center;justify-content:space-between">
          <span style="display:flex;align-items:center;gap:6px">🔱 Thượng Cổ Cấm Địa (Vĩnh Cửu - Cực Hung Hiểm)</span>
          <span class="badge" style="background:rgba(239,68,68,0.2);color:#fca5a5;border:1px solid rgba(239,68,68,0.4);font-size:11px">
            ${s.permanentDungeons.length} Cấm Địa
          </span>
        </div>
        <div class="panel-body no-pad">
          ${h()}
        </div>
      </div>

      <!-- SECTION 3: MAP ITEMS -->
      <div class="panel" style="margin-bottom:16px">
        <div class="panel-title" style="display:flex;align-items:center;justify-content:space-between">
          <span>📜 Ngọc Giản Cổ Đồ (Khai Mở Tiêu Hao)</span>
          <span style="font-size:12px;opacity:0.6">${s.mapItems.length} Mẫu Đồ</span>
        </div>
        <div class="panel-body no-pad">
          ${g()}
        </div>
      </div>
    `}function v(){return s.timedDungeons.length===0?`
        <div style="text-align:center;opacity:0.6;padding:24px 16px;font-size:13px">
          🌀 Hiện tại chưa phát hiện Huyễn Cảnh nào.<br>
          <span style="font-size:12px;opacity:0.8">Hãy đi <strong>Khám Phá</strong> tại các vùng đất để nắm bắt cơ duyên phát hiện ảo cảnh sắp tiêu tán!</span>
        </div>
      `:s.timedDungeons.map(o=>{var C;const x=(((C=e.player)==null?void 0:C.realm)??1)>=o.requiredRealm;return`
        <div class="list-item" style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.06);align-items:flex-start;gap:12px">
          <div style="font-size:26px;width:36px;text-align:center;padding-top:2px">🌀</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
              <span style="font-weight:700;color:#e9d5ff;font-size:15px">${o.name}</span>
              <span class="badge" style="background:rgba(168,85,247,0.25);color:#d8b4fe;border:1px solid #c084fc;font-size:11px;font-weight:700">
                ⏳ Còn <span id="countdown-${o.id}">${y(o.remainingSeconds)}</span>
              </span>
              <span class="badge bg-darker text-xs">Cảnh giới ${o.requiredRealm}+</span>
            </div>
            <div style="font-size:12px;opacity:0.8;line-height:1.4;margin-bottom:6px">${o.description}</div>
            <div style="font-size:11px;opacity:0.6;display:flex;gap:12px;flex-wrap:wrap">
              <span>🏰 ${o.totalWaves} Tầng thử thách</span>
              <span>🐉 Thủ Vệ: <strong>${o.bossName}</strong></span>
              <span>🎁 Thưởng: Dược liệu, Linh thạch, Đan dược</span>
            </div>
          </div>
          <div style="align-self:center">
            <button class="btn btn--sm btn--gold" data-enter-disc="${o.id}" ${x?"":"disabled"}>
              ${x?"⚡ Tiến Vào":"🔒 Cảnh Giới Thấp"}
            </button>
          </div>
        </div>
      `}).join("")}function h(){return s.permanentDungeons.length===0?`
        <div style="text-align:center;opacity:0.6;padding:24px 16px;font-size:13px">
          🌋 Chưa khai mở Cấm Địa Thượng Cổ nào.<br>
          <span style="font-size:12px;opacity:0.8">Khi đi <strong>Khám Phá</strong>, bạn có cơ hội đào phá phong ấn cổ xưa để mở khóa Cấm Địa Vĩnh Viễn!</span>
        </div>
      `:s.permanentDungeons.map(o=>{var T;const x=(((T=e.player)==null?void 0:T.realm)??1)>=o.requiredRealm,C=o.difficultyMult||2;return`
        <div class="list-item" style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.06);align-items:flex-start;gap:12px;background:rgba(239,68,68,0.03)">
          <div style="font-size:26px;width:36px;text-align:center;padding-top:2px">🔱</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
              <span style="font-weight:700;color:#fca5a5;font-size:15px">${o.name}</span>
              <span class="badge" style="background:rgba(239,68,68,0.25);color:#fca5a5;border:1px solid #ef4444;font-size:11px;font-weight:700">
                ⚠️ QUÁI CỰC HUNG HIỂM (x${C})
              </span>
              <span class="badge" style="background:rgba(16,185,129,0.15);color:#6ee7b7;font-size:11px">
                ${o.isCleared?`🏆 Đã phá ${o.clearCount} lần`:"Chưa Chinh Phục"}
              </span>
            </div>
            <div style="font-size:12px;opacity:0.8;line-height:1.4;margin-bottom:6px">${o.description}</div>
            <div style="font-size:11px;opacity:0.6;display:flex;gap:12px;flex-wrap:wrap">
              <span>🏰 ${o.totalWaves} Tầng tử chiến</span>
              <span>🐉 Trùm Cấm Địa: <strong style="color:#f87171">${o.bossName}</strong></span>
              <span>💎 Thưởng Thượng Cổ: Cực phẩm nội đan, Ngọc giản quý, Hoàn Cốt Đan</span>
            </div>
          </div>
          <div style="align-self:center">
            <button class="btn btn--sm btn--red" data-enter-disc="${o.id}" ${x?"":"disabled"}>
              ${x?"🔥 Khiêu Chiến":"🔒 Cảnh Giới Thấp"}
            </button>
          </div>
        </div>
      `}).join("")}function g(){return s.mapItems.length===0?`
        <div style="text-align:center;opacity:0.5;padding:20px;font-size:13px">
          Chưa có Ngọc Giản nào trong Túi Đồ. Hãy đánh bại quái vật để có cơ hội nhận Ngọc Giản!
        </div>
      `:s.mapItems.map(o=>{const b=o.dungeon;return`
        <div class="list-item" style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div class="item-info" style="flex:1">
            <div class="item-name" style="font-size:14px;font-weight:600">
              ${o.item.icon} ${o.item.name} <span style="opacity:0.5;font-size:12px">x${o.quantity}</span>
            </div>
            ${b?`
              <div class="item-meta" style="font-size:12px;opacity:0.7">
                ${b.name} · T${b.tier} · ${b.waves+1} tầng · Boss: ${b.bossName}
              </div>
            `:""}
          </div>
          ${b?`<button class="btn btn--sm btn--gold" data-enter="${o.item.id}">⚡ Kích Hoạt</button>`:""}
        </div>
      `}).join("")}function d(){var C,T;const o=s.lastResult,b=o.result==="dungeon_complete"?"🏆":o.result==="wave_cleared"?"✅":"💀",x=o.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:16px;border-color:${x}">
        <div class="panel-title" style="color:${x}">${b} Kết Quả Chiến Đấu</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px;font-size:14px">${o.message}</div>
          ${(C=o.loot)!=null&&C.length?`
            <div style="margin-bottom:10px;padding:8px;background:rgba(16,185,129,0.1);border-radius:6px;border:1px solid rgba(16,185,129,0.2)">
              <div style="font-size:11px;font-weight:700;color:var(--green);margin-bottom:4px">🎁 CHIẾN LỢI PHẨM THU ĐƯỢC:</div>
              ${o.loot.map(S=>`<div style="font-size:12px;color:var(--green)">${S}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.6">📜 Xem chi tiết diễn biến (${((T=o.combatLog)==null?void 0:T.length)||0} lượt)</summary>
            <div style="max-height:160px;overflow-y:auto;font-size:11px;opacity:0.7;margin-top:6px;padding:8px;background:rgba(0,0,0,0.3);border-radius:6px">
              ${(o.combatLog||[]).map(S=>`<div>${S}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function i(){return s.history.length===0?"":`
      <div class="panel" style="margin-top:16px">
        <div class="panel-title">📚 Lịch Sử Khiêu Chiến Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:220px;overflow-y:auto">
          ${s.history.map(o=>{const b=o.status==="completed"?"✅":o.status==="failed"?"❌":o.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:10px 14px;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04)">
                <span style="color:${o.status==="completed"?"var(--green)":o.status==="failed"?"var(--red)":"var(--orange)"};font-weight:600">${b} ${o.dungeonName}</span>
                <span style="opacity:0.5;margin-left:auto">Tầng ${o.wave}/${o.totalWaves} · ${new Date(o.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function m(){var o,b;document.querySelectorAll("[data-enter-disc]").forEach(x=>{x.addEventListener("click",async()=>{const C=x.dataset.enterDisc;if(confirm("⚡ Quyết định tiến vào Bí Cảnh này để khiêu chiến?")){x.disabled=!0;try{const T=await l.enterDiscoveredDungeon(r,C);c(T.message,"success"),e.player=T.player,f(),s.activeRun=T.run,s.lastResult=null,await u()}catch(T){c(T.message,"error"),x.disabled=!1}}})}),document.querySelectorAll("[data-enter]").forEach(x=>{x.addEventListener("click",async()=>{const C=x.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và mở lối vào Bí Cảnh?")){x.disabled=!0;try{const T=await l.enterDungeon(r,C);c(T.message,"success"),e.player=T.player,f(),s.activeRun=T.run,s.lastResult=null,await u()}catch(T){c(T.message,"error"),x.disabled=!1}}})}),(o=document.getElementById("btnFight"))==null||o.addEventListener("click",async()=>{const x=document.getElementById("btnFight");x.disabled=!0,x.textContent="⏳ Đang giao chiến...";try{const C=await l.fightDungeonWave(r);e.player=C.player,f(),s.lastResult=C,C.result==="dungeon_complete"||C.result==="dungeon_failed"?s.activeRun=null:C.result==="wave_cleared"&&(s.activeRun.currentWave=C.nextWave),k()}catch(C){c(C.message,"error"),x.disabled=!1,x.textContent="⚔️ Chiến Đấu"}}),(b=document.getElementById("btnAbandon"))==null||b.addEventListener("click",async()=>{if(confirm("🚪 Rút lui khỏi Bí Cảnh? Tiến trình hiện tại sẽ bị hủy!"))try{await l.abandonDungeon(r),c("Đã rời khỏi Bí Cảnh an toàn.","info"),s.activeRun=null,s.lastResult=null,await u()}catch(x){c(x.message,"error")}})}s.loaded?(k(),w()):u()}function xt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const s=e._tc;async function u(){try{s.data=await l.request(`/player/${r}/atlas-maps`),s.loaded=!0,y()}catch(h){c(h.message,"error")}}function y(){const h=s.data,g=(h==null?void 0:h.atlas)||{},d=(h==null?void 0:h.maps)||[],i=h==null?void 0:h.activeRun,m=(h==null?void 0:h.allMaps)||[];h!=null&&h.modifiers,n.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${g.completed||0}/${g.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${g.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${g.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${g.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${s.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${s.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${d.length})</button>
        ${i?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,n.querySelectorAll("[data-tab]").forEach(b=>{b.addEventListener("click",()=>{s.tab=b.dataset.tab,y()})});const o=document.getElementById("tcContent");o&&(i&&s.tab==="run"?p(o,i):s.tab==="inventory"?k(o,d):w(o,m,g))}function w(h,g,d){var m;const i=((m=s.data)==null?void 0:m.tiers)||[];h.innerHTML=i.map(o=>{const b=g.filter(x=>x.tier===o.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${o.tier} ${o.name} <span style="opacity:0.4;font-size:11px">(Realm ${o.requiredRealm}+, ${o.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${b.map(x=>{var S;const C=((S=d.progress)==null?void 0:S[x.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[x.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${C?700:400}">${x.name}</span>
                ${C?`<span style="color:var(--green);font-size:11px">✅ ×${C}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function k(h,g,d){if(g.length===0){h.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}h.innerHTML=g.map((i,m)=>{const o=i.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${v(i.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${i.mapName||i.mapId} <span style="color:${v(i.tier)};font-size:12px">T${i.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${o.length>0?o.map(b=>b.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${o.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${m}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${m}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),h.querySelectorAll(".btn-open-map").forEach(i=>{i.addEventListener("click",async()=>{try{const m=await l.request(`/player/${r}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(i.dataset.idx)})});c(m.message,"success"),e.player=m.player,f(),s.tab="run",await u()}catch(m){c(m.message,"error")}})}),h.querySelectorAll(".btn-add-mod").forEach(i=>{i.addEventListener("click",()=>a(parseInt(i.dataset.idx)))})}function a(h){var i;const g=((i=s.data)==null?void 0:i.modifiers)||[],d=document.createElement("div");d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",d.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${g.map(m=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${m.id}">
          <span style="flex:1"><strong>${m.name}</strong><br><span style="font-size:11px;opacity:0.6">${m.desc} · IIQ +${m.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,d.addEventListener("click",async m=>{const o=m.target.closest("[data-modid]");if(o)try{const b=await l.request(`/player/${r}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:h,modifierId:o.dataset.modid})});c(b.message,"success"),e.player=b.player,f(),d.remove(),await u()}catch(b){c(b.message,"error")}else m.target===d&&d.remove()}),document.body.appendChild(d)}function p(h,g){var m,o;const d=g.currentWave/g.totalWaves*100,i=g.modifiers||[];h.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${g.mapName} <span style="color:${v(g.tier)}">T${g.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${g.currentWave}/${g.totalWaves}
            ${i.length>0?" · "+i.map(b=>b.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${d}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${s.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(m=document.getElementById("btnTCFight"))==null||m.addEventListener("click",async()=>{s.fighting=!0,y();try{const b=await l.request(`/player/${r}/atlas-maps/fight`,{method:"POST"});e.player=b.player,f();const x=b.result!=="map_failed";c(b.message,x?"success":"error"),s.fighting=!1,(b.result==="map_complete"||b.result==="map_failed")&&(s.tab="atlas"),await u()}catch(b){c(b.message,"error"),s.fighting=!1,y()}}),(o=document.getElementById("btnTCQuit"))==null||o.addEventListener("click",async()=>{try{await l.request(`/player/${r}/atlas-maps/abandon`,{method:"POST"}),c("Đã rời Tiên Cảnh","info"),s.tab="atlas",await u()}catch(b){c(b.message,"error")}})}function v(h){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[h]||"#666"}s.loaded?y():u()}function ft(n,t){const{state:e}=t,l=e._travelTab||"map";n.innerHTML=`
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
  `,n.querySelectorAll(".tab-btn").forEach(f=>{f.addEventListener("click",()=>{e._travelTab=f.dataset.tab,ft(n,t)})});const c=n.querySelector("#travelTabContent");l==="map"?tt(c,t):l==="dungeon"?yt(c,t):xt(c,t)}async function tt(n,t){var r;const{state:e,api:l,notify:c,updateSidebar:f}=t;n.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[s,u]=await Promise.all([l.request("/data/areas"),l.request(`/player/${e.playerId}/area`)]),y=s.areas||[],w=u.area,k=u.player,a=u.traveling||!1,p=u.travelRemaining||0,v=u.travelDestination||"";u.message&&c(u.message,"success"),u.player&&(e.player=u.player,f());const h=e.exploration||{},g=h[(k==null?void 0:k.currentArea)||"thanh_lam_tran"],d=(w==null?void 0:w.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",i=(g==null?void 0:g.staminaCost)||10,m={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận",cuu_u_than_uyen:"👿 Cửu U ma khí: +35% ST, +20% Tốc Độ",thai_co_hong_hoang:"🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp",chu_thien_tinh_hai:"🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn",hon_don_tien_vuc:"🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số",hon_nguyen_dao_canh:"👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính"},o=m[k==null?void 0:k.currentArea]||"",b=[...y].sort((x,C)=>(x.sort_order||x.mapY||0)-(C.sort_order||C.mapY||0));if(n.innerHTML=`
      ${a?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${v}</span></strong>
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
                  ${d}
                  <span class="badge" style="background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.4);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${i} TL/lần</div>
              </div>
            </div>
            ${w!=null&&w.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${w.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${(w==null?void 0:w.min_level)||1}+</span>
              ${o?`<span class="badge" style="background:rgba(255,215,0,0.1);color:var(--gold);border:1px solid rgba(255,215,0,0.25);font-size:11px">${o}</span>`:""}
              ${(r=g==null?void 0:g.specialtyNames)!=null&&r.length?`<span class="badge" style="background:rgba(234,179,8,0.12);color:#facc15;border:1px solid rgba(234,179,8,0.3);font-size:11px">💎 Đặc Sản: ${g.specialtyNames.join(" · ")}</span>`:""}
            </div>
          </div>
        </div>
      `}

      <!-- 2D REALM MAP OVERVIEW -->
      <div class="panel">
        <div class="panel-title flex items-center justify-between">
          <span>🗺️ Thiên Địa Giới Đồ (2D Bát Hoang Tinh Đồ)</span>
          <span class="text-xs text-dim">${b.length} Khu vực</span>
        </div>
        <div class="panel-body" style="background:linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(10,15,28,0.95) 100%); padding:12px">
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px">
            ${b.map((x,C)=>{var _,O,R,B;const T=h[x.id],S=x.id===k.currentArea&&!a,I=k.level<(x.min_level||1),q=parseInt(x.travel_time)||0,L=parseInt(x.stamina_cost)||(T==null?void 0:T.staminaCost)||10,P=m[x.id]||"",H=x.tier||"Bát Hoang",$=L>=100?"rgba(239,68,68,0.2)":L>=40?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)",N=L>=100?"var(--red)":L>=40?"var(--gold)":"var(--text-dim)";let E="rgba(255,255,255,0.08)",z="rgba(255,255,255,0.03)";return S?(E="rgba(34, 197, 94, 0.6)",z="rgba(34, 197, 94, 0.08)"):I&&(E="rgba(239, 68, 68, 0.2)",z="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${S?"current-realm":""} ${I?"locked-realm":""}" 
                     style="border:1px solid ${E}; background:${z}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${S?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${S?"var(--green)":I?"var(--text-dim)":"var(--text-bright)"}">
                        #${C+1} ${x.name}
                      </div>
                      ${I?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      🏛️ ${H}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${x.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${I?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${I?"var(--red)":"var(--text-dim)"}">
                        Lv.${x.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${q>0?`⏱ ${q}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${$}; color:${N}; border:1px solid ${$}">
                        🏃 -${L} TL (Dò thám)
                      </span>
                    </div>

                    ${(_=T==null?void 0:T.specialtyNames)!=null&&_.length?`
                      <div style="font-size:10px; color:#facc15; background:rgba(234,179,8,0.1); border:1px solid rgba(234,179,8,0.25); border-radius:4px; padding:3px 6px; margin-bottom:6px; line-height:1.3">
                        💎 <strong>Đặc sản:</strong> ${T.specialtyNames.join(" · ")}
                      </div>
                    `:""}

                    ${T!=null&&T.rates?`
                      <div style="display:flex; gap:6px; font-size:10px; margin-bottom:8px; opacity:0.85">
                        <span style="color:#34d399">🌿 ~${((O=T.rates.find(A=>A.type==="herb"))==null?void 0:O.weight)||0}%</span>
                        <span style="color:rgba(255,255,255,0.2)">·</span>
                        <span style="color:#38bdf8">⛏️ ~${((R=T.rates.find(A=>A.type==="mineral"))==null?void 0:R.weight)||0}%</span>
                        <span style="color:rgba(255,255,255,0.2)">·</span>
                        <span style="color:#f87171">👾 ~${((B=T.rates.find(A=>A.type==="monster"))==null?void 0:B.weight)||0}%</span>
                      </div>
                    `:""}

                    ${P?`
                      <div style="font-size:10px; color:var(--gold); background:rgba(255,215,0,0.05); padding:3px 6px; border-radius:4px; margin-bottom:10px; border-left:2px solid var(--gold)">
                        ${P}
                      </div>
                    `:""}
                  </div>

                  <div style="margin-top:auto">
                    ${S?`
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(34,197,94,0.2); color:var(--green); border:1px solid rgba(34,197,94,0.4)">
                        📍 Đang tọa trấn
                      </button>
                    `:I?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${x.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${x.id}" ${a?"disabled":""}>
                        ${q>0?`🚶 Vi Hành (${q}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll("[data-travel]").forEach(x=>{x.addEventListener("click",async C=>{C.stopPropagation();const T=x.dataset.travel;n.querySelectorAll("[data-travel]").forEach(S=>{S.tagName==="BUTTON"&&(S.disabled=!0),S.style.pointerEvents="none"});try{const S=await l.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:T})});S.player&&(e.player=S.player,f()),c(S.message,"success"),tt(n,t)}catch(S){c(S.message||"Lỗi di chuyển!","error"),tt(n,t)}})}),a&&p>0){let x=p;const C=p,T=setInterval(async()=>{x--;const S=document.getElementById("travelTimer"),I=document.getElementById("travelBar");if(S&&(S.textContent=`⏳ ${Math.max(0,x)}s`),I&&(I.style.width=`${Math.max(0,x/C*100)}%`),x<=0){clearInterval(T);try{const q=await l.request(`/player/${e.playerId}/travel-check`,{method:"POST"});q.player&&(e.player=q.player,f()),q.arrived&&c(q.message,"success"),tt(n,t)}catch{tt(n,t)}}},1e3)}}catch(s){n.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(s)}}async function W(n,t){var q;const{state:e,renderGame:l,notify:c,updateSidebar:f}=t,r=e.player,s=e._alchemyTab||"recipes",u=e._forgeFilter||"all",y=e.medicines||[];let w=e.recipes||[];if(!w.length)try{w=(await j.request("/recipes")).recipes||[],e.recipes=w}catch(L){console.warn("Failed loading medicine recipes",L)}let k=e._forgingRecipes||[];if(!k.length)try{k=(await j.getForgingRecipes()).recipes||[],e._forgingRecipes=k}catch(L){console.warn("Failed loading forging recipes",L)}const a=L=>{const P=y.find(H=>H.id===L);return P?(P.icon||"💊")+" "+P.name:L};let p=L=>0,v=0,h=0,g=0;(r.skills||[]).forEach(L=>{const P=typeof L=="string"?L:L.id,H=typeof L=="string"?1:L.level||1;P==="tinh_che"&&(p=H*2),P==="phu_an_thuat"&&(v=H*5),P==="linh_kiem_thuat"&&(h=H*10),P==="cuong_hoa_thuat"&&(g=H*15)});const d=r.craftingLevel||1,i=r.craftingXp||0,m=d*50,o=Math.min(100,Math.round(i/Math.max(1,m)*100)),b=L=>L.split("_").map(P=>P.charAt(0).toUpperCase()+P.slice(1)).join(" "),x=[];Object.entries(r.equipment||{}).forEach(([L,P])=>{P&&x.push({...P,loc:"eq",slotName:L})}),(r.inventory||[]).filter(L=>L.slot&&L.slot!=="consumable").forEach(L=>{x.push({...L,loc:"inv",slotName:L.slot})}),!e._selectedEnhanceItemId&&x.length>0&&(e._selectedEnhanceItemId=x[0].id),!e._selectedCurrencyItemId&&x.length>0&&(e._selectedCurrencyItemId=x[0].id);const C={legendary:"#f59e0b",epic:"#a855f7",rare:"#facc15",uncommon:"#38bdf8",common:"#94a3b8"};let T=`
    <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="display:flex;align-items:center;gap:8px">⚒️ Lò Tạo Hóa (Chế Tác)</h1>
        <div class="text-sm text-dim">Đúc rèn Thần Binh, Luyện Chế Tiên Đan và Cường Hóa Pháp Khí viễn cổ.</div>
      </div>
      
      <!-- CRAFTING MASTERY HUD -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px 14px;min-width:220px">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:4px">
          <span style="font-weight:700;color:var(--gold)">🛠️ Luyện Khí Thuật: Cấp ${d}</span>
          <span class="text-dim text-xs">${i}/${m} XP</span>
        </div>
        <div style="background:rgba(0,0,0,0.4);border-radius:4px;height:5px;overflow:hidden">
          <div style="background:var(--gold);height:100%;width:${o}%;transition:width 0.3s"></div>
        </div>
      </div>
    </div>

    <!-- 4 TABS NAVIGATION -->
    <div style="display:flex;gap:6px;margin-bottom:14px;overflow-x:auto;padding-bottom:4px">
      <button class="btn ${s==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">
        🔥 Luyện Đan (${w.length})
      </button>
      <button class="btn ${s==="forging"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="forging">
        ⚔️ Đúc Khí (${k.length})
      </button>
      <button class="btn ${s==="enhancement"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="enhancement">
        ✨ Cường Hóa (+1 đến +12)
      </button>
      <button class="btn ${s==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">
        🔮 Phù Văn
      </button>
    </div>

    <!-- SKILL BUFFS BANNER -->
    ${p||v||h||g?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:12px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">✨ Gia Trì Nghề Nghiệp:</span>
      ${p?`<span>🔥 Thành công +${p}%</span>`:""}
      ${v?`<span>💎 Giảm phí -${v}%</span>`:""}
      ${h?`<span>✨ Phẩm chất +${h}%</span>`:""}
      ${g?`<span>⬆️ Nâng đôi ${g}%</span>`:""}
    </div>
    `:""}
  `;if(s==="recipes"){if(T+=`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🌿 Khí Hải Tàng Trữ (Dược Liệu)</div>
        <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:10px;white-space:nowrap">
    `,!r.materials||Object.keys(r.materials).length===0)T+='<div style="color:var(--text-dim);font-size:13px;padding:6px 0">Nguyên liệu trống không...</div>';else for(const[L,P]of Object.entries(r.materials))T+=`
          <div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px;font-size:12px">
            ${b(L)} <span style="color:var(--gold);font-weight:700">x${P}</span>
          </div>`;T+="</div></div>",T+='<div class="panel"><div class="panel-title">🔥 Đan Phương Truyền Thừa</div><div class="panel-body no-pad">',w.length===0?T+='<div style="padding:16px" class="text-dim">Chưa có công thức đan dược...</div>':w.forEach(L=>{var z;const P=a(L.target),H=Math.min(100,(L.successRate||100)+p);let $="";(z=L.requirements)!=null&&z.skill&&($=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${b(L.requirements.skill)} lv${L.requirements.level||1}</div>`);let N="";(L.materials||[]).forEach(_=>{var R;const O=((R=r.materials)==null?void 0:R[_.id])||0;N+=`
            <span style="font-size:12px;margin-right:10px;display:inline-block;background:rgba(255,255,255,0.05);padding:3px 8px;border-radius:4px">
              <span style="color:${O>=_.amount?"var(--green)":"var(--red)"};font-weight:bold">${O}/${_.amount}</span> ${b(_.id)}
            </span>`});const E=y.find(_=>_.id===L.target)||{};T+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch;border-bottom:1px solid rgba(255,255,255,0.05)">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:15px">${P}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${L.tier}</span>
                  <span>Tỉ lệ: <span style="color:${H>=80?"var(--green)":"var(--blue)"};font-weight:bold">${H}%</span></span>
                  <span>🔥 Phí: ${L.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.25);border-top:1px solid rgba(255,255,255,0.05)">
              ${$}
              <div style="margin-bottom:10px">
                <div class="text-dim" style="font-size:11px;margin-bottom:4px">Nguyên liệu cần có:</div>
                <div class="flex flex-wrap gap-2">${N}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Công Dụng:</strong> ${E.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${L.id}">
                🔥 Khởi Lò Luyện Đan
              </button>
            </div>
          </div>`}),T+="</div></div>"}else if(s==="forging"){const L={weapon:"⚔️",body:"🛡️",shield:"🛡️",feet:"👢",ring:"💍"},P=k.filter(H=>u==="all"?!0:H.slot===u);T+=`
      <!-- SUB-FILTERS FOR FORGING -->
      <div style="display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding-bottom:4px">
        <button class="btn ${u==="all"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="all">Tất Cả (${k.length})</button>
        <button class="btn ${u==="weapon"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="weapon">⚔️ Vũ Khí</button>
        <button class="btn ${u==="body"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="body">🛡️ Hộ Giáp</button>
        <button class="btn ${u==="shield"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="shield">🛡️ Khiên</button>
        <button class="btn ${u==="ring"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="ring">💍 Giới Chỉ</button>
        <button class="btn ${u==="feet"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="feet">👢 Giày / Hài</button>
      </div>

      <div class="panel">
        <div class="panel-title" style="display:flex;justify-content:space-between;align-items:center">
          <span>⚒️ Danh Sách Bản Đồ Đúc Khí</span>
          <span class="text-xs text-dim">Khoáng thạch & Vật liệu yêu thú</span>
        </div>
        <div class="panel-body no-pad">
    `,P.length===0?T+='<div style="padding:16px" class="text-dim">Không có công thức đúc khí trong mục này.</div>':P.forEach(H=>{const $=L[H.slot]||"⚔️",N=C[H.rarity]||"#94a3b8",E=Math.min(100,H.successRate+Math.floor(d/4)+p);let z=r.gold>=H.cost,_="";(H.materials||[]).forEach(O=>{var A;const R=((A=r.materials)==null?void 0:A[O.id])||0,B=R>=O.amount;B||(z=!1),_+=`
            <span style="font-size:12px;background:rgba(255,255,255,0.04);border:1px solid ${B?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"};padding:3px 8px;border-radius:4px">
              <span style="color:${B?"var(--green)":"var(--red)"};font-weight:700">${R}/${O.amount}</span> ${O.name||b(O.id)}
            </span>`}),T+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch;border-bottom:1px solid rgba(255,255,255,0.05)">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="font-size:26px">${$}</div>
                <div>
                  <div style="font-weight:700;font-size:15px;color:${N}">${H.name}</div>
                  <div class="text-xs text-dim flex gap-3 mt-xs">
                    <span class="badge" style="border:1px solid ${N};color:${N};padding:1px 6px;text-transform:uppercase">${H.rarity}</span>
                    <span>Tier ${H.tier}</span>
                    <span>Tỉ lệ: <span style="color:${E>=75?"var(--green)":"var(--blue)"};font-weight:700">${E}%</span></span>
                    <span>🔥 ${H.cost} Linh Thạch</span>
                  </div>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>

            <div class="accordion-body" style="display:none;padding:14px;background:rgba(0,0,0,0.25);border-top:1px solid rgba(255,255,255,0.05)">
              <div style="margin-bottom:10px">
                <div class="text-dim" style="font-size:11px;margin-bottom:6px">Nguyên liệu cần thiết:</div>
                <div class="flex flex-wrap gap-2">${_}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Đặc Tính:</strong> ${H.description}
              </div>
              <button class="btn btn--gold btn-forge" style="width:100%;justify-content:center" data-recipe="${H.id}" ${z?"":"disabled"}>
                ${z?`⚒️ Khởi Động Lò Đúc (${H.cost} 💎)`:"❌ Thiếu Nguyên Liệu hoặc Linh Thạch"}
              </button>
            </div>
          </div>`}),T+="</div></div>"}else if(s==="enhancement"){const L=x.find(P=>P.id===e._selectedEnhanceItemId)||x[0];if(T+=`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">⚔️ Chọn Trang Bị Cần Cường Hóa</div>
        <div class="panel-body" style="padding:10px 14px">
    `,x.length===0?T+='<div style="opacity:0.4;padding:8px 0">Không có trang bị nào trên người hoặc trong túi.</div>':T+=`
        <select id="selEnhanceItem" style="width:100%;padding:10px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.15);border-radius:6px;font-size:13px">
          ${x.map(P=>{const H=P.enhanceLevel>0?`+${P.enhanceLevel}`:"";return`
              <option value="${P.id}" ${P.id===(L==null?void 0:L.id)?"selected":""}>
                ${P.loc==="eq"?"🔸 [Đang Mặc]":"📦 [Túi]"} ${P.displayName||P.name} (${P.rarity||"common"}) ${H}
              </option>`}).join("")}
        </select>
      `,T+="</div></div>",L){const P=L.enhanceLevel||0,H=P>=12,$=P+1,N=L.itemLevel||1;let E=100,z=1,_=50*$,O="safe";$<=3?(E=100,z=1,_=50*$,O="safe"):$<=6?(E={4:80,5:70,6:60}[$]||60,z=2,_=100*$,O="safe_fail"):$<=9?(E={7:45,8:35,9:25}[$]||25,z=3,_=250*$,O="downgrade"):(E={10:20,11:15,12:10}[$]||10,z=4,_=600*$,O="downgrade"),_=Math.round(_*(1+(N-1)*.05));const R=((q=r.materials)==null?void 0:q.da_cuong_hoa)||0,B=R>=z,A=r.gold>=_,D=!H&&B&&A,F={safe:'<span style="color:#10b981;font-weight:700">✅ 100% Tuyệt Đối Thành Công</span>',safe_fail:'<span style="color:#38bdf8;font-weight:700">🛡️ Thất Bại Giữ Nguyên Cấp</span>',downgrade:'<span style="color:#f87171;font-weight:700">⚠️ Rủi Ro: Thất Bại Bị Rớt 1 Cấp (-1)</span>'};T+=`
        <div class="panel" style="border:1px solid rgba(255,215,0,0.2);box-shadow:0 0 20px rgba(0,0,0,0.4)">
          <div class="panel-body text-center" style="padding:20px 16px">
            
            <!-- ITEM HEADER -->
            <div style="font-size:36px;margin-bottom:8px">✨</div>
            <h2 style="color:${C[L.rarity]||"#fff"};margin-bottom:4px">
              ${L.displayName||L.name}
            </h2>
            <div class="text-sm text-dim" style="margin-bottom:16px">
              Loại: <span style="text-transform:uppercase">${L.slot||L.baseType}</span> | Cấp trang bị: iLvl ${L.itemLevel||1}
            </div>

            <!-- LEVEL PROGRESSION METER -->
            <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;margin-bottom:16px">
              <div style="display:flex;justify-content:space-around;align-items:center;margin-bottom:10px">
                <div style="text-align:center">
                  <div class="text-xs text-dim">Hiện Tại</div>
                  <div style="font-size:24px;font-weight:800;color:var(--text-bright)">+${P}</div>
                </div>
                <div style="font-size:20px;color:var(--gold)">➜</div>
                <div style="text-align:center">
                  <div class="text-xs text-dim">Mục Tiêu</div>
                  <div style="font-size:24px;font-weight:800;color:var(--gold)">
                    ${H?"MAX":`+${$}`}
                  </div>
                </div>
              </div>

              ${H?`
              <div style="color:var(--gold);font-weight:700">🌟 TRANG BỊ ĐÃ ĐẠT CƯỜNG HÓA TỐI ĐA CỬU THIÊN (+12)!</div>
              `:`
              <!-- CHANCE PROGRESS BAR -->
              <div style="margin-bottom:8px">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                  <span>Tỉ Lệ Thành Công:</span>
                  <strong style="color:${E>=60?"var(--green)":E>=30?"var(--gold)":"var(--red)"}">
                    ${E}%
                  </strong>
                </div>
                <div style="background:rgba(255,255,255,0.08);height:8px;border-radius:4px;overflow:hidden">
                  <div style="background:${E>=60?"var(--green)":E>=30?"var(--gold)":"var(--red)"};height:100%;width:${E}%"></div>
                </div>
              </div>
              <div style="font-size:11px">${F[O]}</div>
              `}
            </div>

            <!-- COST REQUIREMENTS -->
            ${H?"":`
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
              <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px">
                <div style="font-size:18px">💎</div>
                <div class="text-xs text-dim">Đá Cường Hóa</div>
                <div style="font-size:14px;font-weight:700;color:${B?"var(--green)":"var(--red)"}">
                  ${R} / ${z} viên
                </div>
              </div>

              <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px">
                <div style="font-size:18px">💰</div>
                <div class="text-xs text-dim">Linh Thạch Tiêu Hao</div>
                <div style="font-size:14px;font-weight:700;color:${A?"var(--gold)":"var(--red)"}">
                  ${r.gold} / ${_} 💎
                </div>
              </div>
            </div>

            <!-- ENHANCE BUTTON -->
            <button class="btn btn--gold btn--lg btn-enhance" style="width:100%;justify-content:center;font-size:16px;font-weight:800" data-item="${L.id}" ${D?"":"disabled"}>
              ${D?`✨ TIẾN HÀNH CƯỜNG HÓA (+${$})`:H?"ĐÃ ĐẠT CẤP TỐI ĐA":"❌ KHÔNG ĐỦ NGUYÊN LIỆU"}
            </button>
            `}

          </div>
        </div>
      `}}else s==="currency"&&(T+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị Khắc Ấn</div>
        <div class="panel-body" style="padding:10px 14px">
          ${x.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selCurrencyItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${x.map(L=>`
              <option value="${L.id}" ${L.id===e._selectedCurrencyItemId?"selected":""}>
                ${L.loc==="eq"?"🔸 [Đang Mặc]":"📦 [Túi]"} ${L.displayName||L.name} [${L.rarity||"?"}] ${(L.affixes||[]).length} dòng
              </option>`).join("")}
          </select>
          <div id="currencyItemPreview" style="margin-top:8px;font-size:12px;opacity:0.7"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại ngẫu nhiên",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 dòng affix ngẫu nhiên (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 dòng affix, xóa và roll lại phần còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (tối đa +5)",cost:1500}].map(L=>{const P=Math.max(1,Math.round(L.cost*(1-v/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:22px;margin-bottom:4px">${L.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${L.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${L.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${L.id}" style="width:100%">
                💎 ${P} ${v>0?`<s style="opacity:0.4;font-size:10px">${L.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `);n.innerHTML=T,n.querySelectorAll(".tab-btn").forEach(L=>{L.addEventListener("click",()=>{e._alchemyTab=L.dataset.tab,W(n,t)})}),n.querySelectorAll(".filter-forge-btn").forEach(L=>{L.addEventListener("click",()=>{e._forgeFilter=L.dataset.filter,W(n,t)})}),n.querySelectorAll(".accordion-header").forEach(L=>{L.addEventListener("click",()=>{const P=L.nextElementSibling;if(P)if(P.style.display==="none"){P.style.display="block";const H=L.querySelector(".text-dim:last-child");H&&(H.textContent="▲")}else{P.style.display="none";const H=L.querySelector(".text-dim:last-child");H&&(H.textContent="▼")}})}),n.querySelectorAll(".btn-craft").forEach(L=>{L.addEventListener("click",async P=>{P.stopPropagation();const H=L.dataset.recipe;L.disabled=!0,L.textContent="⏳ Đang khởi lò...";try{const $=await j.craftItem(r.id,H);e.player=$.player,c($.message,$.success?"success":"error"),f(),W(n,t)}catch($){c($.message,"error"),L.disabled=!1,L.textContent="🔥 Khởi Lò Luyện Đan"}})}),n.querySelectorAll(".btn-forge").forEach(L=>{L.addEventListener("click",async P=>{P.stopPropagation();const H=L.dataset.recipe;L.disabled=!0,L.textContent="⚒️ Đang rèn...";try{const $=await j.forgeItem(r.id,H);e.player=$.player,c($.message,$.success?"success":"error"),f(),W(n,t)}catch($){c($.message,"error"),L.disabled=!1,L.textContent="⚒️ Khởi Động Lò Đúc"}})});const S=document.getElementById("selEnhanceItem");S&&S.addEventListener("change",()=>{e._selectedEnhanceItemId=S.value,W(n,t)}),n.querySelectorAll(".btn-enhance").forEach(L=>{L.addEventListener("click",async()=>{const P=L.dataset.item;L.disabled=!0,L.textContent="✨ Đang luyện...";try{const H=await j.enhanceItem(r.id,P);e.player=H.player,c(H.message,H.isSuccess?"success":"error"),f(),W(n,t)}catch(H){c(H.message,"error"),L.disabled=!1,L.textContent="✨ TIẾN HÀNH CƯỜNG HÓA"}})});const I=document.getElementById("selCurrencyItem");if(I){const L=()=>{const P=x.find($=>$.id===I.value),H=document.getElementById("currencyItemPreview");P&&H&&(H.innerHTML=(P.affixes||[]).map($=>`<span style="color:var(--blue)">• ${$.name||$.stat} +${$.value}</span>`).join(" | ")||"Chưa có dòng thuộc tính nào")};I.addEventListener("change",()=>{e._selectedCurrencyItemId=I.value,L()}),L()}n.querySelectorAll(".btn-currency").forEach(L=>{L.addEventListener("click",async()=>{if(!(I!=null&&I.value))return c("Chọn trang bị trước!","error");const P=L.dataset.cid;let H=-1;if(P==="thien_menh_phu"){const $=x.find(z=>z.id===I.value),N=($==null?void 0:$.affixes)||[];if(N.length===0)return c("Trang bị không có dòng thuộc tính để khóa!","error");const E=prompt(`Chọn số thứ tự dòng muốn khóa (0-${N.length-1}):
${N.map((z,_)=>`${_}: ${z.name||z.stat} +${z.value}`).join(`
`)}`);if(E===null)return;if(H=parseInt(E),isNaN(H)||H<0||H>=N.length)return c("Chỉ số không hợp lệ!","error")}L.disabled=!0,L.textContent="⏳...";try{const $=await j.applyCurrency(r.id,P,I.value,H);c($.message,"success"),e.player=$.player,f(),W(n,t)}catch($){c($.message,"error"),L.disabled=!1,L.textContent="💎 Dùng"}})})}function $t(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;async function s(){try{const y=await l.getDailyQuests(r);e._dailyQuests=y,u()}catch(y){c(y.message,"error")}}function u(){const y=e._dailyQuests||{},w=y.quests||[];y.allCompleted;const k=y.bonusReward;n.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${w.map(a=>{const p=a.quest_info||{},v=a.target>0?Math.min(100,Math.round(a.progress/a.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${a.claimed?"var(--text-dim)":a.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${p.name||a.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${p.difficulty==="Khó"?"var(--red)":p.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${p.difficulty||"?"}</span>
              </div>
              ${a.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':a.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${a.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${a.progress}/${a.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${p.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${v}%;background:${a.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${p.goldReward||0} · ✨ ${p.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${k?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${k.gold} 💎, +${k.xp} EXP</div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-claim").forEach(a=>a.addEventListener("click",async()=>{try{const p=await l.claimDailyQuest(r,parseInt(a.dataset.qid));c(p.message,"success"),e.player=p.player,f(),await s()}catch(p){c(p.message,"error")}}))}s()}function Tt(n,t){const{state:e,api:l,notify:c,renderGame:f}=t,r=e._questTab||"npc";n.innerHTML=`
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
  `,n.querySelectorAll("[data-qtab]").forEach(y=>{y.addEventListener("click",()=>{e._questTab=y.dataset.qtab,Tt(n,t)})});const s=n.querySelector("#questTabContent");if(r==="daily"){$t(s,t);return}u();async function u(){try{const w=(await l.getQuests(e.playerId)).quests||[],k=document.getElementById("questList");if(!k)return;if(w.length===0){k.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}k.innerHTML=w.map(a=>{const p=a.questAmount>0?Math.min(100,a.progress/a.questAmount*100):0,v=a.progress>=a.questAmount,h=a.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${v?"quest-done":""}" data-quest-id="${a.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${a.npcIcon||"🧓"} ${a.npcName||"NPC"}</span>
              <span class="quest-type">${h} ${a.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${a.questName||a.quest_id}</div>
            <div class="quest-desc">${a.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${v?"hp":"energy"}" style="width:${p}%"></div>
              </div>
              <span class="quest-progress-text">${a.progress}/${a.questAmount}</span>
            </div>
            ${v?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${a.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),k.querySelectorAll(".quest-complete-btn").forEach(a=>{a.addEventListener("click",async()=>{const p=a.dataset.qid;a.disabled=!0,a.textContent="⏳...";try{const v=await l.completeQuest(e.playerId,p);e.player=v.player,c(v.message,"success"),v.skillGained&&c(`🎯 Lĩnh ngộ: ${v.skillGained}!`,"success"),f()}catch(v){c(v.message||"Lỗi trả quest","error"),a.disabled=!1,a.textContent="✅ Trả Nhiệm Vụ"}})})}catch(y){console.error("Error loading quests:",y);const w=document.getElementById("questList");w&&(w.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function Kt(n,t){const{state:e,api:l,notify:c,renderGame:f}=t;if(e.player.role!=="admin"){n.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const r=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let s="monsters";n.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${r.map(d=>`
          <button class="admin-tab ${d.id===s?"active":""}" data-tab="${d.id}">${d.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",d=>{const i=d.target.closest(".admin-tab");i&&(s=i.dataset.tab,document.querySelectorAll(".admin-tab").forEach(m=>m.classList.remove("active")),i.classList.add("active"),u(s))}),u(s);async function u(d){const i=document.getElementById("adminContent");if(i){i.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const m=await l.request(`/admin/${d}?adminId=${e.playerId}`);y(d,m,i)}catch(m){i.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${m.message}</div></div>`}}}function y(d,i,m){d==="monsters"?w(i,m):d==="npcs"?k(i,m):d==="areas"?a(i,m):p(d,i,m)}function w(d,i){const m=d.monsters||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${m.map(o=>{var b,x,C,T,S,I,q,L;return`
          <div class="admin-card" data-id="${o.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${o.name} ${o.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((x=(b=d.tierInfo)==null?void 0:b[o.tier])==null?void 0:x.color)||"#888"}">${((T=(C=d.tierInfo)==null?void 0:C[o.tier])==null?void 0:T.name)||"T"+o.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((S=o.stats)==null?void 0:S.hp)||"?"}</div>
              <div>💪 ${((I=o.stats)==null?void 0:I.strength)||"?"}</div>
              <div>🏃 ${((q=o.stats)==null?void 0:q.speed)||"?"}</div>
              <div>🛡 ${((L=o.stats)==null?void 0:L.defense)||"?"}</div>
            </div>
            <div class="admin-card-meta">
              <span>XP: ${o.xpReward||0}</span>
              <span>Gold: ${Array.isArray(o.goldReward)?o.goldReward.join("-"):o.goldReward}</span>
              ${o.areaId?`<span>📍 ${o.areaId}</span>`:""}
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${o.id}" data-type="monsters" data-key="monsters">✏️ Sửa</button>
          </div>
        `}).join("")}
      </div>
    `,h(i,d,"monsters","monsters")}function k(d,i){const m=d.npcs||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${m.map(o=>`
          <div class="admin-card" data-id="${o.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${o.icon||"🧓"} ${o.name}</span>
              <span class="badge" style="background:var(--purple)">${o.profession}</span>
            </div>
            <div class="admin-card-meta">
              <span>Quests: ${(o.quests||[]).length}</span>
              <span>Areas: ${(o.areaIds||[]).join(", ")}</span>
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${o.id}" data-type="npcs" data-key="npcs">✏️ Sửa</button>
          </div>
        `).join("")}
      </div>
    `,h(i,d,"npcs","npcs")}function a(d,i){const m=Object.keys(d);i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${m.map(o=>{const b=d[o];return`
            <div class="admin-card" data-id="${o}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${b.name||o}</span>
                <span class="badge" style="background:var(--orange)">⚡${b.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(b.events||[]).map(x=>`<span>${x.type}: ${x.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${o}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,i.querySelectorAll(".admin-edit-area").forEach(o=>{o.addEventListener("click",()=>{const b=o.dataset.id,x=d[b];v(b,x,`areas/${b}`)})})}function p(d,i,m){var x;const o=JSON.stringify(i,null,2),b=o.split(`
`).length;m.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(b+5,30)}">${g(o)}</textarea>
    `,(x=document.getElementById("btnSaveGeneric"))==null||x.addEventListener("click",async()=>{try{const C=document.getElementById("genericEditor").value,T=JSON.parse(C);c("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(C){c("JSON không hợp lệ: "+C.message,"error")}})}function v(d,i,m,o){const b=JSON.stringify(i,null,2),x=document.createElement("div");x.className="admin-modal-overlay",x.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${d}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${g(b)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(x),x.querySelectorAll(".admin-modal-close").forEach(C=>{C.addEventListener("click",()=>x.remove())}),x.addEventListener("click",C=>{C.target===x&&x.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const C=document.getElementById("modalEditor").value,T=JSON.parse(C);await l.request(`/admin/${m}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:T})}),c("✅ Đã lưu!","success"),x.remove(),u(s)}catch(C){c("Lỗi: "+C.message,"error")}})}function h(d,i,m,o){d.querySelectorAll(".admin-edit-btn").forEach(b=>{b.addEventListener("click",()=>{const x=b.dataset.id,T=(i[o]||[]).find(S=>S.id===x);T&&v(x,T,`${m}/${x}`)})})}function g(d){return d.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function kt(n,t){const{state:e,api:l,notify:c,renderGame:f,updateSidebar:r}=t,s=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const u=e._social;async function y(){try{const h=await l.getRelationships(s);u.relationships=h,u.loaded=!0,w()}catch(h){c(h.message||"Lỗi tải dữ liệu Giao Tế","error")}}function w(){const{friends:h,enemies:g,pendingSent:d,pendingReceived:i}=u.relationships,m=i.length;n.innerHTML=`
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
            ${u.searchResults.map(o=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${o.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${o.level} · ${o.realm} · ${o.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${o.id!==s?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${o.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${o.id}">⚔️ Kẻ Thù</button>
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
          🤝 Đạo Hữu (${h.length})
        </button>
        <button class="btn btn--sm ${u.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${g.length})
        </button>
        <button class="btn btn--sm ${u.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${m>0?`<span class="badge">${m}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${u.tab==="friends"?k(h):""}
        ${u.tab==="enemies"?a(g):""}
        ${u.tab==="pending"?p(i,d):""}
      </div>
    `,v()}function k(h){return h.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':h.map(g=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${g.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${g.level} · ${g.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${g.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${g.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function a(h){return h.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':h.map(g=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${g.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${g.level} · ${g.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${g.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${g.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function p(h,g){let d="";return h.length>0&&(d+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',d+=h.map(i=>`
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
      `).join("")),g.length>0&&(d+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',d+=g.map(i=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${i.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${i.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),h.length===0&&g.length===0&&(d='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),d}function v(){var h,g;(h=document.getElementById("btnSearch"))==null||h.addEventListener("click",async()=>{var i;const d=(i=document.getElementById("socialSearch"))==null?void 0:i.value.trim();if(!d||d.length<2)return c("Cần ít nhất 2 ký tự","error");u.searchQuery=d;try{const m=await l.searchPlayers(d);u.searchResults=m.players||[],w()}catch(m){c(m.message,"error")}}),(g=document.getElementById("socialSearch"))==null||g.addEventListener("keydown",d=>{var i;d.key==="Enter"&&((i=document.getElementById("btnSearch"))==null||i.click())}),document.querySelectorAll("[data-tab]").forEach(d=>{d.addEventListener("click",()=>{u.tab=d.dataset.tab,w()})}),document.querySelectorAll("[data-action]").forEach(d=>{d.addEventListener("click",async()=>{const i=d.dataset.action,m=d.dataset.target;d.disabled=!0;try{let o;switch(i){case"add-friend":o=await l.addFriend(s,m);break;case"accept-friend":o=await l.acceptFriend(s,m);break;case"reject-friend":o=await l.rejectFriend(s,m);break;case"remove-friend":o=await l.removeFriend(s,m);break;case"add-enemy":o=await l.addEnemy(s,m);break;case"remove-enemy":o=await l.removeEnemy(s,m);break}c(o.message||"Thành công!","success"),await y()}catch(o){c(o.message||"Lỗi!","error"),d.disabled=!1}})})}u.loaded?w():y()}function wt(n,t){const{state:e,api:l,notify:c}=t,f=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const r=e._chat;async function s(){try{const[g,d]=await Promise.all([l.getGlobalChat(),l.getChatFriends(f)]);r.globalMessages=g.messages||[],r.friends=d.friends||[],r.globalMessages.length>0&&(r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id),r.loaded=!0,w(),u()}catch(g){c(g.message||"Lỗi tải chat","error")}}function u(){y(),r.pollTimer=setInterval(async()=>{try{if(r.tab==="global"){const g=await l.getGlobalChat(r.lastGlobalId);g.messages&&g.messages.length>0&&(r.globalMessages.push(...g.messages),r.globalMessages.length>100&&(r.globalMessages=r.globalMessages.slice(-100)),r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id,a(),p())}else if(r.tab==="private"&&r.selectedFriend){const g=await l.getPrivateChat(f,r.selectedFriend.id,r.lastPrivateId);g.messages&&g.messages.length>0&&(r.privateMessages.push(...g.messages),r.privateMessages.length>100&&(r.privateMessages=r.privateMessages.slice(-100)),r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id,a(),p())}}catch{}},5e3)}function y(){r.pollTimer&&(clearInterval(r.pollTimer),r.pollTimer=null)}function w(){const g=r.tab==="global"?r.globalMessages:r.privateMessages;n.innerHTML=`
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
            ${r.friends.map(d=>{var i;return`<option value="${d.id}" ${((i=r.selectedFriend)==null?void 0:i.id)===d.id?"selected":""}>${d.name} (Lv.${d.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${k(g)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${r.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,h(),p()}function k(g){return g.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':g.map(d=>{const i=d.sender_id===f,m=new Date(d.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${i?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${m}</span>
          <span style="font-weight:600;color:${i?"var(--blue)":"var(--gold)"}"> ${d.sender_name}</span>
          <span style="opacity:0.8">: ${v(d.message)}</span>
        </div>
      `}).join("")}function a(){const g=document.getElementById("chatMessages");if(!g)return;const d=r.tab==="global"?r.globalMessages:r.privateMessages;g.innerHTML=k(d)}function p(){const g=document.getElementById("chatMessages");g&&(g.scrollTop=g.scrollHeight)}function v(g){const d=document.createElement("div");return d.textContent=g,d.innerHTML}function h(){var d,i,m;document.querySelectorAll("[data-chat-tab]").forEach(o=>{o.addEventListener("click",()=>{r.tab=o.dataset.chatTab,r.tab==="global"&&(r.lastGlobalId=r.globalMessages.length>0?r.globalMessages[r.globalMessages.length-1].id:0),w(),u()})}),(d=document.getElementById("friendSelect"))==null||d.addEventListener("change",async o=>{const b=o.target.value;if(!b){r.selectedFriend=null,r.privateMessages=[],w();return}r.selectedFriend=r.friends.find(x=>x.id===b)||null,r.lastPrivateId=0;try{const x=await l.getPrivateChat(f,b);r.privateMessages=x.messages||[],r.privateMessages.length>0&&(r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id),a(),p()}catch(x){c(x.message,"error")}});const g=async()=>{var x,C;const o=document.getElementById("chatInput"),b=o==null?void 0:o.value.trim();if(b){if(r.tab==="private"&&!r.selectedFriend)return c("Chọn Đạo Hữu trước!","error");try{if(await l.sendChat(f,r.tab,r.tab==="private"?r.selectedFriend.id:null,b),o.value="",r.tab==="global"){const T=await l.getGlobalChat(r.lastGlobalId);((x=T.messages)==null?void 0:x.length)>0&&(r.globalMessages.push(...T.messages),r.lastGlobalId=r.globalMessages[r.globalMessages.length-1].id)}else{const T=await l.getPrivateChat(f,r.selectedFriend.id,r.lastPrivateId);((C=T.messages)==null?void 0:C.length)>0&&(r.privateMessages.push(...T.messages),r.lastPrivateId=r.privateMessages[r.privateMessages.length-1].id)}a(),p()}catch(T){c(T.message||"Lỗi gửi tin nhắn","error")}}};(i=document.getElementById("btnSend"))==null||i.addEventListener("click",g),(m=document.getElementById("chatInput"))==null||m.addEventListener("keydown",o=>{o.key==="Enter"&&g()})}t.renderGame,r.loaded?(w(),u()):s()}function Lt(n,t){const{state:e,api:l,notify:c,updateSidebar:f,renderGame:r}=t,s=e.playerId,u=e._auctionTab||"browse";async function y(){try{const[a,p]=await Promise.all([l.getAuctions(),l.getMyAuctions(s)]);e._auctionListings=a.listings||[],e._auctionMine=p.listings||[],w()}catch(a){c(a.message,"error")}}function w(){const a=e._auctionListings||[],p=e._auctionMine||[],v=(e.player.inventory||[]).filter(h=>h.slot&&h.slot!=="consumable");n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${u==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${u==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${u==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${p.length})</button>
      </div>

      ${u==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${a.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':a.map(h=>{const g=JSON.parse(h.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${g.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${g.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${h.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${h.id}">💎 ${h.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:u==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${v.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${v.map(h=>`<option value="${h.id}">${h.name} [${h.rarity}]</option>`).join("")}
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
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':p.map(h=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(h.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${h.status==="active"?"var(--green)":h.status==="sold"?"var(--gold)":"var(--red)"}">${h.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${h.buyout_price}</div>
                </div>
                ${h.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${h.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,k()}function k(){var a;n.querySelectorAll(".tab-btn").forEach(p=>p.addEventListener("click",()=>{e._auctionTab=p.dataset.tab,y()})),n.querySelectorAll(".btn-buy").forEach(p=>p.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const v=await l.buyAuction(s,parseInt(p.dataset.lid));c(v.message,"success"),e.player=v.player,f(),await y()}catch(v){c(v.message,"error")}})),n.querySelectorAll(".btn-cancel").forEach(p=>p.addEventListener("click",async()=>{try{const v=await l.cancelAuction(s,parseInt(p.dataset.lid));c(v.message,"success"),e.player=v.player,f(),await y()}catch(v){c(v.message,"error")}})),(a=document.getElementById("btnListItem"))==null||a.addEventListener("click",async()=>{var g,d,i;const p=(g=document.getElementById("selSellItem"))==null?void 0:g.value,v=parseInt(((d=document.getElementById("inpPrice"))==null?void 0:d.value)||"500"),h=parseInt(((i=document.getElementById("selDuration"))==null?void 0:i.value)||"24");try{const m=await l.listAuction(s,p,v,h);c(m.message,"success"),e.player=m.player,f(),e._auctionTab="mine",await y()}catch(m){c(m.message,"error")}})}y()}function jt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const s=e._market;async function u(){try{const[g,d]=await Promise.all([l.getMarketListings(s.filter,s.sort),l.getMyListings(r)]);s.listings=g.listings||[],s.myListings=d.listings||[],s.loaded=!0,w()}catch(g){c(g.message||"Lỗi tải Giao Dịch Đài","error")}}async function y(){try{const[g,d]=await Promise.all([l.getMugTargets(r),l.getMugLog(r)]);s.mugTargets=g.targets||[],s.mugCooldown=g.mugCooldown||0,s.mugLog=d.logs||[],w()}catch(g){c(g.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function w(){const g=e.player;if(n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${s.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${s.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${s.myListings.length}/10)</button>
        <button class="btn btn--sm ${s.tab==="auction"?"btn--gold":"btn--dark"}" data-mtab="auction">⚖️ Sàn Đấu Giá</button>
        <button class="btn btn--sm ${s.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${s.showListForm?v(g):""}

      ${s.tab==="browse"?k():s.tab==="my"?a():s.tab==="auction"?'<div id="auctionSubContent"></div>':p()}
    `,h(),s.tab==="auction"){const d=n.querySelector("#auctionSubContent");d&&Lt(d,t)}}function k(){let g=`
      <div class="panel">
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn--xs ${s.filter===""?"btn--blue":"btn--dark"}" data-filter="">Tất cả</button>
            <button class="btn btn--xs ${s.filter==="item"?"btn--blue":"btn--dark"}" data-filter="item">⚔️ Trang Bị</button>
            <button class="btn btn--xs ${s.filter==="material"?"btn--blue":"btn--dark"}" data-filter="material">🧱 Nguyên Liệu</button>
            <button class="btn btn--xs ${s.filter==="medicine"?"btn--blue":"btn--dark"}" data-filter="medicine">💊 Đan Dược</button>
            <select id="sortSelect" style="padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:12px;margin-left:auto">
              <option value="newest" ${s.sort==="newest"?"selected":""}>Mới nhất</option>
              <option value="price_asc" ${s.sort==="price_asc"?"selected":""}>Giá tăng</option>
              <option value="price_desc" ${s.sort==="price_desc"?"selected":""}>Giá giảm</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo tên vật phẩm hoặc affix..." value="${s.search}" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
          </div>
        </div>
      </div>
    `,d=s.listings;if(s.search.trim()){const i=s.search.toLowerCase().trim();d=d.filter(m=>{var o;return m.item_name.toLowerCase().includes(i)?!0:(o=m.item_data)!=null&&o.affixes?m.item_data.affixes.some(b=>(b.stat||"").toLowerCase().includes(i)||(b.type||"").toLowerCase().includes(i)):!1})}return d.length===0?g+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(g+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',g+=d.map(i=>{var C,T;const m=i.item_type==="item"?"⚔️":i.item_type==="material"?"🧱":"💊",o=((C=i.item_data)==null?void 0:C.rarity)||"",b=i.seller_id===r,x=(T=i.item_data)!=null&&T.affixes?i.item_data.affixes.map(S=>`${S.stat} ${S.type==="flat"?"+":""}${S.value}${S.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${m}
                <span style="color:var(--gold)">${i.item_name}</span>
                ${i.quantity>1?`<span style="opacity:0.5"> x${i.quantity}</span>`:""}
                ${o?`<span class="rarity-${o}" style="font-size:11px;margin-left:4px">[${o}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${i.seller_name}</span>
                ${x?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${x}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${i.price}${i.quantity>1?"/cái":""}</span>
              ${b?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${i.id}" data-qty="${i.quantity}" data-price="${i.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),g+="</div></div>"),g}function a(){if(s.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let g='<div class="panel"><div class="panel-body no-pad">';return g+=s.myListings.map(d=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${d.item_type==="item"?"⚔️":d.item_type==="material"?"🧱":"💊"} ${d.item_name} ${d.quantity>1?`<span style="opacity:0.5">x${d.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${d.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${d.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),g+="</div></div>",g}function p(){let g=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${s.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${s.mugCooldown}s</div>`:""}
    `;return s.mugTargets.length===0?g+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':g+=s.mugTargets.map(d=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${d.gender==="female"?"♀":"♂"} ${d.name}</div>
            <div class="item-meta">Lv.${d.level} · ${d.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${d.id}" ${s.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),g+="</div></div>",s.mugLog.length>0&&(g+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${s.mugLog.map(d=>{const i=d.attacker_id===r,m=d.outcome==="success"?"✅":"❌",o=d.outcome==="success"?"var(--green)":"var(--red)",b=i?d.outcome==="success"?`Cướp ${d.victim_name}: +${d.gold_stolen} 💎`:`Phục kích ${d.victim_name} thất bại!`:d.outcome==="success"?`Bị ${d.attacker_name} cướp: -${d.gold_stolen} 💎`:`${d.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${o}">${m} ${b} <span style="opacity:0.4;margin-left:auto">${new Date(d.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),g}function v(g){const d=Object.entries(g.materials||{}).map(([b,x])=>({id:b,qty:x,type:"material",name:b})),i=Object.entries(g.medicines||{}).map(([b,x])=>({id:b,qty:x,type:"medicine",name:b})),m=(g.inventory||[]).map(b=>({id:b.id,qty:1,type:"item",name:b.name||b.id})),o=[...d,...i,...m];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${o.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${o.map(b=>`<option value="${b.type}|${b.id}">${b.type==="item"?"⚔️":b.type==="material"?"🧱":"💊"} ${b.name} ${b.qty>1?`(có: ${b.qty})`:""}</option>`).join("")}
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
    `}function h(){var g,d,i,m;document.querySelectorAll("[data-mtab]").forEach(o=>{o.addEventListener("click",()=>{if(s.tab=o.dataset.mtab,s.tab==="mug"&&s.mugTargets.length===0){y();return}w()})}),(g=document.getElementById("btnShowList"))==null||g.addEventListener("click",()=>{s.showListForm=!s.showListForm,w()}),document.querySelectorAll("[data-filter]").forEach(o=>{o.addEventListener("click",async()=>{s.filter=o.dataset.filter,await u()})}),(d=document.getElementById("sortSelect"))==null||d.addEventListener("change",async o=>{s.sort=o.target.value,await u()}),(i=document.getElementById("searchInput"))==null||i.addEventListener("input",o=>{s.search=o.target.value,w();const b=document.getElementById("searchInput");b&&(b.focus(),b.setSelectionRange(s.search.length,s.search.length))}),(m=document.getElementById("btnConfirmList"))==null||m.addEventListener("click",async()=>{var S,I,q;const o=(S=document.getElementById("listItem"))==null?void 0:S.value;if(!o)return;const[b,x]=o.split("|"),C=parseInt((I=document.getElementById("listQty"))==null?void 0:I.value)||1,T=parseInt((q=document.getElementById("listPrice"))==null?void 0:q.value)||0;if(T<=0)return c("Giá phải lớn hơn 0!","error");try{const L=await l.listForSale(r,b,x,C,T);c(L.message,"success"),e.player=L.player,f(),s.showListForm=!1,await u()}catch(L){c(L.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(o=>{o.addEventListener("click",async()=>{const b=parseInt(o.dataset.buy),x=parseInt(o.dataset.qty),C=parseInt(o.dataset.price);let T=1;if(x>1){const S=prompt(`Mua bao nhiêu? (tối đa ${x}, giá ${C} 💎/cái)`,"1");if(!S)return;T=Math.min(parseInt(S)||1,x)}o.disabled=!0;try{const S=await l.buyFromMarket(r,b,T);c(S.message,"success"),e.player=S.player,f(),await u()}catch(S){c(S.message,"error"),o.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(o=>{o.addEventListener("click",async()=>{o.disabled=!0;try{const b=await l.cancelListing(r,parseInt(o.dataset.cancel));c(b.message,"success"),e.player=b.player,f(),await u()}catch(b){c(b.message,"error"),o.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(o=>{o.addEventListener("click",async()=>{const b=o.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){o.disabled=!0,o.textContent="⏳...";try{const x=await l.mugPlayer(r,b);c(x.message,x.success?"success":"error"),e.player=x.player,f(),await y()}catch(x){c(x.message,"error"),o.disabled=!1,o.textContent="💀 Phục Kích"}}})})}s.tab==="mug"?y():s.loaded?w():u()}function Dt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;let s=!1,u=null;async function y(){try{u=await l.getRealmInfo(r),s=!0,w()}catch(p){c(p.message||"Lỗi tải Cảnh Giới","error")}}function w(){if(!u)return;const p=u.current,v=u.allRealms||[],h=e.player,g=h.xpToNext>0?Math.floor(h.xp/h.xpToNext*100):0;n.innerHTML=`
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${p.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${p.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${p.color}">${p.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Cảnh Giới Bậc ${p.tier} · ${p.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${h.level} — ${h.xp}/${h.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${g}%;background:${p.color}"></div></div>
        </div>

        ${p.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(p.bonuses).filter(([,d])=>d>0).map(([d,i])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${i} ${d}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${p.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${p.unlocks.map(d=>`<span style="font-size:12px;opacity:0.7">✅ ${d}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${p.canBreakthrough?k(p):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${v.map(d=>{const i=d.tier===p.tier,m=d.tier<p.tier,b=d.tier>p.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${i?`2px solid ${d.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${b};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${d.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${d.color}">${d.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${d.levelMin}+</span>
                ${d.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${d.failChance}% thất bại</span>`:""}
                ${m?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${i?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,a()}function k(p){const v=p.nextRealm;if(!v)return"";const h=v.cost?`💎 ${v.cost.gold} + 🔮 ${v.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${v.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${v.name} ${v.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${h}</div>
          ${v.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${v.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(v.bonuses).filter(([,g])=>g>0).map(([g,d])=>`+${d} ${g}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${v.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function a(){var p;(p=document.getElementById("btnBreakthrough"))==null||p.addEventListener("click",()=>{ht(t)})}y()}function Vt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t;Ut(n,t)}async function Ut(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t;n.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const s=(await l.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,f()),s.length===0){n.innerHTML=`
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
            ${s.map(u=>{const y=new Date(u.created_at*1e3),w=y.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),k=y.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let a="📌";return a={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[u.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${w}</div>
                    <div>${k}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${a}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${u.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${u.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(r){n.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${r.message}</div></div>`}}function Ft(n,t){const{state:e,api:l,notify:c,updateSidebar:f,renderGame:r}=t,s=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const u=e._housing;async function y(){try{const v=await l.getHousing(s);u.data=v,u.loaded=!0,w()}catch(v){c(v.message||"Lỗi tải Động Phủ","error")}}function w(){const v=u.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${v.owned?a(v):k(v)}
    `,p()}function k(v){const h=v.tiers[1];return`
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
    `}function a(v){const h=v.gardenSlots||[],g=v.gardenHerbs||{};return`
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
            ${Array.from({length:v.maxSlots},(d,i)=>{const m=h[i]||{},o=!!m.herb,b=m.ready,x=m.remaining||0,C=Math.ceil(x/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${b?"var(--green)":o?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${o?`
                    <div style="font-size:20px">${b?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${m.herbName||m.herb}</div>
                    <div style="font-size:10px;color:${b?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${b?"✅ Sẵn sàng!":"⏳ "+C+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${i}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(g).map(([T,S])=>`<option value="${T}">${S.name}</option>`).join("")}
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
            ${Object.entries(v.formations).map(([d,i])=>{const m=i.currentLevel>=i.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${i.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${i.icon}</span>
                      <strong style="margin-left:4px">${i.name}</strong>
                      ${i.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${i.currentLevel}</span>`:""}
                    </div>
                    ${i.canBuild?m?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${d}">
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
    `}function p(){var v,h,g,d;(v=document.getElementById("btnBuyHouse"))==null||v.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const i=await l.buyHousing(s);c(i.message,"success"),e.player=i.player,f(),await y()}catch(i){c(i.message,"error")}}),(h=document.getElementById("btnUpgrade"))==null||h.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const i=await l.buyHousing(s);c(i.message,"success"),e.player=i.player,f(),await y()}catch(i){c(i.message,"error")}}),document.querySelectorAll(".plant-select").forEach(i=>{i.addEventListener("change",async m=>{const o=m.target.value;if(!o)return;const b=parseInt(i.dataset.slot);try{const x=await l.plantHerb(s,o,b);c(x.message,"success"),await y()}catch(x){c(x.message,"error")}})}),(g=document.getElementById("btnHarvest"))==null||g.addEventListener("click",async()=>{try{const i=await l.harvestGarden(s);c(i.message,"success"),e.player=i.player,f(),await y()}catch(i){c(i.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(i=>{i.addEventListener("click",async()=>{const m=i.dataset.fid;i.disabled=!0,i.textContent="⏳...";try{const o=await l.upgradeFormation(s,m);c(o.message,"success"),e.player=o.player,f(),await y()}catch(o){c(o.message,"error"),i.disabled=!1,i.textContent="⬆ Nâng"}})}),(d=document.getElementById("btnMaintenance"))==null||d.addEventListener("click",async()=>{try{const i=await l.payMaintenance(s);c(i.message,"success"),e.player=i.player,f(),await y()}catch(i){c(i.message,"error")}})}u.loaded?w():y()}function Qt(n,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function l(){n.innerHTML=`
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
          ${c(e._wikiTab)}
        </div>
      </div>
    `,n.querySelectorAll("[data-tab]").forEach(f=>{f.addEventListener("click",()=>{e._wikiTab=f.dataset.tab,l()})})}function c(f){return{lore:`
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
      `}[f]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}l()}function Jt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const s=e._npcShop;let u=parseInt(localStorage.getItem("npcShopIdx")||"0");async function y(){try{n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const a=await l.getShops(r);s.shops=a.shops||[],s.tax=a.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},s.loaded=!0,u>=s.shops.length&&(u=0),w()}catch(a){c(a.message||"Lỗi tải shop","error")}}function w(){var d;if(s.shops.length===0){n.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const a=s.shops[u]||s.shops[0],p=s.shops.map((i,m)=>`
      <button class="skill-tab ${m===u?"active":""}" data-shop-idx="${m}">
        ${i.icon||"🧓"} ${i.name}
      </button>
    `).join(""),v={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},h={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},g=(a.items||[]).map(i=>{var C,T;const m=v[i.rarity||"common"]||"#888",o=h[i.rarity||"common"]||"Phàm",b=(i.remainingStock??1)<=0,x=(((C=e.player)==null?void 0:C.gold)??0)>=(i.currentPrice||0);return`
        <div class="shop-item-card ${b?"out-of-stock":""}" style="border-left:3px solid ${m}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${m}">${i.name}</div>
              <div class="shop-item-rarity" style="color:${m}">${o} · Tầng ${i.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${b?"var(--red)":"var(--green)"}">
                ${b?"❌ Hết hàng":`📦 ${i.remainingStock}/${i.dailyStock}`}
              </span>
            </div>
          </div>
          ${i.description?`<div class="shop-item-desc">${i.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${x?"":"too-expensive"}">
              💎 ${((T=i.currentPrice)==null?void 0:T.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${a.id}" data-item="${i.id}" 
                value="1" min="1" max="${i.remainingStock||1}" 
                ${b?"disabled":""}>
              <button class="btn btn--sm ${b?"":x?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${a.id}" data-item="${i.id}"
                ${b||!x?"disabled":""}>
                ${b?"❌":x?"🛒 Mua":"💸 Thiếu"}
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
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${s.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(((d=e.player)==null?void 0:d.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${a.area||"Không rõ"}</div>
      </div>

      ${s.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${p}</div>`:""}

      <div class="shop-items-grid">
        ${g||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,k()}function k(){n.querySelectorAll(".skill-tab[data-shop-idx]").forEach(a=>{a.addEventListener("click",()=>{u=parseInt(a.dataset.shopIdx),localStorage.setItem("npcShopIdx",u),w()})}),n.querySelectorAll(".btn-buy").forEach(a=>{a.addEventListener("click",async()=>{const p=a.dataset.shop,v=a.dataset.item,h=n.querySelector(`.buy-qty[data-shop="${p}"][data-item="${v}"]`),g=parseInt((h==null?void 0:h.value)||1);a.disabled=!0,a.textContent="⏳...";try{const d=await l.buyFromShop(r,p,v,g);c(d.message,"success"),e.player=d.player,f(),await y()}catch(d){c(d.message,"error"),a.disabled=!1,a.textContent="🛒 Mua"}})})}s.loaded?w():y()}function Xt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const s=e._guild;async function u(){try{s.data=await l.getMyGuild(r),s.loaded=!0,w()}catch(v){c(v.message||"Lỗi","error")}}async function y(){try{const v=await l.listGuilds();s.allGuilds=v.guilds||[],w()}catch(v){c(v.message,"error")}}function w(){const v=s.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${v!=null&&v.inGuild?a(v):k(v)}
    `,p()}function k(v){return`
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
          ${s.allGuilds?s.allGuilds.map(h=>`
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
    `}function a(v){var i;const h=v.guild,g=v.members||[],d=v.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${h.tag}] ${h.name} <span style="opacity:0.3">Lv${h.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((i=h.levelInfo)==null?void 0:i.name)||""} · ${h.memberCount}/${h.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${h.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${h.dailyUpkeep}/ngày</span>
              ${h.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(h.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(h.buffs).map(([m,o])=>`${m} +${o}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${v.myRole==="leader"&&h.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${h.nextLevel.name}">⬆ ${h.nextLevel.upgradeCost} 💎</button>`:""}
            ${v.myRole==="leader"&&h.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            ${d.slice(0,10).map(m=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(m.created_at).toLocaleString("vi")}</span>
                ${m.detail||m.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${g.length}/${h.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${g.map(m=>`
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
    `}function p(){var v,h,g,d,i,m;(v=document.getElementById("btnCreate"))==null||v.addEventListener("click",async()=>{var C,T,S,I,q,L;const o=(T=(C=document.getElementById("guildName"))==null?void 0:C.value)==null?void 0:T.trim(),b=(I=(S=document.getElementById("guildTag"))==null?void 0:S.value)==null?void 0:I.trim(),x=(L=(q=document.getElementById("guildDesc"))==null?void 0:q.value)==null?void 0:L.trim();if(!o||!b)return c("Nhập tên và tag!","error");try{const P=await l.createGuild(r,o,b,x);c(P.message,"success"),e.player=P.player,f(),s.loaded=!1,await u()}catch(P){c(P.message,"error")}}),(h=document.getElementById("btnLoadGuilds"))==null||h.addEventListener("click",y),document.querySelectorAll(".btn-join").forEach(o=>{o.addEventListener("click",async()=>{try{const b=await l.joinGuild(r,parseInt(o.dataset.gid));c(b.message,"success"),s.loaded=!1,await u()}catch(b){c(b.message,"error")}})}),(g=document.getElementById("btnContribute"))==null||g.addEventListener("click",async()=>{var b;const o=parseInt(((b=document.getElementById("contributeAmt"))==null?void 0:b.value)||0);if(!(o<=0))try{const x=await l.contributeGuild(r,o);c(x.message,"success"),e.player=x.player,f(),await u()}catch(x){c(x.message,"error")}}),(d=document.getElementById("btnUpgradeGuild"))==null||d.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const o=await l.upgradeGuild(r);c(o.message,"success"),await u()}catch(o){c(o.message,"error")}}),(i=document.getElementById("btnPayUpkeep"))==null||i.addEventListener("click",async()=>{try{const o=await l.payGuildUpkeep(s.data.guild.id);c(o.message,"success"),await u()}catch(o){c(o.message,"error")}}),(m=document.getElementById("btnLeave"))==null||m.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const o=await l.leaveGuild(r);c(o.message,"success"),s.loaded=!1,await u()}catch(o){c(o.message,"error")}})}s.loaded?w():u()}function Wt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const s=e._profile;function u(){n.innerHTML=`
      <div class="page-header">
        <h2>🔍 Tìm Đạo Hữu</h2>
        <p class="page-sub">Tìm kiếm người chơi theo tên. Xem profile, tấn công hoặc kết bạn.</p>
      </div>

      <div class="panel" style="margin-bottom:12px">
        <div class="panel-body" style="padding:12px 16px;display:flex;gap:8px">
          <input type="text" id="searchInput" placeholder="Nhập tên người chơi..."
            value="${s.searchQuery}"
            style="flex:1;padding:8px 12px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
          <button class="btn btn--blue" id="btnSearch">🔍 Tìm</button>
        </div>
      </div>

      ${s.viewing?y(s.viewing):""}

      ${s.results.length>0&&!s.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${s.results.length})</div>
        <div class="panel-body no-pad">
          ${s.results.map(a=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" data-view="${a.id}">
              <div style="flex:1">
                <div style="font-weight:600">${a.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${a.level} · Realm T${a.realm_tier||"?"}</div>
              </div>
              <button class="btn btn--sm btn--dark btn-view" data-vid="${a.id}">👁 Xem</button>
            </div>
          `).join("")}
        </div>
      </div>
      `:!s.viewing&&s.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,w()}function y(a){var g,d,i;const p=a.id===r,v=a.maxHp>0?Math.round(a.currentHp/a.maxHp*100):100,h={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((g=a.name[0])==null?void 0:g.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${a.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${a.level} · ${((d=a.realmInfo)==null?void 0:d.fullName)||"Phàm Nhân"}
                ${a.guild?` · <span style="color:var(--blue)">[${a.guild.tag}] ${a.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${h[a.currentArea]||a.currentArea}
                ${a.housingTier>0?` · 🏠 T${a.housingTier}`:""}
                · 📜 ${a.skills} kỹ năng · ⚔ ${a.items} vật phẩm
              </div>
            </div>
          </div>

          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ Khí Huyết</span><span>${a.currentHp}/${a.maxHp}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${v}%;background:${v>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">💪 STR</div>
              <div style="font-weight:700;color:var(--red)">${a.stats.strength}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">⚡ SPD</div>
              <div style="font-weight:700;color:var(--blue)">${a.stats.speed}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🎯 DEX</div>
              <div style="font-weight:700;color:var(--orange)">${a.stats.dexterity}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🛡 DEF</div>
              <div style="font-weight:700;color:var(--green)">${a.stats.defense}</div>
            </div>
          </div>

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(i=a.gold)==null?void 0:i.toLocaleString()} 💎</strong></div>

          ${p?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${a.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${a.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function w(){var a,p,v,h,g;(a=document.getElementById("btnSearch"))==null||a.addEventListener("click",k),(p=document.getElementById("searchInput"))==null||p.addEventListener("keydown",d=>{d.key==="Enter"&&k()}),document.querySelectorAll(".btn-view, [data-view]").forEach(d=>{d.addEventListener("click",async()=>{const i=d.dataset.vid||d.dataset.view;try{const m=await l.getPlayerProfile(i);s.viewing=m.profile,u()}catch(m){c(m.message,"error")}})}),(v=document.getElementById("btnAttack"))==null||v.addEventListener("click",async()=>{const d=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${s.viewing.name}?`))try{const i=await l.mugPlayer(r,d);c(i.message,i.won?"success":"error"),i.player&&(e.player=i.player,f())}catch(i){c(i.message,"error")}}),(h=document.getElementById("btnAddFriend"))==null||h.addEventListener("click",async()=>{const d=document.getElementById("btnAddFriend").dataset.tid;try{const i=await l.addFriend(r,d);c(i.message||"Đã gửi lời mời!","success")}catch(i){c(i.message,"error")}}),(g=document.getElementById("btnBackSearch"))==null||g.addEventListener("click",()=>{s.viewing=null,u()})}async function k(){var v;const a=document.getElementById("searchInput"),p=(v=a==null?void 0:a.value)==null?void 0:v.trim();if(!p||p.length<2)return c("Nhập ít nhất 2 ký tự!","error");s.searchQuery=p,s.viewing=null;try{const h=await l.searchPlayers(p);s.results=h.players||[],u()}catch(h){c(h.message,"error")}}u()}function Yt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const s=e._arena;async function u(){try{s.data=await l.getArena(r),s.loaded=!0,y()}catch(k){c(k.message,"error")}}function y(){var d,i,m,o,b,x,C,T;const k=s.data,a=(k==null?void 0:k.arena)||{},p=a.rank||{},v=parseInt(a.streak)||0,h=v>=5?`🔥x${v}`:v>=3?`⚡x${v}`:v>0?`${v}W`:v<0?`${Math.abs(v)}L`:"",g=v>=5?"var(--gold)":v>=3?"var(--orange)":v>0?"var(--green)":v<0?"var(--red)":"var(--text-dim)";n.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid ${p.color||"#666"}">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px;text-shadow:0 0 12px ${p.color||"#666"}">${p.icon||"🛡️"}</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Rank</div>
            <div style="font-weight:800;font-size:18px;color:${p.color||"#fff"}">${p.name||"Chưa xếp hạng"}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px">
              ELO: <strong>${a.rating||1e3}</strong> · ${a.wins||0}W/${a.losses||0}L
              ${h?` · <span style="color:${g};font-weight:700">${h}</span>`:""}
            </div>
            ${p.nextThreshold?`
              <div style="margin-top:6px">
                <div style="font-size:10px;opacity:0.4">Tiến trình → ${p.nextThreshold} ELO</div>
                <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:3px;overflow:hidden">
                  <div style="background:${p.color||"#666"};height:100%;width:${p.progress||0}%;border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            `:'<div style="font-size:10px;opacity:0.4;margin-top:4px">🏆 Đỉnh cao! Thiên Đạo Đệ Nhất!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${(d=s.lastResult)!=null&&d.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(i=s.lastResult.newRank)==null?void 0:i.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(m=s.lastResult.newRank)==null?void 0:m.name}!</div>
      </div>
      `:""}

      <!-- LAST RESULT -->
      ${s.lastResult?`
      <div class="panel" style="margin-bottom:12px;border-left:3px solid ${s.lastResult.won?"var(--green)":"var(--red)"}">
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:700;color:${s.lastResult.won?"var(--green)":"var(--red)"}">
            ${s.lastResult.won?"🏆 CHIẾN THẮNG!":"💀 THẤT BẠI!"}
          </div>
          <div style="font-size:12px;margin-top:4px">
            Đối thủ: <strong>${(o=s.lastResult.opponent)==null?void 0:o.name}</strong> 
            ${(b=s.lastResult.opponent)!=null&&b.rank?s.lastResult.opponent.rank.icon:""} 
            (ELO ${(x=s.lastResult.opponent)==null?void 0:x.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${s.lastResult.ratingChange>0?"+":""}${s.lastResult.ratingChange}
            ${s.lastResult.goldEarned>0?` · +${s.lastResult.goldEarned} 💎`:""}
          </div>
          ${(C=s.lastResult.combatLog)!=null&&C.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${s.lastResult.combatLog.map(S=>`<div>${S}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(k.opponents||[]).length>0?(k.opponents||[]).map(S=>{var I,q,L;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((I=S.rank)==null?void 0:I.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${S.name} <span style="opacity:0.4;font-size:11px">Lv.${S.level}</span></div>
                <div style="font-size:11px;color:${((q=S.rank)==null?void 0:q.color)||"#888"}">${((L=S.rank)==null?void 0:L.name)||"Đồng"} · ELO ${S.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${S.player_id}" ${s.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${s.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${k.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(k.top10||[]).map((S,I)=>{var q,L;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${I<3?"var(--gold)":"var(--text-dim)"}">#${I+1}</span>
                <span>${((q=S.rank)==null?void 0:q.icon)||""}</span>
                <span style="flex:1">${S.name}</span>
                <span style="color:${((L=S.rank)==null?void 0:L.color)||"var(--blue)"}; font-weight:600">${S.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(k.history||[]).map(S=>{const I=S.winner_id===r;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${I?"var(--green)":"var(--red)"}">
                  ${I?"✅":"❌"} vs ${S.attacker_id===r?S.defender_name:S.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${S.rating_change>0?"+":""}${S.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll(".btn-fight-opp").forEach(S=>{S.addEventListener("click",I=>w(I.target.dataset.oid))}),(T=document.getElementById("btnRandomFight"))==null||T.addEventListener("click",()=>w(null))}async function w(k){s.fighting=!0,y();try{const a=await l.request(`/player/${r}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:k})});s.lastResult=a,e.player=a.player,f(),c(a.message,a.won?"success":"error"),s.fighting=!1,await u()}catch(a){c(a.message,"error"),s.fighting=!1,y()}}s.loaded?y():u()}function Zt(n,t){const{state:e,api:l,notify:c,updateSidebar:f}=t,r=e.playerId;async function s(){try{e._worldBoss=await l.getWorldBoss(),u()}catch(y){c(y.message,"error")}}function u(){var h;const y=e._worldBoss||{},w=y.boss||{},k=y.hpPercent||0,a=y.topContributors||[],p=y.rewards||{},v=w.status==="active"&&w.current_hp>0;n.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${v?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${w.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${w.level||"?"} · ${v?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(w.current_hp||0).toLocaleString()} / ${(w.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${k}%;background:${k>50?"var(--red)":k>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${v?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${p.gold||0} · ✨ ${p.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${a.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':a.map((g,d)=>{var i;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${d<3?"var(--gold)":"var(--text-dim)"}">#${d+1}</span>
                <span style="flex:1">${g.name}</span>
                <span style="color:var(--red)">${(i=g.total_damage)==null?void 0:i.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${g.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(h=document.getElementById("btnAttackBoss"))==null||h.addEventListener("click",async()=>{const g=document.getElementById("btnAttackBoss");g.disabled=!0,g.textContent="⏳ Đang giao chiến...";const d=document.getElementById("bossCombatResult");try{const i=await l.attackWorldBoss(r);if(e.player=i.player,f(),i.log&&i.log.length>0){const m=i.log.map(C=>C.startsWith("---")?`<div class="turn">${C}</div>`:C.includes("hụt")?`<div class="miss">${C}</div>`:C.includes("né được")?`<div class="dodge">${C}</div>`:C.includes("CHÍNH MẠNG")||C.includes("💥")?`<div class="crit">${C}</div>`:C.includes("🔥")?`<div class="heavy text-orange">${C}</div>`:C.includes("chặn hoàn toàn")||C.includes("🛡")?`<div class="dodge">${C}</div>`:C.includes("ngã xuống")||C.includes("💀")?`<div class="death">${C}</div>`:C.includes("Chiến thắng")||C.includes("🏆")?`<div class="victory">${C}</div>`:C.includes("bỏ chạy")||C.includes("🏃")?`<div class="flee">${C}</div>`:C.includes("Bất phân")||C.includes("🤝")?`<div class="stalemate">${C}</div>`:C.includes("🧪")?`<div class="status-effect text-purple">${C}</div>`:C.includes("💔")?`<div class="dot-damage text-purple bold">${C}</div>`:C.includes("✨")?`<div class="regen text-green">${C}</div>`:`<div class="hit">${C}</div>`).join(""),o={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},b=o[i.outcome]||o.loss,x=Math.max(0,e.player.currentHp/e.player.maxHp*100);d.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${b.icon} ${b.text}
                <span class="subtitle">${i.turns}/${i.maxTurns||25} lượt · ⚔️ ${i.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${b.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${x}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${w.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(i.bossHp/i.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${i.bossHp.toLocaleString()}/${i.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${m}</div>
            </div>`}i.defeated?c(i.message,"success"):c(`⚔️ ${i.damage} dmg!`,"info"),await s()}catch(i){c(i.message,"error"),g.disabled=!1,g.textContent="⚔️ Tấn Công"}})}s()}function te(n,t){const{state:e,api:l,notify:c,updateSidebar:f,renderGame:r}=t,s=e.playerId,u={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function y(){var k;try{const[a,p]=await Promise.all([l.getGachaPools(),l.getGachaPity(s)]);e._gacha={pools:a.pools||{},pity:p.pity||{},results:((k=e._gacha)==null?void 0:k.results)||[]},w()}catch(a){c(a.message,"error")}}function w(){const k=e._gacha||{},a=k.pools||{},p=k.pity||{},v=k.results||[];n.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(a).map(([h,g])=>{var i,m,o;const d=p[h]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${h==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${g.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${u.legendary}">★ ${(i=g.rates)==null?void 0:i.legendary}%</span> ·
                <span style="color:${u.rare}">◆ ${(m=g.rates)==null?void 0:m.rare}%</span> ·
                <span style="color:${u.uncommon}">● ${(o=g.rates)==null?void 0:o.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${d.pulls_since_rare||0}/${g.pityRare} · Legend: ${d.pulls_since_legendary||0}/${g.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${h}" data-pulls="1">💎 ${g.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${h}" data-pulls="10">💎 ${g.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${v.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${v.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${v.map(h=>{var g,d,i,m;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${u[h.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((g=h.item)==null?void 0:g.slot)==="weapon"?"⚔️":((d=h.item)==null?void 0:d.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${u[h.rarity]}">${((i=h.item)==null?void 0:i.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${h.rarity}] ${(((m=h.item)==null?void 0:m.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-pull").forEach(h=>h.addEventListener("click",async()=>{const g=h.dataset.pool,d=parseInt(h.dataset.pulls);h.disabled=!0,h.textContent="⏳...";try{const i=await l.gachaPull(e.playerId,g,d);c(i.message,"success"),e.player=i.player,f(),e._gacha.results=i.results||[],e._gacha.pity[g]=i.pity,w()}catch(i){c(i.message,"error"),h.disabled=!1}}))}y()}function ee(n,t){const{state:e,api:l,notify:c}=t;e._lbTab||(e._lbTab="level");async function f(){const s=e._lbTab||"level";n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const u=await l.getLeaderboard(s);e._lbData=u,r()}catch(u){n.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${u.message}
      </div></div>`}}function r(){const s=e._lbTab||"level",y=(e._lbData||{}).rankings||[],k=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(p=>`
      <button class="skill-tab ${s===p.id?"active":""}" data-tab="${p.id}">
        ${p.icon} ${p.name}
      </button>
    `).join("");let a="";y.length===0?a='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':s==="guild"?a=y.map((p,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${p.tag}] ${p.name}</div>
            <div class="lb-sub">👤 ${p.members}/${p.max_members} · Leader: ${p.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(p.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${p.level}</div>
          </div>
        </div>
      `).join(""):s==="pvp"?a=y.map((p,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${p.name}</div>
            <div class="lb-sub">Lv.${p.level} · ${p.wins||0}W/${p.losses||0}L${p.streak>0?` · 🔥${p.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${p.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):a=y.map((p,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${p.name}</div>
            <div class="lb-sub">${p.realm_tier?`Cảnh giới ${p.realm_tier}`:""} ${s==="level"?`· Lv.${p.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${s==="gold"?`💎 ${parseInt(p.gold||0).toLocaleString()}`:`Lv.${p.level}`}
            </div>
          </div>
        </div>
      `).join(""),n.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${k}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${a}
        </div>
      </div>
    `,n.querySelectorAll(".skill-tab[data-tab]").forEach(p=>{p.addEventListener("click",()=>{e._lbTab=p.dataset.tab,f()})})}f()}const M={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},Ct=document.getElementById("app"),rt={get state(){return M},api:j,notify:X,renderGame:J,updateSidebar:oe};async function ne(){const n=localStorage.getItem("isLoggedOut")==="true",t=localStorage.getItem("playerId");if(!n&&t&&!M.playerId)try{const e=await j.getPlayer(t);M.playerId=t,M.player=e.player,await nt(),J();return}catch{localStorage.removeItem("playerId")}if(!n&&!M.playerId)try{const e=await j.login("admin","admin");M.playerId=e.id,M.player=e.player,localStorage.setItem("playerId",e.id),await nt(),J();return}catch(e){console.warn("Dev auto-login failed. Fallback to intro UI.",e)}M.playerId?J():dt()}function dt(){var t,e;const n=M.authTab||"login";Ct.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(l=>{l.addEventListener("click",()=>{M.authTab=l.dataset.auth,dt()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const l=document.getElementById("inpUsername").value.trim(),c=document.getElementById("inpPassword").value;if(!l||!c)return X("Vui lòng nhập đầy đủ","error");try{const f=await j.login(l,c);M.playerId=f.id,M.player=f.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",f.id),X(f.message,"success"),await nt(),J()}catch(f){X(f.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var s,u;const l=document.getElementById("inpUsername").value.trim(),c=document.getElementById("inpPassword").value,f=((s=document.getElementById("inpName"))==null?void 0:s.value.trim())||"Vô Danh",r=((u=document.querySelector('input[name="gender"]:checked'))==null?void 0:u.value)||"male";if(!l||!c)return X("Vui lòng nhập đầy đủ","error");try{const y=await j.register(l,c,f,r);M.playerId=y.id,M.player=y.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",y.id),X(y.message,"success"),await nt(),J()}catch(y){X(y.message||"Đăng ký thất bại!","error")}})}function St(n){const t=Math.floor(Date.now()/1e3),e=[];return n.hospitalUntil&&n.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:n.hospitalUntil,color:"var(--red)"}),n.medCooldownUntil&&n.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:n.medCooldownUntil,color:"var(--orange)"}),n.travelArrivesAt&&n.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:n.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(l=>{const c=Math.max(0,l.endTime-t),f=Math.floor(c/60),r=c%60,s=f>0?`${f}p${String(r).padStart(2,"0")}s`:`${r}s`;return`<span class="status-icon" data-end="${l.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${l.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${l.color};white-space:nowrap;
      " title="${l.label}">${l.icon} <span class="cd-time">${s}</span></span>`}).join("")}
  </div>`}let et=null;function ae(){et&&clearInterval(et),et=setInterval(()=>{const n=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),l=Math.max(0,e-n);if(l<=0){t.remove();return}const c=Math.floor(l/60),f=l%60,r=t.querySelector(".cd-time");r&&(r.textContent=c>0?`${c}p${String(f).padStart(2,"0")}s`:`${f}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function Et(n){let t="";const l={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"},cuu_u_than_uyen:{icon:"👿",tooltip:"Cửu U Ma Khí: Tăng 35% Sát Thương, 20% Tốc Độ"},thai_co_hong_hoang:{icon:"🦕",tooltip:"Hồng Hoang Cổ Khí: Tăng 25% Máu, 20% Giáp"},chu_thien_tinh_hai:{icon:"🌌",tooltip:"Tinh Tú Luân Chuyển: Tăng 30% Tốc Độ, 25% Nhanh Nhẹn"},hon_don_tien_vuc:{icon:"🔮",tooltip:"Hỗn Độn Tiên Khí: Tăng 35% Toàn Bộ Thuộc Tính"},hon_nguyen_dao_canh:{icon:"👑",tooltip:"Hỗn Nguyên Đạo Vực: Tăng 60% Sát Thương, 50% Toàn Thuộc Tính"}}[n.currentArea];return l&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${l.tooltip}">${l.icon} Cảnh Vực</span>`),n.combatBuffs&&n.combatBuffs.length>0&&n.combatBuffs.forEach(c=>{let f="💊",r="Buff";c.type==="status"&&c.stat==="poison"?(f="☠️",r="Trúng Độc"):c.type==="status"&&c.stat==="confuse"?(f="👹",r="Ma Hóa"):c.stat==="allStats"||c.stat==="hp"||c.stat==="damage"?(f="🔥",r="Cuồng Nộ"):c.stat==="defense"||c.stat==="resist"?(f="🛡️",r="Kiên Cố"):c.stat==="speed"||c.stat==="dexterity"?(f="💨",r="Thân Pháp"):(f="✨",r="Cường Hóa");let s=c.duration?` (-${c.duration} Trận)`:"",u=`Hiệu ứng: ${c.stat} (${c.type} ${c.value})${c.duration?` - Còn lại: ${c.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${u}">${f} ${r}${s}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function J(){var m,o,b,x,C,T,S,I,q,L,P;const n=M.player,t=((m=n.stats)==null?void 0:m.maxHp)??n.maxHp??100,e=Math.min(t,n.currentHp),l=t>0?Math.min(100,Math.max(0,e/t*100)):0,c=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,f=((o=n.stats)==null?void 0:o.maxEnergy)??n.maxEnergy??50,r=n.usableEnergy??Math.max(0,f-(n.reservedEnergy??0)),s=n.reservationPct??0,u=r>0?Math.min(100,Math.max(0,n.currentEnergy/r*100)):0,y=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0,w=M.exploration?M.exploration[n.currentArea||"thanh_lam_tran"]:null,k=w?w.name:"Khám Phá",a=M._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");M._collapsedNav=a;const v={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[M.currentPage];v&&(a[v]=!1),Ct.innerHTML=`
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
          <div class="player-meta">Lv.${n.level} · ${((b=n.realmInfo)==null?void 0:b.fullName)||"?"}</div>
          ${St(n)}
          ${Et(n)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${e}/${t}
                ${e<t?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(x=n.skills)!=null&&x.some(H=>H.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${l}%" data-low="${l<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực (Thế Giới)</span>
              <span>
                ${n.currentStamina??100}/${n.maxStamina??100}
                ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((C=n.stats)==null?void 0:C.staminaRegen)??2}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${c}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔵 Linh Lực (Thực Chiến)</span>
              <span>
                ${n.currentEnergy}/${r}
                ${s>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${s}% bởi Tâm Pháp Hào Quang">(Khóa ${s}%)</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${u}%"></div></div>
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
            <button class="btn btn--dark nav-item ${M.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(n.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
            </button>
            <button class="btn btn--dark nav-item ${M.currentPage==="wiki"?"active":""}" data-page="wiki" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Bách Khoa">
              📖
            </button>
            <button class="btn btn--dark nav-item ${M.currentPage==="leaderboard"?"active":""}" data-page="leaderboard" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Xếp Hạng">
              🏆
            </button>
            <button class="btn btn--dark nav-item ${M.currentPage==="social"?"active":""}" data-page="social" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Xã Hội">
              💬
            </button>
            <button class="btn btn--dark btn-open-settings" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Cài Đặt Hệ Thống">
              ⚙️
            </button>
          </div>
          <div style="font-size:10px;color:var(--text-dim);text-align:center;padding-bottom:6px;border-bottom:1px solid var(--border)">
            📍 ${k} ${n.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':n.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(n.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <!-- PHÂN HỆ 1: KHÁM PHÁ & HÀNH TRÌNH (Trọng Tâm Gameplay) -->
          <li class="nav-section ${a.hanhtrinh?"collapsed":""}" data-section="hanhtrinh">
            <span>⚔️ KHÁM PHÁ & HÀNH TRÌNH</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${a.hanhtrinh?"collapsed":""}" id="sec-hanhtrinh">
            <li class="nav-item nav-item--hero ${M.currentPage==="combat"?"active":""}" data-page="combat">
              <span class="icon">🔍</span> Khám Phá (${k})
              <span class="badge" style="background: linear-gradient(135deg, #e8a43a, #f0c030); color: #1a1a2e; font-weight: 800; font-size: 9px; padding: 2px 6px;">CHÍNH</span>
            </li>
            <li class="nav-item ${["travel","dungeon","tiencanh"].includes(M.currentPage)?"active":""}" data-page="travel">
              <span class="icon">🗺️</span> Ngao Du Bát Hoang
              ${(n.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(M.currentPage)?"active":""}" data-page="quests">
              <span class="icon">📜</span> Thiên Cơ Nhiệm Vụ
              ${(n.activeQuests||[]).filter(H=>H.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(n.activeQuests||[]).filter(H=>H.status==="active").length}</span>`:""}
            </li>
          </div>

          <!-- PHÂN HỆ 2: TU CHÂN (Tự Thân & Tu Luyện) -->
          <li class="nav-section ${a.tuchan?"collapsed":""}" data-section="tuchan">
            <span>TU CHÂN</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${a.tuchan?"collapsed":""}" id="sec-tuchan">
            <li class="nav-item ${M.currentPage==="stats"?"active":""}" data-page="stats">
              <span class="icon">🧘</span> Tu Luyện & Cảnh Giới
              ${(S=(T=M.player)==null?void 0:T.realmInfo)!=null&&S.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite" title="Có thể đột phá!">!</span>':""}
            </li>
            <li class="nav-item ${["skills","education","library","glitch"].includes(M.currentPage)?"active":""}" data-page="skills">
              <span class="icon">⚡</span> Kỹ Năng & Lĩnh Ngộ
              ${(n.glitchInsight||0)>0?`<span class="badge" style="background: #a855f7;" title="Điểm Thấu Triệt">${n.glitchInsight}</span>`:""}
            </li>
            <li class="nav-item ${M.currentPage==="inventory"?"active":""}" data-page="inventory">
              <span class="icon">🎒</span> Càn Khôn Túi
              ${(n.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)" title="Đan độc">⏳</span>':""}
            </li>
          </div>

          <!-- PHÂN HỆ 3: TRANH ĐẤU (Chiến Đấu & Thử Thách) -->
          <li class="nav-section ${a.tranhdau?"collapsed":""}" data-section="tranhdau">
            <span>TRANH ĐẤU</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${a.tranhdau?"collapsed":""}" id="sec-tranhdau">
            <li class="nav-item ${M.currentPage==="arena"?"active":""}" data-page="arena">
              <span class="icon">⚔️</span> Luận Đạo Đấu Trường
            </li>
            <li class="nav-item ${M.currentPage==="tower"?"active":""}" data-page="tower">
              <span class="icon">🗼</span> Thiên Phần Tháp
            </li>
            <li class="nav-item ${M.currentPage==="worldboss"?"active":""}" data-page="worldboss">
              <span class="icon">🐉</span> Ma Thú Xâm Lăng
              <span class="badge" style="background:var(--red); font-size:9px">Boss</span>
            </li>
          </div>

          <!-- PHÂN HỆ 4: TIÊN PHỦ (Phương Ngoại & Thế Giới) -->
          <li class="nav-section ${a.tienphu?"collapsed":""}" data-section="tienphu">
            <span>TIÊN PHỦ</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${a.tienphu?"collapsed":""}" id="sec-tienphu">
            <li class="nav-item ${M.currentPage==="housing"?"active":""}" data-page="housing">
              <span class="icon">🏠</span> Động Phủ Tu Tiên
            </li>
            <li class="nav-item ${M.currentPage==="guild"?"active":""}" data-page="guild">
              <span class="icon">🏯</span> Tông Môn Bang Hội
            </li>
            <li class="nav-item ${M.currentPage==="alchemy"?"active":""}" data-page="alchemy">
              <span class="icon">⚒️</span> Luyện Đan & Đúc Khí
            </li>
          </div>

          <!-- PHÂN HỆ 5: THƯƠNG HỘI (Kinh Tế & Vận May) -->
          <li class="nav-section ${a.thuonghoi?"collapsed":""}" data-section="thuonghoi">
            <span>THƯƠNG HỘI</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${a.thuonghoi?"collapsed":""}" id="sec-thuonghoi">
            <li class="nav-item ${["market","auction"].includes(M.currentPage)?"active":""}" data-page="market">
              <span class="icon">🏪</span> Phường Thị & Đấu Giá
            </li>
            <li class="nav-item ${M.currentPage==="npcshop"?"active":""}" data-page="npcshop">
              <span class="icon">🧓</span> Tiên Các Thương Nhân
            </li>
            <li class="nav-item ${M.currentPage==="gacha"?"active":""}" data-page="gacha">
              <span class="icon">🎰</span> Thiên Cơ Đài (Tầm Bảo)
            </li>
          </div>

          ${n.role==="admin"?`
          <!-- PHÂN HỆ 6: VÔ THƯỢNG (Admin) -->
          <li class="nav-section ${a.vothuong?"collapsed":""}" data-section="vothuong">
            <span>VÔ THƯỢNG</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${a.vothuong?"collapsed":""}" id="sec-vothuong">
            <li class="nav-item ${M.currentPage==="admin"?"active":""}" data-page="admin">
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
      <div class="floating-popup-container" id="popupContainer" style="${M.popupOpen?"display:flex;":"display:none;"}">
        <div class="popup-header">
          <div class="popup-tabs">
            <button class="popup-tab ${M.popupPage==="chat"?"active":""}" data-popup="chat">💬 Truyền Âm</button>
            <button class="popup-tab ${M.popupPage==="social"?"active":""}" data-popup="social">🤝 Đạo Hữu</button>
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(H=>{H.addEventListener("click",()=>{M.currentPage=H.dataset.page,J()})}),document.querySelectorAll(".nav-section[data-section]").forEach(H=>{H.addEventListener("click",()=>{const $=H.dataset.section;M._collapsedNav=M._collapsedNav||{},M._collapsedNav[$]=!M._collapsedNav[$],localStorage.setItem("collapsedNav",JSON.stringify(M._collapsedNav));const N=document.getElementById(`sec-${$}`);N&&(N.classList.toggle("collapsed",M._collapsedNav[$]),H.classList.toggle("collapsed",M._collapsedNav[$]))})}),(I=document.getElementById("btnFabChat"))==null||I.addEventListener("click",()=>it("chat")),(q=document.getElementById("btnFabSocial"))==null||q.addEventListener("click",()=>it("social"));const h=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');h&&h.addEventListener("click",H=>{H.stopPropagation(),M.currentPage="events",M.popupOpen=!1,J()}),(L=document.getElementById("btnPopupClose"))==null||L.addEventListener("click",()=>{M.popupOpen=!1,J()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(H=>{H.addEventListener("click",()=>it(H.dataset.popup))}),document.querySelectorAll(".btn-open-settings").forEach(H=>{H.addEventListener("click",$=>{$.stopPropagation(),de(n)})}),(P=document.getElementById("btnSidebarLogout"))==null||P.addEventListener("click",H=>{H.stopPropagation(),Ht()}),re(),M.popupOpen&&ie();const g=document.getElementById("searchPlayerInput"),d=document.getElementById("searchResults");let i=null;g&&d&&(g.addEventListener("input",()=>{clearTimeout(i);const H=g.value.trim();if(H.length<2){d.style.display="none";return}i=setTimeout(async()=>{try{const $=await j.searchPlayers(H),N=$.players||$.results||[];N.length===0?d.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':d.innerHTML=N.map(E=>{var z;return`
              <div class="search-result" data-pid="${E.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${E.name} <span style="opacity:0.4">Lv.${E.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((z=E.realmInfo)==null?void 0:z.name)||""}</span>
              </div>
            `}).join(""),d.style.display="block",d.querySelectorAll(".search-result").forEach(E=>{E.addEventListener("click",()=>{M.currentPage="profile",M._viewProfileId=E.dataset.pid,d.style.display="none",g.value="",J()}),E.addEventListener("mouseenter",()=>E.style.background="rgba(255,255,255,0.08)"),E.addEventListener("mouseleave",()=>E.style.background="transparent")})}catch{d.style.display="none"}},300)}),g.addEventListener("blur",()=>{setTimeout(()=>{d.style.display="none"},200)}),g.addEventListener("keydown",H=>{H.key==="Escape"&&(d.style.display="none",g.blur())})),ae()}function it(n){M.popupOpen=!0,M.popupPage=n,J()}function ie(){const n=document.getElementById("popupContent");n&&(M.popupPage==="chat"?wt(n,rt):M.popupPage==="social"&&kt(n,rt))}const se={combat:Nt,education:at,stats:Bt,skills:at,inventory:st,travel:ft,alchemy:W,quests:Tt,admin:Kt,social:kt,chat:wt,market:jt,realm:Dt,events:Vt,dungeon:yt,housing:Ft,wiki:Qt,npcshop:Jt,guild:Xt,library:ot,profile:Wt,arena:Yt,auction:Lt,dailyquest:$t,worldboss:Zt,gacha:te,leaderboard:ee,tiencanh:xt,glitch:(n,t)=>{localStorage.setItem("skillsTab","glitch"),at(n,t)}};function re(){const n=document.getElementById("pageContent");if(!n)return;const t=se[M.currentPage];t&&t(n,rt)}function oe(){var w,k,a,p,v,h;const n=M.player;if(!n)return;const t=((w=n.stats)==null?void 0:w.maxHp)??n.maxHp??100,e=Math.min(t,n.currentHp),l=t>0?Math.min(100,Math.max(0,e/t*100)):0,c=((k=n.stats)==null?void 0:k.maxEnergy)??n.maxEnergy??50,f=n.usableEnergy??Math.max(0,c-(n.reservedEnergy??0)),r=n.reservationPct??0,s=f>0?Math.min(100,Math.max(0,n.currentEnergy/f*100)):0,u=document.querySelector(".sidebar-player");if(u){const g=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,d=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0;u.innerHTML=`
      <div class="player-name">${n.name}</div>
      <div class="player-meta">Lv.${n.level} · ${((a=n.realmInfo)==null?void 0:a.fullName)||"?"}</div>
      ${St(n)}
      ${Et(n)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${e}/${t}
            ${e<t?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(p=n.skills)!=null&&p.some(i=>i.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${l}%" data-low="${l<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực (Thế Giới)</span>
          <span>
            ${n.currentStamina??100}/${n.maxStamina??100}
            ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((v=n.stats)==null?void 0:v.staminaRegen)??2}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${g}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔵 Linh Lực (Thực Chiến)</span>
          <span>
            ${n.currentEnergy}/${f}
            ${r>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${r}% bởi Tâm Pháp Hào Quang">(Khóa ${r}%)</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${s}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>✨ Tu Vi (Cấp ${n.level})</span>
          <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${d.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${d}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${n.gold??0} Linh Thạch</div>`}const y=document.querySelector('.nav-item[data-page="stats"]');if(y){let g="";n.statPoints>0&&(g+=`<span class="badge">${n.statPoints}</span>`),(h=n.realmInfo)!=null&&h.canBreakthrough&&(g+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),y.querySelectorAll(".badge").forEach(d=>d.remove()),y.insertAdjacentHTML("beforeend",g)}}async function nt(){try{const[n,t,e,l,c]=await Promise.all([j.getMonsters(),j.getSkills(),j.getItems(),j.getMedicines(),j.getEducation()]);M.monsters=n.monsters||[],M.skills=t.skills||[],M.items=e.items||[],M.medicines=l.medicines||[],M.educationTrees=c.trees||[],M.exploration=await j.getExploration(),M.recipes=(await j.getRecipes()).recipes,M.npcs=(await j.getNpcs()).npcs||[]}catch(n){console.error("Lỗi tải dữ liệu:",n)}}function X(n,t="info"){var l;(l=document.querySelector(".notification"))==null||l.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=n,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}function Ht(){confirm("Đạo hữu có chắc chắn muốn đăng xuất tài khoản?")&&(et&&clearInterval(et),localStorage.removeItem("playerId"),localStorage.setItem("isLoggedOut","true"),M.playerId=null,M.player=null,M.popupOpen=!1,X("Đã đăng xuất tài khoản thành công.","info"),dt())}function de(n){var s,u,y,w,k,a;let t=document.getElementById("settings-modal-overlay");t&&t.remove(),t=document.createElement("div"),t.id="settings-modal-overlay",t.style.cssText=`
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    padding: 16px; animation: fadeIn 0.2s ease;
  `;const e=localStorage.getItem("rpg_sound_enabled")!=="false",l=localStorage.getItem("rpg_shake_enabled")!=="false",c=localStorage.getItem("rpg_toast_enabled")!=="false";t.innerHTML=`
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
            <div><span style="color: var(--text-dim);">Cảnh giới:</span> <strong style="color: var(--gold);">${((s=n.realmInfo)==null?void 0:s.fullName)||"Phàm Nhân"}</strong></div>
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
              <input type="checkbox" id="chkSettingShake" ${l?"checked":""} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--gold);" />
            </label>
            <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none;">
              <span>🔔 Bật thông báo nổi (Toasts)</span>
              <input type="checkbox" id="chkSettingToast" ${c?"checked":""} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--gold);" />
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
  `,document.body.appendChild(t);const f=()=>t.remove();(u=t.querySelector("#btnCloseSettingsModal"))==null||u.addEventListener("click",f),t.addEventListener("click",p=>{p.target===t&&f()});const r=p=>{p.key==="Escape"&&(f(),window.removeEventListener("keydown",r))};window.addEventListener("keydown",r),(y=t.querySelector("#chkSettingSound"))==null||y.addEventListener("change",p=>{localStorage.setItem("rpg_sound_enabled",p.target.checked),X(p.target.checked?"Đã bật hiệu ứng âm thanh":"Đã tắt hiệu ứng âm thanh","info")}),(w=t.querySelector("#chkSettingShake"))==null||w.addEventListener("change",p=>{localStorage.setItem("rpg_shake_enabled",p.target.checked),X(p.target.checked?"Đã bật rung màn hình":"Đã tắt rung màn hình","info")}),(k=t.querySelector("#chkSettingToast"))==null||k.addEventListener("change",p=>{localStorage.setItem("rpg_toast_enabled",p.target.checked)}),(a=t.querySelector("#btnModalLogout"))==null||a.addEventListener("click",()=>{f(),Ht()})}ne();
//# sourceMappingURL=index-SXf3h31N.js.map
