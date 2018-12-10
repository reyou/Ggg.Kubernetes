### URLs
https://classroom.udacity.com/courses/ud615/lessons/7824962412/concepts/82707615750923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses
https://github.com/udacity/ud615/tree/master/app

### Notes

### Use project directory
$ export GOPATH=~/go
$ cd $GOPATH/src/github.com/udacity/ud615/kubernetes
or if you are in the course repository:

$ cd kubernetes

Note: At any time you can clean up by running the cleanup.sh script

### Provision a Kubernetes Cluster with GKE using gcloud
To complete the work in this course you going to need some tools. 
Kubernetes can be configured with many options and add-ons, 
but can be time consuming to bootstrap from the ground up. 
In this section you will bootstrap Kubernetes using Google Container Engine (GKE).

GKE is a hosted Kubernetes by Google. 
GKE clusters can be customized and supports different machine types, 
number of nodes, and network settings.

Use the following command to create your cluster for use for the rest of this course.

$ gcloud container clusters create k0 

WARNING: Accessing a Container Engine cluster requires the kubernetes commandline
client [kubectl]. To install, run
  $ gcloud components update kubectl

ERROR: (gcloud.container.clusters.create) The required property [zone] is not currently set.
It can be set on a per-command basis by re-running your command with the [--zone] flag.

You may set it for your current workspace by running:

  $ gcloud config set compute/zone VALUE

or it can be set temporarily by the environment variable [CLOUDSDK_COMPUTE_ZONE]

### Quickstart for Linux
* https://cloud.google.com/sdk/docs/quickstart-linux

$ curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-227.0.0-linux-x86_64.tar.gz
$ tar zxvf [ARCHIVE_FILE] google-cloud-sdk
