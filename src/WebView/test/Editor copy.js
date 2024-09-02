import React, { useState, useRef, useEffect } from 'react';
import './editor.css'; // Import the CSS file

const JsonEditor = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [highlightedJson, setHighlightedJson] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
  const [errorLine, setErrorLine] = useState(-1);
  const textAreaRef = useRef(null);
  const undoStack = useRef([{ input: '', cursorPos: 0 }]);
  const redoStack = useRef([]);

  useEffect(() => {
    highlightJson();
  }, [jsonInput, errorLine]);

  // Function to handle undo operation
  const handleUndo = () => {
    if (undoStack.current.length > 1) {
      const currentState = undoStack.current.pop();
      redoStack.current.push(currentState);
      const previousState = undoStack.current[undoStack.current.length - 1];
      setJsonInput(previousState.input);
      setTimeout(() => {
        textAreaRef.current.selectionStart = previousState.cursorPos;
        textAreaRef.current.selectionEnd = previousState.cursorPos;
      }, 0);
    }
  };

  // Function to handle redo operation
  const handleRedo = () => {
    if (redoStack.current.length > 0) {
      const nextState = redoStack.current.pop();
      undoStack.current.push(nextState);
      setJsonInput(nextState.input);
      setTimeout(() => {
        textAreaRef.current.selectionStart = nextState.cursorPos;
        textAreaRef.current.selectionEnd = nextState.cursorPos;
      }, 0);
    }
  };

  // Function to push state to undo stack
  const pushToUndoStack = () => {
    const cursorPos = textAreaRef.current.selectionStart;
    undoStack.current.push({ input: jsonInput, cursorPos });
    redoStack.current = []; // Clear redo stack on new input
    if (undoStack.current.length > 50) {
      undoStack.current.shift(); // Limit the size of the undo stack
    }
  };

  // Handle JSON input change and validate JSON
  const handleInputChange = (e) => {
    const input = e.target.value;
    setJsonInput(input);
    validateJson(input);
    updateCursorPosition(e);
  };

  // Validate JSON input and find errors
  const validateJson = (input) => {
    try {
      JSON.parse(input);
      setError('');
      setErrorLine(-1);
    } catch (err) {
      const { message } = err;
      setError(`Error: ${message}`);
      setErrorLine(getErrorLineNumber(input, message));
    }
  };

  // Get the line number from the error message
  const getErrorLineNumber = (input, errorMessage) => {
    const match = errorMessage.match(/position (\d+)/);
    if (match) {
      const position = parseInt(match[1], 10);
      const lines = input.substring(0, position).split('\n');
      return lines.length;
    }
    return -1;
  };

  // Update cursor position in the footer
  const updateCursorPosition = (e) => {
    const { selectionStart, value } = e.target;
    const lines = value.substr(0, selectionStart).split("\n");
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    setCursorPosition({ line, col });
  };

  // Handle keydown events for JSON input
  const handleKeyDown = (e) => {
    const { selectionStart, selectionEnd } = e.target;

    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      handleUndo();
    } else if (e.ctrlKey && e.key === 'y') {
      e.preventDefault();
      handleRedo();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      insertTextAtCursor("\t");
    } else if (e.key === '{' || e.key === '[') {
      e.preventDefault();
      const pair = e.key === '{' ? '{}' : '[]';
      insertTextAtCursor(pair);
      moveCursorTo(selectionStart + 1);
    } else if (e.key === '"') {
      e.preventDefault();
      if (selectionStart !== selectionEnd) {
        wrapSelectedTextWithQuotes(selectionStart, selectionEnd);
      } else {
        insertTextAtCursor('""');
        moveCursorTo(selectionStart + 1);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleEnterKey(selectionStart);
    } else {
      // Record the current state before any other change
      pushToUndoStack();
    }
  };

  // Handle Enter key for auto-indentation
  const handleEnterKey = (position) => {
    const currentText = jsonInput;
    const beforeCursor = currentText.substring(0, position);
    const afterCursor = currentText.substring(position);

    const lines = beforeCursor.split('\n');
    const currentLine = lines[lines.length - 1];

    // Calculate current indentation
    const indentation = currentLine.match(/^\s*/)[0];
    const newIndentation = currentLine.endsWith('{') || currentLine.endsWith('[') ? '\n' + indentation + '\t\n' + indentation : '\n' + indentation;

    const newValue = beforeCursor + newIndentation + afterCursor;
    setJsonInput(newValue);

    // Set cursor after the new indentation
    const cursorMove = currentLine.endsWith('{') || currentLine.endsWith('[') ? position + indentation.length + 2 : position + indentation.length + 1;
    moveCursorTo(cursorMove);
  };

  // Helper function to insert text at the cursor position
  const insertTextAtCursor = (text) => {
    const { selectionStart, selectionEnd } = textAreaRef.current;
    const newValue =
      jsonInput.substring(0, selectionStart) +
      text +
      jsonInput.substring(selectionEnd);
    setJsonInput(newValue);

    // Update the textarea value
    setTimeout(() => {
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = selectionStart + text.length / 2;
    }, 0);
  };

  // Helper function to wrap selected text with quotes
  const wrapSelectedTextWithQuotes = (start, end) => {
    const newValue = 
      jsonInput.substring(0, start) +
      '"' + jsonInput.substring(start, end) + '"' +
      jsonInput.substring(end);
    setJsonInput(newValue);
    setTimeout(() => {
      textAreaRef.current.selectionStart = start;
      textAreaRef.current.selectionEnd = end + 2;
    }, 0);
  };

  // Helper function to move the cursor to a specified position
  const moveCursorTo = (position) => {
    setTimeout(() => {
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = position;
    }, 0);
  };

  // Format JSON input
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError('');
      setErrorLine(-1);
    } catch (err) {
      setError('Invalid JSON: Cannot format');
    }
  };

  // Clear JSON input
  const clearJson = () => {
    setJsonInput('');
    setError('');
    setErrorLine(-1);
    pushToUndoStack();
  };

  // Escape HTML entities to avoid conflicts
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Syntax highlighting for JSON
  const highlightJson = () => {
    const escapedJson = escapeHtml(jsonInput);
    const highlighted = escapedJson
      .replace(/("(.*?)")(\s*:\s*)/g, '<span class="json-key">$1</span>$3')  // keys
      .replace(/("(.*?)")/g, '<span class="json-string">$1</span>')  // strings
      .replace(/\b(true|false|null)\b/g, '<span class="json-boolean">$1</span>')  // booleans and null
      .replace(/(-?\d+(\.\d+)?([eE][+-]?\d+)?)/g, '<span class="json-number">$1</span>');  // numbers
    setHighlightedJson(highlighted);
  };

  return (
    <div className="json-editor-container">
      <div className="toolbar">
        <button onClick={formatJson} title="Format JSON">Format</button>
        <button onClick={clearJson} title="Clear JSON">Clear</button>
      </div>

      {/* Code Editor with Line Highlighting and Syntax Highlighting */}
      <div className="code-editor">
        <div className="highlighted-json" dangerouslySetInnerHTML={{ __html: highlightedJson.split('\n').map((line, index) => {
          const isErrorLine = index + 1 === errorLine;
          return `<div class="json-line${isErrorLine ? ' error-line' : ''}">${line}</div>`;
        }).join('') }}></div>

        <textarea
          ref={textAreaRef}
          value={jsonInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Paste or type your JSON here..."
          rows="15"
          className="json-input"
        />
      </div>

      <div className="footer">
        <span>{`Ln: ${cursorPosition.line}, Col: ${cursorPosition.col}`}</span>
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default JsonEditor;
