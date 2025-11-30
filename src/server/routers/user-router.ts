import { desc, eq } from "drizzle-orm"
import { z } from "zod"
import { j, publicProcedure } from "../jstack"
import { user } from "../db/schema"

export const userRouter = j.router({
  me: publicProcedure
      .input(z.object({
        userId: z.string().min(1)
      }))
      .get(async ({ c,ctx,input }) => {

        const {db} = ctx
        const [userInfo] = await db
          .select()
          .from(user)
          .where(eq(user.id, input.userId))

        if(!userInfo){
          throw new Error("User not found")
        }

        return c.superjson(userInfo)
  }),
})
