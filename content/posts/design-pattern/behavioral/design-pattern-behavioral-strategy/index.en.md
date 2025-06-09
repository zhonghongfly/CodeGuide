---
title: "Structural - Strategy Pattern"
date: 2025-05-22T16:58:26+08:00
lastmod: 2025-05-22T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "Strategy is a behavioral design pattern that defines a series of algorithms, encapsulates each algorithm, and makes them interchangeable. Strategy pattern allows algorithms to change independently of the client."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
Strategy is a behavioral design pattern that defines a set of algorithms, encapsulates each algorithm, and makes them interchangeable. Strategy pattern allows algorithms to change independently of the client.

Strategy pattern usually involves two main roles:

1. Context: The context is responsible for maintaining a reference to the strategy object

2. Strategy: The strategy defines an interface or abstract class that contains the implementation of a specific algorithm.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
Advantages:
1. In line with the **open-closed principle**, you can introduce new strategies without modifying the context.
2. The strategy pattern can avoid using a large number of conditional statements to select different algorithms, making the code clearer and more concise.
3. Algorithms are encapsulated in independent strategy classes, so that these algorithms can change independently of the context class, improving the maintainability and reusability of the code.

Disadvantages:
1. Using the strategy pattern will increase the number of classes in the system. Each specific strategy requires a separate class, which may complicate class management and maintenance.
2. The client needs to understand all strategy classes and select the appropriate strategy when using it, which may increase the complexity of the client.

## Applicable Scenarios
1. When a system's algorithm needs to be switched frequently, the strategy pattern can be used to easily select different algorithms at runtime.
2. When a class has many conditional statements to select different behaviors, the strategy pattern can improve the readability and maintainability of the code.
3. When similar behaviors of a class have different implementations, the strategy pattern can be used to abstract these behaviors into strategies and implement different specific strategy classes.
4. If a class has multiple variants of the algorithm and these variants often need to be switched, the strategy pattern is a good choice.