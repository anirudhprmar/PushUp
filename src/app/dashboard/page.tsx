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
      </div>
    </main>
  )
}
