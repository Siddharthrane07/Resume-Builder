import { FC } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import Theme1 from "../components/Theme1"; 
import Theme2 from "../components/Theme2.tsx"; 
import Theme3 from "../components/Theme3.tsx"; 
import Theme4 from "../components/Theme4";
// Import other theme components as needed

const Customize: FC = () => {
  const { selectedTemplate } = useResumeStore();

  const renderTheme = () => {
    switch (selectedTemplate) {
      case 'double-column':
        return <Theme1 />;
      case 'ivy-league':
        return <Theme2 />;
      case 'elegant':
        return <Theme3 />;
        case 'contemporary':
        return <Theme4 />;
      // Add other cases for themes
      default:
        return <div>Select a template to customize</div>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customize Your Resume</h1>
      {renderTheme()}
    </div>
  );
};

export default Customize;
