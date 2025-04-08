export interface NavLink {
  text: string
  href: string
  children?: {
    text: string
    href: string
    description?: string
  }[]
}

export interface SiteConfig {
  author: string
  title: string
  subtitle: string
  description: string
  email: string
  lang: string
  ogLocale: string
  themeColorLight: string
  themeColorDark: string
  date: {
    locale: string | string[] | undefined
    options: Intl.DateTimeFormatOptions
  }
  image?: {
    src: string
    alt?: string
  }
  header: {
    logo: {
      src: string
      alt: string
    }
    navLinks: NavLink[]
  }
  socialLinks: Array<{
    text: string
    href: string
    icon: string
    header?: boolean | string
  }>
  page: {
    blogLinks: Array<{
      text: string
      href: string
    }>
  }
  footer: {
    navLinks: Array<{
      text: string
      href: string
    }>
  }
}

export const siteConfig: SiteConfig = {
  author: 'Kevin Wong',
  title: 'Vitesse theme for Astro',
  subtitle: 'Opinionated Vite Starter Template',
  description: 'A simple, clean, and modern theme for Astro',
  image: {
    src: '/hero.jpg',
    alt: 'Website Main Image',
  },
  email: 'kevinwong865@gmail.com',
  lang: 'zh-CN',
  ogLocale: 'zh_CN',
  themeColorLight: '#fafafa',
  themeColorDark: '#1d1d1d',
  date: {
    locale: 'zh-CN',
    options: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  },
  socialLinks: [
    {
      text: 'GitHub',
      href: 'https://github.com/your-username',
      icon: 'i-simple-icons-github',
      header: true,
    },
    {
      text: 'Twitter',
      href: 'https://twitter.com/your-username',
      icon: 'i-simple-icons-x',
      header: true,
    },
    {
      text: 'Linkedin',
      href: '',
      icon: 'i-simple-icons-linkedin',
    },
    {
      text: 'Instagram',
      href: '',
      icon: 'i-simple-icons-instagram',
    },
    {
      text: 'Youtube',
      href: '',
      icon: 'i-simple-icons-youtube',
    },
  ],
  header: {
    logo: {
      src: '/favicon.svg',
      alt: 'Logo Image',
    },
    navLinks: [
      {
        text: '文档',
        href: '/docs',
        children: [
          {
            text: '开始使用',
            href: '/docs/getting-started',
            description: '了解如何快速开始使用我们的产品',
          },
          {
            text: 'API 参考',
            href: '/docs/api',
            description: '详细的 API 文档和使用示例',
          },
        ],
      },
      {
        text: '资源',
        href: '/resources',
        children: [
          {
            text: '示例项目',
            href: '/resources/examples',
            description: '探索各种实际应用场景',
          },
          {
            text: '教程',
            href: '/resources/tutorials',
            description: '学习如何使用高级功能',
          },
        ],
      },
      {
        text: '博客',
        href: '/blog',
      },
      {
        text: '关于',
        href: '/about',
      },
    ],
  },
  page: {
    blogLinks: [
      {
        text: 'Blog',
        href: '/blog',
      },
      {
        text: 'Notes',
        href: '/blog/notes',
      },
      {
        text: 'Talks',
        href: '/blog/talks',
      },
    ],
  },
  footer: {
    navLinks: [
      {
        text: 'Posts Props',
        href: '/posts-props',
      },
      {
        text: 'Markdown Style',
        href: '/md-style',
      },
      {
        text: 'View on Astro',
        href: 'https://astro.build/themes/details/vitesse-theme-for-astro/',
      },
      {
        text: 'GitHub Repository',
        href: 'https://github.com/kevinwong865/astro-theme-vitesse',
      },
    ],
  },
}

export default siteConfig
