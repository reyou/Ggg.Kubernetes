### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826932295/concepts/81891227750923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master

### Notes

$ cd /home/aytekoz/go/src/github.com/udacity/ud615/kubernetes

$ kubectl get replicasets

NAME                  DESIRED   CURRENT   READY     AGE
auth-5c79bb8f47       1         1         1         22m
frontend-5f79fbf477   1         1         1         18m
hello-99c8f48f7       1         1         1         19m
nginx-68c5b54745      1         1         1         14h

$ kubectl get pods -l "app=hello,track=stable"

NAME                    READY     STATUS    RESTARTS   AGE
hello-99c8f48f7-mwff9   1/1       Running   0          19m

$ vim deployments/hello.yaml
https://github.com/udacity/ud615/blob/master/kubernetes/deployments/hello.yaml

change replicas: 3

$ :wq

To quit without saving any changes, type :q! and press Enter .

$ kubectl apply -f deployments/hello.yaml

deployment.extensions "hello" configured

$ kubectl get replicasets

NAME                  DESIRED   CURRENT   READY     AGE
auth-5c79bb8f47       1         1         1         27m
frontend-5f79fbf477   1         1         1         23m
hello-99c8f48f7       3         3         2         24m
nginx-68c5b54745      1         1         1         14h

$ kubectl get pods

NAME                        READY     STATUS    RESTARTS   AGE
auth-5c79bb8f47-x46xk       1/1       Running   0          27m
frontend-5f79fbf477-nvqxc   1/1       Running   0          24m
hello-99c8f48f7-ldzxb       1/1       Running   0          1m
hello-99c8f48f7-mwff9       1/1       Running   0          25m
hello-99c8f48f7-q8qdr       0/1       Pending   0          1m
monolith                    1/1       Running   0          2h
nginx-68c5b54745-2zl24      1/1       Running   0          13h
secure-monolith             2/2       Running   0          1h

$ kubectl describe deployment hello

Replicas:               3 desired | 3 updated | 3 total | 2 available | 1 unavailable

Check "replicas" section.

$ kubectl get services

NAME         TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)         AGE
auth         ClusterIP      10.51.249.56    <none>           80/TCP          27m
frontend     LoadBalancer   10.51.246.92    35.243.210.235   443:30704/TCP   25m
hello        ClusterIP      10.51.252.70    <none>           80/TCP          26m
kubernetes   ClusterIP      10.51.240.1     <none>           443/TCP         16h
monolith     NodePort       10.51.253.156   <none>           443:31000/TCP   1h
nginx        LoadBalancer   10.51.249.61    35.231.150.126   80:31172/TCP    14h

$ curl -k https://35.243.210.235

{"message":"Hello"}