// import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import deficienciesMockup from '~/_mock_api_/medicly/deficiencies';

// ----------------------------------------------------------------------

const initialState = {
    status: 'idle',
    deficiencies: null,
};

export const fetchDeficiencies = createAsyncThunk('deficiencies/fetchDeficiencies', async () => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(deficienciesMockup);
        },2000);
    });
});


const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setBloodTestPhoto: (state, action) => {
            state.bloodTestPhoto = action.payload;
        },

        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    extraReducers: {
        [fetchDeficiencies.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchDeficiencies.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.profile = action.payload.data;
        },
        [fetchDeficiencies.rejected]: (state, action) => {
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
