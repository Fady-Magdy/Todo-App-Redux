import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Fady Magdy",
    age: 10,
    email: "fady@gmail.com",
  },
  reducers: {
    setName: (state, action) => {
      if (Object.keys(action.payload).length === Object.keys(state).length) {
        return (state = action.payload);
      }
    },
  },
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;
