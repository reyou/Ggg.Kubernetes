### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826816435/concepts/81980819470923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### Commands to run on the VM Instance
### Run the first instance
$ sudo docker run -d nginx:1.10.0

### Check if it's up
$ sudo docker ps

### Run a different version of nginx
$ sudo docker run -d nginx:1.9.3

### Run another version of nginx
$ sudo docker run -d nginx:1.10.0

### Check how many instances are running
$ sudo docker ps
$ sudo ps aux | grep nginx

### linux - What does aux mean in `ps aux`? - Unix & Linux Stack Exchange
https://unix.stackexchange.com/questions/106847/what-does-aux-mean-in-ps-aux
a = show processes for all users
u = display the process's user/owner
x = also show processes not attached to a terminal


### What's with the container names?
If you don't specify a name, Docker gives a container a random name, such as "stoic_williams," 
"sharp_bartik," "awesome_murdock," or "evil_hawking." (Stephen Hawking got no love on this one.)

These are generated from a list of adjectives and names of famous scientists and hackers. 
The combination of the names and adjectives is random, except for one case. 
Want to see what the exception is? Check it out in the Docker source code!
