# 🗂️ Kanban Board - Professional Task Management

A modern, responsive Kanban board application built with React, TypeScript, and Tailwind CSS. Organize your tasks with drag-and-drop functionality, beautiful animations, and local persistence.

![Kanban Board](https://img.shields.io/badge/React-19.1.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-38B2AC) ![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF)

## ✨ Features

### 🎯 **Core Functionality**
- **📋 Task Management**: Create, edit, and delete tasks with rich details
- **🎯 Four Status Columns**: To Do, In Progress, Review, and Completed
- **🖱️ Drag & Drop**: Smooth drag-and-drop between columns with visual feedback
- **💾 Local Persistence**: Tasks automatically save to localStorage
- **🔄 Status Changes**: Quick dropdown menu to change task status
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🎨 **UI/UX Features**
- **Beautiful Gradients**: Stunning header with blue-to-purple gradient
- **Professional Design**: Clean, modern interface with subtle animations
- **Visual Feedback**: Hover effects, smooth transitions, and drag overlays
- **Status Indicators**: Color-coded priority levels and status badges
- **Empty State Handling**: Elegant drop zones for empty columns

### ⚡ **Technical Features**
- **TypeScript**: Full type safety and excellent developer experience
- **React Context**: Efficient global state management
- **Hot Reload**: Lightning-fast development with Vite
- **Production Ready**: Optimized builds and error-free code
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhavyacodes001/Kanban-board-art.git
   cd Kanban-board-art
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🏗️ Tech Stack

### **Frontend**
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Tailwind CSS 4.1.13** - Utility-first CSS framework

### **Build & Development**
- **Vite 7.1.2** - Next-generation frontend tooling
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing

### **Drag & Drop**
- **@dnd-kit/core** - Modern drag and drop toolkit
- **@dnd-kit/sortable** - Sortable list functionality
- **@dnd-kit/utilities** - Helper utilities

### **State Management**
- **React Context API** - Global state management
- **localStorage** - Client-side data persistence

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Board.tsx       # Main board layout with drag & drop
│   ├── TaskCard.tsx    # Individual task cards with status dropdown
│   ├── TaskForm.tsx    # Create/edit task form
│   └── Modal.tsx       # Modal dialog component
├── context/            # React Context
│   └── TasksContext.tsx # Global task state management
├── App.tsx             # Main app component with header/footer
├── main.tsx           # App entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 How to Use

### Creating Tasks

1. Click the **"Create Task"** button in the header
2. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Status** (To Do, In Progress, Review, Completed)
   - **Priority** (Low, Medium, High)
3. Click **"Save Task"**

### Managing Tasks

- **Edit**: Click on any task card to modify it
- **Delete**: Hover over a task and click the "Delete" button
- **Move**: Drag and drop tasks between columns
- **Status Change**: Use the dropdown menu in each task card

### Drag & Drop

- **Visual Feedback**: Tasks show hover effects and smooth transitions
- **Auto-save**: Changes persist immediately to localStorage
- **Cross-column**: Move tasks between any status columns
- **Empty Columns**: Drop tasks into empty columns with visual feedback

## 🎨 Design Features

### **Header Design**
- **Gradient Background**: Beautiful blue-to-purple gradient
- **Centered Layout**: Professional, balanced design
- **Logo & Branding**: Custom icon with "Kanban Board" title
- **Tagline**: "Organize • Track • Achieve"

### **Column Design**
- **Color-coded**: Each status has unique colors and icons
- **Status Badges**: Real-time task counts
- **Hover Effects**: Subtle shadows and transitions
- **Empty States**: Elegant drop zones with helpful text

### **Task Cards**
- **Priority Indicators**: Color-coded dots (red/yellow/green)
- **Status Dropdown**: Quick status changes with icons
- **Tag Support**: Display up to 2 tags with overflow indicator
- **Responsive**: Adapts to different screen sizes

## 🔧 Customization

### Adding New Status Columns

1. Update `TaskStatus` type in `TasksContext.tsx`:
   ```typescript
   export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed' | 'new_status'
   ```

2. Add column metadata in `Board.tsx`:
   ```typescript
   const statusMeta: Record<TaskStatus, {...}> = {
     // ... existing statuses
     new_status: { title: 'New Status', color: 'text-purple-700', ... }
   }
   ```

3. Update status options in `TaskForm.tsx` and `TaskCard.tsx`

### Styling Changes

- **Colors**: Modify Tailwind classes in components
- **Gradients**: Update gradients in `statusMeta` object
- **Animations**: Customize transitions in `index.css`
- **Layout**: Adjust grid and spacing classes

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test all drag & drop functionality
- Ensure responsive design
- Update documentation for new features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **@dnd-kit** - For the excellent drag & drop library
- **Vite Team** - For the fast build tool
- **TypeScript Team** - For type safety

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/bhavyacodes001/Kanban-board-art?style=social)
![GitHub forks](https://img.shields.io/github/forks/bhavyacodes001/Kanban-board-art?style=social)
![GitHub issues](https://img.shields.io/github/issues/bhavyacodes001/Kanban-board-art)
![GitHub pull requests](https://img.shields.io/github/issues-pr/bhavyacodes001/Kanban-board-art)

---

## 🎯 Live Demo

**Try the live application**: [Kanban Board Demo](https://bhavyacodes001.github.io/Kanban-board-art/)

---

**Made with ❤️ by [Bhavya Code](https://github.com/bhavyacodes001)**

*Professional task management made simple and beautiful.*