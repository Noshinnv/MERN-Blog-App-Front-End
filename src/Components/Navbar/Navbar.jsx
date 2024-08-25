import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const Navigate = useNavigate();
    const toHome = () => {
        Navigate("/")
    }
    const toAddblog = () => {
        Navigate("/addBlog")
    }
    const toMyBlogs = () => {
        Navigate("/myBlogs")
    }
    const logout = () => {
        localStorage.removeItem("token")
        Navigate("/login")
    }
    return <>
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                padding: '0.25rem 1rem',
            }}
        >
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#" onClick={toHome} style={{ color: 'white' }}>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={toMyBlogs} style={{ color: 'white' }}>
                                My Blogs
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={toAddblog} style={{ color: 'white' }}>
                                New Blog
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={logout} style={{ color: 'white' }}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </>
}
export default Navbar;