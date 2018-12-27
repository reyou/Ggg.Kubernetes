Title:	Liveness and Readiness Healthchecks | Kubernetes | Katacoda
Url:	https://www.katacoda.com/courses/kubernetes/liveness-readiness-healthchecks

In this scenario, you'll learn how Kubernetes checks containers health using 
Readiness and Liveness Probes.

Readiness Probes checks if an application is ready to start processing traffic. 
This probe solves the problem of the container having started, but the process still 
warming up and configuring itself meaning it's not ready to receive traffic.

Liveness Probes ensure that the application is healthy and capable 
of processing requests.

### Step 1 - Launch Cluster

To start, we need to launch a Kubernetes cluster.

Execute the command below to start the cluster components and download the Kubectl CLI.

```
$ launch.sh
```

After the cluster has started, deploy the demo application with 

```
$ kubectl apply -f deploy.yaml
```

```
$ kubectl get all

NAME                     READY     STATUS    RESTARTS   AGE
pod/bad-frontend-sfz42   0/1       Running   0          12s
pod/frontend-94wnf       1/1       Running   0          12s

NAME                                 DESIRED   CURRENT   READY     AGE
replicationcontroller/bad-frontend   1         1         0         12s
replicationcontroller/frontend       1         1         1         12s

NAME                 TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/frontend     NodePort    10.99.44.174   <none>        80:30080/TCP   12s
service/kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP        2m
```

***

### Step 2 - Readiness Probe

When deploying the cluster, two pods were also deployed to demonstrate 
health checking. You can view the deployment with 

```
$ cat deploy.yaml.
```

When deploying the Replication Controller, each Pod has a Readiness and Liveness check. Each check has the following format for performing a healthcheck over HTTP.

```
livenessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 1
  timeoutSeconds: 1
```

The settings can be changed to call different endpoints, for example, /ping, based on your application.

#### Get Status
The first Pod, bad-frontend is an HTTP service which always returns a 
500 error indicating it hasn't started correctly. You can view the status 
of the Pod with 

```
$ kubectl get pods --selector="name=bad-frontend"

NAME                 READY     STATUS             RESTARTS   AGE
bad-frontend-sfz42   0/1       CrashLoopBackOff   7          9m
```

Kubectl will return the Pods deployed with our particular label. 
Because the healthcheck is failing, it will say that zero containers are 
ready. It will also indicate the number of restart attempts of the container.

To find out more details of why it's failing, describe the Pod.

```
$ pod=$(kubectl get pods --selector="name=bad-frontend" --output=jsonpath={.items..metadata.name})
$ kubectl describe pod $pod
```

#### Readiness OK
Our second Pod, frontend, returns an OK status on launch.

```
$ kubectl get pods --selector="name=frontend"

NAME             READY     STATUS    RESTARTS   AGE
frontend-94wnf   1/1       Running   0          10m
```

***

### Step 3 - Liveness Probe

With our second Pod currently running in a health state, 
we can simulate a failure occurring.

At present, no crashes should have occurred. 

```
$ kubectl get pods --selector="name=frontend"

NAME             READY     STATUS    RESTARTS   AGE
frontend-94wnf   1/1       Running   0          11m
```

Crash Service
The HTTP server has an additional endpoint that will cause it to return 500 errors. 
Using kubectl exec it's possible to call the endpoint.

```
$ pod=$(kubectl get pods --selector="name=frontend" --output=jsonpath={.items..metadata.name})
$ kubectl exec $pod -- /usr/bin/curl -s localhost/unhealthy
```

Liveness
Based on the configuration, Kubernetes will execute the Liveness Probe. 
If the Probe fails, Kubernetes will destroy and re-create the failed container. 
Execute the above command to crash the service and watch Kubernetes recover it automatically.

```
$ kubectl get pods --selector="name=frontend"
```

The check may take a few moments to detect.


