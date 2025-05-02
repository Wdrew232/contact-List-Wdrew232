// Import necessary components and functions from react-router-dom
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { ContactSubmit } from "./pages/ContactSubmit";
import { SingleContact } from "./pages/SingleContact";
import { UpdateContact } from "./pages/UpdateContact";

const ErrorPage = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);
const getData = async () => {
  const data = await handleFetch(
    "https://playground.4geeks.com/contact/agendas/username/contacts"
  );

  if (data) {
    dispatch({
      type: "set-contact-list",
      payload: Array.isArray(data) ? data : [],
    });
  }
};

useEffect(() => {
  getData();
}, []);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} /> {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/contacts" element={<ContactSubmit />} />
      <Route path="/contact/:id" element={<SingleContact />} />
      <Route path="/update-contact/:id" element={<UpdateContact />} />
    </Route>
  )
);
