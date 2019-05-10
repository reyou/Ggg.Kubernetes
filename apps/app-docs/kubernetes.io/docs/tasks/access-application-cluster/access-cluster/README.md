- Title: Accessing Clusters - Kubernetes
  - Url: https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/

* Title: kubectl Cheat Sheet - Kubernetes
  - Url: https://kubernetes.io/docs/reference/kubectl/cheatsheet/#kubectl-context-and-configuration

```
$ --kubeconfig=/home/aozdemir/Web_Projects/k8s/webmd/staging/admin.conf
$ microk8s.kubectl config view
$ microk8s.kubectl --kubeconfig
$ microk8s.kubectl config get-contexts
$ microk8s.kubectl config use-context webmd-staging
# use multiple kubeconfig files at the same time and view merged config
$ export KUBECONFIG=/home/aozdemir/Web_Projects/k8s/qqq/staging/admin.conf 
$ microk8s.kubectl config view
$ microk8s.kubectl config current-context
```
```
$ microk8s.kubectl config set-context webmd-staging --kubeconfig="/home/aozdemir/Web_Projects/k8s/webmd/staging/admin.conf"
$ kubectl config use-context webmd-staging --kubeconfig="/home/aozdemir/Web_Projects/k8s/webmd/staging/admin.conf"
$ kubectl config set-context mycontext --cluster=microk8s-cluster --user=admin --namespace=my-namespace
```