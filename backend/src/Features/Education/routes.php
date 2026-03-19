<?php

/**
 * Education Feature — Tu Luyện (courses).
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;

return function ($app) {
    $app->post('/api/player/{id}/enroll', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $completed = $player->checkEducation();

        $body = $request->getParsedBody();
        $courseId = $body['courseId'] ?? '';

        $coursesFile = __DIR__ . '/../../../data/education.json';
        $courses = json_decode(file_get_contents($coursesFile), true);
        $course = null;
        foreach ($courses as $c) {
            if ($c['id'] === $courseId) { $course = $c; break; }
        }
        if (!$course) return jsonResponse($response, ['error' => 'Course not found'], 404);

        $error = $player->enrollCourse($course);
        if ($error) return jsonResponse($response, ['error' => $error], 400);

        savePlayer($id, $player);
        return jsonResponse($response, [
            'message' => "Bắt đầu học: {$course['name']} ({$course['duration']}s)",
            'player' => $player->toArray(),
        ]);
    });

    $app->post('/api/player/{id}/check-education', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $completed = $player->checkEducation();
        savePlayer($id, $player);

        return jsonResponse($response, [
            'completed' => $completed,
            'message' => $completed ? "Hoàn thành: {$completed}!" : 'Chưa hoàn thành.',
            'player' => $player->toArray(),
        ]);
    });

    $app->get('/api/data/education', function (Request $request, Response $response) {
        $file = __DIR__ . '/../../../data/education.json';
        $courses = json_decode(file_get_contents($file), true);
        return jsonResponse($response, ['courses' => $courses]);
    });
};
