---
title: "Structural - Flyweight Pattern"
date: 2025-05-12T16:58:26+08:00
lastmod: 2025-05-12T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "Flyweight is a structural design pattern that aims to minimize memory usage or computational overhead by sharing objects to improve performance. This pattern is suitable for scenarios that require a large number of similar objects. By sharing part of the state of these similar objects, memory consumption can be effectively reduced."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Flyweight Pattern is a structural design pattern that aims to improve performance by minimizing memory usage or computational overhead by sharing objects. This pattern is suitable for scenarios that require a large number of similar objects. By sharing part of the state of these similar objects, memory consumption can be effectively reduced.

The key idea of ​​the Flyweight Pattern is to reduce the number of objects through sharing to reduce memory consumption and improve performance.
Specifically, the Flyweight Pattern contains the following key ideas:
1. Separation of internal state and external state: The state of an object is divided into internal state (Intrinsic State) and external state (Extrinsic State). The internal state is the part that can be shared by multiple objects, while the external state is the changing part of the object, and each object has its own external state.
2. Sharing internal state: The core of the Flyweight Pattern is to share the internal state of similar objects. By extracting the internal state of similar objects, this part of the state can be shared between multiple objects, thereby reducing memory usage.
3. Management of the Flyweight Factory: Introduce a Flyweight Factory, which is responsible for creating and managing Flyweight objects. The factory maintains a Flyweight pool to ensure that similar objects are shared instead of creating new objects each time.
4. External management of external state: For non-shareable external state, the client is responsible for passing it to the flyweight object. In this way, the flyweight object can use the external state during operation without storing it, thereby further reducing the storage overhead of the object.
5. Improve performance and reduce memory usage: By sharing internal state, the number of objects can be reduced, memory usage can be reduced, and system performance can be improved. Especially in scenarios where a large number of similar objects are required, the flyweight pattern can significantly reduce the consumption of system resources.

## Class Diagram
{{< mermaid >}}
classDiagram
  direction LR
  class Flyweight {
    -repeatState
    +operation(uniqueState)
  }

  class FlyweightFactory {
    -Flyweight[] cache
    +getFlyweight(repeatState) Flyweight
  }
  FlyweightFactory "1" --o "1..*" Flyweight

  class Conctext {
    -uniqueState
    -Flyweight flyweight
    +Conctext(repeatState, uniqueState)
    +operation()
  }
  Conctext --> Flyweight
  Conctext --> FlyweightFactory

  class Client
  Client --* Conctext
{{< /mermaid >}}

## Code Implementation
```java
class Flyweight {
  private String repeatState;

  public void operation(String uniqueState) {
    System.out.println("Flyweight operation invoke.");
  }
}

class FlyweightFactory {
  private Map<String, Flyweight> cache = new HashMap<>();

  public static Flyweight getFlyweight(String repeatState) {
    Flyweight result = cache.get(repeatState);
    if (result == null) {
      result = new Flyweight(repeatState);
      cache.put(repeatState, result);
    }
    return result;
  }
}

class Conctext {
  private String uniqueState;
  
  private Flyweight flyweight;

  public Conctext(String repeatState, String uniqueState) {
    this.uniqueState = uniqueState;
    this.flyweight = FlyweightFactory.getFlyweight(repeatState);
  }

  public void operation() {
    System.out.println("Conctext operation invoke.");
    flyweight.operation(uniqueState);
  }
}

public class Client {
  public static void main(String[] args) {
    Conctext conctext = new Conctext("repeatState", "uniqueState");
    conctext.operation();
  }
}
```

## Pros and Cons
Advantages:
1. By sharing the internal state of similar objects, the number of objects is reduced, thereby reducing memory usage and improving system performance.
2. The client is responsible for transmitting the external state, so that the flyweight object can be shared in different environments, and the change of the external state will not affect the internal state.
3. The client can implement different behaviors by transmitting different external states to the flyweight object, which increases flexibility and scalability.

Disadvantages:
1. Introducing the flyweight pattern may increase the complexity of the system, especially when it is necessary to maintain a shared pool and manage external states.
2. The flyweight pattern is not suitable for all scenarios. It can only play its advantages when there are a large number of similar objects that need to be shared. When the objects are very different, it may not significantly reduce memory usage.

## Applicable Scenarios
1. A system has a large number of identical or similar objects. Due to the large number of such objects, a large amount of memory is consumed.
2. Most of the states of the objects can be externalized, and these external states can be passed into the objects.

> The flyweight pattern is a design pattern that takes system performance into consideration. By using the flyweight pattern, memory space can be saved and system performance can be improved;
> Because of this feature, it is still used quite a lot in actual projects. For example, the browser cache can use this design idea. The browser will cache the images and files of the opened pages locally;
> If the same image appears multiple times in a page (that is, multiple img tags in a page point to the same image address), you only need to create an image object and display this object repeatedly at the place where the img tag is parsed.
