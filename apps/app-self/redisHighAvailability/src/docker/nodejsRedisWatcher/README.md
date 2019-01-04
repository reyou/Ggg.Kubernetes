* Title:	How to Dockerize a Node.js application - Buddy
  * Url:	https://buddy.works/guides/how-dockerize-node-application

* Title:	distributions/README.md at master · nodesource/distributions
  * Url:	https://github.com/nodesource/distributions/blob/master/README.md

Run the app
The application is ready to launch:

```
$ node index.js
```

http://localhost:8081

```
$ cd /home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/nodejsRedisWatcher/
$ docker build -t aozdemir/redishanodejsrediswatcher:v1 .
$ docker login
$ docker push aozdemir/redishanodejsrediswatcher:v1
```