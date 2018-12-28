* Title:	Using StorageClasses for Dynamic Provisioning - Persistent Storage Examples | Installation and Configuration | OpenShift Container Platform 3.4
  * Url:	https://docs.openshift.com/container-platform/3.4/install_config/storage_examples/storage_classes_dynamic_provisioning.html#example2


```
$ microk8s.kubectl apply -f DefaultStorageClass.yaml
$ microk8s.kubectl apply -f PersistentVolumeClaimDefault2.yaml 
$ microk8s.kubectl apply -f PersistentVolumeManual.yaml
$ microk8s.kubectl apply -f PersistentVolumeClaimDefault4
$ microk8s.kubectl apply -f PersistentVolumeManual3.yaml
```