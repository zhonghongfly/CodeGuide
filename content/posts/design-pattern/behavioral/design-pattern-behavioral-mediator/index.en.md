---
title: "Structural - Mediator Pattern"
date: 2020-05-18T16:58:26+08:00
lastmod: 2020-05-18T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Mediator pattern is a behavioral design pattern that reduces the coupling between objects by transferring direct communication between objects to a mediator object. This pattern is used to handle the interaction between an object and other objects so that the objects do not need to know each other directly."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Mediator pattern is a behavioral design pattern that reduces the coupling between objects by transferring direct communication between objects to a mediator object. This pattern is used to handle the interaction between an object and other objects, so that the objects do not need to know each other directly.

The key idea of ​​the Mediator pattern is to decouple the direct interaction between objects in the system by introducing a mediator object. Its purpose is to reduce the dependencies between objects and make the system more flexible, maintainable and scalable.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
Advantages:
1. Comply with the **single responsibility principle**, you can extract the communication between multiple components to the same location, making it easier to understand and maintain.
2. Comply with the **open-closed principle**, you can add new mediators without modifying the actual components.

Disadvantages:
1. As the number of objects and their interactions in the system increases, the mediator object may become too large and contain a lot of business logic. This may increase the complexity of the mediator object and make it difficult to maintain.
2. The mediator pattern concentrates the communication between objects in the mediator, which may reduce the efficiency of direct communication between objects, especially when the mediator object becomes complex.
3. The mediator pattern is not suitable for all system design scenarios. In some simple cases, direct communication between objects may be more appropriate.

## Applicable Scenarios
1. When there are complex interactions between objects in the system and the communication between objects is difficult to maintain, you can consider using the mediator pattern.
2. If there is strong coupling between objects in the system, causing changes in one object to affect other objects, you can introduce the mediator pattern to reduce the direct dependency between objects.
3. When multiple objects share certain states and need to synchronize these states in a timely manner, the mediator pattern can provide a centralized way to manage them.
4. When the system needs to achieve loose coupling to make the interaction between objects more flexible, easy to maintain and expand, the mediator pattern is a suitable choice.