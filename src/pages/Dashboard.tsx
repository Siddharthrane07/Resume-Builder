import { FC } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import ResumeCard from '../components/dashboard/ResumeCard';
import EmptyState from '../components/dashboard/EmptyState';

const Dashboard: FC = () => {
  const { currentResume } = useResumeStore();
  
  // Temporary mock data until we implement backend integration
  const resumes = currentResume ? [currentResume] : [];
  
  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete resume:', id);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and edit your resumes
        </p>
      </div>

      {resumes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Dashboard;