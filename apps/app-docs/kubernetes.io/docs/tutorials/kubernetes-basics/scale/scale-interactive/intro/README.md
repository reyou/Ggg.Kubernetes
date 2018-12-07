### URLs
https://kubernetes.io/docs/tutorials/kubernetes-basics/scale/scale-interactive/

### Notes
To list your deployments use the get deployments command: 

$ kubectl get deployments

NAME                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   1         1         1            1           1m

The DESIRED state is showing the configured number of replicas

The CURRENT state show how many replicas are running now

The UP-TO-DATE is the number of replicas that were updated to match the desired (configured) state

The AVAILABLE state shows how many replicas are actually AVAILABLE to the users

Next, let’s scale the Deployment to 4 replicas. We’ll use the kubectl scale command, followed by the deployment type, name and desired number of instances:

$ kubectl scale deployments/kubernetes-bootcamp --replicas=4

To list your Deployments once again, use get deployments:

$ kubectl get deployments

NAME                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   4         4         4            4           2m

The change was applied, and we have 4 instances of the application available. Next, let’s check if the number of Pods changed:

$ kubectl get pods -o wide

NAME                                   READY     STATUS    RESTARTS   AGE       IP           NODE
kubernetes-bootcamp-5c69669756-27xsp   1/1       Running   0          51s       172.18.0.7   minikube
kubernetes-bootcamp-5c69669756-98wf4   1/1       Running   0          51s       172.18.0.6   minikube
kubernetes-bootcamp-5c69669756-jg9xc   1/1       Running   0          3m        172.18.0.2   minikube
kubernetes-bootcamp-5c69669756-rrdwc   1/1       Running   0          51s       172.18.0.5   minikube

There are 4 Pods now, with different IP addresses. The change was registered in the Deployment events log. To check that, use the describe command:

$ kubectl describe deployments/kubernetes-bootcamp

Name:                   kubernetes-bootcamp
Namespace:              default
CreationTimestamp:      Fri, 07 Dec 2018 04:38:32 +0000
Labels:                 run=kubernetes-bootcamp
Annotations:            deployment.kubernetes.io/revision=1
Selector:               run=kubernetes-bootcamp
Replicas:               4 desired | 4 updated | 4 total | 4 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  run=kubernetes-bootcamp
  Containers:
   kubernetes-bootcamp:
    Image:        gcr.io/google-samples/kubernetes-bootcamp:v1
    Port:         8080/TCP
    Host Port:    0/TCP
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Progressing    True    NewReplicaSetAvailable
  Available      True    MinimumReplicasAvailable
OldReplicaSets:  <none>
NewReplicaSet:   kubernetes-bootcamp-5c69669756 (4/4 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  3m    deployment-controller  Scaled up replica set kubernetes-bootcamp-5c69669756 to 1
  Normal  ScalingReplicaSet  1m    deployment-controller  Scaled up replica set kubernetes-bootcamp-5c69669756 to 4

  You can also view in the output of this command that there are 4 replicas now.

Let’s check that the Service is load-balancing the traffic. To find out the exposed IP and Port we can use the describe service as we learned in the previously Module:

$ kubectl describe services/kubernetes-bootcamp

Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   run=kubernetes-bootcamp
Annotations:              <none>
Selector:                 run=kubernetes-bootcamp
Type:                     NodePort
IP:                       10.100.18.12
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30449/TCP
Endpoints:                172.18.0.2:8080,172.18.0.5:8080,172.18.0.6:8080 + 1 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>

Create an environment variable called NODE_PORT that has a value as the Node port:

$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT

Next, we’ll do a curl to the exposed IP and port. Execute the command multiple times:

$ curl $(minikube ip):$NODE_PORT

We hit a different Pod with every request. This demonstrates that the load-balancing is working.

To scale down the Service to 2 replicas, run again the scale command:

$ kubectl scale deployments/kubernetes-bootcamp --replicas=2

List the Deployments to check if the change was applied with the get deployments command:

$ kubectl get deployments

The number of replicas decreased to 2. List the number of Pods, with get pods:

$ kubectl get pods -o wide

This confirms that 2 Pods were terminated.