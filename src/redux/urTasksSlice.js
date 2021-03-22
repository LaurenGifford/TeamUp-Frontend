import { createSlice, current } from "@reduxjs/toolkit"

const tasksSlice = createSlice({
    name: "urTasks",
    initialState: [],
    reducers: {
        showUrTasks(state, action) {
            return action.payload
        },
        addToUrTasks(state, action) {
            state.push(action.payload)
            // console.log(current(state))
        }
    },
})

export const {addToUrTasks, showUrTasks} = tasksSlice.actions
export default tasksSlice.reducer