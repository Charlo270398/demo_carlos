import { useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import UserContext from "../context/UserContext";


export default function useUser () {
    const {jwt, setJWT, username, setUsername } = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const logout = useCallback(() => {
        setLoading({loading: true})
        window.sessionStorage.removeItem('jwt')
        setJWT(null)
        localStorage.clear()
        setLoading({loading: false})
    }, [setJWT])
    
    const setJWTSession = useCallback(({jwt}) => {
      setLoading({loading: true})
      window.sessionStorage.setItem('jwt', jwt)
      setJWT(jwt)
      setLoading({loading: false})
    }, [setJWT])

    return {
      jwt,
      setJWT,
      username, 
      setJWTSession,
      logout,
      isLogged: Boolean(jwt)
    }
}