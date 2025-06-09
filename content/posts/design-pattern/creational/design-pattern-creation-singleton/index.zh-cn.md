---
title: "创建型 - 单例模式"
date: 2025-05-02T16:58:26+08:00
lastmod: 2025-05-02T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "单例模式是一种创建型设计模式，让你能够保证一个类只有一个实例，并提供一个访问该实例的全局节点。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
有一些人，你希望是唯一的，程序也一样，有一些类，你希望实例是唯一的。单例就是一个类只能有一个对象（实例），单例就是用来控制某些事物只允许有一个个体，比如在我们生活的世界中，有生命的星球只有一个——地球（至少到目前为止人类所发现的世界中是这样的）。

人如果脚踏两只船，你的生活将会翻船！程序中的部分关键类如果有多个实例，将容易使逻辑混乱，程序崩溃！

## 类图
{{< mermaid >}}
classDiagram
  direction LR
  note for Singleton "单例（Singleton）类声明了一个名为 get­Instance 
  获取实例的静态方法来返回其所属类的一个相同实例"
  class Singleton {
    -Singleton: instance$
    -Singleton()
    +getInstance()$ Singleton
  }
  Clinet --> Singleton : 单例的构造函数必须对客户端（Client）代码隐藏。调用 获取实例方法（getInstance）必须是获取单例对象的唯一方式
{{< /mermaid >}}

## 代码实现
```java
public final class Singleton {
  private static volatile Singleton instance;

  public String value;

  public static Singleton getInstance(String value) {
    Singleton result = instance;
    if (result != null) {
      return result;
    }
    synchronized(Singleton.class) {
      // double check
      if (instance == null) {
        instance = new Singleton(value);
      }
      return instance;
    }
  }
}
```

## 适用场景
1. 如果程序中的某个类对于所有客户端只有一个可用的实例，可以使用单例模式。
2. 项目中的一些全局管理类（Manager）可以用单例来实现。