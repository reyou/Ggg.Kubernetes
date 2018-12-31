- Title: charts/stable/redis-ha at master · helm/charts
  - Url: https://github.com/helm/charts/tree/master/stable/redis-ha  

```
$ helm install stable/redis-ha
$ helm ls
$ helm delete <release_name>
```

Specify each parameter using the --set key=value[,key=value] argument to helm install. For example,

```
$ helm install \
  --set image=redis \
  --set tag=4.0.11-stretch \
    stable/redis-ha
```
