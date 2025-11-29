
import { z } from "zod"
import { j, publicProcedure } from "../jstack"
import { habit } from "../db/schema"
import { eq } from "drizzle-orm"

export const habitRouter = j.router({
  createNew: publicProcedure
            .input(z.object({
                name: z.string().min(1),
                goal: z.string().min(1),
                description: z.string().optional(),
                userId: z.string().min(1),
            }))
            .mutation(async ({ ctx,c, input }) => {
                const { db } = ctx
                const { name, goal, description, userId } = input
                const newHabit = await db.insert(habit).values({
                    name,
                    goal,
                    description,
                    userId,
                }).returning();
                
                return c.superjson(newHabit)
            })

  ,

  myHabits: publicProcedure
    .query(async ({ c,ctx }) => {
      const { db } = ctx

      const [habits] = await db.select().from(habit).where(eq(habit.userId, "Wxk9BvCUI2LJ29BgDDoawezMdwfMrK9P"))

      return c.superjson(habits ?? null)
    }),
})
