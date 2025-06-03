// Import necessary components and functions from react-router-dom
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { ContactSubmit } from "./pages/ContactSubmit";
import { SingleContact } from "./pages/SingleContact";
import { UpdateContact } from "./pages/UpdateContact";
import { useEffect } from "react";
import useGlobalReducer from "./hooks/useGlobalReducer.jsx";

// Error page for invalid routes
const ErrorPage = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

// Fetch contact list on application load
const getData = async (dispatch) => {
  try {
    const response = await fetch("https://playground.4geeks.com/contact/agendas/drew/contacts");
    if (!response.ok) throw new Error("Failed to retrieve contacts");
    const data = await response.json();

    dispatch({ type: "set-contact-list", payload: Array.isArray(data) ? data : [] });
    localStorage.setItem("contacts", JSON.stringify(data)); // Persist in local storage
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

const AppInitializer = () => {
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    getData(dispatch);
  }, [dispatch]);

  return null;
};

// Define routes
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="single/:theId" element={<Single />} /> {/* Dynamic route for single items */}
      <Route path="demo" element={<Demo />} />
      <Route path="contacts" element={<ContactSubmit />} />
      <Route path="contact/:id" element={<SingleContact />} />
      <Route path="update-contact/:id" element={<UpdateContact />} />
    </Route>
  )
);
