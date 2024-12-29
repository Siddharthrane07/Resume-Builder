import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from '../ui/FormField';
import { Project } from '../../types/resume';

const projectsSchema = z.object({
  projects: z.array(
    z.object({
      name: z.string().min(1, 'Project name is required'),
      description: z.string().min(1, 'Project description is required'),
      link: z.string().url('Must be a valid URL').optional(),
      technologies: z.string().optional(),
    })
  ),
});

interface ProjectsFormProps {
  initialData?: Project[];
  onSubmit: (data: { projects: Project[] }) => void;
}

const ProjectsForm: FC<ProjectsFormProps> = ({ initialData = [], onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      projects: initialData.length > 0 ? initialData : [{ name: '', description: '', link: '', technologies: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Projects</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 border-b pb-4 mb-4">
          <FormField
            label="Project Name"
            error={errors.projects?.[index]?.name?.message}
          >
            <input
              type="text"
              {...register(`projects.${index}.name`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="e.g., Portfolio Website"
            />
          </FormField>
          <FormField
            label="Project Description"
            error={errors.projects?.[index]?.description?.message}
          >
            <textarea
              {...register(`projects.${index}.description`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Describe the project in detail"
            ></textarea>
          </FormField>
          <FormField
            label="Project Link"
            error={errors.projects?.[index]?.link?.message}
          >
            <input
              type="url"
              {...register(`projects.${index}.link`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="e.g., https://myportfolio.com"
            />
          </FormField>
          <FormField
            label="Technologies Used"
            error={errors.projects?.[index]?.technologies?.message}
          >
            <input
              type="text"
              {...register(`projects.${index}.technologies`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="e.g., React, TypeScript, Node.js"
            />
          </FormField>
          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 text-gray-400 hover:text-red-500 flex items-center"
          >
            <Trash2 className="h-5 w-5 mr-1" />
            Remove Project
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: '', description: '', link: '', technologies: '' })}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </button>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Projects
        </button>
      </div>
    </form>
  );
};

export default ProjectsForm;
