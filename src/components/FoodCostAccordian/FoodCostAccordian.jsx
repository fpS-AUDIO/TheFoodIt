import { useState } from "react";
import styles from "./FoodCostAccordian.module.css";

const topics = [
  {
    question: "What is Food Cost?",
    answer:
      "Food cost is the percentage of a dish's selling price that is spent on the ingredients used to prepare it. It is a key metric for managing a restaurant's profitability. By calculating food cost, you can determine how much of your revenue is consumed by the cost of ingredients and adjust pricing or portion sizes accordingly.",
    question2: "How to Calculate Food Cost?",
    answer2:
      "Food cost percentage is calculated by dividing the total cost of ingredients by the selling price of the dish and then multiplying by 100. The formula is: Food Cost Percentage = (Total Cost of Ingredients / Selling Price) * 100.",
  },
  {
    question: "What is the Importance of Food Cost?",
    answer:
      "Monitoring food cost is crucial for maintaining profitability in a restaurant. By keeping track of food costs, you can identify waste, adjust menu prices, and ensure that your pricing strategy is aligned with your financial goals. It helps in maintaining a balance between competitive pricing and profitability.",
    question2: "How to Manage Food Cost Efficiently?",
    answer2: `To manage food cost efficiently, consider the following tips:
      1. Regularly update and review your food cost calculations.
      2. Purchase ingredients in bulk when possible to reduce costs.
      3. Train staff to minimize waste and utilize ingredients fully.
      4. Adjust menu prices based on ingredient cost fluctuations.
      5. Use seasonal ingredients to take advantage of lower prices.`,
  },
  {
    question: "What is VAT (Value-Added Tax)?",
    answer:
      "VAT (Value-Added Tax) is a consumption tax placed on a product whenever value is added at each stage of the supply chain. In the context of food, VAT is added to the cost of ingredients and must be considered when pricing dishes to ensure compliance and maintain profitability. The VAT rate can vary by country within Europe.",
    question2: "How to Handle VAT in Food Cost Calculation?",
    answer2:
      "If your ingredient costs and selling prices already include VAT, you can directly use these values for calculations. Ensure the costs entered are final and include VAT to accurately determine the food cost percentage.",
  },
  {
    question: "How Does Our App Manage Food Cost and VAT?",
    answer:
      "Our app simplifies food cost management by allowing you to input the cost of ingredients and the selling price of a dish, both including VAT. It calculates the total cost of ingredients, food cost percentage, and helps you understand your pricing to ensure compliance and profitability.",
    question2: "Steps to Use the App for Accurate Calculations",
    answer2: `1. Enter the name, quantity, unit, and price of each ingredient (including VAT).
      2. Input the dish's selling price (including VAT) and the number of servings obtained from the provided ingredients.
      3. The app will calculate the total cost of ingredients, food cost percentage, and provide guidance based on your inputs.
      4. Review the results to ensure accuracy and make any necessary adjustments.`,
  },
];

function FoodCostAccordian() {
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

export default FoodCostAccordian;
