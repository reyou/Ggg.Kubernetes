### URLs
https://classroom.udacity.com/courses/ud615/lessons/7824962412/concepts/81991020680923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://console.cloud.google.com/kubernetes/list?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

Explore config file
$ cat pods/monolith.yaml

Create the monolith pod
$ kubectl create -f pods/monolith.yaml

pod "monolith" created

Examine pods
$ kubectl get pods

NAME                     READY     STATUS    RESTARTS   AGE
monolith                 1/1       Running   0          18s
nginx-68c5b54745-wx9vp   1/1       Running   0          26m

It may take a few seconds before the monolith pod is up and running as the monolith container image needs to be pulled from the Docker Hub before we can run it.

Use the kubectl describe command to get more information about the monolith pod.

$ kubectl describe pods monolith

      -health=0.0.0.0:81
      -secret=secret
    State:          Running
      Started:      Wed, 12 Dec 2018 23:42:02 -0500
    Ready:          True
    Restart Count:  0
    Limits:
      cpu:     200m
      memory:  10Mi
    Requests:
      cpu:        200m
      memory:     10Mi
    Environment:  <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-69fl2 (ro)
Conditions:
  Type           Status
  Initialized    True
  Ready          True
  PodScheduled   True
Volumes:
  default-token-69fl2:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-69fl2
    Optional:    false
QoS Class:       Guaranteed
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason                 Age   From                                        Message
  ----    ------                 ----  ----                                        -------
  Normal  Scheduled              1m    default-scheduler                           Successfully assigned monolith to gke-k0-default-pool-5ea7a2eb-h4sk
  Normal  SuccessfulMountVolume  1m    kubelet, gke-k0-default-pool-5ea7a2eb-h4sk  MountVolume.SetUp succeeded for volume "default-token-69fl2"
  Normal  Pulling                1m    kubelet, gke-k0-default-pool-5ea7a2eb-h4sk  pulling image "udacity/example-monolith:1.0.0"
  Normal  Pulled                 1m    kubelet, gke-k0-default-pool-5ea7a2eb-h4sk  Successfully pulled image "udacity/example-monolith:1.0.0"
  Normal  Created                1m    kubelet, gke-k0-default-pool-5ea7a2eb-h4sk  Created container
  Normal  Started                1m    kubelet, gke-k0-default-pool-5ea7a2eb-h4sk  Started container