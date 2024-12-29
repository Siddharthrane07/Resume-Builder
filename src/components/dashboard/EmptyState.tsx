import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FilePlus } from 'lucide-react';

const EmptyState: FC = () => {
  return (
    <div className="text-center py-12">
      <FilePlus className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No resumes</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new resume
      </p>
      <div className="mt-6">
        <Link
          to="/templates"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FilePlus className="h-4 w-4 mr-2" />
          Create Resume
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;