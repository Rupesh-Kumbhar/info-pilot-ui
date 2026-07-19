function UploadPage() {
    return (
        <>
            <h2>Upload Documents</h2>

            <div className="card mt-3">
                <div className="card-body">
                    <input
                        type="file"
                        className="form-control"
                    />

                    <button
                        className="btn btn-primary mt-3"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </>
    );
}

export default UploadPage;
