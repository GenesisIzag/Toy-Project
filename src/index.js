/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { store } from "./store"
import { Provider } from "react-redux";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  <Provider store={store}>
    <SoftUIControllerProvider>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>
);
