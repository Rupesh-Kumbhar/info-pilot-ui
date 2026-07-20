function UploadPage() {
    return (
        <div>

            <h2>
                Upload Documents
            </h2>

            <div className="card shadow mt-4">

                <div className="card-body">

                    <label
                        className="form-label"
                    >
                        Select PDF
                    </label>

                    <input
                        type="file"
                        className="form-control"
                    />

                    <button
                        className="btn btn-primary mt-3"
                    >
                        Upload Document
                    </button>

                </div>

            </div>

        </div>
    );
}

export default UploadPage;