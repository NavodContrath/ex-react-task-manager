import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="container ">
                <h1 className="text-center mt-3">Task Manager</h1>

                <div className="d-flex justify-content-center mt-5">
                    <div className="col-8">
                        <div
                            className="h-100 p-5 text-black bg-light border rounded-3"
                        >
                            <h2>Crea la tua lista di Task!</h2>
                            <p>
                                Crea ed organizza facilmente  liste per ogni tua esigenza!
                            </p>
                            <Link
                                className="btn btn-outline-primary"
                                type="button"
                                to={"/add-task"}
                            >
                                Inizia Subito!
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}