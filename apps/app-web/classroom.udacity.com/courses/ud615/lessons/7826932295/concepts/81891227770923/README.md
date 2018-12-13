### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826932295/concepts/81891227770923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master

### Notes
https://github.com/udacity/ud615/blob/master/kubernetes/deployments/auth.yaml

$ cd /home/aytekoz/go/src/github.com/udacity/ud615/kubernetes

$ vim deployments/auth.yaml

change containers > image from version 1.0.0 to version 2.0.0

$ kubectl apply -f deployments/auth.yaml

deployment.extensions "auth" configured

$ kubectl describe deployments auth

browse RollingUpdateStrategy, NewReplicaSet
RollingUpdateStrategy:  1 max unavailable, 1 max surge
NewReplicaSet:   auth-65c768f4b4 (1/1 replicas created)

$ kubectl get pods

NAME                        READY     STATUS    RESTARTS   AGE
auth-65c768f4b4-kvpzs       1/1       Running   0          56s
frontend-5f79fbf477-nvqxc   1/1       Running   0          46m
hello-99c8f48f7-ldzxb       1/1       Running   0          23m
hello-99c8f48f7-mwff9       1/1       Running   0          47m
hello-99c8f48f7-q8qdr       0/1       Pending   0          23m
monolith                    1/1       Running   0          2h
nginx-68c5b54745-2zl24      1/1       Running   0          14h
secure-monolith             2/2       Running   0          2h

$ kubectl pods auth-*** (get newest one)
$ kubectl describe pods auth-65c768f4b4-kvpzs  
$ kubectl describe pods auth-65c768f4b4-kvpzs | grep "Image"

Image:          udacity/example-auth:2.0.0