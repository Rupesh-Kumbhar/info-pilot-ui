import '../pages/HomePages.scss'

function HomePage() {
    return (
        <div>

            <h2 className="mb-4">
                Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">
                    <div className="card shadow card-border ">
                        <div className="card-body">
                            <h5>Total Documents</h5>
                            <h2>0</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow card-border">
                        <div className="card-body">
                            <h5>Total Questions</h5>
                            <h2>0</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow card-border">
                        <div className="card-body">
                            <h5>AI Status</h5>
                            <h2>✅ Active</h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card mt-4 shadow">
                <div className="card-body">

                    <h4>
                        Welcome to Enterprise Knowledge Assistant
                    </h4>

                    <p>
                        Upload SOPs, manuals and knowledge
                        base documents and get AI-powered
                        answers using Retrieval-Augmented
                        Generation (RAG).
                    </p>

                </div>
            </div>

        </div>
    );
}

export default HomePage;