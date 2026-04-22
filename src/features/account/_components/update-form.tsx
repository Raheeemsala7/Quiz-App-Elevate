"use client"
import { Field, FieldError, FieldLabel } from "@/src/shared/components/ui/field"
import { Input } from "@/src/shared/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { ProfileFormType, profileSchema } from "../schema/profile-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetAccount } from "../hooks/use-account"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import CountryPhoneSelector from "@/src/app/auth/register/_components/country-phone-selector"
import ModelDeleteAccount from "./model-delete-account"

const UpdateForm = () => {

    const { data, isLoading } = useGetAccount()





    const form = useForm<ProfileFormType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            

        }
    })


    useEffect(() => {
        if (data) {
            form.reset({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                phone:data.phone,
            })
        }
    }, [data, form])

    console.log(data)

    if (isLoading) {
        return <p>loading...</p>
    }
    return (
        <form className="space-y-4">
            <div className="grid grid-cols-2 gap-2.5">
                <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">First Name</FieldLabel>
                            <Input
                                className="rounded-sm px-4 py-6 border border-[#E5E7EB] rounded-0 font-mono"
                                type="text"
                                placeholder="Mohammed"
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
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">Last Name</FieldLabel>
                            <Input
                                className="rounded-sm px-4 py-6 border border-[#E5E7EB] rounded-0 font-mono"
                                type="text"
                                placeholder="Ahmed"
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
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className="font-mono">Username</FieldLabel>
                        <Input
                            className="rounded-sm px-4 py-6 border border-[#E5E7EB] rounded-0 font-mono"
                            type="text"
                            placeholder="Ahmed"
                            disabled
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

            <Field>
                <FieldLabel className="font-mono">Phone  <span className="text-red-500">*</span></FieldLabel>
                <Controller
                    name="countryCode"
                    control={form.control}
                    render={({ field: countryField, fieldState: countryState }) => (
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field: phoneField, fieldState: phoneState }) => (
                                <>
                                    <CountryPhoneSelector
                                        selectedCountryCode={countryField.value}
                                        onCountryChange={countryField.onChange}
                                        phoneValue={phoneField.value}
                                        onPhoneChange={phoneField.onChange}
                                        phoneRef={phoneField.ref}
                                        phoneError={phoneState.error}
                                        countryError={countryState.error}
                                    />
                                    {(phoneState.invalid || countryState.invalid) && (
                                        <FieldError
                                            className="text-red-500"
                                            errors={[phoneState.error, countryState.error]}
                                        />
                                    )}
                                </>
                            )}
                        />
                    )}
                />
            </Field>

            <div className="flex gap-4 items-center">
                <ModelDeleteAccount />
            </div>

        </form>
    )
}

export default UpdateForm