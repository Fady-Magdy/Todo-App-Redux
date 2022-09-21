import { configureStore } from '@reduxjs/toolkit'
import todolistSlice from './todolistSlice'
import userSlice from './userSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        todolist: todolistSlice
    }
})



