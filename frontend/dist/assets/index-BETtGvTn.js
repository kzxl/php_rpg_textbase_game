(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))p(o);new MutationObserver(o=>{for(const k of o)if(k.type==="childList")for(const u of k.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&p(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const k={};return o.integrity&&(k.integrity=o.integrity),o.referrerPolicy&&(k.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?k.credentials="include":o.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function p(o){if(o.ep)return;o.ep=!0;const k=t(o);fetch(o.href,k)}})();const lt="/api";class ot{async request(e,t={}){try{const p=await fetch(`${lt}${e}`,{headers:{"Content-Type":"application/json",...t.headers},...t}),o=await p.json();if(!p.ok)throw new Error(o.error||`HTTP ${p.status}`);return o}catch(p){throw console.error(`API Error [${e}]:`,p),p}}register(e,t,p,o){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:e,password:t,name:p,gender:o})})}login(e,t){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})})}createPlayer(e,t){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:e,gender:t})})}getPlayer(e){return this.request(`/player/${e}`)}allocateStat(e,t,p=1){return this.request(`/player/${e}/allocate`,{method:"POST",body:JSON.stringify({stat:t,points:p})})}equipItem(e,t){return this.request(`/player/${e}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}learnSkill(e,t){return this.request(`/player/${e}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:t})})}equipSkill(e,t,p=!0){return this.request(`/player/${e}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:t,equip:p})})}healPlayer(e){return this.request(`/player/${e}/heal`,{method:"POST"})}useMedicine(e,t){return this.request(`/player/${e}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}trainStat(e,t){return this.request(`/player/${e}/train`,{method:"POST",body:JSON.stringify({stat:t})})}fullCombat(e,t=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e,monsterId:t})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(e,t){return this.request(`/player/${e}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}useItem(e,t){return this.request(`/player/${e}/use`,{method:"POST",body:JSON.stringify({itemId:t})})}useMedicine(e,t){return this.request(`/player/${e}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}generateItem(e,t){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,playerId:e})})}trainStat(e,t,p=1){return this.request(`/player/${e}/train`,{method:"POST",body:JSON.stringify({stat:t,count:p})})}allocateStat(e,t){return this.request(`/player/${e}/allocate`,{method:"POST",body:JSON.stringify({stat:t})})}attemptBreakthrough(e){return this.request(`/player/${e}/breakthrough`,{method:"POST"})}getRealm(e){return this.request(`/player/${e}/realm`)}craftItem(e,t){return this.request(`/player/${e}/craft`,{method:"POST",body:JSON.stringify({recipeId:t})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(e,t,p,o=-1){return this.request(`/player/${e}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:p,lockAffixIndex:o})})}commitCrime(e,t){return this.request(`/player/${e}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:t})})}escapeJail(e){return this.request(`/player/${e}/escape-jail`,{method:"POST"})}bail(e){return this.request(`/player/${e}/bail`,{method:"POST"})}enrollNode(e,t,p){return this.request(`/player/${e}/enroll`,{method:"POST",body:JSON.stringify({nodeId:t,treeId:p})})}checkEducation(e){return this.request(`/player/${e}/check-education`,{method:"POST"})}generateItem(e="common",t=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,slot:t})})}explore(e){return this.request(`/player/${e}/explore`,{method:"POST"})}trackMonster(e,t){return this.request(`/player/${e}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:t})})}getAreaMonsters(e){return this.request(`/player/${e}/area-monsters`)}getNpc(e){return this.request(`/npc/${e}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(e,t,p){return this.request(`/player/${e}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:t,questId:p})})}completeQuest(e,t){return this.request(`/player/${e}/complete-quest`,{method:"POST",body:JSON.stringify({questId:t})})}getQuests(e){return this.request(`/player/${e}/quests`)}searchPlayers(e){return this.request(`/players/search?q=${encodeURIComponent(e)}`)}getRelationships(e){return this.request(`/player/${e}/relationships`)}interactPlayer(e,t,p,o){return this.request(`/player/${e}/interact`,{method:"POST",body:JSON.stringify({targetId:t,action:p,amount:o})})}addFriend(e,t){return this.request(`/player/${e}/add-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}acceptFriend(e,t){return this.request(`/player/${e}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}rejectFriend(e,t){return this.request(`/player/${e}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}removeFriend(e,t){return this.request(`/player/${e}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}addEnemy(e,t){return this.request(`/player/${e}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}removeEnemy(e,t){return this.request(`/player/${e}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}getGlobalChat(e=0){return this.request(`/chat/global?afterId=${e}`)}getPrivateChat(e,t,p=0){return this.request(`/chat/private/${e}?with=${t}&afterId=${p}`)}getChatFriends(e){return this.request(`/chat/friends/${e}`)}sendChat(e,t,p,o){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:e,channel:t,receiverId:p,message:o})})}getMarketListings(e="",t="newest"){const p=new URLSearchParams;return e&&p.set("type",e),t&&p.set("sort",t),this.request(`/market?${p.toString()}`)}getMyListings(e){return this.request(`/market/my/${e}`)}listForSale(e,t,p,o,k){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:e,itemType:t,itemId:p,quantity:o,price:k})})}buyFromMarket(e,t,p=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:e,listingId:t,quantity:p})})}cancelListing(e,t){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:e,listingId:t})})}getRealmInfo(e){return this.request(`/player/${e}/realm`)}attemptBreakthrough(e){return this.request(`/player/${e}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(e){return this.request(`/player/${e}/mug-targets`)}mugPlayer(e,t){return this.request(`/player/${e}/mug`,{method:"POST",body:JSON.stringify({victimId:t})})}getMugLog(e){return this.request(`/player/${e}/mug-log`)}getMapItems(e){return this.request(`/player/${e}/map-items`)}enterDungeon(e,t){return this.request(`/player/${e}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:t})})}fightDungeonWave(e){return this.request(`/player/${e}/dungeon/fight`,{method:"POST"})}abandonDungeon(e){return this.request(`/player/${e}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(e){return this.request(`/player/${e}/dungeon/history`)}getHousing(e){return this.request(`/player/${e}/housing`)}buyHousing(e){return this.request(`/player/${e}/housing/buy`,{method:"POST"})}plantHerb(e,t,p){return this.request(`/player/${e}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:t,slotIndex:p})})}harvestGarden(e){return this.request(`/player/${e}/housing/harvest`,{method:"POST"})}upgradeFormation(e,t){return this.request(`/player/${e}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:t})})}payMaintenance(e){return this.request(`/player/${e}/housing/maintenance`,{method:"POST"})}listForRent(e,t){return this.request(`/player/${e}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:t})})}getRentals(){return this.request("/housing/rentals")}rentRoom(e,t){return this.request(`/player/${e}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:t})})}getMyGuild(e){return this.request(`/player/${e}/guild`)}createGuild(e,t,p,o){return this.request(`/player/${e}/guild/create`,{method:"POST",body:JSON.stringify({name:t,tag:p,description:o})})}contributeGuild(e,t){return this.request(`/player/${e}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:t})})}upgradeGuild(e){return this.request(`/player/${e}/guild/upgrade`,{method:"POST"})}joinGuild(e,t){return this.request(`/player/${e}/guild/join`,{method:"POST",body:JSON.stringify({guildId:t})})}leaveGuild(e){return this.request(`/player/${e}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(e){return this.request(`/guild/${e}/upkeep`,{method:"POST"})}getTribulation(e){return this.request(`/player/${e}/tribulation`)}fightTribulation(e){return this.request(`/player/${e}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(e,t,p,o=-1){return this.request(`/player/${e}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:p,lockAffixIndex:o})})}getShops(e){return this.request("/shops")}buyFromShop(e,t,p,o=1){return this.request(`/player/${e}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:t,itemId:p,quantity:o})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(e){return this.request(`/players/lookup?q=${encodeURIComponent(e)}`)}getPlayerProfile(e){return this.request(`/player/${e}/profile`)}getArena(e){return this.request(`/player/${e}/arena`)}arenaFight(e){return this.request(`/player/${e}/arena/fight`,{method:"POST"})}getAuctions(e=""){return this.request(`/auction${e?"?q="+encodeURIComponent(e):""}`)}getMyAuctions(e){return this.request(`/player/${e}/auction/mine`)}listAuction(e,t,p,o=24){return this.request(`/player/${e}/auction/list`,{method:"POST",body:JSON.stringify({itemId:t,buyoutPrice:p,durationHours:o})})}buyAuction(e,t){return this.request(`/player/${e}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:t})})}cancelAuction(e,t){return this.request(`/player/${e}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:t})})}getDailyQuests(e){return this.request(`/player/${e}/daily-quests`)}claimDailyQuest(e,t){return this.request(`/player/${e}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:t})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(e){return this.request(`/player/${e}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(e){return this.request(`/player/${e}/gacha/pity`)}gachaPull(e,t,p=1){return this.request(`/player/${e}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:t,pulls:p})})}getLeaderboard(e){return this.request(`/leaderboard/${e}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(e){return this.request(`/events/quick/${e}`,{method:"POST"})}}const q=new ot;function ct(i,e){var g;const{state:t,api:p,notify:o,renderGame:k,updateSidebar:u}=e,l=t.player,x=t.exploration?t.exploration[l.currentArea||"thanh_lam_tran"]:null,f=x?x.name:"Vùng Đất Vô Danh",v=x?x.staminaCost:10;i.innerHTML=`
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
    </div>`;const b=((g=l.insightLevels)==null?void 0:g.monster)??0;(async()=>{try{const n=await p.getAreaMonsters(l.id);if(n.monsters){t.player.trackedMonsters=n.monsters;const a=document.getElementById("trackedMonstersList");if(!a)return;if(n.monsters.length===0){a.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}a.innerHTML=n.monsters.map(d=>{var P,M,I,N,R;const s=d.currentHp/d.stats.hp*100,h=s>60?"var(--green)":s>30?"var(--orange)":"var(--red)";let $='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';b>=1&&($=`<div class="item-desc text-sm text-dim mb-sm">${d.description||"Yêu thú vùng này."}</div>`);let T="";b>=1&&(T=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${s}%; background: ${h}; height: 100%;"></div>
            </div>`);let w=b>=2?`❤ ${d.currentHp}/${d.stats.hp}`:b>=1?"❤ ???":"",L="";b>=3&&(L=`
              <span class="text-orange">💪 ${d.stats.strength}</span>
              <span class="text-cyan">🏃 ${d.stats.speed}</span>
              <span class="text-green">🎯 ${d.stats.dexterity}</span>
              <span class="text-blue">🛡 ${d.stats.defense}</span>`);let E="";b>=4&&d.drops&&d.drops.length>0&&(E=`<div class="text-xs text-dim mt-sm" style="display:flex;gap:4px;flex-wrap:wrap;">
              📦 ${d.drops.map(B=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:9px;padding:1px 4px;">${B.id} (${b>=5?B.chance+"%":"?%"})</span>`).join("")}
            </div>`);let S="";if(b>=5){const B=((P=d.goldReward)==null?void 0:P[0])??((M=d.goldReward)==null?void 0:M.min)??"?",_=((I=d.goldReward)==null?void 0:I[1])??((N=d.goldReward)==null?void 0:N.max)??"?";S=`<span class="text-gold">💰 ${B}-${_}</span> <span class="text-purple">✨ ${d.xpReward??"?"} XP</span>`}return`
            <div class="list-item flex flex-col items-start gap-4">
              <div class="item-info" style="width: 100%;">
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-name text-lg">${d.name} <span class="text-xs text-dim">(${((R=d.instance_id)==null?void 0:R.substring(0,8))??""})</span></div>
                  <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${d.instance_id}" data-mid="${d.id}">Giao Chiến</button>
                </div>
                ${$}
                ${T}
                <div class="item-meta flex gap-4 text-xs flex-wrap">
                  ${w?`<span class="text-red">${w}</span>`:""}
                  ${L}
                  ${S}
                </div>
                ${E}
              </div>
            </div>`}).join(""),a.querySelectorAll(".btn-attack-tracked").forEach(d=>{d.addEventListener("click",s=>{const h=s.currentTarget;W(e,h.dataset.mid,h.dataset.inst)})})}}catch(n){console.error("Lỗi tải dấu vết:",n)}})(),(async()=>{const n=document.getElementById("areaMonstersList");if(n)try{const a=await p.getAreaMonsters(l.id),r=t.exploration?t.exploration[l.currentArea||"thanh_lam_tran"]:null,d=(t.monsters||[]).filter(h=>!h.isWorldBoss&&!h.is_world_boss),s=d.length>0?d:[];if(s.length===0){n.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không rõ quần thể yêu thú nơi đây.</div>';return}n.innerHTML=s.map(h=>{let $='<div class="item-desc text-sm text-dim mb-sm">Thông tin mờ ảo...</div>';return b>=1&&($=`<div class="item-desc text-sm text-dim mb-sm">${h.description||"Yêu thú sinh sống tại vùng này."}</div>`),`
          <div class="list-item flex flex-col items-start gap-4" style="opacity: 0.8;">
            <div class="item-info" style="width: 100%;">
              <div class="item-name text-md text-gold">${h.name} <span class="text-xs text-dim ml-sm">${h.tierName||""}</span></div>
              ${$}
            </div>
          </div>
        `}).join("")}catch(a){console.error("Lỗi tải quần thể:",a)}})();const m=document.getElementById("btnExplore");m&&m.addEventListener("click",()=>pt(e)),i.querySelectorAll(".list-item.clickable").forEach(n=>{n.addEventListener("click",()=>startCombat(n.dataset.mid,e))})}async function pt(i){var u,l,x;const{state:e,api:t,notify:p,updateSidebar:o}=i,k=document.getElementById("exploreResult");if(k){k.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const f=await t.explore(e.playerId);e.player=f.player,o();const v=f.event;let b=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(v.type==="monster")b+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${v.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${v.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${v.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(v.type==="monster_ambush"&&v.combatResult){const c=v.combatResult,y=(c.log||[]).map(n=>n.startsWith("---")?`<div class="turn">${n}</div>`:n.includes("hụt")?`<div class="miss">${n}</div>`:n.includes("CHÍNH MẠNG")||n.includes("💥")?`<div class="crit">${n}</div>`:n.includes("ngã xuống")||n.includes("💀")?`<div class="death">${n}</div>`:n.includes("Chiến thắng")||n.includes("🏆")?`<div class="victory">${n}</div>`:`<div class="hit">${n}</div>`).join(""),m=c.outcome==="win"?"🏆 Chiến thắng!":c.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",g=c.outcome==="win"?"var(--green)":c.outcome==="loss"?"var(--red)":"var(--orange)";b+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${v.message}</div>
        <div style="font-size:16px;font-weight:700;color:${g};margin-bottom:12px">${m}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${y}</div>
      `}else if(v.type==="worldBoss")b+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${v.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ mạnh!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${v.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${v.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(v.type==="npc"&&v.npcId){if(b+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${v.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
        <div class="text-sm text-dim mb-md" style="font-style:italic;">"${v.greeting}"</div>
      `,v.studyEffect){const c=v.studyEffect,y=c.isDebuff?"var(--red)":"var(--gold)";b+=`<div class="text-sm mt-sm" style="color:${y};animation:fadeIn 0.5s;">
          ${c.message}
        </div>`}v.hasQuests&&(b+=`<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${v.npcId}">💬 Nói Chuyện</button>`),b+='<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>',b+="</div></div>",b+='<div id="npcQuestModal"></div>'}else v.type==="player_encounter"&&v.player?b+=`
        <div style="font-size: 48px; margin-bottom: 8px;">👤</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
        <div class="text-sm text-dim mb-md">Âm thầm lướt qua hay chủ động giao hảo?</div>
        <div class="flex gap-2 justify-center mt-md w-full" style="flex-wrap:wrap">
          <button class="btn btn--blue flex-1" id="btnInteractFriend" data-pid="${v.player.id}">🤝 Kết Giao</button>
          <button class="btn btn--gold flex-1" id="btnInteractGift" data-pid="${v.player.id}">💎 Tặng 100 LT</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${v.player.id}">⚔️ Cướp Linh Thạch</button>
        </div>
      `:v.type==="npc"?b+=`
        <div style="font-size: 32px; margin-bottom: 8px;">👴</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
      `:v.type==="material"||v.type==="item"?(b+=`
        <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
        <div class="text-lg text-green bold mb-sm">${v.message}</div>
      `,v.questNotifications&&v.questNotifications.length>0&&v.questNotifications.forEach(c=>{b+=`<div class="text-sm text-gold mt-sm" style="animation: fadeIn 0.5s;">🏷️ ${c.message}</div>`})):b+=`
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${v.message}</div>
      `;v.type!=="monster"&&v.type!=="worldBoss"&&!(v.type==="npc"&&v.npcId)&&(b+='<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục hành trình</button>'),v.type==="npc"&&v.npcId||(b+="</div></div>"),k.innerHTML=b,v.type==="player_encounter"&&v.player&&(document.getElementById("btnInteractFriend").addEventListener("click",async c=>{try{const y=await t.addFriend(e.playerId,c.target.dataset.pid);(y.success||y.message)&&p(y.message||"Đã gửi lời mời!","success")}catch(y){p(y.message,"error")}}),document.getElementById("btnInteractGift").addEventListener("click",async c=>{var y;try{const m=await t.interactPlayer(e.playerId,c.target.dataset.pid,"gift",100);if(m.player){e.player=m.player,o(),p(m.message,"success");const g=c.target.closest(".panel-body");g&&(g.innerHTML='<div class="text-green text-lg mb-md">Đã bồi đắp hảo cảm!</div><button class="btn btn--blue" id="btnExploreContinueAfterGift">Rời đi</button>'),(y=document.getElementById("btnExploreContinueAfterGift"))==null||y.addEventListener("click",()=>{k.innerHTML=""})}}catch(m){p(m.message,"error")}}),(u=document.getElementById("btnInteractMug"))==null||u.addEventListener("click",async c=>{var m;const y=c.target.dataset.pid;c.target.disabled=!0,c.target.textContent="⏳ Đang tấn công...";try{const g=await t.request(`/player/${e.playerId}/mug`,{method:"POST",body:JSON.stringify({victimId:y})});e.player=g.player,o();const n=c.target.closest(".panel-body");if(n){const a=g.success?"var(--green)":"var(--red)",r=g.success?"💰":"💀";n.innerHTML=`
              <div style="font-size:36px;margin-bottom:8px">${r}</div>
              <div style="color:${a};font-size:16px;font-weight:700;margin-bottom:8px">${g.message}</div>
              ${g.goldStolen>0?`<div class="text-gold">+${g.goldStolen} 💎 Linh Thạch</div>`:""}
              <div style="font-size:11px;opacity:0.5;margin-top:8px">Tỉ lệ: ${g.successChance}%</div>
              <button class="btn btn--blue mt-md" id="btnExploreContinueAfterMug">Tiếp tục</button>
            `,(m=document.getElementById("btnExploreContinueAfterMug"))==null||m.addEventListener("click",()=>{k.innerHTML=""})}p(g.message,g.success?"success":"error")}catch(g){p(g.message,"error"),c.target.disabled=!1,c.target.textContent="⚔️ Cướp Linh Thạch"}})),(v.type==="monster"||v.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",c=>{k.innerHTML="",W(i,c.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async c=>{try{const y=await t.trackMonster(e.playerId,c.target.dataset.mid);y.success?(p(y.message,"success"),k.innerHTML="",typeof i.renderGame=="function"&&i.renderGame()):y.error&&p(y.error,"error")}catch(y){p("Lỗi theo dõi: "+y.message,"error")}})),v.type==="npc"&&v.npcId&&((l=document.getElementById("btnNpcInteract"))==null||l.addEventListener("click",async()=>{await gt(i,v.npcId,k)})),(x=document.getElementById("btnExploreContinue"))==null||x.addEventListener("click",()=>{k.innerHTML=""})}catch(f){k.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${f.message}</div></div>`}}}async function gt(i,e,t){const{state:p,api:o,notify:k,renderGame:u}=i,l=document.getElementById("npcQuestModal")||t;try{const f=(await o.getNpc(e)).npc;if(!f)return;const v=(p.player.activeQuests||[]).map(c=>c.quest_id);let b=f.quests.map(c=>{const y=v.includes(c.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${c.name}</span>
            <span class="text-xs badge" style="background:${c.type==="kill"?"var(--red)":"var(--green)"}">${c.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${c.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${c.rewards.gold?c.rewards.gold+"💎 ":""}${c.rewards.xp?c.rewards.xp+"✨ ":""}${c.rewards.skillChance?"🎯 "+c.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${y?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${e}" data-qid="${c.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");l.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${f.icon||"🧓"} ${f.name} <span class="subtitle">${f.profession}</span></div>
        <div class="panel-body">
          ${b||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,l.querySelectorAll(".btn-accept-quest").forEach(c=>{c.addEventListener("click",async()=>{c.disabled=!0,c.textContent="⏳...";try{const y=await o.acceptQuest(p.playerId,c.dataset.npc,c.dataset.qid);p.player=y.player,k(y.message,"success"),u()}catch(y){k(y.message||"Lỗi nhận quest","error"),c.disabled=!1,c.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(x){console.error("NPC load error:",x)}}async function W(i,e,t=null){var f;const{state:p,api:o,notify:k,updateSidebar:u,renderGame:l}=i,x=document.getElementById("combatResult");if(x){if(!p.player.currentHp||p.player.currentHp<=0)return k("Đã kiệt sức! Hãy hồi phục trước.","error");if((p.player.currentEnergy||0)<10&&!p.player.currentEnergy)return k("Không đủ Linh lực!","error");if(p.player.hospitalRemaining>0)return k(`Đang tịnh dưỡng! Còn ${p.player.hospitalRemaining}s`,"error");x.innerHTML='<div class="panel border-red bg-dark"><div class="panel-body text-center text-red">⚔️ Đang giao chiến...</div></div>',x.scrollIntoView({behavior:"smooth"});try{const v=await o.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:p.playerId,monsterId:t?null:e,trackedMonsterId:t})});if(p.player=v.player,v.outcome==="no_energy"){x.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${v.log[0]}</div></div>`,u();return}const b=v.log.map(d=>d.startsWith("---")?`<div class="turn">${d}</div>`:d.includes("linh lực")&&d.includes("+")?`<div class="energy">${d}</div>`:d.includes("linh lực")?`<div class="energy-cost">${d}</div>`:d.includes("kiệt linh")?`<div class="miss">${d}</div>`:d.includes("hụt")?`<div class="miss">${d}</div>`:d.includes("né được")?`<div class="dodge">${d}</div>`:d.includes("CHÍNH MẠNG")||d.includes("💥")?`<div class="crit">${d}</div>`:d.includes("🔥")?`<div class="heavy text-orange">${d}</div>`:d.includes("chặn hoàn toàn")||d.includes("🛡")?`<div class="dodge">${d}</div>`:d.includes("ngã xuống")||d.includes("💀")?`<div class="death">${d}</div>`:d.includes("Chiến thắng")||d.includes("🏆")?`<div class="victory">${d}</div>`:d.includes("Đột phá")||d.includes("🎉")?`<div class="levelup">${d}</div>`:d.includes("bỏ chạy")||d.includes("🏃")?`<div class="flee">${d}</div>`:d.includes("Hết")||d.includes("⏰")?`<div class="stalemate">${d}</div>`:d.includes("Bất phân")||d.includes("🤝")?`<div class="stalemate">${d}</div>`:d.includes("Thoát thân")||d.includes("🚪")?`<div class="flee">${d}</div>`:d.includes("Linh Thạch")||d.includes("💰")?`<div class="gold-reward">${d}</div>`:d.includes("Tịnh dưỡng")||d.includes("🏥")?`<div class="hospital">${d}</div>`:d.includes("🧪")?`<div class="status-effect text-purple">${d}</div>`:d.includes("💔")?`<div class="dot-damage text-purple bold">${d}</div>`:d.includes("✨")?`<div class="regen text-green">${d}</div>`:d.includes("♻️")?`<div class="reflect text-red">${d}</div>`:`<div class="hit">${d}</div>`).join(""),c=v.monster,y=Math.max(0,p.player.currentHp/p.player.maxHp*100),m=Math.max(0,c.currentHp/c.maxHp*100),g={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Thất bại",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},n=g[v.outcome]||g.loss,a=(f=v.rewards)!=null&&f.gold?` · +${v.rewards.gold} 💰`:"",r=v.rewards?` · +${v.rewards.xp} XP${a}`:"";x.innerHTML=`
      <div class="panel">
        <div class="panel-title">${n.icon} ${n.text}
          <span class="subtitle">${v.turns}/${v.maxTurns||25} lượt${r}</span>
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
              <div class="f-name monster-name">${c.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${m}%"></div></div>
              <div class="mini-hp-val">${c.currentHp}/${c.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${b}</div>
      </div>`,u(),t&&typeof l=="function"&&setTimeout(()=>l(),1500)}catch(v){x.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${v.message}</div></div>`}}}function X(i,e){const{state:t,api:p,notify:o}=e,k=t.player,u=(k.skills||[]).find(b=>(typeof b=="string"?b:b.id)==="nhan_thuat"),l=u?u.level||1:0,x=[...t.skills].sort((b,c)=>(b.tier||1)-(c.tier||1)),f=(k.skills||[]).map(b=>typeof b=="string"?b:b.id),v={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};i.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${l}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${x.map(b=>{const c=f.includes(b.id),y=b.tier||1,m=y>l+1,g=y<=l;let n="";return b.requirements&&b.requirements.length>0?g||c?n=`<div class="mt-sm text-xs text-orange">Điều kiện: ${b.requirements.map(a=>`<br>• ${a}`).join("")}</div>`:m?n=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${y}.</div>`:n='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':n='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${c?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${b.name} ${c?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${c?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${v[y]||y}</span>
                    <span class="text-xs text-dim">${b.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||c?b.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${b.type!=="passive"&&b.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${b.cost} linh lực</div>`:""}
                
                ${n}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${c?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${m?"btn--dark":"btn--gold"} btn--sm btn-learn" ${m?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${b.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,i.querySelectorAll(".accordion-header").forEach(b=>{b.addEventListener("click",()=>{const c=b.nextElementSibling;c.style.display==="none"?(c.style.display="block",b.querySelector("div:last-child").textContent="▲"):(c.style.display="none",b.querySelector("div:last-child").textContent="▼")})}),i.querySelectorAll(".btn-learn").forEach(b=>{b.addEventListener("click",async c=>{c.stopPropagation();try{const y=await p.learnSkill(k.id,b.dataset.sid);y.error?o(y.error,"error"):(t.player=y.player,o(y.message,"success"),X(i,e))}catch(y){o("Lỗi học kỹ năng: "+y.message,"error")}})})}function ut(i,e){var y,m,g;const{state:t,api:p,notify:o,renderGame:k}=e,u=t.player,l=u.stats,x=u.allocatedStats||{},f=5,v=u.currentEnergy>=f&&!u.hospitalRemaining,b=u.talentDisplay||{},c=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];i.innerHTML=`
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
          ${c.map(([n,a,r])=>{const d=b[n]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${d.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${a}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${r}</div>
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
        ${c.map(([n,a,r,d])=>{const s=b[n]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},h=Math.floor(u.currentEnergy/f)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${a}</span> ${r}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${d}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${l[n]??0}</span>
              ${x[n]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${x[n]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${s.color};min-width:50px" title="Căn Cốt: ${s.name} (×${s.value})">${s.icon}×${s.value}</span>
              <input type="number" class="train-count" data-stat="${n}" min="1" max="${h}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${v?"":"disabled"}>
              <button class="btn btn--sm ${v?"btn--blue":"btn--dark"} train-btn" data-train="${n}" ${v?"":"disabled"} title="Tốn ${f} Linh lực/lần · Căn cốt ×${s.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${f} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(u.currentEnergy/f)}</strong> lần hiện tại.
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
    </div>`,(g=i.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",async()=>{try{const n=i.querySelector(".btn-breakthrough");n.disabled=!0,n.innerHTML="Đang Độ Kiếp...";const a=await p.attemptBreakthrough(t.playerId);t.player=a.player,o(a.message,"success"),k()}catch(n){o(n.message||"Đột phá thất bại","error");const a=i.querySelector(".btn-breakthrough");a&&(a.disabled=!1,a.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),i.querySelectorAll(".train-btn").forEach(n=>{n.addEventListener("click",async a=>{a.stopPropagation();const r=i.querySelector(`.train-count[data-stat="${n.dataset.train}"]`),d=parseInt(r==null?void 0:r.value)||1;try{const s=await p.trainStat(t.playerId,n.dataset.train,d);t.player=s.player,o(s.message,"success"),k()}catch(s){o(s.message||"Lỗi rèn luyện","error")}})})}function Y(i,e){var r;const{state:t,api:p,notify:o,renderGame:k}=e,u=t.player,l=t.educationTrees||[],x=u.unlockedNodes||[],f=u.studyingNode||"",v=f?f.split("|")[0]:"",b=u.studyEndsAt||0,c=Math.max(0,b-Math.floor(Date.now()/1e3)),y=u.treeProgress||{},m=u.skillProgress||{};let g=localStorage.getItem("eduActiveTree")||((r=l[0])==null?void 0:r.id),n=l.find(d=>d.id===g)||l[0];!n&&l.length>0&&(n=l[0]);const a=()=>{if(!n){i.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const d=l.map(S=>`
      <button class="edu-tab ${S.id===n.id?"active":""}" data-tab="${S.id}">
        <span class="edu-tab-icon">${S.icon}</span>
        <span class="edu-tab-name">${S.name}</span>
        <span class="edu-tab-badge">${y[S.id]||0}</span>
      </button>
    `).join("");let s="";if(v){let S=null,P=null;l.forEach(M=>{const I=M.nodes.find(N=>N.id===v);I&&(S=I,P=M)}),S&&(s=`
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
        `)}const h=y[n.id]||0;let $=null;for(const S of n.milestones||[])if(h<S.require){$=S;break}let T="";$?T=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${$.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${$.description}</div>
        </div>
      `:T='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const w=u.discoveredNodes||[],L=(n.nodes||[]).map(S=>{const P=x.includes(S.id),M=v===S.id,I=(S.prerequisites||[]).every(A=>x.includes(A)),N=n.nodes.some(A=>(A.prerequisites||[]).includes(S.id));if(!(w.includes(S.id)||P||!(S.prerequisites&&S.prerequisites.length>0))||P&&N)return"";let B="";M?B="studying":P?B="done":B="available";let _="";M?_='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':v?_='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':P?_=`<button class="btn btn--sm btn--gold btn-learn" data-node="${S.id}">Tiếp Tục Lãnh Ngộ (${S.duration}s)</button>`:I?_=`<button class="btn btn--sm btn--blue btn-learn" data-node="${S.id}">Bắt Đầu (${S.duration}s)</button>`:_='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const j=m[S.id]||{level:1,exp:0},dt=j.level*100;let U="";return P&&(U=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${j.level} | Độ hiểu thấu: ${j.exp}/${dt}</div>`),`
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
      `}).join("");i.innerHTML=`
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
    `,i.querySelectorAll(".edu-tab").forEach(S=>{S.addEventListener("click",()=>{const P=S.dataset.tab;localStorage.setItem("eduActiveTree",P),g=P,n=l.find(M=>M.id===P)||l[0],a()})}),window.eduTimer&&clearInterval(window.eduTimer),v&&b>0&&(window.eduTimer=setInterval(()=>{const S=Math.floor(Date.now()/1e3);let P=Math.max(0,b-S);const M=document.getElementById("eduCounter");if(M&&(M.innerText=P+"s"),P<=0){clearInterval(window.eduTimer);const I=document.getElementById("btnCheckEdu");I&&(I.disabled=!1,I.innerHTML="✨ Đột Phá!")}},1e3));const E=i.querySelector("#btnCheckEdu");E&&E.addEventListener("click",async()=>{try{E.disabled=!0,E.innerHTML="Đang xử lý...";const S=await p.checkEducation(t.playerId);t.player=S.player,o(S.message,S.completed?"success":"info"),k()}catch(S){o(S.message||"Lỗi đột phá","error"),E.disabled=!1,E.innerHTML="Thử lại"}}),i.querySelectorAll(".btn-learn").forEach(S=>{S.addEventListener("click",async()=>{try{const P=S.dataset.node;S.disabled=!0,S.innerHTML="Chờ...";const M=await p.enrollNode(t.playerId,P,n.id);t.player=M.player,o(M.message,"success"),k()}catch(P){o(P.message||"Lỗi ghi danh","error"),S.disabled=!1,S.innerHTML="Bắt Đầu"}})})};a()}function vt(i,e){const{state:t,api:p,notify:o,renderGame:k}=e,u=t.player.skills||[],l=u.map(c=>typeof c=="string"?c:c.id),x=t.skills||[],f={combat:{icon:"⚔️",name:"Chiến Đấu",desc:"Chiêu thức sử dụng trong giao đấu"},life:{icon:"🛠️",name:"Sinh Hoạt",desc:"Thu thập, chế tạo, sinh tồn"},internal:{icon:"🧘",name:"Nội Công",desc:"Thụ động tăng cường bản thân"},gongfa:{icon:"📖",name:"Công Pháp",desc:"Tu luyện công pháp, nâng cao cảnh giới"}};let v=localStorage.getItem("skillsTab")||"combat";const b=()=>{if(v==="gongfa"){const a=Object.entries(f).map(([d,s])=>{const h=d==="gongfa"?(t.educationTrees||[]).length:u.filter($=>{const T=typeof $=="string"?$:$.id,w=x.find(L=>L.id===T);return w&&(w.category||"combat")===d}).length;return`<button class="skill-tab ${d===v?"active":""}" data-tab="${d}">
          ${s.icon} ${s.name} <span class="skill-tab-count">${h}</span>
        </button>`}).join("");i.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${a}</div>
        <div id="gongfa-content"></div>
      `,i.querySelectorAll(".skill-tab").forEach(d=>{d.addEventListener("click",()=>{v=d.dataset.tab,localStorage.setItem("skillsTab",v),b()})});const r=i.querySelector("#gongfa-content");r&&Y(r,e);return}const c=u.map(a=>{const r=typeof a=="string"?a:a.id;return{...x.find(s=>s.id===r)||{name:r,id:r,category:"combat"},level:a.level||1,xp:a.xp||a.currentXp||0,equipped:a.equipped||a.isEquipped||!1}}),y=c.filter(a=>(a.category||"combat")===v),m=x.filter(a=>(a.category||"combat")===v&&!l.includes(a.id)),g=Object.entries(f).map(([a,r])=>{const d=a==="gongfa"?(t.educationTrees||[]).length:c.filter(s=>(s.category||"combat")===a).length;return`<button class="skill-tab ${a===v?"active":""}" data-tab="${a}">
        ${r.icon} ${r.name} <span class="skill-tab-count">${d}</span>
      </button>`}).join(""),n=(a,r)=>{const d=a.level*100,s=Math.min(100,a.xp/d*100),h=a.type==="passive",$="★".repeat(Math.min(a.tier||1,7)),T=(a.tier||1)>=5?"var(--gold)":(a.tier||1)>=3?"var(--purple)":"var(--blue)";let w="";return r?h?w='<span style="font-size:10px;color:var(--green)">🔮 Vĩnh Viễn</span>':a.equipped?w=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${a.id}">Tháo</button>`:w=`<button class="btn btn--sm btn--blue equip-btn" data-eq="1" data-sid="${a.id}">Trang Bị</button>`:w='<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>',`
        <div class="skill-card ${r?"":"locked"} ${a.equipped&&!h?"equipped":""}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name">${a.name}</div>
              <div class="skill-card-tier" style="color:${T}">${$} Tầng ${a.tier||1}</div>
            </div>
            <div class="skill-card-action">${w}</div>
          </div>
          <div class="skill-card-desc">${a.description||""}</div>
          ${r?`
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${a.level}</span>
                <span class="text-dim">${a.xp}/${d}</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${s}%"></div></div>
              ${a.masteryBonus?`<div class="skill-mastery-bonus">✨ ${a.masteryBonus}</div>`:""}
            </div>
          `:`
            <div class="skill-card-req">
              ${(a.requirements||[]).map(L=>`<span class="req-tag">🔒 ${L}</span>`).join(" ")}
            </div>
          `}
          ${a.cost?`<div class="skill-card-cost">🔵 ${a.cost} Linh Lực</div>`:""}
        </div>
      `};i.innerHTML=`
      <div class="page-header">
        <h1>⚡ Kỹ Năng & Công Pháp</h1>
        <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
      </div>

      <div class="skill-tabs">${g}</div>

      <div class="panel">
        <div class="panel-title">
          ${f[v].icon} ${f[v].name}
          <span class="subtitle">${f[v].desc}</span>
        </div>
        <div class="panel-body">
          ${y.length===0&&m.length===0?'<div class="text-dim">Chưa có kỹ năng nào trong nhánh này.</div>':""}
          
          ${y.length>0?`
            <div class="skill-grid">
              ${y.map(a=>n(a,!0)).join("")}
            </div>
          `:""}

          ${m.length>0?`
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
              <div class="text-dim text-sm" style="margin-bottom:8px">🔒 Chưa lĩnh ngộ (${m.length})</div>
              <div class="skill-grid">
                ${m.map(a=>n({...a,level:0,xp:0},!1)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,i.querySelectorAll(".skill-tab").forEach(a=>{a.addEventListener("click",()=>{v=a.dataset.tab,localStorage.setItem("skillsTab",v),b()})}),i.querySelectorAll(".equip-btn").forEach(a=>{a.addEventListener("click",async()=>{try{const r=a.dataset.sid,d=a.dataset.eq==="1",s=await p.equipSkill(t.playerId,r,d);t.player=s.player,o(s.message,"success"),b()}catch(r){o(r.message||"Lỗi trang bị","error")}})})};b()}function mt(i,e){return e==="manual"?"📜":i==="weapon"?"⚔️":i==="body"?"🥋":i==="shield"?"🛡️":i==="feet"?"👢":i==="ring"?"💍":"📦"}function Q(i,e){let t="",p="";if(i.slot==="weapon"){let x=0,f=0;(i.affixes||[]).forEach(v=>{v.stat==="strength"&&v.type==="flat"&&(x+=v.value),v.stat==="dexterity"&&v.type==="flat"&&(f+=v.value)}),x===0&&(x=i.itemLevel*2+5),f===0&&(f=i.itemLevel+10),t=`⚔️ ${x}`,p=`🎯 ${f}`}else if(i.slot==="body"||i.slot==="shield"||i.slot==="feet"){let x=0;(i.affixes||[]).forEach(f=>{f.stat==="defense"&&f.type==="flat"&&(x+=f.value)}),x===0&&(x=i.itemLevel*3),t=`🛡️ ${x}`}else if(i.slot==="ring"){let x=0;(i.affixes||[]).forEach(f=>{f.stat==="capacity"&&(x+=f.value)}),t=x>0?`🎒 +${x}`:""}const o=(i.affixes||[]).map(x=>yt(x)).map(x=>`<span class="badge badge-dim">${x}</span>`).join(" "),k=i.description||`Một vật phẩm loại ${i.slot} cấp ${i.itemLevel} thuộc phẩm chất ${i.rarity}. Khí tức tỏa ra không tồi.`,u=i.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${i.craftedBy}</strong></div>`:"",l=e?i.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${i.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${i.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${i.rarity}"></span>
          <span class="item-name rarity-${i.rarity}" style="font-size:14px">${i.name}</span>
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
          ${mt(i.slot,i.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${i.name}</strong> là loại ${i.baseType}. ${k}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${i.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${i.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${o||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${u}
          <div class="mt-2 flex justify-end">
            ${l}
          </div>
        </div>
      </div>
    </div>`}function yt(i){const t={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[i.stat]||i.stat,p=i.value>=0?"+":"";return i.type==="flat"?`${p}${i.value} ${t}`:i.type==="increase"?`${p}${i.value}% ${t}`:i.type==="more"?`×${p}${i.value}% ${t}`:`${p}${i.value} ${t}`}function K(i,e){var a,r,d,s,h,$,T;const{state:t,api:p,notify:o,renderGame:k}=e,u=Object.values(t.player.equipment||{}),l=t.player,x=t.medicines||[],f=l.medCooldownRemaining||0,v=t.inventoryTab||"equipped",b=l.skills&&l.skills.some(w=>{const L=typeof w=="string"?w:w.id;return L==="duoc_ly"||L==="y_thuat"}),c=u.find(w=>w.slot==="ring1"),y=u.find(w=>w.slot==="ring2");let m=20;((c==null?void 0:c.id)==="tui_tru_vat"||(a=c==null?void 0:c.baseType)!=null&&a.includes("tru_vat"))&&(m+=((d=(r=c.affixes)==null?void 0:r[0])==null?void 0:d.value)||10),((y==null?void 0:y.id)==="tui_tru_vat"||(s=y==null?void 0:y.baseType)!=null&&s.includes("tru_vat"))&&(m+=(($=(h=y.affixes)==null?void 0:h[0])==null?void 0:$.value)||10),i.innerHTML=`
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
          Đan Dược ${f>0?`<span style="color:var(--orange); font-size:11px">(${f}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),n=()=>{g.querySelectorAll("[data-eid]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const E=await p.equipItem(t.playerId,w.dataset.eid);t.player=E.player,o(E.message,"success"),k()}catch(E){o(E.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const E=await p.useItem(t.playerId,w.dataset.use);t.player=E.player,o(E.message,"success"),k()}catch(E){o(E.message||"Lỗi sử dụng","error")}})})};if(v==="equipped"){const w=l.equipment||{},L=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${L.map(E=>{const S=w[E.key],P=S&&S.id,M=P?`rarity-${S.rarity}`:"";return`
            <div style="background:${P?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${P?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${E.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${E.name}</div>
              ${P?`<div style="font-size:11px;font-weight:600" class="${M}">${S.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${S.rarity}] Lv${S.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${u.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${u.filter(E=>E&&E.id).map(E=>Q(E,!1)).join("")}
      `:""}
    `,n()}else if(v==="medicine")g.innerHTML=`
      <div style="padding:12px">
        ${f>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${f}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${f/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${x.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':x.map(w=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${w.icon||"💊"} ${w.name}</div>
                <div class="item-meta">
                  ${w.description}
                  ${w.healPercent?` · Phục hồi ${w.healPercent}% HP`:""}
                  ${w.cooldownAdd?` · Sinh Đan độc ${w.cooldownAdd}s`:""}
                  ${w.duration?` · Hiệu lực ${w.duration} trận`:""}
                  ${w.toxicity&&b?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${w.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${w.penalty&&b?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${w.penalty.map(L=>`Giảm ${Math.abs(L.value)*100}% ${L.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${w.id}" 
                ${f+(w.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(w=>{w.addEventListener("click",async()=>{try{const L=await p.useMedicine(t.playerId,w.dataset.med);t.player=L.player,o(L.message,"success"),k()}catch(L){o(L.message||"Đan độc quá nồng!","error")}})});else{const w=l.inventory||[];let L=[];v==="weapon"?L=w.filter(E=>E.slot==="weapon"&&E.category!=="manual"):v==="armor"?L=w.filter(E=>["body","shield","feet"].includes(E.slot)):v==="accessory"?L=w.filter(E=>["ring","amulet","ring1","ring2"].includes(E.slot)):v==="manual"&&(L=w.filter(E=>E.category==="manual")),g.innerHTML=`
      ${L.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':L.map(E=>Q(E,!0)).join("")}
    `,n()}i.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{t.inventoryTab=w.dataset.tab,K(i,e)})}),(T=document.getElementById("btnGen"))==null||T.addEventListener("click",async()=>{const w=["common","rare","epic","legendary"];try{const L=await p.generateItem(t.playerId,w[Math.floor(Math.random()*w.length)]);t.player=L.player,t.items=L.items||[],o(L.message,"success"),K(i,e)}catch{o("Lỗi tạo ngẫu nhiên","error")}})}function ht(i,e){var d,s;const{state:t,api:p,notify:o,renderGame:k}=e,u=t.player,l=t.crimes||[];if((u.jailRemaining??0)>0){const h=u.jailRemaining,$=Math.max(10,100*Math.ceil(h/60)*u.level);i.innerHTML=`
      <div class="page-header"><h1>🏛 Thiên Lao</h1></div>
      <div class="panel">
        <div class="panel-title">Trạng thái</div>
        <div class="panel-body" style="text-align:center">
          <div style="font-size:28px;color:var(--red);font-weight:700">⛓ Bị giam giữ</div>
          <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${h}s</strong></div>
          <div style="margin-top:16px;display:flex;gap:12px;justify-content:center">
            <button class="btn btn--blue" id="btnEscape">🏃 Vượt ngục (3 Nghịch Khí)</button>
            <button class="btn btn--gold" id="btnBail">💰 Bảo lãnh (${$} Lính Thạch)</button>
          </div>
        </div>
      </div>`,(d=document.getElementById("btnEscape"))==null||d.addEventListener("click",async()=>{try{const T=await p.escapeJail(t.playerId);t.player=T.player,o(T.message,T.success?"success":"error"),k()}catch(T){o(T.message||"Lỗi","error")}}),(s=document.getElementById("btnBail"))==null||s.addEventListener("click",async()=>{try{const T=await p.bail(t.playerId);t.player=T.player,o(T.message,T.success?"success":"error"),k()}catch(T){o(T.message||"Lỗi","error")}});return}const f={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},v={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},b=l.reduce((h,$)=>{const T=$.category||"theft";return h[T]||(h[T]=[]),h[T].push($),h},{}),c=Object.keys(f).map(h=>{const $=b[h];if(!$||$.length===0)return"";const T=f[h];return`
    <div class="panel mt-md" style="border-color: ${T.color}40;">
      <div class="panel-title" style="color: ${T.color};">${T.label} <span class="subtitle text-dim">${$.length} loại</span></div>
      <div class="panel-body no-pad">
        ${$.map(w=>{var I;const L=((I=u.crimeSkills)==null?void 0:I[w.id])??0,E=L<(w.minSkill??0),S=!E&&(u.nerve??0)>=w.nerveCost,P=w.special||[],M=Math.min(95,w.baseSuccessRate+L*.5);return`
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
                ${P.length>0?`
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${P.map(N=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${v[N]||N}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <button class="btn btn--sm ${S?"btn--red":""}" data-crime="${w.id}" ${S?"":"disabled"}>
                ${E?"🔒":"Thực hiện"}
              </button>
            </div>`}).join("")}
      </div>
    </div>`}).join(""),y=u.crimeExp||0,m=Math.floor(y/50),g=y%50,n=50,a=g/n*100,r=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${m}</strong>
          <span class="text-dim">${g} / ${n} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${a}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${n-g} EXP</strong> nữa để tăng giới hạn Nghịch Khí. (Giới hạn hiện tại: ${u.maxNerve||15})</div>
      </div>
    </div>
  `;i.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${u.nerve??0}/${u.maxNerve??15} Nghịch Khí · 💰 ${u.gold??0} Linh Thạch</span></div>
    </div>
    ${r}
    ${c}`,i.querySelectorAll("[data-crime]").forEach(h=>{h.addEventListener("click",async()=>{try{const $=await p.commitCrime(t.playerId,h.dataset.crime);t.player=$.player;const T=$.outcome==="success"?"success":$.outcome==="critical_fail"?"error":"info";o($.message,T),k()}catch($){o($.message||"Lỗi","error")}})})}function Z(i,e){const{state:t,api:p,notify:o,updateSidebar:k,renderGame:u}=e,l=t.playerId;t._dungeon||(t._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const x=t._dungeon;async function f(){try{const[n,a]=await Promise.all([p.getMapItems(l),p.getDungeonHistory(l)]);x.mapItems=n.mapItems||[],x.activeRun=n.activeRun||null,x.history=a.history||[],x.loaded=!0,v()}catch(n){o(n.message||"Lỗi tải Bí Cảnh","error")}}function v(){i.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${x.activeRun?b():c()}

      ${x.lastResult?y():""}

      ${m()}
    `,g()}function b(){var d,s;const n=x.activeRun,a=n.currentWave===n.totalWaves,r=((n.currentWave-1)/n.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${n.dungeonName||n.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${r}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${n.currentWave}/${n.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((d=t.player)==null?void 0:d.hospitalRemaining)>0?"disabled":""}>
              ${a?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+n.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((s=t.player)==null?void 0:s.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function c(){return x.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${x.mapItems.map(n=>{const a=n.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${n.item.icon} ${n.item.name} <span style="opacity:0.5">x${n.quantity}</span></div>
                  ${a?`
                    <div class="item-meta">
                      ${a.name} · T${a.tier} · ${a.waves+1} tầng · Boss: ${a.bossName}
                    </div>
                  `:""}
                </div>
                ${a?`<button class="btn btn--sm btn--gold" data-enter="${n.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function y(){var d,s;const n=x.lastResult,a=n.result==="dungeon_complete"?"🏆":n.result==="wave_cleared"?"✅":"💀",r=n.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${r}">
        <div class="panel-title" style="color:${r}">${a} Kết Quả</div>
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
    `}function m(){return x.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${x.history.map(n=>{const a=n.status==="completed"?"✅":n.status==="failed"?"❌":n.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${n.status==="completed"?"var(--green)":n.status==="failed"?"var(--red)":"var(--orange)"}">${a} ${n.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${n.wave}/${n.totalWaves} · ${new Date(n.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function g(){var n,a;document.querySelectorAll("[data-enter]").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){r.disabled=!0;try{const s=await p.enterDungeon(l,d);o(s.message,"success"),t.player=s.player,k(),x.activeRun=s.run,x.lastResult=null,await f()}catch(s){o(s.message,"error"),r.disabled=!1}}})}),(n=document.getElementById("btnFight"))==null||n.addEventListener("click",async()=>{const r=document.getElementById("btnFight");r.disabled=!0,r.textContent="⏳ Đang chiến đấu...";try{const d=await p.fightDungeonWave(l);t.player=d.player,k(),x.lastResult=d,d.result==="dungeon_complete"||d.result==="dungeon_failed"?x.activeRun=null:d.result==="wave_cleared"&&(x.activeRun.currentWave=d.nextWave),v()}catch(d){o(d.message,"error"),r.disabled=!1,r.textContent="⚔️ Chiến Đấu"}}),(a=document.getElementById("btnAbandon"))==null||a.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await p.abandonDungeon(l),o("Đã rời khỏi Bí Cảnh.","info"),x.activeRun=null,x.lastResult=null,await f()}catch(r){o(r.message,"error")}})}x.loaded?v():f()}function tt(i,e){const{state:t}=e,p=t._travelTab||"map";i.innerHTML=`
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
  `,i.querySelectorAll(".tab-btn").forEach(k=>{k.addEventListener("click",()=>{t._travelTab=k.dataset.tab,tt(i,e)})});const o=i.querySelector("#travelTabContent");p==="map"?O(o,e):Z(o,e)}async function O(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e;i.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ...</div>';try{const[u,l]=await Promise.all([p.request("/data/areas"),p.request(`/player/${t.playerId}/area`)]),x=u.areas||[],f=l.area,v=l.player,b=l.traveling||!1,c=l.travelRemaining||0,y=l.travelDestination||"";l.message&&o(l.message,"success"),l.player&&(t.player=l.player,k());const m=t.exploration||{},g=m[(v==null?void 0:v.currentArea)||"thanh_lam_tran"],n=(f==null?void 0:f.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",a=(g==null?void 0:g.staminaCost)||10,r={hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận"},d=r[v==null?void 0:v.currentArea]||"",s=[...x].sort(($,T)=>($.sort_order||$.mapY||0)-(T.sort_order||T.mapY||0)),h=[...x].sort(($,T)=>($.mapY||0)-(T.mapY||0));if(i.innerHTML=`
      ${b?`
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
                <div class="text-lg text-green bold">${n}</div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${a}/lần</div>
              </div>
            </div>
            ${f!=null&&f.description?`<div class="text-sm text-dim" style="margin-top:6px">${f.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Lv.${(f==null?void 0:f.min_level)||1}+</span>
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

          ${h.map($=>{const T=m[$.id],w=$.id===v.currentArea&&!b,L=v.level<($.min_level||1),E=(T==null?void 0:T.mapX)||50,S=(T==null?void 0:T.mapY)||50,P=w?"var(--green)":L?"var(--red)":"var(--blue)",M=w?`box-shadow: 0 0 15px ${P}; animation: pulse 2s infinite`:"",I=!w&&!L&&!b;return`
              <div class="map-node ${I?"clickable":""}" ${I?`data-travel="${$.id}"`:""} 
                   style="position:absolute; left:${E}%; top:${S}%; transform:translate(-50%, -50%); z-index:1; display:flex; flex-direction:column; align-items:center; width:max-content">
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
          ${s.map($=>{const T=m[$.id],w=$.id===v.currentArea&&!b,L=v.level<($.min_level||1),E=parseInt($.travel_time)||0,S=(T==null?void 0:T.staminaCost)||"?",P=r[$.id]||"";return`
              <div class="list-item ${w||L?"":"clickable"}" ${!w&&!L&&!b?`data-travel="${$.id}"`:""} style="padding: 10px 14px">
                <div class="item-info" style="flex:1">
                  <div class="item-name" style="font-size:14px">
                    ${$.name}
                    ${w?' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>':""}
                    ${L?` <span style="color:var(--red); font-size:11px">[Lv.${$.min_level}+]</span>`:""}
                  </div>
                  <div class="item-meta" style="margin-top:2px;display:flex;gap:6px;flex-wrap:wrap">
                    <span>Lv.${$.min_level||1}+</span>
                    <span>${E>0?"⏱ "+E+"s":"⚡ Tức thời"}</span>
                    <span>🏃 -${S}</span>
                    ${P?`<span style="font-size:10px;opacity:0.6">${P}</span>`:""}
                  </div>
                  ${$.description?`<div class="text-xs text-dim" style="margin-top:2px">${$.description}</div>`:""}
                </div>
                ${!w&&!L&&!b?`
                  <button class="btn btn--blue btn--sm" data-travel="${$.id}">
                    ${E>0?"🚶 Di chuyển":"⚡ Đi"}
                  </button>
                `:""}
              </div>`}).join("")}
        </div>
      </div>`,i.querySelectorAll("[data-travel]").forEach($=>{$.addEventListener("click",async T=>{T.stopPropagation();const w=$.dataset.travel;i.querySelectorAll("[data-travel]").forEach(L=>{L.tagName==="BUTTON"&&(L.disabled=!0),L.style.pointerEvents="none"});try{const L=await p.request(`/player/${t.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:w})});L.player&&(t.player=L.player,k()),o(L.message,"success"),O(i,e)}catch(L){o(L.message||"Lỗi di chuyển!","error"),O(i,e)}})}),b&&c>0){let $=c;const T=c,w=setInterval(async()=>{$--;const L=document.getElementById("travelTimer"),E=document.getElementById("travelBar");if(L&&(L.textContent=`⏳ ${Math.max(0,$)}s`),E&&(E.style.width=`${Math.max(0,$/T*100)}%`),$<=0){clearInterval(w);try{const S=await p.request(`/player/${t.playerId}/travel-check`,{method:"POST"});S.player&&(t.player=S.player,k()),S.arrived&&o(S.message,"success"),O(i,e)}catch{O(i,e)}}},1e3)}}catch(u){i.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(u)}}function F(i,e){var r,d;const{state:t,renderGame:p,notify:o,updateSidebar:k}=e,u=t.player,l=t.recipes||[],x=t.medicines||[],f=t._alchemyTab||"recipes",v=s=>{const h=x.find($=>$.id===s);return h?(h.icon||"💊")+" "+h.name:s};let b=0,c=0,y=0,m=0;(u.skills||[]).forEach(s=>{const h=typeof s=="string"?s:s.id,$=typeof s=="string"?1:s.level||1;h==="tinh_che"&&(b=$*2),h==="phu_an_thuat"&&(c=$*5),h==="linh_kiem_thuat"&&(y=$*10),h==="cuong_hoa_thuat"&&(m=$*15)});const g=s=>s.split("_").map(h=>h.charAt(0).toUpperCase()+h.slice(1)).join(" "),n=[];Object.values(u.equipment||{}).forEach(s=>{s&&n.push({...s,loc:"eq"})}),(u.inventory||[]).filter(s=>s.slot&&s.slot!=="consumable").forEach(s=>n.push({...s,loc:"inv"}));let a=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${f==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${f==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${b||c||y||m?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${b?`<span>🔥 Thành công +${b}%</span>`:""}
      ${c?`<span>💎 Giảm phí -${c}%</span>`:""}
      ${y?`<span>✨ Chất lượng +${y}%</span>`:""}
      ${m?`<span>⬆️ Nâng đôi ${m}%</span>`:""}
    </div>
    `:""}
  `;if(f==="recipes"){if(a+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!u.materials||Object.keys(u.materials).length===0)a+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[s,h]of Object.entries(u.materials))a+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(s)} <span style="color:var(--gold)">x${h}</span></div>`;a+="</div></div>",a+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',l.length===0?a+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':l.forEach(s=>{var E;const h=v(s.target),$=Math.min(100,(s.successRate||100)+b);let T="";(E=s.requirements)!=null&&E.skill&&(T=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(s.requirements.skill)} lv${s.requirements.level||1}</div>`);let w="";s.materials.forEach(S=>{var M;const P=((M=u.materials)==null?void 0:M[S.id])||0;w+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${P>=S.amount?"var(--green)":"var(--red)"};font-weight:bold">${P}/${S.amount}</span> ${g(S.id)}</span>`});const L=x.find(S=>S.id===s.target)||{};a+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${h}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${s.tier}</span>
                  <span>Tỉ lệ: <span style="color:${$>=80?"var(--green)":"var(--blue)"};font-weight:bold">${$}%</span></span>
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
          </div>`}),a+="</div></div>"}else a+=`
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
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(s=>{const h=Math.max(1,Math.round(s.cost*(1-c/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${s.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${s.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${s.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${s.id}" style="width:100%">
                💎 ${h} ${c>0?`<s style="opacity:0.4;font-size:10px">${s.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;i.innerHTML=a,i.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{t._alchemyTab=s.dataset.tab,F(i,e)})}),i.querySelectorAll(".accordion-header").forEach(s=>{s.addEventListener("click",()=>{const h=s.nextElementSibling;h.style.display==="none"?(h.style.display="block",s.querySelector(".text-dim:last-child").textContent="▲"):(h.style.display="none",s.querySelector(".text-dim:last-child").textContent="▼")})}),i.querySelectorAll(".btn-craft").forEach(s=>{s.addEventListener("click",async h=>{h.stopPropagation();const $=l.find(T=>T.id===s.dataset.recipe);if($&&u.gold<($.cost||0))return o("Không đủ linh thạch!","error");try{const T=await q.craftItem(u.id,s.dataset.recipe);t.player=T.player,o(T.message,T.success?"success":"error"),p()}catch(T){o(T.message,"error")}})}),i.querySelectorAll(".btn-currency").forEach(s=>{s.addEventListener("click",async()=>{const h=document.getElementById("selItem");if(!(h!=null&&h.value))return o("Chọn trang bị trước!","error");const $=s.dataset.cid;let T=-1;if($==="thien_menh_phu"){const w=n.find(S=>S.id===h.value),L=(w==null?void 0:w.affixes)||[];if(L.length===0)return o("Item không có affix để khóa!","error");const E=prompt(`Chọn affix để khóa (0-${L.length-1}):
${L.map((S,P)=>`${P}: ${S.name||S.stat} +${S.value}`).join(`
`)}`);if(E===null)return;if(T=parseInt(E),isNaN(T)||T<0||T>=L.length)return o("Chỉ số không hợp lệ!","error")}s.disabled=!0,s.textContent="⏳...";try{const w=await q.applyCurrency(u.id,$,h.value,T);o(w.message,"success"),t.player=w.player,k(),F(i,e)}catch(w){o(w.message,"error"),s.disabled=!1,s.textContent="💎 Dùng"}})}),(r=document.getElementById("selItem"))==null||r.addEventListener("change",()=>{const s=n.find($=>$.id===document.getElementById("selItem").value),h=document.getElementById("itemPreview");s&&h&&(h.innerHTML=(s.affixes||[]).map($=>`<span style="color:var(--blue)">• ${$.name||$.stat} +${$.value}</span>`).join(" | ")||"Không có affix")}),(d=document.getElementById("selItem"))==null||d.dispatchEvent(new Event("change"))}function bt(i,e){const{state:t,api:p,notify:o,renderGame:k}=e;t.player,i.innerHTML=`
    <div class="page-header">
      <h2>🏷️ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ nhiệm vụ từ các NPC</p>
    </div>
    <div id="questList" class="quest-container">
      <div class="loading-spinner">⏳ Đang tải...</div>
    </div>
  `,u();async function u(){try{const x=(await p.getQuests(t.playerId)).quests||[],f=document.getElementById("questList");if(!f)return;if(x.length===0){f.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}f.innerHTML=x.map(v=>{const b=v.questAmount>0?Math.min(100,v.progress/v.questAmount*100):0,c=v.progress>=v.questAmount,y=v.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${c?"quest-done":""}" data-quest-id="${v.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${v.npcIcon||"🧓"} ${v.npcName||"NPC"}</span>
              <span class="quest-type">${y} ${v.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${v.questName||v.quest_id}</div>
            <div class="quest-desc">${v.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${c?"hp":"energy"}" style="width:${b}%"></div>
              </div>
              <span class="quest-progress-text">${v.progress}/${v.questAmount}</span>
            </div>
            ${c?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${v.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),f.querySelectorAll(".quest-complete-btn").forEach(v=>{v.addEventListener("click",async()=>{const b=v.dataset.qid;v.disabled=!0,v.textContent="⏳...";try{const c=await p.completeQuest(t.playerId,b);t.player=c.player,o(c.message,"success"),c.skillGained&&o(`🎯 Lĩnh ngộ: ${c.skillGained}!`,"success"),k()}catch(c){o(c.message||"Lỗi trả quest","error"),v.disabled=!1,v.textContent="✅ Trả Nhiệm Vụ"}})})}catch(l){console.error("Error loading quests:",l);const x=document.getElementById("questList");x&&(x.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function xt(i,e){const{state:t,api:p,notify:o,renderGame:k}=e;if(t.player.role!=="admin"){i.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const u=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let l="monsters";i.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${u.map(a=>`
          <button class="admin-tab ${a.id===l?"active":""}" data-tab="${a.id}">${a.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",a=>{const r=a.target.closest(".admin-tab");r&&(l=r.dataset.tab,document.querySelectorAll(".admin-tab").forEach(d=>d.classList.remove("active")),r.classList.add("active"),x(l))}),x(l);async function x(a){const r=document.getElementById("adminContent");if(r){r.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const d=await p.request(`/admin/${a}?adminId=${t.playerId}`);f(a,d,r)}catch(d){r.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${d.message}</div></div>`}}}function f(a,r,d){a==="monsters"?v(r,d):a==="npcs"?b(r,d):a==="areas"?c(r,d):y(a,r,d)}function v(a,r){const d=a.monsters||[];r.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${d.map(s=>{var h,$,T,w,L,E,S,P;return`
          <div class="admin-card" data-id="${s.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${s.name} ${s.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${(($=(h=a.tierInfo)==null?void 0:h[s.tier])==null?void 0:$.color)||"#888"}">${((w=(T=a.tierInfo)==null?void 0:T[s.tier])==null?void 0:w.name)||"T"+s.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((L=s.stats)==null?void 0:L.hp)||"?"}</div>
              <div>💪 ${((E=s.stats)==null?void 0:E.strength)||"?"}</div>
              <div>🏃 ${((S=s.stats)==null?void 0:S.speed)||"?"}</div>
              <div>🛡 ${((P=s.stats)==null?void 0:P.defense)||"?"}</div>
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
    `,g(r,a,"monsters","monsters")}function b(a,r){const d=a.npcs||[];r.innerHTML=`
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
    `,g(r,a,"npcs","npcs")}function c(a,r){const d=Object.keys(a);r.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${d.map(s=>{const h=a[s];return`
            <div class="admin-card" data-id="${s}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${h.name||s}</span>
                <span class="badge" style="background:var(--orange)">⚡${h.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(h.events||[]).map($=>`<span>${$.type}: ${$.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${s}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,r.querySelectorAll(".admin-edit-area").forEach(s=>{s.addEventListener("click",()=>{const h=s.dataset.id,$=a[h];m(h,$,`areas/${h}`)})})}function y(a,r,d){var $;const s=JSON.stringify(r,null,2),h=s.split(`
`).length;d.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${a} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(h+5,30)}">${n(s)}</textarea>
    `,($=document.getElementById("btnSaveGeneric"))==null||$.addEventListener("click",async()=>{try{const T=document.getElementById("genericEditor").value,w=JSON.parse(T);o("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(T){o("JSON không hợp lệ: "+T.message,"error")}})}function m(a,r,d,s){const h=JSON.stringify(r,null,2),$=document.createElement("div");$.className="admin-modal-overlay",$.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${a}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${n(h)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild($),$.querySelectorAll(".admin-modal-close").forEach(T=>{T.addEventListener("click",()=>$.remove())}),$.addEventListener("click",T=>{T.target===$&&$.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const T=document.getElementById("modalEditor").value,w=JSON.parse(T);await p.request(`/admin/${d}?adminId=${t.playerId}`,{method:"PUT",body:JSON.stringify({data:w})}),o("✅ Đã lưu!","success"),$.remove(),x(l)}catch(T){o("Lỗi: "+T.message,"error")}})}function g(a,r,d,s){a.querySelectorAll(".admin-edit-btn").forEach(h=>{h.addEventListener("click",()=>{const $=h.dataset.id,w=(r[s]||[]).find(L=>L.id===$);w&&m($,w,`${d}/${$}`)})})}function n(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function et(i,e){const{state:t,api:p,notify:o,renderGame:k,updateSidebar:u}=e,l=t.playerId;t._social||(t._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const x=t._social;async function f(){try{const g=await p.getRelationships(l);x.relationships=g,x.loaded=!0,v()}catch(g){o(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function v(){const{friends:g,enemies:n,pendingSent:a,pendingReceived:r}=x.relationships,d=r.length;i.innerHTML=`
      <div class="page-header">
        <h2>🤝 Đạo Hữu</h2>
        <p class="page-sub">Kết bạn bè, đánh dấu kẻ thù, giao lưu giang hồ</p>
      </div>

      <!-- Search -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="socialSearch" placeholder="Tìm người chơi theo tên..." 
                 value="${x.searchQuery}" 
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSearch">🔍 Tìm</button>
        </div>
        ${x.searchResults.length>0?`
          <div style="margin-top:12px">
            ${x.searchResults.map(s=>`
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
        `:x.searchQuery?'<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>':""}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${x.tab==="friends"?"btn--blue":"btn--dark"}" data-tab="friends">
          🤝 Đạo Hữu (${g.length})
        </button>
        <button class="btn btn--sm ${x.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${n.length})
        </button>
        <button class="btn btn--sm ${x.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${d>0?`<span class="badge">${d}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${x.tab==="friends"?b(g):""}
        ${x.tab==="enemies"?c(n):""}
        ${x.tab==="pending"?y(r,a):""}
      </div>
    `,m()}function b(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(n=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${n.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${n.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${n.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function c(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(n=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${n.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${n.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${n.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function y(g,n){let a="";return g.length>0&&(a+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',a+=g.map(r=>`
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
      `).join("")),n.length>0&&(a+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',a+=n.map(r=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${r.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${r.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&n.length===0&&(a='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),a}function m(){var g,n;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var r;const a=(r=document.getElementById("socialSearch"))==null?void 0:r.value.trim();if(!a||a.length<2)return o("Cần ít nhất 2 ký tự","error");x.searchQuery=a;try{const d=await p.searchPlayers(a);x.searchResults=d.players||[],v()}catch(d){o(d.message,"error")}}),(n=document.getElementById("socialSearch"))==null||n.addEventListener("keydown",a=>{var r;a.key==="Enter"&&((r=document.getElementById("btnSearch"))==null||r.click())}),document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{x.tab=a.dataset.tab,v()})}),document.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",async()=>{const r=a.dataset.action,d=a.dataset.target;a.disabled=!0;try{let s;switch(r){case"add-friend":s=await p.addFriend(l,d);break;case"accept-friend":s=await p.acceptFriend(l,d);break;case"reject-friend":s=await p.rejectFriend(l,d);break;case"remove-friend":s=await p.removeFriend(l,d);break;case"add-enemy":s=await p.addEnemy(l,d);break;case"remove-enemy":s=await p.removeEnemy(l,d);break}o(s.message||"Thành công!","success"),await f()}catch(s){o(s.message||"Lỗi!","error"),a.disabled=!1}})})}x.loaded?v():f()}function at(i,e){const{state:t,api:p,notify:o}=e,k=t.playerId;t._chat||(t._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const u=t._chat;async function l(){try{const[n,a]=await Promise.all([p.getGlobalChat(),p.getChatFriends(k)]);u.globalMessages=n.messages||[],u.friends=a.friends||[],u.globalMessages.length>0&&(u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id),u.loaded=!0,v(),x()}catch(n){o(n.message||"Lỗi tải chat","error")}}function x(){f(),u.pollTimer=setInterval(async()=>{try{if(u.tab==="global"){const n=await p.getGlobalChat(u.lastGlobalId);n.messages&&n.messages.length>0&&(u.globalMessages.push(...n.messages),u.globalMessages.length>100&&(u.globalMessages=u.globalMessages.slice(-100)),u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id,c(),y())}else if(u.tab==="private"&&u.selectedFriend){const n=await p.getPrivateChat(k,u.selectedFriend.id,u.lastPrivateId);n.messages&&n.messages.length>0&&(u.privateMessages.push(...n.messages),u.privateMessages.length>100&&(u.privateMessages=u.privateMessages.slice(-100)),u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id,c(),y())}}catch{}},5e3)}function f(){u.pollTimer&&(clearInterval(u.pollTimer),u.pollTimer=null)}function v(){const n=u.tab==="global"?u.globalMessages:u.privateMessages;i.innerHTML=`
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
            ${u.friends.map(a=>{var r;return`<option value="${a.id}" ${((r=u.selectedFriend)==null?void 0:r.id)===a.id?"selected":""}>${a.name} (Lv.${a.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${b(n)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${u.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),y()}function b(n){return n.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':n.map(a=>{const r=a.sender_id===k,d=new Date(a.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${r?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${d}</span>
          <span style="font-weight:600;color:${r?"var(--blue)":"var(--gold)"}"> ${a.sender_name}</span>
          <span style="opacity:0.8">: ${m(a.message)}</span>
        </div>
      `}).join("")}function c(){const n=document.getElementById("chatMessages");if(!n)return;const a=u.tab==="global"?u.globalMessages:u.privateMessages;n.innerHTML=b(a)}function y(){const n=document.getElementById("chatMessages");n&&(n.scrollTop=n.scrollHeight)}function m(n){const a=document.createElement("div");return a.textContent=n,a.innerHTML}function g(){var a,r,d;document.querySelectorAll("[data-chat-tab]").forEach(s=>{s.addEventListener("click",()=>{u.tab=s.dataset.chatTab,u.tab==="global"&&(u.lastGlobalId=u.globalMessages.length>0?u.globalMessages[u.globalMessages.length-1].id:0),v(),x()})}),(a=document.getElementById("friendSelect"))==null||a.addEventListener("change",async s=>{const h=s.target.value;if(!h){u.selectedFriend=null,u.privateMessages=[],v();return}u.selectedFriend=u.friends.find($=>$.id===h)||null,u.lastPrivateId=0;try{const $=await p.getPrivateChat(k,h);u.privateMessages=$.messages||[],u.privateMessages.length>0&&(u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id),c(),y()}catch($){o($.message,"error")}});const n=async()=>{var $,T;const s=document.getElementById("chatInput"),h=s==null?void 0:s.value.trim();if(h){if(u.tab==="private"&&!u.selectedFriend)return o("Chọn Đạo Hữu trước!","error");try{if(await p.sendChat(k,u.tab,u.tab==="private"?u.selectedFriend.id:null,h),s.value="",u.tab==="global"){const w=await p.getGlobalChat(u.lastGlobalId);(($=w.messages)==null?void 0:$.length)>0&&(u.globalMessages.push(...w.messages),u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id)}else{const w=await p.getPrivateChat(k,u.selectedFriend.id,u.lastPrivateId);((T=w.messages)==null?void 0:T.length)>0&&(u.privateMessages.push(...w.messages),u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id)}c(),y()}catch(w){o(w.message||"Lỗi gửi tin nhắn","error")}}};(r=document.getElementById("btnSend"))==null||r.addEventListener("click",n),(d=document.getElementById("chatInput"))==null||d.addEventListener("keydown",s=>{s.key==="Enter"&&n()})}e.renderGame,u.loaded?(v(),x()):l()}function ft(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;t._market||(t._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const l=t._market;async function x(){try{const[n,a]=await Promise.all([p.getMarketListings(l.filter,l.sort),p.getMyListings(u)]);l.listings=n.listings||[],l.myListings=a.listings||[],l.loaded=!0,v()}catch(n){o(n.message||"Lỗi tải Giao Dịch Đài","error")}}async function f(){try{const[n,a]=await Promise.all([p.getMugTargets(u),p.getMugLog(u)]);l.mugTargets=n.targets||[],l.mugCooldown=n.mugCooldown||0,l.mugLog=a.logs||[],v()}catch(n){o(n.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function v(){const n=t.player;i.innerHTML=`
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

      ${l.tab==="browse"?b():l.tab==="my"?c():y()}
    `,g()}function b(){let n=`
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
    `,a=l.listings;if(l.search.trim()){const r=l.search.toLowerCase().trim();a=a.filter(d=>{var s;return d.item_name.toLowerCase().includes(r)?!0:(s=d.item_data)!=null&&s.affixes?d.item_data.affixes.some(h=>(h.stat||"").toLowerCase().includes(r)||(h.type||"").toLowerCase().includes(r)):!1})}return a.length===0?n+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(n+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',n+=a.map(r=>{var T,w;const d=r.item_type==="item"?"⚔️":r.item_type==="material"?"🧱":"💊",s=((T=r.item_data)==null?void 0:T.rarity)||"",h=r.seller_id===u,$=(w=r.item_data)!=null&&w.affixes?r.item_data.affixes.map(L=>`${L.stat} ${L.type==="flat"?"+":""}${L.value}${L.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${d}
                <span style="color:var(--gold)">${r.item_name}</span>
                ${r.quantity>1?`<span style="opacity:0.5"> x${r.quantity}</span>`:""}
                ${s?`<span class="rarity-${s}" style="font-size:11px;margin-left:4px">[${s}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${r.seller_name}</span>
                ${$?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${$}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${r.price}${r.quantity>1?"/cái":""}</span>
              ${h?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${r.id}" data-qty="${r.quantity}" data-price="${r.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),n+="</div></div>"),n}function c(){if(l.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let n='<div class="panel"><div class="panel-body no-pad">';return n+=l.myListings.map(a=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${a.item_type==="item"?"⚔️":a.item_type==="material"?"🧱":"💊"} ${a.item_name} ${a.quantity>1?`<span style="opacity:0.5">x${a.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${a.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${a.id}">📦 Thu Hồi</button>
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
    `;return l.mugTargets.length===0?n+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':n+=l.mugTargets.map(a=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${a.gender==="female"?"♀":"♂"} ${a.name}</div>
            <div class="item-meta">Lv.${a.level} · ${a.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${a.id}" ${l.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),n+="</div></div>",l.mugLog.length>0&&(n+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${l.mugLog.map(a=>{const r=a.attacker_id===u,d=a.outcome==="success"?"✅":"❌",s=a.outcome==="success"?"var(--green)":"var(--red)",h=r?a.outcome==="success"?`Cướp ${a.victim_name}: +${a.gold_stolen} 💎`:`Phục kích ${a.victim_name} thất bại!`:a.outcome==="success"?`Bị ${a.attacker_name} cướp: -${a.gold_stolen} 💎`:`${a.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${s}">${d} ${h} <span style="opacity:0.4;margin-left:auto">${new Date(a.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),n}function m(n){const a=Object.entries(n.materials||{}).map(([h,$])=>({id:h,qty:$,type:"material",name:h})),r=Object.entries(n.medicines||{}).map(([h,$])=>({id:h,qty:$,type:"medicine",name:h})),d=(n.inventory||[]).map(h=>({id:h.id,qty:1,type:"item",name:h.name||h.id})),s=[...a,...r,...d];return`
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
    `}function g(){var n,a,r,d;document.querySelectorAll("[data-mtab]").forEach(s=>{s.addEventListener("click",()=>{if(l.tab=s.dataset.mtab,l.tab==="mug"&&l.mugTargets.length===0){f();return}v()})}),(n=document.getElementById("btnShowList"))==null||n.addEventListener("click",()=>{l.showListForm=!l.showListForm,v()}),document.querySelectorAll("[data-filter]").forEach(s=>{s.addEventListener("click",async()=>{l.filter=s.dataset.filter,await x()})}),(a=document.getElementById("sortSelect"))==null||a.addEventListener("change",async s=>{l.sort=s.target.value,await x()}),(r=document.getElementById("searchInput"))==null||r.addEventListener("input",s=>{l.search=s.target.value,v();const h=document.getElementById("searchInput");h&&(h.focus(),h.setSelectionRange(l.search.length,l.search.length))}),(d=document.getElementById("btnConfirmList"))==null||d.addEventListener("click",async()=>{var L,E,S;const s=(L=document.getElementById("listItem"))==null?void 0:L.value;if(!s)return;const[h,$]=s.split("|"),T=parseInt((E=document.getElementById("listQty"))==null?void 0:E.value)||1,w=parseInt((S=document.getElementById("listPrice"))==null?void 0:S.value)||0;if(w<=0)return o("Giá phải lớn hơn 0!","error");try{const P=await p.listForSale(u,h,$,T,w);o(P.message,"success"),t.player=P.player,k(),l.showListForm=!1,await x()}catch(P){o(P.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(s=>{s.addEventListener("click",async()=>{const h=parseInt(s.dataset.buy),$=parseInt(s.dataset.qty),T=parseInt(s.dataset.price);let w=1;if($>1){const L=prompt(`Mua bao nhiêu? (tối đa ${$}, giá ${T} 💎/cái)`,"1");if(!L)return;w=Math.min(parseInt(L)||1,$)}s.disabled=!0;try{const L=await p.buyFromMarket(u,h,w);o(L.message,"success"),t.player=L.player,k(),await x()}catch(L){o(L.message,"error"),s.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(s=>{s.addEventListener("click",async()=>{s.disabled=!0;try{const h=await p.cancelListing(u,parseInt(s.dataset.cancel));o(h.message,"success"),t.player=h.player,k(),await x()}catch(h){o(h.message,"error"),s.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(s=>{s.addEventListener("click",async()=>{const h=s.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){s.disabled=!0,s.textContent="⏳...";try{const $=await p.mugPlayer(u,h);o($.message,$.success?"success":"error"),t.player=$.player,k(),await f()}catch($){o($.message,"error"),s.disabled=!1,s.textContent="💀 Phục Kích"}}})})}l.tab==="mug"?f():l.loaded?v():x()}function $t(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;let l=!1,x=null;async function f(){try{x=await p.getRealmInfo(u),l=!0,v()}catch(y){o(y.message||"Lỗi tải Cảnh Giới","error")}}function v(){if(!x)return;const y=x.current,m=x.allRealms||[],g=t.player,n=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;i.innerHTML=`
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
              ${Object.entries(y.bonuses).filter(([,a])=>a>0).map(([a,r])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${r} ${a}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${y.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${y.unlocks.map(a=>`<span style="font-size:12px;opacity:0.7">✅ ${a}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${y.canBreakthrough?b(y):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${m.map(a=>{const r=a.tier===y.tier,d=a.tier<y.tier,h=a.tier>y.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${r?`2px solid ${a.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${h};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${a.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${a.color}">${a.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${a.levelMin}+</span>
                ${a.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${a.failChance}% thất bại</span>`:""}
                ${d?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${r?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,c()}function b(y){const m=y.nextRealm;if(!m)return"";const g=m.cost?`💎 ${m.cost.gold} + 🔮 ${m.cost.energy}`:"Miễn phí";return`
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
          Bonus mới: ${Object.entries(m.bonuses).filter(([,n])=>n>0).map(([n,a])=>`+${a} ${n}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${m.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function c(){var y;(y=document.getElementById("btnBreakthrough"))==null||y.addEventListener("click",async()=>{const m=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){m.disabled=!0,m.textContent="⏳ Đang đột phá...";try{const g=await p.attemptBreakthrough(u);g.success?(o(g.message,"success"),t.player=g.player,k(),await f()):(o(g.message,"error"),g.player&&(t.player=g.player,k()),await f())}catch(g){o(g.message||"Lỗi đột phá","error"),m.disabled=!1,m.textContent="⚡ ĐỘT PHÁ"}}})}f()}function Tt(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e;kt(i,e)}async function kt(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e;i.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const l=(await p.request(`/player/${t.playerId}/events`)).events||[];if(t.player&&(t.player.unreadEventsCount=0,k()),l.length===0){i.innerHTML=`
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
            ${l.map(x=>{const f=new Date(x.created_at*1e3),v=f.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),b=f.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let c="📌";return x.type==="attack"&&(c="⚔️"),x.type==="hospital"&&(c="🏥"),x.type==="jail"&&(c="🚓"),x.type==="money"&&(c="💰"),x.type==="system"&&(c="⚙️"),x.type==="trade"&&(c="🤝"),`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${v}</div>
                    <div>${b}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${c}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${x.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${x.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(u){i.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${u.message}</div></div>`}}function wt(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;t._tc||(t._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const l=t._tc;async function x(){try{l.data=await p.request(`/player/${u}/atlas-maps`),l.loaded=!0,f()}catch(g){o(g.message,"error")}}function f(){const g=l.data,n=(g==null?void 0:g.atlas)||{},a=(g==null?void 0:g.maps)||[],r=g==null?void 0:g.activeRun,d=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,i.innerHTML=`
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
        <button class="btn ${l.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${a.length})</button>
        ${r?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,i.querySelectorAll("[data-tab]").forEach(h=>{h.addEventListener("click",()=>{l.tab=h.dataset.tab,f()})});const s=document.getElementById("tcContent");s&&(r&&l.tab==="run"?y(s,r):l.tab==="inventory"?b(s,a):v(s,d,n))}function v(g,n,a){var d;const r=((d=l.data)==null?void 0:d.tiers)||[];g.innerHTML=r.map(s=>{const h=n.filter($=>$.tier===s.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${s.tier} ${s.name} <span style="opacity:0.4;font-size:11px">(Realm ${s.requiredRealm}+, ${s.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${h.map($=>{var L;const T=((L=a.progress)==null?void 0:L[$.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[$.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${T?700:400}">${$.name}</span>
                ${T?`<span style="color:var(--green);font-size:11px">✅ ×${T}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function b(g,n,a){if(n.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=n.map((r,d)=>{const s=r.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${m(r.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${r.mapName||r.mapId} <span style="color:${m(r.tier)};font-size:12px">T${r.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${s.length>0?s.map(h=>h.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${s.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${d}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${d}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(r=>{r.addEventListener("click",async()=>{try{const d=await p.request(`/player/${u}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(r.dataset.idx)})});o(d.message,"success"),t.player=d.player,k(),l.tab="run",await x()}catch(d){o(d.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(r=>{r.addEventListener("click",()=>c(parseInt(r.dataset.idx)))})}function c(g){var r;const n=((r=l.data)==null?void 0:r.modifiers)||[],a=document.createElement("div");a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",a.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${n.map(d=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${d.id}">
          <span style="flex:1"><strong>${d.name}</strong><br><span style="font-size:11px;opacity:0.6">${d.desc} · IIQ +${d.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,a.addEventListener("click",async d=>{const s=d.target.closest("[data-modid]");if(s)try{const h=await p.request(`/player/${u}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:s.dataset.modid})});o(h.message,"success"),t.player=h.player,k(),a.remove(),await x()}catch(h){o(h.message,"error")}else d.target===a&&a.remove()}),document.body.appendChild(a)}function y(g,n){var d,s;const a=n.currentWave/n.totalWaves*100,r=n.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${n.mapName} <span style="color:${m(n.tier)}">T${n.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${n.currentWave}/${n.totalWaves}
            ${r.length>0?" · "+r.map(h=>h.name).join(" "):""}
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
    `,(d=document.getElementById("btnTCFight"))==null||d.addEventListener("click",async()=>{l.fighting=!0,f();try{const h=await p.request(`/player/${u}/atlas-maps/fight`,{method:"POST"});t.player=h.player,k();const $=h.result!=="map_failed";o(h.message,$?"success":"error"),l.fighting=!1,(h.result==="map_complete"||h.result==="map_failed")&&(l.tab="atlas"),await x()}catch(h){o(h.message,"error"),l.fighting=!1,f()}}),(s=document.getElementById("btnTCQuit"))==null||s.addEventListener("click",async()=>{try{await p.request(`/player/${u}/atlas-maps/abandon`,{method:"POST"}),o("Đã rời Tiên Cảnh","info"),l.tab="atlas",await x()}catch(h){o(h.message,"error")}})}function m(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}l.loaded?f():x()}function Lt(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;t._tw||(t._tw={data:null,loaded:!1,fighting:!1,tab:"tower"});const l=t._tw;async function x(){try{l.data=await p.request(`/player/${u}/tower`),l.loaded=!0,f()}catch(y){o(y.message,"error")}}function f(){var d,s;const y=l.data,m=y==null?void 0:y.run,g=(y==null?void 0:y.leaderboard)||[],n=(y==null?void 0:y.milestones)||{},a=y==null?void 0:y.nextMilestone;i.innerHTML=`
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
              ${a?`<div style="font-size:11px;margin-top:4px;color:var(--gold)">🎯 Mốc tiếp: T.${a.floor} → ${a.reward.title} (+${a.reward.gold}💎)</div>`:""}
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
    `,i.querySelectorAll("[data-tab]").forEach(h=>h.addEventListener("click",()=>{l.tab=h.dataset.tab,f()})),(d=document.getElementById("btnEnter"))==null||d.addEventListener("click",async()=>{try{const h=await p.request(`/player/${u}/tower/climb`,{method:"POST"});o(h.message,"success"),await x()}catch(h){o(h.message,"error")}}),(s=document.getElementById("btnFight"))==null||s.addEventListener("click",async()=>{var h,$;l.fighting=!0,f();try{const T=await p.request(`/player/${u}/tower/fight`,{method:"POST"});t.player=T.player,k(),l.fighting=!1;const w=document.getElementById("twResult");if(w){const L=T.result!=="death";w.innerHTML=`
            <div class="panel" style="border-left:3px solid ${L?"var(--green)":"var(--red)"}">
              <div class="panel-body" style="padding:14px">
                <div style="font-weight:700;font-size:14px">${T.message}</div>
                ${(h=T.loot)!=null&&h.length?`<div style="font-size:12px;margin-top:6px;opacity:0.7">${T.loot.join(" · ")}</div>`:""}
                ${T.milestone?`<div style="margin-top:8px;padding:8px;background:rgba(255,215,0,0.15);border-radius:6px;font-weight:700;color:var(--gold)">🏆 ${T.milestone.title}!</div>`:""}
                ${(($=T.combatResults)==null?void 0:$.map(E=>`<details style="margin-top:6px"><summary style="cursor:pointer;font-size:11px">${E.monster} — ${E.result==="win"?"✅":"❌"}</summary><pre style="font-size:10px;max-height:150px;overflow:auto;opacity:0.6;margin-top:4px">${(E.log||[]).map(S=>`${S.turn||""}: ${S.text||JSON.stringify(S)}`).join(`
`)}</pre></details>`).join(""))||""}
              </div>
            </div>
          `}await x()}catch(T){o(T.message,"error"),l.fighting=!1,f()}});const r=document.getElementById("twContent");r&&(l.tab==="leaderboard"?b(r,g,y.playerRank):l.tab==="milestones"?c(r,n,(m==null?void 0:m.highestFloor)||0):v(r,m))}function v(y,m){if(!m){y.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Vào tháp để bắt đầu leo!</div></div>';return}const g=m.currentFloor,n=[];g%10===0?n.push("👑 Boss"):g%15===0?n.push("💰 Bảo Tàng (2.5x loot)"):g%7===0?n.push("☠️ Bẫy Trận (-10% HP)"):g%13===0?n.push("💚 Linh Tuyền (+20% HP)"):g%11===0?n.push("⚡ Tinh Anh (+30% stats)"):g%9===0&&g>20&&n.push("☯ Ngũ Hành");const a=Math.min(1+Math.floor(g/20),3);y.innerHTML=`<div class="panel"><div class="panel-body" style="padding:14px">
      <div style="font-weight:700">Tầng ${g} Preview</div>
      <div style="font-size:12px;opacity:0.7;margin-top:4px">
        ${n.length?n.join(" · "):"⚔️ Thường"}
        · ${a} quái
        · Sức mạnh ×${Math.pow(1.08,g-1).toFixed(1)}
      </div>
    </div></div>`}function b(y,m,g){var n;y.innerHTML=`<div class="panel"><div class="panel-title">🏆 Mùa ${(n=l.data)==null?void 0:n.season}</div><div class="panel-body no-pad">
      ${m.length===0?'<div style="padding:20px;text-align:center;opacity:0.4">Chưa có ai leo tháp mùa này</div>':""}
      ${m.map(a=>{const r=a.rank<=3?["","🥇","🥈","🥉"][a.rank]:`#${a.rank}`,d=a.playerId===u;return`<div class="list-item" style="padding:8px 14px;${d?"background:rgba(255,215,0,0.1)":""}">
          <span style="width:40px;font-weight:700;font-size:14px">${r}</span>
          <span style="flex:1;font-weight:${d?800:400}">${a.name}</span>
          <span style="font-size:12px;opacity:0.7">T.${a.floor} · ${a.kills} kills</span>
        </div>`}).join("")}
    </div></div>
    ${g>0?`<div style="text-align:center;margin-top:8px;font-size:12px;opacity:0.6">Hạng của bạn: #${g}</div>`:""}`}function c(y,m,g){y.innerHTML=`<div class="panel"><div class="panel-title">🎯 Mốc Thưởng</div><div class="panel-body no-pad">
      ${Object.entries(m).map(([n,a])=>{const r=g>=parseInt(n);return`<div class="list-item" style="padding:10px 14px;${r?"opacity:0.5":""}">
          <span style="font-size:18px">${r?"✅":"🔒"}</span>
          <span style="flex:1;font-weight:600">Tầng ${n}</span>
          <span style="font-size:12px">${a.title} · +${a.gold}💎</span>
        </div>`}).join("")}
    </div></div>`}l.loaded?f():x()}function St(i,e){const{state:t,api:p,notify:o,updateSidebar:k,renderGame:u}=e,l=t.playerId;t._housing||(t._housing={data:null,loaded:!1});const x=t._housing;async function f(){try{const m=await p.getHousing(l);x.data=m,x.loaded=!0,v()}catch(m){o(m.message||"Lỗi tải Động Phủ","error")}}function v(){const m=x.data;i.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${m.owned?c(m):b(m)}
    `,y()}function b(m){const g=m.tiers[1];return`
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
    `}function c(m){const g=m.gardenSlots||[],n=m.gardenHerbs||{};return`
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
            ${Array.from({length:m.maxSlots},(a,r)=>{const d=g[r]||{},s=!!d.herb,h=d.ready,$=d.remaining||0,T=Math.ceil($/60);return`
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
                    <select class="plant-select" data-slot="${r}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
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
            ${Object.entries(m.formations).map(([a,r])=>{const d=r.currentLevel>=r.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${r.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${r.icon}</span>
                      <strong style="margin-left:4px">${r.name}</strong>
                      ${r.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${r.currentLevel}</span>`:""}
                    </div>
                    ${r.canBuild?d?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${a}">
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
    `}function y(){var m,g,n,a;(m=document.getElementById("btnBuyHouse"))==null||m.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const r=await p.buyHousing(l);o(r.message,"success"),t.player=r.player,k(),await f()}catch(r){o(r.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const r=await p.buyHousing(l);o(r.message,"success"),t.player=r.player,k(),await f()}catch(r){o(r.message,"error")}}),document.querySelectorAll(".plant-select").forEach(r=>{r.addEventListener("change",async d=>{const s=d.target.value;if(!s)return;const h=parseInt(r.dataset.slot);try{const $=await p.plantHerb(l,s,h);o($.message,"success"),await f()}catch($){o($.message,"error")}})}),(n=document.getElementById("btnHarvest"))==null||n.addEventListener("click",async()=>{try{const r=await p.harvestGarden(l);o(r.message,"success"),t.player=r.player,k(),await f()}catch(r){o(r.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.fid;r.disabled=!0,r.textContent="⏳...";try{const s=await p.upgradeFormation(l,d);o(s.message,"success"),t.player=s.player,k(),await f()}catch(s){o(s.message,"error"),r.disabled=!1,r.textContent="⬆ Nâng"}})}),(a=document.getElementById("btnMaintenance"))==null||a.addEventListener("click",async()=>{try{const r=await p.payMaintenance(l);o(r.message,"success"),t.player=r.player,k(),await f()}catch(r){o(r.message,"error")}})}x.loaded?v():f()}function Et(i,e){const{state:t}=e;t._wikiTab||(t._wikiTab="lore");function p(){i.innerHTML=`
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
    `,i.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{t._wikiTab=k.dataset.tab,p()})})}function o(k){return{lore:`
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
      `}[k]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}p()}function Ct(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;t._npcShop||(t._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const l=t._npcShop;async function x(){try{const b=await p.getShops(u);l.shops=b.shops||[],l.tax=b.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},l.loaded=!0,f()}catch(b){o(b.message||"Lỗi tải shop","error")}}function f(){i.innerHTML=`
      <div class="page-header">
        <h2>🧓 Thương Nhân NPC</h2>
        <p class="page-sub">Mua vật phẩm từ NPC. Stock giới hạn/ngày. Mua tối đa 50 vật phẩm/ngày.</p>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <div style="padding:6px 12px;background:rgba(255,200,0,0.08);border:1px solid rgba(255,200,0,0.2);border-radius:6px;font-size:12px">
          📊 Thuế P2P: <strong style="color:var(--gold)">${l.tax.rate}%</strong>
          <span style="opacity:0.5;margin-left:4px">${l.tax.reason}</span>
        </div>
      </div>

      ${l.shops.length===0?'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.4;padding:30px">Không có cửa hàng</div></div>':""}

      ${l.shops.map(b=>`
        <div class="panel" style="margin-bottom:10px">
          <div class="panel-title">${b.icon} ${b.name} <span style="opacity:0.4;font-size:11px">— ${b.area}</span></div>
          <div class="panel-body no-pad">
            ${b.items.map(c=>`
              <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:500">${c.name}</div>
                  <div style="font-size:11px;opacity:0.5">
                    Stock: <span style="color:${c.remainingStock>0?"var(--green)":"var(--red)"}">${c.remainingStock}/${c.dailyStock}</span>
                    · 💎 ${c.currentPrice}
                  </div>
                </div>
                <div style="display:flex;gap:4px;align-items:center">
                  <input type="number" class="buy-qty" data-shop="${b.id}" data-item="${c.id}" data-price="${c.currentPrice}"
                    value="1" min="1" max="${c.remainingStock}" style="width:40px;text-align:center;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:3px;font-size:11px">
                  <button class="btn btn--sm btn--gold btn-buy" data-shop="${b.id}" data-item="${c.id}"
                    ${c.remainingStock<=0?"disabled":""}>
                    ${c.remainingStock>0?"🛒 Mua":"❌ Hết"}
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `,v()}function v(){i.querySelectorAll(".btn-buy").forEach(b=>{b.addEventListener("click",async()=>{const c=b.dataset.shop,y=b.dataset.item,m=i.querySelector(`.buy-qty[data-shop="${c}"][data-item="${y}"]`),g=parseInt((m==null?void 0:m.value)||1);b.disabled=!0,b.textContent="⏳...";try{const n=await p.buyFromShop(u,c,y,g);o(n.message,"success"),t.player=n.player,k(),await x()}catch(n){o(n.message,"error"),b.disabled=!1,b.textContent="🛒 Mua"}})})}l.loaded?f():x()}function Pt(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;t._guild||(t._guild={data:null,loaded:!1,allGuilds:null});const l=t._guild;async function x(){try{l.data=await p.getMyGuild(u),l.loaded=!0,v()}catch(m){o(m.message||"Lỗi","error")}}async function f(){try{const m=await p.listGuilds();l.allGuilds=m.guilds||[],v()}catch(m){o(m.message,"error")}}function v(){const m=l.data;i.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${m!=null&&m.inGuild?c(m):b(m)}
    `,y()}function b(m){return`
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
    `}function c(m){var r;const g=m.guild,n=m.members||[],a=m.log||[];return`
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
            ${a.slice(0,10).map(d=>`
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
    `}function y(){var m,g,n,a,r,d;(m=document.getElementById("btnCreate"))==null||m.addEventListener("click",async()=>{var T,w,L,E,S,P;const s=(w=(T=document.getElementById("guildName"))==null?void 0:T.value)==null?void 0:w.trim(),h=(E=(L=document.getElementById("guildTag"))==null?void 0:L.value)==null?void 0:E.trim(),$=(P=(S=document.getElementById("guildDesc"))==null?void 0:S.value)==null?void 0:P.trim();if(!s||!h)return o("Nhập tên và tag!","error");try{const M=await p.createGuild(u,s,h,$);o(M.message,"success"),t.player=M.player,k(),l.loaded=!1,await x()}catch(M){o(M.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",f),document.querySelectorAll(".btn-join").forEach(s=>{s.addEventListener("click",async()=>{try{const h=await p.joinGuild(u,parseInt(s.dataset.gid));o(h.message,"success"),l.loaded=!1,await x()}catch(h){o(h.message,"error")}})}),(n=document.getElementById("btnContribute"))==null||n.addEventListener("click",async()=>{var h;const s=parseInt(((h=document.getElementById("contributeAmt"))==null?void 0:h.value)||0);if(!(s<=0))try{const $=await p.contributeGuild(u,s);o($.message,"success"),t.player=$.player,k(),await x()}catch($){o($.message,"error")}}),(a=document.getElementById("btnUpgradeGuild"))==null||a.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const s=await p.upgradeGuild(u);o(s.message,"success"),await x()}catch(s){o(s.message,"error")}}),(r=document.getElementById("btnPayUpkeep"))==null||r.addEventListener("click",async()=>{try{const s=await p.payGuildUpkeep(l.data.guild.id);o(s.message,"success"),await x()}catch(s){o(s.message,"error")}}),(d=document.getElementById("btnLeave"))==null||d.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const s=await p.leaveGuild(u);o(s.message,"success"),l.loaded=!1,await x()}catch(s){o(s.message,"error")}})}l.loaded?v():x()}function Mt(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;t._profile||(t._profile={results:[],viewing:null,searchQuery:""});const l=t._profile;function x(){i.innerHTML=`
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

      ${l.viewing?f(l.viewing):""}

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
    `,v()}function f(c){var n,a,r;const y=c.id===u,m=c.maxHp>0?Math.round(c.currentHp/c.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((n=c.name[0])==null?void 0:n.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${c.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${c.level} · ${((a=c.realmInfo)==null?void 0:a.fullName)||"Phàm Nhân"}
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
    `}function v(){var c,y,m,g,n;(c=document.getElementById("btnSearch"))==null||c.addEventListener("click",b),(y=document.getElementById("searchInput"))==null||y.addEventListener("keydown",a=>{a.key==="Enter"&&b()}),document.querySelectorAll(".btn-view, [data-view]").forEach(a=>{a.addEventListener("click",async()=>{const r=a.dataset.vid||a.dataset.view;try{const d=await p.getPlayerProfile(r);l.viewing=d.profile,x()}catch(d){o(d.message,"error")}})}),(m=document.getElementById("btnAttack"))==null||m.addEventListener("click",async()=>{const a=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${l.viewing.name}?`))try{const r=await p.mugPlayer(u,a);o(r.message,r.won?"success":"error"),r.player&&(t.player=r.player,k())}catch(r){o(r.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const a=document.getElementById("btnAddFriend").dataset.tid;try{const r=await p.addFriend(u,a);o(r.message||"Đã gửi lời mời!","success")}catch(r){o(r.message,"error")}}),(n=document.getElementById("btnBackSearch"))==null||n.addEventListener("click",()=>{l.viewing=null,x()})}async function b(){var m;const c=document.getElementById("searchInput"),y=(m=c==null?void 0:c.value)==null?void 0:m.trim();if(!y||y.length<2)return o("Nhập ít nhất 2 ký tự!","error");l.searchQuery=y,l.viewing=null;try{const g=await p.searchPlayers(y);l.results=g.players||[],x()}catch(g){o(g.message,"error")}}x()}function It(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;t._arena||(t._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const l=t._arena;async function x(){try{l.data=await p.getArena(u),l.loaded=!0,f()}catch(b){o(b.message,"error")}}function f(){var a,r,d,s,h,$,T,w;const b=l.data,c=(b==null?void 0:b.arena)||{},y=c.rank||{},m=parseInt(c.streak)||0,g=m>=5?`🔥x${m}`:m>=3?`⚡x${m}`:m>0?`${m}W`:m<0?`${Math.abs(m)}L`:"",n=m>=5?"var(--gold)":m>=3?"var(--orange)":m>0?"var(--green)":m<0?"var(--red)":"var(--text-dim)";i.innerHTML=`
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
      ${(a=l.lastResult)!=null&&a.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(r=l.lastResult.newRank)==null?void 0:r.icon}</div>
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
            (ELO ${($=l.lastResult.opponent)==null?void 0:$.rating})
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
          ${(b.opponents||[]).length>0?(b.opponents||[]).map(L=>{var E,S,P;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((E=L.rank)==null?void 0:E.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${L.name} <span style="opacity:0.4;font-size:11px">Lv.${L.level}</span></div>
                <div style="font-size:11px;color:${((S=L.rank)==null?void 0:S.color)||"#888"}">${((P=L.rank)==null?void 0:P.name)||"Đồng"} · ELO ${L.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${L.player_id}" ${l.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${l.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${b.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(b.top10||[]).map((L,E)=>{var S,P;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${E<3?"var(--gold)":"var(--text-dim)"}">#${E+1}</span>
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
            ${(b.history||[]).map(L=>{const E=L.winner_id===u;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${E?"var(--green)":"var(--red)"}">
                  ${E?"✅":"❌"} vs ${L.attacker_id===u?L.defender_name:L.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${L.rating_change>0?"+":""}${L.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,i.querySelectorAll(".btn-fight-opp").forEach(L=>{L.addEventListener("click",E=>v(E.target.dataset.oid))}),(w=document.getElementById("btnRandomFight"))==null||w.addEventListener("click",()=>v(null))}async function v(b){l.fighting=!0,f();try{const c=await p.request(`/player/${u}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:b})});l.lastResult=c,t.player=c.player,k(),o(c.message,c.won?"success":"error"),l.fighting=!1,await x()}catch(c){o(c.message,"error"),l.fighting=!1,f()}}l.loaded?f():x()}function qt(i,e){const{state:t,api:p,notify:o,updateSidebar:k,renderGame:u}=e,l=t.playerId,x=t._auctionTab||"browse";async function f(){try{const[c,y]=await Promise.all([p.getAuctions(),p.getMyAuctions(l)]);t._auctionListings=c.listings||[],t._auctionMine=y.listings||[],v()}catch(c){o(c.message,"error")}}function v(){const c=t._auctionListings||[],y=t._auctionMine||[],m=(t.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");i.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${x==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${x==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${x==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${y.length})</button>
      </div>

      ${x==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':c.map(g=>{const n=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${n.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${n.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${g.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${g.id}">💎 ${g.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:x==="sell"?`
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
    `,b()}function b(){var c;i.querySelectorAll(".tab-btn").forEach(y=>y.addEventListener("click",()=>{t._auctionTab=y.dataset.tab,f()})),i.querySelectorAll(".btn-buy").forEach(y=>y.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const m=await p.buyAuction(l,parseInt(y.dataset.lid));o(m.message,"success"),t.player=m.player,k(),await f()}catch(m){o(m.message,"error")}})),i.querySelectorAll(".btn-cancel").forEach(y=>y.addEventListener("click",async()=>{try{const m=await p.cancelAuction(l,parseInt(y.dataset.lid));o(m.message,"success"),t.player=m.player,k(),await f()}catch(m){o(m.message,"error")}})),(c=document.getElementById("btnListItem"))==null||c.addEventListener("click",async()=>{var n,a,r;const y=(n=document.getElementById("selSellItem"))==null?void 0:n.value,m=parseInt(((a=document.getElementById("inpPrice"))==null?void 0:a.value)||"500"),g=parseInt(((r=document.getElementById("selDuration"))==null?void 0:r.value)||"24");try{const d=await p.listAuction(l,y,m,g);o(d.message,"success"),t.player=d.player,k(),t._auctionTab="mine",await f()}catch(d){o(d.message,"error")}})}f()}function Ht(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;async function l(){try{const f=await p.getDailyQuests(u);t._dailyQuests=f,x()}catch(f){o(f.message,"error")}}function x(){const f=t._dailyQuests||{},v=f.quests||[];f.allCompleted;const b=f.bonusReward;i.innerHTML=`
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

      ${b?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${b.gold} 💎, +${b.xp} EXP</div>
      </div>
      `:""}
    `,i.querySelectorAll(".btn-claim").forEach(c=>c.addEventListener("click",async()=>{try{const y=await p.claimDailyQuest(u,parseInt(c.dataset.qid));o(y.message,"success"),t.player=y.player,k(),await l()}catch(y){o(y.message,"error")}}))}l()}function Nt(i,e){const{state:t,api:p,notify:o,updateSidebar:k}=e,u=t.playerId;async function l(){try{t._worldBoss=await p.getWorldBoss(),x()}catch(f){o(f.message,"error")}}function x(){var g;const f=t._worldBoss||{},v=f.boss||{},b=f.hpPercent||0,c=f.topContributors||[],y=f.rewards||{},m=v.status==="active"&&v.current_hp>0;i.innerHTML=`
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
              <div style="height:100%;width:${b}%;background:${b>50?"var(--red)":b>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
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
          ${c.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':c.map((n,a)=>{var r;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${a<3?"var(--gold)":"var(--text-dim)"}">#${a+1}</span>
                <span style="flex:1">${n.name}</span>
                <span style="color:var(--red)">${(r=n.total_damage)==null?void 0:r.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${n.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const n=document.getElementById("btnAttackBoss");n.disabled=!0,n.textContent="⏳ Đang giao chiến...";const a=document.getElementById("bossCombatResult");try{const r=await p.attackWorldBoss(u);if(t.player=r.player,k(),r.log&&r.log.length>0){const d=r.log.map(T=>T.startsWith("---")?`<div class="turn">${T}</div>`:T.includes("hụt")?`<div class="miss">${T}</div>`:T.includes("né được")?`<div class="dodge">${T}</div>`:T.includes("CHÍNH MẠNG")||T.includes("💥")?`<div class="crit">${T}</div>`:T.includes("🔥")?`<div class="heavy text-orange">${T}</div>`:T.includes("chặn hoàn toàn")||T.includes("🛡")?`<div class="dodge">${T}</div>`:T.includes("ngã xuống")||T.includes("💀")?`<div class="death">${T}</div>`:T.includes("Chiến thắng")||T.includes("🏆")?`<div class="victory">${T}</div>`:T.includes("bỏ chạy")||T.includes("🏃")?`<div class="flee">${T}</div>`:T.includes("Bất phân")||T.includes("🤝")?`<div class="stalemate">${T}</div>`:T.includes("🧪")?`<div class="status-effect text-purple">${T}</div>`:T.includes("💔")?`<div class="dot-damage text-purple bold">${T}</div>`:T.includes("✨")?`<div class="regen text-green">${T}</div>`:`<div class="hit">${T}</div>`).join(""),s={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},h=s[r.outcome]||s.loss,$=Math.max(0,t.player.currentHp/t.player.maxHp*100);a.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${h.icon} ${h.text}
                <span class="subtitle">${r.turns}/${r.maxTurns||25} lượt · ⚔️ ${r.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${h.cls}">
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
              <div class="combat-log">${d}</div>
            </div>`}r.defeated?o(r.message,"success"):o(`⚔️ ${r.damage} dmg!`,"info"),await l()}catch(r){o(r.message,"error"),n.disabled=!1,n.textContent="⚔️ Tấn Công"}})}l()}function Bt(i,e){const{state:t,api:p,notify:o,updateSidebar:k,renderGame:u}=e,l=t.playerId,x={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function f(){var b;try{const[c,y]=await Promise.all([p.getGachaPools(),p.getGachaPity(l)]);t._gacha={pools:c.pools||{},pity:y.pity||{},results:((b=t._gacha)==null?void 0:b.results)||[]},v()}catch(c){o(c.message,"error")}}function v(){const b=t._gacha||{},c=b.pools||{},y=b.pity||{},m=b.results||[];i.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(c).map(([g,n])=>{var r,d,s;const a=y[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${n.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${x.legendary}">★ ${(r=n.rates)==null?void 0:r.legendary}%</span> ·
                <span style="color:${x.rare}">◆ ${(d=n.rates)==null?void 0:d.rare}%</span> ·
                <span style="color:${x.uncommon}">● ${(s=n.rates)==null?void 0:s.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${a.pulls_since_rare||0}/${n.pityRare} · Legend: ${a.pulls_since_legendary||0}/${n.pityLegendary}
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
            ${m.map(g=>{var n,a,r,d;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${x[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((n=g.item)==null?void 0:n.slot)==="weapon"?"⚔️":((a=g.item)==null?void 0:a.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${x[g.rarity]}">${((r=g.item)==null?void 0:r.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((d=g.item)==null?void 0:d.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,i.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const n=g.dataset.pool,a=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const r=await p.gachaPull(t.playerId,n,a);o(r.message,"success"),t.player=r.player,k(),t._gacha.results=r.results||[],t._gacha.pity[n]=r.pity,v()}catch(r){o(r.message,"error"),g.disabled=!1}}))}f()}function _t(i,e){const{state:t,api:p,notify:o}=e,k=t._lbTab||"level";async function u(){try{t._lbData=await p.getLeaderboard(k),l()}catch(x){o(x.message,"error")}}function l(){const f=(t._lbData||{}).rankings||[],v={level:"📊 Level",gold:"💰 Linh Thạch",pvp:"⚔️ PvP",guild:"🏯 Tông Môn"};i.innerHTML=`
      <div class="page-header">
        <h2>🏆 Bảng Xếp Hạng</h2>
        <p class="page-sub">Top 50 người chơi và guild.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        ${Object.entries(v).map(([b,c])=>`<button class="btn ${k===b?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="${b}">${c}</button>`).join("")}
      </div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${k==="guild"?f.map((b,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1">
                <strong>[${b.tag}] ${b.name}</strong>
                <span style="opacity:0.4"> Lv${b.level}</span>
              </span>
              <span style="opacity:0.4">${b.members}/${b.max_members} 👤</span>
              <span style="color:var(--gold);margin-left:8px">💰 ${parseInt(b.treasury||0).toLocaleString()}</span>
            </div>
          `).join(""):k==="pvp"?f.map((b,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1"><strong>${b.name}</strong> <span style="opacity:0.4">Lv${b.level}</span></span>
              <span style="color:var(--blue)">${b.rating} ELO</span>
              <span style="opacity:0.4;margin-left:6px">${b.wins}W/${b.losses}L</span>
            </div>
          `).join(""):f.map((b,c)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${c<3?"var(--gold)":"var(--text-dim)"}">#${c+1}</span>
              <span style="flex:1"><strong>${b.name}</strong></span>
              ${k==="level"?`<span>Lv${b.level}</span>`:""}
              <span style="color:var(--gold);margin-left:8px">💎 ${parseInt(b.gold||0).toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,i.querySelectorAll(".tab-btn").forEach(b=>b.addEventListener("click",()=>{t._lbTab=b.dataset.tab,u()}))}u()}const C={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},nt=document.getElementById("app"),J={get state(){return C},api:q,notify:z,renderGame:H,updateSidebar:Gt};async function zt(){const i=localStorage.getItem("playerId");if(i&&!C.playerId)try{const e=await q.getPlayer(i);C.playerId=i,C.player=e.player,await V(),H();return}catch{localStorage.removeItem("playerId")}C.playerId?H():st()}function st(){var e,t;const i=C.authTab||"login";nt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(p=>{p.addEventListener("click",()=>{C.authTab=p.dataset.auth,st()})}),(e=document.getElementById("btnLogin"))==null||e.addEventListener("click",async()=>{const p=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value;if(!p||!o)return z("Vui lòng nhập đầy đủ","error");try{const k=await q.login(p,o);C.playerId=k.id,C.player=k.player,localStorage.setItem("playerId",k.id),z(k.message,"success"),await V(),H()}catch(k){z(k.message||"Đăng nhập thất bại!","error")}}),(t=document.getElementById("btnRegister"))==null||t.addEventListener("click",async()=>{var l,x;const p=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value,k=((l=document.getElementById("inpName"))==null?void 0:l.value.trim())||"Vô Danh",u=((x=document.querySelector('input[name="gender"]:checked'))==null?void 0:x.value)||"male";if(!p||!o)return z("Vui lòng nhập đầy đủ","error");try{const f=await q.register(p,o,k,u);C.playerId=f.id,C.player=f.player,localStorage.setItem("playerId",f.id),z(f.message,"success"),await V(),H()}catch(f){z(f.message||"Đăng ký thất bại!","error")}})}function it(i){const e=Math.floor(Date.now()/1e3),t=[];return i.hospitalUntil&&i.hospitalUntil>e&&t.push({icon:"🏥",label:"Tịnh dưỡng",endTime:i.hospitalUntil,color:"var(--red)"}),i.medCooldownUntil&&i.medCooldownUntil>e&&t.push({icon:"💊",label:"Đan độc",endTime:i.medCooldownUntil,color:"var(--orange)"}),i.jailUntil&&i.jailUntil>e&&t.push({icon:"⛓️",label:"Ngục tù",endTime:i.jailUntil,color:"var(--purple)"}),i.travelArrivesAt&&i.travelArrivesAt>e&&t.push({icon:"🚶",label:"Di chuyển",endTime:i.travelArrivesAt,color:"var(--blue)"}),t.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${t.map(p=>{const o=Math.max(0,p.endTime-e),k=Math.floor(o/60),u=o%60,l=k>0?`${k}p${String(u).padStart(2,"0")}s`:`${u}s`;return`<span class="status-icon" data-end="${p.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${p.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${p.color};white-space:nowrap;
      " title="${p.label}">${p.icon} <span class="cd-time">${l}</span></span>`}).join("")}
  </div>`}let G=null;function Ot(){G&&clearInterval(G),G=setInterval(()=>{const i=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(e=>{const t=parseInt(e.dataset.end),p=Math.max(0,t-i);if(p<=0){e.remove();return}const o=Math.floor(p/60),k=p%60,u=e.querySelector(".cd-time");u&&(u.textContent=o>0?`${o}p${String(k).padStart(2,"0")}s`:`${k}s`)}),document.querySelectorAll(".status-effects").forEach(e=>{e.children.length===0&&e.remove()})},1e3)}function rt(i){let e="";const p={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[i.currentArea];return p&&(e+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${p.tooltip}">${p.icon} Cảnh Vực</span>`),i.combatBuffs&&i.combatBuffs.length>0&&i.combatBuffs.forEach(o=>{let k="💊",u="Buff";o.type==="status"&&o.stat==="poison"?(k="☠️",u="Trúng Độc"):o.type==="status"&&o.stat==="confuse"?(k="👹",u="Ma Hóa"):o.stat==="allStats"||o.stat==="hp"||o.stat==="damage"?(k="🔥",u="Cuồng Nộ"):o.stat==="defense"||o.stat==="resist"?(k="🛡️",u="Kiên Cố"):o.stat==="speed"||o.stat==="dexterity"?(k="💨",u="Thân Pháp"):(k="✨",u="Cường Hóa");let l=o.duration?` (-${o.duration} Trận)`:"",x=`Hiệu ứng: ${o.stat} (${o.type} ${o.value})${o.duration?` - Còn lại: ${o.duration} Trận đấu`:""}`;e+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${x}">${k} ${u}${l}</span>`}),e?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${e}</div>`:""}function H(){var b,c,y,m,g,n,a,r,d;const i=C.player;if(!i)return;const e=Math.max(0,i.currentHp/i.maxHp*100),t=i.maxStamina>0?Math.max(0,i.currentStamina/i.maxStamina*100):0,p=i.maxEnergy>0?Math.max(0,i.currentEnergy/i.maxEnergy*100):0,o=(i.maxNerve??15)>0?Math.max(0,(i.nerve??0)/(i.maxNerve??15)*100):0,k=C.exploration?C.exploration[i.currentArea||"thanh_lam_tran"]:null,u=k?k.name:"Khám Phá";nt.innerHTML=`
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
          <div class="player-meta">Lv.${i.level} · ${((b=i.realmInfo)==null?void 0:b.fullName)||"?"}</div>
          ${it(i)}
          ${rt(i)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${i.currentHp}/${i.maxHp}
                ${i.currentHp<i.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(c=i.skills)!=null&&c.some(s=>s.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${e}%" data-low="${e<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${i.currentStamina??100}/${i.maxStamina??100}
                ${(i.currentStamina??100)<(i.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((y=i.stats)==null?void 0:y.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${t}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${i.currentEnergy}/${i.maxEnergy}
                ${i.currentEnergy<i.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((m=i.stats)==null?void 0:m.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${p}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${i.nerve??0}/${i.maxNerve??15}${(i.nerve??0)<(i.maxNerve??15)?'<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+1/5min</span>':""}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${o}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${i.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${C.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(i.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
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
            📍 ${u} ${i.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':i.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(i.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <li class="nav-section">TỰ THÂN</li>
          <li class="nav-item ${C.currentPage==="stats"?"active":""}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${(n=(g=C.player)==null?void 0:g.realmInfo)!=null&&n.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="inventory"?"active":""}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(i.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)">⏳</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="skills"||C.currentPage==="education"?"active":""}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>


          <li class="nav-item ${["travel","dungeon","tiencanh"].includes(C.currentPage)?"active":""}" data-page="travel">
            <span class="icon">🚶</span> Ngao Du
            ${(i.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="quests"||C.currentPage==="dailyquest"?"active":""}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(i.activeQuests||[]).filter(s=>s.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(i.activeQuests||[]).filter(s=>s.status==="active").length}</span>`:""}
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
          <li class="nav-item ${C.currentPage==="gacha"?"active":""}" data-page="gacha">
            <span class="icon">🎰</span> Thiên Cơ Đài
          </li>

          ${i.role==="admin"?`
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(s=>{s.addEventListener("click",()=>{C.currentPage=s.dataset.page,H()})}),(a=document.getElementById("btnFabChat"))==null||a.addEventListener("click",()=>D("chat")),(r=document.getElementById("btnFabSocial"))==null||r.addEventListener("click",()=>D("social"));const l=document.querySelector('.sidebar-gold .nav-item[data-page="events"]');l&&l.addEventListener("click",s=>{s.stopPropagation(),C.currentPage="events",C.popupOpen=!1,H()}),(d=document.getElementById("btnPopupClose"))==null||d.addEventListener("click",()=>{C.popupOpen=!1,H()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(s=>{s.addEventListener("click",()=>D(s.dataset.popup))}),At(),C.popupOpen&&Rt();const x=document.getElementById("searchPlayerInput"),f=document.getElementById("searchResults");let v=null;x&&f&&(x.addEventListener("input",()=>{clearTimeout(v);const s=x.value.trim();if(s.length<2){f.style.display="none";return}v=setTimeout(async()=>{try{const h=await q.searchPlayers(s),$=h.players||h.results||[];$.length===0?f.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':f.innerHTML=$.map(T=>{var w;return`
              <div class="search-result" data-pid="${T.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${T.name} <span style="opacity:0.4">Lv.${T.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((w=T.realmInfo)==null?void 0:w.name)||""}</span>
              </div>
            `}).join(""),f.style.display="block",f.querySelectorAll(".search-result").forEach(T=>{T.addEventListener("click",()=>{C.currentPage="profile",C._viewProfileId=T.dataset.pid,f.style.display="none",x.value="",H()}),T.addEventListener("mouseenter",()=>T.style.background="rgba(255,255,255,0.08)"),T.addEventListener("mouseleave",()=>T.style.background="transparent")})}catch{f.style.display="none"}},300)}),x.addEventListener("blur",()=>{setTimeout(()=>{f.style.display="none"},200)}),x.addEventListener("keydown",s=>{s.key==="Escape"&&(f.style.display="none",x.blur())})),Ot()}function D(i){C.popupOpen=!0,C.popupPage=i,H()}function Rt(){const i=document.getElementById("popupContent");i&&(C.popupPage==="chat"?at(i,J):C.popupPage==="social"&&et(i,J))}const jt={combat:ct,crimes:ht,education:Y,stats:ut,skills:vt,inventory:K,travel:tt,alchemy:F,quests:bt,admin:xt,social:et,chat:at,market:ft,realm:$t,events:Tt,dungeon:Z,housing:St,wiki:Et,npcshop:Ct,guild:Pt,library:X,profile:Mt,arena:It,auction:qt,dailyquest:Ht,worldboss:Nt,gacha:Bt,leaderboard:_t,tiencanh:wt,tower:Lt};function At(){const i=document.getElementById("pageContent");if(!i)return;const e=jt[C.currentPage];e&&e(i,J)}function Gt(){var k,u,l,x,f;const i=C.player;if(!i)return;const e=Math.max(0,i.currentHp/i.maxHp*100),t=i.maxEnergy>0?Math.max(0,i.currentEnergy/i.maxEnergy*100):0,p=document.querySelector(".sidebar-player");if(p){const v=i.maxStamina>0?Math.max(0,i.currentStamina/i.maxStamina*100):0,b=(i.maxNerve??15)>0?Math.max(0,(i.nerve??0)/(i.maxNerve??15)*100):0;p.innerHTML=`
      <div class="player-name">${i.name}</div>
      <div class="player-meta">Lv.${i.level} · ${((k=i.realmInfo)==null?void 0:k.fullName)||"?"}</div>
      ${it(i)}
      ${rt(i)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${i.currentHp}/${i.maxHp}
            ${i.currentHp<i.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(u=i.skills)!=null&&u.some(c=>c.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${e}%" data-low="${e<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${i.currentStamina??100}/${i.maxStamina??100}
            ${(i.currentStamina??100)<(i.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((l=i.stats)==null?void 0:l.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${v}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${i.currentEnergy}/${i.maxEnergy}
            ${i.currentEnergy<i.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((x=i.stats)==null?void 0:x.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${t}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label"><span>💀 Nghịch Khí</span><span>${i.nerve??0}/${i.maxNerve??15}</span></div>
        <div class="bar-track"><div class="bar-fill nerve" style="width:${b}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${i.gold??0} Linh Thạch</div>`}const o=document.querySelector('.nav-item[data-page="stats"]');if(o){let v="";i.statPoints>0&&(v+=`<span class="badge">${i.statPoints}</span>`),(f=i.realmInfo)!=null&&f.canBreakthrough&&(v+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),o.querySelectorAll(".badge").forEach(b=>b.remove()),o.insertAdjacentHTML("beforeend",v)}}async function V(){try{const[i,e,t,p,o,k]=await Promise.all([q.getMonsters(),q.getSkills(),q.getItems(),q.getMedicines(),q.getCrimes(),q.getEducation()]);C.monsters=i.monsters||[],C.skills=e.skills||[],C.items=t.items||[],C.medicines=p.medicines||[],C.crimes=o.crimes||[],C.educationTrees=k.trees||[],C.exploration=await q.getExploration(),C.recipes=(await q.getRecipes()).recipes,C.npcs=(await q.getNpcs()).npcs||[]}catch(i){console.error("Lỗi tải dữ liệu:",i)}}function z(i,e="info"){var p;(p=document.querySelector(".notification"))==null||p.remove();const t=document.createElement("div");t.className=`notification ${e}`,t.textContent=i,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}zt();
//# sourceMappingURL=index-BETtGvTn.js.map
