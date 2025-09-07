import { ReactNode, useEffect } from 'react'

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 w-full max-w-xl mx-4 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition-transform duration-200">
          <header className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
          </header>
          <div className="p-6">{children}</div>
        </div>
      </div>
      {/* Removed aggressive 3D animation for a cleaner feel */}
    </div>
  )
}


