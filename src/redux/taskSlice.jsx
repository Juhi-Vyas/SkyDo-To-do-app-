import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
  "tasks/fetchWeather",
  async (city) => {
    const API_KEY = "1002f0477fb5da5e603859e3e546cbbb";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return { city, temp: data.main.temp, condition: data.weather[0].description };
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], weatherData: {} },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTaskUp: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        [state.tasks[index], state.tasks[index - 1]] = [state.tasks[index - 1], state.tasks[index]];
      }
    },
    moveTaskDown: (state, action) => {
      const index = action.payload;
      if (index < state.tasks.length - 1) {
        [state.tasks[index], state.tasks[index + 1]] = [state.tasks[index + 1], state.tasks[index]];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weatherData[action.payload.city] = action.payload;
    });
  },
});

export const { addTask, deleteTask, moveTaskUp, moveTaskDown } = taskSlice.actions;
export default taskSlice.reducer;
