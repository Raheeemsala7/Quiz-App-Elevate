
import DiplomasList from '@/src/features/diploma/_components/diplomas-list'
import {  LucideGraduationCap } from 'lucide-react'

const userPage =  () => {



  return (
    <main className="w-full">
      <div className="bg-blue-600 flex items-center gap-3 p-4  w-full">
        <LucideGraduationCap className='text-white size-12' />
        <h4 className='text-3xl text-white font-semibold'>Diplomas</h4>
      </div>

      <DiplomasList />
    </main>
  )
}

export default userPage