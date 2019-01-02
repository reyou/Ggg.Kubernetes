* Title:	tarosky/k8s-redis-ha: Kubernetes Redis with High Availability
  * Url:	https://github.com/tarosky/k8s-redis-ha


### Quick Start
If you already have a Kubernetes cluster, you can deploy High Availability Redis using the following command:

```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-web/github.com/tarosky/k8s-redis-ha/
$ cd /home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-web/github.com/tarosky/k8s-redis-ha/ 
$ microk8s.kubectl delete -f example/
$ microk8s.kubectl create -f example/

$ microk8s.kubectl apply -f example/server-service.yaml
$ microk8s.kubectl delete -f example/server.yaml
$ microk8s.kubectl apply -f example/server.yaml

```

### Connect/Debug to Pod
```
$ microk8s.kubectl logs redis-server-0 --all-containers=true
$ microk8s.kubectl describe pod redis-server-0

# Redis Server 1
$ microk8s.kubectl exec -ti redis-server-0 bash 

# Redis Server 2
$ microk8s.kubectl exec -ti redis-server-1 bash 

$ redis-cli -a _redis-server._tcp.redis-server.default.svc.cluster.local
$ info replication
$ info server
```

```
$ redis-cli -h 192.168.1.129
```

### Accessing Redis
You can access Redis server using console pod:

```
$ microk8s.kubectl exec -ti console -- /bin/bash
```

### Scale Up and Down

```
$ microk8s.kubectl scale --replicas=5 statefulset/redis-sentinel
statefulset "redis-sentinel" scaled
$ microk8s.kubectl scale --replicas=5 statefulset/redis-server
statefulset "redis-server" scaled
```