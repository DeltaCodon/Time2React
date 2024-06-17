import { useEffect, useState } from "react";
import AddItem from "./components/AddItems";
import ItemsDisplay from "./components/ItemDisplay";

function App() {
  const [data, setData] = useState({ bills: [] });

  useEffect(() => {
    fetch("http://localhost:4000/bills")
      .then((response) => response.json())
      .then((data) => setData({ bills: data }));
  }, []);

  const addItemToData = (item) => {
    let items = data["bills"];
    const requestsOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:4000/bills", requestsOptions)
      .then((response) => response.json())
      .then((data) => {
        items.push(data);
        setData({ bills: items });
      });
  };

  const DeleteItems = (item) => {
    const items = data["bills"];
    const requestsOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/bills/${item.id}`, requestsOptions).then(
      (response) => {
        if (response.ok) {
          const idx = items.indexOf(item);
          items.splice(idx, 1);
          setData({ bills: items });
        }
      }
    );
  };


  return (
    <div className="container mt-5 ">
      <div className="" style={{ display: "flex", justifyContent: "center" }}>
        <h2>Hello Loser</h2>
      </div>
      <div>
        <AddItem addItems={addItemToData} />
      </div>
      <div>
        <ItemsDisplay
          deleteItem={DeleteItems}
          items={data["bills"]} />
      </div>
    </div>
  );
}

export default App;
