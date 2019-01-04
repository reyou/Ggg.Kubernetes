#!/bin/bash
echo "Startup Begin"
redis-server /usr/local/etc/redis/redis.conf &
# redis-server /usr/local/etc/redis/sentinel.conf --sentinel &
node /app/index.js
echo "Startup End"