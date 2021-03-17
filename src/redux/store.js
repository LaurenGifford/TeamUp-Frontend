import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./ProjectsSlice"

const store = configureStore({
    reducer: {
        projects: projectsReducer
    },
})

export default store