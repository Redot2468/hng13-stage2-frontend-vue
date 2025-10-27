<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
const isNavFixed = ref(false)

const scrollThreshold = 50

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isNavFixed.value = window.scrollY > scrollThreshold
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    :class="[
      'border-neutral-200 h-[70px] font-bold flex items-center px-6 justify-between transition-colors duration-300',
      isNavFixed ? 'fixed w-full bg-white/80 z-50 backdrop-blur-sm shadow-sm' : 'bg-white static',
    ]"
  >
    <div class="flex items-center gap-4">
      <img src="/logo-1.png" alt="TicketFlow Logo" class="size-[30px]" />
      <h1 class="text-xl text-neutral-800">TicketFlow</h1>
    </div>

    <div class="flex items-center gap-4">
      <RouterLink to="/auth/login">
        <p class="font-medium text-neutral-800 hidden sm:block hover:underline">Login</p>
      </RouterLink>

      <RouterLink to="/auth/signup">
        <Button
          :class="[
            'hover:bg-blue-600 hover:text-white',
            isNavFixed
              ? 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
              : 'bg-blue-500 text-white',
          ]"
        >
          Get Started
        </Button>
      </RouterLink>
    </div>
  </nav>
</template>
