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
	const [successMessage, setSuccessMessage] = useState("");
	const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);


	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSave = async (e) => {
		e.preventDefault();

		const result = await fetch(`/api/controllers`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				message,
				isSelfDestructChecked
			}),
		});

		const json = await result.json();
		console.log('json', json)

		if (result.status === 200) {
			setSuccessMessage('Success!')
		} else {
			setSuccessMessage('FAIL')
		}
	};

	return (
		<div style={styles.wrapper}>
			<div>
				<p>{successMessage}</p>
			</div>
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
				<label htmlFor={'self-destruct'}>Self destruct this message after 15 minutes?</label>
				<input type={'checkbox'} name={'self-destruct'} checked={isSelfDestructChecked} onChange={() => setIsSelfDestructChecked(!isSelfDestructChecked)} />
				<button type={"submit"} onClick={handleSave}>{'Save'}</button>
			</form>
		</div>
	);
};

export default Home;
