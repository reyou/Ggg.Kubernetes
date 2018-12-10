### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826816435/concepts/82400814760923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### Create docker images for the remaining microservices - auth and hello.
Repeat the steps you took for monolith.

### Build the auth app
$ cd $GOPATH/src/github.com/udacity/ud615/app
$ cd auth
$ go build --tags netgo --ldflags '-extldflags "-lm -lstdc++ -static"'
$ sudo docker build -t auth:1.0.0 .
$ CID2=$(sudo docker run -d auth:1.0.0)

### Build the hello app

$ cd $GOPATH/src/github.com/udacity/ud615/app
$ cd hello
$ go build --tags netgo --ldflags '-extldflags "-lm -lstdc++ -static"'
$ sudo docker build -t hello:1.0.0 .
$ CID3=$(sudo docker run -d hello:1.0.0)

### See the running containers
$ sudo docker ps -a
