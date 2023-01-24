import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import authReducer from "./state";
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {

  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';

const store = configureStore({
  reducer: persistReducer, 
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({

    serializeableCheck: {

ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER]

    }
  })
  
});

   


const persistConfig = { key: "root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>

    <App />

    </PersistGate>
   </Provider>
  </React.StrictMode>
);


