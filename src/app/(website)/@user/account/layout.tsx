import { BookOpenCheck, ChevronLeft, CircleUser, Lock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Link href={"/"} className="py-4 px-1 border border-blue-600">
          <ChevronLeft className="text-blue-600 size-6" />
        </Link>
        <div className="flex gap-3 items-center bg-blue-600 flex-1 px-3 py-3">
          <BookOpenCheck className="size-10 text-white" />
          <h6 className="text-3xl font-semibold text-white"> Account Settings</h6>
        </div>
      </div>
      <div className='grid grid-cols-[282px_1fr] gap-6 flex-1'>
        <nav className='bg-white p-6 shadow-current'>
          <ul className='space-y-2'>
            <Link href={"/account"} className='flex px-4 py-2.5 gap-2.5 group  hover:bg-blue-100 border border-transparent hover:border-blue-600 transition-all'>
              <CircleUser className='size-6 text-gray-500 group-hover:text-blue-600 transition-colors' />
              <span className='text-gray-500 group-hover:text-blue-600 font-mono text-base transition-colors'>Profile</span>
            </Link>
            <Link href={"/account/change-password"} className='flex px-4 py-2.5 gap-2.5 group  hover:bg-blue-100 border border-transparent hover:border-blue-600 transition-all'>
              <Lock className='size-6 text-gray-500 group-hover:text-blue-600 transition-colors' />
              <span className='text-gray-500 group-hover:text-blue-600 font-mono text-base transition-colors'>Change Password</span>
            </Link>
          </ul>
        </nav>

        <div className='bg-white p-6'>
          {children}
        </div>

      </div>
    </>
  )
}

export default layout