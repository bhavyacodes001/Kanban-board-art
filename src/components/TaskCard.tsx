import type { TaskItem, TaskStatus } from '../context/TasksContext'
import { useMemo, useState, useEffect, useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function TaskCard({ task, onClick, onStatusChange }: { 
  task: TaskItem; 
  onClick?: () => void;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const priorityColor = useMemo(() => {
    switch (task.priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      default:
        return 'bg-green-500'
    }
  }, [task.priority])

  const priorityLabel = useMemo(() => {
    switch (task.priority) {
      case 'high':
        return 'High'
      case 'medium':
        return 'Medium'
      default:
        return 'Low'
    }
  }, [task.priority])

  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const statusMenuRef = useRef<HTMLDivElement>(null)

  const statusOptions: Array<{ value: TaskStatus; label: string; color: string; icon: string }> = [
    { value: 'todo', label: 'To Do', color: 'text-slate-600', icon: '📋' },
    { value: 'in_progress', label: 'In Progress', color: 'text-blue-600', icon: '⚡' },
    { value: 'review', label: 'Review', color: 'text-amber-600', icon: '👀' },
    { value: 'completed', label: 'Completed', color: 'text-green-600', icon: '✅' },
  ]

  const currentStatus = statusOptions.find(opt => opt.value === task.status)

  // Close status menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusMenuRef.current && !statusMenuRef.current.contains(event.target as Node)) {
        setShowStatusMenu(false)
      }
    }

    if (showStatusMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showStatusMenu])

  // Debug logging
  useEffect(() => {
    if (showStatusMenu) {
      console.log('Status menu opened, options:', statusOptions)
    }
  }, [showStatusMenu, statusOptions])

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`group w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-2 w-2 rounded-full ${priorityColor}`}></div>
        <div className="flex-1 min-w-0">
          <button
            onClick={onClick}
            className="w-full text-left"
            {...listeners}
          >
            <div className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{task.title}</div>
            {task.description && (
              <div className="text-xs text-gray-600 line-clamp-2 mb-2">{task.description}</div>
            )}
          </button>
          
          <div className="flex items-center justify-between">
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-600 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {task.tags.length > 2 && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-600 font-medium">
                    +{task.tags.length - 2}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {priorityLabel}
              </span>
            </div>
          </div>
          
          {/* Status Change Dropdown */}
          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Status:</span>
              <div className="relative" ref={statusMenuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Status button clicked, current state:', showStatusMenu)
                    setShowStatusMenu(!showStatusMenu)
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                    currentStatus?.color || 'text-gray-600'
                  } bg-gray-50 hover:bg-gray-100`}
                >
                  <span>{currentStatus?.icon}</span>
                  <span>{currentStatus?.label}</span>
                  <span className="text-xs">▼</span>
                </button>
                
                {showStatusMenu && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (option.value !== task.status) {
                            onStatusChange?.(task.id, option.value)
                          }
                          setShowStatusMenu(false)
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 flex items-center gap-2 ${
                          option.value === task.status ? 'bg-blue-50 text-blue-700' : option.color
                        }`}
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


