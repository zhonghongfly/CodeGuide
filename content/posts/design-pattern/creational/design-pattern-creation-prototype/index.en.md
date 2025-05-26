---
title: "Creational - Prototype"
date: 2020-05-06T16:58:26+08:00
lastmod: 2020-05-06T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "Prototype mode (Prototype), use the prototype instance to specify the type of object to be created, and create new objects by copying this prototype; without making the code dependent on the class to which they belong."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Prototype pattern delegates the cloning process to the actual object being cloned. The pattern declares a common interface for all objects that support cloning, which allows you to clone objects without coupling your code to the class to which the object belongs. Typically, such an interface contains only a single `clone` method.

This method creates an object of the current class and then copies all the member variable values ​​of the original object to the newly created class. You can even copy private member variables, because most programming languages ​​allow objects to access the private member variables of their own class.

Objects that support cloning are prototypes; when your object has dozens of member variables and hundreds of types, cloning it can even replace the construction of subclasses.

## Class Diagram
{{< mermaid >}}
classDiagram
  class Prototype {
    <<interface>>
    +clone() Prototype
  }

  class ConcretePrototype1 {
    -int value
    +ConcretePrototype1(value: int)
    +ConcretePrototype1(prototype: Prototype)
    +clone() Prototype
    +getValue() int
  }

  ConcretePrototype1 ..|> Prototype

  class ConcretePrototype2 {
    -int value
    +ConcretePrototype2(value: int)
    +ConcretePrototype2(prototype: Prototype)
    +clone() Prototype
    +getValue() int
  }

  ConcretePrototype2 ..|> Prototype
{{< /mermaid >}}

## Code Implementation
```java
public class PrototypeTest {

  interface Prototype {
    Prototype clone();
  }

  class ConcretePrototype1 implements Prototype {

    private int value;

    public ConcretePrototype1(int value) {
      this.value = value;
    }

    public ConcretePrototype1(ConcretePrototype1 prototype) {
      this.value = prototype.value;
    }

    @Override
    public Prototype clone() {
      return new ConcretePrototype1(this);
    }
  }

  class ConcretePrototype2 implements Prototype {

    private int value;

    public ConcretePrototype1(int value) {
      this.value = value;
    }

    public ConcretePrototype2(ConcretePrototype1 prototype) {
      this.value = prototype.value;
    }

    @Override
    public Prototype clone() {
      return new ConcretePrototype2(this);
    }
  }

  public static void main(String[] args) {
    ConcretePrototype1 prototype = new ConcretePrototype1(6);
    ConcretePrototype1 newPrototype = prototype.clone();
  }
}
```

## Pros and Cons
Advantages:
1. Objects can be cloned without being coupled to the concrete classes they belong to.
2. Complex objects can be generated more conveniently.
3. Different configurations of complex objects can be handled in ways other than inheritance.

Disadvantages:
1. Cloning complex objects containing circular references can be very troublesome.
2. The implementation of the cloning method may need to consider the issues of deep cloning and shallow cloning.

## Applicable Scenarios
1. If you need to copy some objects and want the code to be independent of the specific classes to which these objects belong, you can use the prototype pattern.
2. If the subclasses differ only in the way their objects are initialized, you can use this pattern to reduce the number of subclasses.