import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { Skill } from '../../types/resume';
import {FormField} from '../ui/FormField';

const skillsSchema = z.object({
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  })),
});

interface SkillsFormProps {
  initialData?: Skill[];
  onSubmit: (data: { skills: Skill[] }) => void;
}

const SkillsForm: FC<SkillsFormProps> = ({ initialData, onSubmit }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: initialData || [{ name: '', level: 'Intermediate' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-4">
          <div className="flex-1">
            <FormField
              label="Skill"
              error={errors.skills?.[index]?.name?.message}
            >
              <input
                type="text"
                {...register(`skills.${index}.name`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., JavaScript, Project Management"
              />
            </FormField>
          </div>
          
          <div className="w-48">
            <FormField
              label="Level"
              error={errors.skills?.[index]?.level?.message}
            >
              <select
                {...register(`skills.${index}.level`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </FormField>
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-6 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: '', level: 'Intermediate' })}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Skill
      </button>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Skills
        </button>
      </div>
    </form>
  );
};

export default SkillsForm;