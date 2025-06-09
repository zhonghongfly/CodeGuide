---
title: "结构型 - 观察者模式"
date: 2020-05-20T16:58:26+08:00
lastmod: 2020-05-20T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "观察者模式（Observer）是一种行为设计模式，允许你定义一种订阅机制，可在对象事件发生时通知多个 “观察” 该对象的其他对象。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
观察者模式（Observer）是一种行为设计模式，允许你定义一种订阅机制，可在对象事件发生时通知多个 “观察” 该对象的其他对象。

观察者模式关键思想是定义对象之间的一对多依赖，当一个对象状态改变时，它的所有依赖都会收到通知并且自动更新状态。

## 类图
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

## 代码实现
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

## 优缺点
优点：
1. 符合**开闭原则**，你无需修改发布者代码就能引入新的订阅者类，易于扩展。
2. 观察者和被观察者之间的关系是抽象的，降低了类之间的依赖，提高了代码的灵活性和可维护性。
3. 一个被观察者对象的改变可以通知多个观察者，实现广播通信。

缺点：
1. 如果观察者数量过多，通知过程可能会耗时，降低系统性能。
2. 如果观察者和被观察者之间存在循环依赖，可能导致无限循环调用，引发系统崩溃。

## 适用场景
1. 当一个对象状态的改变需要改变其他对象，或实际对象是事先未知的或动态变化的时，可使用观察者模式。
2. 当应用中的一些对象必须观察其他对象时，可使用观察者模式。