import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";

const List = ({ handleEditClick, removeTask, tasks }) => {
	return (
		<ul className="itemsUl">
			{tasks.map((task) => (
				<li key={task.id}>
					{`${task.text} ： ${task.price}원`}
					<div className="button-container">
						<button onClick={() => handleEditClick(task)} className="button-81">
							<FiEdit2 />
						</button>
						<button onClick={() => removeTask(task.id)} className="button-81">
							<FiTrash2 />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
};

export default List;
