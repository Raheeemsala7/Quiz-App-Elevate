


export const EXAMS_KEYS = {
    list: (page: number, limit: number, diplomaId: string) => ["exams", page, limit, diplomaId]
}
export const EXAMS_KEYS_ADMIN = {
    list: (page: number, limit: number, diplomaId: string,
        search: string,
        sortBy: string,
        sortOrder: string,
    ) => ["admin-exams", page, limit, diplomaId , search , sortBy , sortOrder]
}