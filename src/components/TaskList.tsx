import { useState } from "react";
import { Task } from "../types/app";

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  deleteTask,
  editTask,
}) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newText, setNewText] = useState<string>("");
  return (
    <ul className="items-start">
      {tasks.map((task, index) => {
        return (
          <div key={index}>
            <div className="flex items-center gap-[50px]">
              <li
                className={`p-2 border-b border-gray-200 last:border-b-0 flex justify-between items-center ${
                  task.isCompleted ? "line-through text-gray-500" : ""
                }`}
              >
                <span
                  onClick={() => {
                    toggleTaskCompletion(task.id);
                  }}
                  className="cursor-pointer"
                >
                  {task.text}
                </span>
              </li>
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                />
              ) : (
                <span
                  className={`${
                    task.isCompleted
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              )}
              <div>
                <button
                  onClick={() => {
                    if (editingTaskId === task.id) {
                      editTask(task.id, newText);
                      setEditingTaskId(null);
                    } else {
                      setEditingTaskId(task.id);
                      setNewText(task.text);
                    }
                  }}
                  className="text-blue-500 px-2 py-1"
                >
                  {editingTaskId === task.id ? "حفظ" : "تعديل"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default TaskList;
