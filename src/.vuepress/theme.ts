import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://zhonghongfly.com",

  author: {
    name: "Hong Zhong",
    url: "https://zhonghongfly.com",
    email: "zhonghongfly@gmail.com"
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/logo.svg",

  docsDir: "src",

  editLink: false,

  contributors: false,

  lastUpdated: false,

  locales: {
    /**
     * Chinese locale config
     */
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: '<a href="http://beian.miit.gov.cn" target="_blank">赣ICP备18005347号-1</a> | GPL Licensed | Copyright © 2019-present 小洪, All rights reserved.',

      copyright: false,

      displayFooter: true,

      // page meta
      metaLocales: {

      },

    },
    /**
     * English locale config
     */
    "/en": {
      
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "GPL Licensed | Copyright © 2019-present Hong Zhong, All rights reserved.",

      copyright: false,

      displayFooter: true,

      metaLocales: {

      },
    },
  },

  plugins: {
    components: {
      components: ["Badge", "VPCard"],
    },

    feed: {
      atom: true,
      json: true,
      rss: true,
    },

    // These features are enabled for demo, only preserve features you need here
    markdownImage: {
      figure: true,
      lazyload: true,
      size: true,
    },

    markdownMath: {
      // install katex before enabling it
      type: "katex",
      // or install mathjax-full before enabling it
      // type: "mathjax",
    },

    // This features is enabled for demo, only preserve if you need it
    markdownTab: true,

    // These features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true,

      // Install chart.js before enabling it
      // chart: true,

      // insert component easily

      // Install echarts before enabling it
      // echarts: true,

      // Install flowchart.ts before enabling it
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // Install mermaid before enabling it
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // Install @vue/repl before enabling it
      // vuePlayground: true,

      // Install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // Install @vuepress/plugin-pwa and uncomment these if you want a PWA
    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cacheImage: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-touch-icon.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/apple-touch-icon.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/android-chrome-512x512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-192x192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },
});
