import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import { useToasts } from "../hooks";

const ContactCard = () => {
	const [message, setMessage] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const formRef = useRef<HTMLFormElement>(null);
	const toast = useToasts();

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (email.trim() === "" && message.trim() === "") {
			toast("Error", "Missing email and message fields.", 2500, "bg-rose-500");
			return;
		}
		if (email.trim() === "") {
			toast("Error", "Missing email field.", 2500, "bg-rose-500");
			return;
		}
		if (message.trim() === "") {
			toast("Error", "Missing message field.", 2500, "bg-rose-500");
			return;
		}
	};

	// TODO: Submission still doesnt work, need to actually look at it
	return (
		<form ref={formRef} action="https://getform.io/f/adff09e7-4050-40d8-9665-9ae955e8fb66" onSubmit={handleSubmit} method="POST" target="norel noopen" className="flex flex-col gap-3">
			<div className="flex flex-col lg:grid grid-cols-2 gap-3">
				<input id="email" name="email" type="email" placeholder="Email *" value={email} onChange={handleEmailChange} className="p-2 bg-neutral-700/50 rounded-md focus:rounded-md" />
				<input id="subject" name="subject" type="text" placeholder="Subject" className="p-2 bg-neutral-700/50 rounded-md focus:rounded-md" />
				<input type="hidden" name="_gotcha" className="!hidden" />
			</div>
			<textarea id="message" name="message" placeholder="Message *" value={message} onChange={handleMessageChange} className="h-32 p-2 bg-neutral-700/50 rounded-md resize-none" />
			<input id="submit" type="submit" value="Submit" className="p-2 text-black bg-brand hover:bg-brand/80 rounded-md transition-colors cursor-pointer" />
		</form>
	);
};

export default ContactCard;
