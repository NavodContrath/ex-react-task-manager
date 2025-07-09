import { NavLink } from "react-router-dom"
export default function Header() {
    return (
        <>

            <div className="nav-bar bg-primary">
                <div className="container d-flex justify-content-between p-3">
                    <NavLink className="home-logo text-black text-decoration-none" to={'/'}>HOME</NavLink>
                    <ul className="d-flex list-unstyled gap-3">
                        <li ><NavLink className="text-black text-decoration-none" to={'/task-list'}>TaskList</NavLink></li>
                        <li><NavLink className="text-black text-decoration-none" to={'/add-task'}>AddTask</NavLink></li>
                    </ul>
                </div>

            </div>

        </>
    )
}