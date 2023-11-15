import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tasks: [],
	task: "",
	price: "",
	editingId: null,
	editingText: "",
	editingPrice: "",
};

export const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		setTasks(state, action) {
			state.tasks = [...state.tasks, action.payload];
		},

		// addTask: (state, action) => {
		// 	const newTask = {
		// 		id: Date.now(),
		// 		text: action.payload.text,
		// 		completed: false,
		// 		price: parseFloat(action.payload.price),
		// 	};
		// 	state.tasks.push(newTask);
		// },
		// removeTask: (state, action) => {
		// 	return state.filter((task) => task.id !== action.payload);
		// },
		// getTotalPrice: (state, action) => {
		// 	return state.reduce((total, item) => total + item.price, 0);
		// },
	},
});

export const { addTask, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
