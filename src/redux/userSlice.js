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
            console.log(current(state))
        },
        editUser(state, action) {
            state.points = action.payload
        },
        deleteUserTask(state, action) {
            let edited = state.tasks.filter((task) => (task.id !== action.payload))
            state.tasks = edited
            console.log(current(state))
        }
    }
})

export const {showUser, editUser, editUserTask, deleteUserTask} = userSlice.actions
export default userSlice.reducer
