- Title: DNS for Services and Pods - Kubernetes
  - Url: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-config

When the Pod above is created, the container test gets the following contents in its /etc/resolv.conf file:

```
nameserver 1.2.3.4
search ns1.svc.cluster.local my.dns.search.suffix
options ndots:2 edns0
```

For IPv6 setup, search path and name server should be setup like this:

```
\$ kubectl exec -it dns-example -- cat /etc/resolv.conf
nameserver fd00:79:30::a
search default.svc.cluster.local svc.cluster.local cluster.local
options ndots:5
```
