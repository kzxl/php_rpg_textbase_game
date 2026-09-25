(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const $ of c)if($.type==="childList")for(const d of $.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function e(c){const $={};return c.integrity&&($.integrity=c.integrity),c.referrerPolicy&&($.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?$.credentials="include":c.crossOrigin==="anonymous"?$.credentials="omit":$.credentials="same-origin",$}function l(c){if(c.ep)return;c.ep=!0;const $=e(c);fetch(c.href,$)}})();const Mt="/api";class It{async request(t,e={}){try{const l=await fetch(`${Mt}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),c=await l.json();if(!l.ok)throw new Error(c.error||`HTTP ${l.status}`);return c}catch(l){throw console.error(`API Error [${t}]:`,l),l}}register(t,e,l,c){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:l,gender:c})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,l=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:l})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,l=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:l})})}toggleAura(t,e){return this.request(`/player/${t}/skills/toggle-aura`,{method:"POST",body:JSON.stringify({auraId:e})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,l=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:l})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCraftingMastery(t){return this.request(`/player/${t}/crafting-mastery`)}getMonsterMastery(t){return this.request(`/player/${t}/monster-mastery`)}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,l,c=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:l,lockAffixIndex:c})})}enrollNode(t,e,l){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:l})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,l){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:l})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,l,c){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:l,amount:c})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,l=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${l}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,l,c){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:l,message:c})})}getMarketListings(t="",e="newest"){const l=new URLSearchParams;return t&&l.set("type",t),e&&l.set("sort",e),this.request(`/market?${l.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,l,c,$){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:l,quantity:c,price:$})})}buyFromMarket(t,e,l=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:l})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}getTribulationPreview(t){return this.request(`/player/${t}/tribulation-preview`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}enterDiscoveredDungeon(t,e){return this.request(`/player/${t}/dungeon/enter-discovered`,{method:"POST",body:JSON.stringify({discoveredId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,l){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:l})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,l,c){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:l,description:c})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,l,c=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:l,lockAffixIndex:c})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,l,c=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:l,quantity:c})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,l,c=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:l,durationHours:c})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,l=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:l})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const D=new It;function Nt(a,t){var E,P,I,O,q;const{state:e,api:l,notify:c,renderGame:$,updateSidebar:d}=t,r=e.player,g=e.exploration?e.exploration[r.currentArea||"thanh_lam_tran"]:null,f=g?g.name:"Vùng Đất Vô Danh",T=g&&(g.staminaCost||g.stamina_cost)||10,y=(g==null?void 0:g.rates)||[],i=((E=y.find(L=>L.type==="herb"))==null?void 0:E.weight)||0,u=((P=y.find(L=>L.type==="mineral"))==null?void 0:P.weight)||0,v=((I=y.find(L=>L.type==="monster"))==null?void 0:I.weight)||0,h=(g==null?void 0:g.specialtyNames)||[];a.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${f}</h1>
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
          <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">🌿 Thảo Dược: ~${i}%</span>
          <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.3);">⛏️ Mạch Khoáng: ~${u}%</span>
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
    </div>`;const p=((O=r.insightLevels)==null?void 0:O.monster)??0,o=async()=>{try{const L=await l.getAreaMonsters(r.id);if(L.monsters){e.player.trackedMonsters=L.monsters;const M=document.getElementById("trackedMonstersList");if(!M)return;if(L.monsters.length===0){M.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}M.innerHTML=L.monsters.map(S=>{const B=S.currentHp/S.stats.hp*100,R=B>60?"var(--green)":B>30?"var(--orange)":"var(--red)";let K='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';p>=1&&(K=`<div class="item-desc text-sm text-dim mb-sm">${S.description||"Yêu thú vùng này."}</div>`);let z="";p>=1&&(z=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${B}%; background: ${R}; height: 100%;"></div>
            </div>`);let N=p>=2?`❤ ${S.currentHp}/${S.stats.hp}`:p>=1?"❤ ???":"";return`
            <div class="monster-card ${S.is_boss?"boss":""}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${S.icon||"👾"}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${S.is_boss?"var(--red)":"var(--text-bright)"}; font-size: 15px;">${S.name}</span>
                    <span class="badge ${S.is_boss?"bg-red":"bg-darker"}">Cấp ${S.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${R};">${N}</div>
                </div>
                ${z}
                ${K}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${S.instance_id}" data-monster-id="${S.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),M.querySelectorAll(".btnTrackedCombat").forEach(S=>{S.addEventListener("click",B=>{const R=B.currentTarget.dataset.monsterId,K=B.currentTarget.dataset.instanceId;gt(t,R,K)})})}}catch(L){console.error(L)}},s=async()=>{try{const L=await l.getAreaMonsterTemplates(r.currentArea||"thanh_lam_tran");if(L.monsters){const M=document.getElementById("areaMonstersList");if(!M)return;if(L.monsters.length===0){M.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}M.innerHTML=L.monsters.map(S=>`
            <div style="display: flex; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div style="font-size: 24px; width: 36px; text-align: center;">${S.icon||"👾"}</div>
              <div style="flex: 1;">
                <div class="flex items-center gap-2">
                  <span class="bold" style="color: ${S.isBoss?"var(--red)":"var(--text-bright)"}; font-size: 13px;">${S.name}</span>
                  <span class="badge ${S.isBoss?"bg-red":"bg-darker"} text-xs">Cấp ${S.level}</span>
                </div>
                <div class="text-xs text-dim">${S.description||"Yêu thú sinh sống tại khu vực này."}</div>
              </div>
            </div>
          `).join("")}}catch(L){console.error(L)}};o(),s(),(q=document.getElementById("btnExplore"))==null||q.addEventListener("click",()=>pt(t));let b=!1;const n=document.getElementById("btnAutoBattle"),m=document.getElementById("btnStopAuto"),x=document.getElementById("panelKhamPha"),k=document.querySelector(".toggle-auto-combat"),w=document.getElementById("autoCombatStatus");n&&n.addEventListener("click",()=>{b=!0,x.style.display="none",k.style.display="block",C()}),m&&m.addEventListener("click",()=>{b=!1,x.style.display="block",k.style.display="none"});async function C(){var B,R,K,z,N,_,V,F,U,Q;let L=0,M=0,S=0;for(;b;){w.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${L} trận | +${M} XP | +${S} Linh Thạch</div>
        `;const j=e.player;if((j.currentStamina||0)<T){w.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",b=!1;break}if(j.currentHp/j.maxHp<.2){w.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",b=!1;break}try{const A=await l.explore(e.playerId);if(e.player=A.player,d(),A.event&&(A.event.type==="monster"||A.event.type==="worldBoss")){if(w.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${A.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(Pt=>setTimeout(Pt,600)),!b)break;const G=await l.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:A.event.monsterId})});if(e.player=G.player,d(),G.outcome==="win")L++,M+=((B=G.rewards)==null?void 0:B.xp)||0,S+=((R=G.rewards)==null?void 0:R.gold)||0,w.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(K=G.monster)==null?void 0:K.name}! (+${((z=G.rewards)==null?void 0:z.xp)||0} XP, +${((N=G.rewards)==null?void 0:N.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${L} | Tiếp tục sau 1s...</div>
                   `;else{w.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${G.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,b=!1;break}}else if(A.event&&A.event.type==="monster_ambush"&&A.event.combatResult){const G=A.event.combatResult;if(G.outcome==="win")L++,M+=((_=G.rewards)==null?void 0:_.xp)||0,S+=((V=G.rewards)==null?void 0:V.gold)||0,w.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(F=G.monster)==null?void 0:F.name}! (+${((U=G.rewards)==null?void 0:U.xp)||0} XP)</div>`;else{w.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",b=!1;break}}else w.innerHTML=`<div class='text-blue'>${((Q=A.event)==null?void 0:Q.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(A){w.innerHTML=`<div class='text-red'>Lỗi: ${A.message}. Dừng tự động.</div>`,b=!1;break}await new Promise(A=>setTimeout(A,1200))}}}async function pt(a){var r,g,f,T;const{state:t,api:e,notify:l,updateSidebar:c}=a,$=document.getElementById("exploreResult");if(!$)return;const d=document.getElementById("btnExplore");d&&(d.disabled=!0,d.style.opacity="0.6"),$.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const y=await e.explore(t.playerId);t.player=y.player,c();const i=y.event,u=y.cost||10,v=y.player.currentStamina??0,h=y.player.maxStamina??100,p=v>=u;let o=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
          <div style="margin-bottom: 10px;">
            <span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px;">
              🏃 -${u} Thể Lực (Hiện có: ${v}/${h})
            </span>
          </div>
    `;if(i.type==="monster")o+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${i.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${i.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${i.monsterId}">👣 Theo Dõi</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(i.type==="monster_ambush"&&i.combatResult){const s=i.combatResult,b=ut(s.log||[]),n=s.outcome==="win"?"🏆 Chiến thắng!":s.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",m=s.outcome==="win"?"var(--green)":s.outcome==="loss"?"var(--red)":"var(--orange)";o+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${i.message}</div>
        <div style="font-size:16px;font-weight:700;color:${m};margin-bottom:12px">${n}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${b}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>🔍 Dò Thám Tiếp (-${u} TL)</button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(i.type==="worldBoss")o+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${i.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${i.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${i.monsterId}">👣 Ghi Dấu</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(i.type==="npc"&&i.npcId)o+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${i.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${i.message}</div>
        <div class="text-sm text-dim mb-md">${i.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnNpcInteract">💬 Bái Kiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreAgain" ${p?"":"disabled"}>🔍 Dò Tiếp</button>
          <button class="btn btn--dark" id="btnExploreContinue">Đóng</button>
        </div>
      `;else if(i.type==="player_encounter"&&i.targetPlayer){const s=i.targetPlayer;o+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${s.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${s.realmTierName||"Phàm nhân"} · Cấp ${s.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${s.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${s.id}">⚔️ Cướp Bóc</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `}else if(i.type==="herb"){const s=i.isCritical;o+=`
        <div style="font-size: 44px; margin-bottom: 6px;">🌿</div>
        <div class="badge ${s?"badge--gold":"badge--green"} mb-xs" style="font-size: 11px; padding: 3px 10px; text-transform: uppercase;">
          ${s?"🌟 BỘI THU DƯỢC LIỆU (BẠO KÍCH)":"🌿 DƯỢC THẢO THIÊN NHIÊN"}
        </div>
        <div class="text-lg ${s?"text-gold":"text-bright"} bold mb-sm">${i.message}</div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 400px;">
          <div class="text-md bold" style="color: #34d399;">+${i.quantity} ${i.itemName||"Linh Thảo"}</div>
          ${i.bonusGold?`<div class="text-sm text-gold mt-xs">+${i.bonusGold} 💎 Linh Thạch thô (Thưởng bạo kích)</div>`:""}
          <div class="text-xs text-dim mt-sm" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            🌿 Kỹ năng <strong>Hái Dược</strong>: Cấp ${i.skillLevel} <span style="color:#6ee7b7">(+${i.skillXpGained} XP)</span>
          </div>
          ${i.levelUp?`<div class="badge badge--gold mt-xs animate-bounce" style="font-size:11px;">🎉 Chúc mừng! Hái Dược thăng cấp ${i.levelUp.newLevel}!</div>`:""}
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>
            ${p?`🔍 Dò Thám Tiếp (-${u} TL)`:`❌ Hết Thể Lực (${v}/${u})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(i.type==="mineral"){const s=i.isCritical;o+=`
        <div style="font-size: 44px; margin-bottom: 6px;">⛏️</div>
        <div class="badge ${s?"badge--gold":"badge--cyan"} mb-xs" style="font-size: 11px; padding: 3px 10px; background: ${s?"rgba(234, 179, 8, 0.2)":"rgba(6, 182, 212, 0.2)"}; color: ${s?"#facc15":"#22d3ee"}; border: 1px solid ${s?"rgba(234, 179, 8, 0.5)":"rgba(6, 182, 212, 0.4)"}; text-transform: uppercase;">
          ${s?"💎 MẠCH KHOÁNG ĐẠI PHÁT (BẠO KÍCH)":"⛏️ MẠCH KHOÁNG THIÊN ĐỊA"}
        </div>
        <div class="text-lg ${s?"text-gold":"text-bright"} bold mb-sm">${i.message}</div>
        <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 400px;">
          <div class="text-md bold" style="color: #38bdf8;">+${i.quantity} ${i.itemName||"Khoáng Thạch"}</div>
          ${i.bonusGold?`<div class="text-sm text-gold mt-xs">+${i.bonusGold} 💎 Tinh Thạch vụn (Thưởng bạo kích)</div>`:""}
          <div class="text-xs text-dim mt-sm" style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            ⛏️ Kỹ năng <strong>Khai Khoáng</strong>: Cấp ${i.skillLevel} <span style="color:#7dd3fc">(+${i.skillXpGained} XP)</span>
          </div>
          ${i.levelUp?`<div class="badge badge--gold mt-xs animate-bounce" style="font-size:11px;">🎉 Chúc mừng! Khai Khoáng thăng cấp ${i.levelUp.newLevel}!</div>`:""}
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>
            ${p?`🔍 Dò Thám Tiếp (-${u} TL)`:`❌ Hết Thể Lực (${v}/${u})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(i.type==="material")o+=`
        <div style="font-size: 36px; margin-bottom: 6px;">📦</div>
        <div class="badge badge--dark mb-xs" style="font-size: 11px; padding: 3px 8px;">DÃ NGOẠI THU THẬP</div>
        <div class="text-lg text-bright bold mb-sm">${i.message}</div>
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; margin: 10px auto; max-width: 350px;">
          <div class="text-md bold text-green">+${i.quantity||1} ${i.itemName||i.itemId}</div>
        </div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>
            ${p?`🔍 Dò Thám Tiếp (-${u} TL)`:`❌ Hết Thể Lực (${v}/${u})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `;else if(i.type==="dungeon_discovery"){const s=i.realmType==="timed",b=s?"🌀":"🌋",n=s?`⏳ HUYỄN CẢNH CÓ HẠN (${i.remainingMinutes||60} PHÚT)`:`⚠️ CẤM ĐỊA THƯỢNG CỔ (QUÁI x${i.difficultyMult||2.5})`;o+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">${b}</div>
        <div class="badge mb-xs" style="font-size: 11px; padding: 4px 12px; font-weight: 700; ${s?"background:rgba(168,85,247,0.25);color:#d8b4fe;border:1px solid #c084fc;":"background:rgba(239,68,68,0.25);color:#fca5a5;border:1px solid #ef4444;"}">
          ${n}
        </div>
        <div class="text-lg ${s?"text-gold":"text-red"} bold mb-sm" style="font-size: 16px;">
          ${i.message}
        </div>
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 12px; margin: 10px auto; max-width: 420px; text-align: left;">
          <div style="font-weight:700;font-size:14px;color:var(--text-bright);margin-bottom:4px">
            ${s?"✨":"🔱"} ${i.name}
          </div>
          <div style="font-size:12px;opacity:0.8;line-height:1.4;margin-bottom:6px">
            ${i.description||"Lối vào bí cảnh đã được phát hiện và mở ra trên bản đồ."}
          </div>
          <div style="font-size:11px;opacity:0.6">
            🏰 Thử thách: ${(i.waves||3)+1} Tầng · ${s?`⏳ Hạn dùng: ${i.remainingMinutes} phút`:"Vô hạn (Tồn tại vĩnh viễn)"}
          </div>
        </div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn ${s?"btn--gold":"btn--red"} flex-1" id="btnGoToDungeon">
            ${s?"⚡ Đến Bí Cảnh Ngay":"🔥 Khiêu Chiến Cấm Địa"}
          </button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>
            ${p?`🔍 Dò Thám Tiếp (-${u} TL)`:"❌ Hết Thể Lực"}
          </button>
        </div>
      `}else o+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${i.message}</div>
        ${i.gold?`<div class="text-gold bold">+${i.gold} 💎 Linh Thạch</div>`:""}
        ${i.item?`<div class="text-green bold">+1 ${i.item.name}</div>`:""}
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${p?"":"disabled"}>
            ${p?`🔍 Dò Thám Tiếp (-${u} TL)`:`❌ Hết Thể Lực (${v}/${u})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `;o+="</div></div>",$.innerHTML=o,(i.type==="monster"||i.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",s=>{$.innerHTML="",gt(a,s.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async s=>{try{const b=await e.trackMonster(t.playerId,s.target.dataset.mid);b.success?(l(b.message,"success"),$.innerHTML="",typeof a.renderGame=="function"&&a.renderGame()):b.error&&l(b.error,"error")}catch(b){l("Lỗi theo dõi: "+b.message,"error")}})),i.type==="npc"&&i.npcId&&((r=document.getElementById("btnNpcInteract"))==null||r.addEventListener("click",async()=>{await qt(a,i.npcId,$)})),i.type==="dungeon_discovery"&&((g=document.getElementById("btnGoToDungeon"))==null||g.addEventListener("click",()=>{t._travelTab="dungeon";const s=document.querySelector('[data-page="travel"]');s?s.click():typeof a.renderGame=="function"&&(t.currentPage="travel",a.renderGame())})),(f=document.getElementById("btnExploreAgain"))==null||f.addEventListener("click",()=>{pt(a)}),(T=document.getElementById("btnExploreContinue"))==null||T.addEventListener("click",()=>{$.innerHTML=""})}catch(y){$.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${y.message}</div></div>`}finally{d&&(d.disabled=!1,d.style.opacity="1")}}async function qt(a,t,e){const{state:l,api:c,notify:$,renderGame:d}=a,r=document.getElementById("npcQuestModal")||e;try{const f=(await c.getNpc(t)).npc;if(!f)return;const T=(l.player.activeQuests||[]).map(i=>i.quest_id);let y=f.quests.map(i=>{const u=T.includes(i.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${i.name}</span>
            <span class="text-xs badge" style="background:${i.type==="kill"?"var(--red)":"var(--green)"}">${i.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${i.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${i.rewards.gold?i.rewards.gold+"💎 ":""}${i.rewards.xp?i.rewards.xp+"✨ ":""}${i.rewards.skillChance?"🎯 "+i.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${u?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${i.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");r.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${f.icon||"🧓"} ${f.name} <span class="subtitle">${f.profession}</span></div>
        <div class="panel-body">
          ${y||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,r.querySelectorAll(".btn-accept-quest").forEach(i=>{i.addEventListener("click",async()=>{i.disabled=!0,i.textContent="⏳...";try{const u=await c.acceptQuest(l.playerId,i.dataset.npc,i.dataset.qid);l.player=u.player,$(u.message,"success"),d()}catch(u){$(u.message||"Lỗi nhận quest","error"),i.disabled=!1,i.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(g){console.error("NPC load error:",g)}}async function gt(a,t,e=null){var f,T;const{state:l,api:c,notify:$,updateSidebar:d,renderGame:r}=a,g=document.getElementById("combatResult");if(g){if(!l.player.currentHp||l.player.currentHp<=0)return $("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(l.player.hospitalRemaining>0)return $(`Đang tịnh dưỡng! Còn ${l.player.hospitalRemaining}s`,"error");g.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,g.scrollIntoView({behavior:"smooth"});try{const y=await c.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:l.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(l.player=y.player,y.outcome==="no_energy"){g.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${y.log[0]}</div></div>`,d();return}const i=y.monster,u=Math.max(0,l.player.currentHp/l.player.maxHp*100),v=Math.max(0,i.currentHp/i.maxHp*100),h={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},p=h[y.outcome]||h.loss,o=(f=y.rewards)!=null&&f.gold?` · +${y.rewards.gold} 💎`:"",s=y.rewards?` · +${y.rewards.xp} XP${o}`:"",b={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[y.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};g.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${p.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${p.icon}</span> <span>${p.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${y.turns}/${y.maxTurns||25} Lượt ${s}
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
                <div id="barPlayerHp" style="width: ${u}%; height: 100%; background: ${u>50?"var(--green)":u>20?"var(--orange)":"var(--red)"}; transition: width 0.4s ease;"></div>
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
              <div style="font-size: 36px; margin-bottom: 6px;">${i.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${i.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${i.level||1} · ${i.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${v}%; height: 100%; background: ${v>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${i.currentHp}/${i.maxHp} HP</div>

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
            ${ut(y.log)}
          </div>
        </div>
      </div>`;const n=document.getElementById("cardMonster"),m=document.getElementById("cardPlayer");y.glitchEvents&&y.glitchEvents.length>0&&n?y.glitchEvents.forEach((x,k)=>{setTimeout(()=>{lt(n,`-${x.damage} 🌌 [VẾT NỨT]`,"glitch"),n.classList.add("shake"),setTimeout(()=>n.classList.remove("shake"),400)},k*400+200)}):n&&y.rewards&&lt(n,`-${Math.round(i.maxHp*.4)} 💥`,"crit"),d(),e&&typeof r=="function"&&setTimeout(()=>r(),1500)}catch(y){g.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${y.message}</div></div>`}}}function lt(a,t,e="normal"){if(!a)return;const l=document.createElement("div");l.className=`floating-damage damage-${e}`,l.textContent=t,a.appendChild(l),setTimeout(()=>l.remove(),1100)}function ut(a){return(a||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("Kích Hoạt")||t.includes("Xuất chiêu")?`<div class="skill-proc" style="color:#38bdf8;font-weight:700;background:rgba(56,189,248,0.12);padding:3px 8px;border-radius:4px;margin:2px 0;border-left:3px solid #38bdf8;">${t}</div>`:t.includes("thường công")?`<div class="normal-attack" style="color:var(--text-dim);font-style:italic;margin:2px 0;">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function dt(a,t){const{state:e,api:l,notify:c}=t,$=e.player,d=($.skills||[]).find(y=>(typeof y=="string"?y:y.id)==="nhan_thuat"),r=d?d.level||1:0,g=[...e.skills].sort((y,i)=>(y.tier||1)-(i.tier||1)),f=($.skills||[]).map(y=>typeof y=="string"?y:y.id),T={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};a.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${r}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${g.map(y=>{const i=f.includes(y.id),u=y.tier||1,v=u>r+1,h=u<=r;let p="";return y.requirements&&y.requirements.length>0?h||i?p=`<div class="mt-sm text-xs text-orange">Điều kiện: ${y.requirements.map(o=>`<br>• ${o}`).join("")}</div>`:v?p=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${u}.</div>`:p='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':p='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${i?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${y.name} ${i?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${i?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${T[u]||u}</span>
                    <span class="text-xs text-dim">${y.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${h||i?y.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${y.type!=="passive"&&y.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${y.cost} linh lực</div>`:""}
                
                ${p}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${i?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${v?"btn--dark":"btn--gold"} btn--sm btn-learn" ${v?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${y.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,a.querySelectorAll(".accordion-header").forEach(y=>{y.addEventListener("click",()=>{const i=y.nextElementSibling;i.style.display==="none"?(i.style.display="block",y.querySelector("div:last-child").textContent="▲"):(i.style.display="none",y.querySelector("div:last-child").textContent="▼")})}),a.querySelectorAll(".btn-learn").forEach(y=>{y.addEventListener("click",async i=>{i.stopPropagation();try{const u=await l.learnSkill($.id,y.dataset.sid);u.error?c(u.error,"error"):(e.player=u.player,c(u.message,"success"),dt(a,t))}catch(u){c("Lỗi học kỹ năng: "+u.message,"error")}})})}async function ht(a){const{state:t,api:e,notify:l,updateSidebar:c,renderGame:$}=a,d=t.player;if(!d)return;let r=document.getElementById("tribulation-modal-overlay");r||(r=document.createElement("div"),r.id="tribulation-modal-overlay",r.style.cssText=`
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px); z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      padding: 16px; animation: fadeIn 0.25s ease;
    `,document.body.appendChild(r)),r.innerHTML=`
    <div style="background: #121420; border: 2px solid #eab308; border-radius: 14px; max-width: 580px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(234, 179, 8, 0.2); padding: 24px; text-align: center; color: #fff;">
      <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚡</div>
      <div style="font-size: 16px; font-weight: 700; color: #eab308; margin-top: 8px;">Đang dò xét Thiên Khí & Thăm Dò Thiên Kiếp...</div>
    </div>
  `;try{const g=await e.getTribulationPreview(d.id);zt(r,g,a)}catch(g){r.remove(),l(g.message||"Không thể tra cứu thông tin Lôi Kiếp","error")}}function zt(a,t,e){var y,i,u;const{state:l,api:c,notify:$,updateSidebar:d,renderGame:r}=e,g=t.tribulation||{},f=t.playerStats||{},T=g.color||"#eab308";a.innerHTML=`
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
              <span style="font-weight: 700; color: #10b981;">${f.currentHp}/${f.maxHp} HP</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🔵 Chân Khí Hộ Thể:</span>
              <span style="font-weight: 700; color: #38bdf8;">${f.usableEnergy} LL (1 LL = 2.5 HP)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🛡️ Giáp Giảm Thương:</span>
              <span style="font-weight: 700; color: #60a5fa;">-${f.defenseMitigationPct||0}% ST cơ thể</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">💨 Thân Pháp Chẻ Sét:</span>
              <span style="font-weight: 700; color: #a78bfa;">${f.dodgeChancePct||0}% né (-40% ST)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span class="text-dim">🌟 Hộ Thể Kim Chung:</span>
              <span style="font-weight: 700; color: ${f.hasGoldenBell?"#10b981":"var(--text-dim)"};">
                ${f.hasGoldenBell?"✅ Giảm thêm 20% Lôi Kiếp":"❌ Chưa kích hoạt"}
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
  `,(y=a.querySelector("#btn-close-tribulation"))==null||y.addEventListener("click",()=>a.remove()),(i=a.querySelector("#btn-cancel-tribulation"))==null||i.addEventListener("click",()=>a.remove()),(u=a.querySelector("#btn-start-tribulation"))==null||u.addEventListener("click",async()=>{await _t(a,e,g)})}async function _t(a,t,e){var p,o,s;const{state:l,api:c,notify:$,updateSidebar:d,renderGame:r}=t,g=e.color||"#eab308";a.innerHTML=`
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
  `;const f=a.querySelector("#tribulation-log-stream"),T=a.querySelector("#tribulation-wave-indicator"),y=a.querySelector("#tri-hp-bar"),i=a.querySelector("#tri-energy-bar"),u=a.querySelector("#tri-hp-val"),v=a.querySelector("#tri-energy-val"),h=a.querySelector("#tribulation-footer");try{const b=await c.attemptBreakthrough(l.playerId),n=b.tribulation;if(!n||!n.logs){b.player&&(l.player=b.player),$(b.message,b.success?"success":"error"),typeof d=="function"&&d(),a.remove(),r();return}let m=((p=b.player)==null?void 0:p.maxHp)||n.startingHp,x=n.startingHp,k=n.startingEnergy,w=((o=b.player)==null?void 0:o.maxEnergy)||Math.max(50,n.startingEnergy);u.textContent=`${x}/${m}`,v.textContent=`${k}`;const C=n.logs||[];for(let E=0;E<C.length;E++){const P=C[E];await new Promise(L=>setTimeout(L,900)),T.textContent=`ĐỢT ${P.wave}/${n.totalWaves} ĐANG GIÁNG XUỐNG!`,T.style.color="#ef4444",a.style.backgroundColor="rgba(255, 255, 255, 0.2)",setTimeout(()=>{a.style.backgroundColor="rgba(0, 0, 0, 0.88)"},80);const I=document.createElement("div");I.style.cssText=`
        padding: 8px 12px; border-radius: 6px;
        background: ${P.defeated?"rgba(239, 68, 68, 0.2)":"rgba(255, 255, 255, 0.05)"};
        border-left: 3px solid ${P.defeated?"#ef4444":P.dodged?"#a78bfa":g};
        animation: fadeIn 0.3s ease;
      `,I.innerHTML=`
        <div style="font-weight: 700; color: ${g}; margin-bottom: 2px;">
          ⚡ Đợt ${P.wave}/${n.totalWaves}: Sét Uy Lực ${P.rawDamage} ST
        </div>
        <div style="color: #e2e8f0; font-size: 12px;">${P.text}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 11px;">
          ${P.dodged?'<span style="color: #a78bfa;">💨 Chẻ sét né tránh</span>':""}
          ${P.auraMitigated?'<span style="color: #10b981;">🛡️ Kim Chung hóa giải</span>':""}
          ${P.absorbedByQi>0?`<span style="color: #38bdf8;">🔵 Chân khí hấp thụ: ${P.absorbedByQi} ST</span>`:""}
          <span style="color: #f87171;">💥 Thương tổn: -${P.actualHpDamage} HP</span>
          ${P.medicineRescued?'<span style="color: #f59e0b; font-weight:700;">💊 Dùng đan dược cứu mệnh!</span>':""}
        </div>
      `,f.appendChild(I),f.scrollTop=f.scrollHeight,x=P.hpRemaining,k=P.energyRemaining;const O=Math.max(0,Math.min(100,Math.round(x/m*100))),q=Math.max(0,Math.min(100,Math.round(k/w*100)));if(y.style.width=`${O}%`,i.style.width=`${q}%`,u.textContent=`${x}/${m}`,v.textContent=`${k}`,P.defeated)break}if(await new Promise(E=>setTimeout(E,800)),b.player&&(l.player=b.player),typeof d=="function"&&d(),n.survived){T.textContent="🌟 LÔI VÂN TAN BIẾN • ĐỘ KIẾP VIÊN MÃN",T.style.color="#10b981";const E=document.createElement("div");E.style.cssText=`
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(16, 185, 129, 0.2));
        border: 2px solid #eab308; border-radius: 8px; padding: 14px; text-align: center;
        margin-top: 8px; animation: scaleUp 0.3s ease;
      `,E.innerHTML=`
        <div style="font-size: 24px;">👑</div>
        <div style="font-size: 16px; font-weight: 800; color: #eab308; margin-top: 4px;">
          ĐỘT PHÁ THÀNH CÔNG!
        </div>
        <div style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
          ${b.message}
        </div>
      `,f.appendChild(E),f.scrollTop=f.scrollHeight,h.innerHTML=`
        <button class="btn btn--gold btn--lg shadow-glow" id="btn-finish-tribulation" style="min-width: 200px; font-weight: 700;">
          🌟 ĐÓN NHẬN TIÊN PHÁP
        </button>
      `,$(b.message,"success")}else{T.textContent="☠️ TRỌNG THƯƠNG • ĐỘT PHÁ THẤT BẠI",T.style.color="#ef4444";const E=document.createElement("div");E.style.cssText=`
        background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; border-radius: 8px;
        padding: 14px; text-align: center; margin-top: 8px; animation: scaleUp 0.3s ease;
      `,E.innerHTML=`
        <div style="font-size: 24px;">☠️</div>
        <div style="font-size: 15px; font-weight: 800; color: #ef4444; margin-top: 4px;">
          ĐỘT PHÁ THẤT BẠI!
        </div>
        <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
          ${b.message}
        </div>
      `,f.appendChild(E),f.scrollTop=f.scrollHeight,h.innerHTML=`
        <button class="btn btn--dark" id="btn-finish-tribulation" style="min-width: 180px;">
          🏥 VỀ DƯỠNG THƯƠNG
        </button>
      `,$(b.message,"error")}(s=a.querySelector("#btn-finish-tribulation"))==null||s.addEventListener("click",()=>{a.remove(),r()})}catch(b){$(b.message||"Lỗi trong quá trình độ kiếp","error"),a.remove(),r()}}function Bt(a,t){var u,v,h;const{state:e,api:l,notify:c,renderGame:$}=t,d=e.player,r=d.stats,g=d.allocatedStats||{},f=5,T=d.currentEnergy>=f&&!d.hospitalRemaining,y=d.talentDisplay||{},i=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];a.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${d.currentEnergy}/${d.maxEnergy} linh lực · Chi phí: ${f}/lần</span>
      </div>
    </div>

    ${d.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${d.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${((u=d.realmInfo)==null?void 0:u.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(v=d.realmInfo)!=null&&v.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${i.map(([p,o,s])=>{const b=y[p]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${b.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${o}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${s}</div>
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
        ${i.map(([p,o,s,b])=>{const n=y[p]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},m=Math.floor(d.currentEnergy/f)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${o}</span> ${s}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${b}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${r[p]??0}</span>
              ${g[p]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${g[p]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${n.color};min-width:50px" title="Căn Cốt: ${n.name} (×${n.value})">${n.icon}×${n.value}</span>
              <input type="number" class="train-count" data-stat="${p}" min="1" max="${m}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${T?"":"disabled"}>
              <button class="btn btn--sm ${T?"btn--blue":"btn--dark"} train-btn" data-train="${p}" ${T?"":"disabled"} title="Tốn ${f} Linh lực/lần · Căn cốt ×${n.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${f} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(d.currentEnergy/f)}</strong> lần hiện tại.
        </div>
        <div class="derived-row mt-3 border-t border-dim pt-3">
          <div class="d-item"><div class="d-val">${r.maxHp??100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${r.maxEnergy??50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${r.energyRegen??5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row pb-3">
          <div class="d-item"><div class="d-val">${r.critChance??5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${r.critMultiplier??1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Khí/đòn</div></div>
        </div>
      </div>
    </div>`,(h=a.querySelector(".btn-breakthrough"))==null||h.addEventListener("click",()=>{ht(t)}),a.querySelectorAll(".train-btn").forEach(p=>{p.addEventListener("click",async o=>{o.stopPropagation();const s=a.querySelector(`.train-count[data-stat="${p.dataset.train}"]`),b=parseInt(s==null?void 0:s.value)||1;try{const n=await l.trainStat(e.playerId,p.dataset.train,b);e.player=n.player,c(n.message,"success"),$()}catch(n){c(n.message||"Lỗi rèn luyện","error")}})})}async function vt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.player;if(d){a.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const g=(await l.getGlitches(d.id)).status,f=a.querySelector("#glitchContentWrapper");if(!f)return;if(!g.featureUnlocked){Rt(f,g.featureDetails,d);return}At(f,g,d,t)}catch(r){a.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${r.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function Rt(a,t,e){const l=(t==null?void 0:t.requirements)||[];a.innerHTML=`
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
  `}function At(a,t,e,l){const{api:c,notify:$,updateSidebar:d}=l,r=t.imprints||[],g=t.stances||{},f=t.activeStance||"breaker";a.innerHTML=`
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
  `;const T=a.querySelector("#btnOverrideTribulation");T&&(T.onclick=async()=>{T.disabled=!0,T.textContent="Đang lách luật...";try{const y=await c.overrideTribulation(e.id);$(y.message,"success"),state.player=y.player,d(),vt(a.parentElement,l)}catch(y){$(y.message||"Thao tác lách luật thất bại!","error"),T.disabled=!1,T.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),mt(a,g,f,e,c,$,d),bt(a,r,e,$,d)}function mt(a,t,e,l,c,$,d){const r=a.querySelector("#stanceContainer");r&&(r.innerHTML="",Object.values(t).forEach(g=>{const f=g.isUnlocked!==!1,T=g.id===e,y=document.createElement("div");y.style.cssText=`
      background: ${T?"rgba(168, 85, 247, 0.15)":f?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${T?"#c084fc":f?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${f?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${f?"1":"0.55"};
    `,y.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${f?g.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${f?g.icon:"🔒"}</span> ${g.name}
        </div>
        ${T?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${f?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${f?g.description:`<span style="color:#f59e0b;">${g.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,y.onclick=async()=>{if(!f)return $(g.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!T)try{const i=await c.setStance(l.id,g.id);$(i.message,"success"),state.player=i.player,d(),mt(a,t,g.id,l,c,$,d)}catch(i){$(i.message||"Chuyển thế thất bại","error")}},r.appendChild(y)}))}function bt(a,t,e,l,c){const $=a.querySelector("#imprintsContainer");$&&($.innerHTML="",t.forEach(d=>{const r=document.createElement("div"),g=d.fogLevel||(d.isUnlocked?"revealed":"fog");let f="rgba(15, 23, 42, 0.5)",T="rgba(255,255,255,0.08)",y="none";g==="revealed"?(f="rgba(30, 41, 59, 0.75)",T=d.color,y=`0 0 12px ${d.color}33`):g==="partial"?(f="rgba(24, 24, 27, 0.6)",T="1px dashed rgba(168, 85, 247, 0.4)"):(f="rgba(10, 10, 15, 0.5)",T="1px dashed rgba(255, 255, 255, 0.08)"),r.style.cssText=`
      background: ${f};
      border: 1px solid ${T};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${y};
      position: relative;
      overflow: hidden;
    `,r.innerHTML=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${d.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${d.icon}</span> ${d.name}
          </div>
          <span style="font-size: 0.7rem; color: ${g==="revealed"?"#fbbf24":"#6b7280"}; border: 1px solid ${g==="revealed"?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.08)"}; padding: 1px 6px; border-radius: 4px;">
            ${g==="revealed"?d.title:g==="partial"?"Chớm Ngộ":"Sương Mù"}
          </span>
        </div>

        <div style="font-size: 0.78rem; color: ${g==="fog"?"#9ca3af":"#a1a1aa"}; font-style: italic; margin-bottom: 8px; line-height: 1.4;">
          "${d.lore}"
        </div>

        <div style="font-size: 0.82rem; color: ${g==="revealed"?"#e4e4e7":"#9ca3af"}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
          <strong style="color: ${g==="revealed"?"#67e8f9":"#888"};">
            ${g==="revealed"?"Hiệu ứng:":g==="partial"?"Manh mối:":"Sấm truyền:"}
          </strong> ${d.description}
        </div>
      </div>

      <div>
        ${g==="revealed"?`
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
            <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐẠI TRIỆT ĐẠI NGỘ</span>
            <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${d.title}">
              ${e.activeTitle===d.title?"Đang Đeo":"Đeo Danh Hiệu"}
            </button>
          </div>
        `:g==="partial"?`
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #a855f7; margin-bottom: 4px;">
              <span>Tiến độ cảm ứng:</span>
              <span>${d.progress.current} / ${d.progress.threshold}</span>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
              <div style="width: ${d.progress.percent}%; height: 100%; background: linear-gradient(90deg, #a855f7, #c084fc); transition: width 0.3s;"></div>
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
    `;const i=r.querySelector(".btnSetTitle");i&&(i.onclick=()=>{e.activeTitle=d.title,l(`Đã kích hoạt danh hiệu: [${d.title}]!`,"success"),c(),bt(a,t,e,l,c)}),$.appendChild(r)}))}function nt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.player;if(!d)return;const r=d.skills||[],g=e.skills||[],f=(d.realmTier??1)>=2||(d.glitchInsight??0)>=20||(d.unlockedImprints||[]).length>0,y=(L=>{switch(L){case 1:return 2;case 2:return 3;case 3:return 4;case 4:return 5;default:return 6}})(d.realmTier||1),i=r.map(L=>{const M=typeof L=="string"?L:L.id;return{...g.find(B=>B.id===M)||{name:M,id:M,category:"combat",type:"active"},level:L.level||1,xp:L.xp||L.currentXp||0,equipped:L.equipped||L.isEquipped||!1}}),u=i.filter(L=>L.type!=="passive"),v=i.filter(L=>L.type==="passive"),h=u.filter(L=>L.equipped),p={combat:{icon:"⚔️",name:"Chiêu Thức",sub:`${u.length} chiêu • ${h.length}/${y} ô xuất`,badge:`${h.length}/${y}`},auras:{icon:"🧘",name:"Tâm Pháp & Hào Quang",sub:`Khóa ${d.reservationPct||0}% LL • ${(d.activeAuras||[]).length} Hào quang`,badge:`${d.reservationPct||0}%`},monsters:{icon:"🐺",name:"Thông Thạo Quái Vật",sub:"Bách thú đồ giám • Sát quái 5★",badge:"★"},crafting:{icon:"⚒️",name:"Thông Thạo Chế Tạo",sub:`Lv.${d.craftingLevel||1} • Đan đạo & Đúc rèn`,badge:`Lv.${d.craftingLevel||1}`}};let o=localStorage.getItem("activeSkillPillar")||"combat";["combat","auras","monsters","crafting","library","glitch"].includes(o)||(o="combat");let s="all",b="all",n=null,m=null;const x=(L,M)=>{var A;const S=(L.level||1)*100,B=Math.min(100,(L.xp||0)/S*100),R=L.type==="passive",K="★".repeat(Math.min(L.tier||1,7)),z=(L.tier||1)>=5?"var(--gold)":(L.tier||1)>=3?"var(--purple)":"var(--blue)";let N="";if(R)N='<span style="font-size:11px; font-weight:700; color:var(--green)">🧘 Tâm Pháp Thường Trực</span>';else if(L.equipped)N=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${L.id}">Tháo</button>`;else{const G=h.length<y;N=`<button class="btn btn--sm ${G?"btn--blue":"btn--outline"} equip-btn" data-eq="1" data-sid="${L.id}" ${G?"":'title="Đã đầy ô kỹ năng!"'}>Trang Bị</button>`}const _={1:55,2:45,3:40,4:35,5:30,6:25,7:20},V=L.triggerChance||_[L.tier||1]||40,F=Math.floor((((A=d.stats)==null?void 0:A.dexterity)||10)/10),U=Math.max(0,(L.level||1)-1),Q=d.activeStance==="breaker"?5:0,j=Math.min(85,Math.max(15,V+U+F+Q));return`
      <div class="skill-card  ${L.equipped&&!R?"equipped":""}">
        <div class="skill-card-header">
          <div>
            <div class="skill-card-name" style="font-size: 14px;">${L.name}</div>
            <div class="skill-card-tier" style="color:${z}">${K} Tầng ${L.tier||1} • ${R?"Tâm Pháp":"Chiêu Thức"}</div>
          </div>
          <div class="skill-card-action">${N}</div>
        </div>
        <div class="skill-card-desc">${L.description||"Tuyệt kỹ thượng thừa tu chân giới."}</div>
        ${`
          <div class="skill-card-mastery">
            <div class="skill-mastery-label">
              <span>Thông thạo Lv.${L.level}</span>
              <span class="text-dim">${L.xp}/${S} XP</span>
            </div>
            <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${B}%"></div></div>
            ${L.masteryBonus?`<div class="skill-mastery-bonus">✨ ${L.masteryBonus}</div>`:""}
          </div>
        `}
        ${R?"":`
          <div class="skill-card-cost" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-top:8px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.06);">
            <span>🔵 ${L.cost||0} Linh Lực</span>
            <span style="color:#f59e0b; font-weight:700;" title="Xác suất xuất chiêu: Cơ bản ${V}% + Cấp (+${U}%) + Mẫn tiệp (+${F}%)${Q?" + Thế phá quy (+5%)":""}">
              🎯 Xác suất xuất chiêu: ${j}%
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
        <button class="btn btn--sm ${o==="library"?"btn--gold":"btn--outline"}" id="btn-open-library">
          📚 Tàng Kinh Các
        </button>
        <button class="btn btn--sm ${o==="glitch"?"btn--purple":"btn--outline"}" id="btn-open-glitch">
          ${f?"🌌 Thiên Đạo Dị Biến":"🌫️ Kẽ Hở Quy Luật"}
        </button>
      </div>
    </div>

    <!-- 4 PILLARS SELECTOR -->
    <div class="pillar-tabs">
      ${Object.entries(p).map(([L,M])=>`
        <div class="pillar-tab ${o===L?"active":""}" data-pillar="${L}">
          <div class="pillar-icon">${M.icon}</div>
          <div class="pillar-info">
            <div class="pillar-name">${M.name}</div>
            <div class="pillar-sub">${M.sub}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `,w=()=>{var M;let L=u;return s==="equipped"&&(L=u.filter(S=>S.equipped)),s==="unequipped"&&(L=u.filter(S=>!S.equipped)),`
      <!-- LOADOUT SLOTS -->
      <div class="loadout-bar" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="font-weight: 700; color: var(--gold); font-size: 14px; display: flex; align-items: center; gap: 6px;">
            <span>⚔️ Ô Xuất Chiêu Thực Chiến:</span>
            <span style="color: #fff;">${h.length}/${y}</span>
          </div>
          <div class="text-dim text-xs" style="margin-top: 2px;">
            Cảnh giới hiện tại (${((M=d.realmInfo)==null?void 0:M.fullName)||"Phàm Cấp"}) cho phép trang bị tối đa <b>${y}</b> chiêu thức. Mỗi hiệp đấu sẽ tung xúc xắc theo <b>xác suất kích hoạt</b> và tiêu hao Linh Lực thực chiến.
          </div>
        </div>
        <div class="loadout-slots" style="display: flex; gap: 8px;">
          ${Array.from({length:y}).map((S,B)=>{const R=h[B];return R?`<div class="loadout-slot filled" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(59, 130, 246, 0.15); border: 1px solid var(--blue); border-radius: 6px; font-size: 18px; cursor: pointer;" title="${R.name} (Lv.${R.level})">⚔️</div>`:'<div class="loadout-slot" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; font-size: 14px; color: var(--text-dim);" title="Ô trống">➕</div>'}).join("")}
        </div>
      </div>

      <!-- FILTER TABS -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <button class="mastery-filter-btn ${s==="all"?"active":""}" data-sfilter="all">Tất Cả Chiêu Thức (${u.length})</button>
        <button class="mastery-filter-btn ${s==="equipped"?"active":""}" data-sfilter="equipped">Đã Trang Bị (${h.length})</button>
        <button class="mastery-filter-btn ${s==="unequipped"?"active":""}" data-sfilter="unequipped">Chưa Trang Bị (${u.length-h.length})</button>
      </div>

      <div class="skill-grid">
        ${L.length>0?L.map(S=>x(S)).join(""):'<div class="text-dim" style="padding: 20px;">Chưa có chiêu thức kích hoạt nào trong danh mục này. Hãy đến Tàng Kinh Các để thỉnh bí kíp!</div>'}
      </div>
    `},C=()=>{const L=d.auraConfigs||{ho_the_kim_chung:{id:"ho_the_kim_chung",name:"Hộ Thể Kim Chung",icon:"🛡️",reservationPct:20,desc:"Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp khi độ kiếp.",statBonuses:{defense:25,maxHp:100}},than_hanh_bo:{id:"than_hanh_bo",name:"Thần Hành Hào Quang",icon:"💨",reservationPct:15,desc:"Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.",statBonuses:{speed:20,dexterity:15}},hoa_diem_chan_khi:{id:"hoa_diem_chan_khi",name:"Hỏa Diễm Chân Khí",icon:"🔥",reservationPct:25,desc:"Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.",statBonuses:{strength:25,critChance:10}},toa_thien:{id:"toa_thien",name:"Toạ Thiền Tụ Khí",icon:"🧘",reservationPct:10,desc:"Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực (+5 HP & +2 TL / 10s).",statBonuses:{hpRegen:5,staminaRegen:2}}},M=d.activeAuras||[],S=d.reservedEnergy||0,B=d.usableEnergy??Math.max(0,d.maxEnergy-S),R=d.reservationPct||0,K=d.maxEnergy>0?Math.round(B/d.maxEnergy*100):100;return`
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
              Linh Lực Khả Dụng: <span style="color: #38bdf8; font-size: 16px; font-weight: 700;">${B}</span> / ${d.maxEnergy}
            </div>
            <div style="font-size: 12px; color: #f59e0b; margin-top: 2px;">
              Đã khóa: <b>${S}</b> LL (${R}% / 85% tối đa)
            </div>
          </div>
        </div>

        <!-- SPLIT RESERVATION BAR -->
        <div style="position: relative; height: 16px; background: rgba(0, 0, 0, 0.5); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; margin-bottom: 12px;">
          <div style="width: ${K}%; background: linear-gradient(90deg, #0284c7, #38bdf8); transition: width 0.4s ease;" title="Linh Lực Khả Dụng: ${B}"></div>
          <div style="width: ${R}%; background: linear-gradient(90deg, #d97706, #fbbf24); transition: width 0.4s ease;" title="Linh Lực Bị Khóa: ${S} (${R}%)"></div>
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
          <span class="text-dim text-xs font-normal">(${M.length}/${Object.keys(L).length} đang bật)</span>
        </div>

        <div class="skill-grid">
          ${Object.values(L).map(z=>{const N=M.includes(z.id),_=!N&&R+z.reservationPct>85;return`
              <div class="skill-card ${N?"equipped":""}" style="${N?"border-color: rgba(234, 179, 8, 0.6); box-shadow: 0 0 12px rgba(234, 179, 8, 0.15);":""}">
                <div class="skill-card-header">
                  <div>
                    <div class="skill-card-name" style="font-size: 14px; display: flex; align-items: center; gap: 6px;">
                      <span>${z.icon}</span>
                      <span>${z.name}</span>
                    </div>
                    <div class="skill-card-tier" style="color: #f59e0b;">Khóa ${z.reservationPct}% Linh Lực (${Math.floor(d.maxEnergy*(z.reservationPct/100))} LL)</div>
                  </div>
                  <div class="skill-card-action">
                    <button class="btn btn--sm ${N?"btn--gold":"btn--outline"} btn-toggle-aura" data-aura="${z.id}" ${_?'disabled title="Vượt quá 85% Linh Lực khóa tối đa!"':""}>
                      ${N?"✅ Đang Duy Trì":"🔘 Bật Hào Quang"}
                    </button>
                  </div>
                </div>
                <div class="skill-card-desc" style="margin-top: 6px;">${z.desc}</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                  ${Object.entries(z.statBonuses||{}).map(([V,F])=>`
                    <span class="req-tag" style="background: rgba(234, 179, 8, 0.12); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.2);">
                      +${F} ${V}
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
            ${v.map(z=>x(z)).join("")}
          </div>
        `:`
          <div class="panel" style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 12px;">
            Chưa lĩnh ngộ tâm pháp bị động thường trực nào. Hãy đến Tàng Kinh Các để thỉnh giáo các bí kíp công pháp thượng thừa!
          </div>
        `}
      </div>
    `},E=()=>{if(!n)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `;const{totalKills:L,totalSpecies:M,tierCounts:S,monsters:B,tiers:R}=n,K=["all","Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh"],z=B.filter(N=>b==="all"?!0:(N.tierName||"").includes(b));return`
      <!-- BESTIARY HERO -->
      <div class="mastery-hero">
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${(L||0).toLocaleString()}</span>
          <span class="mastery-stat-label">Tổng Yêu Thú Đã Trảm</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${M||0}</span>
          <span class="mastery-stat-label">Loài Trong Giới Đồ</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #3b82f6;">${(S==null?void 0:S[1])||0}</span>
          <span class="mastery-stat-label">Chớm Ngộ (1★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #10b981;">${(S==null?void 0:S[2])||0}</span>
          <span class="mastery-stat-label">Thuần Thục (2★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #8b5cf6;">${(S==null?void 0:S[3])||0}</span>
          <span class="mastery-stat-label">Đại Thành (3★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #f59e0b;">${(S==null?void 0:S[4])||0}</span>
          <span class="mastery-stat-label">Khắc Chế (4★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #ef4444;">${(S==null?void 0:S[5])||0}</span>
          <span class="mastery-stat-label">Tuyệt Diệt (5★)</span>
        </div>
      </div>

      <!-- REALM FILTER -->
      <div class="mastery-filter-bar">
        <span class="text-dim text-xs" style="margin-right: 4px;">Cảnh Giới:</span>
        ${K.map(N=>`
          <button class="mastery-filter-btn ${b===N?"active":""}" data-mrealm="${N}">
            ${N==="all"?"Tất Cả":N}
          </button>
        `).join("")}
      </div>

      <!-- MONSTER CARDS GRID -->
      <div class="monster-grid">
        ${z.map(N=>{var Q,j,A,G,X;const _=N.mastery||{},V=(_.tier||0)===0&&(_.kills||0)===0,F=_.isMaxTier,U=_.badgeColor||"#6b7280";return`
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
                ${V?`
                  <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin: 8px 0;">
                    🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá thông tin sinh mệnh và thuộc tính!
                  </div>
                `:`
                  <div class="monster-stats-box">
                    <div class="monster-stat-cell">HP: <b>${((Q=N.stats)==null?void 0:Q.hp)??0}</b></div>
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
    `},P=()=>{if(!m)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `;const{craftingLevel:L,craftingXp:M,xpToNext:S,progressPercent:B,title:R,badgeColor:K,perks:z,recipes:N}=m;return`
      <!-- HERO BANNER -->
      <div class="crafting-hero">
        <div class="crafting-hero-header">
          <div class="crafting-hero-title">
            <span>🔥</span>
            <span>Thông Thạo Đan Đạo & Chế Tác</span>
          </div>
          <span class="crafting-rank-badge" style="background: ${K};">
            ${R} (Lv.${L})
          </span>
        </div>

        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
          <span>Kinh Nghiệm Luyện Chế: <b>${M} / ${S} XP</b></span>
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
            ${(N||[]).map(_=>{const V=_.materials||[],F=V.every(j=>{var A;return(((A=d.materials)==null?void 0:A[j.id])||0)>=j.amount}),U=(d.gold||0)>=(_.cost||0),Q=F&&U;return`
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
                    ${V.map(j=>{var X;const A=((X=d.materials)==null?void 0:X[j.id])||0;return`<span style="color: ${A>=j.amount?"var(--green)":"var(--red)"}; font-size: 11px;">• ${j.id} (${A}/${j.amount})</span>`}).join("<br/>")}
                  </div>
                  <div class="shop-item-footer">
                    <span class="text-xs text-dim">${_.craftTime?`Thời gian: ${_.craftTime}s`:"Lập tức"}</span>
                    <button class="btn btn--sm ${Q?"btn--gold":"btn--outline"} btn-craft-action" data-rid="${_.id}" ${Q?"":"disabled"}>
                      ${Q?"🔥 Luyện Chế":"Thiếu Liệu"}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `},I=async()=>{if(o==="library"){a.innerHTML=`
        ${k()}
        <div id="library-container"></div>
      `,O();const L=a.querySelector("#library-container");L&&dt(L,t);return}if(o==="glitch"){a.innerHTML=`
        ${k()}
        <div id="glitch-container"></div>
      `,O();const L=a.querySelector("#glitch-container");L&&vt(L,t);return}if(a.innerHTML=`
      ${k()}
      <div id="pillar-content">
        ${o==="combat"?w():""}
        ${o==="auras"?C():""}
        ${o==="monsters"?E():""}
        ${o==="crafting"?P():""}
      </div>
    `,O(),q(),o==="monsters"&&!n)try{n=await l.getMonsterMastery(d.id);const L=a.querySelector("#pillar-content");L&&o==="monsters"&&(L.innerHTML=E(),q())}catch(L){c("Không thể tải Bách Thú Đồ Giám: "+L.message,"error")}if(o==="crafting"&&!m)try{m=await l.getCraftingMastery(d.id);const L=a.querySelector("#pillar-content");L&&o==="crafting"&&(L.innerHTML=P(),q())}catch(L){c("Không thể tải Thông Thạo Chế Tạo: "+L.message,"error")}},O=()=>{a.querySelectorAll(".pillar-tab").forEach(S=>{S.addEventListener("click",()=>{o=S.dataset.pillar,localStorage.setItem("activeSkillPillar",o),I()})});const L=a.querySelector("#btn-open-library");L&&L.addEventListener("click",()=>{o="library",localStorage.setItem("activeSkillPillar","library"),I()});const M=a.querySelector("#btn-open-glitch");M&&M.addEventListener("click",()=>{o="glitch",localStorage.setItem("activeSkillPillar","glitch"),I()})},q=()=>{a.querySelectorAll("[data-sfilter]").forEach(L=>{L.addEventListener("click",()=>{s=L.dataset.sfilter;const M=a.querySelector("#pillar-content");M&&o==="combat"&&(M.innerHTML=w(),q())})}),a.querySelectorAll(".btn-toggle-aura").forEach(L=>{L.addEventListener("click",async()=>{const M=L.dataset.aura;L.disabled=!0;try{const S=await l.toggleAura(d.id,M);S.player&&(e.player=S.player),c(S.message,S.success?"success":"warning"),typeof $=="function"&&$(),I()}catch(S){c(S.message||"Lỗi chuyển trạng thái Hào Quang","error"),L.disabled=!1}})}),a.querySelectorAll("[data-mrealm]").forEach(L=>{L.addEventListener("click",()=>{b=L.dataset.mrealm;const M=a.querySelector("#pillar-content");M&&o==="monsters"&&(M.innerHTML=E(),q())})}),a.querySelectorAll(".equip-btn").forEach(L=>{L.addEventListener("click",async()=>{try{const M=L.dataset.sid,S=L.dataset.eq==="1",B=await l.equipSkill(d.id,M,S);e.player=B.player,c(B.message,"success"),typeof $=="function"&&$(),I()}catch(M){c(M.message||"Lỗi trang bị pháp quyết","error")}})}),a.querySelectorAll(".btn-craft-action").forEach(L=>{L.addEventListener("click",async()=>{const M=L.dataset.rid;L.disabled=!0,L.innerText="Đang luyện...";try{const S=await l.craftItem(d.id,M);S.player&&(e.player=S.player),c(S.message,S.success?"success":"warning"),typeof $=="function"&&$(),m=await l.getCraftingMastery(d.id),I()}catch(S){c(S.message||"Lỗi luyện chế","error"),L.disabled=!1,L.innerText="🔥 Luyện Chế"}})})};I()}function Ot(a,t){return t==="manual"?"📜":a==="weapon"?"⚔️":a==="body"?"🥋":a==="shield"?"🛡️":a==="feet"?"👢":a==="ring"?"💍":"📦"}function ct(a,t){let e="",l="";if(a.slot==="weapon"){let g=0,f=0;(a.affixes||[]).forEach(T=>{T.stat==="strength"&&T.type==="flat"&&(g+=T.value),T.stat==="dexterity"&&T.type==="flat"&&(f+=T.value)}),g===0&&(g=a.itemLevel*2+5),f===0&&(f=a.itemLevel+10),e=`⚔️ ${g}`,l=`🎯 ${f}`}else if(a.slot==="body"||a.slot==="shield"||a.slot==="feet"){let g=0;(a.affixes||[]).forEach(f=>{f.stat==="defense"&&f.type==="flat"&&(g+=f.value)}),g===0&&(g=a.itemLevel*3),e=`🛡️ ${g}`}else if(a.slot==="ring"){let g=0;(a.affixes||[]).forEach(f=>{f.stat==="capacity"&&(g+=f.value)}),e=g>0?`🎒 +${g}`:""}const c=(a.affixes||[]).map(g=>Gt(g)).map(g=>`<span class="badge badge-dim">${g}</span>`).join(" "),$=a.description||`Một vật phẩm loại ${a.slot} cấp ${a.itemLevel} thuộc phẩm chất ${a.rarity}. Khí tức tỏa ra không tồi.`,d=a.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${a.craftedBy}</strong></div>`:"",r=t?a.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${a.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${a.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${a.rarity}"></span>
          <span class="item-name rarity-${a.rarity}" style="font-size:14px">${a.name}</span>
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
          ${Ot(a.slot,a.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${a.name}</strong> là loại ${a.baseType}. ${$}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${a.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${a.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${c||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${d}
          <div class="mt-2 flex justify-end">
            ${r}
          </div>
        </div>
      </div>
    </div>`}function Gt(a){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[a.stat]||a.stat,l=a.value>=0?"+":"";return a.type==="flat"?`${l}${a.value} ${e}`:a.type==="increase"?`${l}${a.value}% ${e}`:a.type==="more"?`×${l}${a.value}% ${e}`:`${l}${a.value} ${e}`}function it(a,t){var o,s,b,n,m,x,k;const{state:e,api:l,notify:c,renderGame:$}=t,d=Object.values(e.player.equipment||{}),r=e.player,g=e.medicines||[],f=r.medCooldownRemaining||0,T=e.inventoryTab||"equipped",y=r.skills&&r.skills.some(w=>{const C=typeof w=="string"?w:w.id;return C==="duoc_ly"||C==="y_thuat"}),i=d.find(w=>w.slot==="ring1"),u=d.find(w=>w.slot==="ring2");let v=20;((i==null?void 0:i.id)==="tui_tru_vat"||(o=i==null?void 0:i.baseType)!=null&&o.includes("tru_vat"))&&(v+=((b=(s=i.affixes)==null?void 0:s[0])==null?void 0:b.value)||10),((u==null?void 0:u.id)==="tui_tru_vat"||(n=u==null?void 0:u.baseType)!=null&&n.includes("tru_vat"))&&(v+=((x=(m=u.affixes)==null?void 0:m[0])==null?void 0:x.value)||10),a.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(r.inventory||[]).length} / ${v})</span></h1>
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
          Đan Dược ${f>0?`<span style="color:var(--orange); font-size:11px">(${f}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const h=document.getElementById("invTabContent"),p=()=>{h.querySelectorAll("[data-eid]").forEach(w=>{w.addEventListener("click",async C=>{C.stopPropagation();try{const E=await l.equipItem(e.playerId,w.dataset.eid);e.player=E.player,c(E.message,"success"),$()}catch(E){c(E.message||"Lỗi trang bị","error")}})}),h.querySelectorAll("[data-use]").forEach(w=>{w.addEventListener("click",async C=>{C.stopPropagation();try{const E=await l.useItem(e.playerId,w.dataset.use);e.player=E.player,c(E.message,"success"),$()}catch(E){c(E.message||"Lỗi sử dụng","error")}})})};if(T==="equipped"){const w=r.equipment||{},C=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];h.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${C.map(E=>{const P=w[E.key],I=P&&P.id,O=I?`rarity-${P.rarity}`:"";return`
            <div style="background:${I?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${I?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${E.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${E.name}</div>
              ${I?`<div style="font-size:11px;font-weight:600" class="${O}">${P.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${P.rarity}] Lv${P.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${d.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${d.filter(E=>E&&E.id).map(E=>ct(E,!1)).join("")}
      `:""}
    `,p()}else if(T==="medicine")h.innerHTML=`
      <div style="padding:12px">
        ${f>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${f}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${f/300*100}%;background:var(--orange)"></div></div>
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
                  ${w.toxicity&&y?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${w.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${w.penalty&&y?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${w.penalty.map(C=>`Giảm ${Math.abs(C.value)*100}% ${C.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${w.id}" 
                ${f+(w.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,h.querySelectorAll("[data-med]").forEach(w=>{w.addEventListener("click",async()=>{try{const C=await l.useMedicine(e.playerId,w.dataset.med);e.player=C.player,c(C.message,"success"),$()}catch(C){c(C.message||"Đan độc quá nồng!","error")}})});else{const w=r.inventory||[];let C=[];T==="weapon"?C=w.filter(E=>E.slot==="weapon"&&E.category!=="manual"):T==="armor"?C=w.filter(E=>["body","shield","feet"].includes(E.slot)):T==="accessory"?C=w.filter(E=>["ring","amulet","ring1","ring2"].includes(E.slot)):T==="manual"&&(C=w.filter(E=>E.category==="manual")),h.innerHTML=`
      ${C.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':C.map(E=>ct(E,!0)).join("")}
    `,p()}a.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{e.inventoryTab=w.dataset.tab,it(a,t)})}),(k=document.getElementById("btnGen"))==null||k.addEventListener("click",async()=>{const w=["common","rare","epic","legendary"];try{const C=await l.generateItem(e.playerId,w[Math.floor(Math.random()*w.length)]);e.player=C.player,e.items=C.items||[],c(C.message,"success"),it(a,t)}catch{c("Lỗi tạo ngẫu nhiên","error")}})}let Y=null;function yt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;e._dungeon||(e._dungeon={mapItems:[],timedDungeons:[],permanentDungeons:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const r=e._dungeon;Y&&(clearInterval(Y),Y=null);async function g(){try{const[n,m]=await Promise.all([l.getMapItems(d),l.getDungeonHistory(d)]);r.mapItems=n.mapItems||[],r.timedDungeons=n.timedDungeons||[],r.permanentDungeons=n.permanentDungeons||[],r.activeRun=n.activeRun||null,r.history=m.history||[],r.loaded=!0,y(),T()}catch(n){c(n.message||"Lỗi tải Bí Cảnh","error")}}function f(n){if(n<=0)return"Đã hết hạn";const m=Math.floor(n/3600),x=Math.floor(n%3600/60),k=Math.floor(n%60);return m>0?`${m}h ${x<10?"0":""}${x}m ${k<10?"0":""}${k}s`:`${x}m ${k<10?"0":""}${k}s`}function T(){r.timedDungeons.length!==0&&(Y=setInterval(()=>{let n=!1;r.timedDungeons.forEach(m=>{if(m.remainingSeconds>0){m.remainingSeconds-=1;const x=a.querySelector(`#countdown-${m.id}`);x&&(x.textContent=f(m.remainingSeconds))}else n=!0}),n&&(clearInterval(Y),Y=null,g())},1e3))}function y(){a.innerHTML=`
      <div class="page-header" style="margin-bottom:16px">
        <h2 style="display:flex;align-items:center;gap:8px">
          <span>⚡ Bí Cảnh Bát Hoang</span>
        </h2>
        <p class="page-sub" style="font-size:13px;line-height:1.5">
          Khám phá các di tích thần bí. Gồm <strong>Huyễn Cảnh Có Thời Hạn</strong> (xuất hiện chốc lát rồi biến mất) và <strong>Cấm Địa Thượng Cổ Vĩnh Cửu</strong> (quái vật cuồng bạo x2.0 ~ x3.5 sức mạnh).
        </p>
      </div>

      ${r.activeRun?i():u()}

      ${r.lastResult?o():""}

      ${s()}
    `,b()}function i(){var w,C;const n=r.activeRun,m=n.currentWave===n.totalWaves,x=((n.currentWave-1)/n.totalWaves*100).toFixed(0),k=(n.difficultyMult||1)>=2;return`
      <div class="panel" style="border-color:${k?"var(--red)":"var(--gold)"};margin-bottom:16px;box-shadow: 0 0 15px rgba(${k?"239, 68, 68":"234, 179, 8"}, 0.2)">
        <div class="panel-title" style="color:${k?"var(--red)":"var(--gold)"};display:flex;justify-content:space-between;align-items:center">
          <span>⚡ Đang Trong Bí Cảnh</span>
          ${k?`<span class="badge" style="background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid #ef4444;font-size:11px">⚠️ Quái Hung Hiểm x${n.difficultyMult}</span>`:""}
        </div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:16px;font-weight:700;margin-bottom:6px;color:var(--text-bright)">${n.dungeonName||n.dungeonId}</div>
          <div style="font-size:12px;opacity:0.7;margin-bottom:10px">
            ${m?"🔥 TẦNG CUỐI CÙNG — TRÙM BÍ CẢNH TRẤN THỦ!":`Đang vượt ải tầng ${n.currentWave} / ${n.totalWaves}`}
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:10px;overflow:hidden">
              <div style="width:${x}%;height:100%;background:linear-gradient(90deg,var(--blue),${k?"#ef4444":"var(--gold)"});border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;font-weight:600;opacity:0.8">Tầng ${n.currentWave}/${n.totalWaves}</span>
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn ${k?"btn--red":"btn--gold"}" id="btnFight" style="flex:1;font-weight:700" ${((w=e.player)==null?void 0:w.hospitalRemaining)>0?"disabled":""}>
              ${m?"🐉 Đại Chiến Trùm Cuối!":"⚔️ Chiến Đấu Tầng "+n.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Rút Lui</button>
          </div>
          ${((C=e.player)==null?void 0:C.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:10px">🏥 Đang trọng thương, chờ hồi phục khí huyết...</div>':""}
        </div>
      </div>
    `}function u(){return`
      <!-- SECTION 1: TIMED SECRET REALMS -->
      <div class="panel" style="margin-bottom:16px;border-color:rgba(168, 85, 247, 0.4)">
        <div class="panel-title" style="color:#c084fc;display:flex;align-items:center;justify-content:space-between">
          <span style="display:flex;align-items:center;gap:6px">⏳ Bí Cảnh Huyễn Cảnh (Có Thời Hạn)</span>
          <span class="badge" style="background:rgba(168,85,247,0.2);color:#d8b4fe;border:1px solid rgba(168,85,247,0.4);font-size:11px">
            ${r.timedDungeons.length} Khả Dụng
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
            ${r.permanentDungeons.length} Cấm Địa
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
          <span style="font-size:12px;opacity:0.6">${r.mapItems.length} Mẫu Đồ</span>
        </div>
        <div class="panel-body no-pad">
          ${p()}
        </div>
      </div>
    `}function v(){return r.timedDungeons.length===0?`
        <div style="text-align:center;opacity:0.6;padding:24px 16px;font-size:13px">
          🌀 Hiện tại chưa phát hiện Huyễn Cảnh nào.<br>
          <span style="font-size:12px;opacity:0.8">Hãy đi <strong>Khám Phá</strong> tại các vùng đất để nắm bắt cơ duyên phát hiện ảo cảnh sắp tiêu tán!</span>
        </div>
      `:r.timedDungeons.map(n=>{var k;const x=(((k=e.player)==null?void 0:k.realm)??1)>=n.requiredRealm;return`
        <div class="list-item" style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.06);align-items:flex-start;gap:12px">
          <div style="font-size:26px;width:36px;text-align:center;padding-top:2px">🌀</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
              <span style="font-weight:700;color:#e9d5ff;font-size:15px">${n.name}</span>
              <span class="badge" style="background:rgba(168,85,247,0.25);color:#d8b4fe;border:1px solid #c084fc;font-size:11px;font-weight:700">
                ⏳ Còn <span id="countdown-${n.id}">${f(n.remainingSeconds)}</span>
              </span>
              <span class="badge bg-darker text-xs">Cảnh giới ${n.requiredRealm}+</span>
            </div>
            <div style="font-size:12px;opacity:0.8;line-height:1.4;margin-bottom:6px">${n.description}</div>
            <div style="font-size:11px;opacity:0.6;display:flex;gap:12px;flex-wrap:wrap">
              <span>🏰 ${n.totalWaves} Tầng thử thách</span>
              <span>🐉 Thủ Vệ: <strong>${n.bossName}</strong></span>
              <span>🎁 Thưởng: Dược liệu, Linh thạch, Đan dược</span>
            </div>
          </div>
          <div style="align-self:center">
            <button class="btn btn--sm btn--gold" data-enter-disc="${n.id}" ${x?"":"disabled"}>
              ${x?"⚡ Tiến Vào":"🔒 Cảnh Giới Thấp"}
            </button>
          </div>
        </div>
      `}).join("")}function h(){return r.permanentDungeons.length===0?`
        <div style="text-align:center;opacity:0.6;padding:24px 16px;font-size:13px">
          🌋 Chưa khai mở Cấm Địa Thượng Cổ nào.<br>
          <span style="font-size:12px;opacity:0.8">Khi đi <strong>Khám Phá</strong>, bạn có cơ hội đào phá phong ấn cổ xưa để mở khóa Cấm Địa Vĩnh Viễn!</span>
        </div>
      `:r.permanentDungeons.map(n=>{var w;const x=(((w=e.player)==null?void 0:w.realm)??1)>=n.requiredRealm,k=n.difficultyMult||2;return`
        <div class="list-item" style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.06);align-items:flex-start;gap:12px;background:rgba(239,68,68,0.03)">
          <div style="font-size:26px;width:36px;text-align:center;padding-top:2px">🔱</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
              <span style="font-weight:700;color:#fca5a5;font-size:15px">${n.name}</span>
              <span class="badge" style="background:rgba(239,68,68,0.25);color:#fca5a5;border:1px solid #ef4444;font-size:11px;font-weight:700">
                ⚠️ QUÁI CỰC HUNG HIỂM (x${k})
              </span>
              <span class="badge" style="background:rgba(16,185,129,0.15);color:#6ee7b7;font-size:11px">
                ${n.isCleared?`🏆 Đã phá ${n.clearCount} lần`:"Chưa Chinh Phục"}
              </span>
            </div>
            <div style="font-size:12px;opacity:0.8;line-height:1.4;margin-bottom:6px">${n.description}</div>
            <div style="font-size:11px;opacity:0.6;display:flex;gap:12px;flex-wrap:wrap">
              <span>🏰 ${n.totalWaves} Tầng tử chiến</span>
              <span>🐉 Trùm Cấm Địa: <strong style="color:#f87171">${n.bossName}</strong></span>
              <span>💎 Thưởng Thượng Cổ: Cực phẩm nội đan, Ngọc giản quý, Hoàn Cốt Đan</span>
            </div>
          </div>
          <div style="align-self:center">
            <button class="btn btn--sm btn--red" data-enter-disc="${n.id}" ${x?"":"disabled"}>
              ${x?"🔥 Khiêu Chiến":"🔒 Cảnh Giới Thấp"}
            </button>
          </div>
        </div>
      `}).join("")}function p(){return r.mapItems.length===0?`
        <div style="text-align:center;opacity:0.5;padding:20px;font-size:13px">
          Chưa có Ngọc Giản nào trong Túi Đồ. Hãy đánh bại quái vật để có cơ hội nhận Ngọc Giản!
        </div>
      `:r.mapItems.map(n=>{const m=n.dungeon;return`
        <div class="list-item" style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div class="item-info" style="flex:1">
            <div class="item-name" style="font-size:14px;font-weight:600">
              ${n.item.icon} ${n.item.name} <span style="opacity:0.5;font-size:12px">x${n.quantity}</span>
            </div>
            ${m?`
              <div class="item-meta" style="font-size:12px;opacity:0.7">
                ${m.name} · T${m.tier} · ${m.waves+1} tầng · Boss: ${m.bossName}
              </div>
            `:""}
          </div>
          ${m?`<button class="btn btn--sm btn--gold" data-enter="${n.item.id}">⚡ Kích Hoạt</button>`:""}
        </div>
      `}).join("")}function o(){var k,w;const n=r.lastResult,m=n.result==="dungeon_complete"?"🏆":n.result==="wave_cleared"?"✅":"💀",x=n.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:16px;border-color:${x}">
        <div class="panel-title" style="color:${x}">${m} Kết Quả Chiến Đấu</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px;font-size:14px">${n.message}</div>
          ${(k=n.loot)!=null&&k.length?`
            <div style="margin-bottom:10px;padding:8px;background:rgba(16,185,129,0.1);border-radius:6px;border:1px solid rgba(16,185,129,0.2)">
              <div style="font-size:11px;font-weight:700;color:var(--green);margin-bottom:4px">🎁 CHIẾN LỢI PHẨM THU ĐƯỢC:</div>
              ${n.loot.map(C=>`<div style="font-size:12px;color:var(--green)">${C}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.6">📜 Xem chi tiết diễn biến (${((w=n.combatLog)==null?void 0:w.length)||0} lượt)</summary>
            <div style="max-height:160px;overflow-y:auto;font-size:11px;opacity:0.7;margin-top:6px;padding:8px;background:rgba(0,0,0,0.3);border-radius:6px">
              ${(n.combatLog||[]).map(C=>`<div>${C}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function s(){return r.history.length===0?"":`
      <div class="panel" style="margin-top:16px">
        <div class="panel-title">📚 Lịch Sử Khiêu Chiến Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:220px;overflow-y:auto">
          ${r.history.map(n=>{const m=n.status==="completed"?"✅":n.status==="failed"?"❌":n.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:10px 14px;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04)">
                <span style="color:${n.status==="completed"?"var(--green)":n.status==="failed"?"var(--red)":"var(--orange)"};font-weight:600">${m} ${n.dungeonName}</span>
                <span style="opacity:0.5;margin-left:auto">Tầng ${n.wave}/${n.totalWaves} · ${new Date(n.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function b(){var n,m;document.querySelectorAll("[data-enter-disc]").forEach(x=>{x.addEventListener("click",async()=>{const k=x.dataset.enterDisc;if(confirm("⚡ Quyết định tiến vào Bí Cảnh này để khiêu chiến?")){x.disabled=!0;try{const w=await l.enterDiscoveredDungeon(d,k);c(w.message,"success"),e.player=w.player,$(),r.activeRun=w.run,r.lastResult=null,await g()}catch(w){c(w.message,"error"),x.disabled=!1}}})}),document.querySelectorAll("[data-enter]").forEach(x=>{x.addEventListener("click",async()=>{const k=x.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và mở lối vào Bí Cảnh?")){x.disabled=!0;try{const w=await l.enterDungeon(d,k);c(w.message,"success"),e.player=w.player,$(),r.activeRun=w.run,r.lastResult=null,await g()}catch(w){c(w.message,"error"),x.disabled=!1}}})}),(n=document.getElementById("btnFight"))==null||n.addEventListener("click",async()=>{const x=document.getElementById("btnFight");x.disabled=!0,x.textContent="⏳ Đang giao chiến...";try{const k=await l.fightDungeonWave(d);e.player=k.player,$(),r.lastResult=k,k.result==="dungeon_complete"||k.result==="dungeon_failed"?r.activeRun=null:k.result==="wave_cleared"&&(r.activeRun.currentWave=k.nextWave),y()}catch(k){c(k.message,"error"),x.disabled=!1,x.textContent="⚔️ Chiến Đấu"}}),(m=document.getElementById("btnAbandon"))==null||m.addEventListener("click",async()=>{if(confirm("🚪 Rút lui khỏi Bí Cảnh? Tiến trình hiện tại sẽ bị hủy!"))try{await l.abandonDungeon(d),c("Đã rời khỏi Bí Cảnh an toàn.","info"),r.activeRun=null,r.lastResult=null,await g()}catch(x){c(x.message,"error")}})}r.loaded?(y(),T()):g()}function xt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const r=e._tc;async function g(){try{r.data=await l.request(`/player/${d}/atlas-maps`),r.loaded=!0,f()}catch(h){c(h.message,"error")}}function f(){const h=r.data,p=(h==null?void 0:h.atlas)||{},o=(h==null?void 0:h.maps)||[],s=h==null?void 0:h.activeRun,b=(h==null?void 0:h.allMaps)||[];h!=null&&h.modifiers,a.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${p.completed||0}/${p.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${p.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${p.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${p.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${r.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${r.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${o.length})</button>
        ${s?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,a.querySelectorAll("[data-tab]").forEach(m=>{m.addEventListener("click",()=>{r.tab=m.dataset.tab,f()})});const n=document.getElementById("tcContent");n&&(s&&r.tab==="run"?u(n,s):r.tab==="inventory"?y(n,o):T(n,b,p))}function T(h,p,o){var b;const s=((b=r.data)==null?void 0:b.tiers)||[];h.innerHTML=s.map(n=>{const m=p.filter(x=>x.tier===n.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${n.tier} ${n.name} <span style="opacity:0.4;font-size:11px">(Realm ${n.requiredRealm}+, ${n.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${m.map(x=>{var C;const k=((C=o.progress)==null?void 0:C[x.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[x.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${k?700:400}">${x.name}</span>
                ${k?`<span style="color:var(--green);font-size:11px">✅ ×${k}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function y(h,p,o){if(p.length===0){h.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}h.innerHTML=p.map((s,b)=>{const n=s.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${v(s.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${s.mapName||s.mapId} <span style="color:${v(s.tier)};font-size:12px">T${s.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${n.length>0?n.map(m=>m.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${n.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${b}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${b}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),h.querySelectorAll(".btn-open-map").forEach(s=>{s.addEventListener("click",async()=>{try{const b=await l.request(`/player/${d}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(s.dataset.idx)})});c(b.message,"success"),e.player=b.player,$(),r.tab="run",await g()}catch(b){c(b.message,"error")}})}),h.querySelectorAll(".btn-add-mod").forEach(s=>{s.addEventListener("click",()=>i(parseInt(s.dataset.idx)))})}function i(h){var s;const p=((s=r.data)==null?void 0:s.modifiers)||[],o=document.createElement("div");o.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",o.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${p.map(b=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${b.id}">
          <span style="flex:1"><strong>${b.name}</strong><br><span style="font-size:11px;opacity:0.6">${b.desc} · IIQ +${b.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,o.addEventListener("click",async b=>{const n=b.target.closest("[data-modid]");if(n)try{const m=await l.request(`/player/${d}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:h,modifierId:n.dataset.modid})});c(m.message,"success"),e.player=m.player,$(),o.remove(),await g()}catch(m){c(m.message,"error")}else b.target===o&&o.remove()}),document.body.appendChild(o)}function u(h,p){var b,n;const o=p.currentWave/p.totalWaves*100,s=p.modifiers||[];h.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${p.mapName} <span style="color:${v(p.tier)}">T${p.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${p.currentWave}/${p.totalWaves}
            ${s.length>0?" · "+s.map(m=>m.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${o}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${r.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(b=document.getElementById("btnTCFight"))==null||b.addEventListener("click",async()=>{r.fighting=!0,f();try{const m=await l.request(`/player/${d}/atlas-maps/fight`,{method:"POST"});e.player=m.player,$();const x=m.result!=="map_failed";c(m.message,x?"success":"error"),r.fighting=!1,(m.result==="map_complete"||m.result==="map_failed")&&(r.tab="atlas"),await g()}catch(m){c(m.message,"error"),r.fighting=!1,f()}}),(n=document.getElementById("btnTCQuit"))==null||n.addEventListener("click",async()=>{try{await l.request(`/player/${d}/atlas-maps/abandon`,{method:"POST"}),c("Đã rời Tiên Cảnh","info"),r.tab="atlas",await g()}catch(m){c(m.message,"error")}})}function v(h){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[h]||"#666"}r.loaded?f():g()}function ft(a,t){const{state:e}=t,l=e._travelTab||"map";a.innerHTML=`
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
  `,a.querySelectorAll(".tab-btn").forEach($=>{$.addEventListener("click",()=>{e._travelTab=$.dataset.tab,ft(a,t)})});const c=a.querySelector("#travelTabContent");l==="map"?Z(c,t):l==="dungeon"?yt(c,t):xt(c,t)}async function Z(a,t){var d;const{state:e,api:l,notify:c,updateSidebar:$}=t;a.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[r,g]=await Promise.all([l.request("/data/areas"),l.request(`/player/${e.playerId}/area`)]),f=r.areas||[],T=g.area,y=g.player,i=g.traveling||!1,u=g.travelRemaining||0,v=g.travelDestination||"";g.message&&c(g.message,"success"),g.player&&(e.player=g.player,$());const h=e.exploration||{},p=h[(y==null?void 0:y.currentArea)||"thanh_lam_tran"],o=(T==null?void 0:T.name)||(p==null?void 0:p.name)||"Vùng Đất Vô Danh",s=(p==null?void 0:p.staminaCost)||10,b={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận",cuu_u_than_uyen:"👿 Cửu U ma khí: +35% ST, +20% Tốc Độ",thai_co_hong_hoang:"🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp",chu_thien_tinh_hai:"🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn",hon_don_tien_vuc:"🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số",hon_nguyen_dao_canh:"👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính"},n=b[y==null?void 0:y.currentArea]||"",m=[...f].sort((x,k)=>(x.sort_order||x.mapY||0)-(k.sort_order||k.mapY||0));if(a.innerHTML=`
      ${i?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${v}</span></strong>
            <div id="travelTimer" style="font-size:26px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 12px rgba(255,215,0,0.4)">⏳ ${u}s</div>
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
                  ${o}
                  <span class="badge" style="background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.4);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${s} TL/lần</div>
              </div>
            </div>
            ${T!=null&&T.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${T.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${(T==null?void 0:T.min_level)||1}+</span>
              ${n?`<span class="badge" style="background:rgba(255,215,0,0.1);color:var(--gold);border:1px solid rgba(255,215,0,0.25);font-size:11px">${n}</span>`:""}
              ${(d=p==null?void 0:p.specialtyNames)!=null&&d.length?`<span class="badge" style="background:rgba(234,179,8,0.12);color:#facc15;border:1px solid rgba(234,179,8,0.3);font-size:11px">💎 Đặc Sản: ${p.specialtyNames.join(" · ")}</span>`:""}
            </div>
          </div>
        </div>
      `}

      <!-- 2D REALM MAP OVERVIEW -->
      <div class="panel">
        <div class="panel-title flex items-center justify-between">
          <span>🗺️ Thiên Địa Giới Đồ (2D Bát Hoang Tinh Đồ)</span>
          <span class="text-xs text-dim">${m.length} Khu vực</span>
        </div>
        <div class="panel-body" style="background:linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(10,15,28,0.95) 100%); padding:12px">
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px">
            ${m.map((x,k)=>{var R,K,z,N;const w=h[x.id],C=x.id===y.currentArea&&!i,E=y.level<(x.min_level||1),P=parseInt(x.travel_time)||0,I=parseInt(x.stamina_cost)||(w==null?void 0:w.staminaCost)||10,O=b[x.id]||"",q=x.tier||"Bát Hoang",L=I>=100?"rgba(239,68,68,0.2)":I>=40?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)",M=I>=100?"var(--red)":I>=40?"var(--gold)":"var(--text-dim)";let S="rgba(255,255,255,0.08)",B="rgba(255,255,255,0.03)";return C?(S="rgba(34, 197, 94, 0.6)",B="rgba(34, 197, 94, 0.08)"):E&&(S="rgba(239, 68, 68, 0.2)",B="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${C?"current-realm":""} ${E?"locked-realm":""}" 
                     style="border:1px solid ${S}; background:${B}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${C?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${C?"var(--green)":E?"var(--text-dim)":"var(--text-bright)"}">
                        #${k+1} ${x.name}
                      </div>
                      ${E?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      🏛️ ${q}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${x.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${E?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${E?"var(--red)":"var(--text-dim)"}">
                        Lv.${x.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${P>0?`⏱ ${P}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${L}; color:${M}; border:1px solid ${L}">
                        🏃 -${I} TL (Dò thám)
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
                    ${C?`
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(34,197,94,0.2); color:var(--green); border:1px solid rgba(34,197,94,0.4)">
                        📍 Đang tọa trấn
                      </button>
                    `:E?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${x.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${x.id}" ${i?"disabled":""}>
                        ${P>0?`🚶 Vi Hành (${P}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,a.querySelectorAll("[data-travel]").forEach(x=>{x.addEventListener("click",async k=>{k.stopPropagation();const w=x.dataset.travel;a.querySelectorAll("[data-travel]").forEach(C=>{C.tagName==="BUTTON"&&(C.disabled=!0),C.style.pointerEvents="none"});try{const C=await l.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:w})});C.player&&(e.player=C.player,$()),c(C.message,"success"),Z(a,t)}catch(C){c(C.message||"Lỗi di chuyển!","error"),Z(a,t)}})}),i&&u>0){let x=u;const k=u,w=setInterval(async()=>{x--;const C=document.getElementById("travelTimer"),E=document.getElementById("travelBar");if(C&&(C.textContent=`⏳ ${Math.max(0,x)}s`),E&&(E.style.width=`${Math.max(0,x/k*100)}%`),x<=0){clearInterval(w);try{const P=await l.request(`/player/${e.playerId}/travel-check`,{method:"POST"});P.player&&(e.player=P.player,$()),P.arrived&&c(P.message,"success"),Z(a,t)}catch{Z(a,t)}}},1e3)}}catch(r){a.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(r)}}function st(a,t){var s,b;const{state:e,renderGame:l,notify:c,updateSidebar:$}=t,d=e.player,r=e.recipes||[],g=e.medicines||[],f=e._alchemyTab||"recipes",T=n=>{const m=g.find(x=>x.id===n);return m?(m.icon||"💊")+" "+m.name:n};let y=0,i=0,u=0,v=0;(d.skills||[]).forEach(n=>{const m=typeof n=="string"?n:n.id,x=typeof n=="string"?1:n.level||1;m==="tinh_che"&&(y=x*2),m==="phu_an_thuat"&&(i=x*5),m==="linh_kiem_thuat"&&(u=x*10),m==="cuong_hoa_thuat"&&(v=x*15)});const h=n=>n.split("_").map(m=>m.charAt(0).toUpperCase()+m.slice(1)).join(" "),p=[];Object.values(d.equipment||{}).forEach(n=>{n&&p.push({...n,loc:"eq"})}),(d.inventory||[]).filter(n=>n.slot&&n.slot!=="consumable").forEach(n=>p.push({...n,loc:"inv"}));let o=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${f==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${f==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${y||i||u||v?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${y?`<span>🔥 Thành công +${y}%</span>`:""}
      ${i?`<span>💎 Giảm phí -${i}%</span>`:""}
      ${u?`<span>✨ Chất lượng +${u}%</span>`:""}
      ${v?`<span>⬆️ Nâng đôi ${v}%</span>`:""}
    </div>
    `:""}
  `;if(f==="recipes"){if(o+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!d.materials||Object.keys(d.materials).length===0)o+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[n,m]of Object.entries(d.materials))o+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${h(n)} <span style="color:var(--gold)">x${m}</span></div>`;o+="</div></div>",o+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',r.length===0?o+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':r.forEach(n=>{var E;const m=T(n.target),x=Math.min(100,(n.successRate||100)+y);let k="";(E=n.requirements)!=null&&E.skill&&(k=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${h(n.requirements.skill)} lv${n.requirements.level||1}</div>`);let w="";n.materials.forEach(P=>{var O;const I=((O=d.materials)==null?void 0:O[P.id])||0;w+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${I>=P.amount?"var(--green)":"var(--red)"};font-weight:bold">${I}/${P.amount}</span> ${h(P.id)}</span>`});const C=g.find(P=>P.id===n.target)||{};o+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${m}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${n.tier}</span>
                  <span>Tỉ lệ: <span style="color:${x>=80?"var(--green)":"var(--blue)"};font-weight:bold">${x}%</span></span>
                  <span>🔥 Phí: ${n.cost} L.Thạch</span>
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
                <strong>Thuộc Tính:</strong><br>${C.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${n.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),o+="</div></div>"}else o+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${p.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${p.map(n=>`<option value="${n.id}">${n.loc==="eq"?"🔸":"📦"} ${n.name||n.baseType} [${n.rarity||"?"}] ${(n.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(n=>{const m=Math.max(1,Math.round(n.cost*(1-i/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${n.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${n.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${n.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${n.id}" style="width:100%">
                💎 ${m} ${i>0?`<s style="opacity:0.4;font-size:10px">${n.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;a.innerHTML=o,a.querySelectorAll(".tab-btn").forEach(n=>{n.addEventListener("click",()=>{e._alchemyTab=n.dataset.tab,st(a,t)})}),a.querySelectorAll(".accordion-header").forEach(n=>{n.addEventListener("click",()=>{const m=n.nextElementSibling;m.style.display==="none"?(m.style.display="block",n.querySelector(".text-dim:last-child").textContent="▲"):(m.style.display="none",n.querySelector(".text-dim:last-child").textContent="▼")})}),a.querySelectorAll(".btn-craft").forEach(n=>{n.addEventListener("click",async m=>{m.stopPropagation();const x=r.find(k=>k.id===n.dataset.recipe);if(x&&d.gold<(x.cost||0))return c("Không đủ linh thạch!","error");try{const k=await D.craftItem(d.id,n.dataset.recipe);e.player=k.player,c(k.message,k.success?"success":"error"),l()}catch(k){c(k.message,"error")}})}),a.querySelectorAll(".btn-currency").forEach(n=>{n.addEventListener("click",async()=>{const m=document.getElementById("selItem");if(!(m!=null&&m.value))return c("Chọn trang bị trước!","error");const x=n.dataset.cid;let k=-1;if(x==="thien_menh_phu"){const w=p.find(P=>P.id===m.value),C=(w==null?void 0:w.affixes)||[];if(C.length===0)return c("Item không có affix để khóa!","error");const E=prompt(`Chọn affix để khóa (0-${C.length-1}):
${C.map((P,I)=>`${I}: ${P.name||P.stat} +${P.value}`).join(`
`)}`);if(E===null)return;if(k=parseInt(E),isNaN(k)||k<0||k>=C.length)return c("Chỉ số không hợp lệ!","error")}n.disabled=!0,n.textContent="⏳...";try{const w=await D.applyCurrency(d.id,x,m.value,k);c(w.message,"success"),e.player=w.player,$(),st(a,t)}catch(w){c(w.message,"error"),n.disabled=!1,n.textContent="💎 Dùng"}})}),(s=document.getElementById("selItem"))==null||s.addEventListener("change",()=>{const n=p.find(x=>x.id===document.getElementById("selItem").value),m=document.getElementById("itemPreview");n&&m&&(m.innerHTML=(n.affixes||[]).map(x=>`<span style="color:var(--blue)">• ${x.name||x.stat} +${x.value}</span>`).join(" | ")||"Không có affix")}),(b=document.getElementById("selItem"))==null||b.dispatchEvent(new Event("change"))}function $t(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;async function r(){try{const f=await l.getDailyQuests(d);e._dailyQuests=f,g()}catch(f){c(f.message,"error")}}function g(){const f=e._dailyQuests||{},T=f.quests||[];f.allCompleted;const y=f.bonusReward;a.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${T.map(i=>{const u=i.quest_info||{},v=i.target>0?Math.min(100,Math.round(i.progress/i.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${i.claimed?"var(--text-dim)":i.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${u.name||i.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${u.difficulty==="Khó"?"var(--red)":u.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${u.difficulty||"?"}</span>
              </div>
              ${i.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':i.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${i.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${i.progress}/${i.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${u.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${v}%;background:${i.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${u.goldReward||0} · ✨ ${u.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${y?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${y.gold} 💎, +${y.xp} EXP</div>
      </div>
      `:""}
    `,a.querySelectorAll(".btn-claim").forEach(i=>i.addEventListener("click",async()=>{try{const u=await l.claimDailyQuest(d,parseInt(i.dataset.qid));c(u.message,"success"),e.player=u.player,$(),await r()}catch(u){c(u.message,"error")}}))}r()}function Tt(a,t){const{state:e,api:l,notify:c,renderGame:$}=t,d=e._questTab||"npc";a.innerHTML=`
    <div class="page-header">
      <h2>📜 Thiên Cơ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ kỳ duyên NPC và nhiệm vụ nhật thường</p>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${d==="npc"?"active":""}" data-qtab="npc" style="flex:1;padding:10px;border:none;background:${d==="npc"?"rgba(255,255,255,0.08)":"transparent"};color:${d==="npc"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${d==="npc"?"700":"400"};border-bottom:2px solid ${d==="npc"?"var(--gold)":"transparent"};transition:all 0.2s">
        📜 Kỳ Duyên NPC
      </button>
      <button class="tab-btn ${d==="daily"?"active":""}" data-qtab="daily" style="flex:1;padding:10px;border:none;background:${d==="daily"?"rgba(255,255,255,0.08)":"transparent"};color:${d==="daily"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${d==="daily"?"700":"400"};border-bottom:2px solid ${d==="daily"?"var(--gold)":"transparent"};transition:all 0.2s">
        📋 Nhật Thường Hàng Ngày
      </button>
    </div>
    <div id="questTabContent">
      <div id="questList" class="quest-container">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,a.querySelectorAll("[data-qtab]").forEach(f=>{f.addEventListener("click",()=>{e._questTab=f.dataset.qtab,Tt(a,t)})});const r=a.querySelector("#questTabContent");if(d==="daily"){$t(r,t);return}g();async function g(){try{const T=(await l.getQuests(e.playerId)).quests||[],y=document.getElementById("questList");if(!y)return;if(T.length===0){y.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}y.innerHTML=T.map(i=>{const u=i.questAmount>0?Math.min(100,i.progress/i.questAmount*100):0,v=i.progress>=i.questAmount,h=i.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${v?"quest-done":""}" data-quest-id="${i.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${i.npcIcon||"🧓"} ${i.npcName||"NPC"}</span>
              <span class="quest-type">${h} ${i.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${i.questName||i.quest_id}</div>
            <div class="quest-desc">${i.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${v?"hp":"energy"}" style="width:${u}%"></div>
              </div>
              <span class="quest-progress-text">${i.progress}/${i.questAmount}</span>
            </div>
            ${v?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${i.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),y.querySelectorAll(".quest-complete-btn").forEach(i=>{i.addEventListener("click",async()=>{const u=i.dataset.qid;i.disabled=!0,i.textContent="⏳...";try{const v=await l.completeQuest(e.playerId,u);e.player=v.player,c(v.message,"success"),v.skillGained&&c(`🎯 Lĩnh ngộ: ${v.skillGained}!`,"success"),$()}catch(v){c(v.message||"Lỗi trả quest","error"),i.disabled=!1,i.textContent="✅ Trả Nhiệm Vụ"}})})}catch(f){console.error("Error loading quests:",f);const T=document.getElementById("questList");T&&(T.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function Kt(a,t){const{state:e,api:l,notify:c,renderGame:$}=t;if(e.player.role!=="admin"){a.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const d=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let r="monsters";a.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${d.map(o=>`
          <button class="admin-tab ${o.id===r?"active":""}" data-tab="${o.id}">${o.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",o=>{const s=o.target.closest(".admin-tab");s&&(r=s.dataset.tab,document.querySelectorAll(".admin-tab").forEach(b=>b.classList.remove("active")),s.classList.add("active"),g(r))}),g(r);async function g(o){const s=document.getElementById("adminContent");if(s){s.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const b=await l.request(`/admin/${o}?adminId=${e.playerId}`);f(o,b,s)}catch(b){s.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${b.message}</div></div>`}}}function f(o,s,b){o==="monsters"?T(s,b):o==="npcs"?y(s,b):o==="areas"?i(s,b):u(o,s,b)}function T(o,s){const b=o.monsters||[];s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${b.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${b.map(n=>{var m,x,k,w,C,E,P,I;return`
          <div class="admin-card" data-id="${n.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${n.name} ${n.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((x=(m=o.tierInfo)==null?void 0:m[n.tier])==null?void 0:x.color)||"#888"}">${((w=(k=o.tierInfo)==null?void 0:k[n.tier])==null?void 0:w.name)||"T"+n.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((C=n.stats)==null?void 0:C.hp)||"?"}</div>
              <div>💪 ${((E=n.stats)==null?void 0:E.strength)||"?"}</div>
              <div>🏃 ${((P=n.stats)==null?void 0:P.speed)||"?"}</div>
              <div>🛡 ${((I=n.stats)==null?void 0:I.defense)||"?"}</div>
            </div>
            <div class="admin-card-meta">
              <span>XP: ${n.xpReward||0}</span>
              <span>Gold: ${Array.isArray(n.goldReward)?n.goldReward.join("-"):n.goldReward}</span>
              ${n.areaId?`<span>📍 ${n.areaId}</span>`:""}
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${n.id}" data-type="monsters" data-key="monsters">✏️ Sửa</button>
          </div>
        `}).join("")}
      </div>
    `,h(s,o,"monsters","monsters")}function y(o,s){const b=o.npcs||[];s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${b.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${b.map(n=>`
          <div class="admin-card" data-id="${n.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${n.icon||"🧓"} ${n.name}</span>
              <span class="badge" style="background:var(--purple)">${n.profession}</span>
            </div>
            <div class="admin-card-meta">
              <span>Quests: ${(n.quests||[]).length}</span>
              <span>Areas: ${(n.areaIds||[]).join(", ")}</span>
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${n.id}" data-type="npcs" data-key="npcs">✏️ Sửa</button>
          </div>
        `).join("")}
      </div>
    `,h(s,o,"npcs","npcs")}function i(o,s){const b=Object.keys(o);s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${b.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${b.map(n=>{const m=o[n];return`
            <div class="admin-card" data-id="${n}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${m.name||n}</span>
                <span class="badge" style="background:var(--orange)">⚡${m.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(m.events||[]).map(x=>`<span>${x.type}: ${x.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${n}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,s.querySelectorAll(".admin-edit-area").forEach(n=>{n.addEventListener("click",()=>{const m=n.dataset.id,x=o[m];v(m,x,`areas/${m}`)})})}function u(o,s,b){var x;const n=JSON.stringify(s,null,2),m=n.split(`
`).length;b.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${o} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(m+5,30)}">${p(n)}</textarea>
    `,(x=document.getElementById("btnSaveGeneric"))==null||x.addEventListener("click",async()=>{try{const k=document.getElementById("genericEditor").value,w=JSON.parse(k);c("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(k){c("JSON không hợp lệ: "+k.message,"error")}})}function v(o,s,b,n){const m=JSON.stringify(s,null,2),x=document.createElement("div");x.className="admin-modal-overlay",x.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${o}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${p(m)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(x),x.querySelectorAll(".admin-modal-close").forEach(k=>{k.addEventListener("click",()=>x.remove())}),x.addEventListener("click",k=>{k.target===x&&x.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const k=document.getElementById("modalEditor").value,w=JSON.parse(k);await l.request(`/admin/${b}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:w})}),c("✅ Đã lưu!","success"),x.remove(),g(r)}catch(k){c("Lỗi: "+k.message,"error")}})}function h(o,s,b,n){o.querySelectorAll(".admin-edit-btn").forEach(m=>{m.addEventListener("click",()=>{const x=m.dataset.id,w=(s[n]||[]).find(C=>C.id===x);w&&v(x,w,`${b}/${x}`)})})}function p(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function kt(a,t){const{state:e,api:l,notify:c,renderGame:$,updateSidebar:d}=t,r=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const g=e._social;async function f(){try{const h=await l.getRelationships(r);g.relationships=h,g.loaded=!0,T()}catch(h){c(h.message||"Lỗi tải dữ liệu Giao Tế","error")}}function T(){const{friends:h,enemies:p,pendingSent:o,pendingReceived:s}=g.relationships,b=s.length;a.innerHTML=`
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
            ${g.searchResults.map(n=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${n.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm} · ${n.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${n.id!==r?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${n.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${n.id}">⚔️ Kẻ Thù</button>
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
          ⚔️ Kẻ Thù (${p.length})
        </button>
        <button class="btn btn--sm ${g.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${b>0?`<span class="badge">${b}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${g.tab==="friends"?y(h):""}
        ${g.tab==="enemies"?i(p):""}
        ${g.tab==="pending"?u(s,o):""}
      </div>
    `,v()}function y(h){return h.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':h.map(p=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${p.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${p.level} · ${p.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${p.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${p.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function i(h){return h.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':h.map(p=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${p.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${p.level} · ${p.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${p.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${p.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function u(h,p){let o="";return h.length>0&&(o+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',o+=h.map(s=>`
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
      `).join("")),p.length>0&&(o+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',o+=p.map(s=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${s.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${s.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),h.length===0&&p.length===0&&(o='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),o}function v(){var h,p;(h=document.getElementById("btnSearch"))==null||h.addEventListener("click",async()=>{var s;const o=(s=document.getElementById("socialSearch"))==null?void 0:s.value.trim();if(!o||o.length<2)return c("Cần ít nhất 2 ký tự","error");g.searchQuery=o;try{const b=await l.searchPlayers(o);g.searchResults=b.players||[],T()}catch(b){c(b.message,"error")}}),(p=document.getElementById("socialSearch"))==null||p.addEventListener("keydown",o=>{var s;o.key==="Enter"&&((s=document.getElementById("btnSearch"))==null||s.click())}),document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{g.tab=o.dataset.tab,T()})}),document.querySelectorAll("[data-action]").forEach(o=>{o.addEventListener("click",async()=>{const s=o.dataset.action,b=o.dataset.target;o.disabled=!0;try{let n;switch(s){case"add-friend":n=await l.addFriend(r,b);break;case"accept-friend":n=await l.acceptFriend(r,b);break;case"reject-friend":n=await l.rejectFriend(r,b);break;case"remove-friend":n=await l.removeFriend(r,b);break;case"add-enemy":n=await l.addEnemy(r,b);break;case"remove-enemy":n=await l.removeEnemy(r,b);break}c(n.message||"Thành công!","success"),await f()}catch(n){c(n.message||"Lỗi!","error"),o.disabled=!1}})})}g.loaded?T():f()}function wt(a,t){const{state:e,api:l,notify:c}=t,$=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const d=e._chat;async function r(){try{const[p,o]=await Promise.all([l.getGlobalChat(),l.getChatFriends($)]);d.globalMessages=p.messages||[],d.friends=o.friends||[],d.globalMessages.length>0&&(d.lastGlobalId=d.globalMessages[d.globalMessages.length-1].id),d.loaded=!0,T(),g()}catch(p){c(p.message||"Lỗi tải chat","error")}}function g(){f(),d.pollTimer=setInterval(async()=>{try{if(d.tab==="global"){const p=await l.getGlobalChat(d.lastGlobalId);p.messages&&p.messages.length>0&&(d.globalMessages.push(...p.messages),d.globalMessages.length>100&&(d.globalMessages=d.globalMessages.slice(-100)),d.lastGlobalId=d.globalMessages[d.globalMessages.length-1].id,i(),u())}else if(d.tab==="private"&&d.selectedFriend){const p=await l.getPrivateChat($,d.selectedFriend.id,d.lastPrivateId);p.messages&&p.messages.length>0&&(d.privateMessages.push(...p.messages),d.privateMessages.length>100&&(d.privateMessages=d.privateMessages.slice(-100)),d.lastPrivateId=d.privateMessages[d.privateMessages.length-1].id,i(),u())}}catch{}},5e3)}function f(){d.pollTimer&&(clearInterval(d.pollTimer),d.pollTimer=null)}function T(){const p=d.tab==="global"?d.globalMessages:d.privateMessages;a.innerHTML=`
      <div class="page-header">
        <h2>💬 Giang Hồ Truyền Âm</h2>
        <p class="page-sub">Giao lưu với các đạo hữu trong giang hồ</p>
      </div>

      <div class="chat-tabs" style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn btn--sm ${d.tab==="global"?"btn--blue":"btn--dark"}" data-chat-tab="global">🌍 Toàn Cầu</button>
        <button class="btn btn--sm ${d.tab==="private"?"btn--blue":"btn--dark"}" data-chat-tab="private">📨 Riêng</button>
        ${d.tab==="private"?`
          <select id="friendSelect" style="flex:1;padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
            <option value="">-- Chọn Đạo Hữu --</option>
            ${d.friends.map(o=>{var s;return`<option value="${o.id}" ${((s=d.selectedFriend)==null?void 0:s.id)===o.id?"selected":""}>${o.name} (Lv.${o.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${y(p)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${d.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,h(),u()}function y(p){return p.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':p.map(o=>{const s=o.sender_id===$,b=new Date(o.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${s?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${b}</span>
          <span style="font-weight:600;color:${s?"var(--blue)":"var(--gold)"}"> ${o.sender_name}</span>
          <span style="opacity:0.8">: ${v(o.message)}</span>
        </div>
      `}).join("")}function i(){const p=document.getElementById("chatMessages");if(!p)return;const o=d.tab==="global"?d.globalMessages:d.privateMessages;p.innerHTML=y(o)}function u(){const p=document.getElementById("chatMessages");p&&(p.scrollTop=p.scrollHeight)}function v(p){const o=document.createElement("div");return o.textContent=p,o.innerHTML}function h(){var o,s,b;document.querySelectorAll("[data-chat-tab]").forEach(n=>{n.addEventListener("click",()=>{d.tab=n.dataset.chatTab,d.tab==="global"&&(d.lastGlobalId=d.globalMessages.length>0?d.globalMessages[d.globalMessages.length-1].id:0),T(),g()})}),(o=document.getElementById("friendSelect"))==null||o.addEventListener("change",async n=>{const m=n.target.value;if(!m){d.selectedFriend=null,d.privateMessages=[],T();return}d.selectedFriend=d.friends.find(x=>x.id===m)||null,d.lastPrivateId=0;try{const x=await l.getPrivateChat($,m);d.privateMessages=x.messages||[],d.privateMessages.length>0&&(d.lastPrivateId=d.privateMessages[d.privateMessages.length-1].id),i(),u()}catch(x){c(x.message,"error")}});const p=async()=>{var x,k;const n=document.getElementById("chatInput"),m=n==null?void 0:n.value.trim();if(m){if(d.tab==="private"&&!d.selectedFriend)return c("Chọn Đạo Hữu trước!","error");try{if(await l.sendChat($,d.tab,d.tab==="private"?d.selectedFriend.id:null,m),n.value="",d.tab==="global"){const w=await l.getGlobalChat(d.lastGlobalId);((x=w.messages)==null?void 0:x.length)>0&&(d.globalMessages.push(...w.messages),d.lastGlobalId=d.globalMessages[d.globalMessages.length-1].id)}else{const w=await l.getPrivateChat($,d.selectedFriend.id,d.lastPrivateId);((k=w.messages)==null?void 0:k.length)>0&&(d.privateMessages.push(...w.messages),d.lastPrivateId=d.privateMessages[d.privateMessages.length-1].id)}i(),u()}catch(w){c(w.message||"Lỗi gửi tin nhắn","error")}}};(s=document.getElementById("btnSend"))==null||s.addEventListener("click",p),(b=document.getElementById("chatInput"))==null||b.addEventListener("keydown",n=>{n.key==="Enter"&&p()})}t.renderGame,d.loaded?(T(),g()):r()}function Lt(a,t){const{state:e,api:l,notify:c,updateSidebar:$,renderGame:d}=t,r=e.playerId,g=e._auctionTab||"browse";async function f(){try{const[i,u]=await Promise.all([l.getAuctions(),l.getMyAuctions(r)]);e._auctionListings=i.listings||[],e._auctionMine=u.listings||[],T()}catch(i){c(i.message,"error")}}function T(){const i=e._auctionListings||[],u=e._auctionMine||[],v=(e.player.inventory||[]).filter(h=>h.slot&&h.slot!=="consumable");a.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${g==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${g==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${g==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${u.length})</button>
      </div>

      ${g==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${i.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':i.map(h=>{const p=JSON.parse(h.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${p.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${p.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${h.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${h.id}">💎 ${h.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:g==="sell"?`
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
          ${u.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':u.map(h=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(h.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${h.status==="active"?"var(--green)":h.status==="sold"?"var(--gold)":"var(--red)"}">${h.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${h.buyout_price}</div>
                </div>
                ${h.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${h.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,y()}function y(){var i;a.querySelectorAll(".tab-btn").forEach(u=>u.addEventListener("click",()=>{e._auctionTab=u.dataset.tab,f()})),a.querySelectorAll(".btn-buy").forEach(u=>u.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const v=await l.buyAuction(r,parseInt(u.dataset.lid));c(v.message,"success"),e.player=v.player,$(),await f()}catch(v){c(v.message,"error")}})),a.querySelectorAll(".btn-cancel").forEach(u=>u.addEventListener("click",async()=>{try{const v=await l.cancelAuction(r,parseInt(u.dataset.lid));c(v.message,"success"),e.player=v.player,$(),await f()}catch(v){c(v.message,"error")}})),(i=document.getElementById("btnListItem"))==null||i.addEventListener("click",async()=>{var p,o,s;const u=(p=document.getElementById("selSellItem"))==null?void 0:p.value,v=parseInt(((o=document.getElementById("inpPrice"))==null?void 0:o.value)||"500"),h=parseInt(((s=document.getElementById("selDuration"))==null?void 0:s.value)||"24");try{const b=await l.listAuction(r,u,v,h);c(b.message,"success"),e.player=b.player,$(),e._auctionTab="mine",await f()}catch(b){c(b.message,"error")}})}f()}function jt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const r=e._market;async function g(){try{const[p,o]=await Promise.all([l.getMarketListings(r.filter,r.sort),l.getMyListings(d)]);r.listings=p.listings||[],r.myListings=o.listings||[],r.loaded=!0,T()}catch(p){c(p.message||"Lỗi tải Giao Dịch Đài","error")}}async function f(){try{const[p,o]=await Promise.all([l.getMugTargets(d),l.getMugLog(d)]);r.mugTargets=p.targets||[],r.mugCooldown=p.mugCooldown||0,r.mugLog=o.logs||[],T()}catch(p){c(p.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function T(){const p=e.player;if(a.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${r.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${r.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${r.myListings.length}/10)</button>
        <button class="btn btn--sm ${r.tab==="auction"?"btn--gold":"btn--dark"}" data-mtab="auction">⚖️ Sàn Đấu Giá</button>
        <button class="btn btn--sm ${r.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${r.showListForm?v(p):""}

      ${r.tab==="browse"?y():r.tab==="my"?i():r.tab==="auction"?'<div id="auctionSubContent"></div>':u()}
    `,h(),r.tab==="auction"){const o=a.querySelector("#auctionSubContent");o&&Lt(o,t)}}function y(){let p=`
      <div class="panel">
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn--xs ${r.filter===""?"btn--blue":"btn--dark"}" data-filter="">Tất cả</button>
            <button class="btn btn--xs ${r.filter==="item"?"btn--blue":"btn--dark"}" data-filter="item">⚔️ Trang Bị</button>
            <button class="btn btn--xs ${r.filter==="material"?"btn--blue":"btn--dark"}" data-filter="material">🧱 Nguyên Liệu</button>
            <button class="btn btn--xs ${r.filter==="medicine"?"btn--blue":"btn--dark"}" data-filter="medicine">💊 Đan Dược</button>
            <select id="sortSelect" style="padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:12px;margin-left:auto">
              <option value="newest" ${r.sort==="newest"?"selected":""}>Mới nhất</option>
              <option value="price_asc" ${r.sort==="price_asc"?"selected":""}>Giá tăng</option>
              <option value="price_desc" ${r.sort==="price_desc"?"selected":""}>Giá giảm</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo tên vật phẩm hoặc affix..." value="${r.search}" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
          </div>
        </div>
      </div>
    `,o=r.listings;if(r.search.trim()){const s=r.search.toLowerCase().trim();o=o.filter(b=>{var n;return b.item_name.toLowerCase().includes(s)?!0:(n=b.item_data)!=null&&n.affixes?b.item_data.affixes.some(m=>(m.stat||"").toLowerCase().includes(s)||(m.type||"").toLowerCase().includes(s)):!1})}return o.length===0?p+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(p+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',p+=o.map(s=>{var k,w;const b=s.item_type==="item"?"⚔️":s.item_type==="material"?"🧱":"💊",n=((k=s.item_data)==null?void 0:k.rarity)||"",m=s.seller_id===d,x=(w=s.item_data)!=null&&w.affixes?s.item_data.affixes.map(C=>`${C.stat} ${C.type==="flat"?"+":""}${C.value}${C.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${b}
                <span style="color:var(--gold)">${s.item_name}</span>
                ${s.quantity>1?`<span style="opacity:0.5"> x${s.quantity}</span>`:""}
                ${n?`<span class="rarity-${n}" style="font-size:11px;margin-left:4px">[${n}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${s.seller_name}</span>
                ${x?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${x}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${s.price}${s.quantity>1?"/cái":""}</span>
              ${m?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${s.id}" data-qty="${s.quantity}" data-price="${s.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),p+="</div></div>"),p}function i(){if(r.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let p='<div class="panel"><div class="panel-body no-pad">';return p+=r.myListings.map(o=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${o.item_type==="item"?"⚔️":o.item_type==="material"?"🧱":"💊"} ${o.item_name} ${o.quantity>1?`<span style="opacity:0.5">x${o.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${o.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${o.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),p+="</div></div>",p}function u(){let p=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${r.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${r.mugCooldown}s</div>`:""}
    `;return r.mugTargets.length===0?p+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':p+=r.mugTargets.map(o=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${o.gender==="female"?"♀":"♂"} ${o.name}</div>
            <div class="item-meta">Lv.${o.level} · ${o.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${o.id}" ${r.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),p+="</div></div>",r.mugLog.length>0&&(p+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${r.mugLog.map(o=>{const s=o.attacker_id===d,b=o.outcome==="success"?"✅":"❌",n=o.outcome==="success"?"var(--green)":"var(--red)",m=s?o.outcome==="success"?`Cướp ${o.victim_name}: +${o.gold_stolen} 💎`:`Phục kích ${o.victim_name} thất bại!`:o.outcome==="success"?`Bị ${o.attacker_name} cướp: -${o.gold_stolen} 💎`:`${o.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${n}">${b} ${m} <span style="opacity:0.4;margin-left:auto">${new Date(o.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),p}function v(p){const o=Object.entries(p.materials||{}).map(([m,x])=>({id:m,qty:x,type:"material",name:m})),s=Object.entries(p.medicines||{}).map(([m,x])=>({id:m,qty:x,type:"medicine",name:m})),b=(p.inventory||[]).map(m=>({id:m.id,qty:1,type:"item",name:m.name||m.id})),n=[...o,...s,...b];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${n.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${n.map(m=>`<option value="${m.type}|${m.id}">${m.type==="item"?"⚔️":m.type==="material"?"🧱":"💊"} ${m.name} ${m.qty>1?`(có: ${m.qty})`:""}</option>`).join("")}
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
    `}function h(){var p,o,s,b;document.querySelectorAll("[data-mtab]").forEach(n=>{n.addEventListener("click",()=>{if(r.tab=n.dataset.mtab,r.tab==="mug"&&r.mugTargets.length===0){f();return}T()})}),(p=document.getElementById("btnShowList"))==null||p.addEventListener("click",()=>{r.showListForm=!r.showListForm,T()}),document.querySelectorAll("[data-filter]").forEach(n=>{n.addEventListener("click",async()=>{r.filter=n.dataset.filter,await g()})}),(o=document.getElementById("sortSelect"))==null||o.addEventListener("change",async n=>{r.sort=n.target.value,await g()}),(s=document.getElementById("searchInput"))==null||s.addEventListener("input",n=>{r.search=n.target.value,T();const m=document.getElementById("searchInput");m&&(m.focus(),m.setSelectionRange(r.search.length,r.search.length))}),(b=document.getElementById("btnConfirmList"))==null||b.addEventListener("click",async()=>{var C,E,P;const n=(C=document.getElementById("listItem"))==null?void 0:C.value;if(!n)return;const[m,x]=n.split("|"),k=parseInt((E=document.getElementById("listQty"))==null?void 0:E.value)||1,w=parseInt((P=document.getElementById("listPrice"))==null?void 0:P.value)||0;if(w<=0)return c("Giá phải lớn hơn 0!","error");try{const I=await l.listForSale(d,m,x,k,w);c(I.message,"success"),e.player=I.player,$(),r.showListForm=!1,await g()}catch(I){c(I.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(n=>{n.addEventListener("click",async()=>{const m=parseInt(n.dataset.buy),x=parseInt(n.dataset.qty),k=parseInt(n.dataset.price);let w=1;if(x>1){const C=prompt(`Mua bao nhiêu? (tối đa ${x}, giá ${k} 💎/cái)`,"1");if(!C)return;w=Math.min(parseInt(C)||1,x)}n.disabled=!0;try{const C=await l.buyFromMarket(d,m,w);c(C.message,"success"),e.player=C.player,$(),await g()}catch(C){c(C.message,"error"),n.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(n=>{n.addEventListener("click",async()=>{n.disabled=!0;try{const m=await l.cancelListing(d,parseInt(n.dataset.cancel));c(m.message,"success"),e.player=m.player,$(),await g()}catch(m){c(m.message,"error"),n.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(n=>{n.addEventListener("click",async()=>{const m=n.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){n.disabled=!0,n.textContent="⏳...";try{const x=await l.mugPlayer(d,m);c(x.message,x.success?"success":"error"),e.player=x.player,$(),await f()}catch(x){c(x.message,"error"),n.disabled=!1,n.textContent="💀 Phục Kích"}}})})}r.tab==="mug"?f():r.loaded?T():g()}function Dt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;let r=!1,g=null;async function f(){try{g=await l.getRealmInfo(d),r=!0,T()}catch(u){c(u.message||"Lỗi tải Cảnh Giới","error")}}function T(){if(!g)return;const u=g.current,v=g.allRealms||[],h=e.player,p=h.xpToNext>0?Math.floor(h.xp/h.xpToNext*100):0;a.innerHTML=`
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${u.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${u.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${u.color}">${u.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Cảnh Giới Bậc ${u.tier} · ${u.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${h.level} — ${h.xp}/${h.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${p}%;background:${u.color}"></div></div>
        </div>

        ${u.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(u.bonuses).filter(([,o])=>o>0).map(([o,s])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${s} ${o}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${u.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${u.unlocks.map(o=>`<span style="font-size:12px;opacity:0.7">✅ ${o}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${u.canBreakthrough?y(u):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${v.map(o=>{const s=o.tier===u.tier,b=o.tier<u.tier,m=o.tier>u.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${s?`2px solid ${o.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${m};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${o.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${o.color}">${o.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${o.levelMin}+</span>
                ${o.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${o.failChance}% thất bại</span>`:""}
                ${b?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${s?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,i()}function y(u){const v=u.nextRealm;if(!v)return"";const h=v.cost?`💎 ${v.cost.gold} + 🔮 ${v.cost.energy}`:"Miễn phí";return`
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
          Bonus mới: ${Object.entries(v.bonuses).filter(([,p])=>p>0).map(([p,o])=>`+${o} ${p}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${v.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function i(){var u;(u=document.getElementById("btnBreakthrough"))==null||u.addEventListener("click",()=>{ht(t)})}f()}function Vt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t;Ut(a,t)}async function Ut(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t;a.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const r=(await l.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,$()),r.length===0){a.innerHTML=`
        <div class="page-header"><h1>📜 Sự Kiện</h1></div>
        <div class="panel">
          <div class="panel-body text-dim" style="text-align:center; padding: 40px;">
            Gió yên biển lặng. Chưa có sự kiện nào xảy ra với bạn.
          </div>
        </div>
      `;return}a.innerHTML=`
      <div class="page-header"><h1>📜 Sự Kiện Gần Đây</h1></div>
      <div class="panel">
        <div class="panel-body no-pad">
          <ul class="event-timeline" style="list-style:none; padding:16px; margin:0;">
            ${r.map(g=>{const f=new Date(g.created_at*1e3),T=f.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),y=f.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let i="📌";return i={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[g.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${T}</div>
                    <div>${y}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${i}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${g.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${g.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(d){a.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${d.message}</div></div>`}}function Qt(a,t){const{state:e,api:l,notify:c,updateSidebar:$,renderGame:d}=t,r=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const g=e._housing;async function f(){try{const v=await l.getHousing(r);g.data=v,g.loaded=!0,T()}catch(v){c(v.message||"Lỗi tải Động Phủ","error")}}function T(){const v=g.data;a.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${v.owned?i(v):y(v)}
    `,u()}function y(v){const h=v.tiers[1];return`
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
    `}function i(v){const h=v.gardenSlots||[],p=v.gardenHerbs||{};return`
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
            ${Array.from({length:v.maxSlots},(o,s)=>{const b=h[s]||{},n=!!b.herb,m=b.ready,x=b.remaining||0,k=Math.ceil(x/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${m?"var(--green)":n?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${n?`
                    <div style="font-size:20px">${m?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${b.herbName||b.herb}</div>
                    <div style="font-size:10px;color:${m?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${m?"✅ Sẵn sàng!":"⏳ "+k+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${s}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(p).map(([w,C])=>`<option value="${w}">${C.name}</option>`).join("")}
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
            ${Object.entries(v.formations).map(([o,s])=>{const b=s.currentLevel>=s.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${s.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${s.icon}</span>
                      <strong style="margin-left:4px">${s.name}</strong>
                      ${s.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${s.currentLevel}</span>`:""}
                    </div>
                    ${s.canBuild?b?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${o}">
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
    `}function u(){var v,h,p,o;(v=document.getElementById("btnBuyHouse"))==null||v.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const s=await l.buyHousing(r);c(s.message,"success"),e.player=s.player,$(),await f()}catch(s){c(s.message,"error")}}),(h=document.getElementById("btnUpgrade"))==null||h.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const s=await l.buyHousing(r);c(s.message,"success"),e.player=s.player,$(),await f()}catch(s){c(s.message,"error")}}),document.querySelectorAll(".plant-select").forEach(s=>{s.addEventListener("change",async b=>{const n=b.target.value;if(!n)return;const m=parseInt(s.dataset.slot);try{const x=await l.plantHerb(r,n,m);c(x.message,"success"),await f()}catch(x){c(x.message,"error")}})}),(p=document.getElementById("btnHarvest"))==null||p.addEventListener("click",async()=>{try{const s=await l.harvestGarden(r);c(s.message,"success"),e.player=s.player,$(),await f()}catch(s){c(s.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(s=>{s.addEventListener("click",async()=>{const b=s.dataset.fid;s.disabled=!0,s.textContent="⏳...";try{const n=await l.upgradeFormation(r,b);c(n.message,"success"),e.player=n.player,$(),await f()}catch(n){c(n.message,"error"),s.disabled=!1,s.textContent="⬆ Nâng"}})}),(o=document.getElementById("btnMaintenance"))==null||o.addEventListener("click",async()=>{try{const s=await l.payMaintenance(r);c(s.message,"success"),e.player=s.player,$(),await f()}catch(s){c(s.message,"error")}})}g.loaded?T():f()}function Ft(a,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function l(){a.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","skills","explore","tower","dungeon","housing","talent","alchemy","market","tips"].map($=>`
          <button class="btn btn--sm ${e._wikiTab===$?"btn--gold":"btn--dark"}" data-tab="${$}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",skills:"⚡ Kỹ Năng",explore:"🗺️ Khám Phá",tower:"🗼 Thiên Phần Tháp",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[$]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${c(e._wikiTab)}
        </div>
      </div>
    `,a.querySelectorAll("[data-tab]").forEach($=>{$.addEventListener("click",()=>{e._wikiTab=$.dataset.tab,l()})})}function c($){return{lore:`
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
      `}[$]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}l()}function Jt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const r=e._npcShop;let g=parseInt(localStorage.getItem("npcShopIdx")||"0");async function f(){try{a.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const i=await l.getShops(d);r.shops=i.shops||[],r.tax=i.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},r.loaded=!0,g>=r.shops.length&&(g=0),T()}catch(i){c(i.message||"Lỗi tải shop","error")}}function T(){var o;if(r.shops.length===0){a.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const i=r.shops[g]||r.shops[0],u=r.shops.map((s,b)=>`
      <button class="skill-tab ${b===g?"active":""}" data-shop-idx="${b}">
        ${s.icon||"🧓"} ${s.name}
      </button>
    `).join(""),v={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},h={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},p=(i.items||[]).map(s=>{var k,w;const b=v[s.rarity||"common"]||"#888",n=h[s.rarity||"common"]||"Phàm",m=(s.remainingStock??1)<=0,x=(((k=e.player)==null?void 0:k.gold)??0)>=(s.currentPrice||0);return`
        <div class="shop-item-card ${m?"out-of-stock":""}" style="border-left:3px solid ${b}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${b}">${s.name}</div>
              <div class="shop-item-rarity" style="color:${b}">${n} · Tầng ${s.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${m?"var(--red)":"var(--green)"}">
                ${m?"❌ Hết hàng":`📦 ${s.remainingStock}/${s.dailyStock}`}
              </span>
            </div>
          </div>
          ${s.description?`<div class="shop-item-desc">${s.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${x?"":"too-expensive"}">
              💎 ${((w=s.currentPrice)==null?void 0:w.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${i.id}" data-item="${s.id}" 
                value="1" min="1" max="${s.remainingStock||1}" 
                ${m?"disabled":""}>
              <button class="btn btn--sm ${m?"":x?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${i.id}" data-item="${s.id}"
                ${m||!x?"disabled":""}>
                ${m?"❌":x?"🛒 Mua":"💸 Thiếu"}
              </button>
            </div>
          </div>
        </div>
      `}).join("");a.innerHTML=`
      <div class="page-header">
        <h1>🧓 Thương Nhân</h1>
        <div class="text-dim text-sm">Mỗi thương nhân có hàng giới hạn mỗi ngày. Mua sắm thông minh!</div>
      </div>

      <div class="shop-info-bar">
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${r.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(((o=e.player)==null?void 0:o.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${i.area||"Không rõ"}</div>
      </div>

      ${r.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${u}</div>`:""}

      <div class="shop-items-grid">
        ${p||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,y()}function y(){a.querySelectorAll(".skill-tab[data-shop-idx]").forEach(i=>{i.addEventListener("click",()=>{g=parseInt(i.dataset.shopIdx),localStorage.setItem("npcShopIdx",g),T()})}),a.querySelectorAll(".btn-buy").forEach(i=>{i.addEventListener("click",async()=>{const u=i.dataset.shop,v=i.dataset.item,h=a.querySelector(`.buy-qty[data-shop="${u}"][data-item="${v}"]`),p=parseInt((h==null?void 0:h.value)||1);i.disabled=!0,i.textContent="⏳...";try{const o=await l.buyFromShop(d,u,v,p);c(o.message,"success"),e.player=o.player,$(),await f()}catch(o){c(o.message,"error"),i.disabled=!1,i.textContent="🛒 Mua"}})})}r.loaded?T():f()}function Wt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const r=e._guild;async function g(){try{r.data=await l.getMyGuild(d),r.loaded=!0,T()}catch(v){c(v.message||"Lỗi","error")}}async function f(){try{const v=await l.listGuilds();r.allGuilds=v.guilds||[],T()}catch(v){c(v.message,"error")}}function T(){const v=r.data;a.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${v!=null&&v.inGuild?i(v):y(v)}
    `,u()}function y(v){return`
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
          ${r.allGuilds?r.allGuilds.map(h=>`
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
    `}function i(v){var s;const h=v.guild,p=v.members||[],o=v.log||[];return`
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
                Buff: ${Object.entries(h.buffs).map(([b,n])=>`${b} +${n}%`).join(", ")}
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
            ${o.slice(0,10).map(b=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(b.created_at).toLocaleString("vi")}</span>
                ${b.detail||b.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${p.length}/${h.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${p.map(b=>`
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

      ${v.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function u(){var v,h,p,o,s,b;(v=document.getElementById("btnCreate"))==null||v.addEventListener("click",async()=>{var k,w,C,E,P,I;const n=(w=(k=document.getElementById("guildName"))==null?void 0:k.value)==null?void 0:w.trim(),m=(E=(C=document.getElementById("guildTag"))==null?void 0:C.value)==null?void 0:E.trim(),x=(I=(P=document.getElementById("guildDesc"))==null?void 0:P.value)==null?void 0:I.trim();if(!n||!m)return c("Nhập tên và tag!","error");try{const O=await l.createGuild(d,n,m,x);c(O.message,"success"),e.player=O.player,$(),r.loaded=!1,await g()}catch(O){c(O.message,"error")}}),(h=document.getElementById("btnLoadGuilds"))==null||h.addEventListener("click",f),document.querySelectorAll(".btn-join").forEach(n=>{n.addEventListener("click",async()=>{try{const m=await l.joinGuild(d,parseInt(n.dataset.gid));c(m.message,"success"),r.loaded=!1,await g()}catch(m){c(m.message,"error")}})}),(p=document.getElementById("btnContribute"))==null||p.addEventListener("click",async()=>{var m;const n=parseInt(((m=document.getElementById("contributeAmt"))==null?void 0:m.value)||0);if(!(n<=0))try{const x=await l.contributeGuild(d,n);c(x.message,"success"),e.player=x.player,$(),await g()}catch(x){c(x.message,"error")}}),(o=document.getElementById("btnUpgradeGuild"))==null||o.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const n=await l.upgradeGuild(d);c(n.message,"success"),await g()}catch(n){c(n.message,"error")}}),(s=document.getElementById("btnPayUpkeep"))==null||s.addEventListener("click",async()=>{try{const n=await l.payGuildUpkeep(r.data.guild.id);c(n.message,"success"),await g()}catch(n){c(n.message,"error")}}),(b=document.getElementById("btnLeave"))==null||b.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const n=await l.leaveGuild(d);c(n.message,"success"),r.loaded=!1,await g()}catch(n){c(n.message,"error")}})}r.loaded?T():g()}function Xt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const r=e._profile;function g(){a.innerHTML=`
      <div class="page-header">
        <h2>🔍 Tìm Đạo Hữu</h2>
        <p class="page-sub">Tìm kiếm người chơi theo tên. Xem profile, tấn công hoặc kết bạn.</p>
      </div>

      <div class="panel" style="margin-bottom:12px">
        <div class="panel-body" style="padding:12px 16px;display:flex;gap:8px">
          <input type="text" id="searchInput" placeholder="Nhập tên người chơi..."
            value="${r.searchQuery}"
            style="flex:1;padding:8px 12px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
          <button class="btn btn--blue" id="btnSearch">🔍 Tìm</button>
        </div>
      </div>

      ${r.viewing?f(r.viewing):""}

      ${r.results.length>0&&!r.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${r.results.length})</div>
        <div class="panel-body no-pad">
          ${r.results.map(i=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" data-view="${i.id}">
              <div style="flex:1">
                <div style="font-weight:600">${i.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${i.level} · Realm T${i.realm_tier||"?"}</div>
              </div>
              <button class="btn btn--sm btn--dark btn-view" data-vid="${i.id}">👁 Xem</button>
            </div>
          `).join("")}
        </div>
      </div>
      `:!r.viewing&&r.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,T()}function f(i){var p,o,s;const u=i.id===d,v=i.maxHp>0?Math.round(i.currentHp/i.maxHp*100):100,h={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((p=i.name[0])==null?void 0:p.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${i.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${i.level} · ${((o=i.realmInfo)==null?void 0:o.fullName)||"Phàm Nhân"}
                ${i.guild?` · <span style="color:var(--blue)">[${i.guild.tag}] ${i.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${h[i.currentArea]||i.currentArea}
                ${i.housingTier>0?` · 🏠 T${i.housingTier}`:""}
                · 📜 ${i.skills} kỹ năng · ⚔ ${i.items} vật phẩm
              </div>
            </div>
          </div>

          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ Khí Huyết</span><span>${i.currentHp}/${i.maxHp}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${v}%;background:${v>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">💪 STR</div>
              <div style="font-weight:700;color:var(--red)">${i.stats.strength}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">⚡ SPD</div>
              <div style="font-weight:700;color:var(--blue)">${i.stats.speed}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🎯 DEX</div>
              <div style="font-weight:700;color:var(--orange)">${i.stats.dexterity}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🛡 DEF</div>
              <div style="font-weight:700;color:var(--green)">${i.stats.defense}</div>
            </div>
          </div>

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(s=i.gold)==null?void 0:s.toLocaleString()} 💎</strong></div>

          ${u?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${i.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${i.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function T(){var i,u,v,h,p;(i=document.getElementById("btnSearch"))==null||i.addEventListener("click",y),(u=document.getElementById("searchInput"))==null||u.addEventListener("keydown",o=>{o.key==="Enter"&&y()}),document.querySelectorAll(".btn-view, [data-view]").forEach(o=>{o.addEventListener("click",async()=>{const s=o.dataset.vid||o.dataset.view;try{const b=await l.getPlayerProfile(s);r.viewing=b.profile,g()}catch(b){c(b.message,"error")}})}),(v=document.getElementById("btnAttack"))==null||v.addEventListener("click",async()=>{const o=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${r.viewing.name}?`))try{const s=await l.mugPlayer(d,o);c(s.message,s.won?"success":"error"),s.player&&(e.player=s.player,$())}catch(s){c(s.message,"error")}}),(h=document.getElementById("btnAddFriend"))==null||h.addEventListener("click",async()=>{const o=document.getElementById("btnAddFriend").dataset.tid;try{const s=await l.addFriend(d,o);c(s.message||"Đã gửi lời mời!","success")}catch(s){c(s.message,"error")}}),(p=document.getElementById("btnBackSearch"))==null||p.addEventListener("click",()=>{r.viewing=null,g()})}async function y(){var v;const i=document.getElementById("searchInput"),u=(v=i==null?void 0:i.value)==null?void 0:v.trim();if(!u||u.length<2)return c("Nhập ít nhất 2 ký tự!","error");r.searchQuery=u,r.viewing=null;try{const h=await l.searchPlayers(u);r.results=h.players||[],g()}catch(h){c(h.message,"error")}}g()}function Yt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const r=e._arena;async function g(){try{r.data=await l.getArena(d),r.loaded=!0,f()}catch(y){c(y.message,"error")}}function f(){var o,s,b,n,m,x,k,w;const y=r.data,i=(y==null?void 0:y.arena)||{},u=i.rank||{},v=parseInt(i.streak)||0,h=v>=5?`🔥x${v}`:v>=3?`⚡x${v}`:v>0?`${v}W`:v<0?`${Math.abs(v)}L`:"",p=v>=5?"var(--gold)":v>=3?"var(--orange)":v>0?"var(--green)":v<0?"var(--red)":"var(--text-dim)";a.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid ${u.color||"#666"}">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px;text-shadow:0 0 12px ${u.color||"#666"}">${u.icon||"🛡️"}</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Rank</div>
            <div style="font-weight:800;font-size:18px;color:${u.color||"#fff"}">${u.name||"Chưa xếp hạng"}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px">
              ELO: <strong>${i.rating||1e3}</strong> · ${i.wins||0}W/${i.losses||0}L
              ${h?` · <span style="color:${p};font-weight:700">${h}</span>`:""}
            </div>
            ${u.nextThreshold?`
              <div style="margin-top:6px">
                <div style="font-size:10px;opacity:0.4">Tiến trình → ${u.nextThreshold} ELO</div>
                <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:3px;overflow:hidden">
                  <div style="background:${u.color||"#666"};height:100%;width:${u.progress||0}%;border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            `:'<div style="font-size:10px;opacity:0.4;margin-top:4px">🏆 Đỉnh cao! Thiên Đạo Đệ Nhất!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${(o=r.lastResult)!=null&&o.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(s=r.lastResult.newRank)==null?void 0:s.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(b=r.lastResult.newRank)==null?void 0:b.name}!</div>
      </div>
      `:""}

      <!-- LAST RESULT -->
      ${r.lastResult?`
      <div class="panel" style="margin-bottom:12px;border-left:3px solid ${r.lastResult.won?"var(--green)":"var(--red)"}">
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:700;color:${r.lastResult.won?"var(--green)":"var(--red)"}">
            ${r.lastResult.won?"🏆 CHIẾN THẮNG!":"💀 THẤT BẠI!"}
          </div>
          <div style="font-size:12px;margin-top:4px">
            Đối thủ: <strong>${(n=r.lastResult.opponent)==null?void 0:n.name}</strong> 
            ${(m=r.lastResult.opponent)!=null&&m.rank?r.lastResult.opponent.rank.icon:""} 
            (ELO ${(x=r.lastResult.opponent)==null?void 0:x.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${r.lastResult.ratingChange>0?"+":""}${r.lastResult.ratingChange}
            ${r.lastResult.goldEarned>0?` · +${r.lastResult.goldEarned} 💎`:""}
          </div>
          ${(k=r.lastResult.combatLog)!=null&&k.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${r.lastResult.combatLog.map(C=>`<div>${C}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(y.opponents||[]).length>0?(y.opponents||[]).map(C=>{var E,P,I;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((E=C.rank)==null?void 0:E.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${C.name} <span style="opacity:0.4;font-size:11px">Lv.${C.level}</span></div>
                <div style="font-size:11px;color:${((P=C.rank)==null?void 0:P.color)||"#888"}">${((I=C.rank)==null?void 0:I.name)||"Đồng"} · ELO ${C.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${C.player_id}" ${r.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${r.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${y.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(y.top10||[]).map((C,E)=>{var P,I;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${E<3?"var(--gold)":"var(--text-dim)"}">#${E+1}</span>
                <span>${((P=C.rank)==null?void 0:P.icon)||""}</span>
                <span style="flex:1">${C.name}</span>
                <span style="color:${((I=C.rank)==null?void 0:I.color)||"var(--blue)"}; font-weight:600">${C.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(y.history||[]).map(C=>{const E=C.winner_id===d;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${E?"var(--green)":"var(--red)"}">
                  ${E?"✅":"❌"} vs ${C.attacker_id===d?C.defender_name:C.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${C.rating_change>0?"+":""}${C.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,a.querySelectorAll(".btn-fight-opp").forEach(C=>{C.addEventListener("click",E=>T(E.target.dataset.oid))}),(w=document.getElementById("btnRandomFight"))==null||w.addEventListener("click",()=>T(null))}async function T(y){r.fighting=!0,f();try{const i=await l.request(`/player/${d}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:y})});r.lastResult=i,e.player=i.player,$(),c(i.message,i.won?"success":"error"),r.fighting=!1,await g()}catch(i){c(i.message,"error"),r.fighting=!1,f()}}r.loaded?f():g()}function Zt(a,t){const{state:e,api:l,notify:c,updateSidebar:$}=t,d=e.playerId;async function r(){try{e._worldBoss=await l.getWorldBoss(),g()}catch(f){c(f.message,"error")}}function g(){var h;const f=e._worldBoss||{},T=f.boss||{},y=f.hpPercent||0,i=f.topContributors||[],u=f.rewards||{},v=T.status==="active"&&T.current_hp>0;a.innerHTML=`
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
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${u.gold||0} · ✨ ${u.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${i.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':i.map((p,o)=>{var s;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${o<3?"var(--gold)":"var(--text-dim)"}">#${o+1}</span>
                <span style="flex:1">${p.name}</span>
                <span style="color:var(--red)">${(s=p.total_damage)==null?void 0:s.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${p.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(h=document.getElementById("btnAttackBoss"))==null||h.addEventListener("click",async()=>{const p=document.getElementById("btnAttackBoss");p.disabled=!0,p.textContent="⏳ Đang giao chiến...";const o=document.getElementById("bossCombatResult");try{const s=await l.attackWorldBoss(d);if(e.player=s.player,$(),s.log&&s.log.length>0){const b=s.log.map(k=>k.startsWith("---")?`<div class="turn">${k}</div>`:k.includes("hụt")?`<div class="miss">${k}</div>`:k.includes("né được")?`<div class="dodge">${k}</div>`:k.includes("CHÍNH MẠNG")||k.includes("💥")?`<div class="crit">${k}</div>`:k.includes("🔥")?`<div class="heavy text-orange">${k}</div>`:k.includes("chặn hoàn toàn")||k.includes("🛡")?`<div class="dodge">${k}</div>`:k.includes("ngã xuống")||k.includes("💀")?`<div class="death">${k}</div>`:k.includes("Chiến thắng")||k.includes("🏆")?`<div class="victory">${k}</div>`:k.includes("bỏ chạy")||k.includes("🏃")?`<div class="flee">${k}</div>`:k.includes("Bất phân")||k.includes("🤝")?`<div class="stalemate">${k}</div>`:k.includes("🧪")?`<div class="status-effect text-purple">${k}</div>`:k.includes("💔")?`<div class="dot-damage text-purple bold">${k}</div>`:k.includes("✨")?`<div class="regen text-green">${k}</div>`:`<div class="hit">${k}</div>`).join(""),n={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},m=n[s.outcome]||n.loss,x=Math.max(0,e.player.currentHp/e.player.maxHp*100);o.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${m.icon} ${m.text}
                <span class="subtitle">${s.turns}/${s.maxTurns||25} lượt · ⚔️ ${s.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${m.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${x}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${T.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(s.bossHp/s.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${s.bossHp.toLocaleString()}/${s.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${b}</div>
            </div>`}s.defeated?c(s.message,"success"):c(`⚔️ ${s.damage} dmg!`,"info"),await r()}catch(s){c(s.message,"error"),p.disabled=!1,p.textContent="⚔️ Tấn Công"}})}r()}function te(a,t){const{state:e,api:l,notify:c,updateSidebar:$,renderGame:d}=t,r=e.playerId,g={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function f(){var y;try{const[i,u]=await Promise.all([l.getGachaPools(),l.getGachaPity(r)]);e._gacha={pools:i.pools||{},pity:u.pity||{},results:((y=e._gacha)==null?void 0:y.results)||[]},T()}catch(i){c(i.message,"error")}}function T(){const y=e._gacha||{},i=y.pools||{},u=y.pity||{},v=y.results||[];a.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(i).map(([h,p])=>{var s,b,n;const o=u[h]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${h==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${p.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${g.legendary}">★ ${(s=p.rates)==null?void 0:s.legendary}%</span> ·
                <span style="color:${g.rare}">◆ ${(b=p.rates)==null?void 0:b.rare}%</span> ·
                <span style="color:${g.uncommon}">● ${(n=p.rates)==null?void 0:n.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${o.pulls_since_rare||0}/${p.pityRare} · Legend: ${o.pulls_since_legendary||0}/${p.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${h}" data-pulls="1">💎 ${p.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${h}" data-pulls="10">💎 ${p.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${v.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${v.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${v.map(h=>{var p,o,s,b;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${g[h.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((p=h.item)==null?void 0:p.slot)==="weapon"?"⚔️":((o=h.item)==null?void 0:o.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${g[h.rarity]}">${((s=h.item)==null?void 0:s.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${h.rarity}] ${(((b=h.item)==null?void 0:b.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,a.querySelectorAll(".btn-pull").forEach(h=>h.addEventListener("click",async()=>{const p=h.dataset.pool,o=parseInt(h.dataset.pulls);h.disabled=!0,h.textContent="⏳...";try{const s=await l.gachaPull(e.playerId,p,o);c(s.message,"success"),e.player=s.player,$(),e._gacha.results=s.results||[],e._gacha.pity[p]=s.pity,T()}catch(s){c(s.message,"error"),h.disabled=!1}}))}f()}function ee(a,t){const{state:e,api:l,notify:c}=t;e._lbTab||(e._lbTab="level");async function $(){const r=e._lbTab||"level";a.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const g=await l.getLeaderboard(r);e._lbData=g,d()}catch(g){a.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${g.message}
      </div></div>`}}function d(){const r=e._lbTab||"level",f=(e._lbData||{}).rankings||[],y=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(u=>`
      <button class="skill-tab ${r===u.id?"active":""}" data-tab="${u.id}">
        ${u.icon} ${u.name}
      </button>
    `).join("");let i="";f.length===0?i='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':r==="guild"?i=f.map((u,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${u.tag}] ${u.name}</div>
            <div class="lb-sub">👤 ${u.members}/${u.max_members} · Leader: ${u.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(u.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${u.level}</div>
          </div>
        </div>
      `).join(""):r==="pvp"?i=f.map((u,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${u.name}</div>
            <div class="lb-sub">Lv.${u.level} · ${u.wins||0}W/${u.losses||0}L${u.streak>0?` · 🔥${u.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${u.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):i=f.map((u,v)=>`
        <div class="lb-row ${v<3?"lb-top":""}">
          <div class="lb-rank ${v<3?"lb-rank-top":""}">${v<3?["🥇","🥈","🥉"][v]:"#"+(v+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${u.name}</div>
            <div class="lb-sub">${u.realm_tier?`Cảnh giới ${u.realm_tier}`:""} ${r==="level"?`· Lv.${u.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${r==="gold"?`💎 ${parseInt(u.gold||0).toLocaleString()}`:`Lv.${u.level}`}
            </div>
          </div>
        </div>
      `).join(""),a.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${y}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${i}
        </div>
      </div>
    `,a.querySelectorAll(".skill-tab[data-tab]").forEach(u=>{u.addEventListener("click",()=>{e._lbTab=u.dataset.tab,$()})})}$()}const H={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},Ct=document.getElementById("app"),rt={get state(){return H},api:D,notify:W,renderGame:J,updateSidebar:de};async function ne(){const a=localStorage.getItem("isLoggedOut")==="true",t=localStorage.getItem("playerId");if(!a&&t&&!H.playerId)try{const e=await D.getPlayer(t);H.playerId=t,H.player=e.player,await et(),J();return}catch{localStorage.removeItem("playerId")}if(!a&&!H.playerId)try{const e=await D.login("admin","admin");H.playerId=e.id,H.player=e.player,localStorage.setItem("playerId",e.id),await et(),J();return}catch(e){console.warn("Dev auto-login failed. Fallback to intro UI.",e)}H.playerId?J():ot()}function ot(){var t,e;const a=H.authTab||"login";Ct.innerHTML=`
    <div class="intro-page">
      <div class="intro-box">
        <div class="title">NGHỊCH THIÊN KÝ</div>
        <div class="intro-text">Thế giới này vận hành theo quy luật tuyệt đối.
Không ai có thể vượt qua.

...Cho đến khi hệ thống xuất hiện lỗi.</div>

        <div class="auth-tabs">
          <button class="btn btn--sm ${a==="login"?"btn--blue":"btn--dark"}" data-auth="login">Đăng nhập</button>
          <button class="btn btn--sm ${a==="register"?"btn--blue":"btn--dark"}" data-auth="register">Đăng ký</button>
        </div>

        ${a==="login"?`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(l=>{l.addEventListener("click",()=>{H.authTab=l.dataset.auth,ot()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const l=document.getElementById("inpUsername").value.trim(),c=document.getElementById("inpPassword").value;if(!l||!c)return W("Vui lòng nhập đầy đủ","error");try{const $=await D.login(l,c);H.playerId=$.id,H.player=$.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",$.id),W($.message,"success"),await et(),J()}catch($){W($.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var r,g;const l=document.getElementById("inpUsername").value.trim(),c=document.getElementById("inpPassword").value,$=((r=document.getElementById("inpName"))==null?void 0:r.value.trim())||"Vô Danh",d=((g=document.querySelector('input[name="gender"]:checked'))==null?void 0:g.value)||"male";if(!l||!c)return W("Vui lòng nhập đầy đủ","error");try{const f=await D.register(l,c,$,d);H.playerId=f.id,H.player=f.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",f.id),W(f.message,"success"),await et(),J()}catch(f){W(f.message||"Đăng ký thất bại!","error")}})}function St(a){const t=Math.floor(Date.now()/1e3),e=[];return a.hospitalUntil&&a.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:a.hospitalUntil,color:"var(--red)"}),a.medCooldownUntil&&a.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:a.medCooldownUntil,color:"var(--orange)"}),a.travelArrivesAt&&a.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:a.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(l=>{const c=Math.max(0,l.endTime-t),$=Math.floor(c/60),d=c%60,r=$>0?`${$}p${String(d).padStart(2,"0")}s`:`${d}s`;return`<span class="status-icon" data-end="${l.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${l.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${l.color};white-space:nowrap;
      " title="${l.label}">${l.icon} <span class="cd-time">${r}</span></span>`}).join("")}
  </div>`}let tt=null;function ae(){tt&&clearInterval(tt),tt=setInterval(()=>{const a=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),l=Math.max(0,e-a);if(l<=0){t.remove();return}const c=Math.floor(l/60),$=l%60,d=t.querySelector(".cd-time");d&&(d.textContent=c>0?`${c}p${String($).padStart(2,"0")}s`:`${$}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function Et(a){let t="";const l={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"},cuu_u_than_uyen:{icon:"👿",tooltip:"Cửu U Ma Khí: Tăng 35% Sát Thương, 20% Tốc Độ"},thai_co_hong_hoang:{icon:"🦕",tooltip:"Hồng Hoang Cổ Khí: Tăng 25% Máu, 20% Giáp"},chu_thien_tinh_hai:{icon:"🌌",tooltip:"Tinh Tú Luân Chuyển: Tăng 30% Tốc Độ, 25% Nhanh Nhẹn"},hon_don_tien_vuc:{icon:"🔮",tooltip:"Hỗn Độn Tiên Khí: Tăng 35% Toàn Bộ Thuộc Tính"},hon_nguyen_dao_canh:{icon:"👑",tooltip:"Hỗn Nguyên Đạo Vực: Tăng 60% Sát Thương, 50% Toàn Thuộc Tính"}}[a.currentArea];return l&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${l.tooltip}">${l.icon} Cảnh Vực</span>`),a.combatBuffs&&a.combatBuffs.length>0&&a.combatBuffs.forEach(c=>{let $="💊",d="Buff";c.type==="status"&&c.stat==="poison"?($="☠️",d="Trúng Độc"):c.type==="status"&&c.stat==="confuse"?($="👹",d="Ma Hóa"):c.stat==="allStats"||c.stat==="hp"||c.stat==="damage"?($="🔥",d="Cuồng Nộ"):c.stat==="defense"||c.stat==="resist"?($="🛡️",d="Kiên Cố"):c.stat==="speed"||c.stat==="dexterity"?($="💨",d="Thân Pháp"):($="✨",d="Cường Hóa");let r=c.duration?` (-${c.duration} Trận)`:"",g=`Hiệu ứng: ${c.stat} (${c.type} ${c.value})${c.duration?` - Còn lại: ${c.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${g}">${$} ${d}${r}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function J(){var b,n,m,x,k,w,C,E,P,I,O;const a=H.player,t=((b=a.stats)==null?void 0:b.maxHp)??a.maxHp??100,e=Math.min(t,a.currentHp),l=t>0?Math.min(100,Math.max(0,e/t*100)):0,c=a.maxStamina>0?Math.max(0,a.currentStamina/a.maxStamina*100):0,$=((n=a.stats)==null?void 0:n.maxEnergy)??a.maxEnergy??50,d=a.usableEnergy??Math.max(0,$-(a.reservedEnergy??0)),r=a.reservationPct??0,g=d>0?Math.min(100,Math.max(0,a.currentEnergy/d*100)):0,f=a.xpToNext&&a.xpToNext>0?Math.min(100,Math.max(0,(a.xp||0)/a.xpToNext*100)):0,T=H.exploration?H.exploration[a.currentArea||"thanh_lam_tran"]:null,y=T?T.name:"Khám Phá",i=H._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");H._collapsedNav=i;const v={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[H.currentPage];v&&(i[v]=!1),Ct.innerHTML=`
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
          <div class="player-name">${a.name}</div>
          ${a.activeTitle?`<div style="font-size:10px;color:var(--gold);font-weight:600;letter-spacing:0.5px;margin-top:1px">『${a.activeTitle}』</div>`:""}
          <div class="player-meta">Lv.${a.level} · ${((m=a.realmInfo)==null?void 0:m.fullName)||"?"}</div>
          ${St(a)}
          ${Et(a)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${e}/${t}
                ${e<t?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(x=a.skills)!=null&&x.some(q=>q.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${l}%" data-low="${l<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực (Thế Giới)</span>
              <span>
                ${a.currentStamina??100}/${a.maxStamina??100}
                ${(a.currentStamina??100)<(a.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((k=a.stats)==null?void 0:k.staminaRegen)??2}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${c}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔵 Linh Lực (Thực Chiến)</span>
              <span>
                ${a.currentEnergy}/${d}
                ${r>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${r}% bởi Tâm Pháp Hào Quang">(Khóa ${r}%)</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${g}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>✨ Tu Vi (Cấp ${a.level})</span>
              <span>${(a.xp??0).toLocaleString()}/${(a.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${f.toFixed(1)}%)</span></span>
            </div>
            <div class="bar-track"><div class="bar-fill xp" style="width:${f}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${a.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${H.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(a.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
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
            📍 ${y} ${a.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':a.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(a.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <!-- PHÂN HỆ 1: KHÁM PHÁ & HÀNH TRÌNH (Trọng Tâm Gameplay) -->
          <li class="nav-section ${i.hanhtrinh?"collapsed":""}" data-section="hanhtrinh">
            <span>⚔️ KHÁM PHÁ & HÀNH TRÌNH</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${i.hanhtrinh?"collapsed":""}" id="sec-hanhtrinh">
            <li class="nav-item nav-item--hero ${H.currentPage==="combat"?"active":""}" data-page="combat">
              <span class="icon">🔍</span> Khám Phá (${y})
              <span class="badge" style="background: linear-gradient(135deg, #e8a43a, #f0c030); color: #1a1a2e; font-weight: 800; font-size: 9px; padding: 2px 6px;">CHÍNH</span>
            </li>
            <li class="nav-item ${["travel","dungeon","tiencanh"].includes(H.currentPage)?"active":""}" data-page="travel">
              <span class="icon">🗺️</span> Ngao Du Bát Hoang
              ${(a.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(H.currentPage)?"active":""}" data-page="quests">
              <span class="icon">📜</span> Thiên Cơ Nhiệm Vụ
              ${(a.activeQuests||[]).filter(q=>q.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(a.activeQuests||[]).filter(q=>q.status==="active").length}</span>`:""}
            </li>
          </div>

          <!-- PHÂN HỆ 2: TU CHÂN (Tự Thân & Tu Luyện) -->
          <li class="nav-section ${i.tuchan?"collapsed":""}" data-section="tuchan">
            <span>TU CHÂN</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${i.tuchan?"collapsed":""}" id="sec-tuchan">
            <li class="nav-item ${H.currentPage==="stats"?"active":""}" data-page="stats">
              <span class="icon">🧘</span> Tu Luyện & Cảnh Giới
              ${(C=(w=H.player)==null?void 0:w.realmInfo)!=null&&C.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite" title="Có thể đột phá!">!</span>':""}
            </li>
            <li class="nav-item ${["skills","education","library","glitch"].includes(H.currentPage)?"active":""}" data-page="skills">
              <span class="icon">⚡</span> Kỹ Năng & Lĩnh Ngộ
              ${(a.glitchInsight||0)>0?`<span class="badge" style="background: #a855f7;" title="Điểm Thấu Triệt">${a.glitchInsight}</span>`:""}
            </li>
            <li class="nav-item ${H.currentPage==="inventory"?"active":""}" data-page="inventory">
              <span class="icon">🎒</span> Càn Khôn Túi
              ${(a.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)" title="Đan độc">⏳</span>':""}
            </li>
          </div>

          <!-- PHÂN HỆ 3: TRANH ĐẤU (Chiến Đấu & Thử Thách) -->
          <li class="nav-section ${i.tranhdau?"collapsed":""}" data-section="tranhdau">
            <span>TRANH ĐẤU</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${i.tranhdau?"collapsed":""}" id="sec-tranhdau">
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
          <li class="nav-section ${i.tienphu?"collapsed":""}" data-section="tienphu">
            <span>TIÊN PHỦ</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${i.tienphu?"collapsed":""}" id="sec-tienphu">
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
          <li class="nav-section ${i.thuonghoi?"collapsed":""}" data-section="thuonghoi">
            <span>THƯƠNG HỘI</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${i.thuonghoi?"collapsed":""}" id="sec-thuonghoi">
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

          ${a.role==="admin"?`
          <!-- PHÂN HỆ 6: VÔ THƯỢNG (Admin) -->
          <li class="nav-section ${i.vothuong?"collapsed":""}" data-section="vothuong">
            <span>VÔ THƯỢNG</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${i.vothuong?"collapsed":""}" id="sec-vothuong">
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(q=>{q.addEventListener("click",()=>{H.currentPage=q.dataset.page,J()})}),document.querySelectorAll(".nav-section[data-section]").forEach(q=>{q.addEventListener("click",()=>{const L=q.dataset.section;H._collapsedNav=H._collapsedNav||{},H._collapsedNav[L]=!H._collapsedNav[L],localStorage.setItem("collapsedNav",JSON.stringify(H._collapsedNav));const M=document.getElementById(`sec-${L}`);M&&(M.classList.toggle("collapsed",H._collapsedNav[L]),q.classList.toggle("collapsed",H._collapsedNav[L]))})}),(E=document.getElementById("btnFabChat"))==null||E.addEventListener("click",()=>at("chat")),(P=document.getElementById("btnFabSocial"))==null||P.addEventListener("click",()=>at("social"));const h=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');h&&h.addEventListener("click",q=>{q.stopPropagation(),H.currentPage="events",H.popupOpen=!1,J()}),(I=document.getElementById("btnPopupClose"))==null||I.addEventListener("click",()=>{H.popupOpen=!1,J()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(q=>{q.addEventListener("click",()=>at(q.dataset.popup))}),document.querySelectorAll(".btn-open-settings").forEach(q=>{q.addEventListener("click",L=>{L.stopPropagation(),oe(a)})}),(O=document.getElementById("btnSidebarLogout"))==null||O.addEventListener("click",q=>{q.stopPropagation(),Ht()}),re(),H.popupOpen&&ie();const p=document.getElementById("searchPlayerInput"),o=document.getElementById("searchResults");let s=null;p&&o&&(p.addEventListener("input",()=>{clearTimeout(s);const q=p.value.trim();if(q.length<2){o.style.display="none";return}s=setTimeout(async()=>{try{const L=await D.searchPlayers(q),M=L.players||L.results||[];M.length===0?o.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':o.innerHTML=M.map(S=>{var B;return`
              <div class="search-result" data-pid="${S.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${S.name} <span style="opacity:0.4">Lv.${S.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((B=S.realmInfo)==null?void 0:B.name)||""}</span>
              </div>
            `}).join(""),o.style.display="block",o.querySelectorAll(".search-result").forEach(S=>{S.addEventListener("click",()=>{H.currentPage="profile",H._viewProfileId=S.dataset.pid,o.style.display="none",p.value="",J()}),S.addEventListener("mouseenter",()=>S.style.background="rgba(255,255,255,0.08)"),S.addEventListener("mouseleave",()=>S.style.background="transparent")})}catch{o.style.display="none"}},300)}),p.addEventListener("blur",()=>{setTimeout(()=>{o.style.display="none"},200)}),p.addEventListener("keydown",q=>{q.key==="Escape"&&(o.style.display="none",p.blur())})),ae()}function at(a){H.popupOpen=!0,H.popupPage=a,J()}function ie(){const a=document.getElementById("popupContent");a&&(H.popupPage==="chat"?wt(a,rt):H.popupPage==="social"&&kt(a,rt))}const se={combat:Nt,education:nt,stats:Bt,skills:nt,inventory:it,travel:ft,alchemy:st,quests:Tt,admin:Kt,social:kt,chat:wt,market:jt,realm:Dt,events:Vt,dungeon:yt,housing:Qt,wiki:Ft,npcshop:Jt,guild:Wt,library:dt,profile:Xt,arena:Yt,auction:Lt,dailyquest:$t,worldboss:Zt,gacha:te,leaderboard:ee,tiencanh:xt,glitch:(a,t)=>{localStorage.setItem("skillsTab","glitch"),nt(a,t)}};function re(){const a=document.getElementById("pageContent");if(!a)return;const t=se[H.currentPage];t&&t(a,rt)}function de(){var T,y,i,u,v,h;const a=H.player;if(!a)return;const t=((T=a.stats)==null?void 0:T.maxHp)??a.maxHp??100,e=Math.min(t,a.currentHp),l=t>0?Math.min(100,Math.max(0,e/t*100)):0,c=((y=a.stats)==null?void 0:y.maxEnergy)??a.maxEnergy??50,$=a.usableEnergy??Math.max(0,c-(a.reservedEnergy??0)),d=a.reservationPct??0,r=$>0?Math.min(100,Math.max(0,a.currentEnergy/$*100)):0,g=document.querySelector(".sidebar-player");if(g){const p=a.maxStamina>0?Math.max(0,a.currentStamina/a.maxStamina*100):0,o=a.xpToNext&&a.xpToNext>0?Math.min(100,Math.max(0,(a.xp||0)/a.xpToNext*100)):0;g.innerHTML=`
      <div class="player-name">${a.name}</div>
      <div class="player-meta">Lv.${a.level} · ${((i=a.realmInfo)==null?void 0:i.fullName)||"?"}</div>
      ${St(a)}
      ${Et(a)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${e}/${t}
            ${e<t?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(u=a.skills)!=null&&u.some(s=>s.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${l}%" data-low="${l<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực (Thế Giới)</span>
          <span>
            ${a.currentStamina??100}/${a.maxStamina??100}
            ${(a.currentStamina??100)<(a.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((v=a.stats)==null?void 0:v.staminaRegen)??2}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${p}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔵 Linh Lực (Thực Chiến)</span>
          <span>
            ${a.currentEnergy}/${$}
            ${d>0?`<span style="font-size:10px; color:#f59e0b; margin-left:4px;" title="Khóa ${d}% bởi Tâm Pháp Hào Quang">(Khóa ${d}%)</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${r}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>✨ Tu Vi (Cấp ${a.level})</span>
          <span>${(a.xp??0).toLocaleString()}/${(a.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${o.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${o}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${a.gold??0} Linh Thạch</div>`}const f=document.querySelector('.nav-item[data-page="stats"]');if(f){let p="";a.statPoints>0&&(p+=`<span class="badge">${a.statPoints}</span>`),(h=a.realmInfo)!=null&&h.canBreakthrough&&(p+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),f.querySelectorAll(".badge").forEach(o=>o.remove()),f.insertAdjacentHTML("beforeend",p)}}async function et(){try{const[a,t,e,l,c]=await Promise.all([D.getMonsters(),D.getSkills(),D.getItems(),D.getMedicines(),D.getEducation()]);H.monsters=a.monsters||[],H.skills=t.skills||[],H.items=e.items||[],H.medicines=l.medicines||[],H.educationTrees=c.trees||[],H.exploration=await D.getExploration(),H.recipes=(await D.getRecipes()).recipes,H.npcs=(await D.getNpcs()).npcs||[]}catch(a){console.error("Lỗi tải dữ liệu:",a)}}function W(a,t="info"){var l;(l=document.querySelector(".notification"))==null||l.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=a,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}function Ht(){confirm("Đạo hữu có chắc chắn muốn đăng xuất tài khoản?")&&(tt&&clearInterval(tt),localStorage.removeItem("playerId"),localStorage.setItem("isLoggedOut","true"),H.playerId=null,H.player=null,H.popupOpen=!1,W("Đã đăng xuất tài khoản thành công.","info"),ot())}function oe(a){var r,g,f,T,y,i;let t=document.getElementById("settings-modal-overlay");t&&t.remove(),t=document.createElement("div"),t.id="settings-modal-overlay",t.style.cssText=`
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
            <div><span style="color: var(--text-dim);">Đạo danh:</span> <strong>${a.name||"Vô Danh"}</strong></div>
            <div><span style="color: var(--text-dim);">Cấp độ:</span> <strong style="color: var(--blue);">Lv.${a.level||1}</strong></div>
            <div><span style="color: var(--text-dim);">Cảnh giới:</span> <strong style="color: var(--gold);">${((r=a.realmInfo)==null?void 0:r.fullName)||"Phàm Nhân"}</strong></div>
            <div><span style="color: var(--text-dim);">Vai trò:</span> <span>${a.role==="admin"?"👑 Thiên Đạo":"Tu Sĩ"}</span></div>
            <div><span style="color: var(--text-dim);">ID Tài khoản:</span> <span style="font-family: monospace; color: var(--text-dim);">#${a.id||1}</span></div>
            <div><span style="color: var(--text-dim);">Linh Thạch:</span> <span style="color: var(--gold);">💎 ${(a.gold||0).toLocaleString()}</span></div>
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
  `,document.body.appendChild(t);const $=()=>t.remove();(g=t.querySelector("#btnCloseSettingsModal"))==null||g.addEventListener("click",$),t.addEventListener("click",u=>{u.target===t&&$()});const d=u=>{u.key==="Escape"&&($(),window.removeEventListener("keydown",d))};window.addEventListener("keydown",d),(f=t.querySelector("#chkSettingSound"))==null||f.addEventListener("change",u=>{localStorage.setItem("rpg_sound_enabled",u.target.checked),W(u.target.checked?"Đã bật hiệu ứng âm thanh":"Đã tắt hiệu ứng âm thanh","info")}),(T=t.querySelector("#chkSettingShake"))==null||T.addEventListener("change",u=>{localStorage.setItem("rpg_shake_enabled",u.target.checked),W(u.target.checked?"Đã bật rung màn hình":"Đã tắt rung màn hình","info")}),(y=t.querySelector("#chkSettingToast"))==null||y.addEventListener("change",u=>{localStorage.setItem("rpg_toast_enabled",u.target.checked)}),(i=t.querySelector("#btnModalLogout"))==null||i.addEventListener("click",()=>{$(),Ht()})}ne();
//# sourceMappingURL=index-DK3viuNs.js.map
