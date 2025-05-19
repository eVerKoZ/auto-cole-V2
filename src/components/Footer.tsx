import React from 'react';
import { Car, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-white">Auto École Dijon</span>
            </div>
            <p className="mt-2 text-sm">
              Votre partenaire de confiance pour obtenir votre permis de conduire en toute sécurité.
            </p>
            <div className="flex mt-4 space-x-3">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-orange-500 transition-colors">Forfaits</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-orange-500 transition-colors">Connexion</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                <span>123 Rue de la Liberté<br/>21000 Dijon, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2" />
                <span>+33 3 80 12 34 56</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2" />
                <span>contact@autoecole-dijon.fr</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Heures d'Ouverture</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Lundi - Vendredi:</span>
                <span>9h00 - 19h00</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi:</span>
                <span>9h00 - 17h00</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche:</span>
                <span>Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Auto École Dijon. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;