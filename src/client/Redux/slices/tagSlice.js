import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tagStatus: [],
};

const tagSlice = createSlice({
    name: 'tagStatus',
    initialState,
    reducers: {
        setInitialStatus: (state, action) => {
            state.tagStatus = action.payload;
        },
        setTagStatus: (state, action) => {
            state.tagStatus[action.payload] = !state.tagStatus[action.payload];
        }
    }
})

export const { setTagStatus, setInitialStatus } = tagSlice.actions;

export default tagSlice.reducer;