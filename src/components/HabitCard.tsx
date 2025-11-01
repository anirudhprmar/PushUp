"use client"

import { useState } from "react"
import type { Habit } from "@/app/page"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ChevronDown, ChevronUp } from "lucide-react"

interface HabitCardProps {
  habit: Habit
  onToggleDay: (habitId: string, date: string) => void
  onDelete: (habitId: string) => void
}

export function HabitCard({ habit, onToggleDay, onDelete }: HabitCardProps) {
  const [expanded, setExpanded] = useState(false)
  const today = new Date().toISOString().split("T")[0]
  const completedToday = habit.logs[today]

  const totalDaysCompleted = Object.values(habit.logs).filter(Boolean).length

  const last90Days = getLast90Days()
  const completedInLast90 = last90Days.filter((date) => habit.logs[date]).length
  const completionRateLast90 = Math.round((completedInLast90 / last90Days.length) * 100)

  const yearDays = getLast365Days()
  let currentStreak = 0
  for (let i = 0; i < yearDays.length; i++) {
    if (habit.logs[yearDays[i]]) {
      currentStreak++
    } else {
      break
    }
  }

  return (
    <Card className="p-4 bg-card border-border mb-3">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground">{habit.name}</h3>
          {habit.description && <p className="text-xs text-muted-foreground mt-1">{habit.description}</p>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(habit.id)}
          className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
        <div>
          <p className="text-xs text-muted-foreground">Total Days</p>
          <p className="text-lg font-bold text-foreground">{totalDaysCompleted}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Last 90</p>
          <p className="text-lg font-bold text-foreground">{completionRateLast90}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Current</p>
          <p className="text-lg font-bold text-foreground">{currentStreak}</p>
        </div>
        <Button
          onClick={() => onToggleDay(habit.id, today)}
          variant={completedToday ? "default" : "outline"}
          size="sm"
          className={completedToday ? "bg-white text-black hover:bg-gray-100" : ""}
        >
          {completedToday ? "✓" : "+"}
        </Button>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
      >
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        <span>{expanded ? "Hide" : "Show"} calendar</span>
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="grid grid-cols-7 gap-1">
            {last90Days.map((date) => {
              const isCompleted = habit.logs[date]
              return (
                <button
                  key={date}
                  onClick={() => onToggleDay(habit.id, date)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    isCompleted ? "bg-white" : "bg-muted hover:bg-border"
                  }`}
                  title={new Date(date).toLocaleDateString()}
                />
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}

function getLast90Days(): string[] {
  const days: string[] = []
  const today = new Date()

  for (let i = 89; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    days.push(date.toISOString().split("T")[0])
  }

  return days
}

function getLast365Days(): string[] {
  const days: string[] = []
  const today = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    days.push(date.toISOString().split("T")[0])
  }

  return days
}
