import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadImageSchema, UploadImageType } from '../lib/schema/image.schema'
import { useUploadImage } from '../hooks/use-upload-image'
import { Progress } from './ui/progress'
import { toast } from 'sonner'
import { CreateDiplomaType } from '@/src/features/diploma/schema/diploma.schema'
import { CloudUpload, CloudUploadIcon, Download, FileImage, Trash, Trash2 } from 'lucide-react'

interface IProps {
    url?: string;
    isEdit?: boolean
}

const UploadImageField = ({ isEdit, url }: IProps) => {

    const { isPending, mutate, uploadProgress } = useUploadImage()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [uploadedImage, setUploadedImage] = useState<{
        name: string
        size: number
    } | null>(null)


    const diplomaForm = useFormContext<CreateDiplomaType>()
    const {
        formState: { errors }
    } = diplomaForm

    const form = useForm<UploadImageType>({
        resolver: zodResolver(uploadImageSchema),
        mode: "onChange"
    })


    useEffect(() => {
        if (isEdit && url) {
            setPreview(url)
            setUploadedImage({
                name: "uploaded-image",
                size: 0
            })
        }
    }, [])


    useEffect(() => {
        const unsubscribe = form.subscribe({
            formState: {
                values: true,
                isValid: true
            },
            callback: ({ values, isValid }) => {

                if (isValid) {
                    mutate.mutate(values, {
                        onError: (error) => {
                            form.setError("image", { message: error.message })
                        },
                        onSuccess: (data) => {
                            toast.success("uploaded image successfully")
                            console.log(data.url)
                            diplomaForm.setValue("image", data.url)

                            // LOCAL PREVIEW
                            const url = URL.createObjectURL(values.image)
                            setPreview(url)
                            setUploadedImage({
                                name: form.getValues("image")?.name || "image",
                                size: form.getValues("image")?.size || 0
                            })
                        }
                    })

                }


            }
        })

        return () => unsubscribe()
    })


    return (
        <Controller
            name="image"
            control={form.control}
            render={({ field: { value: _value, onChange, ...field }, fieldState }) => (
                <Field>
                    <FieldLabel className="font-mono">
                        Image
                    </FieldLabel>
                    <div>
                        {uploadedImage && preview ? (
                            <div className="p-1.5 flex items-center gap-2 bg-gray-50 border border-gray-200 cursor-pointer">

                                {/* IMAGE PREVIEW */}
                                <img
                                    src={preview || ""}
                                    alt="uploaded"
                                    className="w-21.5 h-21.5 object-cover"
                                />

                                {/* INFO */}
                                <div className="text-sm font-mono flex-1">
                                    <p className='text-gray-600'> {uploadedImage.name}</p>
                                </div>

                                <div className="flex gap-2 p-2.5">

                                    <p className="text-gray-400 border-r border-gray-200 px-3">{(uploadedImage.size / 1024).toFixed(2)} KB</p>

                                    <div className='flex gap-1.5 items-center'>
                                        {/* DOWNLOAD */}
                                        <a
                                            href={preview}
                                            download
                                            className=" text-blue-500 text-sm "
                                        >
                                            <Download />
                                        </a>

                                        {/* REMOVE */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUploadedImage(null)
                                                diplomaForm.setValue("image", "")
                                                form.reset()
                                            }}
                                            className=" text-red-500  text-sm "
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>


                                </div>
                            </div>
                        ) : (
                            <div className="h-22 p-6 border border-gray-200 flex justify-center items-center relative" onClick={() => inputRef.current?.click()}>
                                <span className='absolute left-6 top-6'>
                                    <FileImage className='size-10 text-gray-200' />
                                </span>
                                <p className='text-xs flex items-center gap-1 text-gray-600 font-mono'><CloudUploadIcon /> Drop an image here or <span className='text-blue-600'>select from your computer</span></p>
                                <Input
                                    className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono hidden"
                                    type="file"
                                    placeholder="Description"
                                    onChange={(e) => onChange(e.target.files?.[0])}
                                    {...field}
                                    ref={inputRef}
                                />
                            </div>
                        )}


                    </div>
                    {isPending && <Progress value={uploadProgress} />}
                    {fieldState.invalid && (
                        <FieldError
                            className="text-red-500"
                            errors={[fieldState.error]}
                        />
                    )}
                    {errors.image && (
                        <FieldError
                            className="text-red-500"
                            errors={[errors.image]}
                        />
                    )}
                </Field>
            )}
        />
    )
}

export default UploadImageField