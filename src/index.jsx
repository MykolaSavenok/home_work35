import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './store.js';


import './index.scss'
import App from "./App.jsx";

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);


root.render(
   <Provider store={store}> 
      <App />
   </Provider>
);