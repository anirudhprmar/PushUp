"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { Habit } from "@/app/dashboard/page"

interface HabitFormProps {
  onSubmit: (habit: Omit<Habit, "id" | "logs" | "createdAt">) => void
  onCancel: () => void
}

export function HabitForm({ onSubmit, onCancel }: HabitFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit({
        name: name.trim(),
        description: description.trim(),
      })
      setName("")
      setDescription("")
    }
  }

  return (
    <Card className="p-4 mb-8 bg-card border-border">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Habit Name</label>
          <Input
            type="text"
            placeholder="e.g., Meditation, Exercise"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-muted border-border text-foreground text-sm"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Description</label>
          <Input
            type="text"
            placeholder="Why is this important?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-muted border-border text-foreground text-sm"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1 bg-white text-black hover:bg-gray-100">
            Create
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
