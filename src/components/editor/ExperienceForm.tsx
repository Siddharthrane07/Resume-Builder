import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { Experience } from '../../types/resume';

const experienceSchema = z.object({
  experiences: z.array(z.object({
    company: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    location: z.string().min(1, 'Location is required'),
    startDate: z.date(),
    endDate: z.date().nullable(),
    current: z.boolean(),
    description: z.string().min(1, 'Description is required'),
    achievements: z.array(z.string()),
  })),
});

interface ExperienceFormProps {
  initialData?: Experience[];
  onSubmit: (data: { experiences: Experience[] }) => void;
}

const ExperienceForm: FC<ExperienceFormProps> = ({ initialData, onSubmit }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experiences: initialData || [{ achievements: [''] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-6 space-y-6 relative">
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                {...register(`experiences.${index}.company`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                {...register(`experiences.${index}.position`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register(`experiences.${index}.description`)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ achievements: [''] })}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </button>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;