import { GraduationCap } from 'lucide-react'
import React from 'react'

const userPage = () => {
  return (
    <main>
      <div className="bg-blue-600 flex items-center gap-4 p-4 rounded-sm">
        <GraduationCap className='text-white size-6' />
        <h4>Diplomas</h4>
      </div>
    </main>
  )
}

export default userPage