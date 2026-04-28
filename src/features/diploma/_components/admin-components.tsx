"use client"
import React from 'react'
import { useDiplomasAdmin } from '../hooks/hooks'
import { PaginationDiplomas } from './pagination-diolomas'
import { SearchFilters } from './search-filter'
import DiplomaTable from './diploma-table'

const AdminComponents = () => {

    const { data, isLoading, } = useDiplomasAdmin()

    const diplomasData = data?.data
    const diplomasMeta = data?.metadata



    return (
        <>
            <PaginationDiplomas currentPage={diplomasMeta?.page || 1} limit={diplomasMeta?.limit || 12} totalItems={diplomasMeta?.total || 12} totalPages={diplomasMeta?.totalPages || 1} />
            <div className='p-6'>
                <SearchFilters />
                <DiplomaTable diplomas={diplomasData || []} />
            </div>
        </>
    )
}

export default AdminComponents