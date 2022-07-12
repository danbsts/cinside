import React from 'react';

import ReactMarkdown from 'react-markdown';
import { css } from '@emotion/css';

import CodeBlock from 'shared/CodeBlock';

const containerStyle = css`
  margin: 20px 0;
  list-style-position: inside;
  box-sizing: content-box;
  overflow-wrap: break-word;

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  ul,
  blockquote,
  code {
    font-weight: 400;
  }

  strong {
    font-weight: 600;
  }

  pre, code {
    line-height: 1 !important;
    tab-size: 2 !important;
    span {
      font-size: 16px;
    }
  }

  p, ul {
    margin: 8px 0;
    font-size: 18px;
    line-height: 24px;
  }

  blockquote {
    margin: 0;
    padding: 4px 12px;
    border-left: 8px #EEBF4D solid;

    p {
      margin: 0;
    }
  }

  ul {
    margin-left: 8px;
    padding: 4px;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 70%;
  }

  table {
    border-collapse: collapse;
  }

  th,
  td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  table tr:nth-child(2n) {
    background: #f3f3f3;
  }
`;

export default function DktMarkdown({ content }) {
  return (
    <ReactMarkdown
      className={containerStyle}
      renderers={{ code: CodeBlock }}
    >
      {content}
    </ReactMarkdown>
  );
}
