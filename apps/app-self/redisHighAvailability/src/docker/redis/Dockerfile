FROM redis
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq
COPY ["startup.sh","/home"] 
COPY ["redis.conf", "sentinel.conf", "/usr/local/etc/redis/"]
RUN ["chmod", "+x", "/home/startup.sh"]
# node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["/home/startup.sh"]
