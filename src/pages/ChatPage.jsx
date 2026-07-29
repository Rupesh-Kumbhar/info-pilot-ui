import { useState } from "react";
import chatService from "../services/chatService";

function ChatPage() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) {
      return;
    }

    try {

      setLoading(true);
      const response = await chatService.askQuestion(question);
      setAnswer(response.data.answer);

    } catch (error) {

    console.error("FULL ERROR", error);

    console.log(
        error.response?.data
    );

    setAnswer(
        JSON.stringify(
            error.response?.data || error.message
        )
    );
}   finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">AI Assistant</h2>

      <div className="card shadow">
        <div className="card-body">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            className="btn btn-primary mt-3"
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>

      {answer && (
        <div className="card shadow mt-4">
          <div className="card-body">
            <h5>Answer</h5>

            <p>{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;