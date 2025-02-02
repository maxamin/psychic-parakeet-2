FROM php:7-apache

COPY setup.sh /tmp/setup.sh
RUN /tmp/setup.sh && docker-php-ext-install mysqli pdo_mysql gd

COPY php.ini /usr/local/etc/php/php.ini
COPY config.inc.php /var/www/html/config/config.inc.php
