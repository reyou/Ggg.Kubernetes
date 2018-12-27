* Title:	Dynamic Volume Provisioning - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/

Dynamic volume provisioning allows storage volumes to be created on-demand. 
Without dynamic provisioning, cluster administrators have to manually make calls 
to their cloud or storage provider to create new storage volumes, and then create 
PersistentVolume objects to represent them in Kubernetes. 

The dynamic provisioning feature eliminates the need for cluster administrators 
to pre-provision storage. 
Instead, it automatically provisions storage when it is requested by users.

The implementation of dynamic volume provisioning is based on the 
API object StorageClass from the API group storage.k8s.io. 
A cluster administrator can define as many StorageClass objects as needed, each specifying a volume plugin 
(aka provisioner) that provisions a volume and the set of parameters to pass to that provisioner 
when provisioning. 

### Enabling Dynamic Provisioning

The following manifest creates a storage class “slow” which provisions standard disk-like persistent disks.

```
storageClassSlow.yaml
```

The following manifest creates a storage class “fast” which provisions SSD-like persistent disks.

```
storageClassFast.yaml
```

### Using Dynamic Provisioning

To select the “fast” storage class, for example, a user would create the 
following PersistentVolumeClaim:
This claim results in an SSD-like Persistent Disk being automatically 
provisioned. 
When the claim is deleted, the volume is destroyed.

```
persistentVolumeClaim.yaml
```



