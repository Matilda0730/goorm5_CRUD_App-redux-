import React from "react";

const InputField = React.memo(({ type, value, placeholder, onChange, className }) => {
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
});

export default InputField;
