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
    'relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg',
    props.className,
  ]
})

const auroraGradientClasses = computed(() => {
  return [
    'absolute -inset-[10px] opacity-50 will-change-transform',
    'pointer-events-none',
    'filter blur-[10px] invert dark:invert-0',
    'aurora-gradient',
    'dark:aurora-gradient-dark',
    props.showRadialGradient ? '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]' : '',
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
  background-image: var(--white-gradient), var(--aurora);
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
  background-image: var(--white-gradient), var(--aurora);
  background-size: 200% 100%;
  background-attachment: fixed;
  animation: aurora 60s linear infinite;
  mix-blend-mode: difference;
}

.aurora-gradient-dark {
  background-image: var(--dark-gradient), var(--aurora);
}

.aurora-gradient-dark::after {
  background-image: var(--dark-gradient), var(--aurora);
}

:root {
  --white-gradient: repeating-linear-gradient(
    100deg,
    var(--white) 0%,
    var(--white) 7%,
    var(--transparent) 10%,
    var(--transparent) 12%,
    var(--white) 16%
  );
  --dark-gradient: repeating-linear-gradient(
    100deg,
    var(--black) 0%,
    var(--black) 7%,
    var(--transparent) 10%,
    var(--transparent) 12%,
    var(--black) 16%
  );
  --aurora: repeating-linear-gradient(
    100deg,
    var(--blue-500) 10%,
    var(--indigo-300) 15%,
    var(--blue-300) 20%,
    var(--violet-200) 25%,
    var(--blue-400) 30%
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
