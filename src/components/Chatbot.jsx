import { useState, useRef, useEffect } from "react"
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'


export function Chatbot() {
  const [messages, setMessages] = useState([]) // { role: 'user' | 'assistant', content: string }
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
    if (!input.trim() || loading) return

    const userMessage = { role: "user", content: input }
    const newMessages = [...messages, userMessage]

    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3", // change if needed
          messages: newMessages,
          stream: false,
        }),
      })

      const data = await res.json()

      const assistantMessage = {
        role: "assistant",
        content: data.message?.content || "(No response)",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error talking to the model." },
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
    <div className="relative flex h-full w-full flex-col bg-inherit">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-screen-md space-y-4">
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-400">
              👋 Hi! Ask me anything.
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  msg.role === "user"
                    ? "max-w-screen-md rounded-2xl bg-gray-300 px-4 py-2 text-right"
                    : "max-w-screen-md whitespace-pre-wrap px-1 py-1"
                }
              >
                {msg.content}
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

      {/* Input Area */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
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
              className="absolute bottom-2 right-2 rounded-full bg-black p-0 text-white disabled:opacity-50"
            >
              <ArrowUpCircleIcon className="h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}