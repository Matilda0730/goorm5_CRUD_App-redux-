import React from "react";
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	addTasks,
	setEditingId,
	setEditingPrice,
	setEditingText,
	setPrice,
	setTask,
} from "../features/createSlice";
import { showToastSuccess, showToastWarn } from "../utils/toastmessage";

const Form = React.memo(() => {
	console.log("Form component");
	const dispatch = useDispatch();

	const tasks = useSelector((state) => state.tasks.tasks);
	const editingId = useSelector((state) => state.tasks.editingId);
	const editingText = useSelector((state) => state.tasks.editingText);
	const editingPrice = useSelector((state) => state.tasks.editingPrice);
	const task = useSelector((state) => state.tasks.task);
	const price = useSelector((state) => state.tasks.price);

	const handleSaveClick = (id) => {
		addTasks(
			tasks.map((task) => {
				if (task.id === id) {
					return {
						...task,
						text: editingText,
						price: parseFloat(editingPrice) || 0,
					};
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

		dispatch(addTasks({ text: task, price: price }));
		dispatch(setTask(""));
		dispatch(setPrice(""));

		showToastSuccess("아이템이 추가되었습니다.");
	};

	if (editingId) {
		return (
			<div className="container">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSaveClick(editingId);
					}}
					className="task-form"
				>
					<InputField
						type="text"
						value={editingText}
						placeholder="제품명"
						onChange={(e) => dispatch(setEditingText(e.target.value))}
						className="input-box"
					/>
					<InputField
						type="number"
						value={editingPrice}
						placeholder="가격"
						onChange={(e) => {
							setEditingPrice(e.target.value);
						}}
						className="input-box"
					/>
					<button type="submit" className="button-81">
						<FiCheck />
					</button>
					<button
						onClick={() => {
							setEditingId(null);
							setEditingText("");
							setEditingPrice("");
						}}
						className="button-81"
					>
						<FiX> </FiX>
					</button>
				</form>
			</div>
		);
	} else {
		return (
			<div className="container">
				<form onSubmit={addTask} className="task-form">
					<InputField
						type="text"
						value={task}
						placeholder="제품명"
						onChange={(e) => dispatch(setTask(e.target.value))}
						className="input-box"
					/>
					<InputField
						type="number"
						value={price}
						placeholder="가격"
						onChange={(e) => dispatch(setPrice(e.target.value))}
						className="input-box"
					/>
					<button type="submit" className="button-81">
						<FiPlus></FiPlus>
					</button>
				</form>
			</div>
		);
	}
});

export default Form;
