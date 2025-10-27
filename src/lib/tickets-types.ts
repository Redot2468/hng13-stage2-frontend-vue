import type { TicketSchemaType } from '../lib/ticket-schema.ts'

export interface TicketType extends TicketSchemaType {
  id: string
  userId?: string
}
