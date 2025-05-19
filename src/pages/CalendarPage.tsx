import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole } from '../types';
import { Calendar, Clock, Car, User, Plus, X, AlertTriangle, Check } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    getAvailableTimeSlots, 
    vehicles, 
    addReservation, 
    reservations 
  } = useData();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state for adding a slot (instructors only)
  const [newSlotData, setNewSlotData] = useState({
    time: '08:00',
    vehicleId: vehicles[0]?.id || '',
  });

  // Load available time slots when selected date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = getAvailableTimeSlots(selectedDate);
      setAvailableSlots(slots);
    }
  }, [selectedDate, getAvailableTimeSlots, reservations]);

  // Get days in month for calendar
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }
    
    return days;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Handle previous month click
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Handle next month click
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Handle booking a time slot
  const handleBookSlot = (slot: any) => {
    if (user?.role === UserRole.CLIENT) {
      setSelectedSlot(slot);
      setShowBookingModal(true);
    }
  };

  // Handle adding a new time slot (instructors only)
  const handleAddSlot = () => {
    setShowAddSlotModal(true);
  };

  // Confirm booking
  const confirmBooking = async () => {
    if (!user || !selectedSlot) return;
    
    try {
      setError('');
      setLoading(true);
      
      const success = await addReservation({
        clientId: user.id,
        instructorId: selectedSlot.instructorId,
        vehicleId: selectedSlot.vehicleId,
        date: formatDate(selectedDate),
        time: selectedSlot.time,
        status: 'scheduled',
      });
      
      if (success) {
        setSuccess('Réservation confirmée avec succès !');
        // Reset after a delay
        setTimeout(() => {
          setSuccess('');
          setShowBookingModal(false);
        }, 2000);
      } else {
        setError('Une erreur est survenue lors de la réservation');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new slot (instructors only)
  const confirmAddSlot = async () => {
    if (!user || user.role !== UserRole.INSTRUCTOR) return;
    
    try {
      setError('');
      setLoading(true);
      
      // For demo purposes, we'll just add a slot to the available slots
      // In a real app, this would be saved to the database
      setAvailableSlots([
        ...availableSlots,
        {
          time: newSlotData.time,
          instructorId: user.id,
          vehicleId: newSlotData.vehicleId,
        },
      ]);
      
      setSuccess('Horaire ajouté avec succès !');
      // Reset after a delay
      setTimeout(() => {
        setSuccess('');
        setShowAddSlotModal(false);
      }, 2000);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get vehicle by ID
  const getVehicleById = (id: string) => {
    return vehicles.find(v => v.id === id);
  };

  // Get instructor name (simplified for demo)
  const getInstructorName = (id: string) => {
    if (id === 'instructor-1') return 'John Doe';
    return 'Instructeur';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Calendrier des Disponibilités</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-orange-500" />
              {currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrevMonth}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                &larr;
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                &rarr;
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Weekday Headers */}
            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day, i) => (
              <div key={i} className="calendar-day-header">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {generateCalendarDays().map((date, i) => (
              <div 
                key={i}
                className={`calendar-day ${date && isToday(date) ? 'calendar-day-today' : ''} ${
                  date && selectedDate && date.toDateString() === selectedDate.toDateString()
                    ? 'bg-orange-50 border-orange-300'
                    : ''
                }`}
                onClick={() => date && handleDateClick(date)}
              >
                {date ? (
                  <div className="h-full flex flex-col">
                    <div className={`text-right p-1 ${isToday(date) ? 'font-bold' : ''}`}>
                      {date.getDate()}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        
        {/* Available Time Slots */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Clock className="mr-2 h-5 w-5 text-orange-500" />
              Disponibilités
            </h2>
            
            {/* Add time slot button (instructors only) */}
            {user?.role === UserRole.INSTRUCTOR && (
              <button 
                onClick={handleAddSlot}
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </button>
            )}
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">
              {selectedDate.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </h3>
          </div>
          
          {availableSlots.length > 0 ? (
            <div className="space-y-2">
              {availableSlots.map((slot, index) => {
                const vehicle = getVehicleById(slot.vehicleId);
                
                return (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleBookSlot(slot)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                      {user?.role === UserRole.CLIENT && (
                        <button className="text-xs text-white bg-green-500 px-2 py-1 rounded">
                          Réserver
                        </button>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-center mt-1">
                        <User className="h-4 w-4 mr-2" />
                        <span>{getInstructorName(slot.instructorId)}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Car className="h-4 w-4 mr-2" />
                        <span>{vehicle?.model} ({vehicle?.transmission})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              Aucune disponibilité pour cette date
            </div>
          )}
        </div>
      </div>
      
      {/* Booking Confirmation Modal */}
      {showBookingModal && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Confirmer votre réservation</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
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
              
              <div className="mb-6 space-y-3">
                <p><strong>Date :</strong> {selectedDate.toLocaleDateString('fr-FR')}</p>
                <p><strong>Heure :</strong> {selectedSlot.time}</p>
                <p><strong>Moniteur :</strong> {getInstructorName(selectedSlot.instructorId)}</p>
                <p>
                  <strong>Véhicule :</strong> {getVehicleById(selectedSlot.vehicleId)?.model} 
                  ({getVehicleById(selectedSlot.vehicleId)?.transmission})
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="btn-outline flex-1"
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  onClick={confirmBooking}
                  className="btn-primary flex-1 relative"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </span>
                  ) : (
                    "Confirmer"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Time Slot Modal (Instructors only) */}
      {showAddSlotModal && user?.role === UserRole.INSTRUCTOR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Ajouter un créneau horaire</h3>
                <button 
                  onClick={() => setShowAddSlotModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
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
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={selectedDate.toLocaleDateString('fr-FR')}
                    className="input bg-gray-50"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure
                  </label>
                  <select
                    value={newSlotData.time}
                    onChange={(e) => setNewSlotData({...newSlotData, time: e.target.value})}
                    className="input"
                  >
                    {Array.from({length: 12}, (_, i) => i + 8).map((hour) => (
                      <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                        {hour.toString().padStart(2, '0')}:00
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Véhicule
                  </label>
                  <select
                    value={newSlotData.vehicleId}
                    onChange={(e) => setNewSlotData({...newSlotData, vehicleId: e.target.value})}
                    className="input"
                  >
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.model} ({vehicle.transmission})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddSlotModal(false)}
                  className="btn-outline flex-1"
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  onClick={confirmAddSlot}
                  className="btn-primary flex-1 relative"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </span>
                  ) : (
                    "Confirmer"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;