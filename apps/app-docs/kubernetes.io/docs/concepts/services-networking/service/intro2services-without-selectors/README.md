- Title: Services - Kubernetes
  - Url: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service

Services generally abstract access to Kubernetes Pods, but they can also abstract other kinds of backends. For example:

- You want to have an external database cluster in production, but in test you use your own databases.
- You want to point your service to a service in another Namespace or on another cluster.
- You are migrating your workload to Kubernetes and some of your backends run outside of Kubernetes.

In any of these scenarios you can define a service without a selector.

Because this service has no selector, the corresponding Endpoints object 
will not be created. You can manually map the service to your own specific endpoints:

