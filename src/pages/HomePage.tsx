import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Car
} from 'lucide-react';

const HomePage: React.FC = () => {
  const stats = [
    { value: '98%', label: 'Taux de réussite' },
    { value: '15+', label: 'Années d\'expérience' },
    { value: '5000+', label: 'Élèves formés' },
    { value: '20+', label: 'Véhicules modernes' },
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: 'Instructeurs Qualifiés',
      description: 'Nos moniteurs expérimentés vous accompagnent tout au long de votre apprentissage.',
    },
    {
      icon: <Car className="h-8 w-8 text-orange-500" />,
      title: 'Véhicules Récents',
      description: 'Apprenez à conduire sur des véhicules récents et bien entretenus.',
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: 'Horaires Flexibles',
      description: 'Réservez vos heures de conduite selon votre disponibilité.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-orange-500" />,
      title: 'Sécurité Prioritaire',
      description: 'La sécurité routière est au cœur de notre méthodologie d\'enseignement.',
    },
  ];

  const testimonials = [
    {
      name: 'Sophie Martin',
      text: 'Grâce à Auto École Dijon, j\'ai obtenu mon permis du premier coup ! Les moniteurs sont patients et professionnels.',
      role: 'Étudiante',
    },
    {
      name: 'Thomas Dubois',
      text: 'Une auto-école sérieuse avec un suivi personnalisé. Je recommande vivement !',
      role: 'Employé',
    },
    {
      name: 'Emma Laurent',
      text: 'Excellente formation, tant pour la théorie que pour la pratique. Le système de réservation en ligne est très pratique.',
      role: 'Enseignante',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Votre Succès au Volant Commence Ici
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Formez-vous à la conduite avec des professionnels passionnés et obtenez votre permis en toute confiance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/packages" className="btn-primary py-3 px-6 text-lg">
                Voir nos forfaits
              </Link>
              <Link to="/contact" className="btn-outline py-3 px-6 text-lg border-white text-white hover:bg-white hover:bg-opacity-10">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir Auto École Dijon ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à vous offrir une formation de qualité supérieure pour faire de vous un conducteur confiant et responsable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Forfaits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des formules adaptées à tous les profils et à tous les budgets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Code de la Route</h3>
                <p className="text-gray-600 mb-4">Formation complète à l'examen théorique</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-orange-500">299€</span>
                  <span className="text-gray-500 ml-1">/ forfait</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">Accès illimité à la salle de code</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">Tests en ligne</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">Suivi personnalisé</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/packages" className="btn-outline w-full text-center">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform scale-105 relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-semibold py-1 px-3 uppercase rounded-bl-lg">
                Populaire
              </div>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Permis B - 20h</h3>
                <p className="text-gray-600 mb-4">Formation complète à la conduite</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-orange-500">799€</span>
                  <span className="text-gray-500 ml-1">/ forfait</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">20 heures de conduite</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">Manuel ou Automatique</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">Frais d'examen inclus</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/packages" className="btn-primary w-full text-center">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Permis B - 30h</h3>
                <p className="text-gray-600 mb-4">Formation intensive complète</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-orange-500">1099€</span>
                  <span className="text-gray-500 ml-1">/ forfait</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">30 heures de conduite</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">Manuel ou Automatique</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                    <span className="ml-2">Frais d'examen inclus</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/packages" className="btn-outline w-full text-center">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/packages" className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600">
              Voir tous nos forfaits
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce Que Disent Nos Élèves</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de ceux qui ont réussi leur permis avec Auto École Dijon.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div className="mt-4 flex text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Démarrer Votre Formation ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez-nous dès aujourd'hui et commencez votre parcours vers l'obtention de votre permis de conduire.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-orange-500 hover:bg-gray-100 py-3 px-6 text-lg">
              S'inscrire maintenant
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10 py-3 px-6 text-lg">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;