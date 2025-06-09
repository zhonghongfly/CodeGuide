---
title: "Structural - Chain of Responsibility Pattern"
date: 2025-05-14T16:58:26+08:00
lastmod: 2025-05-14T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Chain of Responsibility pattern is a behavioral design pattern that allows you to send a request along a chain of handlers. After receiving a request, each handler can process the request or pass it to the next handler in the chain."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Chain of Responsibility pattern is a behavioral design pattern that allows you to send a request along a chain of handlers. After receiving a request, each handler can process the request or pass it to the next handler in the chain.

The key idea of ​​the Chain of Responsibility pattern is to decouple the sender and receiver of a request and allow multiple objects to have a chance to process the request.
The Chain of Responsibility pattern achieves this goal by building a chain of handlers, each of which is responsible for determining whether it can handle the request and whether to pass the request to the next handler.

The following are the key roles of the Chain of Responsibility pattern:
1. Handler abstract class or interface (Handler): defines an interface for handling requests, usually containing a method for handling requests. The handler may have a reference to the next handler.
2. ConcreteHandler class (ConcreteHandler): implements the specific logic for handling requests. If the request can be handled, it is processed; otherwise, the request is passed to the next handler.
3. Client (Client): creates a chain of handlers and sends the request to the first handler.

In this way, the request is passed along the responsibility chain until a handler is found that can handle it. The responsibility chain pattern decouples the sender and receiver of the request and can dynamically adjust and expand the handler chain. Each handler only needs to focus on whether it can handle the request without worrying about the details of the entire processing flow.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
Advantages:
1. Comply with **Single Responsibility Principle**; the responsibility chain pattern decouples the sender and receiver of the request, making the system more flexible. Each processor only cares about its own processing logic and does not need to know the entire processing flow.
2. Comply with **Open-Closed Principle**; you can add new processors to the program without changing the existing code.

Disadvantages:
1. Since the request handler in the responsibility chain model is uncertain, a request may not be processed, or a request may be processed by multiple handlers.
2. In the case of a long responsibility chain, the request may need to traverse the entire chain, and performance may be affected to a certain extent. It is necessary to weigh the depth of the chain and performance.
3. In the responsibility chain, if a request is not processed or is processed incorrectly, it may be necessary to track and debug the entire chain one by one, which is relatively difficult to debug.

## Applicable Scenarios
1. When the program needs to handle different types of requests in different ways, and the request type and order are unknown in advance, the responsibility chain pattern can be used.
2. If the required handlers and their order must be changed at runtime, the responsibility chain pattern can be used.
3. In the log system, logs can be handed over to different handlers according to different log levels to form a responsibility chain.
4. In Web development, the filter chain usually adopts the responsibility chain pattern, where each filter is responsible for processing a certain aspect of logic and then passes the request to the next filter.