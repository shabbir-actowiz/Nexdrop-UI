import { ArrowLeft, FileText, MessageSquare, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackgroundEffects from "@/components/BackgroundEffects";
import ConnectionPanel from "@/components/ConnectionPanel";
import FileTransferPanel from "@/components/FileTransferPanel";
import MessagingPanel from "@/components/MessagingPanel";
import CodeSnippetPanel from "@/components/CodeSnippetPanel";

const Session = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />

      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container max-w-6xl flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-bold tracking-tight text-foreground">Nexdrop</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">Session Active</span>
        </div>
      </header>

      <main className="container max-w-6xl px-4 py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          <ConnectionPanel
            pairingCode="X7K-92M"
            status="connected"
            onDisconnect={() => navigate("/")}
          />

          <div className="surface-elevated rounded-xl p-6">
            <Tabs defaultValue="files">
              <TabsList className="bg-secondary mb-6">
                <TabsTrigger value="files" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <FileText className="h-3.5 w-3.5" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <Code className="h-3.5 w-3.5" />
                  Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="files">
                <FileTransferPanel />
              </TabsContent>
              <TabsContent value="messages">
                <MessagingPanel />
              </TabsContent>
              <TabsContent value="code">
                <CodeSnippetPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Session;
