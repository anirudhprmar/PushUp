"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export interface Habit {
  id: string
  name: string
  description: string
  createdAt: string
  logs: Record<string, boolean>
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("habits")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [showForm, setShowForm] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true)

  // Save habits to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("habits", JSON.stringify(habits))
    }
  }, [habits, isLoaded])

  const addHabit = (habit: Omit<Habit, "id" | "logs" | "createdAt">) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      logs: {},
    }
    setHabits([...habits, newHabit])
    setShowForm(false)
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id))
  }

  const toggleHabitDay = (habitId: string, date: string) => {
    setHabits(
      habits.map((h) => {
        if (h.id === habitId) {
          return {
            ...h,
            logs: {
              ...h.logs,
              [date]: !h.logs[date],
            },
          }
        }
        return h
      }),
    )
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Habits</h1>
            <p className="text-sm text-muted-foreground mt-1">365 days to become the best version of yourself</p>
          </div>
        </div>

      </div>
    </main>
  )
}
