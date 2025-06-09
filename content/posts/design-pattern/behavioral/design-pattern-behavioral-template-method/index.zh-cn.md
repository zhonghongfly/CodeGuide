---
title: "结构型 - 模板方法模式"
date: 2025-05-23T16:58:26+08:00
lastmod: 2025-05-23T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "模板方法模式（Template Method）是一种行为设计模式，它在超类中定义了一个算法的框架，允许子类在不修改结构的情况下重写算法的特定步骤。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
模板方法模式（Template Method）是一种行为设计模式，它在超类中定义了一个算法的框架，允许子类在不修改结构的情况下重写算法的特定步骤。

## 类图
{{< mermaid >}}
classDiagram
  class AbstractClass {
    <<abstract>>
    +templeteMthod()
    +step1()
    +step2()
    +step3()
    +step4()
  }

  class ConcreteClassA {
    +step3()
    +step4()
  }
  ConcreteClassA --|> AbstractClass

  class ConcreteClassB {
    +step1()
    +step2()
  }
  ConcreteClassB --|> AbstractClass

{{< /mermaid >}}

## 代码实现
```java
abstract class AbstractClass {
  public void templeteMthod() {
    step1();
    step2();
    step3();
    step4();
  }

  public void step1() {
    System.out.println("AbstractClass step1 invoke.");
  }

  public void step2() {
    System.out.println("AbstractClass step2 invoke.");
  }

  public void step3() {
    System.out.println("AbstractClass step3 invoke.");
  }
  
  public void step4() {
    System.out.println("AbstractClass step4 invoke.");
  }
}

class ConcreteClassA extends AbstractClass {
  public void step3() {
    System.out.println("ConcreteClassA step3 invoke.");
  }
  
  public void step4() {
    System.out.println("ConcreteClassA step4 invoke.");
  }
}

class ConcreteClassB extends AbstractClass {
  public void step1() {
    System.out.println("ConcreteClassB step1 invoke.");
  }
  
  public void step2() {
    System.out.println("ConcreteClassB step2 invoke.");
  }
}

public class Client {
  public static void main(String[] args) {
    AbstractClass object = new ConcreteClassA();
    object.templeteMthod();
  }
}
```

## 优缺点
优点：
1. 你可仅允许客户端重写一个大型算法中的特定部分，使得算法其他部分修改对其所造成的影响减小。
2. 你可将重复代码提取到一个超类中。

缺点：
1. 通过子类抑制默认步骤实现可能会导致违反**里氏替换原则**。
2. 模板方法中的步骤越多，其维护工作就可能会越困难。

## 适用场景
1. 当你只希望客户端扩展某个特定算法步骤，而不是整个算法或其结构时，可使用模板方法模式。
2. 当多个类的算法除一些细微不同之外几乎完全一样时，你可使用该模式。但其后果就是，只要算法发生变化，你就可能需要修改所有的类。