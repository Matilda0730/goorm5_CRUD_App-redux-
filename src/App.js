// "use strict";
import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List.js";
import Form from "./components/Form.js";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [price, setPrice] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editingText, setEditingText] = useState("");
	const [editingPrice, setEditingPrice] = useState("");

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
		setShowAlert(true);
		setAlertMessage("아이템이 수정되었습니다.");

		setTimeout(() => {
			setShowAlert(false);
			setAlertMessage("");
		}, 3000);
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

		setShowAlert(true);
		setAlertMessage("아이템이 추가되었습니다.");
		setTimeout(() => setShowAlert(false), 3000);
	};

	const removeTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
		setShowAlert(true);
		setAlertMessage("아이템이 삭제되었습니다.");
		setTimeout(() => {
			setAlertMessage("");
		}, 3000);
	};

	const getTotalPrice = () => {
		return tasks.reduce((total, item) => total + item.price, 0);
	};

	const clearAllTasks = () => {
		setTasks([]);
		localStorage.removeItem("tasks");
		// 추가적으로 알림 메시지를 표시하고 싶다면 여기에 코드 추가
		setShowAlert(true);
		setAlertMessage("모든 데이터가 삭제되었습니다.");
		setTimeout(() => setShowAlert(false), 3000);
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
			{showAlert && <div className="addAlarm">{alertMessage}</div>}
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
			<List handleEditClick={handleEditClick} removeTask={removeTask} tasks={tasks} />
			<h2>Total: {`${getTotalPrice().toLocaleString()}원`}</h2>
			<button onClick={clearAllTasks} className="clear-button">
				모두 지우기
			</button>
		</div>
	);
};

export default App;
