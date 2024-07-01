// EXTERNAL LIBRARIES
// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONTEXTS
import { MainContextProvider } from "./contexts/MainContext";

// CUSTOM PAGE COMPONENTS
import Homepage from "./pages/Homepage/Homepage";
import KcalCalculator from "./pages/KcalCalculator/KcalCalculator";
import RecipeScaler from "./pages/RecipeScaler/RecipeScaler";
import FoodCostCalculator from "./pages/FoodCostCalculator/FoodCostCalculator";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import About from "./pages/About/About";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

// CUSTOM COMPONENTS
import PrivacyNotice from "./components/PrivacyNotice/PrivacyNotice";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";
import KcalStats from "./components/KcalStats/KcalStats";
import KcalCalculatorForm from "./components/KcalCalculatorForm/KcalCalculatorForm";

function App() {
  return (
    <MainContextProvider>
      <AppWrapper>
        <BrowserRouter>
          <PrivacyNotice />
          <Navbar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    {/*/////--- PROTECTED ROUTES ---/////*/}
                    <Routes>
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
                      <Route path="/recipescaler" element={<RecipeScaler />} />
                      <Route
                        path="/foodcost"
                        element={<FoodCostCalculator />}
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
        </BrowserRouter>
      </AppWrapper>
    </MainContextProvider>
  );
}

export default App;
