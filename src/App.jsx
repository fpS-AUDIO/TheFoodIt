// EXTERNAL LIBRARIES
// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONTEXTS
import { MainContextProvider } from "./contexts/MainContext";

// CUSTOM PAGE COMPONENTS
import Homepage from "./pages/Homepage/Homepage";
import KcalCalculator from "./pages/KcalCalculator/KcalCalculator";
import IngredientsConverter from "./pages/IngredientsConverter/IngredientsConverter";
import FoodCostCalculator from "./pages/FoodCostCalculator/FoodCostCalculator";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

// CUSTOM COMPONENTS
import PrivacyNotice from "./components/PrivacyNotice/PrivacyNotice";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";

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
              <Route path="/kcalCalculator" element={<KcalCalculator />} />
              <Route path="/converter" element={<IngredientsConverter />} />
              <Route path="/foodcost" element={<FoodCostCalculator />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </MainContent>
        </BrowserRouter>
      </AppWrapper>
    </MainContextProvider>
  );
}

export default App;
