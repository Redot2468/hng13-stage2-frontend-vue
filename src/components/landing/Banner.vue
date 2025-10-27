<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div>
    <div class="bg-[url('/wave.svg')] bg-no-repeat bg-cover border-black h-[700px] px-4">
      <div
        class="max-w-[540px] md:max-w-[700px] h-[500px] flex flex-col items-center gap-6 mx-auto justify-center"
      >
        <h1 class="text-[35px] md:text-5xl font-bold text-white text-center">
          Manage Your Tickets with Ease
        </h1>

        <p class="text-gray-100 text-center text-lg md:text-xl">
          Streamline your workflow with our powerful ticket management system. Track, organize, and
          resolve issues faster than ever before.
        </p>

        <div class="flex flex-col gap-5 items-center mt-2 md:flex-row">
          <RouterLink to="/auth/signup">
            <Button
              class="bg-white font-medium text-neutral-600 text-lg px-8 h-[45px] hover:bg-blue-600 hover:text-white"
            >
              Get Started
            </Button>
          </RouterLink>
          <RouterLink to="/auth/login">
            <Button
              class="bg-white/10 backdrop-blur-md font-medium px-7 text-lg h-[43px] hover:bg-blue-600 hover:text-white border border-white/20"
            >
              Login
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
