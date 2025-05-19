import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole } from '../types';
import { Check, X, HelpCircle, AlertTriangle } from 'lucide-react';

const PackagesPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { packages, purchasePackage } = useData();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState('');

  const handlePurchase = (packageId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setSelectedPackage(packageId);
    setShowModal(true);
  };

  const confirmPurchase = async () => {
    if (!user || !selectedPackage) return;
    
    try {
      setError('');
      setProcessingPayment(true);
      
      const success = await purchasePackage(user.id, selectedPackage);
      
      if (success) {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/dashboard/account');
      } else {
        setError('Une erreur est survenue lors de l\'achat du forfait');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setProcessingPayment(false);
      setShowModal(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Nos Forfaits</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Découvrez nos différentes formules adaptées à vos besoins et à votre budget.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choisissez Votre Formation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des formations complètes et personnalisées pour vous accompagner vers la réussite.
          </p>
        </div>
        
        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-orange-500">{pkg.price}€</span>
                  <span className="text-gray-500 ml-1">/ forfait</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {pkg.type === 'CODE' ? (
                    <>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Accès illimité à la salle de code</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Tests en ligne</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Suivi personnalisé</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Frais d'examen théorique inclus</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{pkg.hours} heures de conduite</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Manuel ou Automatique</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Frais d'examen pratique inclus</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Accès à l'application de réservation</span>
                      </li>
                    </>
                  )}
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    className="btn-primary w-full"
                    disabled={user?.role === UserRole.ADMIN || user?.role === UserRole.INSTRUCTOR}
                  >
                    Acheter ce forfait
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Information */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 text-orange-500" />
              Informations Supplémentaires
            </h3>
            <div className="space-y-4">
              <p>
                <strong>Durée de validité :</strong> Tous nos forfaits sont valables pendant 24 mois à compter de la date d'achat.
              </p>
              <p>
                <strong>Heures supplémentaires :</strong> Si vous avez besoin d'heures de conduite supplémentaires, elles sont disponibles au tarif de 45€/heure.
              </p>
              <p>
                <strong>Modalités de paiement :</strong> Possibilité de payer en 3 ou 4 fois sans frais. Contactez-nous pour plus d'informations.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Confirmer votre achat</h3>
              
              {error && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center mb-4">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>{error}</span>
                </div>
              )}
              
              <p className="mb-6">
                Êtes-vous sûr de vouloir acheter ce forfait ? Votre compte sera mis à jour immédiatement.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-outline flex-1"
                  disabled={processingPayment}
                >
                  Annuler
                </button>
                <button
                  onClick={confirmPurchase}
                  className="btn-primary flex-1 relative"
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </span>
                  ) : (
                    "Confirmer"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;