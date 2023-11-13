import React from "react";

const InputField = ({ type, value, placeholder, onChange, className }) => {
	return (
		<input
			className={className}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			required
		/>
	);
};

export default InputField;
