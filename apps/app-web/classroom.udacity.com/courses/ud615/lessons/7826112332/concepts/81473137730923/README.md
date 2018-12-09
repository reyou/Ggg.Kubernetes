### URLs
https://classroom.udacity.com/courses/ud615/lessons/7826112332/concepts/81473137730923
https://console.cloud.google.com/home/dashboard?project=classroom-udacity-com-courses

### Notes
Enable Compute Engine and Container Engine APIs
In order to create the cloud resources required by this workshop, you will need to enable the following APIs using the Google API Console:

Compute Engine API
Container Engine API

Configure Your Cloud Shell Environment
Create two Cloud Shell Sessions and run the following commands to avoid setting the compute zone.

List available time zones:

$ gcloud compute zones list

Set a time zone example:

$ gcloud config set compute/zone europe-west1-d

Note: Cloud Shell comes with an installed Go, but it's not the most recent version, so you should perform the steps below to install the latest Go and set GOPATH.

$ wget https://storage.googleapis.com/golang/go1.6.2.linux-amd64.tar.gz
$ sudo rm -rf /usr/local/go
$ sudo tar -C /usr/local -xzf go1.6.2.linux-amd64.tar.gz
$ echo "export GOPATH=~/go" >> ~/.bashrc
$ source ~/.bashrc

Get the code:

$ mkdir -p $GOPATH/src/github.com/udacity
$ cd $GOPATH/src/github.com/udacity
$ git clone https://github.com/udacity/ud615

Get ready for the next lesson

$ cd ud615/app