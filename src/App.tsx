import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "@Components/Home";
import Bedroom from "@Components/Bedroom";
import Kitchen from "@Components/Kitchen";
import LivingAreas from "@Components/LivingAreas";
import PoojaRoom from "@Components/PoojaRoom";
import Washroom from "@Components/Washroom";
import DownCeiling from "@Components/DownCeiling";
import Theater from "@Components/Theater";
import Dining from "@Components/Dining";
import ResidentialExterior from "@Components/ResidentialExterior";
import CommercialExterior from "@Components/CommercialExterior";
import ClassicalExterior from "@Components/ClassicalExterior";
import Contact from "@Components/Contact";
import CommercialInterior from "@Components/CommercialInterior";
import TwoDPlanning from "@Components/TwoDPlanning";
import ThreeDPlanning from "@Components/ThreeDPlanning";
import TerraceGardern from "@Components/TerraceGardern";
import Projects from "@Components/Projects";
import NotFound from "@Components/NotFound";
import RequireAdmin from "@Components/ADMIN/RequireAdmin";
import AdminHome from "@Components/ADMIN/AdminHome";
import ChangePassword from "@Components/ADMIN/ChangePassword";
import AdminProjectUpload from "@Components/ADMIN/AdminProjectUpload";
import ContactForm from "@Components/ADMIN/ContactForm";

/** Reset scroll on route change (unless navigating to an in-page hash). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const routes = [
  { path: "/Bedroom", element: <Bedroom /> },
  { path: "/Kitchen", element: <Kitchen /> },
  { path: "/Living-area", element: <LivingAreas /> },
  { path: "/Pooja-Room", element: <PoojaRoom /> },
  { path: "/Washroom", element: <Washroom /> },
  { path: "/Down-Ceiling", element: <DownCeiling /> },
  { path: "/Theater", element: <Theater /> },
  { path: "/Dining", element: <Dining /> },
  { path: "/Residential-Exterior", element: <ResidentialExterior /> },
  { path: "/Commercial-Exterior", element: <CommercialExterior /> },
  { path: "/Classical-Exterior", element: <ClassicalExterior /> },
  { path: "/2d-Planning", element: <TwoDPlanning /> },
  { path: "/3D-Planning", element: <ThreeDPlanning /> },
  { path: "/TerraceGarden", element: <TerraceGardern /> },
  { path: "/Projects", element: <Projects /> },
  { path: "/Contact", element: <Contact /> },
  { path: "/CommercialInterior", element: <CommercialInterior /> },

  // Admin: every page is behind the login gate (signed out -> login form).
  { path: "/admin", element: <RequireAdmin><AdminHome /></RequireAdmin> },
  { path: "/admin/projects", element: <RequireAdmin><AdminProjectUpload /></RequireAdmin> },
  { path: "/admin/enquiries", element: <RequireAdmin><ContactForm /></RequireAdmin> },
  { path: "/admin/password", element: <RequireAdmin><ChangePassword /></RequireAdmin> },

  // Old admin addresses keep working.
  { path: "/Admin-login", element: <Navigate to="/admin" replace /> },
  { path: "/ProjectUpload", element: <Navigate to="/admin/projects" replace /> },
  { path: "/Contact-Form", element: <Navigate to="/admin/enquiries" replace /> },
  { path: "/ChangePassword", element: <Navigate to="/admin/password" replace /> },
];

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      offset: 60,
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {routes.map((item) => (
          <Route path={item.path} element={item.element} key={item.path} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
