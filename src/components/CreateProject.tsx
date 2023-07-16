import React, { ChangeEvent, useState } from "react";
import { Upload } from "lucide-react";

interface FormProps {
	image: File | null;
	imagePreview: string | ArrayBuffer | null;
	title: string;
	description: string;
	link?: string;
	source?: string;
}

const CreateProject = () => {
	const [formData, setFormData] = useState<FormProps>({
		image: null,
		imagePreview: "",
		title: "",
		description: "",
		link: "",
		source: ""
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		if (e.target instanceof HTMLInputElement && e.target.files) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onloadend = () => {
				setFormData((prevFormData) => ({
					...prevFormData,
					image: file,
					imagePreview: reader.result as string
				}));
			};

			if (file)
				reader.readAsDataURL(file);
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value
			}));
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormData({
			image: null,
			imagePreview: null,
			title: "",
			description: "",
			link: "",
			source: ""
		});
		console.log(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="flex items-center justify-center">
				<label
					htmlFor="image"
					className="w-full flex flex-col justify-center items-center bg-neutral-700/50 hover:bg-neutral-800 border-2 border-neutral-600 hover:border-neutral-500 border-dashed cursor-pointer rounded-md"
				>
					{formData.imagePreview ? (
						<img
							src={formData.imagePreview as string}
							alt="Uploaded"
							className="w-fit h-32 rounded"
						/>
					) : (
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Upload className="w-8 h-auto mb-4" />
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span className="font-semibold">Click to upload</span> or
								drag and drop
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								SVG, PNG, or JPG
							</p>
						</div>
					)}
					<input
						id="image"
						type="file"
						className="hidden"
						onChange={handleChange}
					/>
				</label>
			</div>
			<input
				id="title"
				name="title"
				type="text"
				placeholder="Title *"
				value={formData.title}
				onChange={handleChange}
				className="p-2 bg-neutral-700/50 rounded-md w-full relative"
				required
			/>
			<textarea
				id="description"
				name="description"
				placeholder="Description *"
				value={formData.description}
				onChange={handleChange}
				className="h-24 p-2 bg-neutral-700/50 rounded-md resize-none"
				required
			/>
			<p className="text-xs font-medium uppercase separator-hr">optional</p>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col flex-grow">
					<input
						id="link"
						name="link"
						type="text"
						placeholder="Link"
						value={formData.link}
						onChange={handleChange}
						className="p-2 bg-neutral-700/50 rounded-md"
					/>
					<label htmlFor="link" className="text-xs text-neutral-400">
						<span className="text-neutral-500">i.e.</span> nanos.club,
						fn.nanos.club
					</label>
				</div>
				<div className="flex flex-col flex-grow">
					<input
						id="source"
						name="source"
						type="text"
						placeholder="Source"
						value={formData.source}
						onChange={handleChange}
						className="p-2 bg-neutral-700/50 rounded-md"
					/>
					<label htmlFor="source" className="text-xs text-neutral-400">
						<span className="text-neutral-500">i.e.</span>{" "}
						github.com/misternano/repo
					</label>
				</div>
			</div>
			<button type="submit" className="py-1 px-4 bg-brand text-black hover:bg-brand/80 rounded transition-colors">
				Submit
			</button>
		</form>
	);
};

export default CreateProject;
