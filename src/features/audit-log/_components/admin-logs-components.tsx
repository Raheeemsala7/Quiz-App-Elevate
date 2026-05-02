"use client"
import React from 'react'
import { PaginationLogs } from './pagination-logs'
import { useGetAuditLogs } from '../hooks/audit.hook'
import { SearchFilters } from './search-filter'
import AdminLogsTable from './admin-log-table'

const AdminLogsComponents = () => {

    const { data, isLoading, } = useGetAuditLogs()

    console.log(data)

    const logsData = data?.data
    const logsMeta = data?.metadata


    return (
        <div>
            <PaginationLogs currentPage={logsMeta?.page || 1} limit={logsMeta?.limit || 12} totalItems={logsMeta?.total || 12} totalPages={logsMeta?.totalPages || 1} />
            <div className="p-6">
                <SearchFilters />

                <AdminLogsTable logs={logsData} />

            </div>
        </div>
    )
}

export default AdminLogsComponents