import { MOCK_FACULTY } from '../constants/data';

export const programAbbr = (program) => {
  const abbr = {
    'BS Computer Science': 'BSCS',
    'BS Information Technology': 'BSIT', 
    'BS Data Science': 'BSDS',
    'BS Cyber Security': 'BSCS',
  };
  return abbr[program] || program.slice(0,4);
};

export const programColor = (program) => {
  const colors = {
    'BS Computer Science': '#6366f1',
    'BS Information Technology': '#10b981',
    'BS Data Science': '#f59e0b',
    'BS Cyber Security': '#ef4444',
  };
  return colors[program] || '#64748b';
};


export const yearLabel = (year) => {
  const labels = {
    1: '1st Year',
    2: '2nd Year',
    3: '3rd Year',
    4: '4th Year',
    5: '5th Year',
  };
  return labels[year] || `${year}th Year`;
};

export const getFaculty = (id) => {
  return MOCK_FACULTY.find(f => f.id === id);
};

export const deptColor = (department) => {
  const colors = {
    'Computer Science': '#6366f1',
    'Information Technology': '#10b981',
    'Data Science': '#f59e0b',
    'Cyber Security': '#ef4444',
  };
  return colors[department] || '#64748b';
};

