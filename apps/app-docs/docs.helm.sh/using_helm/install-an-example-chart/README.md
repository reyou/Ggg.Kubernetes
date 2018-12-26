* Title:	Helm Docs |
  * Url:	https://docs.helm.sh/using_helm/#install-an-example-chart

To install a chart, you can run the helm install command. 
Helm has several ways to find and install a chart, 
but the easiest is to use one of the official stable charts.

```
$ helm repo update              # Make sure we get the latest list of charts
$ helm install stable/mysql
```

```
$ microk8s.kubectl get all
```

```
$ netstat --tcp --listen --numeric-ports -p
```

```
$ microk8s.kubectl config view

apiVersion: v1
clusters:
- cluster:
    server: http://127.0.0.1:8080
  name: microk8s-cluster
contexts:
- context:
    cluster: microk8s-cluster
    user: admin
  name: microk8s
current-context: microk8s
kind: Config
preferences: {}
users:
- name: admin
  user:
    username: admin
```

helm ls
Error: Get https://10.152.183.1:443/api/v1/namespaces/kube-system/configmaps?labelSelector=OWNER%!D(MISSING)TILLER: dial tcp 10.152.183.1:443: i/o timeout

Not Working:
https://10.152.183.1:443/api/v1/namespaces/kube-system/configmaps?labelSelector=OWNER%!D(MISSING)TILLER:

Working:
http://127.0.0.1:8080/api/v1/namespaces/kube-system/configmaps?labelSelector=OWNER%!D(MISSING)TILLER: