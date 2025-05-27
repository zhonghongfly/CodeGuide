---
title: "结构型 - 桥接模式"
date: 2020-05-08T16:58:26+08:00
lastmod: 2020-05-08T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "桥接模式（Bridge）是一种结构型设计模式，可将一个大类或一系列紧密相关的类拆分为抽象和实现两个独立的层次结构，从而能在开发时分别使用。桥接模式通过组合而不是继承的方式来实现这种分离。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
桥接模式（Bridge Pattern）是一种结构性设计模式，它将抽象部分与实现部分分离，使它们可以独立变化而互不影响。桥接模式通过组合而不是继承的方式来实现这种分离。

在桥接模式中，有两个关键角色：
1. 抽象部分（Abstraction）：一些实体的高阶控制层。该层自身不完成任何具体的工作，它需要将工作委派给实现部分层。
2. 实现部分（Implementor）：它提供了具体的实现。

{{< admonition >}}
这里提到的内容与编程语言中的接口或抽象类无关。它们并不是一回事。
{{< /admonition >}}

这种分离允许系统中的每一部分都可以独立地进行扩展、修改和重用，而不会对其他部分产生影响。从而提高了系统的可扩展性，同时也使得系统更容易维护和理解。

## 类图
{{< mermaid >}}
classDiagram
  class Abstraction {
    -Implementation realization
    +feature1() void
    +feature2() void
  }

  class RefinedAbstraction {
    -Implementation realization
    +feature1() void
    +feature2() void
  }
  RefinedAbstraction --|> Abstraction

  class Implementation {
    <<interface>>
    +method1() void
    +method2() void
    +method3() void
  }

  Abstraction --* Implementation

  class ConcreteImplementation1 {
    +method1() void
    +method2() void
    +method3() void
  }
  ConcreteImplementation1 ..|> Implementation

  class ConcreteImplementation2 {
    +method1() void
    +method2() void
    +method3() void
  }
  ConcreteImplementation2 ..|> Implementation

  class Client
  Client --> Abstraction

{{< /mermaid >}}

## 代码实现
```java
interface Implementation {
  void method1();

  void method2();

  void method3();
}

class ConcreteImplementation1 implements Implementation {
  @Override
  public void method1() {
    System.out.prientln("ConcreteImplementation1 method1");
  }

  @Override
  public void method2() {
    System.out.prientln("ConcreteImplementation1 method2");
  }

  @Override
  public void method3() {
    System.out.prientln("ConcreteImplementation1 method3");
  }
}

class ConcreteImplementation2 implements Implementation {
  @Override
  public void method1() {
    System.out.prientln("ConcreteImplementation2 method1");
  }

  @Override
  public void method2() {
    System.out.prientln("ConcreteImplementation2 method2");
  }

  @Override
  public void method3() {
    System.out.prientln("ConcreteImplementation2 method3");
  }
}

abstract class Abstraction {
  protected Implementation realization;

  public Abstraction(Implementation realization) {
    this.realization = realization;
  }

  abstract void feature1();

  abstract void feature2();
}

class RefinedAbstraction extends Abstraction {
  public RefinedAbstraction(Implementation realization) {
    this.realization = realization;
  }

  @Override
  public void feature1() {
    this.realization.method1();
  }

  @Override
  public void feature1() {
    this.realization.method2();
    this.realization.method3();
  }
}

public class Client {
  public static void main(String[] args) {
    Implementation implementation = new ConcreteImplementation1();
    Abstraction abstraction = new RefinedAbstraction(implementation);
    abstraction.feature1();
    abstraction.feature2();
  }
}
```

## 优缺点
优点：
1. 客户端代码仅与高层抽象部分进行互动，不会接触到实现的详细信息。
2. 符合**开闭原则**；你可以新增抽象部分和实现部分，且它们之间不会相互影响。
3. 符合**单一职责原则**；抽象部分专注于处理高层逻辑，实现部分处理平台细节。

缺点：
1. 对高内聚的类使用该模式可能会让代码更加复杂。

## 适用场景
1. 如果你想要拆分或重组一个具有多重功能的庞杂类（例如能与多个数据库服务器进行交互的类）。
2. 如果你希望在几个独立维度上扩展一个类。
3. 如果你需要在运行时切换不同的实现。
