import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async function () {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json(); // ⚠️ Должен быть `await`
    return data;
  }
);
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [
      // { id: 0, text: "Learn HTML and CSS", completed: true },
      // { id: 1, text: "Get good at JavaScript", completed: true },
      // { id: 2, text: "Master React", completed: false },
      // { id: 3, text: "Discover Redux", completed: false },
      // { id: 4, text: "Build amazing apps", completed: false },
    ],
    status: null,
    error: null,
  },

  reducers: {
    addTask(state, action) {
      state.tasks.push({
        id: new Date().toISOString(),
        title: action.payload.text,
        completed: false,
      });
    },
    deleteTask(state, action) {
      console.log(action.payload);
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask(state, action) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "resolved";
        state.tasks = action.payload.slice(0, 10);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { addTask, deleteTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
