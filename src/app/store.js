import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/createSlice";

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
	},
});
