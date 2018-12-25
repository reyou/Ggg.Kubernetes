* Title:	How To Configure Redis Replication on Ubuntu 16.04 | DigitalOcean
  * Url:	https://www.digitalocean.com/community/tutorials/how-to-configure-redis-replication-on-ubuntu-16-04

### Step 1: Install Redis
To get started, we will install Redis on both the master and slave servers.

```
$ sudo apt-add-repository ppa:chris-lea/redis-server
```
Next, update the server's local package index and install the Redis server package by typing:

```
$ sudo apt-get update
$ sudo apt-get install redis-server
$ redis-cli ping
```

### Step 2: Secure Traffic Between the Two Servers
#### If Redis Is Deployed to an Isolated Network...
If your servers are operating in an isolated network, 
you probably only need to adjust Redis's configuration 
file to bind to your isolated network IP address.

Open the Redis configuration file on each computer:

```
$ sudo nano /etc/redis/redis.conf
```

Find the bind line and append the server's own isolated network IP address:
```
/etc/redis/redis.conf
bind 127.0.0.1 isolated_IP_address
```

Save and close the file. Restart the service by typing:

```
$ sudo systemctl restart redis-server.service
```

Open up access to the Redis port:

```
$ sudo ufw allow 6379
```

You should now be able to access one server from the other by 
provide the alternate server's IP address to the 
redis-cli command with the -h flag:

VM1/lite: http://192.168.1.104:3010/
VM2/ubuntu: http://192.168.1.129:3010/

```
$ redis-cli -h isolated_IP_address ping
$ redis-cli -h 192.168.1.129 (example)
$ redis-cli -h 192.168.1.104 (example)
```

Example:

```
```

