


export const DIPLOMA_KEYS = {
    list : (page: number, limit: number) =>  ["diplomas", page, limit]
}
export const DIPLOMA_KEYS_ADMIN = {
    list : (page: number, limit: number ,search : string, sortBy : string, sortOrder : string) =>  ["diplomas-admin", page, limit , search, sortBy, sortOrder]
}