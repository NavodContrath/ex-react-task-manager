import { createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const { tasks, removeTask, addTask } = useTasks([])
    return (
        <GlobalContext.Provider value={{ tasks, removeTask, addTask }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}

export { GlobalProvider, useGlobal }