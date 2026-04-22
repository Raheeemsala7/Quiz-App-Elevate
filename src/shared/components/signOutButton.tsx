"use client"
import { DropdownMenuItem } from './ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
    return (
        <DropdownMenuItem className='p-4 text-red-600' onClick={() => signOut({callbackUrl :"/auth/login"})}>
            <LogOutIcon />
            Log out
        </DropdownMenuItem>
    )
}

export default SignOutButton