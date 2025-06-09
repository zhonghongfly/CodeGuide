---
title: "结构型 - 中介者模式"
date: 2025-05-18T16:58:26+08:00
lastmod: 2025-05-18T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "中介者模式（Mediator）是一种行为设计模式，它通过将对象之间的直接通信转移到一个中介对象中，来减少对象之间的耦合度。这种模式被用来处理一个对象与其他对象之间的交互，使得各对象之间不需要直接相互了解。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
中介者模式（Mediator）是一种行为设计模式，它通过将对象之间的直接通信转移到一个中介对象中，来减少对象之间的耦合度。这种模式被用来处理一个对象与其他对象之间的交互，使得各对象之间不需要直接相互了解。

中介者模式的关键思想是通过引入一个中介者对象，来解耦系统中各个对象之间的直接交互关系。它的目的是减少对象之间的依赖关系，使得系统更加灵活、可维护和可扩展。

## 类图
{{< mermaid >}}
classDiagram
  class Mediator {
    <<interface>>
    +notify(message, colleague)
  }

  class ConcreteMediator {
    +notify(message, colleague)
  }
  ConcreteMediator ..|> Mediator

  class Colleague {
    <<abstract>>
    #Mediator mediator
    +Colleague(mediator: Mediator)
    +send(message)*
    +receiveMessage(message)*
  }
  Colleague --> Mediator

  class ConcreteColleague {
    +send(message)
    +receiveMessage(message)
  }
  ConcreteColleague --|> Colleague
{{< /mermaid >}}

## 代码实现
```java
class Message {}

interface Mediator {
  void notify(Message message, Colleague colleague);
}

abstract class Colleague {
  protected Mediator mediator;

  public Colleague(Mediator mediator) {
    this.mediator = mediator;
  }

  abstract void send(Message message);

  abstract void receiveMessage(Message message);
}

class ConcreteMediator implements Mediator {
  private Colleague colleagueA;

  private Colleague colleagueB;

  public void setColleagueA(Colleague colleagueA) {
    this.colleagueA = colleagueA;
  }

  public void setColleagueB(Colleague colleagueB) {
    this.colleagueB = colleagueB;
  }

  @Override
  public void notify(Message message, Colleague colleague) {
    if (colleague == colleagueA) {
      colleagueB.receiveMessage(message);
      return;
    }
    if (colleague == colleagueB) {
      colleagueA.receiveMessage(message);
    }
  }
}

class ConcreteColleagueA extends Colleague {
  public ConcreteColleagueA(Mediator mediator) {
    super(mediator);
  }

  @Override
  public void send(Message message) {
    mediator.notify(message, this);
  }

  @Override
  public void receiveMessage(Message message) {
    System.out.println("ConcreteColleagueA received message");
  }
}

class ConcreteColleagueB extends Colleague {
  public ConcreteColleagueB(Mediator mediator) {
    super(mediator);
  }

  @Override
  public void send(Message message) {
    mediator.notify(message, this);
  }

  @Override
  public void receiveMessage(Message message) {
    System.out.println("ConcreteColleagueB received message");
  }
}

public class Client {
  public static void main(String[] args) {
    Mediator mediator = new ConcreteMediator();
    Colleague colleagueA = new ConcreteColleagueA(mediator);
    Colleague colleagueB = new ConcreteColleagueB(mediator);
    mediator.setColleagueA(colleagueA);
    mediator.setColleagueB(colleagueB);
    colleagueA.send(new Message());
    colleagueB.send(new Message());
  }
}
```

## 优缺点
优点：
1. 符合**单一职责原则**，你可以将多个组件间的交流抽取到同一位置，使其更易于理解和维护。
2. 符合**开闭原则**，你无需修改实际组件就能增加新的中介者。

缺点：
1. 随着系统中对象和其交互关系的增多，中介者对象可能会变得过于庞大，包含大量的业务逻辑。这可能导致中介者对象的复杂性增加，不易维护。
2. 中介者模式将对象之间的通信集中在中介者中，可能导致对象间直接通信的效率降低，特别是在中介者对象变得复杂时。
3. 中介者模式并不适用于所有的系统设计场景。在一些简单的情况下，对象之间的直接通信可能更为合适。

## 适用场景
1. 当系统中的对象之间存在复杂的交互关系，且对象之间的通信难以维护时，可以考虑使用中介者模式。
2. 如果系统中的对象之间存在强耦合，导致一个对象的改变会影响其他对象，可以引入中介者模式来减少对象之间的直接依赖。
3. 当多个对象共享某些状态，并且需要及时同步这些状态时，中介者模式可以提供一个中心化的方式进行管理。
4. 当系统需要实现松散耦合，使得对象之间的交互更加灵活、易于维护和扩展时，中介者模式是一个合适的选择。