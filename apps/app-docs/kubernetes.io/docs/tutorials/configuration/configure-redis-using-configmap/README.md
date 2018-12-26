* Title:	Configuring Redis using a ConfigMap - Kubernetes
  * Url:	https://kubernetes.io/docs/tutorials/configuration/configure-redis-using-configmap/

```
$ microk8s.kubectl version
```

Title:	Redis configuration – Redis  
Url:	https://redis.io/topics/config  

```
$ curl -OL https://k8s.io/examples/pods/config/redis-config
$ microk8s.kubectl create configmap example-redis-config --from-file=redis-config

configmap/example-redis-config created
```

Examine the created ConfigMap:

```
$ microk8s.kubectl get configmap example-redis-config -o yaml

apiVersion: v1
data:
  redis-config: |
    maxmemory 2mb
    maxmemory-policy allkeys-lru
kind: ConfigMap
metadata:
  creationTimestamp: "2018-12-26T19:35:24Z"
  name: example-redis-config
  namespace: default
  resourceVersion: "16049"
  selfLink: /api/v1/namespaces/default/configmaps/example-redis-config
  uid: 63ba8b27-0945-11e9-9404-0800278b1b3a
```

Now create a pod specification that uses the config data stored in the ConfigMap:

Create the pod:

```
$ microk8s.kubectl create -f https://k8s.io/examples/pods/config/redis-pod.yaml
$ microk8s.kubectl get pods
$ microk8s.kubectl describe pod redis
$ microk8s.kubectl delete pods redis
```

In the example, the config volume is mounted at /redis-master. 
It uses path to add the redis-config key to a file named redis.conf. 
The file path for the redis config, therefore, is /redis-master/redis.conf. 
This is where the image will look for the config file for the redis master.

Use kubectl exec to enter the pod and run the redis-cli tool to verify that the configuration was correctly applied:

```
$ microk8s.kubectl exec -it redis redis-cli
```

