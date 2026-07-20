# Kanban Task Board — Sprint 05

A Trello-style task management board built with **React**, **Vite**, and
**Tailwind CSS v4**, featuring drag-and-drop, priority tagging, inline
editing, and localStorage persistence.

 **Live Demo:**  https://sprint-5-kanban-board.vercel.app/
 
 **GitHub Repo:** https://github.com/Ankan226/SPRINT-5-kanban-board

---

## Features

### Phase 1 — Core Functionality
- Three-column layout: To Do / In Progress / Done
- Add new tasks via a controlled input
- Delete tasks from any column
- Move tasks between columns

### Phase 2 — UI/UX Polish
- Inline editing — click any task's text to edit it in place
- Priority system (High / Medium / Low) with color-coded borders and badges
- State persists across page refreshes via `localStorage`

### Phase 3 — Advanced Interactions
- Drag-and-drop between columns using `@dnd-kit`
- Real-time search filter across all tasks
- Progress dashboard: total / pending / completed counts, completion %
- "Clear All" action to reset the board

---

## Screenshots

### Board Overview
<img width="1626" height="891" alt="image" src="https://github.com/user-attachments/assets/c5f27413-6aae-438a-bebf-f7e60b0cbb54" />


### Adding a Task
<img width="1642" height="860" alt="image" src="https://github.com/user-attachments/assets/89b701d0-5317-4e7d-ab7d-e8c99a6953ec" />


### Drag and Drop
<img width="1057" height="280" alt="image" src="https://github.com/user-attachments/assets/0e4d84da-7ddf-4791-97b2-75859cce8a0a" />


### Inline Editing
<img width="1617" height="480" alt="image" src="https://github.com/user-attachments/assets/2e6ebe04-e48f-4f08-9143-922b26005d32" />


### Search Filter
<img width="1642" height="870" alt="image" src="https://github.com/user-attachments/assets/1ecb7156-efa8-4d49-8681-de2ddbaebbcd" />


---

## Project Structure

kanban-board/
├── src/
│   ├── components/
│   │   ├── AddTaskForm.jsx
│   │   ├── Column.jsx
│   │   └── TaskCard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── Prompts.md


---

## Run Locally

```bash
git clone https://github.com/Ankan226/SPRINT-5-kanban-board.git
cd SPRINT-5-kanban-board
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Deployment

Deployed on **Vercel**, auto-building from the `main` branch on every push.
Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
