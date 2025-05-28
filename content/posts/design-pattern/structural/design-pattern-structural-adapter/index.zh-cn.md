---
title: "结构型 - 适配器模式"
date: 2020-05-07T16:58:26+08:00
lastmod: 2020-05-07T16:58:26+08:00
tags: ['设计模式']
categories: ['编程']
description: "适配器模式（Adapter）将一个类的接口，转换成客户期望的另一个接口。适配器让原本接口不兼容的类可以合作无间。对象适配器使用组合，类适配器使用多重继承。"
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## 设计思想
适配器模式又叫变压器模式，也叫包装模式（Wrapper），它的核心思想是将一个对象经过包装或转换后使它符合指定的接口，使得调用方可以像使用这接口的一般对象一样使用它。

这一思想，在我们生活中可谓是处处可见，比如变压器插座，能让你像使用国内电器一样使用美标（110V）电器；还有就是各种转接头，如 MiniDP 转 HDMI 转接头、HDMI 转 VGA 线转换器、Micro USB 转 Type-C 转接头等。

适配器模式通常用于对已有的系统拓展新功能时，尤其适用于在设计良好的系统框架下接入第三方的接口或第三方的 SDK 时。

在系统的最初设计阶段，最好不要把适配器模式考虑进去，除非一些特殊的场景（如系统本身就是要去对接和适配多种类型的硬件接口）。

## 类图
### 对象适配器
实现时使用了构成原则：适配器实现了其中一个对象的接口，并对另一个对象进行封装。所有流行的编程语言都可以实现适配器。

{{< mermaid >}}
classDiagram
  direction LR
  class Data
  class ClientInterface {
    <<interface>>
    +method(data: Data) void
  }
  ClientInterface ..> Data

  class Client
  Client --> ClientInterface

  class SpecialData
  class Service {
    +serviceMethod(specialData: SpecialData) void
  }
  Service ..> SpecialData

  class Adapter {
    -Service adapteService
    +method(data: Data) void
  }
  Adapter --> Service
  Adapter ..> Data

{{< /mermaid >}}

### 类适配器
这一实现使用了继承机制：适配器同时继承两个对象的接口。请注意 这种方式仅能在支持多重继承的编程语言中实现，例如 C++。

{{< mermaid >}}
classDiagram
  class Data
  class ExistClass {
    +method(data: Data) void
  }
  ExistClass ..> Data

  class Client
  Client --> ExistClass

  class SpecialData
  class Service {
    +serviceMethod(specialData: SpecialData) void
  }
  Service ..> SpecialData

  class Adapter {
    +method(data: Data) void
  }
  Adapter --|> ExistClass
  Adapter --|> Service

{{< /mermaid >}}

## 代码实现
### 对象适配器
```java
class Data {}

interface ClientInterface {
  void method(Data data);
}

class SpecialData {}

class Service {
  public void serviceMethod(SpecialData specialData) {
    System.out.println("Service serviceMethod invoke.");
  }
}

class Adapter {
  private Service service = new Service();

  private SpecialData convert(Data data) {
    // Data --> SpecialData
  }

  public void method(Data data) {
    SpecialData specialData = convert(data);
    service.serviceMethod(specialData);
  }
}


public class Client {
  public static void main(String[] args) {
    Data data = new Data();
    Adapter adapter = new Adapter();
    adapter.method(data);
  }
}
```

### 类适配器
```c++
class Data {};
class ExistClass {
  public:
    void method(Data *data) {
      std::cout << "ExistClass method invoke.";
    }
};

class SpecialData {};
class Service {
  public:
    void serviceMethod(SpecialData *specialData) {
      std::cout << "Service serviceMethod invoke.";
    }
}

class Adapter : public ExistClass, public Service {
  private:
    SpecialData convert(Data *data) {
      // Data --> SpecialData
    }
  public:
    Adapter() {}
    void method(Data *data) override {
      SpecialData specialData = convert(data);
      serviceMethod(&specialData);
    }
}

int main() {
  Data* data = new Data;
  Adapter* adapter = new Adapter;
  adapter->method(data);
  return 0;
}

```

## 优缺点
优点：
1. 符合**单一职责原则**；你可以将接口或数据转换代码从程序主要业务逻辑中分离。
2. 符合**开闭原则**；只要客户端代码通过客户端接口与适配器进行交互，你就能在不修改现有客户端代码的情况下在程序中添加新类型的适配器。

缺点：
1. 代码整体复杂度增加，因为你需要新增一系列接口和类。有时直接更改服务类使其与其他代码兼容会更简单。
2. 过多地使用适配器，容易使代码结构混乱，如明明看到调用的是 A 接口，内部调用的却是 B 接口的实现。

## 适用场景
1. 当你希望使用某个类，但是其接口与其他代码不兼容时，可以使用适配器类。
2. 对已有的系统拓展新功能时，尤其适用于在设计良好的系统框架下增加接入第三方的接口或第三方的 SDK 时。