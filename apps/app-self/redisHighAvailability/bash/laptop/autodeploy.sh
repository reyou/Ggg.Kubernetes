#!/bin/bash

# bash /home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/bash/laptop/autodeploy.sh

# docker redis
cd /home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/docker/redis/ 
# docker login
docker build -t aozdemir/redisharedis .
docker push aozdemir/redisharedis

# kubernetes redis deploy
cd /home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/kubernetes/redis/
microk8s.kubectl delete -f deployment.yaml
microk8s.kubectl apply -f deployment.yaml