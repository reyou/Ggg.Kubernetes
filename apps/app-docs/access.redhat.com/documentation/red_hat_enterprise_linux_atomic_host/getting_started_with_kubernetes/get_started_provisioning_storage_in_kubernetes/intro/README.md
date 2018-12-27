* Title:	Chapter 2. Get Started Provisioning Storage in Kubernetes - Red Hat Customer Portal
  * Url:	https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_atomic_host/7/html/getting_started_with_kubernetes/get_started_provisioning_storage_in_kubernetes

```
// this will be nginx's webroot
$ mkdir /tmp/data01
$ echo 'I love Kubernetes storage!' > /tmp/data01/index.html
```

Create physical volumes by posting them to the API server.

```
$ microk8s.kubectl create -f local-01.yaml
persistentvolume "pv0001" created

$ kubectl get pv
NAME      CAPACITY   ACCESSMODES   STATUS      CLAIM     REASON    AGE
pv0001    10Gi       RWO           Available                       14s
```

### Requesting storage

Create the claim.

```
$ microk8s.kubectl create -f claim-01.yaml
persistentvolumeclaim "myclaim-1" created
```

### Using your claim as a volume
Use pod.yaml to create the pod and the claim, then check that it was all done properly.

```
$ microk8s.kubectl create -f step3-pod.yaml

$ microk8s.kubectl describe pods mypod 
IP:                 10.1.1.23
Mounts:
      /usr/share/nginx/html from mypd (rw)
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-xtrr6 (ro)
```

```
$ curl 10.1.1.23:80
```

url: http://10.1.1.23

