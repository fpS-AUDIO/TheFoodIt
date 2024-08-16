import styles from "./KcalCalculatorForm.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearErrorMessage,
  setErrorMessage,
} from "../../../store/slices/appLayoutSlice";
import { setUserKcalData } from "../../../store/slices/kcalCalculatorSlice";

import Button from "../../../components/Button/Button";

function KcalCalculatorForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // component's local state
  const [formData, setFormData] = useState({
    gender: "",
    height: "",
    weight: "",
    age: "",
    pal: "",
    goal: "",
  });

  // to manage controlled elements
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  //   function to reset the form to initial state
  function resetFormData() {
    setFormData({
      gender: "",
      height: "",
      weight: "",
      age: "",
      pal: "",
      goal: "",
    });
  }

  // form submit function
  function handleSubmit(e) {
    e.preventDefault();

    // first reset error
    dispatch(clearErrorMessage());

    // guard clause check the data for zeros
    if (
      Number(formData.weight) <= 0 ||
      Number(formData.height) <= 0 ||
      Number(formData.pal) <= 0
    ) {
      dispatch(setErrorMessage("Please enter the data above zero."));
      return;
    }

    // guard clause check the data if 18+
    if (Number(formData.age) < 18) {
      dispatch(
        setErrorMessage(
          "You need to be an adult (18+) to get a more accurate result."
        )
      );
      return;
    }

    // guard clause for reasonable values
    if (
      Number(formData.weight) < 30 ||
      Number(formData.weight) > 300 ||
      Number(formData.height) < 100 ||
      Number(formData.height) > 250 ||
      Number(formData.age) < 18 ||
      Number(formData.age) > 100
    ) {
      dispatch(
        setErrorMessage(
          "Please enter realistic values for weight, height, and age."
        )
      );

      return;
    }

    // creating new object with correctly formatted data
    const userDataForm = {
      gender: formData.gender,
      height: Number(formData.height),
      weight: Number(formData.weight),
      age: Number(formData.age),
      pal: Number(formData.pal),
      goal: formData.goal,
    };

    // update the global state with form data

    dispatch(setUserKcalData(userDataForm));

    // reset the form
    resetFormData();

    // change route automatically
    navigate("/kcalCalculator/stats");
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.calculatorForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>
          Discover Your Personalized Body Metrics
        </h2>
        <h3 className={styles.titleSecondary}>
          Enter your details below to get started:
        </h3>

        <div className={styles.formRadioRow}>
          <p className={styles.formLabel}>Gender</p>
          <div className={styles.radioRowChoices}>
            <div className={styles.radioRowChoice}>
              <input
                required
                className={styles.customRadioInput}
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label className={styles.formLabel} htmlFor="male">
                Male
              </label>
            </div>
            <div className={styles.radioRowChoice}>
              <input
                className={styles.customRadioInput}
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label className={styles.formLabel} htmlFor="female">
                Female
              </label>
            </div>
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Height</label>
          <input
            name="height"
            required
            type="number"
            className={styles.formInput}
            placeholder="cm"
            value={formData.height}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Weight</label>
          <input
            name="weight"
            required
            type="number"
            className={styles.formInput}
            placeholder="kg"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Age</label>
          <input
            name="age"
            required
            type="number"
            className={styles.formInput}
            placeholder="years"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formSelectRow}>
          <label className={styles.formLabel}>Physical Activity Level</label>
          <select
            required
            name="pal"
            value={formData.pal}
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">
              Lightly active (light exercise/sports 1-3 days/week)
            </option>
            <option value="1.55">
              Moderately active (moderate exercise/sports 3-5 days/week)
            </option>
            <option value="1.725">
              Very active (hard exercise/sports 6-7 days a week)
            </option>
            <option value="1.9">
              Extra active (very hard exercise/sports & a physical job)
            </option>
          </select>
        </div>

        <div className={styles.formSelectRow}>
          <label className={styles.formLabel}>Health and fitness goal</label>
          <select
            required
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="weight">Weight Loss</option>
            <option value="muscle">Muscle Gain</option>
            <option value="maintenance">Weight Maintenance</option>
          </select>
        </div>

        <div className={styles.btnContainer}>
          <Button type={"submit"}>Calculate</Button>
        </div>
      </form>
    </div>
  );
}

export default KcalCalculatorForm;
