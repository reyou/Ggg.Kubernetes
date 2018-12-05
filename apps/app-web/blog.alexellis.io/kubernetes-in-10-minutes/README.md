### URLs
https://blog.alexellis.io/kubernetes-in-10-minutes/

### Setup
$ sudo apt-get update \
  && sudo apt-get install -y apt-transport-https \
  && curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

$ echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" \
  | sudo tee -a /etc/apt/sources.list.d/kubernetes.list \
  && sudo apt-get update 

Now update your packages list with 

$ sudo apt-get update

CNI stands for Container Networking Interface which is a spec that defines how network drivers should interact with Kubernetes

$ sudo apt-get update \
  && sudo apt-get install -y \
  kubelet \
  kubeadm \
  kubernetes-cni

Swap must be disabled
You can check if you have swap enabled by typing in

$ sudo cat /proc/swaps

You can find your private/datacenter IP address through ifconfig:

$ sudo ifconfig 

You must replace --apiserver-advertise-address with the IP of your host.
https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/

$ sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=10.80.75.9 --kubernetes-version stable-1.8

$ sudo kubeadm init 

Your Kubernetes master has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  $ mkdir -p $HOME/.kube
  $ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  $ sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of machines by running the following on each node
as root:

  kubeadm join 192.168.1.143:6443 --token 1e7qjo.5txpwlsxx09q2k73 --discovery-token-ca-cert-hash sha256:da3b9bad32f56620a2437018c01a1a7633a3339cdc8062a428a9a53ea679e5e3

$ cd $HOME
$ sudo whoami

$ sudo cp /etc/kubernetes/admin.conf $HOME/
$ sudo chown $(id -u):$(id -g) $HOME/admin.conf
$ export KUBECONFIG=$HOME/admin.conf

$ echo "export KUBECONFIG=$HOME/admin.conf" | tee -a ~/.bashrc

We will now apply configuration to the cluster using kubectl and two entries from the flannel docs:

$ kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

serviceaccount "flannel" created
configmap "kube-flannel-cfg" created
daemonset "kube-flannel-ds" created

$ kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/k8s-manifests/kube-flannel-rbac.yml
clusterrole "flannel" created
clusterrolebinding "flannel" created

Kubernetes is about multi-host clustering - so by default containers cannot run on master nodes in the cluster. Since we only have one node - we'll taint it so that it can run containers for us.

$ kubectl taint nodes --all node-role.kubernetes.io/master-

Check it's working
Many of the Kubernetes components run as containers on your cluster in a hidden namespace called kube-system. You can see whether they are working like this:

$ kubectl get all --namespace=kube-system

First check you have no pods (containers) running with:

$ kubectl get pods

Now use kubectl run to deploy a container. We'll deploy a Node.js and Express.js microservice that generates GUIDs over HTTP.

$ kubectl run guids --image=alexellis2/guid-service:latest --port 9000

You'll now be able to see the Name assigned to the new Pod and when it gets started up:

$ kubectl get pods

Use the Name to check on the pod:

$ kubectl describe pod guids-68898f7dc9-p5kdf

TODO: Since above command gives error, could not complete the exercise.