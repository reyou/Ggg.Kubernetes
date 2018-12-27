* Title:	Volumes - Kubernetes
  * Url:	https://kubernetes.io/docs/concepts/storage/volumes/#configmap

The configMap resource provides a way to inject configuration data into Pods. 
The data stored in a ConfigMap object can be referenced in a volume of type 
configMap and then consumed by containerized applications running in a Pod.

When referencing a configMap object, you can simply provide its name in the 
volume to reference it. You can also customize the path to use for a specific 
entry in the ConfigMap. For example, to mount the log-config ConfigMap onto a 
Pod called configmap-pod, you might use the YAML below:

Caution: You must create a ConfigMap before you can use it.
Note: A Container using a ConfigMap as a subPath 
volume mount will not receive ConfigMap updates.

```
configmap-pod.yaml
```

The log-config ConfigMap is mounted as a volume, and all contents stored in 
its log_level entry are mounted into the Pod at path “/etc/config/log_level”. 
Note that this path is derived from the volume’s mountPath and the path 
keyed with log_level.

