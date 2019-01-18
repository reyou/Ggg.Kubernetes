- Title: Configure a Pod to Use a ConfigMap - Kubernetes
  - Url: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/

Use the option --from-env-file to create a ConfigMap from an env-file, for example:

```
$ microk8s.kubectl create configmap game-config-env-file --from-env-file=game-env-file.properties
```
