(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const k of o)if(k.type==="childList")for(const v of k.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&c(v)}).observe(document,{childList:!0,subtree:!0});function t(o){const k={};return o.integrity&&(k.integrity=o.integrity),o.referrerPolicy&&(k.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?k.credentials="include":o.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function c(o){if(o.ep)return;o.ep=!0;const k=t(o);fetch(o.href,k)}})();const lt="/api";class ot{async request(a,t={}){try{const c=await fetch(`${lt}${a}`,{headers:{"Content-Type":"application/json",...t.headers},...t}),o=await c.json();if(!c.ok)throw new Error(o.error||`HTTP ${c.status}`);return o}catch(c){throw console.error(`API Error [${a}]:`,c),c}}register(a,t,c,o){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:a,password:t,name:c,gender:o})})}login(a,t){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:a,password:t})})}createPlayer(a,t){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:a,gender:t})})}getPlayer(a){return this.request(`/player/${a}`)}allocateStat(a,t,c=1){return this.request(`/player/${a}/allocate`,{method:"POST",body:JSON.stringify({stat:t,points:c})})}equipItem(a,t){return this.request(`/player/${a}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}learnSkill(a,t){return this.request(`/player/${a}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:t})})}equipSkill(a,t,c=!0){return this.request(`/player/${a}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:t,equip:c})})}healPlayer(a){return this.request(`/player/${a}/heal`,{method:"POST"})}useMedicine(a,t){return this.request(`/player/${a}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}trainStat(a,t){return this.request(`/player/${a}/train`,{method:"POST",body:JSON.stringify({stat:t})})}fullCombat(a,t=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:a,monsterId:t})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(a,t){return this.request(`/player/${a}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}useItem(a,t){return this.request(`/player/${a}/use`,{method:"POST",body:JSON.stringify({itemId:t})})}useMedicine(a,t){return this.request(`/player/${a}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}generateItem(a,t){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,playerId:a})})}trainStat(a,t,c=1){return this.request(`/player/${a}/train`,{method:"POST",body:JSON.stringify({stat:t,count:c})})}allocateStat(a,t){return this.request(`/player/${a}/allocate`,{method:"POST",body:JSON.stringify({stat:t})})}attemptBreakthrough(a){return this.request(`/player/${a}/breakthrough`,{method:"POST"})}getRealm(a){return this.request(`/player/${a}/realm`)}craftItem(a,t){return this.request(`/player/${a}/craft`,{method:"POST",body:JSON.stringify({recipeId:t})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(a,t,c,o=-1){return this.request(`/player/${a}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:c,lockAffixIndex:o})})}commitCrime(a,t){return this.request(`/player/${a}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:t})})}escapeJail(a){return this.request(`/player/${a}/escape-jail`,{method:"POST"})}bail(a){return this.request(`/player/${a}/bail`,{method:"POST"})}enrollNode(a,t,c){return this.request(`/player/${a}/enroll`,{method:"POST",body:JSON.stringify({nodeId:t,treeId:c})})}checkEducation(a){return this.request(`/player/${a}/check-education`,{method:"POST"})}generateItem(a="common",t=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:a,slot:t})})}explore(a){return this.request(`/player/${a}/explore`,{method:"POST"})}trackMonster(a,t){return this.request(`/player/${a}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:t})})}getAreaMonsters(a){return this.request(`/player/${a}/area-monsters`)}getNpc(a){return this.request(`/npc/${a}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(a,t,c){return this.request(`/player/${a}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:t,questId:c})})}completeQuest(a,t){return this.request(`/player/${a}/complete-quest`,{method:"POST",body:JSON.stringify({questId:t})})}getQuests(a){return this.request(`/player/${a}/quests`)}searchPlayers(a){return this.request(`/players/search?q=${encodeURIComponent(a)}`)}getRelationships(a){return this.request(`/player/${a}/relationships`)}interactPlayer(a,t,c,o){return this.request(`/player/${a}/interact`,{method:"POST",body:JSON.stringify({targetId:t,action:c,amount:o})})}addFriend(a,t){return this.request(`/player/${a}/add-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}acceptFriend(a,t){return this.request(`/player/${a}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}rejectFriend(a,t){return this.request(`/player/${a}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}removeFriend(a,t){return this.request(`/player/${a}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}addEnemy(a,t){return this.request(`/player/${a}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}removeEnemy(a,t){return this.request(`/player/${a}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}getGlobalChat(a=0){return this.request(`/chat/global?afterId=${a}`)}getPrivateChat(a,t,c=0){return this.request(`/chat/private/${a}?with=${t}&afterId=${c}`)}getChatFriends(a){return this.request(`/chat/friends/${a}`)}sendChat(a,t,c,o){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:a,channel:t,receiverId:c,message:o})})}getMarketListings(a="",t="newest"){const c=new URLSearchParams;return a&&c.set("type",a),t&&c.set("sort",t),this.request(`/market?${c.toString()}`)}getMyListings(a){return this.request(`/market/my/${a}`)}listForSale(a,t,c,o,k){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:a,itemType:t,itemId:c,quantity:o,price:k})})}buyFromMarket(a,t,c=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:a,listingId:t,quantity:c})})}cancelListing(a,t){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:a,listingId:t})})}getRealmInfo(a){return this.request(`/player/${a}/realm`)}attemptBreakthrough(a){return this.request(`/player/${a}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(a){return this.request(`/player/${a}/mug-targets`)}mugPlayer(a,t){return this.request(`/player/${a}/mug`,{method:"POST",body:JSON.stringify({victimId:t})})}getMugLog(a){return this.request(`/player/${a}/mug-log`)}getMapItems(a){return this.request(`/player/${a}/map-items`)}enterDungeon(a,t){return this.request(`/player/${a}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:t})})}fightDungeonWave(a){return this.request(`/player/${a}/dungeon/fight`,{method:"POST"})}abandonDungeon(a){return this.request(`/player/${a}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(a){return this.request(`/player/${a}/dungeon/history`)}getHousing(a){return this.request(`/player/${a}/housing`)}buyHousing(a){return this.request(`/player/${a}/housing/buy`,{method:"POST"})}plantHerb(a,t,c){return this.request(`/player/${a}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:t,slotIndex:c})})}harvestGarden(a){return this.request(`/player/${a}/housing/harvest`,{method:"POST"})}upgradeFormation(a,t){return this.request(`/player/${a}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:t})})}payMaintenance(a){return this.request(`/player/${a}/housing/maintenance`,{method:"POST"})}listForRent(a,t){return this.request(`/player/${a}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:t})})}getRentals(){return this.request("/housing/rentals")}rentRoom(a,t){return this.request(`/player/${a}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:t})})}getMyGuild(a){return this.request(`/player/${a}/guild`)}createGuild(a,t,c,o){return this.request(`/player/${a}/guild/create`,{method:"POST",body:JSON.stringify({name:t,tag:c,description:o})})}contributeGuild(a,t){return this.request(`/player/${a}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:t})})}upgradeGuild(a){return this.request(`/player/${a}/guild/upgrade`,{method:"POST"})}joinGuild(a,t){return this.request(`/player/${a}/guild/join`,{method:"POST",body:JSON.stringify({guildId:t})})}leaveGuild(a){return this.request(`/player/${a}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(a){return this.request(`/guild/${a}/upkeep`,{method:"POST"})}getTribulation(a){return this.request(`/player/${a}/tribulation`)}fightTribulation(a){return this.request(`/player/${a}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(a,t,c,o=-1){return this.request(`/player/${a}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:c,lockAffixIndex:o})})}getShops(a){return this.request("/shops")}buyFromShop(a,t,c,o=1){return this.request(`/player/${a}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:t,itemId:c,quantity:o})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(a){return this.request(`/players/lookup?q=${encodeURIComponent(a)}`)}getPlayerProfile(a){return this.request(`/player/${a}/profile`)}getArena(a){return this.request(`/player/${a}/arena`)}arenaFight(a){return this.request(`/player/${a}/arena/fight`,{method:"POST"})}getAuctions(a=""){return this.request(`/auction${a?"?q="+encodeURIComponent(a):""}`)}getMyAuctions(a){return this.request(`/player/${a}/auction/mine`)}listAuction(a,t,c,o=24){return this.request(`/player/${a}/auction/list`,{method:"POST",body:JSON.stringify({itemId:t,buyoutPrice:c,durationHours:o})})}buyAuction(a,t){return this.request(`/player/${a}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:t})})}cancelAuction(a,t){return this.request(`/player/${a}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:t})})}getDailyQuests(a){return this.request(`/player/${a}/daily-quests`)}claimDailyQuest(a,t){return this.request(`/player/${a}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:t})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(a){return this.request(`/player/${a}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(a){return this.request(`/player/${a}/gacha/pity`)}gachaPull(a,t,c=1){return this.request(`/player/${a}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:t,pulls:c})})}getLeaderboard(a){return this.request(`/leaderboard/${a}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(a){return this.request(`/events/quick/${a}`,{method:"POST"})}}const H=new ot;function ct(r,a){var g;const{state:t,api:c,notify:o,renderGame:k,updateSidebar:v}=a,l=t.player,b=t.exploration?t.exploration[l.currentArea||"thanh_lam_tran"]:null,f=b?b.name:"Vùng Đất Vô Danh",h=b?b.staminaCost:10;r.innerHTML=`
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
    </div>`;const T=((g=l.insightLevels)==null?void 0:g.monster)??0;(async()=>{try{const n=await c.getAreaMonsters(l.id);if(n.monsters){t.player.trackedMonsters=n.monsters;const e=document.getElementById("trackedMonstersList");if(!e)return;if(n.monsters.length===0){e.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}e.innerHTML=n.monsters.map(d=>{var M,P,I,N,R;const i=d.currentHp/d.stats.hp*100,y=i>60?"var(--green)":i>30?"var(--orange)":"var(--red)";let x='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';T>=1&&(x=`<div class="item-desc text-sm text-dim mb-sm">${d.description||"Yêu thú vùng này."}</div>`);let $="";T>=1&&($=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${i}%; background: ${y}; height: 100%;"></div>
            </div>`);let w=T>=2?`❤ ${d.currentHp}/${d.stats.hp}`:T>=1?"❤ ???":"",L="";T>=3&&(L=`
              <span class="text-orange">💪 ${d.stats.strength}</span>
              <span class="text-cyan">🏃 ${d.stats.speed}</span>
              <span class="text-green">🎯 ${d.stats.dexterity}</span>
              <span class="text-blue">🛡 ${d.stats.defense}</span>`);let S="";T>=4&&d.drops&&d.drops.length>0&&(S=`<div class="text-xs text-dim mt-sm" style="display:flex;gap:4px;flex-wrap:wrap;">
              📦 ${d.drops.map(_=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:9px;padding:1px 4px;">${_.id} (${T>=5?_.chance+"%":"?%"})</span>`).join("")}
            </div>`);let C="";if(T>=5){const _=((M=d.goldReward)==null?void 0:M[0])??((P=d.goldReward)==null?void 0:P.min)??"?",B=((I=d.goldReward)==null?void 0:I[1])??((N=d.goldReward)==null?void 0:N.max)??"?";C=`<span class="text-gold">💰 ${_}-${B}</span> <span class="text-purple">✨ ${d.xpReward??"?"} XP</span>`}return`
            <div class="list-item flex flex-col items-start gap-4">
              <div class="item-info" style="width: 100%;">
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-name text-lg">${d.name} <span class="text-xs text-dim">(${((R=d.instance_id)==null?void 0:R.substring(0,8))??""})</span></div>
                  <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${d.instance_id}" data-mid="${d.id}">Giao Chiến</button>
                </div>
                ${x}
                ${$}
                <div class="item-meta flex gap-4 text-xs flex-wrap">
                  ${w?`<span class="text-red">${w}</span>`:""}
                  ${L}
                  ${C}
                </div>
                ${S}
              </div>
            </div>`}).join(""),e.querySelectorAll(".btn-attack-tracked").forEach(d=>{d.addEventListener("click",i=>{const y=i.currentTarget;W(a,y.dataset.mid,y.dataset.inst)})})}}catch(n){console.error("Lỗi tải dấu vết:",n)}})(),(async()=>{const n=document.getElementById("areaMonstersList");if(n)try{const e=await c.getAreaMonsters(l.id),s=t.exploration?t.exploration[l.currentArea||"thanh_lam_tran"]:null,d=(t.monsters||[]).filter(y=>!y.isWorldBoss&&!y.is_world_boss),i=d.length>0?d:[];if(i.length===0){n.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không rõ quần thể yêu thú nơi đây.</div>';return}n.innerHTML=i.map(y=>{let x='<div class="item-desc text-sm text-dim mb-sm">Thông tin mờ ảo...</div>';return T>=1&&(x=`<div class="item-desc text-sm text-dim mb-sm">${y.description||"Yêu thú sinh sống tại vùng này."}</div>`),`
          <div class="list-item flex flex-col items-start gap-4" style="opacity: 0.8;">
            <div class="item-info" style="width: 100%;">
              <div class="item-name text-md text-gold">${y.name} <span class="text-xs text-dim ml-sm">${y.tierName||""}</span></div>
              ${x}
            </div>
          </div>
        `}).join("")}catch(e){console.error("Lỗi tải quần thể:",e)}})();const m=document.getElementById("btnExplore");m&&m.addEventListener("click",()=>pt(a)),r.querySelectorAll(".list-item.clickable").forEach(n=>{n.addEventListener("click",()=>startCombat(n.dataset.mid,a))})}async function pt(r){var v,l,b;const{state:a,api:t,notify:c,updateSidebar:o}=r,k=document.getElementById("exploreResult");if(k){k.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const f=await t.explore(a.playerId);a.player=f.player,o();const h=f.event;let T=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(h.type==="monster")T+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${h.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${h.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${h.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(h.type==="monster_ambush"&&h.combatResult){const p=h.combatResult,u=(p.log||[]).map(n=>n.startsWith("---")?`<div class="turn">${n}</div>`:n.includes("hụt")?`<div class="miss">${n}</div>`:n.includes("CHÍNH MẠNG")||n.includes("💥")?`<div class="crit">${n}</div>`:n.includes("ngã xuống")||n.includes("💀")?`<div class="death">${n}</div>`:n.includes("Chiến thắng")||n.includes("🏆")?`<div class="victory">${n}</div>`:`<div class="hit">${n}</div>`).join(""),m=p.outcome==="win"?"🏆 Chiến thắng!":p.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",g=p.outcome==="win"?"var(--green)":p.outcome==="loss"?"var(--red)":"var(--orange)";T+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${h.message}</div>
        <div style="font-size:16px;font-weight:700;color:${g};margin-bottom:12px">${m}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${u}</div>
      `}else if(h.type==="worldBoss")T+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${h.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ mạnh!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${h.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${h.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(h.type==="npc"&&h.npcId){if(T+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${h.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${h.message}</div>
        <div class="text-sm text-dim mb-md" style="font-style:italic;">"${h.greeting}"</div>
      `,h.studyEffect){const p=h.studyEffect,u=p.isDebuff?"var(--red)":"var(--gold)";T+=`<div class="text-sm mt-sm" style="color:${u};animation:fadeIn 0.5s;">
          ${p.message}
        </div>`}h.hasQuests&&(T+=`<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${h.npcId}">💬 Nói Chuyện</button>`),T+='<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>',T+="</div></div>",T+='<div id="npcQuestModal"></div>'}else h.type==="player_encounter"&&h.player?T+=`
        <div style="font-size: 48px; margin-bottom: 8px;">👤</div>
        <div class="text-lg text-gold bold mb-sm">${h.message}</div>
        <div class="text-sm text-dim mb-md">Âm thầm lướt qua hay chủ động giao hảo?</div>
        <div class="flex gap-2 justify-center mt-md w-full" style="flex-wrap:wrap">
          <button class="btn btn--blue flex-1" id="btnInteractFriend" data-pid="${h.player.id}">🤝 Kết Giao</button>
          <button class="btn btn--gold flex-1" id="btnInteractGift" data-pid="${h.player.id}">💎 Tặng 100 LT</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${h.player.id}">⚔️ Cướp Linh Thạch</button>
        </div>
      `:h.type==="npc"?T+=`
        <div style="font-size: 32px; margin-bottom: 8px;">👴</div>
        <div class="text-lg text-gold bold mb-sm">${h.message}</div>
      `:h.type==="material"||h.type==="item"?(T+=`
        <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
        <div class="text-lg text-green bold mb-sm">${h.message}</div>
      `,h.questNotifications&&h.questNotifications.length>0&&h.questNotifications.forEach(p=>{T+=`<div class="text-sm text-gold mt-sm" style="animation: fadeIn 0.5s;">🏷️ ${p.message}</div>`})):T+=`
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${h.message}</div>
      `;h.type!=="monster"&&h.type!=="worldBoss"&&!(h.type==="npc"&&h.npcId)&&(T+='<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục hành trình</button>'),h.type==="npc"&&h.npcId||(T+="</div></div>"),k.innerHTML=T,h.type==="player_encounter"&&h.player&&(document.getElementById("btnInteractFriend").addEventListener("click",async p=>{try{const u=await t.addFriend(a.playerId,p.target.dataset.pid);(u.success||u.message)&&c(u.message||"Đã gửi lời mời!","success")}catch(u){c(u.message,"error")}}),document.getElementById("btnInteractGift").addEventListener("click",async p=>{var u;try{const m=await t.interactPlayer(a.playerId,p.target.dataset.pid,"gift",100);if(m.player){a.player=m.player,o(),c(m.message,"success");const g=p.target.closest(".panel-body");g&&(g.innerHTML='<div class="text-green text-lg mb-md">Đã bồi đắp hảo cảm!</div><button class="btn btn--blue" id="btnExploreContinueAfterGift">Rời đi</button>'),(u=document.getElementById("btnExploreContinueAfterGift"))==null||u.addEventListener("click",()=>{k.innerHTML=""})}}catch(m){c(m.message,"error")}}),(v=document.getElementById("btnInteractMug"))==null||v.addEventListener("click",async p=>{var m;const u=p.target.dataset.pid;p.target.disabled=!0,p.target.textContent="⏳ Đang tấn công...";try{const g=await t.request(`/player/${a.playerId}/mug`,{method:"POST",body:JSON.stringify({victimId:u})});a.player=g.player,o();const n=p.target.closest(".panel-body");if(n){const e=g.success?"var(--green)":"var(--red)",s=g.success?"💰":"💀";n.innerHTML=`
              <div style="font-size:36px;margin-bottom:8px">${s}</div>
              <div style="color:${e};font-size:16px;font-weight:700;margin-bottom:8px">${g.message}</div>
              ${g.goldStolen>0?`<div class="text-gold">+${g.goldStolen} 💎 Linh Thạch</div>`:""}
              <div style="font-size:11px;opacity:0.5;margin-top:8px">Tỉ lệ: ${g.successChance}%</div>
              <button class="btn btn--blue mt-md" id="btnExploreContinueAfterMug">Tiếp tục</button>
            `,(m=document.getElementById("btnExploreContinueAfterMug"))==null||m.addEventListener("click",()=>{k.innerHTML=""})}c(g.message,g.success?"success":"error")}catch(g){c(g.message,"error"),p.target.disabled=!1,p.target.textContent="⚔️ Cướp Linh Thạch"}})),(h.type==="monster"||h.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",p=>{k.innerHTML="",W(r,p.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async p=>{try{const u=await t.trackMonster(a.playerId,p.target.dataset.mid);u.success?(c(u.message,"success"),k.innerHTML="",typeof r.renderGame=="function"&&r.renderGame()):u.error&&c(u.error,"error")}catch(u){c("Lỗi theo dõi: "+u.message,"error")}})),h.type==="npc"&&h.npcId&&((l=document.getElementById("btnNpcInteract"))==null||l.addEventListener("click",async()=>{await gt(r,h.npcId,k)})),(b=document.getElementById("btnExploreContinue"))==null||b.addEventListener("click",()=>{k.innerHTML=""})}catch(f){k.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${f.message}</div></div>`}}}async function gt(r,a,t){const{state:c,api:o,notify:k,renderGame:v}=r,l=document.getElementById("npcQuestModal")||t;try{const f=(await o.getNpc(a)).npc;if(!f)return;const h=(c.player.activeQuests||[]).map(p=>p.quest_id);let T=f.quests.map(p=>{const u=h.includes(p.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${p.name}</span>
            <span class="text-xs badge" style="background:${p.type==="kill"?"var(--red)":"var(--green)"}">${p.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${p.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${p.rewards.gold?p.rewards.gold+"💎 ":""}${p.rewards.xp?p.rewards.xp+"✨ ":""}${p.rewards.skillChance?"🎯 "+p.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${u?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${a}" data-qid="${p.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");l.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${f.icon||"🧓"} ${f.name} <span class="subtitle">${f.profession}</span></div>
        <div class="panel-body">
          ${T||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,l.querySelectorAll(".btn-accept-quest").forEach(p=>{p.addEventListener("click",async()=>{p.disabled=!0,p.textContent="⏳...";try{const u=await o.acceptQuest(c.playerId,p.dataset.npc,p.dataset.qid);c.player=u.player,k(u.message,"success"),v()}catch(u){k(u.message||"Lỗi nhận quest","error"),p.disabled=!1,p.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(b){console.error("NPC load error:",b)}}async function W(r,a,t=null){var f;const{state:c,api:o,notify:k,updateSidebar:v,renderGame:l}=r,b=document.getElementById("combatResult");if(b){if(!c.player.currentHp||c.player.currentHp<=0)return k("Đã kiệt sức! Hãy hồi phục trước.","error");if((c.player.currentEnergy||0)<10&&!c.player.currentEnergy)return k("Không đủ Linh lực!","error");if(c.player.hospitalRemaining>0)return k(`Đang tịnh dưỡng! Còn ${c.player.hospitalRemaining}s`,"error");b.innerHTML='<div class="panel border-red bg-dark"><div class="panel-body text-center text-red">⚔️ Đang giao chiến...</div></div>',b.scrollIntoView({behavior:"smooth"});try{const h=await o.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:c.playerId,monsterId:t?null:a,trackedMonsterId:t})});if(c.player=h.player,h.outcome==="no_energy"){b.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${h.log[0]}</div></div>`,v();return}const T=h.log.map(d=>d.startsWith("---")?`<div class="turn">${d}</div>`:d.includes("linh lực")&&d.includes("+")?`<div class="energy">${d}</div>`:d.includes("linh lực")?`<div class="energy-cost">${d}</div>`:d.includes("kiệt linh")?`<div class="miss">${d}</div>`:d.includes("hụt")?`<div class="miss">${d}</div>`:d.includes("né được")?`<div class="dodge">${d}</div>`:d.includes("CHÍNH MẠNG")||d.includes("💥")?`<div class="crit">${d}</div>`:d.includes("🔥")?`<div class="heavy text-orange">${d}</div>`:d.includes("chặn hoàn toàn")||d.includes("🛡")?`<div class="dodge">${d}</div>`:d.includes("ngã xuống")||d.includes("💀")?`<div class="death">${d}</div>`:d.includes("Chiến thắng")||d.includes("🏆")?`<div class="victory">${d}</div>`:d.includes("Đột phá")||d.includes("🎉")?`<div class="levelup">${d}</div>`:d.includes("bỏ chạy")||d.includes("🏃")?`<div class="flee">${d}</div>`:d.includes("Hết")||d.includes("⏰")?`<div class="stalemate">${d}</div>`:d.includes("Bất phân")||d.includes("🤝")?`<div class="stalemate">${d}</div>`:d.includes("Thoát thân")||d.includes("🚪")?`<div class="flee">${d}</div>`:d.includes("Linh Thạch")||d.includes("💰")?`<div class="gold-reward">${d}</div>`:d.includes("Tịnh dưỡng")||d.includes("🏥")?`<div class="hospital">${d}</div>`:d.includes("🧪")?`<div class="status-effect text-purple">${d}</div>`:d.includes("💔")?`<div class="dot-damage text-purple bold">${d}</div>`:d.includes("✨")?`<div class="regen text-green">${d}</div>`:d.includes("♻️")?`<div class="reflect text-red">${d}</div>`:`<div class="hit">${d}</div>`).join(""),p=h.monster,u=Math.max(0,c.player.currentHp/c.player.maxHp*100),m=Math.max(0,p.currentHp/p.maxHp*100),g={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Thất bại",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},n=g[h.outcome]||g.loss,e=(f=h.rewards)!=null&&f.gold?` · +${h.rewards.gold} 💰`:"",s=h.rewards?` · +${h.rewards.xp} XP${e}`:"";b.innerHTML=`
      <div class="panel">
        <div class="panel-title">${n.icon} ${n.text}
          <span class="subtitle">${h.turns}/${h.maxTurns||25} lượt${s}</span>
        </div>
        <div class="panel-body combat-result ${n.cls}">
          <div class="combat-opponents">
            <div class="fighter">
              <div class="f-name player-name">${c.player.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${u}%"></div></div>
              <div class="mini-hp-val">${c.player.currentHp}/${c.player.maxHp}</div>
            </div>
            <div class="vs">VS</div>
            <div class="fighter">
              <div class="f-name monster-name">${p.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${m}%"></div></div>
              <div class="mini-hp-val">${p.currentHp}/${p.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${T}</div>
      </div>`,v(),t&&typeof l=="function"&&setTimeout(()=>l(),1500)}catch(h){b.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${h.message}</div></div>`}}}function X(r,a){const{state:t,api:c,notify:o}=a,k=t.player,v=(k.skills||[]).find(T=>(typeof T=="string"?T:T.id)==="nhan_thuat"),l=v?v.level||1:0,b=[...t.skills].sort((T,p)=>(T.tier||1)-(p.tier||1)),f=(k.skills||[]).map(T=>typeof T=="string"?T:T.id),h={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};r.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${l}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${b.map(T=>{const p=f.includes(T.id),u=T.tier||1,m=u>l+1,g=u<=l;let n="";return T.requirements&&T.requirements.length>0?g||p?n=`<div class="mt-sm text-xs text-orange">Điều kiện: ${T.requirements.map(e=>`<br>• ${e}`).join("")}</div>`:m?n=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${u}.</div>`:n='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':n='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${p?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${T.name} ${p?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${p?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${h[u]||u}</span>
                    <span class="text-xs text-dim">${T.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||p?T.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${T.type!=="passive"&&T.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${T.cost} linh lực</div>`:""}
                
                ${n}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${p?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${m?"btn--dark":"btn--gold"} btn--sm btn-learn" ${m?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${T.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,r.querySelectorAll(".accordion-header").forEach(T=>{T.addEventListener("click",()=>{const p=T.nextElementSibling;p.style.display==="none"?(p.style.display="block",T.querySelector("div:last-child").textContent="▲"):(p.style.display="none",T.querySelector("div:last-child").textContent="▼")})}),r.querySelectorAll(".btn-learn").forEach(T=>{T.addEventListener("click",async p=>{p.stopPropagation();try{const u=await c.learnSkill(k.id,T.dataset.sid);u.error?o(u.error,"error"):(t.player=u.player,o(u.message,"success"),X(r,a))}catch(u){o("Lỗi học kỹ năng: "+u.message,"error")}})})}function ut(r,a){var u,m,g;const{state:t,api:c,notify:o,renderGame:k}=a,v=t.player,l=v.stats,b=v.allocatedStats||{},f=5,h=v.currentEnergy>=f&&!v.hospitalRemaining,T=v.talentDisplay||{},p=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];r.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${v.currentEnergy}/${v.maxEnergy} linh lực · Chi phí: ${f}/lần</span>
      </div>
    </div>

    ${v.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${v.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${((u=v.realmInfo)==null?void 0:u.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(m=v.realmInfo)!=null&&m.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${p.map(([n,e,s])=>{const d=T[n]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${d.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${e}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${s}</div>
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
        ${p.map(([n,e,s,d])=>{const i=T[n]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},y=Math.floor(v.currentEnergy/f)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${e}</span> ${s}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${d}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${l[n]??0}</span>
              ${b[n]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${b[n]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${i.color};min-width:50px" title="Căn Cốt: ${i.name} (×${i.value})">${i.icon}×${i.value}</span>
              <input type="number" class="train-count" data-stat="${n}" min="1" max="${y}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${h?"":"disabled"}>
              <button class="btn btn--sm ${h?"btn--blue":"btn--dark"} train-btn" data-train="${n}" ${h?"":"disabled"} title="Tốn ${f} Linh lực/lần · Căn cốt ×${i.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${f} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(v.currentEnergy/f)}</strong> lần hiện tại.
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
    </div>`,(g=r.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",async()=>{try{const n=r.querySelector(".btn-breakthrough");n.disabled=!0,n.innerHTML="Đang Độ Kiếp...";const e=await c.attemptBreakthrough(t.playerId);t.player=e.player,o(e.message,"success"),k()}catch(n){o(n.message||"Đột phá thất bại","error");const e=r.querySelector(".btn-breakthrough");e&&(e.disabled=!1,e.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),r.querySelectorAll(".train-btn").forEach(n=>{n.addEventListener("click",async e=>{e.stopPropagation();const s=r.querySelector(`.train-count[data-stat="${n.dataset.train}"]`),d=parseInt(s==null?void 0:s.value)||1;try{const i=await c.trainStat(t.playerId,n.dataset.train,d);t.player=i.player,o(i.message,"success"),k()}catch(i){o(i.message||"Lỗi rèn luyện","error")}})})}function Y(r,a){var s;const{state:t,api:c,notify:o,renderGame:k}=a,v=t.player,l=t.educationTrees||[],b=v.unlockedNodes||[],f=v.studyingNode||"",h=f?f.split("|")[0]:"",T=v.studyEndsAt||0,p=Math.max(0,T-Math.floor(Date.now()/1e3)),u=v.treeProgress||{},m=v.skillProgress||{};let g=localStorage.getItem("eduActiveTree")||((s=l[0])==null?void 0:s.id),n=l.find(d=>d.id===g)||l[0];!n&&l.length>0&&(n=l[0]);const e=()=>{if(!n){r.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const d=l.map(C=>`
      <button class="edu-tab ${C.id===n.id?"active":""}" data-tab="${C.id}">
        <span class="edu-tab-icon">${C.icon}</span>
        <span class="edu-tab-name">${C.name}</span>
        <span class="edu-tab-badge">${u[C.id]||0}</span>
      </button>
    `).join("");let i="";if(h){let C=null,M=null;l.forEach(P=>{const I=P.nodes.find(N=>N.id===h);I&&(C=I,M=P)}),C&&(i=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${M.name}</div>
              <div class="text-gold text-lg bold">${C.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${p}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${p>0?"disabled":""}>
                ${p>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const y=u[n.id]||0;let x=null;for(const C of n.milestones||[])if(y<C.require){x=C;break}let $="";x?$=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${x.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${x.description}</div>
        </div>
      `:$='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const w=v.discoveredNodes||[],L=(n.nodes||[]).map(C=>{const M=b.includes(C.id),P=h===C.id,I=(C.prerequisites||[]).every(A=>b.includes(A)),N=n.nodes.some(A=>(A.prerequisites||[]).includes(C.id));if(!(w.includes(C.id)||M||!(C.prerequisites&&C.prerequisites.length>0))||M&&N)return"";let _="";P?_="studying":M?_="done":_="available";let B="";P?B='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':h?B='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':M?B=`<button class="btn btn--sm btn--gold btn-learn" data-node="${C.id}">Tiếp Tục Lãnh Ngộ (${C.duration}s)</button>`:I?B=`<button class="btn btn--sm btn--blue btn-learn" data-node="${C.id}">Bắt Đầu (${C.duration}s)</button>`:B='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const j=m[C.id]||{level:1,exp:0},dt=j.level*100;let Q="";return M&&(Q=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${j.level} | Độ hiểu thấu: ${j.exp}/${dt}</div>`),`
        <div class="edu-node ${_}">
          <div class="edu-node-info">
            <div class="edu-node-title">${C.name}</div>
            <div class="edu-node-desc">${C.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${C.bonusDescription}</div>
            ${Q}
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
          ${i}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${n.icon} ${n.name}</h2>
              <p class="text-dim mb-md">${n.description}</p>
              
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
    `,r.querySelectorAll(".edu-tab").forEach(C=>{C.addEventListener("click",()=>{const M=C.dataset.tab;localStorage.setItem("eduActiveTree",M),g=M,n=l.find(P=>P.id===M)||l[0],e()})}),window.eduTimer&&clearInterval(window.eduTimer),h&&T>0&&(window.eduTimer=setInterval(()=>{const C=Math.floor(Date.now()/1e3);let M=Math.max(0,T-C);const P=document.getElementById("eduCounter");if(P&&(P.innerText=M+"s"),M<=0){clearInterval(window.eduTimer);const I=document.getElementById("btnCheckEdu");I&&(I.disabled=!1,I.innerHTML="✨ Đột Phá!")}},1e3));const S=r.querySelector("#btnCheckEdu");S&&S.addEventListener("click",async()=>{try{S.disabled=!0,S.innerHTML="Đang xử lý...";const C=await c.checkEducation(t.playerId);t.player=C.player,o(C.message,C.completed?"success":"info"),k()}catch(C){o(C.message||"Lỗi đột phá","error"),S.disabled=!1,S.innerHTML="Thử lại"}}),r.querySelectorAll(".btn-learn").forEach(C=>{C.addEventListener("click",async()=>{try{const M=C.dataset.node;C.disabled=!0,C.innerHTML="Chờ...";const P=await c.enrollNode(t.playerId,M,n.id);t.player=P.player,o(P.message,"success"),k()}catch(M){o(M.message||"Lỗi ghi danh","error"),C.disabled=!1,C.innerHTML="Bắt Đầu"}})})};e()}function vt(r,a){const{state:t,api:c,notify:o,renderGame:k}=a,v=t.player.skills||[],l=v.map(p=>typeof p=="string"?p:p.id),b=t.skills||[],f={combat:{icon:"⚔️",name:"Chiến Đấu",desc:"Chiêu thức sử dụng trong giao đấu"},life:{icon:"🛠️",name:"Sinh Hoạt",desc:"Thu thập, chế tạo, sinh tồn"},internal:{icon:"🧘",name:"Nội Công",desc:"Thụ động tăng cường bản thân"},gongfa:{icon:"📖",name:"Công Pháp",desc:"Tu luyện công pháp, nâng cao cảnh giới"}};let h=localStorage.getItem("skillsTab")||"combat";const T=()=>{if(h==="gongfa"){const e=Object.entries(f).map(([d,i])=>{const y=d==="gongfa"?(t.educationTrees||[]).length:v.filter(x=>{const $=typeof x=="string"?x:x.id,w=b.find(L=>L.id===$);return w&&(w.category||"combat")===d}).length;return`<button class="skill-tab ${d===h?"active":""}" data-tab="${d}">
          ${i.icon} ${i.name} <span class="skill-tab-count">${y}</span>
        </button>`}).join("");r.innerHTML=`
        <div class="page-header">
          <h1>⚡ Kỹ Năng & Công Pháp</h1>
          <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
        </div>
        <div class="skill-tabs">${e}</div>
        <div id="gongfa-content"></div>
      `,r.querySelectorAll(".skill-tab").forEach(d=>{d.addEventListener("click",()=>{h=d.dataset.tab,localStorage.setItem("skillsTab",h),T()})});const s=r.querySelector("#gongfa-content");s&&Y(s,a);return}const p=v.map(e=>{const s=typeof e=="string"?e:e.id;return{...b.find(i=>i.id===s)||{name:s,id:s,category:"combat"},level:e.level||1,xp:e.xp||e.currentXp||0,equipped:e.equipped||e.isEquipped||!1}}),u=p.filter(e=>(e.category||"combat")===h),m=b.filter(e=>(e.category||"combat")===h&&!l.includes(e.id)),g=Object.entries(f).map(([e,s])=>{const d=e==="gongfa"?(t.educationTrees||[]).length:p.filter(i=>(i.category||"combat")===e).length;return`<button class="skill-tab ${e===h?"active":""}" data-tab="${e}">
        ${s.icon} ${s.name} <span class="skill-tab-count">${d}</span>
      </button>`}).join(""),n=(e,s)=>{const d=e.level*100,i=Math.min(100,e.xp/d*100),y=e.type==="passive",x="★".repeat(Math.min(e.tier||1,7)),$=(e.tier||1)>=5?"var(--gold)":(e.tier||1)>=3?"var(--purple)":"var(--blue)";let w="";return s?y?w='<span style="font-size:10px;color:var(--green)">🔮 Vĩnh Viễn</span>':e.equipped?w=`<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${e.id}">Tháo</button>`:w=`<button class="btn btn--sm btn--blue equip-btn" data-eq="1" data-sid="${e.id}">Trang Bị</button>`:w='<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>',`
        <div class="skill-card ${s?"":"locked"} ${e.equipped&&!y?"equipped":""}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name">${e.name}</div>
              <div class="skill-card-tier" style="color:${$}">${x} Tầng ${e.tier||1}</div>
            </div>
            <div class="skill-card-action">${w}</div>
          </div>
          <div class="skill-card-desc">${e.description||""}</div>
          ${s?`
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${e.level}</span>
                <span class="text-dim">${e.xp}/${d}</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${i}%"></div></div>
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
          ${f[h].icon} ${f[h].name}
          <span class="subtitle">${f[h].desc}</span>
        </div>
        <div class="panel-body">
          ${u.length===0&&m.length===0?'<div class="text-dim">Chưa có kỹ năng nào trong nhánh này.</div>':""}
          
          ${u.length>0?`
            <div class="skill-grid">
              ${u.map(e=>n(e,!0)).join("")}
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
    `,r.querySelectorAll(".skill-tab").forEach(e=>{e.addEventListener("click",()=>{h=e.dataset.tab,localStorage.setItem("skillsTab",h),T()})}),r.querySelectorAll(".equip-btn").forEach(e=>{e.addEventListener("click",async()=>{try{const s=e.dataset.sid,d=e.dataset.eq==="1",i=await c.equipSkill(t.playerId,s,d);t.player=i.player,o(i.message,"success"),T()}catch(s){o(s.message||"Lỗi trang bị","error")}})})};T()}function mt(r,a){return a==="manual"?"📜":r==="weapon"?"⚔️":r==="body"?"🥋":r==="shield"?"🛡️":r==="feet"?"👢":r==="ring"?"💍":"📦"}function U(r,a){let t="",c="";if(r.slot==="weapon"){let b=0,f=0;(r.affixes||[]).forEach(h=>{h.stat==="strength"&&h.type==="flat"&&(b+=h.value),h.stat==="dexterity"&&h.type==="flat"&&(f+=h.value)}),b===0&&(b=r.itemLevel*2+5),f===0&&(f=r.itemLevel+10),t=`⚔️ ${b}`,c=`🎯 ${f}`}else if(r.slot==="body"||r.slot==="shield"||r.slot==="feet"){let b=0;(r.affixes||[]).forEach(f=>{f.stat==="defense"&&f.type==="flat"&&(b+=f.value)}),b===0&&(b=r.itemLevel*3),t=`🛡️ ${b}`}else if(r.slot==="ring"){let b=0;(r.affixes||[]).forEach(f=>{f.stat==="capacity"&&(b+=f.value)}),t=b>0?`🎒 +${b}`:""}const o=(r.affixes||[]).map(b=>ht(b)).map(b=>`<span class="badge badge-dim">${b}</span>`).join(" "),k=r.description||`Một vật phẩm loại ${r.slot} cấp ${r.itemLevel} thuộc phẩm chất ${r.rarity}. Khí tức tỏa ra không tồi.`,v=r.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${r.craftedBy}</strong></div>`:"",l=a?r.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${r.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${r.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${r.rarity}"></span>
          <span class="item-name rarity-${r.rarity}" style="font-size:14px">${r.name}</span>
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${t?`<span style="color:var(--text-light)">${t}</span>`:""}
          ${c?`<span style="color:var(--text-light)">${c}</span>`:""}
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
            ${o||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${v}
          <div class="mt-2 flex justify-end">
            ${l}
          </div>
        </div>
      </div>
    </div>`}function ht(r){const t={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[r.stat]||r.stat,c=r.value>=0?"+":"";return r.type==="flat"?`${c}${r.value} ${t}`:r.type==="increase"?`${c}${r.value}% ${t}`:r.type==="more"?`×${c}${r.value}% ${t}`:`${c}${r.value} ${t}`}function K(r,a){var e,s,d,i,y,x,$;const{state:t,api:c,notify:o,renderGame:k}=a,v=Object.values(t.player.equipment||{}),l=t.player,b=t.medicines||[],f=l.medCooldownRemaining||0,h=t.inventoryTab||"equipped",T=l.skills&&l.skills.some(w=>{const L=typeof w=="string"?w:w.id;return L==="duoc_ly"||L==="y_thuat"}),p=v.find(w=>w.slot==="ring1"),u=v.find(w=>w.slot==="ring2");let m=20;((p==null?void 0:p.id)==="tui_tru_vat"||(e=p==null?void 0:p.baseType)!=null&&e.includes("tru_vat"))&&(m+=((d=(s=p.affixes)==null?void 0:s[0])==null?void 0:d.value)||10),((u==null?void 0:u.id)==="tui_tru_vat"||(i=u==null?void 0:u.baseType)!=null&&i.includes("tru_vat"))&&(m+=((x=(y=u.affixes)==null?void 0:y[0])==null?void 0:x.value)||10),r.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(l.inventory||[]).length} / ${m})</span></h1>
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
          Đan Dược ${f>0?`<span style="color:var(--orange); font-size:11px">(${f}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),n=()=>{g.querySelectorAll("[data-eid]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const S=await c.equipItem(t.playerId,w.dataset.eid);t.player=S.player,o(S.message,"success"),k()}catch(S){o(S.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const S=await c.useItem(t.playerId,w.dataset.use);t.player=S.player,o(S.message,"success"),k()}catch(S){o(S.message||"Lỗi sử dụng","error")}})})};if(h==="equipped"){const w=l.equipment||{},L=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${L.map(S=>{const C=w[S.key],M=C&&C.id,P=M?`rarity-${C.rarity}`:"";return`
            <div style="background:${M?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${M?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${S.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${S.name}</div>
              ${M?`<div style="font-size:11px;font-weight:600" class="${P}">${C.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${C.rarity}] Lv${C.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${v.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${v.filter(S=>S&&S.id).map(S=>U(S,!1)).join("")}
      `:""}
    `,n()}else if(h==="medicine")g.innerHTML=`
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
                  ${w.toxicity&&T?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${w.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${w.penalty&&T?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${w.penalty.map(L=>`Giảm ${Math.abs(L.value)*100}% ${L.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${w.id}" 
                ${f+(w.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(w=>{w.addEventListener("click",async()=>{try{const L=await c.useMedicine(t.playerId,w.dataset.med);t.player=L.player,o(L.message,"success"),k()}catch(L){o(L.message||"Đan độc quá nồng!","error")}})});else{const w=l.inventory||[];let L=[];h==="weapon"?L=w.filter(S=>S.slot==="weapon"&&S.category!=="manual"):h==="armor"?L=w.filter(S=>["body","shield","feet"].includes(S.slot)):h==="accessory"?L=w.filter(S=>["ring","amulet","ring1","ring2"].includes(S.slot)):h==="manual"&&(L=w.filter(S=>S.category==="manual")),g.innerHTML=`
      ${L.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':L.map(S=>U(S,!0)).join("")}
    `,n()}r.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{t.inventoryTab=w.dataset.tab,K(r,a)})}),($=document.getElementById("btnGen"))==null||$.addEventListener("click",async()=>{const w=["common","rare","epic","legendary"];try{const L=await c.generateItem(t.playerId,w[Math.floor(Math.random()*w.length)]);t.player=L.player,t.items=L.items||[],o(L.message,"success"),K(r,a)}catch{o("Lỗi tạo ngẫu nhiên","error")}})}function yt(r,a){var d,i;const{state:t,api:c,notify:o,renderGame:k}=a,v=t.player,l=t.crimes||[];if((v.jailRemaining??0)>0){const y=v.jailRemaining,x=Math.max(10,100*Math.ceil(y/60)*v.level);r.innerHTML=`
      <div class="page-header"><h1>🏛 Thiên Lao</h1></div>
      <div class="panel">
        <div class="panel-title">Trạng thái</div>
        <div class="panel-body" style="text-align:center">
          <div style="font-size:28px;color:var(--red);font-weight:700">⛓ Bị giam giữ</div>
          <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${y}s</strong></div>
          <div style="margin-top:16px;display:flex;gap:12px;justify-content:center">
            <button class="btn btn--blue" id="btnEscape">🏃 Vượt ngục (3 Nghịch Khí)</button>
            <button class="btn btn--gold" id="btnBail">💰 Bảo lãnh (${x} Lính Thạch)</button>
          </div>
        </div>
      </div>`,(d=document.getElementById("btnEscape"))==null||d.addEventListener("click",async()=>{try{const $=await c.escapeJail(t.playerId);t.player=$.player,o($.message,$.success?"success":"error"),k()}catch($){o($.message||"Lỗi","error")}}),(i=document.getElementById("btnBail"))==null||i.addEventListener("click",async()=>{try{const $=await c.bail(t.playerId);t.player=$.player,o($.message,$.success?"success":"error"),k()}catch($){o($.message||"Lỗi","error")}});return}const f={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},h={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},T=l.reduce((y,x)=>{const $=x.category||"theft";return y[$]||(y[$]=[]),y[$].push(x),y},{}),p=Object.keys(f).map(y=>{const x=T[y];if(!x||x.length===0)return"";const $=f[y];return`
    <div class="panel mt-md" style="border-color: ${$.color}40;">
      <div class="panel-title" style="color: ${$.color};">${$.label} <span class="subtitle text-dim">${x.length} loại</span></div>
      <div class="panel-body no-pad">
        ${x.map(w=>{var I;const L=((I=v.crimeSkills)==null?void 0:I[w.id])??0,S=L<(w.minSkill??0),C=!S&&(v.nerve??0)>=w.nerveCost,M=w.special||[],P=Math.min(95,w.baseSuccessRate+L*.5);return`
            <div class="list-item crime-item ${S?"crime-locked":""}">
              <div class="item-info">
                <div class="item-name" style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:18px">${w.icon}</span>
                  <span>${w.name}</span>
                  ${S?'<span style="opacity:0.5">🔒</span>':""}
                </div>
                <div class="item-desc">${w.description}</div>
                <div class="item-meta" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  <span>⚡ ${w.nerveCost} Khí</span>
                  <span>💰 ${w.rewards.goldMin}-${w.rewards.goldMax}</span>
                  <span style="color:${P>=60?"var(--green)":P>=40?"var(--orange)":"var(--red)"}">🎯 ${Math.round(P)}%</span>
                  ${S?`<span style="color:var(--red)">Cần Skill ${w.minSkill}</span>`:`<span>📊 ${L}/100</span>`}
                </div>
                ${M.length>0?`
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${M.map(N=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${h[N]||N}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <button class="btn btn--sm ${C?"btn--red":""}" data-crime="${w.id}" ${C?"":"disabled"}>
                ${S?"🔒":"Thực hiện"}
              </button>
            </div>`}).join("")}
      </div>
    </div>`}).join(""),u=v.crimeExp||0,m=Math.floor(u/50),g=u%50,n=50,e=g/n*100,s=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${m}</strong>
          <span class="text-dim">${g} / ${n} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${e}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${n-g} EXP</strong> nữa để tăng giới hạn Nghịch Khí. (Giới hạn hiện tại: ${v.maxNerve||15})</div>
      </div>
    </div>
  `;r.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${v.nerve??0}/${v.maxNerve??15} Nghịch Khí · 💰 ${v.gold??0} Linh Thạch</span></div>
    </div>
    ${s}
    ${p}`,r.querySelectorAll("[data-crime]").forEach(y=>{y.addEventListener("click",async()=>{try{const x=await c.commitCrime(t.playerId,y.dataset.crime);t.player=x.player;const $=x.outcome==="success"?"success":x.outcome==="critical_fail"?"error":"info";o(x.message,$),k()}catch(x){o(x.message||"Lỗi","error")}})})}function Z(r,a){const{state:t,api:c,notify:o,updateSidebar:k,renderGame:v}=a,l=t.playerId;t._dungeon||(t._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const b=t._dungeon;async function f(){try{const[n,e]=await Promise.all([c.getMapItems(l),c.getDungeonHistory(l)]);b.mapItems=n.mapItems||[],b.activeRun=n.activeRun||null,b.history=e.history||[],b.loaded=!0,h()}catch(n){o(n.message||"Lỗi tải Bí Cảnh","error")}}function h(){r.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${b.activeRun?T():p()}

      ${b.lastResult?u():""}

      ${m()}
    `,g()}function T(){var d,i;const n=b.activeRun,e=n.currentWave===n.totalWaves,s=((n.currentWave-1)/n.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${n.dungeonName||n.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${s}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${n.currentWave}/${n.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((d=t.player)==null?void 0:d.hospitalRemaining)>0?"disabled":""}>
              ${e?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+n.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((i=t.player)==null?void 0:i.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
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
    `}function u(){var d,i;const n=b.lastResult,e=n.result==="dungeon_complete"?"🏆":n.result==="wave_cleared"?"✅":"💀",s=n.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${s}">
        <div class="panel-title" style="color:${s}">${e} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${n.message}</div>
          ${(d=n.loot)!=null&&d.length?`
            <div style="margin-bottom:8px">
              ${n.loot.map(y=>`<div style="font-size:12px;color:var(--green)">🎁 ${y}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((i=n.combatLog)==null?void 0:i.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(n.combatLog||[]).map(y=>`<div>${y}</div>`).join("")}
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
    `}function g(){var n,e;document.querySelectorAll("[data-enter]").forEach(s=>{s.addEventListener("click",async()=>{const d=s.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){s.disabled=!0;try{const i=await c.enterDungeon(l,d);o(i.message,"success"),t.player=i.player,k(),b.activeRun=i.run,b.lastResult=null,await f()}catch(i){o(i.message,"error"),s.disabled=!1}}})}),(n=document.getElementById("btnFight"))==null||n.addEventListener("click",async()=>{const s=document.getElementById("btnFight");s.disabled=!0,s.textContent="⏳ Đang chiến đấu...";try{const d=await c.fightDungeonWave(l);t.player=d.player,k(),b.lastResult=d,d.result==="dungeon_complete"||d.result==="dungeon_failed"?b.activeRun=null:d.result==="wave_cleared"&&(b.activeRun.currentWave=d.nextWave),h()}catch(d){o(d.message,"error"),s.disabled=!1,s.textContent="⚔️ Chiến Đấu"}}),(e=document.getElementById("btnAbandon"))==null||e.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await c.abandonDungeon(l),o("Đã rời khỏi Bí Cảnh.","info"),b.activeRun=null,b.lastResult=null,await f()}catch(s){o(s.message,"error")}})}b.loaded?h():f()}function tt(r,a){const{state:t}=a,c=t._travelTab||"map";r.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Ngao Du</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên và chinh phục bí cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${c==="map"?"active":""}" data-tab="map" style="flex:1;padding:10px;border:none;background:${c==="map"?"rgba(255,255,255,0.08)":"transparent"};color:${c==="map"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${c==="map"?"700":"400"};border-bottom:2px solid ${c==="map"?"var(--gold)":"transparent"};transition:all 0.2s">
        🗺️ Bản Đồ
      </button>
      <button class="tab-btn ${c==="dungeon"?"active":""}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${c==="dungeon"?"rgba(255,255,255,0.08)":"transparent"};color:${c==="dungeon"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${c==="dungeon"?"700":"400"};border-bottom:2px solid ${c==="dungeon"?"var(--gold)":"transparent"};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
    </div>
    <div id="travelTabContent"></div>
  `,r.querySelectorAll(".tab-btn").forEach(k=>{k.addEventListener("click",()=>{t._travelTab=k.dataset.tab,tt(r,a)})});const o=r.querySelector("#travelTabContent");c==="map"?O(o,a):Z(o,a)}async function O(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a;r.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ...</div>';try{const[v,l]=await Promise.all([c.request("/data/areas"),c.request(`/player/${t.playerId}/area`)]),b=v.areas||[],f=l.area,h=l.player,T=l.traveling||!1,p=l.travelRemaining||0,u=l.travelDestination||"";l.message&&o(l.message,"success"),l.player&&(t.player=l.player,k());const m=t.exploration||{},g=m[(h==null?void 0:h.currentArea)||"thanh_lam_tran"],n=(f==null?void 0:f.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",e=(g==null?void 0:g.staminaCost)||10,s={hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận"},d=s[h==null?void 0:h.currentArea]||"",i=[...b].sort((x,$)=>(x.sort_order||x.mapY||0)-($.sort_order||$.mapY||0)),y=[...b].sort((x,$)=>(x.mapY||0)-($.mapY||0));if(r.innerHTML=`
      ${T?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.1)">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:32px; margin-bottom:12px; animation:bounce 1s infinite">🚶</div>
            <strong style="font-size:16px">Đang tiến về ${u}</strong>
            <div id="travelTimer" style="font-size:24px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 10px rgba(255,215,0,0.3)">⏳ ${p}s</div>
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

          ${y.map(x=>{const $=m[x.id],w=x.id===h.currentArea&&!T,L=h.level<(x.min_level||1),S=($==null?void 0:$.mapX)||50,C=($==null?void 0:$.mapY)||50,M=w?"var(--green)":L?"var(--red)":"var(--blue)",P=w?`box-shadow: 0 0 15px ${M}; animation: pulse 2s infinite`:"",I=!w&&!L&&!T;return`
              <div class="map-node ${I?"clickable":""}" ${I?`data-travel="${x.id}"`:""} 
                   style="position:absolute; left:${S}%; top:${C}%; transform:translate(-50%, -50%); z-index:1; display:flex; flex-direction:column; align-items:center; width:max-content">
                <div class="node-label" style="font-size:10px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; margin-bottom:4px; color:${w?"var(--green)":"var(--text-light)"}; border:1px solid ${w?"var(--green)":"rgba(255,255,255,0.1)"}">
                  ${x.name} ${L?`[Lv.${x.min_level}]`:""}
                </div>
                <div class="node-dot" style="width:12px; height:12px; background-color:${M}; border-radius:50%; border:2px solid #fff; ${P}"></div>
              </div>
            `}).join("")}
        </div>
      </div>

      <div class="panel mt-md">
        <div class="panel-title">Thiết Lập Lộ Trình</div>
        <div class="panel-body no-pad" style="max-height: 300px; overflow-y:auto">
          ${i.map(x=>{const $=m[x.id],w=x.id===h.currentArea&&!T,L=h.level<(x.min_level||1),S=parseInt(x.travel_time)||0,C=($==null?void 0:$.staminaCost)||"?",M=s[x.id]||"";return`
              <div class="list-item ${w||L?"":"clickable"}" ${!w&&!L&&!T?`data-travel="${x.id}"`:""} style="padding: 10px 14px">
                <div class="item-info" style="flex:1">
                  <div class="item-name" style="font-size:14px">
                    ${x.name}
                    ${w?' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>':""}
                    ${L?` <span style="color:var(--red); font-size:11px">[Lv.${x.min_level}+]</span>`:""}
                  </div>
                  <div class="item-meta" style="margin-top:2px;display:flex;gap:6px;flex-wrap:wrap">
                    <span>Lv.${x.min_level||1}+</span>
                    <span>${S>0?"⏱ "+S+"s":"⚡ Tức thời"}</span>
                    <span>🏃 -${C}</span>
                    ${M?`<span style="font-size:10px;opacity:0.6">${M}</span>`:""}
                  </div>
                  ${x.description?`<div class="text-xs text-dim" style="margin-top:2px">${x.description}</div>`:""}
                </div>
                ${!w&&!L&&!T?`
                  <button class="btn btn--blue btn--sm" data-travel="${x.id}">
                    ${S>0?"🚶 Di chuyển":"⚡ Đi"}
                  </button>
                `:""}
              </div>`}).join("")}
        </div>
      </div>`,r.querySelectorAll("[data-travel]").forEach(x=>{x.addEventListener("click",async $=>{$.stopPropagation();const w=x.dataset.travel;r.querySelectorAll("[data-travel]").forEach(L=>{L.tagName==="BUTTON"&&(L.disabled=!0),L.style.pointerEvents="none"});try{const L=await c.request(`/player/${t.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:w})});L.player&&(t.player=L.player,k()),o(L.message,"success"),O(r,a)}catch(L){o(L.message||"Lỗi di chuyển!","error"),O(r,a)}})}),T&&p>0){let x=p;const $=p,w=setInterval(async()=>{x--;const L=document.getElementById("travelTimer"),S=document.getElementById("travelBar");if(L&&(L.textContent=`⏳ ${Math.max(0,x)}s`),S&&(S.style.width=`${Math.max(0,x/$*100)}%`),x<=0){clearInterval(w);try{const C=await c.request(`/player/${t.playerId}/travel-check`,{method:"POST"});C.player&&(t.player=C.player,k()),C.arrived&&o(C.message,"success"),O(r,a)}catch{O(r,a)}}},1e3)}}catch(v){r.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(v)}}function F(r,a){var s,d;const{state:t,renderGame:c,notify:o,updateSidebar:k}=a,v=t.player,l=t.recipes||[],b=t.medicines||[],f=t._alchemyTab||"recipes",h=i=>{const y=b.find(x=>x.id===i);return y?(y.icon||"💊")+" "+y.name:i};let T=0,p=0,u=0,m=0;(v.skills||[]).forEach(i=>{const y=typeof i=="string"?i:i.id,x=typeof i=="string"?1:i.level||1;y==="tinh_che"&&(T=x*2),y==="phu_an_thuat"&&(p=x*5),y==="linh_kiem_thuat"&&(u=x*10),y==="cuong_hoa_thuat"&&(m=x*15)});const g=i=>i.split("_").map(y=>y.charAt(0).toUpperCase()+y.slice(1)).join(" "),n=[];Object.values(v.equipment||{}).forEach(i=>{i&&n.push({...i,loc:"eq"})}),(v.inventory||[]).filter(i=>i.slot&&i.slot!=="consumable").forEach(i=>n.push({...i,loc:"inv"}));let e=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${f==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${f==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${T||p||u||m?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${T?`<span>🔥 Thành công +${T}%</span>`:""}
      ${p?`<span>💎 Giảm phí -${p}%</span>`:""}
      ${u?`<span>✨ Chất lượng +${u}%</span>`:""}
      ${m?`<span>⬆️ Nâng đôi ${m}%</span>`:""}
    </div>
    `:""}
  `;if(f==="recipes"){if(e+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!v.materials||Object.keys(v.materials).length===0)e+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[i,y]of Object.entries(v.materials))e+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(i)} <span style="color:var(--gold)">x${y}</span></div>`;e+="</div></div>",e+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',l.length===0?e+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':l.forEach(i=>{var S;const y=h(i.target),x=Math.min(100,(i.successRate||100)+T);let $="";(S=i.requirements)!=null&&S.skill&&($=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(i.requirements.skill)} lv${i.requirements.level||1}</div>`);let w="";i.materials.forEach(C=>{var P;const M=((P=v.materials)==null?void 0:P[C.id])||0;w+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${M>=C.amount?"var(--green)":"var(--red)"};font-weight:bold">${M}/${C.amount}</span> ${g(C.id)}</span>`});const L=b.find(C=>C.id===i.target)||{};e+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${y}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${i.tier}</span>
                  <span>Tỉ lệ: <span style="color:${x>=80?"var(--green)":"var(--blue)"};font-weight:bold">${x}%</span></span>
                  <span>🔥 Phí: ${i.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${$}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${w}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${L.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${i.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),e+="</div></div>"}else e+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${n.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${n.map(i=>`<option value="${i.id}">${i.loc==="eq"?"🔸":"📦"} ${i.name||i.baseType} [${i.rarity||"?"}] ${(i.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(i=>{const y=Math.max(1,Math.round(i.cost*(1-p/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${i.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${i.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${i.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${i.id}" style="width:100%">
                💎 ${y} ${p>0?`<s style="opacity:0.4;font-size:10px">${i.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;r.innerHTML=e,r.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{t._alchemyTab=i.dataset.tab,F(r,a)})}),r.querySelectorAll(".accordion-header").forEach(i=>{i.addEventListener("click",()=>{const y=i.nextElementSibling;y.style.display==="none"?(y.style.display="block",i.querySelector(".text-dim:last-child").textContent="▲"):(y.style.display="none",i.querySelector(".text-dim:last-child").textContent="▼")})}),r.querySelectorAll(".btn-craft").forEach(i=>{i.addEventListener("click",async y=>{y.stopPropagation();const x=l.find($=>$.id===i.dataset.recipe);if(x&&v.gold<(x.cost||0))return o("Không đủ linh thạch!","error");try{const $=await H.craftItem(v.id,i.dataset.recipe);t.player=$.player,o($.message,$.success?"success":"error"),c()}catch($){o($.message,"error")}})}),r.querySelectorAll(".btn-currency").forEach(i=>{i.addEventListener("click",async()=>{const y=document.getElementById("selItem");if(!(y!=null&&y.value))return o("Chọn trang bị trước!","error");const x=i.dataset.cid;let $=-1;if(x==="thien_menh_phu"){const w=n.find(C=>C.id===y.value),L=(w==null?void 0:w.affixes)||[];if(L.length===0)return o("Item không có affix để khóa!","error");const S=prompt(`Chọn affix để khóa (0-${L.length-1}):
${L.map((C,M)=>`${M}: ${C.name||C.stat} +${C.value}`).join(`
`)}`);if(S===null)return;if($=parseInt(S),isNaN($)||$<0||$>=L.length)return o("Chỉ số không hợp lệ!","error")}i.disabled=!0,i.textContent="⏳...";try{const w=await H.applyCurrency(v.id,x,y.value,$);o(w.message,"success"),t.player=w.player,k(),F(r,a)}catch(w){o(w.message,"error"),i.disabled=!1,i.textContent="💎 Dùng"}})}),(s=document.getElementById("selItem"))==null||s.addEventListener("change",()=>{const i=n.find(x=>x.id===document.getElementById("selItem").value),y=document.getElementById("itemPreview");i&&y&&(y.innerHTML=(i.affixes||[]).map(x=>`<span style="color:var(--blue)">• ${x.name||x.stat} +${x.value}</span>`).join(" | ")||"Không có affix")}),(d=document.getElementById("selItem"))==null||d.dispatchEvent(new Event("change"))}function bt(r,a){const{state:t,api:c,notify:o,renderGame:k}=a;t.player,r.innerHTML=`
    <div class="page-header">
      <h2>🏷️ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ nhiệm vụ từ các NPC</p>
    </div>
    <div id="questList" class="quest-container">
      <div class="loading-spinner">⏳ Đang tải...</div>
    </div>
  `,v();async function v(){try{const b=(await c.getQuests(t.playerId)).quests||[],f=document.getElementById("questList");if(!f)return;if(b.length===0){f.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}f.innerHTML=b.map(h=>{const T=h.questAmount>0?Math.min(100,h.progress/h.questAmount*100):0,p=h.progress>=h.questAmount,u=h.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${p?"quest-done":""}" data-quest-id="${h.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${h.npcIcon||"🧓"} ${h.npcName||"NPC"}</span>
              <span class="quest-type">${u} ${h.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${h.questName||h.quest_id}</div>
            <div class="quest-desc">${h.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${p?"hp":"energy"}" style="width:${T}%"></div>
              </div>
              <span class="quest-progress-text">${h.progress}/${h.questAmount}</span>
            </div>
            ${p?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${h.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),f.querySelectorAll(".quest-complete-btn").forEach(h=>{h.addEventListener("click",async()=>{const T=h.dataset.qid;h.disabled=!0,h.textContent="⏳...";try{const p=await c.completeQuest(t.playerId,T);t.player=p.player,o(p.message,"success"),p.skillGained&&o(`🎯 Lĩnh ngộ: ${p.skillGained}!`,"success"),k()}catch(p){o(p.message||"Lỗi trả quest","error"),h.disabled=!1,h.textContent="✅ Trả Nhiệm Vụ"}})})}catch(l){console.error("Error loading quests:",l);const b=document.getElementById("questList");b&&(b.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function xt(r,a){const{state:t,api:c,notify:o,renderGame:k}=a;if(t.player.role!=="admin"){r.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const v=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let l="monsters";r.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${v.map(e=>`
          <button class="admin-tab ${e.id===l?"active":""}" data-tab="${e.id}">${e.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",e=>{const s=e.target.closest(".admin-tab");s&&(l=s.dataset.tab,document.querySelectorAll(".admin-tab").forEach(d=>d.classList.remove("active")),s.classList.add("active"),b(l))}),b(l);async function b(e){const s=document.getElementById("adminContent");if(s){s.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const d=await c.request(`/admin/${e}?adminId=${t.playerId}`);f(e,d,s)}catch(d){s.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${d.message}</div></div>`}}}function f(e,s,d){e==="monsters"?h(s,d):e==="npcs"?T(s,d):e==="areas"?p(s,d):u(e,s,d)}function h(e,s){const d=e.monsters||[];s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${d.map(i=>{var y,x,$,w,L,S,C,M;return`
          <div class="admin-card" data-id="${i.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${i.name} ${i.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((x=(y=e.tierInfo)==null?void 0:y[i.tier])==null?void 0:x.color)||"#888"}">${((w=($=e.tierInfo)==null?void 0:$[i.tier])==null?void 0:w.name)||"T"+i.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((L=i.stats)==null?void 0:L.hp)||"?"}</div>
              <div>💪 ${((S=i.stats)==null?void 0:S.strength)||"?"}</div>
              <div>🏃 ${((C=i.stats)==null?void 0:C.speed)||"?"}</div>
              <div>🛡 ${((M=i.stats)==null?void 0:M.defense)||"?"}</div>
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
    `,g(s,e,"monsters","monsters")}function T(e,s){const d=e.npcs||[];s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${d.map(i=>`
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
    `,g(s,e,"npcs","npcs")}function p(e,s){const d=Object.keys(e);s.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${d.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${d.map(i=>{const y=e[i];return`
            <div class="admin-card" data-id="${i}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${y.name||i}</span>
                <span class="badge" style="background:var(--orange)">⚡${y.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(y.events||[]).map(x=>`<span>${x.type}: ${x.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${i}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,s.querySelectorAll(".admin-edit-area").forEach(i=>{i.addEventListener("click",()=>{const y=i.dataset.id,x=e[y];m(y,x,`areas/${y}`)})})}function u(e,s,d){var x;const i=JSON.stringify(s,null,2),y=i.split(`
`).length;d.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${e} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(y+5,30)}">${n(i)}</textarea>
    `,(x=document.getElementById("btnSaveGeneric"))==null||x.addEventListener("click",async()=>{try{const $=document.getElementById("genericEditor").value,w=JSON.parse($);o("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch($){o("JSON không hợp lệ: "+$.message,"error")}})}function m(e,s,d,i){const y=JSON.stringify(s,null,2),x=document.createElement("div");x.className="admin-modal-overlay",x.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${e}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${n(y)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(x),x.querySelectorAll(".admin-modal-close").forEach($=>{$.addEventListener("click",()=>x.remove())}),x.addEventListener("click",$=>{$.target===x&&x.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const $=document.getElementById("modalEditor").value,w=JSON.parse($);await c.request(`/admin/${d}?adminId=${t.playerId}`,{method:"PUT",body:JSON.stringify({data:w})}),o("✅ Đã lưu!","success"),x.remove(),b(l)}catch($){o("Lỗi: "+$.message,"error")}})}function g(e,s,d,i){e.querySelectorAll(".admin-edit-btn").forEach(y=>{y.addEventListener("click",()=>{const x=y.dataset.id,w=(s[i]||[]).find(L=>L.id===x);w&&m(x,w,`${d}/${x}`)})})}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function et(r,a){const{state:t,api:c,notify:o,renderGame:k,updateSidebar:v}=a,l=t.playerId;t._social||(t._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const b=t._social;async function f(){try{const g=await c.getRelationships(l);b.relationships=g,b.loaded=!0,h()}catch(g){o(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function h(){const{friends:g,enemies:n,pendingSent:e,pendingReceived:s}=b.relationships,d=s.length;r.innerHTML=`
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
            ${b.searchResults.map(i=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${i.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${i.level} · ${i.realm} · ${i.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${i.id!==l?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${i.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${i.id}">⚔️ Kẻ Thù</button>
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
        ${b.tab==="friends"?T(g):""}
        ${b.tab==="enemies"?p(n):""}
        ${b.tab==="pending"?u(s,e):""}
      </div>
    `,m()}function T(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(n=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${n.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${n.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${n.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function p(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(n=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${n.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${n.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${n.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function u(g,n){let e="";return g.length>0&&(e+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',e+=g.map(s=>`
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
      `).join("")),n.length>0&&(e+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',e+=n.map(s=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${s.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${s.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&n.length===0&&(e='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),e}function m(){var g,n;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var s;const e=(s=document.getElementById("socialSearch"))==null?void 0:s.value.trim();if(!e||e.length<2)return o("Cần ít nhất 2 ký tự","error");b.searchQuery=e;try{const d=await c.searchPlayers(e);b.searchResults=d.players||[],h()}catch(d){o(d.message,"error")}}),(n=document.getElementById("socialSearch"))==null||n.addEventListener("keydown",e=>{var s;e.key==="Enter"&&((s=document.getElementById("btnSearch"))==null||s.click())}),document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{b.tab=e.dataset.tab,h()})}),document.querySelectorAll("[data-action]").forEach(e=>{e.addEventListener("click",async()=>{const s=e.dataset.action,d=e.dataset.target;e.disabled=!0;try{let i;switch(s){case"add-friend":i=await c.addFriend(l,d);break;case"accept-friend":i=await c.acceptFriend(l,d);break;case"reject-friend":i=await c.rejectFriend(l,d);break;case"remove-friend":i=await c.removeFriend(l,d);break;case"add-enemy":i=await c.addEnemy(l,d);break;case"remove-enemy":i=await c.removeEnemy(l,d);break}o(i.message||"Thành công!","success"),await f()}catch(i){o(i.message||"Lỗi!","error"),e.disabled=!1}})})}b.loaded?h():f()}function at(r,a){const{state:t,api:c,notify:o}=a,k=t.playerId;t._chat||(t._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const v=t._chat;async function l(){try{const[n,e]=await Promise.all([c.getGlobalChat(),c.getChatFriends(k)]);v.globalMessages=n.messages||[],v.friends=e.friends||[],v.globalMessages.length>0&&(v.lastGlobalId=v.globalMessages[v.globalMessages.length-1].id),v.loaded=!0,h(),b()}catch(n){o(n.message||"Lỗi tải chat","error")}}function b(){f(),v.pollTimer=setInterval(async()=>{try{if(v.tab==="global"){const n=await c.getGlobalChat(v.lastGlobalId);n.messages&&n.messages.length>0&&(v.globalMessages.push(...n.messages),v.globalMessages.length>100&&(v.globalMessages=v.globalMessages.slice(-100)),v.lastGlobalId=v.globalMessages[v.globalMessages.length-1].id,p(),u())}else if(v.tab==="private"&&v.selectedFriend){const n=await c.getPrivateChat(k,v.selectedFriend.id,v.lastPrivateId);n.messages&&n.messages.length>0&&(v.privateMessages.push(...n.messages),v.privateMessages.length>100&&(v.privateMessages=v.privateMessages.slice(-100)),v.lastPrivateId=v.privateMessages[v.privateMessages.length-1].id,p(),u())}}catch{}},5e3)}function f(){v.pollTimer&&(clearInterval(v.pollTimer),v.pollTimer=null)}function h(){const n=v.tab==="global"?v.globalMessages:v.privateMessages;r.innerHTML=`
      <div class="page-header">
        <h2>💬 Giang Hồ Truyền Âm</h2>
        <p class="page-sub">Giao lưu với các đạo hữu trong giang hồ</p>
      </div>

      <div class="chat-tabs" style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn btn--sm ${v.tab==="global"?"btn--blue":"btn--dark"}" data-chat-tab="global">🌍 Toàn Cầu</button>
        <button class="btn btn--sm ${v.tab==="private"?"btn--blue":"btn--dark"}" data-chat-tab="private">📨 Riêng</button>
        ${v.tab==="private"?`
          <select id="friendSelect" style="flex:1;padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
            <option value="">-- Chọn Đạo Hữu --</option>
            ${v.friends.map(e=>{var s;return`<option value="${e.id}" ${((s=v.selectedFriend)==null?void 0:s.id)===e.id?"selected":""}>${e.name} (Lv.${e.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${T(n)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${v.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),u()}function T(n){return n.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':n.map(e=>{const s=e.sender_id===k,d=new Date(e.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${s?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${d}</span>
          <span style="font-weight:600;color:${s?"var(--blue)":"var(--gold)"}"> ${e.sender_name}</span>
          <span style="opacity:0.8">: ${m(e.message)}</span>
        </div>
      `}).join("")}function p(){const n=document.getElementById("chatMessages");if(!n)return;const e=v.tab==="global"?v.globalMessages:v.privateMessages;n.innerHTML=T(e)}function u(){const n=document.getElementById("chatMessages");n&&(n.scrollTop=n.scrollHeight)}function m(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}function g(){var e,s,d;document.querySelectorAll("[data-chat-tab]").forEach(i=>{i.addEventListener("click",()=>{v.tab=i.dataset.chatTab,v.tab==="global"&&(v.lastGlobalId=v.globalMessages.length>0?v.globalMessages[v.globalMessages.length-1].id:0),h(),b()})}),(e=document.getElementById("friendSelect"))==null||e.addEventListener("change",async i=>{const y=i.target.value;if(!y){v.selectedFriend=null,v.privateMessages=[],h();return}v.selectedFriend=v.friends.find(x=>x.id===y)||null,v.lastPrivateId=0;try{const x=await c.getPrivateChat(k,y);v.privateMessages=x.messages||[],v.privateMessages.length>0&&(v.lastPrivateId=v.privateMessages[v.privateMessages.length-1].id),p(),u()}catch(x){o(x.message,"error")}});const n=async()=>{var x,$;const i=document.getElementById("chatInput"),y=i==null?void 0:i.value.trim();if(y){if(v.tab==="private"&&!v.selectedFriend)return o("Chọn Đạo Hữu trước!","error");try{if(await c.sendChat(k,v.tab,v.tab==="private"?v.selectedFriend.id:null,y),i.value="",v.tab==="global"){const w=await c.getGlobalChat(v.lastGlobalId);((x=w.messages)==null?void 0:x.length)>0&&(v.globalMessages.push(...w.messages),v.lastGlobalId=v.globalMessages[v.globalMessages.length-1].id)}else{const w=await c.getPrivateChat(k,v.selectedFriend.id,v.lastPrivateId);(($=w.messages)==null?void 0:$.length)>0&&(v.privateMessages.push(...w.messages),v.lastPrivateId=v.privateMessages[v.privateMessages.length-1].id)}p(),u()}catch(w){o(w.message||"Lỗi gửi tin nhắn","error")}}};(s=document.getElementById("btnSend"))==null||s.addEventListener("click",n),(d=document.getElementById("chatInput"))==null||d.addEventListener("keydown",i=>{i.key==="Enter"&&n()})}a.renderGame,v.loaded?(h(),b()):l()}function ft(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;t._market||(t._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const l=t._market;async function b(){try{const[n,e]=await Promise.all([c.getMarketListings(l.filter,l.sort),c.getMyListings(v)]);l.listings=n.listings||[],l.myListings=e.listings||[],l.loaded=!0,h()}catch(n){o(n.message||"Lỗi tải Giao Dịch Đài","error")}}async function f(){try{const[n,e]=await Promise.all([c.getMugTargets(v),c.getMugLog(v)]);l.mugTargets=n.targets||[],l.mugCooldown=n.mugCooldown||0,l.mugLog=e.logs||[],h()}catch(n){o(n.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function h(){const n=t.player;r.innerHTML=`
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

      ${l.tab==="browse"?T():l.tab==="my"?p():u()}
    `,g()}function T(){let n=`
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
    `,e=l.listings;if(l.search.trim()){const s=l.search.toLowerCase().trim();e=e.filter(d=>{var i;return d.item_name.toLowerCase().includes(s)?!0:(i=d.item_data)!=null&&i.affixes?d.item_data.affixes.some(y=>(y.stat||"").toLowerCase().includes(s)||(y.type||"").toLowerCase().includes(s)):!1})}return e.length===0?n+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(n+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',n+=e.map(s=>{var $,w;const d=s.item_type==="item"?"⚔️":s.item_type==="material"?"🧱":"💊",i=(($=s.item_data)==null?void 0:$.rarity)||"",y=s.seller_id===v,x=(w=s.item_data)!=null&&w.affixes?s.item_data.affixes.map(L=>`${L.stat} ${L.type==="flat"?"+":""}${L.value}${L.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${d}
                <span style="color:var(--gold)">${s.item_name}</span>
                ${s.quantity>1?`<span style="opacity:0.5"> x${s.quantity}</span>`:""}
                ${i?`<span class="rarity-${i}" style="font-size:11px;margin-left:4px">[${i}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${s.seller_name}</span>
                ${x?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${x}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${s.price}${s.quantity>1?"/cái":""}</span>
              ${y?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${s.id}" data-qty="${s.quantity}" data-price="${s.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),n+="</div></div>"),n}function p(){if(l.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let n='<div class="panel"><div class="panel-body no-pad">';return n+=l.myListings.map(e=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${e.item_type==="item"?"⚔️":e.item_type==="material"?"🧱":"💊"} ${e.item_name} ${e.quantity>1?`<span style="opacity:0.5">x${e.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${e.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${e.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),n+="</div></div>",n}function u(){let n=`
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
            ${l.mugLog.map(e=>{const s=e.attacker_id===v,d=e.outcome==="success"?"✅":"❌",i=e.outcome==="success"?"var(--green)":"var(--red)",y=s?e.outcome==="success"?`Cướp ${e.victim_name}: +${e.gold_stolen} 💎`:`Phục kích ${e.victim_name} thất bại!`:e.outcome==="success"?`Bị ${e.attacker_name} cướp: -${e.gold_stolen} 💎`:`${e.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${i}">${d} ${y} <span style="opacity:0.4;margin-left:auto">${new Date(e.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),n}function m(n){const e=Object.entries(n.materials||{}).map(([y,x])=>({id:y,qty:x,type:"material",name:y})),s=Object.entries(n.medicines||{}).map(([y,x])=>({id:y,qty:x,type:"medicine",name:y})),d=(n.inventory||[]).map(y=>({id:y.id,qty:1,type:"item",name:y.name||y.id})),i=[...e,...s,...d];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${i.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${i.map(y=>`<option value="${y.type}|${y.id}">${y.type==="item"?"⚔️":y.type==="material"?"🧱":"💊"} ${y.name} ${y.qty>1?`(có: ${y.qty})`:""}</option>`).join("")}
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
    `}function g(){var n,e,s,d;document.querySelectorAll("[data-mtab]").forEach(i=>{i.addEventListener("click",()=>{if(l.tab=i.dataset.mtab,l.tab==="mug"&&l.mugTargets.length===0){f();return}h()})}),(n=document.getElementById("btnShowList"))==null||n.addEventListener("click",()=>{l.showListForm=!l.showListForm,h()}),document.querySelectorAll("[data-filter]").forEach(i=>{i.addEventListener("click",async()=>{l.filter=i.dataset.filter,await b()})}),(e=document.getElementById("sortSelect"))==null||e.addEventListener("change",async i=>{l.sort=i.target.value,await b()}),(s=document.getElementById("searchInput"))==null||s.addEventListener("input",i=>{l.search=i.target.value,h();const y=document.getElementById("searchInput");y&&(y.focus(),y.setSelectionRange(l.search.length,l.search.length))}),(d=document.getElementById("btnConfirmList"))==null||d.addEventListener("click",async()=>{var L,S,C;const i=(L=document.getElementById("listItem"))==null?void 0:L.value;if(!i)return;const[y,x]=i.split("|"),$=parseInt((S=document.getElementById("listQty"))==null?void 0:S.value)||1,w=parseInt((C=document.getElementById("listPrice"))==null?void 0:C.value)||0;if(w<=0)return o("Giá phải lớn hơn 0!","error");try{const M=await c.listForSale(v,y,x,$,w);o(M.message,"success"),t.player=M.player,k(),l.showListForm=!1,await b()}catch(M){o(M.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(i=>{i.addEventListener("click",async()=>{const y=parseInt(i.dataset.buy),x=parseInt(i.dataset.qty),$=parseInt(i.dataset.price);let w=1;if(x>1){const L=prompt(`Mua bao nhiêu? (tối đa ${x}, giá ${$} 💎/cái)`,"1");if(!L)return;w=Math.min(parseInt(L)||1,x)}i.disabled=!0;try{const L=await c.buyFromMarket(v,y,w);o(L.message,"success"),t.player=L.player,k(),await b()}catch(L){o(L.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(i=>{i.addEventListener("click",async()=>{i.disabled=!0;try{const y=await c.cancelListing(v,parseInt(i.dataset.cancel));o(y.message,"success"),t.player=y.player,k(),await b()}catch(y){o(y.message,"error"),i.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(i=>{i.addEventListener("click",async()=>{const y=i.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){i.disabled=!0,i.textContent="⏳...";try{const x=await c.mugPlayer(v,y);o(x.message,x.success?"success":"error"),t.player=x.player,k(),await f()}catch(x){o(x.message,"error"),i.disabled=!1,i.textContent="💀 Phục Kích"}}})})}l.tab==="mug"?f():l.loaded?h():b()}function $t(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;let l=!1,b=null;async function f(){try{b=await c.getRealmInfo(v),l=!0,h()}catch(u){o(u.message||"Lỗi tải Cảnh Giới","error")}}function h(){if(!b)return;const u=b.current,m=b.allRealms||[],g=t.player,n=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;r.innerHTML=`
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
            <div style="opacity:0.5;font-size:13px">Tầng ${u.tier}/8 · ${u.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${g.level} — ${g.xp}/${g.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${n}%;background:${u.color}"></div></div>
        </div>

        ${u.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(u.bonuses).filter(([,e])=>e>0).map(([e,s])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${s} ${e}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${u.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${u.unlocks.map(e=>`<span style="font-size:12px;opacity:0.7">✅ ${e}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${u.canBreakthrough?T(u):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${m.map(e=>{const s=e.tier===u.tier,d=e.tier<u.tier,y=e.tier>u.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${s?`2px solid ${e.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${y};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${e.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${e.color}">${e.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${e.levelMin}+</span>
                ${e.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${e.failChance}% thất bại</span>`:""}
                ${d?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${s?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,p()}function T(u){const m=u.nextRealm;if(!m)return"";const g=m.cost?`💎 ${m.cost.gold} + 🔮 ${m.cost.energy}`:"Miễn phí";return`
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
    `}function p(){var u;(u=document.getElementById("btnBreakthrough"))==null||u.addEventListener("click",async()=>{const m=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){m.disabled=!0,m.textContent="⏳ Đang đột phá...";try{const g=await c.attemptBreakthrough(v);g.success?(o(g.message,"success"),t.player=g.player,k(),await f()):(o(g.message,"error"),g.player&&(t.player=g.player,k()),await f())}catch(g){o(g.message||"Lỗi đột phá","error"),m.disabled=!1,m.textContent="⚡ ĐỘT PHÁ"}}})}f()}function Tt(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a;kt(r,a)}async function kt(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a;r.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const l=(await c.request(`/player/${t.playerId}/events`)).events||[];if(t.player&&(t.player.unreadEventsCount=0,k()),l.length===0){r.innerHTML=`
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
            ${l.map(b=>{const f=new Date(b.created_at*1e3),h=f.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),T=f.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let p="📌";return p={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[b.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${h}</div>
                    <div>${T}</div>
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
    `}catch(v){r.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${v.message}</div></div>`}}function wt(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;t._tc||(t._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const l=t._tc;async function b(){try{l.data=await c.request(`/player/${v}/atlas-maps`),l.loaded=!0,f()}catch(g){o(g.message,"error")}}function f(){const g=l.data,n=(g==null?void 0:g.atlas)||{},e=(g==null?void 0:g.maps)||[],s=g==null?void 0:g.activeRun,d=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,r.innerHTML=`
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
        ${s?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,r.querySelectorAll("[data-tab]").forEach(y=>{y.addEventListener("click",()=>{l.tab=y.dataset.tab,f()})});const i=document.getElementById("tcContent");i&&(s&&l.tab==="run"?u(i,s):l.tab==="inventory"?T(i,e):h(i,d,n))}function h(g,n,e){var d;const s=((d=l.data)==null?void 0:d.tiers)||[];g.innerHTML=s.map(i=>{const y=n.filter(x=>x.tier===i.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${i.tier} ${i.name} <span style="opacity:0.4;font-size:11px">(Realm ${i.requiredRealm}+, ${i.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${y.map(x=>{var L;const $=((L=e.progress)==null?void 0:L[x.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[x.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${$?700:400}">${x.name}</span>
                ${$?`<span style="color:var(--green);font-size:11px">✅ ×${$}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function T(g,n,e){if(n.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=n.map((s,d)=>{const i=s.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${m(s.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${s.mapName||s.mapId} <span style="color:${m(s.tier)};font-size:12px">T${s.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${i.length>0?i.map(y=>y.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${i.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${d}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${d}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(s=>{s.addEventListener("click",async()=>{try{const d=await c.request(`/player/${v}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(s.dataset.idx)})});o(d.message,"success"),t.player=d.player,k(),l.tab="run",await b()}catch(d){o(d.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(s=>{s.addEventListener("click",()=>p(parseInt(s.dataset.idx)))})}function p(g){var s;const n=((s=l.data)==null?void 0:s.modifiers)||[],e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",e.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${n.map(d=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${d.id}">
          <span style="flex:1"><strong>${d.name}</strong><br><span style="font-size:11px;opacity:0.6">${d.desc} · IIQ +${d.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,e.addEventListener("click",async d=>{const i=d.target.closest("[data-modid]");if(i)try{const y=await c.request(`/player/${v}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:i.dataset.modid})});o(y.message,"success"),t.player=y.player,k(),e.remove(),await b()}catch(y){o(y.message,"error")}else d.target===e&&e.remove()}),document.body.appendChild(e)}function u(g,n){var d,i;const e=n.currentWave/n.totalWaves*100,s=n.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${n.mapName} <span style="color:${m(n.tier)}">T${n.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${n.currentWave}/${n.totalWaves}
            ${s.length>0?" · "+s.map(y=>y.name).join(" "):""}
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
    `,(d=document.getElementById("btnTCFight"))==null||d.addEventListener("click",async()=>{l.fighting=!0,f();try{const y=await c.request(`/player/${v}/atlas-maps/fight`,{method:"POST"});t.player=y.player,k();const x=y.result!=="map_failed";o(y.message,x?"success":"error"),l.fighting=!1,(y.result==="map_complete"||y.result==="map_failed")&&(l.tab="atlas"),await b()}catch(y){o(y.message,"error"),l.fighting=!1,f()}}),(i=document.getElementById("btnTCQuit"))==null||i.addEventListener("click",async()=>{try{await c.request(`/player/${v}/atlas-maps/abandon`,{method:"POST"}),o("Đã rời Tiên Cảnh","info"),l.tab="atlas",await b()}catch(y){o(y.message,"error")}})}function m(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}l.loaded?f():b()}function Lt(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;t._tw||(t._tw={data:null,loaded:!1,fighting:!1,tab:"tower"});const l=t._tw;async function b(){try{l.data=await c.request(`/player/${v}/tower`),l.loaded=!0,f()}catch(u){o(u.message,"error")}}function f(){var d,i;const u=l.data,m=u==null?void 0:u.run,g=(u==null?void 0:u.leaderboard)||[],n=(u==null?void 0:u.milestones)||{},e=u==null?void 0:u.nextMilestone;r.innerHTML=`
      <div class="page-header">
        <h2>🗼 Thiên Phần Tháp</h2>
        <p class="page-sub">Leo tháp vô hạn — mùa ${(u==null?void 0:u.season)||"?"} | Reset hàng tháng</p>
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
    `,r.querySelectorAll("[data-tab]").forEach(y=>y.addEventListener("click",()=>{l.tab=y.dataset.tab,f()})),(d=document.getElementById("btnEnter"))==null||d.addEventListener("click",async()=>{try{const y=await c.request(`/player/${v}/tower/climb`,{method:"POST"});o(y.message,"success"),await b()}catch(y){o(y.message,"error")}}),(i=document.getElementById("btnFight"))==null||i.addEventListener("click",async()=>{var y,x;l.fighting=!0,f();try{const $=await c.request(`/player/${v}/tower/fight`,{method:"POST"});t.player=$.player,k(),l.fighting=!1;const w=document.getElementById("twResult");if(w){const L=$.result!=="death";w.innerHTML=`
            <div class="panel" style="border-left:3px solid ${L?"var(--green)":"var(--red)"}">
              <div class="panel-body" style="padding:14px">
                <div style="font-weight:700;font-size:14px">${$.message}</div>
                ${(y=$.loot)!=null&&y.length?`<div style="font-size:12px;margin-top:6px;opacity:0.7">${$.loot.join(" · ")}</div>`:""}
                ${$.milestone?`<div style="margin-top:8px;padding:8px;background:rgba(255,215,0,0.15);border-radius:6px;font-weight:700;color:var(--gold)">🏆 ${$.milestone.title}!</div>`:""}
                ${((x=$.combatResults)==null?void 0:x.map(S=>`<details style="margin-top:6px"><summary style="cursor:pointer;font-size:11px">${S.monster} — ${S.result==="win"?"✅":"❌"}</summary><pre style="font-size:10px;max-height:150px;overflow:auto;opacity:0.6;margin-top:4px">${(S.log||[]).map(C=>`${C.turn||""}: ${C.text||JSON.stringify(C)}`).join(`
`)}</pre></details>`).join(""))||""}
              </div>
            </div>
          `}await b()}catch($){o($.message,"error"),l.fighting=!1,f()}});const s=document.getElementById("twContent");s&&(l.tab==="leaderboard"?T(s,g,u.playerRank):l.tab==="milestones"?p(s,n,(m==null?void 0:m.highestFloor)||0):h(s,m))}function h(u,m){var y;if(!m){u.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Vào tháp để bắt đầu leo!</div></div>';return}const g=m.currentFloor,n=[];g%10===0?n.push("👑 Boss"):g%15===0?n.push("💰 Bảo Tàng (2.5x loot)"):g%7===0?n.push("☠️ Bẫy Trận (-10% HP)"):g%13===0?n.push("💚 Linh Tuyền (+20% HP)"):g%11===0?n.push("⚡ Tinh Anh (+30% stats)"):g%9===0&&g>20&&n.push("☯ Ngũ Hành");const e=Math.min(1+Math.floor(g/20),3),s=10+Math.floor(g/10),d=((y=a.state.player)==null?void 0:y.currentStamina)??0,i=d>=s;u.innerHTML=`<div class="panel"><div class="panel-body" style="padding:14px">
      <div style="font-weight:700;font-size:15px">🗼 Tầng ${g}</div>
      <div style="font-size:12px;opacity:0.7;margin-top:6px">
        ${n.length?n.join(" · "):"⚔️ Thường"}
        · ${e} quái
        · Sức mạnh ×${Math.pow(1.08,g-1).toFixed(1)}
      </div>
      <div style="font-size:12px;margin-top:6px;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:4px;display:inline-block">
        ⚡ Thể lực: <strong style="color:${i?"var(--green)":"var(--red)"}">${s}</strong>
        <span style="opacity:0.5;margin-left:6px">(Hiện có: ${d})</span>
      </div>
    </div></div>`}function T(u,m,g){var n;u.innerHTML=`<div class="panel"><div class="panel-title">🏆 Mùa ${(n=l.data)==null?void 0:n.season}</div><div class="panel-body no-pad">
      ${m.length===0?'<div style="padding:20px;text-align:center;opacity:0.4">Chưa có ai leo tháp mùa này</div>':""}
      ${m.map(e=>{const s=e.rank<=3?["","🥇","🥈","🥉"][e.rank]:`#${e.rank}`,d=e.playerId===v;return`<div class="list-item" style="padding:8px 14px;${d?"background:rgba(255,215,0,0.1)":""}">
          <span style="width:40px;font-weight:700;font-size:14px">${s}</span>
          <span style="flex:1;font-weight:${d?800:400}">${e.name}</span>
          <span style="font-size:12px;opacity:0.7">T.${e.floor} · ${e.kills} kills</span>
        </div>`}).join("")}
    </div></div>
    ${g>0?`<div style="text-align:center;margin-top:8px;font-size:12px;opacity:0.6">Hạng của bạn: #${g}</div>`:""}`}function p(u,m,g){u.innerHTML=`<div class="panel"><div class="panel-title">🎯 Mốc Thưởng</div><div class="panel-body no-pad">
      ${Object.entries(m).map(([n,e])=>{const s=g>=parseInt(n);return`<div class="list-item" style="padding:10px 14px;${s?"opacity:0.5":""}">
          <span style="font-size:18px">${s?"✅":"🔒"}</span>
          <span style="flex:1;font-weight:600">Tầng ${n}</span>
          <span style="font-size:12px">${e.title} · +${e.gold}💎</span>
        </div>`}).join("")}
    </div></div>`}l.loaded?f():b()}function Ct(r,a){const{state:t,api:c,notify:o,updateSidebar:k,renderGame:v}=a,l=t.playerId;t._housing||(t._housing={data:null,loaded:!1});const b=t._housing;async function f(){try{const m=await c.getHousing(l);b.data=m,b.loaded=!0,h()}catch(m){o(m.message||"Lỗi tải Động Phủ","error")}}function h(){const m=b.data;r.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${m.owned?p(m):T(m)}
    `,u()}function T(m){const g=m.tiers[1];return`
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
    `}function p(m){const g=m.gardenSlots||[],n=m.gardenHerbs||{};return`
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
            ${Array.from({length:m.maxSlots},(e,s)=>{const d=g[s]||{},i=!!d.herb,y=d.ready,x=d.remaining||0,$=Math.ceil(x/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${y?"var(--green)":i?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${i?`
                    <div style="font-size:20px">${y?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${d.herbName||d.herb}</div>
                    <div style="font-size:10px;color:${y?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${y?"✅ Sẵn sàng!":"⏳ "+$+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${s}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
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
            ${Object.entries(m.formations).map(([e,s])=>{const d=s.currentLevel>=s.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${s.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${s.icon}</span>
                      <strong style="margin-left:4px">${s.name}</strong>
                      ${s.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${s.currentLevel}</span>`:""}
                    </div>
                    ${s.canBuild?d?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${e}">
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
    `}function u(){var m,g,n,e;(m=document.getElementById("btnBuyHouse"))==null||m.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const s=await c.buyHousing(l);o(s.message,"success"),t.player=s.player,k(),await f()}catch(s){o(s.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const s=await c.buyHousing(l);o(s.message,"success"),t.player=s.player,k(),await f()}catch(s){o(s.message,"error")}}),document.querySelectorAll(".plant-select").forEach(s=>{s.addEventListener("change",async d=>{const i=d.target.value;if(!i)return;const y=parseInt(s.dataset.slot);try{const x=await c.plantHerb(l,i,y);o(x.message,"success"),await f()}catch(x){o(x.message,"error")}})}),(n=document.getElementById("btnHarvest"))==null||n.addEventListener("click",async()=>{try{const s=await c.harvestGarden(l);o(s.message,"success"),t.player=s.player,k(),await f()}catch(s){o(s.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(s=>{s.addEventListener("click",async()=>{const d=s.dataset.fid;s.disabled=!0,s.textContent="⏳...";try{const i=await c.upgradeFormation(l,d);o(i.message,"success"),t.player=i.player,k(),await f()}catch(i){o(i.message,"error"),s.disabled=!1,s.textContent="⬆ Nâng"}})}),(e=document.getElementById("btnMaintenance"))==null||e.addEventListener("click",async()=>{try{const s=await c.payMaintenance(l);o(s.message,"success"),t.player=s.player,k(),await f()}catch(s){o(s.message,"error")}})}b.loaded?h():f()}function St(r,a){const{state:t}=a;t._wikiTab||(t._wikiTab="lore");function c(){r.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","skills","explore","tower","dungeon","housing","talent","alchemy","crime","market","tips"].map(k=>`
          <button class="btn btn--sm ${t._wikiTab===k?"btn--gold":"btn--dark"}" data-tab="${k}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",skills:"⚡ Kỹ Năng",explore:"🗺️ Khám Phá",tower:"🗼 Thiên Phần Tháp",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",crime:"🔪 Phạm Tội",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[k]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${o(t._wikiTab)}
        </div>
      </div>
    `,r.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{t._wikiTab=k.dataset.tab,c()})})}function o(k){return{lore:`
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
      `}[k]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}c()}function Et(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;t._npcShop||(t._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const l=t._npcShop;let b=parseInt(localStorage.getItem("npcShopIdx")||"0");async function f(){try{r.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const p=await c.getShops(v);l.shops=p.shops||[],l.tax=p.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},l.loaded=!0,b>=l.shops.length&&(b=0),h()}catch(p){o(p.message||"Lỗi tải shop","error")}}function h(){var e;if(l.shops.length===0){r.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const p=l.shops[b]||l.shops[0],u=l.shops.map((s,d)=>`
      <button class="skill-tab ${d===b?"active":""}" data-shop-idx="${d}">
        ${s.icon||"🧓"} ${s.name}
      </button>
    `).join(""),m={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},g={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},n=(p.items||[]).map(s=>{var $,w;const d=m[s.rarity||"common"]||"#888",i=g[s.rarity||"common"]||"Phàm",y=(s.remainingStock??1)<=0,x=((($=t.player)==null?void 0:$.gold)??0)>=(s.currentPrice||0);return`
        <div class="shop-item-card ${y?"out-of-stock":""}" style="border-left:3px solid ${d}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${d}">${s.name}</div>
              <div class="shop-item-rarity" style="color:${d}">${i} · Tầng ${s.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${y?"var(--red)":"var(--green)"}">
                ${y?"❌ Hết hàng":`📦 ${s.remainingStock}/${s.dailyStock}`}
              </span>
            </div>
          </div>
          ${s.description?`<div class="shop-item-desc">${s.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${x?"":"too-expensive"}">
              💎 ${((w=s.currentPrice)==null?void 0:w.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${p.id}" data-item="${s.id}" 
                value="1" min="1" max="${s.remainingStock||1}" 
                ${y?"disabled":""}>
              <button class="btn btn--sm ${y?"":x?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${p.id}" data-item="${s.id}"
                ${y||!x?"disabled":""}>
                ${y?"❌":x?"🛒 Mua":"💸 Thiếu"}
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
        <div class="shop-info-tag">📍 ${p.area||"Không rõ"}</div>
      </div>

      ${l.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${u}</div>`:""}

      <div class="shop-items-grid">
        ${n||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,T()}function T(){r.querySelectorAll(".skill-tab[data-shop-idx]").forEach(p=>{p.addEventListener("click",()=>{b=parseInt(p.dataset.shopIdx),localStorage.setItem("npcShopIdx",b),h()})}),r.querySelectorAll(".btn-buy").forEach(p=>{p.addEventListener("click",async()=>{const u=p.dataset.shop,m=p.dataset.item,g=r.querySelector(`.buy-qty[data-shop="${u}"][data-item="${m}"]`),n=parseInt((g==null?void 0:g.value)||1);p.disabled=!0,p.textContent="⏳...";try{const e=await c.buyFromShop(v,u,m,n);o(e.message,"success"),t.player=e.player,k(),await f()}catch(e){o(e.message,"error"),p.disabled=!1,p.textContent="🛒 Mua"}})})}l.loaded?h():f()}function Mt(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;t._guild||(t._guild={data:null,loaded:!1,allGuilds:null});const l=t._guild;async function b(){try{l.data=await c.getMyGuild(v),l.loaded=!0,h()}catch(m){o(m.message||"Lỗi","error")}}async function f(){try{const m=await c.listGuilds();l.allGuilds=m.guilds||[],h()}catch(m){o(m.message,"error")}}function h(){const m=l.data;r.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${m!=null&&m.inGuild?p(m):T(m)}
    `,u()}function T(m){return`
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
    `}function p(m){var s;const g=m.guild,n=m.members||[],e=m.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${g.tag}] ${g.name} <span style="opacity:0.3">Lv${g.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((s=g.levelInfo)==null?void 0:s.name)||""} · ${g.memberCount}/${g.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${g.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${g.dailyUpkeep}/ngày</span>
              ${g.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(g.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(g.buffs).map(([d,i])=>`${d} +${i}%`).join(", ")}
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
    `}function u(){var m,g,n,e,s,d;(m=document.getElementById("btnCreate"))==null||m.addEventListener("click",async()=>{var $,w,L,S,C,M;const i=(w=($=document.getElementById("guildName"))==null?void 0:$.value)==null?void 0:w.trim(),y=(S=(L=document.getElementById("guildTag"))==null?void 0:L.value)==null?void 0:S.trim(),x=(M=(C=document.getElementById("guildDesc"))==null?void 0:C.value)==null?void 0:M.trim();if(!i||!y)return o("Nhập tên và tag!","error");try{const P=await c.createGuild(v,i,y,x);o(P.message,"success"),t.player=P.player,k(),l.loaded=!1,await b()}catch(P){o(P.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",f),document.querySelectorAll(".btn-join").forEach(i=>{i.addEventListener("click",async()=>{try{const y=await c.joinGuild(v,parseInt(i.dataset.gid));o(y.message,"success"),l.loaded=!1,await b()}catch(y){o(y.message,"error")}})}),(n=document.getElementById("btnContribute"))==null||n.addEventListener("click",async()=>{var y;const i=parseInt(((y=document.getElementById("contributeAmt"))==null?void 0:y.value)||0);if(!(i<=0))try{const x=await c.contributeGuild(v,i);o(x.message,"success"),t.player=x.player,k(),await b()}catch(x){o(x.message,"error")}}),(e=document.getElementById("btnUpgradeGuild"))==null||e.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const i=await c.upgradeGuild(v);o(i.message,"success"),await b()}catch(i){o(i.message,"error")}}),(s=document.getElementById("btnPayUpkeep"))==null||s.addEventListener("click",async()=>{try{const i=await c.payGuildUpkeep(l.data.guild.id);o(i.message,"success"),await b()}catch(i){o(i.message,"error")}}),(d=document.getElementById("btnLeave"))==null||d.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const i=await c.leaveGuild(v);o(i.message,"success"),l.loaded=!1,await b()}catch(i){o(i.message,"error")}})}l.loaded?h():b()}function Pt(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;t._profile||(t._profile={results:[],viewing:null,searchQuery:""});const l=t._profile;function b(){r.innerHTML=`
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
          ${l.results.map(p=>`
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
      `:!l.viewing&&l.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,h()}function f(p){var n,e,s;const u=p.id===v,m=p.maxHp>0?Math.round(p.currentHp/p.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((n=p.name[0])==null?void 0:n.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${p.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${p.level} · ${((e=p.realmInfo)==null?void 0:e.fullName)||"Phàm Nhân"}
                ${p.guild?` · <span style="color:var(--blue)">[${p.guild.tag}] ${p.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${g[p.currentArea]||p.currentArea}
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
              <div style="height:100%;width:${m}%;background:${m>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          ${u?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${p.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${p.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function h(){var p,u,m,g,n;(p=document.getElementById("btnSearch"))==null||p.addEventListener("click",T),(u=document.getElementById("searchInput"))==null||u.addEventListener("keydown",e=>{e.key==="Enter"&&T()}),document.querySelectorAll(".btn-view, [data-view]").forEach(e=>{e.addEventListener("click",async()=>{const s=e.dataset.vid||e.dataset.view;try{const d=await c.getPlayerProfile(s);l.viewing=d.profile,b()}catch(d){o(d.message,"error")}})}),(m=document.getElementById("btnAttack"))==null||m.addEventListener("click",async()=>{const e=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${l.viewing.name}?`))try{const s=await c.mugPlayer(v,e);o(s.message,s.won?"success":"error"),s.player&&(t.player=s.player,k())}catch(s){o(s.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const e=document.getElementById("btnAddFriend").dataset.tid;try{const s=await c.addFriend(v,e);o(s.message||"Đã gửi lời mời!","success")}catch(s){o(s.message,"error")}}),(n=document.getElementById("btnBackSearch"))==null||n.addEventListener("click",()=>{l.viewing=null,b()})}async function T(){var m;const p=document.getElementById("searchInput"),u=(m=p==null?void 0:p.value)==null?void 0:m.trim();if(!u||u.length<2)return o("Nhập ít nhất 2 ký tự!","error");l.searchQuery=u,l.viewing=null;try{const g=await c.searchPlayers(u);l.results=g.players||[],b()}catch(g){o(g.message,"error")}}b()}function It(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;t._arena||(t._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const l=t._arena;async function b(){try{l.data=await c.getArena(v),l.loaded=!0,f()}catch(T){o(T.message,"error")}}function f(){var e,s,d,i,y,x,$,w;const T=l.data,p=(T==null?void 0:T.arena)||{},u=p.rank||{},m=parseInt(p.streak)||0,g=m>=5?`🔥x${m}`:m>=3?`⚡x${m}`:m>0?`${m}W`:m<0?`${Math.abs(m)}L`:"",n=m>=5?"var(--gold)":m>=3?"var(--orange)":m>0?"var(--green)":m<0?"var(--red)":"var(--text-dim)";r.innerHTML=`
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
              ELO: <strong>${p.rating||1e3}</strong> · ${p.wins||0}W/${p.losses||0}L
              ${g?` · <span style="color:${n};font-weight:700">${g}</span>`:""}
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
      ${(e=l.lastResult)!=null&&e.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(s=l.lastResult.newRank)==null?void 0:s.icon}</div>
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
            Đối thủ: <strong>${(i=l.lastResult.opponent)==null?void 0:i.name}</strong> 
            ${(y=l.lastResult.opponent)!=null&&y.rank?l.lastResult.opponent.rank.icon:""} 
            (ELO ${(x=l.lastResult.opponent)==null?void 0:x.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${l.lastResult.ratingChange>0?"+":""}${l.lastResult.ratingChange}
            ${l.lastResult.goldEarned>0?` · +${l.lastResult.goldEarned} 💎`:""}
          </div>
          ${($=l.lastResult.combatLog)!=null&&$.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${l.lastResult.combatLog.map(L=>`<div>${L}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(T.opponents||[]).length>0?(T.opponents||[]).map(L=>{var S,C,M;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((S=L.rank)==null?void 0:S.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${L.name} <span style="opacity:0.4;font-size:11px">Lv.${L.level}</span></div>
                <div style="font-size:11px;color:${((C=L.rank)==null?void 0:C.color)||"#888"}">${((M=L.rank)==null?void 0:M.name)||"Đồng"} · ELO ${L.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${L.player_id}" ${l.fighting?"disabled":""}>⚔️ Đấu</button>
            </div>
          `}).join(""):'<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${l.fighting?"disabled":""}>🎲 Đấu Ngẫu Nhiên (${T.entryFee||50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(T.top10||[]).map((L,S)=>{var C,M;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${S<3?"var(--gold)":"var(--text-dim)"}">#${S+1}</span>
                <span>${((C=L.rank)==null?void 0:C.icon)||""}</span>
                <span style="flex:1">${L.name}</span>
                <span style="color:${((M=L.rank)==null?void 0:M.color)||"var(--blue)"}; font-weight:600">${L.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(T.history||[]).map(L=>{const S=L.winner_id===v;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${S?"var(--green)":"var(--red)"}">
                  ${S?"✅":"❌"} vs ${L.attacker_id===v?L.defender_name:L.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${L.rating_change>0?"+":""}${L.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,r.querySelectorAll(".btn-fight-opp").forEach(L=>{L.addEventListener("click",S=>h(S.target.dataset.oid))}),(w=document.getElementById("btnRandomFight"))==null||w.addEventListener("click",()=>h(null))}async function h(T){l.fighting=!0,f();try{const p=await c.request(`/player/${v}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:T})});l.lastResult=p,t.player=p.player,k(),o(p.message,p.won?"success":"error"),l.fighting=!1,await b()}catch(p){o(p.message,"error"),l.fighting=!1,f()}}l.loaded?f():b()}function Ht(r,a){const{state:t,api:c,notify:o,updateSidebar:k,renderGame:v}=a,l=t.playerId,b=t._auctionTab||"browse";async function f(){try{const[p,u]=await Promise.all([c.getAuctions(),c.getMyAuctions(l)]);t._auctionListings=p.listings||[],t._auctionMine=u.listings||[],h()}catch(p){o(p.message,"error")}}function h(){const p=t._auctionListings||[],u=t._auctionMine||[],m=(t.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");r.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${b==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${b==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${b==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${u.length})</button>
      </div>

      ${b==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':p.map(g=>{const n=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
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
          ${u.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':u.map(g=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(g.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${g.status==="active"?"var(--green)":g.status==="sold"?"var(--gold)":"var(--red)"}">${g.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${g.buyout_price}</div>
                </div>
                ${g.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${g.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,T()}function T(){var p;r.querySelectorAll(".tab-btn").forEach(u=>u.addEventListener("click",()=>{t._auctionTab=u.dataset.tab,f()})),r.querySelectorAll(".btn-buy").forEach(u=>u.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const m=await c.buyAuction(l,parseInt(u.dataset.lid));o(m.message,"success"),t.player=m.player,k(),await f()}catch(m){o(m.message,"error")}})),r.querySelectorAll(".btn-cancel").forEach(u=>u.addEventListener("click",async()=>{try{const m=await c.cancelAuction(l,parseInt(u.dataset.lid));o(m.message,"success"),t.player=m.player,k(),await f()}catch(m){o(m.message,"error")}})),(p=document.getElementById("btnListItem"))==null||p.addEventListener("click",async()=>{var n,e,s;const u=(n=document.getElementById("selSellItem"))==null?void 0:n.value,m=parseInt(((e=document.getElementById("inpPrice"))==null?void 0:e.value)||"500"),g=parseInt(((s=document.getElementById("selDuration"))==null?void 0:s.value)||"24");try{const d=await c.listAuction(l,u,m,g);o(d.message,"success"),t.player=d.player,k(),t._auctionTab="mine",await f()}catch(d){o(d.message,"error")}})}f()}function qt(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;async function l(){try{const f=await c.getDailyQuests(v);t._dailyQuests=f,b()}catch(f){o(f.message,"error")}}function b(){const f=t._dailyQuests||{},h=f.quests||[];f.allCompleted;const T=f.bonusReward;r.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${h.map(p=>{const u=p.quest_info||{},m=p.target>0?Math.min(100,Math.round(p.progress/p.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${p.claimed?"var(--text-dim)":p.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${u.name||p.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${u.difficulty==="Khó"?"var(--red)":u.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${u.difficulty||"?"}</span>
              </div>
              ${p.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':p.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${p.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${p.progress}/${p.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${u.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${m}%;background:${p.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${u.goldReward||0} · ✨ ${u.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${T?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${T.gold} 💎, +${T.xp} EXP</div>
      </div>
      `:""}
    `,r.querySelectorAll(".btn-claim").forEach(p=>p.addEventListener("click",async()=>{try{const u=await c.claimDailyQuest(v,parseInt(p.dataset.qid));o(u.message,"success"),t.player=u.player,k(),await l()}catch(u){o(u.message,"error")}}))}l()}function Nt(r,a){const{state:t,api:c,notify:o,updateSidebar:k}=a,v=t.playerId;async function l(){try{t._worldBoss=await c.getWorldBoss(),b()}catch(f){o(f.message,"error")}}function b(){var g;const f=t._worldBoss||{},h=f.boss||{},T=f.hpPercent||0,p=f.topContributors||[],u=f.rewards||{},m=h.status==="active"&&h.current_hp>0;r.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${m?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${h.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${h.level||"?"} · ${m?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(h.current_hp||0).toLocaleString()} / ${(h.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${T}%;background:${T>50?"var(--red)":T>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${m?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${u.gold||0} · ✨ ${u.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':p.map((n,e)=>{var s;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${e<3?"var(--gold)":"var(--text-dim)"}">#${e+1}</span>
                <span style="flex:1">${n.name}</span>
                <span style="color:var(--red)">${(s=n.total_damage)==null?void 0:s.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${n.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const n=document.getElementById("btnAttackBoss");n.disabled=!0,n.textContent="⏳ Đang giao chiến...";const e=document.getElementById("bossCombatResult");try{const s=await c.attackWorldBoss(v);if(t.player=s.player,k(),s.log&&s.log.length>0){const d=s.log.map($=>$.startsWith("---")?`<div class="turn">${$}</div>`:$.includes("hụt")?`<div class="miss">${$}</div>`:$.includes("né được")?`<div class="dodge">${$}</div>`:$.includes("CHÍNH MẠNG")||$.includes("💥")?`<div class="crit">${$}</div>`:$.includes("🔥")?`<div class="heavy text-orange">${$}</div>`:$.includes("chặn hoàn toàn")||$.includes("🛡")?`<div class="dodge">${$}</div>`:$.includes("ngã xuống")||$.includes("💀")?`<div class="death">${$}</div>`:$.includes("Chiến thắng")||$.includes("🏆")?`<div class="victory">${$}</div>`:$.includes("bỏ chạy")||$.includes("🏃")?`<div class="flee">${$}</div>`:$.includes("Bất phân")||$.includes("🤝")?`<div class="stalemate">${$}</div>`:$.includes("🧪")?`<div class="status-effect text-purple">${$}</div>`:$.includes("💔")?`<div class="dot-damage text-purple bold">${$}</div>`:$.includes("✨")?`<div class="regen text-green">${$}</div>`:`<div class="hit">${$}</div>`).join(""),i={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},y=i[s.outcome]||i.loss,x=Math.max(0,t.player.currentHp/t.player.maxHp*100);e.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${y.icon} ${y.text}
                <span class="subtitle">${s.turns}/${s.maxTurns||25} lượt · ⚔️ ${s.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${y.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${t.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${x}%"></div></div>
                    <div class="mini-hp-val">${t.player.currentHp}/${t.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${h.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(s.bossHp/s.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${s.bossHp.toLocaleString()}/${s.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${d}</div>
            </div>`}s.defeated?o(s.message,"success"):o(`⚔️ ${s.damage} dmg!`,"info"),await l()}catch(s){o(s.message,"error"),n.disabled=!1,n.textContent="⚔️ Tấn Công"}})}l()}function _t(r,a){const{state:t,api:c,notify:o,updateSidebar:k,renderGame:v}=a,l=t.playerId,b={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function f(){var T;try{const[p,u]=await Promise.all([c.getGachaPools(),c.getGachaPity(l)]);t._gacha={pools:p.pools||{},pity:u.pity||{},results:((T=t._gacha)==null?void 0:T.results)||[]},h()}catch(p){o(p.message,"error")}}function h(){const T=t._gacha||{},p=T.pools||{},u=T.pity||{},m=T.results||[];r.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(p).map(([g,n])=>{var s,d,i;const e=u[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${n.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${b.legendary}">★ ${(s=n.rates)==null?void 0:s.legendary}%</span> ·
                <span style="color:${b.rare}">◆ ${(d=n.rates)==null?void 0:d.rare}%</span> ·
                <span style="color:${b.uncommon}">● ${(i=n.rates)==null?void 0:i.uncommon}%</span>
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
            ${m.map(g=>{var n,e,s,d;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${b[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((n=g.item)==null?void 0:n.slot)==="weapon"?"⚔️":((e=g.item)==null?void 0:e.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${b[g.rarity]}">${((s=g.item)==null?void 0:s.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((d=g.item)==null?void 0:d.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,r.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const n=g.dataset.pool,e=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const s=await c.gachaPull(t.playerId,n,e);o(s.message,"success"),t.player=s.player,k(),t._gacha.results=s.results||[],t._gacha.pity[n]=s.pity,h()}catch(s){o(s.message,"error"),g.disabled=!1}}))}f()}function Bt(r,a){const{state:t,api:c,notify:o}=a;t._lbTab||(t._lbTab="level");async function k(){const l=t._lbTab||"level";r.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const b=await c.getLeaderboard(l);t._lbData=b,v()}catch(b){r.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${b.message}
      </div></div>`}}function v(){const l=t._lbTab||"level",f=(t._lbData||{}).rankings||[],T=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(u=>`
      <button class="skill-tab ${l===u.id?"active":""}" data-tab="${u.id}">
        ${u.icon} ${u.name}
      </button>
    `).join("");let p="";f.length===0?p='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':l==="guild"?p=f.map((u,m)=>`
        <div class="lb-row ${m<3?"lb-top":""}">
          <div class="lb-rank ${m<3?"lb-rank-top":""}">${m<3?["🥇","🥈","🥉"][m]:"#"+(m+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${u.tag}] ${u.name}</div>
            <div class="lb-sub">👤 ${u.members}/${u.max_members} · Leader: ${u.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(u.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${u.level}</div>
          </div>
        </div>
      `).join(""):l==="pvp"?p=f.map((u,m)=>`
        <div class="lb-row ${m<3?"lb-top":""}">
          <div class="lb-rank ${m<3?"lb-rank-top":""}">${m<3?["🥇","🥈","🥉"][m]:"#"+(m+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${u.name}</div>
            <div class="lb-sub">Lv.${u.level} · ${u.wins||0}W/${u.losses||0}L${u.streak>0?` · 🔥${u.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${u.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):p=f.map((u,m)=>`
        <div class="lb-row ${m<3?"lb-top":""}">
          <div class="lb-rank ${m<3?"lb-rank-top":""}">${m<3?["🥇","🥈","🥉"][m]:"#"+(m+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${u.name}</div>
            <div class="lb-sub">${u.realm_tier?`Cảnh giới ${u.realm_tier}`:""} ${l==="level"?`· Lv.${u.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${l==="gold"?`💎 ${parseInt(u.gold||0).toLocaleString()}`:`Lv.${u.level}`}
            </div>
          </div>
        </div>
      `).join(""),r.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${T}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${p}
        </div>
      </div>
    `,r.querySelectorAll(".skill-tab[data-tab]").forEach(u=>{u.addEventListener("click",()=>{t._lbTab=u.dataset.tab,k()})})}k()}const E={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},nt=document.getElementById("app"),J={get state(){return E},api:H,notify:z,renderGame:q,updateSidebar:Gt};async function zt(){const r=localStorage.getItem("playerId");if(r&&!E.playerId)try{const a=await H.getPlayer(r);E.playerId=r,E.player=a.player,await V(),q();return}catch{localStorage.removeItem("playerId")}E.playerId?q():it()}function it(){var a,t;const r=E.authTab||"login";nt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(c=>{c.addEventListener("click",()=>{E.authTab=c.dataset.auth,it()})}),(a=document.getElementById("btnLogin"))==null||a.addEventListener("click",async()=>{const c=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value;if(!c||!o)return z("Vui lòng nhập đầy đủ","error");try{const k=await H.login(c,o);E.playerId=k.id,E.player=k.player,localStorage.setItem("playerId",k.id),z(k.message,"success"),await V(),q()}catch(k){z(k.message||"Đăng nhập thất bại!","error")}}),(t=document.getElementById("btnRegister"))==null||t.addEventListener("click",async()=>{var l,b;const c=document.getElementById("inpUsername").value.trim(),o=document.getElementById("inpPassword").value,k=((l=document.getElementById("inpName"))==null?void 0:l.value.trim())||"Vô Danh",v=((b=document.querySelector('input[name="gender"]:checked'))==null?void 0:b.value)||"male";if(!c||!o)return z("Vui lòng nhập đầy đủ","error");try{const f=await H.register(c,o,k,v);E.playerId=f.id,E.player=f.player,localStorage.setItem("playerId",f.id),z(f.message,"success"),await V(),q()}catch(f){z(f.message||"Đăng ký thất bại!","error")}})}function st(r){const a=Math.floor(Date.now()/1e3),t=[];return r.hospitalUntil&&r.hospitalUntil>a&&t.push({icon:"🏥",label:"Tịnh dưỡng",endTime:r.hospitalUntil,color:"var(--red)"}),r.medCooldownUntil&&r.medCooldownUntil>a&&t.push({icon:"💊",label:"Đan độc",endTime:r.medCooldownUntil,color:"var(--orange)"}),r.jailUntil&&r.jailUntil>a&&t.push({icon:"⛓️",label:"Ngục tù",endTime:r.jailUntil,color:"var(--purple)"}),r.travelArrivesAt&&r.travelArrivesAt>a&&t.push({icon:"🚶",label:"Di chuyển",endTime:r.travelArrivesAt,color:"var(--blue)"}),t.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${t.map(c=>{const o=Math.max(0,c.endTime-a),k=Math.floor(o/60),v=o%60,l=k>0?`${k}p${String(v).padStart(2,"0")}s`:`${v}s`;return`<span class="status-icon" data-end="${c.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${c.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${c.color};white-space:nowrap;
      " title="${c.label}">${c.icon} <span class="cd-time">${l}</span></span>`}).join("")}
  </div>`}let G=null;function Ot(){G&&clearInterval(G),G=setInterval(()=>{const r=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(a=>{const t=parseInt(a.dataset.end),c=Math.max(0,t-r);if(c<=0){a.remove();return}const o=Math.floor(c/60),k=c%60,v=a.querySelector(".cd-time");v&&(v.textContent=o>0?`${o}p${String(k).padStart(2,"0")}s`:`${k}s`)}),document.querySelectorAll(".status-effects").forEach(a=>{a.children.length===0&&a.remove()})},1e3)}function rt(r){let a="";const c={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[r.currentArea];return c&&(a+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${c.tooltip}">${c.icon} Cảnh Vực</span>`),r.combatBuffs&&r.combatBuffs.length>0&&r.combatBuffs.forEach(o=>{let k="💊",v="Buff";o.type==="status"&&o.stat==="poison"?(k="☠️",v="Trúng Độc"):o.type==="status"&&o.stat==="confuse"?(k="👹",v="Ma Hóa"):o.stat==="allStats"||o.stat==="hp"||o.stat==="damage"?(k="🔥",v="Cuồng Nộ"):o.stat==="defense"||o.stat==="resist"?(k="🛡️",v="Kiên Cố"):o.stat==="speed"||o.stat==="dexterity"?(k="💨",v="Thân Pháp"):(k="✨",v="Cường Hóa");let l=o.duration?` (-${o.duration} Trận)`:"",b=`Hiệu ứng: ${o.stat} (${o.type} ${o.value})${o.duration?` - Còn lại: ${o.duration} Trận đấu`:""}`;a+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${b}">${k} ${v}${l}</span>`}),a?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${a}</div>`:""}function q(){var T,p,u,m,g,n,e,s,d;const r=E.player;if(!r)return;const a=Math.max(0,r.currentHp/r.maxHp*100),t=r.maxStamina>0?Math.max(0,r.currentStamina/r.maxStamina*100):0,c=r.maxEnergy>0?Math.max(0,r.currentEnergy/r.maxEnergy*100):0,o=(r.maxNerve??15)>0?Math.max(0,(r.nerve??0)/(r.maxNerve??15)*100):0,k=E.exploration?E.exploration[r.currentArea||"thanh_lam_tran"]:null,v=k?k.name:"Khám Phá";nt.innerHTML=`
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
          <div class="player-meta">Lv.${r.level} · ${((T=r.realmInfo)==null?void 0:T.fullName)||"?"}</div>
          ${st(r)}
          ${rt(r)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${r.currentHp}/${r.maxHp}
                ${r.currentHp<r.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(p=r.skills)!=null&&p.some(i=>i.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${a}%" data-low="${a<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${r.currentStamina??100}/${r.maxStamina??100}
                ${(r.currentStamina??100)<(r.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((u=r.stats)==null?void 0:u.staminaRegen)??10}/10s</span>`:""}
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
            <div class="bar-track"><div class="bar-fill energy" style="width:${c}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${r.nerve??0}/${r.maxNerve??15}${(r.nerve??0)<(r.maxNerve??15)?'<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+1/5min</span>':""}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${o}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:4px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:6px">💎 ${r.gold??0} Linh Thạch</div>
          </div>
          <div class="sidebar-action-bar" style="display:flex;gap:4px;padding:0 0 8px">
            <button class="btn btn--dark nav-item ${E.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:6px;font-size:14px;position:relative;justify-content:center" title="Thông Báo">
              📜${(r.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-4px;right:-4px;background:var(--red);width:8px;height:8px;padding:0;border-radius:50%"></span>':""}
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
            📍 ${v} ${r.hospitalRemaining>0?'<span style="color:var(--red)">🏥 Tịnh dưỡng</span>':r.travelRemaining>0?'<span style="color:var(--blue)">🚶 Di chuyển...</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(r.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <li class="nav-section">TỰ THÂN</li>
          <li class="nav-item ${E.currentPage==="stats"?"active":""}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${(n=(g=E.player)==null?void 0:g.realmInfo)!=null&&n.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="inventory"?"active":""}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(r.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)">⏳</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="skills"||E.currentPage==="education"?"active":""}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>


          <li class="nav-item ${["travel","dungeon","tiencanh"].includes(E.currentPage)?"active":""}" data-page="travel">
            <span class="icon">🚶</span> Ngao Du
            ${(r.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
          </li>
          <li class="nav-item ${E.currentPage==="quests"||E.currentPage==="dailyquest"?"active":""}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(r.activeQuests||[]).filter(i=>i.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(r.activeQuests||[]).filter(i=>i.status==="active").length}</span>`:""}
          </li>
          <li class="nav-item ${E.currentPage==="crimes"?"active":""}" data-page="crimes">
            <span class="icon">💀</span> Ác Nghiệp
          </li>

          <li class="nav-section">NGAO DU</li>
          <li class="nav-item ${E.currentPage==="combat"?"active":""}" data-page="combat">
            <span class="icon">🔍</span> Khám Phá (${v})
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

          ${r.role==="admin"?`
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(i=>{i.addEventListener("click",()=>{E.currentPage=i.dataset.page,q()})}),(e=document.getElementById("btnFabChat"))==null||e.addEventListener("click",()=>D("chat")),(s=document.getElementById("btnFabSocial"))==null||s.addEventListener("click",()=>D("social"));const l=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');l&&l.addEventListener("click",i=>{i.stopPropagation(),E.currentPage="events",E.popupOpen=!1,q()}),(d=document.getElementById("btnPopupClose"))==null||d.addEventListener("click",()=>{E.popupOpen=!1,q()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(i=>{i.addEventListener("click",()=>D(i.dataset.popup))}),At(),E.popupOpen&&Rt();const b=document.getElementById("searchPlayerInput"),f=document.getElementById("searchResults");let h=null;b&&f&&(b.addEventListener("input",()=>{clearTimeout(h);const i=b.value.trim();if(i.length<2){f.style.display="none";return}h=setTimeout(async()=>{try{const y=await H.searchPlayers(i),x=y.players||y.results||[];x.length===0?f.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':f.innerHTML=x.map($=>{var w;return`
              <div class="search-result" data-pid="${$.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${$.name} <span style="opacity:0.4">Lv.${$.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((w=$.realmInfo)==null?void 0:w.name)||""}</span>
              </div>
            `}).join(""),f.style.display="block",f.querySelectorAll(".search-result").forEach($=>{$.addEventListener("click",()=>{E.currentPage="profile",E._viewProfileId=$.dataset.pid,f.style.display="none",b.value="",q()}),$.addEventListener("mouseenter",()=>$.style.background="rgba(255,255,255,0.08)"),$.addEventListener("mouseleave",()=>$.style.background="transparent")})}catch{f.style.display="none"}},300)}),b.addEventListener("blur",()=>{setTimeout(()=>{f.style.display="none"},200)}),b.addEventListener("keydown",i=>{i.key==="Escape"&&(f.style.display="none",b.blur())})),Ot()}function D(r){E.popupOpen=!0,E.popupPage=r,q()}function Rt(){const r=document.getElementById("popupContent");r&&(E.popupPage==="chat"?at(r,J):E.popupPage==="social"&&et(r,J))}const jt={combat:ct,crimes:yt,education:Y,stats:ut,skills:vt,inventory:K,travel:tt,alchemy:F,quests:bt,admin:xt,social:et,chat:at,market:ft,realm:$t,events:Tt,dungeon:Z,housing:Ct,wiki:St,npcshop:Et,guild:Mt,library:X,profile:Pt,arena:It,auction:Ht,dailyquest:qt,worldboss:Nt,gacha:_t,leaderboard:Bt,tiencanh:wt,tower:Lt};function At(){const r=document.getElementById("pageContent");if(!r)return;const a=jt[E.currentPage];a&&a(r,J)}function Gt(){var k,v,l,b,f;const r=E.player;if(!r)return;const a=Math.max(0,r.currentHp/r.maxHp*100),t=r.maxEnergy>0?Math.max(0,r.currentEnergy/r.maxEnergy*100):0,c=document.querySelector(".sidebar-player");if(c){const h=r.maxStamina>0?Math.max(0,r.currentStamina/r.maxStamina*100):0,T=(r.maxNerve??15)>0?Math.max(0,(r.nerve??0)/(r.maxNerve??15)*100):0;c.innerHTML=`
      <div class="player-name">${r.name}</div>
      <div class="player-meta">Lv.${r.level} · ${((k=r.realmInfo)==null?void 0:k.fullName)||"?"}</div>
      ${st(r)}
      ${rt(r)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${r.currentHp}/${r.maxHp}
            ${r.currentHp<r.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(v=r.skills)!=null&&v.some(p=>p.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
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
        <div class="bar-track"><div class="bar-fill stamina" style="width:${h}%"></div></div>
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
        <div class="bar-track"><div class="bar-fill nerve" style="width:${T}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${r.gold??0} Linh Thạch</div>`}const o=document.querySelector('.nav-item[data-page="stats"]');if(o){let h="";r.statPoints>0&&(h+=`<span class="badge">${r.statPoints}</span>`),(f=r.realmInfo)!=null&&f.canBreakthrough&&(h+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),o.querySelectorAll(".badge").forEach(T=>T.remove()),o.insertAdjacentHTML("beforeend",h)}}async function V(){try{const[r,a,t,c,o,k]=await Promise.all([H.getMonsters(),H.getSkills(),H.getItems(),H.getMedicines(),H.getCrimes(),H.getEducation()]);E.monsters=r.monsters||[],E.skills=a.skills||[],E.items=t.items||[],E.medicines=c.medicines||[],E.crimes=o.crimes||[],E.educationTrees=k.trees||[],E.exploration=await H.getExploration(),E.recipes=(await H.getRecipes()).recipes,E.npcs=(await H.getNpcs()).npcs||[]}catch(r){console.error("Lỗi tải dữ liệu:",r)}}function z(r,a="info"){var c;(c=document.querySelector(".notification"))==null||c.remove();const t=document.createElement("div");t.className=`notification ${a}`,t.textContent=r,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}zt();
//# sourceMappingURL=index-DIyZ_3ol.js.map
