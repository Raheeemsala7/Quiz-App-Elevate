"use client"
import { Stepper, StepperIndicator, StepperItem, StepperNav, StepperSeparator, StepperTrigger } from '@/src/shared/components/reui/stepper';
import { Button } from '@/src/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/src/shared/components/ui/dialog'
import { DiamondIcon, PencilLine, TriangleAlertIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { emailRequestSchema, EmailRequestType } from '../schema/profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';


const steps = [
    { step: 1, label: "Request", icon: DiamondIcon },
    { step: 2, label: "Confirm", icon: DiamondIcon },

];


const ModelChangeEmail = () => {
    const [step, setStep] = useState(1)

    const formRequest = useForm<EmailRequestType>({
        resolver: zodResolver(emailRequestSchema),
        defaultValues: {
            email: ""
        }

    })

    const onSubmitRequest = (values : EmailRequestType) => {

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='text-blue-600 cursor-pointer flex gap-1 items-center'>
                    <PencilLine className='size-4' />
                    <span className='text-sm'>change</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl flex justify-center items-center flex-col p-9">

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

                {step === 1 ?
                    <div>
                        <h6 className='text-3xl font-bold'>Change Email</h6>

                    </div> :

                    <div>

                    </div>

                }

                <DialogFooter className='w-full flex !justify-center items-center'>
                    <DialogClose className='flex-1' asChild>
                        <Button className='bg-gray-200  font-mono !px-4 !py-2.5 !h-auto' variant="outline">Cancel</Button>
                    </DialogClose>
                    {/* <Button onClick={handelRemoveAccount} disabled={isPending} className='flex-1 font-mono !px-4 !py-2.5 !h-auto bg-red-600' type="submit">
                        {isPending ? <>
                        <Loader2Icon className=' animate-spin' />
                        Yes, delete
                        </> : "Yes, delete"} */}
                    {/* </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModelChangeEmail