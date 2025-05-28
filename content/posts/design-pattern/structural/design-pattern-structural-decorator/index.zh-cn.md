---
title: "结构型 - 装饰器模式"
date: 2020-05-10T16:58:26+08:00
lastmod: 2020-05-10T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "装饰器模式（Decorator）是一种结构型设计模式，它允许你通过将对象放入包含行为的特殊封装类中来为原始对象添加新的行为。这种模式可以动态地将责任附加到对象上，而不影响其它对象。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
装饰器模式（Decorator）是一种结构型设计模式，它允许你通过将对象放入包含行为的特殊封装类中来为原始对象添加新的行为。这种模式可以动态地将责任附加到对象上，而不影响其它对象。

装饰器模式是通过组合而不是继承的方式，动态地给一个对象添加一些额外的职责，同时又不改变其原有结构。这使得你可以在运行时有选择性地、透明地、以任意顺序地添加功能，而不需要修改现有的代码。

## 类图
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

## 代码实现
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

## 优缺点
优点：
1. 装饰器模式允许动态地、透明地向对象添加新的职责，而无需修改其代码。这提供了更大的灵活性和可扩展性。
2. 符合**开闭原则**，允许在运行时添加新的装饰器，而无需修改现有代码。
3. 客户端无需知道具体装饰器和被装饰者的细节，可以像使用普通对象一样使用装饰后的对象。
4. 符合**单一职责原则**，每个具体的装饰器类都专注于添加一种特定的职责，保持了单一职责原则。

缺点：
1. 随着装饰器层级的增加，可能会导致类的数量增加，使得代码变得复杂和难以维护。
2. 装饰器的添加顺序可能影响最终的行为，需要注意装饰器的组合顺序。

## 适用场景
1. 如果你希望在无需修改代码的情况下即可使用对象，且希望在运行时为对象新增额外的行为，可以使用装饰器模式。
2. 如果用继承来扩展对象行为的方案难以实现或者根本不可行，你可以使用装饰器模式。
3. 当存在大量可能组合的特性时，通过装饰者模式可以避免创建大量的子类，从而避免类爆炸问题。