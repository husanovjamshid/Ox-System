import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootTokenReducer } from "./rootReducer";

export const store = createStore(
  rootTokenReducer,
  composeWithDevTools(applyMiddleware(thunk))
);