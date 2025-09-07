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
    { value: 'todo', label: 'To Do', color: 'bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-300', dot: 'bg-fuchsia-500' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-amber-100 text-amber-800 ring-amber-300', dot: 'bg-amber-500' },
    { value: 'review', label: 'Review', color: 'bg-sky-100 text-sky-800 ring-sky-300', dot: 'bg-sky-500' },
    { value: 'completed', label: 'Done', color: 'bg-emerald-100 text-emerald-800 ring-emerald-300', dot: 'bg-emerald-500' },
  ]

  const priorityOptions: Array<{ value: 'low' | 'medium' | 'high'; label: string; color: string }>
    = [
      { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-800 ring-emerald-300' },
      { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-800 ring-amber-300' },
      { value: 'high', label: 'High', color: 'bg-rose-100 text-rose-800 ring-rose-300' },
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
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          placeholder="Task title"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          placeholder="Optional details"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Status</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {statusOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`flex items-center gap-2 rounded-full px-3 py-2 ring-1 ${opt.color} ${status === opt.value ? 'ring-2' : 'opacity-90'}`}
              >
                <span className={`h-2 w-2 rounded-full ${opt.dot}`}></span>
                <span className="text-xs font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Priority</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {priorityOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setPriority(opt.value)}
                className={`rounded-full px-3 py-2 ring-1 ${opt.color} ${priority === opt.value ? 'ring-2' : 'opacity-90'} text-xs font-medium`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50">Cancel</button>
        <button type="submit" className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow">Save</button>
      </div>
    </form>
  )
}


