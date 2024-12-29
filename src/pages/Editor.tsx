import { FC, useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import { PersonalInfo, Experience, Education, Skill, Project } from '../types/resume';

const Editor: FC = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const { currentResume, setCurrentResume } = useResumeStore();

  const handlePersonalInfoSubmit = (data: PersonalInfo) => {
    if (currentResume) {
      setCurrentResume({ ...currentResume, personalInfo: data });
    }
  };

  const handleExperienceSubmit = (data: { experiences: Experience[] }) => {
    if (currentResume) {
      setCurrentResume({ ...currentResume, experience: data.experiences });
    }
  };

  const handleEducationSubmit = (data: { education: Education[] }) => {
    if (currentResume) {
      setCurrentResume({ ...currentResume, education: data.education });
    }
  };

  const handleSkillsSubmit = (data: { skills: Skill[] }) => {
    if (currentResume) {
      setCurrentResume({ ...currentResume, skills: data.skills });
    }
  };

  const handleProjectsSubmit = (data: { projects: Project[] }) => {
    if (currentResume) {
      setCurrentResume({ ...currentResume, projects: data.projects });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in your details to create your resume
        </p>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSection('personal')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            activeSection === 'personal'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Personal Info
        </button>
        <button
          onClick={() => setActiveSection('experience')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            activeSection === 'experience'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Experience
        </button>
        <button
          onClick={() => setActiveSection('education')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            activeSection === 'education'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setActiveSection('skills')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            activeSection === 'skills'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveSection('projects')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            activeSection === 'projects'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Projects
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {activeSection === 'personal' && (
          <PersonalInfoForm
            initialData={currentResume?.personalInfo}
            onSubmit={handlePersonalInfoSubmit}
          />
        )}
        {activeSection === 'experience' && (
          <ExperienceForm
            initialData={currentResume?.experience}
            onSubmit={handleExperienceSubmit}
          />
        )}
        {activeSection === 'education' && (
          <EducationForm
            initialData={currentResume?.education}
            onSubmit={handleEducationSubmit}
          />
        )}
        {activeSection === 'skills' && (
          <SkillsForm
            initialData={currentResume?.skills}
            onSubmit={handleSkillsSubmit}
          />
        )}
        {activeSection === 'projects' && (
          <ProjectsForm
            initialData={currentResume?.projects}
            onSubmit={handleProjectsSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Editor;