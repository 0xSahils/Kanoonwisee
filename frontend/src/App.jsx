import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<JusticiaHomepage />} />
            <Route path="/old-landing" element={<Landing />} />

            {/* Public Routes */}
            <Route path="/search-lawyers" element={<LawyerSearch />} />
            <Route path="/lawyer-profile/:id" element={<PublicLawyerProfile />} />
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
            <Route path="/my-appointments" element={<MyAppointments />} />

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

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
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
