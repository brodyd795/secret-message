import React, { useState } from "react";
import fetch from "isomorphic-unfetch";

const styles = {
	wrapper: {
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

	const handleSave = async (e) => {
		e.preventDefault();

		await fetch(`/api`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				message
			}),
		});
	};

	return (
		<div style={styles.wrapper}>
			<form>
				<label htmlFor={'email'}>email</label>
				<input
					id={'email'}
					type={"email"}
					value={email}
					placeholder={"Enter recipient email address"}
					onChange={handleEmailChange}
					style={styles.formElement}
				/>
				<label htmlFor={'message'}>message</label>
				<input
					id={'message'}
					type={"text"}
					value={message}
					placeholder={"Enter secret message"}
					onChange={handleMessageChange}
					style={styles.formElement}
				/>
				<button type={"submit"} onClick={handleSave}>{'Save'}</button>
			</form>
		</div>
	);
};

export default Home;
