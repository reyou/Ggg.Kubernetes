* Title:	Using Source IP - Kubernetes
  * Url:	https://kubernetes.io/docs/tutorials/services/source-ip/

```
$ microk8s.kubectl run source-ip-app --image=k8s.gcr.io/echoserver:1.4

kubectl run --generator=deployment/apps.v1 is DEPRECATED 
and will be removed in a future version. 
Use 
kubectl run --generator=run-pod/v1 
or 
kubectl create instead.
deployment.apps/source-ip-app created
```

```
$ microk8s.kubectl expose deployment source-ip-app --name=clusterip --port=80 --target-port=8080 

service/clusterip exposed
```

And hitting the ClusterIP from a pod in the same cluster:

```
$ microk8s.kubectl run busybox -it --image=busybox --restart=Never --rm
```

As of Kubernetes 1.5, packets sent to Services with Type=NodePort 
are source NAT’d by default. You can test this by creating a NodePort Service:

```
$ microk8s.kubectl expose deployment source-ip-app --name=nodeport --port=80 --target-port=8080 --type=NodePort
service/nodeport exposed
```

Set the service.spec.externalTrafficPolicy field as follows:

```
$ microk8s.kubectl patch svc nodeport -p '{"spec":{"externalTrafficPolicy":"Local"}}'

service/nodeport patched
```

Now, re-run the test:

```
$ NODEPORT=$(microk8s.kubectl  get -o jsonpath="{.spec.ports[0].nodePort}" services nodeport)
$ NODES=$(microk8s.kubectl  get nodes -o jsonpath='{ $.items[*].status.addresses[?(@.type=="ExternalIP")].address }')
$ for node in $NODES; do curl --connect-timeout 1 -s $node:$NODEPORT | grep -i client_address; done
```

You can test this by exposing the source-ip-app through a loadbalancer

```
$ microk8s.kubectl expose deployment source-ip-app --name=loadbalancer --port=80 --target-port=8080 --type=LoadBalancer
```

You can test this by setting the annotation:

```
$ microk8s.kubectl patch svc loadbalancer -p '{"spec":{"externalTrafficPolicy":"Local"}}'
```

You should immediately see the service.spec.healthCheckNodePort field allocated by Kubernetes:

```
$ microk8s.kubectl get svc loadbalancer -o yaml | grep -i healthCheckNodePort
```

The service.spec.healthCheckNodePort field points to a port on every node serving the health check at /healthz. You can test this:

```
$ microk8s.kubectl get pod -o wide -l run=source-ip-app
```

### Cleaning up
Delete the Services:

```
$ microk8s.kubectl delete svc -l run=source-ip-app

service "clusterip" deleted
service "loadbalancer" deleted
service "nodeport" deleted
```

Delete the Deployment, ReplicaSet and Pod:

```
$ microk8s.kubectl delete deployment source-ip-app

deployment.extensions "source-ip-app" deleted
```