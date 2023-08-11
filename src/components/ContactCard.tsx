import { SubmitHandler, useForm } from "react-hook-form";
import { useToasts } from "../hooks";

interface InputProps {
	email: string;
	subject: string;
	message: string;
}

const ContactCard = () => {
	const toast = useToasts();
	const { register, handleSubmit, formState: { errors } } = useForm<InputProps>();

	const onSubmit: SubmitHandler<InputProps> = async (data) => {
		try {
			const response = await fetch("https://getform.io/f/adff09e7-4050-40d8-9665-9ae955e8fb66", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify(data)
			});
			console.log(data);
			if (response.ok) toast("Submitted", "", 2500, "bg-emerald-500");
			else toast("Error", "Couldn't submit your message, try again.", 2500, "bg-rose-500");
		} catch (error) {
			toast("Error", `${error}`, 2500, "bg-rose-500");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
			<div className="flex flex-col lg:grid grid-cols-2 gap-3">
				<input
					id="email"
					{...register("email", { required: true })}
					type="text"
					placeholder="Email *"
					className={`p-2 bg-neutral-700/50 rounded-md focus:rounded-md ${errors.email ? "border border-rose-500" : ""}`}
				/>
				<input
					id="subject"
					{...register("subject")}
					type="text"
					placeholder="Subject"
					className="p-2 bg-neutral-700/50 rounded-md focus:rounded-md"
				/>
				<input type="hidden" name="_gotcha" className="!hidden" />
			</div>
			<textarea
				id="message"
				{...register("message", { required: true })}
				placeholder="Message *"
				className={`h-32 p-2 bg-neutral-700/50 rounded-md resize-none ${errors.message ? "border border-rose-500" : ""}`}
			/>
			<input
				id="submit"
				type="submit"
				value="Submit"
				className="p-2 text-black bg-brand hover:bg-brand/80 rounded-md transition-colors cursor-pointer"
			/>
		</form>
	);
};

export default ContactCard;
