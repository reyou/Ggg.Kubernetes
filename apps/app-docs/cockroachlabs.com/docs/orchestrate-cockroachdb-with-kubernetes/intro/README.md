* Title:	Orchestrate CockroachDB in a Single Kubernetes Cluster | CockroachDB Docs
  * Url:	https://www.cockroachlabs.com/docs/stable/orchestrate-cockroachdb-with-kubernetes.html

* Title:	CockroachDB Performance on Kubernetes | CockroachDB Docs
  * Url:	https://www.cockroachlabs.com/docs/stable/kubernetes-performance.html

From your local workstation, use our cockroachdb-statefulset-secure.yaml 
file to create the StatefulSet that automatically creates 3 pods, 
each with a CockroachDB node running inside it:

### Start CockroachDB

```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-docs/cockroachlabs.com/docs/orchestrate-cockroachdb-with-kubernetes/intro/
$ microk8s.kubectl create -f https://raw.githubusercontent.com/cockroachdb/cockroach/master/cloud/kubernetes/cockroachdb-statefulset-secure.yaml

$ microk8s.kubectl delete -f ./statefulSet/cockroachdb-statefulset-secure.yaml
$ microk8s.kubectl create -f ./statefulSet/cockroachdb-statefulset-secure.yaml
```

### Persisten Volume
```
$ microk8s.kubectl create -f ./statefulSet/persistentVolume1.yaml
$ microk8s.kubectl create -f ./statefulSet/persistentVolume2.yaml
$ microk8s.kubectl create -f ./statefulSet/persistentVolume3.yaml
```

Get the name of the Pending CSR for the first pod:

``` 
$ microk8s.kubectl get csr
```

### Approve the CSR

If everything looks correct, approve the CSR for the first pod:

``` 
$ microk8s.kubectl certificate approve default.node.cockroachdb-0
$ microk8s.kubectl certificate approve default.node.cockroachdb-1
$ microk8s.kubectl certificate approve default.node.cockroachdb-2
```

Confirm that three pods are Running successfully. Note that they will not be considered Ready until after the cluster has been initialized:

```
$ microk8s.kubectl get pods
```

Use our cluster-init-secure.yaml file to perform a 
one-time initialization that joins the nodes into a single cluster:


### One-time initialization Job
``` 
$ microk8s.kubectl create -f https://raw.githubusercontent.com/cockroachdb/cockroach/master/cloud/kubernetes/cluster-init-secure.yaml
$ microk8s.kubectl delete -f ./statefulSet/cluster-init-secure.yaml
$ microk8s.kubectl create -f ./statefulSet/cluster-init-secure.yaml
```

Approve the CSR for the one-off pod from which cluster initialization happens:

```  
$ microk8s.kubectl certificate approve default.client.root

certificatesigningrequest "default.client.root" approved
``` 