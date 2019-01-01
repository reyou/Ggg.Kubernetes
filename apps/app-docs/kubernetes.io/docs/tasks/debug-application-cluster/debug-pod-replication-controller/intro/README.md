* Title:	Debug Pods and ReplicationControllers - Kubernetes
  * Url:	https://kubernetes.io/docs/tasks/debug-application-cluster/debug-pod-replication-controller/

The first step in debugging a pod is taking a look at it. Check the current state of the pod and recent events with the following command:

```
$ microk8s.kubectl describe pods ${POD_NAME}
```

You can check node capacities with the kubectl get nodes -o <format> command. Here are some example command lines that extract just the necessary information:

```
$ microk8s.kubectl get nodes -o yaml | grep '\sname\|cpu\|memory'
$ microk8s.kubectl get nodes -o json | jq '.items[] | {name: .metadata.name, cap: .status.capacity}'
```

First, take a look at the logs of the current container:
```
$ microk8s.kubectl logs ${POD_NAME} ${CONTAINER_NAME}
$ microk8s.kubectl logs cockroachdb-0
```

If your container has previously crashed, 
you can access the previous container’s crash log with:
```
$ microk8s.kubectl logs --previous ${POD_NAME} ${CONTAINER_NAME}
```

Alternately, you can run commands inside that container with exec:
Note: -c ${CONTAINER_NAME} is optional. 
You can omit it for pods that only contain a single container.
```
$ microk8s.kubectl exec ${POD_NAME} -c ${CONTAINER_NAME} -- ${CMD} ${ARG1} ${ARG2} ... ${ARGN}
$ microk8s.kubectl exec cassandra -- cat /var/log/cassandra/system.log
$ microk8s.kubectl exec cockroachdb-0 -- cat /var/log/cassandra/system.log
```

You can also use 

```
$ microk8s.kubectl describe rc ${CONTROLLER_NAME} 
```
to inspect events related to the replication controller.




