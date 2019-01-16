#!/bin/bash
echo "Startup Begin"
redis-server /usr/local/etc/redis/redis.conf &
node /app/index.js
echo "Startup End"