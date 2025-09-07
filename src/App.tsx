import './index.css'
import { TasksProvider } from './context/TasksContext'
import { Board } from './components/Board'

function App() {
  return (
    <TasksProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <header className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8 text-center">
            <h1 className="inline-flex items-center gap-3 text-white text-3xl md:text-4xl font-bold tracking-tight drop-shadow-lg">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/20 ring-2 ring-white/30 shadow-lg backdrop-blur-sm">📊</span>
              Kanban Board
            </h1>
            <p className="text-indigo-100 text-sm mt-3 font-medium">Organize • Track • Achieve</p>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-3 md:px-4 -mt-6 md:-mt-8 pb-4 h-[calc(100vh-180px)]">
          <Board />
        </main>
      </div>
    </TasksProvider>
  )
}

export default App
