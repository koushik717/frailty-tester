// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App.jsx";
import "./assets/styles/index.css";
import "./styles/brand.css";
import { BrowserRouter } from "react-router-dom";

async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK === 'true' || window.location.hostname.includes('vercel.app')) {
    try {
      const { worker } = await import('./mocks/browser');
      // Start the worker
      return worker.start({
        onUnhandledRequest: 'bypass',
      });
    } catch (e) {
      console.error('Failed to start mock worker:', e);
    }
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});
