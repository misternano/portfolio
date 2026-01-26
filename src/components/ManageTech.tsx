import { useState } from "react";
import { tech as initialTech } from "@/data";
import { Tech } from "@/types";
import { Pencil, Trash, X, Check } from "lucide-react";

const ManageTech = () => {
	const [techDraft, setTechDraft] = useState<Tech[]>(() => initialTech);

	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editDraft, setEditDraft] = useState<{ name: string; type: string }>({
		name: "",
		type: ""
	});

	const startEdit = (index: number) => {
		setEditingIndex(index);
		setEditDraft({
			name: techDraft[index]?.name ?? "",
			type: techDraft[index]?.type ?? ""
		});
	};

	const cancelEdit = () => {
		setEditingIndex(null);
		setEditDraft({ name: "", type: "" });
	};

	const saveRow = (index: number) => {
		const name = editDraft.name.trim();
		const type = editDraft.type.trim();
		if (!name || !type) return;

		setTechDraft((prev) =>
			prev.map((t, i) => (i === index ? { ...t, name, type } : t))
		);
		cancelEdit();
	};

	const deleteRow = (index: number) => {
		setTechDraft((prev) => prev.filter((_, i) => i !== index));
		if (editingIndex === index) cancelEdit();
		if (editingIndex !== null && index < editingIndex) setEditingIndex((v) => (v === null ? null : v - 1));
	};

	return (
		<>
			{techDraft.map((data: Tech, index: number) => {
				const isEditing = editingIndex === index;
				return (
					<div key={index} className="p-2 flex flex-row items-center justify-between gap-2 bg-card border border-neutral-700 hover:border-neutral-500 rounded-lg">
						<div className="min-w-0 flex-1">
							{!isEditing ? (
								<>
									<div className="flex flex-row gap-2">
										<img src={`../assets/svg/${data.image}.svg`} alt={`${data.name} Logo`} className="w-6 h-auto aspect-square rounded" />
										<p className="text-xl font-semibold truncate">{data.name}</p>
									</div>
									<span className="inline-block mt-1 p-0.5 px-1.5 text-xs font-archia uppercase border border-yellow-600 bg-brand/20 text-brand rounded-md">
										{data.type}
									</span>
								</>
							) : (
								<div className="flex flex-col gap-2">
									<input
										value={editDraft.name}
										onChange={(e) => setEditDraft((p) => ({ ...p, name: e.target.value }))}
										className="p-2 bg-neutral-800/60 border border-neutral-700 rounded-md w-full"
										placeholder="Name"
										autoFocus
									/>
									<input
										value={editDraft.type}
										onChange={(e) => setEditDraft((p) => ({ ...p, type: e.target.value }))}
										className="p-2 bg-neutral-800/60 border border-neutral-700 rounded-md w-full"
										placeholder="Type"
									/>
								</div>
							)}
						</div>
						<div className="flex items-center">
							{!isEditing ? (
								<div className="flex flex-col gap-2">
									<button type="button" onClick={() => startEdit(index)} className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-700/50 hover:bg-neutral-700 rounded-md">
										<Pencil size="16" />
									</button>
									<button type="button" onClick={() => deleteRow(index)} className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-700/50 hover:bg-neutral-700 rounded-md">
										<Trash size="16" />
									</button>
								</div>
							) : (
								<div className="flex flex-col gap-2">
									<button type="button" onClick={() => saveRow(index)} className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-700/50 hover:bg-neutral-700 rounded-md">
										<Check size="16" />
									</button>
									<button type="button" onClick={cancelEdit} className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-700/50 hover:bg-neutral-700 rounded-md">
										<X size="16" />
									</button>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default ManageTech;
