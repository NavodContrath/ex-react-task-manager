import { NavLink } from "react-router-dom"
export default function Header() {
    return (
        <>

            <div className="nav-bar bg-primary shadow">
                <div className="container d-flex justify-content-between align-items-center p-3">
                    <NavLink className="home-logo text-white text-decoration-none h1" to={'/'}><i className="bi bi-list-ul">Task</i></NavLink>
                    <ul className="d-flex list-unstyled gap-3">
                        <li ><NavLink className="text-white text-decoration-none h6" to={'/task-list'}>La tua lista</NavLink></li>
                        <li><NavLink className="text-white text-decoration-none h6" to={'/add-task'}>Aggiungi task</NavLink></li>
                    </ul>
                </div>

            </div>

        </>
    )
}