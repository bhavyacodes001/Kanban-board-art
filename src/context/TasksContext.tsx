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

const STORAGE_KEY = 'kanban_tasks_v2'

const sampleTasks: TaskItem[] = [
  {
    id: crypto.randomUUID(),
    title: 'Complete React Assignment',
    description: 'Build a todo app with hooks and state management - Due Friday',
    status: 'todo',
    priority: 'high',
    tags: ['university', 'react']
  },
  {
    id: crypto.randomUUID(),
    title: 'Study for Data Structures Exam',
    description: 'Review binary trees, graphs, and sorting algorithms',
    status: 'in_progress',
    priority: 'high',
    tags: ['study', 'exam']
  },
  {
    id: crypto.randomUUID(),
    title: 'Grocery Shopping',
    description: 'Buy ingredients for meal prep this weekend',
    status: 'todo',
    priority: 'medium',
    tags: ['personal', 'shopping']
  },
  {
    id: crypto.randomUUID(),
    title: 'Review Group Project Code',
    description: 'Check team members\' contributions and provide feedback',
    status: 'review',
    priority: 'medium',
    tags: ['teamwork', 'code-review']
  },
  {
    id: crypto.randomUUID(),
    title: 'Update Resume',
    description: 'Add new projects and skills for internship applications',
    status: 'completed',
    priority: 'low',
    tags: ['career', 'resume']
  },
  {
    id: crypto.randomUUID(),
    title: 'Plan Weekend Trip',
    description: 'Research places to visit and book accommodation',
    status: 'todo',
    priority: 'low',
    tags: ['travel', 'planning']
  },
  {
    id: crypto.randomUUID(),
    title: 'Practice LeetCode Problems',
    description: 'Solve 3 medium difficulty problems for interview prep',
    status: 'in_progress',
    priority: 'medium',
    tags: ['coding', 'interview']
  },
  {
    id: crypto.randomUUID(),
    title: 'Call Family',
    description: 'Weekly catch-up call with parents and siblings',
    status: 'completed',
    priority: 'low',
    tags: ['family', 'personal']
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


