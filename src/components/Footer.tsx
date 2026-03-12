import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-zinc-900 bg-[#050505] text-zinc-400 py-16 px-6 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Vishnu Karanth</h2>
                    <p className="text-sm font-light">© {new Date().getFullYear()} All rights reserved. Built with Next.js &amp; Framer Motion.</p>
                </div>
                <div className="flex items-center gap-6">
                    <a href="https://github.com/vishnukaranth-git" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all hover:scale-110">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/vishnu-karanth-a25a32238" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all hover:scale-110 text-blue-500">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:contact@vishnu.com" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all hover:scale-110 text-emerald-500">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
