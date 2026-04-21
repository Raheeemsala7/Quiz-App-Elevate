"use client";

import { Card, CardContent } from "@/src/shared/components/ui/card";
import { Button, buttonVariants } from "@/src/shared/components/ui/button";
import { Progress } from "@/src/shared/components/ui/progress";
import { CheckCircle2, FolderSearch, Rotate3DIcon, RotateCcw, XCircle } from "lucide-react";
import { IQuestionAnalytics, ISubmission } from "../types/questions";
import { RadioGroup, RadioGroupItem } from "@/src/shared/components/ui/radio-group";
import { Label } from "@/src/shared/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/shared/components/ui/chart";
import { Pie, PieChart } from "recharts";
import Link from "next/link";
import { cn } from "@/src/shared/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
    submission: ISubmission;
    analytics: IQuestionAnalytics[];
}
const chartConfig = {
    visitors: {
        label: "Answers",
    },
    Correct: {
        label: "Correct",
        color: "#22c55e", // green
    },
    Wrong: {
        label: "Wrong",
        color: "#ef4444", // red
    },
};

export default function ResultView({ submission, analytics }: Props) {
    const router = useRouter()

    const chartData = [
        {
            browser: "Correct",
            visitors: submission?.correctAnswers || 0,
            fill: "#00BC7D",
        },
        {
            browser: "Wrong",
            visitors: submission?.wrongAnswers || 0,
            fill: "#EF4444",
        },
    ];

    console.log(analytics)


    return (
        <div className="grid grid-cols-1 lg:grid-cols-[275px_1fr] gap-4 bg-white">

            {/* 🟢 Left Side (Score) */}
            <Card className="p-6 flex flex-col items-center justify-center gap-2 h-84  lg:h-128.5 bg-blue-50 border border-blue-200">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[203px] h-full"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            outerRadius={100}
                        />
                    </PieChart>

                </ChartContainer>
                <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 bg-emerald-500"></span>
                        <span className="text-sm font-mono font-medium">Correct: 20</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 bg-red-500"></span>
                        <span className="text-sm font-mono font-medium">Correct: 20</span>
                    </div>
                </div>


            </Card>

            {/* 🔵 Right Side (Questions) */}
            <div className="">
                <div className="md:h-128.5 lg:overflow-y-scroll">
                    {analytics.map((q,) => (
                        <Card key={q.questionId} className="p-2.5 border-none" style={{ boxShadow: "none" }}>
                            <CardContent className="space-y-2.5 p-0 border-none">

                                {/* Question */}
                                <h3 className="text-blue-600 font-semibold font-mono text-xl">
                                    {q.questionText}
                                </h3>

                                {/* Selected Answer */}

                                <RadioGroup value={q.selectedAnswer.id} className="pointer-events-none">

                                    {/* Selected Answer */}
                                    <div
                                        className={`p-4 flex items-center gap-2.5 ${q.isCorrect ? "bg-green-50" : "bg-red-50"
                                            }`}
                                    >
                                        <RadioGroupItem
                                            value={q.selectedAnswer.id}
                                            id={q.selectedAnswer.id}
                                            className={q.isCorrect ? `data-checked:border-emerald-600` : "data-checked:border-red-600"}
                                            indicatorClassName={q.isCorrect ? "emerald" : "red"}
                                        />
                                        <Label htmlFor={q.selectedAnswer.id} className="text-sm font-mono">
                                            {q.selectedAnswer.text}
                                        </Label>
                                    </div>

                                    {/* Correct Answer (لو غلط) */}
                                    {!q.isCorrect && (
                                        <div className="p-4 bg-green-50 border border-green-200 flex items-center gap-2.5">
                                            <RadioGroupItem
                                                value={q.correctAnswer.id}
                                                id={q.correctAnswer.id}
                                                indicatorClassName={"emerald"}
                                                className="border-emerald-600"

                                            />
                                            <Label htmlFor={q.correctAnswer.id} className="text-sm font-mono">
                                                {q.correctAnswer.text}
                                            </Label>
                                        </div>
                                    )}
                                </RadioGroup>

                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                    <Button variant="secondary" className="flex-1 bg-gray-200 p-4" onClick={() => router.refresh()}>
                        <RotateCcw className="text-lg" />
                        <span>Restart</span>
                    </Button>
                    <Link href={"/"} className={cn(buttonVariants() , "flex-1 bg-blue-600 p-4")} >
                        <FolderSearch className="text-lg" />
                        <span>Explore</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}