import React from "react";

function ClearAllTasks({ setTasks, showToastError }) {
	const clearAllTasks = () => {
		setTasks([]);
		localStorage.removeItem("tasks");
		showToastError("모든 아이템이 삭제되었습니다.");
	};
	return (
		<button onClick={clearAllTasks} className="clear-button">
			Delete All
		</button>
	);
}

export default ClearAllTasks;
