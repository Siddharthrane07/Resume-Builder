import { FC } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { useNavigate } from 'react-router-dom';


const Templates: FC = () => {
  const navigate = useNavigate();
  const { templates, selectedTemplate, setSelectedTemplate } = useResumeStore();

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    navigate('/resume-preview');
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Choose a Template</h1>
        <p className="mt-1 text-sm text-gray-500">
          Select a template to get started with your resume
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <button
            key={template}
            onClick={() => handleTemplateSelect(template)}
            className={`p-4 rounded-lg border-2 ${
              selectedTemplate === template
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <div className="aspect-[8.5/11] bg-white rounded shadow-sm mb-4">
              {/* Template preview will go here */}
            </div>
            <h3 className="text-sm font-medium text-gray-900 capitalize">
              {template.replace(/-/g, ' ')}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Templates;