"use client"
import { Button } from '@/src/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/src/shared/components/ui/field'
import { Input } from '@/src/shared/components/ui/input'
import { DiamondIcon, Loader2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { resetPasswordSchema, ResetPasswordType } from '../schema/profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPassword } from '../hooks/use-account';
import { toast } from 'sonner';


const ResetPassword = () => {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const { mutate, isPending } = useResetPassword()

    const form = useForm<ResetPasswordType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            currentPassword: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values: ResetPasswordType) => {
        console.log(values)
        mutate({ newPassword: values.newPassword, confirmPassword: values.confirmPassword, currentPassword: values.currentPassword }, {
            onSuccess: () => {
                toast.success("Done Reset Password")
                setError("")
                form.reset({
                    newPassword: "",
                    currentPassword: "",
                    confirmPassword: ""
                })
            },
            onError(error) {
                toast.error(error.message || "Failed to reset password")
                setError(error.message || "Failed to reset password")
            },
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Password */}
            <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className="font-mono">
                            Current Password
                        </FieldLabel>

                        <div className="relative">
                            <Input
                                className="rounded-sm px-4 py-6 pr-10 border border-[#E5E7EB] font-mono"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...field}
                            />

                            {/* Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showCurrentPassword ? "🙈" : "👁"}
                            </button>
                        </div>

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
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className="font-mono">
                            New Password
                        </FieldLabel>

                        <div className="relative">
                            <Input
                                className="rounded-sm px-4 py-6 pr-10 border border-[#E5E7EB] font-mono"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...field}
                            />

                            {/* Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showCurrentPassword ? "🙈" : "👁"}
                            </button>
                        </div>

                        {fieldState.invalid && (
                            <FieldError
                                className="text-red-500"
                                errors={[fieldState.error]}
                            />
                        )}
                    </Field>
                )}
            />

            {/* Confirm Password */}
            <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className="font-mono">
                            Confirm New Password
                        </FieldLabel>

                        <div className="relative">
                            <Input
                                className="rounded-sm px-4 py-6 pr-10 border border-[#E5E7EB] font-mono"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                {...field}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showConfirmPassword ? "🙈" : "👁"}
                            </button>
                        </div>

                        {fieldState.invalid && (
                            <FieldError
                                className="text-red-500"
                                errors={[fieldState.error]}
                            />
                        )}
                    </Field>
                )}
            />


            {/* Error */}
            <div className='bg-red-200'>
                {error}
            </div>
            {/* Submit */}
            <Button
                type="submit"
                className="w-full bg-[#2563EB] text-white font-mono py-5 mt-5"
                disabled={isPending}
            >
                {isPending ? <>
                    <Loader2Icon className='animate-spin' />
                    "Update Password..."
                </> : "update password"}

            </Button>
        </form>
    )
}

export default ResetPassword