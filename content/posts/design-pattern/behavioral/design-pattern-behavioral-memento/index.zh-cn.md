---
title: "结构型 - 备忘录模式"
date: 2025-05-19T16:58:26+08:00
lastmod: 2025-05-19T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "备忘录模式（Memento）是一种行为设计模式，它允许在不暴露对象实现细节的情况下捕获并恢复其内部状态。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
备忘录模式（Memento）是一种行为设计模式，它允许在不暴露对象实现细节的情况下捕获并恢复其内部状态。

备忘录模式通常包含以下几个角色：
1. 发起人（Originator）：负责创建一个包含其当前内部状态的备忘录，并使用备忘录恢复内部状态。它是需要被备份和恢复状态的对象。
2. 备忘录（Memento）：存储发起人对象的内部状态。备忘录可以包含发起人对象的全部状态，也可以只包含部分状态，具体取决于需要保存的信息。
3. 管理者（Caretaker）：负责保存备忘录，并在需要的时候将其提供给发起人以进行状态恢复。管理者不应该直接修改备忘录的内容。

## 类图
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

## 代码实现
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

## 优缺点
优点：
1. 备忘录模式实现了对象状态的封装，将状态存储在备忘录对象中，从而避免了直接暴露对象内部实现细节。
2. 备忘录模式使得原发器对象不必关心状态的保存和还原，将这一责任交给备忘录对象处理，简化了原发器的实现。
3. 有效地管理对象状态，允许在不同时间点保存和还原对象的状态，提供了一种灵活的状态管理方式。

缺点：
1. 当需要保存大量的状态时，备忘录模式可能会占用较大的内存，因为每个备忘录对象都需要存储一份完整的状态。
2. 创建和管理备忘录对象可能带来一定的性能开销，尤其在需要频繁保存状态的情况下。

## 适用场景
1. 当需要实现撤销操作时，备忘录模式是一个非常实用的设计模式。通过保存对象的历史状态，可以轻松实现撤销功能。
2. 在数据库系统等需要事务管理的应用中，备忘录模式可以用于保存事务的状态，以支持事务的回滚。
3. 图形编辑器、文本编辑器等应用可以使用备忘录模式来保存用户的编辑历史，以支持撤销和重做功能。
4. 在游戏开发中，备忘录模式可以用于保存游戏状态，以支持玩家在游戏中的存档和加载功能。
5. 在需要管理复杂工作流程状态的系统中，备忘录模式可以用于保存和还原工作流程的状态。