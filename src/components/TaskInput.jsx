import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, fetchWeather } from "../redux/taskSlice";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [city, setCity] = useState(""); 
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim() === "") return;

    const newTask = { id: Date.now(), text: task, isOutdoor, city: city.trim() };
    dispatch(addTask(newTask));

    
    if (isOutdoor && city.trim() !== "") {
      dispatch(fetchWeather(city));
    }

    setTask("");
    setCity("");
    setIsOutdoor(false);
  };

  return (
    <div className="flex flex-wrap  items-center gap-3">
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 w-full sm:w-auto focus:ring-2 focus:ring-blue-400 rounded"
      />
      
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={isOutdoor} onChange={() => setIsOutdoor(!isOutdoor)} className="w-full h-5 text-blue-500 sm:w-auto" />
        <span className="text-sm sm:text-base">Outdoor Task</span>
      </label>

      <input
        type="text"
        placeholder="City (if outdoor)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 w-full sm:w-auto focus:ring-2 focus:ring-blue-400 rounded"
        disabled={!isOutdoor}
      />
      
      <button onClick={handleAddTask} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded self-start">Add Task</button>

    </div>
  );
};

export default TaskInput;
