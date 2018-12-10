### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826816435/concepts/81980819460923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes
Commands from the video
Cloud shell - set compute/zone
Note - Google Cloud shell is an ephemeral instance and will reset 
if you don't use it for more than 30 minutes. 
That is why you might have to set some configuration values again

$ gcloud compute zones list
$ gcloud config set compute/zone <zone>

### Cloud shell - launch a new VM instance
$ gcloud compute instances create ubuntu \
--image-project ubuntu-os-cloud \
--image ubuntu-1604-xenial-v20160420c 

NAME    ZONE        MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP   STATUS
ubuntu  us-east1-b  n1-standard-1               10.142.0.2   35.237.28.61  RUNNING


### Cloud shell - log into the VM instance
$ gcloud compute ssh ubuntu

### VM instance - update packages and install nginx
$ sudo apt-get update
$ sudo apt-get install nginx
$ nginx -v

### VM instance - start nginx
$ sudo systemctl start nginx

### Check that it's running

$ sudo systemctl status nginx

nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2018-12-10 01:31:57 UTC; 15s ago
 Main PID: 3100 (nginx)
   CGroup: /system.slice/nginx.service
           ├─3100 nginx: master process /usr/sbin/nginx -g daemon on; master_process on
           └─3101 nginx: worker process
Dec 10 01:31:57 ubuntu systemd[1]: Starting A high performance web server and a reverse proxy server...
Dec 10 01:31:57 ubuntu systemd[1]: nginx.service: Failed to read PID from file /run/nginx.pid: Invalid argument
Dec 10 01:31:57 ubuntu systemd[1]: Started A high performance web server and a reverse proxy server.
Dec 10 01:32:07 ubuntu systemd[1]: Started A high performance web server and a reverse proxy server.

$ curl http://127.0.0.1

