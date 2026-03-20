(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))c(l);new MutationObserver(l=>{for(const T of l)if(T.type==="childList")for(const u of T.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function t(l){const T={};return l.integrity&&(T.integrity=l.integrity),l.referrerPolicy&&(T.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?T.credentials="include":l.crossOrigin==="anonymous"?T.credentials="omit":T.credentials="same-origin",T}function c(l){if(l.ep)return;l.ep=!0;const T=t(l);fetch(l.href,T)}})();const lt="/api";class ot{async request(e,t={}){try{const c=await fetch(`${lt}${e}`,{headers:{"Content-Type":"application/json",...t.headers},...t}),l=await c.json();if(!c.ok)throw new Error(l.error||`HTTP ${c.status}`);return l}catch(c){throw console.error(`API Error [${e}]:`,c),c}}register(e,t,c,l){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:e,password:t,name:c,gender:l})})}login(e,t){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})})}createPlayer(e,t){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:e,gender:t})})}getPlayer(e){return this.request(`/player/${e}`)}allocateStat(e,t,c=1){return this.request(`/player/${e}/allocate`,{method:"POST",body:JSON.stringify({stat:t,points:c})})}equipItem(e,t){return this.request(`/player/${e}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}learnSkill(e,t){return this.request(`/player/${e}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:t})})}equipSkill(e,t,c=!0){return this.request(`/player/${e}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:t,equip:c})})}healPlayer(e){return this.request(`/player/${e}/heal`,{method:"POST"})}useMedicine(e,t){return this.request(`/player/${e}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}trainStat(e,t){return this.request(`/player/${e}/train`,{method:"POST",body:JSON.stringify({stat:t})})}fullCombat(e,t=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e,monsterId:t})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(e,t){return this.request(`/player/${e}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}useItem(e,t){return this.request(`/player/${e}/use`,{method:"POST",body:JSON.stringify({itemId:t})})}useMedicine(e,t){return this.request(`/player/${e}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}generateItem(e,t){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,playerId:e})})}trainStat(e,t,c=1){return this.request(`/player/${e}/train`,{method:"POST",body:JSON.stringify({stat:t,count:c})})}allocateStat(e,t){return this.request(`/player/${e}/allocate`,{method:"POST",body:JSON.stringify({stat:t})})}attemptBreakthrough(e){return this.request(`/player/${e}/breakthrough`,{method:"POST"})}getRealm(e){return this.request(`/player/${e}/realm`)}craftItem(e,t){return this.request(`/player/${e}/craft`,{method:"POST",body:JSON.stringify({recipeId:t})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(e,t,c,l=-1){return this.request(`/player/${e}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:c,lockAffixIndex:l})})}commitCrime(e,t){return this.request(`/player/${e}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:t})})}escapeJail(e){return this.request(`/player/${e}/escape-jail`,{method:"POST"})}bail(e){return this.request(`/player/${e}/bail`,{method:"POST"})}enrollNode(e,t,c){return this.request(`/player/${e}/enroll`,{method:"POST",body:JSON.stringify({nodeId:t,treeId:c})})}checkEducation(e){return this.request(`/player/${e}/check-education`,{method:"POST"})}generateItem(e="common",t=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,slot:t})})}explore(e){return this.request(`/player/${e}/explore`,{method:"POST"})}trackMonster(e,t){return this.request(`/player/${e}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:t})})}getAreaMonsters(e){return this.request(`/player/${e}/area-monsters`)}getNpc(e){return this.request(`/npc/${e}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(e,t,c){return this.request(`/player/${e}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:t,questId:c})})}completeQuest(e,t){return this.request(`/player/${e}/complete-quest`,{method:"POST",body:JSON.stringify({questId:t})})}getQuests(e){return this.request(`/player/${e}/quests`)}searchPlayers(e){return this.request(`/players/search?q=${encodeURIComponent(e)}`)}getRelationships(e){return this.request(`/player/${e}/relationships`)}interactPlayer(e,t,c,l){return this.request(`/player/${e}/interact`,{method:"POST",body:JSON.stringify({targetId:t,action:c,amount:l})})}addFriend(e,t){return this.request(`/player/${e}/add-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}acceptFriend(e,t){return this.request(`/player/${e}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}rejectFriend(e,t){return this.request(`/player/${e}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}removeFriend(e,t){return this.request(`/player/${e}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}addEnemy(e,t){return this.request(`/player/${e}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}removeEnemy(e,t){return this.request(`/player/${e}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}getGlobalChat(e=0){return this.request(`/chat/global?afterId=${e}`)}getPrivateChat(e,t,c=0){return this.request(`/chat/private/${e}?with=${t}&afterId=${c}`)}getChatFriends(e){return this.request(`/chat/friends/${e}`)}sendChat(e,t,c,l){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:e,channel:t,receiverId:c,message:l})})}getMarketListings(e="",t="newest"){const c=new URLSearchParams;return e&&c.set("type",e),t&&c.set("sort",t),this.request(`/market?${c.toString()}`)}getMyListings(e){return this.request(`/market/my/${e}`)}listForSale(e,t,c,l,T){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:e,itemType:t,itemId:c,quantity:l,price:T})})}buyFromMarket(e,t,c=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:e,listingId:t,quantity:c})})}cancelListing(e,t){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:e,listingId:t})})}getRealmInfo(e){return this.request(`/player/${e}/realm`)}attemptBreakthrough(e){return this.request(`/player/${e}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(e){return this.request(`/player/${e}/mug-targets`)}mugPlayer(e,t){return this.request(`/player/${e}/mug`,{method:"POST",body:JSON.stringify({victimId:t})})}getMugLog(e){return this.request(`/player/${e}/mug-log`)}getMapItems(e){return this.request(`/player/${e}/map-items`)}enterDungeon(e,t){return this.request(`/player/${e}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:t})})}fightDungeonWave(e){return this.request(`/player/${e}/dungeon/fight`,{method:"POST"})}abandonDungeon(e){return this.request(`/player/${e}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(e){return this.request(`/player/${e}/dungeon/history`)}getHousing(e){return this.request(`/player/${e}/housing`)}buyHousing(e){return this.request(`/player/${e}/housing/buy`,{method:"POST"})}plantHerb(e,t,c){return this.request(`/player/${e}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:t,slotIndex:c})})}harvestGarden(e){return this.request(`/player/${e}/housing/harvest`,{method:"POST"})}upgradeFormation(e,t){return this.request(`/player/${e}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:t})})}payMaintenance(e){return this.request(`/player/${e}/housing/maintenance`,{method:"POST"})}listForRent(e,t){return this.request(`/player/${e}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:t})})}getRentals(){return this.request("/housing/rentals")}rentRoom(e,t){return this.request(`/player/${e}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:t})})}getMyGuild(e){return this.request(`/player/${e}/guild`)}createGuild(e,t,c,l){return this.request(`/player/${e}/guild/create`,{method:"POST",body:JSON.stringify({name:t,tag:c,description:l})})}contributeGuild(e,t){return this.request(`/player/${e}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:t})})}upgradeGuild(e){return this.request(`/player/${e}/guild/upgrade`,{method:"POST"})}joinGuild(e,t){return this.request(`/player/${e}/guild/join`,{method:"POST",body:JSON.stringify({guildId:t})})}leaveGuild(e){return this.request(`/player/${e}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(e){return this.request(`/guild/${e}/upkeep`,{method:"POST"})}getTribulation(e){return this.request(`/player/${e}/tribulation`)}fightTribulation(e){return this.request(`/player/${e}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(e,t,c,l=-1){return this.request(`/player/${e}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:c,lockAffixIndex:l})})}getShops(e){return this.request("/shops")}buyFromShop(e,t,c,l=1){return this.request(`/player/${e}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:t,itemId:c,quantity:l})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(e){return this.request(`/players/lookup?q=${encodeURIComponent(e)}`)}getPlayerProfile(e){return this.request(`/player/${e}/profile`)}getArena(e){return this.request(`/player/${e}/arena`)}arenaFight(e){return this.request(`/player/${e}/arena/fight`,{method:"POST"})}getAuctions(e=""){return this.request(`/auction${e?"?q="+encodeURIComponent(e):""}`)}getMyAuctions(e){return this.request(`/player/${e}/auction/mine`)}listAuction(e,t,c,l=24){return this.request(`/player/${e}/auction/list`,{method:"POST",body:JSON.stringify({itemId:t,buyoutPrice:c,durationHours:l})})}buyAuction(e,t){return this.request(`/player/${e}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:t})})}cancelAuction(e,t){return this.request(`/player/${e}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:t})})}getDailyQuests(e){return this.request(`/player/${e}/daily-quests`)}claimDailyQuest(e,t){return this.request(`/player/${e}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:t})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(e){return this.request(`/player/${e}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(e){return this.request(`/player/${e}/gacha/pity`)}gachaPull(e,t,c=1){return this.request(`/player/${e}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:t,pulls:c})})}getLeaderboard(e){return this.request(`/leaderboard/${e}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(e){return this.request(`/events/quick/${e}`,{method:"POST"})}}const q=new ot;function ct(s,e){var g;const{state:t,api:c,notify:l,renderGame:T,updateSidebar:u}=e,d=t.player,v=t.exploration?t.exploration[d.currentArea||"thanh_lam_tran"]:null,f=v?v.name:"Vùng Đất Vô Danh",m=v?v.staminaCost:10;s.innerHTML=`
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
          <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${m} Thể Lực</span>
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
    </div>`;const h=((g=d.insightLevels)==null?void 0:g.monster)??0;(async()=>{try{const a=await c.getAreaMonsters(d.id);if(a.monsters){t.player.trackedMonsters=a.monsters;const r=document.getElementById("trackedMonstersList");if(!r)return;if(a.monsters.length===0){r.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}r.innerHTML=a.monsters.map(o=>{var M,P,I,N,R;const n=o.currentHp/o.stats.hp*100,x=n>60?"var(--green)":n>30?"var(--orange)":"var(--red)";let $='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';h>=1&&($=`<div class="item-desc text-sm text-dim mb-sm">${o.description||"Yêu thú vùng này."}</div>`);let w="";h>=1&&(w=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${n}%; background: ${x}; height: 100%;"></div>
            </div>`);let k=h>=2?`❤ ${o.currentHp}/${o.stats.hp}`:h>=1?"❤ ???":"",L="";h>=3&&(L=`
              <span class="text-orange">💪 ${o.stats.strength}</span>
              <span class="text-cyan">🏃 ${o.stats.speed}</span>
              <span class="text-green">🎯 ${o.stats.dexterity}</span>
              <span class="text-blue">🛡 ${o.stats.defense}</span>`);let S="";h>=4&&o.drops&&o.drops.length>0&&(S=`<div class="text-xs text-dim mt-sm" style="display:flex;gap:4px;flex-wrap:wrap;">
              📦 ${o.drops.map(B=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:9px;padding:1px 4px;">${B.id} (${h>=5?B.chance+"%":"?%"})</span>`).join("")}
            </div>`);let E="";if(h>=5){const B=((M=o.goldReward)==null?void 0:M[0])??((P=o.goldReward)==null?void 0:P.min)??"?",_=((I=o.goldReward)==null?void 0:I[1])??((N=o.goldReward)==null?void 0:N.max)??"?";E=`<span class="text-gold">💰 ${B}-${_}</span> <span class="text-purple">✨ ${o.xpReward??"?"} XP</span>`}return`
            <div class="list-item flex flex-col items-start gap-4">
              <div class="item-info" style="width: 100%;">
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-name text-lg">${o.name} <span class="text-xs text-dim">(${((R=o.instance_id)==null?void 0:R.substring(0,8))??""})</span></div>
                  <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${o.instance_id}" data-mid="${o.id}">Giao Chiến</button>
                </div>
                ${$}
                ${w}
                <div class="item-meta flex gap-4 text-xs flex-wrap">
                  ${k?`<span class="text-red">${k}</span>`:""}
                  ${L}
                  ${E}
                </div>
                ${S}
              </div>
            </div>`}).join(""),r.querySelectorAll(".btn-attack-tracked").forEach(o=>{o.addEventListener("click",n=>{const x=n.currentTarget;W(e,x.dataset.mid,x.dataset.inst)})})}}catch(a){console.error("Lỗi tải dấu vết:",a)}})(),(async()=>{const a=document.getElementById("areaMonstersList");if(a)try{const r=await c.getAreaMonsters(d.id),i=t.exploration?t.exploration[d.currentArea||"thanh_lam_tran"]:null,o=(t.monsters||[]).filter(x=>!x.isWorldBoss&&!x.is_world_boss),n=o.length>0?o:[];if(n.length===0){a.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không rõ quần thể yêu thú nơi đây.</div>';return}a.innerHTML=n.map(x=>{let $='<div class="item-desc text-sm text-dim mb-sm">Thông tin mờ ảo...</div>';return h>=1&&($=`<div class="item-desc text-sm text-dim mb-sm">${x.description||"Yêu thú sinh sống tại vùng này."}</div>`),`
          <div class="list-item flex flex-col items-start gap-4" style="opacity: 0.8;">
            <div class="item-info" style="width: 100%;">
              <div class="item-name text-md text-gold">${x.name} <span class="text-xs text-dim ml-sm">${x.tierName||""}</span></div>
              ${$}
            </div>
          </div>
        `}).join("")}catch(r){console.error("Lỗi tải quần thể:",r)}})();const y=document.getElementById("btnExplore");y&&y.addEventListener("click",()=>pt(e)),s.querySelectorAll(".list-item.clickable").forEach(a=>{a.addEventListener("click",()=>startCombat(a.dataset.mid,e))})}async function pt(s){var u,d,v;const{state:e,api:t,notify:c,updateSidebar:l}=s,T=document.getElementById("exploreResult");if(T){T.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const f=await t.explore(e.playerId);e.player=f.player,l();const m=f.event;let h=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(m.type==="monster")h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${m.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${m.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${m.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(m.type==="monster_ambush"&&m.combatResult){const p=m.combatResult,b=(p.log||[]).map(a=>a.startsWith("---")?`<div class="turn">${a}</div>`:a.includes("hụt")?`<div class="miss">${a}</div>`:a.includes("CHÍNH MẠNG")||a.includes("💥")?`<div class="crit">${a}</div>`:a.includes("ngã xuống")||a.includes("💀")?`<div class="death">${a}</div>`:a.includes("Chiến thắng")||a.includes("🏆")?`<div class="victory">${a}</div>`:`<div class="hit">${a}</div>`).join(""),y=p.outcome==="win"?"🏆 Chiến thắng!":p.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",g=p.outcome==="win"?"var(--green)":p.outcome==="loss"?"var(--red)":"var(--orange)";h+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${m.message}</div>
        <div style="font-size:16px;font-weight:700;color:${g};margin-bottom:12px">${y}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${b}</div>
      `}else if(m.type==="worldBoss")h+=`
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
      `,m.studyEffect){const p=m.studyEffect,b=p.isDebuff?"var(--red)":"var(--gold)";h+=`<div class="text-sm mt-sm" style="color:${b};animation:fadeIn 0.5s;">
          ${p.message}
        </div>`}m.hasQuests&&(h+=`<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${m.npcId}">💬 Nói Chuyện</button>`),h+='<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>',h+="</div></div>",h+='<div id="npcQuestModal"></div>'}else m.type==="player_encounter"&&m.player?h+=`
        <div style="font-size: 48px; margin-bottom: 8px;">👤</div>
        <div class="text-lg text-gold bold mb-sm">${m.message}</div>
        <div class="text-sm text-dim mb-md">Âm thầm lướt qua hay chủ động giao hảo?</div>
        <div class="flex gap-2 justify-center mt-md w-full" style="flex-wrap:wrap">
          <button class="btn btn--blue flex-1" id="btnInteractFriend" data-pid="${m.player.id}">🤝 Kết Giao</button>
          <button class="btn btn--gold flex-1" id="btnInteractGift" data-pid="${m.player.id}">💎 Tặng 100 LT</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${m.player.id}">⚔️ Cướp Linh Thạch</button>
        </div>
      `:m.type==="npc"?h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">👴</div>
        <div class="text-lg text-gold bold mb-sm">${m.message}</div>
      `:m.type==="material"||m.type==="item"?(h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
        <div class="text-lg text-green bold mb-sm">${m.message}</div>
      `,m.questNotifications&&m.questNotifications.length>0&&m.questNotifications.forEach(p=>{h+=`<div class="text-sm text-gold mt-sm" style="animation: fadeIn 0.5s;">🏷️ ${p.message}</div>`})):h+=`
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${m.message}</div>
      `;m.type!=="monster"&&m.type!=="worldBoss"&&!(m.type==="npc"&&m.npcId)&&(h+='<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục hành trình</button>'),m.type==="npc"&&m.npcId||(h+="</div></div>"),T.innerHTML=h,m.type==="player_encounter"&&m.player&&(document.getElementById("btnInteractFriend").addEventListener("click",async p=>{try{const b=await t.addFriend(e.playerId,p.target.dataset.pid);(b.success||b.message)&&c(b.message||"Đã gửi lời mời!","success")}catch(b){c(b.message,"error")}}),document.getElementById("btnInteractGift").addEventListener("click",async p=>{var b;try{const y=await t.interactPlayer(e.playerId,p.target.dataset.pid,"gift",100);if(y.player){e.player=y.player,l(),c(y.message,"success");const g=p.target.closest(".panel-body");g&&(g.innerHTML='<div class="text-green text-lg mb-md">Đã bồi đắp hảo cảm!</div><button class="btn btn--blue" id="btnExploreContinueAfterGift">Rời đi</button>'),(b=document.getElementById("btnExploreContinueAfterGift"))==null||b.addEventListener("click",()=>{T.innerHTML=""})}}catch(y){c(y.message,"error")}}),(u=document.getElementById("btnInteractMug"))==null||u.addEventListener("click",async p=>{var y;const b=p.target.dataset.pid;p.target.disabled=!0,p.target.textContent="⏳ Đang tấn công...";try{const g=await t.request(`/player/${e.playerId}/mug`,{method:"POST",body:JSON.stringify({victimId:b})});e.player=g.player,l();const a=p.target.closest(".panel-body");if(a){const r=g.success?"var(--green)":"var(--red)",i=g.success?"💰":"💀";a.innerHTML=`
              <div style="font-size:36px;margin-bottom:8px">${i}</div>
              <div style="color:${r};font-size:16px;font-weight:700;margin-bottom:8px">${g.message}</div>
              ${g.goldStolen>0?`<div class="text-gold">+${g.goldStolen} 💎 Linh Thạch</div>`:""}
              <div style="font-size:11px;opacity:0.5;margin-top:8px">Tỉ lệ: ${g.successChance}%</div>
              <button class="btn btn--blue mt-md" id="btnExploreContinueAfterMug">Tiếp tục</button>
            `,(y=document.getElementById("btnExploreContinueAfterMug"))==null||y.addEventListener("click",()=>{T.innerHTML=""})}c(g.message,g.success?"success":"error")}catch(g){c(g.message,"error"),p.target.disabled=!1,p.target.textContent="⚔️ Cướp Linh Thạch"}})),(m.type==="monster"||m.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",p=>{T.innerHTML="",W(s,p.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async p=>{try{const b=await t.trackMonster(e.playerId,p.target.dataset.mid);b.success?(c(b.message,"success"),T.innerHTML="",typeof s.renderGame=="function"&&s.renderGame()):b.error&&c(b.error,"error")}catch(b){c("Lỗi theo dõi: "+b.message,"error")}})),m.type==="npc"&&m.npcId&&((d=document.getElementById("btnNpcInteract"))==null||d.addEventListener("click",async()=>{await gt(s,m.npcId,T)})),(v=document.getElementById("btnExploreContinue"))==null||v.addEventListener("click",()=>{T.innerHTML=""})}catch(f){T.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${f.message}</div></div>`}}}async function gt(s,e,t){const{state:c,api:l,notify:T,renderGame:u}=s,d=document.getElementById("npcQuestModal")||t;try{const f=(await l.getNpc(e)).npc;if(!f)return;const m=(c.player.activeQuests||[]).map(p=>p.quest_id);let h=f.quests.map(p=>{const b=m.includes(p.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${p.name}</span>
            <span class="text-xs badge" style="background:${p.type==="kill"?"var(--red)":"var(--green)"}">${p.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${p.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${p.rewards.gold?p.rewards.gold+"💎 ":""}${p.rewards.xp?p.rewards.xp+"✨ ":""}${p.rewards.skillChance?"🎯 "+p.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${b?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${e}" data-qid="${p.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");d.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${f.icon||"🧓"} ${f.name} <span class="subtitle">${f.profession}</span></div>
        <div class="panel-body">
          ${h||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,d.querySelectorAll(".btn-accept-quest").forEach(p=>{p.addEventListener("click",async()=>{p.disabled=!0,p.textContent="⏳...";try{const b=await l.acceptQuest(c.playerId,p.dataset.npc,p.dataset.qid);c.player=b.player,T(b.message,"success"),u()}catch(b){T(b.message||"Lỗi nhận quest","error"),p.disabled=!1,p.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(v){console.error("NPC load error:",v)}}async function W(s,e,t=null){var f;const{state:c,api:l,notify:T,updateSidebar:u,renderGame:d}=s,v=document.getElementById("combatResult");if(v){if(!c.player.currentHp||c.player.currentHp<=0)return T("Đã kiệt sức! Hãy hồi phục trước.","error");if((c.player.currentEnergy||0)<10&&!c.player.currentEnergy)return T("Không đủ Linh lực!","error");if(c.player.hospitalRemaining>0)return T(`Đang tịnh dưỡng! Còn ${c.player.hospitalRemaining}s`,"error");v.innerHTML='<div class="panel border-red bg-dark"><div class="panel-body text-center text-red">⚔️ Đang giao chiến...</div></div>',v.scrollIntoView({behavior:"smooth"});try{const m=await l.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:c.playerId,monsterId:t?null:e,trackedMonsterId:t})});if(c.player=m.player,m.outcome==="no_energy"){v.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${m.log[0]}</div></div>`,u();return}const h=m.log.map(o=>o.startsWith("---")?`<div class="turn">${o}</div>`:o.includes("linh lực")&&o.includes("+")?`<div class="energy">${o}</div>`:o.includes("linh lực")?`<div class="energy-cost">${o}</div>`:o.includes("kiệt linh")?`<div class="miss">${o}</div>`:o.includes("hụt")?`<div class="miss">${o}</div>`:o.includes("né được")?`<div class="dodge">${o}</div>`:o.includes("CHÍNH MẠNG")||o.includes("💥")?`<div class="crit">${o}</div>`:o.includes("🔥")?`<div class="heavy text-orange">${o}</div>`:o.includes("chặn hoàn toàn")||o.includes("🛡")?`<div class="dodge">${o}</div>`:o.includes("ngã xuống")||o.includes("💀")?`<div class="death">${o}</div>`:o.includes("Chiến thắng")||o.includes("🏆")?`<div class="victory">${o}</div>`:o.includes("Đột phá")||o.includes("🎉")?`<div class="levelup">${o}</div>`:o.includes("bỏ chạy")||o.includes("🏃")?`<div class="flee">${o}</div>`:o.includes("Hết")||o.includes("⏰")?`<div class="stalemate">${o}</div>`:o.includes("Bất phân")||o.includes("🤝")?`<div class="stalemate">${o}</div>`:o.includes("Thoát thân")||o.includes("🚪")?`<div class="flee">${o}</div>`:o.includes("Linh Thạch")||o.includes("💰")?`<div class="gold-reward">${o}</div>`:o.includes("Tịnh dưỡng")||o.includes("🏥")?`<div class="hospital">${o}</div>`:o.includes("🧪")?`<div class="status-effect text-purple">${o}</div>`:o.includes("💔")?`<div class="dot-damage text-purple bold">${o}</div>`:o.includes("✨")?`<div class="regen text-green">${o}</div>`:o.includes("♻️")?`<div class="reflect text-red">${o}</div>`:`<div class="hit">${o}</div>`).join(""),p=m.monster,b=Math.max(0,c.player.currentHp/c.player.maxHp*100),y=Math.max(0,p.currentHp/p.maxHp*100),g={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Thất bại",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},a=g[m.outcome]||g.loss,r=(f=m.rewards)!=null&&f.gold?` · +${m.rewards.gold} 💰`:"",i=m.rewards?` · +${m.rewards.xp} XP${r}`:"";v.innerHTML=`
      <div class="panel">
        <div class="panel-title">${a.icon} ${a.text}
          <span class="subtitle">${m.turns}/${m.maxTurns||25} lượt${i}</span>
        </div>
        <div class="panel-body combat-result ${a.cls}">
          <div class="combat-opponents">
            <div class="fighter">
              <div class="f-name player-name">${c.player.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${b}%"></div></div>
              <div class="mini-hp-val">${c.player.currentHp}/${c.player.maxHp}</div>
            </div>
            <div class="vs">VS</div>
            <div class="fighter">
              <div class="f-name monster-name">${p.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${y}%"></div></div>
              <div class="mini-hp-val">${p.currentHp}/${p.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${h}</div>
      </div>`,u(),t&&typeof d=="function"&&setTimeout(()=>d(),1500)}catch(m){v.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${m.message}</div></div>`}}}function X(s,e){const{state:t,api:c,notify:l}=e,T=t.player,u=(T.skills||[]).find(h=>(typeof h=="string"?h:h.id)==="nhan_thuat"),d=u?u.level||1:0,v=[...t.skills].sort((h,p)=>(h.tier||1)-(p.tier||1)),f=(T.skills||[]).map(h=>typeof h=="string"?h:h.id),m={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};s.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${d}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${v.map(h=>{const p=f.includes(h.id),b=h.tier||1,y=b>d+1,g=b<=d;let a="";return h.requirements&&h.requirements.length>0?g||p?a=`<div class="mt-sm text-xs text-orange">Điều kiện: ${h.requirements.map(r=>`<br>• ${r}`).join("")}</div>`:y?a=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${b}.</div>`:a='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':a='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${p?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${h.name} ${p?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${p?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${m[b]||b}</span>
                    <span class="text-xs text-dim">${h.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||p?h.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${h.type!=="passive"&&h.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${h.cost} linh lực</div>`:""}
                
                ${a}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${p?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${y?"btn--dark":"btn--gold"} btn--sm btn-learn" ${y?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${h.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,s.querySelectorAll(".accordion-header").forEach(h=>{h.addEventListener("click",()=>{const p=h.nextElementSibling;p.style.display==="none"?(p.style.display="block",h.querySelector("div:last-child").textContent="▲"):(p.style.display="none",h.querySelector("div:last-child").textContent="▼")})}),s.querySelectorAll(".btn-learn").forEach(h=>{h.addEventListener("click",async p=>{p.stopPropagation();try{const b=await c.learnSkill(T.id,h.dataset.sid);b.error?l(b.error,"error"):(t.player=b.player,l(b.message,"success"),X(s,e))}catch(b){l("Lỗi học kỹ năng: "+b.message,"error")}})})}function ut(s,e){var b,y,g;const{state:t,api:c,notify:l,renderGame:T}=e,u=t.player,d=u.stats,v=u.allocatedStats||{},f=5,m=u.currentEnergy>=f&&!u.hospitalRemaining,h=u.talentDisplay||{},p=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];s.innerHTML=`
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
            🌟 ${((b=u.realmInfo)==null?void 0:b.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(y=u.realmInfo)!=null&&y.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${p.map(([a,r,i])=>{const o=h[a]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${o.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${r}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${i}</div>
                <div style="font-size:14px;font-weight:700;color:${o.color};margin-top:4px">${o.icon} ${o.name}</div>
                <div style="font-size:11px;color:${o.color};opacity:0.8">×${o.value} hệ số</div>
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
        ${p.map(([a,r,i,o])=>{const n=h[a]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},x=Math.floor(u.currentEnergy/f)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${r}</span> ${i}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${o}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${d[a]??0}</span>
              ${v[a]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${v[a]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${n.color};min-width:50px" title="Căn Cốt: ${n.name} (×${n.value})">${n.icon}×${n.value}</span>
              <input type="number" class="train-count" data-stat="${a}" min="1" max="${x}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${m?"":"disabled"}>
              <button class="btn btn--sm ${m?"btn--blue":"btn--dark"} train-btn" data-train="${a}" ${m?"":"disabled"} title="Tốn ${f} Linh lực/lần · Căn cốt ×${n.value}">Rèn Luyện</button>
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
    </div>`,(g=s.querySelector(".btn-breakthrough"))==null||g.addEventListener("click",async()=>{try{const a=s.querySelector(".btn-breakthrough");a.disabled=!0,a.innerHTML="Đang Độ Kiếp...";const r=await c.attemptBreakthrough(t.playerId);t.player=r.player,l(r.message,"success"),T()}catch(a){l(a.message||"Đột phá thất bại","error");const r=s.querySelector(".btn-breakthrough");r&&(r.disabled=!1,r.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),s.querySelectorAll(".train-btn").forEach(a=>{a.addEventListener("click",async r=>{r.stopPropagation();const i=s.querySelector(`.train-count[data-stat="${a.dataset.train}"]`),o=parseInt(i==null?void 0:i.value)||1;try{const n=await c.trainStat(t.playerId,a.dataset.train,o);t.player=n.player,l(n.message,"success"),T()}catch(n){l(n.message||"Lỗi rèn luyện","error")}})})}function Y(s,e){const{state:t,api:c,notify:l}=e,T=t.player.skills||[],u=T.map(v=>typeof v=="string"?v:v.id),d=T.map(v=>{const f=typeof v=="string"?v:v.id;return{...t.skills.find(h=>h.id===f)||{name:"Vô danh thủ thuật",id:f},level:v.level||1,currentXp:v.currentXp||0}});t.skills.filter(v=>!u.includes(v.id)),s.innerHTML=`
    <div class="page-header"><h1>⚡ Thần Thông</h1></div>

    <div class="panel">
      <div class="panel-title">Đã học (${d.length})</div>
      <div class="panel-body no-pad">
        ${d.length===0?'<div style="padding:14px" class="text-dim">Chưa lĩnh hội kỹ năng nào</div>':d.map(v=>{const f=v.type==="passive"&&(!v.tags||!v.tags.includes("movement")&&!v.tags.includes("thân pháp")),m=f?'<span class="text-xs text-dim">Vĩnh Viễn Kích Hoạt</span>':v.isEquipped?`<button class="btn btn--sm equip-btn" style="background:var(--red)" data-eq="0" data-sid="${v.id}">Tháo Gỡ</button>`:`<button class="btn btn--sm equip-btn" data-eq="1" data-sid="${v.id}">Trang Bị</button>`,h=v.isEquipped&&!f?'<span class="badge" style="background:var(--green)">Đang trang bị</span>':"";return`
            <div class="list-item flex flex-col items-start gap-4" style="${v.isEquipped&&!f?"border-left: 3px solid var(--green); background: rgba(50, 200, 100, 0.05);":""}">
              <div class="item-info w-full">
                <div class="flex justify-between items-center mb-xs">
                  <div class="item-name text-lg">${v.name} <span class="badge" style="background:var(--blue)">Tầng ${v.level}</span> ${h}</div>
                  <div class="text-xs text-gold">${v.currentXp} / 100 XP</div>
                </div>
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-meta">${v.type==="passive"?"🔮 Nội công":`⚡ Chiêu thức · 🔵${v.cost||0} linh lực`}${v.description?" · "+v.description:""}</div>
                  <div>${m}</div>
                </div>
                
                <!-- Master XP Bar -->
                <div class="w-full bg-darker rounded" style="height: 4px; overflow: hidden;">
                  <div class="bg-gold h-full" style="width: ${Math.min(100,Math.max(0,v.currentXp/100*100))}%"></div>
                </div>
              </div>
            </div>`}).join("")}
      </div>
      </div>
    </div>`,s.querySelectorAll(".equip-btn").forEach(v=>{v.addEventListener("click",async()=>{try{const f=v.dataset.sid,m=v.dataset.eq==="1",h=await c.equipSkill(t.playerId,f,m);t.player=h.player,l(h.message,"success"),Y(s,e)}catch(f){l(f.message||"Lỗi trang bị","error")}})})}function vt(s,e){return e==="manual"?"📜":s==="weapon"?"⚔️":s==="body"?"🥋":s==="shield"?"🛡️":s==="feet"?"👢":s==="ring"?"💍":"📦"}function Q(s,e){let t="",c="";if(s.slot==="weapon"){let v=0,f=0;(s.affixes||[]).forEach(m=>{m.stat==="strength"&&m.type==="flat"&&(v+=m.value),m.stat==="dexterity"&&m.type==="flat"&&(f+=m.value)}),v===0&&(v=s.itemLevel*2+5),f===0&&(f=s.itemLevel+10),t=`⚔️ ${v}`,c=`🎯 ${f}`}else if(s.slot==="body"||s.slot==="shield"||s.slot==="feet"){let v=0;(s.affixes||[]).forEach(f=>{f.stat==="defense"&&f.type==="flat"&&(v+=f.value)}),v===0&&(v=s.itemLevel*3),t=`🛡️ ${v}`}else if(s.slot==="ring"){let v=0;(s.affixes||[]).forEach(f=>{f.stat==="capacity"&&(v+=f.value)}),t=v>0?`🎒 +${v}`:""}const l=(s.affixes||[]).map(v=>mt(v)).map(v=>`<span class="badge badge-dim">${v}</span>`).join(" "),T=s.description||`Một vật phẩm loại ${s.slot} cấp ${s.itemLevel} thuộc phẩm chất ${s.rarity}. Khí tức tỏa ra không tồi.`,u=s.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${s.craftedBy}</strong></div>`:"",d=e?s.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${s.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${s.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${s.rarity}"></span>
          <span class="item-name rarity-${s.rarity}" style="font-size:14px">${s.name}</span>
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
          ${vt(s.slot,s.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${s.name}</strong> là loại ${s.baseType}. ${T}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${s.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${s.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${l||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${u}
          <div class="mt-2 flex justify-end">
            ${d}
          </div>
        </div>
      </div>
    </div>`}function mt(s){const t={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[s.stat]||s.stat,c=s.value>=0?"+":"";return s.type==="flat"?`${c}${s.value} ${t}`:s.type==="increase"?`${c}${s.value}% ${t}`:s.type==="more"?`×${c}${s.value}% ${t}`:`${c}${s.value} ${t}`}function K(s,e){var r,i,o,n,x,$,w;const{state:t,api:c,notify:l,renderGame:T}=e,u=Object.values(t.player.equipment||{}),d=t.player,v=t.medicines||[],f=d.medCooldownRemaining||0,m=t.inventoryTab||"equipped",h=d.skills&&d.skills.some(k=>{const L=typeof k=="string"?k:k.id;return L==="duoc_ly"||L==="y_thuat"}),p=u.find(k=>k.slot==="ring1"),b=u.find(k=>k.slot==="ring2");let y=20;((p==null?void 0:p.id)==="tui_tru_vat"||(r=p==null?void 0:p.baseType)!=null&&r.includes("tru_vat"))&&(y+=((o=(i=p.affixes)==null?void 0:i[0])==null?void 0:o.value)||10),((b==null?void 0:b.id)==="tui_tru_vat"||(n=b==null?void 0:b.baseType)!=null&&n.includes("tru_vat"))&&(y+=(($=(x=b.affixes)==null?void 0:x[0])==null?void 0:$.value)||10),s.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(d.inventory||[]).length} / ${y})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${m==="equipped"?"btn--blue":"btn--dark"}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${m==="weapon"?"btn--blue":"btn--dark"}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${m==="armor"?"btn--blue":"btn--dark"}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${m==="accessory"?"btn--blue":"btn--dark"}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${m==="manual"?"btn--blue":"btn--dark"}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${m==="medicine"?"btn--blue":"btn--dark"}" data-tab="medicine">
          Đan Dược ${f>0?`<span style="color:var(--orange); font-size:11px">(${f}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const g=document.getElementById("invTabContent"),a=()=>{g.querySelectorAll("[data-eid]").forEach(k=>{k.addEventListener("click",async L=>{L.stopPropagation();try{const S=await c.equipItem(t.playerId,k.dataset.eid);t.player=S.player,l(S.message,"success"),T()}catch(S){l(S.message||"Lỗi trang bị","error")}})}),g.querySelectorAll("[data-use]").forEach(k=>{k.addEventListener("click",async L=>{L.stopPropagation();try{const S=await c.useItem(t.playerId,k.dataset.use);t.player=S.player,l(S.message,"success"),T()}catch(S){l(S.message||"Lỗi sử dụng","error")}})})};if(m==="equipped"){const k=d.equipment||{},L=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];g.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${L.map(S=>{const E=k[S.key],M=E&&E.id,P=M?`rarity-${E.rarity}`:"";return`
            <div style="background:${M?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${M?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${S.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${S.name}</div>
              ${M?`<div style="font-size:11px;font-weight:600" class="${P}">${E.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${E.rarity}] Lv${E.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${u.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${u.filter(S=>S&&S.id).map(S=>Q(S,!1)).join("")}
      `:""}
    `,a()}else if(m==="medicine")g.innerHTML=`
      <div style="padding:12px">
        ${f>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${f}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${f/300*100}%;background:var(--orange)"></div></div>
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
                  ${k.toxicity&&h?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${k.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${k.penalty&&h?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${k.penalty.map(L=>`Giảm ${Math.abs(L.value)*100}% ${L.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${k.id}" 
                ${f+(k.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,g.querySelectorAll("[data-med]").forEach(k=>{k.addEventListener("click",async()=>{try{const L=await c.useMedicine(t.playerId,k.dataset.med);t.player=L.player,l(L.message,"success"),T()}catch(L){l(L.message||"Đan độc quá nồng!","error")}})});else{const k=d.inventory||[];let L=[];m==="weapon"?L=k.filter(S=>S.slot==="weapon"&&S.category!=="manual"):m==="armor"?L=k.filter(S=>["body","shield","feet"].includes(S.slot)):m==="accessory"?L=k.filter(S=>["ring","amulet","ring1","ring2"].includes(S.slot)):m==="manual"&&(L=k.filter(S=>S.category==="manual")),g.innerHTML=`
      ${L.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':L.map(S=>Q(S,!0)).join("")}
    `,a()}s.querySelectorAll("[data-tab]").forEach(k=>{k.addEventListener("click",()=>{t.inventoryTab=k.dataset.tab,K(s,e)})}),(w=document.getElementById("btnGen"))==null||w.addEventListener("click",async()=>{const k=["common","rare","epic","legendary"];try{const L=await c.generateItem(t.playerId,k[Math.floor(Math.random()*k.length)]);t.player=L.player,t.items=L.items||[],l(L.message,"success"),K(s,e)}catch{l("Lỗi tạo ngẫu nhiên","error")}})}function yt(s,e){var o,n;const{state:t,api:c,notify:l,renderGame:T}=e,u=t.player,d=t.crimes||[];if((u.jailRemaining??0)>0){const x=u.jailRemaining,$=Math.max(10,100*Math.ceil(x/60)*u.level);s.innerHTML=`
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
      </div>`,(o=document.getElementById("btnEscape"))==null||o.addEventListener("click",async()=>{try{const w=await c.escapeJail(t.playerId);t.player=w.player,l(w.message,w.success?"success":"error"),T()}catch(w){l(w.message||"Lỗi","error")}}),(n=document.getElementById("btnBail"))==null||n.addEventListener("click",async()=>{try{const w=await c.bail(t.playerId);t.player=w.player,l(w.message,w.success?"success":"error"),T()}catch(w){l(w.message||"Lỗi","error")}});return}const f={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},m={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},h=d.reduce((x,$)=>{const w=$.category||"theft";return x[w]||(x[w]=[]),x[w].push($),x},{}),p=Object.keys(f).map(x=>{const $=h[x];if(!$||$.length===0)return"";const w=f[x];return`
    <div class="panel mt-md" style="border-color: ${w.color}40;">
      <div class="panel-title" style="color: ${w.color};">${w.label} <span class="subtitle text-dim">${$.length} loại</span></div>
      <div class="panel-body no-pad">
        ${$.map(k=>{var I;const L=((I=u.crimeSkills)==null?void 0:I[k.id])??0,S=L<(k.minSkill??0),E=!S&&(u.nerve??0)>=k.nerveCost,M=k.special||[],P=Math.min(95,k.baseSuccessRate+L*.5);return`
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
                  <span style="color:${P>=60?"var(--green)":P>=40?"var(--orange)":"var(--red)"}">🎯 ${Math.round(P)}%</span>
                  ${S?`<span style="color:var(--red)">Cần Skill ${k.minSkill}</span>`:`<span>📊 ${L}/100</span>`}
                </div>
                ${M.length>0?`
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${M.map(N=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${m[N]||N}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <button class="btn btn--sm ${E?"btn--red":""}" data-crime="${k.id}" ${E?"":"disabled"}>
                ${S?"🔒":"Thực hiện"}
              </button>
            </div>`}).join("")}
      </div>
    </div>`}).join(""),b=u.crimeExp||0,y=Math.floor(b/50),g=b%50,a=50,r=g/a*100,i=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${y}</strong>
          <span class="text-dim">${g} / ${a} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${r}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${a-g} EXP</strong> nữa để tăng giới hạn Nghịch Khí. (Giới hạn hiện tại: ${u.maxNerve||15})</div>
      </div>
    </div>
  `;s.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${u.nerve??0}/${u.maxNerve??15} Nghịch Khí · 💰 ${u.gold??0} Linh Thạch</span></div>
    </div>
    ${i}
    ${p}`,s.querySelectorAll("[data-crime]").forEach(x=>{x.addEventListener("click",async()=>{try{const $=await c.commitCrime(t.playerId,x.dataset.crime);t.player=$.player;const w=$.outcome==="success"?"success":$.outcome==="critical_fail"?"error":"info";l($.message,w),T()}catch($){l($.message||"Lỗi","error")}})})}function ht(s,e){var i;const{state:t,api:c,notify:l,renderGame:T}=e,u=t.player,d=t.educationTrees||[],v=u.unlockedNodes||[],f=u.studyingNode||"",m=f?f.split("|")[0]:"",h=u.studyEndsAt||0,p=Math.max(0,h-Math.floor(Date.now()/1e3)),b=u.treeProgress||{},y=u.skillProgress||{};let g=localStorage.getItem("eduActiveTree")||((i=d[0])==null?void 0:i.id),a=d.find(o=>o.id===g)||d[0];!a&&d.length>0&&(a=d[0]);const r=()=>{if(!a){s.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const o=d.map(E=>`
      <button class="edu-tab ${E.id===a.id?"active":""}" data-tab="${E.id}">
        <span class="edu-tab-icon">${E.icon}</span>
        <span class="edu-tab-name">${E.name}</span>
        <span class="edu-tab-badge">${b[E.id]||0}</span>
      </button>
    `).join("");let n="";if(m){let E=null,M=null;d.forEach(P=>{const I=P.nodes.find(N=>N.id===m);I&&(E=I,M=P)}),E&&(n=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${M.name}</div>
              <div class="text-gold text-lg bold">${E.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${p}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${p>0?"disabled":""}>
                ${p>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const x=b[a.id]||0;let $=null;for(const E of a.milestones||[])if(x<E.require){$=E;break}let w="";$?w=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${$.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${$.description}</div>
        </div>
      `:w='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const k=u.discoveredNodes||[],L=(a.nodes||[]).map(E=>{const M=v.includes(E.id),P=m===E.id,I=(E.prerequisites||[]).every(A=>v.includes(A)),N=a.nodes.some(A=>(A.prerequisites||[]).includes(E.id));if(!(k.includes(E.id)||M||!(E.prerequisites&&E.prerequisites.length>0))||M&&N)return"";let B="";P?B="studying":M?B="done":B="available";let _="";P?_='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':m?_='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':M?_=`<button class="btn btn--sm btn--gold btn-learn" data-node="${E.id}">Tiếp Tục Lãnh Ngộ (${E.duration}s)</button>`:I?_=`<button class="btn btn--sm btn--blue btn-learn" data-node="${E.id}">Bắt Đầu (${E.duration}s)</button>`:_='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const j=y[E.id]||{level:1,exp:0},dt=j.level*100;let U="";return M&&(U=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${j.level} | Độ hiểu thấu: ${j.exp}/${dt}</div>`),`
        <div class="edu-node ${B}">
          <div class="edu-node-info">
            <div class="edu-node-title">${E.name}</div>
            <div class="edu-node-desc">${E.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${E.bonusDescription}</div>
            ${U}
          </div>
          <div class="edu-node-action">
            ${_}
          </div>
        </div>
      `}).join("");s.innerHTML=`
      <div class="page-header">
        <h1>📜 Đạo Lộ (Tu Luyện)</h1>
        <div class="text-dim text-sm mt-xs">Lựa chọn con đường tu tiên của riêng bạn.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${o}</div>
          ${n}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${a.icon} ${a.name}</h2>
              <p class="text-dim mb-md">${a.description}</p>
              
              <h3 class="text-md mb-xs mt-md border-b pb-xs">🌟 Cảnh Giới Đột Phá</h3>
              <div class="edu-milestones-grid mb-lg">
                ${w||'<div class="text-dim text-sm">Nhánh này chưa có cảnh giới đặc biệt.</div>'}
              </div>

              <h3 class="text-md mb-xs border-b pb-xs">📖 Pháp Quyết</h3>
              <div class="edu-nodes-list">
                ${L||'<div class="text-dim text-sm">Chưa có pháp quyết.</div>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,s.querySelectorAll(".edu-tab").forEach(E=>{E.addEventListener("click",()=>{const M=E.dataset.tab;localStorage.setItem("eduActiveTree",M),g=M,a=d.find(P=>P.id===M)||d[0],r()})}),window.eduTimer&&clearInterval(window.eduTimer),m&&h>0&&(window.eduTimer=setInterval(()=>{const E=Math.floor(Date.now()/1e3);let M=Math.max(0,h-E);const P=document.getElementById("eduCounter");if(P&&(P.innerText=M+"s"),M<=0){clearInterval(window.eduTimer);const I=document.getElementById("btnCheckEdu");I&&(I.disabled=!1,I.innerHTML="✨ Đột Phá!")}},1e3));const S=s.querySelector("#btnCheckEdu");S&&S.addEventListener("click",async()=>{try{S.disabled=!0,S.innerHTML="Đang xử lý...";const E=await c.checkEducation(t.playerId);t.player=E.player,l(E.message,E.completed?"success":"info"),T()}catch(E){l(E.message||"Lỗi đột phá","error"),S.disabled=!1,S.innerHTML="Thử lại"}}),s.querySelectorAll(".btn-learn").forEach(E=>{E.addEventListener("click",async()=>{try{const M=E.dataset.node;E.disabled=!0,E.innerHTML="Chờ...";const P=await c.enrollNode(t.playerId,M,a.id);t.player=P.player,l(P.message,"success"),T()}catch(M){l(M.message||"Lỗi ghi danh","error"),E.disabled=!1,E.innerHTML="Bắt Đầu"}})})};r()}function Z(s,e){const{state:t,api:c,notify:l,updateSidebar:T,renderGame:u}=e,d=t.playerId;t._dungeon||(t._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const v=t._dungeon;async function f(){try{const[a,r]=await Promise.all([c.getMapItems(d),c.getDungeonHistory(d)]);v.mapItems=a.mapItems||[],v.activeRun=a.activeRun||null,v.history=r.history||[],v.loaded=!0,m()}catch(a){l(a.message||"Lỗi tải Bí Cảnh","error")}}function m(){s.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${v.activeRun?h():p()}

      ${v.lastResult?b():""}

      ${y()}
    `,g()}function h(){var o,n;const a=v.activeRun,r=a.currentWave===a.totalWaves,i=((a.currentWave-1)/a.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${a.dungeonName||a.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${i}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${a.currentWave}/${a.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((o=t.player)==null?void 0:o.hospitalRemaining)>0?"disabled":""}>
              ${r?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+a.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((n=t.player)==null?void 0:n.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function p(){return v.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${v.mapItems.map(a=>{const r=a.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${a.item.icon} ${a.item.name} <span style="opacity:0.5">x${a.quantity}</span></div>
                  ${r?`
                    <div class="item-meta">
                      ${r.name} · T${r.tier} · ${r.waves+1} tầng · Boss: ${r.bossName}
                    </div>
                  `:""}
                </div>
                ${r?`<button class="btn btn--sm btn--gold" data-enter="${a.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function b(){var o,n;const a=v.lastResult,r=a.result==="dungeon_complete"?"🏆":a.result==="wave_cleared"?"✅":"💀",i=a.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${i}">
        <div class="panel-title" style="color:${i}">${r} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${a.message}</div>
          ${(o=a.loot)!=null&&o.length?`
            <div style="margin-bottom:8px">
              ${a.loot.map(x=>`<div style="font-size:12px;color:var(--green)">🎁 ${x}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((n=a.combatLog)==null?void 0:n.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(a.combatLog||[]).map(x=>`<div>${x}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function y(){return v.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${v.history.map(a=>{const r=a.status==="completed"?"✅":a.status==="failed"?"❌":a.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${a.status==="completed"?"var(--green)":a.status==="failed"?"var(--red)":"var(--orange)"}">${r} ${a.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${a.wave}/${a.totalWaves} · ${new Date(a.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function g(){var a,r;document.querySelectorAll("[data-enter]").forEach(i=>{i.addEventListener("click",async()=>{const o=i.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){i.disabled=!0;try{const n=await c.enterDungeon(d,o);l(n.message,"success"),t.player=n.player,T(),v.activeRun=n.run,v.lastResult=null,await f()}catch(n){l(n.message,"error"),i.disabled=!1}}})}),(a=document.getElementById("btnFight"))==null||a.addEventListener("click",async()=>{const i=document.getElementById("btnFight");i.disabled=!0,i.textContent="⏳ Đang chiến đấu...";try{const o=await c.fightDungeonWave(d);t.player=o.player,T(),v.lastResult=o,o.result==="dungeon_complete"||o.result==="dungeon_failed"?v.activeRun=null:o.result==="wave_cleared"&&(v.activeRun.currentWave=o.nextWave),m()}catch(o){l(o.message,"error"),i.disabled=!1,i.textContent="⚔️ Chiến Đấu"}}),(r=document.getElementById("btnAbandon"))==null||r.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await c.abandonDungeon(d),l("Đã rời khỏi Bí Cảnh.","info"),v.activeRun=null,v.lastResult=null,await f()}catch(i){l(i.message,"error")}})}v.loaded?m():f()}function tt(s,e){const{state:t}=e,c=t._travelTab||"map";s.innerHTML=`
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
  `,s.querySelectorAll(".tab-btn").forEach(T=>{T.addEventListener("click",()=>{t._travelTab=T.dataset.tab,tt(s,e)})});const l=s.querySelector("#travelTabContent");c==="map"?O(l,e):Z(l,e)}async function O(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e;s.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ...</div>';try{const[u,d]=await Promise.all([c.request("/data/areas"),c.request(`/player/${t.playerId}/area`)]),v=u.areas||[],f=d.area,m=d.player,h=d.traveling||!1,p=d.travelRemaining||0,b=d.travelDestination||"";d.message&&l(d.message,"success"),d.player&&(t.player=d.player,T());const y=t.exploration||{},g=y[(m==null?void 0:m.currentArea)||"thanh_lam_tran"],a=(f==null?void 0:f.name)||(g==null?void 0:g.name)||"Vùng Đất Vô Danh",r=(g==null?void 0:g.staminaCost)||10,i={hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận"},o=i[m==null?void 0:m.currentArea]||"",n=[...v].sort(($,w)=>($.sort_order||$.mapY||0)-(w.sort_order||w.mapY||0)),x=[...v].sort(($,w)=>($.mapY||0)-(w.mapY||0));if(s.innerHTML=`
      ${h?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.1)">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:32px; margin-bottom:12px; animation:bounce 1s infinite">🚶</div>
            <strong style="font-size:16px">Đang tiến về ${b}</strong>
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
                <div class="text-lg text-green bold">${a}</div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${r}/lần</div>
              </div>
            </div>
            ${f!=null&&f.description?`<div class="text-sm text-dim" style="margin-top:6px">${f.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Lv.${(f==null?void 0:f.min_level)||1}+</span>
              ${o?`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">${o}</span>`:""}
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

          ${x.map($=>{const w=y[$.id],k=$.id===m.currentArea&&!h,L=m.level<($.min_level||1),S=(w==null?void 0:w.mapX)||50,E=(w==null?void 0:w.mapY)||50,M=k?"var(--green)":L?"var(--red)":"var(--blue)",P=k?`box-shadow: 0 0 15px ${M}; animation: pulse 2s infinite`:"",I=!k&&!L&&!h;return`
              <div class="map-node ${I?"clickable":""}" ${I?`data-travel="${$.id}"`:""} 
                   style="position:absolute; left:${S}%; top:${E}%; transform:translate(-50%, -50%); z-index:1; display:flex; flex-direction:column; align-items:center; width:max-content">
                <div class="node-label" style="font-size:10px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; margin-bottom:4px; color:${k?"var(--green)":"var(--text-light)"}; border:1px solid ${k?"var(--green)":"rgba(255,255,255,0.1)"}">
                  ${$.name} ${L?`[Lv.${$.min_level}]`:""}
                </div>
                <div class="node-dot" style="width:12px; height:12px; background-color:${M}; border-radius:50%; border:2px solid #fff; ${P}"></div>
              </div>
            `}).join("")}
        </div>
      </div>

      <div class="panel mt-md">
        <div class="panel-title">Thiết Lập Lộ Trình</div>
        <div class="panel-body no-pad" style="max-height: 300px; overflow-y:auto">
          ${n.map($=>{const w=y[$.id],k=$.id===m.currentArea&&!h,L=m.level<($.min_level||1),S=parseInt($.travel_time)||0,E=(w==null?void 0:w.staminaCost)||"?",M=i[$.id]||"";return`
              <div class="list-item ${k||L?"":"clickable"}" ${!k&&!L&&!h?`data-travel="${$.id}"`:""} style="padding: 10px 14px">
                <div class="item-info" style="flex:1">
                  <div class="item-name" style="font-size:14px">
                    ${$.name}
                    ${k?' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>':""}
                    ${L?` <span style="color:var(--red); font-size:11px">[Lv.${$.min_level}+]</span>`:""}
                  </div>
                  <div class="item-meta" style="margin-top:2px;display:flex;gap:6px;flex-wrap:wrap">
                    <span>Lv.${$.min_level||1}+</span>
                    <span>${S>0?"⏱ "+S+"s":"⚡ Tức thời"}</span>
                    <span>🏃 -${E}</span>
                    ${M?`<span style="font-size:10px;opacity:0.6">${M}</span>`:""}
                  </div>
                  ${$.description?`<div class="text-xs text-dim" style="margin-top:2px">${$.description}</div>`:""}
                </div>
                ${!k&&!L&&!h?`
                  <button class="btn btn--blue btn--sm" data-travel="${$.id}">
                    ${S>0?"🚶 Di chuyển":"⚡ Đi"}
                  </button>
                `:""}
              </div>`}).join("")}
        </div>
      </div>`,s.querySelectorAll("[data-travel]").forEach($=>{$.addEventListener("click",async w=>{w.stopPropagation();const k=$.dataset.travel;s.querySelectorAll("[data-travel]").forEach(L=>{L.tagName==="BUTTON"&&(L.disabled=!0),L.style.pointerEvents="none"});try{const L=await c.request(`/player/${t.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:k})});L.player&&(t.player=L.player,T()),l(L.message,"success"),O(s,e)}catch(L){l(L.message||"Lỗi di chuyển!","error"),O(s,e)}})}),h&&p>0){let $=p;const w=p,k=setInterval(async()=>{$--;const L=document.getElementById("travelTimer"),S=document.getElementById("travelBar");if(L&&(L.textContent=`⏳ ${Math.max(0,$)}s`),S&&(S.style.width=`${Math.max(0,$/w*100)}%`),$<=0){clearInterval(k);try{const E=await c.request(`/player/${t.playerId}/travel-check`,{method:"POST"});E.player&&(t.player=E.player,T()),E.arrived&&l(E.message,"success"),O(s,e)}catch{O(s,e)}}},1e3)}}catch(u){s.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(u)}}function F(s,e){var i,o;const{state:t,renderGame:c,notify:l,updateSidebar:T}=e,u=t.player,d=t.recipes||[],v=t.medicines||[],f=t._alchemyTab||"recipes",m=n=>{const x=v.find($=>$.id===n);return x?(x.icon||"💊")+" "+x.name:n};let h=0,p=0,b=0,y=0;(u.skills||[]).forEach(n=>{const x=typeof n=="string"?n:n.id,$=typeof n=="string"?1:n.level||1;x==="tinh_che"&&(h=$*2),x==="phu_an_thuat"&&(p=$*5),x==="linh_kiem_thuat"&&(b=$*10),x==="cuong_hoa_thuat"&&(y=$*15)});const g=n=>n.split("_").map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(" "),a=[];Object.values(u.equipment||{}).forEach(n=>{n&&a.push({...n,loc:"eq"})}),(u.inventory||[]).filter(n=>n.slot&&n.slot!=="consumable").forEach(n=>a.push({...n,loc:"inv"}));let r=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${f==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${f==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${h||p||b||y?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${h?`<span>🔥 Thành công +${h}%</span>`:""}
      ${p?`<span>💎 Giảm phí -${p}%</span>`:""}
      ${b?`<span>✨ Chất lượng +${b}%</span>`:""}
      ${y?`<span>⬆️ Nâng đôi ${y}%</span>`:""}
    </div>
    `:""}
  `;if(f==="recipes"){if(r+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!u.materials||Object.keys(u.materials).length===0)r+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[n,x]of Object.entries(u.materials))r+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${g(n)} <span style="color:var(--gold)">x${x}</span></div>`;r+="</div></div>",r+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',d.length===0?r+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':d.forEach(n=>{var S;const x=m(n.target),$=Math.min(100,(n.successRate||100)+h);let w="";(S=n.requirements)!=null&&S.skill&&(w=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${g(n.requirements.skill)} lv${n.requirements.level||1}</div>`);let k="";n.materials.forEach(E=>{var P;const M=((P=u.materials)==null?void 0:P[E.id])||0;k+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${M>=E.amount?"var(--green)":"var(--red)"};font-weight:bold">${M}/${E.amount}</span> ${g(E.id)}</span>`});const L=v.find(E=>E.id===n.target)||{};r+=`
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
              ${w}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${k}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${L.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${n.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),r+="</div></div>"}else r+=`
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${a.length===0?'<div style="opacity:0.3">Không có trang bị nào...</div>':`
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${a.map(n=>`<option value="${n.id}">${n.loc==="eq"?"🔸":"📦"} ${n.name||n.baseType} [${n.rarity||"?"}] ${(n.affixes||[]).length} affix</option>`).join("")}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(n=>{const x=Math.max(1,Math.round(n.cost*(1-p/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${n.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${n.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${n.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${n.id}" style="width:100%">
                💎 ${x} ${p>0?`<s style="opacity:0.4;font-size:10px">${n.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;s.innerHTML=r,s.querySelectorAll(".tab-btn").forEach(n=>{n.addEventListener("click",()=>{t._alchemyTab=n.dataset.tab,F(s,e)})}),s.querySelectorAll(".accordion-header").forEach(n=>{n.addEventListener("click",()=>{const x=n.nextElementSibling;x.style.display==="none"?(x.style.display="block",n.querySelector(".text-dim:last-child").textContent="▲"):(x.style.display="none",n.querySelector(".text-dim:last-child").textContent="▼")})}),s.querySelectorAll(".btn-craft").forEach(n=>{n.addEventListener("click",async x=>{x.stopPropagation();const $=d.find(w=>w.id===n.dataset.recipe);if($&&u.gold<($.cost||0))return l("Không đủ linh thạch!","error");try{const w=await q.craftItem(u.id,n.dataset.recipe);t.player=w.player,l(w.message,w.success?"success":"error"),c()}catch(w){l(w.message,"error")}})}),s.querySelectorAll(".btn-currency").forEach(n=>{n.addEventListener("click",async()=>{const x=document.getElementById("selItem");if(!(x!=null&&x.value))return l("Chọn trang bị trước!","error");const $=n.dataset.cid;let w=-1;if($==="thien_menh_phu"){const k=a.find(E=>E.id===x.value),L=(k==null?void 0:k.affixes)||[];if(L.length===0)return l("Item không có affix để khóa!","error");const S=prompt(`Chọn affix để khóa (0-${L.length-1}):
${L.map((E,M)=>`${M}: ${E.name||E.stat} +${E.value}`).join(`
`)}`);if(S===null)return;if(w=parseInt(S),isNaN(w)||w<0||w>=L.length)return l("Chỉ số không hợp lệ!","error")}n.disabled=!0,n.textContent="⏳...";try{const k=await q.applyCurrency(u.id,$,x.value,w);l(k.message,"success"),t.player=k.player,T(),F(s,e)}catch(k){l(k.message,"error"),n.disabled=!1,n.textContent="💎 Dùng"}})}),(i=document.getElementById("selItem"))==null||i.addEventListener("change",()=>{const n=a.find($=>$.id===document.getElementById("selItem").value),x=document.getElementById("itemPreview");n&&x&&(x.innerHTML=(n.affixes||[]).map($=>`<span style="color:var(--blue)">• ${$.name||$.stat} +${$.value}</span>`).join(" | ")||"Không có affix")}),(o=document.getElementById("selItem"))==null||o.dispatchEvent(new Event("change"))}function bt(s,e){const{state:t,api:c,notify:l,renderGame:T}=e;t.player,s.innerHTML=`
    <div class="page-header">
      <h2>🏷️ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ nhiệm vụ từ các NPC</p>
    </div>
    <div id="questList" class="quest-container">
      <div class="loading-spinner">⏳ Đang tải...</div>
    </div>
  `,u();async function u(){try{const v=(await c.getQuests(t.playerId)).quests||[],f=document.getElementById("questList");if(!f)return;if(v.length===0){f.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}f.innerHTML=v.map(m=>{const h=m.questAmount>0?Math.min(100,m.progress/m.questAmount*100):0,p=m.progress>=m.questAmount,b=m.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${p?"quest-done":""}" data-quest-id="${m.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${m.npcIcon||"🧓"} ${m.npcName||"NPC"}</span>
              <span class="quest-type">${b} ${m.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${m.questName||m.quest_id}</div>
            <div class="quest-desc">${m.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${p?"hp":"energy"}" style="width:${h}%"></div>
              </div>
              <span class="quest-progress-text">${m.progress}/${m.questAmount}</span>
            </div>
            ${p?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${m.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),f.querySelectorAll(".quest-complete-btn").forEach(m=>{m.addEventListener("click",async()=>{const h=m.dataset.qid;m.disabled=!0,m.textContent="⏳...";try{const p=await c.completeQuest(t.playerId,h);t.player=p.player,l(p.message,"success"),p.skillGained&&l(`🎯 Lĩnh ngộ: ${p.skillGained}!`,"success"),T()}catch(p){l(p.message||"Lỗi trả quest","error"),m.disabled=!1,m.textContent="✅ Trả Nhiệm Vụ"}})})}catch(d){console.error("Error loading quests:",d);const v=document.getElementById("questList");v&&(v.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function xt(s,e){const{state:t,api:c,notify:l,renderGame:T}=e;if(t.player.role!=="admin"){s.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const u=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let d="monsters";s.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${u.map(r=>`
          <button class="admin-tab ${r.id===d?"active":""}" data-tab="${r.id}">${r.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",r=>{const i=r.target.closest(".admin-tab");i&&(d=i.dataset.tab,document.querySelectorAll(".admin-tab").forEach(o=>o.classList.remove("active")),i.classList.add("active"),v(d))}),v(d);async function v(r){const i=document.getElementById("adminContent");if(i){i.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const o=await c.request(`/admin/${r}?adminId=${t.playerId}`);f(r,o,i)}catch(o){i.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${o.message}</div></div>`}}}function f(r,i,o){r==="monsters"?m(i,o):r==="npcs"?h(i,o):r==="areas"?p(i,o):b(r,i,o)}function m(r,i){const o=r.monsters||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${o.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${o.map(n=>{var x,$,w,k,L,S,E,M;return`
          <div class="admin-card" data-id="${n.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${n.name} ${n.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${(($=(x=r.tierInfo)==null?void 0:x[n.tier])==null?void 0:$.color)||"#888"}">${((k=(w=r.tierInfo)==null?void 0:w[n.tier])==null?void 0:k.name)||"T"+n.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((L=n.stats)==null?void 0:L.hp)||"?"}</div>
              <div>💪 ${((S=n.stats)==null?void 0:S.strength)||"?"}</div>
              <div>🏃 ${((E=n.stats)==null?void 0:E.speed)||"?"}</div>
              <div>🛡 ${((M=n.stats)==null?void 0:M.defense)||"?"}</div>
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
    `,g(i,r,"monsters","monsters")}function h(r,i){const o=r.npcs||[];i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${o.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${o.map(n=>`
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
    `,g(i,r,"npcs","npcs")}function p(r,i){const o=Object.keys(r);i.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${o.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${o.map(n=>{const x=r[n];return`
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
    `,i.querySelectorAll(".admin-edit-area").forEach(n=>{n.addEventListener("click",()=>{const x=n.dataset.id,$=r[x];y(x,$,`areas/${x}`)})})}function b(r,i,o){var $;const n=JSON.stringify(i,null,2),x=n.split(`
`).length;o.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${r} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(x+5,30)}">${a(n)}</textarea>
    `,($=document.getElementById("btnSaveGeneric"))==null||$.addEventListener("click",async()=>{try{const w=document.getElementById("genericEditor").value,k=JSON.parse(w);l("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(w){l("JSON không hợp lệ: "+w.message,"error")}})}function y(r,i,o,n){const x=JSON.stringify(i,null,2),$=document.createElement("div");$.className="admin-modal-overlay",$.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${r}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${a(x)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild($),$.querySelectorAll(".admin-modal-close").forEach(w=>{w.addEventListener("click",()=>$.remove())}),$.addEventListener("click",w=>{w.target===$&&$.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const w=document.getElementById("modalEditor").value,k=JSON.parse(w);await c.request(`/admin/${o}?adminId=${t.playerId}`,{method:"PUT",body:JSON.stringify({data:k})}),l("✅ Đã lưu!","success"),$.remove(),v(d)}catch(w){l("Lỗi: "+w.message,"error")}})}function g(r,i,o,n){r.querySelectorAll(".admin-edit-btn").forEach(x=>{x.addEventListener("click",()=>{const $=x.dataset.id,k=(i[n]||[]).find(L=>L.id===$);k&&y($,k,`${o}/${$}`)})})}function a(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function et(s,e){const{state:t,api:c,notify:l,renderGame:T,updateSidebar:u}=e,d=t.playerId;t._social||(t._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const v=t._social;async function f(){try{const g=await c.getRelationships(d);v.relationships=g,v.loaded=!0,m()}catch(g){l(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function m(){const{friends:g,enemies:a,pendingSent:r,pendingReceived:i}=v.relationships,o=i.length;s.innerHTML=`
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
            ${v.searchResults.map(n=>`
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
        `:v.searchQuery?'<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>':""}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${v.tab==="friends"?"btn--blue":"btn--dark"}" data-tab="friends">
          🤝 Đạo Hữu (${g.length})
        </button>
        <button class="btn btn--sm ${v.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${a.length})
        </button>
        <button class="btn btn--sm ${v.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${o>0?`<span class="badge">${o}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${v.tab==="friends"?h(g):""}
        ${v.tab==="enemies"?p(a):""}
        ${v.tab==="pending"?b(i,r):""}
      </div>
    `,y()}function h(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(a=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${a.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${a.level} · ${a.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${a.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${a.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function p(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(a=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${a.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${a.level} · ${a.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${a.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${a.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function b(g,a){let r="";return g.length>0&&(r+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',r+=g.map(i=>`
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
      `).join("")),a.length>0&&(r+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',r+=a.map(i=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${i.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${i.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&a.length===0&&(r='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),r}function y(){var g,a;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var i;const r=(i=document.getElementById("socialSearch"))==null?void 0:i.value.trim();if(!r||r.length<2)return l("Cần ít nhất 2 ký tự","error");v.searchQuery=r;try{const o=await c.searchPlayers(r);v.searchResults=o.players||[],m()}catch(o){l(o.message,"error")}}),(a=document.getElementById("socialSearch"))==null||a.addEventListener("keydown",r=>{var i;r.key==="Enter"&&((i=document.getElementById("btnSearch"))==null||i.click())}),document.querySelectorAll("[data-tab]").forEach(r=>{r.addEventListener("click",()=>{v.tab=r.dataset.tab,m()})}),document.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",async()=>{const i=r.dataset.action,o=r.dataset.target;r.disabled=!0;try{let n;switch(i){case"add-friend":n=await c.addFriend(d,o);break;case"accept-friend":n=await c.acceptFriend(d,o);break;case"reject-friend":n=await c.rejectFriend(d,o);break;case"remove-friend":n=await c.removeFriend(d,o);break;case"add-enemy":n=await c.addEnemy(d,o);break;case"remove-enemy":n=await c.removeEnemy(d,o);break}l(n.message||"Thành công!","success"),await f()}catch(n){l(n.message||"Lỗi!","error"),r.disabled=!1}})})}v.loaded?m():f()}function at(s,e){const{state:t,api:c,notify:l}=e,T=t.playerId;t._chat||(t._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const u=t._chat;async function d(){try{const[a,r]=await Promise.all([c.getGlobalChat(),c.getChatFriends(T)]);u.globalMessages=a.messages||[],u.friends=r.friends||[],u.globalMessages.length>0&&(u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id),u.loaded=!0,m(),v()}catch(a){l(a.message||"Lỗi tải chat","error")}}function v(){f(),u.pollTimer=setInterval(async()=>{try{if(u.tab==="global"){const a=await c.getGlobalChat(u.lastGlobalId);a.messages&&a.messages.length>0&&(u.globalMessages.push(...a.messages),u.globalMessages.length>100&&(u.globalMessages=u.globalMessages.slice(-100)),u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id,p(),b())}else if(u.tab==="private"&&u.selectedFriend){const a=await c.getPrivateChat(T,u.selectedFriend.id,u.lastPrivateId);a.messages&&a.messages.length>0&&(u.privateMessages.push(...a.messages),u.privateMessages.length>100&&(u.privateMessages=u.privateMessages.slice(-100)),u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id,p(),b())}}catch{}},5e3)}function f(){u.pollTimer&&(clearInterval(u.pollTimer),u.pollTimer=null)}function m(){const a=u.tab==="global"?u.globalMessages:u.privateMessages;s.innerHTML=`
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
            ${u.friends.map(r=>{var i;return`<option value="${r.id}" ${((i=u.selectedFriend)==null?void 0:i.id)===r.id?"selected":""}>${r.name} (Lv.${r.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${h(a)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${u.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),b()}function h(a){return a.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':a.map(r=>{const i=r.sender_id===T,o=new Date(r.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${i?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${o}</span>
          <span style="font-weight:600;color:${i?"var(--blue)":"var(--gold)"}"> ${r.sender_name}</span>
          <span style="opacity:0.8">: ${y(r.message)}</span>
        </div>
      `}).join("")}function p(){const a=document.getElementById("chatMessages");if(!a)return;const r=u.tab==="global"?u.globalMessages:u.privateMessages;a.innerHTML=h(r)}function b(){const a=document.getElementById("chatMessages");a&&(a.scrollTop=a.scrollHeight)}function y(a){const r=document.createElement("div");return r.textContent=a,r.innerHTML}function g(){var r,i,o;document.querySelectorAll("[data-chat-tab]").forEach(n=>{n.addEventListener("click",()=>{u.tab=n.dataset.chatTab,u.tab==="global"&&(u.lastGlobalId=u.globalMessages.length>0?u.globalMessages[u.globalMessages.length-1].id:0),m(),v()})}),(r=document.getElementById("friendSelect"))==null||r.addEventListener("change",async n=>{const x=n.target.value;if(!x){u.selectedFriend=null,u.privateMessages=[],m();return}u.selectedFriend=u.friends.find($=>$.id===x)||null,u.lastPrivateId=0;try{const $=await c.getPrivateChat(T,x);u.privateMessages=$.messages||[],u.privateMessages.length>0&&(u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id),p(),b()}catch($){l($.message,"error")}});const a=async()=>{var $,w;const n=document.getElementById("chatInput"),x=n==null?void 0:n.value.trim();if(x){if(u.tab==="private"&&!u.selectedFriend)return l("Chọn Đạo Hữu trước!","error");try{if(await c.sendChat(T,u.tab,u.tab==="private"?u.selectedFriend.id:null,x),n.value="",u.tab==="global"){const k=await c.getGlobalChat(u.lastGlobalId);(($=k.messages)==null?void 0:$.length)>0&&(u.globalMessages.push(...k.messages),u.lastGlobalId=u.globalMessages[u.globalMessages.length-1].id)}else{const k=await c.getPrivateChat(T,u.selectedFriend.id,u.lastPrivateId);((w=k.messages)==null?void 0:w.length)>0&&(u.privateMessages.push(...k.messages),u.lastPrivateId=u.privateMessages[u.privateMessages.length-1].id)}p(),b()}catch(k){l(k.message||"Lỗi gửi tin nhắn","error")}}};(i=document.getElementById("btnSend"))==null||i.addEventListener("click",a),(o=document.getElementById("chatInput"))==null||o.addEventListener("keydown",n=>{n.key==="Enter"&&a()})}e.renderGame,u.loaded?(m(),v()):d()}function ft(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;t._market||(t._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const d=t._market;async function v(){try{const[a,r]=await Promise.all([c.getMarketListings(d.filter,d.sort),c.getMyListings(u)]);d.listings=a.listings||[],d.myListings=r.listings||[],d.loaded=!0,m()}catch(a){l(a.message||"Lỗi tải Giao Dịch Đài","error")}}async function f(){try{const[a,r]=await Promise.all([c.getMugTargets(u),c.getMugLog(u)]);d.mugTargets=a.targets||[],d.mugCooldown=a.mugCooldown||0,d.mugLog=r.logs||[],m()}catch(a){l(a.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function m(){const a=t.player;s.innerHTML=`
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

      ${d.showListForm?y(a):""}

      ${d.tab==="browse"?h():d.tab==="my"?p():b()}
    `,g()}function h(){let a=`
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
    `,r=d.listings;if(d.search.trim()){const i=d.search.toLowerCase().trim();r=r.filter(o=>{var n;return o.item_name.toLowerCase().includes(i)?!0:(n=o.item_data)!=null&&n.affixes?o.item_data.affixes.some(x=>(x.stat||"").toLowerCase().includes(i)||(x.type||"").toLowerCase().includes(i)):!1})}return r.length===0?a+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(a+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',a+=r.map(i=>{var w,k;const o=i.item_type==="item"?"⚔️":i.item_type==="material"?"🧱":"💊",n=((w=i.item_data)==null?void 0:w.rarity)||"",x=i.seller_id===u,$=(k=i.item_data)!=null&&k.affixes?i.item_data.affixes.map(L=>`${L.stat} ${L.type==="flat"?"+":""}${L.value}${L.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${o}
                <span style="color:var(--gold)">${i.item_name}</span>
                ${i.quantity>1?`<span style="opacity:0.5"> x${i.quantity}</span>`:""}
                ${n?`<span class="rarity-${n}" style="font-size:11px;margin-left:4px">[${n}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${i.seller_name}</span>
                ${$?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${$}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${i.price}${i.quantity>1?"/cái":""}</span>
              ${x?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${i.id}" data-qty="${i.quantity}" data-price="${i.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),a+="</div></div>"),a}function p(){if(d.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let a='<div class="panel"><div class="panel-body no-pad">';return a+=d.myListings.map(r=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${r.item_type==="item"?"⚔️":r.item_type==="material"?"🧱":"💊"} ${r.item_name} ${r.quantity>1?`<span style="opacity:0.5">x${r.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${r.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${r.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),a+="</div></div>",a}function b(){let a=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${d.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${d.mugCooldown}s</div>`:""}
    `;return d.mugTargets.length===0?a+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':a+=d.mugTargets.map(r=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${r.gender==="female"?"♀":"♂"} ${r.name}</div>
            <div class="item-meta">Lv.${r.level} · ${r.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${r.id}" ${d.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),a+="</div></div>",d.mugLog.length>0&&(a+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${d.mugLog.map(r=>{const i=r.attacker_id===u,o=r.outcome==="success"?"✅":"❌",n=r.outcome==="success"?"var(--green)":"var(--red)",x=i?r.outcome==="success"?`Cướp ${r.victim_name}: +${r.gold_stolen} 💎`:`Phục kích ${r.victim_name} thất bại!`:r.outcome==="success"?`Bị ${r.attacker_name} cướp: -${r.gold_stolen} 💎`:`${r.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${n}">${o} ${x} <span style="opacity:0.4;margin-left:auto">${new Date(r.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),a}function y(a){const r=Object.entries(a.materials||{}).map(([x,$])=>({id:x,qty:$,type:"material",name:x})),i=Object.entries(a.medicines||{}).map(([x,$])=>({id:x,qty:$,type:"medicine",name:x})),o=(a.inventory||[]).map(x=>({id:x.id,qty:1,type:"item",name:x.name||x.id})),n=[...r,...i,...o];return`
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
    `}function g(){var a,r,i,o;document.querySelectorAll("[data-mtab]").forEach(n=>{n.addEventListener("click",()=>{if(d.tab=n.dataset.mtab,d.tab==="mug"&&d.mugTargets.length===0){f();return}m()})}),(a=document.getElementById("btnShowList"))==null||a.addEventListener("click",()=>{d.showListForm=!d.showListForm,m()}),document.querySelectorAll("[data-filter]").forEach(n=>{n.addEventListener("click",async()=>{d.filter=n.dataset.filter,await v()})}),(r=document.getElementById("sortSelect"))==null||r.addEventListener("change",async n=>{d.sort=n.target.value,await v()}),(i=document.getElementById("searchInput"))==null||i.addEventListener("input",n=>{d.search=n.target.value,m();const x=document.getElementById("searchInput");x&&(x.focus(),x.setSelectionRange(d.search.length,d.search.length))}),(o=document.getElementById("btnConfirmList"))==null||o.addEventListener("click",async()=>{var L,S,E;const n=(L=document.getElementById("listItem"))==null?void 0:L.value;if(!n)return;const[x,$]=n.split("|"),w=parseInt((S=document.getElementById("listQty"))==null?void 0:S.value)||1,k=parseInt((E=document.getElementById("listPrice"))==null?void 0:E.value)||0;if(k<=0)return l("Giá phải lớn hơn 0!","error");try{const M=await c.listForSale(u,x,$,w,k);l(M.message,"success"),t.player=M.player,T(),d.showListForm=!1,await v()}catch(M){l(M.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(n=>{n.addEventListener("click",async()=>{const x=parseInt(n.dataset.buy),$=parseInt(n.dataset.qty),w=parseInt(n.dataset.price);let k=1;if($>1){const L=prompt(`Mua bao nhiêu? (tối đa ${$}, giá ${w} 💎/cái)`,"1");if(!L)return;k=Math.min(parseInt(L)||1,$)}n.disabled=!0;try{const L=await c.buyFromMarket(u,x,k);l(L.message,"success"),t.player=L.player,T(),await v()}catch(L){l(L.message,"error"),n.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(n=>{n.addEventListener("click",async()=>{n.disabled=!0;try{const x=await c.cancelListing(u,parseInt(n.dataset.cancel));l(x.message,"success"),t.player=x.player,T(),await v()}catch(x){l(x.message,"error"),n.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(n=>{n.addEventListener("click",async()=>{const x=n.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){n.disabled=!0,n.textContent="⏳...";try{const $=await c.mugPlayer(u,x);l($.message,$.success?"success":"error"),t.player=$.player,T(),await f()}catch($){l($.message,"error"),n.disabled=!1,n.textContent="💀 Phục Kích"}}})})}d.tab==="mug"?f():d.loaded?m():v()}function $t(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;let d=!1,v=null;async function f(){try{v=await c.getRealmInfo(u),d=!0,m()}catch(b){l(b.message||"Lỗi tải Cảnh Giới","error")}}function m(){if(!v)return;const b=v.current,y=v.allRealms||[],g=t.player,a=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;s.innerHTML=`
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
            <div style="opacity:0.5;font-size:13px">Tầng ${b.tier}/8 · ${b.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${g.level} — ${g.xp}/${g.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${a}%;background:${b.color}"></div></div>
        </div>

        ${b.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(b.bonuses).filter(([,r])=>r>0).map(([r,i])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${i} ${r}</span>
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
        ${y.map(r=>{const i=r.tier===b.tier,o=r.tier<b.tier,x=r.tier>b.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${i?`2px solid ${r.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${x};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${r.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${r.color}">${r.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${r.levelMin}+</span>
                ${r.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${r.failChance}% thất bại</span>`:""}
                ${o?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${i?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,p()}function h(b){const y=b.nextRealm;if(!y)return"";const g=y.cost?`💎 ${y.cost.gold} + 🔮 ${y.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${y.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${y.name} ${y.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${g}</div>
          ${y.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${y.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(y.bonuses).filter(([,a])=>a>0).map(([a,r])=>`+${r} ${a}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${y.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function p(){var b;(b=document.getElementById("btnBreakthrough"))==null||b.addEventListener("click",async()=>{const y=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){y.disabled=!0,y.textContent="⏳ Đang đột phá...";try{const g=await c.attemptBreakthrough(u);g.success?(l(g.message,"success"),t.player=g.player,T(),await f()):(l(g.message,"error"),g.player&&(t.player=g.player,T()),await f())}catch(g){l(g.message||"Lỗi đột phá","error"),y.disabled=!1,y.textContent="⚡ ĐỘT PHÁ"}}})}f()}function Tt(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e;wt(s,e)}async function wt(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e;s.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const d=(await c.request(`/player/${t.playerId}/events`)).events||[];if(t.player&&(t.player.unreadEventsCount=0,T()),d.length===0){s.innerHTML=`
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
            ${d.map(v=>{const f=new Date(v.created_at*1e3),m=f.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),h=f.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let p="📌";return v.type==="attack"&&(p="⚔️"),v.type==="hospital"&&(p="🏥"),v.type==="jail"&&(p="🚓"),v.type==="money"&&(p="💰"),v.type==="system"&&(p="⚙️"),v.type==="trade"&&(p="🤝"),`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${m}</div>
                    <div>${h}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${p}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${v.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${v.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(u){s.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${u.message}</div></div>`}}function kt(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;t._tc||(t._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const d=t._tc;async function v(){try{d.data=await c.request(`/player/${u}/atlas-maps`),d.loaded=!0,f()}catch(g){l(g.message,"error")}}function f(){const g=d.data,a=(g==null?void 0:g.atlas)||{},r=(g==null?void 0:g.maps)||[],i=g==null?void 0:g.activeRun,o=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,s.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${a.completed||0}/${a.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${a.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${a.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${a.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${d.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${d.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${r.length})</button>
        ${i?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,s.querySelectorAll("[data-tab]").forEach(x=>{x.addEventListener("click",()=>{d.tab=x.dataset.tab,f()})});const n=document.getElementById("tcContent");n&&(i&&d.tab==="run"?b(n,i):d.tab==="inventory"?h(n,r):m(n,o,a))}function m(g,a,r){var o;const i=((o=d.data)==null?void 0:o.tiers)||[];g.innerHTML=i.map(n=>{const x=a.filter($=>$.tier===n.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${n.tier} ${n.name} <span style="opacity:0.4;font-size:11px">(Realm ${n.requiredRealm}+, ${n.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${x.map($=>{var L;const w=((L=r.progress)==null?void 0:L[$.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[$.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${w?700:400}">${$.name}</span>
                ${w?`<span style="color:var(--green);font-size:11px">✅ ×${w}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function h(g,a,r){if(a.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=a.map((i,o)=>{const n=i.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${y(i.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${i.mapName||i.mapId} <span style="color:${y(i.tier)};font-size:12px">T${i.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${n.length>0?n.map(x=>x.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${n.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${o}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${o}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(i=>{i.addEventListener("click",async()=>{try{const o=await c.request(`/player/${u}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(i.dataset.idx)})});l(o.message,"success"),t.player=o.player,T(),d.tab="run",await v()}catch(o){l(o.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(i=>{i.addEventListener("click",()=>p(parseInt(i.dataset.idx)))})}function p(g){var i;const a=((i=d.data)==null?void 0:i.modifiers)||[],r=document.createElement("div");r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",r.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${a.map(o=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${o.id}">
          <span style="flex:1"><strong>${o.name}</strong><br><span style="font-size:11px;opacity:0.6">${o.desc} · IIQ +${o.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,r.addEventListener("click",async o=>{const n=o.target.closest("[data-modid]");if(n)try{const x=await c.request(`/player/${u}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:n.dataset.modid})});l(x.message,"success"),t.player=x.player,T(),r.remove(),await v()}catch(x){l(x.message,"error")}else o.target===r&&r.remove()}),document.body.appendChild(r)}function b(g,a){var o,n;const r=a.currentWave/a.totalWaves*100,i=a.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${a.mapName} <span style="color:${y(a.tier)}">T${a.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${a.currentWave}/${a.totalWaves}
            ${i.length>0?" · "+i.map(x=>x.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${r}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${d.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(o=document.getElementById("btnTCFight"))==null||o.addEventListener("click",async()=>{d.fighting=!0,f();try{const x=await c.request(`/player/${u}/atlas-maps/fight`,{method:"POST"});t.player=x.player,T();const $=x.result!=="map_failed";l(x.message,$?"success":"error"),d.fighting=!1,(x.result==="map_complete"||x.result==="map_failed")&&(d.tab="atlas"),await v()}catch(x){l(x.message,"error"),d.fighting=!1,f()}}),(n=document.getElementById("btnTCQuit"))==null||n.addEventListener("click",async()=>{try{await c.request(`/player/${u}/atlas-maps/abandon`,{method:"POST"}),l("Đã rời Tiên Cảnh","info"),d.tab="atlas",await v()}catch(x){l(x.message,"error")}})}function y(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}d.loaded?f():v()}function Lt(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;t._tw||(t._tw={data:null,loaded:!1,fighting:!1,tab:"tower"});const d=t._tw;async function v(){try{d.data=await c.request(`/player/${u}/tower`),d.loaded=!0,f()}catch(b){l(b.message,"error")}}function f(){var o,n;const b=d.data,y=b==null?void 0:b.run,g=(b==null?void 0:b.leaderboard)||[],a=(b==null?void 0:b.milestones)||{},r=b==null?void 0:b.nextMilestone;s.innerHTML=`
      <div class="page-header">
        <h2>🗼 Thiên Phần Tháp</h2>
        <p class="page-sub">Leo tháp vô hạn — mùa ${(b==null?void 0:b.season)||"?"} | Reset hàng tháng</p>
      </div>

      <!-- STATUS CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid #ff4500">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:48px">🗼</div>
          <div style="flex:1">
            ${y?`
              <div style="font-weight:800;font-size:22px">Tầng ${y.currentFloor}</div>
              <div style="font-size:12px;opacity:0.6">Kỷ lục: T.${y.highestFloor} · ${y.totalKills} kills · ${y.status==="dead"?"💀 Đã ngã":"🟢 Đang leo"}</div>
              ${r?`<div style="font-size:11px;margin-top:4px;color:var(--gold)">🎯 Mốc tiếp: T.${r.floor} → ${r.reward.title} (+${r.reward.gold}💎)</div>`:""}
            `:`
              <div style="font-weight:700;font-size:16px">Chưa vào tháp mùa này</div>
              <div style="font-size:12px;opacity:0.5">Bắt đầu leo để tranh hạng!</div>
            `}
          </div>
          <div>
            ${!y||y.status==="dead"?`<button class="btn btn--red btn--lg" id="btnEnter">${y?"🔄 Hồi Sinh":"⚡ Vào Tháp"}</button>`:`<button class="btn btn--red btn--lg" id="btnFight" ${d.fighting?"disabled":""}>⚔️ Chiến Đấu</button>`}
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
    `,s.querySelectorAll("[data-tab]").forEach(x=>x.addEventListener("click",()=>{d.tab=x.dataset.tab,f()})),(o=document.getElementById("btnEnter"))==null||o.addEventListener("click",async()=>{try{const x=await c.request(`/player/${u}/tower/climb`,{method:"POST"});l(x.message,"success"),await v()}catch(x){l(x.message,"error")}}),(n=document.getElementById("btnFight"))==null||n.addEventListener("click",async()=>{var x,$;d.fighting=!0,f();try{const w=await c.request(`/player/${u}/tower/fight`,{method:"POST"});t.player=w.player,T(),d.fighting=!1;const k=document.getElementById("twResult");if(k){const L=w.result!=="death";k.innerHTML=`
            <div class="panel" style="border-left:3px solid ${L?"var(--green)":"var(--red)"}">
              <div class="panel-body" style="padding:14px">
                <div style="font-weight:700;font-size:14px">${w.message}</div>
                ${(x=w.loot)!=null&&x.length?`<div style="font-size:12px;margin-top:6px;opacity:0.7">${w.loot.join(" · ")}</div>`:""}
                ${w.milestone?`<div style="margin-top:8px;padding:8px;background:rgba(255,215,0,0.15);border-radius:6px;font-weight:700;color:var(--gold)">🏆 ${w.milestone.title}!</div>`:""}
                ${(($=w.combatResults)==null?void 0:$.map(S=>`<details style="margin-top:6px"><summary style="cursor:pointer;font-size:11px">${S.monster} — ${S.result==="win"?"✅":"❌"}</summary><pre style="font-size:10px;max-height:150px;overflow:auto;opacity:0.6;margin-top:4px">${(S.log||[]).map(E=>`${E.turn||""}: ${E.text||JSON.stringify(E)}`).join(`
`)}</pre></details>`).join(""))||""}
              </div>
            </div>
          `}await v()}catch(w){l(w.message,"error"),d.fighting=!1,f()}});const i=document.getElementById("twContent");i&&(d.tab==="leaderboard"?h(i,g,b.playerRank):d.tab==="milestones"?p(i,a,(y==null?void 0:y.highestFloor)||0):m(i,y))}function m(b,y){if(!y){b.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Vào tháp để bắt đầu leo!</div></div>';return}const g=y.currentFloor,a=[];g%10===0?a.push("👑 Boss"):g%15===0?a.push("💰 Bảo Tàng (2.5x loot)"):g%7===0?a.push("☠️ Bẫy Trận (-10% HP)"):g%13===0?a.push("💚 Linh Tuyền (+20% HP)"):g%11===0?a.push("⚡ Tinh Anh (+30% stats)"):g%9===0&&g>20&&a.push("☯ Ngũ Hành");const r=Math.min(1+Math.floor(g/20),3);b.innerHTML=`<div class="panel"><div class="panel-body" style="padding:14px">
      <div style="font-weight:700">Tầng ${g} Preview</div>
      <div style="font-size:12px;opacity:0.7;margin-top:4px">
        ${a.length?a.join(" · "):"⚔️ Thường"}
        · ${r} quái
        · Sức mạnh ×${Math.pow(1.08,g-1).toFixed(1)}
      </div>
    </div></div>`}function h(b,y,g){var a;b.innerHTML=`<div class="panel"><div class="panel-title">🏆 Mùa ${(a=d.data)==null?void 0:a.season}</div><div class="panel-body no-pad">
      ${y.length===0?'<div style="padding:20px;text-align:center;opacity:0.4">Chưa có ai leo tháp mùa này</div>':""}
      ${y.map(r=>{const i=r.rank<=3?["","🥇","🥈","🥉"][r.rank]:`#${r.rank}`,o=r.playerId===u;return`<div class="list-item" style="padding:8px 14px;${o?"background:rgba(255,215,0,0.1)":""}">
          <span style="width:40px;font-weight:700;font-size:14px">${i}</span>
          <span style="flex:1;font-weight:${o?800:400}">${r.name}</span>
          <span style="font-size:12px;opacity:0.7">T.${r.floor} · ${r.kills} kills</span>
        </div>`}).join("")}
    </div></div>
    ${g>0?`<div style="text-align:center;margin-top:8px;font-size:12px;opacity:0.6">Hạng của bạn: #${g}</div>`:""}`}function p(b,y,g){b.innerHTML=`<div class="panel"><div class="panel-title">🎯 Mốc Thưởng</div><div class="panel-body no-pad">
      ${Object.entries(y).map(([a,r])=>{const i=g>=parseInt(a);return`<div class="list-item" style="padding:10px 14px;${i?"opacity:0.5":""}">
          <span style="font-size:18px">${i?"✅":"🔒"}</span>
          <span style="flex:1;font-weight:600">Tầng ${a}</span>
          <span style="font-size:12px">${r.title} · +${r.gold}💎</span>
        </div>`}).join("")}
    </div></div>`}d.loaded?f():v()}function Et(s,e){const{state:t,api:c,notify:l,updateSidebar:T,renderGame:u}=e,d=t.playerId;t._housing||(t._housing={data:null,loaded:!1});const v=t._housing;async function f(){try{const y=await c.getHousing(d);v.data=y,v.loaded=!0,m()}catch(y){l(y.message||"Lỗi tải Động Phủ","error")}}function m(){const y=v.data;s.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${y.owned?p(y):h(y)}
    `,b()}function h(y){const g=y.tiers[1];return`
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
    `}function p(y){const g=y.gardenSlots||[],a=y.gardenHerbs||{};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏠</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${y.tierInfo.name} <span style="opacity:0.4">(T${y.tier})</span></div>
            <div style="font-size:12px;opacity:0.6">${y.tierInfo.description}</div>
            <div style="font-size:12px;margin-top:4px">
              <span style="color:var(--green)">❤️ +${y.tierInfo.hpRegen} HP/phút</span> ·
              <span style="color:var(--blue)">🌿 ${y.maxSlots} ô vườn</span>
            </div>
          </div>
          ${y.nextTier?`
            <button class="btn btn--gold btn--sm" id="btnUpgrade" title="Nâng lên ${y.nextTier.name}">
              ⬆ ${y.nextTier.cost} 💎
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
          <div style="display:grid;grid-template-columns:repeat(${Math.min(y.maxSlots,5)},1fr);gap:8px">
            ${Array.from({length:y.maxSlots},(r,i)=>{const o=g[i]||{},n=!!o.herb,x=o.ready,$=o.remaining||0,w=Math.ceil($/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${x?"var(--green)":n?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${n?`
                    <div style="font-size:20px">${x?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${o.herbName||o.herb}</div>
                    <div style="font-size:10px;color:${x?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${x?"✅ Sẵn sàng!":"⏳ "+w+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${i}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(a).map(([k,L])=>`<option value="${k}">${L.name}</option>`).join("")}
                    </select>
                  `}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>

      ${y.formations?`
      <div class="panel" style="margin-top:10px">
        <div class="panel-title flex justify-between">
          <span>🔮 Trận Pháp</span>
          ${y.dailyCost>0?`
            <span style="font-size:11px">
              Hao phí: <strong style="color:var(--orange)">${y.dailyCost} 💎/ngày</strong>
              ${y.maintenanceDue?'<button class="btn btn--sm btn--orange" id="btnMaintenance">💰 Nộp phí</button>':'<span style="color:var(--green);margin-left:6px">✅ Đã nộp</span>'}
            </span>
          `:""}
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
            ${Object.entries(y.formations).map(([r,i])=>{const o=i.currentLevel>=i.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${i.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${i.icon}</span>
                      <strong style="margin-left:4px">${i.name}</strong>
                      ${i.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${i.currentLevel}</span>`:""}
                    </div>
                    ${i.canBuild?o?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${r}">
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
    `}function b(){var y,g,a,r;(y=document.getElementById("btnBuyHouse"))==null||y.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const i=await c.buyHousing(d);l(i.message,"success"),t.player=i.player,T(),await f()}catch(i){l(i.message,"error")}}),(g=document.getElementById("btnUpgrade"))==null||g.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const i=await c.buyHousing(d);l(i.message,"success"),t.player=i.player,T(),await f()}catch(i){l(i.message,"error")}}),document.querySelectorAll(".plant-select").forEach(i=>{i.addEventListener("change",async o=>{const n=o.target.value;if(!n)return;const x=parseInt(i.dataset.slot);try{const $=await c.plantHerb(d,n,x);l($.message,"success"),await f()}catch($){l($.message,"error")}})}),(a=document.getElementById("btnHarvest"))==null||a.addEventListener("click",async()=>{try{const i=await c.harvestGarden(d);l(i.message,"success"),t.player=i.player,T(),await f()}catch(i){l(i.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(i=>{i.addEventListener("click",async()=>{const o=i.dataset.fid;i.disabled=!0,i.textContent="⏳...";try{const n=await c.upgradeFormation(d,o);l(n.message,"success"),t.player=n.player,T(),await f()}catch(n){l(n.message,"error"),i.disabled=!1,i.textContent="⬆ Nâng"}})}),(r=document.getElementById("btnMaintenance"))==null||r.addEventListener("click",async()=>{try{const i=await c.payMaintenance(d);l(i.message,"success"),t.player=i.player,T(),await f()}catch(i){l(i.message,"error")}})}v.loaded?m():f()}function St(s,e){const{state:t}=e;t._wikiTab||(t._wikiTab="lore");function c(){s.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","explore","dungeon","housing","talent","alchemy","crime","market","tips"].map(T=>`
          <button class="btn btn--sm ${t._wikiTab===T?"btn--gold":"btn--dark"}" data-tab="${T}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",explore:"🗺️ Khám Phá",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",crime:"🔪 Phạm Tội",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[T]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${l(t._wikiTab)}
        </div>
      </div>
    `,s.querySelectorAll("[data-tab]").forEach(T=>{T.addEventListener("click",()=>{t._wikiTab=T.dataset.tab,c()})})}function l(T){return{lore:`
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
      `}[T]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}c()}function Ct(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;t._npcShop||(t._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const d=t._npcShop;async function v(){try{const h=await c.getShops(u);d.shops=h.shops||[],d.tax=h.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},d.loaded=!0,f()}catch(h){l(h.message||"Lỗi tải shop","error")}}function f(){s.innerHTML=`
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
            ${h.items.map(p=>`
              <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:500">${p.name}</div>
                  <div style="font-size:11px;opacity:0.5">
                    Stock: <span style="color:${p.remainingStock>0?"var(--green)":"var(--red)"}">${p.remainingStock}/${p.dailyStock}</span>
                    · 💎 ${p.currentPrice}
                  </div>
                </div>
                <div style="display:flex;gap:4px;align-items:center">
                  <input type="number" class="buy-qty" data-shop="${h.id}" data-item="${p.id}" data-price="${p.currentPrice}"
                    value="1" min="1" max="${p.remainingStock}" style="width:40px;text-align:center;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:3px;font-size:11px">
                  <button class="btn btn--sm btn--gold btn-buy" data-shop="${h.id}" data-item="${p.id}"
                    ${p.remainingStock<=0?"disabled":""}>
                    ${p.remainingStock>0?"🛒 Mua":"❌ Hết"}
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `,m()}function m(){s.querySelectorAll(".btn-buy").forEach(h=>{h.addEventListener("click",async()=>{const p=h.dataset.shop,b=h.dataset.item,y=s.querySelector(`.buy-qty[data-shop="${p}"][data-item="${b}"]`),g=parseInt((y==null?void 0:y.value)||1);h.disabled=!0,h.textContent="⏳...";try{const a=await c.buyFromShop(u,p,b,g);l(a.message,"success"),t.player=a.player,T(),await v()}catch(a){l(a.message,"error"),h.disabled=!1,h.textContent="🛒 Mua"}})})}d.loaded?f():v()}function Mt(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;t._guild||(t._guild={data:null,loaded:!1,allGuilds:null});const d=t._guild;async function v(){try{d.data=await c.getMyGuild(u),d.loaded=!0,m()}catch(y){l(y.message||"Lỗi","error")}}async function f(){try{const y=await c.listGuilds();d.allGuilds=y.guilds||[],m()}catch(y){l(y.message,"error")}}function m(){const y=d.data;s.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${y!=null&&y.inGuild?p(y):h(y)}
    `,b()}function h(y){return`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🏗️ Lập Tông Môn Mới</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:grid;gap:8px;max-width:360px">
            <input type="text" id="guildName" placeholder="Tên Tông Môn (2-30 ký tự)" class="input" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <input type="text" id="guildTag" placeholder="Tag (2-5 ký tự, VD: TMQ)" class="input" maxlength="5" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <textarea id="guildDesc" placeholder="Mô tả..." rows="2" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;resize:none"></textarea>
            <button class="btn btn--gold" id="btnCreate">🏯 Lập Tông Môn (${(y==null?void 0:y.createCost)||1e4} 💎)</button>
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
    `}function p(y){var i;const g=y.guild,a=y.members||[],r=y.log||[];return`
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
                Buff: ${Object.entries(g.buffs).map(([o,n])=>`${o} +${n}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${y.myRole==="leader"&&g.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${g.nextLevel.name}">⬆ ${g.nextLevel.upgradeCost} 💎</button>`:""}
            ${y.myRole==="leader"&&g.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            Bạn đã đóng: ${y.myContributed} 💎 · Vai trò: ${y.myRole==="leader"?"👑 Chưởng Môn":y.myRole==="elder"?"⭐ Trưởng Lão":"🙋 Đệ Tử"}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">📜 Nhật Ký</div>
          <div class="panel-body" style="max-height:160px;overflow-y:auto;padding:8px 12px">
            ${r.slice(0,10).map(o=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(o.created_at).toLocaleString("vi")}</span>
                ${o.detail||o.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${a.length}/${g.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${a.map(o=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${o.role==="leader"?"👑":o.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${o.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${o.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${y.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function b(){var y,g,a,r,i,o;(y=document.getElementById("btnCreate"))==null||y.addEventListener("click",async()=>{var w,k,L,S,E,M;const n=(k=(w=document.getElementById("guildName"))==null?void 0:w.value)==null?void 0:k.trim(),x=(S=(L=document.getElementById("guildTag"))==null?void 0:L.value)==null?void 0:S.trim(),$=(M=(E=document.getElementById("guildDesc"))==null?void 0:E.value)==null?void 0:M.trim();if(!n||!x)return l("Nhập tên và tag!","error");try{const P=await c.createGuild(u,n,x,$);l(P.message,"success"),t.player=P.player,T(),d.loaded=!1,await v()}catch(P){l(P.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",f),document.querySelectorAll(".btn-join").forEach(n=>{n.addEventListener("click",async()=>{try{const x=await c.joinGuild(u,parseInt(n.dataset.gid));l(x.message,"success"),d.loaded=!1,await v()}catch(x){l(x.message,"error")}})}),(a=document.getElementById("btnContribute"))==null||a.addEventListener("click",async()=>{var x;const n=parseInt(((x=document.getElementById("contributeAmt"))==null?void 0:x.value)||0);if(!(n<=0))try{const $=await c.contributeGuild(u,n);l($.message,"success"),t.player=$.player,T(),await v()}catch($){l($.message,"error")}}),(r=document.getElementById("btnUpgradeGuild"))==null||r.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const n=await c.upgradeGuild(u);l(n.message,"success"),await v()}catch(n){l(n.message,"error")}}),(i=document.getElementById("btnPayUpkeep"))==null||i.addEventListener("click",async()=>{try{const n=await c.payGuildUpkeep(d.data.guild.id);l(n.message,"success"),await v()}catch(n){l(n.message,"error")}}),(o=document.getElementById("btnLeave"))==null||o.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const n=await c.leaveGuild(u);l(n.message,"success"),d.loaded=!1,await v()}catch(n){l(n.message,"error")}})}d.loaded?m():v()}function Pt(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;t._profile||(t._profile={results:[],viewing:null,searchQuery:""});const d=t._profile;function v(){s.innerHTML=`
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
    `,m()}function f(p){var a,r,i;const b=p.id===u,y=p.maxHp>0?Math.round(p.currentHp/p.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((a=p.name[0])==null?void 0:a.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${p.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${p.level} · ${((r=p.realmInfo)==null?void 0:r.fullName)||"Phàm Nhân"}
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
              <div style="height:100%;width:${y}%;background:${y>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(i=p.gold)==null?void 0:i.toLocaleString()} 💎</strong></div>

          ${b?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${p.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${p.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function m(){var p,b,y,g,a;(p=document.getElementById("btnSearch"))==null||p.addEventListener("click",h),(b=document.getElementById("searchInput"))==null||b.addEventListener("keydown",r=>{r.key==="Enter"&&h()}),document.querySelectorAll(".btn-view, [data-view]").forEach(r=>{r.addEventListener("click",async()=>{const i=r.dataset.vid||r.dataset.view;try{const o=await c.getPlayerProfile(i);d.viewing=o.profile,v()}catch(o){l(o.message,"error")}})}),(y=document.getElementById("btnAttack"))==null||y.addEventListener("click",async()=>{const r=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${d.viewing.name}?`))try{const i=await c.mugPlayer(u,r);l(i.message,i.won?"success":"error"),i.player&&(t.player=i.player,T())}catch(i){l(i.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const r=document.getElementById("btnAddFriend").dataset.tid;try{const i=await c.addFriend(u,r);l(i.message||"Đã gửi lời mời!","success")}catch(i){l(i.message,"error")}}),(a=document.getElementById("btnBackSearch"))==null||a.addEventListener("click",()=>{d.viewing=null,v()})}async function h(){var y;const p=document.getElementById("searchInput"),b=(y=p==null?void 0:p.value)==null?void 0:y.trim();if(!b||b.length<2)return l("Nhập ít nhất 2 ký tự!","error");d.searchQuery=b,d.viewing=null;try{const g=await c.searchPlayers(b);d.results=g.players||[],v()}catch(g){l(g.message,"error")}}v()}function It(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;t._arena||(t._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const d=t._arena;async function v(){try{d.data=await c.getArena(u),d.loaded=!0,f()}catch(h){l(h.message,"error")}}function f(){var r,i,o,n,x,$,w,k;const h=d.data,p=(h==null?void 0:h.arena)||{},b=p.rank||{},y=parseInt(p.streak)||0,g=y>=5?`🔥x${y}`:y>=3?`⚡x${y}`:y>0?`${y}W`:y<0?`${Math.abs(y)}L`:"",a=y>=5?"var(--gold)":y>=3?"var(--orange)":y>0?"var(--green)":y<0?"var(--red)":"var(--text-dim)";s.innerHTML=`
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
              ELO: <strong>${p.rating||1e3}</strong> · ${p.wins||0}W/${p.losses||0}L
              ${g?` · <span style="color:${a};font-weight:700">${g}</span>`:""}
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
      ${(r=d.lastResult)!=null&&r.rankUp?`
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${(i=d.lastResult.newRank)==null?void 0:i.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${(o=d.lastResult.newRank)==null?void 0:o.name}!</div>
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
          ${(w=d.lastResult.combatLog)!=null&&w.length?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${d.lastResult.combatLog.map(L=>`<div>${L}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(h.opponents||[]).length>0?(h.opponents||[]).map(L=>{var S,E,M;return`
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${((S=L.rank)==null?void 0:S.icon)||"🛡️"}</span>
              <div style="flex:1">
                <div style="font-weight:600">${L.name} <span style="opacity:0.4;font-size:11px">Lv.${L.level}</span></div>
                <div style="font-size:11px;color:${((E=L.rank)==null?void 0:E.color)||"#888"}">${((M=L.rank)==null?void 0:M.name)||"Đồng"} · ELO ${L.rating}</div>
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
            ${(h.top10||[]).map((L,S)=>{var E,M;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${S<3?"var(--gold)":"var(--text-dim)"}">#${S+1}</span>
                <span>${((E=L.rank)==null?void 0:E.icon)||""}</span>
                <span style="flex:1">${L.name}</span>
                <span style="color:${((M=L.rank)==null?void 0:M.color)||"var(--blue)"}; font-weight:600">${L.rating}</span>
              </div>
            `}).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(h.history||[]).map(L=>{const S=L.winner_id===u;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${S?"var(--green)":"var(--red)"}">
                  ${S?"✅":"❌"} vs ${L.attacker_id===u?L.defender_name:L.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${L.rating_change>0?"+":""}${L.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,s.querySelectorAll(".btn-fight-opp").forEach(L=>{L.addEventListener("click",S=>m(S.target.dataset.oid))}),(k=document.getElementById("btnRandomFight"))==null||k.addEventListener("click",()=>m(null))}async function m(h){d.fighting=!0,f();try{const p=await c.request(`/player/${u}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:h})});d.lastResult=p,t.player=p.player,T(),l(p.message,p.won?"success":"error"),d.fighting=!1,await v()}catch(p){l(p.message,"error"),d.fighting=!1,f()}}d.loaded?f():v()}function qt(s,e){const{state:t,api:c,notify:l,updateSidebar:T,renderGame:u}=e,d=t.playerId,v=t._auctionTab||"browse";async function f(){try{const[p,b]=await Promise.all([c.getAuctions(),c.getMyAuctions(d)]);t._auctionListings=p.listings||[],t._auctionMine=b.listings||[],m()}catch(p){l(p.message,"error")}}function m(){const p=t._auctionListings||[],b=t._auctionMine||[],y=(t.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");s.innerHTML=`
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
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':p.map(g=>{const a=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${a.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${a.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${g.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${g.id}">💎 ${g.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:v==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${y.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${y.map(g=>`<option value="${g.id}">${g.name} [${g.rarity}]</option>`).join("")}
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
    `,h()}function h(){var p;s.querySelectorAll(".tab-btn").forEach(b=>b.addEventListener("click",()=>{t._auctionTab=b.dataset.tab,f()})),s.querySelectorAll(".btn-buy").forEach(b=>b.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const y=await c.buyAuction(d,parseInt(b.dataset.lid));l(y.message,"success"),t.player=y.player,T(),await f()}catch(y){l(y.message,"error")}})),s.querySelectorAll(".btn-cancel").forEach(b=>b.addEventListener("click",async()=>{try{const y=await c.cancelAuction(d,parseInt(b.dataset.lid));l(y.message,"success"),t.player=y.player,T(),await f()}catch(y){l(y.message,"error")}})),(p=document.getElementById("btnListItem"))==null||p.addEventListener("click",async()=>{var a,r,i;const b=(a=document.getElementById("selSellItem"))==null?void 0:a.value,y=parseInt(((r=document.getElementById("inpPrice"))==null?void 0:r.value)||"500"),g=parseInt(((i=document.getElementById("selDuration"))==null?void 0:i.value)||"24");try{const o=await c.listAuction(d,b,y,g);l(o.message,"success"),t.player=o.player,T(),t._auctionTab="mine",await f()}catch(o){l(o.message,"error")}})}f()}function Ht(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;async function d(){try{const f=await c.getDailyQuests(u);t._dailyQuests=f,v()}catch(f){l(f.message,"error")}}function v(){const f=t._dailyQuests||{},m=f.quests||[];f.allCompleted;const h=f.bonusReward;s.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${m.map(p=>{const b=p.quest_info||{},y=p.target>0?Math.min(100,Math.round(p.progress/p.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${p.claimed?"var(--text-dim)":p.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${b.name||p.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${b.difficulty==="Khó"?"var(--red)":b.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${b.difficulty||"?"}</span>
              </div>
              ${p.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':p.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${p.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${p.progress}/${p.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${b.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${y}%;background:${p.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
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
    `,s.querySelectorAll(".btn-claim").forEach(p=>p.addEventListener("click",async()=>{try{const b=await c.claimDailyQuest(u,parseInt(p.dataset.qid));l(b.message,"success"),t.player=b.player,T(),await d()}catch(b){l(b.message,"error")}}))}d()}function Nt(s,e){const{state:t,api:c,notify:l,updateSidebar:T}=e,u=t.playerId;async function d(){try{t._worldBoss=await c.getWorldBoss(),v()}catch(f){l(f.message,"error")}}function v(){var g;const f=t._worldBoss||{},m=f.boss||{},h=f.hpPercent||0,p=f.topContributors||[],b=f.rewards||{},y=m.status==="active"&&m.current_hp>0;s.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${y?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${m.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${m.level||"?"} · ${y?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(m.current_hp||0).toLocaleString()} / ${(m.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${h}%;background:${h>50?"var(--red)":h>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${y?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${b.gold||0} · ✨ ${b.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${p.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':p.map((a,r)=>{var i;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${r<3?"var(--gold)":"var(--text-dim)"}">#${r+1}</span>
                <span style="flex:1">${a.name}</span>
                <span style="color:var(--red)">${(i=a.total_damage)==null?void 0:i.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${a.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const a=document.getElementById("btnAttackBoss");a.disabled=!0,a.textContent="⏳ Đang giao chiến...";const r=document.getElementById("bossCombatResult");try{const i=await c.attackWorldBoss(u);if(t.player=i.player,T(),i.log&&i.log.length>0){const o=i.log.map(w=>w.startsWith("---")?`<div class="turn">${w}</div>`:w.includes("hụt")?`<div class="miss">${w}</div>`:w.includes("né được")?`<div class="dodge">${w}</div>`:w.includes("CHÍNH MẠNG")||w.includes("💥")?`<div class="crit">${w}</div>`:w.includes("🔥")?`<div class="heavy text-orange">${w}</div>`:w.includes("chặn hoàn toàn")||w.includes("🛡")?`<div class="dodge">${w}</div>`:w.includes("ngã xuống")||w.includes("💀")?`<div class="death">${w}</div>`:w.includes("Chiến thắng")||w.includes("🏆")?`<div class="victory">${w}</div>`:w.includes("bỏ chạy")||w.includes("🏃")?`<div class="flee">${w}</div>`:w.includes("Bất phân")||w.includes("🤝")?`<div class="stalemate">${w}</div>`:w.includes("🧪")?`<div class="status-effect text-purple">${w}</div>`:w.includes("💔")?`<div class="dot-damage text-purple bold">${w}</div>`:w.includes("✨")?`<div class="regen text-green">${w}</div>`:`<div class="hit">${w}</div>`).join(""),n={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},x=n[i.outcome]||n.loss,$=Math.max(0,t.player.currentHp/t.player.maxHp*100);r.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${x.icon} ${x.text}
                <span class="subtitle">${i.turns}/${i.maxTurns||25} lượt · ⚔️ ${i.damage} dmg cho Boss</span>
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
                    <div class="f-name monster-name">${m.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(i.bossHp/i.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${i.bossHp.toLocaleString()}/${i.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${o}</div>
            </div>`}i.defeated?l(i.message,"success"):l(`⚔️ ${i.damage} dmg!`,"info"),await d()}catch(i){l(i.message,"error"),a.disabled=!1,a.textContent="⚔️ Tấn Công"}})}d()}function Bt(s,e){const{state:t,api:c,notify:l,updateSidebar:T,renderGame:u}=e,d=t.playerId,v={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function f(){var h;try{const[p,b]=await Promise.all([c.getGachaPools(),c.getGachaPity(d)]);t._gacha={pools:p.pools||{},pity:b.pity||{},results:((h=t._gacha)==null?void 0:h.results)||[]},m()}catch(p){l(p.message,"error")}}function m(){const h=t._gacha||{},p=h.pools||{},b=h.pity||{},y=h.results||[];s.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(p).map(([g,a])=>{var i,o,n;const r=b[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${a.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${v.legendary}">★ ${(i=a.rates)==null?void 0:i.legendary}%</span> ·
                <span style="color:${v.rare}">◆ ${(o=a.rates)==null?void 0:o.rare}%</span> ·
                <span style="color:${v.uncommon}">● ${(n=a.rates)==null?void 0:n.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${r.pulls_since_rare||0}/${a.pityRare} · Legend: ${r.pulls_since_legendary||0}/${a.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="1">💎 ${a.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="10">💎 ${a.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${y.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${y.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${y.map(g=>{var a,r,i,o;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${v[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((a=g.item)==null?void 0:a.slot)==="weapon"?"⚔️":((r=g.item)==null?void 0:r.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${v[g.rarity]}">${((i=g.item)==null?void 0:i.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((o=g.item)==null?void 0:o.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,s.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const a=g.dataset.pool,r=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const i=await c.gachaPull(t.playerId,a,r);l(i.message,"success"),t.player=i.player,T(),t._gacha.results=i.results||[],t._gacha.pity[a]=i.pity,m()}catch(i){l(i.message,"error"),g.disabled=!1}}))}f()}function _t(s,e){const{state:t,api:c,notify:l}=e,T=t._lbTab||"level";async function u(){try{t._lbData=await c.getLeaderboard(T),d()}catch(v){l(v.message,"error")}}function d(){const f=(t._lbData||{}).rankings||[],m={level:"📊 Level",gold:"💰 Linh Thạch",pvp:"⚔️ PvP",guild:"🏯 Tông Môn"};s.innerHTML=`
      <div class="page-header">
        <h2>🏆 Bảng Xếp Hạng</h2>
        <p class="page-sub">Top 50 người chơi và guild.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        ${Object.entries(m).map(([h,p])=>`<button class="btn ${T===h?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="${h}">${p}</button>`).join("")}
      </div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${T==="guild"?f.map((h,p)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${p<3?"var(--gold)":"var(--text-dim)"}">#${p+1}</span>
              <span style="flex:1">
                <strong>[${h.tag}] ${h.name}</strong>
                <span style="opacity:0.4"> Lv${h.level}</span>
              </span>
              <span style="opacity:0.4">${h.members}/${h.max_members} 👤</span>
              <span style="color:var(--gold);margin-left:8px">💰 ${parseInt(h.treasury||0).toLocaleString()}</span>
            </div>
          `).join(""):T==="pvp"?f.map((h,p)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${p<3?"var(--gold)":"var(--text-dim)"}">#${p+1}</span>
              <span style="flex:1"><strong>${h.name}</strong> <span style="opacity:0.4">Lv${h.level}</span></span>
              <span style="color:var(--blue)">${h.rating} ELO</span>
              <span style="opacity:0.4;margin-left:6px">${h.wins}W/${h.losses}L</span>
            </div>
          `).join(""):f.map((h,p)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${p<3?"var(--gold)":"var(--text-dim)"}">#${p+1}</span>
              <span style="flex:1"><strong>${h.name}</strong></span>
              ${T==="level"?`<span>Lv${h.level}</span>`:""}
              <span style="color:var(--gold);margin-left:8px">💎 ${parseInt(h.gold||0).toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,s.querySelectorAll(".tab-btn").forEach(h=>h.addEventListener("click",()=>{t._lbTab=h.dataset.tab,u()}))}u()}const C={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},nt=document.getElementById("app"),J={get state(){return C},api:q,notify:z,renderGame:H,updateSidebar:Gt};async function zt(){const s=localStorage.getItem("playerId");if(s&&!C.playerId)try{const e=await q.getPlayer(s);C.playerId=s,C.player=e.player,await V(),H();return}catch{localStorage.removeItem("playerId")}C.playerId?H():st()}function st(){var e,t;const s=C.authTab||"login";nt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(c=>{c.addEventListener("click",()=>{C.authTab=c.dataset.auth,st()})}),(e=document.getElementById("btnLogin"))==null||e.addEventListener("click",async()=>{const c=document.getElementById("inpUsername").value.trim(),l=document.getElementById("inpPassword").value;if(!c||!l)return z("Vui lòng nhập đầy đủ","error");try{const T=await q.login(c,l);C.playerId=T.id,C.player=T.player,localStorage.setItem("playerId",T.id),z(T.message,"success"),await V(),H()}catch(T){z(T.message||"Đăng nhập thất bại!","error")}}),(t=document.getElementById("btnRegister"))==null||t.addEventListener("click",async()=>{var d,v;const c=document.getElementById("inpUsername").value.trim(),l=document.getElementById("inpPassword").value,T=((d=document.getElementById("inpName"))==null?void 0:d.value.trim())||"Vô Danh",u=((v=document.querySelector('input[name="gender"]:checked'))==null?void 0:v.value)||"male";if(!c||!l)return z("Vui lòng nhập đầy đủ","error");try{const f=await q.register(c,l,T,u);C.playerId=f.id,C.player=f.player,localStorage.setItem("playerId",f.id),z(f.message,"success"),await V(),H()}catch(f){z(f.message||"Đăng ký thất bại!","error")}})}function it(s){const e=Math.floor(Date.now()/1e3),t=[];return s.hospitalUntil&&s.hospitalUntil>e&&t.push({icon:"🏥",label:"Tịnh dưỡng",endTime:s.hospitalUntil,color:"var(--red)"}),s.medCooldownUntil&&s.medCooldownUntil>e&&t.push({icon:"💊",label:"Đan độc",endTime:s.medCooldownUntil,color:"var(--orange)"}),s.jailUntil&&s.jailUntil>e&&t.push({icon:"⛓️",label:"Ngục tù",endTime:s.jailUntil,color:"var(--purple)"}),s.travelArrivesAt&&s.travelArrivesAt>e&&t.push({icon:"🚶",label:"Di chuyển",endTime:s.travelArrivesAt,color:"var(--blue)"}),t.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${t.map(c=>{const l=Math.max(0,c.endTime-e),T=Math.floor(l/60),u=l%60,d=T>0?`${T}p${String(u).padStart(2,"0")}s`:`${u}s`;return`<span class="status-icon" data-end="${c.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${c.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${c.color};white-space:nowrap;
      " title="${c.label}">${c.icon} <span class="cd-time">${d}</span></span>`}).join("")}
  </div>`}let G=null;function Ot(){G&&clearInterval(G),G=setInterval(()=>{const s=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(e=>{const t=parseInt(e.dataset.end),c=Math.max(0,t-s);if(c<=0){e.remove();return}const l=Math.floor(c/60),T=c%60,u=e.querySelector(".cd-time");u&&(u.textContent=l>0?`${l}p${String(T).padStart(2,"0")}s`:`${T}s`)}),document.querySelectorAll(".status-effects").forEach(e=>{e.children.length===0&&e.remove()})},1e3)}function rt(s){let e="";const c={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[s.currentArea];return c&&(e+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${c.tooltip}">${c.icon} Cảnh Vực</span>`),s.combatBuffs&&s.combatBuffs.length>0&&s.combatBuffs.forEach(l=>{let T="💊",u="Buff";l.type==="status"&&l.stat==="poison"?(T="☠️",u="Trúng Độc"):l.type==="status"&&l.stat==="confuse"?(T="👹",u="Ma Hóa"):l.stat==="allStats"||l.stat==="hp"||l.stat==="damage"?(T="🔥",u="Cuồng Nộ"):l.stat==="defense"||l.stat==="resist"?(T="🛡️",u="Kiên Cố"):l.stat==="speed"||l.stat==="dexterity"?(T="💨",u="Thân Pháp"):(T="✨",u="Cường Hóa");let d=l.duration?` (-${l.duration} Trận)`:"",v=`Hiệu ứng: ${l.stat} (${l.type} ${l.value})${l.duration?` - Còn lại: ${l.duration} Trận đấu`:""}`;e+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${v}">${T} ${u}${d}</span>`}),e?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${e}</div>`:""}function H(){var h,p,b,y,g,a,r,i,o;const s=C.player;if(!s)return;const e=Math.max(0,s.currentHp/s.maxHp*100),t=s.maxStamina>0?Math.max(0,s.currentStamina/s.maxStamina*100):0,c=s.maxEnergy>0?Math.max(0,s.currentEnergy/s.maxEnergy*100):0,l=(s.maxNerve??15)>0?Math.max(0,(s.nerve??0)/(s.maxNerve??15)*100):0,T=C.exploration?C.exploration[s.currentArea||"thanh_lam_tran"]:null,u=T?T.name:"Khám Phá";nt.innerHTML=`
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
          <div class="player-meta">Lv.${s.level} · ${((h=s.realmInfo)==null?void 0:h.fullName)||"?"}</div>
          ${it(s)}
          ${rt(s)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${s.currentHp}/${s.maxHp}
                ${s.currentHp<s.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(p=s.skills)!=null&&p.some(n=>n.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${e}%" data-low="${e<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${s.currentStamina??100}/${s.maxStamina??100}
                ${(s.currentStamina??100)<(s.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((b=s.stats)==null?void 0:b.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${t}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${s.currentEnergy}/${s.maxEnergy}
                ${s.currentEnergy<s.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((y=s.stats)==null?void 0:y.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${c}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${s.nerve??0}/${s.maxNerve??15}${(s.nerve??0)<(s.maxNerve??15)?'<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+1/5min</span>':""}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${l}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:12px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:8px">💎 ${s.gold??0} Linh Thạch</div>
            <div style="display:flex; gap:6px; width:100%">
              <button class="btn btn--dark nav-item ${C.currentPage==="events"?"active":""}" data-page="events" style="flex:1; padding:6px; font-size:14px; position:relative" title="Sự Kiện">
                📜
                ${(s.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute; top:-4px; right:-4px; background:var(--red); width:8px; height:8px; padding:0; border-radius:50%"></span>':""}
              </button>
              <button class="btn btn--dark" style="flex:1; padding:6px; font-size:14px; opacity:0.3; cursor:default" disabled></button>
              <button class="btn btn--dark" style="flex:1; padding:6px; font-size:14px; opacity:0.3; cursor:default" disabled></button>
            </div>
          </div>
        </div>

        <ul class="nav" style="${(s.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <li class="nav-section">TỰ THÂN</li>
          <li class="nav-item ${C.currentPage==="stats"?"active":""}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${(a=(g=C.player)==null?void 0:g.realmInfo)!=null&&a.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="inventory"?"active":""}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(s.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)">⏳</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="skills"?"active":""}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>
          <li class="nav-item ${C.currentPage==="education"?"active":""}" data-page="education">
            <span class="icon">🧘</span> Tu Luyện
          </li>


          <li class="nav-section">HÀNH TRÌNH</li>
          <li class="nav-item ${C.currentPage==="travel"?"active":""}" data-page="travel">
            <span class="icon">🚶</span> Di Chuyển
            ${(s.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="quests"?"active":""}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(s.activeQuests||[]).filter(n=>n.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(s.activeQuests||[]).filter(n=>n.status==="active").length}</span>`:""}
          </li>
          <li class="nav-item ${C.currentPage==="dailyquest"?"active":""}" data-page="dailyquest">
            <span class="icon">📋</span> Nhật Nhiệm
          </li>
          <li class="nav-item ${C.currentPage==="crimes"?"active":""}" data-page="crimes">
            <span class="icon">💀</span> Ác Nghiệp
          </li>

          <li class="nav-section">NGAO DU</li>
          <li class="nav-item ${C.currentPage==="combat"?"active":""}" data-page="combat">
            <span class="icon">🔍</span> Khám Phá (${u})
          </li>
          <li class="nav-item ${C.currentPage==="dungeon"?"active":""}" data-page="dungeon">
            <span class="icon">⛩️</span> Bí Cảnh
          </li>
          <li class="nav-item ${C.currentPage==="tiencanh"?"active":""}" data-page="tiencanh">
            <span class="icon">🗺️</span> Tiên Cảnh
          </li>

          <li class="nav-section">CHIẾN ĐẤU</li>
          <li class="nav-item ${C.currentPage==="arena"?"active":""}" data-page="arena">
            <span class="icon">⚔️</span> Đấu Trường
          </li>
          <li class="nav-item ${C.currentPage==="worldboss"?"active":""}" data-page="worldboss">
            <span class="icon">🐉</span> Boss Thế Giới
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

          ${s.role==="admin"?`
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(n=>{n.addEventListener("click",()=>{C.currentPage=n.dataset.page,H()})}),(r=document.getElementById("btnFabChat"))==null||r.addEventListener("click",()=>D("chat")),(i=document.getElementById("btnFabSocial"))==null||i.addEventListener("click",()=>D("social"));const d=document.querySelector('.sidebar-gold .nav-item[data-page="events"]');d&&d.addEventListener("click",n=>{n.stopPropagation(),C.currentPage="events",C.popupOpen=!1,H()}),(o=document.getElementById("btnPopupClose"))==null||o.addEventListener("click",()=>{C.popupOpen=!1,H()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(n=>{n.addEventListener("click",()=>D(n.dataset.popup))}),At(),C.popupOpen&&Rt();const v=document.getElementById("searchPlayerInput"),f=document.getElementById("searchResults");let m=null;v&&f&&(v.addEventListener("input",()=>{clearTimeout(m);const n=v.value.trim();if(n.length<2){f.style.display="none";return}m=setTimeout(async()=>{try{const x=await q.searchPlayers(n),$=x.players||x.results||[];$.length===0?f.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':f.innerHTML=$.map(w=>{var k;return`
              <div class="search-result" data-pid="${w.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${w.name} <span style="opacity:0.4">Lv.${w.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((k=w.realmInfo)==null?void 0:k.name)||""}</span>
              </div>
            `}).join(""),f.style.display="block",f.querySelectorAll(".search-result").forEach(w=>{w.addEventListener("click",()=>{C.currentPage="profile",C._viewProfileId=w.dataset.pid,f.style.display="none",v.value="",H()}),w.addEventListener("mouseenter",()=>w.style.background="rgba(255,255,255,0.08)"),w.addEventListener("mouseleave",()=>w.style.background="transparent")})}catch{f.style.display="none"}},300)}),v.addEventListener("blur",()=>{setTimeout(()=>{f.style.display="none"},200)}),v.addEventListener("keydown",n=>{n.key==="Escape"&&(f.style.display="none",v.blur())})),Ot()}function D(s){C.popupOpen=!0,C.popupPage=s,H()}function Rt(){const s=document.getElementById("popupContent");s&&(C.popupPage==="chat"?at(s,J):C.popupPage==="social"&&et(s,J))}const jt={combat:ct,crimes:yt,education:ht,stats:ut,skills:Y,inventory:K,travel:tt,alchemy:F,quests:bt,admin:xt,social:et,chat:at,market:ft,realm:$t,events:Tt,dungeon:Z,housing:Et,wiki:St,npcshop:Ct,guild:Mt,library:X,profile:Pt,arena:It,auction:qt,dailyquest:Ht,worldboss:Nt,gacha:Bt,leaderboard:_t,tiencanh:kt,tower:Lt};function At(){const s=document.getElementById("pageContent");if(!s)return;const e=jt[C.currentPage];e&&e(s,J)}function Gt(){var T,u,d,v,f;const s=C.player;if(!s)return;const e=Math.max(0,s.currentHp/s.maxHp*100),t=s.maxEnergy>0?Math.max(0,s.currentEnergy/s.maxEnergy*100):0,c=document.querySelector(".sidebar-player");if(c){const m=s.maxStamina>0?Math.max(0,s.currentStamina/s.maxStamina*100):0,h=(s.maxNerve??15)>0?Math.max(0,(s.nerve??0)/(s.maxNerve??15)*100):0;c.innerHTML=`
      <div class="player-name">${s.name}</div>
      <div class="player-meta">Lv.${s.level} · ${((T=s.realmInfo)==null?void 0:T.fullName)||"?"}</div>
      ${it(s)}
      ${rt(s)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${s.currentHp}/${s.maxHp}
            ${s.currentHp<s.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(u=s.skills)!=null&&u.some(p=>p.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${e}%" data-low="${e<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${s.currentStamina??100}/${s.maxStamina??100}
            ${(s.currentStamina??100)<(s.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((d=s.stats)==null?void 0:d.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${m}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${s.currentEnergy}/${s.maxEnergy}
            ${s.currentEnergy<s.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((v=s.stats)==null?void 0:v.energyRegen)??5}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${t}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label"><span>💀 Nghịch Khí</span><span>${s.nerve??0}/${s.maxNerve??15}</span></div>
        <div class="bar-track"><div class="bar-fill nerve" style="width:${h}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${s.gold??0} Linh Thạch</div>`}const l=document.querySelector('.nav-item[data-page="stats"]');if(l){let m="";s.statPoints>0&&(m+=`<span class="badge">${s.statPoints}</span>`),(f=s.realmInfo)!=null&&f.canBreakthrough&&(m+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),l.querySelectorAll(".badge").forEach(h=>h.remove()),l.insertAdjacentHTML("beforeend",m)}}async function V(){try{const[s,e,t,c,l,T]=await Promise.all([q.getMonsters(),q.getSkills(),q.getItems(),q.getMedicines(),q.getCrimes(),q.getEducation()]);C.monsters=s.monsters||[],C.skills=e.skills||[],C.items=t.items||[],C.medicines=c.medicines||[],C.crimes=l.crimes||[],C.educationTrees=T.trees||[],C.exploration=await q.getExploration(),C.recipes=(await q.getRecipes()).recipes,C.npcs=(await q.getNpcs()).npcs||[]}catch(s){console.error("Lỗi tải dữ liệu:",s)}}function z(s,e="info"){var c;(c=document.querySelector(".notification"))==null||c.remove();const t=document.createElement("div");t.className=`notification ${e}`,t.textContent=s,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}zt();
//# sourceMappingURL=index-z_qHJQ1P.js.map
