### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826816435/concepts/81980819570923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### Commands to run on the VM Instance
### Install Go
$ wget https://storage.googleapis.com/golang/go1.6.2.linux-amd64.tar.gz
$ rm -rf /usr/local/bin/go
$ sudo tar -C /usr/local -xzf go1.6.2.linux-amd64.tar.gz
$ export PATH=$PATH:/usr/local/go/bin
$ export GOPATH=~/go

### Get the app code
$ mkdir -p $GOPATH/src/github.com/udacity
$ cd $GOPATH/src/github.com/udacity
$ git clone https://github.com/udacity/ud615.git

### Build a static binary of the monolith app
$ cd ud615/app/monolith
$ go get -u
$ go build --tags netgo --ldflags '-extldflags "-lm -lstdc++ -static"'

### Why did you have to build the binary with such an ugly command line?
You have to explicitly make the binary static. 
This is really important in the Docker community right now because alpine 
has a different implementation of libc. 
So your go binary wouldn't have had the lib it needed if it wasn't static. 
You created a static binary so that your application could be self-contained.

### Create a container for the app
Look at the Dockerfile

$ cat Dockerfile

### Build the app container
$ sudo docker build -t monolith:1.0.0 .

### List the monolith image
$ sudo docker images monolith:1.0.0

### Run the monolith container and get it's IP
$ sudo docker run -d monolith:1.0.0
$ sudo docker inspect <container name or cid>
$ sudo docker inspect loving_brattain

or

$ CID=$(sudo docker run -d monolith:1.0.0)
$ CIP=$(sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${CID})

### Test the container
$ curl <the container IP>
or
$ curl $CIP

### Important note on security
If you are tired of typing "sudo" in front of all Docker commands, and confused why a lot of 
examples don't have that, please read the following article about implications on security - 
Why we don't let non-root users run Docker in CentOS, Fedora, or RHEL
http://www.projectatomic.io/blog/2015/08/why-we-dont-let-non-root-users-run-docker-in-centos-fedora-or-rhel/