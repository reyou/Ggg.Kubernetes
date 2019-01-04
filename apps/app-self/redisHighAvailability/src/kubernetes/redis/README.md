* Title:	Kubernetes Deployment Builder
  * Url:	https://static.brandonpotter.com/kubernetes/DeploymentBuilder.html

* Title:	Assign CPU Resources to Containers and Pods - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/

* Title:	Assign Memory Resources to Containers and Pods - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/

### Deploy
```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/kubernetes/redis/
$ cd /home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/kubernetes/redis/
# update deployment
$ microk8s.kubectl delete -f deployment.yaml
$ microk8s.kubectl apply -f deployment.yaml
```

### Redis Debug
```
$ microk8s.kubectl exec -ti $POD_NAME bash

# pod 1
$ microk8s.kubectl exec -ti redisharedis-5d67c95db9-kd2s8 bash 
# pod 2
$ microk8s.kubectl exec -ti redisharedis-5d67c95db9-mdb7k bash 
# pod 3
$ microk8s.kubectl exec -ti redisharedis-5d67c95db9-kd2s8 bash 

$ redis-cli
$ info replication

$ set test qqq
$ get test
```

https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/ 

The domain managed by this Service takes the form: $(service name).$(namespace).svc.cluster.local, 
where “cluster.local” is the cluster domain. 
As each Pod is created, it gets a matching DNS subdomain, 
taking the form: $(podname).$(governing service domain)

curl redisharedis-service.default.svc.cluster.local

https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/

cluster domain: cluster.local	
service: nginx	
statefulset: web	
statefulset domain: nginx.default.svc.cluster.local	
pod: web-{0..N-1}.nginx.default.svc.cluster.local	web-{0..N-1}

 