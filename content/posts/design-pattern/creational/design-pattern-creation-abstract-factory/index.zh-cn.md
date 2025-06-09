---
title: "创建型 - 抽象工厂模式"
date: 2025-05-04T16:58:26+08:00
lastmod: 2025-05-04T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "抽象工厂模式（Abstract Factory）创建的是对象家族，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象，这和抽象工厂模式有很大不同。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
抽象工厂模式创建的是对象家族，也就是很多对象而不是一个对象，并且这些对象是相关的，也就是说必须一起创建出来。而工厂方法模式只是用于创建一个对象，这和抽象工厂模式有很大不同。

抽象工厂模式用到了工厂方法模式来创建单一对象，AbstractFactory 中的 createProductA() 和 createProductB() 方法都是让子类来实现，这两个方法单独来看就是在创建一个对象，这符合工厂方法模式的定义。

至于创建对象的家族这一概念是在 Client 体现，Client 要通过 AbstractFactory 同时调用两个方法来创建出两个对象，在这里这两个对象就有很大的相关性，Client 需要同时创建出这两个对象。

从高层次来看，抽象工厂使用了组合，即 Cilent 组合了 AbstractFactory，而工厂方法模式使用了继承。

## 类图
{{< mermaid >}}
classDiagram
  class ProductA {
    <<abstract>>
    +doStuff()* void
  }

  class ProductB {
    <<abstract>>
    +doStuff()* void
  }

  class ProductA1
  ProductA1 --|> ProductA

  class ProductA2
  ProductA2 --|> ProductA

  class ProductB1 {
    +doStuff() void
  }
  ProductB1 --|> ProductB

  class ProductB2 {
    +doStuff() void
  }
  ProductB2 --|> ProductB

  class AbstractFactory {
    <<interface>>
    +createProductA() ProductA
    +createProductB() ProductB
  }

  class Factory1 {
    +createProductA() ProductA
    +createProductB() ProductB
  }
  Factory1 ..|> AbstractFactory
  Factory1 ..> ProductA1
  Factory1 ..> ProductB1

  class Factory2 {
    +createProductA() ProductA
    +createProductB() ProductB
  }
  Factory2 ..|> AbstractFactory
  Factory2 ..> ProductA2
  Factory2 ..> ProductB2

{{< /mermaid >}}

## 代码实现
```java
public class AbstractFactoryTest {

  abstract class ProductA {
    public abstract void doStuff();
  }

  class ProductA1 extends ProductA {
    @Override
    public void doStuff() {
      System.out.println("ProductA1 doStuff.");
    }
  }

  class ProductA2 extends ProductA {
    @Override
    public void doStuff() {
      System.out.println("ProductA2 doStuff.");
    }
  }

  abstract class ProductB {
    public abstract void doStuff();
  }

  class ProductB1 extends ProductB {
    @Override
    public void doStuff() {
      System.out.println("ProductB1 doStuff.");
    }
  }

  class ProductB2 extends ProductB {
    @Override
    public void doStuff() {
      System.out.println("ProductB2 doStuff.");
    }
  }

  interface AbstractFactory {
    createProductA() ProductA

    createProductB() ProductB
  }

  class Factory1 implements AbstractFactory {
    @Override
    public ProductA createProductA() {
      return new ProductA1();
    }

    @Override
    public ProductB createProductB() {
      return new ProductB1();
    }
  }

  class Factory2 implements AbstractFactory {
    @Override
    public ProductA createProductA() {
      return new ProductA2();
    }

    @Override
    public ProductB createProductB() {
      return new ProductB2();
    }
  }

  public static void main(String[] args) {
    AbstractFactory factory = new Factory1();
    ProductA product = factory.createProductA();
    product.doStuff();
  }
}
```

## 优缺点
优点：
1. 解决了工厂方法模式不能创建具有二级分类的产品的痛点。
2. 符合**单一职责原则**；你可以将产品生成代码抽取到同一位置，使得代码易于维护。
3. 符合**开闭原则**；向应用程序中引入新产品变体时，你无需修改客户端代码。

缺点：
1. 如果产品的分类超过二级，如三级甚至更多的级，抽象工厂模式将会变得非常臃肿。
2. 不能解决产品有多种分类多种组合的问题。

## 适用场景
1. 如果代码需要与多个不同系列的相关产品交互，但是由于无法提前获取相关信息，或者出于对未来扩展性的考虑，你不希望代码基于产品的具体类进行构建，在这种情况下，你可以使用抽象工厂。
2. 如果现存代码是基于一组抽象方法的类，并且其主要功能不够明确，那么在这种情况下可以考虑使用抽象工厂模式。

> 在设计良好的程序中，每个类仅负责一件事。如果一个类与多种类型产品交互，就可以考虑将工厂方法抽取到独立的工厂类或具备完整功能的抽象工厂类中。