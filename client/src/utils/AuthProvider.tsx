import { createContext, useState } from "react"

const defaultContext = {
    isAuthenticated: false,
    handleSignInModal: () => {},
    signInModal: false
}
export const AuthContext = createContext(defaultContext)

export default function AuthProvider({ children }: any){
    const [signInModal, setSignInModal] = useState(false)
    const token = localStorage.getItem('token')
    const isAuthenticated = !!token;

    function handleSignInModal(){
        setSignInModal(!signInModal)
    }
    const value = {
        isAuthenticated,
        handleSignInModal,
        signInModal,
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

