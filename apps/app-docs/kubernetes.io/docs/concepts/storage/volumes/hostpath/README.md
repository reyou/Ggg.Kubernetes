* Title:	Volumes - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/volumes/#hostpath

* Title:	external-storage/local-volume at master · kubernetes-incubator/external-storage
  * Url:	https://github.com/kubernetes-incubator/external-storage/tree/master/local-volume


A hostPath volume mounts a file or directory from the host node’s filesystem 
into your Pod. This is not something that most Pods will need, but it offers a 
powerful escape hatch for some applications.

Watch out when using this type of volume, because:

* Pods with identical configuration (such as created from a podTemplate) 
may behave differently on different nodes due to different files on the nodes

* when Kubernetes adds resource-aware scheduling, as is planned, 
it will not be able to account for resources used by a hostPath

* the files or directories created on the underlying hosts are only writable by root. 
You either need to run your process as root in a privileged Container or modify the 
file permissions on the host to be able to write to a hostPath volume

```
example-pod-2.yaml
```
