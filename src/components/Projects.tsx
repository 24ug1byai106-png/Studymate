import { ExternalLink, Github, Sparkles, Brain, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
    {
        title: "StudyMate",
        description: "An AI Learning Agent that reads PDFs and generates quizzes and interactive learning materials for better understanding.",
        icon: Brain,
        tags: ["AI", "React", "PDF Parsing"],
        gradient: "from-purple-500/20 to-pink-500/0",
        border: "group-hover:border-purple-500/50"
    },
    {
        title: "Automated Daily News",
        description: "Built an automation using n8n that curates and sends daily news updates directly to my email.",
        icon: Newspaper,
        tags: ["n8n", "Automation", "API"],
        gradient: "from-blue-500/20 to-cyan-500/0",
        border: "group-hover:border-blue-500/50"
    },
    {
        title: "Shadow Files",
        description: "Interactive mystery game where users solve detective puzzle cases using clues and logic.",
        icon: Sparkles,
        tags: ["Game Dev", "Interactive", "Web"],
        gradient: "from-emerald-500/20 to-teal-500/0",
        border: "group-hover:border-emerald-500/50"
    }
];

export default function Projects() {
    return (
        <section className="min-h-screen bg-[#050505] text-white py-32 px-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 rounded-[100%] blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20">
                    <h2 className="text-5xl font-bold tracking-tight mb-4 text-white">Selected Work</h2>
                    <p className="text-zinc-400 text-xl max-w-2xl font-light leading-relaxed">
                        A glimpse into my recent projects combining artificial intelligence, automation, and engaging user experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => {
                        const Icon = project.icon;
                        return (
                            <div
                                key={i}
                                className={cn(
                                    "group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-2xl",
                                    project.border
                                )}
                            >
                                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", project.gradient)} />

                                <div className="p-8 relative z-10 h-full flex flex-col">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center mb-8 border border-zinc-700/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <Icon className="w-7 h-7 text-zinc-300 group-hover:text-white transition-colors" />
                                    </div>

                                    <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-100 transition-colors">{project.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed flex-grow text-[15px]">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-8 mb-8">
                                        {project.tags.map((tag, j) => (
                                            <span key={j} className="text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 shadow-sm backdrop-blur-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 border-t border-zinc-800/80 pt-6 mt-auto">
                                        <button className="text-sm font-medium text-zinc-300 hover:text-blue-400 flex items-center gap-2 transition-colors">
                                            View Project <ExternalLink className="w-4 h-4" />
                                        </button>
                                        <button className="text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-2 transition-colors ml-auto">
                                            <Github className="w-4 h-4" /> Code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
