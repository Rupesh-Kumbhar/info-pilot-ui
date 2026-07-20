function ChatPage() {
    return (
        <div>

            <h2>
                AI Assistant
            </h2>

            <div className="card shadow mt-4">

                <div className="card-body">

                    <textarea
                        rows="4"
                        className="form-control"
                        placeholder="Ask a question from uploaded documents..."
                    />

                    <button
                        className="btn btn-success mt-3"
                    >
                        Ask AI
                    </button>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-body">

                    <h5>
                        Response
                    </h5>

                    <p>
                        AI response will appear here.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ChatPage;