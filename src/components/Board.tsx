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
    <div className="h-full flex flex-col">
      <div className="mb-4 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm rounded-full bg-pink-500/20 text-pink-200 px-4 py-2 ring-1 ring-pink-500/30 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse"></span>
            {counts.todo} To Do
          </span>
          <span className="inline-flex items-center gap-2 text-sm rounded-full bg-amber-500/20 text-amber-200 px-4 py-2 ring-1 ring-amber-500/30 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            {counts.in_progress} In Progress
          </span>
          <span className="inline-flex items-center gap-2 text-sm rounded-full bg-sky-500/20 text-sky-200 px-4 py-2 ring-1 ring-sky-500/30 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
            {counts.review} Review
          </span>
          <span className="inline-flex items-center gap-2 text-sm rounded-full bg-emerald-500/20 text-emerald-200 px-4 py-2 ring-1 ring-emerald-500/30 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {counts.completed} Done
          </span>
        </div>
        <button
          onClick={() => {
            setEditingId(null)
            setModalOpen(true)
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 shadow-lg hover:shadow-xl ring-1 ring-white/20 hover:-translate-y-0.5 transition-all duration-200 font-medium"
        >
          <span className="text-lg">＋</span>
          <span>Create Task</span>
        </button>
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
            className="h-full min-h-0 flex flex-col rounded-2xl p-4 md:p-5 bg-gradient-to-br text-white shadow-2xl relative overflow-hidden ring-1 ring-white/20 backdrop-blur-sm"
          >
            <div className={`absolute inset-0 opacity-90 bg-gradient-to-br ${statusMeta[key].gradient}`}></div>
            <div className="relative flex h-full flex-col">
              <header className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg flex items-center gap-2 drop-shadow-lg">
                  <span className="text-xl">{statusMeta[key].icon}</span>
                  {statusMeta[key].title}
                </h2>
                <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium">{grouped[key].length}</span>
              </header>
              <SortableContext 
                id={key}
                items={grouped[key].map((t) => `${key}:${t.id}`)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="flex-1 min-h-0 overflow-auto space-y-3 pr-1">
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
                      className="rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm p-6 text-sm text-white/70 text-center"
                    >
                      <div className="text-2xl mb-2">📋</div>
                      <div>No tasks yet</div>
                    </div>
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


