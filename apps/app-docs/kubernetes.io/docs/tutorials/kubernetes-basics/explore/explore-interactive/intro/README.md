### URLs
https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-interactive/

### Notes

Let’s verify that the application we deployed in the previous scenario is running. We’ll use the kubectl get command and look for existing Pods:

$ kubectl get pods

Next, to view what containers are inside that Pod and what images are used to build those containers we run the describe pods command:

$ kubectl describe pods

open a new terminal and run the proxy:

$ kubectl proxy
url: http://127.0.0.1:8001/

To get the Pod name and store it in the POD_NAME environment variable:

$ export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME

To see the output of our application, run a curl request.
The url is the route to the API of the Pod.

$ curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/

Anything that the application would normally send to STDOUT becomes logs for the container within the Pod. We can retrieve these logs using the kubectl logs command:

$ kubectl logs $POD_NAME

We can execute commands directly on the container once the Pod is up and running. For this, we use the exec command and use the name of the Pod as a parameter. Let’s list the environment variables:

$ kubectl exec $POD_NAME env

Next let’s start a bash session in the Pod’s container:

$ kubectl exec -ti $POD_NAME bash

We have now an open console on the container where we run our NodeJS application. The source code of the app is in the server.js file:

$ cat server.js

You can check that the application is up by running a curl command:

$ curl localhost:8080

Note: here we used localhost because we executed the command inside the NodeJS container

To close your container connection type 

$ exit

