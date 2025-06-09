---
title: "结构型 - 享元模式"
date: 2025-05-12T16:58:26+08:00
lastmod: 2025-05-12T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "享元模式（Flyweight）是一种结构型设计模式，旨在通过共享对象来最小化内存使用或计算开销，以提高性能。该模式适用于需要大量相似对象的场景，通过共享这些相似对象的部分状态，可以有效减少内存消耗。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
享元模式（Flyweight Pattern）是一种结构型设计模式，旨在通过共享对象来最小化内存使用或计算开销，以提高性能。该模式适用于需要大量相似对象的场景，通过共享这些相似对象的部分状态，可以有效减少内存消耗。

享元模式的关键思想是通过共享来减少对象的数量，以降低内存消耗和提高性能。
具体而言，享元模式包含以下关键思想：
1. 内部状态和外部状态的分离：将对象的状态分为内部状态（Intrinsic State）和外部状态（Extrinsic State）。内部状态是可以被多个对象共享的部分，而外部状态是对象的变化部分，每个对象都有自己的外部状态。
2. 共享内部状态：享元模式的核心是共享相似对象的内部状态。通过将相似对象的内部状态抽取出来，可以在多个对象之间共享这部分状态，从而减少内存占用。
3. 享元工厂的管理：引入一个享元工厂，负责创建和管理享元对象。工厂维护一个享元池，确保相似对象被共享，而不是每次都创建新的对象。
4. 外部状态的外部管理：对于不可共享的外部状态，由客户端负责传递给享元对象。这样，享元对象可以在操作时使用外部状态，而不需要存储它，从而进一步减小对象的存储开销。
5. 提高性能和减少内存占用：通过共享内部状态，可以减少对象的数量，降低内存占用，提高系统性能。尤其在需要大量相似对象的场景下，享元模式可以显著减少系统资源的消耗。

## 类图
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

## 代码实现
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

## 优缺点
优点：
1. 通过共享相似对象的内部状态，减少了对象的数量，从而减小了内存占用，提高了系统性能。
2. 外部状态由客户端负责传递，使得享元对象能够在不同的环境中被共享，而外部状态的变化不会影响到内部状态。
3. 客户端可以通过传递不同的外部状态给享元对象，实现不同的行为，增加了灵活性和可扩展性。

缺点：
1. 引入享元模式可能会增加系统的复杂性，特别是在需要维护共享池和管理外部状态的情况下。
2. 享元模式并不适用于所有的场景，只有在有大量相似对象需要共享时才能发挥其优势。在对象差异较大的情况下，可能并不能明显地减小内存占用。

## 适用场景
1. 一个系统有大量相同或者相似的对象，由于这类对象的大量使用，造成内存的大量耗费。
2. 对象的大部分状态都可以外部化，可以将这些外部状态传入对象中。

> 享元模式是一个考虑系统性能的设计模式，通过使用享元模式可以节约内存空间，提高系统的性能；
> 因为他的这一特性，在实际项目中使用的还是比较多的。比如浏览器的缓存就可以使用这个设计思想，浏览器会对已打开页面的图片、文件缓存到本地；
> 如在一个页面中多次出现相同的图片（即一个页面中多个 img 标签指向同一个图片地址），则只需要创建一个图片对象，在解析到 img 标签的地方多次重复显示这个对象即可。