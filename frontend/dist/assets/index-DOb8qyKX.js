(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))d(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const p of f.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function e(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function d(c){if(c.ep)return;c.ep=!0;const f=e(c);fetch(c.href,f)}})();const ft="/api";class $t{async request(t,e={}){try{const d=await fetch(`${ft}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),c=await d.json();if(!d.ok)throw new Error(c.error||`HTTP ${d.status}`);return c}catch(d){throw console.error(`API Error [${t}]:`,d),d}}register(t,e,d,c){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:d,gender:c})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,d=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:d})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,d=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:d})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,d=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:d})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,d,c=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:d,lockAffixIndex:c})})}enrollNode(t,e,d){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:d})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,d){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:d})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,d,c){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:d,amount:c})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,d=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${d}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,d,c){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:d,message:c})})}getMarketListings(t="",e="newest"){const d=new URLSearchParams;return t&&d.set("type",t),e&&d.set("sort",e),this.request(`/market?${d.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,d,c,f){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:d,quantity:c,price:f})})}buyFromMarket(t,e,d=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:d})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,d){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:d})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,d,c){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:d,description:c})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,d,c=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:d,lockAffixIndex:c})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,d,c=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:d,quantity:c})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,d,c=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:d,durationHours:c})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,d=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:d})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const q=new $t;function Tt(a,t){var b,L;const{state:e,api:d,notify:c,renderGame:f,updateSidebar:p}=t,s=e.player,v=e.exploration?e.exploration[s.currentArea||"thanh_lam_tran"]:null,m=v?v.name:"Vùng Đất Vô Danh",$=v&&(v.staminaCost||v.stamina_cost)||10;a.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${m}</h1>
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
    </div>`;const y=((b=s.insightLevels)==null?void 0:b.monster)??0,l=async()=>{try{const T=await d.getAreaMonsters(s.id);if(T.monsters){e.player.trackedMonsters=T.monsters;const k=document.getElementById("trackedMonstersList");if(!k)return;if(T.monsters.length===0){k.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}k.innerHTML=T.monsters.map(w=>{const C=w.currentHp/w.stats.hp*100,S=C>60?"var(--green)":C>30?"var(--orange)":"var(--red)";let H='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';y>=1&&(H=`<div class="item-desc text-sm text-dim mb-sm">${w.description||"Yêu thú vùng này."}</div>`);let P="";y>=1&&(P=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${C}%; background: ${S}; height: 100%;"></div>
            </div>`);let N=y>=2?`❤ ${w.currentHp}/${w.stats.hp}`:y>=1?"❤ ???":"";return`
            <div class="monster-card ${w.is_boss?"boss":""}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${w.icon||"👾"}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${w.is_boss?"var(--red)":"var(--text-bright)"}; font-size: 15px;">${w.name}</span>
                    <span class="badge ${w.is_boss?"bg-red":"bg-darker"}">Cấp ${w.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${S};">${N}</div>
                </div>
                ${P}
                ${H}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${w.instance_id}" data-monster-id="${w.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `}).join(""),k.querySelectorAll(".btnTrackedCombat").forEach(w=>{w.addEventListener("click",C=>{const S=C.currentTarget.dataset.monsterId,H=C.currentTarget.dataset.instanceId;tt(t,S,H)})})}}catch(T){console.error(T)}},x=async()=>{try{const T=await d.getAreaMonsterTemplates(s.currentArea||"thanh_lam_tran");if(T.monsters){const k=document.getElementById("areaMonstersList");if(!k)return;if(T.monsters.length===0){k.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>';return}k.innerHTML=T.monsters.map(w=>`
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
          `).join("")}}catch(T){console.error(T)}};l(),x(),(L=document.getElementById("btnExplore"))==null||L.addEventListener("click",()=>kt(t));let u=!1;const g=document.getElementById("btnAutoBattle"),r=document.getElementById("btnStopAuto"),o=document.getElementById("panelKhamPha"),n=document.querySelector(".toggle-auto-combat"),h=document.getElementById("autoCombatStatus");g&&g.addEventListener("click",()=>{u=!0,o.style.display="none",n.style.display="block",i()}),r&&r.addEventListener("click",()=>{u=!1,o.style.display="block",n.style.display="none"});async function i(){var C,S,H,P,N,O,A,_,z,G;let T=0,k=0,w=0;for(;u;){h.innerHTML=`
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${T} trận | +${k} XP | +${w} Linh Thạch</div>
        `;const j=e.player;if((j.currentStamina||0)<$){h.innerHTML="<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>",u=!1;break}if(j.currentHp/j.maxHp<.2){h.innerHTML="<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>",u=!1;break}try{const I=await d.explore(e.playerId);if(e.player=I.player,p(),I.event&&(I.event.type==="monster"||I.event.type==="worldBoss")){if(h.innerHTML=`
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${I.event.message}! Bắt đầu quyết chiến...</div>
               `,await new Promise(xt=>setTimeout(xt,600)),!u)break;const M=await d.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.playerId,monsterId:I.event.monsterId})});if(e.player=M.player,p(),M.outcome==="win")T++,k+=((C=M.rewards)==null?void 0:C.xp)||0,w+=((S=M.rewards)==null?void 0:S.gold)||0,h.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${(H=M.monster)==null?void 0:H.name}! (+${((P=M.rewards)==null?void 0:P.xp)||0} XP, +${((N=M.rewards)==null?void 0:N.gold)||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${T} | Tiếp tục sau 1s...</div>
                   `;else{h.innerHTML=`
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${M.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.</div>
                   `,u=!1;break}}else if(I.event&&I.event.type==="monster_ambush"&&I.event.combatResult){const M=I.event.combatResult;if(M.outcome==="win")T++,k+=((O=M.rewards)==null?void 0:O.xp)||0,w+=((A=M.rewards)==null?void 0:A.gold)||0,h.innerHTML=`<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${(_=M.monster)==null?void 0:_.name}! (+${((z=M.rewards)==null?void 0:z.xp)||0} XP)</div>`;else{h.innerHTML="<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>",u=!1;break}}else h.innerHTML=`<div class='text-blue'>${((G=I.event)==null?void 0:G.message)||"Không có biến cố"}. Tiếp tục...</div>`}catch(I){h.innerHTML=`<div class='text-red'>Lỗi: ${I.message}. Dừng tự động.</div>`,u=!1;break}await new Promise(I=>setTimeout(I,1200))}}}async function kt(a){var p,s;const{state:t,api:e,notify:d,updateSidebar:c}=a,f=document.getElementById("exploreResult");if(f){f.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const v=await e.explore(t.playerId);t.player=v.player,c();const m=v.event;let $=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(m.type==="monster")$+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${m.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${m.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${m.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(m.type==="monster_ambush"&&m.combatResult){const y=m.combatResult,l=et(y.log||[]),x=y.outcome==="win"?"🏆 Chiến thắng!":y.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",u=y.outcome==="win"?"var(--green)":y.outcome==="loss"?"var(--red)":"var(--orange)";$+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${m.message}</div>
        <div style="font-size:16px;font-weight:700;color:${u};margin-bottom:12px">${x}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${l}</div>
      `}else if(m.type==="worldBoss")$+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${m.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${m.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${m.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(m.type==="npc"&&m.npcId)$+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${m.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${m.message}</div>
        <div class="text-sm text-dim mb-md">${m.npcTitle||"Kỳ nhân dị sĩ qua đường"}</div>
        <button class="btn btn--gold" id="btnNpcInteract">💬 Bái Kiến</button>
      `;else if(m.type==="player_encounter"&&m.targetPlayer){const y=m.targetPlayer;$+=`
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${y.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${y.realmTierName||"Phàm nhân"} · Cấp ${y.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${y.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${y.id}">⚔️ Cướp Bóc</button>
        </div>
      `}else $+=`
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${m.message}</div>
        ${m.gold?`<div class="text-gold bold">+${m.gold} 💎 Linh Thạch</div>`:""}
        ${m.item?`<div class="text-green bold">+1 ${m.item.name}</div>`:""}
        <button class="btn btn--blue mt-md" id="btnExploreContinue">Tiếp tục</button>
      `;$+="</div></div>",f.innerHTML=$,(m.type==="monster"||m.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",y=>{f.innerHTML="",tt(a,y.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async y=>{try{const l=await e.trackMonster(t.playerId,y.target.dataset.mid);l.success?(d(l.message,"success"),f.innerHTML="",typeof a.renderGame=="function"&&a.renderGame()):l.error&&d(l.error,"error")}catch(l){d("Lỗi theo dõi: "+l.message,"error")}})),m.type==="npc"&&m.npcId&&((p=document.getElementById("btnNpcInteract"))==null||p.addEventListener("click",async()=>{await wt(a,m.npcId,f)})),(s=document.getElementById("btnExploreContinue"))==null||s.addEventListener("click",()=>{f.innerHTML=""})}catch(v){f.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${v.message}</div></div>`}}}async function wt(a,t,e){const{state:d,api:c,notify:f,renderGame:p}=a,s=document.getElementById("npcQuestModal")||e;try{const m=(await c.getNpc(t)).npc;if(!m)return;const $=(d.player.activeQuests||[]).map(l=>l.quest_id);let y=m.quests.map(l=>{const x=$.includes(l.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${l.name}</span>
            <span class="text-xs badge" style="background:${l.type==="kill"?"var(--red)":"var(--green)"}">${l.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${l.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${l.rewards.gold?l.rewards.gold+"💎 ":""}${l.rewards.xp?l.rewards.xp+"✨ ":""}${l.rewards.skillChance?"🎯 "+l.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${x?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${t}" data-qid="${l.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");s.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${m.icon||"🧓"} ${m.name} <span class="subtitle">${m.profession}</span></div>
        <div class="panel-body">
          ${y||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,s.querySelectorAll(".btn-accept-quest").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="⏳...";try{const x=await c.acceptQuest(d.playerId,l.dataset.npc,l.dataset.qid);d.player=x.player,f(x.message,"success"),p()}catch(x){f(x.message||"Lỗi nhận quest","error"),l.disabled=!1,l.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(v){console.error("NPC load error:",v)}}async function tt(a,t,e=null){var m,$;const{state:d,api:c,notify:f,updateSidebar:p,renderGame:s}=a,v=document.getElementById("combatResult");if(v){if(!d.player.currentHp||d.player.currentHp<=0)return f("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(d.player.hospitalRemaining>0)return f(`Đang tịnh dưỡng! Còn ${d.player.hospitalRemaining}s`,"error");v.innerHTML=`
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`,v.scrollIntoView({behavior:"smooth"});try{const y=await c.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:d.playerId,monsterId:e?null:t,trackedMonsterId:e})});if(d.player=y.player,y.outcome==="no_energy"){v.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${y.log[0]}</div></div>`,p();return}const l=y.monster,x=Math.max(0,d.player.currentHp/d.player.maxHp*100),u=Math.max(0,l.currentHp/l.maxHp*100),g={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue)"}},r=g[y.outcome]||g.loss,o=(m=y.rewards)!=null&&m.gold?` · +${y.rewards.gold} 💎`:"",n=y.rewards?` · +${y.rewards.xp} XP${o}`:"",h={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}}[y.activeStance||"breaker"]||{name:"Bình Thường",color:"#888",icon:"⚔️"};v.innerHTML=`
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${r.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${r.icon}</span> <span>${r.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${y.turns}/${y.maxTurns||25} Lượt ${n}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.9) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright); font-size: 15px; margin-bottom: 2px;">${d.player.name}</div>
              <div style="font-size: 11px; color: ${h.color}; font-weight: 600; margin-bottom: 8px;">
                ${h.icon} ${h.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${x}%; height: 100%; background: ${x>50?"var(--green)":x>20?"var(--orange)":"var(--red)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${d.player.currentHp}/${d.player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(251,191,36,0.5); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${($=y.glitchEvents)!=null&&$.length?y.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${l.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${l.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${l.level||1} · ${l.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${u}%; height: 100%; background: ${u>50?"var(--red)":"var(--orange)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${l.currentHp}/${l.maxHp} HP</div>

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
            ${et(y.log)}
          </div>
        </div>
      </div>`;const i=document.getElementById("cardMonster"),b=document.getElementById("cardPlayer");y.glitchEvents&&y.glitchEvents.length>0&&i?y.glitchEvents.forEach((L,T)=>{setTimeout(()=>{X(i,`-${L.damage} 🌌 [VẾT NỨT]`,"glitch"),i.classList.add("shake"),setTimeout(()=>i.classList.remove("shake"),400)},T*400+200)}):i&&y.rewards&&X(i,`-${Math.round(l.maxHp*.4)} 💥`,"crit"),p(),e&&typeof s=="function"&&setTimeout(()=>s(),1500)}catch(y){v.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${y.message}</div></div>`}}}function X(a,t,e="normal"){if(!a)return;const d=document.createElement("div");d.className=`floating-damage damage-${e}`,d.textContent=t,a.appendChild(d),setTimeout(()=>d.remove(),1100)}function et(a){return(a||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}function W(a,t){const{state:e,api:d,notify:c}=t,f=e.player,p=(f.skills||[]).find(y=>(typeof y=="string"?y:y.id)==="nhan_thuat"),s=p?p.level||1:0,v=[...e.skills].sort((y,l)=>(y.tier||1)-(l.tier||1)),m=(f.skills||[]).map(y=>typeof y=="string"?y:y.id),$={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};a.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${s}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${v.map(y=>{const l=m.includes(y.id),x=y.tier||1,u=x>s+1,g=x<=s;let r="";return y.requirements&&y.requirements.length>0?g||l?r=`<div class="mt-sm text-xs text-orange">Điều kiện: ${y.requirements.map(o=>`<br>• ${o}`).join("")}</div>`:u?r=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${x}.</div>`:r='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':r='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${l?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${y.name} ${l?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${l?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${$[x]||x}</span>
                    <span class="text-xs text-dim">${y.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||l?y.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${y.type!=="passive"&&y.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${y.cost} linh lực</div>`:""}
                
                ${r}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${l?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${u?"btn--dark":"btn--gold"} btn--sm btn-learn" ${u?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${y.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,a.querySelectorAll(".accordion-header").forEach(y=>{y.addEventListener("click",()=>{const l=y.nextElementSibling;l.style.display==="none"?(l.style.display="block",y.querySelector("div:last-child").textContent="▲"):(l.style.display="none",y.querySelector("div:last-child").textContent="▼")})}),a.querySelectorAll(".btn-learn").forEach(y=>{y.addEventListener("click",async l=>{l.stopPropagation();try{const x=await d.learnSkill(f.id,y.dataset.sid);x.error?c(x.error,"error"):(e.player=x.player,c(x.message,"success"),W(a,t))}catch(x){c("Lỗi học kỹ năng: "+x.message,"error")}})})}function Lt(a,t){var x,u,g;const{state:e,api:d,notify:c,renderGame:f}=t,p=e.player,s=p.stats,v=p.allocatedStats||{},m=5,$=p.currentEnergy>=m&&!p.hospitalRemaining,y=p.talentDisplay||{},l=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];a.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${p.currentEnergy}/${p.maxEnergy} linh lực · Chi phí: ${m}/lần</span>
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
          ${l.map(([r,o,n])=>{const h=y[r]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${h.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${o}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${n}</div>
                <div style="font-size:14px;font-weight:700;color:${h.color};margin-top:4px">${h.icon} ${h.name}</div>
                <div style="font-size:11px;color:${h.color};opacity:0.8">×${h.value} hệ số</div>
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
        ${l.map(([r,o,n,h])=>{const i=y[r]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},b=Math.floor(p.currentEnergy/m)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${o}</span> ${n}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${h}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${s[r]??0}</span>
              ${v[r]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${v[r]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${i.color};min-width:50px" title="Căn Cốt: ${i.name} (×${i.value})">${i.icon}×${i.value}</span>
              <input type="number" class="train-count" data-stat="${r}" min="1" max="${b}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${$?"":"disabled"}>
              <button class="btn btn--sm ${$?"btn--blue":"btn--dark"} train-btn" data-train="${r}" ${$?"":"disabled"} title="Tốn ${m} Linh lực/lần · Căn cốt ×${i.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${m} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(p.currentEnergy/m)}</strong> lần hiện tại.
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
    </div>`,(g=a.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",async()=>{try{const r=a.querySelector(".btn-breakthrough");r.disabled=!0,r.innerHTML="Đang Độ Kiếp...";const o=await d.attemptBreakthrough(e.playerId);e.player=o.player,c(o.message,"success"),f()}catch(r){c(r.message||"Đột phá thất bại","error");const o=a.querySelector(".btn-breakthrough");o&&(o.disabled=!1,o.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),a.querySelectorAll(".train-btn").forEach(r=>{r.addEventListener("click",async o=>{o.stopPropagation();const n=a.querySelector(`.train-count[data-stat="${r.dataset.train}"]`),h=parseInt(n==null?void 0:n.value)||1;try{const i=await d.trainStat(e.playerId,r.dataset.train,h);e.player=i.player,c(i.message,"success"),f()}catch(i){c(i.message||"Lỗi rèn luyện","error")}})})}function nt(a,t){var n;const{state:e,api:d,notify:c,renderGame:f}=t,p=e.player,s=e.educationTrees||[],v=p.unlockedNodes||[],m=p.studyingNode||"",$=m?m.split("|")[0]:"",y=p.studyEndsAt||0,l=Math.max(0,y-Math.floor(Date.now()/1e3)),x=p.treeProgress||{},u=p.skillProgress||{};let g=localStorage.getItem("eduActiveTree")||((n=s[0])==null?void 0:n.id),r=s.find(h=>h.id===g)||s[0];!r&&s.length>0&&(r=s[0]);const o=()=>{if(!r){a.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const h=s.map(S=>`
      <button class="edu-tab ${S.id===r.id?"active":""}" data-tab="${S.id}">
        <span class="edu-tab-icon">${S.icon}</span>
        <span class="edu-tab-name">${S.name}</span>
        <span class="edu-tab-badge">${x[S.id]||0}</span>
      </button>
    `).join("");let i="";if($){let S=null,H=null;s.forEach(P=>{const N=P.nodes.find(O=>O.id===$);N&&(S=N,H=P)}),S&&(i=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${H.name}</div>
              <div class="text-gold text-lg bold">${S.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${l}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${l>0?"disabled":""}>
                ${l>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const b=x[r.id]||0;let L=null;for(const S of r.milestones||[])if(b<S.require){L=S;break}let T="";L?T=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${L.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${L.description}</div>
        </div>
      `:T='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const k=p.discoveredNodes||[],w=(r.nodes||[]).map(S=>{const H=v.includes(S.id),P=$===S.id,N=(S.prerequisites||[]).every(M=>v.includes(M)),O=r.nodes.some(M=>(M.prerequisites||[]).includes(S.id));if(!(k.includes(S.id)||H||!(S.prerequisites&&S.prerequisites.length>0))||H&&O)return"";let _="";P?_="studying":H?_="done":_="available";let z="";P?z='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':$?z='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':H?z=`<button class="btn btn--sm btn--gold btn-learn" data-node="${S.id}">Tiếp Tục Lãnh Ngộ (${S.duration}s)</button>`:N?z=`<button class="btn btn--sm btn--blue btn-learn" data-node="${S.id}">Bắt Đầu (${S.duration}s)</button>`:z='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const G=u[S.id]||{level:1,exp:0},j=G.level*100;let I="";return H&&(I=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${G.level} | Độ hiểu thấu: ${G.exp}/${j}</div>`),`
        <div class="edu-node ${_}">
          <div class="edu-node-info">
            <div class="edu-node-title">${S.name}</div>
            <div class="edu-node-desc">${S.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${S.bonusDescription}</div>
            ${I}
          </div>
          <div class="edu-node-action">
            ${z}
          </div>
        </div>
      `}).join("");a.innerHTML=`
      <div class="page-header">
        <h1>🧘 Công Pháp Tu Luyện</h1>
        <div class="text-dim text-sm mt-xs">Tu luyện công pháp, nâng cao thông thạo từng bước.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${h}</div>
          ${i}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${r.icon} ${r.name}</h2>
              <p class="text-dim mb-md">${r.description}</p>
              
              <h3 class="text-md mb-xs mt-md border-b pb-xs">🌟 Cảnh Giới Đột Phá</h3>
              <div class="edu-milestones-grid mb-lg">
                ${T||'<div class="text-dim text-sm">Nhánh này chưa có cảnh giới đặc biệt.</div>'}
              </div>

              <h3 class="text-md mb-xs border-b pb-xs">📖 Pháp Quyết</h3>
              <div class="edu-nodes-list">
                ${w||'<div class="text-dim text-sm">Chưa có pháp quyết.</div>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,a.querySelectorAll(".edu-tab").forEach(S=>{S.addEventListener("click",()=>{const H=S.dataset.tab;localStorage.setItem("eduActiveTree",H),g=H,r=s.find(P=>P.id===H)||s[0],o()})}),window.eduTimer&&clearInterval(window.eduTimer),$&&y>0&&(window.eduTimer=setInterval(()=>{const S=Math.floor(Date.now()/1e3);let H=Math.max(0,y-S);const P=document.getElementById("eduCounter");if(P&&(P.innerText=H+"s"),H<=0){clearInterval(window.eduTimer);const N=document.getElementById("btnCheckEdu");N&&(N.disabled=!1,N.innerHTML="✨ Đột Phá!")}},1e3));const C=a.querySelector("#btnCheckEdu");C&&C.addEventListener("click",async()=>{try{C.disabled=!0,C.innerHTML="Đang xử lý...";const S=await d.checkEducation(e.playerId);e.player=S.player,c(S.message,S.completed?"success":"info"),f()}catch(S){c(S.message||"Lỗi đột phá","error"),C.disabled=!1,C.innerHTML="Thử lại"}}),a.querySelectorAll(".btn-learn").forEach(S=>{S.addEventListener("click",async()=>{try{const H=S.dataset.node;S.disabled=!0,S.innerHTML="Chờ...";const P=await d.enrollNode(e.playerId,H,r.id);e.player=P.player,c(P.message,"success"),f()}catch(H){c(H.message||"Lỗi ghi danh","error"),S.disabled=!1,S.innerHTML="Bắt Đầu"}})})};o()}async function at(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.player;if(p){a.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const v=(await d.getGlitches(p.id)).status,m=a.querySelector("#glitchContentWrapper");if(!m)return;if(!v.featureUnlocked){St(m,v.featureDetails,p);return}Ct(m,v,p,t)}catch(s){a.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${s.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function St(a,t,e){const d=(t==null?void 0:t.requirements)||[];a.innerHTML=`
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
          ${d.map(c=>`
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
  `}function Ct(a,t,e,d){const{api:c,notify:f,updateSidebar:p}=d,s=t.imprints||[],v=t.stances||{},m=t.activeStance||"breaker";a.innerHTML=`
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
  `;const $=a.querySelector("#btnOverrideTribulation");$&&($.onclick=async()=>{$.disabled=!0,$.textContent="Đang lách luật...";try{const y=await c.overrideTribulation(e.id);f(y.message,"success"),state.player=y.player,p(),at(a.parentElement,d)}catch(y){f(y.message||"Thao tác lách luật thất bại!","error"),$.disabled=!1,$.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),it(a,v,m,e,c,f,p),st(a,s,e,f,p)}function it(a,t,e,d,c,f,p){const s=a.querySelector("#stanceContainer");s&&(s.innerHTML="",Object.values(t).forEach(v=>{const m=v.isUnlocked!==!1,$=v.id===e,y=document.createElement("div");y.style.cssText=`
      background: ${$?"rgba(168, 85, 247, 0.15)":m?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${$?"#c084fc":m?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${m?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${m?"1":"0.55"};
    `,y.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${m?v.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${m?v.icon:"🔒"}</span> ${v.name}
        </div>
        ${$?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${m?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${m?v.description:`<span style="color:#f59e0b;">${v.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,y.onclick=async()=>{if(!m)return f(v.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!$)try{const l=await c.setStance(d.id,v.id);f(l.message,"success"),state.player=l.player,p(),it(a,t,v.id,d,c,f,p)}catch(l){f(l.message||"Chuyển thế thất bại","error")}},s.appendChild(y)}))}function st(a,t,e,d,c){const f=a.querySelector("#imprintsContainer");f&&(f.innerHTML="",t.forEach(p=>{const s=document.createElement("div"),v=p.fogLevel||(p.isUnlocked?"revealed":"fog");let m="rgba(15, 23, 42, 0.5)",$="rgba(255,255,255,0.08)",y="none";v==="revealed"?(m="rgba(30, 41, 59, 0.75)",$=p.color,y=`0 0 12px ${p.color}33`):v==="partial"?(m="rgba(24, 24, 27, 0.6)",$="1px dashed rgba(168, 85, 247, 0.4)"):(m="rgba(10, 10, 15, 0.5)",$="1px dashed rgba(255, 255, 255, 0.08)"),s.style.cssText=`
      background: ${m};
      border: 1px solid ${$};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${y};
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
    `;const l=s.querySelector(".btnSetTitle");l&&(l.onclick=()=>{e.activeTitle=p.title,d(`Đã kích hoạt danh hiệu: [${p.title}]!`,"success"),c(),st(a,t,e,d,c)}),f.appendChild(s)}))}function Y(a,t){const{state:e,api:d,notify:c,renderGame:f}=t,p=e.player.skills||[],s=p.map(u=>typeof u=="string"?u:u.id),v=e.skills||[],m=(e.player.realmTier??1)>=2||(e.player.glitchInsight??0)>=20||(e.player.unlockedImprints||[]).length>0,$={combat:{icon:"⚔️",name:"Chiến Đấu",desc:"Chiêu thức sử dụng trong giao đấu"},life:{icon:"🛠️",name:"Sinh Hoạt",desc:"Thu thập, chế tạo, sinh tồn"},internal:{icon:"🧘",name:"Nội Công",desc:"Thụ động tăng cường bản thân"},gongfa:{icon:"📖",name:"Công Pháp",desc:"Tu luyện công pháp, nâng cao cảnh giới"},library:{icon:"📚",name:"Tàng Kinh Các",desc:"Kho tàng bí tịch nhân gian"},glitch:{icon:m?"🌌":"🌫️",name:m?"Dị Biến":"???",desc:"Thiên Đạo Dị Biến & Kẽ Hở Quy Luật"}};let y=localStorage.getItem("skillsTab")||"combat";const l=()=>Object.entries($).map(([u,g])=>{let r=0;return u==="gongfa"?r=(e.educationTrees||[]).length:u==="library"?r=(v||[]).length:u==="glitch"?r=m?(e.player.unlockedImprints||[]).length:"?":r=p.filter(o=>{const n=typeof o=="string"?o:o.id,h=v.find(i=>i.id===n);return h&&(h.category||"combat")===u}).length,`<button class="skill-tab ${u===y?"active":""}" data-tab="${u}">
        ${g.icon} ${g.name} <span class="skill-tab-count">${r}</span>
      </button>`}).join(""),x=()=>{if(y==="gongfa"){a.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${l()}</div>
        <div id="gongfa-content"></div>
      `,a.querySelectorAll(".skill-tab").forEach(h=>{h.addEventListener("click",()=>{y=h.dataset.tab,localStorage.setItem("skillsTab",y),x()})});const n=a.querySelector("#gongfa-content");n&&nt(n,t);return}if(y==="library"){a.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${l()}</div>
        <div id="library-content"></div>
      `,a.querySelectorAll(".skill-tab").forEach(h=>{h.addEventListener("click",()=>{y=h.dataset.tab,localStorage.setItem("skillsTab",y),x()})});const n=a.querySelector("#library-content");n&&W(n,t);return}if(y==="glitch"){a.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${l()}</div>
        <div id="glitch-content"></div>
      `,a.querySelectorAll(".skill-tab").forEach(h=>{h.addEventListener("click",()=>{y=h.dataset.tab,localStorage.setItem("skillsTab",y),x()})});const n=a.querySelector("#glitch-content");n&&at(n,t);return}const g=p.map(n=>{const h=typeof n=="string"?n:n.id;return{...v.find(b=>b.id===h)||{name:h,id:h,category:"combat"},level:n.level||1,xp:n.xp||n.currentXp||0,equipped:n.equipped||n.isEquipped||!1}}).filter(n=>(n.category||"combat")===y),r=v.filter(n=>(n.category||"combat")===y&&!s.includes(n.id)),o=(n,h)=>{const i=n.level*100,b=Math.min(100,n.xp/i*100),L=n.type==="passive",T="★".repeat(Math.min(n.tier||1,7)),k=(n.tier||1)>=5?"var(--gold)":(n.tier||1)>=3?"var(--purple)":"var(--blue)";let w="";return h?L?w='<span style="font-size:10px;color:var(--green)">🔮 Vĩnh Viễn</span>':n.equipped?w=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${n.id}">Tháo</button>`:w=`<button class="btn btn--sm btn--blue equip-btn" data-eq="1" data-sid="${n.id}">Trang Bị</button>`:w='<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>',`
        <div class="skill-card ${h?"":"locked"} ${n.equipped&&!L?"equipped":""}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name">${n.name}</div>
              <div class="skill-card-tier" style="color:${k}">${T} Tầng ${n.tier||1}</div>
            </div>
            <div class="skill-card-action">${w}</div>
          </div>
          <div class="skill-card-desc">${n.description||""}</div>
          ${h?`
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${n.level}</span>
                <span class="text-dim">${n.xp}/${i}</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${b}%"></div></div>
              ${n.masteryBonus?`<div class="skill-mastery-bonus">✨ ${n.masteryBonus}</div>`:""}
            </div>
          `:`
            <div class="skill-card-req">
              ${(n.requirements||[]).map(C=>`<span class="req-tag">🔒 ${C}</span>`).join(" ")}
            </div>
          `}
          ${n.cost?`<div class="skill-card-cost">🔵 ${n.cost} Linh Lực</div>`:""}
        </div>
      `};a.innerHTML=`
      <div class="page-header">
        <h1>⚡ Kỹ Năng & Công Pháp</h1>
        <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
      </div>

      <div class="skill-tabs">${l()}</div>

      <div class="panel">
        <div class="panel-title">
          ${$[y].icon} ${$[y].name}
          <span class="subtitle">${$[y].desc}</span>
        </div>
        <div class="panel-body">
          ${g.length===0&&r.length===0?'<div class="text-dim">Chưa có kỹ năng nào trong nhánh này.</div>':""}
          
          ${g.length>0?`
            <div class="skill-grid">
              ${g.map(n=>o(n,!0)).join("")}
            </div>
          `:""}

          ${r.length>0?`
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
              <div class="text-dim text-sm" style="margin-bottom:8px">🔒 Chưa lĩnh ngộ (${r.length})</div>
              <div class="skill-grid">
                ${r.map(n=>o({...n,level:0,xp:0},!1)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,a.querySelectorAll(".skill-tab").forEach(n=>{n.addEventListener("click",()=>{y=n.dataset.tab,localStorage.setItem("skillsTab",y),x()})}),a.querySelectorAll(".equip-btn").forEach(n=>{n.addEventListener("click",async()=>{try{const h=n.dataset.sid,i=n.dataset.eq==="1",b=await d.equipSkill(e.playerId,h,i);e.player=b.player,c(b.message,"success"),x()}catch(h){c(h.message||"Lỗi trang bị","error")}})})};x()}function Et(a,t){return t==="manual"?"📜":a==="weapon"?"⚔️":a==="body"?"🥋":a==="shield"?"🛡️":a==="feet"?"👢":a==="ring"?"💍":"📦"}function Z(a,t){let e="",d="";if(a.slot==="weapon"){let v=0,m=0;(a.affixes||[]).forEach($=>{$.stat==="strength"&&$.type==="flat"&&(v+=$.value),$.stat==="dexterity"&&$.type==="flat"&&(m+=$.value)}),v===0&&(v=a.itemLevel*2+5),m===0&&(m=a.itemLevel+10),e=`⚔️ ${v}`,d=`🎯 ${m}`}else if(a.slot==="body"||a.slot==="shield"||a.slot==="feet"){let v=0;(a.affixes||[]).forEach(m=>{m.stat==="defense"&&m.type==="flat"&&(v+=m.value)}),v===0&&(v=a.itemLevel*3),e=`🛡️ ${v}`}else if(a.slot==="ring"){let v=0;(a.affixes||[]).forEach(m=>{m.stat==="capacity"&&(v+=m.value)}),e=v>0?`🎒 +${v}`:""}const c=(a.affixes||[]).map(v=>Ht(v)).map(v=>`<span class="badge badge-dim">${v}</span>`).join(" "),f=a.description||`Một vật phẩm loại ${a.slot} cấp ${a.itemLevel} thuộc phẩm chất ${a.rarity}. Khí tức tỏa ra không tồi.`,p=a.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${a.craftedBy}</strong></div>`:"",s=t?a.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${a.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${a.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${a.rarity}"></span>
          <span class="item-name rarity-${a.rarity}" style="font-size:14px">${a.name}</span>
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
          ${Et(a.slot,a.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${a.name}</strong> là loại ${a.baseType}. ${f}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${a.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${a.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${c||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${p}
          <div class="mt-2 flex justify-end">
            ${s}
          </div>
        </div>
      </div>
    </div>`}function Ht(a){const e={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[a.stat]||a.stat,d=a.value>=0?"+":"";return a.type==="flat"?`${d}${a.value} ${e}`:a.type==="increase"?`${d}${a.value}% ${e}`:a.type==="more"?`×${d}${a.value}% ${e}`:`${d}${a.value} ${e}`}function J(a,t){var o,n,h,i,b,L,T;const{state:e,api:d,notify:c,renderGame:f}=t,p=Object.values(e.player.equipment||{}),s=e.player,v=e.medicines||[],m=s.medCooldownRemaining||0,$=e.inventoryTab||"equipped",y=s.skills&&s.skills.some(k=>{const w=typeof k=="string"?k:k.id;return w==="duoc_ly"||w==="y_thuat"}),l=p.find(k=>k.slot==="ring1"),x=p.find(k=>k.slot==="ring2");let u=20;((l==null?void 0:l.id)==="tui_tru_vat"||(o=l==null?void 0:l.baseType)!=null&&o.includes("tru_vat"))&&(u+=((h=(n=l.affixes)==null?void 0:n[0])==null?void 0:h.value)||10),((x==null?void 0:x.id)==="tui_tru_vat"||(i=x==null?void 0:x.baseType)!=null&&i.includes("tru_vat"))&&(u+=((L=(b=x.affixes)==null?void 0:b[0])==null?void 0:L.value)||10),a.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(s.inventory||[]).length} / ${u})</span></h1>
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
          Đan Dược ${m>0?`<span style="color:var(--orange); font-size:11px">(${m}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),r=()=>{g.querySelectorAll("[data-eid]").forEach(k=>{k.addEventListener("click",async w=>{w.stopPropagation();try{const C=await d.equipItem(e.playerId,k.dataset.eid);e.player=C.player,c(C.message,"success"),f()}catch(C){c(C.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(k=>{k.addEventListener("click",async w=>{w.stopPropagation();try{const C=await d.useItem(e.playerId,k.dataset.use);e.player=C.player,c(C.message,"success"),f()}catch(C){c(C.message||"Lỗi sử dụng","error")}})})};if($==="equipped"){const k=s.equipment||{},w=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${w.map(C=>{const S=k[C.key],H=S&&S.id,P=H?`rarity-${S.rarity}`:"";return`
            <div style="background:${H?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${H?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${C.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${C.name}</div>
              ${H?`<div style="font-size:11px;font-weight:600" class="${P}">${S.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${S.rarity}] Lv${S.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${p.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${p.filter(C=>C&&C.id).map(C=>Z(C,!1)).join("")}
      `:""}
    `,r()}else if($==="medicine")g.innerHTML=`
      <div style="padding:12px">
        ${m>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${m}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${m/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${v.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':v.map(k=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${k.icon||"💊"} ${k.name}</div>
                <div class="item-meta">
                  ${k.description}
                  ${k.healPercent?` · Phục hồi ${k.healPercent}% HP`:""}
                  ${k.cooldownAdd?` · Sinh Đan độc ${k.cooldownAdd}s`:""}
                  ${k.duration?` · Hiệu lực ${k.duration} trận`:""}
                  ${k.toxicity&&y?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${k.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${k.penalty&&y?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${k.penalty.map(w=>`Giảm ${Math.abs(w.value)*100}% ${w.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${k.id}" 
                ${m+(k.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(k=>{k.addEventListener("click",async()=>{try{const w=await d.useMedicine(e.playerId,k.dataset.med);e.player=w.player,c(w.message,"success"),f()}catch(w){c(w.message||"Đan độc quá nồng!","error")}})});else{const k=s.inventory||[];let w=[];$==="weapon"?w=k.filter(C=>C.slot==="weapon"&&C.category!=="manual"):$==="armor"?w=k.filter(C=>["body","shield","feet"].includes(C.slot)):$==="accessory"?w=k.filter(C=>["ring","amulet","ring1","ring2"].includes(C.slot)):$==="manual"&&(w=k.filter(C=>C.category==="manual")),g.innerHTML=`
      ${w.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':w.map(C=>Z(C,!0)).join("")}
    `,r()}a.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{e.inventoryTab=k.dataset.tab,J(a,t)})}),(T=document.getElementById("btnGen"))==null||T.addEventListener("click",async()=>{const k=["common","rare","epic","legendary"];try{const w=await d.generateItem(e.playerId,k[Math.floor(Math.random()*k.length)]);e.player=w.player,e.items=w.items||[],c(w.message,"success"),J(a,t)}catch{c("Lỗi tạo ngẫu nhiên","error")}})}function rt(a,t){const{state:e,api:d,notify:c,updateSidebar:f,renderGame:p}=t,s=e.playerId;e._dungeon||(e._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const v=e._dungeon;async function m(){try{const[r,o]=await Promise.all([d.getMapItems(s),d.getDungeonHistory(s)]);v.mapItems=r.mapItems||[],v.activeRun=r.activeRun||null,v.history=o.history||[],v.loaded=!0,$()}catch(r){c(r.message||"Lỗi tải Bí Cảnh","error")}}function $(){a.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${v.activeRun?y():l()}

      ${v.lastResult?x():""}

      ${u()}
    `,g()}function y(){var h,i;const r=v.activeRun,o=r.currentWave===r.totalWaves,n=((r.currentWave-1)/r.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${r.dungeonName||r.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${n}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${r.currentWave}/${r.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((h=e.player)==null?void 0:h.hospitalRemaining)>0?"disabled":""}>
              ${o?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+r.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((i=e.player)==null?void 0:i.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function l(){return v.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${v.mapItems.map(r=>{const o=r.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${r.item.icon} ${r.item.name} <span style="opacity:0.5">x${r.quantity}</span></div>
                  ${o?`
                    <div class="item-meta">
                      ${o.name} · T${o.tier} · ${o.waves+1} tầng · Boss: ${o.bossName}
                    </div>
                  `:""}
                </div>
                ${o?`<button class="btn btn--sm btn--gold" data-enter="${r.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function x(){var h,i;const r=v.lastResult,o=r.result==="dungeon_complete"?"🏆":r.result==="wave_cleared"?"✅":"💀",n=r.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${n}">
        <div class="panel-title" style="color:${n}">${o} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${r.message}</div>
          ${(h=r.loot)!=null&&h.length?`
            <div style="margin-bottom:8px">
              ${r.loot.map(b=>`<div style="font-size:12px;color:var(--green)">🎁 ${b}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((i=r.combatLog)==null?void 0:i.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(r.combatLog||[]).map(b=>`<div>${b}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function u(){return v.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${v.history.map(r=>{const o=r.status==="completed"?"✅":r.status==="failed"?"❌":r.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${r.status==="completed"?"var(--green)":r.status==="failed"?"var(--red)":"var(--orange)"}">${o} ${r.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${r.wave}/${r.totalWaves} · ${new Date(r.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function g(){var r,o;document.querySelectorAll("[data-enter]").forEach(n=>{n.addEventListener("click",async()=>{const h=n.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){n.disabled=!0;try{const i=await d.enterDungeon(s,h);c(i.message,"success"),e.player=i.player,f(),v.activeRun=i.run,v.lastResult=null,await m()}catch(i){c(i.message,"error"),n.disabled=!1}}})}),(r=document.getElementById("btnFight"))==null||r.addEventListener("click",async()=>{const n=document.getElementById("btnFight");n.disabled=!0,n.textContent="⏳ Đang chiến đấu...";try{const h=await d.fightDungeonWave(s);e.player=h.player,f(),v.lastResult=h,h.result==="dungeon_complete"||h.result==="dungeon_failed"?v.activeRun=null:h.result==="wave_cleared"&&(v.activeRun.currentWave=h.nextWave),$()}catch(h){c(h.message,"error"),n.disabled=!1,n.textContent="⚔️ Chiến Đấu"}}),(o=document.getElementById("btnAbandon"))==null||o.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await d.abandonDungeon(s),c("Đã rời khỏi Bí Cảnh.","info"),v.activeRun=null,v.lastResult=null,await m()}catch(n){c(n.message,"error")}})}v.loaded?$():m()}function dt(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const s=e._tc;async function v(){try{s.data=await d.request(`/player/${p}/atlas-maps`),s.loaded=!0,m()}catch(g){c(g.message,"error")}}function m(){const g=s.data,r=(g==null?void 0:g.atlas)||{},o=(g==null?void 0:g.maps)||[],n=g==null?void 0:g.activeRun,h=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,a.innerHTML=`
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
        <button class="btn ${s.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${o.length})</button>
        ${n?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,a.querySelectorAll("[data-tab]").forEach(b=>{b.addEventListener("click",()=>{s.tab=b.dataset.tab,m()})});const i=document.getElementById("tcContent");i&&(n&&s.tab==="run"?x(i,n):s.tab==="inventory"?y(i,o):$(i,h,r))}function $(g,r,o){var h;const n=((h=s.data)==null?void 0:h.tiers)||[];g.innerHTML=n.map(i=>{const b=r.filter(L=>L.tier===i.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${i.tier} ${i.name} <span style="opacity:0.4;font-size:11px">(Realm ${i.requiredRealm}+, ${i.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${b.map(L=>{var w;const T=((w=o.progress)==null?void 0:w[L.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[L.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${T?700:400}">${L.name}</span>
                ${T?`<span style="color:var(--green);font-size:11px">✅ ×${T}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function y(g,r,o){if(r.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=r.map((n,h)=>{const i=n.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${u(n.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${n.mapName||n.mapId} <span style="color:${u(n.tier)};font-size:12px">T${n.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${i.length>0?i.map(b=>b.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${i.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${h}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${h}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(n=>{n.addEventListener("click",async()=>{try{const h=await d.request(`/player/${p}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(n.dataset.idx)})});c(h.message,"success"),e.player=h.player,f(),s.tab="run",await v()}catch(h){c(h.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(n=>{n.addEventListener("click",()=>l(parseInt(n.dataset.idx)))})}function l(g){var n;const r=((n=s.data)==null?void 0:n.modifiers)||[],o=document.createElement("div");o.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",o.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${r.map(h=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${h.id}">
          <span style="flex:1"><strong>${h.name}</strong><br><span style="font-size:11px;opacity:0.6">${h.desc} · IIQ +${h.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,o.addEventListener("click",async h=>{const i=h.target.closest("[data-modid]");if(i)try{const b=await d.request(`/player/${p}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:i.dataset.modid})});c(b.message,"success"),e.player=b.player,f(),o.remove(),await v()}catch(b){c(b.message,"error")}else h.target===o&&o.remove()}),document.body.appendChild(o)}function x(g,r){var h,i;const o=r.currentWave/r.totalWaves*100,n=r.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${r.mapName} <span style="color:${u(r.tier)}">T${r.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${r.currentWave}/${r.totalWaves}
            ${n.length>0?" · "+n.map(b=>b.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${o}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${s.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(h=document.getElementById("btnTCFight"))==null||h.addEventListener("click",async()=>{s.fighting=!0,m();try{const b=await d.request(`/player/${p}/atlas-maps/fight`,{method:"POST"});e.player=b.player,f();const L=b.result!=="map_failed";c(b.message,L?"success":"error"),s.fighting=!1,(b.result==="map_complete"||b.result==="map_failed")&&(s.tab="atlas"),await v()}catch(b){c(b.message,"error"),s.fighting=!1,m()}}),(i=document.getElementById("btnTCQuit"))==null||i.addEventListener("click",async()=>{try{await d.request(`/player/${p}/atlas-maps/abandon`,{method:"POST"}),c("Đã rời Tiên Cảnh","info"),s.tab="atlas",await v()}catch(b){c(b.message,"error")}})}function u(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}s.loaded?m():v()}function lt(a,t){const{state:e}=t,d=e._travelTab||"map";a.innerHTML=`
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
  `,a.querySelectorAll(".tab-btn").forEach(f=>{f.addEventListener("click",()=>{e._travelTab=f.dataset.tab,lt(a,t)})});const c=a.querySelector("#travelTabContent");d==="map"?K(c,t):d==="dungeon"?rt(c,t):dt(c,t)}async function K(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t;a.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[p,s]=await Promise.all([d.request("/data/areas"),d.request(`/player/${e.playerId}/area`)]),v=p.areas||[],m=s.area,$=s.player,y=s.traveling||!1,l=s.travelRemaining||0,x=s.travelDestination||"";s.message&&c(s.message,"success"),s.player&&(e.player=s.player,f());const u=e.exploration||{},g=u[($==null?void 0:$.currentArea)||"thanh_lam_tran"],r=(m==null?void 0:m.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",o=(g==null?void 0:g.staminaCost)||10,n={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận",cuu_u_than_uyen:"👿 Cửu U ma khí: +35% ST, +20% Tốc Độ",thai_co_hong_hoang:"🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp",chu_thien_tinh_hai:"🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn",hon_don_tien_vuc:"🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số",hon_nguyen_dao_canh:"👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính"},h=n[$==null?void 0:$.currentArea]||"",i=[...v].sort((b,L)=>(b.sort_order||b.mapY||0)-(L.sort_order||L.mapY||0));if(a.innerHTML=`
      ${y?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${x}</span></strong>
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
                  ${r}
                  <span class="badge" style="background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.4);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${o} TL/lần</div>
              </div>
            </div>
            ${m!=null&&m.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${m.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Yêu Cầu: Lv.${(m==null?void 0:m.min_level)||1}+</span>
              ${h?`<span class="badge" style="background:rgba(255,215,0,0.1);color:var(--gold);border:1px solid rgba(255,215,0,0.25);font-size:11px">${h}</span>`:""}
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
            ${i.map((b,L)=>{const T=u[b.id],k=b.id===$.currentArea&&!y,w=$.level<(b.min_level||1),C=parseInt(b.travel_time)||0,S=parseInt(b.stamina_cost)||(T==null?void 0:T.staminaCost)||10,H=n[b.id]||"",P=b.tier||"Bát Hoang",N=S>=100?"rgba(239,68,68,0.2)":S>=40?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)",O=S>=100?"var(--red)":S>=40?"var(--gold)":"var(--text-dim)";let A="rgba(255,255,255,0.08)",_="rgba(255,255,255,0.03)";return k?(A="rgba(34, 197, 94, 0.6)",_="rgba(34, 197, 94, 0.08)"):w&&(A="rgba(239, 68, 68, 0.2)",_="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${k?"current-realm":""} ${w?"locked-realm":""}" 
                     style="border:1px solid ${A}; background:${_}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${k?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${k?"var(--green)":w?"var(--text-dim)":"var(--text-bright)"}">
                        #${L+1} ${b.name}
                      </div>
                      ${w?'<span style="color:var(--red); font-size:12px">🔒 Khóa</span>':""}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      🏛️ ${P}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${b.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${w?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${w?"var(--red)":"var(--text-dim)"}">
                        Lv.${b.min_level||1}+
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${C>0?`⏱ ${C}s`:"⚡ Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${N}; color:${O}; border:1px solid ${N}">
                        🏃 -${S} TL (Dò thám)
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
                    `:w?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${b.min_level}
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${b.id}" ${y?"disabled":""}>
                        ${C>0?`🚶 Vi Hành (${C}s)`:"⚡ Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,a.querySelectorAll("[data-travel]").forEach(b=>{b.addEventListener("click",async L=>{L.stopPropagation();const T=b.dataset.travel;a.querySelectorAll("[data-travel]").forEach(k=>{k.tagName==="BUTTON"&&(k.disabled=!0),k.style.pointerEvents="none"});try{const k=await d.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:T})});k.player&&(e.player=k.player,f()),c(k.message,"success"),K(a,t)}catch(k){c(k.message||"Lỗi di chuyển!","error"),K(a,t)}})}),y&&l>0){let b=l;const L=l,T=setInterval(async()=>{b--;const k=document.getElementById("travelTimer"),w=document.getElementById("travelBar");if(k&&(k.textContent=`⏳ ${Math.max(0,b)}s`),w&&(w.style.width=`${Math.max(0,b/L*100)}%`),b<=0){clearInterval(T);try{const C=await d.request(`/player/${e.playerId}/travel-check`,{method:"POST"});C.player&&(e.player=C.player,f()),C.arrived&&c(C.message,"success"),K(a,t)}catch{K(a,t)}}},1e3)}}catch(p){a.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(p)}}function Q(a,t){var n,h;const{state:e,renderGame:d,notify:c,updateSidebar:f}=t,p=e.player,s=e.recipes||[],v=e.medicines||[],m=e._alchemyTab||"recipes",$=i=>{const b=v.find(L=>L.id===i);return b?(b.icon||"💊")+" "+b.name:i};let y=0,l=0,x=0,u=0;(p.skills||[]).forEach(i=>{const b=typeof i=="string"?i:i.id,L=typeof i=="string"?1:i.level||1;b==="tinh_che"&&(y=L*2),b==="phu_an_thuat"&&(l=L*5),b==="linh_kiem_thuat"&&(x=L*10),b==="cuong_hoa_thuat"&&(u=L*15)});const g=i=>i.split("_").map(b=>b.charAt(0).toUpperCase()+b.slice(1)).join(" "),r=[];Object.values(p.equipment||{}).forEach(i=>{i&&r.push({...i,loc:"eq"})}),(p.inventory||[]).filter(i=>i.slot&&i.slot!=="consumable").forEach(i=>r.push({...i,loc:"inv"}));let o=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${m==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${m==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${y||l||x||u?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${y?`<span>🔥 Thành công +${y}%</span>`:""}
      ${l?`<span>💎 Giảm phí -${l}%</span>`:""}
      ${x?`<span>✨ Chất lượng +${x}%</span>`:""}
      ${u?`<span>⬆️ Nâng đôi ${u}%</span>`:""}
    </div>
    `:""}
  `;if(m==="recipes"){if(o+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!p.materials||Object.keys(p.materials).length===0)o+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[i,b]of Object.entries(p.materials))o+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(i)} <span style="color:var(--gold)">x${b}</span></div>`;o+="</div></div>",o+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',s.length===0?o+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':s.forEach(i=>{var C;const b=$(i.target),L=Math.min(100,(i.successRate||100)+y);let T="";(C=i.requirements)!=null&&C.skill&&(T=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(i.requirements.skill)} lv${i.requirements.level||1}</div>`);let k="";i.materials.forEach(S=>{var P;const H=((P=p.materials)==null?void 0:P[S.id])||0;k+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${H>=S.amount?"var(--green)":"var(--red)"};font-weight:bold">${H}/${S.amount}</span> ${g(S.id)}</span>`});const w=v.find(S=>S.id===i.target)||{};o+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${b}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${i.tier}</span>
                  <span>Tỉ lệ: <span style="color:${L>=80?"var(--green)":"var(--blue)"};font-weight:bold">${L}%</span></span>
                  <span>🔥 Phí: ${i.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${T}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${k}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${w.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${i.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),o+="</div></div>"}else o+=`
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
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(i=>{const b=Math.max(1,Math.round(i.cost*(1-l/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${i.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${i.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${i.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${i.id}" style="width:100%">
                💎 ${b} ${l>0?`<s style="opacity:0.4;font-size:10px">${i.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;a.innerHTML=o,a.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{e._alchemyTab=i.dataset.tab,Q(a,t)})}),a.querySelectorAll(".accordion-header").forEach(i=>{i.addEventListener("click",()=>{const b=i.nextElementSibling;b.style.display==="none"?(b.style.display="block",i.querySelector(".text-dim:last-child").textContent="▲"):(b.style.display="none",i.querySelector(".text-dim:last-child").textContent="▼")})}),a.querySelectorAll(".btn-craft").forEach(i=>{i.addEventListener("click",async b=>{b.stopPropagation();const L=s.find(T=>T.id===i.dataset.recipe);if(L&&p.gold<(L.cost||0))return c("Không đủ linh thạch!","error");try{const T=await q.craftItem(p.id,i.dataset.recipe);e.player=T.player,c(T.message,T.success?"success":"error"),d()}catch(T){c(T.message,"error")}})}),a.querySelectorAll(".btn-currency").forEach(i=>{i.addEventListener("click",async()=>{const b=document.getElementById("selItem");if(!(b!=null&&b.value))return c("Chọn trang bị trước!","error");const L=i.dataset.cid;let T=-1;if(L==="thien_menh_phu"){const k=r.find(S=>S.id===b.value),w=(k==null?void 0:k.affixes)||[];if(w.length===0)return c("Item không có affix để khóa!","error");const C=prompt(`Chọn affix để khóa (0-${w.length-1}):
${w.map((S,H)=>`${H}: ${S.name||S.stat} +${S.value}`).join(`
`)}`);if(C===null)return;if(T=parseInt(C),isNaN(T)||T<0||T>=w.length)return c("Chỉ số không hợp lệ!","error")}i.disabled=!0,i.textContent="⏳...";try{const k=await q.applyCurrency(p.id,L,b.value,T);c(k.message,"success"),e.player=k.player,f(),Q(a,t)}catch(k){c(k.message,"error"),i.disabled=!1,i.textContent="💎 Dùng"}})}),(n=document.getElementById("selItem"))==null||n.addEventListener("change",()=>{const i=r.find(L=>L.id===document.getElementById("selItem").value),b=document.getElementById("itemPreview");i&&b&&(b.innerHTML=(i.affixes||[]).map(L=>`<span style="color:var(--blue)">• ${L.name||L.stat} +${L.value}</span>`).join(" | ")||"Không có affix")}),(h=document.getElementById("selItem"))==null||h.dispatchEvent(new Event("change"))}function ot(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;async function s(){try{const m=await d.getDailyQuests(p);e._dailyQuests=m,v()}catch(m){c(m.message,"error")}}function v(){const m=e._dailyQuests||{},$=m.quests||[];m.allCompleted;const y=m.bonusReward;a.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${$.map(l=>{const x=l.quest_info||{},u=l.target>0?Math.min(100,Math.round(l.progress/l.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${l.claimed?"var(--text-dim)":l.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${x.name||l.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${x.difficulty==="Khó"?"var(--red)":x.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${x.difficulty||"?"}</span>
              </div>
              ${l.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':l.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${l.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${l.progress}/${l.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${x.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${u}%;background:${l.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${x.goldReward||0} · ✨ ${x.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${y?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${y.gold} 💎, +${y.xp} EXP</div>
      </div>
      `:""}
    `,a.querySelectorAll(".btn-claim").forEach(l=>l.addEventListener("click",async()=>{try{const x=await d.claimDailyQuest(p,parseInt(l.dataset.qid));c(x.message,"success"),e.player=x.player,f(),await s()}catch(x){c(x.message,"error")}}))}s()}function ct(a,t){const{state:e,api:d,notify:c,renderGame:f}=t,p=e._questTab||"npc";a.innerHTML=`
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
  `,a.querySelectorAll("[data-qtab]").forEach(m=>{m.addEventListener("click",()=>{e._questTab=m.dataset.qtab,ct(a,t)})});const s=a.querySelector("#questTabContent");if(p==="daily"){ot(s,t);return}v();async function v(){try{const $=(await d.getQuests(e.playerId)).quests||[],y=document.getElementById("questList");if(!y)return;if($.length===0){y.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}y.innerHTML=$.map(l=>{const x=l.questAmount>0?Math.min(100,l.progress/l.questAmount*100):0,u=l.progress>=l.questAmount,g=l.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${u?"quest-done":""}" data-quest-id="${l.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${l.npcIcon||"🧓"} ${l.npcName||"NPC"}</span>
              <span class="quest-type">${g} ${l.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${l.questName||l.quest_id}</div>
            <div class="quest-desc">${l.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${u?"hp":"energy"}" style="width:${x}%"></div>
              </div>
              <span class="quest-progress-text">${l.progress}/${l.questAmount}</span>
            </div>
            ${u?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${l.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),y.querySelectorAll(".quest-complete-btn").forEach(l=>{l.addEventListener("click",async()=>{const x=l.dataset.qid;l.disabled=!0,l.textContent="⏳...";try{const u=await d.completeQuest(e.playerId,x);e.player=u.player,c(u.message,"success"),u.skillGained&&c(`🎯 Lĩnh ngộ: ${u.skillGained}!`,"success"),f()}catch(u){c(u.message||"Lỗi trả quest","error"),l.disabled=!1,l.textContent="✅ Trả Nhiệm Vụ"}})})}catch(m){console.error("Error loading quests:",m);const $=document.getElementById("questList");$&&($.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function Pt(a,t){const{state:e,api:d,notify:c,renderGame:f}=t;if(e.player.role!=="admin"){a.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const p=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let s="monsters";a.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${p.map(o=>`
          <button class="admin-tab ${o.id===s?"active":""}" data-tab="${o.id}">${o.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",o=>{const n=o.target.closest(".admin-tab");n&&(s=n.dataset.tab,document.querySelectorAll(".admin-tab").forEach(h=>h.classList.remove("active")),n.classList.add("active"),v(s))}),v(s);async function v(o){const n=document.getElementById("adminContent");if(n){n.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const h=await d.request(`/admin/${o}?adminId=${e.playerId}`);m(o,h,n)}catch(h){n.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${h.message}</div></div>`}}}function m(o,n,h){o==="monsters"?$(n,h):o==="npcs"?y(n,h):o==="areas"?l(n,h):x(o,n,h)}function $(o,n){const h=o.monsters||[];n.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${h.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${h.map(i=>{var b,L,T,k,w,C,S,H;return`
          <div class="admin-card" data-id="${i.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${i.name} ${i.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((L=(b=o.tierInfo)==null?void 0:b[i.tier])==null?void 0:L.color)||"#888"}">${((k=(T=o.tierInfo)==null?void 0:T[i.tier])==null?void 0:k.name)||"T"+i.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((w=i.stats)==null?void 0:w.hp)||"?"}</div>
              <div>💪 ${((C=i.stats)==null?void 0:C.strength)||"?"}</div>
              <div>🏃 ${((S=i.stats)==null?void 0:S.speed)||"?"}</div>
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
    `,g(n,o,"monsters","monsters")}function y(o,n){const h=o.npcs||[];n.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${h.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${h.map(i=>`
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
    `,g(n,o,"npcs","npcs")}function l(o,n){const h=Object.keys(o);n.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${h.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${h.map(i=>{const b=o[i];return`
            <div class="admin-card" data-id="${i}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${b.name||i}</span>
                <span class="badge" style="background:var(--orange)">⚡${b.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(b.events||[]).map(L=>`<span>${L.type}: ${L.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${i}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,n.querySelectorAll(".admin-edit-area").forEach(i=>{i.addEventListener("click",()=>{const b=i.dataset.id,L=o[b];u(b,L,`areas/${b}`)})})}function x(o,n,h){var L;const i=JSON.stringify(n,null,2),b=i.split(`
`).length;h.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${o} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(b+5,30)}">${r(i)}</textarea>
    `,(L=document.getElementById("btnSaveGeneric"))==null||L.addEventListener("click",async()=>{try{const T=document.getElementById("genericEditor").value,k=JSON.parse(T);c("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(T){c("JSON không hợp lệ: "+T.message,"error")}})}function u(o,n,h,i){const b=JSON.stringify(n,null,2),L=document.createElement("div");L.className="admin-modal-overlay",L.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${o}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${r(b)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(L),L.querySelectorAll(".admin-modal-close").forEach(T=>{T.addEventListener("click",()=>L.remove())}),L.addEventListener("click",T=>{T.target===L&&L.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const T=document.getElementById("modalEditor").value,k=JSON.parse(T);await d.request(`/admin/${h}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:k})}),c("✅ Đã lưu!","success"),L.remove(),v(s)}catch(T){c("Lỗi: "+T.message,"error")}})}function g(o,n,h,i){o.querySelectorAll(".admin-edit-btn").forEach(b=>{b.addEventListener("click",()=>{const L=b.dataset.id,k=(n[i]||[]).find(w=>w.id===L);k&&u(L,k,`${h}/${L}`)})})}function r(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function pt(a,t){const{state:e,api:d,notify:c,renderGame:f,updateSidebar:p}=t,s=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const v=e._social;async function m(){try{const g=await d.getRelationships(s);v.relationships=g,v.loaded=!0,$()}catch(g){c(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function $(){const{friends:g,enemies:r,pendingSent:o,pendingReceived:n}=v.relationships,h=n.length;a.innerHTML=`
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
          ⚔️ Kẻ Thù (${r.length})
        </button>
        <button class="btn btn--sm ${v.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${h>0?`<span class="badge">${h}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${v.tab==="friends"?y(g):""}
        ${v.tab==="enemies"?l(r):""}
        ${v.tab==="pending"?x(n,o):""}
      </div>
    `,u()}function y(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(r=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${r.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${r.level} · ${r.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${r.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${r.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function l(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(r=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${r.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${r.level} · ${r.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${r.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${r.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function x(g,r){let o="";return g.length>0&&(o+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',o+=g.map(n=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${n.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${n.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${n.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join("")),r.length>0&&(o+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',o+=r.map(n=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${n.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${n.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&r.length===0&&(o='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),o}function u(){var g,r;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var n;const o=(n=document.getElementById("socialSearch"))==null?void 0:n.value.trim();if(!o||o.length<2)return c("Cần ít nhất 2 ký tự","error");v.searchQuery=o;try{const h=await d.searchPlayers(o);v.searchResults=h.players||[],$()}catch(h){c(h.message,"error")}}),(r=document.getElementById("socialSearch"))==null||r.addEventListener("keydown",o=>{var n;o.key==="Enter"&&((n=document.getElementById("btnSearch"))==null||n.click())}),document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{v.tab=o.dataset.tab,$()})}),document.querySelectorAll("[data-action]").forEach(o=>{o.addEventListener("click",async()=>{const n=o.dataset.action,h=o.dataset.target;o.disabled=!0;try{let i;switch(n){case"add-friend":i=await d.addFriend(s,h);break;case"accept-friend":i=await d.acceptFriend(s,h);break;case"reject-friend":i=await d.rejectFriend(s,h);break;case"remove-friend":i=await d.removeFriend(s,h);break;case"add-enemy":i=await d.addEnemy(s,h);break;case"remove-enemy":i=await d.removeEnemy(s,h);break}c(i.message||"Thành công!","success"),await m()}catch(i){c(i.message||"Lỗi!","error"),o.disabled=!1}})})}v.loaded?$():m()}function gt(a,t){const{state:e,api:d,notify:c}=t,f=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const p=e._chat;async function s(){try{const[r,o]=await Promise.all([d.getGlobalChat(),d.getChatFriends(f)]);p.globalMessages=r.messages||[],p.friends=o.friends||[],p.globalMessages.length>0&&(p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id),p.loaded=!0,$(),v()}catch(r){c(r.message||"Lỗi tải chat","error")}}function v(){m(),p.pollTimer=setInterval(async()=>{try{if(p.tab==="global"){const r=await d.getGlobalChat(p.lastGlobalId);r.messages&&r.messages.length>0&&(p.globalMessages.push(...r.messages),p.globalMessages.length>100&&(p.globalMessages=p.globalMessages.slice(-100)),p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id,l(),x())}else if(p.tab==="private"&&p.selectedFriend){const r=await d.getPrivateChat(f,p.selectedFriend.id,p.lastPrivateId);r.messages&&r.messages.length>0&&(p.privateMessages.push(...r.messages),p.privateMessages.length>100&&(p.privateMessages=p.privateMessages.slice(-100)),p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id,l(),x())}}catch{}},5e3)}function m(){p.pollTimer&&(clearInterval(p.pollTimer),p.pollTimer=null)}function $(){const r=p.tab==="global"?p.globalMessages:p.privateMessages;a.innerHTML=`
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
            ${p.friends.map(o=>{var n;return`<option value="${o.id}" ${((n=p.selectedFriend)==null?void 0:n.id)===o.id?"selected":""}>${o.name} (Lv.${o.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${y(r)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${p.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),x()}function y(r){return r.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':r.map(o=>{const n=o.sender_id===f,h=new Date(o.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${n?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${h}</span>
          <span style="font-weight:600;color:${n?"var(--blue)":"var(--gold)"}"> ${o.sender_name}</span>
          <span style="opacity:0.8">: ${u(o.message)}</span>
        </div>
      `}).join("")}function l(){const r=document.getElementById("chatMessages");if(!r)return;const o=p.tab==="global"?p.globalMessages:p.privateMessages;r.innerHTML=y(o)}function x(){const r=document.getElementById("chatMessages");r&&(r.scrollTop=r.scrollHeight)}function u(r){const o=document.createElement("div");return o.textContent=r,o.innerHTML}function g(){var o,n,h;document.querySelectorAll("[data-chat-tab]").forEach(i=>{i.addEventListener("click",()=>{p.tab=i.dataset.chatTab,p.tab==="global"&&(p.lastGlobalId=p.globalMessages.length>0?p.globalMessages[p.globalMessages.length-1].id:0),$(),v()})}),(o=document.getElementById("friendSelect"))==null||o.addEventListener("change",async i=>{const b=i.target.value;if(!b){p.selectedFriend=null,p.privateMessages=[],$();return}p.selectedFriend=p.friends.find(L=>L.id===b)||null,p.lastPrivateId=0;try{const L=await d.getPrivateChat(f,b);p.privateMessages=L.messages||[],p.privateMessages.length>0&&(p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id),l(),x()}catch(L){c(L.message,"error")}});const r=async()=>{var L,T;const i=document.getElementById("chatInput"),b=i==null?void 0:i.value.trim();if(b){if(p.tab==="private"&&!p.selectedFriend)return c("Chọn Đạo Hữu trước!","error");try{if(await d.sendChat(f,p.tab,p.tab==="private"?p.selectedFriend.id:null,b),i.value="",p.tab==="global"){const k=await d.getGlobalChat(p.lastGlobalId);((L=k.messages)==null?void 0:L.length)>0&&(p.globalMessages.push(...k.messages),p.lastGlobalId=p.globalMessages[p.globalMessages.length-1].id)}else{const k=await d.getPrivateChat(f,p.selectedFriend.id,p.lastPrivateId);((T=k.messages)==null?void 0:T.length)>0&&(p.privateMessages.push(...k.messages),p.lastPrivateId=p.privateMessages[p.privateMessages.length-1].id)}l(),x()}catch(k){c(k.message||"Lỗi gửi tin nhắn","error")}}};(n=document.getElementById("btnSend"))==null||n.addEventListener("click",r),(h=document.getElementById("chatInput"))==null||h.addEventListener("keydown",i=>{i.key==="Enter"&&r()})}t.renderGame,p.loaded?($(),v()):s()}function ut(a,t){const{state:e,api:d,notify:c,updateSidebar:f,renderGame:p}=t,s=e.playerId,v=e._auctionTab||"browse";async function m(){try{const[l,x]=await Promise.all([d.getAuctions(),d.getMyAuctions(s)]);e._auctionListings=l.listings||[],e._auctionMine=x.listings||[],$()}catch(l){c(l.message,"error")}}function $(){const l=e._auctionListings||[],x=e._auctionMine||[],u=(e.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");a.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${v==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${v==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${v==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${x.length})</button>
      </div>

      ${v==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${l.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':l.map(g=>{const r=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${r.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${r.rarity||"?"}]</span>
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
    `,y()}function y(){var l;a.querySelectorAll(".tab-btn").forEach(x=>x.addEventListener("click",()=>{e._auctionTab=x.dataset.tab,m()})),a.querySelectorAll(".btn-buy").forEach(x=>x.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const u=await d.buyAuction(s,parseInt(x.dataset.lid));c(u.message,"success"),e.player=u.player,f(),await m()}catch(u){c(u.message,"error")}})),a.querySelectorAll(".btn-cancel").forEach(x=>x.addEventListener("click",async()=>{try{const u=await d.cancelAuction(s,parseInt(x.dataset.lid));c(u.message,"success"),e.player=u.player,f(),await m()}catch(u){c(u.message,"error")}})),(l=document.getElementById("btnListItem"))==null||l.addEventListener("click",async()=>{var r,o,n;const x=(r=document.getElementById("selSellItem"))==null?void 0:r.value,u=parseInt(((o=document.getElementById("inpPrice"))==null?void 0:o.value)||"500"),g=parseInt(((n=document.getElementById("selDuration"))==null?void 0:n.value)||"24");try{const h=await d.listAuction(s,x,u,g);c(h.message,"success"),e.player=h.player,f(),e._auctionTab="mine",await m()}catch(h){c(h.message,"error")}})}m()}function It(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const s=e._market;async function v(){try{const[r,o]=await Promise.all([d.getMarketListings(s.filter,s.sort),d.getMyListings(p)]);s.listings=r.listings||[],s.myListings=o.listings||[],s.loaded=!0,$()}catch(r){c(r.message||"Lỗi tải Giao Dịch Đài","error")}}async function m(){try{const[r,o]=await Promise.all([d.getMugTargets(p),d.getMugLog(p)]);s.mugTargets=r.targets||[],s.mugCooldown=r.mugCooldown||0,s.mugLog=o.logs||[],$()}catch(r){c(r.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function $(){const r=e.player;if(a.innerHTML=`
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

      ${s.tab==="browse"?y():s.tab==="my"?l():s.tab==="auction"?'<div id="auctionSubContent"></div>':x()}
    `,g(),s.tab==="auction"){const o=a.querySelector("#auctionSubContent");o&&ut(o,t)}}function y(){let r=`
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
    `,o=s.listings;if(s.search.trim()){const n=s.search.toLowerCase().trim();o=o.filter(h=>{var i;return h.item_name.toLowerCase().includes(n)?!0:(i=h.item_data)!=null&&i.affixes?h.item_data.affixes.some(b=>(b.stat||"").toLowerCase().includes(n)||(b.type||"").toLowerCase().includes(n)):!1})}return o.length===0?r+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(r+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',r+=o.map(n=>{var T,k;const h=n.item_type==="item"?"⚔️":n.item_type==="material"?"🧱":"💊",i=((T=n.item_data)==null?void 0:T.rarity)||"",b=n.seller_id===p,L=(k=n.item_data)!=null&&k.affixes?n.item_data.affixes.map(w=>`${w.stat} ${w.type==="flat"?"+":""}${w.value}${w.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${h}
                <span style="color:var(--gold)">${n.item_name}</span>
                ${n.quantity>1?`<span style="opacity:0.5"> x${n.quantity}</span>`:""}
                ${i?`<span class="rarity-${i}" style="font-size:11px;margin-left:4px">[${i}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${n.seller_name}</span>
                ${L?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${L}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${n.price}${n.quantity>1?"/cái":""}</span>
              ${b?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${n.id}" data-qty="${n.quantity}" data-price="${n.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),r+="</div></div>"),r}function l(){if(s.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let r='<div class="panel"><div class="panel-body no-pad">';return r+=s.myListings.map(o=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${o.item_type==="item"?"⚔️":o.item_type==="material"?"🧱":"💊"} ${o.item_name} ${o.quantity>1?`<span style="opacity:0.5">x${o.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${o.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${o.id}">📦 Thu Hồi</button>
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
    `;return s.mugTargets.length===0?r+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':r+=s.mugTargets.map(o=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${o.gender==="female"?"♀":"♂"} ${o.name}</div>
            <div class="item-meta">Lv.${o.level} · ${o.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${o.id}" ${s.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),r+="</div></div>",s.mugLog.length>0&&(r+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${s.mugLog.map(o=>{const n=o.attacker_id===p,h=o.outcome==="success"?"✅":"❌",i=o.outcome==="success"?"var(--green)":"var(--red)",b=n?o.outcome==="success"?`Cướp ${o.victim_name}: +${o.gold_stolen} 💎`:`Phục kích ${o.victim_name} thất bại!`:o.outcome==="success"?`Bị ${o.attacker_name} cướp: -${o.gold_stolen} 💎`:`${o.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${i}">${h} ${b} <span style="opacity:0.4;margin-left:auto">${new Date(o.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),r}function u(r){const o=Object.entries(r.materials||{}).map(([b,L])=>({id:b,qty:L,type:"material",name:b})),n=Object.entries(r.medicines||{}).map(([b,L])=>({id:b,qty:L,type:"medicine",name:b})),h=(r.inventory||[]).map(b=>({id:b.id,qty:1,type:"item",name:b.name||b.id})),i=[...o,...n,...h];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${i.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${i.map(b=>`<option value="${b.type}|${b.id}">${b.type==="item"?"⚔️":b.type==="material"?"🧱":"💊"} ${b.name} ${b.qty>1?`(có: ${b.qty})`:""}</option>`).join("")}
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
    `}function g(){var r,o,n,h;document.querySelectorAll("[data-mtab]").forEach(i=>{i.addEventListener("click",()=>{if(s.tab=i.dataset.mtab,s.tab==="mug"&&s.mugTargets.length===0){m();return}$()})}),(r=document.getElementById("btnShowList"))==null||r.addEventListener("click",()=>{s.showListForm=!s.showListForm,$()}),document.querySelectorAll("[data-filter]").forEach(i=>{i.addEventListener("click",async()=>{s.filter=i.dataset.filter,await v()})}),(o=document.getElementById("sortSelect"))==null||o.addEventListener("change",async i=>{s.sort=i.target.value,await v()}),(n=document.getElementById("searchInput"))==null||n.addEventListener("input",i=>{s.search=i.target.value,$();const b=document.getElementById("searchInput");b&&(b.focus(),b.setSelectionRange(s.search.length,s.search.length))}),(h=document.getElementById("btnConfirmList"))==null||h.addEventListener("click",async()=>{var w,C,S;const i=(w=document.getElementById("listItem"))==null?void 0:w.value;if(!i)return;const[b,L]=i.split("|"),T=parseInt((C=document.getElementById("listQty"))==null?void 0:C.value)||1,k=parseInt((S=document.getElementById("listPrice"))==null?void 0:S.value)||0;if(k<=0)return c("Giá phải lớn hơn 0!","error");try{const H=await d.listForSale(p,b,L,T,k);c(H.message,"success"),e.player=H.player,f(),s.showListForm=!1,await v()}catch(H){c(H.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(i=>{i.addEventListener("click",async()=>{const b=parseInt(i.dataset.buy),L=parseInt(i.dataset.qty),T=parseInt(i.dataset.price);let k=1;if(L>1){const w=prompt(`Mua bao nhiêu? (tối đa ${L}, giá ${T} 💎/cái)`,"1");if(!w)return;k=Math.min(parseInt(w)||1,L)}i.disabled=!0;try{const w=await d.buyFromMarket(p,b,k);c(w.message,"success"),e.player=w.player,f(),await v()}catch(w){c(w.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(i=>{i.addEventListener("click",async()=>{i.disabled=!0;try{const b=await d.cancelListing(p,parseInt(i.dataset.cancel));c(b.message,"success"),e.player=b.player,f(),await v()}catch(b){c(b.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(i=>{i.addEventListener("click",async()=>{const b=i.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){i.disabled=!0,i.textContent="⏳...";try{const L=await d.mugPlayer(p,b);c(L.message,L.success?"success":"error"),e.player=L.player,f(),await m()}catch(L){c(L.message,"error"),i.disabled=!1,i.textContent="💀 Phục Kích"}}})})}s.tab==="mug"?m():s.loaded?$():v()}function Mt(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;let s=!1,v=null;async function m(){try{v=await d.getRealmInfo(p),s=!0,$()}catch(x){c(x.message||"Lỗi tải Cảnh Giới","error")}}function $(){if(!v)return;const x=v.current,u=v.allRealms||[],g=e.player,r=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;a.innerHTML=`
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
              ${Object.entries(x.bonuses).filter(([,o])=>o>0).map(([o,n])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${n} ${o}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${x.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${x.unlocks.map(o=>`<span style="font-size:12px;opacity:0.7">✅ ${o}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${x.canBreakthrough?y(x):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${u.map(o=>{const n=o.tier===x.tier,h=o.tier<x.tier,b=o.tier>x.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${n?`2px solid ${o.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${b};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${o.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${o.color}">${o.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${o.levelMin}+</span>
                ${o.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${o.failChance}% thất bại</span>`:""}
                ${h?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${n?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,l()}function y(x){const u=x.nextRealm;if(!u)return"";const g=u.cost?`💎 ${u.cost.gold} + 🔮 ${u.cost.energy}`:"Miễn phí";return`
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
          Bonus mới: ${Object.entries(u.bonuses).filter(([,r])=>r>0).map(([r,o])=>`+${o} ${r}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${u.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function l(){var x;(x=document.getElementById("btnBreakthrough"))==null||x.addEventListener("click",async()=>{const u=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){u.disabled=!0,u.textContent="⏳ Đang đột phá...";try{const g=await d.attemptBreakthrough(p);g.success?(c(g.message,"success"),e.player=g.player,f(),await m()):(c(g.message,"error"),g.player&&(e.player=g.player,f()),await m())}catch(g){c(g.message||"Lỗi đột phá","error"),u.disabled=!1,u.textContent="⚡ ĐỘT PHÁ"}}})}m()}function Nt(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t;qt(a,t)}async function qt(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t;a.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const s=(await d.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,f()),s.length===0){a.innerHTML=`
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
            ${s.map(v=>{const m=new Date(v.created_at*1e3),$=m.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),y=m.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let l="📌";return l={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[v.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${$}</div>
                    <div>${y}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${l}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${v.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${v.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(p){a.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${p.message}</div></div>`}}function _t(a,t){const{state:e,api:d,notify:c,updateSidebar:f,renderGame:p}=t,s=e.playerId;e._housing||(e._housing={data:null,loaded:!1});const v=e._housing;async function m(){try{const u=await d.getHousing(s);v.data=u,v.loaded=!0,$()}catch(u){c(u.message||"Lỗi tải Động Phủ","error")}}function $(){const u=v.data;a.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${u.owned?l(u):y(u)}
    `,x()}function y(u){const g=u.tiers[1];return`
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
    `}function l(u){const g=u.gardenSlots||[],r=u.gardenHerbs||{};return`
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
            ${Array.from({length:u.maxSlots},(o,n)=>{const h=g[n]||{},i=!!h.herb,b=h.ready,L=h.remaining||0,T=Math.ceil(L/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${b?"var(--green)":i?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${i?`
                    <div style="font-size:20px">${b?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${h.herbName||h.herb}</div>
                    <div style="font-size:10px;color:${b?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${b?"✅ Sẵn sàng!":"⏳ "+T+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${n}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(r).map(([k,w])=>`<option value="${k}">${w.name}</option>`).join("")}
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
            ${Object.entries(u.formations).map(([o,n])=>{const h=n.currentLevel>=n.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${n.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${n.icon}</span>
                      <strong style="margin-left:4px">${n.name}</strong>
                      ${n.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${n.currentLevel}</span>`:""}
                    </div>
                    ${n.canBuild?h?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${o}">
                        ⬆ ${n.nextCost} 💎
                      </button>`:`<span style="font-size:10px;color:var(--red)">T${n.requiredTier}+</span>`}
                  </div>
                  <div style="font-size:11px;opacity:0.5;margin-top:4px">${n.description}</div>
                  ${n.currentLevel>0?`<div style="font-size:10px;color:var(--orange);margin-top:2px">Phí: ${n.nextDailyCost||(n.dailyCosts?n.dailyCosts[n.currentLevel-1]:"?")}/ngày</div>`:""}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `}function x(){var u,g,r,o;(u=document.getElementById("btnBuyHouse"))==null||u.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const n=await d.buyHousing(s);c(n.message,"success"),e.player=n.player,f(),await m()}catch(n){c(n.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const n=await d.buyHousing(s);c(n.message,"success"),e.player=n.player,f(),await m()}catch(n){c(n.message,"error")}}),document.querySelectorAll(".plant-select").forEach(n=>{n.addEventListener("change",async h=>{const i=h.target.value;if(!i)return;const b=parseInt(n.dataset.slot);try{const L=await d.plantHerb(s,i,b);c(L.message,"success"),await m()}catch(L){c(L.message,"error")}})}),(r=document.getElementById("btnHarvest"))==null||r.addEventListener("click",async()=>{try{const n=await d.harvestGarden(s);c(n.message,"success"),e.player=n.player,f(),await m()}catch(n){c(n.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(n=>{n.addEventListener("click",async()=>{const h=n.dataset.fid;n.disabled=!0,n.textContent="⏳...";try{const i=await d.upgradeFormation(s,h);c(i.message,"success"),e.player=i.player,f(),await m()}catch(i){c(i.message,"error"),n.disabled=!1,n.textContent="⬆ Nâng"}})}),(o=document.getElementById("btnMaintenance"))==null||o.addEventListener("click",async()=>{try{const n=await d.payMaintenance(s);c(n.message,"success"),e.player=n.player,f(),await m()}catch(n){c(n.message,"error")}})}v.loaded?$():m()}function Bt(a,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function d(){a.innerHTML=`
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
    `,a.querySelectorAll("[data-tab]").forEach(f=>{f.addEventListener("click",()=>{e._wikiTab=f.dataset.tab,d()})})}function c(f){return{lore:`
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
      `}[f]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}d()}function zt(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const s=e._npcShop;let v=parseInt(localStorage.getItem("npcShopIdx")||"0");async function m(){try{a.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const l=await d.getShops(p);s.shops=l.shops||[],s.tax=l.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},s.loaded=!0,v>=s.shops.length&&(v=0),$()}catch(l){c(l.message||"Lỗi tải shop","error")}}function $(){var o;if(s.shops.length===0){a.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const l=s.shops[v]||s.shops[0],x=s.shops.map((n,h)=>`
      <button class="skill-tab ${h===v?"active":""}" data-shop-idx="${h}">
        ${n.icon||"🧓"} ${n.name}
      </button>
    `).join(""),u={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},g={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},r=(l.items||[]).map(n=>{var T,k;const h=u[n.rarity||"common"]||"#888",i=g[n.rarity||"common"]||"Phàm",b=(n.remainingStock??1)<=0,L=(((T=e.player)==null?void 0:T.gold)??0)>=(n.currentPrice||0);return`
        <div class="shop-item-card ${b?"out-of-stock":""}" style="border-left:3px solid ${h}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${h}">${n.name}</div>
              <div class="shop-item-rarity" style="color:${h}">${i} · Tầng ${n.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${b?"var(--red)":"var(--green)"}">
                ${b?"❌ Hết hàng":`📦 ${n.remainingStock}/${n.dailyStock}`}
              </span>
            </div>
          </div>
          ${n.description?`<div class="shop-item-desc">${n.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${L?"":"too-expensive"}">
              💎 ${((k=n.currentPrice)==null?void 0:k.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${l.id}" data-item="${n.id}" 
                value="1" min="1" max="${n.remainingStock||1}" 
                ${b?"disabled":""}>
              <button class="btn btn--sm ${b?"":L?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${l.id}" data-item="${n.id}"
                ${b||!L?"disabled":""}>
                ${b?"❌":L?"🛒 Mua":"💸 Thiếu"}
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
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${s.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(((o=e.player)==null?void 0:o.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${l.area||"Không rõ"}</div>
      </div>

      ${s.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${x}</div>`:""}

      <div class="shop-items-grid">
        ${r||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,y()}function y(){a.querySelectorAll(".skill-tab[data-shop-idx]").forEach(l=>{l.addEventListener("click",()=>{v=parseInt(l.dataset.shopIdx),localStorage.setItem("npcShopIdx",v),$()})}),a.querySelectorAll(".btn-buy").forEach(l=>{l.addEventListener("click",async()=>{const x=l.dataset.shop,u=l.dataset.item,g=a.querySelector(`.buy-qty[data-shop="${x}"][data-item="${u}"]`),r=parseInt((g==null?void 0:g.value)||1);l.disabled=!0,l.textContent="⏳...";try{const o=await d.buyFromShop(p,x,u,r);c(o.message,"success"),e.player=o.player,f(),await m()}catch(o){c(o.message,"error"),l.disabled=!1,l.textContent="🛒 Mua"}})})}s.loaded?$():m()}function Ot(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const s=e._guild;async function v(){try{s.data=await d.getMyGuild(p),s.loaded=!0,$()}catch(u){c(u.message||"Lỗi","error")}}async function m(){try{const u=await d.listGuilds();s.allGuilds=u.guilds||[],$()}catch(u){c(u.message,"error")}}function $(){const u=s.data;a.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${u!=null&&u.inGuild?l(u):y(u)}
    `,x()}function y(u){return`
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
    `}function l(u){var n;const g=u.guild,r=u.members||[],o=u.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${g.tag}] ${g.name} <span style="opacity:0.3">Lv${g.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((n=g.levelInfo)==null?void 0:n.name)||""} · ${g.memberCount}/${g.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${g.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${g.dailyUpkeep}/ngày</span>
              ${g.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(g.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(g.buffs).map(([h,i])=>`${h} +${i}%`).join(", ")}
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
            ${o.slice(0,10).map(h=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(h.created_at).toLocaleString("vi")}</span>
                ${h.detail||h.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${r.length}/${g.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${r.map(h=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${h.role==="leader"?"👑":h.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${h.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${h.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${u.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function x(){var u,g,r,o,n,h;(u=document.getElementById("btnCreate"))==null||u.addEventListener("click",async()=>{var T,k,w,C,S,H;const i=(k=(T=document.getElementById("guildName"))==null?void 0:T.value)==null?void 0:k.trim(),b=(C=(w=document.getElementById("guildTag"))==null?void 0:w.value)==null?void 0:C.trim(),L=(H=(S=document.getElementById("guildDesc"))==null?void 0:S.value)==null?void 0:H.trim();if(!i||!b)return c("Nhập tên và tag!","error");try{const P=await d.createGuild(p,i,b,L);c(P.message,"success"),e.player=P.player,f(),s.loaded=!1,await v()}catch(P){c(P.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",m),document.querySelectorAll(".btn-join").forEach(i=>{i.addEventListener("click",async()=>{try{const b=await d.joinGuild(p,parseInt(i.dataset.gid));c(b.message,"success"),s.loaded=!1,await v()}catch(b){c(b.message,"error")}})}),(r=document.getElementById("btnContribute"))==null||r.addEventListener("click",async()=>{var b;const i=parseInt(((b=document.getElementById("contributeAmt"))==null?void 0:b.value)||0);if(!(i<=0))try{const L=await d.contributeGuild(p,i);c(L.message,"success"),e.player=L.player,f(),await v()}catch(L){c(L.message,"error")}}),(o=document.getElementById("btnUpgradeGuild"))==null||o.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const i=await d.upgradeGuild(p);c(i.message,"success"),await v()}catch(i){c(i.message,"error")}}),(n=document.getElementById("btnPayUpkeep"))==null||n.addEventListener("click",async()=>{try{const i=await d.payGuildUpkeep(s.data.guild.id);c(i.message,"success"),await v()}catch(i){c(i.message,"error")}}),(h=document.getElementById("btnLeave"))==null||h.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const i=await d.leaveGuild(p);c(i.message,"success"),s.loaded=!1,await v()}catch(i){c(i.message,"error")}})}s.loaded?$():v()}function At(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const s=e._profile;function v(){a.innerHTML=`
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

      ${s.viewing?m(s.viewing):""}

      ${s.results.length>0&&!s.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${s.results.length})</div>
        <div class="panel-body no-pad">
          ${s.results.map(l=>`
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
      `:!s.viewing&&s.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,$()}function m(l){var r,o,n;const x=l.id===p,u=l.maxHp>0?Math.round(l.currentHp/l.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((r=l.name[0])==null?void 0:r.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${l.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${l.level} · ${((o=l.realmInfo)==null?void 0:o.fullName)||"Phàm Nhân"}
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
              <div style="height:100%;width:${u}%;background:${u>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(n=l.gold)==null?void 0:n.toLocaleString()} 💎</strong></div>

          ${x?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${l.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${l.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function $(){var l,x,u,g,r;(l=document.getElementById("btnSearch"))==null||l.addEventListener("click",y),(x=document.getElementById("searchInput"))==null||x.addEventListener("keydown",o=>{o.key==="Enter"&&y()}),document.querySelectorAll(".btn-view, [data-view]").forEach(o=>{o.addEventListener("click",async()=>{const n=o.dataset.vid||o.dataset.view;try{const h=await d.getPlayerProfile(n);s.viewing=h.profile,v()}catch(h){c(h.message,"error")}})}),(u=document.getElementById("btnAttack"))==null||u.addEventListener("click",async()=>{const o=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${s.viewing.name}?`))try{const n=await d.mugPlayer(p,o);c(n.message,n.won?"success":"error"),n.player&&(e.player=n.player,f())}catch(n){c(n.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const o=document.getElementById("btnAddFriend").dataset.tid;try{const n=await d.addFriend(p,o);c(n.message||"Đã gửi lời mời!","success")}catch(n){c(n.message,"error")}}),(r=document.getElementById("btnBackSearch"))==null||r.addEventListener("click",()=>{s.viewing=null,v()})}async function y(){var u;const l=document.getElementById("searchInput"),x=(u=l==null?void 0:l.value)==null?void 0:u.trim();if(!x||x.length<2)return c("Nhập ít nhất 2 ký tự!","error");s.searchQuery=x,s.viewing=null;try{const g=await d.searchPlayers(x);s.results=g.players||[],v()}catch(g){c(g.message,"error")}}v()}function Rt(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const s=e._arena;async function v(){try{s.data=await d.getArena(p),s.loaded=!0,m()}catch(y){c(y.message,"error")}}function m(){var o,n,h,i,b,L,T,k;const y=s.data,l=(y==null?void 0:y.arena)||{},x=l.rank||{},u=parseInt(l.streak)||0,g=u>=5?`🔥x${u}`:u>=3?`⚡x${u}`:u>0?`${u}W`:u<0?`${Math.abs(u)}L`:"",r=u>=5?"var(--gold)":u>=3?"var(--orange)":u>0?"var(--green)":u<0?"var(--red)":"var(--text-dim)";a.innerHTML=`
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
              ELO: <strong>${l.rating||1e3}</strong> · ${l.wins||0}W/${l.losses||0}L
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
      ${(o=s.lastResult)!=null&&o.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(n=s.lastResult.newRank)==null?void 0:n.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(h=s.lastResult.newRank)==null?void 0:h.name}!</div>
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
            ${(b=s.lastResult.opponent)!=null&&b.rank?s.lastResult.opponent.rank.icon:""} 
            (ELO ${(L=s.lastResult.opponent)==null?void 0:L.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${s.lastResult.ratingChange>0?"+":""}${s.lastResult.ratingChange}
            ${s.lastResult.goldEarned>0?` · +${s.lastResult.goldEarned} 💎`:""}
          </div>
          ${(T=s.lastResult.combatLog)!=null&&T.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${s.lastResult.combatLog.map(w=>`<div>${w}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(y.opponents||[]).length>0?(y.opponents||[]).map(w=>{var C,S,H;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((C=w.rank)==null?void 0:C.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${w.name} <span style="opacity:0.4;font-size:11px">Lv.${w.level}</span></div>
                <div style="font-size:11px;color:${((S=w.rank)==null?void 0:S.color)||"#888"}">${((H=w.rank)==null?void 0:H.name)||"Đồng"} · ELO ${w.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${w.player_id}" ${s.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${s.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${y.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(y.top10||[]).map((w,C)=>{var S,H;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${C<3?"var(--gold)":"var(--text-dim)"}">#${C+1}</span>
                <span>${((S=w.rank)==null?void 0:S.icon)||""}</span>
                <span style="flex:1">${w.name}</span>
                <span style="color:${((H=w.rank)==null?void 0:H.color)||"var(--blue)"}; font-weight:600">${w.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(y.history||[]).map(w=>{const C=w.winner_id===p;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${C?"var(--green)":"var(--red)"}">
                  ${C?"✅":"❌"} vs ${w.attacker_id===p?w.defender_name:w.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${w.rating_change>0?"+":""}${w.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,a.querySelectorAll(".btn-fight-opp").forEach(w=>{w.addEventListener("click",C=>$(C.target.dataset.oid))}),(k=document.getElementById("btnRandomFight"))==null||k.addEventListener("click",()=>$(null))}async function $(y){s.fighting=!0,m();try{const l=await d.request(`/player/${p}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:y})});s.lastResult=l,e.player=l.player,f(),c(l.message,l.won?"success":"error"),s.fighting=!1,await v()}catch(l){c(l.message,"error"),s.fighting=!1,m()}}s.loaded?m():v()}function Gt(a,t){const{state:e,api:d,notify:c,updateSidebar:f}=t,p=e.playerId;async function s(){try{e._worldBoss=await d.getWorldBoss(),v()}catch(m){c(m.message,"error")}}function v(){var g;const m=e._worldBoss||{},$=m.boss||{},y=m.hpPercent||0,l=m.topContributors||[],x=m.rewards||{},u=$.status==="active"&&$.current_hp>0;a.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${u?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${$.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${$.level||"?"} · ${u?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${($.current_hp||0).toLocaleString()} / ${($.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${y}%;background:${y>50?"var(--red)":y>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
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
          ${l.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':l.map((r,o)=>{var n;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${o<3?"var(--gold)":"var(--text-dim)"}">#${o+1}</span>
                <span style="flex:1">${r.name}</span>
                <span style="color:var(--red)">${(n=r.total_damage)==null?void 0:n.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${r.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const r=document.getElementById("btnAttackBoss");r.disabled=!0,r.textContent="⏳ Đang giao chiến...";const o=document.getElementById("bossCombatResult");try{const n=await d.attackWorldBoss(p);if(e.player=n.player,f(),n.log&&n.log.length>0){const h=n.log.map(T=>T.startsWith("---")?`<div class="turn">${T}</div>`:T.includes("hụt")?`<div class="miss">${T}</div>`:T.includes("né được")?`<div class="dodge">${T}</div>`:T.includes("CHÍNH MẠNG")||T.includes("💥")?`<div class="crit">${T}</div>`:T.includes("🔥")?`<div class="heavy text-orange">${T}</div>`:T.includes("chặn hoàn toàn")||T.includes("🛡")?`<div class="dodge">${T}</div>`:T.includes("ngã xuống")||T.includes("💀")?`<div class="death">${T}</div>`:T.includes("Chiến thắng")||T.includes("🏆")?`<div class="victory">${T}</div>`:T.includes("bỏ chạy")||T.includes("🏃")?`<div class="flee">${T}</div>`:T.includes("Bất phân")||T.includes("🤝")?`<div class="stalemate">${T}</div>`:T.includes("🧪")?`<div class="status-effect text-purple">${T}</div>`:T.includes("💔")?`<div class="dot-damage text-purple bold">${T}</div>`:T.includes("✨")?`<div class="regen text-green">${T}</div>`:`<div class="hit">${T}</div>`).join(""),i={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},b=i[n.outcome]||i.loss,L=Math.max(0,e.player.currentHp/e.player.maxHp*100);o.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${b.icon} ${b.text}
                <span class="subtitle">${n.turns}/${n.maxTurns||25} lượt · ⚔️ ${n.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${b.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${L}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${$.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(n.bossHp/n.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${n.bossHp.toLocaleString()}/${n.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${h}</div>
            </div>`}n.defeated?c(n.message,"success"):c(`⚔️ ${n.damage} dmg!`,"info"),await s()}catch(n){c(n.message,"error"),r.disabled=!1,r.textContent="⚔️ Tấn Công"}})}s()}function jt(a,t){const{state:e,api:d,notify:c,updateSidebar:f,renderGame:p}=t,s=e.playerId,v={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function m(){var y;try{const[l,x]=await Promise.all([d.getGachaPools(),d.getGachaPity(s)]);e._gacha={pools:l.pools||{},pity:x.pity||{},results:((y=e._gacha)==null?void 0:y.results)||[]},$()}catch(l){c(l.message,"error")}}function $(){const y=e._gacha||{},l=y.pools||{},x=y.pity||{},u=y.results||[];a.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(l).map(([g,r])=>{var n,h,i;const o=x[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${r.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${v.legendary}">★ ${(n=r.rates)==null?void 0:n.legendary}%</span> ·
                <span style="color:${v.rare}">◆ ${(h=r.rates)==null?void 0:h.rare}%</span> ·
                <span style="color:${v.uncommon}">● ${(i=r.rates)==null?void 0:i.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${o.pulls_since_rare||0}/${r.pityRare} · Legend: ${o.pulls_since_legendary||0}/${r.pityLegendary}
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
            ${u.map(g=>{var r,o,n,h;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${v[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((r=g.item)==null?void 0:r.slot)==="weapon"?"⚔️":((o=g.item)==null?void 0:o.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${v[g.rarity]}">${((n=g.item)==null?void 0:n.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((h=g.item)==null?void 0:h.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,a.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const r=g.dataset.pool,o=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const n=await d.gachaPull(e.playerId,r,o);c(n.message,"success"),e.player=n.player,f(),e._gacha.results=n.results||[],e._gacha.pity[r]=n.pity,$()}catch(n){c(n.message,"error"),g.disabled=!1}}))}m()}function Kt(a,t){const{state:e,api:d,notify:c}=t;e._lbTab||(e._lbTab="level");async function f(){const s=e._lbTab||"level";a.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const v=await d.getLeaderboard(s);e._lbData=v,p()}catch(v){a.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${v.message}
      </div></div>`}}function p(){const s=e._lbTab||"level",m=(e._lbData||{}).rankings||[],y=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(x=>`
      <button class="skill-tab ${s===x.id?"active":""}" data-tab="${x.id}">
        ${x.icon} ${x.name}
      </button>
    `).join("");let l="";m.length===0?l='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':s==="guild"?l=m.map((x,u)=>`
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
      `).join(""):s==="pvp"?l=m.map((x,u)=>`
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
      `).join(""):l=m.map((x,u)=>`
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
      `).join(""),a.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${y}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${l}
        </div>
      </div>
    `,a.querySelectorAll(".skill-tab[data-tab]").forEach(x=>{x.addEventListener("click",()=>{e._lbTab=x.dataset.tab,f()})})}f()}const E={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},vt=document.getElementById("app"),U={get state(){return E},api:q,notify:R,renderGame:B,updateSidebar:Ut};async function Dt(){const a=localStorage.getItem("playerId");if(a&&!E.playerId)try{const t=await q.getPlayer(a);E.playerId=a,E.player=t.player,await D(),B();return}catch{localStorage.removeItem("playerId")}if(!E.playerId)try{const t=await q.login("admin","admin");E.playerId=t.id,E.player=t.player,localStorage.setItem("playerId",t.id),await D(),B();return}catch(t){console.warn("Dev auto-login failed. Fallback to intro UI.",t)}E.playerId?B():ht()}function ht(){var t,e;const a=E.authTab||"login";vt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(d=>{d.addEventListener("click",()=>{E.authTab=d.dataset.auth,ht()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const d=document.getElementById("inpUsername").value.trim(),c=document.getElementById("inpPassword").value;if(!d||!c)return R("Vui lòng nhập đầy đủ","error");try{const f=await q.login(d,c);E.playerId=f.id,E.player=f.player,localStorage.setItem("playerId",f.id),R(f.message,"success"),await D(),B()}catch(f){R(f.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var s,v;const d=document.getElementById("inpUsername").value.trim(),c=document.getElementById("inpPassword").value,f=((s=document.getElementById("inpName"))==null?void 0:s.value.trim())||"Vô Danh",p=((v=document.querySelector('input[name="gender"]:checked'))==null?void 0:v.value)||"male";if(!d||!c)return R("Vui lòng nhập đầy đủ","error");try{const m=await q.register(d,c,f,p);E.playerId=m.id,E.player=m.player,localStorage.setItem("playerId",m.id),R(m.message,"success"),await D(),B()}catch(m){R(m.message||"Đăng ký thất bại!","error")}})}function mt(a){const t=Math.floor(Date.now()/1e3),e=[];return a.hospitalUntil&&a.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:a.hospitalUntil,color:"var(--red)"}),a.medCooldownUntil&&a.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:a.medCooldownUntil,color:"var(--orange)"}),a.travelArrivesAt&&a.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:a.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(d=>{const c=Math.max(0,d.endTime-t),f=Math.floor(c/60),p=c%60,s=f>0?`${f}p${String(p).padStart(2,"0")}s`:`${p}s`;return`<span class="status-icon" data-end="${d.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${d.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${d.color};white-space:nowrap;
      " title="${d.label}">${d.icon} <span class="cd-time">${s}</span></span>`}).join("")}
  </div>`}let V=null;function Vt(){V&&clearInterval(V),V=setInterval(()=>{const a=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),d=Math.max(0,e-a);if(d<=0){t.remove();return}const c=Math.floor(d/60),f=d%60,p=t.querySelector(".cd-time");p&&(p.textContent=c>0?`${c}p${String(f).padStart(2,"0")}s`:`${f}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function yt(a){let t="";const d={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"},cuu_u_than_uyen:{icon:"👿",tooltip:"Cửu U Ma Khí: Tăng 35% Sát Thương, 20% Tốc Độ"},thai_co_hong_hoang:{icon:"🦕",tooltip:"Hồng Hoang Cổ Khí: Tăng 25% Máu, 20% Giáp"},chu_thien_tinh_hai:{icon:"🌌",tooltip:"Tinh Tú Luân Chuyển: Tăng 30% Tốc Độ, 25% Nhanh Nhẹn"},hon_don_tien_vuc:{icon:"🔮",tooltip:"Hỗn Độn Tiên Khí: Tăng 35% Toàn Bộ Thuộc Tính"},hon_nguyen_dao_canh:{icon:"👑",tooltip:"Hỗn Nguyên Đạo Vực: Tăng 60% Sát Thương, 50% Toàn Thuộc Tính"}}[a.currentArea];return d&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${d.tooltip}">${d.icon} Cảnh Vực</span>`),a.combatBuffs&&a.combatBuffs.length>0&&a.combatBuffs.forEach(c=>{let f="💊",p="Buff";c.type==="status"&&c.stat==="poison"?(f="☠️",p="Trúng Độc"):c.type==="status"&&c.stat==="confuse"?(f="👹",p="Ma Hóa"):c.stat==="allStats"||c.stat==="hp"||c.stat==="damage"?(f="🔥",p="Cuồng Nộ"):c.stat==="defense"||c.stat==="resist"?(f="🛡️",p="Kiên Cố"):c.stat==="speed"||c.stat==="dexterity"?(f="💨",p="Thân Pháp"):(f="✨",p="Cường Hóa");let s=c.duration?` (-${c.duration} Trận)`:"",v=`Hiệu ứng: ${c.stat} (${c.type} ${c.value})${c.duration?` - Còn lại: ${c.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${v}">${f} ${p}${s}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function B(){var u,g,r,o,n,h,i,b,L;const a=E.player;if(!a)return;const t=Math.max(0,a.currentHp/a.maxHp*100),e=a.maxStamina>0?Math.max(0,a.currentStamina/a.maxStamina*100):0,d=a.maxEnergy>0?Math.max(0,a.currentEnergy/a.maxEnergy*100):0,c=a.xpToNext&&a.xpToNext>0?Math.min(100,Math.max(0,(a.xp||0)/a.xpToNext*100)):0,f=E.exploration?E.exploration[a.currentArea||"thanh_lam_tran"]:null,p=f?f.name:"Khám Phá",s=E._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");E._collapsedNav=s;const m={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[E.currentPage];m&&(s[m]=!1),vt.innerHTML=`
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
          <div class="player-meta">Lv.${a.level} · ${((u=a.realmInfo)==null?void 0:u.fullName)||"?"}</div>
          ${mt(a)}
          ${yt(a)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${a.currentHp}/${a.maxHp}
                ${a.currentHp<a.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(g=a.skills)!=null&&g.some(T=>T.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${a.currentStamina??100}/${a.maxStamina??100}
                ${(a.currentStamina??100)<(a.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((r=a.stats)==null?void 0:r.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${e}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${a.currentEnergy}/${a.maxEnergy}
                ${a.currentEnergy<a.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((o=a.stats)==null?void 0:o.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${d}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>✨ Tu Vi (Cấp ${a.level})</span>
              <span>${(a.xp??0).toLocaleString()}/${(a.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${c.toFixed(1)}%)</span></span>
            </div>
            <div class="bar-track"><div class="bar-fill xp" style="width:${c}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${a.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${E.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(a.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
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
            📍 ${p} ${a.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':a.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(a.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
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
              ${(a.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(E.currentPage)?"active":""}" data-page="quests">
              <span class="icon">📜</span> Thiên Cơ Nhiệm Vụ
              ${(a.activeQuests||[]).filter(T=>T.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(a.activeQuests||[]).filter(T=>T.status==="active").length}</span>`:""}
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
              ${(h=(n=E.player)==null?void 0:n.realmInfo)!=null&&h.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite" title="Có thể đột phá!">!</span>':""}
            </li>
            <li class="nav-item ${["skills","education","library","glitch"].includes(E.currentPage)?"active":""}" data-page="skills">
              <span class="icon">⚡</span> Công Pháp & Kỹ Năng
              ${(a.glitchInsight||0)>0?`<span class="badge" style="background: #a855f7;" title="Điểm Thấu Triệt">${a.glitchInsight}</span>`:""}
            </li>
            <li class="nav-item ${E.currentPage==="inventory"?"active":""}" data-page="inventory">
              <span class="icon">🎒</span> Càn Khôn Túi
              ${(a.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)" title="Đan độc">⏳</span>':""}
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

          ${a.role==="admin"?`
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(T=>{T.addEventListener("click",()=>{E.currentPage=T.dataset.page,B()})}),document.querySelectorAll(".nav-section[data-section]").forEach(T=>{T.addEventListener("click",()=>{const k=T.dataset.section;E._collapsedNav=E._collapsedNav||{},E._collapsedNav[k]=!E._collapsedNav[k],localStorage.setItem("collapsedNav",JSON.stringify(E._collapsedNav));const w=document.getElementById(`sec-${k}`);w&&(w.classList.toggle("collapsed",E._collapsedNav[k]),T.classList.toggle("collapsed",E._collapsedNav[k]))})}),(i=document.getElementById("btnFabChat"))==null||i.addEventListener("click",()=>F("chat")),(b=document.getElementById("btnFabSocial"))==null||b.addEventListener("click",()=>F("social"));const $=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');$&&$.addEventListener("click",T=>{T.stopPropagation(),E.currentPage="events",E.popupOpen=!1,B()}),(L=document.getElementById("btnPopupClose"))==null||L.addEventListener("click",()=>{E.popupOpen=!1,B()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(T=>{T.addEventListener("click",()=>F(T.dataset.popup))}),Qt(),E.popupOpen&&Ft();const y=document.getElementById("searchPlayerInput"),l=document.getElementById("searchResults");let x=null;y&&l&&(y.addEventListener("input",()=>{clearTimeout(x);const T=y.value.trim();if(T.length<2){l.style.display="none";return}x=setTimeout(async()=>{try{const k=await q.searchPlayers(T),w=k.players||k.results||[];w.length===0?l.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':l.innerHTML=w.map(C=>{var S;return`
              <div class="search-result" data-pid="${C.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${C.name} <span style="opacity:0.4">Lv.${C.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((S=C.realmInfo)==null?void 0:S.name)||""}</span>
              </div>
            `}).join(""),l.style.display="block",l.querySelectorAll(".search-result").forEach(C=>{C.addEventListener("click",()=>{E.currentPage="profile",E._viewProfileId=C.dataset.pid,l.style.display="none",y.value="",B()}),C.addEventListener("mouseenter",()=>C.style.background="rgba(255,255,255,0.08)"),C.addEventListener("mouseleave",()=>C.style.background="transparent")})}catch{l.style.display="none"}},300)}),y.addEventListener("blur",()=>{setTimeout(()=>{l.style.display="none"},200)}),y.addEventListener("keydown",T=>{T.key==="Escape"&&(l.style.display="none",y.blur())})),Vt()}function F(a){E.popupOpen=!0,E.popupPage=a,B()}function Ft(){const a=document.getElementById("popupContent");a&&(E.popupPage==="chat"?gt(a,U):E.popupPage==="social"&&pt(a,U))}const Jt={combat:Tt,education:nt,stats:Lt,skills:Y,inventory:J,travel:lt,alchemy:Q,quests:ct,admin:Pt,social:pt,chat:gt,market:It,realm:Mt,events:Nt,dungeon:rt,housing:_t,wiki:Bt,npcshop:zt,guild:Ot,library:W,profile:At,arena:Rt,auction:ut,dailyquest:ot,worldboss:Gt,gacha:jt,leaderboard:Kt,tiencanh:dt,glitch:(a,t)=>{localStorage.setItem("skillsTab","glitch"),Y(a,t)}};function Qt(){const a=document.getElementById("pageContent");if(!a)return;const t=Jt[E.currentPage];t&&t(a,U)}function Ut(){var f,p,s,v,m;const a=E.player;if(!a)return;const t=Math.max(0,a.currentHp/a.maxHp*100),e=a.maxEnergy>0?Math.max(0,a.currentEnergy/a.maxEnergy*100):0,d=document.querySelector(".sidebar-player");if(d){const $=a.maxStamina>0?Math.max(0,a.currentStamina/a.maxStamina*100):0,y=a.xpToNext&&a.xpToNext>0?Math.min(100,Math.max(0,(a.xp||0)/a.xpToNext*100)):0;d.innerHTML=`
      <div class="player-name">${a.name}</div>
      <div class="player-meta">Lv.${a.level} · ${((f=a.realmInfo)==null?void 0:f.fullName)||"?"}</div>
      ${mt(a)}
      ${yt(a)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${a.currentHp}/${a.maxHp}
            ${a.currentHp<a.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(p=a.skills)!=null&&p.some(l=>l.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${t}%" data-low="${t<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${a.currentStamina??100}/${a.maxStamina??100}
            ${(a.currentStamina??100)<(a.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((s=a.stats)==null?void 0:s.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${$}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${a.currentEnergy}/${a.maxEnergy}
            ${a.currentEnergy<a.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((v=a.stats)==null?void 0:v.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${e}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>✨ Tu Vi (Cấp ${a.level})</span>
          <span>${(a.xp??0).toLocaleString()}/${(a.xpToNext??100).toLocaleString()} <span style="font-size:10px; color:var(--text-dim); margin-left:2px;">(${y.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${y}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${a.gold??0} Linh Thạch</div>`}const c=document.querySelector('.nav-item[data-page="stats"]');if(c){let $="";a.statPoints>0&&($+=`<span class="badge">${a.statPoints}</span>`),(m=a.realmInfo)!=null&&m.canBreakthrough&&($+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),c.querySelectorAll(".badge").forEach(y=>y.remove()),c.insertAdjacentHTML("beforeend",$)}}async function D(){try{const[a,t,e,d,c]=await Promise.all([q.getMonsters(),q.getSkills(),q.getItems(),q.getMedicines(),q.getEducation()]);E.monsters=a.monsters||[],E.skills=t.skills||[],E.items=e.items||[],E.medicines=d.medicines||[],E.educationTrees=c.trees||[],E.exploration=await q.getExploration(),E.recipes=(await q.getRecipes()).recipes,E.npcs=(await q.getNpcs()).npcs||[]}catch(a){console.error("Lỗi tải dữ liệu:",a)}}function R(a,t="info"){var d;(d=document.querySelector(".notification"))==null||d.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=a,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}Dt();
//# sourceMappingURL=index-DOb8qyKX.js.map
