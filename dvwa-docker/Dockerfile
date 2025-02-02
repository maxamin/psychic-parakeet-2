FROM ubuntu:20.04

LABEL maintainer="chanaso"

ENV DEBIAN_FRONTEND=noninteractive

# Install Depedensi
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    apache2 \
    mariadb-server \
    php \
    php-mysqli \
    php-gd \
    libapache2-mod-php \
    git && \
    rm /var/www/html/index.html

# MariaDB root pasword 
RUN echo mariadb-server mysql-server/root_password password vulnerables | debconf-set-selections && \
    echo mariadb-server mysql-server/root_password_again password vulnerables | debconf-set-selections 

# Copy required files 
RUN git clone https://github.com/digininja/DVWA /var/www/html/
# COPY DVWA /var/www/html/
COPY config.inc.php /var/www/html/config/
COPY .env /var/www/html/config/
COPY php.ini /etc/php/7.4/apache2/php.ini
COPY php.ini /etc/php/7.4/cli/php.ini

# Change Owner Folder
RUN chown www-data:www-data -R /var/www/html

# Remove Unused Files
RUN apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Start Service and create user for mysql
RUN service mysql start && \
    sleep 1 && \
    mysql -uroot -pvulnerables -e "create database dvwa; create user dvwa@localhost identified by 'p@ssw0rd'; grant all on dvwa.* to dvwa@localhost; flush privileges;"

# Expose Port
EXPOSE 80

# Copy starting service file
COPY start.sh /
RUN chmod +x /start.sh

ENTRYPOINT [ "/start.sh" ]