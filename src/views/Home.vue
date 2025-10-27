<script setup lang="ts">
import HomeNav from '../components/landing/HomeNav.vue'
import Banner from '../components/landing/Banner.vue'
import Why from '../components/landing/Why.vue'
import HomeFooter from '../components/landing/HomeFooter.vue'
</script>

<template>
  <div className="text-blue-500 max-w-[1440px] mx-auto">
    <header>
      <HomeNav />
      <Banner />
    </header>

    <main>
      <Why />
      <Ready />
    </main>

    <HomeFooter />
  </div>
</template>
