import React, { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './jsoneditor-custom.css'; // Import your updated custom CSS

const CustomJsonEditor = ({ json, onChange, readOnly = false, detectRender }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize JSONEditor
    editorRef.current = new JSONEditor(containerRef.current, {
      mode: 'code', // 'tree', 'view', 'form', 'text', 'preview' can also be used
      onChangeText: (jsonString) => {
        if (onChange) {
          onChange(jsonString);
        }
      },
    });

    // Set initial JSON data
    editorRef.current.set(json);

    // Cleanup on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Update the editor when json prop changes
    if (editorRef.current) {
      editorRef.current.update(json);
    }
  }, [detectRender]);

  return <div ref={containerRef} style={{ height: '400px' }} />;
};

export default CustomJsonEditor;
