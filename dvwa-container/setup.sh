#!/bin/bash
apt -y update && apt -y dist-upgrade && apt -y install git libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev 
cd /tmp
git clone https://github.com/digininja/DVWA.git /var/www/html

## Yeeeey Duffie couldn't be more proud!
chmod -R 777 /var/www/html/config /var/www/html/hackable/uploads/ /var/www/html/external/

