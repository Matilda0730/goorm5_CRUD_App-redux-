import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";

const List = ({ handleEditClick, removeTask, tasks }) => {
	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					{`${task.text} : ${task.price}원`}
					<button onClick={() => handleEditClick(task)}>
						<FiEdit2></FiEdit2>
					</button>
					<button onClick={() => removeTask(task.id)}>
						<FiTrash2> </FiTrash2>
					</button>
				</li>
			))}
		</ul>
	);
};

export default List;
