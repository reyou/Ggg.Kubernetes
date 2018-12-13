### URLs
https://classroom.udacity.com/courses/ud615/lessons/7824962412/concepts/82707615750923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master

### Notes

Commands from video
$ ls tls

The cert.pem and key.pem files will be used to secure traffic on the monolith server 
and the ca.pem will be used by HTTP clients as the CA to trust. Since the certs being 
used by the monolith server where signed by the CA represented by ca.pem, 
HTTP clients that trust ca.pem will be able to validate the SSL connection 
to the monolith server.

### Use kubectl
to create the tls-certs secret from the TLS certificates stored under the tls directory:
$ kubectl create secret generic tls-certs --from-file=tls/

secret "tls-certs" created

kubectl will create a key for each file in the tls directory under 
the tls-certs secret bucket. Use the kubectl describe command to verify that:

$ kubectl describe secrets tls-certs

Name:         tls-certs
Namespace:    default
Labels:       <none>
Annotations:  <none>
Type:  Opaque
Data
====
ca-key.pem:               1675 bytes
ca.pem:                   1099 bytes
cert.pem:                 1253 bytes
key.pem:                  1679 bytes
ssl-extensions-x509.cnf:  275 bytes
update-tls.sh:            610 bytes

Next we need to create a configmap entry for the proxy.conf nginx 
configuration file using the kubectl create configmap command:

$ kubectl create configmap nginx-proxy-conf --from-file=nginx/proxy.conf

configmap "nginx-proxy-conf" created

Use the kubectl describe configmap command to get more details about the nginx-proxy-conf configmap entry:

$ kubectl describe configmap nginx-proxy-conf
Namespace:    default

Labels:       <none>
Annotations:  <none>

Data
====
proxy.conf:
----
server {
  listen 443;
  ssl    on;

  ssl_certificate     /etc/tls/cert.pem;
  ssl_certificate_key /etc/tls/key.pem;

  location / {
    proxy_pass http://127.0.0.1:80;
  }
}

Events:  <none>

TLS and SSL
TLS and SSL can be confusing topics. 
Here’s a good primer for understanding the basics: https://en.wikipedia.org/wiki/Transport_Layer_Security