"use client"

import type { Habit } from "@/app/dashboard/page"
import { Card } from "@/components/ui/card"
import { GrowthChart } from "./GrowthChart"

interface DashboardProps {
  habits: Habit[]
}

export function Dashboard({ habits }: DashboardProps) {
  const today = new Date().toISOString().split("T")[0]

  const completedToday = habits.filter((h) => h.logs[today!]).length
  const totalHabits = habits.length

  const habitAnalytics = habits.map((habit) => {
    const totalDaysCompleted = Object.values(habit.logs).filter(Boolean).length
    const last90Days = getLast90Days()
    const completedInLast90 = last90Days.filter((date) => habit.logs[date]).length
    return { habitId: habit.id, totalDaysCompleted, completedInLast90 }
  })

  const yearDays = getLast365Days()
  const allHabitsCompletedDays = new Set<string>()

  if (totalHabits > 0) {
    yearDays.forEach((date) => {
      const allCompleted = habits.every((habit) => habit.logs[date])
      if (allCompleted) {
        allHabitsCompletedDays.add(date)
      }
    })
  }

  const totalDaysAllCompleted = allHabitsCompletedDays.size

  return (
    <div className="space-y-4 mb-8">
      <GrowthChart habits={habits} />

      <Card className="p-4 bg-card border-border">
        <p className="text-xs text-muted-foreground mb-2">Today</p>
        <p className="text-2xl font-bold text-foreground">
          {completedToday}/{totalHabits}
        </p>
      </Card>

      {totalHabits > 0 && (
        <Card className="p-4 bg-card border-border">
          <p className="text-xs text-muted-foreground mb-3">Path to 365 Days</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-foreground">{totalDaysAllCompleted} days completed</p>
                <p className="text-sm text-muted-foreground">365 days</p>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((totalDaysAllCompleted / 365) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="grid grid-cols-13 gap-1">
                {yearDays.map((date) => (
                  <div
                    key={date}
                    className={`w-2 h-2 rounded-sm transition-colors ${
                      allHabitsCompletedDays.has(date) ? "bg-white" : "bg-muted"
                    }`}
                    title={date}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              All habits completed every day. Each day you become the person you want to be
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}

function getLast90Days(): string[] {
  const days: string[] = []
  const today = new Date()

  for (let i = 89; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    days.push(date.toISOString().split("T")[0]!)
  }

  return days
}

function getLast365Days(): string[] {
  const days: string[] = []
  const today = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    days.push(date.toISOString().split("T")[0]!)
  }

  return days
}
