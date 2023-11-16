import React from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
	removeTask,
	setDnDTasks,
	setEditingId,
	setEditingPrice,
	setEditingText,
} from "../features/createSlice";
import { useDispatch } from "react-redux";
import { showToastError } from "../utils/toastmessage";
import { useSelector } from "react-redux";

const List = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.tasks);
	const handleEnd = (result) => {
		if (!result.destination) return;
		const newItemData = Array.from(tasks);
		const [reorderedItem] = newItemData.splice(result.source.index, 1);
		newItemData.splice(result.destination.index, 0, reorderedItem);
		dispatch(setDnDTasks(newItemData));
	};

	const handleEditClick = (task) => {
		dispatch(setEditingId(task.id));
		dispatch(setEditingText(task.text));
		dispatch(setEditingPrice(task.price.toString()));
	};

	const handleRemoveTask = (id) => {
		dispatch(removeTask(id));
		showToastError("아이템이 삭제되었습니다.");
	};
	return (
		<DragDropContext onDragEnd={handleEnd}>
			<Droppable droppableId="item-drop">
				{(provided, snapshot) => (
					<ul {...provided.droppableProps} ref={provided.innerRef} className={`itemsUl`}>
						{tasks.map((task, index) => (
							<Draggable
								key={task.id ? task.id.toString() : ""}
								draggableId={task.id ? task.id.toString() : ""}
								index={index}
							>
								{(provided) => (
									<li
										key={task.id ? task.id.toString() : ""}
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className={`itemsUl ${
											snapshot.isDraggingOver ? "itemsUlDraggingOver" : ""
										}`}
									>
										{`${task.text} ： ${task.price}원`}
										<div className="button-container">
											<button
												onClick={() => handleEditClick(task)}
												className="button-81"
											>
												<FiEdit2 />
											</button>
											<button
												onClick={() => handleRemoveTask(task.id)}
												className="button-81"
											>
												<FiTrash2 />
											</button>
										</div>
									</li>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default List;
