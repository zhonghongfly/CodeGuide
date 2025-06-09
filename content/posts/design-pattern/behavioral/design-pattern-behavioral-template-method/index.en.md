---
title: "Structural - Template Method Pattern"
date: 2025-05-23T16:58:26+08:00
lastmod: 2025-05-23T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Template Method pattern is a behavioral design pattern that defines the skeleton of an algorithm in a superclass, allowing subclasses to rewrite specific steps of the algorithm without modifying the structure."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Template Method pattern is a behavioral design pattern that defines the skeleton of an algorithm in a superclass, allowing subclasses to rewrite specific steps of the algorithm without modifying the structure.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
Advantages:
1. You can allow clients to rewrite only certain parts of a large algorithm, so that changes to other parts of the algorithm have less impact on them.
2. You can extract duplicate code into a superclass.

Disadvantages:
1. Suppressing default step implementations through subclasses may lead to violations of the **Liskov Substitution Principle**.
2. The more steps in a template method, the more difficult it may be to maintain.

## Applicable Scenarios
1. Use the Template Method pattern when you only want the client to extend a specific algorithm step, not the entire algorithm or its structure.
2. Use this pattern when the algorithms of multiple classes are almost identical except for some minor differences. But the consequence is that you may need to modify all classes as long as the algorithm changes.