echo '#############################'
echo '#        04/19/2022         #'
echo '#        WRITTEN BY         #'
echo '#       ZOE CHEUVRONT       #'
echo '#                           #'
echo '#############################'

echo 'starting services...'
service mysql start
service apache2 start
sleep 1s
echo -e 'DONE\n\n'

apt-get -qq -y install php7.3
echo 'Removing garabage...'
mysql -Bse "drop database dvwa;" > /dev/null 2>&1
rm -r /var/www/html/DVWA > /dev/null 2>&1
cat > /etc/php/7.3/apache2/php.ini << rekt
roflmao
rekt
sleep 1s


echo -e  '\n\ntime to get to work...'
cd /var/www/html
git clone https://github.com/ethicalhack3r/DVWA &> /dev/null
cd ..
chmod -R 777 html
cd /var/www/html/DVWA/config
wget -q https://www.dropbox.com/s/8n3g0hp4e6u7c61/config.inc.php

rm /etc/php/7.3/apache2/php.ini > /dev/null 2>&1
cd /etc/php/7.3/apache2
wget -q https://www.dropbox.com/s/j5hqii05nhjq1sq/php.ini

mysql -Bse "create database dvwa;grant all on dvwa.* to dvwa@localhost identified by 'xxx';" > /dev/null 2>&1
echo -e '\n\nDone! Enjoy'
sleep 1s
firefox localhost/DVWA/setup.php