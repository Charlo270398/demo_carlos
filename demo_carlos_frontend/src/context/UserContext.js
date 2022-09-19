import React, {useState} from 'react'
import { useEffect } from 'react'

const UserContext = React.createContext({})

export function UserContextProvider ({children}) {
  const [username, setUsername] = useState('')
  const [jwt, setJWT] = useState(
    () => window.sessionStorage.getItem('jwt')
  )

  useEffect(() => {
    if (!jwt) return setUsername('')
    setUsername(jwt.username)
  }, [jwt])

  return <UserContext.Provider value={{
    username,
    jwt,
    setUsername,
    setJWT
  }}>
    {children}
  </UserContext.Provider>
}

export default UserContext