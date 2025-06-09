---
title: "结构型 - 代理模式"
date: 2025-05-13T16:58:26+08:00
lastmod: 2025-05-13T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "代理模式（Proxy）是一种结构型设计模式，让你能够提供对象的替代品或其占位符。代理控制着对于原对象的访问，并允许在将请求提交给对象前后进行一些处理。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
代理模式是一种结构型设计模式，它允许一个对象（代理对象）控制另一个对象的访问。代理对象通常充当客户端和实际对象之间的中介，用于对实际对象的访问进行控制、监控或其他目的。

## 类图
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

## 代码实现
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

## 优缺点
优点：
1. 符合**开闭原则**，你可以在不对服务或客户端做出修改的情况下创建新代理。
2. 可以灵活地隐藏被代理对象的部分功能和服务，也增加额外的功能和服务。

缺点：
1. 由于在客户端和真实主题之间增加了代理对象，因此有些类型的代理模式可能会造成请求的处理速度变慢。
2. 代码可能会变得复杂， 因为需要新建许多类。

## 适用场景
1. 不想或者不能直接引用一个对象时
> 比如如在移动端加载网页信息时，因为下载真实大图比较耗费流量和性能，可以用一个小图代替进行渲染（用一个代理对象去下载小图），在真正点击图片时，才去下载大图，显示大图效果。还有 HTML 中的占位符，其实也是代理的思想。
2. 想对一个对象的功能进行加强时
> 如在字体（Font）渲染时，对粗体（BoldFont）进行渲染时，可使用字体 Font 对象进行代理，只要在对 Font 进行渲染后，进行一步加粗的操作即可。
3. 各种特殊用途的代理：远程代理、虚拟代理、Copy-on-Write 代理、保护（Protect or Access）代理、Cache 代理、防火墙（Firewall）代理、同步化（Synchronization）代理、智能引用（Smart Reference）代理。