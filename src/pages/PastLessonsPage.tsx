import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Calendar, Clock, Car, User, FileText, Star, X } from 'lucide-react';
import { pastLessons } from '../data/mockData';
import { PastLesson } from '../types';

const PastLessons: React.FC = () => {
  const { currentUser } = useUser();
  const [userLessons, setUserLessons] = useState<PastLesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<PastLesson | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = 'Auto Ecole Dijon - Heures passées';
    
    // Filter lessons based on user role
    if (currentUser) {
      if (currentUser.role === 'client') {
        // Show lessons where the student ID matches the current user
        const filtered = pastLessons.filter(lesson => lesson.studentId === currentUser.id);
        setUserLessons(filtered);
      } else if (currentUser.role === 'instructor') {
        // Show lessons where the instructor ID matches the current user
        const filtered = pastLessons.filter(lesson => lesson.instructorId === currentUser.id);
        setUserLessons(filtered);
      } else if (currentUser.role === 'admin') {
        // Admins can see all lessons
        setUserLessons(pastLessons);
      }
    }
  }, [currentUser]);

  const handleLessonClick = (lesson: PastLesson) => {
    setSelectedLesson(lesson);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLesson(null);
  };

  // Calculate total hours completed
  const totalHours = userLessons.length;

  // Group lessons by month
  const groupedLessons = userLessons.reduce((acc: Record<string, PastLesson[]>, lesson) => {
    const date = new Date(lesson.date);
    const monthYear = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(lesson);
    return acc;
  }, {});

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Heures de conduite passées</h1>
        
        {currentUser?.role === 'client' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
            <div className="flex flex-wrap gap-8">
              <div className="flex-1 min-w-[200px]">
                <p className="text-gray-600 mb-1">Heures effectuées</p>
                <p className="text-3xl font-bold">{totalHours} <span className="text-lg font-normal text-gray-500">/ {currentUser.completedHours || 0}</span></p>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div 
                    className="h-full bg-primary-600 rounded-full" 
                    style={{ 
                      width: `${Math.min(100, totalHours / (currentUser.completedHours || 1) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <p className="text-gray-600 mb-1">Note moyenne</p>
                <div className="flex items-center">
                  <p className="text-3xl font-bold mr-2">
                    {userLessons.length > 0 
                      ? (userLessons.reduce((sum, lesson) => sum + (lesson.rating || 0), 0) / userLessons.length).toFixed(1)
                      : 'N/A'
                    }
                  </p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          userLessons.length > 0 && 
                          star <= Math.round(userLessons.reduce((sum, lesson) => sum + (lesson.rating || 0), 0) / userLessons.length)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Basé sur {userLessons.length} leçon{userLessons.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {userLessons.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedLessons).map(([monthYear, lessons]) => (
              <div key={monthYear} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-secondary-900 text-white py-3 px-6">
                  <h3 className="font-semibold text-lg">{monthYear}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleLessonClick(lesson)}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                            <Calendar className="text-primary-600" size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-lg">
                              {new Date(lesson.date).toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long'
                              })}
                            </p>
                            <div className="flex items-center text-gray-600">
                              <Clock size={16} className="mr-1" />
                              <span>{lesson.startTime} - {lesson.endTime}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          {currentUser?.role === 'client' && (
                            <div className="hidden md:flex items-center text-gray-600">
                              <User size={16} className="mr-1" />
                              <span>Moniteur: {lesson.instructorName}</span>
                            </div>
                          )}
                          
                          {(currentUser?.role === 'instructor' || currentUser?.role === 'admin') && (
                            <div className="hidden md:flex items-center text-gray-600">
                              <User size={16} className="mr-1" />
                              <span>Élève: {lesson.studentName}</span>
                            </div>
                          )}
                          
                          <div className="hidden md:flex items-center text-gray-600">
                            <Car size={16} className="mr-1" />
                            <span>{lesson.vehicleModel}</span>
                          </div>
                          
                          <div className="flex">
                            {lesson.rating && [...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < lesson.rating 
                                    ? 'text-yellow-500 fill-yellow-500' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-gray-400" size={28} />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Aucune leçon passée</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {currentUser?.role === 'client' 
                ? "Vous n'avez pas encore effectué de leçons de conduite. Consultez le calendrier pour réserver votre première leçon."
                : "Vous n'avez pas encore effectué de leçons avec des élèves."}
            </p>
            <button 
              onClick={() => window.location.href = '/calendar'}
              className="mt-6 btn-primary"
            >
              Voir le calendrier
            </button>
          </div>
        )}
      </div>
      
      {/* Lesson Details Modal */}
      {showModal && selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-secondary-900">Détail de la leçon</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <Calendar className="text-primary-600 mr-2" size={20} />
                    <span className="font-medium">
                      {new Date(selectedLesson.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <span>{selectedLesson.startTime} - {selectedLesson.endTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Car size={16} className="text-gray-500 mr-2" />
                      <span>
                        {selectedLesson.vehicleModel} ({selectedLesson.transmission === 'manual' ? 'Manuelle' : 'Automatique'})
                      </span>
                    </div>
                    
                    {currentUser?.role === 'client' && (
                      <div className="flex items-center">
                        <User size={16} className="text-gray-500 mr-2" />
                        <span>Moniteur: {selectedLesson.instructorName}</span>
                      </div>
                    )}
                    
                    {(currentUser?.role === 'instructor' || currentUser?.role === 'admin') && (
                      <div className="flex items-center">
                        <User size={16} className="text-gray-500 mr-2" />
                        <span>Élève: {selectedLesson.studentName}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <FileText size={18} className="text-primary-600 mr-2" />
                    Notes de la leçon
                  </h4>
                  <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
                    {selectedLesson.notes || 'Aucune note pour cette leçon.'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Star size={18} className="text-primary-600 mr-2" />
                    Évaluation
                  </h4>
                  <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                    <div className="mr-4">
                      <span className="text-2xl font-bold">{selectedLesson.rating || 'N/A'}</span>
                      <span className="text-gray-500">/5</span>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={`${
                            selectedLesson.rating && star <= selectedLesson.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastLessons;