# 🗂️ Kanban Board

A modern, responsive Kanban board application built with React, TypeScript, and Tailwind CSS. Organize your tasks with drag-and-drop functionality, beautiful animations, and local persistence.

![Kanban Board](https://img.shields.io/badge/React-19.1.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC) ![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF)

## ✨ Features

- **📋 Task Management**: Create, edit, and delete tasks with rich details
- **🎯 Four Status Columns**: To Do, In Progress, Review, and Completed
- **🖱️ Drag & Drop**: Smooth drag-and-drop between columns with visual feedback
- **💾 Local Persistence**: Tasks automatically save to localStorage
- **🎨 Beautiful UI**: Modern design with gradients, animations, and responsive layout
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast**: Built with Vite for lightning-fast development and builds
- **🔧 TypeScript**: Full type safety and excellent developer experience

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

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🏗️ Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS 4.1.13
- **Build Tool**: Vite 7.1.2
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **State Management**: React Context API
- **Persistence**: localStorage
- **Linting**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Board.tsx       # Main board layout
│   ├── TaskCard.tsx    # Individual task cards
│   ├── TaskForm.tsx    # Create/edit task form
│   └── Modal.tsx       # Modal dialog
├── context/            # React Context
│   └── TasksContext.tsx # Global task state
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🎯 How to Use

### Creating Tasks
1. Click the **"Create Task"** button
2. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Status** (To Do, In Progress, Review, Completed)
   - **Priority** (Low, Medium, High)
3. Click **"Save"**

### Managing Tasks
- **Edit**: Click on any task card to modify it
- **Delete**: Hover over a task and click the "Delete" button
- **Move**: Drag and drop tasks between columns

### Drag & Drop
- **Visual Feedback**: Tasks show hover effects and smooth transitions
- **Auto-save**: Changes persist immediately to localStorage
- **Cross-column**: Move tasks between any status columns

## 🎨 Design Features

- **Gradient Headers**: Each column has a unique gradient background
- **Status Badges**: Color-coded priority indicators
- **Smooth Animations**: Subtle hover effects and transitions
- **Modern Modal**: Clean task creation/editing interface
- **Responsive Grid**: Adapts to different screen sizes

## 🔧 Customization

### Adding New Status Columns
1. Update `TaskStatus` type in `TasksContext.tsx`
2. Add column metadata in `Board.tsx`
3. Update the status options in `TaskForm.tsx`

### Styling Changes
- Modify Tailwind classes in components
- Update gradients in `statusMeta` object
- Customize animations in `index.css`

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Drag & drop powered by [@dnd-kit](https://dndkit.com/)
- Icons from [Emoji](https://emojipedia.org/)

---

**Made with ❤️ by [bhavyacodes001](https://github.com/bhavyacodes001)**