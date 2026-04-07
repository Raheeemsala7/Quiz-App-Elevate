"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createPasswordSchema,
    CreatePasswordType,
    RegistrationFormStep1Type,
    RegistrationFormStep3Type,
    registrationStep1Schema,
    registrationStep3Schema,
} from "@/lib/zodSchema";
import { ChevronRight, DiamondIcon, Loader2 } from "lucide-react";
import { register, sendEmailVerification, verifyCodeEmail } from "@/features/auth/hooks";
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperNav,
    StepperSeparator,
    StepperTrigger,
} from "@/components/reui/stepper";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import CountryPhoneSelector from "./_components/country-phone-selector";
import Step4PasswordForm from "./_components/Step4PasswordForm";


const steps = [
    { step: 1, label: "Account", icon: DiamondIcon },
    { step: 2, label: "Email", icon: DiamondIcon },
    { step: 3, label: "Security", icon: DiamondIcon },
    { step: 4, label: "Finish", icon: DiamondIcon },
];

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
 
    const [userInfo, setUserInfo] = useState<RegistrationFormStep3Type>({
        firstName: "",
        lastName: "",
        username: "",
        countryCode: "EG",
        phone: "",
        email: "",
    });

    const { mutateAsync, isPending } = sendEmailVerification();
    const { mutateAsync: verifyCodeEmailAsync, isPending: verifyCodeEmailIsPending, data: verifyCodeEmailData } = verifyCodeEmail();

    const form = useForm<RegistrationFormStep1Type>({
        resolver: zodResolver(registrationStep1Schema),
        defaultValues: {
            email: "",
        },
    });
    const formStep3 = useForm<RegistrationFormStep3Type>({
        resolver: zodResolver(registrationStep3Schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            countryCode: "EG",
            phone: "",
        },
    });



    async function onSubmit(data: RegistrationFormStep1Type) {
        console.log(data);
        await mutateAsync(data.email);
        setEmail(data.email);
        setStep(2);
    }

    async function onVerifyCodeSubmit({ code }: { code: string }) {

        await verifyCodeEmailAsync({ email, code });
        toast.success(verifyCodeEmailData?.message || "Verification code verified");
        setStep(3);

    }

    async function onRegisterFormStep3(data: RegistrationFormStep3Type) {
        console.log(data);
        setUserInfo({
            ...data,
            email
        });
        setStep(4);
    }




    return (
        <>
            {step === 1 ? (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <h4 className="text-3xl font-bold mb-4">Create Account</h4>

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

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full bg-[#EFF6FF] text-center font-mono text-[#1F2937] py-5"
                        variant={"secondary"}
                    >
                        {isPending ? (
                            <>
                                Sending verification email...{" "}
                                <Loader2 className="size-4 animate-spin " />
                            </>
                        ) : (
                            <>
                                Next <ChevronRight className="size-4" />
                            </>
                        )}
                    </Button>

                    <div className="flex gap-1 justify-center">
                        <span>Already have an account? </span>
                        <Link
                            href={"/auth/login"}
                            className="text-sm text-gray-400 hover:text-[#1F2937] hover:underline transition-all text-center block"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            ) :

                step > 1 && (
                    <div>
                        <Stepper defaultValue={step} className="w-full max-w-2xl mx-auto">
                            <StepperNav>
                                {steps.map(({ step: s, label, icon: Icon }) => (
                                    <StepperItem key={s} step={s} >
                                        <StepperTrigger>
                                            <StepperIndicator
                                                className={`group !bg-transparent
                                                    transition-all duration-200 size-6
                                                    data-[state=active]:!bg-blue-100 data-[state=active]:shadow-[0px_0px_3px_6px_#DBEAFE]
                                                `}
                                            >
                                                <div>
                                                    <Icon className="bg-transparent group-data-[state=completed]:!stroke-blue-600 group-data-[state=active]:!stroke-blue-600 group-data-[state=completed]:!fill-blue-600 group-data-[state=active]:!fill-blue-600 group-data-[state=inactive]:!stroke-blue-600" size={25} />
                                                </div>
                                            </StepperIndicator>
                                        </StepperTrigger>

                                        {/* Line */}
                                        {s !== steps.length && (
                                            <StepperSeparator className="border-b-2 border-dashed border-blue-600 group-data-[state=completed]/step:border-solid" />
                                        )}
                                    </StepperItem>
                                ))}
                            </StepperNav>


                        </Stepper>

                        {step === 2 ? (
                            <div>


                                <h4 className="text-3xl font-bold my-6">Create Account</h4>

                                <h6 className="text-blue-600">Verify OTP</h6>

                                <p>Please enter the 6-digits code we have sent to:</p>
                                <div >
                                    user@example.com <span onClick={() => setStep(1)} className="text-blue-600 cursor-pointer underline"> Edit</span>
                                </div>

                                <div className="flex justify-center mt-5">
                                    <InputOTP maxLength={6} className="mx-auto font-mono"
                                        onComplete={(data) => {
                                            console.log(data)
                                            onVerifyCodeSubmit({ code: data });
                                        }}
                                    >
                                        <InputOTPGroup >
                                            <InputOTPSlot className="!font-mono" index={0} />
                                            <InputOTPSlot className="!font-mono" index={1} />
                                            <InputOTPSlot className="!font-mono" index={2} />
                                            <InputOTPSlot className="!font-mono" index={3} />
                                            <InputOTPSlot className="!font-mono" index={4} />
                                            <InputOTPSlot className="!font-mono" index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>


                                <button disabled={verifyCodeEmailIsPending} className="w-full mt-4 hover:bg-[#EFF6FF] text-center font-mono text-[#1F2937] py-2" type="submit">
                                    {verifyCodeEmailIsPending ? 'Verifying...' : 'Verify'}
                                </button>

                            </div>

                        ) : step === 3 ? (
                            <div>
                                <h4 className="text-3xl font-bold my-4">Create Account</h4>

                                <h4 className="text-[#155DFC] text-2xl mb-8 font-bold">Tell us more about you</h4>
                                <form onSubmit={formStep3.handleSubmit(onRegisterFormStep3)} className="space-y-4">
                                    {/* First Name + Last Name — side by side */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <Controller
                                            name="firstName"
                                            control={formStep3.control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel className="font-mono">
                                                        First name <span className="text-red-500">*</span>
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
                                            name="lastName"
                                            control={formStep3.control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel className="font-mono">
                                                        Last name  <span className="text-red-500">*</span>
                                                    </FieldLabel>
                                                    <Input
                                                        className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"
                                                        type="text"
                                                        placeholder="Abdullah"
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

                                    {/* Username */}
                                    <Controller
                                        name="username"
                                        control={formStep3.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel className="font-mono">
                                                    Username  <span className="text-red-500">*</span>
                                                </FieldLabel>
                                                <Input
                                                    className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"
                                                    type="text"
                                                    placeholder="user123"
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

                                    {/* Phone with Country Selector */}
                                    <Field>
                                        <FieldLabel className="font-mono">Phone  <span className="text-red-500">*</span></FieldLabel>
                                        <Controller
                                            name="countryCode"
                                            control={formStep3.control}
                                            render={({ field: countryField, fieldState: countryState }) => (
                                                <Controller
                                                    name="phone"
                                                    control={formStep3.control}
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

                                    {/* Submit */}
                                    <Button
                                        disabled={isPending}
                                        type="submit"
                                        className="w-full bg-[#EFF6FF] text-center font-mono text-[#1F2937] py-5"
                                        variant="secondary"
                                    >
                                        {isPending ? (
                                            <>
                                                Saving your info…{" "}
                                                <Loader2 className="size-4 animate-spin ml-1" />
                                            </>
                                        ) : (
                                            <>
                                                Next <ChevronRight className="size-4 ml-1" />
                                            </>
                                        )}
                                    </Button>

                                </form>
                            </div>
                        ) : step === 4 ? (
                            <Step4PasswordForm
                                userInfo={userInfo}
                            />
                        ) : "ff"

                        }
                    </div>

                )





            }

            {/* Form */}
        </>
    );
};

export default RegisterPage;
