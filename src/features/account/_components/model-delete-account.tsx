import { Button } from '@/src/shared/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/src/shared/components/ui/dialog'
import {  TriangleAlertIcon } from 'lucide-react'
import { useRemoveAccount } from '../hooks/use-account'
import { toast } from 'sonner'

const ModelDeleteAccount = () => {
    const {mutate , isPending} = useRemoveAccount()

    const handelRemoveAccount = () => {
        try {
            mutate()
            toast.success("Done Remove Account")
        } catch (error) {
            toast.error("done Remove Account")
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl flex justify-center items-center flex-col">

                <div className="size-27.5 bg-red-50 rounded-full flex justify-center items-center">
                    <div className="size-20 bg-red-100 rounded-full flex justify-center items-center" >
                        <TriangleAlertIcon className='size-12.5 text-red-600' />
                    </div>
                </div>

                <h6 className='text-red-600 text-lg font-mono font-medium'>Are you sure you want to delete your account?</h6>
                <p className='text-gray-500 text-sm font-mono'>This action is permanent and cannot be undone.</p>


                <DialogFooter className='w-full flex !justify-center items-center'>
                    <DialogClose className='flex-1' asChild>
                        <Button className='bg-gray-200  font-mono !px-4 !py-2.5 !h-auto' variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handelRemoveAccount} className='flex-1 font-mono !px-4 !py-2.5 !h-auto bg-red-600' type="submit">Yes, delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModelDeleteAccount