import { useState, useRef, useReducer } from "react"
import useTasks, { taskReducer } from "../hooks/useTasks"
import { useGlobal } from "../context/GlobalContext"

export default function AddTask() {
    //variables use for the reducer
    const { tasks } = useGlobal()
    const [task, dispatchTask] = useReducer(taskReducer, tasks)
    const { url } = useTasks()
    //controlled input
    const [name, setName] = useState("")
    //ref inputs
    const statusRef = useRef()
    const descriptionRef = useRef()
    //error handler variables
    const [errors, setErrors] = useState("")
    const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~"


    function validateName(value) {
        if (!value.trim()) return "Non puoi lasciare il campo vuoto "
        for (let char of value) {
            if (symbols.includes(char)) {
                return "Il nome della task contiene simboli non consentiti";
            }
        }
        return ""
    }

    function handleChange(e) {
        const value = e.target.value;
        setName(value);
        const err = validateName(value);
        setErrors(err);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (errors) return

        const newTask = {
            title: name,
            status: statusRef.current.value,
            description: descriptionRef.current.value
        }

        try {
            const res = await fetch(`${url}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            })
            const savedTask = await res.json()
            if (savedTask.success) {
                dispatchTask({ type: "ADD_TASK", payload: savedTask.task });
                alert("Task creata con successo!");

                // reseting the form
                setName("");
                statusRef.current.value = "To do";
                descriptionRef.current.value = "";

            } else {
                throw new Error(savedTask.message);
            }
        }
        catch (err) {
            alert("Errore nel salvataggio:", err)
        }
    }



    return (
        <>
            <div className="container mt-5">
                <form className="row g-3"
                    onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="col-6">
                        <label className="form-label">Nome Task</label>
                        <input
                            type="text"
                            className="form-control"
                            id="task-name"

                            value={name}
                            onChange={(e) => { handleChange(e) }} />
                        {errors && <div className="text-danger">{errors}</div>}
                    </div>
                    <div className="col-6">
                        <label className="form-label">Stato della Task</label>
                        <select
                            className="form-select"
                            id="task-status"
                            ref={statusRef}
                            required>
                            <option>To do</option>
                            <option>Doing</option>
                            <option>Done</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="form-label">Descrizione della Task</label>
                        <textarea
                            className="form-control"
                            id="task-description"
                            ref={descriptionRef}
                            required />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" disabled={!!errors}>Aggiungi Task</button>
                    </div>
                </form>

            </div>

        </>
    )
}