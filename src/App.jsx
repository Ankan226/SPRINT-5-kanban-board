import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./components/Column";
import AddTaskForm from "./components/AddTaskForm";

const STORAGE_KEY = "kanban-board-state";

const COLUMN_META = [
  { id: "todo", title: "To Do" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const DEFAULT_STATE = {
  todo: [
    {
      id: crypto.randomUUID(),
      text: "Read Sprint 05 instructions",
      priority: "High",
      createdAt: new Date().toLocaleString(),
    },
  ],
  inProgress: [],
  done: [],
};

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

export default function App() {
  const [columns, setColumns] = useState(loadInitialState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addTask = (text, priority) => {
    const trimmed = text.trim();

    if (!trimmed) return;

    const exists = Object.values(columns)
      .flat()
      .some(
        (task) =>
          task.text.trim().toLowerCase() === trimmed.toLowerCase()
      );

    if (exists) {
      alert("Task already exists.");
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      priority,
      createdAt: new Date().toLocaleString(),
    };

    setColumns((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const deleteTask = (columnId, taskId) => {
    if (!window.confirm("Delete this task?")) return;

    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((t) => t.id !== taskId),
    }));
  };

  const editTask = (columnId, taskId, newText) => {
    const trimmed = newText.trim();

    if (!trimmed) return;

    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((task) =>
        task.id === taskId
          ? {
              ...task,
              text: trimmed,
            }
          : task
      ),
    }));
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const fromColumn = active.data.current?.fromColumn;
    const toColumn = over.id;

    if (!fromColumn || fromColumn === toColumn) return;

    setColumns((prev) => {
      const task = prev[fromColumn].find((t) => t.id === active.id);

      if (!task) return prev;

      return {
        ...prev,
        [fromColumn]: prev[fromColumn].filter(
          (t) => t.id !== active.id
        ),
        [toColumn]: [...prev[toColumn], task],
      };
    });
  };

  const filteredColumns = Object.fromEntries(
    COLUMN_META.map(({ id }) => [
      id,
      columns[id].filter((task) =>
        task.text.toLowerCase().includes(search.toLowerCase())
      ),
    ])
  );

  const totalTasks =
    columns.todo.length +
    columns.inProgress.length +
    columns.done.length;

  const completedTasks = columns.done.length;

  const pendingTasks = totalTasks - completedTasks;

  const progress =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

  const clearAll = () => {
    if (!window.confirm("Delete all tasks?")) return;

    setColumns({
      todo: [],
      inProgress: [],
      done: [],
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-2">

          <div>
          <h1 className="text-4xl font-bold text-white">
          Kanban Task Board
           </h1>

          <p className="text-slate-400 mt-2">
          Manage your tasks with drag & drop, priorities, inline editing and local storage.
          </p>
          </div>

          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>

        </div>

        <div className="flex gap-6 mb-6 text-sm">

          <div className="bg-slate-800 px-4 py-2 rounded text-white">
            Total: {totalTasks}
          </div>

          <div className="bg-yellow-600 px-4 py-2 rounded text-white">
            Pending: {pendingTasks}
          </div>

          <div className="bg-green-600 px-4 py-2 rounded text-white">
            Completed: {completedTasks}
          </div>

        </div>

        <div className="bg-slate-900 rounded-xl p-5 mb-6 border border-slate-800">

  <div className="flex justify-between items-center mb-3">
    <h3 className="text-white font-semibold">
      Overall Progress
    </h3>

    <span className="text-indigo-400 font-bold">
      {progress}%
    </span>
  </div>

  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

    <div
      className="h-full bg-indigo-500 transition-all duration-500"
      style={{
        width: `${progress}%`,
      }}
    />

  </div>

  <p className="text-slate-400 text-sm mt-2">
    Completed {completedTasks} of {totalTasks} tasks
  </p>

</div>

        <AddTaskForm onAdd={addTask} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full mt-5 mb-6 rounded bg-slate-800 border border-slate-700 px-3 py-2 text-white"
        />

        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid md:grid-cols-3 gap-5">

            {COLUMN_META.map(({ id, title }) => (
              <Column
                key={id}
                id={id}
                title={title}
                tasks={filteredColumns[id]}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}

          </div>
        </DndContext>

      </div>
    </div>
  );
}