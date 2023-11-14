//"use strict";
import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List.js";
import Form from "./components/Form.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ClearAllTasks from "./components/ClearAllTasks.js";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch, connect } from "react-redux";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState("");
	const [price, setPrice] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editingText, setEditingText] = useState("");
	const [editingPrice, setEditingPrice] = useState("");
	const toastOptions = {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	};

	const handleEnd = (result) => {
		if (!result.destination) return;
		const newItemData = Array.from(tasks);

		const [reorderedItem] = newItemData.splice(result.source.index, 1);
		newItemData.splice(result.destination.index, 0, reorderedItem);

		setTasks(newItemData);
	};

	const showToastSuccess = (message) => {
		toast.success(message, toastOptions);
	};

	const showToastWarn = (message) => {
		toast.warn(message, toastOptions);
	};

	const showToastError = (message) => {
		toast.error(message, toastOptions);
	};

	const handleEditClick = (task) => {
		setEditingId(task.id); // 현재 편집 중인 할 일의 ID 설정해주기
		setEditingText(task.text); // 수정 입력 창에 텍스트 설정해주기
		setEditingPrice(task.price.toString()); // 수정 입력 창에 가격 설정해주기
	};
	const handleSaveClick = (id) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === id) {
					return { ...task, text: editingText, price: parseFloat(editingPrice) || 0 };
				}
				return task;
			})
		);
		setEditingId(null);
		setEditingText("");
		setEditingPrice("");
		showToastWarn("아이템이 수정되었습니다.");
	};

	const addTask = (e) => {
		e.preventDefault();
		if (task.trim() === "" || price.trim() === "") return;

		const newTask = {
			id: Date.now(),
			text: task,
			completed: false,
			price: parseFloat(price),
		};

		setTasks([...tasks, newTask]);
		setTask("");
		setPrice("");

		showToastSuccess("아이템이 추가되었습니다.");
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
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<h1 className="text">Budget Calculator</h1>
			<Form
				handleSaveClick={handleSaveClick}
				addTask={addTask}
				editingId={editingId}
				editingText={editingText}
				setEditingText={setEditingText}
				editingPrice={editingPrice}
				setEditingPrice={setEditingPrice}
				setEditingId={setEditingId}
				task={task}
				setTask={setTask}
				price={price}
				setPrice={setPrice}
			/>
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
