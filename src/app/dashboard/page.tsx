"use client"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"
import { PlusIcon } from "lucide-react"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { HabitForm } from "@/components/HabitForm";



export default function Home() {
 
  const [createHabit, setCreateHabit] = useState(false);
 const { data, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const res = await client.user.me.$get({userId:""})
      return await res.json()
    },
  })
  const { data:userHabits, isLoading:loadingUserHabits } = useQuery({
    queryKey: ["get-user-habits"],
    queryFn: async () => {
      const res = await client.habit.myHabits.$get()
      return await res.json()
    },
  })
 
  if (isLoading) return <p>Loading...</p>

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hello, {data?.name}</h1>
          </div>
          <div>
            <Button variant={"default"} onClick={()=>setCreateHabit(!createHabit)} className="mt-4 flex items-center gap-2">
              <span><PlusIcon/></span>Create New Habit
            </Button>
          </div>
        </div>
        {createHabit && <HabitForm/>}
        {loadingUserHabits ? <p>Loading habits...</p> : (
          <div className="space-y-4">
            {userHabits && [userHabits].length > 0 ? (
              [userHabits].map((habit: any) => (
                <div key={habit.id} className="p-4 border border-border rounded-lg">
                  <h2 className="text-xl font-semibold text-foreground">{habit.name}</h2>
                  <p className="text-sm text-muted-foreground">{habit.description}</p>
                  <p className="text-sm text-foreground mt-2">Goal: {habit.goal}</p>
                </div>
              ))
            ) : (
              <p>No habits found. Start by creating a new habit!</p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
