import './index.css'
import { TasksProvider } from './context/TasksContext'
import { Board } from './components/Board'

function App() {
  return (
    <TasksProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 ring-2 ring-white/30 shadow-lg backdrop-blur-sm">
                  <span className="text-2xl">📊</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                  Kanban Board
                </h1>
              </div>
              <p className="text-blue-100 text-sm font-medium">
                Organize • Track • Achieve
              </p>
              <div className="mt-2">
                <div className="text-white/90 text-sm font-medium">
                  Professional Task Management
                </div>
                <div className="text-blue-100 text-xs mt-1">
                  Enterprise Ready
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 mx-auto max-w-7xl px-4 md:px-6 py-6">
          <Board />
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                © 2025 Kanban Board. All rights reserved.
              </div>
              <div className="text-sm text-gray-600">
                Developed with ❤️ by <span className="font-semibold text-blue-600">Bhavya Code</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TasksProvider>
  )
}

export default App
