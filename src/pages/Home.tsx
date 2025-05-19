import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Clock, BookOpen, Users, Star } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useUser();

  useEffect(() => {
    document.title = 'Auto Ecole Dijon - Accueil';
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center bg-gradient-to-r from-secondary-900 to-secondary-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Driving lessons" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white animate-slideUp">
              Votre Réussite au Volant Commence Ici
            </h1>
            <p className="text-xl mb-8 text-gray-200 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Formation de qualité, moniteurs expérimentés et accompagnement personnalisé pour obtenir votre permis en toute confiance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <Link to="/packages" className="btn-primary text-center">
                Voir nos Forfaits
              </Link>
              <Link to="/contact" className="btn-outline text-white border-white hover:bg-white hover:text-secondary-900 text-center">
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi Choisir Auto Ecole Dijon ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre auto-école se distingue par la qualité de son enseignement et son approche personnalisée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                <Shield className="text-primary-600" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Formation de Qualité</h3>
              <p className="text-gray-600 text-center">
                Notre programme d'enseignement complet vous prépare efficacement à l'examen du permis de conduire.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                <Award className="text-primary-600" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Moniteurs Expérimentés</h3>
              <p className="text-gray-600 text-center">
                Nos instructeurs certifiés ont des années d'expérience et un taux de réussite élevé.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                <Clock className="text-primary-600" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Horaires Flexibles</h3>
              <p className="text-gray-600 text-center">
                Réservez vos leçons en fonction de votre emploi du temps grâce à notre système de réservation en ligne.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="text-primary-600" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Code en Ligne</h3>
              <p className="text-gray-600 text-center">
                Accédez à notre plateforme d'apprentissage du code de la route en ligne, disponible 24h/24.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                <Users className="text-primary-600" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Accompagnement Personnalisé</h3>
              <p className="text-gray-600 text-center">
                Nous adaptons notre enseignement à votre rythme d'apprentissage et à vos besoins spécifiques.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                <Star className="text-primary-600" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Véhicules Récents</h3>
              <p className="text-gray-600 text-center">
                Apprenez à conduire sur des véhicules modernes, bien entretenus et équipés pour votre sécurité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Only show when not authenticated */}
      {!isAuthenticated && (
        <section className="py-20 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à Prendre la Route ?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Rejoignez Auto Ecole Dijon et bénéficiez d'une formation de qualité pour obtenir votre permis de conduire en toute confiance.
            </p>
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100 inline-block">
              S'inscrire Maintenant
            </Link>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce Que Disent Nos Élèves</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La satisfaction de nos élèves est notre priorité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Sophie Martin" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sophie Martin</h4>
                  <p className="text-gray-500 text-sm">Permis B obtenu</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600">
                "Grâce à Auto Ecole Dijon, j'ai obtenu mon permis du premier coup ! Les moniteurs sont très professionnels et la méthode d'enseignement est vraiment efficace."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Thomas Dubois" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Thomas Dubois</h4>
                  <p className="text-gray-500 text-sm">Permis B obtenu</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600">
                "Une auto-école que je recommande vivement. J'ai apprécié la patience de mon moniteur et la simplicité du système de réservation en ligne."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Julie Lefebvre" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Julie Lefebvre</h4>
                  <p className="text-gray-500 text-sm">Permis B obtenu</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                ))}
                <Star size={18} className="text-yellow-500" />
              </div>
              <p className="text-gray-600">
                "Très bonne expérience globale. L'équipe est à l'écoute et les forfaits sont compétitifs. J'ai pu passer mon permis rapidement."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;