import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from "react";

const AddItem = ({ increment }) => {
  // State variable to set icon color on hover
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!hover);
  };

  return (
    <div className="add-item-wrapper">
      <IoMdAddCircleOutline
        size={30}
        color={hover ? "yellow" : "white"}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        className="add-item-button"
        onClick={increment}
      />
    </div>
  );
};

export default AddItem;
