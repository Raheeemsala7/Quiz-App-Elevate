import { getOneAuditLogApi } from '@/src/features/audit-log/apis/audit-log.api'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }>  }) => {

    const { id } = await params

    const data = await getOneAuditLogApi(id)

    if (!data.status) {
        return <p>Error</p>
    }

    const auditLog = data.payload.auditLog



  return (
    <div>
        <div className="bg-white"></div>
    </div>
  )
}

export default page