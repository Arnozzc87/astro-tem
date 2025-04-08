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

export default defineConfig({
  shortcuts: [
    {
      'bg-main': 'bg-zinc-50 dark:bg-zinc-900',
      'text-main': 'text-zinc-600 dark:text-zinc-300',
      'text-link': 'text-dark dark:text-white',
      'border-main': 'border-gray-300 dark:border-gray-600',
    },
    {
      'text-title': 'text-link text-4xl font-800',
      'nav-link': 'text-link opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer',
      'prose-link': 'text-link text-nowrap cursor-pointer border-b-1 border-neutral-500/30 hover:border-neutral-500 dark:border-neutral-400 hover:dark:border-neutral-300 transition duration-200 no-underline',
      'container-link': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-gray-500/10 transition duration-200',
    },
    {
      'hr-line': 'w-14 mx-auto my-8 border-solid border-1 border-gray-200 dark:border-gray-800',
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
    },
  },
})
