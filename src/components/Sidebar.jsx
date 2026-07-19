import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="bg-light vh-100 border-end p-3">
            <h5>Menu</h5>

            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/upload">
                        Upload
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/chat">
                        Chat
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/documents">
                        Documents
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;