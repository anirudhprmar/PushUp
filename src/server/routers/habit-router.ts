
import { z } from "zod"
import { j, publicProcedure } from "../jstack"
import { habit } from "../db/schema"

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

//   create: publicProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, c, input }) => {
//       const { name } = input
//       const { db } = ctx

//       const post = await db.insert(posts).values({ name })

//       return c.superjson(post)
//     }),
})
