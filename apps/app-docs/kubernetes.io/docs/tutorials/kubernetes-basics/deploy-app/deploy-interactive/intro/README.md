### URLs
https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-interactive/

### Notes
get additional info about possible parameters
$ kubectl get nodes --help

Check that kubectl is configured to talk to your cluster, by running the kubectl version command:

$ kubectl version

To view the nodes in the cluster, run the kubectl get nodes command:

$ kubectl get nodes

The run command creates a new deployment. We need to provide the deployment name and app image location (include the full repository url for images hosted outside Docker hub). We want to run the app on a specific port so we add the  --port parameter:

$ kubectl run kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1 --port=8080

To list your deployments use the get deployments command:

$ kubectl get deployments

We will open a second terminal window to run the proxy.

$ kubectl proxy

You can see all those APIs hosted through the proxy endpoint, now available at through http://localhost:8001. For example, we can query the version directly through the API using the curl command:

$ curl http://localhost:8001/version

First we need to get the Pod name, and we'll store in the environment variable POD_NAME:

$ export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME

Now we can make an HTTP request to the application running in that pod:

$ curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/

