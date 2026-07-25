import { useState } from "react";
import documentService from "../services/documentService";

function UploadPage() {

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const handleFileChange = (event) => {

        setSelectedFile(
            event.target.files[0]
        );
    };

    const handleUpload = async () => {

        if (!selectedFile) {

            setMessage(
                "Please select a file."
            );

            return;
        }

        const formData = new FormData();

        formData.append(
            "file",
            selectedFile
        );

        try {

            const response =
                await documentService
                    .uploadDocument(
                        formData
                    );

            setMessage(
                `✅ Uploaded : ${response.data.fileName}`
            );

        } catch (error) {

            setMessage(
                "❌ Upload Failed"
            );

            console.error(error);
        }
    };

    return (
        <div>

            <h2>
                Upload Documents
            </h2>

            <div className="card shadow mt-4">

                <div className="card-body">

                    <input
                        type="file"
                        className="form-control"
                        onChange={
                            handleFileChange
                        }
                    />

                    <button
                        className="btn btn-primary mt-3"
                        onClick={
                            handleUpload
                        }
                    >
                        Upload
                    </button>

                    {
                        message &&
                        <p className="mt-3">
                            {message}
                        </p>
                    }

                </div>

            </div>

        </div>
    );
}

export default UploadPage;