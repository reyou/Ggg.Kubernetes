- Title: nginx | Docker Documentation
  - Url: https://docs.docker.com/samples/library/nginx/#hosting-some-simple-static-content

* Title:	aozdemir's Profile - Docker Hub
  * Url:	https://hub.docker.com/u/aozdemir


```
$ docker run --name some-nginx -d some-content-nginx
$ docker run --name some-nginx -d some-content-nginx
```

###  Deploy Image
```
$ sudo docker login
$ sudo docker build -t aozdemir/redishanginx:v1 .
$ sudo docker push aozdemir/redishanginx:v1
```
