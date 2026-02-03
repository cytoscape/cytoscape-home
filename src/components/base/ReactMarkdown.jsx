import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
/*
 * Other nice styles: coldarkCold, coy, coyWithoutShadows, ghcolors, oneLight, vs, vscDarkPlus
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
 */ 
import { oneLight as syntaxHighlightStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'


const reactMarkdownComponents = {
  ol: ({node, ...props}) => <ol style={{ marginBottom: '1rem', listStyleType: 'decimal' }} {...props} />,
  ul: ({node, ...props}) => <ul style={{ marginBottom: '1rem', listStyleType: 'disc' }} {...props} />,
  li: ({node, ...props}) => <li style={{ marginLeft: '1.5rem' }} {...props} />,
  p: ({node, ...props}) => <p style={{ marginBottom: '1rem' }} {...props} />,
  a: ({node, ...props}) => <a style={{ color: '#2f97c8', textDecoration: 'underline' }} target="_blank" rel="noreferrer" {...props} />,
  code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={{ ...syntaxHighlightStyle }}
          customStyle={{ borderRadius: '1em', fontSize: '0.875em' }} 
          language={match[1]}
          PreTag="div"
          wrapLongLines={true}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} style={{ borderRadius: '1em' }} {...props}>
          {children}
        </code>
      )
    },
}

export default function CustomReactMarkdown({ children }) {
  console.log('>>> CustomReactMarkdown render: ', syntaxHighlightStyle)
  return (
    <div>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={reactMarkdownComponents}
    >
      {children}
    </ReactMarkdown>
    </div>
  )
}