function ChatPage() {
    return (
        <>
            <h2>Knowledge Assistant</h2>

            <div className="card mt-3">
                <div className="card-body">

                    <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Ask your question..."
                    />

                    <button
                        className="btn btn-success mt-3"
                    >
                        Ask
                    </button>

                </div>
            </div>
        </>
    );
}

export default ChatPage;