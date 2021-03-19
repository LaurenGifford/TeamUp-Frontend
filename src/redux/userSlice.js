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
        }
    }
})

export const {showUser, editUser, editUserTask} = userSlice.actions
export default userSlice.reducer
