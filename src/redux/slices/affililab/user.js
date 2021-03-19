import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
    auth: false,
    authData: {
        user: null,
        token: null,
        refreshToken: null
    }
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.auth = true;
            state.authData.user = action.payload.user;
            state.authData.token = action.payload.token;
            state.authData.refreshToken = action.payload.refreshToken;
        },
        setAuthToken: (state, action) => {

        },
        logout: (state, action) => {
            state.auth = false;
            state.authData = {
                user: null,
                token: null,
                refreshToken: null
            };
        },
    }
});

// Reducer
export default slice;

export {

}

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

};