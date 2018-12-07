### URLs
https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-interactive/

### Notes

In this scenario you will learn how to expose Kubernetes applications outside the cluster using the kubectl expose command. You will also learn how to view and apply labels to objects with the kubectl label command.

Let’s verify that our application is running. We’ll use the  kubectl get command and look for existing Pods:

$ kubectl get pods

Next let’s list the current Services from our cluster:

$ kubectl get services

To create a new service and expose it to external traffic we’ll use the expose command with NodePort as parameter (minikube does not support the LoadBalancer option yet).

$ kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080

Let’s run again the get services command:

$ kubectl get services

NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
kubernetes            ClusterIP   10.96.0.1      <none>        443/TCP          3m
kubernetes-bootcamp   NodePort    10.97.228.24   <none>        8080:30064/TCP   21s

To find out what port was opened externally (by the NodePort option) we’ll run the describe service command:

$ kubectl describe services/kubernetes-bootcamp

Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   run=kubernetes-bootcamp
Annotations:              <none>
Selector:                 run=kubernetes-bootcamp
Type:                     NodePort
IP:                       10.97.228.24
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30064/TCP
Endpoints:                172.18.0.2:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>

Create an environment variable called NODE_PORT that has the value of the Node port assigned:

$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT

Now we can test that the app is exposed outside of the cluster using curl, the IP of the Node and the externally exposed port:

$ curl $(minikube ip):$NODE_PORT

And we get a response from the server. The Service is exposed.

The Deployment created automatically a label for our Pod. With describe deployment command you can see the name of the label:

$ kubectl describe deployment

Name:                   kubernetes-bootcamp
Namespace:              default
CreationTimestamp:      Fri, 07 Dec 2018 04:13:15 +0000
Labels:                 run=kubernetes-bootcamp
Annotations:            deployment.kubernetes.io/revision=1
Selector:               run=kubernetes-bootcamp
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
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
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   kubernetes-bootcamp-5c69669756 (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  7m    deployment-controller  Scaled up replica set kubernetes-bootcamp-5c69669756 to 1

Let’s use this label to query our list of Pods. We’ll use the kubectl get pods command with -l as a parameter, followed by the label values:

$ kubectl get pods -l run=kubernetes-bootcamp

NAME                                   READY     STATUS    RESTARTS   AGE
kubernetes-bootcamp-5c69669756-bf6rc   1/1       Running   0          34s

You can do the same to list the existing services:

$ kubectl get services -l run=kubernetes-bootcamp

NAME                  TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes-bootcamp   NodePort   10.101.143.177   <none>        8080:30679/TCP   1m

Get the name of the Pod and store it in the POD_NAME environment variable:

$ export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME

Name of the Pod: kubernetes-bootcamp-5c69669756-bf6rc

To apply a new label we use the label command followed by the object type, object name and the new label:

$ kubectl label pod $POD_NAME app=v1

This will apply a new label to our Pod (we pinned the application version to the Pod), and we can check it with the describe pod command:

$ kubectl describe pods $POD_NAME

We see here that the label is attached now to our Pod. And we can query now the list of pods using the new label:

$ kubectl get pods -l app=v1

NAME                                   READY     STATUS    RESTARTS   AGE
kubernetes-bootcamp-5c69669756-bf6rc   1/1       Running   0          4m

To delete Services you can use the delete service command. Labels can be used also here:

$ kubectl delete service -l run=kubernetes-bootcamp

Confirm that the service is gone:

$ kubectl get services

This confirms that our Service was removed. To confirm that route is not exposed anymore you can curl the previously exposed IP and port:

$ curl $(minikube ip):$NODE_PORT

curl: (7) Failed to connect to 172.17.0.23 port 30679: Connection refused

This proves that the app is not reachable anymore from outside of the cluster. You can confirm that the app is still running with a curl inside the pod:

$ kubectl exec -ti $POD_NAME curl localhost:8080





