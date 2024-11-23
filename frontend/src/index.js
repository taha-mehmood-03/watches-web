import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from './components/SIDEBAR-data/Allmanagement/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';




ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
         
            <App />
          
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();