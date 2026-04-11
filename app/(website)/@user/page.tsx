import { getDiplomasApi } from '@/lib/features/diplomas/api'
import {  LucideGraduationCap } from 'lucide-react'

const userPage = async () => {

  const data = await getDiplomasApi()
  console.log(data)
  
  return (
    <main className="w-full">
      <div className="bg-blue-600 flex items-center gap-3 p-4  w-full">
        <LucideGraduationCap className='text-white size-12' />
        <h4 className='text-3xl text-white font-semibold'>Diplomas</h4>
      </div>
    </main>
  )
}

export default userPage