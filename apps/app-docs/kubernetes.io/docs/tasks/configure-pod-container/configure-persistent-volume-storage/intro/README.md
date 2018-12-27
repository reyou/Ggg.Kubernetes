* Title:	Configure a Pod to Use a PersistentVolume for Storage - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/

This page shows how to configure a Pod to use a PersistentVolumeClaim for storage. 
Here is a summary of the process:

A cluster administrator creates a PersistentVolume that is backed by physical storage. 
The administrator does not associate the volume with any Pod.

A cluster user creates a PersistentVolumeClaim, which gets automatically 
bound to a suitable PersistentVolume.

The user creates a Pod that uses the PersistentVolumeClaim as storage.

* Title:	Hello Minikube - Kubernetes
  * Url:	https://kubernetes.io/docs/tutorials/hello-minikube/

```
$ microk8s.kubectl get all
$ microk8s.kubectl create deployment hello-node --image=gcr.io/hello-minikube-zero-install/hello-node
$ microk8s.kubectl expose deployment hello-node --type=LoadBalancer --port=8080
$ microk8s.kubectl exec -ti hello-node-64c578bdf8-b4hsr bash
$ microk8s.kubectl delete deployment hello-node
$ microk8s.kubectl delete service hello-node
$ mkdir /mnt/data
$ echo 'Hello from Kubernetes storage' > /mnt/data/index.html
```

url: http://10.152.183.199:8080

Here is the configuration file for the hostPath PersistentVolume: 
pv-volume.yaml

### Create the PersistentVolume:

```
$ microk8s.kubectl get all
$ microk8s.kubectl create -f https://k8s.io/examples/pods/storage/pv-volume.yaml
$ microk8s.kubectl create -f pv-volume.yaml
```

View information about the PersistentVolume:

```
$ microk8s.kubectl get all
$ microk8s.kubectl get pv task-pv-volume
```

Here is the configuration file for the PersistentVolumeClaim:
pv-claim.yaml

### Create the PersistentVolumeClaim:

```
$ microk8s.kubectl get all
$ microk8s.kubectl create -f pv-claim.yaml
$ microk8s.kubectl get pv task-pv-volume
$ microk8s.kubectl get pvc task-pv-claim
```

### Create a Pod
The next step is to create a Pod that uses your PersistentVolumeClaim as a volume.

Here is the configuration file for the Pod:
pv-pod.yaml

Create the Pod:

```
$ microk8s.kubectl get all
$ microk8s.kubectl create -f pv-pod.yaml
$ microk8s.kubectl exec -it task-pv-pod -- /bin/bash
```

#### $ curl
```
root@task-pv-pod:/#
apt-get update
apt-get install curl
curl localhost
```

#### Browse /usr/share/nginx/html
```
$ microk8s.kubectl exec -it task-pv-pod -- /bin/bash
$ cd /usr/share/nginx/html
$ ls
$ cat index.html

Hello from Kubernetes storage
```

* Title:	community/persistent-storage.md at master · kubernetes/community
  * Url:	https://github.com/kubernetes/community/blob/master/contributors/design-proposals/storage/persistent-storage.md
