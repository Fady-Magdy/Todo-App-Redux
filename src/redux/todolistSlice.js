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
      state.list[action.payload - 1].complete =
        !state.list[action.payload - 1].complete;
      saveToLocalStorage(state);
    },
    editItem: (state, action) => {
      state.list[action.payload.id - 1].value = action.payload.value;
      saveToLocalStorage(state);
    },
    refreshItems: (state) => {
      let count = 0;
      state.list = state.list.map((item) => {
        count++;
        return { ...item, id: count };
      });
      saveToLocalStorage(state);
    },
  },
});

export const {
  addItem,
  removeItem,
  clearList,
  setComplete,
  editItem,
  refreshItems,
} = todolistSlice.actions;

export default todolistSlice.reducer;
