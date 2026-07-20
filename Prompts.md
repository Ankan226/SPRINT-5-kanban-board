## 1. Project Architecture

**Prompt:** Asked how to structure a React + Vite Kanban board using
`useState`, with one state array per column (To Do / In Progress / Done),
and how prop drilling should pass handlers (`addTask`, `deleteTask`,
`editTask`) down from a parent `App` component through `Column` to
`TaskCard`.

**What I did with it:** Set up `App.jsx` as the single source of truth for
board state, with `Column.jsx` and `TaskCard.jsx` as presentational
children that call functions passed down as props.

---

## 2. Drag-and-Drop with dnd-kit

**Prompt:** Asked for a walkthrough of `@dnd-kit/core`'s `useDraggable`
and `useDroppable` hooks, and how `onDragEnd` on `DndContext` can move a
task from one column's state array into another (instead of just
reordering within one list).

**What I did with it:** Implemented `handleDragEnd` in `App.jsx`, tagging
each draggable card with its source column (`fromColumn`) so the handler
knows which array to remove from and which to append to.

---

## 3. Priority Styling & Inline Editing

**Prompt:** Asked how to conditionally apply Tailwind classes based on a
`priority` field (High/Medium/Low → red/yellow/green), and how to
implement click-to-edit behavior using local component state.

**What I did with it:** Built a `PRIORITY_STYLES` lookup object in
`TaskCard.jsx` and an `isEditing` boolean toggled by clicking the task
text, swapping the `<p>` for an `<input>`.

---

## 4. localStorage Persistence

**Prompt:** Asked how to safely persist React state to `localStorage`,
including handling the first-ever page load (no saved data yet) and
corrupted/invalid JSON.

**What I did with it:** Added a `useEffect` in `App.jsx` that writes the
`columns` state to `localStorage` on every change, and a
`loadInitialState()` function with a try/catch fallback for the initial
`useState` value.

---

## 5. Tailwind v4 Migration

**Prompt:** Ran into `npx tailwindcss init` failing because I had
installed Tailwind v4, which removed the config-file-based setup used in
v3. Asked what changed and how to configure it for Vite.

**What I did with it:** Switched to the `@tailwindcss/vite` plugin,
added it to `vite.config.js`, and replaced the three `@tailwind` directives
in `index.css` with a single `@import "tailwindcss"`.

---
