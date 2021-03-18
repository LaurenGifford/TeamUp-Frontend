import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        showUser(state, action) {
            return action.payload
        },
        // editTask(state, action) {
        //     const index = state.tasks.find()
        //     return {...state, tasks[index]: action.payload}
        // }
    },
})

export const {showUser} = userSlice.actions
export default userSlice.reducer