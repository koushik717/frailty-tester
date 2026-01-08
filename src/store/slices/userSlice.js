import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to save personal details
export const savePersonalDetails = createAsyncThunk(
    'user/savePersonalDetails',
    async (details, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/update-details', details, {
                withCredentials: true // Important for sessions
            });
            return details;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || 'Failed to save details',
                status: error.response?.status
            });
        }
    }
);

// Thunk to fetch personal details
export const fetchPersonalDetails = createAsyncThunk(
    'user/fetchPersonalDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/user/details', {
                withCredentials: true
            });
            return response.data.details;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch details');
        }
    }
);

// Thunk to update subscription
export const updateSubscription = createAsyncThunk(
    'user/updateSubscription',
    async ({ plan, status }, { rejectWithValue }) => {
        try {
            await axios.post('http://localhost:3000/api/user/subscription', { plan, status }, {
                withCredentials: true
            });
            return { plan, status };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update subscription');
        }
    }
);

const initialState = {
    isAuthenticated: false,
    user: null, // { id, name, email, subscription_plan, subscription_status }
    personalDetails: null,
    isLoadingDetails: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.personalDetails = null;
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
    extraReducers: (builder) => {
        builder
            .addCase(savePersonalDetails.fulfilled, (state, action) => {
                state.personalDetails = action.payload;
                // Also update local user object if details flag exists there
                if (state.user) {
                    state.user.hasPersonalDetails = true;
                    localStorage.setItem('user', JSON.stringify(state.user));
                }
            })
            .addCase(updateSubscription.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.subscription_plan = action.payload.plan;
                    state.user.subscription_status = action.payload.status;
                    localStorage.setItem('user', JSON.stringify(state.user));
                }
            })
            .addCase(fetchPersonalDetails.pending, (state) => {
                state.isLoadingDetails = true;
            })
            .addCase(fetchPersonalDetails.fulfilled, (state, action) => {
                state.isLoadingDetails = false;
                if (action.payload) {
                    state.personalDetails = action.payload;
                }
            })
            .addCase(fetchPersonalDetails.rejected, (state) => {
                state.isLoadingDetails = false;
            });
    }
});

export const { loginUser, logoutUser, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
