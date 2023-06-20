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

		if (email.trim() === "" || message.trim() === "") {
			toast("Error!", "Missing required fields.", 2500, "bg-red-500");
			return;
		}

		if (formRef.current)
			formRef.current.submit();
	};

	// TODO: make the submit button actually work
	return (
		<form ref={formRef} action="https://getform.io/f/adff09e7-4050-40d8-9665-9ae955e8fb66" onSubmit={handleSubmit} method="POST" target="norel noopen" className="flex flex-col gap-3">
			<div className="flex flex-col lg:grid grid-cols-2 gap-3">
				<input id="email" name="email" type="email" placeholder="Email *" value={email} onChange={handleEmailChange} className="bg-neutral-700/50 rounded-t border-b p-2 border-brand focus:rounded" />
				<input id="subject" name="subject" type="text" placeholder="Subject" className="bg-neutral-700/50 rounded-t border-b p-2 border-brand focus:rounded" />
				<input type="hidden" name="_gotcha" className="!hidden" />
			</div>
			<textarea id="message" name="message" placeholder="Message *" value={message} onChange={handleMessageChange} className="h-32 bg-neutral-700/50 rounded-t border-b p-2 border-brand focus:rounded resize-none" />
			<input id="submit" type="submit" value="Submit" className="p-4 sm:p-2 text-black bg-brand hover:bg-brand/80 rounded-md transition-colors cursor-pointer" />
		</form>
	);
};

export default ContactCard;
