import TeacherInfo from '@/components/TeacherInfo';
import QualificationTable from '@/components/QualificationTable';
import ScheduleTabs from '@/components/ScheduleTabs';
import Link from 'next/link';
import { ChevronLeft, Edit } from 'lucide-react';

export default function TeacherDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch teacher data based on params.id
  const teacher = {
    id: params.id,
    name: "Alyna Allan",
    title: "Mathematics Teacher",
    email: "alyna.aallan@example.com",
    phone: "+1 234-567-9301",
    address: "55 Oskwood St. Suite 6C, Richmond, ON, KZR SL1, Canada"
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/teachers" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">Teacher Profile</h2>
        <Link 
          href={`/teachers/${params.id}/edit`} 
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TeacherInfo {...teacher} />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <QualificationTable />
          <ScheduleTabs />
        </div>
      </div>
    </div>
  );
}