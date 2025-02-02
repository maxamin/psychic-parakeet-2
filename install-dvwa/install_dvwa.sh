#!/bin/bash

# Created on Sep 29, 2014
# Author: Hojung Yun
# Email: hojung_yun@yahoo.co.kr

# This script will install the followings:
# Apache Webserver
# Mysql Server
# PHP
# Damn Vulnerable Web App (DVWA)

IP_ADDR=$(/sbin/ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}')

echo "Disabling SELinux"
echo 0 > /selinux/enforce
sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config

echo "Disabling Firewall"
service iptables stop
chkconfig iptables off

echo "Installing Apache httpd Server"
yum -y install httpd
service httpd start
chkconfig httpd on

echo "Installing mysql and mysql-server"
yum -y install mysql mysql-server
service mysqld start
mysqladmin -u root password dvwaPASSWORD
echo "create database dvwa" | mysql -u root -pdvwaPASSWORD

echo "Installing PHP"
yum -y install php php-mysql php-pear php-pear-DB

echo "Installing wget, netcat and unzip"
yum -y install wget nc unzip

echo "Installing Damn Vulnerable Web App (DVWA)"
cd /var/www/html
wget http://www.computersecuritystudent.com/SECURITY_TOOLS/DVWA/DVWAv107/lesson1/DVWA-1.0.7.zip
unzip DVWA-1.0.7.zip
rm -f DVWA-1.0.7.zip
cd /var/www/html/dvwa/config
cp config.inc.php config.inc.php.BKP
chmod 000 config.inc.php.BKP
sed -i "s/''/'dvwaPASSWORD'/" config.inc.php
service httpd restart

echo "Installation is done"
echo "Open your web browser and go to http://$IP_ADDR/dvwa/setup.php to continue to configure"
echo "1. Click on Create / Reset Database"
echo "2. Login to DVWA with the user credentials below"
echo "Username: admin"
echo "Password: password"
echo 
echo "For more info:"
echo "http://www.computersecuritystudent.com/SECURITY_TOOLS/DVWA/DVWAv107/lesson1/index.html"

