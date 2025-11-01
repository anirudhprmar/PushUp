"use client"

import type { Habit } from "@/app/page"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

interface GrowthChartProps {
  habits: Habit[]
}

export function GrowthChart({ habits }: GrowthChartProps) {
  const getLast90Days = () => {
    const days: string[] = []
    const today = new Date()

    for (let i = 89; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split("T")[0])
    }

    return days
  }

  const chartData = getLast90Days().map((date, index) => {
    const completedHabits = habits.filter((h) => h.logs[date]).length
    const completionRate = habits.length > 0 ? (completedHabits / habits.length) * 100 : 0
    const allCompleted = habits.length > 0 && habits.every((h) => h.logs[date])

    return {
      day: index + 1,
      completion: Math.round(completionRate),
      allCompleted: allCompleted ? 100 : 0,
      date: date,
    }
  })

  // Calculate cumulative growth (upward spiral effect)
  let cumulativeGrowth = 0
  const growthData = chartData.map((item) => {
    if (item.allCompleted === 100) {
      cumulativeGrowth += 1.5
    } else {
      cumulativeGrowth = Math.max(0, cumulativeGrowth - 0.5)
    }
    return {
      ...item,
      growth: Math.round(cumulativeGrowth * 10) / 10,
    }
  })

  if (habits.length === 0) {
    return null
  }

  return (
    <Card className="p-4 bg-card border-border mb-4">
      <p className="text-xs text-muted-foreground mb-4">Your Growth Journey</p>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" stroke="#666" style={{ fontSize: "12px" }} />
            <YAxis stroke="#666" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value) => [value.toFixed(1), "Growth"]}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Line
              type="monotone"
              dataKey="growth"
              stroke="#ffffff"
              dot={false}
              strokeWidth={2}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Your upward spiral: each day all habits are completed, you grow stronger
      </p>
    </Card>
  )
}
