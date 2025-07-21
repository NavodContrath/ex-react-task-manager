import { Link } from "react-router-dom"
import React from "react"
function TaskRow({ tasks }) {

    return (
        <>
            {
                tasks.map(task => {
                    let status = ""
                    const date = new Date(task.createdAt).toLocaleDateString("it-IT")
                    const hour = new Date(task.createdAt).toLocaleTimeString("it-IT")
                    if (task.status === "To do") status = "bg-danger text-white"
                    else if (task.status === "Doing") status = "bg-warning"
                    else if (task.status === "Done") status = "bg-success text-white"
                    return (
                        <div className="costum-row d-flex" key={task.id}>
                            <Link className="col-4 border ps-2  text-decoration-none" to={`/task/${task.id}`}>{task.title}</Link>
                            <div className={`col-4 border ps-2 ${status}`}>{task.status}</div>
                            <div className="col-4 border ps-2">{`${date} ${hour}`}</div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default React.memo(TaskRow)