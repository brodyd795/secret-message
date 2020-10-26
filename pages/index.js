import React, { useState } from "react";

const styles = {
	wrapper: {
		backgroundColor: "blue",
		display: "flex",
		flexDirection: "column",
		width: "200px",
	},
	formElement: {
		display: "block",
	},
};

const Home = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSave = (e) => {
		e.preventDefault();
		console.log({ email, message });
	};

	return (
		<div style={styles.wrapper}>
			<form onSubmit={handleSave}>
				<input
					type={"email"}
					value={email}
					placeholder={"Enter recipient email address"}
					onChange={handleEmailChange}
					style={styles.formElement}
				/>
				<input
					type={"text"}
					value={message}
					placeholder={"Enter secret message"}
					onChange={handleMessageChange}
					style={styles.formElement}
				/>
				<input type={"submit"} value={"save"} />
			</form>
		</div>
	);
};

export default Home;
