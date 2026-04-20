import React from 'react'

import {
    BookOpen,
    BookOpenCheck,
    Brain,
    FileText,
    Layers,
    RectangleEllipsis,

} from "lucide-react";
import FolderCodeIcon from '@/src/shared/components/icons/folderIcon';


const features = [
    {
        icon: Brain,
        title: "Tailored Diplomas",
        desc: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
        icon: BookOpenCheck,
        title: "Focused Exams",
        desc: "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
        icon: RectangleEllipsis ,
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
                        <div className="flex items-end text-[#155DFC] font-semibold text-sm">
                            <FolderCodeIcon className="w-10 h-8 text-[#155DFC]" />
                            <h4> Exam App</h4>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-3xl font-bold text-slate-800 leading-snug max-w-xl">
                                Empower your learning journey with our smart exam platform.
                            </h3>
                            <ul className="space-y-5">
                                {features.map(({ icon: Icon, title, desc }) => (
                                    <li key={title} className="flex gap-3">
                                        <div className="mt-0.5 p-2 h-fit border-2  border-[#155DFC]">
                                            <Icon className="size-7 text-[#155DFC]" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold text-[#155DFC] font-mono">{title}</p>
                                            <p className="text-base max-w-sm text-[#374151] leading-relaxed line-clamp-3 font-mono">{desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className="absolute right-[342px] -bottom-[282px]  bg-[#50A2FF] size-[402px] rounded-full z-[5] blur-[200px] "></div>

                </div>


                <div className="flex justify-center items-center">
                    <div className="w-full max-w-md px-4">
                        {children}

                    </div>
                </div>


            </div>
        </div>
    )
}

export default layout