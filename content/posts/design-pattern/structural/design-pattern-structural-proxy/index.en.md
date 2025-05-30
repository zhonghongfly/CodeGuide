---
title: "Structural - Proxy Pattern"
date: 2020-05-13T16:58:26+08:00
lastmod: 2020-05-13T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Proxy pattern is a structural design pattern that allows you to provide a substitute or placeholder for an object. The proxy controls access to the original object and allows some processing before and after submitting the request to the object."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The proxy pattern is a structural design pattern that allows one object (proxy object) to control access to another object. The proxy object usually acts as an intermediary between the client and the actual object to control, monitor or other purposes.

## Class Diagram
{{< mermaid >}}
classDiagram
  class ServiceInterface {
    <<interface>>
    +operation()
  }

  class Service {
    +operation()
  }
  Service ..|> ServiceInterface

  class Proxy {
    -Service realService
    +Proxy(service: Service)
    +checkAccess()
    +operation()
  }
  Proxy ..|> ServiceInterface
  Proxy --> Service

  Class Client
  Client --> ServiceInterface
{{< /mermaid >}}

## Code Implementation
```java
interface ServiceInterface {
  void operation();
}

class Service implements ServiceInterface {
  @Override
  public void operation() {
    System.out.println("Service operation invoke.");
  }
}

class Proxy implements ServiceInterface {
  private Service realService;

  public Proxy(Service realService) {
    this.realService = realService;
  }

  public boolean checkAccess() {
    return realService != null;
  }

  @Override
  public void operation() {
    System.out.println("Proxy operation invoke.");
    if (checkAccess()) {
      this.realService.operation();
    }
  }
}

public class Client {
  public static void main(String[] args) {
    Service service = new Service();
    Proxy proxy = new Proxy(service);
    proxy.operation();
  }
}
```

## Pros and Cons
Advantages:
1. Comply with the **open-closed principle**, you can create a new proxy without modifying the service or client.
2. It can flexibly hide some functions and services of the proxied object, and also add additional functions and services.

Disadvantages:
1. Because a proxy object is added between the client and the real subject, some types of proxy modes may cause the request processing speed to slow down.
2. The code may become complicated because many new classes need to be created.

## Applicable Scenarios
1. When you don't want to or can't directly reference an object
> For example, when loading web page information on a mobile terminal, because downloading a real large image consumes more traffic and performance, you can use a small image to render it instead (use a proxy object to download the small image). When you actually click on the image, you can download the large image and display the large image effect. There are also placeholders in HTML, which are actually the idea of ​​​​a proxy.
2. When you want to enhance the function of an object
> For example, when rendering a font (Font), when rendering a bold font (BoldFont), you can use the font Font object for proxy. Just perform a bold operation after rendering the Font.
3. Various special-purpose proxies: remote proxy, virtual proxy, Copy-on-Write proxy, protection (Protect or Access) proxy, cache proxy, firewall (Firewall) proxy, synchronization (Synchronization) proxy, smart reference (Smart Reference) proxy.
