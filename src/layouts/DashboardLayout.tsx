import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { 
  Car, 
  User, 
  Calendar, 
  FileText, 
  Package, 
  LogOut, 
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const getNavLinks = () => {
    const links = [
      { name: 'Calendrier', path: '/dashboard/calendar', icon: <Calendar className="w-5 h-5" /> },
      { name: 'Réservations', path: '/dashboard/reservations', icon: <FileText className="w-5 h-5" /> },
      { name: 'Informations Personnelles', path: '/dashboard/personal-info', icon: <User className="w-5 h-5" /> },
      { name: 'Mon Compte', path: '/dashboard/account', icon: <Settings className="w-5 h-5" /> },
      { name: 'Heures Passées', path: '/dashboard/past-lessons', icon: <FileText className="w-5 h-5" /> },
    ];

    // Add admin link for admin users
    if (user.role === UserRole.ADMIN) {
      links.push({ name: 'Administration', path: '/dashboard/admin', icon: <Settings className="w-5 h-5" /> });
    }

    return links;
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm py-2 px-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 rounded-md text-gray-900"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="ml-2 flex items-center">
              <Car className="h-6 w-6 text-orange-500" />
              <span className="ml-2 font-semibold text-lg">Auto École Dijon</span>
            </div>
          </div>
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="p-2 text-gray-600 hover:text-orange-500"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Sidebar - Mobile (Overlay) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <Car className="h-6 w-6 text-orange-500" />
                <span className="ml-2 font-semibold">Auto École Dijon</span>
              </div>
            </div>
            <nav className="p-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center py-2 px-3 rounded-md my-1 ${
                      isActive 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.name}</span>
                </NavLink>
              ))}
              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center w-full py-2 px-3 rounded-md my-1 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Déconnexion</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Desktop (Fixed) */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="w-64 flex flex-col border-r border-gray-200 bg-white">
            <div className="flex-shrink-0 px-4 py-4 flex items-center border-b border-gray-200">
              <Car className="h-6 w-6 text-orange-500" />
              <span className="ml-2 text-lg font-semibold">Auto École Dijon</span>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex-1 flex flex-col overflow-y-auto pt-3 pb-4">
              <nav className="mt-2 flex-1 px-2 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => 
                      `flex items-center py-2 px-3 rounded-md ${
                        isActive 
                          ? 'bg-orange-100 text-orange-600' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`
                    }
                  >
                    <span className="mr-3">{link.icon}</span>
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </nav>

              {/* User Section */}
              <div className="px-3 mt-auto">
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="mt-3 w-full flex items-center justify-center px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;