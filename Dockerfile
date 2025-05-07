# Dockerfile
FROM nginx:alpine

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia tudo do repo para a pasta pública
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80
