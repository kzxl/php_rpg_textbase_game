(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))p(o);new MutationObserver(o=>{for(const k of o)if(k.type==="childList")for(const u of k.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&p(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const k={};return o.integrity&&(k.integrity=o.integrity),o.referrerPolicy&&(k.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?k.credentials="include":o.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function p(o){if(o.ep)return;o.ep=!0;const k=t(o);fetch(o.href,k)}})();const dt="/api";class lt{async request(a,t={}){try{const p=await fetch(`${dt}${a}`,{headers:{"Content-Type":"application/json",...t.headers},...t}),o=await p.json();if(!p.ok)throw new Error(o.error||`HTTP ${p.status}`);return o}catch(p){throw console.error(`API Error [${a}]:`,p),p}}register(a,t,p,o){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:a,password:t,name:p,gender:o})})}login(a,t){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:a,password:t})})}createPlayer(a,t){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:a,gender:t})})}getPlayer(a){return this.request(`/player/${a}`)}allocateStat(a,t,p=1){return this.request(`/player/${a}/allocate`,{method:"POST",body:JSON.stringify({stat:t,points:p})})}equipItem(a,t){return this.request(`/player/${a}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}learnSkill(a,t){return this.request(`/player/${a}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:t})})}equipSkill(a,t,p=!0){return this.request(`/player/${a}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:t,equip:p})})}healPlayer(a){return this.request(`/player/${a}/heal`,{method:"POST"})}useMedicine(a,t){return this.request(`/player/${a}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}trainStat(a,t){return this.request(`/player/${a}/train`,{method:"POST",body:JSON.stringify({stat:t})})}fullCombat(a,t=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:a,monsterId:t})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(a,t){return this.request(`/player/${a}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}useItem(a,t){return this.request(`/player/${a}/use`,{method:"POST",body:JSON.stringify({itemId:t})})}useMedicine(a,t){return this.request(`/player/${a}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}generateItem(a,t){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,playerId:a})})}trainStat(a,t,p=1){return this.request(`/player/${a}/train`,{method:"POST",body:JSON.stringify({stat:t,count:p})})}allocateStat(a,t){return this.request(`/player/${a}/allocate`,{method:"POST",body:JSON.stringify({stat:t})})}attemptBreakthrough(a){return this.request(`/player/${a}/breakthrough`,{method:"POST"})}getRealm(a){return this.request(`/player/${a}/realm`)}craftItem(a,t){return this.request(`/player/${a}/craft`,{method:"POST",body:JSON.stringify({recipeId:t})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(a,t,p,o=-1){return this.request(`/player/${a}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:p,lockAffixIndex:o})})}commitCrime(a,t){return this.request(`/player/${a}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:t})})}escapeJail(a){return this.request(`/player/${a}/escape-jail`,{method:"POST"})}bail(a){return this.request(`/player/${a}/bail`,{method:"POST"})}enrollNode(a,t,p){return this.request(`/player/${a}/enroll`,{method:"POST",body:JSON.stringify({nodeId:t,treeId:p})})}checkEducation(a){return this.request(`/player/${a}/check-education`,{method:"POST"})}generateItem(a="common",t=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:a,slot:t})})}explore(a){return this.request(`/player/${a}/explore`,{method:"POST"})}trackMonster(a,t){return this.request(`/player/${a}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:t})})}getAreaMonsters(a){return this.request(`/player/${a}/area-monsters`)}getNpc(a){return this.request(`/npc/${a}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(a,t,p){return this.request(`/player/${a}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:t,questId:p})})}completeQuest(a,t){return this.request(`/player/${a}/complete-quest`,{method:"POST",body:JSON.stringify({questId:t})})}getQuests(a){return this.request(`/player/${a}/quests`)}searchPlayers(a){return this.request(`/players/search?q=${encodeURIComponent(a)}`)}getRelationships(a){return this.request(`/player/${a}/relationships`)}interactPlayer(a,t,p,o){return this.request(`/player/${a}/interact`,{method:"POST",body:JSON.stringify({targetId:t,action:p,amount:o})})}addFriend(a,t){return this.request(`/player/${a}/add-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}acceptFriend(a,t){return this.request(`/player/${a}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}rejectFriend(a,t){return this.request(`/player/${a}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}removeFriend(a,t){return this.request(`/player/${a}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}addEnemy(a,t){return this.request(`/player/${a}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}removeEnemy(a,t){return this.request(`/player/${a}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}getGlobalChat(a=0){return this.request(`/chat/global?afterId=${a}`)}getPrivateChat(a,t,p=0){return this.request(`/chat/private/${a}?with=${t}&afterId=${p}`)}getChatFriends(a){return this.request(`/chat/friends/${a}`)}sendChat(a,t,p,o){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:a,channel:t,receiverId:p,message:o})})}getMarketListings(a="",t="newest"){const p=new URLSearchParams;return a&&p.set("type",a),t&&p.set("sort",t),this.request(`/market?${p.toString()}`)}getMyListings(a){return this.request(`/market/my/${a}`)}listForSale(a,t,p,o,k){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:a,itemType:t,itemId:p,quantity:o,price:k})})}buyFromMarket(a,t,p=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:a,listingId:t,quantity:p})})}cancelListing(a,t){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:a,listingId:t})})}getRealmInfo(a){return this.request(`/player/${a}/realm`)}attemptBreakthrough(a){return this.request(`/player/${a}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(a){return this.request(`/player/${a}/mug-targets`)}mugPlayer(a,t){return this.request(`/player/${a}/mug`,{method:"POST",body:JSON.stringify({victimId:t})})}getMugLog(a){return this.request(`/player/${a}/mug-log`)}getMapItems(a){return this.request(`/player/${a}/map-items`)}enterDungeon(a,t){return this.request(`/player/${a}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:t})})}fightDungeonWave(a){return this.request(`/player/${a}/dungeon/fight`,{method:"POST"})}abandonDungeon(a){return this.request(`/player/${a}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(a){return this.request(`/player/${a}/dungeon/history`)}getHousing(a){return this.request(`/player/${a}/housing`)}buyHousing(a){return this.request(`/player/${a}/housing/buy`,{method:"POST"})}plantHerb(a,t,p){return this.request(`/player/${a}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:t,slotIndex:p})})}harvestGarden(a){return this.request(`/player/${a}/housing/harvest`,{method:"POST"})}upgradeFormation(a,t){return this.request(`/player/${a}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:t})})}payMaintenance(a){return this.request(`/player/${a}/housing/maintenance`,{method:"POST"})}listForRent(a,t){return this.request(`/player/${a}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:t})})}getRentals(){return this.request("/housing/rentals")}rentRoom(a,t){return this.request(`/player/${a}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:t})})}getMyGuild(a){return this.request(`/player/${a}/guild`)}createGuild(a,t,p,o){return this.request(`/player/${a}/guild/create`,{method:"POST",body:JSON.stringify({name:t,tag:p,description:o})})}contributeGuild(a,t){return this.request(`/player/${a}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:t})})}upgradeGuild(a){return this.request(`/player/${a}/guild/upgrade`,{method:"POST"})}joinGuild(a,t){return this.request(`/player/${a}/guild/join`,{method:"POST",body:JSON.stringify({guildId:t})})}leaveGuild(a){return this.request(`/player/${a}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(a){return this.request(`/guild/${a}/upkeep`,{method:"POST"})}getTribulation(a){return this.request(`/player/${a}/tribulation`)}fightTribulation(a){return this.request(`/player/${a}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(a,t,p,o=-1){return this.request(`/player/${a}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:p,lockAffixIndex:o})})}getShops(a){return this.request("/shops")}buyFromShop(a,t,p,o=1){return this.request(`/player/${a}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:t,itemId:p,quantity:o})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(a){return this.request(`/players/lookup?q=${encodeURIComponent(a)}`)}getPlayerProfile(a){return this.request(`/player/${a}/profile`)}getArena(a){return this.request(`/player/${a}/arena`)}arenaFight(a){return this.request(`/player/${a}/arena/fight`,{method:"POST"})}getAuctions(a=""){return this.request(`/auction${a?"?q="+encodeURIComponent(a):""}`)}getMyAuctions(a){return this.request(`/player/${a}/auction/mine`)}listAuction(a,t,p,o=24){return this.request(`/player/${a}/auction/list`,{method:"POST",body:JSON.stringify({itemId:t,buyoutPrice:p,durationHours:o})})}buyAuction(a,t){return this.request(`/player/${a}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:t})})}cancelAuction(a,t){return this.request(`/player/${a}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:t})})}getDailyQuests(a){return this.request(`/player/${a}/daily-quests`)}claimDailyQuest(a,t){return this.request(`/player/${a}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:t})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(a){return this.request(`/player/${a}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(a){return this.request(`/player/${a}/gacha/pity`)}gachaPull(a,t,p=1){return this.request(`/player/${a}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:t,pulls:p})})}getLeaderboard(a){return this.request(`/leaderboard/${a}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(a){return this.request(`/events/quick/${a}`,{method:"POST"})}}const q=new lt;function ot(s,a){var g;const{state:t,api:p,notify:o,renderGame:k,updateSidebar:u}=a,d=t.player,b=t.exploration?t.exploration[d.currentArea||"thanh_lam_tran"]:null,f=b?b.name:"Vùng Đất Vô Danh",v=b?b.staminaCost:10;s.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${f}</h1>
      <div class="text-dim text-sm">Nơi cất giấu nhiều cơ duyên và hiểm nguy.</div>
    </div>

    <!-- KHÁM PHÁ -->
    <div class="panel" style="border-color: rgba(208, 165, 48, 0.4); box-shadow: 0 4px 15px rgba(208, 165, 48, 0.1);">
      <div class="panel-body text-center" style="padding: 24px 16px;">
        <h2 class="text-lg text-gold mb-sm">Dò Thám Xung Quanh</h2>
        <p class="text-dim mb-md">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
        <button class="btn btn--gold btn--lg" id="btnExplore" style="width: 100%; max-width: 300px; margin: 0 auto; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <span>🔍 Tìm Kiếm</span>
          <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${v} Thể Lực</span>
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
    </div>`;const h=((g=d.insightLevels)==null?void 0:g.monster)??0;(async()=>{try{const e=await p.getAreaMonsters(d.id);if(e.monsters){t.player.trackedMonsters=e.monsters;const i=document.getElementById("trackedMonstersList");if(!i)return;if(e.monsters.length===0){i.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}i.innerHTML=e.monsters.map(l=>{var P,M,I,N,R;const n=l.currentHp/l.stats.hp*100,x=n>60?"var(--green)":n>30?"var(--orange)":"var(--red)";let $='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';h>=1&&($=`<div class="item-desc text-sm text-dim mb-sm">${l.description||"Yêu thú vùng này."}</div>`);let T="";h>=1&&(T=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${n}%; background: ${x}; height: 100%;"></div>
            </div>`);let w=h>=2?`❤ ${l.currentHp}/${l.stats.hp}`:h>=1?"❤ ???":"",L="";h>=3&&(L=`
              <span class="text-orange">💪 ${l.stats.strength}</span>
              <span class="text-cyan">🏃 ${l.stats.speed}</span>
              <span class="text-green">🎯 ${l.stats.dexterity}</span>
              <span class="text-blue">🛡 ${l.stats.defense}</span>`);let C="";h>=4&&l.drops&&l.drops.length>0&&(C=`<div class="text-xs text-dim mt-sm" style="display:flex;gap:4px;flex-wrap:wrap;">
              📦 ${l.drops.map(B=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:9px;padding:1px 4px;">${B.id} (${h>=5?B.chance+"%":"?%"})</span>`).join("")}
            </div>`);let S="";if(h>=5){const B=((P=l.goldReward)==null?void 0:P[0])??((M=l.goldReward)==null?void 0:M.min)??"?",_=((I=l.goldReward)==null?void 0:I[1])??((N=l.goldReward)==null?void 0:N.max)??"?";S=`<span class="text-gold">💰 ${B}-${_}</span> <span class="text-purple">✨ ${l.xpReward??"?"} XP</span>`}return`
            <div class="list-item flex flex-col items-start gap-4">
              <div class="item-info" style="width: 100%;">
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-name text-lg">${l.name} <span class="text-xs text-dim">(${((R=l.instance_id)==null?void 0:R.substring(0,8))??""})</span></div>
                  <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${l.instance_id}" data-mid="${l.id}">Giao Chiến</button>
                </div>
                ${$}
                ${T}
                <div class="item-meta flex gap-4 text-xs flex-wrap">
                  ${w?`<span class="text-red">${w}</span>`:""}
                  ${L}
                  ${S}
                </div>
                ${C}
              </div>
            </div>`}).join(""),i.querySelectorAll(".btn-attack-tracked").forEach(l=>{l.addEventListener("click",n=>{const x=n.currentTarget;W(a,x.dataset.mid,x.dataset.inst)})})}}catch(e){console.error("Lỗi tải dấu vết:",e)}})(),(async()=>{const e=document.getElementById("areaMonstersList");if(e)try{const i=await p.getAreaMonsters(d.id),r=t.exploration?t.exploration[d.currentArea||"thanh_lam_tran"]:null,l=(t.monsters||[]).filter(x=>!x.isWorldBoss&&!x.is_world_boss),n=l.length>0?l:[];if(n.length===0){e.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không rõ quần thể yêu thú nơi đây.</div>';return}e.innerHTML=n.map(x=>{let $='<div class="item-desc text-sm text-dim mb-sm">Thông tin mờ ảo...</div>';return h>=1&&($=`<div class="item-desc text-sm text-dim mb-sm">${x.description||"Yêu thú sinh sống tại vùng này."}</div>`),`
          <div class="list-item flex flex-col items-start gap-4" style="opacity: 0.8;">
            <div class="item-info" style="width: 100%;">
              <div class="item-name text-md text-gold">${x.name} <span class="text-xs text-dim ml-sm">${x.tierName||""}</span></div>
              ${$}
            </div>
          </div>
        `}).join("")}catch(i){console.error("Lỗi tải quần thể:",i)}})();const m=document.getElementById("btnExplore");m&&m.addEventListener("click",()=>ct(a)),s.querySelectorAll(".list-item.clickable").forEach(e=>{e.addEventListener("click",()=>startCombat(e.dataset.mid,a))})}async function ct(s){var u,d,b;const{state:a,api:t,notify:p,updateSidebar:o}=s,k=document.getElementById("exploreResult");if(k){k.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const f=await t.explore(a.playerId);a.player=f.player,o();const v=f.event;let h=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(v.type==="monster")h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${v.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${v.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${v.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(v.type==="monster_ambush"&&v.combatResult){const c=v.combatResult,y=(c.log||[]).map(e=>e.startsWith("---")?`<div class="turn">${e}</div>`:e.includes("hụt")?`<div class="miss">${e}</div>`:e.includes("CHÍNH MẠNG")||e.includes("💥")?`<div class="crit">${e}</div>`:e.includes("ngã xuống")||e.includes("💀")?`<div class="death">${e}</div>`:e.includes("Chiến thắng")||e.includes("🏆")?`<div class="victory">${e}</div>`:`<div class="hit">${e}</div>`).join(""),m=c.outcome==="win"?"🏆 Chiến thắng!":c.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",g=c.outcome==="win"?"var(--green)":c.outcome==="loss"?"var(--red)":"var(--orange)";h+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${v.message}</div>
        <div style="font-size:16px;font-weight:700;color:${g};margin-bottom:12px">${m}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${y}</div>
      `}else if(v.type==="worldBoss")h+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${v.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ mạnh!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${v.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${v.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(v.type==="npc"&&v.npcId){if(h+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${v.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
        <div class="text-sm text-dim mb-md" style="font-style:italic;">"${v.greeting}"</div>
      `,v.studyEffect){const c=v.studyEffect,y=c.isDebuff?"var(--red)":"var(--gold)";h+=`<div class="text-sm mt-sm" style="color:${y};animation:fadeIn 0.5s;">
          ${c.message}
        </div>`}v.hasQuests&&(h+=`<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${v.npcId}">💬 Nói Chuyện</button>`),h+='<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>',h+="</div></div>",h+='<div id="npcQuestModal"></div>'}else v.type==="player_encounter"&&v.player?h+=`
        <div style="font-size: 48px; margin-bottom: 8px;">👤</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
        <div class="text-sm text-dim mb-md">Âm thầm lướt qua hay chủ động giao hảo?</div>
        <div class="flex gap-2 justify-center mt-md w-full" style="flex-wrap:wrap">
          <button class="btn btn--blue flex-1" id="btnInteractFriend" data-pid="${v.player.id}">🤝 Kết Giao</button>
          <button class="btn btn--gold flex-1" id="btnInteractGift" data-pid="${v.player.id}">💎 Tặng 100 LT</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${v.player.id}">⚔️ Cướp Linh Thạch</button>
        </div>
      `:v.type==="npc"?h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">👴</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
      `:v.type==="material"||v.type==="item"?(h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
        <div class="text-lg text-green bold mb-sm">${v.message}</div>
      `,v.questNotifications&&v.questNotifications.length>0&&v.questNotifications.forEach(c=>{h+=`<div class="text-sm text-gold mt-sm" style="animation: fadeIn 0.5s;">🏷️ ${c.message}</div>`})):h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${v.message}</div>
      `;v.type!=="monster"&&v.type!=="worldBoss"&&!(v.type==="npc"&&v.npcId)&&(h+='<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục hành trình</button>'),v.type==="npc"&&v.npcId||(h+="</div></div>"),k.innerHTML=h,v.type==="player_encounter"&&v.player&&(document.getElementById("btnInteractFriend").addEventListener("click",async c=>{try{const y=await t.addFriend(a.playerId,c.target.dataset.pid);(y.success||y.message)&&p(y.message||"Đã gửi lời mời!","success")}catch(y){p(y.message,"error")}}),document.getElementById("btnInteractGift").addEventListener("click",async c=>{var y;try{const m=await t.interactPlayer(a.playerId,c.target.dataset.pid,"gift",100);if(m.player){a.player=m.player,o(),p(m.message,"success");const g=c.target.closest(".panel-body");g&&(g.innerHTML='<div class="text-green text-lg mb-md">Đã bồi đắp hảo cảm!</div><button class="btn btn--blue" id="btnExploreContinueAfterGift">Rời đi</button>'),(y=document.getElementById("btnExploreContinueAfterGift"))==null||y.addEventListener("click",()=>{k.innerHTML=""})}}catch(m){p(m.message,"error")}}),(u=document.getElementById("btnInteractMug"))==null||u.addEventListener("click",async c=>{var m;const y=c.target.dataset.pid;c.target.disabled=!0,c.target.textContent="⏳ Đang tấn công...";try{const g=await t.request(`/player/${a.playerId}/mug`,{method:"POST",body:JSON.stringify({victimId:y})});a.player=g.player,o();const e=c.target.closest(".panel-body");if(e){const i=g.success?"var(--green)":"var(--red)",r=g.success?"💰":"💀";e.innerHTML=`
              <div style="font-size:36px;margin-bottom:8px">${r}</div>
              <div style="color:${i};font-size:16px;font-weight:700;margin-bottom:8px">${g.message}</div>
              ${g.goldStolen>0?`<div class="text-gold">+${g.goldStolen} 💎 Linh Thạch</div>`:""}
              <div style="font-size:11px;opacity:0.5;margin-top:8px">Tỉ lệ: ${g.successChance}%</div>
              <button class="btn btn--blue mt-md" id="btnExploreContinueAfterMug">Tiếp tục</button>
            `,(m=document.getElementById("btnExploreContinueAfterMug"))==null||m.addEventListener("click",()=>{k.innerHTML=""})}p(g.message,g.success?"success":"error")}catch(g){p(g.message,"error"),c.target.disabled=!1,c.target.textContent="⚔️ Cướp Linh Thạch"}})),(v.type==="monster"||v.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",c=>{k.innerHTML="",W(s,c.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async c=>{try{const y=await t.trackMonster(a.playerId,c.target.dataset.mid);y.success?(p(y.message,"success"),k.innerHTML="",typeof s.renderGame=="function"&&s.renderGame()):y.error&&p(y.error,"error")}catch(y){p("Lỗi theo dõi: "+y.message,"error")}})),v.type==="npc"&&v.npcId&&((d=document.getElementById("btnNpcInteract"))==null||d.addEventListener("click",async()=>{await pt(s,v.npcId,k)})),(b=document.getElementById("btnExploreContinue"))==null||b.addEventListener("click",()=>{k.innerHTML=""})}catch(f){k.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${f.message}</div></div>`}}}async function pt(s,a,t){const{state:p,api:o,notify:k,renderGame:u}=s,d=document.getElementById("npcQuestModal")||t;try{const f=(await o.getNpc(a)).npc;if(!f)return;const v=(p.player.activeQuests||[]).map(c=>c.quest_id);let h=f.quests.map(c=>{const y=v.includes(c.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${c.name}</span>
            <span class="text-xs badge" style="background:${c.type==="kill"?"var(--red)":"var(--green)"}">${c.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${c.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${c.rewards.gold?c.rewards.gold+"💎 ":""}${c.rewards.xp?c.rewards.xp+"✨ ":""}${c.rewards.skillChance?"🎯 "+c.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${y?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${a}" data-qid="${c.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");d.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${f.icon||"🧓"} ${f.name} <span class="subtitle">${f.profession}</span></div>
        <div class="panel-body">
          ${h||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,d.querySelectorAll(".btn-accept-quest").forEach(c=>{c.addEventListener("click",async()=>{c.disabled=!0,c.textContent="⏳...";try{const y=await o.acceptQuest(p.playerId,c.dataset.npc,c.dataset.qid);p.player=y.player,k(y.message,"success"),u()}catch(y){k(y.message||"Lỗi nhận quest","error"),c.disabled=!1,c.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(b){console.error("NPC load error:",b)}}async function W(s,a,t=null){var f;const{state:p,api:o,notify:k,updateSidebar:u,renderGame:d}=s,b=document.getElementById("combatResult");if(b){if(!p.player.currentHp||p.player.currentHp<=0)return k("Đã kiệt sức! Hãy hồi phục trước.","error");if((p.player.currentEnergy||0)<10&&!p.player.currentEnergy)return k("Không đủ Linh lực!","error");if(p.player.hospitalRemaining>0)return k(`Đang tịnh dưỡng! Còn ${p.player.hospitalRemaining}s`,"error");b.innerHTML='<div class="panel border-red bg-dark"><div class="panel-body text-center text-red">⚔️ Đang giao chiến...</div></div>',b.scrollIntoView({behavior:"smooth"});try{const v=await o.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:p.playerId,monsterId:t?null:a,trackedMonsterId:t})});if(p.player=v.player,v.outcome==="no_energy"){b.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${v.log[0]}</div></div>`,u();return}const h=v.log.map(l=>l.startsWith("---")?`<div class="turn">${l}</div>`:l.includes("linh lực")&&l.includes("+")?`<div class="energy">${l}</div>`:l.includes("linh lực")?`<div class="energy-cost">${l}</div>`:l.includes("kiệt linh")?`<div class="miss">${l}</div>`:l.includes("hụt")?`<div class="miss">${l}</div>`:l.includes("né được")?`<div class="dodge">${l}</div>`:l.includes("CHÍNH MẠNG")||l.includes("💥")?`<div class="crit">${l}</div>`:l.includes("🔥")?`<div class="heavy text-orange">${l}</div>`:l.includes("chặn hoàn toàn")||l.includes("🛡")?`<div class="dodge">${l}</div>`:l.includes("ngã xuống")||l.includes("💀")?`<div class="death">${l}</div>`:l.includes("Chiến thắng")||l.includes("🏆")?`<div class="victory">${l}</div>`:l.includes("Đột phá")||l.includes("🎉")?`<div class="levelup">${l}</div>`:l.includes("bỏ chạy")||l.includes("🏃")?`<div class="flee">${l}</div>`:l.includes("Hết")||l.includes("⏰")?`<div class="stalemate">${l}</div>`:l.includes("Bất phân")||l.includes("🤝")?`<div class="stalemate">${l}</div>`:l.includes("Thoát thân")||l.includes("🚪")?`<div class="flee">${l}</div>`:l.includes("Linh Thạch")||l.includes("💰")?`<div class="gold-reward">${l}</div>`:l.includes("Tịnh dưỡng")||l.includes("🏥")?`<div class="hospital">${l}</div>`:l.includes("🧪")?`<div class="status-effect text-purple">${l}</div>`:l.includes("💔")?`<div class="dot-damage text-purple bold">${l}</div>`:l.includes("✨")?`<div class="regen text-green">${l}</div>`:l.includes("♻️")?`<div class="reflect text-red">${l}</div>`:`<div class="hit">${l}</div>`).join(""),c=v.monster,y=Math.max(0,p.player.currentHp/p.player.maxHp*100),m=Math.max(0,c.currentHp/c.maxHp*100),g={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Thất bại",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},e=g[v.outcome]||g.loss,i=(f=v.rewards)!=null&&f.gold?` · +${v.rewards.gold} 💰`:"",r=v.rewards?` · +${v.rewards.xp} XP${i}`:"";b.innerHTML=`
      <div class="panel">
        <div class="panel-title">${e.icon} ${e.text}
          <span class="subtitle">${v.turns}/${v.maxTurns||25} lượt${r}</span>
        </div>
        <div class="panel-body combat-result ${e.cls}">
          <div class="combat-opponents">
            <div class="fighter">
              <div class="f-name player-name">${p.player.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${y}%"></div></div>
              <div class="mini-hp-val">${p.player.currentHp}/${p.player.maxHp}</div>
            </div>
            <div class="vs">VS</div>
            <div class="fighter">
              <div class="f-name monster-name">${c.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${m}%"></div></div>
              <div class="mini-hp-val">${c.currentHp}/${c.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${h}</div>
      </div>`,u(),t&&typeof d=="function"&&setTimeout(()=>d(),1500)}catch(v){b.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${v.message}</div></div>`}}}function X(s,a){const{state:t,api:p,notify:o}=a,k=t.player,u=(k.skills||[]).find(h=>(typeof h=="string"?h:h.id)==="nhan_thuat"),d=u?u.level||1:0,b=[...t.skills].sort((h,c)=>(h.tier||1)-(c.tier||1)),f=(k.skills||[]).map(h=>typeof h=="string"?h:h.id),v={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};s.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${d}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${b.map(h=>{const c=f.includes(h.id),y=h.tier||1,m=y>d+1,g=y<=d;let e="";return h.requirements&&h.requirements.length>0?g||c?e=`<div class="mt-sm text-xs text-orange">Điều kiện: ${h.requirements.map(i=>`<br>• ${i}`).join("")}</div>`:m?e=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${y}.</div>`:e='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':e='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${c?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${h.name} ${c?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${c?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${v[y]||y}</span>
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
                
                ${e}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${c?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${m?"btn--dark":"btn--gold"} btn--sm btn-learn" ${m?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${h.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,s.querySelectorAll(".accordion-header").forEach(h=>{h.addEventListener("click",()=>{const c=h.nextElementSibling;c.style.display==="none"?(c.style.display="block",h.querySelector("div:last-child").textContent="▲"):(c.style.display="none",h.querySelector("div:last-child").textContent="▼")})}),s.querySelectorAll(".btn-learn").forEach(h=>{h.addEventListener("click",async c=>{c.stopPropagation();try{const y=await p.learnSkill(k.id,h.dataset.sid);y.error?o(y.error,"error"):(t.player=y.player,o(y.message,"success"),X(s,a))}catch(y){o("Lỗi học kỹ năng: "+y.message,"error")}})})}function gt(s,a){var y,m,g;const{state:t,api:p,notify:o,renderGame:k}=a,u=t.player,d=u.stats,b=u.allocatedStats||{},f=5,v=u.currentEnergy>=f&&!u.hospitalRemaining,h=u.talentDisplay||{},c=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];s.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${u.currentEnergy}/${u.maxEnergy} linh lực · Chi phí: ${f}/lần</span>
      </div>
    </div>

    ${u.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${u.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${((y=u.realmInfo)==null?void 0:y.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(m=u.realmInfo)!=null&&m.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${c.map(([e,i,r])=>{const l=h[e]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${l.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${i}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${r}</div>
                <div style="font-size:14px;font-weight:700;color:${l.color};margin-top:4px">${l.icon} ${l.name}</div>
                <div style="font-size:11px;color:${l.color};opacity:0.8">×${l.value} hệ số</div>
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
        ${c.map(([e,i,r,l])=>{const n=h[e]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},x=Math.floor(u.currentEnergy/f)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${i}</span> ${r}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${l}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${d[e]??0}</span>
              ${b[e]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${b[e]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${n.color};min-width:50px" title="Căn Cốt: ${n.name} (×${n.value})">${n.icon}×${n.value}</span>
              <input type="number" class="train-count" data-stat="${e}" min="1" max="${x}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${v?"":"disabled"}>
              <button class="btn btn--sm ${v?"btn--blue":"btn--dark"} train-btn" data-train="${e}" ${v?"":"disabled"} title="Tốn ${f} Linh lực/lần · Căn cốt ×${n.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${f} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(u.currentEnergy/f)}</strong> lần hiện tại.
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
    </div>`,(g=s.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",async()=>{try{const e=s.querySelector(".btn-breakthrough");e.disabled=!0,e.innerHTML="Đang Độ Kiếp...";const i=await p.attemptBreakthrough(t.playerId);t.player=i.player,o(i.message,"success"),k()}catch(e){o(e.message||"Đột phá thất bại","error");const i=s.querySelector(".btn-breakthrough");i&&(i.disabled=!1,i.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),s.querySelectorAll(".train-btn").forEach(e=>{e.addEventListener("click",async i=>{i.stopPropagation();const r=s.querySelector(`.train-count[data-stat="${e.dataset.train}"]`),l=parseInt(r==null?void 0:r.value)||1;try{const n=await p.trainStat(t.playerId,e.dataset.train,l);t.player=n.player,o(n.message,"success"),k()}catch(n){o(n.message||"Lỗi rèn luyện","error")}})})}function ut(s,a){const{state:t,api:p,notify:o}=a,k=t.player.skills||[],u=k.map(h=>typeof h=="string"?h:h.id),d=t.skills||[],b={combat:{icon:"⚔️",name:"Chiến Đấu",desc:"Chiêu thức sử dụng trong giao đấu"},life:{icon:"🛠️",name:"Sinh Hoạt",desc:"Thu thập, chế tạo, sinh tồn"},internal:{icon:"🧘",name:"Nội Công",desc:"Công pháp thụ động tăng cường bản thân"}};let f=localStorage.getItem("skillsTab")||"combat";const v=()=>{const h=k.map(e=>{const i=typeof e=="string"?e:e.id;return{...d.find(l=>l.id===i)||{name:i,id:i,category:"combat"},level:e.level||1,xp:e.xp||e.currentXp||0,equipped:e.equipped||e.isEquipped||!1}}),c=h.filter(e=>(e.category||"combat")===f),y=d.filter(e=>(e.category||"combat")===f&&!u.includes(e.id)),m=Object.entries(b).map(([e,i])=>{const r=h.filter(l=>(l.category||"combat")===e).length;return`<button class="skill-tab ${e===f?"active":""}" data-tab="${e}">
        ${i.icon} ${i.name} <span class="skill-tab-count">${r}</span>
      </button>`}).join(""),g=(e,i)=>{const r=e.level*100,l=Math.min(100,e.xp/r*100),n=e.type==="passive",x="★".repeat(Math.min(e.tier||1,7)),$=(e.tier||1)>=5?"var(--gold)":(e.tier||1)>=3?"var(--purple)":"var(--blue)";let T="";return i?n?T='<span style="font-size:10px;color:var(--green)">🔮 Vĩnh Viễn</span>':e.equipped?T=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${e.id}">Tháo</button>`:T=`<button class="btn btn--sm btn--blue equip-btn" data-eq="1" data-sid="${e.id}">Trang Bị</button>`:T='<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>',`
        <div class="skill-card ${i?"":"locked"} ${e.equipped&&!n?"equipped":""}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name">${e.name}</div>
              <div class="skill-card-tier" style="color:${$}">${x} Tầng ${e.tier||1}</div>
            </div>
            <div class="skill-card-action">${T}</div>
          </div>
          <div class="skill-card-desc">${e.description||""}</div>
          ${i?`
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${e.level}</span>
                <span class="text-dim">${e.xp}/${r}</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${l}%"></div></div>
              ${e.masteryBonus?`<div class="skill-mastery-bonus">✨ ${e.masteryBonus}</div>`:""}
            </div>
          `:`
            <div class="skill-card-req">
              ${(e.requirements||[]).map(w=>`<span class="req-tag">🔒 ${w}</span>`).join(" ")}
            </div>
          `}
          ${e.cost?`<div class="skill-card-cost">🔵 ${e.cost} Linh Lực</div>`:""}
        </div>
      `};s.innerHTML=`
      <div class="page-header">
        <h1>⚡ Kỹ Năng</h1>
        <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
      </div>

      <div class="skill-tabs">${m}</div>

      <div class="panel">
        <div class="panel-title">
          ${b[f].icon} ${b[f].name}
          <span class="subtitle">${b[f].desc}</span>
        </div>
        <div class="panel-body">
          ${c.length===0&&y.length===0?'<div class="text-dim">Chưa có kỹ năng nào trong nhánh này.</div>':""}
          
          ${c.length>0?`
            <div class="skill-grid">
              ${c.map(e=>g(e,!0)).join("")}
            </div>
          `:""}

          ${y.length>0?`
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
              <div class="text-dim text-sm" style="margin-bottom:8px">🔒 Chưa lĩnh ngộ (${y.length})</div>
              <div class="skill-grid">
                ${y.map(e=>g({...e,level:0,xp:0},!1)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,s.querySelectorAll(".skill-tab").forEach(e=>{e.addEventListener("click",()=>{f=e.dataset.tab,localStorage.setItem("skillsTab",f),v()})}),s.querySelectorAll(".equip-btn").forEach(e=>{e.addEventListener("click",async()=>{try{const i=e.dataset.sid,r=e.dataset.eq==="1",l=await p.equipSkill(t.playerId,i,r);t.player=l.player,o(l.message,"success"),v()}catch(i){o(i.message||"Lỗi trang bị","error")}})})};v()}function vt(s,a){return a==="manual"?"📜":s==="weapon"?"⚔️":s==="body"?"🥋":s==="shield"?"🛡️":s==="feet"?"👢":s==="ring"?"💍":"📦"}function Q(s,a){let t="",p="";if(s.slot==="weapon"){let b=0,f=0;(s.affixes||[]).forEach(v=>{v.stat==="strength"&&v.type==="flat"&&(b+=v.value),v.stat==="dexterity"&&v.type==="flat"&&(f+=v.value)}),b===0&&(b=s.itemLevel*2+5),f===0&&(f=s.itemLevel+10),t=`⚔️ ${b}`,p=`🎯 ${f}`}else if(s.slot==="body"||s.slot==="shield"||s.slot==="feet"){let b=0;(s.affixes||[]).forEach(f=>{f.stat==="defense"&&f.type==="flat"&&(b+=f.value)}),b===0&&(b=s.itemLevel*3),t=`🛡️ ${b}`}else if(s.slot==="ring"){let b=0;(s.affixes||[]).forEach(f=>{f.stat==="capacity"&&(b+=f.value)}),t=b>0?`🎒 +${b}`:""}const o=(s.affixes||[]).map(b=>mt(b)).map(b=>`<span class="badge badge-dim">${b}</span>`).join(" "),k=s.description||`Một vật phẩm loại ${s.slot} cấp ${s.itemLevel} thuộc phẩm chất ${s.rarity}. Khí tức tỏa ra không tồi.`,u=s.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${s.craftedBy}</strong></div>`:"",d=a?s.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${s.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${s.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${s.rarity}"></span>
          <span class="item-name rarity-${s.rarity}" style="font-size:14px">${s.name}</span>
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${t?`<span style="color:var(--text-light)">${t}</span>`:""}
          ${p?`<span style="color:var(--text-light)">${p}</span>`:""}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05)">
        <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
          ${vt(s.slot,s.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${s.name}</strong> là loại ${s.baseType}. ${k}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${s.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${s.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${o||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${u}
          <div class="mt-2 flex justify-end">
            ${d}
          </div>
        </div>
      </div>
    </div>`}function mt(s){const t={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[s.stat]||s.stat,p=s.value>=0?"+":"";return s.type==="flat"?`${p}${s.value} ${t}`:s.type==="increase"?`${p}${s.value}% ${t}`:s.type==="more"?`×${p}${s.value}% ${t}`:`${p}${s.value} ${t}`}function K(s,a){var i,r,l,n,x,$,T;const{state:t,api:p,notify:o,renderGame:k}=a,u=Object.values(t.player.equipment||{}),d=t.player,b=t.medicines||[],f=d.medCooldownRemaining||0,v=t.inventoryTab||"equipped",h=d.skills&&d.skills.some(w=>{const L=typeof w=="string"?w:w.id;return L==="duoc_ly"||L==="y_thuat"}),c=u.find(w=>w.slot==="ring1"),y=u.find(w=>w.slot==="ring2");let m=20;((c==null?void 0:c.id)==="tui_tru_vat"||(i=c==null?void 0:c.baseType)!=null&&i.includes("tru_vat"))&&(m+=((l=(r=c.affixes)==null?void 0:r[0])==null?void 0:l.value)||10),((y==null?void 0:y.id)==="tui_tru_vat"||(n=y==null?void 0:y.baseType)!=null&&n.includes("tru_vat"))&&(m+=(($=(x=y.affixes)==null?void 0:x[0])==null?void 0:$.value)||10),s.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(d.inventory||[]).length} / ${m})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${v==="equipped"?"btn--blue":"btn--dark"}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${v==="weapon"?"btn--blue":"btn--dark"}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${v==="armor"?"btn--blue":"btn--dark"}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${v==="accessory"?"btn--blue":"btn--dark"}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${v==="manual"?"btn--blue":"btn--dark"}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${v==="medicine"?"btn--blue":"btn--dark"}" data-tab="medicine">
          Đan Dược ${f>0?`<span style="color:var(--orange); font-size:11px">(${f}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),e=()=>{g.querySelectorAll("[data-eid]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const C=await p.equipItem(t.playerId,w.dataset.eid);t.player=C.player,o(C.message,"success"),k()}catch(C){o(C.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const C=await p.useItem(t.playerId,w.dataset.use);t.player=C.player,o(C.message,"success"),k()}catch(C){o(C.message||"Lỗi sử dụng","error")}})})};if(v==="equipped"){const w=d.equipment||{},L=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${L.map(C=>{const S=w[C.key],P=S&&S.id,M=P?`rarity-${S.rarity}`:"";return`
            <div style="background:${P?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${P?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${C.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${C.name}</div>
              ${P?`<div style="font-size:11px;font-weight:600" class="${M}">${S.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${S.rarity}] Lv${S.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${u.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${u.filter(C=>C&&C.id).map(C=>Q(C,!1)).join("")}
      `:""}
    `,e()}else if(v==="medicine")g.innerHTML=`
      <div style="padding:12px">
        ${f>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${f}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${f/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${b.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':b.map(w=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${w.icon||"💊"} ${w.name}</div>
                <div class="item-meta">
                  ${w.description}
                  ${w.healPercent?` · Phục hồi ${w.healPercent}% HP`:""}
                  ${w.cooldownAdd?` · Sinh Đan độc ${w.cooldownAdd}s`:""}
                  ${w.duration?` · Hiệu lực ${w.duration} trận`:""}
                  ${w.toxicity&&h?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${w.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${w.penalty&&h?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${w.penalty.map(L=>`Giảm ${Math.abs(L.value)*100}% ${L.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${w.id}" 
                ${f+(w.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(w=>{w.addEventListener("click",async()=>{try{const L=await p.useMedicine(t.playerId,w.dataset.med);t.player=L.player,o(L.message,"success"),k()}catch(L){o(L.message||"Đan độc quá nồng!","error")}})});else{const w=d.inventory||[];let L=[];v==="weapon"?L=w.filter(C=>C.slot==="weapon"&&C.category!=="manual"):v==="armor"?L=w.filter(C=>["body","shield","feet"].includes(C.slot)):v==="accessory"?L=w.filter(C=>["ring","amulet","ring1","ring2"].includes(C.slot)):v==="manual"&&(L=w.filter(C=>C.category==="manual")),g.innerHTML=`
      ${L.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':L.map(C=>Q(C,!0)).join("")}
    `,e()}s.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{t.inventoryTab=w.dataset.tab,K(s,a)})}),(T=document.getElementById("btnGen"))==null||T.addEventListener("click",async()=>{const w=["common","rare","epic","legendary"];try{const L=await p.generateItem(t.playerId,w[Math.floor(Math.random()*w.length)]);t.player=L.player,t.items=L.items||[],o(L.message,"success"),K(s,a)}catch{o("Lỗi tạo ngẫu nhiên","error")}})}function yt(s,a){var l,n;const{state:t,api:p,notify:o,renderGame:k}=a,u=t.player,d=t.crimes||[];if((u.jailRemaining??0)>0){const x=u.jailRemaining,$=Math.max(10,100*Math.ceil(x/60)*u.level);s.innerHTML=`
      <div class="page-header"><h1>🏛 Thiên Lao</h1></div>
      <div class="panel">
        <div class="panel-title">Trạng thái</div>
        <div class="panel-body" style="text-align:center">
          <div style="font-size:28px;color:var(--red);font-weight:700">⛓ Bị giam giữ</div>
          <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${x}s</strong></div>
          <div style="margin-top:16px;display:flex;gap:12px;justify-content:center">
            <button class="btn btn--blue" id="btnEscape">🏃 Vượt ngục (3 Nghịch Khí)</button>
            <button class="btn btn--gold" id="btnBail">💰 Bảo lãnh (${$} Lính Thạch)</button>
          </div>
        </div>
      </div>`,(l=document.getElementById("btnEscape"))==null||l.addEventListener("click",async()=>{try{const T=await p.escapeJail(t.playerId);t.player=T.player,o(T.message,T.success?"success":"error"),k()}catch(T){o(T.message||"Lỗi","error")}}),(n=document.getElementById("btnBail"))==null||n.addEventListener("click",async()=>{try{const T=await p.bail(t.playerId);t.player=T.player,o(T.message,T.success?"success":"error"),k()}catch(T){o(T.message||"Lỗi","error")}});return}const f={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},v={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},h=d.reduce((x,$)=>{const T=$.category||"theft";return x[T]||(x[T]=[]),x[T].push($),x},{}),c=Object.keys(f).map(x=>{const $=h[x];if(!$||$.length===0)return"";const T=f[x];return`
    <div class="panel mt-md" style="border-color: ${T.color}40;">
      <div class="panel-title" style="color: ${T.color};">${T.label} <span class="subtitle text-dim">${$.length} loại</span></div>
      <div class="panel-body no-pad">
        ${$.map(w=>{var I;const L=((I=u.crimeSkills)==null?void 0:I[w.id])??0,C=L<(w.minSkill??0),S=!C&&(u.nerve??0)>=w.nerveCost,P=w.special||[],M=Math.min(95,w.baseSuccessRate+L*.5);return`
            <div class="list-item crime-item ${C?"crime-locked":""}">
              <div class="item-info">
                <div class="item-name" style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:18px">${w.icon}</span>
                  <span>${w.name}</span>
                  ${C?'<span style="opacity:0.5">🔒</span>':""}
                </div>
                <div class="item-desc">${w.description}</div>
                <div class="item-meta" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  <span>⚡ ${w.nerveCost} Khí</span>
                  <span>💰 ${w.rewards.goldMin}-${w.rewards.goldMax}</span>
                  <span style="color:${M>=60?"var(--green)":M>=40?"var(--orange)":"var(--red)"}">🎯 ${Math.round(M)}%</span>
                  ${C?`<span style="color:var(--red)">Cần Skill ${w.minSkill}</span>`:`<span>📊 ${L}/100</span>`}
                </div>
                ${P.length>0?`
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${P.map(N=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${v[N]||N}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <button class="btn btn--sm ${S?"btn--red":""}" data-crime="${w.id}" ${S?"":"disabled"}>
                ${C?"🔒":"Thực hiện"}
              </button>
            </div>`}).join("")}
      </div>
    </div>`}).join(""),y=u.crimeExp||0,m=Math.floor(y/50),g=y%50,e=50,i=g/e*100,r=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${m}</strong>
          <span class="text-dim">${g} / ${e} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${i}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${e-g} EXP</strong> nữa để tăng giới hạn Nghịch Khí. (Giới hạn hiện tại: ${u.maxNerve||15})</div>
      </div>
    </div>
  `;s.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${u.nerve??0}/${u.maxNerve??15} Nghịch Khí · 💰 ${u.gold??0} Linh Thạch</span></div>
    </div>
    ${r}
    ${c}`,s.querySelectorAll("[data-crime]").forEach(x=>{x.addEventListener("click",async()=>{try{const $=await p.commitCrime(t.playerId,x.dataset.crime);t.player=$.player;const T=$.outcome==="success"?"success":$.outcome==="critical_fail"?"error":"info";o($.message,T),k()}catch($){o($.message||"Lỗi","error")}})})}function ht(s,a){var r;const{state:t,api:p,notify:o,renderGame:k}=a,u=t.player,d=t.educationTrees||[],b=u.unlockedNodes||[],f=u.studyingNode||"",v=f?f.split("|")[0]:"",h=u.studyEndsAt||0,c=Math.max(0,h-Math.floor(Date.now()/1e3)),y=u.treeProgress||{},m=u.skillProgress||{};let g=localStorage.getItem("eduActiveTree")||((r=d[0])==null?void 0:r.id),e=d.find(l=>l.id===g)||d[0];!e&&d.length>0&&(e=d[0]);const i=()=>{if(!e){s.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const l=d.map(S=>`
      <button class="edu-tab ${S.id===e.id?"active":""}" data-tab="${S.id}">
        <span class="edu-tab-icon">${S.icon}</span>
        <span class="edu-tab-name">${S.name}</span>
        <span class="edu-tab-badge">${y[S.id]||0}</span>
      </button>
    `).join("");let n="";if(v){let S=null,P=null;d.forEach(M=>{const I=M.nodes.find(N=>N.id===v);I&&(S=I,P=M)}),S&&(n=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${P.name}</div>
              <div class="text-gold text-lg bold">${S.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${c}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${c>0?"disabled":""}>
                ${c>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const x=y[e.id]||0;let $=null;for(const S of e.milestones||[])if(x<S.require){$=S;break}let T="";$?T=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${$.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${$.description}</div>
        </div>
      `:T='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const w=u.discoveredNodes||[],L=(e.nodes||[]).map(S=>{const P=b.includes(S.id),M=v===S.id,I=(S.prerequisites||[]).every(A=>b.includes(A)),N=e.nodes.some(A=>(A.prerequisites||[]).includes(S.id));if(!(w.includes(S.id)||P||!(S.prerequisites&&S.prerequisites.length>0))||P&&N)return"";let B="";M?B="studying":P?B="done":B="available";let _="";M?_='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':v?_='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':P?_=`<button class="btn btn--sm btn--gold btn-learn" data-node="${S.id}">Tiếp Tục Lãnh Ngộ (${S.duration}s)</button>`:I?_=`<button class="btn btn--sm btn--blue btn-learn" data-node="${S.id}">Bắt Đầu (${S.duration}s)</button>`:_='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const j=m[S.id]||{level:1,exp:0},rt=j.level*100;let U="";return P&&(U=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${j.level} | Độ hiểu thấu: ${j.exp}/${rt}</div>`),`
        <div class="edu-node ${B}">
          <div class="edu-node-info">
            <div class="edu-node-title">${S.name}</div>
            <div class="edu-node-desc">${S.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${S.bonusDescription}</div>
            ${U}
          </div>
          <div class="edu-node-action">
            ${_}
          </div>
        </div>
      `}).join("");s.innerHTML=`
      <div class="page-header">
        <h1>🧘 Công Pháp Tu Luyện</h1>
        <div class="text-dim text-sm mt-xs">Tu luyện công pháp, nâng cao thông thạo từng bước.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${l}</div>
          ${n}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${e.icon} ${e.name}</h2>
              <p class="text-dim mb-md">${e.description}</p>
              
              <h3 class="text-md mb-xs mt-md border-b pb-xs">🌟 Cảnh Giới Đột Phá</h3>
              <div class="edu-milestones-grid mb-lg">
                ${T||'<div class="text-dim text-sm">Nhánh này chưa có cảnh giới đặc biệt.</div>'}
              </div>

              <h3 class="text-md mb-xs border-b pb-xs">📖 Pháp Quyết</h3>
              <div class="edu-nodes-list">
                ${L||'<div class="text-dim text-sm">Chưa có pháp quyết.</div>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,s.querySelectorAll(".edu-tab").forEach(S=>{S.addEventListener("click",()=>{const P=S.dataset.tab;localStorage.setItem("eduActiveTree",P),g=P,e=d.find(M=>M.id===P)||d[0],i()})}),window.eduTimer&&clearInterval(window.eduTimer),v&&h>0&&(window.eduTimer=setInterval(()=>{const S=Math.floor(Date.now()/1e3);let P=Math.max(0,h-S);const M=document.getElementById("eduCounter");if(M&&(M.innerText=P+"s"),P<=0){clearInterval(window.eduTimer);const I=document.getElementById("btnCheckEdu");I&&(I.disabled=!1,I.innerHTML="✨ Đột Phá!")}},1e3));const C=s.querySelector("#btnCheckEdu");C&&C.addEventListener("click",async()=>{try{C.disabled=!0,C.innerHTML="Đang xử lý...";const S=await p.checkEducation(t.playerId);t.player=S.player,o(S.message,S.completed?"success":"info"),k()}catch(S){o(S.message||"Lỗi đột phá","error"),C.disabled=!1,C.innerHTML="Thử lại"}}),s.querySelectorAll(".btn-learn").forEach(S=>{S.addEventListener("click",async()=>{try{const P=S.dataset.node;S.disabled=!0,S.innerHTML="Chờ...";const M=await p.enrollNode(t.playerId,P,e.id);t.player=M.player,o(M.message,"success"),k()}catch(P){o(P.message||"Lỗi ghi danh","error"),S.disabled=!1,S.innerHTML="Bắt Đầu"}})})};i()}function Y(s,a){const{state:t,api:p,notify:o,updateSidebar:k,renderGame:u}=a,d=t.playerId;t._dungeon||(t._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const b=t._dungeon;async function f(){try{const[e,i]=await Promise.all([p.getMapItems(d),p.getDungeonHistory(d)]);b.mapItems=e.mapItems||[],b.activeRun=e.activeRun||null,b.history=i.history||[],b.loaded=!0,v()}catch(e){o(e.message||"Lỗi tải Bí Cảnh","error")}}function v(){s.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${b.activeRun?h():c()}

      ${b.lastResult?y():""}

      ${m()}
    `,g()}function h(){var l,n;const e=b.activeRun,i=e.currentWave===e.totalWaves,r=((e.currentWave-1)/e.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${e.dungeonName||e.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${r}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${e.currentWave}/${e.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((l=t.player)==null?void 0:l.hospitalRemaining)>0?"disabled":""}>
              ${i?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+e.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((n=t.player)==null?void 0:n.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function c(){return b.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${b.mapItems.map(e=>{const i=e.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${e.item.icon} ${e.item.name} <span style="opacity:0.5">x${e.quantity}</span></div>
                  ${i?`
                    <div class="item-meta">
                      ${i.name} · T${i.tier} · ${i.waves+1} tầng · Boss: ${i.bossName}
                    </div>
                  `:""}
                </div>
                ${i?`<button class="btn btn--sm btn--gold" data-enter="${e.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function y(){var l,n;const e=b.lastResult,i=e.result==="dungeon_complete"?"🏆":e.result==="wave_cleared"?"✅":"💀",r=e.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${r}">
        <div class="panel-title" style="color:${r}">${i} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${e.message}</div>
          ${(l=e.loot)!=null&&l.length?`
            <div style="margin-bottom:8px">
              ${e.loot.map(x=>`<div style="font-size:12px;color:var(--green)">🎁 ${x}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((n=e.combatLog)==null?void 0:n.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(e.combatLog||[]).map(x=>`<div>${x}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function m(){return b.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${b.history.map(e=>{const i=e.status==="completed"?"✅":e.status==="failed"?"❌":e.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${e.status==="completed"?"var(--green)":e.status==="failed"?"var(--red)":"var(--orange)"}">${i} ${e.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${e.wave}/${e.totalWaves} · ${new Date(e.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function g(){var e,i;document.querySelectorAll("[data-enter]").forEach(r=>{r.addEventListener("click",async()=>{const l=r.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){r.disabled=!0;try{const n=await p.enterDungeon(d,l);o(n.message,"success"),t.player=n.player,k(),b.activeRun=n.run,b.lastResult=null,await f()}catch(n){o(n.message,"error"),r.disabled=!1}}})}),(e=document.getElementById("btnFight"))==null||e.addEventListener("click",async()=>{const r=document.getElementById("btnFight");r.disabled=!0,r.textContent="⏳ Đang chiến đấu...";try{const l=await p.fightDungeonWave(d);t.player=l.player,k(),b.lastResult=l,l.result==="dungeon_complete"||l.result==="dungeon_failed"?b.activeRun=null:l.result==="wave_cleared"&&(b.activeRun.currentWave=l.nextWave),v()}catch(l){o(l.message,"error"),r.disabled=!1,r.textContent="⚔️ Chiến Đấu"}}),(i=document.getElementById("btnAbandon"))==null||i.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await p.abandonDungeon(d),o("Đã rời khỏi Bí Cảnh.","info"),b.activeRun=null,b.lastResult=null,await f()}catch(r){o(r.message,"error")}})}b.loaded?v():f()}function Z(s,a){const{state:t}=a,p=t._travelTab||"map";s.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Ngao Du</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên và chinh phục bí cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${p==="map"?"active":""}" data-tab="map" style="flex:1;padding:10px;border:none;background:${p==="map"?"rgba(255,255,255,0.08)":"transparent"};color:${p==="map"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${p==="map"?"700":"400"};border-bottom:2px solid ${p==="map"?"var(--gold)":"transparent"};transition:all 0.2s">
        🗺️ Bản Đồ
      </button>
      <button class="tab-btn ${p==="dungeon"?"active":""}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${p==="dungeon"?"rgba(255,255,255,0.08)":"transparent"};color:${p==="dungeon"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${p==="dungeon"?"700":"400"};border-bottom:2px solid ${p==="dungeon"?"var(--gold)":"transparent"};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
    </div>
    <div id="travelTabContent"></div>
  `,s.querySelectorAll(".tab-btn").forEach(k=>{k.addEventListener("click",()=>{t._travelTab=k.dataset.tab,Z(s,a)})});const o=s.querySelector("#travelTabContent");p==="map"?O(o,a):Y(o,a)}async function O(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a;s.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ...</div>';try{const[u,d]=await Promise.all([p.request("/data/areas"),p.request(`/player/${t.playerId}/area`)]),b=u.areas||[],f=d.area,v=d.player,h=d.traveling||!1,c=d.travelRemaining||0,y=d.travelDestination||"";d.message&&o(d.message,"success"),d.player&&(t.player=d.player,k());const m=t.exploration||{},g=m[(v==null?void 0:v.currentArea)||"thanh_lam_tran"],e=(f==null?void 0:f.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",i=(g==null?void 0:g.staminaCost)||10,r={hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận"},l=r[v==null?void 0:v.currentArea]||"",n=[...b].sort(($,T)=>($.sort_order||$.mapY||0)-(T.sort_order||T.mapY||0)),x=[...b].sort(($,T)=>($.mapY||0)-(T.mapY||0));if(s.innerHTML=`
      ${h?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.1)">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:32px; margin-bottom:12px; animation:bounce 1s infinite">🚶</div>
            <strong style="font-size:16px">Đang tiến về ${y}</strong>
            <div id="travelTimer" style="font-size:24px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 10px rgba(255,215,0,0.3)">⏳ ${c}s</div>
            <div class="bar-track" style="margin-top:12px; height:8px">
              <div class="bar-fill energy" id="travelBar" style="width:100%; background:var(--gold); transition: width 1s linear"></div>
            </div>
          </div>
        </div>
      `:`
        <div class="panel" style="border-color:rgba(100,200,100,0.3)">
          <div class="panel-body" style="padding: 14px 16px">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-dim mb-xs">📍 Vị trí hiện tại</div>
                <div class="text-lg text-green bold">${e}</div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${i}/lần</div>
              </div>
            </div>
            ${f!=null&&f.description?`<div class="text-sm text-dim" style="margin-top:6px">${f.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Lv.${(f==null?void 0:f.min_level)||1}+</span>
              ${l?`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">${l}</span>`:""}
            </div>
          </div>
        </div>
      `}

      <!-- 2D MAP VISUAL -->
      <div class="panel mt-md">
        <div class="panel-title">Thiên Địa Giới Đồ</div>
        <div class="panel-body no-pad" style="position:relative; width:100%; height:300px; background-color: #0f172a; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 20px 20px; overflow:hidden; border-radius:0 0 8px 8px">
          
          <svg style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:none">
            <path d="M 50% 85% L 50% 50% L 80% 55% L 85% 30% L 80% 15%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 85% L 35% 75% L 15% 45% L 30% 15% L 50% 5%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 50% L 30% 40% L 35% 75%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 80% 55% L 65% 70% L 50% 85%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 50% L 50% 20% L 50% 5%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 80% 15% L 70% 25% L 50% 20%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
          </svg>

          ${x.map($=>{const T=m[$.id],w=$.id===v.currentArea&&!h,L=v.level<($.min_level||1),C=(T==null?void 0:T.mapX)||50,S=(T==null?void 0:T.mapY)||50,P=w?"var(--green)":L?"var(--red)":"var(--blue)",M=w?`box-shadow: 0 0 15px ${P}; animation: pulse 2s infinite`:"",I=!w&&!L&&!h;return`
              <div class="map-node ${I?"clickable":""}" ${I?`data-travel="${$.id}"`:""} 
                   style="position:absolute; left:${C}%; top:${S}%; transform:translate(-50%, -50%); z-index:1; display:flex; flex-direction:column; align-items:center; width:max-content">
                <div class="node-label" style="font-size:10px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; margin-bottom:4px; color:${w?"var(--green)":"var(--text-light)"}; border:1px solid ${w?"var(--green)":"rgba(255,255,255,0.1)"}">
                  ${$.name} ${L?`[Lv.${$.min_level}]`:""}
                </div>
                <div class="node-dot" style="width:12px; height:12px; background-color:${P}; border-radius:50%; border:2px solid #fff; ${M}"></div>
              </div>
            `}).join("")}
        </div>
      </div>

      <div class="panel mt-md">
        <div class="panel-title">Thiết Lập Lộ Trình</div>
        <div class="panel-body no-pad" style="max-height: 300px; overflow-y:auto">
          ${n.map($=>{const T=m[$.id],w=$.id===v.currentArea&&!h,L=v.level<($.min_level||1),C=parseInt($.travel_time)||0,S=(T==null?void 0:T.staminaCost)||"?",P=r[$.id]||"";return`
              <div class="list-item ${w||L?"":"clickable"}" ${!w&&!L&&!h?`data-travel="${$.id}"`:""} style="padding: 10px 14px">
                <div class="item-info" style="flex:1">
                  <div class="item-name" style="font-size:14px">
                    ${$.name}
                    ${w?' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>':""}
                    ${L?` <span style="color:var(--red); font-size:11px">[Lv.${$.min_level}+]</span>`:""}
                  </div>
                  <div class="item-meta" style="margin-top:2px;display:flex;gap:6px;flex-wrap:wrap">
                    <span>Lv.${$.min_level||1}+</span>
                    <span>${C>0?"⏱ "+C+"s":"⚡ Tức thời"}</span>
                    <span>🏃 -${S}</span>
                    ${P?`<span style="font-size:10px;opacity:0.6">${P}</span>`:""}
                  </div>
                  ${$.description?`<div class="text-xs text-dim" style="margin-top:2px">${$.description}</div>`:""}
                </div>
                ${!w&&!L&&!h?`
                  <button class="btn btn--blue btn--sm" data-travel="${$.id}">
                    ${C>0?"🚶 Di chuyển":"⚡ Đi"}
                  </button>
                `:""}
              </div>`}).join("")}
        </div>
      </div>`,s.querySelectorAll("[data-travel]").forEach($=>{$.addEventListener("click",async T=>{T.stopPropagation();const w=$.dataset.travel;s.querySelectorAll("[data-travel]").forEach(L=>{L.tagName==="BUTTON"&&(L.disabled=!0),L.style.pointerEvents="none"});try{const L=await p.request(`/player/${t.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:w})});L.player&&(t.player=L.player,k()),o(L.message,"success"),O(s,a)}catch(L){o(L.message||"Lỗi di chuyển!","error"),O(s,a)}})}),h&&c>0){let $=c;const T=c,w=setInterval(async()=>{$--;const L=document.getElementById("travelTimer"),C=document.getElementById("travelBar");if(L&&(L.textContent=`⏳ ${Math.max(0,$)}s`),C&&(C.style.width=`${Math.max(0,$/T*100)}%`),$<=0){clearInterval(w);try{const S=await p.request(`/player/${t.playerId}/travel-check`,{method:"POST"});S.player&&(t.player=S.player,k()),S.arrived&&o(S.message,"success"),O(s,a)}catch{O(s,a)}}},1e3)}}catch(u){s.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(u)}}function F(s,a){var r,l;const{state:t,renderGame:p,notify:o,updateSidebar:k}=a,u=t.player,d=t.recipes||[],b=t.medicines||[],f=t._alchemyTab||"recipes",v=n=>{const x=b.find($=>$.id===n);return x?(x.icon||"💊")+" "+x.name:n};let h=0,c=0,y=0,m=0;(u.skills||[]).forEach(n=>{const x=typeof n=="string"?n:n.id,$=typeof n=="string"?1:n.level||1;x==="tinh_che"&&(h=$*2),x==="phu_an_thuat"&&(c=$*5),x==="linh_kiem_thuat"&&(y=$*10),x==="cuong_hoa_thuat"&&(m=$*15)});const g=n=>n.split("_").map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(" "),e=[];Object.values(u.equipment||{}).forEach(n=>{n&&e.push({...n,loc:"eq"})}),(u.inventory||[]).filter(n=>n.slot&&n.slot!=="consumable").forEach(n=>e.push({...n,loc:"inv"}));let i=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${f==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${f==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${h||c||y||m?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${h?`<span>🔥 Thành công +${h}%</span>`:""}
      ${c?`<span>💎 Giảm phí -${c}%</span>`:""}
      ${y?`<span>✨ Chất lượng +${y}%</span>`:""}
      ${m?`<span>⬆️ Nâng đôi ${m}%</span>`:""}
    </div>
    `:""}
  `;if(f==="recipes"){if(i+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!u.materials||Object.keys(u.materials).length===0)i+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[n,x]of Object.entries(u.materials))i+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(n)} <span style="color:var(--gold)">x${x}</span></div>`;i+="</div></div>",i+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',d.length===0?i+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':d.forEach(n=>{var C;const x=v(n.target),$=Math.min(100,(n.successRate||100)+h);let T="";(C=n.requirements)!=null&&C.skill&&(T=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(n.requirements.skill)} lv${n.requirements.level||1}</div>`);let w="";n.materials.forEach(S=>{var M;const P=((M=u.materials)==null?void 0:M[S.id])||0;w+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${P>=S.amount?"var(--green)":"var(--red)"};font-weight:bold">${P}/${S.amount}</span> ${g(S.id)}</span>`});const L=b.find(S=>S.id===n.target)||{};i+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${x}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${n.tier}</span>
                  <span>Tỉ lệ: <span style="color:${$>=80?"var(--green)":"var(--blue)"};font-weight:bold">${$}%</span></span>
                  <span>🔥 Phí: ${n.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${T}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${w}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${L.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${n.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),i+="</div></div>"}else i+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${e.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${e.map(n=>`<option value="${n.id}">${n.loc==="eq"?"🔸":"📦"} ${n.name||n.baseType} [${n.rarity||"?"}] ${(n.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(n=>{const x=Math.max(1,Math.round(n.cost*(1-c/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${n.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${n.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${n.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${n.id}" style="width:100%">
                💎 ${x} ${c>0?`<s style="opacity:0.4;font-size:10px">${n.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;s.innerHTML=i,s.querySelectorAll(".tab-btn").forEach(n=>{n.addEventListener("click",()=>{t._alchemyTab=n.dataset.tab,F(s,a)})}),s.querySelectorAll(".accordion-header").forEach(n=>{n.addEventListener("click",()=>{const x=n.nextElementSibling;x.style.display==="none"?(x.style.display="block",n.querySelector(".text-dim:last-child").textContent="▲"):(x.style.display="none",n.querySelector(".text-dim:last-child").textContent="▼")})}),s.querySelectorAll(".btn-craft").forEach(n=>{n.addEventListener("click",async x=>{x.stopPropagation();const $=d.find(T=>T.id===n.dataset.recipe);if($&&u.gold<($.cost||0))return o("Không đủ linh thạch!","error");try{const T=await q.craftItem(u.id,n.dataset.recipe);t.player=T.player,o(T.message,T.success?"success":"error"),p()}catch(T){o(T.message,"error")}})}),s.querySelectorAll(".btn-currency").forEach(n=>{n.addEventListener("click",async()=>{const x=document.getElementById("selItem");if(!(x!=null&&x.value))return o("Chọn trang bị trước!","error");const $=n.dataset.cid;let T=-1;if($==="thien_menh_phu"){const w=e.find(S=>S.id===x.value),L=(w==null?void 0:w.affixes)||[];if(L.length===0)return o("Item không có affix để khóa!","error");const C=prompt(`Chọn affix để khóa (0-${L.length-1}):
${L.map((S,P)=>`${P}: ${S.name||S.stat} +${S.value}`).join(`
`)}`);if(C===null)return;if(T=parseInt(C),isNaN(T)||T<0||T>=L.length)return o("Chỉ số không hợp lệ!","error")}n.disabled=!0,n.textContent="⏳...";try{const w=await q.applyCurrency(u.id,$,x.value,T);o(w.message,"success"),t.player=w.player,k(),F(s,a)}catch(w){o(w.message,"error"),n.disabled=!1,n.textContent="💎 Dùng"}})}),(r=document.getElementById("selItem"))==null||r.addEventListener("change",()=>{const n=e.find($=>$.id===document.getElementById("selItem").value),x=document.getElementById("itemPreview");n&&x&&(x.innerHTML=(n.affixes||[]).map($=>`<span style="color:var(--blue)">• ${$.name||$.stat} +${$.value}</span>`).join(" | ")||"Không có affix")}),(l=document.getElementById("selItem"))==null||l.dispatchEvent(new Event("change"))}function bt(s,a){const{state:t,api:p,notify:o,renderGame:k}=a;t.player,s.innerHTML=`
    <div class="page-header">
      <h2>🏷️ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ nhiệm vụ từ các NPC</p>
    </div>
    <div id="questList" class="quest-container">
      <div class="loading-spinner">⏳ Đang tải...</div>
    </div>
  `,u();async function u(){try{const b=(await p.getQuests(t.playerId)).quests||[],f=document.getElementById("questList");if(!f)return;if(b.length===0){f.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}f.innerHTML=b.map(v=>{const h=v.questAmount>0?Math.min(100,v.progress/v.questAmount*100):0,c=v.progress>=v.questAmount,y=v.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${c?"quest-done":""}" data-quest-id="${v.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${v.npcIcon||"🧓"} ${v.npcName||"NPC"}</span>
              <span class="quest-type">${y} ${v.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${v.questName||v.quest_id}</div>
            <div class="quest-desc">${v.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${c?"hp":"energy"}" style="width:${h}%"></div>
              </div>
              <span class="quest-progress-text">${v.progress}/${v.questAmount}</span>
            </div>
            ${c?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${v.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),f.querySelectorAll(".quest-complete-btn").forEach(v=>{v.addEventListener("click",async()=>{const h=v.dataset.qid;v.disabled=!0,v.textContent="⏳...";try{const c=await p.completeQuest(t.playerId,h);t.player=c.player,o(c.message,"success"),c.skillGained&&o(`🎯 Lĩnh ngộ: ${c.skillGained}!`,"success"),k()}catch(c){o(c.message||"Lỗi trả quest","error"),v.disabled=!1,v.textContent="✅ Trả Nhiệm Vụ"}})})}catch(d){console.error("Error loading quests:",d);const b=document.getElementById("questList");b&&(b.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function xt(s,a){const{state:t,api:p,notify:o,renderGame:k}=a;if(t.player.role!=="admin"){s.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const u=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let d="monsters";s.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${u.map(i=>`
          <button class="admin-tab ${i.id===d?"active":""}" data-tab="${i.id}">${i.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",i=>{const r=i.target.closest(".admin-tab");r&&(d=r.dataset.tab,document.querySelectorAll(".admin-tab").forEach(l=>l.classList.remove("active")),r.classList.add("active"),b(d))}),b(d);async function b(i){const r=document.getElementById("adminContent");if(r){r.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const l=await p.request(`/admin/${i}?adminId=${t.playerId}`);f(i,l,r)}catch(l){r.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${l.message}</div></div>`}}}function f(i,r,l){i==="monsters"?v(r,l):i==="npcs"?h(r,l):i==="areas"?c(r,l):y(i,r,l)}function v(i,r){const l=i.monsters||[];r.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${l.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${l.map(n=>{var x,$,T,w,L,C,S,P;return`
          <div class="admin-card" data-id="${n.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${n.name} ${n.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${(($=(x=i.tierInfo)==null?void 0:x[n.tier])==null?void 0:$.color)||"#888"}">${((w=(T=i.tierInfo)==null?void 0:T[n.tier])==null?void 0:w.name)||"T"+n.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((L=n.stats)==null?void 0:L.hp)||"?"}</div>
              <div>💪 ${((C=n.stats)==null?void 0:C.strength)||"?"}</div>
              <div>🏃 ${((S=n.stats)==null?void 0:S.speed)||"?"}</div>
              <div>🛡 ${((P=n.stats)==null?void 0:P.defense)||"?"}</div>
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
    `,g(r,i,"monsters","monsters")}function h(i,r){const l=i.npcs||[];r.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${l.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${l.map(n=>`
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
    `,g(r,i,"npcs","npcs")}function c(i,r){const l=Object.keys(i);r.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${l.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${l.map(n=>{const x=i[n];return`
            <div class="admin-card" data-id="${n}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${x.name||n}</span>
                <span class="badge" style="background:var(--orange)">⚡${x.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(x.events||[]).map($=>`<span>${$.type}: ${$.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${n}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,r.querySelectorAll(".admin-edit-area").forEach(n=>{n.addEventListener("click",()=>{const x=n.dataset.id,$=i[x];m(x,$,`areas/${x}`)})})}function y(i,r,l){var $;const n=JSON.stringify(r,null,2),x=n.split(`
`).length;l.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${i} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(x+5,30)}">${e(n)}</textarea>
    `,($=document.getElementById("btnSaveGeneric"))==null||$.addEventListener("click",async()=>{try{const T=document.getElementById("genericEditor").value,w=JSON.parse(T);o("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(T){o("JSON không hợp lệ: "+T.message,"error")}})}function m(i,r,l,n){const x=JSON.stringify(r,null,2),$=document.createElement("div");$.className="admin-modal-overlay",$.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${i}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${e(x)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild($),$.querySelectorAll(".admin-modal-close").forEach(T=>{T.addEventListener("click",()=>$.remove())}),$.addEventListener("click",T=>{T.target===$&&$.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const T=document.getElementById("modalEditor").value,w=JSON.parse(T);await p.request(`/admin/${l}?adminId=${t.playerId}`,{method:"PUT",body:JSON.stringify({data:w})}),o("✅ Đã lưu!","success"),$.remove(),b(d)}catch(T){o("Lỗi: "+T.message,"error")}})}function g(i,r,l,n){i.querySelectorAll(".admin-edit-btn").forEach(x=>{x.addEventListener("click",()=>{const $=x.dataset.id,w=(r[n]||[]).find(L=>L.id===$);w&&m($,w,`${l}/${$}`)})})}function e(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function tt(s,a){const{state:t,api:p,notify:o,renderGame:k,updateSidebar:u}=a,d=t.playerId;t._social||(t._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const b=t._social;async function f(){try{const g=await p.getRelationships(d);b.relationships=g,b.loaded=!0,v()}catch(g){o(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function v(){const{friends:g,enemies:e,pendingSent:i,pendingReceived:r}=b.relationships,l=r.length;s.innerHTML=`
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
            ${b.searchResults.map(n=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${n.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm} · ${n.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${n.id!==d?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${n.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${n.id}">⚔️ Kẻ Thù</button>
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
          🤝 Đạo Hữu (${g.length})
        </button>
        <button class="btn btn--sm ${b.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${e.length})
        </button>
        <button class="btn btn--sm ${b.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${l>0?`<span class="badge">${l}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${b.tab==="friends"?h(g):""}
        ${b.tab==="enemies"?c(e):""}
        ${b.tab==="pending"?y(r,i):""}
      </div>
    `,m()}function h(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(e=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${e.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${e.level} · ${e.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${e.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${e.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function c(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(e=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${e.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${e.level} · ${e.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${e.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${e.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function y(g,e){let i="";return g.length>0&&(i+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',i+=g.map(r=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${r.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${r.level} · ${r.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${r.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${r.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join("")),e.length>0&&(i+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',i+=e.map(r=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${r.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${r.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&e.length===0&&(i='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),i}function m(){var g,e;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var r;const i=(r=document.getElementById("socialSearch"))==null?void 0:r.value.trim();if(!i||i.length<2)return o("Cần ít nhất 2 ký tự","error");b.searchQuery=i;try{const l=await p.searchPlayers(i);b.searchResults=l.players||[],v()}catch(l){o(l.message,"error")}}),(e=document.getElementById("socialSearch"))==null||e.addEventListener("keydown",i=>{var r;i.key==="Enter"&&((r=document.getElementById("btnSearch"))==null||r.click())}),document.querySelectorAll("[data-tab]").forEach(i=>{i.addEventListener("click",()=>{b.tab=i.dataset.tab,v()})}),document.querySelectorAll("[data-action]").forEach(i=>{i.addEventListener("click",async()=>{const r=i.dataset.action,l=i.dataset.target;i.disabled=!0;try{let n;switch(r){case"add-friend":n=await p.addFriend(d,l);break;case"accept-friend":n=await p.acceptFriend(d,l);break;case"reject-friend":n=await p.rejectFriend(d,l);break;case"remove-friend":n=await p.removeFriend(d,l);break;case"add-enemy":n=await p.addEnemy(d,l);break;case"remove-enemy":n=await p.removeEnemy(d,l);break}o(n.message||"Thành công!","success"),await f()}catch(n){o(n.message||"Lỗi!","error"),i.disabled=!1}})})}b.loaded?v():f()}function et(s,a){const{state:t,api:p,notify:o}=a,k=t.playerId;t._chat||(t._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const u=t._chat;async function d(){try{const[e,i]=await Promise.all([p.getGlobalChat(),p.getChatFriends(k)]);u.globalMessages=e.messages||[],u.friends=i.friends||[],u.globalMessages.length>0&&(u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id),u.loaded=!0,v(),b()}catch(e){o(e.message||"Lỗi tải chat","error")}}function b(){f(),u.pollTimer=setInterval(async()=>{try{if(u.tab==="global"){const e=await p.getGlobalChat(u.lastGlobalId);e.messages&&e.messages.length>0&&(u.globalMessages.push(...e.messages),u.globalMessages.length>100&&(u.globalMessages=u.globalMessages.slice(-100)),u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id,c(),y())}else if(u.tab==="private"&&u.selectedFriend){const e=await p.getPrivateChat(k,u.selectedFriend.id,u.lastPrivateId);e.messages&&e.messages.length>0&&(u.privateMessages.push(...e.messages),u.privateMessages.length>100&&(u.privateMessages=u.privateMessages.slice(-100)),u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id,c(),y())}}catch{}},5e3)}function f(){u.pollTimer&&(clearInterval(u.pollTimer),u.pollTimer=null)}function v(){const e=u.tab==="global"?u.globalMessages:u.privateMessages;s.innerHTML=`
      <div class="page-header">
        <h2>💬 Giang Hồ Truyền Âm</h2>
        <p class="page-sub">Giao lưu với các đạo hữu trong giang hồ</p>
      </div>

      <div class="chat-tabs" style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn btn--sm ${u.tab==="global"?"btn--blue":"btn--dark"}" data-chat-tab="global">🌍 Toàn Cầu</button>
        <button class="btn btn--sm ${u.tab==="private"?"btn--blue":"btn--dark"}" data-chat-tab="private">📨 Riêng</button>
        ${u.tab==="private"?`
          <select id="friendSelect" style="flex:1;padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
            <option value="">-- Chọn Đạo Hữu --</option>
            ${u.friends.map(i=>{var r;return`<option value="${i.id}" ${((r=u.selectedFriend)==null?void 0:r.id)===i.id?"selected":""}>${i.name} (Lv.${i.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${h(e)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${u.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),y()}function h(e){return e.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':e.map(i=>{const r=i.sender_id===k,l=new Date(i.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${r?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${l}</span>
          <span style="font-weight:600;color:${r?"var(--blue)":"var(--gold)"}"> ${i.sender_name}</span>
          <span style="opacity:0.8">: ${m(i.message)}</span>
        </div>
      `}).join("")}function c(){const e=document.getElementById("chatMessages");if(!e)return;const i=u.tab==="global"?u.globalMessages:u.privateMessages;e.innerHTML=h(i)}function y(){const e=document.getElementById("chatMessages");e&&(e.scrollTop=e.scrollHeight)}function m(e){const i=document.createElement("div");return i.textContent=e,i.innerHTML}function g(){var i,r,l;document.querySelectorAll("[data-chat-tab]").forEach(n=>{n.addEventListener("click",()=>{u.tab=n.dataset.chatTab,u.tab==="global"&&(u.lastGlobalId=u.globalMessages.length>0?u.globalMessages[u.globalMessages.length-1].id:0),v(),b()})}),(i=document.getElementById("friendSelect"))==null||i.addEventListener("change",async n=>{const x=n.target.value;if(!x){u.selectedFriend=null,u.privateMessages=[],v();return}u.selectedFriend=u.friends.find($=>$.id===x)||null,u.lastPrivateId=0;try{const $=await p.getPrivateChat(k,x);u.privateMessages=$.messages||[],u.privateMessages.length>0&&(u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id),c(),y()}catch($){o($.message,"error")}});const e=async()=>{var $,T;const n=document.getElementById("chatInput"),x=n==null?void 0:n.value.trim();if(x){if(u.tab==="private"&&!u.selectedFriend)return o("Chọn Đạo Hữu trước!","error");try{if(await p.sendChat(k,u.tab,u.tab==="private"?u.selectedFriend.id:null,x),n.value="",u.tab==="global"){const w=await p.getGlobalChat(u.lastGlobalId);(($=w.messages)==null?void 0:$.length)>0&&(u.globalMessages.push(...w.messages),u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id)}else{const w=await p.getPrivateChat(k,u.selectedFriend.id,u.lastPrivateId);((T=w.messages)==null?void 0:T.length)>0&&(u.privateMessages.push(...w.messages),u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id)}c(),y()}catch(w){o(w.message||"Lỗi gửi tin nhắn","error")}}};(r=document.getElementById("btnSend"))==null||r.addEventListener("click",e),(l=document.getElementById("chatInput"))==null||l.addEventListener("keydown",n=>{n.key==="Enter"&&e()})}a.renderGame,u.loaded?(v(),b()):d()}function ft(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;t._market||(t._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const d=t._market;async function b(){try{const[e,i]=await Promise.all([p.getMarketListings(d.filter,d.sort),p.getMyListings(u)]);d.listings=e.listings||[],d.myListings=i.listings||[],d.loaded=!0,v()}catch(e){o(e.message||"Lỗi tải Giao Dịch Đài","error")}}async function f(){try{const[e,i]=await Promise.all([p.getMugTargets(u),p.getMugLog(u)]);d.mugTargets=e.targets||[],d.mugCooldown=e.mugCooldown||0,d.mugLog=i.logs||[],v()}catch(e){o(e.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function v(){const e=t.player;s.innerHTML=`
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

      ${d.showListForm?m(e):""}

      ${d.tab==="browse"?h():d.tab==="my"?c():y()}
    `,g()}function h(){let e=`
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
    `,i=d.listings;if(d.search.trim()){const r=d.search.toLowerCase().trim();i=i.filter(l=>{var n;return l.item_name.toLowerCase().includes(r)?!0:(n=l.item_data)!=null&&n.affixes?l.item_data.affixes.some(x=>(x.stat||"").toLowerCase().includes(r)||(x.type||"").toLowerCase().includes(r)):!1})}return i.length===0?e+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(e+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',e+=i.map(r=>{var T,w;const l=r.item_type==="item"?"⚔️":r.item_type==="material"?"🧱":"💊",n=((T=r.item_data)==null?void 0:T.rarity)||"",x=r.seller_id===u,$=(w=r.item_data)!=null&&w.affixes?r.item_data.affixes.map(L=>`${L.stat} ${L.type==="flat"?"+":""}${L.value}${L.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${l}
                <span style="color:var(--gold)">${r.item_name}</span>
                ${r.quantity>1?`<span style="opacity:0.5"> x${r.quantity}</span>`:""}
                ${n?`<span class="rarity-${n}" style="font-size:11px;margin-left:4px">[${n}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${r.seller_name}</span>
                ${$?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${$}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${r.price}${r.quantity>1?"/cái":""}</span>
              ${x?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${r.id}" data-qty="${r.quantity}" data-price="${r.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),e+="</div></div>"),e}function c(){if(d.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let e='<div class="panel"><div class="panel-body no-pad">';return e+=d.myListings.map(i=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${i.item_type==="item"?"⚔️":i.item_type==="material"?"🧱":"💊"} ${i.item_name} ${i.quantity>1?`<span style="opacity:0.5">x${i.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${i.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${i.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),e+="</div></div>",e}function y(){let e=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${d.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${d.mugCooldown}s</div>`:""}
    `;return d.mugTargets.length===0?e+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':e+=d.mugTargets.map(i=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${i.gender==="female"?"♀":"♂"} ${i.name}</div>
            <div class="item-meta">Lv.${i.level} · ${i.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${i.id}" ${d.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),e+="</div></div>",d.mugLog.length>0&&(e+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${d.mugLog.map(i=>{const r=i.attacker_id===u,l=i.outcome==="success"?"✅":"❌",n=i.outcome==="success"?"var(--green)":"var(--red)",x=r?i.outcome==="success"?`Cướp ${i.victim_name}: +${i.gold_stolen} 💎`:`Phục kích ${i.victim_name} thất bại!`:i.outcome==="success"?`Bị ${i.attacker_name} cướp: -${i.gold_stolen} 💎`:`${i.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${n}">${l} ${x} <span style="opacity:0.4;margin-left:auto">${new Date(i.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),e}function m(e){const i=Object.entries(e.materials||{}).map(([x,$])=>({id:x,qty:$,type:"material",name:x})),r=Object.entries(e.medicines||{}).map(([x,$])=>({id:x,qty:$,type:"medicine",name:x})),l=(e.inventory||[]).map(x=>({id:x.id,qty:1,type:"item",name:x.name||x.id})),n=[...i,...r,...l];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${n.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${n.map(x=>`<option value="${x.type}|${x.id}">${x.type==="item"?"⚔️":x.type==="material"?"🧱":"💊"} ${x.name} ${x.qty>1?`(có: ${x.qty})`:""}</option>`).join("")}
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
    `}function g(){var e,i,r,l;document.querySelectorAll("[data-mtab]").forEach(n=>{n.addEventListener("click",()=>{if(d.tab=n.dataset.mtab,d.tab==="mug"&&d.mugTargets.length===0){f();return}v()})}),(e=document.getElementById("btnShowList"))==null||e.addEventListener("click",()=>{d.showListForm=!d.showListForm,v()}),document.querySelectorAll("[data-filter]").forEach(n=>{n.addEventListener("click",async()=>{d.filter=n.dataset.filter,await b()})}),(i=document.getElementById("sortSelect"))==null||i.addEventListener("change",async n=>{d.sort=n.target.value,await b()}),(r=document.getElementById("searchInput"))==null||r.addEventListener("input",n=>{d.search=n.target.value,v();const x=document.getElementById("searchInput");x&&(x.focus(),x.setSelectionRange(d.search.length,d.search.length))}),(l=document.getElementById("btnConfirmList"))==null||l.addEventListener("click",async()=>{var L,C,S;const n=(L=document.getElementById("listItem"))==null?void 0:L.value;if(!n)return;const[x,$]=n.split("|"),T=parseInt((C=document.getElementById("listQty"))==null?void 0:C.value)||1,w=parseInt((S=document.getElementById("listPrice"))==null?void 0:S.value)||0;if(w<=0)return o("Giá phải lớn hơn 0!","error");try{const P=await p.listForSale(u,x,$,T,w);o(P.message,"success"),t.player=P.player,k(),d.showListForm=!1,await b()}catch(P){o(P.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(n=>{n.addEventListener("click",async()=>{const x=parseInt(n.dataset.buy),$=parseInt(n.dataset.qty),T=parseInt(n.dataset.price);let w=1;if($>1){const L=prompt(`Mua bao nhiêu? (tối đa ${$}, giá ${T} 💎/cái)`,"1");if(!L)return;w=Math.min(parseInt(L)||1,$)}n.disabled=!0;try{const L=await p.buyFromMarket(u,x,w);o(L.message,"success"),t.player=L.player,k(),await b()}catch(L){o(L.message,"error"),n.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(n=>{n.addEventListener("click",async()=>{n.disabled=!0;try{const x=await p.cancelListing(u,parseInt(n.dataset.cancel));o(x.message,"success"),t.player=x.player,k(),await b()}catch(x){o(x.message,"error"),n.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(n=>{n.addEventListener("click",async()=>{const x=n.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){n.disabled=!0,n.textContent="⏳...";try{const $=await p.mugPlayer(u,x);o($.message,$.success?"success":"error"),t.player=$.player,k(),await f()}catch($){o($.message,"error"),n.disabled=!1,n.textContent="💀 Phục Kích"}}})})}d.tab==="mug"?f():d.loaded?v():b()}function $t(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;let d=!1,b=null;async function f(){try{b=await p.getRealmInfo(u),d=!0,v()}catch(y){o(y.message||"Lỗi tải Cảnh Giới","error")}}function v(){if(!b)return;const y=b.current,m=b.allRealms||[],g=t.player,e=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;s.innerHTML=`
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${y.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${y.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${y.color}">${y.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Tầng ${y.tier}/8 · ${y.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${g.level} — ${g.xp}/${g.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${e}%;background:${y.color}"></div></div>
        </div>

        ${y.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(y.bonuses).filter(([,i])=>i>0).map(([i,r])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${r} ${i}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${y.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${y.unlocks.map(i=>`<span style="font-size:12px;opacity:0.7">✅ ${i}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${y.canBreakthrough?h(y):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${m.map(i=>{const r=i.tier===y.tier,l=i.tier<y.tier,x=i.tier>y.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${r?`2px solid ${i.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${x};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${i.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${i.color}">${i.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${i.levelMin}+</span>
                ${i.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${i.failChance}% thất bại</span>`:""}
                ${l?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${r?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,c()}function h(y){const m=y.nextRealm;if(!m)return"";const g=m.cost?`💎 ${m.cost.gold} + 🔮 ${m.cost.energy}`:"Miễn phí";return`
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
          Bonus mới: ${Object.entries(m.bonuses).filter(([,e])=>e>0).map(([e,i])=>`+${i} ${e}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${m.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function c(){var y;(y=document.getElementById("btnBreakthrough"))==null||y.addEventListener("click",async()=>{const m=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){m.disabled=!0,m.textContent="⏳ Đang đột phá...";try{const g=await p.attemptBreakthrough(u);g.success?(o(g.message,"success"),t.player=g.player,k(),await f()):(o(g.message,"error"),g.player&&(t.player=g.player,k()),await f())}catch(g){o(g.message||"Lỗi đột phá","error"),m.disabled=!1,m.textContent="⚡ ĐỘT PHÁ"}}})}f()}function Tt(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a;kt(s,a)}async function kt(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a;s.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const d=(await p.request(`/player/${t.playerId}/events`)).events||[];if(t.player&&(t.player.unreadEventsCount=0,k()),d.length===0){s.innerHTML=`
        <div class="page-header"><h1>📜 Sự Kiện</h1></div>
        <div class="panel">
          <div class="panel-body text-dim" style="text-align:center; padding: 40px;">
            Gió yên biển lặng. Chưa có sự kiện nào xảy ra với bạn.
          </div>
        </div>
      `;return}s.innerHTML=`
      <div class="page-header"><h1>📜 Sự Kiện Gần Đây</h1></div>
      <div class="panel">
        <div class="panel-body no-pad">
          <ul class="event-timeline" style="list-style:none; padding:16px; margin:0;">
            ${d.map(b=>{const f=new Date(b.created_at*1e3),v=f.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),h=f.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let c="📌";return b.type==="attack"&&(c="⚔️"),b.type==="hospital"&&(c="🏥"),b.type==="jail"&&(c="🚓"),b.type==="money"&&(c="💰"),b.type==="system"&&(c="⚙️"),b.type==="trade"&&(c="🤝"),`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${v}</div>
                    <div>${h}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${c}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${b.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${b.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(u){s.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${u.message}</div></div>`}}function wt(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;t._tc||(t._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const d=t._tc;async function b(){try{d.data=await p.request(`/player/${u}/atlas-maps`),d.loaded=!0,f()}catch(g){o(g.message,"error")}}function f(){const g=d.data,e=(g==null?void 0:g.atlas)||{},i=(g==null?void 0:g.maps)||[],r=g==null?void 0:g.activeRun,l=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,s.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${e.completed||0}/${e.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${e.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${e.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${e.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${d.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${d.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${i.length})</button>
        ${r?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,s.querySelectorAll("[data-tab]").forEach(x=>{x.addEventListener("click",()=>{d.tab=x.dataset.tab,f()})});const n=document.getElementById("tcContent");n&&(r&&d.tab==="run"?y(n,r):d.tab==="inventory"?h(n,i):v(n,l,e))}function v(g,e,i){var l;const r=((l=d.data)==null?void 0:l.tiers)||[];g.innerHTML=r.map(n=>{const x=e.filter($=>$.tier===n.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${n.tier} ${n.name} <span style="opacity:0.4;font-size:11px">(Realm ${n.requiredRealm}+, ${n.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${x.map($=>{var L;const T=((L=i.progress)==null?void 0:L[$.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[$.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${T?700:400}">${$.name}</span>
                ${T?`<span style="color:var(--green);font-size:11px">✅ ×${T}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function h(g,e,i){if(e.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=e.map((r,l)=>{const n=r.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${m(r.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${r.mapName||r.mapId} <span style="color:${m(r.tier)};font-size:12px">T${r.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${n.length>0?n.map(x=>x.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${n.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${l}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${l}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(r=>{r.addEventListener("click",async()=>{try{const l=await p.request(`/player/${u}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(r.dataset.idx)})});o(l.message,"success"),t.player=l.player,k(),d.tab="run",await b()}catch(l){o(l.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(r=>{r.addEventListener("click",()=>c(parseInt(r.dataset.idx)))})}function c(g){var r;const e=((r=d.data)==null?void 0:r.modifiers)||[],i=document.createElement("div");i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",i.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${e.map(l=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${l.id}">
          <span style="flex:1"><strong>${l.name}</strong><br><span style="font-size:11px;opacity:0.6">${l.desc} · IIQ +${l.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,i.addEventListener("click",async l=>{const n=l.target.closest("[data-modid]");if(n)try{const x=await p.request(`/player/${u}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:n.dataset.modid})});o(x.message,"success"),t.player=x.player,k(),i.remove(),await b()}catch(x){o(x.message,"error")}else l.target===i&&i.remove()}),document.body.appendChild(i)}function y(g,e){var l,n;const i=e.currentWave/e.totalWaves*100,r=e.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${e.mapName} <span style="color:${m(e.tier)}">T${e.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${e.currentWave}/${e.totalWaves}
            ${r.length>0?" · "+r.map(x=>x.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${i}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${d.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(l=document.getElementById("btnTCFight"))==null||l.addEventListener("click",async()=>{d.fighting=!0,f();try{const x=await p.request(`/player/${u}/atlas-maps/fight`,{method:"POST"});t.player=x.player,k();const $=x.result!=="map_failed";o(x.message,$?"success":"error"),d.fighting=!1,(x.result==="map_complete"||x.result==="map_failed")&&(d.tab="atlas"),await b()}catch(x){o(x.message,"error"),d.fighting=!1,f()}}),(n=document.getElementById("btnTCQuit"))==null||n.addEventListener("click",async()=>{try{await p.request(`/player/${u}/atlas-maps/abandon`,{method:"POST"}),o("Đã rời Tiên Cảnh","info"),d.tab="atlas",await b()}catch(x){o(x.message,"error")}})}function m(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}d.loaded?f():b()}function Lt(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;t._tw||(t._tw={data:null,loaded:!1,fighting:!1,tab:"tower"});const d=t._tw;async function b(){try{d.data=await p.request(`/player/${u}/tower`),d.loaded=!0,f()}catch(y){o(y.message,"error")}}function f(){var l,n;const y=d.data,m=y==null?void 0:y.run,g=(y==null?void 0:y.leaderboard)||[],e=(y==null?void 0:y.milestones)||{},i=y==null?void 0:y.nextMilestone;s.innerHTML=`
      <div class="page-header">
        <h2>🗼 Thiên Phần Tháp</h2>
        <p class="page-sub">Leo tháp vô hạn — mùa ${(y==null?void 0:y.season)||"?"} | Reset hàng tháng</p>
      </div>

      <!-- STATUS CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid #ff4500">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:48px">🗼</div>
          <div style="flex:1">
            ${m?`
              <div style="font-weight:800;font-size:22px">Tầng ${m.currentFloor}</div>
              <div style="font-size:12px;opacity:0.6">Kỷ lục: T.${m.highestFloor} · ${m.totalKills} kills · ${m.status==="dead"?"💀 Đã ngã":"🟢 Đang leo"}</div>
              ${i?`<div style="font-size:11px;margin-top:4px;color:var(--gold)">🎯 Mốc tiếp: T.${i.floor} → ${i.reward.title} (+${i.reward.gold}💎)</div>`:""}
            `:`
              <div style="font-weight:700;font-size:16px">Chưa vào tháp mùa này</div>
              <div style="font-size:12px;opacity:0.5">Bắt đầu leo để tranh hạng!</div>
            `}
          </div>
          <div>
            ${!m||m.status==="dead"?`<button class="btn btn--red btn--lg" id="btnEnter">${m?"🔄 Hồi Sinh":"⚡ Vào Tháp"}</button>`:`<button class="btn btn--red btn--lg" id="btnFight" ${d.fighting?"disabled":""}>⚔️ Chiến Đấu</button>`}
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
    `,s.querySelectorAll("[data-tab]").forEach(x=>x.addEventListener("click",()=>{d.tab=x.dataset.tab,f()})),(l=document.getElementById("btnEnter"))==null||l.addEventListener("click",async()=>{try{const x=await p.request(`/player/${u}/tower/climb`,{method:"POST"});o(x.message,"success"),await b()}catch(x){o(x.message,"error")}}),(n=document.getElementById("btnFight"))==null||n.addEventListener("click",async()=>{var x,$;d.fighting=!0,f();try{const T=await p.request(`/player/${u}/tower/fight`,{method:"POST"});t.player=T.player,k(),d.fighting=!1;const w=document.getElementById("twResult");if(w){const L=T.result!=="death";w.innerHTML=`
            <div class="panel" style="border-left:3px solid ${L?"var(--green)":"var(--red)"}">
              <div class="panel-body" style="padding:14px">
                <div style="font-weight:700;font-size:14px">${T.message}</div>
                ${(x=T.loot)!=null&&x.length?`<div style="font-size:12px;margin-top:6px;opacity:0.7">${T.loot.join(" · ")}</div>`:""}
                ${T.milestone?`<div style="margin-top:8px;padding:8px;background:rgba(255,215,0,0.15);border-radius:6px;font-weight:700;color:var(--gold)">🏆 ${T.milestone.title}!</div>`:""}
                ${(($=T.combatResults)==null?void 0:$.map(C=>`<details style="margin-top:6px"><summary style="cursor:pointer;font-size:11px">${C.monster} — ${C.result==="win"?"✅":"❌"}</summary><pre style="font-size:10px;max-height:150px;overflow:auto;opacity:0.6;margin-top:4px">${(C.log||[]).map(S=>`${S.turn||""}: ${S.text||JSON.stringify(S)}`).join(`
`)}</pre></details>`).join(""))||""}
              </div>
            </div>
          `}await b()}catch(T){o(T.message,"error"),d.fighting=!1,f()}});const r=document.getElementById("twContent");r&&(d.tab==="leaderboard"?h(r,g,y.playerRank):d.tab==="milestones"?c(r,e,(m==null?void 0:m.highestFloor)||0):v(r,m))}function v(y,m){if(!m){y.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Vào tháp để bắt đầu leo!</div></div>';return}const g=m.currentFloor,e=[];g%10===0?e.push("👑 Boss"):g%15===0?e.push("💰 Bảo Tàng (2.5x loot)"):g%7===0?e.push("☠️ Bẫy Trận (-10% HP)"):g%13===0?e.push("💚 Linh Tuyền (+20% HP)"):g%11===0?e.push("⚡ Tinh Anh (+30% stats)"):g%9===0&&g>20&&e.push("☯ Ngũ Hành");const i=Math.min(1+Math.floor(g/20),3);y.innerHTML=`<div class="panel"><div class="panel-body" style="padding:14px">
      <div style="font-weight:700">Tầng ${g} Preview</div>
      <div style="font-size:12px;opacity:0.7;margin-top:4px">
        ${e.length?e.join(" · "):"⚔️ Thường"}
        · ${i} quái
        · Sức mạnh ×${Math.pow(1.08,g-1).toFixed(1)}
      </div>
    </div></div>`}function h(y,m,g){var e;y.innerHTML=`<div class="panel"><div class="panel-title">🏆 Mùa ${(e=d.data)==null?void 0:e.season}</div><div class="panel-body no-pad">
      ${m.length===0?'<div style="padding:20px;text-align:center;opacity:0.4">Chưa có ai leo tháp mùa này</div>':""}
      ${m.map(i=>{const r=i.rank<=3?["","🥇","🥈","🥉"][i.rank]:`#${i.rank}`,l=i.playerId===u;return`<div class="list-item" style="padding:8px 14px;${l?"background:rgba(255,215,0,0.1)":""}">
          <span style="width:40px;font-weight:700;font-size:14px">${r}</span>
          <span style="flex:1;font-weight:${l?800:400}">${i.name}</span>
          <span style="font-size:12px;opacity:0.7">T.${i.floor} · ${i.kills} kills</span>
        </div>`}).join("")}
    </div></div>
    ${g>0?`<div style="text-align:center;margin-top:8px;font-size:12px;opacity:0.6">Hạng của bạn: #${g}</div>`:""}`}function c(y,m,g){y.innerHTML=`<div class="panel"><div class="panel-title">🎯 Mốc Thưởng</div><div class="panel-body no-pad">
      ${Object.entries(m).map(([e,i])=>{const r=g>=parseInt(e);return`<div class="list-item" style="padding:10px 14px;${r?"opacity:0.5":""}">
          <span style="font-size:18px">${r?"✅":"🔒"}</span>
          <span style="flex:1;font-weight:600">Tầng ${e}</span>
          <span style="font-size:12px">${i.title} · +${i.gold}💎</span>
        </div>`}).join("")}
    </div></div>`}d.loaded?f():b()}function St(s,a){const{state:t,api:p,notify:o,updateSidebar:k,renderGame:u}=a,d=t.playerId;t._housing||(t._housing={data:null,loaded:!1});const b=t._housing;async function f(){try{const m=await p.getHousing(d);b.data=m,b.loaded=!0,v()}catch(m){o(m.message||"Lỗi tải Động Phủ","error")}}function v(){const m=b.data;s.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${m.owned?c(m):h(m)}
    `,y()}function h(m){const g=m.tiers[1];return`
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
    `}function c(m){const g=m.gardenSlots||[],e=m.gardenHerbs||{};return`
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
            ${Array.from({length:m.maxSlots},(i,r)=>{const l=g[r]||{},n=!!l.herb,x=l.ready,$=l.remaining||0,T=Math.ceil($/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${x?"var(--green)":n?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${n?`
                    <div style="font-size:20px">${x?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${l.herbName||l.herb}</div>
                    <div style="font-size:10px;color:${x?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${x?"✅ Sẵn sàng!":"⏳ "+T+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${r}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(e).map(([w,L])=>`<option value="${w}">${L.name}</option>`).join("")}
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
            ${Object.entries(m.formations).map(([i,r])=>{const l=r.currentLevel>=r.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${r.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${r.icon}</span>
                      <strong style="margin-left:4px">${r.name}</strong>
                      ${r.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${r.currentLevel}</span>`:""}
                    </div>
                    ${r.canBuild?l?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${i}">
                        ⬆ ${r.nextCost} 💎
                      </button>`:`<span style="font-size:10px;color:var(--red)">T${r.requiredTier}+</span>`}
                  </div>
                  <div style="font-size:11px;opacity:0.5;margin-top:4px">${r.description}</div>
                  ${r.currentLevel>0?`<div style="font-size:10px;color:var(--orange);margin-top:2px">Phí: ${r.nextDailyCost||(r.dailyCosts?r.dailyCosts[r.currentLevel-1]:"?")}/ngày</div>`:""}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `}function y(){var m,g,e,i;(m=document.getElementById("btnBuyHouse"))==null||m.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const r=await p.buyHousing(d);o(r.message,"success"),t.player=r.player,k(),await f()}catch(r){o(r.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const r=await p.buyHousing(d);o(r.message,"success"),t.player=r.player,k(),await f()}catch(r){o(r.message,"error")}}),document.querySelectorAll(".plant-select").forEach(r=>{r.addEventListener("change",async l=>{const n=l.target.value;if(!n)return;const x=parseInt(r.dataset.slot);try{const $=await p.plantHerb(d,n,x);o($.message,"success"),await f()}catch($){o($.message,"error")}})}),(e=document.getElementById("btnHarvest"))==null||e.addEventListener("click",async()=>{try{const r=await p.harvestGarden(d);o(r.message,"success"),t.player=r.player,k(),await f()}catch(r){o(r.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(r=>{r.addEventListener("click",async()=>{const l=r.dataset.fid;r.disabled=!0,r.textContent="⏳...";try{const n=await p.upgradeFormation(d,l);o(n.message,"success"),t.player=n.player,k(),await f()}catch(n){o(n.message,"error"),r.disabled=!1,r.textContent="⬆ Nâng"}})}),(i=document.getElementById("btnMaintenance"))==null||i.addEventListener("click",async()=>{try{const r=await p.payMaintenance(d);o(r.message,"success"),t.player=r.player,k(),await f()}catch(r){o(r.message,"error")}})}b.loaded?v():f()}function Ct(s,a){const{state:t}=a;t._wikiTab||(t._wikiTab="lore");function p(){s.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","explore","dungeon","housing","talent","alchemy","crime","market","tips"].map(k=>`
          <button class="btn btn--sm ${t._wikiTab===k?"btn--gold":"btn--dark"}" data-tab="${k}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",explore:"🗺️ Khám Phá",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",crime:"🔪 Phạm Tội",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[k]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${o(t._wikiTab)}
        </div>
      </div>
    `,s.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{t._wikiTab=k.dataset.tab,p()})})}function o(k){return{lore:`
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
      `}[k]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}p()}function Et(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;t._npcShop||(t._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const d=t._npcShop;async function b(){try{const h=await p.getShops(u);d.shops=h.shops||[],d.tax=h.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},d.loaded=!0,f()}catch(h){o(h.message||"Lỗi tải shop","error")}}function f(){s.innerHTML=`
      <div class="page-header">
        <h2>🧓 Thương Nhân NPC</h2>
        <p class="page-sub">Mua vật phẩm từ NPC. Stock giới hạn/ngày. Mua tối đa 50 vật phẩm/ngày.</p>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <div style="padding:6px 12px;background:rgba(255,200,0,0.08);border:1px solid rgba(255,200,0,0.2);border-radius:6px;font-size:12px">
          📊 Thuế P2P: <strong style="color:var(--gold)">${d.tax.rate}%</strong>
          <span style="opacity:0.5;margin-left:4px">${d.tax.reason}</span>
        </div>
      </div>

      ${d.shops.length===0?'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.4;padding:30px">Không có cửa hàng</div></div>':""}

      ${d.shops.map(h=>`
        <div class="panel" style="margin-bottom:10px">
          <div class="panel-title">${h.icon} ${h.name} <span style="opacity:0.4;font-size:11px">— ${h.area}</span></div>
          <div class="panel-body no-pad">
            ${h.items.map(c=>`
              <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:500">${c.name}</div>
                  <div style="font-size:11px;opacity:0.5">
                    Stock: <span style="color:${c.remainingStock>0?"var(--green)":"var(--red)"}">${c.remainingStock}/${c.dailyStock}</span>
                    · 💎 ${c.currentPrice}
                  </div>
                </div>
                <div style="display:flex;gap:4px;align-items:center">
                  <input type="number" class="buy-qty" data-shop="${h.id}" data-item="${c.id}" data-price="${c.currentPrice}"
                    value="1" min="1" max="${c.remainingStock}" style="width:40px;text-align:center;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:3px;font-size:11px">
                  <button class="btn btn--sm btn--gold btn-buy" data-shop="${h.id}" data-item="${c.id}"
                    ${c.remainingStock<=0?"disabled":""}>
                    ${c.remainingStock>0?"🛒 Mua":"❌ Hết"}
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `,v()}function v(){s.querySelectorAll(".btn-buy").forEach(h=>{h.addEventListener("click",async()=>{const c=h.dataset.shop,y=h.dataset.item,m=s.querySelector(`.buy-qty[data-shop="${c}"][data-item="${y}"]`),g=parseInt((m==null?void 0:m.value)||1);h.disabled=!0,h.textContent="⏳...";try{const e=await p.buyFromShop(u,c,y,g);o(e.message,"success"),t.player=e.player,k(),await b()}catch(e){o(e.message,"error"),h.disabled=!1,h.textContent="🛒 Mua"}})})}d.loaded?f():b()}function Pt(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;t._guild||(t._guild={data:null,loaded:!1,allGuilds:null});const d=t._guild;async function b(){try{d.data=await p.getMyGuild(u),d.loaded=!0,v()}catch(m){o(m.message||"Lỗi","error")}}async function f(){try{const m=await p.listGuilds();d.allGuilds=m.guilds||[],v()}catch(m){o(m.message,"error")}}function v(){const m=d.data;s.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${m!=null&&m.inGuild?c(m):h(m)}
    `,y()}function h(m){return`
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
    `}function c(m){var r;const g=m.guild,e=m.members||[],i=m.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${g.tag}] ${g.name} <span style="opacity:0.3">Lv${g.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((r=g.levelInfo)==null?void 0:r.name)||""} · ${g.memberCount}/${g.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${g.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${g.dailyUpkeep}/ngày</span>
              ${g.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(g.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(g.buffs).map(([l,n])=>`${l} +${n}%`).join(", ")}
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
            ${i.slice(0,10).map(l=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(l.created_at).toLocaleString("vi")}</span>
                ${l.detail||l.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${e.length}/${g.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${e.map(l=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${l.role==="leader"?"👑":l.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${l.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${l.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${m.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function y(){var m,g,e,i,r,l;(m=document.getElementById("btnCreate"))==null||m.addEventListener("click",async()=>{var T,w,L,C,S,P;const n=(w=(T=document.getElementById("guildName"))==null?void 0:T.value)==null?void 0:w.trim(),x=(C=(L=document.getElementById("guildTag"))==null?void 0:L.value)==null?void 0:C.trim(),$=(P=(S=document.getElementById("guildDesc"))==null?void 0:S.value)==null?void 0:P.trim();if(!n||!x)return o("Nhập tên và tag!","error");try{const M=await p.createGuild(u,n,x,$);o(M.message,"success"),t.player=M.player,k(),d.loaded=!1,await b()}catch(M){o(M.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",f),document.querySelectorAll(".btn-join").forEach(n=>{n.addEventListener("click",async()=>{try{const x=await p.joinGuild(u,parseInt(n.dataset.gid));o(x.message,"success"),d.loaded=!1,await b()}catch(x){o(x.message,"error")}})}),(e=document.getElementById("btnContribute"))==null||e.addEventListener("click",async()=>{var x;const n=parseInt(((x=document.getElementById("contributeAmt"))==null?void 0:x.value)||0);if(!(n<=0))try{const $=await p.contributeGuild(u,n);o($.message,"success"),t.player=$.player,k(),await b()}catch($){o($.message,"error")}}),(i=document.getElementById("btnUpgradeGuild"))==null||i.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const n=await p.upgradeGuild(u);o(n.message,"success"),await b()}catch(n){o(n.message,"error")}}),(r=document.getElementById("btnPayUpkeep"))==null||r.addEventListener("click",async()=>{try{const n=await p.payGuildUpkeep(d.data.guild.id);o(n.message,"success"),await b()}catch(n){o(n.message,"error")}}),(l=document.getElementById("btnLeave"))==null||l.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const n=await p.leaveGuild(u);o(n.message,"success"),d.loaded=!1,await b()}catch(n){o(n.message,"error")}})}d.loaded?v():b()}function Mt(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;t._profile||(t._profile={results:[],viewing:null,searchQuery:""});const d=t._profile;function b(){s.innerHTML=`
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

      ${d.viewing?f(d.viewing):""}

      ${d.results.length>0&&!d.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${d.results.length})</div>
        <div class="panel-body no-pad">
          ${d.results.map(c=>`
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
      `:!d.viewing&&d.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,v()}function f(c){var e,i,r;const y=c.id===u,m=c.maxHp>0?Math.round(c.currentHp/c.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((e=c.name[0])==null?void 0:e.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${c.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${c.level} · ${((i=c.realmInfo)==null?void 0:i.fullName)||"Phàm Nhân"}
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
              <div style="height:100%;width:${m}%;background:${m>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(r=c.gold)==null?void 0:r.toLocaleString()} 💎</strong></div>

          ${y?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${c.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${c.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function v(){var c,y,m,g,e;(c=document.getElementById("btnSearch"))==null||c.addEventListener("click",h),(y=document.getElementById("searchInput"))==null||y.addEventListener("keydown",i=>{i.key==="Enter"&&h()}),document.querySelectorAll(".btn-view, [data-view]").forEach(i=>{i.addEventListener("click",async()=>{const r=i.dataset.vid||i.dataset.view;try{const l=await p.getPlayerProfile(r);d.viewing=l.profile,b()}catch(l){o(l.message,"error")}})}),(m=document.getElementById("btnAttack"))==null||m.addEventListener("click",async()=>{const i=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${d.viewing.name}?`))try{const r=await p.mugPlayer(u,i);o(r.message,r.won?"success":"error"),r.player&&(t.player=r.player,k())}catch(r){o(r.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const i=document.getElementById("btnAddFriend").dataset.tid;try{const r=await p.addFriend(u,i);o(r.message||"Đã gửi lời mời!","success")}catch(r){o(r.message,"error")}}),(e=document.getElementById("btnBackSearch"))==null||e.addEventListener("click",()=>{d.viewing=null,b()})}async function h(){var m;const c=document.getElementById("searchInput"),y=(m=c==null?void 0:c.value)==null?void 0:m.trim();if(!y||y.length<2)return o("Nhập ít nhất 2 ký tự!","error");d.searchQuery=y,d.viewing=null;try{const g=await p.searchPlayers(y);d.results=g.players||[],b()}catch(g){o(g.message,"error")}}b()}function It(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;t._arena||(t._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const d=t._arena;async function b(){try{d.data=await p.getArena(u),d.loaded=!0,f()}catch(h){o(h.message,"error")}}function f(){var i,r,l,n,x,$,T,w;const h=d.data,c=(h==null?void 0:h.arena)||{},y=c.rank||{},m=parseInt(c.streak)||0,g=m>=5?`🔥x${m}`:m>=3?`⚡x${m}`:m>0?`${m}W`:m<0?`${Math.abs(m)}L`:"",e=m>=5?"var(--gold)":m>=3?"var(--orange)":m>0?"var(--green)":m<0?"var(--red)":"var(--text-dim)";s.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid ${y.color||"#666"}">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px;text-shadow:0 0 12px ${y.color||"#666"}">${y.icon||"🛡️"}</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Rank</div>
            <div style="font-weight:800;font-size:18px;color:${y.color||"#fff"}">${y.name||"Chưa xếp hạng"}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px">
              ELO: <strong>${c.rating||1e3}</strong> · ${c.wins||0}W/${c.losses||0}L
              ${g?` · <span style="color:${e};font-weight:700">${g}</span>`:""}
            </div>
            ${y.nextThreshold?`
              <div style="margin-top:6px">
                <div style="font-size:10px;opacity:0.4">Tiến trình → ${y.nextThreshold} ELO</div>
                <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:3px;overflow:hidden">
                  <div style="background:${y.color||"#666"};height:100%;width:${y.progress||0}%;border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            `:'<div style="font-size:10px;opacity:0.4;margin-top:4px">🏆 Đỉnh cao! Thiên Đạo Đệ Nhất!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${(i=d.lastResult)!=null&&i.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(r=d.lastResult.newRank)==null?void 0:r.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(l=d.lastResult.newRank)==null?void 0:l.name}!</div>
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
            Đối thủ: <strong>${(n=d.lastResult.opponent)==null?void 0:n.name}</strong> 
            ${(x=d.lastResult.opponent)!=null&&x.rank?d.lastResult.opponent.rank.icon:""} 
            (ELO ${($=d.lastResult.opponent)==null?void 0:$.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${d.lastResult.ratingChange>0?"+":""}${d.lastResult.ratingChange}
            ${d.lastResult.goldEarned>0?` · +${d.lastResult.goldEarned} 💎`:""}
          </div>
          ${(T=d.lastResult.combatLog)!=null&&T.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${d.lastResult.combatLog.map(L=>`<div>${L}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(h.opponents||[]).length>0?(h.opponents||[]).map(L=>{var C,S,P;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((C=L.rank)==null?void 0:C.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${L.name} <span style="opacity:0.4;font-size:11px">Lv.${L.level}</span></div>
                <div style="font-size:11px;color:${((S=L.rank)==null?void 0:S.color)||"#888"}">${((P=L.rank)==null?void 0:P.name)||"Đồng"} · ELO ${L.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${L.player_id}" ${d.fighting?"disabled":""}>⚔️ Đấu</button>
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
            ${(h.top10||[]).map((L,C)=>{var S,P;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${C<3?"var(--gold)":"var(--text-dim)"}">#${C+1}</span>
                <span>${((S=L.rank)==null?void 0:S.icon)||""}</span>
                <span style="flex:1">${L.name}</span>
                <span style="color:${((P=L.rank)==null?void 0:P.color)||"var(--blue)"}; font-weight:600">${L.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(h.history||[]).map(L=>{const C=L.winner_id===u;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${C?"var(--green)":"var(--red)"}">
                  ${C?"✅":"❌"} vs ${L.attacker_id===u?L.defender_name:L.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${L.rating_change>0?"+":""}${L.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,s.querySelectorAll(".btn-fight-opp").forEach(L=>{L.addEventListener("click",C=>v(C.target.dataset.oid))}),(w=document.getElementById("btnRandomFight"))==null||w.addEventListener("click",()=>v(null))}async function v(h){d.fighting=!0,f();try{const c=await p.request(`/player/${u}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:h})});d.lastResult=c,t.player=c.player,k(),o(c.message,c.won?"success":"error"),d.fighting=!1,await b()}catch(c){o(c.message,"error"),d.fighting=!1,f()}}d.loaded?f():b()}function qt(s,a){const{state:t,api:p,notify:o,updateSidebar:k,renderGame:u}=a,d=t.playerId,b=t._auctionTab||"browse";async function f(){try{const[c,y]=await Promise.all([p.getAuctions(),p.getMyAuctions(d)]);t._auctionListings=c.listings||[],t._auctionMine=y.listings||[],v()}catch(c){o(c.message,"error")}}function v(){const c=t._auctionListings||[],y=t._auctionMine||[],m=(t.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");s.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${b==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${b==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${b==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${y.length})</button>
      </div>

      ${b==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':c.map(g=>{const e=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${e.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${e.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${g.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${g.id}">💎 ${g.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:b==="sell"?`
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
          ${y.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':y.map(g=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(g.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${g.status==="active"?"var(--green)":g.status==="sold"?"var(--gold)":"var(--red)"}">${g.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${g.buyout_price}</div>
                </div>
                ${g.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${g.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,h()}function h(){var c;s.querySelectorAll(".tab-btn").forEach(y=>y.addEventListener("click",()=>{t._auctionTab=y.dataset.tab,f()})),s.querySelectorAll(".btn-buy").forEach(y=>y.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const m=await p.buyAuction(d,parseInt(y.dataset.lid));o(m.message,"success"),t.player=m.player,k(),await f()}catch(m){o(m.message,"error")}})),s.querySelectorAll(".btn-cancel").forEach(y=>y.addEventListener("click",async()=>{try{const m=await p.cancelAuction(d,parseInt(y.dataset.lid));o(m.message,"success"),t.player=m.player,k(),await f()}catch(m){o(m.message,"error")}})),(c=document.getElementById("btnListItem"))==null||c.addEventListener("click",async()=>{var e,i,r;const y=(e=document.getElementById("selSellItem"))==null?void 0:e.value,m=parseInt(((i=document.getElementById("inpPrice"))==null?void 0:i.value)||"500"),g=parseInt(((r=document.getElementById("selDuration"))==null?void 0:r.value)||"24");try{const l=await p.listAuction(d,y,m,g);o(l.message,"success"),t.player=l.player,k(),t._auctionTab="mine",await f()}catch(l){o(l.message,"error")}})}f()}function Ht(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;async function d(){try{const f=await p.getDailyQuests(u);t._dailyQuests=f,b()}catch(f){o(f.message,"error")}}function b(){const f=t._dailyQuests||{},v=f.quests||[];f.allCompleted;const h=f.bonusReward;s.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${v.map(c=>{const y=c.quest_info||{},m=c.target>0?Math.min(100,Math.round(c.progress/c.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${c.claimed?"var(--text-dim)":c.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${y.name||c.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${y.difficulty==="Khó"?"var(--red)":y.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${y.difficulty||"?"}</span>
              </div>
              ${c.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':c.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${c.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${c.progress}/${c.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${y.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${m}%;background:${c.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${y.goldReward||0} · ✨ ${y.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${h?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${h.gold} 💎, +${h.xp} EXP</div>
      </div>
      `:""}
    `,s.querySelectorAll(".btn-claim").forEach(c=>c.addEventListener("click",async()=>{try{const y=await p.claimDailyQuest(u,parseInt(c.dataset.qid));o(y.message,"success"),t.player=y.player,k(),await d()}catch(y){o(y.message,"error")}}))}d()}function Nt(s,a){const{state:t,api:p,notify:o,updateSidebar:k}=a,u=t.playerId;async function d(){try{t._worldBoss=await p.getWorldBoss(),b()}catch(f){o(f.message,"error")}}function b(){var g;const f=t._worldBoss||{},v=f.boss||{},h=f.hpPercent||0,c=f.topContributors||[],y=f.rewards||{},m=v.status==="active"&&v.current_hp>0;s.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${m?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${v.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${v.level||"?"} · ${m?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(v.current_hp||0).toLocaleString()} / ${(v.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${h}%;background:${h>50?"var(--red)":h>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${m?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${y.gold||0} · ✨ ${y.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':c.map((e,i)=>{var r;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${i<3?"var(--gold)":"var(--text-dim)"}">#${i+1}</span>
                <span style="flex:1">${e.name}</span>
                <span style="color:var(--red)">${(r=e.total_damage)==null?void 0:r.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${e.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const e=document.getElementById("btnAttackBoss");e.disabled=!0,e.textContent="⏳ Đang giao chiến...";const i=document.getElementById("bossCombatResult");try{const r=await p.attackWorldBoss(u);if(t.player=r.player,k(),r.log&&r.log.length>0){const l=r.log.map(T=>T.startsWith("---")?`<div class="turn">${T}</div>`:T.includes("hụt")?`<div class="miss">${T}</div>`:T.includes("né được")?`<div class="dodge">${T}</div>`:T.includes("CHÍNH MẠNG")||T.includes("💥")?`<div class="crit">${T}</div>`:T.includes("🔥")?`<div class="heavy text-orange">${T}</div>`:T.includes("chặn hoàn toàn")||T.includes("🛡")?`<div class="dodge">${T}</div>`:T.includes("ngã xuống")||T.includes("💀")?`<div class="death">${T}</div>`:T.includes("Chiến thắng")||T.includes("🏆")?`<div class="victory">${T}</div>`:T.includes("bỏ chạy")||T.includes("🏃")?`<div class="flee">${T}</div>`:T.includes("Bất phân")||T.includes("🤝")?`<div class="stalemate">${T}</div>`:T.includes("🧪")?`<div class="status-effect text-purple">${T}</div>`:T.includes("💔")?`<div class="dot-damage text-purple bold">${T}</div>`:T.includes("✨")?`<div class="regen text-green">${T}</div>`:`<div class="hit">${T}</div>`).join(""),n={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},x=n[r.outcome]||n.loss,$=Math.max(0,t.player.currentHp/t.player.maxHp*100);i.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${x.icon} ${x.text}
                <span class="subtitle">${r.turns}/${r.maxTurns||25} lượt · ⚔️ ${r.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${x.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${t.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${$}%"></div></div>
                    <div class="mini-hp-val">${t.player.currentHp}/${t.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${v.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(r.bossHp/r.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${r.bossHp.toLocaleString()}/${r.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${l}</div>
            </div>`}r.defeated?o(r.message,"success"):o(`⚔️ ${r.damage} dmg!`,"info"),await d()}catch(r){o(r.message,"error"),e.disabled=!1,e.textContent="⚔️ Tấn Công"}})}d()}function Bt(s,a){const{state:t,api:p,notify:o,updateSidebar:k,renderGame:u}=a,d=t.playerId,b={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function f(){var h;try{const[c,y]=await Promise.all([p.getGachaPools(),p.getGachaPity(d)]);t._gacha={pools:c.pools||{},pity:y.pity||{},results:((h=t._gacha)==null?void 0:h.results)||[]},v()}catch(c){o(c.message,"error")}}function v(){const h=t._gacha||{},c=h.pools||{},y=h.pity||{},m=h.results||[];s.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(c).map(([g,e])=>{var r,l,n;const i=y[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${e.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${b.legendary}">★ ${(r=e.rates)==null?void 0:r.legendary}%</span> ·
                <span style="color:${b.rare}">◆ ${(l=e.rates)==null?void 0:l.rare}%</span> ·
                <span style="color:${b.uncommon}">● ${(n=e.rates)==null?void 0:n.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${i.pulls_since_rare||0}/${e.pityRare} · Legend: ${i.pulls_since_legendary||0}/${e.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="1">💎 ${e.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="10">💎 ${e.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${m.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${m.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${m.map(g=>{var e,i,r,l;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${b[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((e=g.item)==null?void 0:e.slot)==="weapon"?"⚔️":((i=g.item)==null?void 0:i.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${b[g.rarity]}">${((r=g.item)==null?void 0:r.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((l=g.item)==null?void 0:l.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,s.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const e=g.dataset.pool,i=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const r=await p.gachaPull(t.playerId,e,i);o(r.message,"success"),t.player=r.player,k(),t._gacha.results=r.results||[],t._gacha.pity[e]=r.pity,v()}catch(r){o(r.message,"error"),g.disabled=!1}}))}f()}function _t(s,a){const{state:t,api:p,notify:o}=a,k=t._lbTab||"level";async function u(){try{t._lbData=await p.getLeaderboard(k),d()}catch(b){o(b.message,"error")}}function d(){const f=(t._lbData||{}).rankings||[],v={level:"📊 Level",gold:"💰 Linh Thạch",pvp:"⚔️ PvP",guild:"🏯 Tông Môn"};s.innerHTML=`
      <div class="page-header">
        <h2>🏆 Bảng Xếp Hạng</h2>
        <p class="page-sub">Top 50 người chơi và guild.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        ${Object.entries(v).map(([h,c])=>`<button class="btn ${k===h?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="${h}">${c}</button>`).join("")}
      </div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${k==="guild"?f.map((h,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1">
                <strong>[${h.tag}] ${h.name}</strong>
                <span style="opacity:0.4"> Lv${h.level}</span>
              </span>
              <span style="opacity:0.4">${h.members}/${h.max_members} 👤</span>
              <span style="color:var(--gold);margin-left:8px">💰 ${parseInt(h.treasury||0).toLocaleString()}</span>
            </div>
          `).join(""):k==="pvp"?f.map((h,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1"><strong>${h.name}</strong> <span style="opacity:0.4">Lv${h.level}</span></span>
              <span style="color:var(--blue)">${h.rating} ELO</span>
              <span style="opacity:0.4;margin-left:6px">${h.wins}W/${h.losses}L</span>
            </div>
          `).join(""):f.map((h,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1"><strong>${h.name}</strong></span>
              ${k==="level"?`<span>Lv${h.level}</span>`:""}
              <span style="color:var(--gold);margin-left:8px">💎 ${parseInt(h.gold||0).toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,s.querySelectorAll(".tab-btn").forEach(h=>h.addEventListener("click",()=>{t._lbTab=h.dataset.tab,u()}))}u()}const E={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},at=document.getElementById("app"),J={get state(){return E},api:q,notify:z,renderGame:H,updateSidebar:Gt};async function zt(){const s=localStorage.getItem("playerId");if(s&&!E.playerId)try{const a=await q.getPlayer(s);E.playerId=s,E.player=a.player,await V(),H();return}catch{localStorage.removeItem("playerId")}E.playerId?H():nt()}function nt(){var a,t;const s=E.authTab||"login";at.innerHTML=`
    <div class="intro-page">
      <div class="intro-box">
        <div class="title">NGHỊCH THIÊN KÝ</div>
        <div class="intro-text">Thế giới này vận hành theo quy luật tuyệt đối.
Không ai có thể vượt qua.

...Cho đến khi hệ thống xuất hiện lỗi.</div>

        <div class="auth-tabs">
          <button class="btn btn--sm ${s==="login"?"btn--blue":"btn--dark"}" data-auth="login">Đăng nhập</button>
          <button class="btn btn--sm ${s==="register"?"btn--blue":"btn--dark"}" data-auth="register">Đăng ký</button>
        </div>

        ${s==="login"?`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(p=>{p.addEventListener("click",()=>{E.authTab=p.dataset.auth,nt()})}),(a=document.getElementById("btnLogin"))==null||a.addEventListener("click",async()=>{const p=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value;if(!p||!o)return z("Vui lòng nhập đầy đủ","error");try{const k=await q.login(p,o);E.playerId=k.id,E.player=k.player,localStorage.setItem("playerId",k.id),z(k.message,"success"),await V(),H()}catch(k){z(k.message||"Đăng nhập thất bại!","error")}}),(t=document.getElementById("btnRegister"))==null||t.addEventListener("click",async()=>{var d,b;const p=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value,k=((d=document.getElementById("inpName"))==null?void 0:d.value.trim())||"Vô Danh",u=((b=document.querySelector('input[name="gender"]:checked'))==null?void 0:b.value)||"male";if(!p||!o)return z("Vui lòng nhập đầy đủ","error");try{const f=await q.register(p,o,k,u);E.playerId=f.id,E.player=f.player,localStorage.setItem("playerId",f.id),z(f.message,"success"),await V(),H()}catch(f){z(f.message||"Đăng ký thất bại!","error")}})}function st(s){const a=Math.floor(Date.now()/1e3),t=[];return s.hospitalUntil&&s.hospitalUntil>a&&t.push({icon:"🏥",label:"Tịnh dưỡng",endTime:s.hospitalUntil,color:"var(--red)"}),s.medCooldownUntil&&s.medCooldownUntil>a&&t.push({icon:"💊",label:"Đan độc",endTime:s.medCooldownUntil,color:"var(--orange)"}),s.jailUntil&&s.jailUntil>a&&t.push({icon:"⛓️",label:"Ngục tù",endTime:s.jailUntil,color:"var(--purple)"}),s.travelArrivesAt&&s.travelArrivesAt>a&&t.push({icon:"🚶",label:"Di chuyển",endTime:s.travelArrivesAt,color:"var(--blue)"}),t.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${t.map(p=>{const o=Math.max(0,p.endTime-a),k=Math.floor(o/60),u=o%60,d=k>0?`${k}p${String(u).padStart(2,"0")}s`:`${u}s`;return`<span class="status-icon" data-end="${p.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${p.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${p.color};white-space:nowrap;
      " title="${p.label}">${p.icon} <span class="cd-time">${d}</span></span>`}).join("")}
  </div>`}let G=null;function Ot(){G&&clearInterval(G),G=setInterval(()=>{const s=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(a=>{const t=parseInt(a.dataset.end),p=Math.max(0,t-s);if(p<=0){a.remove();return}const o=Math.floor(p/60),k=p%60,u=a.querySelector(".cd-time");u&&(u.textContent=o>0?`${o}p${String(k).padStart(2,"0")}s`:`${k}s`)}),document.querySelectorAll(".status-effects").forEach(a=>{a.children.length===0&&a.remove()})},1e3)}function it(s){let a="";const p={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[s.currentArea];return p&&(a+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${p.tooltip}">${p.icon} Cảnh Vực</span>`),s.combatBuffs&&s.combatBuffs.length>0&&s.combatBuffs.forEach(o=>{let k="💊",u="Buff";o.type==="status"&&o.stat==="poison"?(k="☠️",u="Trúng Độc"):o.type==="status"&&o.stat==="confuse"?(k="👹",u="Ma Hóa"):o.stat==="allStats"||o.stat==="hp"||o.stat==="damage"?(k="🔥",u="Cuồng Nộ"):o.stat==="defense"||o.stat==="resist"?(k="🛡️",u="Kiên Cố"):o.stat==="speed"||o.stat==="dexterity"?(k="💨",u="Thân Pháp"):(k="✨",u="Cường Hóa");let d=o.duration?` (-${o.duration} Trận)`:"",b=`Hiệu ứng: ${o.stat} (${o.type} ${o.value})${o.duration?` - Còn lại: ${o.duration} Trận đấu`:""}`;a+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${b}">${k} ${u}${d}</span>`}),a?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${a}</div>`:""}function H(){var h,c,y,m,g,e,i,r,l;const s=E.player;if(!s)return;const a=Math.max(0,s.currentHp/s.maxHp*100),t=s.maxStamina>0?Math.max(0,s.currentStamina/s.maxStamina*100):0,p=s.maxEnergy>0?Math.max(0,s.currentEnergy/s.maxEnergy*100):0,o=(s.maxNerve??15)>0?Math.max(0,(s.nerve??0)/(s.maxNerve??15)*100):0,k=E.exploration?E.exploration[s.currentArea||"thanh_lam_tran"]:null,u=k?k.name:"Khám Phá";at.innerHTML=`
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
          <div class="player-name">${s.name}</div>
          ${s.activeTitle?`<div style="font-size:10px;color:var(--gold);font-weight:600;letter-spacing:0.5px;margin-top:1px">『${s.activeTitle}』</div>`:""}
          <div class="player-meta">Lv.${s.level} · ${((h=s.realmInfo)==null?void 0:h.fullName)||"?"}</div>
          ${st(s)}
          ${it(s)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${s.currentHp}/${s.maxHp}
                ${s.currentHp<s.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(c=s.skills)!=null&&c.some(n=>n.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${a}%" data-low="${a<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${s.currentStamina??100}/${s.maxStamina??100}
                ${(s.currentStamina??100)<(s.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((y=s.stats)==null?void 0:y.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${t}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${s.currentEnergy}/${s.maxEnergy}
                ${s.currentEnergy<s.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((m=s.stats)==null?void 0:m.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${p}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${s.nerve??0}/${s.maxNerve??15}${(s.nerve??0)<(s.maxNerve??15)?'<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+1/5min</span>':""}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${o}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${s.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${E.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(s.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
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
            📍 ${u} ${s.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':s.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(s.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <li class="nav-section">TỰ THÂN</li>
          <li class="nav-item ${E.currentPage==="stats"?"active":""}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${(e=(g=E.player)==null?void 0:g.realmInfo)!=null&&e.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="inventory"?"active":""}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(s.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)">⏳</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="education"?"active":""}" data-page="education">
            <span class="icon">🧘</span> Công Pháp
          </li>
          <li class="nav-item ${E.currentPage==="skills"?"active":""}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>


          <li class="nav-item ${["travel","dungeon","tiencanh"].includes(E.currentPage)?"active":""}" data-page="travel">
            <span class="icon">🚶</span> Ngao Du
            ${(s.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="quests"||E.currentPage==="dailyquest"?"active":""}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(s.activeQuests||[]).filter(n=>n.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(s.activeQuests||[]).filter(n=>n.status==="active").length}</span>`:""}
          </li>
          <li class="nav-item ${E.currentPage==="crimes"?"active":""}" data-page="crimes">
            <span class="icon">💀</span> Ác Nghiệp
          </li>

          <li class="nav-section">NGAO DU</li>
          <li class="nav-item ${E.currentPage==="combat"?"active":""}" data-page="combat">
            <span class="icon">🔍</span> Khám Phá (${u})
          </li>

          <li class="nav-section">CHIẾN ĐẤU</li>
          <li class="nav-item ${E.currentPage==="arena"?"active":""}" data-page="arena">
            <span class="icon">⚔️</span> Đấu Trường
          </li>
          <li class="nav-item ${E.currentPage==="worldboss"?"active":""}" data-page="worldboss">
            <span class="icon">🐉</span> Boss Thế Giới
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
          <li class="nav-item ${E.currentPage==="gacha"?"active":""}" data-page="gacha">
            <span class="icon">🎰</span> Thiên Cơ Đài
          </li>

          ${s.role==="admin"?`
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(n=>{n.addEventListener("click",()=>{E.currentPage=n.dataset.page,H()})}),(i=document.getElementById("btnFabChat"))==null||i.addEventListener("click",()=>D("chat")),(r=document.getElementById("btnFabSocial"))==null||r.addEventListener("click",()=>D("social"));const d=document.querySelector('.sidebar-gold .nav-item[data-page="events"]');d&&d.addEventListener("click",n=>{n.stopPropagation(),E.currentPage="events",E.popupOpen=!1,H()}),(l=document.getElementById("btnPopupClose"))==null||l.addEventListener("click",()=>{E.popupOpen=!1,H()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(n=>{n.addEventListener("click",()=>D(n.dataset.popup))}),At(),E.popupOpen&&Rt();const b=document.getElementById("searchPlayerInput"),f=document.getElementById("searchResults");let v=null;b&&f&&(b.addEventListener("input",()=>{clearTimeout(v);const n=b.value.trim();if(n.length<2){f.style.display="none";return}v=setTimeout(async()=>{try{const x=await q.searchPlayers(n),$=x.players||x.results||[];$.length===0?f.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':f.innerHTML=$.map(T=>{var w;return`
              <div class="search-result" data-pid="${T.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${T.name} <span style="opacity:0.4">Lv.${T.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((w=T.realmInfo)==null?void 0:w.name)||""}</span>
              </div>
            `}).join(""),f.style.display="block",f.querySelectorAll(".search-result").forEach(T=>{T.addEventListener("click",()=>{E.currentPage="profile",E._viewProfileId=T.dataset.pid,f.style.display="none",b.value="",H()}),T.addEventListener("mouseenter",()=>T.style.background="rgba(255,255,255,0.08)"),T.addEventListener("mouseleave",()=>T.style.background="transparent")})}catch{f.style.display="none"}},300)}),b.addEventListener("blur",()=>{setTimeout(()=>{f.style.display="none"},200)}),b.addEventListener("keydown",n=>{n.key==="Escape"&&(f.style.display="none",b.blur())})),Ot()}function D(s){E.popupOpen=!0,E.popupPage=s,H()}function Rt(){const s=document.getElementById("popupContent");s&&(E.popupPage==="chat"?et(s,J):E.popupPage==="social"&&tt(s,J))}const jt={combat:ot,crimes:yt,education:ht,stats:gt,skills:ut,inventory:K,travel:Z,alchemy:F,quests:bt,admin:xt,social:tt,chat:et,market:ft,realm:$t,events:Tt,dungeon:Y,housing:St,wiki:Ct,npcshop:Et,guild:Pt,library:X,profile:Mt,arena:It,auction:qt,dailyquest:Ht,worldboss:Nt,gacha:Bt,leaderboard:_t,tiencanh:wt,tower:Lt};function At(){const s=document.getElementById("pageContent");if(!s)return;const a=jt[E.currentPage];a&&a(s,J)}function Gt(){var k,u,d,b,f;const s=E.player;if(!s)return;const a=Math.max(0,s.currentHp/s.maxHp*100),t=s.maxEnergy>0?Math.max(0,s.currentEnergy/s.maxEnergy*100):0,p=document.querySelector(".sidebar-player");if(p){const v=s.maxStamina>0?Math.max(0,s.currentStamina/s.maxStamina*100):0,h=(s.maxNerve??15)>0?Math.max(0,(s.nerve??0)/(s.maxNerve??15)*100):0;p.innerHTML=`
      <div class="player-name">${s.name}</div>
      <div class="player-meta">Lv.${s.level} · ${((k=s.realmInfo)==null?void 0:k.fullName)||"?"}</div>
      ${st(s)}
      ${it(s)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${s.currentHp}/${s.maxHp}
            ${s.currentHp<s.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(u=s.skills)!=null&&u.some(c=>c.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${a}%" data-low="${a<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${s.currentStamina??100}/${s.maxStamina??100}
            ${(s.currentStamina??100)<(s.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((d=s.stats)==null?void 0:d.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${v}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${s.currentEnergy}/${s.maxEnergy}
            ${s.currentEnergy<s.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((b=s.stats)==null?void 0:b.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${t}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label"><span>💀 Nghịch Khí</span><span>${s.nerve??0}/${s.maxNerve??15}</span></div>
        <div class="bar-track"><div class="bar-fill nerve" style="width:${h}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${s.gold??0} Linh Thạch</div>`}const o=document.querySelector('.nav-item[data-page="stats"]');if(o){let v="";s.statPoints>0&&(v+=`<span class="badge">${s.statPoints}</span>`),(f=s.realmInfo)!=null&&f.canBreakthrough&&(v+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),o.querySelectorAll(".badge").forEach(h=>h.remove()),o.insertAdjacentHTML("beforeend",v)}}async function V(){try{const[s,a,t,p,o,k]=await Promise.all([q.getMonsters(),q.getSkills(),q.getItems(),q.getMedicines(),q.getCrimes(),q.getEducation()]);E.monsters=s.monsters||[],E.skills=a.skills||[],E.items=t.items||[],E.medicines=p.medicines||[],E.crimes=o.crimes||[],E.educationTrees=k.trees||[],E.exploration=await q.getExploration(),E.recipes=(await q.getRecipes()).recipes,E.npcs=(await q.getNpcs()).npcs||[]}catch(s){console.error("Lỗi tải dữ liệu:",s)}}function z(s,a="info"){var p;(p=document.querySelector(".notification"))==null||p.remove();const t=document.createElement("div");t.className=`notification ${a}`,t.textContent=s,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}zt();
//# sourceMappingURL=index-BRGN8SsN.js.map
