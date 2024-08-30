import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider, AuthContext } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ErrorPage from "./error-page.jsx";

import Index from "./pages/Index/index.jsx";
import Login from "./pages/Login/Login.jsx";
import PostForm from "./pages/PostForm/PostForm.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Register from "./pages/Register/Register.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Update from "./pages/Update/Update.jsx";
import Search from "./pages/Search/Search.jsx";
import ViewDetails from "./pages/ViewDetails/ViewDetails.jsx";


const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("Current User:", currentUser); // Add this line for debugging
  if (!currentUser) {
    return <Navigate to= "/login" />;
  }

  return children;
};

//routing
const router = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/new",
        element: (
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        ),
      },
      { path: "posts/:id", element: <ViewDetails /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        ),
      },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        ),
      },
      {
        path: "view/:id",
        element: (
          <ProtectedRoute>
            <ViewDetails />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);