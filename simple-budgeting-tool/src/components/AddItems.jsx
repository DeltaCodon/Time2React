import { useState } from "react";
import BudgetTotal from "./BudgetTotal";

function AddItem(props) {
  const requestsOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props.item),
  };

  fetch("http://localhost:4000/bills", requestsOptions)
    .then((response) => response.json())
    .then((data) => {
      const i = data?.reverse();
      const startingAmount = amount;
      if (data.length > 0) {
        const numID = Number(i[0].id) + 1;
        setID(`${numID}`);
        const allCost = data
          .map((paid) => paid.amount)
          .reduce((curr, i) => Number(curr) + Number(i), Number(startingAmount));
        setCost(`${String(allCost)}`);
      } else {
        setID(`0`);
        setCost(`${String(startingAmount)}`);
      }
    });
  const [id, setID] = useState(`${"0"}`);
  const [income, setIncome] = useState(`${"0"}`);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(`${"0"}`);
  const [cost, setCost] = useState(`${"0"}`);

  const addPressed = () => {
    props.addItems({
      id: id,
      income: income,
      name: name,
      amount: amount,
      cost: cost,
    });
    setIncome(`${Number(income)}`);
    setName("");
    setAmount(`${Number(0)}`);
    setCost(`${Number(cost)}`);
    setID(`${Number(id) + 1}`);
  };


  return (
    <div className="container my-4">
      <div
        className="hstack mb-4 container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <label htmlFor="income-field">Income: </label>
          <input
            id="income-field"
            type="number"
            className="form-control"
            value={income}
            placeholder={Number(income)}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount-used">Cost: </label>
          <input
            id="amount-used"
            type="number"
            className="form-control"
            value={Number(cost)}
            placeholder={Number(cost)}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div>
          <BudgetTotal></BudgetTotal>
        </div>
      </div>
      <div>
        <label htmlFor="name-field">Bill Name: </label>
        <input
          id="name-field"
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="amount-field">Bill Amount: </label>
        <input
          id="amount-field"
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={addPressed}
          type="button"
          className="col-4 btn btn-primary"
        >
          Add Bill
        </button>
      </div>
    </div>
  );
}

export default AddItem;
