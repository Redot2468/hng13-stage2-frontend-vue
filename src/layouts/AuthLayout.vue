<script setup lang="ts">
import AuthNavbar from '../ui/AuthNavbar.vue'
</script>

<template>
  <div class="flex flex-col max-w-[1440px] mx-auto">
    <AuthNavbar />
    <RouterView />
  </div>
</template>
