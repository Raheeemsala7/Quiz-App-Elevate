import { Toaster } from "sonner"
import ReactQueryProvider from "./components/react-query-provider"
import NextAuthProvider from "./components/next-auth-provider"


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactQueryProvider>
            <NextAuthProvider>
                <Toaster richColors position="top-right" />
                {children}
            </NextAuthProvider>
        </ReactQueryProvider>
    )
}