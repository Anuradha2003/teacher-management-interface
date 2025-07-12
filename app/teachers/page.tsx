import Link from 'next/link';
import { Plus } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  subjects: string[];
}

const teachers: Teacher[] = [
  { id: '1', name: 'Alyna Allan', title: 'Mathematics Teacher', email: 'alyna@example.com', phone: '+1 234-567-8901', subjects: ['Math', 'Physics'] },
  { id: '2', name: 'John Smith', title: 'Science Teacher', email: 'john@example.com', phone: '+1 234-567-8902', subjects: ['Chemistry', 'Biology'] },
  { id: '3', name: 'Sarah Johnson', title: 'English Teacher', email: 'sarah@example.com', phone: '+1 234-567-8903', subjects: ['English', 'Literature'] },
  { id: '4', name: 'Robert Davis', title: 'History Teacher', email: 'robert@example.com', phone: '+1 234-567-8904', subjects: ['History', 'Social Studies'] },
];

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Teachers</h2>
        <Link href="/teachers/add" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add Teacher
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map(teacher => (
          <Link 
            key={teacher.id} 
            href={`/teachers/${teacher.id}`}
            className="border rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {teacher.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{teacher.name}</h3>
                <p className="text-gray-600">{teacher.title}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {teacher.subjects.map((subject, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}