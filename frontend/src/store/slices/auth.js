import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access: "",
  refresh: ""
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthDetails: (state, action) => {
      console.log(action);
      
      state.access = action.payload?.access
      state.refresh = action.payload?.refresh
    },
    logout: (state, action) => {
        state.access = ""
        state.refresh = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthDetails, logout } = slice.actions

export default slice.reducer