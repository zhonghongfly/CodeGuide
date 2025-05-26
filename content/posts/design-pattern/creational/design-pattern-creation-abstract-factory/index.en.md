---
title: "Creational - Abstract Factory"
date: 2020-05-04T16:58:26+08:00
lastmod: 2020-05-04T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Abstract Factory pattern creates a family of objects, that is, many objects instead of one object, and these objects are related, that is, they must be created together. The Factory Method pattern is only used to create an object, which is very different from the Abstract Factory pattern."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The abstract factory pattern creates a family of objects, that is, many objects instead of one object, and these objects are related, that is, they must be created together. The factory method pattern is only used to create an object, which is very different from the abstract factory pattern.

The abstract factory pattern uses the factory method pattern to create a single object. The createProductA() and createProductB() methods in AbstractFactory are both implemented by subclasses. These two methods are creating an object individually, which meets the definition of the factory method pattern.

As for the concept of creating a family of objects, it is reflected in the Client. The Client needs to call two methods at the same time through AbstractFactory to create two objects. Here, the two objects are highly related, and the Client needs to create these two objects at the same time.

From a high level, the abstract factory uses composition, that is, Cilent combines AbstractFactory, while the factory method pattern uses inheritance.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
Advantages:
1. It solves the pain point that the factory method pattern cannot create products with two-level classification.
2. It complies with the **single responsibility principle**; you can extract the product generation code to the same location, making the code easy to maintain.
3. It complies with the **open-closed principle**; when introducing new product variants to the application, you do not need to modify the client code.

Disadvantages:
1. If the product classification exceeds two levels, such as three or even more levels, the abstract factory pattern will become very bloated.
2. It cannot solve the problem of multiple classifications and multiple combinations of products.

## Applicable Scenarios
1. If the code needs to interact with multiple different series of related products, but you don't want the code to be built based on the specific classes of the products because you can't get the relevant information in advance or for future scalability considerations, in this case, you can use an abstract factory.
2. If the existing code is based on a class with a set of abstract methods and its main function is not clear enough, then you can consider using the abstract factory pattern in this case.

> In a well-designed program, each class is responsible for only one thing. If a class interacts with multiple types of products, you can consider extracting the factory method into a separate factory class or an abstract factory class with complete functionality.