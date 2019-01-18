- Title: Configure a Pod to Use a ConfigMap - Kubernetes
  - Url: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/

```
$ microk8s.kubectl create configmap <map-name> <data-source>
$ microk8s.kubectl create configmap game-config --from-file=configure-pod-container/configmap/kubectl/
$ microk8s.kubectl create configmap game-config --from-file=/home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-docs/kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/intro1
```
