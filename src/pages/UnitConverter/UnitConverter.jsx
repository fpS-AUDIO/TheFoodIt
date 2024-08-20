import styles from "./UnitConverter.module.css";

import { useEffect, useState } from "react";
import convert from "convert-units";

// React Redux and Store
import { useDispatch } from "react-redux";
import {
  setErrorMessage,
  clearErrorMessage,
} from "../../store/slices/appLayoutSlice";

// general components
import FeatureIntro from "../../components/FeatureIntro/FeatureIntro";
import Button from "../../components/Button/Button";
// import Advertisement01 from "../../components/Advertisement01/Advertisement01";

const kitchenUnits = [
  "tsp", // Teaspoons
  "Tbs", // Tablespoons
  "fl-oz", // Fluid Ounces
  "cup", // Cups
  "pnt", // Pints
  "qt", // Quarts
  "gal", // Gallons
  "ml", // Milliliters
  "l", // Liters
  "g", // Grams
  "kg", // Kilograms
  "oz", // Ounces
  "lb", // Pounds
  "C", // Celsius
  "F", // Fahrenheit
];

function UnitConverter() {
  // local state
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState(null);
  const [possibleUnits, setPossibleUnits] = useState([]);

  // global state
  const dispatch = useDispatch();

  // effect checks all possible units the actual 'fromUnit' can be converted to
  useEffect(() => {
    // guard clause
    if (!fromUnit) return;

    async function checkPossibleConversions() {
      try {
        // check the possible conversions for current 'fromUnit'
        const arrayOfPossibleUnits = convert().from(fromUnit).possibilities();

        // update local state with all possible values
        setPossibleUnits(arrayOfPossibleUnits);
      } catch (err) {
        dispatch(
          setErrorMessage(
            "Oops! It looks like the initial unit you entered isn't valid. Please try again with a correct unit."
          )
        );
      }
    }

    // actually make a check
    checkPossibleConversions();
  }, [fromUnit]);

  function handleConversion() {
    // if not all fields are completed
    if (!value || !fromUnit || !toUnit) {
      dispatch(setErrorMessage("Please fill the required fields"));
      return;
    }

    try {
      if (Number(value) <= 0) throw new Error("Please insert a positive value");
      const convertedValue = convert(Number(value)).from(fromUnit).to(toUnit);
      setResult(convertedValue);
    } catch (err) {
      dispatch(
        setErrorMessage(
          err.message ||
            "Sorry, the conversion between the selected units is not possible. Please select valid units and try again."
        )
      );
    }
  }

  function handleChangeSetValue(value) {
    setValue(() => value);
    setResult(() => null);
  }

  function handleChangeSetFromUnit(value) {
    setFromUnit(() => value);
    setResult(() => null);
    setToUnit(() => "");
  }

  function handleChangeSetToUnit(value) {
    setToUnit(() => value);
    setResult(() => null);
  }

  return (
    <>
      {/* <Advertisement01 /> */}
      <FeatureIntro>
        Convert between various units of measurement used in cooking. Whether
        you need to switch from ounces to cups, grams to ounces, or any other
        measurement, our tool provides accurate and quick conversions to ensure
        your recipes are precise every time.
      </FeatureIntro>

      <div className={styles.wrapper}>
        <div className={styles.converterHeader}>
          <label className={styles.label} htmlFor="initialValue">
            Value:
          </label>
          <input
            type="number"
            id="initialValue"
            name="initialValueNum"
            placeholder="e.g. 4"
            required
            value={value}
            onChange={(e) => handleChangeSetValue(e.target.value)}
            className={styles.inputNumber}
          />
          <select
            id="initialUnit"
            name="initialUnitStr"
            required
            value={fromUnit}
            onChange={(e) => handleChangeSetFromUnit(e.target.value)}
            className={styles.inputSelect}
          >
            <option value="">Select</option>
            {kitchenUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.converterBody}>
          <label className={styles.label} htmlFor="targetUnit">
            Can be convert to:
          </label>
          <select
            id="targetUnit"
            name="targetUnit"
            value={toUnit}
            onChange={(e) => handleChangeSetToUnit(e.target.value)}
            className={styles.inputSelect}
          >
            <option value="">Select</option>
            {possibleUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <Button type={"submitLarge"} onClick={handleConversion}>
          Convert
        </Button>

        {result !== null && (
          <div className={styles.result}>
            <p>
              <strong>Result:</strong>
            </p>
            <p>{`${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default UnitConverter;
