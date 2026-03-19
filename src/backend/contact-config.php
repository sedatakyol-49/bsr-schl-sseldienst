<?php

$config = [
    'smtp_host' => 'smtp.ionos.de',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_username' => 'Info@bsr-schluesseldienst.de',
    'smtp_password' => '',
    'from_email' => 'Info@bsr-schluesseldienst.de',
    'from_name' => 'BSR Schluesseldienst Website',
    'to_email' => 'Info@bsr-schluesseldienst.de',
    'to_name' => 'BSR Schluesseldienst',
];

$secretsFile = __DIR__ . '/contact-secrets.php';

if (is_file($secretsFile)) {
    $secrets = require $secretsFile;

    if (is_array($secrets)) {
        $config = array_merge($config, $secrets);
    }
}

return $config;
