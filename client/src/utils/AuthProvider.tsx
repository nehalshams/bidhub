import { createContext } from "react"

const defaultContext = {
    isAuthenticated: false,
}
export const AuthContext = createContext(defaultContext)

export default function AuthProvider({ children }: any){
    const token = localStorage.getItem('token')
    const isAuthenticated = !!token
    const value = {
        isAuthenticated,
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

