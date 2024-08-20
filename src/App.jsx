// EXTERNAL LIBRARIES
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import Settings from "./pages/Settings/Settings";

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
                element: <Settings />,
                path: "/settings",
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
    // Redux
    <Provider store={store}>
      <Suspense fallback={<SpinnerFullPage />}>
        {/* React Router */}
        <RouterProvider router={router} />
        {/* Toaster = react-hot-toast */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          containerClassName="toasterContainer"
          toastOptions={{
            className: "toast",
            duration: 5000,
          }}
        />
      </Suspense>
    </Provider>
  );
}

export default App;
