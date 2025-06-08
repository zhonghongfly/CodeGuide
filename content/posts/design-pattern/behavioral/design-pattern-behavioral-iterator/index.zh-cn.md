---
title: "结构型 - 迭代器模式"
date: 2020-05-17T16:58:26+08:00
lastmod: 2020-05-17T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "迭代器模式（Iterator）是一种行为设计模式，它提供了一种方法来顺序访问一个聚合对象中的各个元素，而不需要暴露该对象的内部表示。该模式通过定义一个迭代器接口，负责定义访问和遍历元素的方法，以及一个可迭代接口，负责返回迭代器的实例。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
迭代器模式（Iterator）是一种行为设计模式，它提供了一种方法来顺序访问一个聚合对象中的各个元素，而不需要暴露该对象的内部表示。该模式通过定义一个迭代器接口，负责定义访问和遍历元素的方法，以及一个可迭代接口，负责返回迭代器的实例。

迭代器模式的关键思想是提供一种方法，使得客户端能够访问一个聚合对象的元素，而无需了解该对象的内部结构。

以下是迭代器模式的一些关键组成部分：
1. 迭代器接口（Iterator）：定义访问和遍历元素的方法，通常包括 hasNext() 判断是否有下一个元素，和 next() 返回下一个元素的方法。
2. 可迭代接口（Iterable）：定义一个方法 iterator()，用于返回一个迭代器的实例。这使得客户端可以通过迭代器遍历集合元素。
3. 具体迭代器类（Concrete Iterator）：实现迭代器接口，负责追踪遍历集合的状态和返回元素。
4. 具体可迭代类（Concrete Iterable）：实现可迭代接口，负责返回一个具体的迭代器实例。
5. 客户端代码：使用迭代器来遍历集合元素，而不必关心集合对象的内部结构。

## 类图
{{< mermaid >}}
classDiagram
  direction BT
  class Iterator {
    <<interface>>
    +getNext() Item
    +hasNext() bool
  }

  class IterableCollection {
    <<interface>>
    +createIterator() Iterator
  }
  IterableCollection ..> Iterator

  class ConcreteIterator {
    +getNext() Item
    +hasNext() bool
  }
  ConcreteIterator ..|> Iterator

  class ConcreteCollection {
    +createIterator() Iterator
  }
  ConcreteCollection ..|> IterableCollection

  class Client
  Client --> Iterator
  Client --> IterableCollection
{{< /mermaid >}}

## 代码实现
```java
interface Iterator<Item> {
  Item getNext();
  boolean hasNext();
}

interface IterableCollection<Item> {
  Iterator<Item> createIterator();
}

class ConcreteIterator<Item> implements Iterator {
  private Item[] items;
  private int position = 0;

  public ConcreteIterator(Item[] items) {
    this.items = items;
  }

  @Override
  public Object next() {
    return items[position++];
  }

  @Override
  public boolean hasNext() {
    return position < items.length;
  }
}

class ConcreteCollection<Item> implements IterableCollection {
  private Item[] items;

  public ConcreteCollection(Item[] items) {
    this.items = items;
  }

  @Override
  public Iterator<Item> createIterator() {
    return new ConcreteIterator(this.items);
  }
}

public class Client {
  public static void main(String[] args) {
    String[] items = new String[] {"A", "B", "C"};
    IterableCollection<String> iterableCollection = new IterableCollection<>(items);
    Iterator<String> iterator = iterableCollection.createIterator();
    while (iterator.hasNext()) {
      String element = iterator.next();
      System.out.println("element ==> " + element);
    }
  }
}
```

## 优缺点
优点：
1. 符合**单一职责原则**，通过将体积庞大的遍历算法代码抽取为独立的类，你可对客户端代码和集合进行整理。
2. 符合**开闭原则**，你可实现新型的集合和迭代器并将其传递给现有代码，无需修改现有代码。
3. 迭代器模式定义了统一的迭代器接口，使得客户端可以以一致的方式访问不同类型的集合对象，提高了代码的通用性。
4. 迭代器模式允许为同一集合对象提供多个不同的迭代器，每个迭代器可以实现不同的遍历算法，使得客户端可以选择适合自己需求的遍历方式。
5. 迭代器模式降低了集合对象和迭代器之间的耦合性，使得可以独立地改变集合对象的实现方式或增加新的迭代器，而不影响客户端代码。

缺点：
1. 引入迭代器模式会增加一些额外的类和接口，可能会使得代码结构变得更加复杂，特别是对于简单的集合对象而言。
2. 对于某些特殊集合，使用迭代器可能比直接遍历的效率低。

## 适用场景
1. 迭代器模式适用于需要遍历集合元素的场景，提供了一种统一的访问方式。
2. 当希望在不暴露集合内部结构的情况下遍历集合元素时，迭代器模式是一个合适的选择。
3. 当需要对集合中的元素进行一致性操作，而不关心具体实现时，迭代器模式可以提供一种简洁的解决方案。