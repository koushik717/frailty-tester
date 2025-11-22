import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null, // { id, name, email }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            // Optionally persist to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user');
        },
        loadUserFromStorage: (state) => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                state.isAuthenticated = true;
                state.user = JSON.parse(storedUser);
            }
        },
    },
});

export const { loginUser, logoutUser, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
