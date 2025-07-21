import { useMemo, useState, useCallback, useRef } from "react"
import TaskRow from "../components/TaskRow"
import { useGlobal } from "../context/GlobalContext"

export default function TaskList() {
    const { tasks } = useGlobal()

    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)
    const inputRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState("")

    const handleInput = useCallback(() => {
        let timeout
        return (e) => {
            clearTimeout(timeout)
            const value = e.target.value
            timeout = setTimeout(() => {
                setSearchQuery(value)
            }, 300)
        }
    }, [])()

    function handleSort(column) {
        if (sortBy === column) {
            setSortOrder((prev) => -prev)
        } else {
            setSortBy(column)
            setSortOrder(1)
        }
    }

    const sortedTasks = useMemo(() => {
        const statusOrder = {
            "To do": 0,
            "Doing": 1,
            "Done": 2,
        }

        return [...tasks]
            .filter((task) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
                let result = 0
                if (sortBy === "title") {
                    result = a.title.localeCompare(b.title)
                } else if (sortBy === "status") {
                    result = statusOrder[a.status] - statusOrder[b.status]
                } else if (sortBy === "createdAt") {
                    result = new Date(a.createdAt) - new Date(b.createdAt)
                }
                return result * sortOrder
            })
    }, [tasks, searchQuery, sortBy, sortOrder])

    return (
        <div className="container">
            <input
                type="text"
                className="form-control my-3"
                placeholder="Cerca per nome..."
                ref={inputRef}
                onInput={handleInput}
            />

            <div className="costum-row d-flex text-center mt-5">
                <div
                    className="col-4 border fw-bold t-intestazione"
                    onClick={() => handleSort("title")}
                >
                    Nome &#8645;
                </div>
                <div
                    className="col-4 border fw-bold t-intestazione"
                    onClick={() => handleSort("status")}
                >
                    Stato &#8645;
                </div>
                <div
                    className="col-4 border fw-bold t-intestazione"
                    onClick={() => handleSort("createdAt")}
                >
                    Data &#8645;
                </div>
            </div>

            <TaskRow tasks={sortedTasks} />
        </div>
    )
}
