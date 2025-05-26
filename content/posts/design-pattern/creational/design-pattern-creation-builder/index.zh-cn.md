---
title: "创建型 - 建造者模式"
date: 2020-05-05T16:58:26+08:00
lastmod: 2020-05-05T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "建造者模式（Builder）是一种创建型设计模式，使你能够分步骤创建复杂对象。在这个过程当中，用户不需要知道内部的具体构建细节。建造者模式尤其适用于需要构建对象的构建过程比较复杂，包含多个可选部分的情况。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
建造者模式的目的是将一个复杂对象的构建过程与其具体表示分离，使得同样的构建过程可以创建不同的表示。

它以一种更加灵活的方式构建复杂对象，而不需要直接调用其构造函数或者在构造函数中传递大量参数。

这提高了代码的可读性、可维护性，并允许在不同的情境中构建不同表示的对象。

建造者模式尤其适用于需要构建对象的构建过程比较复杂，包含多个可选部分的情况。

## 类图
{{< mermaid >}}
classDiagram
  class Builder {
    <<interface>>
    +reset() void
    +buildStepA() void
    +buildStepB() void
    +buildStepC() void
  }

  class Product1

  class ConcreteBuilder1 {
    -Product1 result
    +reset() void
    +buildStepA() void
    +buildStepB() void
    +buildStepC() void
    +getResult() Product1
  }

  ConcreteBuilder1 ..|> Builder
  ConcreteBuilder1 ..> Product1

  class Product2

  class ConcreteBuilder2 {
    -Product2 result
    +reset() void
    +buildStepA() void
    +buildStepB() void
    +buildStepC() void
    +getResult() Product2
  }

  ConcreteBuilder2 ..|> Builder
  ConcreteBuilder2 ..> Product2

  class Director {
    -Builder builder
    +Director(builder: Builder)
    +make() void
  }

  Director --> Builder

{{< /mermaid >}}

## 代码实现
```java
public class BuilderTest {

  interface Builder {
    void reset();

    void buildStepA();

    void buildStepB();

    void buildStepC();
  }

  class Product1 {}

  class Product2 {}

  class ConcreteBuilder1 implements Builder {
    private Product1 result;

    @Override
    public void reset() {
      this.result = new Product1();
    }

    @Override
    public void buildStepA() {
      // do something
    }

    @Override
    public void buildStepB() {
      // do something
    }

    @Override
    public void buildStepC() {
      // do something
    }

    public Product1 getResult() {
      return result;
    }
  }

  class ConcreteBuilder2 implements Builder {
    private Product2 result;

    @Override
    public void reset() {
      this.result = new Product2();
    }

    @Override
    public void buildStepA() {
      // do something
    }

    @Override
    public void buildStepB() {
      // do something
    }


    @Override
    public void buildStepC() {
      // do something
    }

    public Product2 getResult() {
      return result;
    }
  }

  class Director {

    private Builder builder;

    public Director(Builder builder) {
      this.builder = builder;
    }

    public void make() {
      this.builder.reset();
      this.builder.buildStepA();
      this.builder.buildStepB();
      this.builder.buildStepC();
    }
  }

  public static void main(String[] args) {
    Builder builder = new ConcreteBuilder1();
    Director director = new Director(builder);
    director.make();
    Product1 product = builder.getResult();
  }
}
```

## 优缺点
优点：
1. 可以分步创建对象，暂缓创建步骤或递归运行创建步骤。
2. 生成不同形式的产品时，你可以复用相同的制造代码。
3. 符合**单一职责原则**；你可以将复杂构造代码从产品的业务逻辑中分离出来。
4. 易于扩展，具有更好的代码可读性。

缺点：
1. 由于该模式需要新增多个类，因此代码整体复杂程度会有所增加。

## 适用场景
1. 建造者模式适用于构建过程复杂、有多个可选部分的对象，特别是对象的构建步骤比较多、步骤顺序灵活变化的情况。
2. 当需要创建多种不同表示的对象时，可以使用建造者模式，每个具体建造者对应一种表示。
3. 如果构建过程中存在一些可选的部分，而客户端需要根据需求选择性地构建这些部分，建造者模式提供了灵活的解决方案。
4. 如果对象的构建过程相对稳定，但需要根据不同的需求创建不同的表示，建造者模式是一个很好的选择。