import React, { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './jsoneditor-custom.css'; // Import your updated custom CSS
import { useSelector } from 'react-redux';

const CustomJsonEditor = ({ json, onChange, readOnly = false, detectRender }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const reduxMapping = useSelector((state) => state.MappingReducer);

  useEffect(() => {
    // Initialize JSONEditor
    initEditor();

    // Cleanup function to destroy the editor on component unmount
    return () => {
      destroyEditor();
    };
  }, []);

  const destroyEditor = () => {
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null; // Clear the reference
    }
  };

  const initEditor = () => {
    if (containerRef.current) {
      editorRef.current = new JSONEditor(containerRef.current, {
        mode: 'code', // 'tree', 'view', 'form', 'text', 'preview' can also be used
        onChangeText: (jsonString) => {
          if (onChange) {
            onChange(jsonString);
          }
        },
        onEditable: () => !readOnly, // Make editor read-only if the prop is set
      });

      // Set initial JSON data
      editorRef.current.set(json);
    }
  };

  
  useEffect(() => {
    // Update the editor when json prop changes
    if (editorRef.current) {
      editorRef.current.update(json);
    }
    console.log('Editor updated due to detectRender change.');
  }, [detectRender]);

  useEffect(() => {
    // Reinitialize the editor if reduxMapping?.mappingJson changes
    if (reduxMapping?.mappingJson) {
      destroyEditor();
      initEditor();
      console.log('Editor reinitialized due to reduxMapping change.');
    }
  }, [reduxMapping?.mappingJson]);

  return <div ref={containerRef} style={{ height: '400px' }} />;
};

export default CustomJsonEditor;
