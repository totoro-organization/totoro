FROM php:7.4-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql json \
    && a2enmod rewrite

