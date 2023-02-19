import { BsCalculatorFill } from "react-icons/bs";
import { useState } from "react";
const Calculator = ({ isMobile, screenHeight }) => {
  // State variable to track mouse hover over calculator icon
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!hover);
  };

  // State variable to track if calculator is expanded or hidden
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  // State variable for calculator display
  const [display, setDisplay] = useState("");
  const clear = () => {
    setDisplay("");
  };

  const [savedAnswer, setSavedAnswer] = useState(null);
  const setAnswerRounded = (answer) => {
    setSavedAnswer(answer.toFixed(2));
  };

  // Various calculator operations
  const press = (value) => {
    if (display == "Syntax Error" || display == "undefined") {
      setDisplay(value);
      return;
    }
    setDisplay(display + value);
  };
  const pressDecimal = () => {
    if (display.includes(".")) {
      return;
    }
    if (display == "Syntax Error" || display == "undefined") {
      setDisplay(".");
      return;
    }
    setDisplay(display + ".");
  };
  const pressDel = () => {
    if (display.length == 0) {
      return;
    } else if (display == "Syntax Error" || display == "undefined") {
      clear();
      return;
    }
    const removeLast = display.toString().slice(0, -1);
    setDisplay(removeLast);
  };
  const evaluate = () => {
    let result = null;
    try {
      result = eval(display);
      setDisplay(result);
      setAnswerRounded(result);
    } catch (e) {
      if (e instanceof SyntaxError) {
        setDisplay("Syntax Error");
      }
    }
  };

  return (
    <div
      id="calculator"
      style={
        isMobile
          ? {
              top: expanded ? "0px" : `${screenHeight - 63}px`,
              backgroundColor: expanded
                ? "rgba(15, 15, 15, 0.338)"
                : "rgba(255, 255, 255, 0.185)",
            }
          : {
              left: expanded ? "0px" : "-290px",
              backgroundColor: expanded
                ? "rgba(15, 15, 15, 0.338)"
                : "rgba(255, 255, 255, 0.185)",
            }
      }
    >
      <div id="sidebar-wrapper">
        <div id="calculator-icon-wrapper">
          <div
            id="calculator-icon"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onClick={handleExpand}
          >
            <BsCalculatorFill size={40} color={hover ? "blue" : "black"} />
          </div>
        </div>
        <input
          id="saved-answer"
          value={savedAnswer ? savedAnswer : ""}
          readOnly
        ></input>
      </div>
      <div id="calculator-component-wrapper">
        <div className="calculator-row">
          <input
            id="calculator-screen"
            style={{
              visibility: expanded ? "visible" : "hidden",
            }}
            value={display}
            readOnly
          ></input>
        </div>
        <div className="calculator-row">
          <button id="del" className="calculator-button" onClick={pressDel}>
            DEL
          </button>
          <button id="ac" className="calculator-button" onClick={clear}>
            AC
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("(");
            }}
          >
            &#40;
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press(")");
            }}
          >
            &#41;
          </button>
        </div>
        <div className="calculator-row">
          <button
            className="calculator-button"
            onClick={() => {
              press("7");
            }}
          >
            7
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("8");
            }}
          >
            8
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("9");
            }}
          >
            9
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("/");
            }}
          >
            &#xF7;
          </button>
        </div>
        <div className="calculator-row">
          <button
            className="calculator-button"
            onClick={() => {
              press("4");
            }}
          >
            4
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("5");
            }}
          >
            5
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("6");
            }}
          >
            6
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("*");
            }}
          >
            &#215;
          </button>
        </div>
        <div className="calculator-row">
          <button
            className="calculator-button"
            onClick={() => {
              press("1");
            }}
          >
            1
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("2");
            }}
          >
            2
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("3");
            }}
          >
            3
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("-");
            }}
          >
            &#8211;
          </button>
        </div>
        <div className="calculator-row">
          <button
            className="calculator-button"
            onClick={() => {
              pressDecimal();
            }}
          >
            .
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("0");
            }}
          >
            0
          </button>
          <button className="calculator-button" onClick={evaluate}>
            =
          </button>
          <button
            className="calculator-button"
            onClick={() => {
              press("+");
            }}
          >
            +
          </button>
        </div>
      </div>
      <div id="calculator-bottom"></div>
    </div>
  );
};

export default Calculator;
