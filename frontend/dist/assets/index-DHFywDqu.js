(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const x of r)if(x.type==="childList")for(const g of x.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function t(r){const x={};return r.integrity&&(x.integrity=r.integrity),r.referrerPolicy&&(x.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?x.credentials="include":r.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function l(r){if(r.ep)return;r.ep=!0;const x=t(r);fetch(r.href,x)}})();const rt="/api";class dt{async request(e,t={}){try{const l=await fetch(`${rt}${e}`,{headers:{"Content-Type":"application/json",...t.headers},...t}),r=await l.json();if(!l.ok)throw new Error(r.error||`HTTP ${l.status}`);return r}catch(l){throw console.error(`API Error [${e}]:`,l),l}}register(e,t,l,r){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:e,password:t,name:l,gender:r})})}login(e,t){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})})}createPlayer(e,t){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:e,gender:t})})}getPlayer(e){return this.request(`/player/${e}`)}allocateStat(e,t,l=1){return this.request(`/player/${e}/allocate`,{method:"POST",body:JSON.stringify({stat:t,points:l})})}equipItem(e,t){return this.request(`/player/${e}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}learnSkill(e,t){return this.request(`/player/${e}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:t})})}equipSkill(e,t,l=!0){return this.request(`/player/${e}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:t,equip:l})})}healPlayer(e){return this.request(`/player/${e}/heal`,{method:"POST"})}useMedicine(e,t){return this.request(`/player/${e}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}trainStat(e,t){return this.request(`/player/${e}/train`,{method:"POST",body:JSON.stringify({stat:t})})}fullCombat(e,t=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e,monsterId:t})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(e,t){return this.request(`/player/${e}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}useItem(e,t){return this.request(`/player/${e}/use`,{method:"POST",body:JSON.stringify({itemId:t})})}useMedicine(e,t){return this.request(`/player/${e}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}generateItem(e,t){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,playerId:e})})}trainStat(e,t,l=1){return this.request(`/player/${e}/train`,{method:"POST",body:JSON.stringify({stat:t,count:l})})}allocateStat(e,t){return this.request(`/player/${e}/allocate`,{method:"POST",body:JSON.stringify({stat:t})})}attemptBreakthrough(e){return this.request(`/player/${e}/breakthrough`,{method:"POST"})}getRealm(e){return this.request(`/player/${e}/realm`)}craftItem(e,t){return this.request(`/player/${e}/craft`,{method:"POST",body:JSON.stringify({recipeId:t})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(e,t,l,r=-1){return this.request(`/player/${e}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:l,lockAffixIndex:r})})}commitCrime(e,t){return this.request(`/player/${e}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:t})})}escapeJail(e){return this.request(`/player/${e}/escape-jail`,{method:"POST"})}bail(e){return this.request(`/player/${e}/bail`,{method:"POST"})}enrollNode(e,t,l){return this.request(`/player/${e}/enroll`,{method:"POST",body:JSON.stringify({nodeId:t,treeId:l})})}checkEducation(e){return this.request(`/player/${e}/check-education`,{method:"POST"})}generateItem(e="common",t=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,slot:t})})}explore(e){return this.request(`/player/${e}/explore`,{method:"POST"})}trackMonster(e,t){return this.request(`/player/${e}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:t})})}getAreaMonsters(e){return this.request(`/player/${e}/area-monsters`)}getNpc(e){return this.request(`/npc/${e}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(e,t,l){return this.request(`/player/${e}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:t,questId:l})})}completeQuest(e,t){return this.request(`/player/${e}/complete-quest`,{method:"POST",body:JSON.stringify({questId:t})})}getQuests(e){return this.request(`/player/${e}/quests`)}searchPlayers(e){return this.request(`/players/search?q=${encodeURIComponent(e)}`)}getRelationships(e){return this.request(`/player/${e}/relationships`)}interactPlayer(e,t,l,r){return this.request(`/player/${e}/interact`,{method:"POST",body:JSON.stringify({targetId:t,action:l,amount:r})})}addFriend(e,t){return this.request(`/player/${e}/add-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}acceptFriend(e,t){return this.request(`/player/${e}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}rejectFriend(e,t){return this.request(`/player/${e}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}removeFriend(e,t){return this.request(`/player/${e}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}addEnemy(e,t){return this.request(`/player/${e}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}removeEnemy(e,t){return this.request(`/player/${e}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}getGlobalChat(e=0){return this.request(`/chat/global?afterId=${e}`)}getPrivateChat(e,t,l=0){return this.request(`/chat/private/${e}?with=${t}&afterId=${l}`)}getChatFriends(e){return this.request(`/chat/friends/${e}`)}sendChat(e,t,l,r){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:e,channel:t,receiverId:l,message:r})})}getMarketListings(e="",t="newest"){const l=new URLSearchParams;return e&&l.set("type",e),t&&l.set("sort",t),this.request(`/market?${l.toString()}`)}getMyListings(e){return this.request(`/market/my/${e}`)}listForSale(e,t,l,r,x){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:e,itemType:t,itemId:l,quantity:r,price:x})})}buyFromMarket(e,t,l=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:e,listingId:t,quantity:l})})}cancelListing(e,t){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:e,listingId:t})})}getRealmInfo(e){return this.request(`/player/${e}/realm`)}attemptBreakthrough(e){return this.request(`/player/${e}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(e){return this.request(`/player/${e}/mug-targets`)}mugPlayer(e,t){return this.request(`/player/${e}/mug`,{method:"POST",body:JSON.stringify({victimId:t})})}getMugLog(e){return this.request(`/player/${e}/mug-log`)}getMapItems(e){return this.request(`/player/${e}/map-items`)}enterDungeon(e,t){return this.request(`/player/${e}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:t})})}fightDungeonWave(e){return this.request(`/player/${e}/dungeon/fight`,{method:"POST"})}abandonDungeon(e){return this.request(`/player/${e}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(e){return this.request(`/player/${e}/dungeon/history`)}getHousing(e){return this.request(`/player/${e}/housing`)}buyHousing(e){return this.request(`/player/${e}/housing/buy`,{method:"POST"})}plantHerb(e,t,l){return this.request(`/player/${e}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:t,slotIndex:l})})}harvestGarden(e){return this.request(`/player/${e}/housing/harvest`,{method:"POST"})}upgradeFormation(e,t){return this.request(`/player/${e}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:t})})}payMaintenance(e){return this.request(`/player/${e}/housing/maintenance`,{method:"POST"})}listForRent(e,t){return this.request(`/player/${e}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:t})})}getRentals(){return this.request("/housing/rentals")}rentRoom(e,t){return this.request(`/player/${e}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:t})})}getMyGuild(e){return this.request(`/player/${e}/guild`)}createGuild(e,t,l,r){return this.request(`/player/${e}/guild/create`,{method:"POST",body:JSON.stringify({name:t,tag:l,description:r})})}contributeGuild(e,t){return this.request(`/player/${e}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:t})})}upgradeGuild(e){return this.request(`/player/${e}/guild/upgrade`,{method:"POST"})}joinGuild(e,t){return this.request(`/player/${e}/guild/join`,{method:"POST",body:JSON.stringify({guildId:t})})}leaveGuild(e){return this.request(`/player/${e}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(e){return this.request(`/guild/${e}/upkeep`,{method:"POST"})}getTribulation(e){return this.request(`/player/${e}/tribulation`)}fightTribulation(e){return this.request(`/player/${e}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(e,t,l,r=-1){return this.request(`/player/${e}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:l,lockAffixIndex:r})})}getShops(e){return this.request("/shops")}buyFromShop(e,t,l,r=1){return this.request(`/player/${e}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:t,itemId:l,quantity:r})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(e){return this.request(`/players/lookup?q=${encodeURIComponent(e)}`)}getPlayerProfile(e){return this.request(`/player/${e}/profile`)}getArena(e){return this.request(`/player/${e}/arena`)}arenaFight(e){return this.request(`/player/${e}/arena/fight`,{method:"POST"})}getAuctions(e=""){return this.request(`/auction${e?"?q="+encodeURIComponent(e):""}`)}getMyAuctions(e){return this.request(`/player/${e}/auction/mine`)}listAuction(e,t,l,r=24){return this.request(`/player/${e}/auction/list`,{method:"POST",body:JSON.stringify({itemId:t,buyoutPrice:l,durationHours:r})})}buyAuction(e,t){return this.request(`/player/${e}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:t})})}cancelAuction(e,t){return this.request(`/player/${e}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:t})})}getDailyQuests(e){return this.request(`/player/${e}/daily-quests`)}claimDailyQuest(e,t){return this.request(`/player/${e}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:t})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(e){return this.request(`/player/${e}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(e){return this.request(`/player/${e}/gacha/pity`)}gachaPull(e,t,l=1){return this.request(`/player/${e}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:t,pulls:l})})}getLeaderboard(e){return this.request(`/leaderboard/${e}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(e){return this.request(`/events/quick/${e}`,{method:"POST"})}}const M=new dt;function lt(a,e){var v;const{state:t,api:l,notify:r,renderGame:x,updateSidebar:g}=e,o=t.player,u=t.exploration?t.exploration[o.currentArea||"thanh_lam_tran"]:null,m=u?u.name:"Vùng Đất Vô Danh",h=u?u.staminaCost:10;a.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${m}</h1>
      <div class="text-dim text-sm">Nơi cất giấu nhiều cơ duyên và hiểm nguy.</div>
    </div>

    <!-- KHÁM PHÁ -->
    <div class="panel" style="border-color: rgba(208, 165, 48, 0.4); box-shadow: 0 4px 15px rgba(208, 165, 48, 0.1);">
      <div class="panel-body text-center" style="padding: 24px 16px;">
        <h2 class="text-lg text-gold mb-sm">Dò Thám Xung Quanh</h2>
        <p class="text-dim mb-md">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
        <button class="btn btn--gold btn--lg" id="btnExplore" style="width: 100%; max-width: 300px; margin: 0 auto; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <span>🔍 Tìm Kiếm</span>
          <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${h} Thể Lực</span>
        </button>
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
    </div>`;const y=((v=o.insightLevels)==null?void 0:v.monster)??0;(async()=>{try{const s=await l.getAreaMonsters(o.id);if(s.monsters){t.player.trackedMonsters=s.monsters;const n=document.getElementById("trackedMonstersList");if(!n)return;if(s.monsters.length===0){n.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}n.innerHTML=s.monsters.map(p=>{var P,I,q,H,G;const i=p.currentHp/p.stats.hp*100,f=i>60?"var(--green)":i>30?"var(--orange)":"var(--red)";let T='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';y>=1&&(T=`<div class="item-desc text-sm text-dim mb-sm">${p.description||"Yêu thú vùng này."}</div>`);let L="";y>=1&&(L=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${i}%; background: ${f}; height: 100%;"></div>
            </div>`);let k=y>=2?`❤ ${p.currentHp}/${p.stats.hp}`:y>=1?"❤ ???":"",S="";y>=3&&(S=`
              <span class="text-orange">💪 ${p.stats.strength}</span>
              <span class="text-cyan">🏃 ${p.stats.speed}</span>
              <span class="text-green">🎯 ${p.stats.dexterity}</span>
              <span class="text-blue">🛡 ${p.stats.defense}</span>`);let C="";y>=4&&p.drops&&p.drops.length>0&&(C=`<div class="text-xs text-dim mt-sm" style="display:flex;gap:4px;flex-wrap:wrap;">
              📦 ${p.drops.map(N=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:9px;padding:1px 4px;">${N.id} (${y>=5?N.chance+"%":"?%"})</span>`).join("")}
            </div>`);let w="";if(y>=5){const N=((P=p.goldReward)==null?void 0:P[0])??((I=p.goldReward)==null?void 0:I.min)??"?",_=((q=p.goldReward)==null?void 0:q[1])??((H=p.goldReward)==null?void 0:H.max)??"?";w=`<span class="text-gold">💰 ${N}-${_}</span> <span class="text-purple">✨ ${p.xpReward??"?"} XP</span>`}return`
            <div class="list-item flex flex-col items-start gap-4">
              <div class="item-info" style="width: 100%;">
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-name text-lg">${p.name} <span class="text-xs text-dim">(${((G=p.instance_id)==null?void 0:G.substring(0,8))??""})</span></div>
                  <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${p.instance_id}" data-mid="${p.id}">Giao Chiến</button>
                </div>
                ${T}
                ${L}
                <div class="item-meta flex gap-4 text-xs flex-wrap">
                  ${k?`<span class="text-red">${k}</span>`:""}
                  ${S}
                  ${w}
                </div>
                ${C}
              </div>
            </div>`}).join(""),n.querySelectorAll(".btn-attack-tracked").forEach(p=>{p.addEventListener("click",i=>{const f=i.currentTarget;W(e,f.dataset.mid,f.dataset.inst)})})}}catch(s){console.error("Lỗi tải dấu vết:",s)}})(),(async()=>{const s=document.getElementById("areaMonstersList");if(s)try{const n=await l.getAreaMonsters(o.id),d=t.exploration?t.exploration[o.currentArea||"thanh_lam_tran"]:null,p=(t.monsters||[]).filter(f=>!f.isWorldBoss&&!f.is_world_boss),i=p.length>0?p:[];if(i.length===0){s.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không rõ quần thể yêu thú nơi đây.</div>';return}s.innerHTML=i.map(f=>{let T='<div class="item-desc text-sm text-dim mb-sm">Thông tin mờ ảo...</div>';return y>=1&&(T=`<div class="item-desc text-sm text-dim mb-sm">${f.description||"Yêu thú sinh sống tại vùng này."}</div>`),`
          <div class="list-item flex flex-col items-start gap-4" style="opacity: 0.8;">
            <div class="item-info" style="width: 100%;">
              <div class="item-name text-md text-gold">${f.name} <span class="text-xs text-dim ml-sm">${f.tierName||""}</span></div>
              ${T}
            </div>
          </div>
        `}).join("")}catch(n){console.error("Lỗi tải quần thể:",n)}})();const b=document.getElementById("btnExplore");b&&b.addEventListener("click",()=>ot(e)),a.querySelectorAll(".list-item.clickable").forEach(s=>{s.addEventListener("click",()=>startCombat(s.dataset.mid,e))})}async function ot(a){var g,o;const{state:e,api:t,notify:l,updateSidebar:r}=a,x=document.getElementById("exploreResult");if(x){x.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const u=await t.explore(e.playerId);e.player=u.player,r();const m=u.event;let h=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(m.type==="monster")h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${m.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${m.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${m.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(m.type==="worldBoss")h+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${m.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ mạnh!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${m.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${m.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(m.type==="npc"&&m.npcId){if(h+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${m.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${m.message}</div>
        <div class="text-sm text-dim mb-md" style="font-style:italic;">"${m.greeting}"</div>
      `,m.studyEffect){const y=m.studyEffect,c=y.isDebuff?"var(--red)":"var(--gold)";h+=`<div class="text-sm mt-sm" style="color:${c};animation:fadeIn 0.5s;">
          ${y.message}
        </div>`}m.hasQuests&&(h+=`<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${m.npcId}">💬 Nói Chuyện</button>`),h+='<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>',h+="</div></div>",h+='<div id="npcQuestModal"></div>'}else m.type==="player_encounter"&&m.player?h+=`
        <div style="font-size: 48px; margin-bottom: 8px;">👤</div>
        <div class="text-lg text-gold bold mb-sm">${m.message}</div>
        <div class="text-sm text-dim mb-md">Âm thầm lướt qua hay chủ động giao hảo?</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--blue flex-1" id="btnInteractFriend" data-pid="${m.player.id}">🤝 Kết Giao</button>
          <button class="btn btn--gold flex-1" id="btnInteractGift" data-pid="${m.player.id}">💎 Tặng 100 LT</button>
        </div>
      `:m.type==="npc"?h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">👴</div>
        <div class="text-lg text-gold bold mb-sm">${m.message}</div>
      `:m.type==="material"||m.type==="item"?(h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
        <div class="text-lg text-green bold mb-sm">${m.message}</div>
      `,m.questNotifications&&m.questNotifications.length>0&&m.questNotifications.forEach(y=>{h+=`<div class="text-sm text-gold mt-sm" style="animation: fadeIn 0.5s;">🏷️ ${y.message}</div>`})):h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${m.message}</div>
      `;m.type!=="monster"&&m.type!=="worldBoss"&&!(m.type==="npc"&&m.npcId)&&(h+='<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục hành trình</button>'),m.type==="npc"&&m.npcId||(h+="</div></div>"),x.innerHTML=h,m.type==="player_encounter"&&m.player&&(document.getElementById("btnInteractFriend").addEventListener("click",async y=>{try{const c=await t.addFriend(e.playerId,y.target.dataset.pid);(c.success||c.message)&&l(c.message||"Đã gửi lời mời!","success")}catch(c){l(c.message,"error")}}),document.getElementById("btnInteractGift").addEventListener("click",async y=>{var c;try{const $=await t.interactPlayer(e.playerId,y.target.dataset.pid,"gift",100);if($.player){e.player=$.player,r(),l($.message,"success");const b=y.target.closest(".panel-body");b&&(b.innerHTML='<div class="text-green text-lg mb-md">Đã bồi đắp hảo cảm!</div><button class="btn btn--blue" id="btnExploreContinueAfterGift">Rời đi</button>'),(c=document.getElementById("btnExploreContinueAfterGift"))==null||c.addEventListener("click",()=>{x.innerHTML=""})}}catch($){l($.message,"error")}})),(m.type==="monster"||m.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",y=>{x.innerHTML="",W(a,y.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async y=>{try{const c=await t.trackMonster(e.playerId,y.target.dataset.mid);c.success?(l(c.message,"success"),x.innerHTML="",typeof a.renderGame=="function"&&a.renderGame()):c.error&&l(c.error,"error")}catch(c){l("Lỗi theo dõi: "+c.message,"error")}})),m.type==="npc"&&m.npcId&&((g=document.getElementById("btnNpcInteract"))==null||g.addEventListener("click",async()=>{await ct(a,m.npcId,x)})),(o=document.getElementById("btnExploreContinue"))==null||o.addEventListener("click",()=>{x.innerHTML=""})}catch(u){x.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${u.message}</div></div>`}}}async function ct(a,e,t){const{state:l,api:r,notify:x,renderGame:g}=a,o=document.getElementById("npcQuestModal")||t;try{const m=(await r.getNpc(e)).npc;if(!m)return;const h=(l.player.activeQuests||[]).map(c=>c.quest_id);let y=m.quests.map(c=>{const $=h.includes(c.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${c.name}</span>
            <span class="text-xs badge" style="background:${c.type==="kill"?"var(--red)":"var(--green)"}">${c.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${c.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${c.rewards.gold?c.rewards.gold+"💎 ":""}${c.rewards.xp?c.rewards.xp+"✨ ":""}${c.rewards.skillChance?"🎯 "+c.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${$?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${e}" data-qid="${c.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");o.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${m.icon||"🧓"} ${m.name} <span class="subtitle">${m.profession}</span></div>
        <div class="panel-body">
          ${y||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,o.querySelectorAll(".btn-accept-quest").forEach(c=>{c.addEventListener("click",async()=>{c.disabled=!0,c.textContent="⏳...";try{const $=await r.acceptQuest(l.playerId,c.dataset.npc,c.dataset.qid);l.player=$.player,x($.message,"success"),g()}catch($){x($.message||"Lỗi nhận quest","error"),c.disabled=!1,c.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(u){console.error("NPC load error:",u)}}async function W(a,e,t=null){var m;const{state:l,api:r,notify:x,updateSidebar:g,renderGame:o}=a,u=document.getElementById("combatResult");if(u){if(!l.player.currentHp||l.player.currentHp<=0)return x("Đã kiệt sức! Hãy hồi phục trước.","error");if((l.player.currentEnergy||0)<10&&!l.player.currentEnergy)return x("Không đủ Linh lực!","error");if(l.player.hospitalRemaining>0)return x(`Đang tịnh dưỡng! Còn ${l.player.hospitalRemaining}s`,"error");u.innerHTML='<div class="panel border-red bg-dark"><div class="panel-body text-center text-red">⚔️ Đang giao chiến...</div></div>',u.scrollIntoView({behavior:"smooth"});try{const h=await r.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:l.playerId,monsterId:t?null:e,trackedMonsterId:t})});if(l.player=h.player,h.outcome==="no_energy"){u.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${h.log[0]}</div></div>`,g();return}const y=h.log.map(p=>p.startsWith("---")?`<div class="turn">${p}</div>`:p.includes("linh lực")&&p.includes("+")?`<div class="energy">${p}</div>`:p.includes("linh lực")?`<div class="energy-cost">${p}</div>`:p.includes("kiệt linh")?`<div class="miss">${p}</div>`:p.includes("hụt")?`<div class="miss">${p}</div>`:p.includes("né được")?`<div class="dodge">${p}</div>`:p.includes("CHÍNH MẠNG")||p.includes("💥")?`<div class="crit">${p}</div>`:p.includes("🔥")?`<div class="heavy text-orange">${p}</div>`:p.includes("chặn hoàn toàn")||p.includes("🛡")?`<div class="dodge">${p}</div>`:p.includes("ngã xuống")||p.includes("💀")?`<div class="death">${p}</div>`:p.includes("Chiến thắng")||p.includes("🏆")?`<div class="victory">${p}</div>`:p.includes("Đột phá")||p.includes("🎉")?`<div class="levelup">${p}</div>`:p.includes("bỏ chạy")||p.includes("🏃")?`<div class="flee">${p}</div>`:p.includes("Hết")||p.includes("⏰")?`<div class="stalemate">${p}</div>`:p.includes("Bất phân")||p.includes("🤝")?`<div class="stalemate">${p}</div>`:p.includes("Thoát thân")||p.includes("🚪")?`<div class="flee">${p}</div>`:p.includes("Linh Thạch")||p.includes("💰")?`<div class="gold-reward">${p}</div>`:p.includes("Tịnh dưỡng")||p.includes("🏥")?`<div class="hospital">${p}</div>`:p.includes("🧪")?`<div class="status-effect text-purple">${p}</div>`:p.includes("💔")?`<div class="dot-damage text-purple bold">${p}</div>`:p.includes("✨")?`<div class="regen text-green">${p}</div>`:p.includes("♻️")?`<div class="reflect text-red">${p}</div>`:`<div class="hit">${p}</div>`).join(""),c=h.monster,$=Math.max(0,l.player.currentHp/l.player.maxHp*100),b=Math.max(0,c.currentHp/c.maxHp*100),v={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Thất bại",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},s=v[h.outcome]||v.loss,n=(m=h.rewards)!=null&&m.gold?` · +${h.rewards.gold} 💰`:"",d=h.rewards?` · +${h.rewards.xp} XP${n}`:"";u.innerHTML=`
      <div class="panel">
        <div class="panel-title">${s.icon} ${s.text}
          <span class="subtitle">${h.turns}/${h.maxTurns||25} lượt${d}</span>
        </div>
        <div class="panel-body combat-result ${s.cls}">
          <div class="combat-opponents">
            <div class="fighter">
              <div class="f-name player-name">${l.player.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${$}%"></div></div>
              <div class="mini-hp-val">${l.player.currentHp}/${l.player.maxHp}</div>
            </div>
            <div class="vs">VS</div>
            <div class="fighter">
              <div class="f-name monster-name">${c.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${b}%"></div></div>
              <div class="mini-hp-val">${c.currentHp}/${c.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${y}</div>
      </div>`,g(),t&&typeof o=="function"&&setTimeout(()=>o(),1500)}catch(h){u.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${h.message}</div></div>`}}}function X(a,e){const{state:t,api:l,notify:r}=e,x=t.player,g=(x.skills||[]).find(y=>(typeof y=="string"?y:y.id)==="nhan_thuat"),o=g?g.level||1:0,u=[...t.skills].sort((y,c)=>(y.tier||1)-(c.tier||1)),m=(x.skills||[]).map(y=>typeof y=="string"?y:y.id),h={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};a.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${o}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${u.map(y=>{const c=m.includes(y.id),$=y.tier||1,b=$>o+1,v=$<=o;let s="";return y.requirements&&y.requirements.length>0?v||c?s=`<div class="mt-sm text-xs text-orange">Điều kiện: ${y.requirements.map(n=>`<br>• ${n}`).join("")}</div>`:b?s=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${$}.</div>`:s='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':s='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${c?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${y.name} ${c?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${c?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${h[$]||$}</span>
                    <span class="text-xs text-dim">${y.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${v||c?y.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${y.type!=="passive"&&y.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${y.cost} linh lực</div>`:""}
                
                ${s}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${c?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${b?"btn--dark":"btn--gold"} btn--sm btn-learn" ${b?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${y.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,a.querySelectorAll(".accordion-header").forEach(y=>{y.addEventListener("click",()=>{const c=y.nextElementSibling;c.style.display==="none"?(c.style.display="block",y.querySelector("div:last-child").textContent="▲"):(c.style.display="none",y.querySelector("div:last-child").textContent="▼")})}),a.querySelectorAll(".btn-learn").forEach(y=>{y.addEventListener("click",async c=>{c.stopPropagation();try{const $=await l.learnSkill(x.id,y.dataset.sid);$.error?r($.error,"error"):(t.player=$.player,r($.message,"success"),X(a,e))}catch($){r("Lỗi học kỹ năng: "+$.message,"error")}})})}function pt(a,e){var $,b,v;const{state:t,api:l,notify:r,renderGame:x}=e,g=t.player,o=g.stats,u=g.allocatedStats||{},m=5,h=g.currentEnergy>=m&&!g.hospitalRemaining,y=g.talentDisplay||{},c=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];a.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${g.currentEnergy}/${g.maxEnergy} linh lực · Chi phí: ${m}/lần</span>
      </div>
    </div>

    ${g.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${g.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${(($=g.realmInfo)==null?void 0:$.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(b=g.realmInfo)!=null&&b.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${c.map(([s,n,d])=>{const p=y[s]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${p.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${n}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${d}</div>
                <div style="font-size:14px;font-weight:700;color:${p.color};margin-top:4px">${p.icon} ${p.name}</div>
                <div style="font-size:11px;color:${p.color};opacity:0.8">×${p.value} hệ số</div>
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
        ${c.map(([s,n,d,p])=>{const i=y[s]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},f=Math.floor(g.currentEnergy/m)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${n}</span> ${d}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${p}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${o[s]??0}</span>
              ${u[s]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${u[s]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${i.color};min-width:50px" title="Căn Cốt: ${i.name} (×${i.value})">${i.icon}×${i.value}</span>
              <input type="number" class="train-count" data-stat="${s}" min="1" max="${f}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${h?"":"disabled"}>
              <button class="btn btn--sm ${h?"btn--blue":"btn--dark"} train-btn" data-train="${s}" ${h?"":"disabled"} title="Tốn ${m} Linh lực/lần · Căn cốt ×${i.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${m} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(g.currentEnergy/m)}</strong> lần hiện tại.
        </div>
        <div class="derived-row mt-3 border-t border-dim pt-3">
          <div class="d-item"><div class="d-val">${o.maxHp??100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${o.maxEnergy??50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${o.energyRegen??5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row pb-3">
          <div class="d-item"><div class="d-val">${o.critChance??5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${o.critMultiplier??1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Khí/đòn</div></div>
        </div>
      </div>
    </div>`,(v=a.querySelector(".btn-breakthrough"))==null||v.addEventListener("click",async()=>{try{const s=a.querySelector(".btn-breakthrough");s.disabled=!0,s.innerHTML="Đang Độ Kiếp...";const n=await l.attemptBreakthrough(t.playerId);t.player=n.player,r(n.message,"success"),x()}catch(s){r(s.message||"Đột phá thất bại","error");const n=a.querySelector(".btn-breakthrough");n&&(n.disabled=!1,n.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),a.querySelectorAll(".train-btn").forEach(s=>{s.addEventListener("click",async n=>{n.stopPropagation();const d=a.querySelector(`.train-count[data-stat="${s.dataset.train}"]`),p=parseInt(d==null?void 0:d.value)||1;try{const i=await l.trainStat(t.playerId,s.dataset.train,p);t.player=i.player,r(i.message,"success"),x()}catch(i){r(i.message||"Lỗi rèn luyện","error")}})})}function Y(a,e){const{state:t,api:l,notify:r}=e,x=t.player.skills||[],g=x.map(u=>typeof u=="string"?u:u.id),o=x.map(u=>{const m=typeof u=="string"?u:u.id;return{...t.skills.find(y=>y.id===m)||{name:"Vô danh thủ thuật",id:m},level:u.level||1,currentXp:u.currentXp||0}});t.skills.filter(u=>!g.includes(u.id)),a.innerHTML=`
    <div class="page-header"><h1>⚡ Thần Thông</h1></div>

    <div class="panel">
      <div class="panel-title">Đã học (${o.length})</div>
      <div class="panel-body no-pad">
        ${o.length===0?'<div style="padding:14px" class="text-dim">Chưa lĩnh hội kỹ năng nào</div>':o.map(u=>{const m=u.type==="passive"&&(!u.tags||!u.tags.includes("movement")&&!u.tags.includes("thân pháp")),h=m?'<span class="text-xs text-dim">Vĩnh Viễn Kích Hoạt</span>':u.isEquipped?`<button class="btn btn--sm equip-btn" style="background:var(--red)" data-eq="0" data-sid="${u.id}">Tháo Gỡ</button>`:`<button class="btn btn--sm equip-btn" data-eq="1" data-sid="${u.id}">Trang Bị</button>`,y=u.isEquipped&&!m?'<span class="badge" style="background:var(--green)">Đang trang bị</span>':"";return`
            <div class="list-item flex flex-col items-start gap-4" style="${u.isEquipped&&!m?"border-left: 3px solid var(--green); background: rgba(50, 200, 100, 0.05);":""}">
              <div class="item-info w-full">
                <div class="flex justify-between items-center mb-xs">
                  <div class="item-name text-lg">${u.name} <span class="badge" style="background:var(--blue)">Tầng ${u.level}</span> ${y}</div>
                  <div class="text-xs text-gold">${u.currentXp} / 100 XP</div>
                </div>
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-meta">${u.type==="passive"?"🔮 Nội công":`⚡ Chiêu thức · 🔵${u.cost||0} linh lực`}${u.description?" · "+u.description:""}</div>
                  <div>${h}</div>
                </div>
                
                <!-- Master XP Bar -->
                <div class="w-full bg-darker rounded" style="height: 4px; overflow: hidden;">
                  <div class="bg-gold h-full" style="width: ${Math.min(100,Math.max(0,u.currentXp/100*100))}%"></div>
                </div>
              </div>
            </div>`}).join("")}
      </div>
      </div>
    </div>`,a.querySelectorAll(".equip-btn").forEach(u=>{u.addEventListener("click",async()=>{try{const m=u.dataset.sid,h=u.dataset.eq==="1",y=await l.equipSkill(t.playerId,m,h);t.player=y.player,r(y.message,"success"),Y(a,e)}catch(m){r(m.message||"Lỗi trang bị","error")}})})}function gt(a,e){return e==="manual"?"📜":a==="weapon"?"⚔️":a==="body"?"🥋":a==="shield"?"🛡️":a==="feet"?"👢":a==="ring"?"💍":"📦"}function U(a,e){let t="",l="";if(a.slot==="weapon"){let u=0,m=0;(a.affixes||[]).forEach(h=>{h.stat==="strength"&&h.type==="flat"&&(u+=h.value),h.stat==="dexterity"&&h.type==="flat"&&(m+=h.value)}),u===0&&(u=a.itemLevel*2+5),m===0&&(m=a.itemLevel+10),t=`⚔️ ${u}`,l=`🎯 ${m}`}else if(a.slot==="body"||a.slot==="shield"||a.slot==="feet"){let u=0;(a.affixes||[]).forEach(m=>{m.stat==="defense"&&m.type==="flat"&&(u+=m.value)}),u===0&&(u=a.itemLevel*3),t=`🛡️ ${u}`}else if(a.slot==="ring"){let u=0;(a.affixes||[]).forEach(m=>{m.stat==="capacity"&&(u+=m.value)}),t=u>0?`🎒 +${u}`:""}const r=(a.affixes||[]).map(u=>ut(u)).map(u=>`<span class="badge badge-dim">${u}</span>`).join(" "),x=a.description||`Một vật phẩm loại ${a.slot} cấp ${a.itemLevel} thuộc phẩm chất ${a.rarity}. Khí tức tỏa ra không tồi.`,g=a.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${a.craftedBy}</strong></div>`:"",o=e?a.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${a.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${a.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${a.rarity}"></span>
          <span class="item-name rarity-${a.rarity}" style="font-size:14px">${a.name}</span>
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${t?`<span style="color:var(--text-light)">${t}</span>`:""}
          ${l?`<span style="color:var(--text-light)">${l}</span>`:""}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05)">
        <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
          ${gt(a.slot,a.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${a.name}</strong> là loại ${a.baseType}. ${x}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${a.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${a.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${r||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${g}
          <div class="mt-2 flex justify-end">
            ${o}
          </div>
        </div>
      </div>
    </div>`}function ut(a){const t={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[a.stat]||a.stat,l=a.value>=0?"+":"";return a.type==="flat"?`${l}${a.value} ${t}`:a.type==="increase"?`${l}${a.value}% ${t}`:a.type==="more"?`×${l}${a.value}% ${t}`:`${l}${a.value} ${t}`}function K(a,e){var n,d,p,i,f,T,L;const{state:t,api:l,notify:r,renderGame:x}=e,g=Object.values(t.player.equipment||{}),o=t.player,u=t.medicines||[],m=o.medCooldownRemaining||0,h=t.inventoryTab||"equipped",y=o.skills&&o.skills.some(k=>{const S=typeof k=="string"?k:k.id;return S==="duoc_ly"||S==="y_thuat"}),c=g.find(k=>k.slot==="ring1"),$=g.find(k=>k.slot==="ring2");let b=20;((c==null?void 0:c.id)==="tui_tru_vat"||(n=c==null?void 0:c.baseType)!=null&&n.includes("tru_vat"))&&(b+=((p=(d=c.affixes)==null?void 0:d[0])==null?void 0:p.value)||10),(($==null?void 0:$.id)==="tui_tru_vat"||(i=$==null?void 0:$.baseType)!=null&&i.includes("tru_vat"))&&(b+=((T=(f=$.affixes)==null?void 0:f[0])==null?void 0:T.value)||10),a.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(o.inventory||[]).length} / ${b})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${h==="equipped"?"btn--blue":"btn--dark"}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${h==="weapon"?"btn--blue":"btn--dark"}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${h==="armor"?"btn--blue":"btn--dark"}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${h==="accessory"?"btn--blue":"btn--dark"}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${h==="manual"?"btn--blue":"btn--dark"}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${h==="medicine"?"btn--blue":"btn--dark"}" data-tab="medicine">
          Đan Dược ${m>0?`<span style="color:var(--orange); font-size:11px">(${m}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const v=document.getElementById("invTabContent"),s=()=>{v.querySelectorAll("[data-eid]").forEach(k=>{k.addEventListener("click",async S=>{S.stopPropagation();try{const C=await l.equipItem(t.playerId,k.dataset.eid);t.player=C.player,r(C.message,"success"),x()}catch(C){r(C.message||"Lỗi trang bị","error")}})}),v.querySelectorAll("[data-use]").forEach(k=>{k.addEventListener("click",async S=>{S.stopPropagation();try{const C=await l.useItem(t.playerId,k.dataset.use);t.player=C.player,r(C.message,"success"),x()}catch(C){r(C.message||"Lỗi sử dụng","error")}})})};if(h==="equipped"){const k=o.equipment||{},S=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];v.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${S.map(C=>{const w=k[C.key],P=w&&w.id,I=P?`rarity-${w.rarity}`:"";return`
            <div style="background:${P?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${P?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${C.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${C.name}</div>
              ${P?`<div style="font-size:11px;font-weight:600" class="${I}">${w.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${w.rarity}] Lv${w.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${g.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${g.filter(C=>C&&C.id).map(C=>U(C,!1)).join("")}
      `:""}
    `,s()}else if(h==="medicine")v.innerHTML=`
      <div style="padding:12px">
        ${m>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${m}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${m/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${u.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':u.map(k=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${k.icon||"💊"} ${k.name}</div>
                <div class="item-meta">
                  ${k.description}
                  ${k.healPercent?` · Phục hồi ${k.healPercent}% HP`:""}
                  ${k.cooldownAdd?` · Sinh Đan độc ${k.cooldownAdd}s`:""}
                  ${k.duration?` · Hiệu lực ${k.duration} trận`:""}
                  ${k.toxicity&&y?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${k.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${k.penalty&&y?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${k.penalty.map(S=>`Giảm ${Math.abs(S.value)*100}% ${S.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${k.id}" 
                ${m+(k.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,v.querySelectorAll("[data-med]").forEach(k=>{k.addEventListener("click",async()=>{try{const S=await l.useMedicine(t.playerId,k.dataset.med);t.player=S.player,r(S.message,"success"),x()}catch(S){r(S.message||"Đan độc quá nồng!","error")}})});else{const k=o.inventory||[];let S=[];h==="weapon"?S=k.filter(C=>C.slot==="weapon"&&C.category!=="manual"):h==="armor"?S=k.filter(C=>["body","shield","feet"].includes(C.slot)):h==="accessory"?S=k.filter(C=>["ring","amulet","ring1","ring2"].includes(C.slot)):h==="manual"&&(S=k.filter(C=>C.category==="manual")),v.innerHTML=`
      ${S.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':S.map(C=>U(C,!0)).join("")}
    `,s()}a.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{t.inventoryTab=k.dataset.tab,K(a,e)})}),(L=document.getElementById("btnGen"))==null||L.addEventListener("click",async()=>{const k=["common","rare","epic","legendary"];try{const S=await l.generateItem(t.playerId,k[Math.floor(Math.random()*k.length)]);t.player=S.player,t.items=S.items||[],r(S.message,"success"),K(a,e)}catch{r("Lỗi tạo ngẫu nhiên","error")}})}function vt(a,e){var p,i;const{state:t,api:l,notify:r,renderGame:x}=e,g=t.player,o=t.crimes||[];if((g.jailRemaining??0)>0){const f=g.jailRemaining,T=Math.max(10,100*Math.ceil(f/60)*g.level);a.innerHTML=`
      <div class="page-header"><h1>🏛 Thiên Lao</h1></div>
      <div class="panel">
        <div class="panel-title">Trạng thái</div>
        <div class="panel-body" style="text-align:center">
          <div style="font-size:28px;color:var(--red);font-weight:700">⛓ Bị giam giữ</div>
          <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${f}s</strong></div>
          <div style="margin-top:16px;display:flex;gap:12px;justify-content:center">
            <button class="btn btn--blue" id="btnEscape">🏃 Vượt ngục (3 Nghịch Khí)</button>
            <button class="btn btn--gold" id="btnBail">💰 Bảo lãnh (${T} Lính Thạch)</button>
          </div>
        </div>
      </div>`,(p=document.getElementById("btnEscape"))==null||p.addEventListener("click",async()=>{try{const L=await l.escapeJail(t.playerId);t.player=L.player,r(L.message,L.success?"success":"error"),x()}catch(L){r(L.message||"Lỗi","error")}}),(i=document.getElementById("btnBail"))==null||i.addEventListener("click",async()=>{try{const L=await l.bail(t.playerId);t.player=L.player,r(L.message,L.success?"success":"error"),x()}catch(L){r(L.message||"Lỗi","error")}});return}const m={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},h={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},y=o.reduce((f,T)=>{const L=T.category||"theft";return f[L]||(f[L]=[]),f[L].push(T),f},{}),c=Object.keys(m).map(f=>{const T=y[f];if(!T||T.length===0)return"";const L=m[f];return`
    <div class="panel mt-md" style="border-color: ${L.color}40;">
      <div class="panel-title" style="color: ${L.color};">${L.label} <span class="subtitle text-dim">${T.length} loại</span></div>
      <div class="panel-body no-pad">
        ${T.map(k=>{var q;const S=((q=g.crimeSkills)==null?void 0:q[k.id])??0,C=S<(k.minSkill??0),w=!C&&(g.nerve??0)>=k.nerveCost,P=k.special||[],I=Math.min(95,k.baseSuccessRate+S*.5);return`
            <div class="list-item crime-item ${C?"crime-locked":""}">
              <div class="item-info">
                <div class="item-name" style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:18px">${k.icon}</span>
                  <span>${k.name}</span>
                  ${C?'<span style="opacity:0.5">🔒</span>':""}
                </div>
                <div class="item-desc">${k.description}</div>
                <div class="item-meta" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  <span>⚡ ${k.nerveCost} Khí</span>
                  <span>💰 ${k.rewards.goldMin}-${k.rewards.goldMax}</span>
                  <span style="color:${I>=60?"var(--green)":I>=40?"var(--orange)":"var(--red)"}">🎯 ${Math.round(I)}%</span>
                  ${C?`<span style="color:var(--red)">Cần Skill ${k.minSkill}</span>`:`<span>📊 ${S}/100</span>`}
                </div>
                ${P.length>0?`
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${P.map(H=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${h[H]||H}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <button class="btn btn--sm ${w?"btn--red":""}" data-crime="${k.id}" ${w?"":"disabled"}>
                ${C?"🔒":"Thực hiện"}
              </button>
            </div>`}).join("")}
      </div>
    </div>`}).join(""),$=g.crimeExp||0,b=Math.floor($/50),v=$%50,s=50,n=v/s*100,d=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${b}</strong>
          <span class="text-dim">${v} / ${s} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${n}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${s-v} EXP</strong> nữa để tăng giới hạn Nghịch Khí. (Giới hạn hiện tại: ${g.maxNerve||15})</div>
      </div>
    </div>
  `;a.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${g.nerve??0}/${g.maxNerve??15} Nghịch Khí · 💰 ${g.gold??0} Linh Thạch</span></div>
    </div>
    ${d}
    ${c}`,a.querySelectorAll("[data-crime]").forEach(f=>{f.addEventListener("click",async()=>{try{const T=await l.commitCrime(t.playerId,f.dataset.crime);t.player=T.player;const L=T.outcome==="success"?"success":T.outcome==="critical_fail"?"error":"info";r(T.message,L),x()}catch(T){r(T.message||"Lỗi","error")}})})}function mt(a,e){var d;const{state:t,api:l,notify:r,renderGame:x}=e,g=t.player,o=t.educationTrees||[],u=g.unlockedNodes||[],m=g.studyingNode||"",h=m?m.split("|")[0]:"",y=g.studyEndsAt||0,c=Math.max(0,y-Math.floor(Date.now()/1e3)),$=g.treeProgress||{},b=g.skillProgress||{};let v=localStorage.getItem("eduActiveTree")||((d=o[0])==null?void 0:d.id),s=o.find(p=>p.id===v)||o[0];!s&&o.length>0&&(s=o[0]);const n=()=>{if(!s){a.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const p=o.map(w=>`
      <button class="edu-tab ${w.id===s.id?"active":""}" data-tab="${w.id}">
        <span class="edu-tab-icon">${w.icon}</span>
        <span class="edu-tab-name">${w.name}</span>
        <span class="edu-tab-badge">${$[w.id]||0}</span>
      </button>
    `).join("");let i="";if(h){let w=null,P=null;o.forEach(I=>{const q=I.nodes.find(H=>H.id===h);q&&(w=q,P=I)}),w&&(i=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${P.name}</div>
              <div class="text-gold text-lg bold">${w.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${c}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${c>0?"disabled":""}>
                ${c>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const f=$[s.id]||0;let T=null;for(const w of s.milestones||[])if(f<w.require){T=w;break}let L="";T?L=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${T.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${T.description}</div>
        </div>
      `:L='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const k=g.discoveredNodes||[],S=(s.nodes||[]).map(w=>{const P=u.includes(w.id),I=h===w.id,q=(w.prerequisites||[]).every(R=>u.includes(R)),H=s.nodes.some(R=>(R.prerequisites||[]).includes(w.id));if(!(k.includes(w.id)||P||!(w.prerequisites&&w.prerequisites.length>0))||P&&H)return"";let N="";I?N="studying":P?N="done":N="available";let _="";I?_='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':h?_='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':P?_=`<button class="btn btn--sm btn--gold btn-learn" data-node="${w.id}">Tiếp Tục Lãnh Ngộ (${w.duration}s)</button>`:q?_=`<button class="btn btn--sm btn--blue btn-learn" data-node="${w.id}">Bắt Đầu (${w.duration}s)</button>`:_='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const j=b[w.id]||{level:1,exp:0},it=j.level*100;let Q="";return P&&(Q=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${j.level} | Độ hiểu thấu: ${j.exp}/${it}</div>`),`
        <div class="edu-node ${N}">
          <div class="edu-node-info">
            <div class="edu-node-title">${w.name}</div>
            <div class="edu-node-desc">${w.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${w.bonusDescription}</div>
            ${Q}
          </div>
          <div class="edu-node-action">
            ${_}
          </div>
        </div>
      `}).join("");a.innerHTML=`
      <div class="page-header">
        <h1>📜 Đạo Lộ (Tu Luyện)</h1>
        <div class="text-dim text-sm mt-xs">Lựa chọn con đường tu tiên của riêng bạn.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${p}</div>
          ${i}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${s.icon} ${s.name}</h2>
              <p class="text-dim mb-md">${s.description}</p>
              
              <h3 class="text-md mb-xs mt-md border-b pb-xs">🌟 Cảnh Giới Đột Phá</h3>
              <div class="edu-milestones-grid mb-lg">
                ${L||'<div class="text-dim text-sm">Nhánh này chưa có cảnh giới đặc biệt.</div>'}
              </div>

              <h3 class="text-md mb-xs border-b pb-xs">📖 Pháp Quyết</h3>
              <div class="edu-nodes-list">
                ${S||'<div class="text-dim text-sm">Chưa có pháp quyết.</div>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,a.querySelectorAll(".edu-tab").forEach(w=>{w.addEventListener("click",()=>{const P=w.dataset.tab;localStorage.setItem("eduActiveTree",P),v=P,s=o.find(I=>I.id===P)||o[0],n()})}),window.eduTimer&&clearInterval(window.eduTimer),h&&y>0&&(window.eduTimer=setInterval(()=>{const w=Math.floor(Date.now()/1e3);let P=Math.max(0,y-w);const I=document.getElementById("eduCounter");if(I&&(I.innerText=P+"s"),P<=0){clearInterval(window.eduTimer);const q=document.getElementById("btnCheckEdu");q&&(q.disabled=!1,q.innerHTML="✨ Đột Phá!")}},1e3));const C=a.querySelector("#btnCheckEdu");C&&C.addEventListener("click",async()=>{try{C.disabled=!0,C.innerHTML="Đang xử lý...";const w=await l.checkEducation(t.playerId);t.player=w.player,r(w.message,w.completed?"success":"info"),x()}catch(w){r(w.message||"Lỗi đột phá","error"),C.disabled=!1,C.innerHTML="Thử lại"}}),a.querySelectorAll(".btn-learn").forEach(w=>{w.addEventListener("click",async()=>{try{const P=w.dataset.node;w.disabled=!0,w.innerHTML="Chờ...";const I=await l.enrollNode(t.playerId,P,s.id);t.player=I.player,r(I.message,"success"),x()}catch(P){r(P.message||"Lỗi ghi danh","error"),w.disabled=!1,w.innerHTML="Bắt Đầu"}})})};n()}function yt(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e;O(a,e)}async function O(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e;a.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ...</div>';try{const[g,o]=await Promise.all([l.request("/data/areas"),l.request(`/player/${t.playerId}/area`)]),u=g.areas||[],m=o.area,h=o.player,y=o.traveling||!1,c=o.travelRemaining||0,$=o.travelDestination||"";o.message&&r(o.message,"success"),o.player&&(t.player=o.player,x());const b=[...u].sort((v,s)=>(v.mapY||0)-(s.mapY||0));if(a.innerHTML=`
      <div class="page-header">
        <h1>🗺️ Ngao Du Quần Vực</h1>
        <div class="text-sm text-dim">Tiêu tốn Hành Lực để băng qua các dải tinh vực.</div>
      </div>

      ${y?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.1)">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:32px; margin-bottom:12px; animation:bounce 1s infinite">🚶</div>
            <strong style="font-size:16px">Đang tiến về ${$}</strong>
            <div id="travelTimer" style="font-size:24px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 10px rgba(255,215,0,0.3)">⏳ ${c}s</div>
            <div class="bar-track" style="margin-top:12px; height:8px">
              <div class="bar-fill energy" id="travelBar" style="width:100%; background:var(--gold); transition: width 1s linear"></div>
            </div>
          </div>
        </div>
      `:`
        <div class="panel">
          <div class="panel-body flex items-center justify-between" style="padding: 12px 16px">
            <div>
              <div class="text-xs text-dim mb-xs">Vị trí hiện tại</div>
              <div class="text-lg text-green bold">📍 ${(m==null?void 0:m.name)||"Không rõ"}</div>
            </div>
            <div class="text-sm text-dim" style="max-width:200px; text-align:right">
              ${(m==null?void 0:m.description)||""}
            </div>
          </div>
        </div>
      `}

      <!-- 2D MAP VISUAL -->
      <div class="panel">
        <div class="panel-title">Thiên Địa Giới Đồ</div>
        <div class="panel-body no-pad" style="position:relative; width:100%; height:300px; background-color: #0f172a; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 20px 20px; overflow:hidden; border-radius:0 0 8px 8px">
          
          <!-- Connective SVG Lines (Faux Routes) -->
          <svg style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:none">
            <path d="M 50% 85% L 50% 50% L 80% 55% L 85% 30% L 80% 15%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 85% L 35% 75% L 15% 45% L 30% 15% L 50% 5%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 50% L 30% 40% L 35% 75%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 80% 55% L 65% 70% L 50% 85%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 50% L 50% 20% L 50% 5%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 80% 15% L 70% 25% L 50% 20%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
          </svg>

          <!-- Nodes -->
          ${b.map(v=>{const s=v.id===h.currentArea&&!y,n=h.level<(v.min_level||1),d=v.mapX||50,p=v.mapY||50,i=s?"var(--green)":n?"var(--red)":"var(--blue)",f=s?`box-shadow: 0 0 15px ${i}; animation: pulse 2s infinite`:"",T=!s&&!n&&!y;return`
              <div class="map-node ${T?"clickable":""}" ${T?`data-travel="${v.id}"`:""} 
                   style="position:absolute; left:${d}%; top:${p}%; transform:translate(-50%, -50%); z-index:1; display:flex; flex-direction:column; align-items:center; width:max-content">
                <div class="node-label" style="font-size:10px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; margin-bottom:4px; color:${s?"var(--green)":"var(--text-light)"}; border:1px solid ${s?"var(--green)":"rgba(255,255,255,0.1)"}">
                  ${v.name} ${n?`[Lv.${v.min_level}]`:""}
                </div>
                <div class="node-dot" style="width:12px; height:12px; background-color:${i}; border-radius:50%; border:2px solid #fff; ${f}"></div>
              </div>
            `}).join("")}
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">Thiết Lập Lộ Trình</div>
        <div class="panel-body no-pad" style="max-height: 250px; overflow-y:auto">
          ${u.map(v=>{const s=v.id===h.currentArea&&!y,n=h.level<(v.min_level||1),d=parseInt(v.travel_time)||0;return`
              <div class="list-item ${s||n?"":"clickable"}" ${!s&&!n&&!y?`data-travel="${v.id}"`:""} style="padding: 10px 14px">
                <div class="item-info">
                  <div class="item-name" style="font-size:14px">
                    ${v.name}
                    ${s?' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>':""}
                    ${n?` <span style="color:var(--red); font-size:11px">[Lv.${v.min_level}+]</span>`:""}
                  </div>
                  <div class="item-meta" style="margin-top:2px">
                    <span>Lv.${v.min_level||1}+</span>
                    <span>${d>0?"⏱ "+d+"s":"⚡ Tức thời"}</span>
                  </div>
                </div>
                ${!s&&!n&&!y?`
                  <button class="btn btn--blue btn--sm" data-travel="${v.id}">
                    ${d>0?"🚶 Di chuyển":"⚡ Đi"}
                  </button>
                `:""}
              </div>`}).join("")}
        </div>
      </div>`,a.querySelectorAll("[data-travel]").forEach(v=>{v.addEventListener("click",async s=>{s.stopPropagation();const n=v.dataset.travel;a.querySelectorAll("[data-travel]").forEach(d=>{d.tagName==="BUTTON"&&(d.disabled=!0),d.style.pointerEvents="none"});try{const d=await l.request(`/player/${t.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:n})});d.player&&(t.player=d.player,x()),r(d.message,"success"),O(a,e)}catch(d){r(d.message||"Lỗi di chuyển!","error"),O(a,e)}})}),y&&c>0){let v=c;const s=c,n=setInterval(async()=>{v--;const d=document.getElementById("travelTimer"),p=document.getElementById("travelBar");if(d&&(d.textContent=`⏳ ${Math.max(0,v)}s`),p&&(p.style.width=`${Math.max(0,v/s*100)}%`),v<=0){clearInterval(n);try{const i=await l.request(`/player/${t.playerId}/travel-check`,{method:"POST"});i.player&&(t.player=i.player,x()),i.arrived&&r(i.message,"success"),O(a,e)}catch{O(a,e)}}},1e3)}}catch(g){a.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(g)}}function F(a,e){var d,p;const{state:t,renderGame:l,notify:r,updateSidebar:x}=e,g=t.player,o=t.recipes||[],u=t.medicines||[],m=t._alchemyTab||"recipes",h=i=>{const f=u.find(T=>T.id===i);return f?(f.icon||"💊")+" "+f.name:i};let y=0,c=0,$=0,b=0;(g.skills||[]).forEach(i=>{const f=typeof i=="string"?i:i.id,T=typeof i=="string"?1:i.level||1;f==="tinh_che"&&(y=T*2),f==="phu_an_thuat"&&(c=T*5),f==="linh_kiem_thuat"&&($=T*10),f==="cuong_hoa_thuat"&&(b=T*15)});const v=i=>i.split("_").map(f=>f.charAt(0).toUpperCase()+f.slice(1)).join(" "),s=[];Object.values(g.equipment||{}).forEach(i=>{i&&s.push({...i,loc:"eq"})}),(g.inventory||[]).filter(i=>i.slot&&i.slot!=="consumable").forEach(i=>s.push({...i,loc:"inv"}));let n=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${m==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${m==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${y||c||$||b?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${y?`<span>🔥 Thành công +${y}%</span>`:""}
      ${c?`<span>💎 Giảm phí -${c}%</span>`:""}
      ${$?`<span>✨ Chất lượng +${$}%</span>`:""}
      ${b?`<span>⬆️ Nâng đôi ${b}%</span>`:""}
    </div>
    `:""}
  `;if(m==="recipes"){if(n+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!g.materials||Object.keys(g.materials).length===0)n+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[i,f]of Object.entries(g.materials))n+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${v(i)} <span style="color:var(--gold)">x${f}</span></div>`;n+="</div></div>",n+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',o.length===0?n+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':o.forEach(i=>{var C;const f=h(i.target),T=Math.min(100,(i.successRate||100)+y);let L="";(C=i.requirements)!=null&&C.skill&&(L=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${v(i.requirements.skill)} lv${i.requirements.level||1}</div>`);let k="";i.materials.forEach(w=>{var I;const P=((I=g.materials)==null?void 0:I[w.id])||0;k+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${P>=w.amount?"var(--green)":"var(--red)"};font-weight:bold">${P}/${w.amount}</span> ${v(w.id)}</span>`});const S=u.find(w=>w.id===i.target)||{};n+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${f}</strong>
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
                <div class="flex flex-wrap gap-2">${k}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${S.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${i.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),n+="</div></div>"}else n+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${s.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${s.map(i=>`<option value="${i.id}">${i.loc==="eq"?"🔸":"📦"} ${i.name||i.baseType} [${i.rarity||"?"}] ${(i.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(i=>{const f=Math.max(1,Math.round(i.cost*(1-c/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${i.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${i.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${i.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${i.id}" style="width:100%">
                💎 ${f} ${c>0?`<s style="opacity:0.4;font-size:10px">${i.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;a.innerHTML=n,a.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{t._alchemyTab=i.dataset.tab,F(a,e)})}),a.querySelectorAll(".accordion-header").forEach(i=>{i.addEventListener("click",()=>{const f=i.nextElementSibling;f.style.display==="none"?(f.style.display="block",i.querySelector(".text-dim:last-child").textContent="▲"):(f.style.display="none",i.querySelector(".text-dim:last-child").textContent="▼")})}),a.querySelectorAll(".btn-craft").forEach(i=>{i.addEventListener("click",async f=>{f.stopPropagation();const T=o.find(L=>L.id===i.dataset.recipe);if(T&&g.gold<(T.cost||0))return r("Không đủ linh thạch!","error");try{const L=await M.craftItem(g.id,i.dataset.recipe);t.player=L.player,r(L.message,L.success?"success":"error"),l()}catch(L){r(L.message,"error")}})}),a.querySelectorAll(".btn-currency").forEach(i=>{i.addEventListener("click",async()=>{const f=document.getElementById("selItem");if(!(f!=null&&f.value))return r("Chọn trang bị trước!","error");const T=i.dataset.cid;let L=-1;if(T==="thien_menh_phu"){const k=s.find(w=>w.id===f.value),S=(k==null?void 0:k.affixes)||[];if(S.length===0)return r("Item không có affix để khóa!","error");const C=prompt(`Chọn affix để khóa (0-${S.length-1}):
${S.map((w,P)=>`${P}: ${w.name||w.stat} +${w.value}`).join(`
`)}`);if(C===null)return;if(L=parseInt(C),isNaN(L)||L<0||L>=S.length)return r("Chỉ số không hợp lệ!","error")}i.disabled=!0,i.textContent="⏳...";try{const k=await M.applyCurrency(g.id,T,f.value,L);r(k.message,"success"),t.player=k.player,x(),F(a,e)}catch(k){r(k.message,"error"),i.disabled=!1,i.textContent="💎 Dùng"}})}),(d=document.getElementById("selItem"))==null||d.addEventListener("change",()=>{const i=s.find(T=>T.id===document.getElementById("selItem").value),f=document.getElementById("itemPreview");i&&f&&(f.innerHTML=(i.affixes||[]).map(T=>`<span style="color:var(--blue)">• ${T.name||T.stat} +${T.value}</span>`).join(" | ")||"Không có affix")}),(p=document.getElementById("selItem"))==null||p.dispatchEvent(new Event("change"))}function ht(a,e){const{state:t,api:l,notify:r,renderGame:x}=e;t.player,a.innerHTML=`
    <div class="page-header">
      <h2>🏷️ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ nhiệm vụ từ các NPC</p>
    </div>
    <div id="questList" class="quest-container">
      <div class="loading-spinner">⏳ Đang tải...</div>
    </div>
  `,g();async function g(){try{const u=(await l.getQuests(t.playerId)).quests||[],m=document.getElementById("questList");if(!m)return;if(u.length===0){m.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}m.innerHTML=u.map(h=>{const y=h.questAmount>0?Math.min(100,h.progress/h.questAmount*100):0,c=h.progress>=h.questAmount,$=h.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${c?"quest-done":""}" data-quest-id="${h.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${h.npcIcon||"🧓"} ${h.npcName||"NPC"}</span>
              <span class="quest-type">${$} ${h.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${h.questName||h.quest_id}</div>
            <div class="quest-desc">${h.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${c?"hp":"energy"}" style="width:${y}%"></div>
              </div>
              <span class="quest-progress-text">${h.progress}/${h.questAmount}</span>
            </div>
            ${c?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${h.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),m.querySelectorAll(".quest-complete-btn").forEach(h=>{h.addEventListener("click",async()=>{const y=h.dataset.qid;h.disabled=!0,h.textContent="⏳...";try{const c=await l.completeQuest(t.playerId,y);t.player=c.player,r(c.message,"success"),c.skillGained&&r(`🎯 Lĩnh ngộ: ${c.skillGained}!`,"success"),x()}catch(c){r(c.message||"Lỗi trả quest","error"),h.disabled=!1,h.textContent="✅ Trả Nhiệm Vụ"}})})}catch(o){console.error("Error loading quests:",o);const u=document.getElementById("questList");u&&(u.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function bt(a,e){const{state:t,api:l,notify:r,renderGame:x}=e;if(t.player.role!=="admin"){a.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const g=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let o="monsters";a.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${g.map(n=>`
          <button class="admin-tab ${n.id===o?"active":""}" data-tab="${n.id}">${n.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",n=>{const d=n.target.closest(".admin-tab");d&&(o=d.dataset.tab,document.querySelectorAll(".admin-tab").forEach(p=>p.classList.remove("active")),d.classList.add("active"),u(o))}),u(o);async function u(n){const d=document.getElementById("adminContent");if(d){d.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const p=await l.request(`/admin/${n}?adminId=${t.playerId}`);m(n,p,d)}catch(p){d.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${p.message}</div></div>`}}}function m(n,d,p){n==="monsters"?h(d,p):n==="npcs"?y(d,p):n==="areas"?c(d,p):$(n,d,p)}function h(n,d){const p=n.monsters||[];d.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${p.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${p.map(i=>{var f,T,L,k,S,C,w,P;return`
          <div class="admin-card" data-id="${i.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${i.name} ${i.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((T=(f=n.tierInfo)==null?void 0:f[i.tier])==null?void 0:T.color)||"#888"}">${((k=(L=n.tierInfo)==null?void 0:L[i.tier])==null?void 0:k.name)||"T"+i.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((S=i.stats)==null?void 0:S.hp)||"?"}</div>
              <div>💪 ${((C=i.stats)==null?void 0:C.strength)||"?"}</div>
              <div>🏃 ${((w=i.stats)==null?void 0:w.speed)||"?"}</div>
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
    `,v(d,n,"monsters","monsters")}function y(n,d){const p=n.npcs||[];d.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${p.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${p.map(i=>`
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
    `,v(d,n,"npcs","npcs")}function c(n,d){const p=Object.keys(n);d.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${p.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${p.map(i=>{const f=n[i];return`
            <div class="admin-card" data-id="${i}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${f.name||i}</span>
                <span class="badge" style="background:var(--orange)">⚡${f.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(f.events||[]).map(T=>`<span>${T.type}: ${T.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${i}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,d.querySelectorAll(".admin-edit-area").forEach(i=>{i.addEventListener("click",()=>{const f=i.dataset.id,T=n[f];b(f,T,`areas/${f}`)})})}function $(n,d,p){var T;const i=JSON.stringify(d,null,2),f=i.split(`
`).length;p.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${n} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(f+5,30)}">${s(i)}</textarea>
    `,(T=document.getElementById("btnSaveGeneric"))==null||T.addEventListener("click",async()=>{try{const L=document.getElementById("genericEditor").value,k=JSON.parse(L);r("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(L){r("JSON không hợp lệ: "+L.message,"error")}})}function b(n,d,p,i){const f=JSON.stringify(d,null,2),T=document.createElement("div");T.className="admin-modal-overlay",T.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${n}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${s(f)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(T),T.querySelectorAll(".admin-modal-close").forEach(L=>{L.addEventListener("click",()=>T.remove())}),T.addEventListener("click",L=>{L.target===T&&T.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const L=document.getElementById("modalEditor").value,k=JSON.parse(L);await l.request(`/admin/${p}?adminId=${t.playerId}`,{method:"PUT",body:JSON.stringify({data:k})}),r("✅ Đã lưu!","success"),T.remove(),u(o)}catch(L){r("Lỗi: "+L.message,"error")}})}function v(n,d,p,i){n.querySelectorAll(".admin-edit-btn").forEach(f=>{f.addEventListener("click",()=>{const T=f.dataset.id,k=(d[i]||[]).find(S=>S.id===T);k&&b(T,k,`${p}/${T}`)})})}function s(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function Z(a,e){const{state:t,api:l,notify:r,renderGame:x,updateSidebar:g}=e,o=t.playerId;t._social||(t._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const u=t._social;async function m(){try{const v=await l.getRelationships(o);u.relationships=v,u.loaded=!0,h()}catch(v){r(v.message||"Lỗi tải dữ liệu Giao Tế","error")}}function h(){const{friends:v,enemies:s,pendingSent:n,pendingReceived:d}=u.relationships,p=d.length;a.innerHTML=`
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
            ${u.searchResults.map(i=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${i.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${i.level} · ${i.realm} · ${i.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${i.id!==o?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${i.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${i.id}">⚔️ Kẻ Thù</button>
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
          🤝 Đạo Hữu (${v.length})
        </button>
        <button class="btn btn--sm ${u.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${s.length})
        </button>
        <button class="btn btn--sm ${u.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${p>0?`<span class="badge">${p}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${u.tab==="friends"?y(v):""}
        ${u.tab==="enemies"?c(s):""}
        ${u.tab==="pending"?$(d,n):""}
      </div>
    `,b()}function y(v){return v.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':v.map(s=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${s.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${s.level} · ${s.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${s.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${s.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function c(v){return v.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':v.map(s=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${s.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${s.level} · ${s.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${s.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${s.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function $(v,s){let n="";return v.length>0&&(n+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',n+=v.map(d=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${d.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${d.level} · ${d.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${d.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${d.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join("")),s.length>0&&(n+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',n+=s.map(d=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${d.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${d.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),v.length===0&&s.length===0&&(n='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),n}function b(){var v,s;(v=document.getElementById("btnSearch"))==null||v.addEventListener("click",async()=>{var d;const n=(d=document.getElementById("socialSearch"))==null?void 0:d.value.trim();if(!n||n.length<2)return r("Cần ít nhất 2 ký tự","error");u.searchQuery=n;try{const p=await l.searchPlayers(n);u.searchResults=p.players||[],h()}catch(p){r(p.message,"error")}}),(s=document.getElementById("socialSearch"))==null||s.addEventListener("keydown",n=>{var d;n.key==="Enter"&&((d=document.getElementById("btnSearch"))==null||d.click())}),document.querySelectorAll("[data-tab]").forEach(n=>{n.addEventListener("click",()=>{u.tab=n.dataset.tab,h()})}),document.querySelectorAll("[data-action]").forEach(n=>{n.addEventListener("click",async()=>{const d=n.dataset.action,p=n.dataset.target;n.disabled=!0;try{let i;switch(d){case"add-friend":i=await l.addFriend(o,p);break;case"accept-friend":i=await l.acceptFriend(o,p);break;case"reject-friend":i=await l.rejectFriend(o,p);break;case"remove-friend":i=await l.removeFriend(o,p);break;case"add-enemy":i=await l.addEnemy(o,p);break;case"remove-enemy":i=await l.removeEnemy(o,p);break}r(i.message||"Thành công!","success"),await m()}catch(i){r(i.message||"Lỗi!","error"),n.disabled=!1}})})}u.loaded?h():m()}function tt(a,e){const{state:t,api:l,notify:r}=e,x=t.playerId;t._chat||(t._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const g=t._chat;async function o(){try{const[s,n]=await Promise.all([l.getGlobalChat(),l.getChatFriends(x)]);g.globalMessages=s.messages||[],g.friends=n.friends||[],g.globalMessages.length>0&&(g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id),g.loaded=!0,h(),u()}catch(s){r(s.message||"Lỗi tải chat","error")}}function u(){m(),g.pollTimer=setInterval(async()=>{try{if(g.tab==="global"){const s=await l.getGlobalChat(g.lastGlobalId);s.messages&&s.messages.length>0&&(g.globalMessages.push(...s.messages),g.globalMessages.length>100&&(g.globalMessages=g.globalMessages.slice(-100)),g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id,c(),$())}else if(g.tab==="private"&&g.selectedFriend){const s=await l.getPrivateChat(x,g.selectedFriend.id,g.lastPrivateId);s.messages&&s.messages.length>0&&(g.privateMessages.push(...s.messages),g.privateMessages.length>100&&(g.privateMessages=g.privateMessages.slice(-100)),g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id,c(),$())}}catch{}},5e3)}function m(){g.pollTimer&&(clearInterval(g.pollTimer),g.pollTimer=null)}function h(){const s=g.tab==="global"?g.globalMessages:g.privateMessages;a.innerHTML=`
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
            ${g.friends.map(n=>{var d;return`<option value="${n.id}" ${((d=g.selectedFriend)==null?void 0:d.id)===n.id?"selected":""}>${n.name} (Lv.${n.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${y(s)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${g.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,v(),$()}function y(s){return s.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':s.map(n=>{const d=n.sender_id===x,p=new Date(n.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${d?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${p}</span>
          <span style="font-weight:600;color:${d?"var(--blue)":"var(--gold)"}"> ${n.sender_name}</span>
          <span style="opacity:0.8">: ${b(n.message)}</span>
        </div>
      `}).join("")}function c(){const s=document.getElementById("chatMessages");if(!s)return;const n=g.tab==="global"?g.globalMessages:g.privateMessages;s.innerHTML=y(n)}function $(){const s=document.getElementById("chatMessages");s&&(s.scrollTop=s.scrollHeight)}function b(s){const n=document.createElement("div");return n.textContent=s,n.innerHTML}function v(){var n,d,p;document.querySelectorAll("[data-chat-tab]").forEach(i=>{i.addEventListener("click",()=>{g.tab=i.dataset.chatTab,g.tab==="global"&&(g.lastGlobalId=g.globalMessages.length>0?g.globalMessages[g.globalMessages.length-1].id:0),h(),u()})}),(n=document.getElementById("friendSelect"))==null||n.addEventListener("change",async i=>{const f=i.target.value;if(!f){g.selectedFriend=null,g.privateMessages=[],h();return}g.selectedFriend=g.friends.find(T=>T.id===f)||null,g.lastPrivateId=0;try{const T=await l.getPrivateChat(x,f);g.privateMessages=T.messages||[],g.privateMessages.length>0&&(g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id),c(),$()}catch(T){r(T.message,"error")}});const s=async()=>{var T,L;const i=document.getElementById("chatInput"),f=i==null?void 0:i.value.trim();if(f){if(g.tab==="private"&&!g.selectedFriend)return r("Chọn Đạo Hữu trước!","error");try{if(await l.sendChat(x,g.tab,g.tab==="private"?g.selectedFriend.id:null,f),i.value="",g.tab==="global"){const k=await l.getGlobalChat(g.lastGlobalId);((T=k.messages)==null?void 0:T.length)>0&&(g.globalMessages.push(...k.messages),g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id)}else{const k=await l.getPrivateChat(x,g.selectedFriend.id,g.lastPrivateId);((L=k.messages)==null?void 0:L.length)>0&&(g.privateMessages.push(...k.messages),g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id)}c(),$()}catch(k){r(k.message||"Lỗi gửi tin nhắn","error")}}};(d=document.getElementById("btnSend"))==null||d.addEventListener("click",s),(p=document.getElementById("chatInput"))==null||p.addEventListener("keydown",i=>{i.key==="Enter"&&s()})}e.renderGame,g.loaded?(h(),u()):o()}function xt(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e,g=t.playerId;t._market||(t._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const o=t._market;async function u(){try{const[s,n]=await Promise.all([l.getMarketListings(o.filter,o.sort),l.getMyListings(g)]);o.listings=s.listings||[],o.myListings=n.listings||[],o.loaded=!0,h()}catch(s){r(s.message||"Lỗi tải Giao Dịch Đài","error")}}async function m(){try{const[s,n]=await Promise.all([l.getMugTargets(g),l.getMugLog(g)]);o.mugTargets=s.targets||[],o.mugCooldown=s.mugCooldown||0,o.mugLog=n.logs||[],h()}catch(s){r(s.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function h(){const s=t.player;a.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${o.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${o.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${o.myListings.length}/10)</button>
        <button class="btn btn--sm ${o.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${o.showListForm?b(s):""}

      ${o.tab==="browse"?y():o.tab==="my"?c():$()}
    `,v()}function y(){let s=`
      <div class="panel">
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn--xs ${o.filter===""?"btn--blue":"btn--dark"}" data-filter="">Tất cả</button>
            <button class="btn btn--xs ${o.filter==="item"?"btn--blue":"btn--dark"}" data-filter="item">⚔️ Trang Bị</button>
            <button class="btn btn--xs ${o.filter==="material"?"btn--blue":"btn--dark"}" data-filter="material">🧱 Nguyên Liệu</button>
            <button class="btn btn--xs ${o.filter==="medicine"?"btn--blue":"btn--dark"}" data-filter="medicine">💊 Đan Dược</button>
            <select id="sortSelect" style="padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:12px;margin-left:auto">
              <option value="newest" ${o.sort==="newest"?"selected":""}>Mới nhất</option>
              <option value="price_asc" ${o.sort==="price_asc"?"selected":""}>Giá tăng</option>
              <option value="price_desc" ${o.sort==="price_desc"?"selected":""}>Giá giảm</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo tên vật phẩm hoặc affix..." value="${o.search}" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
          </div>
        </div>
      </div>
    `,n=o.listings;if(o.search.trim()){const d=o.search.toLowerCase().trim();n=n.filter(p=>{var i;return p.item_name.toLowerCase().includes(d)?!0:(i=p.item_data)!=null&&i.affixes?p.item_data.affixes.some(f=>(f.stat||"").toLowerCase().includes(d)||(f.type||"").toLowerCase().includes(d)):!1})}return n.length===0?s+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(s+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',s+=n.map(d=>{var L,k;const p=d.item_type==="item"?"⚔️":d.item_type==="material"?"🧱":"💊",i=((L=d.item_data)==null?void 0:L.rarity)||"",f=d.seller_id===g,T=(k=d.item_data)!=null&&k.affixes?d.item_data.affixes.map(S=>`${S.stat} ${S.type==="flat"?"+":""}${S.value}${S.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${p}
                <span style="color:var(--gold)">${d.item_name}</span>
                ${d.quantity>1?`<span style="opacity:0.5"> x${d.quantity}</span>`:""}
                ${i?`<span class="rarity-${i}" style="font-size:11px;margin-left:4px">[${i}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${d.seller_name}</span>
                ${T?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${T}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${d.price}${d.quantity>1?"/cái":""}</span>
              ${f?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${d.id}" data-qty="${d.quantity}" data-price="${d.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),s+="</div></div>"),s}function c(){if(o.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let s='<div class="panel"><div class="panel-body no-pad">';return s+=o.myListings.map(n=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${n.item_type==="item"?"⚔️":n.item_type==="material"?"🧱":"💊"} ${n.item_name} ${n.quantity>1?`<span style="opacity:0.5">x${n.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${n.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${n.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),s+="</div></div>",s}function $(){let s=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${o.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${o.mugCooldown}s</div>`:""}
    `;return o.mugTargets.length===0?s+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':s+=o.mugTargets.map(n=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${n.gender==="female"?"♀":"♂"} ${n.name}</div>
            <div class="item-meta">Lv.${n.level} · ${n.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${n.id}" ${o.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),s+="</div></div>",o.mugLog.length>0&&(s+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${o.mugLog.map(n=>{const d=n.attacker_id===g,p=n.outcome==="success"?"✅":"❌",i=n.outcome==="success"?"var(--green)":"var(--red)",f=d?n.outcome==="success"?`Cướp ${n.victim_name}: +${n.gold_stolen} 💎`:`Phục kích ${n.victim_name} thất bại!`:n.outcome==="success"?`Bị ${n.attacker_name} cướp: -${n.gold_stolen} 💎`:`${n.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${i}">${p} ${f} <span style="opacity:0.4;margin-left:auto">${new Date(n.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),s}function b(s){const n=Object.entries(s.materials||{}).map(([f,T])=>({id:f,qty:T,type:"material",name:f})),d=Object.entries(s.medicines||{}).map(([f,T])=>({id:f,qty:T,type:"medicine",name:f})),p=(s.inventory||[]).map(f=>({id:f.id,qty:1,type:"item",name:f.name||f.id})),i=[...n,...d,...p];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${i.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${i.map(f=>`<option value="${f.type}|${f.id}">${f.type==="item"?"⚔️":f.type==="material"?"🧱":"💊"} ${f.name} ${f.qty>1?`(có: ${f.qty})`:""}</option>`).join("")}
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
    `}function v(){var s,n,d,p;document.querySelectorAll("[data-mtab]").forEach(i=>{i.addEventListener("click",()=>{if(o.tab=i.dataset.mtab,o.tab==="mug"&&o.mugTargets.length===0){m();return}h()})}),(s=document.getElementById("btnShowList"))==null||s.addEventListener("click",()=>{o.showListForm=!o.showListForm,h()}),document.querySelectorAll("[data-filter]").forEach(i=>{i.addEventListener("click",async()=>{o.filter=i.dataset.filter,await u()})}),(n=document.getElementById("sortSelect"))==null||n.addEventListener("change",async i=>{o.sort=i.target.value,await u()}),(d=document.getElementById("searchInput"))==null||d.addEventListener("input",i=>{o.search=i.target.value,h();const f=document.getElementById("searchInput");f&&(f.focus(),f.setSelectionRange(o.search.length,o.search.length))}),(p=document.getElementById("btnConfirmList"))==null||p.addEventListener("click",async()=>{var S,C,w;const i=(S=document.getElementById("listItem"))==null?void 0:S.value;if(!i)return;const[f,T]=i.split("|"),L=parseInt((C=document.getElementById("listQty"))==null?void 0:C.value)||1,k=parseInt((w=document.getElementById("listPrice"))==null?void 0:w.value)||0;if(k<=0)return r("Giá phải lớn hơn 0!","error");try{const P=await l.listForSale(g,f,T,L,k);r(P.message,"success"),t.player=P.player,x(),o.showListForm=!1,await u()}catch(P){r(P.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(i=>{i.addEventListener("click",async()=>{const f=parseInt(i.dataset.buy),T=parseInt(i.dataset.qty),L=parseInt(i.dataset.price);let k=1;if(T>1){const S=prompt(`Mua bao nhiêu? (tối đa ${T}, giá ${L} 💎/cái)`,"1");if(!S)return;k=Math.min(parseInt(S)||1,T)}i.disabled=!0;try{const S=await l.buyFromMarket(g,f,k);r(S.message,"success"),t.player=S.player,x(),await u()}catch(S){r(S.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(i=>{i.addEventListener("click",async()=>{i.disabled=!0;try{const f=await l.cancelListing(g,parseInt(i.dataset.cancel));r(f.message,"success"),t.player=f.player,x(),await u()}catch(f){r(f.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(i=>{i.addEventListener("click",async()=>{const f=i.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){i.disabled=!0,i.textContent="⏳...";try{const T=await l.mugPlayer(g,f);r(T.message,T.success?"success":"error"),t.player=T.player,x(),await m()}catch(T){r(T.message,"error"),i.disabled=!1,i.textContent="💀 Phục Kích"}}})})}o.tab==="mug"?m():o.loaded?h():u()}function ft(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e,g=t.playerId;let o=!1,u=null;async function m(){try{u=await l.getRealmInfo(g),o=!0,h()}catch($){r($.message||"Lỗi tải Cảnh Giới","error")}}function h(){if(!u)return;const $=u.current,b=u.allRealms||[],v=t.player,s=v.xpToNext>0?Math.floor(v.xp/v.xpToNext*100):0;a.innerHTML=`
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${$.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${$.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${$.color}">${$.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Tầng ${$.tier}/8 · ${$.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${v.level} — ${v.xp}/${v.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${s}%;background:${$.color}"></div></div>
        </div>

        ${$.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries($.bonuses).filter(([,n])=>n>0).map(([n,d])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${d} ${n}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${$.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${$.unlocks.map(n=>`<span style="font-size:12px;opacity:0.7">✅ ${n}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${$.canBreakthrough?y($):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${b.map(n=>{const d=n.tier===$.tier,p=n.tier<$.tier,f=n.tier>$.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${d?`2px solid ${n.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${f};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${n.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${n.color}">${n.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${n.levelMin}+</span>
                ${n.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${n.failChance}% thất bại</span>`:""}
                ${p?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${d?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,c()}function y($){const b=$.nextRealm;if(!b)return"";const v=b.cost?`💎 ${b.cost.gold} + 🔮 ${b.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${b.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${b.name} ${b.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${v}</div>
          ${b.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${b.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(b.bonuses).filter(([,s])=>s>0).map(([s,n])=>`+${n} ${s}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${b.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function c(){var $;($=document.getElementById("btnBreakthrough"))==null||$.addEventListener("click",async()=>{const b=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){b.disabled=!0,b.textContent="⏳ Đang đột phá...";try{const v=await l.attemptBreakthrough(g);v.success?(r(v.message,"success"),t.player=v.player,x(),await m()):(r(v.message,"error"),v.player&&(t.player=v.player,x()),await m())}catch(v){r(v.message||"Lỗi đột phá","error"),b.disabled=!1,b.textContent="⚡ ĐỘT PHÁ"}}})}m()}function $t(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e;Tt(a,e)}async function Tt(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e;a.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const o=(await l.request(`/player/${t.playerId}/events`)).events||[];if(t.player&&(t.player.unreadEventsCount=0,x()),o.length===0){a.innerHTML=`
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
            ${o.map(u=>{const m=new Date(u.created_at*1e3),h=m.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),y=m.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let c="📌";return u.type==="attack"&&(c="⚔️"),u.type==="hospital"&&(c="🏥"),u.type==="jail"&&(c="🚓"),u.type==="money"&&(c="💰"),u.type==="system"&&(c="⚙️"),u.type==="trade"&&(c="🤝"),`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${h}</div>
                    <div>${y}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${c}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${u.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${u.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(g){a.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${g.message}</div></div>`}}function kt(a,e){const{state:t,api:l,notify:r,updateSidebar:x,renderGame:g}=e,o=t.playerId;t._dungeon||(t._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const u=t._dungeon;async function m(){try{const[s,n]=await Promise.all([l.getMapItems(o),l.getDungeonHistory(o)]);u.mapItems=s.mapItems||[],u.activeRun=s.activeRun||null,u.history=n.history||[],u.loaded=!0,h()}catch(s){r(s.message||"Lỗi tải Bí Cảnh","error")}}function h(){a.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${u.activeRun?y():c()}

      ${u.lastResult?$():""}

      ${b()}
    `,v()}function y(){var p,i;const s=u.activeRun,n=s.currentWave===s.totalWaves,d=((s.currentWave-1)/s.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${s.dungeonName||s.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${d}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${s.currentWave}/${s.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((p=t.player)==null?void 0:p.hospitalRemaining)>0?"disabled":""}>
              ${n?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+s.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((i=t.player)==null?void 0:i.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function c(){return u.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${u.mapItems.map(s=>{const n=s.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${s.item.icon} ${s.item.name} <span style="opacity:0.5">x${s.quantity}</span></div>
                  ${n?`
                    <div class="item-meta">
                      ${n.name} · T${n.tier} · ${n.waves+1} tầng · Boss: ${n.bossName}
                    </div>
                  `:""}
                </div>
                ${n?`<button class="btn btn--sm btn--gold" data-enter="${s.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function $(){var p,i;const s=u.lastResult,n=s.result==="dungeon_complete"?"🏆":s.result==="wave_cleared"?"✅":"💀",d=s.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${d}">
        <div class="panel-title" style="color:${d}">${n} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${s.message}</div>
          ${(p=s.loot)!=null&&p.length?`
            <div style="margin-bottom:8px">
              ${s.loot.map(f=>`<div style="font-size:12px;color:var(--green)">🎁 ${f}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((i=s.combatLog)==null?void 0:i.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(s.combatLog||[]).map(f=>`<div>${f}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function b(){return u.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${u.history.map(s=>{const n=s.status==="completed"?"✅":s.status==="failed"?"❌":s.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${s.status==="completed"?"var(--green)":s.status==="failed"?"var(--red)":"var(--orange)"}">${n} ${s.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${s.wave}/${s.totalWaves} · ${new Date(s.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function v(){var s,n;document.querySelectorAll("[data-enter]").forEach(d=>{d.addEventListener("click",async()=>{const p=d.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){d.disabled=!0;try{const i=await l.enterDungeon(o,p);r(i.message,"success"),t.player=i.player,x(),u.activeRun=i.run,u.lastResult=null,await m()}catch(i){r(i.message,"error"),d.disabled=!1}}})}),(s=document.getElementById("btnFight"))==null||s.addEventListener("click",async()=>{const d=document.getElementById("btnFight");d.disabled=!0,d.textContent="⏳ Đang chiến đấu...";try{const p=await l.fightDungeonWave(o);t.player=p.player,x(),u.lastResult=p,p.result==="dungeon_complete"||p.result==="dungeon_failed"?u.activeRun=null:p.result==="wave_cleared"&&(u.activeRun.currentWave=p.nextWave),h()}catch(p){r(p.message,"error"),d.disabled=!1,d.textContent="⚔️ Chiến Đấu"}}),(n=document.getElementById("btnAbandon"))==null||n.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await l.abandonDungeon(o),r("Đã rời khỏi Bí Cảnh.","info"),u.activeRun=null,u.lastResult=null,await m()}catch(d){r(d.message,"error")}})}u.loaded?h():m()}function wt(a,e){const{state:t,api:l,notify:r,updateSidebar:x,renderGame:g}=e,o=t.playerId;t._housing||(t._housing={data:null,loaded:!1});const u=t._housing;async function m(){try{const b=await l.getHousing(o);u.data=b,u.loaded=!0,h()}catch(b){r(b.message||"Lỗi tải Động Phủ","error")}}function h(){const b=u.data;a.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${b.owned?c(b):y(b)}
    `,$()}function y(b){const v=b.tiers[1];return`
      <div class="panel">
        <div class="panel-title">🏗️ Mua Động Phủ</div>
        <div class="panel-body" style="text-align:center;padding:24px">
          <div style="font-size:40px;margin-bottom:12px">🏠</div>
          <div style="font-weight:600;margin-bottom:6px">${v.name}</div>
          <div style="font-size:12px;opacity:0.6;margin-bottom:12px">${v.description}</div>
          <div style="margin-bottom:12px">
            <span style="color:var(--green)">❤️ +${v.hpRegen} HP/phút</span> ·
            <span style="color:var(--blue)">🌿 ${v.gardenSlots} ô vườn</span>
          </div>
          <button class="btn btn--gold btn--lg" id="btnBuyHouse">💎 ${v.cost} Linh thạch — Mua</button>
        </div>
      </div>
    `}function c(b){const v=b.gardenSlots||[],s=b.gardenHerbs||{};return`
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
            ${Array.from({length:b.maxSlots},(n,d)=>{const p=v[d]||{},i=!!p.herb,f=p.ready,T=p.remaining||0,L=Math.ceil(T/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${f?"var(--green)":i?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${i?`
                    <div style="font-size:20px">${f?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${p.herbName||p.herb}</div>
                    <div style="font-size:10px;color:${f?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${f?"✅ Sẵn sàng!":"⏳ "+L+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${d}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(s).map(([k,S])=>`<option value="${k}">${S.name}</option>`).join("")}
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
            ${Object.entries(b.formations).map(([n,d])=>{const p=d.currentLevel>=d.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${d.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${d.icon}</span>
                      <strong style="margin-left:4px">${d.name}</strong>
                      ${d.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${d.currentLevel}</span>`:""}
                    </div>
                    ${d.canBuild?p?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${n}">
                        ⬆ ${d.nextCost} 💎
                      </button>`:`<span style="font-size:10px;color:var(--red)">T${d.requiredTier}+</span>`}
                  </div>
                  <div style="font-size:11px;opacity:0.5;margin-top:4px">${d.description}</div>
                  ${d.currentLevel>0?`<div style="font-size:10px;color:var(--orange);margin-top:2px">Phí: ${d.nextDailyCost||(d.dailyCosts?d.dailyCosts[d.currentLevel-1]:"?")}/ngày</div>`:""}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `}function $(){var b,v,s,n;(b=document.getElementById("btnBuyHouse"))==null||b.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const d=await l.buyHousing(o);r(d.message,"success"),t.player=d.player,x(),await m()}catch(d){r(d.message,"error")}}),(v=document.getElementById("btnUpgrade"))==null||v.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const d=await l.buyHousing(o);r(d.message,"success"),t.player=d.player,x(),await m()}catch(d){r(d.message,"error")}}),document.querySelectorAll(".plant-select").forEach(d=>{d.addEventListener("change",async p=>{const i=p.target.value;if(!i)return;const f=parseInt(d.dataset.slot);try{const T=await l.plantHerb(o,i,f);r(T.message,"success"),await m()}catch(T){r(T.message,"error")}})}),(s=document.getElementById("btnHarvest"))==null||s.addEventListener("click",async()=>{try{const d=await l.harvestGarden(o);r(d.message,"success"),t.player=d.player,x(),await m()}catch(d){r(d.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(d=>{d.addEventListener("click",async()=>{const p=d.dataset.fid;d.disabled=!0,d.textContent="⏳...";try{const i=await l.upgradeFormation(o,p);r(i.message,"success"),t.player=i.player,x(),await m()}catch(i){r(i.message,"error"),d.disabled=!1,d.textContent="⬆ Nâng"}})}),(n=document.getElementById("btnMaintenance"))==null||n.addEventListener("click",async()=>{try{const d=await l.payMaintenance(o);r(d.message,"success"),t.player=d.player,x(),await m()}catch(d){r(d.message,"error")}})}u.loaded?h():m()}function Lt(a,e){const{state:t}=e;t._wikiTab||(t._wikiTab="lore");function l(){a.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","explore","dungeon","housing","talent","alchemy","crime","market","tips"].map(x=>`
          <button class="btn btn--sm ${t._wikiTab===x?"btn--gold":"btn--dark"}" data-tab="${x}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",explore:"🗺️ Khám Phá",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",crime:"🔪 Phạm Tội",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[x]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${r(t._wikiTab)}
        </div>
      </div>
    `,a.querySelectorAll("[data-tab]").forEach(x=>{x.addEventListener("click",()=>{t._wikiTab=x.dataset.tab,l()})})}function r(x){return{lore:`
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

        <h4 style="color:var(--blue)">📊 4 Chỉ Số</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0">
          <div style="padding:6px;background:rgba(255,255,255,0.03);border-radius:4px">💪 <strong>Strength</strong> — Sát thương</div>
          <div style="padding:6px;background:rgba(255,255,255,0.03);border-radius:4px">⚡ <strong>Speed</strong> — Lượt đi trước + né</div>
          <div style="padding:6px;background:rgba(255,255,255,0.03);border-radius:4px">🎯 <strong>Dexterity</strong> — Chính xác + chí mạng</div>
          <div style="padding:6px;background:rgba(255,255,255,0.03);border-radius:4px">🛡️ <strong>Defense</strong> — Giảm sát thương</div>
        </div>
      `,explore:`
        <h3 style="color:var(--gold);margin-bottom:12px">🗺️ Hệ Thống Khám Phá</h3>
        <p>Tiêu Thể Lực để khám phá vùng đất. Có thể gặp: quái vật, nguyên liệu, NPC, World Boss, hoặc không gì cả.</p>

        <h4 style="color:var(--blue)">🎲 Tỷ Lệ Gặp (ví dụ Thanh Lam Trấn)</h4>
        <ul style="margin:8px 0">
          <li>👹 Quái vật: 40%</li>
          <li>🌿 Nguyên liệu: 25%</li>
          <li>📦 Vật phẩm: 10%</li>
          <li>🧓 NPC: 5%</li>
          <li>💀 World Boss: 1%</li>
          <li>😴 Không gì: 19%</li>
        </ul>

        <h4 style="color:var(--blue)">🏗️ Di Chuyển</h4>
        <p>Dùng bản đồ để di chuyển giữa các vùng. Mỗi vùng có pool quái và nguyên liệu riêng, độ khó tăng dần.</p>
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
          <li>Học skill phù hợp build → Tọa Thiên = hồi HP miễn phí</li>
          <li>Hoàn thành Quest để nhận phần thưởng lớn</li>
        </ol>

        <h4 style="color:var(--blue)">💰 Kiếm Tiền</h4>
        <ul style="margin:8px 0">
          <li>Farm quái + bán nguyên liệu cho NPC</li>
          <li>Làm Crime → rủi ro cao nhưng lợi nhuận tốt</li>
          <li>Chạy Bí Cảnh → Boss drop đồ giá trị</li>
          <li>Trồng thảo dược ở Dược Viên → thu nhập thụ động</li>
        </ul>

        <h4 style="color:var(--blue)">⚔️ Endgame</h4>
        <ul style="margin:8px 0">
          <li>Chinh phục Bí Cảnh T4 → phần thưởng tốt nhất</li>
          <li>Farm Tẩy Tủy Đan để nâng Căn Cốt → tăng hiệu quả rèn luyện</li>
          <li>Dùng Phù Văn tinh luyện trang bị → affix tốt = sức mạnh vượt trội</li>
          <li>Vượt Độ Kiếp → cảnh giới cao hơn = bonus stats khổng lồ</li>
        </ul>
      `}[x]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}l()}function St(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e,g=t.playerId;t._npcShop||(t._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const o=t._npcShop;async function u(){try{const y=await l.getShops(g);o.shops=y.shops||[],o.tax=y.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},o.loaded=!0,m()}catch(y){r(y.message||"Lỗi tải shop","error")}}function m(){a.innerHTML=`
      <div class="page-header">
        <h2>🧓 Thương Nhân NPC</h2>
        <p class="page-sub">Mua vật phẩm từ NPC. Stock giới hạn/ngày. Mua tối đa 50 vật phẩm/ngày.</p>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <div style="padding:6px 12px;background:rgba(255,200,0,0.08);border:1px solid rgba(255,200,0,0.2);border-radius:6px;font-size:12px">
          📊 Thuế P2P: <strong style="color:var(--gold)">${o.tax.rate}%</strong>
          <span style="opacity:0.5;margin-left:4px">${o.tax.reason}</span>
        </div>
      </div>

      ${o.shops.length===0?'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.4;padding:30px">Không có cửa hàng</div></div>':""}

      ${o.shops.map(y=>`
        <div class="panel" style="margin-bottom:10px">
          <div class="panel-title">${y.icon} ${y.name} <span style="opacity:0.4;font-size:11px">— ${y.area}</span></div>
          <div class="panel-body no-pad">
            ${y.items.map(c=>`
              <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:500">${c.name}</div>
                  <div style="font-size:11px;opacity:0.5">
                    Stock: <span style="color:${c.remainingStock>0?"var(--green)":"var(--red)"}">${c.remainingStock}/${c.dailyStock}</span>
                    · 💎 ${c.currentPrice}
                  </div>
                </div>
                <div style="display:flex;gap:4px;align-items:center">
                  <input type="number" class="buy-qty" data-shop="${y.id}" data-item="${c.id}" data-price="${c.currentPrice}"
                    value="1" min="1" max="${c.remainingStock}" style="width:40px;text-align:center;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:3px;font-size:11px">
                  <button class="btn btn--sm btn--gold btn-buy" data-shop="${y.id}" data-item="${c.id}"
                    ${c.remainingStock<=0?"disabled":""}>
                    ${c.remainingStock>0?"🛒 Mua":"❌ Hết"}
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `,h()}function h(){a.querySelectorAll(".btn-buy").forEach(y=>{y.addEventListener("click",async()=>{const c=y.dataset.shop,$=y.dataset.item,b=a.querySelector(`.buy-qty[data-shop="${c}"][data-item="${$}"]`),v=parseInt((b==null?void 0:b.value)||1);y.disabled=!0,y.textContent="⏳...";try{const s=await l.buyFromShop(g,c,$,v);r(s.message,"success"),t.player=s.player,x(),await u()}catch(s){r(s.message,"error"),y.disabled=!1,y.textContent="🛒 Mua"}})})}o.loaded?m():u()}function Et(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e,g=t.playerId;t._guild||(t._guild={data:null,loaded:!1,allGuilds:null});const o=t._guild;async function u(){try{o.data=await l.getMyGuild(g),o.loaded=!0,h()}catch(b){r(b.message||"Lỗi","error")}}async function m(){try{const b=await l.listGuilds();o.allGuilds=b.guilds||[],h()}catch(b){r(b.message,"error")}}function h(){const b=o.data;a.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${b!=null&&b.inGuild?c(b):y(b)}
    `,$()}function y(b){return`
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
          ${o.allGuilds?o.allGuilds.map(v=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
              <div style="flex:1">
                <div style="font-weight:600">[${v.tag}] ${v.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${v.level} · ${v.member_count}/${v.max_members} · Quỹ: ${v.treasury} 💎 · Chưởng Môn: ${v.leader_name}</div>
              </div>
              <button class="btn btn--sm btn--green btn-join" data-gid="${v.id}" ${v.member_count>=v.max_members?"disabled":""}>
                ${v.member_count>=v.max_members?"Đầy":"Gia nhập"}
              </button>
            </div>
          `).join(""):'<div style="padding:20px;text-align:center;opacity:0.3">Nhấn "Tải" để xem danh sách</div>'}
        </div>
      </div>
    `}function c(b){var d;const v=b.guild,s=b.members||[],n=b.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${v.tag}] ${v.name} <span style="opacity:0.3">Lv${v.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((d=v.levelInfo)==null?void 0:d.name)||""} · ${v.memberCount}/${v.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${v.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${v.dailyUpkeep}/ngày</span>
              ${v.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(v.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(v.buffs).map(([p,i])=>`${p} +${i}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${b.myRole==="leader"&&v.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${v.nextLevel.name}">⬆ ${v.nextLevel.upgradeCost} 💎</button>`:""}
            ${b.myRole==="leader"&&v.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            ${n.slice(0,10).map(p=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(p.created_at).toLocaleString("vi")}</span>
                ${p.detail||p.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${s.length}/${v.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${s.map(p=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${p.role==="leader"?"👑":p.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${p.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${p.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${b.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function $(){var b,v,s,n,d,p;(b=document.getElementById("btnCreate"))==null||b.addEventListener("click",async()=>{var L,k,S,C,w,P;const i=(k=(L=document.getElementById("guildName"))==null?void 0:L.value)==null?void 0:k.trim(),f=(C=(S=document.getElementById("guildTag"))==null?void 0:S.value)==null?void 0:C.trim(),T=(P=(w=document.getElementById("guildDesc"))==null?void 0:w.value)==null?void 0:P.trim();if(!i||!f)return r("Nhập tên và tag!","error");try{const I=await l.createGuild(g,i,f,T);r(I.message,"success"),t.player=I.player,x(),o.loaded=!1,await u()}catch(I){r(I.message,"error")}}),(v=document.getElementById("btnLoadGuilds"))==null||v.addEventListener("click",m),document.querySelectorAll(".btn-join").forEach(i=>{i.addEventListener("click",async()=>{try{const f=await l.joinGuild(g,parseInt(i.dataset.gid));r(f.message,"success"),o.loaded=!1,await u()}catch(f){r(f.message,"error")}})}),(s=document.getElementById("btnContribute"))==null||s.addEventListener("click",async()=>{var f;const i=parseInt(((f=document.getElementById("contributeAmt"))==null?void 0:f.value)||0);if(!(i<=0))try{const T=await l.contributeGuild(g,i);r(T.message,"success"),t.player=T.player,x(),await u()}catch(T){r(T.message,"error")}}),(n=document.getElementById("btnUpgradeGuild"))==null||n.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const i=await l.upgradeGuild(g);r(i.message,"success"),await u()}catch(i){r(i.message,"error")}}),(d=document.getElementById("btnPayUpkeep"))==null||d.addEventListener("click",async()=>{try{const i=await l.payGuildUpkeep(o.data.guild.id);r(i.message,"success"),await u()}catch(i){r(i.message,"error")}}),(p=document.getElementById("btnLeave"))==null||p.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const i=await l.leaveGuild(g);r(i.message,"success"),o.loaded=!1,await u()}catch(i){r(i.message,"error")}})}o.loaded?h():u()}function Ct(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e,g=t.playerId;t._profile||(t._profile={results:[],viewing:null,searchQuery:""});const o=t._profile;function u(){a.innerHTML=`
      <div class="page-header">
        <h2>🔍 Tìm Đạo Hữu</h2>
        <p class="page-sub">Tìm kiếm người chơi theo tên. Xem profile, tấn công hoặc kết bạn.</p>
      </div>

      <div class="panel" style="margin-bottom:12px">
        <div class="panel-body" style="padding:12px 16px;display:flex;gap:8px">
          <input type="text" id="searchInput" placeholder="Nhập tên người chơi..."
            value="${o.searchQuery}"
            style="flex:1;padding:8px 12px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
          <button class="btn btn--blue" id="btnSearch">🔍 Tìm</button>
        </div>
      </div>

      ${o.viewing?m(o.viewing):""}

      ${o.results.length>0&&!o.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${o.results.length})</div>
        <div class="panel-body no-pad">
          ${o.results.map(c=>`
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
      `:!o.viewing&&o.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,h()}function m(c){var s,n,d;const $=c.id===g,b=c.maxHp>0?Math.round(c.currentHp/c.maxHp*100):100,v={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((s=c.name[0])==null?void 0:s.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${c.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${c.level} · ${((n=c.realmInfo)==null?void 0:n.fullName)||"Phàm Nhân"}
                ${c.guild?` · <span style="color:var(--blue)">[${c.guild.tag}] ${c.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${v[c.currentArea]||c.currentArea}
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(d=c.gold)==null?void 0:d.toLocaleString()} 💎</strong></div>

          ${$?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${c.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${c.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function h(){var c,$,b,v,s;(c=document.getElementById("btnSearch"))==null||c.addEventListener("click",y),($=document.getElementById("searchInput"))==null||$.addEventListener("keydown",n=>{n.key==="Enter"&&y()}),document.querySelectorAll(".btn-view, [data-view]").forEach(n=>{n.addEventListener("click",async()=>{const d=n.dataset.vid||n.dataset.view;try{const p=await l.getPlayerProfile(d);o.viewing=p.profile,u()}catch(p){r(p.message,"error")}})}),(b=document.getElementById("btnAttack"))==null||b.addEventListener("click",async()=>{const n=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${o.viewing.name}?`))try{const d=await l.mugPlayer(g,n);r(d.message,d.won?"success":"error"),d.player&&(t.player=d.player,x())}catch(d){r(d.message,"error")}}),(v=document.getElementById("btnAddFriend"))==null||v.addEventListener("click",async()=>{const n=document.getElementById("btnAddFriend").dataset.tid;try{const d=await l.addFriend(g,n);r(d.message||"Đã gửi lời mời!","success")}catch(d){r(d.message,"error")}}),(s=document.getElementById("btnBackSearch"))==null||s.addEventListener("click",()=>{o.viewing=null,u()})}async function y(){var b;const c=document.getElementById("searchInput"),$=(b=c==null?void 0:c.value)==null?void 0:b.trim();if(!$||$.length<2)return r("Nhập ít nhất 2 ký tự!","error");o.searchQuery=$,o.viewing=null;try{const v=await l.searchPlayers($);o.results=v.players||[],u()}catch(v){r(v.message,"error")}}u()}function Pt(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e,g=t.playerId;t._arena||(t._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const o=t._arena;async function u(){try{o.data=await l.getArena(g),o.loaded=!0,m()}catch(h){r(h.message,"error")}}function m(){var $,b,v,s;const h=o.data,y=(h==null?void 0:h.arena)||{},c=y.rating>=1500?"👑":y.rating>=1200?"⚔️":y.rating>=1e3?"🗡️":"🛡️";a.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với người chơi khác. ELO rating, phần thưởng theo rank.</p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">${c}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">ELO: ${y.rating||1e3}</div>
            <div style="font-size:12px;opacity:0.6">
              ${y.wins||0}W / ${y.losses||0}L · Streak: ${y.streak||0}
            </div>
          </div>
          <button class="btn btn--red btn--lg" id="btnFight" ${o.fighting?"disabled":""}>
            ⚔️ Đấu (${h.entryFee||50} 💎)
          </button>
        </div>
      </div>

      ${o.lastResult?`
      <div class="panel" style="margin-bottom:10px;border-left:3px solid ${o.lastResult.won?"var(--green)":"var(--red)"}">
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:700;color:${o.lastResult.won?"var(--green)":"var(--red)"}">
            ${o.lastResult.won?"🏆 CHIẾN THẮNG!":"💀 THẤT BẠI!"}
          </div>
          <div style="font-size:12px;margin-top:4px">
            Đối thủ: <strong>${($=o.lastResult.opponent)==null?void 0:$.name}</strong> (Lv${(b=o.lastResult.opponent)==null?void 0:b.level}, ELO ${(v=o.lastResult.opponent)==null?void 0:v.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">ELO: ${o.lastResult.ratingChange>0?"+":""}${o.lastResult.ratingChange}</div>
          ${o.lastResult.combatLog?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div style="font-size:10px;opacity:0.5;margin-top:4px;max-height:150px;overflow:auto">${o.lastResult.combatLog.map(n=>`<div>${n}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(h.top10||[]).map((n,d)=>`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${d<3?"var(--gold)":"var(--text-dim)"}">#${d+1}</span>
                <span style="flex:1">${n.name}</span>
                <span style="color:var(--blue)">${n.rating} ELO</span>
                <span style="opacity:0.4;margin-left:6px">${n.wins}W/${n.losses}L</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(h.history||[]).map(n=>{const d=n.winner_id===g;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${d?"var(--green)":"var(--red)"}">
                  ${d?"✅":"❌"} vs ${n.attacker_id===g?n.defender_name:n.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${n.rating_change>0?"+":""}${n.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,(s=document.getElementById("btnFight"))==null||s.addEventListener("click",async()=>{o.fighting=!0,m();try{const n=await l.arenaFight(g);o.lastResult=n,t.player=n.player,x(),r(n.message,n.won?"success":"error"),o.fighting=!1,await u()}catch(n){r(n.message,"error"),o.fighting=!1,m()}})}o.loaded?m():u()}function It(a,e){const{state:t,api:l,notify:r,updateSidebar:x,renderGame:g}=e,o=t.playerId,u=t._auctionTab||"browse";async function m(){try{const[c,$]=await Promise.all([l.getAuctions(),l.getMyAuctions(o)]);t._auctionListings=c.listings||[],t._auctionMine=$.listings||[],h()}catch(c){r(c.message,"error")}}function h(){const c=t._auctionListings||[],$=t._auctionMine||[],b=(t.player.inventory||[]).filter(v=>v.slot&&v.slot!=="consumable");a.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${u==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${u==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${u==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${$.length})</button>
      </div>

      ${u==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':c.map(v=>{const s=JSON.parse(v.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${s.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${s.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${v.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${v.id}">💎 ${v.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:u==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${b.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${b.map(v=>`<option value="${v.id}">${v.name} [${v.rarity}]</option>`).join("")}
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
          ${$.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':$.map(v=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(v.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${v.status==="active"?"var(--green)":v.status==="sold"?"var(--gold)":"var(--red)"}">${v.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${v.buyout_price}</div>
                </div>
                ${v.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${v.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,y()}function y(){var c;a.querySelectorAll(".tab-btn").forEach($=>$.addEventListener("click",()=>{t._auctionTab=$.dataset.tab,m()})),a.querySelectorAll(".btn-buy").forEach($=>$.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const b=await l.buyAuction(o,parseInt($.dataset.lid));r(b.message,"success"),t.player=b.player,x(),await m()}catch(b){r(b.message,"error")}})),a.querySelectorAll(".btn-cancel").forEach($=>$.addEventListener("click",async()=>{try{const b=await l.cancelAuction(o,parseInt($.dataset.lid));r(b.message,"success"),t.player=b.player,x(),await m()}catch(b){r(b.message,"error")}})),(c=document.getElementById("btnListItem"))==null||c.addEventListener("click",async()=>{var s,n,d;const $=(s=document.getElementById("selSellItem"))==null?void 0:s.value,b=parseInt(((n=document.getElementById("inpPrice"))==null?void 0:n.value)||"500"),v=parseInt(((d=document.getElementById("selDuration"))==null?void 0:d.value)||"24");try{const p=await l.listAuction(o,$,b,v);r(p.message,"success"),t.player=p.player,x(),t._auctionTab="mine",await m()}catch(p){r(p.message,"error")}})}m()}function Mt(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e,g=t.playerId;async function o(){try{const m=await l.getDailyQuests(g);t._dailyQuests=m,u()}catch(m){r(m.message,"error")}}function u(){const m=t._dailyQuests||{},h=m.quests||[];m.allCompleted;const y=m.bonusReward;a.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${h.map(c=>{const $=c.quest_info||{},b=c.target>0?Math.min(100,Math.round(c.progress/c.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${c.claimed?"var(--text-dim)":c.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${$.name||c.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${$.difficulty==="Khó"?"var(--red)":$.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${$.difficulty||"?"}</span>
              </div>
              ${c.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':c.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${c.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${c.progress}/${c.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${$.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${b}%;background:${c.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${$.goldReward||0} · ✨ ${$.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${y?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${y.gold} 💎, +${y.xp} EXP</div>
      </div>
      `:""}
    `,a.querySelectorAll(".btn-claim").forEach(c=>c.addEventListener("click",async()=>{try{const $=await l.claimDailyQuest(g,parseInt(c.dataset.qid));r($.message,"success"),t.player=$.player,x(),await o()}catch($){r($.message,"error")}}))}o()}function qt(a,e){const{state:t,api:l,notify:r,updateSidebar:x}=e,g=t.playerId;async function o(){try{t._worldBoss=await l.getWorldBoss(),u()}catch(m){r(m.message,"error")}}function u(){var v;const m=t._worldBoss||{},h=m.boss||{},y=m.hpPercent||0,c=m.topContributors||[],$=m.rewards||{},b=h.status==="active"&&h.current_hp>0;a.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp.</p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${b?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${h.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${h.level||"?"} · ${b?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(h.current_hp||0).toLocaleString()} / ${(h.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${y}%;background:${y>50?"var(--red)":y>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${b?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${$.gold||0} · ✨ ${$.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':c.map((s,n)=>{var d;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${n<3?"var(--gold)":"var(--text-dim)"}">#${n+1}</span>
                <span style="flex:1">${s.name}</span>
                <span style="color:var(--red)">${(d=s.total_damage)==null?void 0:d.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${s.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(v=document.getElementById("btnAttackBoss"))==null||v.addEventListener("click",async()=>{try{const s=await l.attackWorldBoss(g);r(s.message,s.defeated?"success":"info"),t.player=s.player,x(),await o()}catch(s){r(s.message,"error")}})}o()}function Ht(a,e){const{state:t,api:l,notify:r,updateSidebar:x,renderGame:g}=e,o=t.playerId,u={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function m(){var y;try{const[c,$]=await Promise.all([l.getGachaPools(),l.getGachaPity(o)]);t._gacha={pools:c.pools||{},pity:$.pity||{},results:((y=t._gacha)==null?void 0:y.results)||[]},h()}catch(c){r(c.message,"error")}}function h(){const y=t._gacha||{},c=y.pools||{},$=y.pity||{},b=y.results||[];a.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(c).map(([v,s])=>{var d,p,i;const n=$[v]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${v==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${s.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${u.legendary}">★ ${(d=s.rates)==null?void 0:d.legendary}%</span> ·
                <span style="color:${u.rare}">◆ ${(p=s.rates)==null?void 0:p.rare}%</span> ·
                <span style="color:${u.uncommon}">● ${(i=s.rates)==null?void 0:i.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${n.pulls_since_rare||0}/${s.pityRare} · Legend: ${n.pulls_since_legendary||0}/${s.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${v}" data-pulls="1">💎 ${s.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${v}" data-pulls="10">💎 ${s.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${b.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${b.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${b.map(v=>{var s,n,d,p;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${u[v.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((s=v.item)==null?void 0:s.slot)==="weapon"?"⚔️":((n=v.item)==null?void 0:n.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${u[v.rarity]}">${((d=v.item)==null?void 0:d.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${v.rarity}] ${(((p=v.item)==null?void 0:p.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,a.querySelectorAll(".btn-pull").forEach(v=>v.addEventListener("click",async()=>{const s=v.dataset.pool,n=parseInt(v.dataset.pulls);v.disabled=!0,v.textContent="⏳...";try{const d=await l.gachaPull(t.playerId,s,n);r(d.message,"success"),t.player=d.player,x(),t._gacha.results=d.results||[],t._gacha.pity[s]=d.pity,h()}catch(d){r(d.message,"error"),v.disabled=!1}}))}m()}function Nt(a,e){const{state:t,api:l,notify:r}=e,x=t._lbTab||"level";async function g(){try{t._lbData=await l.getLeaderboard(x),o()}catch(u){r(u.message,"error")}}function o(){const m=(t._lbData||{}).rankings||[],h={level:"📊 Level",gold:"💰 Linh Thạch",pvp:"⚔️ PvP",guild:"🏯 Tông Môn"};a.innerHTML=`
      <div class="page-header">
        <h2>🏆 Bảng Xếp Hạng</h2>
        <p class="page-sub">Top 50 người chơi và guild.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        ${Object.entries(h).map(([y,c])=>`<button class="btn ${x===y?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="${y}">${c}</button>`).join("")}
      </div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${x==="guild"?m.map((y,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1">
                <strong>[${y.tag}] ${y.name}</strong>
                <span style="opacity:0.4"> Lv${y.level}</span>
              </span>
              <span style="opacity:0.4">${y.members}/${y.max_members} 👤</span>
              <span style="color:var(--gold);margin-left:8px">💰 ${parseInt(y.treasury||0).toLocaleString()}</span>
            </div>
          `).join(""):x==="pvp"?m.map((y,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1"><strong>${y.name}</strong> <span style="opacity:0.4">Lv${y.level}</span></span>
              <span style="color:var(--blue)">${y.rating} ELO</span>
              <span style="opacity:0.4;margin-left:6px">${y.wins}W/${y.losses}L</span>
            </div>
          `).join(""):m.map((y,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1"><strong>${y.name}</strong></span>
              ${x==="level"?`<span>Lv${y.level}</span>`:""}
              <span style="color:var(--gold);margin-left:8px">💎 ${parseInt(y.gold||0).toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,a.querySelectorAll(".tab-btn").forEach(y=>y.addEventListener("click",()=>{t._lbTab=y.dataset.tab,g()}))}g()}const E={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},et=document.getElementById("app"),J={get state(){return E},api:M,notify:z,renderGame:B,updateSidebar:jt};async function Bt(){const a=localStorage.getItem("playerId");if(a&&!E.playerId)try{const e=await M.getPlayer(a);E.playerId=a,E.player=e.player,await V(),B();return}catch{localStorage.removeItem("playerId")}E.playerId?B():at()}function at(){var e,t;const a=E.authTab||"login";et.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(l=>{l.addEventListener("click",()=>{E.authTab=l.dataset.auth,at()})}),(e=document.getElementById("btnLogin"))==null||e.addEventListener("click",async()=>{const l=document.getElementById("inpUsername").value.trim(),r=document.getElementById("inpPassword").value;if(!l||!r)return z("Vui lòng nhập đầy đủ","error");try{const x=await M.login(l,r);E.playerId=x.id,E.player=x.player,localStorage.setItem("playerId",x.id),z(x.message,"success"),await V(),B()}catch(x){z(x.message||"Đăng nhập thất bại!","error")}}),(t=document.getElementById("btnRegister"))==null||t.addEventListener("click",async()=>{var o,u;const l=document.getElementById("inpUsername").value.trim(),r=document.getElementById("inpPassword").value,x=((o=document.getElementById("inpName"))==null?void 0:o.value.trim())||"Vô Danh",g=((u=document.querySelector('input[name="gender"]:checked'))==null?void 0:u.value)||"male";if(!l||!r)return z("Vui lòng nhập đầy đủ","error");try{const m=await M.register(l,r,x,g);E.playerId=m.id,E.player=m.player,localStorage.setItem("playerId",m.id),z(m.message,"success"),await V(),B()}catch(m){z(m.message||"Đăng ký thất bại!","error")}})}function nt(a){const e=Math.floor(Date.now()/1e3),t=[];return a.hospitalUntil&&a.hospitalUntil>e&&t.push({icon:"🏥",label:"Tịnh dưỡng",endTime:a.hospitalUntil,color:"var(--red)"}),a.medCooldownUntil&&a.medCooldownUntil>e&&t.push({icon:"💊",label:"Đan độc",endTime:a.medCooldownUntil,color:"var(--orange)"}),a.jailUntil&&a.jailUntil>e&&t.push({icon:"⛓️",label:"Ngục tù",endTime:a.jailUntil,color:"var(--purple)"}),a.travelArrivesAt&&a.travelArrivesAt>e&&t.push({icon:"🚶",label:"Di chuyển",endTime:a.travelArrivesAt,color:"var(--blue)"}),t.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${t.map(l=>{const r=Math.max(0,l.endTime-e),x=Math.floor(r/60),g=r%60,o=x>0?`${x}p${String(g).padStart(2,"0")}s`:`${g}s`;return`<span class="status-icon" data-end="${l.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${l.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${l.color};white-space:nowrap;
      " title="${l.label}">${l.icon} <span class="cd-time">${o}</span></span>`}).join("")}
  </div>`}let A=null;function _t(){A&&clearInterval(A),A=setInterval(()=>{const a=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(e=>{const t=parseInt(e.dataset.end),l=Math.max(0,t-a);if(l<=0){e.remove();return}const r=Math.floor(l/60),x=l%60,g=e.querySelector(".cd-time");g&&(g.textContent=r>0?`${r}p${String(x).padStart(2,"0")}s`:`${x}s`)}),document.querySelectorAll(".status-effects").forEach(e=>{e.children.length===0&&e.remove()})},1e3)}function st(a){let e="";const l={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[a.currentArea];return l&&(e+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${l.tooltip}">${l.icon} Cảnh Vực</span>`),a.combatBuffs&&a.combatBuffs.length>0&&a.combatBuffs.forEach(r=>{let x="💊",g="Buff";r.type==="status"&&r.stat==="poison"?(x="☠️",g="Trúng Độc"):r.type==="status"&&r.stat==="confuse"?(x="👹",g="Ma Hóa"):r.stat==="allStats"||r.stat==="hp"||r.stat==="damage"?(x="🔥",g="Cuồng Nộ"):r.stat==="defense"||r.stat==="resist"?(x="🛡️",g="Kiên Cố"):r.stat==="speed"||r.stat==="dexterity"?(x="💨",g="Thân Pháp"):(x="✨",g="Cường Hóa");let o=r.duration?` (-${r.duration} Trận)`:"",u=`Hiệu ứng: ${r.stat} (${r.type} ${r.value})${r.duration?` - Còn lại: ${r.duration} Trận đấu`:""}`;e+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${u}">${x} ${g}${o}</span>`}),e?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${e}</div>`:""}function B(){var u,m,h,y,c,$,b,v,s;const a=E.player;if(!a)return;const e=Math.max(0,a.currentHp/a.maxHp*100),t=a.maxStamina>0?Math.max(0,a.currentStamina/a.maxStamina*100):0,l=a.maxEnergy>0?Math.max(0,a.currentEnergy/a.maxEnergy*100):0,r=(a.maxNerve??15)>0?Math.max(0,(a.nerve??0)/(a.maxNerve??15)*100):0,x=E.exploration?E.exploration[a.currentArea||"thanh_lam_tran"]:null,g=x?x.name:"Khám Phá";et.innerHTML=`
    <div class="game-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="game-title">NGHỊCH THIÊN KÝ</div>
          <div class="game-sub">Tu Tiên RPG v2.0</div>
        </div>

        <div class="sidebar-player">
          <div class="player-name">${a.name}</div>
          <div class="player-meta">Lv.${a.level} · ${((u=a.realmInfo)==null?void 0:u.fullName)||"?"}</div>
          ${nt(a)}
          ${st(a)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${a.currentHp}/${a.maxHp}
                ${a.currentHp<a.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(m=a.skills)!=null&&m.some(n=>n.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${e}%" data-low="${e<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${a.currentStamina??100}/${a.maxStamina??100}
                ${(a.currentStamina??100)<(a.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((h=a.stats)==null?void 0:h.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${t}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${a.currentEnergy}/${a.maxEnergy}
                ${a.currentEnergy<a.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((y=a.stats)==null?void 0:y.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${l}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${a.nerve??0}/${a.maxNerve??15}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${r}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:12px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:8px">💎 ${a.gold??0} Linh Thạch</div>
            <div style="display:flex; gap:6px; width:100%">
              <button class="btn btn--dark nav-item ${E.currentPage==="events"?"active":""}" data-page="events" style="flex:1; padding:6px; font-size:14px; position:relative" title="Sự Kiện">
                📜
                ${(a.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute; top:-4px; right:-4px; background:var(--red); width:8px; height:8px; padding:0; border-radius:50%"></span>':""}
              </button>
              <button class="btn btn--dark" style="flex:1; padding:6px; font-size:14px; opacity:0.3; cursor:default" disabled></button>
              <button class="btn btn--dark" style="flex:1; padding:6px; font-size:14px; opacity:0.3; cursor:default" disabled></button>
            </div>
          </div>
        </div>

        <ul class="nav" style="${(a.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <li class="nav-section">TỰ THÂN</li>
          <li class="nav-item ${E.currentPage==="stats"?"active":""}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${($=(c=E.player)==null?void 0:c.realmInfo)!=null&&$.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="inventory"?"active":""}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(a.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)">⏳</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="skills"?"active":""}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>
          <li class="nav-item ${E.currentPage==="education"?"active":""}" data-page="education">
            <span class="icon">🧘</span> Tu Luyện
          </li>

          ${(a.hospitalRemaining??0)>0?`
          <li class="nav-section" style="color:var(--red)">⚠ Đang bị thương</li>
          <li class="nav-item" style="color:var(--red);pointer-events:none">
            <span class="icon">🏥</span> Tịnh dưỡng ${a.hospitalRemaining}s
          </li>`:""}

          <li class="nav-section">HÀNH TRÌNH</li>
          <li class="nav-item ${E.currentPage==="travel"?"active":""}" data-page="travel">
            <span class="icon">🚶</span> Ngao Du
            ${(a.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="combat"?"active":""}" data-page="combat">
            <span class="icon">🔍</span> Khám Phá (${g})
          </li>
          <li class="nav-item ${E.currentPage==="quests"?"active":""}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(a.activeQuests||[]).filter(n=>n.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(a.activeQuests||[]).filter(n=>n.status==="active").length}</span>`:""}
          </li>
          <li class="nav-item ${E.currentPage==="crimes"?"active":""}" data-page="crimes">
            <span class="icon">💀</span> Ác Nghiệp
          </li>

          <li class="nav-item ${E.currentPage==="profile"?"active":""}" data-page="profile">
            <span class="icon">🔍</span> Tìm Người
          </li>

          <li class="nav-section">THẾ GIỚI</li>
          <li class="nav-item ${E.currentPage==="dungeon"?"active":""}" data-page="dungeon">
            <span class="icon">🗺️</span> Bí Cảnh
          </li>
          <li class="nav-item ${E.currentPage==="housing"?"active":""}" data-page="housing">
            <span class="icon">🏠</span> Động Phủ
          </li>
          <li class="nav-item ${E.currentPage==="market"?"active":""}" data-page="market">
            <span class="icon">🏪</span> Giao Dịch Đài
          </li>
          <li class="nav-item ${E.currentPage==="npcshop"?"active":""}" data-page="npcshop">
            <span class="icon">🧓</span> Thương Nhân
          </li>
          <li class="nav-item ${E.currentPage==="guild"?"active":""}" data-page="guild">
            <span class="icon">🏯</span> Tông Môn
          </li>
          <li class="nav-item ${E.currentPage==="alchemy"?"active":""}" data-page="alchemy">
            <span class="icon">⚒️</span> Chế Tác
          </li>
          <li class="nav-item ${E.currentPage==="library"?"active":""}" data-page="library">
            <span class="icon">📚</span> Tàng Kinh Các
          </li>
          <li class="nav-item ${E.currentPage==="wiki"?"active":""}" data-page="wiki">
            <span class="icon">📜</span> Wiki
          </li>
          <li class="nav-item ${E.currentPage==="leaderboard"?"active":""}" data-page="leaderboard">
            <span class="icon">🏆</span> Xếp Hạng
          </li>

          <li class="nav-section">CHIẾN ĐẤU</li>
          <li class="nav-item ${E.currentPage==="arena"?"active":""}" data-page="arena">
            <span class="icon">⚔️</span> Đấu Trường
          </li>
          <li class="nav-item ${E.currentPage==="worldboss"?"active":""}" data-page="worldboss">
            <span class="icon">🐉</span> Boss TG
          </li>

          <li class="nav-section">KINH TẾ</li>
          <li class="nav-item ${E.currentPage==="auction"?"active":""}" data-page="auction">
            <span class="icon">🏪</span> Đấu Giá
          </li>
          <li class="nav-item ${E.currentPage==="gacha"?"active":""}" data-page="gacha">
            <span class="icon">🎰</span> Thiên Cơ Đài
          </li>
          <li class="nav-item ${E.currentPage==="dailyquest"?"active":""}" data-page="dailyquest">
            <span class="icon">📋</span> Nhật Nhiệm
          </li>

          ${a.role==="admin"?`
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(n=>{n.addEventListener("click",()=>{E.currentPage=n.dataset.page,B()})}),(b=document.getElementById("btnFabChat"))==null||b.addEventListener("click",()=>D("chat")),(v=document.getElementById("btnFabSocial"))==null||v.addEventListener("click",()=>D("social"));const o=document.querySelector('.sidebar-gold .nav-item[data-page="events"]');o&&o.addEventListener("click",n=>{n.stopPropagation(),E.currentPage="events",E.popupOpen=!1,B()}),(s=document.getElementById("btnPopupClose"))==null||s.addEventListener("click",()=>{E.popupOpen=!1,B()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(n=>{n.addEventListener("click",()=>D(n.dataset.popup))}),Gt(),E.popupOpen&&zt(),_t()}function D(a){E.popupOpen=!0,E.popupPage=a,B()}function zt(){const a=document.getElementById("popupContent");a&&(E.popupPage==="chat"?tt(a,J):E.popupPage==="social"&&Z(a,J))}const Ot={combat:lt,crimes:vt,education:mt,stats:pt,skills:Y,inventory:K,travel:yt,alchemy:F,quests:ht,admin:bt,social:Z,chat:tt,market:xt,realm:ft,events:$t,dungeon:kt,housing:wt,wiki:Lt,npcshop:St,guild:Et,library:X,profile:Ct,arena:Pt,auction:It,dailyquest:Mt,worldboss:qt,gacha:Ht,leaderboard:Nt};function Gt(){const a=document.getElementById("pageContent");if(!a)return;const e=Ot[E.currentPage];e&&e(a,J)}function jt(){var x,g,o,u,m;const a=E.player;if(!a)return;const e=Math.max(0,a.currentHp/a.maxHp*100),t=a.maxEnergy>0?Math.max(0,a.currentEnergy/a.maxEnergy*100):0,l=document.querySelector(".sidebar-player");if(l){const h=a.maxStamina>0?Math.max(0,a.currentStamina/a.maxStamina*100):0,y=(a.maxNerve??15)>0?Math.max(0,(a.nerve??0)/(a.maxNerve??15)*100):0;l.innerHTML=`
      <div class="player-name">${a.name}</div>
      <div class="player-meta">Lv.${a.level} · ${((x=a.realmInfo)==null?void 0:x.fullName)||"?"}</div>
      ${nt(a)}
      ${st(a)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${a.currentHp}/${a.maxHp}
            ${a.currentHp<a.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(g=a.skills)!=null&&g.some(c=>c.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${e}%" data-low="${e<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${a.currentStamina??100}/${a.maxStamina??100}
            ${(a.currentStamina??100)<(a.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((o=a.stats)==null?void 0:o.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${h}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${a.currentEnergy}/${a.maxEnergy}
            ${a.currentEnergy<a.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((u=a.stats)==null?void 0:u.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${t}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label"><span>💀 Nghịch Khí</span><span>${a.nerve??0}/${a.maxNerve??15}</span></div>
        <div class="bar-track"><div class="bar-fill nerve" style="width:${y}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${a.gold??0} Linh Thạch</div>`}const r=document.querySelector('.nav-item[data-page="stats"]');if(r){let h="";a.statPoints>0&&(h+=`<span class="badge">${a.statPoints}</span>`),(m=a.realmInfo)!=null&&m.canBreakthrough&&(h+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),r.querySelectorAll(".badge").forEach(y=>y.remove()),r.insertAdjacentHTML("beforeend",h)}}async function V(){try{const[a,e,t,l,r,x]=await Promise.all([M.getMonsters(),M.getSkills(),M.getItems(),M.getMedicines(),M.getCrimes(),M.getEducation()]);E.monsters=a.monsters||[],E.skills=e.skills||[],E.items=t.items||[],E.medicines=l.medicines||[],E.crimes=r.crimes||[],E.educationTrees=x.trees||[],E.exploration=await M.getExploration(),E.recipes=(await M.getRecipes()).recipes,E.npcs=(await M.getNpcs()).npcs||[]}catch(a){console.error("Lỗi tải dữ liệu:",a)}}function z(a,e="info"){var l;(l=document.querySelector(".notification"))==null||l.remove();const t=document.createElement("div");t.className=`notification ${e}`,t.textContent=a,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}Bt();
//# sourceMappingURL=index-DHFywDqu.js.map
