import React, { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './jsoneditor-custom.css'; // Import your updated custom CSS

const JsonEditor = ({ json, onChange, setJson }) => {
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

    // Set JSON data
    editorRef.current.set(json);

    console.log('editorRef', json);

    // Cleanup on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: '400px' }} />;
};

export default JsonEditor;
