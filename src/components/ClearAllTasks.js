import React from "react";
import { useDispatch } from "react-redux";
import { clearAllTasks } from "../features/createSlice";

export const ClearAllTasks = React.memo(({ showToastError }) => {
	const dispatch = useDispatch();

	const deleteAllTasks = () => {
		dispatch(clearAllTasks());
		localStorage.removeItem("tasks");
		showToastError("모든 아이템이 삭제되었습니다.");
	};
	//함수끼리 이름이 같으면 충돌 나므로 주의
	return (
		<button onClick={deleteAllTasks} className="clear-button">
			Delete All
		</button>
	);
});

export default ClearAllTasks;
