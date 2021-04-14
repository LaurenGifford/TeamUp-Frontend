import { createSlice} from "@reduxjs/toolkit"

const tasksSlice = createSlice({
    name: "urTasks",
    initialState: [],
    reducers: {
        showUrTasks(state, action) {
            return action.payload
        },
        addToUrTasks(state, action) {
            state.push(action.payload)
        }
    },
})

export const {addToUrTasks, showUrTasks} = tasksSlice.actions
export default tasksSlice.reducer