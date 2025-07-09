import { createContext, useContext, useState, useEffect } from "react";

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
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        getTask()
    }, [])
    return (
        <GlobalContext.Provider value={{ tasks }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobal() {
    const context = useContext(GlobalContext)
    return context
}

export { GlobalProvider, useGlobal }