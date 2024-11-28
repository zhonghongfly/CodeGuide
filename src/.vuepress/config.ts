import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Computer Programming Guide",
      description: "This is a computer programming guide, including: Java basics, JDK source code, JVM, Spring, Spring Boot, Spring Cloud, database principles, MySQL, ElasticSearch, MongoDB, Docker, k8s, CI&CD, Linux, DevOps, distribution, middleware , development tools, Git, IDE, source code reading, reading notes, open source projects...",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "小洪玩编程",
      description: "这是一份计算机编程指南，包含: Java 基础, JDK源码, JVM, Spring, Spring Boot, Spring Cloud, 数据库原理, MySQL, ElasticSearch, MongoDB, Docker, k8s, CI&CD, Linux, DevOps, 分布式, 中间件, 开发工具, Git, IDE, 源码阅读，读书笔记, 开源项目...",
    },
  },

  theme,

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  // Enable it with pwa
  shouldPrefetch: false,
  shouldPreload: false,
});
