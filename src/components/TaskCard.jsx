import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const PRIORITY_STYLES = {
  High: {
    border: "border-l-4 border-red-500",
    badge: "bg-red-500/20 text-red-300",
  },
  Medium: {
    border: "border-l-4 border-yellow-500",
    badge: "bg-yellow-500/20 text-yellow-300",
  },
  Low: {
    border: "border-l-4 border-green-500",
    badge: "bg-green-500/20 text-green-300",
  },
};

export default function TaskCard({
  task,
  columnId,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(task.text);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        fromColumn: columnId,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 999 : "auto",
      }
    : undefined;

  const commitEdit = () => {
    const trimmed = draftText.trim();

    if (trimmed) {
      onEdit(columnId, task.id, trimmed);
    } else {
      setDraftText(task.text);
    }

    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-slate-800 rounded-xl shadow-md p-4 transition-all hover:shadow-lg hover:scale-[1.02] ${
        PRIORITY_STYLES[task.priority]?.border || ""
      }`}
    >
      {/* Task Text */}

      {isEditing ? (
        <input
          autoFocus
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();

            if (e.key === "Escape") {
              setDraftText(task.text);
              setIsEditing(false);
            }
          }}
          className="w-full rounded bg-slate-700 text-white px-2 py-1 outline-none border border-indigo-500"
        />
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          className="text-white text-sm cursor-text break-words"
          title="Click to edit"
        >
          {task.text}
        </p>
      )}

      {/* Priority + Date */}

      <div className="flex items-center justify-between mt-3">

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            PRIORITY_STYLES[task.priority]?.badge
          }`}
        >
          {task.priority}
        </span>

        {task.createdAt && (
          <span className="text-[10px] text-slate-500">
            {task.createdAt}
          </span>
        )}

      </div>

      {/* Footer */}

      <div className="flex justify-between items-center mt-4">

        <span
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing text-slate-400 text-sm select-none hover:text-white"
          title="Drag Task"
        >
          ⠿ Drag
        </span>

        <button
          onClick={() => onDelete(columnId, task.id)}
          className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded text-xs text-white"
        >
          Delete
        </button>

      </div>
    </div>
  );
}