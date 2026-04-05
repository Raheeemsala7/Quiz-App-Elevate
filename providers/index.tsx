import ReactQueryProvider from "./components/react-query-provider"


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
    )
}