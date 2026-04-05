import React from 'react'

import {
    CheckCircle2,
    BookOpen,
    FileText,
    Layers,
    Eye,
    EyeOff,
    User,
    Code2,
    Smartphone,
    Database,
    Palette,
    Cloud,
} from "lucide-react";

const features = [
    {
        icon: BookOpen,
        title: "Tailored Diplomas",
        desc: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
        icon: FileText,
        title: "Focused Exams",
        desc: "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
        icon: Layers,
        title: "Smart Multi-Step Forms",
        desc: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
];

const layout = ({ children }: { children: React.ReactNode }) => {




    return (
        <div className="h-screen  bg-slate-100">
            <div className="grid grid-cols-2 size-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                <div className="flex flex-col  px-26 py-16 relative overflow-hidden">
                    <div className="absolute left-[342px] -top-[199px]  bg-[#50A2FF] size-[402px] rounded-full z-[5] blur-[200px] "></div>


                    <div className='relative z-10 flex-1 h-full flex justify-around  gap-6 flex-col'>
                        <div className="flex items-center gap-2 text-[#155DFC] font-semibold text-sm">
                            <div className="w-5 h-5 rounded bg-[#155DFC] flex items-center justify-center">
                                <BookOpen className="w-3 h-3 text-white" />
                            </div>
                            Exam App
                        </div>

                        <div className="space-y-8">
                            <h1 className="text-3xl font-bold text-slate-800 leading-snug max-w-xl">
                                Empower your learning journey with our smart exam platform.
                            </h1>
                            <ul className="space-y-5">
                                {features.map(({ icon: Icon, title, desc }) => (
                                    <li key={title} className="flex gap-3">
                                        <div className="mt-0.5 w-6 h-6 rounded-md bg-sky-200 flex items-center justify-center shrink-0">
                                            <Icon className="w-3.5 h-3.5 text-sky-600" />
                                        </div>
                                        <div className='space-y-4'>
                                            <p className="text-xl font-semibold text-[#155DFC] font-mono">{title}</p>
                                            <p className="text-base max-w-sm text-slate-500 leading-relaxed line-clamp-3 font-mono">{desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className="absolute right-[342px] -bottom-[282px]  bg-[#50A2FF] size-[402px] rounded-full z-[5] blur-[200px] "></div>

                </div>


            </div>
        </div>
    )
}

export default layout