- Title: Connecting Applications with Services - Kubernetes
  - Url: https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/

This makes it accessible from any node in your cluster. Check the nodes the Pod is running on:

```
$ microk8s.kubectl create -f ./run-my-nginx.yaml
$ microk8s.kubectl get pods -l run=my-nginx -o wide
NAME                        READY     STATUS    RESTARTS   AGE       IP            NODE
my-nginx-3800858182-jr4a2   1/1       Running   0          13s       10.244.3.4    kubernetes-minion-905m
my-nginx-3800858182-kna2y   1/1       Running   0          13s       10.244.2.5    kubernetes-minion-ljyd
```

Check your pods’ IPs:

```
$ microk8s.kubectl get pods -l run=my-nginx -o yaml | grep podIP
    podIP: 10.244.3.4
    podIP: 10.244.2.5
```

### SSH into pod

```
$ microk8s.kubectl exec -it <pod-name> -- /bin/bash
$ microk8s.kubectl exec -it my-nginx-64fc468bd4-kbn85 -- /bin/bash
```