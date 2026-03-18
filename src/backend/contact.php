<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Nur POST-Anfragen sind erlaubt.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$config = require __DIR__ . '/contact-config.php';

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput ?: '', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Ungültige Anfrage.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$subject = trim((string)($data['subject'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$website = trim((string)($data['website'] ?? ''));

if ($website !== '') {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

if (
    $name === '' ||
    $subject === '' ||
    $message === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Bitte füllen Sie alle Pflichtfelder korrekt aus.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (
    empty($config['smtp_password']) ||
    $config['smtp_password'] === 'BITTE-HIER-IHR-SMTP-PASSWORT-EINTRAGEN'
) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'SMTP ist noch nicht konfiguriert.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safePhone = htmlspecialchars($phone !== '' ? $phone : 'Nicht angegeben', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeSubject = htmlspecialchars($subject, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = (string)$config['smtp_host'];
    $mail->Port = (int)$config['smtp_port'];
    $mail->SMTPAuth = true;
    $mail->Username = (string)$config['smtp_username'];
    $mail->Password = (string)$config['smtp_password'];

    if (($config['smtp_secure'] ?? 'tls') === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mail->setFrom((string)$config['from_email'], (string)$config['from_name']);
    $mail->addAddress((string)$config['to_email'], (string)$config['to_name']);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'Kontaktformular: ' . $subject;
    $mail->Body = <<<HTML
<h2>Neue Nachricht über das Kontaktformular</h2>
<p><strong>Name:</strong> {$safeName}</p>
<p><strong>E-Mail:</strong> {$safeEmail}</p>
<p><strong>Telefon:</strong> {$safePhone}</p>
<p><strong>Betreff:</strong> {$safeSubject}</p>
<p><strong>Nachricht:</strong><br>{$safeMessage}</p>
HTML;

    $mail->AltBody = "Neue Nachricht über das Kontaktformular\n\n"
        . "Name: {$name}\n"
        . "E-Mail: {$email}\n"
        . "Telefon: " . ($phone !== '' ? $phone : 'Nicht angegeben') . "\n"
        . "Betreff: {$subject}\n\n"
        . "Nachricht:\n{$message}\n";

    $mail->send();

    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} catch (Exception $exception) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Die Nachricht konnte nicht gesendet werden.',
        'error' => $exception->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
