* Title:	Configure Access to Multiple Clusters - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/

```
$ mikrok8s.kubectl config --kubeconfig=config-demo set-cluster development --server=https://1.2.3.4 --certificate-authority=fake-ca-file
$ mikrok8s.kubectl config --kubeconfig=config-demo set-cluster scratch --server=https://5.6.7.8 --insecure-skip-tls-verify
```

```
$ mikrok8s.kubectl config --kubeconfig=config-demo set-credentials developer --client-certificate=fake-cert-file --client-key=fake-key-seefile
$ mikrok8s.kubectl config --kubeconfig=config-demo set-credentials experimenter --username=exp --password=some-password
```

```
$ mikrok8s.kubectl config --kubeconfig=config-demo set-context dev-frontend --cluster=development --namespace=frontend --user=developer
$ mikrok8s.kubectl config --kubeconfig=config-demo set-context dev-storage --cluster=development --namespace=storage --user=developer
$ mikrok8s.kubectl config --kubeconfig=config-demo set-context exp-scratch --cluster=scratch --namespace=default --user=experimenter
```

```
$ mikrok8s.kubectl config --kubeconfig=config-demo view
```