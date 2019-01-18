- Title: Configure a Pod to Use a ConfigMap - Kubernetes
  - Url: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/

You can use kubectl create configmap to create a ConfigMap from an individual file, or from multiple files.

For example,

```
$ microk8s.kubectl create configmap game-config-2 --from-file=configure-pod-container/configmap/kubectl/game.properties --from-file=configure-pod-container/configmap/kubectl/ui.properties
```
