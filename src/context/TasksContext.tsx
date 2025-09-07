/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed'

export interface TaskItem {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
}

interface TasksContextValue {
  tasks: TaskItem[]
  addTask: (task: Omit<TaskItem, 'id'>) => void
  updateTask: (id: string, updates: Partial<Omit<TaskItem, 'id'>>) => void
  deleteTask: (id: string) => void
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined)

const STORAGE_KEY = 'kanban_tasks_v1'

const sampleTasks: TaskItem[] = [
  {
    id: crypto.randomUUID(),
    title: 'Set up project',
    description: 'Initialize Vite + Tailwind and base UI',
    status: 'todo',
    priority: 'high',
    tags: ['setup']
  },
  {
    id: crypto.randomUUID(),
    title: 'Create board layout',
    description: 'Design 2x2 grid with vibrant theme',
    status: 'in_progress',
    priority: 'medium',
    tags: ['ui']
  },
  {
    id: crypto.randomUUID(),
    title: 'Write review checklist',
    description: 'Accessibility, responsiveness, consistency',
    status: 'review',
    priority: 'low',
    tags: ['qa']
  },
  {
    id: crypto.randomUUID(),
    title: 'Polish animations',
    description: 'Subtle hover and entrance motion',
    status: 'completed',
    priority: 'low',
    tags: ['polish']
  }
]

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw) as TaskItem[]
    } catch {
      // Intentionally ignore localStorage parsing errors to fall back to defaults
    }
    return sampleTasks
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // Ignore persistence errors (e.g., storage full or disabled)
    }
  }, [tasks])

  const addTask: TasksContextValue['addTask'] = (task) => {
    setTasks((prev) => [{ id: crypto.randomUUID(), ...task }, ...prev])
  }

  const updateTask: TasksContextValue['updateTask'] = (id, updates) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const deleteTask: TasksContextValue['deleteTask'] = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask }),
    [tasks]
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export function useTasks() {
  const ctx = useContext(TasksContext)
  if (!ctx) throw new Error('useTasks must be used within TasksProvider')
  return ctx
}


