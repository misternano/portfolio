import React, { ChangeEvent, useState } from "react";
import { UploadCloud } from "lucide-react";

interface FormProps {
	image: File | null;
	imagePreview: string | ArrayBuffer | null;
	title: string;
	description: string;
	link: string;
	source: string;
}

const ProjectManagement = () => {
	const [formData, setFormData] = useState<FormProps>({ image: null, imagePreview: "", title: "", description: "", link: "", source: "" });

	// TODO: fix type and syntax errors
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, files } = e.target;

		if (files) {
			const file = files[0];
			const reader = new FileReader();

			reader.onloadend = () => {
				setFormData((prevFormData) => ({
					...prevFormData,
					image: file,
					imagePreview: reader.result
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

	// TODO: make this actually do something & use supabase
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormData({ image: null, imagePreview: null, title: "", description: "", link: "", source: "" });
		console.log(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="flex items-center justify-center">
				<label
					htmlFor="image"
					className="flex flex-col items-center justify-center w-full border-dashed rounded-md cursor-pointer bg-neutral-700/50 hover:bg-neutral-800 border-2 border-neutral-600 hover:border-neutral-500"
				>
					{formData.imagePreview ? (
						<img
							src={formData.imagePreview}
							alt="Uploaded"
							className="w-auto h-32"
						/>
					) : (
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<UploadCloud className="w-8 h-auto mb-4" />
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
			<input id="title" name="title" type="text" placeholder="Title" value={formData.title} onChange={handleChange} className="p-2 bg-neutral-700/50 rounded-md" />
			<textarea id="description" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="h-24 p-2 bg-neutral-700/50 rounded-md resize-none" />
			<div className="flex flex-row gap-4">
				<div>
					<input id="link" name="link" type="text" placeholder="Link" value={formData.link} onChange={handleChange} className="p-2 bg-neutral-700/50 rounded-md" />
					<p className="text-xs text-neutral-400"><span className="text-neutral-500">i.e.</span> nanos.club, fn.nanos.club</p>
				</div>
				<div>
					<input id="source" name="source" type="text" placeholder="Source" value={formData.source} onChange={handleChange} className="p-2 bg-neutral-700/50 rounded-md" />
					<p className="text-xs text-neutral-400"><span className="text-neutral-500">i.e.</span> github.com/misternano/repo</p>
				</div>
			</div>
			<div className="flex flex-row justify-between">
				<button onClick={() => null} className="py-0.5 px-4 bg-red-600 hover:bg-red-500 rounded transition-colors">Cancel</button>
				<button type="submit" className="py-0.5 px-4 bg-indigo-600 hover:bg-indigo-500 rounded transition-colors">Submit</button>
			</div>
		</form>
	);
};

export default ProjectManagement;
