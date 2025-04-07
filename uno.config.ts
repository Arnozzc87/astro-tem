import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// 添加颜色变量
function addVariablesForColors(colors: Record<string, any>) {
  const newVars: Record<string, string> = {}

  // 添加基本颜色变量
  newVars['--white'] = '#ffffff'
  newVars['--black'] = '#000000'
  newVars['--transparent'] = 'transparent'

  // 添加Tailwind颜色变量
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([shade, color]) => {
        newVars[`--${key}-${shade}`] = color as string
      })
    }
    else {
      newVars[`--${key}`] = value as string
    }
  })

  return newVars
}

export default defineConfig({
  shortcuts: [
    {
      'bg-main': 'bg-hex-eef5fc dark:bg-hex-0d1117',
      'text-main': 'text-hex-555555 dark:text-hex-bbbbbb',
      'text-link': 'text-dark dark:text-white ',
      'border-main': 'border-truegray-300 dark:border-truegray-600',
    },
    {
      'text-title': 'text-link text-4xl font-800',
      'nav-link': 'text-link opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer',
      'prose-link': 'text-link text-nowrap cursor-pointer border-b-1 !border-opacity-30 hover:!border-opacity-100 border-neutral-500 hover:border-truegray-600 dark:border-neutral-500 hover:dark:border-truegray-400 transition-border-color duration-200 decoration-none',
      'container-link': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-truegray-500 !bg-opacity-10 transition-colors transition-opacity duration-200',
    },
    {
      'hr-line': 'w-14 mx-auto my-8 border-solid border-1px !border-truegray-200 !dark:border-truegray-800',
    },
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'i-ri-file-list-2-line',
    'i-carbon-campsite',
    'i-simple-icons-github',
    'i-simple-icons-x',
    'i-simple-icons-linkedin',
    'i-simple-icons-instagram',
    'i-simple-icons-youtube',
    'i-simple-icons-bilibili',
    'i-simple-icons-zhihu',
    'i-simple-icons-sinaweibo',
    'i-ri-github-line',
    'i-ri-twitter-x-line',
  ],
  rules: [
    ['font-amita', { 'font-family': '"Amitabold", sans-serif' }],
  ],
  theme: {
    extend: {
      animation: {
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%': {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          '50%': {
            backgroundPosition: '150% 50%, 150% 50%',
          },
          '100%': {
            backgroundPosition: '250% 50%, 250% 50%',
          },
        },
      },
      width: {
        '1650px': '1650px',
      },
      minWidth: {
        '359px': '359px',
      },
      height: {
        '125px': '125px',
      },
      fontSize: {
        '72px': '72px',
        '50px': '50px',
        '17px': '17px',
      },
      lineHeight: {
        '24px': '24px',
      },
    },
  },
  preflights: [
    {
      getCSS: () => {
        const colorVars = addVariablesForColors({
          white: '#ffffff',
          black: '#000000',
          transparent: 'transparent',
          blue: {
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
          },
          indigo: {
            300: '#a5b4fc',
          },
          violet: {
            200: '#ddd6fe',
          },
        })

        return `
          :root {
            ${Object.entries(colorVars)
              .map(([key, value]) => `${key}: ${value};`)
              .join('\n')}
          }
        `
      },
    },
  ],
})
