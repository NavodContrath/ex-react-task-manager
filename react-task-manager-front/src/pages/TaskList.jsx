import { useMemo, useState } from "react";
import TaskRow from "../components/TaskRow";
import { useGlobal } from "../context/GlobalContext";

export default function TaskList() {
    const { tasks } = useGlobal()
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)
    function handleSort(column) {
        if (sortBy === column) {
            setSortOrder(prev => -prev)
        } else {
            setSortBy(column)
            setSortOrder(1)
        }
    }

    const sortedTasks = useMemo(() => {
        //object to order the status with numerical values
        const statusOrder = {
            "To do": 0,
            "Doing": 1,
            "Done": 2
        }

        return [...tasks].sort((a, b) => {
            let result = 0
            if (sortBy === "title") {
                result = a.title.localeCompare(b.title)
            } else if (sortBy === "status") {
                result = statusOrder[a.status] - statusOrder[b.status]
            } else if (sortBy === "createdAt") {
                result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            }
            return result * sortOrder
        })
    }, [tasks, sortBy, sortOrder])

    return (
        <>
            <div className="container">
                <div className="costum-row d-flex text-center mt-5">
                    <div className="col-4 border fw-bold t-intestazione"
                        onClick={() => handleSort("title")}>
                        Nome &#8645;
                    </div>
                    <div className="col-4 border fw-bold t-intestazione"
                        onClick={() => handleSort("status")}>
                        Stato &#8645;
                    </div>
                    <div className="col-4 border fw-bold t-intestazione"
                        onClick={() => handleSort("createdAt")}>
                        Data &#8645;
                    </div>
                </div>
                <TaskRow
                    tasks={sortedTasks} />

            </div>
        </>
    )
}