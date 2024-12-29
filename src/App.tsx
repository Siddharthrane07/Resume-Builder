// src/App.tsx
import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Templates from './pages/Templates';
import Preview from './pages/Preview';
import ResumePreview from './pages/ResumePreview';
import Customize from './pages/Customize';
import Layout from './components/Layout';
// import { ResumeProvider } from './Context/ResumeContext';
import SavedData from './pages/SavedData';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/resume-preview" element={<ResumePreview />} />
          <Route path="/resume-data" element={<SavedData />} />
          <Route path="/customize" element={<Customize />} /> {/* New route */}
        </Routes>
      </Layout>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
