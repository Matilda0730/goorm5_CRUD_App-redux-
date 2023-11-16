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
		editTask: (state, action) => {
			const { id, text, price } = action.payload;
			const updatedItems = state.tasks.map((item) => {
				if (item.id === id) {
					return { ...item, text, price };
				}
				return item;
			});
			state.tasks = updatedItems;
		}, //이름 맞추기
		setDnDTasks(state, action) {
			state.tasks = action.payload;
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
	editTask,
	setDnDTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
