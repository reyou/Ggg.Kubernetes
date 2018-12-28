* Title:	Storage Classes - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/storage-classes/

A StorageClass provides a way for administrators to describe the “classes” 
of storage they offer. Different classes might map to quality-of-service levels, 
or to backup policies, or to arbitrary policies determined by the cluster administrators. 
Kubernetes itself is unopinionated about what classes represent. 
This concept is sometimes called “profiles” in other storage systems.

```
$ microk8s.kubectl create -f storageClassExample.yaml
```