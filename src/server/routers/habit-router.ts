import { user } from './../db/schema';

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

  //only giving one output instead of an array
  myHabits: publicProcedure
      .input(z.object({
        userId:z.string().min(1)
      }))
      .get(async ({ c,ctx,input }) => {
        const { db } = ctx
        const {userId} = input

        const habits = await db
        .select()
        .from(habit)
        .where(eq(habit.userId, userId))

        if(!habits){
          throw new Error("No habits found")
        }

        return c.superjson(habits ?? null)

      }),
})
