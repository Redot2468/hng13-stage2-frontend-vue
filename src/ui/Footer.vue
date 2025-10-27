<script setup lang="ts"></script>

<template>
  <footer class="border-t w-full py-6 px-8 space-y-5 flex flex-col items-center">
    <div class="flex items-center gap-4">
      <img src="/logo-1.png" alt="TicketFlow Logo" class="size-[30px]" />
      <h1 class="text-lg text-neutral-800 font-semibold">TicketFlow</h1>
    </div>
    <p class="text-neutral-600 text-[15px]">
      &copy; {{ new Date().getFullYear() }} TicketFlow. All rights reserved.
    </p>
  </footer>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
