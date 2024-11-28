import { defineUserConfig, HeadConfig } from "vuepress";

import theme from "./theme.js";

const BASIC_HEAD:HeadConfig[] = [
  // meta
  ["meta", { name: "robots", content: "all" }],
  ["meta", { name: "author", content: "Hong Zhong" }],
  [
    "meta",
    {
      "http-equiv": "Cache-Control",
      content: "no-cache, no-store, must-revalidate",
    },
  ],
  ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
  ["meta", { "http-equiv": "Expires", content: "0" }],
  ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }]
];

const EN_META = {
  keywords: 'Java basics, multi-threading, JVM, virtual machine, database, MySQL, Spring, Redis, MyBatis, system design, distributed, RPC, high availability, high concurrency',
  description: 'This is a computer programming guide, including: Java basics, JDK source code, JVM, Spring, Spring Boot, Spring Cloud, database principles, MySQL, ElasticSearch, MongoDB, Docker, k8s, CI&CD, Linux, DevOps, distribution, middleware , development tools, Git, IDE, source code reading, reading notes, open source projects...'
};

const ZH_META = {
  keywords: 'Java基础, 多线程, JVM, 虚拟机, 数据库, MySQL, Spring, Redis, MyBatis, 系统设计, 分布式, RPC, 高可用, 高并发',
  description: '这是一份计算机编程指南，包含: Java 基础, JDK源码, JVM, Spring, Spring Boot, Spring Cloud, 数据库原理, MySQL, ElasticSearch, MongoDB, Docker, k8s, CI&CD, Linux, DevOps, 分布式, 中间件, 开发工具, Git, IDE, 源码阅读，读书笔记, 开源项目...'
};

export default defineUserConfig({
  base: "/",

  head: BASIC_HEAD,

  locales: {
    "/": {
      lang: "en-US",
      title: "Computer Programming Guide",
      description: EN_META.description,
      head: [
        ...BASIC_HEAD,
        [
          "meta",
          {
            name: "keywords",
            content: EN_META.keywords,
          },
        ],
        [
          "meta",
          {
            name: "description",
            content: EN_META.description
          },
        ],
      ]
    },
    "/zh/": {
      lang: "zh-CN",
      title: "小洪玩编程",
      head: [
        ...BASIC_HEAD,
        [
          "meta",
          {
            name: "keywords",
            content: ZH_META.keywords,
          },
        ],
        [
          "meta",
          {
            name: "description",
            content: ZH_META.description
          },
        ],
      ],
      description: ZH_META.description
    },
  },

  theme,

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  // Enable it with pwa
  shouldPrefetch: false,
  shouldPreload: false,
});
