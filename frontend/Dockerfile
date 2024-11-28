# Imagem
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do backend
EXPOSE 80

# Comando para iniciar o servidor
CMD ["npm", "run", "dev", "--", "--host"]
