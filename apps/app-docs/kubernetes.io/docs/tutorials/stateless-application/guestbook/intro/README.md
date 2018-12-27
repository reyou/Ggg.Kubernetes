* Title:	Example: Deploying PHP Guestbook application with Redis - Kubernetes
  * Url:	https://kubernetes.io/docs/tutorials/stateless-application/guestbook/

```
$ microk8s.kubectl get all

NAME                 TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.152.183.1   <none>        443/TCP   10s
```

### Start up the Redis Master
The guestbook application uses Redis to store its data. 
It writes its data to a Redis master instance and reads data from 
multiple Redis slave instances.

### Creating the Redis Master Deployment
The manifest file, included below, specifies a Deployment controller 
that runs a single replica Redis master Pod.

Launch a terminal window in the directory you downloaded the manifest files.
Apply the Redis Master Deployment from the redis-master-deployment.yaml file:

```
$ microk8s.kubectl apply -f https://k8s.io/examples/application/guestbook/redis-master-deployment.yaml
$ microk8s.kubectl get all

NAME                                READY   STATUS    RESTARTS   AGE
pod/redis-master-6fbbc44567-pv699   1/1     Running   0          61s

NAME                 TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.152.183.1   <none>        443/TCP   4m18s

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/redis-master   1/1     1            1           61s

NAME                                      DESIRED   CURRENT   READY   AGE
replicaset.apps/redis-master-6fbbc44567   1         1         1       61s
```

Query the list of Pods to verify that the Redis Master Pod is running:
```
$ microk8s.kubectl get pods
```

Run the following command to view the logs from the Redis Master Pod:
```
$ microk8s.kubectl logs -f redis-master-6fbbc44567-pv699
$ microk8s.kubectl logs -f kubernetes-dashboard-654cfb4879-nnhqn
```

### Creating the Redis Master Service
The guestbook applications needs to communicate to the Redis master to write its data. 
You need to apply a Service to proxy the traffic to the Redis master Pod. 
A Service defines a policy to access the Pods.

Apply the Redis Master Service from the following redis-master-service.yaml file:
```
$ microk8s.kubectl apply -f https://k8s.io/examples/application/guestbook/redis-master-service.yaml
$ microk8s.kubectl get all
$ microk8s.kubectl get service

NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
kubernetes     ClusterIP   10.152.183.1     <none>        443/TCP    10m
redis-master   ClusterIP   10.152.183.197   <none>        6379/TCP   72s
```

Note: This manifest file creates a Service named redis-master with 
a set of labels that match the labels previously defined, so the Service 
routes network traffic to the Redis master Pod.

```
$ microk8s.kubectl describe service redis-master

Name:              redis-master
Namespace:         default
Labels:            app=redis
                   role=master
                   tier=backend
Annotations:       kubectl.kubernetes.io/last-applied-configuration:
                     {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"app":"redis","role":"master","tier":"backend"},"name":"redis-m...
Selector:          app=redis,role=master,tier=backend
Type:              ClusterIP
IP:                10.152.183.197
Port:              <unset>  6379/TCP
TargetPort:        6379/TCP
Endpoints:         10.1.1.2:6379
Session Affinity:  None
Events:            <none>
```

### Start up the Redis Slaves

Although the Redis master is a single pod, you can make it 
highly available to meet traffic demands by adding replica Redis slaves.

#### Creating the Redis Slave Deployment
Deployments scale based off of the configurations set in the manifest file. 
In this case, the Deployment object specifies two replicas.

If there are not any replicas running, this Deployment would start the two replicas 
on your container cluster. Conversely, if there are more than two replicas are 
running, it would scale down until two replicas are running.

Apply the Redis Slave Deployment from the redis-slave-deployment.yaml file:

```
$ microk8s.kubectl apply -f https://k8s.io/examples/application/guestbook/redis-slave-deployment.yaml
$ microk8s.kubectl get all

NAME                                READY   STATUS    RESTARTS   AGE
pod/redis-master-6fbbc44567-pv699   1/1     Running   0          33m
pod/redis-slave-74ccb764fc-twk5k    1/1     Running   0          27s
pod/redis-slave-74ccb764fc-xrh2s    1/1     Running   0          27s

NAME                   TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
service/kubernetes     ClusterIP   10.152.183.1     <none>        443/TCP    37m
service/redis-master   ClusterIP   10.152.183.197   <none>        6379/TCP   28m

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/redis-master   1/1     1            1           33m
deployment.apps/redis-slave    2/2     2            2           28s

NAME                                      DESIRED   CURRENT   READY   AGE
replicaset.apps/redis-master-6fbbc44567   1         1         1       33m
replicaset.apps/redis-slave-74ccb764fc    2         2         2       28s
```

### Creating the Redis Slave Service
The guestbook application needs to communicate to Redis slaves to read data. 
To make the Redis slaves discoverable, you need to set up a Service. 
A Service provides transparent load balancing to a set of Pods.

Apply the Redis Slave Service from the following redis-slave-service.yaml file:

```
$ microk8s.kubectl apply -f https://k8s.io/examples/application/guestbook/redis-slave-service.yaml
$ microk8s.kubectl get all
$ microk8s.kubectl get services

NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
kubernetes     ClusterIP   10.152.183.1     <none>        443/TCP    39m
redis-master   ClusterIP   10.152.183.197   <none>        6379/TCP   30m
redis-slave    ClusterIP   10.152.183.208   <none>        6379/TCP   35s
```

### Set up and Expose the Guestbook Frontend
The guestbook application has a web frontend serving the HTTP requests 
written in PHP. It is configured to connect to the redis-master Service 
for write requests and the redis-slave service for Read requests.

Apply the frontend Deployment from the frontend-deployment.yaml file:

```
$ microk8s.kubectl apply -f https://k8s.io/examples/application/guestbook/frontend-deployment.yaml
$ microk8s.kubectl get pods -l app=guestbook -l tier=frontend

NAME                        READY   STATUS    RESTARTS   AGE
frontend-74b4665db5-66n9l   1/1     Running   0          109s
frontend-74b4665db5-hqlz2   1/1     Running   0          109s
frontend-74b4665db5-n54m4   1/1     Running   0          109s
```

### Creating the Frontend Service
The redis-slave and redis-master Services you applied are only accessible 
within the container cluster because the default type for a Service is ClusterIP. 
ClusterIP provides a single IP address for the set of Pods the Service is pointing to. 
This IP address is accessible only within the cluster.

If you want guests to be able to access your guestbook, you must configure the 
frontend Service to be externally visible, so a client can request the Service from 
outside the container cluster. Minikube can only expose Services through NodePort.

Apply the frontend Service from the frontend-service.yaml file:

```
$ microk8s.kubectl apply -f https://k8s.io/examples/application/guestbook/frontend-service.yaml
$ microk8s.kubectl get services

NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
frontend       NodePort    10.152.183.2     <none>        80:32603/TCP   33s
kubernetes     ClusterIP   10.152.183.1     <none>        443/TCP        47m
redis-master   ClusterIP   10.152.183.197   <none>        6379/TCP       38m
redis-slave    ClusterIP   10.152.183.208   <none>        6379/TCP       8m19s
```

### Viewing the Frontend Service via NodePort
If you deployed this application to Minikube or a local cluster, you need to find the IP address to view your Guestbook.

Run the following command to get the IP address for the frontend Service.

```
$ microk8s.kubectl get service frontend 

NAME       TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
frontend   NodePort   10.152.183.2   <none>        80:32603/TCP   37m
```

Url: http://10.152.183.2/

### Viewing the Frontend Service via LoadBalancer
If you deployed the frontend-service.yaml manifest with type: LoadBalancer you need to find the IP address to view your Guestbook.

Run the following command to get the IP address for the frontend Service.

```
$ microk8s.kubectl get service frontend 

NAME       TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
frontend   NodePort   10.152.183.2   <none>        80:32603/TCP   37m
```

### Scale the Web Frontend
Scaling up or down is easy because your servers are defined as a Service that uses a Deployment controller.

Run the following command to scale up the number of frontend Pods:

```
$ microk8s.kubectl scale deployment frontend --replicas=5
$ microk8s.kubectl get pods

NAME                            READY   STATUS    RESTARTS   AGE
frontend-74b4665db5-66n9l       1/1     Running   0          60m
frontend-74b4665db5-dsvd8       1/1     Running   0          22s
frontend-74b4665db5-hqlz2       1/1     Running   0          60m
frontend-74b4665db5-n54m4       1/1     Running   0          60m
frontend-74b4665db5-zh448       1/1     Running   0          22s
redis-master-6fbbc44567-pv699   1/1     Running   0          98m
redis-slave-74ccb764fc-twk5k    1/1     Running   0          65m
redis-slave-74ccb764fc-xrh2s    1/1     Running   0          65m
```

Run the following command to scale down the number of frontend Pods:

```
$ microk8s.kubectl scale deployment frontend --replicas=2
$ microk8s.kubectl get pods

NAME                            READY   STATUS    RESTARTS   AGE
frontend-74b4665db5-hqlz2       1/1     Running   0          61m
frontend-74b4665db5-n54m4       1/1     Running   0          61m
redis-master-6fbbc44567-pv699   1/1     Running   0          100m
redis-slave-74ccb764fc-twk5k    1/1     Running   0          66m
redis-slave-74ccb764fc-xrh2s    1/1     Running   0          66m
```

### Cleaning up
Deleting the Deployments and Services also deletes any running Pods. 
Use labels to delete multiple resources with one command.

Run the following commands to delete all Pods, Deployments, and Services.

```
$ microk8s.kubectl delete deployment -l app=redis
$ microk8s.kubectl delete service -l app=redis
$ microk8s.kubectl delete deployment -l app=guestbook
$ microk8s.kubectl delete service -l app=guestbook
$ microk8s.kubectl get pods
$ microk8s.kubectl get all
```

