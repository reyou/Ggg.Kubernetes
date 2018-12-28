* Title:	Local Persistent Volumes for Kubernetes Goes Beta - Kubernetes
  * Url:	https://kubernetes.io/blog/2018/04/13/local-persistent-volumes-beta/

### Storage Classes and How to Use them

StorageClasses are the foundation of dynamic provisioning, 
allowing cluster administrators to define abstractions for the 
underlying storage platform. 
Users simply refer to a StorageClass by name in the 
PersistentVolumeClaim (PVC) using the “storageClassName” parameter.

In the following example, a PVC refers to a specific storage class named “gold”.

```
$ microk8s.kubectl apply -f StorageClassStandard.yaml
$ microk8s.kubectl apply -f PersistentVolumeClaimGold2.yaml 
$ microk8s.kubectl apply -f StorageClassCreate.yaml
```
