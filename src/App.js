"use strict";
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingPrice, setEditingPrice] = useState("");

  const handleEditClick = (task) => {
    setEditingId(task.id); // 현재 편집 중인 할 일의 ID 설정해주기
    setEditingText(task.text); // 수정 입력 창에 텍스트 설정해주기
    setEditingPrice(task.price.toString()); // 수정 입력 창에 가격 설정해주기
  };
  const handleSaveClick = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, text: editingText, price: parseFloat(editingPrice) || 0 };
        }
        return task;
      })
    );
    setEditingId(null);
    setEditingText("");
    setEditingPrice("");
  };

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() === "" || price.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      price: parseFloat(price),
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setPrice("");

    setShowAlert(true);
    setAlertMessage("아이템이 추가되었습니다.");
    setTimeout(() => setShowAlert(false), 3000);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setShowAlert(true);
    setAlertMessage("아이템이 삭제되었습니다.");
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  const getTotalPrice = () => {
    return tasks.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="list">
      <h1 className="listTitle">예산 계산기</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          placeholder="제품명"
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type="number"
          value={price}
          placeholder="가격"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">추가</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {editingId === task.id ? (
              // 수정 상태인 경우 입력 필드 표시
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <input
                  type="number"
                  value={editingPrice}
                  onChange={(e) => setEditingPrice(e.target.value)}
                />
                <button onClick={() => handleSaveClick(task.id)}>저장</button>
              </>
            ) : (
              // 비수정 상태인 경우 텍스트 표시
              <>
                {task.text} - {task.price}원
                <button onClick={() => handleEditClick(task)}>수정</button>
              </>
            )}
            {editingId !== task.id && (
              // 수정 중이 아닌 경우에만 삭제 버튼 표시
              <button onClick={() => removeTask(task.id)}>삭제</button>
            )}
          </li>
        ))}
      </ul>
      {showAlert && <div className="addAlarm">{alertMessage}</div>}
      <h2>총지출: {getTotalPrice()}원</h2>
    </div>
  );
};

export default App;