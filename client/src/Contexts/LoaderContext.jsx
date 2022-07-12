import { createContext, useState } from "react";

import React from 'react'
export const ContextLoader = createContext()
function LoaderContext({ children }) {
  const [isLoading, setLoading] = useState(false)
  return (
    <ContextLoader.Provider value={{isLoading, setLoading }}>
      {children}
    </ContextLoader.Provider>
  )
}

export default LoaderContext
