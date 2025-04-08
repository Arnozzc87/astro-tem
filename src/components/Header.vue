<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter((link: Record<string, any>) => {
    if (link.header && typeof link.header === 'boolean') {
      return link
    }
    else if (link.header && typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return link
    }
    else {
      return false
    }
  })
})

const { y: scroll } = useWindowScroll()

const oldScroll = ref(unref(scroll))

onMounted(() => {
  const navMask = document.querySelector('.nav-drawer-mask') as HTMLElement

  navMask?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  const headerEl = document.querySelector('#header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 150) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
      headerEl.classList.remove('header-hide')
      oldScroll.value = scroll.value
    }
  })
})

function toggleNavDrawer() {
  const drawer = document.querySelector('.nav-drawer') as HTMLElement
  const mask = document.querySelector('.nav-drawer-mask') as HTMLElement
  if (!drawer || !mask)
    return
  if (drawer.style.transform === `translateX(0%)`) {
    drawer.style.transform = `translateX(-100%)`
    mask.style.display = `none`
  }
  else {
    drawer.style.transform = `translateX(0%)`
    mask.style.display = `block`
  }
}
</script>

<template>
  <header
    id="header" :class="{ 'header-bg-blur': scroll > 20 }"
    class="!fixed bg-transparent z-899 w-full h-20 flex justify-center items-center relative"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
      <a href="/" mr-6 aria-label="Header Logo Image">
        <img width="32" height="32" :src="siteConfig.header.logo.src" :alt="siteConfig.header.logo.alt" loading="lazy">
      </a>

      <nav class="sm:flex hidden flex-1 justify-center">
        <div class="flex gap-x-6 position-initial flex-row">
          <div v-for="link in navLinks" :key="link.text" class="nav-item relative">
            <a
              :aria-label="`${link.text}`"
              :target="getLinkTarget(link.href)"
              nav-link
              :href="link.href"
              class="flex items-center"
            >
              {{ link.text }}
              <i v-if="link.children" i-ri-arrow-down-s-line ml-1 text-sm transition-transform duration-200 />
            </a>
            <div v-if="link.children" class="submenu">
              <a
                v-for="child in link.children"
                :key="child.text"
                :href="child.href"
                :target="getLinkTarget(child.href)"
                class="submenu-item"
              >
                <div class="font-medium">{{ child.text }}</div>
                <div v-if="child.description" class="text-sm opacity-80">{{ child.description }}</div>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex gap-x-6">
        <a
          v-for="link in socialLinks"
          :key="link.text"
          :aria-label="`${link.text}`"
          :class="link.icon"
          nav-link
          :target="getLinkTarget(link.href)"
          :href="link.href"
        />
        <a nav-link target="_blank" href="/rss.xml" i-ri-rss-line aria-label="RSS" />
        <ThemeToggle />
      </div>

      <div sm:hidden h-full flex items-center @click="toggleNavDrawer()">
        <menu i-ri-menu-2-fill />
      </div>
    </div>
  </header>
  <nav class="nav-drawer sm:hidden">
    <i i-ri-menu-2-fill />
    <div v-for="link in navLinks" :key="link.text" class="flex flex-col">
      <a
        :aria-label="`${link.text}`"
        :target="getLinkTarget(link.href)"
        nav-link
        :href="link.href"
        @click="toggleNavDrawer()"
      >
        {{ link.text }}
      </a>
      <div v-if="link.children" class="pl-4 flex flex-col gap-2 mt-2">
        <a
          v-for="child in link.children"
          :key="child.text"
          :href="child.href"
          :target="getLinkTarget(child.href)"
          class="text-sm opacity-80 hover:opacity-100"
          @click="toggleNavDrawer()"
        >
          {{ child.text }}
        </a>
      </div>
    </div>
  </nav>
  <div class="nav-drawer-mask" @click="toggleNavDrawer()" />
</template>

<style scoped>
.header-hide {
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-sm;
}

.nav-drawer {
  transform: translateX(-100%);
  --at-apply: box-border fixed h-screen z-999 left-0 top-0 min-w-32vw max-w-50vw bg-main p-6 text-lg flex flex-col gap-5
    transition-all;
}

.nav-drawer-mask {
  display: none;
  --at-apply: transition-all;
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.nav-item:hover .submenu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.nav-item:hover i {
  transform: rotate(180deg);
}

.submenu {
  position: absolute;
  top: 100%;
  left: -1rem;
  min-width: 200px;
  background: var(--dot-bg-color);
  border: 1px solid var(--dot-color);
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: all 0.2s ease;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.submenu::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 2rem;
  width: 10px;
  height: 10px;
  background: var(--dot-bg-color);
  border-left: 1px solid var(--dot-color);
  border-top: 1px solid var(--dot-color);
  transform: rotate(45deg);
}

.submenu-item {
  display: block;
  padding: 0.75rem 1rem;
  color: inherit;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.submenu-item:hover {
  background: var(--dot-color);
}
</style>
