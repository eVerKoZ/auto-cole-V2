import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Update page title
  useEffect(() => {
    document.title = 'Auto Ecole Dijon - Contact';
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email est invalide';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field if any
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        
        // Reset the form after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Contactez-nous</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8 w-full lg:w-2/3 order-2 lg:order-1">
            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center animate-fadeIn">
                <CheckCircle size={60} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Envoyé !</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Merci de nous avoir contactés. Nous reviendrons vers vous dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    />
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
                      className="input"
                    >
                      <option value="">Sélectionner un sujet</option>
                      <option value="info">Demande d'information</option>
                      <option value="pricing">Tarifs et forfaits</option>
                      <option value="booking">Réservation</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`input resize-none ${errors.message ? 'border-red-500' : ''}`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>
                
                <div className="text-right">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary inline-flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Envoyer
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-8 w-full lg:w-1/3 order-1 lg:order-2 mb-8 lg:mb-0">
            <h3 className="text-xl font-bold mb-6">Nos coordonnées</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin className="text-primary-600" size={20} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-secondary-900">Adresse</h4>
                  <p className="text-gray-600">123 Avenue de la Liberté, 21000 Dijon</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Phone className="text-primary-600" size={20} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-secondary-900">Téléphone</h4>
                  <p className="text-gray-600">03 80 12 34 56</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Mail className="text-primary-600" size={20} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-secondary-900">Email</h4>
                  <a href="mailto:contact@autoecole-dijon.fr" className="text-gray-600 hover:text-primary-600 transition-colors">
                    contact@autoecole-dijon.fr
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock className="text-primary-600" size={20} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-secondary-900">Horaires d'ouverture</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>Lundi - Vendredi: 9h00 - 19h00</li>
                    <li>Samedi: 9h00 - 17h00</li>
                    <li>Dimanche: Fermé</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-bold mb-4">Nous trouver</h3>
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43542.65842455147!2d5.010689999999999!3d47.322047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f29e5f2a1a85d5%3A0x409ce34b30a9830!2sDijon!5e0!3m2!1sen!2sfr!4v1654000000000!5m2!1sen!2sfr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Auto Ecole Dijon location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;