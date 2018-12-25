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
VM2/ubuntu-master: http://192.168.1.129:3010/

```
$ redis-cli -h isolated_IP_address ping
$ redis-cli -h 192.168.1.129 (example)
$ redis-cli -h 192.168.1.104 (example)
```

 Open `/etc/redis/redis.conf` with your favorite text editor:

sudo nano /etc/redis/redis.conf
Begin by finding the tcp-keepalive setting and setting it to 60 seconds as the comments suggest. This will help Redis detect networking or service problems:

/etc/redis/redis.conf
. . .
tcp-keepalive 60
. . .

Find the requirepass directive and set it to a strong passphrase. While your Redis traffic should be secure from outside parties, this provides authentication to Redis itself. Since Redis is fast and does not rate limit password attempts, choose a strong, complex passphrase to protect against brute force attempts:

/etc/redis/redis.conf
requirepass your_redis_master_password

Finally, there are a few optional settings you may wish to adjust depending on your usage scenario.

If you do not want Redis to automatically prune older and less used keys as it fills up, you can turn off automatic key eviction:

/etc/redis/redis.conf
maxmemory-policy noeviction

For improved durability guarantees, you can turn on append-only file persistence. This will help minimize data loss in the event of a systems failure at the expense of larger files and slightly slower performance:

/etc/redis/redis.conf
appendonly yes
appendfilename "redis-staging-ao.aof"

When you are finished, save and close the file.

Restart the Redis service to reload our configuration changes:

```
$ sudo systemctl restart redis-server.service
```

### Step 4: Test the Redis Master
Check that you can authenticate using the password you set by starting the Redis client:

```
$ redis-cli
```
First, try a command without authenticating:

```
$ info replication
```

You should get the following response:

```
role:master
connected_slaves:0
master_replid:429e5cf0e87f9707ac8a8a9e2fd8a72070e14d96
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

While you are authenticated, set a test key so that we can check replication later:

```
$ set test 'this key was defined on the master server'
```
Exit back to the operating system shell when you are finished:

```
$ exit
```

Now that we have the master server ready, let's move on to our slave machine.

### Step 5: Configure the Redis Slave
Next, we need to make some changes to allow our slave server to connect to our master instance.

Open /etc/redis/redis.conf on the slave server:

```
$ sudo nano /etc/redis/redis.conf
```

First, find and uncomment the `slaveof` line. 
This directive takes the IP address and port that you use to securely 
contact the master Redis server, separated by a space. 
By default, the Redis server listens on 6379 on the local interface, 
but each of the network security methods modifies the default in some way for 
external parties.

The values you use will depend on the method you used to secure your network traffic:

* isolated network: use the isolated network IP address and Redis port (6379) 
of the master server (for example slaveof isolated_IP_address 6379).

* stunnel or spiped: use the local interface (127.0.0.1) and the port configured to 
tunnel traffic (this would be slaveof 127.0.0.1 8000 if you followed the guide).

* PeerVPN: Use the master server's VPN IP address and the regular 
Redis port (this would be slaveof 10.8.0.1 6379 if you followed the guide).

The general form is:

```
/etc/redis/redis.conf
replicaof ip_to_contact_master port_to_contact_master
```

Next, uncomment and fill out the masterauth line with the password that was set for the Redis master server:

```
/etc/redis/redis.conf
masterauth your_redis_master_password
```

Set a password for your slave server to prevent unauthorized access. 
The same warnings about password complexity apply here:

```
/etc/redis/redis.conf
requirepass your_redis_slave_password
```

### Step 6: Test the Redis Slave and Apply Changes
Before we restart the service to implement our changes, 
let's connect to the local Redis instance on the slave machine 
and verify that the test key is unset:

```
redis-cli
```

Query for the key by typing:

```
get test
```

You should get back the following response:

Redis slave output
(nil)
This indicates that the local Redis instance does not have a key named test. Exit back to the shell by typing:

```
exit
```

Restart the Redis service on the slave to implement these changes:

```
$ sudo systemctl restart redis-server.service
```

This will apply all of the changes we made to the Redis slave configuration file.

Reconnect to the local Redis instance again:

```
$ redis-cli
```

As with the Redis master server, operations should now fail if not authorized:

```
$ get test
```

Once we restarted our Redis service on the slave, replication began immediately.

You can verify this with Redis's info command, which reports information about replication. 
The value of master_host and master_port should match the arguments you used for the slaveof option:

```
$ info replication
```

#### Master
```
role:master
connected_slaves:1
slave0:ip=192.168.1.104,port=6379,state=online,offset=126,lag=1
master_replid:69aaedb056636a25a77f838aca7a6d59e3cdc973
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:126
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:126
```

#### Slave
```
info replication
# Replication
role:slave
master_host:192.168.1.129
master_port:6379
master_link_status:up
master_last_io_seconds_ago:4
master_sync_in_progress:0
slave_repl_offset:140
slave_priority:100
slave_read_only:1
connected_slaves:0
master_replid:69aaedb056636a25a77f838aca7a6d59e3cdc973
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:140
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:140
```

As you can see, the master and slave servers correctly identify one another in their defined relationship.

### Step 7: Promoting a Redis Slave to Master

A primary reason for setting up replication is to handle failures with minimal 
data loss and downtime. Redis slaves can be promoted to master status to handle 
write traffic in the event of a Redis master failure.

#### Promoting a Redis Slave Manually
We can do this manually from the Redis slave server. Log in with the Redis client:

```
$ redis-cli
```

Authenticate using the Redis slave password:

```
$ auth your_redis_slave_password
```

Before promoting the Redis slave, try to overwrite the test key:

```
$ set test 'this key was overwritten on the slave server'

(error) READONLY You can't write against a read only replica.
```

This should fail because, by default, Redis slaves are configured to be 
read-only with the slave-read-only yes option:

To disable replication and promote the current server to master status, 
use the slaveof command with the value of no one:

```
$ slaveof no one

OK
```

Check the replication information again:

```
$ info replication

info replication
# Replication
role:master
connected_slaves:0
master_replid:ddc3735b5d758f8f8bb3f4138b19c16545da2dc4
master_replid2:69aaedb056636a25a77f838aca7a6d59e3cdc973
master_repl_offset:560
second_repl_offset:561
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:560
```
As you can see, the slave is now designated a Redis master.

Try to overwrite the key again, and this time it should succeed:

```
$ set test 'this key was overwritten on the slave server'

OK
```

Keep in mind that since the configuration file still designates this node as a Redis slave, 
if the service is restarted without modifying the configuration, it will resume replication. 
Also note that any settings you used for the Redis master may need to be reapplied here 
(for instance, turning on append-only files or modifying the eviction policy).

If there are any other slaves, point them to the newly promoted master to continue replicating changes. 
This can be done using the slaveof command and the new master's connection information.

To manually resume replication to the original master, point the 
interim master and the slaves back to the original master using the 
slaveof command with the values used in the configuration file:

```
$ replicaof ip_to_contact_master port_to_contact_master
$ replicaof 192.168.1.104 6379

OK
```
If you check the key on the slave again, you should see that the original value has been restored by the Redis master:

```
$ get test

Redis slave output
"this key was defined on the master server"
```

For consistency reasons, all the data on the slave is flushed when it is resynchronized with a master server.

```
$ redis-cli
$ info replication

# Replication
role:slave
master_host:192.168.1.104
master_port:6379
master_link_status:up
master_last_io_seconds_ago:2
master_sync_in_progress:0
slave_repl_offset:741
slave_priority:100
slave_read_only:1
connected_slaves:0
master_replid:ddc3735b5d758f8f8bb3f4138b19c16545da2dc4
master_replid2:69aaedb056636a25a77f838aca7a6d59e3cdc973
master_repl_offset:741
second_repl_offset:561
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:741
```



