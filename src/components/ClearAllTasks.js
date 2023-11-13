import React from "react";

const ClearAllTasks = React.memo(({ setTasks, showToastError }) => {
	console.log("clear component");
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
});

export default ClearAllTasks;
