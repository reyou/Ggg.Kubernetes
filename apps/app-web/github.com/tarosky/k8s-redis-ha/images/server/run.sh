#!/bin/bash

set -eux

echo "GggMessage: /k8s-redis-ha/images/server/run.sh started."
mkdir -p /opt/bin
cp /dig-a /dig-srv /k8s-redis-ha-server /opt/bin
# Ggg Update
echo "GggMessage: folders copied."
cp /redis.template.conf /opt
chmod -R +x /opt/bin
echo "GggMessage: /k8s-redis-ha/images/server/run.sh finished."