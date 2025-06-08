---
title: "Structural - Iterator Pattern"
date: 2020-05-17T16:58:26+08:00
lastmod: 2020-05-17T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "Iterator is a behavioral design pattern that provides a way to sequentially access the elements of an aggregate object without exposing the internal representation of the object. The pattern defines an iterator interface, which is responsible for defining methods for accessing and traversing elements, and an iterable interface, which is responsible for returning an instance of the iterator."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
Iterator pattern is a behavioral design pattern that provides a way to sequentially access the elements of an aggregate object without exposing the internal representation of the object. The pattern defines an iterator interface, which is responsible for defining methods for accessing and traversing elements, and an iterable interface, which is responsible for returning an instance of the iterator.

The key idea of ​​the iterator pattern is to provide a method that enables clients to access the elements of an aggregate object without knowing the internal structure of the object.

The following are some key components of the iterator pattern:
1. Iterator interface: defines methods for accessing and traversing elements, usually including hasNext() to determine whether there is a next element, and next() to return the next element.
2. Iterable interface: defines a method iterator() that returns an instance of an iterator. This allows clients to traverse the elements of a collection through an iterator.
3. Concrete Iterator class: implements the iterator interface, is responsible for tracking the state of traversing the collection and returning elements.
4. Concrete Iterable class: implements the iterable interface, is responsible for returning a concrete iterator instance.
5. Client code: Use iterators to traverse collection elements without having to worry about the internal structure of the collection object.

## Class Diagram
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

## Code Implementation
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

## Pros and Cons
Advantages:
1. Comply with the **single responsibility principle**, by extracting the bulky traversal algorithm code into independent classes, you can organize the client code and collection.
2. Comply with the **open-closed principle**, you can implement new collections and iterators and pass them to existing code without modifying the existing code.
3. The iterator pattern defines a unified iterator interface, allowing clients to access different types of collection objects in a consistent way, improving the versatility of the code.
4. The iterator pattern allows multiple different iterators to be provided for the same collection object, each of which can implement different traversal algorithms, allowing clients to choose the traversal method that suits their needs.
5. The iterator pattern reduces the coupling between collection objects and iterators, making it possible to independently change the implementation of collection objects or add new iterators without affecting client code.

Disadvantages:
1. Introducing the iterator pattern will add some extra classes and interfaces, which may make the code structure more complicated, especially for simple collection objects.
2. For some special collections, using iterators may be less efficient than direct traversal.

## Applicable Scenarios
1. The iterator pattern is suitable for scenarios where you need to traverse collection elements and provides a unified access method.
2. When you want to traverse collection elements without exposing the internal structure of the collection, the iterator pattern is a suitable choice.
3. When you need to perform consistent operations on the elements in the collection without caring about the specific implementation, the iterator pattern can provide a concise solution.