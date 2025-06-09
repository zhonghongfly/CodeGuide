---
title: "Creational - Builder Pattern"
date: 2025-05-05T16:58:26+08:00
lastmod: 2025-05-05T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Builder pattern is a creational design pattern that allows you to create complex objects in steps. During this process, the user does not need to know the specific internal construction details. The Builder pattern is particularly suitable for situations where the construction process of the object to be built is complex and contains multiple optional parts."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The purpose of the builder pattern is to separate the construction process of a complex object from its specific representation, so that the same construction process can create different representations.

It builds complex objects in a more flexible way without directly calling its constructor or passing a large number of parameters in the constructor.

This improves the readability and maintainability of the code and allows objects with different representations to be built in different situations.

The builder pattern is particularly suitable for situations where the construction process of the object to be built is complex and contains multiple optional parts.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
Advantages:
1. You can create objects in steps, postpone creation steps, or run creation steps recursively.
2. You can reuse the same manufacturing code when generating different forms of products.
3. It complies with the **single responsibility principle**; you can separate complex construction code from the business logic of the product.
4. It is easy to expand and has better code readability.

Disadvantages:
1. Since this pattern requires adding multiple classes, the overall complexity of the code will increase.

## Applicable Scenarios
1. The builder pattern is suitable for objects with complex construction processes and multiple optional parts, especially when the object construction steps are relatively large and the order of steps can be changed flexibly.
2. When you need to create objects with multiple different representations, you can use the builder pattern, with each specific builder corresponding to one representation.
3. If there are some optional parts in the construction process, and the client needs to selectively build these parts according to needs, the builder pattern provides a flexible solution.
4. If the object construction process is relatively stable, but different representations need to be created according to different needs, the builder pattern is a good choice.