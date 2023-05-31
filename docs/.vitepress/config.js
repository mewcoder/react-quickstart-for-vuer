import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "Vue to React Guide",
  description: "Vue 转 React一站式学习指南",
  base: "/vue-to-react-guide/",
  themeConfig: {
    nav: [
      // {
      //   text: "基础",
      //   items: [
      //     { text: "JavaScript", link: "/one/js" },
      //     { text: "CSS", link: "/one/css" },
      //     { text: "浏览器", link: "/one/browser" },
      //   ],
      // },
      // {
      //   text: "综合",
      //   items: [
      //     { text: "vue", link: "/two/vue" },
      //     { text: "webpack", link: "/two/webpack" },
      //     { text: "其他", link: "/two/other" },
      //   ],
      // },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mewcoder/vue-to-react-guide",
      },
    ],
    sidebar: {
      "/": [
        {
          title: "引导",
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
