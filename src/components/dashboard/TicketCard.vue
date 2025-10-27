<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Pencil, Trash } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { useTicketsStore } from '@/stores/ticket'
import type { TicketType } from '@/lib/tickets-types'
import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const props = defineProps<{
  ticket: TicketType
}>()

const router = useRouter()
const ticketsStore = useTicketsStore()

const statusColor = computed(() => {
  switch (props.ticket?.status) {
    case 'open':
      return 'bg-green-100 text-green-800 border border-green-300' //
    case 'in_progress':
      return 'bg-amber-100 text-amber-800 border border-amber-300' //
    case 'closed':
      return 'bg-gray-100 text-gray-800 border border-gray-300'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-300'
  }
})

const priorityColor = computed(() => {
  switch (props.ticket?.priority) {
    case 'low':
      return 'border border-blue-300 text-blue-800 bg-blue-50'
    case 'medium':
      return 'border border-yellow-300 text-yellow-800 bg-yellow-50'
    case 'high':
      return 'border border-red-300 text-red-800 bg-red-50'
    default:
      return 'border border-gray-300 text-gray-800 bg-gray-50'
  }
})

function handleEdit() {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      id: props.ticket?.id,
    },
  })

  ticketsStore.toggleTicketModal(true)
}

function handleDelete() {
  try {
    const ticketsFromDb: TicketType[] = JSON.parse(localStorage.getItem('tickets') ?? '[]')

    const ticketsAfterDeletion = ticketsFromDb?.filter(
      (dbTicket) => dbTicket?.id !== props.ticket.id,
    )

    localStorage.setItem('tickets', JSON.stringify(ticketsAfterDeletion))

    ticketsStore.deleteTicket(props.ticket?.id)

    toast({
      title: 'Success',
      description: 'Ticket deleted successfully',
    })
  } catch (error) {
    console.error('Failed to delete ticket:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete ticket.',
      variant: 'destructive',
    })
  }
}
</script>

<template>
  <Card>
    <div class="flex items-center justify-between px-6 pt-4">
      <p :class="[statusColor, 'font-medium text-xs rounded-full capitalize px-3 w-fit py-0.5']">
        {{ ticket?.status.replace('_', ' ') }}
      </p>

      <p :class="[priorityColor, 'font-medium text-xs rounded-full capitalize px-3 w-fit py-0.5']">
        {{ ticket?.priority }}
      </p>
    </div>

    <div class="sm:flex sm:items-center sm:justify-between pb-4">
      <CardHeader class="w-full sm:w-[80%] pt-2 sm:pt-4">
        <CardTitle class="text-lg font-semibold">
          {{ ticket?.title }}
        </CardTitle>
        <CardDescription class="pt-1"> {{ ticket?.description }} </CardDescription>
      </CardHeader>

      <div class="px-6 mt-0 sm:mt-4 flex items-center justify-end sm:justify-start">
        <Button variant="secondary" size="icon" @click="handleEdit">
          <Pencil class="size-4" /> <span class="sr-only">Edit Ticket</span>
        </Button>
        <Button variant="destructive" size="icon" class="ml-2" @click="handleDelete">
          <Trash class="size-4 text-white" /> <span class="sr-only">Delete Ticket</span>
        </Button>
      </div>
    </div>
  </Card>
</template>
