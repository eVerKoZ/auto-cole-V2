import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <Logo color="white" />
              <span className="ml-2 text-xl font-bold">Auto Ecole Dijon</span>
            </div>
            <p className="text-gray-300 mb-4">
              Votre succès sur la route commence avec nous. Une auto-école 
              professionnelle à Dijon qui met l'accent sur la qualité de 
              l'enseignement et la sécurité.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Nos Forfaits
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Calendrier
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Espace Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Avenue de la Liberté, 21000 Dijon</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-300">03 80 12 34 56</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-500 mr-2 flex-shrink-0" />
                <a href="mailto:contact@autoecole-dijon.fr" className="text-gray-300 hover:text-primary-500 transition-colors">
                  contact@autoecole-dijon.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Horaires d'ouverture</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock size={20} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Lundi - Vendredi</p>
                  <p className="text-gray-400">9h00 - 19h00</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Samedi</p>
                  <p className="text-gray-400">9h00 - 17h00</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Dimanche</p>
                  <p className="text-gray-400">Fermé</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Auto Ecole Dijon. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;