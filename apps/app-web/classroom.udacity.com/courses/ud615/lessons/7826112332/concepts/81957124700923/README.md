### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826112332/concepts/81473137730923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses

### Notes
Commands to run
On shell 1 - build the app:
Make sure you are in the app directory and build the app:

url: https://console.cloud.google.com/iam-admin/iam?project=classroom-udacity-com-courses

$ cd $GOPATH/src/github.com/udacity/ud615/app
$ mkdir bin
$ go build -o ./bin/monolith ./monolith

Optional - if you run into errors building your go binaries, you probably need to install the dependencies first by running:
$ go get -u 

On shell 1 - run the monolith server:
$ sudo ./bin/monolith -http :10080

On shell 2 - test the app:
$ curl http://127.0.0.1:10080
$ curl http://127.0.0.1:10080/secure

On shell 2 - authenticate (password is password):
$ curl http://127.0.0.1:10080/login -u user

It prints out the token.

Enter host password for user 'user':
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE1NDQ1OTE2MTEsImlhdCI6MTU0NDMzMjQxMSwiaXNzIjoiYXV0aC5zZXJ2aWNlIiwic3ViIjoidXNlciJ9.B7CTDjXdWmUmDy8t5Uh4ruD76TWKZsoVCMNFt76bdbs"}

You can copy and paste the long token in to the next command manually, but copying long, wrapped lines in cloud shell is broken. To work around this, you can either copy the JWT token in pieces, or - more easily - by assigning the token to a shell variable as follows

On shell 2 - login and assign the value of the JWT to a variable
$ TOKEN=$(curl http://127.0.0.1:10080/login -u user | jq -r '.token')

Check that it worked:

$ echo $TOKEN

On shell 2 - access the secure endpoint using the JWT:
$ curl -H "Authorization: Bearer $TOKEN" http://127.0.0.1:10080/secure
$ curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE1NDQ1OTE2MTEsImlhdCI6MTU0NDMzMjQxMSwiaXNzIjoiYXV0aC5zZXJ2aWNlIiwic3ViIjoidXNlciJ9.B7CTDjXdWmUmDy8t5Uh4ruD76TWKZsoVCMNFt76bdbs" http://127.0.0.1:10080/secure

{"message":"Hello"}

On shell 2 - check out dependencies
$ ls vendor 
$ cat vendor/vendor.json