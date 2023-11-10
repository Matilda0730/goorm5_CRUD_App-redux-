import React from "react";
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

const Form = ({
	handleSaveClick,
	addTask,
	editingId,
	editingText,
	setEditingText,
	editingPrice,
	setEditingPrice,
	setEditingId,
	task,
	setTask,
	price,
	setPrice,
}) => {
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
					<input
						className="input-box"
						type="text"
						value={editingText}
						placeholder="제품명"
						onChange={(e) => setEditingText(e.target.value)}
						required
					/>
					<input
						className="input-box"
						type="number"
						value={editingPrice}
						placeholder="가격"
						onChange={(e) => setEditingPrice(e.target.value)}
						required
					/>
					<button type="submit" className="button-81">
						<FiCheck />
					</button>
					<button
						onClick={() => {
							// 취소 버튼 클릭시 수정 모드 종료
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
					<input
						className="input-box"
						type="text"
						value={task}
						placeholder="제품명"
						onChange={(e) => setTask(e.target.value)}
						required
					/>
					<input
						className="input-box"
						type="number"
						value={price}
						placeholder="가격"
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
					<button type="submit" className="button-81">
						<FiPlus></FiPlus>
					</button>
				</form>
			</div>
		);
	}
};

export default Form;
