* Title:	redis - Docker Hub
  * Url:	https://hub.docker.com/_/redis/
 
* Title:	download.redis.io/redis-stable/redis.conf
  * Url:	http://download.redis.io/redis-stable/redis.conf

* Title:	aozdemir's Profile - Docker Hub
  * Url:	https://hub.docker.com/u/aozdemir  

* Title:	How To Install and Secure Redis on Ubuntu 18.04 | DigitalOcean
  * Url:	https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04


###  Deploy Image
```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/redis/
$ cd /home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/redis/ 
$ sudo docker login
$ sudo docker build -t aozdemir/redisharedis:v6 .
$ sudo docker push aozdemir/redisharedis:v6
```

### endpoints
```
$ microk8s.kubectl proxy
```
http://127.0.0.1:8001/api/v1/namespaces/default/endpoints
https://10.152.183.1/api/v1/namespaces/default/endpoints

### Sentinel
Sentinels by default run listening for connections to TCP port 26379, 
so for Sentinels to work, port 26379 of your servers must be open 
to receive connections from the IP addresses of the other Sentinel instances. 
Otherwise Sentinels can't talk and can't agree about what to do, 
so failover will never be performed.

```
$ redis-sentinel /path/to/sentinel.conf
```