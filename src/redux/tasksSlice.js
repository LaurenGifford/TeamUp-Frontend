import { createSlice, current } from "@reduxjs/toolkit"

const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        showTasks(state, action) {
            return action.payload
        },
        addToTasks(state, action) {
            state.push(action.payload)
            // console.log(current(state))
        },
        editTask(state, action) {
            const index = state.findIndex(task => task.id === action.payload.id)
            state[index] = action.payload
            console.log(current(state))
        }
    },
})

export const {addToTasks, showTasks, editTask} = tasksSlice.actions
export default tasksSlice.reducer