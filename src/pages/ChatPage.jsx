import { useState, useRef, useEffect } from "react";
import chatService from "../services/chatService";
import ReactMarkdown from "react-markdown";
import "./ChatPage.scss";

function ChatPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleAsk = async () => {
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
      const response = await chatService.askQuestion(userQuestion);

      const aiAnswer = response.data.answer;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiAnswer,
        },
      ]);
    } catch (error) {
      console.error("FULL ERROR", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Failed to get response from AI.",
        },
      ]);
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

  return (
    <div>
      <h2 className="mb-4">Enterprise AI Assistant</h2>

      <div className="card shadow">
        <div
          className="card-body"
          style={{
            minHeight: "550px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              marginBottom: "20px",
            }}
          >
            {messages.length === 0 && (
              <div className="text-center text-muted mt-5">
                <h5>👋 Welcome to Info Pilot</h5>

                <p>Upload a PDF and Ask questions about it.</p>
              </div>
            )}

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
                  className={
                    message.role === "user"
                      ? "bg-primary text-white p-3 rounded shadow"
                      : "bg-light p-3 rounded shadow border"
                  }
                  style={{
                    maxWidth: "75%",
                  }}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="d-flex justify-content-start mb-3">
                <div className="bg-light p-3 rounded shadow border">
                  🤖 Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Ask a question about your uploaded documents..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">
                Press Enter to send • Shift + Enter for new line
              </small>

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
  );
}

export default ChatPage;
