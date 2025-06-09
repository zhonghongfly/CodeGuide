---
title: "Structural - Observer Pattern"
date: 2020-05-20T16:58:26+08:00
lastmod: 2020-05-20T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Observer pattern is a behavioral design pattern that allows you to define a subscription mechanism that notifies multiple other objects that 'observe' an object when an event occurs on that object."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Observer pattern is a behavioral design pattern that allows you to define a subscription mechanism that notifies multiple other objects that "observe" the object when an event occurs.

The key idea of ​​the Observer pattern is to define a one-to-many dependency between objects. When an object changes state, all its dependencies will be notified and automatically update their states.

## Class Diagram
{{< mermaid >}}
classDiagram
  class Subscriber {
    <<interface>>
    +update(context)
  }

  class Publisher {
    -Subscriber[] subscribers
    -mainState
    +subscribe(subscriber: Subscriber)
    +unsubscribe(subscriber: Subscriber)
    +notifySubscribers()
    +mainBusinessLogic()
  }
  Publisher "1" --o "N" Subscriber

  class ConcreteSubscriberA {
    +update(context)
  }
  ConcreteSubscriberA ..|> Subscriber

  class ConcreteSubscriberB {
    +update(context)
  }
  ConcreteSubscriberB ..|> Subscriber
{{< /mermaid >}}

## Code Implementation
```java
interface Subscriber {
  void update(String context);
}

class Publisher {
  private List<Subscriber> subscribers = new ArrayList<>();

  private String mainState;

  public void subscribe(Subscriber subscriber) {
    this.subscribers.add(subscriber);
  }

  public void unsubscribe(Subscriber subscriber) {
    this.subscribers.remove(subscriber);
  }

  public void notifySubscribers() {
    for (Subscriber item : this.subscribers) {
      item.update(this.mainState);
    }
  }

  public void mainBusinessLogic(String newState) {
    this.mainState = newState;
    notifySubscribers();
  }
}

class ConcreteSubscriberA implements Subscriber {
  @Override
  void update(String context) {
    System.out.println("ConcreteSubscriberA update invoke. context ==> " + context);
  }
}

class ConcreteSubscriberB implements Subscriber {
  @Override
  void update(String context) {
    System.out.println("ConcreteSubscriberB update invoke. context ==> " + context);
  }
}

public class Client {
  public static void main(String[] args) {
    Publisher publisher = new Publisher();
    publisher.subscribe(new ConcreteSubscriberA());
    publisher.subscribe(new ConcreteSubscriberB());
    publisher.mainBusinessLogic("business");
  }
}
```

## Pros and Cons
Advantages:
1. In line with the **open-closed principle**, you can introduce new subscriber classes without modifying the publisher code, which is easy to expand.
2. The relationship between the observer and the observed is abstract, which reduces the dependency between classes and improves the flexibility and maintainability of the code.
3. Changes to an observed object can notify multiple observers to achieve broadcast communication.

Disadvantages:
1. If there are too many observers, the notification process may take time and reduce system performance.
2. If there is a circular dependency between the observer and the observed, it may lead to an infinite loop call and cause the system to crash.

## Applicable Scenarios
1. The observer pattern can be used when a change in the state of an object requires changes to other objects, or when the actual object is unknown in advance or changes dynamically.
2. The observer pattern can be used when some objects in the application must observe other objects.