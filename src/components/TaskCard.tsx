import type { TaskItem } from '../context/TasksContext'
import { useMemo } from 'react'

export function TaskCard({ task, onClick }: { task: TaskItem; onClick?: () => void }) {
  const priorityColor = useMemo(() => {
    switch (task.priority) {
      case 'high':
        return 'bg-rose-500'
      case 'medium':
        return 'bg-amber-500'
      default:
        return 'bg-emerald-500'
    }
  }, [task.priority])

  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-xl border border-white/20 bg-white/90 backdrop-blur p-3 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 min-h-[72px] tilt-3d"
    >
      <div className="flex items-start gap-2">
        <div className={`mt-1 h-2 w-2 rounded-full ${priorityColor} animate-pulse`}></div>
        <div className="flex-1">
          <div className="font-medium text-gray-900 line-clamp-1">{task.title}</div>
          {task.description && (
            <div className="mt-1 text-sm text-gray-600 line-clamp-2">{task.description}</div>
          )}
          {task.tags && task.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-indigo-100 text-indigo-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}


