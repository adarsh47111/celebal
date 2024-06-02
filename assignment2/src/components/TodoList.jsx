import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { SquareCheckBig, Trash2, Undo2 } from "lucide-react";

const TodoList = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: uuid(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "asc") return a.text.localeCompare(b.text);
    if (sort === "desc") return b.text.localeCompare(a.text);
    return 0;
  });

  return (
    <>
      <div className="px-10 py-5 w-fit max-w-xl mx-auto bg-white rounded-xl shadow-md flex flex-col items-center mt-10">
        <p className="text-2xl font-medium my-3">TodoList</p>
        <div className="space-x-4">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <div className="w-full mt-2 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-2 w-1/2"
            aria-label="Filter"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border-2 w-1/2"
            aria-label="Sort"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className=" bg-red-500l w-full">
          {sortedTasks.map((task, index) => (
            <div
              key={task.id}
              className="flex border shadow mt-1 mb-1 justify-between items-center p-3 space-x-4"
            >
              <span
                className={`text-lg ${
                  task.completed ? "line-through text-green-600" : ""
                }`}
              >
                {task.text}
              </span>
              <div className=" space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.completed ? "Undo Task" : "Complete Task"}
                >
                  {task.completed ? (
                    <Undo2 size={20} strokeWidth={1.5} />
                  ) : (
                    <SquareCheckBig size={20} strokeWidth={1.5} />
                  )}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => removeTask(task.id)}
                  aria-label="Remove Task"
                >
                  <Trash2 size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
