import { useSelector, useDispatch } from "react-redux";
import { deleteTask, moveTaskUp, moveTaskDown } from "../redux/taskSlice";

const TaskList = () => {
  const { tasks, weatherData } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <p className="text-center  text-gray-500">No tasks added.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={task.id} className="flex flex-col md:flex-row justify-between items-center p-3 bg-gray-100  rounded-lg shadow-md mb-2">
            <div className="flex flex-col">
              <span className=" font-semibold">{task.text}</span>
              {task.isOutdoor && weatherData[task.city] && (
                <div className="flex items-center text-gray-600  text-sm mt-1">
                  🌤  {task.city}: {weatherData[task.city].temp}°C, {weatherData[task.city].condition}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => dispatch(deleteTask(task.id))} className=" text-red-500">🗑</button>
              <button onClick={() => dispatch(moveTaskUp(index))} className=" text-blue-500">⬆</button>
              <button onClick={() => dispatch(moveTaskDown(index))} className=" text-blue-500">⬇</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
