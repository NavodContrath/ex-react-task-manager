import { useParams } from "react-router-dom"
import { useGlobal } from "../context/GlobalContext"

export default function TaskDetails() {

    const { id } = useParams()
    const { tasks } = useGlobal()

    const task = tasks.find(task => task.id.toString() === id)

    if (!task) return <div>Task non trovata.</div>

    return (
        <div className="container">
            <div className="mt-4">
                <h2>Dettaglio Task</h2>
                <p><strong>Nome:</strong> {task.title}</p>
                <p><strong>Descrizione:</strong> {task.description}</p>
                <p><strong>Stato:</strong> {task.status}</p>
                <p><strong>Data di creazione:</strong> {task.createdAt}</p>
                <button
                    className="btn btn-danger mt-2"
                    onClick={() => console.log("Elimino task")}
                >
                    Elimina Task
                </button>
            </div>
        </div>
    )
}