import PersonCard from "./components/PersonCard";
import Calculator from "./components/Calculator";
import { useState, useEffect } from "react";

function App() {
  // Mobile layout verification
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 480 ? true : false
  );
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const handleResize = () => {
    setScreenHeight(window.innerHeight);
    if (window.innerWidth < 480) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    document.title = "EZ/Split";
  }, []);

  // State variable for current number of people
  const [numPeople, setNumPeople] = useState(1);
  const incrementPeople = () => {
    setNumPeople(numPeople + 1);
  };

  // State variable to store cards
  const [people, setPeople] = useState([]);
  useEffect(() => {
    setPeople((people) => [
      ...people,
      <PersonCard key={numPeople} id={numPeople} />,
    ]);
  }, [numPeople]);

  // Regex to parse a string for a valid float
  const validNumber = (str) => {
    return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
  };

  // Given an item list, add all prices and return the sum.
  // On invalid input, highlight pink and return -1.
  const scanItems = (itemList) => {
    var sum = 0;
    var error = false;
    for (var j = 0; j < itemList.childElementCount; j += 1) {
      const value = itemList.children.item(j).children.item(1).value.trim();
      if (validNumber(value)) {
        itemList.children.item(j).children.item(1).style.backgroundColor =
          "white";
        sum += parseFloat(value);
      } else if (value.length == 0) {
        itemList.children.item(j).children.item(1).style.backgroundColor =
          "white";
      } else {
        itemList.children.item(j).children.item(1).style.backgroundColor =
          "pink";
        error = true;
      }
    }
    if (error) {
      return -1;
    }
    return sum;
  };

  // Calculate amounts due for each person
  const calculate = () => {
    // Scan all items to get the subtotal and splits
    var error = false;
    var subtotal = 0;
    var subtotal_split = [];
    for (var i = 0; i < numPeople; i += 1) {
      const itemList = document.getElementById("items-" + (i + 1));
      var sum = scanItems(itemList);
      subtotal += sum;
      subtotal_split.push(sum);
      if (sum == -1) {
        error = true;
      }
    }

    // Parse tip and tax
    var tip = null;
    var tax = null;
    var tip_input = document.getElementById("tip");
    var tax_input = document.getElementById("tax");
    if (validNumber(tip_input.value)) {
      tip_input.style.backgroundColor = "white";
      tip = parseFloat(tip_input.value);
    } else {
      if (tip_input.value.trim().length == 0) {
        tip_input.style.backgroundColor = "white";
        tip = 0;
      } else {
        tip_input.style.backgroundColor = "pink";
      }
    }
    if (validNumber(tax_input.value)) {
      tax_input.style.backgroundColor = "white";
      tax = parseFloat(tax_input.value);
    } else {
      if (tax_input.value.trim().length == 0) {
        tax_input.style.backgroundColor = "white";
        tax = 0;
      } else {
        tax_input.style.backgroundColor = "pink";
      }
    }

    // Check for errors
    if (error || tip == null || tax == null) {
      document.getElementById("subtotal").value = "error";
      document.getElementById("total").value = "error";
      return;
    }

    // Calculate amounts due for each person
    var total = subtotal + tip + tax;
    for (var i = 0; i < numPeople; i += 1) {
      const due = document.getElementById("total-" + (i + 1));
      due.style.backgroundColor = "white";
      if (subtotal == 0) {
        // Avoid division by 0
        due.value = 0;
        document.getElementById("subtotal").value = subtotal.toFixed(2);
        document.getElementById("subtotal").style.backgroundColor = "white";
        document.getElementById("total").value = total.toFixed(2);
        document.getElementById("total").style.backgroundColor = "white";
        return;
      }
      var ratio = subtotal_split[i] / subtotal;
      due.value = (ratio * total).toFixed(2);
    }

    // Set final totals
    document.getElementById("subtotal").value = subtotal.toFixed(2);
    document.getElementById("subtotal").style.backgroundColor = "white";
    document.getElementById("total").value = total.toFixed(2);
    document.getElementById("total").style.backgroundColor = "white";
  };

  return (
    <div className="App">
      <Calculator isMobile={isMobile} screenHeight={screenHeight} />
      <div id="header-wrapper">
        <span
          id="header"
          onClick={() => {
            window.location.reload();
          }}
        >
          EZ / SPLIT
        </span>
      </div>
      <div id="person-card-wrapper">{people}</div>
      <div id="payment-details">
        <div id="detail-names">
          <span className="detail-name">Tip: $</span>
          <span className="detail-name">Tax: $</span>
          <span className="detail-name">Subtotal: $</span>
          <span className="detail-name">Total: $</span>
        </div>
        <div id="detail-amounts">
          <input
            className="detail-input"
            id="tip"
            placeholder="0.00"
            inputMode="decimal"
          ></input>
          <input
            className="detail-input"
            id="tax"
            placeholder="0.00"
            inputMode="decimal"
          ></input>
          <input
            style={{ backgroundColor: "lightgray" }}
            className="detail-input"
            id="subtotal"
            readOnly
          ></input>
          <input
            style={{ backgroundColor: "lightgray" }}
            className="detail-input"
            id="total"
            readOnly
          ></input>
        </div>
      </div>
      <div id="button-wrapper">
        <button onClick={incrementPeople}>Add Person</button>
        <button onClick={calculate}>Calculate</button>
      </div>
    </div>
  );
}

export default App;
