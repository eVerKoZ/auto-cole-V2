import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { UserProvider } from './context/UserContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PackagesPage from './pages/PackagesPage';
import CalendarPage from './pages/CalendarPage';
import ContactPage from './pages/ContactPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import AccountPage from './pages/AccountPage';
import ReservationsPage from './pages/Reservations';
import PastLessonsPage from './pages/PastLessonsPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="packages" element={<PackagesPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Protected Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="personal-info" element={<PersonalInfoPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="past-lessons" element={<PastLessonsPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;