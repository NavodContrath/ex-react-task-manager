import { createContext, useContext, useState, useEffect, useMemo } from "react";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([])
    const url = import.meta.env.VITE_API_URL
    useEffect(() => {
        async function getTask() {
            try {
                const res = await fetch(`${url}/tasks`)
                const data = await res.json()
                setTasks(data)

            } catch (error) {
                console.error(error)
            }
        }
        getTask()
    }, [])
    const value = useMemo(() => ({ tasks }), [tasks]);
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