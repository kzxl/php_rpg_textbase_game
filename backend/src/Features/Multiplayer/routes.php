<?php

declare(strict_types=1);

/**
 * Multiplayer Feature Routes — Persistent Player States, Escrow, Healing & Bail.
 */

use App\Controllers\MultiplayerController;
use Slim\App;

return function (App $app) {
    // 1. Get player's persistent multiplayer FSM state & vitals
    $app->get('/api/player/{id}/multiplayer-state', [MultiplayerController::class, 'getState']);

    // 2. Claim pending funds from Merchant Escrow Mailbox (with 90s Divine Ward)
    $app->post('/api/player/{id}/claim-escrow', [MultiplayerController::class, 'claimEscrow']);

    // 3. Heal hospital trauma using medicinal pill
    $app->post('/api/player/{id}/heal', [MultiplayerController::class, 'heal']);

    // 4. Pay bail to exit disciplinary jail immediately
    $app->post('/api/player/{id}/bail', [MultiplayerController::class, 'bail']);

    // 5. Phase 1: Initiate PvP Combat Duel (Stateful Mutex FSM)
    $app->post('/api/player/{id}/pvp/attack', [MultiplayerController::class, 'attack']);

    // 6. Phase 2: Resolve Post-Combat Action (Chỉ Điểm, Trọng Thương, Đoạt Bảo)
    $app->post('/api/player/{id}/pvp/action', [MultiplayerController::class, 'resolveAction']);

    // 7. Inspect PvP Combat Session & Turn Logs
    $app->get('/api/pvp/session/{sessionId}', [MultiplayerController::class, 'getSession']);

    // ==========================================
    // SPRINT 3: BAZAAR (PHƯỜNG THỊ) ROUTES
    // ==========================================
    $app->get('/api/bazaar', [MultiplayerController::class, 'bazaarBrowse']);
    $app->get('/api/player/{id}/bazaar/my-listings', [MultiplayerController::class, 'bazaarMyListings']);
    $app->post('/api/player/{id}/bazaar/list', [MultiplayerController::class, 'bazaarList']);
    $app->post('/api/player/{id}/bazaar/buy', [MultiplayerController::class, 'bazaarBuy']);
    $app->post('/api/player/{id}/bazaar/cancel', [MultiplayerController::class, 'bazaarCancel']);

    // ==========================================
    // SPRINT 3: P2P TWO-PHASE COMMIT TRADE ROUTES
    // ==========================================
    $app->post('/api/player/{id}/trade/create', [MultiplayerController::class, 'tradeCreate']);
    $app->post('/api/player/{id}/trade/{tradeId}/update', [MultiplayerController::class, 'tradeUpdate']);
    $app->post('/api/player/{id}/trade/{tradeId}/lock', [MultiplayerController::class, 'tradeLock']);
    $app->post('/api/player/{id}/trade/{tradeId}/confirm', [MultiplayerController::class, 'tradeConfirm']);
    $app->post('/api/player/{id}/trade/{tradeId}/cancel', [MultiplayerController::class, 'tradeCancel']);
    $app->get('/api/trade/{tradeId}', [MultiplayerController::class, 'tradeGet']);

    // ==========================================
    // SPRINT 4: TÔNG MÔN (FACTIONS) & RBAC ROUTES
    // ==========================================
    $app->get('/api/factions', [MultiplayerController::class, 'factionList']);
    $app->get('/api/factions/{factionId}', [MultiplayerController::class, 'factionGet']);
    $app->post('/api/player/{id}/factions/create', [MultiplayerController::class, 'factionCreate']);
    $app->post('/api/player/{id}/factions/{factionId}/join', [MultiplayerController::class, 'factionJoin']);
    $app->post('/api/player/{id}/factions/leave', [MultiplayerController::class, 'factionLeave']);
    $app->post('/api/player/{id}/factions/kick', [MultiplayerController::class, 'factionKick']);
    $app->post('/api/player/{id}/factions/set-role', [MultiplayerController::class, 'factionSetRole']);
    $app->post('/api/player/{id}/factions/deposit', [MultiplayerController::class, 'factionDeposit']);
    $app->post('/api/player/{id}/factions/propose-withdraw', [MultiplayerController::class, 'factionProposalCreate']);
    $app->post('/api/player/{id}/factions/proposals/{proposalId}/approve', [MultiplayerController::class, 'factionProposalApprove']);
    $app->get('/api/factions/{factionId}/chain', [MultiplayerController::class, 'factionChainGet']);

    // ==========================================
    // SPRINT 4: TERRITORY WARFARE (LINH MẠCH)
    // ==========================================
    $app->get('/api/territories', [MultiplayerController::class, 'territoryList']);
    $app->post('/api/player/{id}/territories/{territoryId}/declare-war', [MultiplayerController::class, 'territoryDeclareWar']);
    $app->post('/api/player/{id}/territories/{territoryId}/attack', [MultiplayerController::class, 'territoryAttack']);
    $app->post('/api/player/{id}/factions/harvest-territories', [MultiplayerController::class, 'territoryHarvest']);
};


