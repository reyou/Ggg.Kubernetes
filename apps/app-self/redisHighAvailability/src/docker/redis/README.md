* Title:	redis - Docker Hub
  * Url:	https://hub.docker.com/_/redis/
 
* Title:	download.redis.io/redis-stable/redis.conf
  * Url:	http://download.redis.io/redis-stable/redis.conf

* Title:	aozdemir's Profile - Docker Hub
  * Url:	https://hub.docker.com/u/aozdemir  

###  Deploy Image
```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/redis/
$ sudo docker login
$ sudo docker build -t aozdemir/redisharedis:v1 .
$ sudo docker push aozdemir/redisharedis:v1
```