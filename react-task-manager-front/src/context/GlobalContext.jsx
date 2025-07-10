import { createContext, useContext, useState, useEffect, useMemo } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const { value } = useTasks([])
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}

export { GlobalProvider, useGlobal }