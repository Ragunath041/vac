// Test data initialization functions
import { generateId } from '@/lib/utils';

// Initialize test data for the application
export const initializeTestData = () => {
  console.log('Initializing test data...');
  
  // Initialize users
  initializeUsers();
  
  // Initialize children
  initializeChildren();
  
  // Initialize vaccines
  initializeVaccines();
  
  // Initialize appointments
  initializeAppointments();
  
  // Initialize vaccination records
  initializeVaccinationRecords();
  
  console.log('Test data initialization complete');
};

// Initialize test users
const initializeUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if we already have users
  if (existingUsers.length > 0) {
    console.log('Users already exist, skipping initialization');
    return;
  }
  
  const users = [
    // Parent users
    {
      id: 'parent1',
      email: 'parent@example.com',
      firstName: 'Parent',
      lastName: 'User',
      role: 'parent',
      phoneNumber: '9876543200'
    },
    // Doctor users
    {
      id: 'doctor1',
      email: 'arun.patel@example.com',
      firstName: 'Arun',
      lastName: 'Patel',
      role: 'doctor',
      phoneNumber: '9876543210',
      specialization: 'Pediatrician',
      licenseNumber: 'MED12345',
      hospitalName: 'City Hospital',
      yearsOfExperience: 10
    },
    {
      id: 'doctor2',
      email: 'priya.sharma@example.com',
      firstName: 'Priya',
      lastName: 'Sharma',
      role: 'doctor',
      phoneNumber: '9876543211',
      specialization: 'Vaccination Specialist',
      licenseNumber: 'MED12346',
      hospitalName: 'City Hospital',
      yearsOfExperience: 8
    }
  ];
  
  localStorage.setItem('users', JSON.stringify(users));
  console.log('Users initialized');
};

// Initialize test children
const initializeChildren = () => {
  const existingChildren = JSON.parse(localStorage.getItem('children') || '[]');
  
  // Check if we already have children
  if (existingChildren.length > 0) {
    console.log('Children already exist, skipping initialization');
    return;
  }
  
  const children = [
    {
      id: 'child1',
      first_name: 'Rahul',
      last_name: 'Kumar',
      date_of_birth: '2020-05-15',
      gender: 'male',
      blood_group: 'O+',
      parent_id: 'parent1',
      allergies: null
    },
    {
      id: 'child2',
      first_name: 'Priya',
      last_name: 'Kumar',
      date_of_birth: '2022-08-10',
      gender: 'female',
      blood_group: 'A+',
      parent_id: 'parent1',
      allergies: null
    }
  ];
  
  localStorage.setItem('children', JSON.stringify(children));
  console.log('Children initialized');
};

// Initialize test vaccines
const initializeVaccines = () => {
  const existingVaccines = JSON.parse(localStorage.getItem('vaccines') || '[]');
  
  // Check if we already have vaccines
  if (existingVaccines.length > 0) {
    console.log('Vaccines already exist, skipping initialization');
    return;
  }
  
  const vaccines = [
    {
      id: 'vaccine1',
      name: 'BCG',
      description: 'Bacillus Calmette-Guérin vaccine primarily used against tuberculosis',
      recommended_age: '0-1 month',
      doses_required: 1,
      side_effects: 'Mild fever, redness at injection site',
      contraindications: 'Immunocompromised individuals'
    },
    {
      id: 'vaccine2',
      name: 'OPV',
      description: 'Oral Polio Vaccine to prevent poliomyelitis',
      recommended_age: '0-5 years',
      doses_required: 5,
      side_effects: 'Rarely, vaccine-associated paralytic poliomyelitis',
      contraindications: 'Immunodeficiency'
    },
    {
      id: 'vaccine3',
      name: 'Hepatitis B',
      description: 'Vaccine for the prevention of hepatitis B virus infection',
      recommended_age: '0-6 months',
      doses_required: 3,
      side_effects: 'Pain at injection site, mild fever',
      contraindications: 'Severe allergic reaction to previous dose'
    },
    {
      id: 'vaccine4',
      name: 'DTP',
      description: 'Combined vaccine against diphtheria, tetanus, and pertussis',
      recommended_age: '6 weeks-6 years',
      doses_required: 5,
      side_effects: 'Fever, irritability, soreness at injection site',
      contraindications: 'Progressive neurological disorders'
    },
    {
      id: 'vaccine5',
      name: 'MMR',
      description: 'Vaccine against measles, mumps, and rubella',
      recommended_age: '9-15 months',
      doses_required: 2,
      side_effects: 'Fever, rash, joint pain',
      contraindications: 'Pregnancy, severe immunosuppression'
    }
  ];
  
  localStorage.setItem('vaccines', JSON.stringify(vaccines));
  console.log('Vaccines initialized');
};

// Initialize test appointments
const initializeAppointments = () => {
  const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  
  // Check if we already have appointments
  if (existingAppointments.length > 0) {
    console.log('Appointments already exist, skipping initialization');
    return;
  }
  
  // Get current date and format it
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const appointments = [
    {
      id: 'appointment1',
      child_id: 'child1',
      vaccine_id: 'vaccine1',
      doctor_id: 'doctor1',
      parent_id: 'parent1',
      date: formatDate(tomorrow),
      time: '10:00 AM',
      status: 'pending',
      notes: 'First BCG vaccination',
      reason: 'Routine vaccination'
    },
    {
      id: 'appointment2',
      child_id: 'child2',
      vaccine_id: 'vaccine3',
      doctor_id: 'doctor1',
      parent_id: 'parent1',
      date: formatDate(nextWeek),
      time: '11:30 AM',
      status: 'pending',
      notes: 'Hepatitis B first dose',
      reason: 'Routine vaccination'
    },
    {
      id: 'appointment3',
      child_id: 'child1',
      vaccine_id: 'vaccine4',
      doctor_id: 'doctor2',
      parent_id: 'parent1',
      date: formatDate(today),
      time: '3:00 PM',
      status: 'confirmed',
      notes: 'DTP vaccination',
      reason: 'Routine vaccination'
    },
    {
      id: 'appointment4',
      child_id: 'child1',
      vaccine_id: 'vaccine2',
      doctor_id: 'doctor1',
      parent_id: 'parent1',
      date: formatDate(lastWeek),
      time: '2:00 PM',
      status: 'completed',
      notes: 'OPV vaccination',
      reason: 'Routine vaccination'
    }
  ];
  
  localStorage.setItem('appointments', JSON.stringify(appointments));
  console.log('Appointments initialized');
};

// Initialize test vaccination records
const initializeVaccinationRecords = () => {
  const existingRecords = JSON.parse(localStorage.getItem('vaccination_records') || '[]');
  
  // Check if we already have vaccination records
  if (existingRecords.length > 0) {
    console.log('Vaccination records already exist, skipping initialization');
    return;
  }
  
  // Get appointments that are completed
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  const completedAppointments = appointments.filter(app => app.status === 'completed');
  
  // Get vaccines
  const vaccines = JSON.parse(localStorage.getItem('vaccines') || '[]');
  
  // Get doctors
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  const vaccinationRecords = completedAppointments.map(appointment => {
    const vaccine = vaccines.find(v => v.id === appointment.vaccine_id);
    const doctor = users.find(u => u.id === appointment.doctor_id);
    
    return {
      id: generateId(),
      child_id: appointment.child_id,
      vaccine_id: appointment.vaccine_id,
      vaccine_name: vaccine ? vaccine.name : 'Unknown Vaccine',
      doctor_id: appointment.doctor_id,
      doctor_first_name: doctor ? doctor.firstName : 'Unknown',
      doctor_last_name: doctor ? doctor.lastName : 'Doctor',
      vaccination_date: appointment.date,
      notes: appointment.notes || '',
      status: 'completed',
      appointment_id: appointment.id,
      certificate_url: null
    };
  });
  
  // Add a few more historical records
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const additionalRecords = [
    {
      id: generateId(),
      child_id: 'child1',
      vaccine_id: 'vaccine5',
      vaccine_name: 'MMR',
      doctor_id: 'doctor1',
      doctor_first_name: 'Arun',
      doctor_last_name: 'Patel',
      vaccination_date: formatDate(twoMonthsAgo),
      notes: 'First dose of MMR vaccine',
      status: 'completed',
      appointment_id: null,
      certificate_url: 'https://example.com/certificate/mmr'
    },
    {
      id: generateId(),
      child_id: 'child2',
      vaccine_id: 'vaccine1',
      vaccine_name: 'BCG',
      doctor_id: 'doctor2',
      doctor_first_name: 'Priya',
      doctor_last_name: 'Sharma',
      vaccination_date: formatDate(threeMonthsAgo),
      notes: 'BCG vaccination completed successfully',
      status: 'completed',
      appointment_id: null,
      certificate_url: 'https://example.com/certificate/bcg'
    }
  ];
  
  const allRecords = [...vaccinationRecords, ...additionalRecords];
  
  localStorage.setItem('vaccination_records', JSON.stringify(allRecords));
  console.log('Vaccination records initialized');
};

// Function to clear all test data
export const clearTestData = () => {
  localStorage.removeItem('users');
  localStorage.removeItem('children');
  localStorage.removeItem('vaccines');
  localStorage.removeItem('appointments');
  localStorage.removeItem('vaccination_records');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  console.log('All test data cleared');
};

// Function to reset and initialize test data
export const resetTestData = () => {
  clearTestData();
  initializeTestData();
};
