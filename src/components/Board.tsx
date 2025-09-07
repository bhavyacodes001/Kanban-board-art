import { useMemo, useState } from 'react'
import { useTasks } from '../context/TasksContext'
import type { TaskStatus } from '../context/TasksContext'
import { TaskCard } from './TaskCard'
import { Modal } from './Modal'
import { TaskForm } from './TaskForm'
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'

const statusMeta: Record<TaskStatus, { title: string; gradient: string; icon: string }> = {
  todo: { title: 'To Do', gradient: 'from-fuchsia-400 to-violet-500', icon: '📝' },
  in_progress: { title: 'In Progress', gradient: 'from-amber-400 to-orange-500', icon: '⚙️' },
  review: { title: 'Review', gradient: 'from-sky-400 to-cyan-500', icon: '🔎' },
  completed: { title: 'Completed', gradient: 'from-emerald-400 to-teal-500', icon: '✅' },
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
    <div className="space-y-6 lg:space-y-8">
      <div className="-mt-2 flex flex-wrap items-center gap-2 md:gap-3 justify-center">
        <span className="inline-flex items-center gap-2 text-xs rounded-full bg-pink-100 text-pink-800 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-pink-500"></span>
          {counts.todo} To Do
        </span>
        <span className="inline-flex items-center gap-2 text-xs rounded-full bg-amber-100 text-amber-800 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          {counts.in_progress} In Progress
        </span>
        <span className="inline-flex items-center gap-2 text-xs rounded-full bg-sky-100 text-sky-800 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-sky-500"></span>
          {counts.review} Review
        </span>
        <span className="inline-flex items-center gap-2 text-xs rounded-full bg-emerald-100 text-emerald-800 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          {counts.completed} Done
        </span>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setEditingId(null)
            setModalOpen(true)
          }}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 px-4 py-2 shadow hover:shadow-md ring-1 ring-black/5 hover:-translate-y-0.5 transition-all"
        >
          <span className="text-lg">＋</span>
          <span className="font-medium">Create Task</span>
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }: DragStartEvent) => {
          setActiveId(active.id as string)
        }}
        onDragOver={({ active, over }: DragOverEvent) => {
          if (!over) return
          
          const activeId = active.id as string
          const overId = over.id as string
          
          const [activeStatus] = activeId.split(':') as [TaskStatus]
          const [overStatus] = overId.split(':') as [TaskStatus]
          
          if (activeStatus !== overStatus) {
            const taskId = activeId.split(':')[1]
            if (taskId) {
              updateTask(taskId, { status: overStatus })
            }
          }
        }}
        onDragEnd={({ active, over }: DragEndEvent) => {
          setActiveId(null)
          
          if (!over) return
          
          const activeId = active.id as string
          const overId = over.id as string
          
          const [activeStatus] = activeId.split(':') as [TaskStatus]
          const [overStatus] = overId.split(':') as [TaskStatus]
          
          if (activeStatus === overStatus) {
            // Reorder within same column
            const taskId = activeId.split(':')[1]
            const overTaskId = overId.split(':')[1]
            
            if (taskId && overTaskId) {
              const columnTasks = grouped[activeStatus]
              const oldIndex = columnTasks.findIndex(t => t.id === taskId)
              const newIndex = columnTasks.findIndex(t => t.id === overTaskId)
              
              if (oldIndex !== newIndex) {
                // For now, we'll just log the reorder
                // In a full implementation, you'd update the context to handle reordering
                console.log(`Reordering task ${taskId} from position ${oldIndex} to ${newIndex}`)
              }
            }
          }
        }}
      >
        {(['todo', 'in_progress', 'review', 'completed'] as TaskStatus[]).map((key) => (
          <section
            key={key}
            className="flex flex-col rounded-2xl p-4 md:p-5 bg-gradient-to-br text-white shadow-lg relative overflow-hidden ring-1 ring-black/5"
          >
            <div className={`absolute inset-0 opacity-90 bg-gradient-to-br ${statusMeta[key].gradient}`}></div>
            <div className="relative flex flex-col">
              <header className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-lg flex items-center gap-2 drop-shadow-sm">
                  <span>{statusMeta[key].icon}</span>
                  {statusMeta[key].title}
                </h2>
                <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{grouped[key].length}</span>
              </header>
              <SortableContext 
                id={key}
                items={grouped[key].map((t) => `${key}:${t.id}`)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {grouped[key].map((t) => (
                    <div 
                      key={t.id} 
                      id={`${key}:${t.id}`} 
                      className="relative group"
                      data-status={key}
                    >
                      <TaskCard
                        task={t}
                        onClick={() => {
                          setEditingId(t.id)
                          setModalOpen(true)
                        }}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => deleteTask(t.id)}
                          className="text-xs bg-black/30 hover:bg-black/40 text-white rounded px-2 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {grouped[key].length === 0 && (
                    <div 
                      id={`${key}:empty`}
                      className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white/80"
                    >
                      No tasks
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          </section>
        ))}
      </DndContext>

      {createPortal(
        <DragOverlay>
          {activeId ? (
            <div className="opacity-50">
              {(() => {
                const [, taskId] = activeId.split(':')
                const task = tasks.find(t => t.id === taskId)
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


