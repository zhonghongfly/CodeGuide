---
title: "创建型 - 工厂方法"
date: 2020-05-03T16:58:26+08:00
lastmod: 2020-05-03T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "工厂方法(Factory Method)，它定义了一个创建对象的接口，但由子类决定要实例化哪个类。工厂方法把实例化操作推迟到子类；从而能在不影响其他代码的情况下扩展对象的创建。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
定义了一个创建对象的接口，但由子类决定要实例化哪个类。工厂方法把实例化操作推迟到子类；从而能在不影响其他代码的情况下扩展对象的创建。

## 类图
{{< mermaid >}}
classDiagram
  direction BT
  class Product {
    <<interface>>
    +doStuff() void
  }
  class ProductA
  ProductA ..|> Product

  class ProductB
  ProductB ..|> Product

  class Factory {
    <<abstract>>
    +createProduct()* Product
  }

  Factory ..> Product

  class FactoryA
  FactoryA --|> Factory

  class FactoryB
  FactoryB --|> Factory

{{< /mermaid >}}

## 代码实现
```java
public class FactoryMethod {

  interface Product {
    void doStuff();
  }

  class ProductA implements Product {
    @Override
    void doStuff() {
      System.out.println("ProductA doStuff.");
    }
  }

  class ProductB implements Product {
    @Override
    void doStuff() {
      System.out.println("ProductB doStuff.");
    }
  }

  abstract class Factory {
    public abstract Product createProduct();
  }

  class FactoryA extends Factory {
    @Override
    public Product createProduct() {
      return new ProductA();
    }
  }

  class FactoryB extends Factory {
    @Override
    public Product createProduct() {
      return new ProductB();
    }
  }

  public static void main(String[] args) {
    Factory factory = new FactoryA();
    Product product = factory.createProduct();
    product.doStuff();
  }
}
```

## 优缺点
优点：
1. 符合**单一职责原则**；你可以将产品创建代码放在程序的单一位置，从而使得代码更容易维护。
2. 符合**开闭原则**；无需更改现有客户端代码，你就可以在程序中引入新的产品类型。

缺点：
1. 对于有多种分类的产品，或具有二级分类的产品，工厂方法模式并不适用。

## 适用场景
1. 当你在编写代码的过程中，如果无法预知对象确切类别及其依赖关系时，可使用工厂方法。
2. 所有产品具有相同的方法和类似的属性，使用者不关心具体的类型，只希望传入合适的参数能返回合适的对象。
3. 如果你希望用户能扩展你软件库或框架的内部组件，可使用工厂方法。

{{< admonition type=question title="继承可能是扩展软件库或框架默认行为的最简单方法；但是当你使用子类替代标准组件时，框架如何辨识出该子类？" >}}

解决方案是将各框架中构造组件的代码集中到单个工厂方法中，并在继承该组件之外允许任何人对该方法进行重写。

{{< /admonition >}}