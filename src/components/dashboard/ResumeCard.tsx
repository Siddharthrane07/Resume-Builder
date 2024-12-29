import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { Resume } from '../../types/resume';

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

const ResumeCard: FC<ResumeCardProps> = ({ resume, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {resume.personalInfo.firstName} {resume.personalInfo.lastName}
          </h3>
          <p className="text-sm text-gray-500">
            Last updated: {formatDate(resume.updatedAt)}
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {resume.templateId}
        </span>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Link
          to={`/preview?id=${resume.id}`}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Link>
        <Link
          to={`/editor?id=${resume.id}`}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit
        </Link>
        <button
          onClick={() => resume.id && onDelete(resume.id)}
          className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;