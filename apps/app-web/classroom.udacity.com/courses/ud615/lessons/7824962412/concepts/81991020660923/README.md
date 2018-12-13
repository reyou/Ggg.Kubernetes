### URLs
https://classroom.udacity.com/courses/ud615/lessons/7824962412/concepts/81991020660923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### Commands from video
### Launch a single instance:
$ kubectl run nginx --image=nginx:1.10.0

deployment.apps "nginx" created

### Get pods
$ kubectl get pods

NAME                     READY     STATUS    RESTARTS   AGE
nginx-68c5b54745-wx9vp   1/1       Running   0          42s

### Expose nginx
$ kubectl expose deployment nginx --port 80 --type LoadBalancer

service "nginx" exposed

#### List services
$ kubectl get services

NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP      10.51.240.1    <none>        443/TCP        1h
nginx        LoadBalancer   10.51.249.61   <pending>     80:31172/TCP   37s

Kubernetes cheat sheet
We just went over a lot and we know you’re probably a little overwhelmed. Fear not! 
We’ll be going over each of these concepts, over the next two lessons. 
And you can always come back to this demo -- if you need to watch it again.

To help out, here’s a Kubernetes command cheat sheet. http://kubernetes.io/docs/user-guide/kubectl-cheatsheet/