import React, { useRef, useState } from 'react';

const WYSIWYGEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleContentChange = () => {
    setContent(editorRef.current.innerHTML);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded shadow-md">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center space-x-2 mb-4 bg-gray-100 p-2 rounded-t">
        {/* Undo/Redo */}
        <button onClick={() => handleCommand('undo')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-undo"></i>
        </button>
        <button onClick={() => handleCommand('redo')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-redo"></i>
        </button>

        {/* Formatting */}
        <button onClick={() => handleCommand('bold')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-bold"></i>
        </button>
        <button onClick={() => handleCommand('italic')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-italic"></i>
        </button>
        <button onClick={() => handleCommand('underline')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-underline"></i>
        </button>
        <button onClick={() => handleCommand('strikeThrough')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-strikethrough"></i>
        </button>

        {/* Headings */}
        <select
          onChange={(e) => handleCommand('formatBlock', e.target.value)}
          className="p-2 bg-white border rounded"
        >
          <option value="p">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        {/* Alignment */}
        <button onClick={() => handleCommand('justifyLeft')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-align-left"></i>
        </button>
        <button onClick={() => handleCommand('justifyCenter')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-align-center"></i>
        </button>
        <button onClick={() => handleCommand('justifyRight')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-align-right"></i>
        </button>
        <button onClick={() => handleCommand('justifyFull')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-align-justify"></i>
        </button>

        {/* Lists */}
        <button onClick={() => handleCommand('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-list-ul"></i>
        </button>
        <button onClick={() => handleCommand('insertOrderedList')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-list-ol"></i>
        </button>

        {/* Links and Images */}
        <button onClick={() => handleCommand('createLink', prompt('Enter URL:', 'http://'))} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-link"></i>
        </button>
        <button onClick={() => handleCommand('insertImage', prompt('Enter Image URL:', 'http://'))} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-image"></i>
        </button>

        {/* Code Block, Quote, Horizontal Line */}
        <button onClick={() => handleCommand('formatBlock', 'pre')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-code"></i>
        </button>
        <button onClick={() => handleCommand('formatBlock', 'blockquote')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-quote-left"></i>
        </button>
        <button onClick={() => handleCommand('insertHorizontalRule')} className="p-2 hover:bg-gray-200 rounded">
          <i className="fas fa-minus"></i>
        </button>
      </div>

      {/* Editable Div */}
      <div
        ref={editorRef}
        className="border p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        contentEditable
        suppressContentEditableWarning
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      {/* Optional Preview */}
      <div className="mt-4">
        <h2 className="text-xl font-bold">Preview:</h2>
        <div className="border p-4 min-h-[200px] bg-white">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </div>
  );
};

export default WYSIWYGEditor;
