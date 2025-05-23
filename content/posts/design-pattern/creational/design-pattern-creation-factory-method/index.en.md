---
title: "Creational - Factory Method"
date: 2020-05-03T16:58:26+08:00
lastmod: 2020-05-03T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "Factory Method, which defines an interface for creating objects, but leaves it up to the subclass to decide which class to instantiate. The factory method defers instantiation to the subclass; thus, it can extend object creation without affecting other code."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
Defines an interface for creating objects, but leaves it up to the subclass to decide which class to instantiate. The factory method defers instantiation to the subclass; thus making it possible to extend object creation without affecting other code.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
advantage:
1. Complies with the **Single Responsibility Principle**; you can put product creation code in a single place in the program, making the code easier to maintain.
2. Comply with the **open-closed principle**; you can introduce new product types into the program without changing the existing client code.

shortcoming:
1. The factory method pattern is not applicable to products with multiple categories or products with secondary categories.

## Applicable Scenarios
1. When you are writing code, if you cannot predict the exact type of the object and its dependencies, you can use the factory method.
2. All products have the same methods and similar properties. Users do not care about the specific type, but only hope that the appropriate parameters can be passed in to return the appropriate object.
3. If you want users to be able to extend the internal components of your library or framework, use the factory method.

{{< admonition type=question title="Inheritance is probably the easiest way to extend the default behavior of a software library or framework; but how does the framework recognize when you use a subclass to replace a standard component?" >}}

The solution is to centralize the code for constructing components in each framework into a single factory method and allow anyone to override this method in addition to inheriting the component.

{{< /admonition >}}
