import { useState, useEffect } from "react"

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
    }, [url])

    async function addTask(newTask) {
        try {
            const res = await fetch(`${url}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            })
            const savedTask = await res.json()

            if (savedTask.success) {
                setTasks(curr => [...curr, savedTask.task])
                alert("Task creata con successo!")

            } else {
                throw new Error(savedTask.message)
            }
        } catch (err) {
            alert(`Errore: ${err.message}`)

        }
    }

    return { tasks, addTask }
}

export default useTasks
