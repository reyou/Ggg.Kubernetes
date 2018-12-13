### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826932295/concepts/81891227730923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master

### Notes

$ cd /home/aytekoz/go/src/github.com/udacity/ud615/kubernetes

$ cat deployments/auth.yaml

$ kubectl create -f deployments/auth.yaml

deployment.extensions "auth" created

$ kubectl describe deployments auth

kubectl describe deployments auth.txt

$ kubectl create -f services/auth.yaml

service "auth" created

$ kubectl create -f deployments/hello.yaml

deployment.extensions "hello" created

$ kubectl create -f services/hello.yaml

service "hello" created

$ kubectl create configmap nginx-frontend-conf --from-file=nginx/frontend.conf

configmap "nginx-frontend-conf" created

$ kubectl create -f deployments/frontend.yaml

deployment.extensions "frontend" created

$ kubectl create -f services/frontend.yaml

service "frontend" created

$ kubectl get services frontend

NAME       TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)         AGE
frontend   LoadBalancer   10.51.246.92   35.243.210.235   443:30704/TCP   1m

$ curl -k https://35.243.210.235

### Kubernetes Engine - classroom-udacity-com-courses - Google Cloud Platform
https://i.imgur.com/4XrStdw.png

### Workloads
https://i.imgur.com/UqSsT8o.png