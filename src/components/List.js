import React from "react";

const List = () => {
	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					{task.text} - {task.price}원
					<button onClick={() => handleEditClick(task)}>수정</button>
					<button onClick={() => removeTask(task.id)}>삭제</button>
				</li>
			))}
		</ul>
	);
};

export default List;
