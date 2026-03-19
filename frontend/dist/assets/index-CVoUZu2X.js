(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))r(d);new MutationObserver(d=>{for(const $ of d)if($.type==="childList")for(const g of $.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function t(d){const $={};return d.integrity&&($.integrity=d.integrity),d.referrerPolicy&&($.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?$.credentials="include":d.crossOrigin==="anonymous"?$.credentials="omit":$.credentials="same-origin",$}function r(d){if(d.ep)return;d.ep=!0;const $=t(d);fetch(d.href,$)}})();const lt="/api";class ot{async request(e,t={}){try{const r=await fetch(`${lt}${e}`,{headers:{"Content-Type":"application/json",...t.headers},...t}),d=await r.json();if(!r.ok)throw new Error(d.error||`HTTP ${r.status}`);return d}catch(r){throw console.error(`API Error [${e}]:`,r),r}}register(e,t,r,d){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:e,password:t,name:r,gender:d})})}login(e,t){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})})}createPlayer(e,t){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:e,gender:t})})}getPlayer(e){return this.request(`/player/${e}`)}allocateStat(e,t,r=1){return this.request(`/player/${e}/allocate`,{method:"POST",body:JSON.stringify({stat:t,points:r})})}equipItem(e,t){return this.request(`/player/${e}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}learnSkill(e,t){return this.request(`/player/${e}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:t})})}equipSkill(e,t,r=!0){return this.request(`/player/${e}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:t,equip:r})})}healPlayer(e){return this.request(`/player/${e}/heal`,{method:"POST"})}useMedicine(e,t){return this.request(`/player/${e}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}trainStat(e,t){return this.request(`/player/${e}/train`,{method:"POST",body:JSON.stringify({stat:t})})}fullCombat(e,t=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e,monsterId:t})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getCrimes(){return this.request("/data/crimes")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(e,t){return this.request(`/player/${e}/equip`,{method:"POST",body:JSON.stringify({itemId:t})})}useItem(e,t){return this.request(`/player/${e}/use`,{method:"POST",body:JSON.stringify({itemId:t})})}useMedicine(e,t){return this.request(`/player/${e}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:t})})}generateItem(e,t){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,playerId:e})})}trainStat(e,t,r=1){return this.request(`/player/${e}/train`,{method:"POST",body:JSON.stringify({stat:t,count:r})})}allocateStat(e,t){return this.request(`/player/${e}/allocate`,{method:"POST",body:JSON.stringify({stat:t})})}attemptBreakthrough(e){return this.request(`/player/${e}/breakthrough`,{method:"POST"})}getRealm(e){return this.request(`/player/${e}/realm`)}craftItem(e,t){return this.request(`/player/${e}/craft`,{method:"POST",body:JSON.stringify({recipeId:t})})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(e,t,r,d=-1){return this.request(`/player/${e}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:r,lockAffixIndex:d})})}commitCrime(e,t){return this.request(`/player/${e}/commit-crime`,{method:"POST",body:JSON.stringify({crimeId:t})})}escapeJail(e){return this.request(`/player/${e}/escape-jail`,{method:"POST"})}bail(e){return this.request(`/player/${e}/bail`,{method:"POST"})}enrollNode(e,t,r){return this.request(`/player/${e}/enroll`,{method:"POST",body:JSON.stringify({nodeId:t,treeId:r})})}checkEducation(e){return this.request(`/player/${e}/check-education`,{method:"POST"})}generateItem(e="common",t=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,slot:t})})}explore(e){return this.request(`/player/${e}/explore`,{method:"POST"})}trackMonster(e,t){return this.request(`/player/${e}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:t})})}getAreaMonsters(e){return this.request(`/player/${e}/area-monsters`)}getNpc(e){return this.request(`/npc/${e}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(e,t,r){return this.request(`/player/${e}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:t,questId:r})})}completeQuest(e,t){return this.request(`/player/${e}/complete-quest`,{method:"POST",body:JSON.stringify({questId:t})})}getQuests(e){return this.request(`/player/${e}/quests`)}searchPlayers(e){return this.request(`/players/search?q=${encodeURIComponent(e)}`)}getRelationships(e){return this.request(`/player/${e}/relationships`)}interactPlayer(e,t,r,d){return this.request(`/player/${e}/interact`,{method:"POST",body:JSON.stringify({targetId:t,action:r,amount:d})})}addFriend(e,t){return this.request(`/player/${e}/add-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}acceptFriend(e,t){return this.request(`/player/${e}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}rejectFriend(e,t){return this.request(`/player/${e}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}removeFriend(e,t){return this.request(`/player/${e}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:t})})}addEnemy(e,t){return this.request(`/player/${e}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}removeEnemy(e,t){return this.request(`/player/${e}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:t})})}getGlobalChat(e=0){return this.request(`/chat/global?afterId=${e}`)}getPrivateChat(e,t,r=0){return this.request(`/chat/private/${e}?with=${t}&afterId=${r}`)}getChatFriends(e){return this.request(`/chat/friends/${e}`)}sendChat(e,t,r,d){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:e,channel:t,receiverId:r,message:d})})}getMarketListings(e="",t="newest"){const r=new URLSearchParams;return e&&r.set("type",e),t&&r.set("sort",t),this.request(`/market?${r.toString()}`)}getMyListings(e){return this.request(`/market/my/${e}`)}listForSale(e,t,r,d,$){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:e,itemType:t,itemId:r,quantity:d,price:$})})}buyFromMarket(e,t,r=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:e,listingId:t,quantity:r})})}cancelListing(e,t){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:e,listingId:t})})}getRealmInfo(e){return this.request(`/player/${e}/realm`)}attemptBreakthrough(e){return this.request(`/player/${e}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(e){return this.request(`/player/${e}/mug-targets`)}mugPlayer(e,t){return this.request(`/player/${e}/mug`,{method:"POST",body:JSON.stringify({victimId:t})})}getMugLog(e){return this.request(`/player/${e}/mug-log`)}getMapItems(e){return this.request(`/player/${e}/map-items`)}enterDungeon(e,t){return this.request(`/player/${e}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:t})})}fightDungeonWave(e){return this.request(`/player/${e}/dungeon/fight`,{method:"POST"})}abandonDungeon(e){return this.request(`/player/${e}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(e){return this.request(`/player/${e}/dungeon/history`)}getHousing(e){return this.request(`/player/${e}/housing`)}buyHousing(e){return this.request(`/player/${e}/housing/buy`,{method:"POST"})}plantHerb(e,t,r){return this.request(`/player/${e}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:t,slotIndex:r})})}harvestGarden(e){return this.request(`/player/${e}/housing/harvest`,{method:"POST"})}upgradeFormation(e,t){return this.request(`/player/${e}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:t})})}payMaintenance(e){return this.request(`/player/${e}/housing/maintenance`,{method:"POST"})}listForRent(e,t){return this.request(`/player/${e}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:t})})}getRentals(){return this.request("/housing/rentals")}rentRoom(e,t){return this.request(`/player/${e}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:t})})}getMyGuild(e){return this.request(`/player/${e}/guild`)}createGuild(e,t,r,d){return this.request(`/player/${e}/guild/create`,{method:"POST",body:JSON.stringify({name:t,tag:r,description:d})})}contributeGuild(e,t){return this.request(`/player/${e}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:t})})}upgradeGuild(e){return this.request(`/player/${e}/guild/upgrade`,{method:"POST"})}joinGuild(e,t){return this.request(`/player/${e}/guild/join`,{method:"POST",body:JSON.stringify({guildId:t})})}leaveGuild(e){return this.request(`/player/${e}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(e){return this.request(`/guild/${e}/upkeep`,{method:"POST"})}getTribulation(e){return this.request(`/player/${e}/tribulation`)}fightTribulation(e){return this.request(`/player/${e}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(e,t,r,d=-1){return this.request(`/player/${e}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:t,itemId:r,lockAffixIndex:d})})}getShops(e){return this.request("/shops")}buyFromShop(e,t,r,d=1){return this.request(`/player/${e}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:t,itemId:r,quantity:d})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(e){return this.request(`/players/lookup?q=${encodeURIComponent(e)}`)}getPlayerProfile(e){return this.request(`/player/${e}/profile`)}getArena(e){return this.request(`/player/${e}/arena`)}arenaFight(e){return this.request(`/player/${e}/arena/fight`,{method:"POST"})}getAuctions(e=""){return this.request(`/auction${e?"?q="+encodeURIComponent(e):""}`)}getMyAuctions(e){return this.request(`/player/${e}/auction/mine`)}listAuction(e,t,r,d=24){return this.request(`/player/${e}/auction/list`,{method:"POST",body:JSON.stringify({itemId:t,buyoutPrice:r,durationHours:d})})}buyAuction(e,t){return this.request(`/player/${e}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:t})})}cancelAuction(e,t){return this.request(`/player/${e}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:t})})}getDailyQuests(e){return this.request(`/player/${e}/daily-quests`)}claimDailyQuest(e,t){return this.request(`/player/${e}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:t})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(e){return this.request(`/player/${e}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(e){return this.request(`/player/${e}/gacha/pity`)}gachaPull(e,t,r=1){return this.request(`/player/${e}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:t,pulls:r})})}getLeaderboard(e){return this.request(`/leaderboard/${e}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(e){return this.request(`/events/quick/${e}`,{method:"POST"})}}const q=new ot;function ct(a,e){var m;const{state:t,api:r,notify:d,renderGame:$,updateSidebar:g}=e,c=t.player,u=t.exploration?t.exploration[c.currentArea||"thanh_lam_tran"]:null,b=u?u.name:"Vùng Đất Vô Danh",v=u?u.staminaCost:10;a.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${b}</h1>
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
    </div>`;const y=((m=c.insightLevels)==null?void 0:m.monster)??0;(async()=>{try{const n=await r.getAreaMonsters(c.id);if(n.monsters){t.player.trackedMonsters=n.monsters;const i=document.getElementById("trackedMonstersList");if(!i)return;if(n.monsters.length===0){i.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}i.innerHTML=n.monsters.map(p=>{var P,I,M,N,G;const s=p.currentHp/p.stats.hp*100,f=s>60?"var(--green)":s>30?"var(--orange)":"var(--red)";let T='<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>';y>=1&&(T=`<div class="item-desc text-sm text-dim mb-sm">${p.description||"Yêu thú vùng này."}</div>`);let k="";y>=1&&(k=`<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${s}%; background: ${f}; height: 100%;"></div>
            </div>`);let w=y>=2?`❤ ${p.currentHp}/${p.stats.hp}`:y>=1?"❤ ???":"",L="";y>=3&&(L=`
              <span class="text-orange">💪 ${p.stats.strength}</span>
              <span class="text-cyan">🏃 ${p.stats.speed}</span>
              <span class="text-green">🎯 ${p.stats.dexterity}</span>
              <span class="text-blue">🛡 ${p.stats.defense}</span>`);let E="";y>=4&&p.drops&&p.drops.length>0&&(E=`<div class="text-xs text-dim mt-sm" style="display:flex;gap:4px;flex-wrap:wrap;">
              📦 ${p.drops.map(_=>`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:9px;padding:1px 4px;">${_.id} (${y>=5?_.chance+"%":"?%"})</span>`).join("")}
            </div>`);let S="";if(y>=5){const _=((P=p.goldReward)==null?void 0:P[0])??((I=p.goldReward)==null?void 0:I.min)??"?",B=((M=p.goldReward)==null?void 0:M[1])??((N=p.goldReward)==null?void 0:N.max)??"?";S=`<span class="text-gold">💰 ${_}-${B}</span> <span class="text-purple">✨ ${p.xpReward??"?"} XP</span>`}return`
            <div class="list-item flex flex-col items-start gap-4">
              <div class="item-info" style="width: 100%;">
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-name text-lg">${p.name} <span class="text-xs text-dim">(${((G=p.instance_id)==null?void 0:G.substring(0,8))??""})</span></div>
                  <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${p.instance_id}" data-mid="${p.id}">Giao Chiến</button>
                </div>
                ${T}
                ${k}
                <div class="item-meta flex gap-4 text-xs flex-wrap">
                  ${w?`<span class="text-red">${w}</span>`:""}
                  ${L}
                  ${S}
                </div>
                ${E}
              </div>
            </div>`}).join(""),i.querySelectorAll(".btn-attack-tracked").forEach(p=>{p.addEventListener("click",s=>{const f=s.currentTarget;W(e,f.dataset.mid,f.dataset.inst)})})}}catch(n){console.error("Lỗi tải dấu vết:",n)}})(),(async()=>{const n=document.getElementById("areaMonstersList");if(n)try{const i=await r.getAreaMonsters(c.id),l=t.exploration?t.exploration[c.currentArea||"thanh_lam_tran"]:null,p=(t.monsters||[]).filter(f=>!f.isWorldBoss&&!f.is_world_boss),s=p.length>0?p:[];if(s.length===0){n.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không rõ quần thể yêu thú nơi đây.</div>';return}n.innerHTML=s.map(f=>{let T='<div class="item-desc text-sm text-dim mb-sm">Thông tin mờ ảo...</div>';return y>=1&&(T=`<div class="item-desc text-sm text-dim mb-sm">${f.description||"Yêu thú sinh sống tại vùng này."}</div>`),`
          <div class="list-item flex flex-col items-start gap-4" style="opacity: 0.8;">
            <div class="item-info" style="width: 100%;">
              <div class="item-name text-md text-gold">${f.name} <span class="text-xs text-dim ml-sm">${f.tierName||""}</span></div>
              ${T}
            </div>
          </div>
        `}).join("")}catch(i){console.error("Lỗi tải quần thể:",i)}})();const h=document.getElementById("btnExplore");h&&h.addEventListener("click",()=>pt(e)),a.querySelectorAll(".list-item.clickable").forEach(n=>{n.addEventListener("click",()=>startCombat(n.dataset.mid,e))})}async function pt(a){var g,c,u;const{state:e,api:t,notify:r,updateSidebar:d}=a,$=document.getElementById("exploreResult");if($){$.innerHTML='<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>';try{const b=await t.explore(e.playerId);e.player=b.player,d();const v=b.event;let y=`
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `;if(v.type==="monster")y+=`
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${v.message}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${v.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${v.monsterId}">👣 Theo Dõi</button>
        </div>
      `;else if(v.type==="monster_ambush"&&v.combatResult){const o=v.combatResult,x=(o.log||[]).map(n=>n.startsWith("---")?`<div class="turn">${n}</div>`:n.includes("hụt")?`<div class="miss">${n}</div>`:n.includes("CHÍNH MẠNG")||n.includes("💥")?`<div class="crit">${n}</div>`:n.includes("ngã xuống")||n.includes("💀")?`<div class="death">${n}</div>`:n.includes("Chiến thắng")||n.includes("🏆")?`<div class="victory">${n}</div>`:`<div class="hit">${n}</div>`).join(""),h=o.outcome==="win"?"🏆 Chiến thắng!":o.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",m=o.outcome==="win"?"var(--green)":o.outcome==="loss"?"var(--red)":"var(--orange)";y+=`
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${v.message}</div>
        <div style="font-size:16px;font-weight:700;color:${m};margin-bottom:12px">${h}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${x}</div>
      `}else if(v.type==="worldBoss")y+=`
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${v.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ mạnh!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${v.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${v.monsterId}">👣 Ghi Dấu</button>
        </div>
      `;else if(v.type==="npc"&&v.npcId){if(y+=`
        <div style="font-size: 48px; margin-bottom: 8px;">${v.npcIcon||"🧓"}</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
        <div class="text-sm text-dim mb-md" style="font-style:italic;">"${v.greeting}"</div>
      `,v.studyEffect){const o=v.studyEffect,x=o.isDebuff?"var(--red)":"var(--gold)";y+=`<div class="text-sm mt-sm" style="color:${x};animation:fadeIn 0.5s;">
          ${o.message}
        </div>`}v.hasQuests&&(y+=`<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${v.npcId}">💬 Nói Chuyện</button>`),y+='<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>',y+="</div></div>",y+='<div id="npcQuestModal"></div>'}else v.type==="player_encounter"&&v.player?y+=`
        <div style="font-size: 48px; margin-bottom: 8px;">👤</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
        <div class="text-sm text-dim mb-md">Âm thầm lướt qua hay chủ động giao hảo?</div>
        <div class="flex gap-2 justify-center mt-md w-full" style="flex-wrap:wrap">
          <button class="btn btn--blue flex-1" id="btnInteractFriend" data-pid="${v.player.id}">🤝 Kết Giao</button>
          <button class="btn btn--gold flex-1" id="btnInteractGift" data-pid="${v.player.id}">💎 Tặng 100 LT</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${v.player.id}">⚔️ Cướp Linh Thạch</button>
        </div>
      `:v.type==="npc"?y+=`
        <div style="font-size: 32px; margin-bottom: 8px;">👴</div>
        <div class="text-lg text-gold bold mb-sm">${v.message}</div>
      `:v.type==="material"||v.type==="item"?(y+=`
        <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
        <div class="text-lg text-green bold mb-sm">${v.message}</div>
      `,v.questNotifications&&v.questNotifications.length>0&&v.questNotifications.forEach(o=>{y+=`<div class="text-sm text-gold mt-sm" style="animation: fadeIn 0.5s;">🏷️ ${o.message}</div>`})):y+=`
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${v.message}</div>
      `;v.type!=="monster"&&v.type!=="worldBoss"&&!(v.type==="npc"&&v.npcId)&&(y+='<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục hành trình</button>'),v.type==="npc"&&v.npcId||(y+="</div></div>"),$.innerHTML=y,v.type==="player_encounter"&&v.player&&(document.getElementById("btnInteractFriend").addEventListener("click",async o=>{try{const x=await t.addFriend(e.playerId,o.target.dataset.pid);(x.success||x.message)&&r(x.message||"Đã gửi lời mời!","success")}catch(x){r(x.message,"error")}}),document.getElementById("btnInteractGift").addEventListener("click",async o=>{var x;try{const h=await t.interactPlayer(e.playerId,o.target.dataset.pid,"gift",100);if(h.player){e.player=h.player,d(),r(h.message,"success");const m=o.target.closest(".panel-body");m&&(m.innerHTML='<div class="text-green text-lg mb-md">Đã bồi đắp hảo cảm!</div><button class="btn btn--blue" id="btnExploreContinueAfterGift">Rời đi</button>'),(x=document.getElementById("btnExploreContinueAfterGift"))==null||x.addEventListener("click",()=>{$.innerHTML=""})}}catch(h){r(h.message,"error")}}),(g=document.getElementById("btnInteractMug"))==null||g.addEventListener("click",async o=>{var h;const x=o.target.dataset.pid;o.target.disabled=!0,o.target.textContent="⏳ Đang tấn công...";try{const m=await t.request(`/player/${e.playerId}/mug`,{method:"POST",body:JSON.stringify({victimId:x})});e.player=m.player,d();const n=o.target.closest(".panel-body");if(n){const i=m.success?"var(--green)":"var(--red)",l=m.success?"💰":"💀";n.innerHTML=`
              <div style="font-size:36px;margin-bottom:8px">${l}</div>
              <div style="color:${i};font-size:16px;font-weight:700;margin-bottom:8px">${m.message}</div>
              ${m.goldStolen>0?`<div class="text-gold">+${m.goldStolen} 💎 Linh Thạch</div>`:""}
              <div style="font-size:11px;opacity:0.5;margin-top:8px">Tỉ lệ: ${m.successChance}%</div>
              <button class="btn btn--blue mt-md" id="btnExploreContinueAfterMug">Tiếp tục</button>
            `,(h=document.getElementById("btnExploreContinueAfterMug"))==null||h.addEventListener("click",()=>{$.innerHTML=""})}r(m.message,m.success?"success":"error")}catch(m){r(m.message,"error"),o.target.disabled=!1,o.target.textContent="⚔️ Cướp Linh Thạch"}})),(v.type==="monster"||v.type==="worldBoss")&&(document.getElementById("btnExploreCombat").addEventListener("click",o=>{$.innerHTML="",W(a,o.target.dataset.mid,null)}),document.getElementById("btnExploreTrack").addEventListener("click",async o=>{try{const x=await t.trackMonster(e.playerId,o.target.dataset.mid);x.success?(r(x.message,"success"),$.innerHTML="",typeof a.renderGame=="function"&&a.renderGame()):x.error&&r(x.error,"error")}catch(x){r("Lỗi theo dõi: "+x.message,"error")}})),v.type==="npc"&&v.npcId&&((c=document.getElementById("btnNpcInteract"))==null||c.addEventListener("click",async()=>{await gt(a,v.npcId,$)})),(u=document.getElementById("btnExploreContinue"))==null||u.addEventListener("click",()=>{$.innerHTML=""})}catch(b){$.innerHTML=`<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${b.message}</div></div>`}}}async function gt(a,e,t){const{state:r,api:d,notify:$,renderGame:g}=a,c=document.getElementById("npcQuestModal")||t;try{const b=(await d.getNpc(e)).npc;if(!b)return;const v=(r.player.activeQuests||[]).map(o=>o.quest_id);let y=b.quests.map(o=>{const x=v.includes(o.id);return`
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${o.name}</span>
            <span class="text-xs badge" style="background:${o.type==="kill"?"var(--red)":"var(--green)"}">${o.type==="kill"?"⚔️ Tiêu Diệt":"📦 Thu Thập"}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${o.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${o.rewards.gold?o.rewards.gold+"💎 ":""}${o.rewards.xp?o.rewards.xp+"✨ ":""}${o.rewards.skillChance?"🎯 "+o.rewards.skillChance.chance+"% kỹ năng":""}</div>
          ${x?'<span class="text-xs text-dim">✅ Đã nhận</span>':`<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${e}" data-qid="${o.id}">📜 Nhận Nhiệm Vụ</button>`}
        </div>
      `}).join("");c.innerHTML=`
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${b.icon||"🧓"} ${b.name} <span class="subtitle">${b.profession}</span></div>
        <div class="panel-body">
          ${y||'<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `,c.querySelectorAll(".btn-accept-quest").forEach(o=>{o.addEventListener("click",async()=>{o.disabled=!0,o.textContent="⏳...";try{const x=await d.acceptQuest(r.playerId,o.dataset.npc,o.dataset.qid);r.player=x.player,$(x.message,"success"),g()}catch(x){$(x.message||"Lỗi nhận quest","error"),o.disabled=!1,o.textContent="📜 Nhận Nhiệm Vụ"}})})}catch(u){console.error("NPC load error:",u)}}async function W(a,e,t=null){var b;const{state:r,api:d,notify:$,updateSidebar:g,renderGame:c}=a,u=document.getElementById("combatResult");if(u){if(!r.player.currentHp||r.player.currentHp<=0)return $("Đã kiệt sức! Hãy hồi phục trước.","error");if((r.player.currentEnergy||0)<10&&!r.player.currentEnergy)return $("Không đủ Linh lực!","error");if(r.player.hospitalRemaining>0)return $(`Đang tịnh dưỡng! Còn ${r.player.hospitalRemaining}s`,"error");u.innerHTML='<div class="panel border-red bg-dark"><div class="panel-body text-center text-red">⚔️ Đang giao chiến...</div></div>',u.scrollIntoView({behavior:"smooth"});try{const v=await d.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:r.playerId,monsterId:t?null:e,trackedMonsterId:t})});if(r.player=v.player,v.outcome==="no_energy"){u.innerHTML=`<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${v.log[0]}</div></div>`,g();return}const y=v.log.map(p=>p.startsWith("---")?`<div class="turn">${p}</div>`:p.includes("linh lực")&&p.includes("+")?`<div class="energy">${p}</div>`:p.includes("linh lực")?`<div class="energy-cost">${p}</div>`:p.includes("kiệt linh")?`<div class="miss">${p}</div>`:p.includes("hụt")?`<div class="miss">${p}</div>`:p.includes("né được")?`<div class="dodge">${p}</div>`:p.includes("CHÍNH MẠNG")||p.includes("💥")?`<div class="crit">${p}</div>`:p.includes("🔥")?`<div class="heavy text-orange">${p}</div>`:p.includes("chặn hoàn toàn")||p.includes("🛡")?`<div class="dodge">${p}</div>`:p.includes("ngã xuống")||p.includes("💀")?`<div class="death">${p}</div>`:p.includes("Chiến thắng")||p.includes("🏆")?`<div class="victory">${p}</div>`:p.includes("Đột phá")||p.includes("🎉")?`<div class="levelup">${p}</div>`:p.includes("bỏ chạy")||p.includes("🏃")?`<div class="flee">${p}</div>`:p.includes("Hết")||p.includes("⏰")?`<div class="stalemate">${p}</div>`:p.includes("Bất phân")||p.includes("🤝")?`<div class="stalemate">${p}</div>`:p.includes("Thoát thân")||p.includes("🚪")?`<div class="flee">${p}</div>`:p.includes("Linh Thạch")||p.includes("💰")?`<div class="gold-reward">${p}</div>`:p.includes("Tịnh dưỡng")||p.includes("🏥")?`<div class="hospital">${p}</div>`:p.includes("🧪")?`<div class="status-effect text-purple">${p}</div>`:p.includes("💔")?`<div class="dot-damage text-purple bold">${p}</div>`:p.includes("✨")?`<div class="regen text-green">${p}</div>`:p.includes("♻️")?`<div class="reflect text-red">${p}</div>`:`<div class="hit">${p}</div>`).join(""),o=v.monster,x=Math.max(0,r.player.currentHp/r.player.maxHp*100),h=Math.max(0,o.currentHp/o.maxHp*100),m={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Thất bại",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},n=m[v.outcome]||m.loss,i=(b=v.rewards)!=null&&b.gold?` · +${v.rewards.gold} 💰`:"",l=v.rewards?` · +${v.rewards.xp} XP${i}`:"";u.innerHTML=`
      <div class="panel">
        <div class="panel-title">${n.icon} ${n.text}
          <span class="subtitle">${v.turns}/${v.maxTurns||25} lượt${l}</span>
        </div>
        <div class="panel-body combat-result ${n.cls}">
          <div class="combat-opponents">
            <div class="fighter">
              <div class="f-name player-name">${r.player.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${x}%"></div></div>
              <div class="mini-hp-val">${r.player.currentHp}/${r.player.maxHp}</div>
            </div>
            <div class="vs">VS</div>
            <div class="fighter">
              <div class="f-name monster-name">${o.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${h}%"></div></div>
              <div class="mini-hp-val">${o.currentHp}/${o.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${y}</div>
      </div>`,g(),t&&typeof c=="function"&&setTimeout(()=>c(),1500)}catch(v){u.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${v.message}</div></div>`}}}function X(a,e){const{state:t,api:r,notify:d}=e,$=t.player,g=($.skills||[]).find(y=>(typeof y=="string"?y:y.id)==="nhan_thuat"),c=g?g.level||1:0,u=[...t.skills].sort((y,o)=>(y.tier||1)-(o.tier||1)),b=($.skills||[]).map(y=>typeof y=="string"?y:y.id),v={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};a.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${c}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${u.map(y=>{const o=b.includes(y.id),x=y.tier||1,h=x>c+1,m=x<=c;let n="";return y.requirements&&y.requirements.length>0?m||o?n=`<div class="mt-sm text-xs text-orange">Điều kiện: ${y.requirements.map(i=>`<br>• ${i}`).join("")}</div>`:h?n=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${x}.</div>`:n='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':n='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${o?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${y.name} ${o?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${o?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${v[x]||x}</span>
                    <span class="text-xs text-dim">${y.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${m||o?y.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${y.type!=="passive"&&y.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${y.cost} linh lực</div>`:""}
                
                ${n}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${o?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${h?"btn--dark":"btn--gold"} btn--sm btn-learn" ${h?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${y.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,a.querySelectorAll(".accordion-header").forEach(y=>{y.addEventListener("click",()=>{const o=y.nextElementSibling;o.style.display==="none"?(o.style.display="block",y.querySelector("div:last-child").textContent="▲"):(o.style.display="none",y.querySelector("div:last-child").textContent="▼")})}),a.querySelectorAll(".btn-learn").forEach(y=>{y.addEventListener("click",async o=>{o.stopPropagation();try{const x=await r.learnSkill($.id,y.dataset.sid);x.error?d(x.error,"error"):(t.player=x.player,d(x.message,"success"),X(a,e))}catch(x){d("Lỗi học kỹ năng: "+x.message,"error")}})})}function ut(a,e){var x,h,m;const{state:t,api:r,notify:d,renderGame:$}=e,g=t.player,c=g.stats,u=g.allocatedStats||{},b=5,v=g.currentEnergy>=b&&!g.hospitalRemaining,y=g.talentDisplay||{},o=[["strength","💪","Sức mạnh","Tăng sát thương mỗi đòn"],["speed","🏃","Tốc độ","Tăng hit chance, giảm escape"],["dexterity","🎯","Khéo léo","Tăng dodge, escape, stealth"],["defense","🛡","Phòng thủ","Giảm sát thương nhận vào"]];a.innerHTML=`
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${g.currentEnergy}/${g.maxEnergy} linh lực · Chi phí: ${b}/lần</span>
      </div>
    </div>

    ${g.hospitalRemaining>0?`<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${g.hospitalRemaining}s</div></div>`:""}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${((x=g.realmInfo)==null?void 0:x.fullName)||"Phàm Nhân"}
          </div>
        </div>
        <div>
          ${(h=g.realmInfo)!=null&&h.canBreakthrough?'<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>':'<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>'}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${o.map(([n,i,l])=>{const p=y[n]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"};return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${p.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${i}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${l}</div>
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
        ${o.map(([n,i,l,p])=>{const s=y[n]||{value:1,name:"Phàm Cốt",icon:"⚪",color:"#ccc"},f=Math.floor(g.currentEnergy/b)||0;return`
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${i}</span> ${l}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${p}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${c[n]??0}</span>
              ${u[n]>0?`<span class="text-green" style="font-size:12px; min-width:30px">(+${u[n]})</span>`:'<span style="min-width:30px"></span>'}
              <span style="font-size:10px;color:${s.color};min-width:50px" title="Căn Cốt: ${s.name} (×${s.value})">${s.icon}×${s.value}</span>
              <input type="number" class="train-count" data-stat="${n}" min="1" max="${f}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${v?"":"disabled"}>
              <button class="btn btn--sm ${v?"btn--blue":"btn--dark"} train-btn" data-train="${n}" ${v?"":"disabled"} title="Tốn ${b} Linh lực/lần · Căn cốt ×${s.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join("")}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${b} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(g.currentEnergy/b)}</strong> lần hiện tại.
        </div>
        <div class="derived-row mt-3 border-t border-dim pt-3">
          <div class="d-item"><div class="d-val">${c.maxHp??100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${c.maxEnergy??50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${c.energyRegen??5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row pb-3">
          <div class="d-item"><div class="d-val">${c.critChance??5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${c.critMultiplier??1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Khí/đòn</div></div>
        </div>
      </div>
    </div>`,(m=a.querySelector(".btn-breakthrough"))==null||m.addEventListener("click",async()=>{try{const n=a.querySelector(".btn-breakthrough");n.disabled=!0,n.innerHTML="Đang Độ Kiếp...";const i=await r.attemptBreakthrough(t.playerId);t.player=i.player,d(i.message,"success"),$()}catch(n){d(n.message||"Đột phá thất bại","error");const i=a.querySelector(".btn-breakthrough");i&&(i.disabled=!1,i.innerHTML="⚡ Đột Phá Cảnh Giới!")}}),a.querySelectorAll(".train-btn").forEach(n=>{n.addEventListener("click",async i=>{i.stopPropagation();const l=a.querySelector(`.train-count[data-stat="${n.dataset.train}"]`),p=parseInt(l==null?void 0:l.value)||1;try{const s=await r.trainStat(t.playerId,n.dataset.train,p);t.player=s.player,d(s.message,"success"),$()}catch(s){d(s.message||"Lỗi rèn luyện","error")}})})}function Y(a,e){const{state:t,api:r,notify:d}=e,$=t.player.skills||[],g=$.map(u=>typeof u=="string"?u:u.id),c=$.map(u=>{const b=typeof u=="string"?u:u.id;return{...t.skills.find(y=>y.id===b)||{name:"Vô danh thủ thuật",id:b},level:u.level||1,currentXp:u.currentXp||0}});t.skills.filter(u=>!g.includes(u.id)),a.innerHTML=`
    <div class="page-header"><h1>⚡ Thần Thông</h1></div>

    <div class="panel">
      <div class="panel-title">Đã học (${c.length})</div>
      <div class="panel-body no-pad">
        ${c.length===0?'<div style="padding:14px" class="text-dim">Chưa lĩnh hội kỹ năng nào</div>':c.map(u=>{const b=u.type==="passive"&&(!u.tags||!u.tags.includes("movement")&&!u.tags.includes("thân pháp")),v=b?'<span class="text-xs text-dim">Vĩnh Viễn Kích Hoạt</span>':u.isEquipped?`<button class="btn btn--sm equip-btn" style="background:var(--red)" data-eq="0" data-sid="${u.id}">Tháo Gỡ</button>`:`<button class="btn btn--sm equip-btn" data-eq="1" data-sid="${u.id}">Trang Bị</button>`,y=u.isEquipped&&!b?'<span class="badge" style="background:var(--green)">Đang trang bị</span>':"";return`
            <div class="list-item flex flex-col items-start gap-4" style="${u.isEquipped&&!b?"border-left: 3px solid var(--green); background: rgba(50, 200, 100, 0.05);":""}">
              <div class="item-info w-full">
                <div class="flex justify-between items-center mb-xs">
                  <div class="item-name text-lg">${u.name} <span class="badge" style="background:var(--blue)">Tầng ${u.level}</span> ${y}</div>
                  <div class="text-xs text-gold">${u.currentXp} / 100 XP</div>
                </div>
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-meta">${u.type==="passive"?"🔮 Nội công":`⚡ Chiêu thức · 🔵${u.cost||0} linh lực`}${u.description?" · "+u.description:""}</div>
                  <div>${v}</div>
                </div>
                
                <!-- Master XP Bar -->
                <div class="w-full bg-darker rounded" style="height: 4px; overflow: hidden;">
                  <div class="bg-gold h-full" style="width: ${Math.min(100,Math.max(0,u.currentXp/100*100))}%"></div>
                </div>
              </div>
            </div>`}).join("")}
      </div>
      </div>
    </div>`,a.querySelectorAll(".equip-btn").forEach(u=>{u.addEventListener("click",async()=>{try{const b=u.dataset.sid,v=u.dataset.eq==="1",y=await r.equipSkill(t.playerId,b,v);t.player=y.player,d(y.message,"success"),Y(a,e)}catch(b){d(b.message||"Lỗi trang bị","error")}})})}function vt(a,e){return e==="manual"?"📜":a==="weapon"?"⚔️":a==="body"?"🥋":a==="shield"?"🛡️":a==="feet"?"👢":a==="ring"?"💍":"📦"}function Q(a,e){let t="",r="";if(a.slot==="weapon"){let u=0,b=0;(a.affixes||[]).forEach(v=>{v.stat==="strength"&&v.type==="flat"&&(u+=v.value),v.stat==="dexterity"&&v.type==="flat"&&(b+=v.value)}),u===0&&(u=a.itemLevel*2+5),b===0&&(b=a.itemLevel+10),t=`⚔️ ${u}`,r=`🎯 ${b}`}else if(a.slot==="body"||a.slot==="shield"||a.slot==="feet"){let u=0;(a.affixes||[]).forEach(b=>{b.stat==="defense"&&b.type==="flat"&&(u+=b.value)}),u===0&&(u=a.itemLevel*3),t=`🛡️ ${u}`}else if(a.slot==="ring"){let u=0;(a.affixes||[]).forEach(b=>{b.stat==="capacity"&&(u+=b.value)}),t=u>0?`🎒 +${u}`:""}const d=(a.affixes||[]).map(u=>mt(u)).map(u=>`<span class="badge badge-dim">${u}</span>`).join(" "),$=a.description||`Một vật phẩm loại ${a.slot} cấp ${a.itemLevel} thuộc phẩm chất ${a.rarity}. Khí tức tỏa ra không tồi.`,g=a.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${a.craftedBy}</strong></div>`:"",c=e?a.category==="manual"?`<button class="btn btn--sm btn--gold" data-use="${a.id}">Sử Dụng</button>`:`<button class="btn btn--sm btn--blue" data-eid="${a.id}">Trang Bị</button>`:"";return`
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${a.rarity}"></span>
          <span class="item-name rarity-${a.rarity}" style="font-size:14px">${a.name}</span>
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${t?`<span style="color:var(--text-light)">${t}</span>`:""}
          ${r?`<span style="color:var(--text-light)">${r}</span>`:""}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05)">
        <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
          ${vt(a.slot,a.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${a.name}</strong> là loại ${a.baseType}. ${$}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${a.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${a.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${d||'<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${g}
          <div class="mt-2 flex justify-end">
            ${c}
          </div>
        </div>
      </div>
    </div>`}function mt(a){const t={strength:"STR",speed:"SPD",dexterity:"DEX",defense:"DEF",critMultiplier:"CRIT MUL"}[a.stat]||a.stat,r=a.value>=0?"+":"";return a.type==="flat"?`${r}${a.value} ${t}`:a.type==="increase"?`${r}${a.value}% ${t}`:a.type==="more"?`×${r}${a.value}% ${t}`:`${r}${a.value} ${t}`}function K(a,e){var i,l,p,s,f,T,k;const{state:t,api:r,notify:d,renderGame:$}=e,g=Object.values(t.player.equipment||{}),c=t.player,u=t.medicines||[],b=c.medCooldownRemaining||0,v=t.inventoryTab||"equipped",y=c.skills&&c.skills.some(w=>{const L=typeof w=="string"?w:w.id;return L==="duoc_ly"||L==="y_thuat"}),o=g.find(w=>w.slot==="ring1"),x=g.find(w=>w.slot==="ring2");let h=20;((o==null?void 0:o.id)==="tui_tru_vat"||(i=o==null?void 0:o.baseType)!=null&&i.includes("tru_vat"))&&(h+=((p=(l=o.affixes)==null?void 0:l[0])==null?void 0:p.value)||10),((x==null?void 0:x.id)==="tui_tru_vat"||(s=x==null?void 0:x.baseType)!=null&&s.includes("tru_vat"))&&(h+=((T=(f=x.affixes)==null?void 0:f[0])==null?void 0:T.value)||10),a.innerHTML=`
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(c.inventory||[]).length} / ${h})</span></h1>
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
          Đan Dược ${b>0?`<span style="color:var(--orange); font-size:11px">(${b}s)</span>`:""}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`;const m=document.getElementById("invTabContent"),n=()=>{m.querySelectorAll("[data-eid]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const E=await r.equipItem(t.playerId,w.dataset.eid);t.player=E.player,d(E.message,"success"),$()}catch(E){d(E.message||"Lỗi trang bị","error")}})}),m.querySelectorAll("[data-use]").forEach(w=>{w.addEventListener("click",async L=>{L.stopPropagation();try{const E=await r.useItem(t.playerId,w.dataset.use);t.player=E.player,d(E.message,"success"),$()}catch(E){d(E.message||"Lỗi sử dụng","error")}})})};if(v==="equipped"){const w=c.equipment||{},L=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];m.innerHTML=`
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${L.map(E=>{const S=w[E.key],P=S&&S.id,I=P?`rarity-${S.rarity}`:"";return`
            <div style="background:${P?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${P?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${E.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${E.name}</div>
              ${P?`<div style="font-size:11px;font-weight:600" class="${I}">${S.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${S.rarity}] Lv${S.itemLevel||"?"}</div>`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
            </div>`}).join("")}
      </div>
      ${g.length>0?`
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${g.filter(E=>E&&E.id).map(E=>Q(E,!1)).join("")}
      `:""}
    `,n()}else if(v==="medicine")m.innerHTML=`
      <div style="padding:12px">
        ${b>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${b}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${b/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}
        ${u.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':u.map(w=>`
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${w.icon||"💊"} ${w.name}</div>
                <div class="item-meta">
                  ${w.description}
                  ${w.healPercent?` · Phục hồi ${w.healPercent}% HP`:""}
                  ${w.cooldownAdd?` · Sinh Đan độc ${w.cooldownAdd}s`:""}
                  ${w.duration?` · Hiệu lực ${w.duration} trận`:""}
                  ${w.toxicity&&y?`<div class="text-red mt-xs">⚠️ Phản Phệ: ${w.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${w.penalty&&y?`<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${w.penalty.map(L=>`Giảm ${Math.abs(L.value)*100}% ${L.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${w.id}" 
                ${b+(w.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>`,m.querySelectorAll("[data-med]").forEach(w=>{w.addEventListener("click",async()=>{try{const L=await r.useMedicine(t.playerId,w.dataset.med);t.player=L.player,d(L.message,"success"),$()}catch(L){d(L.message||"Đan độc quá nồng!","error")}})});else{const w=c.inventory||[];let L=[];v==="weapon"?L=w.filter(E=>E.slot==="weapon"&&E.category!=="manual"):v==="armor"?L=w.filter(E=>["body","shield","feet"].includes(E.slot)):v==="accessory"?L=w.filter(E=>["ring","amulet","ring1","ring2"].includes(E.slot)):v==="manual"&&(L=w.filter(E=>E.category==="manual")),m.innerHTML=`
      ${L.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':L.map(E=>Q(E,!0)).join("")}
    `,n()}a.querySelectorAll("[data-tab]").forEach(w=>{w.addEventListener("click",()=>{t.inventoryTab=w.dataset.tab,K(a,e)})}),(k=document.getElementById("btnGen"))==null||k.addEventListener("click",async()=>{const w=["common","rare","epic","legendary"];try{const L=await r.generateItem(t.playerId,w[Math.floor(Math.random()*w.length)]);t.player=L.player,t.items=L.items||[],d(L.message,"success"),K(a,e)}catch{d("Lỗi tạo ngẫu nhiên","error")}})}function yt(a,e){var p,s;const{state:t,api:r,notify:d,renderGame:$}=e,g=t.player,c=t.crimes||[];if((g.jailRemaining??0)>0){const f=g.jailRemaining,T=Math.max(10,100*Math.ceil(f/60)*g.level);a.innerHTML=`
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
      </div>`,(p=document.getElementById("btnEscape"))==null||p.addEventListener("click",async()=>{try{const k=await r.escapeJail(t.playerId);t.player=k.player,d(k.message,k.success?"success":"error"),$()}catch(k){d(k.message||"Lỗi","error")}}),(s=document.getElementById("btnBail"))==null||s.addEventListener("click",async()=>{try{const k=await r.bail(t.playerId);t.player=k.player,d(k.message,k.success?"success":"error"),$()}catch(k){d(k.message||"Lỗi","error")}});return}const b={theft:{label:"🧤 Trộm cắp",color:"var(--blue)"},fraud:{label:"🎭 Gian trá",color:"var(--purple)"},vandalism:{label:"🔥 Phá hoại",color:"var(--orange)"},intel:{label:"🕶️ Tình báo",color:"var(--cyan)"},trade:{label:"📦 Buôn bán",color:"var(--green)"},explore:{label:"⚰️ Thám hiểm",color:"var(--gold)"},combat:{label:"🗡️ Chiến đấu",color:"var(--red)"},ritual:{label:"🩸 Nghi lễ",color:"#c0392b"}},v={unlock_hidden_event:"🔓 Mở content ẩn",rare_material_drop:"✨ Nguyên liệu hiếm",random_buff:"⬆️ Buff ngẫu nhiên",random_debuff:"⬇️ Debuff khi thất bại",boss_encounter:"🐉 Gặp Boss",epic_loot:"🏺 Bảo vật hiếm",legendary_drop:"💎 Cổ vật truyền thuyết"},y=c.reduce((f,T)=>{const k=T.category||"theft";return f[k]||(f[k]=[]),f[k].push(T),f},{}),o=Object.keys(b).map(f=>{const T=y[f];if(!T||T.length===0)return"";const k=b[f];return`
    <div class="panel mt-md" style="border-color: ${k.color}40;">
      <div class="panel-title" style="color: ${k.color};">${k.label} <span class="subtitle text-dim">${T.length} loại</span></div>
      <div class="panel-body no-pad">
        ${T.map(w=>{var M;const L=((M=g.crimeSkills)==null?void 0:M[w.id])??0,E=L<(w.minSkill??0),S=!E&&(g.nerve??0)>=w.nerveCost,P=w.special||[],I=Math.min(95,w.baseSuccessRate+L*.5);return`
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
                  <span style="color:${I>=60?"var(--green)":I>=40?"var(--orange)":"var(--red)"}">🎯 ${Math.round(I)}%</span>
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
    </div>`}).join(""),x=g.crimeExp||0,h=Math.floor(x/50),m=x%50,n=50,i=m/n*100,l=`
    <div class="panel mb-md" style="border-color: var(--gold)40; margin-bottom: 16px;">
      <div class="panel-body">
        <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
          <strong>Danh vọng Hắc Đạo: Cấp ${h}</strong>
          <span class="text-dim">${m} / ${n} EXP</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${i}%; background:var(--gold);"></div>
        </div>
        <div class="text-dim mt-sm" style="font-size:12px;">Cần <strong>${n-m} EXP</strong> nữa để tăng giới hạn Nghịch Khí. (Giới hạn hiện tại: ${g.maxNerve||15})</div>
      </div>
    </div>
  `;a.innerHTML=`
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${g.nerve??0}/${g.maxNerve??15} Nghịch Khí · 💰 ${g.gold??0} Linh Thạch</span></div>
    </div>
    ${l}
    ${o}`,a.querySelectorAll("[data-crime]").forEach(f=>{f.addEventListener("click",async()=>{try{const T=await r.commitCrime(t.playerId,f.dataset.crime);t.player=T.player;const k=T.outcome==="success"?"success":T.outcome==="critical_fail"?"error":"info";d(T.message,k),$()}catch(T){d(T.message||"Lỗi","error")}})})}function ht(a,e){var l;const{state:t,api:r,notify:d,renderGame:$}=e,g=t.player,c=t.educationTrees||[],u=g.unlockedNodes||[],b=g.studyingNode||"",v=b?b.split("|")[0]:"",y=g.studyEndsAt||0,o=Math.max(0,y-Math.floor(Date.now()/1e3)),x=g.treeProgress||{},h=g.skillProgress||{};let m=localStorage.getItem("eduActiveTree")||((l=c[0])==null?void 0:l.id),n=c.find(p=>p.id===m)||c[0];!n&&c.length>0&&(n=c[0]);const i=()=>{if(!n){a.innerHTML='<div class="p-lg">Chưa có dữ liệu tu luyện.</div>';return}const p=c.map(S=>`
      <button class="edu-tab ${S.id===n.id?"active":""}" data-tab="${S.id}">
        <span class="edu-tab-icon">${S.icon}</span>
        <span class="edu-tab-name">${S.name}</span>
        <span class="edu-tab-badge">${x[S.id]||0}</span>
      </button>
    `).join("");let s="";if(v){let S=null,P=null;c.forEach(I=>{const M=I.nodes.find(N=>N.id===v);M&&(S=M,P=I)}),S&&(s=`
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${P.name}</div>
              <div class="text-gold text-lg bold">${S.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${o}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${o>0?"disabled":""}>
                ${o>0?"Đang Lãnh Ngộ...":"✨ Đột Phá!"}
              </button>
            </div>
          </div>
        `)}const f=x[n.id]||0;let T=null;for(const S of n.milestones||[])if(f<S.require){T=S;break}let k="";T?k=`
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${T.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${T.description}</div>
        </div>
      `:k='<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>';const w=g.discoveredNodes||[],L=(n.nodes||[]).map(S=>{const P=u.includes(S.id),I=v===S.id,M=(S.prerequisites||[]).every(R=>u.includes(R)),N=n.nodes.some(R=>(R.prerequisites||[]).includes(S.id));if(!(w.includes(S.id)||P||!(S.prerequisites&&S.prerequisites.length>0))||P&&N)return"";let _="";I?_="studying":P?_="done":_="available";let B="";I?B='<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>':v?B='<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>':P?B=`<button class="btn btn--sm btn--gold btn-learn" data-node="${S.id}">Tiếp Tục Lãnh Ngộ (${S.duration}s)</button>`:M?B=`<button class="btn btn--sm btn--blue btn-learn" data-node="${S.id}">Bắt Đầu (${S.duration}s)</button>`:B='<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>';const j=h[S.id]||{level:1,exp:0},dt=j.level*100;let U="";return P&&(U=`<div class="text-xs text-gold mt-xs">Cảnh giới: ${j.level} | Độ hiểu thấu: ${j.exp}/${dt}</div>`),`
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
      `}).join("");a.innerHTML=`
      <div class="page-header">
        <h1>📜 Đạo Lộ (Tu Luyện)</h1>
        <div class="text-dim text-sm mt-xs">Lựa chọn con đường tu tiên của riêng bạn.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${p}</div>
          ${s}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${n.icon} ${n.name}</h2>
              <p class="text-dim mb-md">${n.description}</p>
              
              <h3 class="text-md mb-xs mt-md border-b pb-xs">🌟 Cảnh Giới Đột Phá</h3>
              <div class="edu-milestones-grid mb-lg">
                ${k||'<div class="text-dim text-sm">Nhánh này chưa có cảnh giới đặc biệt.</div>'}
              </div>

              <h3 class="text-md mb-xs border-b pb-xs">📖 Pháp Quyết</h3>
              <div class="edu-nodes-list">
                ${L||'<div class="text-dim text-sm">Chưa có pháp quyết.</div>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,a.querySelectorAll(".edu-tab").forEach(S=>{S.addEventListener("click",()=>{const P=S.dataset.tab;localStorage.setItem("eduActiveTree",P),m=P,n=c.find(I=>I.id===P)||c[0],i()})}),window.eduTimer&&clearInterval(window.eduTimer),v&&y>0&&(window.eduTimer=setInterval(()=>{const S=Math.floor(Date.now()/1e3);let P=Math.max(0,y-S);const I=document.getElementById("eduCounter");if(I&&(I.innerText=P+"s"),P<=0){clearInterval(window.eduTimer);const M=document.getElementById("btnCheckEdu");M&&(M.disabled=!1,M.innerHTML="✨ Đột Phá!")}},1e3));const E=a.querySelector("#btnCheckEdu");E&&E.addEventListener("click",async()=>{try{E.disabled=!0,E.innerHTML="Đang xử lý...";const S=await r.checkEducation(t.playerId);t.player=S.player,d(S.message,S.completed?"success":"info"),$()}catch(S){d(S.message||"Lỗi đột phá","error"),E.disabled=!1,E.innerHTML="Thử lại"}}),a.querySelectorAll(".btn-learn").forEach(S=>{S.addEventListener("click",async()=>{try{const P=S.dataset.node;S.disabled=!0,S.innerHTML="Chờ...";const I=await r.enrollNode(t.playerId,P,n.id);t.player=I.player,d(I.message,"success"),$()}catch(P){d(P.message||"Lỗi ghi danh","error"),S.disabled=!1,S.innerHTML="Bắt Đầu"}})})};i()}function Z(a,e){const{state:t,api:r,notify:d,updateSidebar:$,renderGame:g}=e,c=t.playerId;t._dungeon||(t._dungeon={mapItems:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const u=t._dungeon;async function b(){try{const[n,i]=await Promise.all([r.getMapItems(c),r.getDungeonHistory(c)]);u.mapItems=n.mapItems||[],u.activeRun=n.activeRun||null,u.history=i.history||[],u.loaded=!0,v()}catch(n){d(n.message||"Lỗi tải Bí Cảnh","error")}}function v(){a.innerHTML=`
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${u.activeRun?y():o()}

      ${u.lastResult?x():""}

      ${h()}
    `,m()}function y(){var p,s;const n=u.activeRun,i=n.currentWave===n.totalWaves,l=((n.currentWave-1)/n.totalWaves*100).toFixed(0);return`
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${n.dungeonName||n.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${l}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${n.currentWave}/${n.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${((p=t.player)==null?void 0:p.hospitalRemaining)>0?"disabled":""}>
              ${i?"🐉 Đánh Boss!":"⚔️ Chiến Đấu Tầng "+n.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${((s=t.player)==null?void 0:s.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>':""}
        </div>
      </div>
    `}function o(){return u.mapItems.length===0?`
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `:`
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${u.mapItems.map(n=>{const i=n.dungeon;return`
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${n.item.icon} ${n.item.name} <span style="opacity:0.5">x${n.quantity}</span></div>
                  ${i?`
                    <div class="item-meta">
                      ${i.name} · T${i.tier} · ${i.waves+1} tầng · Boss: ${i.bossName}
                    </div>
                  `:""}
                </div>
                ${i?`<button class="btn btn--sm btn--gold" data-enter="${n.item.id}">⚡ Kích Hoạt</button>`:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `}function x(){var p,s;const n=u.lastResult,i=n.result==="dungeon_complete"?"🏆":n.result==="wave_cleared"?"✅":"💀",l=n.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:12px;border-color:${l}">
        <div class="panel-title" style="color:${l}">${i} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${n.message}</div>
          ${(p=n.loot)!=null&&p.length?`
            <div style="margin-bottom:8px">
              ${n.loot.map(f=>`<div style="font-size:12px;color:var(--green)">🎁 ${f}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${((s=n.combatLog)==null?void 0:s.length)||0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
              ${(n.combatLog||[]).map(f=>`<div>${f}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function h(){return u.history.length===0?"":`
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${u.history.map(n=>{const i=n.status==="completed"?"✅":n.status==="failed"?"❌":n.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${n.status==="completed"?"var(--green)":n.status==="failed"?"var(--red)":"var(--orange)"}">${i} ${n.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${n.wave}/${n.totalWaves} · ${new Date(n.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function m(){var n,i;document.querySelectorAll("[data-enter]").forEach(l=>{l.addEventListener("click",async()=>{const p=l.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?")){l.disabled=!0;try{const s=await r.enterDungeon(c,p);d(s.message,"success"),t.player=s.player,$(),u.activeRun=s.run,u.lastResult=null,await b()}catch(s){d(s.message,"error"),l.disabled=!1}}})}),(n=document.getElementById("btnFight"))==null||n.addEventListener("click",async()=>{const l=document.getElementById("btnFight");l.disabled=!0,l.textContent="⏳ Đang chiến đấu...";try{const p=await r.fightDungeonWave(c);t.player=p.player,$(),u.lastResult=p,p.result==="dungeon_complete"||p.result==="dungeon_failed"?u.activeRun=null:p.result==="wave_cleared"&&(u.activeRun.currentWave=p.nextWave),v()}catch(p){d(p.message,"error"),l.disabled=!1,l.textContent="⚔️ Chiến Đấu"}}),(i=document.getElementById("btnAbandon"))==null||i.addEventListener("click",async()=>{if(confirm("🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!"))try{await r.abandonDungeon(c),d("Đã rời khỏi Bí Cảnh.","info"),u.activeRun=null,u.lastResult=null,await b()}catch(l){d(l.message,"error")}})}u.loaded?v():b()}function tt(a,e){const{state:t}=e,r=t._travelTab||"map";a.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Ngao Du</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên và chinh phục bí cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${r==="map"?"active":""}" data-tab="map" style="flex:1;padding:10px;border:none;background:${r==="map"?"rgba(255,255,255,0.08)":"transparent"};color:${r==="map"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${r==="map"?"700":"400"};border-bottom:2px solid ${r==="map"?"var(--gold)":"transparent"};transition:all 0.2s">
        🗺️ Bản Đồ
      </button>
      <button class="tab-btn ${r==="dungeon"?"active":""}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${r==="dungeon"?"rgba(255,255,255,0.08)":"transparent"};color:${r==="dungeon"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${r==="dungeon"?"700":"400"};border-bottom:2px solid ${r==="dungeon"?"var(--gold)":"transparent"};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
    </div>
    <div id="travelTabContent"></div>
  `,a.querySelectorAll(".tab-btn").forEach($=>{$.addEventListener("click",()=>{t._travelTab=$.dataset.tab,tt(a,e)})});const d=a.querySelector("#travelTabContent");r==="map"?O(d,e):Z(d,e)}async function O(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e;a.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ...</div>';try{const[g,c]=await Promise.all([r.request("/data/areas"),r.request(`/player/${t.playerId}/area`)]),u=g.areas||[],b=c.area,v=c.player,y=c.traveling||!1,o=c.travelRemaining||0,x=c.travelDestination||"";c.message&&d(c.message,"success"),c.player&&(t.player=c.player,$());const h=t.exploration||{},m=h[(v==null?void 0:v.currentArea)||"thanh_lam_tran"],n=(b==null?void 0:b.name)||(m==null?void 0:m.name)||"Vùng Đất Vô Danh",i=(m==null?void 0:m.staminaCost)||10,l={hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận"},p=l[v==null?void 0:v.currentArea]||"",s=[...u].sort((T,k)=>(T.sort_order||T.mapY||0)-(k.sort_order||k.mapY||0)),f=[...u].sort((T,k)=>(T.mapY||0)-(k.mapY||0));if(a.innerHTML=`
      ${y?`
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.1)">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:32px; margin-bottom:12px; animation:bounce 1s infinite">🚶</div>
            <strong style="font-size:16px">Đang tiến về ${x}</strong>
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
                <div class="text-gold bold">-${i}/lần</div>
              </div>
            </div>
            ${b!=null&&b.description?`<div class="text-sm text-dim" style="margin-top:6px">${b.description}</div>`:""}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Lv.${(b==null?void 0:b.min_level)||1}+</span>
              ${p?`<span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">${p}</span>`:""}
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

          ${f.map(T=>{const k=h[T.id],w=T.id===v.currentArea&&!y,L=v.level<(T.min_level||1),E=(k==null?void 0:k.mapX)||50,S=(k==null?void 0:k.mapY)||50,P=w?"var(--green)":L?"var(--red)":"var(--blue)",I=w?`box-shadow: 0 0 15px ${P}; animation: pulse 2s infinite`:"",M=!w&&!L&&!y;return`
              <div class="map-node ${M?"clickable":""}" ${M?`data-travel="${T.id}"`:""} 
                   style="position:absolute; left:${E}%; top:${S}%; transform:translate(-50%, -50%); z-index:1; display:flex; flex-direction:column; align-items:center; width:max-content">
                <div class="node-label" style="font-size:10px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; margin-bottom:4px; color:${w?"var(--green)":"var(--text-light)"}; border:1px solid ${w?"var(--green)":"rgba(255,255,255,0.1)"}">
                  ${T.name} ${L?`[Lv.${T.min_level}]`:""}
                </div>
                <div class="node-dot" style="width:12px; height:12px; background-color:${P}; border-radius:50%; border:2px solid #fff; ${I}"></div>
              </div>
            `}).join("")}
        </div>
      </div>

      <div class="panel mt-md">
        <div class="panel-title">Thiết Lập Lộ Trình</div>
        <div class="panel-body no-pad" style="max-height: 300px; overflow-y:auto">
          ${s.map(T=>{const k=h[T.id],w=T.id===v.currentArea&&!y,L=v.level<(T.min_level||1),E=parseInt(T.travel_time)||0,S=(k==null?void 0:k.staminaCost)||"?",P=l[T.id]||"";return`
              <div class="list-item ${w||L?"":"clickable"}" ${!w&&!L&&!y?`data-travel="${T.id}"`:""} style="padding: 10px 14px">
                <div class="item-info" style="flex:1">
                  <div class="item-name" style="font-size:14px">
                    ${T.name}
                    ${w?' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>':""}
                    ${L?` <span style="color:var(--red); font-size:11px">[Lv.${T.min_level}+]</span>`:""}
                  </div>
                  <div class="item-meta" style="margin-top:2px;display:flex;gap:6px;flex-wrap:wrap">
                    <span>Lv.${T.min_level||1}+</span>
                    <span>${E>0?"⏱ "+E+"s":"⚡ Tức thời"}</span>
                    <span>🏃 -${S}</span>
                    ${P?`<span style="font-size:10px;opacity:0.6">${P}</span>`:""}
                  </div>
                  ${T.description?`<div class="text-xs text-dim" style="margin-top:2px">${T.description}</div>`:""}
                </div>
                ${!w&&!L&&!y?`
                  <button class="btn btn--blue btn--sm" data-travel="${T.id}">
                    ${E>0?"🚶 Di chuyển":"⚡ Đi"}
                  </button>
                `:""}
              </div>`}).join("")}
        </div>
      </div>`,a.querySelectorAll("[data-travel]").forEach(T=>{T.addEventListener("click",async k=>{k.stopPropagation();const w=T.dataset.travel;a.querySelectorAll("[data-travel]").forEach(L=>{L.tagName==="BUTTON"&&(L.disabled=!0),L.style.pointerEvents="none"});try{const L=await r.request(`/player/${t.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:w})});L.player&&(t.player=L.player,$()),d(L.message,"success"),O(a,e)}catch(L){d(L.message||"Lỗi di chuyển!","error"),O(a,e)}})}),y&&o>0){let T=o;const k=o,w=setInterval(async()=>{T--;const L=document.getElementById("travelTimer"),E=document.getElementById("travelBar");if(L&&(L.textContent=`⏳ ${Math.max(0,T)}s`),E&&(E.style.width=`${Math.max(0,T/k*100)}%`),T<=0){clearInterval(w);try{const S=await r.request(`/player/${t.playerId}/travel-check`,{method:"POST"});S.player&&(t.player=S.player,$()),S.arrived&&d(S.message,"success"),O(a,e)}catch{O(a,e)}}},1e3)}}catch(g){a.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(g)}}function F(a,e){var l,p;const{state:t,renderGame:r,notify:d,updateSidebar:$}=e,g=t.player,c=t.recipes||[],u=t.medicines||[],b=t._alchemyTab||"recipes",v=s=>{const f=u.find(T=>T.id===s);return f?(f.icon||"💊")+" "+f.name:s};let y=0,o=0,x=0,h=0;(g.skills||[]).forEach(s=>{const f=typeof s=="string"?s:s.id,T=typeof s=="string"?1:s.level||1;f==="tinh_che"&&(y=T*2),f==="phu_an_thuat"&&(o=T*5),f==="linh_kiem_thuat"&&(x=T*10),f==="cuong_hoa_thuat"&&(h=T*15)});const m=s=>s.split("_").map(f=>f.charAt(0).toUpperCase()+f.slice(1)).join(" "),n=[];Object.values(g.equipment||{}).forEach(s=>{s&&n.push({...s,loc:"eq"})}),(g.inventory||[]).filter(s=>s.slot&&s.slot!=="consumable").forEach(s=>n.push({...s,loc:"inv"}));let i=`
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${b==="recipes"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${b==="currency"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${y||o||x||h?`
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${y?`<span>🔥 Thành công +${y}%</span>`:""}
      ${o?`<span>💎 Giảm phí -${o}%</span>`:""}
      ${x?`<span>✨ Chất lượng +${x}%</span>`:""}
      ${h?`<span>⬆️ Nâng đôi ${h}%</span>`:""}
    </div>
    `:""}
  `;if(b==="recipes"){if(i+=`<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`,!g.materials||Object.keys(g.materials).length===0)i+='<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>';else for(const[s,f]of Object.entries(g.materials))i+=`<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${m(s)} <span style="color:var(--gold)">x${f}</span></div>`;i+="</div></div>",i+='<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">',c.length===0?i+='<div style="padding:16px" class="text-dim">Chưa có công thức...</div>':c.forEach(s=>{var E;const f=v(s.target),T=Math.min(100,(s.successRate||100)+y);let k="";(E=s.requirements)!=null&&E.skill&&(k=`<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${m(s.requirements.skill)} lv${s.requirements.level||1}</div>`);let w="";s.materials.forEach(S=>{var I;const P=((I=g.materials)==null?void 0:I[S.id])||0;w+=`<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${P>=S.amount?"var(--green)":"var(--red)"};font-weight:bold">${P}/${S.amount}</span> ${m(S.id)}</span>`});const L=u.find(S=>S.id===s.target)||{};i+=`
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${f}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${s.tier}</span>
                  <span>Tỉ lệ: <span style="color:${T>=80?"var(--green)":"var(--blue)"};font-weight:bold">${T}%</span></span>
                  <span>🔥 Phí: ${s.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${k}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${w}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${L.description||"Chưa rõ."}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${s.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`}),i+="</div></div>"}else i+=`
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
        ${[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 affix (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 affix, reroll còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (max +5)",cost:1500}].map(s=>{const f=Math.max(1,Math.round(s.cost*(1-o/100)));return`
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${s.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${s.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${s.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${s.id}" style="width:100%">
                💎 ${f} ${o>0?`<s style="opacity:0.4;font-size:10px">${s.cost}</s>`:""}
              </button>
            </div>`}).join("")}
      </div>
    `;a.innerHTML=i,a.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{t._alchemyTab=s.dataset.tab,F(a,e)})}),a.querySelectorAll(".accordion-header").forEach(s=>{s.addEventListener("click",()=>{const f=s.nextElementSibling;f.style.display==="none"?(f.style.display="block",s.querySelector(".text-dim:last-child").textContent="▲"):(f.style.display="none",s.querySelector(".text-dim:last-child").textContent="▼")})}),a.querySelectorAll(".btn-craft").forEach(s=>{s.addEventListener("click",async f=>{f.stopPropagation();const T=c.find(k=>k.id===s.dataset.recipe);if(T&&g.gold<(T.cost||0))return d("Không đủ linh thạch!","error");try{const k=await q.craftItem(g.id,s.dataset.recipe);t.player=k.player,d(k.message,k.success?"success":"error"),r()}catch(k){d(k.message,"error")}})}),a.querySelectorAll(".btn-currency").forEach(s=>{s.addEventListener("click",async()=>{const f=document.getElementById("selItem");if(!(f!=null&&f.value))return d("Chọn trang bị trước!","error");const T=s.dataset.cid;let k=-1;if(T==="thien_menh_phu"){const w=n.find(S=>S.id===f.value),L=(w==null?void 0:w.affixes)||[];if(L.length===0)return d("Item không có affix để khóa!","error");const E=prompt(`Chọn affix để khóa (0-${L.length-1}):
${L.map((S,P)=>`${P}: ${S.name||S.stat} +${S.value}`).join(`
`)}`);if(E===null)return;if(k=parseInt(E),isNaN(k)||k<0||k>=L.length)return d("Chỉ số không hợp lệ!","error")}s.disabled=!0,s.textContent="⏳...";try{const w=await q.applyCurrency(g.id,T,f.value,k);d(w.message,"success"),t.player=w.player,$(),F(a,e)}catch(w){d(w.message,"error"),s.disabled=!1,s.textContent="💎 Dùng"}})}),(l=document.getElementById("selItem"))==null||l.addEventListener("change",()=>{const s=n.find(T=>T.id===document.getElementById("selItem").value),f=document.getElementById("itemPreview");s&&f&&(f.innerHTML=(s.affixes||[]).map(T=>`<span style="color:var(--blue)">• ${T.name||T.stat} +${T.value}</span>`).join(" | ")||"Không có affix")}),(p=document.getElementById("selItem"))==null||p.dispatchEvent(new Event("change"))}function bt(a,e){const{state:t,api:r,notify:d,renderGame:$}=e;t.player,a.innerHTML=`
    <div class="page-header">
      <h2>🏷️ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ nhiệm vụ từ các NPC</p>
    </div>
    <div id="questList" class="quest-container">
      <div class="loading-spinner">⏳ Đang tải...</div>
    </div>
  `,g();async function g(){try{const u=(await r.getQuests(t.playerId)).quests||[],b=document.getElementById("questList");if(!b)return;if(u.length===0){b.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}b.innerHTML=u.map(v=>{const y=v.questAmount>0?Math.min(100,v.progress/v.questAmount*100):0,o=v.progress>=v.questAmount,x=v.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${o?"quest-done":""}" data-quest-id="${v.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${v.npcIcon||"🧓"} ${v.npcName||"NPC"}</span>
              <span class="quest-type">${x} ${v.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${v.questName||v.quest_id}</div>
            <div class="quest-desc">${v.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${o?"hp":"energy"}" style="width:${y}%"></div>
              </div>
              <span class="quest-progress-text">${v.progress}/${v.questAmount}</span>
            </div>
            ${o?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${v.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),b.querySelectorAll(".quest-complete-btn").forEach(v=>{v.addEventListener("click",async()=>{const y=v.dataset.qid;v.disabled=!0,v.textContent="⏳...";try{const o=await r.completeQuest(t.playerId,y);t.player=o.player,d(o.message,"success"),o.skillGained&&d(`🎯 Lĩnh ngộ: ${o.skillGained}!`,"success"),$()}catch(o){d(o.message||"Lỗi trả quest","error"),v.disabled=!1,v.textContent="✅ Trả Nhiệm Vụ"}})})}catch(c){console.error("Error loading quests:",c);const u=document.getElementById("questList");u&&(u.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function xt(a,e){const{state:t,api:r,notify:d,renderGame:$}=e;if(t.player.role!=="admin"){a.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const g=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let c="monsters";a.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${g.map(i=>`
          <button class="admin-tab ${i.id===c?"active":""}" data-tab="${i.id}">${i.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",i=>{const l=i.target.closest(".admin-tab");l&&(c=l.dataset.tab,document.querySelectorAll(".admin-tab").forEach(p=>p.classList.remove("active")),l.classList.add("active"),u(c))}),u(c);async function u(i){const l=document.getElementById("adminContent");if(l){l.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const p=await r.request(`/admin/${i}?adminId=${t.playerId}`);b(i,p,l)}catch(p){l.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${p.message}</div></div>`}}}function b(i,l,p){i==="monsters"?v(l,p):i==="npcs"?y(l,p):i==="areas"?o(l,p):x(i,l,p)}function v(i,l){const p=i.monsters||[];l.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${p.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${p.map(s=>{var f,T,k,w,L,E,S,P;return`
          <div class="admin-card" data-id="${s.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${s.name} ${s.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${((T=(f=i.tierInfo)==null?void 0:f[s.tier])==null?void 0:T.color)||"#888"}">${((w=(k=i.tierInfo)==null?void 0:k[s.tier])==null?void 0:w.name)||"T"+s.tier}</span>
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
    `,m(l,i,"monsters","monsters")}function y(i,l){const p=i.npcs||[];l.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${p.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${p.map(s=>`
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
    `,m(l,i,"npcs","npcs")}function o(i,l){const p=Object.keys(i);l.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${p.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${p.map(s=>{const f=i[s];return`
            <div class="admin-card" data-id="${s}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${f.name||s}</span>
                <span class="badge" style="background:var(--orange)">⚡${f.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(f.events||[]).map(T=>`<span>${T.type}: ${T.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${s}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,l.querySelectorAll(".admin-edit-area").forEach(s=>{s.addEventListener("click",()=>{const f=s.dataset.id,T=i[f];h(f,T,`areas/${f}`)})})}function x(i,l,p){var T;const s=JSON.stringify(l,null,2),f=s.split(`
`).length;p.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${i} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(f+5,30)}">${n(s)}</textarea>
    `,(T=document.getElementById("btnSaveGeneric"))==null||T.addEventListener("click",async()=>{try{const k=document.getElementById("genericEditor").value,w=JSON.parse(k);d("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(k){d("JSON không hợp lệ: "+k.message,"error")}})}function h(i,l,p,s){const f=JSON.stringify(l,null,2),T=document.createElement("div");T.className="admin-modal-overlay",T.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${i}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${n(f)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild(T),T.querySelectorAll(".admin-modal-close").forEach(k=>{k.addEventListener("click",()=>T.remove())}),T.addEventListener("click",k=>{k.target===T&&T.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const k=document.getElementById("modalEditor").value,w=JSON.parse(k);await r.request(`/admin/${p}?adminId=${t.playerId}`,{method:"PUT",body:JSON.stringify({data:w})}),d("✅ Đã lưu!","success"),T.remove(),u(c)}catch(k){d("Lỗi: "+k.message,"error")}})}function m(i,l,p,s){i.querySelectorAll(".admin-edit-btn").forEach(f=>{f.addEventListener("click",()=>{const T=f.dataset.id,w=(l[s]||[]).find(L=>L.id===T);w&&h(T,w,`${p}/${T}`)})})}function n(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function et(a,e){const{state:t,api:r,notify:d,renderGame:$,updateSidebar:g}=e,c=t.playerId;t._social||(t._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const u=t._social;async function b(){try{const m=await r.getRelationships(c);u.relationships=m,u.loaded=!0,v()}catch(m){d(m.message||"Lỗi tải dữ liệu Giao Tế","error")}}function v(){const{friends:m,enemies:n,pendingSent:i,pendingReceived:l}=u.relationships,p=l.length;a.innerHTML=`
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
            ${u.searchResults.map(s=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${s.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${s.level} · ${s.realm} · ${s.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${s.id!==c?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${s.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${s.id}">⚔️ Kẻ Thù</button>
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
          🤝 Đạo Hữu (${m.length})
        </button>
        <button class="btn btn--sm ${u.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${n.length})
        </button>
        <button class="btn btn--sm ${u.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${p>0?`<span class="badge">${p}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${u.tab==="friends"?y(m):""}
        ${u.tab==="enemies"?o(n):""}
        ${u.tab==="pending"?x(l,i):""}
      </div>
    `,h()}function y(m){return m.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':m.map(n=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${n.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${n.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${n.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function o(m){return m.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':m.map(n=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${n.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${n.level} · ${n.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${n.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${n.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function x(m,n){let i="";return m.length>0&&(i+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',i+=m.map(l=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${l.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${l.level} · ${l.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${l.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${l.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join("")),n.length>0&&(i+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',i+=n.map(l=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${l.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${l.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),m.length===0&&n.length===0&&(i='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),i}function h(){var m,n;(m=document.getElementById("btnSearch"))==null||m.addEventListener("click",async()=>{var l;const i=(l=document.getElementById("socialSearch"))==null?void 0:l.value.trim();if(!i||i.length<2)return d("Cần ít nhất 2 ký tự","error");u.searchQuery=i;try{const p=await r.searchPlayers(i);u.searchResults=p.players||[],v()}catch(p){d(p.message,"error")}}),(n=document.getElementById("socialSearch"))==null||n.addEventListener("keydown",i=>{var l;i.key==="Enter"&&((l=document.getElementById("btnSearch"))==null||l.click())}),document.querySelectorAll("[data-tab]").forEach(i=>{i.addEventListener("click",()=>{u.tab=i.dataset.tab,v()})}),document.querySelectorAll("[data-action]").forEach(i=>{i.addEventListener("click",async()=>{const l=i.dataset.action,p=i.dataset.target;i.disabled=!0;try{let s;switch(l){case"add-friend":s=await r.addFriend(c,p);break;case"accept-friend":s=await r.acceptFriend(c,p);break;case"reject-friend":s=await r.rejectFriend(c,p);break;case"remove-friend":s=await r.removeFriend(c,p);break;case"add-enemy":s=await r.addEnemy(c,p);break;case"remove-enemy":s=await r.removeEnemy(c,p);break}d(s.message||"Thành công!","success"),await b()}catch(s){d(s.message||"Lỗi!","error"),i.disabled=!1}})})}u.loaded?v():b()}function at(a,e){const{state:t,api:r,notify:d}=e,$=t.playerId;t._chat||(t._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const g=t._chat;async function c(){try{const[n,i]=await Promise.all([r.getGlobalChat(),r.getChatFriends($)]);g.globalMessages=n.messages||[],g.friends=i.friends||[],g.globalMessages.length>0&&(g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id),g.loaded=!0,v(),u()}catch(n){d(n.message||"Lỗi tải chat","error")}}function u(){b(),g.pollTimer=setInterval(async()=>{try{if(g.tab==="global"){const n=await r.getGlobalChat(g.lastGlobalId);n.messages&&n.messages.length>0&&(g.globalMessages.push(...n.messages),g.globalMessages.length>100&&(g.globalMessages=g.globalMessages.slice(-100)),g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id,o(),x())}else if(g.tab==="private"&&g.selectedFriend){const n=await r.getPrivateChat($,g.selectedFriend.id,g.lastPrivateId);n.messages&&n.messages.length>0&&(g.privateMessages.push(...n.messages),g.privateMessages.length>100&&(g.privateMessages=g.privateMessages.slice(-100)),g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id,o(),x())}}catch{}},5e3)}function b(){g.pollTimer&&(clearInterval(g.pollTimer),g.pollTimer=null)}function v(){const n=g.tab==="global"?g.globalMessages:g.privateMessages;a.innerHTML=`
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
            ${g.friends.map(i=>{var l;return`<option value="${i.id}" ${((l=g.selectedFriend)==null?void 0:l.id)===i.id?"selected":""}>${i.name} (Lv.${i.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${y(n)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${g.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,m(),x()}function y(n){return n.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':n.map(i=>{const l=i.sender_id===$,p=new Date(i.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${l?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${p}</span>
          <span style="font-weight:600;color:${l?"var(--blue)":"var(--gold)"}"> ${i.sender_name}</span>
          <span style="opacity:0.8">: ${h(i.message)}</span>
        </div>
      `}).join("")}function o(){const n=document.getElementById("chatMessages");if(!n)return;const i=g.tab==="global"?g.globalMessages:g.privateMessages;n.innerHTML=y(i)}function x(){const n=document.getElementById("chatMessages");n&&(n.scrollTop=n.scrollHeight)}function h(n){const i=document.createElement("div");return i.textContent=n,i.innerHTML}function m(){var i,l,p;document.querySelectorAll("[data-chat-tab]").forEach(s=>{s.addEventListener("click",()=>{g.tab=s.dataset.chatTab,g.tab==="global"&&(g.lastGlobalId=g.globalMessages.length>0?g.globalMessages[g.globalMessages.length-1].id:0),v(),u()})}),(i=document.getElementById("friendSelect"))==null||i.addEventListener("change",async s=>{const f=s.target.value;if(!f){g.selectedFriend=null,g.privateMessages=[],v();return}g.selectedFriend=g.friends.find(T=>T.id===f)||null,g.lastPrivateId=0;try{const T=await r.getPrivateChat($,f);g.privateMessages=T.messages||[],g.privateMessages.length>0&&(g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id),o(),x()}catch(T){d(T.message,"error")}});const n=async()=>{var T,k;const s=document.getElementById("chatInput"),f=s==null?void 0:s.value.trim();if(f){if(g.tab==="private"&&!g.selectedFriend)return d("Chọn Đạo Hữu trước!","error");try{if(await r.sendChat($,g.tab,g.tab==="private"?g.selectedFriend.id:null,f),s.value="",g.tab==="global"){const w=await r.getGlobalChat(g.lastGlobalId);((T=w.messages)==null?void 0:T.length)>0&&(g.globalMessages.push(...w.messages),g.lastGlobalId=g.globalMessages[g.globalMessages.length-1].id)}else{const w=await r.getPrivateChat($,g.selectedFriend.id,g.lastPrivateId);((k=w.messages)==null?void 0:k.length)>0&&(g.privateMessages.push(...w.messages),g.lastPrivateId=g.privateMessages[g.privateMessages.length-1].id)}o(),x()}catch(w){d(w.message||"Lỗi gửi tin nhắn","error")}}};(l=document.getElementById("btnSend"))==null||l.addEventListener("click",n),(p=document.getElementById("chatInput"))==null||p.addEventListener("keydown",s=>{s.key==="Enter"&&n()})}e.renderGame,g.loaded?(v(),u()):c()}function ft(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e,g=t.playerId;t._market||(t._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const c=t._market;async function u(){try{const[n,i]=await Promise.all([r.getMarketListings(c.filter,c.sort),r.getMyListings(g)]);c.listings=n.listings||[],c.myListings=i.listings||[],c.loaded=!0,v()}catch(n){d(n.message||"Lỗi tải Giao Dịch Đài","error")}}async function b(){try{const[n,i]=await Promise.all([r.getMugTargets(g),r.getMugLog(g)]);c.mugTargets=n.targets||[],c.mugCooldown=n.mugCooldown||0,c.mugLog=i.logs||[],v()}catch(n){d(n.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function v(){const n=t.player;a.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${c.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${c.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${c.myListings.length}/10)</button>
        <button class="btn btn--sm ${c.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${c.showListForm?h(n):""}

      ${c.tab==="browse"?y():c.tab==="my"?o():x()}
    `,m()}function y(){let n=`
      <div class="panel">
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn--xs ${c.filter===""?"btn--blue":"btn--dark"}" data-filter="">Tất cả</button>
            <button class="btn btn--xs ${c.filter==="item"?"btn--blue":"btn--dark"}" data-filter="item">⚔️ Trang Bị</button>
            <button class="btn btn--xs ${c.filter==="material"?"btn--blue":"btn--dark"}" data-filter="material">🧱 Nguyên Liệu</button>
            <button class="btn btn--xs ${c.filter==="medicine"?"btn--blue":"btn--dark"}" data-filter="medicine">💊 Đan Dược</button>
            <select id="sortSelect" style="padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:12px;margin-left:auto">
              <option value="newest" ${c.sort==="newest"?"selected":""}>Mới nhất</option>
              <option value="price_asc" ${c.sort==="price_asc"?"selected":""}>Giá tăng</option>
              <option value="price_desc" ${c.sort==="price_desc"?"selected":""}>Giá giảm</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo tên vật phẩm hoặc affix..." value="${c.search}" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
          </div>
        </div>
      </div>
    `,i=c.listings;if(c.search.trim()){const l=c.search.toLowerCase().trim();i=i.filter(p=>{var s;return p.item_name.toLowerCase().includes(l)?!0:(s=p.item_data)!=null&&s.affixes?p.item_data.affixes.some(f=>(f.stat||"").toLowerCase().includes(l)||(f.type||"").toLowerCase().includes(l)):!1})}return i.length===0?n+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(n+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',n+=i.map(l=>{var k,w;const p=l.item_type==="item"?"⚔️":l.item_type==="material"?"🧱":"💊",s=((k=l.item_data)==null?void 0:k.rarity)||"",f=l.seller_id===g,T=(w=l.item_data)!=null&&w.affixes?l.item_data.affixes.map(L=>`${L.stat} ${L.type==="flat"?"+":""}${L.value}${L.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${p}
                <span style="color:var(--gold)">${l.item_name}</span>
                ${l.quantity>1?`<span style="opacity:0.5"> x${l.quantity}</span>`:""}
                ${s?`<span class="rarity-${s}" style="font-size:11px;margin-left:4px">[${s}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${l.seller_name}</span>
                ${T?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${T}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${l.price}${l.quantity>1?"/cái":""}</span>
              ${f?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${l.id}" data-qty="${l.quantity}" data-price="${l.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),n+="</div></div>"),n}function o(){if(c.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let n='<div class="panel"><div class="panel-body no-pad">';return n+=c.myListings.map(i=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${i.item_type==="item"?"⚔️":i.item_type==="material"?"🧱":"💊"} ${i.item_name} ${i.quantity>1?`<span style="opacity:0.5">x${i.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${i.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${i.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),n+="</div></div>",n}function x(){let n=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${c.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${c.mugCooldown}s</div>`:""}
    `;return c.mugTargets.length===0?n+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':n+=c.mugTargets.map(i=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${i.gender==="female"?"♀":"♂"} ${i.name}</div>
            <div class="item-meta">Lv.${i.level} · ${i.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${i.id}" ${c.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),n+="</div></div>",c.mugLog.length>0&&(n+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${c.mugLog.map(i=>{const l=i.attacker_id===g,p=i.outcome==="success"?"✅":"❌",s=i.outcome==="success"?"var(--green)":"var(--red)",f=l?i.outcome==="success"?`Cướp ${i.victim_name}: +${i.gold_stolen} 💎`:`Phục kích ${i.victim_name} thất bại!`:i.outcome==="success"?`Bị ${i.attacker_name} cướp: -${i.gold_stolen} 💎`:`${i.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${s}">${p} ${f} <span style="opacity:0.4;margin-left:auto">${new Date(i.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),n}function h(n){const i=Object.entries(n.materials||{}).map(([f,T])=>({id:f,qty:T,type:"material",name:f})),l=Object.entries(n.medicines||{}).map(([f,T])=>({id:f,qty:T,type:"medicine",name:f})),p=(n.inventory||[]).map(f=>({id:f.id,qty:1,type:"item",name:f.name||f.id})),s=[...i,...l,...p];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${s.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${s.map(f=>`<option value="${f.type}|${f.id}">${f.type==="item"?"⚔️":f.type==="material"?"🧱":"💊"} ${f.name} ${f.qty>1?`(có: ${f.qty})`:""}</option>`).join("")}
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
    `}function m(){var n,i,l,p;document.querySelectorAll("[data-mtab]").forEach(s=>{s.addEventListener("click",()=>{if(c.tab=s.dataset.mtab,c.tab==="mug"&&c.mugTargets.length===0){b();return}v()})}),(n=document.getElementById("btnShowList"))==null||n.addEventListener("click",()=>{c.showListForm=!c.showListForm,v()}),document.querySelectorAll("[data-filter]").forEach(s=>{s.addEventListener("click",async()=>{c.filter=s.dataset.filter,await u()})}),(i=document.getElementById("sortSelect"))==null||i.addEventListener("change",async s=>{c.sort=s.target.value,await u()}),(l=document.getElementById("searchInput"))==null||l.addEventListener("input",s=>{c.search=s.target.value,v();const f=document.getElementById("searchInput");f&&(f.focus(),f.setSelectionRange(c.search.length,c.search.length))}),(p=document.getElementById("btnConfirmList"))==null||p.addEventListener("click",async()=>{var L,E,S;const s=(L=document.getElementById("listItem"))==null?void 0:L.value;if(!s)return;const[f,T]=s.split("|"),k=parseInt((E=document.getElementById("listQty"))==null?void 0:E.value)||1,w=parseInt((S=document.getElementById("listPrice"))==null?void 0:S.value)||0;if(w<=0)return d("Giá phải lớn hơn 0!","error");try{const P=await r.listForSale(g,f,T,k,w);d(P.message,"success"),t.player=P.player,$(),c.showListForm=!1,await u()}catch(P){d(P.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(s=>{s.addEventListener("click",async()=>{const f=parseInt(s.dataset.buy),T=parseInt(s.dataset.qty),k=parseInt(s.dataset.price);let w=1;if(T>1){const L=prompt(`Mua bao nhiêu? (tối đa ${T}, giá ${k} 💎/cái)`,"1");if(!L)return;w=Math.min(parseInt(L)||1,T)}s.disabled=!0;try{const L=await r.buyFromMarket(g,f,w);d(L.message,"success"),t.player=L.player,$(),await u()}catch(L){d(L.message,"error"),s.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(s=>{s.addEventListener("click",async()=>{s.disabled=!0;try{const f=await r.cancelListing(g,parseInt(s.dataset.cancel));d(f.message,"success"),t.player=f.player,$(),await u()}catch(f){d(f.message,"error"),s.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(s=>{s.addEventListener("click",async()=>{const f=s.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){s.disabled=!0,s.textContent="⏳...";try{const T=await r.mugPlayer(g,f);d(T.message,T.success?"success":"error"),t.player=T.player,$(),await b()}catch(T){d(T.message,"error"),s.disabled=!1,s.textContent="💀 Phục Kích"}}})})}c.tab==="mug"?b():c.loaded?v():u()}function $t(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e,g=t.playerId;let c=!1,u=null;async function b(){try{u=await r.getRealmInfo(g),c=!0,v()}catch(x){d(x.message||"Lỗi tải Cảnh Giới","error")}}function v(){if(!u)return;const x=u.current,h=u.allRealms||[],m=t.player,n=m.xpToNext>0?Math.floor(m.xp/m.xpToNext*100):0;a.innerHTML=`
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
            <div style="opacity:0.5;font-size:13px">Tầng ${x.tier}/8 · ${x.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${m.level} — ${m.xp}/${m.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${n}%;background:${x.color}"></div></div>
        </div>

        ${x.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(x.bonuses).filter(([,i])=>i>0).map(([i,l])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${l} ${i}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${x.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${x.unlocks.map(i=>`<span style="font-size:12px;opacity:0.7">✅ ${i}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${x.canBreakthrough?y(x):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${h.map(i=>{const l=i.tier===x.tier,p=i.tier<x.tier,f=i.tier>x.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${l?`2px solid ${i.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${f};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${i.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${i.color}">${i.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${i.levelMin}+</span>
                ${i.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${i.failChance}% thất bại</span>`:""}
                ${p?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${l?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,o()}function y(x){const h=x.nextRealm;if(!h)return"";const m=h.cost?`💎 ${h.cost.gold} + 🔮 ${h.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${h.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${h.name} ${h.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${m}</div>
          ${h.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${h.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(h.bonuses).filter(([,n])=>n>0).map(([n,i])=>`+${i} ${n}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${h.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function o(){var x;(x=document.getElementById("btnBreakthrough"))==null||x.addEventListener("click",async()=>{const h=document.getElementById("btnBreakthrough");if(confirm("Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!")){h.disabled=!0,h.textContent="⏳ Đang đột phá...";try{const m=await r.attemptBreakthrough(g);m.success?(d(m.message,"success"),t.player=m.player,$(),await b()):(d(m.message,"error"),m.player&&(t.player=m.player,$()),await b())}catch(m){d(m.message||"Lỗi đột phá","error"),h.disabled=!1,h.textContent="⚡ ĐỘT PHÁ"}}})}b()}function Tt(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e;kt(a,e)}async function kt(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e;a.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const c=(await r.request(`/player/${t.playerId}/events`)).events||[];if(t.player&&(t.player.unreadEventsCount=0,$()),c.length===0){a.innerHTML=`
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
            ${c.map(u=>{const b=new Date(u.created_at*1e3),v=b.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),y=b.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let o="📌";return u.type==="attack"&&(o="⚔️"),u.type==="hospital"&&(o="🏥"),u.type==="jail"&&(o="🚓"),u.type==="money"&&(o="💰"),u.type==="system"&&(o="⚙️"),u.type==="trade"&&(o="🤝"),`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${v}</div>
                    <div>${y}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${o}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${u.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${u.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(g){a.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${g.message}</div></div>`}}function wt(a,e){const{state:t,api:r,notify:d,updateSidebar:$,renderGame:g}=e,c=t.playerId;t._housing||(t._housing={data:null,loaded:!1});const u=t._housing;async function b(){try{const h=await r.getHousing(c);u.data=h,u.loaded=!0,v()}catch(h){d(h.message||"Lỗi tải Động Phủ","error")}}function v(){const h=u.data;a.innerHTML=`
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${h.owned?o(h):y(h)}
    `,x()}function y(h){const m=h.tiers[1];return`
      <div class="panel">
        <div class="panel-title">🏗️ Mua Động Phủ</div>
        <div class="panel-body" style="text-align:center;padding:24px">
          <div style="font-size:40px;margin-bottom:12px">🏠</div>
          <div style="font-weight:600;margin-bottom:6px">${m.name}</div>
          <div style="font-size:12px;opacity:0.6;margin-bottom:12px">${m.description}</div>
          <div style="margin-bottom:12px">
            <span style="color:var(--green)">❤️ +${m.hpRegen} HP/phút</span> ·
            <span style="color:var(--blue)">🌿 ${m.gardenSlots} ô vườn</span>
          </div>
          <button class="btn btn--gold btn--lg" id="btnBuyHouse">💎 ${m.cost} Linh thạch — Mua</button>
        </div>
      </div>
    `}function o(h){const m=h.gardenSlots||[],n=h.gardenHerbs||{};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏠</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${h.tierInfo.name} <span style="opacity:0.4">(T${h.tier})</span></div>
            <div style="font-size:12px;opacity:0.6">${h.tierInfo.description}</div>
            <div style="font-size:12px;margin-top:4px">
              <span style="color:var(--green)">❤️ +${h.tierInfo.hpRegen} HP/phút</span> ·
              <span style="color:var(--blue)">🌿 ${h.maxSlots} ô vườn</span>
            </div>
          </div>
          ${h.nextTier?`
            <button class="btn btn--gold btn--sm" id="btnUpgrade" title="Nâng lên ${h.nextTier.name}">
              ⬆ ${h.nextTier.cost} 💎
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
          <div style="display:grid;grid-template-columns:repeat(${Math.min(h.maxSlots,5)},1fr);gap:8px">
            ${Array.from({length:h.maxSlots},(i,l)=>{const p=m[l]||{},s=!!p.herb,f=p.ready,T=p.remaining||0,k=Math.ceil(T/60);return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${f?"var(--green)":s?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${s?`
                    <div style="font-size:20px">${f?"🌾":"🌱"}</div>
                    <div style="font-size:11px;margin-top:4px">${p.herbName||p.herb}</div>
                    <div style="font-size:10px;color:${f?"var(--green)":"var(--orange)"};margin-top:2px">
                      ${f?"✅ Sẵn sàng!":"⏳ "+k+" phút"}
                    </div>
                  `:`
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${l}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(n).map(([w,L])=>`<option value="${w}">${L.name}</option>`).join("")}
                    </select>
                  `}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>

      ${h.formations?`
      <div class="panel" style="margin-top:10px">
        <div class="panel-title flex justify-between">
          <span>🔮 Trận Pháp</span>
          ${h.dailyCost>0?`
            <span style="font-size:11px">
              Hao phí: <strong style="color:var(--orange)">${h.dailyCost} 💎/ngày</strong>
              ${h.maintenanceDue?'<button class="btn btn--sm btn--orange" id="btnMaintenance">💰 Nộp phí</button>':'<span style="color:var(--green);margin-left:6px">✅ Đã nộp</span>'}
            </span>
          `:""}
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
            ${Object.entries(h.formations).map(([i,l])=>{const p=l.currentLevel>=l.maxLevel;return`
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${l.currentLevel>0?"var(--blue)":"rgba(255,255,255,0.08)"};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${l.icon}</span>
                      <strong style="margin-left:4px">${l.name}</strong>
                      ${l.currentLevel>0?`<span style="color:var(--blue);font-size:11px"> Lv${l.currentLevel}</span>`:""}
                    </div>
                    ${l.canBuild?p?'<span style="font-size:10px;color:var(--gold)">MAX</span>':`<button class="btn btn--sm btn--gold btn-formation" data-fid="${i}">
                        ⬆ ${l.nextCost} 💎
                      </button>`:`<span style="font-size:10px;color:var(--red)">T${l.requiredTier}+</span>`}
                  </div>
                  <div style="font-size:11px;opacity:0.5;margin-top:4px">${l.description}</div>
                  ${l.currentLevel>0?`<div style="font-size:10px;color:var(--orange);margin-top:2px">Phí: ${l.nextDailyCost||(l.dailyCosts?l.dailyCosts[l.currentLevel-1]:"?")}/ngày</div>`:""}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `}function x(){var h,m,n,i;(h=document.getElementById("btnBuyHouse"))==null||h.addEventListener("click",async()=>{if(confirm("Mua Động Phủ?"))try{const l=await r.buyHousing(c);d(l.message,"success"),t.player=l.player,$(),await b()}catch(l){d(l.message,"error")}}),(m=document.getElementById("btnUpgrade"))==null||m.addEventListener("click",async()=>{if(confirm("Nâng cấp Động Phủ?"))try{const l=await r.buyHousing(c);d(l.message,"success"),t.player=l.player,$(),await b()}catch(l){d(l.message,"error")}}),document.querySelectorAll(".plant-select").forEach(l=>{l.addEventListener("change",async p=>{const s=p.target.value;if(!s)return;const f=parseInt(l.dataset.slot);try{const T=await r.plantHerb(c,s,f);d(T.message,"success"),await b()}catch(T){d(T.message,"error")}})}),(n=document.getElementById("btnHarvest"))==null||n.addEventListener("click",async()=>{try{const l=await r.harvestGarden(c);d(l.message,"success"),t.player=l.player,$(),await b()}catch(l){d(l.message,"error")}}),document.querySelectorAll(".btn-formation").forEach(l=>{l.addEventListener("click",async()=>{const p=l.dataset.fid;l.disabled=!0,l.textContent="⏳...";try{const s=await r.upgradeFormation(c,p);d(s.message,"success"),t.player=s.player,$(),await b()}catch(s){d(s.message,"error"),l.disabled=!1,l.textContent="⬆ Nâng"}})}),(i=document.getElementById("btnMaintenance"))==null||i.addEventListener("click",async()=>{try{const l=await r.payMaintenance(c);d(l.message,"success"),t.player=l.player,$(),await b()}catch(l){d(l.message,"error")}})}u.loaded?v():b()}function Lt(a,e){const{state:t}=e;t._wikiTab||(t._wikiTab="lore");function r(){a.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","explore","dungeon","housing","talent","alchemy","crime","market","tips"].map($=>`
          <button class="btn btn--sm ${t._wikiTab===$?"btn--gold":"btn--dark"}" data-tab="${$}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",explore:"🗺️ Khám Phá",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",crime:"🔪 Phạm Tội",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[$]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${d(t._wikiTab)}
        </div>
      </div>
    `,a.querySelectorAll("[data-tab]").forEach($=>{$.addEventListener("click",()=>{t._wikiTab=$.dataset.tab,r()})})}function d($){return{lore:`
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
      `}[$]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}r()}function St(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e,g=t.playerId;t._npcShop||(t._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const c=t._npcShop;async function u(){try{const y=await r.getShops(g);c.shops=y.shops||[],c.tax=y.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},c.loaded=!0,b()}catch(y){d(y.message||"Lỗi tải shop","error")}}function b(){a.innerHTML=`
      <div class="page-header">
        <h2>🧓 Thương Nhân NPC</h2>
        <p class="page-sub">Mua vật phẩm từ NPC. Stock giới hạn/ngày. Mua tối đa 50 vật phẩm/ngày.</p>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <div style="padding:6px 12px;background:rgba(255,200,0,0.08);border:1px solid rgba(255,200,0,0.2);border-radius:6px;font-size:12px">
          📊 Thuế P2P: <strong style="color:var(--gold)">${c.tax.rate}%</strong>
          <span style="opacity:0.5;margin-left:4px">${c.tax.reason}</span>
        </div>
      </div>

      ${c.shops.length===0?'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.4;padding:30px">Không có cửa hàng</div></div>':""}

      ${c.shops.map(y=>`
        <div class="panel" style="margin-bottom:10px">
          <div class="panel-title">${y.icon} ${y.name} <span style="opacity:0.4;font-size:11px">— ${y.area}</span></div>
          <div class="panel-body no-pad">
            ${y.items.map(o=>`
              <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:500">${o.name}</div>
                  <div style="font-size:11px;opacity:0.5">
                    Stock: <span style="color:${o.remainingStock>0?"var(--green)":"var(--red)"}">${o.remainingStock}/${o.dailyStock}</span>
                    · 💎 ${o.currentPrice}
                  </div>
                </div>
                <div style="display:flex;gap:4px;align-items:center">
                  <input type="number" class="buy-qty" data-shop="${y.id}" data-item="${o.id}" data-price="${o.currentPrice}"
                    value="1" min="1" max="${o.remainingStock}" style="width:40px;text-align:center;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:3px;font-size:11px">
                  <button class="btn btn--sm btn--gold btn-buy" data-shop="${y.id}" data-item="${o.id}"
                    ${o.remainingStock<=0?"disabled":""}>
                    ${o.remainingStock>0?"🛒 Mua":"❌ Hết"}
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `,v()}function v(){a.querySelectorAll(".btn-buy").forEach(y=>{y.addEventListener("click",async()=>{const o=y.dataset.shop,x=y.dataset.item,h=a.querySelector(`.buy-qty[data-shop="${o}"][data-item="${x}"]`),m=parseInt((h==null?void 0:h.value)||1);y.disabled=!0,y.textContent="⏳...";try{const n=await r.buyFromShop(g,o,x,m);d(n.message,"success"),t.player=n.player,$(),await u()}catch(n){d(n.message,"error"),y.disabled=!1,y.textContent="🛒 Mua"}})})}c.loaded?b():u()}function Et(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e,g=t.playerId;t._guild||(t._guild={data:null,loaded:!1,allGuilds:null});const c=t._guild;async function u(){try{c.data=await r.getMyGuild(g),c.loaded=!0,v()}catch(h){d(h.message||"Lỗi","error")}}async function b(){try{const h=await r.listGuilds();c.allGuilds=h.guilds||[],v()}catch(h){d(h.message,"error")}}function v(){const h=c.data;a.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${h!=null&&h.inGuild?o(h):y(h)}
    `,x()}function y(h){return`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🏗️ Lập Tông Môn Mới</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:grid;gap:8px;max-width:360px">
            <input type="text" id="guildName" placeholder="Tên Tông Môn (2-30 ký tự)" class="input" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <input type="text" id="guildTag" placeholder="Tag (2-5 ký tự, VD: TMQ)" class="input" maxlength="5" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <textarea id="guildDesc" placeholder="Mô tả..." rows="2" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;resize:none"></textarea>
            <button class="btn btn--gold" id="btnCreate">🏯 Lập Tông Môn (${(h==null?void 0:h.createCost)||1e4} 💎)</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>📋 Danh Sách Tông Môn</span>
          <button class="btn btn--sm btn--dark" id="btnLoadGuilds">🔄 Tải</button>
        </div>
        <div class="panel-body no-pad" id="guildList">
          ${c.allGuilds?c.allGuilds.map(m=>`
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
              <div style="flex:1">
                <div style="font-weight:600">[${m.tag}] ${m.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${m.level} · ${m.member_count}/${m.max_members} · Quỹ: ${m.treasury} 💎 · Chưởng Môn: ${m.leader_name}</div>
              </div>
              <button class="btn btn--sm btn--green btn-join" data-gid="${m.id}" ${m.member_count>=m.max_members?"disabled":""}>
                ${m.member_count>=m.max_members?"Đầy":"Gia nhập"}
              </button>
            </div>
          `).join(""):'<div style="padding:20px;text-align:center;opacity:0.3">Nhấn "Tải" để xem danh sách</div>'}
        </div>
      </div>
    `}function o(h){var l;const m=h.guild,n=h.members||[],i=h.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${m.tag}] ${m.name} <span style="opacity:0.3">Lv${m.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((l=m.levelInfo)==null?void 0:l.name)||""} · ${m.memberCount}/${m.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${m.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${m.dailyUpkeep}/ngày</span>
              ${m.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(m.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(m.buffs).map(([p,s])=>`${p} +${s}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${h.myRole==="leader"&&m.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${m.nextLevel.name}">⬆ ${m.nextLevel.upgradeCost} 💎</button>`:""}
            ${h.myRole==="leader"&&m.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            Bạn đã đóng: ${h.myContributed} 💎 · Vai trò: ${h.myRole==="leader"?"👑 Chưởng Môn":h.myRole==="elder"?"⭐ Trưởng Lão":"🙋 Đệ Tử"}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">📜 Nhật Ký</div>
          <div class="panel-body" style="max-height:160px;overflow-y:auto;padding:8px 12px">
            ${i.slice(0,10).map(p=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(p.created_at).toLocaleString("vi")}</span>
                ${p.detail||p.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${n.length}/${m.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${n.map(p=>`
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

      ${h.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function x(){var h,m,n,i,l,p;(h=document.getElementById("btnCreate"))==null||h.addEventListener("click",async()=>{var k,w,L,E,S,P;const s=(w=(k=document.getElementById("guildName"))==null?void 0:k.value)==null?void 0:w.trim(),f=(E=(L=document.getElementById("guildTag"))==null?void 0:L.value)==null?void 0:E.trim(),T=(P=(S=document.getElementById("guildDesc"))==null?void 0:S.value)==null?void 0:P.trim();if(!s||!f)return d("Nhập tên và tag!","error");try{const I=await r.createGuild(g,s,f,T);d(I.message,"success"),t.player=I.player,$(),c.loaded=!1,await u()}catch(I){d(I.message,"error")}}),(m=document.getElementById("btnLoadGuilds"))==null||m.addEventListener("click",b),document.querySelectorAll(".btn-join").forEach(s=>{s.addEventListener("click",async()=>{try{const f=await r.joinGuild(g,parseInt(s.dataset.gid));d(f.message,"success"),c.loaded=!1,await u()}catch(f){d(f.message,"error")}})}),(n=document.getElementById("btnContribute"))==null||n.addEventListener("click",async()=>{var f;const s=parseInt(((f=document.getElementById("contributeAmt"))==null?void 0:f.value)||0);if(!(s<=0))try{const T=await r.contributeGuild(g,s);d(T.message,"success"),t.player=T.player,$(),await u()}catch(T){d(T.message,"error")}}),(i=document.getElementById("btnUpgradeGuild"))==null||i.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const s=await r.upgradeGuild(g);d(s.message,"success"),await u()}catch(s){d(s.message,"error")}}),(l=document.getElementById("btnPayUpkeep"))==null||l.addEventListener("click",async()=>{try{const s=await r.payGuildUpkeep(c.data.guild.id);d(s.message,"success"),await u()}catch(s){d(s.message,"error")}}),(p=document.getElementById("btnLeave"))==null||p.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const s=await r.leaveGuild(g);d(s.message,"success"),c.loaded=!1,await u()}catch(s){d(s.message,"error")}})}c.loaded?v():u()}function Ct(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e,g=t.playerId;t._profile||(t._profile={results:[],viewing:null,searchQuery:""});const c=t._profile;function u(){a.innerHTML=`
      <div class="page-header">
        <h2>🔍 Tìm Đạo Hữu</h2>
        <p class="page-sub">Tìm kiếm người chơi theo tên. Xem profile, tấn công hoặc kết bạn.</p>
      </div>

      <div class="panel" style="margin-bottom:12px">
        <div class="panel-body" style="padding:12px 16px;display:flex;gap:8px">
          <input type="text" id="searchInput" placeholder="Nhập tên người chơi..."
            value="${c.searchQuery}"
            style="flex:1;padding:8px 12px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
          <button class="btn btn--blue" id="btnSearch">🔍 Tìm</button>
        </div>
      </div>

      ${c.viewing?b(c.viewing):""}

      ${c.results.length>0&&!c.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${c.results.length})</div>
        <div class="panel-body no-pad">
          ${c.results.map(o=>`
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
      `:!c.viewing&&c.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,v()}function b(o){var n,i,l;const x=o.id===g,h=o.maxHp>0?Math.round(o.currentHp/o.maxHp*100):100,m={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((n=o.name[0])==null?void 0:n.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${o.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${o.level} · ${((i=o.realmInfo)==null?void 0:i.fullName)||"Phàm Nhân"}
                ${o.guild?` · <span style="color:var(--blue)">[${o.guild.tag}] ${o.guild.guild_name}</span>`:""}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${m[o.currentArea]||o.currentArea}
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
              <div style="height:100%;width:${h}%;background:${h>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(l=o.gold)==null?void 0:l.toLocaleString()} 💎</strong></div>

          ${x?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${o.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${o.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function v(){var o,x,h,m,n;(o=document.getElementById("btnSearch"))==null||o.addEventListener("click",y),(x=document.getElementById("searchInput"))==null||x.addEventListener("keydown",i=>{i.key==="Enter"&&y()}),document.querySelectorAll(".btn-view, [data-view]").forEach(i=>{i.addEventListener("click",async()=>{const l=i.dataset.vid||i.dataset.view;try{const p=await r.getPlayerProfile(l);c.viewing=p.profile,u()}catch(p){d(p.message,"error")}})}),(h=document.getElementById("btnAttack"))==null||h.addEventListener("click",async()=>{const i=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${c.viewing.name}?`))try{const l=await r.mugPlayer(g,i);d(l.message,l.won?"success":"error"),l.player&&(t.player=l.player,$())}catch(l){d(l.message,"error")}}),(m=document.getElementById("btnAddFriend"))==null||m.addEventListener("click",async()=>{const i=document.getElementById("btnAddFriend").dataset.tid;try{const l=await r.addFriend(g,i);d(l.message||"Đã gửi lời mời!","success")}catch(l){d(l.message,"error")}}),(n=document.getElementById("btnBackSearch"))==null||n.addEventListener("click",()=>{c.viewing=null,u()})}async function y(){var h;const o=document.getElementById("searchInput"),x=(h=o==null?void 0:o.value)==null?void 0:h.trim();if(!x||x.length<2)return d("Nhập ít nhất 2 ký tự!","error");c.searchQuery=x,c.viewing=null;try{const m=await r.searchPlayers(x);c.results=m.players||[],u()}catch(m){d(m.message,"error")}}u()}function Pt(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e,g=t.playerId;t._arena||(t._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const c=t._arena;async function u(){try{c.data=await r.getArena(g),c.loaded=!0,b()}catch(v){d(v.message,"error")}}function b(){var x,h,m,n;const v=c.data,y=(v==null?void 0:v.arena)||{},o=y.rating>=1500?"👑":y.rating>=1200?"⚔️":y.rating>=1e3?"🗡️":"🛡️";a.innerHTML=`
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với người chơi khác. ELO rating, phần thưởng theo rank.</p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">${o}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">ELO: ${y.rating||1e3}</div>
            <div style="font-size:12px;opacity:0.6">
              ${y.wins||0}W / ${y.losses||0}L · Streak: ${y.streak||0}
            </div>
          </div>
          <button class="btn btn--red btn--lg" id="btnFight" ${c.fighting?"disabled":""}>
            ⚔️ Đấu (${v.entryFee||50} 💎)
          </button>
        </div>
      </div>

      ${c.lastResult?`
      <div class="panel" style="margin-bottom:10px;border-left:3px solid ${c.lastResult.won?"var(--green)":"var(--red)"}">
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:700;color:${c.lastResult.won?"var(--green)":"var(--red)"}">
            ${c.lastResult.won?"🏆 CHIẾN THẮNG!":"💀 THẤT BẠI!"}
          </div>
          <div style="font-size:12px;margin-top:4px">
            Đối thủ: <strong>${(x=c.lastResult.opponent)==null?void 0:x.name}</strong> (Lv${(h=c.lastResult.opponent)==null?void 0:h.level}, ELO ${(m=c.lastResult.opponent)==null?void 0:m.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">ELO: ${c.lastResult.ratingChange>0?"+":""}${c.lastResult.ratingChange}</div>
          ${c.lastResult.combatLog?`<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div style="font-size:10px;opacity:0.5;margin-top:4px;max-height:150px;overflow:auto">${c.lastResult.combatLog.map(i=>`<div>${i}</div>`).join("")}</div>
          </details>`:""}
        </div>
      </div>
      `:""}

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(v.top10||[]).map((i,l)=>`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${l<3?"var(--gold)":"var(--text-dim)"}">#${l+1}</span>
                <span style="flex:1">${i.name}</span>
                <span style="color:var(--blue)">${i.rating} ELO</span>
                <span style="opacity:0.4;margin-left:6px">${i.wins}W/${i.losses}L</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(v.history||[]).map(i=>{const l=i.winner_id===g;return`<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${l?"var(--green)":"var(--red)"}">
                  ${l?"✅":"❌"} vs ${i.attacker_id===g?i.defender_name:i.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${i.rating_change>0?"+":""}${i.rating_change}</span>
              </div>`}).join("")}
          </div>
        </div>
      </div>
    `,(n=document.getElementById("btnFight"))==null||n.addEventListener("click",async()=>{c.fighting=!0,b();try{const i=await r.arenaFight(g);c.lastResult=i,t.player=i.player,$(),d(i.message,i.won?"success":"error"),c.fighting=!1,await u()}catch(i){d(i.message,"error"),c.fighting=!1,b()}})}c.loaded?b():u()}function It(a,e){const{state:t,api:r,notify:d,updateSidebar:$,renderGame:g}=e,c=t.playerId,u=t._auctionTab||"browse";async function b(){try{const[o,x]=await Promise.all([r.getAuctions(),r.getMyAuctions(c)]);t._auctionListings=o.listings||[],t._auctionMine=x.listings||[],v()}catch(o){d(o.message,"error")}}function v(){const o=t._auctionListings||[],x=t._auctionMine||[],h=(t.player.inventory||[]).filter(m=>m.slot&&m.slot!=="consumable");a.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${u==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${u==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${u==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${x.length})</button>
      </div>

      ${u==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${o.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':o.map(m=>{const n=JSON.parse(m.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${n.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${n.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${m.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${m.id}">💎 ${m.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:u==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${h.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${h.map(m=>`<option value="${m.id}">${m.name} [${m.rarity}]</option>`).join("")}
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
          ${x.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>':x.map(m=>`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${JSON.parse(m.item_data||"{}").name}</strong>
                  <span class="badge" style="margin-left:4px;background:${m.status==="active"?"var(--green)":m.status==="sold"?"var(--gold)":"var(--red)"}">${m.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${m.buyout_price}</div>
                </div>
                ${m.status==="active"?`<button class="btn btn--red btn--sm btn-cancel" data-lid="${m.id}">Hủy</button>`:""}
              </div>`).join("")}
        </div></div>
      `}
    `,y()}function y(){var o;a.querySelectorAll(".tab-btn").forEach(x=>x.addEventListener("click",()=>{t._auctionTab=x.dataset.tab,b()})),a.querySelectorAll(".btn-buy").forEach(x=>x.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const h=await r.buyAuction(c,parseInt(x.dataset.lid));d(h.message,"success"),t.player=h.player,$(),await b()}catch(h){d(h.message,"error")}})),a.querySelectorAll(".btn-cancel").forEach(x=>x.addEventListener("click",async()=>{try{const h=await r.cancelAuction(c,parseInt(x.dataset.lid));d(h.message,"success"),t.player=h.player,$(),await b()}catch(h){d(h.message,"error")}})),(o=document.getElementById("btnListItem"))==null||o.addEventListener("click",async()=>{var n,i,l;const x=(n=document.getElementById("selSellItem"))==null?void 0:n.value,h=parseInt(((i=document.getElementById("inpPrice"))==null?void 0:i.value)||"500"),m=parseInt(((l=document.getElementById("selDuration"))==null?void 0:l.value)||"24");try{const p=await r.listAuction(c,x,h,m);d(p.message,"success"),t.player=p.player,$(),t._auctionTab="mine",await b()}catch(p){d(p.message,"error")}})}b()}function Mt(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e,g=t.playerId;async function c(){try{const b=await r.getDailyQuests(g);t._dailyQuests=b,u()}catch(b){d(b.message,"error")}}function u(){const b=t._dailyQuests||{},v=b.quests||[];b.allCompleted;const y=b.bonusReward;a.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${v.map(o=>{const x=o.quest_info||{},h=o.target>0?Math.min(100,Math.round(o.progress/o.target*100)):0;return`
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
              <div style="height:100%;width:${h}%;background:${o.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
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
    `,a.querySelectorAll(".btn-claim").forEach(o=>o.addEventListener("click",async()=>{try{const x=await r.claimDailyQuest(g,parseInt(o.dataset.qid));d(x.message,"success"),t.player=x.player,$(),await c()}catch(x){d(x.message,"error")}}))}c()}function qt(a,e){const{state:t,api:r,notify:d,updateSidebar:$}=e,g=t.playerId;async function c(){try{t._worldBoss=await r.getWorldBoss(),u()}catch(b){d(b.message,"error")}}function u(){var m;const b=t._worldBoss||{},v=b.boss||{},y=b.hpPercent||0,o=b.topContributors||[],x=b.rewards||{},h=v.status==="active"&&v.current_hp>0;a.innerHTML=`
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${h?"🐉":"💀"}</div>
          <div style="font-size:18px;font-weight:700">${v.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${v.level||"?"} · ${h?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(v.current_hp||0).toLocaleString()} / ${(v.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${y}%;background:${y>50?"var(--red)":y>20?"var(--orange)":"var(--green)"};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${h?'<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${x.gold||0} · ✨ ${x.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${o.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':o.map((n,i)=>{var l;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${i<3?"var(--gold)":"var(--text-dim)"}">#${i+1}</span>
                <span style="flex:1">${n.name}</span>
                <span style="color:var(--red)">${(l=n.total_damage)==null?void 0:l.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${n.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(m=document.getElementById("btnAttackBoss"))==null||m.addEventListener("click",async()=>{const n=document.getElementById("btnAttackBoss");n.disabled=!0,n.textContent="⏳ Đang giao chiến...";const i=document.getElementById("bossCombatResult");try{const l=await r.attackWorldBoss(g);if(t.player=l.player,$(),l.log&&l.log.length>0){const p=l.log.map(k=>k.startsWith("---")?`<div class="turn">${k}</div>`:k.includes("hụt")?`<div class="miss">${k}</div>`:k.includes("né được")?`<div class="dodge">${k}</div>`:k.includes("CHÍNH MẠNG")||k.includes("💥")?`<div class="crit">${k}</div>`:k.includes("🔥")?`<div class="heavy text-orange">${k}</div>`:k.includes("chặn hoàn toàn")||k.includes("🛡")?`<div class="dodge">${k}</div>`:k.includes("ngã xuống")||k.includes("💀")?`<div class="death">${k}</div>`:k.includes("Chiến thắng")||k.includes("🏆")?`<div class="victory">${k}</div>`:k.includes("bỏ chạy")||k.includes("🏃")?`<div class="flee">${k}</div>`:k.includes("Bất phân")||k.includes("🤝")?`<div class="stalemate">${k}</div>`:k.includes("🧪")?`<div class="status-effect text-purple">${k}</div>`:k.includes("💔")?`<div class="dot-damage text-purple bold">${k}</div>`:k.includes("✨")?`<div class="regen text-green">${k}</div>`:`<div class="hit">${k}</div>`).join(""),s={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},f=s[l.outcome]||s.loss,T=Math.max(0,t.player.currentHp/t.player.maxHp*100);i.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${f.icon} ${f.text}
                <span class="subtitle">${l.turns}/${l.maxTurns||25} lượt · ⚔️ ${l.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${f.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${t.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${T}%"></div></div>
                    <div class="mini-hp-val">${t.player.currentHp}/${t.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${v.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(l.bossHp/l.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${l.bossHp.toLocaleString()}/${l.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${p}</div>
            </div>`}l.defeated?d(l.message,"success"):d(`⚔️ ${l.damage} dmg!`,"info"),await c()}catch(l){d(l.message,"error"),n.disabled=!1,n.textContent="⚔️ Tấn Công"}})}c()}function Ht(a,e){const{state:t,api:r,notify:d,updateSidebar:$,renderGame:g}=e,c=t.playerId,u={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function b(){var y;try{const[o,x]=await Promise.all([r.getGachaPools(),r.getGachaPity(c)]);t._gacha={pools:o.pools||{},pity:x.pity||{},results:((y=t._gacha)==null?void 0:y.results)||[]},v()}catch(o){d(o.message,"error")}}function v(){const y=t._gacha||{},o=y.pools||{},x=y.pity||{},h=y.results||[];a.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(o).map(([m,n])=>{var l,p,s;const i=x[m]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${m==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${n.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${u.legendary}">★ ${(l=n.rates)==null?void 0:l.legendary}%</span> ·
                <span style="color:${u.rare}">◆ ${(p=n.rates)==null?void 0:p.rare}%</span> ·
                <span style="color:${u.uncommon}">● ${(s=n.rates)==null?void 0:s.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${i.pulls_since_rare||0}/${n.pityRare} · Legend: ${i.pulls_since_legendary||0}/${n.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${m}" data-pulls="1">💎 ${n.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${m}" data-pulls="10">💎 ${n.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${h.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${h.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${h.map(m=>{var n,i,l,p;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${u[m.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((n=m.item)==null?void 0:n.slot)==="weapon"?"⚔️":((i=m.item)==null?void 0:i.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${u[m.rarity]}">${((l=m.item)==null?void 0:l.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${m.rarity}] ${(((p=m.item)==null?void 0:p.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,a.querySelectorAll(".btn-pull").forEach(m=>m.addEventListener("click",async()=>{const n=m.dataset.pool,i=parseInt(m.dataset.pulls);m.disabled=!0,m.textContent="⏳...";try{const l=await r.gachaPull(t.playerId,n,i);d(l.message,"success"),t.player=l.player,$(),t._gacha.results=l.results||[],t._gacha.pity[n]=l.pity,v()}catch(l){d(l.message,"error"),m.disabled=!1}}))}b()}function Nt(a,e){const{state:t,api:r,notify:d}=e,$=t._lbTab||"level";async function g(){try{t._lbData=await r.getLeaderboard($),c()}catch(u){d(u.message,"error")}}function c(){const b=(t._lbData||{}).rankings||[],v={level:"📊 Level",gold:"💰 Linh Thạch",pvp:"⚔️ PvP",guild:"🏯 Tông Môn"};a.innerHTML=`
      <div class="page-header">
        <h2>🏆 Bảng Xếp Hạng</h2>
        <p class="page-sub">Top 50 người chơi và guild.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        ${Object.entries(v).map(([y,o])=>`<button class="btn ${$===y?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="${y}">${o}</button>`).join("")}
      </div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${$==="guild"?b.map((y,o)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${o<3?"var(--gold)":"var(--text-dim)"}">#${o+1}</span>
              <span style="flex:1">
                <strong>[${y.tag}] ${y.name}</strong>
                <span style="opacity:0.4"> Lv${y.level}</span>
              </span>
              <span style="opacity:0.4">${y.members}/${y.max_members} 👤</span>
              <span style="color:var(--gold);margin-left:8px">💰 ${parseInt(y.treasury||0).toLocaleString()}</span>
            </div>
          `).join(""):$==="pvp"?b.map((y,o)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${o<3?"var(--gold)":"var(--text-dim)"}">#${o+1}</span>
              <span style="flex:1"><strong>${y.name}</strong> <span style="opacity:0.4">Lv${y.level}</span></span>
              <span style="color:var(--blue)">${y.rating} ELO</span>
              <span style="opacity:0.4;margin-left:6px">${y.wins}W/${y.losses}L</span>
            </div>
          `).join(""):b.map((y,o)=>`
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${o<3?"var(--gold)":"var(--text-dim)"}">#${o+1}</span>
              <span style="flex:1"><strong>${y.name}</strong></span>
              ${$==="level"?`<span>Lv${y.level}</span>`:""}
              <span style="color:var(--gold);margin-left:8px">💎 ${parseInt(y.gold||0).toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,a.querySelectorAll(".tab-btn").forEach(y=>y.addEventListener("click",()=>{t._lbTab=y.dataset.tab,g()}))}g()}const C={playerId:null,player:null,currentPage:"combat",monsters:[],skills:[],items:[]},nt=document.getElementById("app"),J={get state(){return C},api:q,notify:z,renderGame:H,updateSidebar:jt};async function _t(){const a=localStorage.getItem("playerId");if(a&&!C.playerId)try{const e=await q.getPlayer(a);C.playerId=a,C.player=e.player,await V(),H();return}catch{localStorage.removeItem("playerId")}C.playerId?H():st()}function st(){var e,t;const a=C.authTab||"login";nt.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(r=>{r.addEventListener("click",()=>{C.authTab=r.dataset.auth,st()})}),(e=document.getElementById("btnLogin"))==null||e.addEventListener("click",async()=>{const r=document.getElementById("inpUsername").value.trim(),d=document.getElementById("inpPassword").value;if(!r||!d)return z("Vui lòng nhập đầy đủ","error");try{const $=await q.login(r,d);C.playerId=$.id,C.player=$.player,localStorage.setItem("playerId",$.id),z($.message,"success"),await V(),H()}catch($){z($.message||"Đăng nhập thất bại!","error")}}),(t=document.getElementById("btnRegister"))==null||t.addEventListener("click",async()=>{var c,u;const r=document.getElementById("inpUsername").value.trim(),d=document.getElementById("inpPassword").value,$=((c=document.getElementById("inpName"))==null?void 0:c.value.trim())||"Vô Danh",g=((u=document.querySelector('input[name="gender"]:checked'))==null?void 0:u.value)||"male";if(!r||!d)return z("Vui lòng nhập đầy đủ","error");try{const b=await q.register(r,d,$,g);C.playerId=b.id,C.player=b.player,localStorage.setItem("playerId",b.id),z(b.message,"success"),await V(),H()}catch(b){z(b.message||"Đăng ký thất bại!","error")}})}function it(a){const e=Math.floor(Date.now()/1e3),t=[];return a.hospitalUntil&&a.hospitalUntil>e&&t.push({icon:"🏥",label:"Tịnh dưỡng",endTime:a.hospitalUntil,color:"var(--red)"}),a.medCooldownUntil&&a.medCooldownUntil>e&&t.push({icon:"💊",label:"Đan độc",endTime:a.medCooldownUntil,color:"var(--orange)"}),a.jailUntil&&a.jailUntil>e&&t.push({icon:"⛓️",label:"Ngục tù",endTime:a.jailUntil,color:"var(--purple)"}),a.travelArrivesAt&&a.travelArrivesAt>e&&t.push({icon:"🚶",label:"Di chuyển",endTime:a.travelArrivesAt,color:"var(--blue)"}),t.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${t.map(r=>{const d=Math.max(0,r.endTime-e),$=Math.floor(d/60),g=d%60,c=$>0?`${$}p${String(g).padStart(2,"0")}s`:`${g}s`;return`<span class="status-icon" data-end="${r.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${r.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${r.color};white-space:nowrap;
      " title="${r.label}">${r.icon} <span class="cd-time">${c}</span></span>`}).join("")}
  </div>`}let A=null;function Bt(){A&&clearInterval(A),A=setInterval(()=>{const a=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(e=>{const t=parseInt(e.dataset.end),r=Math.max(0,t-a);if(r<=0){e.remove();return}const d=Math.floor(r/60),$=r%60,g=e.querySelector(".cd-time");g&&(g.textContent=d>0?`${d}p${String($).padStart(2,"0")}s`:`${$}s`)}),document.querySelectorAll(".status-effects").forEach(e=>{e.children.length===0&&e.remove()})},1e3)}function rt(a){let e="";const r={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"}}[a.currentArea];return r&&(e+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${r.tooltip}">${r.icon} Cảnh Vực</span>`),a.combatBuffs&&a.combatBuffs.length>0&&a.combatBuffs.forEach(d=>{let $="💊",g="Buff";d.type==="status"&&d.stat==="poison"?($="☠️",g="Trúng Độc"):d.type==="status"&&d.stat==="confuse"?($="👹",g="Ma Hóa"):d.stat==="allStats"||d.stat==="hp"||d.stat==="damage"?($="🔥",g="Cuồng Nộ"):d.stat==="defense"||d.stat==="resist"?($="🛡️",g="Kiên Cố"):d.stat==="speed"||d.stat==="dexterity"?($="💨",g="Thân Pháp"):($="✨",g="Cường Hóa");let c=d.duration?` (-${d.duration} Trận)`:"",u=`Hiệu ứng: ${d.stat} (${d.type} ${d.value})${d.duration?` - Còn lại: ${d.duration} Trận đấu`:""}`;e+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${u}">${$} ${g}${c}</span>`}),e?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${e}</div>`:""}function H(){var y,o,x,h,m,n,i,l,p;const a=C.player;if(!a)return;const e=Math.max(0,a.currentHp/a.maxHp*100),t=a.maxStamina>0?Math.max(0,a.currentStamina/a.maxStamina*100):0,r=a.maxEnergy>0?Math.max(0,a.currentEnergy/a.maxEnergy*100):0,d=(a.maxNerve??15)>0?Math.max(0,(a.nerve??0)/(a.maxNerve??15)*100):0,$=C.exploration?C.exploration[a.currentArea||"thanh_lam_tran"]:null,g=$?$.name:"Khám Phá";nt.innerHTML=`
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
          <div class="player-meta">Lv.${a.level} · ${((y=a.realmInfo)==null?void 0:y.fullName)||"?"}</div>
          ${it(a)}
          ${rt(a)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${a.currentHp}/${a.maxHp}
                ${a.currentHp<a.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(o=a.skills)!=null&&o.some(s=>s.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${e}%" data-low="${e<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${a.currentStamina??100}/${a.maxStamina??100}
                ${(a.currentStamina??100)<(a.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((x=a.stats)==null?void 0:x.staminaRegen)??10}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${t}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${a.currentEnergy}/${a.maxEnergy}
                ${a.currentEnergy<a.maxEnergy?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((h=a.stats)==null?void 0:h.energyRegen)??5}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${r}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${a.nerve??0}/${a.maxNerve??15}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${d}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:12px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:8px">💎 ${a.gold??0} Linh Thạch</div>
            <div style="display:flex; gap:6px; width:100%">
              <button class="btn btn--dark nav-item ${C.currentPage==="events"?"active":""}" data-page="events" style="flex:1; padding:6px; font-size:14px; position:relative" title="Sự Kiện">
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
          <li class="nav-item ${C.currentPage==="stats"?"active":""}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${(n=(m=C.player)==null?void 0:m.realmInfo)!=null&&n.canBreakthrough?'<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="inventory"?"active":""}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(a.medCooldownRemaining??0)>0?'<span class="badge" style="background:var(--orange)">⏳</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="skills"?"active":""}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>
          <li class="nav-item ${C.currentPage==="education"?"active":""}" data-page="education">
            <span class="icon">🧘</span> Tu Luyện
          </li>



          <li class="nav-section">HÀNH TRÌNH</li>
          <li class="nav-item ${C.currentPage==="travel"?"active":""}" data-page="travel">
            <span class="icon">🚶</span> Ngao Du
            ${(a.travelRemaining??0)>0?'<span class="badge" style="background:var(--blue)">⏳</span>':""}
          </li>
          <li class="nav-item ${C.currentPage==="combat"?"active":""}" data-page="combat">
            <span class="icon">🔍</span> Khám Phá (${g})
          </li>
          <li class="nav-item ${C.currentPage==="quests"?"active":""}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(a.activeQuests||[]).filter(s=>s.status==="active").length>0?`<span class="badge" style="background:var(--purple)">${(a.activeQuests||[]).filter(s=>s.status==="active").length}</span>`:""}
          </li>
          <li class="nav-item ${C.currentPage==="crimes"?"active":""}" data-page="crimes">
            <span class="icon">💀</span> Ác Nghiệp
          </li>




          <li class="nav-section">THẾ GIỚI</li>
          <li class="nav-item ${C.currentPage==="housing"?"active":""}" data-page="housing">
            <span class="icon">🏠</span> Động Phủ
          </li>
          <li class="nav-item ${C.currentPage==="market"?"active":""}" data-page="market">
            <span class="icon">🏪</span> Giao Dịch Đài
          </li>
          <li class="nav-item ${C.currentPage==="npcshop"?"active":""}" data-page="npcshop">
            <span class="icon">🧓</span> Thương Nhân
          </li>
          <li class="nav-item ${C.currentPage==="guild"?"active":""}" data-page="guild">
            <span class="icon">🏯</span> Tông Môn
          </li>
          <li class="nav-item ${C.currentPage==="alchemy"?"active":""}" data-page="alchemy">
            <span class="icon">⚒️</span> Chế Tác
          </li>
          <li class="nav-item ${C.currentPage==="library"?"active":""}" data-page="library">
            <span class="icon">📚</span> Tàng Kinh Các
          </li>
          <li class="nav-item ${C.currentPage==="wiki"?"active":""}" data-page="wiki">
            <span class="icon">📜</span> Wiki
          </li>
          <li class="nav-item ${C.currentPage==="leaderboard"?"active":""}" data-page="leaderboard">
            <span class="icon">🏆</span> Xếp Hạng
          </li>

          <li class="nav-section">CHIẾN ĐẤU</li>
          <li class="nav-item ${C.currentPage==="arena"?"active":""}" data-page="arena">
            <span class="icon">⚔️</span> Đấu Trường
          </li>
          <li class="nav-item ${C.currentPage==="worldboss"?"active":""}" data-page="worldboss">
            <span class="icon">🐉</span> Boss TG
          </li>

          <li class="nav-section">KINH TẾ</li>
          <li class="nav-item ${C.currentPage==="auction"?"active":""}" data-page="auction">
            <span class="icon">🏪</span> Đấu Giá
          </li>
          <li class="nav-item ${C.currentPage==="gacha"?"active":""}" data-page="gacha">
            <span class="icon">🎰</span> Thiên Cơ Đài
          </li>
          <li class="nav-item ${C.currentPage==="dailyquest"?"active":""}" data-page="dailyquest">
            <span class="icon">📋</span> Nhật Nhiệm
          </li>

          ${a.role==="admin"?`
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(s=>{s.addEventListener("click",()=>{C.currentPage=s.dataset.page,H()})}),(i=document.getElementById("btnFabChat"))==null||i.addEventListener("click",()=>D("chat")),(l=document.getElementById("btnFabSocial"))==null||l.addEventListener("click",()=>D("social"));const c=document.querySelector('.sidebar-gold .nav-item[data-page="events"]');c&&c.addEventListener("click",s=>{s.stopPropagation(),C.currentPage="events",C.popupOpen=!1,H()}),(p=document.getElementById("btnPopupClose"))==null||p.addEventListener("click",()=>{C.popupOpen=!1,H()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(s=>{s.addEventListener("click",()=>D(s.dataset.popup))}),Gt(),C.popupOpen&&zt();const u=document.getElementById("searchPlayerInput"),b=document.getElementById("searchResults");let v=null;u&&b&&(u.addEventListener("input",()=>{clearTimeout(v);const s=u.value.trim();if(s.length<2){b.style.display="none";return}v=setTimeout(async()=>{try{const f=await q.searchPlayers(s),T=f.players||f.results||[];T.length===0?b.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':b.innerHTML=T.map(k=>{var w;return`
              <div class="search-result" data-pid="${k.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${k.name} <span style="opacity:0.4">Lv.${k.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((w=k.realmInfo)==null?void 0:w.name)||""}</span>
              </div>
            `}).join(""),b.style.display="block",b.querySelectorAll(".search-result").forEach(k=>{k.addEventListener("click",()=>{C.currentPage="profile",C._viewProfileId=k.dataset.pid,b.style.display="none",u.value="",H()}),k.addEventListener("mouseenter",()=>k.style.background="rgba(255,255,255,0.08)"),k.addEventListener("mouseleave",()=>k.style.background="transparent")})}catch{b.style.display="none"}},300)}),u.addEventListener("blur",()=>{setTimeout(()=>{b.style.display="none"},200)}),u.addEventListener("keydown",s=>{s.key==="Escape"&&(b.style.display="none",u.blur())})),Bt()}function D(a){C.popupOpen=!0,C.popupPage=a,H()}function zt(){const a=document.getElementById("popupContent");a&&(C.popupPage==="chat"?at(a,J):C.popupPage==="social"&&et(a,J))}const Ot={combat:ct,crimes:yt,education:ht,stats:ut,skills:Y,inventory:K,travel:tt,alchemy:F,quests:bt,admin:xt,social:et,chat:at,market:ft,realm:$t,events:Tt,dungeon:Z,housing:wt,wiki:Lt,npcshop:St,guild:Et,library:X,profile:Ct,arena:Pt,auction:It,dailyquest:Mt,worldboss:qt,gacha:Ht,leaderboard:Nt};function Gt(){const a=document.getElementById("pageContent");if(!a)return;const e=Ot[C.currentPage];e&&e(a,J)}function jt(){var $,g,c,u,b;const a=C.player;if(!a)return;const e=Math.max(0,a.currentHp/a.maxHp*100),t=a.maxEnergy>0?Math.max(0,a.currentEnergy/a.maxEnergy*100):0,r=document.querySelector(".sidebar-player");if(r){const v=a.maxStamina>0?Math.max(0,a.currentStamina/a.maxStamina*100):0,y=(a.maxNerve??15)>0?Math.max(0,(a.nerve??0)/(a.maxNerve??15)*100):0;r.innerHTML=`
      <div class="player-name">${a.name}</div>
      <div class="player-meta">Lv.${a.level} · ${(($=a.realmInfo)==null?void 0:$.fullName)||"?"}</div>
      ${it(a)}
      ${rt(a)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${a.currentHp}/${a.maxHp}
            ${a.currentHp<a.maxHp?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${(g=a.skills)!=null&&g.some(o=>o.id==="toa_thien")?"+1%/10s":"(Không tự hồi)"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${e}%" data-low="${e<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${a.currentStamina??100}/${a.maxStamina??100}
            ${(a.currentStamina??100)<(a.maxStamina??100)?`<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${((c=a.stats)==null?void 0:c.staminaRegen)??10}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${v}%"></div></div>
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
      <div class="sidebar-gold">💎 ${a.gold??0} Linh Thạch</div>`}const d=document.querySelector('.nav-item[data-page="stats"]');if(d){let v="";a.statPoints>0&&(v+=`<span class="badge">${a.statPoints}</span>`),(b=a.realmInfo)!=null&&b.canBreakthrough&&(v+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),d.querySelectorAll(".badge").forEach(y=>y.remove()),d.insertAdjacentHTML("beforeend",v)}}async function V(){try{const[a,e,t,r,d,$]=await Promise.all([q.getMonsters(),q.getSkills(),q.getItems(),q.getMedicines(),q.getCrimes(),q.getEducation()]);C.monsters=a.monsters||[],C.skills=e.skills||[],C.items=t.items||[],C.medicines=r.medicines||[],C.crimes=d.crimes||[],C.educationTrees=$.trees||[],C.exploration=await q.getExploration(),C.recipes=(await q.getRecipes()).recipes,C.npcs=(await q.getNpcs()).npcs||[]}catch(a){console.error("Lỗi tải dữ liệu:",a)}}function z(a,e="info"){var r;(r=document.querySelector(".notification"))==null||r.remove();const t=document.createElement("div");t.className=`notification ${e}`,t.textContent=a,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},3e3)}_t();
//# sourceMappingURL=index-CVoUZu2X.js.map
