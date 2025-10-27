<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
</script>

<template>
  <div class="bg-neutral-100 py-10">
    <Card class="bg-transparent border-0 shadow-none max-w-[1440px] mx-auto px-4">
      <CardHeader class="mb-12">
        <div
          class="rounded-xl flex-col gap-3 py-8 px-6 flex items-center text-center bg-white shadow-sm"
        >
          <h2 class="text-3xl md:text-[33px] font-bold text-neutral-800">
            Ready to manage your tickets?
          </h2>
          <p class="text-neutral-600 text-lg mt-2 max-w-xl">
            Join thousands of teams already using TicketFlow to streamline their support operations.
          </p>

          <RouterLink to="/auth/signup">
            <Button
              class="bg-blue-700 hover:bg-blue-800 text-white mt-4 px-10 h-[42px] min-w-[150px] flex items-center gap-2"
            >
              Get Started
              <ArrowRight class="size-5 text-white" />
            </Button>
          </RouterLink>
        </div>
      </CardHeader>
    </Card>
  </div>
</template>
