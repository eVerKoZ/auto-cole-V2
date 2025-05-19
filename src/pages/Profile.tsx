import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, FileText, Package, Edit2, Save, X, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { packages } from '../data/mockData';

const Profile: React.FC = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
    nephCode: currentUser?.nephCode || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileUploadName, setFileUploadName] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Get user's package
  const userPackage = packages.find(p => p.id === currentUser?.packageId);

  // Update page title
  useEffect(() => {
    document.title = 'Auto Ecole Dijon - Profil';
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!profileData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!profileData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'L\'email est invalide';
    }
    if (profileData.phone && !/^0[1-9]([-. ]?[0-9]{2}){4}$/.test(profileData.phone)) {
      newErrors.phone = 'Le numéro de téléphone est invalide';
    }
    if (profileData.nephCode && !/^[A-Z0-9]{5,12}$/.test(profileData.nephCode)) {
      newErrors.nephCode = 'Le code NEPH doit contenir entre 5 et 12 caractères alphanumériques';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setIsEditing(false);
        setSaveSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }, 1000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUploaded(true);
      setFileUploadName(file.name);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original values
    setProfileData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phoneNumber || '',
      nephCode: currentUser?.nephCode || '',
    });
    setErrors({});
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Information */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Informations Personnelles</h2>
                
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleCancelEdit}
                      className="flex items-center text-gray-600 hover:text-gray-800"
                      type="button"
                    >
                      <X size={18} className="mr-1" />
                      Annuler
                    </button>
                    <button 
                      onClick={handleSubmit}
                      className="flex items-center text-primary-600 hover:text-primary-700"
                      type="submit"
                    >
                      <Save size={18} className="mr-1" />
                      Enregistrer
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <Edit2 size={18} className="mr-1" />
                    Modifier
                  </button>
                )}
              </div>
              
              {saveSuccess && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 flex items-center text-green-700">
                  <CheckCircle size={20} className="mr-2" />
                  Vos informations ont été mises à jour avec succès.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <User size={18} />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        disabled={!isEditing}
                        value={profileData.name}
                        onChange={handleInputChange}
                        className={`pl-10 pr-3 py-2 w-full border ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.name ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Mail size={18} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        disabled={!isEditing}
                        value={profileData.email}
                        onChange={handleInputChange}
                        className={`pl-10 pr-3 py-2 w-full border ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Phone size={18} />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        disabled={!isEditing}
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className={`pl-10 pr-3 py-2 w-full border ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  
                  {/* NEPH Code */}
                  <div>
                    <label htmlFor="nephCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Code NEPH
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FileText size={18} />
                      </div>
                      <input
                        id="nephCode"
                        name="nephCode"
                        type="text"
                        disabled={!isEditing}
                        value={profileData.nephCode}
                        onChange={handleInputChange}
                        className={`pl-10 pr-3 py-2 w-full border ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.nephCode ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.nephCode && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.nephCode}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Le code NEPH (Numéro d'Enregistrement Préfectoral Harmonisé) est nécessaire pour l'examen.
                    </p>
                  </div>
                </div>
                
                {/* Document Upload - Only Show for Clients */}
                {currentUser.role === 'client' && (
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Documents</h3>
                    <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-600 mb-4">
                        Importer votre attestation de réussite au code de la route
                      </p>
                      <div className="flex items-center justify-between">
                        <input 
                          type="file"
                          id="codeAttestationFile"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="codeAttestationFile" 
                          className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                        >
                          <FileText size={18} className="mr-2" />
                          Parcourir...
                        </label>
                        
                        {fileUploaded ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle size={18} className="mr-1" />
                            <span className="text-sm">{fileUploadName}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Aucun fichier sélectionné</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Formats acceptés: PDF, JPG, JPEG, PNG. Taille max: 5MB
                      </p>
                    </div>
                  </div>
                )}
                
                {isEditing && (
                  <div className="mt-8 text-center">
                    <button
                      type="submit"
                      className="btn-primary inline-flex items-center"
                    >
                      <Save size={18} className="mr-2" />
                      Enregistrer les modifications
                    </button>
                  </div>
                )}
              </form>
            </div>
            
            {/* Password Change */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Changer de mot de passe</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe actuel
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    className="input"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className="input"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="input"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="mt-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary-900 hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-700"
                  >
                    Mettre à jour le mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Account Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User size={32} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{currentUser.name}</h3>
                  <p className="text-gray-600">{
                    currentUser.role === 'client' 
                      ? 'Élève' 
                      : currentUser.role === 'instructor' 
                        ? 'Moniteur' 
                        : 'Administrateur'
                  }</p>
                </div>
              </div>
              
              {currentUser.role === 'client' && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Heures effectuées:</span>
                    <span className="font-medium">{currentUser.completedHours || 0} heures</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 rounded-full" 
                      style={{ 
                        width: `${
                          userPackage?.hours 
                            ? Math.min(100, (currentUser.completedHours || 0) / userPackage.hours * 100) 
                            : 0
                        }%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {userPackage?.hours
                      ? `${userPackage.hours - (currentUser.completedHours || 0)} heures restantes`
                      : "Aucun forfait sélectionné"
                    }
                  </p>
                </div>
              )}
              
              {currentUser.role === 'instructor' && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Statut:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Actif
                    </span>
                  </div>
                </div>
              )}
              
              {currentUser.role === 'admin' && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center text-secondary-900">
                    <Shield size={18} className="mr-2 text-primary-600" />
                    <span className="font-medium">Accès administrateur</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Package Info - Only for Clients */}
            {currentUser.role === 'client' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <Package size={20} className="mr-2 text-primary-600" />
                  Mon Forfait
                </h3>
                
                {userPackage ? (
                  <div>
                    <h4 className="font-semibold text-lg">{userPackage.name}</h4>
                    <p className="text-gray-600 mb-2">{userPackage.description}</p>
                    
                    <ul className="space-y-2 mt-4">
                      {userPackage.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        to="/packages"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Voir tous les forfaits
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore de forfait actif.</p>
                    <Link
                      to="/packages"
                      className="btn-primary inline-block text-center"
                    >
                      Choisir un forfait
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this import to fix the Link issue
import { Link } from 'react-router-dom';

export default Profile;