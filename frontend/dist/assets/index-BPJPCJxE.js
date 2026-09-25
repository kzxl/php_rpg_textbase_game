(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const T of l)if(T.type==="childList")for(const g of T.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&o(g)}).observe(document,{childList:!0,subtree:!0});function e(l){const T={};return l.integrity&&(T.integrity=l.integrity),l.referrerPolicy&&(T.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?T.credentials="include":l.crossOrigin==="anonymous"?T.credentials="omit":T.credentials="same-origin",T}function o(l){if(l.ep)return;l.ep=!0;const T=e(l);fetch(l.href,T)}})();const ut="/api";class vt{async request(t,e={}){try{const o=await fetch(`${ut}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),l=await o.json();if(!o.ok)throw new Error(l.error||`HTTP ${o.status}`);return l}catch(o){throw console.error(`API Error [${t}]:`,o),o}}register(t,e,o,l){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:o,gender:l})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,o=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:o})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,o=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:o})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,o=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:o})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,o,l=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:o,lockAffixIndex:l})})}commitCrime(t,e){return this.request(`/player/${t}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:e})})}escapeJail(t){return this.request(`/player/${t}/escape-jail`,{method:"POST"})}bail(t){return this.request(`/player/${t}/bail`,{method:"POST"})}enrollNode(t,e,o){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:o})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,o){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:o})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,o,l){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:o,amount:l})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,o=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${o}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,o,l){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:o,message:l})})}getMarketListings(t="",e="newest"){const o=new URLSearchParams;return t&&o.set("type",t),e&&o.set("sort",e),this.request(`/market?${o.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,o,l,T){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:o,quantity:l,price:T})})}buyFromMarket(t,e,o=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:o})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,o){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:o})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,o,l){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:o,description:l})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,o,l=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:o,lockAffixIndex:l})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,o,l=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:o,quantity:l})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,o,l=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:o,durationHours:l})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,o=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:o})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const N=new vt;function ht(i,t){var h,w;const{state:e,api:o,notify:l,renderGame:T,updateSidebar:g}=t,d=e.player,b=e.exploration?e.exploration[d.currentArea||"thanh_lam_tran"]:null,y=b?b.name:"Vùng Đất Vô Danh",f=b?b.staminaCost:10;i.innerHTML=`
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
        <p class="text-dim mb-md">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
        <div class="flex justify-center gap-2 flex-wrap">
          <button class="btn btn--gold btn--lg" id="btnExplore" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span>🔍 Tìm Kiếm</span>
            <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${f} Thể Lực</span>
          </button>
          <button class="btn btn--red btn--lg" id="btnAutoBattle" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span>⚡ Tự Động Quét Quái</span>
          </button>
        </div>
      </div>
    </div>

    <!-- DẤU VẾT YÊU THÚ (tấn công) -->
    <div class="panel mt-md">
      <div class="panel-title">⚔️ Yêu Thú Đang Rình Rập <span class="subtitle">(Tối đa 5 con)</span></div>
      <div class="panel-body no-pad" id="trackedMonstersList" style="max-height: 400px; overflow-y: auto;">
        <div style="padding: 16px; text-align: center;" class="text-dim">Đang rà soát dấu vết...</div>
      </div>
    </div>

    <div id="combatResult"></div>
    <div id="exploreResult"></div>

    <!-- QUẦN THỂ YÊU THÚ -->
    <div class="panel mt-md">
      <div class="panel-title">📋 Quần Thể Yêu Thú <span class="subtitle">(Có thể xuất hiện tại đây)</span></div>
      <div class="panel-body no-pad" id="areaMonstersList" style="max-height: 250px; overflow-y: auto;">
      </div>
    </div>`;const x=((h=d.insightLevels)==null?void 0:h.monster)??0,p=async()=>{try{const $=await o.getAreaMonsters(d.id);if($.monsters){e.player.trackedMonsters=$.monsters;const k=document.getElementById("trackedMonstersList");if(!k)return;if($.monsters.length===0){k.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}k.innerHTML=$.monsters.map(L=>{const S=L.currentHp/L.stats.hp*100,C=S>60?"var(--green)":S>30?"var(--orange)":"var(--red)";let P='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';x>=1&&(P=`<div class="item-desc text-sm text-dim mb-sm">${L.description||"Yêu thú vùng này."}</div>`);let M="";x>=1&&(M=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${S}%; background: ${C}; height: 100%;"></div>
            </div>`);let I=x>=2?`❤ ${L.currentHp}/${L.stats.hp}`:x>=1?"❤ ???":"";return`
            <div class="monster-card ${L.is_boss?"boss":""}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${L.icon||"👾"}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${L.is_boss?"var(--red)":"var(--text-bright)"}; font-size: 15px;">${L.name}</span>
                    <span class="badge ${L.is_boss?"bg-red":"bg-darker"}">Cấp ${L.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${C};">${I}</div>
                </div>
                ${M}
                ${P}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${L.instance_id}" data-monster-id="${L.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),k.querySelectorAll(".btnTrackedCombat").forEach(L=>{L.addEventListener("click",S=>{const C=S.currentTarget.dataset.monsterId,P=S.currentTarget.dataset.instanceId;Y(t,C,P)})})}}catch($){console.error($)}},v=async()=>{try{const $=await o.getAreaMonsterTemplates(d.currentArea||"thanh_lam_tran");if($.monsters){const k=document.getElementById("areaMonstersList");if(!k)return;if($.monsters.length===0){k.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}k.innerHTML=$.monsters.map(L=>`
            <div style="display: flex; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div style="font-size: 24px; width: 36px; text-align: center;">${L.icon||"👾"}</div>
              <div style="flex: 1;">
                <div class="flex items-center gap-2">
                  <span class="bold" style="color: ${L.isBoss?"var(--red)":"var(--text-bright)"}; font-size: 13px;">${L.name}</span>
                  <span class="badge ${L.isBoss?"bg-red":"bg-darker"} text-xs">Cấp ${L.level}</span>
                </div>
                <div class="text-xs text-dim">${L.description||"Yêu thú sinh sống tại khu vực này."}</div>
              </div>
            </div>
          `).join("")}}catch($){console.error($)}};p(),v(),(w=document.getElementById("btnExplore"))==null||w.addEventListener("click",()=>mt(t));let u=!1;const c=document.getElementById("btnAutoBattle"),r=document.getElementById("btnStopAuto"),n=document.getElementById("panelKhamPha"),s=document.querySelector(".toggle-auto-combat"),m=document.getElementById("autoCombatStatus");c&&c.addEventListener("click",()=>{u=!0,n.style.display="none",s.style.display="block",a()}),r&&r.addEventListener("click",()=>{u=!1,n.style.display="block",s.style.display="none"});async function a(){var S,C,P,M,I,z,K,O,_,A;let $=0,k=0,L=0;for(;u;){m.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${$} trận | +${k} XP | +${L} Linh Thạch</div>
        `;const R=e.player;if((R.currentStamina||0)<f){m.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",u=!1;break}if(R.currentHp/R.maxHp<.2){m.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",u=!1;break}try{const H=await o.explore(e.playerId);if(e.player=H.player,g(),H.event&&(H.event.type==="monster"||H.event.type==="worldBoss")){if(m.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${H.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(gt=>setTimeout(gt,600)),!u)break;const q=await o.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:H.event.monsterId})});if(e.player=q.player,g(),q.outcome==="win")$++,k+=((S=q.rewards)==null?void 0:S.xp)||0,L+=((C=q.rewards)==null?void 0:C.gold)||0,m.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(P=q.monster)==null?void 0:P.name}! (+${((M=q.rewards)==null?void 0:M.xp)||0} XP, +${((I=q.rewards)==null?void 0:I.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${$} | Tiếp tục sau 1s...</div>
                   `;else{m.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${q.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,u=!1;break}}else if(H.event&&H.event.type==="monster_ambush"&&H.event.combatResult){const q=H.event.combatResult;if(q.outcome==="win")$++,k+=((z=q.rewards)==null?void 0:z.xp)||0,L+=((K=q.rewards)==null?void 0:K.gold)||0,m.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(O=q.monster)==null?void 0:O.name}! (+${((_=q.rewards)==null?void 0:_.xp)||0} XP)</div>`;else{m.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",u=!1;break}}else m.innerHTML=`<div class='text-blue'>${((A=H.event)==null?void 0:A.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(H){m.innerHTML=`<div class='text-red'>Lỗi: ${H.message}. Dừng tự động.</div>`,u=!1;break}await new Promise(H=>setTimeout(H,1200))}}}async function mt(i){var g,d;const{state:t,api:e,notify:o,updateSidebar:l}=i,T=document.getElementById("exploreResult");if(T){T.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const b=await e.explore(t.playerId);t.player=b.player,l();const y=b.event;let f=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(y.type==="monster")f+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${y.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${y.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${y.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(y.type==="monster_ambush"&&y.combatResult){const x=y.combatResult,p=Z(x.log||[]),v=x.outcome==="win"?"🏆 Chiến thắng!":x.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",u=x.outcome==="win"?"var(--green)":x.outcome==="loss"?"var(--red)":"var(--orange)";f+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${y.message}</div>
        <div style="font-size:16px;font-weight:700;color:${u};margin-bottom:12px">${v}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${p}</div>
      `}else if(y.type==="worldBoss")f+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${y.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${y.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${y.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(y.type==="npc"&&y.npcId)f+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${y.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${y.message}</div>
        <div class="text-sm text-dim mb-md">${y.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <button class="btn btn--gold" id="btnNpcInteract">💬 Bái Kiến</button>
      `;else if(y.type==="player_encounter"&&y.targetPlayer){const x=y.targetPlayer;f+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${x.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${x.realmTierName||"Phàm nhân"} · Cấp ${x.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${x.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${x.id}">⚔️ Cướp Bóc</button>
        </div>
      `}else f+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${y.message}</div>
        ${y.gold?`<div class="text-gold bold">+${y.gold} 💎 Linh Thạch</div>`:""}
        ${y.item?`<div class="text-green bold">+1 ${y.item.name}</div>`:""}
        <button class="btn btn--blue mt-md" id="btnExploreContinue">Tiếp tục</button>
      `;f+="</div></div>",T.innerHTML=f,(y.type==="monster"||y.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",x=>{T.innerHTML="",Y(i,x.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async x=>{try{const p=await e.trackMonster(t.playerId,x.target.dataset.mid);p.success?(o(p.message,"success"),T.innerHTML="",typeof i.renderGame=="function"&&i.renderGame()):p.error&&o(p.error,"error")}catch(p){o("Lỗi theo dõi: "+p.message,"error")}})),y.type==="npc"&&y.npcId&&((g=document.getElementById("btnNpcInteract"))==null||g.addEventListener("click",async()=>{await yt(i,y.npcId,T)})),(d=document.getElementById("btnExploreContinue"))==null||d.addEventListener("click",()=>{T.innerHTML=""})}catch(b){T.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${b.message}</div></div>`}}}async function yt(i,t,e){const{state:o,api:l,notify:T,renderGame:g}=i,d=document.getElementById("npcQuestModal")||e;try{const y=(await l.getNpc(t)).npc;if(!y)return;const f=(o.player.activeQuests||[]).map(p=>p.quest_id);let x=y.quests.map(p=>{const v=f.includes(p.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${p.name}</span>
            <span class="text-xs badge" style="background:${p.type==="kill"?"var(--red)":"var(--green)"}">${p.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${p.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${p.rewards.gold?p.rewards.gold+"💎 ":""}${p.rewards.xp?p.rewards.xp+"✨ ":""}${p.rewards.skillChance?"🎯 "+p.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${v?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${p.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");d.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${y.icon||"🧓"} ${y.name} <span class="subtitle">${y.profession}</span></div>
        <div class="panel-body">
          ${x||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,d.querySelectorAll(".btn-accept-quest").forEach(p=>{p.addEventListener("click",async()=>{p.disabled=!0,p.textContent="⏳...";try{const v=await l.acceptQuest(o.playerId,p.dataset.npc,p.dataset.qid);o.player=v.player,T(v.message,"success"),g()}catch(v){T(v.message||"Lỗi nhận quest","error"),p.disabled=!1,p.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(b){console.error("NPC load error:",b)}}async function Y(i,t,e=null){var y,f;const{state:o,api:l,notify:T,updateSidebar:g,renderGame:d}=i,b=document.getElementById("combatResult");if(b){if(!o.player.currentHp||o.player.currentHp<=0)return T("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(o.player.hospitalRemaining>0)return T(`Đang tịnh dưỡng! Còn ${o.player.hospitalRemaining}s`,"error");b.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,b.scrollIntoView({behavior:"smooth"});try{const x=await l.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:o.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(o.player=x.player,x.outcome==="no_energy"){b.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${x.log[0]}</div></div>`,g();return}const p=x.monster,v=Math.max(0,o.player.currentHp/o.player.maxHp*100),u=Math.max(0,p.currentHp/p.maxHp*100),c={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},r=c[x.outcome]||c.loss,n=(y=x.rewards)!=null&&y.gold?` · +${x.rewards.gold} 💎`:"",s=x.rewards?` · +${x.rewards.xp} XP${n}`:"",m={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[x.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};b.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${r.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${r.icon}</span> <span>${r.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${x.turns}/${x.maxTurns||25} Lượt ${s}
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
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${(f=x.glitchEvents)!=null&&f.length?x.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${p.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${p.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${p.level||1} · ${p.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${u}%; height: 100%; background: ${u>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${p.currentHp}/${p.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${x.weakpoint?`
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${x.weakpoint}</strong> (x2.5 Dmg)
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
            ${Z(x.log)}
          </div>
        </div>
      </div>`;const a=document.getElementById("cardMonster"),h=document.getElementById("cardPlayer");x.glitchEvents&&x.glitchEvents.length>0&&a?x.glitchEvents.forEach((w,$)=>{setTimeout(()=>{W(a,`-${w.damage} 🌌 [VẾT NỨT]`,"glitch"),a.classList.add("shake"),setTimeout(()=>a.classList.remove("shake"),400)},$*400+200)}):a&&x.rewards&&W(a,`-${Math.round(p.maxHp*.4)} 💥`,"crit"),g(),e&&typeof d=="function"&&setTimeout(()=>d(),1500)}catch(x){b.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${x.message}</div></div>`}}}function W(i,t,e="normal"){if(!i)return;const o=document.createElement("div");o.className=`floating-damage damage-${e}`,o.textContent=t,i.appendChild(o),setTimeout(()=>o.remove(),1100)}function Z(i){return(i||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function tt(i,t){const{state:e,api:o,notify:l}=t,T=e.player,g=(T.skills||[]).find(x=>(typeof x=="string"?x:x.id)==="nhan_thuat"),d=g?g.level||1:0,b=[...e.skills].sort((x,p)=>(x.tier||1)-(p.tier||1)),y=(T.skills||[]).map(x=>typeof x=="string"?x:x.id),f={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};i.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${d}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${b.map(x=>{const p=y.includes(x.id),v=x.tier||1,u=v>d+1,c=v<=d;let r="";return x.requirements&&x.requirements.length>0?c||p?r=`<div class="mt-sm text-xs text-orange">Điều kiện: ${x.requirements.map(n=>`<br>• ${n}`).join("")}</div>`:u?r=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${v}.</div>`:r='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':r='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${p?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${x.name} ${p?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${p?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${f[v]||v}</span>
                    <span class="text-xs text-dim">${x.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${c||p?x.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${x.type!=="passive"&&x.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${x.cost} linh lực</div>`:""}
                
                ${r}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${p?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${u?"btn--dark":"btn--gold"} btn--sm btn-learn" ${u?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${x.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,i.querySelectorAll(".accordion-header").forEach(x=>{x.addEventListener("click",()=>{const p=x.nextElementSibling;p.style.display==="none"?(p.style.display="block",x.querySelector("div:last-child").textContent="▲"):(p.style.display="none",x.querySelector("div:last-child").textContent="▼")})}),i.querySelectorAll(".btn-learn").forEach(x=>{x.addEventListener("click",async p=>{p.stopPropagation();try{const v=await o.learnSkill(T.id,x.dataset.sid);v.error?l(v.error,"error"):(e.player=v.player,l(v.message,"success"),tt(i,t))}catch(v){l("Lỗi học kỹ năng: "+v.message,"error")}})})}function bt(i,t){var v,u,c;const{state:e,api:o,notify:l,renderGame:T}=t,g=e.player,d=g.stats,b=g.allocatedStats||{},y=5,f=g.currentEnergy>=y&&!g.hospitalRemaining,x=g.talentDisplay||{},p=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];i.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${g.currentEnergy}/${g.maxEnergy} linh lực · Chi phí: ${y}/lần</span>
      </div>
    </div>

    ${g.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${g.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${((v=g.realmInfo)==null?void 0:v.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(u=g.realmInfo)!=null&&u.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${p.map(([r,n,s])=>{const m=x[r]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${m.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${n}</div>
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
        ${p.map(([r,n,s,m])=>{const a=x[r]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},h=Math.floor(g.currentEnergy/y)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${n}</span> ${s}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${m}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${d[r]??0}</span>
              ${b[r]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${b[r]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${a.color};min-width:50px" title="Căn Cốt: ${a.name} (×${a.value})">${a.icon}×${a.value}</span>
              <input type="number" class="train-count" data-stat="${r}" min="1" max="${h}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${f?"":"disabled"}>
              <button class="btn btn--sm ${f?"btn--blue":"btn--dark"} train-btn" data-train="${r}" ${f?"":"disabled"} title="Tốn ${y} Linh lực/lần · Căn cốt ×${a.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${y} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(g.currentEnergy/y)}</strong> lần hiện tại.
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
    </div>`,(c=i.querySelector(".btn-breakthrough"))==null||c.addEventListener("click",async()=>{try{const r=i.querySelector(".btn-breakthrough");r.disabled=!0,r.innerHTML="Đang Độ Kiếp...";const n=await o.attemptBreakthrough(e.playerId);e.player=n.player,l(n.message,"success"),T()}catch(r){l(r.message||"Đột phá thất bại","error");const n=i.querySelector(".btn-breakthrough");n&&(n.disabled=!1,n.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),i.querySelectorAll(".train-btn").forEach(r=>{r.addEventListener("click",async n=>{n.stopPropagation();const s=i.querySelector(`.train-count[data-stat="${r.dataset.train}"]`),m=parseInt(s==null?void 0:s.value)||1;try{const a=await o.trainStat(e.playerId,r.dataset.train,m);e.player=a.player,l(a.message,"success"),T()}catch(a){l(a.message||"Lỗi rèn luyện","error")}})})}function et(i,t){var s;const{state:e,api:o,notify:l,renderGame:T}=t,g=e.player,d=e.educationTrees||[],b=g.unlockedNodes||[],y=g.studyingNode||"",f=y?y.split("|")[0]:"",x=g.studyEndsAt||0,p=Math.max(0,x-Math.floor(Date.now()/1e3)),v=g.treeProgress||{},u=g.skillProgress||{};let c=localStorage.getItem("eduActiveTree")||((s=d[0])==null?void 0:s.id),r=d.find(m=>m.id===c)||d[0];!r&&d.length>0&&(r=d[0]);const n=()=>{if(!r){i.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const m=d.map(C=>`
      <button class="edu-tab ${C.id===r.id?"active":""}" data-tab="${C.id}">
        <span class="edu-tab-icon">${C.icon}</span>
        <span class="edu-tab-name">${C.name}</span>
        <span class="edu-tab-badge">${v[C.id]||0}</span>
      </button>
    `).join("");let a="";if(f){let C=null,P=null;d.forEach(M=>{const I=M.nodes.find(z=>z.id===f);I&&(C=I,P=M)}),C&&(a=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${P.name}</div>
              <div class="text-gold text-lg bold">${C.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${p}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${p>0?"disabled":""}>
                ${p>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const h=v[r.id]||0;let w=null;for(const C of r.milestones||[])if(h<C.require){w=C;break}let $="";w?$=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${w.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${w.description}</div>
        </div>
      `:$='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const k=g.discoveredNodes||[],L=(r.nodes||[]).map(C=>{const P=b.includes(C.id),M=f===C.id,I=(C.prerequisites||[]).every(q=>b.includes(q)),z=r.nodes.some(q=>(q.prerequisites||[]).includes(C.id));if(!(k.includes(C.id)||P||!(C.prerequisites&&C.prerequisites.length>0))||P&&z)return"";let O="";M?O="studying":P?O="done":O="available";let _="";M?_='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':f?_='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':P?_=`<button class="btn btn--sm btn--gold btn-learn" data-node="${C.id}">Tiếp Tục Lãnh Ngộ (${C.duration}s)</button>`:I?_=`<button class="btn btn--sm btn--blue btn-learn" data-node="${C.id}">Bắt Đầu (${C.duration}s)</button>`:_='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const A=u[C.id]||{level:1,exp:0},R=A.level*100;let H="";return P&&(H=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${A.level} | Độ hiểu thấu: ${A.exp}/${R}</div>`),`
        <div class="edu-node ${O}">
          <div class="edu-node-info">
            <div class="edu-node-title">${C.name}</div>
            <div class="edu-node-desc">${C.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${C.bonusDescription}</div>
            ${H}
          </div>
          <div class="edu-node-action">
            ${_}
          </div>
        </div>
      `}).join("");i.innerHTML=`
      <div class="page-header">
        <h1>🧘 Công Pháp Tu Luyện</h1>
        <div class="text-dim text-sm mt-xs">Tu luyện công pháp, nâng cao thông thạo từng bước.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${m}</div>
          ${a}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${r.icon} ${r.name}</h2>
              <p class="text-dim mb-md">${r.description}</p>
              
              <h3 class="text-md mb-xs mt-md border-b pb-xs">🌟 Cảnh Giới Đột Phá</h3>
              <div class="edu-milestones-grid mb-lg">
                ${$||'<div class="text-dim text-sm">Nhánh này chưa có cảnh giới đặc biệt.</div>'}
              </div>

              <h3 class="text-md mb-xs border-b pb-xs">📖 Pháp Quyết</h3>
              <div class="edu-nodes-list">
                ${L||'<div class="text-dim text-sm">Chưa có pháp quyết.</div>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,i.querySelectorAll(".edu-tab").forEach(C=>{C.addEventListener("click",()=>{const P=C.dataset.tab;localStorage.setItem("eduActiveTree",P),c=P,r=d.find(M=>M.id===P)||d[0],n()})}),window.eduTimer&&clearInterval(window.eduTimer),f&&x>0&&(window.eduTimer=setInterval(()=>{const C=Math.floor(Date.now()/1e3);let P=Math.max(0,x-C);const M=document.getElementById("eduCounter");if(M&&(M.innerText=P+"s"),P<=0){clearInterval(window.eduTimer);const I=document.getElementById("btnCheckEdu");I&&(I.disabled=!1,I.innerHTML="✨ Đột Phá!")}},1e3));const S=i.querySelector("#btnCheckEdu");S&&S.addEventListener("click",async()=>{try{S.disabled=!0,S.innerHTML="Đang xử lý...";const C=await o.checkEducation(e.playerId);e.player=C.player,l(C.message,C.completed?"success":"info"),T()}catch(C){l(C.message||"Lỗi đột phá","error"),S.disabled=!1,S.innerHTML="Thử lại"}}),i.querySelectorAll(".btn-learn").forEach(C=>{C.addEventListener("click",async()=>{try{const P=C.dataset.node;C.disabled=!0,C.innerHTML="Chờ...";const M=await o.enrollNode(e.playerId,P,r.id);e.player=M.player,l(M.message,"success"),T()}catch(P){l(P.message||"Lỗi ghi danh","error"),C.disabled=!1,C.innerHTML="Bắt Đầu"}})})};n()}function xt(i,t){const{state:e,api:o,notify:l,renderGame:T}=t,g=e.player.skills||[],d=g.map(p=>typeof p=="string"?p:p.id),b=e.skills||[],y={combat:{icon:"⚔️",name:"Chiến Đấu",desc:"Chiêu thức sử dụng trong giao đấu"},life:{icon:"🛠️",name:"Sinh Hoạt",desc:"Thu thập, chế tạo, sinh tồn"},internal:{icon:"🧘",name:"Nội Công",desc:"Thụ động tăng cường bản thân"},gongfa:{icon:"📖",name:"Công Pháp",desc:"Tu luyện công pháp, nâng cao cảnh giới"}};let f=localStorage.getItem("skillsTab")||"combat";const x=()=>{if(f==="gongfa"){const n=Object.entries(y).map(([m,a])=>{const h=m==="gongfa"?(e.educationTrees||[]).length:g.filter(w=>{const $=typeof w=="string"?w:w.id,k=b.find(L=>L.id===$);return k&&(k.category||"combat")===m}).length;return`<button class="skill-tab ${m===f?"active":""}" data-tab="${m}">
          ${a.icon} ${a.name} <span class="skill-tab-count">${h}</span>
        </button>`}).join("");i.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${n}</div>
        <div id="gongfa-content"></div>
      `,i.querySelectorAll(".skill-tab").forEach(m=>{m.addEventListener("click",()=>{f=m.dataset.tab,localStorage.setItem("skillsTab",f),x()})});const s=i.querySelector("#gongfa-content");s&&et(s,t);return}const p=g.map(n=>{const s=typeof n=="string"?n:n.id;return{...b.find(a=>a.id===s)||{name:s,id:s,category:"combat"},level:n.level||1,xp:n.xp||n.currentXp||0,equipped:n.equipped||n.isEquipped||!1}}),v=p.filter(n=>(n.category||"combat")===f),u=b.filter(n=>(n.category||"combat")===f&&!d.includes(n.id)),c=Object.entries(y).map(([n,s])=>{const m=n==="gongfa"?(e.educationTrees||[]).length:p.filter(a=>(a.category||"combat")===n).length;return`<button class="skill-tab ${n===f?"active":""}" data-tab="${n}">
        ${s.icon} ${s.name} <span class="skill-tab-count">${m}</span>
      </button>`}).join(""),r=(n,s)=>{const m=n.level*100,a=Math.min(100,n.xp/m*100),h=n.type==="passive",w="★".repeat(Math.min(n.tier||1,7)),$=(n.tier||1)>=5?"var(--gold)":(n.tier||1)>=3?"var(--purple)":"var(--blue)";let k="";return s?h?k='<span style="font-size:10px;color:var(--green)">🔮 Vĩnh Viễn</span>':n.equipped?k=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${n.id}">Tháo</button>`:k=`<button class="btn btn--sm btn--blue equip-btn" data-eq="1" data-sid="${n.id}">Trang Bị</button>`:k='<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>',`
        <div class="skill-card ${s?"":"locked"} ${n.equipped&&!h?"equipped":""}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name">${n.name}</div>
              <div class="skill-card-tier" style="color:${$}">${w} Tầng ${n.tier||1}</div>
            </div>
            <div class="skill-card-action">${k}</div>
          </div>
          <div class="skill-card-desc">${n.description||""}</div>
          ${s?`
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${n.level}</span>
                <span class="text-dim">${n.xp}/${m}</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${a}%"></div></div>
              ${n.masteryBonus?`<div class="skill-mastery-bonus">✨ ${n.masteryBonus}</div>`:""}
            </div>
          `:`
            <div class="skill-card-req">
              ${(n.requirements||[]).map(L=>`<span class="req-tag">🔒 ${L}</span>`).join(" ")}
            </div>
          `}
          ${n.cost?`<div class="skill-card-cost">🔵 ${n.cost} Linh Lực</div>`:""}
        </div>
      `};i.innerHTML=`
      <div class="page-header">
        <h1>⚡ Kỹ Năng & Công Pháp</h1>
        <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
      </div>

      <div class="skill-tabs">${c}</div>

      <div class="panel">
        <div class="panel-title">
          ${y[f].icon} ${y[f].name}
          <span class="subtitle">${y[f].desc}</span>
        </div>
        <div class="panel-body">
          ${v.length===0&&u.length===0?'<div class="text-dim">Chưa có kỹ năng nào trong nhánh này.</div>':""}
          
          ${v.length>0?`
            <div class="skill-grid">
              ${v.map(n=>r(n,!0)).join("")}
            </div>
          `:""}

          ${u.length>0?`
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
              <div class="text-dim text-sm" style="margin-bottom:8px">🔒 Chưa lĩnh ngộ (${u.length})</div>
              <div class="skill-grid">
                ${u.map(n=>r({...n,level:0,xp:0},!1)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,i.querySelectorAll(".skill-tab").forEach(n=>{n.addEventListener("click",()=>{f=n.dataset.tab,localStorage.setItem("skillsTab",f),x()})}),i.querySelectorAll(".equip-btn").forEach(n=>{n.addEventListener("click",async()=>{try{const s=n.dataset.sid,m=n.dataset.eq==="1",a=await o.equipSkill(e.playerId,s,m);e.player=a.player,l(a.message,"success"),x()}catch(s){l(s.message||"Lỗi trang bị","error")}})})};x()}function ft(i,t){return t==="manual"?"📜":i==="weapon"?"⚔️":i==="body"?"🥋":i==="shield"?"🛡️":i==="feet"?"👢":i==="ring"?"💍":"📦"}function X(i,t){let e="",o="";if(i.slot==="weapon"){let b=0,y=0;(i.affixes||[]).forEach(f=>{f.stat==="strength"&&f.type==="flat"&&(b+=f.value),f.stat==="dexterity"&&f.type==="flat"&&(y+=f.value)}),b===0&&(b=i.itemLevel*2+5),y===0&&(y=i.itemLevel+10),e=`⚔️ ${b}`,o=`🎯 ${y}`}else if(i.slot==="body"||i.slot==="shield"||i.slot==="feet"){let b=0;(i.affixes||[]).forEach(y=>{y.stat==="defense"&&y.type==="flat"&&(b+=y.value)}),b===0&&(b=i.itemLevel*3),e=`🛡️ ${b}`}else if(i.slot==="ring"){let b=0;(i.affixes||[]).forEach(y=>{y.stat==="capacity"&&(b+=y.value)}),e=b>0?`🎒 +${b}`:""}const l=(i.affixes||[]).map(b=>$t(b)).map(b=>`<span class="badge badge-dim">${b}</span>`).join(" "),T=i.description||`Một vật phẩm loại ${i.slot} cấp ${i.itemLevel} thuộc phẩm chất ${i.rarity}. Khí tức tỏa ra không tồi.`,g=i.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${i.craftedBy}</strong></div>`:"",d=t?i.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${i.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${i.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${i.rarity}"></span>
          <span class="item-name rarity-${i.rarity}" style="font-size:14px">${i.name}</span>
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
          ${ft(i.slot,i.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${i.name}</strong> là loại ${i.baseType}. ${T}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${i.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${i.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${l||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${g}
          <div class="mt-2 flex justify-end">
            ${d}
          </div>
        </div>
      </div>
    </div>`}function $t(i){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[i.stat]||i.stat,o=i.value>=0?"+":"";return i.type==="flat"?`${o}${i.value} ${e}`:i.type==="increase"?`${o}${i.value}% ${e}`:i.type==="more"?`×${o}${i.value}% ${e}`:`${o}${i.value} ${e}`}function J(i,t){var n,s,m,a,h,w,$;const{state:e,api:o,notify:l,renderGame:T}=t,g=Object.values(e.player.equipment||{}),d=e.player,b=e.medicines||[],y=d.medCooldownRemaining||0,f=e.inventoryTab||"equipped",x=d.skills&&d.skills.some(k=>{const L=typeof k=="string"?k:k.id;return L==="duoc_ly"||L==="y_thuat"}),p=g.find(k=>k.slot==="ring1"),v=g.find(k=>k.slot==="ring2");let u=20;((p==null?void 0:p.id)==="tui_tru_vat"||(n=p==null?void 0:p.baseType)!=null&&n.includes("tru_vat"))&&(u+=((m=(s=p.affixes)==null?void 0:s[0])==null?void 0:m.value)||10),((v==null?void 0:v.id)==="tui_tru_vat"||(a=v==null?void 0:v.baseType)!=null&&a.includes("tru_vat"))&&(u+=((w=(h=v.affixes)==null?void 0:h[0])==null?void 0:w.value)||10),i.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(d.inventory||[]).length} / ${u})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${f==="equipped"?"btn--blue":"btn--dark"}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${f==="weapon"?"btn--blue":"btn--dark"}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${f==="armor"?"btn--blue":"btn--dark"}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${f==="accessory"?"btn--blue":"btn--dark"}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${f==="manual"?"btn--blue":"btn--dark"}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${f==="medicine"?"btn--blue":"btn--dark"}" data-tab="medicine">
          Đan Dược ${y>0?`<span style="color:var(--orange); font-size:11px">(${y}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const c=document.getElementById("invTabContent"),r=()=>{c.querySelectorAll("[data-eid]").forEach(k=>{k.addEventListener("click",async L=>{L.stopPropagation();try{const S=await o.equipItem(e.playerId,k.dataset.eid);e.player=S.player,l(S.message,"success"),T()}catch(S){l(S.message||"Lỗi trang bị","error")}})}),c.querySelectorAll("[data-use]").forEach(k=>{k.addEventListener("click",async L=>{L.stopPropagation();try{const S=await o.useItem(e.playerId,k.dataset.use);e.player=S.player,l(S.message,"success"),T()}catch(S){l(S.message||"Lỗi sử dụng","error")}})})};if(f==="equipped"){const k=d.equipment||{},L=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];c.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${L.map(S=>{const C=k[S.key],P=C&&C.id,M=P?`rarity-${C.rarity}`:"";return`
            <div style="background:${P?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${P?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${S.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${S.name}</div>
              ${P?`<div style="font-size:11px;font-weight:600" class="${M}">${C.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${C.rarity}] Lv${C.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${g.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${g.filter(S=>S&&S.id).map(S=>X(S,!1)).join("")}
      `:""}
    `,r()}else if(f==="medicine")c.innerHTML=`
      <div style="padding:12px">
        ${y>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${y}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${y/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${b.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':b.map(k=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${k.icon||"💊"} ${k.name}</div>
                <div class="item-meta">
                  ${k.description}
                  ${k.healPercent?` · Phục hồi ${k.healPercent}% HP`:""}
                  ${k.cooldownAdd?` · Sinh Đan độc ${k.cooldownAdd}s`:""}
                  ${k.duration?` · Hiệu lực ${k.duration} trận`:""}
                  ${k.toxicity&&x?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${k.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${k.penalty&&x?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${k.penalty.map(L=>`Giảm ${Math.abs(L.value)*100}% ${L.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${k.id}" 
                ${y+(k.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,c.querySelectorAll("[data-med]").forEach(k=>{k.addEventListener("click",async()=>{try{const L=await o.useMedicine(e.playerId,k.dataset.med);e.player=L.player,l(L.message,"success"),T()}catch(L){l(L.message||"Đan độc quá nồng!","error")}})});else{const k=d.inventory||[];let L=[];f==="weapon"?L=k.filter(S=>S.slot==="weapon"&&S.category!=="manual"):f==="armor"?L=k.filter(S=>["body","shield","feet"].includes(S.slot)):f==="accessory"?L=k.filter(S=>["ring","amulet","ring1","ring2"].includes(S.slot)):f==="manual"&&(L=k.filter(S=>S.category==="manual")),c.innerHTML=`
      ${L.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':L.map(S=>X(S,!0)).join("")}
    `,r()}i.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{e.inventoryTab=k.dataset.tab,J(i,t)})}),($=document.getElementById("btnGen"))==null||$.addEventListener("click",async()=>{const k=["common","rare","epic","legendary"];try{const L=await o.generateItem(e.playerId,k[Math.floor(Math.random()*k.length)]);e.player=L.player,e.items=L.items||[],l(L.message,"success"),J(i,t)}catch{l("Lỗi tạo ngẫu nhiên","error")}})}function Tt(i,t){var m,a;const{state:e,api:o,notify:l,renderGame:T}=t,g=e.player,d=e.crimes||[];if((g.jailRemaining??0)>0){const h=g.jailRemaining,w=Math.max(10,100*Math.ceil(h/60)*g.level);i.innerHTML=`
      <div class="page-header"><h1>🏛 Thiên Lao</h1></div>
      <div class="panel">
        <div class="panel-title">Trạng thái</div>
        <div class="panel-body" style="text-align:center">
          <div style="font-size:28px;color:var(--red);font-weight:700">⛓ Bị giam giữ</div>
          <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${h}s</strong></div>
          <div style="margin-top:16px;display:flex;gap:12px;justify-content:center">
            <button class="btn btn--blue" id="btnEscape">🏃 Vượt ngục (3 Nghịch Khí)</button>
            <button class="btn btn--gold" id="btnBail">💰 Bảo lãnh (${w} Lính Thạch)</button>
          </div>
        </div>
      </div>`,(m=document.getElementById("btnEscape"))==null||m.addEventListener("click",async()=>{try{const $=await o.escapeJail(e.playerId);e.player=$.player,l($.message,$.success?"success":"error"),T()}catch($){l($.message||"Lỗi","error")}}),(a=document.getElementById("btnBail"))==null||a.addEventListener("click",async()=>{try{const $=await o.bail(e.playerId);e.player=$.player,l($.message,$.success?"success":"error"),T()}catch($){l($.message||"Lỗi","error")}});return}const y={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},f={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},x=d.reduce((h,w)=>{const $=w.category||"theft";return h[$]||(h[$]=[]),h[$].push(w),h},{}),p=Object.keys(y).map(h=>{const w=x[h];if(!w||w.length===0)return"";const $=y[h];return`
    <div class="panel mt-md" style="border-color: ${$.color}40;">
      <div class="panel-title" style="color: ${$.color};">${$.label} <span class="subtitle text-dim">${w.length} loại</span></div>
      <div class="panel-body no-pad">
        ${w.map(k=>{var I;const L=((I=g.crimeSkills)==null?void 0:I[k.id])??0,S=L<(k.minSkill??0),C=!S&&(g.nerve??0)>=k.nerveCost,P=k.special||[],M=Math.min(95,k.baseSuccessRate+L*.5);return`
            <div class="list-item crime-item ${S?"crime-locked":""}">
              <div class="item-info">
                <div class="item-name" style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:18px">${k.icon}</span>
                  <span>${k.name}</span>
                  ${S?'<span style="opacity:0.5">🔒</span>':""}
                </div>
                <div class="item-desc">${k.description}</div>
                <div class="item-meta" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  <span>⚡ ${k.nerveCost} Khí</span>
                  <span>💰 ${k.rewards.goldMin}-${k.rewards.goldMax}</span>
                  <span style="color:${M>=60?"var(--green)":M>=40?"var(--orange)":"var(--red)"}">🎯 ${Math.round(M)}%</span>
                  ${S?`<span style="color:var(--red)">Cần Skill ${k.minSkill}</span>`:`<span>📊 ${L}/100</span>`}
                </div>
                ${P.length>0?`
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${P.map(z=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${f[z]||z}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <button class="btn btn--sm ${C?"btn--red":""}" data-crime="${k.id}" ${C?"":"disabled"}>
                ${S?"🔒":"Thực hiện"}
              </button>
            </div>`}).join("")}
      </div>
    </div>`}).join(""),v=g.crimeExp||0,u=Math.floor(v/50),c=v%50,r=50,n=c/r*100,s=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${u}</strong>
          <span class="text-dim">${c} / ${r} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${n}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${r-c} EXP</strong> nữa để tăng giới hạn Nghịch Khí. (Giới hạn hiện tại: ${g.maxNerve||15})</div>
      </div>
    </div>
  `;i.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${g.nerve??0}/${g.maxNerve??15} Nghịch Khí · 💰 ${g.gold??0} Linh Thạch</span></div>
    </div>
    ${s}
    ${p}`,i.querySelectorAll("[data-crime]").forEach(h=>{h.addEventListener("click",async()=>{try{const w=await o.commitCrime(e.playerId,h.dataset.crime);e.player=w.player;const $=w.outcome==="success"?"success":w.outcome==="critical_fail"?"error":"info";l(w.message,$),T()}catch(w){l(w.message||"Lỗi","error")}})})}function nt(i,t){const{state:e,api:o,notify:l,updateSidebar:T,renderGame:g}=t,d=e.playerId;e._dungeon||(e._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const b=e._dungeon;async function y(){try{const[r,n]=await Promise.all([o.getMapItems(d),o.getDungeonHistory(d)]);b.mapItems=r.mapItems||[],b.activeRun=r.activeRun||null,b.history=n.history||[],b.loaded=!0,f()}catch(r){l(r.message||"Lỗi tải Bí Cảnh","error")}}function f(){i.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${b.activeRun?x():p()}

      ${b.lastResult?v():""}

      ${u()}
    `,c()}function x(){var m,a;const r=b.activeRun,n=r.currentWave===r.totalWaves,s=((r.currentWave-1)/r.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${r.dungeonName||r.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${s}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${r.currentWave}/${r.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((m=e.player)==null?void 0:m.hospitalRemaining)>0?"disabled":""}>
              ${n?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+r.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((a=e.player)==null?void 0:a.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function p(){return b.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${b.mapItems.map(r=>{const n=r.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${r.item.icon} ${r.item.name} <span style="opacity:0.5">x${r.quantity}</span></div>
                  ${n?`
                    <div class="item-meta">
                      ${n.name} · T${n.tier} · ${n.waves+1} tầng · Boss: ${n.bossName}
                    </div>
                  `:""}
                </div>
                ${n?`<button class="btn btn--sm btn--gold" data-enter="${r.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function v(){var m,a;const r=b.lastResult,n=r.result==="dungeon_complete"?"🏆":r.result==="wave_cleared"?"✅":"💀",s=r.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${s}">
        <div class="panel-title" style="color:${s}">${n} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${r.message}</div>
          ${(m=r.loot)!=null&&m.length?`
            <div style="margin-bottom:8px">
              ${r.loot.map(h=>`<div style="font-size:12px;color:var(--green)">🎁 ${h}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((a=r.combatLog)==null?void 0:a.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(r.combatLog||[]).map(h=>`<div>${h}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function u(){return b.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${b.history.map(r=>{const n=r.status==="completed"?"✅":r.status==="failed"?"❌":r.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${r.status==="completed"?"var(--green)":r.status==="failed"?"var(--red)":"var(--orange)"}">${n} ${r.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${r.wave}/${r.totalWaves} · ${new Date(r.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function c(){var r,n;document.querySelectorAll("[data-enter]").forEach(s=>{s.addEventListener("click",async()=>{const m=s.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){s.disabled=!0;try{const a=await o.enterDungeon(d,m);l(a.message,"success"),e.player=a.player,T(),b.activeRun=a.run,b.lastResult=null,await y()}catch(a){l(a.message,"error"),s.disabled=!1}}})}),(r=document.getElementById("btnFight"))==null||r.addEventListener("click",async()=>{const s=document.getElementById("btnFight");s.disabled=!0,s.textContent="⏳ Đang chiến đấu...";try{const m=await o.fightDungeonWave(d);e.player=m.player,T(),b.lastResult=m,m.result==="dungeon_complete"||m.result==="dungeon_failed"?b.activeRun=null:m.result==="wave_cleared"&&(b.activeRun.currentWave=m.nextWave),f()}catch(m){l(m.message,"error"),s.disabled=!1,s.textContent="⚔️ Chiến Đấu"}}),(n=document.getElementById("btnAbandon"))==null||n.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await o.abandonDungeon(d),l("Đã rời khỏi Bí Cảnh.","info"),b.activeRun=null,b.lastResult=null,await y()}catch(s){l(s.message,"error")}})}b.loaded?f():y()}function at(i,t){const{state:e}=t,o=e._travelTab||"map";i.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Ngao Du</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên và chinh phục bí cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${o==="map"?"active":""}" data-tab="map" style="flex:1;padding:10px;border:none;background:${o==="map"?"rgba(255,255,255,0.08)":"transparent"};color:${o==="map"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${o==="map"?"700":"400"};border-bottom:2px solid ${o==="map"?"var(--gold)":"transparent"};transition:all 0.2s">
        🗺️ Bản Đồ Bát Hoang
      </button>
      <button class="tab-btn ${o==="dungeon"?"active":""}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${o==="dungeon"?"rgba(255,255,255,0.08)":"transparent"};color:${o==="dungeon"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${o==="dungeon"?"700":"400"};border-bottom:2px solid ${o==="dungeon"?"var(--gold)":"transparent"};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
    </div>
    <div id="travelTabContent"></div>
  `,i.querySelectorAll(".tab-btn").forEach(T=>{T.addEventListener("click",()=>{e._travelTab=T.dataset.tab,at(i,t)})});const l=i.querySelector("#travelTabContent");o==="map"?G(l,t):nt(l,t)}async function G(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t;i.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[g,d]=await Promise.all([o.request("/data/areas"),o.request(`/player/${e.playerId}/area`)]),b=g.areas||[],y=d.area,f=d.player,x=d.traveling||!1,p=d.travelRemaining||0,v=d.travelDestination||"";d.message&&l(d.message,"success"),d.player&&(e.player=d.player,T());const u=e.exploration||{},c=u[(f==null?void 0:f.currentArea)||"thanh_lam_tran"],r=(y==null?void 0:y.name)||(c==null?void 0:c.name)||"Vùng Đất Vô Danh",n=(c==null?void 0:c.staminaCost)||10,s={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận"},m=s[f==null?void 0:f.currentArea]||"",a=[...b].sort((h,w)=>(h.sort_order||h.mapY||0)-(w.sort_order||w.mapY||0));if(i.innerHTML=`
      ${x?`
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
                  ${r}
                  <span class="badge" style="background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.4);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${n} TL/lần</div>
              </div>
            </div>
            ${y!=null&&y.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${y.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${(y==null?void 0:y.min_level)||1}+</span>
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
            ${a.map((h,w)=>{const $=u[h.id],k=h.id===f.currentArea&&!x,L=f.level<(h.min_level||1),S=parseInt(h.travel_time)||0,C=($==null?void 0:$.staminaCost)||10,P=s[h.id]||"";let M="rgba(255,255,255,0.08)",I="rgba(255,255,255,0.03)";return k?(M="rgba(34, 197, 94, 0.6)",I="rgba(34, 197, 94, 0.08)"):L&&(M="rgba(239, 68, 68, 0.2)",I="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${k?"current-realm":""} ${L?"locked-realm":""}" 
                     style="border:1px solid ${M}; background:${I}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${k?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${k?"var(--green)":L?"var(--text-dim)":"var(--text-bright)"}">
                        #${w+1} ${h.name}
                      </div>
                      ${L?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${h.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${L?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${L?"var(--red)":"var(--text-dim)"}">
                        Lv.${h.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${S>0?`⏱ ${S}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        🏃 -${C} TL
                      </span>
                    </div>

                    ${P?`
                      <div style="font-size:10px; color:var(--gold); background:rgba(255,215,0,0.05); padding:3px 6px; border-radius:4px; margin-bottom:10px; border-left:2px solid var(--gold)">
                        ${P}
                      </div>
                    `:""}
                  </div>

                  <div style="margin-top:auto">
                    ${k?`
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(34,197,94,0.2); color:var(--green); border:1px solid rgba(34,197,94,0.4)">
                        📍 Đang tọa trấn
                      </button>
                    `:L?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${h.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${h.id}" ${x?"disabled":""}>
                        ${S>0?`🚶 Vi Hành (${S}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,i.querySelectorAll("[data-travel]").forEach(h=>{h.addEventListener("click",async w=>{w.stopPropagation();const $=h.dataset.travel;i.querySelectorAll("[data-travel]").forEach(k=>{k.tagName==="BUTTON"&&(k.disabled=!0),k.style.pointerEvents="none"});try{const k=await o.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:$})});k.player&&(e.player=k.player,T()),l(k.message,"success"),G(i,t)}catch(k){l(k.message||"Lỗi di chuyển!","error"),G(i,t)}})}),x&&p>0){let h=p;const w=p,$=setInterval(async()=>{h--;const k=document.getElementById("travelTimer"),L=document.getElementById("travelBar");if(k&&(k.textContent=`⏳ ${Math.max(0,h)}s`),L&&(L.style.width=`${Math.max(0,h/w*100)}%`),h<=0){clearInterval($);try{const S=await o.request(`/player/${e.playerId}/travel-check`,{method:"POST"});S.player&&(e.player=S.player,T()),S.arrived&&l(S.message,"success"),G(i,t)}catch{G(i,t)}}},1e3)}}catch(g){i.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(g)}}function Q(i,t){var s,m;const{state:e,renderGame:o,notify:l,updateSidebar:T}=t,g=e.player,d=e.recipes||[],b=e.medicines||[],y=e._alchemyTab||"recipes",f=a=>{const h=b.find(w=>w.id===a);return h?(h.icon||"💊")+" "+h.name:a};let x=0,p=0,v=0,u=0;(g.skills||[]).forEach(a=>{const h=typeof a=="string"?a:a.id,w=typeof a=="string"?1:a.level||1;h==="tinh_che"&&(x=w*2),h==="phu_an_thuat"&&(p=w*5),h==="linh_kiem_thuat"&&(v=w*10),h==="cuong_hoa_thuat"&&(u=w*15)});const c=a=>a.split("_").map(h=>h.charAt(0).toUpperCase()+h.slice(1)).join(" "),r=[];Object.values(g.equipment||{}).forEach(a=>{a&&r.push({...a,loc:"eq"})}),(g.inventory||[]).filter(a=>a.slot&&a.slot!=="consumable").forEach(a=>r.push({...a,loc:"inv"}));let n=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${y==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${y==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${x||p||v||u?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${x?`<span>🔥 Thành công +${x}%</span>`:""}
      ${p?`<span>💎 Giảm phí -${p}%</span>`:""}
      ${v?`<span>✨ Chất lượng +${v}%</span>`:""}
      ${u?`<span>⬆️ Nâng đôi ${u}%</span>`:""}
    </div>
    `:""}
  `;if(y==="recipes"){if(n+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!g.materials||Object.keys(g.materials).length===0)n+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[a,h]of Object.entries(g.materials))n+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${c(a)} <span style="color:var(--gold)">x${h}</span></div>`;n+="</div></div>",n+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',d.length===0?n+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':d.forEach(a=>{var S;const h=f(a.target),w=Math.min(100,(a.successRate||100)+x);let $="";(S=a.requirements)!=null&&S.skill&&($=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${c(a.requirements.skill)} lv${a.requirements.level||1}</div>`);let k="";a.materials.forEach(C=>{var M;const P=((M=g.materials)==null?void 0:M[C.id])||0;k+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${P>=C.amount?"var(--green)":"var(--red)"};font-weight:bold">${P}/${C.amount}</span> ${c(C.id)}</span>`});const L=b.find(C=>C.id===a.target)||{};n+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${h}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${a.tier}</span>
                  <span>Tỉ lệ: <span style="color:${w>=80?"var(--green)":"var(--blue)"};font-weight:bold">${w}%</span></span>
                  <span>🔥 Phí: ${a.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${$}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${k}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${L.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${a.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),n+="</div></div>"}else n+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${r.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${r.map(a=>`<option value="${a.id}">${a.loc==="eq"?"🔸":"📦"} ${a.name||a.baseType} [${a.rarity||"?"}] ${(a.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(a=>{const h=Math.max(1,Math.round(a.cost*(1-p/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${a.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${a.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${a.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${a.id}" style="width:100%">
                💎 ${h} ${p>0?`<s style="opacity:0.4;font-size:10px">${a.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;i.innerHTML=n,i.querySelectorAll(".tab-btn").forEach(a=>{a.addEventListener("click",()=>{e._alchemyTab=a.dataset.tab,Q(i,t)})}),i.querySelectorAll(".accordion-header").forEach(a=>{a.addEventListener("click",()=>{const h=a.nextElementSibling;h.style.display==="none"?(h.style.display="block",a.querySelector(".text-dim:last-child").textContent="▲"):(h.style.display="none",a.querySelector(".text-dim:last-child").textContent="▼")})}),i.querySelectorAll(".btn-craft").forEach(a=>{a.addEventListener("click",async h=>{h.stopPropagation();const w=d.find($=>$.id===a.dataset.recipe);if(w&&g.gold<(w.cost||0))return l("Không đủ linh thạch!","error");try{const $=await N.craftItem(g.id,a.dataset.recipe);e.player=$.player,l($.message,$.success?"success":"error"),o()}catch($){l($.message,"error")}})}),i.querySelectorAll(".btn-currency").forEach(a=>{a.addEventListener("click",async()=>{const h=document.getElementById("selItem");if(!(h!=null&&h.value))return l("Chọn trang bị trước!","error");const w=a.dataset.cid;let $=-1;if(w==="thien_menh_phu"){const k=r.find(C=>C.id===h.value),L=(k==null?void 0:k.affixes)||[];if(L.length===0)return l("Item không có affix để khóa!","error");const S=prompt(`Chọn affix để khóa (0-${L.length-1}):
${L.map((C,P)=>`${P}: ${C.name||C.stat} +${C.value}`).join(`
`)}`);if(S===null)return;if($=parseInt(S),isNaN($)||$<0||$>=L.length)return l("Chỉ số không hợp lệ!","error")}a.disabled=!0,a.textContent="⏳...";try{const k=await N.applyCurrency(g.id,w,h.value,$);l(k.message,"success"),e.player=k.player,T(),Q(i,t)}catch(k){l(k.message,"error"),a.disabled=!1,a.textContent="💎 Dùng"}})}),(s=document.getElementById("selItem"))==null||s.addEventListener("change",()=>{const a=r.find(w=>w.id===document.getElementById("selItem").value),h=document.getElementById("itemPreview");a&&h&&(h.innerHTML=(a.affixes||[]).map(w=>`<span style="color:var(--blue)">• ${w.name||w.stat} +${w.value}</span>`).join(" | ")||"Không có affix")}),(m=document.getElementById("selItem"))==null||m.dispatchEvent(new Event("change"))}function kt(i,t){const{state:e,api:o,notify:l,renderGame:T}=t;e.player,i.innerHTML=`
    <div class="page-header">
      <h2>🏷️ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ nhiệm vụ từ các NPC</p>
    </div>
    <div id="questList" class="quest-container">
      <div class="loading-spinner">⏳ Đang tải...</div>
    </div>
  `,g();async function g(){try{const b=(await o.getQuests(e.playerId)).quests||[],y=document.getElementById("questList");if(!y)return;if(b.length===0){y.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}y.innerHTML=b.map(f=>{const x=f.questAmount>0?Math.min(100,f.progress/f.questAmount*100):0,p=f.progress>=f.questAmount,v=f.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${p?"quest-done":""}" data-quest-id="${f.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${f.npcIcon||"🧓"} ${f.npcName||"NPC"}</span>
              <span class="quest-type">${v} ${f.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${f.questName||f.quest_id}</div>
            <div class="quest-desc">${f.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${p?"hp":"energy"}" style="width:${x}%"></div>
              </div>
              <span class="quest-progress-text">${f.progress}/${f.questAmount}</span>
            </div>
            ${p?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${f.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),y.querySelectorAll(".quest-complete-btn").forEach(f=>{f.addEventListener("click",async()=>{const x=f.dataset.qid;f.disabled=!0,f.textContent="⏳...";try{const p=await o.completeQuest(e.playerId,x);e.player=p.player,l(p.message,"success"),p.skillGained&&l(`🎯 Lĩnh ngộ: ${p.skillGained}!`,"success"),T()}catch(p){l(p.message||"Lỗi trả quest","error"),f.disabled=!1,f.textContent="✅ Trả Nhiệm Vụ"}})})}catch(d){console.error("Error loading quests:",d);const b=document.getElementById("questList");b&&(b.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function wt(i,t){const{state:e,api:o,notify:l,renderGame:T}=t;if(e.player.role!=="admin"){i.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const g=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let d="monsters";i.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${g.map(n=>`
          <button class="admin-tab ${n.id===d?"active":""}" data-tab="${n.id}">${n.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",n=>{const s=n.target.closest(".admin-tab");s&&(d=s.dataset.tab,document.querySelectorAll(".admin-tab").forEach(m=>m.classList.remove("active")),s.classList.add("active"),b(d))}),b(d);async function b(n){const s=document.getElementById("adminContent");if(s){s.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const m=await o.request(`/admin/${n}?adminId=${e.playerId}`);y(n,m,s)}catch(m){s.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${m.message}</div></div>`}}}function y(n,s,m){n==="monsters"?f(s,m):n==="npcs"?x(s,m):n==="areas"?p(s,m):v(n,s,m)}function f(n,s){const m=n.monsters||[];s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${m.map(a=>{var h,w,$,k,L,S,C,P;return`
          <div class="admin-card" data-id="${a.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${a.name} ${a.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((w=(h=n.tierInfo)==null?void 0:h[a.tier])==null?void 0:w.color)||"#888"}">${((k=($=n.tierInfo)==null?void 0:$[a.tier])==null?void 0:k.name)||"T"+a.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((L=a.stats)==null?void 0:L.hp)||"?"}</div>
              <div>💪 ${((S=a.stats)==null?void 0:S.strength)||"?"}</div>
              <div>🏃 ${((C=a.stats)==null?void 0:C.speed)||"?"}</div>
              <div>🛡 ${((P=a.stats)==null?void 0:P.defense)||"?"}</div>
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
    `,c(s,n,"monsters","monsters")}function x(n,s){const m=n.npcs||[];s.innerHTML=`
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
    `,c(s,n,"npcs","npcs")}function p(n,s){const m=Object.keys(n);s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${m.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${m.map(a=>{const h=n[a];return`
            <div class="admin-card" data-id="${a}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${h.name||a}</span>
                <span class="badge" style="background:var(--orange)">⚡${h.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(h.events||[]).map(w=>`<span>${w.type}: ${w.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${a}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,s.querySelectorAll(".admin-edit-area").forEach(a=>{a.addEventListener("click",()=>{const h=a.dataset.id,w=n[h];u(h,w,`areas/${h}`)})})}function v(n,s,m){var w;const a=JSON.stringify(s,null,2),h=a.split(`
`).length;m.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${n} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(h+5,30)}">${r(a)}</textarea>
    `,(w=document.getElementById("btnSaveGeneric"))==null||w.addEventListener("click",async()=>{try{const $=document.getElementById("genericEditor").value,k=JSON.parse($);l("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch($){l("JSON không hợp lệ: "+$.message,"error")}})}function u(n,s,m,a){const h=JSON.stringify(s,null,2),w=document.createElement("div");w.className="admin-modal-overlay",w.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${n}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${r(h)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(w),w.querySelectorAll(".admin-modal-close").forEach($=>{$.addEventListener("click",()=>w.remove())}),w.addEventListener("click",$=>{$.target===w&&w.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const $=document.getElementById("modalEditor").value,k=JSON.parse($);await o.request(`/admin/${m}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:k})}),l("✅ Đã lưu!","success"),w.remove(),b(d)}catch($){l("Lỗi: "+$.message,"error")}})}function c(n,s,m,a){n.querySelectorAll(".admin-edit-btn").forEach(h=>{h.addEventListener("click",()=>{const w=h.dataset.id,k=(s[a]||[]).find(L=>L.id===w);k&&u(w,k,`${m}/${w}`)})})}function r(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function it(i,t){const{state:e,api:o,notify:l,renderGame:T,updateSidebar:g}=t,d=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const b=e._social;async function y(){try{const c=await o.getRelationships(d);b.relationships=c,b.loaded=!0,f()}catch(c){l(c.message||"Lỗi tải dữ liệu Giao Tế","error")}}function f(){const{friends:c,enemies:r,pendingSent:n,pendingReceived:s}=b.relationships,m=s.length;i.innerHTML=`
      <div class="page-header">
        <h2>🤝 Đạo Hữu</h2>
        <p class="page-sub">Kết bạn bè, đánh dấu kẻ thù, giao lưu giang hồ</p>
      </div>

      <!-- Search -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="socialSearch" placeholder="Tìm người chơi theo tên..." 
                 value="${b.searchQuery}" 
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSearch">🔍 Tìm</button>
        </div>
        ${b.searchResults.length>0?`
          <div style="margin-top:12px">
            ${b.searchResults.map(a=>`
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
        `:b.searchQuery?'<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>':""}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${b.tab==="friends"?"btn--blue":"btn--dark"}" data-tab="friends">
          🤝 Đạo Hữu (${c.length})
        </button>
        <button class="btn btn--sm ${b.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${r.length})
        </button>
        <button class="btn btn--sm ${b.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${m>0?`<span class="badge">${m}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${b.tab==="friends"?x(c):""}
        ${b.tab==="enemies"?p(r):""}
        ${b.tab==="pending"?v(s,n):""}
      </div>
    `,u()}function x(c){return c.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':c.map(r=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${r.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${r.level} · ${r.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${r.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${r.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function p(c){return c.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':c.map(r=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${r.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${r.level} · ${r.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${r.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${r.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function v(c,r){let n="";return c.length>0&&(n+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',n+=c.map(s=>`
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
      `).join("")),r.length>0&&(n+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',n+=r.map(s=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${s.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${s.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),c.length===0&&r.length===0&&(n='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),n}function u(){var c,r;(c=document.getElementById("btnSearch"))==null||c.addEventListener("click",async()=>{var s;const n=(s=document.getElementById("socialSearch"))==null?void 0:s.value.trim();if(!n||n.length<2)return l("Cần ít nhất 2 ký tự","error");b.searchQuery=n;try{const m=await o.searchPlayers(n);b.searchResults=m.players||[],f()}catch(m){l(m.message,"error")}}),(r=document.getElementById("socialSearch"))==null||r.addEventListener("keydown",n=>{var s;n.key==="Enter"&&((s=document.getElementById("btnSearch"))==null||s.click())}),document.querySelectorAll("[data-tab]").forEach(n=>{n.addEventListener("click",()=>{b.tab=n.dataset.tab,f()})}),document.querySelectorAll("[data-action]").forEach(n=>{n.addEventListener("click",async()=>{const s=n.dataset.action,m=n.dataset.target;n.disabled=!0;try{let a;switch(s){case"add-friend":a=await o.addFriend(d,m);break;case"accept-friend":a=await o.acceptFriend(d,m);break;case"reject-friend":a=await o.rejectFriend(d,m);break;case"remove-friend":a=await o.removeFriend(d,m);break;case"add-enemy":a=await o.addEnemy(d,m);break;case"remove-enemy":a=await o.removeEnemy(d,m);break}l(a.message||"Thành công!","success"),await y()}catch(a){l(a.message||"Lỗi!","error"),n.disabled=!1}})})}b.loaded?f():y()}function st(i,t){const{state:e,api:o,notify:l}=t,T=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const g=e._chat;async function d(){try{const[r,n]=await Promise.all([o.getGlobalChat(),o.getChatFriends(T)]);g.globalMessages=r.messages||[],g.friends=n.friends||[],g.globalMessages.length>0&&(g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id),g.loaded=!0,f(),b()}catch(r){l(r.message||"Lỗi tải chat","error")}}function b(){y(),g.pollTimer=setInterval(async()=>{try{if(g.tab==="global"){const r=await o.getGlobalChat(g.lastGlobalId);r.messages&&r.messages.length>0&&(g.globalMessages.push(...r.messages),g.globalMessages.length>100&&(g.globalMessages=g.globalMessages.slice(-100)),g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id,p(),v())}else if(g.tab==="private"&&g.selectedFriend){const r=await o.getPrivateChat(T,g.selectedFriend.id,g.lastPrivateId);r.messages&&r.messages.length>0&&(g.privateMessages.push(...r.messages),g.privateMessages.length>100&&(g.privateMessages=g.privateMessages.slice(-100)),g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id,p(),v())}}catch{}},5e3)}function y(){g.pollTimer&&(clearInterval(g.pollTimer),g.pollTimer=null)}function f(){const r=g.tab==="global"?g.globalMessages:g.privateMessages;i.innerHTML=`
      <div class="page-header">
        <h2>💬 Giang Hồ Truyền Âm</h2>
        <p class="page-sub">Giao lưu với các đạo hữu trong giang hồ</p>
      </div>

      <div class="chat-tabs" style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn btn--sm ${g.tab==="global"?"btn--blue":"btn--dark"}" data-chat-tab="global">🌍 Toàn Cầu</button>
        <button class="btn btn--sm ${g.tab==="private"?"btn--blue":"btn--dark"}" data-chat-tab="private">📨 Riêng</button>
        ${g.tab==="private"?`
          <select id="friendSelect" style="flex:1;padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
            <option value="">-- Chọn Đạo Hữu --</option>
            ${g.friends.map(n=>{var s;return`<option value="${n.id}" ${((s=g.selectedFriend)==null?void 0:s.id)===n.id?"selected":""}>${n.name} (Lv.${n.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${x(r)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${g.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,c(),v()}function x(r){return r.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':r.map(n=>{const s=n.sender_id===T,m=new Date(n.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${s?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${m}</span>
          <span style="font-weight:600;color:${s?"var(--blue)":"var(--gold)"}"> ${n.sender_name}</span>
          <span style="opacity:0.8">: ${u(n.message)}</span>
        </div>
      `}).join("")}function p(){const r=document.getElementById("chatMessages");if(!r)return;const n=g.tab==="global"?g.globalMessages:g.privateMessages;r.innerHTML=x(n)}function v(){const r=document.getElementById("chatMessages");r&&(r.scrollTop=r.scrollHeight)}function u(r){const n=document.createElement("div");return n.textContent=r,n.innerHTML}function c(){var n,s,m;document.querySelectorAll("[data-chat-tab]").forEach(a=>{a.addEventListener("click",()=>{g.tab=a.dataset.chatTab,g.tab==="global"&&(g.lastGlobalId=g.globalMessages.length>0?g.globalMessages[g.globalMessages.length-1].id:0),f(),b()})}),(n=document.getElementById("friendSelect"))==null||n.addEventListener("change",async a=>{const h=a.target.value;if(!h){g.selectedFriend=null,g.privateMessages=[],f();return}g.selectedFriend=g.friends.find(w=>w.id===h)||null,g.lastPrivateId=0;try{const w=await o.getPrivateChat(T,h);g.privateMessages=w.messages||[],g.privateMessages.length>0&&(g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id),p(),v()}catch(w){l(w.message,"error")}});const r=async()=>{var w,$;const a=document.getElementById("chatInput"),h=a==null?void 0:a.value.trim();if(h){if(g.tab==="private"&&!g.selectedFriend)return l("Chọn Đạo Hữu trước!","error");try{if(await o.sendChat(T,g.tab,g.tab==="private"?g.selectedFriend.id:null,h),a.value="",g.tab==="global"){const k=await o.getGlobalChat(g.lastGlobalId);((w=k.messages)==null?void 0:w.length)>0&&(g.globalMessages.push(...k.messages),g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id)}else{const k=await o.getPrivateChat(T,g.selectedFriend.id,g.lastPrivateId);(($=k.messages)==null?void 0:$.length)>0&&(g.privateMessages.push(...k.messages),g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id)}p(),v()}catch(k){l(k.message||"Lỗi gửi tin nhắn","error")}}};(s=document.getElementById("btnSend"))==null||s.addEventListener("click",r),(m=document.getElementById("chatInput"))==null||m.addEventListener("keydown",a=>{a.key==="Enter"&&r()})}t.renderGame,g.loaded?(f(),b()):d()}function Lt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const d=e._market;async function b(){try{const[r,n]=await Promise.all([o.getMarketListings(d.filter,d.sort),o.getMyListings(g)]);d.listings=r.listings||[],d.myListings=n.listings||[],d.loaded=!0,f()}catch(r){l(r.message||"Lỗi tải Giao Dịch Đài","error")}}async function y(){try{const[r,n]=await Promise.all([o.getMugTargets(g),o.getMugLog(g)]);d.mugTargets=r.targets||[],d.mugCooldown=r.mugCooldown||0,d.mugLog=n.logs||[],f()}catch(r){l(r.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function f(){const r=e.player;i.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${d.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${d.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${d.myListings.length}/10)</button>
        <button class="btn btn--sm ${d.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${d.showListForm?u(r):""}

      ${d.tab==="browse"?x():d.tab==="my"?p():v()}
    `,c()}function x(){let r=`
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
    `,n=d.listings;if(d.search.trim()){const s=d.search.toLowerCase().trim();n=n.filter(m=>{var a;return m.item_name.toLowerCase().includes(s)?!0:(a=m.item_data)!=null&&a.affixes?m.item_data.affixes.some(h=>(h.stat||"").toLowerCase().includes(s)||(h.type||"").toLowerCase().includes(s)):!1})}return n.length===0?r+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(r+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',r+=n.map(s=>{var $,k;const m=s.item_type==="item"?"⚔️":s.item_type==="material"?"🧱":"💊",a=(($=s.item_data)==null?void 0:$.rarity)||"",h=s.seller_id===g,w=(k=s.item_data)!=null&&k.affixes?s.item_data.affixes.map(L=>`${L.stat} ${L.type==="flat"?"+":""}${L.value}${L.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${m}
                <span style="color:var(--gold)">${s.item_name}</span>
                ${s.quantity>1?`<span style="opacity:0.5"> x${s.quantity}</span>`:""}
                ${a?`<span class="rarity-${a}" style="font-size:11px;margin-left:4px">[${a}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${s.seller_name}</span>
                ${w?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${w}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${s.price}${s.quantity>1?"/cái":""}</span>
              ${h?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${s.id}" data-qty="${s.quantity}" data-price="${s.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),r+="</div></div>"),r}function p(){if(d.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let r='<div class="panel"><div class="panel-body no-pad">';return r+=d.myListings.map(n=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${n.item_type==="item"?"⚔️":n.item_type==="material"?"🧱":"💊"} ${n.item_name} ${n.quantity>1?`<span style="opacity:0.5">x${n.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${n.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${n.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),r+="</div></div>",r}function v(){let r=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${d.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${d.mugCooldown}s</div>`:""}
    `;return d.mugTargets.length===0?r+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':r+=d.mugTargets.map(n=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${n.gender==="female"?"♀":"♂"} ${n.name}</div>
            <div class="item-meta">Lv.${n.level} · ${n.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${n.id}" ${d.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),r+="</div></div>",d.mugLog.length>0&&(r+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${d.mugLog.map(n=>{const s=n.attacker_id===g,m=n.outcome==="success"?"✅":"❌",a=n.outcome==="success"?"var(--green)":"var(--red)",h=s?n.outcome==="success"?`Cướp ${n.victim_name}: +${n.gold_stolen} 💎`:`Phục kích ${n.victim_name} thất bại!`:n.outcome==="success"?`Bị ${n.attacker_name} cướp: -${n.gold_stolen} 💎`:`${n.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${a}">${m} ${h} <span style="opacity:0.4;margin-left:auto">${new Date(n.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),r}function u(r){const n=Object.entries(r.materials||{}).map(([h,w])=>({id:h,qty:w,type:"material",name:h})),s=Object.entries(r.medicines||{}).map(([h,w])=>({id:h,qty:w,type:"medicine",name:h})),m=(r.inventory||[]).map(h=>({id:h.id,qty:1,type:"item",name:h.name||h.id})),a=[...n,...s,...m];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${a.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${a.map(h=>`<option value="${h.type}|${h.id}">${h.type==="item"?"⚔️":h.type==="material"?"🧱":"💊"} ${h.name} ${h.qty>1?`(có: ${h.qty})`:""}</option>`).join("")}
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
    `}function c(){var r,n,s,m;document.querySelectorAll("[data-mtab]").forEach(a=>{a.addEventListener("click",()=>{if(d.tab=a.dataset.mtab,d.tab==="mug"&&d.mugTargets.length===0){y();return}f()})}),(r=document.getElementById("btnShowList"))==null||r.addEventListener("click",()=>{d.showListForm=!d.showListForm,f()}),document.querySelectorAll("[data-filter]").forEach(a=>{a.addEventListener("click",async()=>{d.filter=a.dataset.filter,await b()})}),(n=document.getElementById("sortSelect"))==null||n.addEventListener("change",async a=>{d.sort=a.target.value,await b()}),(s=document.getElementById("searchInput"))==null||s.addEventListener("input",a=>{d.search=a.target.value,f();const h=document.getElementById("searchInput");h&&(h.focus(),h.setSelectionRange(d.search.length,d.search.length))}),(m=document.getElementById("btnConfirmList"))==null||m.addEventListener("click",async()=>{var L,S,C;const a=(L=document.getElementById("listItem"))==null?void 0:L.value;if(!a)return;const[h,w]=a.split("|"),$=parseInt((S=document.getElementById("listQty"))==null?void 0:S.value)||1,k=parseInt((C=document.getElementById("listPrice"))==null?void 0:C.value)||0;if(k<=0)return l("Giá phải lớn hơn 0!","error");try{const P=await o.listForSale(g,h,w,$,k);l(P.message,"success"),e.player=P.player,T(),d.showListForm=!1,await b()}catch(P){l(P.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(a=>{a.addEventListener("click",async()=>{const h=parseInt(a.dataset.buy),w=parseInt(a.dataset.qty),$=parseInt(a.dataset.price);let k=1;if(w>1){const L=prompt(`Mua bao nhiêu? (tối đa ${w}, giá ${$} 💎/cái)`,"1");if(!L)return;k=Math.min(parseInt(L)||1,w)}a.disabled=!0;try{const L=await o.buyFromMarket(g,h,k);l(L.message,"success"),e.player=L.player,T(),await b()}catch(L){l(L.message,"error"),a.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(a=>{a.addEventListener("click",async()=>{a.disabled=!0;try{const h=await o.cancelListing(g,parseInt(a.dataset.cancel));l(h.message,"success"),e.player=h.player,T(),await b()}catch(h){l(h.message,"error"),a.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(a=>{a.addEventListener("click",async()=>{const h=a.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){a.disabled=!0,a.textContent="⏳...";try{const w=await o.mugPlayer(g,h);l(w.message,w.success?"success":"error"),e.player=w.player,T(),await y()}catch(w){l(w.message,"error"),a.disabled=!1,a.textContent="💀 Phục Kích"}}})})}d.tab==="mug"?y():d.loaded?f():b()}function Ct(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;let d=!1,b=null;async function y(){try{b=await o.getRealmInfo(g),d=!0,f()}catch(v){l(v.message||"Lỗi tải Cảnh Giới","error")}}function f(){if(!b)return;const v=b.current,u=b.allRealms||[],c=e.player,r=c.xpToNext>0?Math.floor(c.xp/c.xpToNext*100):0;i.innerHTML=`
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
            <div style="opacity:0.5;font-size:13px">Tầng ${v.tier}/8 · ${v.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${c.level} — ${c.xp}/${c.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${r}%;background:${v.color}"></div></div>
        </div>

        ${v.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(v.bonuses).filter(([,n])=>n>0).map(([n,s])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${s} ${n}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${v.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${v.unlocks.map(n=>`<span style="font-size:12px;opacity:0.7">✅ ${n}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${v.canBreakthrough?x(v):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${u.map(n=>{const s=n.tier===v.tier,m=n.tier<v.tier,h=n.tier>v.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${s?`2px solid ${n.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${h};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${n.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${n.color}">${n.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${n.levelMin}+</span>
                ${n.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${n.failChance}% thất bại</span>`:""}
                ${m?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${s?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,p()}function x(v){const u=v.nextRealm;if(!u)return"";const c=u.cost?`💎 ${u.cost.gold} + 🔮 ${u.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${u.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${u.name} ${u.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${c}</div>
          ${u.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${u.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(u.bonuses).filter(([,r])=>r>0).map(([r,n])=>`+${n} ${r}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${u.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function p(){var v;(v=document.getElementById("btnBreakthrough"))==null||v.addEventListener("click",async()=>{const u=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){u.disabled=!0,u.textContent="⏳ Đang đột phá...";try{const c=await o.attemptBreakthrough(g);c.success?(l(c.message,"success"),e.player=c.player,T(),await y()):(l(c.message,"error"),c.player&&(e.player=c.player,T()),await y())}catch(c){l(c.message||"Lỗi đột phá","error"),u.disabled=!1,u.textContent="⚡ ĐỘT PHÁ"}}})}y()}function St(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t;Et(i,t)}async function Et(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t;i.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const d=(await o.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,T()),d.length===0){i.innerHTML=`
        <div class="page-header"><h1>📜 Sự Kiện</h1></div>
        <div class="panel">
          <div class="panel-body text-dim" style="text-align:center; padding: 40px;">
            Gió yên biển lặng. Chưa có sự kiện nào xảy ra với bạn.
          </div>
        </div>
      `;return}i.innerHTML=`
      <div class="page-header"><h1>📜 Sự Kiện Gần Đây</h1></div>
      <div class="panel">
        <div class="panel-body no-pad">
          <ul class="event-timeline" style="list-style:none; padding:16px; margin:0;">
            ${d.map(b=>{const y=new Date(b.created_at*1e3),f=y.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),x=y.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let p="📌";return p={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[b.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${f}</div>
                    <div>${x}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${p}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${b.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${b.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(g){i.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${g.message}</div></div>`}}function Pt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const d=e._tc;async function b(){try{d.data=await o.request(`/player/${g}/atlas-maps`),d.loaded=!0,y()}catch(c){l(c.message,"error")}}function y(){const c=d.data,r=(c==null?void 0:c.atlas)||{},n=(c==null?void 0:c.maps)||[],s=c==null?void 0:c.activeRun,m=(c==null?void 0:c.allMaps)||[];c!=null&&c.modifiers,i.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${r.completed||0}/${r.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${r.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${r.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${r.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${d.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${d.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${n.length})</button>
        ${s?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,i.querySelectorAll("[data-tab]").forEach(h=>{h.addEventListener("click",()=>{d.tab=h.dataset.tab,y()})});const a=document.getElementById("tcContent");a&&(s&&d.tab==="run"?v(a,s):d.tab==="inventory"?x(a,n):f(a,m,r))}function f(c,r,n){var m;const s=((m=d.data)==null?void 0:m.tiers)||[];c.innerHTML=s.map(a=>{const h=r.filter(w=>w.tier===a.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${a.tier} ${a.name} <span style="opacity:0.4;font-size:11px">(Realm ${a.requiredRealm}+, ${a.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${h.map(w=>{var L;const $=((L=n.progress)==null?void 0:L[w.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[w.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${$?700:400}">${w.name}</span>
                ${$?`<span style="color:var(--green);font-size:11px">✅ ×${$}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function x(c,r,n){if(r.length===0){c.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}c.innerHTML=r.map((s,m)=>{const a=s.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${u(s.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${s.mapName||s.mapId} <span style="color:${u(s.tier)};font-size:12px">T${s.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${a.length>0?a.map(h=>h.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${a.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${m}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${m}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),c.querySelectorAll(".btn-open-map").forEach(s=>{s.addEventListener("click",async()=>{try{const m=await o.request(`/player/${g}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(s.dataset.idx)})});l(m.message,"success"),e.player=m.player,T(),d.tab="run",await b()}catch(m){l(m.message,"error")}})}),c.querySelectorAll(".btn-add-mod").forEach(s=>{s.addEventListener("click",()=>p(parseInt(s.dataset.idx)))})}function p(c){var s;const r=((s=d.data)==null?void 0:s.modifiers)||[],n=document.createElement("div");n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",n.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${r.map(m=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${m.id}">
          <span style="flex:1"><strong>${m.name}</strong><br><span style="font-size:11px;opacity:0.6">${m.desc} · IIQ +${m.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,n.addEventListener("click",async m=>{const a=m.target.closest("[data-modid]");if(a)try{const h=await o.request(`/player/${g}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:c,modifierId:a.dataset.modid})});l(h.message,"success"),e.player=h.player,T(),n.remove(),await b()}catch(h){l(h.message,"error")}else m.target===n&&n.remove()}),document.body.appendChild(n)}function v(c,r){var m,a;const n=r.currentWave/r.totalWaves*100,s=r.modifiers||[];c.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${r.mapName} <span style="color:${u(r.tier)}">T${r.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${r.currentWave}/${r.totalWaves}
            ${s.length>0?" · "+s.map(h=>h.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${n}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${d.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(m=document.getElementById("btnTCFight"))==null||m.addEventListener("click",async()=>{d.fighting=!0,y();try{const h=await o.request(`/player/${g}/atlas-maps/fight`,{method:"POST"});e.player=h.player,T();const w=h.result!=="map_failed";l(h.message,w?"success":"error"),d.fighting=!1,(h.result==="map_complete"||h.result==="map_failed")&&(d.tab="atlas"),await b()}catch(h){l(h.message,"error"),d.fighting=!1,y()}}),(a=document.getElementById("btnTCQuit"))==null||a.addEventListener("click",async()=>{try{await o.request(`/player/${g}/atlas-maps/abandon`,{method:"POST"}),l("Đã rời Tiên Cảnh","info"),d.tab="atlas",await b()}catch(h){l(h.message,"error")}})}function u(c){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[c]||"#666"}d.loaded?y():b()}function Mt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;e._tw||(e._tw={data:null,loaded:!1,fighting:!1,tab:"tower"});const d=e._tw;async function b(){try{d.data=await o.request(`/player/${g}/tower`),d.loaded=!0,y()}catch(v){l(v.message,"error")}}function y(){var m,a;const v=d.data,u=v==null?void 0:v.run,c=(v==null?void 0:v.leaderboard)||[],r=(v==null?void 0:v.milestones)||{},n=v==null?void 0:v.nextMilestone;i.innerHTML=`
      <div class="page-header">
        <h2>🗼 Thiên Phần Tháp</h2>
        <p class="page-sub">Leo tháp vô hạn — mùa ${(v==null?void 0:v.season)||"?"} | Reset hàng tháng</p>
      </div>

      <!-- STATUS CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid #ff4500">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:48px">🗼</div>
          <div style="flex:1">
            ${u?`
              <div style="font-weight:800;font-size:22px">Tầng ${u.currentFloor}</div>
              <div style="font-size:12px;opacity:0.6">Kỷ lục: T.${u.highestFloor} · ${u.totalKills} kills · ${u.status==="dead"?"💀 Đã ngã":"🟢 Đang leo"}</div>
              ${n?`<div style="font-size:11px;margin-top:4px;color:var(--gold)">🎯 Mốc tiếp: T.${n.floor} → ${n.reward.title} (+${n.reward.gold}💎)</div>`:""}
            `:`
              <div style="font-weight:700;font-size:16px">Chưa vào tháp mùa này</div>
              <div style="font-size:12px;opacity:0.5">Bắt đầu leo để tranh hạng!</div>
            `}
          </div>
          <div>
            ${!u||u.status==="dead"?`<button class="btn btn--red btn--lg" id="btnEnter">${u?"🔄 Hồi Sinh":"⚡ Vào Tháp"}</button>`:`<button class="btn btn--red btn--lg" id="btnFight" ${d.fighting?"disabled":""}>⚔️ Chiến Đấu</button>`}
          </div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${d.tab==="tower"?"btn--blue":""} btn--sm" data-tab="tower">🗼 Tháp</button>
        <button class="btn ${d.tab==="leaderboard"?"btn--blue":""} btn--sm" data-tab="leaderboard">🏆 Bảng Xếp Hạng</button>
        <button class="btn ${d.tab==="milestones"?"btn--blue":""} btn--sm" data-tab="milestones">🎯 Mốc Thưởng</button>
      </div>

      <div id="twContent"></div>
      <div id="twResult" style="margin-top:12px"></div>
    `,i.querySelectorAll("[data-tab]").forEach(h=>h.addEventListener("click",()=>{d.tab=h.dataset.tab,y()})),(m=document.getElementById("btnEnter"))==null||m.addEventListener("click",async()=>{try{const h=await o.request(`/player/${g}/tower/climb`,{method:"POST"});l(h.message,"success"),await b()}catch(h){l(h.message,"error")}}),(a=document.getElementById("btnFight"))==null||a.addEventListener("click",async()=>{var h,w;d.fighting=!0,y();try{const $=await o.request(`/player/${g}/tower/fight`,{method:"POST"});e.player=$.player,T(),d.fighting=!1;const k=document.getElementById("twResult");if(k){const L=$.result!=="death";k.innerHTML=`
            <div class="panel" style="border-left:3px solid ${L?"var(--green)":"var(--red)"}">
              <div class="panel-body" style="padding:14px">
                <div style="font-weight:700;font-size:14px">${$.message}</div>
                ${(h=$.loot)!=null&&h.length?`<div style="font-size:12px;margin-top:6px;opacity:0.7">${$.loot.join(" · ")}</div>`:""}
                ${$.milestone?`<div style="margin-top:8px;padding:8px;background:rgba(255,215,0,0.15);border-radius:6px;font-weight:700;color:var(--gold)">🏆 ${$.milestone.title}!</div>`:""}
                ${((w=$.combatResults)==null?void 0:w.map(S=>`<details style="margin-top:6px"><summary style="cursor:pointer;font-size:11px">${S.monster} — ${S.result==="win"?"✅":"❌"}</summary><pre style="font-size:10px;max-height:150px;overflow:auto;opacity:0.6;margin-top:4px">${(S.log||[]).map(C=>`${C.turn||""}: ${C.text||JSON.stringify(C)}`).join(`
`)}</pre></details>`).join(""))||""}
              </div>
            </div>
          `}await b()}catch($){l($.message,"error"),d.fighting=!1,y()}});const s=document.getElementById("twContent");s&&(d.tab==="leaderboard"?x(s,c,v.playerRank):d.tab==="milestones"?p(s,r,(u==null?void 0:u.highestFloor)||0):f(s,u))}function f(v,u){var h;if(!u){v.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Vào tháp để bắt đầu leo!</div></div>';return}const c=u.currentFloor,r=[];c%10===0?r.push("👑 Boss"):c%15===0?r.push("💰 Bảo Tàng (2.5x loot)"):c%7===0?r.push("☠️ Bẫy Trận (-10% HP)"):c%13===0?r.push("💚 Linh Tuyền (+20% HP)"):c%11===0?r.push("⚡ Tinh Anh (+30% stats)"):c%9===0&&c>20&&r.push("☯ Ngũ Hành");const n=Math.min(1+Math.floor(c/20),3),s=10+Math.floor(c/10),m=((h=t.state.player)==null?void 0:h.currentStamina)??0,a=m>=s;v.innerHTML=`<div class="panel"><div class="panel-body" style="padding:14px">
      <div style="font-weight:700;font-size:15px">🗼 Tầng ${c}</div>
      <div style="font-size:12px;opacity:0.7;margin-top:6px">
        ${r.length?r.join(" · "):"⚔️ Thường"}
        · ${n} quái
        · Sức mạnh ×${Math.pow(1.08,c-1).toFixed(1)}
      </div>
      <div style="font-size:12px;margin-top:6px;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:4px;display:inline-block">
        ⚡ Thể lực: <strong style="color:${a?"var(--green)":"var(--red)"}">${s}</strong>
        <span style="opacity:0.5;margin-left:6px">(Hiện có: ${m})</span>
      </div>
    </div></div>`}function x(v,u,c){var r;v.innerHTML=`<div class="panel"><div class="panel-title">🏆 Mùa ${(r=d.data)==null?void 0:r.season}</div><div class="panel-body no-pad">
      ${u.length===0?'<div style="padding:20px;text-align:center;opacity:0.4">Chưa có ai leo tháp mùa này</div>':""}
      ${u.map(n=>{const s=n.rank<=3?["","🥇","🥈","🥉"][n.rank]:`#${n.rank}`,m=n.playerId===g;return`<div class="list-item" style="padding:8px 14px;${m?"background:rgba(255,215,0,0.1)":""}">
          <span style="width:40px;font-weight:700;font-size:14px">${s}</span>
          <span style="flex:1;font-weight:${m?800:400}">${n.name}</span>
          <span style="font-size:12px;opacity:0.7">T.${n.floor} · ${n.kills} kills</span>
        </div>`}).join("")}
    </div></div>
    ${c>0?`<div style="text-align:center;margin-top:8px;font-size:12px;opacity:0.6">Hạng của bạn: #${c}</div>`:""}`}function p(v,u,c){v.innerHTML=`<div class="panel"><div class="panel-title">🎯 Mốc Thưởng</div><div class="panel-body no-pad">
      ${Object.entries(u).map(([r,n])=>{const s=c>=parseInt(r);return`<div class="list-item" style="padding:10px 14px;${s?"opacity:0.5":""}">
          <span style="font-size:18px">${s?"✅":"🔒"}</span>
          <span style="flex:1;font-weight:600">Tầng ${r}</span>
          <span style="font-size:12px">${n.title} · +${n.gold}💎</span>
        </div>`}).join("")}
    </div></div>`}d.loaded?y():b()}function It(i,t){const{state:e,api:o,notify:l,updateSidebar:T,renderGame:g}=t,d=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const b=e._housing;async function y(){try{const u=await o.getHousing(d);b.data=u,b.loaded=!0,f()}catch(u){l(u.message||"Lỗi tải Động Phủ","error")}}function f(){const u=b.data;i.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${u.owned?p(u):x(u)}
    `,v()}function x(u){const c=u.tiers[1];return`
      <div class="panel">
        <div class="panel-title">🏗️ Mua Động Phủ</div>
        <div class="panel-body" style="text-align:center;padding:24px">
          <div style="font-size:40px;margin-bottom:12px">🏠</div>
          <div style="font-weight:600;margin-bottom:6px">${c.name}</div>
          <div style="font-size:12px;opacity:0.6;margin-bottom:12px">${c.description}</div>
          <div style="margin-bottom:12px">
            <span style="color:var(--green)">❤️ +${c.hpRegen} HP/phút</span> ·
            <span style="color:var(--blue)">🌿 ${c.gardenSlots} ô vườn</span>
          </div>
          <button class="btn btn--gold btn--lg" id="btnBuyHouse">💎 ${c.cost} Linh thạch — Mua</button>
        </div>
      </div>
    `}function p(u){const c=u.gardenSlots||[],r=u.gardenHerbs||{};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏠</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${u.tierInfo.name} <span style="opacity:0.4">(T${u.tier})</span></div>
            <div style="font-size:12px;opacity:0.6">${u.tierInfo.description}</div>
            <div style="font-size:12px;margin-top:4px">
              <span style="color:var(--green)">❤️ +${u.tierInfo.hpRegen} HP/phút</span> ·
              <span style="color:var(--blue)">🌿 ${u.maxSlots} ô vườn</span>
            </div>
          </div>
          ${u.nextTier?`
            <button class="btn btn--gold btn--sm" id="btnUpgrade" title="Nâng lên ${u.nextTier.name}">
              ⬆ ${u.nextTier.cost} 💎
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
          <div style="display:grid;grid-template-columns:repeat(${Math.min(u.maxSlots,5)},1fr);gap:8px">
            ${Array.from({length:u.maxSlots},(n,s)=>{const m=c[s]||{},a=!!m.herb,h=m.ready,w=m.remaining||0,$=Math.ceil(w/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${h?"var(--green)":a?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${a?`
                    <div style="font-size:20px">${h?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${m.herbName||m.herb}</div>
                    <div style="font-size:10px;color:${h?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${h?"✅ Sẵn sàng!":"⏳ "+$+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${s}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(r).map(([k,L])=>`<option value="${k}">${L.name}</option>`).join("")}
                    </select>
                  `}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>

      ${u.formations?`
      <div class="panel" style="margin-top:10px">
        <div class="panel-title flex justify-between">
          <span>🔮 Trận Pháp</span>
          ${u.dailyCost>0?`
            <span style="font-size:11px">
              Hao phí: <strong style="color:var(--orange)">${u.dailyCost} 💎/ngày</strong>
              ${u.maintenanceDue?'<button class="btn btn--sm btn--orange" id="btnMaintenance">💰 Nộp phí</button>':'<span style="color:var(--green);margin-left:6px">✅ Đã nộp</span>'}
            </span>
          `:""}
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
            ${Object.entries(u.formations).map(([n,s])=>{const m=s.currentLevel>=s.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${s.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${s.icon}</span>
                      <strong style="margin-left:4px">${s.name}</strong>
                      ${s.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${s.currentLevel}</span>`:""}
                    </div>
                    ${s.canBuild?m?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${n}">
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
    `}function v(){var u,c,r,n;(u=document.getElementById("btnBuyHouse"))==null||u.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const s=await o.buyHousing(d);l(s.message,"success"),e.player=s.player,T(),await y()}catch(s){l(s.message,"error")}}),(c=document.getElementById("btnUpgrade"))==null||c.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const s=await o.buyHousing(d);l(s.message,"success"),e.player=s.player,T(),await y()}catch(s){l(s.message,"error")}}),document.querySelectorAll(".plant-select").forEach(s=>{s.addEventListener("change",async m=>{const a=m.target.value;if(!a)return;const h=parseInt(s.dataset.slot);try{const w=await o.plantHerb(d,a,h);l(w.message,"success"),await y()}catch(w){l(w.message,"error")}})}),(r=document.getElementById("btnHarvest"))==null||r.addEventListener("click",async()=>{try{const s=await o.harvestGarden(d);l(s.message,"success"),e.player=s.player,T(),await y()}catch(s){l(s.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(s=>{s.addEventListener("click",async()=>{const m=s.dataset.fid;s.disabled=!0,s.textContent="⏳...";try{const a=await o.upgradeFormation(d,m);l(a.message,"success"),e.player=a.player,T(),await y()}catch(a){l(a.message,"error"),s.disabled=!1,s.textContent="⬆ Nâng"}})}),(n=document.getElementById("btnMaintenance"))==null||n.addEventListener("click",async()=>{try{const s=await o.payMaintenance(d);l(s.message,"success"),e.player=s.player,T(),await y()}catch(s){l(s.message,"error")}})}b.loaded?f():y()}function Ht(i,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function o(){i.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","skills","explore","tower","dungeon","housing","talent","alchemy","crime","market","tips"].map(T=>`
          <button class="btn btn--sm ${e._wikiTab===T?"btn--gold":"btn--dark"}" data-tab="${T}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",skills:"⚡ Kỹ Năng",explore:"🗺️ Khám Phá",tower:"🗼 Thiên Phần Tháp",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",crime:"🔪 Phạm Tội",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[T]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${l(e._wikiTab)}
        </div>
      </div>
    `,i.querySelectorAll("[data-tab]").forEach(T=>{T.addEventListener("click",()=>{e._wikiTab=T.dataset.tab,o()})})}function l(T){return{lore:`
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
        <h3 style="color:var(--gold);margin-bottom:12px">🌟 Hệ Thống Cảnh Giới</h3>
        <p>Cảnh giới quyết định sức mạnh tổng thể. Đột phá yêu cầu đủ level + cống vật + chiến thắng thử thách.</p>

        <table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:12px">
          <tr style="background:rgba(255,255,255,0.05)">
            <th style="padding:6px;text-align:left">Cảnh Giới</th><th>Level</th><th>Bonus</th><th>Ghi chú</th>
          </tr>
          <tr><td style="padding:6px">🟤 Luyện Khí</td><td>1-10</td><td>—</td><td>Khởi đầu</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">⚪ Trúc Cơ</td><td>11-25</td><td>+10% stats</td><td>Mở Khám Phá</td></tr>
          <tr><td style="padding:6px">🟡 Kim Đan</td><td>26-50</td><td>+25% stats</td><td>⚡ Độ Kiếp #1</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">🔵 Nguyên Anh</td><td>51-80</td><td>+50% stats</td><td>Mở Bí Cảnh cao cấp</td></tr>
          <tr><td style="padding:6px">🟣 Hóa Thần</td><td>81-120</td><td>+80% stats</td><td>⚡ Độ Kiếp #2</td></tr>
          <tr style="background:rgba(255,255,255,0.02)"><td style="padding:6px">🔴 Luyện Hư</td><td>121-170</td><td>+120% stats</td><td>Mở Thiên Cung</td></tr>
          <tr><td style="padding:6px">🌟 Đại Thừa</td><td>171+</td><td>+170% stats</td><td>⚡ Độ Kiếp #3</td></tr>
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
      `,crime:`
        <h3 style="color:var(--gold);margin-bottom:12px">🔪 Hệ Thống Phạm Tội & Cướp</h3>
        <p>Tiêu Nerve để phạm tội kiếm tiền/vật phẩm. Rủi ro bị bắt → ngồi tù.</p>

        <h4 style="color:var(--blue)">🏴‍☠️ Cướp (Mugging)</h4>
        <p>Tấn công người chơi khác để cướp Linh thạch. Thắng = lấy 5-15% gold của đối phương. Thua = vào bệnh viện.</p>
        <ul style="margin:8px 0">
          <li>Cooldown: 5 phút giữa mỗi lần cướp</li>
          <li>Không thể cướp khi đang tịnh dưỡng hoặc ngồi tù</li>
          <li>Nhân vật mới (< Lv5) được bảo vệ</li>
        </ul>
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
          <li>Làm Crime → rủi ro cao nhưng lợi nhuận tốt</li>
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
      `}[T]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}o()}function qt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const d=e._npcShop;let b=parseInt(localStorage.getItem("npcShopIdx")||"0");async function y(){try{i.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const p=await o.getShops(g);d.shops=p.shops||[],d.tax=p.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},d.loaded=!0,b>=d.shops.length&&(b=0),f()}catch(p){l(p.message||"Lỗi tải shop","error")}}function f(){var n;if(d.shops.length===0){i.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const p=d.shops[b]||d.shops[0],v=d.shops.map((s,m)=>`
      <button class="skill-tab ${m===b?"active":""}" data-shop-idx="${m}">
        ${s.icon||"🧓"} ${s.name}
      </button>
    `).join(""),u={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},c={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},r=(p.items||[]).map(s=>{var $,k;const m=u[s.rarity||"common"]||"#888",a=c[s.rarity||"common"]||"Phàm",h=(s.remainingStock??1)<=0,w=((($=e.player)==null?void 0:$.gold)??0)>=(s.currentPrice||0);return`
        <div class="shop-item-card ${h?"out-of-stock":""}" style="border-left:3px solid ${m}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${m}">${s.name}</div>
              <div class="shop-item-rarity" style="color:${m}">${a} · Tầng ${s.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${h?"var(--red)":"var(--green)"}">
                ${h?"❌ Hết hàng":`📦 ${s.remainingStock}/${s.dailyStock}`}
              </span>
            </div>
          </div>
          ${s.description?`<div class="shop-item-desc">${s.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${w?"":"too-expensive"}">
              💎 ${((k=s.currentPrice)==null?void 0:k.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${p.id}" data-item="${s.id}" 
                value="1" min="1" max="${s.remainingStock||1}" 
                ${h?"disabled":""}>
              <button class="btn btn--sm ${h?"":w?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${p.id}" data-item="${s.id}"
                ${h||!w?"disabled":""}>
                ${h?"❌":w?"🛒 Mua":"💸 Thiếu"}
              </button>
            </div>
          </div>
        </div>
      `}).join("");i.innerHTML=`
      <div class="page-header">
        <h1>🧓 Thương Nhân</h1>
        <div class="text-dim text-sm">Mỗi thương nhân có hàng giới hạn mỗi ngày. Mua sắm thông minh!</div>
      </div>

      <div class="shop-info-bar">
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${d.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(((n=e.player)==null?void 0:n.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${p.area||"Không rõ"}</div>
      </div>

      ${d.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${v}</div>`:""}

      <div class="shop-items-grid">
        ${r||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,x()}function x(){i.querySelectorAll(".skill-tab[data-shop-idx]").forEach(p=>{p.addEventListener("click",()=>{b=parseInt(p.dataset.shopIdx),localStorage.setItem("npcShopIdx",b),f()})}),i.querySelectorAll(".btn-buy").forEach(p=>{p.addEventListener("click",async()=>{const v=p.dataset.shop,u=p.dataset.item,c=i.querySelector(`.buy-qty[data-shop="${v}"][data-item="${u}"]`),r=parseInt((c==null?void 0:c.value)||1);p.disabled=!0,p.textContent="⏳...";try{const n=await o.buyFromShop(g,v,u,r);l(n.message,"success"),e.player=n.player,T(),await y()}catch(n){l(n.message,"error"),p.disabled=!1,p.textContent="🛒 Mua"}})})}d.loaded?f():y()}function Nt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const d=e._guild;async function b(){try{d.data=await o.getMyGuild(g),d.loaded=!0,f()}catch(u){l(u.message||"Lỗi","error")}}async function y(){try{const u=await o.listGuilds();d.allGuilds=u.guilds||[],f()}catch(u){l(u.message,"error")}}function f(){const u=d.data;i.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${u!=null&&u.inGuild?p(u):x(u)}
    `,v()}function x(u){return`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🏗️ Lập Tông Môn Mới</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:grid;gap:8px;max-width:360px">
            <input type="text" id="guildName" placeholder="Tên Tông Môn (2-30 ký tự)" class="input" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <input type="text" id="guildTag" placeholder="Tag (2-5 ký tự, VD: TMQ)" class="input" maxlength="5" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <textarea id="guildDesc" placeholder="Mô tả..." rows="2" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;resize:none"></textarea>
            <button class="btn btn--gold" id="btnCreate">🏯 Lập Tông Môn (${(u==null?void 0:u.createCost)||1e4} 💎)</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>📋 Danh Sách Tông Môn</span>
          <button class="btn btn--sm btn--dark" id="btnLoadGuilds">🔄 Tải</button>
        </div>
        <div class="panel-body no-pad" id="guildList">
          ${d.allGuilds?d.allGuilds.map(c=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
              <div style="flex:1">
                <div style="font-weight:600">[${c.tag}] ${c.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${c.level} · ${c.member_count}/${c.max_members} · Quỹ: ${c.treasury} 💎 · Chưởng Môn: ${c.leader_name}</div>
              </div>
              <button class="btn btn--sm btn--green btn-join" data-gid="${c.id}" ${c.member_count>=c.max_members?"disabled":""}>
                ${c.member_count>=c.max_members?"Đầy":"Gia nhập"}
              </button>
            </div>
          `).join(""):'<div style="padding:20px;text-align:center;opacity:0.3">Nhấn "Tải" để xem danh sách</div>'}
        </div>
      </div>
    `}function p(u){var s;const c=u.guild,r=u.members||[],n=u.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${c.tag}] ${c.name} <span style="opacity:0.3">Lv${c.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((s=c.levelInfo)==null?void 0:s.name)||""} · ${c.memberCount}/${c.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${c.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${c.dailyUpkeep}/ngày</span>
              ${c.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(c.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(c.buffs).map(([m,a])=>`${m} +${a}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${u.myRole==="leader"&&c.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${c.nextLevel.name}">⬆ ${c.nextLevel.upgradeCost} 💎</button>`:""}
            ${u.myRole==="leader"&&c.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            Bạn đã đóng: ${u.myContributed} 💎 · Vai trò: ${u.myRole==="leader"?"👑 Chưởng Môn":u.myRole==="elder"?"⭐ Trưởng Lão":"🙋 Đệ Tử"}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">📜 Nhật Ký</div>
          <div class="panel-body" style="max-height:160px;overflow-y:auto;padding:8px 12px">
            ${n.slice(0,10).map(m=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(m.created_at).toLocaleString("vi")}</span>
                ${m.detail||m.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${r.length}/${c.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${r.map(m=>`
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

      ${u.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function v(){var u,c,r,n,s,m;(u=document.getElementById("btnCreate"))==null||u.addEventListener("click",async()=>{var $,k,L,S,C,P;const a=(k=($=document.getElementById("guildName"))==null?void 0:$.value)==null?void 0:k.trim(),h=(S=(L=document.getElementById("guildTag"))==null?void 0:L.value)==null?void 0:S.trim(),w=(P=(C=document.getElementById("guildDesc"))==null?void 0:C.value)==null?void 0:P.trim();if(!a||!h)return l("Nhập tên và tag!","error");try{const M=await o.createGuild(g,a,h,w);l(M.message,"success"),e.player=M.player,T(),d.loaded=!1,await b()}catch(M){l(M.message,"error")}}),(c=document.getElementById("btnLoadGuilds"))==null||c.addEventListener("click",y),document.querySelectorAll(".btn-join").forEach(a=>{a.addEventListener("click",async()=>{try{const h=await o.joinGuild(g,parseInt(a.dataset.gid));l(h.message,"success"),d.loaded=!1,await b()}catch(h){l(h.message,"error")}})}),(r=document.getElementById("btnContribute"))==null||r.addEventListener("click",async()=>{var h;const a=parseInt(((h=document.getElementById("contributeAmt"))==null?void 0:h.value)||0);if(!(a<=0))try{const w=await o.contributeGuild(g,a);l(w.message,"success"),e.player=w.player,T(),await b()}catch(w){l(w.message,"error")}}),(n=document.getElementById("btnUpgradeGuild"))==null||n.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const a=await o.upgradeGuild(g);l(a.message,"success"),await b()}catch(a){l(a.message,"error")}}),(s=document.getElementById("btnPayUpkeep"))==null||s.addEventListener("click",async()=>{try{const a=await o.payGuildUpkeep(d.data.guild.id);l(a.message,"success"),await b()}catch(a){l(a.message,"error")}}),(m=document.getElementById("btnLeave"))==null||m.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const a=await o.leaveGuild(g);l(a.message,"success"),d.loaded=!1,await b()}catch(a){l(a.message,"error")}})}d.loaded?f():b()}function Bt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const d=e._profile;function b(){i.innerHTML=`
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

      ${d.viewing?y(d.viewing):""}

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
    `,f()}function y(p){var r,n,s;const v=p.id===g,u=p.maxHp>0?Math.round(p.currentHp/p.maxHp*100):100,c={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((r=p.name[0])==null?void 0:r.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${p.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${p.level} · ${((n=p.realmInfo)==null?void 0:n.fullName)||"Phàm Nhân"}
                ${p.guild?` · <span style="color:var(--blue)">[${p.guild.tag}] ${p.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${c[p.currentArea]||p.currentArea}
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
              <div style="height:100%;width:${u}%;background:${u>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(s=p.gold)==null?void 0:s.toLocaleString()} 💎</strong></div>

          ${v?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${p.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${p.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function f(){var p,v,u,c,r;(p=document.getElementById("btnSearch"))==null||p.addEventListener("click",x),(v=document.getElementById("searchInput"))==null||v.addEventListener("keydown",n=>{n.key==="Enter"&&x()}),document.querySelectorAll(".btn-view, [data-view]").forEach(n=>{n.addEventListener("click",async()=>{const s=n.dataset.vid||n.dataset.view;try{const m=await o.getPlayerProfile(s);d.viewing=m.profile,b()}catch(m){l(m.message,"error")}})}),(u=document.getElementById("btnAttack"))==null||u.addEventListener("click",async()=>{const n=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${d.viewing.name}?`))try{const s=await o.mugPlayer(g,n);l(s.message,s.won?"success":"error"),s.player&&(e.player=s.player,T())}catch(s){l(s.message,"error")}}),(c=document.getElementById("btnAddFriend"))==null||c.addEventListener("click",async()=>{const n=document.getElementById("btnAddFriend").dataset.tid;try{const s=await o.addFriend(g,n);l(s.message||"Đã gửi lời mời!","success")}catch(s){l(s.message,"error")}}),(r=document.getElementById("btnBackSearch"))==null||r.addEventListener("click",()=>{d.viewing=null,b()})}async function x(){var u;const p=document.getElementById("searchInput"),v=(u=p==null?void 0:p.value)==null?void 0:u.trim();if(!v||v.length<2)return l("Nhập ít nhất 2 ký tự!","error");d.searchQuery=v,d.viewing=null;try{const c=await o.searchPlayers(v);d.results=c.players||[],b()}catch(c){l(c.message,"error")}}b()}function zt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const d=e._arena;async function b(){try{d.data=await o.getArena(g),d.loaded=!0,y()}catch(x){l(x.message,"error")}}function y(){var n,s,m,a,h,w,$,k;const x=d.data,p=(x==null?void 0:x.arena)||{},v=p.rank||{},u=parseInt(p.streak)||0,c=u>=5?`🔥x${u}`:u>=3?`⚡x${u}`:u>0?`${u}W`:u<0?`${Math.abs(u)}L`:"",r=u>=5?"var(--gold)":u>=3?"var(--orange)":u>0?"var(--green)":u<0?"var(--red)":"var(--text-dim)";i.innerHTML=`
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
              ELO: <strong>${p.rating||1e3}</strong> · ${p.wins||0}W/${p.losses||0}L
              ${c?` · <span style="color:${r};font-weight:700">${c}</span>`:""}
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
      ${(n=d.lastResult)!=null&&n.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(s=d.lastResult.newRank)==null?void 0:s.icon}</div>
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
            ${(h=d.lastResult.opponent)!=null&&h.rank?d.lastResult.opponent.rank.icon:""} 
            (ELO ${(w=d.lastResult.opponent)==null?void 0:w.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${d.lastResult.ratingChange>0?"+":""}${d.lastResult.ratingChange}
            ${d.lastResult.goldEarned>0?` · +${d.lastResult.goldEarned} 💎`:""}
          </div>
          ${($=d.lastResult.combatLog)!=null&&$.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${d.lastResult.combatLog.map(L=>`<div>${L}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(x.opponents||[]).length>0?(x.opponents||[]).map(L=>{var S,C,P;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((S=L.rank)==null?void 0:S.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${L.name} <span style="opacity:0.4;font-size:11px">Lv.${L.level}</span></div>
                <div style="font-size:11px;color:${((C=L.rank)==null?void 0:C.color)||"#888"}">${((P=L.rank)==null?void 0:P.name)||"Đồng"} · ELO ${L.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${L.player_id}" ${d.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${d.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${x.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(x.top10||[]).map((L,S)=>{var C,P;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${S<3?"var(--gold)":"var(--text-dim)"}">#${S+1}</span>
                <span>${((C=L.rank)==null?void 0:C.icon)||""}</span>
                <span style="flex:1">${L.name}</span>
                <span style="color:${((P=L.rank)==null?void 0:P.color)||"var(--blue)"}; font-weight:600">${L.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(x.history||[]).map(L=>{const S=L.winner_id===g;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${S?"var(--green)":"var(--red)"}">
                  ${S?"✅":"❌"} vs ${L.attacker_id===g?L.defender_name:L.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${L.rating_change>0?"+":""}${L.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,i.querySelectorAll(".btn-fight-opp").forEach(L=>{L.addEventListener("click",S=>f(S.target.dataset.oid))}),(k=document.getElementById("btnRandomFight"))==null||k.addEventListener("click",()=>f(null))}async function f(x){d.fighting=!0,y();try{const p=await o.request(`/player/${g}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:x})});d.lastResult=p,e.player=p.player,T(),l(p.message,p.won?"success":"error"),d.fighting=!1,await b()}catch(p){l(p.message,"error"),d.fighting=!1,y()}}d.loaded?y():b()}function _t(i,t){const{state:e,api:o,notify:l,updateSidebar:T,renderGame:g}=t,d=e.playerId,b=e._auctionTab||"browse";async function y(){try{const[p,v]=await Promise.all([o.getAuctions(),o.getMyAuctions(d)]);e._auctionListings=p.listings||[],e._auctionMine=v.listings||[],f()}catch(p){l(p.message,"error")}}function f(){const p=e._auctionListings||[],v=e._auctionMine||[],u=(e.player.inventory||[]).filter(c=>c.slot&&c.slot!=="consumable");i.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${b==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${b==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${b==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${v.length})</button>
      </div>

      ${b==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':p.map(c=>{const r=JSON.parse(c.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${r.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${r.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${c.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${c.id}">💎 ${c.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:b==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${u.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${u.map(c=>`<option value="${c.id}">${c.name} [${c.rarity}]</option>`).join("")}
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
          ${v.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':v.map(c=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(c.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${c.status==="active"?"var(--green)":c.status==="sold"?"var(--gold)":"var(--red)"}">${c.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${c.buyout_price}</div>
                </div>
                ${c.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${c.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,x()}function x(){var p;i.querySelectorAll(".tab-btn").forEach(v=>v.addEventListener("click",()=>{e._auctionTab=v.dataset.tab,y()})),i.querySelectorAll(".btn-buy").forEach(v=>v.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const u=await o.buyAuction(d,parseInt(v.dataset.lid));l(u.message,"success"),e.player=u.player,T(),await y()}catch(u){l(u.message,"error")}})),i.querySelectorAll(".btn-cancel").forEach(v=>v.addEventListener("click",async()=>{try{const u=await o.cancelAuction(d,parseInt(v.dataset.lid));l(u.message,"success"),e.player=u.player,T(),await y()}catch(u){l(u.message,"error")}})),(p=document.getElementById("btnListItem"))==null||p.addEventListener("click",async()=>{var r,n,s;const v=(r=document.getElementById("selSellItem"))==null?void 0:r.value,u=parseInt(((n=document.getElementById("inpPrice"))==null?void 0:n.value)||"500"),c=parseInt(((s=document.getElementById("selDuration"))==null?void 0:s.value)||"24");try{const m=await o.listAuction(d,v,u,c);l(m.message,"success"),e.player=m.player,T(),e._auctionTab="mine",await y()}catch(m){l(m.message,"error")}})}y()}function Ot(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;async function d(){try{const y=await o.getDailyQuests(g);e._dailyQuests=y,b()}catch(y){l(y.message,"error")}}function b(){const y=e._dailyQuests||{},f=y.quests||[];y.allCompleted;const x=y.bonusReward;i.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${f.map(p=>{const v=p.quest_info||{},u=p.target>0?Math.min(100,Math.round(p.progress/p.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${p.claimed?"var(--text-dim)":p.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${v.name||p.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${v.difficulty==="Khó"?"var(--red)":v.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${v.difficulty||"?"}</span>
              </div>
              ${p.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':p.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${p.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${p.progress}/${p.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${v.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${u}%;background:${p.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${v.goldReward||0} · ✨ ${v.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${x?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${x.gold} 💎, +${x.xp} EXP</div>
      </div>
      `:""}
    `,i.querySelectorAll(".btn-claim").forEach(p=>p.addEventListener("click",async()=>{try{const v=await o.claimDailyQuest(g,parseInt(p.dataset.qid));l(v.message,"success"),e.player=v.player,T(),await d()}catch(v){l(v.message,"error")}}))}d()}function jt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.playerId;async function d(){try{e._worldBoss=await o.getWorldBoss(),b()}catch(y){l(y.message,"error")}}function b(){var c;const y=e._worldBoss||{},f=y.boss||{},x=y.hpPercent||0,p=y.topContributors||[],v=y.rewards||{},u=f.status==="active"&&f.current_hp>0;i.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${u?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${f.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${f.level||"?"} · ${u?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(f.current_hp||0).toLocaleString()} / ${(f.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${x}%;background:${x>50?"var(--red)":x>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${u?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${v.gold||0} · ✨ ${v.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':p.map((r,n)=>{var s;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${n<3?"var(--gold)":"var(--text-dim)"}">#${n+1}</span>
                <span style="flex:1">${r.name}</span>
                <span style="color:var(--red)">${(s=r.total_damage)==null?void 0:s.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${r.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(c=document.getElementById("btnAttackBoss"))==null||c.addEventListener("click",async()=>{const r=document.getElementById("btnAttackBoss");r.disabled=!0,r.textContent="⏳ Đang giao chiến...";const n=document.getElementById("bossCombatResult");try{const s=await o.attackWorldBoss(g);if(e.player=s.player,T(),s.log&&s.log.length>0){const m=s.log.map($=>$.startsWith("---")?`<div class="turn">${$}</div>`:$.includes("hụt")?`<div class="miss">${$}</div>`:$.includes("né được")?`<div class="dodge">${$}</div>`:$.includes("CHÍNH MẠNG")||$.includes("💥")?`<div class="crit">${$}</div>`:$.includes("🔥")?`<div class="heavy text-orange">${$}</div>`:$.includes("chặn hoàn toàn")||$.includes("🛡")?`<div class="dodge">${$}</div>`:$.includes("ngã xuống")||$.includes("💀")?`<div class="death">${$}</div>`:$.includes("Chiến thắng")||$.includes("🏆")?`<div class="victory">${$}</div>`:$.includes("bỏ chạy")||$.includes("🏃")?`<div class="flee">${$}</div>`:$.includes("Bất phân")||$.includes("🤝")?`<div class="stalemate">${$}</div>`:$.includes("🧪")?`<div class="status-effect text-purple">${$}</div>`:$.includes("💔")?`<div class="dot-damage text-purple bold">${$}</div>`:$.includes("✨")?`<div class="regen text-green">${$}</div>`:`<div class="hit">${$}</div>`).join(""),a={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},h=a[s.outcome]||a.loss,w=Math.max(0,e.player.currentHp/e.player.maxHp*100);n.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${h.icon} ${h.text}
                <span class="subtitle">${s.turns}/${s.maxTurns||25} lượt · ⚔️ ${s.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${h.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${w}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${f.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(s.bossHp/s.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${s.bossHp.toLocaleString()}/${s.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${m}</div>
            </div>`}s.defeated?l(s.message,"success"):l(`⚔️ ${s.damage} dmg!`,"info"),await d()}catch(s){l(s.message,"error"),r.disabled=!1,r.textContent="⚔️ Tấn Công"}})}d()}function At(i,t){const{state:e,api:o,notify:l,updateSidebar:T,renderGame:g}=t,d=e.playerId,b={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function y(){var x;try{const[p,v]=await Promise.all([o.getGachaPools(),o.getGachaPity(d)]);e._gacha={pools:p.pools||{},pity:v.pity||{},results:((x=e._gacha)==null?void 0:x.results)||[]},f()}catch(p){l(p.message,"error")}}function f(){const x=e._gacha||{},p=x.pools||{},v=x.pity||{},u=x.results||[];i.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(p).map(([c,r])=>{var s,m,a;const n=v[c]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${c==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${r.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${b.legendary}">★ ${(s=r.rates)==null?void 0:s.legendary}%</span> ·
                <span style="color:${b.rare}">◆ ${(m=r.rates)==null?void 0:m.rare}%</span> ·
                <span style="color:${b.uncommon}">● ${(a=r.rates)==null?void 0:a.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${n.pulls_since_rare||0}/${r.pityRare} · Legend: ${n.pulls_since_legendary||0}/${r.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${c}" data-pulls="1">💎 ${r.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${c}" data-pulls="10">💎 ${r.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${u.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${u.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${u.map(c=>{var r,n,s,m;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${b[c.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((r=c.item)==null?void 0:r.slot)==="weapon"?"⚔️":((n=c.item)==null?void 0:n.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${b[c.rarity]}">${((s=c.item)==null?void 0:s.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${c.rarity}] ${(((m=c.item)==null?void 0:m.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,i.querySelectorAll(".btn-pull").forEach(c=>c.addEventListener("click",async()=>{const r=c.dataset.pool,n=parseInt(c.dataset.pulls);c.disabled=!0,c.textContent="⏳...";try{const s=await o.gachaPull(e.playerId,r,n);l(s.message,"success"),e.player=s.player,T(),e._gacha.results=s.results||[],e._gacha.pity[r]=s.pity,f()}catch(s){l(s.message,"error"),c.disabled=!1}}))}y()}function Rt(i,t){const{state:e,api:o,notify:l}=t;e._lbTab||(e._lbTab="level");async function T(){const d=e._lbTab||"level";i.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const b=await o.getLeaderboard(d);e._lbData=b,g()}catch(b){i.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${b.message}
      </div></div>`}}function g(){const d=e._lbTab||"level",y=(e._lbData||{}).rankings||[],x=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(v=>`
      <button class="skill-tab ${d===v.id?"active":""}" data-tab="${v.id}">
        ${v.icon} ${v.name}
      </button>
    `).join("");let p="";y.length===0?p='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':d==="guild"?p=y.map((v,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${v.tag}] ${v.name}</div>
            <div class="lb-sub">👤 ${v.members}/${v.max_members} · Leader: ${v.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(v.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${v.level}</div>
          </div>
        </div>
      `).join(""):d==="pvp"?p=y.map((v,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${v.name}</div>
            <div class="lb-sub">Lv.${v.level} · ${v.wins||0}W/${v.losses||0}L${v.streak>0?` · 🔥${v.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${v.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):p=y.map((v,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
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
      `).join(""),i.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${x}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${p}
        </div>
      </div>
    `,i.querySelectorAll(".skill-tab[data-tab]").forEach(v=>{v.addEventListener("click",()=>{e._lbTab=v.dataset.tab,T()})})}T()}async function rt(i,t){const{state:e,api:o,notify:l,updateSidebar:T}=t,g=e.player;if(!g)return;i.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-panel, #333); padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <h2 style="margin: 0; color: #c084fc; display: flex; align-items: center; gap: 8px;">
            <span>🌌</span> Thiên Đạo Dị Biến
          </h2>
          <div style="font-size: 0.85rem; color: #9ca3af; margin-top: 4px;">
            Khai thác lỗ hổng quy luật của thế giới. Hành động lặp lại tích lũy thành Dấu Ấn & Nội Tại Nghịch Thiên.
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.75rem; color: #aaa; text-transform: uppercase;">Điểm Thấu Triệt</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.4);" id="glitchInsightVal">
            ${g.glitchInsight||0}
          </div>
        </div>
      </div>

      <!-- Action Card: Glitch Override -->
      <div style="background: rgba(192, 132, 252, 0.08); border: 1px solid rgba(192, 132, 252, 0.25); border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="font-weight: bold; color: #e9d5ff; font-size: 0.95rem;">⚡ Lách Luật Thiên Đạo (Glitch Override)</div>
          <div style="font-size: 0.8rem; color: #d8b4fe;">
            ${g.hospitalUntil>Math.floor(Date.now()/1e3)?"Xóa bỏ ghi chép tử thương, xuất viện ngay lập tức và hồi 50% HP.":"Đảo chiều quy luật, nạp đầy 100% Linh Lực tức thì."}
          </div>
        </div>
        <button id="btnOverrideTribulation" class="btn btn--gold" style="white-space: nowrap; font-size: 0.85rem; padding: 6px 14px;">
          🔮 Thi Triển (-50 Thấu Triệt)
        </button>
      </div>

      <!-- Stance Selector -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; font-size: 1rem; color: #e5e7eb;">⚔️ Thế Chiến Đấu Cổ Điển (Combat Stance)</h3>
        <div id="stanceContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
          <div style="color: #888; font-size: 0.85rem;">Đang tải thế chiến đấu...</div>
        </div>
      </div>

      <!-- Glitch Imprints Grid -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 1rem; color: #e5e7eb;">📜 Dấu Ấn Hành Vi Đã Phát Hiện</h3>
          <span style="font-size: 0.85rem; color: #a855f7;" id="imprintCountLabel">Đang tải...</span>
        </div>
        <div id="imprintsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px;">
          <div style="color: #888; font-size: 0.85rem;">Đang kiểm tra sổ sinh tử Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const x=(await o.getGlitches(g.id)).status;b(x.stances,x.activeStance),y(x.imprints,x.unlockedCount,x.totalCount)}catch(f){l(f.message||"Không thể tải dữ liệu Thiên Đạo.","error")}const d=i.querySelector("#btnOverrideTribulation");d&&(d.onclick=async()=>{d.disabled=!0,d.textContent="Đang lách luật...";try{const f=await o.overrideTribulation(g.id);l(f.message,"success"),e.player=f.player,T(),rt(i,t)}catch(f){l(f.message||"Thao tác lách luật thất bại!","error"),d.disabled=!1,d.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}});function b(f,x){const p=i.querySelector("#stanceContainer");p&&(p.innerHTML="",Object.values(f).forEach(v=>{const u=v.id===x,c=document.createElement("div");c.style.cssText=`
        background: ${u?"rgba(168, 85, 247, 0.15)":"var(--bg-main, #1a1e28)"};
        border: 1px solid ${u?"#c084fc":"var(--border-panel, #333)"};
        border-radius: 8px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      `,c.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${v.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${v.icon}</span> ${v.name}
          </div>
          ${u?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        </div>
        <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">${v.description}</div>
      `,c.onclick=async()=>{if(!u)try{const r=await o.setStance(g.id,v.id);l(r.message,"success"),e.player=r.player,b(f,v.id),T()}catch(r){l(r.message||"Chuyển thế thất bại","error")}},p.appendChild(c)}))}function y(f,x,p){const v=i.querySelector("#imprintCountLabel");v&&(v.textContent=`${x}/${p} Dấu Ấn Mở Khóa`);const u=i.querySelector("#imprintsContainer");u&&(u.innerHTML="",f.forEach(c=>{const r=document.createElement("div"),n=c.isUnlocked;r.style.cssText=`
        background: ${n?"rgba(30, 41, 59, 0.7)":"rgba(15, 23, 42, 0.5)"};
        border: 1px solid ${n?c.color:"rgba(255,255,255,0.1)"};
        border-radius: 8px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: ${n?`0 0 12px ${c.color}33`:"none"};
        opacity: ${n?"1":"0.85"};
      `,r.innerHTML=`
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <div style="font-weight: bold; color: ${n?c.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
              <span>${c.icon}</span> ${c.name}
            </div>
            <span style="font-size: 0.7rem; color: ${n?"#fbbf24":"#6b7280"}; border: 1px solid ${n?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.1)"}; padding: 1px 6px; border-radius: 4px;">
              ${c.title}
            </span>
          </div>

          <div style="font-size: 0.78rem; color: #a1a1aa; font-style: italic; margin-bottom: 8px; line-height: 1.35;">
            "${c.lore}"
          </div>

          <div style="font-size: 0.82rem; color: ${n?"#e4e4e7":"#9ca3af"}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
            <strong style="color: ${n?"#67e8f9":"#888"};">Hiệu ứng:</strong> ${c.description}
          </div>
        </div>

        <div>
          ${n?`
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
              <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐÃ KHAI THÁC</span>
              <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${c.title}">
                ${g.activeTitle===c.title?"Đang Đeo":"Đeo Danh Hiệu"}
              </button>
            </div>
          `:`
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #71717a; margin-bottom: 4px;">
                <span>Tiến độ hành vi:</span>
                <span>${c.progress.current} / ${c.progress.threshold}</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                <div style="width: ${c.progress.percent}%; height: 100%; background: ${c.color}; transition: width 0.3s;"></div>
              </div>
            </div>
          `}
        </div>
      `;const s=r.querySelector(".btnSetTitle");s&&(s.onclick=()=>{g.activeTitle=c.title,l(`Đã kích hoạt danh hiệu: [${c.title}]!`,"success"),T(),y(f,x,p)}),u.appendChild(r)}))}}const E={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},dt=document.getElementById("app"),U={get state(){return E},api:N,notify:j,renderGame:B,updateSidebar:Jt};async function Gt(){const i=localStorage.getItem("playerId");if(i&&!E.playerId)try{const t=await N.getPlayer(i);E.playerId=i,E.player=t.player,await D(),B();return}catch{localStorage.removeItem("playerId")}if(!E.playerId)try{const t=await N.login("admin","admin");E.playerId=t.id,E.player=t.player,localStorage.setItem("playerId",t.id),await D(),B();return}catch(t){console.warn("Dev auto-login failed. Fallback to intro UI.",t)}E.playerId?B():lt()}function lt(){var t,e;const i=E.authTab||"login";dt.innerHTML=`
    <div class="intro-page">
      <div class="intro-box">
        <div class="title">NGHỊCH THIÊN KÝ</div>
        <div class="intro-text">Thế giới này vận hành theo quy luật tuyệt đối.
Không ai có thể vượt qua.

...Cho đến khi hệ thống xuất hiện lỗi.</div>

        <div class="auth-tabs">
          <button class="btn btn--sm ${i==="login"?"btn--blue":"btn--dark"}" data-auth="login">Đăng nhập</button>
          <button class="btn btn--sm ${i==="register"?"btn--blue":"btn--dark"}" data-auth="register">Đăng ký</button>
        </div>

        ${i==="login"?`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(o=>{o.addEventListener("click",()=>{E.authTab=o.dataset.auth,lt()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const o=document.getElementById("inpUsername").value.trim(),l=document.getElementById("inpPassword").value;if(!o||!l)return j("Vui lòng nhập đầy đủ","error");try{const T=await N.login(o,l);E.playerId=T.id,E.player=T.player,localStorage.setItem("playerId",T.id),j(T.message,"success"),await D(),B()}catch(T){j(T.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var d,b;const o=document.getElementById("inpUsername").value.trim(),l=document.getElementById("inpPassword").value,T=((d=document.getElementById("inpName"))==null?void 0:d.value.trim())||"Vô Danh",g=((b=document.querySelector('input[name="gender"]:checked'))==null?void 0:b.value)||"male";if(!o||!l)return j("Vui lòng nhập đầy đủ","error");try{const y=await N.register(o,l,T,g);E.playerId=y.id,E.player=y.player,localStorage.setItem("playerId",y.id),j(y.message,"success"),await D(),B()}catch(y){j(y.message||"Đăng ký thất bại!","error")}})}function ot(i){const t=Math.floor(Date.now()/1e3),e=[];return i.hospitalUntil&&i.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:i.hospitalUntil,color:"var(--red)"}),i.medCooldownUntil&&i.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:i.medCooldownUntil,color:"var(--orange)"}),i.jailUntil&&i.jailUntil>t&&e.push({icon:"⛓️",label:"Ngục tù",endTime:i.jailUntil,color:"var(--purple)"}),i.travelArrivesAt&&i.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:i.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(o=>{const l=Math.max(0,o.endTime-t),T=Math.floor(l/60),g=l%60,d=T>0?`${T}p${String(g).padStart(2,"0")}s`:`${g}s`;return`<span class="status-icon" data-end="${o.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${o.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${o.color};white-space:nowrap;
      " title="${o.label}">${o.icon} <span class="cd-time">${d}</span></span>`}).join("")}
  </div>`}let F=null;function Dt(){F&&clearInterval(F),F=setInterval(()=>{const i=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),o=Math.max(0,e-i);if(o<=0){t.remove();return}const l=Math.floor(o/60),T=o%60,g=t.querySelector(".cd-time");g&&(g.textContent=l>0?`${l}p${String(T).padStart(2,"0")}s`:`${T}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function ct(i){let t="";const o={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[i.currentArea];return o&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${o.tooltip}">${o.icon} Cảnh Vực</span>`),i.combatBuffs&&i.combatBuffs.length>0&&i.combatBuffs.forEach(l=>{let T="💊",g="Buff";l.type==="status"&&l.stat==="poison"?(T="☠️",g="Trúng Độc"):l.type==="status"&&l.stat==="confuse"?(T="👹",g="Ma Hóa"):l.stat==="allStats"||l.stat==="hp"||l.stat==="damage"?(T="🔥",g="Cuồng Nộ"):l.stat==="defense"||l.stat==="resist"?(T="🛡️",g="Kiên Cố"):l.stat==="speed"||l.stat==="dexterity"?(T="💨",g="Thân Pháp"):(T="✨",g="Cường Hóa");let d=l.duration?` (-${l.duration} Trận)`:"",b=`Hiệu ứng: ${l.stat} (${l.type} ${l.value})${l.duration?` - Còn lại: ${l.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${b}">${T} ${g}${d}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function B(){var x,p,v,u,c,r,n,s,m;const i=E.player;if(!i)return;const t=Math.max(0,i.currentHp/i.maxHp*100),e=i.maxStamina>0?Math.max(0,i.currentStamina/i.maxStamina*100):0,o=i.maxEnergy>0?Math.max(0,i.currentEnergy/i.maxEnergy*100):0,l=(i.maxNerve??15)>0?Math.max(0,(i.nerve??0)/(i.maxNerve??15)*100):0,T=E.exploration?E.exploration[i.currentArea||"thanh_lam_tran"]:null,g=T?T.name:"Khám Phá";dt.innerHTML=`
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
          <div class="player-name">${i.name}</div>
          ${i.activeTitle?`<div style="font-size:10px;color:var(--gold);font-weight:600;letter-spacing:0.5px;margin-top:1px">『${i.activeTitle}』</div>`:""}
          <div class="player-meta">Lv.${i.level} · ${((x=i.realmInfo)==null?void 0:x.fullName)||"?"}</div>
          ${ot(i)}
          ${ct(i)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${i.currentHp}/${i.maxHp}
                ${i.currentHp<i.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(p=i.skills)!=null&&p.some(a=>a.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${i.currentStamina??100}/${i.maxStamina??100}
                ${(i.currentStamina??100)<(i.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((v=i.stats)==null?void 0:v.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${e}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${i.currentEnergy}/${i.maxEnergy}
                ${i.currentEnergy<i.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((u=i.stats)==null?void 0:u.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${o}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${i.nerve??0}/${i.maxNerve??15}${(i.nerve??0)<(i.maxNerve??15)?'<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+1/5min</span>':""}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${l}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${i.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${E.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(i.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
            </button>
            <button class="btn btn--dark nav-item ${E.currentPage==="wiki"?"active":""}" data-page="wiki" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Bách Khoa">
              📖
            </button>
            <button class="btn btn--dark nav-item ${E.currentPage==="leaderboard"?"active":""}" data-page="leaderboard" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Xếp Hạng">
              🏆
            </button>
            <button class="btn btn--dark nav-item ${E.currentPage==="social"?"active":""}" data-page="social" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Xã Hội">
              💬
            </button>
          </div>
          <div style="font-size:10px;color:var(--text-dim);text-align:center;padding-bottom:6px;border-bottom:1px solid var(--border)">
            📍 ${g} ${i.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':i.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(i.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <li class="nav-section">TỰ THÂN</li>
          <li class="nav-item ${E.currentPage==="stats"?"active":""}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${(r=(c=E.player)==null?void 0:c.realmInfo)!=null&&r.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="inventory"?"active":""}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(i.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)">⏳</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="skills"||E.currentPage==="education"?"active":""}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>
          <li class="nav-item ${E.currentPage==="glitch"?"active":""}" data-page="glitch" style="background: rgba(192, 132, 252, 0.08); border-left: 2px solid #c084fc;">
            <span class="icon">🌌</span> Dị Biến Thiên Đạo
            <span class="badge" style="background: #a855f7;">${i.glitchInsight||0}</span>
          </li>


          <li class="nav-item ${["travel","dungeon","tiencanh"].includes(E.currentPage)?"active":""}" data-page="travel">
            <span class="icon">🚶</span> Ngao Du
            ${(i.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="quests"||E.currentPage==="dailyquest"?"active":""}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(i.activeQuests||[]).filter(a=>a.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(i.activeQuests||[]).filter(a=>a.status==="active").length}</span>`:""}
          </li>
          <li class="nav-item ${E.currentPage==="crimes"?"active":""}" data-page="crimes">
            <span class="icon">💀</span> Ác Nghiệp
          </li>

          <li class="nav-section">NGAO DU</li>
          <li class="nav-item ${E.currentPage==="combat"?"active":""}" data-page="combat">
            <span class="icon">🔍</span> Khám Phá (${g})
          </li>

          <li class="nav-section">CHIẾN ĐẤU</li>
          <li class="nav-item ${E.currentPage==="arena"?"active":""}" data-page="arena">
            <span class="icon">⚔️</span> Đấu Trường
          </li>
          <li class="nav-item ${E.currentPage==="tower"?"active":""}" data-page="tower">
            <span class="icon">🗼</span> Thiên Phần Tháp
          </li>

          <li class="nav-section">THẾ GIỚI</li>
          <li class="nav-item ${E.currentPage==="housing"?"active":""}" data-page="housing">
            <span class="icon">🏠</span> Động Phủ
          </li>
          <li class="nav-item ${E.currentPage==="guild"?"active":""}" data-page="guild">
            <span class="icon">🏯</span> Tông Môn
          </li>
          <li class="nav-item ${E.currentPage==="alchemy"?"active":""}" data-page="alchemy">
            <span class="icon">⚒️</span> Chế Tác
          </li>
          <li class="nav-item ${E.currentPage==="wiki"?"active":""}" data-page="wiki">
            <span class="icon">📚</span> Tri Thức
          </li>
          <li class="nav-item ${E.currentPage==="leaderboard"?"active":""}" data-page="leaderboard">
            <span class="icon">🏆</span> Xếp Hạng
          </li>

          <li class="nav-section">KINH TẾ</li>
          <li class="nav-item ${E.currentPage==="market"||E.currentPage==="auction"?"active":""}" data-page="market">
            <span class="icon">🏪</span> Giao Dịch & Đấu Giá
          </li>
          <li class="nav-item ${E.currentPage==="npcshop"?"active":""}" data-page="npcshop">
            <span class="icon">🧓</span> Thương Nhân
          </li>

          ${i.role==="admin"?`
          <li class="nav-section">VÔ THƯỢNG</li>
          <li class="nav-item ${E.currentPage==="admin"?"active":""}" data-page="admin">
            <span class="icon">⚙️</span> Admin
          </li>`:""}
        </ul>
      </aside>

      <!-- CONTENT -->
      <main class="main-content">
        <div id="pageContent"></div>
      </main>
      
      <!-- POPUP WIDGET (Chat / Social) -->
      <div class="floating-popup-container" id="popupContainer" style="${E.popupOpen?"display:flex;":"display:none;"}">
        <div class="popup-header">
          <div class="popup-tabs">
            <button class="popup-tab ${E.popupPage==="chat"?"active":""}" data-popup="chat">💬 Truyền Âm</button>
            <button class="popup-tab ${E.popupPage==="social"?"active":""}" data-popup="social">🤝 Đạo Hữu</button>
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(a=>{a.addEventListener("click",()=>{E.currentPage=a.dataset.page,B()})}),(n=document.getElementById("btnFabChat"))==null||n.addEventListener("click",()=>V("chat")),(s=document.getElementById("btnFabSocial"))==null||s.addEventListener("click",()=>V("social"));const d=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');d&&d.addEventListener("click",a=>{a.stopPropagation(),E.currentPage="events",E.popupOpen=!1,B()}),(m=document.getElementById("btnPopupClose"))==null||m.addEventListener("click",()=>{E.popupOpen=!1,B()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(a=>{a.addEventListener("click",()=>V(a.dataset.popup))}),Vt(),E.popupOpen&&Kt();const b=document.getElementById("searchPlayerInput"),y=document.getElementById("searchResults");let f=null;b&&y&&(b.addEventListener("input",()=>{clearTimeout(f);const a=b.value.trim();if(a.length<2){y.style.display="none";return}f=setTimeout(async()=>{try{const h=await N.searchPlayers(a),w=h.players||h.results||[];w.length===0?y.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':y.innerHTML=w.map($=>{var k;return`
              <div class="search-result" data-pid="${$.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${$.name} <span style="opacity:0.4">Lv.${$.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((k=$.realmInfo)==null?void 0:k.name)||""}</span>
              </div>
            `}).join(""),y.style.display="block",y.querySelectorAll(".search-result").forEach($=>{$.addEventListener("click",()=>{E.currentPage="profile",E._viewProfileId=$.dataset.pid,y.style.display="none",b.value="",B()}),$.addEventListener("mouseenter",()=>$.style.background="rgba(255,255,255,0.08)"),$.addEventListener("mouseleave",()=>$.style.background="transparent")})}catch{y.style.display="none"}},300)}),b.addEventListener("blur",()=>{setTimeout(()=>{y.style.display="none"},200)}),b.addEventListener("keydown",a=>{a.key==="Escape"&&(y.style.display="none",b.blur())})),Dt()}function V(i){E.popupOpen=!0,E.popupPage=i,B()}function Kt(){const i=document.getElementById("popupContent");i&&(E.popupPage==="chat"?st(i,U):E.popupPage==="social"&&it(i,U))}const Ft={combat:ht,crimes:Tt,education:et,stats:bt,skills:xt,inventory:J,travel:at,alchemy:Q,quests:kt,admin:wt,social:it,chat:st,market:Lt,realm:Ct,events:St,dungeon:nt,housing:It,wiki:Ht,npcshop:qt,guild:Nt,library:tt,profile:Bt,arena:zt,auction:_t,dailyquest:Ot,worldboss:jt,gacha:At,leaderboard:Rt,tiencanh:Pt,tower:Mt,glitch:rt};function Vt(){const i=document.getElementById("pageContent");if(!i)return;const t=Ft[E.currentPage];t&&t(i,U)}function Jt(){var T,g,d,b,y;const i=E.player;if(!i)return;const t=Math.max(0,i.currentHp/i.maxHp*100),e=i.maxEnergy>0?Math.max(0,i.currentEnergy/i.maxEnergy*100):0,o=document.querySelector(".sidebar-player");if(o){const f=i.maxStamina>0?Math.max(0,i.currentStamina/i.maxStamina*100):0,x=(i.maxNerve??15)>0?Math.max(0,(i.nerve??0)/(i.maxNerve??15)*100):0;o.innerHTML=`
      <div class="player-name">${i.name}</div>
      <div class="player-meta">Lv.${i.level} · ${((T=i.realmInfo)==null?void 0:T.fullName)||"?"}</div>
      ${ot(i)}
      ${ct(i)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${i.currentHp}/${i.maxHp}
            ${i.currentHp<i.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(g=i.skills)!=null&&g.some(p=>p.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${i.currentStamina??100}/${i.maxStamina??100}
            ${(i.currentStamina??100)<(i.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((d=i.stats)==null?void 0:d.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${f}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${i.currentEnergy}/${i.maxEnergy}
            ${i.currentEnergy<i.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((b=i.stats)==null?void 0:b.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${e}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label"><span>💀 Nghịch Khí</span><span>${i.nerve??0}/${i.maxNerve??15}</span></div>
        <div class="bar-track"><div class="bar-fill nerve" style="width:${x}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${i.gold??0} Linh Thạch</div>`}const l=document.querySelector('.nav-item[data-page="stats"]');if(l){let f="";i.statPoints>0&&(f+=`<span class="badge">${i.statPoints}</span>`),(y=i.realmInfo)!=null&&y.canBreakthrough&&(f+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),l.querySelectorAll(".badge").forEach(x=>x.remove()),l.insertAdjacentHTML("beforeend",f)}}async function D(){try{const[i,t,e,o,l,T]=await Promise.all([N.getMonsters(),N.getSkills(),N.getItems(),N.getMedicines(),N.getCrimes(),N.getEducation()]);E.monsters=i.monsters||[],E.skills=t.skills||[],E.items=e.items||[],E.medicines=o.medicines||[],E.crimes=l.crimes||[],E.educationTrees=T.trees||[],E.exploration=await N.getExploration(),E.recipes=(await N.getRecipes()).recipes,E.npcs=(await N.getNpcs()).npcs||[]}catch(i){console.error("Lỗi tải dữ liệu:",i)}}function j(i,t="info"){var o;(o=document.querySelector(".notification"))==null||o.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=i,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}Gt();
//# sourceMappingURL=index-BPJPCJxE.js.map
