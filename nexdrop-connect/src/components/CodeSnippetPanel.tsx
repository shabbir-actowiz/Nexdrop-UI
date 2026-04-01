import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Snippet {
  id: string;
  language: string;
  code: string;
  sender: "me" | "peer";
}

const mockSnippets: Snippet[] = [
  {
    id: "1",
    language: "TypeScript",
    sender: "peer",
    code: `const connect = async (code: string) => {
  const peer = new RTCPeerConnection();
  const channel = peer.createDataChannel("transfer");
  return channel;
};`,
  },
  {
    id: "2",
    language: "Python",
    sender: "me",
    code: `import hashlib

def verify_file(path: str) -> str:
    sha = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha.update(chunk)
    return sha.hexdigest()`,
  },
];

const CodeSnippetPanel = () => {
  const [snippets] = useState<Snippet[]>(mockSnippets);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newCode, setNewCode] = useState("");

  const copySnippet = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="rounded-lg overflow-hidden border border-border animate-fade-in">
          <div className="flex items-center justify-between px-4 py-2 bg-secondary">
            <span className="text-xs font-medium text-muted-foreground">{snippet.language}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">
                {snippet.sender === "me" ? "You" : "Peer"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => copySnippet(snippet.id, snippet.code)}
              >
                {copiedId === snippet.id ? (
                  <Check className="h-3.5 w-3.5 text-accent" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
          <pre className="bg-[#1C1917] p-4 overflow-x-auto">
            <code className="text-sm font-mono text-[#FAFAF9] leading-relaxed">{snippet.code}</code>
          </pre>
        </div>
      ))}

      <div className="space-y-2 pt-2 border-t border-border">
        <Textarea
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          placeholder="Paste code snippet to share..."
          className="font-mono text-sm min-h-[80px]"
        />
        <Button size="sm" disabled={!newCode.trim()}>
          Share Snippet
        </Button>
      </div>
    </div>
  );
};

export default CodeSnippetPanel;
