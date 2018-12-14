### URLs
https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-interactive/

### Notes
To list your deployments use the get deployments command: 

$ kubectl get deployments

NAME                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   4         4         4            0           7s

To list the running Pods use the get pods command:

$ kubectl get pods

NAME                                   READY     STATUS              RESTARTS   AGE
kubernetes-bootcamp-5c69669756-dv96c   1/1       Running             0          12s
kubernetes-bootcamp-5c69669756-lvdnk   1/1       Running             0          12s
kubernetes-bootcamp-5c69669756-vghk2   1/1       Running             0          12s
kubernetes-bootcamp-5c69669756-vhnv6   0/1       ContainerCreating   0          12s

To view the current image version of the app, run a describe command against the Pods (look at the Image field):

$ kubectl describe pods

To update the image of the application to version 2, use the set image command, followed by the deployment name and the new image version:

$ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2

The command notified the Deployment to use a different image for your app and initiated a rolling update. Check the status of the new Pods, and view the old one terminating with the get pods command:

$ kubectl get pods

### Step 2: Verify an update
First, let’s check that the App is running. To find out the exposed IP and Port we can use describe service:

$ kubectl describe services/kubernetes-bootcamp

Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   run=kubernetes-bootcamp
Annotations:              <none>
Selector:                 run=kubernetes-bootcamp
Type:                     NodePort
IP:                       10.111.154.246
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30631/TCP
Endpoints:                172.18.0.10:8080,172.18.0.11:8080,172.18.0.8:8080 + 1 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>

Create an environment variable called NODE_PORT that has the value of the Node port assigned:

$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT

Next, we’ll do a curl to the the exposed IP and port:

$ curl $(minikube ip):$NODE_PORT

We hit a different Pod with every request and we see that all Pods are running the latest version (v2).

The update can be confirmed also by running a rollout status command:

$ kubectl rollout status deployments/kubernetes-bootcamp

To view the current image version of the app, run a describe command against the Pods:

$ kubectl describe pods

We run now version 2 of the app (look at the Image field)

