import React, { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './jsoneditor-custom.css'; // Import your updated custom CSS
import { useSelector } from 'react-redux';

const CustomJsonEditor = ({ json, onChange, setJson }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const reduxJson = useSelector(state => state.EditorReducer);
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

    // Cleanup on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [reduxJson.outputJson]);

  return <div ref={containerRef} style={{ height: '400px', marginTop : 10 }} />;
};

export default CustomJsonEditor;
