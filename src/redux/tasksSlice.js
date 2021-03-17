import { createSlice } from "@reduxjs/toolkit"

const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        showTasks(state, action) {
            return action.payload
        },
        addToTasks(state, action) {
            state.push(action.payload)
        }
    },
})

export const {addToTasks, showTasks} = tasksSlice.actions
export default tasksSlice.reducer