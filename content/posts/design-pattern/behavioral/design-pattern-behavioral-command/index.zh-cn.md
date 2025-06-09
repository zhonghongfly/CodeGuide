---
title: "结构型 - 命令模式"
date: 2025-05-15T16:58:26+08:00
lastmod: 2025-05-15T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "命令模式（Command）是一种行为设计模式，它可将请求转换为一个包含与请求相关的所有信息的独立对象。该转换让你能根据不同的请求将方法参数化、延迟请求执行或将其放入队列中，且能实现可撤销操作。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
命令模式（Command）是一种行为设计模式，它可将请求转换为一个包含与请求相关的所有信息的独立对象。该转换让你能根据不同的请求将方法参数化、延迟请求执行或将其放入队列中，且能实现可撤销操作。

命令模式通常涉及以下几个角色：
1. 命令接口（Command）：定义执行操作的接口。
2. 具体命令类（ConcreteCommand）：实现命令接口，封装了执行操作的具体逻辑。
3. 调用者或请求者（Invoker）：负责调用命令对象执行请求。
4. 接收者（Receiver）：知道如何实施与执行一个请求相关的操作。
5. 客户端（Client）：创建具体命令对象并设置其接收者。

## 类图
{{< mermaid >}}
classDiagram
  direction BT
  class Command {
    <<interface>>
    +execute()
  }

  class Invoker {
    -Command command
    +setCommand(command: Command)
    +executeCommand()
  }
  Invoker --o Command

  class Receiver {
    +operation(param1, param2, param3)
  }

  class ConcreteCommand {
    -Receiver receiver
    -Object[] params
    +ConcreteCommand(receiver: Receiver, params: Object[])
    +execute()
  }
  ConcreteCommand ..|> Command
  ConcreteCommand --> Receiver

  Class Client
  Client --> Receiver
  Client ..> ConcreteCommand
{{< /mermaid >}}

## 代码实现
```java
interface Command {
  void execute();
}

class Invoker {
  private Command command;

  public void setCommand(Command command) {
    this.command = command;
  }

  public void executeCommand() {
    this.command.execute();
  }
}

class Receiver {
  public void operation(Object... params) {
    System.out.println("Receiver operation invoke.");
  }
}

class ConcreteCommand implements Command {
  private Receiver receiver;

  private Object[] params;

  public ConcreteCommand(Receiver receiver, Object[] params) {
    this.receiver = receiver;
    this.params = params;
  }

  @Override
  public void execute() {
    System.out.println("ConcreteCommand execute invoke.");
    this.receiver.operation(this.params);
  }
}

public class Client {
  public static void main(String[] args) {
    Receiver receiver = new Receiver();
    Command command = new ConcreteCommand(receiver, new Object[] {});
    Invoker invoker = new Invoker();
    invoker.setCommand(command);
    invoker.executeCommand();
  }
}
```

## 优缺点
优点：
1. 符合**单一职责原则**，命令模式将调用者和接收者解耦，使得系统中的对象更加独立。调用者无需了解接收者的具体实现，仅需要知道如何使用命令对象即可。
2. 符合**开闭原则**，新的命令类可以很容易地添加到系统中，而无需修改现有的代码。这使得系统更容易扩展和维护。

缺点：
1. 每个具体命令都需要一个对应的命令类，可能会导致类的数量增加，系统变得复杂。

## 适用场景
1. 在图形用户界面中，菜单和按钮的点击操作通常使用命令模式，将不同的操作封装为命令对象。
2. 当需要支持多级撤销和重做操作时，命令模式是一个常见的选择。
3. 遥控器通常使用命令模式，每个按钮对应一个命令，从而实现对设备的控制。
4. 命令模式可以用于实现任务调度和队列系统，将命令对象放入队列中依次执行。
5. 在数据库系统中，命令模式可以用于管理事务的执行和回滚，确保一系列数据库操作的一致性。

> 命令模式适用于需要解耦调用者和接收者、支持撤销和重做、支持命令的排队、队列和日志等场景。
> 在合适的场景下，命令模式可以提高系统的灵活性和可维护性。