import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function MainLayout() {
    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3 col-lg-2 p-0">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-9 col-lg-10 p-4">
                        <Outlet />
                    </div>

                </div>
            </div>
        </>
    );
}

export default MainLayout;