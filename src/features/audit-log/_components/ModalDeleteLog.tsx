"use client"
import { Button } from '@/src/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/src/shared/components/ui/dialog'
import { Loader2Icon, Trash2, TriangleAlertIcon } from 'lucide-react'
import { toast } from 'sonner'
// import {  useDeleteExam } from '../hooks/hooks'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ModelDeleteLog = ({ id }: { id: string }) => {
    // const { mutate, isPending } = useDeleteLog()
    const isPending = false

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()


    const handelRemoveAccount = () => {
        // mutate(id, {
        //     onSuccess: (data) => {
        //         toast.success(data.message || "Diploma deleted successfully")
        //         setIsOpen(false)
        //         router.push(`/audit-log`)
        //     },
        //     onError: (error) => {
        //         toast.error(error.message || "Failed to delete Diploma")
        //     }
        // })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className='font-mono p-4 gap-2.5' variant={"destructive"}>
                    <Trash2 />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl flex justify-center items-center flex-col">

                <div className="size-27.5 bg-red-50 rounded-full flex justify-center items-center">
                    <div className="size-20 bg-red-100 rounded-full flex justify-center items-center" >
                        <TriangleAlertIcon className='size-12.5 text-red-600' />
                    </div>
                </div>

                <h6 className='text-red-600 text-lg font-mono font-medium'>Are you sure you want to delete your Exam?</h6>
                <p className='text-gray-500 text-sm font-mono'>This action is permanent and cannot be undone.</p>


                <DialogFooter className='w-full flex !justify-center items-center'>
                    <DialogClose className='flex-1' asChild>
                        <Button className='bg-gray-200  font-mono !px-4 !py-2.5 !h-auto' variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handelRemoveAccount} disabled={isPending} className='flex-1 font-mono !px-4 !py-2.5 !h-auto bg-red-600' type="submit">
                        {isPending ? <>
                            <Loader2Icon className=' animate-spin' />
                            Yes, delete
                        </> : "Yes, delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModelDeleteLog