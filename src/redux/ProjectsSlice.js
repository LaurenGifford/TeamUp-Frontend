import { createSlice } from "@reduxjs/toolkit"

const projectsSlice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        showProjects(state, action) {
            return action.payload
        },
        addToProjects(state, action) {
            state.push(action.payload)
        }
    },
})

export const {addToProjects, showProjects} = projectsSlice.actions
export default projectsSlice.reducer