import { useMemo, useState } from 'react'
import { useTasks } from '../context/TasksContext'
import type { TaskStatus } from '../context/TasksContext'
import { TaskCard } from './TaskCard'
import { Modal } from './Modal'
import { TaskForm } from './TaskForm'
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'

const statusMeta: Record<TaskStatus, { title: string; color: string; bgColor: string; borderColor: string; icon: string }> = {
  todo: { title: 'To Do', color: 'text-slate-700', bgColor: 'bg-slate-50', borderColor: 'border-slate-200', icon: '📋' },
  in_progress: { title: 'In Progress', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: '⚡' },
  review: { title: 'Review', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: '👀' },
  completed: { title: 'Completed', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200', icon: '✅' },
}

// Empty drop zone component
function EmptyDropZone({ status }: { status: TaskStatus }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `empty-${status}`,
    data: {
      type: 'column',
      status: status,
    },
  })

  return (
    <div 
      ref={setNodeRef}
      className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        isOver 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 bg-white/50'
      }`}
    >
      <div className="text-3xl mb-3 text-gray-400">📋</div>
      <div className="text-sm text-gray-500 font-medium">No tasks yet</div>
      <div className="text-xs text-gray-400 mt-1">
        {isOver ? 'Drop task here' : 'Drag tasks here or create new ones'}
      </div>
    </div>
  )
}

export function Board() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const grouped = useMemo(() => {
    const map: Record<TaskStatus, typeof tasks> = {
      todo: [],
      in_progress: [],
      review: [],
      completed: [],
    }
    for (const t of tasks) map[t.status].push(t)
    return map
  }, [tasks])

  const counts = {
    todo: grouped.todo.length,
    in_progress: grouped.in_progress.length,
    review: grouped.review.length,
    completed: grouped.completed.length,
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-slate-100 px-3 py-1.5 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-slate-500"></span>
              {counts.todo} To Do
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-blue-100 px-3 py-1.5 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              {counts.in_progress} In Progress
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-amber-100 px-3 py-1.5 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              {counts.review} Review
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-green-100 px-3 py-1.5 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              {counts.completed} Done
            </span>
          </div>
          <button
            onClick={() => {
              setEditingId(null)
              setModalOpen(true)
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-lg">+</span>
            <span>Create Task</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 min-h-0">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }: DragStartEvent) => {
          setActiveId(active.id as string)
        }}
        onDragOver={({ active, over }: DragOverEvent) => {
          if (!over) return
          
          const activeId = active.id as string
          const activeTask = tasks.find(t => t.id === activeId)
          if (!activeTask) return
          
          // Handle drops on empty zones
          if (over.id.toString().startsWith('empty-')) {
            const newStatus = over.id.toString().replace('empty-', '') as TaskStatus
            if (activeTask.status !== newStatus) {
              updateTask(activeId, { status: newStatus })
            }
            return
          }
          
          // Handle drops on other tasks or columns
          const overStatus = over.data.current?.sortable?.containerId || over.id
          
          if (activeTask.status !== overStatus) {
            updateTask(activeId, { status: overStatus as TaskStatus })
          }
        }}
        onDragEnd={({ active, over }: DragEndEvent) => {
          setActiveId(null)
          
          if (!over) return
          
          const activeId = active.id as string
          const activeTask = tasks.find(t => t.id === activeId)
          if (!activeTask) return
          
          // Handle drops on empty zones
          if (over.id.toString().startsWith('empty-')) {
            const newStatus = over.id.toString().replace('empty-', '') as TaskStatus
            if (activeTask.status !== newStatus) {
              updateTask(activeId, { status: newStatus })
            }
            return
          }
          
          // Handle drops on other tasks or columns
          const overStatus = over.data.current?.sortable?.containerId || over.id
          
          if (activeTask.status !== overStatus) {
            updateTask(activeId, { status: overStatus as TaskStatus })
          }
        }}
      >
        {(['todo', 'in_progress', 'review', 'completed'] as TaskStatus[]).map((key) => (
          <section
            key={key}
            className={`h-full min-h-0 flex flex-col rounded-lg border-2 ${statusMeta[key].borderColor} ${statusMeta[key].bgColor} shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className={`font-semibold text-lg flex items-center gap-2 ${statusMeta[key].color}`}>
                  <span className="text-xl">{statusMeta[key].icon}</span>
                  {statusMeta[key].title}
                </h2>
                <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-full font-medium text-gray-600">
                  {grouped[key].length}
                </span>
              </header>
              <SortableContext 
                id={key}
                items={grouped[key].map((t) => t.id)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="flex-1 min-h-0 overflow-auto p-4 space-y-3">
                  {grouped[key].map((t) => (
                    <div 
                      key={t.id} 
                      className="relative group"
                      data-status={key}
                    >
                      <TaskCard
                        task={t}
                        onClick={() => {
                          setEditingId(t.id)
                          setModalOpen(true)
                        }}
                        onStatusChange={(taskId, newStatus) => {
                          updateTask(taskId, { status: newStatus })
                        }}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteTask(t.id)
                          }}
                          className="text-xs bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 shadow-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {grouped[key].length === 0 && (
                    <EmptyDropZone status={key} />
                  )}
                </div>
              </SortableContext>
            </div>
          </section>
        ))}
      </DndContext>
      </div>

      {createPortal(
        <DragOverlay>
          {activeId ? (
            <div className="opacity-90 transform rotate-3 scale-105 shadow-2xl">
              {(() => {
                const task = tasks.find(t => t.id === activeId)
                return task ? <TaskCard task={task} /> : null
              })()}
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Task' : 'New Task'}
      >
        <TaskForm
          initial={editingId ? tasks.find((t) => t.id === editingId) ?? undefined : undefined}
          onCancel={() => setModalOpen(false)}
          onSubmit={(data) => {
            if (editingId) {
              updateTask(editingId, data)
            } else {
              addTask({ ...data, tags: [] })
            }
            setModalOpen(false)
          }}
        />
      </Modal>
    </div>
  )
}


