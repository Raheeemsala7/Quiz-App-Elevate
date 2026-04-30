"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { createDiplomaSchema, CreateDiplomaType } from '../schema/diploma.schema'
import { Field, FieldError, FieldLabel } from '@/src/shared/components/ui/field'
import { Input } from '@/src/shared/components/ui/input'
import { cn } from '@/src/shared/lib/utils'
import { Button, buttonVariants } from '@/src/shared/components/ui/button'
import Link from 'next/link'
import { Loader2, SaveIcon, X } from 'lucide-react'
import UploadImageField from '@/src/shared/components/upload-image-field'
import { useCreateDiploma } from '../hooks/hooks'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/src/shared/components/ui/textarea'

const FormDiploma = () => {

    const { mutate, isPending } = useCreateDiploma()
    const form = useForm<CreateDiplomaType>({
        resolver: zodResolver(createDiplomaSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
        }
    })

    const router = useRouter()

    const onSubmit = (values: CreateDiplomaType) => {
        
        mutate(values , {
            onSuccess() {
                toast.success("done create diploma")
                router.push("/")
            },
            onError(error) {
                toast.error(error.message || "something error")
            },
        })
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
                        {isPending ?<>
                        <Loader2 className='size-4 animate-spin' />
                        <SaveIcon />
                        Save
                        </> :  <>
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
                            <UploadImageField />

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
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}

export default FormDiploma