IONOS PHP mail setup

1. Upload the generated site contents to your IONOS webspace.
2. Create a file named contact-secrets.php next to contact-config.php and contact.php on the server.
3. Use this content in contact-secrets.php:
   <?php
   return [
       'smtp_password' => 'REAL_SMTP_PASSWORD',
       'smtp_debug' => false
   ];
4. Keep contact.php, contact-config.php, contact-secrets.php and the phpmailer folder in the same web root.
5. Do not commit contact-secrets.php to Git.
6. Test the contact form on https://bsr-schluesseldienst.de/kontakt

Recommended SMTP defaults for IONOS:
- Host: smtp.ionos.de
- Port: 587
- Security: tls
- Username: Info@bsr-schluesseldienst.de

If SMTP login still fails:
- Temporarily set 'smtp_debug' => true in contact-secrets.php
- Submit the contact form once
- Check the server PHP error log for lines starting with [contact.php][SMTP]
- Set 'smtp_debug' back to false after testing
