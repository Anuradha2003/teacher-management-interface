'use client'

import { useState, useEffect } from 'react';
import { Clock, CalendarDays, Users, Plus } from 'lucide-react';

const tabs = [
  { id: 'availability', label: 'Availability', icon: Clock },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'students', label: 'Students', icon: Users }
];

const AvailabilityTable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '8:00 PM'
  ];

  const [selectedTimes, setSelectedTimes] = useState<{[key: string]: boolean}>({
    'Monday-8:00 AM': true,
    'Monday-9:00 AM': true
  });

  const toggleTimeSlot = (day: string, time: string) => {
    const key = `${day}-${time}`;
    setSelectedTimes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="pb-3 text-left font-normal text-gray-500 text-xs">Time</th>
            {days.map(day => (
              <th key={day} className="pb-3 text-center font-normal text-gray-500 text-xs">
                {day.substring(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time} className="border-t border-gray-200">
              <td className="py-3 text-gray-500 text-xs">{time}</td>
              {days.map(day => {
                const key = `${day}-${time}`;
                const isSelected = !!selectedTimes[key];
                
                return (
                  <td key={`${day}-${time}`} className="py-3">
                    <button 
                      onClick={() => toggleTimeSlot(day, time)}
                      className={`mx-auto flex items-center justify-center rounded-full w-6 h-6 transition-all ${
                        isSelected 
                          ? 'bg-blue-500 hover:bg-blue-600' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ScheduleContent = () => (
  <div className="space-y-4">
    {[
      { day: 'Monday', subject: 'Mathematics', time: '10:00 - 11:00 AM', students: ['Priya Sharma', 'Arjun Mehta'] },
      { day: 'Wednesday', subject: 'Physics', time: '11:30 - 12:30 PM', students: ['Riya Kapoor', 'Vikram Singh'] },
      { day: 'Friday', subject: 'Chemistry', time: '1:00 - 2:00 PM', students: ['Aarav Patel', 'Ananya Gupta'] }
    ].map((session, idx) => (
      <div key={idx} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-gray-800">{session.subject}</h4>
            <p className="text-sm text-gray-600">{session.day} • {session.time}</p>
          </div>
          <div className="flex -space-x-2">
            {session.students.map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"></div>
            ))}
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          {session.students.join(', ')}
        </div>
      </div>
    ))}
  </div>
);

const StudentsContent = () => {
    const [students, setStudents] = useState([
      { id: '1', name: 'Priya Sharma', email: 'priya@example.com', subjects: ['Math', 'Physics'], lastActive: '2 days ago' },
      { id: '2', name: 'Arjun Mehta', email: 'arjun@example.com', subjects: ['Chemistry', 'Biology'], lastActive: '1 day ago' },
      { id: '3', name: 'Riya Kapoor', email: 'riya@example.com', subjects: ['Math', 'Computer Science'], lastActive: 'Today' },
      { id: '4', name: 'Vikram Singh', email: 'vikram@example.com', subjects: ['Physics', 'Chemistry'], lastActive: '3 days ago' }
    ]);
    
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subjects, setSubjects] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', subjects: '' });
  
    const validateForm = () => {
      const newErrors = { name: '', email: '', subjects: '' };
      let isValid = true;
      
      if (!name.trim()) {
        newErrors.name = 'Name is required';
        isValid = false;
      }
      
      if (!email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'Invalid email format';
        isValid = false;
      }
      
      if (!subjects.trim()) {
        newErrors.subjects = 'At least one subject is required';
        isValid = false;
      }
      
      setErrors(newErrors);
      return isValid;
    };
  
    const handleAddStudent = () => {
      if (validateForm()) {
        const newStudent = {
          id: (students.length + 1).toString(),
          name,
          email,
          subjects: subjects.split(',').map(s => s.trim()),
          lastActive: 'Just now'
        };
        
        setStudents([...students, newStudent]);
        setName('');
        setEmail('');
        setSubjects('');
        setIsAdding(false);
      }
    };
  
    return (
      <div className="space-y-4">
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
  
        {isAdding && (
          <div className="border rounded-lg p-4 bg-blue-50">
            <h5 className="font-medium mb-3">Add New Student</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Subjects (comma separated)</label>
                <input
                  type="text"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.subjects ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.subjects && <p className="text-red-500 text-xs mt-1">{errors.subjects}</p>}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleAddStudent}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Student
              </button>
              <button 
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <div key={student.id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-medium">
                  {student.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {student.subjects.map((subject, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">{student.lastActive}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

const tabContent: Record<string, JSX.Element> = {
  availability: <AvailabilityTable />,
  schedule: <ScheduleContent />,
  students: <StudentsContent/>
};

export default function ScheduleTabs() {
  const [activeTab, setActiveTab] = useState('availability');

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="p-4 md:p-6">
        {tabContent[activeTab]}
      </div>
    </div>
  );
}