---
title: "Structural - Visitor Pattern"
date: 2025-05-24T16:58:26+08:00
lastmod: 2025-05-24T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Visitor pattern is a behavioral design pattern that aims to separate algorithms from object structures, making it possible to define new operations without modifying the element class. The core idea of ​​this pattern is to add a method that accepts a visitor to the element class, thereby enabling the ability to perform different operations on different elements."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Visitor pattern is a behavioral design pattern that aims to separate algorithms from object structures, making it possible to define new operations without modifying the element class. The core idea of ​​this pattern is to add a method that accepts visitors to the element class, thereby enabling the ability to perform different operations on different elements.

The core idea of ​​this pattern is to add a method that accepts visitors to the element class, thereby enabling the ability to perform different operations on different elements.
The Visitor pattern includes the following main roles:
1. Element interface (Element): defines an accept method that accepts a visitor object as a parameter, allowing the visitor to access the element.
2. Concrete Element class (ConcreteElement): implements the concrete class of the element interface and contains specific business logic.
3. Visitor interface (Visitor): defines the methods by which visitors can access various specific elements.
4. Concrete Visitor class (ConcreteVisitor): implements the concrete class of the visitor interface and contains specific operation logic for different elements.

## Class Diagram
{{< mermaid >}}
classDiagram
  class Element {
    <<interface>>
    +accept(visitor: Visitor)
  }
  Element ..> Visitor

  class Visitor {
    <<interface>>
    +visit(ConcreteElementA)
    +visit(ConcreteElementB)
  }
  Visitor ..> ConcreteElementA
  Visitor ..> ConcreteElementB

  class ConcreteElementA {
    +accept(visitor: Visitor)
  }
  ConcreteElementA ..|> Element

  class ConcreteElementB {
    +accept(visitor: Visitor)
  }
  ConcreteElementB ..|> Element

  class ConcreteVisitor {
    +visit(ConcreteElementA)
    +visit(ConcreteElementB)
  }
  ConcreteVisitor ..|> Visitor

{{< /mermaid >}}

## Code Implementation
```java
interface Element {
  void accept(Visitor visitor);
}

class ConcreteElementA implements Element {
  @Override
  void accept(Visitor visitor) {
    System.out.println("ConcreteElementA accept invoke.");
    visitor.visit(this);
  }
}

class ConcreteElementB implements Element {
  @Override
  void accept(Visitor visitor) {
    System.out.println("ConcreteElementB accept invoke.");
    visitor.visit(this);
  }
}

interface Visitor {
  void visit(ConcreteElementA element);

  void visit(ConcreteElementB element);
}

class ConcreteVisitor implements Visitor {
  @Override
  void visit(ConcreteElementA element) {
    System.out.println("ConcreteVisitor visit ConcreteElementA");
  }

  @Override
  void visit(ConcreteElementB element) {
    System.out.println("ConcreteVisitor visit ConcreteElementA");
  }
}

public class Client {
  public static void main(String[] args) {
    ConcreteElementA elementA = new ConcreteElementA();
    ConcreteElementB elementB = new ConcreteElementB();
    ConcreteVisitor visitor = new ConcreteVisitor();
    elementA.accept(visitor);
    elementB.accept(visitor);
  }
}
```

## Pros and Cons
Advantages:
1. Comply with the **open-closed principle**, you can introduce new behaviors that are executed on objects of different classes without modifying these classes.
2. Comply with the **single responsibility principle**, and different versions of the same behavior can be moved to the same class.
3. The relevant operation logic is concentrated in the specific implementation of the visitor, making the code clearer and easier to understand.

Disadvantages:
1. Every time you add or remove a class from the element hierarchy, you have to update all visitors.
2. The visitor pattern may break the encapsulation of the element because the concrete visitor needs to access the internal state of the element. This may violate some object-oriented design principles.
3. Concrete visitors often depend on concrete elements, which may violate the dependency inversion principle, that is, high-level modules should not depend on low-level modules, and both should depend on abstractions.

## Applicable Scenarios
1. When the data structure is relatively stable, but the operations on the data often change, the visitor pattern is a suitable design choice.
2. When there is a complex object structure and multiple different operations need to be performed on it, the visitor pattern can make the changes in operations more flexible.
3. When the system requires the expansion of element operations but does not want to modify the existing code, the visitor pattern provides a feasible solution.
4. The visitor pattern is often used in compilers, interpreters and other scenarios that need to operate on abstract syntax trees, where the nodes of the abstract syntax tree can be regarded as elements, and the operations of compilation or interpretation can be regarded as visitors.