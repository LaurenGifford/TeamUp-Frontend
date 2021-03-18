import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./ProjectsSlice"
import tasksReducer from "./tasksSlice"
import userReducer from "./userSlice"

const store = configureStore({
    reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
        user: userReducer,
    },
})

export default store