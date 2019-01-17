- Title: Secrets - Kubernetes
  - Url: https://kubernetes.io/docs/concepts/configuration/secret/

The kubectl create secret command packages these files into a Secret and creates the object on the Apiserver.

```
$ microk8s.kubectl create secret generic db-user-pass --from-file=./username.txt --from-file=./password.txt
secret "db-user-pass" created
```
