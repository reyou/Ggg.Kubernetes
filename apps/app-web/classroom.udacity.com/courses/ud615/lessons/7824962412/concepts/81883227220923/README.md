### URLs
https://classroom.udacity.com/courses/ud615/lessons/7824962412/concepts/81883227220923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master

### Notes

$ cd /home/aytekoz/go/src/github.com/udacity/ud615/kubernetes

$ cat services/monolith.yaml

$ kubectl create -f services/monolith.yaml

service "monolith" created

$ gcloud compute firewall-rules create allow-monolith-nodeport --allow=tcp:31000

Creating firewall...⠧Created [https://www.googleapis.com/compute/v1/projects/classroom-udacity-com-courses/global/firewalls/allow-monolith-nodeport].
Creating firewall...done.
NAME                     NETWORK  DIRECTION  PRIORITY  ALLOW      DENY  DISABLED
allow-monolith-nodeport  default  INGRESS    1000      tcp:31000        False

$ gcloud compute instances list

NAME                               ZONE        MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
gke-k0-default-pool-e8e47187-kpqf  us-east1-b  n1-standard-1               10.142.0.4   35.185.72.0     RUNNING
ubuntu                             us-east1-b  n1-standard-1               10.142.0.2                   TERMINATED
gke-k0-default-pool-5ea7a2eb-562c  us-east1-c  n1-standard-1               10.142.0.5   35.237.142.55   RUNNING
gke-k0-default-pool-4217e13d-x99h  us-east1-d  n1-standard-1               10.142.0.3   35.237.150.185  RUNNING

$ curl -k 35.237.150.185

curl: (7) Failed to connect to 35.237.150.185 port 80: Connection refused