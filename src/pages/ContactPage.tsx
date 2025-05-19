import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Nous Contacter</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Informations de Contact</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 bg-orange-100 rounded-full p-3 text-orange-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Adresse</h3>
                  <p className="text-gray-600">
                    123 Rue de la Liberté<br />
                    21000 Dijon, France
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-orange-100 rounded-full p-3 text-orange-500">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Téléphone</h3>
                  <p className="text-gray-600">+33 3 80 12 34 56</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-orange-100 rounded-full p-3 text-orange-500">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">contact@autoecole-dijon.fr</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-orange-100 rounded-full p-3 text-orange-500">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Heures d'Ouverture</h3>
                  <div className="text-gray-600">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi:</span>
                      <span>9h00 - 19h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi:</span>
                      <span>9h00 - 17h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche:</span>
                      <span>Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-8 h-80 bg-gray-200 rounded-lg relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42980.976857029325!2d5.0159866!3d47.3215806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f29d8ceffd9675%3A0x409ce34b31458d0!2sDijon!5e0!3m2!1sfr!2sfr!4v1697614023355!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte Auto École Dijon"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un Message</h2>
            
            {submitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg flex items-center animate-fadeIn">
                <Check className="h-6 w-6 mr-2" />
                <span>Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Jean Dupont"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="vous@exemple.fr"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="07 12 34 56 78"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="information">Demande d'information</option>
                    <option value="inscription">Inscription</option>
                    <option value="prix">Tarifs et forfaits</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    J'accepte que mes données soient traitées conformément à la{' '}
                    <a href="#" className="text-orange-500 hover:text-orange-600">politique de confidentialité</a>
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary py-3 px-6 w-full flex items-center justify-center relative"
                  >
                    {submitting ? (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </span>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Questions Fréquentes</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Comment s'inscrire à l'auto-école ?</h3>
              <p className="text-gray-600">
                Vous pouvez vous inscrire directement en ligne en créant un compte, ou vous rendre à notre bureau avec une pièce d'identité, un justificatif de domicile et deux photos d'identité.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Quels sont les documents nécessaires pour s'inscrire ?</h3>
              <p className="text-gray-600">
                Vous aurez besoin d'une pièce d'identité en cours de validité, d'un justificatif de domicile de moins de 3 mois, de 2 photos d'identité et de votre NEPH si vous avez déjà été inscrit dans une auto-école.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Comment réserver une heure de conduite ?</h3>
              <p className="text-gray-600">
                Une fois inscrit, vous pouvez réserver vos heures de conduite directement depuis votre espace client, en sélectionnant les créneaux disponibles dans le calendrier.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Comment annuler une heure de conduite ?</h3>
              <p className="text-gray-600">
                Vous pouvez annuler une heure de conduite dans votre espace client au moins 48 heures à l'avance. Passé ce délai, l'heure sera décomptée de votre forfait.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;