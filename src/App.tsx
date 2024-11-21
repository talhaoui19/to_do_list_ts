import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Task } from "./types/app";

const App: React.FC = () => {
  const loadTasksFromLocalStorage = (): Task[] => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };
  const [filter, setFilter] = useState<"all" | "incomplete" | "completed">(
    "all"
  );
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAddTask = (taskText: string) => {
    const newtask: task = {
      id: Date.now(),
      text: taskText,
      isCompleted: false,
    };
    const updatedTasks = [...tasks, newtask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedtasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedtasks);
    saveTasksToLocalStorage(updatedtasks);
  };

  const resetTasks = () => {
    setTasks([]);
    saveTasksToLocalStorage([]);
  };

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "incomplete") return !task.isCompleted;
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.text.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const editTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">قائمة مهام</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-5">
        <p className="text-gray-600">مرحبًا! أضف مهماتك هنا 😊</p>
      </div>

      <div className="mt-6">
        <TaskInput onAddTask={handleAddTask} />
      </div>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
          placeholder="بحث عن مهمة"
        />
      </div>

      <div className="flex mb-4 gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-md`}
        >
          الكل
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-md`}
        >
          مكتملة
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`${
            filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-md`}
        >
          غير مكتملة
        </button>
      </div>

      <TaskList
        tasks={searchedTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        editTask={editTask}
      />

      <button
        onClick={resetTasks}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        إعادة تعيين المهام
      </button>
    </div>
  );
};

export default App;
