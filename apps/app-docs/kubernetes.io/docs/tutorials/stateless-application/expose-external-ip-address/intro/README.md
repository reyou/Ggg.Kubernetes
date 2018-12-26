* Title:	Exposing an External IP Address to Access an Application in a Cluster - Kubernetes
  * Url:	https://kubernetes.io/docs/tutorials/stateless-application/expose-external-ip-address/

Run five instances of a Hello World application.
Create a Service object that exposes an external IP address.
Use the Service object to access the running application.

```
$ microk8s.kubectl get all
```

### Creating a service for an application running in five pods
Run a Hello World application in your cluster:

```
$ microk8s.kubectl run hello-world \
--replicas=5 \
--labels="run=load-balancer-example" \
--image=gcr.io/google-samples/node-hello:1.0  \
--port=8080
```

The preceding command creates a Deployment object and an associated ReplicaSet object. 
The ReplicaSet has five Pods, each of which runs the Hello World application.

Display information about the Deployment:

```
$ microk8s.kubectl get deployments hello-world
$ microk8s.kubectl describe deployments hello-world
```

```
$ microk8s.kubectl get all
```

```
$ microk8s.kubectl get deployment hello-world -o yaml --export
```

Display information about your ReplicaSet objects:

```
$ microk8s.kubectl get replicasets
$ microk8s.kubectl describe replicasets
```

Create a Service object that exposes the deployment:

```
$ microk8s.kubectl expose deployment hello-world --type=LoadBalancer --name=my-service
$ microk8s.kubectl get all
$ microk8s.kubectl get services my-service

NAME         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
my-service   LoadBalancer   10.152.183.187   <pending>     8080:30055/TCP   59s
```

Url: http://10.152.183.187:8080  

Display detailed information about the Service:

```
$ microk8s.kubectl describe services my-service
```

To verify these are pod addresses, enter this command:

```
$ microk8s.kubectl get pods --output=wide

NAME                           READY   STATUS    RESTARTS   AGE   IP          NODE                 NOMINATED NODE   READINESS GATES
hello-world-696b6b59bd-2gz79   1/1     Running   0          19m   10.1.1.15   aozdemir-linuxlite   <none>           <none>
hello-world-696b6b59bd-2wzfl   1/1     Running   0          19m   10.1.1.12   aozdemir-linuxlite   <none>           <none>
hello-world-696b6b59bd-jnmqg   1/1     Running   0          19m   10.1.1.13   aozdemir-linuxlite   <none>           <none>
hello-world-696b6b59bd-kgcdx   1/1     Running   0          19m   10.1.1.14   aozdemir-linuxlite   <none>           <none>
hello-world-696b6b59bd-nsxcs   1/1     Running   0          19m   10.1.1.11   aozdemir-linuxlite   <none>           <none>
redis                          1/1     Running   0          30m   10.1.1.10   aozdemir-linuxlite   <none>           <none>
```

Use the external IP address (LoadBalancer Ingress) to access the Hello World application:

```
$ curl http://<external-ip>:<port>
$ curl http://10.152.183.187:8080
```

### Cleaning up

To delete the Service, enter this command:

```
$ microk8s.kubectl delete services my-service
```

To delete the Deployment, the ReplicaSet, and the Pods that are running the Hello World application, enter this command:

```
$ microk8s.kubectl get all
$ microk8s.kubectl delete deployment hello-world
```
