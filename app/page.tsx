import TeacherInfo from '@/components/TeacherInfo';
import QualificationTable from '@/components/QualificationTable';
import ScheduleTabs from '@/components/ScheduleTabs';
import PaymentSection from '@/components/PaymentSection';

export default function Home() {
  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Teacher Dashboard</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TeacherInfo />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <QualificationTable />
          <ScheduleTabs />
          <PaymentSection />
        </div>
      </div>
    </>
  );
}