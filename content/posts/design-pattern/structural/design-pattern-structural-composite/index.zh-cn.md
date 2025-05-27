---
title: "结构型 - 组合模式"
date: 2020-05-09T16:58:26+08:00
lastmod: 2020-05-09T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "组合模式（Composite Pattern）是一种结构型设计模式，它允许将对象组合成树状结构以表示部分-整体的层次结构。组合模式使得客户端可以统一处理单个对象和对象组合，而无需区分它们的类型。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
组合模式（Composite Pattern）是一种结构型设计模式，它允许将对象组合成树状结构以表示部分-整体的层次结构。组合模式使得客户端可以统一处理单个对象和对象组合，而无需区分它们的类型。

组合模式通常包括以下几个角色：
1. 组件（Component）：定义组合中所有对象的通用接口。可以是抽象类或者接口，声明了一些操作方法，通常包括添加子节点、删除子节点、获取子节点等。
2. 叶子（Leaf）：在组合中表示叶子节点对象，叶子节点没有子节点。实现了组件接口。
3. 复合（Composite）：表示容器节点，可以包含叶子节点或其他复合节点。实现了组件接口，通常包含一个子节点列表。

## 类图
{{< mermaid >}}
classDiagram
  direction LR
  class Component {
    <<interface>>
    +execute() void
  }

  class Leaf {
    +execute() void
  }
  Leaf ..|> Component

  class Composite {
    -Component[] children
    +add(component: Component) void
    +remove(component: Component) void
    +getChildren() Component[]
    +execute() void
  }
  Composite ..|> Component
  Composite "1" --* "1..*" Component

  class Client
  Client --> Component

{{< /mermaid >}}

## 代码实现
```java
interface Component {
  void execute();
}

class Leaf implements Component {
  @Override
  public void execute() {
    System.out.println("Leaf execute invoke.");
  }
}

class Composite implements Component {

  private List<Component> children = new ArrayList<>();

  public void add(Component component) {
    this.children.add(component);
  }

  public void remove(Component component) {
    this.children.remove(component);
  }

  public List<Component> getChildren() {
    return new ArrayList<>(this.children);
  }

  @Override
  public void execute() {
    System.out.println("Composite execute invoke start.");
    for (int i = 0; i < children.size(); i++) {
      Component component = children.get(i);
      System.out.println("Composite children[" + i + "] execute invoke start.");
      component.execute();
      System.out.println("Composite children[" + i + "] execute invoke end.");
    }
    System.out.println("Composite execute invoke end.");
  }
}

public class Client {
  public static void main(String[] args) {
    Composite root = new Composite();
    Component node1 = new Leaf();
    Component node2 = new Composite();
    Component node3 = new Leaf();

    root.add(node1);
    root.add(node2);
    root.add(node3);

    root.execute();
  }
}
```

## 优缺点
优点：
1. 组合模式统一了叶子和复合节点的接口，使得客户端可以一致地处理单个对象和组合对象，降低了客户端代码的复杂性。
2. 组合模式支持动态组合，可以在运行时动态地添加或移除子节点，使得系统更加灵活，易于扩展。
3. 符合**开闭原则**；无需更改现有代码，你就可以在应用中添加新元素，使其成为对象树的一部分。

缺点：
1. 组合模式追求一致的接口，但这可能导致某些操作在叶子节点中没有实际意义。透明性和一致性之间需要平衡。
2. 在处理大型树形结构时，递归操作可能导致性能问题。需要谨慎设计，避免出现性能瓶颈。

## 适用场景
1. 当存在整体-部分关系，且对象形成了树形结构，适合使用组合模式。例如，文件系统、图形用户界面（GUI）中的 UI 组件等。
2. 当客户端需要一致地对待单个对象和组合对象时，适合使用组合模式。例如，处理菜单和菜单项的关系。
3. 当对象的结构呈嵌套结构，而且希望客户端能够以统一的方式处理这些对象时，组合模式是一个合适的选择。