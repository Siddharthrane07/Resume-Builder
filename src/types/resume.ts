export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
  gpa?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: Date;
  endDate: Date | null;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface Resume {
  id?: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications?: string[];
  languages?: string[];
  interests?: string[];
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}