import React from 'react'

import ReactMarkdown from 'react-markdown' // https://github.com/rexxars/react-markdown
import 'github-markdown-css' // https://github.com/sindresorhus/github-markdown-css

export const Markdown = ({ children }) => (
  <div className="markdown-body">
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
)
