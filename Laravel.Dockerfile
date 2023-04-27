FROM php:8.0-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    libpq-dev \
    zip \
    unzip \
    curl

# Configurar extensões PHP e instalar composer
RUN docker-php-ext-install pdo_pgsql mbstring zip exif pcntl bcmath gd
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar Node.js e NPM
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Copiar aplicação Laravel
COPY . /var/www
RUN chown -R www-data:www-data /var/www

# Configurar diretório de trabalho
WORKDIR /var/www

# Instalar dependências da aplicação
RUN composer install
RUN npm install

CMD ["php-fpm"]

EXPOSE 3000 8000 9000