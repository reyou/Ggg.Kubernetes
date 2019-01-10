```
$ microk8s.kubectl rollout history deployment.v1.apps/nginx-deployment

deployment.apps/nginx-deployment
REVISION  CHANGE-CAUSE
2         <none>
3         <none>
```

```
$ microk8s.kubectl rollout history deployment.v1.apps/nginx-deployment --revision=2
```

```
$ microk8s.kubectl rollout undo deployment.v1.apps/nginx-deployment
```
