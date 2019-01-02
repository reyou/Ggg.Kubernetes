FROM redis
COPY ["startup.sh","/home"] 
COPY ["redis.conf", "sentinel.conf", "/usr/local/etc/redis/"]
RUN ["chmod", "+x", "/home/startup.sh"]
CMD ["/home/startup.sh"]
