import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const Customize: React.FC = () => {
  const [latexCode, setLatexCode] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  useEffect(() => {
    // Load data from localStorage when component mounts
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const generatedLatex = `\\documentclass{article}
\\usepackage[a4paper,margin=1in]{geometry}
\\usepackage{enumitem}
\\begin{document}

\\begin{center}
{\\LARGE ${parsedData.personalInfo.firstName} ${parsedData.personalInfo.lastName}}\\[1em]
${parsedData.personalInfo.email} | ${parsedData.personalInfo.phone}
\\end{center}

\\resumeSection{Summary}
${parsedData.personalInfo.summary || 'N/A'}

\\resumeSection{Experience}
\\begin{itemize}[leftmargin=*]
${parsedData.experience
  .map(
    (exp: any) =>
      `\\resumeItem{\\textbf{${exp.position} at ${exp.company}} \\hfill ${exp.startDate || 'N/A'} - ${exp.endDate || 'N/A'}
${exp.description || ''}}`
  )
  .join('\n')}
\\end{itemize}

\\resumeSection{Education}
\\begin{itemize}[leftmargin=*]
${parsedData.education
  .map(
    (edu: any) =>
      `\\resumeItem{\\textbf{${edu.degree} from ${edu.institution}} \\hfill ${edu.startDate || 'N/A'} - ${edu.endDate || 'N/A'}}`
  )
  .join('\n')}
\\end{itemize}

\\resumeSection{Skills}
\\begin{itemize}[leftmargin=*]
${parsedData.skills.map((skill: any) => `\\resumeItem{${skill.name} (${skill.level})}}`).join('\n')}
\\end{itemize}

\\resumeSection{Projects}
\\begin{itemize}[leftmargin=*]
${parsedData.projects
  .map(
    (proj: any) =>
      `\\resumeItem{\\textbf{${proj.name}}
${proj.description || ''}
\\textit{Technologies:} ${proj.technologies || 'N/A'}
\\href{${proj.link || '#'}}{Project Link}}`
  )
  .join('\n')}
\\end{itemize}

\\end{document}`;

        setLatexCode(generatedLatex);
        const convertedHtml = convertLatexToHtml(generatedLatex);
        setHtmlOutput(convertedHtml);
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  const convertLatexToHtml = (latex: string): string => {
    // Remove preamble and document setup
    let html = latex
      .replace(/\\documentclass.*$/gm, '')
      .replace(/\\usepackage.*$/gm, '')
      .replace(/\\titleformat.*$/gm, '')
      .replace(/\\newcommand.*$/gm, '')
      .replace(/\\begin{document}/, '')
      .replace(/\\end{document}/, '')
      .replace(/\\pagestyle{empty}/, '')
      .replace(/%.*/g, '');

    // Process center environment with name and contact info
    html = html.replace(
      /\\begin{center}([\s\S]*?)\\end{center}/g,
      (_, content) => {
        let processedContent = content
          .replace(/{\\LARGE\s+([^}]+)}\s*\\\[1em\]/g, '<h1 class="text-3xl font-extrabold mb-4">$1</h1>')
          .replace(/\\href{([^}]+)}{([^}]+)}/g, '<a href="$1" class="text-blue-600 hover:underline">$2</a>')
          .replace(/\\\\/g, '<br>')
          .replace(/\|/g, ' | ');
        
        return `<div class="text-center mb-8">${processedContent}</div>`;
      }
    );

    // Process resume sections
    html = html.replace(
      /\\resumeSection{([^}]+)}/g,
      '<h2 class="text-xl font-bold mt-6 mb-3 border-b border-gray-300 pb-1">$1</h2>'
    );

    // Process itemize environments
    html = html.replace(
      /\\begin{itemize}\[leftmargin=\*\]([\s\S]*?)\\end{itemize}/g,
      (_, items) => {
        const processedItems = items
          .replace(/\\resumeItem{([\s\S]*?)}/g, '<li class="mb-2">$1</li>')
          .trim();
        return `<ul class="list-disc pl-5 space-y-1 my-2">${processedItems}</ul>`;
      }
    );

    // Process remaining formatting
    html = html
      .replace(/\\textbf{([^}]+)}/g, '<strong>$1</strong>')
      .replace(/\\textit{([^}]+)}/g, '<em>$1</em>')
      .replace(/\\noindent/g, '')
      .replace(/\\vspace{[^}]+}/g, '')
      .replace(/\\hrule/g, '')
      .replace(/\\\\/g, '<br>')
      .replace(/\\href{([^}]+)}{([^}]+)}/g, '<a href="$1" class="text-blue-600 hover:underline">$2</a>')
      .replace(/\\[a-zA-Z]+(\[[^\]]*\])?(\{[^}]*\})?/g, '')
      .replace(/\n\s*\n/g, '<br>')
      .replace(/\s+/g, ' ')
      .trim();

    return `
      <div class="max-w-4xl mx-auto p-8 leading-relaxed font-sans">
        ${html}
      </div>
    `;
  };

  const handleLatexChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setLatexCode(input);
    const converted = convertLatexToHtml(input);
    setHtmlOutput(converted);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([latexCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'resume.tex';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side: LaTeX Input Area */}
      <div className="w-full lg:w-1/2 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Customize Your Resume</h1>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download LaTeX
          </button>
        </div>
        <textarea
          value={latexCode}
          onChange={handleLatexChange}
          className="w-full h-[calc(100vh-8rem)] border border-gray-300 rounded p-4 font-mono text-sm"
          placeholder="Enter your LaTeX code here..."
        />
      </div>

      {/* Right Side: Preview Area */}
      <div className="w-full lg:w-1/2 p-4 border-t lg:border-t-0 lg:border-l border-gray-300">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <div 
          className="border border-gray-300 rounded p-4 min-h-[calc(100vh-8rem)] bg-white overflow-auto"
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div>
    </div>
  );
};

export default Customize;