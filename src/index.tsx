import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ColorModeScript } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { Provider } from "react-redux";
import { LoadCurrentUser } from "./store/store";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      throw new Error("Server is down");
      // redirect to 500 page, but for now throw an Error
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("You are bad ass");
    }
  }
);

let store: any = null;

LoadCurrentUser()
  .then((createdStore: any) => {
    store = createdStore;
  })
  .finally(() => {
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <ColorModeScript />
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
