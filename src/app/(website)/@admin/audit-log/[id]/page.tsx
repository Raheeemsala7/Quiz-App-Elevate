import { getOneAuditLogApi } from '@/src/features/audit-log/apis/audit-log.api'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const data = await getOneAuditLogApi(id)

    if (!data.status) {
        return <p>Error</p>
    }

    const auditLog = data.payload.auditLog


    console.log(auditLog)
    console.log(auditLog.entityType)

    const handleLink = () => {
        switch (auditLog.entityType) {
            case "diploma":
                return `/${auditLog.entityId}`;

            case "exam":
                return `/exams/${auditLog.entityId}`;

            default:
                return "";
        }
    };

    function formatDateTime(isoString: string) {
        const date = new Date(isoString);

        const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });

        const fullDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

        return `${time} | ${fullDate}`;
    }

    return (
        <>
            <div className="bg-white p-6">
                <p className='text-lg text-black mb-2 font-semibold'>
                    {auditLog.category} {auditLog.httpMethod} By {auditLog.actorUsername}
                </p>
                <div>
                    <p> Entity : </p>
                    <Link className='text-gray-400 underline' href={handleLink()}>{auditLog.entityType} [{auditLog.entityId}] <ExternalLink className='text-gray-400' /></Link>
                </div>
            </div>

            <div className='p-6'>
                <div className="bg-white p-4 space-y-4">
                    <div>
                        <p className='text-gray-400 mb-1 font-mono'>Action</p>
                        <p className='font-mono'>{auditLog.action}</p>
                    </div>
                    <div>
                        <p className='text-gray-400 mb-1 font-mono'>Method</p>
                        <p className='font-mono'>{auditLog.httpMethod}</p>
                    </div>
                    <div>
                        <p className='text-gray-400 mb-1 font-mono'>User</p>
                        <p className='font-mono text-sm'>{auditLog.actorUsername}</p>
                        <p className='font-mono text-sm text-gray-500'>Email : {auditLog.actorEmail}</p>
                        <p className='font-mono text-sm text-gray-500'>IP Address : {auditLog.ipAddress}</p>
                        <p className='font-mono text-sm text-gray-500'>Role : {auditLog.actorRole}</p>
                    </div>
                    <div>
                        <p className='text-gray-400 mb-1 font-mono'>Entity</p>
                        <Link className=' underline' href={handleLink()}>{auditLog.entityType} [{auditLog.entityId}]</Link>
                    </div>
                    <div>
                        <p className='text-gray-400 mb-1 font-mono'>Date</p>
                        <p className='font-mono'>{formatDateTime(auditLog.createdAt)}</p>
                    </div>
                    {auditLog.metadata.keys && (
                        <div>
                            <p className='text-gray-400 mb-1 font-mono'>Updated Fields</p>
                            <p className='font-mono'>{auditLog.metadata.keys.join(', ')}</p>
                        </div>

                    )}
                    {auditLog.metadata.keys && (
                        <div>
                            <p className='text-gray-400 mb-1 font-mono'>Metadata</p>
                            <div className='bg-gray-200 p-2.5'>
                                {auditLog.metadata.keys.map((key : string) => (
                                    <p key={key} className='font-mono'>{key}</p>
                                ))}
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </>
    )
}

export default page