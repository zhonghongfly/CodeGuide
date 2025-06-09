---
title: "结构型 - 状态模式"
date: 2020-05-21T16:58:26+08:00
lastmod: 2020-05-21T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "状态模式（State）是一种行为设计模式，它允许对象在其内部状态改变时改变其行为。状态模式的关键思想是将对象的状态封装成独立的类，并将对象的行为委托给当前状态的对象。这样，当对象的状态发生变化时，其行为也会相应地发生变化。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
状态模式（State）是一种行为设计模式，它允许对象在其内部状态改变时改变其行为。状态模式的关键思想是将对象的状态封装成独立的类，并将对象的行为委托给当前状态的对象。这样，当对象的状态发生变化时，其行为也会相应地发生变化。

## 类图
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

## 代码实现
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

## 优缺点
优点：
1. 符合**单一职责原则**，状态模式将对象的不同状态及其相应的行为分离成独立的类，使得系统结构清晰，各个状态的变化互相独立。
2. 符合**开闭原则**，无需修改已有状态类和上下文就能引入新状态。
3. 状态模式将状态切换的逻辑集中在状态类中，使得状态之间的转换逻辑更加清晰和易于理解。

缺点：
1. 如果状态机只有很少的几个状态，或者很少发生改变，那么应用该模式可能会显得小题大作。
2. 使用状态模式会增加系统中类的数量，每个状态都需要一个独立的类，可能导致类的数量过多，使得代码结构复杂。

## 适用场景
1. 如果对象需要根据自身当前状态进行不同行为，同时状态的数量非常多且与状态相关的代码会频繁变更的话，可使用状态模式。
2. 如果某个类需要根据成员变量的当前值改变自身行为，从而需要使用大量的条件语句时，可使用该模式。
3. 当相似状态和基于条件的状态机转换中存在许多重复代码时，可使用状态模式。