* Title:	StatefulSets - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

```
$ microk8s.kubectl get all
```

A StatefulSet operates under the same pattern as any other Controller. 
You define your desired state in a StatefulSet object, and the StatefulSet 
controller makes any necessary updates to get there from the current state.

```
$ microk8s.kubectl get all
$ microk8s.kubectl create -f statefulSetExample.yaml 
```


