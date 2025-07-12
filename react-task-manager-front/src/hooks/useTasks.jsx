import { useState, useEffect, useMemo } from "react";

export function taskReducer(state, action) {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload]
            break
        case "REMOVE_TASK":
            return state
            break
        case "UPDATE_TASK":
            return state
            break
        default:
            return state

    }
}


function useTasks(defaultValue = []) {
    const [tasks, setTasks] = useState(defaultValue)
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


    return { value, url }

}

export default useTasks