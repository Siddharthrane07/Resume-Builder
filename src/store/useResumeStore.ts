import { create } from 'zustand';
import { Resume } from '../types/resume';

interface ResumeState {
  currentResume: Resume | null;
  setCurrentResume: (resume: Resume) => void;
  templates: string[];
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  currentResume: null,
  setCurrentResume: (resume) => set({ currentResume: resume }),
  templates: [
    'double-column',
    'ivy-league',
    'elegant',
    'contemporary',
    'polished',
    'modern',
    'creative',
    'timeline',
    'stylish',
    'single-column',
  ],
  selectedTemplate: 'modern',
  setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),
}));