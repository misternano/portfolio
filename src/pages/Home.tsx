import React, { useMemo, useState, useRef, useEffect } from "react";
import { Avatar, Button, ProjectCard, ContactCard, CreateProject, StockCard, Layout, SocialLink, TechCard } from "../components";
import { Project, Stock, Tech } from "../types";
import { projects, stocks, tech } from "../data";
import moment from "moment";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Parallax } from "react-scroll-parallax";
import { ChevronDown, X, GanttChart, Plus } from "lucide-react";
import { useUserData } from "../hooks";
const greetings = ["Hi", "Hey", "Hello"];

const Home = () => {
	const { user } = useUserData();
	const [opacity, setOpacity] = useState<number>(1);
	const scrollRef = useRef<HTMLElement>(document.createElement("span"));
	const controlsX = useAnimation();
	const controlsY = useAnimation();
	const [motionRef, inView] = useInView();
	const [createProjectModal, setCreateProjectModal] = useState<boolean>(false);
	const [aboutModal, setAboutModal] = useState<boolean>(false);

	const age: number = Math.floor((moment().valueOf() - moment("2002-02-11", "YYYY-MM-DD").valueOf()) / 31536000000);

	const greeting = useMemo(() => {
		return greetings[Math.floor(Math.random() * greetings.length)];
	}, [greetings]);

	useEffect(() => {
		window.onscroll = () => {
			const current = window.scrollY;
			const offset = window.innerHeight / 2.75;

			if (current > offset)
				setOpacity(0);
			else if (current <= offset)
				setOpacity(1);
		};
	}, []);

	useEffect(() => {
		if (inView) {
			controlsX.start({
				opacity: 1,
				x: 0,
				transition: { delay: 0.1, duration: 0.5, ease: "easeInOut" }
			});
			controlsY.start({
				opacity: 1,
				y: 0,
				transition: { delay: 0.1, duration: 0.5, ease: "easeInOut" }
			});
		}
	}, [controlsX, controlsY, inView]);

	const createProject = () => {
		setCreateProjectModal(true);
	};

	const aboutManager = () => {
		setAboutModal(true);
	};

	return (
		<>
			<Layout>
				<Parallax speed={-10}>
					<header className="relative h-[90svh] flex justify-center items-center">
						<Parallax speed={20}>
							<div className="flex flex-col items-center gap-8">
								<Avatar />
								<div className="flex flex-col items-center">
									<h1 className="text-gradient text-center text-5xl font-bold leading-tight">
										{greeting}, <br className="md:hidden" /> I&apos;m Nano
									</h1>
									<h2 className="text-neutral-400 font-medium mb-2">
										{age} &bull; Developer
									</h2>
									<div className="flex flex-col items-center gap-4 z-20">
										<div className="flex flex-row gap-5 w-full md:w-fit pt-4 px-4 justify-center border-t border-neutral-700">
											<SocialLink size="h-12 md:h-10" link="https://www.discord.com/users/272535850200596480/" platform="discord">
												<path d="M433.4,93.2c-32.6-15-67.6-26-104.2-32.3c-0.7-0.1-1.3,0.2-1.7,0.8c-4.5,8-9.5,18.4-13,26.7c-39.4-5.9-78.5-5.9-117.1,0 c-3.5-8.4-8.7-18.7-13.2-26.7c-0.3-0.6-1-0.9-1.7-0.8c-36.6,6.3-71.6,17.3-104.2,32.3c-0.3,0.1-0.5,0.3-0.7,0.6 C11.4,193-6.8,289.7,2.1,385.2c0,0.5,0.3,0.9,0.7,1.2c43.8,32.2,86.2,51.7,127.8,64.6c0.7,0.2,1.4,0,1.8-0.6 c9.8-13.4,18.6-27.6,26.2-42.5c0.4-0.9,0-1.9-0.9-2.3c-13.9-5.3-27.2-11.7-39.9-19c-1-0.6-1.1-2-0.2-2.7c2.7-2,5.4-4.1,7.9-6.2 c0.5-0.4,1.1-0.5,1.7-0.2c83.8,38.3,174.5,38.3,257.3,0c0.5-0.3,1.2-0.2,1.7,0.2c2.6,2.1,5.2,4.2,8,6.2c0.9,0.7,0.9,2.1-0.1,2.7 c-12.8,7.5-26,13.8-40,19c-0.9,0.3-1.3,1.4-0.9,2.3c7.7,14.9,16.5,29.1,26.1,42.5c0.4,0.6,1.1,0.8,1.8,0.6 c41.8-12.9,84.3-32.5,128-64.6c0.4-0.3,0.6-0.7,0.7-1.2c10.7-110.4-17.9-206.4-75.7-291.4C434,93.5,433.7,93.3,433.4,93.2z M171.1,327.1c-25.2,0-46-23.2-46-51.6c0-28.4,20.4-51.6,46-51.6c25.8,0,46.4,23.4,46,51.6C217.1,303.9,196.7,327.1,171.1,327.1z M341.2,327.1c-25.2,0-46-23.2-46-51.6c0-28.4,20.4-51.6,46-51.6c25.8,0,46.4,23.4,46,51.6C387.2,303.9,367.1,327.1,341.2,327.1z" />
											</SocialLink>
											<SocialLink size="h-12 md:h-10" link="https://www.twitter.com/fruitynano/" platform="twitter">
												<path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
											</SocialLink>
											<SocialLink size="h-12 md:h-10" link="https://www.steamcommunity.com/id/misternano/" platform="steam">
												<path d="M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z" />
											</SocialLink>
											<SocialLink size="h-12 md:h-10" link="https://github.com/misternano/" platform="github">
												<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
											</SocialLink>
										</div>
									</div>
								</div>
							</div>
						</Parallax>
					</header>
				</Parallax>
				<button onClick={() => scrollRef.current?.scrollIntoView()} className="group absolute left-1/2 bottom-5 animate-bounce transition-all duration-300 focus:outline-0" style={{ opacity: opacity }}>
					<div className="flex flex-col justify-center items-center -translate-x-1/2">
						<span className="font-archia uppercase text-xs font-semibold text-neutral-300 group-hover:text-white group-focus:text-white transition-colors group-focus:underline underline-offset-4">
							learn more
						</span>
						<ChevronDown className="h-8 w-8 stroke-neutral-300 group-hover:stroke-white group-focus:stroke-white transition-colors" />
					</div>
				</button>
				<Parallax>
					<main className="mt-[20vh] md:mt-[40vh] m-2" ref={scrollRef}>
						<section id="about" ref={motionRef}>
							{!user ?
								<h3>
									What I Do
								</h3>
								:
								<div className="grid grid-cols-2 md:grid-cols-3 items-center md:w-[85%] mx-auto">
									<div className="hidden md:block" />
									<h3 className="pl-0 md:pl-6">
										What I Do
									</h3>
									<Button name="Manage" onClick={aboutManager} icon={
										<GanttChart size="16" className="stroke-neutral-300 group-hover:stroke-white transition-colors" />
									} />
								</div>
							}
							<div className="md:w-[85%] mx-auto flex flex-col gap-4">
								<motion.div initial={{ y: 15, opacity: 0 }} animate={controlsY} className="grid grid-cols-1 xl:grid-cols-3 items-center gap-4">
									<div className="order-1 xl:order-2 h-full p-4 flex flex-col justify-center items-center bg-smallcard border border-neutral-700 rounded-xl">
										<h4 className="text-neutral-300 font-medium text-center">
											Developer & Investor
										</h4>
										<p className="xl:hidden block text-neutral-300 text-center">
											Find my tech stack and investments I&apos;ve made below
										</p>
										<p className="xl:block hidden text-neutral-300 text-center">
											Find my tech stack below and investments I&apos;ve made on the left
										</p>
									</div>
									<div className="order-2 xl:order-1 grid grid-cols-2 xl:grid-cols-4 gap-4 xl:col-span-2">
										{stocks.map((data: Stock, index: number) => (
											<StockCard
												key={index}
												stock={data}
											/>
										))}
									</div>
								</motion.div>
								<motion.div initial={{ y: 15, opacity: 0 }} animate={controlsY} className="md:pb-0 py-2 flex flex-nowrap gap-2 border border-neutral-700 rounded-xl order-3 xl:col-span-4 overflow-x-scroll">
									{tech.map((data: Tech, index: number) => (
										<TechCard
											key={index}
											tech={data}
										/>
									))}
								</motion.div>
							</div>
						</section>
						<section id="projects" ref={motionRef}>
							{!user ?
								<h3>
									Projects
								</h3>
								:
								<div className="grid grid-cols-2 md:grid-cols-3 items-center">
									<div className="hidden md:block" />
									<h3 className="pl-0 md:pl-6">
										Projects
									</h3>
									<Button name="New" onClick={createProject} icon={
										<Plus size="16" className="stroke-neutral-300 group-hover:stroke-white transition-colors" />
									} />
								</div>
							}
							<motion.div initial={{ y: -15, opacity: 0 }} animate={controlsY} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 isolate">
								{projects.map((data: Project, index: number) => (
									<ProjectCard
										key={index}
										project={data}
										index={index}
										length={projects.length}
									/>
								))}
								<div className="grid items-center p-2 bg-card border border-neutral-700 rounded-xl">
									<h3 className="p-4">
										Contact
									</h3>
									<ContactCard />
								</div>
							</motion.div>
						</section>
					</main>
				</Parallax>
			</Layout>
			{createProjectModal &&
				<div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur">
					<div className="min-w-[20rem] p-4 flex flex-col gap-4 bg-neutral-900 border border-neutral-700 rounded-xl">
						<div className="flex flex-row justify-between items-center">
							<p className="font-medium text-sm text-neutral-300">New Project</p>
							<button onClick={() => setCreateProjectModal(false)} className="group border border-transparent hover:border-red-500 rounded-md p-0.5">
								<X size="16" className="group-hover:stroke-red-500" />
							</button>
						</div>
						<CreateProject />
					</div>
				</div>
			}
			{aboutModal &&
				// TODO: Add about manager
				<div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur">
					<div className="min-w-[20rem] p-4 flex flex-col gap-4 bg-neutral-900 border border-neutral-700 rounded-xl">
						<div className="flex flex-row justify-between items-center">
							<p className="font-medium text-sm text-neutral-300">About Management</p>
							<button onClick={() => setAboutModal(false)} className="group border border-transparent hover:border-red-500 rounded-md p-0.5">
								<X size="16" className="group-hover:stroke-red-500" />
							</button>
						</div>
						<div className="flex flex-row gap-4 justify-center">
							some stuff here
						</div>
					</div>
				</div>
			}
		</>
	);
};

export default Home;
