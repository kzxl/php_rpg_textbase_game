(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const $ of d)if($.type==="childList")for(const p of $.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function e(d){const $={};return d.integrity&&($.integrity=d.integrity),d.referrerPolicy&&($.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?$.credentials="include":d.crossOrigin==="anonymous"?$.credentials="omit":$.credentials="same-origin",$}function l(d){if(d.ep)return;d.ep=!0;const $=e(d);fetch(d.href,$)}})();const ft="/api";class $t{async request(t,e={}){try{const l=await fetch(`${ft}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),d=await l.json();if(!l.ok)throw new Error(d.error||`HTTP ${l.status}`);return d}catch(l){throw console.error(`API Error [${t}]:`,l),l}}register(t,e,l,d){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:l,gender:d})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,l=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:l})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,l=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:l})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,l=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:l})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,l,d=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:l,lockAffixIndex:d})})}commitCrime(t,e){return this.request(`/player/${t}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:e})})}escapeJail(t){return this.request(`/player/${t}/escape-jail`,{method:"POST"})}bail(t){return this.request(`/player/${t}/bail`,{method:"POST"})}enrollNode(t,e,l){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:l})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,l){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:l})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,l,d){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:l,amount:d})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,l=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${l}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,l,d){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:l,message:d})})}getMarketListings(t="",e="newest"){const l=new URLSearchParams;return t&&l.set("type",t),e&&l.set("sort",e),this.request(`/market?${l.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,l,d,$){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:l,quantity:d,price:$})})}buyFromMarket(t,e,l=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:l})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,l){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:l})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,l,d){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:l,description:d})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,l,d=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:l,lockAffixIndex:d})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,l,d=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:l,quantity:d})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,l,d=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:l,durationHours:d})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,l=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:l})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const q=new $t;function Tt(n,t){var m,w;const{state:e,api:l,notify:d,renderGame:$,updateSidebar:p}=t,s=e.player,h=e.exploration?e.exploration[s.currentArea||"thanh_lam_tran"]:null,y=h?h.name:"Vùng Đất Vô Danh",T=h?h.staminaCost:10;n.innerHTML=`
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
    </div>`;const b=((m=s.insightLevels)==null?void 0:m.monster)??0,o=async()=>{try{const f=await l.getAreaMonsters(s.id);if(f.monsters){e.player.trackedMonsters=f.monsters;const k=document.getElementById("trackedMonstersList");if(!k)return;if(f.monsters.length===0){k.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}k.innerHTML=f.monsters.map(L=>{const S=L.currentHp/L.stats.hp*100,C=S>60?"var(--green)":S>30?"var(--orange)":"var(--red)";let H='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';b>=1&&(H=`<div class="item-desc text-sm text-dim mb-sm">${L.description||"Yêu thú vùng này."}</div>`);let P="";b>=1&&(P=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${S}%; background: ${C}; height: 100%;"></div>
            </div>`);let I=b>=2?`❤ ${L.currentHp}/${L.stats.hp}`:b>=1?"❤ ???":"";return`
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
                ${P}
                ${H}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${L.instance_id}" data-monster-id="${L.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),k.querySelectorAll(".btnTrackedCombat").forEach(L=>{L.addEventListener("click",S=>{const C=S.currentTarget.dataset.monsterId,H=S.currentTarget.dataset.instanceId;tt(t,C,H)})})}}catch(f){console.error(f)}},x=async()=>{try{const f=await l.getAreaMonsterTemplates(s.currentArea||"thanh_lam_tran");if(f.monsters){const k=document.getElementById("areaMonstersList");if(!k)return;if(f.monsters.length===0){k.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}k.innerHTML=f.monsters.map(L=>`
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
          `).join("")}}catch(f){console.error(f)}};o(),x(),(w=document.getElementById("btnExplore"))==null||w.addEventListener("click",()=>kt(t));let u=!1;const g=document.getElementById("btnAutoBattle"),r=document.getElementById("btnStopAuto"),c=document.getElementById("panelKhamPha"),a=document.querySelector(".toggle-auto-combat"),v=document.getElementById("autoCombatStatus");g&&g.addEventListener("click",()=>{u=!0,c.style.display="none",a.style.display="block",i()}),r&&r.addEventListener("click",()=>{u=!1,c.style.display="block",a.style.display="none"});async function i(){var S,C,H,P,I,_,D,O,z,A;let f=0,k=0,L=0;for(;u;){v.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${f} trận | +${k} XP | +${L} Linh Thạch</div>
        `;const j=e.player;if((j.currentStamina||0)<T){v.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",u=!1;break}if(j.currentHp/j.maxHp<.2){v.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",u=!1;break}try{const M=await l.explore(e.playerId);if(e.player=M.player,p(),M.event&&(M.event.type==="monster"||M.event.type==="worldBoss")){if(v.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${M.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(xt=>setTimeout(xt,600)),!u)break;const N=await l.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:M.event.monsterId})});if(e.player=N.player,p(),N.outcome==="win")f++,k+=((S=N.rewards)==null?void 0:S.xp)||0,L+=((C=N.rewards)==null?void 0:C.gold)||0,v.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(H=N.monster)==null?void 0:H.name}! (+${((P=N.rewards)==null?void 0:P.xp)||0} XP, +${((I=N.rewards)==null?void 0:I.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${f} | Tiếp tục sau 1s...</div>
                   `;else{v.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${N.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,u=!1;break}}else if(M.event&&M.event.type==="monster_ambush"&&M.event.combatResult){const N=M.event.combatResult;if(N.outcome==="win")f++,k+=((_=N.rewards)==null?void 0:_.xp)||0,L+=((D=N.rewards)==null?void 0:D.gold)||0,v.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(O=N.monster)==null?void 0:O.name}! (+${((z=N.rewards)==null?void 0:z.xp)||0} XP)</div>`;else{v.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",u=!1;break}}else v.innerHTML=`<div class='text-blue'>${((A=M.event)==null?void 0:A.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(M){v.innerHTML=`<div class='text-red'>Lỗi: ${M.message}. Dừng tự động.</div>`,u=!1;break}await new Promise(M=>setTimeout(M,1200))}}}async function kt(n){var p,s;const{state:t,api:e,notify:l,updateSidebar:d}=n,$=document.getElementById("exploreResult");if($){$.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const h=await e.explore(t.playerId);t.player=h.player,d();const y=h.event;let T=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(y.type==="monster")T+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${y.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${y.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${y.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(y.type==="monster_ambush"&&y.combatResult){const b=y.combatResult,o=et(b.log||[]),x=b.outcome==="win"?"🏆 Chiến thắng!":b.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",u=b.outcome==="win"?"var(--green)":b.outcome==="loss"?"var(--red)":"var(--orange)";T+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${y.message}</div>
        <div style="font-size:16px;font-weight:700;color:${u};margin-bottom:12px">${x}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${o}</div>
      `}else if(y.type==="worldBoss")T+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${y.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${y.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${y.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(y.type==="npc"&&y.npcId)T+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${y.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${y.message}</div>
        <div class="text-sm text-dim mb-md">${y.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <button class="btn btn--gold" id="btnNpcInteract">💬 Bái Kiến</button>
      `;else if(y.type==="player_encounter"&&y.targetPlayer){const b=y.targetPlayer;T+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${b.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${b.realmTierName||"Phàm nhân"} · Cấp ${b.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${b.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${b.id}">⚔️ Cướp Bóc</button>
        </div>
      `}else T+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${y.message}</div>
        ${y.gold?`<div class="text-gold bold">+${y.gold} 💎 Linh Thạch</div>`:""}
        ${y.item?`<div class="text-green bold">+1 ${y.item.name}</div>`:""}
        <button class="btn btn--blue mt-md" id="btnExploreContinue">Tiếp tục</button>
      `;T+="</div></div>",$.innerHTML=T,(y.type==="monster"||y.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",b=>{$.innerHTML="",tt(n,b.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async b=>{try{const o=await e.trackMonster(t.playerId,b.target.dataset.mid);o.success?(l(o.message,"success"),$.innerHTML="",typeof n.renderGame=="function"&&n.renderGame()):o.error&&l(o.error,"error")}catch(o){l("Lỗi theo dõi: "+o.message,"error")}})),y.type==="npc"&&y.npcId&&((p=document.getElementById("btnNpcInteract"))==null||p.addEventListener("click",async()=>{await wt(n,y.npcId,$)})),(s=document.getElementById("btnExploreContinue"))==null||s.addEventListener("click",()=>{$.innerHTML=""})}catch(h){$.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${h.message}</div></div>`}}}async function wt(n,t,e){const{state:l,api:d,notify:$,renderGame:p}=n,s=document.getElementById("npcQuestModal")||e;try{const y=(await d.getNpc(t)).npc;if(!y)return;const T=(l.player.activeQuests||[]).map(o=>o.quest_id);let b=y.quests.map(o=>{const x=T.includes(o.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${o.name}</span>
            <span class="text-xs badge" style="background:${o.type==="kill"?"var(--red)":"var(--green)"}">${o.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${o.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${o.rewards.gold?o.rewards.gold+"💎 ":""}${o.rewards.xp?o.rewards.xp+"✨ ":""}${o.rewards.skillChance?"🎯 "+o.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${x?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${o.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");s.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${y.icon||"🧓"} ${y.name} <span class="subtitle">${y.profession}</span></div>
        <div class="panel-body">
          ${b||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,s.querySelectorAll(".btn-accept-quest").forEach(o=>{o.addEventListener("click",async()=>{o.disabled=!0,o.textContent="⏳...";try{const x=await d.acceptQuest(l.playerId,o.dataset.npc,o.dataset.qid);l.player=x.player,$(x.message,"success"),p()}catch(x){$(x.message||"Lỗi nhận quest","error"),o.disabled=!1,o.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(h){console.error("NPC load error:",h)}}async function tt(n,t,e=null){var y,T;const{state:l,api:d,notify:$,updateSidebar:p,renderGame:s}=n,h=document.getElementById("combatResult");if(h){if(!l.player.currentHp||l.player.currentHp<=0)return $("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(l.player.hospitalRemaining>0)return $(`Đang tịnh dưỡng! Còn ${l.player.hospitalRemaining}s`,"error");h.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,h.scrollIntoView({behavior:"smooth"});try{const b=await d.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:l.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(l.player=b.player,b.outcome==="no_energy"){h.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${b.log[0]}</div></div>`,p();return}const o=b.monster,x=Math.max(0,l.player.currentHp/l.player.maxHp*100),u=Math.max(0,o.currentHp/o.maxHp*100),g={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},r=g[b.outcome]||g.loss,c=(y=b.rewards)!=null&&y.gold?` · +${b.rewards.gold} 💎`:"",a=b.rewards?` · +${b.rewards.xp} XP${c}`:"",v={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[b.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};h.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${r.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${r.icon}</span> <span>${r.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${b.turns}/${b.maxTurns||25} Lượt ${a}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.9) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright); font-size: 15px; margin-bottom: 2px;">${l.player.name}</div>
              <div style="font-size: 11px; color: ${v.color}; font-weight: 600; margin-bottom: 8px;">
                ${v.icon} ${v.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${x}%; height: 100%; background: ${x>50?"var(--green)":x>20?"var(--orange)":"var(--red)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${l.player.currentHp}/${l.player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(251,191,36,0.5); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${(T=b.glitchEvents)!=null&&T.length?b.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${o.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${o.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${o.level||1} · ${o.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${u}%; height: 100%; background: ${u>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${o.currentHp}/${o.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${b.weakpoint?`
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${b.weakpoint}</strong> (x2.5 Dmg)
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
            ${et(b.log)}
          </div>
        </div>
      </div>`;const i=document.getElementById("cardMonster"),m=document.getElementById("cardPlayer");b.glitchEvents&&b.glitchEvents.length>0&&i?b.glitchEvents.forEach((w,f)=>{setTimeout(()=>{X(i,`-${w.damage} 🌌 [VẾT NỨT]`,"glitch"),i.classList.add("shake"),setTimeout(()=>i.classList.remove("shake"),400)},f*400+200)}):i&&b.rewards&&X(i,`-${Math.round(o.maxHp*.4)} 💥`,"crit"),p(),e&&typeof s=="function"&&setTimeout(()=>s(),1500)}catch(b){h.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${b.message}</div></div>`}}}function X(n,t,e="normal"){if(!n)return;const l=document.createElement("div");l.className=`floating-damage damage-${e}`,l.textContent=t,n.appendChild(l),setTimeout(()=>l.remove(),1100)}function et(n){return(n||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function W(n,t){const{state:e,api:l,notify:d}=t,$=e.player,p=($.skills||[]).find(b=>(typeof b=="string"?b:b.id)==="nhan_thuat"),s=p?p.level||1:0,h=[...e.skills].sort((b,o)=>(b.tier||1)-(o.tier||1)),y=($.skills||[]).map(b=>typeof b=="string"?b:b.id),T={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};n.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${s}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${h.map(b=>{const o=y.includes(b.id),x=b.tier||1,u=x>s+1,g=x<=s;let r="";return b.requirements&&b.requirements.length>0?g||o?r=`<div class="mt-sm text-xs text-orange">Điều kiện: ${b.requirements.map(c=>`<br>• ${c}`).join("")}</div>`:u?r=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${x}.</div>`:r='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':r='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${o?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${b.name} ${o?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${o?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${T[x]||x}</span>
                    <span class="text-xs text-dim">${b.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||o?b.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${b.type!=="passive"&&b.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${b.cost} linh lực</div>`:""}
                
                ${r}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${o?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${u?"btn--dark":"btn--gold"} btn--sm btn-learn" ${u?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${b.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,n.querySelectorAll(".accordion-header").forEach(b=>{b.addEventListener("click",()=>{const o=b.nextElementSibling;o.style.display==="none"?(o.style.display="block",b.querySelector("div:last-child").textContent="▲"):(o.style.display="none",b.querySelector("div:last-child").textContent="▼")})}),n.querySelectorAll(".btn-learn").forEach(b=>{b.addEventListener("click",async o=>{o.stopPropagation();try{const x=await l.learnSkill($.id,b.dataset.sid);x.error?d(x.error,"error"):(e.player=x.player,d(x.message,"success"),W(n,t))}catch(x){d("Lỗi học kỹ năng: "+x.message,"error")}})})}function Lt(n,t){var x,u,g;const{state:e,api:l,notify:d,renderGame:$}=t,p=e.player,s=p.stats,h=p.allocatedStats||{},y=5,T=p.currentEnergy>=y&&!p.hospitalRemaining,b=p.talentDisplay||{},o=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];n.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${p.currentEnergy}/${p.maxEnergy} linh lực · Chi phí: ${y}/lần</span>
      </div>
    </div>

    ${p.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${p.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${((x=p.realmInfo)==null?void 0:x.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(u=p.realmInfo)!=null&&u.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${o.map(([r,c,a])=>{const v=b[r]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${v.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${c}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${a}</div>
                <div style="font-size:14px;font-weight:700;color:${v.color};margin-top:4px">${v.icon} ${v.name}</div>
                <div style="font-size:11px;color:${v.color};opacity:0.8">×${v.value} hệ số</div>
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
        ${o.map(([r,c,a,v])=>{const i=b[r]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},m=Math.floor(p.currentEnergy/y)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${c}</span> ${a}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${v}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${s[r]??0}</span>
              ${h[r]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${h[r]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${i.color};min-width:50px" title="Căn Cốt: ${i.name} (×${i.value})">${i.icon}×${i.value}</span>
              <input type="number" class="train-count" data-stat="${r}" min="1" max="${m}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${T?"":"disabled"}>
              <button class="btn btn--sm ${T?"btn--blue":"btn--dark"} train-btn" data-train="${r}" ${T?"":"disabled"} title="Tốn ${y} Linh lực/lần · Căn cốt ×${i.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${y} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(p.currentEnergy/y)}</strong> lần hiện tại.
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
    </div>`,(g=n.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",async()=>{try{const r=n.querySelector(".btn-breakthrough");r.disabled=!0,r.innerHTML="Đang Độ Kiếp...";const c=await l.attemptBreakthrough(e.playerId);e.player=c.player,d(c.message,"success"),$()}catch(r){d(r.message||"Đột phá thất bại","error");const c=n.querySelector(".btn-breakthrough");c&&(c.disabled=!1,c.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),n.querySelectorAll(".train-btn").forEach(r=>{r.addEventListener("click",async c=>{c.stopPropagation();const a=n.querySelector(`.train-count[data-stat="${r.dataset.train}"]`),v=parseInt(a==null?void 0:a.value)||1;try{const i=await l.trainStat(e.playerId,r.dataset.train,v);e.player=i.player,d(i.message,"success"),$()}catch(i){d(i.message||"Lỗi rèn luyện","error")}})})}function nt(n,t){var a;const{state:e,api:l,notify:d,renderGame:$}=t,p=e.player,s=e.educationTrees||[],h=p.unlockedNodes||[],y=p.studyingNode||"",T=y?y.split("|")[0]:"",b=p.studyEndsAt||0,o=Math.max(0,b-Math.floor(Date.now()/1e3)),x=p.treeProgress||{},u=p.skillProgress||{};let g=localStorage.getItem("eduActiveTree")||((a=s[0])==null?void 0:a.id),r=s.find(v=>v.id===g)||s[0];!r&&s.length>0&&(r=s[0]);const c=()=>{if(!r){n.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const v=s.map(C=>`
      <button class="edu-tab ${C.id===r.id?"active":""}" data-tab="${C.id}">
        <span class="edu-tab-icon">${C.icon}</span>
        <span class="edu-tab-name">${C.name}</span>
        <span class="edu-tab-badge">${x[C.id]||0}</span>
      </button>
    `).join("");let i="";if(T){let C=null,H=null;s.forEach(P=>{const I=P.nodes.find(_=>_.id===T);I&&(C=I,H=P)}),C&&(i=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${H.name}</div>
              <div class="text-gold text-lg bold">${C.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${o}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${o>0?"disabled":""}>
                ${o>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const m=x[r.id]||0;let w=null;for(const C of r.milestones||[])if(m<C.require){w=C;break}let f="";w?f=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${w.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${w.description}</div>
        </div>
      `:f='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const k=p.discoveredNodes||[],L=(r.nodes||[]).map(C=>{const H=h.includes(C.id),P=T===C.id,I=(C.prerequisites||[]).every(N=>h.includes(N)),_=r.nodes.some(N=>(N.prerequisites||[]).includes(C.id));if(!(k.includes(C.id)||H||!(C.prerequisites&&C.prerequisites.length>0))||H&&_)return"";let O="";P?O="studying":H?O="done":O="available";let z="";P?z='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':T?z='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':H?z=`<button class="btn btn--sm btn--gold btn-learn" data-node="${C.id}">Tiếp Tục Lãnh Ngộ (${C.duration}s)</button>`:I?z=`<button class="btn btn--sm btn--blue btn-learn" data-node="${C.id}">Bắt Đầu (${C.duration}s)</button>`:z='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const A=u[C.id]||{level:1,exp:0},j=A.level*100;let M="";return H&&(M=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${A.level} | Độ hiểu thấu: ${A.exp}/${j}</div>`),`
        <div class="edu-node ${O}">
          <div class="edu-node-info">
            <div class="edu-node-title">${C.name}</div>
            <div class="edu-node-desc">${C.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${C.bonusDescription}</div>
            ${M}
          </div>
          <div class="edu-node-action">
            ${z}
          </div>
        </div>
      `}).join("");n.innerHTML=`
      <div class="page-header">
        <h1>🧘 Công Pháp Tu Luyện</h1>
        <div class="text-dim text-sm mt-xs">Tu luyện công pháp, nâng cao thông thạo từng bước.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${v}</div>
          ${i}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${r.icon} ${r.name}</h2>
              <p class="text-dim mb-md">${r.description}</p>
              
              <h3 class="text-md mb-xs mt-md border-b pb-xs">🌟 Cảnh Giới Đột Phá</h3>
              <div class="edu-milestones-grid mb-lg">
                ${f||'<div class="text-dim text-sm">Nhánh này chưa có cảnh giới đặc biệt.</div>'}
              </div>

              <h3 class="text-md mb-xs border-b pb-xs">📖 Pháp Quyết</h3>
              <div class="edu-nodes-list">
                ${L||'<div class="text-dim text-sm">Chưa có pháp quyết.</div>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,n.querySelectorAll(".edu-tab").forEach(C=>{C.addEventListener("click",()=>{const H=C.dataset.tab;localStorage.setItem("eduActiveTree",H),g=H,r=s.find(P=>P.id===H)||s[0],c()})}),window.eduTimer&&clearInterval(window.eduTimer),T&&b>0&&(window.eduTimer=setInterval(()=>{const C=Math.floor(Date.now()/1e3);let H=Math.max(0,b-C);const P=document.getElementById("eduCounter");if(P&&(P.innerText=H+"s"),H<=0){clearInterval(window.eduTimer);const I=document.getElementById("btnCheckEdu");I&&(I.disabled=!1,I.innerHTML="✨ Đột Phá!")}},1e3));const S=n.querySelector("#btnCheckEdu");S&&S.addEventListener("click",async()=>{try{S.disabled=!0,S.innerHTML="Đang xử lý...";const C=await l.checkEducation(e.playerId);e.player=C.player,d(C.message,C.completed?"success":"info"),$()}catch(C){d(C.message||"Lỗi đột phá","error"),S.disabled=!1,S.innerHTML="Thử lại"}}),n.querySelectorAll(".btn-learn").forEach(C=>{C.addEventListener("click",async()=>{try{const H=C.dataset.node;C.disabled=!0,C.innerHTML="Chờ...";const P=await l.enrollNode(e.playerId,H,r.id);e.player=P.player,d(P.message,"success"),$()}catch(H){d(H.message||"Lỗi ghi danh","error"),C.disabled=!1,C.innerHTML="Bắt Đầu"}})})};c()}async function at(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.player;if(p){n.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const h=(await l.getGlitches(p.id)).status,y=n.querySelector("#glitchContentWrapper");if(!y)return;if(!h.featureUnlocked){St(y,h.featureDetails,p);return}Ct(y,h,p,t)}catch(s){n.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${s.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function St(n,t,e){const l=(t==null?void 0:t.requirements)||[];n.innerHTML=`
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
          ${l.map(d=>`
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.02); border-radius: 6px; border-left: 3px solid ${d.met?"#22c55e":"#6b7280"};">
              <span style="color: ${d.met?"#86efac":"#d1d5db"}; display: flex; align-items: center; gap: 8px;">
                <span>${d.met?"✅":"🔒"}</span> ${d.label}
              </span>
              <span style="font-size: 0.8rem; color: ${d.met?"#22c55e":"#9ca3af"}; font-weight: bold;">
                ${d.current}
              </span>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="font-size: 0.8rem; color: #71717a; max-width: 460px; margin: 0 auto;">
        💡 Gợi ý: Hãy tiếp tục đột phá tu vi lên <strong>Trúc Cơ</strong> hoặc chiến đấu sinh tử để kích phát kẽ hở thời không.
      </div>
    </div>
  `}function Ct(n,t,e,l){const{api:d,notify:$,updateSidebar:p}=l,s=t.imprints||[],h=t.stances||{},y=t.activeStance||"breaker";n.innerHTML=`
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
  `;const T=n.querySelector("#btnOverrideTribulation");T&&(T.onclick=async()=>{T.disabled=!0,T.textContent="Đang lách luật...";try{const b=await d.overrideTribulation(e.id);$(b.message,"success"),state.player=b.player,p(),at(n.parentElement,l)}catch(b){$(b.message||"Thao tác lách luật thất bại!","error"),T.disabled=!1,T.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),it(n,h,y,e,d,$,p),st(n,s,e,$,p)}function it(n,t,e,l,d,$,p){const s=n.querySelector("#stanceContainer");s&&(s.innerHTML="",Object.values(t).forEach(h=>{const y=h.isUnlocked!==!1,T=h.id===e,b=document.createElement("div");b.style.cssText=`
      background: ${T?"rgba(168, 85, 247, 0.15)":y?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${T?"#c084fc":y?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${y?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${y?"1":"0.55"};
    `,b.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${y?h.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${y?h.icon:"🔒"}</span> ${h.name}
        </div>
        ${T?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${y?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${y?h.description:`<span style="color:#f59e0b;">${h.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,b.onclick=async()=>{if(!y)return $(h.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!T)try{const o=await d.setStance(l.id,h.id);$(o.message,"success"),state.player=o.player,p(),it(n,t,h.id,l,d,$,p)}catch(o){$(o.message||"Chuyển thế thất bại","error")}},s.appendChild(b)}))}function st(n,t,e,l,d){const $=n.querySelector("#imprintsContainer");$&&($.innerHTML="",t.forEach(p=>{const s=document.createElement("div"),h=p.fogLevel||(p.isUnlocked?"revealed":"fog");let y="rgba(15, 23, 42, 0.5)",T="rgba(255,255,255,0.08)",b="none";h==="revealed"?(y="rgba(30, 41, 59, 0.75)",T=p.color,b=`0 0 12px ${p.color}33`):h==="partial"?(y="rgba(24, 24, 27, 0.6)",T="1px dashed rgba(168, 85, 247, 0.4)"):(y="rgba(10, 10, 15, 0.5)",T="1px dashed rgba(255, 255, 255, 0.08)"),s.style.cssText=`
      background: ${y};
      border: 1px solid ${T};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${b};
      position: relative;
      overflow: hidden;
    `,s.innerHTML=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${p.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${p.icon}</span> ${p.name}
          </div>
          <span style="font-size: 0.7rem; color: ${h==="revealed"?"#fbbf24":"#6b7280"}; border: 1px solid ${h==="revealed"?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.08)"}; padding: 1px 6px; border-radius: 4px;">
            ${h==="revealed"?p.title:h==="partial"?"Chớm Ngộ":"Sương Mù"}
          </span>
        </div>

        <div style="font-size: 0.78rem; color: ${h==="fog"?"#9ca3af":"#a1a1aa"}; font-style: italic; margin-bottom: 8px; line-height: 1.4;">
          "${p.lore}"
        </div>

        <div style="font-size: 0.82rem; color: ${h==="revealed"?"#e4e4e7":"#9ca3af"}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
          <strong style="color: ${h==="revealed"?"#67e8f9":"#888"};">
            ${h==="revealed"?"Hiệu ứng:":h==="partial"?"Manh mối:":"Sấm truyền:"}
          </strong> ${p.description}
        </div>
      </div>

      <div>
        ${h==="revealed"?`
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
            <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐẠI TRIỆT ĐẠI NGỘ</span>
            <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${p.title}">
              ${e.activeTitle===p.title?"Đang Đeo":"Đeo Danh Hiệu"}
            </button>
          </div>
        `:h==="partial"?`
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #a855f7; margin-bottom: 4px;">
              <span>Tiến độ cảm ứng:</span>
              <span>${p.progress.current} / ${p.progress.threshold}</span>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
              <div style="width: ${p.progress.percent}%; height: 100%; background: linear-gradient(90deg, #a855f7, #c084fc); transition: width 0.3s;"></div>
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
    `;const o=s.querySelector(".btnSetTitle");o&&(o.onclick=()=>{e.activeTitle=p.title,l(`Đã kích hoạt danh hiệu: [${p.title}]!`,"success"),d(),st(n,t,e,l,d)}),$.appendChild(s)}))}function Y(n,t){const{state:e,api:l,notify:d,renderGame:$}=t,p=e.player.skills||[],s=p.map(u=>typeof u=="string"?u:u.id),h=e.skills||[],y=(e.player.realmTier??1)>=2||(e.player.glitchInsight??0)>=20||(e.player.unlockedImprints||[]).length>0,T={combat:{icon:"⚔️",name:"Chiến Đấu",desc:"Chiêu thức sử dụng trong giao đấu"},life:{icon:"🛠️",name:"Sinh Hoạt",desc:"Thu thập, chế tạo, sinh tồn"},internal:{icon:"🧘",name:"Nội Công",desc:"Thụ động tăng cường bản thân"},gongfa:{icon:"📖",name:"Công Pháp",desc:"Tu luyện công pháp, nâng cao cảnh giới"},library:{icon:"📚",name:"Tàng Kinh Các",desc:"Kho tàng bí tịch nhân gian"},glitch:{icon:y?"🌌":"🌫️",name:y?"Dị Biến":"???",desc:"Thiên Đạo Dị Biến & Kẽ Hở Quy Luật"}};let b=localStorage.getItem("skillsTab")||"combat";const o=()=>Object.entries(T).map(([u,g])=>{let r=0;return u==="gongfa"?r=(e.educationTrees||[]).length:u==="library"?r=(h||[]).length:u==="glitch"?r=y?(e.player.unlockedImprints||[]).length:"?":r=p.filter(c=>{const a=typeof c=="string"?c:c.id,v=h.find(i=>i.id===a);return v&&(v.category||"combat")===u}).length,`<button class="skill-tab ${u===b?"active":""}" data-tab="${u}">
        ${g.icon} ${g.name} <span class="skill-tab-count">${r}</span>
      </button>`}).join(""),x=()=>{if(b==="gongfa"){n.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${o()}</div>
        <div id="gongfa-content"></div>
      `,n.querySelectorAll(".skill-tab").forEach(v=>{v.addEventListener("click",()=>{b=v.dataset.tab,localStorage.setItem("skillsTab",b),x()})});const a=n.querySelector("#gongfa-content");a&&nt(a,t);return}if(b==="library"){n.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${o()}</div>
        <div id="library-content"></div>
      `,n.querySelectorAll(".skill-tab").forEach(v=>{v.addEventListener("click",()=>{b=v.dataset.tab,localStorage.setItem("skillsTab",b),x()})});const a=n.querySelector("#library-content");a&&W(a,t);return}if(b==="glitch"){n.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${o()}</div>
        <div id="glitch-content"></div>
      `,n.querySelectorAll(".skill-tab").forEach(v=>{v.addEventListener("click",()=>{b=v.dataset.tab,localStorage.setItem("skillsTab",b),x()})});const a=n.querySelector("#glitch-content");a&&at(a,t);return}const g=p.map(a=>{const v=typeof a=="string"?a:a.id;return{...h.find(m=>m.id===v)||{name:v,id:v,category:"combat"},level:a.level||1,xp:a.xp||a.currentXp||0,equipped:a.equipped||a.isEquipped||!1}}).filter(a=>(a.category||"combat")===b),r=h.filter(a=>(a.category||"combat")===b&&!s.includes(a.id)),c=(a,v)=>{const i=a.level*100,m=Math.min(100,a.xp/i*100),w=a.type==="passive",f="★".repeat(Math.min(a.tier||1,7)),k=(a.tier||1)>=5?"var(--gold)":(a.tier||1)>=3?"var(--purple)":"var(--blue)";let L="";return v?w?L='<span style="font-size:10px;color:var(--green)">🔮 Vĩnh Viễn</span>':a.equipped?L=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${a.id}">Tháo</button>`:L=`<button class="btn btn--sm btn--blue equip-btn" data-eq="1" data-sid="${a.id}">Trang Bị</button>`:L='<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>',`
        <div class="skill-card ${v?"":"locked"} ${a.equipped&&!w?"equipped":""}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name">${a.name}</div>
              <div class="skill-card-tier" style="color:${k}">${f} Tầng ${a.tier||1}</div>
            </div>
            <div class="skill-card-action">${L}</div>
          </div>
          <div class="skill-card-desc">${a.description||""}</div>
          ${v?`
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${a.level}</span>
                <span class="text-dim">${a.xp}/${i}</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${m}%"></div></div>
              ${a.masteryBonus?`<div class="skill-mastery-bonus">✨ ${a.masteryBonus}</div>`:""}
            </div>
          `:`
            <div class="skill-card-req">
              ${(a.requirements||[]).map(S=>`<span class="req-tag">🔒 ${S}</span>`).join(" ")}
            </div>
          `}
          ${a.cost?`<div class="skill-card-cost">🔵 ${a.cost} Linh Lực</div>`:""}
        </div>
      `};n.innerHTML=`
      <div class="page-header">
        <h1>⚡ Kỹ Năng & Công Pháp</h1>
        <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
      </div>

      <div class="skill-tabs">${o()}</div>

      <div class="panel">
        <div class="panel-title">
          ${T[b].icon} ${T[b].name}
          <span class="subtitle">${T[b].desc}</span>
        </div>
        <div class="panel-body">
          ${g.length===0&&r.length===0?'<div class="text-dim">Chưa có kỹ năng nào trong nhánh này.</div>':""}
          
          ${g.length>0?`
            <div class="skill-grid">
              ${g.map(a=>c(a,!0)).join("")}
            </div>
          `:""}

          ${r.length>0?`
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
              <div class="text-dim text-sm" style="margin-bottom:8px">🔒 Chưa lĩnh ngộ (${r.length})</div>
              <div class="skill-grid">
                ${r.map(a=>c({...a,level:0,xp:0},!1)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,n.querySelectorAll(".skill-tab").forEach(a=>{a.addEventListener("click",()=>{b=a.dataset.tab,localStorage.setItem("skillsTab",b),x()})}),n.querySelectorAll(".equip-btn").forEach(a=>{a.addEventListener("click",async()=>{try{const v=a.dataset.sid,i=a.dataset.eq==="1",m=await l.equipSkill(e.playerId,v,i);e.player=m.player,d(m.message,"success"),x()}catch(v){d(v.message||"Lỗi trang bị","error")}})})};x()}function Et(n,t){return t==="manual"?"📜":n==="weapon"?"⚔️":n==="body"?"🥋":n==="shield"?"🛡️":n==="feet"?"👢":n==="ring"?"💍":"📦"}function Z(n,t){let e="",l="";if(n.slot==="weapon"){let h=0,y=0;(n.affixes||[]).forEach(T=>{T.stat==="strength"&&T.type==="flat"&&(h+=T.value),T.stat==="dexterity"&&T.type==="flat"&&(y+=T.value)}),h===0&&(h=n.itemLevel*2+5),y===0&&(y=n.itemLevel+10),e=`⚔️ ${h}`,l=`🎯 ${y}`}else if(n.slot==="body"||n.slot==="shield"||n.slot==="feet"){let h=0;(n.affixes||[]).forEach(y=>{y.stat==="defense"&&y.type==="flat"&&(h+=y.value)}),h===0&&(h=n.itemLevel*3),e=`🛡️ ${h}`}else if(n.slot==="ring"){let h=0;(n.affixes||[]).forEach(y=>{y.stat==="capacity"&&(h+=y.value)}),e=h>0?`🎒 +${h}`:""}const d=(n.affixes||[]).map(h=>Ht(h)).map(h=>`<span class="badge badge-dim">${h}</span>`).join(" "),$=n.description||`Một vật phẩm loại ${n.slot} cấp ${n.itemLevel} thuộc phẩm chất ${n.rarity}. Khí tức tỏa ra không tồi.`,p=n.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${n.craftedBy}</strong></div>`:"",s=t?n.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${n.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${n.id}">Trang Bị</button>`:"";return`
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
          ${Et(n.slot,n.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${n.name}</strong> là loại ${n.baseType}. ${$}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${n.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${n.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${d||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${p}
          <div class="mt-2 flex justify-end">
            ${s}
          </div>
        </div>
      </div>
    </div>`}function Ht(n){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[n.stat]||n.stat,l=n.value>=0?"+":"";return n.type==="flat"?`${l}${n.value} ${e}`:n.type==="increase"?`${l}${n.value}% ${e}`:n.type==="more"?`×${l}${n.value}% ${e}`:`${l}${n.value} ${e}`}function J(n,t){var c,a,v,i,m,w,f;const{state:e,api:l,notify:d,renderGame:$}=t,p=Object.values(e.player.equipment||{}),s=e.player,h=e.medicines||[],y=s.medCooldownRemaining||0,T=e.inventoryTab||"equipped",b=s.skills&&s.skills.some(k=>{const L=typeof k=="string"?k:k.id;return L==="duoc_ly"||L==="y_thuat"}),o=p.find(k=>k.slot==="ring1"),x=p.find(k=>k.slot==="ring2");let u=20;((o==null?void 0:o.id)==="tui_tru_vat"||(c=o==null?void 0:o.baseType)!=null&&c.includes("tru_vat"))&&(u+=((v=(a=o.affixes)==null?void 0:a[0])==null?void 0:v.value)||10),((x==null?void 0:x.id)==="tui_tru_vat"||(i=x==null?void 0:x.baseType)!=null&&i.includes("tru_vat"))&&(u+=((w=(m=x.affixes)==null?void 0:m[0])==null?void 0:w.value)||10),n.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(s.inventory||[]).length} / ${u})</span></h1>
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
          Đan Dược ${y>0?`<span style="color:var(--orange); font-size:11px">(${y}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),r=()=>{g.querySelectorAll("[data-eid]").forEach(k=>{k.addEventListener("click",async L=>{L.stopPropagation();try{const S=await l.equipItem(e.playerId,k.dataset.eid);e.player=S.player,d(S.message,"success"),$()}catch(S){d(S.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(k=>{k.addEventListener("click",async L=>{L.stopPropagation();try{const S=await l.useItem(e.playerId,k.dataset.use);e.player=S.player,d(S.message,"success"),$()}catch(S){d(S.message||"Lỗi sử dụng","error")}})})};if(T==="equipped"){const k=s.equipment||{},L=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${L.map(S=>{const C=k[S.key],H=C&&C.id,P=H?`rarity-${C.rarity}`:"";return`
            <div style="background:${H?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${H?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${S.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${S.name}</div>
              ${H?`<div style="font-size:11px;font-weight:600" class="${P}">${C.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${C.rarity}] Lv${C.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${p.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${p.filter(S=>S&&S.id).map(S=>Z(S,!1)).join("")}
      `:""}
    `,r()}else if(T==="medicine")g.innerHTML=`
      <div style="padding:12px">
        ${y>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${y}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${y/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${h.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':h.map(k=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${k.icon||"💊"} ${k.name}</div>
                <div class="item-meta">
                  ${k.description}
                  ${k.healPercent?` · Phục hồi ${k.healPercent}% HP`:""}
                  ${k.cooldownAdd?` · Sinh Đan độc ${k.cooldownAdd}s`:""}
                  ${k.duration?` · Hiệu lực ${k.duration} trận`:""}
                  ${k.toxicity&&b?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${k.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${k.penalty&&b?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${k.penalty.map(L=>`Giảm ${Math.abs(L.value)*100}% ${L.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${k.id}" 
                ${y+(k.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(k=>{k.addEventListener("click",async()=>{try{const L=await l.useMedicine(e.playerId,k.dataset.med);e.player=L.player,d(L.message,"success"),$()}catch(L){d(L.message||"Đan độc quá nồng!","error")}})});else{const k=s.inventory||[];let L=[];T==="weapon"?L=k.filter(S=>S.slot==="weapon"&&S.category!=="manual"):T==="armor"?L=k.filter(S=>["body","shield","feet"].includes(S.slot)):T==="accessory"?L=k.filter(S=>["ring","amulet","ring1","ring2"].includes(S.slot)):T==="manual"&&(L=k.filter(S=>S.category==="manual")),g.innerHTML=`
      ${L.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':L.map(S=>Z(S,!0)).join("")}
    `,r()}n.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{e.inventoryTab=k.dataset.tab,J(n,t)})}),(f=document.getElementById("btnGen"))==null||f.addEventListener("click",async()=>{const k=["common","rare","epic","legendary"];try{const L=await l.generateItem(e.playerId,k[Math.floor(Math.random()*k.length)]);e.player=L.player,e.items=L.items||[],d(L.message,"success"),J(n,t)}catch{d("Lỗi tạo ngẫu nhiên","error")}})}function Pt(n,t){var v,i;const{state:e,api:l,notify:d,renderGame:$}=t,p=e.player,s=e.crimes||[];if((p.jailRemaining??0)>0){const m=p.jailRemaining,w=Math.max(10,100*Math.ceil(m/60)*p.level);n.innerHTML=`
      <div class="page-header"><h1>🏛 Thiên Lao</h1></div>
      <div class="panel">
        <div class="panel-title">Trạng thái</div>
        <div class="panel-body" style="text-align:center">
          <div style="font-size:28px;color:var(--red);font-weight:700">⛓ Bị giam giữ</div>
          <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${m}s</strong></div>
          <div style="margin-top:16px;display:flex;gap:12px;justify-content:center">
            <button class="btn btn--blue" id="btnEscape">🏃 Vượt ngục (3 Nghịch Khí)</button>
            <button class="btn btn--gold" id="btnBail">💰 Bảo lãnh (${w} Lính Thạch)</button>
          </div>
        </div>
      </div>`,(v=document.getElementById("btnEscape"))==null||v.addEventListener("click",async()=>{try{const f=await l.escapeJail(e.playerId);e.player=f.player,d(f.message,f.success?"success":"error"),$()}catch(f){d(f.message||"Lỗi","error")}}),(i=document.getElementById("btnBail"))==null||i.addEventListener("click",async()=>{try{const f=await l.bail(e.playerId);e.player=f.player,d(f.message,f.success?"success":"error"),$()}catch(f){d(f.message||"Lỗi","error")}});return}const y={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},T={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},b=s.reduce((m,w)=>{const f=w.category||"theft";return m[f]||(m[f]=[]),m[f].push(w),m},{}),o=Object.keys(y).map(m=>{const w=b[m];if(!w||w.length===0)return"";const f=y[m];return`
    <div class="panel mt-md" style="border-color: ${f.color}40;">
      <div class="panel-title" style="color: ${f.color};">${f.label} <span class="subtitle text-dim">${w.length} loại</span></div>
      <div class="panel-body no-pad">
        ${w.map(k=>{var I;const L=((I=p.crimeSkills)==null?void 0:I[k.id])??0,S=L<(k.minSkill??0),C=!S&&(p.currentStamina??100)>=(k.nerveCost??2),H=k.special||[],P=Math.min(95,k.baseSuccessRate+L*.5);return`
            <div class="list-item crime-item ${S?"crime-locked":""}">
              <div class="item-info">
                <div class="item-name" style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:18px">${k.icon}</span>
                  <span>${k.name}</span>
                  ${S?'<span style="opacity:0.5">🔒</span>':""}
                </div>
                <div class="item-desc">${k.description}</div>
                <div class="item-meta" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  <span>🏃 ${k.nerveCost??2} Thể Lực</span>
                  <span>💰 ${k.rewards.goldMin}-${k.rewards.goldMax}</span>
                  <span style="color:${P>=60?"var(--green)":P>=40?"var(--orange)":"var(--red)"}">🎯 ${Math.round(P)}%</span>
                  ${S?`<span style="color:var(--red)">Cần Skill ${k.minSkill}</span>`:`<span>📊 ${L}/100</span>`}
                </div>
                ${H.length>0?`
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${H.map(_=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${T[_]||_}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <button class="btn btn--sm ${C?"btn--red":""}" data-crime="${k.id}" ${C?"":"disabled"}>
                ${S?"🔒":"Thực hiện"}
              </button>
            </div>`}).join("")}
      </div>
    </div>`}).join(""),x=p.crimeExp||0,u=Math.floor(x/50),g=x%50,r=50,c=g/r*100,a=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${u}</strong>
          <span class="text-dim">${g} / ${r} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${c}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${r-g} EXP</strong> nữa để tăng cấp Danh Vọng Hắc Đạo.</div>
      </div>
    </div>
  `;n.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">🏃 ${p.currentStamina??100}/${p.maxStamina??100} Thể Lực · 💰 ${p.gold??0} Linh Thạch</span></div>
    </div>
    ${a}
    ${o}`,n.querySelectorAll("[data-crime]").forEach(m=>{m.addEventListener("click",async()=>{try{const w=await l.commitCrime(e.playerId,m.dataset.crime);e.player=w.player;const f=w.outcome==="success"?"success":w.outcome==="critical_fail"?"error":"info";d(w.message,f),$()}catch(w){d(w.message||"Lỗi","error")}})})}function rt(n,t){const{state:e,api:l,notify:d,updateSidebar:$,renderGame:p}=t,s=e.playerId;e._dungeon||(e._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const h=e._dungeon;async function y(){try{const[r,c]=await Promise.all([l.getMapItems(s),l.getDungeonHistory(s)]);h.mapItems=r.mapItems||[],h.activeRun=r.activeRun||null,h.history=c.history||[],h.loaded=!0,T()}catch(r){d(r.message||"Lỗi tải Bí Cảnh","error")}}function T(){n.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${h.activeRun?b():o()}

      ${h.lastResult?x():""}

      ${u()}
    `,g()}function b(){var v,i;const r=h.activeRun,c=r.currentWave===r.totalWaves,a=((r.currentWave-1)/r.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${r.dungeonName||r.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${a}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${r.currentWave}/${r.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((v=e.player)==null?void 0:v.hospitalRemaining)>0?"disabled":""}>
              ${c?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+r.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((i=e.player)==null?void 0:i.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function o(){return h.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${h.mapItems.map(r=>{const c=r.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${r.item.icon} ${r.item.name} <span style="opacity:0.5">x${r.quantity}</span></div>
                  ${c?`
                    <div class="item-meta">
                      ${c.name} · T${c.tier} · ${c.waves+1} tầng · Boss: ${c.bossName}
                    </div>
                  `:""}
                </div>
                ${c?`<button class="btn btn--sm btn--gold" data-enter="${r.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function x(){var v,i;const r=h.lastResult,c=r.result==="dungeon_complete"?"🏆":r.result==="wave_cleared"?"✅":"💀",a=r.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${a}">
        <div class="panel-title" style="color:${a}">${c} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${r.message}</div>
          ${(v=r.loot)!=null&&v.length?`
            <div style="margin-bottom:8px">
              ${r.loot.map(m=>`<div style="font-size:12px;color:var(--green)">🎁 ${m}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((i=r.combatLog)==null?void 0:i.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(r.combatLog||[]).map(m=>`<div>${m}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function u(){return h.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${h.history.map(r=>{const c=r.status==="completed"?"✅":r.status==="failed"?"❌":r.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${r.status==="completed"?"var(--green)":r.status==="failed"?"var(--red)":"var(--orange)"}">${c} ${r.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${r.wave}/${r.totalWaves} · ${new Date(r.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function g(){var r,c;document.querySelectorAll("[data-enter]").forEach(a=>{a.addEventListener("click",async()=>{const v=a.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){a.disabled=!0;try{const i=await l.enterDungeon(s,v);d(i.message,"success"),e.player=i.player,$(),h.activeRun=i.run,h.lastResult=null,await y()}catch(i){d(i.message,"error"),a.disabled=!1}}})}),(r=document.getElementById("btnFight"))==null||r.addEventListener("click",async()=>{const a=document.getElementById("btnFight");a.disabled=!0,a.textContent="⏳ Đang chiến đấu...";try{const v=await l.fightDungeonWave(s);e.player=v.player,$(),h.lastResult=v,v.result==="dungeon_complete"||v.result==="dungeon_failed"?h.activeRun=null:v.result==="wave_cleared"&&(h.activeRun.currentWave=v.nextWave),T()}catch(v){d(v.message,"error"),a.disabled=!1,a.textContent="⚔️ Chiến Đấu"}}),(c=document.getElementById("btnAbandon"))==null||c.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await l.abandonDungeon(s),d("Đã rời khỏi Bí Cảnh.","info"),h.activeRun=null,h.lastResult=null,await y()}catch(a){d(a.message,"error")}})}h.loaded?T():y()}function dt(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const s=e._tc;async function h(){try{s.data=await l.request(`/player/${p}/atlas-maps`),s.loaded=!0,y()}catch(g){d(g.message,"error")}}function y(){const g=s.data,r=(g==null?void 0:g.atlas)||{},c=(g==null?void 0:g.maps)||[],a=g==null?void 0:g.activeRun,v=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,n.innerHTML=`
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
        <button class="btn ${s.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${s.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${c.length})</button>
        ${a?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,n.querySelectorAll("[data-tab]").forEach(m=>{m.addEventListener("click",()=>{s.tab=m.dataset.tab,y()})});const i=document.getElementById("tcContent");i&&(a&&s.tab==="run"?x(i,a):s.tab==="inventory"?b(i,c):T(i,v,r))}function T(g,r,c){var v;const a=((v=s.data)==null?void 0:v.tiers)||[];g.innerHTML=a.map(i=>{const m=r.filter(w=>w.tier===i.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${i.tier} ${i.name} <span style="opacity:0.4;font-size:11px">(Realm ${i.requiredRealm}+, ${i.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${m.map(w=>{var L;const f=((L=c.progress)==null?void 0:L[w.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[w.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${f?700:400}">${w.name}</span>
                ${f?`<span style="color:var(--green);font-size:11px">✅ ×${f}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function b(g,r,c){if(r.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=r.map((a,v)=>{const i=a.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${u(a.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${a.mapName||a.mapId} <span style="color:${u(a.tier)};font-size:12px">T${a.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${i.length>0?i.map(m=>m.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${i.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${v}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${v}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(a=>{a.addEventListener("click",async()=>{try{const v=await l.request(`/player/${p}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(a.dataset.idx)})});d(v.message,"success"),e.player=v.player,$(),s.tab="run",await h()}catch(v){d(v.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(a=>{a.addEventListener("click",()=>o(parseInt(a.dataset.idx)))})}function o(g){var a;const r=((a=s.data)==null?void 0:a.modifiers)||[],c=document.createElement("div");c.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",c.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${r.map(v=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${v.id}">
          <span style="flex:1"><strong>${v.name}</strong><br><span style="font-size:11px;opacity:0.6">${v.desc} · IIQ +${v.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,c.addEventListener("click",async v=>{const i=v.target.closest("[data-modid]");if(i)try{const m=await l.request(`/player/${p}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:i.dataset.modid})});d(m.message,"success"),e.player=m.player,$(),c.remove(),await h()}catch(m){d(m.message,"error")}else v.target===c&&c.remove()}),document.body.appendChild(c)}function x(g,r){var v,i;const c=r.currentWave/r.totalWaves*100,a=r.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${r.mapName} <span style="color:${u(r.tier)}">T${r.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${r.currentWave}/${r.totalWaves}
            ${a.length>0?" · "+a.map(m=>m.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${c}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${s.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(v=document.getElementById("btnTCFight"))==null||v.addEventListener("click",async()=>{s.fighting=!0,y();try{const m=await l.request(`/player/${p}/atlas-maps/fight`,{method:"POST"});e.player=m.player,$();const w=m.result!=="map_failed";d(m.message,w?"success":"error"),s.fighting=!1,(m.result==="map_complete"||m.result==="map_failed")&&(s.tab="atlas"),await h()}catch(m){d(m.message,"error"),s.fighting=!1,y()}}),(i=document.getElementById("btnTCQuit"))==null||i.addEventListener("click",async()=>{try{await l.request(`/player/${p}/atlas-maps/abandon`,{method:"POST"}),d("Đã rời Tiên Cảnh","info"),s.tab="atlas",await h()}catch(m){d(m.message,"error")}})}function u(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}s.loaded?y():h()}function lt(n,t){const{state:e}=t,l=e._travelTab||"map";n.innerHTML=`
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
  `,n.querySelectorAll(".tab-btn").forEach($=>{$.addEventListener("click",()=>{e._travelTab=$.dataset.tab,lt(n,t)})});const d=n.querySelector("#travelTabContent");l==="map"?G(d,t):l==="dungeon"?rt(d,t):dt(d,t)}async function G(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t;n.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[p,s]=await Promise.all([l.request("/data/areas"),l.request(`/player/${e.playerId}/area`)]),h=p.areas||[],y=s.area,T=s.player,b=s.traveling||!1,o=s.travelRemaining||0,x=s.travelDestination||"";s.message&&d(s.message,"success"),s.player&&(e.player=s.player,$());const u=e.exploration||{},g=u[(T==null?void 0:T.currentArea)||"thanh_lam_tran"],r=(y==null?void 0:y.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",c=(g==null?void 0:g.staminaCost)||10,a={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận"},v=a[T==null?void 0:T.currentArea]||"",i=[...h].sort((m,w)=>(m.sort_order||m.mapY||0)-(w.sort_order||w.mapY||0));if(n.innerHTML=`
      ${b?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${x}</span></strong>
            <div id="travelTimer" style="font-size:26px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 12px rgba(255,215,0,0.4)">⏳ ${o}s</div>
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
                <div class="text-gold bold">-${c} TL/lần</div>
              </div>
            </div>
            ${y!=null&&y.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${y.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${(y==null?void 0:y.min_level)||1}+</span>
              ${v?`<span class="badge" style="background:rgba(255,215,0,0.1);color:var(--gold);border:1px solid rgba(255,215,0,0.25);font-size:11px">${v}</span>`:""}
            </div>
          </div>
        </div>
      `}

      <!-- 2D REALM MAP OVERVIEW -->
      <div class="panel">
        <div class="panel-title flex items-center justify-between">
          <span>🗺️ Thiên Địa Giới Đồ (2D Bát Hoang Tinh Đồ)</span>
          <span class="text-xs text-dim">${i.length} Khu vực</span>
        </div>
        <div class="panel-body" style="background:linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(10,15,28,0.95) 100%); padding:12px">
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px">
            ${i.map((m,w)=>{const f=u[m.id],k=m.id===T.currentArea&&!b,L=T.level<(m.min_level||1),S=parseInt(m.travel_time)||0,C=(f==null?void 0:f.staminaCost)||10,H=a[m.id]||"";let P="rgba(255,255,255,0.08)",I="rgba(255,255,255,0.03)";return k?(P="rgba(34, 197, 94, 0.6)",I="rgba(34, 197, 94, 0.08)"):L&&(P="rgba(239, 68, 68, 0.2)",I="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${k?"current-realm":""} ${L?"locked-realm":""}" 
                     style="border:1px solid ${P}; background:${I}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${k?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${k?"var(--green)":L?"var(--text-dim)":"var(--text-bright)"}">
                        #${w+1} ${m.name}
                      </div>
                      ${L?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${m.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${L?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${L?"var(--red)":"var(--text-dim)"}">
                        Lv.${m.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${S>0?`⏱ ${S}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        🏃 -${C} TL
                      </span>
                    </div>

                    ${H?`
                      <div style="font-size:10px; color:var(--gold); background:rgba(255,215,0,0.05); padding:3px 6px; border-radius:4px; margin-bottom:10px; border-left:2px solid var(--gold)">
                        ${H}
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
                        Cần Đạt Cấp ${m.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${m.id}" ${b?"disabled":""}>
                        ${S>0?`🚶 Vi Hành (${S}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll("[data-travel]").forEach(m=>{m.addEventListener("click",async w=>{w.stopPropagation();const f=m.dataset.travel;n.querySelectorAll("[data-travel]").forEach(k=>{k.tagName==="BUTTON"&&(k.disabled=!0),k.style.pointerEvents="none"});try{const k=await l.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:f})});k.player&&(e.player=k.player,$()),d(k.message,"success"),G(n,t)}catch(k){d(k.message||"Lỗi di chuyển!","error"),G(n,t)}})}),b&&o>0){let m=o;const w=o,f=setInterval(async()=>{m--;const k=document.getElementById("travelTimer"),L=document.getElementById("travelBar");if(k&&(k.textContent=`⏳ ${Math.max(0,m)}s`),L&&(L.style.width=`${Math.max(0,m/w*100)}%`),m<=0){clearInterval(f);try{const S=await l.request(`/player/${e.playerId}/travel-check`,{method:"POST"});S.player&&(e.player=S.player,$()),S.arrived&&d(S.message,"success"),G(n,t)}catch{G(n,t)}}},1e3)}}catch(p){n.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(p)}}function U(n,t){var a,v;const{state:e,renderGame:l,notify:d,updateSidebar:$}=t,p=e.player,s=e.recipes||[],h=e.medicines||[],y=e._alchemyTab||"recipes",T=i=>{const m=h.find(w=>w.id===i);return m?(m.icon||"💊")+" "+m.name:i};let b=0,o=0,x=0,u=0;(p.skills||[]).forEach(i=>{const m=typeof i=="string"?i:i.id,w=typeof i=="string"?1:i.level||1;m==="tinh_che"&&(b=w*2),m==="phu_an_thuat"&&(o=w*5),m==="linh_kiem_thuat"&&(x=w*10),m==="cuong_hoa_thuat"&&(u=w*15)});const g=i=>i.split("_").map(m=>m.charAt(0).toUpperCase()+m.slice(1)).join(" "),r=[];Object.values(p.equipment||{}).forEach(i=>{i&&r.push({...i,loc:"eq"})}),(p.inventory||[]).filter(i=>i.slot&&i.slot!=="consumable").forEach(i=>r.push({...i,loc:"inv"}));let c=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${y==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${y==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${b||o||x||u?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${b?`<span>🔥 Thành công +${b}%</span>`:""}
      ${o?`<span>💎 Giảm phí -${o}%</span>`:""}
      ${x?`<span>✨ Chất lượng +${x}%</span>`:""}
      ${u?`<span>⬆️ Nâng đôi ${u}%</span>`:""}
    </div>
    `:""}
  `;if(y==="recipes"){if(c+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!p.materials||Object.keys(p.materials).length===0)c+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[i,m]of Object.entries(p.materials))c+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(i)} <span style="color:var(--gold)">x${m}</span></div>`;c+="</div></div>",c+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',s.length===0?c+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':s.forEach(i=>{var S;const m=T(i.target),w=Math.min(100,(i.successRate||100)+b);let f="";(S=i.requirements)!=null&&S.skill&&(f=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(i.requirements.skill)} lv${i.requirements.level||1}</div>`);let k="";i.materials.forEach(C=>{var P;const H=((P=p.materials)==null?void 0:P[C.id])||0;k+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${H>=C.amount?"var(--green)":"var(--red)"};font-weight:bold">${H}/${C.amount}</span> ${g(C.id)}</span>`});const L=h.find(C=>C.id===i.target)||{};c+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${m}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${i.tier}</span>
                  <span>Tỉ lệ: <span style="color:${w>=80?"var(--green)":"var(--blue)"};font-weight:bold">${w}%</span></span>
                  <span>🔥 Phí: ${i.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${f}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${k}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${L.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${i.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),c+="</div></div>"}else c+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${r.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${r.map(i=>`<option value="${i.id}">${i.loc==="eq"?"🔸":"📦"} ${i.name||i.baseType} [${i.rarity||"?"}] ${(i.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(i=>{const m=Math.max(1,Math.round(i.cost*(1-o/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${i.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${i.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${i.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${i.id}" style="width:100%">
                💎 ${m} ${o>0?`<s style="opacity:0.4;font-size:10px">${i.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;n.innerHTML=c,n.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{e._alchemyTab=i.dataset.tab,U(n,t)})}),n.querySelectorAll(".accordion-header").forEach(i=>{i.addEventListener("click",()=>{const m=i.nextElementSibling;m.style.display==="none"?(m.style.display="block",i.querySelector(".text-dim:last-child").textContent="▲"):(m.style.display="none",i.querySelector(".text-dim:last-child").textContent="▼")})}),n.querySelectorAll(".btn-craft").forEach(i=>{i.addEventListener("click",async m=>{m.stopPropagation();const w=s.find(f=>f.id===i.dataset.recipe);if(w&&p.gold<(w.cost||0))return d("Không đủ linh thạch!","error");try{const f=await q.craftItem(p.id,i.dataset.recipe);e.player=f.player,d(f.message,f.success?"success":"error"),l()}catch(f){d(f.message,"error")}})}),n.querySelectorAll(".btn-currency").forEach(i=>{i.addEventListener("click",async()=>{const m=document.getElementById("selItem");if(!(m!=null&&m.value))return d("Chọn trang bị trước!","error");const w=i.dataset.cid;let f=-1;if(w==="thien_menh_phu"){const k=r.find(C=>C.id===m.value),L=(k==null?void 0:k.affixes)||[];if(L.length===0)return d("Item không có affix để khóa!","error");const S=prompt(`Chọn affix để khóa (0-${L.length-1}):
${L.map((C,H)=>`${H}: ${C.name||C.stat} +${C.value}`).join(`
`)}`);if(S===null)return;if(f=parseInt(S),isNaN(f)||f<0||f>=L.length)return d("Chỉ số không hợp lệ!","error")}i.disabled=!0,i.textContent="⏳...";try{const k=await q.applyCurrency(p.id,w,m.value,f);d(k.message,"success"),e.player=k.player,$(),U(n,t)}catch(k){d(k.message,"error"),i.disabled=!1,i.textContent="💎 Dùng"}})}),(a=document.getElementById("selItem"))==null||a.addEventListener("change",()=>{const i=r.find(w=>w.id===document.getElementById("selItem").value),m=document.getElementById("itemPreview");i&&m&&(m.innerHTML=(i.affixes||[]).map(w=>`<span style="color:var(--blue)">• ${w.name||w.stat} +${w.value}</span>`).join(" | ")||"Không có affix")}),(v=document.getElementById("selItem"))==null||v.dispatchEvent(new Event("change"))}function ot(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;async function s(){try{const y=await l.getDailyQuests(p);e._dailyQuests=y,h()}catch(y){d(y.message,"error")}}function h(){const y=e._dailyQuests||{},T=y.quests||[];y.allCompleted;const b=y.bonusReward;n.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${T.map(o=>{const x=o.quest_info||{},u=o.target>0?Math.min(100,Math.round(o.progress/o.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${o.claimed?"var(--text-dim)":o.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${x.name||o.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${x.difficulty==="Khó"?"var(--red)":x.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${x.difficulty||"?"}</span>
              </div>
              ${o.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':o.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${o.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${o.progress}/${o.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${x.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${u}%;background:${o.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${x.goldReward||0} · ✨ ${x.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${b?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${b.gold} 💎, +${b.xp} EXP</div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-claim").forEach(o=>o.addEventListener("click",async()=>{try{const x=await l.claimDailyQuest(p,parseInt(o.dataset.qid));d(x.message,"success"),e.player=x.player,$(),await s()}catch(x){d(x.message,"error")}}))}s()}function ct(n,t){const{state:e,api:l,notify:d,renderGame:$}=t,p=e._questTab||"npc";n.innerHTML=`
    <div class="page-header">
      <h2>📜 Thiên Cơ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ kỳ duyên NPC và nhiệm vụ nhật thường</p>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${p==="npc"?"active":""}" data-qtab="npc" style="flex:1;padding:10px;border:none;background:${p==="npc"?"rgba(255,255,255,0.08)":"transparent"};color:${p==="npc"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${p==="npc"?"700":"400"};border-bottom:2px solid ${p==="npc"?"var(--gold)":"transparent"};transition:all 0.2s">
        📜 Kỳ Duyên NPC
      </button>
      <button class="tab-btn ${p==="daily"?"active":""}" data-qtab="daily" style="flex:1;padding:10px;border:none;background:${p==="daily"?"rgba(255,255,255,0.08)":"transparent"};color:${p==="daily"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${p==="daily"?"700":"400"};border-bottom:2px solid ${p==="daily"?"var(--gold)":"transparent"};transition:all 0.2s">
        📋 Nhật Thường Hàng Ngày
      </button>
    </div>
    <div id="questTabContent">
      <div id="questList" class="quest-container">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,n.querySelectorAll("[data-qtab]").forEach(y=>{y.addEventListener("click",()=>{e._questTab=y.dataset.qtab,ct(n,t)})});const s=n.querySelector("#questTabContent");if(p==="daily"){ot(s,t);return}h();async function h(){try{const T=(await l.getQuests(e.playerId)).quests||[],b=document.getElementById("questList");if(!b)return;if(T.length===0){b.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}b.innerHTML=T.map(o=>{const x=o.questAmount>0?Math.min(100,o.progress/o.questAmount*100):0,u=o.progress>=o.questAmount,g=o.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${u?"quest-done":""}" data-quest-id="${o.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${o.npcIcon||"🧓"} ${o.npcName||"NPC"}</span>
              <span class="quest-type">${g} ${o.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${o.questName||o.quest_id}</div>
            <div class="quest-desc">${o.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${u?"hp":"energy"}" style="width:${x}%"></div>
              </div>
              <span class="quest-progress-text">${o.progress}/${o.questAmount}</span>
            </div>
            ${u?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${o.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),b.querySelectorAll(".quest-complete-btn").forEach(o=>{o.addEventListener("click",async()=>{const x=o.dataset.qid;o.disabled=!0,o.textContent="⏳...";try{const u=await l.completeQuest(e.playerId,x);e.player=u.player,d(u.message,"success"),u.skillGained&&d(`🎯 Lĩnh ngộ: ${u.skillGained}!`,"success"),$()}catch(u){d(u.message||"Lỗi trả quest","error"),o.disabled=!1,o.textContent="✅ Trả Nhiệm Vụ"}})})}catch(y){console.error("Error loading quests:",y);const T=document.getElementById("questList");T&&(T.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function It(n,t){const{state:e,api:l,notify:d,renderGame:$}=t;if(e.player.role!=="admin"){n.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const p=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let s="monsters";n.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${p.map(c=>`
          <button class="admin-tab ${c.id===s?"active":""}" data-tab="${c.id}">${c.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",c=>{const a=c.target.closest(".admin-tab");a&&(s=a.dataset.tab,document.querySelectorAll(".admin-tab").forEach(v=>v.classList.remove("active")),a.classList.add("active"),h(s))}),h(s);async function h(c){const a=document.getElementById("adminContent");if(a){a.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const v=await l.request(`/admin/${c}?adminId=${e.playerId}`);y(c,v,a)}catch(v){a.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${v.message}</div></div>`}}}function y(c,a,v){c==="monsters"?T(a,v):c==="npcs"?b(a,v):c==="areas"?o(a,v):x(c,a,v)}function T(c,a){const v=c.monsters||[];a.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${v.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${v.map(i=>{var m,w,f,k,L,S,C,H;return`
          <div class="admin-card" data-id="${i.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${i.name} ${i.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((w=(m=c.tierInfo)==null?void 0:m[i.tier])==null?void 0:w.color)||"#888"}">${((k=(f=c.tierInfo)==null?void 0:f[i.tier])==null?void 0:k.name)||"T"+i.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((L=i.stats)==null?void 0:L.hp)||"?"}</div>
              <div>💪 ${((S=i.stats)==null?void 0:S.strength)||"?"}</div>
              <div>🏃 ${((C=i.stats)==null?void 0:C.speed)||"?"}</div>
              <div>🛡 ${((H=i.stats)==null?void 0:H.defense)||"?"}</div>
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
    `,g(a,c,"monsters","monsters")}function b(c,a){const v=c.npcs||[];a.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${v.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${v.map(i=>`
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
    `,g(a,c,"npcs","npcs")}function o(c,a){const v=Object.keys(c);a.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${v.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${v.map(i=>{const m=c[i];return`
            <div class="admin-card" data-id="${i}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${m.name||i}</span>
                <span class="badge" style="background:var(--orange)">⚡${m.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(m.events||[]).map(w=>`<span>${w.type}: ${w.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${i}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,a.querySelectorAll(".admin-edit-area").forEach(i=>{i.addEventListener("click",()=>{const m=i.dataset.id,w=c[m];u(m,w,`areas/${m}`)})})}function x(c,a,v){var w;const i=JSON.stringify(a,null,2),m=i.split(`
`).length;v.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${c} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(m+5,30)}">${r(i)}</textarea>
    `,(w=document.getElementById("btnSaveGeneric"))==null||w.addEventListener("click",async()=>{try{const f=document.getElementById("genericEditor").value,k=JSON.parse(f);d("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(f){d("JSON không hợp lệ: "+f.message,"error")}})}function u(c,a,v,i){const m=JSON.stringify(a,null,2),w=document.createElement("div");w.className="admin-modal-overlay",w.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${c}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${r(m)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(w),w.querySelectorAll(".admin-modal-close").forEach(f=>{f.addEventListener("click",()=>w.remove())}),w.addEventListener("click",f=>{f.target===w&&w.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const f=document.getElementById("modalEditor").value,k=JSON.parse(f);await l.request(`/admin/${v}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:k})}),d("✅ Đã lưu!","success"),w.remove(),h(s)}catch(f){d("Lỗi: "+f.message,"error")}})}function g(c,a,v,i){c.querySelectorAll(".admin-edit-btn").forEach(m=>{m.addEventListener("click",()=>{const w=m.dataset.id,k=(a[i]||[]).find(L=>L.id===w);k&&u(w,k,`${v}/${w}`)})})}function r(c){return c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function pt(n,t){const{state:e,api:l,notify:d,renderGame:$,updateSidebar:p}=t,s=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const h=e._social;async function y(){try{const g=await l.getRelationships(s);h.relationships=g,h.loaded=!0,T()}catch(g){d(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function T(){const{friends:g,enemies:r,pendingSent:c,pendingReceived:a}=h.relationships,v=a.length;n.innerHTML=`
      <div class="page-header">
        <h2>🤝 Đạo Hữu</h2>
        <p class="page-sub">Kết bạn bè, đánh dấu kẻ thù, giao lưu giang hồ</p>
      </div>

      <!-- Search -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="socialSearch" placeholder="Tìm người chơi theo tên..." 
                 value="${h.searchQuery}" 
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSearch">🔍 Tìm</button>
        </div>
        ${h.searchResults.length>0?`
          <div style="margin-top:12px">
            ${h.searchResults.map(i=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${i.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${i.level} · ${i.realm} · ${i.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${i.id!==s?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${i.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${i.id}">⚔️ Kẻ Thù</button>
                  `:'<span style="opacity:0.4;font-size:12px">Bạn</span>'}
                </div>
              </div>
            `).join("")}
          </div>
        `:h.searchQuery?'<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>':""}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${h.tab==="friends"?"btn--blue":"btn--dark"}" data-tab="friends">
          🤝 Đạo Hữu (${g.length})
        </button>
        <button class="btn btn--sm ${h.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${r.length})
        </button>
        <button class="btn btn--sm ${h.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${v>0?`<span class="badge">${v}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${h.tab==="friends"?b(g):""}
        ${h.tab==="enemies"?o(r):""}
        ${h.tab==="pending"?x(a,c):""}
      </div>
    `,u()}function b(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(r=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${r.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${r.level} · ${r.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${r.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${r.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function o(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(r=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${r.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${r.level} · ${r.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${r.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${r.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function x(g,r){let c="";return g.length>0&&(c+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',c+=g.map(a=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${a.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${a.level} · ${a.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${a.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${a.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join("")),r.length>0&&(c+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',c+=r.map(a=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${a.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${a.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&r.length===0&&(c='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),c}function u(){var g,r;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var a;const c=(a=document.getElementById("socialSearch"))==null?void 0:a.value.trim();if(!c||c.length<2)return d("Cần ít nhất 2 ký tự","error");h.searchQuery=c;try{const v=await l.searchPlayers(c);h.searchResults=v.players||[],T()}catch(v){d(v.message,"error")}}),(r=document.getElementById("socialSearch"))==null||r.addEventListener("keydown",c=>{var a;c.key==="Enter"&&((a=document.getElementById("btnSearch"))==null||a.click())}),document.querySelectorAll("[data-tab]").forEach(c=>{c.addEventListener("click",()=>{h.tab=c.dataset.tab,T()})}),document.querySelectorAll("[data-action]").forEach(c=>{c.addEventListener("click",async()=>{const a=c.dataset.action,v=c.dataset.target;c.disabled=!0;try{let i;switch(a){case"add-friend":i=await l.addFriend(s,v);break;case"accept-friend":i=await l.acceptFriend(s,v);break;case"reject-friend":i=await l.rejectFriend(s,v);break;case"remove-friend":i=await l.removeFriend(s,v);break;case"add-enemy":i=await l.addEnemy(s,v);break;case"remove-enemy":i=await l.removeEnemy(s,v);break}d(i.message||"Thành công!","success"),await y()}catch(i){d(i.message||"Lỗi!","error"),c.disabled=!1}})})}h.loaded?T():y()}function gt(n,t){const{state:e,api:l,notify:d}=t,$=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const p=e._chat;async function s(){try{const[r,c]=await Promise.all([l.getGlobalChat(),l.getChatFriends($)]);p.globalMessages=r.messages||[],p.friends=c.friends||[],p.globalMessages.length>0&&(p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id),p.loaded=!0,T(),h()}catch(r){d(r.message||"Lỗi tải chat","error")}}function h(){y(),p.pollTimer=setInterval(async()=>{try{if(p.tab==="global"){const r=await l.getGlobalChat(p.lastGlobalId);r.messages&&r.messages.length>0&&(p.globalMessages.push(...r.messages),p.globalMessages.length>100&&(p.globalMessages=p.globalMessages.slice(-100)),p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id,o(),x())}else if(p.tab==="private"&&p.selectedFriend){const r=await l.getPrivateChat($,p.selectedFriend.id,p.lastPrivateId);r.messages&&r.messages.length>0&&(p.privateMessages.push(...r.messages),p.privateMessages.length>100&&(p.privateMessages=p.privateMessages.slice(-100)),p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id,o(),x())}}catch{}},5e3)}function y(){p.pollTimer&&(clearInterval(p.pollTimer),p.pollTimer=null)}function T(){const r=p.tab==="global"?p.globalMessages:p.privateMessages;n.innerHTML=`
      <div class="page-header">
        <h2>💬 Giang Hồ Truyền Âm</h2>
        <p class="page-sub">Giao lưu với các đạo hữu trong giang hồ</p>
      </div>

      <div class="chat-tabs" style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn btn--sm ${p.tab==="global"?"btn--blue":"btn--dark"}" data-chat-tab="global">🌍 Toàn Cầu</button>
        <button class="btn btn--sm ${p.tab==="private"?"btn--blue":"btn--dark"}" data-chat-tab="private">📨 Riêng</button>
        ${p.tab==="private"?`
          <select id="friendSelect" style="flex:1;padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
            <option value="">-- Chọn Đạo Hữu --</option>
            ${p.friends.map(c=>{var a;return`<option value="${c.id}" ${((a=p.selectedFriend)==null?void 0:a.id)===c.id?"selected":""}>${c.name} (Lv.${c.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${b(r)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${p.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),x()}function b(r){return r.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':r.map(c=>{const a=c.sender_id===$,v=new Date(c.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${a?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${v}</span>
          <span style="font-weight:600;color:${a?"var(--blue)":"var(--gold)"}"> ${c.sender_name}</span>
          <span style="opacity:0.8">: ${u(c.message)}</span>
        </div>
      `}).join("")}function o(){const r=document.getElementById("chatMessages");if(!r)return;const c=p.tab==="global"?p.globalMessages:p.privateMessages;r.innerHTML=b(c)}function x(){const r=document.getElementById("chatMessages");r&&(r.scrollTop=r.scrollHeight)}function u(r){const c=document.createElement("div");return c.textContent=r,c.innerHTML}function g(){var c,a,v;document.querySelectorAll("[data-chat-tab]").forEach(i=>{i.addEventListener("click",()=>{p.tab=i.dataset.chatTab,p.tab==="global"&&(p.lastGlobalId=p.globalMessages.length>0?p.globalMessages[p.globalMessages.length-1].id:0),T(),h()})}),(c=document.getElementById("friendSelect"))==null||c.addEventListener("change",async i=>{const m=i.target.value;if(!m){p.selectedFriend=null,p.privateMessages=[],T();return}p.selectedFriend=p.friends.find(w=>w.id===m)||null,p.lastPrivateId=0;try{const w=await l.getPrivateChat($,m);p.privateMessages=w.messages||[],p.privateMessages.length>0&&(p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id),o(),x()}catch(w){d(w.message,"error")}});const r=async()=>{var w,f;const i=document.getElementById("chatInput"),m=i==null?void 0:i.value.trim();if(m){if(p.tab==="private"&&!p.selectedFriend)return d("Chọn Đạo Hữu trước!","error");try{if(await l.sendChat($,p.tab,p.tab==="private"?p.selectedFriend.id:null,m),i.value="",p.tab==="global"){const k=await l.getGlobalChat(p.lastGlobalId);((w=k.messages)==null?void 0:w.length)>0&&(p.globalMessages.push(...k.messages),p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id)}else{const k=await l.getPrivateChat($,p.selectedFriend.id,p.lastPrivateId);((f=k.messages)==null?void 0:f.length)>0&&(p.privateMessages.push(...k.messages),p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id)}o(),x()}catch(k){d(k.message||"Lỗi gửi tin nhắn","error")}}};(a=document.getElementById("btnSend"))==null||a.addEventListener("click",r),(v=document.getElementById("chatInput"))==null||v.addEventListener("keydown",i=>{i.key==="Enter"&&r()})}t.renderGame,p.loaded?(T(),h()):s()}function ut(n,t){const{state:e,api:l,notify:d,updateSidebar:$,renderGame:p}=t,s=e.playerId,h=e._auctionTab||"browse";async function y(){try{const[o,x]=await Promise.all([l.getAuctions(),l.getMyAuctions(s)]);e._auctionListings=o.listings||[],e._auctionMine=x.listings||[],T()}catch(o){d(o.message,"error")}}function T(){const o=e._auctionListings||[],x=e._auctionMine||[],u=(e.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${h==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${h==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${h==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${x.length})</button>
      </div>

      ${h==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${o.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':o.map(g=>{const r=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${r.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${r.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${g.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${g.id}">💎 ${g.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:h==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${u.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${u.map(g=>`<option value="${g.id}">${g.name} [${g.rarity}]</option>`).join("")}
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
          ${x.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':x.map(g=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(g.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${g.status==="active"?"var(--green)":g.status==="sold"?"var(--gold)":"var(--red)"}">${g.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${g.buyout_price}</div>
                </div>
                ${g.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${g.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,b()}function b(){var o;n.querySelectorAll(".tab-btn").forEach(x=>x.addEventListener("click",()=>{e._auctionTab=x.dataset.tab,y()})),n.querySelectorAll(".btn-buy").forEach(x=>x.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const u=await l.buyAuction(s,parseInt(x.dataset.lid));d(u.message,"success"),e.player=u.player,$(),await y()}catch(u){d(u.message,"error")}})),n.querySelectorAll(".btn-cancel").forEach(x=>x.addEventListener("click",async()=>{try{const u=await l.cancelAuction(s,parseInt(x.dataset.lid));d(u.message,"success"),e.player=u.player,$(),await y()}catch(u){d(u.message,"error")}})),(o=document.getElementById("btnListItem"))==null||o.addEventListener("click",async()=>{var r,c,a;const x=(r=document.getElementById("selSellItem"))==null?void 0:r.value,u=parseInt(((c=document.getElementById("inpPrice"))==null?void 0:c.value)||"500"),g=parseInt(((a=document.getElementById("selDuration"))==null?void 0:a.value)||"24");try{const v=await l.listAuction(s,x,u,g);d(v.message,"success"),e.player=v.player,$(),e._auctionTab="mine",await y()}catch(v){d(v.message,"error")}})}y()}function Mt(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const s=e._market;async function h(){try{const[r,c]=await Promise.all([l.getMarketListings(s.filter,s.sort),l.getMyListings(p)]);s.listings=r.listings||[],s.myListings=c.listings||[],s.loaded=!0,T()}catch(r){d(r.message||"Lỗi tải Giao Dịch Đài","error")}}async function y(){try{const[r,c]=await Promise.all([l.getMugTargets(p),l.getMugLog(p)]);s.mugTargets=r.targets||[],s.mugCooldown=r.mugCooldown||0,s.mugLog=c.logs||[],T()}catch(r){d(r.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function T(){const r=e.player;if(n.innerHTML=`
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

      ${s.showListForm?u(r):""}

      ${s.tab==="browse"?b():s.tab==="my"?o():s.tab==="auction"?'<div id="auctionSubContent"></div>':x()}
    `,g(),s.tab==="auction"){const c=n.querySelector("#auctionSubContent");c&&ut(c,t)}}function b(){let r=`
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
    `,c=s.listings;if(s.search.trim()){const a=s.search.toLowerCase().trim();c=c.filter(v=>{var i;return v.item_name.toLowerCase().includes(a)?!0:(i=v.item_data)!=null&&i.affixes?v.item_data.affixes.some(m=>(m.stat||"").toLowerCase().includes(a)||(m.type||"").toLowerCase().includes(a)):!1})}return c.length===0?r+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(r+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',r+=c.map(a=>{var f,k;const v=a.item_type==="item"?"⚔️":a.item_type==="material"?"🧱":"💊",i=((f=a.item_data)==null?void 0:f.rarity)||"",m=a.seller_id===p,w=(k=a.item_data)!=null&&k.affixes?a.item_data.affixes.map(L=>`${L.stat} ${L.type==="flat"?"+":""}${L.value}${L.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${v}
                <span style="color:var(--gold)">${a.item_name}</span>
                ${a.quantity>1?`<span style="opacity:0.5"> x${a.quantity}</span>`:""}
                ${i?`<span class="rarity-${i}" style="font-size:11px;margin-left:4px">[${i}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${a.seller_name}</span>
                ${w?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${w}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${a.price}${a.quantity>1?"/cái":""}</span>
              ${m?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${a.id}" data-qty="${a.quantity}" data-price="${a.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),r+="</div></div>"),r}function o(){if(s.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let r='<div class="panel"><div class="panel-body no-pad">';return r+=s.myListings.map(c=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${c.item_type==="item"?"⚔️":c.item_type==="material"?"🧱":"💊"} ${c.item_name} ${c.quantity>1?`<span style="opacity:0.5">x${c.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${c.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${c.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),r+="</div></div>",r}function x(){let r=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${s.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${s.mugCooldown}s</div>`:""}
    `;return s.mugTargets.length===0?r+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':r+=s.mugTargets.map(c=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${c.gender==="female"?"♀":"♂"} ${c.name}</div>
            <div class="item-meta">Lv.${c.level} · ${c.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${c.id}" ${s.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),r+="</div></div>",s.mugLog.length>0&&(r+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${s.mugLog.map(c=>{const a=c.attacker_id===p,v=c.outcome==="success"?"✅":"❌",i=c.outcome==="success"?"var(--green)":"var(--red)",m=a?c.outcome==="success"?`Cướp ${c.victim_name}: +${c.gold_stolen} 💎`:`Phục kích ${c.victim_name} thất bại!`:c.outcome==="success"?`Bị ${c.attacker_name} cướp: -${c.gold_stolen} 💎`:`${c.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${i}">${v} ${m} <span style="opacity:0.4;margin-left:auto">${new Date(c.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),r}function u(r){const c=Object.entries(r.materials||{}).map(([m,w])=>({id:m,qty:w,type:"material",name:m})),a=Object.entries(r.medicines||{}).map(([m,w])=>({id:m,qty:w,type:"medicine",name:m})),v=(r.inventory||[]).map(m=>({id:m.id,qty:1,type:"item",name:m.name||m.id})),i=[...c,...a,...v];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${i.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${i.map(m=>`<option value="${m.type}|${m.id}">${m.type==="item"?"⚔️":m.type==="material"?"🧱":"💊"} ${m.name} ${m.qty>1?`(có: ${m.qty})`:""}</option>`).join("")}
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
    `}function g(){var r,c,a,v;document.querySelectorAll("[data-mtab]").forEach(i=>{i.addEventListener("click",()=>{if(s.tab=i.dataset.mtab,s.tab==="mug"&&s.mugTargets.length===0){y();return}T()})}),(r=document.getElementById("btnShowList"))==null||r.addEventListener("click",()=>{s.showListForm=!s.showListForm,T()}),document.querySelectorAll("[data-filter]").forEach(i=>{i.addEventListener("click",async()=>{s.filter=i.dataset.filter,await h()})}),(c=document.getElementById("sortSelect"))==null||c.addEventListener("change",async i=>{s.sort=i.target.value,await h()}),(a=document.getElementById("searchInput"))==null||a.addEventListener("input",i=>{s.search=i.target.value,T();const m=document.getElementById("searchInput");m&&(m.focus(),m.setSelectionRange(s.search.length,s.search.length))}),(v=document.getElementById("btnConfirmList"))==null||v.addEventListener("click",async()=>{var L,S,C;const i=(L=document.getElementById("listItem"))==null?void 0:L.value;if(!i)return;const[m,w]=i.split("|"),f=parseInt((S=document.getElementById("listQty"))==null?void 0:S.value)||1,k=parseInt((C=document.getElementById("listPrice"))==null?void 0:C.value)||0;if(k<=0)return d("Giá phải lớn hơn 0!","error");try{const H=await l.listForSale(p,m,w,f,k);d(H.message,"success"),e.player=H.player,$(),s.showListForm=!1,await h()}catch(H){d(H.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(i=>{i.addEventListener("click",async()=>{const m=parseInt(i.dataset.buy),w=parseInt(i.dataset.qty),f=parseInt(i.dataset.price);let k=1;if(w>1){const L=prompt(`Mua bao nhiêu? (tối đa ${w}, giá ${f} 💎/cái)`,"1");if(!L)return;k=Math.min(parseInt(L)||1,w)}i.disabled=!0;try{const L=await l.buyFromMarket(p,m,k);d(L.message,"success"),e.player=L.player,$(),await h()}catch(L){d(L.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(i=>{i.addEventListener("click",async()=>{i.disabled=!0;try{const m=await l.cancelListing(p,parseInt(i.dataset.cancel));d(m.message,"success"),e.player=m.player,$(),await h()}catch(m){d(m.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(i=>{i.addEventListener("click",async()=>{const m=i.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){i.disabled=!0,i.textContent="⏳...";try{const w=await l.mugPlayer(p,m);d(w.message,w.success?"success":"error"),e.player=w.player,$(),await y()}catch(w){d(w.message,"error"),i.disabled=!1,i.textContent="💀 Phục Kích"}}})})}s.tab==="mug"?y():s.loaded?T():h()}function Nt(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;let s=!1,h=null;async function y(){try{h=await l.getRealmInfo(p),s=!0,T()}catch(x){d(x.message||"Lỗi tải Cảnh Giới","error")}}function T(){if(!h)return;const x=h.current,u=h.allRealms||[],g=e.player,r=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;n.innerHTML=`
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${x.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${x.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${x.color}">${x.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Cảnh Giới Bậc ${x.tier} · ${x.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${g.level} — ${g.xp}/${g.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${r}%;background:${x.color}"></div></div>
        </div>

        ${x.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(x.bonuses).filter(([,c])=>c>0).map(([c,a])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${a} ${c}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${x.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${x.unlocks.map(c=>`<span style="font-size:12px;opacity:0.7">✅ ${c}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${x.canBreakthrough?b(x):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${u.map(c=>{const a=c.tier===x.tier,v=c.tier<x.tier,m=c.tier>x.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${a?`2px solid ${c.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${m};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${c.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${c.color}">${c.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${c.levelMin}+</span>
                ${c.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${c.failChance}% thất bại</span>`:""}
                ${v?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${a?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,o()}function b(x){const u=x.nextRealm;if(!u)return"";const g=u.cost?`💎 ${u.cost.gold} + 🔮 ${u.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${u.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${u.name} ${u.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${g}</div>
          ${u.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${u.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(u.bonuses).filter(([,r])=>r>0).map(([r,c])=>`+${c} ${r}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${u.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function o(){var x;(x=document.getElementById("btnBreakthrough"))==null||x.addEventListener("click",async()=>{const u=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){u.disabled=!0,u.textContent="⏳ Đang đột phá...";try{const g=await l.attemptBreakthrough(p);g.success?(d(g.message,"success"),e.player=g.player,$(),await y()):(d(g.message,"error"),g.player&&(e.player=g.player,$()),await y())}catch(g){d(g.message||"Lỗi đột phá","error"),u.disabled=!1,u.textContent="⚡ ĐỘT PHÁ"}}})}y()}function qt(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t;Bt(n,t)}async function Bt(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t;n.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const s=(await l.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,$()),s.length===0){n.innerHTML=`
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
            ${s.map(h=>{const y=new Date(h.created_at*1e3),T=y.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),b=y.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let o="📌";return o={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[h.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${T}</div>
                    <div>${b}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${o}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${h.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${h.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(p){n.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${p.message}</div></div>`}}function _t(n,t){const{state:e,api:l,notify:d,updateSidebar:$,renderGame:p}=t,s=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const h=e._housing;async function y(){try{const u=await l.getHousing(s);h.data=u,h.loaded=!0,T()}catch(u){d(u.message||"Lỗi tải Động Phủ","error")}}function T(){const u=h.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${u.owned?o(u):b(u)}
    `,x()}function b(u){const g=u.tiers[1];return`
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
    `}function o(u){const g=u.gardenSlots||[],r=u.gardenHerbs||{};return`
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
            ${Array.from({length:u.maxSlots},(c,a)=>{const v=g[a]||{},i=!!v.herb,m=v.ready,w=v.remaining||0,f=Math.ceil(w/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${m?"var(--green)":i?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${i?`
                    <div style="font-size:20px">${m?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${v.herbName||v.herb}</div>
                    <div style="font-size:10px;color:${m?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${m?"✅ Sẵn sàng!":"⏳ "+f+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${a}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
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
            ${Object.entries(u.formations).map(([c,a])=>{const v=a.currentLevel>=a.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${a.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${a.icon}</span>
                      <strong style="margin-left:4px">${a.name}</strong>
                      ${a.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${a.currentLevel}</span>`:""}
                    </div>
                    ${a.canBuild?v?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${c}">
                        ⬆ ${a.nextCost} 💎
                      </button>`:`<span style="font-size:10px;color:var(--red)">T${a.requiredTier}+</span>`}
                  </div>
                  <div style="font-size:11px;opacity:0.5;margin-top:4px">${a.description}</div>
                  ${a.currentLevel>0?`<div style="font-size:10px;color:var(--orange);margin-top:2px">Phí: ${a.nextDailyCost||(a.dailyCosts?a.dailyCosts[a.currentLevel-1]:"?")}/ngày</div>`:""}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `}function x(){var u,g,r,c;(u=document.getElementById("btnBuyHouse"))==null||u.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const a=await l.buyHousing(s);d(a.message,"success"),e.player=a.player,$(),await y()}catch(a){d(a.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const a=await l.buyHousing(s);d(a.message,"success"),e.player=a.player,$(),await y()}catch(a){d(a.message,"error")}}),document.querySelectorAll(".plant-select").forEach(a=>{a.addEventListener("change",async v=>{const i=v.target.value;if(!i)return;const m=parseInt(a.dataset.slot);try{const w=await l.plantHerb(s,i,m);d(w.message,"success"),await y()}catch(w){d(w.message,"error")}})}),(r=document.getElementById("btnHarvest"))==null||r.addEventListener("click",async()=>{try{const a=await l.harvestGarden(s);d(a.message,"success"),e.player=a.player,$(),await y()}catch(a){d(a.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(a=>{a.addEventListener("click",async()=>{const v=a.dataset.fid;a.disabled=!0,a.textContent="⏳...";try{const i=await l.upgradeFormation(s,v);d(i.message,"success"),e.player=i.player,$(),await y()}catch(i){d(i.message,"error"),a.disabled=!1,a.textContent="⬆ Nâng"}})}),(c=document.getElementById("btnMaintenance"))==null||c.addEventListener("click",async()=>{try{const a=await l.payMaintenance(s);d(a.message,"success"),e.player=a.player,$(),await y()}catch(a){d(a.message,"error")}})}h.loaded?T():y()}function zt(n,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function l(){n.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","skills","explore","tower","dungeon","housing","talent","alchemy","crime","market","tips"].map($=>`
          <button class="btn btn--sm ${e._wikiTab===$?"btn--gold":"btn--dark"}" data-tab="${$}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",skills:"⚡ Kỹ Năng",explore:"🗺️ Khám Phá",tower:"🗼 Thiên Phần Tháp",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",crime:"🔪 Phạm Tội",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[$]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${d(e._wikiTab)}
        </div>
      </div>
    `,n.querySelectorAll("[data-tab]").forEach($=>{$.addEventListener("click",()=>{e._wikiTab=$.dataset.tab,l()})})}function d($){return{lore:`
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
      `}[$]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}l()}function Ot(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const s=e._npcShop;let h=parseInt(localStorage.getItem("npcShopIdx")||"0");async function y(){try{n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const o=await l.getShops(p);s.shops=o.shops||[],s.tax=o.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},s.loaded=!0,h>=s.shops.length&&(h=0),T()}catch(o){d(o.message||"Lỗi tải shop","error")}}function T(){var c;if(s.shops.length===0){n.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const o=s.shops[h]||s.shops[0],x=s.shops.map((a,v)=>`
      <button class="skill-tab ${v===h?"active":""}" data-shop-idx="${v}">
        ${a.icon||"🧓"} ${a.name}
      </button>
    `).join(""),u={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},g={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},r=(o.items||[]).map(a=>{var f,k;const v=u[a.rarity||"common"]||"#888",i=g[a.rarity||"common"]||"Phàm",m=(a.remainingStock??1)<=0,w=(((f=e.player)==null?void 0:f.gold)??0)>=(a.currentPrice||0);return`
        <div class="shop-item-card ${m?"out-of-stock":""}" style="border-left:3px solid ${v}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${v}">${a.name}</div>
              <div class="shop-item-rarity" style="color:${v}">${i} · Tầng ${a.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${m?"var(--red)":"var(--green)"}">
                ${m?"❌ Hết hàng":`📦 ${a.remainingStock}/${a.dailyStock}`}
              </span>
            </div>
          </div>
          ${a.description?`<div class="shop-item-desc">${a.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${w?"":"too-expensive"}">
              💎 ${((k=a.currentPrice)==null?void 0:k.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${o.id}" data-item="${a.id}" 
                value="1" min="1" max="${a.remainingStock||1}" 
                ${m?"disabled":""}>
              <button class="btn btn--sm ${m?"":w?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${o.id}" data-item="${a.id}"
                ${m||!w?"disabled":""}>
                ${m?"❌":w?"🛒 Mua":"💸 Thiếu"}
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
        <div class="shop-info-tag">💎 ${(((c=e.player)==null?void 0:c.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${o.area||"Không rõ"}</div>
      </div>

      ${s.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${x}</div>`:""}

      <div class="shop-items-grid">
        ${r||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,b()}function b(){n.querySelectorAll(".skill-tab[data-shop-idx]").forEach(o=>{o.addEventListener("click",()=>{h=parseInt(o.dataset.shopIdx),localStorage.setItem("npcShopIdx",h),T()})}),n.querySelectorAll(".btn-buy").forEach(o=>{o.addEventListener("click",async()=>{const x=o.dataset.shop,u=o.dataset.item,g=n.querySelector(`.buy-qty[data-shop="${x}"][data-item="${u}"]`),r=parseInt((g==null?void 0:g.value)||1);o.disabled=!0,o.textContent="⏳...";try{const c=await l.buyFromShop(p,x,u,r);d(c.message,"success"),e.player=c.player,$(),await y()}catch(c){d(c.message,"error"),o.disabled=!1,o.textContent="🛒 Mua"}})})}s.loaded?T():y()}function Rt(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const s=e._guild;async function h(){try{s.data=await l.getMyGuild(p),s.loaded=!0,T()}catch(u){d(u.message||"Lỗi","error")}}async function y(){try{const u=await l.listGuilds();s.allGuilds=u.guilds||[],T()}catch(u){d(u.message,"error")}}function T(){const u=s.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${u!=null&&u.inGuild?o(u):b(u)}
    `,x()}function b(u){return`
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
          ${s.allGuilds?s.allGuilds.map(g=>`
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
    `}function o(u){var a;const g=u.guild,r=u.members||[],c=u.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${g.tag}] ${g.name} <span style="opacity:0.3">Lv${g.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((a=g.levelInfo)==null?void 0:a.name)||""} · ${g.memberCount}/${g.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${g.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${g.dailyUpkeep}/ngày</span>
              ${g.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(g.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(g.buffs).map(([v,i])=>`${v} +${i}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${u.myRole==="leader"&&g.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${g.nextLevel.name}">⬆ ${g.nextLevel.upgradeCost} 💎</button>`:""}
            ${u.myRole==="leader"&&g.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            ${c.slice(0,10).map(v=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(v.created_at).toLocaleString("vi")}</span>
                ${v.detail||v.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${r.length}/${g.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${r.map(v=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${v.role==="leader"?"👑":v.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${v.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${v.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${u.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function x(){var u,g,r,c,a,v;(u=document.getElementById("btnCreate"))==null||u.addEventListener("click",async()=>{var f,k,L,S,C,H;const i=(k=(f=document.getElementById("guildName"))==null?void 0:f.value)==null?void 0:k.trim(),m=(S=(L=document.getElementById("guildTag"))==null?void 0:L.value)==null?void 0:S.trim(),w=(H=(C=document.getElementById("guildDesc"))==null?void 0:C.value)==null?void 0:H.trim();if(!i||!m)return d("Nhập tên và tag!","error");try{const P=await l.createGuild(p,i,m,w);d(P.message,"success"),e.player=P.player,$(),s.loaded=!1,await h()}catch(P){d(P.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",y),document.querySelectorAll(".btn-join").forEach(i=>{i.addEventListener("click",async()=>{try{const m=await l.joinGuild(p,parseInt(i.dataset.gid));d(m.message,"success"),s.loaded=!1,await h()}catch(m){d(m.message,"error")}})}),(r=document.getElementById("btnContribute"))==null||r.addEventListener("click",async()=>{var m;const i=parseInt(((m=document.getElementById("contributeAmt"))==null?void 0:m.value)||0);if(!(i<=0))try{const w=await l.contributeGuild(p,i);d(w.message,"success"),e.player=w.player,$(),await h()}catch(w){d(w.message,"error")}}),(c=document.getElementById("btnUpgradeGuild"))==null||c.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const i=await l.upgradeGuild(p);d(i.message,"success"),await h()}catch(i){d(i.message,"error")}}),(a=document.getElementById("btnPayUpkeep"))==null||a.addEventListener("click",async()=>{try{const i=await l.payGuildUpkeep(s.data.guild.id);d(i.message,"success"),await h()}catch(i){d(i.message,"error")}}),(v=document.getElementById("btnLeave"))==null||v.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const i=await l.leaveGuild(p);d(i.message,"success"),s.loaded=!1,await h()}catch(i){d(i.message,"error")}})}s.loaded?T():h()}function At(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const s=e._profile;function h(){n.innerHTML=`
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
          ${s.results.map(o=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" data-view="${o.id}">
              <div style="flex:1">
                <div style="font-weight:600">${o.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${o.level} · Realm T${o.realm_tier||"?"}</div>
              </div>
              <button class="btn btn--sm btn--dark btn-view" data-vid="${o.id}">👁 Xem</button>
            </div>
          `).join("")}
        </div>
      </div>
      `:!s.viewing&&s.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,T()}function y(o){var r,c,a;const x=o.id===p,u=o.maxHp>0?Math.round(o.currentHp/o.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((r=o.name[0])==null?void 0:r.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${o.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${o.level} · ${((c=o.realmInfo)==null?void 0:c.fullName)||"Phàm Nhân"}
                ${o.guild?` · <span style="color:var(--blue)">[${o.guild.tag}] ${o.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${g[o.currentArea]||o.currentArea}
                ${o.housingTier>0?` · 🏠 T${o.housingTier}`:""}
                · 📜 ${o.skills} kỹ năng · ⚔ ${o.items} vật phẩm
              </div>
            </div>
          </div>

          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ Khí Huyết</span><span>${o.currentHp}/${o.maxHp}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${u}%;background:${u>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">💪 STR</div>
              <div style="font-weight:700;color:var(--red)">${o.stats.strength}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">⚡ SPD</div>
              <div style="font-weight:700;color:var(--blue)">${o.stats.speed}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🎯 DEX</div>
              <div style="font-weight:700;color:var(--orange)">${o.stats.dexterity}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🛡 DEF</div>
              <div style="font-weight:700;color:var(--green)">${o.stats.defense}</div>
            </div>
          </div>

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(a=o.gold)==null?void 0:a.toLocaleString()} 💎</strong></div>

          ${x?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${o.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${o.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function T(){var o,x,u,g,r;(o=document.getElementById("btnSearch"))==null||o.addEventListener("click",b),(x=document.getElementById("searchInput"))==null||x.addEventListener("keydown",c=>{c.key==="Enter"&&b()}),document.querySelectorAll(".btn-view, [data-view]").forEach(c=>{c.addEventListener("click",async()=>{const a=c.dataset.vid||c.dataset.view;try{const v=await l.getPlayerProfile(a);s.viewing=v.profile,h()}catch(v){d(v.message,"error")}})}),(u=document.getElementById("btnAttack"))==null||u.addEventListener("click",async()=>{const c=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${s.viewing.name}?`))try{const a=await l.mugPlayer(p,c);d(a.message,a.won?"success":"error"),a.player&&(e.player=a.player,$())}catch(a){d(a.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const c=document.getElementById("btnAddFriend").dataset.tid;try{const a=await l.addFriend(p,c);d(a.message||"Đã gửi lời mời!","success")}catch(a){d(a.message,"error")}}),(r=document.getElementById("btnBackSearch"))==null||r.addEventListener("click",()=>{s.viewing=null,h()})}async function b(){var u;const o=document.getElementById("searchInput"),x=(u=o==null?void 0:o.value)==null?void 0:u.trim();if(!x||x.length<2)return d("Nhập ít nhất 2 ký tự!","error");s.searchQuery=x,s.viewing=null;try{const g=await l.searchPlayers(x);s.results=g.players||[],h()}catch(g){d(g.message,"error")}}h()}function jt(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const s=e._arena;async function h(){try{s.data=await l.getArena(p),s.loaded=!0,y()}catch(b){d(b.message,"error")}}function y(){var c,a,v,i,m,w,f,k;const b=s.data,o=(b==null?void 0:b.arena)||{},x=o.rank||{},u=parseInt(o.streak)||0,g=u>=5?`🔥x${u}`:u>=3?`⚡x${u}`:u>0?`${u}W`:u<0?`${Math.abs(u)}L`:"",r=u>=5?"var(--gold)":u>=3?"var(--orange)":u>0?"var(--green)":u<0?"var(--red)":"var(--text-dim)";n.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid ${x.color||"#666"}">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px;text-shadow:0 0 12px ${x.color||"#666"}">${x.icon||"🛡️"}</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Rank</div>
            <div style="font-weight:800;font-size:18px;color:${x.color||"#fff"}">${x.name||"Chưa xếp hạng"}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px">
              ELO: <strong>${o.rating||1e3}</strong> · ${o.wins||0}W/${o.losses||0}L
              ${g?` · <span style="color:${r};font-weight:700">${g}</span>`:""}
            </div>
            ${x.nextThreshold?`
              <div style="margin-top:6px">
                <div style="font-size:10px;opacity:0.4">Tiến trình → ${x.nextThreshold} ELO</div>
                <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:3px;overflow:hidden">
                  <div style="background:${x.color||"#666"};height:100%;width:${x.progress||0}%;border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            `:'<div style="font-size:10px;opacity:0.4;margin-top:4px">🏆 Đỉnh cao! Thiên Đạo Đệ Nhất!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${(c=s.lastResult)!=null&&c.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(a=s.lastResult.newRank)==null?void 0:a.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(v=s.lastResult.newRank)==null?void 0:v.name}!</div>
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
            Đối thủ: <strong>${(i=s.lastResult.opponent)==null?void 0:i.name}</strong> 
            ${(m=s.lastResult.opponent)!=null&&m.rank?s.lastResult.opponent.rank.icon:""} 
            (ELO ${(w=s.lastResult.opponent)==null?void 0:w.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${s.lastResult.ratingChange>0?"+":""}${s.lastResult.ratingChange}
            ${s.lastResult.goldEarned>0?` · +${s.lastResult.goldEarned} 💎`:""}
          </div>
          ${(f=s.lastResult.combatLog)!=null&&f.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${s.lastResult.combatLog.map(L=>`<div>${L}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(b.opponents||[]).length>0?(b.opponents||[]).map(L=>{var S,C,H;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((S=L.rank)==null?void 0:S.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${L.name} <span style="opacity:0.4;font-size:11px">Lv.${L.level}</span></div>
                <div style="font-size:11px;color:${((C=L.rank)==null?void 0:C.color)||"#888"}">${((H=L.rank)==null?void 0:H.name)||"Đồng"} · ELO ${L.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${L.player_id}" ${s.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${s.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${b.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(b.top10||[]).map((L,S)=>{var C,H;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${S<3?"var(--gold)":"var(--text-dim)"}">#${S+1}</span>
                <span>${((C=L.rank)==null?void 0:C.icon)||""}</span>
                <span style="flex:1">${L.name}</span>
                <span style="color:${((H=L.rank)==null?void 0:H.color)||"var(--blue)"}; font-weight:600">${L.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(b.history||[]).map(L=>{const S=L.winner_id===p;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${S?"var(--green)":"var(--red)"}">
                  ${S?"✅":"❌"} vs ${L.attacker_id===p?L.defender_name:L.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${L.rating_change>0?"+":""}${L.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll(".btn-fight-opp").forEach(L=>{L.addEventListener("click",S=>T(S.target.dataset.oid))}),(k=document.getElementById("btnRandomFight"))==null||k.addEventListener("click",()=>T(null))}async function T(b){s.fighting=!0,y();try{const o=await l.request(`/player/${p}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:b})});s.lastResult=o,e.player=o.player,$(),d(o.message,o.won?"success":"error"),s.fighting=!1,await h()}catch(o){d(o.message,"error"),s.fighting=!1,y()}}s.loaded?y():h()}function Gt(n,t){const{state:e,api:l,notify:d,updateSidebar:$}=t,p=e.playerId;async function s(){try{e._worldBoss=await l.getWorldBoss(),h()}catch(y){d(y.message,"error")}}function h(){var g;const y=e._worldBoss||{},T=y.boss||{},b=y.hpPercent||0,o=y.topContributors||[],x=y.rewards||{},u=T.status==="active"&&T.current_hp>0;n.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${u?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${T.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${T.level||"?"} · ${u?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(T.current_hp||0).toLocaleString()} / ${(T.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${b}%;background:${b>50?"var(--red)":b>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${u?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${x.gold||0} · ✨ ${x.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${o.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':o.map((r,c)=>{var a;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
                <span style="flex:1">${r.name}</span>
                <span style="color:var(--red)">${(a=r.total_damage)==null?void 0:a.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${r.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const r=document.getElementById("btnAttackBoss");r.disabled=!0,r.textContent="⏳ Đang giao chiến...";const c=document.getElementById("bossCombatResult");try{const a=await l.attackWorldBoss(p);if(e.player=a.player,$(),a.log&&a.log.length>0){const v=a.log.map(f=>f.startsWith("---")?`<div class="turn">${f}</div>`:f.includes("hụt")?`<div class="miss">${f}</div>`:f.includes("né được")?`<div class="dodge">${f}</div>`:f.includes("CHÍNH MẠNG")||f.includes("💥")?`<div class="crit">${f}</div>`:f.includes("🔥")?`<div class="heavy text-orange">${f}</div>`:f.includes("chặn hoàn toàn")||f.includes("🛡")?`<div class="dodge">${f}</div>`:f.includes("ngã xuống")||f.includes("💀")?`<div class="death">${f}</div>`:f.includes("Chiến thắng")||f.includes("🏆")?`<div class="victory">${f}</div>`:f.includes("bỏ chạy")||f.includes("🏃")?`<div class="flee">${f}</div>`:f.includes("Bất phân")||f.includes("🤝")?`<div class="stalemate">${f}</div>`:f.includes("🧪")?`<div class="status-effect text-purple">${f}</div>`:f.includes("💔")?`<div class="dot-damage text-purple bold">${f}</div>`:f.includes("✨")?`<div class="regen text-green">${f}</div>`:`<div class="hit">${f}</div>`).join(""),i={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},m=i[a.outcome]||i.loss,w=Math.max(0,e.player.currentHp/e.player.maxHp*100);c.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${m.icon} ${m.text}
                <span class="subtitle">${a.turns}/${a.maxTurns||25} lượt · ⚔️ ${a.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${m.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${w}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${T.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(a.bossHp/a.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${a.bossHp.toLocaleString()}/${a.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${v}</div>
            </div>`}a.defeated?d(a.message,"success"):d(`⚔️ ${a.damage} dmg!`,"info"),await s()}catch(a){d(a.message,"error"),r.disabled=!1,r.textContent="⚔️ Tấn Công"}})}s()}function Kt(n,t){const{state:e,api:l,notify:d,updateSidebar:$,renderGame:p}=t,s=e.playerId,h={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function y(){var b;try{const[o,x]=await Promise.all([l.getGachaPools(),l.getGachaPity(s)]);e._gacha={pools:o.pools||{},pity:x.pity||{},results:((b=e._gacha)==null?void 0:b.results)||[]},T()}catch(o){d(o.message,"error")}}function T(){const b=e._gacha||{},o=b.pools||{},x=b.pity||{},u=b.results||[];n.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(o).map(([g,r])=>{var a,v,i;const c=x[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${r.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${h.legendary}">★ ${(a=r.rates)==null?void 0:a.legendary}%</span> ·
                <span style="color:${h.rare}">◆ ${(v=r.rates)==null?void 0:v.rare}%</span> ·
                <span style="color:${h.uncommon}">● ${(i=r.rates)==null?void 0:i.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${c.pulls_since_rare||0}/${r.pityRare} · Legend: ${c.pulls_since_legendary||0}/${r.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="1">💎 ${r.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="10">💎 ${r.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${u.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${u.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${u.map(g=>{var r,c,a,v;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${h[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((r=g.item)==null?void 0:r.slot)==="weapon"?"⚔️":((c=g.item)==null?void 0:c.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${h[g.rarity]}">${((a=g.item)==null?void 0:a.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((v=g.item)==null?void 0:v.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const r=g.dataset.pool,c=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const a=await l.gachaPull(e.playerId,r,c);d(a.message,"success"),e.player=a.player,$(),e._gacha.results=a.results||[],e._gacha.pity[r]=a.pity,T()}catch(a){d(a.message,"error"),g.disabled=!1}}))}y()}function Dt(n,t){const{state:e,api:l,notify:d}=t;e._lbTab||(e._lbTab="level");async function $(){const s=e._lbTab||"level";n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const h=await l.getLeaderboard(s);e._lbData=h,p()}catch(h){n.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${h.message}
      </div></div>`}}function p(){const s=e._lbTab||"level",y=(e._lbData||{}).rankings||[],b=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(x=>`
      <button class="skill-tab ${s===x.id?"active":""}" data-tab="${x.id}">
        ${x.icon} ${x.name}
      </button>
    `).join("");let o="";y.length===0?o='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':s==="guild"?o=y.map((x,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${x.tag}] ${x.name}</div>
            <div class="lb-sub">👤 ${x.members}/${x.max_members} · Leader: ${x.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(x.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${x.level}</div>
          </div>
        </div>
      `).join(""):s==="pvp"?o=y.map((x,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${x.name}</div>
            <div class="lb-sub">Lv.${x.level} · ${x.wins||0}W/${x.losses||0}L${x.streak>0?` · 🔥${x.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${x.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):o=y.map((x,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${x.name}</div>
            <div class="lb-sub">${x.realm_tier?`Cảnh giới ${x.realm_tier}`:""} ${s==="level"?`· Lv.${x.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${s==="gold"?`💎 ${parseInt(x.gold||0).toLocaleString()}`:`Lv.${x.level}`}
            </div>
          </div>
        </div>
      `).join(""),n.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${b}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${o}
        </div>
      </div>
    `,n.querySelectorAll(".skill-tab[data-tab]").forEach(x=>{x.addEventListener("click",()=>{e._lbTab=x.dataset.tab,$()})})}$()}const E={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},vt=document.getElementById("app"),Q={get state(){return E},api:q,notify:R,renderGame:B,updateSidebar:Wt};async function Vt(){const n=localStorage.getItem("playerId");if(n&&!E.playerId)try{const t=await q.getPlayer(n);E.playerId=n,E.player=t.player,await K(),B();return}catch{localStorage.removeItem("playerId")}if(!E.playerId)try{const t=await q.login("admin","admin");E.playerId=t.id,E.player=t.player,localStorage.setItem("playerId",t.id),await K(),B();return}catch(t){console.warn("Dev auto-login failed. Fallback to intro UI.",t)}E.playerId?B():ht()}function ht(){var t,e;const n=E.authTab||"login";vt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(l=>{l.addEventListener("click",()=>{E.authTab=l.dataset.auth,ht()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const l=document.getElementById("inpUsername").value.trim(),d=document.getElementById("inpPassword").value;if(!l||!d)return R("Vui lòng nhập đầy đủ","error");try{const $=await q.login(l,d);E.playerId=$.id,E.player=$.player,localStorage.setItem("playerId",$.id),R($.message,"success"),await K(),B()}catch($){R($.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var s,h;const l=document.getElementById("inpUsername").value.trim(),d=document.getElementById("inpPassword").value,$=((s=document.getElementById("inpName"))==null?void 0:s.value.trim())||"Vô Danh",p=((h=document.querySelector('input[name="gender"]:checked'))==null?void 0:h.value)||"male";if(!l||!d)return R("Vui lòng nhập đầy đủ","error");try{const y=await q.register(l,d,$,p);E.playerId=y.id,E.player=y.player,localStorage.setItem("playerId",y.id),R(y.message,"success"),await K(),B()}catch(y){R(y.message||"Đăng ký thất bại!","error")}})}function mt(n){const t=Math.floor(Date.now()/1e3),e=[];return n.hospitalUntil&&n.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:n.hospitalUntil,color:"var(--red)"}),n.medCooldownUntil&&n.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:n.medCooldownUntil,color:"var(--orange)"}),n.jailUntil&&n.jailUntil>t&&e.push({icon:"⛓️",label:"Ngục tù",endTime:n.jailUntil,color:"var(--purple)"}),n.travelArrivesAt&&n.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:n.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(l=>{const d=Math.max(0,l.endTime-t),$=Math.floor(d/60),p=d%60,s=$>0?`${$}p${String(p).padStart(2,"0")}s`:`${p}s`;return`<span class="status-icon" data-end="${l.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${l.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${l.color};white-space:nowrap;
      " title="${l.label}">${l.icon} <span class="cd-time">${s}</span></span>`}).join("")}
  </div>`}let V=null;function Ft(){V&&clearInterval(V),V=setInterval(()=>{const n=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),l=Math.max(0,e-n);if(l<=0){t.remove();return}const d=Math.floor(l/60),$=l%60,p=t.querySelector(".cd-time");p&&(p.textContent=d>0?`${d}p${String($).padStart(2,"0")}s`:`${$}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function yt(n){let t="";const l={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[n.currentArea];return l&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${l.tooltip}">${l.icon} Cảnh Vực</span>`),n.combatBuffs&&n.combatBuffs.length>0&&n.combatBuffs.forEach(d=>{let $="💊",p="Buff";d.type==="status"&&d.stat==="poison"?($="☠️",p="Trúng Độc"):d.type==="status"&&d.stat==="confuse"?($="👹",p="Ma Hóa"):d.stat==="allStats"||d.stat==="hp"||d.stat==="damage"?($="🔥",p="Cuồng Nộ"):d.stat==="defense"||d.stat==="resist"?($="🛡️",p="Kiên Cố"):d.stat==="speed"||d.stat==="dexterity"?($="💨",p="Thân Pháp"):($="✨",p="Cường Hóa");let s=d.duration?` (-${d.duration} Trận)`:"",h=`Hiệu ứng: ${d.stat} (${d.type} ${d.value})${d.duration?` - Còn lại: ${d.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${h}">${$} ${p}${s}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function B(){var u,g,r,c,a,v,i,m,w;const n=E.player;if(!n)return;const t=Math.max(0,n.currentHp/n.maxHp*100),e=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,l=n.maxEnergy>0?Math.max(0,n.currentEnergy/n.maxEnergy*100):0,d=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0,$=E.exploration?E.exploration[n.currentArea||"thanh_lam_tran"]:null,p=$?$.name:"Khám Phá",s=E._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");E._collapsedNav=s;const y={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",crimes:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[E.currentPage];y&&(s[y]=!1),vt.innerHTML=`
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
          <div class="player-meta">Lv.${n.level} · ${((u=n.realmInfo)==null?void 0:u.fullName)||"?"}</div>
          ${mt(n)}
          ${yt(n)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${n.currentHp}/${n.maxHp}
                ${n.currentHp<n.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(g=n.skills)!=null&&g.some(f=>f.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${n.currentStamina??100}/${n.maxStamina??100}
                ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((r=n.stats)==null?void 0:r.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${e}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${n.currentEnergy}/${n.maxEnergy}
                ${n.currentEnergy<n.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((c=n.stats)==null?void 0:c.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${l}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>✨ Tu Vi (Cấp ${n.level})</span>
              <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${d.toFixed(1)}%)</span></span>
            </div>
            <div class="bar-track"><div class="bar-fill xp" style="width:${d}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${n.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${E.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(n.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
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
            📍 ${p} ${n.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':n.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(n.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <!-- PHÂN HỆ 1: KHÁM PHÁ & HÀNH TRÌNH (Trọng Tâm Gameplay) -->
          <li class="nav-section ${s.hanhtrinh?"collapsed":""}" data-section="hanhtrinh">
            <span>⚔️ KHÁM PHÁ & HÀNH TRÌNH</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${s.hanhtrinh?"collapsed":""}" id="sec-hanhtrinh">
            <li class="nav-item nav-item--hero ${E.currentPage==="combat"?"active":""}" data-page="combat">
              <span class="icon">🔍</span> Khám Phá (${p})
              <span class="badge" style="background: linear-gradient(135deg, #e8a43a, #f0c030); color: #1a1a2e; font-weight: 800; font-size: 9px; padding: 2px 6px;">CHÍNH</span>
            </li>
            <li class="nav-item ${["travel","dungeon","tiencanh"].includes(E.currentPage)?"active":""}" data-page="travel">
              <span class="icon">🗺️</span> Ngao Du Bát Hoang
              ${(n.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(E.currentPage)?"active":""}" data-page="quests">
              <span class="icon">📜</span> Thiên Cơ Nhiệm Vụ
              ${(n.activeQuests||[]).filter(f=>f.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(n.activeQuests||[]).filter(f=>f.status==="active").length}</span>`:""}
            </li>
            <li class="nav-item ${E.currentPage==="crimes"?"active":""}" data-page="crimes">
              <span class="icon">💀</span> Thí Luyện Ác Nghiệp
            </li>
          </div>

          <!-- PHÂN HỆ 2: TU CHÂN (Tự Thân & Tu Luyện) -->
          <li class="nav-section ${s.tuchan?"collapsed":""}" data-section="tuchan">
            <span>TU CHÂN</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${s.tuchan?"collapsed":""}" id="sec-tuchan">
            <li class="nav-item ${E.currentPage==="stats"?"active":""}" data-page="stats">
              <span class="icon">🧘</span> Tu Luyện & Cảnh Giới
              ${(v=(a=E.player)==null?void 0:a.realmInfo)!=null&&v.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite" title="Có thể đột phá!">!</span>':""}
            </li>
            <li class="nav-item ${["skills","education","library","glitch"].includes(E.currentPage)?"active":""}" data-page="skills">
              <span class="icon">⚡</span> Công Pháp & Kỹ Năng
              ${(n.glitchInsight||0)>0?`<span class="badge" style="background: #a855f7;" title="Điểm Thấu Triệt">${n.glitchInsight}</span>`:""}
            </li>
            <li class="nav-item ${E.currentPage==="inventory"?"active":""}" data-page="inventory">
              <span class="icon">🎒</span> Càn Khôn Túi
              ${(n.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)" title="Đan độc">⏳</span>':""}
            </li>
          </div>

          <!-- PHÂN HỆ 3: TRANH ĐẤU (Chiến Đấu & Thử Thách) -->
          <li class="nav-section ${s.tranhdau?"collapsed":""}" data-section="tranhdau">
            <span>TRANH ĐẤU</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${s.tranhdau?"collapsed":""}" id="sec-tranhdau">
            <li class="nav-item ${E.currentPage==="arena"?"active":""}" data-page="arena">
              <span class="icon">⚔️</span> Luận Đạo Đấu Trường
            </li>
            <li class="nav-item ${E.currentPage==="tower"?"active":""}" data-page="tower">
              <span class="icon">🗼</span> Thiên Phần Tháp
            </li>
            <li class="nav-item ${E.currentPage==="worldboss"?"active":""}" data-page="worldboss">
              <span class="icon">🐉</span> Ma Thú Xâm Lăng
              <span class="badge" style="background:var(--red); font-size:9px">Boss</span>
            </li>
          </div>

          <!-- PHÂN HỆ 4: TIÊN PHỦ (Phương Ngoại & Thế Giới) -->
          <li class="nav-section ${s.tienphu?"collapsed":""}" data-section="tienphu">
            <span>TIÊN PHỦ</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${s.tienphu?"collapsed":""}" id="sec-tienphu">
            <li class="nav-item ${E.currentPage==="housing"?"active":""}" data-page="housing">
              <span class="icon">🏠</span> Động Phủ Tu Tiên
            </li>
            <li class="nav-item ${E.currentPage==="guild"?"active":""}" data-page="guild">
              <span class="icon">🏯</span> Tông Môn Bang Hội
            </li>
            <li class="nav-item ${E.currentPage==="alchemy"?"active":""}" data-page="alchemy">
              <span class="icon">⚒️</span> Luyện Đan & Đúc Khí
            </li>
          </div>

          <!-- PHÂN HỆ 5: THƯƠNG HỘI (Kinh Tế & Vận May) -->
          <li class="nav-section ${s.thuonghoi?"collapsed":""}" data-section="thuonghoi">
            <span>THƯƠNG HỘI</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${s.thuonghoi?"collapsed":""}" id="sec-thuonghoi">
            <li class="nav-item ${["market","auction"].includes(E.currentPage)?"active":""}" data-page="market">
              <span class="icon">🏪</span> Phường Thị & Đấu Giá
            </li>
            <li class="nav-item ${E.currentPage==="npcshop"?"active":""}" data-page="npcshop">
              <span class="icon">🧓</span> Tiên Các Thương Nhân
            </li>
            <li class="nav-item ${E.currentPage==="gacha"?"active":""}" data-page="gacha">
              <span class="icon">🎰</span> Thiên Cơ Đài (Tầm Bảo)
            </li>
          </div>

          ${n.role==="admin"?`
          <!-- PHÂN HỆ 6: VÔ THƯỢNG (Admin) -->
          <li class="nav-section ${s.vothuong?"collapsed":""}" data-section="vothuong">
            <span>VÔ THƯỢNG</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${s.vothuong?"collapsed":""}" id="sec-vothuong">
            <li class="nav-item ${E.currentPage==="admin"?"active":""}" data-page="admin">
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(f=>{f.addEventListener("click",()=>{E.currentPage=f.dataset.page,B()})}),document.querySelectorAll(".nav-section[data-section]").forEach(f=>{f.addEventListener("click",()=>{const k=f.dataset.section;E._collapsedNav=E._collapsedNav||{},E._collapsedNav[k]=!E._collapsedNav[k],localStorage.setItem("collapsedNav",JSON.stringify(E._collapsedNav));const L=document.getElementById(`sec-${k}`);L&&(L.classList.toggle("collapsed",E._collapsedNav[k]),f.classList.toggle("collapsed",E._collapsedNav[k]))})}),(i=document.getElementById("btnFabChat"))==null||i.addEventListener("click",()=>F("chat")),(m=document.getElementById("btnFabSocial"))==null||m.addEventListener("click",()=>F("social"));const T=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');T&&T.addEventListener("click",f=>{f.stopPropagation(),E.currentPage="events",E.popupOpen=!1,B()}),(w=document.getElementById("btnPopupClose"))==null||w.addEventListener("click",()=>{E.popupOpen=!1,B()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(f=>{f.addEventListener("click",()=>F(f.dataset.popup))}),Qt(),E.popupOpen&&Jt();const b=document.getElementById("searchPlayerInput"),o=document.getElementById("searchResults");let x=null;b&&o&&(b.addEventListener("input",()=>{clearTimeout(x);const f=b.value.trim();if(f.length<2){o.style.display="none";return}x=setTimeout(async()=>{try{const k=await q.searchPlayers(f),L=k.players||k.results||[];L.length===0?o.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':o.innerHTML=L.map(S=>{var C;return`
              <div class="search-result" data-pid="${S.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${S.name} <span style="opacity:0.4">Lv.${S.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((C=S.realmInfo)==null?void 0:C.name)||""}</span>
              </div>
            `}).join(""),o.style.display="block",o.querySelectorAll(".search-result").forEach(S=>{S.addEventListener("click",()=>{E.currentPage="profile",E._viewProfileId=S.dataset.pid,o.style.display="none",b.value="",B()}),S.addEventListener("mouseenter",()=>S.style.background="rgba(255,255,255,0.08)"),S.addEventListener("mouseleave",()=>S.style.background="transparent")})}catch{o.style.display="none"}},300)}),b.addEventListener("blur",()=>{setTimeout(()=>{o.style.display="none"},200)}),b.addEventListener("keydown",f=>{f.key==="Escape"&&(o.style.display="none",b.blur())})),Ft()}function F(n){E.popupOpen=!0,E.popupPage=n,B()}function Jt(){const n=document.getElementById("popupContent");n&&(E.popupPage==="chat"?gt(n,Q):E.popupPage==="social"&&pt(n,Q))}const Ut={combat:Tt,crimes:Pt,education:nt,stats:Lt,skills:Y,inventory:J,travel:lt,alchemy:U,quests:ct,admin:It,social:pt,chat:gt,market:Mt,realm:Nt,events:qt,dungeon:rt,housing:_t,wiki:zt,npcshop:Ot,guild:Rt,library:W,profile:At,arena:jt,auction:ut,dailyquest:ot,worldboss:Gt,gacha:Kt,leaderboard:Dt,tiencanh:dt,glitch:(n,t)=>{localStorage.setItem("skillsTab","glitch"),Y(n,t)}};function Qt(){const n=document.getElementById("pageContent");if(!n)return;const t=Ut[E.currentPage];t&&t(n,Q)}function Wt(){var $,p,s,h,y;const n=E.player;if(!n)return;const t=Math.max(0,n.currentHp/n.maxHp*100),e=n.maxEnergy>0?Math.max(0,n.currentEnergy/n.maxEnergy*100):0,l=document.querySelector(".sidebar-player");if(l){const T=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,b=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0;l.innerHTML=`
      <div class="player-name">${n.name}</div>
      <div class="player-meta">Lv.${n.level} · ${(($=n.realmInfo)==null?void 0:$.fullName)||"?"}</div>
      ${mt(n)}
      ${yt(n)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${n.currentHp}/${n.maxHp}
            ${n.currentHp<n.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(p=n.skills)!=null&&p.some(o=>o.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${n.currentStamina??100}/${n.maxStamina??100}
            ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((s=n.stats)==null?void 0:s.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${T}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${n.currentEnergy}/${n.maxEnergy}
            ${n.currentEnergy<n.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((h=n.stats)==null?void 0:h.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${e}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>✨ Tu Vi (Cấp ${n.level})</span>
          <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${b.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${b}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${n.gold??0} Linh Thạch</div>`}const d=document.querySelector('.nav-item[data-page="stats"]');if(d){let T="";n.statPoints>0&&(T+=`<span class="badge">${n.statPoints}</span>`),(y=n.realmInfo)!=null&&y.canBreakthrough&&(T+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),d.querySelectorAll(".badge").forEach(b=>b.remove()),d.insertAdjacentHTML("beforeend",T)}}async function K(){try{const[n,t,e,l,d,$]=await Promise.all([q.getMonsters(),q.getSkills(),q.getItems(),q.getMedicines(),q.getCrimes(),q.getEducation()]);E.monsters=n.monsters||[],E.skills=t.skills||[],E.items=e.items||[],E.medicines=l.medicines||[],E.crimes=d.crimes||[],E.educationTrees=$.trees||[],E.exploration=await q.getExploration(),E.recipes=(await q.getRecipes()).recipes,E.npcs=(await q.getNpcs()).npcs||[]}catch(n){console.error("Lỗi tải dữ liệu:",n)}}function R(n,t="info"){var l;(l=document.querySelector(".notification"))==null||l.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=n,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}Vt();
//# sourceMappingURL=index-B2NKoRrd.js.map
