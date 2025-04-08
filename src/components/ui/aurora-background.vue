<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Props {
  showRadialGradient?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  showRadialGradient: true,
  className: '',
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const auroraClasses = computed(() => {
  return [
    'relative flex flex-col h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition',
    props.className,
  ]
})

const auroraGradientClasses = computed(() => {
  return [
    'absolute -inset-[10px] opacity-50 will-change-transform pointer-events-none blur-10 filter',
    'invert dark:invert-0',
    'aurora-gradient dark:aurora-gradient-dark',
    props.showRadialGradient ? '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]' : '',
  ]
})
</script>

<template>
  <main>
    <div :class="auroraClasses">
      <div class="absolute inset-0 overflow-hidden">
        <div :class="auroraGradientClasses" />
      </div>
      <slot />
    </div>
  </main>
</template>

<style>
.aurora-gradient {
  background-image:
    repeating-linear-gradient(
      100deg,
      rgb(255 255 255) 0%,
      rgb(255 255 255) 7%,
      transparent 10%,
      transparent 12%,
      rgb(255 255 255) 16%
    ),
    repeating-linear-gradient(
      100deg,
      rgb(59 130 246) 10%,
      rgb(165 180 252) 15%,
      rgb(147 197 253) 20%,
      rgb(221 214 254) 25%,
      rgb(96 165 250) 30%
    );
  background-size: 300% 200%;
  background-position:
    50% 50%,
    50% 50%;
  animation: aurora 60s linear infinite;
}

.aurora-gradient::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      100deg,
      rgb(255 255 255) 0%,
      rgb(255 255 255) 7%,
      transparent 10%,
      transparent 12%,
      rgb(255 255 255) 16%
    ),
    repeating-linear-gradient(
      100deg,
      rgb(59 130 246) 10%,
      rgb(165 180 252) 15%,
      rgb(147 197 253) 20%,
      rgb(221 214 254) 25%,
      rgb(96 165 250) 30%
    );
  background-size: 200% 100%;
  background-attachment: fixed;
  animation: aurora 60s linear infinite;
  mix-blend-mode: difference;
}

.aurora-gradient-dark {
  background-image:
    repeating-linear-gradient(100deg, rgb(0 0 0) 0%, rgb(0 0 0) 7%, transparent 10%, transparent 12%, rgb(0 0 0) 16%),
    repeating-linear-gradient(
      100deg,
      rgb(59 130 246) 10%,
      rgb(165 180 252) 15%,
      rgb(147 197 253) 20%,
      rgb(221 214 254) 25%,
      rgb(96 165 250) 30%
    );
}

.aurora-gradient-dark::after {
  background-image:
    repeating-linear-gradient(100deg, rgb(0 0 0) 0%, rgb(0 0 0) 7%, transparent 10%, transparent 12%, rgb(0 0 0) 16%),
    repeating-linear-gradient(
      100deg,
      rgb(59 130 246) 10%,
      rgb(165 180 252) 15%,
      rgb(147 197 253) 20%,
      rgb(221 214 254) 25%,
      rgb(96 165 250) 30%
    );
}

@keyframes aurora {
  from {
    background-position:
      50% 50%,
      50% 50%;
  }
  to {
    background-position:
      350% 50%,
      350% 50%;
  }
}
</style>
