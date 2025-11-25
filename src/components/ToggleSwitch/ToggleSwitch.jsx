import { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const [tempUnit, setTempUnit] = useState("F");

  function handleChange() {
    if (tempUnit == "F") {
      setTempUnit("C");
    } else {
      setTempUnit("F");
    }
  }

  return (
    <label htmlFor="toggle-switch" className="toggle-switch">
      <input
        id="toggle-switch"
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleChange}
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__value toggle-switch__value_left">F</span>
      <span className="toggle-switch__value toggle-switch__value_right">C</span>
    </label>
  );
}

export default ToggleSwitch;
