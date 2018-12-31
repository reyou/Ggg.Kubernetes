* Title:	| Docker Documentation
  * Url:	https://docs.docker.com/engine/reference/builder/#add

* Title:	| Docker Documentation
  * Url:	https://docs.docker.com/engine/reference/builder/#copy

* Title:	| Docker Documentation
  * Url:	https://docs.docker.com/engine/reference/builder/#cmd


* Title:	dig-a/diga.go at master · tarosky/dig-a
  * Url:	https://github.com/tarosky/dig-a/blob/master/diga.go

* Title:	dig-srv/digsrv.go at master · tarosky/dig-srv
  * Url:	https://github.com/tarosky/dig-srv/blob/master/digsrv.go

* Title:	aozdemir's Profile - Docker Hub
  * Url:	https://hub.docker.com/u/aozdemir 

* Title:	Connection Refused error when connecting to Kubernetes Redis Service - Stack Overflow
  * Url:	https://stackoverflow.com/questions/48597726/connection-refused-error-when-connecting-to-kubernetes-redis-service/


###  Deploy Image
```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-web/github.com/tarosky/k8s-redis-ha/images/server/
$ sudo docker login
$ sudo docker build -t aozdemir/k8s-redis-ha-server:v4 .
$ sudo docker push aozdemir/k8s-redis-ha-server:v4
```