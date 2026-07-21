import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="text-center mt-5">

            <h1 className="display-1">
                404
            </h1>

            <h3>
                Page Not Found
            </h3>

            <p>
                The page you are looking for does not exist.
            </p>

            <Link
                to="/"
                className="btn btn-primary"
            >
                Go To Dashboard
            </Link>

        </div>
    );
}

export default NotFoundPage;
