import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./ProjectsSlice"
import tasksReducer from "./tasksSlice"

const store = configureStore({
    reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
    },
})

export default store