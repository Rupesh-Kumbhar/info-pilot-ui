import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function SidebarContent() {

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "nav-link active fw-bold text-primary"
            : "nav-link";

    return (
        <>
            <h5 className="mb-4">Navigation</h5>

            <NavLink
                to="/"
                className={navLinkClass}
                data-bs-dismiss="offcanvas"
            >
                🏠 Dashboard
            </NavLink>

            <NavLink
                to="/upload"
                className={navLinkClass}
                data-bs-dismiss="offcanvas"
            >
                📁 Upload Documents
            </NavLink>

            <NavLink
                to="/chat"
                className={navLinkClass}
                data-bs-dismiss="offcanvas"
            >
                🤖 AI Assistant
            </NavLink>
        </>
    );
}

function Sidebar() {
    return (
        <>
            {/* Desktop Sidebar */}
            <div
                className="bg-light border-end d-none d-md-block p-3"
                style={{ minHeight: "100vh" }}
            >
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="sidebarMenu"
            >
                <div className="offcanvas-header">
                    <h5>Menu</h5>

                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    ></button>
                </div>

                <div className="offcanvas-body">
                    <SidebarContent />
                </div>
            </div>
        </>
    );
}

export default Sidebar;