import TaskRow from "../components/TaskRow";

export default function TaskList() {
    return (
        <>
            <div className="container">
                <div className="costum-row d-flex text-center mt-5">
                    <div className="col-4 border fw-bold">Nome</div>
                    <div className="col-4 border fw-bold">Stato</div>
                    <div className="col-4 border fw-bold">Data</div>
                </div>
                <TaskRow />

            </div>
        </>
    )
}