---
title: "Structural - Facade Pattern"
date: 2020-05-11T16:58:26+08:00
lastmod: 2020-05-11T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Facade pattern is a structural pattern whose purpose is to provide a simplified interface, hide the complexity of the system, and make it easier for clients to use the system."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Facade pattern is a structural pattern whose purpose is to provide a simplified interface to hide the complexity of the system so that clients can use the system more easily.

The key idea of ​​the Facade pattern is to provide a simplified interface that encapsulates a set of complex subsystems so that clients can use the system more easily.
By introducing the facade, the client does not need to interact directly with the complex interfaces of multiple subsystems, but only needs to interact with the facade object, thereby reducing the coupling of the system.

## Class Diagram
{{< mermaid >}}
classDiagram
  class Facade {
    -SubSystemClassA subSystemA
    -SubSystemClassB subSystemB
    -AdditionalFacade optionalAdditionalFacade
    +subSystemOperation() void
  }

  class AdditionalFacade {
    -SubSystemClassB subSystemB
    -SubSystemClassC subSystemC
    +anotherOperation() void
  }

  namespace SubSystem {
    class SubSystemClassA
    class SubSystemClassB
    class SubSystemClassC
  }

  Facade ..> AdditionalFacade : Optional
  Facade ..> SubSystemClassA
  Facade ..> SubSystemClassB

  AdditionalFacade ..> SubSystemClassB
  AdditionalFacade ..> SubSystemClassC

  class Client
  Client --> Facade
{{< /mermaid >}}

## Code Implementation
```java
class SubSystemClassA {
  void operation() {
    System.out.println("SubSystemClassA operation invoke.");
  }
}
class SubSystemClassB {
  void operation() {
    System.out.println("SubSystemClassB operation invoke.");
  }
}
class SubSystemClassC {
  void operation() {
    System.out.println("SubSystemClassC operation invoke.");
  }
}

class Facade {
  private SubSystemClassA subSystemA = new SubSystemClassA();

  private SubSystemClassB subSystemB = new SubSystemClassB();

  void subSystemOperation() {
    System.out.println("Facade subSystemOperation invoke.");
    subSystemA.operation();
    subSystemB.operation();
  }
}

class AdditionalFacade() {

  private SubSystemClassB subSystemB = new SubSystemClassB();

  private SubSystemClassC subSystemC = new SubSystemClassC();

  void anotherOperation() {
    System.out.println("AdditionalFacade anotherOperation invoke.");
    subSystemB.operation();
    subSystemC.operation();
  }
}

public class Client {
  public static void main(String[] args) {
    Facade facade = new Facade();
    facade.subSystemOperation();
  }
}
```

## Pros and Cons
Advantages:
1. A loose coupling relationship between the subsystem and the client is realized, so that changes in the subsystem will not affect the client that calls it.
2. The difficulty of using the subsystem by the client is simplified. The client (user) does not need to care about the specific implementation of the subsystem, but only needs to interact with the appearance.
3. A unified calling interface is provided for different users, which facilitates the management and maintenance of the system.

Disadvantages:
1. The facade may become a God object coupled to all classes in the program.
2. It does not comply with the **open-closed principle**; if the system changes, the facade class may need to be modified, which violates the open-closed principle (open for extension, closed for modification).

## Applicable Scenarios
1. The facade pattern is suitable for systems that are large and complex and have multiple subsystems. The facade class is introduced to simplify the client's call.
2. When the system needs to isolate the direct connection between the client and the subsystem, the facade pattern can help reduce the degree of coupling. It can improve the independence and portability of the subsystem;
3. In a hierarchical structure, the facade pattern can be used to define the entrance of each layer in the system. There is no direct connection between the layers, but the connection is established through the facade class, which reduces the coupling between the layers.