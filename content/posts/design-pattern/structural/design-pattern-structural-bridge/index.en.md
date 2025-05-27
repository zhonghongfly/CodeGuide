---
title: "Structural - Bridge Pattern"
date: 2020-05-08T16:58:26+08:00
lastmod: 2020-05-08T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Bridge pattern is a structural design pattern that can split a large class or a series of closely related classes into two independent hierarchies of abstraction and implementation, so that they can be used separately during development. The Bridge pattern achieves this separation through composition rather than inheritance."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Bridge Pattern is a structural design pattern that separates the abstraction from the implementation so that they can change independently without affecting each other. The Bridge Pattern achieves this separation through composition rather than inheritance.

In the Bridge Pattern, there are two key roles:
1. Abstraction: A high-level control layer of some entities. This layer does not do any specific work itself, it needs to delegate the work to the implementation layer.
2. Implementor: It provides specific implementation.

{{< admonition >}}
What is mentioned here has nothing to do with interfaces or abstract classes in programming languages. They are not the same thing.
{{< /admonition >}}

This separation allows each part of the system to be independently extended, modified, and reused without affecting other parts, thereby improving the scalability of the system and making it easier to maintain and understand.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
Advantages:
1. Client code only interacts with the high-level abstraction and does not touch the implementation details.
2. Comply with the **Open-Closed Principle**; you can add new abstractions and implementations without them affecting each other.
3. Comply with the **Single Responsibility Principle**; the abstraction focuses on handling high-level logic, and the implementation handles platform details.

Disadvantages:
1. Using this pattern for highly cohesive classes may make the code more complex.

## Applicable Scenarios
1. If you want to split or reorganize a large class with multiple functions (for example, a class that can interact with multiple database servers).
2. If you want to extend a class in several independent dimensions.
3. If you need to switch between different implementations at runtime.