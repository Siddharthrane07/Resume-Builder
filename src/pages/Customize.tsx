import React, { useState } from 'react';

const Customize: React.FC = () => {
  const [latexCode, setLatexCode] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');

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
      .replace(/%.*/g, ''); // Remove comments

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

    // Process job titles and company names
    html = html.replace(
      /\\textbf{([^}]+)}\s*\\hfill\s*([^\\]+)/g,
      '<div class="flex justify-between items-center"><strong>$1</strong><span>$2</span></div>'
    );

    // Process itemize environments
    html = html.replace(
      /\\begin{itemize}\[leftmargin=\*\]([\s\S]*?)\\end{itemize}/g,
      (_, items) => {
        const processedItems = items
          .replace(/\\resumeItem{([^}]+)}/g, '<li class="mb-2">$1</li>')
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
      // Clean up any remaining LaTeX commands and spacing
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side: LaTeX Input Area */}
      <div className="w-full lg:w-1/2 p-4">
        <h1 className="text-xl font-bold mb-4">Customize Your Resume</h1>
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
