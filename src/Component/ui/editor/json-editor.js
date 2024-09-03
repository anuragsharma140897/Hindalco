import React, { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

const CustomJsonEditor = ({ json ={}, onChange, readOnly = false,  }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    // Initialize the JSON editor
    editorRef.current = new JSONEditor(containerRef.current, {
      mode: 'code', // Mode can be 'tree', 'view', 'form', 'text', etc.
      onChangeText: (jsonText) => {
        try {
          const updatedJson = JSON.parse(jsonText);
          onChange(updatedJson);
        } catch (error) {
          console.error('Invalid JSON format:', error);
        }
      },
    });

    // Set initial JSON data
    editorRef.current.update(json);

    // Cleanup function to destroy the editor on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (editorRef.current) {
      // Update JSON in the editor without resetting cursor position
      const currentJson = editorRef.current.get();
      if (JSON.stringify(currentJson) !== JSON.stringify(json)) {
        editorRef.current.update(json);
      }
    }
  }, [json]); // Update only if `json` changes

  return <div ref={containerRef} style={{ height: '400px' }} />;
};

export default CustomJsonEditor;
