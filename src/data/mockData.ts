import { Package, Vehicle, LessonSlot, PastLesson } from '../types';

// Sample packages
export const packages: Package[] = [
  {
    id: '1',
    name: 'Forfait Code',
    description: 'Accès à la plateforme de code en ligne et aux cours en salle',
    price: 250,
    hours: 0,
    features: [
      'Accès illimité à la plateforme en ligne',
      'Cours de code en salle',
      'Tests blancs',
      'Suivi personnalisé',
    ],
  },
  {
    id: '2',
    name: 'Forfait Conduite',
    description: '20 heures de conduite avec un moniteur expérimenté',
    price: 1200,
    hours: 20,
    features: [
      '20 heures de conduite',
      'Évaluation personnalisée',
      'Choix du moniteur',
      'Accès au simulateur',
    ],
    isPopular: true,
  },
  {
    id: '3',
    name: 'Forfait Complet',
    description: 'Préparation complète au code et à la conduite',
    price: 1400,
    hours: 20,
    features: [
      '20 heures de conduite',
      'Accès illimité au code en ligne',
      'Cours de code en salle',
      'Accompagnement à l\'examen',
      'Suivi personnalisé',
    ],
  },
  {
    id: '4',
    name: 'Heures Supplémentaires',
    description: 'Pack de 5 heures supplémentaires',
    price: 300,
    hours: 5,
    features: [
      '5 heures de conduite',
      'Réservation flexible',
      'Choix du moniteur si disponible',
    ],
  },
];

// Sample vehicles
export const vehicles: Vehicle[] = [
  {
    id: '1',
    model: 'Peugeot 208',
    transmission: 'manual',
    imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    model: 'Renault Clio',
    transmission: 'manual',
    imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    model: 'Volkswagen Golf',
    transmission: 'automatic',
    imageUrl: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Generate time slots for the next 7 days
const generateTimeSlots = (): LessonSlot[] => {
  const slots: LessonSlot[] = [];
  const instructors = [
    { id: '1', name: 'Marie Dupont' },
    { id: '2', name: 'Jean Martin' },
  ];
  
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i);
    
    // Skip to the next day if it's past 6 PM
    if (i === 0 && today.getHours() >= 18) {
      continue;
    }
    
    const dateString = currentDate.toISOString().split('T')[0];
    
    // Generate slots for each instructor
    for (const instructor of instructors) {
      // Morning slots
      for (let hour = 9; hour < 12; hour++) {
        const startTime = `${hour}:00`;
        const endTime = `${hour + 1}:00`;
        
        const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        
        slots.push({
          id: `${dateString}-${startTime}-${instructor.id}`,
          date: dateString,
          startTime,
          endTime,
          instructorId: instructor.id,
          instructorName: instructor.name,
          vehicleId: vehicle.id,
          vehicleModel: vehicle.model,
          transmission: vehicle.transmission,
          isBooked: Math.random() > 0.7, // 30% chance of being booked
        });
      }
      
      // Afternoon slots
      for (let hour = 14; hour < 18; hour++) {
        const startTime = `${hour}:00`;
        const endTime = `${hour + 1}:00`;
        
        const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        
        slots.push({
          id: `${dateString}-${startTime}-${instructor.id}`,
          date: dateString,
          startTime,
          endTime,
          instructorId: instructor.id,
          instructorName: instructor.name,
          vehicleId: vehicle.id,
          vehicleModel: vehicle.model,
          transmission: vehicle.transmission,
          isBooked: Math.random() > 0.7, // 30% chance of being booked
        });
      }
    }
  }
  
  return slots;
};

export const timeSlots: LessonSlot[] = generateTimeSlots();

// Sample past lessons for the current user
export const pastLessons: PastLesson[] = [
  {
    id: 'past-1',
    date: '2023-09-15',
    startTime: '10:00',
    endTime: '11:00',
    instructorId: '1',
    instructorName: 'Marie Dupont',
    vehicleId: '1',
    vehicleModel: 'Peugeot 208',
    transmission: 'manual',
    isBooked: true,
    studentId: '1',
    studentName: 'John Student',
    notes: 'Bonne maîtrise du démarrage et des vitesses. À travailler: le créneau.',
    rating: 4,
  },
  {
    id: 'past-2',
    date: '2023-09-18',
    startTime: '14:00',
    endTime: '15:00',
    instructorId: '1',
    instructorName: 'Marie Dupont',
    vehicleId: '1',
    vehicleModel: 'Peugeot 208',
    transmission: 'manual',
    isBooked: true,
    studentId: '1',
    studentName: 'John Student',
    notes: 'A travaillé le créneau et la marche arrière. En progrès.',
    rating: 4,
  },
  {
    id: 'past-3',
    date: '2023-09-22',
    startTime: '11:00',
    endTime: '12:00',
    instructorId: '2',
    instructorName: 'Jean Martin',
    vehicleId: '3',
    vehicleModel: 'Volkswagen Golf',
    transmission: 'automatic',
    isBooked: true,
    studentId: '1',
    studentName: 'John Student',
    notes: 'Premier essai en boîte automatique. Bonne adaptation. Travail sur la conduite en ville.',
    rating: 5,
  },
];

// Get user-specific booked lessons
export const getBookedLessons = (userId: string): LessonSlot[] => {
  // For demonstration, we'll return 2-3 booked slots for the current user
  return timeSlots
    .filter(slot => slot.isBooked)
    .slice(0, 3)
    .map(slot => ({
      ...slot,
      studentId: userId,
      studentName: 'John Student', // This would come from the user data in a real application
    }));
};