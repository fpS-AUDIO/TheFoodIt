import { useState } from "react";
import styles from "./KcalAccordian.module.css";

const topics = [
  {
    question: "What is BMI?",
    answer:
      "Body Mass Index (BMI) is a measurement that uses height and weight to estimate a person's body fat, providing an easy and quick method to assess whether someone has an appropriate body weight for their height. BMI is widely used in the medical community to screen for obesity, underweight, and healthy weight ranges, though it does not directly measure body fat percentage. BMI<16 = Severe Underweight; 16<BMI<18.5 = Underweight; 18.5<BMI<25 = Normal weight; 25<BMI<30 = Overweight; 30<BMI<35 = Moderately obese; 35<BMI<40 = Severely obese; BMI>40 = Very severely obese; ",
    question2: "How to Calculate BMI?",
    answer2:
      "BMI is calculated by dividing a person's weight in kilograms (kg) by their height in meters (m) squared.",
  },
  {
    question: "What is BMR?",
    answer:
      "Basal Metabolic Rate (BMR) is the number of calories required to keep your body functioning at rest, also known as metabolism. BMR accounts for the majority of an individual's calorie consumption each day and includes energy used for basic bodily functions such as breathing, circulation, cell production, and nutrient processing. It is a crucial metric for understanding calorie needs and managing weight.",
    question2: "How to Calculate BMR?",
    answer2: `BMR can be estimated through various formulas, with the Mifflin-St Jeor Equation being one of the most commonly used today. For men and women, the formulas are slightly different:
                For men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5;
                For women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161.`,
  },
  {
    question: "What is TEF?",
    answer:
      "The Thermic Effect of Food (TEF), also known as dietary-induced thermogenesis, is the amount of energy expended above the basal metabolic rate as a result of processing food for use and storage. It represents the calories needed to digest, absorb, and metabolize the nutrients in your food. TEF varies by nutrient, with protein having the highest thermic effect, followed by carbohydrates and fats.",
    question2: "How to Calculate TEF?",
    answer2: `TEF is typically estimated as a percentage of total caloric intake. The average values for calculating TEF are:
            Protein: 20-30% of energy consumed. 
            Carbohydrates: 5-10% of energy consumed. 
            Fats: 0-3% of energy consumed. 
            Therefore, the TEF can be calculated by applying these percentages to the caloric intake from each macronutrient in your diet.`,
  },
  {
    question: "What is TDEE?",
    answer:
      "Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day, accounting for all activities. This encompasses energy spent while resting (Basal Metabolic Rate or BMR), the calories burned through physical activities (exercise and everyday movements), and the Thermic Effect of Food (TEF), which is the energy used to digest food. Understanding your TDEE is crucial for managing weight, as it helps tailor dietary intake to meet personal fitness goals, whether it's losing, gaining, or maintaining weight.",
    question2: "How to Calculate TDEE?",
    answer2: `TDEE is calculated by first determining your BMR using formulas such as the Mifflin-St Jeor Equation and then adjusting that number based on your activity level using a multiplier. The equation looks like this:
            TDEE = BMR × Activity Multiplier.
            Activity multipliers may vary, but they generally range as follows:
            Sedentary (little or no exercise): BMR × 1.2;
            Lightly active (light exercise/sports 1-3 days/week): BMR × 1.375;
            Moderately active (moderate exercise/sports 3-5 days/week): BMR × 1.55;
            Very active (hard exercise/sports 6-7 days a week): BMR × 1.725;
            Extra active (very hard exercise/sports & a physical job): BMR × 1.9;`,
  },
  {
    question: "What is Macronutrient Distribution?",
    answer:
      "Macronutrient distribution refers to the ratio of carbohydrates, proteins, and fats that an individual consumes as part of their total daily calorie intake. This distribution is key to achieving specific health and fitness goals, such as weight loss, muscle gain, or maintaining a healthy weight. Each macronutrient plays a unique role in the body, contributing to energy production, muscle repair, and overall metabolic function.",
    question2: "How to Determine Your Macronutrient Ratios?",
    answer2: `Determining your ideal macronutrient ratios involves considering your Total Daily Energy Expenditure (TDEE) and your specific health and fitness goals. The distribution of macronutrients can significantly impact your ability to lose fat, build muscle, or maintain your current physique in a healthy manner.
            These are general guidelines and should be adjusted based on personal needs, preferences, and feedback:
            Weight Loss: 40% Carbohydrates, 35% Protein, 25% Fat; 
            Muscle Gain: 50% Carbohydrates, 30% Protein, 20% Fat; 
            Maintenance: 50% Carbohydrates, 20% Protein, 30% Fat.`,
  },
];

function KcalAccordian() {
  // useState for local state component management
  const [openItem, setOpenItem] = useState(null);

  // function to close/open items
  function toggleItem(index) {
    setOpenItem(openItem === index ? null : index);
  }

  return (
    <div className={styles.accordion}>
      {topics.map((topic, index) => (
        <div
          key={index}
          className={`${styles.item} ${openItem === index ? styles.open : ""}`}
        >
          <p
            className={`noSelect ${styles.questionText}`}
            onClick={() => toggleItem(index)}
          >
            {topic.question}
          </p>
          <svg
            onClick={() => toggleItem(index)}
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.icon} ${
              openItem === index ? styles.active : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <div className={styles.hiddenBox}>
            <p className={styles.answer}>{topic.answer}</p>
            <p className={styles.questionSecondary}>{topic.question2}</p>
            <p className={styles.answerSecondary}>{topic.answer2}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KcalAccordian;
