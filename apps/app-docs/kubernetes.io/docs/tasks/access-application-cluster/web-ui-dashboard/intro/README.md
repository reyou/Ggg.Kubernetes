* Title:	Web UI (Dashboard) - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/

* Title:	Creating sample user · kubernetes/dashboard Wiki
  * Url:	https://github.com/kubernetes/dashboard/wiki/Creating-sample-user

Now we need to find token we can use to log in. Execute following command:

```
$ microk8s.kubectl apply -f dashboard-adminuser.yaml
$ microk8s.kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
```