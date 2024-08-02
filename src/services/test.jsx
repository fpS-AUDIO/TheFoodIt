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
