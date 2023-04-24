import { useState, useEffect, useCallback, createContext } from 'react'

let logoutTimer

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null
})

//@ts-ignore
const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
  }
}


//@ts-ignore
export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  if (localData) {
    initialToken = localData.token
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(null)


  const logout = () => {}
//@ts-ignore
  const login = (tkn, expTime, useId) => {
    setToken(tkn)
    setUserId(useId)

    localStorage.setItem('token', tkn)
    localStorage.setItem('userId', useId)
    localStorage.setItem('expirationTime', expTime)

    const remainingTime = calculateRemainingTime(expTime)

    logoutTimer = setTimeout(() => {logout()}, remainingTime)
  }

  const contextValue = {
    token,
    login,
    logout, 
    userId
  }

  return (
    //@ts-ignore
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
