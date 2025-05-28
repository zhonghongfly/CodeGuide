---
title: "Structural - Decorator Pattern"
date: 2020-05-10T16:58:26+08:00
lastmod: 2020-05-10T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Decorator pattern is a structural design pattern that allows you to add new behaviors to the original object by putting the object into a special encapsulation class that contains the behavior. This pattern can dynamically attach responsibilities to objects without affecting other objects."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Decorator pattern is a structural design pattern that allows you to add new behaviors to the original object by placing the object in a special encapsulation class that contains the behavior. This pattern can dynamically attach responsibilities to objects without affecting other objects.

The Decorator pattern dynamically adds some additional responsibilities to an object through composition rather than inheritance without changing its original structure. This allows you to selectively, transparently, and in any order at runtime without modifying existing code.

## Class Diagram
{{< mermaid >}}
classDiagram
  direction BT
  class Component {
    <<interface>>
    +execute() void
  }

  class ConcreteComponent {
    +execute() void
  }
  ConcreteComponent --|> Component

  class BaseDecorator {
    -Component wrap
    +BaseDecorator(component: Component)
    +execute() void
  }
  BaseDecorator ..o Component

  class ConcreteDecoratorA {
    +ConcreteDecoratorA(component: Component)
    +execute() void
    +extra() void
  }
  ConcreteDecoratorA --|> BaseDecorator

  class ConcreteDecoratorB {
    +ConcreteDecoratorB(component: Component)
    +execute() void
    +extra() void
  }
  ConcreteDecoratorB --|> BaseDecorator

{{< /mermaid >}}

## Code Implementation
```java
interface Component {
  void execute();
}

class ConcreteComponent implements Component {
  @Override
  public void execute() {
    System.out.println("ConcreteComponent execute invoke.");
  }
}

abstract class BaseDecorator {
  protected Component wrap;

  public BaseDecorator(Component component) {
    this.wrap = component;
  }

  protected void execute() {
    wrap.execute();
  }
}

class ConcreteDecoratorA extends BaseDecorator {

  public ConcreteDecoratorA(Component component) {
    super(component);
  }

  @Override
  public void execute() {
    super.execute();
    this.extra();
  }

  public void extra() {
    System.out.println("ConcreteDecoratorA extra invoke.");
  }
}

class ConcreteDecoratorB extends BaseDecorator {

  public ConcreteDecoratorB(Component component) {
    super(component);
  }

  @Override
  public void execute() {
    super.execute();
    this.extra();
  }

  public void extra() {
    System.out.println("ConcreteDecoratorB extra invoke.");
  }
}

public class Client {
  public static void main(String[] args) {
    Component component = new ConcreteComponent();
    BaseDecorator decorator = new ConcreteDecoratorA(component);
    decorator.execute();
  }
}
```

## Pros and Cons
Advantages:
1. The decorator pattern allows new responsibilities to be added to an object dynamically and transparently without modifying its code. This provides greater flexibility and scalability.
2. It complies with the **open-closed principle**, allowing new decorators to be added at runtime without modifying existing code.
3. The client does not need to know the details of the specific decorator and the decorated object, and can use the decorated object like a normal object.
4. It complies with the **single responsibility principle**, and each specific decorator class focuses on adding a specific responsibility, maintaining the single responsibility principle.

Disadvantages:
1. As the number of decorator levels increases, the number of classes may increase, making the code complex and difficult to maintain.
2. The order in which decorators are added may affect the final behavior, so you need to pay attention to the order in which decorators are combined.

## Applicable Scenarios
1. If you want to use an object without modifying the code and want to add additional behavior to the object at runtime, you can use the decorator pattern.
2. If the solution of extending the behavior of an object by inheritance is difficult to implement or not feasible at all, you can use the decorator pattern.
3. When there are a large number of possible combinations of features, the decorator pattern can avoid creating a large number of subclasses, thereby avoiding the class explosion problem.
