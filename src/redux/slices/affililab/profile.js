import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
    status: 'idle',
    profile: null,
    isLoading: false,
    step: 0,
    error: null,
    experienceLevel: 0,
    preferredCategories: [],
    preferredAdvertisementTypes: []
};

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
    const response = await axios.post('http://localhost:4000/api/profile/profile', {});
    return response;
});


const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },

        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        setExperienceLevel(state, action) {
            state.experienceLevel = action.payload;
        },

        setCategorySelection(state, action) {
            state.preferredCategories = action.payload;
        },

        setPreferredAdvertisementTypes(state, action) {
            state.preferredAdvertisementTypes = action.payload;
        },

        setStep(state, action) {
            state.isLoading = false;
            state.step = action.payload;
        }
    },
    extraReducers: {
        [fetchProfile.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.profile = action.payload.data;
        },
        [fetchProfile.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});

// Reducer
export default slice;

// get profile
export function setStepAction(value) {
    return async dispatch => {
        dispatch(slice.actions.startLoading());
        try {
            setTimeout(() => {
                dispatch(slice.actions.setStep(value));
            }, 2000);
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };

}
