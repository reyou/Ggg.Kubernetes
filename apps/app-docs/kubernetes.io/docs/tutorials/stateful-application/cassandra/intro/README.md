* Title:	Example: Deploying Cassandra with Stateful Sets - Kubernetes
  * Url:	https://kubernetes.io/docs/tutorials/stateful-application/cassandra/

Create a Service to track all Cassandra StatefulSet nodes from the cassandra-service.yaml file:

### Create
```
$ microk8s.kubectl create -f cassandra-service.yaml
$ microk8s.kubectl get svc cassandra
$ microk8s.kubectl create -f persistentVolume.yaml
$ microk8s.kubectl create -f storageClassFast.yaml
$ microk8s.kubectl create -f cassandra-statefulset.yaml
```

### Delete