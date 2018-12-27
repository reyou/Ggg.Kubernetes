* Title:	Volumes - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/volumes/#local

A local volume represents a mounted local storage device such as a disk, 
partition or directory.

Local volumes can only be used as a statically created PersistentVolume. 

Dynamic provisioning is not supported yet.

Compared to hostPath volumes, local volumes can be used in a durable and portable 
manner without manually scheduling Pods to nodes, as the system is aware of the 
volume’s node constraints by looking at the node affinity on the PersistentVolume.

However, local volumes are still subject to the availability of the underlying node 
and are not suitable for all applications. 

If a node becomes unhealthy, then the local volume will also become inaccessible, 
and a Pod using it will not be able to run. 

Applications using local volumes must be able to tolerate this reduced availability, 
as well as potential data loss, depending on the durability characteristics of the underlying disk.

The following is an example PersistentVolume spec using a local volume and nodeAffinity:

```
persistentVolumeExample.yaml
```


