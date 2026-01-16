import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  // App provides: { currentTempUnit, handleTempUnitChange }
  const { currentTempUnit, handleTempUnitChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isF = currentTempUnit === "F";

  return (
    <div className="toggle">
      <button
        type="button"
        className="toggle__container"
        aria-label="Toggle temperature unit"
        onClick={handleTempUnitChange}
      >
        <div className="toggle__labels">
          <span>F</span>
          <span>C</span>
        </div>

        <div
          className={`toggle__knob ${
            isF ? "toggle__knob_left" : "toggle__knob_right"
          }`}
        />
      </button>
    </div>
  );
}

export default ToggleSwitch;


