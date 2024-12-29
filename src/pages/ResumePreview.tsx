import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { marked } from 'marked';

const ResumeBuilder: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# My Resume\n\nThis is my resume in **Markdown**.');
  const [css, setCss] = useState<string>('body { font-family: Arial, sans-serif; } h1 { color: #333; } p { font-size: 16px; }');
  const [themeColor, setThemeColor] = useState<string>('#000000');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<number>(16);
  const [paperSize, setPaperSize] = useState<string>('A4');
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'markdown' | 'css'>('markdown');

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.html(document.getElementById('preview') as HTMLElement, {
      callback: (doc) => {
        doc.save('resume.pdf');
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Markdown Resume Builder</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            Export PDF
          </button>
          <button
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            Export Markdown
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Markdown & CSS Editors */}
        <div
          className={`transition-all duration-300 ${
            isEditorOpen ? 'w-1/2' : 'w-0'
          } overflow-hidden border-r border-gray-300`}
        >
          <div className="h-full flex flex-col">
            {/* Tabs for Markdown and CSS */}
            <div className="flex bg-gray-200">
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'markdown' ? 'bg-gray-300' : ''
                }`}
                onClick={() => setActiveTab('markdown')}
              >
                Markdown
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'css' ? 'bg-gray-300' : ''
                }`}
                onClick={() => setActiveTab('css')}
              >
                CSS
              </button>
            </div>
            {activeTab === 'markdown' && (
              <textarea
                className="flex-1 w-full p-4 resize-none border-none outline-none"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Write your resume here..."
              />
            )}
            {activeTab === 'css' && (
              <textarea
                className="flex-1 w-full p-4 resize-none border-none outline-none"
                value={css}
                onChange={(e) => setCss(e.target.value)}
                placeholder="Write your custom CSS here..."
              />
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className={`flex-1 p-4 ${isEditorOpen ? 'w-1/2' : 'w-full'}`}>
          <div className="flex justify-between items-center bg-gray-200 p-2">
            <h2 className="text-lg font-medium">Preview</h2>
            {!isEditorOpen && (
              <button
                onClick={() => setIsEditorOpen(true)}
                className="text-sm px-2 py-1 bg-green-500 text-white rounded-md"
              >
                Open Editor
              </button>
            )}
          </div>
          <div
            id="preview"
            className="prose prose-indigo max-w-full"
            style={{
              color: themeColor,
              fontFamily,
              fontSize: `${fontSize}px`,
              margin: paperSize === 'A4' ? '10mm' : '20mm',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
          </div>
          <style>{css}</style>
        </div>
      </div>

      {/* Styling Options */}
      <div className="p-4 bg-gray-100 border-t border-gray-300">
        <div className="flex items-center space-x-4">
          <label>
            Theme Color:
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="ml-2"
            />
          </label>
          <label>
            Font Family:
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="ml-2 border rounded-md"
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
            </select>
          </label>
          <label>
            Font Size:
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="ml-2 w-16 border rounded-md"
            />
          </label>
          <label>
            Paper Size:
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              className="ml-2 border rounded-md"
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
