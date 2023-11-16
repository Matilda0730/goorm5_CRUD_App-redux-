import React from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ handleEditClick, removeTask, tasks, onDragEnd }) => {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="item-drop">
				{(provided, snapshot) => (
					<ul {...provided.droppableProps} ref={provided.innerRef} className={`itemsUl`}>
						{tasks.map((task, index) => (
							<Draggable
								key={task.id}
								draggableId={task.id ? task.id.toString() : ""}
								index={index}
							>
								{(provided) => (
									<li
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
												onClick={() => removeTask(task.id)}
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
