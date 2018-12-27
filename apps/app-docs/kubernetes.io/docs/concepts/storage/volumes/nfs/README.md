* Title:	Volumes - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/volumes/#nfs

An nfs volume allows an existing NFS (Network File System) share to be mounted into your Pod. 
Unlike emptyDir, which is erased when a Pod is removed, the contents of an 
nfs volume are preserved and the volume is merely unmounted. 

This means that an NFS volume can be pre-populated with data, and that data can be 
“handed off” between Pods. NFS can be mounted by multiple writers simultaneously.

Caution: You must have your own NFS server running with the share exported before you can use it.

* Title:	examples/staging/volumes/nfs at master · kubernetes/examples
  * Url:	https://github.com/kubernetes/examples/tree/master/staging/volumes/nfs

https://github.com/kubernetes/examples/raw/master/staging/volumes/nfs/nfs-pv.png


```
# On GCE (create GCE PD PVC):
$ kubectl create -f examples/staging/volumes/nfs/provisioner/nfs-server-gce-pv.yaml

# On Azure (create Azure Disk PVC):
$ kubectl create -f examples/staging/volumes/nfs/provisioner/nfs-server-azure-pv.yaml

# Common steps after creating either GCE PD or Azure Disk PVC:
$ kubectl create -f examples/staging/volumes/nfs/nfs-server-rc.yaml
$ kubectl create -f examples/staging/volumes/nfs/nfs-server-service.yaml

# get the cluster IP of the server using the following command
$ kubectl describe services nfs-server

# use the NFS server IP to update nfs-pv.yaml and execute the following
$ kubectl create -f examples/staging/volumes/nfs/nfs-pv.yaml
$ kubectl create -f examples/staging/volumes/nfs/nfs-pvc.yaml

# run a fake backend
$ kubectl create -f examples/staging/volumes/nfs/nfs-busybox-rc.yaml

# get pod name from this command
$ kubectl get pod -l name=nfs-busybox

# use the pod name to check the test file
$ kubectl exec nfs-busybox-jdhf3 -- cat /mnt/index.html
```