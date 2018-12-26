Title:	Helm Docs |
Url:	https://docs.helm.sh/using_helm/#quickstart

```
$ microk8s.kubectl get all

NAME                 TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.152.183.1   <none>        443/TCP   14m
```

Helm will figure out where to install Tiller by reading your Kubernetes configuration file 
(usually $HOME/.kube/config). This is the same file that kubectl uses.

To find out which cluster Tiller would install to, you can run 

```
$ microk8s.kubectl config current-context 

microk8s
```
or 
```
$ microk8s.kubectl cluster-info

Kubernetes master is running at http://127.0.0.1:8080

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

There are two parts to Helm: The Helm client (helm) and the Helm server (Tiller). 

### From Snap (Linux)
The Snap package for Helm is maintained by Snapcrafters.

```
$ sudo snap install helm --classic
```
