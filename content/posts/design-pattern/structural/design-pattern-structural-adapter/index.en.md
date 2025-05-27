---
title: "Structural - Adapter"
date: 2020-05-07T16:58:26+08:00
lastmod: 2020-05-07T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Adapter pattern converts the interface of a class into another interface that the client expects. The adapter allows classes with incompatible interfaces to work together seamlessly. Object adapters use composition, and class adapters use multiple inheritance."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The adapter mode is also called the transformer mode or the wrapper mode. Its core idea is to wrap or convert an object to make it conform to the specified interface, so that the caller can use it like a general object using this interface.

This idea can be seen everywhere in our lives, such as transformer sockets, which allow you to use American standard (110V) appliances like domestic appliances; there are also various adapters, such as MiniDP to HDMI adapter, HDMI to VGA cable converter, Micro USB to Type-C adapter, etc.

The adapter mode is usually used to expand new functions to existing systems, especially when accessing third-party interfaces or third-party SDKs under a well-designed system framework.

In the initial design stage of the system, it is best not to take the adapter mode into consideration, unless there are some special scenarios (such as the system itself is to connect and adapt to multiple types of hardware interfaces).

## Class Diagram
### Object Adapter
The implementation uses the composition principle: the adapter implements the interface of one object and encapsulates the other object. Adapters can be implemented in all popular programming languages.

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

### Class Adapter
This implementation uses inheritance: the adapter inherits the interfaces of both objects. Please note that this approach can only be implemented in programming languages ​​that support multiple inheritance, such as C++.

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

## Code Implementation
### Object Adapter
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
    return service.serviceMethod(specialData);
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

### Class Adapter
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
      return serviceMethod(&specialData);
    }
}

int main() {
  Data* data = new Data;
  Adapter* adapter = new Adapter;
  adapter->method(data);
  return 0;
}

```

## Pros and Cons
Advantages:
1. Comply with **Single Responsibility Principle**; you can separate the interface or data conversion code from the main business logic of the program.
2. Comply with **Open-Closed Principle**; as long as the client code interacts with the adapter through the client interface, you can add new types of adapters to the program without modifying the existing client code.

Disadvantages:
1. The overall complexity of the code increases because you need to add a series of new interfaces and classes. Sometimes it is easier to change the service class directly to make it compatible with other code.
2. Excessive use of adapters can easily confuse the code structure, such as calling interface A but calling the implementation of interface B internally.

## Applicable Scenarios
1. When you want to use a class but its interface is incompatible with other code, you can use an adapter class.
2. When expanding new functions for an existing system, it is especially suitable for adding third-party interfaces or third-party SDKs under a well-designed system framework.