import React from 'react'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'

export const Markdown = ({ source }) => (
  <div className="markdown-body">
    <ReactMarkdown source={source} />
  </div>
)
