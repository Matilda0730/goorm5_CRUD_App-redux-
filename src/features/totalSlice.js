import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	total: 0,
};

const totalSlice = createSlice({
	initialState,
	reducers: {
		setTotal(state, action) {
			state.total = action.payload;
		},
	},
});
