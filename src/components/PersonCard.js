import Item from "./Item";
import AddItem from "./AddItem";
import { useEffect, useState } from "react";

const PersonCard = ({ id }) => {
  // State for current size of item list
  const [numItems, incrementNumItems] = useState(1);
  const increment = () => {
    incrementNumItems(numItems + 1);
  };

  // State storing all item components
  const [itemsList, setItemsList] = useState([]);
  useEffect(() => {
    setItemsList((itemsList) => [
      ...itemsList,
      <Item key={numItems} id={numItems} />,
    ]);
  }, [numItems]);

  // Load multiple items on initial render
  useEffect(() => {
    increment();
    increment();
  }, []);

  return (
    <div className="person">
      <div className="person-top">
        <input className="person-name" placeholder={"Person " + id}></input>
      </div>
      <div className="person-bottom">
        <div className="person-items" id={"items-" + id}>
          {itemsList}
        </div>
        <AddItem increment={increment} />
      </div>
      <div className="person-total-wrapper">
        <span className="person-total">Due:</span>
        <input
          style={{ backgroundColor: "lightgray" }}
          className="person-total"
          id={"total-" + id}
          readOnly
        ></input>
      </div>
    </div>
  );
};

export default PersonCard;
