<script setup lang="ts">
import { onMounted } from 'vue'

import { useTicketsStore } from '@/stores/ticket'
import { getUser } from '@/lib/getUsers'
import type { TicketType } from '@/lib/tickets-types'
import DashboardNavbar from '../ui/DashboardNavbar.vue'
import Footer from '../ui/Footer.vue'

const ticketsStore = useTicketsStore()
const user = getUser()

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
  <div class="app-layout">
    <header><DashboardNavbar /></header>

    <RouterView />
    <!-- routes -->

    <Footer />
  </div>
</template>
