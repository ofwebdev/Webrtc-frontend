import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/room/:id",
//     element: <Room />,
//   },
//   {
//     path: "*",
//     element: <h1 className="align-center">404 page</h1>,
//   },
// ]);

import { RoomProvider } from "./context/RoomContext";
// import Home from "./page/Home.tsx";
// import Room from "./page/Room.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <App />
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>
);
