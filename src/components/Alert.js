import React from "react";
import "./Alert.css"; // CSS 파일을 만들어서 스타일을 정의합니다.

const Alert = ({ message, color }) => {
	return <div className={`alert ${color}`}>{message}</div>;
};

export default Alert;
