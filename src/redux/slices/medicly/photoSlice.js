// import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import deficienciesMockup from '~/_mock_api_/medicly/deficiencies';
import axios from 'axios'

// ----------------------------------------------------------------------

const initialState = {
    status: 'idle',
    deficiencies: [],
    parameterExplanation: [],
    currentDeficiency: {},
    resultData: []
};

export const fetchDeficiencies = createAsyncThunk('deficiencies/fetchDeficiencies', async () => {
        return await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:0QqfemBK/test_parameters');
});


export const fetchParameterExplanation = createAsyncThunk('deficiencies/fetchParameterExplanation', async () => {
    return await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:0QqfemBK/test_parameters_explanation');
});

export const fetchDeficienciesData = createAsyncThunk('deficiencies/fetchResultData', async (img) => {
    console.log('start with form data', img);
    const data = new FormData();
    data.append('source', img, 'blood-report.jpeg');
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    };
    return await axios.post('http://medicly-backend.azurewebsites.net/analyse', data, config);
});


const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setBloodTestPhoto: (state, action) => {
            state.bloodTestPhoto = action.payload;
        },

        resetBloodTestPhoto: (state, action) => {
            state.bloodTestPhoto = null;
            state.status = "idle";
            state.resultData = null
        },

        setDeficiency: (state, action) => {
          state.currentDeficiency = action.payload
        },

        setResultData: (state, action) => {
            state.resultData = action.payload;
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
            state.deficiencies = action.payload.data;
        },
        [fetchDeficiencies.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        },

        [fetchParameterExplanation.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchParameterExplanation.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload.data);
            state.parameterExplanation = action.payload.data;
        },
        [fetchParameterExplanation.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        },


        [fetchDeficienciesData.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchDeficienciesData.fulfilled]: (state, action) => {
            alert('result');
            console.log(action.payload);
            state.status = 'succeeded';
            state.resultData = action.payload.data.results;
        },
        [fetchDeficienciesData.rejected]: (state, action) => {
            state.status = 'failed';
            console.log('error', action.error);
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
