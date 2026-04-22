"use client"
import { Field, FieldError, FieldLabel } from "@/src/shared/components/ui/field"
import { Input } from "@/src/shared/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { ProfileFormType, profileSchema } from "../schema/profile-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetAccount } from "../hooks/use-account"
import { Loader } from "lucide-react"
import { useEffect } from "react"

const UpdateForm = () => {

    const { data, isLoading } = useGetAccount()

  



    const form = useForm<ProfileFormType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: ""

        }
    })

    
    useEffect(() => {
        if (data) {
            form.reset({
                firstName: data.firstName,
                lastName: data.lastName,
                email : data.email
            })
        }
    }, [data, form])
    
    if (isLoading) {
      return <p>loading...</p>
  }
    return (
        <form>
            <div className="grid grid-cols-2">
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">Email</FieldLabel>
                            <Input
                                className="rounded-sm px-4 py-6 border border-[#E5E7EB] rounded-0 font-mono"
                                type="email"
                                placeholder="user@example.com"
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
        </form>
    )
}

export default UpdateForm