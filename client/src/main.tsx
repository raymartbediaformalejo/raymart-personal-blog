import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { store } from "./redux/index.ts";
import { Analytics } from "@vercel/analytics/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/errors/ErrorFallback.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(26, 90%, 40%)",
    },
    // secondary: {
    //   main: "#264653",
    // },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) =>
          console.log(`💥 Error occured! ${error} : ${errorInfo}`)
        }
      >
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
    <Analytics />
  </>
);
