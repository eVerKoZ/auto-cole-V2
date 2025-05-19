import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole } from '../types';
import { Package, User, Lock, LogOut, AlertTriangle, Check } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { packages } = useData();
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Get user packages from localStorage for this demo
  const userPackages = JSON.parse(localStorage.getItem('userPackages') || '[]')
    .filter((up: any) => up.userId === user?.id)
    .map((up: any) => {
      const pkg = packages.find(p => p.id === up.packageId);
      return {
        ...up,
        packageName: pkg?.name,
        packageHours: pkg?.hours,
      };
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setError('');
      setLoading(true);
      
      const success = await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        // Email cannot be changed in this demo
      });
      
      if (success) {
        setSuccess('Vos informations ont été mises à jour avec succès');
        setEditing(false);
        
        // Reset success message after delay
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } else {
        setError('Une erreur est survenue lors de la mise à jour de vos informations');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Validate password
    if (passwordData.currentPassword !== user.password) {
      setError('Le mot de passe actuel est incorrect');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      const success = await updateUser({
        password: passwordData.newPassword,
      });
      
      if (success) {
        setSuccess('Votre mot de passe a été mis à jour avec succès');
        setChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        
        // Reset success message after delay
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } else {
        setError('Une erreur est survenue lors de la mise à jour de votre mot de passe');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mon Compte</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center mb-4">
          <Check className="h-5 w-5 mr-2" />
          <span>{success}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <User className="h-5 w-5 mr-2 text-orange-500" />
                Informations Personnelles
              </h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="btn-outline text-sm"
                >
                  Modifier
                </button>
              )}
            </div>
            
            {editing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="input bg-gray-50"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      L'email ne peut pas être modifié
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="btn-outline"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Prénom</h3>
                    <p>{user.firstName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                    <p>{user.lastName}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                    <p>{user.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type de compte</h3>
                  <p className="capitalize">{user.role}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Password Section */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Lock className="h-5 w-5 mr-2 text-orange-500" />
                Mot de Passe
              </h2>
              {!changingPassword && (
                <button
                  onClick={() => setChangingPassword(true)}
                  className="btn-outline text-sm"
                >
                  Changer
                </button>
              )}
            </div>
            
            {changingPassword ? (
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe actuel
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setChangingPassword(false)}
                    className="btn-outline"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Enregistrement...' : 'Changer le mot de passe'}
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-gray-600">
                Pour des raisons de sécurité, utilisez un mot de passe fort que vous n'utilisez pas ailleurs.
              </p>
            )}
          </div>
        </div>
        
        {/* Packages and Sidebar Information */}
        <div>
          {/* My Packages */}
          {user.role === UserRole.CLIENT && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold flex items-center mb-4">
                <Package className="h-5 w-5 mr-2 text-orange-500" />
                Mes Forfaits
              </h2>
              
              {userPackages.length > 0 ? (
                <div className="space-y-4">
                  {userPackages.map((up: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-md p-3">
                      <h3 className="font-medium">{up.packageName}</h3>
                      <p className="text-sm text-gray-500">
                        Acheté le {new Date(up.purchaseDate).toLocaleDateString('fr-FR')}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm">
                          Heures utilisées: {up.hoursUsed} / {up.packageHours}
                        </span>
                        <span 
                          className={`text-xs px-2 py-1 rounded-full ${
                            up.hoursUsed >= up.packageHours 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {up.hoursUsed >= up.packageHours ? 'Terminé' : 'Actif'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>Vous n'avez pas encore acheté de forfait</p>
                  <button
                    onClick={() => window.location.href = '/packages'}
                    className="btn-primary mt-2"
                  >
                    Voir les forfaits
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Account Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => logout()}
                className="btn-outline w-full flex items-center justify-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;