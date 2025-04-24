import { Outlet, Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <div className="content">
        <nav>
          <Link to="/contacts">Contact List</Link>
        </nav>
        <Outlet />
      </div>
      <Footer />
    </ScrollToTop>
  );
};
