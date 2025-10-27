<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/ticket'
import { Button } from '../../components/ui/button'

const ticketsStore = useTicketsStore()

const onCreateTicket = () => {
  ticketsStore.toggleTicketModal(true)
}
</script>

<template>
  <div class="flex items-center flex-col justify-center gap-3">
    <p class="bg-gray-100 size-[80px] rounded-full flex items-center justify-center">
      <Plus class="text-neutral-400 size-12" />
    </p>

    <p class="text-neutral-800 text-lg font-medium">No tickets yet</p>
    <p class="text-neutral-700 text-[15px]">Get started by creating your first ticket.</p>

    <button
      className=" flex items-center  px-8 bg-blue-700 mt-6 text-white py-2 rounded-md "
      @click="onCreateTicket"
    >
      <Plus class="mr-2 size-4" /> Create Your First Ticket
    </button>
  </div>
</template>
