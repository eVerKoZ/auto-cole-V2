import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Calendar, Package, Phone, ClipboardList } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import Logo from '../ui/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isAuthenticated, logout } = useUser();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-bold text-secondary-900">Auto Ecole Dijon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/packages" className="nav-link">Forfaits</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <span>{currentUser?.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl z-20 animate-fadeIn">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Mon profil
                    </Link>
                    <Link to="/calendar" className="block px-4 py-2 hover:bg-gray-100">
                      Calendrier
                    </Link>
                    <Link to="/reservations" className="block px-4 py-2 hover:bg-gray-100">
                      Mes réservations
                    </Link>
                    <Link to="/past-lessons" className="block px-4 py-2 hover:bg-gray-100">
                      Heures passées
                    </Link>
                    {currentUser?.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">
                        Administration
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="mobile-nav-link">
                Accueil
              </Link>
              <Link to="/packages" className="mobile-nav-link">
                Forfaits
              </Link>
              <Link to="/contact" className="mobile-nav-link">
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <hr className="border-gray-200 my-1" />
                  <Link to="/profile" className="mobile-nav-link flex items-center">
                    <User size={18} className="mr-2" />
                    Mon profil
                  </Link>
                  <Link to="/calendar" className="mobile-nav-link flex items-center">
                    <Calendar size={18} className="mr-2" />
                    Calendrier
                  </Link>
                  <Link to="/reservations" className="mobile-nav-link flex items-center">
                    <ClipboardList size={18} className="mr-2" />
                    Mes réservations
                  </Link>
                  <Link to="/past-lessons" className="mobile-nav-link flex items-center">
                    <Package size={18} className="mr-2" />
                    Heures passées
                  </Link>
                  {currentUser?.role === 'admin' && (
                    <Link to="/admin" className="mobile-nav-link">
                      Administration
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn-primary mt-2 text-center">
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;