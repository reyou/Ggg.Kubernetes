### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826816435/concepts/81980819550923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### List all running container processes
$ sudo docker ps

For use in shell scripts you might want to just get a list of container IDs 
(-a stands for all instances, not just running, and -q is for "quiet" - show just the numeric ID):

$ sudo docker ps -aq

### Inspect the container
You can use either CONTAINER ID or NAMES field, for example for a sudo docker ps output like this:

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
f86cf066c304        nginx:1.10.0        "nginx -g 'daemon off"   8 minutes ago       Up 8 minutes        80/tcp, 443/tcp     sharp_bartik

You can use either of the following commands:

$ sudo docker inspect 7550c76d7645
or
$ sudo docker inspect sharp_bartik

### Connect to the nginx using the internal IP
Get the internal IP address either copying from the full inspect file or by assigning it to a shell variable:

$ CN="xenodochial_khorana"
$ CIP=$(sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' $CN)
$ curl  http://$CIP

### You can also get all instance IDs and their corresponding IP addresses by doing this:

$ sudo docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress }}' $(sudo docker ps -aq)

### Stop an instance
$ sudo docker stop <cid>
$ sudo docker stop 7550c76d7645
or 
$ sudo docker stop $(sudo docker ps -aq)

### Verify no more instances running
$ sudo docker ps

### Remove the docker containers from the system
$ sudo docker rm <cid>
or 
$ sudo docker rm $(sudo docker ps -aq)