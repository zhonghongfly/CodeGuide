---
title: "Structural - State Pattern"
date: 2020-05-21T16:58:26+08:00
lastmod: 2020-05-21T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The State pattern is a behavioral design pattern that allows an object to change its behavior when its internal state changes. The key idea of ​​the State pattern is to encapsulate the state of an object into an independent class and delegate the behavior of the object to the object of the current state. In this way, when the state of the object changes, its behavior will also change accordingly."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The State pattern is a behavioral design pattern that allows an object to change its behavior when its internal state changes. The key idea of ​​the State pattern is to encapsulate the state of an object into an independent class and delegate the behavior of the object to the object of the current state. In this way, when the state of the object changes, its behavior will also change accordingly.

## Class Diagram
{{< mermaid >}}
classDiagram
  direction BT
  class State {
    <<interface>>
    +doThis()
    +doThat()
  }

  class Context {
    -State state
    +Context(initState: State)
    +changeState(newState: State)
    +doThis()
    +doThat()
  }
  Context --o State

  class ConcreteStateA {
    -Context context
    +setContext(context: Context)
    +doThis()
    +doThat()
  }
  ConcreteStateA ..|> State

  class ConcreteStateB {
    -Context context
    +setContext(context: Context)
    +doThis()
    +doThat()
  }
  ConcreteStateB ..|> State

{{< /mermaid >}}

## Code Implementation
```java
interface State {
  void doThis();

  void doThat();
}

class Context {
  private State state;

  public Context(State initState) {
    this.state = initState;
    initState.setContext(this);
  }

  public void changeState(State newState) {
    this.state = newState;
    newState.setContext(this);
  }

  public void doThis() {
    this.state.doThis();
  }

  public void doThat() {
    this.state.doThat();
  }
}

class ConcreteStateA implements State {

  private Context context

  public void setContext(Context context) {
    this.context = context;
  }

  @Override
  public void doThis() {
    System.out.println("ConcreteStateA doThis invoke.");
  }

  @Override
  public void doThat() {
    State thatState = new ConcreteStateB();
    this.context.changeState(thatState);
  }
}

class ConcreteStateB implements State {

  private Context context

  public void setContext(Context context) {
    this.context = context;
  }

  @Override
  public void doThis() {
    System.out.println("ConcreteStateB doThis invoke.");
  }

  @Override
  public void doThat() {
    State thatState = new ConcreteStateB();
    this.context.changeState(thatState);
  }
}

public class Client {
  public static void main(String[] args) {
    State initState = new ConcreteStateA();
    Context context = new Context(initState);
    context.doThis();
    context.doThat();
  }
}
```

## Pros and Cons
Advantages:
1. In line with the **single responsibility principle**, the state pattern separates the different states of an object and its corresponding behaviors into independent classes, making the system structure clear and the changes of each state independent of each other.
2. In line with the **open-closed principle**, new states can be introduced without modifying the existing state class and context.
3. The state pattern concentrates the logic of state switching in the state class, making the conversion logic between states clearer and easier to understand.

Disadvantages:
1. If the state machine has only a few states or rarely changes, then applying this pattern may seem like an overkill.
2. Using the state pattern will increase the number of classes in the system. Each state requires a separate class, which may lead to too many classes and complex code structure.

## Applicable Scenarios
1. Use the state pattern if an object needs to behave differently based on its current state, and there are many states and the state-related code changes frequently.
2. Use this pattern if a class needs to change its behavior based on the current value of a member variable, which requires a large number of conditional statements.
3. Use the state pattern when there is a lot of repeated code in similar states and condition-based state machine transitions.