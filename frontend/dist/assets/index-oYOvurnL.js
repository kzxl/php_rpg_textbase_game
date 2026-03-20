(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))p(c);new MutationObserver(c=>{for(const k of c)if(k.type==="childList")for(const u of k.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&p(u)}).observe(document,{childList:!0,subtree:!0});function t(c){const k={};return c.integrity&&(k.integrity=c.integrity),c.referrerPolicy&&(k.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?k.credentials="include":c.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function p(c){if(c.ep)return;c.ep=!0;const k=t(c);fetch(c.href,k)}})();const lt="/api";class ot{async request(a,t={}){try{const p=await fetch(`${lt}${a}`,{headers:{"Content-Type":"application/json",...t.headers},...t}),c=await p.json();if(!p.ok)throw new Error(c.error||`HTTP ${p.status}`);return c}catch(p){throw console.error(`API Error [${a}]:`,p),p}}register(a,t,p,c){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:a,password:t,name:p,gender:c})})}login(a,t){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:a,password:t})})}createPlayer(a,t){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:a,gender:t})})}getPlayer(a){return this.request(`/player/${a}`)}allocateStat(a,t,p=1){return this.request(`/player/${a}/allocate`,{method:"POST",body:JSON.stringify({stat:t,points:p})})}equipItem(a,t){return this.request(`/player/${a}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}learnSkill(a,t){return this.request(`/player/${a}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:t})})}equipSkill(a,t,p=!0){return this.request(`/player/${a}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:t,equip:p})})}healPlayer(a){return this.request(`/player/${a}/heal`,{method:"POST"})}useMedicine(a,t){return this.request(`/player/${a}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}trainStat(a,t){return this.request(`/player/${a}/train`,{method:"POST",body:JSON.stringify({stat:t})})}fullCombat(a,t=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:a,monsterId:t})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(a,t){return this.request(`/player/${a}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}useItem(a,t){return this.request(`/player/${a}/use`,{method:"POST",body:JSON.stringify({itemId:t})})}useMedicine(a,t){return this.request(`/player/${a}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}generateItem(a,t){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,playerId:a})})}trainStat(a,t,p=1){return this.request(`/player/${a}/train`,{method:"POST",body:JSON.stringify({stat:t,count:p})})}allocateStat(a,t){return this.request(`/player/${a}/allocate`,{method:"POST",body:JSON.stringify({stat:t})})}attemptBreakthrough(a){return this.request(`/player/${a}/breakthrough`,{method:"POST"})}getRealm(a){return this.request(`/player/${a}/realm`)}craftItem(a,t){return this.request(`/player/${a}/craft`,{method:"POST",body:JSON.stringify({recipeId:t})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(a,t,p,c=-1){return this.request(`/player/${a}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:p,lockAffixIndex:c})})}commitCrime(a,t){return this.request(`/player/${a}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:t})})}escapeJail(a){return this.request(`/player/${a}/escape-jail`,{method:"POST"})}bail(a){return this.request(`/player/${a}/bail`,{method:"POST"})}enrollNode(a,t,p){return this.request(`/player/${a}/enroll`,{method:"POST",body:JSON.stringify({nodeId:t,treeId:p})})}checkEducation(a){return this.request(`/player/${a}/check-education`,{method:"POST"})}generateItem(a="common",t=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:a,slot:t})})}explore(a){return this.request(`/player/${a}/explore`,{method:"POST"})}trackMonster(a,t){return this.request(`/player/${a}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:t})})}getAreaMonsters(a){return this.request(`/player/${a}/area-monsters`)}getNpc(a){return this.request(`/npc/${a}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(a,t,p){return this.request(`/player/${a}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:t,questId:p})})}completeQuest(a,t){return this.request(`/player/${a}/complete-quest`,{method:"POST",body:JSON.stringify({questId:t})})}getQuests(a){return this.request(`/player/${a}/quests`)}searchPlayers(a){return this.request(`/players/search?q=${encodeURIComponent(a)}`)}getRelationships(a){return this.request(`/player/${a}/relationships`)}interactPlayer(a,t,p,c){return this.request(`/player/${a}/interact`,{method:"POST",body:JSON.stringify({targetId:t,action:p,amount:c})})}addFriend(a,t){return this.request(`/player/${a}/add-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}acceptFriend(a,t){return this.request(`/player/${a}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}rejectFriend(a,t){return this.request(`/player/${a}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}removeFriend(a,t){return this.request(`/player/${a}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}addEnemy(a,t){return this.request(`/player/${a}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}removeEnemy(a,t){return this.request(`/player/${a}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}getGlobalChat(a=0){return this.request(`/chat/global?afterId=${a}`)}getPrivateChat(a,t,p=0){return this.request(`/chat/private/${a}?with=${t}&afterId=${p}`)}getChatFriends(a){return this.request(`/chat/friends/${a}`)}sendChat(a,t,p,c){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:a,channel:t,receiverId:p,message:c})})}getMarketListings(a="",t="newest"){const p=new URLSearchParams;return a&&p.set("type",a),t&&p.set("sort",t),this.request(`/market?${p.toString()}`)}getMyListings(a){return this.request(`/market/my/${a}`)}listForSale(a,t,p,c,k){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:a,itemType:t,itemId:p,quantity:c,price:k})})}buyFromMarket(a,t,p=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:a,listingId:t,quantity:p})})}cancelListing(a,t){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:a,listingId:t})})}getRealmInfo(a){return this.request(`/player/${a}/realm`)}attemptBreakthrough(a){return this.request(`/player/${a}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(a){return this.request(`/player/${a}/mug-targets`)}mugPlayer(a,t){return this.request(`/player/${a}/mug`,{method:"POST",body:JSON.stringify({victimId:t})})}getMugLog(a){return this.request(`/player/${a}/mug-log`)}getMapItems(a){return this.request(`/player/${a}/map-items`)}enterDungeon(a,t){return this.request(`/player/${a}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:t})})}fightDungeonWave(a){return this.request(`/player/${a}/dungeon/fight`,{method:"POST"})}abandonDungeon(a){return this.request(`/player/${a}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(a){return this.request(`/player/${a}/dungeon/history`)}getHousing(a){return this.request(`/player/${a}/housing`)}buyHousing(a){return this.request(`/player/${a}/housing/buy`,{method:"POST"})}plantHerb(a,t,p){return this.request(`/player/${a}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:t,slotIndex:p})})}harvestGarden(a){return this.request(`/player/${a}/housing/harvest`,{method:"POST"})}upgradeFormation(a,t){return this.request(`/player/${a}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:t})})}payMaintenance(a){return this.request(`/player/${a}/housing/maintenance`,{method:"POST"})}listForRent(a,t){return this.request(`/player/${a}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:t})})}getRentals(){return this.request("/housing/rentals")}rentRoom(a,t){return this.request(`/player/${a}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:t})})}getMyGuild(a){return this.request(`/player/${a}/guild`)}createGuild(a,t,p,c){return this.request(`/player/${a}/guild/create`,{method:"POST",body:JSON.stringify({name:t,tag:p,description:c})})}contributeGuild(a,t){return this.request(`/player/${a}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:t})})}upgradeGuild(a){return this.request(`/player/${a}/guild/upgrade`,{method:"POST"})}joinGuild(a,t){return this.request(`/player/${a}/guild/join`,{method:"POST",body:JSON.stringify({guildId:t})})}leaveGuild(a){return this.request(`/player/${a}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(a){return this.request(`/guild/${a}/upkeep`,{method:"POST"})}getTribulation(a){return this.request(`/player/${a}/tribulation`)}fightTribulation(a){return this.request(`/player/${a}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(a,t,p,c=-1){return this.request(`/player/${a}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:p,lockAffixIndex:c})})}getShops(a){return this.request("/shops")}buyFromShop(a,t,p,c=1){return this.request(`/player/${a}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:t,itemId:p,quantity:c})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(a){return this.request(`/players/lookup?q=${encodeURIComponent(a)}`)}getPlayerProfile(a){return this.request(`/player/${a}/profile`)}getArena(a){return this.request(`/player/${a}/arena`)}arenaFight(a){return this.request(`/player/${a}/arena/fight`,{method:"POST"})}getAuctions(a=""){return this.request(`/auction${a?"?q="+encodeURIComponent(a):""}`)}getMyAuctions(a){return this.request(`/player/${a}/auction/mine`)}listAuction(a,t,p,c=24){return this.request(`/player/${a}/auction/list`,{method:"POST",body:JSON.stringify({itemId:t,buyoutPrice:p,durationHours:c})})}buyAuction(a,t){return this.request(`/player/${a}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:t})})}cancelAuction(a,t){return this.request(`/player/${a}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:t})})}getDailyQuests(a){return this.request(`/player/${a}/daily-quests`)}claimDailyQuest(a,t){return this.request(`/player/${a}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:t})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(a){return this.request(`/player/${a}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(a){return this.request(`/player/${a}/gacha/pity`)}gachaPull(a,t,p=1){return this.request(`/player/${a}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:t,pulls:p})})}getLeaderboard(a){return this.request(`/leaderboard/${a}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(a){return this.request(`/events/quick/${a}`,{method:"POST"})}}const q=new ot;function ct(r,a){var g;const{state:t,api:p,notify:c,renderGame:k,updateSidebar:u}=a,l=t.player,b=t.exploration?t.exploration[l.currentArea||"thanh_lam_tran"]:null,$=b?b.name:"Vùng Đất Vô Danh",v=b?b.staminaCost:10;r.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${$}</h1>
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
    </div>`;const x=((g=l.insightLevels)==null?void 0:g.monster)??0;(async()=>{try{const n=await p.getAreaMonsters(l.id);if(n.monsters){t.player.trackedMonsters=n.monsters;const e=document.getElementById("trackedMonstersList");if(!e)return;if(n.monsters.length===0){e.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}e.innerHTML=n.monsters.map(d=>{var I,M,P,N,R;const s=d.currentHp/d.stats.hp*100,h=s>60?"var(--green)":s>30?"var(--orange)":"var(--red)";let f='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';x>=1&&(f=`<div class="item-desc text-sm text-dim mb-sm">${d.description||"Yêu thú vùng này."}</div>`);let T="";x>=1&&(T=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${s}%; background: ${h}; height: 100%;"></div>
            </div>`);let w=x>=2?`❤ ${d.currentHp}/${d.stats.hp}`:x>=1?"❤ ???":"",L="";x>=3&&(L=`
              <span class="text-orange">💪 ${d.stats.strength}</span>
              <span class="text-cyan">🏃 ${d.stats.speed}</span>
              <span class="text-green">🎯 ${d.stats.dexterity}</span>
              <span class="text-blue">🛡 ${d.stats.defense}</span>`);let E="";x>=4&&d.drops&&d.drops.length>0&&(E=`<div class="text-xs text-dim mt-sm" style="display:flex;gap:4px;flex-wrap:wrap;">
              📦 ${d.drops.map(_=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:9px;padding:1px 4px;">${_.id} (${x>=5?_.chance+"%":"?%"})</span>`).join("")}
            </div>`);let S="";if(x>=5){const _=((I=d.goldReward)==null?void 0:I[0])??((M=d.goldReward)==null?void 0:M.min)??"?",B=((P=d.goldReward)==null?void 0:P[1])??((N=d.goldReward)==null?void 0:N.max)??"?";S=`<span class="text-gold">💰 ${_}-${B}</span> <span class="text-purple">✨ ${d.xpReward??"?"} XP</span>`}return`
            <div class="list-item flex flex-col items-start gap-4">
              <div class="item-info" style="width: 100%;">
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-name text-lg">${d.name} <span class="text-xs text-dim">(${((R=d.instance_id)==null?void 0:R.substring(0,8))??""})</span></div>
                  <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${d.instance_id}" data-mid="${d.id}">Giao Chiến</button>
                </div>
                ${f}
                ${T}
                <div class="item-meta flex gap-4 text-xs flex-wrap">
                  ${w?`<span class="text-red">${w}</span>`:""}
                  ${L}
                  ${S}
                </div>
                ${E}
              </div>
            </div>`}).join(""),e.querySelectorAll(".btn-attack-tracked").forEach(d=>{d.addEventListener("click",s=>{const h=s.currentTarget;W(a,h.dataset.mid,h.dataset.inst)})})}}catch(n){console.error("Lỗi tải dấu vết:",n)}})(),(async()=>{const n=document.getElementById("areaMonstersList");if(n)try{const e=await p.getAreaMonsters(l.id),i=t.exploration?t.exploration[l.currentArea||"thanh_lam_tran"]:null,d=(t.monsters||[]).filter(h=>!h.isWorldBoss&&!h.is_world_boss),s=d.length>0?d:[];if(s.length===0){n.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không rõ quần thể yêu thú nơi đây.</div>';return}n.innerHTML=s.map(h=>{let f='<div class="item-desc text-sm text-dim mb-sm">Thông tin mờ ảo...</div>';return x>=1&&(f=`<div class="item-desc text-sm text-dim mb-sm">${h.description||"Yêu thú sinh sống tại vùng này."}</div>`),`
          <div class="list-item flex flex-col items-start gap-4" style="opacity: 0.8;">
            <div class="item-info" style="width: 100%;">
              <div class="item-name text-md text-gold">${h.name} <span class="text-xs text-dim ml-sm">${h.tierName||""}</span></div>
              ${f}
            </div>
          </div>
        `}).join("")}catch(e){console.error("Lỗi tải quần thể:",e)}})();const m=document.getElementById("btnExplore");m&&m.addEventListener("click",()=>pt(a)),r.querySelectorAll(".list-item.clickable").forEach(n=>{n.addEventListener("click",()=>startCombat(n.dataset.mid,a))})}async function pt(r){var u,l,b;const{state:a,api:t,notify:p,updateSidebar:c}=r,k=document.getElementById("exploreResult");if(k){k.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const $=await t.explore(a.playerId);a.player=$.player,c();const v=$.event;let x=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(v.type==="monster")x+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${v.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${v.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${v.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(v.type==="monster_ambush"&&v.combatResult){const o=v.combatResult,y=(o.log||[]).map(n=>n.startsWith("---")?`<div class="turn">${n}</div>`:n.includes("hụt")?`<div class="miss">${n}</div>`:n.includes("CHÍNH MẠNG")||n.includes("💥")?`<div class="crit">${n}</div>`:n.includes("ngã xuống")||n.includes("💀")?`<div class="death">${n}</div>`:n.includes("Chiến thắng")||n.includes("🏆")?`<div class="victory">${n}</div>`:`<div class="hit">${n}</div>`).join(""),m=o.outcome==="win"?"🏆 Chiến thắng!":o.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",g=o.outcome==="win"?"var(--green)":o.outcome==="loss"?"var(--red)":"var(--orange)";x+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${v.message}</div>
        <div style="font-size:16px;font-weight:700;color:${g};margin-bottom:12px">${m}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${y}</div>
      `}else if(v.type==="worldBoss")x+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${v.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ mạnh!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${v.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${v.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(v.type==="npc"&&v.npcId){if(x+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${v.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
        <div class="text-sm text-dim mb-md" style="font-style:italic;">"${v.greeting}"</div>
      `,v.studyEffect){const o=v.studyEffect,y=o.isDebuff?"var(--red)":"var(--gold)";x+=`<div class="text-sm mt-sm" style="color:${y};animation:fadeIn 0.5s;">
          ${o.message}
        </div>`}v.hasQuests&&(x+=`<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${v.npcId}">💬 Nói Chuyện</button>`),x+='<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>',x+="</div></div>",x+='<div id="npcQuestModal"></div>'}else v.type==="player_encounter"&&v.player?x+=`
        <div style="font-size: 48px; margin-bottom: 8px;">👤</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
        <div class="text-sm text-dim mb-md">Âm thầm lướt qua hay chủ động giao hảo?</div>
        <div class="flex gap-2 justify-center mt-md w-full" style="flex-wrap:wrap">
          <button class="btn btn--blue flex-1" id="btnInteractFriend" data-pid="${v.player.id}">🤝 Kết Giao</button>
          <button class="btn btn--gold flex-1" id="btnInteractGift" data-pid="${v.player.id}">💎 Tặng 100 LT</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${v.player.id}">⚔️ Cướp Linh Thạch</button>
        </div>
      `:v.type==="npc"?x+=`
        <div style="font-size: 32px; margin-bottom: 8px;">👴</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
      `:v.type==="material"||v.type==="item"?(x+=`
        <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
        <div class="text-lg text-green bold mb-sm">${v.message}</div>
      `,v.questNotifications&&v.questNotifications.length>0&&v.questNotifications.forEach(o=>{x+=`<div class="text-sm text-gold mt-sm" style="animation: fadeIn 0.5s;">🏷️ ${o.message}</div>`})):x+=`
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${v.message}</div>
      `;v.type!=="monster"&&v.type!=="worldBoss"&&!(v.type==="npc"&&v.npcId)&&(x+='<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục hành trình</button>'),v.type==="npc"&&v.npcId||(x+="</div></div>"),k.innerHTML=x,v.type==="player_encounter"&&v.player&&(document.getElementById("btnInteractFriend").addEventListener("click",async o=>{try{const y=await t.addFriend(a.playerId,o.target.dataset.pid);(y.success||y.message)&&p(y.message||"Đã gửi lời mời!","success")}catch(y){p(y.message,"error")}}),document.getElementById("btnInteractGift").addEventListener("click",async o=>{var y;try{const m=await t.interactPlayer(a.playerId,o.target.dataset.pid,"gift",100);if(m.player){a.player=m.player,c(),p(m.message,"success");const g=o.target.closest(".panel-body");g&&(g.innerHTML='<div class="text-green text-lg mb-md">Đã bồi đắp hảo cảm!</div><button class="btn btn--blue" id="btnExploreContinueAfterGift">Rời đi</button>'),(y=document.getElementById("btnExploreContinueAfterGift"))==null||y.addEventListener("click",()=>{k.innerHTML=""})}}catch(m){p(m.message,"error")}}),(u=document.getElementById("btnInteractMug"))==null||u.addEventListener("click",async o=>{var m;const y=o.target.dataset.pid;o.target.disabled=!0,o.target.textContent="⏳ Đang tấn công...";try{const g=await t.request(`/player/${a.playerId}/mug`,{method:"POST",body:JSON.stringify({victimId:y})});a.player=g.player,c();const n=o.target.closest(".panel-body");if(n){const e=g.success?"var(--green)":"var(--red)",i=g.success?"💰":"💀";n.innerHTML=`
              <div style="font-size:36px;margin-bottom:8px">${i}</div>
              <div style="color:${e};font-size:16px;font-weight:700;margin-bottom:8px">${g.message}</div>
              ${g.goldStolen>0?`<div class="text-gold">+${g.goldStolen} 💎 Linh Thạch</div>`:""}
              <div style="font-size:11px;opacity:0.5;margin-top:8px">Tỉ lệ: ${g.successChance}%</div>
              <button class="btn btn--blue mt-md" id="btnExploreContinueAfterMug">Tiếp tục</button>
            `,(m=document.getElementById("btnExploreContinueAfterMug"))==null||m.addEventListener("click",()=>{k.innerHTML=""})}p(g.message,g.success?"success":"error")}catch(g){p(g.message,"error"),o.target.disabled=!1,o.target.textContent="⚔️ Cướp Linh Thạch"}})),(v.type==="monster"||v.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",o=>{k.innerHTML="",W(r,o.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async o=>{try{const y=await t.trackMonster(a.playerId,o.target.dataset.mid);y.success?(p(y.message,"success"),k.innerHTML="",typeof r.renderGame=="function"&&r.renderGame()):y.error&&p(y.error,"error")}catch(y){p("Lỗi theo dõi: "+y.message,"error")}})),v.type==="npc"&&v.npcId&&((l=document.getElementById("btnNpcInteract"))==null||l.addEventListener("click",async()=>{await gt(r,v.npcId,k)})),(b=document.getElementById("btnExploreContinue"))==null||b.addEventListener("click",()=>{k.innerHTML=""})}catch($){k.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${$.message}</div></div>`}}}async function gt(r,a,t){const{state:p,api:c,notify:k,renderGame:u}=r,l=document.getElementById("npcQuestModal")||t;try{const $=(await c.getNpc(a)).npc;if(!$)return;const v=(p.player.activeQuests||[]).map(o=>o.quest_id);let x=$.quests.map(o=>{const y=v.includes(o.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${o.name}</span>
            <span class="text-xs badge" style="background:${o.type==="kill"?"var(--red)":"var(--green)"}">${o.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${o.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${o.rewards.gold?o.rewards.gold+"💎 ":""}${o.rewards.xp?o.rewards.xp+"✨ ":""}${o.rewards.skillChance?"🎯 "+o.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${y?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${a}" data-qid="${o.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");l.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${$.icon||"🧓"} ${$.name} <span class="subtitle">${$.profession}</span></div>
        <div class="panel-body">
          ${x||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,l.querySelectorAll(".btn-accept-quest").forEach(o=>{o.addEventListener("click",async()=>{o.disabled=!0,o.textContent="⏳...";try{const y=await c.acceptQuest(p.playerId,o.dataset.npc,o.dataset.qid);p.player=y.player,k(y.message,"success"),u()}catch(y){k(y.message||"Lỗi nhận quest","error"),o.disabled=!1,o.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(b){console.error("NPC load error:",b)}}async function W(r,a,t=null){var $;const{state:p,api:c,notify:k,updateSidebar:u,renderGame:l}=r,b=document.getElementById("combatResult");if(b){if(!p.player.currentHp||p.player.currentHp<=0)return k("Đã kiệt sức! Hãy hồi phục trước.","error");if((p.player.currentEnergy||0)<10&&!p.player.currentEnergy)return k("Không đủ Linh lực!","error");if(p.player.hospitalRemaining>0)return k(`Đang tịnh dưỡng! Còn ${p.player.hospitalRemaining}s`,"error");b.innerHTML='<div class="panel border-red bg-dark"><div class="panel-body text-center text-red">⚔️ Đang giao chiến...</div></div>',b.scrollIntoView({behavior:"smooth"});try{const v=await c.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:p.playerId,monsterId:t?null:a,trackedMonsterId:t})});if(p.player=v.player,v.outcome==="no_energy"){b.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${v.log[0]}</div></div>`,u();return}const x=v.log.map(d=>d.startsWith("---")?`<div class="turn">${d}</div>`:d.includes("linh lực")&&d.includes("+")?`<div class="energy">${d}</div>`:d.includes("linh lực")?`<div class="energy-cost">${d}</div>`:d.includes("kiệt linh")?`<div class="miss">${d}</div>`:d.includes("hụt")?`<div class="miss">${d}</div>`:d.includes("né được")?`<div class="dodge">${d}</div>`:d.includes("CHÍNH MẠNG")||d.includes("💥")?`<div class="crit">${d}</div>`:d.includes("🔥")?`<div class="heavy text-orange">${d}</div>`:d.includes("chặn hoàn toàn")||d.includes("🛡")?`<div class="dodge">${d}</div>`:d.includes("ngã xuống")||d.includes("💀")?`<div class="death">${d}</div>`:d.includes("Chiến thắng")||d.includes("🏆")?`<div class="victory">${d}</div>`:d.includes("Đột phá")||d.includes("🎉")?`<div class="levelup">${d}</div>`:d.includes("bỏ chạy")||d.includes("🏃")?`<div class="flee">${d}</div>`:d.includes("Hết")||d.includes("⏰")?`<div class="stalemate">${d}</div>`:d.includes("Bất phân")||d.includes("🤝")?`<div class="stalemate">${d}</div>`:d.includes("Thoát thân")||d.includes("🚪")?`<div class="flee">${d}</div>`:d.includes("Linh Thạch")||d.includes("💰")?`<div class="gold-reward">${d}</div>`:d.includes("Tịnh dưỡng")||d.includes("🏥")?`<div class="hospital">${d}</div>`:d.includes("🧪")?`<div class="status-effect text-purple">${d}</div>`:d.includes("💔")?`<div class="dot-damage text-purple bold">${d}</div>`:d.includes("✨")?`<div class="regen text-green">${d}</div>`:d.includes("♻️")?`<div class="reflect text-red">${d}</div>`:`<div class="hit">${d}</div>`).join(""),o=v.monster,y=Math.max(0,p.player.currentHp/p.player.maxHp*100),m=Math.max(0,o.currentHp/o.maxHp*100),g={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Thất bại",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},n=g[v.outcome]||g.loss,e=($=v.rewards)!=null&&$.gold?` · +${v.rewards.gold} 💰`:"",i=v.rewards?` · +${v.rewards.xp} XP${e}`:"";b.innerHTML=`
      <div class="panel">
        <div class="panel-title">${n.icon} ${n.text}
          <span class="subtitle">${v.turns}/${v.maxTurns||25} lượt${i}</span>
        </div>
        <div class="panel-body combat-result ${n.cls}">
          <div class="combat-opponents">
            <div class="fighter">
              <div class="f-name player-name">${p.player.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${y}%"></div></div>
              <div class="mini-hp-val">${p.player.currentHp}/${p.player.maxHp}</div>
            </div>
            <div class="vs">VS</div>
            <div class="fighter">
              <div class="f-name monster-name">${o.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${m}%"></div></div>
              <div class="mini-hp-val">${o.currentHp}/${o.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${x}</div>
      </div>`,u(),t&&typeof l=="function"&&setTimeout(()=>l(),1500)}catch(v){b.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${v.message}</div></div>`}}}function X(r,a){const{state:t,api:p,notify:c}=a,k=t.player,u=(k.skills||[]).find(x=>(typeof x=="string"?x:x.id)==="nhan_thuat"),l=u?u.level||1:0,b=[...t.skills].sort((x,o)=>(x.tier||1)-(o.tier||1)),$=(k.skills||[]).map(x=>typeof x=="string"?x:x.id),v={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};r.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${l}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${b.map(x=>{const o=$.includes(x.id),y=x.tier||1,m=y>l+1,g=y<=l;let n="";return x.requirements&&x.requirements.length>0?g||o?n=`<div class="mt-sm text-xs text-orange">Điều kiện: ${x.requirements.map(e=>`<br>• ${e}`).join("")}</div>`:m?n=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${y}.</div>`:n='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':n='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${o?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${x.name} ${o?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${o?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${v[y]||y}</span>
                    <span class="text-xs text-dim">${x.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||o?x.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${x.type!=="passive"&&x.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${x.cost} linh lực</div>`:""}
                
                ${n}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${o?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${m?"btn--dark":"btn--gold"} btn--sm btn-learn" ${m?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${x.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,r.querySelectorAll(".accordion-header").forEach(x=>{x.addEventListener("click",()=>{const o=x.nextElementSibling;o.style.display==="none"?(o.style.display="block",x.querySelector("div:last-child").textContent="▲"):(o.style.display="none",x.querySelector("div:last-child").textContent="▼")})}),r.querySelectorAll(".btn-learn").forEach(x=>{x.addEventListener("click",async o=>{o.stopPropagation();try{const y=await p.learnSkill(k.id,x.dataset.sid);y.error?c(y.error,"error"):(t.player=y.player,c(y.message,"success"),X(r,a))}catch(y){c("Lỗi học kỹ năng: "+y.message,"error")}})})}function ut(r,a){var y,m,g;const{state:t,api:p,notify:c,renderGame:k}=a,u=t.player,l=u.stats,b=u.allocatedStats||{},$=5,v=u.currentEnergy>=$&&!u.hospitalRemaining,x=u.talentDisplay||{},o=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];r.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${u.currentEnergy}/${u.maxEnergy} linh lực · Chi phí: ${$}/lần</span>
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
          ${o.map(([n,e,i])=>{const d=x[n]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${d.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${e}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${i}</div>
                <div style="font-size:14px;font-weight:700;color:${d.color};margin-top:4px">${d.icon} ${d.name}</div>
                <div style="font-size:11px;color:${d.color};opacity:0.8">×${d.value} hệ số</div>
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
        ${o.map(([n,e,i,d])=>{const s=x[n]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},h=Math.floor(u.currentEnergy/$)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${e}</span> ${i}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${d}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${l[n]??0}</span>
              ${b[n]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${b[n]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${s.color};min-width:50px" title="Căn Cốt: ${s.name} (×${s.value})">${s.icon}×${s.value}</span>
              <input type="number" class="train-count" data-stat="${n}" min="1" max="${h}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${v?"":"disabled"}>
              <button class="btn btn--sm ${v?"btn--blue":"btn--dark"} train-btn" data-train="${n}" ${v?"":"disabled"} title="Tốn ${$} Linh lực/lần · Căn cốt ×${s.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${$} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(u.currentEnergy/$)}</strong> lần hiện tại.
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
    </div>`,(g=r.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",async()=>{try{const n=r.querySelector(".btn-breakthrough");n.disabled=!0,n.innerHTML="Đang Độ Kiếp...";const e=await p.attemptBreakthrough(t.playerId);t.player=e.player,c(e.message,"success"),k()}catch(n){c(n.message||"Đột phá thất bại","error");const e=r.querySelector(".btn-breakthrough");e&&(e.disabled=!1,e.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),r.querySelectorAll(".train-btn").forEach(n=>{n.addEventListener("click",async e=>{e.stopPropagation();const i=r.querySelector(`.train-count[data-stat="${n.dataset.train}"]`),d=parseInt(i==null?void 0:i.value)||1;try{const s=await p.trainStat(t.playerId,n.dataset.train,d);t.player=s.player,c(s.message,"success"),k()}catch(s){c(s.message||"Lỗi rèn luyện","error")}})})}function Y(r,a){var i;const{state:t,api:p,notify:c,renderGame:k}=a,u=t.player,l=t.educationTrees||[],b=u.unlockedNodes||[],$=u.studyingNode||"",v=$?$.split("|")[0]:"",x=u.studyEndsAt||0,o=Math.max(0,x-Math.floor(Date.now()/1e3)),y=u.treeProgress||{},m=u.skillProgress||{};let g=localStorage.getItem("eduActiveTree")||((i=l[0])==null?void 0:i.id),n=l.find(d=>d.id===g)||l[0];!n&&l.length>0&&(n=l[0]);const e=()=>{if(!n){r.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const d=l.map(S=>`
      <button class="edu-tab ${S.id===n.id?"active":""}" data-tab="${S.id}">
        <span class="edu-tab-icon">${S.icon}</span>
        <span class="edu-tab-name">${S.name}</span>
        <span class="edu-tab-badge">${y[S.id]||0}</span>
      </button>
    `).join("");let s="";if(v){let S=null,I=null;l.forEach(M=>{const P=M.nodes.find(N=>N.id===v);P&&(S=P,I=M)}),S&&(s=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${I.name}</div>
              <div class="text-gold text-lg bold">${S.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${o}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${o>0?"disabled":""}>
                ${o>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const h=y[n.id]||0;let f=null;for(const S of n.milestones||[])if(h<S.require){f=S;break}let T="";f?T=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${f.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${f.description}</div>
        </div>
      `:T='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const w=u.discoveredNodes||[],L=(n.nodes||[]).map(S=>{const I=b.includes(S.id),M=v===S.id,P=(S.prerequisites||[]).every(A=>b.includes(A)),N=n.nodes.some(A=>(A.prerequisites||[]).includes(S.id));if(!(w.includes(S.id)||I||!(S.prerequisites&&S.prerequisites.length>0))||I&&N)return"";let _="";M?_="studying":I?_="done":_="available";let B="";M?B='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':v?B='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':I?B=`<button class="btn btn--sm btn--gold btn-learn" data-node="${S.id}">Tiếp Tục Lãnh Ngộ (${S.duration}s)</button>`:P?B=`<button class="btn btn--sm btn--blue btn-learn" data-node="${S.id}">Bắt Đầu (${S.duration}s)</button>`:B='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const j=m[S.id]||{level:1,exp:0},dt=j.level*100;let U="";return I&&(U=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${j.level} | Độ hiểu thấu: ${j.exp}/${dt}</div>`),`
        <div class="edu-node ${_}">
          <div class="edu-node-info">
            <div class="edu-node-title">${S.name}</div>
            <div class="edu-node-desc">${S.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${S.bonusDescription}</div>
            ${U}
          </div>
          <div class="edu-node-action">
            ${B}
          </div>
        </div>
      `}).join("");r.innerHTML=`
      <div class="page-header">
        <h1>🧘 Công Pháp Tu Luyện</h1>
        <div class="text-dim text-sm mt-xs">Tu luyện công pháp, nâng cao thông thạo từng bước.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${d}</div>
          ${s}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${n.icon} ${n.name}</h2>
              <p class="text-dim mb-md">${n.description}</p>
              
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
    `,r.querySelectorAll(".edu-tab").forEach(S=>{S.addEventListener("click",()=>{const I=S.dataset.tab;localStorage.setItem("eduActiveTree",I),g=I,n=l.find(M=>M.id===I)||l[0],e()})}),window.eduTimer&&clearInterval(window.eduTimer),v&&x>0&&(window.eduTimer=setInterval(()=>{const S=Math.floor(Date.now()/1e3);let I=Math.max(0,x-S);const M=document.getElementById("eduCounter");if(M&&(M.innerText=I+"s"),I<=0){clearInterval(window.eduTimer);const P=document.getElementById("btnCheckEdu");P&&(P.disabled=!1,P.innerHTML="✨ Đột Phá!")}},1e3));const E=r.querySelector("#btnCheckEdu");E&&E.addEventListener("click",async()=>{try{E.disabled=!0,E.innerHTML="Đang xử lý...";const S=await p.checkEducation(t.playerId);t.player=S.player,c(S.message,S.completed?"success":"info"),k()}catch(S){c(S.message||"Lỗi đột phá","error"),E.disabled=!1,E.innerHTML="Thử lại"}}),r.querySelectorAll(".btn-learn").forEach(S=>{S.addEventListener("click",async()=>{try{const I=S.dataset.node;S.disabled=!0,S.innerHTML="Chờ...";const M=await p.enrollNode(t.playerId,I,n.id);t.player=M.player,c(M.message,"success"),k()}catch(I){c(I.message||"Lỗi ghi danh","error"),S.disabled=!1,S.innerHTML="Bắt Đầu"}})})};e()}function vt(r,a){const{state:t,api:p,notify:c,renderGame:k}=a,u=t.player.skills||[],l=u.map(o=>typeof o=="string"?o:o.id),b=t.skills||[],$={combat:{icon:"⚔️",name:"Chiến Đấu",desc:"Chiêu thức sử dụng trong giao đấu"},life:{icon:"🛠️",name:"Sinh Hoạt",desc:"Thu thập, chế tạo, sinh tồn"},internal:{icon:"🧘",name:"Nội Công",desc:"Thụ động tăng cường bản thân"},gongfa:{icon:"📖",name:"Công Pháp",desc:"Tu luyện công pháp, nâng cao cảnh giới"}};let v=localStorage.getItem("skillsTab")||"combat";const x=()=>{if(v==="gongfa"){const e=Object.entries($).map(([d,s])=>{const h=d==="gongfa"?(t.educationTrees||[]).length:u.filter(f=>{const T=typeof f=="string"?f:f.id,w=b.find(L=>L.id===T);return w&&(w.category||"combat")===d}).length;return`<button class="skill-tab ${d===v?"active":""}" data-tab="${d}">
          ${s.icon} ${s.name} <span class="skill-tab-count">${h}</span>
        </button>`}).join("");r.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${e}</div>
        <div id="gongfa-content"></div>
      `,r.querySelectorAll(".skill-tab").forEach(d=>{d.addEventListener("click",()=>{v=d.dataset.tab,localStorage.setItem("skillsTab",v),x()})});const i=r.querySelector("#gongfa-content");i&&Y(i,a);return}const o=u.map(e=>{const i=typeof e=="string"?e:e.id;return{...b.find(s=>s.id===i)||{name:i,id:i,category:"combat"},level:e.level||1,xp:e.xp||e.currentXp||0,equipped:e.equipped||e.isEquipped||!1}}),y=o.filter(e=>(e.category||"combat")===v),m=b.filter(e=>(e.category||"combat")===v&&!l.includes(e.id)),g=Object.entries($).map(([e,i])=>{const d=e==="gongfa"?(t.educationTrees||[]).length:o.filter(s=>(s.category||"combat")===e).length;return`<button class="skill-tab ${e===v?"active":""}" data-tab="${e}">
        ${i.icon} ${i.name} <span class="skill-tab-count">${d}</span>
      </button>`}).join(""),n=(e,i)=>{const d=e.level*100,s=Math.min(100,e.xp/d*100),h=e.type==="passive",f="★".repeat(Math.min(e.tier||1,7)),T=(e.tier||1)>=5?"var(--gold)":(e.tier||1)>=3?"var(--purple)":"var(--blue)";let w="";return i?h?w='<span style="font-size:10px;color:var(--green)">🔮 Vĩnh Viễn</span>':e.equipped?w=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${e.id}">Tháo</button>`:w=`<button class="btn btn--sm btn--blue equip-btn" data-eq="1" data-sid="${e.id}">Trang Bị</button>`:w='<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>',`
        <div class="skill-card ${i?"":"locked"} ${e.equipped&&!h?"equipped":""}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name">${e.name}</div>
              <div class="skill-card-tier" style="color:${T}">${f} Tầng ${e.tier||1}</div>
            </div>
            <div class="skill-card-action">${w}</div>
          </div>
          <div class="skill-card-desc">${e.description||""}</div>
          ${i?`
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${e.level}</span>
                <span class="text-dim">${e.xp}/${d}</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${s}%"></div></div>
              ${e.masteryBonus?`<div class="skill-mastery-bonus">✨ ${e.masteryBonus}</div>`:""}
            </div>
          `:`
            <div class="skill-card-req">
              ${(e.requirements||[]).map(L=>`<span class="req-tag">🔒 ${L}</span>`).join(" ")}
            </div>
          `}
          ${e.cost?`<div class="skill-card-cost">🔵 ${e.cost} Linh Lực</div>`:""}
        </div>
      `};r.innerHTML=`
      <div class="page-header">
        <h1>⚡ Kỹ Năng & Công Pháp</h1>
        <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
      </div>

      <div class="skill-tabs">${g}</div>

      <div class="panel">
        <div class="panel-title">
          ${$[v].icon} ${$[v].name}
          <span class="subtitle">${$[v].desc}</span>
        </div>
        <div class="panel-body">
          ${y.length===0&&m.length===0?'<div class="text-dim">Chưa có kỹ năng nào trong nhánh này.</div>':""}
          
          ${y.length>0?`
            <div class="skill-grid">
              ${y.map(e=>n(e,!0)).join("")}
            </div>
          `:""}

          ${m.length>0?`
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
              <div class="text-dim text-sm" style="margin-bottom:8px">🔒 Chưa lĩnh ngộ (${m.length})</div>
              <div class="skill-grid">
                ${m.map(e=>n({...e,level:0,xp:0},!1)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,r.querySelectorAll(".skill-tab").forEach(e=>{e.addEventListener("click",()=>{v=e.dataset.tab,localStorage.setItem("skillsTab",v),x()})}),r.querySelectorAll(".equip-btn").forEach(e=>{e.addEventListener("click",async()=>{try{const i=e.dataset.sid,d=e.dataset.eq==="1",s=await p.equipSkill(t.playerId,i,d);t.player=s.player,c(s.message,"success"),x()}catch(i){c(i.message||"Lỗi trang bị","error")}})})};x()}function mt(r,a){return a==="manual"?"📜":r==="weapon"?"⚔️":r==="body"?"🥋":r==="shield"?"🛡️":r==="feet"?"👢":r==="ring"?"💍":"📦"}function Q(r,a){let t="",p="";if(r.slot==="weapon"){let b=0,$=0;(r.affixes||[]).forEach(v=>{v.stat==="strength"&&v.type==="flat"&&(b+=v.value),v.stat==="dexterity"&&v.type==="flat"&&($+=v.value)}),b===0&&(b=r.itemLevel*2+5),$===0&&($=r.itemLevel+10),t=`⚔️ ${b}`,p=`🎯 ${$}`}else if(r.slot==="body"||r.slot==="shield"||r.slot==="feet"){let b=0;(r.affixes||[]).forEach($=>{$.stat==="defense"&&$.type==="flat"&&(b+=$.value)}),b===0&&(b=r.itemLevel*3),t=`🛡️ ${b}`}else if(r.slot==="ring"){let b=0;(r.affixes||[]).forEach($=>{$.stat==="capacity"&&(b+=$.value)}),t=b>0?`🎒 +${b}`:""}const c=(r.affixes||[]).map(b=>ht(b)).map(b=>`<span class="badge badge-dim">${b}</span>`).join(" "),k=r.description||`Một vật phẩm loại ${r.slot} cấp ${r.itemLevel} thuộc phẩm chất ${r.rarity}. Khí tức tỏa ra không tồi.`,u=r.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${r.craftedBy}</strong></div>`:"",l=a?r.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${r.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${r.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${r.rarity}"></span>
          <span class="item-name rarity-${r.rarity}" style="font-size:14px">${r.name}</span>
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
          ${mt(r.slot,r.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${r.name}</strong> là loại ${r.baseType}. ${k}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${r.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${r.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${c||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${u}
          <div class="mt-2 flex justify-end">
            ${l}
          </div>
        </div>
      </div>
    </div>`}function ht(r){const t={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[r.stat]||r.stat,p=r.value>=0?"+":"";return r.type==="flat"?`${p}${r.value} ${t}`:r.type==="increase"?`${p}${r.value}% ${t}`:r.type==="more"?`×${p}${r.value}% ${t}`:`${p}${r.value} ${t}`}function K(r,a){var e,i,d,s,h,f,T;const{state:t,api:p,notify:c,renderGame:k}=a,u=Object.values(t.player.equipment||{}),l=t.player,b=t.medicines||[],$=l.medCooldownRemaining||0,v=t.inventoryTab||"equipped",x=l.skills&&l.skills.some(w=>{const L=typeof w=="string"?w:w.id;return L==="duoc_ly"||L==="y_thuat"}),o=u.find(w=>w.slot==="ring1"),y=u.find(w=>w.slot==="ring2");let m=20;((o==null?void 0:o.id)==="tui_tru_vat"||(e=o==null?void 0:o.baseType)!=null&&e.includes("tru_vat"))&&(m+=((d=(i=o.affixes)==null?void 0:i[0])==null?void 0:d.value)||10),((y==null?void 0:y.id)==="tui_tru_vat"||(s=y==null?void 0:y.baseType)!=null&&s.includes("tru_vat"))&&(m+=((f=(h=y.affixes)==null?void 0:h[0])==null?void 0:f.value)||10),r.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(l.inventory||[]).length} / ${m})</span></h1>
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
          Đan Dược ${$>0?`<span style="color:var(--orange); font-size:11px">(${$}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),n=()=>{g.querySelectorAll("[data-eid]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const E=await p.equipItem(t.playerId,w.dataset.eid);t.player=E.player,c(E.message,"success"),k()}catch(E){c(E.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const E=await p.useItem(t.playerId,w.dataset.use);t.player=E.player,c(E.message,"success"),k()}catch(E){c(E.message||"Lỗi sử dụng","error")}})})};if(v==="equipped"){const w=l.equipment||{},L=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${L.map(E=>{const S=w[E.key],I=S&&S.id,M=I?`rarity-${S.rarity}`:"";return`
            <div style="background:${I?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${I?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${E.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${E.name}</div>
              ${I?`<div style="font-size:11px;font-weight:600" class="${M}">${S.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${S.rarity}] Lv${S.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${u.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${u.filter(E=>E&&E.id).map(E=>Q(E,!1)).join("")}
      `:""}
    `,n()}else if(v==="medicine")g.innerHTML=`
      <div style="padding:12px">
        ${$>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${$}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${$/300*100}%;background:var(--orange)"></div></div>
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
                  ${w.toxicity&&x?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${w.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${w.penalty&&x?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${w.penalty.map(L=>`Giảm ${Math.abs(L.value)*100}% ${L.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${w.id}" 
                ${$+(w.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(w=>{w.addEventListener("click",async()=>{try{const L=await p.useMedicine(t.playerId,w.dataset.med);t.player=L.player,c(L.message,"success"),k()}catch(L){c(L.message||"Đan độc quá nồng!","error")}})});else{const w=l.inventory||[];let L=[];v==="weapon"?L=w.filter(E=>E.slot==="weapon"&&E.category!=="manual"):v==="armor"?L=w.filter(E=>["body","shield","feet"].includes(E.slot)):v==="accessory"?L=w.filter(E=>["ring","amulet","ring1","ring2"].includes(E.slot)):v==="manual"&&(L=w.filter(E=>E.category==="manual")),g.innerHTML=`
      ${L.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':L.map(E=>Q(E,!0)).join("")}
    `,n()}r.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{t.inventoryTab=w.dataset.tab,K(r,a)})}),(T=document.getElementById("btnGen"))==null||T.addEventListener("click",async()=>{const w=["common","rare","epic","legendary"];try{const L=await p.generateItem(t.playerId,w[Math.floor(Math.random()*w.length)]);t.player=L.player,t.items=L.items||[],c(L.message,"success"),K(r,a)}catch{c("Lỗi tạo ngẫu nhiên","error")}})}function yt(r,a){var d,s;const{state:t,api:p,notify:c,renderGame:k}=a,u=t.player,l=t.crimes||[];if((u.jailRemaining??0)>0){const h=u.jailRemaining,f=Math.max(10,100*Math.ceil(h/60)*u.level);r.innerHTML=`
      <div class="page-header"><h1>🏛 Thiên Lao</h1></div>
      <div class="panel">
        <div class="panel-title">Trạng thái</div>
        <div class="panel-body" style="text-align:center">
          <div style="font-size:28px;color:var(--red);font-weight:700">⛓ Bị giam giữ</div>
          <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${h}s</strong></div>
          <div style="margin-top:16px;display:flex;gap:12px;justify-content:center">
            <button class="btn btn--blue" id="btnEscape">🏃 Vượt ngục (3 Nghịch Khí)</button>
            <button class="btn btn--gold" id="btnBail">💰 Bảo lãnh (${f} Lính Thạch)</button>
          </div>
        </div>
      </div>`,(d=document.getElementById("btnEscape"))==null||d.addEventListener("click",async()=>{try{const T=await p.escapeJail(t.playerId);t.player=T.player,c(T.message,T.success?"success":"error"),k()}catch(T){c(T.message||"Lỗi","error")}}),(s=document.getElementById("btnBail"))==null||s.addEventListener("click",async()=>{try{const T=await p.bail(t.playerId);t.player=T.player,c(T.message,T.success?"success":"error"),k()}catch(T){c(T.message||"Lỗi","error")}});return}const $={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},v={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},x=l.reduce((h,f)=>{const T=f.category||"theft";return h[T]||(h[T]=[]),h[T].push(f),h},{}),o=Object.keys($).map(h=>{const f=x[h];if(!f||f.length===0)return"";const T=$[h];return`
    <div class="panel mt-md" style="border-color: ${T.color}40;">
      <div class="panel-title" style="color: ${T.color};">${T.label} <span class="subtitle text-dim">${f.length} loại</span></div>
      <div class="panel-body no-pad">
        ${f.map(w=>{var P;const L=((P=u.crimeSkills)==null?void 0:P[w.id])??0,E=L<(w.minSkill??0),S=!E&&(u.nerve??0)>=w.nerveCost,I=w.special||[],M=Math.min(95,w.baseSuccessRate+L*.5);return`
            <div class="list-item crime-item ${E?"crime-locked":""}">
              <div class="item-info">
                <div class="item-name" style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:18px">${w.icon}</span>
                  <span>${w.name}</span>
                  ${E?'<span style="opacity:0.5">🔒</span>':""}
                </div>
                <div class="item-desc">${w.description}</div>
                <div class="item-meta" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  <span>⚡ ${w.nerveCost} Khí</span>
                  <span>💰 ${w.rewards.goldMin}-${w.rewards.goldMax}</span>
                  <span style="color:${M>=60?"var(--green)":M>=40?"var(--orange)":"var(--red)"}">🎯 ${Math.round(M)}%</span>
                  ${E?`<span style="color:var(--red)">Cần Skill ${w.minSkill}</span>`:`<span>📊 ${L}/100</span>`}
                </div>
                ${I.length>0?`
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${I.map(N=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${v[N]||N}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <button class="btn btn--sm ${S?"btn--red":""}" data-crime="${w.id}" ${S?"":"disabled"}>
                ${E?"🔒":"Thực hiện"}
              </button>
            </div>`}).join("")}
      </div>
    </div>`}).join(""),y=u.crimeExp||0,m=Math.floor(y/50),g=y%50,n=50,e=g/n*100,i=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${m}</strong>
          <span class="text-dim">${g} / ${n} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${e}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${n-g} EXP</strong> nữa để tăng giới hạn Nghịch Khí. (Giới hạn hiện tại: ${u.maxNerve||15})</div>
      </div>
    </div>
  `;r.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${u.nerve??0}/${u.maxNerve??15} Nghịch Khí · 💰 ${u.gold??0} Linh Thạch</span></div>
    </div>
    ${i}
    ${o}`,r.querySelectorAll("[data-crime]").forEach(h=>{h.addEventListener("click",async()=>{try{const f=await p.commitCrime(t.playerId,h.dataset.crime);t.player=f.player;const T=f.outcome==="success"?"success":f.outcome==="critical_fail"?"error":"info";c(f.message,T),k()}catch(f){c(f.message||"Lỗi","error")}})})}function Z(r,a){const{state:t,api:p,notify:c,updateSidebar:k,renderGame:u}=a,l=t.playerId;t._dungeon||(t._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const b=t._dungeon;async function $(){try{const[n,e]=await Promise.all([p.getMapItems(l),p.getDungeonHistory(l)]);b.mapItems=n.mapItems||[],b.activeRun=n.activeRun||null,b.history=e.history||[],b.loaded=!0,v()}catch(n){c(n.message||"Lỗi tải Bí Cảnh","error")}}function v(){r.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${b.activeRun?x():o()}

      ${b.lastResult?y():""}

      ${m()}
    `,g()}function x(){var d,s;const n=b.activeRun,e=n.currentWave===n.totalWaves,i=((n.currentWave-1)/n.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${n.dungeonName||n.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${i}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${n.currentWave}/${n.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((d=t.player)==null?void 0:d.hospitalRemaining)>0?"disabled":""}>
              ${e?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+n.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((s=t.player)==null?void 0:s.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function o(){return b.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${b.mapItems.map(n=>{const e=n.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${n.item.icon} ${n.item.name} <span style="opacity:0.5">x${n.quantity}</span></div>
                  ${e?`
                    <div class="item-meta">
                      ${e.name} · T${e.tier} · ${e.waves+1} tầng · Boss: ${e.bossName}
                    </div>
                  `:""}
                </div>
                ${e?`<button class="btn btn--sm btn--gold" data-enter="${n.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function y(){var d,s;const n=b.lastResult,e=n.result==="dungeon_complete"?"🏆":n.result==="wave_cleared"?"✅":"💀",i=n.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${i}">
        <div class="panel-title" style="color:${i}">${e} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${n.message}</div>
          ${(d=n.loot)!=null&&d.length?`
            <div style="margin-bottom:8px">
              ${n.loot.map(h=>`<div style="font-size:12px;color:var(--green)">🎁 ${h}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((s=n.combatLog)==null?void 0:s.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(n.combatLog||[]).map(h=>`<div>${h}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function m(){return b.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${b.history.map(n=>{const e=n.status==="completed"?"✅":n.status==="failed"?"❌":n.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${n.status==="completed"?"var(--green)":n.status==="failed"?"var(--red)":"var(--orange)"}">${e} ${n.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${n.wave}/${n.totalWaves} · ${new Date(n.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function g(){var n,e;document.querySelectorAll("[data-enter]").forEach(i=>{i.addEventListener("click",async()=>{const d=i.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){i.disabled=!0;try{const s=await p.enterDungeon(l,d);c(s.message,"success"),t.player=s.player,k(),b.activeRun=s.run,b.lastResult=null,await $()}catch(s){c(s.message,"error"),i.disabled=!1}}})}),(n=document.getElementById("btnFight"))==null||n.addEventListener("click",async()=>{const i=document.getElementById("btnFight");i.disabled=!0,i.textContent="⏳ Đang chiến đấu...";try{const d=await p.fightDungeonWave(l);t.player=d.player,k(),b.lastResult=d,d.result==="dungeon_complete"||d.result==="dungeon_failed"?b.activeRun=null:d.result==="wave_cleared"&&(b.activeRun.currentWave=d.nextWave),v()}catch(d){c(d.message,"error"),i.disabled=!1,i.textContent="⚔️ Chiến Đấu"}}),(e=document.getElementById("btnAbandon"))==null||e.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await p.abandonDungeon(l),c("Đã rời khỏi Bí Cảnh.","info"),b.activeRun=null,b.lastResult=null,await $()}catch(i){c(i.message,"error")}})}b.loaded?v():$()}function tt(r,a){const{state:t}=a,p=t._travelTab||"map";r.innerHTML=`
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
  `,r.querySelectorAll(".tab-btn").forEach(k=>{k.addEventListener("click",()=>{t._travelTab=k.dataset.tab,tt(r,a)})});const c=r.querySelector("#travelTabContent");p==="map"?O(c,a):Z(c,a)}async function O(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a;r.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ...</div>';try{const[u,l]=await Promise.all([p.request("/data/areas"),p.request(`/player/${t.playerId}/area`)]),b=u.areas||[],$=l.area,v=l.player,x=l.traveling||!1,o=l.travelRemaining||0,y=l.travelDestination||"";l.message&&c(l.message,"success"),l.player&&(t.player=l.player,k());const m=t.exploration||{},g=m[(v==null?void 0:v.currentArea)||"thanh_lam_tran"],n=($==null?void 0:$.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",e=(g==null?void 0:g.staminaCost)||10,i={hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận"},d=i[v==null?void 0:v.currentArea]||"",s=[...b].sort((f,T)=>(f.sort_order||f.mapY||0)-(T.sort_order||T.mapY||0)),h=[...b].sort((f,T)=>(f.mapY||0)-(T.mapY||0));if(r.innerHTML=`
      ${x?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.1)">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:32px; margin-bottom:12px; animation:bounce 1s infinite">🚶</div>
            <strong style="font-size:16px">Đang tiến về ${y}</strong>
            <div id="travelTimer" style="font-size:24px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 10px rgba(255,215,0,0.3)">⏳ ${o}s</div>
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
                <div class="text-lg text-green bold">${n}</div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${e}/lần</div>
              </div>
            </div>
            ${$!=null&&$.description?`<div class="text-sm text-dim" style="margin-top:6px">${$.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Lv.${($==null?void 0:$.min_level)||1}+</span>
              ${d?`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">${d}</span>`:""}
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

          ${h.map(f=>{const T=m[f.id],w=f.id===v.currentArea&&!x,L=v.level<(f.min_level||1),E=(T==null?void 0:T.mapX)||50,S=(T==null?void 0:T.mapY)||50,I=w?"var(--green)":L?"var(--red)":"var(--blue)",M=w?`box-shadow: 0 0 15px ${I}; animation: pulse 2s infinite`:"",P=!w&&!L&&!x;return`
              <div class="map-node ${P?"clickable":""}" ${P?`data-travel="${f.id}"`:""} 
                   style="position:absolute; left:${E}%; top:${S}%; transform:translate(-50%, -50%); z-index:1; display:flex; flex-direction:column; align-items:center; width:max-content">
                <div class="node-label" style="font-size:10px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; margin-bottom:4px; color:${w?"var(--green)":"var(--text-light)"}; border:1px solid ${w?"var(--green)":"rgba(255,255,255,0.1)"}">
                  ${f.name} ${L?`[Lv.${f.min_level}]`:""}
                </div>
                <div class="node-dot" style="width:12px; height:12px; background-color:${I}; border-radius:50%; border:2px solid #fff; ${M}"></div>
              </div>
            `}).join("")}
        </div>
      </div>

      <div class="panel mt-md">
        <div class="panel-title">Thiết Lập Lộ Trình</div>
        <div class="panel-body no-pad" style="max-height: 300px; overflow-y:auto">
          ${s.map(f=>{const T=m[f.id],w=f.id===v.currentArea&&!x,L=v.level<(f.min_level||1),E=parseInt(f.travel_time)||0,S=(T==null?void 0:T.staminaCost)||"?",I=i[f.id]||"";return`
              <div class="list-item ${w||L?"":"clickable"}" ${!w&&!L&&!x?`data-travel="${f.id}"`:""} style="padding: 10px 14px">
                <div class="item-info" style="flex:1">
                  <div class="item-name" style="font-size:14px">
                    ${f.name}
                    ${w?' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>':""}
                    ${L?` <span style="color:var(--red); font-size:11px">[Lv.${f.min_level}+]</span>`:""}
                  </div>
                  <div class="item-meta" style="margin-top:2px;display:flex;gap:6px;flex-wrap:wrap">
                    <span>Lv.${f.min_level||1}+</span>
                    <span>${E>0?"⏱ "+E+"s":"⚡ Tức thời"}</span>
                    <span>🏃 -${S}</span>
                    ${I?`<span style="font-size:10px;opacity:0.6">${I}</span>`:""}
                  </div>
                  ${f.description?`<div class="text-xs text-dim" style="margin-top:2px">${f.description}</div>`:""}
                </div>
                ${!w&&!L&&!x?`
                  <button class="btn btn--blue btn--sm" data-travel="${f.id}">
                    ${E>0?"🚶 Di chuyển":"⚡ Đi"}
                  </button>
                `:""}
              </div>`}).join("")}
        </div>
      </div>`,r.querySelectorAll("[data-travel]").forEach(f=>{f.addEventListener("click",async T=>{T.stopPropagation();const w=f.dataset.travel;r.querySelectorAll("[data-travel]").forEach(L=>{L.tagName==="BUTTON"&&(L.disabled=!0),L.style.pointerEvents="none"});try{const L=await p.request(`/player/${t.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:w})});L.player&&(t.player=L.player,k()),c(L.message,"success"),O(r,a)}catch(L){c(L.message||"Lỗi di chuyển!","error"),O(r,a)}})}),x&&o>0){let f=o;const T=o,w=setInterval(async()=>{f--;const L=document.getElementById("travelTimer"),E=document.getElementById("travelBar");if(L&&(L.textContent=`⏳ ${Math.max(0,f)}s`),E&&(E.style.width=`${Math.max(0,f/T*100)}%`),f<=0){clearInterval(w);try{const S=await p.request(`/player/${t.playerId}/travel-check`,{method:"POST"});S.player&&(t.player=S.player,k()),S.arrived&&c(S.message,"success"),O(r,a)}catch{O(r,a)}}},1e3)}}catch(u){r.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(u)}}function F(r,a){var i,d;const{state:t,renderGame:p,notify:c,updateSidebar:k}=a,u=t.player,l=t.recipes||[],b=t.medicines||[],$=t._alchemyTab||"recipes",v=s=>{const h=b.find(f=>f.id===s);return h?(h.icon||"💊")+" "+h.name:s};let x=0,o=0,y=0,m=0;(u.skills||[]).forEach(s=>{const h=typeof s=="string"?s:s.id,f=typeof s=="string"?1:s.level||1;h==="tinh_che"&&(x=f*2),h==="phu_an_thuat"&&(o=f*5),h==="linh_kiem_thuat"&&(y=f*10),h==="cuong_hoa_thuat"&&(m=f*15)});const g=s=>s.split("_").map(h=>h.charAt(0).toUpperCase()+h.slice(1)).join(" "),n=[];Object.values(u.equipment||{}).forEach(s=>{s&&n.push({...s,loc:"eq"})}),(u.inventory||[]).filter(s=>s.slot&&s.slot!=="consumable").forEach(s=>n.push({...s,loc:"inv"}));let e=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${$==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${$==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${x||o||y||m?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${x?`<span>🔥 Thành công +${x}%</span>`:""}
      ${o?`<span>💎 Giảm phí -${o}%</span>`:""}
      ${y?`<span>✨ Chất lượng +${y}%</span>`:""}
      ${m?`<span>⬆️ Nâng đôi ${m}%</span>`:""}
    </div>
    `:""}
  `;if($==="recipes"){if(e+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!u.materials||Object.keys(u.materials).length===0)e+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[s,h]of Object.entries(u.materials))e+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(s)} <span style="color:var(--gold)">x${h}</span></div>`;e+="</div></div>",e+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',l.length===0?e+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':l.forEach(s=>{var E;const h=v(s.target),f=Math.min(100,(s.successRate||100)+x);let T="";(E=s.requirements)!=null&&E.skill&&(T=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(s.requirements.skill)} lv${s.requirements.level||1}</div>`);let w="";s.materials.forEach(S=>{var M;const I=((M=u.materials)==null?void 0:M[S.id])||0;w+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${I>=S.amount?"var(--green)":"var(--red)"};font-weight:bold">${I}/${S.amount}</span> ${g(S.id)}</span>`});const L=b.find(S=>S.id===s.target)||{};e+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${h}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${s.tier}</span>
                  <span>Tỉ lệ: <span style="color:${f>=80?"var(--green)":"var(--blue)"};font-weight:bold">${f}%</span></span>
                  <span>🔥 Phí: ${s.cost} L.Thạch</span>
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
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${s.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),e+="</div></div>"}else e+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${n.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${n.map(s=>`<option value="${s.id}">${s.loc==="eq"?"🔸":"📦"} ${s.name||s.baseType} [${s.rarity||"?"}] ${(s.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(s=>{const h=Math.max(1,Math.round(s.cost*(1-o/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${s.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${s.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${s.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${s.id}" style="width:100%">
                💎 ${h} ${o>0?`<s style="opacity:0.4;font-size:10px">${s.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;r.innerHTML=e,r.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{t._alchemyTab=s.dataset.tab,F(r,a)})}),r.querySelectorAll(".accordion-header").forEach(s=>{s.addEventListener("click",()=>{const h=s.nextElementSibling;h.style.display==="none"?(h.style.display="block",s.querySelector(".text-dim:last-child").textContent="▲"):(h.style.display="none",s.querySelector(".text-dim:last-child").textContent="▼")})}),r.querySelectorAll(".btn-craft").forEach(s=>{s.addEventListener("click",async h=>{h.stopPropagation();const f=l.find(T=>T.id===s.dataset.recipe);if(f&&u.gold<(f.cost||0))return c("Không đủ linh thạch!","error");try{const T=await q.craftItem(u.id,s.dataset.recipe);t.player=T.player,c(T.message,T.success?"success":"error"),p()}catch(T){c(T.message,"error")}})}),r.querySelectorAll(".btn-currency").forEach(s=>{s.addEventListener("click",async()=>{const h=document.getElementById("selItem");if(!(h!=null&&h.value))return c("Chọn trang bị trước!","error");const f=s.dataset.cid;let T=-1;if(f==="thien_menh_phu"){const w=n.find(S=>S.id===h.value),L=(w==null?void 0:w.affixes)||[];if(L.length===0)return c("Item không có affix để khóa!","error");const E=prompt(`Chọn affix để khóa (0-${L.length-1}):
${L.map((S,I)=>`${I}: ${S.name||S.stat} +${S.value}`).join(`
`)}`);if(E===null)return;if(T=parseInt(E),isNaN(T)||T<0||T>=L.length)return c("Chỉ số không hợp lệ!","error")}s.disabled=!0,s.textContent="⏳...";try{const w=await q.applyCurrency(u.id,f,h.value,T);c(w.message,"success"),t.player=w.player,k(),F(r,a)}catch(w){c(w.message,"error"),s.disabled=!1,s.textContent="💎 Dùng"}})}),(i=document.getElementById("selItem"))==null||i.addEventListener("change",()=>{const s=n.find(f=>f.id===document.getElementById("selItem").value),h=document.getElementById("itemPreview");s&&h&&(h.innerHTML=(s.affixes||[]).map(f=>`<span style="color:var(--blue)">• ${f.name||f.stat} +${f.value}</span>`).join(" | ")||"Không có affix")}),(d=document.getElementById("selItem"))==null||d.dispatchEvent(new Event("change"))}function bt(r,a){const{state:t,api:p,notify:c,renderGame:k}=a;t.player,r.innerHTML=`
    <div class="page-header">
      <h2>🏷️ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ nhiệm vụ từ các NPC</p>
    </div>
    <div id="questList" class="quest-container">
      <div class="loading-spinner">⏳ Đang tải...</div>
    </div>
  `,u();async function u(){try{const b=(await p.getQuests(t.playerId)).quests||[],$=document.getElementById("questList");if(!$)return;if(b.length===0){$.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}$.innerHTML=b.map(v=>{const x=v.questAmount>0?Math.min(100,v.progress/v.questAmount*100):0,o=v.progress>=v.questAmount,y=v.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${o?"quest-done":""}" data-quest-id="${v.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${v.npcIcon||"🧓"} ${v.npcName||"NPC"}</span>
              <span class="quest-type">${y} ${v.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${v.questName||v.quest_id}</div>
            <div class="quest-desc">${v.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${o?"hp":"energy"}" style="width:${x}%"></div>
              </div>
              <span class="quest-progress-text">${v.progress}/${v.questAmount}</span>
            </div>
            ${o?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${v.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),$.querySelectorAll(".quest-complete-btn").forEach(v=>{v.addEventListener("click",async()=>{const x=v.dataset.qid;v.disabled=!0,v.textContent="⏳...";try{const o=await p.completeQuest(t.playerId,x);t.player=o.player,c(o.message,"success"),o.skillGained&&c(`🎯 Lĩnh ngộ: ${o.skillGained}!`,"success"),k()}catch(o){c(o.message||"Lỗi trả quest","error"),v.disabled=!1,v.textContent="✅ Trả Nhiệm Vụ"}})})}catch(l){console.error("Error loading quests:",l);const b=document.getElementById("questList");b&&(b.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function xt(r,a){const{state:t,api:p,notify:c,renderGame:k}=a;if(t.player.role!=="admin"){r.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const u=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let l="monsters";r.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${u.map(e=>`
          <button class="admin-tab ${e.id===l?"active":""}" data-tab="${e.id}">${e.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",e=>{const i=e.target.closest(".admin-tab");i&&(l=i.dataset.tab,document.querySelectorAll(".admin-tab").forEach(d=>d.classList.remove("active")),i.classList.add("active"),b(l))}),b(l);async function b(e){const i=document.getElementById("adminContent");if(i){i.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const d=await p.request(`/admin/${e}?adminId=${t.playerId}`);$(e,d,i)}catch(d){i.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${d.message}</div></div>`}}}function $(e,i,d){e==="monsters"?v(i,d):e==="npcs"?x(i,d):e==="areas"?o(i,d):y(e,i,d)}function v(e,i){const d=e.monsters||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${d.map(s=>{var h,f,T,w,L,E,S,I;return`
          <div class="admin-card" data-id="${s.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${s.name} ${s.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((f=(h=e.tierInfo)==null?void 0:h[s.tier])==null?void 0:f.color)||"#888"}">${((w=(T=e.tierInfo)==null?void 0:T[s.tier])==null?void 0:w.name)||"T"+s.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((L=s.stats)==null?void 0:L.hp)||"?"}</div>
              <div>💪 ${((E=s.stats)==null?void 0:E.strength)||"?"}</div>
              <div>🏃 ${((S=s.stats)==null?void 0:S.speed)||"?"}</div>
              <div>🛡 ${((I=s.stats)==null?void 0:I.defense)||"?"}</div>
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
    `,g(i,e,"monsters","monsters")}function x(e,i){const d=e.npcs||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${d.map(s=>`
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
    `,g(i,e,"npcs","npcs")}function o(e,i){const d=Object.keys(e);i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${d.map(s=>{const h=e[s];return`
            <div class="admin-card" data-id="${s}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${h.name||s}</span>
                <span class="badge" style="background:var(--orange)">⚡${h.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(h.events||[]).map(f=>`<span>${f.type}: ${f.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${s}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,i.querySelectorAll(".admin-edit-area").forEach(s=>{s.addEventListener("click",()=>{const h=s.dataset.id,f=e[h];m(h,f,`areas/${h}`)})})}function y(e,i,d){var f;const s=JSON.stringify(i,null,2),h=s.split(`
`).length;d.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${e} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(h+5,30)}">${n(s)}</textarea>
    `,(f=document.getElementById("btnSaveGeneric"))==null||f.addEventListener("click",async()=>{try{const T=document.getElementById("genericEditor").value,w=JSON.parse(T);c("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(T){c("JSON không hợp lệ: "+T.message,"error")}})}function m(e,i,d,s){const h=JSON.stringify(i,null,2),f=document.createElement("div");f.className="admin-modal-overlay",f.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${e}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${n(h)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(f),f.querySelectorAll(".admin-modal-close").forEach(T=>{T.addEventListener("click",()=>f.remove())}),f.addEventListener("click",T=>{T.target===f&&f.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const T=document.getElementById("modalEditor").value,w=JSON.parse(T);await p.request(`/admin/${d}?adminId=${t.playerId}`,{method:"PUT",body:JSON.stringify({data:w})}),c("✅ Đã lưu!","success"),f.remove(),b(l)}catch(T){c("Lỗi: "+T.message,"error")}})}function g(e,i,d,s){e.querySelectorAll(".admin-edit-btn").forEach(h=>{h.addEventListener("click",()=>{const f=h.dataset.id,w=(i[s]||[]).find(L=>L.id===f);w&&m(f,w,`${d}/${f}`)})})}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function et(r,a){const{state:t,api:p,notify:c,renderGame:k,updateSidebar:u}=a,l=t.playerId;t._social||(t._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const b=t._social;async function $(){try{const g=await p.getRelationships(l);b.relationships=g,b.loaded=!0,v()}catch(g){c(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function v(){const{friends:g,enemies:n,pendingSent:e,pendingReceived:i}=b.relationships,d=i.length;r.innerHTML=`
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
            ${b.searchResults.map(s=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${s.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${s.level} · ${s.realm} · ${s.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${s.id!==l?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${s.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${s.id}">⚔️ Kẻ Thù</button>
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
          ⚔️ Kẻ Thù (${n.length})
        </button>
        <button class="btn btn--sm ${b.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${d>0?`<span class="badge">${d}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${b.tab==="friends"?x(g):""}
        ${b.tab==="enemies"?o(n):""}
        ${b.tab==="pending"?y(i,e):""}
      </div>
    `,m()}function x(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(n=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${n.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${n.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${n.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function o(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(n=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${n.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${n.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${n.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function y(g,n){let e="";return g.length>0&&(e+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',e+=g.map(i=>`
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
      `).join("")),n.length>0&&(e+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',e+=n.map(i=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${i.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${i.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&n.length===0&&(e='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),e}function m(){var g,n;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var i;const e=(i=document.getElementById("socialSearch"))==null?void 0:i.value.trim();if(!e||e.length<2)return c("Cần ít nhất 2 ký tự","error");b.searchQuery=e;try{const d=await p.searchPlayers(e);b.searchResults=d.players||[],v()}catch(d){c(d.message,"error")}}),(n=document.getElementById("socialSearch"))==null||n.addEventListener("keydown",e=>{var i;e.key==="Enter"&&((i=document.getElementById("btnSearch"))==null||i.click())}),document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{b.tab=e.dataset.tab,v()})}),document.querySelectorAll("[data-action]").forEach(e=>{e.addEventListener("click",async()=>{const i=e.dataset.action,d=e.dataset.target;e.disabled=!0;try{let s;switch(i){case"add-friend":s=await p.addFriend(l,d);break;case"accept-friend":s=await p.acceptFriend(l,d);break;case"reject-friend":s=await p.rejectFriend(l,d);break;case"remove-friend":s=await p.removeFriend(l,d);break;case"add-enemy":s=await p.addEnemy(l,d);break;case"remove-enemy":s=await p.removeEnemy(l,d);break}c(s.message||"Thành công!","success"),await $()}catch(s){c(s.message||"Lỗi!","error"),e.disabled=!1}})})}b.loaded?v():$()}function at(r,a){const{state:t,api:p,notify:c}=a,k=t.playerId;t._chat||(t._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const u=t._chat;async function l(){try{const[n,e]=await Promise.all([p.getGlobalChat(),p.getChatFriends(k)]);u.globalMessages=n.messages||[],u.friends=e.friends||[],u.globalMessages.length>0&&(u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id),u.loaded=!0,v(),b()}catch(n){c(n.message||"Lỗi tải chat","error")}}function b(){$(),u.pollTimer=setInterval(async()=>{try{if(u.tab==="global"){const n=await p.getGlobalChat(u.lastGlobalId);n.messages&&n.messages.length>0&&(u.globalMessages.push(...n.messages),u.globalMessages.length>100&&(u.globalMessages=u.globalMessages.slice(-100)),u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id,o(),y())}else if(u.tab==="private"&&u.selectedFriend){const n=await p.getPrivateChat(k,u.selectedFriend.id,u.lastPrivateId);n.messages&&n.messages.length>0&&(u.privateMessages.push(...n.messages),u.privateMessages.length>100&&(u.privateMessages=u.privateMessages.slice(-100)),u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id,o(),y())}}catch{}},5e3)}function $(){u.pollTimer&&(clearInterval(u.pollTimer),u.pollTimer=null)}function v(){const n=u.tab==="global"?u.globalMessages:u.privateMessages;r.innerHTML=`
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
            ${u.friends.map(e=>{var i;return`<option value="${e.id}" ${((i=u.selectedFriend)==null?void 0:i.id)===e.id?"selected":""}>${e.name} (Lv.${e.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${x(n)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${u.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),y()}function x(n){return n.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':n.map(e=>{const i=e.sender_id===k,d=new Date(e.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${i?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${d}</span>
          <span style="font-weight:600;color:${i?"var(--blue)":"var(--gold)"}"> ${e.sender_name}</span>
          <span style="opacity:0.8">: ${m(e.message)}</span>
        </div>
      `}).join("")}function o(){const n=document.getElementById("chatMessages");if(!n)return;const e=u.tab==="global"?u.globalMessages:u.privateMessages;n.innerHTML=x(e)}function y(){const n=document.getElementById("chatMessages");n&&(n.scrollTop=n.scrollHeight)}function m(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}function g(){var e,i,d;document.querySelectorAll("[data-chat-tab]").forEach(s=>{s.addEventListener("click",()=>{u.tab=s.dataset.chatTab,u.tab==="global"&&(u.lastGlobalId=u.globalMessages.length>0?u.globalMessages[u.globalMessages.length-1].id:0),v(),b()})}),(e=document.getElementById("friendSelect"))==null||e.addEventListener("change",async s=>{const h=s.target.value;if(!h){u.selectedFriend=null,u.privateMessages=[],v();return}u.selectedFriend=u.friends.find(f=>f.id===h)||null,u.lastPrivateId=0;try{const f=await p.getPrivateChat(k,h);u.privateMessages=f.messages||[],u.privateMessages.length>0&&(u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id),o(),y()}catch(f){c(f.message,"error")}});const n=async()=>{var f,T;const s=document.getElementById("chatInput"),h=s==null?void 0:s.value.trim();if(h){if(u.tab==="private"&&!u.selectedFriend)return c("Chọn Đạo Hữu trước!","error");try{if(await p.sendChat(k,u.tab,u.tab==="private"?u.selectedFriend.id:null,h),s.value="",u.tab==="global"){const w=await p.getGlobalChat(u.lastGlobalId);((f=w.messages)==null?void 0:f.length)>0&&(u.globalMessages.push(...w.messages),u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id)}else{const w=await p.getPrivateChat(k,u.selectedFriend.id,u.lastPrivateId);((T=w.messages)==null?void 0:T.length)>0&&(u.privateMessages.push(...w.messages),u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id)}o(),y()}catch(w){c(w.message||"Lỗi gửi tin nhắn","error")}}};(i=document.getElementById("btnSend"))==null||i.addEventListener("click",n),(d=document.getElementById("chatInput"))==null||d.addEventListener("keydown",s=>{s.key==="Enter"&&n()})}a.renderGame,u.loaded?(v(),b()):l()}function ft(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;t._market||(t._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const l=t._market;async function b(){try{const[n,e]=await Promise.all([p.getMarketListings(l.filter,l.sort),p.getMyListings(u)]);l.listings=n.listings||[],l.myListings=e.listings||[],l.loaded=!0,v()}catch(n){c(n.message||"Lỗi tải Giao Dịch Đài","error")}}async function $(){try{const[n,e]=await Promise.all([p.getMugTargets(u),p.getMugLog(u)]);l.mugTargets=n.targets||[],l.mugCooldown=n.mugCooldown||0,l.mugLog=e.logs||[],v()}catch(n){c(n.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function v(){const n=t.player;r.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${l.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${l.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${l.myListings.length}/10)</button>
        <button class="btn btn--sm ${l.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${l.showListForm?m(n):""}

      ${l.tab==="browse"?x():l.tab==="my"?o():y()}
    `,g()}function x(){let n=`
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
    `,e=l.listings;if(l.search.trim()){const i=l.search.toLowerCase().trim();e=e.filter(d=>{var s;return d.item_name.toLowerCase().includes(i)?!0:(s=d.item_data)!=null&&s.affixes?d.item_data.affixes.some(h=>(h.stat||"").toLowerCase().includes(i)||(h.type||"").toLowerCase().includes(i)):!1})}return e.length===0?n+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(n+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',n+=e.map(i=>{var T,w;const d=i.item_type==="item"?"⚔️":i.item_type==="material"?"🧱":"💊",s=((T=i.item_data)==null?void 0:T.rarity)||"",h=i.seller_id===u,f=(w=i.item_data)!=null&&w.affixes?i.item_data.affixes.map(L=>`${L.stat} ${L.type==="flat"?"+":""}${L.value}${L.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${d}
                <span style="color:var(--gold)">${i.item_name}</span>
                ${i.quantity>1?`<span style="opacity:0.5"> x${i.quantity}</span>`:""}
                ${s?`<span class="rarity-${s}" style="font-size:11px;margin-left:4px">[${s}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${i.seller_name}</span>
                ${f?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${f}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${i.price}${i.quantity>1?"/cái":""}</span>
              ${h?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${i.id}" data-qty="${i.quantity}" data-price="${i.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),n+="</div></div>"),n}function o(){if(l.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let n='<div class="panel"><div class="panel-body no-pad">';return n+=l.myListings.map(e=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${e.item_type==="item"?"⚔️":e.item_type==="material"?"🧱":"💊"} ${e.item_name} ${e.quantity>1?`<span style="opacity:0.5">x${e.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${e.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${e.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),n+="</div></div>",n}function y(){let n=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${l.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${l.mugCooldown}s</div>`:""}
    `;return l.mugTargets.length===0?n+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':n+=l.mugTargets.map(e=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${e.gender==="female"?"♀":"♂"} ${e.name}</div>
            <div class="item-meta">Lv.${e.level} · ${e.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${e.id}" ${l.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),n+="</div></div>",l.mugLog.length>0&&(n+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${l.mugLog.map(e=>{const i=e.attacker_id===u,d=e.outcome==="success"?"✅":"❌",s=e.outcome==="success"?"var(--green)":"var(--red)",h=i?e.outcome==="success"?`Cướp ${e.victim_name}: +${e.gold_stolen} 💎`:`Phục kích ${e.victim_name} thất bại!`:e.outcome==="success"?`Bị ${e.attacker_name} cướp: -${e.gold_stolen} 💎`:`${e.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${s}">${d} ${h} <span style="opacity:0.4;margin-left:auto">${new Date(e.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),n}function m(n){const e=Object.entries(n.materials||{}).map(([h,f])=>({id:h,qty:f,type:"material",name:h})),i=Object.entries(n.medicines||{}).map(([h,f])=>({id:h,qty:f,type:"medicine",name:h})),d=(n.inventory||[]).map(h=>({id:h.id,qty:1,type:"item",name:h.name||h.id})),s=[...e,...i,...d];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${s.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${s.map(h=>`<option value="${h.type}|${h.id}">${h.type==="item"?"⚔️":h.type==="material"?"🧱":"💊"} ${h.name} ${h.qty>1?`(có: ${h.qty})`:""}</option>`).join("")}
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
    `}function g(){var n,e,i,d;document.querySelectorAll("[data-mtab]").forEach(s=>{s.addEventListener("click",()=>{if(l.tab=s.dataset.mtab,l.tab==="mug"&&l.mugTargets.length===0){$();return}v()})}),(n=document.getElementById("btnShowList"))==null||n.addEventListener("click",()=>{l.showListForm=!l.showListForm,v()}),document.querySelectorAll("[data-filter]").forEach(s=>{s.addEventListener("click",async()=>{l.filter=s.dataset.filter,await b()})}),(e=document.getElementById("sortSelect"))==null||e.addEventListener("change",async s=>{l.sort=s.target.value,await b()}),(i=document.getElementById("searchInput"))==null||i.addEventListener("input",s=>{l.search=s.target.value,v();const h=document.getElementById("searchInput");h&&(h.focus(),h.setSelectionRange(l.search.length,l.search.length))}),(d=document.getElementById("btnConfirmList"))==null||d.addEventListener("click",async()=>{var L,E,S;const s=(L=document.getElementById("listItem"))==null?void 0:L.value;if(!s)return;const[h,f]=s.split("|"),T=parseInt((E=document.getElementById("listQty"))==null?void 0:E.value)||1,w=parseInt((S=document.getElementById("listPrice"))==null?void 0:S.value)||0;if(w<=0)return c("Giá phải lớn hơn 0!","error");try{const I=await p.listForSale(u,h,f,T,w);c(I.message,"success"),t.player=I.player,k(),l.showListForm=!1,await b()}catch(I){c(I.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(s=>{s.addEventListener("click",async()=>{const h=parseInt(s.dataset.buy),f=parseInt(s.dataset.qty),T=parseInt(s.dataset.price);let w=1;if(f>1){const L=prompt(`Mua bao nhiêu? (tối đa ${f}, giá ${T} 💎/cái)`,"1");if(!L)return;w=Math.min(parseInt(L)||1,f)}s.disabled=!0;try{const L=await p.buyFromMarket(u,h,w);c(L.message,"success"),t.player=L.player,k(),await b()}catch(L){c(L.message,"error"),s.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(s=>{s.addEventListener("click",async()=>{s.disabled=!0;try{const h=await p.cancelListing(u,parseInt(s.dataset.cancel));c(h.message,"success"),t.player=h.player,k(),await b()}catch(h){c(h.message,"error"),s.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(s=>{s.addEventListener("click",async()=>{const h=s.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){s.disabled=!0,s.textContent="⏳...";try{const f=await p.mugPlayer(u,h);c(f.message,f.success?"success":"error"),t.player=f.player,k(),await $()}catch(f){c(f.message,"error"),s.disabled=!1,s.textContent="💀 Phục Kích"}}})})}l.tab==="mug"?$():l.loaded?v():b()}function $t(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;let l=!1,b=null;async function $(){try{b=await p.getRealmInfo(u),l=!0,v()}catch(y){c(y.message||"Lỗi tải Cảnh Giới","error")}}function v(){if(!b)return;const y=b.current,m=b.allRealms||[],g=t.player,n=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;r.innerHTML=`
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
          <div class="bar-track"><div class="bar-fill" style="width:${n}%;background:${y.color}"></div></div>
        </div>

        ${y.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(y.bonuses).filter(([,e])=>e>0).map(([e,i])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${i} ${e}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${y.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${y.unlocks.map(e=>`<span style="font-size:12px;opacity:0.7">✅ ${e}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${y.canBreakthrough?x(y):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${m.map(e=>{const i=e.tier===y.tier,d=e.tier<y.tier,h=e.tier>y.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${i?`2px solid ${e.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${h};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${e.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${e.color}">${e.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${e.levelMin}+</span>
                ${e.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${e.failChance}% thất bại</span>`:""}
                ${d?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${i?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,o()}function x(y){const m=y.nextRealm;if(!m)return"";const g=m.cost?`💎 ${m.cost.gold} + 🔮 ${m.cost.energy}`:"Miễn phí";return`
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
          Bonus mới: ${Object.entries(m.bonuses).filter(([,n])=>n>0).map(([n,e])=>`+${e} ${n}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${m.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function o(){var y;(y=document.getElementById("btnBreakthrough"))==null||y.addEventListener("click",async()=>{const m=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){m.disabled=!0,m.textContent="⏳ Đang đột phá...";try{const g=await p.attemptBreakthrough(u);g.success?(c(g.message,"success"),t.player=g.player,k(),await $()):(c(g.message,"error"),g.player&&(t.player=g.player,k()),await $())}catch(g){c(g.message||"Lỗi đột phá","error"),m.disabled=!1,m.textContent="⚡ ĐỘT PHÁ"}}})}$()}function Tt(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a;kt(r,a)}async function kt(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a;r.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const l=(await p.request(`/player/${t.playerId}/events`)).events||[];if(t.player&&(t.player.unreadEventsCount=0,k()),l.length===0){r.innerHTML=`
        <div class="page-header"><h1>📜 Sự Kiện</h1></div>
        <div class="panel">
          <div class="panel-body text-dim" style="text-align:center; padding: 40px;">
            Gió yên biển lặng. Chưa có sự kiện nào xảy ra với bạn.
          </div>
        </div>
      `;return}r.innerHTML=`
      <div class="page-header"><h1>📜 Sự Kiện Gần Đây</h1></div>
      <div class="panel">
        <div class="panel-body no-pad">
          <ul class="event-timeline" style="list-style:none; padding:16px; margin:0;">
            ${l.map(b=>{const $=new Date(b.created_at*1e3),v=$.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),x=$.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let o="📌";return o={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[b.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${v}</div>
                    <div>${x}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${o}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${b.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${b.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(u){r.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${u.message}</div></div>`}}function wt(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;t._tc||(t._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const l=t._tc;async function b(){try{l.data=await p.request(`/player/${u}/atlas-maps`),l.loaded=!0,$()}catch(g){c(g.message,"error")}}function $(){const g=l.data,n=(g==null?void 0:g.atlas)||{},e=(g==null?void 0:g.maps)||[],i=g==null?void 0:g.activeRun,d=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,r.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${n.completed||0}/${n.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${n.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${n.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${n.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${l.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${l.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${e.length})</button>
        ${i?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,r.querySelectorAll("[data-tab]").forEach(h=>{h.addEventListener("click",()=>{l.tab=h.dataset.tab,$()})});const s=document.getElementById("tcContent");s&&(i&&l.tab==="run"?y(s,i):l.tab==="inventory"?x(s,e):v(s,d,n))}function v(g,n,e){var d;const i=((d=l.data)==null?void 0:d.tiers)||[];g.innerHTML=i.map(s=>{const h=n.filter(f=>f.tier===s.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${s.tier} ${s.name} <span style="opacity:0.4;font-size:11px">(Realm ${s.requiredRealm}+, ${s.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${h.map(f=>{var L;const T=((L=e.progress)==null?void 0:L[f.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[f.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${T?700:400}">${f.name}</span>
                ${T?`<span style="color:var(--green);font-size:11px">✅ ×${T}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function x(g,n,e){if(n.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=n.map((i,d)=>{const s=i.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${m(i.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${i.mapName||i.mapId} <span style="color:${m(i.tier)};font-size:12px">T${i.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${s.length>0?s.map(h=>h.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${s.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${d}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${d}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(i=>{i.addEventListener("click",async()=>{try{const d=await p.request(`/player/${u}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(i.dataset.idx)})});c(d.message,"success"),t.player=d.player,k(),l.tab="run",await b()}catch(d){c(d.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(i=>{i.addEventListener("click",()=>o(parseInt(i.dataset.idx)))})}function o(g){var i;const n=((i=l.data)==null?void 0:i.modifiers)||[],e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",e.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${n.map(d=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${d.id}">
          <span style="flex:1"><strong>${d.name}</strong><br><span style="font-size:11px;opacity:0.6">${d.desc} · IIQ +${d.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,e.addEventListener("click",async d=>{const s=d.target.closest("[data-modid]");if(s)try{const h=await p.request(`/player/${u}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:s.dataset.modid})});c(h.message,"success"),t.player=h.player,k(),e.remove(),await b()}catch(h){c(h.message,"error")}else d.target===e&&e.remove()}),document.body.appendChild(e)}function y(g,n){var d,s;const e=n.currentWave/n.totalWaves*100,i=n.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${n.mapName} <span style="color:${m(n.tier)}">T${n.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${n.currentWave}/${n.totalWaves}
            ${i.length>0?" · "+i.map(h=>h.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${e}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${l.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(d=document.getElementById("btnTCFight"))==null||d.addEventListener("click",async()=>{l.fighting=!0,$();try{const h=await p.request(`/player/${u}/atlas-maps/fight`,{method:"POST"});t.player=h.player,k();const f=h.result!=="map_failed";c(h.message,f?"success":"error"),l.fighting=!1,(h.result==="map_complete"||h.result==="map_failed")&&(l.tab="atlas"),await b()}catch(h){c(h.message,"error"),l.fighting=!1,$()}}),(s=document.getElementById("btnTCQuit"))==null||s.addEventListener("click",async()=>{try{await p.request(`/player/${u}/atlas-maps/abandon`,{method:"POST"}),c("Đã rời Tiên Cảnh","info"),l.tab="atlas",await b()}catch(h){c(h.message,"error")}})}function m(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}l.loaded?$():b()}function Lt(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;t._tw||(t._tw={data:null,loaded:!1,fighting:!1,tab:"tower"});const l=t._tw;async function b(){try{l.data=await p.request(`/player/${u}/tower`),l.loaded=!0,$()}catch(y){c(y.message,"error")}}function $(){var d,s;const y=l.data,m=y==null?void 0:y.run,g=(y==null?void 0:y.leaderboard)||[],n=(y==null?void 0:y.milestones)||{},e=y==null?void 0:y.nextMilestone;r.innerHTML=`
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
              ${e?`<div style="font-size:11px;margin-top:4px;color:var(--gold)">🎯 Mốc tiếp: T.${e.floor} → ${e.reward.title} (+${e.reward.gold}💎)</div>`:""}
            `:`
              <div style="font-weight:700;font-size:16px">Chưa vào tháp mùa này</div>
              <div style="font-size:12px;opacity:0.5">Bắt đầu leo để tranh hạng!</div>
            `}
          </div>
          <div>
            ${!m||m.status==="dead"?`<button class="btn btn--red btn--lg" id="btnEnter">${m?"🔄 Hồi Sinh":"⚡ Vào Tháp"}</button>`:`<button class="btn btn--red btn--lg" id="btnFight" ${l.fighting?"disabled":""}>⚔️ Chiến Đấu</button>`}
          </div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${l.tab==="tower"?"btn--blue":""} btn--sm" data-tab="tower">🗼 Tháp</button>
        <button class="btn ${l.tab==="leaderboard"?"btn--blue":""} btn--sm" data-tab="leaderboard">🏆 Bảng Xếp Hạng</button>
        <button class="btn ${l.tab==="milestones"?"btn--blue":""} btn--sm" data-tab="milestones">🎯 Mốc Thưởng</button>
      </div>

      <div id="twContent"></div>
      <div id="twResult" style="margin-top:12px"></div>
    `,r.querySelectorAll("[data-tab]").forEach(h=>h.addEventListener("click",()=>{l.tab=h.dataset.tab,$()})),(d=document.getElementById("btnEnter"))==null||d.addEventListener("click",async()=>{try{const h=await p.request(`/player/${u}/tower/climb`,{method:"POST"});c(h.message,"success"),await b()}catch(h){c(h.message,"error")}}),(s=document.getElementById("btnFight"))==null||s.addEventListener("click",async()=>{var h,f;l.fighting=!0,$();try{const T=await p.request(`/player/${u}/tower/fight`,{method:"POST"});t.player=T.player,k(),l.fighting=!1;const w=document.getElementById("twResult");if(w){const L=T.result!=="death";w.innerHTML=`
            <div class="panel" style="border-left:3px solid ${L?"var(--green)":"var(--red)"}">
              <div class="panel-body" style="padding:14px">
                <div style="font-weight:700;font-size:14px">${T.message}</div>
                ${(h=T.loot)!=null&&h.length?`<div style="font-size:12px;margin-top:6px;opacity:0.7">${T.loot.join(" · ")}</div>`:""}
                ${T.milestone?`<div style="margin-top:8px;padding:8px;background:rgba(255,215,0,0.15);border-radius:6px;font-weight:700;color:var(--gold)">🏆 ${T.milestone.title}!</div>`:""}
                ${((f=T.combatResults)==null?void 0:f.map(E=>`<details style="margin-top:6px"><summary style="cursor:pointer;font-size:11px">${E.monster} — ${E.result==="win"?"✅":"❌"}</summary><pre style="font-size:10px;max-height:150px;overflow:auto;opacity:0.6;margin-top:4px">${(E.log||[]).map(S=>`${S.turn||""}: ${S.text||JSON.stringify(S)}`).join(`
`)}</pre></details>`).join(""))||""}
              </div>
            </div>
          `}await b()}catch(T){c(T.message,"error"),l.fighting=!1,$()}});const i=document.getElementById("twContent");i&&(l.tab==="leaderboard"?x(i,g,y.playerRank):l.tab==="milestones"?o(i,n,(m==null?void 0:m.highestFloor)||0):v(i,m))}function v(y,m){if(!m){y.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Vào tháp để bắt đầu leo!</div></div>';return}const g=m.currentFloor,n=[];g%10===0?n.push("👑 Boss"):g%15===0?n.push("💰 Bảo Tàng (2.5x loot)"):g%7===0?n.push("☠️ Bẫy Trận (-10% HP)"):g%13===0?n.push("💚 Linh Tuyền (+20% HP)"):g%11===0?n.push("⚡ Tinh Anh (+30% stats)"):g%9===0&&g>20&&n.push("☯ Ngũ Hành");const e=Math.min(1+Math.floor(g/20),3);y.innerHTML=`<div class="panel"><div class="panel-body" style="padding:14px">
      <div style="font-weight:700">Tầng ${g} Preview</div>
      <div style="font-size:12px;opacity:0.7;margin-top:4px">
        ${n.length?n.join(" · "):"⚔️ Thường"}
        · ${e} quái
        · Sức mạnh ×${Math.pow(1.08,g-1).toFixed(1)}
      </div>
    </div></div>`}function x(y,m,g){var n;y.innerHTML=`<div class="panel"><div class="panel-title">🏆 Mùa ${(n=l.data)==null?void 0:n.season}</div><div class="panel-body no-pad">
      ${m.length===0?'<div style="padding:20px;text-align:center;opacity:0.4">Chưa có ai leo tháp mùa này</div>':""}
      ${m.map(e=>{const i=e.rank<=3?["","🥇","🥈","🥉"][e.rank]:`#${e.rank}`,d=e.playerId===u;return`<div class="list-item" style="padding:8px 14px;${d?"background:rgba(255,215,0,0.1)":""}">
          <span style="width:40px;font-weight:700;font-size:14px">${i}</span>
          <span style="flex:1;font-weight:${d?800:400}">${e.name}</span>
          <span style="font-size:12px;opacity:0.7">T.${e.floor} · ${e.kills} kills</span>
        </div>`}).join("")}
    </div></div>
    ${g>0?`<div style="text-align:center;margin-top:8px;font-size:12px;opacity:0.6">Hạng của bạn: #${g}</div>`:""}`}function o(y,m,g){y.innerHTML=`<div class="panel"><div class="panel-title">🎯 Mốc Thưởng</div><div class="panel-body no-pad">
      ${Object.entries(m).map(([n,e])=>{const i=g>=parseInt(n);return`<div class="list-item" style="padding:10px 14px;${i?"opacity:0.5":""}">
          <span style="font-size:18px">${i?"✅":"🔒"}</span>
          <span style="flex:1;font-weight:600">Tầng ${n}</span>
          <span style="font-size:12px">${e.title} · +${e.gold}💎</span>
        </div>`}).join("")}
    </div></div>`}l.loaded?$():b()}function St(r,a){const{state:t,api:p,notify:c,updateSidebar:k,renderGame:u}=a,l=t.playerId;t._housing||(t._housing={data:null,loaded:!1});const b=t._housing;async function $(){try{const m=await p.getHousing(l);b.data=m,b.loaded=!0,v()}catch(m){c(m.message||"Lỗi tải Động Phủ","error")}}function v(){const m=b.data;r.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${m.owned?o(m):x(m)}
    `,y()}function x(m){const g=m.tiers[1];return`
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
    `}function o(m){const g=m.gardenSlots||[],n=m.gardenHerbs||{};return`
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
            ${Array.from({length:m.maxSlots},(e,i)=>{const d=g[i]||{},s=!!d.herb,h=d.ready,f=d.remaining||0,T=Math.ceil(f/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${h?"var(--green)":s?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${s?`
                    <div style="font-size:20px">${h?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${d.herbName||d.herb}</div>
                    <div style="font-size:10px;color:${h?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${h?"✅ Sẵn sàng!":"⏳ "+T+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${i}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(n).map(([w,L])=>`<option value="${w}">${L.name}</option>`).join("")}
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
            ${Object.entries(m.formations).map(([e,i])=>{const d=i.currentLevel>=i.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${i.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${i.icon}</span>
                      <strong style="margin-left:4px">${i.name}</strong>
                      ${i.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${i.currentLevel}</span>`:""}
                    </div>
                    ${i.canBuild?d?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${e}">
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
    `}function y(){var m,g,n,e;(m=document.getElementById("btnBuyHouse"))==null||m.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const i=await p.buyHousing(l);c(i.message,"success"),t.player=i.player,k(),await $()}catch(i){c(i.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const i=await p.buyHousing(l);c(i.message,"success"),t.player=i.player,k(),await $()}catch(i){c(i.message,"error")}}),document.querySelectorAll(".plant-select").forEach(i=>{i.addEventListener("change",async d=>{const s=d.target.value;if(!s)return;const h=parseInt(i.dataset.slot);try{const f=await p.plantHerb(l,s,h);c(f.message,"success"),await $()}catch(f){c(f.message,"error")}})}),(n=document.getElementById("btnHarvest"))==null||n.addEventListener("click",async()=>{try{const i=await p.harvestGarden(l);c(i.message,"success"),t.player=i.player,k(),await $()}catch(i){c(i.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(i=>{i.addEventListener("click",async()=>{const d=i.dataset.fid;i.disabled=!0,i.textContent="⏳...";try{const s=await p.upgradeFormation(l,d);c(s.message,"success"),t.player=s.player,k(),await $()}catch(s){c(s.message,"error"),i.disabled=!1,i.textContent="⬆ Nâng"}})}),(e=document.getElementById("btnMaintenance"))==null||e.addEventListener("click",async()=>{try{const i=await p.payMaintenance(l);c(i.message,"success"),t.player=i.player,k(),await $()}catch(i){c(i.message,"error")}})}b.loaded?v():$()}function Et(r,a){const{state:t}=a;t._wikiTab||(t._wikiTab="lore");function p(){r.innerHTML=`
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
          ${c(t._wikiTab)}
        </div>
      </div>
    `,r.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{t._wikiTab=k.dataset.tab,p()})})}function c(k){return{lore:`
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
      `}[k]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}p()}function Ct(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;t._npcShop||(t._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const l=t._npcShop;let b=parseInt(localStorage.getItem("npcShopIdx")||"0");async function $(){try{r.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const o=await p.getShops(u);l.shops=o.shops||[],l.tax=o.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},l.loaded=!0,b>=l.shops.length&&(b=0),v()}catch(o){c(o.message||"Lỗi tải shop","error")}}function v(){var e;if(l.shops.length===0){r.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const o=l.shops[b]||l.shops[0],y=l.shops.map((i,d)=>`
      <button class="skill-tab ${d===b?"active":""}" data-shop-idx="${d}">
        ${i.icon||"🧓"} ${i.name}
      </button>
    `).join(""),m={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},g={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},n=(o.items||[]).map(i=>{var T,w;const d=m[i.rarity||"common"]||"#888",s=g[i.rarity||"common"]||"Phàm",h=(i.remainingStock??1)<=0,f=(((T=t.player)==null?void 0:T.gold)??0)>=(i.currentPrice||0);return`
        <div class="shop-item-card ${h?"out-of-stock":""}" style="border-left:3px solid ${d}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${d}">${i.name}</div>
              <div class="shop-item-rarity" style="color:${d}">${s} · Tầng ${i.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${h?"var(--red)":"var(--green)"}">
                ${h?"❌ Hết hàng":`📦 ${i.remainingStock}/${i.dailyStock}`}
              </span>
            </div>
          </div>
          ${i.description?`<div class="shop-item-desc">${i.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${f?"":"too-expensive"}">
              💎 ${((w=i.currentPrice)==null?void 0:w.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${o.id}" data-item="${i.id}" 
                value="1" min="1" max="${i.remainingStock||1}" 
                ${h?"disabled":""}>
              <button class="btn btn--sm ${h?"":f?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${o.id}" data-item="${i.id}"
                ${h||!f?"disabled":""}>
                ${h?"❌":f?"🛒 Mua":"💸 Thiếu"}
              </button>
            </div>
          </div>
        </div>
      `}).join("");r.innerHTML=`
      <div class="page-header">
        <h1>🧓 Thương Nhân</h1>
        <div class="text-dim text-sm">Mỗi thương nhân có hàng giới hạn mỗi ngày. Mua sắm thông minh!</div>
      </div>

      <div class="shop-info-bar">
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${l.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(((e=t.player)==null?void 0:e.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${o.area||"Không rõ"}</div>
      </div>

      ${l.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${y}</div>`:""}

      <div class="shop-items-grid">
        ${n||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,x()}function x(){r.querySelectorAll(".skill-tab[data-shop-idx]").forEach(o=>{o.addEventListener("click",()=>{b=parseInt(o.dataset.shopIdx),localStorage.setItem("npcShopIdx",b),v()})}),r.querySelectorAll(".btn-buy").forEach(o=>{o.addEventListener("click",async()=>{const y=o.dataset.shop,m=o.dataset.item,g=r.querySelector(`.buy-qty[data-shop="${y}"][data-item="${m}"]`),n=parseInt((g==null?void 0:g.value)||1);o.disabled=!0,o.textContent="⏳...";try{const e=await p.buyFromShop(u,y,m,n);c(e.message,"success"),t.player=e.player,k(),await $()}catch(e){c(e.message,"error"),o.disabled=!1,o.textContent="🛒 Mua"}})})}l.loaded?v():$()}function It(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;t._guild||(t._guild={data:null,loaded:!1,allGuilds:null});const l=t._guild;async function b(){try{l.data=await p.getMyGuild(u),l.loaded=!0,v()}catch(m){c(m.message||"Lỗi","error")}}async function $(){try{const m=await p.listGuilds();l.allGuilds=m.guilds||[],v()}catch(m){c(m.message,"error")}}function v(){const m=l.data;r.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${m!=null&&m.inGuild?o(m):x(m)}
    `,y()}function x(m){return`
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
          ${l.allGuilds?l.allGuilds.map(g=>`
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
    `}function o(m){var i;const g=m.guild,n=m.members||[],e=m.log||[];return`
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
                Buff: ${Object.entries(g.buffs).map(([d,s])=>`${d} +${s}%`).join(", ")}
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
            ${e.slice(0,10).map(d=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(d.created_at).toLocaleString("vi")}</span>
                ${d.detail||d.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${n.length}/${g.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${n.map(d=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${d.role==="leader"?"👑":d.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${d.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${d.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${m.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function y(){var m,g,n,e,i,d;(m=document.getElementById("btnCreate"))==null||m.addEventListener("click",async()=>{var T,w,L,E,S,I;const s=(w=(T=document.getElementById("guildName"))==null?void 0:T.value)==null?void 0:w.trim(),h=(E=(L=document.getElementById("guildTag"))==null?void 0:L.value)==null?void 0:E.trim(),f=(I=(S=document.getElementById("guildDesc"))==null?void 0:S.value)==null?void 0:I.trim();if(!s||!h)return c("Nhập tên và tag!","error");try{const M=await p.createGuild(u,s,h,f);c(M.message,"success"),t.player=M.player,k(),l.loaded=!1,await b()}catch(M){c(M.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",$),document.querySelectorAll(".btn-join").forEach(s=>{s.addEventListener("click",async()=>{try{const h=await p.joinGuild(u,parseInt(s.dataset.gid));c(h.message,"success"),l.loaded=!1,await b()}catch(h){c(h.message,"error")}})}),(n=document.getElementById("btnContribute"))==null||n.addEventListener("click",async()=>{var h;const s=parseInt(((h=document.getElementById("contributeAmt"))==null?void 0:h.value)||0);if(!(s<=0))try{const f=await p.contributeGuild(u,s);c(f.message,"success"),t.player=f.player,k(),await b()}catch(f){c(f.message,"error")}}),(e=document.getElementById("btnUpgradeGuild"))==null||e.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const s=await p.upgradeGuild(u);c(s.message,"success"),await b()}catch(s){c(s.message,"error")}}),(i=document.getElementById("btnPayUpkeep"))==null||i.addEventListener("click",async()=>{try{const s=await p.payGuildUpkeep(l.data.guild.id);c(s.message,"success"),await b()}catch(s){c(s.message,"error")}}),(d=document.getElementById("btnLeave"))==null||d.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const s=await p.leaveGuild(u);c(s.message,"success"),l.loaded=!1,await b()}catch(s){c(s.message,"error")}})}l.loaded?v():b()}function Mt(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;t._profile||(t._profile={results:[],viewing:null,searchQuery:""});const l=t._profile;function b(){r.innerHTML=`
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

      ${l.viewing?$(l.viewing):""}

      ${l.results.length>0&&!l.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${l.results.length})</div>
        <div class="panel-body no-pad">
          ${l.results.map(o=>`
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
      `:!l.viewing&&l.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,v()}function $(o){var n,e,i;const y=o.id===u,m=o.maxHp>0?Math.round(o.currentHp/o.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((n=o.name[0])==null?void 0:n.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${o.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${o.level} · ${((e=o.realmInfo)==null?void 0:e.fullName)||"Phàm Nhân"}
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
              <div style="height:100%;width:${m}%;background:${m>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(i=o.gold)==null?void 0:i.toLocaleString()} 💎</strong></div>

          ${y?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${o.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${o.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function v(){var o,y,m,g,n;(o=document.getElementById("btnSearch"))==null||o.addEventListener("click",x),(y=document.getElementById("searchInput"))==null||y.addEventListener("keydown",e=>{e.key==="Enter"&&x()}),document.querySelectorAll(".btn-view, [data-view]").forEach(e=>{e.addEventListener("click",async()=>{const i=e.dataset.vid||e.dataset.view;try{const d=await p.getPlayerProfile(i);l.viewing=d.profile,b()}catch(d){c(d.message,"error")}})}),(m=document.getElementById("btnAttack"))==null||m.addEventListener("click",async()=>{const e=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${l.viewing.name}?`))try{const i=await p.mugPlayer(u,e);c(i.message,i.won?"success":"error"),i.player&&(t.player=i.player,k())}catch(i){c(i.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const e=document.getElementById("btnAddFriend").dataset.tid;try{const i=await p.addFriend(u,e);c(i.message||"Đã gửi lời mời!","success")}catch(i){c(i.message,"error")}}),(n=document.getElementById("btnBackSearch"))==null||n.addEventListener("click",()=>{l.viewing=null,b()})}async function x(){var m;const o=document.getElementById("searchInput"),y=(m=o==null?void 0:o.value)==null?void 0:m.trim();if(!y||y.length<2)return c("Nhập ít nhất 2 ký tự!","error");l.searchQuery=y,l.viewing=null;try{const g=await p.searchPlayers(y);l.results=g.players||[],b()}catch(g){c(g.message,"error")}}b()}function Pt(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;t._arena||(t._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const l=t._arena;async function b(){try{l.data=await p.getArena(u),l.loaded=!0,$()}catch(x){c(x.message,"error")}}function $(){var e,i,d,s,h,f,T,w;const x=l.data,o=(x==null?void 0:x.arena)||{},y=o.rank||{},m=parseInt(o.streak)||0,g=m>=5?`🔥x${m}`:m>=3?`⚡x${m}`:m>0?`${m}W`:m<0?`${Math.abs(m)}L`:"",n=m>=5?"var(--gold)":m>=3?"var(--orange)":m>0?"var(--green)":m<0?"var(--red)":"var(--text-dim)";r.innerHTML=`
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
              ELO: <strong>${o.rating||1e3}</strong> · ${o.wins||0}W/${o.losses||0}L
              ${g?` · <span style="color:${n};font-weight:700">${g}</span>`:""}
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
      ${(e=l.lastResult)!=null&&e.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(i=l.lastResult.newRank)==null?void 0:i.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(d=l.lastResult.newRank)==null?void 0:d.name}!</div>
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
            Đối thủ: <strong>${(s=l.lastResult.opponent)==null?void 0:s.name}</strong> 
            ${(h=l.lastResult.opponent)!=null&&h.rank?l.lastResult.opponent.rank.icon:""} 
            (ELO ${(f=l.lastResult.opponent)==null?void 0:f.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${l.lastResult.ratingChange>0?"+":""}${l.lastResult.ratingChange}
            ${l.lastResult.goldEarned>0?` · +${l.lastResult.goldEarned} 💎`:""}
          </div>
          ${(T=l.lastResult.combatLog)!=null&&T.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${l.lastResult.combatLog.map(L=>`<div>${L}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(x.opponents||[]).length>0?(x.opponents||[]).map(L=>{var E,S,I;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((E=L.rank)==null?void 0:E.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${L.name} <span style="opacity:0.4;font-size:11px">Lv.${L.level}</span></div>
                <div style="font-size:11px;color:${((S=L.rank)==null?void 0:S.color)||"#888"}">${((I=L.rank)==null?void 0:I.name)||"Đồng"} · ELO ${L.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${L.player_id}" ${l.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${l.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${x.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(x.top10||[]).map((L,E)=>{var S,I;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${E<3?"var(--gold)":"var(--text-dim)"}">#${E+1}</span>
                <span>${((S=L.rank)==null?void 0:S.icon)||""}</span>
                <span style="flex:1">${L.name}</span>
                <span style="color:${((I=L.rank)==null?void 0:I.color)||"var(--blue)"}; font-weight:600">${L.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(x.history||[]).map(L=>{const E=L.winner_id===u;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${E?"var(--green)":"var(--red)"}">
                  ${E?"✅":"❌"} vs ${L.attacker_id===u?L.defender_name:L.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${L.rating_change>0?"+":""}${L.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,r.querySelectorAll(".btn-fight-opp").forEach(L=>{L.addEventListener("click",E=>v(E.target.dataset.oid))}),(w=document.getElementById("btnRandomFight"))==null||w.addEventListener("click",()=>v(null))}async function v(x){l.fighting=!0,$();try{const o=await p.request(`/player/${u}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:x})});l.lastResult=o,t.player=o.player,k(),c(o.message,o.won?"success":"error"),l.fighting=!1,await b()}catch(o){c(o.message,"error"),l.fighting=!1,$()}}l.loaded?$():b()}function qt(r,a){const{state:t,api:p,notify:c,updateSidebar:k,renderGame:u}=a,l=t.playerId,b=t._auctionTab||"browse";async function $(){try{const[o,y]=await Promise.all([p.getAuctions(),p.getMyAuctions(l)]);t._auctionListings=o.listings||[],t._auctionMine=y.listings||[],v()}catch(o){c(o.message,"error")}}function v(){const o=t._auctionListings||[],y=t._auctionMine||[],m=(t.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");r.innerHTML=`
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
          ${o.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':o.map(g=>{const n=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${n.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${n.rarity||"?"}]</span>
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
    `,x()}function x(){var o;r.querySelectorAll(".tab-btn").forEach(y=>y.addEventListener("click",()=>{t._auctionTab=y.dataset.tab,$()})),r.querySelectorAll(".btn-buy").forEach(y=>y.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const m=await p.buyAuction(l,parseInt(y.dataset.lid));c(m.message,"success"),t.player=m.player,k(),await $()}catch(m){c(m.message,"error")}})),r.querySelectorAll(".btn-cancel").forEach(y=>y.addEventListener("click",async()=>{try{const m=await p.cancelAuction(l,parseInt(y.dataset.lid));c(m.message,"success"),t.player=m.player,k(),await $()}catch(m){c(m.message,"error")}})),(o=document.getElementById("btnListItem"))==null||o.addEventListener("click",async()=>{var n,e,i;const y=(n=document.getElementById("selSellItem"))==null?void 0:n.value,m=parseInt(((e=document.getElementById("inpPrice"))==null?void 0:e.value)||"500"),g=parseInt(((i=document.getElementById("selDuration"))==null?void 0:i.value)||"24");try{const d=await p.listAuction(l,y,m,g);c(d.message,"success"),t.player=d.player,k(),t._auctionTab="mine",await $()}catch(d){c(d.message,"error")}})}$()}function Ht(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;async function l(){try{const $=await p.getDailyQuests(u);t._dailyQuests=$,b()}catch($){c($.message,"error")}}function b(){const $=t._dailyQuests||{},v=$.quests||[];$.allCompleted;const x=$.bonusReward;r.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${v.map(o=>{const y=o.quest_info||{},m=o.target>0?Math.min(100,Math.round(o.progress/o.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${o.claimed?"var(--text-dim)":o.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${y.name||o.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${y.difficulty==="Khó"?"var(--red)":y.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${y.difficulty||"?"}</span>
              </div>
              ${o.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':o.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${o.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${o.progress}/${o.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${y.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${m}%;background:${o.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${y.goldReward||0} · ✨ ${y.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${x?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${x.gold} 💎, +${x.xp} EXP</div>
      </div>
      `:""}
    `,r.querySelectorAll(".btn-claim").forEach(o=>o.addEventListener("click",async()=>{try{const y=await p.claimDailyQuest(u,parseInt(o.dataset.qid));c(y.message,"success"),t.player=y.player,k(),await l()}catch(y){c(y.message,"error")}}))}l()}function Nt(r,a){const{state:t,api:p,notify:c,updateSidebar:k}=a,u=t.playerId;async function l(){try{t._worldBoss=await p.getWorldBoss(),b()}catch($){c($.message,"error")}}function b(){var g;const $=t._worldBoss||{},v=$.boss||{},x=$.hpPercent||0,o=$.topContributors||[],y=$.rewards||{},m=v.status==="active"&&v.current_hp>0;r.innerHTML=`
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
              <div style="height:100%;width:${x}%;background:${x>50?"var(--red)":x>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
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
          ${o.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':o.map((n,e)=>{var i;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${e<3?"var(--gold)":"var(--text-dim)"}">#${e+1}</span>
                <span style="flex:1">${n.name}</span>
                <span style="color:var(--red)">${(i=n.total_damage)==null?void 0:i.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${n.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const n=document.getElementById("btnAttackBoss");n.disabled=!0,n.textContent="⏳ Đang giao chiến...";const e=document.getElementById("bossCombatResult");try{const i=await p.attackWorldBoss(u);if(t.player=i.player,k(),i.log&&i.log.length>0){const d=i.log.map(T=>T.startsWith("---")?`<div class="turn">${T}</div>`:T.includes("hụt")?`<div class="miss">${T}</div>`:T.includes("né được")?`<div class="dodge">${T}</div>`:T.includes("CHÍNH MẠNG")||T.includes("💥")?`<div class="crit">${T}</div>`:T.includes("🔥")?`<div class="heavy text-orange">${T}</div>`:T.includes("chặn hoàn toàn")||T.includes("🛡")?`<div class="dodge">${T}</div>`:T.includes("ngã xuống")||T.includes("💀")?`<div class="death">${T}</div>`:T.includes("Chiến thắng")||T.includes("🏆")?`<div class="victory">${T}</div>`:T.includes("bỏ chạy")||T.includes("🏃")?`<div class="flee">${T}</div>`:T.includes("Bất phân")||T.includes("🤝")?`<div class="stalemate">${T}</div>`:T.includes("🧪")?`<div class="status-effect text-purple">${T}</div>`:T.includes("💔")?`<div class="dot-damage text-purple bold">${T}</div>`:T.includes("✨")?`<div class="regen text-green">${T}</div>`:`<div class="hit">${T}</div>`).join(""),s={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},h=s[i.outcome]||s.loss,f=Math.max(0,t.player.currentHp/t.player.maxHp*100);e.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${h.icon} ${h.text}
                <span class="subtitle">${i.turns}/${i.maxTurns||25} lượt · ⚔️ ${i.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${h.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${t.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${f}%"></div></div>
                    <div class="mini-hp-val">${t.player.currentHp}/${t.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${v.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(i.bossHp/i.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${i.bossHp.toLocaleString()}/${i.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${d}</div>
            </div>`}i.defeated?c(i.message,"success"):c(`⚔️ ${i.damage} dmg!`,"info"),await l()}catch(i){c(i.message,"error"),n.disabled=!1,n.textContent="⚔️ Tấn Công"}})}l()}function _t(r,a){const{state:t,api:p,notify:c,updateSidebar:k,renderGame:u}=a,l=t.playerId,b={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function $(){var x;try{const[o,y]=await Promise.all([p.getGachaPools(),p.getGachaPity(l)]);t._gacha={pools:o.pools||{},pity:y.pity||{},results:((x=t._gacha)==null?void 0:x.results)||[]},v()}catch(o){c(o.message,"error")}}function v(){const x=t._gacha||{},o=x.pools||{},y=x.pity||{},m=x.results||[];r.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(o).map(([g,n])=>{var i,d,s;const e=y[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${n.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${b.legendary}">★ ${(i=n.rates)==null?void 0:i.legendary}%</span> ·
                <span style="color:${b.rare}">◆ ${(d=n.rates)==null?void 0:d.rare}%</span> ·
                <span style="color:${b.uncommon}">● ${(s=n.rates)==null?void 0:s.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${e.pulls_since_rare||0}/${n.pityRare} · Legend: ${e.pulls_since_legendary||0}/${n.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="1">💎 ${n.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="10">💎 ${n.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${m.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${m.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${m.map(g=>{var n,e,i,d;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${b[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((n=g.item)==null?void 0:n.slot)==="weapon"?"⚔️":((e=g.item)==null?void 0:e.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${b[g.rarity]}">${((i=g.item)==null?void 0:i.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((d=g.item)==null?void 0:d.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,r.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const n=g.dataset.pool,e=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const i=await p.gachaPull(t.playerId,n,e);c(i.message,"success"),t.player=i.player,k(),t._gacha.results=i.results||[],t._gacha.pity[n]=i.pity,v()}catch(i){c(i.message,"error"),g.disabled=!1}}))}$()}function Bt(r,a){const{state:t,api:p,notify:c}=a,k=t._lbTab||"level";async function u(){try{t._lbData=await p.getLeaderboard(k),l()}catch(b){c(b.message,"error")}}function l(){const $=(t._lbData||{}).rankings||[],v={level:"📊 Level",gold:"💰 Linh Thạch",pvp:"⚔️ PvP",guild:"🏯 Tông Môn"};r.innerHTML=`
      <div class="page-header">
        <h2>🏆 Bảng Xếp Hạng</h2>
        <p class="page-sub">Top 50 người chơi và guild.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        ${Object.entries(v).map(([x,o])=>`<button class="btn ${k===x?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="${x}">${o}</button>`).join("")}
      </div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${k==="guild"?$.map((x,o)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${o<3?"var(--gold)":"var(--text-dim)"}">#${o+1}</span>
              <span style="flex:1">
                <strong>[${x.tag}] ${x.name}</strong>
                <span style="opacity:0.4"> Lv${x.level}</span>
              </span>
              <span style="opacity:0.4">${x.members}/${x.max_members} 👤</span>
              <span style="color:var(--gold);margin-left:8px">💰 ${parseInt(x.treasury||0).toLocaleString()}</span>
            </div>
          `).join(""):k==="pvp"?$.map((x,o)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${o<3?"var(--gold)":"var(--text-dim)"}">#${o+1}</span>
              <span style="flex:1"><strong>${x.name}</strong> <span style="opacity:0.4">Lv${x.level}</span></span>
              <span style="color:var(--blue)">${x.rating} ELO</span>
              <span style="opacity:0.4;margin-left:6px">${x.wins}W/${x.losses}L</span>
            </div>
          `).join(""):$.map((x,o)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${o<3?"var(--gold)":"var(--text-dim)"}">#${o+1}</span>
              <span style="flex:1"><strong>${x.name}</strong></span>
              ${k==="level"?`<span>Lv${x.level}</span>`:""}
              <span style="color:var(--gold);margin-left:8px">💎 ${parseInt(x.gold||0).toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,r.querySelectorAll(".tab-btn").forEach(x=>x.addEventListener("click",()=>{t._lbTab=x.dataset.tab,u()}))}u()}const C={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},nt=document.getElementById("app"),J={get state(){return C},api:q,notify:z,renderGame:H,updateSidebar:Gt};async function zt(){const r=localStorage.getItem("playerId");if(r&&!C.playerId)try{const a=await q.getPlayer(r);C.playerId=r,C.player=a.player,await V(),H();return}catch{localStorage.removeItem("playerId")}C.playerId?H():st()}function st(){var a,t;const r=C.authTab||"login";nt.innerHTML=`
    <div class="intro-page">
      <div class="intro-box">
        <div class="title">NGHỊCH THIÊN KÝ</div>
        <div class="intro-text">Thế giới này vận hành theo quy luật tuyệt đối.
Không ai có thể vượt qua.

...Cho đến khi hệ thống xuất hiện lỗi.</div>

        <div class="auth-tabs">
          <button class="btn btn--sm ${r==="login"?"btn--blue":"btn--dark"}" data-auth="login">Đăng nhập</button>
          <button class="btn btn--sm ${r==="register"?"btn--blue":"btn--dark"}" data-auth="register">Đăng ký</button>
        </div>

        ${r==="login"?`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(p=>{p.addEventListener("click",()=>{C.authTab=p.dataset.auth,st()})}),(a=document.getElementById("btnLogin"))==null||a.addEventListener("click",async()=>{const p=document.getElementById("inpUsername").value.trim(),c=document.getElementById("inpPassword").value;if(!p||!c)return z("Vui lòng nhập đầy đủ","error");try{const k=await q.login(p,c);C.playerId=k.id,C.player=k.player,localStorage.setItem("playerId",k.id),z(k.message,"success"),await V(),H()}catch(k){z(k.message||"Đăng nhập thất bại!","error")}}),(t=document.getElementById("btnRegister"))==null||t.addEventListener("click",async()=>{var l,b;const p=document.getElementById("inpUsername").value.trim(),c=document.getElementById("inpPassword").value,k=((l=document.getElementById("inpName"))==null?void 0:l.value.trim())||"Vô Danh",u=((b=document.querySelector('input[name="gender"]:checked'))==null?void 0:b.value)||"male";if(!p||!c)return z("Vui lòng nhập đầy đủ","error");try{const $=await q.register(p,c,k,u);C.playerId=$.id,C.player=$.player,localStorage.setItem("playerId",$.id),z($.message,"success"),await V(),H()}catch($){z($.message||"Đăng ký thất bại!","error")}})}function it(r){const a=Math.floor(Date.now()/1e3),t=[];return r.hospitalUntil&&r.hospitalUntil>a&&t.push({icon:"🏥",label:"Tịnh dưỡng",endTime:r.hospitalUntil,color:"var(--red)"}),r.medCooldownUntil&&r.medCooldownUntil>a&&t.push({icon:"💊",label:"Đan độc",endTime:r.medCooldownUntil,color:"var(--orange)"}),r.jailUntil&&r.jailUntil>a&&t.push({icon:"⛓️",label:"Ngục tù",endTime:r.jailUntil,color:"var(--purple)"}),r.travelArrivesAt&&r.travelArrivesAt>a&&t.push({icon:"🚶",label:"Di chuyển",endTime:r.travelArrivesAt,color:"var(--blue)"}),t.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${t.map(p=>{const c=Math.max(0,p.endTime-a),k=Math.floor(c/60),u=c%60,l=k>0?`${k}p${String(u).padStart(2,"0")}s`:`${u}s`;return`<span class="status-icon" data-end="${p.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${p.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${p.color};white-space:nowrap;
      " title="${p.label}">${p.icon} <span class="cd-time">${l}</span></span>`}).join("")}
  </div>`}let G=null;function Ot(){G&&clearInterval(G),G=setInterval(()=>{const r=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(a=>{const t=parseInt(a.dataset.end),p=Math.max(0,t-r);if(p<=0){a.remove();return}const c=Math.floor(p/60),k=p%60,u=a.querySelector(".cd-time");u&&(u.textContent=c>0?`${c}p${String(k).padStart(2,"0")}s`:`${k}s`)}),document.querySelectorAll(".status-effects").forEach(a=>{a.children.length===0&&a.remove()})},1e3)}function rt(r){let a="";const p={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[r.currentArea];return p&&(a+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${p.tooltip}">${p.icon} Cảnh Vực</span>`),r.combatBuffs&&r.combatBuffs.length>0&&r.combatBuffs.forEach(c=>{let k="💊",u="Buff";c.type==="status"&&c.stat==="poison"?(k="☠️",u="Trúng Độc"):c.type==="status"&&c.stat==="confuse"?(k="👹",u="Ma Hóa"):c.stat==="allStats"||c.stat==="hp"||c.stat==="damage"?(k="🔥",u="Cuồng Nộ"):c.stat==="defense"||c.stat==="resist"?(k="🛡️",u="Kiên Cố"):c.stat==="speed"||c.stat==="dexterity"?(k="💨",u="Thân Pháp"):(k="✨",u="Cường Hóa");let l=c.duration?` (-${c.duration} Trận)`:"",b=`Hiệu ứng: ${c.stat} (${c.type} ${c.value})${c.duration?` - Còn lại: ${c.duration} Trận đấu`:""}`;a+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${b}">${k} ${u}${l}</span>`}),a?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${a}</div>`:""}function H(){var x,o,y,m,g,n,e,i,d;const r=C.player;if(!r)return;const a=Math.max(0,r.currentHp/r.maxHp*100),t=r.maxStamina>0?Math.max(0,r.currentStamina/r.maxStamina*100):0,p=r.maxEnergy>0?Math.max(0,r.currentEnergy/r.maxEnergy*100):0,c=(r.maxNerve??15)>0?Math.max(0,(r.nerve??0)/(r.maxNerve??15)*100):0,k=C.exploration?C.exploration[r.currentArea||"thanh_lam_tran"]:null,u=k?k.name:"Khám Phá";nt.innerHTML=`
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
          <div class="player-name">${r.name}</div>
          ${r.activeTitle?`<div style="font-size:10px;color:var(--gold);font-weight:600;letter-spacing:0.5px;margin-top:1px">『${r.activeTitle}』</div>`:""}
          <div class="player-meta">Lv.${r.level} · ${((x=r.realmInfo)==null?void 0:x.fullName)||"?"}</div>
          ${it(r)}
          ${rt(r)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${r.currentHp}/${r.maxHp}
                ${r.currentHp<r.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(o=r.skills)!=null&&o.some(s=>s.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${a}%" data-low="${a<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${r.currentStamina??100}/${r.maxStamina??100}
                ${(r.currentStamina??100)<(r.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((y=r.stats)==null?void 0:y.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${t}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${r.currentEnergy}/${r.maxEnergy}
                ${r.currentEnergy<r.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((m=r.stats)==null?void 0:m.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${p}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${r.nerve??0}/${r.maxNerve??15}${(r.nerve??0)<(r.maxNerve??15)?'<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+1/5min</span>':""}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${c}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${r.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${C.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(r.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
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
            📍 ${u} ${r.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':r.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(r.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <li class="nav-section">TỰ THÂN</li>
          <li class="nav-item ${C.currentPage==="stats"?"active":""}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${(n=(g=C.player)==null?void 0:g.realmInfo)!=null&&n.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="inventory"?"active":""}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(r.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)">⏳</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="skills"||C.currentPage==="education"?"active":""}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>


          <li class="nav-item ${["travel","dungeon","tiencanh"].includes(C.currentPage)?"active":""}" data-page="travel">
            <span class="icon">🚶</span> Ngao Du
            ${(r.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="quests"||C.currentPage==="dailyquest"?"active":""}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(r.activeQuests||[]).filter(s=>s.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(r.activeQuests||[]).filter(s=>s.status==="active").length}</span>`:""}
          </li>
          <li class="nav-item ${C.currentPage==="crimes"?"active":""}" data-page="crimes">
            <span class="icon">💀</span> Ác Nghiệp
          </li>

          <li class="nav-section">NGAO DU</li>
          <li class="nav-item ${C.currentPage==="combat"?"active":""}" data-page="combat">
            <span class="icon">🔍</span> Khám Phá (${u})
          </li>

          <li class="nav-section">CHIẾN ĐẤU</li>
          <li class="nav-item ${C.currentPage==="arena"?"active":""}" data-page="arena">
            <span class="icon">⚔️</span> Đấu Trường
          </li>
          <li class="nav-item ${C.currentPage==="tower"?"active":""}" data-page="tower">
            <span class="icon">🗼</span> Thiên Phần Tháp
          </li>

          <li class="nav-section">THẾ GIỚI</li>
          <li class="nav-item ${C.currentPage==="housing"?"active":""}" data-page="housing">
            <span class="icon">🏠</span> Động Phủ
          </li>
          <li class="nav-item ${C.currentPage==="guild"?"active":""}" data-page="guild">
            <span class="icon">🏯</span> Tông Môn
          </li>
          <li class="nav-item ${C.currentPage==="alchemy"?"active":""}" data-page="alchemy">
            <span class="icon">⚒️</span> Chế Tác
          </li>
          <li class="nav-item ${C.currentPage==="wiki"?"active":""}" data-page="wiki">
            <span class="icon">📚</span> Tri Thức
          </li>
          <li class="nav-item ${C.currentPage==="leaderboard"?"active":""}" data-page="leaderboard">
            <span class="icon">🏆</span> Xếp Hạng
          </li>

          <li class="nav-section">KINH TẾ</li>
          <li class="nav-item ${C.currentPage==="market"||C.currentPage==="auction"?"active":""}" data-page="market">
            <span class="icon">🏪</span> Giao Dịch & Đấu Giá
          </li>
          <li class="nav-item ${C.currentPage==="npcshop"?"active":""}" data-page="npcshop">
            <span class="icon">🧓</span> Thương Nhân
          </li>

          ${r.role==="admin"?`
          <li class="nav-section">VÔ THƯỢNG</li>
          <li class="nav-item ${C.currentPage==="admin"?"active":""}" data-page="admin">
            <span class="icon">⚙️</span> Admin
          </li>`:""}
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(s=>{s.addEventListener("click",()=>{C.currentPage=s.dataset.page,H()})}),(e=document.getElementById("btnFabChat"))==null||e.addEventListener("click",()=>D("chat")),(i=document.getElementById("btnFabSocial"))==null||i.addEventListener("click",()=>D("social"));const l=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');l&&l.addEventListener("click",s=>{s.stopPropagation(),C.currentPage="events",C.popupOpen=!1,H()}),(d=document.getElementById("btnPopupClose"))==null||d.addEventListener("click",()=>{C.popupOpen=!1,H()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(s=>{s.addEventListener("click",()=>D(s.dataset.popup))}),At(),C.popupOpen&&Rt();const b=document.getElementById("searchPlayerInput"),$=document.getElementById("searchResults");let v=null;b&&$&&(b.addEventListener("input",()=>{clearTimeout(v);const s=b.value.trim();if(s.length<2){$.style.display="none";return}v=setTimeout(async()=>{try{const h=await q.searchPlayers(s),f=h.players||h.results||[];f.length===0?$.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':$.innerHTML=f.map(T=>{var w;return`
              <div class="search-result" data-pid="${T.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${T.name} <span style="opacity:0.4">Lv.${T.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((w=T.realmInfo)==null?void 0:w.name)||""}</span>
              </div>
            `}).join(""),$.style.display="block",$.querySelectorAll(".search-result").forEach(T=>{T.addEventListener("click",()=>{C.currentPage="profile",C._viewProfileId=T.dataset.pid,$.style.display="none",b.value="",H()}),T.addEventListener("mouseenter",()=>T.style.background="rgba(255,255,255,0.08)"),T.addEventListener("mouseleave",()=>T.style.background="transparent")})}catch{$.style.display="none"}},300)}),b.addEventListener("blur",()=>{setTimeout(()=>{$.style.display="none"},200)}),b.addEventListener("keydown",s=>{s.key==="Escape"&&($.style.display="none",b.blur())})),Ot()}function D(r){C.popupOpen=!0,C.popupPage=r,H()}function Rt(){const r=document.getElementById("popupContent");r&&(C.popupPage==="chat"?at(r,J):C.popupPage==="social"&&et(r,J))}const jt={combat:ct,crimes:yt,education:Y,stats:ut,skills:vt,inventory:K,travel:tt,alchemy:F,quests:bt,admin:xt,social:et,chat:at,market:ft,realm:$t,events:Tt,dungeon:Z,housing:St,wiki:Et,npcshop:Ct,guild:It,library:X,profile:Mt,arena:Pt,auction:qt,dailyquest:Ht,worldboss:Nt,gacha:_t,leaderboard:Bt,tiencanh:wt,tower:Lt};function At(){const r=document.getElementById("pageContent");if(!r)return;const a=jt[C.currentPage];a&&a(r,J)}function Gt(){var k,u,l,b,$;const r=C.player;if(!r)return;const a=Math.max(0,r.currentHp/r.maxHp*100),t=r.maxEnergy>0?Math.max(0,r.currentEnergy/r.maxEnergy*100):0,p=document.querySelector(".sidebar-player");if(p){const v=r.maxStamina>0?Math.max(0,r.currentStamina/r.maxStamina*100):0,x=(r.maxNerve??15)>0?Math.max(0,(r.nerve??0)/(r.maxNerve??15)*100):0;p.innerHTML=`
      <div class="player-name">${r.name}</div>
      <div class="player-meta">Lv.${r.level} · ${((k=r.realmInfo)==null?void 0:k.fullName)||"?"}</div>
      ${it(r)}
      ${rt(r)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${r.currentHp}/${r.maxHp}
            ${r.currentHp<r.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(u=r.skills)!=null&&u.some(o=>o.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${a}%" data-low="${a<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${r.currentStamina??100}/${r.maxStamina??100}
            ${(r.currentStamina??100)<(r.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((l=r.stats)==null?void 0:l.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${v}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${r.currentEnergy}/${r.maxEnergy}
            ${r.currentEnergy<r.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((b=r.stats)==null?void 0:b.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${t}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label"><span>💀 Nghịch Khí</span><span>${r.nerve??0}/${r.maxNerve??15}</span></div>
        <div class="bar-track"><div class="bar-fill nerve" style="width:${x}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${r.gold??0} Linh Thạch</div>`}const c=document.querySelector('.nav-item[data-page="stats"]');if(c){let v="";r.statPoints>0&&(v+=`<span class="badge">${r.statPoints}</span>`),($=r.realmInfo)!=null&&$.canBreakthrough&&(v+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),c.querySelectorAll(".badge").forEach(x=>x.remove()),c.insertAdjacentHTML("beforeend",v)}}async function V(){try{const[r,a,t,p,c,k]=await Promise.all([q.getMonsters(),q.getSkills(),q.getItems(),q.getMedicines(),q.getCrimes(),q.getEducation()]);C.monsters=r.monsters||[],C.skills=a.skills||[],C.items=t.items||[],C.medicines=p.medicines||[],C.crimes=c.crimes||[],C.educationTrees=k.trees||[],C.exploration=await q.getExploration(),C.recipes=(await q.getRecipes()).recipes,C.npcs=(await q.getNpcs()).npcs||[]}catch(r){console.error("Lỗi tải dữ liệu:",r)}}function z(r,a="info"){var p;(p=document.querySelector(".notification"))==null||p.remove();const t=document.createElement("div");t.className=`notification ${a}`,t.textContent=r,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}zt();
//# sourceMappingURL=index-oYOvurnL.js.map
