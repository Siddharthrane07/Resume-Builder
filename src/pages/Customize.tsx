import React, { useState } from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const Customize: React.FC = () => {
  const [latexCode, setLatexCode] = useState<string>('');
  const [compiledOutput, setCompiledOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLatexChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setLatexCode(input);

    try {
      // Wrap LaTeX code in delimiters if not already present
      const wrappedInput = input.startsWith('$') || input.startsWith('$$')
        ? input
        : `$${input}$`;
      setCompiledOutput(wrappedInput); // Dynamically set LaTeX code
      setError(null);
    } catch (err) {
      setError('Error while updating LaTeX preview.');
    }
  };

  const compileLatex = () => {
    try {
      // Wrap LaTeX code in delimiters if not already present
      const wrappedCode = latexCode.startsWith('$') || latexCode.startsWith('$$')
        ? latexCode
        : `$${latexCode}$`;
      setCompiledOutput(wrappedCode); // Explicit compilation
      setError(null);
    } catch (err) {
      setError('Error while compiling LaTeX.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side: LaTeX Input Area */}
      <div className="w-full lg:w-1/2 p-4">
        <h1 className="text-xl font-bold mb-4">Customize Your Resume</h1>
        <textarea
          value={latexCode}
          onChange={handleLatexChange}
          rows={20}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Enter your LaTeX code here..."
        />
        <button 
          onClick={compileLatex} 
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded"
        >
          Compile
        </button>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>

      {/* Right Side: Preview Area */}
      <div className="w-full lg:w-1/2 p-4 border-t lg:border-t-0 lg:border-l border-gray-300">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <div className="border border-gray-300 rounded p-2 h-full overflow-auto">
          {error ? (
            <p className="text-red-600">Unable to render preview due to LaTeX errors.</p>
          ) : (
            <Latex>{compiledOutput}</Latex>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customize;
