### URLs
https://classroom.udacity.com/courses/ud615/lessons/7824962412/concepts/81991020690923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### Cloud shell 1: set up port-forwarding
$ kubectl port-forward monolith 10080:80

Forwarding from 127.0.0.1:10080 -> 80
Forwarding from [::1]:10080 -> 80

### Open new Cloud Shell session 2
$ curl http://127.0.0.1:10080

$ curl http://127.0.0.1:10080/secure

### Cloud shell 2 - log in
$ curl -u user http://127.0.0.1:10080/login

$ curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE1NDQ5MzU3NTcsImlhdCI6MTU0NDY3NjU1NywiaXNzIjoiYXV0aC5zZXJ2aWNlIiwic3ViIjoidXNlciJ9.-tNuv1KlWDuZALsSVjgyJoKrriPvJ0x5-RZ_bHp9oEk" http://127.0.0.1:10080/secure

### View logs
$ kubectl logs monolith
$ kubectl logs -f monolith

2018/12/13 04:42:02 Starting server...
2018/12/13 04:42:02 Health service listening on 0.0.0.0:81
2018/12/13 04:42:02 HTTP service listening on 0.0.0.0:80
127.0.0.1:54510 - - [Thu, 13 Dec 2018 04:48:44 UTC] "GET / HTTP/1.1" curl/7.52.1
127.0.0.1:54514 - - [Thu, 13 Dec 2018 04:48:51 UTC] "GET /secure HTTP/1.1" curl/7.52.1
127.0.0.1:54532 - - [Thu, 13 Dec 2018 04:49:16 UTC] "GET /login HTTP/1.1" curl/7.52.1
127.0.0.1:54546 - - [Thu, 13 Dec 2018 04:49:49 UTC] "GET /secure HTTP/1.1" curl/7.52.1

In Cloud Shell 3
$ curl http://127.0.0.1:10080

You can use the kubectl exec command to run an interactive shell inside the 
monolith Pod. This can come in handy when you want to troubleshoot 
from within a container:

$ kubectl exec monolith --stdin --tty -c monolith /bin/sh

For example, once we have a shell into the monolith container we can test external connectivity using the ping command.

$ ping -c 3 google.com

PING google.com (172.217.204.139): 56 data bytes
64 bytes from 172.217.204.139: seq=0 ttl=48 time=0.768 ms
64 bytes from 172.217.204.139: seq=1 ttl=48 time=0.393 ms
64 bytes from 172.217.204.139: seq=2 ttl=48 time=0.420 ms
--- google.com ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.393/0.527/0.768 ms

When you’re done with the interactive shell be sure to logout.

$ exit