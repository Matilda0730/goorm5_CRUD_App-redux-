import React from "react";
import "./App.css";
import List from "./components/List.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ClearAllTasks from "./components/ClearAllTasks.js";
import Form from "./components/Form.js";
import { useSelector } from "react-redux";

const App = () => {
	const tasks = useSelector((state) => state.tasks.tasks);

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
			<List /> <h2>Total: {`${getTotalPrice().toLocaleString()}원`}</h2> <ClearAllTasks />
		</div>
	);
};

export default App;
