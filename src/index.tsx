import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import "./i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { defaultErrorHandler } from "./apis/utils";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
      onError: defaultErrorHandler,
    },
    mutations: {
      retry: false,
      onError: defaultErrorHandler,
    },
  },
});

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
