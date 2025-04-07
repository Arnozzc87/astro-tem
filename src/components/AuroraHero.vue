<script setup lang="ts">
import AuroraBackground from '@/components/ui/aurora-background.vue'
import { onMounted, ref } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  // 模拟framer-motion的动画效果
  setTimeout(() => {
    isVisible.value = true
  }, 300)
})
</script>

<template>
  <div class="w-full">
    <AuroraBackground>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="relative flex flex-col gap-4 items-center justify-center py-20 md:py-32"
          :class="{ 'opacity-0 translate-y-10': !isVisible, 'opacity-100 translate-y-0': isVisible }"
          :style="{ transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out' }"
        >
          <div class="text-3xl md:text-7xl font-bold dark:text-white text-center max-w-5xl">
            Background lights are cool you know.
          </div>
          <div class="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 max-w-3xl text-center">
            And this, is chemical burn.
          </div>
          <button class="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 text-lg font-medium hover:opacity-90 transition-opacity">
            Debug now
          </button>
        </div>
      </div>
    </AuroraBackground>
  </div>
</template>
