// EXTERNAL LIBRARIES
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// REDUX TOOLKIT
import { Provider } from "react-redux";
import store from "./store/store";

// CUSTOM PAGE COMPONENTS
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import Homepage from "./pages/Homepage/Homepage";

const FoodCost = lazy(() => import("./pages/FoodCost/FoodCost"));
const KcalCalculator = lazy(() =>
  import("./pages/KcalCalculator/KcalCalculator")
);
const RecipeScaler = lazy(() => import("./pages/RecipeScaler/RecipeScaler"));
const UnitConverter = lazy(() => import("./pages/UnitConverter/UnitConverter"));
const NutritionFinder = lazy(() =>
  import("./pages/NutritionFinder/NutritionFinder")
);
const About = lazy(() => import("./pages/About/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

// CUSTOM COMPONENTS
import PrivacyNotice from "./components/PrivacyNotice/PrivacyNotice";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";
import KcalStats from "./components/KcalStats/KcalStats";
import KcalCalculatorForm from "./components/KcalCalculatorForm/KcalCalculatorForm";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";

function App() {
  return (
    <Provider store={store}>
      {/* <MainContextProvider> */}
      <AppWrapper>
        <BrowserRouter>
          {/* Suspense for lazy loading elements to reduce bundle size */}
          <Suspense fallback={<SpinnerFullPage />}>
            <PrivacyNotice />
            <Navbar />
            <MainContent>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      {/*/////--- PROTECTED ROUTES ---/////*/}
                      <Routes>
                        {/* suspense for lazy loading of components */}

                        <Route path="/foodcost" element={<FoodCost />} />
                        <Route
                          path="/kcalCalculator"
                          element={<KcalCalculator />}
                        >
                          {/*/////--- NESTED OF 'kcalCalculator' ---/////*/}

                          {/* <Route index element={<KcalStats />} /> */}

                          <Route path="stats" element={<KcalStats />} />

                          <Route
                            path="calculator"
                            element={<KcalCalculatorForm />}
                          />

                          {/*/////--- FINISHED HERE NESTED OF 'kcalCalculator' ---/////*/}
                        </Route>
                        <Route
                          path="/recipescaler"
                          element={<RecipeScaler />}
                        />
                        <Route
                          path="/unitconverter"
                          element={<UnitConverter />}
                        />

                        <Route
                          path="/nutritionfinder"
                          element={<NutritionFinder />}
                        />
                        <Route path="/about" element={<About />} />

                        <Route path="*" element={<PageNotFound />} />
                      </Routes>

                      {/*/////--- FINISHED HERE PROTECTED ROUTES ---/////*/}
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainContent>
          </Suspense>
        </BrowserRouter>
      </AppWrapper>
      {/* </MainContextProvider> */}
    </Provider>
  );
}

export default App;
