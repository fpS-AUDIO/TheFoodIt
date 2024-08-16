// EXTERNAL LIBRARIES
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// REDUX (TOOLKIT)
import { Provider } from "react-redux";
import store from "./store/store";

// CUSTOM PAGE COMPONENTS
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import Homepage from "./pages/Homepage/Homepage";

// LAZY LOADING PAGES
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
import AppLayout from "./components/AppLayout/AppLayout";
import MainContent from "./components/MainContent/MainContent";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";

// CUSTOM FEATURE COMPONENTS
import KcalStats from "./features/KcalCalculator/KcalStats/KcalStats";
import KcalCalculatorForm from "./features/KcalCalculator/KcalCalculatorForm/KcalCalculatorForm";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <MainContent />,
        children: [
          {
            element: <Homepage />,
            path: "/",
          },
          {
            element: <PrivacyPolicy />,
            path: "/privacyPolicy",
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                element: <FoodCost />,
                path: "/foodcost",
              },
              {
                element: <KcalCalculator />,
                path: "/kcalCalculator",
                children: [
                  {
                    element: <KcalStats />,
                    path: "/kcalCalculator/stats",
                  },
                  {
                    element: <KcalCalculatorForm />,
                    path: "/kcalCalculator/calculator",
                  },
                ],
              },
              {
                element: <RecipeScaler />,
                path: "/recipescaler",
              },
              {
                element: <UnitConverter />,
                path: "/unitconverter",
              },
              {
                element: <NutritionFinder />,
                path: "/nutritionfinder",
              },
              {
                element: <About />,
                path: "/about",
              },
              {
                element: <PageNotFound />,
                path: "*",
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<SpinnerFullPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
