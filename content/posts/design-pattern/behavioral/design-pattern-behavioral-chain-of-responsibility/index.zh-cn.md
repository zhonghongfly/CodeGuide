---
title: "结构型 - 责任链模式"
date: 2020-05-14T16:58:26+08:00
lastmod: 2020-05-14T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "责任链模式（Chain of Responsibility）是一种行为设计模式，允许你将请求沿着处理者链进行发送。收到请求后，每个处理者均可对请求进行处理，或将其传递给链上的下个处理者。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
责任链模式（Chain of Responsibility）是一种行为设计模式，允许你将请求沿着处理者链进行发送。收到请求后，每个处理者均可对请求进行处理，或将其传递给链上的下个处理者。

责任链模式的关键思想是将请求的发送者和接收者解耦，并允许多个对象都有机会处理这个请求。
责任链模式通过构建一个处理者链来实现这一目标，每个处理者都有责任判断自己能否处理请求，以及是否将请求传递给下一个处理者。

以下是责任链模式的关键角色：
1. 处理者抽象类或接口（Handler）：定义一个处理请求的接口，通常包含一个处理请求的方法。处理者可能有一个对下一个处理者的引用。
2. 具体处理者类（ConcreteHandler）：实现处理请求的具体逻辑。如果能够处理请求，则进行处理；否则，将请求传递给下一个处理者。
3. 客户端（Client）：创建处理者链，并将请求发送给第一个处理者。

通过这种方式，请求会被沿着责任链传递，直到找到能够处理它的处理者。责任链模式使得请求的发送者和接收者之间解耦，可以动态地调整和扩展处理者链。每个处理者只需要关注自己能否处理请求，而不用担心整个处理流程的细节。

## 类图
{{< mermaid >}}
classDiagram
  direction RL
  class Request
  class Handler {
    <<interface>>
    setNext(handler: Handler) void
    handle(request: Request) void
  }
  Handler ..> Request

  class BaseHandler {
    <<abstract>>
    -Handler next
    setNext(handler: Handler) void
    handle(request: Request) void
  }
  BaseHandler ..|> Handler

  class ConcreteHandlerA {
    handle(request: Request) void
  }
  ConcreteHandlerA --|> BaseHandler

  class ConcreteHandlerB {
    handle(request: Request) void
  }
  ConcreteHandlerB --|> BaseHandler

  class ConcreteHandlerC {
    handle(request: Request) void
  }
  ConcreteHandlerC --|> BaseHandler

  class Client
  Client --> Handler

{{< /mermaid >}}

## 代码实现
```java
class Request {}

interface Handler {
  void setNext(Handler handler);

  void handle(Request request);
}

abstract class BaseHandler implements Handler {
  protected Handler next;

  @Override
  public void setNext(Handler handler) {
    this.next = handler;
  }

  @Override
  public void handle(Request request) {
    System.out.println("BaseHandler handle invoke.");
    if (this.next != null) {
      this.next.handle(request);
    }
  }
}

class ConcreteHandlerA extends BaseHandler {
  @Override
  public void handle(Request request) {
    System.out.println("ConcreteHandlerA handle invoke.");
    super.handle(request);
  }
}

class ConcreteHandlerB extends BaseHandler {
  @Override
  public void handle(Request request) {
    System.out.println("ConcreteHandlerB handle invoke.");
    super.handle(request);
  }
}

class ConcreteHandlerC extends BaseHandler {
  @Override
  public void handle(Request request) {
    System.out.println("ConcreteHandlerC handle invoke.");
    super.handle(request);
  }
}


public class Client {
  public static void main(String[] args) {
    Request request = new Request();

    Handler h1 = new ConcreteHandlerA();
    Handler h2 = new ConcreteHandlerB();
    Handler h3 = new ConcreteHandlerC();

    h1.setNext(h2);
    h2.setNext(h3);

    h1.handle(request);
  }
}
```

## 优缺点
优点：
1. 符合**单一职责原则**；责任链模式将请求的发送者和接收者解耦，使得系统更加灵活，每个处理者只关心自己的处理逻辑，不需要知道整个处理流程。
2. 符合**开闭原则**；你可以在不更改现有代码的情况下在程序中新增处理者。

缺点：
1. 由于责任链模式中请求的处理者不确定，可能会导致某个请求无法被处理，或者一个请求被多个处理者处理。
2. 在责任链较长的情况下，请求可能需要遍历整个链，性能可能受到一定影响。需要权衡链的深度和性能。
3. 在责任链中，如果某个请求没有得到处理，或者被错误地处理，可能需要逐个追踪调试整个链，调试相对比较困难。


## 适用场景
1. 当程序需要使用不同方式处理不同种类请求，而且请求类型和顺序预先未知时，可以使用责任链模式。
2. 如果所需处理者及其顺序必须在运行时进行改变，可以使用责任链模式。
3. 日志系统中，可以根据不同的日志级别将日志交由不同的处理者处理，形成一个责任链。
4. 在Web开发中，过滤器链通常采用责任链模式，每个过滤器负责处理某一方面的逻辑，然后将请求传递给下一个过滤器。
