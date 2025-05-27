---
title: "Creational - Singleton Pattern"
date: 2020-05-02T16:58:26+08:00
lastmod: 2020-05-02T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The singleton pattern is a creational design pattern that allows you to ensure that a class has only one instance and provide a global node to access the instance."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
There are some people you want to be unique, programs are the same, and some classes you want instances to be unique. A singleton is a class that can only have one object (instance). A singleton is used to control certain things so that only one individual is allowed. For example, in the world we live in, there is only one planet with life - the Earth (at least this is the case in the world discovered by humans so far).

If you play both sides, your life will capsize! If some key classes in the program have multiple instances, it will easily cause logical confusion and program crash!

## Class Diagram
{{< mermaid >}}
classDiagram
  direction LR
  note for Singleton "The Singleton class declares a static method 
  called getInstance to return an instance of the same class."
  class Singleton {
    -Singleton: instance$
    -Singleton()
    +getInstance()$ Singleton
  }
  Clinet --> Singleton : The constructor of the singleton must be hidden from the client code. Calling the getInstance method must be the only way to obtain the singleton object.
{{< /mermaid >}}

## Code Implementation
```java
public final class Singleton {
  private static volatile Singleton instance;

  public String value;

  public static Singleton getInstance(String value) {
    Singleton result = instance;
    if (result != null) {
      return result;
    }
    synchronized(Singleton.class) {
      // double check
      if (instance == null) {
        instance = new Singleton(value);
      }
      return instance;
    }
  }
}
```

## Applicable Scenarios
1. If a class in your program has only one instance available to all clients, you can use the singleton pattern.
2. Some global management classes (Manager) in the project can be implemented as singletons.