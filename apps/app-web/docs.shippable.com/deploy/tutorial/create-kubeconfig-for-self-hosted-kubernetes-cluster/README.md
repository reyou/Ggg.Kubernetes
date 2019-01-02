### Creating a kubeconfig file for a self-hosted Kubernetes cluster
* Url:	http://docs.shippable.com/deploy/tutorial/create-kubeconfig-for-self-hosted-kubernetes-cluster/

### Step 
```
$ cd /home/aozdemir/Documents/Ggg.GitHub/Ggg.Kubernetes/apps/app-web/docs.shippable.com/deploy/tutorial/create-kubeconfig-for-self-hosted-kubernetes-cluster
$ ls -al $HOME/.kube
$ microk8s.kubectl create -f sa.yaml

serviceaccount/svcs-acct-local created
```

### Step
```
$ microk8s.kubectl describe serviceAccounts svcs-acct-local

Mountable secrets:   svcs-acct-local-token-n7xsv
```

### Step
```
$ microk8s.kubectl describe secrets svcs-acct-local-token-n7xsv

Name:         svcs-acct-local-token-n7xsv
Namespace:    default
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: svcs-acct-local
              kubernetes.io/service-account.uid: 3559cb3c-0eae-11e9-ae3a-0800278b1b3a

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1094 bytes
namespace:  7 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InN2Y3MtYWNjdC1sb2NhbC10b2tlbi1uN3hzdiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJzdmNzLWFjY3QtbG9jYWwiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIzNTU5Y2IzYy0wZWFlLTExZTktYWUzYS0wODAwMjc4YjFiM2EiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGVmYXVsdDpzdmNzLWFjY3QtbG9jYWwifQ.OV_KU4FeG6vDezhnbUlk87OiluuXjIS___QDCrVTOTim1n0ZSwiFAZLwOXDiE8WI4xj1lICnK17QugfcB_AiUTf1UkYZ59LBTFhzZpUmorveQpuQwC8oB_D82mmil_RzNLNoFF5cLrKY-7sUjDeddyXQV0GN7omm0a9SW0JS0zf8xx2ZWzxByimEQTAWWIVqO-7h1w6KApImuaBQP54E8BJa__ygzNMnMFt9fWPBQtu-Lgpms2q1xxzuB9ZtVgSAeFj-p-hWro1J7RUNawfoChQwqaiMctaPj0iMfjuHJnVnZvA1SUXnA5FZSX0Un4_tqGJWJ5VaHkUYuNk5LpDpFw
```

### Step
```
$ microk8s.kubectl config view --flatten --minify > cluster-cert.txt
$ cat cluster-cert.txt
```

### Step
```
$ cp sa-config.yaml $HOME/.kube
$ microk8s.kubectl config --kubeconfig=$HOME/.kube/sa-config set-context svcs-acct-context

Context "svcs-acct-context" created.
```