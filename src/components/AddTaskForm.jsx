import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = () => {
    const trimmed = text.trim();

    if (!trimmed) {
      alert("Please enter a task.");
      return;
    }

    onAdd(trimmed, priority);

    setText("");
    setPriority("Medium");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg p-4 shadow-md">

      <div className="flex flex-col md:flex-row gap-3">

        <input
          type="text"
          value={text}
          placeholder="Add a new task..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-500"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white outline-none"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 rounded font-medium"
        >
          Add Task
        </button>

      </div>

    </div>
  );
}