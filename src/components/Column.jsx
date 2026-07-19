import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({
  id,
  title,
  tasks,
  onDelete,
  onEdit,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-1
        min-w-[280px]
        rounded-xl
        bg-slate-900
        p-4
        border-2
        transition-all
        duration-200
        ${
          isOver
            ? "border-indigo-500 bg-slate-800"
            : "border-slate-800"
        }
      `}
    >
      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <span className="bg-slate-700 text-slate-200 text-xs px-3 py-1 rounded-full">
          {tasks.length}
        </span>

      </div>

      <div className="space-y-3 min-h-[150px]">

        {tasks.length === 0 ? (
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center">

            <p className="text-slate-500 text-sm">
              No tasks here
            </p>

            <p className="text-slate-600 text-xs mt-1">
              Drag a task into this column.
            </p>

          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}

      </div>
    </div>
  );
}