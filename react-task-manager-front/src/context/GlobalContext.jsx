import { createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const { tasks, removeTask } = useTasks([])
    return (
        <GlobalContext.Provider value={{ tasks, removeTask }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}

export { GlobalProvider, useGlobal }