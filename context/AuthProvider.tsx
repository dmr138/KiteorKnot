import { supabase } from '@/utils/supabase'
import { Session, User } from '@supabase/supabase-js'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'

type AuthProps = { //specifying the type of object AuthProps will be/what it will contain.
    user : User | null //either User type (from the supabase library) or null iv not logged in 
    session : Session | null //either Session type (from the supabase library) or null if not logged in 
    initialized?: boolean //to help with flickering, if this component isnt finished initializing our root layout will wait until initialization is true before determing which route to take (auth or tabs)
    signOut?: () => void // takes no arguments and returns nothing. see below
    // ? marks make them optional 
}
//a placeholder for the AuthContext we'll obtain later
export const AuthContext = createContext<Partial<AuthProps>>({}) //we need partial because we need to create the AuthCOntext object but dont have any props to put in intially 

//custom hook to make the context values accesible to other components
export function useAuth() { //no in other components we can call useAuth to get current user data from the AuthContext
    return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }: PropsWithChildren) => { //so we can wrap thing in AuthProvider, what we wrap will be the children
    const [user, setUser] = useState<User | null>()
    const [session, setSession] = useState<Session | null>(null) //State variables that will trigger the component to re-render
    const [initialized, setInitialized] = useState<boolean>(false)

    useEffect(() => {
        //listen for changes in authentication state
        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session)
            setUser(session ? session.user : null)
            setInitialized(true)
        })
        return () => {
            data.subscription.unsubscribe()
        }
    }, [])

    //logout function
    const signOut = async () => {
        await supabase.auth.signOut()
    }

    const value = {
        user,
        session,
        initialized,
        signOut,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}