import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import AuthProvider from "./components/auth/AuthProvider";

// Landing Page
import Landing from "./pages/Landing";
import JusticiaHomepage from "./pages/JusticiaHomepage";
import LawyerInvitation from "./pages/LawyerInvitation";
import Articles from "./pages/ArticlesNew";
import ArticleDetail from "./pages/ArticleDetail";
import LegalServices from "./pages/LegalServices";
import LegalCalculators from "./pages/LegalCalculators";
import DocumentTemplates from "./pages/DocumentTemplates";
import LegalFAQs from "./pages/LegalFAQs";
import LawyerSearch from "./pages/LawyerSearch";

// Business Services Pages
import BusinessServices from "./pages/BusinessServices";
import BusinessSetup from "./pages/BusinessSetup";
import TrademarkIP from "./pages/TrademarkIP";
import TrademarkServices from "./pages/TrademarkServices";
import PatentServices from "./pages/PatentServices";
import CopyrightServices from "./pages/CopyrightServices";
import DesignRegistration from "./pages/DesignRegistration";
import StartupLegalKit from "./pages/StartupLegalKit";
import NewStartupLegalKit from "./pages/NewStartupLegalKit";
import VirtualLegalOfficer from "./pages/VirtualLegalOfficer";
import CompliancePackage from "./pages/CompliancePackage";
import PrivateLimitedRegistration from "./pages/PrivateLimitedRegistration";
import LLPRegistration from "./pages/LLPRegistration";
import OPCRegistration from "./pages/OPCRegistration";
import SoleProprietorshipRegistration from "./pages/SoleProprietorshipRegistration";
import NidhiCompanyRegistration from "./pages/NidhiCompanyRegistration";
import PartnershipFirmRegistration from "./pages/PartnershipFirmRegistration";

// Compliance Pages
import GSTCompliance from "./pages/GSTCompliance";
import AnnualCorporateCompliance from "./pages/AnnualCorporateCompliance";
import AnnualLLPCompliance from "./pages/AnnualLLPCompliance";
import AccountingTaxServices from "./pages/AccountingTaxServices";
import LabourLawCompliance from "./pages/LabourLawCompliance";
import POSHCompliance from "./pages/POSHCompliance";
import BusinessChangesUpdates from "./pages/BusinessChangesUpdates";

// Resources Pages
import KanoonwiseAcademy from "./pages/KanoonwiseAcademy";
import LegalInsights from "./pages/LegalInsights";
import AboutUs from "./pages/AboutUs";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

// E-Stamp Pages
import StampLandingPage from "./pages/stamps/StampLandingPage";
import StampWizard from "./pages/stamps/StampWizard";
import StampCheckout from "./pages/stamps/StampCheckout";
import StampSuccess from "./pages/stamps/StampSuccess";

// Auth Pages
import Login from "./features/auth/Login";

// Lawyer Pages
import LawyerDashboard from "./pages/lawyer/Dashboard";
import LawyerProfile from "./pages/lawyer/Profile";
import LawyerCalendar from "./pages/lawyer/Calendar";
import LawyerAppointments from "./pages/lawyer/Appointments";

// Client Pages
import ClientDashboard from "./pages/client/Dashboard";
import ClientSearch from "./pages/client/Search";
import ClientAppointments from "./pages/client/Appointments";
import ClientReviews from "./pages/client/Reviews";
import ClientProfile from "./pages/client/Profile";
import ClientLawyerProfile from "./pages/client/LawyerProfile";
import BookAppointment from "./pages/client/BookAppointment";
import SimpleBooking from "./pages/client/SimpleBooking";
import QuickBooking from "./pages/QuickBooking";
import MyAppointments from "./pages/MyAppointments";
import PublicLawyerProfile from "./pages/PublicLawyerProfile";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminLawyers from "./pages/admin/Lawyers";
import AdminStampOrders from "./pages/admin/StampOrders";
import AdminStampTemplates from "./pages/admin/StampTemplates";
import { CMSManagement } from "./pages/admin";

// Diagnostic Components
import PaymentDiagnostic from "./components/PaymentDiagnostic";

// Payment Pages
import PublicPaymentSuccess from "./pages/public/PublicPaymentSuccess";
import GrievanceBanner from "./components/landing/GrievanceBanner";
import DisclaimerBlocked from "./pages/DisclaimerBlocked";

// Global disclaimer modal behavior
const GlobalDisclaimer = ({ children }) => {
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const forceShow = params.get("showDisclaimer") === "1" || params.get("forceDisclaimer") === "1";
      const disclaimerAccepted = localStorage.getItem("disclaimerAccepted");

      if (!disclaimerAccepted || forceShow) {
        // show modal on first load or when forced via query param
        setShowDisclaimerModal(true);
      }
    } catch {
      // fallback: if anything goes wrong, show the modal
      setShowDisclaimerModal(true);
    }

    setInitialized(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setShowDisclaimerModal(false);
  };

  const handleDecline = () => {
    // Persist decline and navigate to blocking page
    try {
      localStorage.setItem("disclaimerDeclined", "true");
    } catch {
      // ignore storage errors
    }
    setShowDisclaimerModal(false);
    // navigate to blocking route
    window.location.href = "/disclaimer-blocked";
  };

  // Only render children after initialization to avoid layout shift
  if (!initialized) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      {children}
      {/* Render modal on top of app when needed */}
      {showDisclaimerModal && (
        // import the modal lazily to avoid circular imports
        <React.Suspense fallback={null}>
          <LazyDisclaimerModal isOpen={showDisclaimerModal} onAccept={handleAccept} onDecline={handleDecline} centerAt={0.5} />
        </React.Suspense>
      )}
    </>
  );
};

// Lazy import disclaimer modal to prevent circular dependency risks
const LazyDisclaimerModal = React.lazy(() => import('./components/modals/DisclaimerModal'));

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <GrievanceBanner />
          <GlobalDisclaimer>
          <Routes>
            {/* Legal Pages */}
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            {/* Landing Page */}
            <Route path="/" element={<JusticiaHomepage />} />
            <Route path="/old-landing" element={<Landing />} />

            {/* Public Routes */}
            <Route path="/search-lawyers" element={<LawyerSearch />} />
            <Route
              path="/lawyer-profile/:id"
              element={<PublicLawyerProfile />}
            />
            <Route
              path="/book-consultation/:lawyerId"
              element={<SimpleBooking />}
            />
            <Route path="/quick-book/:lawyerId" element={<QuickBooking />} />
            <Route path="/quick-booking" element={<QuickBooking />} />
            <Route path="/join-as-lawyer" element={<LawyerInvitation />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/legal-services" element={<LegalServices />} />
            <Route path="/legal-calculators" element={<LegalCalculators />} />
            <Route path="/document-templates" element={<DocumentTemplates />} />
            <Route path="/legal-faqs" element={<LegalFAQs />} />
            
            {/* Diagnostic Routes */}
            <Route path="/payment-diagnostic" element={<PaymentDiagnostic />} />
            <Route path="/payment-success" element={<PublicPaymentSuccess />} />
            
            <Route
              path="/my-appointments"
              element={
                <ProtectedRoute>
                  <MyAppointments />
                </ProtectedRoute>
              }
            />

            {/* Business Services Routes */}
            <Route path="/business-services" element={<BusinessServices />} />
            <Route path="/business-setup" element={<BusinessSetup />} />
            <Route path="/trademark-ip" element={<TrademarkIP />} />

            {/* E-Stamp Routes */}
            <Route path="/stamps" element={<StampLandingPage />} />
            <Route path="/stamps/order" element={<StampWizard />} />
            <Route path="/stamps/checkout/:orderId" element={<StampCheckout />} />
            <Route path="/stamps/success/:orderId" element={<StampSuccess />} />

            <Route path="/trademark-services" element={<TrademarkServices />} />
            <Route path="/patent-services" element={<PatentServices />} />
            <Route path="/copyright-services" element={<CopyrightServices />} />
            <Route
              path="/design-registration"
              element={<DesignRegistration />}
            />
            <Route path="/startup-legal-kit" element={<NewStartupLegalKit />} />
            <Route
              path="/virtual-legal-officer"
              element={<VirtualLegalOfficer />}
            />
            <Route path="/compliance-package" element={<CompliancePackage />} />
            <Route
              path="/private-limited-registration"
              element={<PrivateLimitedRegistration />}
            />
            <Route path="/llp-registration" element={<LLPRegistration />} />
            <Route path="/opc-registration" element={<OPCRegistration />} />
            <Route
              path="/sole-proprietorship-registration"
              element={<SoleProprietorshipRegistration />}
            />
            <Route
              path="/nidhi-company-registration"
              element={<NidhiCompanyRegistration />}
            />
            <Route
              path="/partnership-firm-registration"
              element={<PartnershipFirmRegistration />}
            />

            {/* Compliance Routes */}
            <Route path="/gst-compliance" element={<GSTCompliance />} />
            <Route
              path="/annual-corporate-compliance"
              element={<AnnualCorporateCompliance />}
            />
            <Route
              path="/annual-llp-compliance"
              element={<AnnualLLPCompliance />}
            />
            <Route
              path="/accounting-tax-services"
              element={<AccountingTaxServices />}
            />
            <Route
              path="/labour-law-compliance"
              element={<LabourLawCompliance />}
            />
            <Route path="/posh-compliance" element={<POSHCompliance />} />
            <Route
              path="/business-changes-updates"
              element={<BusinessChangesUpdates />}
            />

            {/* Resources Routes */}
            <Route path="/academy" element={<KanoonwiseAcademy />} />
            <Route path="/legal-insights" element={<LegalInsights />} />
            <Route path="/about-us" element={<AboutUs />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />

            {/* Lawyer Routes */}
            <Route
              path="/lawyer/dashboard"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="lawyer">
                    <LawyerDashboard />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/lawyer/profile"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="lawyer">
                    <LawyerProfile />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/lawyer/calendar"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="lawyer">
                    <LawyerCalendar />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/lawyer/appointments"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="lawyer">
                    <LawyerAppointments />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* Client Routes */}
            <Route
              path="/client/dashboard"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="client">
                    <ClientDashboard />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/client/search"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="client">
                    <ClientSearch />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/client/appointments"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="client">
                    <ClientAppointments />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/client/reviews"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="client">
                    <ClientReviews />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/client/profile"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="client">
                    <ClientProfile />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/client/lawyers/:id"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="client">
                    <ClientLawyerProfile />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/client/book"
              element={
                <Layout>
                  <ProtectedRoute requiredRole="client">
                    <BookAppointment />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/panel"
              element={
                <AdminLayout>
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                </AdminLayout>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminLayout>
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                </AdminLayout>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminLayout>
                  <ProtectedRoute requiredRole="admin">
                    <AdminUsers />
                  </ProtectedRoute>
                </AdminLayout>
              }
            />
            <Route
              path="/admin/lawyers"
              element={
                <AdminLayout>
                  <ProtectedRoute requiredRole="admin">
                    <AdminLawyers />
                  </ProtectedRoute>
                </AdminLayout>
              }
            />
            <Route
              path="/admin/stamp-orders"
              element={
                <AdminLayout>
                  <ProtectedRoute requiredRole="admin">
                    <AdminStampOrders />
                  </ProtectedRoute>
                </AdminLayout>
              }
            />
            <Route
              path="/admin/stamp-templates"
              element={
                <AdminLayout>
                  <ProtectedRoute requiredRole="admin">
                    <AdminStampTemplates />
                  </ProtectedRoute>
                </AdminLayout>
              }
            />
            <Route
              path="/admin/cms"
              element={
                <AdminLayout>
                  <ProtectedRoute requiredRole="admin">
                    <CMSManagement />
                  </ProtectedRoute>
                </AdminLayout>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </GlobalDisclaimer>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
