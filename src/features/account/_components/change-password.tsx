import { Field, FieldError, FieldLabel } from '@/src/shared/components/ui/field'
import { Input } from '@/src/shared/components/ui/input'
import { DiamondIcon } from 'lucide-react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'


const ChangePassword = () => {


    const form = useForm()

    const onSubmit = () => {

    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Password */}
            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className="font-mono">
                            Password <span className="text-red-500">*</span>
                        </FieldLabel>

                        <div className="relative">
                            <Input
                                className="rounded-sm px-4 py-6 pr-10 border border-[#E5E7EB] font-mono"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...field}
                            />

                            {/* Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? "🙈" : "👁"}
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
                            Confirm Password <span className="text-red-500">*</span>
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


            {/* Submit */}
            <Button
                type="submit"
                className="w-full bg-[#2563EB] text-white font-mono py-5 mt-5"
            // disabled={registerIsPending}
            >
                {/* {registerIsPending ? "Registering..." : "Create Account"} */}
                Create Account
            </Button>
        </form>
    )
}

export default ChangePassword