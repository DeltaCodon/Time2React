function ItemsDisplay({ items, deleteItem }) {
    const showItem = (item) => {
        return (
            <tr>
                <th scope="row"> {item.id}</th>
                <td> {item.name}</td>
                <td> {item.income}</td>
                <td> {item.amount}</td>
                <td> {item.cost}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteItem(item)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <div className="containter">
            <div className="row">
                <h2>Items</h2>
            </div>
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Income $</th>
                            <th scope="col">Amount $</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>{items.map(showItem)}</tbody>
                </table>
            </div>
        </div>
    );
}

export default ItemsDisplay;