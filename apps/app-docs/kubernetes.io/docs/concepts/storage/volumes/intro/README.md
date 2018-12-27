* Title:	Volumes - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/volumes/

On-disk files in a Container are ephemeral, which presents some problems for 
non-trivial (important) applications when running in Containers. 
First, when a Container crashes, kubelet will restart it, but the files will be lost - 
the Container starts with a clean state. Second, when running Containers together in a 
Pod it is often necessary to share files between those Containers. 
The Kubernetes Volume abstraction solves both of these problems.

Familiarity with Pods is suggested.

To use a volume, a Pod specifies what volumes to provide for the 
Pod (the .spec.volumes field) and where to mount those into Containers 
(the .spec.containers.volumeMounts field).

Volumes can not mount onto other volumes or have hard links to other volumes. 
Each Container in the Pod must independently specify where to mount each volume.


