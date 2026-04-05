"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegistrationFormType, registrationSchema } from "@/lib/zodSchema"




const RegisterPage = () => {


    const form = useForm<RegistrationFormType>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            name:"",
            email: "",
            password: ""
        },
    })


    function onSubmit(data: RegistrationFormType) {
        console.log(data)
    }
    return (
        <>

            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold  mb-2">تسجيل حساب جديد</h1>
                <p className="text-muted-foreground text-sm">ادخل تفاصيلك لتسجيل حساب جديد</p>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>الاسم</FieldLabel>
                            <Input className="rounded-sm" type="text" {...field} />
                            {fieldState.invalid && <FieldError className="text-red-500" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>الايميل</FieldLabel>
                            <Input className="rounded-sm" type="email" {...field} />
                            {fieldState.invalid && <FieldError className="text-red-500" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>كلمة المرور</FieldLabel>
                            <Input className="rounded-sm" type="password" {...field} />
                            {fieldState.invalid && <FieldError className="text-red-500" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Button type="submit" className="w-full quiz-gradient" variant={"destructive"}>
                    Submit
                </Button>

                <Link href={"/auth/register"} className="text-sm text-gray-400 hover:text-white hover:underline transition-all text-center block">
                    هل لديك حساب ؟ تسجيل الدخول
                </Link>
            </form>
        </>
    )
}

export default RegisterPage