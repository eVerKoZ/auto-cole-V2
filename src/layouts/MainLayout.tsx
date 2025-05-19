import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Car, Menu, X, User, Phone } from 'lucide-react';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Forfaits', path: '/packages' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                <Car className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">Auto École Dijon</span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <button 
                  onClick={() => navigate('/dashboard/account')}
                  className="btn-primary"
                >
                  <User className="w-4 h-4 mr-2" />
                  Mon Compte
                </button>
              ) : (
                <>
                  <NavLink to="/login" className="btn-outline">
                    Connexion
                  </NavLink>
                  <NavLink to="/register" className="btn-primary">
                    S'inscrire
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-900 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg pb-4">
            <nav className="flex flex-col space-y-3 px-4 pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    isActive ? 'nav-link-active py-2 px-3' : 'nav-link py-2 px-3'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="border-t border-gray-200 my-2 py-2">
                {isAuthenticated ? (
                  <button 
                    onClick={() => {
                      navigate('/dashboard/account');
                      setMobileMenuOpen(false);
                    }}
                    className="btn-primary w-full"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mon Compte
                  </button>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <NavLink 
                      to="/login" 
                      className="btn-outline text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Connexion
                    </NavLink>
                    <NavLink 
                      to="/register" 
                      className="btn-primary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      S'inscrire
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Contact Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <NavLink 
          to="/contact" 
          className="flex items-center justify-center bg-orange-500 text-white rounded-full h-14 w-14 shadow-lg hover:bg-orange-600 transition-colors duration-300"
          title="Nous contacter"
        >
          <Phone className="h-6 w-6" />
        </NavLink>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;