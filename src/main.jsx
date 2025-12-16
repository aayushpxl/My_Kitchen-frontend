import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from "./routers/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>
);
