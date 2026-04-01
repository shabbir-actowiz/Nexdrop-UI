import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: "me" | "peer";
  time: string;
}

const mockMessages: Message[] = [
  { id: "1", text: "Hey, sending over the design files now", sender: "me", time: "2:31 PM" },
  { id: "2", text: "Got it, thanks! The mockups look great", sender: "peer", time: "2:32 PM" },
  { id: "3", text: "Can you also share the icon set?", sender: "peer", time: "2:33 PM" },
  { id: "4", text: "Sure, uploading now ⬆️", sender: "me", time: "2:34 PM" },
];

const MessagingPanel = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input, sender: "me", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 p-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
              msg.sender === "me"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-secondary rounded-bl-md"
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-3 border-t border-border mt-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
        />
        <Button size="icon" onClick={send} disabled={!input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5 text-right">Press Enter to send</p>
    </div>
  );
};

export default MessagingPanel;
