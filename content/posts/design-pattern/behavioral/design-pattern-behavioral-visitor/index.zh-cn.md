---
title: "结构型 - 访问者模式"
date: 2025-05-24T16:58:26+08:00
lastmod: 2025-05-24T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "访问者模式（Visitor）是一种行为设计模式，旨在将算法与对象结构分离，使得能够在不修改元素类的前提下定义新的操作。这一模式的核心思想是在元素类中添加一个接受访问者的方法，从而实现在不同元素上执行不同操作的能力。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
访问者模式（Visitor）是一种行为设计模式，旨在将算法与对象结构分离，使得能够在不修改元素类的前提下定义新的操作。这一模式的核心思想是在元素类中添加一个接受访问者的方法，从而实现在不同元素上执行不同操作的能力。

这一模式的核心思想是在元素类中添加一个接受访问者的方法，从而实现在不同元素上执行不同操作的能力。
访问者模式包含以下主要角色：
1. 元素接口（Element）： 定义了一个accept方法，该方法接受一个访问者对象作为参数，从而让访问者能够访问这个元素。
2. 具体元素类（ConcreteElement）： 实现了元素接口的具体类，同时包含了具体的业务逻辑。
3. 访问者接口（Visitor）： 定义了访问者能够访问各种具体元素的方法。
4. 具体访问者类（ConcreteVisitor）： 实现了访问者接口的具体类，包含了对不同元素的具体操作逻辑。

## 类图
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

## 代码实现
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

## 优缺点
优点：
1. 符合**开闭原则**，你可以引入在不同类对象上执行的新行为，且无需对这些类做出修改。
2. 符合**单一职责原则**，可将同一行为的不同版本移到同一个类中。
3. 相关的操作逻辑被集中在访问者的具体实现中，使得代码更加清晰、易懂。

缺点：
1. 每次在元素层次结构中添加或移除一个类时，你都要更新所有的访问者。
2. 访问者模式可能破坏元素的封装性，因为具体访问者需要访问元素的内部状态。这可能违反了一些面向对象设计的原则。
3. 具体访问者通常依赖于具体元素，这可能违反依赖倒置原则，即高层模块不应该依赖于低层模块，二者都应该依赖于抽象。

## 适用场景
1. 当数据结构相对稳定，但对数据的操作经常变化时，访问者模式是一种合适的设计选择。
2. 当存在一个复杂的对象结构，且需要对其进行多种不同的操作时，访问者模式可以使得操作的变化更加灵活。
3. 当系统要求对元素的操作进行扩展，但不希望修改现有代码时，访问者模式提供了一种可行的解决方案。
4. 访问者模式常用于编译器、解释器等需要对抽象语法树进行操作的场景，其中抽象语法树的节点可以看作元素，而编译或解释的操作可以看作访问者。