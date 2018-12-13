### URLs
https://classroom.udacity.com/courses/ud615/lessons/7824962412/concepts/81991020770923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master

### Notes

### Commands from video
$ cd /home/aytekoz/go/src/github.com/udacity/ud615/kubernetes

$ cat pods/secure-monolith.yaml

### Create the secure-monolith Pod using kubectl.
$ kubectl create -f pods/secure-monolith.yaml

pod "secure-monolith" created

$ kubectl get pods secure-monolith

NAME              READY     STATUS              RESTARTS   AGE
secure-monolith   0/2       ContainerCreating   0          10s

$ kubectl port-forward secure-monolith 10443:443

Forwarding from 127.0.0.1:10443 -> 443
Forwarding from [::1]:10443 -> 443

$ curl --cacert tls/ca.pem https://127.0.0.1:10443

$ kubectl logs -c nginx secure-monolith

127.0.0.1 - - [13/Dec/2018:16:56:08 +0000] "GET / HTTP/1.1" 200 20 "-" "curl/7.52.1" "-"