function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark shadow">
      <div className="container-fluid">

        <button
          className="navbar-toggler d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <span className="navbar-brand fw-bold">
          Enterprise Knowledge Assistant
        </span>

      </div>
    </nav>
  );
}

export default Navbar;