import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Summary } from "./pages/Summary/Summary";
import { Exercise } from "./pages/Exercise/Exercise";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Food } from "./pages/Food/Food";
import { Goal } from "./pages/Goal/Goal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Summary /> },
      { path: "/exercise", element: <Exercise /> },
      { path: "/food", element: <Food /> },
      { path: "/goal", element: <Goal /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
