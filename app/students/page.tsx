import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Students</h2>
        <Link href="/students/add" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add Student
        </Link>
      </div>
      
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <p>Student list will appear here</p>
      </div>
    </div>
  );
}