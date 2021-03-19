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
            console.log(current(state))
            state.tasks.push(action.payload)
            console.log(current(state))
        },
    },
})

export const {addToProjects, showProjects, addTaskToProject} = projectsSlice.actions
export default projectsSlice.reducer