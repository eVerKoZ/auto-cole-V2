import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Car, Clock, User, Calendar as CalendarIcon, Info, CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { LessonSlot } from '../types';
import { timeSlots } from '../data/mockData';

const Calendar: React.FC = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<LessonSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<LessonSlot | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    vehicleId: '',
  });

  useEffect(() => {
    document.title = 'Auto Ecole Dijon - Calendrier';
  }, []);

  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    
    if (currentUser?.role === 'client') {
      const filtered = timeSlots.filter(
        slot => 
          slot.date === dateString && 
          !slot.isBooked
      );
      setAvailableSlots(filtered);
    } 
    else if (currentUser?.role === 'instructor' || currentUser?.role === 'admin') {
      const filtered = timeSlots.filter(
        slot => slot.date === dateString
      );
      setAvailableSlots(filtered);
    }
  }, [selectedDate, currentUser]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const handleSelectSlot = (slot: LessonSlot) => {
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const handleBookSlot = () => {
    if (selectedSlot && currentUser) {
      console.log('Booking slot:', selectedSlot);
      
      setTimeout(() => {
        setBookingConfirmed(true);
        const updatedSlots = availableSlots.map(slot => 
          slot.id === selectedSlot.id 
            ? { ...slot, isBooked: true, studentId: currentUser.id, studentName: currentUser.name } 
            : slot
        );
        setAvailableSlots(updatedSlots);
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
    setBookingConfirmed(false);
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('lesson_slots')
        .insert([
          {
            date: newSlot.date,
            startTime: newSlot.startTime,
            endTime: newSlot.endTime,
            vehicleId: newSlot.vehicleId,
            instructorId: currentUser?.id,
            isBooked: false,
          },
        ]);

      if (error) throw error;

      setShowAddSlotModal(false);
      fetchAvailableSlots();
    } catch (error) {
      console.error('Error adding slot:', error);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    
    const days = [];
    const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    days.push(
      <div key="header" className="grid grid-cols-7 mb-2">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day, index) => (
          <div key={index} className="text-center py-2 text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
    );
    
    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="p-2 border border-gray-200 bg-gray-50"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = date.getTime() === today.getTime();
      const isSelected = date.getTime() === selectedDate.getTime();
      const isPast = date < today;
      
      cells.push(
        <div 
          key={day}
          className={`p-2 border border-gray-200 text-center cursor-pointer transition-colors ${
            isToday ? 'bg-primary-50' : ''
          } ${
            isSelected ? 'bg-primary-100 border-primary-400' : ''
          } ${
            isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
          onClick={() => !isPast && handleDateClick(date)}
        >
          <div className="text-sm font-medium">{day}</div>
          {!isPast && timeSlots.some(slot => 
            slot.date === date.toISOString().split('T')[0] && 
            (currentUser?.role !== 'client' || !slot.isBooked)
          ) && (
            <div className="mt-1 w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
          )}
        </div>
      );
    }
    
    days.push(
      <div key="days" className="grid grid-cols-7 gap-1">
        {cells}
      </div>
    );
    
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold">{monthYear}</h3>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        {days}
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (availableSlots.length === 0) {
      return (
        <div className="text-center py-8">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun créneau disponible</h3>
          <p className="mt-1 text-gray-500">
            Il n'y a pas de créneaux disponibles pour cette date. Veuillez sélectionner une autre date.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Créneaux pour le {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableSlots.map((slot) => (
            <div 
              key={slot.id}
              className={`border rounded-lg p-4 transition-colors ${
                slot.isBooked 
                  ? currentUser?.role === 'client' 
                    ? 'hidden'
                    : 'bg-gray-50 border-gray-300' 
                  : 'bg-white border-gray-200 hover:border-primary-400 cursor-pointer'
              }`}
              onClick={() => !slot.isBooked && currentUser?.role === 'client' && handleSelectSlot(slot)}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  {slot.startTime} - {slot.endTime}
                </span>
                {slot.isBooked ? (
                  <span className="text-sm font-medium px-2 py-1 bg-red-100 text-red-700 rounded-full">
                    Réservé
                  </span>
                ) : (
                  <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Disponible
                  </span>
                )}
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="mr-2" size={16} />
                  <span>Moniteur: {slot.instructorName}</span>
                </div>
                <div className="flex items-center">
                  <Car className="mr-2" size={16} />
                  <span>
                    {slot.vehicleModel} ({slot.transmission === 'manual' ? 'Manuelle' : 'Automatique'})
                  </span>
                </div>
                {slot.isBooked && slot.studentName && (
                  <div className="flex items-center text-gray-700 font-medium">
                    <User className="mr-2" size={16} />
                    <span>Élève: {slot.studentName}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal || !selectedSlot) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleCloseModal}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full m-4">
          <div className="p-6">
            {bookingConfirmed ? (
              <div className="text-center py-4">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">Réservation confirmée!</h3>
                <p className="mt-2 text-gray-600">
                  Votre leçon a été réservée avec succès. Vous pouvez la retrouver dans vos réservations.
                </p>
                <button
                  onClick={() => navigate('/reservations')}
                  className="mt-6 w-full py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Voir mes réservations
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Confirmer la réservation</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="mr-2" size={18} />
                      <span>{new Date(selectedSlot.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700 mb-2">
                    <Clock className="mr-2" size={18} />
                    <span>{selectedSlot.startTime} - {selectedSlot.endTime}</span>
                  </div>
                  <div className="flex items-center text-gray-700 mb-2">
                    <User className="mr-2" size={18} />
                    <span>Moniteur: {selectedSlot.instructorName}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Car className="mr-2" size={18} />
                    <span>
                      {selectedSlot.vehicleModel} ({selectedSlot.transmission === 'manual' ? 'Manuelle' : 'Automatique'})
                    </span>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <Info className="text-gray-400 mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-gray-600">
                    En confirmant cette réservation, vous acceptez d'être présent à l'heure indiquée. Toute annulation doit être effectuée au moins 24 heures à l'avance.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleBookSlot}
                    className="flex-1 py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Confirmer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAddSlotModal = () => {
    if (!showAddSlotModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAddSlotModal(false)}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full m-4">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Ajouter un créneau</h3>
            <form onSubmit={handleAddSlot} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="input"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure de début
                </label>
                <input
                  type="time"
                  required
                  className="input"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure de fin
                </label>
                <input
                  type="time"
                  required
                  className="input"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Véhicule
                </label>
                <select
                  required
                  className="input"
                  value={newSlot.vehicleId}
                  onChange={(e) => setNewSlot({ ...newSlot, vehicleId: e.target.value })}
                >
                  <option value="">Sélectionner un véhicule</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.model} ({vehicle.transmission})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddSlotModal(false)}
                  className="btn border border-gray-300 text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Calendrier des leçons</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {renderCalendar()}
            
            {currentUser?.role === 'instructor' && (
              <div className="mt-6 bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-4">Ajouter un créneau</h3>
                <p className="text-sm text-gray-600 mb-4">
                  En tant que moniteur, vous pouvez ajouter de nouveaux créneaux pour les élèves.
                </p>
                <button
                  className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Nouveau créneau
                </button>
              </div>
            )}
          </div>
          
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow p-6">
              {renderTimeSlots()}
            </div>
          </div>
        </div>
      </div>
      
      {renderModal()}
      {renderAddSlotModal()}
    </div>
  );
};

export default Calendar;