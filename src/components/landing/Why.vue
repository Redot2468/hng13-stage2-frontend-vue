<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WHY_TEXT } from '@/lib/constant'
</script>

<template>
  <div>
    <Card class="border-0 shadow-none">
      <CardHeader class="text-center">
        <CardTitle class="text-3xl font-bold text-neutral-800 md:text-[33px]">
          Why Choose TicketFlow?
        </CardTitle>
        <CardDescription class="text-lg text-neutral-700 mt-2">
          Everything you need to manage tickets efficiently and effectively.
        </CardDescription>
      </CardHeader>

      <CardContent class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="(text, idx) in WHY_TEXT" :key="idx">
          <CardHeader>
            <div
              :class="['h-12 w-12 rounded-lg flex items-center justify-center mb-4', text.color]"
            >
              <component :is="text.logo" class="h-6 w-6 text-white" />
            </div>

            <CardTitle class="text-xl font-semibold text-neutral-800">
              {{ text.title }}
            </CardTitle>
            <CardDescription class="text-neutral-600 mt-2 text-base">
              {{ text.description }}
            </CardDescription>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  </div>
</template>
