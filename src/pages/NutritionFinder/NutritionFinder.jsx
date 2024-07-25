import styles from "./NutritionFinder.module.css";
import { useState } from "react";

import nutritionData from "../../../data/FNDDS_Nutrient_Values_2020.json";

import { useMainContext } from "../../contexts/MainContext";

import Button from "../../components/Button/Button";
import FeatureIntro from "../../components/FeatureIntro/FeatureIntro";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Disclairmer from "../../components/Disclairmer/Disclairmer";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import NutritionFinderResultRow from "../../components/NutritionFinderResultRow/NutritionFinderResultRow";
import NutritionFinderResultDetailed from "../../components/NutritionFinderResultDetailed/NutritionFinderResultDetailed";

function NutritionFinder() {
  // Access to global state by using custom hook useMainContext
  const { errorMessage } = useMainContext();

  // local state: initial object
  const initialState = {
    isLoadingLocal: false,
    isStartedSearching: false,
    searchKeyword: "",
    currentDish: null,
    searchResults: [],
  };

  // local state: initialization
  const [localState, setLocalState] = useState(initialState);

  // local state: function to update it
  function handleUpdateLocalState(e) {
    setLocalState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  // function to manage the search field
  function handleSearch() {
    // guard clause
    if (!localState.searchKeyword) return;

    // set to loading
    setLocalState((prevState) => ({
      ...prevState,
      isLoadingLocal: true,
    }));

    // creating an array of matched results by filtering the json file
    const results = nutritionData.filter((item) =>
      item.field2.toLowerCase().includes(localState.searchKeyword.toLowerCase())
    );

    // updating the local state with the new array of matched results
    setLocalState((prevState) => ({
      ...prevState,
      searchResults: results,
      isLoadingLocal: false,
      isStartedSearching: true,
      searchKeyword: "",
      currentDish: null,
    }));
  }

  function handleUpdateCurrentDish(dishObject) {
    setLocalState((prevState) => ({
      ...prevState,
      currentDish: dishObject,
    }));
    // console.log(dishObject);
  }

  // useEffect(() => {
  //   // Perform any side effects here based on state changes
  //   if (!localState.isLoadingLocal) {
  //     console.log(localState.searchResults);
  //   }
  // }, [localState.searchResults, localState.isLoadingLocal]);

  return (
    <>
      <FeatureIntro>
        Access detailed nutrition data for a wide variety of dishes and prepared
        foods. Enter the name of the dish to get comprehensive information on
        carbs, proteins, fats, vitamins, and minerals.
      </FeatureIntro>

      <div className={styles.wrapperBox}>
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

        <div className={styles.sourceDataBox}>
          <p className={styles.source}>
            The source of data is: U.S. Department of Agriculture, Agricultural
            Research Service. 2022. USDA Food and Nutrient Database for Dietary
            Studies 2019-2020.{" "}
            <a
              href="http://www.ars.usda.gov/nea/bhnrc/fsrg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Food Surveys Research Group Home Page
            </a>
            .
          </p>
        </div>

        <div className={styles.searchBox}>
          <input
            type="text"
            value={localState.searchKeyword}
            name="searchKeyword"
            onChange={(e) => handleUpdateLocalState(e)}
            placeholder="Enter a keyword for details..."
            className={styles.formInput}
          />

          <Button type={"submitLarge"} onClick={handleSearch}>
            FIND INGREDIENT
          </Button>
        </div>

        <div className={styles.resultsBox}>
          {localState.isLoadingLocal ? <Spinner /> : null}

          {localState.currentDish ? (
            <NutritionFinderResultDetailed dish={localState.currentDish} />
          ) : localState.searchResults.length > 0 ? (
            localState.searchResults.map((result, index) => (
              <NutritionFinderResultRow
                result={result}
                key={index}
                onClick={handleUpdateCurrentDish}
              />
            ))
          ) : (
            !localState.isLoadingLocal &&
            localState.isStartedSearching && (
              <p className={styles.noResults}>No results found</p>
            )
          )}
        </div>
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
/*
  // check current limit
  useEffect(
    function () {
      // AbortController browser API
      const controller = new AbortController();

      async function checkRemainedAttempts() {
        try {
          setLocalState((prevState) => ({
            ...prevState,
            isLoadingLocal: true,
          }));

          // try to fetch data
          // as second argument of fetch func passing the object with singal property connected to the controller (AbortController)
          const response = await fetch(
            `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=1&api_key=${apiKey}`,
            { signal: controller.signal }
          );

          // guard clause
          if (!response.ok)
            throw new Error("Something went wrong with fetching movies...");

          // console.dir(response);

          // Log all headers to inspect the rate limit headers
          for (const [key, value] of response.headers.entries()) {
            console.log(`${key}: ${value}`);
          }

          // converting from json
          const data = await response.json();

          // for developing
          // console.log(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            // Handle fetch abort differently
            dispatch({
              type: "SET_ERROR_MESSAGE",
              payload: err.message,
            });
          }
        } finally {
          setLocalState((prevState) => ({
            ...prevState,
            isLoadingLocal: false,
          }));
        }
      }

      // checkRemainedAttempts();
      // returning the clean up function
      return function () {
        // aborting the fetch request inside the useEffect cleanup function using the AbortController
        // Remember: when the request is canceled JS sees it like an error, so adjusted try catch blocks
        controller.abort(); // Clean up: abort the fetch request
      };
    },
    [apiKey, dispatch]
  );

  function handleSubmit() {
    //  https://fdc.nal.usda.gov/api-guide.html#bkmk-6

    // AbortController browser API
    const controller = new AbortController();

    async function findIngredient() {
      try {
        setLocalState((prevState) => ({
          ...prevState,
          isLoadingLocal: true,
        }));

        // try to fetch data
        // as second argument of fetch func passing the object with singal property connected to the controller (AbortController)
        // const response = await fetch(
        //   `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=ananas`,
        //   { signal: controller.signal }
        // );

        const response = await fetch(
          `https://api.nal.usda.gov/fdc/v1/food/169124?api_key=${apiKey}`,
          { signal: controller.signal }
        );

        // guard clause
        if (!response.ok)
          throw new Error("Something went wrong with fetching movies...");

        console.dir(response);

        // converting from json
        const data = await response.json();

        // for developing
        console.log(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          // Handle fetch abort differently
          dispatch({
            type: "SET_ERROR_MESSAGE",
            payload: err.message,
          });
        }
      } finally {
        setLocalState((prevState) => ({
          ...prevState,
          isLoadingLocal: false,
        }));
      }
    }

    findIngredient();

    return function () {
      // aborting the fetch request inside the useEffect cleanup function using the AbortController
      // Remember: when the request is canceled JS sees it like an error, so adjusted try catch blocks
      controller.abort(); // Clean up: abort the fetch request
    };
  }
    */

/***** WORKFLOW:

  API:
  - https://fdc.nal.usda.gov/data-documentation.html
  - https://fdc.nal.usda.gov/api-guide.html

  DATABASE:
  - https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/food-surveys-research-group/docs/fndds-download-databases/


  
*/
