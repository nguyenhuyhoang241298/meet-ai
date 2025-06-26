import { z } from 'zod'

export const agentInsertSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  instructions: z.string().min(1, 'Instructions is required'),
})

export const agentUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  instructions: z.string().min(1, 'Instructions is required'),
  id: z.string().min(1, 'ID is required'),
})
