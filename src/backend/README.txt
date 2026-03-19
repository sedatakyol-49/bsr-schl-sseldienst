IONOS PHP mail setup

1. Upload the generated site contents to your IONOS webspace.
2. Create a file named contact-secrets.php next to contact-config.php and contact.php on the server.
3. Use this content in contact-secrets.php:
   <?php
   return [
       'smtp_password' => 'REAL_SMTP_PASSWORD'
   ];
4. Keep contact.php, contact-config.php, contact-secrets.php and the phpmailer folder in the same web root.
5. Do not commit contact-secrets.php to Git.
6. Test the contact form on https://bsr-schluesseldienst.de/kontakt

Recommended SMTP defaults for IONOS:
- Host: smtp.ionos.de
- Port: 587
- Security: tls
- Username: Info@bsr-schluesseldienst.de
