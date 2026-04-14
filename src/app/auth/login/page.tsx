"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SignInFormType, signInSchema } from '@/src/features/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const page = () => {

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormType) => {
    console.log(data)

    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect : false
    })
    
    if (!res?.ok) {
      toast.error(res?.error || "Login failed")
      return
    }

    toast.success("Login successful")
    window.location.href = "/"
  }

  return (
    <div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="font-mono">
                Username
              </FieldLabel>
              <Input
                className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"
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
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="font-mono">
                Password
              </FieldLabel>
              <Input
                className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"
                type="password"
                placeholder="*********"
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
        <Button type="submit">Login</Button>
      </form>

    </div>
  )
}

export default page