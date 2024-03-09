FROM node:16

# Criar diretório da aplicação
WORKDIR /var/www

# Copiar package.json e package-lock.json
COPY package*.json .

# Instalar dependências
RUN npm install

# Copiar arquivos da aplicação
COPY . .

# Iniciar aplicação
CMD ["npm", "run", "hot"]

EXPOSE 3000
