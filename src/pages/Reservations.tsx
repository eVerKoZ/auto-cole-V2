import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Car, User, AlertTriangle, X, Info } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { LessonSlot } from '../types';
import { getBookedLessons } from '../data/mockData';

const Reservations: React.FC = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [bookedLessons, setBookedLessons] = useState<LessonSlot[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonSlot | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  // Update page title
  useEffect(() => {
    document.title = 'Auto Ecole Dijon - Mes Réservations';
  }, []);

  // Load booked lessons
  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const lessons = getBookedLessons(currentUser.id);
        
        // Sort by date and time
        const sorted = [...lessons].sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.startTime}`);
          const dateB = new Date(`${b.date} ${b.startTime}`);
          return dateA.getTime() - dateB.getTime();
        });
        
        setBookedLessons(sorted);
        setIsLoading(false);
      }, 500);
    }
  }, [currentUser]);

  const handleCancelClick = (lesson: LessonSlot) => {
    setSelectedLesson(lesson);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedLesson) {
      // Simulate API call to cancel the lesson
      setTimeout(() => {
        const updatedLessons = bookedLessons.filter(lesson => lesson.id !== selectedLesson.id);
        setBookedLessons(updatedLessons);
        setShowCancelModal(false);
        setCancelSuccess(true);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setCancelSuccess(false);
        }, 5000);
      }, 1000);
    }
  };

  const closeModal = () => {
    setShowCancelModal(false);
    setSelectedLesson(null);
  };

  // Group lessons by month for display
  const groupedLessons: Record<string, LessonSlot[]> = {};
  bookedLessons.forEach(lesson => {
    const date = new Date(lesson.date);
    const month = date.toLocaleString('fr-FR', { month: 'long' });
    
    if (!groupedLessons[month]) {
      groupedLessons[month] = [];
    }
    
    groupedLessons[month].push(lesson);
  });

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Mes réservations</h1>
        
        {cancelSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  La réservation a été annulée avec succès.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : bookedLessons.length > 0 ? (
          <div className="space-y-8">
            {Object.keys(groupedLessons).map(month => (
              <div key={month} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary-600 text-white py-3 px-6">
                  <h3 className="font-semibold text-lg">{month}</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {groupedLessons[month].map(lesson => {
                    const lessonDate = new Date(`${lesson.date}T${lesson.startTime}`);
                    const isPast = lessonDate < new Date();
                    
                    return (
                      <div 
                        key={lesson.id}
                        className={`p-6 ${isPast ? 'opacity-70 bg-gray-50' : 'hover:bg-gray-50'} transition-colors`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-start">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
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
                          
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex items-center text-gray-700">
                              <User size={16} className="mr-1" />
                              <span>{lesson.instructorName}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-700">
                              <Car size={16} className="mr-1" />
                              <span>
                                {lesson.vehicleModel} ({lesson.transmission === 'manual' ? 'Manuelle' : 'Automatique'})
                              </span>
                            </div>
                            
                            {!isPast && (
                              <button
                                onClick={() => handleCancelClick(lesson)}
                                className="btn border border-red-600 text-red-600 hover:bg-red-50 px-3 py-1 rounded"
                              >
                                Annuler
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-gray-400" size={28} />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Aucune réservation</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Vous n'avez pas encore réservé de leçon de conduite. Consultez le calendrier pour voir les créneaux disponibles.
            </p>
            <button 
              onClick={() => navigate('/calendar')}
              className="mt-6 btn-primary"
            >
              Voir le calendrier
            </button>
          </div>
        )}
      </div>
      
      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Annuler la réservation</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Êtes-vous sûr de vouloir annuler cette leçon? Cette action ne peut pas être annulée.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                      <div className="flex items-center mb-2">
                        <Calendar className="text-gray-500 mr-2" size={16} />
                        <span className="font-medium">
                          {new Date(selectedLesson.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          })}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{selectedLesson.startTime} - {selectedLesson.endTime}</span>
                        </div>
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          <span>{selectedLesson.instructorName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={confirmCancel}
                >
                  Confirmer l'annulation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;