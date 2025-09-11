import { useEffect, useState } from 'react'
import type { TaskItem, TaskStatus } from '../context/TasksContext'

export function TaskForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<TaskItem>
  onSubmit: (data: { title: string; description?: string; status: TaskStatus; priority?: 'low' | 'medium' | 'high' }) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [status, setStatus] = useState<TaskStatus>((initial?.status as TaskStatus) ?? 'todo')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initial?.priority ?? 'medium')

  useEffect(() => {
    setTitle(initial?.title ?? '')
    setDescription(initial?.description ?? '')
    setStatus((initial?.status as TaskStatus) ?? 'todo')
    setPriority(initial?.priority ?? 'medium')
  }, [initial])

  const statusOptions: Array<{ value: TaskStatus; label: string; color: string; dot: string }> = [
    { value: 'todo', label: 'To Do', color: 'bg-slate-100 text-slate-700 border-slate-300', dot: 'bg-slate-500' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-700 border-blue-300', dot: 'bg-blue-500' },
    { value: 'review', label: 'Review', color: 'bg-amber-100 text-amber-700 border-amber-300', dot: 'bg-amber-500' },
    { value: 'completed', label: 'Done', color: 'bg-green-100 text-green-700 border-green-300', dot: 'bg-green-500' },
  ]

  const priorityOptions: Array<{ value: 'low' | 'medium' | 'high'; label: string; color: string }>
    = [
      { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
      { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
    ]

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!title.trim()) return
        onSubmit({ title: title.trim(), description: description.trim() || undefined, status, priority })
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter task title"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="Enter task description (optional)"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="grid grid-cols-2 gap-2">
            {statusOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 border text-sm font-medium transition-colors ${
                  status === opt.value 
                    ? `${opt.color} border-current` 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${opt.dot}`}></span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <div className="grid grid-cols-3 gap-2">
            {priorityOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setPriority(opt.value)}
                className={`rounded-lg px-3 py-2 border text-sm font-medium transition-colors ${
                  priority === opt.value 
                    ? `${opt.color} border-current` 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <button 
          type="button" 
          onClick={onCancel} 
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors shadow-sm"
        >
          Save Task
        </button>
      </div>
    </form>
  )
}


