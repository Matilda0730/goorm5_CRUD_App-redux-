//"use strict";
import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ClearAllTasks from "./components/ClearAllTasks.js";
import { useDispatch } from "react-redux";
import { showToastError, showToastSuccess, showToastWarn } from "./utils/toastmessage.js";
import Form from "./components/Form.js";

const App = () => {
	const Dispatch = useDispatch();

	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState("");
	const [price, setPrice] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editingText, setEditingText] = useState("");
	const [editingPrice, setEditingPrice] = useState("");

	const handleEnd = (result) => {
		if (!result.destination) return;
		const newItemData = Array.from(tasks);

		const [reorderedItem] = newItemData.splice(result.source.index, 1);
		newItemData.splice(result.destination.index, 0, reorderedItem);

		setTasks(newItemData);
	};

	const handleEditClick = (task) => {
		setEditingId(task.id); // 현재 편집 중인 할 일의 ID 설정해주기
		setEditingText(task.text); // 수정 입력 창에 텍스트 설정해주기
		setEditingPrice(task.price.toString()); // 수정 입력 창에 가격 설정해주기
	};

	const removeTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
		showToastError("아이템이 삭제되었습니다.");
	};

	const getTotalPrice = () => {
		return tasks.reduce((total, item) => total + item.price, 0);
	};

	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	return (
		<div className="container">
			<ToastContainer />
			<h1 className="text">Budget Calculator</h1>
			<Form />
			<List
				handleEditClick={handleEditClick}
				removeTask={removeTask}
				tasks={tasks}
				onDragEnd={handleEnd}
			/>{" "}
			<h2>Total: {`${getTotalPrice().toLocaleString()}원`}</h2>
			<ClearAllTasks setTasks={setTasks} showToastError={showToastError} />
		</div>
	);
};

export default App;
