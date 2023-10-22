import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToasts } from "../hooks";
import { CheckCircle2, ChevronsLeft, ServerCrash } from "lucide-react";
import { z } from "zod";

interface InputProps {
	email: string;
	subject: string;
	message: string;
}

const InputSchema = z.object({
	email: z.string().email(),
	subject: z.string(),
	message: z.string().min(3)
})

const ContactCard = () => {
	const toast = useToasts();
	const { register, handleSubmit, formState: { errors } } = useForm<InputProps>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<{ email:string; message: string }>({
		email: "",
		message: ""
	});

	const onSubmit: SubmitHandler<InputProps> = async (data) => {
		try {
			setIsLoading(true);
			const validated = InputSchema.parse(data);
			const response = await fetch("https://getform.io/f/adff09e7-4050-40d8-9665-9ae955e8fb66", {
				method: "POST",
				body: JSON.stringify(validated)
			});
			if (response.ok) toast("", "Submitted", 2500, "bg-emerald-500", <CheckCircle2 size="16" />);
			else toast("", "Couldn't submit your message, try again in a few moments.", 2500, "bg-rose-500", <ServerCrash size="16" />);
		} catch (e: any) {
			e.issues.forEach((issue: z.ZodIssue) => {
				if (issue.path[0] === "email") {
					setError((prevState) => ({
						...prevState,
						email: "Email must be valid"
					}))
				} else if (issue.path[0] === "message") {
					setError((prevState) => ({
						...prevState,
						message: "Message must be at least 3 characters long"
					}))
				}
			});
			toast("Error", `${error.message}`, 2500, "bg-rose-500");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
			<div className="flex flex-col xl:flex-row gap-3">
				<div className="flex-grow relative">
					<input
						id="email"
						{...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
						type="text"
						placeholder="Email *"
						className={`w-full p-2 bg-neutral-700/50 rounded-md focus:rounded-md ${errors.email ? "ring-1 ring-rose-500" : ""}`}
					/>
				</div>
				{errors.email?.type === "pattern" ? (
					<div className="flex-grow p-2 flex flex-row gap-2 items-center bg-rose-500/25 backdrop-blur-xl rounded-md ring-1 ring-rose-500/50 pointer-events-none">
						<ChevronsLeft size="16" className="stroke-red-500" />
						<p className="text-red-500 text-xs">
							Requires a valid email.
						</p>
					</div>
					) : (
					<input
						id="subject"
						{...register("subject")}
						type="text"
						placeholder="Subject"
						className="flex-grow p-2 bg-neutral-700/50 rounded-md focus:rounded-md"
					/>
				)}
				<input type="hidden" name="_gotcha" className="!hidden" />
			</div>
			<textarea
				id="message"
				{...register("message", { required: true })}
				placeholder="Message *"
				className={`h-32 p-2 bg-neutral-700/50 rounded-md resize-none ${errors.message ? "ring-1 ring-rose-500" : ""}`}
			/>
			<input
				id="submit"
				type="submit"
				value={isLoading ? "Loading" : "Submit"}
				className="hidden"
				disabled={isLoading}
			/>
			<label className={`flex justify-center font-medium text-center text-sm p-2 text-black bg-brand rounded-md transition-colors cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-brand/80"}`} htmlFor="submit">
				{isLoading ? (
					<svg className="w-5 h-5 stroke-neutral-700" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<g>
							<circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="2" strokeLinecap="round">
								<animate attributeName="stroke-dasharray" dur="1.5s" calcMode="spline" values="0 150;42 150;42 150;42 150" keyTimes="0;0.475;0.95;1" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" repeatCount="indefinite" />
								<animate attributeName="stroke-dashoffset" dur="1.5s" calcMode="spline" values="0;-16;-59;-59" keyTimes="0;0.475;0.95;1" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" repeatCount="indefinite" />
							</circle>
							<animateTransform attributeName="transform" type="rotate" dur="2s" values="0 12 12;360 12 12" repeatCount="indefinite" />
						</g>
					</svg>
				) : "Submit"}
			</label>
		</form>
	);
};

export default ContactCard;
