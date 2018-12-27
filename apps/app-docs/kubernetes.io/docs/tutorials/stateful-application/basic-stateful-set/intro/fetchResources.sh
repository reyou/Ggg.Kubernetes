#!/bin/bash
# https://www.cyberciti.biz/faq/bash-infinite-loop/
while true
do
	microk8s.kubectl get all
    echo
    echo "Press [CTRL+C] to stop.."
	sleep 5
    clear
done
