* Title:	Determine the Reason for Pod Failure - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/debug-application-cluster/determine-reason-pod-failure/


### Display information about the Pod:
```
$ cd /home/aozdemir/Documents/github.com/Ggg.Kubernetes/apps/app-docs/kubernetes.io/docs/tasks/debug-application-cluster/determine-reason-pod-failure/intro/
$ microk8s.kubectl create -f https://k8s.io/examples/debug/termination.yaml
$ microk8s.kubectl get pod termination-demo
$ microk8s.kubectl get pod --output=yaml > getPod.yaml
```

Use a Go template to filter the output so that it includes only the termination message:
Search for last state:

```
$ microk8s.kubectl get pod termination-demo -o go-template="{{range .status.containerStatuses}}{{.lastState.terminated.message}}{{end}}"
```

