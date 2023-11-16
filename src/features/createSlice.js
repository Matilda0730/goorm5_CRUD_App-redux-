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
		setTask: (state, action) => {
			state.task = action.payload;
		},
		setPrice: (state, action) => {
			state.price = action.payload;
		},
		setEditingId: (state, action) => {
			state.editingId = action.payload;
		},
		setEditingText: (state, action) => {
			state.editingText = action.payload;
		},
		setEditingPrice: (state, action) => {
			state.editingPrice = action.payload;
		},
		addTasks: (state, action) => {
			const newTask = {
				id: Date.now(),
				text: action.payload.text,
				completed: false,
				price: parseFloat(action.payload.price),
			};
			state.tasks.push(newTask);
		},
		removeTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
		getTotalPrice: (state) => {
			state.tasks.reduce((total, item) => total + item.price, 0);
		},
		clearAllTasks: (state) => {
			state.tasks = [];
		},
	},
});

export const {
	addTasks,
	removeTask,
	setTasks,
	setTask,
	setPrice,
	setEditingId,
	setEditingText,
	setEditingPrice,
	clearAllTasks,
	getTotalPrice,
	handleRemoveTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
