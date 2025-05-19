import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Car className="h-20 w-20 text-orange-500" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page non trouvée</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          La page que vous recherchez semble avoir pris un détour. Retournez à l'accueil pour reprendre votre route.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center px-6 py-3">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;