import { useState } from "react";

interface taskInputProps {
  onAddTask: (task: string) => void;
}

const TaskInput: React.FC<taskInputProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>("");
  const handleAddTask = () => {
    if (task.trim() !== "") {
      onAddTask(task);
      setTask("");
    }
  };
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="أدخل مهمة جديدة..."
        className="flex-grow p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        أضف
      </button>
    </div>
  );
};

export default TaskInput;
