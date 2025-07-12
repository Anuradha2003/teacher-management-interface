'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import TeacherForm from '@/components/TeacherForm';

export default function EditTeacherPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // In a real app, you would fetch teacher data based on params.id
  const teacher = {
    id: params.id,
    name: "Alyna Allan",
    title: "Mathematics Teacher",
    email: "alyna.aallan@example.com",
    phone: "+1 234-567-9301",
    address: "55 Oskwood St. Suite 6C, Richmond, ON, KZR SL1, Canada"
  };

  const handleSave = () => {
    // In a real app, you would save the data to your backend
    router.push(`/teachers/${params.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push(`/teachers/${params.id}`)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Edit Teacher Profile</h2>
        <button 
          onClick={handleSave}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Check className="w-4 h-4" />
          Save Changes
        </button>
      </div>
      
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <TeacherForm teacher={teacher} />
      </div>
    </div>
  );
}