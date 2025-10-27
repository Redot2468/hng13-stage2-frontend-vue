<script setup lang="ts">
import { onMounted } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/ticket'
import { getUser } from '@/lib/getUsers'
import type { TicketType } from '@/lib/tickets-types'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import NoTickets from './NoTickets.vue'
import TicketCard from './TicketCard.vue'
import TicketForm from './TicketForm.vue'

const ticketsStore = useTicketsStore()
const user = getUser()
const onCreateTicket = () => {
  console.log('create ticket clicked')
  ticketsStore.toggleTicketModal(true)
}

onMounted(() => {
  try {
    const ticketData: TicketType[] = JSON.parse(localStorage.getItem('tickets') ?? '[]')

    const userTicketData = ticketData?.filter((ticket) => ticket?.userId === user?.id)

    console.log(userTicketData)

    if (userTicketData) {
      ticketsStore.setTickets(userTicketData)
    } else {
      ticketsStore.setTickets([])
    }
  } catch (error) {
    console.error('Failed to load tickets from localStorage:', error)
    ticketsStore.setTickets([])
  }
})
</script>

<template>
  <div class="py-2 pb-12">
    <Card class="border-0 shadow-none">
      <div class="flex flex-col sm:flex-row sm:pr-6 items-start sm:items-center justify-between">
        <CardHeader class="w-full sm:w-auto flex-grow">
          <CardTitle class="text-[28px] font-bold"> Ticket Management </CardTitle>
          <CardDescription class="text-lg">
            Create, view, edit and manage your tickets
          </CardDescription>
        </CardHeader>

        <button
          className=" flex items-center  px-8 bg-blue-700 mt-6 text-white py-2 rounded-md ml-6 md:mr-0 "
          @click="onCreateTicket"
        >
          <Plus class="mr-2 size-4" /> Create Your First Ticket
        </button>
      </div>

      <CardContent class="pt-8">
        <div
          v-if="ticketsStore.tickets?.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <TicketCard v-for="ticket in ticketsStore.tickets" :key="ticket.id" :ticket="ticket" />
        </div>
        <NoTickets v-else />
      </CardContent>
    </Card>

    <TicketForm />
  </div>
</template>
