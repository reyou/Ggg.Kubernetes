* Title:	Example: Deploying WordPress and MySQL with Persistent Volumes - Kubernetes
  * Url:	https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/

### Deploy MySQL
```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-docs/kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent
-volume/intro/
$ microk8s.kubectl delete -f mysql-deployment.yaml
$ microk8s.kubectl create -f mysql-deployment.yaml 

service/wordpress-mysql created
persistentvolumeclaim/mysql-pv-claim created
deployment.apps/wordpress-mysql created
```

Create the Secret object from the following command. You will need to replace YOUR_PASSWORD with the password you want to use.

```
$ microk8s.kubectl create secret generic mysql-pass --from-literal=password=YOUR_PASSWORD
$ microk8s.kubectl get secrets
```

### Deploy WordPress

```
$ microk8s.kubectl delete -f wordpress-deployment.yaml
$ microk8s.kubectl create -f wordpress-deployment.yaml

service/wordpress created
persistentvolumeclaim/wp-pv-claim created
deployment.apps/wordpress created
```

Minikube can only expose Services through NodePort. The EXTERNAL-IP is always pending.

```
$ microk8s.kubectl expose deployment wordpress --type=NodePort --name wordpressnodeport
```

### Cleaning up

Run the following command to delete your Secret:

```
$ microk8s.kubectl delete secret mysql-pass
```

Run the following commands to delete all Deployments and Services:
```
$ microk8s.kubectl delete deployment -l app=wordpress
$ microk8s.kubectl delete service -l app=wordpress
```

Run the following commands to delete the PersistentVolumeClaims. The dynamically provisioned PersistentVolumes will be automatically deleted.

```
$ microk8s.kubectl delete pvc -l app=wordpress
```