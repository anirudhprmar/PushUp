// db/index.ts (for better auth)
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// This is just for Better Auth config - it will get the DATABASE_URL from process.env
export function getDb(databaseUrl: string) {
  const sql = neon(databaseUrl)
  return drizzle(sql, { schema })
}

export const db = getDb(process.env.DATABASE_URL!)
