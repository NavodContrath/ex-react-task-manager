import { useEffect, useState, useRef } from "react"
import Modal from "./Modal"

export default function EditTaskModal({ show, onClose, task, onSave }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("To do")
    const [errors, setErrors] = useState("")
    const editFormRef = useRef()
    const symbols = "!@#$%^&*()-_=+[]{}|:',.<>?/`~"

    useEffect(() => {
        if (task && show) {
            setTitle(task.title)
            setDescription(task.description)
            setStatus(task.status)
        }
    }, [task, show])


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
        setTitle(value)
        setErrors(validateName(value))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (errors) return

        const updatedTask = {
            ...task,
            title,
            description,
            status,
        }

        onSave(updatedTask)
    }
    const form = (
        <form ref={editFormRef} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nome Task</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
                {errors && <div className="text-danger">{errors}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Descrizione</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Stato</label>
                <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>To do</option>
                    <option>Doing</option>
                    <option>Done</option>
                </select>
            </div>
        </form>
    )
    return (
        <Modal
            show={show}
            title="Modifica Task"
            onClose={onClose}
            confirmText="Salva"
            content={form}
            onConfirm={() => {
                if (editFormRef.current) {
                    editFormRef.current.requestSubmit()
                    onClose()
                }
            }}
        />


    )
}
