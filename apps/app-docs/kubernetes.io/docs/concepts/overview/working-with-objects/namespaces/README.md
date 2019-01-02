* Title:	Namespaces - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

To temporarily set the namespace for a request, use the --namespace flag.

```
$ kubectl --namespace=<insert-namespace-name-here> run nginx --image=nginx
$ kubectl --namespace=<insert-namespace-name-here> get pods
```

You can permanently save the namespace for all subsequent kubectl commands in that context.

```
$ kubectl config set-context $(kubectl config current-context) --namespace=<insert-namespace-name-here>
# Validate it
$ kubectl config view | grep namespace:
```

```
$ microk8s.enable dns dashboard

Enabling DNS
Applying manifest
service/kube-dns created
serviceaccount/kube-dns created
configmap/kube-dns created
deployment.extensions/kube-dns created
Restarting kubelet
[sudo] password for aozdemir: 
DNS is enabled
Enabling dashboard
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
secret/kubernetes-dashboard-certs configured
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
serviceaccount/kubernetes-dashboard configured
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
deployment.apps/kubernetes-dashboard configured
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
service/kubernetes-dashboard configured
service/monitoring-grafana created
service/monitoring-influxdb created
service/heapster created
deployment.extensions/monitoring-influxdb-grafana-v4 created
serviceaccount/heapster created
configmap/heapster-config created
configmap/eventer-config created
deployment.extensions/heapster-v1.5.2 created
dashboard enabled
```

When you create a Service, it creates a corresponding DNS entry. 
This entry is of the form <service-name>.<namespace-name>.svc.cluster.local, 
which means that if a container just uses <service-name>, it will resolve to the service 
which is local to a namespace. 

This is useful for using the same configuration across multiple namespaces such as 
Development, Staging and Production. 

If you want to reach across namespaces, you need to use the fully qualified domain name (FQDN).

