'use client'

import { useState } from 'react';
import { Mail, Phone, MapPin, Edit, Check, X } from 'lucide-react';

interface TeacherInfoProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
}

export default function TeacherInfo({
    name = "Alyna Allan",
    title = "Mathematics Teacher",
    email = "alyna.aallan@example.com",
    phone = "+1 234-567-9301",
    address = "55 Oskwood St. Suite 6C, Richmond, ON, KZR SL1, Canada"
  }: TeacherInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [teacherData, setTeacherData] = useState({ name, title, email, phone, address });
    const [errors, setErrors] = useState({ name: '', title: '', email: '', phone: '', address: '' });
  
    const validateForm = () => {
      const newErrors = { name: '', title: '', email: '', phone: '', address: '' };
      let isValid = true;
      
      if (!teacherData.name.trim()) {
        newErrors.name = 'Name is required';
        isValid = false;
      }
      
      if (!teacherData.title.trim()) {
        newErrors.title = 'Title is required';
        isValid = false;
      }
      
      if (!teacherData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(teacherData.email)) {
        newErrors.email = 'Invalid email format';
        isValid = false;
      }
      
      if (!teacherData.phone.trim()) {
        newErrors.phone = 'Phone is required';
        isValid = false;
      }
      
      if (!teacherData.address.trim()) {
        newErrors.address = 'Address is required';
        isValid = false;
      }
      
      setErrors(newErrors);
      return isValid;
    };
  
    const handleSave = () => {
      if (validateForm()) {
        setIsEditing(false);
        // Here you would typically send updated data to an API
      }
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTeacherData(prev => ({ ...prev, [name]: value }));
    };
  
    return (
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
            AA
          </div>
        </div>
        
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            {isEditing ? <Check className="w-4 h-4 text-green-500" /> : <Edit className="w-4 h-4 text-blue-500" />}
          </button>
        </div>
      </div>
      
      <div className="pt-12 pb-6 px-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={teacherData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="text-xs text-gray-500 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={teacherData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label className="text-xs text-gray-500 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={teacherData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="text-xs text-gray-500 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={teacherData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="text-xs text-gray-500 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={teacherData.address}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{teacherData.name}</h1>
              <p className="text-gray-600">{teacherData.title}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-gray-700">{teacherData.email}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-purple-500" />
                </div>
                <p className="text-gray-700">{teacherData.phone}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                </div>
                <p className="text-gray-700">{teacherData.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}