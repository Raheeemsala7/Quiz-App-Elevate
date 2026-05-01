"use client"
import { Button, buttonVariants } from '@/src/shared/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/src/shared/components/ui/field'
import { Input } from '@/src/shared/components/ui/input'
import { Textarea } from '@/src/shared/components/ui/textarea'
import UploadImageField from '@/src/shared/components/upload-image-field'
import { cn } from '@/src/shared/lib/utils'
import { Loader2, SaveIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createExamSchema, CreateExamType } from '../schema/exam.diploma'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateExam, useUpdateExam } from '../hooks/hooks'
import { useDiplomasFilter } from '../../diploma/hooks/hooks'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select'

interface IProps {
    initialData?: CreateExamType
    isEdit?: Boolean;
    id?: string
}

const FormExam = ({ initialData, isEdit, id }: IProps) => {

    const { mutate, isPending: isPendingCreate } = useCreateExam()
    const { data: diplomas } = useDiplomasFilter()
    const { mutate: mutateUpdated, isPending: isPendingUpdate } = useUpdateExam()

    const isPending = isEdit ? isPendingUpdate : isPendingCreate

    const form = useForm<CreateExamType>({
        resolver: zodResolver(createExamSchema),
        defaultValues: {
            title: initialData?.title ?? "",
            description: initialData?.description ?? "",
            image: initialData?.image ?? "",
            diplomaId: initialData?.diplomaId ?? "",
            duration : initialData?.duration ?? 1,
        }
    })

    const router = useRouter()

    const onSubmit = (values: CreateExamType) => {

        console.log(values)

        if (isEdit) {
            mutateUpdated({ values, id: id ?? "" }, {
                onSuccess() {
                    toast.success("done update diploma")
                    router.push("/exams")
                },
                onError(error) {
                    toast.error(error.message || "something error")
                },
            })

        } else {
            mutate(values, {
                onSuccess() {
                    toast.success("done create exam")
                    router.push("/exams")
                },
                onError(error) {
                    toast.error(error.message || "something error")
                },
            })
        }
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-end gap-4 px-4 py-3 bg-white border-b border-gray-200">


                    <Link href={"/"} className={cn(buttonVariants(), "bg-gray-200 text-black text-sm font-mono")} >
                        <X />
                        Cancel
                    </Link>

                    <Button disabled={isPending} type='submit' className='bg-emerald-500 text-white text-sm font-mono'>
                        {isPending ? <>
                            <Loader2 className='size-4 animate-spin' />
                            <SaveIcon />
                            Save
                        </> : <>
                            <SaveIcon />
                            Save
                        </>}
                    </Button>

                </div>

                <div className="p-6">
                    <div className="bg-white">

                        <div className="bg-blue-600 text-white font-mono p-2.5">
                            <p>Diploma Information</p>
                        </div>
                        <div className="p-4 space-y-3">


                            <div className="flex items-center gap-4">
                                <Controller
                                    name="title"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel className="font-mono">
                                                Title
                                            </FieldLabel>
                                            <Input
                                                className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"
                                                type="text"
                                                placeholder="Title"
                                                {...field}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    className="text-red-500"
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="diplomaId"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel className="font-mono">
                                                Diploma
                                            </FieldLabel>

                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select diploma" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        {diplomas?.map((diploma: any) => (
                                                            <SelectItem
                                                                key={diploma.id}
                                                                value={diploma.id}
                                                            >
                                                                {diploma.title}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            {fieldState.invalid && (
                                                <FieldError
                                                    className="text-red-500"
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />


                            </div>

                            <div className="flex items-center gap-4">

                                <UploadImageField url={initialData?.image || undefined} isEdit={true} />
                                <Controller
                                    name="description"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel className="font-mono">
                                                Description
                                            </FieldLabel>
                                            <Textarea
                                                className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"

                                                placeholder="Description"
                                                {...field}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    className="text-red-500"
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            <Controller
                                name="duration"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel className="font-mono">
                                            Duration
                                        </FieldLabel>
                                        <Input
                                            className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"
                                            type="number"
                                            min={1}
                                            placeholder="Duration"
                                            value={field.value ?? ""}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                className="text-red-500"
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />


                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}

export default FormExam