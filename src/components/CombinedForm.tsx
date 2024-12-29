import { FC, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';

const resumeSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    summary: z.string().optional(),
  }),
  experience: z.array(
    z.object({
      company: z.string().min(1, 'Company name is required'),
      position: z.string().min(1, 'Position is required'),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      description: z.string().optional(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string().min(1, 'Institution is required'),
      degree: z.string().min(1, 'Degree is required'),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
  ),
  skills: z.array(
    z.object({
      name: z.string().min(1, 'Skill name is required'),
      level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string().min(1, 'Project name is required'),
      description: z.string().optional(),
      link: z.string().optional(),
      technologies: z.string().optional(),
    })
  ),
});

const CombinedForm: FC = () => {
  const { 
    register, 
    handleSubmit, 
    control, 
    reset 
  } = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        summary: ''
      },
      experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
      education: [{ institution: '', degree: '', startDate: '', endDate: '' }],
      skills: [{ name: '', level: 'Beginner' }],
      projects: [{ name: '', description: '', link: '', technologies: '' }]
    }
  });

  const experience = useFieldArray({ control, name: 'experience' });
  const education = useFieldArray({ control, name: 'education' });
  const skills = useFieldArray({ control, name: 'skills' });
  const projects = useFieldArray({ control, name: 'projects' });

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        reset(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, [reset]);

  const onSubmit = (data: any) => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(data));
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving resume. Please try again.');
    }
  };

  const clearForm = () => {
    localStorage.removeItem('resumeData');
    reset({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        summary: ''
      },
      experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
      education: [{ institution: '', degree: '', startDate: '', endDate: '' }],
      skills: [{ name: '', level: 'Beginner' }],
      projects: [{ name: '', description: '', link: '', technologies: '' }]
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
      {/* Personal Info Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              {...register('personalInfo.firstName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              {...register('personalInfo.lastName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('personalInfo.email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register('personalInfo.phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <textarea
            {...register('personalInfo.summary')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Experience</h2>
        {experience.fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  {...register(`experience.${index}.company`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  {...register(`experience.${index}.position`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  {...register(`experience.${index}.startDate`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  {...register(`experience.${index}.endDate`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register(`experience.${index}.description`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => experience.remove(index)}
              className="mt-2 text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => experience.append({ company: '', position: '', startDate: '', endDate: '', description: '' })}
          className="flex items-center text-indigo-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      {/* Education Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Education</h2>
        {education.fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  {...register(`education.${index}.institution`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  {...register(`education.${index}.degree`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  {...register(`education.${index}.startDate`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  {...register(`education.${index}.endDate`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => education.remove(index)}
              className="mt-2 text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => education.append({ institution: '', degree: '', startDate: '', endDate: '' })}
          className="flex items-center text-indigo-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </button>
      </div>

      {/* Skills Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Skills</h2>
        {skills.fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                {...register(`skills.${index}.name`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Skill name"
              />
            </div>
            <div className="w-48">
              <select
                {...register(`skills.${index}.level`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => skills.remove(index)}
              className="text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => skills.append({ name: '', level: 'Beginner' })}
          className="flex items-center text-indigo-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </button>
      </div>

      {/* Projects Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Projects</h2>
        {projects.fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 mb-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  {...register(`projects.${index}.name`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register(`projects.${index}.description`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="text"
                  {...register(`projects.${index}.link`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Technologies</label>
                <input
                  type="text"
                  {...register(`projects.${index}.technologies`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => projects.remove(index)}
              className="mt-2 text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => projects.append({ name: '', description: '', link: '', technologies: '' })}
          className="flex items-center text-indigo-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Save Resume
        </button>
      </div>
    </form>
  );
};

export default CombinedForm;