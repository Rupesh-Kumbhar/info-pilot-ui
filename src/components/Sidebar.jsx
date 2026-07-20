import { NavLink } from "react-router-dom";

function SidebarContent() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link active fw-bold text-primary"
      : "nav-link";

  return (
    <>
      <h5 className="mb-4">Navigation</h5>

      <NavLink className={navLinkClass} to="/">
        🏠 Dashboard
      </NavLink>

      <NavLink className={navLinkClass} to="/upload">
        📁 Upload Documents
      </NavLink>

      <NavLink className={navLinkClass} to="/chat">
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
            classdddddd dddName="btn-close"
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