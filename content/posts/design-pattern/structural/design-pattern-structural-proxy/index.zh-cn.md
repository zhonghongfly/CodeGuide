---
title: "结构型 - 代理模式"
date: 2020-05-13T16:58:26+08:00
lastmod: 2020-05-13T16:58:26+08:00
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

  class Proxy {
    -Service realService
    +Proxy(service: Service)
    +checkAccess()
    +operation()
  }

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

public class Client {
  public static void main(String[] args) {

  }
}
```

## 优缺点

## 适用场景
