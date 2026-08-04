import { useEffect, useState } from "react";

import documentService from "../services/documentService";

import DocumentList from "../components/DocumentList/DocumentList";

import chatService from "../services/chatService";

function HomePage() {
  const [documents, setDocuments] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [latestDocument, setLatestDocument] = useState("");

  const [lastQuestion, setLastQuestion] = useState("");

  const loadDocuments = async () => {
    try {
      const response = await documentService.getDocuments();

      setDocuments(response.data);
      if (response.data.length > 0) {
        setLatestDocument(response.data[response.data.length - 1].fileName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadLastQuestion = async () => {
    try {
      const response = await chatService.getLastQuestion();

      setLastQuestion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
      loadDocuments();
      loadQuestionCount();
      loadLastQuestion();
  }, []);

  const handleDelete = (document) => {
    setSelectedDocument(document);

    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await documentService.deleteDocument(selectedDocument.id);

      loadDocuments();
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteModal(false);

      setSelectedDocument(null);
    }
  };

  const loadQuestionCount = async () => {
    try {
      const response = await chatService.getQuestionCount();

      setQuestionCount(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Documents</h5>

              <h2>{documents.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Questions</h5>

              <h2>{questionCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>AI Status</h5>

              <h2>✅ Active</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h5>Latest Uploaded Document</h5>

              <p className="mb-0">{latestDocument || "No documents"}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h5>Last Question</h5>

              <p className="mb-0">{lastQuestion}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4 shadow">
        <div className="card-body">
          <h5>Uploaded Documents</h5>

          <DocumentList documents={documents} onDelete={handleDelete} />
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="modal fade show "
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">⚠️ Delete Document</h5>
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete:</p>

                <strong>{selectedDocument?.fileName}</strong>

                <p className="text-danger mt-3">
                  This action cannot be undone.
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;