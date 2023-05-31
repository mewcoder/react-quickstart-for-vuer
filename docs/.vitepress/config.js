import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "Vue to React Guide",
  description: "Vue 转 React一站式学习指南",
  base: "/vue-to-react-guide/",
  themeConfig: {
    nav: [],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mewcoder/vue-to-react-guide",
      },
    ],
    sidebar: {
      "/": [
        {
          title: "第一章",
          collapsible: false,
          items: [
            { text: "1", link: "/1" },
            { text: "2", link: "/2" },
            { text: "3", link: "/3" },
          ],
        },
      ],
      // "/two/": [
      //   {
      //     title: "配置",
      //     collapsible: false,
      //     items: [
      //       { text: "JavaScript", link: "/one/js" },
      //       { text: "CSS", link: "/one/css" },
      //       { text: "浏览器", link: "/one/browser" },
      //     ],
      //   },
      // ],
    },
  },
  appearance: true,
});
