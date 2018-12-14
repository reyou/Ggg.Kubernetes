### URLs
https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-interactive/

### Notes
We already installed minikube for you. 
Check that it is properly installed, 
by running the minikube version command:

$ minikube version

Start the cluster, by running the minikube start command:

$ minikube start

To check if kubectl is installed you can run the kubectl version command:

$ kubectl version

Client Version: version.Info{Major:"1", Minor:"13", GitVersion:"v1.13.1", GitCommit:"eec55b9ba98609a46fee712359c7b5b365bdd920", GitTreeState:"clean", BuildDate:"2018-12-13T10:39:04Z", GoVersion:"go1.11.2", Compiler:"gc", Platform:"linux/amd64"}
Unable to connect to the server: dial tcp 192.168.1.143:6443: i/o timeout

Let’s view the cluster details. We’ll do that by running kubectl cluster-info:

$ kubectl cluster-info

error: the server doesn't have a resource type "services"

To view the nodes in the cluster, run the kubectl get nodes command:

$ kubectl get nodes

error: the server doesn't have a resource type "nodes"