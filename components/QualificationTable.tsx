'use client'

import { useState } from 'react';
import { GraduationCap, Plus, Trash, Edit } from 'lucide-react';

interface Qualification {
  id: string;
  degree: string;
  university: string;
  year: number;
}

export default function QualificationTable() {
  const [qualifications, setQualifications] = useState<Qualification[]>([
    { id: '1', degree: 'B.Ed in Mathematics', university: 'Delhi University', year: 2015 },
    { id: '2', degree: 'M.Sc in Mathematics', university: 'Mumbai University', year: 2013 },
    { id: '3', degree: 'B.Sc in Mathematics', university: 'Pune University', year: 2011 }
  ]);
  
  const [newQualification, setNewQualification] = useState<Omit<Qualification, 'id'>>({ 
    degree: '', 
    university: '', 
    year: new Date().getFullYear()
  });
  
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState({ degree: '', university: '', year: '' });

  const validateForm = () => {
    const newErrors = { degree: '', university: '', year: '' };
    let isValid = true;
    
    if (!newQualification.degree.trim()) {
      newErrors.degree = 'Degree is required';
      isValid = false;
    }
    
    if (!newQualification.university.trim()) {
      newErrors.university = 'University is required';
      isValid = false;
    }
    
    if (!newQualification.year || newQualification.year < 1900 || newQualification.year > new Date().getFullYear()) {
      newErrors.year = 'Invalid year';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    if(validateForm()){
        if (newQualification.degree && newQualification.university) {
            setQualifications([
              ...qualifications,
              { ...newQualification, id: Date.now().toString() }
            ]);
            setNewQualification({ degree: '', university: '', year: new Date().getFullYear() });
            setIsAdding(false);
          }
    }
   
  };

  const handleDelete = (id: string) => {
    setQualifications(qualifications.filter(q => q.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <GraduationCap className="text-blue-500 w-5 h-5" />
          Qualifications
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Qualification
        </button>
      </div>
      
      {isAdding && (
        <div className="mb-6 p-4 border border-blue-100 rounded-lg bg-blue-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Degree</label>
              <input
                type="text"
                value={newQualification.degree}
                onChange={(e) => setNewQualification({...newQualification, degree: e.target.value})}
                placeholder="B.Ed in Mathematics"
                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                  errors.degree ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">University</label>
              <input
                type="text"
                value={newQualification.university}
                onChange={(e) => setNewQualification({...newQualification, university: e.target.value})}
                placeholder="University name"
                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                  errors.university ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Year</label>
              <input
                type="number"
                value={newQualification.year}
                onChange={(e) => setNewQualification({...newQualification, year: parseInt(e.target.value) || 0})}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                  errors.year ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
            </div>
          </div>
          {/* ... buttons remain the same */}
        </div>
      )}
      
      
      <div className="space-y-4">
        {qualifications.map((q) => (
          <div 
            key={q.id} 
            className="flex justify-between items-start p-4 border rounded-lg hover:border-blue-300 transition-colors group"
          >
            <div>
              <h4 className="font-medium text-gray-800">{q.degree}</h4>
              <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                <span>{q.university}</span>
                <span>{q.year}</span>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(q.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-red-500"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {qualifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="mx-auto w-8 h-8 text-gray-300 mb-2" />
            <p>No qualifications added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}