### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826816435/concepts/81980819470923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### Cloud shell - log into the VM instance
$ gcloud compute ssh ubuntu

VM instance
Install nginx again

$ sudo apt-get install nginx

Start nginx again and check nginx status

$ sudo systemctl start nginx
$ sudo systemctl status nginx
$ sudo ps aux | grep nginx

Check nginx config file

$ cat /etc/init/nginx.conf

description "nginx - small, powerful, scalable web/proxy server"
start on filesystem and static-network-up
stop on runlevel [016]
expect fork
respawn
pre-start script
        [ -x /usr/sbin/nginx ] || { stop; exit 0; }
        /usr/sbin/nginx -q -t -g 'daemon on; master_process on;' || { stop; exit 0; }
end script
exec /usr/sbin/nginx -g 'daemon on; master_process on;'
pre-stop exec /usr/sbin/nginx -s quit

Stop nginx

$ sudo systemctl stop nginx