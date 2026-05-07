"use client";

import { useDeferredValue, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/src/shared/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/shared/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/src/shared/components/ui/command";

import { cn } from "@/src/shared/lib/utils";
import { useExamsSelect } from "../../exams/hooks/hooks";
import { IExam, IExamInfo } from "../../exams/types/exam";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/src/shared/components/ui/select";

interface Props {
    selectedId?: string;
    diplomaId: string;
    onChange: (val: string) => void
}

export function ExamsCombobox({ selectedId, diplomaId, onChange }: Props ) {
    const [open, setOpen] = useState(false);

    // 🔥 Hybrid state (initial من params)
    // const [value, setValue] = useState<string>(selectedId || "");



    const { data, isLoading } = useExamsSelect({
        diplomaId,
    });

    if (!data?.status || !data) {
        return <p>ee</p>
    }

    console.log("DATA EXAMS SELLECT", data)

    const exams = data.payload.data || [];

    const selectedExam = exams.find((e: IExam) => e.id === selectedId);



    return (
        <Select
            value={selectedId}
            onValueChange={(val) => {
                onChange(val);
                // onChange?.(val);
            }}
            open={open}
            onOpenChange={setOpen}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedExam?.title || "Select exam"} />
            </SelectTrigger>

            <SelectContent className="p-0">
                <SelectGroup>
                    {exams.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                            {e.title}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}