import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { NotificationProvider } from "./contexts/NotificationContext";
import '../src/utils/css/custom.css'
import { UserProvider } from "./contexts/UserContext";
import NearWeLandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import CmsHome from "./cms/cms_home";
import UserManagement from "./cms/pages/UserManagement";
import CategoryManagement from "./cms/pages/CategoryManagement";
import EventManagement from "./cms/pages/EventManagement";
import AppManagement from "./cms/pages/AppManagement";
import InsightsDashboard from "./cms/pages/InsightsDashboard";
import Announcements from "./cms/pages/Announcements";
import ChildSafetyPolicy from "./pages/Child";
import TermsAndConditions from "./pages/Terms";
import ServicesPage from "./pages/Services";
import ServicesAgencyPage from "./pages/companyservices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdvertiseWithUs from "./pages/Advertise";
import Contact from "./pages/Contact";
import Reports from "./cms/pages/Reports";
import UserInterestDetail from "./cms/pages/Interest";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <Router>
            <Layout className="min-h-screen bg-bg1">
              <Layout.Content>
                <Routes>
                  <Route
                    path="/cms"
                    element={
                      <ProtectedRoute>
                        <CmsHome />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/cms/insights" replace />} />

                    {/* INSIGHTS */}
                    <Route path="insights" element={<InsightsDashboard />} />

                    {/* EXISTING */}
                    <Route path="users" element={<UserManagement />} />
                    <Route path="categories" element={<CategoryManagement />} />
                    <Route path="events" element={<EventManagement />} />
                    <Route path="app" element={<AppManagement />} />
                    <Route path="announcements" element={<Announcements />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="interests" element={<UserInterestDetail />} />
                  </Route>
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/companyservices" element={<ServicesAgencyPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/advertise" element={<AdvertiseWithUs />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/child-safety" element={<ChildSafetyPolicy />} />
                  <Route path="/cms/login" element={<Login />} />
                  <Route
                    path="/"
                    element={<NearWeLandingPage />}
                  />
                  
                </Routes>
              </Layout.Content>
            </Layout>
          </Router>
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;