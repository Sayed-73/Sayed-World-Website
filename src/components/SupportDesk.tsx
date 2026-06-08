import React, { useState, useEffect, useRef } from "react";
import { Message, UserRole } from "../types";
import { 
  Send, Bot, CornerDownLeft, Sparkles, AlertCircle, 
  MessageSquare, User, Terminal, HelpCircle, ShieldAlert
} from "lucide-react";

interface SupportDeskProps {
  currentRole: UserRole;
}

export default function SupportDesk({ currentRole }: SupportDeskProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "ai",
      text: "Hi there! I am the **Sayed-World AI Copilot**. I can assist you with storefront purchasing, vendor store configuration, or general technical architectures. Ask me anything, or tap an automated guide topic below!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const FAQ_PROMPTS = [
    { label: "Phase 3 Code Setup", prompt: "Show me a Laravel 12 seeder/controller to set up default Vendor approvals matching Phase 3." },
    { label: "SSLCommerz callback", prompt: "Explain how to secure and verify SSLCommerz checkout payments under Phase 8." },
    { label: "Courier Integration", prompt: "What are the configuration steps to integrate SteadFast Courier API inside Laravel 12?" },
    { label: "Refund & Walllet logic", prompt: "Explain how the automated customer wallet deductions and vendor holding balances are engineered under database transactions." }
  ];

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);
    setErrorText(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          roleContext: `User is viewing Sayed-World platform acting in the role: ${currentRole}`,
          history: messages.slice(-6).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Local server reported an error processing API request");
      }

      const data = await response.json();
      
      const aiReply: Message = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: data.response || "No reply response generated from server.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      setErrorText("Failed to communicate with full-stack agent. Reconnect server.ts or check setting variables.");
      
      // Post offline fallback response
      const fallbackMsg: Message = {
        id: "fallback-" + Date.now(),
        sender: "ai",
        text: `[Offline Mode] I received your request: "${textToSend}". Since the server did not respond, here is structural guidance for Sayed-World:\n\n- Timezone default:  Asia/Dhaka\n- Active role: ${currentRole}\n- Currencies default: BDT ৳\n- Database models mapped: Users, Roles, VendorStore, Product, ProductVariant, SavedItem, Order, CodeCoupon. \n\nPlease configure the Secrets panel with a valid GEMINI_API_KEY to receive interactive full-context answers.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render text containing markdown safely as simple structure or split paragraphs
  const renderMessageText = (text: string) => {
    // Basic parser for highlighting code blocks and bold items
    const lines = text.split("\n");
    let isCodeBlock = false;
    let codeContent: string[] = [];

    return lines.map((line, idx) => {
      if (line.trim().startsWith("```")) {
        if (isCodeBlock) {
          isCodeBlock = false;
          const blockText = codeContent.join("\n");
          codeContent = [];
          return (
            <div key={idx} className="bg-black/55 text-slate-100 p-3 rounded-lg font-mono text-xs my-2 overflow-x-auto border border-white/5">
              <code>{blockText}</code>
            </div>
          );
        } else {
          isCodeBlock = true;
          return null;
        }
      }

      if (isCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Basic styling for inline code or bold items
      let content: React.ReactNode = line;
      
      // Handle Bold
      if (line.includes("**")) {
        const parts = line.split("**");
        content = parts.map((p, i) => i % 2 !== 0 ? <strong key={i} className="font-bold text-slate-900 dark:text-white">{p}</strong> : p);
      }

      return (
        <p key={idx} className="mb-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          {content}
        </p>
      );
    });
  };  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-220px)] relative z-10">
      {/* LHS sidebar explaining LLM Capabilities */}
      <div className="lg:col-span-4 glass-panel p-4 rounded-2xl flex flex-col justify-between relative z-10">
        <div className="space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 px-2 py-0.5 rounded border border-indigo-200/20">
              Powered by Gemini 3.5
            </span>
            <h3 className="font-display font-semibold text-base text-slate-800 dark:text-slate-200 mt-2 flex items-center gap-1.5">
              <Bot className="w-5 h-5 text-indigo-500" />
              Dynamic AI Assistant
            </h3>
            <p className="text-xs text-slate-505 dark:text-slate-400 leading-relaxed mt-1">
              Test dynamic support channels in role-relative contexts. The AI responds matching your current profile credentials automatically.
            </p>
          </div>

          <div className="glass-card p-3 rounded-xl border border-slate-200/40 dark:border-white/5 text-xs">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-indigo-500" />
              Environment Constraints
            </h4>
            <div className="space-y-1 font-mono text-[10px] text-slate-500">
              <div>• Default Time: Asia/Dhaka</div>
              <div>• Default Key: process.env.GEMINI_API_KEY</div>
              <div>• Active Panel: {currentRole} Client</div>
            </div>
          </div>

          {/* Guidelines */}
          <div>
            <h4 className="text-xs font-semibold text-slate-505 uppercase tracking-wider mb-2">Technical Prompt templates:</h4>
            <div className="space-y-2">
              {FAQ_PROMPTS.map((promo, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(promo.prompt)}
                  className="w-full text-left p-2.5 glass-card border border-slate-200/50 dark:border-white/10 hover:border-indigo-400/55 rounded-xl text-xs font-medium text-slate-750 dark:text-slate-300 shadow-xs transition-all duration-200 glass-card-hover"
                >
                  <div className="flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mb-0.5">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    {promo.label}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 truncate">{promo.prompt}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200/40 dark:border-white/5 text-[10px] text-slate-450 dark:text-slate-500">
          * Answers are streamed using server-side proxy agents to avoid exposing local environment variables.
        </div>
      </div>

      {/* RHS main terminal */}
      <div className="lg:col-span-8 glass-panel rounded-2xl p-4 flex flex-col h-full overflow-hidden relative z-10">
        {/* Connection status header */}
        <div className="flex justify-between items-center bg-white/40 dark:bg-black/20 border border-slate-200/45 dark:border-white/10 p-2.5 rounded-xl mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-505 animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-slate-705 dark:text-slate-300 flex items-center gap-2">
              Active Support Room: 
              <span className="bg-slate-250 dark:bg-white/5 text-slate-650 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono text-[10px] uppercase border border-slate-300/30 dark:border-white/5">
                {currentRole} Context
              </span>
            </span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Live Session ID: SW-AI-829</span>
        </div>

        {/* Messaging Box */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[100px]">
          {messages.map((m) => {
            const isUser = m.sender === "user";
            return (
              <div 
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isUser 
                    ? "bg-slate-200/50 dark:bg-white/10 text-slate-600 dark:text-slate-305" 
                    : "bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-500"
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-3.5 rounded-2xl ${
                    isUser
                      ? "bg-gradient-to-r from-indigo-605 to-indigo-700 text-white rounded-tr-none shadow-md shadow-indigo-600/10"
                      : "bg-white/50 dark:bg-slate-900/45 backdrop-blur-xs rounded-tl-none border border-slate-200/45 dark:border-white/10 shadow-xs text-slate-705 dark:text-slate-300"
                  }`}>
                    {isUser ? (
                      <p className="text-xs leading-relaxed">{m.text}</p>
                    ) : (
                      renderMessageText(m.text)
                    )}
                  </div>
                  <div className={`text-[9px] text-slate-450 dark:text-slate-500 font-mono ${isUser ? "text-right" : "text-left"}`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="glass-card p-3.5 rounded-2xl rounded-tl-none border border-slate-250 dark:border-white/10 space-y-1.5 min-w-[120px]">
                <div className="flex gap-1 items-center py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-slate-400 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-slate-400 animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-slate-400 animate-bounce delay-200" />
                </div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">Gemini is reasoning...</div>
              </div>
            </div>
          )}

          {errorText && (
            <div className="p-3 bg-red-50/55 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-start gap-2.5 text-xs text-red-650 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Connection Dispute</span>
                {errorText}
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Interface */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="border-t border-slate-200/40 dark:border-white/10 pt-3 flex gap-2 relative z-10"
        >
          <input
            type="text"
            placeholder={`Query e-commerce architecture as ${currentRole}...`}
            className="flex-1 py-2.5 px-4 bg-white/45 dark:bg-[#070c14]/50 text-xs border border-slate-200/60 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-400"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1 text-xs font-semibold shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
