#!/bin/bash
# https://www.cyberciti.biz/faq/bash-infinite-loop/

clear
while true
do
    echo "All Resources:" 
    echo "----------"
	microk8s.kubectl get all
    
    echo
    echo "Ingress:" 
    echo "----------"
    microk8s.kubectl get ingress
    
    echo
    echo "Persistent Volumes (Storages):" 
    echo "----------"
    microk8s.kubectl get pv

    echo
    echo "Persistent Volume Claims (PVCs):" 
    echo "----------"
    microk8s.kubectl get pvc

    echo
    echo "Storage Classes:" 
    echo "----------"
    microk8s.kubectl get sc
    
    echo
    echo "Certificate Signing Request (CSRs):" 
    echo "----------"
    microk8s.kubectl get csr
    
    echo
    echo "Secrets:" 
    echo "----------"
    microk8s.kubectl get secrets

    echo
    echo "Press [CTRL+C] to stop.."
	sleep 5
    clear
done
