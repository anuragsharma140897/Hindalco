import React, { useEffect, useRef } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

const CustomXmlEditor = ({ xml = '', onChange, readOnly = false }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.getSession().setUseWrapMode(true);
    }
  }, []);

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <AceEditor
      ref={editorRef}
      mode="xml"
      theme="github"
      onChange={handleChange}
      value={xml}
      readOnly={readOnly}
      name="XML_EDITOR"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        useWorker: false,
        showPrintMargin: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default CustomXmlEditor;