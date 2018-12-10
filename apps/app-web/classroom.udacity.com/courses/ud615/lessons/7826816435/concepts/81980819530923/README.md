### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826816435/concepts/81980819470923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### Cloud shell - log into the VM instance
$ gcloud compute ssh ubuntu

### Commands to run (on the VM Instance)
### Install Docker
$ sudo apt-get install docker.io

### Check Docker images
$ sudo docker images

### Pull nginx image
$ sudo docker pull nginx:1.10.0
$ sudo docker images

### Verify the versions match
$ sudo dpkg -l | grep nginx

### If your version of nginx from native package and Docker are different, you need to update the VM instance:
$ sudo apt-get update
$ sudo apt-get install nginx

dpkg is the software at the base of the package management system in the free operating system Debian and its numerous derivatives. 
dpkg is used to install, remove, and provide information about .deb packages. dpkg (Debian Package) itself is a low level tool.
