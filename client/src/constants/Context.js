import { createContext, useState } from "react";

export const Contexts = createContext()

function Context({children}) {
    const [userStatus,setUserStatus] = useState('')
  return (
   <Contexts.Provider value={{userStatus,setUserStatus}}>
    {children}
   </Contexts.Provider>
  )
}

export default Context
