import { createSlice, current } from "@reduxjs/toolkit"

const projectsSlice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        showProjects(state, action) {
            return action.payload
        },
        addToProjects(state, action) {
            state.push(action.payload)
        },
        addTaskToProject(state, action) {
            state.tasks.push(action.payload)
        },
        editProject(state, action) {
            const index = state.findIndex(project => project.id === action.payload.id)
            state[index] = action.payload
        },
        deleteProject(state, action) {
            let edited = state.filter(project => project.id !== action.payload)
            return edited
        },
    },
})

export const {addToProjects, showProjects, addTaskToProject, editProject, deleteProject} = projectsSlice.actions
export default projectsSlice.reducer