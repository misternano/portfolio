import { ChangeEvent, useState, Dispatch, SetStateAction, FormEvent } from "react";
import { useToasts } from "@/hooks";
import { Upload, Plus, X } from "lucide-react";

type ArrayField = "sources" | "tech";

interface FormProps {
	image: File | null;
	imagePreview: string | ArrayBuffer | null;
	title: string;
	description: string;
	link?: string;
	sources: string[];
	tech: string[];
}

interface CreateProjectProps {
	setCreateProjectModal: Dispatch<SetStateAction<boolean>>;
}

// Optional (recommended later): Zod schema for runtime validation before Supabase writes.
// Keeps UI flexible while preventing bad data.
// Example:
// const ProjectSchema = z.object({
//   title: z.string().min(1),
//   description: z.string().min(1),
//   link: z.string().trim().optional(),
//   sources: z.array(z.string().trim()).default([]),
//   tech: z.array(z.string().trim()).default([]),
// });

const CreateProject = ({ setCreateProjectModal }: CreateProjectProps) => {
	const toast = useToasts();
	const [formData, setFormData] = useState<FormProps>({
		image: null,
		imagePreview: "",
		title: "",
		description: "",
		link: "",
		sources: [""],
		tech: [""]
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

			if (file) reader.readAsDataURL(file);
			return;
		}

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	};

	const updateArrayItem = (field: ArrayField, index: number, nextValue: string) => {
		setFormData((prev) => {
			const next = [...prev[field]];
			next[index] = nextValue;
			return { ...prev, [field]: next };
		});
	};

	const addArrayItem = (field: ArrayField) => {
		setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
	};

	const removeArrayItem = (field: ArrayField, index: number) => {
		setFormData((prev) => {
			const current = prev[field];
			if (current.length <= 1) return { ...prev, [field]: [""] };

			const next = current.filter((_, i) => i !== index);
			return { ...prev, [field]: next };
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Minimal cleanup that works well with optional Zod later
		// const cleanedSources = formData.sources.map((s) => s.trim()).filter(Boolean);
		// const cleanedTech = formData.tech.map((t) => t.trim()).filter(Boolean);

		// Use cleanedSources / cleanedTech when writing to DB.

		setFormData({
			image: null,
			imagePreview: null,
			title: "",
			description: "",
			link: "",
			sources: [""],
			tech: [""]
		});

		toast("Success", "Project created successfully.", 2500, "bg-emerald-500");
		setCreateProjectModal(false);
	};

	return (
		<form onSubmit={handleSubmit} className="min-w-[25vw] flex flex-col gap-4">
			<div className="flex items-center justify-center">
				<label
					htmlFor="image"
					className="w-full flex flex-col justify-center items-center bg-neutral-700/50 hover:bg-neutral-800 border-2 border-neutral-600 hover:border-neutral-500 border-dashed cursor-pointer rounded-md"
				>
					{formData.imagePreview ? (
						<img src={formData.imagePreview as string} alt="Uploaded" className="w-fit h-32 rounded" />
					) : (
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Upload className="w-8 h-auto mb-4" />
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span className="font-semibold">Click to upload</span> or drag and drop
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPG</p>
						</div>
					)}
					<input id="image" type="file" className="hidden" onChange={handleChange} />
				</label>
			</div>

			<input
				autoFocus
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

			<div className="flex flex-col gap-4">
				<div className="flex flex-col">
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
						<span className="text-neutral-500">i.e.</span> nanos.club, fn.nanos.club
					</label>
				</div>
				<div className="flex flex-col">
					<div className="flex flex-col gap-2">
						{formData.sources.map((src, idx) => (
							<div key={`source-${idx}`} className="flex items-stretch gap-2">
								<input
									type="text"
									placeholder={idx === 0 ? "Source" : "More sources"}
									value={src}
									onChange={(e) => updateArrayItem("sources", idx, e.target.value)}
									className="p-2 bg-neutral-700/50 rounded-md flex-grow"
								/>
								{idx === 0 && (
									<button
										type="button"
										onClick={() => addArrayItem("sources")}
										className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-700/50 hover:bg-neutral-700 rounded-md"
									>
										<Plus size="16" />
									</button>
								)}
								{idx !== 0 && (
									<button
										type="button"
										onClick={() => removeArrayItem("sources", idx)}
										className="p-2 bg-neutral-700/50 hover:bg-neutral-700 rounded-md"
										aria-label="Remove source"
									>
										<X size="16" className="stroke-rose-500" />
									</button>
								)}
							</div>
						))}
					</div>
					<label htmlFor="link" className="text-xs text-neutral-400">
						<span className="text-neutral-500">i.e.</span> github.com/misternano/repo
					</label>
				</div>
				<div className="flex flex-col">
					<div className="flex flex-col gap-2">
						{formData.tech.map((t, idx) => (
							<div key={`tech-${idx}`} className="flex items-stretch gap-2">
								<input
									type="text"
									placeholder={idx === 0 ? "Tools" : "More tools"}
									value={t}
									onChange={(e) => updateArrayItem("tech", idx, e.target.value)}
									className="p-2 bg-neutral-700/50 rounded-md flex-grow"
								/>
								{idx === 0 && (
									<button
										type="button"
										onClick={() => addArrayItem("tech")}
										className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-700/50 hover:bg-neutral-700 rounded-md"
									>
										<Plus size="16" />
									</button>
								)}
								{idx !== 0 && (
									<button
										type="button"
										onClick={() => removeArrayItem("tech", idx)}
										className="group p-2 bg-neutral-700/50 hover:bg-neutral-700 rounded-md"
										aria-label="Remove tech"
									>
										<X size="16" className="stroke-rose-500" />
									</button>
								)}
							</div>
						))}
					</div>
					<label htmlFor="link" className="text-xs text-neutral-400">
						<span className="text-neutral-500">i.e.</span> React, TypeScript, Wrangler
					</label>
				</div>
			</div>

			<button
				type="submit"
				className="py-1 px-4 bg-brand text-black hover:bg-brand/80 rounded transition-colors"
			>
				Submit
			</button>
		</form>
	);
};

export default CreateProject;
