import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./CombineReducer";
import thunk from "redux-thunk";
import "./Bootstrap/css/sb-admin-2.css";
import "./Bootstrap/vendor/fontawesome-free/css/all.min.css";
import "./Bootstrap/css/custom.css";
import "./Bootstrap/css/datatable.css";
// import '../src/css/sb-admin-2.min.css'
// import '../src/vendor/fontawesome-free/css/all.min.css'
const middleware = [thunk];
const initialState = {};
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true
      })
    : compose;

// function saveToLocalStorage(state){
//   try{
//     const serializedState=JSON.stringify(state)
//     localStorage.setItem('state',serializedState)
//   }catch(e){
//     console.log(e)
//   }
// }

// function loadFromLocalStorage(){
//   try{
//     const serializedState=localStorage.getItem('state');
//     if(serializedState=== null) return undefined;
//     return JSON.parse(serializedState)
//   }catch(e){
//     console.log(e);
//     return undefined
//   }
// }

// const persistedState=loadFromLocalStorage();
// console.log(persistedState)

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

// store.subscribe(()=>saveToLocalStorage(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
