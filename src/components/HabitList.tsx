"use client"

import type { Habit } from "@/app/page"
import { HabitCard } from "./HabitCard"

interface HabitListProps {
  habits: Habit[]
  onToggleDay: (habitId: string, date: string) => void
  onDelete: (habitId: string) => void
}

export function HabitList({ habits, onToggleDay, onDelete }: HabitListProps) {
  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onToggleDay={onToggleDay} onDelete={onDelete} />
      ))}
    </div>
  )
}
