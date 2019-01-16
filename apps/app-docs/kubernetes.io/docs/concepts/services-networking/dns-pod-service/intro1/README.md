- Title: DNS for Services and Pods - Kubernetes
  - Url: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-hostname-and-subdomain-fields

If there exists a headless service in the same namespace as the pod and with the same name as the subdomain, the cluster’s KubeDNS Server also returns an A record for the Pod’s fully qualified hostname. For example, given a Pod with the hostname set to “busybox-1” and the subdomain set to “default-subdomain”, and a headless Service named “default-subdomain” in the same namespace, 
the pod will see its own FQDN as 
“busybox-1.default-subdomain.my-namespace.pod.cluster.local”. 
DNS serves an A record at that name, pointing to the Pod’s IP. 
Both pods “busybox1” and “busybox2” can have their distinct A records.

