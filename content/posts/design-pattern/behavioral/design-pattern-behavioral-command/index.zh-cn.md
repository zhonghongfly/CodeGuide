---
title: "结构型 - 命令模式"
date: 2020-05-15T16:58:26+08:00
lastmod: 2020-05-15T16:58:26+08:00
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
  class Command {
    <<interface>>
    +execute()
  }

  class Invoker {
    -Command command
    +setCommand(command: Command)
    +executeCommand()
  }
  Invoker --> Command

  class Receiver {
    +operation(param1, param2, param3);
  }

  class ConcreteCommandA {
    -Receiver receiver
    -Object[] params
    +ConcreteCommandA(receiver: Receiver, params: Object[])
    +execute()
  }

  class ConcreteCommandB {
    -Receiver receiver
    -Object[] params
    +ConcreteCommandB(receiver: Receiver, params: Object[])
    +execute()
  }

  Class Client
  Client 
{{< /mermaid >}}

## 代码实现
```java

```

## 优缺点
优点：


缺点：


## 适用场景
