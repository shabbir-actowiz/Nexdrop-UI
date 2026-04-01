import { Upload, FileImage, FileVideo, FileArchive, File, Check, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface FileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "sending" | "receiving" | "completed";
  type: "image" | "video" | "archive" | "other";
}

const typeIcons = {
  image: FileImage,
  video: FileVideo,
  archive: FileArchive,
  other: File,
};

const mockFiles: FileItem[] = [
  { id: "1", name: "design-system.fig", size: "12.4 MB", progress: 100, status: "completed", type: "other" },
  { id: "2", name: "screenshot.png", size: "2.1 MB", progress: 72, status: "sending", type: "image" },
  { id: "3", name: "archive.zip", size: "45.8 MB", progress: 35, status: "receiving", type: "archive" },
];

const FileTransferPanel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files] = useState<FileItem[]>(mockFiles);

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-150 cursor-pointer
          ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"}`}
      >
        <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
        <p className="text-xs text-muted-foreground mt-1">Any file type, up to 100MB</p>
      </div>

      <div className="space-y-2">
        {files.map((file) => {
          const Icon = typeIcons[file.type];
          return (
            <div key={file.id} className="surface rounded-lg p-4 flex items-center gap-4 animate-fade-in">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium truncate text-foreground">{file.name}</p>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {file.status === "completed" ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : file.status === "sending" ? (
                      <ArrowUp className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                  </div>
                </div>
                <Progress value={file.progress} className="h-1.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileTransferPanel;
