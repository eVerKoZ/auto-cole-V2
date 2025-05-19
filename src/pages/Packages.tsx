import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { packages } from '../data/mockData';
import { useUser } from '../context/UserContext';

const Packages: React.FC = () => {
  const { isAuthenticated } = useUser();

  // Update page title
  useEffect(() => {
    document.title = 'Auto Ecole Dijon - Forfaits';
  }, []);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Forfaits</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Choisissez le forfait qui correspond à vos besoins pour obtenir votre permis de conduire
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 ${
                  pkg.isPopular ? 'border-2 border-primary-500 relative' : ''
                }`}
              >
                {pkg.isPopular && (
                  <div className="bg-primary-500 text-white text-sm font-semibold py-1 px-4 absolute top-0 right-0 rounded-bl-lg">
                    POPULAIRE
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold">{pkg.price}€</span>
                    {pkg.hours > 0 ? (
                      <span className="text-gray-500 ml-2">/ {pkg.hours} heures</span>
                    ) : null}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-primary-500 mr-2 flex-shrink-0 mt-1" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={isAuthenticated ? `/profile?package=${pkg.id}` : '/login'}
                    className={`block w-full py-3 px-4 text-center rounded-lg font-medium transition-colors ${
                      pkg.isPopular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-secondary-900'
                    }`}
                  >
                    {isAuthenticated ? 'Sélectionner' : 'Connexion pour acheter'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Questions Fréquentes</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">Comment choisir le bon forfait ?</h3>
                <p className="text-gray-600">
                  Si vous n'avez pas encore passé votre code, optez pour le forfait complet. Si vous avez déjà votre code, le forfait conduite est idéal. Pour les personnes ayant besoin de plus d'heures, le pack d'heures supplémentaires est la solution.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">Les forfaits sont-ils modulables ?</h3>
                <p className="text-gray-600">
                  Oui, vous pouvez ajouter des heures supplémentaires à tout moment si vous sentez que vous avez besoin de plus de pratique avant l'examen.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">Puis-je changer de moniteur ?</h3>
                <p className="text-gray-600">
                  Oui, vous pouvez demander à changer de moniteur à tout moment si vous le souhaitez, sous réserve de disponibilité.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">Comment sont organisées les leçons ?</h3>
                <p className="text-gray-600">
                  Les leçons durent généralement 1 heure et sont programmées selon vos disponibilités et celles des moniteurs. Vous pouvez réserver vos heures via notre plateforme en ligne.
                </p>
              </div>
              
              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-2">Les prix incluent-ils les frais d'examen ?</h3>
                <p className="text-gray-600">
                  Non, les frais d'inscription aux examens du code et de conduite sont à régler séparément auprès de l'administration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre formation ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Inscrivez-vous dès maintenant et commencez votre apprentissage avec Auto Ecole Dijon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100">
              S'inscrire
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;