import { useState, useRef } from "react"
import useTasks from "../hooks/useTasks"

export default function AddTask() {
    //custom hook useTasks
    const { tasks, addTask } = useTasks()
    //controlled input
    const [name, setName] = useState("")
    //uncrontolled inputs
    const statusRef = useRef()
    const descriptionRef = useRef()
    //error handling variables
    const [errors, setErrors] = useState("")
    const symbols = "!@#$%^&*()-_=+[]{}|:',.<>?/`~"

    function validateName(value) {
        if (!value.trim()) return "Non puoi lasciare il campo vuoto"
        for (let char of value) {
            if (symbols.includes(char)) {
                return "Il nome della task contiene simboli non consentiti"
            }
        }
        return ""
    }

    function handleChange(e) {
        const value = e.target.value
        setName(value)
        setErrors(validateName(value))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (errors) return

        const newTask = {
            title: name,
            status: statusRef.current.value,
            description: descriptionRef.current.value,
        }

        const success = await addTask(newTask)

        if (success) {
            setName("")
            statusRef.current.value = "To do"
            descriptionRef.current.value = ""
            setErrors("")
        }
    }

    return (
        <div className="container mt-5">
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-6">
                    <label className="form-label">Nome Task</label>
                    <input
                        type="text"
                        className="form-control"
                        id="task-name"
                        value={name}
                        onChange={handleChange}
                    />
                    {errors && <div className="text-danger">{errors}</div>}
                </div>
                <div className="col-6">
                    <label className="form-label">Stato della Task</label>
                    <select className="form-select" id="task-status" ref={statusRef} required>
                        <option>To do</option>
                        <option>Doing</option>
                        <option>Done</option>
                    </select>
                </div>
                <div className="col-6">
                    <label className="form-label">Descrizione della Task</label>
                    <textarea className="form-control" id="task-description" ref={descriptionRef} required />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit" disabled={!!errors}>
                        Aggiungi Task
                    </button>
                </div>
            </form>
        </div>
    )
}
