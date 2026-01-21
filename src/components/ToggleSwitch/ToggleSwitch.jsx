import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTempUnit, handleTempUnitChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isF = currentTempUnit === "F";

  return (
    <div className="toggle">
      <button
        type="button"
        className={`toggle__container ${
          isF ? "toggle__container_is-f" : "toggle__container_is-c"
        }`}
        aria-label="Toggle temperature unit"
        onClick={handleTempUnitChange}
      >
        <div className="toggle__labels">
          <span className="toggle__label toggle__label_f">F</span>
          <span className="toggle__label toggle__label_c">C</span>
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



