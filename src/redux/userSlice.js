import { createSlice, current } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        showUser(state, action) {
            return action.payload
        },
        editUserTask(state, action) {
            let index = state.tasks.findIndex((task) => (task.id === action.payload.id))
            state.tasks[index] = action.payload
        },
        editUser(state, action) {
            state.points = action.payload
        },
        deleteUserTask(state, action) {
            let edited = state.tasks.filter((task) => (task.id !== action.payload))
            state.tasks = edited
        },
        addTask(state, action) {
            state.tasks.push(action.payload)
        },
        addProject(state, action) {
            state.projects.push(action.payload)
        },
        deleteUserProject(state, action) {
            let edited = state.projects.filter(project => project.id !== action.payload)
            state.projects = edited
        }
    }
})

export const {showUser, editUser, editUserTask, deleteUserTask, addTask, addProject, deleteUserProject} = userSlice.actions
export default userSlice.reducer
