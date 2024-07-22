import styles from "./NutritionFinder.module.css";

import { useMainContext } from "../../contexts/MainContext";

import Button from "../../components/Button/Button";
import FeatureIntro from "../../components/FeatureIntro/FeatureIntro";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Disclairmer from "../../components/Disclairmer/Disclairmer";
import Footer from "../../components/Footer/Footer";

function NutritionFinder() {
  // import API key of Food Data Central
  const apiKey = import.meta.env.VITE_FOODDATA_API_KEY;

  // Access to global state by using custom hook useMainContext
  const { errorMessage } = useMainContext();

  /*
      function () {
      // AbortController browser API
      const controller = new AbortController();

      // the useEffect callback is synchronous to prevent race conditions, so it can not return a promise
      // for this reason passing new asynch function inside fetchMovies()
      // wrap asynch func inside try catch block to get errors
      async function fetchMovies() {
        try {
          // loading state is ON
          setIsLoading(true);

          // Resetting error
          setErrorMessage("");

          // try to fetch data
          // as second argument of fetch func passing the object with singal property connected to the controller (AbortController)
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY_API}&s=${query}`,
            { signal: controller.signal }
          );

          // guard clause (for fetching)
          if (!response.ok)
            throw new Error("Something went wrong wuth fetching movies...");

          // if response is ok convert from json
          const data = await response.json();

          // guard clause (if there is no movie from query)
          if (data.Response === "False") {
            throw new Error("Movie not found...");
          }

          // if everything is ok update movies state
          setMovies(data.Search);

          // also resetting error
          setErrorMessage("");
        } catch (err) {
          // setting error function only if error is different of AbortError caused when aborting the fetch in cleanup func
          if (err.name !== "AbortError") {
            setErrorMessage(() => err.message);
          }
        } finally {
          // loading state is OFF
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setErrorMessage("");
        return;
      }
      // indeed also call the asynch function
      fetchMovies();

      // returning the clean up function
      return function () {
        // aborting the fetch request inside the useEffect cleanup function using the AbortController
        // Remember: when the request is canceled JS sees it like an error, so adjusted try catch blocks
        controller.abort();
      };
    },
  
  */

  function handleSubmit() {
    //  https://fdc.nal.usda.gov/api-guide.html#bkmk-6
    async function fetchIngredient() {
      try {
        // const request = await fetch(
        //   `https://api.nal.usda.gov/fdc/v1/food/######?api_key=${apiKey}`
        // );

        const request = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${apiKey}`
        );
        console.log(request);

        if (!request.ok)
          throw new Error("Something went wrong wuth fetching...");

        const data = await request.json();

        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchIngredient();
  }

  return (
    <>
      <FeatureIntro>
        Quickly access detailed nutrition data for any ingredient. Enter the
        ingredient name to get information on carbs, proteins, fats, vitamins,
        and minerals. Make informed dietary choices with ease.
      </FeatureIntro>

      <div className={styles.wrapperBox}>
        <div className={styles.sourceDataBox}>
          <p>The source of data is:</p>
          <p className={styles.source}>
            U.S. Department of Agriculture, Agricultural Research Service.
            FoodData Central, 2019.{" "}
            <a
              href="https://fdc.nal.usda.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              FoodData Central
            </a>
            .
          </p>
        </div>

        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

        <Button type={"submitLarge"} onClick={handleSubmit}>
          FIND INGREDIENT
        </Button>

        <Footer>
          <Disclairmer
            message={
              "TheFoodIt's Nutrition Insights uses external data sources and may contain inaccuracies. Always verify nutrition data for critical dietary decisions."
            }
          />
        </Footer>
      </div>
    </>
  );
}

export default NutritionFinder;
