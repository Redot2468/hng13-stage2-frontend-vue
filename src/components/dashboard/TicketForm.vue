<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import { useTicketsStore } from '@/stores/ticket'
import { getUser } from '@/lib/getUsers'
import { TicketSchema, type TicketSchemaType } from '@/lib/ticket-schema'
import type { TicketType } from '@/lib/tickets-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

const ticketsStore = useTicketsStore()
const router = useRouter()
const user = getUser()
const isEditMode = ref(false)
const ticketToEditId = ref<string | null>(null)

const { handleSubmit, resetForm, setValues } = useForm<TicketSchemaType>({
  validationSchema: toTypedSchema(TicketSchema),
  initialValues: {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
  },
})

watch(
  () => router.currentRoute.value.query.id,
  (newId) => {
    const id = Array.isArray(newId) ? newId[0] : newId

    if (id && typeof id === 'string') {
      isEditMode.value = true
      ticketToEditId.value = id

      try {
        const ticketData: TicketType[] = JSON.parse(localStorage.getItem('tickets') ?? '[]')
        const ticketToEdit = ticketData.find((ticket) => ticket.id === id)
        if (ticketToEdit) {
          setValues({
            title: ticketToEdit.title,
            description: ticketToEdit.description || '',
            status: ticketToEdit.status,
            priority: ticketToEdit.priority || 'medium',
          })
        } else {
          console.warn(`Ticket with ID ${id} not found in localStorage.`)
          closeAndReset()
        }
      } catch (error) {
        console.error('Error reading tickets from localStorage:', error)
        closeAndReset()
      }
    } else {
      if (ticketsStore.isTicketModalOpen) {
        isEditMode.value = false
        ticketToEditId.value = null
        resetForm()
      }
    }
  },
  { immediate: true },
)

const onSubmit = handleSubmit((formData) => {
  try {
    const tickets: TicketType[] = JSON.parse(localStorage.getItem('tickets') ?? '[]')

    if (isEditMode.value && ticketToEditId.value) {
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === ticketToEditId.value ? { ...ticket, ...formData, userId: user?.id } : ticket,
      )
      localStorage.setItem('tickets', JSON.stringify(updatedTickets))

      ticketsStore.updateTicket({
        ticketToEditId: ticketToEditId.value,
        formData: { ...formData, userId: user?.id },
      })

      toast.success('Ticket updated successfully.')
      closeAndReset()
    } else {
      // --- CREATE ---
      const newTicket: TicketType = {
        id: crypto.randomUUID(),
        userId: user?.id,
        ...formData,
      }
      localStorage.setItem('tickets', JSON.stringify([newTicket, ...tickets]))
      ticketsStore.addTicket(newTicket)
      toast.success('Ticket created successfully.')
      closeAndReset()
    }
  } catch (error) {
    console.error('Failed to save ticket:', error)
    toast({ title: 'Error', description: 'Failed to save ticket.', variant: 'destructive' })
  }
})

function onCloseModal(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    closeAndReset()
  }
}

function closeAndReset() {
  ticketsStore.toggleTicketModal(false)
  resetForm()
  isEditMode.value = false
  ticketToEditId.value = null
  if (router.currentRoute.value.query.id) {
    router.push({ query: {} })
  }
}
</script>

<template>
  <div
    v-if="ticketsStore.isTicketModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    @click="onCloseModal"
    aria-modal="true"
    role="dialog"
  >
    <Card
      class="max-w-[500px] w-full bg-white scale-100 transition-transform duration-300"
      @click.stop
    >
      <CardHeader class="text-center">
        <CardTitle class="capitalize text-lg">
          {{ isEditMode ? 'Edit Ticket' : 'Create New Ticket' }}
        </CardTitle>
        <CardDescription>
          {{
            isEditMode
              ? 'Update the ticket details below'
              : 'Fill in the details for your new ticket'
          }}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>Title <span class="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="text" placeholder="Title of the ticket" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Details about the ticket..."
                  class="h-[100px]"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription>Max 500 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex items-start gap-4">
            <FormField v-slot="{ componentField }" name="status">
              <FormItem class="flex-1">
                <FormLabel>Status <span class="text-red-500">*</span></FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="priority">
              <FormItem class="flex-1">
                <FormLabel>Priority</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" @click="closeAndReset"> Cancel </Button>
            <Button class="bg-blue-700 hover:bg-blue-800" type="submit">
              {{ isEditMode ? 'Update Ticket' : 'Create Ticket' }}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .card,
.fade-leave-active .card {
  transition: transform 0.3s ease-in-out;
}
.fade-enter-from .card,
.fade-leave-to .card {
  transform: scale(0.95);
}
.fade-enter-to .card,
.fade-leave-from .card {
  transform: scale(1);
}
</style>
