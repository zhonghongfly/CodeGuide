---
title: "创建型 - 原型模式"
date: 2025-05-06T16:58:26+08:00
lastmod: 2025-05-06T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "原型模式(Prototype)，使用原型实例指定要创建对象的类型，通过复制这个原型来创建新对象；而无需使代码依赖它们所属的类。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
原型模式将克隆过程委派给被克隆的实际对象。模式为所有支持克隆的对象声明了一个通用接口，该接口让你能够克隆对象，同时又无需将代码和对象所属类耦合。通常情况下，这样的接口中仅包含一个 `克隆` 方法。

该方法会创建一个当前类的对象，然后将原始对象所有的成员变量值复制到新建的类中。你甚至可以复制私有成员变量，因为绝大部分编程语言都允许对象访问其同类对象的私有成员变量。

支持克隆的对象即为原型；当你的对象有几十个成员变量和几百种类型时，对其进行克隆甚至可以代替子类的构造。

## 类图
{{< mermaid >}}
classDiagram
  class Prototype {
    <<interface>>
    +clone() Prototype
  }

  class ConcretePrototype1 {
    -int value
    +ConcretePrototype1(value: int)
    +ConcretePrototype1(prototype: Prototype)
    +clone() Prototype
    +getValue() int
  }

  ConcretePrototype1 ..|> Prototype

  class ConcretePrototype2 {
    -int value
    +ConcretePrototype2(value: int)
    +ConcretePrototype2(prototype: Prototype)
    +clone() Prototype
    +getValue() int
  }

  ConcretePrototype2 ..|> Prototype
{{< /mermaid >}}

## 代码实现
```java
public class PrototypeTest {

  interface Prototype {
    Prototype clone();
  }

  class ConcretePrototype1 implements Prototype {

    private int value;

    public ConcretePrototype1(int value) {
      this.value = value;
    }

    public ConcretePrototype1(ConcretePrototype1 prototype) {
      this.value = prototype.value;
    }

    @Override
    public Prototype clone() {
      return new ConcretePrototype1(this);
    }
  }

  class ConcretePrototype2 implements Prototype {

    private int value;

    public ConcretePrototype1(int value) {
      this.value = value;
    }

    public ConcretePrototype2(ConcretePrototype1 prototype) {
      this.value = prototype.value;
    }

    @Override
    public Prototype clone() {
      return new ConcretePrototype2(this);
    }
  }

  public static void main(String[] args) {
    ConcretePrototype1 prototype = new ConcretePrototype1(6);
    ConcretePrototype1 newPrototype = prototype.clone();
  }
}
```

## 优缺点
优点：
1. 可以克隆对象，而无需与它们所属的具体类相耦合。
2. 可以更方便地生成复杂对象。
3. 可以用继承以外的方式来处理复杂对象的不同配置。

缺点：
1. 克隆包含循环引用的复杂对象可能会非常麻烦。
2. 克隆方法实现可能需要考虑深克隆、浅克隆的问题。

## 适用场景
1. 如果你需要复制一些对象，同时又希望代码独立于这些对象所属的具体类，可以使用原型模式。
2. 如果子类的区别仅在于其对象的初始化方式，那么你可以使用该模式来减少子类的数量。