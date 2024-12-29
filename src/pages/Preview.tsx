import { FC } from 'react';
import { useResumeStore } from '../store/useResumeStore';

const Preview: FC = () => {
  const { currentResume } = useResumeStore();

  if (!currentResume) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No resume selected for preview</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Resume Preview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Preview and download your resume
        </p>
      </div>

      {/* Resume preview will go here */}
    </div>
  );
};

export default Preview;