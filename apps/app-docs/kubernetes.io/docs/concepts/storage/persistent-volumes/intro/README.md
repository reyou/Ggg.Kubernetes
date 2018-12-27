* Title:	Persistent Volumes - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/persistent-volumes/

Managing storage is a distinct problem from managing compute. 
The PersistentVolume subsystem provides an API for users and 
administrators that abstracts details of how storage is provided from 
how it is consumed. 

To do this we introduce two new API resources: 
PersistentVolume and PersistentVolumeClaim.

A PersistentVolume (PV) is a piece of storage in the cluster that has been provisioned by an administrator. 
It is a resource in the cluster just like a node is a cluster resource. PVs are volume plugins like Volumes, 
but have a lifecycle independent of any individual pod that uses the PV. 
This API object captures the details of the implementation of the storage, be that NFS, iSCSI, or a 
cloud-provider-specific storage system.

A PersistentVolumeClaim (PVC) is a request for storage by a user. 
It is similar to a pod. Pods consume node resources and PVCs consume PV resources. 
Pods can request specific levels of resources (CPU and Memory). 
Claims can request specific size and access modes (e.g., can be mounted once read/write or many times read-only).

While PersistentVolumeClaims allow a user to consume abstract storage resources, 
it is common that users need PersistentVolumes with varying properties, such as performance, 
for different problems. 

Cluster administrators need to be able to offer a variety of PersistentVolumes that 
differ in more ways than just size and access modes, 
without exposing users to the details of how those volumes are implemented. 
For these needs there is the StorageClass resource.

### Writing Portable Configuration

* Title:	Persistent Volumes - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/persistent-volumes/#writing-portable-configuration

  If you’re writing configuration templates or examples that run on a wide range of 
  clusters and need persistent storage, we recommend that you use the following pattern:

