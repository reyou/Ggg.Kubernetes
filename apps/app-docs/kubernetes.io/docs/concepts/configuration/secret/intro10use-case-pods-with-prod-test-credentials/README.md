- Title: Secrets - Kubernetes
  - Url: https://kubernetes.io/docs/concepts/configuration/secret/

This example illustrates a pod which consumes a secret containing prod credentials and another pod which consumes a secret with test environment credentials.

Make the secrets:

```
$ kubectl create secret generic prod-db-secret --from-literal=username=produser --from-literal=password=Y4nys7f11
secret "prod-db-secret" created
```

```
$ kubectl create secret generic test-db-secret --from-literal=username=testuser --from-literal=password=iluvtests
secret "test-db-secret" created
```

Both containers will have the following files present on their filesystems with the values for each container’s environment:

```
/etc/secret-volume/username
/etc/secret-volume/password
```
