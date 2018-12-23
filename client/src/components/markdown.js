import React from 'react'

import HtmlToReact from 'html-to-react' // https://github.com/aknuds1/html-to-react
import ReactMarkdown from 'react-markdown' // https://github.com/rexxars/react-markdown
import htmlParser from 'react-markdown/plugins/html-parser'

import 'github-markdown-css' // https://github.com/sindresorhus/github-markdown-css

// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React)
const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script',
  processingInstructions: [
    {
      shouldProcessNode: node => {
        return true
      },
      processNode: processNodeDefinitions.processDefaultNode
    }
  ]
})

export const Markdown = ({ children, className }) => (
  <div className="markdown-body">
    <ReactMarkdown
      escapeHtml={false}
      className={className}
      astPlugins={[parseHtml]}
    >
      {children}
    </ReactMarkdown>
  </div>
)
