* Title:	Kubernetes Deployment Builder
  * Url:	https://static.brandonpotter.com/kubernetes/DeploymentBuilder.html

* Title:	Assign CPU Resources to Containers and Pods - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/

* Title:	Assign Memory Resources to Containers and Pods - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/

### Nginx Deploy
```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-self/redisHighAvailability/src/kubernetes/nginx/
$ microk8s.kubectl delete -f deployment.yaml
$ microk8s.kubectl apply -f deployment.yaml
```

### Nginx Debug
```
$ microk8s.kubectl exec -ti $POD_NAME bash
$ microk8s.kubectl exec -ti redishanginx-6cddb6789c-tr8dk bash
# -T : test configuration, dump it and exit
$ nginx -T 
```
 