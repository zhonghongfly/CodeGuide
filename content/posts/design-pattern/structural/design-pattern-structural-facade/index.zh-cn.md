---
title: "结构型 - 外观模式"
date: 2025-05-11T16:58:26+08:00
lastmod: 2025-05-11T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "外观模式（Facade）是一种结构型模式，其目的是为了提供一个简化的接口，隐藏系统的复杂性，使得客户端能够更容易地使用系统。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
外观模式（Facade）是一种结构型模式，其目的是为了提供一个简化的接口，隐藏系统的复杂性，使得客户端能够更容易地使用系统。

外观模式的关键思想是提供一个简化的接口，封装一组复杂的子系统，以便客户端能够更容易地使用系统。
通过引入外观，客户端无需直接与多个子系统的复杂接口交互，而是只需与外观对象交互，从而降低了系统的耦合度。

## 类图
{{< mermaid >}}
classDiagram
  class Facade {
    -SubSystemClassA subSystemA
    -SubSystemClassB subSystemB
    -AdditionalFacade optionalAdditionalFacade
    +subSystemOperation() void
  }

  class AdditionalFacade {
    -SubSystemClassB subSystemB
    -SubSystemClassC subSystemC
    +anotherOperation() void
  }

  namespace SubSystem {
    class SubSystemClassA
    class SubSystemClassB
    class SubSystemClassC
  }

  Facade ..> AdditionalFacade : 可选
  Facade ..> SubSystemClassA
  Facade ..> SubSystemClassB

  AdditionalFacade ..> SubSystemClassB
  AdditionalFacade ..> SubSystemClassC

  class Client
  Client --> Facade
{{< /mermaid >}}

## 代码实现
```java
class SubSystemClassA {
  void operation() {
    System.out.println("SubSystemClassA operation invoke.");
  }
}
class SubSystemClassB {
  void operation() {
    System.out.println("SubSystemClassB operation invoke.");
  }
}
class SubSystemClassC {
  void operation() {
    System.out.println("SubSystemClassC operation invoke.");
  }
}

class Facade {
  private SubSystemClassA subSystemA = new SubSystemClassA();

  private SubSystemClassB subSystemB = new SubSystemClassB();

  void subSystemOperation() {
    System.out.println("Facade subSystemOperation invoke.");
    subSystemA.operation();
    subSystemB.operation();
  }
}

class AdditionalFacade() {

  private SubSystemClassB subSystemB = new SubSystemClassB();

  private SubSystemClassC subSystemC = new SubSystemClassC();

  void anotherOperation() {
    System.out.println("AdditionalFacade anotherOperation invoke.");
    subSystemB.operation();
    subSystemC.operation();
  }
}

public class Client {
  public static void main(String[] args) {
    Facade facade = new Facade();
    facade.subSystemOperation();
  }
}
```

## 优缺点
优点：
1. 实现了子系统与客户端之间的松耦合关系，这使得子系统的变化不会影响到调用它的客户端。
2. 简化了客户端对子系统的使用难度，客户端（用户）无须关心子系统的具体实现方式，而只需要和外观进行交互即可。
3. 为不同的用户提供了统一的调用接口，方便了系统的管理和维护。

缺点：
1. 外观可能成为与程序中所有类都耦合的上帝对象。
2. 不符合**开闭原则**；如果系统发生变化，可能需要修改外观类，违背了开闭原则（对扩展开放，对修改关闭）。

## 适用场景
1. 外观模式适用于系统较为庞大、复杂，有多个子系统的情况，通过引入外观类简化客户端的调用。
2. 当系统需要隔离客户端与子系统之间的直接联系时，外观模式可以帮助降低耦合度。可以提高子系统的独立性和可移植性；
3. 在层次化结构中，可以使用外观模式定义系统中每一层的入口，层与层之间不直接产生联系，而通过外观类建立联系，降低层之间的耦合度。