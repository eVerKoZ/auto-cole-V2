import React, { useState, useEffect } from 'react';
import { Users, User, Package, ChevronRight, Search, Plus, X, Edit, Trash, CheckCircle, AlertCircle } from 'lucide-react';
import { packages as allPackages } from '../data/mockData';
import { useUser } from '../context/UserContext';

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'client',
    phoneNumber: '0612345678',
    nephCode: 'NEPH12345',
    completedHours: 10,
    packageId: '2',
  },
  {
    id: '2',
    name: 'Marie Instructor',
    email: 'instructor@example.com',
    role: 'instructor',
    phoneNumber: '0687654321',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '4',
    name: 'Sophie Martin',
    email: 'sophie@example.com',
    role: 'client',
    phoneNumber: '0611223344',
    nephCode: 'NEPH67890',
    completedHours: 5,
    packageId: '3',
  },
  {
    id: '5',
    name: 'Thomas Dupont',
    email: 'thomas@example.com',
    role: 'client',
    phoneNumber: '0677889900',
    completedHours: 0,
  },
  {
    id: '6',
    name: 'Pierre Leroy',
    email: 'pierre@example.com',
    role: 'instructor',
    phoneNumber: '0633445566',
  },
];

const AdminDashboard: React.FC = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(mockUsers);
  const [packages, setPackages] = useState(allPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'client' | 'instructor' | 'admin'>('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditPackageModal, setShowEditPackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(allPackages[0]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form data for new user
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'client',
    phoneNumber: '',
    nephCode: '',
  });

  // Update page title
  useEffect(() => {
    document.title = 'Auto Ecole Dijon - Administration';
  }, []);

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phoneNumber && user.phoneNumber.includes(searchTerm)) ||
      (user.nephCode && user.nephCode.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = userRoleFilter === 'all' || user.role === userRoleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call to add user
    setTimeout(() => {
      const newUser = {
        id: (users.length + 1).toString(),
        name: newUserData.name,
        email: newUserData.email,
        role: newUserData.role as 'client' | 'instructor' | 'admin',
        phoneNumber: newUserData.phoneNumber,
        nephCode: newUserData.nephCode,
        completedHours: 0,
      };
      
      setUsers([...users, newUser]);
      setShowAddUserModal(false);
      setNewUserData({
        name: '',
        email: '',
        role: 'client',
        phoneNumber: '',
        nephCode: '',
      });
      
      setSuccessMessage('Utilisateur ajouté avec succès.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }, 800);
  };

  const handleDeleteUser = (userId: string) => {
    // Simulate API call to delete user
    setTimeout(() => {
      setUsers(users.filter(user => user.id !== userId));
      
      setSuccessMessage('Utilisateur supprimé avec succès.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }, 800);
  };

  const handleUpdatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call to update package
    setTimeout(() => {
      const updatedPackages = packages.map(p => 
        p.id === selectedPackage.id ? selectedPackage : p
      );
      
      setPackages(updatedPackages);
      setShowEditPackageModal(false);
      
      setSuccessMessage('Forfait mis à jour avec succès.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }, 800);
  };

  const handlePackageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSelectedPackage(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'hours' ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord d'administration</h1>
          <div className="text-sm px-3 py-1 bg-secondary-800 text-white rounded-full">
            {currentUser?.email}
          </div>
        </div>
        
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'users' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={16} className="inline mr-2" />
              Utilisateurs
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'packages' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('packages')}
            >
              <Package size={16} className="inline mr-2" />
              Forfaits
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Rechercher un utilisateur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <select
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={userRoleFilter}
                      onChange={(e) => setUserRoleFilter(e.target.value as any)}
                    >
                      <option value="all">Tous les rôles</option>
                      <option value="client">Élèves</option>
                      <option value="instructor">Moniteurs</option>
                      <option value="admin">Administrateurs</option>
                    </select>
                    
                    <button
                      className="btn-primary flex items-center"
                      onClick={() => setShowAddUserModal(true)}
                    >
                      <Plus size={18} className="mr-1" />
                      Ajouter
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nom
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Téléphone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === 'client' 
                                ? 'bg-blue-100 text-blue-800'
                                : user.role === 'instructor'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-purple-100 text-purple-800'
                            }`}>
                              {user.role === 'client' 
                                ? 'Élève' 
                                : user.role === 'instructor' 
                                  ? 'Moniteur'
                                  : 'Admin'
                              }
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{user.phoneNumber || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 mr-4">
                              <Edit size={18} />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                      <User className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun utilisateur trouvé</h3>
                      <p className="mt-1 text-gray-500">
                        Aucun utilisateur ne correspond à votre recherche.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'packages' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                        <p className="text-gray-600 mb-4">{pkg.description}</p>
                        
                        <div className="flex justify-between items-baseline mb-4">
                          <div>
                            <span className="text-3xl font-bold">{pkg.price}€</span>
                            {pkg.hours > 0 && (
                              <span className="text-gray-500 ml-1">/ {pkg.hours}h</span>
                            )}
                          </div>
                          
                          <div>
                            {pkg.isPopular && (
                              <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                                Populaire
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                          <button
                            className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                            onClick={() => {
                              setSelectedPackage(pkg);
                              setShowEditPackageModal(true);
                            }}
                          >
                            <Edit size={18} className="mr-1" />
                            Modifier
                          </button>
                          
                          <button className="text-gray-600 hover:text-gray-700 flex items-center">
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAddUserModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-secondary-900">Ajouter un utilisateur</h3>
                <button 
                  onClick={() => setShowAddUserModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="input"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="input"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="input"
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({...newUserData, role: e.target.value})}
                  >
                    <option value="client">Élève</option>
                    <option value="instructor">Moniteur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="input"
                    value={newUserData.phoneNumber}
                    onChange={(e) => setNewUserData({...newUserData, phoneNumber: e.target.value})}
                  />
                </div>
                
                {newUserData.role === 'client' && (
                  <div>
                    <label htmlFor="nephCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Code NEPH
                    </label>
                    <input
                      type="text"
                      id="nephCode"
                      name="nephCode"
                      className="input"
                      value={newUserData.nephCode}
                      onChange={(e) => setNewUserData({...newUserData, nephCode: e.target.value})}
                    />
                  </div>
                )}
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    onClick={() => setShowAddUserModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Package Modal */}
      {showEditPackageModal && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowEditPackageModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-secondary-900">Modifier le forfait</h3>
                <button 
                  onClick={() => setShowEditPackageModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleUpdatePackage} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du forfait
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="input"
                    value={selectedPackage.name}
                    onChange={handlePackageInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="input resize-none"
                    value={selectedPackage.description}
                    onChange={handlePackageInputChange}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Prix (€)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      className="input"
                      value={selectedPackage.price}
                      onChange={handlePackageInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                      Heures
                    </label>
                    <input
                      type="number"
                      id="hours"
                      name="hours"
                      min="0"
                      className="input"
                      value={selectedPackage.hours}
                      onChange={handlePackageInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPopular"
                    name="isPopular"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={selectedPackage.isPopular || false}
                    onChange={(e) => setSelectedPackage({
                      ...selectedPackage,
                      isPopular: e.target.checked
                    })}
                  />
                  <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-700">
                    Forfait populaire (affiché en évidence)
                  </label>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    onClick={() => setShowEditPackageModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;