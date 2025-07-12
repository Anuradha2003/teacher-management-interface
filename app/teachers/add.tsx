'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import TeacherForm from '@/components/TeacherForm';

export default function AddTeacherPage() {
  const router = useRouter();
  
  const handleSave = () => {
    // In a real app, you would save the new teacher to your backend
    router.push('/teachers');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/teachers')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Add New Teacher</h2>
        <button 
          onClick={handleSave}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Check className="w-4 h-4" />
          Save Teacher
        </button>
      </div>
      
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <TeacherForm />
      </div>
    </div>
  );
}