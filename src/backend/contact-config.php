<?php

$config = [
    'smtp_host' => 'smtp.ionos.de',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_debug' => false,
    'smtp_username' => 'info@bsr-schluesseldienst.de',
    'smtp_password' => '',
    'from_email' => 'info@bsr-schluesseldienst.de',
    'from_name' => 'BSR Schluesseldienst Website',
    'to_email' => 'info@bsr-schluesseldienst.de',
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
