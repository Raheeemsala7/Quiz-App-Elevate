import { getDiplomasApi } from '@/lib/features/diplomas/api'
import { GraduationCap } from 'lucide-react'
import React from 'react'

const userPage = () => {

  getDiplomasApi()
  return (
    <main className="w-full">
      <div className="bg-blue-600 flex items-center gap-4 p-4  w-full">
        <GraduationCap className='text-white size-6' />
        <h4 className='text-xl text-white font-bold'>Diplomas</h4>
      </div>
    </main>
  )
}

export default userPage