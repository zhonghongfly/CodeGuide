---
title: "Structural - Interpreter Pattern"
date: 2025-05-16T16:58:26+08:00
lastmod: 2025-05-16T16:58:26+08:00
tags: ['design pattern']
categories: ['programming']
description: "The Interpreter Pattern is a behavioral design pattern that defines the grammar of a language and builds an interpreter to interpret sentences in the language. The Interpreter Pattern is often used to implement programming language interpreters, regular expression interpreters, etc."
resources:
- name: "featured-image"
  src: "cover.png"
---
<!--more-->
## Design Thoughts
The Interpreter Pattern is a behavioral design pattern that defines the grammar of a language and builds an interpreter to interpret sentences in the language. The Interpreter Pattern is often used to implement programming language interpreters, regular expression interpreters, etc.

The key idea of ​​the Interpreter Pattern is to define the grammar rules of a language and build an interpreter to interpret these rules.

The Interpreter Pattern defines the domain language (i.e., problem representation) as a simple language grammar, represents the domain rules as language sentences, and interprets these sentences to solve the problem.
This pattern uses a class to represent each grammar rule. Since grammars are usually hierarchical in structure, the inheritance hierarchy of rule classes maps well.

## Class Diagram
{{< mermaid >}}
classDiagram
  direction LR
  class Context

  class Expression {
    <<interface>>
    +interpret(context: Context)
  }
  Expression ..> Context

  class TerminalExpression {
    +interpret(context: Context)
  }
  TerminalExpression ..|> Expression

  class NonTerminalExpression {
    +interpret(context: Context)
  }
  NonTerminalExpression ..|> Expression

  class Client
  Client --> Context
  Client --> Expression

{{< /mermaid >}}

## Code Implementation
```java
class Context {}

interface Expression {
  void interpret(Context context);
}

class TerminalExpression implements Expression {
  @Override
  public interpret(Context context) {
    System.out.println("TerminalExpression interpret invoke.");
  }
}

class NonTerminalExpression implements Expression {
  @Override
  public interpret(Context context) {
    System.out.println("NonTerminalExpression interpret invoke.");
  }
}

public class Client {
  public static void main(String[] args) {
    Context context = new Context();
    Expression terminalExpression = new TerminalExpression();
    terminalExpression.interpret(context);
    Expression nonTerminalExpression = new NonTerminalExpression();
    nonTerminalExpression.interpret(context);
  }
}
```

## Pros and Cons
Advantages:
1. The interpreter pattern can flexibly expand and change grammar rules, making the system more adaptable and maintainable.
2. New grammar rules can be implemented by adding new expression classes, making the system easier to expand.
3. The interpreter pattern simplifies complex grammar rules into simple expressions, improving the feasibility of understanding and maintenance.

Disadvantages:
1. As the number of grammar rules increases, the interpreter pattern may lead to a large number of classes and objects, increasing the complexity of the system.
2. The interpretation process of the interpreter pattern may introduce runtime overhead, which has a certain impact on performance, especially when processing complex expressions.
3. When grammar rules change frequently, a large number of expression classes may need to be frequently modified and maintained, increasing the difficulty of system maintenance.

## Applicable Scenarios
1. The interpreter pattern is often used to implement interpreters for programming languages, such as parsing script languages, SQL query statements, etc.
2. The interpreter pattern is suitable for implementing rule engines to handle the interpretation and execution of business rules.
3. When dealing with regular expression engines, the interpreter pattern can be used to interpret and execute regular expressions.

> The interpreter pattern performs well in scenarios such as language interpretation and rule engines for specific fields.
> However, its use needs to be weighed based on the complexity and performance requirements of the specific problem.