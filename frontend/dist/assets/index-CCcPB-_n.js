(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();const se="/api";class re{async request(t,e={}){try{const a=await fetch(`${se}${t}`,{headers:{"Content-Type":"application/json",...e.headers},...e}),n=await a.json();if(!a.ok)throw new Error(n.error||`HTTP ${a.status}`);return n}catch(a){throw console.error(`API Error [${t}]:`,a),a}}register(t,e,a,n){return this.request("/auth/register",{method:"POST",body:JSON.stringify({username:t,password:e,name:a,gender:n})})}login(t,e){return this.request("/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e})})}createPlayer(t,e){return this.request("/player/create",{method:"POST",body:JSON.stringify({name:t,gender:e})})}getPlayer(t){return this.request(`/player/${t}`)}allocateStat(t,e,a=1){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e,points:a})})}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}learnSkill(t,e){return this.request(`/player/${t}/learn-skill`,{method:"POST",body:JSON.stringify({skillId:e})})}equipSkill(t,e,a=!0){return this.request(`/player/${t}/equip-skill`,{method:"POST",body:JSON.stringify({skillId:e,equip:a})})}toggleAura(t,e){return this.request(`/player/${t}/skills/toggle-aura`,{method:"POST",body:JSON.stringify({auraId:e})})}healPlayer(t){return this.request(`/player/${t}/heal`,{method:"POST"})}getMultiplayerState(t){return this.request(`/player/${t}/multiplayer-state`)}claimEscrow(t){return this.request(`/player/${t}/claim-escrow`,{method:"POST"})}healTrauma(t,e="tieu_hoan_dan"){return this.request(`/player/${t}/heal`,{method:"POST",body:JSON.stringify({pill_id:e})})}payBail(t){return this.request(`/player/${t}/bail`,{method:"POST"})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}trainStat(t,e){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e})})}fullCombat(t,e=null){return this.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:t,monsterId:e})})}getMonsters(){return this.request("/data/monsters")}getSkills(){return this.request("/data/skills")}getItems(){return this.request("/data/items")}getMedicines(){return this.request("/data/medicines")}getEducation(){return this.request("/data/education")}getExploration(){return this.request("/data/exploration")}getRecipes(){return this.request("/recipes")}equipItem(t,e){return this.request(`/player/${t}/equip`,{method:"POST",body:JSON.stringify({itemId:e})})}useItem(t,e){return this.request(`/player/${t}/use`,{method:"POST",body:JSON.stringify({itemId:e})})}useMedicine(t,e){return this.request(`/player/${t}/use-medicine`,{method:"POST",body:JSON.stringify({medicineId:e})})}generateItem(t,e){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:e,playerId:t})})}trainStat(t,e,a=1){return this.request(`/player/${t}/train`,{method:"POST",body:JSON.stringify({stat:e,count:a})})}allocateStat(t,e){return this.request(`/player/${t}/allocate`,{method:"POST",body:JSON.stringify({stat:e})})}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getRealm(t){return this.request(`/player/${t}/realm`)}craftItem(t,e){return this.request(`/player/${t}/craft`,{method:"POST",body:JSON.stringify({recipeId:e})})}getCraftingMastery(t){return this.request(`/player/${t}/crafting-mastery`)}getMonsterMastery(t){return this.request(`/player/${t}/monster-mastery`)}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,a,n=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:a,lockAffixIndex:n})})}getForgingRecipes(){return this.request("/forging/recipes")}forgeItem(t,e){return this.request(`/player/${t}/forge`,{method:"POST",body:JSON.stringify({recipeId:e})})}getEnhancePreview(t,e){return this.request(`/player/${t}/enhance-preview?itemId=${encodeURIComponent(e)}`)}enhanceItem(t,e){return this.request(`/player/${t}/enhance`,{method:"POST",body:JSON.stringify({itemId:e})})}enrollNode(t,e,a){return this.request(`/player/${t}/enroll`,{method:"POST",body:JSON.stringify({nodeId:e,treeId:a})})}checkEducation(t){return this.request(`/player/${t}/check-education`,{method:"POST"})}generateItem(t="common",e=null){return this.request("/items/generate",{method:"POST",body:JSON.stringify({rarity:t,slot:e})})}explore(t){return this.request(`/player/${t}/explore`,{method:"POST"})}trackMonster(t,e){return this.request(`/player/${t}/track-monster`,{method:"POST",body:JSON.stringify({monsterId:e})})}getAreaMonsters(t){return this.request(`/player/${t}/area-monsters`)}getNpc(t){return this.request(`/npc/${t}`)}getNpcs(){return this.request("/data/npcs")}acceptQuest(t,e,a){return this.request(`/player/${t}/accept-quest`,{method:"POST",body:JSON.stringify({npcId:e,questId:a})})}completeQuest(t,e){return this.request(`/player/${t}/complete-quest`,{method:"POST",body:JSON.stringify({questId:e})})}getQuests(t){return this.request(`/player/${t}/quests`)}searchPlayers(t){return this.request(`/players/search?q=${encodeURIComponent(t)}`)}getRelationships(t){return this.request(`/player/${t}/relationships`)}interactPlayer(t,e,a,n){return this.request(`/player/${t}/interact`,{method:"POST",body:JSON.stringify({targetId:e,action:a,amount:n})})}addFriend(t,e){return this.request(`/player/${t}/add-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}acceptFriend(t,e){return this.request(`/player/${t}/accept-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}rejectFriend(t,e){return this.request(`/player/${t}/reject-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}removeFriend(t,e){return this.request(`/player/${t}/remove-friend`,{method:"POST",body:JSON.stringify({targetId:e})})}addEnemy(t,e){return this.request(`/player/${t}/add-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}removeEnemy(t,e){return this.request(`/player/${t}/remove-enemy`,{method:"POST",body:JSON.stringify({targetId:e})})}getGlobalChat(t=0){return this.request(`/chat/global?afterId=${t}`)}getPrivateChat(t,e,a=0){return this.request(`/chat/private/${t}?with=${e}&afterId=${a}`)}getChatFriends(t){return this.request(`/chat/friends/${t}`)}sendChat(t,e,a,n){return this.request("/chat/send",{method:"POST",body:JSON.stringify({senderId:t,channel:e,receiverId:a,message:n})})}getMarketListings(t="",e="newest"){const a=new URLSearchParams;return t&&a.set("type",t),e&&a.set("sort",e),this.request(`/market?${a.toString()}`)}getMyListings(t){return this.request(`/market/my/${t}`)}listForSale(t,e,a,n,s){return this.request("/market/list",{method:"POST",body:JSON.stringify({sellerId:t,itemType:e,itemId:a,quantity:n,price:s})})}buyFromMarket(t,e,a=1){return this.request("/market/buy",{method:"POST",body:JSON.stringify({buyerId:t,listingId:e,quantity:a})})}cancelListing(t,e){return this.request("/market/cancel",{method:"POST",body:JSON.stringify({sellerId:t,listingId:e})})}getRealmInfo(t){return this.request(`/player/${t}/realm`)}getTribulationPreview(t){return this.request(`/player/${t}/tribulation-preview`)}attemptBreakthrough(t){return this.request(`/player/${t}/breakthrough`,{method:"POST"})}getAllRealms(){return this.request("/data/realms")}getMugTargets(t){return this.request(`/player/${t}/mug-targets`)}mugPlayer(t,e){return this.request(`/player/${t}/mug`,{method:"POST",body:JSON.stringify({victimId:e})})}resolveMugAction(t,e,a=null){return this.request(`/player/${t}/mug-action`,{method:"POST",body:JSON.stringify({action:e,sessionId:a})})}initiatePvP(t,e){return this.request(`/player/${t}/pvp/attack`,{method:"POST",body:JSON.stringify({target_id:e})})}resolvePvPAction(t,e,a){return this.request(`/player/${t}/pvp/action`,{method:"POST",body:JSON.stringify({session_id:e,action:a})})}getPvPSession(t){return this.request(`/pvp/session/${t}`)}getMugLog(t){return this.request(`/player/${t}/mug-log`)}getMapItems(t){return this.request(`/player/${t}/map-items`)}enterDungeon(t,e){return this.request(`/player/${t}/dungeon/enter`,{method:"POST",body:JSON.stringify({mapItemId:e})})}enterDiscoveredDungeon(t,e){return this.request(`/player/${t}/dungeon/enter-discovered`,{method:"POST",body:JSON.stringify({discoveredId:e})})}fightDungeonWave(t){return this.request(`/player/${t}/dungeon/fight`,{method:"POST"})}abandonDungeon(t){return this.request(`/player/${t}/dungeon/abandon`,{method:"POST"})}getDungeonHistory(t){return this.request(`/player/${t}/dungeon/history`)}getHousing(t){return this.request(`/player/${t}/housing`)}buyHousing(t){return this.request(`/player/${t}/housing/buy`,{method:"POST"})}plantHerb(t,e,a){return this.request(`/player/${t}/housing/plant`,{method:"POST",body:JSON.stringify({herbId:e,slotIndex:a})})}harvestGarden(t){return this.request(`/player/${t}/housing/harvest`,{method:"POST"})}upgradeFormation(t,e){return this.request(`/player/${t}/housing/formation`,{method:"POST",body:JSON.stringify({formationId:e})})}payMaintenance(t){return this.request(`/player/${t}/housing/maintenance`,{method:"POST"})}listForRent(t,e){return this.request(`/player/${t}/housing/rent/list`,{method:"POST",body:JSON.stringify({pricePerDay:e})})}getRentals(){return this.request("/housing/rentals")}rentRoom(t,e){return this.request(`/player/${t}/housing/rent/take`,{method:"POST",body:JSON.stringify({rentalId:e})})}getMyGuild(t){return this.request(`/player/${t}/guild`)}createGuild(t,e,a,n){return this.request(`/player/${t}/guild/create`,{method:"POST",body:JSON.stringify({name:e,tag:a,description:n})})}contributeGuild(t,e){return this.request(`/player/${t}/guild/contribute`,{method:"POST",body:JSON.stringify({amount:e})})}upgradeGuild(t){return this.request(`/player/${t}/guild/upgrade`,{method:"POST"})}joinGuild(t,e){return this.request(`/player/${t}/guild/join`,{method:"POST",body:JSON.stringify({guildId:e})})}leaveGuild(t){return this.request(`/player/${t}/guild/leave`,{method:"POST"})}listGuilds(){return this.request("/guilds")}payGuildUpkeep(t){return this.request(`/guild/${t}/upkeep`,{method:"POST"})}getTribulation(t){return this.request(`/player/${t}/tribulation`)}fightTribulation(t){return this.request(`/player/${t}/tribulation/fight`,{method:"POST"})}getCurrencies(){return this.request("/crafting/currencies")}applyCurrency(t,e,a,n=-1){return this.request(`/player/${t}/crafting/apply`,{method:"POST",body:JSON.stringify({currencyId:e,itemId:a,lockAffixIndex:n})})}getShops(t){return this.request("/shops")}buyFromShop(t,e,a,n=1){return this.request(`/player/${t}/shop/buy`,{method:"POST",body:JSON.stringify({shopId:e,itemId:a,quantity:n})})}getMarketTax(){return this.request("/market/tax")}searchPlayers(t){return this.request(`/players/lookup?q=${encodeURIComponent(t)}`)}getPlayerProfile(t){return this.request(`/player/${t}/profile`)}getArena(t){return this.request(`/player/${t}/arena`)}arenaFight(t){return this.request(`/player/${t}/arena/fight`,{method:"POST"})}getAuctions(t=""){return this.request(`/auction${t?"?q="+encodeURIComponent(t):""}`)}getMyAuctions(t){return this.request(`/player/${t}/auction/mine`)}listAuction(t,e,a,n=24){return this.request(`/player/${t}/auction/list`,{method:"POST",body:JSON.stringify({itemId:e,buyoutPrice:a,durationHours:n})})}buyAuction(t,e){return this.request(`/player/${t}/auction/buy`,{method:"POST",body:JSON.stringify({listingId:e})})}cancelAuction(t,e){return this.request(`/player/${t}/auction/cancel`,{method:"POST",body:JSON.stringify({listingId:e})})}getDailyQuests(t){return this.request(`/player/${t}/daily-quests`)}claimDailyQuest(t,e){return this.request(`/player/${t}/daily-quests/claim`,{method:"POST",body:JSON.stringify({questId:e})})}getWorldBoss(){return this.request("/world-boss")}attackWorldBoss(t){return this.request(`/player/${t}/world-boss/attack`,{method:"POST"})}getGachaPools(){return this.request("/gacha/pools")}getGachaPity(t){return this.request(`/player/${t}/gacha/pity`)}gachaPull(t,e,a=1){return this.request(`/player/${t}/gacha/pull`,{method:"POST",body:JSON.stringify({poolId:e,pulls:a})})}getLeaderboard(t){return this.request(`/leaderboard/${t}`)}getActiveEvents(){return this.request("/events/active")}quickEvent(t){return this.request(`/events/quick/${t}`,{method:"POST"})}getGlitches(t){return this.request(`/player/${t}/glitches`)}setStance(t,e){return this.request(`/player/${t}/stance`,{method:"POST",body:JSON.stringify({stance:e})})}overrideTribulation(t){return this.request(`/player/${t}/glitch/override-tribulation`,{method:"POST"})}}const R=new re;class M{constructor(t={}){this.props=t,this.state=this.initialState?this.initialState():{},this.el=null,this._eventListeners=[],this._activeIntervals=[],this._activeTimeouts=[],this._isMounted=!1}initialState(){return{}}setState(t){const e=typeof t=="function"?t(this.state):t;this.state={...this.state,...e},this._isMounted&&this.update()}template(){return""}mount(t){t&&(this.container=t,this.render(),this._isMounted=!0,this.onMounted())}render(){this.cleanupListeners();const t=this.template();this.container&&(this.container.innerHTML=t,this.el=this.container,this.bindEvents())}update(){this.render(),this.onUpdated()}on(t,e,a){if(!this.container)return;const n=s=>{const o=s.target.closest(e);o&&this.container.contains(o)&&a.call(this,s,o)};this.container.addEventListener(t,n),this._eventListeners.push({eventName:t,listener:n})}setInterval(t,e){const a=window.setInterval(t,e);return this._activeIntervals.push(a),a}setTimeout(t,e){const a=window.setTimeout(t,e);return this._activeTimeouts.push(a),a}cleanupListeners(){this.container&&this._eventListeners.forEach(({eventName:t,listener:e})=>{this.container.removeEventListener(t,e)}),this._eventListeners=[]}unmount(){this._isMounted=!1,this.cleanupListeners(),this._activeIntervals.forEach(t=>window.clearInterval(t)),this._activeIntervals=[],this._activeTimeouts.forEach(t=>window.clearTimeout(t)),this._activeTimeouts=[],this.onUnmounted()}onMounted(){}onUpdated(){}onUnmounted(){}bindEvents(){}}const wt={win:{icon:"🏆",text:"Chiến Thắng",cls:"win",color:"var(--green, #4ade80)"},loss:{icon:"💀",text:"Trọng Thương Bại Trận",cls:"lose",color:"var(--red, #f87171)"},stalemate:{icon:"⏰",text:"Bất Phân Thắng Bại",cls:"draw",color:"var(--orange, #fb923c)"},flee:{icon:"🏃",text:"Thoát Thân Thành Công",cls:"flee",color:"var(--blue, #60a5fa)"}},oe={breaker:{name:"Thế Phá Quy",color:"#ef4444",icon:"⚡"},flow:{name:"Thế Du Đạo",color:"#06b6d4",icon:"🌀"},glitch:{name:"Thế Nghịch Hành",color:"#a855f7",icon:"🌌"}};function de(i="breaker"){return oe[i]||{name:"Bình Thường",color:"#888",icon:"⚔️"}}function kt(i,t,e="normal"){if(!i)return;const a=document.createElement("div");a.className=`floating-damage damage-${e}`,a.textContent=t,i.appendChild(a),setTimeout(()=>a.remove(),1100)}function It(i=[]){return(i||[]).map(t=>t.startsWith("---")?`<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${t}</div>`:t.includes("PHÁT HIỆN LỖI THIÊN ĐẠO")||t.includes("🌌 [PHÁT HIỆN")?`<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${t}</div>`:t.includes("VẾT NỨT THIÊN ĐẠO")||t.includes("Khai thác Lỗi")?`<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${t}</div>`:t.includes("Thế Du Đạo")||t.includes("nương theo kẽ hở")?`<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${t}</div>`:t.includes("Kim Thân Bất Diệt")?`<div class="undying-proc" style="color:#fde047;font-weight:600">${t}</div>`:t.includes("Kích Hoạt")||t.includes("Xuất chiêu")?`<div class="skill-proc" style="color:#38bdf8;font-weight:700;background:rgba(56,189,248,0.12);padding:3px 8px;border-radius:4px;margin:2px 0;border-left:3px solid #38bdf8;">${t}</div>`:t.includes("thường công")?`<div class="normal-attack" style="color:var(--text-dim);font-style:italic;margin:2px 0;">${t}</div>`:t.includes("linh lực")&&t.includes("+")?`<div class="energy" style="color:var(--cyan, #06b6d4)">${t}</div>`:t.includes("linh lực")?`<div class="energy-cost" style="color:var(--blue, #3b82f6)">${t}</div>`:t.includes("hụt")?`<div class="miss" style="color:var(--text-dim)">${t}</div>`:t.includes("né được")?`<div class="dodge" style="color:var(--blue, #3b82f6)">${t}</div>`:t.includes("CHÍNH MẠNG")||t.includes("💥")?`<div class="crit" style="color:var(--gold, #facc15);font-weight:bold">${t}</div>`:t.includes("ngã xuống")||t.includes("💀")?`<div class="death" style="color:var(--red, #ef4444);font-weight:bold">${t}</div>`:t.includes("Chiến thắng")||t.includes("🏆")?`<div class="victory" style="color:var(--green, #22c55e);font-weight:bold">${t}</div>`:t.includes("Đột phá")||t.includes("🎉")?`<div class="levelup" style="color:var(--gold, #facc15);font-weight:bold">${t}</div>`:t.includes("bỏ chạy")||t.includes("🏃")?`<div class="flee" style="color:var(--orange, #f97316)">${t}</div>`:t.includes("Hết")||t.includes("⏰")?`<div class="stalemate" style="color:var(--orange, #f97316)">${t}</div>`:t.includes("Linh Thạch")||t.includes("💰")?`<div class="gold-reward" style="color:var(--gold, #facc15)">${t}</div>`:t.includes("Tịnh dưỡng")||t.includes("🏥")?`<div class="hospital" style="color:var(--red, #ef4444)">${t}</div>`:t.includes("🧪")?`<div class="status-effect text-purple">${t}</div>`:t.includes("✨")?`<div class="regen text-green">${t}</div>`:`<div class="hit">${t}</div>`).join("")}class le extends M{template(){var v,l,u,x,g;const{ctx:t}=this.props,e=((v=t==null?void 0:t.state)==null?void 0:v.player)||{},a=(l=t==null?void 0:t.state)!=null&&l.exploration?t.state.exploration[e.currentArea||"thanh_lam_tran"]:null,n=a?a.name:"Vùng Đất Vô Danh",s=a&&(a.staminaCost||a.stamina_cost)||10,o=(a==null?void 0:a.rates)||[],r=((u=o.find(b=>b.type==="herb"))==null?void 0:u.weight)||0,d=((x=o.find(b=>b.type==="mineral"))==null?void 0:x.weight)||0,c=((g=o.find(b=>b.type==="monster"))==null?void 0:g.weight)||0,p=(a==null?void 0:a.specialtyNames)||[];return`
      <div class="area-explore-panel">
        <div class="page-header" style="margin-bottom:12px">
          <h1 style="margin:0; font-size:20px; font-weight:700">🗺️ Khu Vực: ${n}</h1>
          <div class="text-dim text-sm" style="font-size:12px; color:var(--text-dim); margin-top:2px">Nơi cất giấu nhiều cơ duyên và hiểm nguy.</div>
        </div>

        <!-- KHÁM PHÁ CARD -->
        <div class="panel" id="panelKhamPha" style="border: 1px solid var(--border); background:var(--bg-surface, #151922); border-radius:8px; margin-bottom:14px">
          <div class="panel-body text-center" style="padding: 24px 16px; text-align:center">
            <h2 class="text-lg text-gold mb-sm" style="margin:0 0 6px 0; font-size:18px; color:var(--gold, #facc15)">Dò Thám Xung Quanh</h2>
            <p class="text-dim mb-xs" style="font-size:12px; color:var(--text-dim); margin:0 0 10px 0">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
            <div class="flex gap-2 justify-center flex-wrap mb-sm text-xs" style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-bottom:12px">
              <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #7cb387; border: 1px solid rgba(16, 185, 129, 0.25); font-size:11px; padding:3px 8px; border-radius:4px">🌿 Thảo Dược: ~${r}%</span>
              <span class="badge" style="background: rgba(6, 182, 212, 0.12); color: #87a8d6; border: 1px solid rgba(6, 182, 212, 0.25); font-size:11px; padding:3px 8px; border-radius:4px">⛏️ Mạch Khoáng: ~${d}%</span>
              <span class="badge" style="background: rgba(239, 68, 68, 0.12); color: #d67a7a; border: 1px solid rgba(239, 68, 68, 0.25); font-size:11px; padding:3px 8px; border-radius:4px">👾 Yêu Thú: ~${c}%</span>
            </div>
            ${p.length?`
              <div class="text-xs mb-md" style="color: #dfcfb2; background: rgba(194, 159, 85, 0.08); border: 1px solid rgba(194, 159, 85, 0.25); border-radius: 4px; padding: 5px 12px; display: inline-block; margin-bottom:14px; font-size:11px">
                💎 <strong>Đặc Thù Bản Đồ:</strong> ${p.join(" · ")}
              </div>
            `:""}
            <div class="flex justify-center gap-2 flex-wrap" style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap">
              <button class="btn btn--gold btn--lg" id="btnExplore" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px; padding:10px 18px; font-weight:700">
                <span>🔍 Tìm Kiếm</span>
                <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff; font-size:11px; padding:2px 6px">-${s} Thể Lực</span>
              </button>
              <button class="btn btn--red btn--lg" id="btnAutoBattle" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px; padding:10px 18px; font-weight:700">
                <span>⚡ Tự Động Quét Quái</span>
              </button>
            </div>
          </div>
        </div>

        <!-- EXPLORE EVENT RESULT CONTAINER -->
        <div id="exploreResult"></div>

        <!-- TRACKED MONSTERS PANEL -->
        <div class="panel mt-md" style="background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08); margin-bottom:14px">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">
            ⚔️ Yêu Thú Đang Rình Rập <span class="subtitle" style="font-size:11px; color:var(--text-dim)">(Tối đa 5 con)</span>
          </div>
          <div class="panel-body no-pad" id="trackedMonstersList" style="max-height: 400px; overflow-y: auto;">
            <div style="padding: 16px; text-align: center;" class="text-dim">Đang rà soát dấu vết...</div>
          </div>
        </div>
      </div>
    `}onMounted(){this.loadTrackedMonsters()}async loadTrackedMonsters(){var n;const{ctx:t}=this.props;if(!t)return;const e=((n=t.state)==null?void 0:n.player)||{},a=this.container.querySelector("#trackedMonstersList");if(a)try{const s=await t.api.getAreaMonsters(e.id);if(s.monsters){if(t.state.player.trackedMonsters=s.monsters,s.monsters.length===0){a.innerHTML='<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>';return}a.innerHTML=s.monsters.map(o=>{var d;const r=Math.max(0,Math.min(100,o.currentHp/(((d=o.stats)==null?void 0:d.hp)||1)*100));return`
            <div class="list-item" style="padding:10px 14px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05)">
              <div style="display:flex; align-items:center; gap:10px">
                <span style="font-size:24px">${o.icon||"👾"}</span>
                <div>
                  <div style="font-weight:700; color:var(--red, #f87171)">${o.name} <span style="font-size:11px; color:var(--text-dim)">Lv.${o.level||1}</span></div>
                  <div style="width:120px; background:rgba(0,0,0,0.4); height:6px; border-radius:3px; overflow:hidden; margin-top:4px">
                    <div style="width:${r}%; background:var(--red, #f87171); height:100%"></div>
                  </div>
                </div>
              </div>
              <button class="btn btn--sm btn--red btn-attack-tracked" data-instance-id="${o.instanceId||o.id}">Tấn Công</button>
            </div>
          `}).join("")}}catch{a.innerHTML='<div style="padding: 12px; text-align: center; color:var(--red)">Lỗi nạp quái vật</div>'}}bindEvents(){this.on("click","#btnExplore",()=>{this.props.onExplore&&this.props.onExplore()}),this.on("click","#btnAutoBattle",()=>{this.props.onAutoBattle&&this.props.onAutoBattle()}),this.on("click",".btn-attack-tracked",(t,e)=>{const a=e.dataset.instanceId;this.props.onAttackTracked&&this.props.onAttackTracked(a)})}}class ce extends M{initialState(){return{isRunning:!1,victoryCount:0,totalXp:0,totalGold:0,statusMessage:"Đang rà soát dấu vết yêu thú xung quanh...",statusIcon:"🔍",statusClass:"text-gold"}}template(){const{isRunning:t,victoryCount:e,totalXp:a,totalGold:n,statusMessage:s,statusIcon:o,statusClass:r}=this.state;return t?`
      <div class="auto-battle-runner panel mt-md" style="border:1px solid var(--gold, #facc15); border-radius:8px; margin-bottom:14px; background:var(--bg-surface, #151922); overflow:hidden">
        <div class="panel-title flex justify-between items-center" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05)">
          <span style="font-weight:600; color:var(--gold, #facc15)">⚡ Tự Động Rà Soát & Quét Quái (Auto-Combat)</span>
          <button class="btn btn--red btn--sm" id="btnStopAuto" style="font-size:11px; padding:3px 8px">Dừng Quét</button>
        </div>
        <div class="panel-body text-center" style="font-size:13px; color:var(--text-bright, #fff); padding:16px; background: rgba(0,0,0,0.3); text-align:center">
          <div style="font-size:28px; margin-bottom:8px">${o}</div>
          <div class="${r}" style="font-weight:700">${s}</div>
          <div class="text-dim text-xs mt-xs" style="font-size:11px; color:var(--text-dim); margin-top:6px">
            Đã thắng: ${e} trận | +${a} XP | +${n} Linh Thạch
          </div>
        </div>
      </div>
    `:""}start(t=10){this.setState({isRunning:!0,victoryCount:0,totalXp:0,totalGold:0,statusMessage:"Đang dò thám linh khí & truy tìm yêu thú...",statusIcon:"🧭",statusClass:"text-gold"}),this.runLoop(t)}stop(){this.setState({isRunning:!1}),this.props.onStop&&this.props.onStop()}async runLoop(t){var a,n,s,o,r,d,c,p,v,l,u;const{ctx:e}=this.props;if(e)for(;this.state.isRunning;){const x=((a=e.state)==null?void 0:a.player)||{};if((x.currentStamina||0)<t){this.setState({statusMessage:"❌ Hết thể lực! Tự động dừng rà soát.",statusIcon:"⚠️",statusClass:"text-red",isRunning:!1});break}if(x.currentHp/(x.maxHp||1)<.2){this.setState({statusMessage:"❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.",statusIcon:"🩸",statusClass:"text-red",isRunning:!1});break}try{const g=await e.api.explore(e.state.playerId);if(e.state.player=g.player,e.updateSidebar&&e.updateSidebar(),g.event&&(g.event.type==="monster"||g.event.type==="worldBoss")){if(this.setState({statusMessage:`Phát hiện ${g.event.message}! Bắt đầu quyết chiến...`,statusIcon:"⚔️",statusClass:"text-red"}),await new Promise(y=>setTimeout(y,600)),!this.state.isRunning)break;const b=await e.api.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:e.state.playerId,monsterId:g.event.monsterId})});if(e.state.player=b.player,e.updateSidebar&&e.updateSidebar(),b.outcome==="win"){const y=this.state.victoryCount+1,f=this.state.totalXp+(((n=b.rewards)==null?void 0:n.xp)||0),m=this.state.totalGold+(((s=b.rewards)==null?void 0:s.gold)||0);this.setState({victoryCount:y,totalXp:f,totalGold:m,statusMessage:`Chiến thắng ${(o=b.monster)==null?void 0:o.name}! (+${((r=b.rewards)==null?void 0:r.xp)||0} XP, +${((d=b.rewards)==null?void 0:d.gold)||0} 💎)`,statusIcon:"🏆",statusClass:"text-green"})}else{this.setState({statusMessage:`${b.outcome==="flee"?"Đã bỏ chạy thành công":"Thất bại trọng thương"}! Vòng lặp dừng.`,statusIcon:"💀",statusClass:"text-red",isRunning:!1});break}}else if(g.event&&g.event.type==="monster_ambush"&&g.event.combatResult){const b=g.event.combatResult;if(b.outcome==="win")this.setState({victoryCount:this.state.victoryCount+1,totalXp:this.state.totalXp+(((c=b.rewards)==null?void 0:c.xp)||0),totalGold:this.state.totalGold+(((p=b.rewards)==null?void 0:p.gold)||0),statusMessage:`Đẩy lui cuộc phục kích của ${(v=b.monster)==null?void 0:v.name}! (+${((l=b.rewards)==null?void 0:l.xp)||0} XP)`,statusIcon:"⚠️",statusClass:"text-orange"});else{this.setState({statusMessage:"💀 Bị đánh úp trọng thương! Vòng lặp dừng.",statusIcon:"💀",statusClass:"text-red",isRunning:!1});break}}else this.setState({statusMessage:`${((u=g.event)==null?void 0:u.message)||"Không có biến cố"}. Tiếp tục...`,statusIcon:"🧭",statusClass:"text-blue"})}catch(g){this.setState({statusMessage:`Lỗi: ${g.message}. Dừng tự động.`,statusIcon:"❌",statusClass:"text-red",isRunning:!1});break}await new Promise(g=>setTimeout(g,1200))}}bindEvents(){this.on("click","#btnStopAuto",()=>{this.stop()})}}class pe extends M{template(){var v,l,u,x;const{combatData:t={},player:e={}}=this.props,a=t,n=a.monster||{},s=Math.max(0,(e.currentHp||0)/(e.maxHp||1)*100),o=Math.max(0,(n.currentHp||0)/(n.maxHp||1)*100),r=wt[a.outcome]||wt.loss,d=(v=a.rewards)!=null&&v.gold?` · +${a.rewards.gold} 💎`:"",c=a.rewards?` · +${a.rewards.xp||0} XP${d}`:"",p=de(a.activeStance||"breaker");return`
      <div class="combat-arena-view panel" style="border: 1px solid var(--border-panel, rgba(255,255,255,0.15)); overflow:hidden; border-radius:10px; margin-bottom:16px">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.35); padding: 10px 16px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05)">
          <div style="font-weight:bold; color: ${r.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${r.icon}</span> <span>${r.text}</span>
          </div>
          <div class="text-sm text-dim" style="font-size:12px; color:var(--text-dim)">
            ${a.turns||1}/${a.maxTurns||25} Lượt ${c}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.95) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position:relative">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright, #fff); font-size: 15px; margin-bottom: 2px;">${e.name||"Tu Sĩ"}</div>
              <div style="font-size: 11px; color: ${p.color}; font-weight: 600; margin-bottom: 8px;">
                ${p.icon} ${p.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${s}%; height: 100%; background: ${s>50?"var(--green, #4ade80)":s>20?"var(--orange, #fb923c)":"var(--red, #f87171)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${e.currentHp}/${e.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 22px; font-weight: 800; color: var(--gold); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a992c7; font-weight: 600; margin-top: 4px;">+${(l=a.glitchEvents)!=null&&l.length?a.glitchEvents.length*5:0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${n.icon||"👾"}</div>
              <div style="font-weight: bold; color: var(--red, #f87171); font-size: 15px; margin-bottom: 2px;">${n.name||"Yêu Thú"}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${n.level||1} · ${n.element||"Kim"}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${o}%; height: 100%; background: ${o>50?"var(--red, #f87171)":"var(--orange, #fb923c)"}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${n.currentHp}/${n.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${a.weakpoint?`
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${a.weakpoint}</strong> (x2.5 Dmg)
                </div>
              `:""}
            </div>

          </div>
        </div>

        <!-- MDG Standard: Categorized Loot Drop Panel -->
        ${(x=(u=a.rewards)==null?void 0:u.lootItems)!=null&&x.length?`
          <div class="panel-body" style="background: rgba(15, 23, 42, 0.95); border-top: 1px solid rgba(255,255,255,0.1); padding: 12px 16px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--gold, #facc15); text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
              <span style="display:flex; align-items:center; gap:6px">🎁 CHIẾN LỢI PHẨM THU ĐƯỢC</span>
              <span class="badge" style="background:rgba(234,179,8,0.2); color:#facc15; font-size:10px">${a.rewards.lootItems.length} MÓN</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px;">
              ${a.rewards.lootItems.map(g=>`
                <div style="background: rgba(255,255,255,0.04); border: 1px solid ${g.color||"rgba(255,255,255,0.15)"}; border-radius: 6px; padding: 8px 10px; display: flex; align-items: center; gap: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.3)">
                  <div style="font-size: 22px;">${g.icon||"📦"}</div>
                  <div style="flex: 1; overflow: hidden;">
                    <div style="font-weight: 700; font-size: 13px; color: ${g.color||"var(--text-bright)"}; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
                      ${g.name} ${g.quantity>1?`<span style="opacity:0.8">x${g.quantity}</span>`:""}
                    </div>
                    <div style="font-size: 10px; opacity: 0.6; text-transform: uppercase;">
                      ${g.rarity||g.type}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:""}

        <!-- Combat Log -->
        <div class="panel-body no-pad" style="border-top: 1px solid var(--border, rgba(255,255,255,0.1));">
          <div style="padding: 8px 16px; background: rgba(0,0,0,0.2); font-size: 11px; color: var(--text-dim); text-transform: uppercase; font-weight: 600;">
            📜 Nhật Ký Quyết Đấu Chi Tiết
          </div>
          <div class="combat-log" style="max-height: 250px; overflow-y: auto; padding: 12px 16px;">
            ${It(a.log)}
          </div>
        </div>
      </div>
    `}onMounted(){const{combatData:t={}}=this.props,e=this.container.querySelector("#cardMonster"),a=t.monster||{};t.glitchEvents&&t.glitchEvents.length>0&&e?t.glitchEvents.forEach((n,s)=>{this.setTimeout(()=>{kt(e,`-${n.damage} 🌌 [VẾT NỨT]`,"glitch"),e.classList.add("shake"),this.setTimeout(()=>e.classList.remove("shake"),400)},s*400+200)}):e&&t.rewards&&kt(e,`-${Math.round((a.maxHp||100)*.4)} 💥`,"crit")}}class ge extends M{template(){return`
      <div class="combat-page">
        <!-- AUTO BATTLE CONTAINER -->
        <div id="autoBattleContainer"></div>

        <!-- MAIN EXPLORATION VIEW -->
        <div id="areaExploreContainer"></div>

        <!-- ACTIVE COMBAT ARENA VIEW -->
        <div id="combatArenaContainer"></div>
      </div>
    `}onMounted(){this.mountSubViews()}onUpdated(){this.mountSubViews()}onUnmounted(){this._explorePanel&&this._explorePanel.unmount(),this._autoRunner&&this._autoRunner.unmount(),this._arenaView&&this._arenaView.unmount()}mountSubViews(){var r,d;const{ctx:t}=this.props,e=((r=t==null?void 0:t.state)==null?void 0:r.player)||{},a=(d=t==null?void 0:t.state)!=null&&d.exploration?t.state.exploration[e.currentArea||"thanh_lam_tran"]:null,n=a&&(a.staminaCost||a.stamina_cost)||10,s=this.container.querySelector("#autoBattleContainer");s&&!this._autoRunner&&(this._autoRunner=new ce({ctx:t,onStop:()=>{const c=this.container.querySelector("#panelKhamPha");c&&(c.style.display="block")}}),this._autoRunner.mount(s));const o=this.container.querySelector("#areaExploreContainer");o&&!this._explorePanel&&(this._explorePanel=new le({ctx:t,onExplore:()=>this.handleExplore(),onAutoBattle:()=>{const c=this.container.querySelector("#panelKhamPha");c&&(c.style.display="none"),this._autoRunner.start(n)},onAttackTracked:c=>this.handleCombat(null,c)}),this._explorePanel.mount(o))}async handleExplore(){const{ctx:t}=this.props;if(!t)return;const e=this.container.querySelector("#exploreResult");if(e){e.innerHTML='<div class="panel" style="background:rgba(255,255,255,0.05); margin-bottom:12px; border-radius:8px"><div class="panel-body text-center text-gold" style="padding:16px">⏳ Đang tìm kiếm...</div></div>';try{const a=await t.api.explore(t.state.playerId);t.state.player=a.player,t.updateSidebar&&t.updateSidebar();const n=a.event,s=a.cost||10,o=a.player.currentStamina??0,r=a.player.maxStamina??100,d=o>=s;let c=`
        <div class="panel" style="background: rgba(255,255,255,0.05); border:1px solid var(--blue, #3b82f6); border-radius:8px; margin-bottom:14px; overflow:hidden">
          <div class="panel-body text-center" style="padding:16px; text-align:center">
            <div style="margin-bottom: 10px;">
              <span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px; border-radius:4px">
                🏃 -${s} Thể Lực (Hiện có: ${o}/${r})
              </span>
            </div>
      `;if(n.type==="monster")c+=`
          <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
          <div class="text-lg text-red bold mb-sm" style="font-size:16px; font-weight:700; color:var(--red, #f87171); margin-bottom:8px">${n.message}</div>
          <div class="flex gap-2 justify-center mt-md w-full" style="display:flex; justify-content:center; gap:8px; margin-top:12px">
            <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${n.monsterId}" style="padding:8px 14px">🗡️ Giao Chiến</button>
            <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${n.monsterId}" style="padding:8px 14px">👣 Theo Dõi</button>
            <button class="btn btn--gold flex-1" id="btnExploreAgain" ${d?"":"disabled"} style="padding:8px 14px">🔍 Dò Tiếp</button>
          </div>
        `;else if(n.type==="monster_ambush"&&n.combatResult){const x=n.combatResult,g=x.outcome==="win"?"🏆 Chiến thắng!":x.outcome==="loss"?"💀 Bại trận!":"⏰ Bất phân",b=x.outcome==="win"?"var(--green, #4ade80)":x.outcome==="loss"?"var(--red, #f87171)":"var(--orange, #fb923c)";c+=`
          <div style="font-size:36px; margin-bottom:8px">⚠️</div>
          <div class="text-lg bold" style="color:var(--red, #f87171); margin-bottom:8px; font-size:16px; font-weight:700">${n.message}</div>
          <div style="font-size:16px; font-weight:700; color:${b}; margin-bottom:12px">${g}</div>
          <div class="combat-log" style="max-height:200px; overflow-y:auto; text-align:left; background:rgba(0,0,0,0.2); padding:10px; border-radius:6px">
            ${It(x.log||[])}
          </div>
          <div class="flex gap-2 justify-center mt-md" style="display:flex; justify-content:center; gap:8px; margin-top:12px">
            <button class="btn btn--gold flex-1" id="btnExploreAgain" ${d?"":"disabled"} style="padding:8px 14px">🔍 Dò Thám Tiếp (-${s} TL)</button>
            <button class="btn btn--blue" id="btnExploreContinue" style="padding:8px 14px">Tiếp tục</button>
          </div>
        `}else n.type==="worldBoss"?c+=`
          <div style="font-size: 48px; margin-bottom: 8px;">🔥</div>
          <div class="text-lg text-red bold mb-sm" style="font-size:16px; font-weight:700; color:var(--red, #f87171); margin-bottom:8px">${n.message}</div>
          <div class="text-sm text-dim mb-md" style="font-size:12px; color:var(--text-dim); margin-bottom:12px">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
          <div class="flex gap-2 justify-center mt-md w-full" style="display:flex; justify-content:center; gap:8px; margin-top:12px">
            <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${n.monsterId}" style="padding:8px 14px">⚔️ Thách Đấu</button>
            <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${n.monsterId}" style="padding:8px 14px">👣 Ghi Dấu</button>
            <button class="btn btn--gold flex-1" id="btnExploreAgain" ${d?"":"disabled"} style="padding:8px 14px">🔍 Dò Tiếp</button>
          </div>
        `:c+=`
          <div style="font-size: 40px; margin-bottom: 8px;">💎</div>
          <div class="text-lg text-bright bold mb-sm" style="font-size:15px; font-weight:700; margin-bottom:8px">${n.message||"Thu hoạch kỳ ngộ"}</div>
          <div class="flex gap-2 justify-center mt-md" style="display:flex; justify-content:center; gap:8px; margin-top:12px">
            <button class="btn btn--gold flex-1" id="btnExploreAgain" ${d?"":"disabled"} style="padding:8px 14px">🔍 Dò Tiếp</button>
            <button class="btn btn--dark" id="btnExploreContinue" style="padding:8px 14px">Đóng</button>
          </div>
        `;c+="</div></div>",e.innerHTML=c;const p=e.querySelector("#btnExploreCombat");p&&p.addEventListener("click",x=>{e.innerHTML="",this.handleCombat(x.target.dataset.mid,null)});const v=e.querySelector("#btnExploreTrack");v&&v.addEventListener("click",async x=>{try{const g=await t.api.trackMonster(t.state.playerId,x.target.dataset.mid);g.success&&(t.notify(g.message,"success"),e.innerHTML="",this._explorePanel&&this._explorePanel.loadTrackedMonsters())}catch(g){t.notify("Lỗi theo dõi: "+g.message,"error")}});const l=e.querySelector("#btnExploreAgain");l&&l.addEventListener("click",()=>this.handleExplore());const u=e.querySelector("#btnExploreContinue");u&&u.addEventListener("click",()=>{e.innerHTML=""})}catch(a){e.innerHTML=`<div class="panel" style="background:rgba(255,255,255,0.05); margin-bottom:12px; border-radius:8px"><div class="panel-body text-red text-center" style="padding:16px; color:var(--red)">Lỗi: ${a.message}</div></div>`}}}async handleCombat(t,e=null){var o;const{ctx:a}=this.props;if(!a)return;const n=this.container.querySelector("#combatArenaContainer");if(!n)return;const s=((o=a.state)==null?void 0:o.player)||{};if(!s.currentHp||s.currentHp<=0)return a.notify("Đã kiệt sức! Hãy tịnh dưỡng trước.","error");if(s.hospitalRemaining>0)return a.notify(`Đang tịnh dưỡng! Còn ${s.hospitalRemaining}s`,"error");n.innerHTML=`
      <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite; background:rgba(0,0,0,0.4); border:1px solid var(--gold, #facc15); border-radius:8px; margin-bottom:16px">
        <div class="panel-body text-center text-gold" style="padding:20px; text-align:center">
          <div style="font-size:36px; margin-bottom:8px">⚔️</div>
          <div style="font-weight:bold; font-size:16px; color:var(--gold, #facc15)">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
        </div>
      </div>`,n.scrollIntoView({behavior:"smooth"});try{const r=await a.api.request("/combat/full",{method:"POST",body:JSON.stringify({playerId:a.state.playerId,monsterId:e?null:t,trackedMonsterId:e})});a.state.player=r.player,a.updateSidebar&&a.updateSidebar(),this._arenaView&&this._arenaView.unmount(),this._arenaView=new pe({combatData:r,player:r.player}),this._arenaView.mount(n),this._explorePanel&&this._explorePanel.loadTrackedMonsters()}catch(r){n.innerHTML=`<div class="panel" style="background:rgba(255,255,255,0.05); margin-bottom:12px; border-radius:8px"><div class="panel-body text-red" style="padding:16px; color:var(--red)">Lỗi chiến đấu: ${r.message}</div></div>`}}}let V=null;function he(i,t){V&&(V.unmount(),V=null),V=new ge({ctx:t}),V.mount(i)}function mt(i,t){const{state:e,api:a,notify:n}=t,s=e.player,o=(s.skills||[]).find(v=>(typeof v=="string"?v:v.id)==="nhan_thuat"),r=o?o.level||1:0,d=[...e.skills].sort((v,l)=>(v.tier||1)-(l.tier||1)),c=(s.skills||[]).map(v=>typeof v=="string"?v:v.id),p={1:"Nhất",2:"Nhị",3:"Tam",4:"Tứ",5:"Ngũ",6:"Lục",7:"Thất",8:"Bát",9:"Cửu"};i.innerHTML=`
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${r}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${d.map(v=>{const l=c.includes(v.id),u=v.tier||1,x=u>r+1,g=u<=r;let b="";return v.requirements&&v.requirements.length>0?g||l?b=`<div class="mt-sm text-xs text-orange">Điều kiện: ${v.requirements.map(h=>`<br>• ${h}`).join("")}</div>`:x?b=`<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${u}.</div>`:b='<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>':b='<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>',`
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${l?"var(--blue)":"var(--text-light)"}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${v.name} ${l?' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>':""}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${l?"rgba(59,130,246,0.2)":"var(--gold)"}">Bậc ${p[u]||u}</span>
                    <span class="text-xs text-dim">${v.type==="passive"?"🔮 Nội công":"⚡ Chiêu thức"}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${g||l?v.description:"Sách cổ không thể nhìn thấu công dụng."}"
                </div>
                ${v.type!=="passive"&&v.cost?`<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${v.cost} linh lực</div>`:""}
                
                ${b}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${l?'<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>':`<button class="btn ${x?"btn--dark":"btn--gold"} btn--sm btn-learn" ${x?'disabled title="Ngộ tính chưa đủ"':""} data-sid="${v.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,i.querySelectorAll(".accordion-header").forEach(v=>{v.addEventListener("click",()=>{const l=v.nextElementSibling;l.style.display==="none"?(l.style.display="block",v.querySelector("div:last-child").textContent="▲"):(l.style.display="none",v.querySelector("div:last-child").textContent="▼")})}),i.querySelectorAll(".btn-learn").forEach(v=>{v.addEventListener("click",async l=>{l.stopPropagation();try{const u=await a.learnSkill(s.id,v.dataset.sid);u.error?n(u.error,"error"):(e.player=u.player,n(u.message,"success"),mt(i,t))}catch(u){n("Lỗi học kỹ năng: "+u.message,"error")}})})}class ot extends M{template(){const{tabs:t=[],activeTab:e="",customClass:a=""}=this.props;return`
      <div class="tabs-nav ${a}" style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 8px; white-space: nowrap; border-bottom: 1px solid rgba(255,255,255,0.08);">
        ${t.map(n=>`
            <button class="btn btn--sm ${n.id===e?"btn--blue":"btn--dark"} tab-btn" data-tab-id="${n.id}" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; font-size: 12px; cursor: pointer; transition: all 0.2s ease;">
              ${n.icon?`<span>${n.icon}</span>`:""}
              <span>${n.label}</span>
              ${n.badge!==void 0&&n.badge!==null&&n.badge!==""?`
                <span class="badge" style="background: rgba(255,255,255,0.15); font-size: 10px; padding: 1px 6px; border-radius: 999px;">${n.badge}</span>
              `:""}
            </button>
          `).join("")}
      </div>
    `}bindEvents(){this.on("click",".tab-btn",(t,e)=>{const a=e.dataset.tabId;a&&a!==this.props.activeTab&&this.props.onTabChange&&this.props.onTabChange(a)})}}const Nt=[{key:"strength",name:"Sức Mạnh",abbr:"STR",desc:"Tăng sát thương vật lý và uy lực đòn đánh."},{key:"speed",name:"Tốc Độ",abbr:"SPD",desc:"Tăng tỷ lệ đánh trúng và cản trở đối thủ đào tẩu."},{key:"dexterity",name:"Khéo Léo",abbr:"DEX",desc:"Tăng xác suất thân pháp né tránh và xuất chiêu hiểm hóc."},{key:"defense",name:"Phòng Ngự",abbr:"DEF",desc:"Giảm sát thương nhận vào theo đường cong phòng thủ MDG."}],ue=[{name:"Phàm Cốt",multiplier:"1.0x",color:"#94a3b8",badgeClass:"tier-pham"},{name:"Linh Cốt",multiplier:"1.1x",color:"#38bdf8",badgeClass:"tier-linh"},{name:"Huyền Cốt",multiplier:"1.25x",color:"#a855f7",badgeClass:"tier-huyen"},{name:"Đạo Cốt",multiplier:"1.5x",color:"#facc15",badgeClass:"tier-dao"},{name:"Tiên Cốt",multiplier:"2.0x",color:"#f59e0b",badgeClass:"tier-tien"}];function lt(i=0,t=25){if(i<=0)return 0;const e=Math.max(8,t),a=i/(i+5*e)*100;return Math.min(85,Math.round(a*100)/100)}function ct(i=0,t=10){if(i<=0)return 0;const e=Math.max(1,t),a=i/(i+2.5*e)*100;return Math.min(35,Math.round(a*100)/100)}function q(i=0){return Number(i||0).toLocaleString("vi-VN")}class ve extends M{initialState(){return{trainCounts:{strength:1,speed:1,dexterity:1,defense:1},trainingStat:null}}template(){const{player:t={}}=this.props,e=t.stats||{},a=t.allocatedStats||{},n=t.talentDisplay||{},s=t.currentStamina??100,o=t.maxStamina??100,r=5,d=Math.max(0,Math.floor(s/r)),c=t.hospitalRemaining>0,p=s>=r&&!c;return`
      <div class="training-tab" style="display:flex; flex-direction:column; gap:16px;">
        <!-- STAMINA & TRAINING HUD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                  Thể Phách & Thể Lực Rèn Luyện
                </h3>
                <span class="badge" style="background:rgba(83,123,180,0.15); border:1px solid var(--blue); color:var(--blue); font-size:10px; font-weight:700; padding:1px 6px; border-radius:2px;">
                  ${d} Lượt Khả Dụng
                </span>
              </div>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Tiêu hao <strong style="color:var(--text-bright);">${r} Thể Lực</strong> cho mỗi lượt rèn luyện. Tốc độ hồi phục: <strong style="color:var(--green);">+${e.staminaRegen??2}/10s</strong>.
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px;">
              <div style="text-align:right;">
                <div style="font-size:10px; color:var(--text-dim); text-transform:uppercase;">Thể Lực Hiện Tại</div>
                <div style="font-size:15px; font-weight:700; color:${p?"var(--cyan)":"var(--red)"};">
                  ${s} / ${o}
                </div>
              </div>
              <!-- STAMINA PROGRESS BAR -->
              <div style="width:100px; height:6px; background:var(--bg-main); border:1px solid var(--border); border-radius:2px; overflow:hidden;">
                <div style="background:var(--cyan); height:100%; width:${Math.min(100,Math.round(s/Math.max(1,o)*100))}%;"></div>
              </div>
            </div>
          </div>
        </div>

        ${c?`
          <div class="panel" style="background:rgba(184,74,74,0.1); border:1px solid var(--red); border-radius:4px; padding:10px 14px; text-align:center; color:var(--red); font-size:12px;">
            Đang trọng thương tịnh dưỡng. Còn ${t.hospitalRemaining}s nữa mới có thể tiếp tục rèn luyện.
          </div>
        `:""}

        <!-- 4 ATTRIBUTES TRAINING CARDS -->
        <div class="attributes-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
          ${Nt.map(v=>{const l=v.key,u=e[l]??0,x=a[l]??0,g=n[l]||{value:1,name:"Phàm Cốt",color:"#94a3b8"},b=this.state.trainCounts[l]||1,h=Math.min(Math.max(1,b),Math.max(1,d)),y=h*r,f=s>=y,m=this.state.trainingStat===l;return`
              <div class="panel stat-card" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div>
                  <!-- HEADER -->
                  <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                      <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:14px; font-weight:700; color:var(--text-bright);">${v.name}</span>
                        <span style="font-size:10px; color:var(--text-dim); font-weight:600;">[${v.abbr}]</span>
                        <span class="badge" style="background:rgba(255,255,255,0.03); border:1px solid ${g.color}44; color:${g.color}; font-size:10px; padding:1px 5px; border-radius:2px;">
                          ${g.name} (×${g.value})
                        </span>
                      </div>
                      <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                        ${v.desc}
                      </div>
                    </div>
                  </div>

                  <!-- VALUE DISPLAY -->
                  <div style="display:flex; align-items:baseline; gap:8px; margin-top:10px;">
                    <div style="font-size:22px; font-weight:800; color:var(--text-bright); font-family:monospace;">
                      ${q(u)}
                    </div>
                    ${x>0?`
                      <span style="font-size:11px; color:var(--green); font-weight:600;">
                        (+${q(x)})
                      </span>
                    `:""}
                  </div>
                </div>

                <!-- QUICK MULTIPLIERS & ACTION -->
                <div style="border-top:1px solid var(--border); padding-top:10px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-size:11px; color:var(--text-dim);">
                      Số lượt rèn: <strong style="color:var(--text-bright);">${h}</strong> (${y} Thể lực)
                    </div>
                    <div style="display:flex; gap:3px;">
                      <button class="btn btn--dark btn--xs btn-quick-count" data-stat="${l}" data-count="1" style="font-size:10px; padding:2px 6px; border-radius:2px;">1</button>
                      <button class="btn btn--dark btn--xs btn-quick-count" data-stat="${l}" data-count="5" style="font-size:10px; padding:2px 6px; border-radius:2px;">5</button>
                      <button class="btn btn--dark btn--xs btn-quick-count" data-stat="${l}" data-count="10" style="font-size:10px; padding:2px 6px; border-radius:2px;">10</button>
                      <button class="btn btn--dark btn--xs btn-quick-count" data-stat="${l}" data-count="${d}" style="font-size:10px; padding:2px 6px; border-radius:2px;">Tối Đa</button>
                    </div>
                  </div>

                  <div style="display:flex; gap:6px;">
                    <input type="number" class="input-train-count" data-stat="${l}" min="1" max="${Math.max(1,d)}" value="${h}" style="width:65px; background:var(--bg-main); border:1px solid var(--border); color:var(--text-bright); border-radius:3px; padding:4px 6px; font-size:11px; text-align:center;" ${p?"":"disabled"} />
                    <button class="btn btn-train ${p&&f?"btn--blue":"btn--dark"}" data-stat="${l}" ${p&&f&&!m?"":"disabled"} style="flex:1; font-size:11px; padding:5px 12px; border-radius:3px; font-weight:600;">
                      ${m?"Đang Luyện...":`Rèn Luyện ${v.name}`}
                    </button>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>

        <!-- DERIVED COMBAT ATTRIBUTES HUD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 16px;">
          <div style="font-size:11px; font-weight:700; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">
            Chỉ Số Chiến Đấu Phái Sinh
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px;">
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Khí Huyết Tối Đa</div>
              <div style="font-size:13px; font-weight:700; color:var(--green); margin-top:2px;">${q(e.maxHp??100)} HP</div>
            </div>
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Linh Lực Tối Đa</div>
              <div style="font-size:13px; font-weight:700; color:var(--blue); margin-top:2px;">${q(e.maxEnergy??50)} MP</div>
            </div>
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Hồi Linh Lực</div>
              <div style="font-size:13px; font-weight:700; color:var(--blue); margin-top:2px;">+${e.energyRegen??5} / lượt</div>
            </div>
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Tỷ Lệ Chí Mạng</div>
              <div style="font-size:13px; font-weight:700; color:var(--gold); margin-top:2px;">${e.critChance??5}%</div>
            </div>
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Sát Thương Chí Mạng</div>
              <div style="font-size:13px; font-weight:700; color:var(--gold); margin-top:2px;">×${e.critMultiplier??1.5}</div>
            </div>
          </div>
        </div>
      </div>
    `}bindEvents(){this.on("click",".btn-quick-count",(t,e)=>{const a=e.dataset.stat,n=parseInt(e.dataset.count,10)||1,s={...this.state.trainCounts};s[a]=n,this.setState({trainCounts:s})}),this.on("input",".input-train-count",(t,e)=>{const a=e.dataset.stat,n=parseInt(e.value,10)||1,s={...this.state.trainCounts};s[a]=n,this.setState({trainCounts:s})}),this.on("click",".btn-train",async(t,e)=>{const a=e.dataset.stat,n=this.state.trainCounts[a]||1;if(this.props.onTrain){this.setState({trainingStat:a});try{await this.props.onTrain(a,n)}finally{this.setState({trainingStat:null})}}})}}class be extends M{initialState(){return{showRoadmap:!1}}template(){var P,H,E,N;const{player:t={},realmData:e={}}=this.props,a=e.current||t.realmInfo||{},n=e.allRealms||[],s=a.nextRealm||((P=t.realmInfo)==null?void 0:P.nextRealm)||{},o=t.level||1,r=s.levelMin||((t.realmTier||1)+1)*10,d=((H=s.cost)==null?void 0:H.gold)||0,c=((E=s.cost)==null?void 0:E.energy)||0,p=t.gold||0,v=t.currentEnergy||0,l=o>=r,u=p>=d,x=v>=c,g=l&&u&&x&&!t.hospitalRemaining&&(a.canBreakthrough??!0),b=t.currentHp??100,h=((N=t.stats)==null?void 0:N.maxHp)||t.maxHp||100,y=b<h,f=(t.realmTier||1)+1,m=Math.round(h*.45*(1+f*.05)),T=t.usableEnergy??t.currentEnergy??0,$=Math.round(T*2.5),w=t.activeAuras||[],k=w.includes("ho_the_kim_chung"),_=w.includes("than_hanh_bo");let S=0;t.medicines&&typeof t.medicines=="object"?S=Object.values(t.medicines).reduce((z,I)=>z+(typeof I=="number"?I:(I==null?void 0:I.qty)||1),0):Array.isArray(t.inventory)&&(S=t.inventory.filter(z=>z.type==="medicine"||z.type==="pill"||z.id&&z.id.includes("dan")).reduce((z,I)=>z+(I.qty||1),0));const L=t.xpToNext>0?Math.min(100,Math.floor(t.xp/t.xpToNext*100)):0;return`
      <div class="realm-tab" style="display:flex; flex-direction:column; gap:16px;">
        <!-- CURRENT REALM MAIN CARD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="badge" style="background:rgba(194,159,85,0.15); border:1px solid var(--gold); color:var(--gold); font-size:11px; font-weight:700; padding:2px 8px; border-radius:3px;">
                  Bậc ${t.realmTier||1}
                </span>
                <h2 style="font-size:17px; font-weight:700; color:var(--text-bright); margin:0;">
                  ${a.fullName||"Phàm Nhân"}
                </h2>
                <span style="font-size:12px; color:var(--text-dim);">· ${a.subStageName||"Sơ Kỳ"}</span>
              </div>
              <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">
                Cấp Độ Tu Sĩ: <strong style="color:var(--blue);">Lv.${t.level||1}</strong> · Tu vi tích lũy: ${q(t.xp||0)} / ${q(t.xpToNext||1)} XP (${L}%)
              </div>
            </div>

            <!-- ACTION BUTTON -->
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge" style="background:${g?"rgba(79,140,98,0.15)":"rgba(255,255,255,0.04)"}; border:1px solid ${g?"var(--green)":"var(--border)"}; color:${g?"var(--green)":"var(--text-dim)"}; font-size:11px; padding:3px 8px; border-radius:3px; font-weight:600;">
                ${g?"SẴN SÀNG ĐỘT PHÁ":"CHƯA ĐỦ ĐIỀU KIỆN"}
              </span>
              <button class="btn btn-breakthrough ${g?"btn--gold":"btn--dark"}" ${g?"":"disabled"} style="font-size:12px; padding:6px 18px; border-radius:3px; font-weight:600;">
                Đột Phá Cảnh Giới
              </button>
            </div>
          </div>

          <!-- XP PROGRESS BAR -->
          <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:2px; height:5px; overflow:hidden; margin-top:8px;">
            <div style="background:var(--gold); height:100%; width:${L}%; transition:width 0.3s ease;"></div>
          </div>
        </div>

        <!-- BREAKTHROUGH PRECONDITIONS CHECKLIST -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="font-size:12px; font-weight:700; color:var(--text-bright); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">
            Điều Kiện Thăng Cảnh Giới: ${s.name||"Cảnh Giới Kế Tiếp"}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
            <!-- CONDITION 1: LEVEL -->
            <div style="background:var(--bg-main); border:1px solid ${l?"var(--green)":"var(--border)"}; border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:10px; color:var(--text-dim);">Yêu Cầu Cấp Độ</div>
                <div style="font-size:13px; font-weight:700; color:var(--text-bright); margin-top:2px;">
                  Lv.${o} / ${r}
                </div>
              </div>
              <span class="badge" style="background:${l?"rgba(79,140,98,0.15)":"rgba(255,255,255,0.04)"}; color:${l?"var(--green)":"var(--red)"}; font-size:10px; padding:2px 6px; border-radius:2px;">
                ${l?"Đạt":"Chưa Đạt"}
              </span>
            </div>

            <!-- CONDITION 2: GOLD -->
            <div style="background:var(--bg-main); border:1px solid ${u?"var(--green)":"var(--border)"}; border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:10px; color:var(--text-dim);">Linh Thạch Tiêu Hao</div>
                <div style="font-size:13px; font-weight:700; color:var(--text-bright); margin-top:2px;">
                  ${q(p)} / ${q(d)}
                </div>
              </div>
              <span class="badge" style="background:${u?"rgba(79,140,98,0.15)":"rgba(255,255,255,0.04)"}; color:${u?"var(--green)":"var(--red)"}; font-size:10px; padding:2px 6px; border-radius:2px;">
                ${u?"Đủ":"Thiếu"}
              </span>
            </div>

            <!-- CONDITION 3: ENERGY -->
            <div style="background:var(--bg-main); border:1px solid ${x?"var(--green)":"var(--border)"}; border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:10px; color:var(--text-dim);">Linh Lực Khả Dụng</div>
                <div style="font-size:13px; font-weight:700; color:var(--text-bright); margin-top:2px;">
                  ${q(v)} / ${q(c)} MP
                </div>
              </div>
              <span class="badge" style="background:${x?"rgba(79,140,98,0.15)":"rgba(255,255,255,0.04)"}; color:${x?"var(--green)":"var(--red)"}; font-size:10px; padding:2px 6px; border-radius:2px;">
                ${x?"Đủ":"Thiếu"}
              </span>
            </div>
          </div>
        </div>

        <!-- TRIBULATION READINESS -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-bright); text-transform:uppercase; letter-spacing:0.5px;">
              Độ Kiếp Sinh Tồn (Tribulation Readiness)
            </div>
            <span style="font-size:11px; color:${y?"var(--red)":"var(--green)"}; font-weight:600;">
              ${y?"Khí huyết chưa viên mãn":"Khí huyết dồi dào"}
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:8px;">
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:10px; color:var(--text-dim);">Khí Huyết vs Lôi Kiếp</div>
              <div style="font-size:13px; font-weight:700; color:${y?"var(--red)":"var(--green)"}; margin-top:2px;">
                ${q(b)} / ${q(h)} HP
              </div>
              <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">
                Ước tính sét: ~${q(m)} ST
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:10px; color:var(--text-dim);">Chân Khí Hộ Thể (Khiên Giáp)</div>
              <div style="font-size:13px; font-weight:700; color:var(--blue); margin-top:2px;">
                ${q($)} HP
              </div>
              <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">
                ${T} LL × 2.5 hấp thụ sát thương
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:10px; color:var(--text-dim);">Tâm Pháp Bảo Hộ</div>
              <div style="font-size:13px; font-weight:700; color:var(--purple); margin-top:2px;">
                ${k?"Kim Chung (-20%)":"Chưa kích hoạt"}
              </div>
              <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">
                ${_?"Thần Hành (+10% Né)":"Không có hào quang phụ"}
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:10px; color:var(--text-dim);">Đan Dược Hộ Mệnh</div>
              <div style="font-size:13px; font-weight:700; color:var(--gold); margin-top:2px;">
                ${S} Viên
              </div>
              <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">
                Tự động cứu mạng khi HP < 20%
              </div>
            </div>
          </div>
        </div>

        <!-- REALM ROADMAP (ACCORDION / TOGGLE) -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" id="btnToggleRoadmap">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-bright); text-transform:uppercase; letter-spacing:0.5px;">
                Lộ Trình Cảnh Giới Tu Tiên (${n.length||19} Bậc)
              </span>
            </div>
            <button class="btn btn--dark btn--xs" style="font-size:10px; padding:2px 8px; border-radius:2px;">
              ${this.state.showRoadmap?"Thu Gọn":"Xem Lộ Trình"}
            </button>
          </div>

          ${this.state.showRoadmap?`
            <div style="margin-top:12px; border-top:1px solid var(--border); padding-top:10px; overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border); color:var(--text-dim);">
                    <th style="padding:6px 8px;">Cảnh Giới</th>
                    <th style="padding:6px 8px;">Yêu Cầu Cấp</th>
                    <th style="padding:6px 8px;">Tỷ Lệ Thất Bại</th>
                    <th style="padding:6px 8px; text-align:right;">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  ${n.map(z=>{const I=z.tier===(t.realmTier||1),O=z.tier<(t.realmTier||1);return`
                      <tr style="border-bottom:1px solid rgba(255,255,255,0.03); opacity:${z.tier>(t.realmTier||1)?"0.5":"1"};">
                        <td style="padding:6px 8px; font-weight:600; color:${z.color||"var(--text-bright)"};">
                          ${z.name}
                        </td>
                        <td style="padding:6px 8px; color:var(--text-dim);">Lv.${z.levelMin}+</td>
                        <td style="padding:6px 8px; color:${z.failChance?"var(--red)":"var(--text-dim)"};">
                          ${z.failChance?`${z.failChance}%`:"0%"}
                        </td>
                        <td style="padding:6px 8px; text-align:right;">
                          ${I?`
                            <span class="badge" style="background:rgba(194,159,85,0.2); color:var(--gold); border:1px solid var(--gold); font-size:9px; padding:1px 5px; border-radius:2px;">
                              HIỆN TẠI
                            </span>
                          `:O?`
                            <span class="badge" style="background:rgba(79,140,98,0.15); color:var(--green); font-size:9px; padding:1px 5px; border-radius:2px;">
                              ĐÃ QUA
                            </span>
                          `:`
                            <span class="badge" style="background:var(--bg-main); color:var(--text-dim); font-size:9px; padding:1px 5px; border-radius:2px;">
                              CHƯA ĐẠT
                            </span>
                          `}
                        </td>
                      </tr>
                    `}).join("")}
                </tbody>
              </table>
            </div>
          `:""}
        </div>
      </div>
    `}bindEvents(){this.on("click",".btn-breakthrough",()=>{this.props.onBreakthrough&&this.props.onBreakthrough()}),this.on("click","#btnToggleRoadmap",()=>{this.setState({showRoadmap:!this.state.showRoadmap})})}}class me extends M{template(){const{player:t={}}=this.props,e=t.stats||{},a=t.talentDisplay||{},n=e.defense??0,s=e.dexterity??0,o=e.speed??10,r=lt(n,25),d=lt(n,75),c=lt(n,250),p=ct(s,o*.75),v=ct(s,o*1),l=ct(s,o*1.5);return`
      <div class="mechanics-tab" style="display:flex; flex-direction:column; gap:16px;">
        <!-- ARMOR MITIGATION CURVE -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div>
              <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                Phân Tích Phòng Ngự & Giảm Sát Thương (Chuẩn MDG)
              </h3>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Đường cong giảm thiểu sát thương thực tế phụ thuộc vào uy lực đòn đánh của đối phương.
              </div>
            </div>
            <span class="badge" style="background:rgba(83,123,180,0.15); border:1px solid var(--blue); color:var(--blue); font-size:11px; font-weight:700; padding:2px 8px; border-radius:3px;">
              Phòng Thủ: ${q(n)}
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-top:12px;">
            <!-- LOW STRIKE -->
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:11px; font-weight:600; color:var(--green);">Đòn Nhẹ (25 ST)</span>
                <span style="font-size:12px; font-weight:700; color:var(--green);">${r}%</span>
              </div>
              <div style="background:rgba(0,0,0,0.3); border-radius:2px; height:5px; overflow:hidden; margin-bottom:6px;">
                <div style="background:var(--green); height:100%; width:${r}%;"></div>
              </div>
              <div style="font-size:10px; color:var(--text-dim);">Quái thường, trầy xước sơ đẳng</div>
            </div>

            <!-- MEDIUM STRIKE -->
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:11px; font-weight:600; color:var(--orange);">Đòn Tiêu Chuẩn (75 ST)</span>
                <span style="font-size:12px; font-weight:700; color:var(--orange);">${d}%</span>
              </div>
              <div style="background:rgba(0,0,0,0.3); border-radius:2px; height:5px; overflow:hidden; margin-bottom:6px;">
                <div style="background:var(--orange); height:100%; width:${d}%;"></div>
              </div>
              <div style="font-size:10px; color:var(--text-dim);">Tinh anh, chiêu thức cận chiến</div>
            </div>

            <!-- BOSS STRIKE -->
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:11px; font-weight:600; color:var(--red);">Đòn Boss (250 ST)</span>
                <span style="font-size:12px; font-weight:700; color:var(--red);">${c}%</span>
              </div>
              <div style="background:rgba(0,0,0,0.3); border-radius:2px; height:5px; overflow:hidden; margin-bottom:6px;">
                <div style="background:var(--red); height:100%; width:${c}%;"></div>
              </div>
              <div style="font-size:10px; color:var(--text-dim);">Trọng kích Boss, xuyên giáp tự nhiên</div>
            </div>
          </div>

          <div style="font-size:10px; color:var(--text-dim); margin-top:10px; text-align:right;">
            Trần giảm sát thương vật lý tối đa: <strong style="color:var(--gold);">85%</strong>
          </div>
        </div>

        <!-- EVASION DEXTERITY BREAKDOWN -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div>
              <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                Thân Pháp & Xác Suất Né Tránh (Khéo Léo: ${q(s)})
              </h3>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Xác suất né tránh dựa trên chênh lệch giữa Thân Pháp của bạn và Tốc Độ đối phương.
              </div>
            </div>
            <span style="font-size:11px; color:var(--text-dim);">Trần né chuẩn: <strong style="color:var(--purple);">35%</strong></span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-top:12px;">
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-dim);">Địch Chậm (0.75x):</span>
              <strong style="font-size:13px; color:var(--cyan);">${p}%</strong>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-dim);">Ngang Tốc (1.0x):</span>
              <strong style="font-size:13px; color:var(--purple);">${v}%</strong>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-dim);">Thần Tốc (1.5x):</span>
              <strong style="font-size:13px; color:var(--orange);">${l}%</strong>
            </div>
          </div>
        </div>

        <!-- TALENT & ROOTS SYSTEM -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0 0 6px 0;">
            Căn Cốt Thiên Phú (Hệ Số Tăng Trưởng)
          </h3>
          <p style="font-size:11px; color:var(--text-dim); margin-bottom:12px;">
            Căn cốt quyết định hiệu quả tăng điểm khi rèn luyện thể phách tại phòng tập hoặc tu vi đột phá.
          </p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:8px; margin-bottom:14px;">
            ${Nt.map(u=>{const x=a[u.key]||{value:1,name:"Phàm Cốt",color:"#94a3b8"};return`
                <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px; text-align:center;">
                  <div style="font-size:11px; color:var(--text-dim);">${u.name}</div>
                  <div style="font-size:13px; font-weight:700; color:${x.color}; margin-top:3px;">
                    ${x.name}
                  </div>
                  <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                    Hệ số ×${x.value}
                  </div>
                </div>
              `}).join("")}
          </div>

          <div style="border-top:1px solid var(--border); padding-top:10px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="font-size:10px; color:var(--text-dim); text-transform:uppercase; margin-right:4px;">Thang Bậc Căn Cốt:</span>
              ${ue.map(u=>`
                <span class="badge" style="background:var(--bg-main); border:1px solid ${u.color}44; color:${u.color}; font-size:10px; padding:2px 6px; border-radius:2px;">
                  ${u.name} (${u.multiplier})
                </span>
              `).join("")}
            </div>

            <div style="font-size:10px; color:var(--text-dim); font-style:italic;">
              Dùng Tẩy Tủy Đan để tăng bậc · Dùng Hoán Cốt Đan để định hình lại toàn bộ
            </div>
          </div>
        </div>
      </div>
    `}}async function qt(i){const{state:t,api:e,notify:a,updateSidebar:n,renderGame:s}=i,o=t.player;if(!o)return;let r=document.getElementById("tribulation-modal-overlay");r||(r=document.createElement("div"),r.id="tribulation-modal-overlay",r.style.cssText=`
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px); z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      padding: 16px; animation: fadeIn 0.25s ease;
    `,document.body.appendChild(r)),r.innerHTML=`
    <div style="background: #121420; border: 1px solid var(--border); border-radius: 8px; max-width: 580px; width: 100%; box-shadow: 0 8px 30px rgba(0,0,0,0.8); padding: 24px; text-align: center; color: #fff;">
      <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚡</div>
      <div style="font-size: 16px; font-weight: 700; color: var(--gold); margin-top: 8px;">Đang dò xét Thiên Khí & Thăm Dò Thiên Kiếp...</div>
    </div>
  `;try{const d=await e.getTribulationPreview(o.id);ye(r,d,i)}catch(d){r.remove(),a(d.message||"Không thể tra cứu thông tin Lôi Kiếp","error")}}function ye(i,t,e){var v,l,u;const{state:a,api:n,notify:s,updateSidebar:o,renderGame:r}=e,d=t.tribulation||{},c=t.playerStats||{},p=d.color||"#eab308";i.innerHTML=`
    <div style="background: #111422; border: 1px solid var(--border); border-radius: 8px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.8); color: #fff; animation: scaleUp 0.25s ease;">
      <!-- HEADER -->
      <div style="padding: 20px 24px; border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.25); text-align: center; position: relative;">
        <span style="position: absolute; top: 16px; right: 20px; font-size: 20px; cursor: pointer; color: var(--text-dim);" id="btn-close-tribulation">✕</span>
        <div style="font-size: 28px; line-height: 1;">🌩️</div>
        <div style="font-size: 20px; font-weight: 800; color: ${p}; margin-top: 6px; letter-spacing: 0.5px;">
          ${d.name||"Thiên Lôi Giáng Trần"}
        </div>
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px; font-style: italic;">
          "${d.lore||"Thiên đạo khảo nghiệm, chín chết một sống, tắm mình trong lôi điện để tẩy thoát phàm thai."}"
        </div>
      </div>

      <div style="padding: 20px 24px;">
        <!-- TRIBULATION SPECS -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; text-align: center;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Số Đợt Sét</div>
            <div style="font-size: 18px; font-weight: 800; color: ${p}; margin-top: 2px;">${d.waves||3} Đợt</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Uy Lực Khởi Đầu</div>
            <div style="font-size: 18px; font-weight: 800; color: #ef4444; margin-top: 2px;">~${d.baseDamage||150} ST</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Gia Tăng Uy Lực</div>
            <div style="font-size: 18px; font-weight: 800; color: #f59e0b; margin-top: 2px;">+${Math.round(((d.scaling||1.3)-1)*100)}%/đợt</div>
          </div>
        </div>

        <!-- DEFENSIVE ASSESSMENT -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px; margin-bottom: 18px;">
          <div style="font-size: 13px; font-weight: 700; color: var(--gold); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>🛡️ Khả Năng Sinh Tồn & Phòng Hộ Bản Thân</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">❤️ Khí Huyết:</span>
              <span style="font-weight: 700; color: #10b981;">${c.currentHp}/${c.maxHp} HP</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🔵 Chân Khí Hộ Thể:</span>
              <span style="font-weight: 700; color: #38bdf8;">${c.usableEnergy} LL (1 LL = 2.5 HP)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🛡️ Giáp Giảm Thương:</span>
              <span style="font-weight: 700; color: #60a5fa;">-${c.defenseMitigationPct||0}% ST cơ thể</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">💨 Thân Pháp Chẻ Sét:</span>
              <span style="font-weight: 700; color: #a78bfa;">${c.dodgeChancePct||0}% né (-40% ST)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span class="text-dim">🌟 Hộ Thể Kim Chung:</span>
              <span style="font-weight: 700; color: ${c.hasGoldenBell?"#10b981":"var(--text-dim)"};">
                ${c.hasGoldenBell?"✅ Giảm thêm 20% Lôi Kiếp":"❌ Chưa kích hoạt"}
              </span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span class="text-dim">💊 Đan Dược Cứu Mạng:</span>
              <span style="font-weight: 700; color: #f59e0b;">Tự động dùng khi HP < 20%</span>
            </div>
          </div>
        </div>

        <div style="font-size: 11px; color: var(--text-dim); text-align: center; margin-bottom: 18px; line-height: 1.5;">
          ⚠️ <b>Cảnh báo:</b> Đột phá thất bại trước lôi kiếp sẽ tổn hại đan điền, rơi vào trạng thái trọng thương tịnh dưỡng 90 giây và tiêu hao một phần tài nguyên đột phá. Hãy đảm bảo đầy Máu & Linh Lực trước khi dẫn thiên lôi!
        </div>

        <!-- ACTIONS -->
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn--outline" id="btn-cancel-tribulation" style="min-width: 120px;">
            Tạm Hoãn
          </button>
          <button class="btn btn--gold btn--lg shadow-glow" id="btn-start-tribulation" style="min-width: 220px; font-weight: 800; font-size: 15px; animation: pulse 2s infinite;">
            ⚡ DẪN LÔI ĐỘ KIẾP!
          </button>
        </div>
      </div>
    </div>
  `,(v=i.querySelector("#btn-close-tribulation"))==null||v.addEventListener("click",()=>i.remove()),(l=i.querySelector("#btn-cancel-tribulation"))==null||l.addEventListener("click",()=>i.remove()),(u=i.querySelector("#btn-start-tribulation"))==null||u.addEventListener("click",async()=>{await xe(i,e,d)})}async function xe(i,t,e){var b,h,y;const{state:a,api:n,notify:s,updateSidebar:o,renderGame:r}=t,d=e.color||"#eab308";i.innerHTML=`
    <div style="background: #0d0f1a; border: 1px solid var(--border); border-radius: 8px; max-width: 620px; width: 100%; max-height: 92vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 8px 32px rgba(0,0,0,0.8); color: #fff;">
      <!-- ARENA TOP -->
      <div style="padding: 16px 20px; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); text-align: center; position: relative;" id="tribulation-arena-header">
        <div style="font-size: 14px; font-weight: 700; color: ${d}; letter-spacing: 1px;">
          ⚡ ${e.name||"THIÊN LÔI GIÁNG TRẦN"}
        </div>
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 2px;" id="tribulation-wave-indicator">
          Đang ngưng tụ lôi vân...
        </div>

        <!-- DYNAMIC BARS -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span>❤️ Khí Huyết</span>
              <span id="tri-hp-val">...</span>
            </div>
            <div class="bar-track" style="height: 10px; background: rgba(0,0,0,0.6); border-radius: 5px; overflow: hidden;">
              <div class="bar-fill hp" id="tri-hp-bar" style="width: 100%; transition: width 0.5s ease;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span>🔵 Chân Khí</span>
              <span id="tri-energy-val">...</span>
            </div>
            <div class="bar-track" style="height: 10px; background: rgba(0,0,0,0.6); border-radius: 5px; overflow: hidden;">
              <div class="bar-fill energy" id="tri-energy-bar" style="width: 100%; transition: width 0.5s ease;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- LOG STREAM -->
      <div id="tribulation-log-stream" style="flex: 1; min-height: 260px; max-height: 380px; overflow-y: auto; padding: 16px 20px; font-family: monospace; font-size: 13px; line-height: 1.6; background: rgba(0,0,0,0.4); display: flex; flex-direction: column; gap: 8px;">
        <div style="color: #94a3b8; text-align: center; font-style: italic;">
          Vòm trời cuồn cuộn mây đen... Lôi đình chực chờ xé toạc hư không!
        </div>
      </div>

      <!-- FOOTER ACTION -->
      <div style="padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.6); text-align: center;" id="tribulation-footer">
        <span style="font-size: 12px; color: var(--text-dim); animation: pulse 1.5s infinite;">
          ⚡ Đang chống đỡ Thiên Kiếp giáng hạ...
        </span>
      </div>
    </div>
  `;const c=i.querySelector("#tribulation-log-stream"),p=i.querySelector("#tribulation-wave-indicator"),v=i.querySelector("#tri-hp-bar"),l=i.querySelector("#tri-energy-bar"),u=i.querySelector("#tri-hp-val"),x=i.querySelector("#tri-energy-val"),g=i.querySelector("#tribulation-footer");try{const f=await n.attemptBreakthrough(a.playerId),m=f.tribulation;if(!m||!m.logs){f.player&&(a.player=f.player),s(f.message,f.success?"success":"error"),typeof o=="function"&&o(),i.remove(),r();return}let T=((b=f.player)==null?void 0:b.maxHp)||m.startingHp,$=m.startingHp,w=m.startingEnergy,k=((h=f.player)==null?void 0:h.maxEnergy)||Math.max(50,m.startingEnergy);u.textContent=`${$}/${T}`,x.textContent=`${w}`;const _=m.logs||[];for(let S=0;S<_.length;S++){const L=_[S];await new Promise(N=>setTimeout(N,900)),p.textContent=`ĐỢT ${L.wave}/${m.totalWaves} ĐANG GIÁNG XUỐNG!`,p.style.color="#ef4444",i.style.backgroundColor="rgba(255, 255, 255, 0.2)",setTimeout(()=>{i.style.backgroundColor="rgba(0, 0, 0, 0.88)"},80);const P=document.createElement("div");P.style.cssText=`
        padding: 8px 12px; border-radius: 6px;
        background: ${L.defeated?"rgba(239, 68, 68, 0.2)":"rgba(255, 255, 255, 0.05)"};
        border-left: 3px solid ${L.defeated?"#ef4444":L.dodged?"#a78bfa":d};
        animation: fadeIn 0.3s ease;
      `,P.innerHTML=`
        <div style="font-weight: 700; color: ${d}; margin-bottom: 2px;">
          ⚡ Đợt ${L.wave}/${m.totalWaves}: Sét Uy Lực ${L.rawDamage} ST
        </div>
        <div style="color: #e2e8f0; font-size: 12px;">${L.text}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 11px;">
          ${L.dodged?'<span style="color: #a78bfa;">💨 Chẻ sét né tránh</span>':""}
          ${L.auraMitigated?'<span style="color: #10b981;">🛡️ Kim Chung hóa giải</span>':""}
          ${L.absorbedByQi>0?`<span style="color: #38bdf8;">🔵 Chân khí hấp thụ: ${L.absorbedByQi} ST</span>`:""}
          <span style="color: #f87171;">💥 Thương tổn: -${L.actualHpDamage} HP</span>
          ${L.medicineRescued?'<span style="color: #f59e0b; font-weight:700;">💊 Dùng đan dược cứu mệnh!</span>':""}
        </div>
      `,c.appendChild(P),c.scrollTop=c.scrollHeight,$=L.hpRemaining,w=L.energyRemaining;const H=Math.max(0,Math.min(100,Math.round($/T*100))),E=Math.max(0,Math.min(100,Math.round(w/k*100)));if(v.style.width=`${H}%`,l.style.width=`${E}%`,u.textContent=`${$}/${T}`,x.textContent=`${w}`,L.defeated)break}if(await new Promise(S=>setTimeout(S,800)),f.player&&(a.player=f.player),typeof o=="function"&&o(),m.survived){p.textContent="🌟 LÔI VÂN TAN BIẾN • ĐỘ KIẾP VIÊN MÃN",p.style.color="#10b981";const S=document.createElement("div");S.style.cssText=`
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(16, 185, 129, 0.2));
        border: 2px solid #eab308; border-radius: 8px; padding: 14px; text-align: center;
        margin-top: 8px; animation: scaleUp 0.3s ease;
      `,S.innerHTML=`
        <div style="font-size: 24px;">👑</div>
        <div style="font-size: 16px; font-weight: 800; color: #eab308; margin-top: 4px;">
          ĐỘT PHÁ THÀNH CÔNG!
        </div>
        <div style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
          ${f.message}
        </div>
      `,c.appendChild(S),c.scrollTop=c.scrollHeight,g.innerHTML=`
        <button class="btn btn--gold btn--lg shadow-glow" id="btn-finish-tribulation" style="min-width: 200px; font-weight: 700;">
          🌟 ĐÓN NHẬN TIÊN PHÁP
        </button>
      `,s(f.message,"success")}else{p.textContent="☠️ TRỌNG THƯƠNG • ĐỘT PHÁ THẤT BẠI",p.style.color="#ef4444";const S=document.createElement("div");S.style.cssText=`
        background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; border-radius: 8px;
        padding: 14px; text-align: center; margin-top: 8px; animation: scaleUp 0.3s ease;
      `,S.innerHTML=`
        <div style="font-size: 24px;">☠️</div>
        <div style="font-size: 15px; font-weight: 800; color: #ef4444; margin-top: 4px;">
          ĐỘT PHÁ THẤT BẠI!
        </div>
        <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
          ${f.message}
        </div>
      `,c.appendChild(S),c.scrollTop=c.scrollHeight,g.innerHTML=`
        <button class="btn btn--dark" id="btn-finish-tribulation" style="min-width: 180px;">
          🏥 VỀ DƯỠNG THƯƠNG
        </button>
      `,s(f.message,"error")}(y=i.querySelector("#btn-finish-tribulation"))==null||y.addEventListener("click",()=>{i.remove(),r()})}catch(f){s(f.message||"Lỗi trong quá trình độ kiếp","error"),i.remove(),r()}}class fe extends M{initialState(){var e;return{activeTab:((e=(this.props.ctx||{}).state)==null?void 0:e._statsTab)||"training",realmData:null,loading:!0}}template(){var s,o;const{ctx:t}=this.props,e=((s=t==null?void 0:t.state)==null?void 0:s.player)||{},a=((o=e.realmInfo)==null?void 0:o.fullName)||"Phàm Nhân";return`
      <div class="stats-page">
        <!-- HEADER -->
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
          <div>
            <h1 style="display:flex; align-items:center; gap:8px; margin:0; font-size:18px; font-weight:700;">
              Tu Luyện & Cảnh Giới
            </h1>
            <div class="text-sm text-dim" style="font-size:12px; color:var(--text-dim); margin-top:2px;">
              Rèn luyện tứ đại thuộc tính thể phách, ngưng tụ tu vi và phá vỡ bình cảnh thiên kiếp.
            </div>
          </div>

          <!-- SUMMARY CHIP -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:4px; padding:6px 12px; font-size:12px; display:flex; align-items:center; gap:8px;">
            <span class="badge" style="background:rgba(194,159,85,0.15); border:1px solid var(--gold); color:var(--gold); font-size:10px; font-weight:700; padding:1px 6px; border-radius:2px;">
              Lv.${e.level||1}
            </span>
            <strong style="color:var(--text-bright);">${a}</strong>
            <span style="color:var(--text-dim);">·</span>
            <span style="color:var(--cyan); font-weight:600;">${e.currentStamina??100}/${e.maxStamina??100} Thể Lực</span>
          </div>
        </div>

        <!-- TABS BAR MOUNT -->
        <div id="statsTabsNav" style="margin-bottom:12px;"></div>

        <!-- SUBVIEW CONTAINER -->
        <div id="statsTabContent"></div>
      </div>
    `}async onMounted(){await this.loadRealmData(),this.renderTabs(),this.renderActiveSubView()}onUpdated(){this.renderTabs(),this.renderActiveSubView()}onUnmounted(){this._currentSubView&&(this._currentSubView.unmount(),this._currentSubView=null),this._tabsComponent&&(this._tabsComponent.unmount(),this._tabsComponent=null)}async loadRealmData(){const{ctx:t}=this.props;if(!t)return;const e=t.state.playerId;try{const a=await t.api.getRealmInfo(e);this.setState({realmData:a,loading:!1})}catch{this.setState({loading:!1})}}renderTabs(){var o,r,d;const t=(o=this.container)==null?void 0:o.querySelector("#statsTabsNav");if(!t)return;this._tabsComponent&&(this._tabsComponent.unmount(),this._tabsComponent=null);const{ctx:e}=this.props,n=!!((d=(((r=e==null?void 0:e.state)==null?void 0:r.player)||{}).realmInfo)!=null&&d.canBreakthrough),s=[{id:"training",label:"Rèn Luyện Thể Phách"},{id:"realm",label:"Cảnh Giới & Đột Phá",badge:n?"!":null},{id:"mechanics",label:"Cơ Chế & Căn Cốt"}];this._tabsComponent=new ot({tabs:s,activeTab:this.state.activeTab,onTabChange:c=>{e!=null&&e.state&&(e.state._statsTab=c),this.setState({activeTab:c})}}),this._tabsComponent.mount(t)}renderActiveSubView(){var o,r;const t=(o=this.container)==null?void 0:o.querySelector("#statsTabContent");if(!t)return;this._currentSubView&&(this._currentSubView.unmount(),this._currentSubView=null);const{ctx:e}=this.props,a=((r=e==null?void 0:e.state)==null?void 0:r.player)||{},{activeTab:n,realmData:s}=this.state;n==="training"?this._currentSubView=new ve({player:a,onTrain:(d,c)=>this.handleTrain(d,c)}):n==="realm"?this._currentSubView=new be({player:a,realmData:s||{current:a.realmInfo},onBreakthrough:()=>this.handleBreakthrough()}):n==="mechanics"&&(this._currentSubView=new me({player:a})),this._currentSubView&&this._currentSubView.mount(t)}async handleTrain(t,e){var s;const{ctx:a}=this.props,n=(s=a==null?void 0:a.state)==null?void 0:s.playerId;try{const o=await a.api.trainStat(n,t,e);a.state.player=o.player,a.notify(o.message,"success"),a.updateSidebar(),this.update()}catch(o){a.notify(o.message||"Lỗi rèn luyện","error")}}handleBreakthrough(){const{ctx:t}=this.props;qt(t)}}let U=null;async function $e(i,t){U&&(U.unmount(),U=null),U=new fe({ctx:t}),U.mount(i)}const Te={1:55,2:45,3:40,4:35,5:30,6:25,7:20};function nt(i=1){switch(i){case 1:return 2;case 2:return 3;case 3:return 4;case 4:return 5;default:return 6}}const we={ho_the_kim_chung:{id:"ho_the_kim_chung",name:"Hộ Thể Kim Chung",icon:"🛡️",reservationPct:20,desc:"Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp khi độ kiếp.",statBonuses:{defense:25,maxHp:100}},than_hanh_bo:{id:"than_hanh_bo",name:"Thần Hành Hào Quang",icon:"💨",reservationPct:15,desc:"Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.",statBonuses:{speed:20,dexterity:15}},hoa_diem_chan_khi:{id:"hoa_diem_chan_khi",name:"Hỏa Diễm Chân Khí",icon:"🔥",reservationPct:25,desc:"Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.",statBonuses:{strength:25,critChance:10}},toa_thien:{id:"toa_thien",name:"Toạ Thiền Tụ Khí",icon:"🧘",reservationPct:10,desc:"Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực (+5 HP & +2 TL / 10s).",statBonuses:{hpRegen:5,staminaRegen:2}}};function ke(i,t={},e=!0){var r;const a=i.triggerChance||Te[i.tier||1]||40,n=Math.floor((((r=t.stats)==null?void 0:r.dexterity)||10)/10),s=Math.max(0,(i.level||1)-1),o=t.activeStance==="breaker"?5:0;return e?Math.min(85,Math.max(15,a+s+n+o)):a}class Rt extends M{template(){const{skill:t,isLearned:e=!0,canEquip:a=!0,player:n={}}=this.props,s=t,o=(s.level||1)*100,r=Math.min(100,(s.xp||0)/o*100),d=s.type==="passive",c="★".repeat(Math.min(s.tier||1,7)),p=(s.tier||1)>=5?"var(--gold, #facc15)":(s.tier||1)>=3?"var(--purple, #c084fc)":"var(--blue, #60a5fa)";let v="";e?d?v='<span style="font-size:11px; font-weight:700; color:var(--green, #4ade80)">🧘 Tâm Pháp Thường Trực</span>':s.equipped?v=`<button class="btn btn--sm btn--red btn-equip-toggle" data-eq="0" data-sid="${s.id}" style="padding:4px 10px; font-size:11px">Tháo</button>`:v=`<button class="btn btn--sm ${a?"btn--blue":"btn--outline"} btn-equip-toggle" data-eq="1" data-sid="${s.id}" ${a?"":'disabled title="Đã đầy ô kỹ năng!"'} style="padding:4px 10px; font-size:11px">Trang Bị</button>`:v='<span class="text-dim" style="font-size:11px; color:var(--text-dim)">Chưa lĩnh ngộ</span>';const l=ke(s,n,e);return`
      <div class="skill-card ${e?"":"locked"} ${s.equipped&&!d?"equipped":""}" style="background:var(--bg-card, #1a1e29); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between">
        <div>
          <div class="skill-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px">
            <div>
              <div class="skill-card-name" style="font-size: 14px; font-weight:700; color:var(--text-bright, #fff)">${s.name}</div>
              <div class="skill-card-tier" style="color:${p}; font-size:11px">${c} Tầng ${s.tier||1} • ${d?"Tâm Pháp":"Chiêu Thức"}</div>
            </div>
            <div class="skill-card-action">${v}</div>
          </div>
          <div class="skill-card-desc" style="font-size:12px; color:var(--text-dim, #94a3b8); margin-bottom:10px; line-height:1.4">${s.description||"Tuyệt kỹ thượng thừa tu chân giới."}</div>
        </div>

        <div>
          ${e?`
            <div class="skill-card-mastery" style="background:rgba(0,0,0,0.25); border-radius:6px; padding:6px 10px; margin-bottom:8px">
              <div class="skill-mastery-label" style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px">
                <span style="font-weight:600">Thông thạo Lv.${s.level}</span>
                <span class="text-dim" style="color:var(--text-dim)">${s.xp||0}/${o} XP</span>
              </div>
              <div class="bar-track" style="height:4px; background:rgba(255,255,255,0.08); border-radius:2px; overflow:hidden">
                <div class="bar-fill xp" style="width:${r}%; height:100%; background:var(--gold, #facc15)"></div>
              </div>
              ${s.masteryBonus?`<div class="skill-mastery-bonus" style="font-size:11px; color:var(--gold, #facc15); margin-top:4px">✨ ${s.masteryBonus}</div>`:""}
            </div>
          `:`
            <div class="skill-card-req" style="margin-bottom:8px">
              ${(s.requirements||[]).map(u=>`<span class="req-tag" style="background:rgba(255,255,255,0.05); padding:2px 6px; border-radius:4px; font-size:10px">🔒 ${u}</span>`).join(" ")}
            </div>
          `}

          ${d?"":`
            <div class="skill-card-cost" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.06); font-size:11px">
              <span>🔵 ${s.cost||0} Linh Lực</span>
              <span style="color:#f59e0b; font-weight:700">🎯 Xuất chiêu: ${l}%</span>
            </div>
          `}
        </div>
      </div>
    `}bindEvents(){this.on("click",".btn-equip-toggle",(t,e)=>{t.stopPropagation();const a=e.dataset.eq==="1",n=e.dataset.sid;this.props.onEquipToggle&&this.props.onEquipToggle(n,a)})}}class Se extends M{initialState(){return{skillFilter:"all"}}template(){var p,v;const{ctx:t}=this.props,e=((p=t==null?void 0:t.state)==null?void 0:p.player)||{},a=e.skills||[],n=((v=t==null?void 0:t.state)==null?void 0:v.skills)||[],s=nt(e.realmTier||1),r=a.map(l=>{const u=typeof l=="string"?l:l.id;return{...n.find(g=>g.id===u)||{name:u,id:u,category:"combat",type:"active"},level:l.level||1,xp:l.xp||l.currentXp||0,equipped:l.equipped||l.isEquipped||!1}}).filter(l=>l.type!=="passive"),d=r.filter(l=>l.equipped);let c=r;return this.state.skillFilter==="equipped"&&(c=r.filter(l=>l.equipped)),this.state.skillFilter==="unequipped"&&(c=r.filter(l=>!l.equipped)),`
      <div class="combat-pillar-view">
        <!-- LOADOUT SLOTS -->
        <div class="loadout-bar" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="font-weight: 700; color: var(--gold, #facc15); font-size: 14px; display: flex; align-items: center; gap: 6px;">
              <span>⚔️ Ô Xuất Chiêu Thực Chiến:</span>
              <span style="color: #fff;">${d.length}/${s}</span>
            </div>
            <div class="text-dim text-xs" style="margin-top: 2px; font-size:11px; color:var(--text-dim)">
              Cảnh giới hiện tại cho phép trang bị tối đa <b>${s}</b> chiêu thức. Mỗi hiệp đấu sẽ tung xúc xắc theo <b>xác suất kích hoạt</b> và tiêu hao Linh Lực thực chiến.
            </div>
          </div>
          <div class="loadout-slots" style="display: flex; gap: 8px;">
            ${Array.from({length:s}).map((l,u)=>{const x=d[u];return x?`<div class="loadout-slot filled" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(59, 130, 246, 0.15); border: 1px solid var(--blue, #3b82f6); border-radius: 6px; font-size: 18px;" title="${x.name} (Lv.${x.level})">⚔️</div>`:'<div class="loadout-slot" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; font-size: 14px; color: var(--text-dim);" title="Ô trống">➕</div>'}).join("")}
          </div>
        </div>

        <!-- FILTER TABS -->
        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <button class="mastery-filter-btn ${this.state.skillFilter==="all"?"active":""}" data-sfilter="all">Tất Cả Chiêu Thức (${r.length})</button>
          <button class="mastery-filter-btn ${this.state.skillFilter==="equipped"?"active":""}" data-sfilter="equipped">Đã Trang Bị (${d.length})</button>
          <button class="mastery-filter-btn ${this.state.skillFilter==="unequipped"?"active":""}" data-sfilter="unequipped">Chưa Trang Bị (${r.length-d.length})</button>
        </div>

        <!-- SKILLS GRID -->
        <div class="skill-grid" id="combatSkillsGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px">
          ${c.length===0?`
            <div class="text-dim" style="padding: 20px; text-align:center; grid-column: 1 / -1">Chưa có chiêu thức kích hoạt nào trong danh mục này. Hãy đến Tàng Kinh Các để thỉnh bí kíp!</div>
          `:""}
        </div>
      </div>
    `}onMounted(){this.renderCards()}onUpdated(){this.renderCards()}renderCards(){var v,l;const t=this.container.querySelector("#combatSkillsGrid");if(!t)return;const{ctx:e}=this.props,a=((v=e==null?void 0:e.state)==null?void 0:v.player)||{},n=a.skills||[],s=((l=e==null?void 0:e.state)==null?void 0:l.skills)||[],o=nt(a.realmTier||1),d=n.map(u=>{const x=typeof u=="string"?u:u.id;return{...s.find(b=>b.id===x)||{name:x,id:x,category:"combat",type:"active"},level:u.level||1,xp:u.xp||u.currentXp||0,equipped:u.equipped||u.isEquipped||!1}}).filter(u=>u.type!=="passive"),c=d.filter(u=>u.equipped);let p=d;this.state.skillFilter==="equipped"&&(p=d.filter(u=>u.equipped)),this.state.skillFilter==="unequipped"&&(p=d.filter(u=>!u.equipped)),t.innerHTML="",p.forEach(u=>{const x=document.createElement("div");new Rt({skill:u,isLearned:!0,canEquip:c.length<o,player:a,onEquipToggle:(b,h)=>this.toggleEquip(b,h)}).mount(x),t.appendChild(x.firstElementChild)})}async toggleEquip(t,e){var s,o,r;const{ctx:a}=this.props,n=((s=a==null?void 0:a.state)==null?void 0:s.playerId)||((r=(o=a==null?void 0:a.state)==null?void 0:o.player)==null?void 0:r.id);if(!(!a||!n))try{const d=await a.api.equipSkill(n,t,e);a.state.player=d.player,a.notify(d.message,"success"),a.updateSidebar&&a.updateSidebar(),this.props.onSkillEquipped&&this.props.onSkillEquipped(d),this.update()}catch(d){a.notify(d.message||"Lỗi trang bị chiêu thức","error")}}bindEvents(){this.on("click","[data-sfilter]",(t,e)=>{this.setState({skillFilter:e.dataset.sfilter})})}}const Ce={defense:"Phòng Ngự",maxHp:"Khí Huyết",speed:"Tốc Độ",dexterity:"Thân Pháp",strength:"Lực Đạo",critChance:"% Bạo Kích",hpRegen:"Hồi Máu/10s",staminaRegen:"Hồi Thể Lực/10s"};class _e extends M{template(){var u,x;const{ctx:t}=this.props,e=((u=t==null?void 0:t.state)==null?void 0:u.player)||{},a=e.skills||[],n=((x=t==null?void 0:t.state)==null?void 0:x.skills)||[],o=a.map(g=>{const b=typeof g=="string"?g:g.id;return{...n.find(y=>y.id===b)||{name:b,id:b,category:"mind",type:"passive"},level:g.level||1,xp:g.xp||g.currentXp||0,equipped:!0}}).filter(g=>g.type==="passive"),r=e.auraConfigs||we,d=e.activeAuras||[],c=e.reservedEnergy||0,p=e.usableEnergy??Math.max(0,(e.maxEnergy||100)-c),v=e.reservationPct||0,l=e.maxEnergy>0?Math.round(p/e.maxEnergy*100):100;return`
      <div class="auras-pillar-view">
        <!-- MANA RESERVATION HERO BANNER -->
        <div class="card" style="margin-bottom: 16px; border: 1px solid var(--border); background: var(--bg-panel-alt); padding: 18px; border-radius:8px">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
            <div>
              <div style="font-weight: 700; font-size: 16px; color: var(--gold, #facc15); display: flex; align-items: center; gap: 8px;">
                <span>🧘 Cơ Chế Khóa Linh Lực (Mana Reservation)</span>
              </div>
              <div class="text-dim text-xs" style="margin-top: 4px; font-size:11px; color:var(--text-dim)">
                Tâm pháp hào quang duy trì liên tục trong và ngoài chiến đấu. Mỗi hào quang khóa một tỷ lệ Linh Lực tối đa để ban phước chỉ số vĩnh viễn (Tối đa khóa 85%).
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 13px; font-weight: 600;">
                Linh Lực Khả Dụng: <span style="color: #82a4d4; font-size: 16px; font-weight: 700;">${p}</span> / ${e.maxEnergy||100}
              </div>
              <div style="font-size: 12px; color: #dfcfb2; margin-top: 2px;">
                Đã khóa: <b>${c}</b> LL (${v}% / 85% tối đa)
              </div>
            </div>
          </div>

          <!-- SPLIT RESERVATION BAR -->
          <div style="position: relative; height: 12px; background: rgba(0, 0, 0, 0.5); border-radius: 4px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); display: flex; margin-bottom: 12px;">
            <div style="width: ${l}%; background: #4a6c96; transition: width 0.4s ease;" title="Linh Lực Khả Dụng: ${p}"></div>
            <div style="width: ${v}%; background: #9c773a; transition: width 0.4s ease;" title="Linh Lực Bị Khóa: ${c} (${v}%)"></div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim);">
            <span style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #4a6c96;"></span> Linh Lực Khả Dụng (Dùng cho Chiêu Thức)</span>
            <span style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #9c773a;"></span> Linh Lực Bị Khóa (Duy Trì Hào Quang)</span>
          </div>
        </div>

        <!-- AURA GRID -->
        <div style="margin-bottom: 24px;">
          <div style="font-weight: 700; color: var(--gold, #facc15); font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            <span>🌟 Danh Mục Tâm Pháp Hào Quang</span>
            <span class="text-dim text-xs font-normal" style="font-size:11px; color:var(--text-dim)">(${d.length}/${Object.keys(r).length} đang bật)</span>
          </div>

          <div class="skill-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px">
            ${Object.values(r).map(g=>{const b=d.includes(g.id),h=!b&&v+g.reservationPct>85;return`
                <div class="skill-card ${b?"equipped":""}" style="background:var(--bg-card, #161a23); border:1px solid ${b?"rgba(234, 179, 8, 0.5)":"rgba(255,255,255,0.08)"}; border-radius:6px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; ${b?"box-shadow: 0 0 10px rgba(234, 179, 8, 0.12);":""}">
                  <div>
                    <div class="skill-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px">
                      <div>
                        <div class="skill-card-name" style="font-size: 13px; font-weight:700; color:var(--text-bright); display: flex; align-items: center; gap: 6px;">
                          <span>${g.icon}</span>
                          <span>${g.name}</span>
                        </div>
                        <div class="skill-card-tier" style="color: #f59e0b; font-size:11px; margin-top:2px">Khóa ${g.reservationPct}% Linh Lực (${Math.floor((e.maxEnergy||100)*(g.reservationPct/100))} LL)</div>
                      </div>
                      <div class="skill-card-action">
                        <button class="btn btn--sm ${b?"btn--gold":"btn--outline"} btn-toggle-aura" data-aura="${g.id}" ${h?'disabled title="Vượt quá 85% Linh Lực khóa tối đa!"':""} style="padding:3px 10px; font-size:11px; min-width:85px">
                          ${b?"Đang Duy Trì":"Kích Hoạt"}
                        </button>
                      </div>
                    </div>
                    <div class="skill-card-desc" style="margin-top: 6px; font-size:11.5px; color:var(--text-dim); line-height:1.4">${g.desc}</div>
                  </div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                    ${Object.entries(g.statBonuses||{}).map(([y,f])=>`
                      <span class="req-tag" style="background: rgba(234, 179, 8, 0.08); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.2); padding:2px 6px; border-radius:3px; font-size:10.5px">
                        +${f} ${Ce[y]||y}
                      </span>
                    `).join("")}
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- PERMANENT PASSIVE TECHNIQUES -->
        <div>
          <div style="font-weight: 700; color: var(--gold, #facc15); font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            <span>🧘 Tâm Pháp Thường Trực Đã Lĩnh Ngộ</span>
            <span class="text-dim text-xs font-normal" style="font-size:11px; color:var(--text-dim)">(${o.length} tâm pháp)</span>
          </div>

          ${o.length>0?`
            <div class="skill-grid" id="passiveSkillsGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px"></div>
          `:`
            <div class="panel" style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 12px; background:var(--bg-surface, #151922); border-radius:8px">
              Chưa lĩnh ngộ tâm pháp bị động thường trực nào. Hãy đến Tàng Kinh Các để thỉnh giáo các bí kíp công pháp thượng thừa!
            </div>
          `}
        </div>
      </div>
    `}onMounted(){this.renderPassiveCards()}onUpdated(){this.renderPassiveCards()}renderPassiveCards(){var d,c;const t=this.container.querySelector("#passiveSkillsGrid");if(!t)return;const{ctx:e}=this.props,a=((d=e==null?void 0:e.state)==null?void 0:d.player)||{},n=a.skills||[],s=((c=e==null?void 0:e.state)==null?void 0:c.skills)||[],r=n.map(p=>{const v=typeof p=="string"?p:p.id;return{...s.find(u=>u.id===v)||{name:v,id:v,category:"mind",type:"passive"},level:p.level||1,xp:p.xp||p.currentXp||0,equipped:!0}}).filter(p=>p.type==="passive");t.innerHTML="",r.forEach(p=>{const v=document.createElement("div");new Rt({skill:p,isLearned:!0,player:a}).mount(v),t.appendChild(v.firstElementChild)})}bindEvents(){this.on("click",".btn-toggle-aura",async(t,e)=>{var r,d,c;if(e.disabled)return;const a=e.dataset.aura,{ctx:n}=this.props,s=((r=n==null?void 0:n.state)==null?void 0:r.playerId)||((c=(d=n==null?void 0:n.state)==null?void 0:d.player)==null?void 0:c.id);if(!n||!s||!a)return;const o=e.textContent;e.disabled=!0,e.textContent="Đang xử lý...";try{const p=await n.api.toggleAura(s,a);n.state.player=p.player,n.notify(p.message,"success"),n.updateSidebar&&n.updateSidebar(),this.props.onAuraToggled&&this.props.onAuraToggled(p),this.update()}catch(p){n.notify(p.message||"Lỗi bật/tắt hào quang","error"),e.disabled=!1,e.textContent=o}})}}class Le extends M{initialState(){return{monsterFilterRealm:"all"}}template(){const{masteryData:t}=this.props;if(!t)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `;const{totalKills:e,totalSpecies:a,tierCounts:n,monsters:s=[]}=t,o=["all","Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh"],{monsterFilterRealm:r}=this.state,d=s.filter(c=>r==="all"?!0:(c.tierName||"").includes(r));return`
      <div class="monsters-pillar-view">
        <!-- BESTIARY HERO -->
        <div class="mastery-hero" style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:14px">
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:120px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color:var(--gold, #facc15)">${(e||0).toLocaleString()}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Tổng Yêu Thú Đã Trảm</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:120px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color:var(--text-bright)">${a||0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Loài Trong Giới Đồ</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #3b82f6;">${(n==null?void 0:n[1])||0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Chớm Ngộ (1★)</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #10b981;">${(n==null?void 0:n[2])||0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Thuần Thục (2★)</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #8b5cf6;">${(n==null?void 0:n[3])||0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Đại Thành (3★)</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #f59e0b;">${(n==null?void 0:n[4])||0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Khắc Chế (4★)</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #ef4444;">${(n==null?void 0:n[5])||0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Tuyệt Diệt (5★)</div>
          </div>
        </div>

        <!-- REALM FILTER -->
        <div class="mastery-filter-bar" style="display:flex; gap:6px; margin-bottom:14px; align-items:center; overflow-x:auto; padding-bottom:4px">
          <span class="text-dim text-xs" style="margin-right: 4px; font-size:11px; color:var(--text-dim)">Cảnh Giới:</span>
          ${o.map(c=>`
            <button class="mastery-filter-btn ${r===c?"active":""}" data-mrealm="${c}">
              ${c==="all"?"Tất Cả":c}
            </button>
          `).join("")}
        </div>

        <!-- MONSTER CARDS GRID -->
        <div class="monster-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px">
          ${d.map(c=>{var x,g,b,h,y;const p=c.mastery||{},v=(p.tier||0)===0&&(p.kills||0)===0,l=p.isMaxTier,u=p.badgeColor||"#6b7280";return`
              <div class="monster-mastery-card ${v?"fog":""} ${p.tier===5?"apex":""}" style="background:var(--bg-card, #1a1e29); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between">
                <div>
                  <div class="monster-card-top" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px">
                    <div>
                      <div class="monster-card-name" style="font-size:14px; font-weight:700; color:var(--text-bright)">
                        <span>${v?"🌫️":"🐺"}</span>
                        <span>${c.name}</span>
                      </div>
                      <div class="text-dim text-xs" style="margin-top: 2px; font-size:11px; color:var(--text-dim)">
                        ${c.tierName||"Phàm Cấp"} • Ngũ Hành: <b>${c.element||"Vô"}</b>
                      </div>
                    </div>
                    <span class="monster-tier-tag" style="color: ${u}; border:1px solid ${u}; padding:1px 6px; border-radius:4px; font-size:11px">
                      ${p.tierName||"Vô Tri"}
                    </span>
                  </div>

                  <div class="monster-kills-row" style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px">
                    <span class="monster-stars-display" style="color: ${u}; font-weight:700">${p.stars||"☆☆☆☆☆"}</span>
                    <span>Đã trảm: <b>${p.kills||0}</b> con</span>
                  </div>

                  <!-- PROGRESS BAR -->
                  <div class="bar-track" style="height: 5px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden; margin-bottom: 8px;">
                    <div class="bar-fill" style="width: ${p.tierProgress||0}%; background: ${u}; height:100%"></div>
                  </div>
                  ${l?`
                    <div class="text-xs" style="color: #ef4444; font-weight: 700; margin-bottom: 6px; font-size:11px">
                      👑 Đạt cảnh giới Tuyệt Diệt tối cao!
                    </div>
                  `:`
                    <div class="text-dim text-xs" style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size:11px; color:var(--text-dim)">
                      <span>Tiến độ lên Tầng ${p.nextTier}</span>
                      <span>${p.kills}/${p.nextTierReq} kills</span>
                    </div>
                  `}

                  <!-- STATS PREVIEW -->
                  ${v?`
                    <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin-bottom: 8px;">
                      🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá sinh mệnh và thuộc tính!
                    </div>
                  `:`
                    <div class="monster-stats-box" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; background:rgba(0,0,0,0.25); border-radius:6px; padding:6px; font-size:11px; margin-bottom:8px">
                      <div>HP: <b>${((x=c.stats)==null?void 0:x.hp)??0}</b></div>
                      <div>Công: <b>${((g=c.stats)==null?void 0:g.strength)??0}</b></div>
                      <div>Thủ: <b>${((b=c.stats)==null?void 0:b.defense)??0}</b></div>
                      <div>Tốc: <b>${((h=c.stats)==null?void 0:h.speed)??0}</b></div>
                      <div>Thân: <b>${((y=c.stats)==null?void 0:y.dexterity)??0}</b></div>
                      <div>XP: <b>+${c.xpReward??0}</b></div>
                    </div>
                  `}
                </div>

                <!-- ACTIVE BUFFS -->
                <div>
                  ${p.tier>=2?`
                    <div class="monster-buff-active" style="font-size:11px; color:var(--gold, #facc15); background:rgba(255,215,0,0.06); padding:4px 8px; border-radius:4px">
                      ✨ <b>Khắc chế đang kích hoạt:</b> ${p.desc}
                    </div>
                  `:`
                    <div class="text-dim text-xs" style="margin-top: 4px; font-style: italic; font-size:10px; color:var(--text-dim)">
                      🔒 Tầng 2 (20 kills) kích hoạt +10% Sát thương lên loài này.
                    </div>
                  `}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}bindEvents(){this.on("click","[data-mrealm]",(t,e)=>{this.setState({monsterFilterRealm:e.dataset.mrealm})})}}class Pe extends M{template(){const{masteryData:t,player:e={}}=this.props;if(!t)return`
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `;const{craftingLevel:a,craftingXp:n,xpToNext:s,progressPercent:o,title:r,badgeColor:d,perks:c,recipes:p=[]}=t;return`
      <div class="crafting-pillar-view">
        <!-- HERO BANNER -->
        <div class="crafting-hero" style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:8px; padding:18px; margin-bottom:14px">
          <div class="crafting-hero-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
            <div class="crafting-hero-title" style="font-weight:700; font-size:16px; color:var(--gold, #facc15); display:flex; align-items:center; gap:8px">
              <span>🔥</span>
              <span>Thông Thạo Đan Đạo & Chế Tác</span>
            </div>
            <span class="crafting-rank-badge" style="background: ${d||"#d97706"}; color:#fff; font-size:11px; padding:3px 8px; border-radius:4px; font-weight:700">
              ${r||"Đan Đồng"} (Lv.${a||1})
            </span>
          </div>

          <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
            <span>Kinh Nghiệm Luyện Chế: <b>${n||0} / ${s||100} XP</b></span>
            <span style="color: var(--gold, #facc15); font-weight:700">${o||0}%</span>
          </div>
          <div class="bar-track" style="height: 6px; background:rgba(0,0,0,0.4); border-radius:3px; overflow:hidden; margin-bottom: 12px;">
            <div class="bar-fill" style="width: ${o||0}%; height:100%; background: #9c773a;"></div>
          </div>
          <div class="text-dim text-xs" style="font-size:11px; color:var(--text-dim)">Mỗi lần luyện chế thành công hoặc thất bại đều tích lũy đan đạo chi lực, tôi luyện trình độ đan sư.</div>

          <!-- CRAFTING PERKS -->
          <div class="crafting-perks-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-top:14px">
            <div class="crafting-perk-item" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 12px; display:flex; gap:10px; align-items:center">
              <div class="crafting-perk-icon" style="font-size:20px">🎯</div>
              <div class="crafting-perk-info">
                <div class="crafting-perk-name" style="font-size:11px; color:var(--text-dim)">Tỷ Lệ Thành Công</div>
                <div class="crafting-perk-val" style="font-size:12px; font-weight:700; color:var(--green, #4ade80)">+${(c==null?void 0:c.successBonusPct)??0}% tỷ lệ luyện thành</div>
              </div>
            </div>

            <div class="crafting-perk-item" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 12px; display:flex; gap:10px; align-items:center">
              <div class="crafting-perk-icon" style="font-size:20px">✨</div>
              <div class="crafting-perk-info">
                <div class="crafting-perk-name" style="font-size:11px; color:var(--text-dim)">Xác Suất Đại Thành</div>
                <div class="crafting-perk-val" style="font-size:12px; font-weight:700; color:var(--gold, #facc15)">${(c==null?void 0:c.critQualityChance)??0}% (Tinh/Cực/Thiên)</div>
              </div>
            </div>

            <div class="crafting-perk-item" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 12px; display:flex; gap:10px; align-items:center">
              <div class="crafting-perk-icon" style="font-size:20px">🛡️</div>
              <div class="crafting-perk-info">
                <div class="crafting-perk-name" style="font-size:11px; color:var(--text-dim)">Bảo Toàn Dược Liệu</div>
                <div class="crafting-perk-val" style="font-size:12px; font-weight:700; color:#38bdf8">Thu hồi ${(c==null?void 0:c.materialReturnRate)??0}% khi nổ lò</div>
              </div>
            </div>

            <div class="crafting-perk-item" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 12px; display:flex; gap:10px; align-items:center">
              <div class="crafting-perk-icon" style="font-size:20px">🌟</div>
              <div class="crafting-perk-info">
                <div class="crafting-perk-name" style="font-size:11px; color:var(--text-dim)">Thiên Phẩm Đan</div>
                <div class="crafting-perk-val" style="font-size:12px; font-weight:700; color:#c084fc">${c!=null&&c.canCraftDivine?"✅ Đã kích hoạt":"🔒 Yêu cầu Lv.76+"}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- RECIPES & CRAFTING SHORTCUT -->
        <div class="panel" style="background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08); overflow:hidden">
          <div class="panel-title" style="display: flex; justify-content: space-between; align-items: center; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05); font-weight:600">
            <span>📜 Đan Phương & Công Thức Chế Tác (${p.length})</span>
          </div>
          <div class="panel-body" style="padding:14px">
            <div class="shop-items-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px">
              ${p.map(v=>{const l=v.materials||[],u=l.every(b=>{var h;return(((h=e.materials)==null?void 0:h[b.id])||0)>=b.amount}),x=(e.gold||0)>=(v.cost||0),g=u&&x;return`
                  <div class="shop-item-card" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px; display:flex; flex-direction:column; justify-content:space-between">
                    <div>
                      <div class="shop-item-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px">
                        <div>
                          <div class="shop-item-name" style="font-weight:700; font-size:13px; color:var(--text-bright)">${v.name}</div>
                          <div class="shop-item-rarity text-dim" style="font-size:11px; color:var(--text-dim)">Tầng ${v.tier||1} • Cơ bản ${v.successRate}%</div>
                        </div>
                        <span class="badge" style="background: rgba(208, 165, 48, 0.15); color: var(--gold, #facc15); font-size:11px; padding:2px 6px; border-radius:4px">
                          Tốn ${v.cost||0} 💰
                        </span>
                      </div>
                      <div class="shop-item-desc" style="margin-bottom: 8px; font-size:11px; line-height:1.4">
                        Dược liệu yêu cầu:<br/>
                        ${l.map(b=>{var f;const h=((f=e.materials)==null?void 0:f[b.id])||0;return`<span style="color: ${h>=b.amount?"var(--green, #4ade80)":"var(--red, #f87171)"};">• ${b.id} (${h}/${b.amount})</span>`}).join("<br/>")}
                      </div>
                    </div>
                    <div class="shop-item-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; border-top:1px solid rgba(255,255,255,0.05); padding-top:6px">
                      <span class="text-xs text-dim" style="font-size:10px; color:var(--text-dim)">${v.craftTime?`Thời gian: ${v.craftTime}s`:"Lập tức"}</span>
                      <button class="btn btn--sm ${g?"btn--gold":"btn--outline"} btn-craft-action" data-rid="${v.id}" ${g?"":"disabled"} style="font-size:11px; padding:3px 8px">
                        ${g?"🔥 Luyện Chế":"Thiếu Liệu"}
                      </button>
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>
        </div>
      </div>
    `}bindEvents(){this.on("click",".btn-craft-action",async(t,e)=>{const a=e.dataset.rid,{ctx:n}=this.props;if(!(!n||!a)){e.disabled=!0,e.textContent="⏳...";try{const s=await n.api.craftItem(n.state.player.id,a);n.state.player=s.player,n.notify(s.message,s.success?"success":"error"),n.updateSidebar&&n.updateSidebar(),this.update()}catch(s){n.notify(s.message||"Lỗi luyện chế","error"),e.disabled=!1,e.textContent="🔥 Luyện Chế"}}})}}async function Bt(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.player;if(o){i.innerHTML=`
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `;try{const d=(await a.getGlitches(o.id)).status,c=i.querySelector("#glitchContentWrapper");if(!c)return;if(!d.featureUnlocked){Ee(c,d.featureDetails,o);return}ze(c,d,o,t)}catch(r){i.innerHTML=`
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${r.message||"Lỗi kết nối máy chủ"}</div>
      </div>
    `}}}function Ee(i,t,e){const a=(t==null?void 0:t.requirements)||[];i.innerHTML=`
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
          ${a.map(n=>`
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.02); border-radius: 6px; border-left: 3px solid ${n.met?"#22c55e":"#6b7280"};">
              <span style="color: ${n.met?"#86efac":"#d1d5db"}; display: flex; align-items: center; gap: 8px;">
                <span>${n.met?"✅":"🔒"}</span> ${n.label}
              </span>
              <span style="font-size: 0.8rem; color: ${n.met?"#22c55e":"#9ca3af"}; font-weight: bold;">
                ${n.current}
              </span>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="font-size: 0.8rem; color: #71717a; max-width: 460px; margin: 0 auto;">
        💡 Gợi ý: Hãy tiếp tục đột phá tu vi lên <strong>Trúc Cơ</strong> hoặc chiến đấu sinh tử để kích phát kẽ hở thời không.
      </div>
    </div>
  `}function ze(i,t,e,a){const{api:n,notify:s,updateSidebar:o}=a,r=t.imprints||[],d=t.stances||{},c=t.activeStance||"breaker";i.innerHTML=`
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
          <div style="font-size: 1.5rem; font-weight: bold; color: var(--gold);" id="glitchInsightVal">
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
  `;const p=i.querySelector("#btnOverrideTribulation");p&&(p.onclick=async()=>{p.disabled=!0,p.textContent="Đang lách luật...";try{const v=await n.overrideTribulation(e.id);s(v.message,"success"),state.player=v.player,o(),Bt(i.parentElement,a)}catch(v){s(v.message||"Thao tác lách luật thất bại!","error"),p.disabled=!1,p.textContent="🔮 Thi Triển (-50 Thấu Triệt)"}}),At(i,d,c,e,n,s,o),Ot(i,r,e,s,o)}function At(i,t,e,a,n,s,o){const r=i.querySelector("#stanceContainer");r&&(r.innerHTML="",Object.values(t).forEach(d=>{const c=d.isUnlocked!==!1,p=d.id===e,v=document.createElement("div");v.style.cssText=`
      background: ${p?"rgba(168, 85, 247, 0.15)":c?"var(--bg-main, #1a1e28)":"rgba(0,0,0,0.35)"};
      border: 1px solid ${p?"#c084fc":c?"var(--border-panel, #333)":"rgba(255,255,255,0.06)"};
      border-radius: 8px;
      padding: 12px;
      cursor: ${c?"pointer":"not-allowed"};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${c?"1":"0.55"};
    `,v.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${c?d.color:"#888"}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${c?d.icon:"🔒"}</span> ${d.name}
        </div>
        ${p?'<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>':""}
        ${c?"":'<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>'}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${c?d.description:`<span style="color:#f59e0b;">${d.unlockRequirement||"Chưa mở khóa"}</span>`}
      </div>
    `,v.onclick=async()=>{if(!c)return s(d.unlockRequirement||"Thế chiến đấu này đang bị phong ấn!","error");if(!p)try{const l=await n.setStance(a.id,d.id);s(l.message,"success"),state.player=l.player,o(),At(i,t,d.id,a,n,s,o)}catch(l){s(l.message||"Chuyển thế thất bại","error")}},r.appendChild(v)}))}function Ot(i,t,e,a,n){const s=i.querySelector("#imprintsContainer");s&&(s.innerHTML="",t.forEach(o=>{const r=document.createElement("div"),d=o.fogLevel||(o.isUnlocked?"revealed":"fog");let c="rgba(15, 23, 42, 0.5)",p="rgba(255,255,255,0.08)",v="none";d==="revealed"?(c="rgba(30, 41, 59, 0.75)",p=o.color,v=`0 0 12px ${o.color}33`):d==="partial"?(c="rgba(24, 24, 27, 0.6)",p="1px dashed rgba(168, 85, 247, 0.4)"):(c="rgba(10, 10, 15, 0.5)",p="1px dashed rgba(255, 255, 255, 0.08)"),r.style.cssText=`
      background: ${c};
      border: 1px solid ${p};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${v};
      position: relative;
      overflow: hidden;
    `,r.innerHTML=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${o.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${o.icon}</span> ${o.name}
          </div>
          <span style="font-size: 0.7rem; color: ${d==="revealed"?"#fbbf24":"#6b7280"}; border: 1px solid ${d==="revealed"?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.08)"}; padding: 1px 6px; border-radius: 4px;">
            ${d==="revealed"?o.title:d==="partial"?"Chớm Ngộ":"Sương Mù"}
          </span>
        </div>

        <div style="font-size: 0.78rem; color: ${d==="fog"?"#9ca3af":"#a1a1aa"}; font-style: italic; margin-bottom: 8px; line-height: 1.4;">
          "${o.lore}"
        </div>

        <div style="font-size: 0.82rem; color: ${d==="revealed"?"#e4e4e7":"#9ca3af"}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
          <strong style="color: ${d==="revealed"?"#67e8f9":"#888"};">
            ${d==="revealed"?"Hiệu ứng:":d==="partial"?"Manh mối:":"Sấm truyền:"}
          </strong> ${o.description}
        </div>
      </div>

      <div>
        ${d==="revealed"?`
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
            <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐẠI TRIỆT ĐẠI NGỘ</span>
            <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${o.title}">
              ${e.activeTitle===o.title?"Đang Đeo":"Đeo Danh Hiệu"}
            </button>
          </div>
        `:d==="partial"?`
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #a855f7; margin-bottom: 4px;">
              <span>Tiến độ cảm ứng:</span>
              <span>${o.progress.current} / ${o.progress.threshold}</span>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
              <div style="width: ${o.progress.percent}%; height: 100%; background: linear-gradient(90deg, #a855f7, #c084fc); transition: width 0.3s;"></div>
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
    `;const l=r.querySelector(".btnSetTitle");l&&(l.onclick=()=>{e.activeTitle=o.title,a(`Đã kích hoạt danh hiệu: [${o.title}]!`,"success"),n(),Ot(i,t,e,a,n)}),s.appendChild(r)}))}class He extends M{initialState(){let t=localStorage.getItem("activeSkillPillar")||"combat";return["combat","auras","monsters","crafting","library","glitch"].includes(t)||(t="combat"),{activePillar:t,monsterMasteryData:null,craftingMasteryData:null}}template(){var l,u;const{ctx:t}=this.props,e=((l=t==null?void 0:t.state)==null?void 0:l.player)||{},a=e.skills||[],n=((u=t==null?void 0:t.state)==null?void 0:u.skills)||[],s=nt(e.realmTier||1),o=(e.realmTier??1)>=2||(e.glitchInsight??0)>=20||(e.unlockedImprints||[]).length>0,d=a.map(x=>{const g=typeof x=="string"?x:x.id;return{...n.find(h=>h.id===g)||{name:g,id:g,category:"combat",type:"active"},equipped:x.equipped||x.isEquipped||!1}}).filter(x=>x.type!=="passive"),c=d.filter(x=>x.equipped),p={combat:{icon:"⚔️",name:"Chiêu Thức",sub:`${d.length} chiêu • ${c.length}/${s} ô xuất`},auras:{icon:"🧘",name:"Tâm Pháp & Hào Quang",sub:`Khóa ${e.reservationPct||0}% LL • ${(e.activeAuras||[]).length} Hào quang`},monsters:{icon:"🐺",name:"Thông Thạo Quái Vật",sub:"Bách thú đồ giám • Sát quái 5★"},crafting:{icon:"⚒️",name:"Thông Thạo Chế Tạo",sub:`Lv.${e.craftingLevel||1} • Đan đạo & Đúc rèn`}},{activePillar:v}=this.state;return`
      <div class="skills-page">
        <!-- HEADER -->
        <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom:14px">
          <div>
            <h1 style="display: flex; align-items: center; gap: 10px; margin:0; font-size:20px; font-weight:700">
              <span>⚡ Tứ Đại Trụ Cột Kỹ Năng</span>
            </h1>
            <div class="text-dim text-sm" style="font-size:12px; color:var(--text-dim); margin-top:2px">
              Hệ thống tu hành thực chiến: Chiêu thức tôi luyện, tâm pháp hào quang, bách thú đồ giám & đan đạo chế tác.
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--sm ${v==="library"?"btn--gold":"btn--outline"}" id="btnOpenLibrary" style="font-size:11px; padding:4px 10px">
              📚 Tàng Kinh Các
            </button>
            <button class="btn btn--sm ${v==="glitch"?"btn--purple":"btn--outline"}" id="btnOpenGlitch" style="font-size:11px; padding:4px 10px">
              ${o?"🌌 Thiên Đạo Dị Biến":"🌫️ Kẽ Hở Quy Luật"}
            </button>
          </div>
        </div>

        <!-- 4 PILLARS SELECTOR -->
        <div class="pillar-tabs" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:16px">
          ${Object.entries(p).map(([x,g])=>`
            <div class="pillar-tab ${v===x?"active":""}" data-pillar="${x}" style="background:var(--bg-surface, #151922); border:1px solid ${v===x?"var(--gold, #facc15)":"rgba(255,255,255,0.08)"}; border-radius:8px; padding:12px; cursor:pointer; display:flex; align-items:center; gap:10px; transition:all 0.2s">
              <div class="pillar-icon" style="font-size:24px">${g.icon}</div>
              <div class="pillar-info">
                <div class="pillar-name" style="font-weight:700; font-size:13px; color:${v===x?"var(--gold, #facc15)":"var(--text-bright)"}">${g.name}</div>
                <div class="pillar-sub" style="font-size:11px; color:var(--text-dim); margin-top:2px">${g.sub}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- ACTIVE PILLAR CONTAINER -->
        <div id="pillarContentContainer"></div>
      </div>
    `}onMounted(){this.mountActivePillar()}onUpdated(){this.mountActivePillar()}onUnmounted(){this._currentPillarView&&(this._currentPillarView.unmount(),this._currentPillarView=null)}async mountActivePillar(){var n;const t=this.container.querySelector("#pillarContentContainer");if(!t)return;this._currentPillarView&&(this._currentPillarView.unmount(),this._currentPillarView=null);const{ctx:e}=this.props,{activePillar:a}=this.state;if(a==="library"){mt(t,e);return}if(a==="glitch"){Bt(t,e);return}a==="combat"?this._currentPillarView=new Se({ctx:e,onSkillEquipped:()=>this.updatePillarTabLabels()}):a==="auras"?this._currentPillarView=new _e({ctx:e,onAuraToggled:()=>this.updatePillarTabLabels()}):a==="monsters"?(this._currentPillarView=new Le({ctx:e,masteryData:this.state.monsterMasteryData}),!this.state.monsterMasteryData&&(e!=null&&e.api)&&e.api.getMonsterMastery(e.state.playerId).then(s=>{this.setState({monsterMasteryData:s})}).catch(s=>{console.warn("Failed loading monster mastery data",s)})):a==="crafting"&&(this._currentPillarView=new Pe({ctx:e,masteryData:this.state.craftingMasteryData,player:(n=e.state)==null?void 0:n.player}),!this.state.craftingMasteryData&&(e!=null&&e.api)&&e.api.getCraftingMastery(e.state.playerId).then(s=>{this.setState({craftingMasteryData:s})}).catch(s=>{console.warn("Failed loading crafting mastery data",s)})),this._currentPillarView&&this._currentPillarView.mount(t)}updatePillarTabLabels(){var v,l,u,x;const{ctx:t}=this.props,e=((v=t==null?void 0:t.state)==null?void 0:v.player)||{},a=e.skills||[],n=((l=t==null?void 0:t.state)==null?void 0:l.skills)||[],s=nt(e.realmTier||1),r=a.map(g=>{const b=typeof g=="string"?g:g.id;return{...n.find(y=>y.id===b)||{id:b,type:"active"},equipped:g.equipped||g.isEquipped||!1}}).filter(g=>g.type!=="passive"),d=r.filter(g=>g.equipped),c=(u=this.container)==null?void 0:u.querySelector('[data-pillar="combat"] .pillar-sub');c&&(c.textContent=`${r.length} chiêu • ${d.length}/${s} ô xuất`);const p=(x=this.container)==null?void 0:x.querySelector('[data-pillar="auras"] .pillar-sub');p&&(p.textContent=`Khóa ${e.reservationPct||0}% LL • ${(e.activeAuras||[]).length} Hào quang`)}bindEvents(){this.on("click","[data-pillar]",(t,e)=>{const a=e.dataset.pillar;localStorage.setItem("activeSkillPillar",a),this.setState({activePillar:a})}),this.on("click","#btnOpenLibrary",()=>{localStorage.setItem("activeSkillPillar","library"),this.setState({activePillar:"library"})}),this.on("click","#btnOpenGlitch",()=>{localStorage.setItem("activeSkillPillar","glitch"),this.setState({activePillar:"glitch"})})}}let F=null;function pt(i,t){F&&(F.unmount(),F=null),F=new He({ctx:t}),F.mount(i)}const Me={strength:"Lực Đạo (Công)",defense:"Hộ Thể (Thủ)",speed:"Thân Pháp (Tốc)",dexterity:"Mẫn Tiệp (Né/Xác)",hp:"Khí Huyết (HP)",maxHp:"Khí Huyết Tối Đa",critRate:"Tỷ Lệ Bạo Kích",critMultiplier:"Sát Thương Bạo Kích",damageReduction:"Giảm Sát Thương",dodge:"Né Tránh",capacity:"Không Gian Trữ Vật"},Dt={strength:"Công",defense:"Thủ",speed:"Tốc",dexterity:"Thân Pháp",hp:"HP",maxHp:"HP",critRate:"Bạo Kích",critMultiplier:"ST Bạo",damageReduction:"Giảm Thương",dodge:"Né",capacity:"Trữ Vật"};function jt(i){const t=parseInt(i.enhanceLevel,10)||0;if(t<=0)return"";const e=parseInt(i.itemLevel,10)||1,a=Math.max(1,Math.floor(e/3));if(i.slot==="weapon")return`+${Math.max(4*t,Math.round(t*4*a))} Lực Đạo (Công)`;if(i.slot==="body"||i.slot==="shield"||i.slot==="head"){const n=Math.max(3*t,Math.round(t*3*a)),s=t*30*a;return`+${n} Hộ Thể & +${s} Khí Huyết`}if(i.slot==="feet"){const n=Math.max(2*t,Math.round(t*3*a)),s=Math.max(1*t,Math.round(n*.6));return`+${n} Thân Pháp & +${s} Mẫn Tiệp`}if(["ring","ring1","ring2","accessory"].includes(i.slot)){const n=Math.max(2*t,Math.round(t*2*a));return`+${n} Lực Đạo & +${n} Mẫn Tiệp`}return`Cấp Cường Hóa +${t}`}function Ie(i=[]){return!i||i.length===0?'<div style="font-size:11px; color:var(--text-dim); padding:4px 0;">Chưa có phù văn khắc ấn. Dùng Hỗn Chú Phù tại Lò Tạo Hóa để khắc ấn thuộc tính!</div>':i.map((t,e)=>{const a=t.tier?`<span style="font-size:9.5px; background:rgba(234, 179, 8, 0.12); color:#facc15; border:1px solid rgba(234, 179, 8, 0.3); padding:1px 5px; border-radius:3px; font-weight:700">Tầng ${t.tier}</span>`:"",n=`<span style="color:var(--gold, #facc15); font-weight:700; font-size:12px">${t.name?`[${t.name}]`:`[Phù Văn ${e+1}]`}</span>`,s=it(t,!0);return`
      <div class="affix-line" style="display:flex; justify-content:space-between; align-items:center; gap:8px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:4px 10px; margin-bottom:4px; font-size:11.5px">
        <div style="display:flex; align-items:center; gap:6px">
          <span>📜</span>
          ${n}
          ${a}
        </div>
        <span style="color:#60a5fa; font-weight:600">${s}</span>
      </div>
    `}).join("")}function Ne(i,t){return t==="manual"?"📜":i==="weapon"?"⚔️":i==="body"?"🥋":i==="shield"?"🛡️":i==="feet"?"👢":i==="ring"||i==="ring1"||i==="ring2"?"💍":"📦"}function yt(i){const t=parseInt(i,10)||0;return t<=0?0:t<=3?1:t<=6?2:t<=9?3:4}function St(i){if(!i)return{stats:{},totalScore:0};const t={},e=parseInt(i.enhanceLevel,10)||0,a=parseInt(i.itemLevel,10)||1;if(i.slot==="weapon"){let s=0,o=0;(i.affixes||[]).forEach(r=>{r.stat==="strength"&&r.type==="flat"&&(s+=r.value),r.stat==="dexterity"&&r.type==="flat"&&(o+=r.value)}),s===0&&(s=a*2+5),o===0&&(o=a+10),e>0&&(s+=Math.max(4*e,Math.round(e*4*Math.floor(a/3)))),t["STR (Sát Thương)"]=s,t["DEX (Chính Xác)"]=o}else if(i.slot==="body"||i.slot==="shield"){let s=0,o=0;(i.affixes||[]).forEach(r=>{r.stat==="defense"&&r.type==="flat"&&(s+=r.value),r.stat==="hp"&&r.type==="flat"&&(o+=r.value)}),s===0&&(s=a*3),e>0&&(s+=Math.max(3*e,Math.round(e*3*Math.floor(a/3))),o+=e*30*Math.floor(a/3)),t["DEF (Phòng Ngự)"]=s,o>0&&(t["HP (Khí Huyết)"]=o)}else if(i.slot==="feet"){let s=0,o=0;(i.affixes||[]).forEach(r=>{r.stat==="speed"&&r.type==="flat"&&(s+=r.value),r.stat==="defense"&&r.type==="flat"&&(o+=r.value)}),s===0&&(s=Math.max(5,a*2)),e>0&&(s+=Math.max(2*e,Math.round(e*3*Math.floor(a/3))),o+=Math.max(1*e,Math.round(s*.6))),t["SPD (Thân Pháp)"]=s,o>0&&(t["DEX (Né Tránh)"]=o)}else if(i.slot==="ring"||i.slot==="ring1"||i.slot==="ring2"){let s=0,o=0,r=0;if((i.affixes||[]).forEach(d=>{d.stat==="capacity"&&(s+=d.value),d.stat==="strength"&&(o+=d.value),d.stat==="dexterity"&&(r+=d.value)}),e>0){const d=Math.max(2*e,Math.round(e*2*Math.floor(a/3)));o+=d,r+=d}s>0&&(t["CAP (Trữ Vật)"]=s),o>0&&(t["STR (Lực Lượng)"]=o),r>0&&(t["DEX (Nhanh Nhẹn)"]=r)}(i.affixes||[]).forEach(s=>{if(["critMultiplier","critRate","damageReduction","dodge"].includes(s.stat)){const o=s.stat==="critMultiplier"?"CRIT MUL":s.stat.toUpperCase();t[o]=(t[o]||0)+s.value}});let n=0;return Object.values(t).forEach(s=>{typeof s=="number"&&(n+=s)}),{stats:t,totalScore:n}}function Kt(i,t,e={}){const a=parseInt(i.enhanceLevel,10)||0,n=yt(a),s=a>0?`<span class="badge-enhance tier-${n} lvl-${a}">+${a}</span>`:"",o=n>0?`enhance-glow-tier${n}`:"";let r="",d="";if(i.slot==="weapon"){let h=0,y=0;(i.affixes||[]).forEach(f=>{f.stat==="strength"&&f.type==="flat"&&(h+=f.value),f.stat==="dexterity"&&f.type==="flat"&&(y+=f.value)}),h===0&&(h=i.itemLevel*2+5),y===0&&(y=i.itemLevel+10),a>0&&(h+=Math.max(4*a,Math.round(a*4*Math.floor((i.itemLevel||1)/3)))),r=`Công ${h}`,d=`Chính xác ${y}`}else if(i.slot==="body"||i.slot==="shield"||i.slot==="feet"){let h=0;(i.affixes||[]).forEach(y=>{y.stat==="defense"&&y.type==="flat"&&(h+=y.value)}),h===0&&(h=i.itemLevel*3),a>0&&(h+=Math.max(3*a,Math.round(a*3*Math.floor((i.itemLevel||1)/3)))),r=`Thủ ${h}`}else if(i.slot==="ring"||i.slot==="ring1"||i.slot==="ring2"){let h=0;(i.affixes||[]).forEach(y=>{y.stat==="capacity"&&(h+=y.value)}),r=h>0?`Trữ vật +${h}`:""}let c="",p="";const v=i.category!=="manual"&&["weapon","body","shield","feet","ring","ring1","ring2","accessory"].includes(i.slot||i.type);if(!e.isEquipped&&v&&e.equippedItem!==void 0){const h=e.equippedItem,y=St(i);if(h){const f=St(h),T=Array.from(new Set([...Object.keys(y.stats),...Object.keys(f.stats)])).map(k=>{const _=y.stats[k]||0,S=f.stats[k]||0,L=_-S;return{key:k,v1:_,v0:S,d:L}}),$=y.totalScore-f.totalScore,w=h.enhanceLevel>0?` (+${h.enhanceLevel})`:"";p=`<span class="stat-delta-badge ${$>=0?"pos":"neg"}" title="So với trang bị hiện tại">${$>=0?`▲ +${$}`:`▼ ${$}`}</span>`,c=`
        <div class="stat-compare-box">
          <div class="stat-compare-header">
            <span>So sánh với: <strong class="rarity-${h.rarity}">${h.name}${w}</strong></span>
            <span class="stat-delta-badge ${$>=0?"pos":"neg"}">
              ${$>=0?`▲ +${$}`:`▼ ${$}`} Tổng
            </span>
          </div>
          <div class="stat-delta-grid">
            ${T.map(k=>`
              <span class="stat-delta-item ${k.d>0?"pos":k.d<0?"neg":"eq"}">
                ${k.key}: ${k.v1} (${k.d>0?`▲ +${k.d}`:k.d<0?`▼ ${k.d}`:"■ 0"})
              </span>
            `).join("")}
          </div>
        </div>
      `}else p=`<span class="stat-delta-badge pos" title="Ô trang bị trống">▲ +${y.totalScore}</span>`,c=`
        <div class="stat-compare-box">
          <div class="stat-compare-header">
            <span style="opacity:0.6">Ô trang bị hiện tại đang trống</span>
            <span class="stat-delta-badge pos">▲ +${y.totalScore} Điểm</span>
          </div>
        </div>
      `}(i.affixes||[]).map(h=>it(h)).map(h=>`<span class="badge badge-dim">${h}</span>`).join(" ");const l=i.description||`Một vật phẩm loại ${i.slot} cấp ${i.itemLevel} thuộc phẩm chất ${i.rarity}. Khí tức tỏa ra không tồi.`,u=i.craftedBy?`<div class="text-gold mt-xs" style="font-size:12px">Đúc bởi: <strong>${i.craftedBy}</strong></div>`:"",x=[];if(e.isEquipped){const h=e.slotKey||i.slot;x.push(`<button class="btn btn--sm btn-unequip" data-unequip-slot="${h}">Tháo</button>`)}else t&&(i.category==="manual"?x.push(`<button class="btn btn--sm btn--gold" data-use="${i.id}">Sử Dụng</button>`):x.push(`<button class="btn btn--sm btn--blue" data-eid="${i.id}">Trang Bị</button>`));v&&x.push(`<button class="btn btn--sm btn-forge-shortcut" data-forge-jump="${i.id}" title="Chuyển đến Lò Tạo Hóa để cường hóa">Cường Hóa</button>`);const g=x.join(" "),b=a>0?jt(i):"";return`
    <div class="list-item ${o}" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1; flex-wrap:wrap">
          <span class="rarity-dot ${i.rarity}"></span>
          <span class="item-name rarity-${i.rarity}" style="font-size:14px; font-weight:600">${i.name}</span>
          ${s}
          ${p}
          ${(i.affixes||[]).length>0?`<span class="badge" style="font-size:10px; background:rgba(96,165,250,0.12); color:#60a5fa; border:1px solid rgba(96,165,250,0.25); padding:1px 5px; border-radius:3px">📜 ${i.affixes.length} Phù Văn</span>`:""}
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${r?`<span style="color:var(--text-light); font-weight:600">${r}</span>`:""}
          ${d?`<span style="color:var(--text-dim); font-size:11px">${d}</span>`:""}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05); flex-direction:column">
        <div class="flex gap-3">
          <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
            ${Ne(i.slot,i.category)}
          </div>
          <div class="item-details" style="flex:1">
            <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${i.name}</strong> ${s} là loại ${i.baseType}. ${l}</div>
            <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8; flex-wrap:wrap">
              <div><strong>Cấp độ:</strong> Lv.${i.itemLevel||1}</div>
              <div><strong>Phẩm chất:</strong> <span class="rarity-${i.rarity}">${(i.rarity||"common").toUpperCase()}</span></div>
              ${a>0?`<div><strong>Cường Hóa:</strong> <span class="badge-enhance tier-${n} lvl-${a}">+${a}</span></div>`:""}
              <div><strong>Khắc Ấn:</strong> <span style="color:#60a5fa">${(i.affixes||[]).length}/4 dòng</span></div>
            </div>
            ${u}
          </div>
        </div>

        <!-- PHÙ VĂN KHẮC ẤN PANEL -->
        <div style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px">
            <span style="font-weight:700; color:var(--gold, #facc15); font-size:11.5px; display:flex; align-items:center; gap:4px">
              <span>📜 Phù Văn Khắc Ấn</span>
              <span style="color:var(--text-dim); font-weight:normal; font-size:10.5px">(${(i.affixes||[]).length}/4 dòng tối đa)</span>
            </span>
            ${(i.affixes||[]).length<4&&v?'<span style="font-size:10px; color:#38bdf8;">+ Khắc thêm tại Lò Tạo Hóa</span>':""}
          </div>
          <div class="affixes-container">
            ${Ie(i.affixes)}
          </div>
        </div>

        ${a>0?`
          <div style="background:rgba(234,179,8,0.05); border:1px solid rgba(234,179,8,0.18); border-radius:6px; padding:6px 10px; font-size:11.5px; display:flex; justify-content:space-between; align-items:center">
            <span style="color:#fde047; font-weight:600">✨ Uy Lực Cường Hóa (+${a}):</span>
            <span style="color:var(--text-bright); font-weight:600">${b}</span>
          </div>
        `:""}

        ${c}

        <div class="mt-2 flex justify-end gap-2">
          ${g}
        </div>
      </div>
    </div>`}function at(i,t){if(!i||!t)return;const{state:e,api:a,notify:n,renderGame:s}=t;i.querySelectorAll("[data-forge-jump]").forEach(o=>{o.addEventListener("click",r=>{r.stopPropagation();const d=o.dataset.forgeJump;e.currentPage="alchemy",e._alchemyTab="enhancement",e._selectedEnhanceItemId=d,s()})}),i.querySelectorAll("[data-unequip-slot]").forEach(o=>{o.addEventListener("click",async r=>{r.stopPropagation();const d=o.dataset.unequipSlot;try{const c=await a.request(`/player/${e.playerId}/unequip`,{method:"POST",body:JSON.stringify({slot:d})});e.player=c.player,n(c.message||"Đã tháo trang bị","success"),s()}catch(c){n(c.message||"Lỗi khi tháo trang bị","error")}})})}function it(i,t=!1){if(!i)return"";const e=(t?Me[i.stat]:Dt[i.stat])||i.stat||"",a=(i.value||0)>=0?"+":"",n=i.type==="increase"?`${a}${i.value}%`:i.type==="more"?`×${a}${i.value}%`:`${a}${i.value}`;return`${i.name?`[${i.name}] `:""}${n} ${e}`}const st={da_cuong_hoa:{id:"da_cuong_hoa",name:"Đá Cường Hóa",tier:2,category:"spirit",description:"Linh thạch đặc thù dùng để cường hóa trang bị tại Lò Tạo Hóa.",icon:"✨",sellPrice:50},quang_dong:{id:"quang_dong",name:"Quặng Đồng",tier:1,category:"spirit",description:"Quặng đồng thau sơ cấp, nền tảng đúc khí rèn trang bị.",icon:"⛏️",sellPrice:8},quang_bac:{id:"quang_bac",name:"Quặng Bạc",tier:2,category:"spirit",description:"Quặng bạc sáng loáng, linh khí ẩn chứa, dùng rèn bảo khí trung cấp.",icon:"⛏️",sellPrice:20},quang_vang:{id:"quang_vang",name:"Quặng Vàng",tier:3,category:"spirit",description:"Quặng vàng rực rỡ, hấp thu nhật nguyệt tinh hoa, rèn trang bị cao cấp.",icon:"⛏️",sellPrice:60},huyen_thiet:{id:"huyen_thiet",name:"Huyền Thiết",tier:3,category:"spirit",description:"Huyền thiết ngàn năm cứng rắn vô cùng, tài liệu thượng hạng để rèn bảo khí.",icon:"⛏️",sellPrice:80},mat_thiet_khoang_tho:{id:"mat_thiet_khoang_tho",name:"Thiết Khoáng Thô",tier:1,category:"spirit",description:"Quặng sắt thô lộ thiên đặc thù vùng ngoại ô Thanh Lam Trấn.",icon:"⛏️",sellPrice:10},mat_bang_phach_thach:{id:"mat_bang_phach_thach",name:"Băng Phách Thạch",tier:2,category:"elemental",description:"Quặng tinh thể hàn băng đặc thù vùng cực bắc Bắc Sương Cảnh.",icon:"⛏️",sellPrice:45},mat_thiet_huyet_khoang:{id:"mat_thiet_huyet_khoang",name:"Thiết Huyết Quặng",tier:3,category:"spirit",description:"Mạch khoáng sắt đỏ au đặc thù của Thiết Huyết Sơn.",icon:"⛏️",sellPrice:65},mat_loi_tinh_thach:{id:"mat_loi_tinh_thach",name:"Lôi Kiếp Thạch",tier:3,category:"elemental",description:"Khoáng thạch đặc thù đáy Thiên Kiếp Uyên, trải qua thiên lôi tôi luyện.",icon:"⛏️",sellPrice:85},mat_dia_hoa_tinh:{id:"mat_dia_hoa_tinh",name:"Địa Hỏa Tinh Thạch",tier:3,category:"elemental",description:"Tinh thạch hỏa hệ đặc thù kết tinh từ lõi mắc-ma Thiên Hỏa Linh Địa.",icon:"⛏️",sellPrice:80},mat_tinh_tieu_thach:{id:"mat_tinh_tieu_thach",name:"Tinh Tiêu Thạch",tier:4,category:"spirit",description:"Khoáng thạch tinh tú đặc thù ngưng tụ từ bụi sao băng giữa Chư Thiên Tinh Hải.",icon:"⛏️",sellPrice:450},mat_hu_khong:{id:"mat_hu_khong",name:"Hư Không Thạch",tier:4,category:"rare",description:"Khoáng thạch trôi nổi từ khe nứt hư không viễn cổ.",icon:"⛏️",sellPrice:600},ban_nguyen_tinh:{id:"ban_nguyen_tinh",name:"Bản Nguyên Tinh",tier:5,category:"spirit",description:"Tinh hoa bản nguyên vũ trụ ngưng tụ, chí bảo khoáng thạch vô giá.",icon:"⛏️",sellPrice:2e3},mat_hac_thach:{id:"mat_hac_thach",name:"Hắc Phong Thạch",tier:1,category:"basic",description:"Đá đen trầm tích ngâm trong gió độc Hắc Phong Lâm hàng trăm năm.",icon:"⛏️",sellPrice:14},mat_u_hon_thach:{id:"mat_u_hon_thach",name:"U Hồn Thạch",tier:2,category:"spirit",description:"Khoáng thạch đặc thù của Vọng Linh Cốc, hấp thụ âm khí và linh hồn.",icon:"⛏️",sellPrice:35},mat_hac_sa_tinh:{id:"mat_hac_sa_tinh",name:"Hắc Sa Tinh",tier:2,category:"elemental",description:"Tinh thể cát đen đặc thù kết tinh dưới sấm sét sa mạc Ám Sát Hoang.",icon:"⛏️",sellPrice:50},mat_thit_tho:{id:"mat_thit_tho",name:"Thịt Thô",tier:1,category:"basic",description:"Thịt thường, dùng hồi máu hoặc chế đồ cơ bản.",icon:"🐺",sellPrice:1},mat_da_tho:{id:"mat_da_tho",name:"Da Thô",tier:1,category:"basic",description:"Da thú bình thường, chế giáp cơ bản.",icon:"🐺",sellPrice:2},mat_xuong_vun:{id:"mat_xuong_vun",name:"Xương Vụn",tier:1,category:"basic",description:"Mảnh xương vỡ, dùng chế vũ khí đơn giản.",icon:"🐺",sellPrice:1},mat_noc_xa:{id:"mat_noc_xa",name:"Nọc Xà",tier:1,category:"basic",description:"Nọc độc rắn xanh, dùng tẩm tên hoặc chế đan dược.",icon:"🐺",sellPrice:3},mat_da_ran:{id:"mat_da_ran",name:"Da Rắn",tier:1,category:"basic",description:"Da rắn dai, chế giáp nhẹ.",icon:"🐺",sellPrice:2},mat_long_hoa:{id:"mat_long_hoa",name:"Lông Hỏa",tier:2,category:"elemental",description:"Lông hồ ly chứa hỏa tinh rực cháy.",icon:"🐺",sellPrice:12},mat_vo_cung:{id:"mat_vo_cung",name:"Vỏ Cứng",tier:2,category:"basic",description:"Mảnh giáp từ Thiết Giáp Trùng cực kỳ kiên cố.",icon:"🐺",sellPrice:15},mat_rang_soi_vuong:{id:"mat_rang_soi_vuong",name:"Răng Sói Vương",tier:3,category:"basic",description:"Nanh sói vương sắc bén, chế vũ khí sát thương cao.",icon:"🐺",sellPrice:30},mat_loi_vu:{id:"mat_loi_vu",name:"Lôi Vũ",tier:3,category:"elemental",description:"Lông chim sấm chứa lôi tinh mang điện tích.",icon:"🐺",sellPrice:28},mat_ba_vuong_nanh:{id:"mat_ba_vuong_nanh",name:"Nanh Bá Vương",tier:4,category:"basic",description:"Răng nanh cự thú hồng hoang vô cùng kiên cố.",icon:"🐺",sellPrice:250},mat_loi_de_vu:{id:"mat_loi_de_vu",name:"Lôi Đế Vũ",tier:4,category:"elemental",description:"Lông vũ tích điện của Thần Điểu Lôi Đế.",icon:"🐺",sellPrice:400},mat_huyet_ma_ban_giap:{id:"mat_huyet_ma_ban_giap",name:"Huyết Ma Bản Giáp",tier:5,category:"rare",description:"Mảnh giáp xương của Huyết Ma Thượng Cổ bất hoại.",icon:"🐺",sellPrice:1500},linh_thao:{id:"linh_thao",name:"Linh Thảo",tier:1,category:"herb",description:"Cỏ linh khí nhạt, nền tảng của Luyện Đan.",icon:"🌿",sellPrice:5},huyet_thao:{id:"huyet_thao",name:"Huyết Thảo",tier:1,category:"herb",description:"Cỏ đỏ như máu, chứa sinh khí dương dồi dào.",icon:"🌿",sellPrice:8},doc_thao:{id:"doc_thao",name:"Độc Thảo",tier:1,category:"herb",description:"Sinh trưởng trong đầm lầy, kịch độc.",icon:"🌿",sellPrice:5},thanh_linh_thao:{id:"thanh_linh_thao",name:"Thanh Linh Thảo",tier:2,category:"herb",description:"Linh thảo thanh sạch, nâng cao hiệu suất luyện đan.",icon:"🌿",sellPrice:20},hoa_linh_chi:{id:"hoa_linh_chi",name:"Hỏa Linh Chi",tier:2,category:"herb",description:"Linh chi mang hỏa cực dương sinh trưởng nơi núi lửa.",icon:"🌿",sellPrice:25},bang_linh_thao:{id:"bang_linh_thao",name:"Băng Linh Thảo",tier:2,category:"herb",description:"Thảo mộc lạnh lẽo, hái từ đỉnh tuyết ngàn năm.",icon:"🌿",sellPrice:30},kim_linh_thao:{id:"kim_linh_thao",name:"Kim Linh Thảo",tier:3,category:"herb",description:"Linh thảo hấp thụ tinh quang nhật nguyệt.",icon:"🌿",sellPrice:60},thien_linh_thao:{id:"thien_linh_thao",name:"Thiên Linh Thảo",tier:4,category:"herb",description:"Tuyệt phẩm thảo mộc, tụ tập tinh hoa vũ trụ.",icon:"🌿",sellPrice:200},mat_thao_moc_thanh_lam:{id:"mat_thao_moc_thanh_lam",name:"Thanh Lam Diệp",tier:1,category:"herb",description:"Lá thảo mộc đặc thù của trấn Thanh Lam, giúp định tâm.",icon:"🌿",sellPrice:12},mat_am_hon_thao:{id:"mat_am_hon_thao",name:"Ám Hồn Thảo",tier:3,category:"herb",description:"Thảo dược sinh trưởng nơi âm u tích tụ hồn khí.",icon:"🌿",sellPrice:65},mat_huyen_bang_hoa:{id:"mat_huyen_bang_hoa",name:"Huyền Băng Hoa",tier:3,category:"herb",description:"Bông hoa kết tinh từ hàn băng vạn năm.",icon:"🌿",sellPrice:75},mat_huyen_thien_hoa:{id:"mat_huyen_thien_hoa",name:"Huyền Thiên Hoa",tier:3,category:"herb",description:"Đóa hoa hấp thụ linh khí huyền thiên.",icon:"🌿",sellPrice:85},mat_sa_tinh_thao:{id:"mat_sa_tinh_thao",name:"Sa Tinh Thảo",tier:2,category:"herb",description:"Thảo dược gai kiên cường giữa bão cát tử thần.",icon:"🌿",sellPrice:35},mat_u_minh_thao:{id:"mat_u_minh_thao",name:"U Minh Quỷ Thảo",tier:3,category:"herb",description:"Cỏ âm linh mọc ven bờ Vong Xuyên phát sáng ma mị.",icon:"🌿",sellPrice:95},mat_tinh_thach:{id:"mat_tinh_thach",name:"Tinh Thạch",tier:2,category:"spirit",description:"Đá tinh chất, dùng nâng cấp trang bị.",icon:"💎",sellPrice:22},mat_kim_loai_linh:{id:"mat_kim_loai_linh",name:"Kim Loại Linh",tier:2,category:"basic",description:"Kim loại chứa linh khí, chế giáp tốt.",icon:"💎",sellPrice:18},mat_tinh_hoa:{id:"mat_tinh_hoa",name:"Tinh Hỏa",tier:2,category:"elemental",description:"Tinh hoa nguyên tố hỏa. Craft vũ khí lửa.",icon:"💎",sellPrice:25},mat_huyet_tinh:{id:"mat_huyet_tinh",name:"Huyết Tinh",tier:3,category:"spirit",description:"Tinh huyết từ Huyết Lang Vương.",icon:"💎",sellPrice:35},mat_noi_dan_nho:{id:"mat_noi_dan_nho",name:"Nội Đan Nhỏ",tier:2,category:"spirit",description:"Nội đan quái vật cấp thấp, chứa năng lượng.",icon:"💎",sellPrice:20},mat_noi_dan_trung:{id:"mat_noi_dan_trung",name:"Nội Đan Trung",tier:3,category:"spirit",description:"Nội đan trung cấp, đột phá hoặc chế đan.",icon:"💎",sellPrice:50},mat_noi_dan_lon:{id:"mat_noi_dan_lon",name:"Nội Đan Lớn",tier:4,category:"spirit",description:"Nội đan quái vật cao cấp, năng lượng bàng bạc.",icon:"💎",sellPrice:300},mat_noi_dan_cuc:{id:"mat_noi_dan_cuc",name:"Cực Phẩm Nội Đan",tier:5,category:"spirit",description:"Nội đan cửu phẩm yêu hoàng vạn năm.",icon:"💎",sellPrice:1200},mat_khong_gian_manh:{id:"mat_khong_gian_manh",name:"Mảnh Vỡ Không Gian",tier:1,category:"rare",description:"Mảnh vụn không gian, chứa năng lượng trữ vật.",icon:"💎",sellPrice:80},mat_khong_gian_thach:{id:"mat_khong_gian_thach",name:"Không Gian Thạch",tier:2,category:"rare",description:"Đá không gian hoàn chỉnh, dùng luyện nhẫn trữ vật.",icon:"💎",sellPrice:250},mat_hu_khong_tinh:{id:"mat_hu_khong_tinh",name:"Hư Không Tinh",tier:3,category:"rare",description:"Tinh thể hư không, chứa khoảng không lớn.",icon:"💎",sellPrice:800},mat_gioi_tu_thach:{id:"mat_gioi_tu_thach",name:"Giới Tử Thạch",tier:4,category:"rare",description:"Hòn đá có thể chứa cả thế giới bên trong.",icon:"💎",sellPrice:3e3},linh_dich:{id:"linh_dich",name:"Linh Dịch",tier:1,category:"essence",description:"Chất lỏng tinh khiết ngưng tụ từ thiên địa.",icon:"💎",sellPrice:10},mat_cuu_u_hac_thuy:{id:"mat_cuu_u_hac_thuy",name:"Cửu U Hắc Thủy",tier:4,category:"essence",description:"Chất lỏng huyền bí đặc thù lạnh thấu linh hồn.",icon:"💎",sellPrice:500},mat_hon_don_khi:{id:"mat_hon_don_khi",name:"Hỗn Độn Khí Tinh",tier:5,category:"essence",description:"Khí tức nguyên thủy trước khi vũ trụ khai sinh.",icon:"💎",sellPrice:2500},mat_hon_nguyen_chau:{id:"mat_hon_nguyen_chau",name:"Hỗn Nguyên Đạo Châu",tier:5,category:"rare",description:"Hạt ngọc tối thượng kết tinh từ đại đạo vô thượng.",icon:"💎",sellPrice:5e3},mat_tinh_thach_lon:{id:"mat_tinh_thach_lon",name:"Tinh Thạch Lớn",tier:4,category:"spirit",description:"Tinh thạch khổng lồ chứa linh lực dồi dào.",icon:"✨",sellPrice:100}};function qe(i,t){return i==="da_cuong_hoa"||i.includes("phu")||i==="mat_tinh_thach_lon"?"enhance":["quang_dong","quang_bac","quang_vang","huyen_thiet","mat_thiet_khoang_tho","mat_bang_phach_thach","mat_thiet_huyet_khoang","mat_loi_tinh_thach","mat_dia_hoa_tinh","mat_tinh_tieu_thach","mat_hu_khong","ban_nguyen_tinh","mat_hac_thach","mat_u_hon_thach","mat_hac_sa_tinh"].includes(i)||i.startsWith("quang_")||i.endsWith("_thach")||i.includes("khoang")||i.includes("thiet")?"mineral":["mat_thit_tho","mat_da_tho","mat_xuong_vun","mat_noc_xa","mat_da_ran","mat_long_hoa","mat_vo_cung","mat_rang_soi_vuong","mat_loi_vu","mat_ba_vuong_nanh","mat_loi_de_vu","mat_huyet_ma_ban_giap"].includes(i)||i.includes("da_ran")||i.includes("nanh")||i.includes("vuong")||i.includes("soi")||i.includes("giap")?"beast":(t==null?void 0:t.category)==="herb"||i.includes("thao")||i.includes("chi")||i.includes("hoa")||i.includes("diep")?"herb":"catalyst"}function Re(i,t){return t!=null&&t.icon?t.icon:i==="mineral"?"⛏️":i==="beast"?"🐺":i==="herb"?"🌿":i==="enhance"?"✨":"💎"}function Be(i){return i.replace(/^mat_/,"").split("_").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}const Ct=[{key:"weapon",icon:"⚔️",name:"Vũ Khí"},{key:"body",icon:"🥋",name:"Giáp"},{key:"shield",icon:"🛡️",name:"Thuẫn"},{key:"feet",icon:"👢",name:"Hài"},{key:"ring1",icon:"💍",name:"Nhẫn 1"},{key:"ring2",icon:"💍",name:"Nhẫn 2"}];class Ae extends M{template(){const{player:t={}}=this.props,e=t.equipment||{},a=Object.values(e).filter(Boolean);return`
      <div class="equipment-view">
        <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
          Các pháp bảo đang được liên kết:
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
          ${Ct.map(n=>{const s=e[n.key]||(n.key==="ring1"&&!e.ring1?e.ring:null),o=n.key==="ring1"&&!e.ring1&&e.ring?"ring":n.key,r=s&&s.id,d=r?`rarity-${s.rarity}`:"",c=r&&parseInt(s.enhanceLevel,10)||0,p=yt(c),v=c>0?`<span class="badge-enhance tier-${p} lvl-${c}">+${c}</span>`:"",l=p>0?`enhance-glow-tier${p}`:"",u=r?s.affixes||[]:[],x=u.length>0?`<div style="font-size:9.5px;color:#60a5fa;font-weight:600;margin-top:2px">📜 ${u.length} Phù Văn</div>`:"",g=u.map(h=>`${h.name?`[${h.name}] `:""}+${h.value} ${Dt[h.stat]||h.stat}`).join(`
`),b=r?`title="${s.name} (${s.rarity||"common"})
Cường Hóa: +${c}${g?`

📜 Phù Văn:
`+g:""}"`:"";return`
              <div class="${l}" ${b} style="background:${r?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"};border:1px solid ${r?c>0?"rgba(245,158,11,0.45)":"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)"};border-radius:8px;padding:10px;text-align:center;min-height:92px;display:flex;flex-direction:column;justify-content:space-between">
                <div>
                  <div style="font-size:20px;margin-bottom:4px">${n.icon}</div>
                  <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${n.name}</div>
                  ${r?`<div style="font-size:11px;font-weight:600" class="${d}">${s.name} ${v}</div>
                       <div style="font-size:9px;opacity:0.4">[${s.rarity||"common"}] Lv${s.itemLevel||1}</div>
                       ${x}`:'<div style="font-size:11px;opacity:0.2">— Trống —</div>'}
                </div>
                ${r?`
                  <div style="display:flex;gap:4px;justify-content:center;margin-top:6px">
                    <button class="btn btn--xs btn-unequip" data-unequip-slot="${o}" title="Tháo trang bị">Tháo</button>
                    <button class="btn btn--xs btn-forge-shortcut" data-forge-jump="${s.id}" title="Đến Lò Tạo Hóa để cường hóa">Rèn</button>
                  </div>
                `:""}
              </div>`}).join("")}
        </div>
        ${a.length>0?`
          <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết pháp bảo trang bị:</div>
          ${Ct.map(n=>{const s=e[n.key]||(n.key==="ring1"&&!e.ring1?e.ring:null),o=n.key==="ring1"&&!e.ring1&&e.ring?"ring":n.key;return s&&s.id?Kt(s,!1,{isEquipped:!0,slotKey:o}):""}).join("")}
        `:""}
      </div>
    `}onMounted(){this.props.ctx&&at(this.container,this.props.ctx)}onUpdated(){this.props.ctx&&at(this.container,this.props.ctx)}bindEvents(){this.on("click",".btn-unequip",async(t,e)=>{t.stopPropagation();const a=e.dataset.unequipSlot,{ctx:n}=this.props;if(!(!n||!a))try{const s=await n.api.request(`/player/${n.state.playerId}/unequip`,{method:"POST",body:JSON.stringify({slot:a})});n.state.player=s.player,n.notify(s.message||"Đã tháo trang bị","success"),n.renderGame()}catch(s){n.notify(s.message||"Lỗi tháo trang bị","error")}}),this.on("click",".btn-forge-shortcut",(t,e)=>{t.stopPropagation();const a=e.dataset.forgeJump,{ctx:n}=this.props;n&&(n.state.alchemyTab="enhance",n.state.selectedEnhanceItemId=a,n.state.page="alchemy",n.renderGame())})}}class Oe extends M{initialState(){var t,e;return{filter:((e=(t=this.props.ctx)==null?void 0:t.state)==null?void 0:e._matFilter)||"all",searchQuery:""}}template(){var v;const{player:t={},ctx:e}=this.props,{filter:a,searchQuery:n}=this.state,s=((v=e==null?void 0:e.state)==null?void 0:v.materialCatalog)||st,r=Object.entries(t.materials||{}).filter(([l,u])=>(u||0)>0).map(([l,u])=>{const x=s[l]||st[l]||{id:l,name:Be(l),tier:1,category:"basic",description:"Nguyên liệu thu thập từ các chuyến ngao du thám hiểm."},g=qe(l,x);return{id:l,qty:u,matData:x,group:g}}),d=r.filter(l=>{if(a!=="all"&&l.group!==a)return!1;if(n){const u=n.toLowerCase();return l.matData.name.toLowerCase().includes(u)||l.id.toLowerCase().includes(u)}return!0}),c={1:"Phàm",2:"Linh",3:"Huyền",4:"Địa",5:"Thiên"},p={1:"common",2:"uncommon",3:"rare",4:"epic",5:"legendary"};return`
      <div class="material-pouch">
        <div class="material-filter-bar" style="display:flex; gap:6px; flex-wrap:wrap; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:center">
          <button class="mat-filter-btn ${a==="all"?"active":""}" data-mat-filter="all">Tất Cả (${r.length})</button>
          <button class="mat-filter-btn ${a==="mineral"?"active":""}" data-mat-filter="mineral">Khoáng Thạch</button>
          <button class="mat-filter-btn ${a==="beast"?"active":""}" data-mat-filter="beast">Yêu Thú</button>
          <button class="mat-filter-btn ${a==="herb"?"active":""}" data-mat-filter="herb">Linh Dược</button>
          <button class="mat-filter-btn ${a==="catalyst"?"active":""}" data-mat-filter="catalyst">Linh Tinh</button>
          <button class="mat-filter-btn ${a==="enhance"?"active":""}" data-mat-filter="enhance">Đá Cường Hóa</button>
        </div>

        ${r.length===0?`
          <div style="padding:40px 20px;text-align:center" class="text-dim">
            Kho nguyên liệu trống không. Hãy ngao du bát hoang, thám hiểm bí cảnh hoặc trảm yêu để thu thập khoáng thạch, linh dược!
          </div>
        `:d.length===0?`
          <div style="padding:30px 20px;text-align:center" class="text-dim">
            Không có nguyên liệu nào thuộc phân loại này trong túi.
          </div>
        `:`
          <div class="material-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:8px; padding:12px 14px">
            ${d.map(l=>{const u=l.matData,x=u.tier||1,g=p[x]||"common";return`
                <div class="mat-card">
                  <div class="mat-card-header">
                    <div class="mat-card-icon">${Re(l.group,u)}</div>
                    <div class="mat-card-info">
                      <div class="mat-card-name rarity-${g}" title="${u.name}">${u.name}</div>
                      <div class="mat-card-meta">
                        <span class="mat-badge-tier t${x}">T${x} ${c[x]||""}</span>
                        ${u.sellPrice?`<span>${u.sellPrice} L.Thạch</span>`:""}
                      </div>
                    </div>
                  </div>
                  <div class="mat-card-desc" title="${u.description||""}">${u.description||"Nguyên liệu tu tiên quý hiếm."}</div>
                  <div class="mat-card-qty">x${l.qty}</div>
                </div>`}).join("")}
          </div>
        `}
      </div>
    `}bindEvents(){this.on("click","[data-mat-filter]",(t,e)=>{var n;const a=e.dataset.matFilter;(n=this.props.ctx)!=null&&n.state&&(this.props.ctx.state._matFilter=a),this.setState({filter:a})})}}class De extends M{template(){var o;const{player:t={},ctx:e}=this.props,a=((o=e==null?void 0:e.state)==null?void 0:o.medicines)||[],n=t.medCooldownRemaining||0,s=t.skills&&t.skills.some(r=>{const d=typeof r=="string"?r:r.id;return d==="duoc_ly"||d==="y_thuat"});return`
      <div class="medicine-bag" style="padding:12px">
        ${n>0?`
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:6px">
            <span style="color:var(--orange);font-weight:700">Đan độc: ${n}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${n/300*100}%;background:var(--orange)"></div></div>
          </div>`:""}

        ${a.length===0?'<div class="text-dim text-center mt-3">Túi trống không.</div>':a.map(r=>`
            <div class="list-item" style="padding:10px; align-items:center; display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05)">
              <div class="item-info" style="flex:1">
                <div class="item-name" style="font-weight:600; color:var(--text-bright)">${r.name}</div>
                <div class="item-meta" style="font-size:11px; color:var(--text-dim); margin-top:2px">
                  ${r.description}
                  ${r.healPercent?` · Phục hồi ${r.healPercent}% HP`:""}
                  ${r.cooldownAdd?` · Sinh Đan độc ${r.cooldownAdd}s`:""}
                  ${r.duration?` · Hiệu lực ${r.duration} trận`:""}
                  ${r.toxicity&&s?`<div class="text-red mt-xs">[Phản Phệ]: ${r.toxicity.chance}% tẩu hỏa nhập ma</div>`:""}
                  ${r.penalty&&s?`<div class="text-orange mt-xs">[Tác Dụng Phụ]: ${r.penalty.map(d=>`Giảm ${Math.abs(d.value)*100}% ${d.stat}`).join(", ")}</div>`:""}
                </div>
              </div>
              <button class="btn btn--sm btn--blue btn-use-med" data-med="${r.id}" 
                ${n+(r.cooldownAdd||0)>300?"disabled":""}>Nuốt</button>
            </div>
          `).join("")}
      </div>
    `}bindEvents(){this.on("click",".btn-use-med",async(t,e)=>{const a=e.dataset.med,{ctx:n}=this.props;if(!(!n||!a))try{const s=await n.api.useMedicine(n.state.playerId,a);n.state.player=s.player,n.notify(s.message,"success"),n.renderGame()}catch(s){n.notify(s.message||"Đan độc quá nồng!","error")}})}}class je extends M{template(){const{player:t={},category:e="weapon"}=this.props,a=t.inventory||[];let n=[];return e==="weapon"?n=a.filter(s=>s.slot==="weapon"&&s.category!=="manual"):e==="armor"?n=a.filter(s=>["body","shield","feet"].includes(s.slot)):e==="accessory"?n=a.filter(s=>["ring","amulet","ring1","ring2"].includes(s.slot)):e==="manual"&&(n=a.filter(s=>s.category==="manual")),n.length===0?'<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>':`
      <div class="item-grid-view">
        ${n.map(s=>{var r,d,c,p,v,l;let o=null;return s.slot==="weapon"?o=(r=t.equipment)==null?void 0:r.weapon:s.slot==="body"?o=(d=t.equipment)==null?void 0:d.body:s.slot==="shield"?o=(c=t.equipment)==null?void 0:c.shield:s.slot==="feet"?o=(p=t.equipment)==null?void 0:p.feet:["ring","ring1","ring2","amulet"].includes(s.slot)&&(o=((v=t.equipment)==null?void 0:v.ring1)||((l=t.equipment)==null?void 0:l.ring2)||null),Kt(s,!0,{equippedItem:o,isEquipped:!1})}).join("")}
      </div>
    `}onMounted(){this.props.ctx&&at(this.container,this.props.ctx)}onUpdated(){this.props.ctx&&at(this.container,this.props.ctx)}bindEvents(){this.on("click","[data-eid]",async(t,e)=>{t.stopPropagation();const a=e.dataset.eid,{ctx:n}=this.props;if(!(!n||!a))try{const s=await n.api.equipItem(n.state.playerId,a);n.state.player=s.player,n.notify(s.message,"success"),n.renderGame()}catch(s){n.notify(s.message||"Lỗi trang bị","error")}}),this.on("click","[data-use]",async(t,e)=>{t.stopPropagation();const a=e.dataset.use,{ctx:n}=this.props;if(!(!n||!a))try{const s=await n.api.useItem(n.state.playerId,a);n.state.player=s.player,n.notify(s.message,"success"),n.renderGame()}catch(s){n.notify(s.message||"Lỗi sử dụng","error")}})}}class Ke extends M{initialState(){var e;return{activeTab:((e=(this.props.ctx||{}).state)==null?void 0:e.inventoryTab)||"equipped"}}template(){var d,c,p,v,l,u,x;const{ctx:t}=this.props,e=((d=t==null?void 0:t.state)==null?void 0:d.player)||{},a=Object.values(e.equipment||{}),n=a.find(g=>g.slot==="ring1"),s=a.find(g=>g.slot==="ring2");let o=20;return((n==null?void 0:n.id)==="tui_tru_vat"||(c=n==null?void 0:n.baseType)!=null&&c.includes("tru_vat"))&&(o+=((v=(p=n.affixes)==null?void 0:p[0])==null?void 0:v.value)||10),((s==null?void 0:s.id)==="tui_tru_vat"||(l=s==null?void 0:s.baseType)!=null&&l.includes("tru_vat"))&&(o+=((x=(u=s.affixes)==null?void 0:u[0])==null?void 0:x.value)||10),`
      <div class="inventory-page">
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
          <h1 style="margin:0; font-size:20px; font-weight:700">
            Càn Khôn Túi <span style="font-size:14px; color:var(--text-dim); font-weight:400">(${(e.inventory||[]).length} / ${o})</span>
          </h1>
          <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">Sinh Mẫu (Debug)</button>
        </div>
        
        <div class="panel" style="background:var(--bg-surface, #151922); border-radius:10px; border:1px solid rgba(255,255,255,0.08); overflow:hidden">
          <div id="invTabsContainer" style="padding:10px 14px 0 14px"></div>
          <div class="panel-body no-pad" id="invTabContent" style="min-height:220px"></div>
        </div>
      </div>
    `}onMounted(){this.ensureMaterialCatalog(),this.renderTabs(),this.renderActiveSubView()}onUpdated(){this.renderTabs(),this.renderActiveSubView()}onUnmounted(){this._currentSubView&&(this._currentSubView.unmount(),this._currentSubView=null),this._tabsComponent&&(this._tabsComponent.unmount(),this._tabsComponent=null)}ensureMaterialCatalog(){var e,a,n;const{ctx:t}=this.props;t&&(t.state.materialCatalog||(t.state.materialCatalog={...st},(n=(a=(e=t.api)==null?void 0:e.request("/data/materials"))==null?void 0:a.then(s=>{let o={};s&&s.data&&typeof s.data=="object"&&!Array.isArray(s.data)?o=s.data:s&&s.materials&&Array.isArray(s.materials)&&s.materials.forEach(r=>{o[r.id]=r}),t.state.materialCatalog={...st,...o},this.state.activeTab==="material"&&this._currentSubView&&this._currentSubView.update()}))==null||n.catch(s=>{console.warn("Material catalog fetch warning, falling back to local map",s)})))}renderTabs(){var r;const t=this.container.querySelector("#invTabsContainer");if(!t)return;const{ctx:e}=this.props,a=((r=e==null?void 0:e.state)==null?void 0:r.player)||{},n=a.medCooldownRemaining||0,s=Object.entries(a.materials||{}).filter(([d,c])=>(c||0)>0),o=[{id:"equipped",label:"Ngự Khí"},{id:"weapon",label:"Vũ Khí"},{id:"armor",label:"Phòng Cụ"},{id:"accessory",label:"Trang Sức"},{id:"manual",label:"Bí Tịch"},{id:"medicine",label:"Đan Dược",badge:n>0?`${n}s`:null},{id:"material",label:"Kho Nguyên Liệu",badge:s.length>0?`${s.length}`:null}];this._tabsComponent&&this._tabsComponent.unmount(),this._tabsComponent=new ot({tabs:o,activeTab:this.state.activeTab,onTabChange:d=>{e&&(e.state.inventoryTab=d),this.setState({activeTab:d})}}),this._tabsComponent.mount(t)}renderActiveSubView(){var s;const t=this.container.querySelector("#invTabContent");if(!t)return;this._currentSubView&&(this._currentSubView.unmount(),this._currentSubView=null);const{ctx:e}=this.props,a=((s=e==null?void 0:e.state)==null?void 0:s.player)||{},{activeTab:n}=this.state;n==="equipped"?this._currentSubView=new Ae({player:a,ctx:e}):n==="material"?this._currentSubView=new Oe({player:a,ctx:e}):n==="medicine"?this._currentSubView=new De({player:a,ctx:e}):this._currentSubView=new je({player:a,category:n,ctx:e}),this._currentSubView.mount(t)}bindEvents(){this.on("click","#btnGen",async()=>{const{ctx:t}=this.props;if(!t)return;const e=["common","rare","epic","legendary"],a=e[Math.floor(Math.random()*e.length)];try{const n=await t.api.generateItem(t.state.playerId,a);t.state.player=n.player,t.state.items=n.items||[],t.notify(n.message||"Đã tạo pháp bảo ngẫu nhiên","success"),this.update()}catch{t.notify("Lỗi tạo ngẫu nhiên","error")}})}}let Q=null;function Ge(i,t){window.__rpgContext=t,t!=null&&t.api&&!t.api.unequipItem&&(t.api.unequipItem=(e,a)=>t.api.request(`/player/${e}/unequip`,{method:"POST",body:JSON.stringify({slot:a})})),t!=null&&t.api&&!t.api.getMaterials&&(t.api.getMaterials=()=>t.api.request("/data/materials")),Q&&(Q.unmount(),Q=null),Q=new Ke({ctx:t}),Q.mount(i)}let G=null;function Gt(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;e._dungeon||(e._dungeon={mapItems:[],timedDungeons:[],permanentDungeons:[],activeRun:null,history:[],loaded:!1,combatLog:[],lastLoot:[],lastResult:null});const r=e._dungeon;G&&(clearInterval(G),G=null);async function d(){try{const[m,T]=await Promise.all([a.getMapItems(o),a.getDungeonHistory(o)]);r.mapItems=m.mapItems||[],r.timedDungeons=m.timedDungeons||[],r.permanentDungeons=m.permanentDungeons||[],r.activeRun=m.activeRun||null,r.history=T.history||[],r.loaded=!0,v(),p()}catch(m){n(m.message||"Lỗi tải Bí Cảnh","error")}}function c(m){if(m<=0)return"Đã hết hạn";const T=Math.floor(m/3600),$=Math.floor(m%3600/60),w=Math.floor(m%60);return T>0?`${T}h ${$<10?"0":""}${$}m ${w<10?"0":""}${w}s`:`${$}m ${w<10?"0":""}${w}s`}function p(){r.timedDungeons.length!==0&&(G=setInterval(()=>{let m=!1;r.timedDungeons.forEach(T=>{var $;if(T.remainingSeconds>0){T.remainingSeconds-=1;const w=i.querySelector(`#countdown-${T.id}`);w&&(w.textContent=c(T.remainingSeconds),T.remainingSeconds<900&&(($=w.parentElement)==null||$.classList.add("countdown-urgency")))}else m=!0}),m&&(clearInterval(G),G=null,d())},1e3))}function v(){i.innerHTML=`
      <div class="page-header" style="margin-bottom:16px">
        <h2 style="display:flex;align-items:center;gap:8px">
          <span>Bí Cảnh Bát Hoang</span>
        </h2>
        <p class="page-sub" style="font-size:13px;line-height:1.5">
          Khám phá các di tích thần bí. Gồm <strong>Huyễn Cảnh Có Thời Hạn</strong> (xuất hiện chốc lát rồi biến mất) và <strong>Cấm Địa Thượng Cổ Vĩnh Cửu</strong> (quái vật cuồng bạo x2.0 ~ x3.5 sức mạnh).
        </p>
      </div>

      ${r.activeRun?l():u()}

      ${r.lastResult?h():""}

      ${y()}
    `,f()}function l(){var _,S;const m=r.activeRun,T=m.currentWave===m.totalWaves,$=((m.currentWave-1)/m.totalWaves*100).toFixed(0),w=(m.difficultyMult||1)>=2,k=(m.difficultyMult||1).toFixed(2);return`
      <div class="panel ${w?"realm-card--permanent":""}" style="border-color:${w?"#572c30":"#735f37"};margin-bottom:16px">
        <div class="panel-title" style="color:${w?"#d67a7a":"var(--gold)"};display:flex;justify-content:space-between;align-items:center">
          <span>Đang Trong Bí Cảnh</span>
          ${w?`<span class="badge-danger-apex">Quái Cuồng Bạo x${k}</span>`:`<span class="badge" style="background:rgba(194,159,85,0.15);color:#dfcfb2;border:1px solid rgba(194,159,85,0.3);font-size:11px">Độ Khó x${k}</span>`}
        </div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:17px;font-weight:700;margin-bottom:8px;color:var(--text-bright)">${m.dungeonName||m.dungeonId}</div>

          <!-- Highlight Banner -->
          ${T?`
            <div style="background:rgba(184,74,74,0.12);border:1px solid rgba(184,74,74,0.35);border-radius:6px;padding:8px 12px;margin-bottom:12px;text-align:center">
              <span style="font-size:13px;font-weight:700;color:#d67a7a;letter-spacing:0.5px">
                TẦNG CUỐI CÙNG — TRÙM BÍ CẢNH TRẤN THỦ
              </span>
            </div>
          `:`
            <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;padding:6px 12px;margin-bottom:12px">
              <span style="font-size:12px;opacity:0.85">
                Đang vượt ải: <strong>Tầng ${m.currentWave} / ${m.totalWaves}</strong>
              </span>
            </div>
          `}

          <!-- Wave Progress Indicator -->
          <div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:600;margin-bottom:6px">
              <span style="color:var(--text-dim)">Tiến Độ Ải:</span>
              <span style="color:${T?"#d67a7a":"var(--gold)"};font-weight:700">Tầng ${m.currentWave} / ${m.totalWaves} (${$}%)</span>
            </div>
            <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:8px;overflow:hidden;padding:1px;border:1px solid rgba(255,255,255,0.1)">
              <div style="width:${$}%;height:100%;background:${w?"#8c4242":"#82a4d4"};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex;gap:10px">
            <button class="btn ${w?"btn--red":"btn--gold"}" id="btnFight" style="flex:1;font-weight:700;font-size:14px" ${((_=e.player)==null?void 0:_.hospitalRemaining)>0?"disabled":""}>
              ${T?"Đại Chiến Trùm Cuối":"Tấn Công Ải "+m.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon" style="padding:0 20px">Rút Lui</button>
          </div>
          ${((S=e.player)==null?void 0:S.hospitalRemaining)>0?'<div style="color:var(--red);font-size:12px;margin-top:10px">[Trọng thương] Chờ hồi phục khí huyết...</div>':""}
        </div>
      </div>
    `}function u(){return`
      <!-- SECTION 1: TIMED SECRET REALMS -->
      <div class="panel" style="margin-bottom:16px;border-color:rgba(168, 85, 247, 0.4)">
        <div class="panel-title" style="color:#c084fc;display:flex;align-items:center;justify-content:space-between">
          <span>Huyễn Cảnh (Có Thời Hạn)</span>
          <span class="badge" style="background:rgba(168,85,247,0.15);color:#d8b4fe;border:1px solid rgba(168,85,247,0.3);font-size:11px">
            ${r.timedDungeons.length} Khả Dụng
          </span>
        </div>
        <div class="panel-body no-pad">
          ${x()}
        </div>
      </div>

      <!-- SECTION 2: PERMANENT SECRET REALMS -->
      <div class="panel" style="margin-bottom:16px;border-color:rgba(239, 68, 68, 0.4)">
        <div class="panel-title" style="color:#f87171;display:flex;align-items:center;justify-content:space-between">
          <span>Thượng Cổ Cấm Địa (Vĩnh Cửu)</span>
          <span class="badge" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid rgba(239,68,68,0.3);font-size:11px">
            ${r.permanentDungeons.length} Cấm Địa
          </span>
        </div>
        <div class="panel-body no-pad">
          ${g()}
        </div>
      </div>

      <!-- SECTION 3: MAP ITEMS -->
      <div class="panel" style="margin-bottom:16px">
        <div class="panel-title" style="display:flex;align-items:center;justify-content:space-between">
          <span>Ngọc Giản Cổ Đồ (Khai Mở Tiêu Hao)</span>
          <span style="font-size:12px;opacity:0.6">${r.mapItems.length} Mẫu Đồ</span>
        </div>
        <div class="panel-body no-pad">
          ${b()}
        </div>
      </div>
    `}function x(){return r.timedDungeons.length===0?`
        <div style="text-align:center;opacity:0.6;padding:24px 16px;font-size:13px">
          Hiện tại chưa phát hiện Huyễn Cảnh nào.<br>
          <span style="font-size:12px;opacity:0.8">Hãy đi <strong>Khám Phá</strong> tại các vùng đất để nắm bắt cơ duyên phát hiện ảo cảnh sắp tiêu tán!</span>
        </div>
      `:r.timedDungeons.map(m=>{var L;const $=(((L=e.player)==null?void 0:L.realm)??1)>=m.requiredRealm,w=(m.difficultyMult||1.1).toFixed(2),k=m.remainingSeconds<900,_=m.waves||(m.totalWaves>1?m.totalWaves-1:3),S=['<span class="tag">Linh Thảo</span>','<span class="tag">Huyết Tinh</span>','<span class="tag">Nội Đan</span>','<span class="tag">Tẩy Tủy Đan</span>'].join(" ");return`
        <div class="realm-card--timed" style="margin:12px;padding:16px">
          <div style="display:flex;align-items:flex-start;gap:14px">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
                <span style="font-weight:700;color:#e9d5ff;font-size:15px">${m.name}</span>
                <span class="realm-badge--timed">Bậc ${m.tier||1}</span>
                <span class="badge ${k?"countdown-urgency":""}" style="background:rgba(168,85,247,0.15);color:#d8b4fe;border:1px solid rgba(168,85,247,0.3);font-size:11px;font-weight:600">
                  Còn <span id="countdown-${m.id}">${c(m.remainingSeconds)}</span>
                </span>
                ${k?'<span class="badge countdown-urgency" style="background:rgba(184,74,74,0.15);color:#d67a7a;border:1px solid rgba(184,74,74,0.3);font-size:10px;font-weight:700">Sắp Tan Biến (&lt; 15p)</span>':""}
                <span class="badge bg-darker text-xs">Cảnh giới ${m.requiredRealm}+</span>
              </div>
              <div style="font-size:12px;opacity:0.85;line-height:1.4;margin-bottom:8px">${m.description}</div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:11px;margin-bottom:8px">
                <span style="color:#d8b4fe">Ải: <strong>${_} Ải + 1 Thủ Lĩnh</strong></span>
                <span style="color:#fbbf24">Độ khó: <strong>x${w}</strong></span>
                <span style="color:#c084fc">Thủ Vệ: <strong style="color:#e9d5ff">${m.bossName}</strong></span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:11px">
                <span style="opacity:0.7">Vật phẩm:</span>
                ${S}
              </div>
            </div>
            <div style="align-self:center">
              <button class="btn btn--sm btn--gold" data-enter-disc="${m.id}" ${$?"":"disabled"}>
                ${$?"Tiến Vào":"Cảnh Giới Thấp"}
              </button>
            </div>
          </div>
        </div>
      `}).join("")}function g(){return r.permanentDungeons.length===0?`
        <div style="text-align:center;opacity:0.6;padding:24px 16px;font-size:13px">
          Chưa khai mở Cấm Địa Thượng Cổ nào.<br>
          <span style="font-size:12px;opacity:0.8">Khi đi <strong>Khám Phá</strong>, bạn có cơ hội đào phá phong ấn cổ xưa để mở khóa Cấm Địa Vĩnh Viễn!</span>
        </div>
      `:r.permanentDungeons.map(m=>{var L;const $=(((L=e.player)==null?void 0:L.realm)??1)>=m.requiredRealm,w=(m.difficultyMult||2.2).toFixed(2),k=m.clearCount>0?`Đã phá ${m.clearCount} lần`:"Chưa chinh phục",_=m.waves||(m.totalWaves>1?m.totalWaves-1:4),S=['<span class="tag">Nội Đan</span>','<span class="tag">Tẩy Tủy Đan</span>','<span class="tag">Hoàn Cốt Đan</span>','<span class="tag">Ngọc Giản Cổ Đồ</span>'].join(" ");return`
        <div class="realm-card--permanent" style="margin:12px;padding:16px">
          <!-- Prominent Hazard Banner -->
          <div style="background:rgba(184,74,74,0.12);border:1px solid rgba(184,74,74,0.35);border-radius:4px;padding:6px 12px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <span style="color:#d67a7a;font-size:12px;font-weight:700;letter-spacing:0.5px">
              CỰC HUNG HIỂM: Quái Vật Cuồng Bạo (x${w})
            </span>
            <span class="badge-danger-apex">[Cuồng Bạo]</span>
          </div>

          <div style="display:flex;align-items:flex-start;gap:14px">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
                <span style="font-weight:700;color:#fca5a5;font-size:15px">${m.name}</span>
                <span class="realm-badge--permanent">Cấm Địa Bậc ${m.tier||1}</span>
                <span class="badge" style="background:rgba(184,74,74,0.15);color:#d67a7a;border:1px solid rgba(184,74,74,0.3);font-size:11px;font-weight:600">
                  Độ Khó: x${w}
                </span>
                <span class="badge" style="background:${m.clearCount>0?"rgba(79,140,98,0.15)":"rgba(255,255,255,0.06)"};color:${m.clearCount>0?"#7cb387":"var(--text-dim)"};border:1px solid ${m.clearCount>0?"rgba(79,140,98,0.35)":"rgba(255,255,255,0.1)"};font-size:11px">
                  ${k}
                </span>
                <span class="badge bg-darker text-xs">Cảnh giới ${m.requiredRealm}+</span>
              </div>
              <div style="font-size:12px;opacity:0.85;line-height:1.4;margin-bottom:8px">${m.description}</div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:11px;margin-bottom:8px">
                <span style="color:#fca5a5">🏰 <strong>${_} Ải + 1 Ma Thần</strong></span>
                <span>🐉 Trùm Cấm Địa: <strong style="color:#f87171"><span class="badge-danger-apex">🔥 [Cuồng Bạo]</span> ${m.bossName}</strong></span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:11px">
                <span style="opacity:0.7">💎 Thưởng Thượng Cổ:</span>
                ${S}
              </div>
            </div>
            <div style="align-self:center">
              <button class="btn btn--sm btn--red" data-enter-disc="${m.id}" ${$?"":"disabled"}>
                ${$?"🔥 Khiêu Chiến":"🔒 Cảnh Giới Thấp"}
              </button>
            </div>
          </div>
        </div>
      `}).join("")}function b(){return r.mapItems.length===0?`
        <div style="text-align:center;opacity:0.5;padding:24px 16px;font-size:13px">
          Chưa có Ngọc Giản nào trong Túi Đồ.<br>
          <span style="font-size:12px;opacity:0.8">Hãy đánh bại quái vật thế giới để có cơ hội thu thập Ngọc Giản Cổ Đồ!</span>
        </div>
      `:r.mapItems.map(m=>{const T=m.dungeon;return`
        <div class="list-item" style="padding:14px 16px;border:1px solid var(--border);border-left:3px solid #4a7858;border-radius:4px;margin:8px 12px;display:flex;align-items:center;gap:12px;background:var(--bg-panel-alt)">
          <div class="item-info" style="flex:1">
            <div class="item-name" style="font-size:14px;font-weight:700;color:var(--text-bright);display:flex;align-items:center;gap:8px">
              <span>${m.item.name}</span>
              <span class="badge" style="background:rgba(74,120,88,0.15);color:#7cb387;border:1px solid rgba(74,120,88,0.3);font-size:11px">x${m.quantity} Mảnh</span>
            </div>
            ${T?`
              <div class="item-meta" style="font-size:12px;opacity:0.8;margin-top:4px">
                🏛️ ${T.name} · Bậc T${T.tier} · 🏰 ${T.waves+1} Tầng · 🐉 Boss: <strong style="color:var(--gold)">${T.bossName}</strong>
              </div>
            `:""}
          </div>
          ${T?`
            <button class="btn btn--sm btn--gold" data-enter="${m.item.id}" style="font-weight:700">
              ⚡ Kích Hoạt
            </button>
          `:""}
        </div>
      `}).join("")}function h(){var w,k;const m=r.lastResult,T=m.result==="dungeon_complete"?"🏆":m.result==="wave_cleared"?"✅":"💀",$=m.result==="dungeon_failed"?"var(--red)":"var(--gold)";return`
      <div class="panel" style="margin-bottom:16px;border-color:${$}">
        <div class="panel-title" style="color:${$}">${T} Kết Quả Chiến Đấu</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px;font-size:14px">${m.message}</div>
          ${(w=m.loot)!=null&&w.length?`
            <div style="margin-bottom:10px;padding:8px;background:rgba(16,185,129,0.1);border-radius:6px;border:1px solid rgba(16,185,129,0.2)">
              <div style="font-size:11px;font-weight:700;color:var(--green);margin-bottom:4px">🎁 CHIẾN LỢI PHẨM THU ĐƯỢC:</div>
              ${m.loot.map(_=>`<div style="font-size:12px;color:var(--green)">${_}</div>`).join("")}
            </div>
          `:""}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.6">📜 Xem chi tiết diễn biến (${((k=m.combatLog)==null?void 0:k.length)||0} lượt)</summary>
            <div style="max-height:160px;overflow-y:auto;font-size:11px;opacity:0.7;margin-top:6px;padding:8px;background:rgba(0,0,0,0.3);border-radius:6px">
              ${(m.combatLog||[]).map(_=>`<div>${_}</div>`).join("")}
            </div>
          </details>
        </div>
      </div>
    `}function y(){return r.history.length===0?"":`
      <div class="panel" style="margin-top:16px">
        <div class="panel-title">📚 Lịch Sử Khiêu Chiến Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:220px;overflow-y:auto">
          ${r.history.map(m=>{const T=m.status==="completed"?"✅":m.status==="failed"?"❌":m.status==="abandoned"?"🚪":"⏳";return`
              <div class="list-item" style="padding:10px 14px;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04)">
                <span style="color:${m.status==="completed"?"var(--green)":m.status==="failed"?"var(--red)":"var(--orange)"};font-weight:600">${T} ${m.dungeonName}</span>
                <span style="opacity:0.5;margin-left:auto">Tầng ${m.wave}/${m.totalWaves} · ${new Date(m.startedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}function f(){var m,T;document.querySelectorAll("[data-enter-disc]").forEach($=>{$.addEventListener("click",async()=>{const w=$.dataset.enterDisc;if(confirm("⚡ Quyết định tiến vào Bí Cảnh này để khiêu chiến?")){$.disabled=!0;try{const k=await a.enterDiscoveredDungeon(o,w);n(k.message,"success"),e.player=k.player,s(),r.activeRun=k.run,r.lastResult=null,await d()}catch(k){n(k.message,"error"),$.disabled=!1}}})}),document.querySelectorAll("[data-enter]").forEach($=>{$.addEventListener("click",async()=>{const w=$.dataset.enter;if(confirm("⚡ Kích hoạt Ngọc Giản và mở lối vào Bí Cảnh?")){$.disabled=!0;try{const k=await a.enterDungeon(o,w);n(k.message,"success"),e.player=k.player,s(),r.activeRun=k.run,r.lastResult=null,await d()}catch(k){n(k.message,"error"),$.disabled=!1}}})}),(m=document.getElementById("btnFight"))==null||m.addEventListener("click",async()=>{const $=document.getElementById("btnFight");$.disabled=!0,$.textContent="⏳ Đang giao chiến...";try{const w=await a.fightDungeonWave(o);e.player=w.player,s(),r.lastResult=w,w.result==="dungeon_complete"||w.result==="dungeon_failed"?r.activeRun=null:w.result==="wave_cleared"&&(r.activeRun.currentWave=w.nextWave),v()}catch(w){n(w.message,"error"),$.disabled=!1,$.textContent="⚔️ Chiến Đấu"}}),(T=document.getElementById("btnAbandon"))==null||T.addEventListener("click",async()=>{if(confirm("🚪 Rút lui khỏi Bí Cảnh? Tiến trình hiện tại sẽ bị hủy!"))try{await a.abandonDungeon(o),n("Đã rời khỏi Bí Cảnh an toàn.","info"),r.activeRun=null,r.lastResult=null,await d()}catch($){n($.message,"error")}})}r.loaded?(v(),p()):d()}function Vt(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;e._tc||(e._tc={data:null,loaded:!1,fighting:!1,tab:"atlas"});const r=e._tc;async function d(){try{r.data=await a.request(`/player/${o}/atlas-maps`),r.loaded=!0,c()}catch(g){n(g.message,"error")}}function c(){const g=r.data,b=(g==null?void 0:g.atlas)||{},h=(g==null?void 0:g.maps)||[],y=g==null?void 0:g.activeRun,f=(g==null?void 0:g.allMaps)||[];g!=null&&g.modifiers,i.innerHTML=`
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
            <div style="font-weight:800;font-size:18px">${b.completed||0}/${b.total||16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${b.bonus||0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${b.pct||0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${b.pct||0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${r.tab==="atlas"?"btn--blue":""} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${r.tab==="inventory"?"btn--blue":""} btn--sm" data-tab="inventory">📦 Tiên Đồ (${h.length})</button>
        ${y?'<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>':""}
      </div>

      <div id="tcContent"></div>
    `,i.querySelectorAll("[data-tab]").forEach(T=>{T.addEventListener("click",()=>{r.tab=T.dataset.tab,c()})});const m=document.getElementById("tcContent");m&&(y&&r.tab==="run"?u(m,y):r.tab==="inventory"?v(m,h):p(m,f,b))}function p(g,b,h){var f;const y=((f=r.data)==null?void 0:f.tiers)||[];g.innerHTML=y.map(m=>{const T=b.filter($=>$.tier===m.tier);return`
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${m.tier} ${m.name} <span style="opacity:0.4;font-size:11px">(Realm ${m.requiredRealm}+, ${m.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${T.map($=>{var _;const w=((_=h.progress)==null?void 0:_[$.id])||0;return`<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${{fire:"🔥",water:"💧",wood:"🌿",earth:"⛰️",metal:"⚔️"}[$.element]||"🗺️"}</span>
                <span style="flex:1;font-weight:${w?700:400}">${$.name}</span>
                ${w?`<span style="color:var(--green);font-size:11px">✅ ×${w}</span>`:'<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`}).join("")}
          </div>
        </div>
      `}).join("")}function v(g,b,h){if(b.length===0){g.innerHTML='<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>';return}g.innerHTML=b.map((y,f)=>{const m=y.modifiers||[];return`<div class="panel" style="margin-bottom:8px;border-left:3px solid ${x(y.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${y.mapName||y.mapId} <span style="color:${x(y.tier)};font-size:12px">T${y.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${m.length>0?m.map(T=>T.name).join(" · "):"Không có modifier"}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${m.length<3?`<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${f}">☯ Mod</button>`:""}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${f}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`}).join(""),g.querySelectorAll(".btn-open-map").forEach(y=>{y.addEventListener("click",async()=>{try{const f=await a.request(`/player/${o}/atlas-maps/open`,{method:"POST",body:JSON.stringify({mapIndex:parseInt(y.dataset.idx)})});n(f.message,"success"),e.player=f.player,s(),r.tab="run",await d()}catch(f){n(f.message,"error")}})}),g.querySelectorAll(".btn-add-mod").forEach(y=>{y.addEventListener("click",()=>l(parseInt(y.dataset.idx)))})}function l(g){var y;const b=((y=r.data)==null?void 0:y.modifiers)||[],h=document.createElement("div");h.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100",h.innerHTML=`<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${b.map(f=>`<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${f.id}">
          <span style="flex:1"><strong>${f.name}</strong><br><span style="font-size:11px;opacity:0.6">${f.desc} · IIQ +${f.iiqBonus}%</span></span>
        </div>`).join("")}
      </div>
    </div>`,h.addEventListener("click",async f=>{const m=f.target.closest("[data-modid]");if(m)try{const T=await a.request(`/player/${o}/atlas-maps/modify`,{method:"POST",body:JSON.stringify({mapIndex:g,modifierId:m.dataset.modid})});n(T.message,"success"),e.player=T.player,s(),h.remove(),await d()}catch(T){n(T.message,"error")}else f.target===h&&h.remove()}),document.body.appendChild(h)}function u(g,b){var f,m;const h=b.currentWave/b.totalWaves*100,y=b.modifiers||[];g.innerHTML=`
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${b.mapName} <span style="color:${x(b.tier)}">T${b.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${b.currentWave}/${b.totalWaves}
            ${y.length>0?" · "+y.map(T=>T.name).join(" "):""}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${h}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${r.fighting?"disabled":""}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `,(f=document.getElementById("btnTCFight"))==null||f.addEventListener("click",async()=>{r.fighting=!0,c();try{const T=await a.request(`/player/${o}/atlas-maps/fight`,{method:"POST"});e.player=T.player,s();const $=T.result!=="map_failed";n(T.message,$?"success":"error"),r.fighting=!1,(T.result==="map_complete"||T.result==="map_failed")&&(r.tab="atlas"),await d()}catch(T){n(T.message,"error"),r.fighting=!1,c()}}),(m=document.getElementById("btnTCQuit"))==null||m.addEventListener("click",async()=>{try{await a.request(`/player/${o}/atlas-maps/abandon`,{method:"POST"}),n("Đã rời Tiên Cảnh","info"),r.tab="atlas",await d()}catch(T){n(T.message,"error")}})}function x(g){return{1:"#5ba3cf",2:"#6a8f3f",3:"#d4a017",4:"#b06cff",5:"#ff6b35",6:"#ff4500",7:"#e91e63",8:"#ff0000"}[g]||"#666"}r.loaded?c():d()}function _t(i){const t=parseInt(i)||1;return t<=10?"Luyện Khí":t<=20?"Trúc Cơ":t<=30?"Kim Đan":t<=40?"Nguyên Anh":t<=50?"Hóa Thần":t<=65?"Luyện Hư":t<=80?"Hợp Thể":t<=100?"Đại Thừa":t<=120?"Độ Kiếp":t<=135?"Chân Tiên":t<=145?"Kim Tiên":t<=155?"Thái Ất":"Đại La / Hỗn Nguyên"}function Lt(i){if(!i)return"modifier-tag--buff";const t=i.toLowerCase();return t.includes("st nhận")||t.includes("gây & nhận")||t.includes("huyết chiến")||t.includes("hỗn loạn")?"modifier-tag--hybrid":t.includes("-10%")||t.includes("-15%")||t.includes("đóng băng: -")||t.includes("u minh: -")||t.includes("-")&&!t.includes("->")?"modifier-tag--debuff":"modifier-tag--buff"}function Pt(i){const t=(i||"").toLowerCase();let e="🌿",a="specialty-pill--herb";return t.includes("thạch")||t.includes("khoáng")||t.includes("quặng")||t.includes("thiết")||t.includes("tinh thạch")||t.includes("kim loại")||t.includes("thần thạch")?(e="⛏️",a="specialty-pill--mineral"):t.includes("nanh")||t.includes("cốt")||t.includes("vũ")||t.includes("nhãn")||t.includes("xác")||t.includes("thịt")||t.includes("da")||t.includes("hạch")||t.includes("yêu thú")||t.includes("nội đan")?(e="🐾",a="specialty-pill--beast"):t.includes("thảo")||t.includes("diệp")||t.includes("hoa")||t.includes("chi")||t.includes("nhựa")||t.includes("mộc")||t.includes("cây")?(e="🌿",a="specialty-pill--herb"):(t.includes("tinh")||t.includes("châu")||t.includes("khí")||t.includes("thủy")||t.includes("phiến"))&&(e="⛏️",a="specialty-pill--mineral"),`<span class="specialty-pill ${a}">${e} ${i}</span>`}function Ut(i,t){const{state:e}=t,a=e._travelTab||"map";i.innerHTML=`
    <div class="page-header">
      <h1>Ngao Du Bát Hoang</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên, chinh phục bí cảnh và tầm bảo tiên cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${a==="map"?"active":""}" data-tab="map" style="flex:1;padding:10px;border:none;background:${a==="map"?"rgba(255,255,255,0.08)":"transparent"};color:${a==="map"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${a==="map"?"700":"400"};border-bottom:2px solid ${a==="map"?"var(--gold)":"transparent"};transition:all 0.2s">
        Bản Đồ Bát Hoang
      </button>
      <button class="tab-btn ${a==="dungeon"?"active":""}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${a==="dungeon"?"rgba(255,255,255,0.08)":"transparent"};color:${a==="dungeon"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${a==="dungeon"?"700":"400"};border-bottom:2px solid ${a==="dungeon"?"var(--gold)":"transparent"};transition:all 0.2s">
        Bí Cảnh
      </button>
      <button class="tab-btn ${a==="tiencanh"?"active":""}" data-tab="tiencanh" style="flex:1;padding:10px;border:none;background:${a==="tiencanh"?"rgba(255,255,255,0.08)":"transparent"};color:${a==="tiencanh"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${a==="tiencanh"?"700":"400"};border-bottom:2px solid ${a==="tiencanh"?"var(--gold)":"transparent"};transition:all 0.2s">
        Tiên Cảnh (Atlas)
      </button>
    </div>
    <div id="travelTabContent"></div>
  `,i.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{e._travelTab=s.dataset.tab,Ut(i,t)})});const n=i.querySelector("#travelTabContent");a==="map"?Y(n,t):a==="dungeon"?Gt(n,t):Vt(n,t)}async function Y(i,t){var o;const{state:e,api:a,notify:n,updateSidebar:s}=t;i.innerHTML='<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>';try{const[r,d]=await Promise.all([a.request("/data/areas"),a.request(`/player/${e.playerId}/area`)]),c=r.areas||[],p=d.area,v=d.player,l=d.traveling||!1,u=d.travelRemaining||0,x=d.travelDestination||"";d.message&&n(d.message,"success"),d.player&&(e.player=d.player,s());const g=e.exploration||{},b=g[(v==null?void 0:v.currentArea)||"thanh_lam_tran"],h=(p==null?void 0:p.name)||(b==null?void 0:b.name)||"Vùng Đất Vô Danh",y=(b==null?void 0:b.staminaCost)||10,f={thanh_lam_tran:"🌾 Tân thủ thôn: Khu vực an toàn",hac_phong_lam:"🌲 Rừng rậm: +5% Tốc Độ",vong_linh_coc:"👻 Âm khí: +10% Nhanh Nhẹn",thiet_huyet_son:"🌋 Nóng bức: +10% ST Hỏa",thien_kiep_uyen:"⚡ Lôi điện: +15% Tốc Độ",bac_suong_canh:"❄️ Đóng băng: -10% Tốc Độ",am_sat_hoang:"🎯 Sát khí: +15 Nhanh Nhẹn",co_moc_linh_vien:"🌳 Linh mộc: +15% Phòng Ngự",huyet_ma_chien_truong:"🩸 Huyết chiến: +30% ST, +20% ST nhận",thien_hoa_linh_dia:"🔥 Địa hỏa: +25% ST Hỏa",u_minh_quy_vuc:"💀 U minh: -15% Phòng Ngự",thien_dao_tan_tich:"✨ Thiên đạo: +15% Toàn Chỉ Số",vo_tan_hu_khong:"🌀 Hỗn loạn: +50% ST Gây & Nhận",cuu_u_than_uyen:"👿 Cửu U ma khí: +35% ST, +20% Tốc Độ",thai_co_hong_hoang:"🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp",chu_thien_tinh_hai:"🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn",hon_don_tien_vuc:"🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số",hon_nguyen_dao_canh:"👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính"},m=f[v==null?void 0:v.currentArea]||"",T=[...c].sort(($,w)=>($.sort_order||$.mapY||0)-(w.sort_order||w.mapY||0));if(i.innerHTML=`
      ${l?`
        <div class="panel glass" style="border-color:var(--gold); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${x}</span></strong>
            <div id="travelTimer" style="font-size:24px; font-weight:bold; color:var(--gold); margin:12px 0">⏳ ${u}s</div>
            <div class="bar-track" style="margin-top:12px; height:8px; background:rgba(0,0,0,0.5); border-radius:4px; overflow:hidden">
              <div class="bar-fill energy" id="travelBar" style="width:100%; height:100%; background:#9c773a; transition: width 1s linear"></div>
            </div>
            <div class="text-xs text-dim" style="margin-top:8px">Đang vượt qua kết giới... Xin kiên nhẫn chờ đến nơi.</div>
          </div>
        </div>
      `:`
        <div class="panel" style="border-color:rgba(79, 140, 98, 0.3); margin-bottom:16px">
          <div class="panel-body" style="padding: 14px 16px">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-dim mb-xs">Vùng Đất Hiện Tại</div>
                <div class="text-lg text-green bold" style="display:flex;align-items:center;gap:6px">
                  ${h}
                  <span class="badge" style="background:rgba(79, 140, 98, 0.15);color:#7cb387;border:1px solid rgba(79, 140, 98, 0.35);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${y} TL/lần</div>
              </div>
            </div>
            ${p!=null&&p.description?`<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${p.description}</div>`:""}
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px;font-weight:600">
                Yêu Cầu: Lv.${(p==null?void 0:p.min_level)||1}+ · ${_t((p==null?void 0:p.min_level)||1)} Cảnh
              </span>
              ${m?`<span class="modifier-tag ${Lt(m)}">${m}</span>`:""}
            </div>
            ${(o=b==null?void 0:b.specialtyNames)!=null&&o.length?`
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px">
                <span style="font-size:11px;color:var(--text-dim)">Đặc Sản:</span>
                ${b.specialtyNames.map($=>Pt($)).join(" ")}
              </div>
            `:""}
          </div>
        </div>
      `}

      <!-- 2D REALM MAP OVERVIEW -->
      <div class="panel">
        <div class="panel-title flex items-center justify-between">
          <span>Thiên Địa Giới Đồ (2D Bát Hoang)</span>
          <span class="text-xs text-dim">${T.length} Khu vực</span>
        </div>
        <div class="panel-body" style="background:rgba(0,0,0,0.2); padding:12px">
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px">
            ${T.map(($,w)=>{var ft,$t,Tt;const k=g[$.id],_=$.id===v.currentArea&&!l,S=v.level<($.min_level||1),L=parseInt($.travel_time)||0,P=parseInt($.stamina_cost)||(k==null?void 0:k.staminaCost)||10,H=f[$.id]||"",E=$.tier||"Bát Hoang",N=_t($.min_level),z=(k==null?void 0:k.specialtyNames)||$.specialties||[],I=P>=100?"rgba(239,68,68,0.2)":P>=40?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)",O=P>=100?"var(--red)":P>=40?"var(--gold)":"var(--text-dim)";let K="rgba(255,255,255,0.08)",dt="rgba(255,255,255,0.03)";return _?(K="rgba(79, 140, 98, 0.45)",dt="rgba(79, 140, 98, 0.05)"):S&&(K="rgba(239, 68, 68, 0.2)",dt="rgba(15, 23, 42, 0.4)"),`
                <div class="realm-card ${_?"current-realm":""} ${S?"locked-realm":""}" 
                     style="border:1px solid ${K}; background:${dt}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${_?'<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:24px solid #4f8c62; border-left:24px solid transparent"><span style="position:absolute; top:-22px; right:3px; font-size:9px; color:#fff">✓</span></div>':""}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${_?"#7cb387":S?"var(--text-dim)":"var(--text-bright)"}">
                        #${w+1} ${$.name}
                      </div>
                      ${S?'<span style="color:var(--red); font-size:11px">[Khóa]</span>':""}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      ${E}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${$.description||"Vùng đất hoang sơ chưa rõ lai lịch."}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${S?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)"}; color:${S?"var(--red)":"var(--text-dim)"}">
                        Lv.${$.min_level||1}+ · ${N} Cảnh
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${L>0?`${L}s`:"Tức thời"}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${I}; color:${O}; border:1px solid ${I}">
                        -${P} TL (Dò thám)
                      </span>
                    </div>

                    ${z.length?`
                      <div style="margin-bottom:8px">
                        <div style="font-size:10px; color:var(--text-dim); margin-bottom:3px">Đặc sản tài nguyên:</div>
                        <div style="display:flex; flex-wrap:wrap; gap:4px">
                          ${z.map(D=>Pt(typeof D=="string"?D:D.name)).join("")}
                        </div>
                      </div>
                    `:""}

                    ${k!=null&&k.rates?`
                      <div style="display:flex; gap:6px; font-size:10px; margin-bottom:8px; opacity:0.85">
                        <span style="color:#7cb387">Thảo ~${((ft=k.rates.find(D=>D.type==="herb"))==null?void 0:ft.weight)||0}%</span>
                        <span style="color:rgba(255,255,255,0.2)">·</span>
                        <span style="color:#82a4d4">Khoáng ~${(($t=k.rates.find(D=>D.type==="mineral"))==null?void 0:$t.weight)||0}%</span>
                        <span style="color:rgba(255,255,255,0.2)">·</span>
                        <span style="color:#d67a7a">Yêu thú ~${((Tt=k.rates.find(D=>D.type==="monster"))==null?void 0:Tt.weight)||0}%</span>
                      </div>
                    `:""}

                    ${H?`
                      <div style="margin-bottom:10px">
                        <div class="modifier-tag ${Lt(H)}">
                          ${H}
                        </div>
                      </div>
                    `:""}
                  </div>

                  <div style="margin-top:auto">
                    ${_?`
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(79, 140, 98, 0.15); color:#7cb387; border:1px solid rgba(79, 140, 98, 0.35)">
                        Đang Tọa Trấn
                      </button>
                    `:S?`
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Cấp ${$.min_level} (${N})
                      </button>
                    `:`
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${$.id}" ${l?"disabled":""}>
                        ${L>0?`Vi Hành (${L}s)`:"Độn Thổ Đến"}
                      </button>
                    `}
                  </div>

                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,i.querySelectorAll("[data-travel]").forEach($=>{$.addEventListener("click",async w=>{w.stopPropagation();const k=$.dataset.travel;i.querySelectorAll("[data-travel]").forEach(_=>{_.tagName==="BUTTON"&&(_.disabled=!0),_.style.pointerEvents="none"});try{const _=await a.request(`/player/${e.playerId}/travel`,{method:"POST",body:JSON.stringify({areaId:k})});_.player&&(e.player=_.player,s()),n(_.message,"success"),Y(i,t)}catch(_){n(_.message||"Lỗi di chuyển!","error"),Y(i,t)}})}),l&&u>0){let $=u;const w=u,k=setInterval(async()=>{$--;const _=document.getElementById("travelTimer"),S=document.getElementById("travelBar");if(_&&(_.textContent=`⏳ ${Math.max(0,$)}s`),S&&(S.style.width=`${Math.max(0,$/w*100)}%`),$<=0){clearInterval(k);try{const L=await a.request(`/player/${e.playerId}/travel-check`,{method:"POST"});L.player&&(e.player=L.player,s()),L.arrived&&n(L.message,"success"),Y(i,t)}catch{Y(i,t)}}},1e3)}}catch(r){i.innerHTML='<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>',console.error(r)}}const Ft={legendary:"#f59e0b",epic:"#a855f7",rare:"#facc15",uncommon:"#38bdf8",common:"#94a3b8"},Ve={weapon:"⚔️",body:"🛡️",shield:"🛡️",feet:"👢",ring:"💍"},Ue=[{id:"tay_tuy_phu",name:"Tẩy Tủy Phù",icon:"🔄",desc:"Xóa toàn bộ affix và roll lại ngẫu nhiên",cost:200},{id:"hon_chu_phu",name:"Hỗn Chú Phù",icon:"➕",desc:"Thêm 1 dòng affix ngẫu nhiên (tối đa 4)",cost:500},{id:"thien_menh_phu",name:"Thiên Mệnh Phù",icon:"🔒",desc:"Khóa 1 dòng affix, xóa và roll lại phần còn lại",cost:1e3},{id:"thang_cap_phu",name:"Thăng Cấp Phù",icon:"⬆️",desc:"Tăng item level +1 (tối đa +5)",cost:1500}];function et(i=""){return i.replace(/^mat_/,"").split("_").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function Fe(i,t=1){let e=100,a=1,n=50*i,s="safe";return i<=3?(e=100,a=1,n=50*i,s="safe"):i<=6?(e={4:80,5:70,6:60}[i]||60,a=2,n=100*i,s="safe_fail"):i<=9?(e={7:45,8:35,9:25}[i]||25,a=3,n=250*i,s="downgrade"):(e={10:20,11:15,12:10}[i]||10,a=4,n=600*i,s="downgrade"),n=Math.round(n*(1+(t-1)*.05)),{successRate:e,stonesReq:a,goldCost:n,riskType:s}}class Qe extends M{template(){var r,d,c;const{ctx:t,craftBonus:e=0}=this.props,a=((r=t==null?void 0:t.state)==null?void 0:r.player)||{},n=((d=t==null?void 0:t.state)==null?void 0:d.medicines)||[],s=((c=t==null?void 0:t.state)==null?void 0:c.recipes)||[],o=p=>{const v=n.find(l=>l.id===p);return v?v.name:p};return`
      <div class="pill-furnace">
        <!-- HERB STORAGE PANEL -->
        <div class="panel" style="margin-bottom:12px; background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08)">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">Kho Dược Liệu Tàng Trữ</div>
          <div class="panel-body flex gap-2" style="overflow-x:auto; padding:10px 14px; white-space:nowrap; display:flex">
            ${!a.materials||Object.keys(a.materials).length===0?`
              <div style="color:var(--text-dim); font-size:13px; padding:6px 0">Nguyên liệu trống không...</div>
            `:Object.entries(a.materials).map(([p,v])=>`
              <div class="badge" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:4px 8px; font-size:12px; border-radius:4px">
                ${et(p)} <span style="color:var(--gold, #facc15); font-weight:700">x${v}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- MEDICINE RECIPES LIST -->
        <div class="panel" style="background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08); overflow:hidden">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">Đan Phương Truyền Thừa</div>
          <div class="panel-body no-pad">
            ${s.length===0?`
              <div style="padding:16px" class="text-dim">Chưa có công thức đan dược...</div>
            `:s.map(p=>{var b;const v=o(p.target),l=Math.min(100,(p.successRate||100)+e);let u="";(b=p.requirements)!=null&&b.skill&&(u=`<div class="text-orange" style="font-size:12px; margin-bottom:8px">Yêu cầu: ${et(p.requirements.skill)} lv${p.requirements.level||1}</div>`);let x="";(p.materials||[]).forEach(h=>{var f;const y=((f=a.materials)==null?void 0:f[h.id])||0;x+=`
                  <span style="font-size:12px; margin-right:8px; display:inline-block; background:rgba(255,255,255,0.05); padding:3px 8px; border-radius:4px">
                    <span style="color:${y>=h.amount?"var(--green, #4ade80)":"var(--red, #f87171)"}; font-weight:bold">${y}/${h.amount}</span> ${et(h.id)}
                  </span>`});const g=n.find(h=>h.id===p.target)||{};return`
                <div class="recipe-item" style="border-bottom:1px solid rgba(255,255,255,0.05)">
                  <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; cursor:pointer">
                    <div style="display:flex; flex-direction:column; gap:4px">
                      <strong style="color:var(--gold, #facc15); font-size:15px">${v}</strong>
                      <div class="text-xs text-dim flex gap-3" style="display:flex; gap:8px">
                        <span class="badge" style="padding:2px 6px">Tier ${p.tier}</span>
                        <span>Tỉ lệ: <span style="color:${l>=80?"var(--green, #4ade80)":"var(--blue, #60a5fa)"}; font-weight:bold">${l}%</span></span>
                        <span>Phí: ${p.cost} Linh Thạch</span>
                      </div>
                    </div>
                    <div class="accordion-arrow text-dim" style="font-size:12px">▼</div>
                  </div>
                  <div class="accordion-body" style="display:none; padding:12px 14px; background:rgba(0,0,0,0.25); border-top:1px solid rgba(255,255,255,0.05)">
                    ${u}
                    <div style="margin-bottom:10px">
                      <div class="text-dim" style="font-size:11px; margin-bottom:4px">Nguyên liệu cần có:</div>
                      <div style="display:flex; flex-wrap:wrap; gap:6px">${x}</div>
                    </div>
                    <div class="text-dim" style="font-size:12px; margin-bottom:12px; line-height:1.4">
                      <strong>Công Dụng:</strong> ${g.description||"Chưa rõ."}
                    </div>
                    <button class="btn btn--gold btn-craft" style="width:100%; justify-content:center" data-recipe="${p.id}">
                      Khởi Lò Luyện Đan
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `}bindEvents(){this.on("click",".accordion-header",(t,e)=>{const a=e.nextElementSibling;if(!a)return;const n=a.style.display==="none";a.style.display=n?"block":"none";const s=e.querySelector(".accordion-arrow");s&&(s.textContent=n?"▲":"▼")}),this.on("click",".btn-craft",async(t,e)=>{t.stopPropagation();const a=e.dataset.recipe,{ctx:n}=this.props;if(!(!n||!a)){e.disabled=!0,e.textContent="⏳ Đang khởi lò...";try{const s=await n.api.craftItem(n.state.player.id,a);n.state.player=s.player,n.notify(s.message,s.success?"success":"error"),n.updateSidebar&&n.updateSidebar(),this.update()}catch(s){n.notify(s.message||"Lỗi khởi lò","error"),e.disabled=!1,e.textContent="🔥 Khởi Lò Luyện Đan"}}})}}class Je extends M{initialState(){var t,e;return{forgeFilter:((e=(t=this.props.ctx)==null?void 0:t.state)==null?void 0:e._forgeFilter)||"all"}}template(){var d,c;const{ctx:t,craftLvl:e=1,craftBonus:a=0}=this.props,n=((d=t==null?void 0:t.state)==null?void 0:d.player)||{},s=((c=t==null?void 0:t.state)==null?void 0:c._forgingRecipes)||[],{forgeFilter:o}=this.state,r=s.filter(p=>o==="all"?!0:p.slot===o);return`
      <div class="equipment-forge">
        <!-- SUB-FILTERS FOR FORGING -->
        <div style="display:flex; gap:6px; margin-bottom:12px; overflow-x:auto; padding-bottom:4px">
          <button class="btn ${o==="all"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="all">Tất Cả (${s.length})</button>
          <button class="btn ${o==="weapon"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="weapon">⚔️ Vũ Khí</button>
          <button class="btn ${o==="body"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="body">🛡️ Hộ Giáp</button>
          <button class="btn ${o==="shield"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="shield">🛡️ Khiên</button>
          <button class="btn ${o==="ring"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="ring">💍 Giới Chỉ</button>
          <button class="btn ${o==="feet"?"btn--gold":"btn--dark"} btn--xs filter-forge-btn" data-filter="feet">👢 Giày / Hài</button>
        </div>

        <div class="panel" style="background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08); overflow:hidden">
          <div class="panel-title" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05)">
            <span style="font-weight:600">⚒️ Danh Sách Bản Đồ Đúc Khí</span>
            <span class="text-xs text-dim">Khoáng thạch & Vật liệu yêu thú</span>
          </div>
          <div class="panel-body no-pad">
            ${r.length===0?`
              <div style="padding:16px" class="text-dim">Không có công thức đúc khí trong mục này.</div>
            `:r.map(p=>{const v=Ve[p.slot]||"⚔️",l=Ft[p.rarity]||"#94a3b8",u=Math.min(100,(p.successRate||80)+Math.floor(e/4)+a);let x=n.gold>=p.cost,g="";return(p.materials||[]).forEach(b=>{var f;const h=((f=n.materials)==null?void 0:f[b.id])||0,y=h>=b.amount;y||(x=!1),g+=`
                  <span style="font-size:12px; background:rgba(255,255,255,0.04); border:1px solid ${y?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}; padding:3px 8px; border-radius:4px">
                    <span style="color:${y?"var(--green, #4ade80)":"var(--red, #f87171)"}; font-weight:700">${h}/${b.amount}</span> ${b.name||et(b.id)}
                  </span>`}),`
                <div class="forge-recipe-item" style="border-bottom:1px solid rgba(255,255,255,0.05)">
                  <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; cursor:pointer">
                    <div style="display:flex; align-items:center; gap:12px">
                      <div style="font-size:26px">${v}</div>
                      <div>
                        <div style="font-weight:700; font-size:15px; color:${l}">${p.name}</div>
                        <div class="text-xs text-dim flex gap-3 mt-xs" style="display:flex; gap:8px">
                          <span class="badge" style="border:1px solid ${l}; color:${l}; padding:1px 6px; text-transform:uppercase">${p.rarity}</span>
                          <span>Tier ${p.tier}</span>
                          <span>Tỉ lệ: <span style="color:${u>=75?"var(--green, #4ade80)":"var(--blue, #60a5fa)"}; font-weight:700">${u}%</span></span>
                          <span>🔥 ${p.cost} Linh Thạch</span>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-arrow text-dim" style="font-size:12px">▼</div>
                  </div>

                  <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.25); border-top:1px solid rgba(255,255,255,0.05)">
                    <div style="margin-bottom:10px">
                      <div class="text-dim" style="font-size:11px; margin-bottom:6px">Nguyên liệu cần thiết:</div>
                      <div style="display:flex; flex-wrap:wrap; gap:6px">${g}</div>
                    </div>
                    <div class="text-dim" style="font-size:12px; margin-bottom:12px; line-height:1.4">
                      <strong>Đặc Tính:</strong> ${p.description}
                    </div>
                    <button class="btn btn--gold btn-forge" style="width:100%; justify-content:center" data-recipe="${p.id}" ${x?"":"disabled"}>
                      ${x?`⚒️ Khởi Động Lò Đúc (${p.cost} 💎)`:"❌ Thiếu Nguyên Liệu hoặc Linh Thạch"}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `}bindEvents(){this.on("click",".filter-forge-btn",(t,e)=>{var n;const a=e.dataset.filter;(n=this.props.ctx)!=null&&n.state&&(this.props.ctx.state._forgeFilter=a),this.setState({forgeFilter:a})}),this.on("click",".accordion-header",(t,e)=>{const a=e.nextElementSibling;if(!a)return;const n=a.style.display==="none";a.style.display=n?"block":"none";const s=e.querySelector(".accordion-arrow");s&&(s.textContent=n?"▲":"▼")}),this.on("click",".btn-forge",async(t,e)=>{t.stopPropagation();const a=e.dataset.recipe,{ctx:n}=this.props;if(!(!n||!a)){e.disabled=!0,e.textContent="⚒️ Đang rèn...";try{const s=await n.api.forgeItem(n.state.player.id,a);n.state.player=s.player,n.notify(s.message,s.success?"success":"error"),n.updateSidebar&&n.updateSidebar(),this.update()}catch(s){n.notify(s.message||"Lỗi rèn trang bị","error"),e.disabled=!1,e.textContent="⚒️ Khởi Động Lò Đúc"}}})}}const J={tier1:{label:"+1~+3",color:"#4ade80",glow:"rgba(74,222,128,0.25)",border:"#4ade80"},tier2:{label:"+4~+6",color:"#60a5fa",glow:"rgba(96,165,250,0.3)",border:"#60a5fa"},tier3:{label:"+7~+9",color:"#c084fc",glow:"rgba(192,132,252,0.35)",border:"#c084fc"},tier4:{label:"+10~+11",color:"#fb923c",glow:"rgba(251,146,60,0.4)",border:"#fb923c"},tier5:{label:"+12",color:"#facc15",glow:"rgba(250,204,21,0.5)",border:"#facc15"}};function Et(i=0){return i>=12?J.tier5:i>=10?J.tier4:i>=7?J.tier3:i>=4?J.tier2:i>=1?J.tier1:null}class Xe extends M{initialState(){var n,s,o;const t=this.getAllItems(),e=this.props.ctx;return{selectedItemId:((n=e==null?void 0:e.state)==null?void 0:n._selectedEnhanceItemId)||((s=e==null?void 0:e.state)==null?void 0:s.selectedEnhanceItemId)||((o=t[0])==null?void 0:o.id)}}getAllItems(){var a,n;const t=((n=(a=this.props.ctx)==null?void 0:a.state)==null?void 0:n.player)||{},e=[];return Object.entries(t.equipment||{}).forEach(([s,o])=>{o&&e.push({...o,loc:"eq",slotName:s})}),(t.inventory||[]).filter(s=>s.slot&&s.slot!=="consumable").forEach(s=>{e.push({...s,loc:"inv",slotName:s.slot})}),e}template(){var o;const{ctx:t}=this.props,e=((o=t==null?void 0:t.state)==null?void 0:o.player)||{},a=this.getAllItems(),{selectedItemId:n}=this.state,s=a.find(r=>r.id===n)||a[0];return`
      <div class="enhancement-altar">
        <!-- ITEM SELECTION PANEL -->
        <div class="panel" style="margin-bottom:12px; background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08)">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">Chọn Trang Bị Cường Hóa</div>
          <div class="panel-body" style="padding:10px 14px">
            ${a.length===0?`
              <div style="opacity:0.4; padding:8px 0">Không có trang bị nào trên người hoặc trong túi.</div>
            `:`
              <select id="selEnhanceItem" class="form-select" style="width:100%; padding:10px; background:var(--bg-secondary, #1a1e29); color:var(--text, #e2e8f0); border:1px solid rgba(255,255,255,0.15); border-radius:6px; font-size:13px">
                ${a.map(r=>{const d=r.enhanceLevel>0?`+${r.enhanceLevel}`:"";return`
                    <option value="${r.id}" ${r.id===(s==null?void 0:s.id)?"selected":""}>
                      ${r.loc==="eq"?"[Đang Mặc]":"[Túi]"} ${r.displayName||r.name} (${r.rarity||"common"}) ${d}
                    </option>`}).join("")}
              </select>
            `}
          </div>
        </div>

        ${s?this.renderEnhanceDetails(s,e):""}
      </div>
    `}renderEnhanceDetails(t,e){var m;const a=parseInt(t.enhanceLevel,10)||0,n=a>=12,s=a+1,o=t.itemLevel||1,{successRate:r,stonesReq:d,goldCost:c,riskType:p}=Fe(s,o),v=((m=e.materials)==null?void 0:m.da_cuong_hoa)||0,l=v>=d,u=e.gold>=c,x=!n&&l&&u,g={safe:'<span style="color:#7cb387; font-weight:700">100% Tuyệt Đối Thành Công</span>',safe_fail:'<span style="color:#82a4d4; font-weight:700">Thất Bại Giữ Nguyên Cấp</span>',downgrade:'<span style="color:#d67a7a; font-weight:700">Rủi ro: Rớt 1 cấp khi thất bại</span>'},b=Et(a),h=Et(s);return`
      <div class="panel" style="border:1px solid var(--border); background:var(--bg-surface, #151922); border-radius:8px">
        <div class="panel-body text-center" style="padding:20px 16px; text-align:center">
          
          <!-- ITEM HEADER -->
          <h2 style="color:${Ft[t.rarity]||"#fff"}; margin-bottom:4px; font-size:18px; font-weight:700">
            ${t.displayName||t.name}
          </h2>
          <div class="text-sm text-dim" style="margin-bottom:16px; font-size:12px; color:var(--text-dim)">
            Loại: <span style="text-transform:uppercase">${t.slot||t.baseType}</span> | Cấp trang bị: iLvl ${t.itemLevel||1}
          </div>

          <!-- LEVEL PROGRESSION METER -->
          <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px; margin-bottom:16px">
            <div style="display:flex; justify-content:space-around; align-items:center; margin-bottom:10px">
              <div style="text-align:center">
                <div class="text-xs text-dim" style="font-size:11px; color:var(--text-dim)">Hiện Tại</div>
                <div style="font-size:24px; font-weight:800; color:${(b==null?void 0:b.color)||"var(--text-bright)"}; ">+${a}</div>
              </div>
              <div style="font-size:20px; color:var(--gold, #facc15)">➜</div>
              <div style="text-align:center">
                <div class="text-xs text-dim" style="font-size:11px; color:var(--text-dim)">Mục Tiêu</div>
                <div style="font-size:24px; font-weight:800; color:${(h==null?void 0:h.color)||"var(--gold)"}; ">
                  ${n?"MAX":`+${s}`}
                </div>
              </div>
            </div>

            ${n?`
              <div style="color:var(--gold, #facc15); font-weight:700">TRANG BỊ ĐÃ ĐẠT CƯỜNG HÓA TỐI ĐA CỬU THIÊN (+12)!</div>
            `:`
              <!-- CHANCE PROGRESS BAR -->
              <div style="margin-bottom:8px">
                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px">
                  <span>Tỉ Lệ Thành Công:</span>
                  <strong style="color:${r>=60?"var(--green, #4ade80)":r>=30?"var(--gold, #facc15)":"var(--red, #f87171)"}">
                    ${r}%
                  </strong>
                </div>
                <div style="background:rgba(255,255,255,0.08); height:8px; border-radius:4px; overflow:hidden">
                  <div style="background:${r>=60?"var(--green, #4ade80)":r>=30?"var(--gold, #facc15)":"var(--red, #f87171)"}; height:100%; width:${r}%"></div>
                </div>
              </div>
              <div style="font-size:11px">${g[p]}</div>
            `}
          </div>

          <!-- COST REQUIREMENTS -->
          ${n?"":`
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px">
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px">
                <div class="text-xs text-dim" style="font-size:11px; color:var(--text-dim)">Đá Cường Hóa</div>
                <div style="font-size:14px; font-weight:700; color:${l?"var(--green, #4ade80)":"var(--red, #f87171)"}">
                  ${v} / ${d} viên
                </div>
              </div>

              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px">
                <div class="text-xs text-dim" style="font-size:11px; color:var(--text-dim)">Linh Thạch Tiêu Hao</div>
                <div style="font-size:14px; font-weight:700; color:${u?"var(--gold, #facc15)":"var(--red, #f87171)"}">
                  ${e.gold||0} / ${c} Linh Thạch
                </div>
              </div>
            </div>

            <!-- ENHANCE BUTTON -->
            <button class="btn btn--gold btn--lg btn-enhance" style="width:100%; justify-content:center; font-size:15px; font-weight:700; padding:10px" data-item="${t.id}" ${x?"":"disabled"}>
              ${x?`Tiến Hành Cường Hóa (+${s})`:n?"Đã Đạt Cấp Tối Đa":"Chưa Đủ Nguyên Liệu"}
            </button>
          `}

        </div>
      </div>
    `}bindEvents(){this.on("change","#selEnhanceItem",(t,e)=>{var n;const a=e.value;(n=this.props.ctx)!=null&&n.state&&(this.props.ctx.state._selectedEnhanceItemId=a,this.props.ctx.state.selectedEnhanceItemId=a),this.setState({selectedItemId:a})}),this.on("click",".btn-enhance",async(t,e)=>{const a=e.dataset.item,{ctx:n}=this.props;if(!(!n||!a)){e.disabled=!0,e.textContent="✨ Đang luyện...";try{const s=await n.api.enhanceItem(n.state.player.id,a);n.state.player=s.player,n.notify(s.message,s.isSuccess?"success":"error"),n.updateSidebar&&n.updateSidebar(),this.update()}catch(s){n.notify(s.message||"Lỗi cường hóa","error"),e.disabled=!1,e.textContent="✨ TIẾN HÀNH CƯỜNG HÓA"}}})}}class We extends M{initialState(){var n,s;const t=this.getAllItems(),e=this.props.ctx;return{selectedItemId:((n=e==null?void 0:e.state)==null?void 0:n._selectedCurrencyItemId)||((s=t[0])==null?void 0:s.id)}}getAllItems(){var a,n;const t=((n=(a=this.props.ctx)==null?void 0:a.state)==null?void 0:n.player)||{},e=[];return Object.entries(t.equipment||{}).forEach(([s,o])=>{o&&e.push({...o,loc:"eq",slotName:s})}),(t.inventory||[]).filter(s=>s.slot&&s.slot!=="consumable").forEach(s=>{e.push({...s,loc:"inv",slotName:s.slot})}),e}template(){const{costReduction:t=0}=this.props,e=this.getAllItems(),{selectedItemId:a}=this.state,n=e.find(p=>p.id===a)||e[0],s=n&&parseInt(n.enhanceLevel,10)||0,o=yt(s),r=s>0?`<span class="badge-enhance tier-${o} lvl-${s}">+${s}</span>`:"",d=s>0?jt(n):"",c=(n==null?void 0:n.affixes)||[];return`
      <div class="talisman-inscriber">
        <!-- ITEM SELECTOR PANEL -->
        <div class="panel" style="margin-bottom:12px; background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08)">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center">
            <span>⚔️ Chọn Trang Bị Khắc Ấn Phù Văn</span>
            <span style="font-size:11px; color:var(--text-dim); font-weight:normal">${e.length} trang bị khả dụng</span>
          </div>
          <div class="panel-body" style="padding:12px 14px">
            ${e.length===0?`
              <div style="opacity:0.3; padding:12px; text-align:center">Không có trang bị nào trong túi hoặc đang mặc...</div>
            `:`
              <select id="selCurrencyItem" class="form-select" style="width:100%; padding:8px 10px; background:var(--bg-secondary, #1a1e29); color:var(--text, #e2e8f0); border:1px solid rgba(255,255,255,0.12); border-radius:6px; font-size:13px">
                ${e.map(p=>{const v=parseInt(p.enhanceLevel,10)||0,l=v>0?` (+${v})`:"",u=(p.affixes||[]).length;return`
                    <option value="${p.id}" ${p.id===(n==null?void 0:n.id)?"selected":""}>
                      ${p.loc==="eq"?"🔸 [Đang Mặc]":"📦 [Túi]"} ${p.displayName||p.name}${l} [${(p.rarity||"common").toUpperCase()}] — ${u}/4 Phù Văn
                    </option>
                  `}).join("")}
              </select>

              <!-- DETAILED ITEM & AFFIX PREVIEW CARD -->
              <div style="margin-top:12px; background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:12px">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px">
                  <div>
                    <div style="font-size:14px; font-weight:700" class="rarity-${(n==null?void 0:n.rarity)||"common"}">
                      ${(n==null?void 0:n.displayName)||(n==null?void 0:n.name)} ${r}
                    </div>
                    <div style="font-size:11px; color:var(--text-dim); margin-top:2px">
                      Phẩm chất: <span class="rarity-${(n==null?void 0:n.rarity)||"common"}">${((n==null?void 0:n.rarity)||"common").toUpperCase()}</span> | Cấp: Lv.${(n==null?void 0:n.itemLevel)||1} | Vị trí: ${(n==null?void 0:n.slotName)||(n==null?void 0:n.slot)||"Trang bị"}
                    </div>
                  </div>
                  <div style="text-align:right">
                    <span style="font-size:11px; font-weight:600; color:var(--gold, #facc15)">${c.length}/4 Khắc Ấn</span>
                  </div>
                </div>

                ${d?`
                  <div style="font-size:11.5px; color:#38bdf8; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.2); border-radius:4px; padding:4px 8px; margin-bottom:10px">
                    ⚡ Uy Lực Cường Hóa: <strong>${d}</strong>
                  </div>
                `:""}

                <!-- 4 SLOTS BREAKDOWN -->
                <div style="font-size:11px; font-weight:700; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px">
                  📜 Danh Sách Phù Văn Khắc Ấn (Tối đa 4 dòng):
                </div>
                <div style="display:flex; flex-direction:column; gap:5px">
                  ${[0,1,2,3].map(p=>{const v=c[p];if(v){const l=v.tier?`<span style="font-size:9.5px; background:rgba(234, 179, 8, 0.15); color:#facc15; border:1px solid rgba(234, 179, 8, 0.35); padding:1px 5px; border-radius:3px; font-weight:700">Tầng ${v.tier}</span>`:"";return`
                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:6px 10px; font-size:12px">
                          <div style="display:flex; align-items:center; gap:6px">
                            <span style="font-size:11px; color:var(--text-dim)">#${p+1}</span>
                            <span style="color:var(--gold, #facc15); font-weight:700">${v.name?`[${v.name}]`:"[Phù Văn]"}</span>
                            ${l}
                          </div>
                          <span style="color:#60a5fa; font-weight:600">${it(v,!0)}</span>
                        </div>
                      `}else return`
                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.01); border:1px dashed rgba(255,255,255,0.08); border-radius:4px; padding:6px 10px; font-size:11.5px; opacity:0.6">
                          <div style="display:flex; align-items:center; gap:6px">
                            <span style="font-size:11px; color:var(--text-dim)">#${p+1}</span>
                            <span style="font-style:italic">— Ô Khắc Ấn Trống —</span>
                          </div>
                          <span style="font-size:10px; color:#38bdf8">Dùng [Hỗn Chú Phù] để khắc thêm</span>
                        </div>
                      `}).join("")}
                </div>
              </div>
            `}
          </div>
        </div>

        <!-- TALISMAN ACTION CARDS GRID -->
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:10px">
          ${Ue.map(p=>{const v=Math.max(1,Math.round(p.cost*(1-t/100)));return`
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between">
                <div>
                  <div style="font-size:22px; margin-bottom:4px">${p.icon}</div>
                  <div style="font-weight:700; font-size:13px; margin-bottom:2px; color:var(--text-bright, #fff)">${p.name}</div>
                  <div style="font-size:11px; opacity:0.5; margin-bottom:8px; line-height:1.3">${p.desc}</div>
                </div>
                <button class="btn btn--gold btn--sm btn-currency" data-cid="${p.id}" style="width:100%; justify-content:center">
                  💎 ${v} ${t>0?`<s style="opacity:0.4; font-size:10px">${p.cost}</s>`:""}
                </button>
              </div>`}).join("")}
        </div>
      </div>
    `}bindEvents(){this.on("change","#selCurrencyItem",(t,e)=>{var n;const a=e.value;(n=this.props.ctx)!=null&&n.state&&(this.props.ctx.state._selectedCurrencyItemId=a),this.setState({selectedItemId:a})}),this.on("click",".btn-currency",async(t,e)=>{const{ctx:a}=this.props,{selectedItemId:n}=this.state,o=this.getAllItems().find(c=>c.id===n);if(!o)return a.notify("Chọn trang bị trước!","error");const r=e.dataset.cid;let d=-1;if(r==="thien_menh_phu"){const c=o.affixes||[];if(c.length===0)return a.notify("Trang bị không có dòng thuộc tính để khóa!","error");const p=prompt(`Chọn số thứ tự dòng muốn khóa (0-${c.length-1}):
${c.map((v,l)=>`${l}: ${it(v,!0)}`).join(`
`)}`);if(p===null)return;if(d=parseInt(p,10),isNaN(d)||d<0||d>=c.length)return a.notify("Chỉ số không hợp lệ!","error")}e.disabled=!0,e.textContent="⏳...";try{const c=await a.api.applyCurrency(a.state.player.id,r,o.id,d);a.notify(c.message,"success"),a.state.player=c.player,a.updateSidebar&&a.updateSidebar(),this.update()}catch(c){a.notify(c.message||"Lỗi áp dụng phù chú","error"),e.disabled=!1,e.textContent="💎 Dùng"}})}}class Ye extends M{initialState(){var e,a;const t=this.props.ctx||{};return{activeTab:((e=t.state)==null?void 0:e._alchemyTab)||((a=t.state)==null?void 0:a.alchemyTab)||"recipes"}}template(){var v;const{ctx:t}=this.props,e=((v=t==null?void 0:t.state)==null?void 0:v.player)||{};let a=0,n=0,s=0,o=0;(e.skills||[]).forEach(l=>{const u=typeof l=="string"?l:l.id,x=typeof l=="string"?1:l.level||1;u==="tinh_che"&&(a=x*2),u==="phu_an_thuat"&&(n=x*5),u==="linh_kiem_thuat"&&(s=x*10),u==="cuong_hoa_thuat"&&(o=x*15)});const r=e.craftingLevel||1,d=e.craftingXp||0,c=r*50,p=Math.min(100,Math.round(d/Math.max(1,c)*100));return`
      <div class="alchemy-page">
        <!-- HEADER -->
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:12px; margin-bottom:12px">
          <div>
            <h1 style="display:flex; align-items:center; gap:8px; margin:0; font-size:18px; font-weight:700">
              Lò Tạo Hóa (Chế Tác)
            </h1>
            <div class="text-sm text-dim" style="font-size:12px; color:var(--text-dim); margin-top:2px">
              Đúc rèn Thần Binh, Luyện Chế Tiên Đan và Cường Hóa Pháp Khí viễn cổ.
            </div>
          </div>
          
          <!-- CRAFTING MASTERY HUD -->
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:8px 14px; min-width:220px">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-bottom:4px">
              <span style="font-weight:700; color:var(--gold, #facc15)">Luyện Khí Thuật: Cấp ${r}</span>
              <span class="text-dim text-xs" style="font-size:10px; color:var(--text-dim)">${d}/${c} XP</span>
            </div>
            <div style="background:rgba(0,0,0,0.4); border-radius:4px; height:5px; overflow:hidden">
              <div style="background:var(--gold, #facc15); height:100%; width:${p}%; transition:width 0.3s"></div>
            </div>
          </div>
        </div>

        <!-- 4 TABS NAVIGATION MOUNT CONTAINER -->
        <div id="alchemyTabsNav" style="margin-bottom:12px"></div>

        <!-- SKILL BUFFS BANNER -->
        ${a||n||s||o?`
          <div style="background:rgba(194,159,85,0.06); border:1px solid rgba(194,159,85,0.2); border-radius:6px; padding:6px 12px; margin-bottom:12px; font-size:11px; display:flex; gap:12px; flex-wrap:wrap">
            <span style="color:var(--gold, #facc15); font-weight:600">Gia Trì Nghề Nghiệp:</span>
            ${a?`<span>Thành công +${a}%</span>`:""}
            ${n?`<span>Giảm phí -${n}%</span>`:""}
            ${s?`<span>Phẩm chất +${s}%</span>`:""}
            ${o?`<span>Nâng đôi ${o}%</span>`:""}
          </div>
        `:""}

        <!-- SUBVIEW CONTENT CONTAINER -->
        <div id="alchemyTabContent"></div>
      </div>
    `}async onMounted(){await this.ensureRecipesLoaded(),this.renderTabs(),this.renderActiveSubView()}onUpdated(){this.renderTabs(),this.renderActiveSubView()}onUnmounted(){this._currentSubView&&(this._currentSubView.unmount(),this._currentSubView=null),this._tabsComponent&&(this._tabsComponent.unmount(),this._tabsComponent=null)}async ensureRecipesLoaded(){const{ctx:t}=this.props;if(!t)return;let e=!1;if(!t.state.recipes||t.state.recipes.length===0)try{const a=await t.api.request("/recipes");t.state.recipes=a.recipes||[],e=!0}catch(a){console.warn("Failed loading medicine recipes",a)}if(!t.state._forgingRecipes||t.state._forgingRecipes.length===0)try{const a=await t.api.getForgingRecipes();t.state._forgingRecipes=a.recipes||[],e=!0}catch(a){console.warn("Failed loading forging recipes",a)}e&&this._isMounted&&this.update()}renderTabs(){var o,r;const t=this.container.querySelector("#alchemyTabsNav");if(!t)return;const{ctx:e}=this.props,a=((o=e==null?void 0:e.state)==null?void 0:o.recipes)||[],n=((r=e==null?void 0:e.state)==null?void 0:r._forgingRecipes)||[],s=[{id:"recipes",label:"Luyện Đan",badge:a.length||null},{id:"forging",label:"Đúc Khí",badge:n.length||null},{id:"enhancement",label:"Cường Hóa (+1..+12)"},{id:"currency",label:"Phù Văn"}];this._tabsComponent&&this._tabsComponent.unmount(),this._tabsComponent=new ot({tabs:s,activeTab:this.state.activeTab,onTabChange:d=>{e&&(e.state._alchemyTab=d,e.state.alchemyTab=d),this.setState({activeTab:d})}}),this._tabsComponent.mount(t)}renderActiveSubView(){var d;const t=this.container.querySelector("#alchemyTabContent");if(!t)return;this._currentSubView&&(this._currentSubView.unmount(),this._currentSubView=null);const{ctx:e}=this.props,a=((d=e==null?void 0:e.state)==null?void 0:d.player)||{},{activeTab:n}=this.state;let s=0,o=0;const r=a.craftingLevel||1;(a.skills||[]).forEach(c=>{const p=typeof c=="string"?c:c.id,v=typeof c=="string"?1:c.level||1;p==="tinh_che"&&(s=v*2),p==="phu_an_thuat"&&(o=v*5)}),n==="recipes"?this._currentSubView=new Qe({ctx:e,craftBonus:s}):n==="forging"?this._currentSubView=new Je({ctx:e,craftLvl:r,craftBonus:s}):n==="enhancement"?this._currentSubView=new Xe({ctx:e}):n==="currency"&&(this._currentSubView=new We({ctx:e,costReduction:o})),this._currentSubView&&this._currentSubView.mount(t)}}let X=null;async function Ze(i,t){X&&(X.unmount(),X=null),X=new Ye({ctx:t}),X.mount(i)}function Qt(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;async function r(){try{const c=await a.getDailyQuests(o);e._dailyQuests=c,d()}catch(c){n(c.message,"error")}}function d(){const c=e._dailyQuests||{},p=c.quests||[];c.allCompleted;const v=c.bonusReward;i.innerHTML=`
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${p.map(l=>{const u=l.quest_info||{},x=l.target>0?Math.min(100,Math.round(l.progress/l.target*100)):0;return`
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${l.claimed?"var(--text-dim)":l.completed?"var(--green)":"var(--blue)"}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${u.name||l.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${u.difficulty==="Khó"?"var(--red)":u.difficulty==="Trung Bình"?"var(--orange)":"var(--green)"}">${u.difficulty||"?"}</span>
              </div>
              ${l.claimed?'<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>':l.completed?`<button class="btn btn--green btn--sm btn-claim" data-qid="${l.id}">🎁 Nhận</button>`:`<span style="font-size:11px;opacity:0.5">${l.progress}/${l.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${u.desc||""}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${x}%;background:${l.completed?"var(--green)":"var(--blue)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${u.goldReward||0} · ✨ ${u.xpReward||0} EXP</div>
          </div>
        </div>`}).join("")}

      ${v?`
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${v.gold} 💎, +${v.xp} EXP</div>
      </div>
      `:""}
    `,i.querySelectorAll(".btn-claim").forEach(l=>l.addEventListener("click",async()=>{try{const u=await a.claimDailyQuest(o,parseInt(l.dataset.qid));n(u.message,"success"),e.player=u.player,s(),await r()}catch(u){n(u.message,"error")}}))}r()}function Jt(i,t){const{state:e,api:a,notify:n,renderGame:s}=t,o=e._questTab||"npc";i.innerHTML=`
    <div class="page-header">
      <h2>📜 Thiên Cơ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ kỳ duyên NPC và nhiệm vụ nhật thường</p>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${o==="npc"?"active":""}" data-qtab="npc" style="flex:1;padding:10px;border:none;background:${o==="npc"?"rgba(255,255,255,0.08)":"transparent"};color:${o==="npc"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${o==="npc"?"700":"400"};border-bottom:2px solid ${o==="npc"?"var(--gold)":"transparent"};transition:all 0.2s">
        📜 Kỳ Duyên NPC
      </button>
      <button class="tab-btn ${o==="daily"?"active":""}" data-qtab="daily" style="flex:1;padding:10px;border:none;background:${o==="daily"?"rgba(255,255,255,0.08)":"transparent"};color:${o==="daily"?"var(--gold)":"var(--text-dim)"};cursor:pointer;font-size:14px;font-weight:${o==="daily"?"700":"400"};border-bottom:2px solid ${o==="daily"?"var(--gold)":"transparent"};transition:all 0.2s">
        📋 Nhật Thường Hàng Ngày
      </button>
    </div>
    <div id="questTabContent">
      <div id="questList" class="quest-container">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,i.querySelectorAll("[data-qtab]").forEach(c=>{c.addEventListener("click",()=>{e._questTab=c.dataset.qtab,Jt(i,t)})});const r=i.querySelector("#questTabContent");if(o==="daily"){Qt(r,t);return}d();async function d(){try{const p=(await a.getQuests(e.playerId)).quests||[],v=document.getElementById("questList");if(!v)return;if(p.length===0){v.innerHTML=`
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `;return}v.innerHTML=p.map(l=>{const u=l.questAmount>0?Math.min(100,l.progress/l.questAmount*100):0,x=l.progress>=l.questAmount,g=l.questType==="kill"?"⚔️":"📦";return`
          <div class="quest-card ${x?"quest-done":""}" data-quest-id="${l.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${l.npcIcon||"🧓"} ${l.npcName||"NPC"}</span>
              <span class="quest-type">${g} ${l.questType==="kill"?"Tiêu Diệt":"Thu Thập"}</span>
            </div>
            <div class="quest-name">${l.questName||l.quest_id}</div>
            <div class="quest-desc">${l.questDescription||""}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${x?"hp":"energy"}" style="width:${u}%"></div>
              </div>
              <span class="quest-progress-text">${l.progress}/${l.questAmount}</span>
            </div>
            ${x?`<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${l.quest_id}">✅ Trả Nhiệm Vụ</button>`:""}
          </div>
        `}).join(""),v.querySelectorAll(".quest-complete-btn").forEach(l=>{l.addEventListener("click",async()=>{const u=l.dataset.qid;l.disabled=!0,l.textContent="⏳...";try{const x=await a.completeQuest(e.playerId,u);e.player=x.player,n(x.message,"success"),x.skillGained&&n(`🎯 Lĩnh ngộ: ${x.skillGained}!`,"success"),s()}catch(x){n(x.message||"Lỗi trả quest","error"),l.disabled=!1,l.textContent="✅ Trả Nhiệm Vụ"}})})}catch(c){console.error("Error loading quests:",c);const p=document.getElementById("questList");p&&(p.innerHTML='<p class="text-muted">Không thể tải nhiệm vụ.</p>')}}}function tn(i,t){const{state:e,api:a,notify:n,renderGame:s}=t;if(e.player.role!=="admin"){i.innerHTML='<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>';return}const o=[{id:"monsters",label:"🐉 Quái Vật",file:"monsters"},{id:"npcs",label:"🧓 NPC",file:"npcs"},{id:"areas",label:"🗺️ Khu Vực",file:"areas"},{id:"items",label:"⚔️ Vật Phẩm",file:"items"},{id:"materials",label:"🧪 Nguyên Liệu",file:"materials"},{id:"crimes",label:"🕵️ Hành Động",file:"crimes"},{id:"education",label:"📖 Tu Luyện",file:"education"}];let r="monsters";i.innerHTML=`
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${o.map(h=>`
          <button class="admin-tab ${h.id===r?"active":""}" data-tab="${h.id}">${h.label}</button>
        `).join("")}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `,document.getElementById("adminTabs").addEventListener("click",h=>{const y=h.target.closest(".admin-tab");y&&(r=y.dataset.tab,document.querySelectorAll(".admin-tab").forEach(f=>f.classList.remove("active")),y.classList.add("active"),d(r))}),d(r);async function d(h){const y=document.getElementById("adminContent");if(y){y.innerHTML='<div class="loading-spinner">⏳ Đang tải...</div>';try{const f=await a.request(`/admin/${h}?adminId=${e.playerId}`);c(h,f,y)}catch(f){y.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi: ${f.message}</div></div>`}}}function c(h,y,f){h==="monsters"?p(y,f):h==="npcs"?v(y,f):h==="areas"?l(y,f):u(h,y,f)}function p(h,y){const f=h.monsters||[];y.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${f.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${f.map(m=>{var T,$,w,k,_,S,L,P;return`
          <div class="admin-card" data-id="${m.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${m.name} ${m.isWorldBoss?"🔥":""}</span>
              <span class="badge" style="background:${(($=(T=h.tierInfo)==null?void 0:T[m.tier])==null?void 0:$.color)||"#888"}">${((k=(w=h.tierInfo)==null?void 0:w[m.tier])==null?void 0:k.name)||"T"+m.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${((_=m.stats)==null?void 0:_.hp)||"?"}</div>
              <div>💪 ${((S=m.stats)==null?void 0:S.strength)||"?"}</div>
              <div>🏃 ${((L=m.stats)==null?void 0:L.speed)||"?"}</div>
              <div>🛡 ${((P=m.stats)==null?void 0:P.defense)||"?"}</div>
            </div>
            <div class="admin-card-meta">
              <span>XP: ${m.xpReward||0}</span>
              <span>Gold: ${Array.isArray(m.goldReward)?m.goldReward.join("-"):m.goldReward}</span>
              ${m.areaId?`<span>📍 ${m.areaId}</span>`:""}
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${m.id}" data-type="monsters" data-key="monsters">✏️ Sửa</button>
          </div>
        `}).join("")}
      </div>
    `,g(y,h,"monsters","monsters")}function v(h,y){const f=h.npcs||[];y.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${f.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${f.map(m=>`
          <div class="admin-card" data-id="${m.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${m.icon||"🧓"} ${m.name}</span>
              <span class="badge" style="background:var(--purple)">${m.profession}</span>
            </div>
            <div class="admin-card-meta">
              <span>Quests: ${(m.quests||[]).length}</span>
              <span>Areas: ${(m.areaIds||[]).join(", ")}</span>
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${m.id}" data-type="npcs" data-key="npcs">✏️ Sửa</button>
          </div>
        `).join("")}
      </div>
    `,g(y,h,"npcs","npcs")}function l(h,y){const f=Object.keys(h);y.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${f.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${f.map(m=>{const T=h[m];return`
            <div class="admin-card" data-id="${m}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${T.name||m}</span>
                <span class="badge" style="background:var(--orange)">⚡${T.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(T.events||[]).map($=>`<span>${$.type}: ${$.weight}</span>`).join("")}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${m}">✏️ Sửa</button>
            </div>
          `}).join("")}
      </div>
    `,y.querySelectorAll(".admin-edit-area").forEach(m=>{m.addEventListener("click",()=>{const T=m.dataset.id,$=h[T];x(T,$,`areas/${T}`)})})}function u(h,y,f){var $;const m=JSON.stringify(y,null,2),T=m.split(`
`).length;f.innerHTML=`
      <div class="admin-table-header">
        <span class="text-dim">${h} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(T+5,30)}">${b(m)}</textarea>
    `,($=document.getElementById("btnSaveGeneric"))==null||$.addEventListener("click",async()=>{try{const w=document.getElementById("genericEditor").value,k=JSON.parse(w);n("Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.","error")}catch(w){n("JSON không hợp lệ: "+w.message,"error")}})}function x(h,y,f,m){const T=JSON.stringify(y,null,2),$=document.createElement("div");$.className="admin-modal-overlay",$.innerHTML=`
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${h}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${b(T)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `,document.body.appendChild($),$.querySelectorAll(".admin-modal-close").forEach(w=>{w.addEventListener("click",()=>$.remove())}),$.addEventListener("click",w=>{w.target===$&&$.remove()}),document.getElementById("btnModalSave").addEventListener("click",async()=>{try{const w=document.getElementById("modalEditor").value,k=JSON.parse(w);await a.request(`/admin/${f}?adminId=${e.playerId}`,{method:"PUT",body:JSON.stringify({data:k})}),n("✅ Đã lưu!","success"),$.remove(),d(r)}catch(w){n("Lỗi: "+w.message,"error")}})}function g(h,y,f,m){h.querySelectorAll(".admin-edit-btn").forEach(T=>{T.addEventListener("click",()=>{const $=T.dataset.id,k=(y[m]||[]).find(_=>_.id===$);k&&x($,k,`${f}/${$}`)})})}function b(h){return h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}function Xt(i,t){const{state:e,api:a,notify:n,renderGame:s,updateSidebar:o}=t,r=e.playerId;e._social||(e._social={tab:"friends",searchQuery:"",searchResults:[],relationships:{friends:[],enemies:[],pendingSent:[],pendingReceived:[]},loaded:!1});const d=e._social;async function c(){try{const g=await a.getRelationships(r);d.relationships=g,d.loaded=!0,p()}catch(g){n(g.message||"Lỗi tải dữ liệu Giao Tế","error")}}function p(){const{friends:g,enemies:b,pendingSent:h,pendingReceived:y}=d.relationships,f=y.length;i.innerHTML=`
      <div class="page-header">
        <h2>🤝 Đạo Hữu</h2>
        <p class="page-sub">Kết bạn bè, đánh dấu kẻ thù, giao lưu giang hồ</p>
      </div>

      <!-- Search -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="socialSearch" placeholder="Tìm người chơi theo tên..." 
                 value="${d.searchQuery}" 
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSearch">🔍 Tìm</button>
        </div>
        ${d.searchResults.length>0?`
          <div style="margin-top:12px">
            ${d.searchResults.map(m=>`
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${m.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${m.level} · ${m.realm} · ${m.gender==="male"?"♂":"♀"}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${m.id!==r?`
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${m.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${m.id}">⚔️ Kẻ Thù</button>
                  `:'<span style="opacity:0.4;font-size:12px">Bạn</span>'}
                </div>
              </div>
            `).join("")}
          </div>
        `:d.searchQuery?'<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>':""}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${d.tab==="friends"?"btn--blue":"btn--dark"}" data-tab="friends">
          🤝 Đạo Hữu (${g.length})
        </button>
        <button class="btn btn--sm ${d.tab==="enemies"?"btn--blue":"btn--dark"}" data-tab="enemies">
          ⚔️ Kẻ Thù (${b.length})
        </button>
        <button class="btn btn--sm ${d.tab==="pending"?"btn--blue":"btn--dark"}" data-tab="pending">
          📨 Lời Mời ${f>0?`<span class="badge">${f}</span>`:""}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${d.tab==="friends"?v(g):""}
        ${d.tab==="enemies"?l(b):""}
        ${d.tab==="pending"?u(y,h):""}
      </div>
    `,x()}function v(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>':g.map(b=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${b.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${b.level} · ${b.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${b.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${b.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join("")}function l(g){return g.length===0?'<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>':g.map(b=>`
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${b.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${b.level} · ${b.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${b.currentArea||"unknown"}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${b.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join("")}function u(g,b){let h="";return g.length>0&&(h+='<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>',h+=g.map(y=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${y.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${y.level} · ${y.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${y.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${y.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join("")),b.length>0&&(h+='<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>',h+=b.map(y=>`
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${y.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${y.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join("")),g.length===0&&b.length===0&&(h='<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'),h}function x(){var g,b;(g=document.getElementById("btnSearch"))==null||g.addEventListener("click",async()=>{var y;const h=(y=document.getElementById("socialSearch"))==null?void 0:y.value.trim();if(!h||h.length<2)return n("Cần ít nhất 2 ký tự","error");d.searchQuery=h;try{const f=await a.searchPlayers(h);d.searchResults=f.players||[],p()}catch(f){n(f.message,"error")}}),(b=document.getElementById("socialSearch"))==null||b.addEventListener("keydown",h=>{var y;h.key==="Enter"&&((y=document.getElementById("btnSearch"))==null||y.click())}),document.querySelectorAll("[data-tab]").forEach(h=>{h.addEventListener("click",()=>{d.tab=h.dataset.tab,p()})}),document.querySelectorAll("[data-action]").forEach(h=>{h.addEventListener("click",async()=>{const y=h.dataset.action,f=h.dataset.target;h.disabled=!0;try{let m;switch(y){case"add-friend":m=await a.addFriend(r,f);break;case"accept-friend":m=await a.acceptFriend(r,f);break;case"reject-friend":m=await a.rejectFriend(r,f);break;case"remove-friend":m=await a.removeFriend(r,f);break;case"add-enemy":m=await a.addEnemy(r,f);break;case"remove-enemy":m=await a.removeEnemy(r,f);break}n(m.message||"Thành công!","success"),await c()}catch(m){n(m.message||"Lỗi!","error"),h.disabled=!1}})})}d.loaded?p():c()}function Wt(i,t){const{state:e,api:a,notify:n}=t,s=e.playerId;e._chat||(e._chat={tab:"global",globalMessages:[],privateMessages:[],friends:[],selectedFriend:null,lastGlobalId:0,lastPrivateId:0,pollTimer:null,loaded:!1});const o=e._chat;async function r(){try{const[b,h]=await Promise.all([a.getGlobalChat(),a.getChatFriends(s)]);o.globalMessages=b.messages||[],o.friends=h.friends||[],o.globalMessages.length>0&&(o.lastGlobalId=o.globalMessages[o.globalMessages.length-1].id),o.loaded=!0,p(),d()}catch(b){n(b.message||"Lỗi tải chat","error")}}function d(){c(),o.pollTimer=setInterval(async()=>{try{if(o.tab==="global"){const b=await a.getGlobalChat(o.lastGlobalId);b.messages&&b.messages.length>0&&(o.globalMessages.push(...b.messages),o.globalMessages.length>100&&(o.globalMessages=o.globalMessages.slice(-100)),o.lastGlobalId=o.globalMessages[o.globalMessages.length-1].id,l(),u())}else if(o.tab==="private"&&o.selectedFriend){const b=await a.getPrivateChat(s,o.selectedFriend.id,o.lastPrivateId);b.messages&&b.messages.length>0&&(o.privateMessages.push(...b.messages),o.privateMessages.length>100&&(o.privateMessages=o.privateMessages.slice(-100)),o.lastPrivateId=o.privateMessages[o.privateMessages.length-1].id,l(),u())}}catch{}},5e3)}function c(){o.pollTimer&&(clearInterval(o.pollTimer),o.pollTimer=null)}function p(){const b=o.tab==="global"?o.globalMessages:o.privateMessages;i.innerHTML=`
      <div class="page-header">
        <h2>💬 Giang Hồ Truyền Âm</h2>
        <p class="page-sub">Giao lưu với các đạo hữu trong giang hồ</p>
      </div>

      <div class="chat-tabs" style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn btn--sm ${o.tab==="global"?"btn--blue":"btn--dark"}" data-chat-tab="global">🌍 Toàn Cầu</button>
        <button class="btn btn--sm ${o.tab==="private"?"btn--blue":"btn--dark"}" data-chat-tab="private">📨 Riêng</button>
        ${o.tab==="private"?`
          <select id="friendSelect" style="flex:1;padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
            <option value="">-- Chọn Đạo Hữu --</option>
            ${o.friends.map(h=>{var y;return`<option value="${h.id}" ${((y=o.selectedFriend)==null?void 0:y.id)===h.id?"selected":""}>${h.name} (Lv.${h.level})</option>`}).join("")}
          </select>
        `:""}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${v(b)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${o.tab==="global"?"Nói gì đó với giang hồ...":"Nhắn riêng..."}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `,g(),u()}function v(b){return b.length===0?'<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>':b.map(h=>{const y=h.sender_id===s,f=new Date(h.created_at).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return`
        <div style="padding:4px 0;${y?"text-align:right":""}">
          <span style="font-size:11px;opacity:0.4">${f}</span>
          <span style="font-weight:600;color:${y?"var(--blue)":"var(--gold)"}"> ${h.sender_name}</span>
          <span style="opacity:0.8">: ${x(h.message)}</span>
        </div>
      `}).join("")}function l(){const b=document.getElementById("chatMessages");if(!b)return;const h=o.tab==="global"?o.globalMessages:o.privateMessages;b.innerHTML=v(h)}function u(){const b=document.getElementById("chatMessages");b&&(b.scrollTop=b.scrollHeight)}function x(b){const h=document.createElement("div");return h.textContent=b,h.innerHTML}function g(){var h,y,f;document.querySelectorAll("[data-chat-tab]").forEach(m=>{m.addEventListener("click",()=>{o.tab=m.dataset.chatTab,o.tab==="global"&&(o.lastGlobalId=o.globalMessages.length>0?o.globalMessages[o.globalMessages.length-1].id:0),p(),d()})}),(h=document.getElementById("friendSelect"))==null||h.addEventListener("change",async m=>{const T=m.target.value;if(!T){o.selectedFriend=null,o.privateMessages=[],p();return}o.selectedFriend=o.friends.find($=>$.id===T)||null,o.lastPrivateId=0;try{const $=await a.getPrivateChat(s,T);o.privateMessages=$.messages||[],o.privateMessages.length>0&&(o.lastPrivateId=o.privateMessages[o.privateMessages.length-1].id),l(),u()}catch($){n($.message,"error")}});const b=async()=>{var $,w;const m=document.getElementById("chatInput"),T=m==null?void 0:m.value.trim();if(T){if(o.tab==="private"&&!o.selectedFriend)return n("Chọn Đạo Hữu trước!","error");try{if(await a.sendChat(s,o.tab,o.tab==="private"?o.selectedFriend.id:null,T),m.value="",o.tab==="global"){const k=await a.getGlobalChat(o.lastGlobalId);(($=k.messages)==null?void 0:$.length)>0&&(o.globalMessages.push(...k.messages),o.lastGlobalId=o.globalMessages[o.globalMessages.length-1].id)}else{const k=await a.getPrivateChat(s,o.selectedFriend.id,o.lastPrivateId);((w=k.messages)==null?void 0:w.length)>0&&(o.privateMessages.push(...k.messages),o.lastPrivateId=o.privateMessages[o.privateMessages.length-1].id)}l(),u()}catch(k){n(k.message||"Lỗi gửi tin nhắn","error")}}};(y=document.getElementById("btnSend"))==null||y.addEventListener("click",b),(f=document.getElementById("chatInput"))==null||f.addEventListener("keydown",m=>{m.key==="Enter"&&b()})}t.renderGame,o.loaded?(p(),d()):r()}function Yt(i,t){const{state:e,api:a,notify:n,updateSidebar:s,renderGame:o}=t,r=e.playerId,d=e._auctionTab||"browse";async function c(){try{const[l,u]=await Promise.all([a.getAuctions(),a.getMyAuctions(r)]);e._auctionListings=l.listings||[],e._auctionMine=u.listings||[],p()}catch(l){n(l.message,"error")}}function p(){const l=e._auctionListings||[],u=e._auctionMine||[],x=(e.player.inventory||[]).filter(g=>g.slot&&g.slot!=="consumable");i.innerHTML=`
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${d==="browse"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${d==="sell"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${d==="mine"?"btn--gold":"btn--dark"} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${u.length})</button>
      </div>

      ${d==="browse"?`
        <div class="panel"><div class="panel-body no-pad">
          ${l.length===0?'<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>':l.map(g=>{const b=JSON.parse(g.item_data||"{}");return`<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${b.name||"?"}</strong>
                  <span style="font-size:10px;opacity:0.4">[${b.rarity||"?"}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${g.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${g.id}">💎 ${g.buyout_price} Mua</button>
              </div>`}).join("")}
        </div></div>
      `:d==="sell"?`
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${x.length===0?'<div style="opacity:0.3">Không có trang bị để bán</div>':`
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${x.map(g=>`<option value="${g.id}">${g.name} [${g.rarity}]</option>`).join("")}
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
    `,v()}function v(){var l;i.querySelectorAll(".tab-btn").forEach(u=>u.addEventListener("click",()=>{e._auctionTab=u.dataset.tab,c()})),i.querySelectorAll(".btn-buy").forEach(u=>u.addEventListener("click",async()=>{if(confirm("Mua vật phẩm này?"))try{const x=await a.buyAuction(r,parseInt(u.dataset.lid));n(x.message,"success"),e.player=x.player,s(),await c()}catch(x){n(x.message,"error")}})),i.querySelectorAll(".btn-cancel").forEach(u=>u.addEventListener("click",async()=>{try{const x=await a.cancelAuction(r,parseInt(u.dataset.lid));n(x.message,"success"),e.player=x.player,s(),await c()}catch(x){n(x.message,"error")}})),(l=document.getElementById("btnListItem"))==null||l.addEventListener("click",async()=>{var b,h,y;const u=(b=document.getElementById("selSellItem"))==null?void 0:b.value,x=parseInt(((h=document.getElementById("inpPrice"))==null?void 0:h.value)||"500"),g=parseInt(((y=document.getElementById("selDuration"))==null?void 0:y.value)||"24");try{const f=await a.listAuction(r,u,x,g);n(f.message,"success"),e.player=f.player,s(),e._auctionTab="mine",await c()}catch(f){n(f.message,"error")}})}c()}function Zt({data:i,pid:t,state:e,api:a,notify:n,updateSidebar:s,onComplete:o}){const r=i.session_id||i.sessionId,d=i.victimName||i.defender_name||"Đối thủ",c=i.victimGold??i.defender_gold??0,p=document.createElement("div");p.className="modal-overlay pvp-action-overlay",p.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;";let v=i.action_expires_in||60;p.innerHTML=`
    <div class="pvp-modal-content" style="background:#151824;border:1px solid var(--border);border-radius:8px;width:100%;max-width:480px;box-shadow:0 8px 24px rgba(0,0,0,0.5);overflow:hidden;animation:fadeIn 0.2s ease">
      <div style="background:rgba(0,0,0,0.25);padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:24px">⚔️</span>
          <div>
            <div style="font-weight:bold;color:var(--gold);font-size:15px">HẠ GỤC ĐỐI THỦ: ${d}</div>
            <div style="font-size:11px;color:var(--text-dim)">Linh Thạch tại thân: 💎 ${c.toLocaleString()}</div>
          </div>
        </div>
        <div style="font-size:12px;font-weight:bold;color:#f87171;background:rgba(0,0,0,0.5);padding:4px 8px;border-radius:8px;border:1px solid rgba(248,113,113,0.3)">
          ⏱️ <span id="pvpLeaseTimer">${v}s</span>
        </div>
      </div>

      <div style="padding:16px;display:flex;flex-direction:column;gap:12px">
        <div style="font-size:12px;color:#d1d5db;line-height:1.5">
          Quyết đấu đã phân định thắng bại! Trong vòng 60 giây, hãy lựa chọn một trong ba kết cục nhân quả sau:
        </div>

        <!-- Option 1: Chỉ Điểm -->
        <button class="btn btn--outline pvp-choice-btn" data-action="leave" style="text-align:left;padding:12px;border:1px solid rgba(59,130,246,0.4);background:rgba(59,130,246,0.08);border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-weight:bold;color:#60a5fa;font-size:13px">🚶 Chỉ Điểm (Spar / Leave)</span>
            <span style="font-size:11px;background:#1e3a8a;color:#93c5fd;padding:2px 6px;border-radius:4px">Đề cử cày cấp</span>
          </div>
          <div style="font-size:11px;color:#cbd5e1">
            Thu kiếm vào bao, bảo tồn đạo tâm. Nhận <strong>100% Tu Vi XP</strong> & <strong>+1 Tâm Cảnh</strong>. Đối thủ chỉ bị chấn động nhẹ (30-60s).
          </div>
        </button>

        <!-- Option 2: Trọng Thương -->
        <button class="btn btn--outline pvp-choice-btn" data-action="wound" style="text-align:left;padding:12px;border:1px solid rgba(239,68,68,0.4);background:rgba(239,68,68,0.08);border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-weight:bold;color:#f87171;font-size:13px">🩸 Trọng Thương (Hospitalize)</span>
            <span style="font-size:11px;background:#7f1d1d;color:#fca5a5;padding:2px 6px;border-radius:4px">Tranh đoạt lãnh địa</span>
          </div>
          <div style="font-size:11px;color:#cbd5e1">
            Đoạn tuyệt kinh mạch. Khóa đối thủ tịnh dưỡng từ <strong>10 đến 60 phút</strong>. Nhận 40% Tu Vi XP & Điểm Chiến Tích Tông Môn.
          </div>
        </button>

        <!-- Option 3: Đoạt Bảo -->
        <button class="btn btn--outline pvp-choice-btn" data-action="rob" style="text-align:left;padding:12px;border:1px solid rgba(234,179,8,0.4);background:rgba(234,179,8,0.08);border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-weight:bold;color:#fde047;font-size:13px">💰 Đoạt Bảo (Mug / Plunder)</span>
            <span style="font-size:11px;background:#713f12;color:#fef08a;padding:2px 6px;border-radius:4px">Cướp bóc</span>
          </div>
          <div style="font-size:11px;color:#cbd5e1">
            Tịch thu <strong>4% - 18% Linh Thạch</strong> unbanked (áp dụng đường cong chống cày cuốc). Đối thủ tịnh dưỡng 2-5 phút.
          </div>
        </button>
      </div>
    </div>
  `,document.body.appendChild(p);const l=p.querySelector("#pvpLeaseTimer"),u=setInterval(()=>{v--,l&&(l.textContent=`${v}s`),v<=0&&(clearInterval(u),x("leave"))},1e3);async function x(g){clearInterval(u),p.querySelectorAll(".pvp-choice-btn").forEach(b=>{b.disabled=!0,b.style.opacity="0.6"});try{const b=await a.resolveMugAction(t,g,r);p.remove(),n(b.message||"Đã hoàn tất kết cục giao chiến!","success"),b.player&&e&&(e.player=b.player,s&&s()),o&&o(b)}catch(b){p.remove(),n(b.message||"Lỗi khi giải quyết kết cục!","error")}}p.querySelectorAll(".pvp-choice-btn").forEach(g=>{g.addEventListener("click",()=>{x(g.dataset.action)})})}function en(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;e._market||(e._market={tab:"browse",filter:"",sort:"newest",search:"",listings:[],myListings:[],mugTargets:[],mugLog:[],mugCooldown:0,loaded:!1,showListForm:!1});const r=e._market;async function d(){try{const[b,h]=await Promise.all([a.getMarketListings(r.filter,r.sort),a.getMyListings(o)]);r.listings=b.listings||[],r.myListings=h.listings||[],r.loaded=!0,p()}catch(b){n(b.message||"Lỗi tải Giao Dịch Đài","error")}}async function c(){try{const[b,h]=await Promise.all([a.getMugTargets(o),a.getMugLog(o)]);r.mugTargets=b.targets||[],r.mugCooldown=b.mugCooldown||0,r.mugLog=h.logs||[],p()}catch(b){n(b.message||"Lỗi tải dữ liệu Cướp Đoạt","error")}}function p(){const b=e.player;if(i.innerHTML=`
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${r.tab==="browse"?"btn--blue":"btn--dark"}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${r.tab==="my"?"btn--blue":"btn--dark"}" data-mtab="my">📦 Sạp Tôi (${r.myListings.length}/10)</button>
        <button class="btn btn--sm ${r.tab==="auction"?"btn--gold":"btn--dark"}" data-mtab="auction">⚖️ Sàn Đấu Giá</button>
        <button class="btn btn--sm ${r.tab==="mug"?"btn--red":"btn--dark"}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${r.showListForm?x(b):""}

      ${r.tab==="browse"?v():r.tab==="my"?l():r.tab==="auction"?'<div id="auctionSubContent"></div>':u()}
    `,g(),r.tab==="auction"){const h=i.querySelector("#auctionSubContent");h&&Yt(h,t)}}function v(){let b=`
      <div class="panel">
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn--xs ${r.filter===""?"btn--blue":"btn--dark"}" data-filter="">Tất cả</button>
            <button class="btn btn--xs ${r.filter==="item"?"btn--blue":"btn--dark"}" data-filter="item">⚔️ Trang Bị</button>
            <button class="btn btn--xs ${r.filter==="material"?"btn--blue":"btn--dark"}" data-filter="material">🧱 Nguyên Liệu</button>
            <button class="btn btn--xs ${r.filter==="medicine"?"btn--blue":"btn--dark"}" data-filter="medicine">💊 Đan Dược</button>
            <select id="sortSelect" style="padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:12px;margin-left:auto">
              <option value="newest" ${r.sort==="newest"?"selected":""}>Mới nhất</option>
              <option value="price_asc" ${r.sort==="price_asc"?"selected":""}>Giá tăng</option>
              <option value="price_desc" ${r.sort==="price_desc"?"selected":""}>Giá giảm</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo tên vật phẩm hoặc affix..." value="${r.search}" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
          </div>
        </div>
      </div>
    `,h=r.listings;if(r.search.trim()){const y=r.search.toLowerCase().trim();h=h.filter(f=>{var m;return f.item_name.toLowerCase().includes(y)?!0:(m=f.item_data)!=null&&m.affixes?f.item_data.affixes.some(T=>(T.stat||"").toLowerCase().includes(y)||(T.type||"").toLowerCase().includes(y)):!1})}return h.length===0?b+='<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>':(b+='<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">',b+=h.map(y=>{var w,k;const f=y.item_type==="item"?"⚔️":y.item_type==="material"?"🧱":"💊",m=((w=y.item_data)==null?void 0:w.rarity)||"",T=y.seller_id===o,$=(k=y.item_data)!=null&&k.affixes?y.item_data.affixes.map(_=>`${_.stat} ${_.type==="flat"?"+":""}${_.value}${_.type!=="flat"?"%":""}`).join(", "):"";return`
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${f}
                <span style="color:var(--gold)">${y.item_name}</span>
                ${y.quantity>1?`<span style="opacity:0.5"> x${y.quantity}</span>`:""}
                ${m?`<span class="rarity-${m}" style="font-size:11px;margin-left:4px">[${m}]</span>`:""}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${y.seller_name}</span>
                ${$?`<span style="color:var(--blue);font-size:11px;margin-left:6px">${$}</span>`:""}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${y.price}${y.quantity>1?"/cái":""}</span>
              ${T?'<span style="font-size:11px;opacity:0.4">Sạp bạn</span>':`<button class="btn btn--sm btn--green" data-buy="${y.id}" data-qty="${y.quantity}" data-price="${y.price}">🛒 Mua</button>`}
            </div>
          </div>
        `}).join(""),b+="</div></div>"),b}function l(){if(r.myListings.length===0)return'<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>';let b='<div class="panel"><div class="panel-body no-pad">';return b+=r.myListings.map(h=>`
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${h.item_type==="item"?"⚔️":h.item_type==="material"?"🧱":"💊"} ${h.item_name} ${h.quantity>1?`<span style="opacity:0.5">x${h.quantity}</span>`:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${h.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${h.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `).join(""),b+="</div></div>",b}function u(){let b=`
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${r.mugCooldown>0?`<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${r.mugCooldown}s</div>`:""}
    `;return r.mugTargets.length===0?b+='<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>':b+=r.mugTargets.map(h=>`
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${h.gender==="female"?"♀":"♂"} ${h.name}</div>
            <div class="item-meta">Lv.${h.level} · ${h.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${h.id}" ${r.mugCooldown>0?"disabled":""}>💀 Phục Kích</button>
        </div>
      `).join(""),b+="</div></div>",r.mugLog.length>0&&(b+=`
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${r.mugLog.map(h=>{const y=h.attacker_id===o,f=h.outcome==="success"?"✅":"❌",m=h.outcome==="success"?"var(--green)":"var(--red)",T=y?h.outcome==="success"?`Cướp ${h.victim_name}: +${h.gold_stolen} 💎`:`Phục kích ${h.victim_name} thất bại!`:h.outcome==="success"?`Bị ${h.attacker_name} cướp: -${h.gold_stolen} 💎`:`${h.attacker_name} phục kích bạn thất bại!`;return`<div class="list-item" style="padding:6px 14px;font-size:12px;color:${m}">${f} ${T} <span style="opacity:0.4;margin-left:auto">${new Date(h.created_at).toLocaleString("vi-VN")}</span></div>`}).join("")}
          </div>
        </div>
      `),b}function x(b){const h=Object.entries(b.materials||{}).map(([T,$])=>({id:T,qty:$,type:"material",name:T})),y=Object.entries(b.medicines||{}).map(([T,$])=>({id:T,qty:$,type:"medicine",name:T})),f=(b.inventory||[]).map(T=>({id:T.id,qty:1,type:"item",name:T.name||T.id})),m=[...h,...y,...f];return`
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${m.length===0?'<div style="opacity:0.5">Không có gì để bán!</div>':`
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${m.map(T=>`<option value="${T.type}|${T.id}">${T.type==="item"?"⚔️":T.type==="material"?"🧱":"💊"} ${T.name} ${T.qty>1?`(có: ${T.qty})`:""}</option>`).join("")}
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
    `}function g(){var b,h,y,f;document.querySelectorAll("[data-mtab]").forEach(m=>{m.addEventListener("click",()=>{if(r.tab=m.dataset.mtab,r.tab==="mug"&&r.mugTargets.length===0){c();return}p()})}),(b=document.getElementById("btnShowList"))==null||b.addEventListener("click",()=>{r.showListForm=!r.showListForm,p()}),document.querySelectorAll("[data-filter]").forEach(m=>{m.addEventListener("click",async()=>{r.filter=m.dataset.filter,await d()})}),(h=document.getElementById("sortSelect"))==null||h.addEventListener("change",async m=>{r.sort=m.target.value,await d()}),(y=document.getElementById("searchInput"))==null||y.addEventListener("input",m=>{r.search=m.target.value,p();const T=document.getElementById("searchInput");T&&(T.focus(),T.setSelectionRange(r.search.length,r.search.length))}),(f=document.getElementById("btnConfirmList"))==null||f.addEventListener("click",async()=>{var _,S,L;const m=(_=document.getElementById("listItem"))==null?void 0:_.value;if(!m)return;const[T,$]=m.split("|"),w=parseInt((S=document.getElementById("listQty"))==null?void 0:S.value)||1,k=parseInt((L=document.getElementById("listPrice"))==null?void 0:L.value)||0;if(k<=0)return n("Giá phải lớn hơn 0!","error");try{const P=await a.listForSale(o,T,$,w,k);n(P.message,"success"),e.player=P.player,s(),r.showListForm=!1,await d()}catch(P){n(P.message,"error")}}),document.querySelectorAll("[data-buy]").forEach(m=>{m.addEventListener("click",async()=>{const T=parseInt(m.dataset.buy),$=parseInt(m.dataset.qty),w=parseInt(m.dataset.price);let k=1;if($>1){const _=prompt(`Mua bao nhiêu? (tối đa ${$}, giá ${w} 💎/cái)`,"1");if(!_)return;k=Math.min(parseInt(_)||1,$)}m.disabled=!0;try{const _=await a.buyFromMarket(o,T,k);n(_.message,"success"),e.player=_.player,s(),await d()}catch(_){n(_.message,"error"),m.disabled=!1}})}),document.querySelectorAll("[data-cancel]").forEach(m=>{m.addEventListener("click",async()=>{m.disabled=!0;try{const T=await a.cancelListing(o,parseInt(m.dataset.cancel));n(T.message,"success"),e.player=T.player,s(),await d()}catch(T){n(T.message,"error"),m.disabled=!1}})}),document.querySelectorAll("[data-mug]").forEach(m=>{m.addEventListener("click",async()=>{const T=m.dataset.mug;if(confirm("⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!")){m.disabled=!0,m.textContent="⏳...";try{const $=await a.mugPlayer(o,T);$.outcome==="pending_action"||$.actions?Zt({data:$,pid:o,state:e,api:a,notify:n,updateSidebar:s,onComplete:async()=>{await c()}}):(n($.message,$.success?"success":"error"),$.player&&(e.player=$.player,s()),await c())}catch($){n($.message,"error"),m.disabled=!1,m.textContent="💀 Phục Kích"}}})})}r.tab==="mug"?c():r.loaded?p():d()}function nn(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;let r=!1,d=null;async function c(){try{d=await a.getRealmInfo(o),r=!0,p()}catch(u){n(u.message||"Lỗi tải Cảnh Giới","error")}}function p(){if(!d)return;const u=d.current,x=d.allRealms||[],g=e.player,b=g.xpToNext>0?Math.floor(g.xp/g.xpToNext*100):0;i.innerHTML=`
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
            <div style="opacity:0.5;font-size:13px">Cảnh Giới Bậc ${u.tier} · ${u.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${g.level} — ${g.xp}/${g.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${b}%;background:${u.color}"></div></div>
        </div>

        ${u.bonuses?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(u.bonuses).filter(([,h])=>h>0).map(([h,y])=>`
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${y} ${h}</span>
              `).join("")}
            </div>
          </div>
        `:""}

        ${u.unlocks?`
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${u.unlocks.map(h=>`<span style="font-size:12px;opacity:0.7">✅ ${h}</span>`).join(" · ")}
            </div>
          </div>
        `:""}
      </div>

      <!-- BREAKTHROUGH -->
      ${u.canBreakthrough?v(u):""}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${x.map(h=>{const y=h.tier===u.tier,f=h.tier<u.tier,T=h.tier>u.tier?"0.35":"1";return`
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${y?`2px solid ${h.color}`:"1px solid rgba(255,255,255,0.05)"};opacity:${T};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${h.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${h.color}">${h.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${h.levelMin}+</span>
                ${h.failChance?`<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${h.failChance}% thất bại</span>`:""}
                ${f?'<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>':""}
                ${y?'<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,l()}function v(u){const x=u.nextRealm;if(!x)return"";const g=x.cost?`💎 ${x.cost.gold} + 🔮 ${x.cost.energy}`:"Miễn phí";return`
      <div class="card" style="border:2px solid ${x.icon==="⚡"?"#4fc3f7":"#ffd54f"};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${x.name} ${x.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${g}</div>
          ${x.trialMonster?'<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>':""}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${x.failChance||0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(x.bonuses).filter(([,b])=>b>0).map(([b,h])=>`+${h} ${b}`).join(", ")}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${x.unlocks.join(", ")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `}function l(){var u;(u=document.getElementById("btnBreakthrough"))==null||u.addEventListener("click",()=>{qt(t)})}c()}function an(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t;sn(i,t)}async function sn(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t;i.innerHTML='<div class="loading">Đang tải nhật ký sự kiện...</div>';try{const r=(await a.request(`/player/${e.playerId}/events`)).events||[];if(e.player&&(e.player.unreadEventsCount=0,s()),r.length===0){i.innerHTML=`
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
            ${r.map(d=>{const c=new Date(d.created_at*1e3),p=c.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),v=c.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});let l="📌";return l={attack:"⚔️",hospital:"🏥",jail:"🚓",money:"💰",system:"⚙️",trade:"🤝",mug_win:"🗡️",mug_fail:"💀",mug_defend:"🛡️",mug_rob:"💸",mug_wound:"🩸",boss_rally:"🐉",quest_complete:"🏆",quest_accept:"📜",quest_fail:"❌",level_up:"⬆️",realm_breakthrough:"🌟",skill_learn:"⚡",craft_success:"🔨",craft_fail:"💥",explore:"🔍",npc:"🧓",pvp:"⚔️",arena:"🏟️",guild:"🏰",social:"💬",login:"🔑",daily:"📋"}[d.type]||"📌",`
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${p}</div>
                    <div>${v}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${l}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${d.is_read?"color:var(--text-dim);":"font-weight:bold; color:#fff;"}">
                    ${d.message}
                  </div>
                </li>
              `}).join("")}
          </ul>
        </div>
      </div>
    `}catch(o){i.innerHTML=`<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${o.message}</div></div>`}}const gt={1:{tier:1,name:"Thảo Lư",cost:500,hpRegen:2,gardenSlots:1,breakthroughBonus:2,description:"Căn nhà tranh đơn sơ bên suối linh tuyền, linh khí ban sơ.",badgeClass:"badge--slate"},2:{tier:2,name:"Mộc Ốc",cost:2500,hpRegen:5,gardenSlots:2,breakthroughBonus:4,description:"Nhà gỗ linh sam kiên cố, có khoảnh linh điền màu mỡ.",badgeClass:"badge--blue"},3:{tier:3,name:"Thạch Các",cost:1e4,hpRegen:10,gardenSlots:3,breakthroughBonus:6,description:"Tòa thạch các ngự trên sườn thanh sơn, thông thấu địa mạch.",badgeClass:"badge--purple"},4:{tier:4,name:"Linh Phủ",cost:4e4,hpRegen:20,gardenSlots:4,breakthroughBonus:8,description:"Phủ đệ linh sơn hùng vĩ, mây mù lượn lờ, tụ tập linh vận thiên địa.",badgeClass:"badge--gold"},5:{tier:5,name:"Thiên Cung",cost:15e4,hpRegen:40,gardenSlots:5,breakthroughBonus:10,description:"Cung điện bồng bềnh trong mây, phong cảnh tuyệt thế vô song.",badgeClass:"badge--legendary"},6:{tier:6,name:"Tử Tiêu Điện",cost:5e5,hpRegen:75,gardenSlots:6,breakthroughBonus:13,description:"Điện ngọc đúc từ Tử Tiêu Linh Thạch, tử khí ngút ngàn, đạo vận tường hòa.",badgeClass:"badge--purple"},7:{tier:7,name:"Huyền Đô Tiên Đảo",cost:18e5,hpRegen:120,gardenSlots:7,breakthroughBonus:16,description:"Phù không tiên đảo ngự chín tầng mây, thông thấu thiên địa, linh vụ lượn lờ.",badgeClass:"badge--cyan"},8:{tier:8,name:"Thần Tiêu Động Thiên",cost:6e6,hpRegen:200,gardenSlots:8,breakthroughBonus:20,description:"Độc lập tiểu thế giới nội hàm càn khôn, linh khí nồng đặc kết tinh thành hà lưu.",badgeClass:"badge--blue"},9:{tier:9,name:"Thái Hư Tiên Phủ",cost:2e7,hpRegen:350,gardenSlots:9,breakthroughBonus:25,description:"Tiên phủ ngự tại khe nứt Thái Hư cổ xưa, hấp thu hỗn độn nguyên khí bất tận.",badgeClass:"badge--gold"},10:{tier:10,name:"Hỗn Độn Tiên Cung",cost:6e7,hpRegen:600,gardenSlots:10,breakthroughBonus:30,description:"Vô thượng thánh địa ngưng tụ từ Hỗn Độn Sơ Khí, siêu thoát ngũ hành luân hồi, duy ngã độc tôn.",badgeClass:"badge--legendary"}},rn={linh_thao:{id:"linh_thao",name:"Linh Thảo",tier:1,growthTime:180,qty:[2,4],description:"Cỏ linh khí nhạt, nền tảng của Luyện Đan sơ cấp."},huyet_thao:{id:"huyet_thao",name:"Huyết Thảo",tier:2,growthTime:360,qty:[2,3],description:"Cỏ đỏ như máu, chứa sinh khí dương dồi dào bồi bổ khí huyết."},thanh_linh_thao:{id:"thanh_linh_thao",name:"Thanh Linh Thảo",tier:2,growthTime:600,qty:[2,3],description:"Linh thảo thanh sạch, nâng cao dược lực khi luyện đan."},kim_linh_thao:{id:"kim_linh_thao",name:"Kim Linh Thảo",tier:3,growthTime:1200,qty:[1,2],description:"Linh thảo hấp thụ tinh quang nhật nguyệt, cực kỳ quý hiếm."},thien_linh_thao:{id:"thien_linh_thao",name:"Thiên Linh Thảo",tier:4,growthTime:2400,qty:[1,2],description:"Tuyệt phẩm thảo mộc, tụ tập tinh hoa đại đạo vũ trụ."},ngo_dao_tra:{id:"ngo_dao_tra",name:"Ngộ Đạo Trà",tier:5,growthTime:3600,qty:[1,2],description:"Lá trà hái từ Ngộ Đạo Cổ Thụ, ngưng thần tĩnh khí, trợ giúp đột phá."},hon_don_linh_chi:{id:"hon_don_linh_chi",name:"Hỗn Độn Linh Chi",tier:6,growthTime:7200,qty:[1,1],description:"Thần chi hấp thụ Hỗn Độn Sơ Khí từ thuở khai thiên, bảo vật nghịch thiên cải mệnh."}};function tt(i){const t=Math.max(0,Math.floor(i||0)),e=Math.floor(t/3600),a=Math.floor(t%3600/60),n=t%60;return e>0?`${e}h ${String(a).padStart(2,"0")}m`:`${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function j(i){return Number(i||0).toLocaleString("vi-VN")}class on extends M{template(){const{housingData:t={},player:e={}}=this.props,a=t,n=!!a.owned,s=a.tier||1,o=a.tierInfo||gt[s]||gt[1],r=a.nextTier,d=a.passiveBonuses||{},c=e.gold||0;if(!n){const u=gt[1],x=c>=u.cost;return`
        <div class="abode-overview unowned-view" style="display:flex; flex-direction:column; gap:16px;">
          <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
              <div>
                <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-light); font-size:11px; padding:2px 8px; border-radius:3px; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.5px;">
                  Chưa Sở Hữu Động Phủ
                </span>
                <h3 style="font-size:16px; font-weight:700; color:var(--text-bright); margin-top:8px;">
                  Khởi Tạo Động Phủ — ${u.name} (T1)
                </h3>
              </div>
              <div style="text-align:right;">
                <div style="font-size:11px; color:var(--text-dim);">Chi phí kiến tạo</div>
                <div style="font-size:15px; font-weight:700; color:var(--gold);">${j(u.cost)} Linh Thạch</div>
              </div>
            </div>

            <p style="font-size:13px; color:var(--text-dim); line-height:1.6; margin-bottom:16px;">
              ${u.description} Động phủ là nơi nghỉ ngơi an toàn, tăng tốc độ tự nhiên hồi phục Khí Huyết, gia tăng xác suất thành công khi đột phá cảnh giới và mở khóa Dược Viên để gieo trồng dược liệu luyện đan.
            </p>

            <!-- STAT HIGHLIGHTS -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-bottom:20px;">
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
                <div style="font-size:11px; color:var(--text-dim);">Hồi Phục Khí Huyết</div>
                <div style="font-size:14px; font-weight:700; color:var(--green); margin-top:2px;">+${u.hpRegen} HP / 10s</div>
              </div>
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
                <div style="font-size:11px; color:var(--text-dim);">Khoảnh Dược Viên</div>
                <div style="font-size:14px; font-weight:700; color:var(--blue); margin-top:2px;">${u.gardenSlots} Ô Đất</div>
              </div>
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
                <div style="font-size:11px; color:var(--text-dim);">Tỷ Lệ Đột Phá Cảnh Giới</div>
                <div style="font-size:14px; font-weight:700; color:var(--gold); margin-top:2px;">+${u.breakthroughBonus}%</div>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:14px;">
              <div style="font-size:12px; color:var(--text-dim);">
                Số dư hiện có: <strong style="color:${x?"var(--text-bright)":"var(--red)"};">${j(c)}</strong> Linh Thạch
              </div>
              <button class="btn ${x?"btn--gold":"btn--dark"}" id="btnPurchaseAbode" ${x?"":"disabled"} style="padding:6px 20px; font-weight:600; border-radius:3px;">
                ${x?`Khởi Tạo ${u.name}`:"Không Đủ Linh Thạch"}
              </button>
            </div>
          </div>
        </div>
      `}const p=!!a.maintenanceDue,v=a.dailyUpkeep||0,l=r&&c>=r.cost;return`
      <div class="abode-overview owned-view" style="display:flex; flex-direction:column; gap:16px;">
        <!-- ABODE MAIN CARD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="badge" style="background:rgba(83,123,180,0.15); border:1px solid var(--blue); color:var(--blue); font-size:11px; font-weight:700; padding:2px 8px; border-radius:3px;">
                  Cấp ${s}
                </span>
                <h2 style="font-size:17px; font-weight:700; color:var(--text-bright); margin:0;">
                  ${o.name}
                </h2>
                <span class="badge" style="background:rgba(79,140,98,0.15); border:1px solid var(--green); color:var(--green); font-size:10px; padding:2px 6px; border-radius:3px;">
                  ${a.isRenting?"Phòng Thuê":"Chính Chủ"}
                </span>
              </div>
              <div style="font-size:12px; color:var(--text-dim); margin-top:4px;">
                ${o.description}
              </div>
            </div>

            <!-- UPKEEP SUMMARY -->
            <div style="display:flex; align-items:center; gap:12px; background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 12px;">
              <div>
                <div style="font-size:10px; color:var(--text-dim); text-transform:uppercase;">Phí Trận Pháp / Ngày</div>
                <div style="font-size:13px; font-weight:700; color:${v>0?"var(--orange)":"var(--text-dim)"};">
                  ${j(v)} Linh Thạch
                </div>
              </div>
              ${v>0?`
                <div>
                  ${p?`
                    <button class="btn btn--sm btn--red" id="btnPayUpkeep" style="font-size:11px; padding:4px 10px; border-radius:3px;">
                      Nộp Phí
                    </button>
                  `:`
                    <span class="badge" style="background:rgba(79,140,98,0.15); border:1px solid var(--green); color:var(--green); font-size:10px; padding:3px 8px; border-radius:3px;">
                      Đã Nộp
                    </span>
                  `}
                </div>
              `:""}
            </div>
          </div>

          <!-- PASSIVE BUFFS GRID -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:8px; margin-top:16px;">
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Hồi Phục Khí Huyết</div>
              <div style="font-size:14px; font-weight:700; color:var(--green); margin-top:2px;">
                +${d.hpRegenBonus||o.hpRegen} HP <span style="font-size:10px; font-weight:400; color:var(--text-dim);">/ 10s</span>
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Hồi Phục Linh Lực</div>
              <div style="font-size:14px; font-weight:700; color:var(--blue); margin-top:2px;">
                +${d.energyRegenBonus||0} MP <span style="font-size:10px; font-weight:400; color:var(--text-dim);">/ 10s</span>
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Thể Lực Tối Đa</div>
              <div style="font-size:14px; font-weight:700; color:var(--cyan); margin-top:2px;">
                +${d.staminaMaxBonus||0} Điểm
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Gia Tốc Dược Điền</div>
              <div style="font-size:14px; font-weight:700; color:var(--purple); margin-top:2px;">
                +${Math.round((d.gardenSpeedBonus||0)*100)}%
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Tỷ Lệ Đột Phá</div>
              <div style="font-size:14px; font-weight:700; color:var(--gold); margin-top:2px;">
                +${d.breakthroughBonus||o.breakthroughBonus}%
              </div>
            </div>

            ${d.cultivationBonus>0?`
              <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
                <div style="font-size:11px; color:var(--text-dim);">Tăng Trưởng Tu Vi</div>
                <div style="font-size:14px; font-weight:700; color:var(--gold); margin-top:2px;">
                  +${d.cultivationBonus}%
                </div>
              </div>
            `:""}
          </div>
        </div>

        <!-- UPGRADE ABODE CARD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
              Tiến Trình Động Phủ
            </h3>
            <span style="font-size:11px; color:var(--text-dim);">
              Quy Mô: ${a.maxSlots||o.gardenSlots} Khoảnh Đất Dược Liệu
            </span>
          </div>

          ${r?`
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span class="badge" style="background:var(--bg-panel); border:1px solid var(--border-light); font-size:10px; padding:1px 6px; border-radius:3px; color:var(--text-dim);">
                    Cấp Kế: T${r.tier}
                  </span>
                  <span style="font-weight:700; font-size:13px; color:var(--text-bright);">${r.name}</span>
                </div>
                <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">
                  ${r.description}
                </div>
                <div style="font-size:11px; color:var(--text-dim); margin-top:6px; display:flex; gap:12px;">
                  <span>Khí Huyết: <strong style="color:var(--green);">+${r.hpRegen} HP/10s</strong></span>
                  <span>Dược Viên: <strong style="color:var(--blue);">${r.gardenSlots} Ô</strong></span>
                  <span>Đột Phá: <strong style="color:var(--gold);">+${r.breakthroughBonus}%</strong></span>
                </div>
              </div>

              <div style="text-align:right;">
                <div style="font-size:11px; color:var(--text-dim); margin-bottom:4px;">
                  Yêu Cầu: <strong style="color:var(--gold);">${j(r.cost)}</strong> Linh Thạch
                </div>
                <button class="btn ${l?"btn--gold":"btn--dark"}" id="btnUpgradeAbode" ${l?"":"disabled"} style="font-size:12px; padding:6px 16px; border-radius:3px;">
                  ${l?`Thăng Cấp Lên ${r.name}`:"Không Đủ Linh Thạch"}
                </button>
              </div>
            </div>
          `:`
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:14px; text-align:center; color:var(--gold); font-size:13px; font-weight:600;">
              Động Phủ Đã Đạt Cảnh Giới Tối Cao (${o.name} — Đại Viên Mãn)
            </div>
          `}
        </div>
      </div>
    `}bindEvents(){this.on("click","#btnPurchaseAbode",()=>{this.props.onPurchase&&this.props.onPurchase()}),this.on("click","#btnUpgradeAbode",()=>{this.props.onUpgrade&&this.props.onUpgrade()}),this.on("click","#btnPayUpkeep",()=>{this.props.onPayUpkeep&&this.props.onPayUpkeep()})}}class dn extends M{initialState(){return{selectedSeeds:{}}}template(){const{housingData:t={}}=this.props,e=t,a=!!e.owned,n=e.maxSlots||1,s=e.gardenSlots||[],o=e.gardenHerbs||rn;if(!a)return`
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:24px; text-align:center;">
          <h3 style="font-size:15px; font-weight:700; color:var(--text-bright); margin-bottom:6px;">Dược Viên Chưa Mở Khóa</h3>
          <p style="font-size:12px; color:var(--text-dim); margin-bottom:16px;">Đạo hữu cần khởi tạo Động Phủ trước để sở hữu khoảnh linh điền gieo trồng dược thảo.</p>
        </div>
      `;const r=s.filter(d=>d&&d.ready).length;return`
      <div class="garden-view" style="display:flex; flex-direction:column; gap:16px;">
        <!-- ACTION BAR -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                Linh Điền Dược Viên (${n} Khoảnh Đất)
              </h3>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Dược thảo tự động sinh trưởng và được chuyển trực tiếp vào Càn Khôn Túi khi thu hoạch.
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn ${r>0?"btn--green":"btn--dark"}" id="btnHarvestAll" ${r>0?"":"disabled"} style="font-size:12px; padding:5px 14px; border-radius:3px;">
                Thu Hoạch Tất Cả ${r>0?`(${r})`:""}
              </button>
            </div>
          </div>
        </div>

        <!-- PLOTS GRID -->
        <div class="plots-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px;">
          ${Array.from({length:n},(d,c)=>{const p=s.find(v=>v&&v.slotIndex===c)||null;return this.renderSlot(c,p,o)}).join("")}
        </div>

        <!-- HERBS REFERENCE TABLE -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 16px;">
          <div style="font-size:12px; font-weight:700; color:var(--text-bright); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;">
            Danh Mục Thảo Mộc Khả Dụng
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">
              <thead>
                <tr style="border-bottom:1px solid var(--border); color:var(--text-dim);">
                  <th style="padding:6px 8px;">Thảo Mộc</th>
                  <th style="padding:6px 8px;">Phẩm Cấp</th>
                  <th style="padding:6px 8px;">Thời Gian</th>
                  <th style="padding:6px 8px;">Sản Lượng</th>
                  <th style="padding:6px 8px;">Đặc Tính Luyện Đan</th>
                </tr>
              </thead>
              <tbody>
                ${Object.values(o).map(d=>`
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.03);">
                    <td style="padding:6px 8px; font-weight:600; color:var(--text-bright);">${d.name}</td>
                    <td style="padding:6px 8px;"><span class="badge" style="background:var(--bg-main); border:1px solid var(--border); font-size:10px; padding:1px 5px; border-radius:2px;">Cấp ${d.tier}</span></td>
                    <td style="padding:6px 8px; color:var(--text-dim);">${tt(d.growthTime)}</td>
                    <td style="padding:6px 8px; color:var(--gold);">${d.qty?`${d.qty[0]} - ${d.qty[1]}`:"1 - 3"}</td>
                    <td style="padding:6px 8px; color:var(--text-dim);">${d.description}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}renderSlot(t,e,a){if(!e||!e.herb){const d=this.state.selectedSeeds[t]||"";return`
        <div class="garden-slot empty-slot" data-slot="${t}" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; min-height:130px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:11px; font-weight:700; color:var(--text-bright);">Khoảnh #${t+1}</span>
              <span class="badge" style="background:rgba(255,255,255,0.04); border:1px solid var(--border); color:var(--text-dim); font-size:9px; padding:1px 5px; border-radius:2px;">
                BỎ TRỐNG
              </span>
            </div>
            <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px;">
              Linh điền đang màu mỡ, sẵn sàng tiếp nhận hạt giống.
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:6px;">
            <select class="seed-select" data-slot="${t}" style="width:100%; background:var(--bg-main); color:var(--text); border:1px solid var(--border); border-radius:3px; padding:4px 6px; font-size:11px;">
              <option value="">-- Chọn Hạt Giống --</option>
              ${Object.values(a).map(c=>`
                <option value="${c.id}" ${d===c.id?"selected":""}>
                  ${c.name} (T${c.tier} · ${tt(c.growthTime)})
                </option>
              `).join("")}
            </select>
            <button class="btn btn--blue btn-plant" data-slot="${t}" ${d?"":"disabled"} style="font-size:11px; padding:4px 8px; border-radius:3px; width:100%;">
              Gieo Giống
            </button>
          </div>
        </div>
      `}const n=!!e.ready,s=Math.max(0,e.remainingSeconds||0),o=Math.min(100,Math.max(0,e.progressPercent||0)),r=e.herbName||e.herb;return`
      <div class="garden-slot active-slot ${n?"ready-slot":""}" data-slot="${t}" data-remaining="${s}" data-total="${e.growthTime||180}" style="background:var(--bg-panel); border:1px solid ${n?"var(--green)":"var(--border)"}; border-radius:4px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; min-height:130px;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:11px; font-weight:700; color:var(--text-bright);">Khoảnh #${t+1}</span>
            <span class="badge" style="background:${n?"rgba(79,140,98,0.15)":"rgba(83,123,180,0.15)"}; border:1px solid ${n?"var(--green)":"var(--blue)"}; color:${n?"var(--green)":"var(--blue)"}; font-size:9px; padding:1px 5px; border-radius:2px;">
              ${n?"SẴN SÀNG":"ĐANG SINH TRƯỞNG"}
            </span>
          </div>

          <div style="font-size:13px; font-weight:700; color:var(--text-bright); margin-bottom:2px;">
            ${r}
          </div>
          <div style="font-size:10px; color:var(--text-dim); margin-bottom:8px;">
            Phẩm cấp: Cấp ${e.tier||1}
          </div>
        </div>

        <div>
          <!-- PROGRESS BAR -->
          <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:2px; height:5px; overflow:hidden; margin-bottom:6px;">
            <div class="garden-progress-fill" style="background:${n?"var(--green)":"var(--blue)"}; height:100%; width:${o}%; transition:width 0.5s ease;"></div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; color:var(--text-dim); margin-bottom:8px;">
            <span class="garden-countdown">${n?"Đã chín mùi":`${tt(s)} còn lại`}</span>
            <span>${o}%</span>
          </div>

          ${n?`
            <button class="btn btn--green btn-harvest" data-slot="${t}" style="font-size:11px; padding:4px 8px; border-radius:3px; width:100%; font-weight:600;">
              Thu Hoạch
            </button>
          `:`
            <button class="btn btn--dark" disabled style="font-size:11px; padding:4px 8px; border-radius:3px; width:100%; opacity:0.6;">
              Chờ Thu Hoạch
            </button>
          `}
        </div>
      </div>
    `}onMounted(){this.startCountdownLoop()}onUpdated(){this.startCountdownLoop()}startCountdownLoop(){this.setInterval(()=>{this.tickCountdowns()},1e3)}tickCountdowns(){if(!this.container)return;const t=this.container.querySelectorAll(".active-slot");let e=!1;t.forEach(a=>{let n=parseInt(a.dataset.remaining||"0",10);const s=parseInt(a.dataset.total||"1",10);if(n>0){n-=1,a.dataset.remaining=String(n);const o=Math.min(100,Math.round((s-n)/Math.max(1,s)*100)),r=a.querySelector(".garden-countdown");r&&(r.textContent=`${tt(n)} còn lại`);const d=a.querySelector(".garden-progress-fill");d&&(d.style.width=`${o}%`),n===0&&(e=!0)}}),e&&this.props.onTimeElapsed&&this.props.onTimeElapsed()}bindEvents(){this.on("change",".seed-select",(t,e)=>{const a=parseInt(e.dataset.slot,10),n=e.value,s={...this.state.selectedSeeds};s[a]=n,this.setState({selectedSeeds:s})}),this.on("click",".btn-plant",(t,e)=>{const a=parseInt(e.dataset.slot,10),n=this.state.selectedSeeds[a];n&&this.props.onPlant&&this.props.onPlant(a,n)}),this.on("click",".btn-harvest",(t,e)=>{const a=parseInt(e.dataset.slot,10);this.props.onHarvest&&this.props.onHarvest(a)}),this.on("click","#btnHarvestAll",()=>{this.props.onHarvestAll&&this.props.onHarvestAll()})}}class ln extends M{template(){const{housingData:t={},player:e={}}=this.props,a=t,n=!!a.owned,s=a.formations||{};a.tier;const o=e.gold||0,r=a.dailyUpkeep||0,d=!!a.maintenanceDue;return n?`
      <div class="formation-view" style="display:flex; flex-direction:column; gap:16px;">
        <!-- UPKEEP BANNER -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                Hộ Phủ Trận Đạo (Hao Phí: ${j(r)} Linh Thạch/ngày)
              </h3>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Trận pháp duy trì hiệu ứng gia tăng chỉ số thụ động. Hàng ngày cần tiêu hao linh thạch để bổ sung linh nhãn.
              </div>
            </div>

            ${r>0?`
              <div style="display:flex; align-items:center; gap:8px;">
                ${d?`
                  <button class="btn btn--red" id="btnPayMaintenance" style="font-size:12px; padding:5px 14px; border-radius:3px; font-weight:600;">
                    Nộp Phí Duy Trì
                  </button>
                `:`
                  <span class="badge" style="background:rgba(79,140,98,0.15); border:1px solid var(--green); color:var(--green); font-size:11px; padding:4px 10px; border-radius:3px;">
                    Linh Lực Dồi Dào (Đã Nộp)
                  </span>
                `}
              </div>
            `:""}
          </div>
        </div>

        <!-- FORMATIONS LIST -->
        <div class="formations-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
          ${Object.entries(s).map(([c,p])=>{const v=p.currentLevel||0,l=p.maxLevel||5,u=v>=l,x=!!p.canBuild,g=p.nextCost||0,b=p.nextDailyCost||0,h=o>=g;let y="Chưa kích hoạt",f="";return c==="tu_linh_tran"?(y=v>0?`+${v*2} MP / 10s`:"Chưa kích hoạt",f=`+${(v+1)*2} MP / 10s`):c==="ho_the_tran"?(y=v>0?`+${v*5} HP / 10s`:"Chưa kích hoạt",f=`+${(v+1)*5} HP / 10s`):c==="linh_dien_tran"?(y=v>0?`+${Math.round(v*10)}% tốc độ`:"Chưa kích hoạt",f=`+${Math.round((v+1)*10)}% tốc độ`):c==="thu_linh_tran"?(y=v>0?`+${v*15} Thể lực tối đa`:"Chưa kích hoạt",f=`+${(v+1)*15} Thể lực tối đa`):c==="quy_nguyen_tran"&&(y=v>0?`+${v*5}% tu vi nhận được`:"Chưa kích hoạt",f=`+${(v+1)*5}% tu vi nhận được`),`
              <div class="panel formation-card" style="background:var(--bg-panel); border:1px solid ${v>0?"var(--border-light)":"var(--border)"}; border-radius:4px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div>
                  <!-- HEADER -->
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                    <div>
                      <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:13px; font-weight:700; color:var(--text-bright);">${p.name}</span>
                        <span class="badge" style="background:${v>0?"rgba(83,123,180,0.15)":"rgba(255,255,255,0.04)"}; border:1px solid ${v>0?"var(--blue)":"var(--border)"}; color:${v>0?"var(--blue)":"var(--text-dim)"}; font-size:10px; padding:1px 6px; border-radius:2px;">
                          ${u?"ĐẠI VIÊN MÃN":v>0?`CẤP ${v}/${l}`:"CHƯA LẬP"}
                        </span>
                      </div>
                      <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">
                        ${p.description}
                      </div>
                    </div>
                  </div>

                  <!-- BONUS COMPARISON -->
                  <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px; margin-top:8px; font-size:11px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                      <span style="color:var(--text-dim);">Hiệu ứng hiện tại:</span>
                      <strong style="color:${v>0?"var(--green)":"var(--text-dim)"};">${y}</strong>
                    </div>
                    ${!u&&x?`
                      <div style="display:flex; justify-content:space-between;">
                        <span style="color:var(--text-dim);">Cấp tiếp theo:</span>
                        <strong style="color:var(--gold);">${f}</strong>
                      </div>
                    `:""}
                  </div>
                </div>

                <!-- FOOTER ACTIONS -->
                <div style="border-top:1px solid var(--border); padding-top:10px;">
                  ${x?u?`
                    <div style="font-size:11px; color:var(--gold); text-align:center; font-weight:600;">
                      Trận Pháp Đã Đạt Cực Hạn
                    </div>
                  `:`
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="font-size:10px; color:var(--text-dim);">
                        Phí nâng: <strong style="color:var(--gold);">${j(g)}</strong> · Phí duy trì: <strong>${j(b)}/ngày</strong>
                      </div>
                      <button class="btn btn-upgrade-formation ${h?"btn--gold":"btn--dark"}" data-fid="${c}" ${h?"":"disabled"} style="font-size:11px; padding:4px 12px; border-radius:3px; font-weight:600;">
                        ${v===0?"Bố Trí":"Thăng Cấp"}
                      </button>
                    </div>
                  `:`
                    <div style="font-size:11px; color:var(--red); text-align:center;">
                      Yêu cầu Động Phủ Cấp T${p.requiredTier}+ để khai mở
                    </div>
                  `}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:`
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:24px; text-align:center;">
          <h3 style="font-size:15px; font-weight:700; color:var(--text-bright); margin-bottom:6px;">Trận Pháp Chưa Mở Khóa</h3>
          <p style="font-size:12px; color:var(--text-dim); margin-bottom:16px;">Đạo hữu cần sở hữu Động Phủ từ Cấp 2 (Mộc Ốc) trở lên để bố trí các đại trận hộ phủ.</p>
        </div>
      `}bindEvents(){this.on("click",".btn-upgrade-formation",(t,e)=>{const a=e.dataset.fid;a&&this.props.onUpgradeFormation&&this.props.onUpgradeFormation(a)}),this.on("click","#btnPayMaintenance",()=>{this.props.onPayMaintenance&&this.props.onPayMaintenance()})}}class cn extends M{initialState(){return{dailyFeeInput:100}}template(){const{housingData:t={},rentals:e=[],player:a={}}=this.props,n=t,s=!!n.owned,o=!!n.isRenting,r=a.gold||0;return`
      <div class="rental-view" style="display:flex; flex-direction:column; gap:16px;">
        <!-- OWNER LISTING SECTION -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0 0 6px 0;">
            Niêm Yết Gian Phòng Cho Thuê
          </h3>
          <p style="font-size:11px; color:var(--text-dim); margin-bottom:12px;">
            Đạo hữu sở hữu Động Phủ có thể mở cửa sương phòng cho các đồng đạo khác vào tu luyện. Chủ phủ nhận 85% tiền thuê mỗi ngày, 15% nạp thuế thiên đạo.
          </p>

          ${s?`
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <label style="font-size:11px; color:var(--text-dim);">Giá Thuê / Ngày:</label>
                <input type="number" id="inputRentalFee" min="10" max="100000" value="${this.state.dailyFeeInput}" style="background:var(--bg-panel); border:1px solid var(--border); color:var(--text-bright); border-radius:3px; padding:4px 8px; width:120px; font-size:12px; font-weight:600;" />
                <span style="font-size:11px; color:var(--text-dim);">Linh Thạch</span>
              </div>
              <button class="btn btn--gold" id="btnListRental" style="font-size:12px; padding:5px 16px; border-radius:3px; font-weight:600;">
                Niêm Yết Cho Thuê
              </button>
            </div>
          `:`
            <div style="font-size:11px; color:var(--text-dim); font-style:italic;">
              Chỉ chủ nhân Động Phủ mới có quyền niêm yết phòng cho thuê.
            </div>
          `}
        </div>

        <!-- AVAILABLE RENTALS MARKET -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
              Thị Trường Cho Thuê Phòng Tu Luyện (${e.length} Gian Khả Dụng)
            </h3>
            <button class="btn btn--dark btn--sm" id="btnRefreshRentals" style="font-size:11px; padding:3px 10px; border-radius:3px;">
              Làm Mới
            </button>
          </div>

          ${e.length===0?`
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:24px; text-align:center; color:var(--text-dim); font-size:12px;">
              Hiện chưa có đạo hữu nào niêm yết phòng tu luyện trên phường thị.
            </div>
          `:`
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border); color:var(--text-dim);">
                    <th style="padding:8px;">Chủ Phủ</th>
                    <th style="padding:8px;">Cảnh Giới Động Phủ</th>
                    <th style="padding:8px;">Gia Tăng Khí Huyết</th>
                    <th style="padding:8px;">Tỷ Lệ Đột Phá</th>
                    <th style="padding:8px;">Giá Thuê / Ngày</th>
                    <th style="padding:8px; text-align:right;">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  ${e.map(d=>{const c=d.owner_id===a.id,p=r>=d.daily_fee,v=!s&&!o&&!c&&p;return`
                      <tr style="border-bottom:1px solid rgba(255,255,255,0.03);">
                        <td style="padding:8px; font-weight:600; color:var(--text-bright);">
                          ${d.owner_name} <span style="font-size:10px; color:var(--text-dim);">(Cấp ${d.owner_level})</span>
                          ${c?'<span class="badge" style="background:rgba(83,123,180,0.15); color:var(--blue); font-size:9px; padding:1px 4px; border-radius:2px; margin-left:4px;">CỦA BẠN</span>':""}
                        </td>
                        <td style="padding:8px;">
                          <span class="badge" style="background:var(--bg-main); border:1px solid var(--border); font-size:10px; padding:1px 6px; border-radius:2px;">
                            ${d.tierName} (T${d.abode_tier})
                          </span>
                        </td>
                        <td style="padding:8px; color:var(--green); font-weight:600;">+${d.hpRegen} HP/10s</td>
                        <td style="padding:8px; color:var(--gold); font-weight:600;">+${d.breakthroughBonus}%</td>
                        <td style="padding:8px; font-weight:700; color:var(--gold);">${j(d.daily_fee)} Linh Thạch</td>
                        <td style="padding:8px; text-align:right;">
                          ${c?`
                            <button class="btn btn--dark btn--sm" disabled style="font-size:10px; padding:3px 8px; border-radius:2px;">
                              Phòng Của Bạn
                            </button>
                          `:s?`
                            <button class="btn btn--dark btn--sm" disabled title="Đã có Động Phủ riêng" style="font-size:10px; padding:3px 8px; border-radius:2px;">
                              Đã Có Phủ
                            </button>
                          `:o?`
                            <button class="btn btn--dark btn--sm" disabled title="Đang thuê phòng khác" style="font-size:10px; padding:3px 8px; border-radius:2px;">
                              Đang Thuê
                            </button>
                          `:`
                            <button class="btn btn-rent-room ${p?"btn--gold":"btn--dark"} btn--sm" data-rental-id="${d.id}" ${v?"":"disabled"} style="font-size:10px; padding:3px 10px; border-radius:2px; font-weight:600;">
                              ${p?"Thuê Phòng":"Thiếu Tiền"}
                            </button>
                          `}
                        </td>
                      </tr>
                    `}).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `}bindEvents(){this.on("input","#inputRentalFee",(t,e)=>{this.setState({dailyFeeInput:parseInt(e.value,10)||100})}),this.on("click","#btnListRental",()=>{const t=this.state.dailyFeeInput;this.props.onListRental&&this.props.onListRental(t)}),this.on("click","#btnRefreshRentals",()=>{this.props.onRefreshRentals&&this.props.onRefreshRentals()}),this.on("click",".btn-rent-room",(t,e)=>{const a=parseInt(e.dataset.rentalId,10);a&&this.props.onRentRoom&&this.props.onRentRoom(a)})}}class pn extends M{initialState(){var e;return{activeTab:((e=(this.props.ctx||{}).state)==null?void 0:e._housingTab)||"overview",housingData:null,rentals:[],loading:!0,error:null}}template(){var r,d,c;const{loading:t,error:e,housingData:a}=this.state,n=a||{},s=((r=n.tierInfo)==null?void 0:r.name)||"Động Phủ",o=n.tier||1;return`
      <div class="housing-page">
        <!-- HEADER -->
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
          <div>
            <h1 style="display:flex; align-items:center; gap:8px; margin:0; font-size:18px; font-weight:700;">
              Động Phủ Tu Tiên
            </h1>
            <div class="text-sm text-dim" style="font-size:12px; color:var(--text-dim); margin-top:2px;">
              Tụ tập linh mạch thiên địa, bồi dưỡng căn cơ, gieo trồng linh dược và lập trận hộ thân.
            </div>
          </div>

          ${n.owned?`
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:4px; padding:6px 12px; font-size:12px; display:flex; align-items:center; gap:8px;">
              <span class="badge" style="background:rgba(83,123,180,0.15); border:1px solid var(--blue); color:var(--blue); font-size:10px; font-weight:700; padding:1px 6px; border-radius:2px;">
                T${o}
              </span>
              <strong style="color:var(--text-bright);">${s}</strong>
              <span style="color:var(--text-dim);">·</span>
              <span style="color:var(--green); font-weight:600;">+${((d=n.passiveBonuses)==null?void 0:d.hpRegenBonus)||((c=n.tierInfo)==null?void 0:c.hpRegen)||2} HP/10s</span>
            </div>
          `:""}
        </div>

        <!-- TABS BAR MOUNT -->
        <div id="housingTabsNav" style="margin-bottom:12px;"></div>

        <!-- MAIN CONTENT AREA -->
        <div id="housingTabContent">
          ${t?`
            <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:32px; text-align:center; color:var(--text-dim); font-size:12px;">
              Đang dẫn dắt linh khí vào Động Phủ...
            </div>
          `:e?`
            <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:24px; text-align:center; color:var(--red); font-size:12px;">
              Lỗi: ${e}
            </div>
          `:""}
        </div>
      </div>
    `}async onMounted(){await this.loadAllData(),this.renderTabs(),this.renderActiveSubView()}onUpdated(){this.renderTabs(),this.renderActiveSubView()}onUnmounted(){this._currentSubView&&(this._currentSubView.unmount(),this._currentSubView=null),this._tabsComponent&&(this._tabsComponent.unmount(),this._tabsComponent=null)}async loadAllData(){const{ctx:t}=this.props;if(!t)return;const e=t.state.playerId;try{const[a,n]=await Promise.all([t.api.getHousing(e),t.api.getRentals().catch(()=>({rentals:[]}))]);this.setState({housingData:a,rentals:n.rentals||[],loading:!1,error:null})}catch(a){this.setState({loading:!1,error:a.message||"Không thể kết nối đến Động Phủ"})}}renderTabs(){var c;const t=(c=this.container)==null?void 0:c.querySelector("#housingTabsNav");if(!t)return;this._tabsComponent&&(this._tabsComponent.unmount(),this._tabsComponent=null);const{housingData:e,rentals:a=[]}=this.state,n=e||{},o=(n.gardenSlots||[]).filter(p=>p&&p.ready).length;let r=0;n.formations&&Object.values(n.formations).forEach(p=>{p.currentLevel>0&&r++});const d=[{id:"overview",label:"Tổng Quan",badge:n.owned?`T${n.tier||1}`:null},{id:"garden",label:"Dược Viên",badge:o>0?o:null},{id:"formations",label:"Hộ Phủ Trận Pháp",badge:r>0?r:null},{id:"rentals",label:"Phường Thị Thuê Phủ",badge:a.length>0?a.length:null}];this._tabsComponent=new ot({tabs:d,activeTab:this.state.activeTab,onTabChange:p=>{const{ctx:v}=this.props;v!=null&&v.state&&(v.state._housingTab=p),this.setState({activeTab:p})}}),this._tabsComponent.mount(t)}renderActiveSubView(){var r,d,c;const t=(r=this.container)==null?void 0:r.querySelector("#housingTabContent");if(!t||this.state.loading||this.state.error)return;this._currentSubView&&(this._currentSubView.unmount(),this._currentSubView=null);const{ctx:e}=this.props;(d=e==null?void 0:e.state)==null||d.playerId;const a=((c=e==null?void 0:e.state)==null?void 0:c.player)||{},{housingData:n,rentals:s,activeTab:o}=this.state;o==="overview"?this._currentSubView=new on({housingData:n,player:a,onPurchase:()=>this.handleBuyOrUpgrade(),onUpgrade:()=>this.handleBuyOrUpgrade(),onPayUpkeep:()=>this.handlePayMaintenance()}):o==="garden"?this._currentSubView=new dn({housingData:n,onPlant:(p,v)=>this.handlePlant(p,v),onHarvest:p=>this.handleHarvest(p),onHarvestAll:()=>this.handleHarvest(null),onTimeElapsed:()=>this.loadAllData()}):o==="formations"?this._currentSubView=new ln({housingData:n,player:a,onUpgradeFormation:p=>this.handleUpgradeFormation(p),onPayMaintenance:()=>this.handlePayMaintenance()}):o==="rentals"&&(this._currentSubView=new cn({housingData:n,rentals:s,player:a,onListRental:p=>this.handleListRental(p),onRentRoom:p=>this.handleRentRoom(p),onRefreshRentals:()=>this.loadAllData()})),this._currentSubView&&this._currentSubView.mount(t)}async handleBuyOrUpgrade(){const{ctx:t}=this.props,e=t.state.playerId;try{const a=await t.api.buyHousing(e);t.notify(a.message,"success"),a.player&&(t.state.player=a.player,t.updateSidebar()),await this.loadAllData()}catch(a){t.notify(a.message||"Lỗi nâng cấp Động Phủ","error")}}async handlePlant(t,e){const{ctx:a}=this.props,n=a.state.playerId;try{const s=await a.api.plantHerb(n,e,t);a.notify(s.message,"success"),await this.loadAllData()}catch(s){a.notify(s.message||"Lỗi gieo giống","error")}}async handleHarvest(t=null){const{ctx:e}=this.props,a=e.state.playerId;try{let n;t!==null?n=await e.api.request(`/player/${a}/housing/harvest`,{method:"POST",body:JSON.stringify({slotIndex:t})}):n=await e.api.harvestGarden(a),e.notify(n.message,"success"),n.player&&(e.state.player=n.player,e.updateSidebar()),await this.loadAllData()}catch(n){e.notify(n.message||"Lỗi thu hoạch","error")}}async handleUpgradeFormation(t){const{ctx:e}=this.props,a=e.state.playerId;try{const n=await e.api.upgradeFormation(a,t);e.notify(n.message,"success"),n.player&&(e.state.player=n.player,e.updateSidebar()),await this.loadAllData()}catch(n){e.notify(n.message||"Lỗi thăng cấp trận pháp","error")}}async handlePayMaintenance(){const{ctx:t}=this.props,e=t.state.playerId;try{const a=await t.api.payMaintenance(e);t.notify(a.message,"success"),a.player&&(t.state.player=a.player,t.updateSidebar()),await this.loadAllData()}catch(a){t.notify(a.message||"Lỗi nộp phí duy trì","error")}}async handleListRental(t){const{ctx:e}=this.props,a=e.state.playerId;try{const n=await e.api.listForRent(a,t);e.notify(n.message,"success"),await this.loadAllData()}catch(n){e.notify(n.message||"Lỗi niêm yết phòng","error")}}async handleRentRoom(t){const{ctx:e}=this.props,a=e.state.playerId;try{const n=await e.api.rentRoom(a,t);e.notify(n.message,"success"),n.player&&(e.state.player=n.player,e.updateSidebar()),await this.loadAllData()}catch(n){e.notify(n.message||"Lỗi thuê phòng","error")}}}let W=null;async function gn(i,t){W&&(W.unmount(),W=null),W=new pn({ctx:t}),W.mount(i)}function hn(i,t){const{state:e}=t;e._wikiTab||(e._wikiTab="lore");function a(){i.innerHTML=`
      <div class="page-header">
        <h2>📜 Nghịch Thiên Ký — Wiki</h2>
        <p class="page-sub">Tất cả thông tin về thế giới tu tiên và hướng dẫn chơi</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        ${["lore","realm","combat","skills","explore","tower","dungeon","housing","talent","alchemy","market","tips"].map(s=>`
          <button class="btn btn--sm ${e._wikiTab===s?"btn--gold":"btn--dark"}" data-tab="${s}">
            ${{lore:"📖 Lore",realm:"🌟 Cảnh Giới",combat:"⚔️ Chiến Đấu",skills:"⚡ Kỹ Năng",explore:"🗺️ Khám Phá",tower:"🗼 Thiên Phần Tháp",dungeon:"🏰 Bí Cảnh",housing:"🏠 Động Phủ",talent:"🧬 Căn Cốt",alchemy:"⚗️ Luyện Đan",market:"🏪 Thương Mại",tips:"💡 Mẹo"}[s]}
          </button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="panel-body" style="padding:16px;line-height:1.7;font-size:13px">
          ${n(e._wikiTab)}
        </div>
      </div>
    `,i.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{e._wikiTab=s.dataset.tab,a()})})}function n(s){return{lore:`
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
        <h3 style="color:var(--gold);margin-bottom:12px">⚡ Mô Hình Kỹ Năng 4 Trụ Cột & Cơ Chế Xuất Chiêu</h3>
        <p>Quy hoạch kỹ năng chuẩn tu chân, phân định rành mạch giữa Thực Chiến, Hào Quang và Thông Thạo:</p>

        <h4 style="color:var(--blue)">🏛️ 4 Trụ Cột Kỹ Năng</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0">
          <div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
            ⚔️ <strong>Trụ Cột 1: Chiêu Thức</strong><br>
            <span class="text-dim text-xs">Kỹ năng chủ động thực chiến (Trọng Kích, Hấp Huyết Kiếm...). Trang bị vào các ô xuất chiêu theo cấp cảnh giới.</span>
          </div>
          <div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
            🧘 <strong>Trụ Cột 2: Tâm Pháp & Hào Quang</strong><br>
            <span class="text-dim text-xs">Cơ chế Khóa Linh Lực (Mana Reservation). Chiếm dụng % Linh lực tối đa để duy trì hộ thể, regen và tăng kháng thiên kiếp.</span>
          </div>
          <div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
            🐺 <strong>Trụ Cột 3: Thông Thạo Quái Vật</strong><br>
            <span class="text-dim text-xs">Bách Thú Đồ Giám 5 sao: Khắc chế tập tính (+Dmg), Kháng đòn quái (-Dmg), Bắt thấu sơ hở và Tuyệt diệt trảm sát.</span>
          </div>
          <div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
            ⚒️ <strong>Trụ Cột 4: Thông Thạo Chế Tạo</strong><br>
            <span class="text-dim text-xs">Nâng cao tay nghề Luyện Đan & Đúc Khí: Tăng phẩm chất trang bị, giảm nguyên liệu và tăng tỷ lệ bạo phát đan dược.</span>
          </div>
        </div>

        <h4 style="color:var(--gold)">🎯 Cơ Chế Xác Suất Kích Hoạt Chiêu Thức (Active Skill Trigger Chance)</h4>
        <div style="background:rgba(234,179,8,0.05);border:1px solid rgba(234,179,8,0.2);border-radius:6px;padding:12px;margin:8px 0;font-size:12px;">
          • Trong mỗi hiệp đấu, đạo hữu sẽ tung xúc xắc kiểm tra xác suất kích hoạt của các Chiêu Thức đã trang bị.<br>
          • <strong>Công thức xác suất:</strong> <code>Xác Suất = Tỷ Lệ Cơ Bản (Tier 1: 55% → Tier 6: 25%) + Cấp Thông Thạo (+1%/Lv) + Mẫn Tiệp (+1%/10 Điểm) + Thế Phá Quy (+5%)</code>.<br>
          • <strong>Tiêu hao:</strong> Khi xuất chiêu thành công, đạo hữu sẽ tiêu hao Linh Lực tương ứng. Nếu không đủ Linh Lực hoặc đổ xúc xắc không thành công, đạo hữu sẽ xuất đòn thường công.<br>
          • <strong>Tối đa/Tối thiểu:</strong> Xác suất được giới hạn trong khoảng 15% - 85% để luôn đảm bảo tính biến ảo của thực chiến.
        </div>
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
      `}[s]||'<div style="text-align:center;opacity:0.4">Chọn một mục để xem</div>'}a()}function un(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;e._npcShop||(e._npcShop={shops:[],tax:{rate:5,reason:""},loaded:!1});const r=e._npcShop;let d=parseInt(localStorage.getItem("npcShopIdx")||"0");async function c(){try{i.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>';const l=await a.getShops(o);r.shops=l.shops||[],r.tax=l.currentTax||{rate:5,reason:"Thuế tiêu chuẩn"},r.loaded=!0,d>=r.shops.length&&(d=0),p()}catch(l){n(l.message||"Lỗi tải shop","error")}}function p(){var h;if(r.shops.length===0){i.innerHTML=`
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`;return}const l=r.shops[d]||r.shops[0],u=r.shops.map((y,f)=>`
      <button class="skill-tab ${f===d?"active":""}" data-shop-idx="${f}">
        ${y.icon||"🧓"} ${y.name}
      </button>
    `).join(""),x={common:"#888",uncommon:"#4a9",rare:"#48f",epic:"#a4f",legendary:"var(--gold)"},g={common:"Phàm",uncommon:"Tốt",rare:"Quý",epic:"Huyền",legendary:"Thần"},b=(l.items||[]).map(y=>{var w,k;const f=x[y.rarity||"common"]||"#888",m=g[y.rarity||"common"]||"Phàm",T=(y.remainingStock??1)<=0,$=(((w=e.player)==null?void 0:w.gold)??0)>=(y.currentPrice||0);return`
        <div class="shop-item-card ${T?"out-of-stock":""}" style="border-left:3px solid ${f}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${f}">${y.name}</div>
              <div class="shop-item-rarity" style="color:${f}">${m} · Tầng ${y.tier||1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${T?"var(--red)":"var(--green)"}">
                ${T?"❌ Hết hàng":`📦 ${y.remainingStock}/${y.dailyStock}`}
              </span>
            </div>
          </div>
          ${y.description?`<div class="shop-item-desc">${y.description}</div>`:""}
          <div class="shop-item-footer">
            <div class="shop-item-price ${$?"":"too-expensive"}">
              💎 ${((k=y.currentPrice)==null?void 0:k.toLocaleString())||"?"} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${l.id}" data-item="${y.id}" 
                value="1" min="1" max="${y.remainingStock||1}" 
                ${T?"disabled":""}>
              <button class="btn btn--sm ${T?"":$?"btn--gold":"btn--dark"} btn-buy" 
                data-shop="${l.id}" data-item="${y.id}"
                ${T||!$?"disabled":""}>
                ${T?"❌":$?"🛒 Mua":"💸 Thiếu"}
              </button>
            </div>
          </div>
        </div>
      `}).join("");i.innerHTML=`
      <div class="page-header">
        <h1>🧓 Thương Nhân</h1>
        <div class="text-dim text-sm">Mỗi thương nhân có hàng giới hạn mỗi ngày. Mua sắm thông minh!</div>
      </div>

      <div class="shop-info-bar">
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${r.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(((h=e.player)==null?void 0:h.gold)??0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${l.area||"Không rõ"}</div>
      </div>

      ${r.shops.length>1?`<div class="skill-tabs" style="margin-bottom:12px">${u}</div>`:""}

      <div class="shop-items-grid">
        ${b||'<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `,v()}function v(){i.querySelectorAll(".skill-tab[data-shop-idx]").forEach(l=>{l.addEventListener("click",()=>{d=parseInt(l.dataset.shopIdx),localStorage.setItem("npcShopIdx",d),p()})}),i.querySelectorAll(".btn-buy").forEach(l=>{l.addEventListener("click",async()=>{const u=l.dataset.shop,x=l.dataset.item,g=i.querySelector(`.buy-qty[data-shop="${u}"][data-item="${x}"]`),b=parseInt((g==null?void 0:g.value)||1);l.disabled=!0,l.textContent="⏳...";try{const h=await a.buyFromShop(o,u,x,b);n(h.message,"success"),e.player=h.player,s(),await c()}catch(h){n(h.message,"error"),l.disabled=!1,l.textContent="🛒 Mua"}})})}r.loaded?p():c()}function vn(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;e._guild||(e._guild={data:null,loaded:!1,allGuilds:null});const r=e._guild;async function d(){try{r.data=await a.getMyGuild(o),r.loaded=!0,p()}catch(x){n(x.message||"Lỗi","error")}}async function c(){try{const x=await a.listGuilds();r.allGuilds=x.guilds||[],p()}catch(x){n(x.message,"error")}}function p(){const x=r.data;i.innerHTML=`
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${x!=null&&x.inGuild?l(x):v(x)}
    `,u()}function v(x){return`
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🏗️ Lập Tông Môn Mới</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:grid;gap:8px;max-width:360px">
            <input type="text" id="guildName" placeholder="Tên Tông Môn (2-30 ký tự)" class="input" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <input type="text" id="guildTag" placeholder="Tag (2-5 ký tự, VD: TMQ)" class="input" maxlength="5" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <textarea id="guildDesc" placeholder="Mô tả..." rows="2" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;resize:none"></textarea>
            <button class="btn btn--gold" id="btnCreate">🏯 Lập Tông Môn (${(x==null?void 0:x.createCost)||1e4} 💎)</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>📋 Danh Sách Tông Môn</span>
          <button class="btn btn--sm btn--dark" id="btnLoadGuilds">🔄 Tải</button>
        </div>
        <div class="panel-body no-pad" id="guildList">
          ${r.allGuilds?r.allGuilds.map(g=>`
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
    `}function l(x){var y;const g=x.guild,b=x.members||[],h=x.log||[];return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${g.tag}] ${g.name} <span style="opacity:0.3">Lv${g.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${((y=g.levelInfo)==null?void 0:y.name)||""} · ${g.memberCount}/${g.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${g.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${g.dailyUpkeep}/ngày</span>
              ${g.upkeepDue?' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>':""}
            </div>
            ${Object.keys(g.buffs||{}).length>0?`
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(g.buffs).map(([f,m])=>`${f} +${m}%`).join(", ")}
              </div>
            `:""}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${x.myRole==="leader"&&g.nextLevel?`<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${g.nextLevel.name}">⬆ ${g.nextLevel.upgradeCost} 💎</button>`:""}
            ${x.myRole==="leader"&&g.upkeepDue?'<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>':""}
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
            Bạn đã đóng: ${x.myContributed} 💎 · Vai trò: ${x.myRole==="leader"?"👑 Chưởng Môn":x.myRole==="elder"?"⭐ Trưởng Lão":"🙋 Đệ Tử"}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">📜 Nhật Ký</div>
          <div class="panel-body" style="max-height:160px;overflow-y:auto;padding:8px 12px">
            ${h.slice(0,10).map(f=>`
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(f.created_at).toLocaleString("vi")}</span>
                ${f.detail||f.action}
              </div>
            `).join("")||'<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${b.length}/${g.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${b.map(f=>`
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${f.role==="leader"?"👑":f.role==="elder"?"⭐":"🙋"}</span>
              <div style="flex:1">
                <span style="font-weight:500">${f.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${f.contributed} 💎</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${x.myRole!=="leader"?'<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>':""}
    `}function u(){var x,g,b,h,y,f;(x=document.getElementById("btnCreate"))==null||x.addEventListener("click",async()=>{var w,k,_,S,L,P;const m=(k=(w=document.getElementById("guildName"))==null?void 0:w.value)==null?void 0:k.trim(),T=(S=(_=document.getElementById("guildTag"))==null?void 0:_.value)==null?void 0:S.trim(),$=(P=(L=document.getElementById("guildDesc"))==null?void 0:L.value)==null?void 0:P.trim();if(!m||!T)return n("Nhập tên và tag!","error");try{const H=await a.createGuild(o,m,T,$);n(H.message,"success"),e.player=H.player,s(),r.loaded=!1,await d()}catch(H){n(H.message,"error")}}),(g=document.getElementById("btnLoadGuilds"))==null||g.addEventListener("click",c),document.querySelectorAll(".btn-join").forEach(m=>{m.addEventListener("click",async()=>{try{const T=await a.joinGuild(o,parseInt(m.dataset.gid));n(T.message,"success"),r.loaded=!1,await d()}catch(T){n(T.message,"error")}})}),(b=document.getElementById("btnContribute"))==null||b.addEventListener("click",async()=>{var T;const m=parseInt(((T=document.getElementById("contributeAmt"))==null?void 0:T.value)||0);if(!(m<=0))try{const $=await a.contributeGuild(o,m);n($.message,"success"),e.player=$.player,s(),await d()}catch($){n($.message,"error")}}),(h=document.getElementById("btnUpgradeGuild"))==null||h.addEventListener("click",async()=>{if(confirm("Nâng cấp Tông Môn? Dùng tiền quỹ."))try{const m=await a.upgradeGuild(o);n(m.message,"success"),await d()}catch(m){n(m.message,"error")}}),(y=document.getElementById("btnPayUpkeep"))==null||y.addEventListener("click",async()=>{try{const m=await a.payGuildUpkeep(r.data.guild.id);n(m.message,"success"),await d()}catch(m){n(m.message,"error")}}),(f=document.getElementById("btnLeave"))==null||f.addEventListener("click",async()=>{if(confirm("Rời Tông Môn?"))try{const m=await a.leaveGuild(o);n(m.message,"success"),r.loaded=!1,await d()}catch(m){n(m.message,"error")}})}r.loaded?p():d()}function bn(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;e._profile||(e._profile={results:[],viewing:null,searchQuery:""});const r=e._profile;function d(){i.innerHTML=`
      <div class="page-header">
        <h2>🔍 Tìm Đạo Hữu</h2>
        <p class="page-sub">Tìm kiếm người chơi theo tên. Xem profile, tấn công hoặc kết bạn.</p>
      </div>

      <div class="panel" style="margin-bottom:12px">
        <div class="panel-body" style="padding:12px 16px;display:flex;gap:8px">
          <input type="text" id="searchInput" placeholder="Nhập tên người chơi..."
            value="${r.searchQuery}"
            style="flex:1;padding:8px 12px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
          <button class="btn btn--blue" id="btnSearch">🔍 Tìm</button>
        </div>
      </div>

      ${r.viewing?c(r.viewing):""}

      ${r.results.length>0&&!r.viewing?`
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${r.results.length})</div>
        <div class="panel-body no-pad">
          ${r.results.map(l=>`
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
      `:!r.viewing&&r.searchQuery?'<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>':""}
    `,p()}function c(l){var b,h,y;const u=l.id===o,x=l.maxHp>0?Math.round(l.currentHp/l.maxHp*100):100,g={thanh_lam_tran:"Thanh Lam Trấn",hac_phong_lam:"Hắc Phong Lâm",vong_linh_coc:"Vong Linh Cốc",thiet_huyet_son:"Thiết Huyết Sơn",bac_suong_canh:"Bắc Sương Cảnh"};return`
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${((b=l.name[0])==null?void 0:b.toUpperCase())||"?"}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${l.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${l.level} · ${((h=l.realmInfo)==null?void 0:h.fullName)||"Phàm Nhân"}
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
              <div style="height:100%;width:${x}%;background:${x>30?"var(--green)":"var(--red)"};border-radius:3px;transition:width 0.3s"></div>
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

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${(y=l.gold)==null?void 0:y.toLocaleString()} 💎</strong></div>

          ${u?'<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>':`
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${l.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${l.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          `}
        </div>
      </div>
    `}function p(){var l,u,x,g,b;(l=document.getElementById("btnSearch"))==null||l.addEventListener("click",v),(u=document.getElementById("searchInput"))==null||u.addEventListener("keydown",h=>{h.key==="Enter"&&v()}),document.querySelectorAll(".btn-view, [data-view]").forEach(h=>{h.addEventListener("click",async()=>{const y=h.dataset.vid||h.dataset.view;try{const f=await a.getPlayerProfile(y);r.viewing=f.profile,d()}catch(f){n(f.message,"error")}})}),(x=document.getElementById("btnAttack"))==null||x.addEventListener("click",async()=>{const h=document.getElementById("btnAttack").dataset.tid;if(confirm(`Tấn công ${r.viewing.name}?`))try{const y=await a.mugPlayer(o,h);y.outcome==="pending_action"||y.actions?Zt({data:y,pid:o,state:e,api:a,notify:n,updateSidebar:s,onComplete:()=>{d()}}):(n(y.message,y.won?"success":"error"),y.player&&(e.player=y.player,s()))}catch(y){n(y.message,"error")}}),(g=document.getElementById("btnAddFriend"))==null||g.addEventListener("click",async()=>{const h=document.getElementById("btnAddFriend").dataset.tid;try{const y=await a.addFriend(o,h);n(y.message||"Đã gửi lời mời!","success")}catch(y){n(y.message,"error")}}),(b=document.getElementById("btnBackSearch"))==null||b.addEventListener("click",()=>{r.viewing=null,d()})}async function v(){var x;const l=document.getElementById("searchInput"),u=(x=l==null?void 0:l.value)==null?void 0:x.trim();if(!u||u.length<2)return n("Nhập ít nhất 2 ký tự!","error");r.searchQuery=u,r.viewing=null;try{const g=await a.searchPlayers(u);r.results=g.players||[],d()}catch(g){n(g.message,"error")}}d()}const zt=[{name:"Vô Danh",icon:"🌑",min:0,color:"#666666",tier:1},{name:"Võ Sinh",icon:"🥋",min:1e3,color:"#5ba3cf",tier:2},{name:"Võ Sĩ",icon:"⚔️",min:1200,color:"#6a8f3f",tier:3},{name:"Đấu Sĩ",icon:"🔥",min:1400,color:"#d4a017",tier:4},{name:"Đấu Sư",icon:"💫",min:1600,color:"#b06cff",tier:5},{name:"Á Quân",icon:"🥈",min:1800,color:"#c0c0c0",tier:6},{name:"Quán Quân",icon:"👑",min:2e3,color:"#ff4500",tier:7}];function ht(i){const t=parseInt(i),e=isNaN(t)?1e3:t;let a=zt[0];for(const n of zt)e>=n.min&&(a=n);return a}function mn(i,t){const e=parseInt(i),a=parseInt(t),n=isNaN(e)?1e3:e,s=isNaN(a)?1e3:a,o=(s-n)/400,r=1/(1+Math.pow(10,o)),d=Math.round(r*1e3)/10;let c="Cân Tài",p="Cân Tài",v="#c29f55",l="odds-even";return d>=60?(c="Ưu Thế",p="Ưu Thế",v="#4f8c62",l="odds-advantage"):d<40&&(c="Hạ Phong",p="Hạ Phong",v="#b84a4a",l="odds-underdog"),{winProbability:d,tierLabel:c,labelShort:p,badgeColor:v,badgeClass:l,eloDelta:s-n}}function ut(i){const t=parseInt(i)||0;return t>=10?{text:`Bất Bại x${t}`,cssClass:"badge-streak streak-apex streak-fire-apex",count:t}:t>=5?{text:`Liên Thắng x${t}`,cssClass:"badge-streak streak-flame streak-fire-high",count:t}:t>=3?{text:`Chuỗi x${t}`,cssClass:"badge-streak streak-lightning",count:t}:t>=1?{text:`Chuỗi x${t}`,cssClass:"badge-streak streak-subtle streak-basic",count:t}:t<0?{text:`Bại x${Math.abs(t)}`,cssClass:"badge-streak streak-loss",count:t}:null}function yn(i,t,e,a){if(typeof i=="object"&&i!==null){const v=i.turn||t+1,l=!!i.isCrit,u=!!i.isDodge,x=i.action==="skill"||!!i.skillName,g=i.damage!==void 0?i.damage:null;let b="";if(i.text)b=i.text.replace(/(CHÍ MẠNG!?|bạo kích!?)/gi,'<strong class="log-crit">$1</strong>').replace(/(né tránh[^!.]*)/gi,'<span class="log-dodge">$1</span>').replace(/(⚡\s*\[Kích Hoạt\]\s*[^\[]*\[[^\]]+\])/gi,'<span class="log-skill">$1</span>').replace(/(gây\s*)(\d+)(\s*(?:sát thương|ST))/gi,'$1<strong class="log-damage">$2$3</strong>');else{const h=i.attacker==="player"?e||"Bạn":i.attacker==="opponent"?a||"Đối thủ":i.attacker||"Đấu giả",y=i.defender?`→ ${i.defender==="player"?e||"Bạn":a||"Đối thủ"}`:"",f=x?`thi triển <strong>[${i.skillName||"Kỹ năng"}]</strong>`:"xuất thường công";let m="";u?m='<span class="log-dodge">🎯 né tránh hoàn toàn!</span>':g!==null&&(m=`gây <strong class="${l?"log-crit":"log-damage"}">${g} ST</strong> ${l?'<span class="log-crit-tag">💥 CHÍ MẠNG!</span>':""}`),b=`<span class="log-actor text-bright">${h}</span> ${y} ${f} ${m}`}return`
      <div class="log-turn ${l?"turn-crit":""} ${u?"turn-dodge":""}">
        <span class="log-turn-badge">H.${v}</span>
        <div class="log-turn-content">${b}</div>
      </div>
    `}const n=String(i),s=n.match(/^(?:Turn|Hiệp)\s*(\d+):\s*(.*)$/i),o=s?s[1]:t+1,r=s?s[2]:n,d=/CHÍ MẠNG|bạo kích/i.test(r),c=/né tránh/i.test(r),p=r.replace(/(CHÍ MẠNG!?|bạo kích!?)/gi,'<strong class="log-crit">$1</strong>').replace(/(né tránh[^!.]*)/gi,'<span class="log-dodge">$1</span>').replace(/(⚡\s*\[Kích Hoạt\]\s*[^\[]*\[[^\]]+\])/gi,'<span class="log-skill">$1</span>').replace(/(gây\s*)(\d+)(\s*(?:sát thương|ST))/gi,'$1<strong class="log-damage">$2$3</strong>');return`
    <div class="log-turn ${d?"turn-crit":""} ${c?"turn-dodge":""}">
      <span class="log-turn-badge">H.${o}</span>
      <div class="log-turn-content">${p}</div>
    </div>
  `}function Ht(i,t,e,a){let n=[];if(i)if(typeof i=="string")try{n=JSON.parse(i)}catch{n=[]}else n=i;let s=[];return Array.isArray(n)?s=n:n&&typeof n=="object"&&Array.isArray(n.turns)?s=n.turns:n&&typeof n=="object"&&Array.isArray(n.log)&&(s=n.log),!s||s.length===0?`<div class="combat-log-empty text-dim">📜 Không có nhật ký chiến đấu chi tiết cho trận đấu này (bản ghi lịch sử trước khi nâng cấp). Kết quả: ${t?'<span style="color:var(--green)">Chiến thắng</span>':'<span style="color:var(--red)">Thất bại</span>'}.</div>`:`
    <div class="combat-log-turns">
      ${s.map((o,r)=>yn(o,r,e,a)).join("")}
    </div>
  `}function xn(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;e._arena||(e._arena={data:null,loaded:!1,fighting:!1,lastResult:null});const r=e._arena;async function d(){try{r.data=await a.getArena(o),r.loaded=!0,c()}catch(v){n(v.message,"error")}}function c(){var y,f,m,T,$,w,k,_;const v=r.data||{},l=v.arena||{},u=parseInt(l.rating),x=isNaN(u)?1e3:u,g=l.rank||ht(x),b=parseInt(l.streak)||0,h=b!==0?ut(b):null;i.innerHTML=`
      <div class="page-header">
        <h2>Luận Đạo Đấu Trường</h2>
        <p class="page-sub">Tranh đoạt bảng phong thần, so tài cùng đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo.</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:14px; border-left:4px solid ${g.color||"#666"}">
        <div class="panel-body" style="display:flex; align-items:center; gap:16px; padding:16px">
          <div style="font-size:32px">${g.icon||""}</div>
          <div style="flex:1">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:6px">
              <div>
                <div style="font-size:11px; opacity:0.5; text-transform:uppercase; letter-spacing:1px">Cấp Bậc Hiện Tại</div>
                <div style="font-weight:800; font-size:18px; color:${g.color||"#fff"}">${g.name||"Chưa xếp hạng"}</div>
              </div>
              ${h?`<div><span class="${h.cssClass}">${h.text}</span></div>`:""}
            </div>
            <div style="font-size:12.5px; opacity:0.75; margin-top:4px">
              ELO: <strong>${x}</strong> · Thắng: <strong>${l.wins||0}</strong> / Bại: <strong>${l.losses||0}</strong>
            </div>
            ${g.nextThreshold?`
              <div style="margin-top:8px">
                <div style="display:flex; justify-content:space-between; font-size:10px; opacity:0.6">
                  <span>Tiến trình đến ${g.nextThreshold} ELO</span>
                  <span>${g.progress||0}%</span>
                </div>
                <div style="background:rgba(255,255,255,0.1); border-radius:4px; height:5px; margin-top:3px; overflow:hidden">
                  <div style="background:${g.color||"#666"}; height:100%; width:${g.progress||0}%; border-radius:4px; transition:width 0.5s ease"></div>
                </div>
              </div>
            `:'<div style="font-size:11px; color:var(--gold); margin-top:6px">Đỉnh cao: Thiên Đạo Đệ Nhất Vô Song!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${(y=r.lastResult)!=null&&y.rankUp?`
      <div class="panel" style="margin-bottom:14px; border:1px solid var(--gold); text-align:center; padding:16px">
        <div style="font-size:32px">${((f=r.lastResult.newRank)==null?void 0:f.icon)||""}</div>
        <div style="font-size:16px; font-weight:800; color:var(--gold); margin-top:6px">THĂNG CẤP! BẠN ĐÃ ĐẠT HẠNG ${(m=r.lastResult.newRank)==null?void 0:m.name}!</div>
      </div>
      `:""}

      <!-- LAST RESULT -->
      ${r.lastResult?`
      <div class="panel" style="margin-bottom:14px; border-left:4px solid ${r.lastResult.won?"var(--green)":"var(--red)"}">
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px">
            <div style="font-weight:800; font-size:15px; color:${r.lastResult.won?"var(--green)":"var(--red)"}">
              ${r.lastResult.won?"CHIẾN THẮNG":"THẤT BẠI"}
            </div>
            <div style="font-size:12px; font-weight:700">
              ELO: <span style="color:${r.lastResult.ratingChange>=0?"var(--green)":"var(--red)"}">${r.lastResult.ratingChange>0?"+":""}${r.lastResult.ratingChange}</span>
              ${r.lastResult.goldEarned>0?` · <span style="color:var(--gold)">+${r.lastResult.goldEarned} Linh Thạch</span>`:""}
            </div>
          </div>
          <div style="font-size:12.5px; margin-top:6px">
            Đối thủ: <strong>${(T=r.lastResult.opponent)==null?void 0:T.name}</strong> 
            (ELO ${($=r.lastResult.opponent)==null?void 0:$.rating})
          </div>
          ${(w=r.lastResult.combatLog)!=null&&w.length?`
            <div style="margin-top:10px">
              <button class="btn-toggle-log" data-log-id="last-result-log">Xem Diễn Biến Trận Đấu</button>
              <div class="combat-log-collapse" id="last-result-log" style="display:none; margin-top:8px">
                ${Ht(r.lastResult.combatLog,r.lastResult.won,"Bạn",(k=r.lastResult.opponent)==null?void 0:k.name)}
              </div>
            </div>
          `:""}
        </div>
      </div>
      `:""}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:14px">
        <div class="panel-title flex justify-between items-center">
          <span>Danh Sách Đối Thủ (Khiêu Chiến)</span>
          <span class="text-xs text-dim">Phí: ${v.entryFee||50} LT · Thắng: +${v.winGold||200} LT + ELO</span>
        </div>
        <div class="panel-body no-pad">
          ${(v.opponents||[]).length>0?`
            <div class="arena-cards-grid">
              ${(v.opponents||[]).map(S=>{var K;const L=S.rank||ht(S.rating),P=((K=e.player)==null?void 0:K.level)||1,H=S.level-P,E=H>0?`+${H}`:`${H}`,N=H>0?"text-red":H<0?"text-green":"text-dim",z=mn(x,S.rating),I=parseInt(S.streak)||0,O=I>0?ut(I):null;return`
                  <div class="arena-card rank-tier-${L.tier||1}" style="--rank-color: ${L.color||"#666"}">
                    <div class="arena-card-header">
                      <div class="rank-insignia" style="background: ${L.color||"#666"}22; border-color: ${L.color||"#666"}55;">
                        <span class="rank-name" style="color: ${L.color||"#fff"}">${L.name}</span>
                      </div>
                      <div class="level-indicator">
                        Lv.${S.level} <span class="level-delta ${N}">(Δ ${E})</span>
                      </div>
                    </div>

                    <div class="arena-card-body">
                      <div class="opp-profile">
                        <div class="opp-name">${S.name}</div>
                        <div class="opp-rating-row">
                          <span class="opp-rating">ELO <strong>${S.rating}</strong></span>
                          <span class="elo-delta text-dim">(${z.eloDelta>=0?"+":""}${z.eloDelta})</span>
                        </div>
                      </div>

                      ${O?`
                        <div class="opp-streak-container">
                          <span class="${O.cssClass}">${O.text}</span>
                        </div>
                      `:""}

                      <div class="odds-meter">
                        <div class="odds-meter-header">
                          <span class="odds-badge ${z.badgeClass}">${z.tierLabel}</span>
                          <span class="odds-percent" style="color: ${z.badgeColor}">${z.winProbability}% Thắng</span>
                        </div>
                        <div class="odds-track">
                          <div class="odds-fill ${z.badgeClass}" style="width: ${Math.min(100,Math.max(5,z.winProbability))}%; background: ${z.badgeColor}"></div>
                        </div>
                      </div>
                    </div>

                    <div class="arena-card-footer">
                      <button class="btn btn--red btn--sm btn-block btn-fight-opp" data-oid="${S.player_id}" ${r.fighting?"disabled":""}>
                        Khiêu Chiến (${v.entryFee||50} LT)
                      </button>
                    </div>
                  </div>
                `}).join("")}
            </div>
          `:'<div style="padding:20px; text-align:center; opacity:0.5">Không tìm thấy đối thủ phù hợp quanh mốc ELO của bạn.</div>'}

          <div style="padding:12px 14px; text-align:center; border-top:1px solid rgba(255,255,255,0.06)">
            <button class="btn btn--blue" id="btnRandomFight" ${r.fighting?"disabled":""}>
              Đấu Ngẫu Nhiên (${v.entryFee||50} LT)
            </button>
          </div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px" class="arena-columns">
        <!-- TOP 10 -->
        <div class="panel">
          <div class="panel-title">🏆 Bảng Xếp Hạng Top 10</div>
          <div class="panel-body no-pad">
            ${(v.top10||[]).map((S,L)=>{const P=S.rank||ht(S.rating),H=parseInt(S.streak)||0,E=H>0?ut(H):null;return`
                <div class="list-item" style="padding:8px 12px; font-size:12px; display:flex; align-items:center; gap:8px">
                  <span style="width:24px; font-weight:700; color:${L<3?"var(--gold)":"var(--text-dim)"}">#${L+1}</span>
                  <span>${P.icon||""}</span>
                  <span style="flex:1; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${S.name}</span>
                  ${E?`<span class="${E.cssClass}" style="font-size:9px; padding:1px 5px">${E.text}</span>`:""}
                  <span style="color:${P.color||"var(--blue)"}; font-weight:700">${S.rating}</span>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- DUEL HISTORY -->
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử Đấu Trường</div>
          <div class="panel-body no-pad">
            ${(v.history||[]).length>0?(v.history||[]).map((S,L)=>{const P=S.winner_id===o,H=S.attacker_id===o,E=H?S.defender_name:S.attacker_name,N=H?"Tấn công":"Phòng thủ",z=`history-log-${S.id||L}`;return`
                <div class="duel-history-item">
                  <div class="duel-header-row">
                    <span class="badge" style="background:${P?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)"}; color:${P?"var(--green)":"var(--red)"}; font-weight:700; font-size:11px">
                      ${P?"🏆 THẮNG":"💀 THUA"}
                    </span>
                    <div class="duel-meta">
                      <div class="duel-opponent-name">vs ${E}</div>
                      <div class="duel-sub text-dim">${N} · ${S.created_at||"Vừa xong"}</div>
                    </div>
                    <div style="text-align:right">
                      <div style="font-weight:700; font-size:12px; color:${S.rating_change>=0?"var(--green)":"var(--red)"}">
                        ${S.rating_change>0?"+":""}${S.rating_change} ELO
                      </div>
                      ${S.gold_reward>0?`<div style="font-size:10px; color:var(--gold)">+${S.gold_reward} 💎</div>`:""}
                    </div>
                    <button class="btn-toggle-log" data-log-id="${z}">📜 Xem Diễn Biến</button>
                  </div>
                  
                  <div class="combat-log-collapse" id="${z}" style="display:none">
                    ${Ht(S.fight_log,P,S.attacker_name,S.defender_name)}
                  </div>
                </div>
              `}).join(""):'<div style="padding:16px; text-align:center; opacity:0.5">Chưa có trận đấu nào trong lịch sử</div>'}
          </div>
        </div>
      </div>
    `,i.querySelectorAll(".btn-fight-opp").forEach(S=>{S.addEventListener("click",L=>{var H;const P=L.target.closest(".btn-fight-opp");(H=P==null?void 0:P.dataset)!=null&&H.oid&&p(P.dataset.oid)})}),(_=document.getElementById("btnRandomFight"))==null||_.addEventListener("click",()=>p(null)),i.querySelectorAll(".btn-toggle-log").forEach(S=>{S.addEventListener("click",L=>{var z;const P=L.target.closest(".btn-toggle-log"),H=(z=P==null?void 0:P.dataset)==null?void 0:z.logId;if(!H)return;const E=document.getElementById(H);if(!E)return;const N=E.style.display==="none";E.style.display=N?"block":"none",P.textContent=N?"🔽 Thu Gọn":"📜 Xem Diễn Biến"})})}async function p(v){r.fighting=!0,c();try{const l=await a.request(`/player/${o}/arena/fight`,{method:"POST",body:JSON.stringify({opponentId:v})});r.lastResult=l,e.player=l.player,s(),n(l.message,l.won?"success":"error"),r.fighting=!1,await d()}catch(l){n(l.message,"error"),r.fighting=!1,c()}}r.loaded?c():d()}function fn(i,t){const{state:e,api:a,notify:n,updateSidebar:s}=t,o=e.playerId;async function r(){try{e._worldBoss=await a.getWorldBoss(),d()}catch(c){n(c.message,"error")}}function d(){var g;const c=e._worldBoss||{},p=c.boss||{},v=c.hpPercent||0,l=c.topContributors||[],u=c.rewards||{},x=p.status==="active"&&p.current_hp>0;i.innerHTML=`
      <div class="page-header">
        <h2>Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:18px;font-weight:700">${p.name||"Đang tải..."}</div>
          <div style="font-size:12px;opacity:0.5">Lv${p.level||"?"} · ${x?"ĐANG HOẠT ĐỘNG":"ĐÃ BỊ ĐÁNH BẠI"}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>Khí Huyết</span><span>${(p.current_hp||0).toLocaleString()} / ${(p.max_hp||0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${v}%;background:${v>50?"var(--red)":v>20?"var(--orange)":"var(--green)"};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>
          ${x?'<button class="btn btn--red btn--lg" id="btnAttackBoss">Tấn Công (5 Thể Lực)</button>':'<div style="color:var(--gold);margin-top:8px">Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: ${u.gold||0} Linh Thạch · ${u.xp||0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div id="bossCombatResult"></div>

      <div class="panel">
        <div class="panel-title">Bảng Đóng Góp</div>
        <div class="panel-body no-pad">
          ${l.length===0?'<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>':l.map((b,h)=>{var y;return`
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${h<3?"var(--gold)":"var(--text-dim)"}">#${h+1}</span>
                <span style="flex:1">${b.name}</span>
                <span style="color:var(--red)">${(y=b.total_damage)==null?void 0:y.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${b.hits} hits)</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,(g=document.getElementById("btnAttackBoss"))==null||g.addEventListener("click",async()=>{const b=document.getElementById("btnAttackBoss");b.disabled=!0,b.textContent="⏳ Đang giao chiến...";const h=document.getElementById("bossCombatResult");try{const y=await a.attackWorldBoss(o);if(e.player=y.player,s(),y.log&&y.log.length>0){const f=y.log.map(w=>w.startsWith("---")?`<div class="turn">${w}</div>`:w.includes("hụt")?`<div class="miss">${w}</div>`:w.includes("né được")?`<div class="dodge">${w}</div>`:w.includes("CHÍNH MẠNG")||w.includes("💥")?`<div class="crit">${w}</div>`:w.includes("🔥")?`<div class="heavy text-orange">${w}</div>`:w.includes("chặn hoàn toàn")||w.includes("🛡")?`<div class="dodge">${w}</div>`:w.includes("ngã xuống")||w.includes("💀")?`<div class="death">${w}</div>`:w.includes("Chiến thắng")||w.includes("🏆")?`<div class="victory">${w}</div>`:w.includes("bỏ chạy")||w.includes("🏃")?`<div class="flee">${w}</div>`:w.includes("Bất phân")||w.includes("🤝")?`<div class="stalemate">${w}</div>`:w.includes("🧪")?`<div class="status-effect text-purple">${w}</div>`:w.includes("💔")?`<div class="dot-damage text-purple bold">${w}</div>`:w.includes("✨")?`<div class="regen text-green">${w}</div>`:`<div class="hit">${w}</div>`).join(""),m={win:{icon:"🏆",text:"Chiến thắng",cls:"win"},loss:{icon:"💀",text:"Hết sức (Không phạt)",cls:"lose"},stalemate:{icon:"⏰",text:"Bất phân thắng bại",cls:"draw"},flee:{icon:"🏃",text:"Thoát thân",cls:"flee"}},T=m[y.outcome]||m.loss,$=Math.max(0,e.player.currentHp/e.player.maxHp*100);h.innerHTML=`
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${T.icon} ${T.text}
                <span class="subtitle">${y.turns}/${y.maxTurns||25} lượt · ⚔️ ${y.damage} dmg cho Boss</span>
              </div>
              <div class="panel-body combat-result ${T.cls}">
                <div class="combat-opponents">
                  <div class="fighter">
                    <div class="f-name player-name">${e.player.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${$}%"></div></div>
                    <div class="mini-hp-val">${e.player.currentHp}/${e.player.maxHp}</div>
                  </div>
                  <div class="vs">VS</div>
                  <div class="fighter">
                    <div class="f-name monster-name">${p.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(y.bossHp/y.bossMaxHp*100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${y.bossHp.toLocaleString()}/${y.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${f}</div>
            </div>`}y.defeated?n(y.message,"success"):n(`⚔️ ${y.damage} dmg!`,"info"),await r()}catch(y){n(y.message,"error"),b.disabled=!1,b.textContent="Tấn Công"}})}r()}function $n(i,t){const{state:e,api:a,notify:n,updateSidebar:s,renderGame:o}=t,r=e.playerId,d={common:"#999",uncommon:"var(--green)",rare:"var(--blue)",legendary:"var(--gold)"};async function c(){var v;try{const[l,u]=await Promise.all([a.getGachaPools(),a.getGachaPity(r)]);e._gacha={pools:l.pools||{},pity:u.pity||{},results:((v=e._gacha)==null?void 0:v.results)||[]},p()}catch(l){n(l.message,"error")}}function p(){const v=e._gacha||{},l=v.pools||{},u=v.pity||{},x=v.results||[];i.innerHTML=`
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(l).map(([g,b])=>{var y,f,m;const h=u[g]||{};return`
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${g==="premium"?"✨":"🎰"}</div>
              <div style="font-weight:700">${b.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${d.legendary}">★ ${(y=b.rates)==null?void 0:y.legendary}%</span> ·
                <span style="color:${d.rare}">◆ ${(f=b.rates)==null?void 0:f.rare}%</span> ·
                <span style="color:${d.uncommon}">● ${(m=b.rates)==null?void 0:m.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${h.pulls_since_rare||0}/${b.pityRare} · Legend: ${h.pulls_since_legendary||0}/${b.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="1">💎 ${b.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${g}" data-pulls="10">💎 ${b.cost*10} x10</button>
              </div>
            </div>
          </div>`}).join("")}
      </div>

      ${x.length>0?`
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${x.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${x.map(g=>{var b,h,y,f;return`
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${d[g.rarity]||"#555"};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${((b=g.item)==null?void 0:b.slot)==="weapon"?"⚔️":((h=g.item)==null?void 0:h.slot)==="armor"?"🛡️":"💍"}</div>
                <div style="font-size:11px;font-weight:600;color:${d[g.rarity]}">${((y=g.item)==null?void 0:y.name)||"?"}</div>
                <div style="font-size:9px;opacity:0.4">[${g.rarity}] ${(((f=g.item)==null?void 0:f.affixes)||[]).length} affix</div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      `:""}
    `,i.querySelectorAll(".btn-pull").forEach(g=>g.addEventListener("click",async()=>{const b=g.dataset.pool,h=parseInt(g.dataset.pulls);g.disabled=!0,g.textContent="⏳...";try{const y=await a.gachaPull(e.playerId,b,h);n(y.message,"success"),e.player=y.player,s(),e._gacha.results=y.results||[],e._gacha.pity[b]=y.pity,p()}catch(y){n(y.message,"error"),g.disabled=!1}}))}c()}function Tn(i,t){const{state:e,api:a,notify:n}=t;e._lbTab||(e._lbTab="level");async function s(){const r=e._lbTab||"level";i.innerHTML='<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>';try{const d=await a.getLeaderboard(r);e._lbData=d,o()}catch(d){i.innerHTML=`<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${d.message}
      </div></div>`}}function o(){const r=e._lbTab||"level",c=(e._lbData||{}).rankings||[],v=[{id:"level",icon:"📊",name:"Cấp Độ"},{id:"gold",icon:"💰",name:"Linh Thạch"},{id:"pvp",icon:"⚔️",name:"Đấu Trường"},{id:"guild",icon:"🏯",name:"Tông Môn"}].map(u=>`
      <button class="skill-tab ${r===u.id?"active":""}" data-tab="${u.id}">
        ${u.icon} ${u.name}
      </button>
    `).join("");let l="";c.length===0?l='<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>':r==="guild"?l=c.map((u,x)=>`
        <div class="lb-row ${x<3?"lb-top":""}">
          <div class="lb-rank ${x<3?"lb-rank-top":""}">${x<3?["🥇","🥈","🥉"][x]:"#"+(x+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${u.tag}] ${u.name}</div>
            <div class="lb-sub">👤 ${u.members}/${u.max_members} · Leader: ${u.leader_name||"?"}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(u.treasury||0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${u.level}</div>
          </div>
        </div>
      `).join(""):r==="pvp"?l=c.map((u,x)=>`
        <div class="lb-row ${x<3?"lb-top":""}">
          <div class="lb-rank ${x<3?"lb-rank-top":""}">${x<3?["🥇","🥈","🥉"][x]:"#"+(x+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${u.name}</div>
            <div class="lb-sub">Lv.${u.level} · ${u.wins||0}W/${u.losses||0}L${u.streak>0?` · 🔥${u.streak}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${u.rating||1e3}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join(""):l=c.map((u,x)=>`
        <div class="lb-row ${x<3?"lb-top":""}">
          <div class="lb-rank ${x<3?"lb-rank-top":""}">${x<3?["🥇","🥈","🥉"][x]:"#"+(x+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${u.name}</div>
            <div class="lb-sub">${u.realm_tier?`Cảnh giới ${u.realm_tier}`:""} ${r==="level"?`· Lv.${u.level}`:""}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${r==="gold"?`💎 ${parseInt(u.gold||0).toLocaleString()}`:`Lv.${u.level}`}
            </div>
          </div>
        </div>
      `).join(""),i.innerHTML=`
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${v}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${l}
        </div>
      </div>
    `,i.querySelectorAll(".skill-tab[data-tab]").forEach(u=>{u.addEventListener("click",()=>{e._lbTab=u.dataset.tab,s()})})}s()}const wn=new URLSearchParams(window.location.search).get("page")||(window.location.hash?window.location.hash.slice(1):null),C={playerId:null,player:null,currentPage:wn||"combat",monsters:[],skills:[],items:[]},te=document.getElementById("app"),bt={get state(){return C},api:R,notify:B,renderGame:A,updateSidebar:En};async function kn(){const i=localStorage.getItem("isLoggedOut")==="true",t=localStorage.getItem("playerId");if(!i&&t&&!C.playerId)try{const e=await R.getPlayer(t);C.playerId=t,C.player=e.player,await rt(),A();return}catch{localStorage.removeItem("playerId")}if(!i&&!C.playerId)try{const e=await R.login("admin","admin");C.playerId=e.id,C.player=e.player,localStorage.setItem("playerId",e.id),await rt(),A();return}catch(e){console.warn("Dev auto-login failed. Fallback to intro UI.",e)}C.playerId?A():xt()}function xt(){var t,e;const i=C.authTab||"login";te.innerHTML=`
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
    </div>`,document.querySelectorAll("[data-auth]").forEach(a=>{a.addEventListener("click",()=>{C.authTab=a.dataset.auth,xt()})}),(t=document.getElementById("btnLogin"))==null||t.addEventListener("click",async()=>{const a=document.getElementById("inpUsername").value.trim(),n=document.getElementById("inpPassword").value;if(!a||!n)return B("Vui lòng nhập đầy đủ","error");try{const s=await R.login(a,n);C.playerId=s.id,C.player=s.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",s.id),B(s.message,"success"),await rt(),A()}catch(s){B(s.message||"Đăng nhập thất bại!","error")}}),(e=document.getElementById("btnRegister"))==null||e.addEventListener("click",async()=>{var r,d;const a=document.getElementById("inpUsername").value.trim(),n=document.getElementById("inpPassword").value,s=((r=document.getElementById("inpName"))==null?void 0:r.value.trim())||"Vô Danh",o=((d=document.querySelector('input[name="gender"]:checked'))==null?void 0:d.value)||"male";if(!a||!n)return B("Vui lòng nhập đầy đủ","error");try{const c=await R.register(a,n,s,o);C.playerId=c.id,C.player=c.player,localStorage.removeItem("isLoggedOut"),localStorage.setItem("playerId",c.id),B(c.message,"success"),await rt(),A()}catch(c){B(c.message||"Đăng ký thất bại!","error")}})}function ee(i){const t=Math.floor(Date.now()/1e3),e=[];return i.hospitalUntil&&i.hospitalUntil>t&&e.push({icon:"🏥",label:"Tịnh dưỡng",endTime:i.hospitalUntil,color:"var(--red)"}),i.jailUntil&&i.jailUntil>t&&e.push({icon:"⛓️",label:"Huyết Lao (Phạt Diện Bích)",endTime:i.jailUntil,color:"#c084fc"}),i.medCooldownUntil&&i.medCooldownUntil>t&&e.push({icon:"💊",label:"Đan độc",endTime:i.medCooldownUntil,color:"var(--orange)"}),i.divineWardUntil&&i.divineWardUntil>t&&e.push({icon:"🛡️",label:"Càn Khôn Hộ Thể (Miễn Đoạt Bảo)",endTime:i.divineWardUntil,color:"#38bdf8"}),i.travelArrivesAt&&i.travelArrivesAt>t&&e.push({icon:"🚶",label:"Di chuyển",endTime:i.travelArrivesAt,color:"var(--blue)"}),e.length===0?"":`<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${e.map(a=>{const n=Math.max(0,a.endTime-t),s=Math.floor(n/60),o=n%60,r=s>0?`${s}p${String(o).padStart(2,"0")}s`:`${o}s`;return`<span class="status-icon" data-end="${a.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${a.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${a.color};white-space:nowrap;
      " title="${a.label}">${a.icon} <span class="cd-time">${r}</span></span>`}).join("")}
  </div>`}function ne(i){const t=i.pendingEscrow??0;return`
    <div class="sidebar-gold" style="padding:2px 0 4px">
      <div style="font-size:12px; font-weight:700; color:var(--gold); margin-bottom:${t>0?"4px":"2px"}">${(i.gold??0).toLocaleString()} Linh Thạch</div>
      ${t>0?`
        <div class="escrow-claim-card" style="background:rgba(194, 159, 85, 0.08);border:1px solid rgba(194, 159, 85, 0.25);border-radius:4px;padding:4px 6px;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:10px;font-weight:600;color:var(--gold)">📬 Hộp Thư Thương Hội</div>
            <div style="font-size:11px;font-weight:bold;color:#dfcfb2">+${t.toLocaleString()} Linh Thạch</div>
          </div>
          <button class="btn btn--sm btn--gold btn-claim-escrow" style="padding:2px 6px;font-size:10px;">Nhận</button>
        </div>
      `:""}
    </div>
  `}let Mt=!1;function Sn(){Mt||(Mt=!0,document.addEventListener("click",async i=>{const t=i.target.closest(".btn-claim-escrow");if(!(!t||!C.playerId)){i.stopPropagation(),t.disabled=!0,t.textContent="Đang nhận...";try{const e=await R.claimEscrow(C.playerId);e.success&&(B(e.message,"success"),C.player&&(C.player.gold=e.current_gold,C.player.pendingEscrow=0,C.player.divineWardUntil=e.divine_ward_until),updateHUD())}catch(e){B(e.message||"Lỗi nhận Linh Thạch!","error"),t.disabled=!1,t.textContent="Nhận"}}}))}Sn();let Z=null;function Cn(){Z&&clearInterval(Z),Z=setInterval(()=>{const i=Math.floor(Date.now()/1e3);document.querySelectorAll(".status-icon[data-end]").forEach(t=>{const e=parseInt(t.dataset.end),a=Math.max(0,e-i);if(a<=0){t.remove();return}const n=Math.floor(a/60),s=a%60,o=t.querySelector(".cd-time");o&&(o.textContent=n>0?`${n}p${String(s).padStart(2,"0")}s`:`${s}s`)}),document.querySelectorAll(".status-effects").forEach(t=>{t.children.length===0&&t.remove()})},1e3)}function ae(i){let t="";const a={hac_phong_lam:{icon:"🌲",tooltip:"Rừng Rậm: Tăng 5% Tốc Độ"},vong_linh_coc:{icon:"👻",tooltip:"Âm Khí: Tăng 10% Nhanh Nhẹn"},thiet_huyet_son:{icon:"🌋",tooltip:"Nóng Bức: Tăng 10% Sát Thương Hỏa"},thien_kiep_uyen:{icon:"⚡",tooltip:"Lôi Điện: Tăng 15% Tốc Độ"},bac_suong_canh:{icon:"❄️",tooltip:"Đóng Băng: Giảm 10% Tốc Độ"},am_sat_hoang:{icon:"🎯",tooltip:"Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)"},co_moc_linh_vien:{icon:"🌳",tooltip:"Linh Khí Mộc: Tăng 15% Phòng Ngự"},huyet_ma_chien_truong:{icon:"🩸",tooltip:"Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận"},thien_hoa_linh_dia:{icon:"🔥",tooltip:"Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa"},u_minh_quy_vuc:{icon:"💀",tooltip:"U Ám Hút Hồn: Giảm 15% Phòng Ngự"},thien_dao_tan_tich:{icon:"✨",tooltip:"Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số"},vo_tan_hu_khong:{icon:"🌀",tooltip:"Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào"},cuu_u_than_uyen:{icon:"👿",tooltip:"Cửu U Ma Khí: Tăng 35% Sát Thương, 20% Tốc Độ"},thai_co_hong_hoang:{icon:"🦕",tooltip:"Hồng Hoang Cổ Khí: Tăng 25% Máu, 20% Giáp"},chu_thien_tinh_hai:{icon:"🌌",tooltip:"Tinh Tú Luân Chuyển: Tăng 30% Tốc Độ, 25% Nhanh Nhẹn"},hon_don_tien_vuc:{icon:"🔮",tooltip:"Hỗn Độn Tiên Khí: Tăng 35% Toàn Bộ Thuộc Tính"},hon_nguyen_dao_canh:{icon:"👑",tooltip:"Hỗn Nguyên Đạo Vực: Tăng 60% Sát Thương, 50% Toàn Thuộc Tính"}}[i.currentArea];return a&&(t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${a.tooltip}">${a.icon} Cảnh Vực</span>`),i.combatBuffs&&i.combatBuffs.length>0&&i.combatBuffs.forEach(n=>{let s="💊",o="Buff";n.type==="status"&&n.stat==="poison"?(s="☠️",o="Trúng Độc"):n.type==="status"&&n.stat==="confuse"?(s="👹",o="Ma Hóa"):n.stat==="allStats"||n.stat==="hp"||n.stat==="damage"?(s="🔥",o="Cuồng Nộ"):n.stat==="defense"||n.stat==="resist"?(s="🛡️",o="Kiên Cố"):n.stat==="speed"||n.stat==="dexterity"?(s="💨",o="Thân Pháp"):(s="✨",o="Cường Hóa");let r=n.duration?` (-${n.duration} Trận)`:"",d=`Hiệu ứng: ${n.stat} (${n.type} ${n.value})${n.duration?` - Còn lại: ${n.duration} Trận đấu`:""}`;t+=`<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${d}">${s} ${o}${r}</span>`}),t?`<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${t}</div>`:""}function A(){var f,m,T,$,w,k,_,S,L,P,H;const i=C.player,t=((f=i.stats)==null?void 0:f.maxHp)??i.maxHp??100,e=Math.min(t,i.currentHp),a=t>0?Math.min(100,Math.max(0,e/t*100)):0,n=i.maxStamina>0?Math.max(0,i.currentStamina/i.maxStamina*100):0,s=((m=i.stats)==null?void 0:m.maxEnergy)??i.maxEnergy??50,o=i.usableEnergy??Math.max(0,s-(i.reservedEnergy??0)),r=i.reservationPct??0,d=o>0?Math.min(100,Math.max(0,i.currentEnergy/o*100)):0,c=i.xpToNext&&i.xpToNext>0?Math.min(100,Math.max(0,(i.xp||0)/i.xpToNext*100)):0,p=C.exploration?C.exploration[i.currentArea||"thanh_lam_tran"]:null,v=p?p.name:"Khám Phá",l=C._collapsedNav||JSON.parse(localStorage.getItem("collapsedNav")||"{}");C._collapsedNav=l;const x={stats:"tuchan",glitch:"tuchan",skills:"tuchan",education:"tuchan",library:"tuchan",inventory:"tuchan",combat:"hanhtrinh",travel:"hanhtrinh",dungeon:"hanhtrinh",tiencanh:"hanhtrinh",quests:"hanhtrinh",dailyquest:"hanhtrinh",arena:"tranhdau",tower:"tranhdau",worldboss:"tranhdau",housing:"tienphu",guild:"tienphu",alchemy:"tienphu",market:"thuonghoi",auction:"thuonghoi",npcshop:"thuonghoi",gacha:"thuonghoi",admin:"vothuong"}[C.currentPage];x&&(l[x]=!1),te.innerHTML=`
    <div class="game-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="game-title">NGHỊCH THIÊN KÝ</div>
          <div class="game-sub">Tu Tiên RPG v2.0</div>
          <div style="position:relative;margin-top:4px">
            <input type="text" id="searchPlayerInput" placeholder="🔍 Tìm Người Chơi..." autocomplete="off" style="width:100%;padding:4px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.12);background:rgba(0,0,0,0.3);color:#fff;font-size:11px;outline:none">
            <div id="searchResults" style="position:absolute;top:100%;left:0;right:0;background:#1a1a2e;border:1px solid rgba(255,255,255,0.15);border-radius:0 0 4px 4px;max-height:180px;overflow-y:auto;z-index:100;display:none"></div>
          </div>
        </div>

        <div class="sidebar-player">
          <div class="player-name">${i.name}</div>
          ${i.activeTitle?`<div style="font-size:9.5px;color:var(--gold);font-weight:600;letter-spacing:0.5px;margin-top:1px">『${i.activeTitle}』</div>`:""}
          <div class="player-meta">Lv.${i.level} · ${((T=i.realmInfo)==null?void 0:T.fullName)||"?"}</div>
          ${ee(i)}
          ${ae(i)}
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>Khí Huyết</span>
              <span>
                ${e}/${t}
                ${e<t?`<span style="font-size:9px; color:var(--text-dim); margin-left:3px;">${($=i.skills)!=null&&$.some(E=>E.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${a}%" data-low="${a<30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:2px">
            <div class="bar-label">
              <span>Thể Lực</span>
              <span>
                ${i.currentStamina??100}/${i.maxStamina??100}
                ${(i.currentStamina??100)<(i.maxStamina??100)?`<span style="font-size:9px; color:var(--text-dim); margin-left:3px;">+${((w=i.stats)==null?void 0:w.staminaRegen)??2}/10s</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${n}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:2px">
            <div class="bar-label">
              <span>Linh Lực</span>
              <span>
                ${i.currentEnergy}/${o}
                ${r>0?`<span style="font-size:9px; color:#f59e0b; margin-left:3px;" title="Khóa ${r}% bởi Tâm Pháp Hào Quang">(Khóa ${r}%)</span>`:""}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${d}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:2px">
            <div class="bar-label">
              <span>Tu Vi (Lv.${i.level})</span>
              <span>${(i.xp??0).toLocaleString()}/${(i.xpToNext??100).toLocaleString()} <span style="font-size:9px; color:var(--text-dim); margin-left:2px;">(${c.toFixed(1)}%)</span></span>
            </div>
            <div class="bar-track"><div class="bar-fill xp" style="width:${c}%"></div></div>
          </div>
          ${ne(i)}
          <div class="sidebar-action-bar" style="display:flex;gap:3px;padding:2px 0 4px">
            <button class="btn btn--dark nav-item ${C.currentPage==="events"?"active":""}" data-page="events" style="flex:1;padding:3px 2px;font-size:12px;position:relative;justify-content:center" title="Thông Báo">
              📜${(i.unreadEventsCount??0)>0?'<span class="badge" style="position:absolute;top:-3px;right:-3px;background:var(--red);width:7px;height:7px;padding:0;border-radius:50%"></span>':""}
            </button>
            <button class="btn btn--dark nav-item ${C.currentPage==="wiki"?"active":""}" data-page="wiki" style="flex:1;padding:3px 2px;font-size:12px;justify-content:center" title="Bách Khoa">
              📖
            </button>
            <button class="btn btn--dark nav-item ${C.currentPage==="leaderboard"?"active":""}" data-page="leaderboard" style="flex:1;padding:3px 2px;font-size:12px;justify-content:center" title="Xếp Hạng">
              🏆
            </button>
            <button class="btn btn--dark nav-item ${C.currentPage==="social"?"active":""}" data-page="social" style="flex:1;padding:3px 2px;font-size:12px;justify-content:center" title="Xã Hội">
              💬
            </button>
            <button class="btn btn--dark btn-open-settings" style="flex:1;padding:3px 2px;font-size:12px;justify-content:center" title="Cài Đặt Hệ Thống">
              ⚙️
            </button>
          </div>
          <div style="font-size:9.5px;color:var(--text-dim);text-align:center;padding:2px 0 4px;border-bottom:1px solid var(--border)">
            ${v} ${i.hospitalRemaining>0?'<span style="color:var(--red)">[Tịnh dưỡng]</span>':i.travelRemaining>0?'<span style="color:var(--blue)">[Di chuyển...]</span>':""}
          </div>
        </div>

        <ul class="nav" style="${(i.travelRemaining||0)>0?"pointer-events:none; opacity:0.6;":""}">
          <!-- PHÂN HỆ 1: KHÁM PHÁ & HÀNH TRÌNH (Trọng Tâm Gameplay) -->
          <li class="nav-section ${l.hanhtrinh?"collapsed":""}" data-section="hanhtrinh">
            <span>KHÁM PHÁ & HÀNH TRÌNH</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.hanhtrinh?"collapsed":""}" id="sec-hanhtrinh">
            <li class="nav-item nav-item--hero ${C.currentPage==="combat"?"active":""}" data-page="combat">
              Khám Phá (${v})
              <span class="badge" style="background:rgba(194,159,85,0.15); color:#dfcfb2; border:1px solid rgba(194,159,85,0.3); font-weight:600; font-size:9px; padding:1px 5px;">CHÍNH</span>
            </li>
            <li class="nav-item ${["travel","dungeon","tiencanh"].includes(C.currentPage)?"active":""}" data-page="travel">
              Ngao Du Bát Hoang
              ${(i.travelRemaining??0)>0?'<span class="badge" style="background:rgba(83,123,180,0.15); color:#82a4d4; border:1px solid rgba(83,123,180,0.3)">[Đi]</span>':""}
            </li>
            <li class="nav-item ${["quests","dailyquest"].includes(C.currentPage)?"active":""}" data-page="quests">
              Thiên Cơ Nhiệm Vụ
              ${(i.activeQuests||[]).filter(E=>E.status==="active").length>0?`<span class="badge" style="background:rgba(134,104,170,0.15); color:#a992c7; border:1px solid rgba(134,104,170,0.3)">${(i.activeQuests||[]).filter(E=>E.status==="active").length}</span>`:""}
            </li>
          </div>

          <!-- PHÂN HỆ 2: TU CHÂN (Tự Thân & Tu Luyện) -->
          <li class="nav-section ${l.tuchan?"collapsed":""}" data-section="tuchan">
            <span>TU CHÂN</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.tuchan?"collapsed":""}" id="sec-tuchan">
            <li class="nav-item ${C.currentPage==="stats"?"active":""}" data-page="stats">
              Tu Luyện & Cảnh Giới
              ${(_=(k=C.player)==null?void 0:k.realmInfo)!=null&&_.canBreakthrough?'<span class="badge" style="background:rgba(194,159,85,0.2); color:var(--gold); border:1px solid rgba(194,159,85,0.4)" title="Có thể đột phá!">!</span>':""}
            </li>
            <li class="nav-item ${["skills","education","library","glitch"].includes(C.currentPage)?"active":""}" data-page="skills">
              Kỹ Năng & Lĩnh Ngộ
              ${(i.glitchInsight||0)>0?`<span class="badge" style="background:rgba(134,104,170,0.15); color:#a992c7; border:1px solid rgba(134,104,170,0.3)" title="Điểm Thấu Triệt">${i.glitchInsight}</span>`:""}
            </li>
            <li class="nav-item ${C.currentPage==="inventory"?"active":""}" data-page="inventory">
              Càn Khôn Túi
              ${(i.medCooldownRemaining??0)>0?'<span class="badge" style="background:rgba(209,159,96,0.15); color:#d19f60; border:1px solid rgba(209,159,96,0.3)" title="Đan độc">Độc</span>':""}
            </li>
          </div>

          <!-- PHÂN HỆ 3: TRANH ĐẤU (Chiến Đấu & Thử Thách) -->
          <li class="nav-section ${l.tranhdau?"collapsed":""}" data-section="tranhdau">
            <span>TRANH ĐẤU</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.tranhdau?"collapsed":""}" id="sec-tranhdau">
            <li class="nav-item ${C.currentPage==="arena"?"active":""}" data-page="arena">
              Luận Đạo Đấu Trường
            </li>
            <li class="nav-item ${C.currentPage==="tower"?"active":""}" data-page="tower">
              Thiên Phần Tháp
            </li>
            <li class="nav-item ${C.currentPage==="worldboss"?"active":""}" data-page="worldboss">
              Ma Thú Xâm Lăng
              <span class="badge" style="background:rgba(184,74,74,0.15); color:#d67a7a; border:1px solid rgba(184,74,74,0.3); font-size:9px">Boss</span>
            </li>
          </div>

          <!-- PHÂN HỆ 4: TIÊN PHỦ (Phương Ngoại & Thế Giới) -->
          <li class="nav-section ${l.tienphu?"collapsed":""}" data-section="tienphu">
            <span>TIÊN PHỦ</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.tienphu?"collapsed":""}" id="sec-tienphu">
            <li class="nav-item ${C.currentPage==="housing"?"active":""}" data-page="housing">
              Động Phủ Tu Tiên
            </li>
            <li class="nav-item ${C.currentPage==="guild"?"active":""}" data-page="guild">
              Tông Môn Bang Hội
            </li>
            <li class="nav-item ${C.currentPage==="alchemy"?"active":""}" data-page="alchemy">
              Luyện Đan & Đúc Khí
            </li>
          </div>

          <!-- PHÂN HỆ 5: THƯƠNG HỘI (Kinh Tế & Vận May) -->
          <li class="nav-section ${l.thuonghoi?"collapsed":""}" data-section="thuonghoi">
            <span>THƯƠNG HỘI</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.thuonghoi?"collapsed":""}" id="sec-thuonghoi">
            <li class="nav-item ${["market","auction"].includes(C.currentPage)?"active":""}" data-page="market">
              Phường Thị & Đấu Giá
            </li>
            <li class="nav-item ${C.currentPage==="npcshop"?"active":""}" data-page="npcshop">
              Tiên Các Thương Nhân
            </li>
            <li class="nav-item ${C.currentPage==="gacha"?"active":""}" data-page="gacha">
              Thiên Cơ Đài (Tầm Bảo)
            </li>
          </div>

          ${i.role==="admin"?`
          <!-- PHÂN HỆ 6: VÔ THƯỢNG (Admin) -->
          <li class="nav-section ${l.vothuong?"collapsed":""}" data-section="vothuong">
            <span>VÔ THƯỢNG</span>
            <span class="section-indicator">▾</span>
          </li>
          <div class="nav-group ${l.vothuong?"collapsed":""}" id="sec-vothuong">
            <li class="nav-item ${C.currentPage==="admin"?"active":""}" data-page="admin">
              Thiên Đạo Quản Trị
            </li>
          </div>`:""}
        </ul>

        <div class="sidebar-footer">
          <button class="btn btn--sm btn--outline btn-open-settings" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 11px; padding: 4px 6px;" title="Cài Đặt Hệ Thống">
            Cài Đặt
          </button>
          <button class="btn btn--sm btn--red" id="btnSidebarLogout" style="display: flex; align-items: center; justify-content: center; gap: 3px; font-size: 11px; padding: 4px 8px;" title="Đăng Xuất Tài Khoản">
            Thoát
          </button>
        </div>
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
    </div>`,document.querySelectorAll(".nav-item[data-page]").forEach(E=>{E.addEventListener("click",()=>{C.currentPage=E.dataset.page,A()})}),document.querySelectorAll(".nav-section[data-section]").forEach(E=>{E.addEventListener("click",()=>{const N=E.dataset.section;C._collapsedNav=C._collapsedNav||{},C._collapsedNav[N]=!C._collapsedNav[N],localStorage.setItem("collapsedNav",JSON.stringify(C._collapsedNav));const z=document.getElementById(`sec-${N}`);z&&(z.classList.toggle("collapsed",C._collapsedNav[N]),E.classList.toggle("collapsed",C._collapsedNav[N]))})}),(S=document.getElementById("btnFabChat"))==null||S.addEventListener("click",()=>vt("chat")),(L=document.getElementById("btnFabSocial"))==null||L.addEventListener("click",()=>vt("social"));const g=document.querySelector('.sidebar-action-bar .nav-item[data-page="events"]');g&&g.addEventListener("click",E=>{E.stopPropagation(),C.currentPage="events",C.popupOpen=!1,A()}),(P=document.getElementById("btnPopupClose"))==null||P.addEventListener("click",()=>{C.popupOpen=!1,A()}),document.querySelectorAll(".popup-tab[data-popup]").forEach(E=>{E.addEventListener("click",()=>vt(E.dataset.popup))}),document.querySelectorAll(".btn-open-settings").forEach(E=>{E.addEventListener("click",N=>{N.stopPropagation(),zn(i)})}),(H=document.getElementById("btnSidebarLogout"))==null||H.addEventListener("click",E=>{E.stopPropagation(),ie()}),Pn(),C.popupOpen&&_n();const b=document.getElementById("searchPlayerInput"),h=document.getElementById("searchResults");let y=null;b&&h&&(b.addEventListener("input",()=>{clearTimeout(y);const E=b.value.trim();if(E.length<2){h.style.display="none";return}y=setTimeout(async()=>{try{const N=await R.searchPlayers(E),z=N.players||N.results||[];z.length===0?h.innerHTML='<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>':h.innerHTML=z.map(I=>{var O;return`
              <div class="search-result" data-pid="${I.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${I.name} <span style="opacity:0.4">Lv.${I.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${((O=I.realmInfo)==null?void 0:O.name)||""}</span>
              </div>
            `}).join(""),h.style.display="block",h.querySelectorAll(".search-result").forEach(I=>{I.addEventListener("click",()=>{C.currentPage="profile",C._viewProfileId=I.dataset.pid,h.style.display="none",b.value="",A()}),I.addEventListener("mouseenter",()=>I.style.background="rgba(255,255,255,0.08)"),I.addEventListener("mouseleave",()=>I.style.background="transparent")})}catch{h.style.display="none"}},300)}),b.addEventListener("blur",()=>{setTimeout(()=>{h.style.display="none"},200)}),b.addEventListener("keydown",E=>{E.key==="Escape"&&(h.style.display="none",b.blur())})),Cn()}function vt(i){C.popupOpen=!0,C.popupPage=i,A()}function _n(){const i=document.getElementById("popupContent");i&&(C.popupPage==="chat"?Wt(i,bt):C.popupPage==="social"&&Xt(i,bt))}const Ln={combat:he,education:pt,stats:$e,skills:pt,inventory:Ge,travel:Ut,alchemy:Ze,quests:Jt,admin:tn,social:Xt,chat:Wt,market:en,realm:nn,events:an,dungeon:Gt,housing:gn,wiki:hn,npcshop:un,guild:vn,library:mt,profile:bn,arena:xn,auction:Yt,dailyquest:Qt,worldboss:fn,gacha:$n,leaderboard:Tn,tiencanh:Vt,glitch:(i,t)=>{localStorage.setItem("skillsTab","glitch"),pt(i,t)}};function Pn(){const i=document.getElementById("pageContent");if(!i)return;const t=Ln[C.currentPage];t&&t(i,bt)}function En(){var p,v,l,u,x,g,b;const i=C.player;if(!i)return;const t=((p=i.stats)==null?void 0:p.maxHp)??i.maxHp??100,e=Math.min(t,i.currentHp),a=t>0?Math.min(100,Math.max(0,e/t*100)):0,n=((v=i.stats)==null?void 0:v.maxEnergy)??i.maxEnergy??50,s=i.usableEnergy??Math.max(0,n-(i.reservedEnergy??0)),o=i.reservationPct??0,r=s>0?Math.min(100,Math.max(0,i.currentEnergy/s*100)):0,d=document.querySelector(".sidebar-player");if(d){const h=i.maxStamina>0?Math.max(0,i.currentStamina/i.maxStamina*100):0,y=i.xpToNext&&i.xpToNext>0?Math.min(100,Math.max(0,(i.xp||0)/i.xpToNext*100)):0;d.innerHTML=`
      <div class="player-name">${i.name}</div>
      ${i.activeTitle?`<div style="font-size:9.5px;color:var(--gold);font-weight:600;letter-spacing:0.5px;margin-top:1px">『${i.activeTitle}』</div>`:""}
      <div class="player-meta">Lv.${i.level} · ${((l=i.realmInfo)==null?void 0:l.fullName)||"?"}</div>
      ${ee(i)}
      ${ae(i)}
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>Khí Huyết</span>
          <span>
            ${e}/${t}
            ${e<t?`<span style="font-size:9px; color:var(--text-dim); margin-left:3px;">${(u=i.activeAuras)!=null&&u.includes("toa_thien")||(x=i.skills)!=null&&x.some(f=>f.id==="toa_thien")?"+1%/10s":"+0.5%/10s"}</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${a}%" data-low="${a<30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:2px">
        <div class="bar-label">
          <span>Thể Lực</span>
          <span>
            ${i.currentStamina??100}/${i.maxStamina??100}
            ${(i.currentStamina??100)<(i.maxStamina??100)?`<span style="font-size:9px; color:var(--text-dim); margin-left:3px;">+${((g=i.stats)==null?void 0:g.staminaRegen)??2}/10s</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${h}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:2px">
        <div class="bar-label">
          <span>Linh Lực</span>
          <span>
            ${i.currentEnergy}/${s}
            ${o>0?`<span style="font-size:9px; color:#f59e0b; margin-left:3px;" title="Khóa ${o}% bởi Tâm Pháp Hào Quang">(Khóa ${o}%)</span>`:""}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${r}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:2px">
        <div class="bar-label">
          <span>Tu Vi (Lv.${i.level})</span>
          <span>${(i.xp??0).toLocaleString()}/${(i.xpToNext??100).toLocaleString()} <span style="font-size:9px; color:var(--text-dim); margin-left:2px;">(${y.toFixed(1)}%)</span></span>
        </div>
        <div class="bar-track"><div class="bar-fill xp" style="width:${y}%"></div></div>
      </div>
      ${ne(i)}`}const c=document.querySelector('.nav-item[data-page="stats"]');if(c){let h="";i.statPoints>0&&(h+=`<span class="badge">${i.statPoints}</span>`),(b=i.realmInfo)!=null&&b.canBreakthrough&&(h+='<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>'),c.querySelectorAll(".badge").forEach(y=>y.remove()),c.insertAdjacentHTML("beforeend",h)}}async function rt(){try{const[i,t,e,a,n]=await Promise.all([R.getMonsters(),R.getSkills(),R.getItems(),R.getMedicines(),R.getEducation()]);C.monsters=i.monsters||[],C.skills=t.skills||[],C.items=e.items||[],C.medicines=a.medicines||[],C.educationTrees=n.trees||[],C.exploration=await R.getExploration(),C.recipes=(await R.getRecipes()).recipes,C.npcs=(await R.getNpcs()).npcs||[]}catch(i){console.error("Lỗi tải dữ liệu:",i)}}function B(i,t="info"){var a;(a=document.querySelector(".notification"))==null||a.remove();const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=i,document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>e.remove(),300)},3e3)}function ie(){confirm("Đạo hữu có chắc chắn muốn đăng xuất tài khoản?")&&(Z&&clearInterval(Z),localStorage.removeItem("playerId"),localStorage.setItem("isLoggedOut","true"),C.playerId=null,C.player=null,C.popupOpen=!1,B("Đã đăng xuất tài khoản thành công.","info"),xt())}function zn(i){var r,d,c,p,v,l;let t=document.getElementById("settings-modal-overlay");t&&t.remove(),t=document.createElement("div"),t.id="settings-modal-overlay",t.style.cssText=`
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    padding: 16px; animation: fadeIn 0.2s ease;
  `;const e=localStorage.getItem("rpg_sound_enabled")!=="false",a=localStorage.getItem("rpg_shake_enabled")!=="false",n=localStorage.getItem("rpg_toast_enabled")!=="false";t.innerHTML=`
    <div style="background: #111422; border: 1px solid var(--border); border-radius: 8px; max-width: 480px; width: 100%; box-shadow: 0 8px 30px rgba(0,0,0,0.7); color: #fff; overflow: hidden; animation: scaleUp 0.2s ease;">
      <!-- Header -->
      <div style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02);">
        <div style="font-weight: 700; font-size: 15px; color: var(--gold); display: flex; align-items: center; gap: 8px;">
          <span>⚙️</span> Cài Đặt Hệ Thống
        </div>
        <button id="btnCloseSettingsModal" style="background: none; border: none; color: var(--text-dim); font-size: 18px; cursor: pointer; padding: 2px 6px;">✕</button>
      </div>

      <!-- Body -->
      <div style="padding: 18px; display: flex; flex-direction: column; gap: 16px; font-size: 13px;">
        <!-- Account Info Box -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px 14px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">👤 Thông Tin Đạo Hữu</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
            <div><span style="color: var(--text-dim);">Đạo danh:</span> <strong>${i.name||"Vô Danh"}</strong></div>
            <div><span style="color: var(--text-dim);">Cấp độ:</span> <strong style="color: var(--blue);">Lv.${i.level||1}</strong></div>
            <div><span style="color: var(--text-dim);">Cảnh giới:</span> <strong style="color: var(--gold);">${((r=i.realmInfo)==null?void 0:r.fullName)||"Phàm Nhân"}</strong></div>
            <div><span style="color: var(--text-dim);">Vai trò:</span> <span>${i.role==="admin"?"👑 Thiên Đạo":"Tu Sĩ"}</span></div>
            <div><span style="color: var(--text-dim);">ID Tài khoản:</span> <span style="font-family: monospace; color: var(--text-dim);">#${i.id||1}</span></div>
            <div><span style="color: var(--text-dim);">Linh Thạch:</span> <span style="color: var(--gold);">💎 ${(i.gold||0).toLocaleString()}</span></div>
          </div>
        </div>

        <!-- System Preferences -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px 14px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">🎮 Tùy Chọn Trải Nghiệm</div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none;">
              <span>🔊 Hiệu ứng âm thanh & BGM</span>
              <input type="checkbox" id="chkSettingSound" ${e?"checked":""} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--gold);" />
            </label>
            <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none;">
              <span>⚡ Rung màn hình khi chấn động & Lôi Kiếp</span>
              <input type="checkbox" id="chkSettingShake" ${a?"checked":""} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--gold);" />
            </label>
            <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none;">
              <span>🔔 Bật thông báo nổi (Toasts)</span>
              <input type="checkbox" id="chkSettingToast" ${n?"checked":""} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--gold);" />
            </label>
          </div>
        </div>

        <!-- Danger Zone / Logout -->
        <div style="background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 12px 14px; display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--red); text-transform: uppercase; letter-spacing: 0.5px;">🚪 Phiên Đăng Nhập</div>
          <div style="font-size: 12px; color: var(--text-dim);">
            Đăng xuất sẽ kết thúc phiên tu luyện hiện tại trên trình duyệt này và quay về cổng kết giới đăng nhập.
          </div>
          <button class="btn btn--red" id="btnModalLogout" style="margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px; font-weight: 700;">
            🚪 Đăng Xuất Tài Khoản
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(t);const s=()=>t.remove();(d=t.querySelector("#btnCloseSettingsModal"))==null||d.addEventListener("click",s),t.addEventListener("click",u=>{u.target===t&&s()});const o=u=>{u.key==="Escape"&&(s(),window.removeEventListener("keydown",o))};window.addEventListener("keydown",o),(c=t.querySelector("#chkSettingSound"))==null||c.addEventListener("change",u=>{localStorage.setItem("rpg_sound_enabled",u.target.checked),B(u.target.checked?"Đã bật hiệu ứng âm thanh":"Đã tắt hiệu ứng âm thanh","info")}),(p=t.querySelector("#chkSettingShake"))==null||p.addEventListener("change",u=>{localStorage.setItem("rpg_shake_enabled",u.target.checked),B(u.target.checked?"Đã bật rung màn hình":"Đã tắt rung màn hình","info")}),(v=t.querySelector("#chkSettingToast"))==null||v.addEventListener("change",u=>{localStorage.setItem("rpg_toast_enabled",u.target.checked)}),(l=t.querySelector("#btnModalLogout"))==null||l.addEventListener("click",()=>{s(),ie()})}kn();
//# sourceMappingURL=index-CCcPB-_n.js.map
