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

### Install From Snap (Linux)
The Snap package for Helm is maintained by Snapcrafters.

```
$ sudo snap install helm --classic
```

Tiller, the server portion of Helm, typically runs inside of your Kubernetes cluster. 
But for development, it can also be run locally, and configured to talk to a 
remote Kubernetes cluster.

The easiest way to install tiller into the cluster is simply to run 

```
$ helm init

Creating /root/.helm
Creating /root/.helm/repository
Creating /root/.helm/repository/cache
Creating /root/.helm/repository/local
Creating /root/.helm/plugins
Creating /root/.helm/starters
Creating /root/.helm/cache/archive
Creating /root/.helm/repository/repositories.yaml
Adding stable repo with URL: https://kubernetes-charts.storage.googleapis.com
Adding local repo with URL: http://127.0.0.1:8879/charts
$HELM_HOME has been configured at /root/.helm.

Tiller (the Helm server-side component) has been installed into your Kubernetes Cluster.

Please note: by default, Tiller is deployed with an insecure 'allow unauthenticated users' policy.
To prevent this, run `helm init` with the --tiller-tls-verify flag.
For more information on securing your installation see: https://docs.helm.sh/using_helm/#securing-your-helm-installation
Happy Helming!
``` 

This will validate that helm’s local environment is set up correctly 
(and set it up if necessary). Then it will connect to whatever cluster 
kubectl connects to by default (kubectl config view). Once it connects, 
it will install tiller into the kube-system namespace.

After helm init, you should be able to run 

```
$ microk8s.kubectl get namespaces

NAME          STATUS   AGE
default       Active   30m
kube-public   Active   30m
kube-system   Active   30m
```

```
$ microk8s.kubectl get pods --namespace kube-system 

NAME                             READY   STATUS    RESTARTS   AGE
tiller-deploy-85686555b8-kbkhv   1/1     Running   0          105s
```

and see Tiller running.



