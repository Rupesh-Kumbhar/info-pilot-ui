function DocumentList({
    documents,
    onDelete
}) {

    return (

        <table
            className="table table-striped"
        >

            <thead>

            <tr>
                <th>ID</th>
                <th>File Name</th>
                <th>Action</th>
            </tr>

            </thead>

            <tbody>

            {
                documents.map(
                    (document) => (
                        <tr
                            key={
                                document.id
                            }
                        >

                            <td>
                                {document.id}
                            </td>

                            <td>
                                {
                                    document.fileName
                                }
                            </td>

                            <td>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        onDelete(
                                            document.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    )
                )
            }

            </tbody>

        </table>
    );
}

export default DocumentList;