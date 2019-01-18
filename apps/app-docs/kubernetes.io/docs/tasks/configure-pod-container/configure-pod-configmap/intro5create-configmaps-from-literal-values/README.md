- Title: Configure a Pod to Use a ConfigMap - Kubernetes
  - Url: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/

You can use kubectl create configmap with the --from-literal argument to define a literal value from the command line:

```
$ microk8s.kubectl create configmap special-config --from-literal=special.how=very --from-literal=special.type=charm
```
