import React from "react";

const submitForm = "https://getform.io/f/adff09e7-4050-40d8-9665-9ae955e8fb66";

const ContactCard = () => {
	return (
		<form action={submitForm} method="POST" target="norel noopen" className="flex flex-col gap-3">
			<div className="grid grid-cols-2 gap-3">
				<input id="email" name="email" type="email" placeholder="Email *" className="bg-neutral-700/50 rounded-t border-b p-2 border-brand focus:rounded" required />
				<input id="subject" name="subject" type="text" placeholder="Subject" className="bg-neutral-700/50 rounded-t border-b p-2 border-brand focus:rounded" />
				<input type="hidden" name="_gotcha" className="!hidden" />
			</div>
			<textarea id="message" name="message" placeholder="Message *" className="h-32 bg-neutral-700/50 rounded-t border-b p-2 border-brand focus:rounded resize-none" required />
			<input id="submit" type="submit" value="Submit" className="p-4 sm:p-2 text-black bg-brand hover:bg-brand/80 rounded-md transition-colors cursor-pointer drop-shadow" />
		</form>
	);
};

export default ContactCard;
