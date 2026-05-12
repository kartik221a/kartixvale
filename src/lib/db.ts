import { createClient, type Client } from '@libsql/client'

const globalForDb = globalThis as unknown as {
  tursoClient: Client | undefined
}

function createTursoClient(): Client {
  return createClient({
    url: process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || '',
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
}

export const turso = globalForDb.tursoClient ?? createTursoClient()

if (process.env.NODE_ENV !== 'production') globalForDb.tursoClient = turso

// Helper to generate IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
