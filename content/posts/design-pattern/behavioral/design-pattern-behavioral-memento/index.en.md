---
title: "Structural - Memento Pattern"
date: 2020-05-18T16:58:26+08:00
lastmod: 2020-05-18T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "Memento is a behavioral design pattern that allows capturing and restoring the internal state of an object without exposing its implementation details."
resources:
- name: "featured-image"
  src: "cover.png"
---

## Design Thoughts
Memento is a behavioral design pattern that allows the internal state of an object to be captured and restored without exposing its implementation details.

The memento pattern usually includes the following roles:

1. Originator: Responsible for creating a memento containing its current internal state and using the memento to restore the internal state. It is the object whose state needs to be backed up and restored.

2. Memento: Stores the internal state of the originator object. The memento can contain the entire state of the originator object or only part of the state, depending on the information that needs to be saved.

3. Caretaker: Responsible for saving the memento and providing it to the originator for state recovery when needed. The manager should not directly modify the content of the memento.

## Class Diagram
{{< mermaid >}}
classDiagram
  direction BT
  class Memento {
    -state
    +Memento(state)
    +getState()
  }

  class Originator {
    -state
    +setState(state)
    +getState()
    +save() Memento
    +restore(memento: Memento)
  }
  Originator ..> Memento

  class Caretaker {
    -Originator originator
    -Memento[] history
    +doSomething()
    +undo()
  }
  Caretaker "1" --* "1..*" Memento

{{< /mermaid >}}

## Code Implementation
```java
class Memento {
  private String state;

  public Memento(String state) {
    this.state = state;
  }

  public String getState() {
    return state;
  }
}

class Originator {
  private String state;

  public void setState(String state) {
    this.state = state;
  }

  public String getState() {
    return state;
  }

  public Memento save() {
    return new Memento(state);
  }

  public void restore(Memento memento) {
    this.state = memento.getState();
  }
}

class Caretaker {
  private Originator originator;

  private Deque<Memento> history = new ArrayDeque<>();

  public Caretaker(Originator originator) {
    this.originator = originator;
  }

  public void doSomething() {
    Memento memento = this.originator.save();
    this.history.addFirst(memento);
  }

  public void undo() {
    if (this.history.isEmpty()) {
      return;
    }
    Memento memento = this.history.removeFirst();
    this.originator.restore(memento);
  }

}

public class Client {
  public static void main(String[] args) {
    Originator originator = new Originator();
    Caretaker caretaker = new Caretaker(originator);
    originator.setState("state 1");
    caretaker.doSomething();
    originator.setState("state 2");
    caretaker.doSomething();
    System.out.println("current state ==> " + originator.getState());
    caretaker.undo();
    System.out.println("current state ==> " + originator.getState());
  }
}
```

## Pros and Cons
Advantages:
1. The memo pattern implements the encapsulation of object state and stores the state in the memo object, thus avoiding direct exposure of the internal implementation details of the object.
2. The memo pattern allows the originator object to not care about the preservation and restoration of the state, and entrusts this responsibility to the memo object, simplifying the implementation of the originator.
3. Effectively manage the object state, allowing the state of the object to be saved and restored at different time points, providing a flexible state management method.

Disadvantages:
1. When a large amount of state needs to be saved, the memo mode may occupy a large amount of memory because each memo object needs to store a complete state.
2. Creating and managing memo objects may bring certain performance overhead, especially when the state needs to be saved frequently.

## Applicable Scenarios
1. When you need to implement an undo operation, the memo pattern is a very practical design pattern. By saving the historical state of the object, the undo function can be easily implemented.
2. In applications that require transaction management, such as database systems, the memo pattern can be used to save the state of the transaction to support transaction rollback.
3. Applications such as graphic editors and text editors can use the memo pattern to save the user's editing history to support undo and redo functions.
4. In game development, the memo pattern can be used to save the game state to support the player's archive and load functions in the game.
5. In systems that need to manage complex workflow states, the memo pattern can be used to save and restore the workflow state.