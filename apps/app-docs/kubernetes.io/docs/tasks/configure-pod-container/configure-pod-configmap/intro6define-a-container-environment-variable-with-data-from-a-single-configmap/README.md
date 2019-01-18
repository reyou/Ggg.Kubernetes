- Title: Configure a Pod to Use a ConfigMap - Kubernetes
  - Url: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/

Define an environment variable as a key-value pair in a ConfigMap:

```
$ microk8s.kubectl create configmap special-config --from-literal=special.how=very
```

Assign the special.how value defined in the ConfigMap to the SPECIAL_LEVEL_KEY environment variable in the Pod specification.

```
$ microk8s.kubectl edit pod dapi-test-pod
```
