- Title: Configure a Pod to Use a ConfigMap - Kubernetes
  - Url: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/

You can define a key other than the file name to use in the data section of your ConfigMap when using the --from-file argument:

```
$ microk8s.kubectl create configmap game-config-3 --from-file=<my-key-name>=<path-to-file>
```

where <my-key-name> is the key you want to use in the ConfigMap and
<path-to-file> is the location of the data source file you want the key to represent.

For example:

```
$ microk8s.kubectl create configmap game-config-3 --from-file=game-special-key=game.properties

$ microk8s.kubectl get configmaps game-config-3 -o yaml
```
