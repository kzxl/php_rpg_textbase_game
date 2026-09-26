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
};
