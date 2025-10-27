<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/ticket'
import { getUser } from '@/lib/getUsers'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type TicketStatus = 'opened' | 'in_progress' | 'closed'

const user = getUser()
const ticketsStore = useTicketsStore()

const totalTickets = computed(() => ticketsStore.tickets.length)

const numberofTicketsByStatus = (status: TicketStatus) => {
  return computed(() =>
    ticketsStore.tickets.reduce(
      (acc, curTicket) => (curTicket.status === status ? acc + 1 : acc),
      0,
    ),
  )
}

const openTickets = numberofTicketsByStatus('opened')
const inProgressTickets = numberofTicketsByStatus('in_progress')
const closedTickets = numberofTicketsByStatus('closed')

const overviewData = computed(() => [
  {
    name: 'total tickets',
    desc: 'All time tickets created',
    count: totalTickets.value,
  },
  {
    name: 'Open tickets',
    desc: 'Waiting to be started',
    count: openTickets.value,
  },
  {
    name: 'In Progress tickets',
    desc: 'Currently being worked on',
    count: inProgressTickets.value,
  },
  {
    name: 'Closed tickets',
    desc: 'Successfully completed',
    count: closedTickets.value,
  },
])
</script>

<template>
  <div class="py-3">
    <Card class="border-none shadow-none">
      <CardHeader>
        <CardTitle class="text-2xl">Welcome back, {{ user?.name }}</CardTitle>
        <CardDescription class="text-lg">
          Here's an overview of your ticket management system
        </CardDescription>
      </CardHeader>

      <CardContent class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
        <Card
          v-for="(data, index) in overviewData"
          :key="index"
          class="flex items-center gap-4 flex-row justify-between pr-6"
        >
          <CardHeader class="w-full flex-grow">
            <CardTitle class="text-lg capitalize">
              {{ data.name }}
            </CardTitle>
            <CardDescription>{{ data.desc }}</CardDescription>
          </CardHeader>
          <h1 class="text-3xl font-bold">{{ data.count }}</h1>
        </Card>
      </CardContent>

      <CardHeader class="mt-10 mb-12">
        <div
          class="border rounded-xl flex-col gap-3 py-8 px-6 flex items-center text-center sm:items-start sm:text-left"
        >
          <h2 class="text-2xl font-bold">Ready to manage your tickets?</h2>
          <p class="text-neutral-600 text-[15px]">
            View all tickets, create new ones, or update existing tickets
          </p>

          <RouterLink to="/tickets">
            <button
              className=" flex items-center  px-8 bg-blue-700 mt-6 text-white py-2 rounded-md ml-6 md:mr-0 "
            >
              <ArrowRight class="mr-2 size-4" /> Go to Ticket Management
            </button>
          </RouterLink>
        </div>
      </CardHeader>
    </Card>
  </div>
</template>
