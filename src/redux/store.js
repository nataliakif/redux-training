import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState() ? { tasks: loadState() } : undefined;
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState, // 🧠 передаём
});

// 🎯 Подписываемся на store и сохраняем в localStorage при каждом изменении

store.subscribe(() => {
  const state = store.getState();
  console.log("✅ saveState called with:", state.tasks); // Добавь лог
  saveState(state.tasks); // НЕ state.tasks.tasks
});
