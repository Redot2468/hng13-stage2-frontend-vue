// src/store/tickets.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TicketType } from '../lib/tickets-types.ts'

interface UpdateTicketPayload {
  ticketToEditId: string
  formData: Omit<TicketType, 'id'>
}

function saveTicketsToLocalStorage(tickets: TicketType[]) {
  try {
    localStorage.setItem('tickets', JSON.stringify(tickets))
  } catch (error) {
    console.error('Failed to save tickets to localStorage:', error)
  }
}

export const useTicketsStore = defineStore('tickets', () => {
  const isTicketModalOpen = ref(false)
  const tickets = ref<TicketType[]>([])

  const openTickets = computed(() => tickets.value.filter((t) => t.status === 'open'))

  function deleteTicket(ticketId: string) {
    tickets.value = tickets.value.filter((ticket) => ticket.id !== ticketId)
    saveTicketsToLocalStorage(tickets.value)
  }

  function updateTicket(payload: UpdateTicketPayload) {
    tickets.value = tickets.value.map((ticket) =>
      ticket.id === payload.ticketToEditId ? { ...ticket, ...payload.formData } : ticket,
    )
    saveTicketsToLocalStorage(tickets.value)
  }

  function setTickets(initialTickets: TicketType[]) {
    tickets.value = initialTickets
  }

  function addTicket(newTicket: TicketType) {
    tickets.value.unshift(newTicket)
    saveTicketsToLocalStorage(tickets.value)
  }

  function toggleTicketModal(isOpen?: boolean) {
    if (isOpen === undefined) {
      isTicketModalOpen.value = !isTicketModalOpen.value
    } else {
      isTicketModalOpen.value = isOpen
    }
  }

  return {
    isTicketModalOpen,
    tickets,
    openTickets,
    deleteTicket,
    updateTicket,
    setTickets,
    addTicket,
    toggleTicketModal,
  }
})
