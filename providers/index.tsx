import { Toaster } from "sonner"
import ReactQueryProvider from "./components/react-query-provider"


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactQueryProvider>
            <Toaster />            
            {children}
        </ReactQueryProvider>
    )
}