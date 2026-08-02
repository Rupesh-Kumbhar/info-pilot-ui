import { useState, useRef, useEffect } from "react";
import chatService from "../services/chatService";
import historyService from "../services/historyService";
import documentService from "../services/documentService";
import ReactMarkdown from "react-markdown";
import "./ChatPage.scss";

function ChatPage() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to Info Pilot.\n\nUpload documents and ask questions about them.",
    },
  ]);

  const [history, setHistory] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadHistory();
    loadDocuments();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadDocuments = async () => {
    try {
      const response = await documentService.getDocuments();

      setDocuments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await historyService.getHistory();

      setHistory(response.data);
    } catch (error) {
      console.error("Failed to load history", error);
    }
  };

  const loadConversation = (chat) => {
    setSelectedHistoryId(chat.id);

    setMessages([
      {
        role: "user",
        content: chat.question,
      },
      {
        role: "assistant",
        content: chat.answer,
        source: chat.sourceDocument,
        askedAt: chat.askedAt,
      },
    ]);
  };

  const handleAsk = async () => {
    if (!selectedDocument) {
      alert("Please select a document first.");

      return;
    }

    if (!question.trim() || loading) {
      return;
    }

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await chatService.askQuestion(
        userQuestion,
        selectedDocument,
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          source: response.data.sourceDocument,
        },
      ]);

      loadHistory();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "❌ Failed to get response from AI.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAsk();
    }
  };

  const clearChat = () => {
    setSelectedHistoryId(null);

    setMessages([
      {
        role: "assistant",
        content:
          "👋 Welcome to Info Pilot.\n\nUpload documents and ask questions about them.",
      },
    ]);
  };

  return (
    <div className="row">
      {/* HISTORY SIDEBAR */}

      <div className="col-md-3 mb-3">
        <div className="card shadow rounded h-100">
          <div className="card-header bg-light">
            <strong>📚 Chat History</strong>
          </div>

          <div
            className="card-body"
            style={{
              maxHeight: "75vh",
              overflowY: "auto",
            }}
          >
            {history.length === 0 && (
              <p className="text-muted">No conversations yet</p>
            )}

            {history.map((chat) => (
              <div
                key={chat.id}
                className={`border rounded p-2 mb-2 history-item ${
                  selectedHistoryId === chat.id ? "bg-primary text-white" : ""
                }`}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => loadConversation(chat)}
              >
                <div className="fw-semibold">
                  {chat.question?.length > 40
                    ? chat.question.substring(0, 40) + "..."
                    : chat.question}
                </div>

                <small
                  className={
                    selectedHistoryId === chat.id ? "text-white" : "text-muted"
                  }
                >
                  📄 {chat.sourceDocument}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHAT WINDOW */}

      <div className="col-md-9">
        <div className="mb-4">
          <h2>🤖 Info Pilot</h2>

          <p className="text-muted mb-0">Enterprise Knowledge Assistant</p>
        </div>

        <div className="card shadow rounded">
          <div
            className="card-body"
            style={{
              height: "75vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* CHAT AREA */}

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                marginBottom: "20px",
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.role === "user"
                      ? "d-flex justify-content-end mb-3"
                      : "d-flex justify-content-start mb-3"
                  }
                >
                  <div
                    className={`chat-bubble ${
                      message.role === "user"
                        ? "bg-primary text-white p-3 rounded shadow"
                        : "bg-white p-3 rounded shadow"
                    }`}
                    style={{
                      maxWidth: "75%",
                    }}
                  >
                    <div className="d-flex align-items-start gap-2">
                      <div
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        {message.role === "user" ? "🧑" : "🤖"}
                      </div>

                      <div className="chat-message">
                        <ReactMarkdown>{message.content}</ReactMarkdown>

                        {message.source && (
                          <div className="mt-2">
                            <small className="text-muted">
                              📄 Source: {message.source}
                            </small>
                          </div>
                        )}

                        {message.askedAt && (
                          <div className="mt-1">
                            <small className="text-muted">
                              🕒 {message.askedAt}
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="bg-white p-3 rounded shadow border">
                    <div className="d-flex align-items-center">
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Thinking...
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT AREA */}

            <div>
              <select
                className="form-select mb-3"
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
              >
                <option value="">📄 Select Document</option>

                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.fileName}
                  </option>
                ))}
              </select>

              <textarea
                className="form-control rounded"
                rows="3"
                placeholder={`Examples:
• What is the total amount?
• What is the application number?
• Summarize this document`}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  Press Enter to send • Shift + Enter for new line
                </small>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={clearChat}
                  >
                    Clear Chat
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={handleAsk}
                    disabled={loading}
                  >
                    {loading ? "Thinking..." : "🚀 Ask AI"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
