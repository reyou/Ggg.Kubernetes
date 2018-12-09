### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826112332/concepts/81957124760923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes
Shell 1 - build and run the hello service
$ cd $GOPATH/src/github.com/udacity/ud615/app
$ go build -o ./bin/hello ./hello
$ sudo ./bin/hello -http 0.0.0.0:10082

Shell 2 - build and run the auth service
$ cd $GOPATH/src/github.com/udacity/ud615/app
$ go build -o ./bin/auth ./auth
$ sudo ./bin/auth -http :10090 -health :10091

Shell 3 - interact with the auth and hello microservices
$ TOKEN=$(curl 127.0.0.1:10090/login -u user | jq -r '.token') curl -H "Authorization:  Bearer $TOKEN" http://127.0.0.1:10082/secure

$ TOKEN=$(curl 127.0.0.1:10090/login -u user | jq -r '.token') curl -H "Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE1NDQ1OTE2MTEsImlhdCI6MTU0NDMzMjQxMSwiaXNzIjoiYXV0aC5zZXJ2aWNlIiwic3ViIjoidXNlciJ9.B7CTDjXdWmUmDy8t5Uh4ruD76TWKZsoVCMNFt76bdbs" http://127.0.0.1:10082/secure

