### URLs
https://classroom.udacity.com/courses/ud615/lessons/7824962412/concepts/81991020790923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

$ cd /home/aytekoz/go/src/github.com/udacity/ud615/kubernetes

$ kubectl get pods -l "app=monolith"

NAME              READY     STATUS    RESTARTS   AGE
monolith          1/1       Running   0          57m
secure-monolith   2/2       Running   0          29m

$ kubectl get pods -l "app=monolith,secure=enabled"

No resources found.

$ kubectl describe pods secure-monolith | grep Labels

Labels:       app=monolith

$ kubectl label pods secure-monolith "secure=enabled"

pod "secure-monolith" labeled

$ kubectl describe pods secure-monolith | grep Labels

Labels:       app=monolith
              secure=enabled

$ kubectl describe services monolith | grep Endpoints

Endpoints:                10.48.18.5:443

$ gcloud compute instance list

NAME                               ZONE        MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
gke-k0-default-pool-e8e47187-kpqf  us-east1-b  n1-standard-1               10.142.0.4   35.185.72.0     RUNNING
ubuntu                             us-east1-b  n1-standard-1               10.142.0.2                   TERMINATED
gke-k0-default-pool-5ea7a2eb-562c  us-east1-c  n1-standard-1               10.142.0.5   35.237.142.55   RUNNING
gke-k0-default-pool-4217e13d-x99h  us-east1-d  n1-standard-1               10.142.0.3   35.237.150.185  RUNNING

$ curl -k https://35.237.150.185:31000
 
 {"message":"Hello"}

### Kubernetes Engine - classroom-udacity-com-courses - Google Cloud Platform
https://i.imgur.com/FpT8abl.png