//delete all, 수정 안됨, 가끔 undefined 값이 들어가있음
import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ClearAllTasks from "./components/ClearAllTasks.js";
import { useDispatch } from "react-redux";
import { showToastError, showToastSuccess, showToastWarn } from "./utils/toastmessage.js";
import Form from "./components/Form.js";
import { useSelector } from "react-redux";
import {
	setTasks,
	setEditingId,
	setEditingText,
	setEditingPrice,
	removeTask,
	getTotalPrice,
} from "./features/createSlice";

const App = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.tasks);

	const handleEnd = (result) => {
		if (!result.destination) return;
		const newItemData = Array.from(tasks);
		const [reorderedItem] = newItemData.splice(result.source.index, 1);
		newItemData.splice(result.destination.index, 0, reorderedItem);
		dispatch(setTasks(newItemData));
	};

	const handleEditClick = (task) => {
		dispatch(setEditingId(task.id));
		dispatch(setEditingText(task.text));
		dispatch(setEditingPrice(task.price.toString()));
	};

	const handleRemoveTask = (id) => {
		dispatch(removeTask(id));
		showToastError("아이템이 삭제되었습니다.");
	};

	const getTotalPrice = () => {
		return tasks.reduce((total, item) => total + item.price, 0);
	};

	// useEffect(() => {
	// 	localStorage.setItem("tasks", JSON.stringify(tasks));
	// }, [tasks]);

	// useEffect(() => {
	// 	const storedTasks = localStorage.getItem("tasks");
	// 	if (storedTasks) {
	// 		dispatch(setTasks(JSON.parse(storedTasks)));
	// 	}
	// }, []);

	return (
		<div className="container">
			<ToastContainer />
			<h1 className="text">Budget Calculator</h1>
			<Form />
			<List
				handleEditClick={handleEditClick}
				removeTask={handleRemoveTask}
				tasks={tasks}
				onDragEnd={handleEnd}
			/>{" "}
			<h2>Total: {`${getTotalPrice().toLocaleString()}원`}</h2>{" "}
			<ClearAllTasks setTasks={setTasks} showToastError={showToastError} />
		</div>
	);
};

export default App;
