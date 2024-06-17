import { useEffect, useState } from "react";

function BudgetTotal(props) {
    const requestsOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(props.item),
    };
    useEffect(() => {
        fetch("http://localhost:4000/bills", requestsOptions)
            .then((response) => response.json())
            .then((data) => {
                const i = data?.reverse();
                if (data.length > 0) {
                    const x = Number(i[0].income) - Number(i[0].cost);
                    console.log(i[0].cost);
                    setTotal(`${String(x)}`);
                } else {
                    setTotal(`${String(0)}`);
                }
            });

    })

    const [total, setTotal] = useState(`${"0"}`);

    return (
        <div>
            <div>
                <label htmlFor="total-field">Remaining Total: </label>
                <input
                    id="total-field"
                    type="number"
                    className="form-control"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                />
            </div>
        </div>
    )
}

export default BudgetTotal