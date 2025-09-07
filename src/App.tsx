import './index.css'
import { TasksProvider } from './context/TasksContext'
import { Board } from './components/Board'

function App() {
  return (
    <TasksProvider>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10 text-center">
            <h1 className="inline-flex items-center gap-2 text-white text-3xl md:text-4xl font-semibold tracking-tight drop-shadow-sm">
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white/15 ring-1 ring-white/30 shadow-sm">📊</span>
              Kanban Board
            </h1>
            <p className="text-indigo-100 text-sm mt-2">Organize • Track • Achieve</p>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 md:px-6 -mt-8 md:-mt-10 pb-6 h-[calc(100vh-200px)]">
          <div className="h-full">
            <Board />
          </div>
        </main>
      </div>
    </TasksProvider>
  )
}

export default App
