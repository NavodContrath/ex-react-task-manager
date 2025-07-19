import { useState, useEffect } from "react"

function useTasks() {
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
                return true

            } else {
                throw new Error(savedTask.message)
            }
        } catch (err) {
            alert(`Errore: ${err.message}`)
            return false


        }
    }
    async function removeTask(taskID) {
        try {
            const res = await fetch(`${url}/tasks/${taskID}`, {
                method: "DELETE"
            })
            const deleteTask = await res.json()
            if (deleteTask.success) {
                setTasks(curr => curr.filter(task => task.id !== taskID))
            } else {
                throw new Error(deleteTask.message)
            }
        } catch (error) {
            alert(`Errore: ${err.message}`)
        }
    }
    async function updateTask(updatedTask, id) {
        try {
            const res = await fetch(`${url}/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            })
            const data = await res.json()

            if (data.success) {
                setTasks(curr => curr.map(task => task.id === id ? data.task : task))
                alert("Task modificata con successo!")

            } else {
                throw new Error(data.message)
            }
        } catch (err) {
            alert(`Errore: ${err.message}`)


        }
    }

    return { tasks, addTask, removeTask, updateTask }
}

export default useTasks
