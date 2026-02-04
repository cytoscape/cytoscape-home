import { useState, useRef, useEffect } from "react"
import PropTypes from 'prop-types'
import { LLM_CHAT_API_URL, LLM_MODEL , LLM_SYSTEM_INSTRUCTIONS} from '@/app/shared/config'
import ReactMarkdown from '@/components/base/ReactMarkdown'

import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'


export function Chatbot({ initialMessages = [{ role: 'system', content: LLM_SYSTEM_INSTRUCTIONS }] }) {
  const [messages, setMessages] = useState(initialMessages) // { role: 'user' | 'assistant', content: string }
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef(null)
  const bottomRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    const maxHeight = 160 // px (~8-9 rows)
    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px"
  }, [input])

  async function sendMessage() {
    if (input.trim().length < 1 || loading) return

    // Append user message
    const userMessage = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    // Update messages and clear input
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const response = await fetch(LLM_CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: LLM_MODEL, // change if needed
          messages: newMessages,
          stream: false,
        }),
      })
      const data = await response.json()

      const assistantMessage = {
        role: "assistant",
        content: data?.message?.content || "-- No response --",
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error talking to the model." },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="relative flex flex-col items-center h-full w-full bg-inherit">
      <div className="flex-1 mb-10 px-6 pt-6 pb-24 max-w-screen-md">
        <div className="mx-auto">
        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-400">
            Hi! Ask me anything about Cytoscape.
          </div>
        )}
        </div>
        <div className="space-y-4">
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, msgIndex) => (
          <div
            key={`${msg.role}-${msgIndex}`}
            className={
              msg.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }
          >
            <div
              className={
                msg.role === "user"
                  ? "max-w-screen-md rounded-l-2xl rounded-b-2xl bg-gray-200 md:ml-32 sm:ml-4 ml-0 px-4 py-2 text-right text-sm"
                  : "max-w-screen-md whitespace-pre-wrap px-1 py-1 text-sm"
              }
            >
            {msg.role === "assistant" ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex space-x-1 px-2 py-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
            </div>
          </div>
        )}
          <div ref={bottomRef} />
        </div>
      </div>
      {/* User input Area */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 pb-2 md:pb-5 bg-inherit">
        <div className="pointer-events-auto mx-auto max-w-screen-md px-4 pb-4">
          <div className="relative p-2 pb-10 rounded-2xl border border-gray-300 shadow-lg">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask anything about Cytoscape..."
              className="w-full resize-none rounded-xl text-sm placeholder:text-slate-400 text-slate-700 bg-inherit border-none focus:ring-0"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="absolute bottom-2 right-2 rounded-full bg-black p-0 text-white hover:bg-complement-500  active:bg-complement-600 disabled:opacity-50"
            >
              <ArrowUpCircleIcon className="h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
Chatbot.propTypes = {
  initialMessages: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.oneOf(['system', 'user', 'assistant']).isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
}