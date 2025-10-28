<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { LogOut, Menu, X } from 'lucide-vue-next'
import { LINKS } from '../lib/constant.ts'
import { logoutUser } from '../lib/getUsers.ts'
const isNavOpen = ref(false)
const isNavFixed = ref(false)

const router = useRouter()

const scrollThreshold = 50
const handleScroll = () => {
  if (window.scrollY > scrollThreshold) {
    isNavFixed.value = true
  } else {
    isNavFixed.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleNavToggle = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeMobileNav = () => {
  isNavOpen.value = false
}

const onLogout = () => {
  logoutUser()
  router.push('/')
  closeMobileNav()
}
</script>

<template>
  <nav
    :class="[
      'transition-all duration-300 z-50',
      isNavFixed ? 'fixed w-full top-0 shadow-md' : 'static',
    ]"
  >
    <div
      class="border-b border-neutral-200 h-[70px] font-bold flex items-center px-6 bg-white/80 backdrop-blur-sm justify-between"
    >
      <div class="flex items-center gap-4">
        <img src="/logo-1.png" alt="TicketMS Logo" class="size-[30px]" />
        <h1 class="text-xl text-neutral-800">TicketMS</h1>
      </div>

      <ul class="items-center gap-4 sm:gap-6 hidden sm:flex">
        <li v-for="(link, idx) in LINKS" :key="idx">
          <RouterLink :to="link.href">
            <span class="text-[15px] font-normal capitalize hover:underline">
              {{ link.name }}
            </span>
          </RouterLink>
        </li>
        <li>
          <LogOut
            class="cursor-pointer size-5 text-neutral-600 hover:text-neutral-800"
            @click="onLogout"
            aria-label="Logout"
          />
        </li>
      </ul>

      <button @click="handleNavToggle" class="sm:hidden" aria-label="Toggle navigation">
        <X v-if="isNavOpen" class="size-5" />
        <Menu v-else class="size-5" />
      </button>
    </div>

    <Transition name="slide-down">
      <ul
        v-if="isNavOpen"
        class="px-6 py-8 flex flex-col gap-8 bg-white shadow-md items-center absolute w-full sm:hidden overflow-hidden"
      >
        <li v-for="(link, idx) in LINKS" :key="idx">
          <RouterLink :to="link.href" @click="closeMobileNav">
            <span class="text-[15px] font-normal capitalize hover:underline">
              {{ link.name }}
            </span>
          </RouterLink>
        </li>
        <li
          class="flex items-center gap-3 cursor-pointer text-neutral-600 hover:text-neutral-800"
          @click="onLogout"
        >
          <LogOut class="size-5" />
          <span>Logout</span>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease-in-out;
  max-height: 300px;
  opacity: 1;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
