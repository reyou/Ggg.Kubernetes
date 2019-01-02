#!/bin/bash
echo "Startup Begin"
redis-server /usr/local/etc/redis/redis.conf &
redis-server /usr/local/etc/redis/sentinel.conf --sentinel 
echo "Startup End"