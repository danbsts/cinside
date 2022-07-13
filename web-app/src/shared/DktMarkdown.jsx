import React from 'react';

import ReactMarkdown from 'react-markdown';

import CodeBlock from 'shared/CodeBlock';

export default function DktMarkdown({ content }) {
  return (
    <ReactMarkdown renderers={{ code: CodeBlock }}>
      {content}
    </ReactMarkdown>
  );
}
