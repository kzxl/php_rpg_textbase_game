(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const f of o)if(f.type==="childList")for(const p of f.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function e(o){const f={};return o.integrity&&(f.integrity=o.integrity),o.referrerPolicy&&(f.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?f.credentials="include":o.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function d(o){if(o.ep)return;o.ep=!0;const f=e(o);fetch(o.href,f)}})();const ft="/api";class $t{async request(t,e={}){try{const d=await fetch(`${ft}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),o=await d.json();if(!d.ok)throw new Error(o.error||`HTTP ${d.status}`);return o}catch(d){throw console.error(`API Error [${t}]:`,d),d}}register(t,e,d,o){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:d,gender:o})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,d=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:d})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,d=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:d})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,d=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:d})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCraftingMastery(t){return this.request(`/player/${t}/crafting-mastery`)}getMonsterMastery(t){return this.request(`/player/${t}/monster-mastery`)}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,d,o=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:d,lockAffixIndex:o})})}enrollNode(t,e,d){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:d})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,d){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:d})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,d,o){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:d,amount:o})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,d=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${d}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,d,o){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:d,message:o})})}getMarketListings(t="",e="newest"){const d=new URLSearchParams;return t&&d.set("type",t),e&&d.set("sort",e),this.request(`/market?${d.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,d,o,f){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:d,quantity:o,price:f})})}buyFromMarket(t,e,d=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:d})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,d){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:d})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,d,o){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:d,description:o})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,d,o=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:d,lockAffixIndex:o})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,d,o=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:d,quantity:o})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,d,o=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:d,durationHours:o})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,d=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:d})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const B=new $t;function Tt(n,t){var m,L;const{state:e,api:d,notify:o,renderGame:f,updateSidebar:p}=t,s=e.player,v=e.exploration?e.exploration[s.currentArea||"thanh_lam_tran"]:null,$=v?v.name:"Vùng Đất Vô Danh",k=v&&(v.staminaCost||v.stamina_cost)||10;n.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${$}</h1>
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
            <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${k} Thể Lực</span>
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
    </div>`;const h=((m=s.insightLevels)==null?void 0:m.monster)??0,c=async()=>{try{const y=await d.getAreaMonsters(s.id);if(y.monsters){e.player.trackedMonsters=y.monsters;const T=document.getElementById("trackedMonstersList");if(!T)return;if(y.monsters.length===0){T.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}T.innerHTML=y.monsters.map(w=>{const S=w.currentHp/w.stats.hp*100,H=S>60?"var(--green)":S>30?"var(--orange)":"var(--red)";let P='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';h>=1&&(P=`<div class="item-desc text-sm text-dim mb-sm">${w.description||"Yêu thú vùng này."}</div>`);let M="";h>=1&&(M=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${S}%; background: ${H}; height: 100%;"></div>
            </div>`);let E=h>=2?`❤ ${w.currentHp}/${w.stats.hp}`:h>=1?"❤ ???":"";return`
            <div class="monster-card ${w.is_boss?"boss":""}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${w.icon||"👾"}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${w.is_boss?"var(--red)":"var(--text-bright)"}; font-size: 15px;">${w.name}</span>
                    <span class="badge ${w.is_boss?"bg-red":"bg-darker"}">Cấp ${w.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${H};">${E}</div>
                </div>
                ${M}
                ${P}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${w.instance_id}" data-monster-id="${w.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),T.querySelectorAll(".btnTrackedCombat").forEach(w=>{w.addEventListener("click",S=>{const H=S.currentTarget.dataset.monsterId,P=S.currentTarget.dataset.instanceId;et(t,H,P)})})}}catch(y){console.error(y)}},b=async()=>{try{const y=await d.getAreaMonsterTemplates(s.currentArea||"thanh_lam_tran");if(y.monsters){const T=document.getElementById("areaMonstersList");if(!T)return;if(y.monsters.length===0){T.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}T.innerHTML=y.monsters.map(w=>`
            <div style="display: flex; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div style="font-size: 24px; width: 36px; text-align: center;">${w.icon||"👾"}</div>
              <div style="flex: 1;">
                <div class="flex items-center gap-2">
                  <span class="bold" style="color: ${w.isBoss?"var(--red)":"var(--text-bright)"}; font-size: 13px;">${w.name}</span>
                  <span class="badge ${w.isBoss?"bg-red":"bg-darker"} text-xs">Cấp ${w.level}</span>
                </div>
                <div class="text-xs text-dim">${w.description||"Yêu thú sinh sống tại khu vực này."}</div>
              </div>
            </div>
          `).join("")}}catch(y){console.error(y)}};c(),b(),(L=document.getElementById("btnExplore"))==null||L.addEventListener("click",()=>tt(t));let u=!1;const g=document.getElementById("btnAutoBattle"),l=document.getElementById("btnStopAuto"),r=document.getElementById("panelKhamPha"),a=document.querySelector(".toggle-auto-combat"),x=document.getElementById("autoCombatStatus");g&&g.addEventListener("click",()=>{u=!0,r.style.display="none",a.style.display="block",i()}),l&&l.addEventListener("click",()=>{u=!1,r.style.display="block",a.style.display="none"});async function i(){var S,H,P,M,E,I,q,z,R,G;let y=0,T=0,w=0;for(;u;){x.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${y} trận | +${T} XP | +${w} Linh Thạch</div>
        `;const O=e.player;if((O.currentStamina||0)<k){x.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",u=!1;break}if(O.currentHp/O.maxHp<.2){x.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",u=!1;break}try{const N=await d.explore(e.playerId);if(e.player=N.player,p(),N.event&&(N.event.type==="monster"||N.event.type==="worldBoss")){if(x.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${N.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(xt=>setTimeout(xt,600)),!u)break;const _=await d.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:N.event.monsterId})});if(e.player=_.player,p(),_.outcome==="win")y++,T+=((S=_.rewards)==null?void 0:S.xp)||0,w+=((H=_.rewards)==null?void 0:H.gold)||0,x.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(P=_.monster)==null?void 0:P.name}! (+${((M=_.rewards)==null?void 0:M.xp)||0} XP, +${((E=_.rewards)==null?void 0:E.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${y} | Tiếp tục sau 1s...</div>
                   `;else{x.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${_.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,u=!1;break}}else if(N.event&&N.event.type==="monster_ambush"&&N.event.combatResult){const _=N.event.combatResult;if(_.outcome==="win")y++,T+=((I=_.rewards)==null?void 0:I.xp)||0,w+=((q=_.rewards)==null?void 0:q.gold)||0,x.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(z=_.monster)==null?void 0:z.name}! (+${((R=_.rewards)==null?void 0:R.xp)||0} XP)</div>`;else{x.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",u=!1;break}}else x.innerHTML=`<div class='text-blue'>${((G=N.event)==null?void 0:G.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(N){x.innerHTML=`<div class='text-red'>Lỗi: ${N.message}. Dừng tự động.</div>`,u=!1;break}await new Promise(N=>setTimeout(N,1200))}}}async function tt(n){var s,v,$;const{state:t,api:e,notify:d,updateSidebar:o}=n,f=document.getElementById("exploreResult");if(!f)return;const p=document.getElementById("btnExplore");p&&(p.disabled=!0,p.style.opacity="0.6"),f.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const k=await e.explore(t.playerId);t.player=k.player,o();const h=k.event,c=k.cost||10,b=k.player.currentStamina??0,u=k.player.maxStamina??100,g=b>=c;let l=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
          <div style="margin-bottom: 10px;">
            <span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px;">
              🏃 -${c} Thể Lực (Hiện có: ${b}/${u})
            </span>
          </div>
    `;if(h.type==="monster")l+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${h.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${h.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${h.monsterId}">👣 Theo Dõi</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(h.type==="monster_ambush"&&h.combatResult){const r=h.combatResult,a=nt(r.log||[]),x=r.outcome==="win"?"🏆 Chiến thắng!":r.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",i=r.outcome==="win"?"var(--green)":r.outcome==="loss"?"var(--red)":"var(--orange)";l+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${h.message}</div>
        <div style="font-size:16px;font-weight:700;color:${i};margin-bottom:12px">${x}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${a}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Thám Tiếp (-${c} TL)</button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `}else if(h.type==="worldBoss")l+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${h.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${h.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${h.monsterId}">👣 Ghi Dấu</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `;else if(h.type==="npc"&&h.npcId)l+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${h.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${h.message}</div>
        <div class="text-sm text-dim mb-md">${h.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnNpcInteract">💬 Bái Kiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
          <button class="btn btn--dark" id="btnExploreContinue">Đóng</button>
        </div>
      `;else if(h.type==="player_encounter"&&h.targetPlayer){const r=h.targetPlayer;l+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${r.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${r.realmTierName||"Phàm nhân"} · Cấp ${r.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${r.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${r.id}">⚔️ Cướp Bóc</button>
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>🔍 Dò Tiếp</button>
        </div>
      `}else l+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${h.message}</div>
        ${h.gold?`<div class="text-gold bold">+${h.gold} 💎 Linh Thạch</div>`:""}
        ${h.item?`<div class="text-green bold">+1 ${h.item.name}</div>`:""}
        <div class="flex gap-2 justify-center mt-md">
          <button class="btn btn--gold flex-1" id="btnExploreAgain" ${g?"":"disabled"}>
            ${g?`🔍 Dò Thám Tiếp (-${c} TL)`:`❌ Hết Thể Lực (${b}/${c})`}
          </button>
          <button class="btn btn--blue" id="btnExploreContinue">Tiếp tục</button>
        </div>
      `;l+="</div></div>",f.innerHTML=l,(h.type==="monster"||h.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",r=>{f.innerHTML="",et(n,r.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async r=>{try{const a=await e.trackMonster(t.playerId,r.target.dataset.mid);a.success?(d(a.message,"success"),f.innerHTML="",typeof n.renderGame=="function"&&n.renderGame()):a.error&&d(a.error,"error")}catch(a){d("Lỗi theo dõi: "+a.message,"error")}})),h.type==="npc"&&h.npcId&&((s=document.getElementById("btnNpcInteract"))==null||s.addEventListener("click",async()=>{await kt(n,h.npcId,f)})),(v=document.getElementById("btnExploreAgain"))==null||v.addEventListener("click",()=>{tt(n)}),($=document.getElementById("btnExploreContinue"))==null||$.addEventListener("click",()=>{f.innerHTML=""})}catch(k){f.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${k.message}</div></div>`}finally{p&&(p.disabled=!1,p.style.opacity="1")}}async function kt(n,t,e){const{state:d,api:o,notify:f,renderGame:p}=n,s=document.getElementById("npcQuestModal")||e;try{const $=(await o.getNpc(t)).npc;if(!$)return;const k=(d.player.activeQuests||[]).map(c=>c.quest_id);let h=$.quests.map(c=>{const b=k.includes(c.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${c.name}</span>
            <span class="text-xs badge" style="background:${c.type==="kill"?"var(--red)":"var(--green)"}">${c.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${c.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${c.rewards.gold?c.rewards.gold+"💎 ":""}${c.rewards.xp?c.rewards.xp+"✨ ":""}${c.rewards.skillChance?"🎯 "+c.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${b?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${c.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");s.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${$.icon||"🧓"} ${$.name} <span class="subtitle">${$.profession}</span></div>
        <div class="panel-body">
          ${h||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,s.querySelectorAll(".btn-accept-quest").forEach(c=>{c.addEventListener("click",async()=>{c.disabled=!0,c.textContent="⏳...";try{const b=await o.acceptQuest(d.playerId,c.dataset.npc,c.dataset.qid);d.player=b.player,f(b.message,"success"),p()}catch(b){f(b.message||"Lỗi nhận quest","error"),c.disabled=!1,c.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(v){console.error("NPC load error:",v)}}async function et(n,t,e=null){var $,k;const{state:d,api:o,notify:f,updateSidebar:p,renderGame:s}=n,v=document.getElementById("combatResult");if(v){if(!d.player.currentHp||d.player.currentHp<=0)return f("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(d.player.hospitalRemaining>0)return f(`Đang tịnh dưỡng! Còn ${d.player.hospitalRemaining}s`,"error");v.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,v.scrollIntoView({behavior:"smooth"});try{const h=await o.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:d.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(d.player=h.player,h.outcome==="no_energy"){v.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${h.log[0]}</div></div>`,p();return}const c=h.monster,b=Math.max(0,d.player.currentHp/d.player.maxHp*100),u=Math.max(0,c.currentHp/c.maxHp*100),g={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},l=g[h.outcome]||g.loss,r=($=h.rewards)!=null&&$.gold?` · +${h.rewards.gold} 💎`:"",a=h.rewards?` · +${h.rewards.xp} XP${r}`:"",x={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[h.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};v.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${l.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${l.icon}</span> <span>${l.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${h.turns}/${h.maxTurns||25} Lượt ${a}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.9) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright); font-size: 15px; margin-bottom: 2px;">${d.player.name}</div>
              <div style="font-size: 11px; color: ${x.color}; font-weight: 600; margin-bottom: 8px;">
                ${x.icon} ${x.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${b}%; height: 100%; background: ${b>50?"var(--green)":b>20?"var(--orange)":"var(--red)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${d.player.currentHp}/${d.player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(251,191,36,0.5); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${(k=h.glitchEvents)!=null&&k.length?h.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${c.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${c.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${c.level||1} · ${c.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${u}%; height: 100%; background: ${u>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${c.currentHp}/${c.maxHp} HP</div>

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
            ${nt(h.log)}
          </div>
        </div>
      </div>`;const i=document.getElementById("cardMonster"),m=document.getElementById("cardPlayer");h.glitchEvents&&h.glitchEvents.length>0&&i?h.glitchEvents.forEach((L,y)=>{setTimeout(()=>{Y(i,`-${L.damage} 🌌 [VẾT NỨT]`,"glitch"),i.classList.add("shake"),setTimeout(()=>i.classList.remove("shake"),400)},y*400+200)}):i&&h.rewards&&Y(i,`-${Math.round(c.maxHp*.4)} 💥`,"crit"),p(),e&&typeof s=="function"&&setTimeout(()=>s(),1500)}catch(h){v.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${h.message}</div></div>`}}}function Y(n,t,e="normal"){if(!n)return;const d=document.createElement("div");d.className=`floating-damage damage-${e}`,d.textContent=t,n.appendChild(d),setTimeout(()=>d.remove(),1100)}function nt(n){return(n||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function X(n,t){const{state:e,api:d,notify:o}=t,f=e.player,p=(f.skills||[]).find(h=>(typeof h=="string"?h:h.id)==="nhan_thuat"),s=p?p.level||1:0,v=[...e.skills].sort((h,c)=>(h.tier||1)-(c.tier||1)),$=(f.skills||[]).map(h=>typeof h=="string"?h:h.id),k={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};n.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${s}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${v.map(h=>{const c=$.includes(h.id),b=h.tier||1,u=b>s+1,g=b<=s;let l="";return h.requirements&&h.requirements.length>0?g||c?l=`<div class="mt-sm text-xs text-orange">Điều kiện: ${h.requirements.map(r=>`<br>• ${r}`).join("")}</div>`:u?l=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${b}.</div>`:l='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':l='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${c?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${h.name} ${c?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${c?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${k[b]||b}</span>
                    <span class="text-xs text-dim">${h.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||c?h.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${h.type!=="passive"&&h.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${h.cost} linh lực</div>`:""}
                
                ${l}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${c?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${u?"btn--dark":"btn--gold"} btn--sm btn-learn" ${u?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${h.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,n.querySelectorAll(".accordion-header").forEach(h=>{h.addEventListener("click",()=>{const c=h.nextElementSibling;c.style.display==="none"?(c.style.display="block",h.querySelector("div:last-child").textContent="▲"):(c.style.display="none",h.querySelector("div:last-child").textContent="▼")})}),n.querySelectorAll(".btn-learn").forEach(h=>{h.addEventListener("click",async c=>{c.stopPropagation();try{const b=await d.learnSkill(f.id,h.dataset.sid);b.error?o(b.error,"error"):(e.player=b.player,o(b.message,"success"),X(n,t))}catch(b){o("Lỗi học kỹ năng: "+b.message,"error")}})})}function wt(n,t){var b,u,g;const{state:e,api:d,notify:o,renderGame:f}=t,p=e.player,s=p.stats,v=p.allocatedStats||{},$=5,k=p.currentEnergy>=$&&!p.hospitalRemaining,h=p.talentDisplay||{},c=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];n.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${p.currentEnergy}/${p.maxEnergy} linh lực · Chi phí: ${$}/lần</span>
      </div>
    </div>

    ${p.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${p.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${((b=p.realmInfo)==null?void 0:b.fullName)||"Phàm Nhân"}
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
          ${c.map(([l,r,a])=>{const x=h[l]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${x.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${r}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${a}</div>
                <div style="font-size:14px;font-weight:700;color:${x.color};margin-top:4px">${x.icon} ${x.name}</div>
                <div style="font-size:11px;color:${x.color};opacity:0.8">×${x.value} hệ số</div>
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
        ${c.map(([l,r,a,x])=>{const i=h[l]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},m=Math.floor(p.currentEnergy/$)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${r}</span> ${a}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${x}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${s[l]??0}</span>
              ${v[l]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${v[l]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${i.color};min-width:50px" title="Căn Cốt: ${i.name} (×${i.value})">${i.icon}×${i.value}</span>
              <input type="number" class="train-count" data-stat="${l}" min="1" max="${m}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${k?"":"disabled"}>
              <button class="btn btn--sm ${k?"btn--blue":"btn--dark"} train-btn" data-train="${l}" ${k?"":"disabled"} title="Tốn ${$} Linh lực/lần · Căn cốt ×${i.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${$} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(p.currentEnergy/$)}</strong> lần hiện tại.
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
    </div>`,(g=n.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",async()=>{try{const l=n.querySelector(".btn-breakthrough");l.disabled=!0,l.innerHTML="Đang Độ Kiếp...";const r=await d.attemptBreakthrough(e.playerId);e.player=r.player,o(r.message,"success"),f()}catch(l){o(l.message||"Đột phá thất bại","error");const r=n.querySelector(".btn-breakthrough");r&&(r.disabled=!1,r.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),n.querySelectorAll(".train-btn").forEach(l=>{l.addEventListener("click",async r=>{r.stopPropagation();const a=n.querySelector(`.train-count[data-stat="${l.dataset.train}"]`),x=parseInt(a==null?void 0:a.value)||1;try{const i=await d.trainStat(e.playerId,l.dataset.train,x);e.player=i.player,o(i.message,"success"),f()}catch(i){o(i.message||"Lỗi rèn luyện","error")}})})}async function at(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.player;if(p){n.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const v=(await d.getGlitches(p.id)).status,$=n.querySelector("#glitchContentWrapper");if(!$)return;if(!v.featureUnlocked){Lt($,v.featureDetails,p);return}St($,v,p,t)}catch(s){n.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${s.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function Lt(n,t,e){const d=(t==null?void 0:t.requirements)||[];n.innerHTML=`
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
          ${d.map(o=>`
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
  `}function St(n,t,e,d){const{api:o,notify:f,updateSidebar:p}=d,s=t.imprints||[],v=t.stances||{},$=t.activeStance||"breaker";n.innerHTML=`
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
  `;const k=n.querySelector("#btnOverrideTribulation");k&&(k.onclick=async()=>{k.disabled=!0,k.textContent="Đang lách luật...";try{const h=await o.overrideTribulation(e.id);f(h.message,"success"),state.player=h.player,p(),at(n.parentElement,d)}catch(h){f(h.message||"Thao tác lách luật thất bại!","error"),k.disabled=!1,k.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),it(n,v,$,e,o,f,p),st(n,s,e,f,p)}function it(n,t,e,d,o,f,p){const s=n.querySelector("#stanceContainer");s&&(s.innerHTML="",Object.values(t).forEach(v=>{const $=v.isUnlocked!==!1,k=v.id===e,h=document.createElement("div");h.style.cssText=`
      background: ${k?"rgba(168, 85, 247, 0.15)":$?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${k?"#c084fc":$?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${$?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${$?"1":"0.55"};
    `,h.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${$?v.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${$?v.icon:"🔒"}</span> ${v.name}
        </div>
        ${k?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${$?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${$?v.description:`<span style="color:#f59e0b;">${v.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,h.onclick=async()=>{if(!$)return f(v.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!k)try{const c=await o.setStance(d.id,v.id);f(c.message,"success"),state.player=c.player,p(),it(n,t,v.id,d,o,f,p)}catch(c){f(c.message||"Chuyển thế thất bại","error")}},s.appendChild(h)}))}function st(n,t,e,d,o){const f=n.querySelector("#imprintsContainer");f&&(f.innerHTML="",t.forEach(p=>{const s=document.createElement("div"),v=p.fogLevel||(p.isUnlocked?"revealed":"fog");let $="rgba(15, 23, 42, 0.5)",k="rgba(255,255,255,0.08)",h="none";v==="revealed"?($="rgba(30, 41, 59, 0.75)",k=p.color,h=`0 0 12px ${p.color}33`):v==="partial"?($="rgba(24, 24, 27, 0.6)",k="1px dashed rgba(168, 85, 247, 0.4)"):($="rgba(10, 10, 15, 0.5)",k="1px dashed rgba(255, 255, 255, 0.08)"),s.style.cssText=`
      background: ${$};
      border: 1px solid ${k};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${h};
      position: relative;
      overflow: hidden;
    `,s.innerHTML=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${p.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${p.icon}</span> ${p.name}
          </div>
          <span style="font-size: 0.7rem; color: ${v==="revealed"?"#fbbf24":"#6b7280"}; border: 1px solid ${v==="revealed"?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.08)"}; padding: 1px 6px; border-radius: 4px;">
            ${v==="revealed"?p.title:v==="partial"?"Chớm Ngộ":"Sương Mù"}
          </span>
        </div>

        <div style="font-size: 0.78rem; color: ${v==="fog"?"#9ca3af":"#a1a1aa"}; font-style: italic; margin-bottom: 8px; line-height: 1.4;">
          "${p.lore}"
        </div>

        <div style="font-size: 0.82rem; color: ${v==="revealed"?"#e4e4e7":"#9ca3af"}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
          <strong style="color: ${v==="revealed"?"#67e8f9":"#888"};">
            ${v==="revealed"?"Hiệu ứng:":v==="partial"?"Manh mối:":"Sấm truyền:"}
          </strong> ${p.description}
        </div>
      </div>

      <div>
        ${v==="revealed"?`
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
            <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐẠI TRIỆT ĐẠI NGỘ</span>
            <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${p.title}">
              ${e.activeTitle===p.title?"Đang Đeo":"Đeo Danh Hiệu"}
            </button>
          </div>
        `:v==="partial"?`
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
    `;const c=s.querySelector(".btnSetTitle");c&&(c.onclick=()=>{e.activeTitle=p.title,d(`Đã kích hoạt danh hiệu: [${p.title}]!`,"success"),o(),st(n,t,e,d,o)}),f.appendChild(s)}))}function V(n,t){const{state:e,api:d,notify:o}=t,f=e.player;if(!f)return;const p=f.skills||[];p.map(y=>typeof y=="string"?y:y.id);const s=e.skills||[],v=(f.realmTier??1)>=2||(f.glitchInsight??0)>=20||(f.unlockedImprints||[]).length>0,$={combat:{icon:"⚔️",name:"Chiêu Thức & Tâm Pháp",sub:`${p.length} đã ngộ • Luyện kỹ`,badge:`${p.length}`},monsters:{icon:"🐺",name:"Thông Thạo Quái Vật",sub:"Bách thú đồ giám • Sát quái",badge:"★"},crafting:{icon:"⚒️",name:"Thông Thạo Chế Tạo",sub:`Lv.${f.craftingLevel||1} • Đan đạo & Đúc rèn`,badge:`Lv.${f.craftingLevel||1}`},glitch:{icon:v?"🌌":"🌫️",name:v?"Thiên Đạo Dị Biến":"Kẽ Hở Quy Luật",sub:v?`${f.glitchInsight||0} Thấu Triệt`:"Sương mù che phủ",badge:v?`${f.glitchInsight||0}`:"?"}};let k=localStorage.getItem("activeSkillPillar")||"combat",h="all",c="all",b=null,u=null;const g=y=>{switch(y){case 1:return 2;case 2:return 3;case 3:return 4;case 4:return 5;default:return 6}},l=()=>`
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
      <div>
        <h1 style="display: flex; align-items: center; gap: 10px;">
          <span>⚡ Tứ Đại Trụ Cột Kỹ Năng</span>
        </h1>
        <div class="text-dim text-sm">Hệ thống tu hành thực chiến: Chiêu thức tôi luyện, thông thạo vạn vật, đúc tạo đan khí & khai mở dị biến.</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn--sm ${k==="library"?"btn--gold":"btn--outline"}" id="btn-open-library">
          📚 Tàng Kinh Các
        </button>
      </div>
    </div>

    <!-- 4 PILLARS SELECTOR -->
    <div class="pillar-tabs">
      ${Object.entries($).map(([y,T])=>`
        <div class="pillar-tab ${k===y?"active":""}" data-pillar="${y}">
          <div class="pillar-icon">${T.icon}</div>
          <div class="pillar-info">
            <div class="pillar-name">${T.name}</div>
            <div class="pillar-sub">${T.sub}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `,r=()=>{const y=g(f.realmTier||1),T=p.map(E=>{const I=typeof E=="string"?E:E.id;return{...s.find(z=>z.id===I)||{name:I,id:I,category:"combat",type:"active"},level:E.level||1,xp:E.xp||E.currentXp||0,equipped:E.equipped||E.isEquipped||!1}}),w=T.filter(E=>E.equipped&&E.type!=="passive"),S=T.filter(E=>E.type!=="passive"),H=T.filter(E=>E.type==="passive");let P=T;h==="active"&&(P=S),h==="passive"&&(P=H);const M=(E,I)=>{const q=(E.level||1)*100,z=Math.min(100,(E.xp||0)/q*100),R=E.type==="passive",G="★".repeat(Math.min(E.tier||1,7)),O=(E.tier||1)>=5?"var(--gold)":(E.tier||1)>=3?"var(--purple)":"var(--blue)";let N="";if(R)N='<span style="font-size:11px; font-weight:700; color:var(--green)">🧘 Tâm Pháp Thường Trực</span>';else if(E.equipped)N=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${E.id}">Tháo</button>`;else{const _=w.length<y;N=`<button class="btn btn--sm ${_?"btn--blue":"btn--outline"} equip-btn" data-eq="1" data-sid="${E.id}" ${_?"":'title="Đã đầy ô kỹ năng!"'}>Trang Bị</button>`}return`
        <div class="skill-card  ${E.equipped&&!R?"equipped":""}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name" style="font-size: 14px;">${E.name}</div>
              <div class="skill-card-tier" style="color:${O}">${G} Tầng ${E.tier||1} • ${R?"Tâm Pháp":"Chiêu Thức"}</div>
            </div>
            <div class="skill-card-action">${N}</div>
          </div>
          <div class="skill-card-desc">${E.description||"Tuyệt kỹ thượng thừa tu chân giới."}</div>
          ${`
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${E.level}</span>
                <span class="text-dim">${E.xp}/${q} XP</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${z}%"></div></div>
              ${E.masteryBonus?`<div class="skill-mastery-bonus">✨ ${E.masteryBonus}</div>`:""}
            </div>
          `}
          ${E.cost?`<div class="skill-card-cost">🔵 ${E.cost} Linh Lực / lần xuất chiêu</div>`:""}
        </div>
      `};return`
      <!-- LOADOUT SLOTS -->
      <div class="loadout-bar">
        <div>
          <div style="font-weight: 700; color: var(--gold); font-size: 13px;">⚔️ Ô Xuất Chiêu Thực Chiến: ${w.length}/${y}</div>
          <div class="text-dim text-xs">Cảnh giới hiện tại cho phép trang bị tối đa ${y} chiêu thức kích hoạt trong giao đấu.</div>
        </div>
        <div class="loadout-slots">
          ${Array.from({length:y}).map((E,I)=>{const q=w[I];return q?`<div class="loadout-slot filled" title="${q.name} (Lv.${q.level})">⚔️</div>`:'<div class="loadout-slot" title="Ô trống">➕</div>'}).join("")}
        </div>
      </div>

      <!-- FILTER TABS -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <button class="mastery-filter-btn ${h==="all"?"active":""}" data-sfilter="all">Tất Cả (${T.length})</button>
        <button class="mastery-filter-btn ${h==="active"?"active":""}" data-sfilter="active">⚔️ Chiêu Thức (${S.length})</button>
        <button class="mastery-filter-btn ${h==="passive"?"active":""}" data-sfilter="passive">🧘 Tâm Pháp (${H.length})</button>
      </div>

      <div class="skill-grid">
        ${P.length>0?P.map(E=>M(E)).join(""):'<div class="text-dim" style="padding: 20px;">Chưa lĩnh ngộ pháp quyết nào trong danh mục này. Hãy đến Tàng Kinh Các hoặc tầm bảo khi ngao du!</div>'}
      </div>
    `},a=()=>{if(!b)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `;const{totalKills:y,totalSpecies:T,tierCounts:w,monsters:S,tiers:H}=b,P=["all","Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh"],M=S.filter(E=>c==="all"?!0:(E.tierName||"").includes(c));return`
      <!-- BESTIARY HERO -->
      <div class="mastery-hero">
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${y.toLocaleString()}</span>
          <span class="mastery-stat-label">Tổng Yêu Thú Đã Trảm</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${T}</span>
          <span class="mastery-stat-label">Loài Trong Giới Đồ</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #3b82f6;">${w[1]||0}</span>
          <span class="mastery-stat-label">Chớm Ngộ (1★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #10b981;">${w[2]||0}</span>
          <span class="mastery-stat-label">Thuần Thục (2★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #8b5cf6;">${w[3]||0}</span>
          <span class="mastery-stat-label">Đại Thành (3★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #f59e0b;">${w[4]||0}</span>
          <span class="mastery-stat-label">Khắc Chế (4★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #ef4444;">${w[5]||0}</span>
          <span class="mastery-stat-label">Tuyệt Diệt (5★)</span>
        </div>
      </div>

      <!-- REALM FILTER -->
      <div class="mastery-filter-bar">
        <span class="text-dim text-xs" style="margin-right: 4px;">Cảnh Giới:</span>
        ${P.map(E=>`
          <button class="mastery-filter-btn ${c===E?"active":""}" data-mrealm="${E}">
            ${E==="all"?"Tất Cả":E}
          </button>
        `).join("")}
      </div>

      <!-- MONSTER CARDS GRID -->
      <div class="monster-grid">
        ${M.map(E=>{const I=E.mastery||{},q=(I.tier||0)===0&&(I.kills||0)===0,z=I.isMaxTier,R=I.badgeColor||"#6b7280";return`
            <div class="monster-mastery-card ${q?"fog":""} ${I.tier===5?"apex":""}">
              <div>
                <div class="monster-card-top">
                  <div>
                    <div class="monster-card-name">
                      <span>${q?"🌫️":"🐺"}</span>
                      <span>${E.name}</span>
                    </div>
                    <div class="text-dim text-xs" style="margin-top: 2px;">
                      ${E.tierName||"Phàm Cấp"} • Ngũ Hành: <b>${E.element||"Vô"}</b>
                    </div>
                  </div>
                  <span class="monster-tier-tag" style="color: ${R}; border-color: ${R}">
                    ${I.tierName||"Vô Tri"}
                  </span>
                </div>

                <div class="monster-kills-row">
                  <span class="monster-stars-display" style="color: ${R}">${I.stars||"☆☆☆☆☆"}</span>
                  <span>Đã trảm: <b>${I.kills||0}</b> con</span>
                </div>

                <!-- PROGRESS BAR -->
                <div class="bar-track" style="height: 5px; margin-bottom: 8px;">
                  <div class="bar-fill" style="width: ${I.tierProgress||0}%; background: ${R}"></div>
                </div>
                ${z?`
                  <div class="text-xs" style="color: #ef4444; font-weight: 700; margin-bottom: 6px;">
                    👑 Đạt cảnh giới Tuyệt Diệt tối cao!
                  </div>
                `:`
                  <div class="text-dim text-xs" style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span>Tiến độ lên Tầng ${I.nextTier}</span>
                    <span>${I.kills}/${I.nextTierReq} kills</span>
                  </div>
                `}

                <!-- STATS PREVIEW (Revealed at Tier 1+) -->
                ${q?`
                  <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin: 8px 0;">
                    🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá thông tin sinh mệnh và thuộc tính!
                  </div>
                `:`
                  <div class="monster-stats-box">
                    <div class="monster-stat-cell">HP: <b>${E.stats.hp}</b></div>
                    <div class="monster-stat-cell">Công: <b>${E.stats.strength}</b></div>
                    <div class="monster-stat-cell">Thủ: <b>${E.stats.defense}</b></div>
                    <div class="monster-stat-cell">Tốc: <b>${E.stats.speed}</b></div>
                    <div class="monster-stat-cell">Thân: <b>${E.stats.dexterity}</b></div>
                    <div class="monster-stat-cell">XP: <b>+${E.xpReward}</b></div>
                  </div>
                `}
              </div>

              <!-- ACTIVE BUFFS -->
              <div>
                ${I.tier>=2?`
                  <div class="monster-buff-active">
                    ✨ <b>Khắc chế đang kích hoạt:</b><br/>
                    ${I.desc}
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
    `},x=()=>{if(!u)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `;const{craftingLevel:y,craftingXp:T,xpToNext:w,progressPercent:S,title:H,badgeColor:P,perks:M,recipes:E}=u;return`
      <!-- HERO BANNER -->
      <div class="crafting-hero">
        <div class="crafting-hero-header">
          <div class="crafting-hero-title">
            <span>🔥</span>
            <span>Thông Thạo Đan Đạo & Chế Tác</span>
          </div>
          <span class="crafting-rank-badge" style="background: ${P};">
            ${H} (Lv.${y})
          </span>
        </div>

        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
          <span>Kinh Nghiệm Luyện Chế: <b>${T} / ${w} XP</b></span>
          <span style="color: var(--gold);">${S}%</span>
        </div>
        <div class="bar-track" style="height: 8px; margin-bottom: 12px;">
          <div class="bar-fill" style="width: ${S}%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
        </div>
        <div class="text-dim text-xs">Mỗi lần luyện chế thành công hoặc thất bại đều tích lũy đan đạo chi lực, tôi luyện trình độ đan sư.</div>

        <!-- CRAFTING PERKS -->
        <div class="crafting-perks-grid">
          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🎯</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Tỷ Lệ Thành Công</div>
              <div class="crafting-perk-val">+${M.successBonusPct}% tỷ lệ luyện thành</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">✨</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Xác Suất Đại Thành</div>
              <div class="crafting-perk-val">${M.critQualityChance}% (Tinh / Cực / Thiên Phẩm)</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🛡️</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Bảo Toàn Dược Liệu</div>
              <div class="crafting-perk-val">Thu hồi ${M.materialReturnRate}% khi nổ lò</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🌟</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Thiên Phẩm Đan</div>
              <div class="crafting-perk-val">${M.canCraftDivine?"✅ Đã kích hoạt (+50% chỉ số)":"🔒 Yêu cầu Lv.76+"}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- RECIPES & CRAFTING SHORTCUT -->
      <div class="panel">
        <div class="panel-title" style="display: flex; justify-content: space-between; align-items: center;">
          <span>📜 Đan Phương & Công Thức Chế Tác (${E.length})</span>
        </div>
        <div class="panel-body">
          <div class="shop-items-grid">
            ${E.map(I=>{const q=I.materials||[],z=q.every(O=>(f.materials[O.id]||0)>=O.amount),R=(f.gold||0)>=(I.cost||0),G=z&&R;return`
                <div class="shop-item-card">
                  <div class="shop-item-header">
                    <div>
                      <div class="shop-item-name">${I.name}</div>
                      <div class="shop-item-rarity text-dim">Tầng ${I.tier||1} • Cơ bản ${I.successRate}%</div>
                    </div>
                    <span class="badge" style="background: rgba(208, 165, 48, 0.15); color: var(--gold);">
                      Tốn ${I.cost||0} 💰
                    </span>
                  </div>
                  <div class="shop-item-desc" style="margin-bottom: 8px;">
                    Dược liệu yêu cầu:<br/>
                    ${q.map(O=>{const N=f.materials[O.id]||0;return`<span style="color: ${N>=O.amount?"var(--green)":"var(--red)"}; font-size: 11px;">• ${O.id} (${N}/${O.amount})</span>`}).join("<br/>")}
                  </div>
                  <div class="shop-item-footer">
                    <span class="text-xs text-dim">${I.craftTime?`Thời gian: ${I.craftTime}s`:"Lập tức"}</span>
                    <button class="btn btn--sm ${G?"btn--gold":"btn--outline"} btn-craft-action" data-rid="${I.id}" ${G?"":"disabled"}>
                      ${G?"🔥 Luyện Chế":"Thiếu Liệu"}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `},i=async()=>{if(k==="library"){n.innerHTML=`
        ${l()}
        <div id="library-container"></div>
      `,m();const y=n.querySelector("#library-container");y&&X(y,t);return}if(k==="glitch"){n.innerHTML=`
        ${l()}
        <div id="glitch-container"></div>
      `,m();const y=n.querySelector("#glitch-container");y&&at(y,t);return}if(n.innerHTML=`
      ${l()}
      <div id="pillar-content">
        ${k==="combat"?r():""}
        ${k==="monsters"?a():""}
        ${k==="crafting"?x():""}
      </div>
    `,m(),L(),k==="monsters"&&!b)try{b=await d.getMonsterMastery(f.id);const y=n.querySelector("#pillar-content");y&&(y.innerHTML=a(),L())}catch(y){o("Không thể tải Bách Thú Đồ Giám: "+y.message,"error")}if(k==="crafting"&&!u)try{u=await d.getCraftingMastery(f.id);const y=n.querySelector("#pillar-content");y&&(y.innerHTML=x(),L())}catch(y){o("Không thể tải Thông Thạo Chế Tạo: "+y.message,"error")}},m=()=>{n.querySelectorAll(".pillar-tab").forEach(T=>{T.addEventListener("click",()=>{k=T.dataset.pillar,localStorage.setItem("activeSkillPillar",k),i()})});const y=n.querySelector("#btn-open-library");y&&y.addEventListener("click",()=>{k="library",localStorage.setItem("activeSkillPillar","library"),i()})},L=()=>{n.querySelectorAll("[data-sfilter]").forEach(y=>{y.addEventListener("click",()=>{h=y.dataset.sfilter,i()})}),n.querySelectorAll("[data-mrealm]").forEach(y=>{y.addEventListener("click",()=>{c=y.dataset.mrealm;const T=n.querySelector("#pillar-content");T&&(T.innerHTML=a(),L())})}),n.querySelectorAll(".equip-btn").forEach(y=>{y.addEventListener("click",async()=>{try{const T=y.dataset.sid,w=y.dataset.eq==="1",S=await d.equipSkill(f.id,T,w);e.player=S.player,o(S.message,"success"),i()}catch(T){o(T.message||"Lỗi trang bị pháp quyết","error")}})}),n.querySelectorAll(".btn-craft-action").forEach(y=>{y.addEventListener("click",async()=>{const T=y.dataset.rid;y.disabled=!0,y.innerText="Đang luyện...";try{const w=await d.craftItem(f.id,T);w.player&&(e.player=w.player),o(w.message,w.success?"success":"warning"),u=await d.getCraftingMastery(f.id),i()}catch(w){o(w.message||"Lỗi luyện chế","error"),y.disabled=!1,y.innerText="🔥 Luyện Chế"}})})};i()}function Ct(n,t){return t==="manual"?"📜":n==="weapon"?"⚔️":n==="body"?"🥋":n==="shield"?"🛡️":n==="feet"?"👢":n==="ring"?"💍":"📦"}function Z(n,t){let e="",d="";if(n.slot==="weapon"){let v=0,$=0;(n.affixes||[]).forEach(k=>{k.stat==="strength"&&k.type==="flat"&&(v+=k.value),k.stat==="dexterity"&&k.type==="flat"&&($+=k.value)}),v===0&&(v=n.itemLevel*2+5),$===0&&($=n.itemLevel+10),e=`⚔️ ${v}`,d=`🎯 ${$}`}else if(n.slot==="body"||n.slot==="shield"||n.slot==="feet"){let v=0;(n.affixes||[]).forEach($=>{$.stat==="defense"&&$.type==="flat"&&(v+=$.value)}),v===0&&(v=n.itemLevel*3),e=`🛡️ ${v}`}else if(n.slot==="ring"){let v=0;(n.affixes||[]).forEach($=>{$.stat==="capacity"&&(v+=$.value)}),e=v>0?`🎒 +${v}`:""}const o=(n.affixes||[]).map(v=>Et(v)).map(v=>`<span class="badge badge-dim">${v}</span>`).join(" "),f=n.description||`Một vật phẩm loại ${n.slot} cấp ${n.itemLevel} thuộc phẩm chất ${n.rarity}. Khí tức tỏa ra không tồi.`,p=n.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${n.craftedBy}</strong></div>`:"",s=t?n.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${n.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${n.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${n.rarity}"></span>
          <span class="item-name rarity-${n.rarity}" style="font-size:14px">${n.name}</span>
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${e?`<span style="color:var(--text-light)">${e}</span>`:""}
          ${d?`<span style="color:var(--text-light)">${d}</span>`:""}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05)">
        <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
          ${Ct(n.slot,n.category)}
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
          ${p}
          <div class="mt-2 flex justify-end">
            ${s}
          </div>
        </div>
      </div>
    </div>`}function Et(n){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[n.stat]||n.stat,d=n.value>=0?"+":"";return n.type==="flat"?`${d}${n.value} ${e}`:n.type==="increase"?`${d}${n.value}% ${e}`:n.type==="more"?`×${d}${n.value}% ${e}`:`${d}${n.value} ${e}`}function Q(n,t){var r,a,x,i,m,L,y;const{state:e,api:d,notify:o,renderGame:f}=t,p=Object.values(e.player.equipment||{}),s=e.player,v=e.medicines||[],$=s.medCooldownRemaining||0,k=e.inventoryTab||"equipped",h=s.skills&&s.skills.some(T=>{const w=typeof T=="string"?T:T.id;return w==="duoc_ly"||w==="y_thuat"}),c=p.find(T=>T.slot==="ring1"),b=p.find(T=>T.slot==="ring2");let u=20;((c==null?void 0:c.id)==="tui_tru_vat"||(r=c==null?void 0:c.baseType)!=null&&r.includes("tru_vat"))&&(u+=((x=(a=c.affixes)==null?void 0:a[0])==null?void 0:x.value)||10),((b==null?void 0:b.id)==="tui_tru_vat"||(i=b==null?void 0:b.baseType)!=null&&i.includes("tru_vat"))&&(u+=((L=(m=b.affixes)==null?void 0:m[0])==null?void 0:L.value)||10),n.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(s.inventory||[]).length} / ${u})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${k==="equipped"?"btn--blue":"btn--dark"}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${k==="weapon"?"btn--blue":"btn--dark"}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${k==="armor"?"btn--blue":"btn--dark"}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${k==="accessory"?"btn--blue":"btn--dark"}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${k==="manual"?"btn--blue":"btn--dark"}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${k==="medicine"?"btn--blue":"btn--dark"}" data-tab="medicine">
          Đan Dược ${$>0?`<span style="color:var(--orange); font-size:11px">(${$}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),l=()=>{g.querySelectorAll("[data-eid]").forEach(T=>{T.addEventListener("click",async w=>{w.stopPropagation();try{const S=await d.equipItem(e.playerId,T.dataset.eid);e.player=S.player,o(S.message,"success"),f()}catch(S){o(S.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(T=>{T.addEventListener("click",async w=>{w.stopPropagation();try{const S=await d.useItem(e.playerId,T.dataset.use);e.player=S.player,o(S.message,"success"),f()}catch(S){o(S.message||"Lỗi sử dụng","error")}})})};if(k==="equipped"){const T=s.equipment||{},w=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${w.map(S=>{const H=T[S.key],P=H&&H.id,M=P?`rarity-${H.rarity}`:"";return`
            <div style="background:${P?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${P?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${S.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${S.name}</div>
              ${P?`<div style="font-size:11px;font-weight:600" class="${M}">${H.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${H.rarity}] Lv${H.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${p.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${p.filter(S=>S&&S.id).map(S=>Z(S,!1)).join("")}
      `:""}
    `,l()}else if(k==="medicine")g.innerHTML=`
      <div style="padding:12px">
        ${$>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${$}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${$/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${v.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':v.map(T=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${T.icon||"💊"} ${T.name}</div>
                <div class="item-meta">
                  ${T.description}
                  ${T.healPercent?` · Phục hồi ${T.healPercent}% HP`:""}
                  ${T.cooldownAdd?` · Sinh Đan độc ${T.cooldownAdd}s`:""}
                  ${T.duration?` · Hiệu lực ${T.duration} trận`:""}
                  ${T.toxicity&&h?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${T.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${T.penalty&&h?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${T.penalty.map(w=>`Giảm ${Math.abs(w.value)*100}% ${w.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${T.id}" 
                ${$+(T.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(T=>{T.addEventListener("click",async()=>{try{const w=await d.useMedicine(e.playerId,T.dataset.med);e.player=w.player,o(w.message,"success"),f()}catch(w){o(w.message||"Đan độc quá nồng!","error")}})});else{const T=s.inventory||[];let w=[];k==="weapon"?w=T.filter(S=>S.slot==="weapon"&&S.category!=="manual"):k==="armor"?w=T.filter(S=>["body","shield","feet"].includes(S.slot)):k==="accessory"?w=T.filter(S=>["ring","amulet","ring1","ring2"].includes(S.slot)):k==="manual"&&(w=T.filter(S=>S.category==="manual")),g.innerHTML=`
      ${w.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':w.map(S=>Z(S,!0)).join("")}
    `,l()}n.querySelectorAll("[data-tab]").forEach(T=>{T.addEventListener("click",()=>{e.inventoryTab=T.dataset.tab,Q(n,t)})}),(y=document.getElementById("btnGen"))==null||y.addEventListener("click",async()=>{const T=["common","rare","epic","legendary"];try{const w=await d.generateItem(e.playerId,T[Math.floor(Math.random()*T.length)]);e.player=w.player,e.items=w.items||[],o(w.message,"success"),Q(n,t)}catch{o("Lỗi tạo ngẫu nhiên","error")}})}function rt(n,t){const{state:e,api:d,notify:o,updateSidebar:f,renderGame:p}=t,s=e.playerId;e._dungeon||(e._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const v=e._dungeon;async function $(){try{const[l,r]=await Promise.all([d.getMapItems(s),d.getDungeonHistory(s)]);v.mapItems=l.mapItems||[],v.activeRun=l.activeRun||null,v.history=r.history||[],v.loaded=!0,k()}catch(l){o(l.message||"Lỗi tải Bí Cảnh","error")}}function k(){n.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${v.activeRun?h():c()}

      ${v.lastResult?b():""}

      ${u()}
    `,g()}function h(){var x,i;const l=v.activeRun,r=l.currentWave===l.totalWaves,a=((l.currentWave-1)/l.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${l.dungeonName||l.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${a}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${l.currentWave}/${l.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((x=e.player)==null?void 0:x.hospitalRemaining)>0?"disabled":""}>
              ${r?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+l.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((i=e.player)==null?void 0:i.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function c(){return v.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${v.mapItems.map(l=>{const r=l.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${l.item.icon} ${l.item.name} <span style="opacity:0.5">x${l.quantity}</span></div>
                  ${r?`
                    <div class="item-meta">
                      ${r.name} · T${r.tier} · ${r.waves+1} tầng · Boss: ${r.bossName}
                    </div>
                  `:""}
                </div>
                ${r?`<button class="btn btn--sm btn--gold" data-enter="${l.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function b(){var x,i;const l=v.lastResult,r=l.result==="dungeon_complete"?"🏆":l.result==="wave_cleared"?"✅":"💀",a=l.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${a}">
        <div class="panel-title" style="color:${a}">${r} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${l.message}</div>
          ${(x=l.loot)!=null&&x.length?`
            <div style="margin-bottom:8px">
              ${l.loot.map(m=>`<div style="font-size:12px;color:var(--green)">🎁 ${m}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((i=l.combatLog)==null?void 0:i.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(l.combatLog||[]).map(m=>`<div>${m}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function u(){return v.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${v.history.map(l=>{const r=l.status==="completed"?"✅":l.status==="failed"?"❌":l.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${l.status==="completed"?"var(--green)":l.status==="failed"?"var(--red)":"var(--orange)"}">${r} ${l.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${l.wave}/${l.totalWaves} · ${new Date(l.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function g(){var l,r;document.querySelectorAll("[data-enter]").forEach(a=>{a.addEventListener("click",async()=>{const x=a.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){a.disabled=!0;try{const i=await d.enterDungeon(s,x);o(i.message,"success"),e.player=i.player,f(),v.activeRun=i.run,v.lastResult=null,await $()}catch(i){o(i.message,"error"),a.disabled=!1}}})}),(l=document.getElementById("btnFight"))==null||l.addEventListener("click",async()=>{const a=document.getElementById("btnFight");a.disabled=!0,a.textContent="⏳ Đang chiến đấu...";try{const x=await d.fightDungeonWave(s);e.player=x.player,f(),v.lastResult=x,x.result==="dungeon_complete"||x.result==="dungeon_failed"?v.activeRun=null:x.result==="wave_cleared"&&(v.activeRun.currentWave=x.nextWave),k()}catch(x){o(x.message,"error"),a.disabled=!1,a.textContent="⚔️ Chiến Đấu"}}),(r=document.getElementById("btnAbandon"))==null||r.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await d.abandonDungeon(s),o("Đã rời khỏi Bí Cảnh.","info"),v.activeRun=null,v.lastResult=null,await $()}catch(a){o(a.message,"error")}})}v.loaded?k():$()}function dt(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const s=e._tc;async function v(){try{s.data=await d.request(`/player/${p}/atlas-maps`),s.loaded=!0,$()}catch(g){o(g.message,"error")}}function $(){const g=s.data,l=(g==null?void 0:g.atlas)||{},r=(g==null?void 0:g.maps)||[],a=g==null?void 0:g.activeRun,x=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,n.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${l.completed||0}/${l.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${l.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${l.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${l.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${s.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${s.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${r.length})</button>
        ${a?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,n.querySelectorAll("[data-tab]").forEach(m=>{m.addEventListener("click",()=>{s.tab=m.dataset.tab,$()})});const i=document.getElementById("tcContent");i&&(a&&s.tab==="run"?b(i,a):s.tab==="inventory"?h(i,r):k(i,x,l))}function k(g,l,r){var x;const a=((x=s.data)==null?void 0:x.tiers)||[];g.innerHTML=a.map(i=>{const m=l.filter(L=>L.tier===i.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${i.tier} ${i.name} <span style="opacity:0.4;font-size:11px">(Realm ${i.requiredRealm}+, ${i.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${m.map(L=>{var w;const y=((w=r.progress)==null?void 0:w[L.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[L.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${y?700:400}">${L.name}</span>
                ${y?`<span style="color:var(--green);font-size:11px">✅ ×${y}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function h(g,l,r){if(l.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=l.map((a,x)=>{const i=a.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${u(a.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${a.mapName||a.mapId} <span style="color:${u(a.tier)};font-size:12px">T${a.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${i.length>0?i.map(m=>m.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${i.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${x}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${x}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(a=>{a.addEventListener("click",async()=>{try{const x=await d.request(`/player/${p}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(a.dataset.idx)})});o(x.message,"success"),e.player=x.player,f(),s.tab="run",await v()}catch(x){o(x.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(a=>{a.addEventListener("click",()=>c(parseInt(a.dataset.idx)))})}function c(g){var a;const l=((a=s.data)==null?void 0:a.modifiers)||[],r=document.createElement("div");r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",r.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${l.map(x=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${x.id}">
          <span style="flex:1"><strong>${x.name}</strong><br><span style="font-size:11px;opacity:0.6">${x.desc} · IIQ +${x.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,r.addEventListener("click",async x=>{const i=x.target.closest("[data-modid]");if(i)try{const m=await d.request(`/player/${p}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:i.dataset.modid})});o(m.message,"success"),e.player=m.player,f(),r.remove(),await v()}catch(m){o(m.message,"error")}else x.target===r&&r.remove()}),document.body.appendChild(r)}function b(g,l){var x,i;const r=l.currentWave/l.totalWaves*100,a=l.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${l.mapName} <span style="color:${u(l.tier)}">T${l.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${l.currentWave}/${l.totalWaves}
            ${a.length>0?" · "+a.map(m=>m.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${r}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${s.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(x=document.getElementById("btnTCFight"))==null||x.addEventListener("click",async()=>{s.fighting=!0,$();try{const m=await d.request(`/player/${p}/atlas-maps/fight`,{method:"POST"});e.player=m.player,f();const L=m.result!=="map_failed";o(m.message,L?"success":"error"),s.fighting=!1,(m.result==="map_complete"||m.result==="map_failed")&&(s.tab="atlas"),await v()}catch(m){o(m.message,"error"),s.fighting=!1,$()}}),(i=document.getElementById("btnTCQuit"))==null||i.addEventListener("click",async()=>{try{await d.request(`/player/${p}/atlas-maps/abandon`,{method:"POST"}),o("Đã rời Tiên Cảnh","info"),s.tab="atlas",await v()}catch(m){o(m.message,"error")}})}function u(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}s.loaded?$():v()}function lt(n,t){const{state:e}=t,d=e._travelTab||"map";n.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Ngao Du Bát Hoang</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên, chinh phục bí cảnh và tầm bảo tiên cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${d==="map"?"active":""}" data-tab="map" style="flex:1;padding:10px;border:none;background:${d==="map"?"rgba(255,255,255,0.08)":"transparent"};color:${d==="map"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${d==="map"?"700":"400"};border-bottom:2px solid ${d==="map"?"var(--gold)":"transparent"};transition:all 0.2s">
        🗺️ Bản Đồ Bát Hoang
      </button>
      <button class="tab-btn ${d==="dungeon"?"active":""}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${d==="dungeon"?"rgba(255,255,255,0.08)":"transparent"};color:${d==="dungeon"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${d==="dungeon"?"700":"400"};border-bottom:2px solid ${d==="dungeon"?"var(--gold)":"transparent"};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
      <button class="tab-btn ${d==="tiencanh"?"active":""}" data-tab="tiencanh" style="flex:1;padding:10px;border:none;background:${d==="tiencanh"?"rgba(255,255,255,0.08)":"transparent"};color:${d==="tiencanh"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${d==="tiencanh"?"700":"400"};border-bottom:2px solid ${d==="tiencanh"?"var(--gold)":"transparent"};transition:all 0.2s">
        🌌 Tiên Cảnh (Atlas)
      </button>
    </div>
    <div id="travelTabContent"></div>
  `,n.querySelectorAll(".tab-btn").forEach(f=>{f.addEventListener("click",()=>{e._travelTab=f.dataset.tab,lt(n,t)})});const o=n.querySelector("#travelTabContent");d==="map"?K(o,t):d==="dungeon"?rt(o,t):dt(o,t)}async function K(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t;n.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[p,s]=await Promise.all([d.request("/data/areas"),d.request(`/player/${e.playerId}/area`)]),v=p.areas||[],$=s.area,k=s.player,h=s.traveling||!1,c=s.travelRemaining||0,b=s.travelDestination||"";s.message&&o(s.message,"success"),s.player&&(e.player=s.player,f());const u=e.exploration||{},g=u[(k==null?void 0:k.currentArea)||"thanh_lam_tran"],l=($==null?void 0:$.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",r=(g==null?void 0:g.staminaCost)||10,a={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận",cuu_u_than_uyen:"👿 Cửu U ma khí: +35% ST, +20% Tốc Độ",thai_co_hong_hoang:"🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp",chu_thien_tinh_hai:"🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn",hon_don_tien_vuc:"🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số",hon_nguyen_dao_canh:"👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính"},x=a[k==null?void 0:k.currentArea]||"",i=[...v].sort((m,L)=>(m.sort_order||m.mapY||0)-(L.sort_order||L.mapY||0));if(n.innerHTML=`
      ${h?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${b}</span></strong>
            <div id="travelTimer" style="font-size:26px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 12px rgba(255,215,0,0.4)">⏳ ${c}s</div>
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
                  ${l}
                  <span class="badge" style="background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.4);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${r} TL/lần</div>
              </div>
            </div>
            ${$!=null&&$.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${$.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${($==null?void 0:$.min_level)||1}+</span>
              ${x?`<span class="badge" style="background:rgba(255,215,0,0.1);color:var(--gold);border:1px solid rgba(255,215,0,0.25);font-size:11px">${x}</span>`:""}
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
            ${i.map((m,L)=>{const y=u[m.id],T=m.id===k.currentArea&&!h,w=k.level<(m.min_level||1),S=parseInt(m.travel_time)||0,H=parseInt(m.stamina_cost)||(y==null?void 0:y.staminaCost)||10,P=a[m.id]||"",M=m.tier||"Bát Hoang",E=H>=100?"rgba(239,68,68,0.2)":H>=40?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)",I=H>=100?"var(--red)":H>=40?"var(--gold)":"var(--text-dim)";let q="rgba(255,255,255,0.08)",z="rgba(255,255,255,0.03)";return T?(q="rgba(34, 197, 94, 0.6)",z="rgba(34, 197, 94, 0.08)"):w&&(q="rgba(239, 68, 68, 0.2)",z="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${T?"current-realm":""} ${w?"locked-realm":""}" 
                     style="border:1px solid ${q}; background:${z}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${T?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${T?"var(--green)":w?"var(--text-dim)":"var(--text-bright)"}">
                        #${L+1} ${m.name}
                      </div>
                      ${w?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      🏛️ ${M}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${m.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${w?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${w?"var(--red)":"var(--text-dim)"}">
                        Lv.${m.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${S>0?`⏱ ${S}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${E}; color:${I}; border:1px solid ${E}">
                        🏃 -${H} TL (Dò thám)
                      </span>
                    </div>

                    ${P?`
                      <div style="font-size:10px; color:var(--gold); background:rgba(255,215,0,0.05); padding:3px 6px; border-radius:4px; margin-bottom:10px; border-left:2px solid var(--gold)">
                        ${P}
                      </div>
                    `:""}
                  </div>

                  <div style="margin-top:auto">
                    ${T?`
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(34,197,94,0.2); color:var(--green); border:1px solid rgba(34,197,94,0.4)">
                        📍 Đang tọa trấn
                      </button>
                    `:w?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${m.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${m.id}" ${h?"disabled":""}>
                        ${S>0?`🚶 Vi Hành (${S}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll("[data-travel]").forEach(m=>{m.addEventListener("click",async L=>{L.stopPropagation();const y=m.dataset.travel;n.querySelectorAll("[data-travel]").forEach(T=>{T.tagName==="BUTTON"&&(T.disabled=!0),T.style.pointerEvents="none"});try{const T=await d.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:y})});T.player&&(e.player=T.player,f()),o(T.message,"success"),K(n,t)}catch(T){o(T.message||"Lỗi di chuyển!","error"),K(n,t)}})}),h&&c>0){let m=c;const L=c,y=setInterval(async()=>{m--;const T=document.getElementById("travelTimer"),w=document.getElementById("travelBar");if(T&&(T.textContent=`⏳ ${Math.max(0,m)}s`),w&&(w.style.width=`${Math.max(0,m/L*100)}%`),m<=0){clearInterval(y);try{const S=await d.request(`/player/${e.playerId}/travel-check`,{method:"POST"});S.player&&(e.player=S.player,f()),S.arrived&&o(S.message,"success"),K(n,t)}catch{K(n,t)}}},1e3)}}catch(p){n.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(p)}}function J(n,t){var a,x;const{state:e,renderGame:d,notify:o,updateSidebar:f}=t,p=e.player,s=e.recipes||[],v=e.medicines||[],$=e._alchemyTab||"recipes",k=i=>{const m=v.find(L=>L.id===i);return m?(m.icon||"💊")+" "+m.name:i};let h=0,c=0,b=0,u=0;(p.skills||[]).forEach(i=>{const m=typeof i=="string"?i:i.id,L=typeof i=="string"?1:i.level||1;m==="tinh_che"&&(h=L*2),m==="phu_an_thuat"&&(c=L*5),m==="linh_kiem_thuat"&&(b=L*10),m==="cuong_hoa_thuat"&&(u=L*15)});const g=i=>i.split("_").map(m=>m.charAt(0).toUpperCase()+m.slice(1)).join(" "),l=[];Object.values(p.equipment||{}).forEach(i=>{i&&l.push({...i,loc:"eq"})}),(p.inventory||[]).filter(i=>i.slot&&i.slot!=="consumable").forEach(i=>l.push({...i,loc:"inv"}));let r=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${$==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${$==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${h||c||b||u?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${h?`<span>🔥 Thành công +${h}%</span>`:""}
      ${c?`<span>💎 Giảm phí -${c}%</span>`:""}
      ${b?`<span>✨ Chất lượng +${b}%</span>`:""}
      ${u?`<span>⬆️ Nâng đôi ${u}%</span>`:""}
    </div>
    `:""}
  `;if($==="recipes"){if(r+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!p.materials||Object.keys(p.materials).length===0)r+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[i,m]of Object.entries(p.materials))r+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(i)} <span style="color:var(--gold)">x${m}</span></div>`;r+="</div></div>",r+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',s.length===0?r+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':s.forEach(i=>{var S;const m=k(i.target),L=Math.min(100,(i.successRate||100)+h);let y="";(S=i.requirements)!=null&&S.skill&&(y=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(i.requirements.skill)} lv${i.requirements.level||1}</div>`);let T="";i.materials.forEach(H=>{var M;const P=((M=p.materials)==null?void 0:M[H.id])||0;T+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${P>=H.amount?"var(--green)":"var(--red)"};font-weight:bold">${P}/${H.amount}</span> ${g(H.id)}</span>`});const w=v.find(H=>H.id===i.target)||{};r+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${m}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${i.tier}</span>
                  <span>Tỉ lệ: <span style="color:${L>=80?"var(--green)":"var(--blue)"};font-weight:bold">${L}%</span></span>
                  <span>🔥 Phí: ${i.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${y}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${T}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${w.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${i.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),r+="</div></div>"}else r+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${l.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${l.map(i=>`<option value="${i.id}">${i.loc==="eq"?"🔸":"📦"} ${i.name||i.baseType} [${i.rarity||"?"}] ${(i.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(i=>{const m=Math.max(1,Math.round(i.cost*(1-c/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${i.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${i.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${i.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${i.id}" style="width:100%">
                💎 ${m} ${c>0?`<s style="opacity:0.4;font-size:10px">${i.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;n.innerHTML=r,n.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{e._alchemyTab=i.dataset.tab,J(n,t)})}),n.querySelectorAll(".accordion-header").forEach(i=>{i.addEventListener("click",()=>{const m=i.nextElementSibling;m.style.display==="none"?(m.style.display="block",i.querySelector(".text-dim:last-child").textContent="▲"):(m.style.display="none",i.querySelector(".text-dim:last-child").textContent="▼")})}),n.querySelectorAll(".btn-craft").forEach(i=>{i.addEventListener("click",async m=>{m.stopPropagation();const L=s.find(y=>y.id===i.dataset.recipe);if(L&&p.gold<(L.cost||0))return o("Không đủ linh thạch!","error");try{const y=await B.craftItem(p.id,i.dataset.recipe);e.player=y.player,o(y.message,y.success?"success":"error"),d()}catch(y){o(y.message,"error")}})}),n.querySelectorAll(".btn-currency").forEach(i=>{i.addEventListener("click",async()=>{const m=document.getElementById("selItem");if(!(m!=null&&m.value))return o("Chọn trang bị trước!","error");const L=i.dataset.cid;let y=-1;if(L==="thien_menh_phu"){const T=l.find(H=>H.id===m.value),w=(T==null?void 0:T.affixes)||[];if(w.length===0)return o("Item không có affix để khóa!","error");const S=prompt(`Chọn affix để khóa (0-${w.length-1}):
${w.map((H,P)=>`${P}: ${H.name||H.stat} +${H.value}`).join(`
`)}`);if(S===null)return;if(y=parseInt(S),isNaN(y)||y<0||y>=w.length)return o("Chỉ số không hợp lệ!","error")}i.disabled=!0,i.textContent="⏳...";try{const T=await B.applyCurrency(p.id,L,m.value,y);o(T.message,"success"),e.player=T.player,f(),J(n,t)}catch(T){o(T.message,"error"),i.disabled=!1,i.textContent="💎 Dùng"}})}),(a=document.getElementById("selItem"))==null||a.addEventListener("change",()=>{const i=l.find(L=>L.id===document.getElementById("selItem").value),m=document.getElementById("itemPreview");i&&m&&(m.innerHTML=(i.affixes||[]).map(L=>`<span style="color:var(--blue)">• ${L.name||L.stat} +${L.value}</span>`).join(" | ")||"Không có affix")}),(x=document.getElementById("selItem"))==null||x.dispatchEvent(new Event("change"))}function ot(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;async function s(){try{const $=await d.getDailyQuests(p);e._dailyQuests=$,v()}catch($){o($.message,"error")}}function v(){const $=e._dailyQuests||{},k=$.quests||[];$.allCompleted;const h=$.bonusReward;n.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${k.map(c=>{const b=c.quest_info||{},u=c.target>0?Math.min(100,Math.round(c.progress/c.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${c.claimed?"var(--text-dim)":c.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${b.name||c.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${b.difficulty==="Khó"?"var(--red)":b.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${b.difficulty||"?"}</span>
              </div>
              ${c.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':c.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${c.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${c.progress}/${c.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${b.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${u}%;background:${c.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${b.goldReward||0} · ✨ ${b.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${h?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${h.gold} 💎, +${h.xp} EXP</div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-claim").forEach(c=>c.addEventListener("click",async()=>{try{const b=await d.claimDailyQuest(p,parseInt(c.dataset.qid));o(b.message,"success"),e.player=b.player,f(),await s()}catch(b){o(b.message,"error")}}))}s()}function ct(n,t){const{state:e,api:d,notify:o,renderGame:f}=t,p=e._questTab||"npc";n.innerHTML=`
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
  `,n.querySelectorAll("[data-qtab]").forEach($=>{$.addEventListener("click",()=>{e._questTab=$.dataset.qtab,ct(n,t)})});const s=n.querySelector("#questTabContent");if(p==="daily"){ot(s,t);return}v();async function v(){try{const k=(await d.getQuests(e.playerId)).quests||[],h=document.getElementById("questList");if(!h)return;if(k.length===0){h.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}h.innerHTML=k.map(c=>{const b=c.questAmount>0?Math.min(100,c.progress/c.questAmount*100):0,u=c.progress>=c.questAmount,g=c.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${u?"quest-done":""}" data-quest-id="${c.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${c.npcIcon||"🧓"} ${c.npcName||"NPC"}</span>
              <span class="quest-type">${g} ${c.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${c.questName||c.quest_id}</div>
            <div class="quest-desc">${c.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${u?"hp":"energy"}" style="width:${b}%"></div>
              </div>
              <span class="quest-progress-text">${c.progress}/${c.questAmount}</span>
            </div>
            ${u?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${c.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),h.querySelectorAll(".quest-complete-btn").forEach(c=>{c.addEventListener("click",async()=>{const b=c.dataset.qid;c.disabled=!0,c.textContent="⏳...";try{const u=await d.completeQuest(e.playerId,b);e.player=u.player,o(u.message,"success"),u.skillGained&&o(`🎯 Lĩnh ngộ: ${u.skillGained}!`,"success"),f()}catch(u){o(u.message||"Lỗi trả quest","error"),c.disabled=!1,c.textContent="✅ Trả Nhiệm Vụ"}})})}catch($){console.error("Error loading quests:",$);const k=document.getElementById("questList");k&&(k.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function Ht(n,t){const{state:e,api:d,notify:o,renderGame:f}=t;if(e.player.role!=="admin"){n.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const p=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let s="monsters";n.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${p.map(r=>`
          <button class="admin-tab ${r.id===s?"active":""}" data-tab="${r.id}">${r.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",r=>{const a=r.target.closest(".admin-tab");a&&(s=a.dataset.tab,document.querySelectorAll(".admin-tab").forEach(x=>x.classList.remove("active")),a.classList.add("active"),v(s))}),v(s);async function v(r){const a=document.getElementById("adminContent");if(a){a.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const x=await d.request(`/admin/${r}?adminId=${e.playerId}`);$(r,x,a)}catch(x){a.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${x.message}</div></div>`}}}function $(r,a,x){r==="monsters"?k(a,x):r==="npcs"?h(a,x):r==="areas"?c(a,x):b(r,a,x)}function k(r,a){const x=r.monsters||[];a.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${x.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${x.map(i=>{var m,L,y,T,w,S,H,P;return`
          <div class="admin-card" data-id="${i.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${i.name} ${i.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((L=(m=r.tierInfo)==null?void 0:m[i.tier])==null?void 0:L.color)||"#888"}">${((T=(y=r.tierInfo)==null?void 0:y[i.tier])==null?void 0:T.name)||"T"+i.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((w=i.stats)==null?void 0:w.hp)||"?"}</div>
              <div>💪 ${((S=i.stats)==null?void 0:S.strength)||"?"}</div>
              <div>🏃 ${((H=i.stats)==null?void 0:H.speed)||"?"}</div>
              <div>🛡 ${((P=i.stats)==null?void 0:P.defense)||"?"}</div>
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
    `,g(a,r,"monsters","monsters")}function h(r,a){const x=r.npcs||[];a.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${x.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${x.map(i=>`
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
    `,g(a,r,"npcs","npcs")}function c(r,a){const x=Object.keys(r);a.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${x.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${x.map(i=>{const m=r[i];return`
            <div class="admin-card" data-id="${i}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${m.name||i}</span>
                <span class="badge" style="background:var(--orange)">⚡${m.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(m.events||[]).map(L=>`<span>${L.type}: ${L.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${i}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,a.querySelectorAll(".admin-edit-area").forEach(i=>{i.addEventListener("click",()=>{const m=i.dataset.id,L=r[m];u(m,L,`areas/${m}`)})})}function b(r,a,x){var L;const i=JSON.stringify(a,null,2),m=i.split(`
`).length;x.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${r} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(m+5,30)}">${l(i)}</textarea>
    `,(L=document.getElementById("btnSaveGeneric"))==null||L.addEventListener("click",async()=>{try{const y=document.getElementById("genericEditor").value,T=JSON.parse(y);o("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(y){o("JSON không hợp lệ: "+y.message,"error")}})}function u(r,a,x,i){const m=JSON.stringify(a,null,2),L=document.createElement("div");L.className="admin-modal-overlay",L.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${r}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${l(m)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(L),L.querySelectorAll(".admin-modal-close").forEach(y=>{y.addEventListener("click",()=>L.remove())}),L.addEventListener("click",y=>{y.target===L&&L.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const y=document.getElementById("modalEditor").value,T=JSON.parse(y);await d.request(`/admin/${x}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:T})}),o("✅ Đã lưu!","success"),L.remove(),v(s)}catch(y){o("Lỗi: "+y.message,"error")}})}function g(r,a,x,i){r.querySelectorAll(".admin-edit-btn").forEach(m=>{m.addEventListener("click",()=>{const L=m.dataset.id,T=(a[i]||[]).find(w=>w.id===L);T&&u(L,T,`${x}/${L}`)})})}function l(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function pt(n,t){const{state:e,api:d,notify:o,renderGame:f,updateSidebar:p}=t,s=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const v=e._social;async function $(){try{const g=await d.getRelationships(s);v.relationships=g,v.loaded=!0,k()}catch(g){o(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function k(){const{friends:g,enemies:l,pendingSent:r,pendingReceived:a}=v.relationships,x=a.length;n.innerHTML=`
      <div class="page-header">
        <h2>🤝 Đạo Hữu</h2>
        <p class="page-sub">Kết bạn bè, đánh dấu kẻ thù, giao lưu giang hồ</p>
      </div>

      <!-- Search -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="socialSearch" placeholder="Tìm người chơi theo tên..." 
                 value="${v.searchQuery}" 
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSearch">🔍 Tìm</button>
        </div>
        ${v.searchResults.length>0?`
          <div style="margin-top:12px">
            ${v.searchResults.map(i=>`
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
        `:v.searchQuery?'<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>':""}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${v.tab==="friends"?"btn--blue":"btn--dark"}" data-tab="friends">
          🤝 Đạo Hữu (${g.length})
        </button>
        <button class="btn btn--sm ${v.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${l.length})
        </button>
        <button class="btn btn--sm ${v.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${x>0?`<span class="badge">${x}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${v.tab==="friends"?h(g):""}
        ${v.tab==="enemies"?c(l):""}
        ${v.tab==="pending"?b(a,r):""}
      </div>
    `,u()}function h(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(l=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${l.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${l.level} · ${l.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${l.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${l.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function c(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(l=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${l.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${l.level} · ${l.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${l.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${l.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function b(g,l){let r="";return g.length>0&&(r+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',r+=g.map(a=>`
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
      `).join("")),l.length>0&&(r+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',r+=l.map(a=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${a.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${a.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&l.length===0&&(r='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),r}function u(){var g,l;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var a;const r=(a=document.getElementById("socialSearch"))==null?void 0:a.value.trim();if(!r||r.length<2)return o("Cần ít nhất 2 ký tự","error");v.searchQuery=r;try{const x=await d.searchPlayers(r);v.searchResults=x.players||[],k()}catch(x){o(x.message,"error")}}),(l=document.getElementById("socialSearch"))==null||l.addEventListener("keydown",r=>{var a;r.key==="Enter"&&((a=document.getElementById("btnSearch"))==null||a.click())}),document.querySelectorAll("[data-tab]").forEach(r=>{r.addEventListener("click",()=>{v.tab=r.dataset.tab,k()})}),document.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",async()=>{const a=r.dataset.action,x=r.dataset.target;r.disabled=!0;try{let i;switch(a){case"add-friend":i=await d.addFriend(s,x);break;case"accept-friend":i=await d.acceptFriend(s,x);break;case"reject-friend":i=await d.rejectFriend(s,x);break;case"remove-friend":i=await d.removeFriend(s,x);break;case"add-enemy":i=await d.addEnemy(s,x);break;case"remove-enemy":i=await d.removeEnemy(s,x);break}o(i.message||"Thành công!","success"),await $()}catch(i){o(i.message||"Lỗi!","error"),r.disabled=!1}})})}v.loaded?k():$()}function gt(n,t){const{state:e,api:d,notify:o}=t,f=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const p=e._chat;async function s(){try{const[l,r]=await Promise.all([d.getGlobalChat(),d.getChatFriends(f)]);p.globalMessages=l.messages||[],p.friends=r.friends||[],p.globalMessages.length>0&&(p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id),p.loaded=!0,k(),v()}catch(l){o(l.message||"Lỗi tải chat","error")}}function v(){$(),p.pollTimer=setInterval(async()=>{try{if(p.tab==="global"){const l=await d.getGlobalChat(p.lastGlobalId);l.messages&&l.messages.length>0&&(p.globalMessages.push(...l.messages),p.globalMessages.length>100&&(p.globalMessages=p.globalMessages.slice(-100)),p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id,c(),b())}else if(p.tab==="private"&&p.selectedFriend){const l=await d.getPrivateChat(f,p.selectedFriend.id,p.lastPrivateId);l.messages&&l.messages.length>0&&(p.privateMessages.push(...l.messages),p.privateMessages.length>100&&(p.privateMessages=p.privateMessages.slice(-100)),p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id,c(),b())}}catch{}},5e3)}function $(){p.pollTimer&&(clearInterval(p.pollTimer),p.pollTimer=null)}function k(){const l=p.tab==="global"?p.globalMessages:p.privateMessages;n.innerHTML=`
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
            ${p.friends.map(r=>{var a;return`<option value="${r.id}" ${((a=p.selectedFriend)==null?void 0:a.id)===r.id?"selected":""}>${r.name} (Lv.${r.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${h(l)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${p.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),b()}function h(l){return l.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':l.map(r=>{const a=r.sender_id===f,x=new Date(r.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${a?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${x}</span>
          <span style="font-weight:600;color:${a?"var(--blue)":"var(--gold)"}"> ${r.sender_name}</span>
          <span style="opacity:0.8">: ${u(r.message)}</span>
        </div>
      `}).join("")}function c(){const l=document.getElementById("chatMessages");if(!l)return;const r=p.tab==="global"?p.globalMessages:p.privateMessages;l.innerHTML=h(r)}function b(){const l=document.getElementById("chatMessages");l&&(l.scrollTop=l.scrollHeight)}function u(l){const r=document.createElement("div");return r.textContent=l,r.innerHTML}function g(){var r,a,x;document.querySelectorAll("[data-chat-tab]").forEach(i=>{i.addEventListener("click",()=>{p.tab=i.dataset.chatTab,p.tab==="global"&&(p.lastGlobalId=p.globalMessages.length>0?p.globalMessages[p.globalMessages.length-1].id:0),k(),v()})}),(r=document.getElementById("friendSelect"))==null||r.addEventListener("change",async i=>{const m=i.target.value;if(!m){p.selectedFriend=null,p.privateMessages=[],k();return}p.selectedFriend=p.friends.find(L=>L.id===m)||null,p.lastPrivateId=0;try{const L=await d.getPrivateChat(f,m);p.privateMessages=L.messages||[],p.privateMessages.length>0&&(p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id),c(),b()}catch(L){o(L.message,"error")}});const l=async()=>{var L,y;const i=document.getElementById("chatInput"),m=i==null?void 0:i.value.trim();if(m){if(p.tab==="private"&&!p.selectedFriend)return o("Chọn Đạo Hữu trước!","error");try{if(await d.sendChat(f,p.tab,p.tab==="private"?p.selectedFriend.id:null,m),i.value="",p.tab==="global"){const T=await d.getGlobalChat(p.lastGlobalId);((L=T.messages)==null?void 0:L.length)>0&&(p.globalMessages.push(...T.messages),p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id)}else{const T=await d.getPrivateChat(f,p.selectedFriend.id,p.lastPrivateId);((y=T.messages)==null?void 0:y.length)>0&&(p.privateMessages.push(...T.messages),p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id)}c(),b()}catch(T){o(T.message||"Lỗi gửi tin nhắn","error")}}};(a=document.getElementById("btnSend"))==null||a.addEventListener("click",l),(x=document.getElementById("chatInput"))==null||x.addEventListener("keydown",i=>{i.key==="Enter"&&l()})}t.renderGame,p.loaded?(k(),v()):s()}function ut(n,t){const{state:e,api:d,notify:o,updateSidebar:f,renderGame:p}=t,s=e.playerId,v=e._auctionTab||"browse";async function $(){try{const[c,b]=await Promise.all([d.getAuctions(),d.getMyAuctions(s)]);e._auctionListings=c.listings||[],e._auctionMine=b.listings||[],k()}catch(c){o(c.message,"error")}}function k(){const c=e._auctionListings||[],b=e._auctionMine||[],u=(e.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");n.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${v==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${v==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${v==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${b.length})</button>
      </div>

      ${v==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':c.map(g=>{const l=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${l.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${l.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${g.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${g.id}">💎 ${g.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:v==="sell"?`
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
          ${b.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':b.map(g=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(g.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${g.status==="active"?"var(--green)":g.status==="sold"?"var(--gold)":"var(--red)"}">${g.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${g.buyout_price}</div>
                </div>
                ${g.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${g.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,h()}function h(){var c;n.querySelectorAll(".tab-btn").forEach(b=>b.addEventListener("click",()=>{e._auctionTab=b.dataset.tab,$()})),n.querySelectorAll(".btn-buy").forEach(b=>b.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const u=await d.buyAuction(s,parseInt(b.dataset.lid));o(u.message,"success"),e.player=u.player,f(),await $()}catch(u){o(u.message,"error")}})),n.querySelectorAll(".btn-cancel").forEach(b=>b.addEventListener("click",async()=>{try{const u=await d.cancelAuction(s,parseInt(b.dataset.lid));o(u.message,"success"),e.player=u.player,f(),await $()}catch(u){o(u.message,"error")}})),(c=document.getElementById("btnListItem"))==null||c.addEventListener("click",async()=>{var l,r,a;const b=(l=document.getElementById("selSellItem"))==null?void 0:l.value,u=parseInt(((r=document.getElementById("inpPrice"))==null?void 0:r.value)||"500"),g=parseInt(((a=document.getElementById("selDuration"))==null?void 0:a.value)||"24");try{const x=await d.listAuction(s,b,u,g);o(x.message,"success"),e.player=x.player,f(),e._auctionTab="mine",await $()}catch(x){o(x.message,"error")}})}$()}function Pt(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const s=e._market;async function v(){try{const[l,r]=await Promise.all([d.getMarketListings(s.filter,s.sort),d.getMyListings(p)]);s.listings=l.listings||[],s.myListings=r.listings||[],s.loaded=!0,k()}catch(l){o(l.message||"Lỗi tải Giao Dịch Đài","error")}}async function $(){try{const[l,r]=await Promise.all([d.getMugTargets(p),d.getMugLog(p)]);s.mugTargets=l.targets||[],s.mugCooldown=l.mugCooldown||0,s.mugLog=r.logs||[],k()}catch(l){o(l.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function k(){const l=e.player;if(n.innerHTML=`
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

      ${s.showListForm?u(l):""}

      ${s.tab==="browse"?h():s.tab==="my"?c():s.tab==="auction"?'<div id="auctionSubContent"></div>':b()}
    `,g(),s.tab==="auction"){const r=n.querySelector("#auctionSubContent");r&&ut(r,t)}}function h(){let l=`
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
    `,r=s.listings;if(s.search.trim()){const a=s.search.toLowerCase().trim();r=r.filter(x=>{var i;return x.item_name.toLowerCase().includes(a)?!0:(i=x.item_data)!=null&&i.affixes?x.item_data.affixes.some(m=>(m.stat||"").toLowerCase().includes(a)||(m.type||"").toLowerCase().includes(a)):!1})}return r.length===0?l+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(l+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',l+=r.map(a=>{var y,T;const x=a.item_type==="item"?"⚔️":a.item_type==="material"?"🧱":"💊",i=((y=a.item_data)==null?void 0:y.rarity)||"",m=a.seller_id===p,L=(T=a.item_data)!=null&&T.affixes?a.item_data.affixes.map(w=>`${w.stat} ${w.type==="flat"?"+":""}${w.value}${w.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${x}
                <span style="color:var(--gold)">${a.item_name}</span>
                ${a.quantity>1?`<span style="opacity:0.5"> x${a.quantity}</span>`:""}
                ${i?`<span class="rarity-${i}" style="font-size:11px;margin-left:4px">[${i}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${a.seller_name}</span>
                ${L?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${L}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${a.price}${a.quantity>1?"/cái":""}</span>
              ${m?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${a.id}" data-qty="${a.quantity}" data-price="${a.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),l+="</div></div>"),l}function c(){if(s.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let l='<div class="panel"><div class="panel-body no-pad">';return l+=s.myListings.map(r=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${r.item_type==="item"?"⚔️":r.item_type==="material"?"🧱":"💊"} ${r.item_name} ${r.quantity>1?`<span style="opacity:0.5">x${r.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${r.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${r.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),l+="</div></div>",l}function b(){let l=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${s.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${s.mugCooldown}s</div>`:""}
    `;return s.mugTargets.length===0?l+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':l+=s.mugTargets.map(r=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${r.gender==="female"?"♀":"♂"} ${r.name}</div>
            <div class="item-meta">Lv.${r.level} · ${r.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${r.id}" ${s.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),l+="</div></div>",s.mugLog.length>0&&(l+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${s.mugLog.map(r=>{const a=r.attacker_id===p,x=r.outcome==="success"?"✅":"❌",i=r.outcome==="success"?"var(--green)":"var(--red)",m=a?r.outcome==="success"?`Cướp ${r.victim_name}: +${r.gold_stolen} 💎`:`Phục kích ${r.victim_name} thất bại!`:r.outcome==="success"?`Bị ${r.attacker_name} cướp: -${r.gold_stolen} 💎`:`${r.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${i}">${x} ${m} <span style="opacity:0.4;margin-left:auto">${new Date(r.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),l}function u(l){const r=Object.entries(l.materials||{}).map(([m,L])=>({id:m,qty:L,type:"material",name:m})),a=Object.entries(l.medicines||{}).map(([m,L])=>({id:m,qty:L,type:"medicine",name:m})),x=(l.inventory||[]).map(m=>({id:m.id,qty:1,type:"item",name:m.name||m.id})),i=[...r,...a,...x];return`
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
    `}function g(){var l,r,a,x;document.querySelectorAll("[data-mtab]").forEach(i=>{i.addEventListener("click",()=>{if(s.tab=i.dataset.mtab,s.tab==="mug"&&s.mugTargets.length===0){$();return}k()})}),(l=document.getElementById("btnShowList"))==null||l.addEventListener("click",()=>{s.showListForm=!s.showListForm,k()}),document.querySelectorAll("[data-filter]").forEach(i=>{i.addEventListener("click",async()=>{s.filter=i.dataset.filter,await v()})}),(r=document.getElementById("sortSelect"))==null||r.addEventListener("change",async i=>{s.sort=i.target.value,await v()}),(a=document.getElementById("searchInput"))==null||a.addEventListener("input",i=>{s.search=i.target.value,k();const m=document.getElementById("searchInput");m&&(m.focus(),m.setSelectionRange(s.search.length,s.search.length))}),(x=document.getElementById("btnConfirmList"))==null||x.addEventListener("click",async()=>{var w,S,H;const i=(w=document.getElementById("listItem"))==null?void 0:w.value;if(!i)return;const[m,L]=i.split("|"),y=parseInt((S=document.getElementById("listQty"))==null?void 0:S.value)||1,T=parseInt((H=document.getElementById("listPrice"))==null?void 0:H.value)||0;if(T<=0)return o("Giá phải lớn hơn 0!","error");try{const P=await d.listForSale(p,m,L,y,T);o(P.message,"success"),e.player=P.player,f(),s.showListForm=!1,await v()}catch(P){o(P.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(i=>{i.addEventListener("click",async()=>{const m=parseInt(i.dataset.buy),L=parseInt(i.dataset.qty),y=parseInt(i.dataset.price);let T=1;if(L>1){const w=prompt(`Mua bao nhiêu? (tối đa ${L}, giá ${y} 💎/cái)`,"1");if(!w)return;T=Math.min(parseInt(w)||1,L)}i.disabled=!0;try{const w=await d.buyFromMarket(p,m,T);o(w.message,"success"),e.player=w.player,f(),await v()}catch(w){o(w.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(i=>{i.addEventListener("click",async()=>{i.disabled=!0;try{const m=await d.cancelListing(p,parseInt(i.dataset.cancel));o(m.message,"success"),e.player=m.player,f(),await v()}catch(m){o(m.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(i=>{i.addEventListener("click",async()=>{const m=i.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){i.disabled=!0,i.textContent="⏳...";try{const L=await d.mugPlayer(p,m);o(L.message,L.success?"success":"error"),e.player=L.player,f(),await $()}catch(L){o(L.message,"error"),i.disabled=!1,i.textContent="💀 Phục Kích"}}})})}s.tab==="mug"?$():s.loaded?k():v()}function It(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;let s=!1,v=null;async function $(){try{v=await d.getRealmInfo(p),s=!0,k()}catch(b){o(b.message||"Lỗi tải Cảnh Giới","error")}}function k(){if(!v)return;const b=v.current,u=v.allRealms||[],g=e.player,l=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;n.innerHTML=`
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${b.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${b.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${b.color}">${b.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Cảnh Giới Bậc ${b.tier} · ${b.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${g.level} — ${g.xp}/${g.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${l}%;background:${b.color}"></div></div>
        </div>

        ${b.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(b.bonuses).filter(([,r])=>r>0).map(([r,a])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${a} ${r}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${b.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${b.unlocks.map(r=>`<span style="font-size:12px;opacity:0.7">✅ ${r}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${b.canBreakthrough?h(b):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${u.map(r=>{const a=r.tier===b.tier,x=r.tier<b.tier,m=r.tier>b.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${a?`2px solid ${r.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${m};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${r.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${r.color}">${r.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${r.levelMin}+</span>
                ${r.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${r.failChance}% thất bại</span>`:""}
                ${x?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${a?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,c()}function h(b){const u=b.nextRealm;if(!u)return"";const g=u.cost?`💎 ${u.cost.gold} + 🔮 ${u.cost.energy}`:"Miễn phí";return`
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
          Bonus mới: ${Object.entries(u.bonuses).filter(([,l])=>l>0).map(([l,r])=>`+${r} ${l}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${u.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function c(){var b;(b=document.getElementById("btnBreakthrough"))==null||b.addEventListener("click",async()=>{const u=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){u.disabled=!0,u.textContent="⏳ Đang đột phá...";try{const g=await d.attemptBreakthrough(p);g.success?(o(g.message,"success"),e.player=g.player,f(),await $()):(o(g.message,"error"),g.player&&(e.player=g.player,f()),await $())}catch(g){o(g.message||"Lỗi đột phá","error"),u.disabled=!1,u.textContent="⚡ ĐỘT PHÁ"}}})}$()}function Mt(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t;Nt(n,t)}async function Nt(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t;n.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const s=(await d.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,f()),s.length===0){n.innerHTML=`
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
            ${s.map(v=>{const $=new Date(v.created_at*1e3),k=$.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),h=$.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let c="📌";return c={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[v.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${k}</div>
                    <div>${h}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${c}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${v.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${v.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(p){n.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${p.message}</div></div>`}}function qt(n,t){const{state:e,api:d,notify:o,updateSidebar:f,renderGame:p}=t,s=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const v=e._housing;async function $(){try{const u=await d.getHousing(s);v.data=u,v.loaded=!0,k()}catch(u){o(u.message||"Lỗi tải Động Phủ","error")}}function k(){const u=v.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${u.owned?c(u):h(u)}
    `,b()}function h(u){const g=u.tiers[1];return`
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
    `}function c(u){const g=u.gardenSlots||[],l=u.gardenHerbs||{};return`
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
            ${Array.from({length:u.maxSlots},(r,a)=>{const x=g[a]||{},i=!!x.herb,m=x.ready,L=x.remaining||0,y=Math.ceil(L/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${m?"var(--green)":i?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${i?`
                    <div style="font-size:20px">${m?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${x.herbName||x.herb}</div>
                    <div style="font-size:10px;color:${m?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${m?"✅ Sẵn sàng!":"⏳ "+y+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${a}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(l).map(([T,w])=>`<option value="${T}">${w.name}</option>`).join("")}
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
            ${Object.entries(u.formations).map(([r,a])=>{const x=a.currentLevel>=a.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${a.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${a.icon}</span>
                      <strong style="margin-left:4px">${a.name}</strong>
                      ${a.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${a.currentLevel}</span>`:""}
                    </div>
                    ${a.canBuild?x?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${r}">
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
    `}function b(){var u,g,l,r;(u=document.getElementById("btnBuyHouse"))==null||u.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const a=await d.buyHousing(s);o(a.message,"success"),e.player=a.player,f(),await $()}catch(a){o(a.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const a=await d.buyHousing(s);o(a.message,"success"),e.player=a.player,f(),await $()}catch(a){o(a.message,"error")}}),document.querySelectorAll(".plant-select").forEach(a=>{a.addEventListener("change",async x=>{const i=x.target.value;if(!i)return;const m=parseInt(a.dataset.slot);try{const L=await d.plantHerb(s,i,m);o(L.message,"success"),await $()}catch(L){o(L.message,"error")}})}),(l=document.getElementById("btnHarvest"))==null||l.addEventListener("click",async()=>{try{const a=await d.harvestGarden(s);o(a.message,"success"),e.player=a.player,f(),await $()}catch(a){o(a.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(a=>{a.addEventListener("click",async()=>{const x=a.dataset.fid;a.disabled=!0,a.textContent="⏳...";try{const i=await d.upgradeFormation(s,x);o(i.message,"success"),e.player=i.player,f(),await $()}catch(i){o(i.message,"error"),a.disabled=!1,a.textContent="⬆ Nâng"}})}),(r=document.getElementById("btnMaintenance"))==null||r.addEventListener("click",async()=>{try{const a=await d.payMaintenance(s);o(a.message,"success"),e.player=a.player,f(),await $()}catch(a){o(a.message,"error")}})}v.loaded?k():$()}function _t(n,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function d(){n.innerHTML=`
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
    `,n.querySelectorAll("[data-tab]").forEach(f=>{f.addEventListener("click",()=>{e._wikiTab=f.dataset.tab,d()})})}function o(f){return{lore:`
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
      `}[f]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}d()}function Bt(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const s=e._npcShop;let v=parseInt(localStorage.getItem("npcShopIdx")||"0");async function $(){try{n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const c=await d.getShops(p);s.shops=c.shops||[],s.tax=c.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},s.loaded=!0,v>=s.shops.length&&(v=0),k()}catch(c){o(c.message||"Lỗi tải shop","error")}}function k(){var r;if(s.shops.length===0){n.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const c=s.shops[v]||s.shops[0],b=s.shops.map((a,x)=>`
      <button class="skill-tab ${x===v?"active":""}" data-shop-idx="${x}">
        ${a.icon||"🧓"} ${a.name}
      </button>
    `).join(""),u={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},g={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},l=(c.items||[]).map(a=>{var y,T;const x=u[a.rarity||"common"]||"#888",i=g[a.rarity||"common"]||"Phàm",m=(a.remainingStock??1)<=0,L=(((y=e.player)==null?void 0:y.gold)??0)>=(a.currentPrice||0);return`
        <div class="shop-item-card ${m?"out-of-stock":""}" style="border-left:3px solid ${x}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${x}">${a.name}</div>
              <div class="shop-item-rarity" style="color:${x}">${i} · Tầng ${a.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${m?"var(--red)":"var(--green)"}">
                ${m?"❌ Hết hàng":`📦 ${a.remainingStock}/${a.dailyStock}`}
              </span>
            </div>
          </div>
          ${a.description?`<div class="shop-item-desc">${a.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${L?"":"too-expensive"}">
              💎 ${((T=a.currentPrice)==null?void 0:T.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${c.id}" data-item="${a.id}" 
                value="1" min="1" max="${a.remainingStock||1}" 
                ${m?"disabled":""}>
              <button class="btn btn--sm ${m?"":L?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${c.id}" data-item="${a.id}"
                ${m||!L?"disabled":""}>
                ${m?"❌":L?"🛒 Mua":"💸 Thiếu"}
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
        <div class="shop-info-tag">💎 ${(((r=e.player)==null?void 0:r.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${c.area||"Không rõ"}</div>
      </div>

      ${s.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${b}</div>`:""}

      <div class="shop-items-grid">
        ${l||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,h()}function h(){n.querySelectorAll(".skill-tab[data-shop-idx]").forEach(c=>{c.addEventListener("click",()=>{v=parseInt(c.dataset.shopIdx),localStorage.setItem("npcShopIdx",v),k()})}),n.querySelectorAll(".btn-buy").forEach(c=>{c.addEventListener("click",async()=>{const b=c.dataset.shop,u=c.dataset.item,g=n.querySelector(`.buy-qty[data-shop="${b}"][data-item="${u}"]`),l=parseInt((g==null?void 0:g.value)||1);c.disabled=!0,c.textContent="⏳...";try{const r=await d.buyFromShop(p,b,u,l);o(r.message,"success"),e.player=r.player,f(),await $()}catch(r){o(r.message,"error"),c.disabled=!1,c.textContent="🛒 Mua"}})})}s.loaded?k():$()}function zt(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const s=e._guild;async function v(){try{s.data=await d.getMyGuild(p),s.loaded=!0,k()}catch(u){o(u.message||"Lỗi","error")}}async function $(){try{const u=await d.listGuilds();s.allGuilds=u.guilds||[],k()}catch(u){o(u.message,"error")}}function k(){const u=s.data;n.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${u!=null&&u.inGuild?c(u):h(u)}
    `,b()}function h(u){return`
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
    `}function c(u){var a;const g=u.guild,l=u.members||[],r=u.log||[];return`
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
                Buff: ${Object.entries(g.buffs).map(([x,i])=>`${x} +${i}%`).join(", ")}
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
            ${r.slice(0,10).map(x=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(x.created_at).toLocaleString("vi")}</span>
                ${x.detail||x.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${l.length}/${g.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${l.map(x=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${x.role==="leader"?"👑":x.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${x.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${x.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${u.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function b(){var u,g,l,r,a,x;(u=document.getElementById("btnCreate"))==null||u.addEventListener("click",async()=>{var y,T,w,S,H,P;const i=(T=(y=document.getElementById("guildName"))==null?void 0:y.value)==null?void 0:T.trim(),m=(S=(w=document.getElementById("guildTag"))==null?void 0:w.value)==null?void 0:S.trim(),L=(P=(H=document.getElementById("guildDesc"))==null?void 0:H.value)==null?void 0:P.trim();if(!i||!m)return o("Nhập tên và tag!","error");try{const M=await d.createGuild(p,i,m,L);o(M.message,"success"),e.player=M.player,f(),s.loaded=!1,await v()}catch(M){o(M.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",$),document.querySelectorAll(".btn-join").forEach(i=>{i.addEventListener("click",async()=>{try{const m=await d.joinGuild(p,parseInt(i.dataset.gid));o(m.message,"success"),s.loaded=!1,await v()}catch(m){o(m.message,"error")}})}),(l=document.getElementById("btnContribute"))==null||l.addEventListener("click",async()=>{var m;const i=parseInt(((m=document.getElementById("contributeAmt"))==null?void 0:m.value)||0);if(!(i<=0))try{const L=await d.contributeGuild(p,i);o(L.message,"success"),e.player=L.player,f(),await v()}catch(L){o(L.message,"error")}}),(r=document.getElementById("btnUpgradeGuild"))==null||r.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const i=await d.upgradeGuild(p);o(i.message,"success"),await v()}catch(i){o(i.message,"error")}}),(a=document.getElementById("btnPayUpkeep"))==null||a.addEventListener("click",async()=>{try{const i=await d.payGuildUpkeep(s.data.guild.id);o(i.message,"success"),await v()}catch(i){o(i.message,"error")}}),(x=document.getElementById("btnLeave"))==null||x.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const i=await d.leaveGuild(p);o(i.message,"success"),s.loaded=!1,await v()}catch(i){o(i.message,"error")}})}s.loaded?k():v()}function Rt(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const s=e._profile;function v(){n.innerHTML=`
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

      ${s.viewing?$(s.viewing):""}

      ${s.results.length>0&&!s.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${s.results.length})</div>
        <div class="panel-body no-pad">
          ${s.results.map(c=>`
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
      `:!s.viewing&&s.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,k()}function $(c){var l,r,a;const b=c.id===p,u=c.maxHp>0?Math.round(c.currentHp/c.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((l=c.name[0])==null?void 0:l.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${c.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${c.level} · ${((r=c.realmInfo)==null?void 0:r.fullName)||"Phàm Nhân"}
                ${c.guild?` · <span style="color:var(--blue)">[${c.guild.tag}] ${c.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${g[c.currentArea]||c.currentArea}
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
              <div style="height:100%;width:${u}%;background:${u>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(a=c.gold)==null?void 0:a.toLocaleString()} 💎</strong></div>

          ${b?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${c.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${c.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function k(){var c,b,u,g,l;(c=document.getElementById("btnSearch"))==null||c.addEventListener("click",h),(b=document.getElementById("searchInput"))==null||b.addEventListener("keydown",r=>{r.key==="Enter"&&h()}),document.querySelectorAll(".btn-view, [data-view]").forEach(r=>{r.addEventListener("click",async()=>{const a=r.dataset.vid||r.dataset.view;try{const x=await d.getPlayerProfile(a);s.viewing=x.profile,v()}catch(x){o(x.message,"error")}})}),(u=document.getElementById("btnAttack"))==null||u.addEventListener("click",async()=>{const r=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${s.viewing.name}?`))try{const a=await d.mugPlayer(p,r);o(a.message,a.won?"success":"error"),a.player&&(e.player=a.player,f())}catch(a){o(a.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const r=document.getElementById("btnAddFriend").dataset.tid;try{const a=await d.addFriend(p,r);o(a.message||"Đã gửi lời mời!","success")}catch(a){o(a.message,"error")}}),(l=document.getElementById("btnBackSearch"))==null||l.addEventListener("click",()=>{s.viewing=null,v()})}async function h(){var u;const c=document.getElementById("searchInput"),b=(u=c==null?void 0:c.value)==null?void 0:u.trim();if(!b||b.length<2)return o("Nhập ít nhất 2 ký tự!","error");s.searchQuery=b,s.viewing=null;try{const g=await d.searchPlayers(b);s.results=g.players||[],v()}catch(g){o(g.message,"error")}}v()}function Ot(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const s=e._arena;async function v(){try{s.data=await d.getArena(p),s.loaded=!0,$()}catch(h){o(h.message,"error")}}function $(){var r,a,x,i,m,L,y,T;const h=s.data,c=(h==null?void 0:h.arena)||{},b=c.rank||{},u=parseInt(c.streak)||0,g=u>=5?`🔥x${u}`:u>=3?`⚡x${u}`:u>0?`${u}W`:u<0?`${Math.abs(u)}L`:"",l=u>=5?"var(--gold)":u>=3?"var(--orange)":u>0?"var(--green)":u<0?"var(--red)":"var(--text-dim)";n.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid ${b.color||"#666"}">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px;text-shadow:0 0 12px ${b.color||"#666"}">${b.icon||"🛡️"}</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Rank</div>
            <div style="font-weight:800;font-size:18px;color:${b.color||"#fff"}">${b.name||"Chưa xếp hạng"}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px">
              ELO: <strong>${c.rating||1e3}</strong> · ${c.wins||0}W/${c.losses||0}L
              ${g?` · <span style="color:${l};font-weight:700">${g}</span>`:""}
            </div>
            ${b.nextThreshold?`
              <div style="margin-top:6px">
                <div style="font-size:10px;opacity:0.4">Tiến trình → ${b.nextThreshold} ELO</div>
                <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:3px;overflow:hidden">
                  <div style="background:${b.color||"#666"};height:100%;width:${b.progress||0}%;border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            `:'<div style="font-size:10px;opacity:0.4;margin-top:4px">🏆 Đỉnh cao! Thiên Đạo Đệ Nhất!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${(r=s.lastResult)!=null&&r.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(a=s.lastResult.newRank)==null?void 0:a.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(x=s.lastResult.newRank)==null?void 0:x.name}!</div>
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
            (ELO ${(L=s.lastResult.opponent)==null?void 0:L.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${s.lastResult.ratingChange>0?"+":""}${s.lastResult.ratingChange}
            ${s.lastResult.goldEarned>0?` · +${s.lastResult.goldEarned} 💎`:""}
          </div>
          ${(y=s.lastResult.combatLog)!=null&&y.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${s.lastResult.combatLog.map(w=>`<div>${w}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(h.opponents||[]).length>0?(h.opponents||[]).map(w=>{var S,H,P;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((S=w.rank)==null?void 0:S.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${w.name} <span style="opacity:0.4;font-size:11px">Lv.${w.level}</span></div>
                <div style="font-size:11px;color:${((H=w.rank)==null?void 0:H.color)||"#888"}">${((P=w.rank)==null?void 0:P.name)||"Đồng"} · ELO ${w.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${w.player_id}" ${s.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${s.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${h.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(h.top10||[]).map((w,S)=>{var H,P;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${S<3?"var(--gold)":"var(--text-dim)"}">#${S+1}</span>
                <span>${((H=w.rank)==null?void 0:H.icon)||""}</span>
                <span style="flex:1">${w.name}</span>
                <span style="color:${((P=w.rank)==null?void 0:P.color)||"var(--blue)"}; font-weight:600">${w.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(h.history||[]).map(w=>{const S=w.winner_id===p;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${S?"var(--green)":"var(--red)"}">
                  ${S?"✅":"❌"} vs ${w.attacker_id===p?w.defender_name:w.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${w.rating_change>0?"+":""}${w.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelectorAll(".btn-fight-opp").forEach(w=>{w.addEventListener("click",S=>k(S.target.dataset.oid))}),(T=document.getElementById("btnRandomFight"))==null||T.addEventListener("click",()=>k(null))}async function k(h){s.fighting=!0,$();try{const c=await d.request(`/player/${p}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:h})});s.lastResult=c,e.player=c.player,f(),o(c.message,c.won?"success":"error"),s.fighting=!1,await v()}catch(c){o(c.message,"error"),s.fighting=!1,$()}}s.loaded?$():v()}function At(n,t){const{state:e,api:d,notify:o,updateSidebar:f}=t,p=e.playerId;async function s(){try{e._worldBoss=await d.getWorldBoss(),v()}catch($){o($.message,"error")}}function v(){var g;const $=e._worldBoss||{},k=$.boss||{},h=$.hpPercent||0,c=$.topContributors||[],b=$.rewards||{},u=k.status==="active"&&k.current_hp>0;n.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${u?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${k.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${k.level||"?"} · ${u?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(k.current_hp||0).toLocaleString()} / ${(k.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${h}%;background:${h>50?"var(--red)":h>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${u?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${b.gold||0} · ✨ ${b.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':c.map((l,r)=>{var a;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${r<3?"var(--gold)":"var(--text-dim)"}">#${r+1}</span>
                <span style="flex:1">${l.name}</span>
                <span style="color:var(--red)">${(a=l.total_damage)==null?void 0:a.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${l.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const l=document.getElementById("btnAttackBoss");l.disabled=!0,l.textContent="⏳ Đang giao chiến...";const r=document.getElementById("bossCombatResult");try{const a=await d.attackWorldBoss(p);if(e.player=a.player,f(),a.log&&a.log.length>0){const x=a.log.map(y=>y.startsWith("---")?`<div class="turn">${y}</div>`:y.includes("hụt")?`<div class="miss">${y}</div>`:y.includes("né được")?`<div class="dodge">${y}</div>`:y.includes("CHÍNH MẠNG")||y.includes("💥")?`<div class="crit">${y}</div>`:y.includes("🔥")?`<div class="heavy text-orange">${y}</div>`:y.includes("chặn hoàn toàn")||y.includes("🛡")?`<div class="dodge">${y}</div>`:y.includes("ngã xuống")||y.includes("💀")?`<div class="death">${y}</div>`:y.includes("Chiến thắng")||y.includes("🏆")?`<div class="victory">${y}</div>`:y.includes("bỏ chạy")||y.includes("🏃")?`<div class="flee">${y}</div>`:y.includes("Bất phân")||y.includes("🤝")?`<div class="stalemate">${y}</div>`:y.includes("🧪")?`<div class="status-effect text-purple">${y}</div>`:y.includes("💔")?`<div class="dot-damage text-purple bold">${y}</div>`:y.includes("✨")?`<div class="regen text-green">${y}</div>`:`<div class="hit">${y}</div>`).join(""),i={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},m=i[a.outcome]||i.loss,L=Math.max(0,e.player.currentHp/e.player.maxHp*100);r.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${m.icon} ${m.text}
                <span class="subtitle">${a.turns}/${a.maxTurns||25} lượt · ⚔️ ${a.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${m.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${L}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${k.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(a.bossHp/a.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${a.bossHp.toLocaleString()}/${a.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${x}</div>
            </div>`}a.defeated?o(a.message,"success"):o(`⚔️ ${a.damage} dmg!`,"info"),await s()}catch(a){o(a.message,"error"),l.disabled=!1,l.textContent="⚔️ Tấn Công"}})}s()}function Gt(n,t){const{state:e,api:d,notify:o,updateSidebar:f,renderGame:p}=t,s=e.playerId,v={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function $(){var h;try{const[c,b]=await Promise.all([d.getGachaPools(),d.getGachaPity(s)]);e._gacha={pools:c.pools||{},pity:b.pity||{},results:((h=e._gacha)==null?void 0:h.results)||[]},k()}catch(c){o(c.message,"error")}}function k(){const h=e._gacha||{},c=h.pools||{},b=h.pity||{},u=h.results||[];n.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(c).map(([g,l])=>{var a,x,i;const r=b[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${l.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${v.legendary}">★ ${(a=l.rates)==null?void 0:a.legendary}%</span> ·
                <span style="color:${v.rare}">◆ ${(x=l.rates)==null?void 0:x.rare}%</span> ·
                <span style="color:${v.uncommon}">● ${(i=l.rates)==null?void 0:i.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${r.pulls_since_rare||0}/${l.pityRare} · Legend: ${r.pulls_since_legendary||0}/${l.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="1">💎 ${l.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="10">💎 ${l.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${u.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${u.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${u.map(g=>{var l,r,a,x;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${v[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((l=g.item)==null?void 0:l.slot)==="weapon"?"⚔️":((r=g.item)==null?void 0:r.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${v[g.rarity]}">${((a=g.item)==null?void 0:a.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((x=g.item)==null?void 0:x.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,n.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const l=g.dataset.pool,r=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const a=await d.gachaPull(e.playerId,l,r);o(a.message,"success"),e.player=a.player,f(),e._gacha.results=a.results||[],e._gacha.pity[l]=a.pity,k()}catch(a){o(a.message,"error"),g.disabled=!1}}))}$()}function jt(n,t){const{state:e,api:d,notify:o}=t;e._lbTab||(e._lbTab="level");async function f(){const s=e._lbTab||"level";n.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const v=await d.getLeaderboard(s);e._lbData=v,p()}catch(v){n.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${v.message}
      </div></div>`}}function p(){const s=e._lbTab||"level",$=(e._lbData||{}).rankings||[],h=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(b=>`
      <button class="skill-tab ${s===b.id?"active":""}" data-tab="${b.id}">
        ${b.icon} ${b.name}
      </button>
    `).join("");let c="";$.length===0?c='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':s==="guild"?c=$.map((b,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${b.tag}] ${b.name}</div>
            <div class="lb-sub">👤 ${b.members}/${b.max_members} · Leader: ${b.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(b.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${b.level}</div>
          </div>
        </div>
      `).join(""):s==="pvp"?c=$.map((b,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${b.name}</div>
            <div class="lb-sub">Lv.${b.level} · ${b.wins||0}W/${b.losses||0}L${b.streak>0?` · 🔥${b.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${b.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):c=$.map((b,u)=>`
        <div class="lb-row ${u<3?"lb-top":""}">
          <div class="lb-rank ${u<3?"lb-rank-top":""}">${u<3?["🥇","🥈","🥉"][u]:"#"+(u+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${b.name}</div>
            <div class="lb-sub">${b.realm_tier?`Cảnh giới ${b.realm_tier}`:""} ${s==="level"?`· Lv.${b.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${s==="gold"?`💎 ${parseInt(b.gold||0).toLocaleString()}`:`Lv.${b.level}`}
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
          ${c}
        </div>
      </div>
    `,n.querySelectorAll(".skill-tab[data-tab]").forEach(b=>{b.addEventListener("click",()=>{e._lbTab=b.dataset.tab,f()})})}f()}const C={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},vt=document.getElementById("app"),W={get state(){return C},api:B,notify:j,renderGame:A,updateSidebar:Qt};async function Kt(){const n=localStorage.getItem("playerId");if(n&&!C.playerId)try{const t=await B.getPlayer(n);C.playerId=n,C.player=t.player,await D(),A();return}catch{localStorage.removeItem("playerId")}if(!C.playerId)try{const t=await B.login("admin","admin");C.playerId=t.id,C.player=t.player,localStorage.setItem("playerId",t.id),await D(),A();return}catch(t){console.warn("Dev auto-login failed. Fallback to intro UI.",t)}C.playerId?A():ht()}function ht(){var t,e;const n=C.authTab||"login";vt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(d=>{d.addEventListener("click",()=>{C.authTab=d.dataset.auth,ht()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const d=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value;if(!d||!o)return j("Vui lòng nhập đầy đủ","error");try{const f=await B.login(d,o);C.playerId=f.id,C.player=f.player,localStorage.setItem("playerId",f.id),j(f.message,"success"),await D(),A()}catch(f){j(f.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var s,v;const d=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value,f=((s=document.getElementById("inpName"))==null?void 0:s.value.trim())||"Vô Danh",p=((v=document.querySelector('input[name="gender"]:checked'))==null?void 0:v.value)||"male";if(!d||!o)return j("Vui lòng nhập đầy đủ","error");try{const $=await B.register(d,o,f,p);C.playerId=$.id,C.player=$.player,localStorage.setItem("playerId",$.id),j($.message,"success"),await D(),A()}catch($){j($.message||"Đăng ký thất bại!","error")}})}function mt(n){const t=Math.floor(Date.now()/1e3),e=[];return n.hospitalUntil&&n.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:n.hospitalUntil,color:"var(--red)"}),n.medCooldownUntil&&n.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:n.medCooldownUntil,color:"var(--orange)"}),n.travelArrivesAt&&n.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:n.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(d=>{const o=Math.max(0,d.endTime-t),f=Math.floor(o/60),p=o%60,s=f>0?`${f}p${String(p).padStart(2,"0")}s`:`${p}s`;return`<span class="status-icon" data-end="${d.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${d.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${d.color};white-space:nowrap;
      " title="${d.label}">${d.icon} <span class="cd-time">${s}</span></span>`}).join("")}
  </div>`}let F=null;function Dt(){F&&clearInterval(F),F=setInterval(()=>{const n=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),d=Math.max(0,e-n);if(d<=0){t.remove();return}const o=Math.floor(d/60),f=d%60,p=t.querySelector(".cd-time");p&&(p.textContent=o>0?`${o}p${String(f).padStart(2,"0")}s`:`${f}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function yt(n){let t="";const d={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"},cuu_u_than_uyen:{icon:"👿",tooltip:"Cửu U Ma Khí: Tăng 35% Sát Thương, 20% Tốc Độ"},thai_co_hong_hoang:{icon:"🦕",tooltip:"Hồng Hoang Cổ Khí: Tăng 25% Máu, 20% Giáp"},chu_thien_tinh_hai:{icon:"🌌",tooltip:"Tinh Tú Luân Chuyển: Tăng 30% Tốc Độ, 25% Nhanh Nhẹn"},hon_don_tien_vuc:{icon:"🔮",tooltip:"Hỗn Độn Tiên Khí: Tăng 35% Toàn Bộ Thuộc Tính"},hon_nguyen_dao_canh:{icon:"👑",tooltip:"Hỗn Nguyên Đạo Vực: Tăng 60% Sát Thương, 50% Toàn Thuộc Tính"}}[n.currentArea];return d&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${d.tooltip}">${d.icon} Cảnh Vực</span>`),n.combatBuffs&&n.combatBuffs.length>0&&n.combatBuffs.forEach(o=>{let f="💊",p="Buff";o.type==="status"&&o.stat==="poison"?(f="☠️",p="Trúng Độc"):o.type==="status"&&o.stat==="confuse"?(f="👹",p="Ma Hóa"):o.stat==="allStats"||o.stat==="hp"||o.stat==="damage"?(f="🔥",p="Cuồng Nộ"):o.stat==="defense"||o.stat==="resist"?(f="🛡️",p="Kiên Cố"):o.stat==="speed"||o.stat==="dexterity"?(f="💨",p="Thân Pháp"):(f="✨",p="Cường Hóa");let s=o.duration?` (-${o.duration} Trận)`:"",v=`Hiệu ứng: ${o.stat} (${o.type} ${o.value})${o.duration?` - Còn lại: ${o.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${v}">${f} ${p}${s}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function A(){var u,g,l,r,a,x,i,m,L;const n=C.player;if(!n)return;const t=Math.max(0,n.currentHp/n.maxHp*100),e=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,d=n.maxEnergy>0?Math.max(0,n.currentEnergy/n.maxEnergy*100):0,o=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0,f=C.exploration?C.exploration[n.currentArea||"thanh_lam_tran"]:null,p=f?f.name:"Khám Phá",s=C._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");C._collapsedNav=s;const $={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[C.currentPage];$&&(s[$]=!1),vt.innerHTML=`
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
                ${n.currentHp<n.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(g=n.skills)!=null&&g.some(y=>y.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${n.currentStamina??100}/${n.maxStamina??100}
                ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((l=n.stats)==null?void 0:l.staminaRegen)??2}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${e}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${n.currentEnergy}/${n.maxEnergy}
                ${n.currentEnergy<n.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((r=n.stats)==null?void 0:r.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${d}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>✨ Tu Vi (Cấp ${n.level})</span>
              <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${o.toFixed(1)}%)</span></span>
            </div>
            <div class="bar-track"><div class="bar-fill xp" style="width:${o}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${n.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${C.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(n.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
            </button>
            <button class="btn btn--dark nav-item ${C.currentPage==="wiki"?"active":""}" data-page="wiki" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Bách Khoa">
              📖
            </button>
            <button class="btn btn--dark nav-item ${C.currentPage==="leaderboard"?"active":""}" data-page="leaderboard" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Xếp Hạng">
              🏆
            </button>
            <button class="btn btn--dark nav-item ${C.currentPage==="social"?"active":""}" data-page="social" style="flex:1;padding:6px;font-size:14px;justify-content:center" title="Xã Hội">
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
            <li class="nav-item nav-item--hero ${C.currentPage==="combat"?"active":""}" data-page="combat">
              <span class="icon">🔍</span> Khám Phá (${p})
              <span class="badge" style="background: linear-gradient(135deg, #e8a43a, #f0c030); color: #1a1a2e; font-weight: 800; font-size: 9px; padding: 2px 6px;">CHÍNH</span>
            </li>
            <li class="nav-item ${["travel","dungeon","tiencanh"].includes(C.currentPage)?"active":""}" data-page="travel">
              <span class="icon">🗺️</span> Ngao Du Bát Hoang
              ${(n.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(C.currentPage)?"active":""}" data-page="quests">
              <span class="icon">📜</span> Thiên Cơ Nhiệm Vụ
              ${(n.activeQuests||[]).filter(y=>y.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(n.activeQuests||[]).filter(y=>y.status==="active").length}</span>`:""}
            </li>
          </div>

          <!-- PHÂN HỆ 2: TU CHÂN (Tự Thân & Tu Luyện) -->
          <li class="nav-section ${s.tuchan?"collapsed":""}" data-section="tuchan">
            <span>TU CHÂN</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${s.tuchan?"collapsed":""}" id="sec-tuchan">
            <li class="nav-item ${C.currentPage==="stats"?"active":""}" data-page="stats">
              <span class="icon">🧘</span> Tu Luyện & Cảnh Giới
              ${(x=(a=C.player)==null?void 0:a.realmInfo)!=null&&x.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite" title="Có thể đột phá!">!</span>':""}
            </li>
            <li class="nav-item ${["skills","education","library","glitch"].includes(C.currentPage)?"active":""}" data-page="skills">
              <span class="icon">⚡</span> Kỹ Năng & Lĩnh Ngộ
              ${(n.glitchInsight||0)>0?`<span class="badge" style="background: #a855f7;" title="Điểm Thấu Triệt">${n.glitchInsight}</span>`:""}
            </li>
            <li class="nav-item ${C.currentPage==="inventory"?"active":""}" data-page="inventory">
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
            <li class="nav-item ${C.currentPage==="arena"?"active":""}" data-page="arena">
              <span class="icon">⚔️</span> Luận Đạo Đấu Trường
            </li>
            <li class="nav-item ${C.currentPage==="tower"?"active":""}" data-page="tower">
              <span class="icon">🗼</span> Thiên Phần Tháp
            </li>
            <li class="nav-item ${C.currentPage==="worldboss"?"active":""}" data-page="worldboss">
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
            <li class="nav-item ${C.currentPage==="housing"?"active":""}" data-page="housing">
              <span class="icon">🏠</span> Động Phủ Tu Tiên
            </li>
            <li class="nav-item ${C.currentPage==="guild"?"active":""}" data-page="guild">
              <span class="icon">🏯</span> Tông Môn Bang Hội
            </li>
            <li class="nav-item ${C.currentPage==="alchemy"?"active":""}" data-page="alchemy">
              <span class="icon">⚒️</span> Luyện Đan & Đúc Khí
            </li>
          </div>

          <!-- PHÂN HỆ 5: THƯƠNG HỘI (Kinh Tế & Vận May) -->
          <li class="nav-section ${s.thuonghoi?"collapsed":""}" data-section="thuonghoi">
            <span>THƯƠNG HỘI</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${s.thuonghoi?"collapsed":""}" id="sec-thuonghoi">
            <li class="nav-item ${["market","auction"].includes(C.currentPage)?"active":""}" data-page="market">
              <span class="icon">🏪</span> Phường Thị & Đấu Giá
            </li>
            <li class="nav-item ${C.currentPage==="npcshop"?"active":""}" data-page="npcshop">
              <span class="icon">🧓</span> Tiên Các Thương Nhân
            </li>
            <li class="nav-item ${C.currentPage==="gacha"?"active":""}" data-page="gacha">
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
            <li class="nav-item ${C.currentPage==="admin"?"active":""}" data-page="admin">
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
      <div class="floating-popup-container" id="popupContainer" style="${C.popupOpen?"display:flex;":"display:none;"}">
        <div class="popup-header">
          <div class="popup-tabs">
            <button class="popup-tab ${C.popupPage==="chat"?"active":""}" data-popup="chat">💬 Truyền Âm</button>
            <button class="popup-tab ${C.popupPage==="social"?"active":""}" data-popup="social">🤝 Đạo Hữu</button>
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(y=>{y.addEventListener("click",()=>{C.currentPage=y.dataset.page,A()})}),document.querySelectorAll(".nav-section[data-section]").forEach(y=>{y.addEventListener("click",()=>{const T=y.dataset.section;C._collapsedNav=C._collapsedNav||{},C._collapsedNav[T]=!C._collapsedNav[T],localStorage.setItem("collapsedNav",JSON.stringify(C._collapsedNav));const w=document.getElementById(`sec-${T}`);w&&(w.classList.toggle("collapsed",C._collapsedNav[T]),y.classList.toggle("collapsed",C._collapsedNav[T]))})}),(i=document.getElementById("btnFabChat"))==null||i.addEventListener("click",()=>U("chat")),(m=document.getElementById("btnFabSocial"))==null||m.addEventListener("click",()=>U("social"));const k=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');k&&k.addEventListener("click",y=>{y.stopPropagation(),C.currentPage="events",C.popupOpen=!1,A()}),(L=document.getElementById("btnPopupClose"))==null||L.addEventListener("click",()=>{C.popupOpen=!1,A()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(y=>{y.addEventListener("click",()=>U(y.dataset.popup))}),Ut(),C.popupOpen&&Vt();const h=document.getElementById("searchPlayerInput"),c=document.getElementById("searchResults");let b=null;h&&c&&(h.addEventListener("input",()=>{clearTimeout(b);const y=h.value.trim();if(y.length<2){c.style.display="none";return}b=setTimeout(async()=>{try{const T=await B.searchPlayers(y),w=T.players||T.results||[];w.length===0?c.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':c.innerHTML=w.map(S=>{var H;return`
              <div class="search-result" data-pid="${S.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${S.name} <span style="opacity:0.4">Lv.${S.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((H=S.realmInfo)==null?void 0:H.name)||""}</span>
              </div>
            `}).join(""),c.style.display="block",c.querySelectorAll(".search-result").forEach(S=>{S.addEventListener("click",()=>{C.currentPage="profile",C._viewProfileId=S.dataset.pid,c.style.display="none",h.value="",A()}),S.addEventListener("mouseenter",()=>S.style.background="rgba(255,255,255,0.08)"),S.addEventListener("mouseleave",()=>S.style.background="transparent")})}catch{c.style.display="none"}},300)}),h.addEventListener("blur",()=>{setTimeout(()=>{c.style.display="none"},200)}),h.addEventListener("keydown",y=>{y.key==="Escape"&&(c.style.display="none",h.blur())})),Dt()}function U(n){C.popupOpen=!0,C.popupPage=n,A()}function Vt(){const n=document.getElementById("popupContent");n&&(C.popupPage==="chat"?gt(n,W):C.popupPage==="social"&&pt(n,W))}const Ft={combat:Tt,education:V,stats:wt,skills:V,inventory:Q,travel:lt,alchemy:J,quests:ct,admin:Ht,social:pt,chat:gt,market:Pt,realm:It,events:Mt,dungeon:rt,housing:qt,wiki:_t,npcshop:Bt,guild:zt,library:X,profile:Rt,arena:Ot,auction:ut,dailyquest:ot,worldboss:At,gacha:Gt,leaderboard:jt,tiencanh:dt,glitch:(n,t)=>{localStorage.setItem("skillsTab","glitch"),V(n,t)}};function Ut(){const n=document.getElementById("pageContent");if(!n)return;const t=Ft[C.currentPage];t&&t(n,W)}function Qt(){var f,p,s,v,$;const n=C.player;if(!n)return;const t=Math.max(0,n.currentHp/n.maxHp*100),e=n.maxEnergy>0?Math.max(0,n.currentEnergy/n.maxEnergy*100):0,d=document.querySelector(".sidebar-player");if(d){const k=n.maxStamina>0?Math.max(0,n.currentStamina/n.maxStamina*100):0,h=n.xpToNext&&n.xpToNext>0?Math.min(100,Math.max(0,(n.xp||0)/n.xpToNext*100)):0;d.innerHTML=`
      <div class="player-name">${n.name}</div>
      <div class="player-meta">Lv.${n.level} · ${((f=n.realmInfo)==null?void 0:f.fullName)||"?"}</div>
      ${mt(n)}
      ${yt(n)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${n.currentHp}/${n.maxHp}
            ${n.currentHp<n.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(p=n.skills)!=null&&p.some(c=>c.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${n.currentStamina??100}/${n.maxStamina??100}
            ${(n.currentStamina??100)<(n.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((s=n.stats)==null?void 0:s.staminaRegen)??2}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${k}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${n.currentEnergy}/${n.maxEnergy}
            ${n.currentEnergy<n.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((v=n.stats)==null?void 0:v.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${e}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>✨ Tu Vi (Cấp ${n.level})</span>
          <span>${(n.xp??0).toLocaleString()}/${(n.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${h.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${h}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${n.gold??0} Linh Thạch</div>`}const o=document.querySelector('.nav-item[data-page="stats"]');if(o){let k="";n.statPoints>0&&(k+=`<span class="badge">${n.statPoints}</span>`),($=n.realmInfo)!=null&&$.canBreakthrough&&(k+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),o.querySelectorAll(".badge").forEach(h=>h.remove()),o.insertAdjacentHTML("beforeend",k)}}async function D(){try{const[n,t,e,d,o]=await Promise.all([B.getMonsters(),B.getSkills(),B.getItems(),B.getMedicines(),B.getEducation()]);C.monsters=n.monsters||[],C.skills=t.skills||[],C.items=e.items||[],C.medicines=d.medicines||[],C.educationTrees=o.trees||[],C.exploration=await B.getExploration(),C.recipes=(await B.getRecipes()).recipes,C.npcs=(await B.getNpcs()).npcs||[]}catch(n){console.error("Lỗi tải dữ liệu:",n)}}function j(n,t="info"){var d;(d=document.querySelector(".notification"))==null||d.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=n,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}Kt();
//# sourceMappingURL=index-q_aqpmAI.js.map
