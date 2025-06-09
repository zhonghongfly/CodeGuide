---
title: "结构型 - 策略模式"
date: 2025-05-22T16:58:26+08:00
lastmod: 2025-05-22T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: ""
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
策略模式（Strategy）是一种行为设计模式，它定义了一系列的算法，将每个算法封装起来，并且使它们可以互相替换。策略模式使得算法可以独立于客户端而变化。

策略模式通常涉及两个主要角色：
1. 上下文（Context）：上下文负责维护一个对策略对象的引用
2. 策略（Strategy）：策略定义了一个接口或抽象类，包含了具体算法的实现。

## 类图
{{< mermaid >}}
classDiagram
  class Strategy {
    <<interface>>
    +execute(data)
  }

  class Context {
    -Strategy strategy
    +setStrategy(strategy: Strategy)
    +doSomething()
  }
  Context --> Strategy

  class ConcreteStrategyA {
    +execute(data)
  }
  ConcreteStrategyA ..|> Strategy

  class ConcreteStrategyB {
    +execute(data)
  }
  ConcreteStrategyB ..|> Strategy

{{< /mermaid >}}

## 代码实现
```java
interface Strategy {
  void execute(String data);
}

class Context {
  private Strategy strategy;

  public void setStrategy(Strategy strategy) {
    this.strategy = strategy;
  }

  public void doSomething() {
    this.strategy.execute();
  }
}

class ConcreteStrategyA implements Strategy {
  @Override
  public void execute(String data) {
    System.out.println("ConcreteStrategyA execute invoke.");
  }
}

class ConcreteStrategyB implements Strategy {
  @Override
  public void execute(String data) {
    System.out.println("ConcreteStrategyB execute invoke.");
  }
}

public class Client {
  public static void main(String[] args) {
    Context context = new Context();
    context.setStrategy(new ConcreteStrategyA());
    context.doSomething();

    context.setStrategy(new ConcreteStrategyB());
    context.doSomething();
  }
}
```

## 优缺点
优点：
1. 符合**开闭原则**，你无需对上下文进行修改就能够引入新的策略。
2. 策略模式可以避免使用大量的条件语句来选择不同的算法，使得代码更加清晰、简洁。
3. 算法被封装在独立的策略类中，使得这些算法可以独立于上下文类而变化，提高了代码的可维护性和可复用性。

缺点：
1. 使用策略模式会导致系统中类的数量增加，每个具体策略都需要一个单独的类，可能会使得类的管理和维护变得复杂。
2. 客户端需要了解所有的策略类，并在使用时选择适当的策略，这可能增加了客户端的复杂性。

## 适用场景
1. 当一个系统的算法需要经常切换时，使用策略模式可以方便地在运行时选择不同的算法。
2. 当一个类有很多条件语句来选择不同的行为时，使用策略模式可以提高代码的可读性和可维护性。
3. 当类的相似行为有不同的实现时，可以使用策略模式将这些行为抽象成策略，实现不同的具体策略类。
4. 如果一个类的算法有多个变体，并且这些变体经常需要切换，策略模式是一个不错的选择。