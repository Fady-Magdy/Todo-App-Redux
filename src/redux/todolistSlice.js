import { createSlice } from "@reduxjs/toolkit";
const saveToLocalStorage = (state) => {
  localStorage.setItem("list", JSON.stringify(state.list));
};
const todolistSlice = createSlice({
  name: "todolist",
  initialState: {
    list:
      localStorage.getItem("list") === null
        ? []
        : JSON.parse(localStorage.getItem("list")),
  },
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload);
      saveToLocalStorage(state);
    },
    removeItem: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state);
    },
    clearList: (state) => {
      state.list = [];
      saveToLocalStorage(state);
    },
    setComplete: (state, action) => {
      state.list[action.payload].complete =
        !state.list[action.payload].complete;
      saveToLocalStorage(state);
    },
    editItem: (state, action) => {
      state.list[action.payload.id - 1].value = action.payload.value;
      saveToLocalStorage(state);
    },
  },
});

export const { addItem, removeItem, clearList, setComplete, editItem } =
  todolistSlice.actions;

export default todolistSlice.reducer;
