import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import env from './env'

export default defineConfig({
  out: './drizzle',
  schema: ['./db/schema.ts', './db/auth-schema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
