### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826816435/concepts/81980819580923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### See all images
$ sudo docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello               1.0.0               6f97126675df        13 minutes ago      13.3 MB
auth                1.0.0               088da07cdb7a        14 minutes ago      13.3 MB
aozdemir/monolith   1.0.0               ab4f08513553        27 minutes ago      13.4 MB
monolith            1.0.0               ab4f08513553        27 minutes ago      13.4 MB
alpine              3.1                 f36c4228b2c6        2 months ago        5.05 MB
nginx               1.10.0              16666ff3a57f        2 years ago         183 MB
nginx               1.9.3               ea4b88a656c9        3 years ago         133 MB

### Docker tag command help
$ docker tag -h

Flag shorthand -h has been deprecated, please use --help

Usage:  docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE

Options:
      --help   Print usage

### Add your own tag
$ sudo docker tag monolith:1.0.0 <your username>/monolith:1.0.0
$ sudo docker tag monolith:1.0.0 aozdemir/monolith:1.0.0
$ sudo docker tag 088da07cdb7a aozdemir/auth
$ sudo docker tag 6f97126675df aozdemir/hello

### For example (you can rename too!)
$ sudo docker tag monolith:1.0.0 udacity/example-monolith:1.0.0

### Create account on Dockerhub
To be able to push images to Dockerhub you need to create an account there - https://hub.docker.com/register/

### Login and use the docker push command
$ sudo docker login
$ sudo docker push udacity/example-monolith:1.0.0
$ sudo docker push aozdemir/monolith:1.0.0
$ sudo docker push aozdemir/auth
$ sudo docker push aozdemir/hello

Repeat for all images you created - monolith, auth and hello!

url: https://hub.docker.com/