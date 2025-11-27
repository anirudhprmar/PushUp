import { j } from "./jstack"
import { habitRouter } from "./routers/habit-router"
import { userRouter } from "./routers/user-router"

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler)

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(api, {
  user: userRouter,
  habit:habitRouter
})

export type AppRouter = typeof appRouter

export default appRouter
