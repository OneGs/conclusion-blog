/**
 * 提示：如您想使用JS版本的配置文件可参考：https://github.com/xugaoyi/vuepress-theme-vdoing/tree/a2f03e993dd2f2a3afdc57cf72adfc6f1b6b0c32/docs/.vuepress
 */
import { resolve } from 'path'
import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config'
import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
// @ts-ignore
import dayjs from 'dayjs'

export default defineConfig4CustomTheme<VdoingThemeConfig>({
  theme: resolve(__dirname, '../../vdoing'), // 使用本地主题

  locales: {
    '/': {
      lang: 'zh-CN',
      title: "OneGs",
      description: 'web前端技术博客,专注web前端学习与总结。',
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '路线图',
        link: '/web/',
        items: [
          {
            text: 'Roadmaps',
            items: [
              { text: '地址栏输入地址后回车', link: '/pages/ba6364/' },
            ],
          },
          {
            text: 'JavaScript',
            items: [
              { text: 'js之defer和async', link: '/pages/ea12c1/' },
            ],
          },
          {
            text: 'TCP-IP',
            items: [
              { text: 'TCP的三次握手和四次挥手', link: '/pages/45041a/' }
            ]
          },
        ],
      },
      {
        text: '技术',
        link: '/technology/',
        items: [
          {
            text: 'Javascript',
            items: [
              { text: 'web图标工程化实践', link: '/pages/6cd8ec/' },
            ],
          },
          {
            text: '设计模式',
            items: [
              { text: '命令模式', link: '/pages/d29f17/' },
            ],
          },
          {
            text: '其它',
            items: [
              { text: 'Git使用手册', link: '/pages/9a7ee40fc232253e' },
              { text: 'linux基础', link: '/pages/a1cad6/' }
            ],
          },
        ],
      },
      {
        text: '更多',
        link: '/more/',
        items: [
          { text: '学习', link: '/pages/276c83/' },
          {  text: '阅读记录', link: '/pages/41e6ba/' },
          { text: '其它', link: 'permalink: /pages/c164fe/' }
        ],
      },
    ],
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/logo.png', // 导航栏logo
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
    docsDir: 'docs', // 编辑的文件夹
    editLinks: true, // 启用编辑
    editLinkText: '编辑',
    archive: false, // 是否打开归档功能，默认true
    bodyBgImg: [
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
    ], // body背景大图，默认无。 单张图片 String | 多张图片 Array, 多张图片时每隔15秒换一张。
    bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~ 1.0, 默认0.5
    titleBadge: false, // 文章标题前的图标是否显示，默认true
    contentBgStyle: 5, // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状

    // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sidebar: 'structuring',

    // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
    author: {
      name: 'onegs', // 必需
    },

    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: 'https://cdn.pixabay.com/photo/2022/03/13/08/23/flowers-7065535_960_720.jpg',
      name: 'OneGs',
      slogan: '...',
    },
  },

  // 插件配置
  plugins: <UserPlugins>[
    'fulltext-search',
    [
      'one-click-copy', // 代码块复制按钮
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
        copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
        duration: 1000, // prompt message display time.
        showInMobile: false, // whether to display on the mobile side, default: false.
      },
    ],
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
        options: {
          bgColor: 'rgba(0,0,0,0.6)',
        },
      },
    ],
    [
      '@vuepress/last-updated', // "上次更新"时间格式
      {
        transformer: (timestamp, lang) => {
          return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
        },
      },
    ],
  ],

  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [
    '.vuepress/config.ts',
  ],

  chainWebpack: (config) => {
    config.module
        .rule('svg')
        .exclude.add(resolve(__dirname, 'assets/svgs'))
        .end()

    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve(__dirname, 'assets/svgs'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: "svg-[name]",
        })
        .end()
  }
})
