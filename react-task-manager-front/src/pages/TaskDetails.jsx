import { useNavigate, useParams } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext"
import { useState } from "react"
import Modal from "../components/Modal"

export default function TaskDetails() {

    const { id } = useParams()
    const { tasks, removeTask } = useGlobal()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const task = tasks.find(task => task.id.toString() === id)

    async function handleDelete() {
        try {
            await removeTask(task.id)
            alert("Task eliminata con successo")
            navigate("/task-list")
            setShow(false)

        } catch (err) {
            alert("Errore: " + err.message)
        }
    }

    if (!task) return <div>Task non trovata.</div>

    return (
        <div className="container">
            <Modal
                show={show}
                title={"Eliminazione Task"}
                content={<p>stai cercando di eliminare la task {task.title}</p>}
                onClose={() => { setShow(false) }}
                onConfirm={handleDelete}
                confirmText={"Conferma"}
            />
            <div className="mt-4">
                <h2>Dettaglio Task</h2>
                <p><strong>Nome:</strong> {task.title}</p>
                <p><strong>Descrizione:</strong> {task.description}</p>
                <p><strong>Stato:</strong> {task.status}</p>
                <p><strong>Data di creazione:</strong> {task.createdAt}</p>
                <button
                    className="btn btn-danger mt-2"
                    onClick={() => { setShow(true) }}
                >
                    Elimina Task
                </button>
            </div>
        </div>
    )
}