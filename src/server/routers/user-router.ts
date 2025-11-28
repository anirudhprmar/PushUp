import { desc } from "drizzle-orm"
import { z } from "zod"
import { j, publicProcedure } from "../jstack"
import { user } from "../db/schema"

export const userRouter = j.router({
  me: publicProcedure
      .input(z.object({
        userId: z.string().optional()
      }))
      .query(async ({ c, ctx }) => {
    const { db } = ctx

    const [recentPost] = await db
      .select()
      .from(user)
      .orderBy(desc(user.createdAt))
      .limit(1) //needs to be corrected 

    return c.superjson(recentPost ?? null)
  }),
})
