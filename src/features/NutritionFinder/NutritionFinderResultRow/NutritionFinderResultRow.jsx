import styles from "./NutritionFinderResultRow.module.css";

function NutritionFinderResultRow({ result, onClick }) {
  // <pre>{JSON.stringify(result, null, 2)}</pre>
  //   console.log(result);
  return (
    <div onClick={() => onClick(result)} className={styles.resultRow}>
      {result.field2}
    </div>
  );
}

export default NutritionFinderResultRow;
