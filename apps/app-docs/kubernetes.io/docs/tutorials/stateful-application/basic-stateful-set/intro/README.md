* Title:	StatefulSet Basics - Kubernetes
  * Url:	https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/

* Title:	Dynamic Volume Provisioning - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/

### Dynamically provision PersistentVolumes 
```
$ microk8s.kubectl get all
$ microk8s.kubectl apply -f dynProvPersVols.yaml
$ microk8s.kubectl apply -f dynProvPersVols.web.yaml
$ microk8s.kubectl get sc
```

* Title:	DNS is crashlooping · Issue #67 · ubuntu/microk8s
  * Url:	https://github.com/ubuntu/microk8s/issues/67

```
$ sudo ufw allow in on cbr0 && sudo ufw allow out on cbr0
```

 ### Create the Headless Service and StatefulSet defined in web.yaml.

```
$ microk8s.kubectl get all
$ microk8s.kubectl delete -f web.yaml 
$ microk8s.kubectl delete pvc www-web-0
$ microk8s.kubectl create -f web.yaml 

service/nginx created
statefulset.apps/web created
```

The command above creates two Pods, each running an NGINX webserver. 
Get the nginx Service and the web StatefulSet to verify that they were 
created successfully.

### Ordered Pod Creation
For a StatefulSet with N replicas, when Pods are being deployed, they are created sequentially, in order from {0..N-1}. Examine the output of the kubectl get command in the first terminal. Eventually, the output will look like the example below.

```
$ microk8s.kubectl get all
$ microk8s.kubectl get pods -w -l app=nginx
```

### Pods in a StatefulSet
Pods in a StatefulSet have a unique ordinal index and a stable network identity.

Examining the Pod’s Ordinal Index
Get the StatefulSet’s Pods.

```
$ microk8s.kubectl get all
$ microk8s.kubectl get pods -l app=nginx
$ microk8s.kubectl logs web-0
$ microk8s.kubectl delete -f web.yaml
$ microk8s.kubectl create -f web.yaml
```

As mentioned in the StatefulSets concept, the Pods in a StatefulSet have a sticky, unique identity. 
This identity is based on a unique ordinal index that is assigned to each Pod by the StatefulSet controller. 
The Pods’ names take the form <statefulset name>-<ordinal index>. 
Since the web StatefulSet has two replicas, it creates two Pods, web-0 and web-1.

### Using Stable Network Identities
Each Pod has a stable hostname based on its ordinal index. Use kubectl exec to execute the hostname command in each Pod.

```
$ microk8s.kubectl get all
$ for i in 0 1; do microk8s.kubectl exec web-$i -- sh -c 'hostname'; done
```